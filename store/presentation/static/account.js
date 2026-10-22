const select = (value) => document.querySelector(value);
const escapeText = (value) =>
    String(value ?? "").replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
const rubles = (value) =>
    Number(value).toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
    });
let mode = "login";
function message(text, error = false) {
    select("#account-message").textContent = text;
    select("#account-message").classList.toggle("error-text", error);
}
async function api(url, method = "GET", data) {
    const response = await fetch(url, {
        method,
        headers: data ? { "Content-Type": "application/json" } : {},
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok) {
        const error = new Error(result.error || "Не удалось выполнить запрос");
        error.status = response.status;
        throw error;
    }
    return result;
}
async function loadMember() {
    select("#account-loading").hidden = false;
    try {
        const { customer, loyalty, ledger, orders } = await api("/api/account");
        select("#auth-panel").hidden = true;
        select("#member-panel").hidden = false;
        const form = select("#profile-form");
        ["name", "phone", "email"].forEach(
            (key) => (form.elements[key].value = customer[key] || ""),
        );
        select("#points-balance").textContent = Number(
            customer.points,
        ).toLocaleString("ru-RU");
        select("#loyalty-rules").textContent =
            `Возвращаем ${loyalty.earn_percent}% стоимости товаров баллами после оплаты. Баллами можно покрыть до ${loyalty.redeem_percent}% следующей покупки после промокода. Доставка в расчёт баллов не входит.`;
        const types = {
            earn: "За оплаченную покупку",
            redeem: "Списание на заказ",
            redeem_return: "Возврат списанных баллов",
            earn_return: "Отмена начисления",
        };
        select("#points-history").innerHTML = ledger.length
            ? ledger
                  .map(
                      (row) =>
                          `<div class="ledger-row"><span>${escapeText(types[row.kind] || row.kind)}<small>${new Date(row.created_at).toLocaleDateString("ru-RU")}</small></span><strong class="${row.amount > 0 ? "positive" : ""}">${row.amount > 0 ? "+" : ""}${row.amount}</strong></div>`,
                  )
                  .join("")
            : '<p class="empty-copy">Здесь появятся начисления и списания после первого заказа.</p>';
        const statuses = {
            NEW: "Ожидает оплаты",
            AUTHORIZED: "Платёж авторизован",
            CONFIRMED: "Оплачен",
            REFUNDED: "Возвращён",
            PARTIAL_REFUNDED: "Частичный возврат",
            REVERSED: "Отменён",
            CANCELED: "Отменён",
            REJECTED: "Платёж отклонён",
            DEADLINE_EXPIRED: "Срок оплаты истёк",
        };
        const fulfillment = {
            new: "Принят",
            packing: "Собираем",
            shipped: "Отправлен",
            delivered: "Доставлен",
        };
        select("#account-orders").innerHTML = orders.length
            ? orders
                  .map(
                      (order) =>
                          `<article class="member-order"><div><strong>Заказ ${escapeText(String(order.id).slice(0, 8))}</strong><small>${new Date(order.created_at).toLocaleDateString("ru-RU")} · ${escapeText(statuses[order.status] || "Обрабатывается")}</small></div><span>${escapeText(fulfillment[order.fulfillment] || "")}${order.tracking_number ? `<small>Трек: ${escapeText(order.tracking_number)}</small>` : ""}</span><strong>${rubles(order.total)}</strong></article>`,
                  )
                  .join("")
            : '<div class="empty-copy"><p>Пока ни одного заказа. Найди вещь для своего следующего круга.</p><a href="/#catalog-filter-title">Перейти в каталог →</a></div>';
    } catch (error) {
        if (error.status === 401) {
            select("#auth-panel").hidden = false;
            select("#member-panel").hidden = true;
        } else message(error.message, true);
    } finally {
        select("#account-loading").hidden = true;
    }
}
document.querySelectorAll("[data-auth]").forEach(
    (button) =>
        (button.onclick = () => {
            mode = button.dataset.auth;
            document
                .querySelectorAll("[data-auth]")
                .forEach((b) =>
                    b.setAttribute("aria-pressed", String(b === button)),
                );
            select("#register-name").hidden = mode !== "register";
            select("#auth-form").elements.name.required = mode === "register";
            select("#auth-form").elements.password.autocomplete =
                mode === "register" ? "new-password" : "current-password";
            select("#auth-submit").textContent =
                mode === "register" ? "Создать аккаунт" : "Войти";
            message("");
        }),
);
select("#auth-form").onsubmit = async (event) => {
    event.preventDefault();
    const button = select("#auth-submit");
    button.disabled = true;
    message("");
    try {
        await api(
            "/api/account/" + mode,
            "POST",
            Object.fromEntries(new FormData(event.target)),
        );
        event.target.reset();
        await loadMember();
        message("Добро пожаловать в APEX Club");
    } catch (error) {
        message(error.message, true);
    } finally {
        button.disabled = false;
    }
};
select("#profile-form").onsubmit = async (event) => {
    event.preventDefault();
    const button = event.target.querySelector("button");
    button.disabled = true;
    try {
        const result = await api(
            "/api/account/profile",
            "PUT",
            Object.fromEntries(new FormData(event.target)),
        );
        event.target.elements.current_password.value = "";
        event.target.elements.new_password.value = "";
        message(
            result.login_required
                ? "Пароль изменён. Войдите с новым паролем"
                : "Данные сохранены",
        );
        await loadMember();
    } catch (error) {
        message(error.message, true);
    } finally {
        button.disabled = false;
    }
};
select("#account-logout").onclick = async () => {
    try {
        await api("/api/account/logout", "POST", {});
        await loadMember();
        message("Вы вышли из аккаунта");
    } catch (error) {
        message(error.message, true);
    }
};
select("#account-refresh").onclick = loadMember;
loadMember();
