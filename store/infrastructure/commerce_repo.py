"""Customer accounts, promotions and transactional order benefits."""

import hashlib
import re
import secrets
from datetime import datetime, timedelta, timezone
from decimal import Decimal, InvalidOperation
from uuid import UUID

import psycopg
from psycopg.types.json import Jsonb

from store.infrastructure.security import hash_password, verify_password


class CommerceRepository:
    def loyalty_settings(self):
        with self._db() as db:
            return db.execute(
                "SELECT value FROM store_settings WHERE key='loyalty'"
            ).fetchone()["value"]

    def save_loyalty_settings(self, data):
        values = {
            key: int(data.get(key, default))
            for key, default in [("earn_percent", 5), ("redeem_percent", 20)]
        }
        if not all(0 <= value <= 100 for value in values.values()):
            raise ValueError("Проценты должны быть от 0 до 100")
        with self._db() as db:
            db.execute(
                "UPDATE store_settings SET value=%s WHERE key='loyalty'",
                (Jsonb(values),),
            )
        return values

    def register_customer(self, data):
        email = str(data.get("email", "")).strip().lower()
        name = str(data.get("name", "")).strip()
        if not re.fullmatch(r"[^\s@]{1,128}@[^\s@]{1,128}\.[^\s@]{2,64}", email):
            raise ValueError("Укажите корректный email")
        if not 2 <= len(name) <= 120:
            raise ValueError("Имя должно содержать от 2 до 120 символов")
        password = hash_password(str(data.get("password", "")))
        try:
            with self._db() as db:
                return db.execute(
                    "INSERT INTO customers(email,password_hash,name) VALUES(%s,%s,%s) RETURNING id,email,name,phone,points",
                    (email, password, name),
                ).fetchone()
        except psycopg.errors.UniqueViolation as exc:
            raise ValueError(
                "Этот email уже зарегистрирован. Войдите в кабинет"
            ) from exc

    def login_customer(self, email, password):
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM customers WHERE email=%s", (str(email).strip().lower(),)
            ).fetchone()
        # Do the same expensive work for unknown addresses to avoid timing leaks.
        dummy = "pbkdf2_sha256$600000$00000000000000000000000000000000$" + "0" * 64
        valid = verify_password(str(password), row["password_hash"] if row else dummy)
        if not row or not valid:
            raise ValueError("Неверный email или пароль")
        return {key: row[key] for key in ("id", "email", "name", "phone", "points")}

    def create_customer_session(self, customer_id):
        token = secrets.token_urlsafe(32)
        digest = hashlib.sha256(token.encode()).hexdigest()
        with self._db() as db:
            db.execute("DELETE FROM customer_sessions WHERE expires_at < now()")
            db.execute(
                "INSERT INTO customer_sessions(token_hash,customer_id,expires_at) VALUES(%s,%s,%s)",
                (digest, customer_id, datetime.now(timezone.utc) + timedelta(days=30)),
            )
        return token

    def customer_for_session(self, token):
        if not token or len(token) > 128:
            return None
        with self._db() as db:
            return db.execute(
                "SELECT c.id,c.email,c.name,c.phone,c.points FROM customer_sessions s JOIN customers c ON c.id=s.customer_id WHERE token_hash=%s AND expires_at>now()",
                (hashlib.sha256(token.encode()).hexdigest(),),
            ).fetchone()

    def logout_customer(self, token):
        with self._db() as db:
            db.execute(
                "DELETE FROM customer_sessions WHERE token_hash=%s",
                (hashlib.sha256(token.encode()).hexdigest(),),
            )

    def update_customer(self, customer_id, data):
        name, phone = (
            str(data.get("name", "")).strip(),
            str(data.get("phone", "")).strip(),
        )
        if not 2 <= len(name) <= 120 or len(phone) > 40:
            raise ValueError("Проверьте имя и телефон")
        with self._db() as db:
            db.execute(
                "UPDATE customers SET name=%s,phone=%s WHERE id=%s",
                (name, phone, customer_id),
            )
            if data.get("new_password"):
                row = db.execute(
                    "SELECT password_hash FROM customers WHERE id=%s FOR UPDATE",
                    (customer_id,),
                ).fetchone()
                if not verify_password(
                    str(data.get("current_password", "")), row["password_hash"]
                ):
                    raise ValueError("Текущий пароль неверен")
                db.execute(
                    "UPDATE customers SET password_hash=%s WHERE id=%s",
                    (hash_password(str(data["new_password"])), customer_id),
                )
                db.execute(
                    "DELETE FROM customer_sessions WHERE customer_id=%s", (customer_id,)
                )

    def customer_history(self, customer_id):
        with self._db() as db:
            orders = list(
                db.execute(
                    """SELECT o.id,o.status,o.total,o.subtotal,o.discount,o.shipping,
                    o.promo_code,o.points_spent,o.points_earned,o.fulfillment,
                    o.tracking_number,o.delivery_details,o.created_at,
                    r.id AS review_id,r.is_published AS review_published
                    FROM orders o LEFT JOIN reviews r ON r.order_id=o.id
                    WHERE o.customer_id=%s ORDER BY o.created_at DESC LIMIT 100""",
                    (customer_id,),
                ).fetchall()
            )
            self._attach_order_items(db, orders)
            stats = db.execute(
                """SELECT count(*) AS total_orders,
                count(*) FILTER (WHERE status IN ('NEW','AUTHORIZED','CONFIRMED')
                  AND fulfillment <> 'delivered') AS active_orders,
                coalesce(sum(total) FILTER (WHERE status='CONFIRMED'),0) AS paid_total
                FROM orders WHERE customer_id=%s""",
                (customer_id,),
            ).fetchone()
            ledger = list(
                db.execute(
                    "SELECT order_id,kind,amount,created_at FROM loyalty_ledger WHERE customer_id=%s ORDER BY created_at DESC,id DESC LIMIT 100",
                    (customer_id,),
                ).fetchall()
            )
        return {"orders": orders, "ledger": ledger, "stats": stats}

    def submit_customer_review(self, customer_id, data):
        try:
            order_id = UUID(str(data.get("order_id", "")))
        except (ValueError, TypeError) as exc:
            raise ValueError("Выберите заказ для отзыва") from exc
        title = str(data.get("title", "")).strip()
        body = str(data.get("body", "")).strip()
        rating = data.get("rating", 5)
        if isinstance(rating, bool) or str(rating) not in {"1", "2", "3", "4", "5"}:
            raise ValueError("Оценка должна быть от 1 до 5")
        if not 10 <= len(body) <= 5000 or len(title) > 160:
            raise ValueError("Текст отзыва: от 10 до 5000 символов; заголовок — до 160")
        with self._db() as db:
            # The order lock serializes duplicate submissions and payment updates.
            order = db.execute(
                "SELECT status FROM orders WHERE id=%s AND customer_id=%s FOR UPDATE",
                (order_id, customer_id),
            ).fetchone()
            if not order:
                raise ValueError("Заказ не найден")
            if order["status"] != "CONFIRMED":
                raise ValueError("Отзыв доступен после подтверждения оплаты заказа")
            if db.execute(
                "SELECT 1 FROM reviews WHERE order_id=%s", (order_id,)
            ).fetchone():
                raise ValueError("Отзыв на этот заказ уже отправлен")
            customer = db.execute(
                "SELECT name FROM customers WHERE id=%s", (customer_id,)
            ).fetchone()
            return db.execute(
                """INSERT INTO reviews(customer_id,order_id,author,title,body,rating,is_published)
                VALUES(%s,%s,%s,%s,%s,%s,false)
                RETURNING id,order_id,rating,is_published,created_at""",
                (
                    customer_id,
                    order_id,
                    customer["name"] or "Покупатель APEX",
                    title,
                    body,
                    int(rating),
                ),
            ).fetchone()

    @staticmethod
    def _attach_order_items(db, orders):
        by_id = {order["id"]: order for order in orders}
        for order in orders:
            order["items"] = []
        if not orders:
            return
        for item in db.execute(
            """SELECT i.order_id,coalesce(nullif(i.name,''),p.name,'Товар') AS name,
            i.size,i.color,i.quantity,i.unit_price,
            CASE WHEN i.name='' AND i.line_total=0 THEN i.unit_price*i.quantity
                 ELSE i.line_total END AS line_total
            FROM order_items i LEFT JOIN products p ON p.id=i.product_id
            WHERE i.order_id=ANY(%s) ORDER BY i.id""",
            (list(by_id),),
        ).fetchall():
            by_id[item["order_id"]]["items"].append(
                {key: value for key, value in item.items() if key != "order_id"}
            )

    def list_promotions(self):
        with self._db() as db:
            return list(
                db.execute(
                    "SELECT p.*,pr.name AS product_name FROM promotions p JOIN products pr ON pr.id=p.product_id ORDER BY p.id DESC"
                ).fetchall()
            )

    def save_promotion(self, data, promotion_id=None):
        code = str(data.get("code", "")).strip().upper()
        kind = str(data.get("discount_type", "percent"))
        try:
            value = Decimal(str(data.get("value", 0)))
        except InvalidOperation as exc:
            raise ValueError("Некорректная скидка") from exc
        if (
            not re.fullmatch(r"[A-Z0-9_-]{3,40}", code)
            or kind not in {"percent", "fixed"}
            or not value.is_finite()
            or value <= 0
            or (kind == "percent" and value > 100)
        ):
            raise ValueError(
                "Проверьте код (3–40 латинских символов), тип и размер скидки"
            )
        starts = (
            datetime.fromisoformat(str(data["starts_at"]))
            if data.get("starts_at")
            else None
        )
        ends = (
            datetime.fromisoformat(str(data["ends_at"]))
            if data.get("ends_at")
            else None
        )
        if (starts and starts.tzinfo is None) or (ends and ends.tzinfo is None):
            raise ValueError("Укажите часовой пояс дат промокода")
        if starts and ends and ends <= starts:
            raise ValueError("Дата окончания должна быть позже начала")
        maximum = int(data["max_uses"]) if data.get("max_uses") else None
        if maximum is not None and maximum < 1:
            raise ValueError("Лимит применений должен быть положительным")
        values = (
            code,
            int(data.get("product_id", 0)),
            kind,
            value,
            bool(data.get("enabled", True)),
            starts,
            ends,
            maximum,
        )
        try:
            with self._db() as db:
                if promotion_id:
                    row = db.execute(
                        "UPDATE promotions SET code=%s,product_id=%s,discount_type=%s,value=%s,enabled=%s,starts_at=%s,ends_at=%s,max_uses=%s WHERE id=%s RETURNING *",
                        values + (promotion_id,),
                    ).fetchone()
                    if not row:
                        raise LookupError("Промокод не найден")
                else:
                    row = db.execute(
                        "INSERT INTO promotions(code,product_id,discount_type,value,enabled,starts_at,ends_at,max_uses) VALUES(%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *",
                        values,
                    ).fetchone()
                return row
        except psycopg.errors.UniqueViolation as exc:
            raise ValueError("Такой промокод уже существует") from exc
        except psycopg.errors.ForeignKeyViolation as exc:
            raise ValueError("Выберите существующий товар") from exc

    def get_promotion(self, code):
        with self._db() as db:
            return db.execute(
                "SELECT * FROM promotions WHERE code=%s AND enabled AND (starts_at IS NULL OR starts_at<=now()) AND (ends_at IS NULL OR ends_at>now()) AND (max_uses IS NULL OR uses<max_uses)",
                (str(code).strip().upper(),),
            ).fetchone()

    def delete_promotion(self, promotion_id):
        with self._db() as db:
            return (
                db.execute(
                    "DELETE FROM promotions WHERE id=%s", (promotion_id,)
                ).rowcount
                > 0
            )

    def create_order(self, order, items):
        with self._db() as db:
            db.execute(
                "SELECT pg_advisory_xact_lock(hashtextextended(%s,0))",
                (order["idempotency_key"],),
            )
            previous = db.execute(
                "SELECT * FROM orders WHERE idempotency_key=%s FOR UPDATE",
                (order["idempotency_key"],),
            ).fetchone()
            if previous:
                if (
                    previous["customer_email"] != order["customer_email"]
                    or previous["customer_id"] != order.get("customer_id")
                    or previous["checkout_digest"] != order.get("checkout_digest", "")
                ):
                    raise ValueError("Ключ заказа уже использован. Обновите корзину")
                return dict(previous)
            if order.get("customer_id"):
                customer = db.execute(
                    "SELECT points FROM customers WHERE id=%s FOR UPDATE",
                    (order["customer_id"],),
                ).fetchone()
                if not customer or customer["points"] < order.get("points_spent", 0):
                    raise ValueError("Недостаточно баллов. Обновите расчёт заказа")
            if order.get("promo_id"):
                promotion = db.execute(
                    "SELECT * FROM promotions WHERE id=%s FOR UPDATE",
                    (order["promo_id"],),
                ).fetchone()
                now = datetime.now(timezone.utc)
                if (
                    not promotion
                    or not promotion["enabled"]
                    or (promotion["starts_at"] and promotion["starts_at"] > now)
                    or (promotion["ends_at"] and promotion["ends_at"] <= now)
                    or (
                        promotion["max_uses"] is not None
                        and promotion["uses"] >= promotion["max_uses"]
                    )
                ):
                    raise ValueError("Промокод больше недоступен")
                if (
                    promotion["discount_type"] != order.get("promo_type")
                    or promotion["value"] != order.get("promo_value")
                    or promotion["product_id"] != order.get("promo_product_id")
                ):
                    raise ValueError("Условия промокода изменились. Повторите расчёт")
                db.execute(
                    "UPDATE promotions SET uses=uses+1 WHERE id=%s", (promotion["id"],)
                )
            self._reserve_inventory(db, items)
            columns = [
                "id",
                "status",
                "customer_email",
                "total",
                "payment_provider",
                "idempotency_key",
                "customer_id",
                "subtotal",
                "discount",
                "shipping",
                "promo_id",
                "promo_code",
                "points_spent",
                "points_earned",
                "customer_details",
                "delivery_details",
                "checkout_digest",
                "inventory_reserved",
            ]
            defaults = {
                "customer_id": None,
                "subtotal": order["total"],
                "discount": 0,
                "shipping": 0,
                "promo_id": None,
                "promo_code": "",
                "points_spent": 0,
                "points_earned": 0,
                "customer_details": {},
                "delivery_details": {},
                "checkout_digest": "",
                "inventory_reserved": True,
            }
            values = [order.get(key, defaults.get(key)) for key in columns]
            values = [
                Jsonb(value) if key.endswith("_details") else value
                for key, value in zip(columns, values)
            ]
            row = db.execute(
                "INSERT INTO orders("
                + ",".join(columns)
                + ") VALUES("
                + ",".join(["%s"] * len(columns))
                + ") RETURNING *",
                values,
            ).fetchone()
            with db.cursor() as cursor:
                cursor.executemany(
                    "INSERT INTO order_items(order_id,product_id,size,color,sku,name,quantity,unit_price,line_total,weight,dimensions) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    [
                        (
                            order["id"],
                            i["product_id"],
                            i.get("size", ""),
                            i.get("color", ""),
                            i.get("sku", ""),
                            i["name"],
                            i["quantity"],
                            i["unit_price"],
                            i.get("line_total", i["unit_price"] * i["quantity"]),
                            int(i.get("weight") or 0),
                            str(i.get("dimensions") or ""),
                        )
                        for i in items
                    ],
                )
            if order.get("points_spent"):
                self._points(
                    db,
                    order["customer_id"],
                    order["id"],
                    "redeem",
                    -order["points_spent"],
                )
            return dict(row)

    def checkout_order(self, key, email, customer_id, digest):
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM orders WHERE idempotency_key=%s", (key,)
            ).fetchone()
            if row:
                if (
                    row["customer_email"] != email
                    or row["customer_id"] != customer_id
                    or row["checkout_digest"] != digest
                ):
                    raise ValueError("Ключ заказа уже использован. Обновите корзину")
                row["items"] = list(
                    db.execute(
                        "SELECT * FROM order_items WHERE order_id=%s ORDER BY id",
                        (row["id"],),
                    ).fetchall()
                )
            return row

    def claim_payment(self, order_id):
        with self._db() as db:
            return bool(
                db.execute(
                    "UPDATE orders SET status='INITIALIZING',updated_at=now() WHERE id=%s AND (status IN ('NEW','INIT_ERROR') OR (status='INITIALIZING' AND updated_at<now()-interval '90 seconds')) RETURNING id",
                    (order_id,),
                ).fetchone()
            )

    def payment_initialization_failed(self, order_id):
        with self._db() as db:
            db.execute(
                "UPDATE orders SET status='INIT_ERROR',updated_at=now() WHERE id=%s AND status='INITIALIZING'",
                (order_id,),
            )

    def payment_order(self, payment_id):
        with self._db() as db:
            return db.execute(
                "SELECT * FROM orders WHERE external_payment_id=%s", (payment_id,)
            ).fetchone()

    def _reserve_inventory(self, db, items, restore=False):
        for product_id in sorted({i["product_id"] for i in items}):
            row = db.execute(
                "SELECT * FROM products WHERE id=%s FOR UPDATE", (product_id,)
            ).fetchone()
            if not row or (not restore and not row["is_active"]):
                raise ValueError("Товар недоступен")
            variants = row["variants"]
            stock = row["stock"]
            for item in [i for i in items if i["product_id"] == product_id]:
                variant = next(
                    (
                        v
                        for v in variants
                        if v.get("color", "") == item.get("color", "")
                        and v.get("size", "") == item.get("size", "")
                    ),
                    None,
                )
                available = int(variant["stock"]) if variant else stock
                if not restore:
                    price = Decimal(str(variant["price"] if variant else row["price"]))
                    if (
                        (variants and not variant)
                        or price != item["unit_price"]
                        or available < item["quantity"]
                    ):
                        raise ValueError(
                            "Цена или остаток изменились. Обновите корзину"
                        )
                delta = item["quantity"] if restore else -item["quantity"]
                stock += delta
                if variant:
                    variant["stock"] = int(variant["stock"]) + delta
            db.execute(
                "UPDATE products SET stock=%s,variants=%s,updated_at=now() WHERE id=%s",
                (stock, Jsonb(variants), product_id),
            )

    @staticmethod
    def _points(db, customer_id, order_id, kind, amount):
        inserted = db.execute(
            "INSERT INTO loyalty_ledger(customer_id,order_id,kind,amount) VALUES(%s,%s,%s,%s) ON CONFLICT(order_id,kind) DO NOTHING RETURNING id",
            (customer_id, order_id, kind, amount),
        ).fetchone()
        if inserted:
            db.execute(
                "UPDATE customers SET points=points+%s WHERE id=%s",
                (amount, customer_id),
            )

    def set_order_payment(self, order_id, payment_id, status, payment_url=""):
        with self._db() as db:
            db.execute(
                "UPDATE orders SET external_payment_id=%s,status=%s,payment_url=%s,updated_at=now() WHERE id=%s AND status NOT IN ('CONFIRMED','REFUNDED','REVERSED')",
                (payment_id, status, payment_url, order_id),
            )

    def update_order_by_payment(self, payment_id, status):
        allowed = {
            "NEW",
            "FORM_SHOWED",
            "AUTHORIZING",
            "3DS_CHECKING",
            "3DS_CHECKED",
            "AUTHORIZED",
            "CONFIRMING",
            "CONFIRMED",
            "CANCELED",
            "REJECTED",
            "DEADLINE_EXPIRED",
            "REFUNDED",
            "REVERSED",
            "PARTIAL_REFUNDED",
        }
        if status not in allowed:
            raise ValueError("Неизвестный статус платежа")
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM orders WHERE external_payment_id=%s FOR UPDATE",
                (payment_id,),
            ).fetchone()
            if not row:
                return False
            terminal = {
                "CANCELED",
                "REJECTED",
                "DEADLINE_EXPIRED",
                "REFUNDED",
                "REVERSED",
            }
            if row["status"] in terminal or (
                row["status"] == "CONFIRMED"
                and status
                not in {"CONFIRMED", "REFUNDED", "REVERSED", "PARTIAL_REFUNDED"}
            ):
                return True
            if row["customer_id"]:
                db.execute(
                    "SELECT id FROM customers WHERE id=%s FOR UPDATE",
                    (row["customer_id"],),
                )
                if status == "CONFIRMED":
                    self._points(
                        db, row["customer_id"], row["id"], "earn", row["points_earned"]
                    )
            if status in terminal and not row["benefits_released"]:
                if row["customer_id"]:
                    if row["points_spent"]:
                        self._points(
                            db,
                            row["customer_id"],
                            row["id"],
                            "redeem_return",
                            row["points_spent"],
                        )
                    earned = db.execute(
                        "SELECT 1 FROM loyalty_ledger WHERE order_id=%s AND kind='earn'",
                        (row["id"],),
                    ).fetchone()
                    if earned:
                        self._points(
                            db,
                            row["customer_id"],
                            row["id"],
                            "earn_return",
                            -row["points_earned"],
                        )
                if row["promo_id"]:
                    db.execute(
                        "UPDATE promotions SET uses=greatest(uses-1,0) WHERE id=%s",
                        (row["promo_id"],),
                    )
                items = list(
                    db.execute(
                        "SELECT * FROM order_items WHERE order_id=%s", (row["id"],)
                    ).fetchall()
                )
                if row["inventory_reserved"]:
                    self._reserve_inventory(db, items, restore=True)
                db.execute(
                    "UPDATE orders SET benefits_released=true WHERE id=%s", (row["id"],)
                )
            db.execute(
                "UPDATE orders SET status=%s,updated_at=now() WHERE id=%s",
                (status, row["id"]),
            )
            return True

    def get_order(self, order_id):
        with self._db() as db:
            return db.execute(
                "SELECT id,status,total,created_at FROM orders WHERE id=%s", (order_id,)
            ).fetchone()

    def list_admin_orders(self):
        with self._db() as db:
            orders = list(
                db.execute(
                    """SELECT o.id,o.status,o.total,o.customer_email,o.customer_details,
                    o.delivery_details,o.fulfillment,o.tracking_number,o.promo_code,
                    o.points_spent,o.created_at,d.external_id AS cdek_uuid,
                    d.status AS cdek_status,d.error AS cdek_error
                    FROM orders o LEFT JOIN deliveries d ON d.order_id=o.id AND d.provider='cdek'
                    ORDER BY o.created_at DESC LIMIT 200"""
                ).fetchall()
            )
            self._attach_order_items(db, orders)
            return orders

    def shipping_order(self, order_id):
        with self._db() as db:
            order = db.execute(
                "SELECT * FROM orders WHERE id=%s", (order_id,)
            ).fetchone()
            if not order:
                raise LookupError("Заказ не найден")
            order["items"] = list(
                db.execute(
                    "SELECT * FROM order_items WHERE order_id=%s ORDER BY id",
                    (order_id,),
                ).fetchall()
            )
            return order

    def cdek_shipment(self, order_id):
        with self._db() as db:
            return db.execute(
                "SELECT * FROM deliveries WHERE order_id=%s AND provider='cdek'",
                (order_id,),
            ).fetchone()

    def claim_cdek_shipment(self, order_id, payload, account_key):
        # Commit the claim BEFORE sending anything. A process crash or ambiguous
        # provider response leaves a durable record that prevents duplicate POSTs.
        with self._db() as db:
            order = db.execute(
                "SELECT * FROM orders WHERE id=%s FOR UPDATE", (order_id,)
            ).fetchone()
            if not order:
                raise LookupError("Заказ не найден")
            if order["status"] != "CONFIRMED" or order["delivery_details"].get(
                "type"
            ) not in {"pvz", "cdek"}:
                raise ValueError(
                    "Создание СДЭК доступно для оплаченного заказа с доставкой в ПВЗ"
                )
            previous = db.execute(
                "SELECT * FROM deliveries WHERE order_id=%s", (order_id,)
            ).fetchone()
            if previous and (
                previous["provider"] != "cdek"
                or previous["status"] not in {"FAILED", "INVALID"}
            ):
                return previous, False
            row = db.execute(
                """INSERT INTO deliveries(order_id,provider,status,address,request_payload,account_key)
                VALUES(%s,'cdek','CREATING',%s,%s,%s)
                ON CONFLICT(order_id) DO UPDATE SET status='CREATING',request_payload=excluded.request_payload,
                account_key=excluded.account_key,external_id=NULL,tracking_number=NULL,error='',updated_at=now() RETURNING *""",
                (
                    order_id,
                    Jsonb(order["delivery_details"]),
                    Jsonb(payload),
                    account_key,
                ),
            ).fetchone()
            return row, True

    def save_cdek_shipment(self, order_id, result, expected_updated_at=None):
        with self._db() as db:
            db.execute("SELECT id FROM orders WHERE id=%s FOR UPDATE", (order_id,))
            previous = db.execute(
                "SELECT * FROM deliveries WHERE order_id=%s AND provider='cdek' FOR UPDATE",
                (order_id,),
            ).fetchone()
            if (
                previous
                and expected_updated_at is not None
                and previous["updated_at"] != expected_updated_at
            ):
                return previous
            row = db.execute(
                """UPDATE deliveries SET external_id=coalesce(%s,external_id),status=%s,
                tracking_number=coalesce(nullif(%s,''),tracking_number),error=%s,updated_at=clock_timestamp()
                WHERE order_id=%s AND provider='cdek' RETURNING *""",
                (
                    result.get("external_id"),
                    result["status"],
                    result.get("tracking_number", ""),
                    result.get("error", ""),
                    order_id,
                ),
            ).fetchone()
            if not row:
                raise LookupError("Отправление не найдено")
            if row.get("tracking_number") and row["status"] not in {
                "INVALID",
                "REMOVED",
                "CANCEL_PENDING",
            }:
                db.execute(
                    "UPDATE orders SET tracking_number=%s,updated_at=now() WHERE id=%s",
                    (row["tracking_number"], order_id),
                )
            if row["status"] == "DELIVERED":
                db.execute(
                    "UPDATE orders SET fulfillment='delivered' WHERE id=%s", (order_id,)
                )
            elif row["status"] == "RECEIVED_AT_SHIPMENT_WAREHOUSE":
                db.execute(
                    "UPDATE orders SET fulfillment='shipped' WHERE id=%s AND fulfillment IN ('new','packing')",
                    (order_id,),
                )
            return row

    def update_fulfillment(self, order_id, data):
        state = str(data.get("fulfillment", "new"))
        tracking = str(data.get("tracking_number", "")).strip()
        if (
            state not in {"new", "packing", "shipped", "delivered"}
            or len(tracking) > 120
        ):
            raise ValueError("Проверьте статус и трек-номер")
        with self._db() as db:
            row = db.execute(
                "UPDATE orders SET fulfillment=%s,tracking_number=%s,updated_at=now() WHERE id=%s RETURNING id",
                (state, tracking, order_id),
            ).fetchone()
            if not row:
                raise LookupError("Заказ не найден")
        return {"ok": True}
