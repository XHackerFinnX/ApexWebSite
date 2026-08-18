import json
import logging
import base64
import binascii
import hashlib
import hmac
import mimetypes
import time
from dataclasses import asdict
from decimal import Decimal
from pathlib import Path
from urllib.parse import parse_qs, urlparse


logger = logging.getLogger(__name__)

class Encoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
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
    ):
        self.catalog, self.integrations, self.checkout, self.repo, self.limiter, self.delivery = (
            catalog,
            integrations,
            checkout,
            repo,
            limiter,
            delivery,
        )
        self.admin_username = admin_username
        self.admin_password = admin_password

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
            return int(payload) > time.time() and hmac.compare_digest(signature, expected)
        except (ValueError, TypeError, binascii.Error):
            return False

    def handler(self):
        app = self
        from http.server import BaseHTTPRequestHandler

        class Handler(BaseHTTPRequestHandler):
            def _send(
                self, status=200, data=None, ctype="application/json; charset=utf-8", headers=None
            ):
                body = (
                    json.dumps(data, cls=Encoder, ensure_ascii=False).encode()
                    if ctype.startswith("application/json")
                    else data
                )
                try:
                    self.send_response(status)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Content-Length", str(len(body)))
                    self.send_header("X-Content-Type-Options", "nosniff")
                    self.send_header("X-Frame-Options", "DENY")
                    self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
                    for key, value in (headers or {}).items():
                        self.send_header(key, value)
                    self.send_header(
                        "Content-Security-Policy",
                        "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; img-src 'self' https: data:; connect-src 'self' https://geoserv.tildacdn.com",
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
                if length > 25_000_000:
                    raise RequestTooLarge(
                        "Фотографии слишком большие: размер запроса превышает 25 МБ"
                    )
                return json.loads(self.rfile.read(length) or b"{}")
            
            def _serve_static(self, filename):
                """Serve a file only from the application's bundled static directory."""
                root = (Path(__file__).parent / "static").resolve()
                target = (root / filename).resolve()
                if not target.is_relative_to(root) or not target.is_file():
                    return self._send(404, {"error": "Не найдено"})
                return self._send(
                    200,
                    target.read_bytes(),
                    mimetypes.guess_type(target.name)[0]
                    or "application/octet-stream",
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

            def _route(self):
                if not app.limiter.allow(self.client_address[0], time.monotonic()):
                    return self._send(429, {"error": "Слишком много запросов"})
                parsed = urlparse(self.path)
                path = parsed.path
                try:
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
                        credentials = self._body()
                        valid = hmac.compare_digest(
                            str(credentials.get("username", "")), app.admin_username
                        ) and hmac.compare_digest(
                            str(credentials.get("password", "")), app.admin_password
                        )
                        if not valid:
                            return self._send(401, {"error": "Неверный логин или пароль"})
                        token = app._session_token(int(time.time()) + 8 * 60 * 60)
                        return self._send(
                            data={"ok": True},
                            headers={
                                "Set-Cookie": f"apex_admin={token}; Path=/; "
                                "HttpOnly; SameSite=Strict; Max-Age=28800"
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
                    if self.command == "GET" and path == "/admin.html":
                        return self._redirect("/admin")
                    if self.command == "GET" and path == "/api/products":
                        return self._send(data=[asdict(x) for x in app.catalog.list()])
                    if self.command == "GET" and path == "/api/admin/products":
                        return self._send(
                            data=[asdict(x) for x in app.repo.list_products(True)]
                        )
                    if self.command == "GET" and path == "/api/admin/integrations":
                        return self._send(
                            data=[asdict(x) for x in app.integrations.list()]
                        )
                    if self.command == "GET" and path == "/api/checkout/integrations":
                        return self._send(data=[
                            {"provider": x.provider, "kind": x.kind, "name": x.public_config.get("name", x.provider)}
                            for x in app.integrations.list() if x.enabled
                        ])
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
                    if self.command == "POST" and path == "/api/admin/integrations":
                        return self._send(data=app.integrations.configure(self._body()))
                    if self.command == "POST" and path == "/api/delivery/calculate":
                        if not app.delivery:
                            raise ValueError("Доставка не настроена")
                        delivery_request = self._body()
                        return self._send(data=app.delivery.calculate(
                            str(delivery_request.get("postal_code", "")),
                            float(delivery_request.get("order_total", 0)),
                        ))
                    if self.command == "GET" and path == "/api/delivery/pvz":
                        if not app.delivery:
                            raise ValueError("Доставка не настроена")
                        postal_code = parse_qs(parsed.query).get("postalCode", [""])[0]
                        return self._send(data=app.delivery.pvz(postal_code))
                    if self.command == "POST" and path == "/api/checkout/captcha":
                        return self._send(
                            data={
                                "proof": app.checkout.confirm_captcha(
                                    self._body().get("token", ""),
                                    self.client_address[0],
                                )
                            }
                        )
                    if self.command == "POST" and path == "/api/checkout/payment":
                        return self._send(201, app.checkout.create_payment(self._body()))
                    if self.command == "POST" and path == "/api/payments/tbank/notification":
                        app.checkout.accept_tbank_notification(self._body())
                        return self._send(200, b"OK", "text/plain; charset=utf-8")
                    if self.command == "GET" and path == "/api/checkout/order":
                        order_id = parse_qs(parsed.query).get("order_id", [""])[0]
                        order = app.repo.get_order(order_id)
                        return self._send(200, order) if order else self._send(404, {"error": "Заказ не найден"})
                    parts = path.strip("/").split("/")
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
                        return self._send(data=app.integrations.configure(data, update=True))
                    if (
                        self.command == "DELETE"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "products"]
                    ):
                        return self._send(
                            data={"ok": app.repo.delete_product(int(parts[3]))}
                        )
                    if (
                        self.command == "DELETE" and len(parts) == 4
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
                        file = "index.html" if path == "/" else path.lstrip("/")
                        return self._serve_static(file)
                    return self._send(404, {"error": "Не найдено"})
                except RequestTooLarge as e:
                    # Do not try to reuse a connection containing an unread body.
                    self.close_connection = True
                    return self._send(
                        413, {"error": str(e)}, headers={"Connection": "close"}
                    )
                except (ValueError, LookupError, KeyError) as e:
                    return self._send(400, {"error": str(e)})
                except Exception:
                    logger.exception(
                        "Unhandled error while processing %s %s", self.command, path
                    )
                    return self._send(
                        500,
                        {"error": "Внутренняя ошибка сервера. Попробуйте повторить запрос"},
                    )
                    
            do_GET = _route
            do_POST = _route
            do_PUT = _route
            do_DELETE = _route

            def log_message(self, fmt, *args):
                print("http", self.address_string(), fmt % args)

        return Handler
