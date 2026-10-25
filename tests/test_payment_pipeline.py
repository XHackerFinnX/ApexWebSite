"""Financial invariants and durable follow-up jobs, using an isolated DB schema."""

import concurrent.futures
import os
import unittest
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from unittest.mock import Mock
from uuid import uuid4

from psycopg.types.json import Jsonb

from store.application.order_worker import OrderWorker
from store.application.payments import PaymentService
from store.domain import Integration
from store.infrastructure.order_webhook import (
    paid_order_payload,
    WebhookError,
)
from store.infrastructure.tbank import TBankPayment, TBankError
import test_postgres_commerce as commerce_tests


class ControlledBank(TBankPayment):
    def __init__(self):
        super().__init__()
        self.sessions = {}
        self.init_calls = 0
        self.confirm_calls = 0
        self.cancel_calls = 0
        self.lose_init = False
        self.reject_init = False

    def init_payment(self, config, order, items, public_url):
        self.init_calls += 1
        if self.reject_init:
            raise TBankError("HTTP 403: Forbidden", code=403)
        order_id = str(order["id"])
        state = {
            "TerminalKey": config["terminal_key"],
            "OrderId": order_id,
            "PaymentId": order_id,
            "Amount": int(order["total"] * 100),
            "Success": True,
            "Status": "NEW",
        }
        self.sessions[order_id] = state
        if self.lose_init:
            raise TBankError("Timeout", ambiguous=True)
        return {**state, "PaymentURL": "https://payments.example/" + order_id}

    def get_state(self, config, payment_id):
        return dict(self.sessions[payment_id])

    def check_order(self, config, order_id):
        found = self.sessions.get(str(order_id))
        return {
            "OrderId": str(order_id),
            "Payments": [dict(found)] if found else [],
            "Success": True,
        }

    def confirm(self, config, order, items):
        self.confirm_calls += 1
        state = self.sessions[str(order["id"])]
        state["Status"] = "CONFIRMED"
        return dict(state)

    def cancel_unpaid(self, config, payment_id):
        self.cancel_calls += 1
        state = self.sessions[payment_id]
        if state["Status"] == "CONFIRMED":
            raise AssertionError("A paid payment must never be refunded by archive")
        state["Status"] = "CANCELED"
        return dict(state)


