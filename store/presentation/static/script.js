/* ============================================================
   APEX GRID — логика витрины, корзины и оформления заказа
   ============================================================ */

/* ---------- Данные ---------- */
const collections = [
    {
        id: "hoodies",
        eyebrow: "Флис из паддока",
        title: "Гоночные худи",
        products: [
            {
                id: "hoodie-apex",
                name: "Худи Apex Racing",
                price: 11800,
                compareAt: 16000,
                image: "images/hoodie-apex.png",
                category: "Худи",
                promoEligible: true,
            },
            {
                id: "hoodie-pole",
                name: "Худи Pole Position",
                price: 11200,
                compareAt: null,
                image: "images/hoodie-pole.png",
                category: "Худи",
                promoEligible: true,
            },
            {
                id: "hoodie-grid",
                name: "Худи Grid Wall на молнии",
                price: 12400,
                compareAt: 15000,
                image: "images/hoodie-grid.png",
                category: "Худи",
                promoEligible: false,
            },
        ],
    },
    {
        id: "jackets",
        eyebrow: "Архивная распродажа — скидки до 30%",
        title: "Винтажные куртки",
        products: [
            {
                id: "jacket-circuit",
                name: "Бомбер Circuit",
                price: 18900,
                compareAt: 24000,
                image: "images/jacket-circuit.png",
                category: "Куртки",
                promoEligible: true,
            },
            {
                id: "jacket-paddock",
                name: "Олимпийка Paddock",
                price: 17500,
                compareAt: 22000,
                image: "images/jacket-paddock.png",
                category: "Куртки",
                promoEligible: false,
            },
            {
                id: "jacket-gp",
                name: "Куртка Grand Prix",
                price: 19800,
                compareAt: null,
                image: "images/jacket-gp.png",
                category: "Куртки",
                promoEligible: true,
            },
        ],
    },
    {
        id: "tees",
        eyebrow: "Новинки",
        title: "Футболки с принтами",
        products: [
            {
                id: "tee-flag",
                name: "Футболка Chequered Flag",
                price: 5500,
                compareAt: 7500,
                image: "images/tee-flag.png",
                category: "Футболки",
                promoEligible: true,
            },
            {
                id: "tee-lap",
                name: "Футболка Fastest Lap",
                price: 5500,
                compareAt: null,
                image: "images/tee-lap.png",
                category: "Футболки",
                promoEligible: true,
            },
            {
                id: "tee-podium",
                name: "Футболка Podium P1",
                price: 5200,
                compareAt: 7000,
                image: "images/tee-podium.png",
                category: "Футболки",
                promoEligible: true,
            },
        ],
    },
];

const reviews = [
    {
        quote: "Качество отличное: плотная ткань, удобная посадка и детали выглядят ещё лучше вживую.",
        author: "Анастасия Н.",
    },
    {
        quote: "Любимая куртка. Сидит идеально, и её постоянно отмечают друзья.",
        author: "Джейси Е.",
    },
    {
        quote: "Быстрая доставка и премиальная упаковка. Видно, что вещи сделаны с вниманием.",
        author: "Роман М.",
    },
];

const faqs = [
    {
        q: "Куда вы доставляете?",
        a: "По России доставляем в пункты выдачи СДЭК. Стоимость и срок рассчитываются при оформлении заказа после выбора города.",
    },
    {
        q: "Как сидят вещи?",
        a: "Большинство моделей имеют расслабленную посадку true-to-size. Для более свободного оверсайза выбирайте размер больше.",
    },
    {
        q: "Можно ли вернуть заказ?",
        a: "Да. Новые вещи с бирками можно вернуть по условиям публичной оферты и законодательства.",
    },
    {
        q: "Как отследить заказ?",
        a: "После отправки мы пришлём трек-номер на указанную электронную почту.",
    },
];

