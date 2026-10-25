import base64
import io
import json
import os
import ssl
import tempfile
import threading
import unittest
from contextlib import chdir
from http.server import ThreadingHTTPServer
from pathlib import Path
from unittest.mock import Mock, patch
from urllib.error import HTTPError
from urllib.request import Request, urlopen

import psycopg
from botocore.response import StreamingBody
from botocore.stub import Stubber
from PIL import Image

from store.config import Settings, get_settings
from store.infrastructure import media
from store.infrastructure.object_storage import S3MediaStorage
from store.manage import check_product_media, main as manage_main
from store.presentation.web import WebApp


def settings(**values):
    return Settings(
        _env_file=None,
        **{
            "POSTGRESQL_HOST": "database.example.test",
            "POSTGRESQL_DATABASE": "shop",
            "POSTGRESQL_USER": "shop",
            "POSTGRESQL_PASSWORD": "test-only-database-password",
            "ADMIN_PASSWORD": "test-only-administrator-password",
            "STORE_MASTER_KEY": "test-only-persistent-master-key-1234567890",
            "APP_ENV": "development",
            "WEBAPP_URL": "https://shop.example.test",
            **values,
        },
    )


class DeploymentSettingsTests(unittest.TestCase):
    def test_production_requires_persistent_key_password_and_https_origin(self):
        settings(APP_ENV="production", STORE_MEDIA_BACKEND="local")
        for values, message in [
            ({"STORE_MASTER_KEY": "unsafe-development-key"}, "STORE_MASTER_KEY"),
            ({"ADMIN_PASSWORD": "admin"}, "ADMIN_PASSWORD"),
            ({"WEBAPP_URL": "http://shop.example.test"}, "WEBAPP_URL"),
            ({"WEBAPP_URL": "https://shop.example.test/path"}, "WEBAPP_URL"),
        ]:
            with (
                self.subTest(values=list(values)),
                self.assertRaisesRegex(ValueError, message),
            ):
                settings(APP_ENV="production", STORE_MEDIA_BACKEND="local", **values)

    def test_production_defaults_to_apextop_and_requires_s3_configuration(self):
        values = settings().model_dump(exclude={"WEBAPP_URL", "STORE_MEDIA_BACKEND"})
        values["APP_ENV"] = "production"
        with self.assertRaisesRegex(ValueError, "S3_BUCKET"):
            Settings(_env_file=None, **values)
        values.update(
            S3_BUCKET="test-bucket",
            S3_ACCESS_KEY_ID="test-only",
            S3_SECRET_ACCESS_KEY="test-only",
        )
        config = Settings(_env_file=None, **values)
        self.assertEqual(config.WEBAPP_URL, "https://apextop.ru")
        self.assertEqual(config.STORE_MEDIA_BACKEND, "s3")
        self.assertEqual(settings().STORE_MEDIA_BACKEND, "local")

    def test_plain_dotenv_is_loaded_and_environment_overrides_it(self):
        with (
            tempfile.TemporaryDirectory() as directory,
            patch.dict(os.environ, {}, clear=True),
        ):
            Path(directory, ".env").write_text(
                "APP_ENV=production\n"
                "POSTGRESQL_HOST=database.example.test\n"
                "POSTGRESQL_DATABASE=shop\n"
                "POSTGRESQL_USER=shop\n"
                "POSTGRESQL_PASSWORD=test-only-database-password\n"
                "ADMIN_PASSWORD=test-only-administrator-password\n"
                "STORE_MASTER_KEY=test-only-persistent-master-key-1234567890\n"
                "S3_BUCKET=test-bucket\n"
                "S3_ACCESS_KEY_ID=test-only\n"
                "S3_SECRET_ACCESS_KEY=test-only\n",
                encoding="utf-8",
            )
            with chdir(directory):
                config = get_settings()
                self.assertEqual(config.APP_ENV, "production")
                self.assertEqual(config.STORE_MEDIA_BACKEND, "s3")
                self.assertEqual(config.WEBAPP_URL, "https://apextop.ru")
                with patch.dict(os.environ, {"WEBAPP_URL": "https://moto.apextop.ru"}):
                    self.assertEqual(get_settings().WEBAPP_URL, "https://moto.apextop.ru")

    def test_s3_requires_credentials_and_https_in_production(self):
        with self.assertRaisesRegex(ValueError, "S3_BUCKET"):
            settings(STORE_MEDIA_BACKEND="s3")
        with self.assertRaisesRegex(ValueError, "HTTPS"):
            settings(
                APP_ENV="production",
                STORE_MEDIA_BACKEND="s3",
                S3_BUCKET="shop",
                S3_ACCESS_KEY_ID="test",
                S3_SECRET_ACCESS_KEY="test",
                S3_ENDPOINT_URL="http://storage.example.test",
            )

    def test_ca_can_be_supplied_without_files_in_the_image(self):
        certificates = ssl.create_default_context().get_ca_certs(binary_form=True)
        self.assertTrue(certificates)
        pem = ssl.DER_cert_to_PEM_cert(certificates[0])
        config = settings(
            POSTGRESQL_SSLMODE="verify-full",
            POSTGRESQL_SSLROOTCERT_PEM=pem.replace("\n", "\\n"),
            TBANK_CA_CERT_PEM=pem,
        )
        path = Path(config.postgresql_connection()["sslrootcert"])
        self.assertEqual(path.read_text(), pem)
        self.assertEqual(Path(config.tbank_ca_certificate()).read_text(), pem)
        self.assertNotIn("BEGIN CERTIFICATE", repr(config))
        if os.name != "nt":
            self.assertEqual(path.stat().st_mode & 0o777, 0o600)

    def test_invalid_pem_is_rejected_instead_of_disabling_tls(self):
        config = settings(POSTGRESQL_SSLROOTCERT_PEM="invalid certificate")
        with self.assertRaisesRegex(ValueError, "PEM"):
            config.postgresql_connection()

    def test_configuration_errors_do_not_echo_runtime_secrets(self):
        with self.assertRaises(ValueError) as error:
            settings(
                APP_ENV="production",
                STORE_MEDIA_BACKEND="local",
                STORE_MASTER_KEY="unsafe-secret-from-environment",
            )
        self.assertNotIn("unsafe-secret-from-environment", str(error.exception))
        self.assertNotIn("test-only-database-password", str(error.exception))


