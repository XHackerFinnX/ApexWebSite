from decimal import Decimal, InvalidOperation

from store.application.ports import CaptchaVerifier, StoreRepository
from store.domain import Integration, Product


class CatalogService:
    def __init__(self, repo: StoreRepository):
        self.repo = repo

    def list(self) -> list[Product]:
        return self.repo.list_products()

    def record(self, product_id: int, metric: str) -> None:
        if metric not in {"views", "cart_adds"}:
            raise ValueError("Неизвестная метрика")
        if not self.repo.get_product(product_id):
            raise LookupError("Товар не найден")
        self.repo.increment(product_id, metric)

    def save(self, data: dict) -> Product:
        try:
            price = Decimal(str(data.get("price", 0)))
        except InvalidOperation as exc:
            raise ValueError("Некорректная цена") from exc
        product = Product(
            int(data["id"]) if data.get("id") else None,
            str(data.get("name", "")),
            str(data.get("description", "")),
            price,
            str(data.get("category", "Другое")),
            tuple(str(x) for x in data.get("sizes", [])),
            str(data.get("image_url", "")),
            int(data.get("stock", 0)),
            int(data.get("views", 0)),
            int(data.get("cart_adds", 0)),
        )
        product.validate()
        return self.repo.save_product(product)


class IntegrationService:
    PROVIDERS = {  # noqa: RUF012
        "tbank": ("payment", ("terminal_key", "password")),
        "alfabank": ("payment", ("username", "password")),
        "cdek": ("delivery", ("client_id", "client_secret")),
    }

    def __init__(self, repo: StoreRepository):
        self.repo = repo

    def list(self):
        return self.repo.list_integrations()

    def configure(self, data: dict) -> None:
        provider = str(data.get("provider", ""))
        if provider not in self.PROVIDERS:
            raise ValueError("Провайдер не поддерживается")
        kind, secret_fields = self.PROVIDERS[provider]
        secrets = {
            key: str(data.get(key, "")) for key in secret_fields if data.get(key)
        }
        if (
            data.get("enabled")
            and not secrets
            and not any(x.provider == provider for x in self.list())
        ):
            raise ValueError("Для включения интеграции заполните реквизиты")
        public = {"environment": str(data.get("environment", "test"))}
        self.repo.save_integration(
            Integration(provider, kind, bool(data.get("enabled")), public, secrets)
        )


class CheckoutService:
    def __init__(self, captcha: CaptchaVerifier):
        self.captcha = captcha

    def confirm_captcha(self, token: str, ip: str) -> str:
        if not self.captcha.verify(token, ip):
            raise ValueError("Проверка CAPTCHA не пройдена")
        return "captcha-approved"
