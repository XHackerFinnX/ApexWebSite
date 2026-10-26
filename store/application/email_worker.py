"""Durable email outbox. No SMTP call or recipient enumeration in HTTP requests."""

import json
import logging
import threading
from uuid import uuid4

logger = logging.getLogger(__name__)


class EmailWorker:
    def __init__(self, security):
        self.security, self.repo, self.mailer = security, security.repo, security.mailer
        self.stop_event, self.thread = threading.Event(), None

    def start(self):
        self.thread = threading.Thread(target=self._run, name="apex-email", daemon=True)
        self.thread.start()

    def stop(self):
        self.stop_event.set()
        if self.thread:
            self.thread.join(timeout=35)

    def _run(self):
        cycle = 0
        while not self.stop_event.is_set():
            try:
                if cycle % 60 == 0:
                    self.security.clean()
                worked = self.process_one() if self.mailer.configured else False
                cycle += 1
            except Exception:
                # Never log decrypted payloads, credentials, recipients or links.
                logger.warning("Email worker temporarily unavailable")
                worked = False
            if not worked:
                self.stop_event.wait(2)

    def process_one(self):
        lease = str(uuid4())
        with self.repo._db() as db:
            row = db.execute(
                """WITH candidate AS (
                SELECT id FROM email_outbox WHERE expires_at>now() AND
                ((state='pending' AND due_at<=now()) OR (state='running' AND locked_at<now()-interval '180 seconds'))
                ORDER BY due_at,created_at FOR UPDATE SKIP LOCKED LIMIT 1)
                UPDATE email_outbox SET state='running',locked_at=now(),lease_id=%s,attempts=attempts+1
                WHERE id IN (SELECT id FROM candidate) RETURNING *""",
                (lease,),
            ).fetchone()
            if not row:
                return False
            table = (
                "pending_registrations"
                if row["kind"] == "registration"
                else "password_reset_tokens"
            )
            valid = db.execute(
                f"SELECT 1 FROM {table} WHERE id=%s AND expires_at>now()"
                + (" AND used_at IS NULL" if row["kind"] == "password_reset" else ""),
                (row["context_id"],),
            ).fetchone()
            if not valid:
                db.execute(
                    "UPDATE email_outbox SET state='expired',payload_encrypted='' WHERE id=%s",
                    (row["id"],),
                )
                return True
        try:
            data = json.loads(self.repo.box.decrypt(row["payload_encrypted"]))
            self.mailer.send(row["kind"], data, row["id"])
        except Exception as exc:
            # Exception type is sufficient for diagnostics, SMTP text can contain PII.
            error = type(exc).__name__
            with self.repo._db() as db:
                db.execute(
                    """UPDATE email_outbox SET state='pending',last_error=%s,
                due_at=now()+(%s * interval '1 second') WHERE id=%s AND lease_id=%s AND state='running'""",
                    (
                        error,
                        min(15 * 2 ** min(row["attempts"] - 1, 5), 300),
                        row["id"],
                        lease,
                    ),
                )
            logger.warning("Email delivery postponed: %s", error)
        else:
            with self.repo._db() as db:
                db.execute(
                    "UPDATE email_outbox SET state='done',payload_encrypted='',last_error='' WHERE id=%s AND lease_id=%s AND state='running'",
                    (row["id"], lease),
                )
        return True
