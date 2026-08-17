let products = [];
let categories = [];
let integrations = [];
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
    const timeout = setTimeout(() => controller.abort(), 15000);
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
                "Сервер не ответил за 15 секунд. Попробуйте ещё раз",
            );
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}
function renderCategories() {
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
    $("#categoryList").innerHTML = categories.length
        ? categories
              .map(
                  (category) =>
                      `<div><span><b>${esc(category.name)}</b><br><small>Товаров: ${category.product_count}</small></span><button type="button" class="icon-btn danger" data-delete-category="${category.id}" ${category.product_count ? 'disabled title="Сначала удалите или перенесите товары"' : ""}>Удалить</button></div>`,
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
    document
        .querySelectorAll(".tab,.nav-item")
        .forEach((x) => x.classList.remove("active"));
    $("#" + id).classList.add("active");
    document.querySelector(`[data-tab="${id}"]`)?.classList.add("active");
    $("#pageTitle").textContent = {
        overview: "Обзор",
        catalog: "Каталог товаров",
        orders: "Заказы",
        settings: "Интеграции",
    }[id];
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
    $("#catalogCount").textContent = `${shown.length} позиций`;
    $("#rows").innerHTML =
        shown
            .map(
                (p) =>
                    `<tr><td><b>${esc(p.name)}</b><br><small>#${p.id} · ${p.is_active ? "Опубликован" : "Черновик"}</small></td><td>${esc(p.category)}</td><td><b>${Number(p.price).toLocaleString("ru")} ₽</b></td><td><span class="stock ${p.stock < 5 ? "low" : ""}">${p.stock} шт.</span></td><td><small>${p.views} просм. · ${p.cart_adds} в корзину</small></td><td><button class="icon-btn" data-edit="${p.id}">Изменить</button> <button class="icon-btn danger" data-delete="${p.id}">Удалить</button></td></tr>`,
            )
            .join("") ||
        `<tr><td colspan="6"><small>Товары не найдены</small></td></tr>`;
    document
        .querySelectorAll("[data-edit]")
        .forEach(
            (b) =>
                (b.onclick = () =>
                    openProduct(
                        products.find((p) => p.id === Number(b.dataset.edit)),
                    )),
        );
    document
        .querySelectorAll("[data-delete]")
        .forEach(
            (b) => (b.onclick = () => removeProduct(Number(b.dataset.delete))),
        );
}
async function load() {
    const refresh = $("#refresh");
    refresh.disabled = true;
    refresh.textContent = "↻ Загрузка…";
    $("#rows").innerHTML =
        '<tr><td colspan="6"><small>Загружаем товары…</small></td></tr>';
    try {
        await loadCategories();
    } catch (error) {
        toast(error.message, true);
    }
    try {
        products = await apiJson(
            "/api/admin/products",
            {},
            "Не удалось загрузить список товаров",
        );
        if (!Array.isArray(products))
            throw new Error("Сервер вернул некорректный список товаров");
    } catch (error) {
        products = [];
        $("#rows").innerHTML =
            `<tr><td colspan="6"><small class="danger-text">${esc(error.message)}</small><br><button class="icon-btn" id="retryProducts">Повторить</button></td></tr>`;
        $("#catalogCount").textContent = "Ошибка загрузки";
        $("#retryProducts").onclick = load;
        toast(error.message, true);
        refresh.disabled = false;
        refresh.textContent = "↻ Обновить";
        return;
    }
    $("#count").textContent = products.length;
    const views = products.reduce((n, p) => n + p.views, 0),
        adds = products.reduce((n, p) => n + p.cart_adds, 0);
    $("#views").textContent = views.toLocaleString("ru");
    $("#adds").textContent = adds.toLocaleString("ru");
    $("#rate").textContent =
        (views ? (adds / views) * 100 : 0).toFixed(1) + "%";
    const low = products.filter((p) => p.stock < 5);
    $("#stockAlerts").innerHTML = low.length
        ? low
              .slice(0, 4)
              .map(
                  (p) =>
                      `<div><span>${esc(p.name)}</span><b class="danger-text">${p.stock} шт.</b></div>`,
              )
              .join("")
        : "<div><span>Все товары в наличии</span><b>✓</b></div>";
    renderProducts();
    try {
        integrations = await apiJson("/api/admin/integrations");
        $("#configured").innerHTML = integrations.length
            ? integrations
                  .map(
                      (x) =>
                          `<div><span><b>${esc(x.public_config.name || x.provider.toUpperCase())}</b><br><small>${x.kind === "payment" ? "Оплата" : "Доставка"} · ${esc(x.provider)}</small></span><span><b class="${x.enabled ? "" : "danger-text"}">${x.enabled ? "Активна" : "Выключена"}</b> <button type="button" class="icon-btn" data-edit-integration="${esc(x.provider)}">Изменить</button> <button type="button" class="icon-btn danger" data-delete-integration="${esc(x.provider)}">Удалить</button></span></div>`,
                  )
                  .join("")
            : "<small>Интеграции пока не настроены</small>";
    } catch (error) {
        $("#configured").innerHTML =
            `<small class="danger-text">${esc(error.message)}</small>`;
    } finally {
        refresh.disabled = false;
        refresh.textContent = "↻ Обновить";
    }
}
function openProduct(p = null) {
    const f = $("#productForm");
    f.reset();
    f.elements.id.value = "";
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
const readImage = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // GIF may be animated, so keep it intact. Other photographs are
            // reduced before being embedded into the JSON request.
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
        <button type="button" class="add-variant">+ Добавить размер / вариацию</button>
    </article>`;
}
function renderColorGroups(groups) {
    $("#colorGroups").innerHTML = groups.map(colorGroup).join("");
    document.querySelectorAll(".color-group").forEach(bindColorGroup);
}
function addColorGroup() {
    $("#colorGroups").insertAdjacentHTML("beforeend", colorGroup());
    bindColorGroup($("#colorGroups").lastElementChild);
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
    const d = Object.fromEntries(new FormData(e.target));
    d.is_active = e.target.elements.is_active.checked;
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
    if (!d.variants.length) return toast("Добавьте хотя бы одну вариацию");
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
        }
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
        const response = await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: new FormData(event.target).get("name"),
            }),
        });
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
    const submit = $("#integration-save");
    submit.disabled = true;
    e.target.classList.add("is-saving");
    $("#integration-save .button-label").textContent = "Сохраняем и проверяем…";
    const f = new FormData(e.target),
        provider = f.get("provider"),
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
        await load();
    } catch (error) {
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
}
integrationKind.onchange = updateIntegrationForm;
integrationProvider.onchange = updateIntegrationForm;
updateIntegrationForm();
$("#configured").onclick = async (event) => {
    const edit = event.target.closest("[data-edit-integration]");
    if (edit) {
        const item = integrations.find(
            (x) => x.provider === edit.dataset.editIntegration,
        );
        const form = $("#integration");
        form.reset();
        form.elements.editing.value = item.provider;
        form.elements.kind.value = item.kind;
        form.elements.provider.value = item.provider;
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
            "Вы точно хотите удалить эту интеграцию? Она исчезнет из корзины.",
        )
    )
        return;
    const response = await fetch(
        `/api/admin/integrations/${button.dataset.deleteIntegration}`,
        { method: "DELETE" },
    );
    if (response.ok) {
        toast("Интеграция удалена");
        load();
    } else
        toast(
            await errorMessage(response, "Не удалось удалить интеграцию"),
            true,
        );
};
$("#search").oninput = renderProducts;
$("#categoryFilter").onchange = renderProducts;
$("#refresh").onclick = load;
$("#logout").onclick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    location.replace("/admin");
};
load();
