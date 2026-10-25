import hashlib
import json
import ssl
import tempfile
import unittest
from decimal import Decimal
from io import BytesIO
from urllib.error import HTTPError, URLError
from unittest.mock import MagicMock, patch
from uuid import UUID

from store.infrastructure.tbank import TBankError, TBankPayment


class TBankPaymentTests(unittest.TestCase):
    def test_token_sorts_scalars_and_excludes_nested_values(self):
        payload = {
            "TerminalKey": "T",
            "Amount": 1000,
            "Receipt": {"Taxation": "usn_income"},
            "DATA": {"x": "y"},
        }
        expected = hashlib.sha256("1000secretT".encode()).hexdigest()
        self.assertEqual(TBankPayment.token(payload, "secret"), expected)

    def test_notification_boolean_uses_json_lowercase(self):
        payload = {"Success": True, "TerminalKey": "T"}
        expected = hashlib.sha256("secrettrueT".encode()).hexdigest()
        self.assertEqual(TBankPayment.token(payload, "secret"), expected)

    @patch("store.infrastructure.tbank.urlopen")
    def test_init_uses_test_api_receipt_and_return_pages(self, mocked_urlopen):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = json.dumps(
            {
                "Success": True,
                "PaymentId": "42",
                "Status": "NEW",
                "PaymentURL": "https://pay.example/42",
            }
        ).encode()
        mocked_urlopen.return_value = response
        result = TBankPayment().init_payment(
            {"terminal_key": "T", "password": "secret", "environment": "test"},
            {
                "id": "order-1",
                "total": Decimal("12.50"),
                "customer_email": "buyer@example.ru",
            },
            [{"name": "Футболка", "unit_price": Decimal("12.50"), "quantity": 1}],
            "https://shop.example.ru",
        )
        request = mocked_urlopen.call_args.args[0]
        body = json.loads(request.data)
        self.assertEqual(request.full_url, TBankPayment.TEST_URL)
        self.assertEqual(body["Amount"], 1250)
        self.assertEqual(body["Receipt"]["Taxation"], "usn_income")
        self.assertEqual(body["Receipt"]["Items"][0]["Tax"], "none")
        self.assertIn("/payment/success?order_id=order-1", body["SuccessURL"])
        self.assertEqual(result["PaymentURL"], "https://pay.example/42")

    @patch("store.infrastructure.tbank.urlopen")
    def test_init_serializes_uuid_order_id(self, mocked_urlopen):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = json.dumps(
            {
                "Success": True,
                "PaymentId": "42",
                "Status": "NEW",
                "PaymentURL": "https://pay.example/42",
            }
        ).encode()
        mocked_urlopen.return_value = response
        order_id = UUID("12345678-1234-5678-1234-567812345678")

        TBankPayment().init_payment(
            {"terminal_key": "T", "password": "secret", "environment": "test"},
            {
                "id": order_id,
                "total": Decimal("12.50"),
                "customer_email": "buyer@example.ru",
            },
            [{"name": "Футболка", "unit_price": Decimal("12.50"), "quantity": 1}],
            "https://shop.example.ru",
        )

        body = json.loads(mocked_urlopen.call_args.args[0].data)
        self.assertEqual(body["OrderId"], str(order_id))
        self.assertIn(f"order_id={order_id}", body["SuccessURL"])

    def test_public_https_is_required(self):
        with self.assertRaisesRegex(TBankError, "HTTPS"):
            TBankPayment().init_payment(
                {"terminal_key": "T", "password": "secret"},
                {"id": "1", "total": Decimal("1"), "customer_email": "a@b.ru"},
                [{"name": "x", "unit_price": Decimal("1"), "quantity": 1}],
                "http://localhost:8000",
            )

    @patch("store.infrastructure.tbank.ssl.create_default_context")
    def test_der_ca_certificate_is_added_to_ssl_context(self, create_context):
        context = MagicMock()
        create_context.return_value = context
        with tempfile.NamedTemporaryFile(suffix=".cer") as certificate:
            certificate.write(b"DER certificate")
            certificate.flush()
            payment = TBankPayment(certificate.name)

        context.load_verify_locations.assert_called_once_with(cadata=b"DER certificate")
        self.assertIs(payment.ssl_context, context)

    @patch("store.infrastructure.tbank.urlopen")
    def test_configured_ssl_context_is_used_for_request(self, mocked_urlopen):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = json.dumps(
            {
                "Success": True,
                "PaymentId": "42",
                "Status": "NEW",
                "PaymentURL": "https://pay.example/42",
            }
        ).encode()
        mocked_urlopen.return_value = response
        payment = TBankPayment()
        payment.ssl_context = ssl.create_default_context()

        payment.init_payment(
            {"terminal_key": "T", "password": "secret", "environment": "test"},
            {"id": "1", "total": Decimal("1"), "customer_email": "a@b.ru"},
            [{"name": "x", "unit_price": Decimal("1"), "quantity": 1}],
            "https://shop.example.ru",
        )

        self.assertIs(mocked_urlopen.call_args.kwargs["context"], payment.ssl_context)

    @patch(
        "store.infrastructure.tbank.urlopen", side_effect=URLError("connection refused")
    )
    def test_connection_error_is_reported_as_tbank_error(self, mocked_urlopen):
        with self.assertRaisesRegex(TBankError, "подключиться.*connection refused"):
            self._init_payment()

        mocked_urlopen.assert_called_once()

    @patch("store.infrastructure.tbank.urlopen")
    def test_http_error_exposes_tbank_error_code_and_details(self, mocked_urlopen):
        mocked_urlopen.side_effect = HTTPError(
            TBankPayment.TEST_URL,
            403,
            "Forbidden",
            {},
            BytesIO(
                json.dumps({"ErrorCode": "9999", "Details": "Доступ запрещён"}).encode()
            ),
        )

        with self.assertRaisesRegex(TBankError, "HTTP 403.*код 9999: Доступ запрещён"):
            self._init_payment()

    @patch("store.infrastructure.tbank.urlopen")
    def test_html_http_error_does_not_leak_response_page(self, mocked_urlopen):
        mocked_urlopen.side_effect = HTTPError(
            TBankPayment.TEST_URL,
            403,
            "Forbidden",
            {},
            BytesIO(b"<html>proxy block page</html>"),
        )

        with self.assertRaisesRegex(TBankError, "HTTP 403.*Forbidden") as raised:
            self._init_payment()
        self.assertNotIn("<html>", str(raised.exception))

    @patch("store.infrastructure.tbank.urlopen")
    def test_invalid_json_is_reported_as_tbank_error(self, mocked_urlopen):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = b"not JSON"
        mocked_urlopen.return_value = response

        with self.assertRaisesRegex(TBankError, "некорректный JSON"):
            self._init_payment()

    @staticmethod
    def _init_payment():
        return TBankPayment().init_payment(
            {"terminal_key": "T", "password": "secret", "environment": "test"},
            {"id": "1", "total": Decimal("1"), "customer_email": "a@b.ru"},
            [{"name": "x", "unit_price": Decimal("1"), "quantity": 1}],
            "https://shop.example.ru",
        )


