import tempfile
import threading
import unittest
from decimal import Decimal
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.request import Request, urlopen

from store.application.services import (
    CatalogService,
    CheckoutService,
    IntegrationService,
)
from store.config import Settings
from store.domain import Integration, Product
from store.infrastructure.security import RateLimiter, SecretBox
from store.presentation.web import WebApp


class MemoryRepository:
    def __init__(self):
        self.products = {1: Product(1, "Demo", "", Decimal(10), "A", (), "", 1)}
        self.integrations = {}

    def list_products(self):
        return list(self.products.values())

    def get_product(self, product_id):
        return self.products.get(product_id)

    def save_product(self, product):
        product.id = product.id or max(self.products, default=0) + 1
        self.products[product.id] = product
        return product

    def delete_product(self, product_id):
        return self.products.pop(product_id, None) is not None

    def increment(self, product_id, metric):
        setattr(
            self.products[product_id],
            metric,
            getattr(self.products[product_id], metric) + 1,
        )

    def list_integrations(self):
        return [
            Integration(
                x.provider,
                x.kind,
                x.enabled,
                x.public_config,
                {key: "••••••••" for key in x.secret_config},
            )
            for x in self.integrations.values()
        ]

    def save_integration(self, integration):
        self.integrations[integration.provider] = integration


class Captcha:
    def verify(self, token, ip):
        return token == "ok"
    

class AllowAllLimiter:
    def allow(self, *_args):
        return True


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.repo = MemoryRepository()

    def test_catalog_metrics_and_product_creation(self):
        service = CatalogService(self.repo)
        p = service.save(
            {
                "name": "Test",
                "price": "12.50",
                "category": "A",
                "stock": 2,
                "sizes": ["M"],
            }
        )
        service.record(p.id, "views")
        saved = self.repo.get_product(p.id)
        self.assertEqual(saved.price, Decimal("12.50"))
        self.assertEqual(saved.views, 1)

    def test_integration_secrets_are_masked(self):
        service = IntegrationService(self.repo)
        service.configure(
            {
                "provider": "cdek",
                "enabled": True,
                "client_id": "id",
                "client_secret": "secret",
            }
        )
        self.assertEqual(service.list()[0].secret_config["client_secret"], "••••••••")

    def test_captcha(self):
        service = CheckoutService(Captcha())
        self.assertEqual(service.confirm_captcha("ok", "127.0.0.1"), "captcha-approved")
        with self.assertRaises(ValueError):
            service.confirm_captcha("bad", "127.0.0.1")

    def test_secret_box_detects_tampering(self):
        box = SecretBox("key")
        encrypted = box.encrypt("secret")
        self.assertEqual(box.decrypt(encrypted), "secret")
        with self.assertRaises(ValueError):
            box.decrypt(encrypted[:-2] + "ab")

    def test_rate_limit(self):
        limiter = RateLimiter(2, 60)
        self.assertTrue(limiter.allow("ip", 0))
        self.assertTrue(limiter.allow("ip", 1))
        self.assertFalse(limiter.allow("ip", 2))
        
    def test_initial_migration_seed_categories_are_idempotent_by_slug(self):
        migration = Path("migrations/001_init.sql").read_text(encoding="utf-8")
        self.assertIn("ON CONFLICT (slug) DO UPDATE", migration)
        self.assertNotIn("ON CONFLICT (name) DO NOTHING", migration)

    def test_database_settings_are_loaded_from_environment(self):
        with tempfile.NamedTemporaryFile() as certificate:
            settings = Settings(
                _env_file=None,
                POSTGRESQL_HOST="db.example",
                POSTGRESQL_DATABASE="default_db",
                POSTGRESQL_USER="gen_user",
                POSTGRESQL_PASSWORD="secret",
                POSTGRESQL_SSLMODE="verify-full",
                POSTGRESQL_SSLROOTCERT=certificate.name,
            )
        self.assertEqual(settings.postgresql_connection()["dbname"], "default_db")
        self.assertNotIn("secret", repr(settings))

    def test_verify_full_requires_certificate(self):
        with self.assertRaisesRegex(ValueError, "POSTGRESQL_SSLROOTCERT"):
            Settings(
                _env_file=None,
                POSTGRESQL_HOST="db",
                POSTGRESQL_DATABASE="db",
                POSTGRESQL_USER="user",
                POSTGRESQL_PASSWORD="secret",
                POSTGRESQL_SSLMODE="verify-full",
            )
    
    def test_admin_session_is_signed_and_expires(self):
        app = WebApp(None, None, None, None, None, admin_password="secret")
        self.assertTrue(app.valid_session(app._session_token(4_000_000_000)))
        self.assertFalse(app.valid_session(app._session_token(1)))
        self.assertFalse(app.valid_session("invalid"))

    def test_admin_routes_serve_login_for_both_url_variants(self):
        app = WebApp(None, None, None, None, AllowAllLimiter())
        server = ThreadingHTTPServer(("127.0.0.1", 0), app.handler())
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            for path in ("/admin", "/admin/"):
                with urlopen(
                    f"http://127.0.0.1:{server.server_port}{path}"
                ) as response:
                    self.assertEqual(response.status, 200)
                    self.assertIn(b"loginForm", response.read())
            with urlopen(
                Request(
                    f"http://127.0.0.1:{server.server_port}/favicon.ico",
                    method="GET",
                )
            ) as response:
                self.assertEqual(response.status, 204)
        finally:
            server.shutdown()
            server.server_close()
            thread.join()


if __name__ == "__main__":
    unittest.main()
