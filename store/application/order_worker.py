"""PostgreSQL-backed jobs; safe to run with multiple application replicas."""

import logging
import threading

from store.application.payments import PaymentService, FINISHED
from store.domain.payment_mode import order_is_test
from store.application.shipping import ShippingService
from store.infrastructure.order_webhook import paid_order_payload

logger = logging.getLogger(__name__)


class JobBlocked(RuntimeError):
    pass


class OrderWorker:
    def __init__(self, repo, bank, delivery, webhook, public_url, test_webhook=None):
        self.repo, self.webhook, self.public_url = repo, webhook, public_url
        self.test_webhook = test_webhook
        self.payments = PaymentService(repo, bank)
        self.shipping = ShippingService(repo, delivery)
        self.stop_event = threading.Event()
        self.threads = []

    def start(self):
        for index in range(2):
            thread = threading.Thread(
                target=self._run, name=f"order-jobs-{index}", daemon=False
            )
            self.threads.append(thread)
            thread.start()

    def stop(self):
        self.stop_event.set()
        for thread in self.threads:
            thread.join(timeout=35)

    def _run(self):
        while not self.stop_event.is_set():
            try:
                if self.run_once():
                    continue
            except Exception:
                # Database recovery does not require restarting the web process.
                logger.warning("Order job queue is temporarily unavailable")
            self.stop_event.wait(2)

    def run_once(self):
        job = self.repo.claim_order_job()
        if not job:
            return False
        try:
            delay = self.process(job)
            self.repo.finish_order_job(job, delay=delay)
        except JobBlocked as exc:
            self.repo.finish_order_job(job, error=str(exc), blocked=True)
        except Exception as exc:
            delay = min(21600, 15 * 2 ** min(job["attempts"] - 1, 11))
            self.repo.finish_order_job(job, delay=delay, error=str(exc))
            logger.warning(
                "Order job %s (%s) failed; retry scheduled", job["id"], job["kind"]
            )
        return True

    def process(self, job):
        order = self.repo.payment_context(job["order_id"])
        kind = job["kind"]
        if kind == "payment_sync":
            if order["status"] in FINISHED:
                return None
            order = self.payments.sync(order["id"])
            return None if order["status"] in FINISHED else 60
        if kind == "payment_confirm":
            if order["status"] in FINISHED:
                return None
            order = self.payments.confirm(order["id"])
            return None if order["status"] in FINISHED else 30
        if kind == "payment_cancel":
            if not order.get("external_payment_id") and order["status"] not in FINISHED:
                order = self.payments.sync(order["id"])
            order = self.payments.cancel(order["id"])
            return None if order["status"] in FINISHED else 30
        if kind == "webhook_paid":
            # A refund arriving before the first delivery suppresses the paid
            # event. A completed delivery is never repeated by bank callbacks.
            if order["status"] != "CONFIRMED":
                return None
            payload = job["payload"] or self.repo.save_job_payload(
                job, paid_order_payload(order, self.public_url)
            )
            sender = self.test_webhook if order_is_test(order) else self.webhook
            if sender is None:
                raise JobBlocked(
                    "Тестовый заказ: задайте ORDER_TEST_WEBHOOK_URL для проверки webhook. Боевая передача не выполняется."
                )
            sender.send(order["id"], payload)
            return None
        if kind in {"cdek_create", "cdek_sync"}:
            if order["status"] != "CONFIRMED":
                return None
            if order_is_test(order):
                config = self.repo.get_integration_config("cdek", enabled_only=False)
                if not config or config.get("environment") != "test":
                    raise JobBlocked("Для тестового платежа нужна тестовая среда СДЭК.")
            result = (
                self.shipping.create(order["id"])
                if kind == "cdek_create"
                else self.shipping.sync(order["id"])
            )
            if result.get("error"):
                raise ValueError(result["error"])
            if kind == "cdek_create":
                self.repo.enqueue_order_job(order["id"], "cdek_sync", 30)
                return None
            return (
                None
                if result.get("status")
                in {"DELIVERED", "NOT_DELIVERED", "REMOVED", "INVALID"}
                else 300
            )
        raise ValueError("Неизвестная задача заказа")
