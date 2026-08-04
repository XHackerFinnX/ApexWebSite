let products = [],
    active = "Все",
    cart = 0;
const icons = ["◒", "⌁", "◼", "✦"];
async function load() {
    products = await (await fetch("/api/products")).json();
    drawFilters();
    draw();
}
function drawFilters() {
    let cats = ["Все", ...new Set(products.map((x) => x.category))];
    filters.innerHTML = cats
        .map(
            (x) =>
                `<button class="chip ${x === active ? "active" : ""}" data-cat="${x}">${x}</button>`,
        )
        .join("");
    filters.querySelectorAll("button").forEach(
        (b) =>
            (b.onclick = () => {
                active = b.dataset.cat;
                drawFilters();
                draw();
            }),
    );
}
function draw() {
    let items = active === "Все" ? products : products.filter((x) => x.category === active);
    document.querySelector("#products").innerHTML = items
        .map(
            (p, i) =>
                `<article class="card" data-id="${p.id}"><div class="visual">${icons[i % icons.length]}</div><div class="card-info"><div class="row"><b>${p.name}</b><b>${p.price.toLocaleString("ru")} ₽</b></div><p class="muted">${p.description}</p><div class="row"><small>${p.sizes.join(" · ") || "ONE SIZE"}</small><button class="add">Добавить</button></div></div></article>`,
        )
        .join("");
    document.querySelectorAll(".card").forEach((c) => {
        fetch(`/api/products/${c.dataset.id}/view`, { method: "POST" });
        c.querySelector(".add").onclick = () => {
            cart++;
            document.querySelector("#cart").textContent = cart;
            fetch(`/api/products/${c.dataset.id}/cart`, { method: "POST" });
        };
    });
}
load();

checkout.onclick = () => captcha.showModal();
cancelPay.onclick = () => captcha.close();
confirmPay.onclick = async () => {
    payStatus.textContent = "Проверяем…";
    let r = await fetch("/api/checkout/captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken.value }),
    });
    let d = await r.json();
    payStatus.textContent = r.ok ? "✓ CAPTCHA пройдена. Переходим к защищённой оплате…" : d.error;
};
