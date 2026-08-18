/* ============================================================
   APEX GRID — логика витрины, корзины и оформления заказа
   ============================================================ */

/* ---------- Данные ---------- */
let collections = [];

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
const esc = (value) =>
    String(value ?? "").replace(
        /[&<>'"]/g,
        (char) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\'": "&#39;",
                '"': "&quot;",
            })[char],
    );

async function loadCatalog() {
    const catalog = document.getElementById("collections");
    catalog.setAttribute("aria-busy", "true");
    catalog.innerHTML = `<div class="catalog-loading" role="status" aria-live="polite"><span class="catalog-loading__spinner" aria-hidden="true"></span><span>Загрузка товаров</span></div>`;
    try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const items = await response.json();
        if (!Array.isArray(items))
            throw new Error("Некорректный ответ сервера");
        Object.keys(productById).forEach((id) => delete productById[id]);
        const grouped = new Map();
        items.forEach((item) => {
            const product = {
                ...item,
                id: String(item.id),
                image: item.images?.[0] || item.image_url || "",
                images: item.images?.length
                    ? item.images
                    : item.image_url
                      ? [item.image_url]
                      : [],
                colors: item.color ? [item.color] : [],
                compareAt: Math.max(
                    Number(item.price) || 0,
                    ...(item.variants || []).map(
                        (variant) => Number(variant.old_price) || 0,
                    ),
                ),
                promoEligible: true,
            };
            productById[product.id] = product;
            if (!grouped.has(product.category))
                grouped.set(product.category, []);
            grouped.get(product.category).push(product);
        });
        collections = [...grouped].map(([category, products], index) => ({
            id: `catalog-${index}`,
            eyebrow: "Каталог",
            title: category,
            products,
        }));
        document.getElementById("category-filter").innerHTML =
            `<option value="all">Все категории</option>${[...grouped.keys()].map((category) => `<option>${esc(category)}</option>`).join("")}`;
        const sizes = [
            ...new Set(
                items.flatMap((item) =>
                    Array.isArray(item.sizes) ? item.sizes : [],
                ),
            ),
        ].filter(Boolean);
        document.getElementById("size-filter").innerHTML =
            `<option value="all">Все размеры</option>${sizes.map((size) => `<option value="${esc(size)}">${esc(size)}</option>`).join("")}`;
        renderCatalogNavigation();
        renderCollections();
        renderCart();
        if (location.hash.startsWith("#product-"))
            openProduct(location.hash.slice(9), false);
    } catch (error) {
        catalog.innerHTML = `<section class="section"><div class="empty-state"><h2>Каталог временно недоступен</h2><p>Не удалось получить товары. Проверьте соединение и повторите попытку.</p><button class="button button--dark" type="button" data-retry-catalog>Попробовать снова</button></div></section>`;
        console.error("Catalog loading failed", error);
    } finally {
        catalog.removeAttribute("aria-busy");
    }
}

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
function renderCatalogNavigation() {
    const links = collections
        .map(
            (collection) =>
                `<a href="#${collection.id}">${esc(collection.title)}</a>`,
        )
        .join("");
    document.getElementById("desktop-nav").innerHTML =
        `${links}<a href="#story">История</a>`;
    document.getElementById("mobile-nav").innerHTML =
        `${links}<a href="#story">История</a>`;
}
function renderCollections() {
    const category = document.getElementById("category-filter")?.value || "all";
    const size = document.getElementById("size-filter")?.value || "all";
    const sort = document.getElementById("sort-filter")?.value || "featured";
    let visibleCount = 0;
    document.getElementById("collections").innerHTML = collections
        .map((c) => {
            const products = [...c.products]
                .filter(
                    (p) =>
                        (category === "all" || p.category === category) &&
                        (size === "all" || (p.sizes || []).includes(size)),
                )
                .sort((a, b) =>
                    sort === "price-asc"
                        ? a.price - b.price
                        : sort === "price-desc"
                          ? b.price - a.price
                          : sort === "discount"
                            ? (b.compareAt || b.price) -
                              b.price -
                              ((a.compareAt || a.price) - a.price)
                            : (Number(b.cart_adds) || 0) * 3 +
                              (Number(b.views) || 0) -
                              ((Number(a.cart_adds) || 0) * 3 +
                                  (Number(a.views) || 0)),
                );
            visibleCount += products.length;
            return products.length
                ? `<section id="${c.id}" class="section"><div class="section__head"><div><p class="eyebrow">${c.eyebrow}</p><h2 class="display section__title">${c.title}</h2></div><a href="#${c.id}" class="section__link">Смотреть всё ${ICONS.arrow}</a></div><div class="grid">${products.map(productCard).join("")}</div></section>`
                : "";
        })
        .join("");
    const count = document.getElementById("catalog-count");
    if (count)
        count.textContent = visibleCount
            ? `Показано товаров: ${visibleCount}`
            : "По выбранным фильтрам товаров нет";
}
function productCard(p) {
    const primary = p.images[0] || "";
    const secondary = p.images[1];
    const pictures = primary
        ? `<img class="card__image card__image--primary" src="${esc(primary)}" alt="${esc(p.name)}" loading="lazy" />${secondary ? `<img class="card__image card__image--hover" src="${esc(secondary)}" alt="" loading="lazy" />` : ""}`
        : `<span class="card__no-image">Фото скоро появится</span>`;
    return `<article class="card" id="product-${p.id}" data-product-card="${p.id}" tabindex="0"><div class="card__media">${pictures}<div class="card__actions"><button type="button" class="card__view" data-view="${p.id}">Посмотреть товар</button><button type="button" class="card__add" data-quick-add="${p.id}" aria-label="Быстро добавить ${esc(p.name)} в корзину">Быстро добавить ${ICONS.plus}</button></div></div><div class="card__info"><div><p class="card__category">${esc(p.category)}</p><h3 class="card__name">${esc(p.name)}</h3></div><p class="card__prices"><span class="card__price">${money(p.price)}</span></p></div></article>`;
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

const communityMedia = [
    ["images/story.png", "Гоночный автомобиль в боксах"],
    ["images/hoodie-apex.png", "Худи Apex Racing"],
    ["images/jacket-paddock.png", "Куртка Paddock"],
    ["images/tee-flag.png", "Футболка Chequered Flag"],
    ["images/promo.png", "Команда APEX GRID"],
    ["images/jacket-gp.png", "Куртка Grand Prix"],
];
function renderCommunity() {
    const items = [...communityMedia, ...communityMedia];
    document.getElementById("community-track").innerHTML = items
        .map(
            ([src, alt], index) =>
                `<figure class="community__item"><img src="${src}" alt="${index < communityMedia.length ? alt : ""}" loading="lazy" /></figure>`,
        )
        .join("");
}

function renderSearchResults(query = "") {
    const box = document.getElementById("search-results");
    const normalized = query.trim().toLocaleLowerCase("ru");
    const matches = Object.values(productById).filter(
        (p) =>
            !normalized ||
            `${p.name} ${p.category} ${p.description}`
                .toLocaleLowerCase("ru")
                .includes(normalized),
    );
    box.innerHTML = matches.length
        ? matches
              .map(
                  (p) =>
                      `<button type="button" class="search-result" data-view="${p.id}" role="option"><img src="${p.image}" alt="" /><span><b>${p.name}</b><small>${p.category} · ${p.sizes.join(" / ")}</small></span><strong>${money(p.price)}</strong>${ICONS.arrow}</button>`,
              )
              .join("")
        : `<p class="search-results__empty">Ничего не нашли. Попробуйте изменить запрос.</p>`;
}
function toggleSearch(force) {
    const panel = document.getElementById("search-panel");
    const button = document.getElementById("search-toggle");
    const open = force ?? !panel.classList.contains("is-open");
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    button.setAttribute("aria-expanded", String(open));
    if (open) {
        renderSearchResults();
        setTimeout(() => document.getElementById("search-input").focus(), 180);
    }
}

let galleryIndex = 0;
let activeProductId = "";
let activeColor = "";

function colorOptions(p) {
    const variants = p.variants || [];
    const colors = [
        ...new Set(variants.map((item) => item.color).filter(Boolean)),
    ];
    return colors.length ? colors : p.colors;
}
function variantsForColor(p, color) {
    return (p.variants || []).filter((variant) => variant.color === color);
}
function selectedProductView(p, color = activeColor) {
    const variants = variantsForColor(p, color);
    const images =
        variants.find((variant) => variant.images?.length)?.images || p.images;
    const prices = variants.map((variant) => Number(variant.price));
    return {
        images: images.length ? images : [""],
        price: prices.length ? Math.min(...prices) : Number(p.price),
        sizes: variants.length
            ? [
                  ...new Set(
                      variants
                          .filter((variant) => Number(variant.stock) > 0)
                          .map((variant) => variant.size)
                          .filter(Boolean),
                  ),
              ]
            : p.sizes,
        stock: variants.length
            ? variants.reduce((sum, variant) => sum + Number(variant.stock), 0)
            : p.stock,
    };
}
function galleryMarkup(p) {
    const colors = colorOptions(p);
    activeColor = colors[0] || "";
    const view = selectedProductView(p);
    return `<div class="product-view"><div class="product-view__gallery"><button type="button" class="product-view__main-button" data-open-lightbox aria-label="Открыть фотографию полностью"><img class="product-view__main" src="${esc(view.images[0])}" alt="${esc(p.name)}" /></button><div class="product-view__thumbs"></div></div><div class="product-view__info"><p class="eyebrow">${esc(p.category)}</p><h2 class="display product-view__title" id="product-modal-title">${esc(p.name)}</h2><div class="product-view__prices"><strong></strong></div><p class="product-view__description">${esc(p.description)}</p>${colors.length ? `<fieldset><legend>Цвет</legend><div class="product-view__options product-view__colors">${colors.map((color, index) => `<label><input type="radio" name="product-color" value="${esc(color)}" ${index === 0 ? "checked" : ""}/><span>${esc(color)}</span></label>`).join("")}</div></fieldset>` : ""}<fieldset><legend>Размер <small>— доступны сейчас</small></legend><div class="product-view__options product-view__sizes"></div></fieldset><p class="product-view__stock"></p><button type="button" class="product-view__add" data-modal-add="${p.id}">${ICONS.bag} <span></span></button></div></div>`;
}
function quickAddMarkup(p) {
    const colors = colorOptions(p);
    activeColor = colors[0] || "";
    return `<div class="quick-add-view"><p class="eyebrow">Быстрое добавление</p><h2 class="display product-view__title" id="product-modal-title">${esc(p.name)}</h2>${colors.length ? `<fieldset><legend>Цвет</legend><div class="product-view__options product-view__colors">${colors.map((color, index) => `<label><input type="radio" name="product-color" value="${esc(color)}" ${index === 0 ? "checked" : ""}/><span>${esc(color)}</span></label>`).join("")}</div></fieldset>` : ""}<fieldset><legend>Размер</legend><div class="product-view__options product-view__sizes"></div></fieldset><button type="button" class="product-view__add" data-modal-add="${p.id}">${ICONS.bag} <span></span></button></div>`;
}
function updateProductView() {
    const p = productById[activeProductId];
    if (!p) return;
    const view = selectedProductView(p);
    galleryIndex = 0;
    const price = document.querySelector(".product-view__prices strong");
    if (price) price.textContent = money(view.price);
    document.querySelector(".product-view__sizes").innerHTML = view.sizes.length
        ? view.sizes
              .map(
                  (size, index) =>
                      `<label><input type="radio" name="product-size" value="${esc(size)}" ${index === 0 ? "checked" : ""}/><span>${esc(size)}</span></label>`,
              )
              .join("")
        : `<span class="product-view__unavailable">Нет доступных размеров</span>`;
    const stock = document.querySelector(".product-view__stock");
    if (stock)
        stock.textContent = view.stock
            ? `● В наличии — ${view.stock} шт.`
            : "Нет в наличии";
    document.querySelector(".product-view__add span").textContent =
        `В корзину · ${money(view.price)}`;
    document.querySelector(".product-view__add").disabled = !view.stock;
    const thumbs = document.querySelector(".product-view__thumbs");
    if (!thumbs) return;
    thumbs.innerHTML = view.images
        .map(
            (image, index) =>
                `<button class="${index === 0 ? "is-active" : ""}" type="button" data-gallery-index="${index}"><img src="${esc(image)}" alt="Фото товара ${index + 1}" /></button>`,
        )
        .join("");
    document.querySelector(".product-view__main").src = view.images[0];
}

function openProduct(id, updateHash = true) {
    const p = productById[id];
    if (!p) return;
    activeProductId = String(id);
    galleryIndex = 0;
    document.getElementById("product-modal-content").innerHTML =
        galleryMarkup(p);
    updateProductView();
    const modal = document.getElementById("product-modal");
    modal.classList.remove("is-quick-add");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    toggleSearch(false);
    fetch(`/api/products/${p.id}/view`, { method: "POST" });
    if (updateHash) history.replaceState(null, "", `#product-${id}`);
    modal.querySelector(".product-modal__close").focus();
}
function openQuickAdd(id) {
    const p = productById[id];
    if (!p) return;
    activeProductId = String(id);
    document.getElementById("product-modal-content").innerHTML =
        quickAddMarkup(p);
    const modal = document.getElementById("product-modal");
    modal.classList.add("is-open", "is-quick-add");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateProductView();
}
function setGalleryImage(index) {
    const p = productById[activeProductId];
    if (!p) return;
    const images = selectedProductView(p).images;
    galleryIndex = (index + images.length) % images.length;
    document.querySelector(".product-view__main").src = images[galleryIndex];
    document
        .querySelectorAll("[data-gallery-index]")
        .forEach((button, i) =>
            button.classList.toggle("is-active", i === galleryIndex),
        );
    const lightboxImage = document.getElementById("lightbox-image");
    if (lightboxImage) lightboxImage.src = images[galleryIndex];
}
function openLightbox() {
    const box = document.getElementById("image-lightbox");
    setGalleryImage(galleryIndex);
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
    const box = document.getElementById("image-lightbox");
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
}
function closeProduct(clearHash = true) {
    const modal = document.getElementById("product-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (clearHash && location.hash.startsWith("#product-"))
        history.replaceState(
            null,
            "",
            `${location.pathname}${location.search}`,
        );
}

/* ---------- Cart state ---------- */
const cart = new Map(JSON.parse(localStorage.getItem("apex-cart") || "[]"));
const cartKey = (id, color = "", size = "") =>
    `${id}::${encodeURIComponent(color)}::${encodeURIComponent(size)}`;
function cartSelection(key) {
    const [id, color = "", size = ""] = String(key).split("::");
    return {
        id,
        color: decodeURIComponent(color),
        size: decodeURIComponent(size),
    };
}
function cartProduct(key) {
    return productById[cartSelection(key).id];
}
function selectionVariant(p, color, size) {
    return (p?.variants || []).find(
        (v) => (!color || v.color === color) && (!size || v.size === size),
    );
}
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
    cart.forEach((qty, key) => {
        const { color, size } = cartSelection(key),
            p = cartProduct(key);
        if (p)
            t +=
                qty *
                Number(selectionVariant(p, color, size)?.price ?? p.price);
    });
    return t;
}
function promoDiscount() {
    if (!activePromo) return 0;
    let eligible = 0;
    cart.forEach((qty, key) => {
        const { id, color, size } = cartSelection(key),
            p = productById[id];
        if (!p) return;
        const price = Number(
            selectionVariant(p, color, size)?.price ?? p.price,
        );
        if (activePromo.products === "all" || activePromo.products.includes(id))
            eligible += qty * price;
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
function addToCart(id, color = "", size = "") {
    if (!productById[id]) return;
    const key = cartKey(id, color, size);
    cart.set(key, (cart.get(key) || 0) + 1);
    fetch(`/api/products/${id}/cart`, { method: "POST" });
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
    cart.forEach((qty, key) => {
        const selection = cartSelection(key),
            p = productById[selection.id];
        if (!p) {
            cart.delete(key);
            return;
        }
        const variant = selectionVariant(p, selection.color, selection.size);
        const price = Number(variant?.price ?? p.price);
        const image = variant?.images?.[0] || p.image;
        const details = [
            selection.color && `Цвет: ${esc(selection.color)}`,
            selection.size && `Размер: ${esc(selection.size)}`,
        ]
            .filter(Boolean)
            .join(" · ");
        lines.push(
            `<div class="cart__line"><img src="${esc(image)}" alt="${esc(p.name)}" /><div class="cart__line-body"><div class="cart__line-top"><h3 class="cart__line-name">${esc(p.name)}</h3><button type="button" class="cart__line-remove" data-remove="${esc(key)}" aria-label="Удалить ${esc(p.name)}">${ICONS.close}</button></div><p class="cart__line-category">${esc(p.category)}</p>${details ? `<p class="cart__line-options">${details}</p>` : ""}<div class="cart__line-bottom"><div class="qty"><button type="button" data-dec="${esc(key)}" aria-label="Уменьшить количество">${ICONS.minus}</button><span>${qty}</span><button type="button" data-inc="${esc(key)}" aria-label="Увеличить количество">${ICONS.plus}</button></div><span class="cart__line-total">${money(price * qty)}</span></div></div></div>`,
        );
    });
    body.innerHTML = lines.join("") + renderCheckoutForm();
    bindCheckoutControls();
}

function renderCheckoutForm() {
    return `<form class="checkout" id="checkout-form" novalidate><h3 class="checkout__title display">Оформление заказа</h3><div class="checkout__grid"><label>Имя<input id="customer-name" required placeholder="Иван" /></label><label>Почта<input id="customer-email" type="email" required placeholder="name@example.com" /></label><label class="checkout__wide">Телефон<input id="customer-phone" type="tel" required value="+7 " placeholder="+7 (999) 999-99-99" /></label></div><h4>Доставка</h4><label>Город<div class="suggest-wrap"><input id="delivery-city" autocomplete="off" placeholder="Начните вводить город" /><div class="suggestions" id="city-suggestions"></div></div></label><div class="checkout__hint" id="delivery-status">Выберите город — мы рассчитаем доставку СДЭК и загрузим пункты выдачи.</div><div class="checkout__radio" id="delivery-options"><span>Загрузка способов доставки…</span></div><label id="pvz-label">Пункт получения<div class="suggest-wrap"><input id="delivery-point" autocomplete="off" disabled placeholder="Сначала выберите город" /><div class="suggestions" id="pvz-suggestions"></div></div></label><div class="pvz-info" id="pvz-info"></div><label>ФИО получателя полностью<input id="recipient-name" required placeholder="Иванов Иван Иванович" /></label><label>Комментарий<textarea id="order-comment" placeholder="Комментарий к заказу"></textarea></label><h4>Промокод</h4><div class="promo-row"><input id="promo-code" placeholder="APEX10" /><button type="button" id="apply-promo">Применить</button></div><div class="checkout__hint" id="promo-status">Промокод может действовать на весь заказ или только на выбранные товары.</div><h4>Согласия</h4><label class="check"><input type="checkbox" id="privacy-consent" required />Я даю согласие на обработку персональных данных в соответствии с политикой конфиденциальности</label><label class="check"><input type="checkbox" id="delivery-consent" required />Срок отправки заказов зависит от загруженности магазина, отправка заказов осуществляется в течение 2 недель</label><h4>Способ оплаты</h4><div class="checkout__radio" id="payment-options"><span>Загрузка способов оплаты…</span></div><div class="checkout__totals" id="checkout-totals"></div><button type="submit" class="cart__checkout">Оформить заказ</button></form>`;
}

/* ---------- Delivery / checkout ---------- */
async function jsonFetch(url, options) {
    const r = await fetch(url, options);
    const data = await r.json().catch(() => null);
    if (!r.ok) throw new Error(data?.error || `Ошибка запроса (${r.status})`);
    return data;
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
        body: JSON.stringify({
            postal_code: postalCode,
            order_total: cartTotal(),
        }),
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
async function loadCheckoutIntegrations() {
    const paymentBox = document.getElementById("payment-options");
    const deliveryBox = document.getElementById("delivery-options");
    try {
        const items = await jsonFetch("/api/checkout/integrations");
        const payments = items.filter((item) => item.kind === "payment");
        const deliveries = items.filter((item) => item.kind === "delivery");
        paymentBox.innerHTML = payments.length
            ? payments
                  .map(
                      (item, index) =>
                          `<label><input type="radio" name="payment" value="${esc(item.provider)}" ${index === 0 ? "required" : ""} />${esc(item.name)}</label>`,
                  )
                  .join("")
            : '<span class="checkout__hint">Нет доступных способов оплаты</span>';
        deliveryBox.innerHTML = deliveries
            .filter((item) => item.provider !== "cdek")
            .map(
                (item) =>
                    `<label><input type="radio" name="delivery-type" value="${esc(item.provider)}" />${esc(item.name)}</label>`,
            )
            .join("");
        document
            .querySelectorAll('input[name="payment"]')
            .forEach((radio) => (radio.onchange = renderTotals));
    } catch (_) {
        paymentBox.innerHTML =
            '<span class="checkout__hint">Не удалось загрузить способы оплаты</span>';
        deliveryBox.innerHTML =
            '<span class="checkout__hint">Не удалось загрузить способы доставки</span>';
    }
}

function bindCheckoutControls() {
    renderTotals();
    loadCheckoutIntegrations();
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
        status.textContent = err.message
            ? `Не удалось рассчитать доставку: ${err.message}`
            : "К сожалению, доставку в выбранный город сейчас не удалось рассчитать.";
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
async function submitOrder(e) {
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
    const button = e.currentTarget.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = "Переходим к оплате…";
    const payload = {
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
        idempotency_key: crypto.randomUUID(),
        items: [...cart].map(([key, quantity]) => {
            const item = cartSelection(key);
            return {
                product_id: Number(item.id),
                color: item.color,
                size: item.size,
                quantity,
            };
        }),
    };
    try {
        const result = await jsonFetch("/api/checkout/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        window.location.assign(result.payment_url);
    } catch (error) {
        showToast(error.message || "Не удалось перейти к оплате");
        button.disabled = false;
        button.textContent = "Оформить заказ";
    }
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
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            nav.classList.add("hidden");
            toggle.setAttribute("aria-expanded", "false");
            openIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }
    });
}
function initEvents() {
    document.getElementById("open-cart").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    overlayEl.addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCart();
            closeLightbox();
            closeProduct();
            toggleSearch(false);
        }
    });
    document.addEventListener("click", (e) => {
        const t = e.target.closest(
            "[data-quick-add],[data-remove],[data-inc],[data-dec],[data-view],[data-modal-add],[data-close-product],[data-gallery-index],[data-open-lightbox],[data-lightbox-close],[data-lightbox-prev],[data-lightbox-next],[data-retry-catalog]",
        );
        if (!t) {
            const card = e.target.closest("[data-product-card]");
            if (card) openProduct(card.dataset.productCard);
            return;
        }
        if (t.dataset.retryCatalog !== undefined) loadCatalog();
        else if (t.dataset.lightboxClose !== undefined) closeLightbox();
        else if (t.dataset.lightboxPrev !== undefined)
            setGalleryImage(galleryIndex - 1);
        else if (t.dataset.lightboxNext !== undefined)
            setGalleryImage(galleryIndex + 1);
        else if (t.dataset.openLightbox !== undefined) openLightbox();
        else if (t.dataset.galleryIndex !== undefined)
            setGalleryImage(Number(t.dataset.galleryIndex));
        else if (t.dataset.closeProduct !== undefined) closeProduct();
        else if (t.dataset.view) openProduct(t.dataset.view);
        else if (t.dataset.modalAdd) {
            const color =
                document.querySelector('[name="product-color"]:checked')
                    ?.value || "";
            const size =
                document.querySelector('[name="product-size"]:checked')
                    ?.value || "";
            addToCart(t.dataset.modalAdd, color, size);
            closeProduct();
        } else if (t.dataset.quickAdd) openQuickAdd(t.dataset.quickAdd);
        else if (t.dataset.remove) removeFromCart(t.dataset.remove);
        else if (t.dataset.inc)
            setQty(t.dataset.inc, (cart.get(t.dataset.inc) || 0) + 1);
        else if (t.dataset.dec)
            setQty(t.dataset.dec, (cart.get(t.dataset.dec) || 0) - 1);
    });
    document.addEventListener("change", (event) => {
        if (event.target.name === "product-color") {
            activeColor = event.target.value;
            updateProductView();
        }
    });
    document.addEventListener("keydown", (event) => {
        const card = event.target.closest?.("[data-product-card]");
        if (card && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openProduct(card.dataset.productCard);
        }
    });
    const gallery = document.getElementById("product-modal-content");
    let swipeStartX = null;
    gallery.addEventListener(
        "touchstart",
        (event) => {
            if (event.target.closest(".product-view__main-button"))
                swipeStartX = event.touches[0].clientX;
        },
        { passive: true },
    );
    gallery.addEventListener(
        "touchend",
        (event) => {
            if (swipeStartX === null) return;
            const distance = event.changedTouches[0].clientX - swipeStartX;
            if (Math.abs(distance) > 45)
                setGalleryImage(galleryIndex + (distance < 0 ? 1 : -1));
            swipeStartX = null;
        },
        { passive: true },
    );
    document
        .getElementById("search-toggle")
        .addEventListener("click", () => toggleSearch());
    document
        .getElementById("search-close")
        .addEventListener("click", () => toggleSearch(false));
    document
        .getElementById("search-input")
        .addEventListener("input", (e) => renderSearchResults(e.target.value));
    document.addEventListener("click", (e) => {
        const panel = document.getElementById("search-panel");
        if (
            panel.classList.contains("is-open") &&
            !e.target.closest("#search-panel") &&
            !e.target.closest("#search-toggle")
        ) {
            toggleSearch(false);
        }
    });
    ["category-filter", "size-filter", "sort-filter"].forEach((id) =>
        document
            .getElementById(id)
            .addEventListener("change", renderCollections),
    );
    document.getElementById("filters-reset").addEventListener("click", () => {
        ["category-filter", "size-filter", "sort-filter"].forEach(
            (id) => (document.getElementById(id).selectedIndex = 0),
        );
        renderCollections();
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".suggest-wrap"))
            document
                .querySelectorAll(".suggestions")
                .forEach((x) => x.classList.remove("is-open"));
    });
}
renderAnnouncement();
loadCatalog();
renderReviews();
renderFaq();
renderCommunity();
initMobileMenu();
initEvents();
