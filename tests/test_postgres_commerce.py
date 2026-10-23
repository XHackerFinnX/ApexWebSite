"""Opt-in tests use a fresh temporary schema, never the application's tables.
Run with APEX_TEST_DATABASE=1 and the usual local PostgreSQL configuration.
"""

import concurrent.futures
import gzip
import hashlib
import json
import os
import threading
import unittest
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer
from uuid import uuid4

import psycopg
from psycopg import sql

from store.application.services import (
    CatalogService,
    CheckoutService,
    IntegrationService,
)
from store.config import get_settings
from store.domain import Integration
from store.infrastructure.postgres_repo import PostgreSQLRepository
from store.infrastructure.security import RateLimiter, SecretBox
from store.presentation.web import WebApp


class Bank:
    def __init__(self):
        self.calls = 0

    def init_payment(self, config, order, items, url):
        self.calls += 1
        assert sum(i["unit_price"] * i["quantity"] for i in items) == order["total"]
        return {
            "PaymentId": str(order["id"]),
            "PaymentURL": "https://payments.example/" + str(order["id"]),
            "Status": "NEW",
        }

    def verify_token(self, data, password):
        return data.get("Token") == "signed-test-notification"


@unittest.skipUnless(
    os.getenv("APEX_TEST_DATABASE") == "1",
    "Set APEX_TEST_DATABASE=1 to run isolated PostgreSQL integration tests",
)
class PostgreSQLCommerceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.connection = get_settings().postgresql_connection()
        cls.schema = "apex_test_" + uuid4().hex
        with psycopg.connect(**cls.connection, autocommit=True) as db:
            db.execute(sql.SQL("CREATE SCHEMA {}").format(sql.Identifier(cls.schema)))
        try:
            cls.repo = PostgreSQLRepository(
                {**cls.connection, "options": "-c search_path=" + cls.schema},
                SecretBox("test-only-key"),
            )
            cls.web = WebApp(
                CatalogService(cls.repo),
                IntegrationService(cls.repo),
                CheckoutService(None, cls.repo, Bank(), "https://shop.example"),
                cls.repo,
                RateLimiter(1000, 60),
                admin_password="test-admin-only",
            )
            cls.http = ThreadingHTTPServer(("127.0.0.1", 0), cls.web.handler())
            cls.thread = threading.Thread(target=cls.http.serve_forever, daemon=True)
            cls.thread.start()
        except Exception:
            with psycopg.connect(**cls.connection, autocommit=True) as db:
                db.execute(
                    sql.SQL("DROP SCHEMA {} CASCADE").format(sql.Identifier(cls.schema))
                )
            raise

    @classmethod
    def tearDownClass(cls):
        cls.http.shutdown()
        cls.http.server_close()
        cls.thread.join()
        cls.repo.pool.close()
        with psycopg.connect(**cls.connection, autocommit=True) as db:
            db.execute(
                sql.SQL("DROP SCHEMA {} CASCADE").format(sql.Identifier(cls.schema))
            )

    def setUp(self):
        with self.repo._db() as db:
            db.execute(
                "TRUNCATE customers,products,categories,integrations,promotions,orders,loyalty_ledger,customer_sessions RESTART IDENTITY CASCADE"
            )
            db.execute(
                "UPDATE store_settings SET value='{"
                + '"earn_percent":5,"redeem_percent":20'
                + "}' WHERE key='loyalty'"
            )
        self.catalog = CatalogService(self.repo)
        self.product = self.catalog.save(
            {
                "name": "Test Hoodie",
                "price": "1000",
                "category": "Test",
                "sizes": ["M"],
                "stock": 10,
                "is_active": True,
            }
        )
        self.customer = self.repo.register_customer(
            {
                "name": "Test Person",
                "email": "member@example.test",
                "password": "a-secure-test-password",
            }
        )
        with self.repo._db() as db:
            db.execute(
                "UPDATE customers SET points=500 WHERE id=%s", (self.customer["id"],)
            )
        self.customer["points"] = 500
        self.repo.save_integration(
            Integration(
                "tbank",
                "payment",
                True,
                {"environment": "test"},
                {"terminal_key": "test-terminal", "password": "test-terminal-password"},
            )
        )
        self.repo.save_integration(
            Integration("pickup", "delivery", True, {"name": "Самовывоз"}, {})
        )
        self.bank = Bank()
        self.checkout = CheckoutService(
            None, self.repo, self.bank, "https://shop.example"
        )
        self.payload = {
            "customer": {
                "name": "Test Person",
                "email": "member@example.test",
                "phone": "+79991234567",
            },
            "recipient": "Test Person",
            "items": [{"product_id": self.product.id, "size": "M", "quantity": 1}],
            "delivery": {"type": "pickup"},
            "payment": "tbank",
            "points": 100,
            "idempotency_key": str(uuid4()),
        }

    def payment(self, payload=None):
        return self.checkout.create_payment(payload or self.payload, self.customer)

    def balance(self):
        with self.repo._db() as db:
            return db.execute(
                "SELECT points FROM customers WHERE id=%s", (self.customer["id"],)
            ).fetchone()["points"]

    def http_request(self, path, method="GET", data=None, headers=None):
        request = urllib.request.Request(
            "http://127.0.0.1:" + str(self.http.server_port) + path,
            method=method,
            data=None if data is None else json.dumps(data).encode(),
            headers={
                **({"Content-Type": "application/json"} if data is not None else {}),
                **(headers or {}),
            },
        )
        try:
            response = urllib.request.urlopen(request, timeout=10)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            body = response.read()
            if response.headers.get("Content-Encoding") == "gzip":
                body = gzip.decompress(body)
            if body and response.headers.get_content_type() == "application/json":
                body = json.loads(body)
            return response.status, body, response.headers

    def test_account_http_serializes_orders_and_hides_other_accounts(self):
        result = self.payment()
        token = self.repo.create_customer_session(self.customer["id"])
        status, body, headers = self.http_request(
            "/api/account?customer_id=99999",
            headers={"Cookie": "apex_customer=" + token},
        )
        self.assertEqual(status, 200)
        self.assertEqual(body["orders"][0]["id"], result["order_id"])
        self.assertEqual(body["customer"]["id"], self.customer["id"])
        self.assertEqual(headers["Cache-Control"], "no-store")
        self.assertNotIn("password_hash", body["customer"])

    def test_admin_new_endpoints_require_authentication(self):
        for path in [
            "/api/admin/catalog",
            "/api/admin/promotions",
            "/api/admin/orders",
            "/api/admin/loyalty",
        ]:
            self.assertEqual(self.http_request(path)[0], 401)

    def test_cross_origin_mutation_is_rejected_before_authentication(self):
        self.assertEqual(
            self.http_request(
                "/api/account/login", "POST", {}, {"Origin": "https://other.example"}
            )[0],
            403,
        )

    def test_static_compression_and_etag_revalidation(self):
        status, body, headers = self.http_request(
            "/storefront.css", headers={"Accept-Encoding": "gzip"}
        )
        self.assertEqual(status, 200)
        self.assertEqual(headers["Content-Encoding"], "gzip")
        self.assertIn(b":root", body)
        self.assertEqual(
            self.http_request("/storefront.css", headers={"If-None-Match": headers["ETag"]})[
                0
            ],
            304,
        )

    def test_old_order_refund_does_not_restore_unreserved_inventory(self):
        result = self.payment()
        with self.repo._db() as db:
            db.execute(
                "UPDATE orders SET inventory_reserved=false WHERE id=%s",
                (result["order_id"],),
            )
        self.repo.update_order_by_payment(result["order_id"], "CANCELED")
        self.assertEqual(self.repo.get_product(self.product.id).stock, 9)

    def test_authentication_sessions_and_revocation(self):
        self.assertEqual(
            self.repo.login_customer(" MEMBER@EXAMPLE.TEST ", "a-secure-test-password")[
                "id"
            ],
            self.customer["id"],
        )
        with self.assertRaises(ValueError):
            self.repo.login_customer("member@example.test", "wrong")
        token = self.repo.create_customer_session(self.customer["id"])
        self.assertEqual(
            self.repo.customer_for_session(token)["email"], "member@example.test"
        )
        with self.repo._db() as db:
            stored = db.execute("SELECT token_hash FROM customer_sessions").fetchone()[
                "token_hash"
            ]
            self.assertEqual(stored, hashlib.sha256(token.encode()).hexdigest())
        self.repo.logout_customer(token)
        self.assertIsNone(self.repo.customer_for_session(token))

    def test_payment_retry_does_not_spend_twice_or_reserve_twice(self):
        first = self.payment()
        second = self.payment()
        self.assertEqual(first, second)
        self.assertEqual(self.bank.calls, 1)
        self.assertEqual(self.balance(), 400)
        self.assertEqual(self.repo.get_product(self.product.id).stock, 9)

    def test_modified_idempotent_request_is_rejected(self):
        self.payment()
        with self.assertRaisesRegex(ValueError, "Ключ заказа"):
            self.payment({**self.payload, "points": 50})

    def test_confirmation_credits_once_and_late_status_cannot_undo_it(self):
        result = self.payment()
        payment_id = result["order_id"]
        for _ in range(2):
            self.repo.update_order_by_payment(payment_id, "CONFIRMED")
        self.repo.update_order_by_payment(payment_id, "NEW")
        self.assertEqual(self.balance(), 445)
        self.assertEqual(self.repo.get_order(result["order_id"])["status"], "CONFIRMED")

    def test_full_refund_compensates_benefits_and_stock_once(self):
        result = self.payment()
        payment_id = result["order_id"]
        self.repo.update_order_by_payment(payment_id, "CONFIRMED")
        self.repo.update_order_by_payment(payment_id, "REFUNDED")
        self.repo.update_order_by_payment(payment_id, "REFUNDED")
        self.assertEqual(self.balance(), 500)
        self.assertEqual(self.repo.get_product(self.product.id).stock, 10)
        self.repo.update_order_by_payment(payment_id, "CONFIRMED")
        self.assertEqual(self.balance(), 500)

    def test_expired_coupon_and_usage_limits(self):
        self.repo.save_promotion(
            {
                "code": "OLD",
                "product_id": self.product.id,
                "value": 10,
                "ends_at": "2020-01-01T00:00:00+00:00",
            }
        )
        self.assertIsNone(self.repo.get_promotion("OLD"))
        self.repo.save_promotion(
            {"code": "ONE", "product_id": self.product.id, "value": 10, "max_uses": 1}
        )
        self.payment({**self.payload, "promo_code": "ONE"})
        self.assertIsNone(self.repo.get_promotion("ONE"))
        self.repo.update_order_by_payment(
            str(self.repo.list_admin_orders()[0]["id"]),
            "CANCELED",
        )
        self.assertIsNotNone(self.repo.get_promotion("ONE"))

    def test_concurrent_last_item_can_only_be_reserved_once(self):
        with self.repo._db() as db:
            db.execute("UPDATE products SET stock=1 WHERE id=%s", (self.product.id,))

        def purchase(_):
            try:
                return self.payment(
                    {**self.payload, "points": 0, "idempotency_key": str(uuid4())}
                )
            except ValueError:
                return None

        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            results = list(executor.map(purchase, range(2)))
        self.assertEqual(sum(bool(r) for r in results), 1)
        self.assertEqual(self.repo.get_product(self.product.id).stock, 0)

    def test_category_and_review_edits_preserve_identity(self):
        category = self.repo.list_categories()[0]
        self.repo.update_category(category["id"], "Renamed")
        self.assertEqual(self.repo.get_product(self.product.id).category, "Renamed")
        review = self.repo.save_review(
            {
                "author": "One",
                "body": "Original",
                "rating": 5,
                "images": ["https://example.test/photo.webp"],
            }
        )
        updated = self.repo.save_review(
            {
                "id": review["id"],
                "author": "Two",
                "body": "Edited",
                "rating": 4,
                "is_published": True,
                "images": ["https://example.test/new.webp"],
            }
        )
        self.assertEqual(updated["id"], review["id"])
        self.assertEqual(
            self.repo.admin_review(review["id"])["images"],
            ["https://example.test/new.webp"],
        )
        self.assertTrue(self.repo.delete_review(review["id"]))

    def test_partial_credential_update_preserves_other_secret(self):
        self.repo.save_integration(
            Integration(
                "tbank",
                "payment",
                True,
                {"environment": "test"},
                {"password": "new-test-password"},
            )
        )
        config = self.repo.get_integration_config("tbank")
        self.assertEqual(config["terminal_key"], "test-terminal")
        self.assertEqual(config["password"], "new-test-password")

    def test_catalog_pagination_and_summary_do_not_repeat_variant_images(self):
        for index in range(4):
            self.catalog.save(
                {
                    "name": f"Product {index}",
                    "category": "Test",
                    "is_active": True,
                    "variants": [
                        {
                            "sku": f"SKU-{index}",
                            "price": "500",
                            "stock": 3,
                            "color": "Black",
                            "size": "L",
                            "images": ["https://example.test/photo.webp"],
                        }
                    ],
                }
            )
        page = self.repo.catalog_page(limit=2)
        self.assertEqual(page["total"], 5)
        self.assertEqual(len(page["items"]), 2)
        self.assertNotIn("images", page["items"][0]["variants"][0])
        self.assertEqual(len(self.repo.catalog_page(limit=2, offset=4)["items"]), 1)

    def test_migrations_can_run_again_and_secrets_not_in_catalog(self):
        self.repo.migrate()
        self.repo.migrate()
        self.assertEqual(self.repo.catalog_page()["total"], 1)

    def test_pool_replaces_terminated_idle_connection_before_query(self):
        repo = PostgreSQLRepository(
            {**self.connection, "options": "-c search_path=" + self.schema},
            SecretBox("test-only-key"),
            migrate=False,
        )
        try:
            repo.pool.wait(timeout=5)
            with repo._db() as db:
                old_pid = db.info.backend_pid
                self.assertEqual(db.execute("SHOW timezone").fetchone()["TimeZone"], "UTC")
            with psycopg.connect(**self.connection, autocommit=True) as control:
                control.execute("SELECT pg_terminate_backend(%s)", (old_pid,))
            with repo._db() as db:
                self.assertNotEqual(db.info.backend_pid, old_pid)
                self.assertEqual(db.execute("SELECT 1 AS n").fetchone()["n"], 1)
        finally:
            repo.pool.close()

    def test_integration_with_orders_can_be_disabled_but_not_deleted(self):
        payment = self.payment()
        headers = {"Cookie": "apex_admin=" + self.web._session_token(4_000_000_000)}
        status, body, _ = self.http_request(
            "/api/admin/integrations/tbank", "DELETE", headers=headers
        )
        self.assertEqual(status, 400)
        self.assertIn("Отключите", body["error"])
        status, _, _ = self.http_request(
            "/api/admin/integrations/tbank", "PUT", {"enabled": False}, headers
        )
        self.assertEqual(status, 200)
        self.assertIsNone(self.repo.get_integration_config("tbank"))
        self.assertIsNotNone(self.repo.get_order(payment["order_id"]))
        self.assertEqual(
            self.repo.get_integration_config("tbank", enabled_only=False)["password"],
            "test-terminal-password",
        )

    def test_customer_order_details_and_metrics_exclude_other_customers(self):
        first = self.payment()
        self.repo.update_order_by_payment(first["order_id"], "CONFIRMED")
        other = self.repo.register_customer(
            {"email": "other@example.test", "name": "Another Person", "password": "another-secure-password"}
        )
        self.checkout.create_payment(
            {**self.payload, "points": 0, "idempotency_key": str(uuid4())}, other
        )
        history = self.repo.customer_history(self.customer["id"])
        self.assertEqual(history["stats"]["total_orders"], 1)
        self.assertEqual(history["stats"]["active_orders"], 1)
        self.assertEqual(history["stats"]["paid_total"], 900)
        self.assertEqual(len(history["orders"]), 1)
        self.assertEqual(history["orders"][0]["items"][0]["name"], self.product.name)
        self.assertEqual(history["orders"][0]["items"][0]["quantity"], 1)
        self.assertNotIn("customer_email", history["orders"][0])
        self.assertEqual(len(self.repo.list_admin_orders()), 2)
        self.assertEqual(len(self.repo.list_admin_orders()[0]["items"]), 1)

    def test_legacy_order_item_fallback_does_not_change_free_discounted_items(self):
        payment = self.payment()
        with self.repo._db() as db:
            db.execute(
                "UPDATE order_items SET name='',line_total=0 WHERE order_id=%s",
                (payment["order_id"],),
            )
        item = self.repo.list_admin_orders()[0]["items"][0]
        self.assertEqual(item["name"], self.product.name)
        self.assertEqual(item["line_total"], 1000)
        with self.repo._db() as db:
            db.execute(
                "UPDATE order_items SET name='Fully discounted item',line_total=0 WHERE order_id=%s",
                (payment["order_id"],),
            )
        self.assertEqual(self.repo.list_admin_orders()[0]["items"][0]["line_total"], 0)

    def test_legacy_inline_media_migration_is_repeatable_and_preserves_stock(self):
        import base64
        import io
        import tempfile
        from pathlib import Path
        from unittest.mock import patch

        from PIL import Image

        from store.manage import migrate_media

        image = Image.new("RGB", (32, 32), "red")
        buffer = io.BytesIO()
        image.save(buffer, "PNG")
        data = "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
        with self.repo._db() as db:
            db.execute(
                "UPDATE products SET image_url=%s,images=%s WHERE id=%s",
                (data, [data], self.product.id),
            )
        with (
            tempfile.TemporaryDirectory() as directory,
            patch("store.infrastructure.media.MEDIA_ROOT", Path(directory)),
        ):
            self.assertEqual(migrate_media(self.repo), 1)
            self.assertEqual(migrate_media(self.repo), 0)
            product = self.repo.get_product(self.product.id)
            self.assertTrue(product.image_url.startswith("/media/"))
            self.assertEqual(product.stock, 10)
            self.assertEqual(product.price, 1000)

    def test_signed_confirmation_checks_amount_and_terminal(self):
        result = self.payment()
        data = {
            "TerminalKey": "test-terminal",
            "PaymentId": result["order_id"],
            "Status": "CONFIRMED",
            "Success": True,
            "Amount": 1,
            "Token": "signed-test-notification",
        }
        with self.assertRaisesRegex(ValueError, "Сумма"):
            self.checkout.accept_tbank_notification(data)
        data["Amount"] = 90000
        self.assertTrue(self.checkout.accept_tbank_notification(data))
        self.assertEqual(self.balance(), 445)

    def test_password_change_revokes_sessions_and_wrong_password_rolls_back_profile(
        self,
    ):
        token = self.repo.create_customer_session(self.customer["id"])
        with self.assertRaises(ValueError):
            self.repo.update_customer(
                self.customer["id"],
                {
                    "name": "Changed",
                    "phone": "",
                    "current_password": "wrong",
                    "new_password": "another-valid-password",
                },
            )
        self.assertEqual(self.repo.customer_for_session(token)["name"], "Test Person")
        self.repo.update_customer(
            self.customer["id"],
            {
                "name": "Changed",
                "phone": "",
                "current_password": "a-secure-test-password",
                "new_password": "another-valid-password",
            },
        )
        self.assertIsNone(self.repo.customer_for_session(token))
        self.assertEqual(
            self.repo.login_customer("member@example.test", "another-valid-password")[
                "name"
            ],
            "Changed",
        )
