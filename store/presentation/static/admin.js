const uiIcon = (name) =>
    '<svg class="ui-icon" aria-hidden="true"><use href="/icons.svg#' +
    name +
    '"/></svg>';
let products = [];
let categories = [];
let integrations = [];
let reviews = [];
let promotions = [];
let productOffset = 0;
let productTotal = 0;
let productRequest = 0;
let pendingUploads = 0;
const $ = (selector) => document.querySelector(selector);
const esc = (value) =>
    String(value ?? "").replace(
        /[&<>'"]/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
            })[c],
    );
const toast = (message, error = false) => {
    $("#toast").textContent = message;
    $("#toast").classList.toggle("error", error);
    $("#toast").classList.add("show");
    setTimeout(() => $("#toast").classList.remove("show"), 2400);
};
async function errorMessage(
    response,
    fallback = "Не удалось выполнить запрос",
) {
    try {
        const data = await response.json();
        return data.error || `${fallback} (HTTP ${response.status})`;
    } catch {
        return `${fallback} (HTTP ${response.status})`;
    }
}
async function apiJson(
    url,
    options = {},
    fallback = "Не удалось загрузить данные",
) {
    const controller = new AbortController();
    const timeoutMs = options.timeoutMs || 15000;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        if (response.status === 401) {
            location.replace("/admin");
            throw new Error(
                "Сессия истекла. Выполняется переход на страницу входа",
            );
        }
        if (!response.ok)
            throw new Error(await errorMessage(response, fallback));
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError")
            throw new Error(
                `Сервер не ответил за ${Math.round(timeoutMs / 1000)} секунд. Попробуйте ещё раз`,
            );
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}
function renderCategories() {
    const selectedFilter = $("#categoryFilter").value;
    const selectedProduct = $("#productCategory").value;
    const options = categories
        .map(
            (category) =>
                `<option value="${esc(category.name)}">${esc(category.name)}</option>`,
        )
        .join("");
    $("#categoryFilter").innerHTML =
        '<option value="">Все категории</option>' + options;
    $("#productCategory").innerHTML =
        '<option value="">Выберите категорию</option>' + options;
    if (categories.some((c) => c.name === selectedFilter))
        $("#categoryFilter").value = selectedFilter;
    if (categories.some((c) => c.name === selectedProduct))
        $("#productCategory").value = selectedProduct;
    $("#categoryList").innerHTML = categories.length
        ? categories
              .map(
                  (category) =>
                      `<div><span><b>${esc(category.name)}</b><br><small>Товаров: ${category.product_count}</small></span><button type="button" class="icon-btn" data-edit-category="${category.id}">Изменить</button><button type="button" class="icon-btn danger" data-delete-category="${category.id}" ${category.product_count ? 'disabled title="Сначала удалите или перенесите товары"' : ""}>Удалить</button></div>`,
              )
              .join("")
        : "<small>Категорий пока нет</small>";
}
async function loadCategories() {
    categories = await apiJson(
        "/api/admin/categories",
        {},
        "Не удалось загрузить категории",
    );
    if (!Array.isArray(categories))
        throw new Error("Сервер вернул некорректный список категорий");
    renderCategories();
}
function switchTab(id) {
    document.body.classList.remove("admin-menu-open");
    $("#admin-menu-toggle").setAttribute("aria-expanded", "false");
    document
        .querySelectorAll(".tab,.nav-item")
        .forEach((x) => x.classList.remove("active"));
    $("#" + id).classList.add("active");
    document.querySelector(`[data-tab="${id}"]`)?.classList.add("active");
    $("#pageTitle").textContent = {
        overview: "Обзор",
        catalog: "Каталог товаров",
        orders: "Заказы",
        reviews: "Отзывы",
        settings: "Интеграции",
        promotions: "Промокоды",
        loyalty: "Программа лояльности",
    }[id];
    const loader = {
        reviews: loadReviews,
        settings: loadIntegrations,
        orders: loadOrders,
        promotions: loadPromotions,
        loyalty: loadLoyalty,
    }[id];
    if (loader) loader().catch((error) => toast(error.message, true));
}
document
    .querySelectorAll("[data-tab],[data-go]")
    .forEach(
        (x) => (x.onclick = () => switchTab(x.dataset.tab || x.dataset.go)),
    );
