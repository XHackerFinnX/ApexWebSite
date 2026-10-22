import base64
import io
import json
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path
from unittest.mock import patch

from PIL import Image

from store.application.checkout import CheckoutService, allocate_discount, receipt_items
from store.domain import Product
from store.infrastructure.cdek import CDEKDelivery, CDEKError
from store.infrastructure.media import store_image
from store.infrastructure.security import hash_password, verify_password
from store.messaging.events import Event
from store.messaging.rabbitmq import RabbitMQPublisher


class Repository:
    def __init__(self):
        self.products = {
            1: Product(
                1, "Худи", "", Decimal("1000"), "Худи", ("M",), stock=10, is_active=True
            ),
            2: Product(
                2,
                "Футболка",
                "",
                Decimal("500"),
                "Футболки",
                ("M",),
                stock=10,
                is_active=True,
            ),
        }
        self.promo = {
            "id": 1,
            "product_id": 1,
            "discount_type": "percent",
            "value": Decimal("10"),
        }

    def get_product(self, key):
        return self.products.get(key)

    def get_promotion(self, code):
        return self.promo if code == "HOODIE10" else None

    def loyalty_settings(self):
        return {"earn_percent": 5, "redeem_percent": 20}

    def get_integration_config(self, provider):
        return {"enabled": True} if provider == "pickup" else None


class QuoteTests(unittest.TestCase):
    def setUp(self):
        self.repo = Repository()
        self.service = CheckoutService(None, self.repo)
        self.data = {
            "items": [
                {"product_id": 1, "quantity": 2, "size": "M"},
                {"product_id": 2, "quantity": 1, "size": "M"},
            ]
        }

    def test_coupon_only_discounts_its_product(self):
        result = self.service.quote({**self.data, "promo_code": "hoodie10"})
        self.assertEqual(result["promo_discount"], Decimal("200"))
        self.assertEqual(result["total"], Decimal("2300"))
        self.assertEqual(result["items"][1]["line_total"], Decimal("500"))

    def test_fixed_coupon_cannot_exceed_eligible_subtotal(self):
        self.repo.promo.update(discount_type="fixed", value=Decimal("9000"))
        result = self.service.quote({**self.data, "promo_code": "HOODIE10"})
        self.assertEqual(result["total"], Decimal("500"))

    def test_coupon_for_absent_product_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "другой товар"):
            self.service.quote(
                {"items": [self.data["items"][1]], "promo_code": "HOODIE10"}
            )

    def test_invalid_coupon_is_not_silently_ignored(self):
        with self.assertRaisesRegex(ValueError, "недействителен"):
            self.service.quote({**self.data, "promo_code": "INVALID"})

    def test_loyalty_cap_after_coupon_and_earning_after_redemption(self):
        result = self.service.quote(
            {**self.data, "promo_code": "HOODIE10", "points": 460},
            {"id": 1, "points": 1000},
        )
        self.assertEqual(result["max_points"], 460)
        self.assertEqual(result["total"], Decimal("1840"))
        self.assertEqual(result["points_earned"], 92)

    def test_cannot_redeem_without_login(self):
        with self.assertRaises(ValueError):
            self.service.quote({**self.data, "points": 1})

    def test_cannot_redeem_more_than_balance(self):
        with self.assertRaises(ValueError):
            self.service.quote({**self.data, "points": 6}, {"id": 1, "points": 5})

    def test_duplicates_are_aggregated_before_stock_check(self):
        with self.assertRaisesRegex(ValueError, "Недостаточно"):
            self.service.quote(
                {
                    "items": [
                        {"product_id": 1, "quantity": 6},
                        {"product_id": 1, "quantity": 6},
                    ]
                }
            )

    def test_client_price_and_discount_are_ignored(self):
        result = self.service.quote(
            {**self.data, "total": 1, "discount": 9999, "promo": {"value": 100}}
        )
        self.assertEqual(result["total"], Decimal("2500"))

    def test_inactive_product_is_unavailable(self):
        self.repo.products[1].is_active = False
        with self.assertRaises(ValueError):
            self.service.quote(self.data)

    def test_missing_variant_is_rejected(self):
        self.repo.products[1].variants = (
            {"size": "L", "color": "red", "price": "700", "stock": 2},
        )
        with self.assertRaises(ValueError):
            self.service.quote(self.data)

    def test_price_and_stock_from_selected_variant(self):
        self.repo.products[1].variants = (
            {"size": "M", "color": "red", "price": "700", "stock": 2},
        )
        result = self.service.quote(
            {"items": [{"product_id": 1, "quantity": 2, "size": "M", "color": "red"}]}
        )
        self.assertEqual(result["total"], Decimal("1400"))

    def test_delivery_price_is_recomputed_and_receipt_exact(self):
        class Delivery:
            def calculate(self, *args, **kwargs):
                return {"price": Decimal("329.45")}

            def pvz(self, *args, **kwargs):
                return [{"code": "GOOD", "address": "Test"}]

        self.service.delivery = Delivery()
        result = self.service.quote(
            {
                **self.data,
                "promo_code": "HOODIE10",
                "points": 113,
                "delivery": {
                    "type": "pvz",
                    "city_code": 44,
                    "price": 0,
                    "pvz": {"code": "GOOD"},
                },
            },
            {"id": 1, "points": 1000},
            True,
        )
        lines = receipt_items(result["items"], result["shipping"])
        self.assertEqual(
            sum((i["unit_price"] * i["quantity"] for i in lines), Decimal(0)),
            result["total"],
        )
        self.assertEqual(result["shipping"], Decimal("329.45"))

    def test_wrong_delivery_point_is_rejected(self):
        class Delivery:
            def pvz(self, *args, **kwargs):
                return [{"code": "GOOD"}]

        self.service.delivery = Delivery()
        with self.assertRaisesRegex(ValueError, "ПВЗ"):
            self.service.quote(
                {
                    **self.data,
                    "delivery": {
                        "type": "pvz",
                        "city_code": 44,
                        "pvz": {"code": "BAD"},
                    },
                },
                None,
                True,
            )

    def test_rounding_preserves_every_kopeck(self):
        for cents in range(1, 90):
            items = [
                {
                    "name": "a",
                    "quantity": 3,
                    "unit_price": Decimal(".11"),
                    "line_total": Decimal(".33"),
                },
                {
                    "name": "b",
                    "quantity": 7,
                    "unit_price": Decimal(".13"),
                    "line_total": Decimal(".91"),
                },
            ]
            allocate_discount(items, Decimal(cents) / 100)
            result = receipt_items(items)
            self.assertEqual(
                sum((i["unit_price"] * i["quantity"] for i in result), Decimal(0)),
                Decimal("1.24") - Decimal(cents) / 100,
            )


