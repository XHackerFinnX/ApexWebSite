from decimal import Decimal, InvalidOperation

from store.application.ports import CaptchaVerifier, StoreRepository
from store.domain import Integration, Product
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from uuid import uuid4


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
        variants = []
        color_images: dict[str, list[str]] = {}
        for raw in data.get("variants", []):
            try:
                variant_price = Decimal(str(raw.get("price", 0)))
                old_price = (
                    Decimal(str(raw["old_price"])) if raw.get("old_price") else None
                )
            except InvalidOperation as exc:
                raise ValueError("Некорректная цена вариации") from exc
            variant = {
                "sku": str(raw.get("sku", "")).strip(),
                "price": str(variant_price),
                "old_price": str(old_price) if old_price is not None else "",
                "stock": int(raw.get("stock", 0)),
                "color": str(raw.get("color", "")).strip(),
                "size": str(raw.get("size", "")).strip(),
                "dimensions": str(raw.get("dimensions", "")).strip(),
                "weight": int(raw.get("weight", 0) or 0),
                "images": [str(image) for image in raw.get("images", []) if image],
            }
            if variant["images"]:
                color_images[variant["color"]] = variant["images"]
            variants.append(variant)
        for variant in variants:
            if not variant["images"]:
                variant["images"] = color_images.get(variant["color"], [])
        if variants:
            data = dict(data)
            data["price"] = min(Decimal(x["price"]) for x in variants)
            data["stock"] = sum(int(x["stock"]) for x in variants)
            data["sizes"] = list(
                dict.fromkeys(x["size"] for x in variants if x["size"])
            )
            data["color"] = ", ".join(
                dict.fromkeys(x["color"] for x in variants if x["color"])
            )
            variant_images = next((x["images"] for x in variants if x["images"]), [])
            data["images"] = variant_images
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
            str(data.get("color", "")),
            tuple(str(x) for x in data.get("images", []) if str(x)),
            tuple(variants),
            bool(data.get("is_active", False)),
        )
        if not product.images and product.image_url:
            product.images = (product.image_url,)
        if product.images:
            product.image_url = product.images[0]
        product.validate()
        return self.repo.save_product(product)


class IntegrationService:
    PROVIDERS = {  # noqa: RUF012
        "tbank": ("payment", ("terminal_key", "password")),
        "alfabank": ("payment", ("username", "password")),
        "cdek": ("delivery", ("client_id", "client_secret")),
        "pickup": ("delivery", ()),
        "international": ("delivery", ()),
    }

    def __init__(self, repo: StoreRepository, cdek=None):
        self.repo = repo
        self.cdek = cdek

    def list(self):
        return self.repo.list_integrations()

    def configure(self, data: dict, *, update: bool = False) -> dict[str, object]:
        provider = str(data.get("provider", ""))
        if provider not in self.PROVIDERS:
            raise ValueError("Провайдер не поддерживается")
        kind, secret_fields = self.PROVIDERS[provider]
        exists = any(x.provider == provider for x in self.list())
        if exists and not update:
            raise ValueError("Этот сервис уже добавлен")
        if update and not exists:
            raise LookupError("Интеграция не найдена")
        secrets = {
            key: str(data.get(key, "")) for key in secret_fields if data.get(key)
        }
        if (
            data.get("enabled")
            and not secrets
            and not exists
        ):
            raise ValueError("Для включения интеграции заполните реквизиты")
        # API clients predating the display-name field keep a sensible fallback;
        # the administration form requires an explicit customer-facing name.
        name = str(data.get("name", provider)).strip() or provider
        public = {
            "name": name,
            "environment": str(data.get("environment", "test")),
        }
        if provider == "tbank":
            public.update(
                {
                    "taxation": "usn_income",
                    "item_tax": "none",
                    "delivery_tax": "none",
                    "language": "ru",
                    "ffd_receipt_enabled": "false",
                }
            )
        if provider == "cdek" and "name" in data:
            required = ("contract_type", "tariff_code", "sender_city", "sender_office", "dimension_type", "weight", "length", "width", "height", "cost_type", "dispatch_days")
            missing = [key for key in required if str(data.get(key, "")).strip() == ""]
            if missing:
                raise ValueError("Заполните все обязательные параметры СДЭК")
            public.update({key: str(data.get(key, "")).strip() for key in required})
            public.update({
                "markup": str(data.get("markup", "0") or "0"),
                "markup_type": str(data.get("markup_type", "fixed")),
                "insurance": "true" if data.get("insurance") else "false",
                "free_delivery_from": str(data.get("free_delivery_from", "0") or "0"),
            })
        test_result = None
        if provider == "cdek" and data.get("enabled") and self.cdek:
            existing = self.repo.get_integration_config("cdek", enabled_only=False) if exists else {}
            test_result = self.cdek.test_configuration({**(existing or {}), **public, **secrets})
        self.repo.save_integration(
            Integration(provider, kind, bool(data.get("enabled")), public, secrets)
        )
        if provider == "cdek" and self.cdek:
            self.cdek.invalidate_token()
        return {"ok": True, "test": test_result}
        
    def delete(self, provider: str) -> bool:
        if provider not in self.PROVIDERS:
            raise ValueError("Провайдер не поддерживается")
        return self.repo.delete_integration(provider)


