import signal
import threading
from http.server import ThreadingHTTPServer

from store.application.services import (
    CatalogService,
    CheckoutService,
    IntegrationService,
)
from store.config import Settings, get_settings
from store.infrastructure.captcha import YandexCaptcha
from store.infrastructure.cdek import CDEKDelivery
from store.infrastructure.media import configure_media
from store.infrastructure.postgres_repo import PostgreSQLRepository
from store.infrastructure.security import RateLimiter, SecretBox
from store.infrastructure.tbank import TBankPayment
from store.infrastructure.trust import configure_runtime_trust
from store.presentation.web import WebApp


def create_app(settings: Settings | None = None):
    configure_runtime_trust()
    config = settings or get_settings()
    configure_media(config)
    repo = PostgreSQLRepository(
        config.postgresql_connection(),
        SecretBox(config.STORE_MASTER_KEY.get_secret_value()),
    )
    delivery = CDEKDelivery(repo)
    return WebApp(
        CatalogService(repo),
        IntegrationService(repo, delivery),
        CheckoutService(
            YandexCaptcha(
                config.CAPTCHA_MODE, config.YANDEX_CAPTCHA_SERVER_KEY.get_secret_value()
            ),
            repo,
            TBankPayment(config.tbank_ca_certificate()),
            config.WEBAPP_URL,
            delivery,
        ),
        repo,
        RateLimiter(),
        delivery,
        config.ADMIN_USERNAME,
        config.ADMIN_PASSWORD.get_secret_value(),
        trust_proxy_headers=config.TRUST_PROXY_HEADERS,
        secure_cookies=config.WEBAPP_URL.startswith("https://"),
    )


def run():
    config = get_settings()
    app = create_app(config)
    print(f"Apex Store: http://{config.APP_HOST}:{config.APP_PORT}")

    class Server(ThreadingHTTPServer):
        daemon_threads = False

    server = Server((config.APP_HOST, config.APP_PORT), app.handler())

    def stop(_signum, _frame):
        threading.Thread(target=server.shutdown, daemon=True).start()

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    try:
        server.serve_forever()
    finally:
        server.server_close()
        app.repo.pool.close()
