import copy
import unittest
from decimal import Decimal
from unittest.mock import Mock, patch
from uuid import uuid4

from store.application.ports import DeliveryError
from store.application.shipping import ShippingService
from store.infrastructure.cdek import CDEKDelivery


CONFIG = {
    "client_id": "test-account",
    "client_secret": "test-secret",
    "environment": "test",
    "contract_type": "1",
    "tariff_code": "136",
    "sender_city": "44",
    "sender_office": "MSK1",
    "dispatch_days": "2",
    "weight": "500",
    "length": "301",
    "width": "201",
    "height": "41",
    "dimension_type": "product",
    "cost_type": "calculator",
}


def order():
    return {
        "id": str(uuid4()),
        "status": "CONFIRMED",
        "customer_email": "buyer@example.test",
        "customer_details": {"recipient": "Иван Иванов", "phone": "+7 (999) 123-45-67"},
        "delivery_details": {"type": "pvz", "city_code": 270, "pvz": {"code": "SPB1"}},
        "items": [
            {
                "product_id": 7,
                "sku": "HOODIE-M",
                "name": "Худи",
                "quantity": 3,
                "unit_price": Decimal("500"),
                "line_total": Decimal("1000.01"),
                "weight": 600,
                "dimensions": "320x220x51",
            }
        ],
    }


class ShipmentRepository:
    def __init__(self):
        self.config = copy.deepcopy(CONFIG)
        self.order = order()
        self.shipment = None

    def get_integration_config(self, provider, enabled_only=True):
        return self.config

    def shipping_order(self, order_id):
        return self.order

    def cdek_shipment(self, order_id):
        return self.shipment

    def claim_cdek_shipment(self, order_id, payload, account_key):
        if self.shipment and self.shipment["status"] not in {"FAILED", "INVALID"}:
            return self.shipment, False
        self.shipment = {
            "status": "CREATING",
            "account_key": account_key,
            "request_payload": payload,
        }
        return self.shipment, True

    def save_cdek_shipment(self, order_id, result, expected_updated_at=None):
        self.shipment.update(result)
        return self.shipment


class CDEKOrderContractTests(unittest.TestCase):
    def setUp(self):
        self.provider = CDEKDelivery(None)
        self.order = order()

    def test_prepaid_order_matches_saved_items_and_has_one_address_per_end(self):
        payload = self.provider.order_payload(CONFIG, self.order)
        self.assertLessEqual(len(payload["number"]), 40)
        self.assertEqual(payload["shipment_point"], "MSK1")
        self.assertEqual(payload["delivery_point"], "SPB1")
        self.assertNotIn("from_location", payload)
        self.assertNotIn("to_location", payload)
        self.assertEqual(payload["recipient"]["phones"][0]["number"], "+79991234567")
        self.assertEqual(payload["delivery_recipient_cost"]["value"], 0)
        package = payload["packages"][0]
        self.assertEqual(
            [package[k] for k in ("weight", "length", "width", "height")],
            [1800, 32, 22, 16],
        )
        self.assertEqual(sum(i["amount"] for i in package["items"]), 3)
        self.assertEqual(
            sum(Decimal(str(i["cost"])) * i["amount"] for i in package["items"]),
            Decimal("1000.01"),
        )
        self.assertTrue(all(i["payment"]["value"] == 0 for i in package["items"]))

    def test_fixed_shipment_weight_covers_item_weights_and_matches_calculation(self):
        config = {**CONFIG, "dimension_type": "shipment"}
        package = self.provider.order_payload(config, self.order)["packages"][0]
        calculated = self.provider._calculation_payload(config, {}, self.order["items"])
        self.assertEqual(package["weight"], calculated["packages"][0]["weight"])
        self.assertGreaterEqual(
            package["weight"], sum(i["weight"] * i["amount"] for i in package["items"])
        )

    def test_accepted_request_is_not_reported_as_created(self):
        result = self.provider.order_result(
            {
                "entity": {"uuid": str(uuid4())},
                "requests": [{"type": "CREATE", "state": "ACCEPTED"}],
            }
        )
        self.assertEqual(result["status"], "PROCESSING")
        self.assertEqual(result["tracking_number"], "")

    def test_async_validation_errors_keep_uuid_and_message(self):
        external_id = str(uuid4())
        result = self.provider.order_result(
            {
                "entity": {"uuid": external_id},
                "requests": [
                    {
                        "type": "CREATE",
                        "state": "INVALID",
                        "errors": [{"message": "Не найден офис"}],
                    }
                ],
            }
        )
        self.assertEqual(result["status"], "INVALID")
        self.assertEqual(result["external_id"], external_id)
        self.assertIn("Не найден офис", result["error"])

    def test_cancel_and_lookup_use_documented_routes(self):
        external_id = str(uuid4())
        response = {
            "entity": {"uuid": external_id},
            "requests": [{"type": "DELETE", "state": "ACCEPTED"}],
        }
        with patch.object(
            self.provider, "_authorized", return_value=response
        ) as request:
            self.assertEqual(
                self.provider.cancel_order(CONFIG, external_id)["status"],
                "CANCEL_PENDING",
            )
            request.assert_called_with("orders/" + external_id, CONFIG, "DELETE")
            self.provider.order_info(CONFIG, number="APEX-123")
            request.assert_called_with("orders?im_number=APEX-123", CONFIG)

    def test_sender_office_must_be_active_and_accept_parcels(self):
        with (
            patch.object(self.provider, "_token_for", return_value="token"),
            patch.object(
                self.provider,
                "_request_json",
                side_effect=[
                    [{"code": 44, "city": "Москва"}],
                    [{"code": "MSK1", "is_reception": False}],
                ],
            ),
        ):
            with self.assertRaisesRegex(DeliveryError, "не принимает"):
                self.provider.test_configuration(CONFIG)

    def test_delivery_contract_omits_shop_only_number(self):
        payload = self.provider.order_payload(
            {**CONFIG, "contract_type": "2"}, self.order
        )
        with patch.object(
            self.provider,
            "_authorized",
            return_value={"entity": {"uuid": str(uuid4())}},
        ) as request:
            self.provider.register_order(CONFIG, payload)
            self.assertNotIn("number", request.call_args.args[3])

    def test_configuration_rejects_door_delivery_tariff(self):
        with (
            patch.object(self.provider, "_token_for", return_value="token"),
            patch.object(
                self.provider,
                "_request_json",
                side_effect=[
                    [{"code": 44, "city": "Москва"}],
                    [{"code": "MSK1", "is_reception": True}],
                    {"total_sum": 100},
                    {"tariff_codes": [{"tariff_code": 136, "delivery_mode": 3}]},
                ],
            ),
        ):
            with self.assertRaisesRegex(DeliveryError, "склад–склад"):
                self.provider.test_configuration(CONFIG)

    def test_configuration_checks_valid_warehouse_tariff(self):
        with (
            patch.object(self.provider, "_token_for", return_value="token"),
            patch.object(
                self.provider,
                "_request_json",
                side_effect=[
                    [{"code": 44, "city": "Москва"}],
                    [{"code": "MSK1", "is_reception": True}],
                    {"total_sum": 100},
                    {"tariff_codes": [{"tariff_code": 136, "delivery_mode": 4}]},
                ],
            ),
        ):
            checks = self.provider.test_configuration(CONFIG)
        self.assertTrue(checks["sender_office"])
        self.assertTrue(checks["tariff_mode"])


class ShippingWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.repo = ShipmentRepository()
        self.provider = Mock(wraps=CDEKDelivery(None))
        self.external_id = str(uuid4())
        self.provider.register_order = Mock(
            return_value={
                "external_id": self.external_id,
                "status": "PROCESSING",
                "error": "",
            }
        )
        self.provider.order_info = Mock(
            return_value={
                "external_id": self.external_id,
                "status": "CREATED",
                "tracking_number": "1234567890",
                "error": "",
            }
        )
        self.service = ShippingService(self.repo, self.provider)
        self.order_id = self.repo.order["id"]

    def test_repeated_create_reconciles_instead_of_posting_again(self):
        self.service.create(self.order_id)
        result = self.service.create(self.order_id)
        self.assertEqual(result["tracking_number"], "1234567890")
        self.assertEqual(self.provider.register_order.call_count, 1)
        self.provider.order_info.assert_called_once()

    def test_timeout_keeps_durable_claim_and_retry_only_looks_up(self):
        self.provider.register_order.side_effect = DeliveryError("Сеть недоступна")
        with self.assertRaises(DeliveryError):
            self.service.create(self.order_id)
        self.assertEqual(self.repo.shipment["status"], "UNKNOWN")
        self.service.create(self.order_id)
        self.assertEqual(self.provider.register_order.call_count, 1)
        self.assertEqual(
            self.provider.order_info.call_args.kwargs["number"],
            "APEX-" + self.order_id.replace("-", ""),
        )

    def test_missing_order_after_timeout_does_not_allow_duplicate_post(self):
        self.provider.register_order.side_effect = DeliveryError("Timeout")
        with self.assertRaises(DeliveryError):
            self.service.create(self.order_id)
        self.provider.order_info.side_effect = DeliveryError("Not found", 404)
        with self.assertRaisesRegex(ValueError, "кабинете СДЭК"):
            self.service.create(self.order_id)
        self.assertEqual(self.provider.register_order.call_count, 1)

    def test_definite_validation_failure_can_be_retried(self):
        self.provider.register_order.side_effect = DeliveryError("Bad request", 400)
        with self.assertRaises(DeliveryError):
            self.service.create(self.order_id)
        self.assertEqual(self.repo.shipment["status"], "FAILED")
        self.provider.register_order.side_effect = None
        self.service.create(self.order_id)
        self.assertEqual(self.provider.register_order.call_count, 2)

    def test_unpaid_order_is_never_sent(self):
        self.repo.order["status"] = "NEW"
        with self.assertRaisesRegex(ValueError, "подтверждения оплаты"):
            self.service.create(self.order_id)
        self.provider.register_order.assert_not_called()

    def test_changing_account_or_environment_cannot_access_old_shipment(self):
        self.service.create(self.order_id)
        self.repo.config["environment"] = "production"
        with self.assertRaisesRegex(ValueError, "исходные ID"):
            self.service.sync(self.order_id)
        self.provider.order_info.assert_not_called()

    def test_delivery_contract_without_uuid_requires_manual_reconciliation(self):
        self.repo.config["contract_type"] = "2"
        self.provider.register_order.side_effect = DeliveryError("Timeout")
        with self.assertRaises(DeliveryError):
            self.service.create(self.order_id)
        with self.assertRaisesRegex(ValueError, "поиск по номеру магазина недоступен"):
            self.service.sync(self.order_id)
        self.provider.order_info.assert_not_called()
