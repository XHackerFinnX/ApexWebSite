import json
from pathlib import Path

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb
from psycopg_pool import ConnectionPool

from store.domain import Integration, Product
from store.infrastructure.commerce_repo import CommerceRepository
from store.infrastructure.media import normalize_product_media, store_image
from store.infrastructure.security import SecretBox


class PostgreSQLRepository(CommerceRepository):
    """PostgreSQL implementation of the application repository port."""

    def __init__(
        self, connection: str | dict[str, object], box: SecretBox, migrate: bool = True
    ):
        self._psycopg, self._dict_row, self.connection, self.box = (
            psycopg,
            dict_row,
            connection,
            box,
        )
        kwargs = {"row_factory": dict_row, "connect_timeout": 5}
        if isinstance(connection, dict):
            kwargs.update(connection)
        # Keep timestamps portable (including Windows) and detect dead idle
        # sessions before handing them to a request. Never retry a transaction
        # here: a write may already have committed before the connection failed.
        kwargs["options"] = (
            str(kwargs.get("options", "")) + " -c timezone=UTC"
        ).strip()
        self.pool = ConnectionPool(
            connection if isinstance(connection, str) else "",
            kwargs=kwargs,
            min_size=1,
            max_size=8,
            timeout=5,
            check=ConnectionPool.check_connection,
            open=True,
        )
        if migrate:
            self.migrate()

    def _db(self):
        return self.pool.connection()

    def check_connection(self):
        with self._db() as db:
            db.execute("SELECT 1").fetchone()

    def migrate(self) -> None:
        with self._db() as db:
            db.execute("SELECT pg_advisory_xact_lock(726415300)")
            db.execute(
                "CREATE TABLE IF NOT EXISTS schema_migrations(name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())"
            )
            for path in sorted(
                (Path(__file__).parents[2] / "migrations").glob("*.sql")
            ):
                if not db.execute(
                    "SELECT 1 FROM schema_migrations WHERE name=%s", (path.name,)
                ).fetchone():
                    db.execute(path.read_text(encoding="utf-8"))
                    db.execute(
                        "INSERT INTO schema_migrations(name) VALUES(%s)", (path.name,)
                    )

    @staticmethod
    def _product(row) -> Product:
        return Product(
            row["id"],
            row["name"],
            row["description"],
            row["price"],
            row["category"],
            tuple(row["sizes"] or []),
            row["image_url"],
            row["stock"],
            row["views"],
            row["cart_adds"],
            row["color"],
            tuple(row["images"] or ([row["image_url"]] if row["image_url"] else [])),
            tuple(row["variants"] or []),
            row["is_active"],
            row["is_new"],
        )

    def list_products(self, include_inactive: bool = False) -> list[Product]:
        query = """SELECT p.*, c.name AS category,
                   COALESCE(array_agg(s.size ORDER BY s.size) FILTER (WHERE s.size IS NOT NULL), '{}') AS sizes
                   FROM products p JOIN categories c ON c.id=p.category_id
                   LEFT JOIN product_sizes s ON s.product_id=p.id
                   {where}
                   GROUP BY p.id,c.name ORDER BY p.id DESC""".replace(
            "{where}", "" if include_inactive else "WHERE p.is_active = true"
        )
        with self._db() as db:
            return [self._product(row) for row in db.execute(query).fetchall()]

    def get_product(self, product_id: int) -> Product | None:
        query = """SELECT p.*, c.name AS category,
                   COALESCE(array_agg(s.size ORDER BY s.size) FILTER (WHERE s.size IS NOT NULL), '{}') AS sizes
                   FROM products p JOIN categories c ON c.id=p.category_id
                   LEFT JOIN product_sizes s ON s.product_id=p.id WHERE p.id=%s
                   GROUP BY p.id,c.name"""
        with self._db() as db:
            row = db.execute(query, (product_id,)).fetchone()
            return self._product(row) if row else None

    def catalog_page(
        self,
        include_inactive=False,
        limit=24,
        offset=0,
        search="",
        category="",
        size="",
        sort="featured",
    ):
        limit, offset = min(max(int(limit), 1), 100), max(int(offset), 0)
        where, args = ([] if include_inactive else ["p.is_active=true"]), []
        if search:
            where.append("(p.name ILIKE %s OR c.name ILIKE %s)")
            args.extend(["%" + str(search)[:100] + "%"] * 2)
        if category and category != "all":
            where.append("c.name=%s")
            args.append(category)
        if size and size != "all":
            where.append(
                "EXISTS(SELECT 1 FROM product_sizes ps WHERE ps.product_id=p.id AND ps.size=%s)"
            )
            args.append(size)
        clause = " WHERE " + " AND ".join(where) if where else ""
        ordering = {
            "price-asc": "p.price ASC,p.id DESC",
            "price-desc": "p.price DESC,p.id DESC",
            "featured": "(p.cart_adds*3+p.views) DESC,p.id DESC",
            "discount": "COALESCE((SELECT max((v->>'old_price')::numeric-(v->>'price')::numeric) FROM jsonb_array_elements(p.variants) v WHERE v->>'old_price' ~ '^[0-9]+([.][0-9]+)?$'),0) DESC,p.id DESC",
        }.get(sort, "p.id DESC")
        with self._db() as db:
            total = db.execute(
                "SELECT count(*) AS n FROM products p JOIN categories c ON c.id=p.category_id"
                + clause,
                args,
            ).fetchone()["n"]
            rows = list(
                db.execute(
                    """SELECT p.id,p.name,p.description,p.price,c.name AS category,
                p.stock,p.views,p.cart_adds,p.color,p.is_active,p.is_new,p.image_url,p.images,p.variants,
                ARRAY(SELECT ps.size FROM product_sizes ps WHERE ps.product_id=p.id ORDER BY ps.size) AS sizes
                FROM products p JOIN categories c ON c.id=p.category_id"""
                    + clause
                    + " ORDER BY "
                    + ordering
                    + " LIMIT %s OFFSET %s",
                    args + [limit, offset],
                ).fetchall()
            )
            for product in rows:
                # A complete product opens immediately from the catalog. Share one
                # gallery across sizes/colors instead of repeating photo URLs.
                photos, positions = [], {}

                def photo_indexes(images):
                    indexes = []
                    for image in images:
                        if not image:
                            continue
                        if image not in positions:
                            positions[image] = len(photos)
                            photos.append(image)
                        if positions[image] not in indexes:
                            indexes.append(positions[image])
                    return indexes

                photo_indexes(product["images"] or [product["image_url"]])
                variants = []
                for variant in product["variants"] or []:
                    variant = dict(variant)
                    variant["image_indexes"] = photo_indexes(variant.pop("images", []))
                    variants.append(variant)
                product.update(images=photos, variants=variants, details_complete=True)
            categories = list(
                db.execute(
                    "SELECT c.name FROM categories c WHERE EXISTS(SELECT 1 FROM products p WHERE p.category_id=c.id"
                    + ("" if include_inactive else " AND p.is_active")
                    + ") ORDER BY c.name"
                ).fetchall()
            )
            sizes = [
                r["size"]
                for r in db.execute(
                    "SELECT DISTINCT ps.size FROM product_sizes ps JOIN products p ON p.id=ps.product_id"
                    + ("" if include_inactive else " WHERE p.is_active")
                    + " ORDER BY ps.size"
                ).fetchall()
            ]
        return {
            "items": rows,
            "total": total,
            "limit": limit,
            "offset": offset,
            "categories": [c["name"] for c in categories],
            "sizes": sizes,
        }

    def catalog_stats(self):
        with self._db() as db:
            return db.execute(
                "SELECT count(*) AS count,COALESCE(sum(views),0) AS views,COALESCE(sum(cart_adds),0) AS adds,count(*) FILTER(WHERE stock<5) AS low_stock FROM products"
            ).fetchone()

    def save_product(self, product: Product) -> Product:
        normalize_product_media(product)
        with self._db() as db:
            category_id = db.execute(
                """INSERT INTO categories(name,slug) VALUES(%s,%s)
                   ON CONFLICT(name) DO UPDATE SET name=excluded.name RETURNING id""",
                (product.category, self._slug(product.category)),
            ).fetchone()["id"]
            values = (
                product.name,
                product.description,
                product.price,
                category_id,
                product.image_url,
                product.stock,
                product.color,
                list(product.images),
                Jsonb(list(product.variants)),
                product.is_active,
                product.is_new,
            )
            if product.id:
                db.execute(
                    """UPDATE products SET name=%s,description=%s,price=%s,category_id=%s,
                           image_url=%s,stock=%s,color=%s,images=%s,variants=%s,is_active=%s,is_new=%s,updated_at=now() WHERE id=%s""",
                    values + (product.id,),
                )
                db.execute(
                    "DELETE FROM product_sizes WHERE product_id=%s", (product.id,)
                )
            else:
                product.id = db.execute(
                    """INSERT INTO products(name,description,price,category_id,image_url,stock,color,images,variants,is_active,is_new)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id""",
                    values,
                ).fetchone()["id"]
            with db.cursor() as cursor:
                cursor.executemany(
                    "INSERT INTO product_sizes(product_id,size) VALUES(%s,%s)",
                    [(product.id, size) for size in dict.fromkeys(product.sizes)],
                )
        return product

    def delete_product(self, product_id: int) -> bool:
        with self._db() as db:
            if db.execute(
                "SELECT 1 FROM order_items WHERE product_id=%s LIMIT 1", (product_id,)
            ).fetchone():
                raise ValueError(
                    "Товар есть в заказах. Снимите его с публикации, чтобы сохранить историю"
                )
            return (
                db.execute("DELETE FROM products WHERE id=%s", (product_id,)).rowcount
                > 0
            )

    def list_categories(self) -> list[dict[str, object]]:
        with self._db() as db:
            return list(
                db.execute(
                    """SELECT c.id,c.name,c.slug,count(p.id)::int AS product_count
                       FROM categories c LEFT JOIN products p ON p.category_id=c.id
                       GROUP BY c.id ORDER BY c.name"""
                ).fetchall()
            )

    def list_reviews(self, limit: int = 10, offset: int = 0) -> dict[str, object]:
        """Return a lightweight review page; media is intentionally loaded separately."""
        limit = min(max(int(limit), 1), 50)
        offset = max(int(offset), 0)
        with self._db() as db:
            total = db.execute(
                "SELECT count(*)::int AS count FROM reviews WHERE is_published=true"
            ).fetchone()["count"]
            rows = db.execute(
                """SELECT id,author,title,body,rating,created_at,
                          EXISTS(SELECT 1 FROM review_images i WHERE i.review_id=reviews.id) AS has_images
                   FROM reviews WHERE is_published=true
                   ORDER BY created_at DESC,id DESC LIMIT %s OFFSET %s""",
                (limit, offset),
            ).fetchall()
        return {"items": list(rows), "total": total, "limit": limit, "offset": offset}

    def review_images(self, review_id: int) -> list[dict[str, object]]:
        with self._db() as db:
            published = db.execute(
                "SELECT 1 FROM reviews WHERE id=%s AND is_published=true", (review_id,)
            ).fetchone()
            if not published:
                raise LookupError("Отзыв не найден")
            return list(
                db.execute(
                    """SELECT id,image_url,alt_text FROM review_images
                   WHERE review_id=%s ORDER BY position,id""",
                    (review_id,),
                ).fetchall()
            )

    def list_admin_reviews(self) -> list[dict[str, object]]:
        with self._db() as db:
            return list(
                db.execute(
                    """SELECT id,author,title,body,rating,is_published,created_at
                   FROM reviews ORDER BY created_at DESC,id DESC"""
                ).fetchall()
            )

    def save_review(self, data: dict[str, object]) -> dict[str, object]:
        author = str(data.get("author", "")).strip()
        body = str(data.get("body", "")).strip()
        rating = int(data.get("rating", 5))
        if not author or not body:
            raise ValueError("Укажите автора и текст отзыва")
        if rating not in range(1, 6):
            raise ValueError("Оценка должна быть от 1 до 5")
        with self._db() as db:
            review_id = int(data.get("id") or 0)
            if review_id:
                row = db.execute(
                    "UPDATE reviews SET author=%s,title=%s,body=%s,rating=%s,is_published=%s WHERE id=%s RETURNING id,author,title,body,rating,is_published,created_at",
                    (
                        author,
                        str(data.get("title", "")).strip(),
                        body,
                        rating,
                        bool(data.get("is_published")),
                        review_id,
                    ),
                ).fetchone()
                if not row:
                    raise LookupError("Отзыв не найден")
                db.execute("DELETE FROM review_images WHERE review_id=%s", (review_id,))
            else:
                row = db.execute(
                    """INSERT INTO reviews(author,title,body,rating,is_published)
                   VALUES(%s,%s,%s,%s,%s)
                   RETURNING id,author,title,body,rating,is_published,created_at""",
                    (
                        author,
                        str(data.get("title", "")).strip(),
                        body,
                        rating,
                        bool(data.get("is_published", True)),
                    ),
                ).fetchone()
            for position, image_url in enumerate(data.get("images", []) or []):
                image_url = str(image_url).strip()
                if image_url:
                    db.execute(
                        """INSERT INTO review_images(review_id,image_url,alt_text,position)
                           VALUES(%s,%s,%s,%s)""",
                        (
                            row["id"],
                            store_image(image_url),
                            f"Фото от {author}",
                            position,
                        ),
                    )
            return row

    def admin_review(self, review_id):
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM reviews WHERE id=%s", (review_id,)
            ).fetchone()
            if not row:
                raise LookupError("Отзыв не найден")
            row["images"] = [
                r["image_url"]
                for r in db.execute(
                    "SELECT image_url FROM review_images WHERE review_id=%s ORDER BY position,id",
                    (review_id,),
                ).fetchall()
            ]
            return row

    def delete_review(self, review_id):
        with self._db() as db:
            return (
                db.execute("DELETE FROM reviews WHERE id=%s", (review_id,)).rowcount > 0
            )

    def update_category(self, category_id, name):
        name = str(name).strip()
        if not name or len(name) > 120:
            raise ValueError("Название категории должно содержать от 1 до 120 символов")
        try:
            with self._db() as db:
                row = db.execute(
                    "UPDATE categories SET name=%s,slug=%s WHERE id=%s RETURNING id,name,slug",
                    (name, self._slug(name), category_id),
                ).fetchone()
                if not row:
                    raise LookupError("Категория не найдена")
                return row
        except psycopg.errors.UniqueViolation as exc:
            raise ValueError("Категория с таким названием уже существует") from exc

    def save_category(self, name: str) -> dict[str, object]:
        name = name.strip()
        if not name:
            raise ValueError("Введите название категории")
        with self._db() as db:
            row = db.execute(
                """INSERT INTO categories(name,slug) VALUES(%s,%s)
                   ON CONFLICT(name) DO UPDATE SET name=excluded.name
                   RETURNING id,name,slug""",
                (name, self._slug(name)),
            ).fetchone()
            return {**row, "product_count": 0}

    def delete_category(self, category_id: int) -> bool:
        with self._db() as db:
            used = db.execute(
                "SELECT count(*) AS count FROM products WHERE category_id=%s",
                (category_id,),
            ).fetchone()["count"]
            if used:
                raise ValueError(f"Нельзя удалить категорию: в ней товаров — {used}")
            return (
                db.execute(
                    "DELETE FROM categories WHERE id=%s", (category_id,)
                ).rowcount
                > 0
            )

    def increment(self, product_id: int, metric: str) -> None:
        if metric not in {"views", "cart_adds"}:
            raise ValueError("invalid metric")
        with self._db() as db:
            db.execute(
                self._psycopg.sql.SQL(
                    "UPDATE products SET {metric}={metric}+1 WHERE id=%s"
                ).format(metric=self._psycopg.sql.Identifier(metric)),
                (product_id,),
            )

    def list_integrations(self) -> list[Integration]:
        with self._db() as db:
            rows = db.execute("SELECT * FROM integrations ORDER BY provider").fetchall()
            return [
                Integration(
                    row["provider"],
                    row["kind"],
                    row["enabled"],
                    row["public_config"],
                    {key: "••••••••" for key in row["secret_config"]},
                )
                for row in rows
            ]

    def save_integration(self, integration: Integration) -> None:
        with self._db() as db:
            old = db.execute(
                "SELECT secret_config FROM integrations WHERE provider=%s",
                (integration.provider,),
            ).fetchone()
            secrets = (
                {
                    key: self.box.encrypt(value)
                    for key, value in integration.secret_config.items()
                }
                if integration.secret_config
                else (old["secret_config"] if old else {})
            )
            db.execute(
                """INSERT INTO integrations(provider,kind,enabled,public_config,secret_config)
                       VALUES(%s,%s,%s,%s,%s) ON CONFLICT(provider) DO UPDATE SET kind=excluded.kind,
                       enabled=excluded.enabled,public_config=excluded.public_config,
                       secret_config=excluded.secret_config,updated_at=now()""",
                (
                    integration.provider,
                    integration.kind,
                    integration.enabled,
                    json.dumps(integration.public_config),
                    json.dumps({**(old["secret_config"] if old else {}), **secrets}),
                ),
            )

    def delete_integration(self, provider: str) -> bool:
        try:
            with self._db() as db:
                return (
                    db.execute(
                        "DELETE FROM integrations WHERE provider=%s", (provider,)
                    ).rowcount
                    > 0
                )
        except psycopg.errors.ForeignKeyViolation as exc:
            raise ValueError(
                "С интеграцией связаны заказы. Отключите её, чтобы сохранить историю оплат и доставки."
            ) from exc

    def get_integration_config(
        self, provider: str, enabled_only: bool = True
    ) -> dict[str, object] | None:
        """Return an enabled provider configuration, decrypting secrets server-side."""
        with self._db() as db:
            row = db.execute(
                "SELECT public_config,secret_config FROM integrations WHERE provider=%s"
                + (" AND enabled=true" if enabled_only else ""),
                (provider,),
            ).fetchone()
        if not row:
            return None
        return {
            **row["public_config"],
            **{
                key: self.box.decrypt(value)
                for key, value in row["secret_config"].items()
            },
        }

    @staticmethod
    def _slug(value: str) -> str:
        import hashlib

        return (
            "category-" + hashlib.sha1(value.strip().lower().encode()).hexdigest()[:16]
        )