class S3MediaTests(unittest.TestCase):
    def setUp(self):
        self.storage = S3MediaStorage(
            settings(
                STORE_MEDIA_BACKEND="s3",
                S3_BUCKET="test-bucket",
                S3_ACCESS_KEY_ID="test-only",
                S3_SECRET_ACCESS_KEY="test-only",
                S3_PREFIX="moto/media",
            )
        )

    def tearDown(self):
        self.storage.client.close()

    def test_missing_object_is_uploaded_with_immutable_metadata_and_existing_is_reused(
        self,
    ):
        parameters = {"Bucket": "test-bucket", "Key": "moto/media/photo.webp"}
        with Stubber(self.storage.client) as stub:
            stub.add_client_error(
                "head_object",
                service_error_code="404",
                http_status_code=404,
                expected_params=parameters,
            )
            stub.add_response(
                "put_object",
                {},
                {
                    **parameters,
                    "Body": b"webp",
                    "ContentType": "image/webp",
                    "CacheControl": "public, max-age=31536000, immutable",
                },
            )
            stub.add_response("head_object", {}, parameters)
            self.storage.put("photo.webp", b"webp")
            self.storage.put("photo.webp", b"webp")
            stub.assert_no_pending_responses()

    def test_private_object_is_read_and_stream_is_closed(self):
        stream = StreamingBody(io.BytesIO(b"webp"), 4)
        with Stubber(self.storage.client) as stub:
            stub.add_response(
                "get_object",
                {"Body": stream},
                {"Bucket": "test-bucket", "Key": "moto/media/photo.webp"},
            )
            self.assertEqual(self.storage.read("photo.webp"), b"webp")
        self.assertTrue(stream._raw_stream.closed)

    def test_missing_is_404_but_authentication_failure_is_a_storage_error(self):
        parameters = {"Bucket": "test-bucket", "Key": "moto/media/photo.webp"}
        with Stubber(self.storage.client) as stub:
            stub.add_client_error(
                "get_object",
                service_error_code="NoSuchKey",
                http_status_code=404,
                expected_params=parameters,
            )
            with self.assertRaises(FileNotFoundError):
                self.storage.read("photo.webp")
            stub.add_client_error(
                "head_object",
                service_error_code="AccessDenied",
                http_status_code=403,
                expected_params=parameters,
            )
            with self.assertRaises(media.MediaStorageError):
                self.storage.put("photo.webp", b"webp")
            stub.assert_no_pending_responses()

    def test_uploaded_photo_and_variants_never_depend_on_container_disk(self):
        buffer = io.BytesIO()
        Image.new("RGB", (1200, 1500), "red").save(buffer, "PNG")
        value = "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
        objects = {}
        backend = Mock()
        backend.put.side_effect = lambda name, content: objects.setdefault(
            name, content
        )
        backend.read.side_effect = lambda name: objects[name]
        with (
            tempfile.TemporaryDirectory() as temporary,
            patch.object(media, "MEDIA_ROOT", Path(temporary) / "unused"),
            patch.object(media, "_object_storage", backend),
        ):
            url = media.store_image(value)
            self.assertEqual(len(objects), 4)
            self.assertFalse(media.MEDIA_ROOT.exists())
            self.assertEqual(
                media.read_media(url.rsplit("/", 1)[1]), objects[url.rsplit("/", 1)[1]]
            )

    def test_existing_local_media_can_be_uploaded_without_changing_urls(self):
        with (
            tempfile.TemporaryDirectory() as directory,
            patch.object(media, "_object_storage", self.storage),
            patch.object(self.storage, "put") as upload,
        ):
            filename = "a" * 64 + "-240.webp"
            (Path(directory) / filename).write_bytes(b"webp")
            (Path(directory) / "unrelated.txt").write_text("ignored")
            self.assertEqual(media.upload_media_directory(directory), 1)
            upload.assert_called_once_with(filename, b"webp")


class DeploymentHTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo = Mock()
        cls.limiter = Mock()
        cls.limiter.allow.return_value = True
        cls.app = WebApp(
            None,
            None,
            None,
            cls.repo,
            cls.limiter,
            admin_password="test-only-administrator",
        )
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), cls.app.handler())
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def setUp(self):
        self.repo.reset_mock()
        self.repo.check_connection.side_effect = None
        self.limiter.reset_mock()
        self.app.trust_proxy_headers = False
        self.app.secure_cookies = False

    def request(self, path, data=None, headers=None):
        request = Request(
            f"http://127.0.0.1:{self.server.server_port}{path}",
            data=json.dumps(data).encode() if data is not None else None,
            headers=headers or {},
        )
        try:
            with urlopen(request) as response:
                return response.status, response.read(), response.headers
        except HTTPError as error:
            return error.code, error.read(), error.headers

    def test_readiness_checks_database_while_liveness_does_not(self):
        self.assertEqual(self.request("/health")[0], 200)
        self.repo.check_connection.assert_not_called()
        self.assertEqual(self.request("/ready")[0], 200)
        self.repo.check_connection.side_effect = psycopg.OperationalError("offline")
        self.assertEqual(self.request("/ready")[0], 503)

    def test_proxy_ip_is_opt_in_and_invalid_forwarded_headers_are_ignored(self):
        self.request("/api/admin/stats", headers={"X-Forwarded-For": "203.0.113.9"})
        self.assertEqual(self.limiter.allow.call_args.args[0], "127.0.0.1")
        self.app.trust_proxy_headers = True
        self.request(
            "/api/admin/stats", headers={"X-Forwarded-For": "203.0.113.9, 10.0.0.1"}
        )
        self.assertEqual(self.limiter.allow.call_args.args[0], "203.0.113.9")
        self.request("/api/admin/stats", headers={"X-Forwarded-For": "invalid"})
        self.assertEqual(self.limiter.allow.call_args.args[0], "127.0.0.1")

    def test_https_deployment_sets_secure_admin_and_customer_cookies(self):
        self.app.secure_cookies = True
        response = self.request(
            "/api/admin/login",
            {"username": "admin", "password": "test-only-administrator"},
        )
        self.assertEqual(response[0], 200)
        self.assertIn("; Secure", response[2]["Set-Cookie"])
        self.assertIn(
            "; Secure", self.request("/api/account/logout", {})[2]["Set-Cookie"]
        )

    def test_media_routes_serve_private_storage_and_preserve_thumbnail_urls(self):
        name = "a" * 64
        backend = Mock()
        backend.read.return_value = b"webp"
        with patch.object(media, "_object_storage", backend):
            response = self.request(f"/media/{name}.webp?w=240")
            self.assertEqual(response[0], 200)
            self.assertEqual(response[1], b"webp")
            backend.read.assert_called_once_with(name + "-240.webp")
            self.assertIn("immutable", response[2]["Cache-Control"])
            backend.read.side_effect = FileNotFoundError("missing")
            self.assertEqual(self.request(f"/media/{name}.webp")[0], 404)
            backend.read.side_effect = media.MediaStorageError(
                "temporarily unavailable"
            )
            self.assertEqual(self.request(f"/media/{name}.webp")[0], 503)

    def test_admin_upload_requires_login_and_s3_failure_never_reports_success(self):
        buffer = io.BytesIO()
        Image.new("RGB", (64, 64), "blue").save(buffer, "PNG")
        data = {
            "image": "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
        }
        self.assertEqual(self.request("/api/admin/media", data)[0], 401)
        login = self.request(
            "/api/admin/login",
            {"username": "admin", "password": "test-only-administrator"},
        )
        headers = {"Cookie": login[2]["Set-Cookie"].split(";", 1)[0]}
        backend = Mock()
        backend.put.side_effect = media.MediaStorageError(
            "Хранилище фотографий временно недоступно"
        )
        with (
            tempfile.TemporaryDirectory() as directory,
            patch.object(media, "_object_storage", backend),
            patch.object(media, "MEDIA_ROOT", Path(directory) / "unused"),
        ):
            response = self.request("/api/admin/media", data, headers)
            self.assertEqual(response[0], 503)
            self.assertNotIn("url", json.loads(response[1]))
            self.assertFalse(media.MEDIA_ROOT.exists())