class TBankProtocolTests(unittest.TestCase):
    def test_demo_terminal_never_uses_ip_allowlisted_test_host(self):
        for environment in ["test", "production", "demo"]:
            self.assertEqual(
                TBankPayment.base_url(
                    {"terminal_key": "123DEMO", "environment": environment}
                ),
                TBankPayment.PRODUCTION_BASE,
            )
        self.assertEqual(
            TBankPayment.base_url({"terminal_key": "123", "environment": "test"}),
            TBankPayment.TEST_BASE,
        )
        with self.assertRaisesRegex(TBankError, "DEMO"):
            TBankPayment.base_url({"terminal_key": "123", "environment": "demo"})

    def test_null_is_excluded_from_token_and_nested_data_never_enters_signature(self):
        data = {
            "Success": True,
            "TerminalKey": "T",
            "Something": None,
            "Data": {"Token": "nested"},
        }
        self.assertEqual(
            TBankPayment.token(data, "secret"),
            TBankPayment.token({"Success": True, "TerminalKey": "T"}, "secret"),
        )

    @patch("store.infrastructure.tbank.urlopen")
    def test_get_state_check_order_confirm_and_cancel_use_signed_json(self, opened):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = b'{"Success":true}'
        opened.return_value = response
        bank = TBankPayment()
        cfg = {
            "terminal_key": "123DEMO",
            "password": "secret",
            "environment": "test",
            "ffd_version": "1.2",
            "item_tax": "vat22",
            "receipt_enabled": "true",
        }
        bank.get_state(cfg, "42")
        bank.check_order(cfg, "order-1")
        order = {
            "id": "order-1",
            "external_payment_id": "42",
            "total": Decimal("1.00"),
            "customer_email": "buyer@example.test",
        }
        bank.confirm(
            cfg,
            order,
            [{"name": "Товар", "quantity": 1, "unit_price": Decimal("1.00")}],
        )
        bank.cancel_unpaid(cfg, "42")
        self.assertEqual(
            [call.args[0].full_url for call in opened.call_args_list],
            [
                TBankPayment.PRODUCTION_BASE + "/v2/" + name
                for name in ["GetState", "CheckOrder", "Confirm", "Cancel"]
            ],
        )
        for call in opened.call_args_list:
            payload = json.loads(call.args[0].data)
            self.assertEqual(payload["Token"], bank.token(payload, "secret"))
            self.assertNotIn("Password", payload)
        confirm = json.loads(opened.call_args_list[2].args[0].data)
        self.assertEqual(confirm["Receipt"]["FfdVersion"], "1.2")
        self.assertEqual(confirm["Receipt"]["Items"][0]["MeasurementUnit"], "шт")
        self.assertEqual(confirm["Receipt"]["Items"][0]["Tax"], "vat22")
        self.assertEqual(json.loads(opened.call_args_list[3].args[0].data)["Amount"], 0)

    @patch("store.infrastructure.tbank.urlopen")
    def test_string_false_is_not_a_success_response(self, opened):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = (
            b'{"Success":"false","Message":"bad"}'
        )
        opened.return_value = response
        with self.assertRaises(TBankError):
            TBankPayment().get_state({"terminal_key": "T", "password": "p"}, "42")

    def test_receipt_checks_total_and_uses_configured_delivery_tax(self):
        cfg = {
            "taxation": "osn",
            "item_tax": "vat22",
            "delivery_tax": "vat10",
            "ffd_version": "1.2",
        }
        order = {"total": Decimal("11.00"), "customer_email": "buyer@example.test"}
        items = [
            {"name": "Товар", "quantity": 1, "unit_price": Decimal("10.00")},
            {
                "name": "Доставка",
                "quantity": 1,
                "unit_price": Decimal("1.00"),
                "payment_object": "service",
            },
        ]
        receipt = TBankPayment.receipt(cfg, order, items)
        self.assertEqual(receipt["Taxation"], "osn")
        self.assertEqual(receipt["Items"][1]["Tax"], "vat10")
        self.assertEqual(receipt["Items"][1]["PaymentObject"], "service")
        with self.assertRaisesRegex(TBankError, "Сумма чека"):
            TBankPayment.receipt(cfg, {**order, "total": Decimal("10.00")}, items)


class TBankFailureTests(unittest.TestCase):
    @patch("store.infrastructure.tbank.urlopen")
    def test_test_api_403_explains_ip_allowlist_without_suggesting_live_retry(
        self, opened
    ):
        opened.side_effect = HTTPError(
            TBankPayment.TEST_URL, 403, "Forbidden", {}, BytesIO(b"Forbidden")
        )
        with self.assertRaises(TBankError) as raised:
            TBankPayment().get_state(
                {"terminal_key": "T", "password": "secret", "environment": "test"}, "42"
            )
        self.assertIn("внешний IP", str(raised.exception))
        self.assertIn("DEMO", str(raised.exception))
        self.assertFalse(raised.exception.ambiguous)
        self.assertEqual(opened.call_count, 1)

    @patch("store.infrastructure.tbank.urlopen", side_effect=TimeoutError())
    def test_timeout_is_ambiguous_and_not_automatically_reposted(self, opened):
        with self.assertRaises(TBankError) as raised:
            TBankPayment().get_state({"terminal_key": "T", "password": "p"}, "42")
        self.assertTrue(raised.exception.ambiguous)
        self.assertEqual(opened.call_count, 1)


if __name__ == "__main__":
    unittest.main()
