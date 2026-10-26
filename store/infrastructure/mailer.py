"""APEX email templates and signed HTTPS delivery to the owner's 2p2p service."""

import html
import ipaddress
import json
import hashlib
import hmac
import re
import ssl
import threading
import time
import urllib.request
from datetime import datetime
from urllib.error import HTTPError, URLError
from uuid import UUID
from zoneinfo import ZoneInfo


class GeoLocation:
    """Best-effort city by public IP; failure never prevents a recovery email."""

    def __init__(self, enabled=True):
        self.enabled, self.cache, self.lock = enabled, {}, threading.Lock()

    def lookup(self, ip):
        address = ipaddress.ip_address(ip)
        if not address.is_global:
            return "Локальная сеть; местоположение недоступно"
        if not self.enabled:
            return "Определение местоположения отключено"
        with self.lock:
            cached = self.cache.get(ip)
        if cached and cached[0] > time.monotonic():
            return cached[1]
        result = "Не удалось определить местоположение"
        try:
            request = urllib.request.Request(
                "https://ipwho.is/" + str(address),
                headers={"Accept": "application/json"},
            )
            with urllib.request.urlopen(request, timeout=2) as response:
                data = json.loads(response.read(20_000))
            if data.get("success") is True:
                parts = [
                    str(data.get(key) or "")[:100]
                    for key in ("country", "region", "city")
                ]
                result = (
                    ", ".join(dict.fromkeys(part for part in parts if part)) or result
                )
        except (OSError, ValueError, TypeError):
            pass
        with self.lock:
            if len(self.cache) >= 128:
                self.cache.clear()
            self.cache[ip] = (time.monotonic() + 3600, result)
        return result


def render_email(kind, data, public_url, location=""):
    name = str(data.get("name") or "участник APEX")
    if kind == "registration":
        subject = "Подтверди почту — APEX"
        title = "Добро пожаловать в клуб"
        introduction = f"{name}, введи этот код на сайте, чтобы подтвердить почту и создать аккаунт."
        code = str(data["code"])
        action = f'<div style="margin:28px 0;padding:22px 12px;background:#f5f6f8;border:1px solid #e5e8ee;border-radius:12px;text-align:center;font:700 36px monospace;letter-spacing:9px;color:#20242e">{html.escape(code)}</div>'
        details = "Код действует 10 минут. Никому его не сообщай. Если ты не создавал аккаунт, просто проигнорируй это письмо."
        text = f"{title}\n\n{introduction}\n\nКод: {code}\n\n{details}"
    elif kind == "password_reset":
        subject, title = "Сброс пароля — APEX", "Вернём доступ к аккаунту"
        introduction = f"{name}, мы получили запрос на сброс пароля. Перейди по ссылке, чтобы задать новый пароль."
        url = str(data["url"])
        when = (
            datetime.fromisoformat(data["requested_at"])
            .astimezone(ZoneInfo("Europe/Moscow"))
            .strftime("%d.%m.%Y в %H:%M МСК")
        )
        facts = f"Время: {when}\nIP-адрес: {data['ip']}\nПримерное местоположение: {location}\nУстройство / браузер: {data['agent']}"
        action = f'<p style="margin:28px 0"><a href="{html.escape(url, quote=True)}" style="display:inline-block;background:#dd4336;color:white;padding:16px 26px;border-radius:9px;text-decoration:none;font-weight:700">Создать новый пароль →</a></p><div style="background:#f5f6f8;border-radius:10px;padding:18px;font-size:13px;line-height:1.8;color:#566174">{html.escape(facts).replace(chr(10), "<br>")}</div>'
        details = "Ссылка действует 30 минут и используется один раз. Если это не ты, проигнорируй письмо: пароль не изменится. Местоположение определяется приблизительно по IP; VPN и мобильная сеть могут его изменить."
        text = f"{title}\n\n{introduction}\n\n{url}\n\n{facts}\n\n{details}"
    else:
        raise ValueError("Неизвестное письмо")
    page = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f0f2f6;font-family:Arial,sans-serif;color:#20242e"><div style="display:none;max-height:0;overflow:hidden">{html.escape(subject)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px"><table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:white;border:1px solid #e5e8ee;border-radius:18px;overflow:hidden"><tr><td style="padding:26px 30px;background:#1b2230;border-bottom:4px solid #dd4336"><a href="{html.escape(public_url, quote=True)}" style="font-size:30px;font-weight:900;letter-spacing:3px;font-style:italic;text-decoration:none;color:white">APEX<span style="color:#ff7b6e"> /</span></a><div style="margin-top:7px;font-size:10px;letter-spacing:2px;color:#aab6ca">MEMBERS CLUB</div></td></tr><tr><td style="padding:32px 28px"><h1 style="font-size:25px;line-height:1.3;margin:0 0 16px">{html.escape(title)}</h1><p style="font-size:15px;line-height:1.8;color:#566174">{html.escape(introduction)}</p>{action}<p style="font-size:13px;line-height:1.8;color:#737c8d">{html.escape(details)}</p></td></tr><tr><td style="border-top:1px solid #e5e8ee;padding:22px 28px;font-size:11px;line-height:1.8;color:#737c8d">Твой стиль. Твои привилегии.<br>Автоматическое письмо от <a href="{html.escape(public_url, quote=True)}" style="color:#dd4336">APEX</a>. Отвечать на него не нужно.</td></tr></table></td></tr></table></body></html>'''
    return subject, text, page


