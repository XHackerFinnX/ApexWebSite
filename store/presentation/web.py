import json
import mimetypes
import time
from dataclasses import asdict
from decimal import Decimal
from pathlib import Path
from urllib.parse import parse_qs, urlparse


class Encoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        if isinstance(o, tuple):
            return list(o)
        return super().default(o)


class WebApp:
    def __init__(self, catalog, integrations, checkout, repo, limiter, delivery=None):
        self.catalog, self.integrations, self.checkout, self.repo, self.limiter, self.delivery = (
            catalog,
            integrations,
            checkout,
            repo,
            limiter,
            delivery,
        )

    def handler(self):
        app = self
        from http.server import BaseHTTPRequestHandler

        class Handler(BaseHTTPRequestHandler):
            def _send(
                self, status=200, data=None, ctype="application/json; charset=utf-8"
            ):
                body = (
                    json.dumps(data, cls=Encoder, ensure_ascii=False).encode()
                    if ctype.startswith("application/json")
                    else data
                )
                self.send_response(status)
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Length", str(len(body)))
                self.send_header("X-Content-Type-Options", "nosniff")
                self.send_header("X-Frame-Options", "DENY")
                self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
                self.send_header(
                    "Content-Security-Policy",
                    "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; img-src 'self' https: data:; connect-src 'self' https://geoserv.tildacdn.com",
                )
                self.end_headers()
                self.wfile.write(body)

            def _body(self):
                length = int(self.headers.get("Content-Length", "0"))
                if length > 1_000_000:
                    raise ValueError("Запрос слишком большой")
                return json.loads(self.rfile.read(length) or b"{}")

            def _route(self):
                if not app.limiter.allow(self.client_address[0], time.monotonic()):
                    return self._send(429, {"error": "Слишком много запросов"})
                parsed = urlparse(self.path)
                path = parsed.path
                try:
                    if self.command == "GET" and path == "/api/products":
                        return self._send(data=[asdict(x) for x in app.catalog.list()])
                    if self.command == "GET" and path == "/api/admin/integrations":
                        return self._send(
                            data=[asdict(x) for x in app.integrations.list()]
                        )
                    if self.command == "POST" and path == "/api/admin/products":
                        return self._send(201, asdict(app.catalog.save(self._body())))
                    if self.command == "POST" and path == "/api/admin/integrations":
                        app.integrations.configure(self._body())
                        return self._send(data={"ok": True})
                    if self.command == "POST" and path == "/api/delivery/calculate":
                        if not app.delivery:
                            raise ValueError("Доставка не настроена")
                        return self._send(data=app.delivery.calculate(str(self._body().get("postal_code", ""))))
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
                    parts = path.strip("/").split("/")
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
                        self.command == "DELETE"
                        and len(parts) == 4
                        and parts[:3] == ["api", "admin", "products"]
                    ):
                        return self._send(
                            data={"ok": app.repo.delete_product(int(parts[3]))}
                        )
                    if self.command == "GET":
                        file = (
                            "admin.html"
                            if path == "/admin"
                            else ("index.html" if path == "/" else path.lstrip("/"))
                        )
                        target = (Path(__file__).parent / "static" / file).resolve()
                        root = (Path(__file__).parent / "static").resolve()
                        if root in target.parents and target.is_file():
                            return self._send(
                                200,
                                target.read_bytes(),
                                mimetypes.guess_type(target.name)[0]
                                or "application/octet-stream",
                            )
                    return self._send(404, {"error": "Не найдено"})
                except (ValueError, LookupError, KeyError) as e:
                    return self._send(400, {"error": str(e)})

            do_GET = _route
            do_POST = _route
            do_DELETE = _route

            def log_message(self, fmt, *args):
                print("http", self.address_string(), fmt % args)

        return Handler
