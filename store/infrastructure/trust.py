"""Trust hosting-provided CAs at runtime without changing the system store."""

import os
import ssl
import tempfile
from pathlib import Path


def configure_runtime_trust(
    directory: Path = Path("/usr/local/share/ca-certificates"),
) -> str | None:
    # Timeweb mounts Russian Trusted / TCI certificates when the container starts.
    # They may be absent during docker build and when running on another host.
    certificates = sorted(directory.rglob("*.crt")) if directory.is_dir() else []
    if not certificates:
        return None

    context = ssl.create_default_context()
    for certificate in certificates:
        try:
            data = certificate.read_bytes()
            context.load_verify_locations(
                cadata=data.decode("ascii")
                if data.lstrip().startswith(b"-----BEGIN CERTIFICATE-----")
                else data
            )
        except (OSError, UnicodeError, ValueError) as exc:
            raise ValueError(
                f"Не удалось подключить CA-сертификат {certificate.name}"
            ) from exc

    # Keep standard public roots too: S3, CDEK and the bank can use different CAs.
    with tempfile.NamedTemporaryFile(
        mode="w", encoding="ascii", prefix="apex-trust-", suffix=".pem", delete=False
    ) as bundle:
        for certificate in context.get_ca_certs(binary_form=True):
            bundle.write(ssl.DER_cert_to_PEM_cert(certificate))
        path = bundle.name

    # Respect a CA bundle explicitly configured by the deployment's owner.
    for variable in ("SSL_CERT_FILE", "REQUESTS_CA_BUNDLE", "AWS_CA_BUNDLE"):
        os.environ.setdefault(variable, path)
    return path
