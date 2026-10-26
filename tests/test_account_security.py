"""Security boundaries and concurrent one-time flows against an isolated schema."""

import concurrent.futures
import json
import os
import secrets
import smtplib
import ssl
import unittest
from unittest.mock import Mock, patch
from uuid import uuid4
from types import SimpleNamespace

import test_postgres_commerce as commerce_tests
from store.application.account_security import AccountSecurity, SecurityError
from store.application.email_worker import EmailWorker
from store.config import Settings
from store.infrastructure.captcha import render_challenge
from store.infrastructure.mailer import GeoLocation, SMTPMailer, render_email


@unittest.skipUnless(
    os.getenv("APEX_TEST_DATABASE") == "1", "isolated PostgreSQL tests are opt-in"
)
class AccountSecurityTests(unittest.TestCase):
    setUpClass = classmethod(commerce_tests.PostgreSQLCommerceTests.setUpClass.__func__)
    tearDownClass = classmethod(
        commerce_tests.PostgreSQLCommerceTests.tearDownClass.__func__
    )

    def http_request(self, *args, **kwargs):
        status, data, headers = commerce_tests.PostgreSQLCommerceTests.http_request(
            self, *args, **kwargs
        )
        return SimpleNamespace(status=status, headers=headers), data

    def setUp(self):
        commerce_tests.PostgreSQLCommerceTests.setUp(self)
        with self.repo._db() as db:
            db.execute(
                "TRUNCATE security_counters,captcha_challenges,pending_registrations,password_reset_tokens,email_outbox"
            )
        self.mailer = Mock(configured=True)
        self.security = AccountSecurity(
            self.repo,
            self.mailer,
            "https://apextop.ru",
            renderer=lambda: ("ABCDE", render_challenge()[1]),
        )
        self.web.security = self.security
        self.web.checkout = self.checkout
        self.web.trust_proxy_headers = False
        self.ip, self.browser, self.agent = (
            "203.0.113.4",
            secrets.token_urlsafe(32),
            "APEX security tests",
        )
        self.worker = EmailWorker(self.security)

    def proof(self, purpose, context, *, ip=None, browser=None, agent=None):
        values = (ip or self.ip, browser or self.browser, agent or self.agent)
        challenge = self.security.challenge(purpose, context, *values)
        with self.repo._db() as db:
            db.execute(
                "UPDATE captcha_challenges SET created_at=now()-interval '2 seconds' WHERE id=%s",
                (challenge["id"],),
            )
        return self.security.solve({"id": challenge["id"], "answer": "abcde"}, *values)[
            "proof"
        ]

    def request_registration(self, email="new@example.test"):
        data = {
            "email": email,
            "name": "New Member",
            "password": "strong-new-member-password",
        }
        data["captcha_proof"] = self.proof("register", email)
        return self.security.register(data, self.ip, self.browser, self.agent)

    def mail_payload(self, kind):
        with self.repo._db() as db:
            row = db.execute(
                "SELECT * FROM email_outbox WHERE kind=%s ORDER BY created_at DESC LIMIT 1",
                (kind,),
            ).fetchone()
        return row, json.loads(self.repo.box.decrypt(row["payload_encrypted"]))

    def forgot(self, email="member@example.test"):
        return self.security.forgot(
            {"email": email, "captcha_proof": self.proof("reset", email)},
            self.ip,
            self.browser,
            self.agent,
        )

    def reset_token(self):
        self.forgot()
        return self.mail_payload("password_reset")[1]["url"].split("reset-password=")[1]

    def test_registration_requires_single_use_captcha_before_mail_or_account(self):
        with self.assertRaises(SecurityError):
            self.security.register(
                {
                    "name": "New Member",
                    "email": "new@example.test",
                    "password": "strong-password",
                },
                self.ip,
                self.browser,
                self.agent,
            )
        with self.repo._db() as db:
            self.assertEqual(
                db.execute("SELECT count(*) AS n FROM email_outbox").fetchone()["n"], 0
            )
            self.assertFalse(
                db.execute(
                    "SELECT 1 FROM customers WHERE email='new@example.test'"
                ).fetchone()
            )
        result = self.request_registration()
        self.assertTrue(result["verification_required"])
        self.mailer.send.assert_not_called()
        with self.assertRaises(ValueError):
            self.repo.login_customer("new@example.test", "strong-new-member-password")
        row, payload = self.mail_payload("registration")
        self.assertRegex(payload["code"], r"^[0-9]{6}$")
        self.assertNotIn(payload["code"], row["payload_encrypted"])
        with self.repo._db() as db:
            pending = db.execute("SELECT * FROM pending_registrations").fetchone()
            self.assertNotEqual(pending["code_hash"], payload["code"])
            self.assertNotIn("strong-new-member-password", pending["password_hash"])
        customer = self.security.verify_registration(
            {"verification_id": result["verification_id"], "code": payload["code"]},
            self.ip,
        )
        self.assertEqual(customer["email"], "new@example.test")
        self.assertNotIn("password_hash", customer)
        self.assertEqual(
            self.repo.login_customer("new@example.test", "strong-new-member-password")[
                "id"
            ],
            customer["id"],
        )
        with self.assertRaises(SecurityError):
            self.security.verify_registration(
                {"verification_id": result["verification_id"], "code": payload["code"]},
                self.ip,
            )

    def test_code_keeps_leading_zeros_and_failed_attempts_commit(self):
        with patch(
            "store.application.account_security.secrets.randbelow", return_value=0
        ):
            result = self.request_registration()
        self.assertEqual(self.mail_payload("registration")[1]["code"], "000000")
        for _ in range(5):
            with self.assertRaises(SecurityError):
                self.security.verify_registration(
                    {"verification_id": result["verification_id"], "code": "111111"},
                    self.ip,
                )
        with self.repo._db() as db:
            self.assertEqual(
                db.execute("SELECT attempts FROM pending_registrations").fetchone()[
                    "attempts"
                ],
                5,
            )
        with self.assertRaises(SecurityError):
            self.security.verify_registration(
                {"verification_id": result["verification_id"], "code": "000000"},
                self.ip,
            )

    def test_expired_registration_and_replaced_code_cannot_create_account(self):
        old = self.request_registration()
        old_code = self.mail_payload("registration")[1]["code"]
        with self.repo._db() as db:
            db.execute(
                "UPDATE pending_registrations SET created_at=now()-interval '61 seconds'"
            )
        new = self.request_registration()
        with self.assertRaises(SecurityError):
            self.security.verify_registration(
                {"verification_id": old["verification_id"], "code": old_code}, self.ip
            )
        with self.repo._db() as db:
            self.assertEqual(
                db.execute(
                    "SELECT state FROM email_outbox WHERE context_id=%s",
                    (old["verification_id"],),
                ).fetchone()["state"],
                "expired",
            )
            db.execute(
                "UPDATE pending_registrations SET expires_at=now()-interval '1 second'"
            )
        with self.assertRaises(SecurityError):
            self.security.verify_registration(
                {
                    "verification_id": new["verification_id"],
                    "code": self.mail_payload("registration")[1]["code"],
                },
                self.ip,
            )

    def test_registration_cooldown_and_existing_account_response(self):
        new = self.request_registration()
        with self.assertRaises(SecurityError) as caught:
            self.request_registration()
        self.assertEqual(caught.exception.status, 429)
        existing = self.request_registration("member@example.test")
        self.assertEqual(set(new), set(existing))
        with self.repo._db() as db:
            self.assertEqual(
                db.execute("SELECT count(*) AS n FROM email_outbox").fetchone()["n"], 1
            )

    def test_parallel_verification_creates_one_account(self):
        registration = self.request_registration()
        data = {
            "verification_id": registration["verification_id"],
            "code": self.mail_payload("registration")[1]["code"],
        }

        def run():
            try:
                self.security.verify_registration(data, self.ip)
                return True
            except SecurityError:
                return False

        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            self.assertEqual(sum(pool.map(lambda _: run(), range(4))), 1)

    def test_captcha_bound_to_browser_ip_agent_action_and_order_data(self):
        proof = self.proof("register", "new@example.test")
        for purpose, context, ip, browser, agent in [
            ("reset", "new@example.test", self.ip, self.browser, self.agent),
            ("register", "other@example.test", self.ip, self.browser, self.agent),
            ("register", "new@example.test", "203.0.113.5", self.browser, self.agent),
            (
                "register",
                "new@example.test",
                self.ip,
                secrets.token_urlsafe(32),
                self.agent,
            ),
            ("register", "new@example.test", self.ip, self.browser, "different agent"),
        ]:
            with self.assertRaises(SecurityError):
                self.security.consume(proof, purpose, context, ip, browser, agent)
        self.security.consume(
            proof, "register", "new@example.test", self.ip, self.browser, self.agent
        )
        with self.assertRaises(SecurityError):
            self.security.consume(
                proof, "register", "new@example.test", self.ip, self.browser, self.agent
            )
        proof = self.proof(
            "checkout", {"items": [{"product_id": 1}], "idempotency_key": "key-one"}
        )
        with self.assertRaises(SecurityError):
            self.security.consume(
                proof,
                "checkout",
                {"items": [{"product_id": 2}], "idempotency_key": "key-one"},
                self.ip,
                self.browser,
                self.agent,
            )

    def test_captcha_proof_has_one_concurrent_consumer_and_survives_restart(self):
        proof = self.proof("reset", "member@example.test")
        second = AccountSecurity(self.repo, self.mailer)

        def consume():
            try:
                second.consume(
                    proof,
                    "reset",
                    "member@example.test",
                    self.ip,
                    self.browser,
                    self.agent,
                )
                return True
            except SecurityError:
                return False

        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
            self.assertEqual(sum(pool.map(lambda _: consume(), range(6))), 1)

    def test_captcha_five_attempts_expiry_and_no_demo_bypass(self):
        challenge = self.security.challenge(
            "login", "member@example.test", self.ip, self.browser, self.agent
        )
        self.assertEqual(set(challenge), {"id", "image", "expires_in"})
        for _ in range(5):
            with self.assertRaises(SecurityError):
                self.security.solve(
                    {"id": challenge["id"], "answer": "wrong"},
                    self.ip,
                    self.browser,
                    self.agent,
                )
        with self.repo._db() as db:
            db.execute(
                "UPDATE captcha_challenges SET created_at=now()-interval '2 seconds'"
            )
        with self.assertRaises(SecurityError):
            self.security.solve(
                {"id": challenge["id"], "answer": "ABCDE"},
                self.ip,
                self.browser,
                self.agent,
            )
        proof = self.proof("login", "member@example.test")
        with self.repo._db() as db:
            db.execute(
                "UPDATE captcha_challenges SET expires_at=now()-interval '1 second'"
            )
        for value in (proof, "demo-pass", "captcha-approved"):
            with self.assertRaises(SecurityError):
                self.security.consume(
                    value,
                    "login",
                    "member@example.test",
                    self.ip,
                    self.browser,
                    self.agent,
                )

    def test_normal_login_has_no_captcha_but_failures_and_logout_cycles_do(self):
        data = {"email": "member@example.test", "password": "a-secure-test-password"}
        customer, token = self.security.login(data, self.ip, "", self.agent)
        self.assertEqual(self.repo.customer_for_session(token)["id"], customer["id"])
        for _ in range(3):
            with self.assertRaises(SecurityError):
                self.security.login(
                    {**data, "password": "wrong"}, self.ip, "", self.agent
                )
        with self.assertRaises(SecurityError) as caught:
            self.security.login(data, self.ip, "", self.agent)
        self.assertEqual(caught.exception.status, 403)
        self.assertTrue(caught.exception.captcha_required)
        proof = self.proof("login", data["email"])
        self.security.login(
            {**data, "captcha_proof": proof}, self.ip, self.browser, self.agent
        )
        second = AccountSecurity(self.repo, self.mailer)
        self.assertTrue(
            second.login_requires_captcha(data["email"], self.ip, self.browser)
        )
        for _ in range(3):
            self.security.logout("203.0.113.99", self.browser)
        self.assertTrue(
            second.login_requires_captcha(
                "other@example.test", "203.0.113.100", self.browser
            )
        )
        self.assertFalse(
            second.login_requires_captcha("clean@example.test", "203.0.113.101", "")
        )

    def test_persistent_limits_cover_ip_and_email(self):
        self.security.limit("test-ip", 2, 900)
        second = AccountSecurity(self.repo)
        second.limit("test-ip", 2, 900)
        with self.assertRaises(SecurityError) as caught:
            second.limit("test-ip", 2, 900)
        self.assertEqual(caught.exception.status, 429)
        with self.repo._db() as db:
            self.assertNotIn(
                "test-ip", str(db.execute("SELECT * FROM security_counters").fetchall())
            )

    def test_forgot_is_generic_does_not_change_password_or_reveal_account(self):
        known = self.forgot()
        unknown = self.forgot("missing@example.test")
        self.assertEqual(known, unknown)
        self.mailer.send.assert_not_called()
        self.repo.login_customer("member@example.test", "a-secure-test-password")
        row, payload = self.mail_payload("password_reset")
        token = payload["url"].split("reset-password=")[1]
        self.assertEqual(payload["ip"], self.ip)
        self.assertTrue(payload["url"].startswith("https://apextop.ru/account#"))
        with self.repo._db() as db:
            rows = db.execute("SELECT * FROM password_reset_tokens").fetchall()
            self.assertEqual(len(rows), 1)
            self.assertNotIn(token, str(rows))
        self.assertNotIn(token, row["payload_encrypted"])

    def test_reset_revokes_all_sessions_is_one_time_and_cannot_reuse_old_link(self):
        first = self.repo.create_customer_session(self.customer["id"])
        second = self.repo.create_customer_session(self.customer["id"])
        token = self.reset_token()
        data = {"token": token, "password": "my-updated-strong-password"}
        self.security.reset(data, self.ip)
        self.assertIsNone(self.repo.customer_for_session(first))
        self.assertIsNone(self.repo.customer_for_session(second))
        self.repo.login_customer("member@example.test", data["password"])
        with self.assertRaises(ValueError):
            self.repo.login_customer("member@example.test", "a-secure-test-password")
        with self.assertRaises(SecurityError):
            self.security.reset(data, self.ip)

    def test_expired_reset_and_weak_password_never_change_credentials(self):
        token = self.reset_token()
        with self.assertRaises(ValueError):
            self.security.reset({"token": token, "password": "short"}, self.ip)
        with self.repo._db() as db:
            self.assertIsNone(
                db.execute("SELECT used_at FROM password_reset_tokens").fetchone()[
                    "used_at"
                ]
            )
            db.execute(
                "UPDATE password_reset_tokens SET expires_at=now()-interval '1 second'"
            )
        with self.assertRaises(SecurityError):
            self.security.reset(
                {"token": token, "password": "valid-strong-password"}, self.ip
            )
        self.repo.login_customer("member@example.test", "a-secure-test-password")

    def test_parallel_reset_only_once_and_profile_password_change_revokes_links(self):
        token = self.reset_token()

        def reset():
            try:
                self.security.reset(
                    {"token": token, "password": "concurrent-strong-password"}, self.ip
                )
                return True
            except SecurityError:
                return False

        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            self.assertEqual(sum(pool.map(lambda _: reset(), range(4))), 1)
        with self.repo._db() as db:
            db.execute("DELETE FROM security_counters")
        token = self.reset_token()
        self.repo.update_customer(
            self.customer["id"],
            {
                "name": "Updated Member",
                "phone": "",
                "current_password": "concurrent-strong-password",
                "new_password": "profile-strong-password",
            },
        )
        with self.assertRaises(SecurityError):
            self.security.reset(
                {"token": token, "password": "unwanted-strong-password"}, self.ip
            )

    def test_email_outbox_retries_across_restart_without_plaintext_or_error_leaks(self):
        self.request_registration()
        self.mailer.send.side_effect = smtplib.SMTPAuthenticationError(
            535, b"private token must not be stored"
        )
        self.assertTrue(self.worker.process_one())
        with self.repo._db() as db:
            row = db.execute("SELECT * FROM email_outbox").fetchone()
            self.assertEqual(row["state"], "pending")
            self.assertEqual(row["last_error"], "SMTPAuthenticationError")
            self.assertTrue(row["payload_encrypted"])
            db.execute("UPDATE email_outbox SET due_at=now()-interval '1 second'")
        self.mailer.send.side_effect = None
        self.assertTrue(EmailWorker(self.security).process_one())
        with self.repo._db() as db:
            row = db.execute("SELECT * FROM email_outbox").fetchone()
            self.assertEqual(row["state"], "done")
            self.assertEqual(row["payload_encrypted"], "")
        self.assertEqual(self.mailer.send.call_count, 2)
        self.assertFalse(self.worker.process_one())

    def test_expired_or_superseded_email_never_sent_and_cleanup_erases_payload(self):
        self.request_registration()
        with self.repo._db() as db:
            db.execute(
                "UPDATE pending_registrations SET expires_at=now()-interval '1 second'"
            )
        self.assertTrue(self.worker.process_one())
        self.mailer.send.assert_not_called()
        with self.repo._db() as db:
            self.assertEqual(
                db.execute("SELECT payload_encrypted FROM email_outbox").fetchone()[
                    "payload_encrypted"
                ],
                "",
            )
        self.security.clean()
        with self.repo._db() as db:
            self.assertFalse(
                db.execute("SELECT 1 FROM pending_registrations").fetchone()
            )

    def test_parallel_workers_do_not_send_same_unexpired_lease(self):
        self.request_registration()
        import threading

        started, release = threading.Event(), threading.Event()
        self.mailer.send.side_effect = lambda *args: (started.set(), release.wait(5))
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            first = pool.submit(self.worker.process_one)
            self.assertTrue(started.wait(3))
            self.assertFalse(EmailWorker(self.security).process_one())
            release.set()
            self.assertTrue(first.result(5))
        self.assertEqual(self.mailer.send.call_count, 1)

    def test_missing_smtp_fails_closed_without_creating_unverified_account(self):
        self.mailer.configured = False
        with self.assertRaises(SecurityError) as caught:
            self.request_registration()
        self.assertEqual(caught.exception.status, 503)
        with self.repo._db() as db:
            self.assertFalse(
                db.execute("SELECT 1 FROM pending_registrations").fetchone()
            )

    def test_requests_without_captcha_cannot_exhaust_email_budget(self):
        data = {
            "name": "New Member",
            "email": "new@example.test",
            "password": "strong-password",
        }
        for _ in range(8):
            with self.assertRaises(SecurityError):
                self.security.register(data, self.ip, self.browser, self.agent)
        self.assertTrue(self.request_registration()["verification_required"])

    def test_old_email_worker_cannot_finish_a_reclaimed_lease(self):
        self.request_registration()
        replacement = str(uuid4())

        def reclaim(*_args):
            with self.repo._db() as db:
                db.execute("UPDATE email_outbox SET lease_id=%s", (replacement,))

        self.mailer.send.side_effect = reclaim
        self.assertTrue(self.worker.process_one())
        with self.repo._db() as db:
            row = db.execute(
                "SELECT state,payload_encrypted FROM email_outbox"
            ).fetchone()
            self.assertEqual(row["state"], "running")
            self.assertTrue(row["payload_encrypted"])
            db.execute("UPDATE email_outbox SET locked_at=now()-interval '4 minutes'")
        self.mailer.send.side_effect = None
        self.assertTrue(EmailWorker(self.security).process_one())
        with self.repo._db() as db:
            self.assertEqual(
                db.execute("SELECT state FROM email_outbox").fetchone()["state"], "done"
            )

    def test_http_register_verify_cookie_and_no_static_captcha_endpoint(self):
        agent = {"User-Agent": self.agent}
        response, challenge = self.http_request(
            "/api/security/captcha",
            "POST",
            {"purpose": "register", "context": "http@example.test"},
            agent,
        )
        guard = response.headers["Set-Cookie"].split(";")[0]
        self.assertIn("HttpOnly", response.headers["Set-Cookie"])
        headers = {**agent, "Cookie": guard}
        with self.repo._db() as db:
            db.execute(
                "UPDATE captcha_challenges SET created_at=now()-interval '2 seconds'"
            )
        response, proof = self.http_request(
            "/api/security/captcha/verify",
            "POST",
            {"id": challenge["id"], "answer": "ABCDE"},
            headers,
        )
        self.assertEqual(response.status, 200)
        response, result = self.http_request(
            "/api/account/register",
            "POST",
            {
                "email": "http@example.test",
                "name": "HTTP Member",
                "password": "valid-http-password",
                "captcha_proof": proof["proof"],
            },
            headers,
        )
        self.assertEqual(response.status, 202)
        self.assertNotIn("Set-Cookie", response.headers)
        code = self.mail_payload("registration")[1]["code"]
        response, result = self.http_request(
            "/api/account/register/verify",
            "POST",
            {"verification_id": result["verification_id"], "code": code},
        )
        self.assertEqual(response.status, 201)
        self.assertIn("apex_customer=", response.headers["Set-Cookie"])
        self.assertNotIn("password_hash", result)
        response, result = self.http_request(
            "/api/checkout/captcha", "POST", {"token": "demo-pass"}
        )
        self.assertEqual(response.status, 410)

    def test_http_checkout_captcha_is_mandatory_payload_bound_and_one_time(self):
        payload = {**self.payload, "points": 0, "idempotency_key": str(uuid4())}
        response, _ = self.http_request("/api/checkout/payment", "POST", payload)
        self.assertEqual(response.status, 403)
        self.assertEqual(self.bank.calls, 0)
        proof = self.proof(
            "checkout", payload, ip="127.0.0.1", agent="Python-urllib/3.12"
        )
        headers = {"Cookie": "apex_guard=" + self.browser}
        response, result = self.http_request(
            "/api/checkout/payment",
            "POST",
            {**payload, "captcha_proof": proof},
            headers,
        )
        self.assertEqual(response.status, 201, result)
        self.assertEqual(self.bank.calls, 1)
        response, _ = self.http_request(
            "/api/checkout/payment",
            "POST",
            {**payload, "captcha_proof": proof},
            headers,
        )
        self.assertEqual(response.status, 403)
        self.assertEqual(self.bank.calls, 1)
        proof = self.proof(
            "checkout", payload, ip="127.0.0.1", agent="Python-urllib/3.12"
        )
        response, result = self.http_request(
            "/api/checkout/payment",
            "POST",
            {**payload, "captcha_proof": proof},
            headers,
        )
        self.assertEqual(response.status, 201, result)
        self.assertEqual(self.bank.calls, 1)  # Retry keeps payment idempotency.

    def test_cross_site_and_untrusted_forwarded_addresses_cannot_bypass_checks(self):
        response, _ = self.http_request(
            "/api/security/captcha",
            "POST",
            {"purpose": "reset", "context": "member@example.test"},
            {"Sec-Fetch-Site": "cross-site"},
        )
        self.assertEqual(response.status, 403)
        self.web.trust_proxy_headers = True
        response, challenge = self.http_request(
            "/api/security/captcha",
            "POST",
            {"purpose": "reset", "context": "member@example.test"},
            {"X-Forwarded-For": "1.1.1.1, 8.8.8.8"},
        )
        browser = response.headers["Set-Cookie"].split(";")[0].split("=", 1)[1]
        with self.repo._db() as db:
            binding = db.execute(
                "SELECT binding FROM captcha_challenges WHERE id=%s", (challenge["id"],)
            ).fetchone()["binding"]
        self.assertEqual(
            binding, self.security.binding("8.8.8.8", browser, "Python-urllib/3.12")
        )


