import hashlib
import json
import unittest
from decimal import Decimal
from unittest.mock import MagicMock, patch

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

    def test_public_https_is_required(self):
        with self.assertRaisesRegex(TBankError, "HTTPS"):
            TBankPayment().init_payment(
                {"terminal_key": "T", "password": "secret"},
                {"id": "1", "total": Decimal("1"), "customer_email": "a@b.ru"},
                [{"name": "x", "unit_price": Decimal("1"), "quantity": 1}],
                "http://localhost:8000",
            )


if __name__ == "__main__":
    unittest.main()