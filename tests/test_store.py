import json
import tempfile
import threading
import unittest
from io import BytesIO
from http.client import HTTPConnection
from decimal import Decimal
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from unittest.mock import patch

from store.application.services import (
    CatalogService,
    CheckoutService,
    IntegrationService,
)
from store.config import Settings
from store.domain import Integration, Product
from store.infrastructure.security import RateLimiter, SecretBox
from store.infrastructure.postgres_repo import PostgreSQLRepository
from store.infrastructure.cdek import CDEKDelivery, CDEKError
from store.presentation.web import WebApp


class MemoryRepository:
    def __init__(self):
        self.products = {1: Product(1, "Demo", "", Decimal(10), "A", (), "", 1)}
        self.integrations = {}
        self.categories = [{"id": 1, "name": "A", "slug": "a", "product_count": 1}]

    def list_products(self, include_inactive=False):
        products = list(self.products.values())
        return products if include_inactive else [p for p in products if p.is_active]

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

    def list_categories(self):
        return self.categories

    def save_category(self, name):
        category = {"id": 2, "name": name, "slug": name.lower(), "product_count": 0}
        self.categories.append(category)
        return category

    def delete_category(self, category_id):
        before = len(self.categories)
        self.categories = [item for item in self.categories if item["id"] != category_id]
        return len(self.categories) != before
    
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
        old = self.integrations.get(integration.provider)
        if old and not integration.secret_config:
            integration.secret_config = old.secret_config
        self.integrations[integration.provider] = integration
        
    def delete_integration(self, provider):
        return self.integrations.pop(provider, None) is not None
    
    def get_integration_config(self, provider, enabled_only=True):
        integration = self.integrations.get(provider)
        if not integration or (enabled_only and not integration.enabled):
            return None
        return integration.public_config | integration.secret_config


