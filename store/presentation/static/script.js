/* ============================================================
   APEX GRID — логика витрины, корзины и оформления заказа
   ============================================================ */

/* ---------- Данные ---------- */
let collections = [];

let reviews = [];

const faqs = [
    {
        q: "Куда вы доставляете?",
        a: "По России доставляем в пункты выдачи СДЭК. Стоимость и срок рассчитываются при оформлении заказа после выбора города.",
    },
    {
        q: "Как сидят вещи?",
        a: "Доступные размеры указаны в карточке товара. Выбери цвет и размер перед добавлением в корзину: наличие проверяется для выбранного варианта.",
    },
    {
        q: "Можно ли вернуть заказ?",
        a: "Да. Новые вещи с бирками можно вернуть по условиям публичной оферты и законодательства.",
    },
    {
        q: "Как отследить заказ?",
        a: "После отправки трек-номер появится в личном кабинете, когда магазин добавит его к заказу. Войди в аккаунт перед оформлением, чтобы видеть историю заказов.",
    },
];

const announcements = [
    "APEX / ГОНОЧНАЯ КУЛЬТУРА",
    "APEX CLUB — БАЛЛЫ ЗА ОПЛАЧЕННЫЕ ПОКУПКИ",
    "ТВОИ ЗАКАЗЫ В ЛИЧНОМ КАБИНЕТЕ",
    "СОЗДАНО ДЛЯ ОДЕРЖИМЫХ СКОРОСТЬЮ",
];
const communityPhotos = Array.from({ length: 6 }, (_, index) => ({
    src: `/images/reference/community-${index + 1}.webp`,
    alt: `Гоночный стиль — образ ${index + 1}`,
}));
let availableCategories = [];
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
const moneyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 2,
});
const money = (v) => moneyFormatter.format(Number(v) || 0);
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

