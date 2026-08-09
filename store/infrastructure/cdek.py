import json
import time
from datetime import date, datetime, timedelta
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from store.config import Settings


class CDEKDelivery:
    TOKEN_URL = "https://api.cdek.ru/v2/oauth/token"
    CALC_URL = "https://api.cdek.ru/v2/calculator/tariff"
    PVZ_URL = "https://api.cdek.ru/v2/deliverypoints"

    def __init__(self, settings: Settings):
        self.settings = settings
        self._token = ""
        self._token_expire = 0.0

    def _credentials(self) -> tuple[str, str]:
        client_id = self.settings.CDEK_CLIENT_ID.get_secret_value()
        client_secret = self.settings.CDEK_CLIENT_SECRET.get_secret_value()
        if not client_id or not client_secret:
            raise ValueError("Не настроены реквизиты CDEK_CLIENT_ID/CDEK_CLIENT_SECRET")
        return client_id, client_secret

    def _request_json(self, url: str, *, method: str = "GET", data: dict | None = None, headers: dict | None = None):
        body = None if data is None else json.dumps(data).encode("utf-8")
        req = Request(url, data=body, method=method, headers=headers or {})
        with urlopen(req, timeout=12) as response:  # noqa: S310 - URLs are fixed CDEK API endpoints.
            return json.loads(response.read().decode("utf-8"))

    def token(self) -> str:
        if self._token and self._token_expire > time.time():
            return self._token
        client_id, client_secret = self._credentials()
        payload = urlencode({"grant_type": "client_credentials", "client_id": client_id, "client_secret": client_secret}).encode()
        req = Request(self.TOKEN_URL, data=payload, method="POST", headers={"Content-Type": "application/x-www-form-urlencoded"})
        with urlopen(req, timeout=12) as response:  # noqa: S310 - URL is a fixed CDEK API endpoint.
            data = json.loads(response.read().decode("utf-8"))
        self._token = data["access_token"]
        self._token_expire = time.time() + int(data.get("expires_in", 3600)) - 60
        return self._token

    def calculate(self, postal_code: str) -> dict[str, int]:
        if not postal_code:
            raise ValueError("postal_code обязателен")
        dispatch_at = (datetime.now() + timedelta(days=self.settings.CDEK_DISPATCH_DELAY_DAYS)).strftime("%Y-%m-%dT%H:%M:%S+0300")
        payload = {
            "date": dispatch_at,
            "type": 1,
            "currency": 1,
            "lang": "rus",
            "tariff_code": self.settings.CDEK_TARIFF_CODE,
            "from_location": {"postal_code": self.settings.CDEK_FROM_POSTAL_CODE},
            "to_location": {"postal_code": str(postal_code)},
            "packages": [{"weight": 1000, "length": 30, "width": 20, "height": 8}],
        }
        result = self._request_json(self.CALC_URL, method="POST", data=payload, headers={"Authorization": f"Bearer {self.token()}", "Content-Type": "application/json"})
        base_price = result.get("total_sum") or result.get("delivery_sum")
        if base_price is None:
            raise ValueError("Некорректный ответ СДЭК")
        delivery_min = (result.get("delivery_date_range") or {}).get("min")
        days = int(result.get("calendar_min") or 0)
        if delivery_min:
            days = max(0, (datetime.strptime(delivery_min, "%Y-%m-%d").date() - date.today()).days)
        return {"price": round(float(base_price) + self.settings.CDEK_FINAL_MARKUP), "days": days}

    def pvz(self, postal_code: str) -> list[dict[str, str]]:
        if not postal_code:
            raise ValueError("postalCode обязателен")
        query = urlencode({"postal_code": postal_code, "type": "PVZ", "lang": "rus"})
        data = self._request_json(f"{self.PVZ_URL}?{query}", headers={"Authorization": f"Bearer {self.token()}"})
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