import hashlib
import json
from decimal import ROUND_HALF_UP, Decimal
from uuid import uuid4

CENT = Decimal("0.01")


def allocate_discount(items, discount, eligible=None):
    """Allocate whole kopecks, keeping the receipt sum exactly equal to payment."""
    indices = [
        n
        for n, item in enumerate(items)
        if (eligible is None or eligible(item)) and item["line_total"] > 0
    ]
    total = sum((items[n]["line_total"] for n in indices), Decimal(0))
    remaining = min(discount, total).quantize(CENT)
    for position, index in enumerate(indices):
        amount = (
            remaining
            if position == len(indices) - 1
            else min(
                remaining,
                (discount * items[index]["line_total"] / total).quantize(
                    CENT, rounding=ROUND_HALF_UP
                ),
            )
        )
        amount = min(amount, items[index]["line_total"])
        items[index]["line_total"] -= amount
        remaining -= amount
    # Rounding may leave a kopeck when the last line is very small.
    for index in indices:
        amount = min(remaining, items[index]["line_total"])
        items[index]["line_total"] -= amount
        remaining -= amount


def receipt_items(items, shipping=Decimal(0)):
    result = []
    for item in items:
        cents = int(item["line_total"] * 100)
        price, remainder = divmod(cents, item["quantity"])
        for unit, quantity in [
            (price, item["quantity"] - remainder),
            (price + 1, remainder),
        ]:
            if quantity and unit:
                result.append(
                    {
                        "name": item["name"],
                        "quantity": quantity,
                        "unit_price": Decimal(unit) / 100,
                    }
                )
    if shipping:
        result.append(
            {
                "name": "Доставка",
                "quantity": 1,
                "unit_price": shipping,
                "payment_object": "service",
            }
        )
    return result


