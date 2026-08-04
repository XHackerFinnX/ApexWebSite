Array.prototype.flat || (Array.prototype.flat = function(t = 1) {
  return t > 0 ? (
    // @ts-expect-error - Polyfill for older browsers
    this.reduce(
      (e, s) => e.concat(Array.isArray(s) ? s.flat(t - 1) : s),
      []
    )
  ) : (
    // @ts-expect-error - Polyfill for older browsers
    this.slice()
  );
});
Array.prototype.flatMap || (Array.prototype.flatMap = function(t, e) {
  return this.map(t, e).flat();
});
const vt = (t) => {
  const e = window.Shopify.currency;
  e && (t.currencyRate = Number(e.rate));
  const s = window.Shopify.country;
  s && (t.country = s);
  const n = window.Shopify.locale;
  n && (t.locale = n);
}, Y = () => {
  try {
    const t = "kaching_local_storage_test";
    return localStorage.setItem(t, t), localStorage.removeItem(t), !0;
  } catch {
    return !1;
  }
}, b = Y() ? window.localStorage : window.sessionStorage, k = () => new URLSearchParams(window.location.search).get("kaching");
let N;
const Dt = () => (N === void 0 && (N = k() === "off"), N);
let G;
const v = () => (G === void 0 && (G = k() === "debug"), G);
let O;
const A = () => (O === void 0 && (O = k() === "dev"), O);
let T;
const Z = () => (T === void 0 && (T = k() === "info"), T), kt = async (t, e, s, n, o, i) => {
  try {
    const a = "kaching_visited_deal_blocks", u = b.getItem(a), l = u ? JSON.parse(u) : [];
    if (l.includes(e))
      return;
    l.push(e), b.setItem(a, JSON.stringify(l)), await fetch("https://bundles-stats.kachingappz.app/impressions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shopDomain: t,
        dealBlockId: e,
        productId: s,
        abTestVariantId: n,
        dealBlockVersionId: o,
        sessionId: i
      }),
      keepalive: !0
    });
  } catch (a) {
    console.error(a);
  }
}, B = "https://storefront-events.kachingappz.app", j = () => {
  if (v() || A())
    try {
      const t = localStorage.getItem("kaching_storefront_events_host");
      if (t) return t;
    } catch {
    }
  return B;
}, $ = /* @__PURE__ */ new Set(), tt = async (t, e = {}, s = 1, { keepalive: n = !1 } = {}) => {
  if (D("sendStorefrontEvent", { name: t, data: e }), $.has(t) || ($.add(t), Math.random() > s))
    return;
  const o = window.location.href;
  return await fetch(`${j()}/bundles/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: { name: t, data: e, url: o, shop: window.Shopify.shop }
    }),
    keepalive: n
  });
}, K = /* @__PURE__ */ new Set(), Et = async (t, e = {}, s = 1, { keepalive: n = !1 } = {}) => {
  if (D("sendStorefrontMetric", { name: t, data: e }), K.has(t) || (K.add(t), Math.random() > s))
    return;
  const o = window.location.href;
  return await fetch(`${j()}/bundles/metrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: { name: t, data: e, url: o, shop: window.Shopify.shop }
    }),
    keepalive: n
  });
};
let L = !1;
const z = async (t, e, s = 0.1) => {
  if (L || Math.random() > s || t === "Failed to fetch" || t && (t.includes(
    "Cannot define multiple custom elements with the same tag name"
  ) || t.includes(
    "Failed to execute 'define' on 'CustomElementRegistry'"
  ) || t.includes("CustomElementRegistry.define")))
    return;
  const n = window.location.href, o = window.Shopify.shop;
  return L = !0, await fetch(`${j()}/bundles/errors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      error: { message: t, stack: e, url: n, shop: o }
    })
  });
}, Nt = () => {
  const t = ["kaching-bundles.js", "kaching-bundles-block.js"];
  window.addEventListener("error", async function(e) {
    const s = async (n) => {
      const { filename: o, message: i, error: a } = n;
      for (const u of t)
        if (o.includes(u)) {
          if (v() || J()) {
            D("Error", n);
            return;
          }
          await z(i, a.stack);
        }
    };
    try {
      await s(e);
    } catch (n) {
      console.error(n);
    }
  }), window.addEventListener("unhandledrejection", async function(e) {
    const s = async (n) => {
      if (typeof n.reason != "object")
        return;
      const { message: o, stack: i } = n.reason;
      if (i) {
        for (const a of t)
          if (i.includes(a)) {
            if (v() || J()) {
              D("Unhandled rejection", n);
              return;
            }
            await z(o, i);
          }
      }
    };
    try {
      await s(e);
    } catch (n) {
      console.error(n);
    }
  });
};
function D(t, e = null) {
  !v() && !A() || console.debug("[Kaching Bundles]", t, e);
}
function Gt(t, e = null) {
  !Z() && !v() && !A() || console.info("[Kaching Bundles]", t, e);
}
const Ot = () => {
  const t = (n) => {
    window.dispatchEvent(new Event(n));
  }, e = history.pushState;
  history.pushState = function(...o) {
    const i = e.apply(this, o);
    return t("pushstate"), t("locationchange"), i;
  };
  const s = history.replaceState;
  history.replaceState = function(...o) {
    const i = s.apply(this, o);
    return t("replacestate"), t("locationchange"), i;
  }, nt(window, "popstate", () => {
    t("locationchange");
  });
}, Tt = (t, e, s, n = 0) => {
  let o = Object.getPrototypeOf(t), i;
  for (; o && (i = Object.getOwnPropertyDescriptor(o, e), !i); )
    o = Object.getPrototypeOf(o);
  if (i) {
    if (!i.configurable)
      return;
    Object.defineProperty(t, e, {
      configurable: !0,
      get: function(...a) {
        return i.get.apply(this, a);
      },
      set: function(...a) {
        const u = this[e];
        i.set.apply(this, a);
        const l = this[e];
        return typeof s == "function" && setTimeout(s.bind(this, u, l), n), l;
      }
    });
  }
}, et = (t, e = document) => {
  try {
    return e.querySelector(t);
  } catch {
    return null;
  }
}, At = (t, e = document) => {
  try {
    return [...e.querySelectorAll(t)];
  } catch {
    return [];
  }
}, nt = (t, e, s) => t.addEventListener(e, s), jt = (t) => document.createElement(t), _t = (t, e) => t && t.classList.add(e), qt = (t, e, s) => t.setAttribute(e, s), Pt = (t) => Number(t.split("/").pop()), Mt = (t) => t.dataset, Vt = (t) => {
  const e = et(t);
  if (!e)
    return;
  const s = JSON.parse(e.textContent);
  return D("jsonFromElement", s), s;
}, st = (t, e) => {
  let s = 0, n = t;
  for (; n && n !== e && n !== document.body; )
    s++, n = n.parentNode;
  return n !== e ? 1 / 0 : s;
}, rt = (t, e) => {
  if (t === e)
    return t;
  const s = /* @__PURE__ */ new Set();
  let n = t;
  for (; n; )
    s.add(n), n = n.parentElement;
  for (n = e; n; ) {
    if (s.has(n))
      return n;
    n = n.parentElement;
  }
  return document.documentElement;
}, xt = (t, e, s = 1 / 0) => {
  let n = null, o = 1 / 0;
  for (const i of e) {
    const a = rt(t, i);
    if (a === document.body || a === document.documentElement)
      continue;
    const u = st(t, a);
    u > s || u < o && (n = i, o = u);
  }
  return n;
}, J = () => {
  const t = document.currentScript;
  return t ? t.src.includes("kaching-bundles-dev") : !1;
}, R = (t, e = {}) => {
  const s = window.Shopify.routes, o = (s && s.root || "/") + t, i = new URLSearchParams();
  for (const [u, l] of Object.entries(e))
    i.append(u, l);
  const a = i.toString();
  return a ? `${o}?${a}` : o;
}, Ct = (t, e) => {
  new MutationObserver((n, o) => {
    for (const i of n)
      i.type === "childList" && i.removedNodes.forEach((a) => {
        a.contains(t) && (o.disconnect(), e());
      });
  }).observe(document.body, { childList: !0, subtree: !0 });
}, Ft = (t, e = 300, s = 100) => {
  let n = 0;
  const o = () => {
    window.Shopify.analytics ? t() : n < e ? (n++, setTimeout(o, s)) : tt(
      "shopify_analytics_missing",
      {
        userAgent: navigator.userAgent
      },
      0.1
    );
  };
  o();
}, ot = async (t, {
  useExternalMetafieldNamespace: e,
  useMetaobjects: s
}) => s ? at(
  t
) : it(t), it = async (t, e) => {
  var n;
  const s = (n = (await t.query(
    `
      query FetchDealBlocks($metafieldNamespace: String!) {
        shop {
          metafield(namespace: $metafieldNamespace, key: "deal_blocks") {
            value
          }
        }
      }
    `,
    {
      variables: {
        metafieldNamespace: "$app:kaching_bundles"
      }
    }
  )).shop.metafield) == null ? void 0 : n.value;
  return s ? JSON.parse(s) : [];
}, at = async (t, e) => {
  const s = "$app:deal_block", n = [];
  let o = null;
  for (; ; ) {
    const i = await t.query(
      `
        query FetchDealBlockMetaobjects($type: String!, $cursor: String) {
          metaobjects(type: $type, first: 250, after: $cursor) {
            nodes {
              fields {
                key
                value
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
      {
        variables: {
          type: s,
          cursor: o
        }
      }
    );
    for (const a of i.metaobjects.nodes) {
      const u = a.fields.find(
        (l) => l.key === "settings"
      );
      u != null && u.value && n.push(JSON.parse(u.value));
    }
    if (!i.metaobjects.pageInfo.hasNextPage)
      break;
    o = i.metaobjects.pageInfo.endCursor;
  }
  return n;
};
class ct {
  constructor(e, s) {
    this.storefrontApiVersion = "2026-01", this.storefrontAccessToken = s, this.shopifyDomain = e;
  }
  async query(e, s) {
    var u, l;
    const n = (u = s == null ? void 0 : s.variables) != null ? u : {};
    let o = `https://${this.shopifyDomain}/api/${this.storefrontApiVersion}/graphql.json`;
    const i = (l = e.match(/query\s+(\w+)/)) == null ? void 0 : l[1];
    i && (o += `?operation_name=${i}`);
    const a = await (await fetch(o, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": this.storefrontAccessToken
      },
      body: JSON.stringify({
        query: e,
        variables: n
      })
    })).text();
    if (!a)
      throw new Error("Empty graphql response");
    return JSON.parse(a).data;
  }
}
var h = /* @__PURE__ */ ((t) => (t.QuantityBreak = "quantity-break", t.Bxgy = "bxgy", t.Bundle = "bundle", t.MixAndMatch = "mix-and-match", t.Sku = "sku", t))(h || {});
class Q extends Error {
  constructor(e) {
    super(e), this.name = "CartFetchError";
  }
}
const _ = "kaching_session_id", Ut = async () => {
  try {
    ut();
    const t = H();
    await pt() !== t && await ht(t);
  } catch (t) {
    if (t instanceof Q)
      console.error(t);
    else
      throw t;
  }
}, ut = () => {
  const t = new URL(window.location.href), e = new URLSearchParams(t.search), s = e.get("preview_kaching_session_id");
  s && (b.setItem(_, s), e.delete("preview_kaching_session_id"), t.search = e.toString(), window.history.replaceState({}, "", t.toString()));
}, H = () => b.getItem(_) || lt(), lt = () => {
  const t = dt();
  return b.setItem(_, t), t;
}, dt = () => typeof crypto != "undefined" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : ft(), ft = () => "10000000-1000-4000-8000-100000000000".replace(
  /[018]/g,
  (t) => (+t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +t / 4).toString(16)
), pt = async () => {
  const t = await fetch(R("cart.js"));
  if (!t.ok)
    throw new Q("Failed to fetch cart");
  return (await t.json()).attributes._kaching_session_id;
}, ht = async (t) => await fetch(R("cart/update.js"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    attributes: {
      _kaching_session_id: t
    }
  })
}), yt = ({
  kachingSessionId: t,
  abTestVariantsCount: e,
  abTestTrafficAllocation: s
}) => {
  const n = parseInt(t.replace(/-/g, "").slice(0, 4), 16) % 256, o = Math.floor(n * 100 / 256);
  if (!s)
    return mt(o, e);
  const i = 100 - s;
  if (o < i)
    return 1;
  const a = e - 1;
  if (a === 0)
    return 1;
  const u = s / a, l = Math.floor(
    (o - i) / u
  );
  return Math.min(l + 2, e);
}, mt = (t, e) => {
  const s = 100 / e, n = Math.floor(t / s);
  return Math.min(n + 1, e);
};
let y, S = null, W, X = [];
const $t = (t) => {
  X = t;
}, gt = async () => {
  if (S)
    return S;
  S = (async () => {
    if (!y.storefrontAccessToken)
      return;
    const t = new ct(
      y.shopifyDomain,
      y.storefrontAccessToken
    );
    W = await ot(t, {
      useExternalMetafieldNamespace: !1,
      useMetaobjects: y.featureFlags.storefront_metaobjects
    });
  })();
  try {
    await S;
  } catch (t) {
    throw S = null, t;
  }
}, It = async () => {
  var s;
  await gt();
  const t = W.filter((n) => {
    if (!n.abTestVariantId)
      return !0;
    const o = H(), i = yt({
      kachingSessionId: o,
      abTestVariantsCount: n.abTestVariantsCount,
      abTestTrafficAllocation: n.abTestTrafficAllocation
    });
    return n.abTestVariantNumber === i;
  }), e = (s = X.find(
    (n) => n.locale === y.locale
  )) == null ? void 0 : s.translations;
  return t.map((n) => {
    const o = (e == null ? void 0 : e.dealBlocks[n.id]) || {};
    return St(n, o);
  });
}, St = (t, e) => {
  var q, P, M, V, x, C;
  const s = (r) => {
    switch (r.dealBarType) {
      case void 0:
      case h.QuantityBreak:
        return n(r);
      case h.Bxgy:
        return o(r);
      case h.Bundle:
        return i(r);
      case h.Sku:
        return a(r);
      default:
        return null;
    }
  }, n = (r) => ({
    id: r.id,
    title: e[r.title] || r.title,
    mediaImageGID: r.mediaImageGID,
    freeGifts: [
      ...l(r.freeGifts),
      ...m(r.id, t.progressiveGifts)
    ],
    upsells: g(r.upsells),
    dealBarType: h.QuantityBreak,
    quantity: Number(r.quantity),
    discount: w(r.discountType, r.discountValue)
  }), o = (r) => ({
    id: r.id,
    title: e[r.title] || r.title,
    mediaImageGID: r.mediaImageGID,
    freeGifts: [
      ...l(r.freeGifts),
      ...m(r.id, t.progressiveGifts)
    ],
    upsells: g(r.upsells),
    dealBarType: h.Bxgy,
    buyQuantity: Number(r.buyQuantity),
    buyDiscount: w(
      r.buyDiscountType,
      r.buyDiscountValue
    ),
    getQuantity: Number(r.getQuantity),
    getDiscount: w(
      r.getDiscountType,
      r.getDiscountValue
    )
  }), i = (r) => ({
    id: r.id,
    title: e[r.title] || r.title,
    mediaImageGID: r.mediaImageGID,
    freeGifts: [
      ...l(r.freeGifts),
      ...m(r.id, t.progressiveGifts)
    ],
    upsells: g(r.upsells),
    dealBarType: h.Bundle,
    bundleProducts: u(r.bundleProducts)
  }), a = (r) => ({
    id: r.id,
    title: e[r.title] || r.title,
    mediaImageGID: r.mediaImageGID,
    freeGifts: [
      ...l(r.freeGifts),
      ...m(r.id, t.progressiveGifts)
    ],
    upsells: g(r.upsells),
    dealBarType: h.Sku,
    variantIds: r.variantGID ? [p(r.variantGID)] : null
  }), u = (r) => r.map((c) => {
    var d;
    return {
      id: c.id,
      productId: c.productGID === "default" ? "default" : p(c.productGID),
      variantId: c.variantGIDs && ((d = c.variantGIDs) != null && d[0]) ? p(c.variantGIDs[0]) : null,
      variantIds: c.variantGIDs ? c.variantGIDs.map(p) : null,
      quantity: Number(c.quantity),
      discount: w(
        c.discountType,
        c.discountValue
      )
    };
  }), l = (r) => r ? r.filter((d) => d.productGID).map((d) => {
    var E, f, I;
    return {
      id: d.id,
      productId: p(d.productGID),
      variantId: d.variantGIDs && ((E = d.variantGIDs) != null && E[0]) ? p(d.variantGIDs[0]) : null,
      variantIds: d.variantGIDs ? d.variantGIDs.map(p) : null,
      mediaImageGID: (f = d.mediaImageGID) != null ? f : null,
      quantity: Number(d.quantity),
      applyOnlyForSubscriptions: (I = d.applyOnlyForSubscriptions) != null ? I : !1
    };
  }) : [], m = (r, c) => {
    if (!c)
      return [];
    const d = t.dealBars.findIndex((f) => f.id === r) + 1;
    return c.gifts.filter(
      (f) => f.giftType === "product" && f.productGID && wt(f, d)
    ).map((f) => {
      var I, F, U;
      return {
        id: f.id,
        productId: p(f.productGID),
        variantId: f.variantGIDs && ((I = f.variantGIDs) != null && I[0]) ? p(f.variantGIDs[0]) : null,
        variantIds: f.variantGIDs ? f.variantGIDs.map(p) : null,
        mediaImageGID: (F = f.mediaImageGID) != null ? F : null,
        quantity: Number(f.quantity),
        applyOnlyForSubscriptions: (U = f.applyOnlyForSubscriptions) != null ? U : !1
      };
    });
  }, g = (r) => r ? r.map((c) => {
    var d;
    return {
      id: c.id,
      productId: c.productGID ? p(c.productGID) : null,
      variantId: c.variantGIDs && c.variantGIDs[0] ? p(c.variantGIDs[0]) : null,
      variantIds: c.variantGIDs ? c.variantGIDs.map(p) : null,
      mediaImageGID: (d = c.mediaImageGID) != null ? d : null,
      quantity: Number(c.quantity),
      discount: w(c.discountType, c.discountValue)
    };
  }) : [];
  return {
    id: t.id,
    nanoId: t.nanoId,
    discountName: (q = t.discountName) != null ? q : null,
    collectionBreaksEnabled: (P = t.collectionBreaksEnabled) != null ? P : !1,
    collectionBreaksDealProducts: !!t.collectionBreaksEnabled && ((M = t.collectionBreaks) == null ? void 0 : M.visibility) === "deal-products",
    differentVariantsEnabled: t.differentVariantsEnabled,
    marketId: (V = t.marketId) != null ? V : null,
    excludedMarketIds: (x = t.excludedMarketIds) != null ? x : null,
    currency: (C = t.currency) != null ? C : null,
    dealBars: t.dealBars.filter((r) => "showAsSoldOutEnabled" in r ? !r.showAsSoldOutEnabled : !0).map(s).filter((r) => r !== null)
  };
}, wt = (t, e) => t.unlockAtBarOnly ? e === t.unlockAtBar : e >= t.unlockAtBar, w = (t, e) => !t || t === "default" ? null : {
  type: t,
  value: Number(e)
}, p = (t) => Number(t.split("/").pop()), Kt = (t) => (y = t, {
  fetchDeals: It
});
export {
  yt as A,
  $t as B,
  _t as C,
  Dt as D,
  Nt as E,
  vt as F,
  Kt as G,
  gt as H,
  Et as I,
  R as a,
  nt as b,
  qt as c,
  D as d,
  ct as e,
  Ot as f,
  Pt as g,
  At as h,
  Gt as i,
  z as j,
  H as k,
  jt as l,
  xt as m,
  h as n,
  Tt as o,
  Ct as p,
  et as q,
  v as r,
  tt as s,
  A as t,
  Ut as u,
  Vt as v,
  Ft as w,
  Mt as x,
  kt as y,
  ot as z
};
