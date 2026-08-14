import json
from pathlib import Path

import psycopg
from psycopg.types.json import Jsonb
from psycopg.rows import dict_row

from store.domain import Integration, Product
from store.infrastructure.security import SecretBox


class PostgreSQLRepository:
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
        if migrate:
            self.migrate()

    def _db(self):
        if isinstance(self.connection, str):
            return self._psycopg.connect(self.connection, row_factory=self._dict_row)
        return self._psycopg.connect(**self.connection, row_factory=self._dict_row)

    def migrate(self) -> None:
        sql = (Path(__file__).parents[2] / "migrations" / "001_init.sql").read_text()
        with self._db() as db:
            db.execute(sql)

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
        )

    def list_products(self) -> list[Product]:
        query = """SELECT p.*, c.name AS category,
                   COALESCE(array_agg(s.size ORDER BY s.size) FILTER (WHERE s.size IS NOT NULL), '{}') AS sizes
                   FROM products p JOIN categories c ON c.id=p.category_id
                   LEFT JOIN product_sizes s ON s.product_id=p.id
                   GROUP BY p.id,c.name ORDER BY p.id DESC"""
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

    def save_product(self, product: Product) -> Product:
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
            )
            if product.id:
                db.execute(
                    """UPDATE products SET name=%s,description=%s,price=%s,category_id=%s,
                           image_url=%s,stock=%s,color=%s,images=%s,variants=%s,updated_at=now() WHERE id=%s""",
                    values + (product.id,),
                )
                db.execute(
                    "DELETE FROM product_sizes WHERE product_id=%s", (product.id,)
                )
            else:
                product.id = db.execute(
                    """INSERT INTO products(name,description,price,category_id,image_url,stock,color,images,variants)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id""",
                    values,
                ).fetchone()["id"]
            with db.cursor() as cursor:
                cursor.executemany(
                    "INSERT INTO product_sizes(product_id,size) VALUES(%s,%s)",
                    [(product.id, size) for size in product.sizes],
                )
        return product

    def delete_product(self, product_id: int) -> bool:
        with self._db() as db:
            return (
                db.execute("DELETE FROM products WHERE id=%s", (product_id,)).rowcount
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
                    json.dumps(secrets),
                ),
            )

    @staticmethod
    def _slug(value: str) -> str:
        import hashlib

        return (
            "category-" + hashlib.sha1(value.strip().lower().encode()).hexdigest()[:16]
        )
