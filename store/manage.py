"""Explicit maintenance commands; no expensive media conversion at web startup."""

import argparse

from psycopg.types.json import Jsonb

from store.config import Settings, get_settings
from store.infrastructure.media import (
    configure_media,
    store_image,
    upload_media_directory,
)
from store.infrastructure.postgres_repo import PostgreSQLRepository
from store.infrastructure.security import SecretBox


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
    parser.add_argument("command", choices=["migrate-media", "upload-media"])
    parser.add_argument(
        "--directory", help="Existing local media directory for upload-media"
    )
    args = parser.parse_args()
    settings = Settings(_env_file=args.env_file) if args.env_file else get_settings()
    configure_media(settings)
    if args.command == "upload-media":
        count = upload_media_directory(args.directory or settings.STORE_MEDIA_ROOT)
        print(
            f"Uploaded/verified {count} WebP files; existing /media URLs were preserved."
        )
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
