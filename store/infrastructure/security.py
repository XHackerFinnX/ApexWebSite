import base64
import hashlib
import hmac
import secrets
import threading


class SecretBox:
    """Authenticated at-rest encryption using a master key (stdlib implementation)."""

    def __init__(self, master_key: str):
        self.key = hashlib.sha256(master_key.encode()).digest()

    def encrypt(self, value: str) -> str:
        nonce = secrets.token_bytes(16)
        stream = self._stream(nonce, len(value.encode()))
        cipher = bytes(a ^ b for a, b in zip(value.encode(), stream))
        tag = hmac.new(self.key, nonce + cipher, hashlib.sha256).digest()
        return base64.urlsafe_b64encode(nonce + tag + cipher).decode()

    def decrypt(self, value: str) -> str:
        raw = base64.urlsafe_b64decode(value)
        nonce, tag, cipher = raw[:16], raw[16:48], raw[48:]
        if not hmac.compare_digest(
            tag, hmac.new(self.key, nonce + cipher, hashlib.sha256).digest()
        ):
            raise ValueError("Повреждён зашифрованный секрет")
        return bytes(
            a ^ b for a, b in zip(cipher, self._stream(nonce, len(cipher)))
        ).decode()

    def _stream(self, nonce: bytes, size: int) -> bytes:
        out = b""
        counter = 0
        while len(out) < size:
            out += hmac.new(
                self.key, nonce + counter.to_bytes(4, "big"), hashlib.sha256
            ).digest()
            counter += 1
        return out[:size]


class RateLimiter:
    def __init__(self, limit=120, window=60):
        self.limit, self.window, self.buckets = limit, window, {}
        self._lock = threading.Lock()

    def allow(self, key: str, now: float) -> bool:
        with self._lock:
            return self._allow(key, now)

    def _allow(self, key, now):
        if len(self.buckets) > 4096:
            self.buckets = {
                k: v for k, v in self.buckets.items() if v and now - v[-1] < self.window
            }
        bucket = [t for t in self.buckets.get(key, []) if now - t < self.window]
        if len(bucket) >= self.limit:
            self.buckets[key] = bucket
            return False
        bucket.append(now)
        self.buckets[key] = bucket
        return True


def hash_password(password: str) -> str:
    if len(password) < 10 or len(password) > 256:
        raise ValueError("Пароль должен содержать от 10 до 256 символов")
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 600_000)
    return f"pbkdf2_sha256$600000${salt}${digest.hex()}"


def verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, rounds, salt, expected = encoded.split("$")
        if algorithm != "pbkdf2_sha256" or len(password) > 256:
            return False
        actual = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), salt.encode(), int(rounds)
        ).hex()
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False
