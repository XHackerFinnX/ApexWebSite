import base64
import binascii
import gzip
import hashlib
import hmac
import ipaddress
import json
import logging
import mimetypes
import threading
import time
from dataclasses import asdict
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from uuid import UUID

import psycopg
from psycopg_pool import PoolTimeout

from store.infrastructure.media import MediaStorageError
from store.infrastructure.security import RateLimiter
from store.infrastructure.tbank import TBankError
from store.application.account_security import AccountSecurity, SecurityError
from store.presentation.commerce_web import CommerceHandler

logger = logging.getLogger(__name__)


class Encoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        if isinstance(o, (date, datetime)):
            return o.isoformat()
        if isinstance(o, UUID):
            return str(o)
        if isinstance(o, tuple):
            return list(o)
        return super().default(o)


class RequestTooLarge(ValueError):
    """Raised before parsing a request whose declared body is too large."""


class WebApp:
    def __init__(
        self,
        catalog,
        integrations,
        checkout,
        repo,
        limiter,
        delivery=None,
        admin_username="admin",
        admin_password="admin",
        trust_proxy_headers=False,
        secure_cookies=False,
        security=None,
        trusted_proxy_cidrs="127.0.0.0/8,::1/128,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16",
    ):
        (
            self.catalog,
            self.integrations,
            self.checkout,
            self.repo,
            self.limiter,
            self.delivery,
        ) = (
            catalog,
            integrations,
            checkout,
            repo,
            limiter,
            delivery,
        )
        self.admin_username = admin_username
        self.admin_password = admin_password
        self.trust_proxy_headers = trust_proxy_headers
        self.secure_cookies = secure_cookies
        self.security = security or AccountSecurity(repo)
        self.trusted_proxies = [
            ipaddress.ip_network(value.strip())
            for value in trusted_proxy_cidrs.split(",")
            if value.strip()
        ]
        self.auth_limiter = RateLimiter(12, 600)
        self.cache = {}
        self.cache_lock = threading.Lock()

    def _session_token(self, expires):
        payload = str(expires)
        signature = hmac.new(
            self.admin_password.encode(), payload.encode(), hashlib.sha256
        ).hexdigest()
        return base64.urlsafe_b64encode(f"{payload}.{signature}".encode()).decode()

    def valid_session(self, token):
        try:
            payload, signature = (
                base64.urlsafe_b64decode(token.encode()).decode().split(".", 1)
            )
            expected = hmac.new(
                self.admin_password.encode(), payload.encode(), hashlib.sha256
            ).hexdigest()
            return int(payload) > time.time() and hmac.compare_digest(
                signature, expected
            )
        except (ValueError, TypeError, binascii.Error):
            return False

    def handler(self):
        app = self
        from http.server import BaseHTTPRequestHandler

        class Handler(CommerceHandler, BaseHTTPRequestHandler):
            application = app
            protocol_version = "HTTP/1.1"

            def setup(self):
                super().setup()
                self.connection.settimeout(20)

            def handle(self):
                try:
                    super().handle()
                except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
                    self.close_connection = True
                    logger.debug(
                        "Client closed HTTP connection from %s", self.address_string()
                    )

            def _send(
                self,
                status=200,
                data=None,
                ctype="application/json; charset=utf-8",
                headers=None,
            ):
                body = (
                    json.dumps(
                        data, cls=Encoder, ensure_ascii=False, separators=(",", ":")
                    ).encode()
                    if ctype.startswith("application/json")
                    else data
                )
                headers = dict(headers or {})
                if self.command in {"POST", "PUT", "DELETE"} and not getattr(
                    self, "_request_body_read", False
                ):
                    self.close_connection = True
                    headers["Connection"] = "close"
                headers.setdefault("Cache-Control", "no-store")
                if (
                    self.command == "GET"
                    and status == 200
                    and headers["Cache-Control"] != "no-store"
                ):
                    etag = 'W/"' + hashlib.sha256(body).hexdigest()[:24] + '"'
                    headers["ETag"] = etag
                    if self.headers.get("If-None-Match") == etag:
                        status, body = 304, b""
                if (
                    len(body) > 1024
                    and "gzip" in self.headers.get("Accept-Encoding", "")
                    and "gzip;q=0"
                    not in self.headers.get("Accept-Encoding", "").replace(" ", "")
                    and not ctype.startswith(("image/", "font/"))
                ):
                    body = gzip.compress(body, compresslevel=5)
                    headers["Content-Encoding"] = "gzip"
                headers["Vary"] = "Accept-Encoding"
                try:
                    self.send_response(status)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Content-Length", str(len(body)))
                    self.send_header("X-Content-Type-Options", "nosniff")
                    self.send_header("X-Frame-Options", "DENY")
                    self.send_header(
                        "Referrer-Policy", "strict-origin-when-cross-origin"
                    )
                    for key, value in (headers or {}).items():
                        self.send_header(key, value)
                    self.send_header(
                        "Content-Security-Policy",
                        "default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; img-src 'self' https: data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
                    )
                    self.end_headers()
                    self.wfile.write(body)
                except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
                    # Browsers can cancel an in-flight request during navigation or
                    # refresh. The response can no longer be delivered, so do not
                    # attempt to send a second error response on the closed socket.
                    self.close_connection = True
                    logger.debug("Client disconnected while sending %s", self.path)

            def _body(self):
                length = int(self.headers.get("Content-Length", "0"))
                maximum = (
                    25_000_000
                    if self.path.startswith(("/api/admin/", "/api/account/reviews"))
                    else 150_000
                )
                if length < 0 or length > maximum:
                    raise RequestTooLarge(
                        "Фотографии слишком большие: размер запроса превышает 25 МБ"
                        if maximum == 25_000_000
                        else "Размер запроса превышает допустимый лимит"
                    )
                data = json.loads(self.rfile.read(length) or b"{}")
                self._request_body_read = True
                if not isinstance(data, dict):
                    raise ValueError("Ожидается JSON-объект")
                return data

            def _serve_static(self, filename):
                """Serve a file only from the application's bundled static directory."""
                root = (Path(__file__).parent / "static").resolve()
                target = (root / filename).resolve()
                if not target.is_relative_to(root) or not target.is_file():
                    return self._send(404, {"error": "Не найдено"})
                return self._send(
                    200,
                    target.read_bytes(),
                    mimetypes.guess_type(target.name)[0] or "application/octet-stream",
                    headers={
                        "Cache-Control": "no-cache"
                        if target.suffix == ".html"
                        else "public, max-age=300"
                    },
                )

            def _authenticated(self):
                cookies = {}
                for item in self.headers.get("Cookie", "").split(";"):
                    if "=" in item:
                        key, value = item.strip().split("=", 1)
                        cookies[key] = value
                return app.valid_session(cookies.get("apex_admin", ""))

            def _redirect(self, location, cookie=None):
                self.send_response(303)
                self.send_header("Location", location)
                if cookie:
                    self.send_header("Set-Cookie", cookie)
                self.send_header("Content-Length", "0")
                self.end_headers()

            def _client_ip(self):
                peer = ipaddress.ip_address(self.client_address[0])

                def trusted(address):
                    return any(address in network for network in app.trusted_proxies)

                if app.trust_proxy_headers and trusted(peer):
                    try:
                        chain = [
                            ipaddress.ip_address(value.strip())
                            for value in self.headers.get("X-Forwarded-For", "").split(
                                ","
                            )
                        ]
                        for address in reversed(chain):
                            peer = address
                            if not trusted(address):
                                break
                    except ValueError:
                        return self.client_address[0]
                return str(peer)

            def _route(self):
                self._request_body_read = False
                client_ip = self._client_ip()
                bank_notification = (
                    urlparse(self.path).path == "/api/payments/tbank/notification"
                )
                if (
                    self.path.startswith("/api/")
                    and not bank_notification
                    and not app.limiter.allow(client_ip, time.monotonic())
                ):
                    return self._send(429, {"error": "Слишком много запросов"})
                parsed = urlparse(self.path)
                path = parsed.path
                try:
                    if self.command in {"POST", "PUT", "DELETE"}:
                        if (
                            not bank_notification
                            and self.headers.get("Sec-Fetch-Site") == "cross-site"
                        ):
                            return self._send(
                                403, {"error": "Запрос с другого сайта запрещён"}
                            )
                        origin = self.headers.get("Origin")
                        if (
                            not bank_notification
                            and origin
                            and urlparse(origin).netloc != self.headers.get("Host")
                        ):
                            return self._send(
                                403, {"error": "Запрос с другого сайта запрещён"}
                            )
                        if path.startswith(
                            ("/api/admin/", "/api/checkout/", "/api/payments/")
                        ):
                            with app.cache_lock:
                                app.cache.clear()
                    if self.command == "GET" and path == "/health":
                        return self._send(data={"status": "ok"})
                    if self.command == "GET" and path == "/ready":
                        app.repo.check_connection()
                        return self._send(data={"status": "ready"})
                    # Keep the entry point explicit: it must never fall through to
                    # generic path-to-file handling (or depend on a trailing slash).
                    if self.command == "GET" and path in {"/admin", "/admin/"}:
                        page = (
                            "admin.html"
                            if self._authenticated()
                            else "admin-login.html"
                        )
                        return self._serve_static(page)
                    if self.command == "GET" and path == "/favicon.ico":
                        return self._send(204, b"", "image/x-icon")
                    if self.command == "POST" and path == "/api/admin/login":
                        if not app.auth_limiter.allow(
                            "admin:" + client_ip, time.monotonic()
                        ):
                            return self._send(
                                429, {"error": "Слишком много попыток входа"}
                            )
                        credentials = self._body()
                        valid = hmac.compare_digest(
                            str(credentials.get("username", "")), app.admin_username
                        ) and hmac.compare_digest(
                            str(credentials.get("password", "")), app.admin_password
                        )
                        if not valid:
                            return self._send(
                                401, {"error": "Неверный логин или пароль"}
                            )
                        token = app._session_token(int(time.time()) + 8 * 60 * 60)
                        return self._send(
                            data={"ok": True},
                            headers={
                                "Set-Cookie": f"apex_admin={token}; Path=/; "
                                "HttpOnly; SameSite=Strict; Max-Age=28800"
                                + ("; Secure" if app.secure_cookies else "")
                            },
                        )
                    if self.command == "POST" and path == "/api/admin/logout":
                        return self._send(
                            data={"ok": True},
                            headers={
                                "Set-Cookie": "apex_admin=; Path=/; HttpOnly; "
                                "SameSite=Strict; Max-Age=0"
                            },
                        )
                    if path.startswith("/api/admin/") and not self._authenticated():
                        return self._send(401, {"error": "Требуется вход"})
                    extra = self._commerce_route(path, parsed)
                    if extra is not False:
                        return extra
                    if self.command == "GET" and path == "/admin.html":
                        return self._redirect("/admin")
                    if self.command == "GET" and path == "/api/products":
                        return self._send(data=[asdict(x) for x in app.catalog.list()])
                    if self.command == "GET" and path == "/api/reviews":
                        query = parse_qs(parsed.query)
                        return self._send(
                            data=app.repo.list_reviews(
                                query.get("limit", [10])[0], query.get("offset", [0])[0]
                            )
                        )
                    if self.command == "GET" and path == "/api/admin/products":
                        return self._send(
                            data=[asdict(x) for x in app.repo.list_products(True)]
                        )
                    if self.command == "GET" and path == "/api/admin/reviews":
                        return self._send(data=app.repo.list_admin_reviews())
                    if self.command == "GET" and path == "/api/admin/integrations":
                        return self._send(
                            data=[asdict(x) for x in app.integrations.list()]
                        )
                    if self.command == "GET" and path == "/api/checkout/integrations":
                        return self._send(
                            data=[
                                {
                                    "provider": x.provider,
                                    "kind": x.kind,
                                    "name": x.public_config.get("name", x.provider),
                                }
                                for x in app.integrations.list()
                                if x.enabled
                            ]
                        )
                    if self.command == "GET" and path == "/api/admin/categories":
                        return self._send(data=app.repo.list_categories())
                    if self.command == "POST" and path == "/api/admin/categories":
                        category = app.repo.save_category(
                            str(self._body().get("name", ""))
                        )
                        return self._send(201, category)
                    if self.command == "POST" and path == "/api/admin/products":
                        data = self._body()
                        data.pop("id", None)
                        return self._send(201, asdict(app.catalog.save(data)))
                    if self.command == "POST" and path == "/api/admin/reviews":
                        return self._send(201, app.repo.save_review(self._body()))
                    if self.command == "POST" and path == "/api/admin/integrations":
                        return self._send(data=app.integrations.configure(self._body()))
                    if self.command == "POST" and path == "/api/delivery/calculate":
                        if not app.delivery:
                            raise ValueError("Доставка не настроена")
                        delivery_request = self._body()
                        quote = app.checkout.quote(
                            {"items": delivery_request.get("items", [])}
                        )
                        return self._send(
                            data=app.delivery.calculate(
                                str(delivery_request.get("postal_code", "")),
                                float(quote["subtotal"]),
                                city_code=int(delivery_request.get("city_code") or 0),
                                items=quote["items"],
                            )
                        )
                    if self.command == "GET" and path == "/api/delivery/pvz":
                        if not app.delivery:
                            raise ValueError("Доставка не настроена")
                        postal_code = parse_qs(parsed.query).get("postalCode", [""])[0]
                        return self._send(
                            data=app.delivery.pvz(
                                postal_code,
                                city_code=int(
                                    parse_qs(parsed.query).get("city_code", [0])[0]
                                ),
                            )
                        )
                    if self.command == "POST" and path == "/api/checkout/captcha":
                        return self._send(
                            410,
                            {
                                "error": "Обновите страницу для новой проверки безопасности"
                            },
                        )
                    if self.command == "POST" and path == "/api/checkout/payment":
                        data = self._body()
                        app.security.limit("checkout:" + client_ip, 15, 900)
                        app.security.consume(
                            data.get("captcha_proof"),
                            "checkout",
                            data,
                            client_ip,
                            self._cookie("apex_guard"),
                            self.headers.get("User-Agent", ""),
                        )
                        return self._send(
                            201,
                            app.checkout.create_payment(data, self._customer()),
                        )
                    if (
                        self.command == "POST"
                        and path == "/api/payments/tbank/notification"
                    ):
                        app.checkout.accept_tbank_notification(self._body())
                        return self._send(200, b"OK", "text/plain; charset=utf-8")
                    if self.command == "GET" and path == "/api/checkout/order":
                        order_id = parse_qs(parsed.query).get("order_id", [""])[0]
                        order_id = str(UUID(order_id))
                        order = app.repo.get_order(order_id)
                        if order:
                            app.repo.request_payment_sync(order_id)
                        return (
                            self._send(200, order)
                            if order
                            else self._send(404, {"error": "Заказ не найден"})
                        )
                    parts = path.strip("/").split("/")
                    if (
                        self.command == "GET"
                        and len(parts) == 4
                        and parts[:2] == ["api", "reviews"]
                        and parts[3] == "images"
                    ):
                        return self._send(data=app.repo.review_images(int(parts[2])))
                    if (
                        self.command == "PUT"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "products"]
                    ):
                        data = self._body()
                        data["id"] = int(parts[3])
                        if not app.repo.get_product(data["id"]):
                            return self._send(404, {"error": "Товар не найден"})
                        return self._send(data=asdict(app.catalog.save(data)))
                    if (
                        self.command == "POST"
                        and len(parts) == 4
                        and parts[:2] == ["api", "products"]
                        and parts[3] in {"view", "cart"}
                    ):
                        app.catalog.record(
                            int(parts[2]),
                            "views" if parts[3] == "view" else "cart_adds",
                        )
                        return self._send(data={"ok": True})
                    if (
                        self.command == "PUT"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "integrations"]
                    ):
                        data = self._body()
                        data["provider"] = parts[3]
                        return self._send(
                            data=app.integrations.configure(data, update=True)
                        )
                    if (
                        self.command == "DELETE"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "products"]
                    ):
                        return self._send(
                            data={"ok": app.repo.delete_product(int(parts[3]))}
                        )
                    if (
                        self.command == "DELETE"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "integrations"]
                    ):
                        if not app.integrations.delete(parts[3]):
                            return self._send(404, {"error": "Интеграция не найдена"})
                        return self._send(data={"ok": True})
                    if (
                        self.command == "DELETE"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "categories"]
                    ):
                        deleted = app.repo.delete_category(int(parts[3]))
                        if not deleted:
                            return self._send(404, {"error": "Категория не найдена"})
                        return self._send(data={"ok": True})
                    if self.command == "GET":
                        file = (
                            "index.html"
                            if path == "/"
                            else "reviews.html"
                            if path in {"/reviews", "/reviews/"}
                            else path.lstrip("/")
                        )
                        return self._serve_static(file)
                    return self._send(404, {"error": "Не найдено"})
                except RequestTooLarge as e:
                    # Do not try to reuse a connection containing an unread body.
                    self.close_connection = True
                    return self._send(
                        413, {"error": str(e)}, headers={"Connection": "close"}
                    )
                except SecurityError as e:
                    return self._send(
                        e.status,
                        {
                            "error": str(e),
                            "captcha_required": e.captcha_required,
                            "retry_after": e.retry_after,
                        },
                        headers={"Retry-After": str(e.retry_after)}
                        if e.retry_after
                        else None,
                    )
                except (ValueError, LookupError, KeyError) as e:
                    return self._send(400, {"error": str(e)})
                except TBankError as e:
                    logger.warning("T-Bank payment request failed: %s", e)
                    message = (
                        str(e)
                        if path.startswith("/api/admin/")
                        or e.ambiguous
                        or getattr(e, "retry_checkout", False)
                        else "Не удалось открыть оплату. Повторите попытку позже или свяжитесь с магазином."
                    )
                    return self._send(
                        502,
                        {
                            "error": message,
                            "retry_checkout": bool(getattr(e, "retry_checkout", False)),
                        },
                    )
                except MediaStorageError as e:
                    logger.warning(
                        "Media storage unavailable for %s %s", self.command, path
                    )
                    return self._send(
                        503, {"error": str(e)}, headers={"Retry-After": "2"}
                    )
                except (psycopg.OperationalError, PoolTimeout):
                    logger.warning(
                        "Database connection unavailable for %s %s", self.command, path
                    )
                    return self._send(
                        503,
                        {
                            "error": "База данных временно недоступна. Попробуйте ещё раз через несколько секунд."
                        },
                        headers={"Retry-After": "2"},
                    )
                except Exception:
                    logger.exception(
                        "Unhandled error while processing %s %s", self.command, path
                    )
                    return self._send(
                        500,
                        {
                            "error": "Внутренняя ошибка сервера. Попробуйте повторить запрос"
                        },
                    )

            do_GET = _route
            do_POST = _route
            do_PUT = _route
            do_DELETE = _route

            def log_message(self, fmt, *args):
                print("http", self.address_string(), fmt % args)

            def log_error(self, fmt, *args):
                # Browsers leave keep-alive/preconnect sockets idle. Closing
                # one after its timeout is normal and isn't a failed API call.
                if fmt.startswith("Request timed out:"):
                    logger.debug(
                        "Idle HTTP connection closed from %s", self.address_string()
                    )
                    return
                super().log_error(fmt, *args)

        return Handler
