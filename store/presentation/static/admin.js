let products = [];
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
const toast = (message) => {
    $("#toast").textContent = message;
    $("#toast").classList.add("show");
    setTimeout(() => $("#toast").classList.remove("show"), 2400);
};
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
    const response = await fetch("/api/products");
    products = await response.json();
    $("#count").textContent = products.length;
    const views = products.reduce((n, p) => n + p.views, 0),
        adds = products.reduce((n, p) => n + p.cart_adds, 0);
    $("#views").textContent = views.toLocaleString("ru");
    $("#adds").textContent = adds.toLocaleString("ru");
    $("#rate").textContent =
        (views ? (adds / views) * 100 : 0).toFixed(1) + "%";
    const categories = [...new Set(products.map((p) => p.category))];
    $("#categoryFilter").innerHTML =
        '<option value="">Все категории</option>' +
        categories.map((c) => `<option>${esc(c)}</option>`).join("");
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
    $("#formTitle").textContent = p ? "Редактирование товара" : "Новый товар";
    if (p)
        Object.keys(p).forEach((k) => {
            if (f.elements[k])
                f.elements[k].value = k === "sizes" ? p[k].join(", ") : p[k];
        });
    f.dataset.images = JSON.stringify(
        p?.images || (p?.image_url ? [p.image_url] : []),
    );
    renderImagePreview(JSON.parse(f.dataset.images));
    $("#productDialog").showModal();
}
function renderImagePreview(images) {
    $("#imagePreview").innerHTML = images
        .map(
            (src, index) => `<img src="${esc(src)}" alt="Фото ${index + 1}" />`,
        )
        .join("");
}
const readImage = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
$("#productImages").onchange = async (event) => {
    const images = await Promise.all([...event.target.files].map(readImage));
    $("#productForm").dataset.images = JSON.stringify(images);
    renderImagePreview(images);
};
document
    .querySelectorAll("[data-open-product]")
    .forEach((b) => (b.onclick = () => openProduct()));
document
    .querySelectorAll("[data-close]")
    .forEach((b) => (b.onclick = () => $("#productDialog").close()));
$("#productForm").onsubmit = async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    delete d.image_files;
    d.images = JSON.parse(e.target.dataset.images || "[]");
    d.image_url = d.images[0] || "";
    d.sizes = d.sizes
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    const r = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
    });
    if (r.ok) {
        $("#productDialog").close();
        toast(d.id ? "Товар обновлён" : "Товар добавлен");
        load();
    } else toast((await r.json()).error);
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