function renderProducts() {
    const q = $("#search").value.toLowerCase(),
        cat = $("#categoryFilter").value;
    const shown = products.filter(
        (p) =>
            (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)) &&
            (!cat || p.category === cat),
    );
    $("#catalogCount").textContent = productTotal
        ? productOffset +
          1 +
          "–" +
          (productOffset + shown.length) +
          " из " +
          productTotal
        : "0 товаров";
    $("#rows").innerHTML =
        shown
            .map(
                (p) =>
                    `<tr><td><div class="admin-product-cell">${p.image_url ? `<img src="${esc(p.image_url)}${p.image_url.startsWith("/media/") ? "?w=240" : ""}" width="44" height="56" loading="lazy" alt="">` : ""}<div><b>${esc(p.name)}</b><br><small>#${p.id} · ${p.is_active ? "Опубликован" : "Черновик"}</small></div></div></td><td>${esc(p.category)}</td><td><b>${Number(p.price).toLocaleString("ru")} ₽</b></td><td><span class="stock ${p.stock < 5 ? "low" : ""}">${p.stock} шт.</span></td><td><small>${p.views} просм. · ${p.cart_adds} в корзину</small></td><td><button class="icon-btn" data-edit="${p.id}">Изменить</button> <button class="icon-btn danger" data-delete="${p.id}">Удалить</button></td></tr>`,
            )
            .join("") ||
        `<tr><td colspan="6"><small>Товары не найдены</small></td></tr>`;
    document.querySelectorAll("[data-edit]").forEach(
        (b) =>
            (b.onclick = async () => {
                try {
                    openProduct(
                        await apiJson(`/api/admin/products/${b.dataset.edit}`),
                    );
                } catch (error) {
                    toast(error.message, true);
                }
            }),
    );
    document
        .querySelectorAll("[data-delete]")
        .forEach(
            (b) => (b.onclick = () => removeProduct(Number(b.dataset.delete))),
        );
}
function renderReviews() {
    $("#reviewRows").innerHTML = reviews.length
        ? reviews
              .map(
                  (review) =>
                      `<div><span><b>${esc(review.author)}</b> · ${"★".repeat(Number(review.rating))}<br><small>${esc(review.title || "Без заголовка")} — ${esc(review.body)}</small></span><span><span class="pill">${review.is_published ? "Опубликован" : "Черновик"}</span><button type="button" class="icon-btn" data-edit-review="${review.id}">Изменить</button><button type="button" class="icon-btn danger" data-delete-review="${review.id}">Удалить</button></span></div>`,
              )
              .join("")
        : "<small>Отзывов пока нет</small>";
}
async function loadReviews() {
    reviews = await apiJson(
        "/api/admin/reviews",
        {},
        "Не удалось загрузить отзывы",
    );
    renderReviews();
}
async function loadProductsPage(reset = true) {
    const sequence = ++productRequest;
    if (reset) productOffset = 0;
    const params = new URLSearchParams({
        limit: 40,
        offset: productOffset,
        q: $("#search").value,
        category: $("#categoryFilter").value,
        sort: "newest",
    });
    const page = await apiJson("/api/admin/catalog?" + params);
    if (sequence !== productRequest) return;
    products = page.items;
    productTotal = page.total;
    renderProducts();
    let paging = $("#catalogPagination");
    if (!paging) {
        paging = document.createElement("div");
        paging.id = "catalogPagination";
        paging.className = "catalog-paging";
        $(".catalog-panel .table-wrap").after(paging);
    }
    paging.innerHTML = `<button class="button secondary" id="prevProducts" ${productOffset === 0 ? "disabled" : ""}>← Назад</button><span>${page.total ? productOffset + 1 : 0}–${productOffset + products.length} из ${page.total}</span><button class="button secondary" id="nextProducts" ${productOffset + products.length >= productTotal ? "disabled" : ""}>Далее →</button>`;
    $("#prevProducts").onclick = () => {
        productOffset = Math.max(0, productOffset - 40);
        loadProductsPage(false).catch((e) => toast(e.message, true));
    };
    $("#nextProducts").onclick = () => {
        productOffset += 40;
        loadProductsPage(false).catch((e) => toast(e.message, true));
    };
}
async function loadStats() {
    const stats = await apiJson("/api/admin/stats");
    $("#count").textContent = stats.count;
    $("#views").textContent = Number(stats.views).toLocaleString("ru");
    $("#adds").textContent = Number(stats.adds).toLocaleString("ru");
    $("#rate").textContent =
        (stats.views ? (100 * stats.adds) / stats.views : 0).toFixed(1) + "%";
    $("#stockAlerts").innerHTML =
        `<div><span>Товаров с остатком меньше 5</span><b>${stats.low_stock}</b></div><button class="text-button" data-stock-catalog>Проверить каталог →</button>`;
    $("[data-stock-catalog]").onclick = () => switchTab("catalog");
}
async function loadIntegrations() {
    integrations = await apiJson("/api/admin/integrations");
    $("#configured").innerHTML = integrations.length
        ? integrations
              .map(
                  (item) =>
                      '<div><span class="status-pill ' +
                      (item.enabled ? "success" : "") +
                      '">' +
                      (item.enabled ? "Подключена" : "Отключена") +
                      "</span><h3>" +
                      esc(
                          item.public_config.name ||
                              item.provider.toUpperCase(),
                      ) +
                      "</h3><small>" +
                      (item.kind === "payment"
                          ? "Приём платежей"
                          : "Доставка") +
                      " · " +
                      esc(item.provider) +
                      " · " +
                      (item.public_config.environment === "production"
                          ? "Рабочая среда"
                          : "Тестовая среда") +
                      '</small><div class="actions"><button type="button" class="icon-btn" data-edit-integration="' +
                      esc(item.provider) +
                      '">Настроить</button>' +
                      (item.enabled
                          ? '<button type="button" class="icon-btn" data-disable-integration="' +
                            esc(item.provider) +
                            '">Отключить</button>'
                          : "") +
                      '<button type="button" class="icon-btn danger" data-delete-integration="' +
                      esc(item.provider) +
                      '">Удалить</button></div></div>',
              )
              .join("")
        : '<p class="empty-admin">Пока нет интеграций. Добавьте оплату или доставку в форме слева.</p>';
}
async function load() {
    const button = $("#refresh");
    button.disabled = true;
    button.textContent = "↻ Загрузка…";
    const results = await Promise.allSettled([
        loadCategories(),
        loadProductsPage(),
        loadStats(),
    ]);
    results.forEach((result) => {
        if (result.status === "rejected") toast(result.reason.message, true);
    });
    if (results[1].status === "rejected")
        $("#rows").innerHTML =
            '<tr><td colspan="6">Не удалось загрузить товары. Нажмите «Обновить», чтобы повторить.</td></tr>';
    if ($("#settings").classList.contains("active"))
        await loadIntegrations().catch((e) => toast(e.message, true));
    button.disabled = false;
    button.textContent = "Обновить";
    const healthy = results.every((result) => result.status === "fulfilled");
    $("#system-status").textContent = healthy
        ? "Данные обновлены"
        : "Нет связи с сервером";
    $("#system-status").classList.toggle("is-offline", !healthy);
}
function openProduct(p = null) {
    const f = $("#productForm");
    f.reset();
    f.elements.id.value = "";
    const simple = Boolean(p && !p.variants?.length);
    f.dataset.simple = String(simple);
    $("#simpleProductFields").hidden = !simple;
    $("#addColor").hidden = simple;
    f.elements.price.required = simple;
    f.elements.stock.required = simple;
    $("#formTitle").textContent = p ? "Редактирование товара" : "Новый товар";
    if (p) {
        if (!categories.some((category) => category.name === p.category)) {
            categories.push({ id: "", name: p.category, product_count: 1 });
            renderCategories();
        }
        ["id", "name", "category", "description"].forEach((key) => {
            f.elements[key].value = p[key] ?? "";
        });
        f.elements.is_active.checked = Boolean(p.is_active);
        f.elements.is_new.checked = Boolean(p.is_new);
        f.elements.price.value = p.price;
        f.elements.stock.value = p.stock;
        f.elements.sizes_text.value = (p.sizes || []).join(", ");
    }
    if (simple) {
        renderColorGroups([
            { color: p.color || "", images: p.images || [], variants: [] },
        ]);
        const group = $(".color-group");
        group.querySelector(".color-name").required = false;
        group.querySelector(".variant-table-wrap").hidden = true;
        group.querySelector(".variant-tools").hidden = true;
        group.querySelector(".remove-color").hidden = true;
        $("#productDialog").showModal();
        return;
    }
    const variants = p?.variants?.length
        ? p.variants
        : p
          ? [
                {
                    sku: `APEX-${p.id}`,
                    price: p.price,
                    old_price: "",
                    stock: p.stock,
                    color: p.color,
                    size: p.sizes?.[0] || "",
                    dimensions: "",
                    weight: 0,
                    images: p.images || (p.image_url ? [p.image_url] : []),
                },
            ]
          : [];
    renderColorGroups(groupVariants(variants));
    if (!variants.length) addColorGroup();
    $("#productDialog").showModal();
}
function groupVariants(variants) {
    const groups = [];
    variants.forEach((variant) => {
        let group = groups.find((item) => item.color === variant.color);
        if (!group) {
            group = {
                color: variant.color || "",
                images: variant.images || [],
                variants: [],
            };
            groups.push(group);
        }
        group.variants.push(variant);
    });
    return groups;
}
const prepareImage = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // The server normalizes the upload to a bounded WebP image.
            if (file.type === "image/gif") return resolve(reader.result);
            const image = new Image();
            image.onerror = () =>
                reject(new Error(`Не удалось прочитать ${file.name}`));
            image.onload = () => {
                const scale = Math.min(
                    1,
                    1920 / Math.max(image.width, image.height),
                );
                const canvas = document.createElement("canvas");
                canvas.width = Math.max(1, Math.round(image.width * scale));
                canvas.height = Math.max(1, Math.round(image.height * scale));
                canvas
                    .getContext("2d")
                    .drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/webp", 0.82));
            };
            image.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