class MediaAndSecurityTests(unittest.TestCase):
    def test_inline_photo_becomes_deduplicated_responsive_webp(self):
        image = Image.new("RGB", (1200, 1500), (200, 70, 20))
        buffer = io.BytesIO()
        image.save(buffer, "PNG")
        value = "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
        with (
            tempfile.TemporaryDirectory() as directory,
            patch("store.infrastructure.media.MEDIA_ROOT", Path(directory)),
        ):
            url = store_image(value)
            self.assertEqual(url, store_image(value))
            self.assertTrue(url.startswith("/media/"))
            self.assertEqual(len(list(Path(directory).glob("*.webp"))), 4)
            with Image.open(
                Path(directory) / (url.split("/")[-1].replace(".webp", "-240.webp"))
            ) as result:
                self.assertLessEqual(max(result.size), 240)

    def test_rejects_active_or_invalid_image_data(self):
        for value in [
            "javascript:alert(1)",
            "data:image/svg+xml;base64,AAAA",
            "data:image/png;base64,invalid",
        ]:
            with self.assertRaises(ValueError):
                store_image(value)

    def test_hashes_are_salted_and_password_is_verified(self):
        first = hash_password("very-long-password")
        second = hash_password("very-long-password")
        self.assertNotEqual(first, second)
        self.assertTrue(verify_password("very-long-password", first))
        self.assertFalse(verify_password("wrong", first))

    def test_password_length_is_bounded(self):
        for value in ["short", "x" * 257]:
            with self.assertRaises(ValueError):
                hash_password(value)

    def test_rmq_is_disabled_without_importing_pika(self):
        with self.assertRaisesRegex(RuntimeError, "disabled"):
            RabbitMQPublisher("amqp://unused")
        event = json.loads(
            Event(
                "order.payment_confirmed.v1", "order-id", {"order_id": "order-id"}
            ).encode()
        )
        self.assertEqual(event["version"], 1)
        self.assertTrue(event["id"])
        self.assertIn("+00:00", event["occurred_at"])


