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
    Number(value || 0).toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 2,
    });
const number = (value) => Number(value || 0).toLocaleString("ru-RU");
const icon = (name) =>
    '<svg class="ui-icon" aria-hidden="true"><use href="/icons.svg#' +
    name +
    '"/></svg>';
const date = (value) => {
    const result = new Date(value);
    return isNaN(result)
        ? ""
        : result.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
          });
};
let mode = "login";
const sections = ["overview", "orders", "bonuses", "settings"];
function message(text, error = false) {
    select("#account-message").textContent = text;
    select("#account-message").classList.toggle("error-text", error);
}
async function api(url, method = "GET", data) {
    return apexLoading.run(async () => {
        let response;
        try {
            response = await fetch(url, {
                method,
                headers: data ? { "Content-Type": "application/json" } : {},
                body: data ? JSON.stringify(data) : undefined,
                signal: AbortSignal.timeout(15000),
            });
        } catch {
            throw new Error(
                "Не удалось связаться с магазином. Проверь подключение и попробуй ещё раз.",
            );
        }
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
            const error = new Error(result.error || "Не удалось выполнить запрос");
            error.status = response.status;
            throw error;
        }
        return result;
    });
}
function setSection(value) {
    const section = sections.includes(value) ? value : "overview";
    document
        .querySelectorAll("[data-member-view]")
        .forEach((node) => (node.hidden = node.dataset.memberView !== section));
    document
        .querySelectorAll(".member-nav [data-member-tab]")
        .forEach((button) => {
            const current = button.dataset.memberTab === section;
            button.classList.toggle("active", current);
            if (current) button.setAttribute("aria-current", "page");
            else button.removeAttribute("aria-current");
        });
    history.replaceState(null, "", "#" + section);
}
function emptyOrders() {
    return (
        '<div class="empty-state account-empty">' +
        icon("box") +
        '<h3>Первый заказ ещё впереди</h3><p>Выбери любимые вещи. После оформления здесь появятся состав заказа и статус доставки.</p><a class="button secondary" href="/#catalog-filter-title">В каталог ' +
        icon("arrow") +
        "</a></div>"
    );
}
function orderCard(order) {
    const statuses = {
        NEW: "Ожидает оплаты",
        AUTHORIZED: "Платёж авторизован",
        CONFIRMED: "Оплачен",
        REFUNDED: "Возвращён",
        PARTIAL_REFUNDED: "Частичный возврат",
        REVERSED: "Отменён",
        CANCELED: "Отменён",
        REJECTED: "Оплата отклонена",
        DEADLINE_EXPIRED: "Срок оплаты истёк",
    };
    const stages = {
        new: "Заказ принят",
        packing: "Собираем заказ",
        shipped: "В пути",
        delivered: "Доставлен",
    };
    const success = order.status === "CONFIRMED";
    const pending = ["NEW", "AUTHORIZED"].includes(order.status);
    const reviewAction = order.review_id
        ? '<p class="member-order__review-status">' +
          icon("check") +
          (order.review_published
              ? "Отзыв опубликован. Спасибо!"
              : "Отзыв отправлен на модерацию. Спасибо!") +
          "</p>"
        : success
          ? '<div class="member-order__review"><p>Как тебе покупка?</p><button type="button" class="button secondary" data-review-order="' +
            escapeText(order.id) +
            '">Оставить отзыв ' +
            icon("star") +
            "</button></div>"
          : "";
    const address =
        order.delivery_details?.pvz?.address ||
        order.delivery_details?.cityFullName ||
        "";
    const tracking = order.tracking_number
        ? '<button type="button" class="tracking-button" data-copy-tracking="' +
          escapeText(order.tracking_number) +
          '" aria-label="Скопировать трек-номер">' +
          icon("copy") +
          "<span>Трек: " +
          escapeText(order.tracking_number) +
          "</span></button>"
        : "";
    const items = (order.items || [])
        .map(
            (item) =>
                '<div class="member-order__item"><span><b>' +
                escapeText(item.name || "Товар") +
                "</b><small>" +
                escapeText(
                    [item.color, item.size].filter(Boolean).join(" / "),
                ) +
                " · " +
                Number(item.quantity) +
                " шт.</small></span><b>" +
                rubles(item.line_total) +
                "</b></div>",
        )
        .join("");
    return (
        '<article class="member-order"><div class="member-order__head"><div><strong>Заказ №' +
        escapeText(String(order.id).slice(0, 8)) +
        "</strong><small>" +
        date(order.created_at) +
        '</small></div><div class="member-order__amount"><strong>' +
        rubles(order.total) +
        '</strong><small><span class="status-pill ' +
        (success ? "success" : pending ? "pending" : "") +
        '">' +
        escapeText(statuses[order.status] || "Обрабатывается") +
        '</span></small></div></div><div class="member-order__meta"><span>' +
        icon(order.fulfillment === "delivered" ? "check" : "box") +
        escapeText(stages[order.fulfillment] || "Обрабатывается") +
        "</span>" +
        tracking +
        "</div><details><summary>Состав и детали заказа " +
        icon("chevron") +
        '</summary><div class="member-order__details">' +
        (items ||
            '<p class="form-note">Состав старого заказа недоступен.</p>') +
        (address
            ? '<p class="member-order__delivery"><b>Получение:</b> ' +
              escapeText(address) +
              "</p>"
            : order.delivery_details?.type === "pickup"
              ? '<p class="member-order__delivery">Самовывоз</p>'
              : "") +
        '<div class="member-order__totals"><div><span>Товары</span><span>' +
        rubles(order.subtotal) +
        "</span></div>" +
        (Number(order.discount)
            ? "<div><span>Скидки и баллы</span><span>−" +
              rubles(order.discount) +
              "</span></div>"
            : "") +
        "<div><span>Доставка</span><span>" +
        rubles(order.shipping) +
        "</span></div><div><span>Итого</span><span>" +
        rubles(order.total) +
        "</span></div></div></div></details>" +
        reviewAction +
        "</article>"
    );
}
async function loadMember() {
    select("#account-loading").hidden = false;
    select("#account-error-actions").hidden = true;
    try {
        const { customer, loyalty, ledger, orders, stats } =
            await api("/api/account");
        select("#auth-panel").hidden = true;
        select("#member-panel").hidden = false;
        const name = customer.name?.trim() || "участник";
        select("#member-greeting").textContent =
            "Привет, " + name.split(/\s+/)[0] + "!";
        select("#member-avatar").textContent = name
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
        select("#member-number").textContent =
            "Твой номер: APEX " + String(customer.id).padStart(5, "0");
        const form = select("#profile-form");
        ["name", "phone", "email"].forEach(
            (key) => (form.elements[key].value = customer[key] || ""),
        );
        select("#points-balance").textContent = number(customer.points);
        select("#points-overview").textContent = number(customer.points);
        select("#total-orders").textContent = number(
            stats?.total_orders ?? orders.length,
        );
        select("#active-orders").textContent = number(
            stats?.active_orders ??
                orders.filter(
                    (order) =>
                        ["NEW", "AUTHORIZED", "CONFIRMED"].includes(
                            order.status,
                        ) && order.fulfillment !== "delivered",
                ).length,
        );
        select("#overview-earn").textContent =
            Number(loyalty.earn_percent) + "%";
        select("#overview-loyalty-copy").textContent =
            "Покупай любимые вещи и оплачивай баллами до " +
            Number(loyalty.redeem_percent) +
            "% следующей покупки. Баллы начисляются после подтверждения оплаты.";
        select("#loyalty-rules").textContent =
            "Возвращаем " +
            Number(loyalty.earn_percent) +
            "% стоимости товаров баллами после оплаты. Баллами можно оплатить до " +
            Number(loyalty.redeem_percent) +
            "% следующей покупки после промокода. Доставка в расчёт баллов не входит.";
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
                          '<div class="ledger-row"><span>' +
                          escapeText(types[row.kind] || "Операция по заказу") +
                          "<small>" +
                          date(row.created_at) +
                          '</small></span><strong class="' +
                          (row.amount > 0 ? "positive" : "") +
                          '">' +
                          (row.amount > 0 ? "+" : "") +
                          number(row.amount) +
                          "</strong></div>",
                  )
                  .join("")
            : '<div class="empty-state">' +
              icon("star") +
              "<h3>Здесь будет история бонусов</h3><p>Баллы появятся после первой оплаченной покупки.</p></div>";
        select("#account-orders").innerHTML = orders.length
            ? orders.map(orderCard).join("")
            : emptyOrders();
        select("#recent-orders").innerHTML = orders.length
            ? orders.slice(0, 3).map(orderCard).join("")
            : emptyOrders();
        setSection(location.hash.slice(1));
    } catch (error) {
        if (error.status === 401) {
            select("#auth-panel").hidden = false;
            select("#member-panel").hidden = true;
            select("#auth-form").elements.password.value = "";
        } else {
            message(error.message, true);
            select("#account-error-actions").hidden = false;
        }
    } finally {
        select("#account-loading").hidden = true;
    }
}
document.querySelectorAll("[data-auth]").forEach(
    (button) =>
        (button.onclick = () => {
            mode = button.dataset.auth;
            const register = mode === "register";
            document
                .querySelectorAll("[data-auth]")
                .forEach((node) =>
                    node.setAttribute("aria-pressed", String(node === button)),
                );
            select("#register-name").hidden = !register;
            select("#auth-form").elements.name.required = register;
            select("#auth-form").elements.password.autocomplete = register
                ? "new-password"
                : "current-password";
            select("#auth-title").textContent = register
                ? "Присоединяйся к клубу"
                : "С возвращением";
            select("#auth-description").textContent = register
                ? "Создай аккаунт и получай больше от каждой покупки."
                : "Войди, чтобы увидеть свои заказы и бонусы.";
            select("#auth-submit").innerHTML =
                (register ? "Создать аккаунт" : "Войти в кабинет") +
                " " +
                icon("arrow");
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
        history.replaceState(null, "", "#overview");
        await loadMember();
    } catch (error) {
        message(error.message, true);
    } finally {
        button.disabled = false;
    }
};
select("#profile-form").onsubmit = async (event) => {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    button.disabled = true;
    message("");
    const data = Object.fromEntries(new FormData(event.target));
    if (!data.new_password) {
        delete data.new_password;
        delete data.current_password;
    }
    try {
        const result = await api("/api/account/profile", "PUT", data);
        event.target.elements.current_password.value = "";
        event.target.elements.new_password.value = "";
        await loadMember();
        message(
            result.login_required
                ? "Пароль изменён. Войди с новым паролем."
                : "Данные сохранены",
        );
    } catch (error) {
        message(error.message, true);
    } finally {
        button.disabled = false;
    }
};
async function logout() {
    try {
        await api("/api/account/logout", "POST", {});
        message("");
        history.replaceState(null, "", location.pathname);
        await loadMember();
    } catch (error) {
        message(error.message, true);
    }
}
select("#account-logout").onclick = logout;
document.querySelector("[data-account-logout]").onclick = logout;
select("#account-refresh").onclick = () => {
    message("");
    loadMember();
};
select("#account-retry").onclick = () => {
    message("");
    loadMember();
};
select("#toggle-password").onclick = (event) => {
    const input = select("#auth-password"),
        show = input.type === "password";
    input.type = show ? "text" : "password";
    event.currentTarget.setAttribute("aria-pressed", String(show));
    event.currentTarget.setAttribute(
        "aria-label",
        show ? "Скрыть пароль" : "Показать пароль",
    );
};
document.addEventListener("click", async (event) => {
    const review = event.target.closest("[data-review-order]");
    if (review) {
        const form = select("#customer-review-form");
        form.reset();
        form.elements.order_id.value = review.dataset.reviewOrder;
        select("#review-order-label").textContent =
            "Заказ №" + review.dataset.reviewOrder.slice(0, 8);
        select("#customer-review-error").textContent = "";
        select("#customer-review-dialog").showModal();
        return;
    }
    const tab = event.target.closest("[data-member-tab]");
    if (tab) {
        setSection(tab.dataset.memberTab);
        return;
    }
    const tracking = event.target.closest("[data-copy-tracking]");
    if (tracking) {
        try {
            await navigator.clipboard.writeText(tracking.dataset.copyTracking);
            message("Трек-номер скопирован");
        } catch {
            message("Трек-номер: " + tracking.dataset.copyTracking);
        }
    }
});
window.addEventListener("hashchange", () => setSection(location.hash.slice(1)));
select("#close-customer-review").onclick = () =>
    select("#customer-review-dialog").close();
select("#customer-review-dialog").addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
    )
        event.currentTarget.close();
});
select("#customer-review-form").onsubmit = async (event) => {
    event.preventDefault();
    const button = event.target.querySelector('[type="submit"]');
    button.disabled = true;
    select("#customer-review-error").textContent = "";
    try {
        await api(
            "/api/account/reviews",
            "POST",
            Object.fromEntries(new FormData(event.target)),
        );
        select("#customer-review-dialog").close();
        await loadMember();
        message("Спасибо! Отзыв отправлен на модерацию.");
    } catch (error) {
        select("#customer-review-error").textContent = error.message;
    } finally {
        button.disabled = false;
    }
};
loadMember();
