"""The paid-order JSON contract for the owner's 2p2p webhook."""

import json
from decimal import Decimal
from urllib.parse import urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler, HTTPSHandler

from store.application.checkout import receipt_items


class WebhookError(RuntimeError):
    pass


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        # Never forward customers' contact details to a redirect destination.
        return None


def paid_order_payload(order, public_url):
    customer, delivery = order["customer_details"], order["delivery_details"]

    def amount(value):
        return format(Decimal(str(value)).quantize(Decimal(".01")), "f")

    products = []
    for item in receipt_items(order["items"], include_zero=True):
        products.append(
            {
                "sku": str(item.get("sku") or item.get("product_id") or ""),
                "name": item["name"],
                "price": amount(item["unit_price"]),
                "amount": float(item["unit_price"] * item["quantity"]),
                "options": [
                    {"option": title, "variant": item[key]}
                    for key, title in [("color", "Цвет"), ("size", "Размер")]
                    if item.get(key)
                ],
                "quantity": item["quantity"],
                "externalid": str(item.get("product_id") or ""),
            }
        )
    payment = {
        "sys": "tinkoff",
        "amount": amount(order["total"]),
        "orderid": str(order["id"]),
        "delivery": "СДЭК" if delivery.get("type") in {"pvz", "cdek"} else "Самовывоз",
        "products": products,
        "subtotal": amount(
            sum((item["line_total"] for item in order["items"]), Decimal(0))
        ),
        "systranid": str(order["external_payment_id"]),
        "delivery_fio": customer.get("recipient", ""),
        "delivery_zip": delivery.get("postalCode", ""),
        "delivery_city": delivery.get("cityFullName") or delivery.get("cityName", ""),
        "delivery_price": float(order["shipping"]),
        "delivery_address": (delivery.get("pvz") or {}).get("address", ""),
        "delivery_comment": customer.get("comment", ""),
    }
    return {
        "id": str(order["id"]),
        "created_at": order["created_at"].isoformat(),
        "payload_type": "json",
        "customer_name": customer.get("name", ""),
        "customer_email": order["customer_email"],
        "contact": customer.get("phone", ""),
        "payload": {
            "Name": customer.get("name", ""),
            "Email": order["customer_email"],
            "Phone": customer.get("phone", ""),
            "Name_2": customer.get("recipient", ""),
            "formid": "apex-checkout",
            "COOKIES": "",
            "payment": payment,
            "formname": "Cart",
        },
        "cookies": {},
        "client": {"host": "", "port": 0},
        "headers": {
            "via": "",
            "host": "2p2p.ru",
            "accept": "application/json",
            "referer": public_url,
            "user-agent": "ApexStore/1",
            "content-type": "application/json",
            "content-length": "",
            "accept-encoding": "identity",
            "x-forwarded-for": "",
            "x-forwarded-host": urlparse(public_url).hostname or "",
            "x-forwarded-proto": "https",
        },
        "storage_status": "database",
        "queue_attempts": 0,
        "queue_error": "",
    }


class OrderWebhook:
    def __init__(self, url):
        parsed = urlparse(url)
        if (
            parsed.scheme != "https"
            or not parsed.hostname
            or parsed.username
            or parsed.password
        ):
            raise ValueError("ORDER_WEBHOOK_URL должен быть публичным HTTPS-адресом")
        self.url = url
        self.opener = build_opener(NoRedirect(), HTTPSHandler())

    def send(self, order_id, payload):
        request = Request(
            self.url,
            data=json.dumps(
                payload, ensure_ascii=False, separators=(",", ":")
            ).encode(),
            headers={
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "User-Agent": "ApexStore/1",
                "Idempotency-Key": "apex-paid-" + str(order_id),
            },
            method="POST",
        )
        try:
            with self.opener.open(request, timeout=10) as response:
                if not 200 <= response.status < 300:
                    raise WebhookError("Webhook вернул HTTP " + str(response.status))
        except WebhookError:
            raise
        except Exception as exc:
            # Avoid including response bodies, URLs with query tokens, contacts
            # or request objects in customer-visible administration diagnostics.
            code = getattr(exc, "code", None)
            raise WebhookError(
                "Webhook: HTTP " + str(code)
                if code
                else "Webhook временно недоступен. Отправка будет повторена."
            ) from exc