let catalogItems = [];
let catalogOffset = 0;
let catalogTotal = 0;
let catalogRequest = 0;
const detailRequests = new Map();
function normalizeProduct(item) {
    return {
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
            ...(item.variants || []).map((v) => Number(v.old_price) || 0),
        ),
    };
}
function imageAttributes(url, width = 480) {
    url =
        typeof url === "string" && url
            ? url
            : "/images/product-placeholder.svg";
    if (url.startsWith("/media/"))
        return `src="${esc(url)}?w=${width}" srcset="${esc(url)}?w=240 240w, ${esc(url)}?w=480 480w, ${esc(url)}?w=960 960w" sizes="(max-width:699px) 48vw,33vw"`;
    return `src="${esc(url)}"`;
}
async function ensureProduct(id) {
    if (productById[id]?._full) return productById[id];
    if (!detailRequests.has(String(id)))
        detailRequests.set(
            String(id),
            jsonFetch(`/api/products/${id}`)
                .then(
                    (item) =>
                        (productById[String(id)] = {
                            ...normalizeProduct(item),
                            _full: true,
                        }),
                )
                .finally(() => detailRequests.delete(String(id))),
        );
    return detailRequests.get(String(id));
}
async function loadCatalog(reset = true) {
    const sequence = ++catalogRequest;
    const catalog = document.getElementById("collections");
    let feedback = document.getElementById("catalog-feedback");
    if (!feedback) {
        feedback = document.createElement("div");
        feedback.id = "catalog-feedback";
        feedback.className = "catalog-feedback";
        feedback.setAttribute("role", "status");
        document.getElementById("catalog-count").after(feedback);
    }
    feedback.hidden = true;
    catalog.setAttribute("aria-busy", "true");
    if (reset && !catalogItems.length)
        catalog.innerHTML =
            '<div class="catalog-skeleton" role="status"><span>Собираем стартовую решётку…</span><i></i><i></i><i></i><i></i></div>';
    const params = new URLSearchParams({
        limit: 24,
        offset: reset ? 0 : catalogOffset,
        category: document.getElementById("category-filter").value,
        size: document.getElementById("size-filter").value,
        sort: document.getElementById("sort-filter").value,
    });
    try {
        const page = await jsonFetch("/api/catalog?" + params);
        if (sequence !== catalogRequest) return;
        catalogItems = reset ? page.items : catalogItems.concat(page.items);
        catalogOffset = catalogItems.length;
        catalogTotal = page.total;
        catalogItems.forEach((item) => {
            const normalized = normalizeProduct(item);
            productById[normalized.id] = productById[normalized.id]?._full
                ? productById[normalized.id]
                : normalized;
        });
        const grouped = new Map();
        catalogItems.forEach((item) => {
            if (!grouped.has(item.category)) grouped.set(item.category, []);
            grouped.get(item.category).push(productById[String(item.id)]);
        });
        collections = [...grouped].map(([category, products], index) => ({
            id: `catalog-${index}`,
            eyebrow: "APEX COLLECTION",
            title: category,
            products,
        }));
        for (const [id, options, label] of [
            ["category-filter", page.categories, "Все категории"],
            ["size-filter", page.sizes, "Все размеры"],
        ]) {
            const select = document.getElementById(id),
                value = select.value;
            select.innerHTML =
                `<option value="all">${label}</option>` +
                options
                    .map((v) => `<option value="${esc(v)}">${esc(v)}</option>`)
                    .join("");
            select.value = options.includes(value) ? value : "all";
        }
        availableCategories = page.categories;
        window.refreshCatalogFilters?.();
        renderCatalogNavigation();
        renderCategoryTiles();
        renderCollections();
        document.getElementById("featured-products").innerHTML = catalogItems
            .slice(0, 6)
            .map((item) =>
                productCard(productById[String(item.id)], "featured"),
            )
            .join("");
        document.getElementById("featured-collection").hidden =
            catalogItems.length === 0;
        document.getElementById("catalog-count").textContent =
            `Показано ${catalogItems.length} из ${catalogTotal}`;
        document.getElementById("catalog-more").hidden =
            catalogOffset >= catalogTotal;
        if (!catalogTotal)
            catalog.innerHTML =
                '<section class="section"><div class="empty-state"><h3>Вещи для следующего круга скоро появятся</h3><p>Пока здесь нет товаров по выбранным фильтрам.</p></div></section>';
        const fresh = catalogItems
            .filter((p) => p.is_new)
            .slice(0, 4)
            .map((p) => productById[String(p.id)]);
        document.getElementById("new-arrivals-grid").innerHTML = fresh
            .map((product) => productCard(product, "new"))
            .join("");
        document.getElementById("new-arrivals").hidden = !fresh.length;
        await Promise.allSettled(
            [...cart.keys()].map((key) => ensureProduct(cartSelection(key).id)),
        );
        renderCart();
        if (location.hash.startsWith("#product-"))
            openProduct(location.hash.slice(9), false);
    } catch (error) {
        if (sequence !== catalogRequest) return;
        if (!catalogItems.length)
            catalog.innerHTML =
                '<section class="section"><div class="empty-state"><h2>Не удалось загрузить каталог</h2><p>Проверьте соединение. Содержимое корзины сохранено.</p><button class="button button--dark" type="button" data-retry-catalog>Попробовать снова</button></div></section>';
        else {
            feedback.innerHTML =
                "<span>" +
                esc(error.message) +
                ' Показаны предыдущие товары.</span><button type="button" data-retry-catalog>Повторить</button>';
            feedback.hidden = false;
        }
    } finally {
        if (sequence === catalogRequest) catalog.removeAttribute("aria-busy");
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
function renderCommunityGallery() {
    document.getElementById("flf-gallery-grid").innerHTML = communityPhotos
        .map(
            ({ src, alt }) =>
                `<figure class="flf-gallery__item"><img src="${src}" alt="${alt}" width="800" height="800" loading="lazy" decoding="async"></figure>`,
        )
        .join("");
}
function renderCatalogNavigation() {
    const links = availableCategories
        .slice(0, 5)
        .map(
            (category) =>
                `<a href="#catalog-filter-title" data-store-category="${esc(category)}">${esc(category)}</a>`,
        )
        .join("");
    const help =
        '<details class="header-help"><summary>Помощь <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div><a href="#faq-list">Доставка и возврат</a><a href="#story">О коллекции</a><a href="/account">Мои заказы</a></div></details>';
    document.getElementById("desktop-nav").innerHTML =
        `${links}<a href="#catalog-filter-title" data-store-category="all">Каталог</a>${help}`;
    document.getElementById("mobile-nav").innerHTML =
        `${links}<a href="#catalog-filter-title" data-store-category="all">Все товары</a><a href="#faq-list">Доставка и возврат</a><a href="/account">Кабинет и заказы</a><a href="#story">О коллекции</a>`;
}
function renderCategoryTiles() {
    const definitions = [
        ["Куртки", "jackets", /куртк|jacket/i],
        ["Худи", "hoodies", /худи|hoodie/i],
        ["Весь каталог", "bundles", /комплект|bundle|набор/i],
        ["Футболки", "tees", /футбол|tees|t-shirt/i],
    ];
    document.getElementById("category-tiles").innerHTML = definitions
        .map(([title, image, pattern]) => {
            const category = availableCategories.find((name) =>
                pattern.test(name),
            );
            return `<a class="category-tile" href="#catalog-filter-title" data-store-category="${esc(category || "all")}"><img src="/images/reference/category-${image}.webp" alt="${esc(title)} — гоночная коллекция" width="800" height="800" loading="lazy" decoding="async"><span>${image === "bundles" && category ? esc(category) : title}<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></span></a>`;
        })
        .join("");
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
                ? `<section id="${c.id}" class="section"><div class="section__head"><div><p class="eyebrow">${c.eyebrow}</p><h2 class="display section__title">${esc(c.title)}</h2></div><a href="#${c.id}" class="section__link">Смотреть всё ${ICONS.arrow}</a></div><div class="grid">${products.map(productCard).join("")}</div></section>`
                : "";
        })
        .join("");
    const count = document.getElementById("catalog-count");
    if (count)
        count.textContent = visibleCount
            ? `Показано товаров: ${visibleCount}`
            : "По выбранным фильтрам товаров нет";
}
function productCard(p, section = "catalog") {
    if (typeof section !== "string") section = "catalog";
    const primary = p.images[0] || "";
    const secondary = p.images[1];
    const pictures = primary
        ? `<img class="card__image card__image--primary" ${imageAttributes(primary)} alt="${esc(p.name)}" width="800" height="1000" decoding="async" loading="lazy" />${secondary ? `<img class="card__image card__image--hover" ${imageAttributes(secondary)} alt="" width="800" height="1000" decoding="async" loading="lazy" />` : ""}`
        : `<span class="card__no-image">Фото скоро появится</span>`;
    return `<article class="card" id="${section}-product-${p.id}" data-product-card="${p.id}" tabindex="0"><div class="card__media">${pictures}${p.is_new ? '<span class="drop-badge">Новинка</span>' : ""}<div class="card__actions"><button type="button" class="card__view" data-view="${p.id}">Посмотреть товар</button><button type="button" class="card__add" data-quick-add="${p.id}" aria-label="Быстро добавить ${esc(p.name)} в корзину"><span>Быстро добавить</span>${ICONS.plus}</button></div></div><div class="card__info"><div><p class="card__category">${esc(p.category)}</p><h3 class="card__name">${esc(p.name)}</h3></div><p class="card__prices"><span class="card__price">${money(p.price)}</span>${p.compareAt > Number(p.price) ? `<del>${money(p.compareAt)}</del>` : ""}</p></div></article>`;
}
let reviewsOffset = 0;
let reviewsTotal = 0;
function drawReviews() {
    document.getElementById("reviews-grid").innerHTML = reviews.length
        ? reviews
              .map(
                  (r) =>
                      `<button type="button" class="review" data-review-id="${r.id || ""}"><span class="review__stars">${ICONS.star.repeat(Number(r.rating || 5))}</span><strong>${esc(r.title || "Отзыв о покупке")}</strong><span class="review__quote">&ldquo;${esc(r.body || r.quote)}&rdquo;</span><span class="review__author">— ${esc(r.author)}</span>${r.has_images ? '<span class="review__media-mark">Есть фотографии</span>' : ""}</button>`,
              )
              .join("")
        : '<p class="reviews-empty">Здесь появятся впечатления покупателей после первых заказов.</p>';
}
async function renderReviews(append = false) {
    const limit = 10;
    try {
        const page = await jsonFetch(
            `/api/reviews?limit=${limit}&offset=${append ? reviewsOffset : 0}`,
        );
        reviews = append ? reviews.concat(page.items) : page.items;
        reviewsOffset = reviews.length;
        reviewsTotal = page.total;
    } catch (_) {
        if (append) return;
        reviewsTotal = reviews.length;
    }
    drawReviews();
    document.getElementById("reviews-total").textContent =
        `${reviewsTotal} отзывов покупателей`;
    const more = document.getElementById("reviews-more");
    more.classList.toggle(
        "hidden",
        reviewsOffset >= reviewsTotal || location.pathname !== "/reviews",
    );
    if (location.pathname === "/reviews")
        document.querySelector(".reviews").classList.add("reviews--page");
}