class CheckoutService:
    def __init__(self, captcha: CaptchaVerifier, repo=None, tbank=None, public_url=""):
        self.captcha = captcha
        self.repo = repo
        self.tbank = tbank
        self.public_url = public_url.rstrip("/")

    def confirm_captcha(self, token: str, ip: str) -> str:
        if not self.captcha.verify(token, ip):
            raise ValueError("Проверка CAPTCHA не пройдена")
        return "captcha-approved"
    
    def create_payment(self, data: dict) -> dict[str, object]:
        if not self.repo or not self.tbank:
            raise ValueError("Платёжный сервис не настроен")
        if data.get("payment") != "tbank":
            raise ValueError("Выбранный способ оплаты не поддерживается")
        config = self.repo.get_integration_config("tbank")
        if not config:
            raise ValueError("Оплата через Т-Банк сейчас недоступна")
        email = str(data.get("customer", {}).get("email", "")).strip()
        if "@" not in email:
            raise ValueError("Укажите корректную почту для электронного чека")
        items, total = [], Decimal("0")
        for raw in data.get("items", []):
            product = self.repo.get_product(int(raw.get("product_id", 0)))
            quantity = int(raw.get("quantity", 0))
            if not product or not product.is_active or quantity < 1:
                raise ValueError("В корзине есть недоступный товар")
            size, color = str(raw.get("size", "")), str(raw.get("color", ""))
            variant = next(
                (
                    v
                    for v in product.variants
                    if str(v.get("size", "")) == size
                    and str(v.get("color", "")) == color
                ),
                None,
            )
            if product.variants and not variant:
                raise ValueError(f"Вариация товара «{product.name}» не найдена")
            price = Decimal(
                str(variant.get("price") if variant else product.price)
            ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            if quantity > int(variant.get("stock", 0) if variant else product.stock):
                raise ValueError(f"Недостаточно товара «{product.name}»")
            items.append(
                {
                    "product_id": product.id,
                    "name": product.name,
                    "size": size,
                    "color": color,
                    "quantity": quantity,
                    "unit_price": price,
                }
            )
            total += price * quantity
        if not items or total <= 0:
            raise ValueError("Корзина пуста")
        order_id = str(uuid4())
        order = self.repo.create_order(
            {
                "id": order_id,
                "status": "NEW",
                "customer_email": email,
                "total": total,
                "payment_provider": "tbank",
                "idempotency_key": str(data.get("idempotency_key") or uuid4()),
            },
            items,
        )
        result = self.tbank.init_payment(config, order, items, self.public_url)
        actual_order_id = str(order["id"])
        self.repo.set_order_payment(
            actual_order_id, str(result["PaymentId"]), str(result["Status"])
        )
        return {"order_id": actual_order_id, "payment_url": result["PaymentURL"]}

    def accept_tbank_notification(self, data: dict) -> bool:
        config = self.repo.get_integration_config("tbank") if self.repo else None
        if not config or not self.tbank.verify_token(data, str(config["password"])):
            raise ValueError("Некорректная подпись уведомления Т-Банка")
        return self.repo.update_order_by_payment(
            str(data.get("PaymentId", "")), str(data.get("Status", ""))
        )
