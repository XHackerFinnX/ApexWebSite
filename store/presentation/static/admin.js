let products = [];
async function load() {
    products = await (await fetch("/api/products")).json();
    count.textContent = products.length;
    let v = products.reduce((a, x) => a + x.views, 0),
        a = products.reduce((a, x) => a + x.cart_adds, 0);
    views.textContent = v.toLocaleString("ru");
    adds.textContent = a.toLocaleString("ru");
    rate.textContent = (v ? (a / v) * 100 : 0).toFixed(1) + "%";
    rows.innerHTML = products
        .map(
            (p) =>
                `<tr><td><b>${p.name}</b><br><small class="muted">${p.price.toLocaleString("ru")} ₽</small></td><td>${p.category}</td><td>${p.stock}</td><td>${p.views}</td><td>${p.cart_adds}</td><td><button class="danger" onclick="removeProduct(${p.id})">Удалить</button></td></tr>`,
        )
        .join("");
    let integrations = await (await fetch("/api/admin/integrations")).json();
    configured.innerHTML = integrations
        .map(
            (x) =>
                `<p><b>${x.provider.toUpperCase()}</b> — ${x.enabled ? "активна" : "выключена"} · ${Object.keys(x.secret_config).join(", ")}</p>`,
        )
        .join("");
}
addProduct.onclick = () => (productForm.hidden = !productForm.hidden);
productForm.querySelector("form").onsubmit = async (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(e.target));
    d.sizes = d.sizes
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    let r = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
    });
    if (r.ok) {
        e.target.reset();
        productForm.hidden = true;
        load();
    } else alert((await r.json()).error);
};
async function removeProduct(id) {
    if (confirm("Удалить товар?")) {
        await fetch("/api/admin/products/" + id, { method: "DELETE" });
        load();
    }
}
integration.onsubmit = async (e) => {
    e.preventDefault();
    let f = new FormData(e.target),
        provider = f.get("provider"),
        d = { provider, environment: f.get("environment"), enabled: f.has("enabled") };
    let keys = {
        tbank: ["terminal_key", "password"],
        alfabank: ["username", "password"],
        yookassa: ["shop_id", "secret_key"],
        cdek: ["client_id", "client_secret"],
    }[provider];
    d[keys[0]] = f.get("login");
    d[keys[1]] = f.get("secret");
    let r = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
    });
    if (r.ok) {
        e.target.reset();
        load();
    } else alert((await r.json()).error);
};
load();