async function openReview(id) {
    const review = reviews.find((item) => String(item.id) === String(id));
    if (!review) return;
    const modal = document.getElementById("review-modal");
    const content = document.getElementById("review-modal-content");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    content.innerHTML = `<div class="review__stars">${ICONS.star.repeat(Number(review.rating || 5))}</div><h2>${esc(review.title || "Отзыв о покупке")}</h2><p class="review-modal__author">${esc(review.author)}</p><p class="review-modal__body">${esc(review.body || review.quote)}</p><div class="review-modal__photos">${review.has_images ? "Загружаем фотографии…" : ""}</div>`;
    if (review.has_images) {
        try {
            const images = await jsonFetch(`/api/reviews/${id}/images`);
            content.querySelector(".review-modal__photos").innerHTML = images
                .map(
                    (image) =>
                        `<img src="${esc(image.image_url)}" alt="${esc(image.alt_text || `Фото от ${review.author}`)}" loading="lazy" />`,
                )
                .join("");
        } catch (_) {
            content.querySelector(".review-modal__photos").textContent =
                "Не удалось загрузить фотографии.";
        }
    }
}
function closeReview() {
    const modal = document.getElementById("review-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}
function renderFaq() {
    document.getElementById("faq-list").innerHTML = faqs
        .map(
            (f) =>
                `<details><summary>${f.q} ${ICONS.plus}</summary><p class="faq__answer">${f.a}</p></details>`,
        )
        .join("");
}

function renderCommunity() {
    const communityMedia = communityPhotos.map((item) => [item.src, item.alt]);
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
                      `<button type="button" class="search-result" data-view="${p.id}" role="option"><img ${imageAttributes(p.image, 240)} alt="" width="60" height="75" loading="lazy" /><span><b>${esc(p.name)}</b><small>${esc(p.category)} · ${esc(p.sizes.join(" / "))}</small></span><strong>${money(p.price)}</strong>${ICONS.arrow}</button>`,
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
        setMobileMenu(false);
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
        images: images.length ? images : ["/images/product-placeholder.svg"],
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
    return `<div class="product-view"><div class="product-view__gallery"><button type="button" class="product-view__main-button" data-open-lightbox aria-label="Открыть фотографию полностью"><img class="product-view__main" src="${esc(view.images[0])}" alt="${esc(p.name)}" /></button><div class="product-view__thumbs"></div></div><div class="product-view__info"><p class="eyebrow">${esc(p.category)}</p><h2 class="display product-view__title" id="product-modal-title">${esc(p.name)}</h2><div class="product-view__prices"><strong></strong></div><div class="product-assurances"><span>${ICONS.bag}Доставка СДЭК</span><span>${ICONS.star}APEX Club</span><span>${ICONS.arrow}Выбор размера</span></div>${colors.length ? `<fieldset><legend>Цвет</legend><div class="product-view__options product-view__colors">${colors.map((color, index) => `<label><input type="radio" name="product-color" value="${esc(color)}" ${index === 0 ? "checked" : ""}/><span>${esc(color)}</span></label>`).join("")}</div></fieldset>` : ""}<fieldset><legend>Размер <small>— доступны сейчас</small></legend><div class="product-view__options product-view__sizes"></div></fieldset><div class="product-quantity"><span>Количество</span><div class="qty"><button type="button" data-product-quantity-step="-1" aria-label="Уменьшить количество">−</button><input id="product-quantity" type="number" min="1" max="99" value="1" aria-label="Количество товара"><button type="button" data-product-quantity-step="1" aria-label="Увеличить количество">+</button></div></div><p class="product-view__stock"></p><button type="button" class="product-view__add" data-modal-add="${p.id}">${ICONS.bag} <span></span></button><div class="product-club-note"><strong>APEX Club</strong><span>Баллы за оплаченные покупки и история заказов в <a href="/account">личном кабинете</a>.</span></div><div class="product-details"><details open><summary>Описание</summary><p class="product-view__description">${esc(p.description || "Гоночный характер в каждой детали.")}</p></details><details><summary>Доставка и получение</summary><p>Доступные способы, стоимость и сроки рассчитываются при оформлении. Для СДЭК выбери город и пункт выдачи.</p></details></div></div></div>`;
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
    updateSelectedVariant();
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

function updateSelectedVariant() {
    const product = productById[activeProductId];
    if (!product) return;
    const size =
        document.querySelector('[name="product-size"]:checked')?.value || "";
    const variant = (product.variants || []).find(
        (v) => (v.color || "") === activeColor && (v.size || "") === size,
    );
    const price = Number(variant?.price ?? product.price);
    const stock = Number(variant?.stock ?? product.stock);
    const quantity = document.getElementById("product-quantity");
    if (quantity) {
        quantity.max = Math.min(99, stock);
        quantity.value = Math.max(
            1,
            Math.min(Number(quantity.value) || 1, Number(quantity.max) || 1),
        );
    }
    const button = document.querySelector(".product-view__add");
    if (button) {
        button.disabled =
            !stock || Boolean(product.variants?.length && !variant);
        button.querySelector("span").textContent =
            `В корзину · ${money(price)}`;
    }
    const priceLabel = document.querySelector(".product-view__prices strong");
    if (priceLabel) priceLabel.textContent = money(price);
    const stockLabel = document.querySelector(".product-view__stock");
    if (stockLabel)
        stockLabel.textContent = stock
            ? `● В наличии в этом размере — ${stock} шт.`
            : "Размер закончился";
}

async function openProduct(id, updateHash = true) {
    let p;
    try {
        p = await ensureProduct(id);
    } catch (error) {
        showToast(error.message);
        return;
    }
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
    fetch(`/api/products/${p.id}/view`, { method: "POST" }).catch(() => {});
    if (updateHash) history.replaceState(null, "", `#product-${id}`);
    modal.querySelector(".product-modal__close").focus();
}
async function openQuickAdd(id) {
    let p;
    try {
        p = await ensureProduct(id);
    } catch (error) {
        showToast(error.message);
        return;
    }
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
function storedCart() {
    try {
        return new Map(
            JSON.parse(localStorage.getItem("apex-cart") || "[]").filter(
                ([key, qty]) =>
                    typeof key === "string" &&
                    Number.isInteger(qty) &&
                    qty > 0 &&
                    qty <= 99,
            ),
        );
    } catch {
        return new Map();
    }
}
const cart = storedCart();
try {
    for (const item of JSON.parse(
        localStorage.getItem("apex-cart-products") || "[]",
    ))
        productById[String(item.id)] = normalizeProduct(item);
} catch {}
let quoteState = null;
let member = null;
let quoteSequence = 0;
let pendingCheckoutKey = null;
let submittedCartFingerprint = null;
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
    try {
        localStorage.setItem("apex-cart", JSON.stringify([...cart]));
        localStorage.setItem(
            "apex-cart-products",
            JSON.stringify(
                [
                    ...new Set(
                        [...cart.keys()].map((key) => cartSelection(key).id),
                    ),
                ]
                    .map((id) => productById[id])
                    .filter(Boolean)
                    .map((p) => ({
                        ...p,
                        _full: undefined,
                        description: "",
                        images: p.images.slice(0, 1),
                        variants: (p.variants || []).map((v) => ({
                            ...v,
                            images: [],
                        })),
                    })),
            ),
        );
    } catch {}
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
    return Number(quoteState?.promo_discount || 0);
}
function grandTotal() {
    return quoteState ? Number(quoteState.total) : cartTotal();
}
function cartItems() {
    return [...cart].map(([key, quantity]) => {
        const item = cartSelection(key);
        return {
            product_id: Number(item.id),
            color: item.color,
            size: item.size,
            quantity,
        };
    });
}
async function refreshQuote() {
    const sequence = ++quoteSequence;
    const status = document.getElementById("promo-status");
    const button = document.querySelector('#checkout-form [type="submit"]');
    if (button) button.disabled = true;
    try {
        const delivery = { ...deliveryState };
        if (!delivery.pvz && ["pvz", "cdek"].includes(delivery.type))
            delete delivery.type;
        const result = await jsonFetch("/api/cart/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartItems(),
                promo_code: activePromo?.code || "",
                points: Number(
                    document.getElementById("loyalty-points")?.value || 0,
                ),
                delivery,
            }),
        });
        if (sequence !== quoteSequence) return;
        quoteState = result;
        if (status)
            status.textContent = result.promo_code
                ? `Промокод ${result.promo_code}: −${money(result.promo_discount)}`
                : "Скидки и итог проверены магазином";
        const points = document.getElementById("loyalty-points");
        if (points) points.max = result.max_points;
        if (button)
            button.disabled =
                !document.querySelector('input[name="payment"]:checked') ||
                !document.querySelector('input[name="delivery-type"]:checked');
        renderTotals();
    } catch (error) {
        if (sequence !== quoteSequence) return;
        quoteState = null;
        if (status) status.textContent = error.message;
        showToast(error.message);
    }
}
function addToCart(id, color = "", size = "", quantity = 1) {
    if (!productById[id]) return;
    const key = cartKey(id, color, size);
    const p = productById[id],
        variant = selectionVariant(p, color, size);
    const available = Number(variant?.stock ?? p.stock);
    if (
        (p.variants?.length && !variant) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        (cart.get(key) || 0) + quantity > Math.min(99, available)
    )
        return showToast("Выбранное количество недоступно");
    quoteState = null;
    pendingCheckoutKey = null;
    cart.set(key, (cart.get(key) || 0) + quantity);
    fetch(`/api/products/${id}/cart`, { method: "POST" }).catch(() => {});
    renderCart();
    showToast(`Добавлено — ${productById[id].name}`);
}
function removeFromCart(id) {
    quoteState = null;
    pendingCheckoutKey = null;
    cart.delete(id);
    renderCart();
}
function setQty(id, qty) {
    const { color, size } = cartSelection(id),
        p = cartProduct(id);
    if (
        qty >
        Math.min(
            99,
            Number(selectionVariant(p, color, size)?.stock ?? p?.stock ?? 0),
        )
    )
        return showToast("Больше этого размера нет в наличии");
    quoteState = null;
    pendingCheckoutKey = null;
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
        body.innerHTML = `<div class="cart__empty">${ICONS.bag}<h3>Твой следующий дроп ждёт</h3><p>Добавь любимые вещи — мы сохраним их здесь.</p><button type="button" class="action-button" id="cart-continue">Вернуться к покупкам →</button></div>`;
        document.getElementById("cart-continue").onclick = closeCart;
        return;
    }

    const lines = [];
    cart.forEach((qty, key) => {
        const selection = cartSelection(key),
            p = productById[selection.id];
        if (!p) {
            lines.push(
                `<div class="cart__line"><span>Товар #${esc(selection.id)} временно недоступен. Корзина сохранена.</span><button type="button" data-remove="${esc(key)}">Удалить</button></div>`,
            );
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
            `<div class="cart__line"><img ${imageAttributes(image, 240)} width="88" height="110" loading="lazy" alt="${esc(p.name)}" /><div class="cart__line-body"><div class="cart__line-top"><h3 class="cart__line-name">${esc(p.name)}</h3><button type="button" class="cart__line-remove" data-remove="${esc(key)}" aria-label="Удалить ${esc(p.name)}">${ICONS.close}</button></div><p class="cart__line-category">${esc(p.category)}</p>${details ? `<p class="cart__line-options">${details}</p>` : ""}<div class="cart__line-bottom"><div class="qty"><button type="button" data-dec="${esc(key)}" aria-label="Уменьшить количество">${ICONS.minus}</button><span aria-live="polite">${qty}</span><button type="button" ${qty >= Number(variant?.stock ?? p.stock) ? "disabled" : ""} data-inc="${esc(key)}" aria-label="Увеличить количество">${ICONS.plus}</button></div><span class="cart__line-total">${money(price * qty)}</span></div></div></div>`,
        );
    });
    body.innerHTML =
        lines.join("") +
        `<div class="cart__summary"><p class="cart-note">Доставка и скидки — на следующем шаге. Корзина сохраняется автоматически.</p><div><span>Товары · ${count} шт.</span><b>${money(cartTotal())}</b></div><button type="button" class="cart__checkout" id="open-checkout">Продолжить оформление</button></div>`;
    document.getElementById("open-checkout").onclick = openCheckout;
}