async function readImage(file) {
    if (file.size > 10000000) throw new Error("Фотография превышает 10 МБ");
    pendingUploads++;
    try {
        return (
            await apiJson("/api/admin/media", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: await prepareImage(file) }),
            })
        ).url;
    } finally {
        pendingUploads--;
    }
}
const variantRow = (variant = {}) => `<tr class="variant-row">
    <td><input data-field="sku" required value="${esc(variant.sku || "")}" placeholder="ART-001"></td>
    <td><input data-field="price" required type="number" min="0" step="0.01" value="${esc(variant.price ?? "")}"></td>
    <td><input data-field="old_price" type="number" min="0" step="0.01" value="${esc(variant.old_price || "")}"></td>
    <td><input data-field="stock" required type="number" min="0" value="${esc(variant.stock ?? 0)}"></td>
    <td class="variant-color-label"></td>
    <td><input data-field="size" value="${esc(variant.size || "")}" placeholder="M"></td>
    <td><input data-field="dimensions" value="${esc(variant.dimensions || "")}" placeholder="300x200x40"></td>
    <td><input data-field="weight" type="number" min="0" value="${esc(variant.weight ?? 0)}"></td>
    <td><button type="button" class="remove-row" title="Удалить вариацию">×</button></td>
</tr>`;
function colorGroup(group = { color: "", images: [], variants: [] }) {
    return `<article class="color-group" data-images="${esc(JSON.stringify(group.images || []))}">
        <div class="color-head"><label>Цвет<input class="color-name" required value="${esc(group.color)}" placeholder="Например, белый"></label><button type="button" class="remove-color" title="Удалить цвет">Удалить цвет</button></div>
        <div class="image-editor"><div class="image-list"></div><label class="image-add" title="Добавить фотографии">+<input class="image-input" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple></label></div>
        <div class="variant-table-wrap"><table class="variant-table"><thead><tr><th>Артикул</th><th>Цена</th><th>Старая цена</th><th>Количество</th><th>Цвет</th><th>Размер</th><th>Габариты, мм (Д×Ш×В)</th><th>Вес, г</th><th></th></tr></thead><tbody>${(group.variants || []).map(variantRow).join("")}</tbody></table></div>
        <div class="variant-tools"><button type="button" class="add-variant">+ Одна вариация</button><input class="bulk-sizes" placeholder="XS, S, M, L, XL" aria-label="Размеры через запятую"><button type="button" class="bulk-add">Добавить размеры</button></div>
    </article>`;
}
function renderColorGroups(groups) {
    $("#colorGroups").innerHTML = groups.map(colorGroup).join("");
    document.querySelectorAll(".color-group").forEach(bindColorGroup);
}
function addColorGroup() {
    $("#colorGroups").insertAdjacentHTML("beforeend", colorGroup());
    const group = $("#colorGroups").lastElementChild;
    bindColorGroup(group);
    group.querySelector(".add-variant").click();
}
function renderGroupImages(group) {
    const images = JSON.parse(group.dataset.images || "[]");
    group.querySelector(".image-list").innerHTML = images
        .map(
            (src, index) =>
                `<div class="image-card" draggable="true" data-index="${index}"><img src="${esc(src)}" alt="Фото ${index + 1}"><button type="button" class="delete-image" title="Удалить фотографию">×</button><span>⋮⋮</span></div>`,
        )
        .join("");
}
function bindColorGroup(group) {
    renderGroupImages(group);
    const syncColor = () =>
        group.querySelectorAll(".variant-color-label").forEach((cell) => {
            cell.textContent = group.querySelector(".color-name").value || "—";
        });
    syncColor();
    group.querySelector(".color-name").oninput = syncColor;
    group.querySelector(".add-variant").onclick = () => {
        group
            .querySelector("tbody")
            .insertAdjacentHTML("beforeend", variantRow());
        syncColor();
    };
    group.querySelector(".bulk-add").onclick = () => {
        const sizes = group
            .querySelector(".bulk-sizes")
            .value.split(/[,;\s]+/)
            .filter(Boolean);
        const first = group.querySelector(".variant-row");
        const base = first
            ? Object.fromEntries(
                  [...first.querySelectorAll("[data-field]")].map((input) => [
                      input.dataset.field,
                      input.value,
                  ]),
              )
            : {};
        const existing = new Set(
            [...group.querySelectorAll('[data-field="size"]')].map(
                (input) => input.value,
            ),
        );
        sizes
            .filter((size) => !existing.has(size))
            .forEach((size, index) =>
                group.querySelector("tbody").insertAdjacentHTML(
                    "beforeend",
                    variantRow({
                        ...base,
                        size,
                        sku: `APEX-${Date.now().toString(36)}-${index}-${size}`,
                    }),
                ),
            );
        syncColor();
        group.querySelector(".bulk-sizes").value = "";
    };
    group.querySelector(".remove-color").onclick = () => {
        if (document.querySelectorAll(".color-group").length > 1)
            group.remove();
        else toast("У товара должен быть хотя бы один цвет");
    };
    group.querySelector(".image-input").onchange = async (event) => {
        try {
            const current = JSON.parse(group.dataset.images || "[]");
            group.dataset.images = JSON.stringify(
                current.concat(
                    await Promise.all([...event.target.files].map(readImage)),
                ),
            );
            renderGroupImages(group);
        } catch (error) {
            toast(error.message || "Не удалось обработать фотографию", true);
        } finally {
            event.target.value = "";
        }
    };
    group.onclick = (event) => {
        if (event.target.closest(".remove-row"))
            event.target.closest("tr").remove();
        const remove = event.target.closest(".delete-image");
        if (remove) {
            const images = JSON.parse(group.dataset.images || "[]");
            images.splice(
                Number(remove.closest(".image-card").dataset.index),
                1,
            );
            group.dataset.images = JSON.stringify(images);
            renderGroupImages(group);
        }
    };
    let dragged;
    group.ondragstart = (event) => {
        dragged = Number(event.target.closest(".image-card")?.dataset.index);
    };
    group.ondragover = (event) => event.preventDefault();
    group.ondrop = (event) => {
        event.preventDefault();
        const target = event.target.closest(".image-card");
        if (!target || dragged === undefined) return;
        const images = JSON.parse(group.dataset.images || "[]");
        images.splice(
            Number(target.dataset.index),
            0,
            images.splice(dragged, 1)[0],
        );
        group.dataset.images = JSON.stringify(images);
        dragged = undefined;
        renderGroupImages(group);
    };
}
$("#addColor").onclick = addColorGroup;
document
    .querySelectorAll("[data-open-product]")
    .forEach((b) => (b.onclick = () => openProduct()));
