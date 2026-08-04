/* ============================================================
   APEX GRID — static storefront logic
   ============================================================ */

/* ---------- Data ---------- */
const collections = [
    {
        id: "hoodies",
        eyebrow: "The Paddock Fleece",
        title: "Racing Hoodies",
        products: [
            {
                id: "hoodie-apex",
                name: "Apex Racing Hoodie",
                price: 118,
                compareAt: 160,
                image: "images/hoodie-apex.png",
                category: "Hoodies",
            },
            {
                id: "hoodie-pole",
                name: "Pole Position Hoodie",
                price: 112,
                compareAt: null,
                image: "images/hoodie-pole.png",
                category: "Hoodies",
            },
            {
                id: "hoodie-grid",
                name: "Grid Wall Zip Hoodie",
                price: 124,
                compareAt: 150,
                image: "images/hoodie-grid.png",
                category: "Hoodies",
            },
            {
                id: "hoodie-grid",
                name: "Grid Wall Zip Hoodie",
                price: 124,
                compareAt: 150,
                image: "images/hoodie-grid.png",
                category: "Hoodies",
            },
        ],
    },
    {
        id: "jackets",
        eyebrow: "The Archive Sale — up to 30% off",
        title: "Vintage Racing Jackets",
        products: [
            {
                id: "jacket-circuit",
                name: "Circuit Bomber Jacket",
                price: 189,
                compareAt: 240,
                image: "images/jacket-circuit.png",
                category: "Jackets",
            },
            {
                id: "jacket-paddock",
                name: "Paddock Track Jacket",
                price: 175,
                compareAt: 220,
                image: "images/jacket-paddock.png",
                category: "Jackets",
            },
            {
                id: "jacket-gp",
                name: "Grand Prix Racing Jacket",
                price: 198,
                compareAt: null,
                image: "images/jacket-gp.png",
                category: "Jackets",
            },
        ],
    },
    {
        id: "tees",
        eyebrow: "Just Landed",
        title: "Graphic Tees",
        products: [
            {
                id: "tee-flag",
                name: "Chequered Flag Tee",
                price: 55,
                compareAt: 75,
                image: "images/tee-flag.png",
                category: "Tees",
            },
            {
                id: "tee-lap",
                name: "Fastest Lap Tee",
                price: 55,
                compareAt: null,
                image: "images/tee-lap.png",
                category: "Tees",
            },
            {
                id: "tee-podium",
                name: "Podium P1 Tee",
                price: 52,
                compareAt: 70,
                image: "images/tee-podium.png",
                category: "Tees",
            },
        ],
    },
];

const reviews = [
    {
        quote: "The quality is insane. Heavy, comfortable and the racing details look even better in person.",
        author: "Anastasia N.",
    },
    {
        quote: "My new favourite jacket. Fits perfectly and gets compliments everywhere I go.",
        author: "Jaycee E.",
    },
    {
        quote: "Fast delivery and premium packaging. You can tell these pieces are made with care.",
        author: "Ryan M.",
    },
];

const faqs = [
    {
        q: "Where do you ship?",
        a: "We ship worldwide. Delivery times and rates are calculated at checkout based on your location.",
    },
    {
        q: "How do your products fit?",
        a: "Most pieces have a relaxed, true-to-size fit. Choose your usual size, or size up for a fuller oversized look.",
    },
    {
        q: "Can I return my order?",
        a: "Yes. Unworn items with tags can be returned within 30 days of delivery for a full refund.",
    },
    {
        q: "How can I track my order?",
        a: "As soon as your order ships, we send tracking information straight to your inbox.",
    },
];

const announcements = [
    "NEW HOODIE DROP LIVE NOW",
    "FREE SHIPPING ON ORDERS OVER $100",
    "30 DAY HASSLE-FREE RETURNS",
    "ENGINEERED FOR THE OBSESSED",
];

/* ---------- Helpers ---------- */
const money = (v) => "$" + v.toFixed(2);
const productById = {};
collections.forEach((c) => c.products.forEach((p) => (productById[p.id] = p)));

/* SVG icon markup used in injected HTML */
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
    const track = document.getElementById("announcement-track");
    const sequence = [...announcements, ...announcements];
    track.innerHTML = sequence
        .map((item) => `<span>${item}<i aria-hidden="true">/////</i></span>`)
        .join("");
}

function renderCollections() {
    const root = document.getElementById("collections");
    root.innerHTML = collections
        .map(
            (c) => `
      <section id="${c.id}" class="section">
        <div class="section__head">
          <div>
            <p class="eyebrow">${c.eyebrow}</p>
            <h2 class="display section__title">${c.title}</h2>
          </div>
          <a href="#${c.id}" class="section__link">Shop all ${ICONS.arrow}</a>
        </div>
        <div class="grid">
          ${c.products.map(productCard).join("")}
        </div>
      </section>`,
        )
        .join("");
}

