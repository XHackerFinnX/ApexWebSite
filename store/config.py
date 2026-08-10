from pathlib import Path

from pydantic import SecretStr, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded by pydantic-settings from env/.env."""

    POSTGRESQL_USER: SecretStr
    POSTGRESQL_PASSWORD: SecretStr
    POSTGRESQL_HOST: SecretStr
    POSTGRESQL_PORT: SecretStr = SecretStr("5432")
    POSTGRESQL_DATABASE: SecretStr
    POSTGRESQL_SSLMODE: str = "disable"
    POSTGRESQL_SSLROOTCERT: str | None = None

    # Локальный запуск. В production значения переопределяются через .env/env.
    APP_HOST: str = "localhost"
    APP_PORT: int = 8000
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: SecretStr

    STORE_MASTER_KEY: SecretStr = SecretStr("unsafe-development-key")
    YANDEX_CAPTCHA_SERVER_KEY: SecretStr = SecretStr("")
    YANDEX_CAPTCHA_CLIENT_KEY: str = ""
    CAPTCHA_MODE: str = "mock"
    
    CDEK_CLIENT_ID: SecretStr = SecretStr("")
    CDEK_CLIENT_SECRET: SecretStr = SecretStr("")
    CDEK_FROM_POSTAL_CODE: str = "143911"
    CDEK_TARIFF_CODE: int = 136
    CDEK_DISPATCH_DELAY_DAYS: int = 10
    CDEK_FINAL_MARKUP: int = 150

    model_config: SettingsConfigDict = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

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
            if not self.POSTGRESQL_SSLROOTCERT:
                raise ValueError("Для проверки TLS задайте POSTGRESQL_SSLROOTCERT")
            certificate = Path(self.POSTGRESQL_SSLROOTCERT).expanduser()
            if not certificate.is_file():
                raise ValueError("Файл POSTGRESQL_SSLROOTCERT не найден")
        return self

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
        return connection


def get_settings() -> Settings:
    """Build settings at application startup, after its environment is ready."""
    return Settings()
