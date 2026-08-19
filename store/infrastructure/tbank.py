import hashlib
import json
import ssl
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


class TBankError(RuntimeError):
    pass


class TBankPayment:
    TEST_URL = "https://rest-api-test.tinkoff.ru/v2/Init"
    PRODUCTION_URL = "https://securepay.tinkoff.ru/v2/Init"
    
    def __init__(self, ca_certificate: str | None = None):
        self.ssl_context = self._ssl_context(ca_certificate)

    @staticmethod
    def _ssl_context(ca_certificate: str | None) -> ssl.SSLContext | None:
        if not ca_certificate:
            return None
        certificate = Path(ca_certificate).expanduser()
        context = ssl.create_default_context()
        data = certificate.read_bytes()
        # load_verify_locations accepts PEM as text and DER as bytes. This lets
        # the same Russian Trusted Root CA .cer file work on Windows and Linux.
        if data.lstrip().startswith(b"-----BEGIN CERTIFICATE-----"):
            context.load_verify_locations(cadata=data.decode("ascii"))
        else:
            context.load_verify_locations(cadata=data)
        return context

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
            urlopen_options = {"timeout": 15}
            if self.ssl_context is not None:
                urlopen_options["context"] = self.ssl_context
            with urlopen(request, **urlopen_options) as response:
                result = json.loads(response.read())
        except HTTPError as exc:
            raise TBankError(f"Т-Банк вернул HTTP {exc.code} при создании платежа") from exc
        except URLError as exc:
            if isinstance(exc.reason, ssl.SSLCertVerificationError):
                raise TBankError(
                    "Не удалось проверить TLS-сертификат Т-Банка; "
                    "установите TBANK_CA_CERT с путём к Russian Trusted Root CA"
                ) from exc
            raise TBankError(f"Не удалось подключиться к Т-Банку: {exc.reason}") from exc
        except TimeoutError as exc:
            raise TBankError("Т-Банк не ответил за 15 секунд") from exc
        except json.JSONDecodeError as exc:
            raise TBankError("Т-Банк вернул некорректный JSON-ответ") from exc
        if not result.get("Success") or not result.get("PaymentURL"):
            raise TBankError(str(result.get("Message") or result.get("Details") or "Т-Банк отклонил создание платежа"))
        return result