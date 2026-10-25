"""Content-addressed images: pictures never need to travel in catalog JSON."""

import base64
import hashlib
import io
import os
import secrets
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError

MEDIA_ROOT = Path(
    os.getenv("STORE_MEDIA_ROOT", str(Path(__file__).parents[2] / "var" / "media"))
)
_object_storage = None
MAX_IMAGE_BYTES = 8_000_000


class MediaStorageError(RuntimeError):
    pass


def configure_media(settings):
    global MEDIA_ROOT, _object_storage
    MEDIA_ROOT = Path(settings.STORE_MEDIA_ROOT).expanduser()
    if settings.STORE_MEDIA_BACKEND == "s3":
        from store.infrastructure.object_storage import S3MediaStorage

        _object_storage = S3MediaStorage(settings)
    else:
        _object_storage = None


def read_media(filename):
    if _object_storage is not None:
        return _object_storage.read(filename)
    return (MEDIA_ROOT / filename).read_bytes()


def media_exists(filename):
    if _object_storage is not None:
        return _object_storage.exists(filename)
    return (MEDIA_ROOT / filename).is_file()


def upload_media_directory(directory):
    if _object_storage is None:
        raise ValueError("Для переноса фотографий установите STORE_MEDIA_BACKEND=s3")
    if not Path(directory).is_dir():
        raise ValueError("Каталог с фотографиями не найден")
    count = 0
    import re

    for path in sorted(Path(directory).glob("*.webp")):
        if re.fullmatch(r"[a-f0-9]{64}(-(?:240|480|960))?\.webp", path.name):
            _object_storage.put(path.name, path.read_bytes())
            count += 1
    return count


def store_image(value: str) -> str:
    value = str(value).strip()
    if not value:
        return ""
    if not value.startswith("data:"):
        if not (value.startswith(("https://", "/media/", "/images/", "images/"))):
            raise ValueError("Фотография должна быть загружена или иметь HTTPS-адрес")
        return value
    try:
        metadata, encoded = value.split(",", 1)
        if metadata not in {
            "data:image/png;base64",
            "data:image/jpeg;base64",
            "data:image/webp;base64",
            "data:image/gif;base64",
        }:
            raise ValueError("Поддерживаются JPEG, PNG, WebP и GIF")
        if len(encoded) > MAX_IMAGE_BYTES * 4 // 3 + 8:
            raise ValueError("Фотография превышает 8 МБ")
        raw = base64.b64decode(encoded, validate=True)
        with Image.open(io.BytesIO(raw)) as original:
            if original.width * original.height > 32_000_000:
                raise ValueError("Слишком большое разрешение фотографии")
            mode = (
                "RGBA"
                if original.mode in {"RGBA", "LA"} or "transparency" in original.info
                else "RGB"
            )
            image = ImageOps.exif_transpose(original).convert(mode)
            image.thumbnail((1600, 1600))
            output = io.BytesIO()
            image.save(output, "WEBP", quality=82, method=4)
            content = output.getvalue()
            digest = hashlib.sha256(content).hexdigest()
            if _object_storage is None:
                MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
            _save(MEDIA_ROOT / f"{digest}.webp", content)
            for width in (240, 480, 960):
                thumbnail = image.copy()
                thumbnail.thumbnail((width, width))
                buffer = io.BytesIO()
                thumbnail.save(buffer, "WEBP", quality=78, method=4)
                _save(MEDIA_ROOT / f"{digest}-{width}.webp", buffer.getvalue())
            return f"/media/{digest}.webp"
    except (
        UnidentifiedImageError,
        OSError,
        base64.binascii.Error,
        Image.DecompressionBombError,
    ) as exc:
        raise ValueError("Не удалось прочитать фотографию") from exc


def _save(path: Path, content: bytes) -> None:
    if _object_storage is not None:
        _object_storage.put(path.name, content)
        return
    if not path.exists():
        temporary = path.with_suffix(f".{secrets.token_hex(8)}.tmp")
        temporary.write_bytes(content)
        temporary.replace(path)


def normalize_product_media(product):
    memo = {}

    def image(value):
        if value not in memo:
            memo[value] = store_image(value)
        return memo[value]

    product.images = tuple(image(v) for v in product.images)
    product.image_url = (
        product.images[0] if product.images else image(product.image_url)
    )
    product.variants = tuple(
        {**variant, "images": [image(v) for v in variant.get("images", [])]}
        for variant in product.variants
    )
    return product
