const fallbackProducts = [
    {
        id: 101,
        name: "Victory Lane Tee",
        description: "Heavyweight cotton / Off white",
        price: 48,
        category: "Tees",
        sizes: ["S", "M", "L", "XL"],
        art: "77",
    },
    {
        id: 102,
        name: "Pit Crew Jacket",
        description: "Canvas work jacket / Racing red",
        price: 148,
        category: "Outerwear",
        sizes: ["S", "M", "L"],
        art: "FF",
    },
    {
        id: 103,
        name: "Grand Prix Cap",
        description: "Six panel cap / Washed black",
        price: 38,
        category: "Accessories",
        sizes: ["ONE SIZE"],
        art: "GP",
    },
    {
        id: 104,
        name: "Full Throttle Tee",
        description: "Heavyweight cotton / Faded black",
        price: 52,
        category: "Tees",
        sizes: ["S", "M", "L", "XL"],
        art: "FAST",
    },
    {
        id: 105,
        name: "Circuit Knit",
        description: "Jacquard knit / Cream & red",
        price: 96,
        category: "Outerwear",
        sizes: ["S", "M", "L"],
        art: "01",
    },
    {
        id: 106,
        name: "Trackside Tote",
        description: "Utility canvas / Natural",
        price: 34,
        category: "Accessories",
        sizes: ["ONE SIZE"],
        art: "RACE",
    },
];

let products = [],
    active = "All",
    cart = [];
const $ = (selector) => document.querySelector(selector);

async function loadProducts() {
    try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Catalog unavailable");
        const apiProducts = await response.json();
        products = apiProducts.length
            ? apiProducts.map((product, index) => ({
                  ...product,
                  art: ["77", "FF", "GP", "FAST"][index % 4],
              }))
            : fallbackProducts;
    } catch (_) {
        products = fallbackProducts;
    }
    drawFilters();
    drawProducts();
}
function drawFilters() {
    const categories = ["All", ...new Set(products.map((product) => product.category))];
    $("#filters").innerHTML = categories
        .map(
            (category) =>
                `<button class="filter ${category === active ? "active" : ""}" data-category="${category}">${category}</button>`,
        )
        .join("");
    $("#filters")
        .querySelectorAll("button")
        .forEach((button) =>
            button.addEventListener("click", () => {
                active = button.dataset.category;
                drawFilters();
                drawProducts();
            }),
        );
}
function drawProducts() {
    const visible =
        active === "All" ? products : products.filter((product) => product.category === active);
    $("#products").innerHTML = visible
        .map(
            (product, index) => `
        <article class="product-card" data-id="${product.id}" style="--delay:${index * 60}ms">
            <div class="product-image product-image-${index % 4}"><span class="product-art">${product.art}</span><small>FINISHLINE<br>FEVER®</small><button class="quick-add" aria-label="Add ${product.name} to cart">+</button></div>
            <div class="product-info"><div><h3>${product.name}</h3><p>${product.description || product.category}</p></div><strong>${formatPrice(product.price)}</strong></div>
        </article>`,
        )
        .join("");
    $("#products")
        .querySelectorAll(".product-card")
        .forEach((card) => {
            fetch(`/api/products/${card.dataset.id}/view`, { method: "POST" }).catch(() => {});
            card.querySelector(".quick-add").addEventListener("click", () =>
                addToCart(card.dataset.id),
            );
        });
}

function formatPrice(price) {
    return `$${Number(price).toLocaleString("en-US")}`;
}
function addToCart(id) {
    const product = products.find((item) => String(item.id) === String(id));
    if (!product) return;
    cart.push(product);
    updateCart();
    fetch(`/api/products/${id}/cart`, { method: "POST" }).catch(() => {});
    $("#toast").classList.add("show");
    setTimeout(() => $("#toast").classList.remove("show"), 1700);
}
function updateCart() {
    $("#cart").textContent = `(${cart.length})`;
    $("#drawerCount").textContent = `(${cart.length})`;
    $("#cartTotal").textContent = formatPrice(
        cart.reduce((total, item) => total + Number(item.price), 0),
    );
    $("#cartItems").innerHTML = cart.length
        ? cart
              .map(
                  (item, index) =>
                      `<div><span>${item.name}<small>${item.sizes?.[0] || "ONE SIZE"}</small></span><strong>${formatPrice(item.price)}</strong><button data-remove="${index}" aria-label="Remove item">×</button></div>`,
              )
              .join("")
        : "<p>Your grid is empty.</p>";
    $("#cartItems")
        .querySelectorAll("[data-remove]")
        .forEach((button) =>
            button.addEventListener("click", () => {
                cart.splice(Number(button.dataset.remove), 1);
                updateCart();
            }),
        );
}
function toggleCart(open) {
    $("#cartDrawer").classList.toggle("open", open);
    $("#scrim").classList.toggle("open", open);
    $("#cartDrawer").setAttribute("aria-hidden", String(!open));
}

$("#checkout").addEventListener("click", () => toggleCart(true));
$("#closeCart").addEventListener("click", () => toggleCart(false));
$("#scrim").addEventListener("click", () => toggleCart(false));
$("#menuButton").addEventListener("click", () => $("#mainNav").classList.toggle("open"));
$("#mainNav")
    .querySelectorAll("a")
    .forEach((link) =>
        link.addEventListener("click", () => $("#mainNav").classList.remove("open")),
    );
$("#newsletterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    $("#newsletterStatus").textContent = "WELCOME TO THE PADDOCK.";
    event.target.reset();
});
loadProducts();
