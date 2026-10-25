"""Explicit admin dispatch with durable claims and reconciliation after timeouts."""

import hashlib

from store.application.ports import DeliveryError
from store.domain.payment_mode import order_is_test


class ShippingService:
    def __init__(self, repo, delivery):
        self.repo, self.delivery = repo, delivery

    @staticmethod
    def account_key(config):
        return hashlib.sha256(
            (
                str(config.get("environment", "production"))
                + ":"
                + str(config.get("client_id", ""))
            ).encode()
        ).hexdigest()

    def _config(self, shipment=None):
        config = self.repo.get_integration_config("cdek", enabled_only=shipment is None)
        if not config:
            raise ValueError("Настройте интеграцию СДЭК")
        if shipment and shipment["account_key"] != self.account_key(config):
            raise ValueError(
                "Для этого отправления восстановите исходные ID и среду СДЭК"
            )
        return config

    def create(self, order_id):
        previous = self.repo.cdek_shipment(order_id)
        if previous and previous["status"] not in {"FAILED", "INVALID"}:
            return self.sync(order_id)
        config = self._config()
        order = self.repo.shipping_order(order_id)
        if order_is_test(order) and config.get("environment") != "test":
            raise ValueError(
                "Для тестового платежа выберите тестовую среду СДЭК. Боевое отправление не создаётся."
            )
        if (
            "is_test" in order.get("payment_settings", {})
            and not order_is_test(order)
            and config.get("environment") == "test"
        ):
            raise ValueError(
                "Для рабочего платежа выберите Production в настройках СДЭК."
            )
        if order["status"] != "CONFIRMED":
            raise ValueError("Отправление СДЭК доступно после подтверждения оплаты")
        payload = self.delivery.order_payload(config, order)
        shipment, claimed = self.repo.claim_cdek_shipment(
            order_id, payload, self.account_key(config)
        )
        if not claimed:
            return shipment
        try:
            result = self.delivery.register_order(config, payload)
        except DeliveryError as exc:
            # A timeout or 5xx may happen after CDEK accepted the order. Never POST
            # it again automatically; resolve by the stable shop order number.
            state = "FAILED" if exc.code in {400, 403, 422} else "UNKNOWN"
            self.repo.save_cdek_shipment(
                order_id,
                {"status": state, "error": str(exc)},
                expected_updated_at=shipment.get("updated_at"),
            )
            raise
        return self.repo.save_cdek_shipment(
            order_id, result, expected_updated_at=shipment.get("updated_at")
        )

    def sync(self, order_id):
        shipment = self.repo.cdek_shipment(order_id)
        if not shipment:
            raise ValueError("Сначала создайте отправление СДЭК")
        config = self._config(shipment)
        if (
            not shipment.get("external_id")
            and shipment["request_payload"].get("type") == 2
        ):
            raise ValueError(
                "СДЭК не вернул UUID. Для договора «Доставка» поиск по номеру магазина недоступен: сверьте отправление в кабинете СДЭК"
            )
        try:
            result = self.delivery.order_info(
                config,
                external_id=shipment.get("external_id") or "",
                number=shipment["request_payload"]["number"],
            )
        except DeliveryError as exc:
            if not shipment.get("external_id"):
                raise ValueError(
                    "Результат создания пока не подтверждён. Повторите проверку статуса; если заказ не появится, сверьте его в кабинете СДЭК по номеру "
                    + shipment["request_payload"]["number"]
                ) from exc
            raise
        return self.repo.save_cdek_shipment(
            order_id, result, expected_updated_at=shipment.get("updated_at")
        )

    def cancel(self, order_id):
        shipment = self.repo.cdek_shipment(order_id)
        if not shipment or not shipment.get("external_id"):
            raise ValueError("Сначала уточните статус отправления СДЭК")
        if shipment["status"] == "REMOVED":
            return shipment
        result = self.delivery.cancel_order(
            self._config(shipment), shipment["external_id"]
        )
        return self.repo.save_cdek_shipment(
            order_id, result, expected_updated_at=shipment.get("updated_at")
        )
