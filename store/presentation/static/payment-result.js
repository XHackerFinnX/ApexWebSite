(() => {
    const id = new URLSearchParams(location.search).get("order_id");
    const status = document.getElementById("order-status");
    const title = document.getElementById("order-title");
    const description = document.getElementById("order-description");
    const mark = document.querySelector(".payment-result__mark");
    const retry = document.getElementById("check-payment");
    const receipt = document.getElementById("receipt-link");
    const states = {
        CONFIRMED: [
            "✓",
            "Заказ оплачен",
            "Банк подтвердил оплату. Заказ передан в обработку.",
        ],
        AUTHORIZED: [
            "…",
            "Подтверждаем оплату",
            "Средства авторизованы. Ожидаем подтверждение списания от банка.",
        ],
        INIT_ERROR: [
            "!",
            "Не удалось создать платёж",
            "Вернитесь в магазин и повторите оформление заказа.",
        ],
        CANCELED: [
            "!",
            "Оплата отменена",
            "Платёжная сессия закрыта. Для новой попытки вернитесь в магазин.",
        ],
        REJECTED: [
            "!",
            "Банк отклонил оплату",
            "Вернитесь в магазин и попробуйте оплатить другим способом.",
        ],
        DEADLINE_EXPIRED: [
            "!",
            "Срок оплаты истёк",
            "Вернитесь в магазин и оформите платёж заново.",
        ],
        REFUNDED: [
            "↩",
            "Оплата возвращена",
            "Банк подтвердил возврат платежа.",
        ],
        PARTIAL_REFUNDED: [
            "↩",
            "Частичный возврат",
            "По заказу выполнен частичный возврат оплаты.",
        ],
        REVERSED: [
            "↩",
            "Авторизация отменена",
            "Банк отменил авторизацию средств.",
        ],
    };
    let timer,
        attempts = 0,
        busy = false;
    if (id)
        document.getElementById("order-number").textContent = `Заказ: ${id}`;
    async function check() {
        if (busy || !id) return;
        busy = true;
        retry.disabled = true;
        clearTimeout(timer);
        let finished = false;
        try {
            const order = await apexLoading.run(async () => {
                const response = await fetch(
                    `/api/checkout/order?order_id=${encodeURIComponent(id)}`,
                    { signal: AbortSignal.timeout(15000) },
                );
                if (!response.ok) throw new Error("Статус временно недоступен");
                return response.json();
            });
            const state = states[order.status];
            mark.textContent = state?.[0] || "…";
            title.textContent = state?.[1] || "Проверяем оплату";
            description.textContent =
                state?.[2] ||
                "Ожидаем подтверждение от банка. Статус обновится автоматически.";
            if (order.is_test && order.status === "CONFIRMED") {
                title.textContent = "Тестовая оплата прошла";
                description.textContent =
                    "Это тестовый заказ. Реального списания и начисления бонусов нет.";
            }
            document.title = title.textContent + " — APEX";
            finished = Boolean(state) && order.status !== "AUTHORIZED";
            status.textContent =
                order.status === "CONFIRMED"
                    ? order.receipt_status === "SUCCESS"
                        ? "Касса подтвердила формирование чека."
                        : order.receipt_enabled === false
                          ? "Оплата подтверждена. Информацию о чеке можно уточнить у магазина."
                          : order.receipt_status === "ERROR"
                            ? "Оплата подтверждена. Магазин уточняет результат формирования чека в кассе."
                            : "Данные для чека переданы банку. Электронный чек отправляет подключённая онлайн-касса на почту заказа."
                    : finished
                      ? ""
                      : "Уточняем результат платежа…";
            if (order.is_test && order.status === "CONFIRMED")
                status.textContent =
                    "Проверка оплаты завершена в тестовой среде.";
            if (
                order.receipt_url &&
                new URL(order.receipt_url, location.origin).protocol ===
                    "https:"
            ) {
                receipt.href = order.receipt_url;
                receipt.hidden = false;
            }
            if (order.status === "CONFIRMED") {
                try {
                    const snapshot = JSON.parse(
                        sessionStorage.getItem("apex-checkout-order") || "null",
                    );
                    if (
                        snapshot?.id === id &&
                        localStorage.getItem("apex-cart") ===
                            JSON.stringify(snapshot.cart)
                    ) {
                        localStorage.removeItem("apex-cart");
                        localStorage.removeItem("apex-cart-products");
                        sessionStorage.removeItem("apex-checkout-order");
                    }
                } catch {}
            }
        } catch (_) {
            title.textContent = "Уточняем статус оплаты";
            description.textContent =
                "Подтверждение пока недоступно. Повторите проверку позже.";
            status.textContent = "Не удалось связаться с магазином.";
        } finally {
            busy = false;
            retry.disabled = false;
            if (!finished && ++attempts < 40) timer = setTimeout(check, 3000);
        }
    }
    retry.onclick = () => {
        attempts = 0;
        check();
    };
    window.addEventListener("pagehide", () => clearTimeout(timer));
    if (id) check();
    else {
        title.textContent = "Заказ не указан";
        description.textContent =
            "Откройте заказ в личном кабинете или вернитесь в магазин.";
        status.textContent = "";
        retry.hidden = true;
    }
})();
