import hashlib
import json
import ssl
import tempfile
import unittest
from decimal import Decimal
from urllib.error import URLError
from unittest.mock import MagicMock, patch
from uuid import UUID

from store.infrastructure.tbank import TBankError, TBankPayment


class TBankPaymentTests(unittest.TestCase):
    def test_token_sorts_scalars_and_excludes_nested_values(self):
        payload = {"TerminalKey": "T", "Amount": 1000, "Receipt": {"Taxation": "usn_income"}, "DATA": {"x": "y"}}
        expected = hashlib.sha256("1000secretT".encode()).hexdigest()
        self.assertEqual(TBankPayment.token(payload, "secret"), expected)

    def test_notification_boolean_uses_json_lowercase(self):
        payload = {"Success": True, "TerminalKey": "T"}
        expected = hashlib.sha256("secrettrueT".encode()).hexdigest()
        self.assertEqual(TBankPayment.token(payload, "secret"), expected)

    @patch("store.infrastructure.tbank.urlopen")
    def test_init_uses_test_api_receipt_and_return_pages(self, mocked_urlopen):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = json.dumps({"Success": True, "PaymentId": "42", "Status": "NEW", "PaymentURL": "https://pay.example/42"}).encode()
        mocked_urlopen.return_value = response
        result = TBankPayment().init_payment(
            {"terminal_key": "T", "password": "secret", "environment": "test"},
            {"id": "order-1", "total": Decimal("12.50"), "customer_email": "buyer@example.ru"},
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
            {"Success": True, "PaymentURL": "https://pay.example/42"}
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
        
    @patch("store.infrastructure.tbank.urlopen", side_effect=URLError("connection refused"))
    def test_connection_error_is_reported_as_tbank_error(self, mocked_urlopen):
        with self.assertRaisesRegex(TBankError, "подключиться.*connection refused"):
            self._init_payment()

        mocked_urlopen.assert_called_once()

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


if __name__ == "__main__":
    unittest.main()