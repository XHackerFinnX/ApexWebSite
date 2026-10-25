import os
import ssl
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from store.infrastructure.trust import configure_runtime_trust


class RuntimeTrustTests(unittest.TestCase):
    def setUp(self):
        environment = patch.dict(os.environ)
        environment.start()
        self.addCleanup(environment.stop)
        # Preserve the executor's configured system CA bundle.
        for name in ("REQUESTS_CA_BUNDLE", "AWS_CA_BUNDLE"):
            os.environ.pop(name, None)

    def test_no_mounted_certificates_keeps_default_trust_and_environment(self):
        with tempfile.TemporaryDirectory() as directory:
            original = dict(os.environ)
            self.assertIsNone(configure_runtime_trust(Path(directory)))
            self.assertEqual(dict(os.environ), original)

    def test_pem_and_der_certificates_are_combined_with_standard_roots(self):
        with tempfile.TemporaryDirectory() as directory:
            standard_roots = set(
                ssl.create_default_context().get_ca_certs(binary_form=True)
            )
            self.assertTrue(standard_roots)
            original_ssl_bundle = os.environ.get("SSL_CERT_FILE")
            certificate = next(iter(standard_roots))
            mounted = Path(directory, "russian-trusted")
            mounted.mkdir()
            (mounted / "root.crt").write_text(ssl.DER_cert_to_PEM_cert(certificate))
            (mounted / "sub.crt").write_bytes(certificate)
            path = Path(configure_runtime_trust(Path(directory)))
            try:
                combined = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
                combined.load_verify_locations(cafile=str(path))
                self.assertTrue(
                    standard_roots.issubset(combined.get_ca_certs(binary_form=True))
                )
                self.assertEqual(
                    os.environ["SSL_CERT_FILE"], original_ssl_bundle or str(path)
                )
                self.assertEqual(os.environ["REQUESTS_CA_BUNDLE"], str(path))
                self.assertEqual(os.environ["AWS_CA_BUNDLE"], str(path))
                if os.name != "nt":
                    self.assertEqual(path.stat().st_mode & 0o777, 0o600)
            finally:
                path.unlink()

    def test_explicit_client_bundles_are_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            certificate = ssl.create_default_context().get_ca_certs(binary_form=True)[0]
            (Path(directory) / "root.crt").write_bytes(certificate)
            os.environ["REQUESTS_CA_BUNDLE"] = "/configured/requests.pem"
            os.environ["AWS_CA_BUNDLE"] = "/configured/s3.pem"
            path = Path(configure_runtime_trust(Path(directory)))
            try:
                self.assertEqual(
                    os.environ["REQUESTS_CA_BUNDLE"], "/configured/requests.pem"
                )
                self.assertEqual(os.environ["AWS_CA_BUNDLE"], "/configured/s3.pem")
            finally:
                path.unlink()

    def test_invalid_mounted_certificate_is_reported_before_connecting(self):
        with tempfile.TemporaryDirectory() as directory:
            (Path(directory) / "invalid.crt").write_text("not a CA certificate")
            with self.assertRaisesRegex(ValueError, "CA-сертификат invalid.crt"):
                configure_runtime_trust(Path(directory))
            self.assertNotIn("AWS_CA_BUNDLE", os.environ)