class EmailServiceError(RuntimeError):
    def __init__(self, code, retry_after=0):
        self.safe_code = (
            code
            if re.fullmatch(r"EMAIL_[A-Z0-9_]{1,40}", code)
            else "EMAIL_SERVICE_ERROR"
        )
        self.retry_after = min(max(int(retry_after), 0), 300)
        super().__init__(self.safe_code)


class NoMailRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        # Codes, reset links and authentication must never follow redirects.
        return None


class EmailGateway:
    def __init__(self, config):
        self.url = config.EMAIL_SERVICE_URL
        self.secret = config.EMAIL_SERVICE_SECRET.get_secret_value()
        self.public_url = config.WEBAPP_URL.rstrip("/")
        self.geo = GeoLocation(config.GEOIP_LOOKUP_ENABLED)
        self.context = ssl.create_default_context()
        self.opener = urllib.request.build_opener(
            NoMailRedirect(), urllib.request.HTTPSHandler(context=self.context)
        )

    @property
    def configured(self):
        return bool(self.url and len(self.secret) >= 32)

    def prepare(self, kind, data, message_id, created_at, expires_at):
        location = self.geo.lookup(data["ip"]) if kind == "password_reset" else ""
        subject, text, page = render_email(kind, data, self.public_url, location)
        return {
            "schema_version": 1,
            "message_id": str(UUID(str(message_id))),
            "source": "apex",
            "site_url": self.public_url,
            "kind": kind,
            "to": data["email"],
            "subject": subject,
            "text": text,
            "html": page,
            "created_at": created_at.isoformat(),
            "expires_at": expires_at.isoformat(),
            "data": {
                "name": data.get("name", ""),
                **(
                    {"code": data["code"]}
                    if kind == "registration"
                    else {"reset_url": data["url"]}
                ),
            },
            "request_context": {
                "ip": data["ip"],
                "user_agent": data["agent"],
                "requested_at": data["requested_at"],
                "location": location,
            }
            if kind == "password_reset"
            else {},
        }

    def send(self, message):
        if not self.configured:
            raise EmailServiceError("EMAIL_NOT_CONFIGURED")
        body = json.dumps(
            message, ensure_ascii=False, sort_keys=True, separators=(",", ":")
        ).encode("utf-8")
        timestamp = str(int(time.time()))
        signature = hmac.new(
            self.secret.encode("utf-8"),
            timestamp.encode("ascii") + b"." + body,
            hashlib.sha256,
        ).hexdigest()
        request = urllib.request.Request(
            self.url,
            data=body,
            method="POST",
            headers={
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "User-Agent": "ApexStoreMail/1",
                "X-Apex-Timestamp": timestamp,
                "X-Apex-Signature": "sha256=" + signature,
                "Idempotency-Key": "apex-mail-" + message["message_id"],
            },
        )
        try:
            with self.opener.open(request, timeout=10) as response:
                if response.status not in {200, 202}:
                    raise EmailServiceError("EMAIL_HTTP_" + str(response.status))
                raw = response.read(16_385)
                if (
                    len(raw) > 16_384
                    or response.headers.get("Content-Type", "")
                    .split(";")[0]
                    .strip()
                    .lower()
                    != "application/json"
                ):
                    raise EmailServiceError("EMAIL_INVALID_ACK")
                try:
                    result = json.loads(raw)
                except (ValueError, UnicodeError):
                    raise EmailServiceError("EMAIL_INVALID_ACK") from None
                if (
                    not isinstance(result, dict)
                    or result.get("ok") is not True
                    or result.get("message_id") != message["message_id"]
                ):
                    raise EmailServiceError("EMAIL_INVALID_ACK")
        except HTTPError as exc:
            value = exc.headers.get("Retry-After", "") if exc.headers else ""
            retry = (
                int(value)
                if value.isascii() and value.isdecimal() and len(value) < 6
                else 0
            )
            exc.close()
            raise EmailServiceError("EMAIL_HTTP_" + str(exc.code), retry) from None
        except (URLError, OSError, TimeoutError):
            raise EmailServiceError("EMAIL_NETWORK_ERROR") from None
