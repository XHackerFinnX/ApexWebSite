"""Persistent, single-use challenges, email verification and password recovery."""

import base64
import hashlib
import hmac
import json
import re
import secrets
import time
from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

from store.infrastructure.security import hash_password


class SecurityError(Exception):
    def __init__(self, message, status=400, *, captcha_required=False, retry_after=0):
        super().__init__(message)
        self.status, self.captcha_required, self.retry_after = (
            status,
            captcha_required,
            retry_after,
        )


def normalized_email(value):
    email = str(value or "").strip().lower()
    if len(email) > 254 or not re.fullmatch(
        r"[^\s@\x00-\x1f]{1,128}@[^\s@\x00-\x1f]{1,128}\.[^\s@\x00-\x1f]{2,64}", email
    ):
        raise ValueError("Укажите корректный email")
    return email


def checkout_context(data):
    return json.dumps(
        {key: value for key, value in data.items() if key != "captcha_proof"},
        sort_keys=True,
        ensure_ascii=False,
        separators=(",", ":"),
    )


class AccountSecurity:
    def __init__(
        self, repo, mailer=None, public_url="https://apextop.ru", renderer=None
    ):
        self.repo, self.mailer, self.public_url = repo, mailer, public_url.rstrip("/")
        if renderer is None:
            from store.infrastructure.captcha import render_challenge

            renderer = render_challenge
        self.renderer = renderer

    def digest(self, label, value):
        return hmac.new(
            self.repo.box.key, (label + "\0" + str(value)).encode(), hashlib.sha256
        ).hexdigest()

    def binding(self, ip, browser, agent):
        if not re.fullmatch(r"[A-Za-z0-9_-]{43}", browser or ""):
            raise SecurityError(
                "Обновите проверку безопасности", 403, captcha_required=True
            )
        return self.digest("browser", ip + "\0" + browser + "\0" + agent[:512])

    def _count(self, key, window, increment=False):
        bucket, digest = int(time.time()) // window, self.digest("counter", key)
        with self.repo._db() as db:
            if increment:
                return db.execute(
                    """INSERT INTO security_counters(key,bucket,expires_at)
                    VALUES(%s,%s,now()+(%s * interval '1 second'))
                    ON CONFLICT(key,bucket) DO UPDATE SET count=security_counters.count+1 RETURNING count""",
                    (digest, bucket, window * 2),
                ).fetchone()["count"]
            # Include the previous bucket: clock boundaries cannot reset risk.
            return db.execute(
                "SELECT coalesce(sum(count),0) AS count FROM security_counters WHERE key=%s AND bucket>=%s",
                (digest, bucket - 1),
            ).fetchone()["count"]

    def limit(self, key, maximum, window):
        self._count(key, window, True)
        if self._count(key, window) > maximum:
            raise SecurityError(
                "Слишком много попыток. Попробуйте позже.", 429, retry_after=window * 2
            )

    def challenge(self, purpose, context, ip, browser, agent):
        if purpose not in {"register", "login", "reset", "checkout"}:
            raise ValueError("Неизвестная проверка")
        self.limit("challenge:" + ip, 30, 600)
        self.limit("challenge-global", 300, 60)
        binding = self.binding(ip, browser, agent)
        if purpose != "checkout":
            context = normalized_email(context)
        elif not isinstance(context, dict):
            raise ValueError("Проверьте данные заказа")
        else:
            context = checkout_context(context)
        if len(context) > 100_000:
            raise ValueError("Слишком большой запрос")
        answer, picture = self.renderer()
        identity = str(uuid4())
        with self.repo._db() as db:
            db.execute(
                """INSERT INTO captcha_challenges(id,purpose,binding,context,answer_hash,expires_at)
                VALUES(%s,%s,%s,%s,%s,now()+interval '3 minutes')""",
                (
                    identity,
                    purpose,
                    binding,
                    self.digest("context", context),
                    self.digest(identity, answer),
                ),
            )
        return {
            "id": identity,
            "image": "data:image/png;base64," + base64.b64encode(picture).decode(),
            "expires_in": 180,
        }

    def solve(self, data, ip, browser, agent):
        self.limit("solve:" + ip, 60, 600)
        binding = self.binding(ip, browser, agent)
        try:
            identity = str(UUID(str(data.get("id", ""))))
        except ValueError as exc:
            raise SecurityError(
                "Обновите картинку проверки", 403, captcha_required=True
            ) from exc
        answer, proof, valid = (
            str(data.get("answer", "")).strip().upper()[:32],
            secrets.token_urlsafe(32),
            False,
        )
        with self.repo._db() as db:
            row = db.execute(
                "SELECT *,now() AS clock FROM captcha_challenges WHERE id=%s FOR UPDATE",
                (identity,),
            ).fetchone()
            if (
                row
                and hmac.compare_digest(row["binding"], binding)
                and row["expires_at"] > row["clock"]
                and row["attempts"] < 5
                and not row["verified_at"]
                and not row["consumed_at"]
            ):
                valid = (
                    row["clock"] - row["created_at"]
                ).total_seconds() >= 1 and hmac.compare_digest(
                    row["answer_hash"], self.digest(identity, answer)
                )
                db.execute(
                    "UPDATE captcha_challenges SET attempts=attempts+1,proof_hash=%s,verified_at=CASE WHEN %s THEN now() ELSE NULL END WHERE id=%s",
                    (self.digest("proof", proof) if valid else None, valid, identity),
                )
        if not valid:
            raise SecurityError(
                "Не удалось пройти проверку. Проверьте символы или обновите картинку.",
                403,
                captcha_required=True,
            )
        return {"proof": proof}

    def consume(self, proof, purpose, context, ip, browser, agent):
        binding = self.binding(ip, browser, agent)
        context = (
            checkout_context(context)
            if purpose == "checkout"
            else normalized_email(context)
        )
        with self.repo._db() as db:
            row = db.execute(
                """UPDATE captcha_challenges SET consumed_at=now()
                WHERE proof_hash=%s AND purpose=%s AND binding=%s AND context=%s
                AND verified_at IS NOT NULL AND consumed_at IS NULL AND expires_at>now() RETURNING id""",
                (
                    self.digest("proof", str(proof or "")[:256]),
                    purpose,
                    binding,
                    self.digest("context", context),
                ),
            ).fetchone()
        if not row:
            raise SecurityError(
                "Пройдите проверку безопасности ещё раз", 403, captcha_required=True
            )

    def login_requires_captcha(self, email, ip, browser):
        return any(
            self._count(key, window) >= threshold
            for key, threshold, window in [
                ("fail-ip:" + ip, 3, 900),
                ("fail-email:" + email, 3, 900),
                ("login-ip:" + ip, 5, 600),
                ("login-email:" + email, 5, 600),
                ("logout-ip:" + ip, 3, 600),
                *([("logout-browser:" + browser, 3, 600)] if browser else []),
            ]
        )

    def login(self, data, ip, browser, agent):
        email = normalized_email(data.get("email"))
        self.limit("login-hard-ip:" + ip, 30, 900)
        self.limit("login-hard-email:" + email, 15, 900)
        if self.login_requires_captcha(email, ip, browser):
            self.consume(data.get("captcha_proof"), "login", email, ip, browser, agent)
        self.limit("login-global", 120, 60)
        for key in ("login-ip:" + ip, "login-email:" + email):
            self._count(key, 600, True)
        try:
            return self.repo.login_customer(
                email, str(data.get("password", "")), with_session=True
            )
        except ValueError as exc:
            for key in ("fail-ip:" + ip, "fail-email:" + email):
                self._count(key, 900, True)
            raise SecurityError(
                str(exc),
                401,
                captcha_required=self.login_requires_captcha(email, ip, browser),
            ) from exc

    def logout(self, ip, browser):
        for key in ["logout-ip:" + ip] + (
            ["logout-browser:" + browser] if browser else []
        ):
            self._count(key, 600, True)

    def _email_budget(self, kind, email, ip):
        if not self.mailer or not self.mailer.configured:
            raise SecurityError(
                "Отправка писем временно недоступна. Попробуйте позже.", 503
            )
        self.limit("mail-ip:" + ip, 5, 900)
        self.limit("mail-email:" + kind + ":" + email, 3, 3600)
        self.limit("mail-global", 200, 3600)

    def _enqueue(self, db, kind, identity, payload, expires):
        db.execute(
            "INSERT INTO email_outbox(id,context_id,kind,payload_encrypted,expires_at) VALUES(%s,%s,%s,%s,%s)",
            (
                str(uuid4()),
                identity,
                kind,
                self.repo.box.encrypt(json.dumps(payload, ensure_ascii=False)),
                expires,
            ),
        )

    def register(self, data, ip, browser, agent):
        email = normalized_email(data.get("email"))
        name, password = (
            str(data.get("name", "")).strip(),
            str(data.get("password", "")),
        )
        if not 2 <= len(name) <= 120 or not 10 <= len(password) <= 256:
            raise ValueError(
                "Имя: от 2 до 120 символов. Пароль: от 10 до 256 символов."
            )
        self.consume(data.get("captcha_proof"), "register", email, ip, browser, agent)
        self._email_budget("register", email, ip)
        encoded = hash_password(password)
        identity, code = str(uuid4()), f"{secrets.randbelow(1_000_000):06d}"
        expires, cooldown = datetime.now(timezone.utc) + timedelta(minutes=10), False
        with self.repo._db() as db:
            db.execute(
                "SELECT pg_advisory_xact_lock(hashtextextended(%s,0))",
                (self.digest("email-lock", email),),
            )
            old = db.execute(
                "SELECT id,created_at,now() AS clock FROM pending_registrations WHERE email=%s",
                (email,),
            ).fetchone()
            cooldown = bool(
                old and (old["clock"] - old["created_at"]).total_seconds() < 60
            )
            if (
                not cooldown
                and not db.execute(
                    "SELECT 1 FROM customers WHERE email=%s", (email,)
                ).fetchone()
            ):
                if old:
                    db.execute(
                        "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE context_id=%s",
                        (old["id"],),
                    )
                db.execute(
                    """INSERT INTO pending_registrations(email,id,name,password_hash,code_hash,expires_at)
                    VALUES(%s,%s,%s,%s,%s,%s) ON CONFLICT(email) DO UPDATE SET
                    id=excluded.id,name=excluded.name,password_hash=excluded.password_hash,
                    code_hash=excluded.code_hash,attempts=0,created_at=now(),expires_at=excluded.expires_at""",
                    (
                        email,
                        identity,
                        name,
                        encoded,
                        self.digest(identity, code),
                        expires,
                    ),
                )
                self._enqueue(
                    db,
                    "registration",
                    identity,
                    {"email": email, "name": name, "code": code},
                    expires,
                )
        if cooldown:
            raise SecurityError(
                "Повторный код можно запросить через минуту", 429, retry_after=60
            )
        return {
            "verification_required": True,
            "verification_id": identity,
            "resend_after": 60,
            "expires_in": 600,
        }

    def verify_registration(self, data, ip, *, with_session=False):
        self.limit("verify-registration:" + ip, 20, 900)
        try:
            identity = str(UUID(str(data.get("verification_id", ""))))
        except ValueError as exc:
            raise SecurityError("Запросите новый код подтверждения") from exc
        code = str(data.get("code", "")).strip()
        if not re.fullmatch(r"[0-9]{6}", code):
            raise ValueError("Введите код из 6 цифр")
        customer = None
        with self.repo._db() as db:
            row = db.execute(
                "SELECT *,now() AS clock FROM pending_registrations WHERE id=%s FOR UPDATE",
                (identity,),
            ).fetchone()
            if row and row["expires_at"] > row["clock"] and row["attempts"] < 5:
                db.execute(
                    "UPDATE pending_registrations SET attempts=attempts+1 WHERE id=%s",
                    (identity,),
                )
                if hmac.compare_digest(row["code_hash"], self.digest(identity, code)):
                    customer = db.execute(
                        """INSERT INTO customers(email,name,password_hash,email_verified_at)
                        VALUES(%s,%s,%s,now()) ON CONFLICT(email) DO NOTHING RETURNING id,email,name,phone,points""",
                        (row["email"], row["name"], row["password_hash"]),
                    ).fetchone()
                    db.execute(
                        "DELETE FROM pending_registrations WHERE id=%s", (identity,)
                    )
                    db.execute(
                        "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE context_id=%s",
                        (identity,),
                    )
                    if customer and with_session:
                        customer = (
                            customer,
                            self.repo._customer_session(db, customer["id"]),
                        )
        if not customer:
            raise SecurityError(
                "Код неверен, истёк или уже использован. Проверьте последнее письмо или запросите новый код."
            )
        return customer

    def forgot(self, data, ip, browser, agent):
        email = normalized_email(data.get("email"))
        self.consume(data.get("captcha_proof"), "reset", email, ip, browser, agent)
        self._email_budget("reset", email, ip)
        token, identity = secrets.token_urlsafe(32), str(uuid4())
        expires = datetime.now(timezone.utc) + timedelta(minutes=30)
        with self.repo._db() as db:
            db.execute(
                "SELECT pg_advisory_xact_lock(hashtextextended(%s,0))",
                (self.digest("email-lock", email),),
            )
            customer = db.execute(
                "SELECT id,name FROM customers WHERE email=%s", (email,)
            ).fetchone()
            bucket, cooldown_key = (
                int(time.time()) // 60,
                self.digest("counter", "reset-cooldown:" + email),
            )
            recent = db.execute(
                "SELECT 1 FROM security_counters WHERE key=%s AND bucket>=%s",
                (cooldown_key, bucket - 1),
            ).fetchone()
            if not recent:
                db.execute(
                    "INSERT INTO security_counters(key,bucket,expires_at) VALUES(%s,%s,now()+interval '2 minutes')",
                    (cooldown_key, bucket),
                )
                if customer:
                    db.execute(
                        "SELECT id FROM customers WHERE id=%s FOR UPDATE",
                        (customer["id"],),
                    )
                    db.execute(
                        "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE context_id IN (SELECT id FROM password_reset_tokens WHERE customer_id=%s AND used_at IS NULL)",
                        (customer["id"],),
                    )
                    db.execute(
                        "UPDATE password_reset_tokens SET used_at=now() WHERE customer_id=%s AND used_at IS NULL",
                        (customer["id"],),
                    )
                    db.execute(
                        "INSERT INTO password_reset_tokens(token_hash,id,customer_id,expires_at) VALUES(%s,%s,%s,%s)",
                        (
                            self.digest("reset-token", token),
                            identity,
                            customer["id"],
                            expires,
                        ),
                    )
                    self._enqueue(
                        db,
                        "password_reset",
                        identity,
                        {
                            "email": email,
                            "name": customer["name"],
                            "url": self.public_url + "/account#reset-password=" + token,
                            "ip": ip,
                            "agent": agent[:256],
                            "requested_at": datetime.now(timezone.utc).isoformat(),
                        },
                        expires,
                    )
        return {
            "ok": True,
            "message": "Если аккаунт с такой почтой существует, мы отправим ссылку для сброса пароля. Проверьте также папку «Спам».",
        }

    def reset(self, data, ip):
        self.limit("reset-password:" + ip, 10, 900)
        token, password = str(data.get("token", "")), str(data.get("password", ""))
        if not re.fullmatch(r"[A-Za-z0-9_-]{43}", token):
            raise SecurityError("Ссылка недействительна. Запросите новую.")
        if not 10 <= len(password) <= 256:
            raise ValueError("Пароль должен содержать от 10 до 256 символов")
        done = False
        with self.repo._db() as db:
            digest = self.digest("reset-token", token)
            candidate = db.execute(
                "SELECT customer_id FROM password_reset_tokens WHERE token_hash=%s",
                (digest,),
            ).fetchone()
            if candidate:
                db.execute(
                    "SELECT id FROM customers WHERE id=%s FOR UPDATE",
                    (candidate["customer_id"],),
                )
            row = db.execute(
                "SELECT *,now() AS clock FROM password_reset_tokens WHERE token_hash=%s FOR UPDATE",
                (digest,),
            ).fetchone()
            if row and not row["used_at"] and row["expires_at"] > row["clock"]:
                db.execute(
                    "UPDATE customers SET password_hash=%s WHERE id=%s",
                    (hash_password(password), row["customer_id"]),
                )
                db.execute(
                    "DELETE FROM customer_sessions WHERE customer_id=%s",
                    (row["customer_id"],),
                )
                db.execute(
                    "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE context_id IN (SELECT id FROM password_reset_tokens WHERE customer_id=%s AND used_at IS NULL)",
                    (row["customer_id"],),
                )
                db.execute(
                    "UPDATE password_reset_tokens SET used_at=now() WHERE customer_id=%s AND used_at IS NULL",
                    (row["customer_id"],),
                )
                db.execute(
                    "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE context_id=%s",
                    (row["id"],),
                )
                done = True
        if not done:
            raise SecurityError("Ссылка истекла или уже использована. Запросите новую.")
        return {"ok": True}

    def clean(self):
        with self.repo._db() as db:
            db.execute("DELETE FROM security_counters WHERE expires_at<now()")
            db.execute("DELETE FROM captcha_challenges WHERE expires_at<now()")
            db.execute("DELETE FROM pending_registrations WHERE expires_at<now()")
            db.execute("DELETE FROM password_reset_tokens WHERE expires_at<now()")
            db.execute(
                "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE expires_at<now() AND state IN ('pending','running')"
            )
            db.execute(
                "DELETE FROM email_outbox WHERE created_at<now()-interval '7 days'"
            )
