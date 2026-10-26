"""Signed mail contract, strict acknowledgements and safe retries."""

import hashlib
import hmac
import io
import json
import ssl
import unittest
from datetime import datetime, timedelta, timezone
from unittest.mock import Mock, MagicMock, patch
from urllib.error import HTTPError, URLError
from urllib.request import Request
from uuid import uuid4

from store.config import Settings
from store.infrastructure.mailer import EmailGateway, EmailServiceError, NoMailRedirect


class EmailGatewayTests(unittest.TestCase):
    def config(self, **extra):
        return Settings(
            _env_file=None,
            POSTGRESQL_USER="test",
            POSTGRESQL_PASSWORD="test",
            POSTGRESQL_HOST="localhost",
            POSTGRESQL_DATABASE="test",
            ADMIN_PASSWORD="test-only-admin",
            **{
                "EMAIL_SERVICE_SECRET": "test-shared-service-secret-32-characters",
                "WEBAPP_URL": "https://apextop.ru",
                "GEOIP_LOOKUP_ENABLED": False,
                **extra,
            },
        )

    def setUp(self):
        self.gateway = EmailGateway(self.config())
        self.now = datetime.now(timezone.utc)
        self.message = self.gateway.prepare(
            "registration",
            {
                "email": "member@example.test",
                "name": "Александр <img src=x>",
                "code": "012345",
            },
            uuid4(),
            self.now,
            self.now + timedelta(minutes=10),
        )
        self.gateway.opener = MagicMock()
        self.response = self.gateway.opener.open.return_value.__enter__.return_value
        self.response.status = 202
        self.response.headers = {"Content-Type": "application/json; charset=utf-8"}
        self.response.read.return_value = json.dumps(
            {"ok": True, "message_id": self.message["message_id"]}
        ).encode()

    def test_request_is_post_json_with_exact_raw_body_hmac_and_stable_id(self):
        with patch("store.infrastructure.mailer.time.time", return_value=1_800_000_000):
            self.gateway.send(self.message)
        request = self.gateway.opener.open.call_args.args[0]
        self.assertEqual(request.full_url, "https://2p2p.ru/api/apex/email")
        self.assertEqual(request.get_method(), "POST")
        headers = dict((key.lower(), value) for key, value in request.header_items())
        expected = hmac.new(
            self.gateway.secret.encode(), b"1800000000." + request.data, hashlib.sha256
        ).hexdigest()
        self.assertEqual(headers["x-apex-timestamp"], "1800000000")
        self.assertEqual(headers["x-apex-signature"], "sha256=" + expected)
        self.assertEqual(
            headers["idempotency-key"], "apex-mail-" + self.message["message_id"]
        )
        self.assertEqual(headers["content-type"], "application/json; charset=utf-8")
        self.assertEqual(self.gateway.opener.open.call_args.kwargs["timeout"], 10)
        self.assertEqual(json.loads(request.data), self.message)
        self.assertIn("Александр".encode(), request.data)
        self.assertNotIn(self.gateway.secret.encode(), request.data)
        self.assertNotIn(self.gateway.secret, str(headers))
        self.assertEqual(self.message["data"]["code"], "012345")
        self.assertIn("&lt;img src=x&gt;", self.message["html"])
        self.assertNotIn("<img src=x>", self.message["html"])
        self.assertEqual(self.message["request_context"], {})
        self.assertEqual(
            set(self.message),
            {
                "schema_version",
                "message_id",
                "source",
                "site_url",
                "kind",
                "to",
                "subject",
                "text",
                "html",
                "created_at",
                "expires_at",
                "data",
                "request_context",
            },
        )

    def test_retry_keeps_exact_body_and_id_but_renews_signature_timestamp(self):
        with patch("store.infrastructure.mailer.time.time", return_value=1_800_000_000):
            self.gateway.send(self.message)
        with patch("store.infrastructure.mailer.time.time", return_value=1_800_000_020):
            self.gateway.send(self.message)
        first, second = [
            call.args[0] for call in self.gateway.opener.open.call_args_list
        ]
        self.assertEqual(first.data, second.data)
        self.assertEqual(
            first.get_header("Idempotency-key"), second.get_header("Idempotency-key")
        )
        self.assertNotEqual(
            first.get_header("X-apex-signature"), second.get_header("X-apex-signature")
        )

    def test_wrong_ack_empty_html_boolean_or_unrelated_message_never_marks_done(self):
        for body in [
            b"",
            b"<html>OK</html>",
            b"[]",
            b"null",
            b"true",
            b'{"ok":true}',
            json.dumps({"ok": 1, "message_id": self.message["message_id"]}).encode(),
            json.dumps({"ok": True, "message_id": str(uuid4())}).encode(),
        ]:
            with self.subTest(body=body[:50]):
                self.response.read.return_value = body
                with self.assertRaisesRegex(EmailServiceError, "EMAIL_INVALID_ACK"):
                    self.gateway.send(self.message)
        self.response.read.return_value = b" " * 16_385
        with self.assertRaisesRegex(EmailServiceError, "EMAIL_INVALID_ACK"):
            self.gateway.send(self.message)
        self.response.read.return_value = json.dumps(
            {"ok": True, "message_id": self.message["message_id"]}
        ).encode()
        self.response.headers = {"Content-Type": "text/html"}
        with self.assertRaisesRegex(EmailServiceError, "EMAIL_INVALID_ACK"):
            self.gateway.send(self.message)

    def test_only_200_and_202_with_valid_json_are_acknowledged(self):
        for status in [200, 202]:
            self.response.status = status
            self.gateway.send(self.message)
        for status in [
            201,
            204,
            301,
            302,
            307,
            308,
            400,
            401,
            403,
            404,
            409,
            429,
            500,
            503,
        ]:
            with self.subTest(status=status):
                self.response.status = status
                with self.assertRaisesRegex(
                    EmailServiceError, "EMAIL_HTTP_" + str(status)
                ):
                    self.gateway.send(self.message)

    def test_http_errors_keep_only_safe_code_and_bound_retry_delay(self):
        for status, delay in [
            (401, "0"),
            (403, "0"),
            (429, "60"),
            (503, "99999"),
            (503, "Wed, 21 Oct 2026 07:28:00 GMT"),
        ]:
            error = HTTPError(
                "https://private.example/secret",
                status,
                "private content",
                {"Retry-After": delay},
                io.BytesIO(b"private code 012345"),
            )
            self.gateway.opener.open.side_effect = error
            with self.assertRaises(EmailServiceError) as caught:
                self.gateway.send(self.message)
            self.assertEqual(str(caught.exception), "EMAIL_HTTP_" + str(status))
            self.assertNotIn("private", str(caught.exception))
            self.assertLessEqual(caught.exception.retry_after, 300)
            if status == 429:
                self.assertEqual(caught.exception.retry_after, 60)

    def test_transport_errors_never_expose_url_tokens_or_content(self):
        for error in [
            URLError("private-url?code=012345"),
            TimeoutError("reset-secret"),
            ssl.SSLError("private-certificate-url"),
        ]:
            self.gateway.opener.open.side_effect = error
            with self.assertRaisesRegex(EmailServiceError, "^EMAIL_NETWORK_ERROR$"):
                self.gateway.send(self.message)

    def test_https_and_no_redirects_and_short_secrets_cannot_enable_delivery(self):
        gateway = EmailGateway(self.config())
        self.assertTrue(gateway.context.check_hostname)
        self.assertEqual(gateway.context.verify_mode, ssl.CERT_REQUIRED)
        self.assertIsNone(
            NoMailRedirect().redirect_request(
                Request("https://2p2p.ru/api/apex/email"),
                None,
                302,
                "Found",
                {},
                "https://other.example",
            )
        )
        for url in [
            "http://2p2p.ru/api/apex/email",
            "https://user:password@2p2p.ru/mail",
            "https://2p2p.ru/mail?token=secret",
            "https://2p2p.ru/mail#fragment",
            "https://2p2p.ru/unsafe\npath",
        ]:
            with self.subTest(url=url), self.assertRaises(ValueError):
                self.config(EMAIL_SERVICE_URL=url)
        with self.assertRaises(ValueError):
            self.config(EMAIL_SERVICE_SECRET="short")
        for extra in [{"EMAIL_SERVICE_SECRET": ""}, {"EMAIL_SERVICE_URL": ""}]:
            disabled = EmailGateway(self.config(**extra))
            self.assertFalse(disabled.configured)
            with self.assertRaisesRegex(EmailServiceError, "EMAIL_NOT_CONFIGURED"):
                disabled.send(self.message)

    def test_reset_message_retains_original_expiry_link_and_request_context(self):
        data = {
            "name": "Member",
            "email": "member@example.test",
            "url": "https://apextop.ru/account#reset-password=test-token",
            "ip": "8.8.8.8",
            "agent": "Chrome / Android",
            "requested_at": self.now.isoformat(),
        }
        self.gateway.geo.lookup = Mock(return_value="Россия, Москва")
        expiry = self.now + timedelta(minutes=30)
        message = self.gateway.prepare(
            "password_reset", data, uuid4(), self.now, expiry
        )
        self.assertEqual(message["data"], {"name": "Member", "reset_url": data["url"]})
        self.assertNotIn("code", message["data"])
        self.assertEqual(message["expires_at"], expiry.isoformat())
        self.assertEqual(message["request_context"]["ip"], "8.8.8.8")
        self.assertEqual(message["request_context"]["location"], "Россия, Москва")
        self.assertIn(data["url"], message["text"])
        self.assertIn("проигнорируй", message["html"])


if __name__ == "__main__":
    unittest.main()
