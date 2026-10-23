from decimal import Decimal, InvalidOperation

from store.application.checkout import CheckoutService as CheckoutService
from store.application.ports import StoreRepository
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
        if len(data.get("variants", [])) > 200:
            raise ValueError("У товара может быть не больше 200 вариаций")
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
            if not variant_price.is_finite() or (
                old_price is not None and (not old_price.is_finite() or old_price < 0)
            ):
                raise ValueError("Некорректная цена вариации")
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
            bool(data.get("is_new", False)),
        )
        if not product.images and product.image_url:
            product.images = (product.image_url,)
        if product.images:
            product.image_url = product.images[0]
        product.validate()
        keys = [(v["color"], v["size"]) for v in product.variants]
        skus = [v["sku"] for v in product.variants]
        if len(keys) != len(set(keys)) or len(skus) != len(set(skus)):
            raise ValueError(
                "Размеры внутри цвета и артикулы вариаций должны быть уникальными"
            )
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

    def cdek_lookup_config(self, data):
        """Use draft credentials without persisting them or returning saved secrets."""
        saved = (
            self.repo.get_integration_config("cdek", enabled_only=False)
            if data.get("use_saved") is True
            else None
        ) or {}
        config = {
            "environment": str(
                data.get("environment") or saved.get("environment") or "test"
            ),
            **{
                key: str(data.get(key) or saved.get(key) or "").strip()
                for key in ("client_id", "client_secret")
            },
        }
        if config["environment"] not in {"test", "production"}:
            raise ValueError("Выберите тестовую или рабочую среду СДЭК")
        if not config["client_id"] or not config["client_secret"]:
            raise ValueError(
                "Сначала укажите ID и Secret СДЭК, затем выберите город отправителя"
            )
        return config

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
        if data.get("enabled") and not secrets and not exists and bool(secret_fields):
            raise ValueError("Для включения интеграции заполните реквизиты")
        # API clients predating the display-name field keep a sensible fallback;
        # the administration form requires an explicit customer-facing name.
        name = str(data.get("name", provider)).strip() or provider
        public = {
            "name": name,
            "environment": str(data.get("environment", "test")),
        }
        if public["environment"] not in {"test", "production"}:
            raise ValueError("Выберите тестовую или рабочую среду")
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
            required = (
                "contract_type",
                "tariff_code",
                "sender_city",
                "sender_office",
                "dimension_type",
                "weight",
                "length",
                "width",
                "height",
                "cost_type",
                "dispatch_days",
            )
            missing = [key for key in required if str(data.get(key, "")).strip() == ""]
            if missing:
                raise ValueError("Заполните все обязательные параметры СДЭК")
            public.update({key: str(data.get(key, "")).strip() for key in required})
            public.update(
                {
                    key: str(data.get(key) or "").strip()[:500]
                    for key in ("sender_city_name", "sender_office_name")
                }
            )
            public.update(
                {
                    "markup": str(data.get("markup", "0") or "0"),
                    "markup_type": str(data.get("markup_type", "fixed")),
                    "insurance": "true" if data.get("insurance") else "false",
                    "free_delivery_from": str(
                        data.get("free_delivery_from", "0") or "0"
                    ),
                }
            )
            for key in (
                "contract_type",
                "tariff_code",
                "sender_city",
                "weight",
                "length",
                "width",
                "height",
            ):
                if not public[key].isdigit() or int(public[key]) < 1:
                    raise ValueError(
                        "Коды, вес и размеры СДЭК должны быть положительными числами"
                    )
            if (
                not public["dispatch_days"].isdigit()
                or int(public["dispatch_days"]) > 90
            ):
                raise ValueError("Подготовка отправления: от 0 до 90 дней")
            if (
                public["dimension_type"] not in {"shipment", "product"}
                or public["cost_type"] not in {"free", "calculator"}
                or public["markup_type"] not in {"fixed", "percent"}
            ):
                raise ValueError("Проверьте параметры расчёта СДЭК")
            try:
                invalid_amount = any(
                    not Decimal(public[key]).is_finite() or Decimal(public[key]) < 0
                    for key in ("markup", "free_delivery_from")
                )
            except InvalidOperation as exc:
                raise ValueError(
                    "Укажите числовую наценку и порог бесплатной доставки"
                ) from exc
            if invalid_amount:
                raise ValueError(
                    "Наценка и порог бесплатной доставки не могут быть отрицательными"
                )
        test_result = None
        if provider == "cdek" and data.get("enabled") and self.cdek:
            existing = (
                self.repo.get_integration_config("cdek", enabled_only=False)
                if exists
                else {}
            )
            test_result = self.cdek.test_configuration(
                {**(existing or {}), **public, **secrets}
            )
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
