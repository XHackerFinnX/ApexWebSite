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
from uuid import UUID

from store.application.ports import DeliveryError


CDEKError = DeliveryError


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
        errors = payload.get("errors") or [
            error
            for request in payload.get("requests", [])
            for error in request.get("errors", [])
        ]
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

    def _directory(self, path, config, token=None):
        key = ("directory", self._key(config), path)
        with self._lock:
            cached = self._cache.get(key)
        if token is None and cached and time.monotonic() - cached[0] < 300:
            return cached[1]
        result = (
            self._authorized(path, config)
            if token is None
            else self._request_json(
                self._url(path, config), headers={"Authorization": "Bearer " + token}
            )
        )
        with self._lock:
            if len(self._cache) > 256:
                self._cache.clear()
            self._cache[key] = (time.monotonic(), result)
        return result

    def sender_cities(self, config, query="", *, page=0, city_code=0, token=None):
        query = str(query or "").strip()[:80]
        page, city_code = int(page or 0), int(city_code or 0)
        if not 0 <= page <= 1000 or city_code < 0:
            raise ValueError("Некорректная страница или код города СДЭК")
        params = {"country_codes": "RU", "size": 20, "page": page}
        if city_code:
            params["code"] = city_code
        elif re.fullmatch(r"\d{6}", query):
            params["postal_code"] = query
        elif query:
            params = {"name": query, "country_code": "RU"}
        suggest = "name" in params
        path = (
            "location/suggest/cities?" if suggest else "location/cities?"
        ) + urlencode(params)
        data = self._directory(path, config, token)
        if not isinstance(data, list):
            raise CDEKError("Не удалось получить города СДЭК")
        items = [
            {
                "code": int(city["code"]),
                "name": str(city.get("city") or city.get("full_name") or ""),
                "fullName": str(
                    city.get("full_name")
                    or ", ".join(
                        filter(
                            None,
                            [city.get("city"), city.get("region"), city.get("country")],
                        )
                    )
                ),
            }
            for city in data
            if city.get("code") and (not city_code or int(city["code"]) == city_code)
        ]
        return {
            "items": items,
            "page": page,
            "has_more": not suggest and not city_code and len(data) == 20,
        }

    def sender_offices(self, config, city_code, *, token=None):
        city_code = int(city_code or 0)
        if city_code < 1:
            raise ValueError("Сначала выберите город отправителя из списка СДЭК")
        data = self._directory(
            "deliverypoints?"
            + urlencode(
                {
                    "city_code": city_code,
                    "country_code": "RU",
                    "type": "PVZ",
                    "is_reception": "true",
                    "lang": "rus",
                    "size": 1000,
                }
            ),
            config,
            token,
        )
        if not isinstance(data, list):
            raise CDEKError("Не удалось получить офисы отправления СДЭК")
        return [
            {
                "code": str(point["code"]),
                "name": str(point.get("name") or point["code"]),
                "address": str(
                    (point.get("location") or {}).get("address_full")
                    or (point.get("location") or {}).get("address")
                    or ""
                ),
                "workTime": str(point.get("work_time") or ""),
            }
            for point in data
            if point.get("code")
            and point.get("is_reception") in (True, "true", "1")
            and point.get("status", "ACTIVE") == "ACTIVE"
            and int((point.get("location") or {}).get("city_code") or city_code)
            == city_code
        ]

    def test_configuration(self, config):
        token = self._token_for(config, cache=False)
        cities = self.sender_cities(
            config, city_code=config.get("sender_city", 0), token=token
        )["items"]
        if not cities:
            raise CDEKError(
                "Город отправителя не найден в справочнике СДЭК. Выберите город из списка; почтовый индекс не является кодом города"
            )
        checks = {"authorization": True}
        if config.get("sender_office"):
            offices = self.sender_offices(config, cities[0]["code"], token=token)
            if not any(office["code"] == config["sender_office"] for office in offices):
                raise CDEKError(
                    "Офис отправителя СДЭК не найден в указанном городе или не принимает отправления"
                )
            checks["sender_office"] = True
        # Validate on an intercity route: the store tariff may not serve delivery
        # within the sender's own city. Never interpret a postcode as a city code.
        destination = {"code": 270 if cities[0]["code"] == 44 else 44}
        payload = self._calculation_payload(config, destination)
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
        result = self._request_json(
            self._url("calculator/tariff", config),
            method="POST",
            data=payload,
            headers=headers,
        )
        if result.get("total_sum") is None and result.get("delivery_sum") is None:
            raise CDEKError("Тест СДЭК не вернул стоимость доставки")
        checks["calculation"] = True
        if config.get("sender_office"):
            tariffs = self._request_json(
                self._url("calculator/tarifflist", config),
                method="POST",
                data=payload,
                headers=headers,
            )
            selected = next(
                (
                    tariff
                    for tariff in tariffs.get("tariff_codes", [])
                    if str(tariff.get("tariff_code")) == str(config["tariff_code"])
                ),
                None,
            )
            if not selected or str(selected.get("delivery_mode")) != "4":
                raise CDEKError(
                    "Для доставки витрины в ПВЗ выберите доступный тариф СДЭК «склад–склад»"
                )
            checks["tariff_mode"] = True
        return checks

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
        elif items:
            fallback = max(
                1, int(config["weight"]) // sum(int(item["quantity"]) for item in items)
            )
            packages[0]["weight"] = max(
                packages[0]["weight"],
                sum(
                    int(item.get("weight") or fallback) * int(item["quantity"])
                    for item in items
                ),
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
        if config.get("sender_office"):
            result["shipment_point"] = str(config["sender_office"])
        if str(config.get("insurance", "false")).lower() == "true" and order_total > 0:
            result["services"] = [{"code": "INSURANCE", "parameter": str(order_total)}]
        return result

    def order_payload(self, config, order):
        """Build a prepaid warehouse-to-PVZ shipment from persisted order data."""
        destination = order.get("delivery_details") or {}
        point = str((destination.get("pvz") or {}).get("code") or "")
        if destination.get("type") not in {"pvz", "cdek"} or not point:
            raise ValueError("Заказ должен содержать выбранный ПВЗ СДЭК")
        if not config.get("sender_office"):
            raise ValueError("Укажите офис отправителя в настройках СДЭК")
        contact = order.get("customer_details") or {}
        name = str(contact.get("recipient") or "").strip()
        phone = re.sub(r"\D", "", str(contact.get("phone") or ""))
        if len(name.split()) < 2 or not 10 <= len(phone) <= 15:
            raise ValueError("В заказе отсутствуют ФИО или телефон получателя")
        items = order.get("items") or []
        if not items:
            raise ValueError("В заказе нет товаров")
        calculation = self._calculation_payload(config, {}, items)
        packages = []
        groups = (
            [[item] for item in items]
            if config.get("dimension_type") == "product"
            else [items]
        )
        for index, (dimensions, group) in enumerate(
            zip(calculation["packages"], groups), 1
        ):
            products = []
            for item in group:
                quantity = int(item["quantity"])
                # Allocate remaining kopecks to a separate line, as in the receipt.
                cents, remainder = divmod(
                    int(Decimal(str(item["line_total"])) * 100), quantity
                )
                for unit, amount in (
                    (cents, quantity - remainder),
                    (cents + 1, remainder),
                ):
                    if amount:
                        products.append(
                            {
                                "name": str(item["name"])[:255],
                                "ware_key": str(
                                    item.get("sku")
                                    or f"{item['product_id']}-{item.get('color', '')}-{item.get('size', '')}"
                                )[:255],
                                "payment": {"value": 0},
                                "cost": float(Decimal(unit) / 100),
                                "weight": max(
                                    1,
                                    int(
                                        item.get("weight")
                                        or int(config["weight"])
                                        // sum(int(i["quantity"]) for i in group)
                                    ),
                                ),
                                "amount": amount,
                            }
                        )
            packages.append({**dimensions, "number": str(index), "items": products})
        if sum(len(p["items"]) for p in packages) > 126:
            raise ValueError("В отправлении СДЭК допускается до 126 товарных позиций")
        return {
            "type": int(config["contract_type"]),
            "number": "APEX-" + UUID(str(order["id"])).hex,
            "tariff_code": int(config["tariff_code"]),
            "shipment_point": str(config["sender_office"]),
            "delivery_point": point,
            "recipient": {
                "name": name[:255],
                "phones": [{"number": "+" + phone}],
                "email": str(order["customer_email"]),
            },
            "delivery_recipient_cost": {"value": 0},
            "comment": str(contact.get("comment") or "")[:255],
            "packages": packages,
        }

    @staticmethod
    def order_result(payload):
        if not isinstance(payload, dict) or not isinstance(payload.get("entity"), dict):
            raise CDEKError("СДЭК не вернул информацию об отправлении. Уточните статус")
        entity = payload["entity"]
        try:
            external_id = str(UUID(str(entity["uuid"])))
        except (KeyError, ValueError, TypeError) as exc:
            raise CDEKError("СДЭК не вернул UUID отправления. Уточните статус") from exc
        requests = payload.get("requests") or []
        latest = (
            max(requests, key=lambda request: request.get("date_time", ""))
            if requests
            else {}
        )
        errors = latest.get("errors") or []
        statuses = entity.get("statuses") or []
        status = str((statuses[0] if statuses else {}).get("code") or "PROCESSING")
        if (latest.get("state") == "INVALID" or errors) and latest.get(
            "type"
        ) != "DELETE":
            status = "INVALID"
        elif latest.get("type") == "DELETE" and latest.get("state") in {
            "ACCEPTED",
            "WAITING",
            "PROCESSING",
        }:
            status = "CANCEL_PENDING"
        return {
            "external_id": external_id,
            "status": status,
            "tracking_number": str(entity.get("cdek_number") or ""),
            "error": "; ".join(
                str(e.get("message") or e.get("code") or "") for e in errors
            )[:1000],
        }

    def register_order(self, config, payload):
        if payload["type"] == 2:
            payload = {key: value for key, value in payload.items() if key != "number"}
        return self.order_result(self._authorized("orders", config, "POST", payload))

    def order_info(self, config, *, external_id="", number=""):
        path = (
            "orders/" + str(UUID(str(external_id)))
            if external_id
            else "orders?" + urlencode({"im_number": number})
        )
        return self.order_result(self._authorized(path, config))

    def cancel_order(self, config, external_id):
        return self.order_result(
            self._authorized("orders/" + str(UUID(str(external_id))), config, "DELETE")
        )

    @staticmethod
    def _destination(postal_code="", city_code=0):
        if city_code:
            if int(city_code) < 1:
                raise ValueError("Некорректный код города")
            return {"code": int(city_code)}
        if not re.fullmatch(r"\d{6}", str(postal_code)):
            raise ValueError("Укажите город или шестизначный почтовый индекс")
        return {"postal_code": str(postal_code)}

    def calculate(
        self,
        postal_code="",
        order_total=0,
        *,
        city_code=0,
        items=None,
        delivery_point="",
    ):
        config = self._config()
        payload = self._calculation_payload(
            config, self._destination(postal_code, city_code), items, order_total
        )
        if delivery_point:
            payload["delivery_point"] = str(delivery_point)
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
            "deliverypoints?"
            + urlencode({**query, "type": "PVZ", "is_handout": "true", "lang": "rus"}),
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
            if p.get("is_handout") is not False
            and p.get("status", "ACTIVE") == "ACTIVE"
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