document
    .querySelectorAll("[data-close]")
    .forEach((b) => (b.onclick = () => $("#productDialog").close()));
$("#productForm").onsubmit = async (e) => {
    e.preventDefault();
    if (pendingUploads) return toast("Дождитесь загрузки фотографий", true);
    const d = Object.fromEntries(new FormData(e.target));
    d.is_active = e.target.elements.is_active.checked;
    d.is_new = e.target.elements.is_new.checked;
    d.variants = [...document.querySelectorAll(".color-group")].flatMap(
        (group) => {
            const color = group.querySelector(".color-name").value.trim();
            const images = JSON.parse(group.dataset.images || "[]");
            return [...group.querySelectorAll(".variant-row")].map(
                (row, index) => ({
                    ...Object.fromEntries(
                        [...row.querySelectorAll("[data-field]")].map(
                            (input) => [input.dataset.field, input.value],
                        ),
                    ),
                    color,
                    // Send a color's photos once instead of repeating several
                    // megabytes for every size of the same product.
                    images: index === 0 ? images : [],
                }),
            );
        },
    );
    if (e.target.dataset.simple === "true") {
        d.variants = [];
        d.sizes = String(d.sizes_text || "")
            .split(/[,;\s]+/)
            .filter(Boolean);
        d.images = JSON.parse($(".color-group").dataset.images || "[]");
        d.color = $(".color-name").value.trim();
        d.image_url = d.images[0] || "";
    } else if (!d.variants.length)
        return toast("Добавьте хотя бы одну вариацию");
    const saveButton = e.target.querySelector(".dialog-actions .primary");
    saveButton.disabled = true;
    saveButton.textContent = "Сохраняем…";
    try {
        const editingId = e.target.elements.id.value;
        const r = await fetch(
            editingId
                ? `/api/admin/products/${editingId}`
                : "/api/admin/products",
            {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(d),
            },
        );
        if (!r.ok)
            return toast(await errorMessage(r, "Товар не сохранён"), true);
        $("#productDialog").close();
        toast(d.id ? "Товар обновлён" : "Товар добавлен");
        load();
    } catch (error) {
        toast(`Товар не сохранён: ${error.message}`, true);
    } finally {
        saveButton.disabled = false;
        saveButton.textContent = "Сохранить товар";
    }
};
async function removeProduct(id) {
    if (confirm("Удалить товар из каталога?")) {
        const r = await fetch("/api/admin/products/" + id, {
            method: "DELETE",
        });
        if (r.ok) {
            toast("Товар удалён");
            load();
        } else toast(await errorMessage(r, "Товар не удалён"), true);
    }
}
document.querySelectorAll("[data-open-categories]").forEach((button) => {
    button.onclick = () => {
        renderCategories();
        $("#categoryDialog").showModal();
    };
});
document.querySelector("[data-close-category]").onclick = () =>
    $("#categoryDialog").close();