const announcements = [
    "НОВЫЙ ДРОП ХУДИ УЖЕ НА САЙТЕ",
    "ДОСТАВКА СДЭК ПО РОССИИ",
    "ОТПРАВКА ЗАКАЗОВ ДО 2 НЕДЕЛЬ",
    "СОЗДАНО ДЛЯ ОДЕРЖИМЫХ СКОРОСТЬЮ",
];
const promoCodes = {
    APEX10: { type: "percent", value: 10, products: "all" },
    GRID500: {
        type: "fixed",
        value: 500,
        products: ["hoodie-apex", "tee-flag"],
    },
};
const deliveryState = {
    cityName: "",
    cityFullName: "",
    postalCode: "",
    pvz: null,
    price: 0,
    days: 0,
    type: "pvz",
};
let activePromo = null;
let cachedPvzList = [];

/* ---------- Helpers ---------- */
const money = (v) => `${Math.round(v).toLocaleString("ru-RU")} ₽`;
const productById = {};
collections.forEach((c) => c.products.forEach((p) => (productById[p.id] = p)));

const ICONS = {
    arrow: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    plus: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg>',
    minus: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    star: '<svg class="icon" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"/></svg>',
    bag: '<svg class="icon" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
};

/* ---------- Render static content ---------- */
function renderAnnouncement() {
    document.getElementById("announcement-track").innerHTML = [
        ...announcements,
        ...announcements,
    ]
        .map((item) => `<span>${item}<i aria-hidden="true">/////</i></span>`)
        .join("");
}
function renderCollections() {
    document.getElementById("collections").innerHTML = collections
        .map(
            (c) =>
                `<section id="${c.id}" class="section"><div class="section__head"><div><p class="eyebrow">${c.eyebrow}</p><h2 class="display section__title">${c.title}</h2></div><a href="#${c.id}" class="section__link">Смотреть всё ${ICONS.arrow}</a></div><div class="grid">${c.products.map(productCard).join("")}</div></section>`,
        )
        .join("");
}
function productCard(p) {
    const saving = p.compareAt ? p.compareAt - p.price : 0;
    return `<article class="card"><div class="card__media">${saving > 0 ? `<span class="card__badge">Скидка ${money(saving)}</span>` : ""}<img src="${p.image}" alt="${p.name}" loading="lazy" /><button type="button" class="card__add" data-add="${p.id}" aria-label="Добавить ${p.name} в корзину">Быстро добавить ${ICONS.plus}</button></div><div class="card__info"><div><p class="card__category">${p.category}</p><h3 class="card__name">${p.name}</h3></div><p class="card__prices"><span class="card__price">${money(p.price)}</span>${p.compareAt ? `<span class="card__compare">${money(p.compareAt)}</span>` : ""}</p></div></article>`;
}
function renderReviews() {
    document.getElementById("reviews-grid").innerHTML = reviews
        .map(
            (r) =>
                `<figure class="review"><div class="review__stars">${ICONS.star.repeat(5)}</div><blockquote class="review__quote">&ldquo;${r.quote}&rdquo;</blockquote><figcaption class="review__author">— ${r.author}</figcaption></figure>`,
        )
        .join("");
}
function renderFaq() {
    document.getElementById("faq-list").innerHTML = faqs
        .map(
            (f) =>
                `<details><summary>${f.q} ${ICONS.plus}</summary><p class="faq__answer">${f.a}</p></details>`,
        )
        .join("");
}