class CDEKDeliveryTests(unittest.TestCase):
    def setUp(self):
        self.delivery = CDEKDelivery(MemoryRepository())

    @patch("store.infrastructure.cdek.urlopen")
    def test_request_exposes_cdek_validation_message(self, mocked_urlopen):
        mocked_urlopen.side_effect = HTTPError(
            "https://api.cdek.ru/v2/calculator/tariff",
            400,
            "Bad Request",
            {},
            BytesIO(
                json.dumps(
                    {"errors": [{"code": "v2_invalid", "message": "Не найден город получателя"}]}
                ).encode()
            ),
        )

        with self.assertRaisesRegex(CDEKError, "400.*Не найден город получателя"):
            self.delivery._request_json(self.delivery.CALC_URL)

    @patch("store.infrastructure.cdek.urlopen")
    def test_request_handles_non_json_cdek_error(self, mocked_urlopen):
        mocked_urlopen.side_effect = HTTPError(
            self.delivery.CALC_URL,
            502,
            "Bad Gateway",
            {},
            BytesIO(b"bad gateway"),
        )

        with self.assertRaisesRegex(CDEKError, "отклонил запрос без пояснения"):
            self.delivery._request_json(self.delivery.CALC_URL)
            
    @patch("store.infrastructure.cdek.urlopen")
    def test_configuration_uses_test_environment_and_calculator(self, mocked_urlopen):
        token_response = unittest.mock.MagicMock()
        token_response.__enter__.return_value.read.return_value = json.dumps(
            {"access_token": "token", "expires_in": 3600}
        ).encode()
        calculation_response = unittest.mock.MagicMock()
        calculation_response.__enter__.return_value.read.return_value = json.dumps(
            {"total_sum": 420}
        ).encode()
        mocked_urlopen.side_effect = [token_response, calculation_response]

        result = self.delivery.test_configuration({
            "environment": "test", "client_id": "id", "client_secret": "secret",
            "dispatch_days": "1", "contract_type": "1", "tariff_code": "136",
            "sender_city": "44", "weight": "1000", "length": "300",
            "width": "200", "height": "80",
        })

        self.assertEqual(result, {"authorization": True, "calculation": True})
        urls = [call.args[0].full_url for call in mocked_urlopen.call_args_list]
        self.assertEqual(urls, [
            "https://api.edu.cdek.ru/v2/oauth/token",
            "https://api.edu.cdek.ru/v2/calculator/tariff",
        ])


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
                "color": "Чёрный",
                "images": ["data:image/png;base64,first", "data:image/png;base64,second"],
                "variants": [
                    {
                        "sku": "TEE-BLK-M",
                        "price": "12.50",
                        "old_price": "15.00",
                        "stock": 2,
                        "color": "Чёрный",
                        "size": "M",
                        "dimensions": "300x200x40",
                        "weight": 250,
                        "images": [
                            "data:image/png;base64,first",
                            "data:image/png;base64,second",
                        ],
                    }
                ],
            }
        )
        service.record(p.id, "views")
        saved = self.repo.get_product(p.id)
        self.assertEqual(saved.price, Decimal("12.50"))
        self.assertEqual(saved.views, 1)
        self.assertEqual(saved.color, "Чёрный")
        self.assertEqual(len(saved.images), 2)
        self.assertEqual(saved.image_url, saved.images[0])
        self.assertEqual(saved.variants[0]["sku"], "TEE-BLK-M")
        self.assertEqual(saved.sizes, ("M",))

    def test_product_variant_requires_sku(self):
        service = CatalogService(self.repo)
        with self.assertRaisesRegex(ValueError, "Артикул"):
            service.save(
                {
                    "name": "Test",
                    "category": "A",
                    "variants": [{"price": 10, "stock": 1, "color": "Белый"}],
                }
            )

    def test_new_product_is_draft_until_explicitly_published(self):
        service = CatalogService(self.repo)
        draft = service.save(
            {
                "name": "Draft",
                "category": "A",
                "variants": [{"sku": "DRAFT-S", "price": 10, "stock": 1}],
            }
        )
        published = service.save(
            {
                "name": "Published",
                "category": "A",
                "is_active": True,
                "variants": [{"sku": "LIVE-S", "price": 10, "stock": 1}],
            }
        )

        self.assertFalse(draft.is_active)
        self.assertEqual([product.id for product in service.list()], [published.id])
        self.assertIn(draft, self.repo.list_products(include_inactive=True))
    
    def test_postgres_repository_uses_cursor_for_executemany(self):
        source = Path("store/infrastructure/postgres_repo.py").read_text(
            encoding="utf-8"
        )
        self.assertIn("with db.cursor() as cursor:", source)
        self.assertIn("cursor.executemany(", source)
        self.assertNotIn("db.executemany(", source)
        
    def test_postgres_product_query_preserves_empty_array_literal(self):
        class EmptyResult:
            def fetchall(self):
                return []

        class RecordingDatabase:
            def __init__(self):
                self.queries = []

            def __enter__(self):
                return self

            def __exit__(self, *_args):
                return None

            def execute(self, query):
                self.queries.append(query)
                return EmptyResult()

        database = RecordingDatabase()
        repository = PostgreSQLRepository.__new__(PostgreSQLRepository)
        repository._db = lambda: database

        self.assertEqual(repository.list_products(), [])
        self.assertIn("'{}'", database.queries[-1])
        self.assertIn("WHERE p.is_active = true", database.queries[-1])

        self.assertEqual(repository.list_products(include_inactive=True), [])
        self.assertIn("'{}'", database.queries[-1])
        self.assertNotIn("WHERE p.is_active = true", database.queries[-1])

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
        
    def test_integration_cannot_be_added_twice_and_can_be_deleted(self):
        service = IntegrationService(self.repo)
        payload = {"provider": "tbank", "name": "Оплата картой", "enabled": True,
                   "terminal_key": "terminal", "password": "secret"}
        service.configure(payload)
        with self.assertRaisesRegex(ValueError, "уже добавлен"):
            service.configure(payload)
        self.assertTrue(service.delete("tbank"))
        self.assertEqual(service.list(), [])

    def test_cdek_requires_calculation_settings(self):
        service = IntegrationService(self.repo)
        with self.assertRaisesRegex(ValueError, "параметры СДЭК"):
            service.configure({"provider": "cdek", "name": "СДЭК", "enabled": True,
                               "client_id": "id", "client_secret": "secret"})

    def test_integration_can_be_edited_without_replacing_secret(self):
        service = IntegrationService(self.repo)
        service.configure({
            "provider": "tbank", "name": "Оплата", "enabled": True,
            "terminal_key": "terminal", "password": "secret",
        })
        service.configure({
            "provider": "tbank", "name": "Новая оплата", "enabled": True,
        }, update=True)
        saved = self.repo.integrations["tbank"]
        self.assertEqual(saved.public_config["name"], "Новая оплата")
        self.assertEqual(saved.secret_config, {"terminal_key": "terminal", "password": "secret"})

    def test_failed_cdek_check_does_not_save_configuration(self):
        class FailingCDEK:
            def test_configuration(self, _config):
                raise CDEKError("Тестовый расчёт не выполнен")

        service = IntegrationService(self.repo, FailingCDEK())
        with self.assertRaisesRegex(CDEKError, "Тестовый расчёт"):
            service.configure({
                "provider": "cdek", "name": "СДЭК", "enabled": True,
                "client_id": "id", "client_secret": "secret",
                "contract_type": "1", "tariff_code": "136", "sender_city": "44",
                "sender_office": "MSK1", "dimension_type": "shipment",
                "weight": "1000", "length": "300", "width": "200", "height": "80",
                "cost_type": "calculator", "dispatch_days": "1",
            })
        self.assertNotIn("cdek", self.repo.integrations)
    
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
            
    def test_oversized_product_request_returns_readable_413(self):
        app = WebApp(
            CatalogService(self.repo), None, None, self.repo, AllowAllLimiter()
        )
        server = ThreadingHTTPServer(("127.0.0.1", 0), app.handler())
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        connection = HTTPConnection("127.0.0.1", server.server_port)
        try:
            connection.putrequest("POST", "/api/admin/products")
            connection.putheader("Content-Type", "application/json")
            connection.putheader("Content-Length", "25000001")
            connection.putheader(
                "Cookie", f"apex_admin={app._session_token(4_000_000_000)}"
            )
            connection.endheaders()
            response = connection.getresponse()
            self.assertEqual(response.status, 413)
            self.assertIn("Фотографии слишком большие".encode(), response.read())
        finally:
            connection.close()
            server.shutdown()
            server.server_close()
            thread.join()
            
    def test_admin_product_failure_returns_json_error_instead_of_dropping_connection(self):
        class BrokenRepository(MemoryRepository):
            def list_products(self, include_inactive=False):
                raise RuntimeError("database unavailable")

        repo = BrokenRepository()
        app = WebApp(CatalogService(repo), None, None, repo, AllowAllLimiter())
        server = ThreadingHTTPServer(("127.0.0.1", 0), app.handler())
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        connection = HTTPConnection("127.0.0.1", server.server_port)
        try:
            connection.request(
                "GET",
                "/api/admin/products",
                headers={
                    "Cookie": f"apex_admin={app._session_token(4_000_000_000)}"
                },
            )
            response = connection.getresponse()
            payload = json.loads(response.read())
            self.assertEqual(response.status, 500)
            self.assertIn("Попробуйте повторить", payload["error"])
            self.assertNotIn("database unavailable", payload["error"])
        finally:
            connection.close()
            server.shutdown()
            server.server_close()
            thread.join()
    
    def test_variant_data_supports_color_specific_catalog_view(self):
        product = CatalogService(self.repo).save(
            {
                "name": "Color product",
                "category": "A",
                "variants": [
                    {"sku": "WHITE-S", "price": 100, "stock": 2, "color": "Белый", "size": "S", "images": ["white.jpg"]},
                    {"sku": "BLACK-M", "price": 150, "stock": 3, "color": "Чёрный", "size": "M", "images": ["black.jpg"]},
                ],
            }
        )
        self.assertEqual(product.color, "Белый, Чёрный")
        self.assertEqual(product.variants[1]["price"], "150")
        self.assertEqual(product.variants[1]["images"], ["black.jpg"])
        
    def test_color_images_are_reused_without_repeating_them_in_request(self):
        product = CatalogService(self.repo).save(
            {
                "name": "Color sizes",
                "category": "A",
                "variants": [
                    {
                        "sku": "WHITE-S",
                        "price": 100,
                        "stock": 1,
                        "color": "Белый",
                        "size": "S",
                        "images": ["white.jpg"],
                    },
                    {
                        "sku": "WHITE-M",
                        "price": 100,
                        "stock": 1,
                        "color": "Белый",
                        "size": "M",
                        "images": [],
                    },
                ],
            }
        )
        self.assertEqual(product.variants[1]["images"], ["white.jpg"])


if __name__ == "__main__":
    unittest.main()