$("#categoryForm").onsubmit = async (event) => {
    event.preventDefault();
    try {
        const id = event.target.elements.id.value;
        const response = await fetch(
            "/api/admin/categories" + (id ? "/" + id : ""),
            {
                method: id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: new FormData(event.target).get("name"),
                }),
            },
        );
        if (!response.ok)
            return toast(
                await errorMessage(response, "Категория не добавлена"),
                true,
            );
        event.target.reset();
        await loadCategories();
        toast("Категория добавлена");
    } catch (error) {
        toast(`Категория не добавлена: ${error.message}`, true);
    }
};
$("#categoryList").onclick = async (event) => {
    const edit = event.target.closest("[data-edit-category]");
    if (edit) {
        const category = categories.find(
            (c) => c.id === Number(edit.dataset.editCategory),
        );
        $("#categoryForm").elements.id.value = category.id;
        $("#categoryForm").elements.name.value = category.name;
        $("#categoryForm").elements.name.focus();
        return;
    }
    const button = event.target.closest("[data-delete-category]");
    if (!button || button.disabled || !confirm("Удалить категорию?")) return;
    try {
        const response = await fetch(
            `/api/admin/categories/${button.dataset.deleteCategory}`,
            { method: "DELETE" },
        );
        if (!response.ok)
            return toast(
                await errorMessage(response, "Категория не удалена"),
                true,
            );
        await loadCategories();
        toast("Категория удалена");
    } catch (error) {
        toast(`Категория не удалена: ${error.message}`, true);
    }
};
$("#integration").onsubmit = async (e) => {
    e.preventDefault();
    $("#integrationError").textContent = "";
    const submit = $("#integration-save");
    submit.disabled = true;
    e.target.classList.add("is-saving");
    $("#integration-save .button-label").textContent = "Сохраняем и проверяем…";
    const f = new FormData(e.target),
        provider = f.get("provider") || $("#integration-provider").value,
        keys = {
            tbank: ["terminal_key", "password"],
            alfabank: ["username", "password"],
            cdek: ["client_id", "client_secret"],
        }[provider] || ["unused_login", "unused_secret"],
        d = {
            provider,
            name: f.get("name"),
            environment: f.get("environment"),
            enabled: f.has("enabled"),
            [keys[0]]: f.get("login"),
            [keys[1]]: f.get("secret"),
        };
    for (const key of [
        "contract_type",
        "tariff_code",
        "sender_city",
        "sender_office",
        "dimension_type",
        "weight",
        "length",
        "width",
        "height",
        "cost_type",
        "markup",
        "markup_type",
        "dispatch_days",
        "free_delivery_from",
    ])
        d[key] = f.get(key);
    d.insurance = f.has("insurance");
    try {
        const editing = f.get("editing");
        const r = await fetch(
            editing
                ? `/api/admin/integrations/${editing}`
                : "/api/admin/integrations",
            {
                method: editing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(d),
            },
        );
        if (!r.ok)
            throw new Error(await errorMessage(r, "Настройки не сохранены"));
        const result = await r.json();
        toast(
            result.test
                ? "Настройки сохранены, тест СДЭК пройден"
                : "Настройки сохранены",
        );
        e.target.reset();
        e.target.elements.editing.value = "";
        $("#integrationTitle").textContent = "Новая интеграция";
        integrationKind.disabled = false;
        integrationProvider.disabled = false;
        updateIntegrationForm();
        await load();
    } catch (error) {
        $("#integrationError").textContent = error.message;
        toast(error.message, true);
    } finally {
        submit.disabled = false;
        e.target.classList.remove("is-saving");
        $("#integration-save .button-label").textContent =
            "Сохранить настройки";
    }
};
const integrationKind = $("#integration-kind"),
    integrationProvider = $("#integration-provider");