/* ---------- Cart state ---------- */
const cart = new Map(JSON.parse(localStorage.getItem("apex-cart") || "[]"));
function saveCart() {
    localStorage.setItem("apex-cart", JSON.stringify([...cart]));
}
function cartCount() {
    let n = 0;
    cart.forEach((qty) => (n += qty));
    return n;
}
function cartTotal() {
    let t = 0;
    cart.forEach((qty, id) => (t += qty * productById[id].price));
    return t;
}
function promoDiscount() {
    if (!activePromo) return 0;
    let eligible = 0;
    cart.forEach((qty, id) => {
        if (activePromo.products === "all" || activePromo.products.includes(id))
            eligible += qty * productById[id].price;
    });
    return activePromo.type === "percent"
        ? Math.round((eligible * activePromo.value) / 100)
        : Math.min(activePromo.value, eligible);
}
function grandTotal() {
    return (
        Math.max(0, cartTotal() - promoDiscount()) +
        (deliveryState.type === "pvz" ? deliveryState.price || 0 : 0)
    );
}
function addToCart(id) {
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    showToast(`Добавлено — ${productById[id].name}`);
}
function removeFromCart(id) {
    cart.delete(id);
    renderCart();
}
function setQty(id, qty) {
    if (qty <= 0) cart.delete(id);
    else cart.set(id, qty);
    renderCart();
}

function renderCart() {
    saveCart();
    const count = cartCount();

    document.getElementById("bag-count").textContent = count;
    document.getElementById("cart-count").textContent = count;

    const body = document.getElementById("cart-body");
    if (cart.size === 0) {
        body.innerHTML = `<div class="cart__empty">${ICONS.bag}<p>Корзина пуста</p></div>`;
        return;
    }

    const lines = [];
    cart.forEach((qty, id) => {
        const p = productById[id];
        lines.push(
            `<div class="cart__line"><img src="${p.image}" alt="${p.name}" /><div class="cart__line-body"><div class="cart__line-top"><h3 class="cart__line-name">${p.name}</h3><button type="button" class="cart__line-remove" data-remove="${id}" aria-label="Удалить ${p.name}">${ICONS.close}</button></div><p class="cart__line-category">${p.category}</p><div class="cart__line-bottom"><div class="qty"><button type="button" data-dec="${id}" aria-label="Уменьшить количество">${ICONS.minus}</button><span>${qty}</span><button type="button" data-inc="${id}" aria-label="Увеличить количество">${ICONS.plus}</button></div><span class="cart__line-total">${money(p.price * qty)}</span></div></div></div>`,
        );
    });
    body.innerHTML = lines.join("") + renderCheckoutForm();
    bindCheckoutControls();
}

function renderCheckoutForm() {
    return `<form class="checkout" id="checkout-form" novalidate><h3 class="checkout__title display">Оформление заказа</h3><div class="checkout__grid"><label>Имя<input id="customer-name" required placeholder="Иван" /></label><label>Почта<input id="customer-email" type="email" required placeholder="name@example.com" /></label><label class="checkout__wide">Телефон<input id="customer-phone" type="tel" required value="+7 " placeholder="+7 (999) 999-99-99" /></label></div><h4>Доставка</h4><label>Город<div class="suggest-wrap"><input id="delivery-city" autocomplete="off" placeholder="Начните вводить город" /><div class="suggestions" id="city-suggestions"></div></div></label><div class="checkout__hint" id="delivery-status">Выберите город — мы рассчитаем доставку СДЭК и загрузим пункты выдачи.</div><div class="checkout__radio" id="delivery-options"></div><label id="pvz-label">Пункт получения<div class="suggest-wrap"><input id="delivery-point" autocomplete="off" disabled placeholder="Сначала выберите город" /><div class="suggestions" id="pvz-suggestions"></div></div></label><div class="pvz-info" id="pvz-info"></div><label>ФИО получателя полностью<input id="recipient-name" required placeholder="Иванов Иван Иванович" /></label><label>Комментарий<textarea id="order-comment" placeholder="Комментарий к заказу"></textarea></label><h4>Промокод</h4><div class="promo-row"><input id="promo-code" placeholder="APEX10" /><button type="button" id="apply-promo">Применить</button></div><div class="checkout__hint" id="promo-status">Промокод может действовать на весь заказ или только на выбранные товары.</div><h4>Согласия</h4><label class="check"><input type="checkbox" id="privacy-consent" required />Я даю согласие на обработку персональных данных в соответствии с политикой конфиденциальности</label><label class="check"><input type="checkbox" id="delivery-consent" required />Срок отправки заказов зависит от загруженности магазина, отправка заказов осуществляется в течение 2 недель</label><h4>Способ оплаты</h4><div class="checkout__radio"><label><input type="radio" name="payment" value="card" required />Оплата картой, СБП или Долями</label><label><input type="radio" name="payment" value="yandex" />Яндекс Пэй и Сплит</label></div><div class="checkout__totals" id="checkout-totals"></div><button type="submit" class="cart__checkout">Оформить заказ</button></form>`;
}

