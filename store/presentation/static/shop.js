const sections = {
    jackets: [
        [
            "Porsche Vintage Racing Jacket",
            130,
            210,
            "assets/porsche.jpg",
            "assets/porsche-back.jpg",
        ],
        ["RB Vintage Racing Jacket", 137, 220, "assets/rb.jpg", "assets/rb-back.webp"],
        ["Blue BMW Vintage Racing Jacket", 132, 200, "assets/bmw.webp", "assets/bmw-back.webp"],
        [
            "Red Mercedes Vintage Racing Jacket",
            133,
            200,
            "assets/mercedes.webp",
            "assets/mercedes-back.webp",
        ],
        [
            "Blue Subaru Vintage Racing Jacket",
            137,
            210,
            "assets/subaru.webp",
            "assets/subaru-back.webp",
        ],
    ],
    new: [
        ["Washed RB Hoodie V2", 102.55, 140, "assets/rb-hoodie.png", "assets/rb-hoodie-back.png"],
        [
            "Anti Social Racing Club Tee",
            55,
            80,
            "assets/anti-social.png",
            "assets/anti-social-back.png",
        ],
        [
            "McLaren Vintage Racing Jacket",
            137,
            180,
            "assets/mclaren.png",
            "assets/mclaren-back.png",
        ],
        ["Do It Twice Tee", 55, 80, "assets/twice.png", "assets/twice-back.png"],
        ["Senna Quote Tee", 55, 80, "assets/senna.png", "assets/senna-back.png"],
    ],
    deals: [
        ["MB Hoodie Bundle", 249, null, "assets/mb-bundle.png", "assets/mb-bundle-back.png"],
        ["Monaco Tee Bundle", 107, 165, "assets/monaco.png", "assets/monaco-back.png"],
        [
            "Senna Graphic Tee Bundle",
            107,
            165,
            "assets/senna-bundle.png",
            "assets/senna-bundle-back.png",
        ],
        ["Raceday Tee Bundle", 107, 165, "assets/raceday.png", "assets/raceday-back.png"],
    ],
};
let cart = [];
const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${Number(value).toFixed(2)}`;

function card(product, index, section) {
    const [name, price, compare, image, alternate] = product;
    const saving = compare ? `<span class="sale">SAVE ${money(compare - price)}</span>` : "";
    return `<article class="product-card"><div class="product-image">${saving}<img src="${image}" alt="${name}" loading="lazy"><img class="alternate" src="${alternate}" alt="${name}, back view" loading="lazy"><button data-add="${section}:${index}" aria-label="Add ${name} to bag">QUICK ADD +</button></div><div class="product-info"><h3>${name}</h3><p><b>${money(price)}</b>${compare ? `<s>${money(compare)}</s>` : ""}</p></div></article>`;
}

Object.entries(sections).forEach(([name, products]) => {
    $(`#${name}Grid`).innerHTML = products
        .map((product, index) => card(product, index, name))
        .join("");
});

document.addEventListener("click", (event) => {
    const key = event.target.dataset.add;
    if (!key) return;
    const [section, index] = key.split(":");
    cart.push(sections[section][Number(index)]);
    updateCart();
    $("#toast").classList.add("show");
    setTimeout(() => $("#toast").classList.remove("show"), 1400);
});

function updateCart() {
    $("#cartCount").textContent = cart.length;
    $("#drawerCount").textContent = cart.length;
    $("#cartTotal").textContent = money(cart.reduce((sum, item) => sum + item[1], 0));
    $("#cartItems").innerHTML = cart.length
        ? cart
              .map(
                  (item, index) =>
                      `<div class="cart-row"><img src="${item[3]}" alt=""><span>${item[0]}<small>${money(item[1])}</small></span><button data-remove="${index}" aria-label="Remove ${item[0]}">×</button></div>`,
              )
              .join("")
        : "<p>Your bag is empty.</p>";
    document.querySelectorAll("[data-remove]").forEach(
        (button) =>
            (button.onclick = () => {
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
$("#cartButton").onclick = () => toggleCart(true);
$("#closeCart").onclick = () => toggleCart(false);
$("#scrim").onclick = () => toggleCart(false);
$("#menuButton").onclick = () => $("#mainNav").classList.toggle("open");
$("#newsletterForm").onsubmit = (event) => {
    event.preventDefault();
    $("#newsletterStatus").textContent = "WELCOME TO THE CLUB — CHECK YOUR INBOX.";
    event.target.reset();
};
