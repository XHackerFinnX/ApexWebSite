import time
from dataclasses import asdict
from http.cookies import SimpleCookie

from store.infrastructure.media import MEDIA_ROOT


class CommerceHandler:
    def _cookie(self, name):
        cookies = SimpleCookie()
        try:
            cookies.load(self.headers.get("Cookie", ""))
        except Exception:
            return ""
        return cookies[name].value if name in cookies else ""

    def _customer(self):
        return self.application.repo.customer_for_session(self._cookie("apex_customer"))

    def _customer_cookie(self, token, expire=False):
        secure = "; Secure" if self.headers.get("X-Forwarded-Proto") == "https" else ""
        return f"apex_customer={token}; Path=/; HttpOnly; SameSite=Lax; Max-Age={0 if expire else 2592000}{secure}"

    def _commerce_route(self, path, parsed):
        from urllib.parse import parse_qs

        app = self.application
        method = self.command
        query = parse_qs(parsed.query)
        if method == "POST" and path == "/api/admin/media":
            from store.infrastructure.media import store_image

            value = self._body().get("image", "")
            if not str(value).startswith("data:"):
                raise ValueError("Загрузите фотографию")
            return self._send(201, {"url": store_image(value)})
        if method == "GET" and path == "/account":
            return self._serve_static("account.html")
        if method == "GET" and path in {"/payment/success", "/payment/fail"}:
            return self._serve_static(
                "payment-success.html"
                if path.endswith("success")
                else "payment-fail.html"
            )
        if method == "GET" and path.startswith("/media/"):
            import re

            filename = path.removeprefix("/media/")
            if not re.fullmatch(r"[a-f0-9]{64}(-(?:240|480|960))?\.webp", filename):
                return self._send(404, {"error": "Файл не найден"})
            width = query.get("w", [""])[0]
            if width in {"240", "480", "960"} and "-" not in filename:
                filename = filename.replace(".webp", f"-{width}.webp")
            target = MEDIA_ROOT / filename
            if not target.is_file():
                return self._send(404, {"error": "Файл не найден"})
            return self._send(
                200,
                target.read_bytes(),
                "image/webp",
                {"Cache-Control": "public, max-age=31536000, immutable"},
            )
        if method == "GET" and path in {"/api/catalog", "/api/admin/catalog"}:
            admin = path.startswith("/api/admin/")
            key = parsed.path + "?" + parsed.query
            with app.cache_lock:
                cached = app.cache.get(key)
            if not admin and cached and time.monotonic() - cached[0] < 5:
                return self._send(
                    data=cached[1], headers={"Cache-Control": "public, max-age=5"}
                )
            result = app.repo.catalog_page(
                admin,
                query.get("limit", [24])[0],
                query.get("offset", [0])[0],
                query.get("q", [""])[0],
                query.get("category", [""])[0],
                query.get("size", [""])[0],
                query.get("sort", ["featured"])[0],
            )
            if not admin:
                with app.cache_lock:
                    if len(app.cache) > 128:
                        app.cache.clear()
                    app.cache[key] = (time.monotonic(), result)
            return self._send(
                data=result,
                headers={"Cache-Control": "no-store" if admin else "public, max-age=5"},
            )
        parts = path.strip("/").split("/")
        if method == "GET" and (
            (len(parts) == 3 and parts[:2] == ["api", "products"])
            or (len(parts) == 4 and parts[:3] == ["api", "admin", "products"])
        ):
            product = app.repo.get_product(int(parts[-1]))
            if not product or (
                not path.startswith("/api/admin/") and not product.is_active
            ):
                return self._send(404, {"error": "Товар не найден"})
            return self._send(data=asdict(product))
        if method == "GET" and path == "/api/admin/stats":
            return self._send(data=app.repo.catalog_stats())
        if method == "GET" and path == "/api/loyalty":
            return self._send(data=app.repo.loyalty_settings())
        if method == "POST" and path == "/api/cart/quote":
            result = app.checkout.quote(self._body(), self._customer())
            result.pop("promotion", None)
            return self._send(data=result)
        if method == "POST" and path in {"/api/account/register", "/api/account/login"}:
            if not app.auth_limiter.allow(
                "customer:" + self.client_address[0], time.monotonic()
            ):
                return self._send(
                    429, {"error": "Слишком много попыток входа. Повторите позже"}
                )
            data = self._body()
            customer = (
                app.repo.register_customer(data)
                if path.endswith("register")
                else app.repo.login_customer(
                    data.get("email", ""), data.get("password", "")
                )
            )
            token = app.repo.create_customer_session(customer["id"])
            return self._send(
                201 if path.endswith("register") else 200,
                customer,
                headers={"Set-Cookie": self._customer_cookie(token)},
            )
        if method == "POST" and path == "/api/account/logout":
            app.repo.logout_customer(self._cookie("apex_customer"))
            return self._send(
                data={"ok": True},
                headers={"Set-Cookie": self._customer_cookie("", True)},
            )
        if path in {"/api/account", "/api/account/profile"}:
            customer = self._customer()
            if not customer:
                return self._send(401, {"error": "Войдите в личный кабинет"})
            if method == "GET" and path == "/api/account":
                return self._send(
                    data={
                        "customer": customer,
                        **app.repo.customer_history(customer["id"]),
                        "loyalty": app.repo.loyalty_settings(),
                    }
                )
            if method == "PUT" and path == "/api/account/profile":
                data = self._body()
                app.repo.update_customer(customer["id"], data)
                return self._send(
                    data={"ok": True, "login_required": bool(data.get("new_password"))}
                )
        if method == "GET" and path == "/api/delivery/cities":
            return self._send(data=app.delivery.cities(query.get("q", [""])[0]))
        if path == "/api/admin/promotions":
            if method == "GET":
                return self._send(data=app.repo.list_promotions())
            if method == "POST":
                return self._send(201, app.repo.save_promotion(self._body()))
        if method == "GET" and path == "/api/admin/orders":
            return self._send(data=app.repo.list_admin_orders())
        if method == "POST" and path == "/api/admin/integrations/cdek/check":
            config = app.repo.get_integration_config("cdek", enabled_only=False)
            if not config:
                raise ValueError("Сначала сохраните настройки СДЭК")
            result = app.delivery.test_configuration(config)
            return self._send(data={"ok": True, "checks": result})
        if path == "/api/admin/loyalty":
            if method == "GET":
                return self._send(data=app.repo.loyalty_settings())
            if method == "PUT":
                return self._send(data=app.repo.save_loyalty_settings(self._body()))
        if len(parts) == 4 and parts[:2] == ["api", "admin"]:
            kind, key = parts[2], parts[3]
            if kind == "promotions":
                if method == "PUT":
                    return self._send(
                        data=app.repo.save_promotion(self._body(), int(key))
                    )
                if method == "DELETE":
                    return self._send(data={"ok": app.repo.delete_promotion(int(key))})
            if kind == "categories" and method == "PUT":
                return self._send(
                    data=app.repo.update_category(
                        int(key), self._body().get("name", "")
                    )
                )
            if kind == "reviews":
                if method == "GET":
                    return self._send(data=app.repo.admin_review(int(key)))
                if method == "PUT":
                    return self._send(
                        data=app.repo.save_review({**self._body(), "id": int(key)})
                    )
                if method == "DELETE":
                    return self._send(data={"ok": app.repo.delete_review(int(key))})
            if kind == "orders" and method == "PUT":
                return self._send(data=app.repo.update_fulfillment(key, self._body()))
        return False