class MailerTests(unittest.TestCase):
    def config(self, **extra):
        return Settings(
            _env_file=None,
            POSTGRESQL_USER="test",
            POSTGRESQL_PASSWORD="test",
            POSTGRESQL_HOST="localhost",
            POSTGRESQL_DATABASE="test",
            ADMIN_PASSWORD="test-only-admin",
            SMTP_PASSWORD="test-app-password",
            **extra,
        )

    def test_yandex_starttls_precedes_auth_and_message_has_both_parts(self):
        mailer = SMTPMailer(self.config(SMTP_PORT="587"))
        with patch("store.infrastructure.mailer.smtplib.SMTP") as smtp:
            connection = smtp.return_value.__enter__.return_value
            mailer.send(
                "registration",
                {
                    "email": "member@example.test",
                    "name": "<img src=x>",
                    "code": "012345",
                },
                uuid4(),
            )
        calls = [call[0] for call in connection.method_calls]
        self.assertLess(calls.index("starttls"), calls.index("login"))
        context = connection.starttls.call_args.kwargs["context"]
        self.assertEqual(context.verify_mode, ssl.CERT_REQUIRED)
        self.assertTrue(context.check_hostname)
        message = connection.send_message.call_args.args[0]
        self.assertEqual(message["From"], "APEX <sewingnn.notification@2p2p.ru>")
        self.assertEqual(message.get_content_type(), "multipart/alternative")
        self.assertIn(
            "012345", message.get_body(preferencelist=("plain",)).get_content()
        )
        body = message.get_body(preferencelist=("html",)).get_content()
        self.assertIn("&lt;img src=x&gt;", body)
        self.assertNotIn("<img src=x>", body)

    def test_tls_465_and_unsafe_ports_rejected(self):
        with self.assertRaises(ValueError):
            self.config(SMTP_PORT=25)
        mailer = SMTPMailer(self.config(SMTP_PORT=465))
        with patch("store.infrastructure.mailer.smtplib.SMTP_SSL") as smtp:
            mailer.send(
                "registration",
                {"email": "member@example.test", "name": "Member", "code": "012345"},
                uuid4(),
            )
        smtp.return_value.__enter__.return_value.starttls.assert_not_called()
        smtp.return_value.__enter__.return_value.login.assert_called_once()

    def test_reset_email_warns_and_includes_actual_request_context(self):
        data = {
            "name": "Member",
            "url": "https://apextop.ru/account#reset-password=secret",
            "ip": "8.8.8.8",
            "agent": "Browser <test>",
            "requested_at": "2026-10-26T12:15:00+00:00",
        }
        subject, text, page = render_email(
            "password_reset", data, "https://apextop.ru", "Россия, Москва"
        )
        for value in [
            "8.8.8.8",
            "Россия, Москва",
            "15:15 МСК",
            "30 минут",
            "проигнорируй",
        ]:
            self.assertIn(value, text)
            self.assertIn(value, page)
        self.assertIn("Browser &lt;test&gt;", page)
        self.assertIn("reset-password=secret", page)
        self.assertIn("APEX", subject)

    def test_geolocation_is_cached_private_ips_not_sent_and_failure_is_explicit(self):
        geo = GeoLocation()
        with patch("store.infrastructure.mailer.urllib.request.urlopen") as request:
            request.return_value.__enter__.return_value.read.return_value = json.dumps(
                {
                    "success": True,
                    "country": "Россия",
                    "region": "Москва",
                    "city": "Москва",
                }
            ).encode()
            self.assertEqual(geo.lookup("8.8.8.8"), "Россия, Москва")
            self.assertEqual(geo.lookup("8.8.8.8"), "Россия, Москва")
            request.assert_called_once()
            self.assertIn("Локальная", geo.lookup("127.0.0.1"))
            request.assert_called_once()
        with patch(
            "store.infrastructure.mailer.urllib.request.urlopen",
            side_effect=TimeoutError,
        ):
            self.assertIn("Не удалось", geo.lookup("1.1.1.1"))
        with patch("store.infrastructure.mailer.urllib.request.urlopen") as request:
            self.assertIn("отключено", GeoLocation(False).lookup("8.8.4.4"))
            request.assert_not_called()


if __name__ == "__main__":
    unittest.main()