@unittest.skipUnless(
    os.getenv("APEX_TEST_DATABASE") == "1", "isolated PostgreSQL tests are opt-in"
)
class PaymentPipelineTests(unittest.TestCase):
    setUpClass = classmethod(commerce_tests.PostgreSQLCommerceTests.setUpClass.__func__)
    tearDownClass = classmethod(
        commerce_tests.PostgreSQLCommerceTests.tearDownClass.__func__
    )
    http_request = commerce_tests.PostgreSQLCommerceTests.http_request
    payment = commerce_tests.PostgreSQLCommerceTests.payment
    balance = commerce_tests.PostgreSQLCommerceTests.balance

    def setUp(self):
        commerce_tests.PostgreSQLCommerceTests.setUp(self)
        self.bank = ControlledBank()
        self.checkout.tbank = self.bank
        self.web.checkout = self.checkout
        self.sender = Mock()
        self.delivery = Mock()
        self.worker = OrderWorker(
            self.repo, self.bank, self.delivery, self.sender, "https://apextop.ru"
        )
        self.admin = {
            "Cookie": "apex_admin="
            + self.web._session_token(int(datetime.now().timestamp()) + 3600)
        }

    def notify(self, order_id, status="CONFIRMED", **fields):
        state = self.bank.sessions[str(order_id)]
        state["Status"] = status
        data = {**state, **fields}
        data["Token"] = self.bank.token(data, "test-terminal-password")
        return self.checkout.accept_tbank_notification(data)

    def due(self, kind=None):
        with self.repo._db() as db:
            if kind:
                db.execute(
                    "UPDATE order_jobs SET due_at=now()+interval '1 day' WHERE kind<>%s AND state='pending'",
                    (kind,),
                )
                db.execute(
                    "UPDATE order_jobs SET due_at=now() WHERE kind=%s AND state='pending'",
                    (kind,),
                )
            else:
                db.execute("UPDATE order_jobs SET due_at=now() WHERE state='pending'")

    def jobs(self, order_id):
        with self.repo._db() as db:
            return list(
                db.execute(
                    "SELECT * FROM order_jobs WHERE order_id=%s ORDER BY id",
                    (order_id,),
                ).fetchall()
            )

    def test_duplicate_signed_confirmations_enqueue_once_and_never_call_webhook_inline(
        self,
    ):
        order = self.payment()
        order_id = order["order_id"]
        for _ in range(3):
            self.assertTrue(self.notify(order_id))
        self.sender.send.assert_not_called()
        self.assertEqual(self.balance(), 445)
        self.assertEqual(
            sum(job["kind"] == "webhook_paid" for job in self.jobs(order_id)), 1
        )
        self.due()
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            list(executor.map(lambda _: self.worker.run_once(), range(4)))
        self.sender.send.assert_called_once()
        body = self.sender.send.call_args.args[1]
        self.assertNotIn("im_number", body)
        self.assertNotIn("email_messages", body)
        self.assertEqual(
            set(body),
            {
                "id",
                "created_at",
                "payload_type",
                "customer_name",
                "customer_email",
                "contact",
                "payload",
                "cookies",
                "client",
                "headers",
                "storage_status",
                "queue_attempts",
                "queue_error",
            },
        )
        self.assertEqual(body["payload"]["payment"]["orderid"], order_id)
        self.assertEqual(body["payload"]["payment"]["sys"], "tinkoff")
        self.assertEqual(body["cookies"], {})
        self.assertEqual(body["payload"]["payment"]["amount"], "900.00")
        self.assertTrue(self.notify(order_id))
        self.assertEqual(
            sum(job["kind"] == "webhook_paid" for job in self.jobs(order_id)), 1
        )

    def test_webhook_failure_retries_persisted_payload_without_changing_paid_state(
        self,
    ):
        order_id = self.payment()["order_id"]
        self.notify(order_id)
        self.sender.send.side_effect = WebhookError("HTTP 503")
        self.due("webhook_paid")
        self.worker.run_once()
        job = next(job for job in self.jobs(order_id) if job["kind"] == "webhook_paid")
        self.assertEqual(job["state"], "pending")
        self.assertEqual(job["attempts"], 1)
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")
        first = job["payload"]
        self.assertTrue(first)
        # A new worker object represents an application restart.
        new_worker = OrderWorker(
            self.repo, self.bank, self.delivery, self.sender, "https://changed.example"
        )
        self.sender.send.side_effect = None
        self.due("webhook_paid")
        new_worker.run_once()
        self.assertEqual(self.sender.send.call_args.args[1], first)
        job = next(job for job in self.jobs(order_id) if job["kind"] == "webhook_paid")
        self.assertEqual(job["state"], "done")
        self.assertEqual(job["attempts"], 2)

    def test_authorized_is_not_paid_and_two_stage_confirmation_runs_in_background(self):
        order_id = self.payment()["order_id"]
        self.notify(order_id, "AUTHORIZED")
        self.assertEqual(self.balance(), 400)
        self.assertEqual(self.repo.get_order(order_id)["status"], "AUTHORIZED")
        self.assertFalse(
            any(job["kind"] == "webhook_paid" for job in self.jobs(order_id))
        )
        self.due("payment_confirm")
        self.worker.run_once()
        self.assertEqual(self.bank.confirm_calls, 1)
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")
        self.assertEqual(self.balance(), 445)
        self.notify(order_id, "AUTHORIZED")
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")

    def test_declined_and_repeated_notifications_restore_reserves_once(self):
        order_id = self.payment()["order_id"]
        for _ in range(3):
            self.notify(
                order_id,
                "REJECTED",
                Success=False,
                ErrorCode="104",
                Message="Отклонено банком",
            )
        self.assertEqual(self.repo.get_order(order_id)["status"], "REJECTED")
        self.assertEqual(self.repo.get_product(self.product.id).stock, 10)
        self.assertEqual(self.balance(), 500)
        self.assertFalse(
            any(job["kind"] == "webhook_paid" for job in self.jobs(order_id))
        )
        self.sender.send.assert_not_called()

    def test_invalid_order_amount_and_signature_never_mark_paid(self):
        order_id = self.payment()["order_id"]
        data = {
            **self.bank.sessions[order_id],
            "Status": "CONFIRMED",
            "OrderId": str(uuid4()),
        }
        data["Token"] = self.bank.token(data, "test-terminal-password")
        with self.assertRaisesRegex(ValueError, "Номер заказа"):
            self.checkout.accept_tbank_notification(data)
        data["OrderId"] = order_id
        data["Amount"] = 1
        data["Token"] = self.bank.token(data, "test-terminal-password")
        with self.assertRaisesRegex(ValueError, "Сумма"):
            self.checkout.accept_tbank_notification(data)
        data["Amount"] = 90000
        data["Token"] = "wrong"
        with self.assertRaisesRegex(ValueError, "подпись"):
            self.checkout.accept_tbank_notification(data)
        self.assertEqual(self.repo.get_order(order_id)["status"], "NEW")

    def test_notification_is_processed_even_when_bank_integration_is_disabled(self):
        order_id = self.payment()["order_id"]
        with self.repo._db() as db:
            db.execute("UPDATE integrations SET enabled=false WHERE provider='tbank'")
        self.assertTrue(self.notify(order_id))
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")

    def test_demo_releases_reserves_and_blocks_real_webhook_and_production_cdek(self):
        self.repo.save_integration(
            Integration(
                "tbank",
                "payment",
                True,
                {"environment": "test"},
                {"terminal_key": "test-terminal", "password": "test-terminal-password"},
            )
        )
        order_id = self.payment()["order_id"]
        self.notify(order_id)
        self.assertTrue(self.repo.get_order(order_id)["is_test"])
        self.assertEqual(self.balance(), 500)
        self.assertEqual(self.repo.get_product(self.product.id).stock, 10)
        self.assertEqual(
            self.repo.customer_history(self.customer["id"])["stats"]["paid_total"], 0
        )
        with self.assertRaisesRegex(ValueError, "тестового заказа"):
            self.repo.submit_customer_review(
                self.customer["id"],
                {"order_id": order_id, "body": "Тестовый текст отзыва", "rating": 5},
            )
        self.due("webhook_paid")
        self.worker.run_once()
        self.sender.send.assert_not_called()
        job = next(job for job in self.jobs(order_id) if job["kind"] == "webhook_paid")
        self.assertEqual(job["state"], "blocked")
        sandbox_sender = Mock()
        sandbox_worker = OrderWorker(
            self.repo,
            self.bank,
            self.delivery,
            self.sender,
            "https://apextop.ru",
            test_webhook=sandbox_sender,
        )
        self.repo.retry_order_jobs(order_id)
        self.due("webhook_paid")
        sandbox_worker.run_once()
        sandbox_sender.send.assert_called_once()
        self.sender.send.assert_not_called()
        self.repo.save_integration(
            Integration(
                "cdek",
                "delivery",
                True,
                {"environment": "production"},
                {"client_id": "test", "client_secret": "test"},
            )
        )
        with self.repo._db() as db:
            db.execute(
                "UPDATE orders SET delivery_details=%s WHERE id=%s",
                (Jsonb({"type": "pvz"}), order_id),
            )
        from store.application.shipping import ShippingService

        with self.assertRaisesRegex(ValueError, "тестовую среду СДЭК"):
            ShippingService(self.repo, self.delivery).create(order_id)
        self.delivery.register_order.assert_not_called()

    def test_old_terminal_notifications_and_reconciliation_work_after_switching_terminal(
        self,
    ):
        order_id = self.payment()["order_id"]
        self.repo.save_integration(
            Integration(
                "tbank",
                "payment",
                True,
                {"environment": "demo"},
                {"terminal_key": "other-terminalDEMO", "password": "other-password"},
            )
        )
        self.assertTrue(self.notify(order_id))
        self.assertEqual(self.balance(), 445)
        self.assertFalse(self.repo.get_order(order_id)["is_test"])
        order = self.repo.payment_context(order_id)
        self.assertNotEqual(order["payment_password"], "test-terminal-password")
        self.assertEqual(
            PaymentService(self.repo, self.bank).config(order)["terminal_key"],
            "test-terminal",
        )
        visible = self.repo.admin_orders_page({})["items"][0]
        self.assertNotIn("payment_password", visible)
        self.assertNotIn("payment_terminal_key", visible)

    def test_payment_notification_with_original_receipt_still_confirms_payment(self):
        order_id = self.payment()["order_id"]
        self.notify(order_id, Receipt={"Taxation": "usn_income", "Items": []})
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")
        self.assertEqual(
            self.repo.get_order(order_id)["receipt_status"], "NOT_REPORTED"
        )

    def test_receipt_can_match_payment_id_without_a_merchant_order_id(self):
        order_id = self.payment()["order_id"]
        data = {
            "TerminalKey": "test-terminal",
            "PaymentId": order_id,
            "Success": True,
            "FiscalNumber": "42",
            "ReceiptUrl": "https://receipts.example/42",
        }
        data["Token"] = self.bank.token(data, "test-terminal-password")
        self.assertTrue(self.checkout.accept_tbank_notification(data))
        self.assertEqual(self.repo.get_order(order_id)["status"], "NEW")
        self.assertEqual(self.repo.get_order(order_id)["receipt_status"], "SUCCESS")

    def test_notification_arriving_before_init_response_is_not_overwritten_by_new(self):
        original = self.bank.init_payment

        def immediate(config, order, items, url):
            result = original(config, order, items, url)
            self.notify(str(order["id"]))
            return result

        self.bank.init_payment = immediate
        order_id = self.payment()["order_id"]
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")
        self.assertEqual(self.balance(), 445)
        self.assertEqual(
            sum(job["kind"] == "webhook_paid" for job in self.jobs(order_id)), 1
        )

    def test_refund_after_shipping_does_not_restock_goods_that_have_not_returned(self):
        order_id = self.payment()["order_id"]
        self.notify(order_id)
        self.repo.update_fulfillment(
            order_id, {"fulfillment": "shipped", "tracking_number": "TEST123"}
        )
        self.notify(order_id, "REFUNDED")
        self.assertEqual(self.repo.get_product(self.product.id).stock, 9)
        self.assertEqual(self.balance(), 500)

    def test_receipt_notification_is_recorded_without_confirming_payment(self):
        order_id = self.payment()["order_id"]
        data = {
            **self.bank.sessions[order_id],
            "ReceiptId": "receipt-1",
            "ReceiptUrl": "https://receipts.example/1",
            "FiscalDocumentNumber": "42",
            "Status": "SUCCESS",
        }
        data["Token"] = self.bank.token(data, "test-terminal-password")
        self.assertTrue(self.checkout.accept_tbank_notification(data))
        order = self.repo.get_order(order_id)
        self.assertEqual(order["status"], "NEW")
        self.assertEqual(order["receipt_status"], "SUCCESS")
        self.assertEqual(order["receipt_url"], "https://receipts.example/1")
        self.sender.send.assert_not_called()

    def test_lost_init_response_is_not_blindly_retried_and_can_be_reconciled(self):
        self.bank.lose_init = True
        with self.assertRaises(TBankError):
            self.payment()
        with self.repo._db() as db:
            order = db.execute("SELECT * FROM orders").fetchone()
        self.assertEqual(order["status"], "INIT_UNKNOWN")
        with self.assertRaises(TBankError):
            self.payment()
        self.assertEqual(self.bank.init_calls, 1)
        PaymentService(self.repo, self.bank).sync(order["id"])
        self.assertEqual(self.repo.get_order(order["id"])["status"], "CANCELED")
        self.assertEqual(self.repo.get_product(self.product.id).stock, 10)
        with self.assertRaises(TBankError) as raised:
            self.payment()
        self.assertTrue(raised.exception.retry_checkout)

    def test_definite_init_error_can_retry_the_same_order_without_double_reservation(
        self,
    ):
        self.bank.reject_init = True
        with self.assertRaises(TBankError):
            self.payment()
        self.bank.reject_init = False
        result = self.payment()
        self.assertEqual(self.bank.init_calls, 2)
        self.assertEqual(self.repo.get_order(result["order_id"])["status"], "NEW")
        self.assertEqual(self.repo.get_product(self.product.id).stock, 9)
        self.assertEqual(len(self.repo.list_admin_orders()), 1)

    def test_delete_unpaid_order_hides_it_and_cancels_payment_then_releases_reserves(
        self,
    ):
        order_id = self.payment()["order_id"]
        status, body, _ = self.http_request(
            "/api/admin/orders/" + order_id, "DELETE", headers=self.admin
        )
        self.assertEqual(status, 200)
        self.assertTrue(body["ok"])
        self.assertEqual(self.repo.list_admin_orders(), [])
        self.assertEqual(self.repo.customer_history(self.customer["id"])["orders"], [])
        self.due("payment_cancel")
        self.worker.run_once()
        self.assertEqual(self.bank.cancel_calls, 1)
        self.assertEqual(self.repo.get_order(order_id)["status"], "CANCELED")
        self.assertEqual(self.repo.get_product(self.product.id).stock, 10)
        self.assertEqual(self.balance(), 500)
        self.repo.archive_order(order_id)
        self.assertEqual(self.repo.get_product(self.product.id).stock, 10)

    def test_deleting_paid_order_does_not_refund_it_or_remove_accounting_history(self):
        order_id = self.payment()["order_id"]
        self.notify(order_id)
        self.repo.archive_order(order_id)
        self.assertEqual(self.repo.get_order(order_id)["status"], "CONFIRMED")
        self.assertEqual(self.bank.cancel_calls, 0)
        self.assertEqual(self.balance(), 445)
        with self.repo._db() as db:
            self.assertEqual(
                db.execute(
                    "SELECT count(*) AS n FROM loyalty_ledger WHERE order_id=%s",
                    (order_id,),
                ).fetchone()["n"],
                2,
            )
        self.notify(order_id)
        self.assertEqual(self.repo.list_admin_orders(), [])

    def test_payment_confirmed_after_archive_is_restored_for_fulfillment(self):
        order_id = self.payment()["order_id"]
        self.repo.archive_order(order_id)
        self.notify(order_id)
        self.assertEqual(len(self.repo.list_admin_orders()), 1)
        self.due("payment_cancel")
        self.worker.run_once()
        self.assertEqual(self.bank.cancel_calls, 0)

    def test_failed_signature_still_rejected_by_http_and_success_ack_is_literal_ok(
        self,
    ):
        order_id = self.payment()["order_id"]
        data = {**self.bank.sessions[order_id], "Status": "CONFIRMED", "Token": "bad"}
        self.assertEqual(
            self.http_request("/api/payments/tbank/notification", "POST", data)[0], 400
        )
        data["Token"] = self.bank.token(data, "test-terminal-password")
        status, body, _ = self.http_request(
            "/api/payments/tbank/notification",
            "POST",
            data,
            {"Origin": "https://bank.example"},
        )
        self.assertEqual(status, 200)
        self.assertEqual(body, b"OK")
        self.sender.send.assert_not_called()

    def test_job_claim_is_exclusive_and_stale_owner_cannot_complete_reclaimed_job(self):
        order_id = self.payment()["order_id"]
        self.notify(order_id)
        self.due("webhook_paid")
        job = self.repo.claim_order_job()
        self.assertEqual(job["kind"], "webhook_paid")
        self.assertIsNone(self.repo.claim_order_job())
        with self.repo._db() as db:
            db.execute(
                "UPDATE order_jobs SET locked_at=now()-interval '181 seconds' WHERE id=%s",
                (job["id"],),
            )
        renewed = self.repo.claim_order_job()
        self.assertNotEqual(job["lease_token"], renewed["lease_token"])
        self.assertFalse(self.repo.finish_order_job(job))
        self.assertTrue(self.repo.finish_order_job(renewed))

    def test_combined_admin_filters_find_orders_older_than_the_previous_200_limit(self):
        now = datetime(2026, 10, 26, tzinfo=timezone.utc)
        with self.repo._db() as db:
            with db.cursor() as cursor:
                cursor.executemany(
                    """INSERT INTO orders(id,status,customer_email,total,idempotency_key,created_at,fulfillment,delivery_details)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s)""",
                    [
                        (
                            str(uuid4()),
                            "NEW",
                            "noise@example.test",
                            100,
                            "noise-" + str(i),
                            now + timedelta(minutes=i),
                            "new",
                            Jsonb({"type": "pickup"}),
                        )
                        for i in range(205)
                    ],
                )
            for amount, stage, method in [
                (1200, "packing", "pvz"),
                (1800, "packing", "pvz"),
                (2200, "shipped", "pvz"),
                (1400, "packing", "pickup"),
            ]:
                db.execute(
                    """INSERT INTO orders(id,status,customer_email,total,idempotency_key,created_at,fulfillment,delivery_details)
                VALUES(%s,'CONFIRMED','target@example.test',%s,%s,%s,%s,%s)""",
                    (
                        str(uuid4()),
                        amount,
                        str(uuid4()),
                        now - timedelta(days=1),
                        stage,
                        Jsonb({"type": method}),
                    ),
                )
        query = {
            "limit": "1",
            "q": "target",
            "status": "CONFIRMED",
            "fulfillment": "packing",
            "delivery": "cdek",
            "date_from": "2026-10-25",
            "date_to": "2026-10-25",
            "amount_min": "1000",
            "amount_max": "2000",
            "sort": "amount_asc",
        }
        page = self.repo.admin_orders_page(query)
        self.assertEqual(page["total"], 2)
        self.assertEqual(page["items"][0]["total"], 1200)
        second = self.repo.admin_orders_page({**query, "offset": "1"})
        self.assertEqual(second["items"][0]["total"], 1800)
        descending = self.repo.admin_orders_page({**query, "sort": "amount_desc"})
        self.assertEqual(descending["items"][0]["total"], 1800)
        from urllib.parse import urlencode

        status, body, _ = self.http_request(
            "/api/admin/orders?" + urlencode(query), headers=self.admin
        )
        self.assertEqual(status, 200)
        self.assertEqual(body["total"], 2)
        self.assertEqual(body["items"][0]["total"], 1200)
        with self.assertRaisesRegex(ValueError, "сортировка"):
            self.repo.admin_orders_page({"sort": "total; DROP TABLE orders"})

    def test_webhook_prices_match_discounted_total_even_with_rounding(self):
        order_id = self.payment()["order_id"]
        order = self.repo.payment_context(order_id)
        item = order["items"][0]
        item["quantity"] = 3
        item["line_total"] = Decimal("2.99")
        order["items"] = [item]
        order["total"] = Decimal("3.99")
        order["shipping"] = Decimal("1.00")
        payload = paid_order_payload(order, "https://apextop.ru")["payload"]["payment"]
        self.assertEqual(
            sum(Decimal(str(item["amount"])) for item in payload["products"])
            + Decimal(str(payload["delivery_price"])),
            Decimal(payload["amount"]),
        )
        self.assertEqual(sum(item["quantity"] for item in payload["products"]), 3)
        order["items"] = [{**item, "line_total": Decimal("0.00"), "quantity": 2}]
        order["total"] = Decimal("1.00")
        gift = paid_order_payload(order, "https://apextop.ru")["payload"]["payment"]
        self.assertEqual(gift["products"][0]["quantity"], 2)
        self.assertEqual(gift["products"][0]["price"], "0.00")

    def test_auto_cdek_creation_is_separate_from_webhook_and_claimed_once(self):
        self.repo.save_integration(
            Integration(
                "cdek",
                "delivery",
                True,
                {"environment": "production"},
                {"client_id": "test", "client_secret": "test"},
            )
        )
        order_id = self.payment()["order_id"]
        with self.repo._db() as db:
            db.execute(
                "UPDATE orders SET delivery_details=%s WHERE id=%s",
                (
                    Jsonb(
                        {
                            "type": "pvz",
                            "city_code": 270,
                            "pvz": {"code": "SPB1", "address": "Тестовая,1"},
                        }
                    ),
                    order_id,
                ),
            )
        self.delivery.order_payload.side_effect = lambda cfg, order: {
            "number": str(order["id"]),
            "type": 1,
        }
        external = str(uuid4())
        self.delivery.register_order.return_value = {
            "external_id": external,
            "status": "CREATED",
            "tracking_number": "TEST123",
            "error": "",
        }
        self.notify(order_id)
        self.notify(order_id)
        self.due("cdek_create")
        self.worker.run_once()
        self.delivery.register_order.assert_called_once()
        self.assertEqual(self.repo.cdek_shipment(order_id)["external_id"], external)
        self.sender.send.assert_not_called()
        self.due("webhook_paid")
        self.worker.run_once()
        self.sender.send.assert_called_once()
