import base64
import hashlib
import hmac
import secrets


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

    def allow(self, key: str, now: float) -> bool:
        bucket = [t for t in self.buckets.get(key, []) if now - t < self.window]
        if len(bucket) >= self.limit:
            self.buckets[key] = bucket
            return False
        bucket.append(now)
        self.buckets[key] = bucket
        return True
