"""Durable order jobs, provider audit events and filtered administration queries."""

import hashlib
import json
from datetime import datetime, timedelta, timezone
from decimal import Decimal, InvalidOperation
from uuid import UUID, uuid4

from psycopg.types.json import Jsonb
from store.domain.payment_mode import bank_is_test


class OrderRepository:
    @staticmethod
    def _enqueue_job(db, order_id, kind, delay=0):
        db.execute(
            """INSERT INTO order_jobs(order_id,kind,due_at) VALUES(%s,%s,now()+%s*interval '1 second')
               ON CONFLICT(order_id,kind) DO NOTHING""",
            (order_id, kind, delay),
        )

    def payment_context(self, order_id):
        return self.shipping_order(str(UUID(str(order_id))))

    def bind_payment_context(self, order_id, config):
        public = {
            key: config[key]
            for key in (
                "environment",
                "taxation",
                "item_tax",
                "delivery_tax",
                "language",
                "pay_type",
                "receipt_enabled",
                "ffd_version",
            )
            if key in config
        }
        public["is_test"] = bank_is_test(config)
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM orders WHERE id=%s FOR UPDATE", (order_id,)
            ).fetchone()
            if not row:
                raise LookupError("Заказ не найден")
            if (
                row["payment_terminal_key"]
                and row["payment_terminal_key"] != str(config["terminal_key"]).strip()
            ):
                raise ValueError("Для заказа восстановите исходный терминал Т-Банка")
            db.execute(
                """UPDATE orders SET payment_settings=%s,payment_terminal_key=%s,payment_password=%s WHERE id=%s AND payment_terminal_key=''""",
                (
                    Jsonb(public),
                    str(config["terminal_key"]).strip(),
                    self.box.encrypt(str(config["password"])),
                    order_id,
                ),
            )
            self._enqueue_job(db, order_id, "payment_sync", 90)

    def payment_configuration(self, order, *, original_password=False):
        terminal = order.get("payment_terminal_key")
        if terminal and order.get("payment_password"):
            password = self.box.decrypt(order["payment_password"])
            current = (
                self.get_integration_config("tbank", enabled_only=False) or {}
                if not original_password
                else {}
            )
            if not original_password and current.get("terminal_key") == terminal:
                password = current.get("password") or password
            return {
                **order.get("payment_settings", {}),
                "terminal_key": terminal,
                "password": password,
            }
        current = self.get_integration_config("tbank", enabled_only=False) or {}
        if not current or (
            terminal and terminal != str(current.get("terminal_key", "")).strip()
        ):
            raise ValueError(
                "Для старого заказа восстановите исходные настройки терминала Т-Банка"
            )
        return {**current, **order.get("payment_settings", {})}

    def mark_payment_error(self, order_id, message, ambiguous=False):
        with self._db() as db:
            db.execute(
                """UPDATE orders SET status=%s,payment_error=%s,updated_at=now()
                   WHERE id=%s AND status='INITIALIZING'""",
                (
                    "INIT_UNKNOWN" if ambiguous else "INIT_ERROR",
                    str(message)[:1000],
                    order_id,
                ),
            )
            self._enqueue_job(db, order_id, "payment_sync", 30 if ambiguous else 90)

    def record_payment_check(self, order_id, error=""):
        with self._db() as db:
            db.execute(
                "UPDATE orders SET payment_last_checked_at=now(),payment_error=%s WHERE id=%s",
                (str(error)[:1000], order_id),
            )

    def request_payment_sync(self, order_id):
        with self._db() as db:
            db.execute(
                """UPDATE order_jobs j SET due_at=now() FROM orders o
                WHERE j.order_id=o.id AND o.id=%s AND j.kind='payment_sync' AND j.state='pending'
                AND o.status NOT IN ('CONFIRMED','REFUNDED','PARTIAL_REFUNDED','CANCELED','REJECTED','REVERSED','DEADLINE_EXPIRED')
                AND (o.external_payment_id IS NOT NULL OR o.updated_at<now()-interval '90 seconds')
                AND (o.payment_last_checked_at IS NULL OR o.payment_last_checked_at<now()-interval '15 seconds')""",
                (order_id,),
            )

    def recover_empty_payment(self, order_id):
        with self._db() as db:
            db.execute(
                """UPDATE orders SET status='INIT_ERROR',payment_error='Банк не зарегистрировал платёж. Можно повторить оплату.'
                WHERE id=%s AND external_payment_id IS NULL AND status IN ('INIT_UNKNOWN','INITIALIZING')
                AND updated_at<now()-interval '90 seconds'""",
                (order_id,),
            )

    def find_notification_order(self, data):
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM orders WHERE external_payment_id=%s",
                (str(data.get("PaymentId", "")),),
            ).fetchone()
            if not row:
                try:
                    order_id = str(UUID(str(data.get("OrderId", ""))))
                except ValueError:
                    return None
                row = db.execute(
                    "SELECT * FROM orders WHERE id=%s", (order_id,)
                ).fetchone()
            return row

    def attach_notification_payment(self, order_id, payment_id):
        with self._db() as db:
            row = db.execute(
                "SELECT external_payment_id FROM orders WHERE id=%s FOR UPDATE",
                (order_id,),
            ).fetchone()
            if row["external_payment_id"] not in (None, "", payment_id):
                raise ValueError("Идентификатор платежа не совпадает с заказом")
            db.execute(
                "UPDATE orders SET external_payment_id=%s WHERE id=%s",
                (payment_id, order_id),
            )

    @staticmethod
    def _record_event(db, order_id, kind, data):
        # Passwords, authentication tokens and bank card details are never stored.
        clean = {
            key: value
            for key, value in data.items()
            if key not in {"Token", "Password", "Pan", "CardId", "RebillId", "ExpDate"}
        }
        encoded = json.dumps(clean, ensure_ascii=False, sort_keys=True, default=str)
        digest = hashlib.sha256((str(order_id) + kind + encoded).encode()).hexdigest()
        db.execute(
            "INSERT INTO payment_events(digest,order_id,kind,payload) VALUES(%s,%s,%s,%s) ON CONFLICT DO NOTHING",
            (digest, order_id, kind, Jsonb(clean)),
        )

    def record_payment_event(self, order_id, data):
        with self._db() as db:
            self._record_event(db, order_id, "payment", data)

    def record_receipt(self, order_id, data):
        with self._db() as db:
            db.execute("SELECT id FROM orders WHERE id=%s FOR UPDATE", (order_id,))
            self._record_event(db, order_id, "receipt", data)
            receipt = (
                data.get("Receipt") if isinstance(data.get("Receipt"), dict) else data
            )
            url = str(
                receipt.get("ReceiptUrl")
                or receipt.get("ReceiptURL")
                or receipt.get("Url")
                or data.get("ReceiptUrl")
                or data.get("ReceiptURL")
                or data.get("Url")
                or ""
            )
            from urllib.parse import urlparse

            if urlparse(url).scheme != "https":
                url = ""
            success = receipt.get(
                "Success", data.get("Success")
            ) is True and receipt.get("ErrorCode") in (None, "", 0, "0")
            error = (
                str(data.get("Message") or data.get("Details") or "")[:1000]
                if not success
                else ""
            )
            db.execute(
                """UPDATE orders SET receipt_status=%s,receipt_url=CASE WHEN %s<>'' THEN %s ELSE receipt_url END,
                   receipt_error=%s WHERE id=%s AND (receipt_status<>'SUCCESS' OR %s='SUCCESS')""",
                (
                    "SUCCESS" if success else "ERROR",
                    url,
                    url,
                    error,
                    order_id,
                    "SUCCESS" if success else "ERROR",
                ),
            )
        return True

    def claim_order_job(self):
        with self._db() as db:
            row = db.execute(
                """SELECT * FROM order_jobs WHERE (state='pending' AND due_at<=now())
                   OR (state='running' AND locked_at<now()-interval '180 seconds')
                   ORDER BY due_at,id FOR UPDATE SKIP LOCKED LIMIT 1"""
            ).fetchone()
            if not row:
                return None
            return db.execute(
                """UPDATE order_jobs SET state='running',attempts=attempts+1,locked_at=now(),lease_token=%s,updated_at=now()
                   WHERE id=%s RETURNING *""",
                (str(uuid4()), row["id"]),
            ).fetchone()

    def finish_order_job(self, job, *, delay=None, error="", blocked=False):
        with self._db() as db:
            return bool(
                db.execute(
                    """UPDATE order_jobs SET state=%s,error=%s,due_at=now()+%s*interval '1 second',
                   locked_at=NULL,lease_token=NULL,updated_at=now() WHERE id=%s AND lease_token=%s RETURNING id""",
                    (
                        "blocked"
                        if blocked
                        else "pending"
                        if delay is not None
                        else "done",
                        str(error)[:1000],
                        delay or 0,
                        job["id"],
                        job["lease_token"],
                    ),
                ).fetchone()
            )

    def save_job_payload(self, job, payload):
        with self._db() as db:
            row = db.execute(
                """UPDATE order_jobs SET payload=%s WHERE id=%s AND lease_token=%s RETURNING payload""",
                (Jsonb(payload), job["id"], job["lease_token"]),
            ).fetchone()
            if not row:
                raise ValueError("Задача уже обрабатывается другим процессом")
            return row["payload"]

    def enqueue_order_job(self, order_id, kind, delay=0):
        with self._db() as db:
            self._enqueue_job(db, order_id, kind, delay)

    def retry_order_jobs(self, order_id):
        with self._db() as db:
            db.execute(
                "UPDATE order_jobs SET state='pending',due_at=now(),error='' WHERE order_id=%s AND state IN ('pending','blocked')",
                (order_id,),
            )
        return {"ok": True}

    def cancel_local_order(self, order_id):
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM orders WHERE id=%s FOR UPDATE", (order_id,)
            ).fetchone()
            if (
                not row
                or row["external_payment_id"]
                or row["status"] not in {"NEW", "INIT_ERROR"}
            ):
                return False
            return self._apply_payment_status(db, row, "CANCELED")

    def archive_order(self, order_id):
        order_id = str(UUID(str(order_id)))
        with self._db() as db:
            row = db.execute(
                "SELECT * FROM orders WHERE id=%s FOR UPDATE", (order_id,)
            ).fetchone()
            if not row:
                raise LookupError("Заказ не найден")
            db.execute(
                "UPDATE orders SET deleted_at=coalesce(deleted_at,now()) WHERE id=%s",
                (order_id,),
            )
            if row["status"] not in {
                "CONFIRMED",
                "PARTIAL_REFUNDED",
                "REFUNDED",
                "REVERSED",
                "CANCELED",
                "REJECTED",
                "DEADLINE_EXPIRED",
            }:
                if not row["external_payment_id"] and row["status"] in {
                    "NEW",
                    "INIT_ERROR",
                }:
                    self._apply_payment_status(db, row, "CANCELED")
                else:
                    self._enqueue_job(db, order_id, "payment_cancel")
            db.execute(
                "INSERT INTO audit_log(actor,action,entity_type,entity_id,payload) VALUES('admin','archive','order',%s,%s)",
                (order_id, Jsonb({"payment_status": row["status"]})),
            )
        return {"ok": True}

    def admin_orders_page(self, query):
        def value(key, default=""):
            found = query.get(key, default)
            return str(found[0] if isinstance(found, list) else found).strip()

        limit = min(100, max(1, int(value("limit", "20"))))
        offset = max(0, int(value("offset", "0")))
        conditions, args = ["o.deleted_at IS NULL"], []
        groups = {
            "pending": [
                "NEW",
                "INITIALIZING",
                "INIT_UNKNOWN",
                "FORM_SHOWED",
                "AUTHORIZING",
                "3DS_CHECKING",
                "3DS_CHECKED",
                "PAY_CHECKING",
                "CONFIRMING",
                "CONFIRM_CHECKING",
                "AUTHORIZED",
            ],
            "failed": ["INIT_ERROR", "REJECTED", "DEADLINE_EXPIRED"],
            "cancelled": ["CANCELED", "REVERSED"],
            "refunded": ["REFUNDED", "PARTIAL_REFUNDED"],
        }
        status = value("status", "all")
        if status != "all":
            conditions.append("o.status=ANY(%s)")
            args.append(groups.get(status, [status]))
        fulfillment = value("fulfillment", "all")
        if fulfillment != "all":
            if fulfillment not in {"new", "packing", "shipped", "delivered"}:
                raise ValueError("Неизвестный статус сборки")
            conditions.append("o.fulfillment=%s")
            args.append(fulfillment)
        delivery = value("delivery", "all")
        if delivery != "all":
            if delivery not in {"cdek", "pickup"}:
                raise ValueError("Неизвестный способ получения")
            conditions.append("o.delivery_details->>'type'=ANY(%s)")
            args.append(["pvz", "cdek"] if delivery == "cdek" else ["pickup", "self"])
        for key, operation in [("date_from", ">="), ("date_to", "<")]:
            raw = value(key)
            if raw:
                # The administration date inputs use the shop's Moscow timezone.
                date = datetime.strptime(raw, "%Y-%m-%d").replace(
                    tzinfo=timezone(timedelta(hours=3))
                )
                if key == "date_to":
                    date += timedelta(days=1)
                conditions.append("o.created_at" + operation + "%s")
                args.append(date)
        for key, operation in [("amount_min", ">="), ("amount_max", "<=")]:
            raw = value(key)
            if raw:
                try:
                    amount = Decimal(raw)
                except InvalidOperation as exc:
                    raise ValueError("Некорректная сумма") from exc
                if not amount.is_finite() or amount < 0:
                    raise ValueError("Некорректная сумма")
                conditions.append("o.total" + operation + "%s")
                args.append(amount)
        search = value("q")[:200]
        if search:
            conditions.append("""concat_ws(' ',o.id::text,o.customer_email,o.customer_details->>'name',
            o.customer_details->>'phone',o.customer_details->>'recipient',o.tracking_number,o.external_payment_id) ILIKE %s""")
            args.append(
                "%"
                + search.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
                + "%"
            )
        sorts = {
            "newest": "o.created_at DESC,o.id DESC",
            "oldest": "o.created_at ASC,o.id ASC",
            "amount_desc": "o.total DESC,o.created_at DESC,o.id DESC",
            "amount_asc": "o.total ASC,o.created_at DESC,o.id DESC",
        }
        sort = value("sort", "newest")
        if sort not in sorts:
            raise ValueError("Неизвестная сортировка заказов")
        where = " AND ".join(conditions)
        with self._db() as db:
            total = db.execute(
                "SELECT count(*)::int AS total FROM orders o WHERE " + where, args
            ).fetchone()["total"]
            rows = list(
                db.execute(
                    """SELECT o.id,o.status,o.total,o.customer_email,o.customer_details,o.delivery_details,
                o.fulfillment,o.tracking_number,o.promo_code,o.points_spent,o.created_at,o.payment_error,
                coalesce((o.payment_settings->>'is_test')::boolean,false) AS is_test,
                o.payment_last_checked_at,o.receipt_status,o.receipt_error,d.external_id AS cdek_uuid,
                d.status AS cdek_status,d.error AS cdek_error,
                (SELECT jsonb_agg(jsonb_build_object('kind',j.kind,'state',j.state,'attempts',j.attempts,'error',j.error))
                FROM order_jobs j WHERE j.order_id=o.id) AS jobs
                FROM orders o LEFT JOIN deliveries d ON d.order_id=o.id AND d.provider='cdek' WHERE """
                    + where
                    + " ORDER BY "
                    + sorts[sort]
                    + " LIMIT %s OFFSET %s",
                    [*args, limit, offset],
                ).fetchall()
            )
            self._attach_order_items(db, rows)
        return {"items": rows, "total": total, "limit": limit, "offset": offset}