/* ---------- Delivery / checkout ---------- */
async function jsonFetch(url, options) {
    const r = await fetch(url, options);
    if (!r.ok) throw new Error("Ошибка запроса");
    return r.json();
}
async function fetchCities(query) {
    const data = await jsonFetch("https://geoserv.tildacdn.com/api/city/", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
            pattern: query,
            lang: "RU",
            countries: "ru",
            rz: "com",
        }),
    });
    return Array.isArray(data) ? data : [];
}
async function calculateDelivery(postalCode) {
    return jsonFetch("/api/delivery/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postal_code: postalCode }),
    });
}
async function loadPvz(postalCode) {
    return jsonFetch(
        `/api/delivery/pvz?postalCode=${encodeURIComponent(postalCode)}`,
    );
}
function renderTotals() {
    const el = document.getElementById("checkout-totals");
    if (!el) return;
    const discount = promoDiscount();
    const delivery =
        deliveryState.type === "pvz" ? deliveryState.price || 0 : 0;
    el.innerHTML = `<div><span>Товары</span><b>${money(cartTotal())}</b></div>${discount ? `<div><span>Скидка</span><b>−${money(discount)}</b></div>` : ""}<div><span>Доставка</span><b>${delivery ? money(delivery) : "0 ₽"}</b></div><div><span>Итого</span><b>${money(grandTotal())}</b></div>`;
}
function formatPhone(input) {
    let digits = input.value.replace(/\D/g, "");
    if (digits.startsWith("8")) digits = digits.slice(1);
    if (digits.startsWith("7")) digits = digits.slice(1);
    digits = digits.slice(0, 10);
    let value = "+7";
    if (digits.length) value += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 4) value += `) ${digits.slice(3, 6)}`;
    if (digits.length >= 7) value += `-${digits.slice(6, 8)}`;
    if (digits.length >= 9) value += `-${digits.slice(8, 10)}`;
    input.value = value + (value === "+7" ? " " : "");
}
function validateFio(v) {
    return v.trim().split(/\s+/).length >= 3 && v.trim().length >= 8;
}
function markInvalid(el, invalid) {
    if (el) el.classList.toggle("input-error", invalid);
}

