import ssl
import tempfile
from functools import lru_cache
from pathlib import Path
from typing import Literal
from urllib.parse import urlparse

from pydantic import SecretStr, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


@lru_cache(maxsize=8)
def _certificate_file(pem: str) -> str:
    """Materialize public CA data supplied through a hosting environment variable."""
    pem = pem.replace("\\n", "\n").strip() + "\n"
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    try:
        context.load_verify_locations(cadata=pem)
    except ssl.SSLError as exc:
        raise ValueError(
            "Некорректный CA-сертификат в переменной окружения: нужен PEM"
        ) from exc
    with tempfile.NamedTemporaryFile(
        mode="w", prefix="apex-ca-", suffix=".pem", delete=False
    ) as certificate:
        certificate.write(pem)
        return certificate.name


class Settings(BaseSettings):
    """Application configuration loaded by pydantic-settings from env/.env."""

    POSTGRESQL_USER: SecretStr
    POSTGRESQL_PASSWORD: SecretStr
    POSTGRESQL_HOST: SecretStr
    POSTGRESQL_PORT: SecretStr = SecretStr("5432")
    POSTGRESQL_DATABASE: SecretStr
    POSTGRESQL_SSLMODE: str = "disable"
    POSTGRESQL_SSLROOTCERT: str | None = None
    POSTGRESQL_SSLROOTCERT_PEM: SecretStr = SecretStr("")

    # Локальный запуск. В production значения переопределяются через .env/env.
    APP_HOST: str = "localhost"
    APP_PORT: int = 8000
    APP_ENV: Literal["development", "production"] = "development"
    TRUST_PROXY_HEADERS: bool = False
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: SecretStr

    STORE_MASTER_KEY: SecretStr = SecretStr("unsafe-development-key")
    YANDEX_CAPTCHA_SERVER_KEY: SecretStr = SecretStr("")
    YANDEX_CAPTCHA_CLIENT_KEY: str = ""
    CAPTCHA_MODE: str = "mock"
    WEBAPP_URL: str = "http://127.0.0.1:8000"

    CDEK_CLIENT_ID: SecretStr = SecretStr("")
    CDEK_CLIENT_SECRET: SecretStr = SecretStr("")
    CDEK_FROM_POSTAL_CODE: str = "143911"
    CDEK_TARIFF_CODE: int = 136
    CDEK_DISPATCH_DELAY_DAYS: int = 10
    CDEK_FINAL_MARKUP: int = 150
    TBANK_CA_CERT: str | None = None
    TBANK_CA_CERT_PEM: SecretStr = SecretStr("")
    STORE_MEDIA_BACKEND: Literal["local", "s3"] = "local"
    STORE_MEDIA_ROOT: str = str(Path(__file__).parents[1] / "var" / "media")
    S3_ENDPOINT_URL: str = "https://s3.twcstorage.ru"
    S3_REGION: str = "ru-1"
    S3_BUCKET: str = ""
    S3_PREFIX: str = "apex/media"
    S3_ACCESS_KEY_ID: SecretStr = SecretStr("")
    S3_SECRET_ACCESS_KEY: SecretStr = SecretStr("")

    model_config: SettingsConfigDict = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
        hide_input_in_errors=True,
    )

    @model_validator(mode="before")
    @classmethod
    def production_defaults(cls, values):
        if isinstance(values, dict) and values.get("APP_ENV") == "production":
            values = dict(values)
            values.setdefault("WEBAPP_URL", "https://apextop.ru")
            values.setdefault("STORE_MEDIA_BACKEND", "s3")
        return values

    @field_validator("APP_PORT")
    @classmethod
    def validate_app_port(cls, value: int) -> int:
        if not 1 <= value <= 65535:
            raise ValueError("APP_PORT должен быть от 1 до 65535")
        return value

    @model_validator(mode="after")
    def validate_postgresql(self) -> "Settings":
        try:
            port = int(self.POSTGRESQL_PORT.get_secret_value())
        except ValueError as exc:
            raise ValueError("POSTGRESQL_PORT должен быть числом") from exc
        if not 1 <= port <= 65535:
            raise ValueError("POSTGRESQL_PORT должен быть от 1 до 65535")
        if self.POSTGRESQL_SSLMODE in {"verify-ca", "verify-full"}:
            if (
                not self.POSTGRESQL_SSLROOTCERT
                and not self.POSTGRESQL_SSLROOTCERT_PEM.get_secret_value()
            ):
                raise ValueError("Для проверки TLS задайте POSTGRESQL_SSLROOTCERT")
        if (
            self.POSTGRESQL_SSLROOTCERT
            and self.POSTGRESQL_SSLROOTCERT_PEM.get_secret_value()
        ):
            raise ValueError(
                "Задайте только один из POSTGRESQL_SSLROOTCERT и POSTGRESQL_SSLROOTCERT_PEM"
            )
        if self.POSTGRESQL_SSLROOTCERT:
            certificate = Path(self.POSTGRESQL_SSLROOTCERT).expanduser()
            if not certificate.is_file():
                raise ValueError("Файл POSTGRESQL_SSLROOTCERT не найден")
        if self.TBANK_CA_CERT and self.TBANK_CA_CERT_PEM.get_secret_value():
            raise ValueError("Задайте только один из TBANK_CA_CERT и TBANK_CA_CERT_PEM")
        if self.TBANK_CA_CERT:
            certificate = Path(self.TBANK_CA_CERT).expanduser()
            if not certificate.is_file():
                raise ValueError("Файл TBANK_CA_CERT не найден")
        if self.STORE_MEDIA_BACKEND == "s3":
            if (
                not self.S3_BUCKET
                or not self.S3_ACCESS_KEY_ID.get_secret_value()
                or not self.S3_SECRET_ACCESS_KEY.get_secret_value()
            ):
                raise ValueError(
                    "Для S3 заполните S3_BUCKET, S3_ACCESS_KEY_ID и S3_SECRET_ACCESS_KEY"
                )
            endpoint = urlparse(self.S3_ENDPOINT_URL)
            if (
                endpoint.scheme not in {"http", "https"}
                or not endpoint.hostname
                or endpoint.username
                or endpoint.password
            ):
                raise ValueError(
                    "S3_ENDPOINT_URL должен быть HTTP(S)-адресом без реквизитов"
                )
            if self.APP_ENV == "production" and endpoint.scheme != "https":
                raise ValueError("В production для S3 нужен HTTPS")
            if (
                any(part == ".." for part in self.S3_PREFIX.split("/"))
                or "\\" in self.S3_PREFIX
            ):
                raise ValueError("Некорректный S3_PREFIX")
        if self.APP_ENV == "production":
            if len(
                self.STORE_MASTER_KEY.get_secret_value()
            ) < 32 or self.STORE_MASTER_KEY.get_secret_value().startswith(
                ("unsafe-", "replace-")
            ):
                raise ValueError(
                    "В production задайте постоянный STORE_MASTER_KEY длиной от 32 символов"
                )
            if len(
                self.ADMIN_PASSWORD.get_secret_value()
            ) < 12 or self.ADMIN_PASSWORD.get_secret_value().startswith("replace-"):
                raise ValueError(
                    "В production задайте уникальный ADMIN_PASSWORD длиной от 12 символов"
                )
            public = urlparse(self.WEBAPP_URL)
            if (
                public.scheme != "https"
                or not public.hostname
                or public.username
                or public.password
                or public.query
                or public.fragment
                or public.path not in {"", "/"}
            ):
                raise ValueError(
                    "В production WEBAPP_URL должен содержать HTTPS-адрес сайта без пути"
                )
        return self

    def tbank_ca_certificate(self) -> str | None:
        pem = self.TBANK_CA_CERT_PEM.get_secret_value()
        return _certificate_file(pem) if pem else self.TBANK_CA_CERT

    def postgresql_connection(self) -> dict[str, object]:
        connection: dict[str, object] = {
            "host": self.POSTGRESQL_HOST.get_secret_value(),
            "dbname": self.POSTGRESQL_DATABASE.get_secret_value(),
            "user": self.POSTGRESQL_USER.get_secret_value(),
            "password": self.POSTGRESQL_PASSWORD.get_secret_value(),
            "port": int(self.POSTGRESQL_PORT.get_secret_value()),
            "sslmode": self.POSTGRESQL_SSLMODE,
        }
        if self.POSTGRESQL_SSLROOTCERT:
            connection["sslrootcert"] = str(
                Path(self.POSTGRESQL_SSLROOTCERT).expanduser()
            )
        elif self.POSTGRESQL_SSLROOTCERT_PEM.get_secret_value():
            connection["sslrootcert"] = _certificate_file(
                self.POSTGRESQL_SSLROOTCERT_PEM.get_secret_value()
            )
        return connection


def get_settings() -> Settings:
    """Build settings at application startup, after its environment is ready."""
    return Settings()