class CheckoutService:
    def __init__(self, captcha, repo=None, tbank=None, public_url="", delivery=None):
        self.captcha, self.repo, self.tbank, self.public_url, self.delivery = (
            captcha,
            repo,
            tbank,
            public_url.rstrip("/"),
            delivery,
        )

    def confirm_captcha(self, token, ip):
        if not self.captcha.verify(token, ip):
            raise ValueError("Проверка CAPTCHA не пройдена")
        return "captcha-approved"

    def quote(self, data, customer=None, require_delivery=False):
        raw_items = data.get("items", [])
        if not isinstance(raw_items, list) or not 1 <= len(raw_items) <= 100:
            raise ValueError("Добавьте товары в корзину (до 100 позиций)")
        selections = {}
        for raw in raw_items:
            key = (
                int(raw.get("product_id", 0)),
                str(raw.get("color", "")),
                str(raw.get("size", "")),
            )
            quantity = int(raw.get("quantity", 0))
            if not 1 <= quantity <= 99:
                raise ValueError("Количество должно быть от 1 до 99")
            selections[key] = selections.get(key, 0) + quantity
        items = []
        for (product_id, color, size), quantity in selections.items():
            product = self.repo.get_product(product_id)
            if not product or not product.is_active:
                raise ValueError("В корзине есть недоступный товар")
            variant = next(
                (
                    v
                    for v in product.variants
                    if v.get("size", "") == size and v.get("color", "") == color
                ),
                None,
            )
            if product.variants and not variant:
                raise ValueError(
                    f"Выберите доступные цвет и размер товара «{product.name}»"
                )
            price = Decimal(
                str(variant["price"] if variant else product.price)
            ).quantize(CENT, rounding=ROUND_HALF_UP)
            if (
                not price.is_finite()
                or quantity > int(variant["stock"] if variant else product.stock)
                or quantity > 99
            ):
                raise ValueError(f"Недостаточно товара «{product.name}»")
            items.append(
                {
                    "product_id": product_id,
                    "name": product.name,
                    "quantity": quantity,
                    "color": color,
                    "size": size,
                    "sku": variant.get("sku", "") if variant else "",
                    "unit_price": price,
                    "line_total": price * quantity,
                    "weight": int(variant.get("weight", 0) or 0) if variant else 0,
                    "dimensions": variant.get("dimensions", "") if variant else "",
                }
            )
        subtotal = sum((i["line_total"] for i in items), Decimal(0))
        code = str(data.get("promo_code") or "").strip().upper()
        promo = self.repo.get_promotion(code) if code else None
        promo_discount = Decimal(0)
        if code:
            if not promo:
                raise ValueError("Промокод недействителен, истёк или исчерпан")
            eligible = sum(
                (
                    i["line_total"]
                    for i in items
                    if i["product_id"] == promo["product_id"]
                ),
                Decimal(0),
            )
            if eligible <= 0:
                raise ValueError("Промокод действует на другой товар")
            promo_discount = min(
                eligible,
                eligible * promo["value"] / 100
                if promo["discount_type"] == "percent"
                else promo["value"],
            ).quantize(CENT, rounding=ROUND_HALF_UP)
            allocate_discount(
                items,
                promo_discount,
                lambda item: item["product_id"] == promo["product_id"],
            )
        settings = self.repo.loyalty_settings()
        points = int(data.get("points", 0) or 0)
        if points < 0:
            raise ValueError("Количество баллов не может быть отрицательным")
        maximum = (
            min(
                max(int(customer["points"]), 0),
                int(
                    (subtotal - promo_discount)
                    * Decimal(settings["redeem_percent"])
                    / 100
                ),
            )
            if customer
            else 0
        )
        if points > maximum:
            raise ValueError(
                f"Можно списать до {maximum} баллов. Для списания войдите в кабинет"
            )
        allocate_discount(items, Decimal(points))
        delivery = data.get("delivery") or {}
        shipping = Decimal(0)
        if delivery.get("type") in {"pvz", "cdek"}:
            if not self.delivery:
                raise ValueError("Доставка СДЭК недоступна")
            city_code = int(delivery.get("city_code") or 0)
            postal = str(delivery.get("postalCode", ""))
            if require_delivery:
                code_pvz = str((delivery.get("pvz") or {}).get("code", ""))
                points_list = self.delivery.pvz(postal, city_code=city_code)
                point = next((p for p in points_list if p["code"] == code_pvz), None)
                if not point:
                    raise ValueError("Выберите действующий ПВЗ в указанном городе")
                delivery = {**delivery, "pvz": point}
            result = self.delivery.calculate(
                postal,
                float(subtotal - promo_discount),
                city_code=city_code,
                items=items,
                delivery_point=str((delivery.get("pvz") or {}).get("code") or ""),
            )
            shipping = Decimal(str(result["price"])).quantize(CENT)
        elif delivery.get("type") in {"pickup", "self"}:
            if not self.repo.get_integration_config("pickup"):
                raise ValueError("Самовывоз сейчас недоступен")
        elif require_delivery:
            raise ValueError("Выберите доступный способ доставки")
        total = subtotal - promo_discount - points + shipping
        return {
            "items": items,
            "subtotal": subtotal,
            "promo_discount": promo_discount,
            "discount": promo_discount + points,
            "points_spent": points,
            "max_points": maximum,
            "points_earned": int(
                (subtotal - promo_discount - points)
                * Decimal(settings["earn_percent"])
                / 100
            )
            if customer
            else 0,
            "shipping": shipping,
            "total": total,
            "promo_code": code,
            "promotion": promo,
            "delivery_details": delivery,
            "delivery_pending": not delivery.get("type"),
        }

    def create_payment(self, data, customer=None):
        if not self.repo or not self.tbank or data.get("payment") != "tbank":
            raise ValueError("Выбранный способ оплаты не поддерживается")
        config = self.repo.get_integration_config("tbank")
        if not config:
            raise ValueError("Оплата через Т-Банк сейчас недоступна")
        contact = data.get("customer") or {}
        email = (
            str(customer["email"] if customer else contact.get("email", ""))
            .strip()
            .lower()
        )
        import re

        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
            raise ValueError("Укажите корректную почту для электронного чека")
        if (
            len(str(contact.get("name", "")).strip()) < 2
            or len(re.sub(r"\D", "", str(contact.get("phone", "")))) < 10
            or len(str(data.get("recipient", "")).strip().split()) < 2
        ):
            raise ValueError("Укажите имя, телефон и ФИО получателя")
        key = str(data.get("idempotency_key") or uuid4())
        if not 8 <= len(key) <= 128:
            raise ValueError("Некорректный ключ заказа")
        fingerprint = hashlib.sha256(
            json.dumps(
                {
                    "items": data.get("items"),
                    "promo": str(data.get("promo_code") or "").strip().upper(),
                    "points": int(data.get("points") or 0),
                    "delivery": data.get("delivery"),
                    "email": email,
                },
                sort_keys=True,
                ensure_ascii=False,
            ).encode()
        ).hexdigest()
        previous = self.repo.checkout_order(
            key, email, customer["id"] if customer else None, fingerprint
        )
        if previous:
            if previous.get("payment_url"):
                return {
                    "order_id": str(previous["id"]),
                    "payment_url": previous["payment_url"],
                }
            return self._initialize_payment(
                config, previous, previous["items"], previous["shipping"]
            )
        quote = self.quote(data, customer, require_delivery=True)
        if quote["total"] <= 0:
            raise ValueError("Итоговая сумма оплаты должна быть больше нуля")
        promo = quote["promotion"] or {}
        order = self.repo.create_order(
            {
                "id": str(uuid4()),
                "status": "NEW",
                "customer_email": email,
                "customer_id": customer["id"] if customer else None,
                "payment_provider": "tbank",
                "idempotency_key": key,
                "subtotal": quote["subtotal"],
                "discount": quote["discount"],
                "shipping": quote["shipping"],
                "total": quote["total"],
                "promo_id": promo.get("id"),
                "promo_code": quote["promo_code"],
                "promo_type": promo.get("discount_type"),
                "promo_value": promo.get("value"),
                "promo_product_id": promo.get("product_id"),
                "points_spent": quote["points_spent"],
                "points_earned": quote["points_earned"],
                "customer_details": {
                    "name": str(contact.get("name", ""))[:120],
                    "phone": str(contact.get("phone", ""))[:40],
                    "recipient": str(data.get("recipient", ""))[:200],
                    "comment": str(data.get("comment", ""))[:2000],
                },
                "delivery_details": quote["delivery_details"],
                "checkout_digest": fingerprint,
            },
            quote["items"],
        )
        if order.get("payment_url"):
            return {"order_id": str(order["id"]), "payment_url": order["payment_url"]}
        return self._initialize_payment(
            config, order, quote["items"], quote["shipping"]
        )

    def _initialize_payment(self, config, order, items, shipping):
        if not self.repo.claim_payment(order["id"]):
            raise ValueError(
                "Платёж уже создаётся. Подождите несколько секунд и повторите"
            )
        try:
            result = self.tbank.init_payment(
                config, order, receipt_items(items, shipping), self.public_url
            )
        except Exception:
            self.repo.payment_initialization_failed(order["id"])
            raise
        self.repo.set_order_payment(
            str(order["id"]),
            str(result["PaymentId"]),
            str(result["Status"]),
            str(result["PaymentURL"]),
        )
        return {"order_id": str(order["id"]), "payment_url": result["PaymentURL"]}

    def accept_tbank_notification(self, data):
        config = self.repo.get_integration_config("tbank") if self.repo else None
        if (
            not config
            or str(data.get("TerminalKey", "")) != str(config["terminal_key"])
            or not self.tbank.verify_token(data, str(config["password"]))
        ):
            raise ValueError("Некорректная подпись уведомления Т-Банка")
        order = self.repo.payment_order(str(data.get("PaymentId", "")))
        if not order:
            raise ValueError("Заказ для платежа не найден")
        if str(data.get("Status")) == "CONFIRMED" and (
            "Amount" not in data
            or int(data["Amount"]) != int(order["total"] * 100)
            or data.get("Success") is not True
        ):
            raise ValueError("Сумма или результат платежа не совпадают с заказом")
        return self.repo.update_order_by_payment(
            str(data.get("PaymentId", "")), str(data.get("Status", ""))
        )