function bindCheckoutControls() {
    renderTotals();
    const phone = document.getElementById("customer-phone");
    phone.addEventListener("focus", () => {
        if (!phone.value.trim()) phone.value = "+7 ";
    });
    phone.addEventListener("input", () => formatPhone(phone));
    bindCityAutocomplete();
    document.getElementById("apply-promo").onclick = () => {
        const code = document
            .getElementById("promo-code")
            .value.trim()
            .toUpperCase();
        activePromo = promoCodes[code] || null;
        document.getElementById("promo-status").textContent = activePromo
            ? `Промокод ${code} применён.`
            : "Промокод не найден или не подходит к товарам в корзине.";
        renderTotals();
    };
    document
        .querySelectorAll('input[name="payment"]')
        .forEach((r) => (r.onchange = renderTotals));
    document.getElementById("checkout-form").onsubmit = submitOrder;
}
function bindCityAutocomplete() {
    const input = document.getElementById("delivery-city"),
        box = document.getElementById("city-suggestions"),
        status = document.getElementById("delivery-status");
    let timer;
    input.oninput = () => {
        clearTimeout(timer);
        box.innerHTML = "";
        box.classList.remove("is-open");
        timer = setTimeout(async () => {
            if (input.value.trim().length < 2) return;
            status.textContent = "Ищем город...";
            try {
                const cities = await fetchCities(input.value.trim());
                box.innerHTML = cities
                    .slice(0, 8)
                    .map(
                        (c) =>
                            `<button type="button" data-name="${c.name}" data-full="${c.fullName}" data-postal="${c.postalCode}"><b>${c.name}</b><span>${c.fullName}</span></button>`,
                    )
                    .join("");
                box.classList.add("is-open");
                status.textContent = cities.length
                    ? "Выберите город из списка."
                    : "Город не найден.";
            } catch {
                status.textContent =
                    "Не удалось загрузить города. Проверьте подключение.";
            }
        }, 350);
    };
    box.onclick = async (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        input.value = btn.dataset.name;
        deliveryState.cityName = btn.dataset.name;
        deliveryState.cityFullName = btn.dataset.full;
        deliveryState.postalCode = btn.dataset.postal;
        box.classList.remove("is-open");
        await refreshDelivery();
    };
}
async function refreshDelivery() {
    const status = document.getElementById("delivery-status"),
        opts = document.getElementById("delivery-options"),
        point = document.getElementById("delivery-point");
    status.textContent = "Рассчитываем доставку СДЭК...";
    point.disabled = true;
    point.value = "";
    deliveryState.pvz = null;
    try {
        const calc = await calculateDelivery(deliveryState.postalCode);
        deliveryState.price = Number(calc.price || 0);
        deliveryState.days = Number(calc.days || calc.day || 0);
        deliveryState.type = "pvz";
        opts.innerHTML = `<label><input type="radio" name="delivery-type" value="pvz" checked />ПВЗ СДЭК — ${money(deliveryState.price)}, от ${deliveryState.days || 1} дн.</label>${/москва/i.test(deliveryState.cityFullName) ? '<label><input type="radio" name="delivery-type" value="self" />Самовывоз — 0 ₽, от 10 дней</label>' : ""}`;
        cachedPvzList = await loadPvz(deliveryState.postalCode);
        bindDeliveryType();
        bindPvzAutocomplete();
        point.disabled = false;
        status.textContent = "Выберите пункт получения (снизу).";
    } catch (err) {
        status.textContent =
            "К сожалению, доставку в выбранный город сейчас не удалось рассчитать.";
        opts.innerHTML = "";
    }
    renderTotals();
}
function bindDeliveryType() {
    document.querySelectorAll('input[name="delivery-type"]').forEach(
        (r) =>
            (r.onchange = () => {
                deliveryState.type = r.value;
                document.getElementById("pvz-label").style.display =
                    r.value === "self" ? "none" : "block";
                if (r.value === "self") deliveryState.pvz = null;
                renderTotals();
            }),
    );
}
function bindPvzAutocomplete() {
    const input = document.getElementById("delivery-point"),
        box = document.getElementById("pvz-suggestions"),
        info = document.getElementById("pvz-info");
    const draw = (q = "") => {
        const filtered = cachedPvzList
            .filter((p) =>
                `${p.name} ${p.address}`
                    .toLowerCase()
                    .includes(q.toLowerCase()),
            )
            .slice(0, 15);
        box.innerHTML = filtered
            .map(
                (p) =>
                    `<button type="button" data-code="${p.code}"><b>${p.name}</b><span>${p.address}</span></button>`,
            )
            .join("");
        box.classList.toggle("is-open", filtered.length > 0);
    };
    input.onclick = () => draw();
    input.oninput = () => draw(input.value);
    box.onclick = (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const pvz = cachedPvzList.find((p) => p.code === btn.dataset.code);
        deliveryState.pvz = pvz;
        input.value = `${pvz.name}, ${pvz.address}`;
        box.classList.remove("is-open");
        info.innerHTML = `<b>${pvz.name}</b><span>Адрес: ${pvz.address}</span>${pvz.workTime ? `<span>Время работы: ${pvz.workTime}</span>` : ""}`;
        renderTotals();
    };
}
function submitOrder(e) {
    e.preventDefault();
    const required = [
        ["customer-name", (v) => v.trim().length >= 2],
        ["customer-email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)],
        ["customer-phone", (v) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(v)],
        ["delivery-city", () => !!deliveryState.postalCode],
        ["recipient-name", validateFio],
        ["privacy-consent", (_, el) => el.checked],
        ["delivery-consent", (_, el) => el.checked],
    ];
    if (deliveryState.type !== "self")
        required.push(["delivery-point", () => !!deliveryState.pvz]);
    let ok = true;
    required.forEach(([id, fn]) => {
        const el = document.getElementById(id);
        const bad = !fn(el.value, el);
        markInvalid(el, bad);
        ok = ok && !bad;
    });
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) ok = false;
    if (!ok) return showToast("Проверьте обязательные поля");
    console.log("Заказ", {
        customer: {
            name: document.getElementById("customer-name").value,
            email: document.getElementById("customer-email").value,
            phone: document.getElementById("customer-phone").value,
        },
        delivery: deliveryState,
        recipient: document.getElementById("recipient-name").value,
        comment: document.getElementById("order-comment").value,
        promo: activePromo,
        payment: payment.value,
        total: grandTotal(),
        cart: [...cart],
    });
    showToast("Заказ оформлен — данные готовы к отправке");
}