function updateIntegrationForm() {
    $("#integrationError").textContent = "";
    const delivery = integrationKind.value === "delivery";
    [...integrationProvider.options].forEach(
        (option) =>
            (option.hidden =
                delivery !==
                ["cdek", "pickup", "international"].includes(option.value)),
    );
    const visible = [...integrationProvider.options].find(
        (option) => !option.hidden,
    );
    if (integrationProvider.selectedOptions[0]?.hidden && visible)
        integrationProvider.value = visible.value;
    $("#cdek-fields").hidden = integrationProvider.value !== "cdek";
    const credentials = ["tbank", "alfabank", "cdek"].includes(
        integrationProvider.value,
    );
    $("#integration").elements.login.closest("label").hidden = !credentials;
    $("#integration").elements.secret.closest("label").hidden = !credentials;
    $("#checkCdek").hidden =
        integrationProvider.value !== "cdek" ||
        !$("#integration").elements.editing.value;
}
integrationKind.onchange = updateIntegrationForm;
integrationProvider.onchange = updateIntegrationForm;
updateIntegrationForm();
$("#resetIntegration").onclick = () => {
    const form = $("#integration");
    form.reset();
    form.elements.editing.value = "";
    $("#integrationTitle").textContent = "Новая интеграция";
    integrationKind.disabled = false;
    integrationProvider.disabled = false;
    form.elements.login.placeholder = "Ключ / логин";
    form.elements.secret.placeholder = "Секрет / пароль";
    updateIntegrationForm();
};
$("#checkCdek").onclick = async (event) => {
    event.target.disabled = true;
    try {
        await apiJson("/api/admin/integrations/cdek/check", {
            method: "POST",
            timeoutMs: 30000,
            headers: { "Content-Type": "application/json" },
            body: "{}",
        });
        toast("Авторизация и расчёт СДЭК прошли проверку");
    } catch (error) {
        toast(error.message, true);
    } finally {
        event.target.disabled = false;
    }
};
$("#configured").onclick = async (event) => {
    const disable = event.target.closest("[data-disable-integration]");
    if (disable) {
        disable.disabled = true;
        const item = integrations.find(
            (row) => row.provider === disable.dataset.disableIntegration,
        );
        try {
            await apiJson("/api/admin/integrations/" + item.provider, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...item.public_config,
                    provider: item.provider,
                    enabled: false,
                }),
            });
            await loadIntegrations();
            toast("Интеграция отключена. История заказов сохранена");
        } catch (error) {
            toast(error.message, true);
        } finally {
            disable.disabled = false;
        }
        return;
    }
    const edit = event.target.closest("[data-edit-integration]");
    if (edit) {
        const item = integrations.find(
            (x) => x.provider === edit.dataset.editIntegration,
        );
        const form = $("#integration");
        $("#integrationError").textContent = "";
        form.reset();
        form.elements.editing.value = item.provider;
        $("#integrationTitle").textContent =
            "Настройка: " +
            (item.public_config.name || item.provider.toUpperCase());
        form.elements.kind.value = item.kind;
        form.elements.provider.value = item.provider;
        integrationKind.disabled = true;
        integrationProvider.disabled = true;
        form.elements.name.value = item.public_config.name || "";
        form.elements.environment.value =
            item.public_config.environment || "test";
        form.elements.enabled.checked = item.enabled;
        Object.entries(item.public_config).forEach(([key, value]) => {
            if (form.elements[key] && !["name", "environment"].includes(key))
                form.elements[key].type === "checkbox"
                    ? (form.elements[key].checked = value === "true")
                    : (form.elements[key].value = value);
        });
        updateIntegrationForm();
        form.elements.login.placeholder =
            "Оставьте пустым, чтобы сохранить текущий";
        form.elements.secret.placeholder =
            "Оставьте пустым, чтобы сохранить текущий";
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }
    const button = event.target.closest("[data-delete-integration]");
    if (
        !button ||
        !confirm(
            "Удалить интеграцию? Если с ней связаны заказы, используйте «Отключить».",
        )
    )
        return;
    button.disabled = true;
    try {
        await apiJson(
            "/api/admin/integrations/" + button.dataset.deleteIntegration,
            { method: "DELETE" },
        );
        await loadIntegrations();
        toast("Интеграция удалена");
    } catch (error) {
        toast(error.message, true);
    } finally {
        button.disabled = false;
    }
};

let searchTimer;
$("#search").oninput = () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(
        () => loadProductsPage().catch((e) => toast(e.message, true)),
        300,
    );
};
$("#categoryFilter").onchange = () =>
    loadProductsPage().catch((e) => toast(e.message, true));
