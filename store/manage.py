"""Explicit maintenance commands; no expensive media conversion at web startup."""

import argparse

from psycopg.types.json import Jsonb

from store.config import get_settings
from store.infrastructure.media import store_image
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
    parser.add_argument("command", choices=["migrate-media"])
    parser.parse_args()
    settings = get_settings()
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
