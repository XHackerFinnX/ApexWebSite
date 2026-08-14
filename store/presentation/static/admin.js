let products = [];
let categories = [];
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
    const response = await fetch("/api/admin/categories");
    if (!response.ok)
        throw new Error(
            await errorMessage(response, "Не удалось загрузить категории"),
        );
    categories = await response.json();
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
                    `<tr><td><b>${esc(p.name)}</b><br><small>#${p.id}</small></td><td>${esc(p.category)}</td><td><b>${Number(p.price).toLocaleString("ru")} ₽</b></td><td><span class="stock ${p.stock < 5 ? "low" : ""}">${p.stock} шт.</span></td><td><small>${p.views} просм. · ${p.cart_adds} в корзину</small></td><td><button class="icon-btn" data-edit="${p.id}">Изменить</button> <button class="icon-btn danger" data-delete="${p.id}">Удалить</button></td></tr>`,
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
    try {
        await loadCategories();
    } catch (error) {
        toast(error.message, true);
    }
    const response = await fetch("/api/admin/products");
    products = await response.json();
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
    const ir = await fetch("/api/admin/integrations");
    if (ir.status === 401) return location.replace("/admin");
    const integrations = await ir.json();
    $("#configured").innerHTML = integrations
        .map(
            (x) =>
                `<div><span><b>${esc(x.provider.toUpperCase())}</b><br><small>${esc(x.public_config.environment)}</small></span><b class="${x.enabled ? "" : "danger-text"}">${x.enabled ? "Активна" : "Выключена"}</b></div>`,
        )
        .join("");
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
    const f = new FormData(e.target),
        provider = f.get("provider"),
        keys = {
            tbank: ["terminal_key", "password"],
            alfabank: ["username", "password"],
            cdek: ["client_id", "client_secret"],
        }[provider],
        d = {
            provider,
            environment: f.get("environment"),
            enabled: f.has("enabled"),
            [keys[0]]: f.get("login"),
            [keys[1]]: f.get("secret"),
        };
    const r = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
    });
    if (r.ok) {
        toast("Настройки сохранены");
        e.target.reset();
        load();
    } else toast((await r.json()).error);
};
$("#search").oninput = renderProducts;
$("#categoryFilter").onchange = renderProducts;
$("#refresh").onclick = load;
$("#logout").onclick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    location.replace("/admin");
};
load();
