"""T-Bank hosted checkout: signed requests, receipts and payment reconciliation."""

import hashlib
import hmac
import json
import ssl
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


class TBankError(RuntimeError):
    def __init__(self, message, *, code=None, ambiguous=False):
        super().__init__(message)
        self.code, self.ambiguous = code, ambiguous


class TBankPayment:
    TEST_BASE = "https://rest-api-test.tinkoff.ru"
    PRODUCTION_BASE = "https://securepay.tinkoff.ru"
    TEST_URL = TEST_BASE + "/v2/Init"
    PRODUCTION_URL = PRODUCTION_BASE + "/v2/Init"

    def __init__(self, ca_certificate: str | None = None):
        self.ssl_context = self._ssl_context(ca_certificate)

    @staticmethod
    def _ssl_context(ca_certificate):
        if not ca_certificate:
            return None
        context = ssl.create_default_context()
        data = Path(ca_certificate).expanduser().read_bytes()
        context.load_verify_locations(
            cadata=data.decode("ascii")
            if data.lstrip().startswith(b"-----BEGIN CERTIFICATE-----")
            else data
        )
        return context

    @classmethod
    def base_url(cls, config):
        # DEMO is a test terminal on the production API host, not a terminal for
        # the separate IP-allowlisted test environment. Never fall back from a
        # blocked test API to a production terminal: that could charge real money.
        terminal = str(config.get("terminal_key", "")).strip().upper()
        demo = terminal.startswith("DEMO") or terminal.endswith("DEMO")
        environment = config.get("environment", "test")
        if environment not in {"test", "production", "demo"}:
            raise TBankError("Выберите среду Т-Банка")
        if environment == "demo" and not demo:
            raise TBankError("Для режима DEMO укажите тестовый TerminalKey с DEMO")
        return (
            cls.TEST_BASE if environment == "test" and not demo else cls.PRODUCTION_BASE
        )

    @staticmethod
    def token(payload, password):
        values = {
            key: value
            for key, value in payload.items()
            if key != "Token"
            and value is not None
            and not isinstance(value, (dict, list))
        }
        values["Password"] = password
        source = "".join(
            str(values[key]).lower()
            if isinstance(values[key], bool)
            else str(values[key])
            for key in sorted(values)
        )
        return hashlib.sha256(source.encode("utf-8")).hexdigest()

    def verify_token(self, payload, password):
        return hmac.compare_digest(
            str(payload.get("Token", "")), self.token(payload, password)
        )

    @staticmethod
    def _error_details(body):
        parts = []
        if body.get("ErrorCode") not in (None, "", "0", 0):
            parts.append("код " + str(body["ErrorCode"]))
        for key in ("Message", "Details"):
            value = str(body.get(key) or "").strip()
            if value and value not in {"None", "OK"} and value not in parts:
                parts.append(value[:500])
        return ": ".join(parts) or "Т-Банк отклонил запрос"

    @classmethod
    def _http_error_message(cls, exc):
        raw = exc.read(16384)
        try:
            body = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            body = None
        if isinstance(body, dict):
            return cls._error_details(body)
        text = raw.decode("utf-8", errors="replace").strip()
        return (
            text[:500]
            if text and "<" not in text
            else str(exc.reason or "без пояснения")
        )

    def request(self, config, method, fields):
        if method not in {"Init", "GetState", "CheckOrder", "Confirm", "Cancel"}:
            raise ValueError("Неизвестный метод Т-Банка")
        base = self.base_url(config)
        payload = {"TerminalKey": str(config["terminal_key"]).strip(), **fields}
        payload["Token"] = self.token(payload, str(config["password"]))
        request = Request(
            base + "/v2/" + method,
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json", "Accept": "application/json"},
            method="POST",
        )
        try:
            options = {"timeout": 15}
            if self.ssl_context is not None:
                options["context"] = self.ssl_context
            with urlopen(request, **options) as response:
                result = json.loads(response.read())
        except HTTPError as exc:
            details = self._http_error_message(exc)
            hint = ""
            if exc.code == 403 and base == self.TEST_BASE:
                hint = (
                    " Тестовый API требует внешний IP сервера в белом списке Т-Банка. "
                    "Для TerminalKey с DEMO используется securepay.tinkoff.ru."
                )
            operation = "создании платежа" if method == "Init" else f"вызове {method}"
            raise TBankError(
                f"Т-Банк вернул HTTP {exc.code} при {operation} ({urlparse(base).hostname}): {details}.{hint}".strip(),
                code=exc.code,
                ambiguous=exc.code >= 500 or exc.code in {408, 429},
            ) from exc
        except URLError as exc:
            if isinstance(exc.reason, ssl.SSLCertVerificationError):
                raise TBankError(
                    "Не удалось проверить TLS-сертификат Т-Банка; установите TBANK_CA_CERT с путём к Russian Trusted Root CA"
                ) from exc
            raise TBankError(
                f"Не удалось подключиться к Т-Банку: {exc.reason}", ambiguous=True
            ) from exc
        except (TimeoutError, ConnectionError) as exc:
            raise TBankError(
                "Т-Банк не ответил за 15 секунд. Результат запроса уточняется.",
                ambiguous=True,
            ) from exc
        except (json.JSONDecodeError, UnicodeDecodeError) as exc:
            raise TBankError(
                "Т-Банк вернул некорректный JSON-ответ", ambiguous=True
            ) from exc
        if not isinstance(result, dict):
            raise TBankError("Т-Банк вернул некорректный JSON-ответ", ambiguous=True)
        if result.get("Success") is not True:
            raise TBankError(
                self._error_details(result),
                code=str(result.get("ErrorCode", "")),
                ambiguous=method == "Init" and str(result.get("ErrorCode")) == "20",
            )
        return result

    @staticmethod
    def receipt(config, order, items):
        lines = []
        for item in items:
            price, quantity = int(item["unit_price"] * 100), int(item["quantity"])
            delivery = item.get("payment_object") == "service"
            line = {
                "Name": str(item["name"])[:128],
                "Price": price,
                "Quantity": quantity,
                "Amount": price * quantity,
                "Tax": config.get("delivery_tax" if delivery else "item_tax", "none"),
                "PaymentMethod": "full_payment",
                "PaymentObject": "service" if delivery else "commodity",
            }
            if config.get("ffd_version", "1.05") == "1.2":
                line["MeasurementUnit"] = "шт"
            lines.append(line)
        if not lines or len(lines) > 100:
            raise TBankError("Чек должен содержать от 1 до 100 позиций")
        if sum(line["Amount"] for line in lines) != int(order["total"] * 100):
            raise TBankError("Сумма чека не совпадает с суммой платежа")
        receipt = {
            "Email": order["customer_email"],
            "Taxation": config.get("taxation", "usn_income"),
            "Items": lines,
        }
        if config.get("ffd_version") == "1.2":
            receipt["FfdVersion"] = "1.2"
        return receipt

    def init_payment(self, config, order, items, public_url):
        if urlparse(public_url).scheme != "https" or not urlparse(public_url).hostname:
            raise TBankError("Для оплаты задайте публичный HTTPS-адрес WEBAPP_URL")
        public_url = public_url.rstrip("/")
        order_id = str(order["id"])
        fields = {
            "Amount": int(order["total"] * 100),
            "OrderId": order_id,
            "Description": f"Заказ {order_id}",
            "Language": config.get("language", "ru"),
            "SuccessURL": f"{public_url}/payment/success?order_id={order_id}",
            "FailURL": f"{public_url}/payment/fail?order_id={order_id}",
            "NotificationURL": f"{public_url}/api/payments/tbank/notification",
            "RedirectDueDate": (
                datetime.now(timezone.utc) + timedelta(minutes=30)
            ).isoformat(timespec="seconds"),
        }
        if config.get("pay_type") in {"O", "T"}:
            fields["PayType"] = config["pay_type"]
        if str(config.get("receipt_enabled", "true")).lower() == "true":
            fields["Receipt"] = self.receipt(config, order, items)
        result = self.request(config, "Init", fields)
        for key, expected in [
            ("OrderId", order_id),
            ("Amount", fields["Amount"]),
            ("TerminalKey", str(config["terminal_key"]).strip()),
        ]:
            if key in result and str(result[key]) != str(expected):
                raise TBankError(
                    "Ответ Init не совпадает с заказом. Результат уточняется.",
                    ambiguous=True,
                )
        if (
            not result.get("PaymentId")
            or not result.get("Status")
            or urlparse(str(result.get("PaymentURL", ""))).scheme != "https"
        ):
            raise TBankError(
                "Т-Банк не вернул идентификатор, статус или HTTPS-ссылку платежа. Результат уточняется.",
                ambiguous=True,
            )
        return result

    def get_state(self, config, payment_id):
        return self.request(config, "GetState", {"PaymentId": str(payment_id)})

    def check_order(self, config, order_id):
        return self.request(config, "CheckOrder", {"OrderId": str(order_id)})

    def confirm(self, config, order, items):
        fields = {
            "PaymentId": str(order["external_payment_id"]),
            "Amount": int(order["total"] * 100),
        }
        if str(config.get("receipt_enabled", "true")).lower() == "true":
            fields["Receipt"] = self.receipt(config, order, items)
        return self.request(config, "Confirm", fields)

    def cancel_unpaid(self, config, payment_id):
        # This method is only invoked after GetState proves the payment has not
        # been captured. Deleting a paid order must never perform a refund.
        # NEW ignores Amount and closes the session. Explicit zero prevents a
        # full refund if capture races our preceding GetState request.
        return self.request(
            config, "Cancel", {"PaymentId": str(payment_id), "Amount": 0}
        )