function openCheckout() {
    closeCart();
    document.getElementById("checkout-modal-body").innerHTML =
        renderCheckoutForm();
    const modal = document.getElementById("checkout-modal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    bindCheckoutControls();
}

function closeCheckout() {
    const modal = document.getElementById("checkout-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function renderCheckoutForm() {
    const preview = [...cart]
        .map(([key, quantity]) => {
            const selection = cartSelection(key),
                product = cartProduct(key);
            if (!product) return "";
            const variant = selectionVariant(
                    product,
                    selection.color,
                    selection.size,
                ),
                image = variant?.images?.[0] || product.image;
            return (
                '<div class="checkout-preview__item">' +
                (image
                    ? "<img " +
                      imageAttributes(image, 240) +
                      ' alt="" width="48" height="58">'
                    : "") +
                "<span>" +
                esc(product.name) +
                "<small>" +
                esc(
                    [selection.color, selection.size]
                        .filter(Boolean)
                        .join(" / "),
                ) +
                " · " +
                quantity +
                " шт.</small></span><b>" +
                money(Number(variant?.price ?? product.price) * quantity) +
                "</b></div>"
            );
        })
        .join("");
    return (
        '<form class="checkout" id="checkout-form" novalidate><h3 class="checkout__title display">Оформление заказа</h3><p class="checkout__intro">Остался один шаг до следующего гоночного образа.</p><div class="checkout-layout"><div class="checkout-main">' +
        '<section class="checkout-section"><h4><span>1</span>Контактные данные</h4><div class="checkout__grid"><label>Имя<input id="customer-name" autocomplete="given-name" required placeholder="Иван"></label><label>Почта<input id="customer-email" type="email" autocomplete="email" required placeholder="name@example.com"></label><label class="checkout__wide">Телефон<input id="customer-phone" type="tel" autocomplete="tel" required value="+7 " placeholder="+7 (999) 123-45-67"></label></div></section>' +
        '<section class="checkout-section"><h4><span>2</span>Получение заказа</h4><div class="checkout__radio" id="delivery-options"><span class="checkout__hint">Загрузка способов доставки…</span></div><label id="city-label">Город<div class="suggest-wrap"><input id="delivery-city" autocomplete="off" disabled placeholder="Начните вводить город"><div class="suggestions" id="city-suggestions"></div></div></label><div class="checkout__hint" id="delivery-status">Проверяем доступные способы доставки…</div><label id="pvz-label">Пункт получения<div class="suggest-wrap"><input id="delivery-point" autocomplete="off" disabled placeholder="Сначала выберите город"><div class="suggestions" id="pvz-suggestions"></div></div></label><div class="pvz-info" id="pvz-info"></div><label>ФИО получателя полностью<input id="recipient-name" autocomplete="name" required placeholder="Иванов Иван Иванович"></label><label>Комментарий к заказу<textarea id="order-comment" rows="3" placeholder="Что нам стоит знать о заказе"></textarea></label></section>' +
        '<section class="checkout-section"><h4><span>3</span>Способ оплаты</h4><div class="checkout__radio" id="payment-options"><span class="checkout__hint">Загрузка способов оплаты…</span></div><label class="check"><input type="checkbox" id="privacy-consent" required><span>Я согласен с <a href="/privacy" target="_blank" rel="noopener">политикой обработки персональных данных</a>.</span></label><label class="check"><input type="checkbox" id="delivery-consent" required><span>Я ознакомился с условиями доставки и <a href="/oferta" target="_blank" rel="noopener">публичной офертой</a>.</span></label></section></div>' +
        '<aside class="checkout-summary"><h4>Ваш заказ · ' +
        cartCount() +
        ' шт.</h4><div class="checkout-preview">' +
        preview +
        '</div><label for="promo-code">Промокод</label><div class="promo-row"><input id="promo-code" placeholder="Введите промокод" autocomplete="off"><button type="button" id="apply-promo">Применить</button></div><p class="checkout__hint" id="promo-status">Если у тебя есть промокод, укажи его здесь.</p>' +
        (member
            ? "<label>APEX Club · " +
              Number(member.points) +
              ' баллов<input id="loyalty-points" type="number" min="0" step="1" value="0"></label><p class="checkout__hint">1 балл = 1 ₽. Доступную сумму рассчитает магазин.</p>'
            : '<p class="checkout__hint"><a href="/account">Войди в кабинет</a>, чтобы копить и тратить баллы.</p>') +
        '<div class="checkout__totals" id="checkout-totals" aria-live="polite"></div><button type="submit" class="cart__checkout">Перейти к оплате ' +
        ICONS.arrow +
        '</button><p class="checkout-secure">' +
        ICONS.bag +
        "Защищённая оплата на странице банка</p></aside></div></form>"
    );
}

/* ---------- Delivery / checkout ---------- */
async function jsonFetch(url, options = {}) {
    let r;
    try {
        r = await fetch(url, {
            ...options,
            signal: options.signal || AbortSignal.timeout(15000),
        });
    } catch (error) {
        throw new Error(
            ["AbortError", "TimeoutError"].includes(error.name)
                ? "Сервер долго не отвечает. Попробуйте ещё раз."
                : "Не удалось связаться с магазином. Проверьте подключение.",
        );
    }
    const data = await r.json().catch(() => null);
    if (!r.ok) throw new Error(data?.error || `Ошибка запроса (${r.status})`);
    return data;
}
async function fetchCities(query) {
    return jsonFetch("/api/delivery/cities?q=" + encodeURIComponent(query));
}
async function calculateDelivery(postalCode) {
    return jsonFetch("/api/delivery/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            postal_code: postalCode,
            city_code: deliveryState.city_code || 0,
            items: cartItems(),
        }),
    });
}
async function loadPvz(postalCode) {
    return jsonFetch(
        `/api/delivery/pvz?postalCode=${encodeURIComponent(postalCode)}&city_code=${deliveryState.city_code || 0}`,
    );
}
function renderTotals() {
    const element = document.getElementById("checkout-totals");
    if (!element) return;
    const quote = quoteState;
    element.innerHTML = `<div><span>Товары</span><b>${money(quote?.subtotal ?? cartTotal())}</b></div>${quote?.promo_discount ? `<div><span>Промокод</span><b>−${money(quote.promo_discount)}</b></div>` : ""}${quote?.points_spent ? `<div><span>Баллы</span><b>−${money(quote.points_spent)}</b></div>` : ""}<div><span>Доставка</span><b>${quote?.delivery_pending ? "Выберите способ" : money(quote?.shipping || 0)}</b></div><div><span>Итого</span><b>${money(quote?.total ?? cartTotal())}</b></div>${quote?.points_earned ? `<p class="checkout__hint">+${quote.points_earned} баллов после оплаты</p>` : ""}`;
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
    if (!el) return;
    el.classList.toggle("input-error", invalid);
    el.setAttribute("aria-invalid", String(invalid));
}
let checkoutIntegrations = [];
let deliveryRequest = 0;
async function loadCheckoutIntegrations() {
    const paymentBox = document.getElementById("payment-options"),
        deliveryBox = document.getElementById("delivery-options");
    try {
        checkoutIntegrations = await jsonFetch("/api/checkout/integrations");
        const payments = checkoutIntegrations.filter(
            (item) => item.kind === "payment" && item.provider === "tbank",
        );
        const deliveries = checkoutIntegrations.filter(
            (item) =>
                item.kind === "delivery" &&
                ["pickup", "cdek"].includes(item.provider),
        );
        paymentBox.innerHTML = payments.length
            ? payments
                  .map(
                      (item, index) =>
                          '<label><input type="radio" name="payment" value="' +
                          esc(item.provider) +
                          '" ' +
                          (index === 0 ? "checked" : "") +
                          "><span>" +
                          esc(item.name) +
                          "</span></label>",
                  )
                  .join("")
            : '<p class="checkout__hint">Оплата пока не настроена. Магазину нужно подключить оплату.</p>';
        const hasCdek = deliveries.some((item) => item.provider === "cdek");
        document.getElementById("delivery-city").disabled = !hasCdek;
        if (
            !deliveries.some(
                (item) =>
                    (item.provider === "cdek" ? "pvz" : "pickup") ===
                    deliveryState.type,
            )
        )
            deliveryState.type = hasCdek ? "pvz" : "pickup";
        deliveryBox.innerHTML = deliveries.length
            ? deliveries
                  .map((item) => {
                      const value = item.provider === "cdek" ? "pvz" : "pickup";
                      return (
                          '<label><input type="radio" name="delivery-type" value="' +
                          value +
                          '" ' +
                          (value === deliveryState.type ? "checked" : "") +
                          "><span>" +
                          esc(item.name) +
                          "</span></label>"
                      );
                  })
                  .join("")
            : '<p class="checkout__hint">Доставка пока не настроена. Магазину нужно подключить способ получения.</p>';
        document.getElementById("city-label").hidden =
            !hasCdek || deliveryState.type === "pickup";
        document.getElementById("pvz-label").hidden =
            !hasCdek || deliveryState.type === "pickup";
        document.getElementById("delivery-status").textContent =
            hasCdek && deliveryState.type !== "pickup"
                ? "Выбери город из подсказок — рассчитаем доставку и покажем пункты выдачи."
                : deliveries.some((item) => item.provider === "pickup")
                  ? "Выбран самовывоз. Город и пункт СДЭК не требуются."
                  : "Сейчас нет доступных способов получения.";
        bindDeliveryType();
        refreshQuote();
    } catch (error) {
        paymentBox.textContent = error.message;
        deliveryBox.textContent =
            "Повтори оформление после восстановления соединения.";
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
    if (member) {
        document.getElementById("customer-name").value = member.name || "";
        document.getElementById("customer-email").value = member.email;
        document.getElementById("customer-phone").value = member.phone || "+7 ";
    }
    document
        .getElementById("loyalty-points")
        ?.addEventListener("change", refreshQuote);
    refreshQuote();
    document.getElementById("apply-promo").onclick = () => {
        const code = document
            .getElementById("promo-code")
            .value.trim()
            .toUpperCase();
        activePromo = code ? { code } : null;
        pendingCheckoutKey = null;
        refreshQuote();
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
    let timer,
        request = 0;
    input.oninput = () => {
        const sequence = ++request;
        ++deliveryRequest;
        if (input.disabled) return;
        deliveryState.city_code = 0;
        deliveryState.postalCode = "";
        deliveryState.pvz = null;
        quoteState = null;
        clearTimeout(timer);
        box.innerHTML = "";
        box.classList.remove("is-open");
        timer = setTimeout(async () => {
            if (input.value.trim().length < 2) return;
            status.textContent = "Ищем город...";
            try {
                const cities = await fetchCities(input.value.trim());
                if (
                    sequence !== request ||
                    !input.isConnected ||
                    input.disabled
                )
                    return;
                box.innerHTML = cities
                    .slice(0, 8)
                    .map(
                        (c) =>
                            `<button type="button" data-name="${esc(c.name)}" data-full="${esc(c.fullName)}" data-postal="${esc(c.postalCode)}" data-city-code="${Number(c.code) || 0}"><b>${c.name}</b><span>${c.fullName}</span></button>`,
                    )
                    .join("");
                box.classList.add("is-open");
                status.textContent = cities.length
                    ? "Выберите город из списка."
                    : "Город не найден.";
            } catch (error) {
                if (
                    sequence !== request ||
                    !input.isConnected ||
                    input.disabled
                )
                    return;
                status.textContent =
                    error.message ||
                    "Не удалось загрузить города. Попробуй ещё раз.";
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
        deliveryState.city_code = Number(btn.dataset.cityCode);
        box.classList.remove("is-open");
        await refreshDelivery();
    };
}
async function refreshDelivery() {
    const sequence = ++deliveryRequest;
    const status = document.getElementById("delivery-status"),
        opts = document.getElementById("delivery-options"),
        point = document.getElementById("delivery-point");
    status.textContent = "Рассчитываем доставку СДЭК...";
    point.disabled = true;
    point.value = "";
    deliveryState.pvz = null;
    try {
        const [calc, pointsList] = await Promise.all([
            calculateDelivery(deliveryState.postalCode),
            loadPvz(deliveryState.postalCode),
        ]);
        if (sequence !== deliveryRequest || !status.isConnected) return;
        deliveryState.price = Number(calc.price || 0);
        deliveryState.days = Number(calc.days || calc.day || 0);
        deliveryState.type = "pvz";
        opts.innerHTML =
            `<label><input type="radio" name="delivery-type" value="pvz" checked>СДЭК — ${money(deliveryState.price)}, от ${deliveryState.days || 1} дн.</label>` +
            checkoutIntegrations
                .filter((item) => item.provider === "pickup")
                .map(
                    (item) =>
                        `<label><input type="radio" name="delivery-type" value="pickup">${esc(item.name)}</label>`,
                )
                .join("");
        cachedPvzList = pointsList;
        bindDeliveryType();
        bindPvzAutocomplete();
        point.disabled = false;
        status.textContent = "Выберите пункт получения (снизу).";
    } catch (err) {
        if (sequence !== deliveryRequest || !status.isConnected) return;
        status.textContent = err.message
            ? `Не удалось рассчитать доставку: ${err.message}`
            : "К сожалению, доставку в выбранный город сейчас не удалось рассчитать.";
        // Keep self-pickup available when a CDEK request fails.
    }
    refreshQuote();
}
function bindDeliveryType() {
    document.querySelectorAll('input[name="delivery-type"]').forEach(
        (r) =>
            (r.onchange = () => {
                ++deliveryRequest;
                deliveryState.type = r.value;
                const pickup = ["self", "pickup"].includes(r.value);
                document.getElementById("city-label").hidden = pickup;
                document.getElementById("pvz-label").hidden = pickup;
                document.getElementById("delivery-city").disabled = pickup;
                if (pickup) {
                    deliveryState.pvz = null;
                    deliveryState.price = 0;
                }
                document.getElementById("delivery-status").textContent = pickup
                    ? "Выбран самовывоз."
                    : "Выбери город и пункт выдачи СДЭК.";
                refreshQuote();
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
                    `<button type="button" data-code="${esc(p.code)}"><b>${esc(p.name)}</b><span>${esc(p.address)}</span></button>`,
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
        info.innerHTML = `<b>${esc(pvz.name)}</b><span>Адрес: ${esc(pvz.address)}</span>${pvz.workTime ? `<span>Время работы: ${esc(pvz.workTime)}</span>` : ""}`;
        refreshQuote();
    };
}
async function submitOrder(e) {
    e.preventDefault();
    const required = [
        ["customer-name", (v) => v.trim().length >= 2],
        ["customer-email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)],
        ["customer-phone", (v) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(v)],
        [
            "delivery-city",
            () =>
                ["self", "pickup"].includes(deliveryState.type) ||
                !!deliveryState.postalCode ||
                !!deliveryState.city_code,
        ],
        ["recipient-name", validateFio],
        ["privacy-consent", (_, el) => el.checked],
        ["delivery-consent", (_, el) => el.checked],
    ];
    if (!["self", "pickup"].includes(deliveryState.type))
        required.push(["delivery-point", () => !!deliveryState.pvz]);
    let ok = true;
    let firstInvalid;
    required.forEach(([id, fn]) => {
        const el = document.getElementById(id);
        const bad = !fn(el.value, el);
        markInvalid(el, bad);
        if (bad && !firstInvalid) firstInvalid = el;
        ok = ok && !bad;
    });
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) ok = false;
    if (!ok) {
        firstInvalid?.focus({ preventScroll: true });
        firstInvalid?.scrollIntoView({ block: "center" });
        return showToast("Проверьте обязательные поля");
    }
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
        promo_code: activePromo?.code || "",
        points: Number(document.getElementById("loyalty-points")?.value || 0),
        payment: payment.value,
        idempotency_key: (pendingCheckoutKey ||= crypto.randomUUID()),
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
    const fingerprint = JSON.stringify({
        ...payload,
        idempotency_key: undefined,
    });
    if (submittedCartFingerprint && submittedCartFingerprint !== fingerprint)
        payload.idempotency_key = pendingCheckoutKey = crypto.randomUUID();
    submittedCartFingerprint = fingerprint;
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
        button.textContent = "Перейти к оплате";
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
let setMobileMenu = () => {};
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle"),
        nav = document.getElementById("mobile-nav"),
        backdrop = document.getElementById("mobile-menu-backdrop");
    setMobileMenu = (open) => {
        nav.classList.toggle("hidden", !open);
        backdrop.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
        document
            .getElementById("menu-icon-open")
            .classList.toggle("hidden", open);
        document
            .getElementById("menu-icon-close")
            .classList.toggle("hidden", !open);
        document.querySelector(".header").classList.toggle("menu-open", open);
        document.body.classList.toggle("menu-open", open);
        if (open) nav.querySelector("a")?.focus();
    };
    toggle.onclick = () =>
        setMobileMenu(toggle.getAttribute("aria-expanded") !== "true");
    backdrop.onclick = () => setMobileMenu(false);
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMobileMenu(false);
    });
    window
        .matchMedia("(min-width: 1101px)")
        .addEventListener("change", (event) => {
            if (event.matches) setMobileMenu(false);
        });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMobileMenu(false);
    });
    const observer = new IntersectionObserver(
        (entries) =>
            document
                .querySelector(".header")
                .classList.toggle("is-solid", !entries[0].isIntersecting),
        { rootMargin: "-145px 0px 0px 0px" },
    );
    observer.observe(document.querySelector(".hero"));
    document.addEventListener("click", (event) => {
        const category = event.target.closest("[data-store-category]");
        if (category) {
            document.getElementById("category-filter").value =
                category.dataset.storeCategory;
            loadCatalog();
        }
        const step = event.target.closest("[data-product-quantity-step]");
        if (step) {
            const input = document.getElementById("product-quantity");
            input.value = Math.max(
                1,
                Math.min(
                    Number(input.max) || 99,
                    Number(input.value) +
                        Number(step.dataset.productQuantityStep),
                ),
            );
        }
    });
    document.getElementById("reviews-prev").onclick = () =>
        document
            .querySelector(".reviews__viewport")
            .scrollBy({ left: -360, behavior: "smooth" });
    document.getElementById("reviews-next").onclick = () =>
        document
            .querySelector(".reviews__viewport")
            .scrollBy({ left: 360, behavior: "smooth" });
}
function initEvents() {
    document.getElementById("open-cart").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    overlayEl.addEventListener("click", closeCart);
    document
        .getElementById("close-checkout")
        .addEventListener("click", closeCheckout);
    document.getElementById("checkout-modal").addEventListener("click", (e) => {
        if (e.target.id === "checkout-modal") closeCheckout();
    });
    document
        .getElementById("reviews-more")
        .addEventListener("click", () => renderReviews(true));
    document.getElementById("theme-toggle").addEventListener("click", () => {
        const dark = document.documentElement.classList.toggle("dark");
        try {
            localStorage.setItem("apex-theme", dark ? "dark" : "light");
        } catch {}
        document.querySelector('meta[name="theme-color"]').content = dark
            ? "#161719"
            : "#ffffff";
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCart();
            closeLightbox();
            closeProduct();
            toggleSearch(false);
            closeCheckout();
            closeReview();
        }
    });
    document.addEventListener("click", (e) => {
        const review = e.target.closest("[data-review-id]");
        if (review) {
            openReview(review.dataset.reviewId);
            return;
        }
        if (e.target.closest("[data-close-review]")) {
            closeReview();
            return;
        }
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
            addToCart(
                t.dataset.modalAdd,
                color,
                size,
                Number(document.getElementById("product-quantity")?.value || 1),
            );
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
        if (event.target.name === "product-size") updateSelectedVariant();
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
        .addEventListener("input", (event) => {
            clearTimeout(window.apexSearchTimer);
            const value = event.target.value;
            window.apexSearchTimer = setTimeout(async () => {
                try {
                    const page = await jsonFetch(
                        "/api/catalog?limit=8&q=" + encodeURIComponent(value),
                    );
                    if (document.getElementById("search-input").value !== value)
                        return;
                    page.items.forEach((item) => {
                        if (!productById[item.id])
                            productById[item.id] = normalizeProduct(item);
                    });
                    renderSearchResults(value);
                } catch (error) {
                    document.getElementById("search-results").textContent =
                        error.message;
                }
            }, 250);
        });
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
            .addEventListener("change", () => loadCatalog()),
    );
    document.getElementById("filters-reset").addEventListener("click", () => {
        ["category-filter", "size-filter", "sort-filter"].forEach(
            (id) => (document.getElementById(id).selectedIndex = 0),
        );
        loadCatalog();
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".suggest-wrap"))
            document
                .querySelectorAll(".suggestions")
                .forEach((x) => x.classList.remove("is-open"));
    });
}
renderAnnouncement();
renderCategoryTiles();
jsonFetch("/api/loyalty")
    .then((rules) => {
        document.getElementById("club-feature-rules").textContent =
            `Возвращаем ${Number(rules.earn_percent)}% стоимости товаров баллами после оплаты. Оплачивай баллами до ${Number(rules.redeem_percent)}% следующей покупки.`;
    })
    .catch(() => {});
try {
    if (localStorage.getItem("apex-theme") === "dark")
        document.documentElement.classList.add("dark");
} catch {}
document.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const root =
        document.querySelector("#image-lightbox.is-open") ||
        document.querySelector('.review-modal.is-open [role="dialog"]') ||
        document.querySelector('.checkout-modal.is-open [role="dialog"]') ||
        document.querySelector('.product-modal.is-open [role="dialog"]') ||
        document.querySelector("#cart.is-open");
    if (!root) return;
    const focusable = [
        ...root.querySelectorAll(
            'button:not(:disabled),a[href],input:not(:disabled),textarea,select,[tabindex="0"]',
        ),
    ].filter((node) => node.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0],
        last = focusable[focusable.length - 1];
    if (
        !root.contains(document.activeElement) ||
        (!event.shiftKey && document.activeElement === last)
    ) {
        event.preventDefault();
        first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    }
});
document.getElementById("catalog-more").onclick = () => loadCatalog(false);
jsonFetch("/api/account")
    .then((data) => {
        member = data.customer;
        document.querySelector("[data-account-label]").textContent =
            member.name;
    })
    .catch(() => {});
renderCart();
loadCatalog();
const reviewsObserver = new IntersectionObserver(
    (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
            renderReviews();
            reviewsObserver.disconnect();
        }
    },
    { rootMargin: "300px" },
);
reviewsObserver.observe(document.querySelector(".reviews"));
renderFaq();
renderCommunityGallery();
renderCommunity();
initMobileMenu();
initEvents();
if (location.pathname === "/reviews")
    requestAnimationFrame(() =>
        document.querySelector(".reviews")?.scrollIntoView(),
    );
