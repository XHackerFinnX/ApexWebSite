import json
import unittest
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError
from io import BytesIO

from store.infrastructure.order_webhook import OrderWebhook, WebhookError, NoRedirect


class OrderWebhookTests(unittest.TestCase):
    @patch("store.infrastructure.order_webhook.build_opener")
    def test_json_post_preserves_unicode_and_sends_stable_dedup_key(self, build):
        response = MagicMock()
        response.__enter__.return_value.status = 200
        build.return_value.open.return_value = response
        client = OrderWebhook("https://2p2p.ru/tilda/apex/webhook")
        payload = {"id": "order-1", "payload": {"Name": "Покупатель"}}
        client.send("order-1", payload)
        request = build.return_value.open.call_args.args[0]
        self.assertEqual(request.get_method(), "POST")
        self.assertEqual(json.loads(request.data), payload)
        self.assertEqual(request.get_header("Idempotency-key"), "apex-paid-order-1")
        self.assertEqual(request.full_url, "https://2p2p.ru/tilda/apex/webhook")
        self.assertNotIn("Cookie", request.headers)

    @patch("store.infrastructure.order_webhook.build_opener")
    def test_failure_body_and_contacts_do_not_enter_diagnostics(self, build):
        build.return_value.open.side_effect = HTTPError(
            "https://2p2p.ru/tilda/apex/webhook",
            503,
            "Unavailable",
            {},
            BytesIO(b"private@example.test"),
        )
        with self.assertRaises(WebhookError) as raised:
            OrderWebhook("https://2p2p.ru/tilda/apex/webhook").send("order-1", {})
        self.assertIn("503", str(raised.exception))
        self.assertNotIn("private", str(raised.exception))

    def test_redirect_is_not_followed_and_insecure_webhook_config_is_rejected(self):
        self.assertIsNone(
            NoRedirect().redirect_request(
                None, None, 302, "", {}, "https://elsewhere.example"
            )
        )
        for url in ["http://2p2p.ru/webhook", "https://user:password@2p2p.ru/webhook"]:
            with self.assertRaises(ValueError):
                OrderWebhook(url)