/* ---------- Drawer / toast / init ---------- */
const cartEl = document.getElementById("cart"),
    overlayEl = document.getElementById("cart-overlay");
function openCart() {
    cartEl.classList.add("is-open");
    overlayEl.classList.add("is-open");
    cartEl.setAttribute("aria-hidden", "false");
    overlayEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}
function closeCart() {
    cartEl.classList.remove("is-open");
    overlayEl.classList.remove("is-open");
    cartEl.setAttribute("aria-hidden", "true");
    overlayEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}
let toastTimer;
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("is-visible");
        toast.setAttribute("aria-hidden", "true");
    }, 2200);
}
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle"),
        nav = document.getElementById("mobile-nav"),
        openIcon = document.getElementById("menu-icon-open"),
        closeIcon = document.getElementById("menu-icon-close");
    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("hidden") === false;
        toggle.setAttribute("aria-expanded", String(isOpen));
        openIcon.classList.toggle("hidden", isOpen);
        closeIcon.classList.toggle("hidden", !isOpen);
    });
    nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
            nav.classList.add("hidden");
            toggle.setAttribute("aria-expanded", "false");
            openIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }),
    );
}
function initNewsletter() {
    const form = document.getElementById("newsletter-form"),
        status = document.getElementById("newsletter-status");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        status.textContent =
            "Добро пожаловать на стартовую решётку — проверьте почту.";
        form.reset();
    });
}
function initEvents() {
    document.getElementById("open-cart").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    overlayEl.addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCart();
    });
    document.addEventListener("click", (e) => {
        const t = e.target.closest(
            "[data-add],[data-remove],[data-inc],[data-dec]",
        );
        if (!t) return;
        if (t.dataset.add) addToCart(t.dataset.add);
        else if (t.dataset.remove) removeFromCart(t.dataset.remove);
        else if (t.dataset.inc)
            setQty(t.dataset.inc, (cart.get(t.dataset.inc) || 0) + 1);
        else if (t.dataset.dec)
            setQty(t.dataset.dec, (cart.get(t.dataset.dec) || 0) - 1);
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".suggest-wrap"))
            document
                .querySelectorAll(".suggestions")
                .forEach((x) => x.classList.remove("is-open"));
    });
}
renderAnnouncement();
renderCollections();
renderReviews();
renderFaq();
renderCart();
initMobileMenu();
initNewsletter();
initEvents();