class MediaAuditTests(unittest.TestCase):
    def test_audit_checks_variations_and_thumbnails_without_writing(self):
        main = "/media/" + "a" * 64 + ".webp"
        variant = "/media/" + "b" * 64 + ".webp"
        missing = "b" * 64 + "-960.webp"
        backend = Mock()
        backend.exists.side_effect = lambda name: name != missing
        with patch.object(media, "_object_storage", backend):
            report = check_product_media(
                [
                    {
                        "image_url": main, "images": [main],
                        "variants": [{"images": [main, variant]}],
                    },
                    {
                        "image_url": "",
                        "images": [
                            "/images/demo.webp", "https://example.test/photo.jpg",
                            "data:image/png;base64,AAAA", "/media/invalid.webp",
                        ],
                        "variants": [],
                    },
                ]
            )
        self.assertEqual(
            report,
            {
                "products": 2, "s3_photos": 2, "s3_objects": 8,
                "bundled": 1, "external": 1, "inline": 1, "invalid": 1,
                "missing": [missing],
            },
        )
        self.assertEqual(backend.exists.call_count, 8)
        backend.put.assert_not_called()
        backend.read.assert_not_called()

    def test_audit_cli_does_not_initialize_repository_or_migrate_database(self):
        config = settings(
            STORE_MEDIA_BACKEND="s3",
            S3_BUCKET="test-bucket",
            S3_ACCESS_KEY_ID="test-only",
            S3_SECRET_ACCESS_KEY="test-only",
        )
        with (
            patch("sys.argv", ["store.manage", "check-media"]),
            patch("store.manage.get_settings", return_value=config),
            patch("store.manage.configure_runtime_trust"),
            patch("store.manage.configure_media"),
            patch("store.manage.psycopg.connect") as connect,
            patch("store.manage.PostgreSQLRepository") as repository,
            patch("sys.stdout", new_callable=io.StringIO),
        ):
            db = connect.return_value.__enter__.return_value
            db.execute.return_value.fetchall.return_value = []
            manage_main()
            self.assertEqual(
                db.execute.call_args_list[0].args[0], "SET TRANSACTION READ ONLY"
            )
            repository.assert_not_called()
