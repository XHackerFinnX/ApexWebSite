from http.server import ThreadingHTTPServer

from store.application.services import (
    CatalogService,
    CheckoutService,
    IntegrationService,
)
from store.config import Settings, get_settings
from store.infrastructure.captcha import YandexCaptcha
from store.infrastructure.cdek import CDEKDelivery
from store.infrastructure.postgres_repo import PostgreSQLRepository
from store.infrastructure.tbank import TBankPayment
from store.infrastructure.security import RateLimiter, SecretBox
from store.presentation.web import WebApp


def create_app(settings: Settings | None = None):
    config = settings or get_settings()
    repo = PostgreSQLRepository(
        config.postgresql_connection(),
        SecretBox(config.STORE_MASTER_KEY.get_secret_value()),
    )
    delivery = CDEKDelivery(repo)
    return WebApp(
        CatalogService(repo),
        IntegrationService(repo, delivery),
        CheckoutService(YandexCaptcha(), repo, TBankPayment(), config.WEBAPP_URL),
        repo,
        RateLimiter(),
        delivery,
        config.ADMIN_USERNAME,
        config.ADMIN_PASSWORD.get_secret_value(),
    )


def run():
    config = get_settings()
    app = create_app(config)
    print(f"Apex Store: http://{config.APP_HOST}:{config.APP_PORT}")
    ThreadingHTTPServer(
        (config.APP_HOST, config.APP_PORT), app.handler()
    ).serve_forever()
