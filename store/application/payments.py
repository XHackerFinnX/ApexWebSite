"""Reconcile bank state before acting on payments or archived checkout sessions."""

from datetime import datetime, timedelta, timezone
from decimal import Decimal

from store.application.checkout import receipt_items
from store.infrastructure.tbank import TBankError

PAID = {"CONFIRMED", "PARTIAL_REFUNDED", "REFUNDED"}
FINISHED = PAID | {"CANCELED", "REJECTED", "REVERSED", "DEADLINE_EXPIRED"}


class PaymentService:
    def __init__(self, repo, bank):
        self.repo, self.bank = repo, bank

    def config(self, order):
        return self.repo.payment_configuration(order)

    def apply_state(self, order, state):
        if str(state.get("PaymentId", "")) != str(
            order.get("external_payment_id") or ""
        ):
            raise TBankError(
                "Идентификатор платежа в ответе банка не совпадает с заказом"
            )
        if str(state.get("OrderId", "")) != str(order["id"]):
            raise TBankError("Номер заказа в ответе банка не совпадает с заказом")
        expected = int(Decimal(str(order["total"])) * 100)
        amount = int(state.get("Amount", -1))
        if not 0 <= amount <= expected or (
            state.get("Status")
            in {"AUTHORIZED", "CONFIRMED", "CONFIRMING", "CONFIRM_CHECKING"}
            and amount != expected
        ):
            raise TBankError("Сумма платежа в ответе банка не совпадает с заказом")
        config = self.config(order)
        if (
            state.get("TerminalKey")
            and str(state["TerminalKey"]) != str(config["terminal_key"]).strip()
        ):
            raise TBankError("Терминал в ответе банка не совпадает с заказом")
        self.repo.record_payment_event(order["id"], state)
        self.repo.update_order_by_payment(
            str(state["PaymentId"]), str(state.get("Status", ""))
        )
        self.repo.record_payment_check(order["id"])
        return self.repo.payment_context(order["id"])

    def sync(self, order_id):
        order = self.repo.payment_context(order_id)
        if (
            not order.get("external_payment_id")
            and order["status"] == "INIT_ERROR"
            and order["created_at"] < datetime.now(timezone.utc) - timedelta(minutes=30)
        ):
            self.repo.cancel_local_order(order["id"])
            return self.repo.payment_context(order["id"])
        config = self.config(order)
        if not order.get("external_payment_id"):
            if order["status"] == "NEW" and not order.get("payment_terminal_key"):
                # The process may have stopped after reserving goods but before
                # claiming an Init request. There is no bank request to recover.
                if order["created_at"] < datetime.now(timezone.utc) - timedelta(
                    minutes=30
                ):
                    self.repo.cancel_local_order(order["id"])
                return self.repo.payment_context(order["id"])
            try:
                result = self.bank.check_order(config, order["id"])
            except TBankError as exc:
                if str(exc.code) not in {"255", "914"}:
                    raise
                result = {"OrderId": str(order["id"]), "Payments": []}
            if str(result.get("OrderId", "")) != str(order["id"]):
                raise TBankError("Банк вернул другой номер заказа")
            payments = result.get("Payments")
            if not isinstance(payments, list):
                raise TBankError("Банк не вернул список платежей", ambiguous=True)
            if len(payments) > 1:
                raise TBankError(
                    "У заказа несколько платежей. Сверьте операции в Т-Банке"
                )
            if not payments:
                self.repo.record_payment_check(order["id"])
                self.repo.recover_empty_payment(order["id"])
                order = self.repo.payment_context(order["id"])
                if order["status"] == "INIT_ERROR" and order[
                    "created_at"
                ] < datetime.now(timezone.utc) - timedelta(minutes=30):
                    self.repo.cancel_local_order(order["id"])
                return self.repo.payment_context(order["id"])
            found = payments[0]
            if not found.get("PaymentId") or int(found.get("Amount", -1)) != int(
                order["total"] * 100
            ):
                raise TBankError("Найденный платёж не совпадает с заказом")
            self.repo.attach_notification_payment(order["id"], str(found["PaymentId"]))
            order = self.repo.payment_context(order["id"])
        state = self.bank.get_state(config, order["external_payment_id"])
        order = self.apply_state(order, state)
        if order["status"] == "NEW" and not order.get("payment_url"):
            # A lost Init response has no recoverable payment URL in CheckOrder.
            # Close that unused session before allowing a new checkout key.
            self.cancel(order_id)
            order = self.repo.payment_context(order_id)
        return order

    def confirm(self, order_id):
        order = self.sync(order_id)
        if order["status"] != "AUTHORIZED":
            return order
        if order.get("deleted_at"):
            return self.cancel(order_id)
        config = self.config(order)
        result = self.bank.confirm(
            config, order, receipt_items(order["items"], order["shipping"])
        )
        # Responses and notifications can race; GetState is the authoritative
        # follow-up and also recovers a previous Confirm whose response was lost.
        if result.get("PaymentId") and str(result["PaymentId"]) != str(
            order["external_payment_id"]
        ):
            raise TBankError("Банк подтвердил другой платёж")
        return self.sync(order_id)

    def cancel(self, order_id):
        order = self.repo.payment_context(order_id)
        if not order.get("external_payment_id"):
            self.repo.cancel_local_order(order_id)
            return self.repo.payment_context(order_id)
        config = self.config(order)
        state = self.bank.get_state(config, order["external_payment_id"])
        order = self.apply_state(order, state)
        if order["status"] in FINISHED:
            return order
        if order["status"] not in {"NEW", "FORM_SHOWED", "AUTHORIZED"}:
            raise TBankError(
                "Платёж обрабатывается банком. Закрытие будет повторено после проверки статуса",
                ambiguous=True,
            )
        result = self.bank.cancel_unpaid(config, order["external_payment_id"])
        if result.get("Status") in {"CANCELED", "REVERSED"}:
            self.repo.update_order_by_payment(
                str(order["external_payment_id"]), str(result["Status"])
            )
        return self.apply_state(
            self.repo.payment_context(order_id),
            self.bank.get_state(config, order["external_payment_id"]),
        )
