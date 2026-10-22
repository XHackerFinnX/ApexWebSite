import hashlib
import json
import math
import re
import threading
import time
from datetime import datetime, timedelta, timezone
from decimal import ROUND_HALF_UP, Decimal
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


class CDEKError(ValueError):
    def __init__(self, message, code=None):
        super().__init__(message)
        self.code = code


class CDEKDelivery:
    BASE_URLS = {
        "test": "https://api.edu.cdek.ru/v2",
        "production": "https://api.cdek.ru/v2",
    }
    TOKEN_URL = BASE_URLS["production"] + "/oauth/token"
    CALC_URL = BASE_URLS["production"] + "/calculator/tariff"
    PVZ_URL = BASE_URLS["production"] + "/deliverypoints"

    def __init__(self, repository):
        self.repository = repository
        self._token, self._token_key, self._token_expire = "", "", 0
        self._lock = threading.RLock()
        self._cache = {}

    def _config(self):
        config = self.repository.get_integration_config("cdek")
        if not config:
            raise CDEKError("Интеграция СДЭК не подключена")
        return config

    def _url(self, path, config):
        environment = str(config.get("environment", "production"))
        if environment not in self.BASE_URLS:
            raise ValueError("Неизвестная среда СДЭК")
        return self.BASE_URLS[environment] + "/" + path

    @staticmethod
    def _error_message(payload):
        if not isinstance(payload, dict):
            return "СДЭК отклонил запрос без пояснения"
        errors = payload.get("errors") or []
        if isinstance(errors, dict):
            errors = [errors]
        return (
            "; ".join(
                str(e.get("message", ""))
                for e in errors
                if isinstance(e, dict) and e.get("message")
            )
            or str(
                payload.get("error_description")
                or payload.get("message")
                or "СДЭК отклонил запрос без пояснения"
            )
        )[:1000]

    def _request_json(self, url, *, method="GET", data=None, headers=None):
        request = Request(
            url,
            data=None if data is None else json.dumps(data).encode(),
            method=method,
            headers=headers or {},
        )
        return self._open(request)

    def _open(self, request):
        try:
            with urlopen(request, timeout=10) as response:
                payload = json.loads(response.read().decode("utf-8"))
            if isinstance(payload, dict) and (
                payload.get("errors") or payload.get("error")
            ):
                raise CDEKError(self._error_message(payload))
            return payload
        except HTTPError as exc:
            try:
                body = json.loads(exc.read().decode())
            except (ValueError, UnicodeDecodeError):
                body = None
            raise CDEKError(
                f"Ошибка СДЭК ({exc.code}): {self._error_message(body)}", exc.code
            ) from exc
        except (URLError, TimeoutError) as exc:
            raise CDEKError(
                "Сервис СДЭК временно недоступен. Повторите расчёт"
            ) from exc
        except (json.JSONDecodeError, UnicodeDecodeError) as exc:
            raise CDEKError("СДЭК вернул некорректный ответ") from exc

    @staticmethod
    def _key(config):
        return hashlib.sha256(
            json.dumps(config, sort_keys=True, default=str).encode()
        ).hexdigest()

    def _token_for(self, config, *, cache=True):
        with self._lock:
            key = self._key(config)
            if (
                cache
                and self._token
                and self._token_key == key
                and self._token_expire > time.time()
            ):
                return self._token
            if not config.get("client_id") or not config.get("client_secret"):
                raise ValueError("Заполните ID и Secret СДЭК")
            payload = urlencode(
                {
                    "grant_type": "client_credentials",
                    "client_id": config["client_id"],
                    "client_secret": config["client_secret"],
                }
            ).encode()
            data = self._open(
                Request(
                    self._url("oauth/token", config),
                    data=payload,
                    method="POST",
                    headers={"Content-Type": "application/x-www-form-urlencoded"},
                )
            )
            token = str(data.get("access_token", ""))
            if not token:
                raise CDEKError("СДЭК не вернул токен доступа")
            if cache:
                self._token, self._token_key = token, key
                self._token_expire = time.time() + max(
                    1, int(data.get("expires_in", 3600)) - 60
                )
            return token

    def token(self):
        return self._token_for(self._config())

    def invalidate_token(self):
        with self._lock:
            self._token, self._token_expire = "", 0
            self._cache.clear()

    def _authorized(self, path, config, method="GET", data=None):
        for attempt in range(2):
            token = self._token_for(config)
            try:
                return self._request_json(
                    self._url(path, config),
                    method=method,
                    data=data,
                    headers={
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                )
            except CDEKError as exc:
                if exc.code != 401 or attempt:
                    raise
                self.invalidate_token()

    def test_configuration(self, config):
        token = self._token_for(config, cache=False)
        result = self._request_json(
            self._url("calculator/tariff", config),
            method="POST",
            data=self._calculation_payload(
                config, {"code": int(config["sender_city"])}
            ),
            headers={
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        )
        if result.get("total_sum") is None and result.get("delivery_sum") is None:
            raise CDEKError("Тест СДЭК не вернул стоимость доставки")
        return {"authorization": True, "calculation": True}

    def _calculation_payload(self, config, destination, items=None, order_total=0):
        dispatch = datetime.now(timezone(timedelta(hours=3))) + timedelta(
            days=int(config["dispatch_days"])
        )
        packages = [
            {
                "weight": int(config["weight"]),
                **{
                    k: max(1, math.ceil(int(config[k]) / 10))
                    for k in ("length", "width", "height")
                },
            }
        ]
        if config.get("dimension_type") == "product" and items:
            packages = []
            for item in items:
                dimensions = re.split(
                    r"[xх×*\s]+", str(item.get("dimensions", "")).strip()
                )
                dims = (
                    [int(v) for v in dimensions]
                    if len(dimensions) == 3
                    and all(v.isdecimal() and int(v) > 0 for v in dimensions)
                    else [int(config[k]) for k in ("length", "width", "height")]
                )
                quantity = int(item["quantity"])
                packages.append(
                    {
                        "weight": int(item.get("weight") or config["weight"])
                        * quantity,
                        "length": math.ceil(dims[0] / 10),
                        "width": math.ceil(dims[1] / 10),
                        "height": math.ceil(dims[2] * quantity / 10),
                    }
                )
        result = {
            "date": dispatch.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "type": int(config["contract_type"]),
            "currency": 1,
            "lang": "rus",
            "tariff_code": int(config["tariff_code"]),
            "from_location": {"code": int(config["sender_city"])},
            "to_location": destination,
            "packages": packages,
        }
        if str(config.get("insurance", "false")).lower() == "true" and order_total > 0:
            result["services"] = [{"code": "INSURANCE", "parameter": str(order_total)}]
        return result

    @staticmethod
    def _destination(postal_code="", city_code=0):
        if city_code:
            if int(city_code) < 1:
                raise ValueError("Некорректный код города")
            return {"code": int(city_code)}
        if not re.fullmatch(r"\d{6}", str(postal_code)):
            raise ValueError("Укажите город или шестизначный почтовый индекс")
        return {"postal_code": str(postal_code)}

    def calculate(self, postal_code="", order_total=0, *, city_code=0, items=None):
        config = self._config()
        payload = self._calculation_payload(
            config, self._destination(postal_code, city_code), items, order_total
        )
        # Exclude seconds from cache identity: the dispatch date is sufficient.
        cache_payload = {**payload, "date": payload["date"][:10]}
        key = (
            "tariff",
            self._key(config),
            json.dumps(cache_payload, sort_keys=True),
            str(order_total),
        )
        with self._lock:
            cached = self._cache.get(key)
        if cached and time.monotonic() - cached[0] < 60:
            return cached[1]
        result = self._authorized("calculator/tariff", config, "POST", payload)
        base = result.get("total_sum", result.get("delivery_sum"))
        if base is None:
            raise CDEKError("СДЭК не вернул стоимость доставки")
        price, markup = Decimal(str(base)), Decimal(str(config.get("markup", 0)))
        price += (
            price * markup / 100 if config.get("markup_type") == "percent" else markup
        )
        threshold = Decimal(str(config.get("free_delivery_from", 0)))
        if config.get("cost_type") == "free" or (
            threshold > 0 and Decimal(str(order_total)) >= threshold
        ):
            price = Decimal(0)
        if not price.is_finite() or price < 0:
            raise CDEKError("Некорректная стоимость доставки")
        dispatch_days = int(config["dispatch_days"])
        days = (
            int(result.get("period_min", result.get("calendar_min", 0))) + dispatch_days
        )
        response = {
            "price": float(price.quantize(Decimal(".01"), rounding=ROUND_HALF_UP)),
            "days": days,
            "days_max": int(
                result.get(
                    "period_max", result.get("calendar_max", days - dispatch_days)
                )
            )
            + dispatch_days,
            "free_from": float(threshold),
        }
        with self._lock:
            if len(self._cache) > 256:
                self._cache.clear()
            self._cache[key] = (time.monotonic(), response)
        return response

    def pvz(self, postal_code="", *, city_code=0):
        config = self._config()
        destination = self._destination(postal_code, city_code)
        query = (
            {"city_code": destination["code"]} if "code" in destination else destination
        )
        key = ("pvz", self._key(config), json.dumps(query))
        with self._lock:
            cached = self._cache.get(key)
        if cached and time.monotonic() - cached[0] < 300:
            return cached[1]
        data = self._authorized(
            "deliverypoints?" + urlencode({**query, "type": "PVZ", "lang": "rus"}),
            config,
        )
        points = data if isinstance(data, list) else data.get("pvz", [])
        response = [
            {
                "code": str(p.get("code", "")),
                "name": str(p.get("name") or p.get("code") or "ПВЗ СДЭК"),
                "address": str(
                    (p.get("location") or {}).get("address") or p.get("address") or ""
                ),
                "workTime": str(p.get("work_time") or ""),
                "phone": str((p.get("phones") or [{}])[0].get("number", "")),
            }
            for p in points
        ]
        with self._lock:
            if len(self._cache) > 256:
                self._cache.clear()
            self._cache[key] = (time.monotonic(), response)
        return response

    def cities(self, query):
        query = str(query).strip()
        if len(query) < 2:
            return []
        data = self._authorized(
            "location/cities?"
            + urlencode({"city": query[:80], "country_codes": "RU", "size": 8}),
            self._config(),
        )
        if not isinstance(data, list):
            raise CDEKError("Не удалось получить города СДЭК")
        return [
            {
                "name": c["city"],
                "fullName": ", ".join(
                    filter(None, [c["city"], c.get("region"), c.get("country")])
                ),
                "code": c["code"],
                "postalCode": str(c.get("postal_codes", [""])[0])
                if c.get("postal_codes")
                else "",
            }
            for c in data[:8]
        ]
