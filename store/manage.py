"""Explicit maintenance commands; no expensive media conversion at web startup."""

import argparse
import re

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb

from store.config import Settings, get_settings
from store.infrastructure.media import (
    configure_media,
    media_exists,
    store_image,
    upload_media_directory,
)
from store.infrastructure.postgres_repo import PostgreSQLRepository
from store.infrastructure.security import SecretBox


def check_product_media(rows):
    """Read-only audit of every product photo and its responsive versions."""
    references = set()
    products = 0
    for row in rows:
        products += 1
        references.add(row["image_url"] or "")
        references.update(row["images"] or [])
        for variant in row["variants"] or []:
            references.update(variant.get("images") or [])
    files = set()
    report = {
        "products": products,
        "s3_photos": 0,
        "s3_objects": 0,
        "bundled": 0,
        "external": 0,
        "inline": 0,
        "invalid": 0,
        "missing": [],
    }
    for value in references - {""}:
        if re.fullmatch(r"/media/[a-f0-9]{64}(-(?:240|480|960))?\.webp", value):
            report["s3_photos"] += 1
            filename = value.removeprefix("/media/")
            files.add(filename)
            if "-" not in filename:
                files.update(
                    filename.replace(".webp", f"-{w}.webp") for w in (240, 480, 960)
                )
        elif value.startswith(("/images/", "images/")):
            report["bundled"] += 1
        elif value.startswith("https://"):
            report["external"] += 1
        elif value.startswith("data:"):
            report["inline"] += 1
        else:
            report["invalid"] += 1
    report["s3_objects"] = len(files)
    report["missing"] = [name for name in sorted(files) if not media_exists(name)]
    return report


def migrate_media(repo):
    with repo._db() as db:
        ids = [
            row["id"]
            for row in db.execute(
                "SELECT id FROM products WHERE image_url LIKE 'data:%%' OR EXISTS(SELECT 1 FROM unnest(images) image WHERE image LIKE 'data:%%') OR variants::text LIKE '%%data:image%%'"
            ).fetchall()
        ]
    count = 0
    for product_id in ids:
        with repo._db() as db:
            row = db.execute(
                "SELECT image_url,images,variants FROM products WHERE id=%s FOR UPDATE",
                (product_id,),
            ).fetchone()
            if not row:
                continue
            memo = {}

            def convert(value):
                if value not in memo:
                    memo[value] = store_image(value)
                return memo[value]

            main = convert(row["image_url"])
            images = [convert(value) for value in row["images"]]
            variants = [
                {
                    **variant,
                    "images": [convert(value) for value in variant.get("images", [])],
                }
                for variant in row["variants"]
            ]
            db.execute(
                "UPDATE products SET image_url=%s,images=%s,variants=%s,updated_at=now() WHERE id=%s",
                (main, images, Jsonb(variants), product_id),
            )
            count += 1
    return count


def main():
    parser = argparse.ArgumentParser(description="Apex Store maintenance")
    parser.add_argument(
        "--env-file", help="Settings file; credentials are never printed"
    )
    parser.add_argument(
        "command", choices=["migrate-media", "upload-media", "check-media"]
    )
    parser.add_argument(
        "--directory", help="Existing local media directory for upload-media"
    )
    args = parser.parse_args()
    settings = Settings(_env_file=args.env_file) if args.env_file else get_settings()
    configure_media(settings)
    if args.command == "check-media" and settings.STORE_MEDIA_BACKEND != "s3":
        parser.error("Для проверки S3 установите STORE_MEDIA_BACKEND=s3 в .env")
    if args.command == "upload-media":
        count = upload_media_directory(args.directory or settings.STORE_MEDIA_ROOT)
        print(
            f"Uploaded/verified {count} WebP files; existing /media URLs were preserved."
        )
        return
    if args.command == "check-media":
        # Do not initialize the repository: its startup runs migrations/seeding.
        with psycopg.connect(
            **settings.postgresql_connection(), row_factory=dict_row
        ) as db:
            db.execute("SET TRANSACTION READ ONLY")
            rows = db.execute("SELECT image_url,images,variants FROM products").fetchall()
        report = check_product_media(rows)
        print(
            f"Products: {report['products']}; S3 photo URLs: {report['s3_photos']}; "
            f"S3 objects checked: {report['s3_objects']}"
        )
        print(
            f"Missing S3 objects: {len(report['missing'])}; "
            f"bundled images: {report['bundled']}; external URLs: {report['external']}; "
            f"inline photos: {report['inline']}; invalid URLs: {report['invalid']}"
        )
        for filename in report["missing"][:10]:
            print(f"Missing: /media/{filename}")
        if report["missing"] or report["inline"] or report["invalid"]:
            raise SystemExit(1)
        return
    repo = PostgreSQLRepository(
        settings.postgresql_connection(),
        SecretBox(settings.STORE_MASTER_KEY.get_secret_value()),
    )
    try:
        count = migrate_media(repo)
        print(
            f"Media migration complete: {count} products. Source prices and inventory were preserved."
        )
    finally:
        repo.pool.close()


if __name__ == "__main__":
    main()