class CDEKEdgeTests(unittest.TestCase):
    def setUp(self):
        self.repo = Repository()
        self.config = {
            "environment": "test",
            "client_id": "local-test",
            "client_secret": "local-test",
            "sender_city": "44",
            "contract_type": "1",
            "tariff_code": "136",
            "dispatch_days": "2",
            "weight": "500",
            "length": "301",
            "width": "201",
            "height": "41",
            "dimension_type": "shipment",
            "cost_type": "calculator",
            "markup": "0",
        }
        self.repo.get_integration_config = lambda provider: self.config
        self.service = CDEKDelivery(self.repo)

    def test_dimensions_round_up_and_dispatch_has_moscow_timezone(self):
        payload = self.service._calculation_payload(self.config, {"code": 44})
        self.assertEqual(
            payload["packages"][0],
            {"weight": 500, "length": 31, "width": 21, "height": 5},
        )
        self.assertTrue(payload["date"].endswith("+0300"))

    def test_product_dimensions_and_quantity_change_parcel(self):
        payload = self.service._calculation_payload(
            {**self.config, "dimension_type": "product"},
            {"code": 44},
            [{"quantity": 2, "weight": 600, "dimensions": "320x220x51"}],
        )
        self.assertEqual(
            payload["packages"][0],
            {"weight": 1200, "length": 32, "width": 22, "height": 11},
        )

    def test_zero_delivery_price_is_valid_and_days_include_dispatch(self):
        with patch.object(
            self.service,
            "_authorized",
            return_value={"total_sum": 0, "period_min": 3, "period_max": 5},
        ):
            result = self.service.calculate("101000")
            self.assertEqual(result["price"], 0)
            self.assertEqual(result["days"], 5)
            self.assertEqual(result["days_max"], 7)

    def test_free_threshold_and_markup(self):
        self.config.update(
            markup="10", markup_type="percent", free_delivery_from="2000"
        )
        with patch.object(
            self.service,
            "_authorized",
            return_value={"total_sum": 300, "period_min": 1},
        ):
            self.assertEqual(self.service.calculate("101000", 1000)["price"], 330)
            self.assertEqual(self.service.calculate("101000", 2000)["price"], 0)

    def test_401_refreshes_token_once(self):
        with (
            patch.object(
                self.service, "_token_for", side_effect=["first", "second"]
            ) as tokens,
            patch.object(
                self.service,
                "_request_json",
                side_effect=[CDEKError("expired", 401), []],
            ) as request,
        ):
            self.assertEqual(
                self.service._authorized("deliverypoints", self.config), []
            )
            self.assertEqual(tokens.call_count, 2)
            self.assertEqual(request.call_count, 2)

    def test_repeated_401_does_not_loop(self):
        with (
            patch.object(self.service, "_token_for", return_value="token"),
            patch.object(
                self.service, "_request_json", side_effect=CDEKError("expired", 401)
            ) as request,
        ):
            with self.assertRaises(CDEKError):
                self.service._authorized("deliverypoints", self.config)
            self.assertEqual(request.call_count, 2)

    def test_invalid_postcode_is_rejected(self):
        for value in ["", "abc", "12345"]:
            with self.assertRaises(ValueError):
                self.service._destination(value)

    def test_environment_change_cannot_reuse_token(self):
        responses = [
            {"access_token": "first", "expires_in": 3600},
            {"access_token": "second", "expires_in": 3600},
        ]
        with patch.object(self.service, "_open", side_effect=responses) as opened:
            self.assertEqual(self.service._token_for(self.config), "first")
            self.assertEqual(self.service._token_for(self.config), "first")
            self.assertEqual(
                self.service._token_for({**self.config, "environment": "production"}),
                "second",
            )
            self.assertEqual(opened.call_count, 2)