function productCard(p) {
    const saving = p.compareAt ? p.compareAt - p.price : 0;
    return `
    <article class="card">
      <div class="card__media">
        ${saving > 0 ? `<span class="card__badge">Save ${money(saving)}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <button type="button" class="card__add" data-add="${p.id}" aria-label="Add ${p.name} to bag">
          Quick add ${ICONS.plus}
        </button>
      </div>
      <div class="card__info">
        <div>
          <p class="card__category">${p.category}</p>
          <h3 class="card__name">${p.name}</h3>
        </div>
        <p class="card__prices">
          <span class="card__price">${money(p.price)}</span>
          ${p.compareAt ? `<span class="card__compare">${money(p.compareAt)}</span>` : ""}
        </p>
      </div>
    </article>`;
}

function renderReviews() {
    document.getElementById("reviews-grid").innerHTML = reviews
        .map(
            (r) => `
      <figure class="review">
        <div class="review__stars">${ICONS.star.repeat(5)}</div>
        <blockquote class="review__quote">&ldquo;${r.quote}&rdquo;</blockquote>
        <figcaption class="review__author">— ${r.author}</figcaption>
      </figure>`,
        )
        .join("");
}

function renderFaq() {
    document.getElementById("faq-list").innerHTML = faqs
        .map(
            (f) => `
      <details>
        <summary>${f.q} ${ICONS.plus}</summary>
        <p class="faq__answer">${f.a}</p>
      </details>`,
        )
        .join("");
}

/* ---------- Cart state ---------- */
const cart = new Map(); // id -> qty

function cartCount() {
    let n = 0;
    cart.forEach((qty) => (n += qty));
    return n;
}
function cartTotal() {
    let t = 0;
    cart.forEach((qty, id) => (t += qty * productById[id].price));
    return t;
}

function addToCart(id) {
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    showToast(`Added — ${productById[id].name}`);
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
    const count = cartCount();
    const total = cartTotal();

    document.getElementById("bag-count").textContent = count;
    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-subtotal").textContent = money(total);
    document.getElementById("cart-checkout-total").textContent = money(total);
    document.getElementById("cart-checkout").disabled = count === 0;

    const body = document.getElementById("cart-body");
    if (cart.size === 0) {
        body.innerHTML = `
      <div class="cart__empty">
        ${ICONS.bag}
        <p>Your bag is empty</p>
      </div>`;
        return;
    }

    const lines = [];
    cart.forEach((qty, id) => {
        const p = productById[id];
        lines.push(`
      <div class="cart__line">
        <img src="${p.image}" alt="${p.name}" />
        <div class="cart__line-body">
          <div class="cart__line-top">
            <h3 class="cart__line-name">${p.name}</h3>
            <button type="button" class="cart__line-remove" data-remove="${id}" aria-label="Remove ${p.name}">${ICONS.close}</button>
          </div>
          <p class="cart__line-category">${p.category}</p>
          <div class="cart__line-bottom">
            <div class="qty">
              <button type="button" data-dec="${id}" aria-label="Decrease quantity">${ICONS.minus}</button>
              <span>${qty}</span>
              <button type="button" data-inc="${id}" aria-label="Increase quantity">${ICONS.plus}</button>
            </div>
            <span class="cart__line-total">${money(p.price * qty)}</span>
          </div>
        </div>
      </div>`);
    });
    body.innerHTML = lines.join("");
}

/* ---------- Cart drawer open/close ---------- */
const cartEl = document.getElementById("cart");
const overlayEl = document.getElementById("cart-overlay");

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

/* ---------- Toast ---------- */
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
    }, 1800);
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    const openIcon = document.getElementById("menu-icon-open");
    const closeIcon = document.getElementById("menu-icon-close");

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("hidden") === false;
        toggle.setAttribute("aria-expanded", String(isOpen));
        openIcon.classList.toggle("hidden", isOpen);
        closeIcon.classList.toggle("hidden", !isOpen);
    });

    nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
            nav.classList.add("hidden");
            toggle.setAttribute("aria-expanded", "false");
            openIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }),
    );
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const status = document.getElementById("newsletter-status");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        status.textContent = "Welcome to the grid — check your inbox for 10% off.";
        form.reset();
    });
}

/* ---------- Global click delegation ---------- */
function initEvents() {
    document.getElementById("open-cart").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    overlayEl.addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCart();
    });

    document.addEventListener("click", (e) => {
        const t = e.target.closest("[data-add],[data-remove],[data-inc],[data-dec]");
        if (!t) return;
        if (t.dataset.add) addToCart(t.dataset.add);
        else if (t.dataset.remove) removeFromCart(t.dataset.remove);
        else if (t.dataset.inc) setQty(t.dataset.inc, (cart.get(t.dataset.inc) || 0) + 1);
        else if (t.dataset.dec) setQty(t.dataset.dec, (cart.get(t.dataset.dec) || 0) - 1);
    });
}

/* ---------- Init ---------- */
renderAnnouncement();
renderCollections();
renderReviews();
renderFaq();
renderCart();
initMobileMenu();
initNewsletter();
initEvents();