$("#refresh").onclick = load;
document.querySelectorAll("[data-open-review]").forEach((button) => {
    button.onclick = () => {
        $("#reviewForm").reset();
        $("#reviewForm").elements.is_published.checked = true;
        $("#reviewDialog").showModal();
    };
});
document.querySelectorAll("[data-close-review]").forEach((button) => {
    button.onclick = () => $("#reviewDialog").close();
});
$("#reviewForm").onsubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    data.rating = Number(data.rating);
    data.is_published = form.elements.is_published.checked;
    data.images = data.images
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean);
    try {
        await apiJson(
            "/api/admin/reviews" + (data.id ? "/" + data.id : ""),
            {
                method: data.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            },
            "Не удалось добавить отзыв",
        );
        $("#reviewDialog").close();
        toast("Отзыв добавлен");
        await loadReviews();
    } catch (error) {
        toast(error.message, true);
    }
};
$("#logout").onclick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    location.replace("/admin");
};
$("#reviewRows").onclick = async (event) => {
    const edit = event.target.closest("[data-edit-review]"),
        remove = event.target.closest("[data-delete-review]");
    try {
        if (edit) {
            const row = await apiJson(
                "/api/admin/reviews/" + edit.dataset.editReview,
            );
            const form = $("#reviewForm");
            form.reset();
            for (const key of ["id", "author", "title", "body", "rating"])
                form.elements[key].value = row[key];
            form.elements.images.value = row.images.join("\n");
            form.elements.is_published.checked = row.is_published;
            $("#reviewDialog").showModal();
        }
        if (remove && confirm("Удалить отзыв и его фотографии?")) {
            await apiJson("/api/admin/reviews/" + remove.dataset.deleteReview, {
                method: "DELETE",
            });
            await loadReviews();
            toast("Отзыв удалён");
        }
    } catch (error) {
        toast(error.message, true);
    }
};
async function promoProducts(query = "") {
    const page = await apiJson(
        "/api/admin/catalog?limit=100&q=" + encodeURIComponent(query),
    );
    const select = $("#promoProduct"),
        previous = select.value;
    select.innerHTML =
        '<option value="">Выберите товар</option>' +
        page.items
            .map(
                (p) =>
                    `<option value="${p.id}">#${p.id} · ${esc(p.name)}</option>`,
            )
            .join("");
    if ([...select.options].some((o) => o.value === previous))
        select.value = previous;
}
async function loadPromotions() {
    promotions = await apiJson("/api/admin/promotions");
    await promoProducts($("#promoProductSearch").value);
    $("#promoRows").innerHTML = promotions.length
        ? promotions
              .map(
                  (p) =>
                      `<div><span><b>${esc(p.code)}</b><small>${esc(p.product_name)} · ${p.discount_type === "percent" ? Number(p.value) + "%" : Number(p.value) + " ₽"} · ${p.enabled ? "Активен" : "Выключен"}</small><small>Резервы и применения: ${p.uses}${p.max_uses ? " / " + p.max_uses : ""}</small></span><span><button class="icon-btn" data-edit-promo="${p.id}">Изменить</button><button class="icon-btn danger" data-delete-promo="${p.id}">Удалить</button></span></div>`,
              )
              .join("")
        : '<p class="empty-admin">Создайте первый промокод. Он начнёт действовать сразу после сохранения.</p>';
}
let promoTimer;
$("#promoProductSearch").oninput = (event) => {
    clearTimeout(promoTimer);
    promoTimer = setTimeout(
        () =>
            promoProducts(event.target.value).catch((e) =>
                toast(e.message, true),
            ),
        300,
    );
};
$("#resetPromo").onclick = () => {
    $("#promoForm").reset();
    $("#promoForm").elements.id.value = "";
    $("#promoTitle").textContent = "Новый промокод";
};
$("#promoRows").onclick = async (event) => {
    const edit = event.target.closest("[data-edit-promo]"),
        remove = event.target.closest("[data-delete-promo]");
    try {
        if (edit) {
            const row = promotions.find(
                    (p) => p.id === Number(edit.dataset.editPromo),
                ),
                form = $("#promoForm");
            form.reset();
            $("#promoTitle").textContent = "Редактирование промокода";
            if (
                ![...$("#promoProduct").options].some(
                    (o) => o.value === String(row.product_id),
                )
            )
                $("#promoProduct").add(
                    new Option(row.product_name, row.product_id),
                );
            for (const key of [
                "id",
                "code",
                "product_id",
                "discount_type",
                "value",
                "max_uses",
            ])
                form.elements[key].value = row[key] ?? "";
            form.elements.enabled.checked = row.enabled;
            for (const key of ["starts_at", "ends_at"]) {
                if (row[key]) {
                    const date = new Date(row[key]);
                    form.elements[key].value = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000,
                    )
                        .toISOString()
                        .slice(0, 16);
                }
            }
            form.scrollIntoView({ behavior: "smooth" });
        }
        if (
            remove &&
            confirm("Удалить промокод? История заказов сохранится.")
        ) {
            await apiJson(
                "/api/admin/promotions/" + remove.dataset.deletePromo,
                { method: "DELETE" },
            );
            await loadPromotions();
            toast("Промокод удалён");
        }
    } catch (error) {
        toast(error.message, true);
    }
};
$("#promoForm").onsubmit = async (event) => {
    event.preventDefault();
    const form = event.target,
        data = Object.fromEntries(new FormData(form)),
        button = form.querySelector(".primary");
    data.enabled = form.elements.enabled.checked;
    for (const key of ["starts_at", "ends_at"])
        data[key] = data[key] ? new Date(data[key]).toISOString() : null;
    button.disabled = true;
    try {
        await apiJson(
            "/api/admin/promotions" + (data.id ? "/" + data.id : ""),
            {
                method: data.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            },
        );
        $("#resetPromo").click();
        await loadPromotions();
        toast("Промокод сохранён");
    } catch (error) {
        toast(error.message, true);
    } finally {
        button.disabled = false;
    }
};
async function loadLoyalty() {
    const data = await apiJson("/api/admin/loyalty");
    for (const key of ["earn_percent", "redeem_percent"])
        $("#loyaltyForm").elements[key].value = data[key];
}
$("#loyaltyForm").onsubmit = async (event) => {
    event.preventDefault();
    const button = event.target.querySelector("button");
    button.disabled = true;
    try {
        await apiJson("/api/admin/loyalty", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                Object.fromEntries(new FormData(event.target)),
            ),
        });
        toast("Правила лояльности сохранены");
    } catch (error) {
        toast(error.message, true);
    } finally {
        button.disabled = false;
    }
};
let orderRows = [];
function renderOrders() {
    const q = $("#orderSearch").value.toLocaleLowerCase("ru"),
        status = $("#orderStatus").value;
    const shown = orderRows.filter(
        (row) =>
            (status === "all" || row.status === status) &&
            [
                row.id,
                row.customer_email,
                row.customer_details?.name,
                row.customer_details?.phone,
                row.tracking_number,
            ]
                .join(" ")
                .toLocaleLowerCase("ru")
                .includes(q),
    );
    const paymentNames = {
        CONFIRMED: "Оплачен",
        NEW: "Ожидает оплаты",
        AUTHORIZED: "Авторизован",
        REFUNDED: "Возврат",
        PARTIAL_REFUNDED: "Частичный возврат",
        CANCELED: "Отменён",
        REVERSED: "Отменён",
        REJECTED: "Оплата отклонена",
        DEADLINE_EXPIRED: "Оплата просрочена",
    };
    const states = [
        ["new", "Заказ принят"],
        ["packing", "Собираем"],
        ["shipped", "Отправлен"],
        ["delivered", "Доставлен"],
    ];
    const money = (value) =>
        Number(value || 0).toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
        });
    $("#orderRows").innerHTML = shown.length
        ? shown
              .map((row) => {
                  const customer = row.customer_details || {},
                      delivery = row.delivery_details || {};
                  const items = (row.items || [])
                      .map(
                          (item) =>
                              '<div class="order-item"><span><b>' +
                              esc(item.name) +
                              "</b><small>" +
                              esc(
                                  [item.color, item.size]
                                      .filter(Boolean)
                                      .join(" / "),
                              ) +
                              " · " +
                              Number(item.quantity) +
                              " шт.</small></span><strong>" +
                              money(item.line_total) +
                              "</strong></div>",
                      )
                      .join("");
                  return (
                      '<form class="order-card" data-order-id="' +
                      esc(row.id) +
                      '"><div class="order-card-head"><div><b>Заказ №' +
                      esc(String(row.id).slice(0, 8)) +
                      "</b><small>" +
                      new Date(row.created_at).toLocaleString("ru-RU") +
                      "</small></div><strong>" +
                      money(row.total) +
                      '</strong><span class="status-pill ' +
                      (row.status === "CONFIRMED"
                          ? "success"
                          : row.status === "NEW"
                            ? "pending"
                            : "") +
                      '">' +
                      esc(paymentNames[row.status] || row.status) +
                      '</span></div><div class="order-customer"><p><span>Покупатель</span>' +
                      esc(customer.name || "Не указано") +
                      "<br>" +
                      esc(row.customer_email) +
                      "<br>" +
                      esc(customer.phone || "") +
                      "</p><p><span>Получение</span>" +
                      esc(
                          delivery.type === "pickup"
                              ? "Самовывоз"
                              : delivery.pvz?.address ||
                                    delivery.cityFullName ||
                                    "Способ не выбран",
                      ) +
                      "</p></div>" +
                      (customer.comment
                          ? '<p class="order-note">' +
                            esc(customer.comment) +
                            "</p>"
                          : "") +
                      (items
                          ? '<div class="order-items">' + items + "</div>"
                          : "") +
                      '<div class="order-edit"><label>Статус сборки<select name="fulfillment">' +
                      states
                          .map(
                              ([value, title]) =>
                                  '<option value="' +
                                  value +
                                  '" ' +
                                  (row.fulfillment === value
                                      ? "selected"
                                      : "") +
                                  ">" +
                                  title +
                                  "</option>",
                          )
                          .join("") +
                      '</select></label><label>Трек-номер<input name="tracking_number" maxlength="120" placeholder="Добавить после отправки" value="' +
                      esc(row.tracking_number || "") +
                      '"></label><button class="button primary" type="submit">' +
                      uiIcon("check") +
                      "Сохранить</button></div></form>"
                  );
              })
              .join("")
        : '<p class="empty-admin">' +
          (orderRows.length
              ? "По этим условиям заказы не найдены."
              : "Заказов пока нет. Здесь появятся покупки после начала оформления.") +
          "</p>";
}
async function loadOrders() {
    orderRows = await apiJson("/api/admin/orders");
    renderOrders();
}
$("#orderSearch").oninput = renderOrders;
$("#orderStatus").onchange = renderOrders;
$("#orderRows").onsubmit = async (event) => {
    const form = event.target.closest("[data-order-id]");
    if (!form) return;
    event.preventDefault();
    const button = form.querySelector("button");
    button.disabled = true;
    try {
        await apiJson("/api/admin/orders/" + form.dataset.orderId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        toast("Заказ обновлён");
    } catch (error) {
        toast(error.message, true);
    } finally {
        button.disabled = false;
    }
};
$("#refreshOrders").onclick = () =>
    loadOrders().catch((e) => toast(e.message, true));
load();

const menuToggle = $("#admin-menu-toggle");
function closeAdminMenu() {
    document.body.classList.remove("admin-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.onclick = () => {
    const open = document.body.classList.toggle("admin-menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
};
$("#admin-menu-backdrop").onclick = closeAdminMenu;
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAdminMenu();
});
matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
    if (event.matches) closeAdminMenu();
});
