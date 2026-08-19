import hashlib
import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


class TBankError(RuntimeError):
    pass


class TBankPayment:
    TEST_URL = "https://rest-api-test.tinkoff.ru/v2/Init"
    PRODUCTION_URL = "https://securepay.tinkoff.ru/v2/Init"

    @staticmethod
    def token(payload: dict, password: str) -> str:
        values = {key: value for key, value in payload.items() if key not in {"Token", "Receipt", "DATA"} and not isinstance(value, (dict, list))}
        values["Password"] = password
        def token_value(value):
            return str(value).lower() if isinstance(value, bool) else str(value)
        source = "".join(token_value(values[key]) for key in sorted(values))
        return hashlib.sha256(source.encode("utf-8")).hexdigest()

    def verify_token(self, payload: dict, password: str) -> bool:
        import hmac
        return hmac.compare_digest(str(payload.get("Token", "")), self.token(payload, password))

    def init_payment(self, config: dict, order: dict, items: list[dict], public_url: str) -> dict:
        if not public_url.startswith("https://"):
            raise TBankError("Для оплаты задайте публичный HTTPS-адрес WEBAPP_URL")
        order_id = str(order["id"])
        receipt_items = []
        for item in items:
            price = int(item["unit_price"] * 100)
            receipt_items.append({"Name": item["name"][:128], "Price": price, "Quantity": item["quantity"], "Amount": price * item["quantity"], "Tax": "none", "PaymentMethod": "full_payment", "PaymentObject": "commodity"})
        payload = {
            "TerminalKey": config["terminal_key"], "Amount": int(order["total"] * 100),
            "OrderId": order_id, "Description": f"Заказ {order_id}", "Language": "ru",
            "SuccessURL": f"{public_url}/payment/success?order_id={order_id}",
            "FailURL": f"{public_url}/payment/fail?order_id={order_id}",
            "NotificationURL": f"{public_url}/api/payments/tbank/notification",
            "Receipt": {"Email": order["customer_email"], "Taxation": "usn_income", "Items": receipt_items},
        }
        payload["Token"] = self.token(payload, str(config["password"]))
        request = Request(self.TEST_URL if config.get("environment") == "test" else self.PRODUCTION_URL, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urlopen(request, timeout=15) as response:
                result = json.loads(response.read())
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
            raise TBankError("Т-Банк временно недоступен") from exc
        if not result.get("Success") or not result.get("PaymentURL"):
            raise TBankError(str(result.get("Message") or result.get("Details") or "Т-Банк отклонил создание платежа"))
        return result