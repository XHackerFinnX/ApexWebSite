import json
import time
from datetime import date, datetime, timedelta
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


class CDEKError(ValueError):
    """An error returned by CDEK that is safe to show to the customer."""


class CDEKDelivery:
    BASE_URLS = {
        "test": "https://api.edu.cdek.ru/v2",
        "production": "https://api.cdek.ru/v2",
    }
    TOKEN_URL = f"{BASE_URLS['production']}/oauth/token"
    CALC_URL = f"{BASE_URLS['production']}/calculator/tariff"
    PVZ_URL = f"{BASE_URLS['production']}/deliverypoints"

    def __init__(self, repository):
        self.repository = repository
        self._token = ""
        self._token_expire = 0.0

    def _credentials(self) -> tuple[str, str]:
        config = self._config()
        client_id = config.get("client_id", "")
        client_secret = config.get("client_secret", "")
        if not client_id or not client_secret:
            raise ValueError("Интеграция СДЭК не настроена")
        return str(client_id), str(client_secret)

    def _config(self) -> dict[str, object]:
        config = self.repository.get_integration_config("cdek")
        if not config:
            raise ValueError("Интеграция СДЭК не подключена")
        return config
    
    def _url(self, path: str, config: dict[str, object]) -> str:
        environment = str(config.get("environment", "production"))
        return f"{self.BASE_URLS.get(environment, self.BASE_URLS['production'])}/{path}"
    
    @staticmethod
    def _error_message(payload: object) -> str:
        if not isinstance(payload, dict):
            return "СДЭК отклонил запрос без пояснения"
        errors = payload.get("errors") or []
        if isinstance(errors, dict):
            errors = [errors]
        messages = [
            str(error.get("message", "")).strip()
            for error in errors
            if isinstance(error, dict) and error.get("message")
        ]
        return (
            "; ".join(messages)
            or str(payload.get("message", "")).strip()
            or "СДЭК отклонил запрос без пояснения"
        )

    def _request_json(self, url: str, *, method: str = "GET", data: dict | None = None, headers: dict | None = None):
        body = None if data is None else json.dumps(data).encode("utf-8")
        req = Request(url, data=body, method=method, headers=headers or {})
        try:
            with urlopen(req, timeout=12) as response:  # noqa: S310 - URLs are fixed CDEK API endpoints.
                return json.loads(response.read().decode("utf-8"))
        except HTTPError as exc:
            try:
                payload = json.loads(exc.read().decode("utf-8"))
            except (json.JSONDecodeError, UnicodeDecodeError):
                payload = None
            raise CDEKError(
                f"Ошибка СДЭК ({exc.code}): {self._error_message(payload)}"
            ) from exc
        except URLError as exc:
            raise CDEKError("Сервис СДЭК временно недоступен") from exc

    def _token_for(self, config: dict[str, object], *, cache: bool = True) -> str:
        if cache and self._token and self._token_expire > time.time():
            return self._token
        client_id = str(config.get("client_id", ""))
        client_secret = str(config.get("client_secret", ""))
        if not client_id or not client_secret:
            raise ValueError("Заполните ID и Secret СДЭК")
        payload = urlencode({"grant_type": "client_credentials", "client_id": client_id, "client_secret": client_secret}).encode()
        req = Request(self._url("oauth/token", config), data=payload, method="POST", headers={"Content-Type": "application/x-www-form-urlencoded"})
        try:
            with urlopen(req, timeout=12) as response:  # noqa: S310 - URL is a fixed CDEK API endpoint.
                data = json.loads(response.read().decode("utf-8"))
        except HTTPError as exc:
            try:
                payload = json.loads(exc.read().decode("utf-8"))
            except (json.JSONDecodeError, UnicodeDecodeError):
                payload = None
            raise CDEKError(
                f"Ошибка авторизации СДЭК ({exc.code}): {self._error_message(payload)}"
            ) from exc
        except URLError as exc:
            raise CDEKError("Сервис СДЭК временно недоступен") from exc
        token = str(data.get("access_token", ""))
        if not token:
            raise CDEKError("СДЭК не вернул токен доступа")
        if cache:
            self._token = token
            self._token_expire = time.time() + int(data.get("expires_in", 3600)) - 60
        return token

    def token(self) -> str:
        return self._token_for(self._config())

    def invalidate_token(self) -> None:
        self._token = ""
        self._token_expire = 0

    def test_configuration(self, config: dict[str, object]) -> dict[str, object]:
        """Validate credentials and run a real tariff calculation before saving."""
        token = self._token_for(config, cache=False)
        payload = self._calculation_payload(config, {"code": int(config["sender_city"])})
        result = self._request_json(
            self._url("calculator/tariff", config),
            method="POST",
            data=payload,
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        )
        if result.get("total_sum") is None and result.get("delivery_sum") is None:
            raise CDEKError("Тест СДЭК не вернул стоимость доставки")
        return {"authorization": True, "calculation": True}

    def _calculation_payload(self, config: dict[str, object], destination: dict[str, object]) -> dict[str, object]:
        dispatch_at = (datetime.now() + timedelta(days=int(config["dispatch_days"]))).strftime("%Y-%m-%dT%H:%M:%S+0300")
        return {
            "date": dispatch_at,
            "type": int(config["contract_type"]),
            "currency": 1,
            "lang": "rus",
            "tariff_code": int(config["tariff_code"]),
            "from_location": {"code": int(config["sender_city"])},
            "to_location": destination,
            "packages": [{"weight": int(config["weight"]), "length": max(1, int(config["length"]) // 10), "width": max(1, int(config["width"]) // 10), "height": max(1, int(config["height"]) // 10)}],
        }
    def calculate(self, postal_code: str, order_total: float = 0) -> dict[str, int | float]:
        if not postal_code:
            raise ValueError("postal_code обязателен")
        config = self._config()
        payload = self._calculation_payload(config, {"postal_code": str(postal_code)})
        result = self._request_json(self._url("calculator/tariff", config), method="POST", data=payload, headers={"Authorization": f"Bearer {self.token()}", "Content-Type": "application/json"})
        base_price = result.get("total_sum") or result.get("delivery_sum")
        if base_price is None:
            raise ValueError("Некорректный ответ СДЭК")
        delivery_min = (result.get("delivery_date_range") or {}).get("min")
        days = int(result.get("calendar_min") or 0)
        if delivery_min:
            days = max(0, (datetime.strptime(delivery_min, "%Y-%m-%d").date() - date.today()).days)
        price = float(base_price)
        markup = float(config.get("markup", 0))
        price += price * markup / 100 if config.get("markup_type") == "percent" else markup
        free_from = float(config.get("free_delivery_from", 0))
        if config.get("cost_type") == "free" or (free_from > 0 and order_total >= free_from):
            price = 0
        return {"price": round(price), "days": days, "free_from": free_from}

    def pvz(self, postal_code: str) -> list[dict[str, str]]:
        if not postal_code:
            raise ValueError("postalCode обязателен")
        query = urlencode({"postal_code": postal_code, "type": "PVZ", "lang": "rus"})
        config = self._config()
        data = self._request_json(f"{self._url('deliverypoints', config)}?{query}", headers={"Authorization": f"Bearer {self.token()}"})
        points = data if isinstance(data, list) else data.get("pvz", [])
        return [
            {
                "code": str(p.get("code", "")),
                "name": str(p.get("name") or p.get("code") or "ПВЗ СДЭК"),
                "address": str((p.get("location") or {}).get("address") or p.get("address") or ""),
                "workTime": str(p.get("work_time") or p.get("workTime") or ""),
                "phone": str((p.get("phones") or [{}])[0].get("number", "") if p.get("phones") else ""),
            }
            for p in points
        ]