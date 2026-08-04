import { s as b, a as O, d as m, i as w, n as rt, g as M, b as D, c as S, q as B, e as q, f as pe, w as Kt, h as v, j as fe, k as at, o as st, l as J, m as L, p as $, r as he, t as me, u as ge, v as z, x, y as _e, z as be, A as ye, B as ke, C as Ce, D as ve, E as we, F as Ie, G as Se, H as Pe } from "./kaching-bundles-api.js";
const Ae = () => {
  const n = /\b__kaching_/, t = ["script", "style"], e = (r) => {
    const a = document.createTreeWalker(r, NodeFilter.SHOW_TEXT, {
      acceptNode: (o) => {
        const l = o.parentElement;
        return !l || t.includes(l.tagName.toLowerCase()) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    let s;
    for (; s = a.nextNode(); ) {
      const o = s.textContent || "";
      if (n.test(o)) {
        const l = s.parentElement;
        if (l.classList.contains("properties-key-value-key"))
          continue;
        if (l.tagName.toLowerCase() === "dt") {
          const c = l.nextElementSibling;
          (c == null ? void 0 : c.tagName.toLowerCase()) === "dd" && (c.style.display = "none");
        }
        l.style.display = "none", b(
          "kaching_property_hidden",
          {
            text: o,
            element: l.tagName
          },
          0.01
        );
      }
    }
  };
  new MutationObserver((r) => {
    for (const a of r)
      for (const s of a.addedNodes)
        s.nodeType === Node.ELEMENT_NODE && e(s);
  }).observe(document.body, {
    childList: !0,
    subtree: !0
  }), e(document.body);
}, Be = () => {
  const n = document.querySelector('link[href*="kaching-bundles.css"]');
  if (!n) return;
  const t = n.closest(
    'div[data-block-type="liquid"]'
  );
  t && (t.dataset.blockType = "liquid-kaching-fix");
}, H = ({
  country: n,
  language: t
}) => {
  const e = [];
  return n && e.push(`country: ${n}`), t && e.push(`language: ${t}`), e.length > 0 ? `@inContext(${e.join(", ")})` : "";
}, Te = async (n, {
  productId: t,
  country: e,
  language: i
}) => {
  var a;
  const r = H({ country: e, language: i });
  return ((a = (await n.query(
    `
      query FetchComplementaryProductGIDs($productGID: ID!) ${r} {
        productRecommendations(productId: $productGID, intent: COMPLEMENTARY) {
          id
        }
      }
    `,
    {
      variables: {
        productGID: `gid://shopify/Product/${t}`
      }
    }
  )).productRecommendations) == null ? void 0 : a.map((s) => s.id)) || [];
}, vt = async (n, t, e = 200) => (t = t.filter(Boolean).filter((i) => !i.startsWith("placeholder")), t.length === 0 ? [] : (await n.query(
  `
      query FetchMediaImages($mediaImageIds: [ID!]!, $size: Int!) {
        nodes(ids: $mediaImageIds) {
          ... on MediaImage {
            id
            image {
              url(transform: { maxWidth: $size, maxHeight: $size })
            }
          }
        }
      }
    `,
  {
    variables: {
      mediaImageIds: t,
      size: e
    }
  }
)).nodes.filter(Boolean).map((i) => ({
  gid: i.id,
  url: i.image.url
}))), Ee = async (n, t) => {
  if (!t.length) return [];
  const e = t.map((i) => `gid://shopify/Product/${i}`);
  return (await n.query(
    `
      query FetchNativeBundleProductIds($productGIDs: [ID!]!) {
        nodes(ids: $productGIDs) {
          ... on Product {
            id
            variants(first: 1) {
              nodes {
                requiresComponents
              }
            }
          }
        }
      }
    `,
    { variables: { productGIDs: e } }
  )).nodes.filter((i) => i !== null).filter(
    (i) => i.variants.nodes.some((r) => r.requiresComponents)
  ).map((i) => Number(i.id.split("/").pop()));
}, wt = async (n, {
  country: t,
  language: e,
  blockVisibility: i,
  excludedProductGIDs: r,
  selectedProductGIDs: a,
  selectedCollectionGIDs: s,
  limit: o = 1e3
}) => {
  switch (i) {
    case "selected-products":
      return a.slice(0, o);
    case "all-products":
    case "excluded-products": {
      const l = H({ country: t, language: e });
      let c = [], d = null;
      for (; c.length < o; ) {
        const p = Math.min(o - c.length, 250), f = await n.query(
          `
            query FetchProductGIDs($limit: Int!, $cursor: String) ${l} {
              products(first: $limit, after: $cursor) {
                nodes {
                  id
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
              limit: p,
              cursor: d
            }
          }
        );
        if (c.push(...f.products.nodes.map((u) => u.id)), !f.products.pageInfo.hasNextPage) break;
        d = f.products.pageInfo.endCursor;
      }
      if (i === "excluded-products") {
        const p = new Set(r);
        c = c.filter((f) => !p.has(f));
      }
      return c;
    }
    case "selected-collections": {
      const l = H({ country: t, language: e }), c = (await n.query(
        `
          query FetchCollectionProductGIDs($collectionGIDs: [ID!]!, $limit: Int!) ${l} {
            nodes(ids: $collectionGIDs) {
              ... on Collection {
                products(first: $limit) {
                  nodes {
                    id
                  }
                }
              }
            }
          }
        `,
        {
          variables: {
            collectionGIDs: s,
            limit: Math.min(o, 250)
          }
        }
      )).nodes.filter((d) => d !== null).flatMap(
        (d) => d.products.nodes.map((p) => p.id)
      );
      return Array.from(new Set(c)).slice(0, o);
    }
  }
}, Xt = `
  id
  availableForSale
  price {
    amount
  }
  compareAtPrice {
    amount
  }
  selectedOptions {
    name
    value
  }
  image {
    id
    url(transform: { maxWidth: 200, maxHeight: 200 })
  }
  unitPriceMeasurement {
    quantityUnit
    quantityValue
    referenceUnit
    referenceValue
  }
  requiresComponents
  sellingPlanAllocations(first: 100) @include(if: $includeSellingPlans) {
    nodes {
      sellingPlan {
        id
      }
      priceAdjustments {
        price {
          amount
        }
        compareAtPrice {
          amount
        }
        perDeliveryPrice {
          amount
        }
      }
    }
  }
  quantityAvailable @include(if: $includeAvailableQuantity)
`, U = async (n, {
  country: t,
  language: e,
  productIds: i,
  includeSellingPlans: r = !0,
  includeAvailableQuantity: a = !0,
  useExternalMetafieldNamespace: s = !1,
  batchSize: o = 250,
  onBatchError: l
}) => {
  if (!i.length)
    return [];
  const c = i.map((_) => typeof _ == "string" && _.startsWith("gid://") ? _ : `gid://shopify/Product/${_}`), d = `
    query FetchProducts($productGIDs: [ID!]!, $includeSellingPlans: Boolean!, $includeAvailableQuantity: Boolean!, $metafieldNamespace: String!) ${H({ country: t, language: e })} {
      nodes(ids: $productGIDs) {
        ... on Product {
          id
          handle
          onlineStoreUrl
          availableForSale
          createdAt
          title
          featuredImage {
            url
          }
          options {
            name
            optionValues {
              id
              name
              swatch {
                color
                image {
                  previewImage {
                    url(transform: { maxWidth: 200, maxHeight: 200 })
                  }
                }
              }
            }
          }
          variants(first: 250) {
            nodes {
              ${Xt}
            }
          }
          collections(first: 50) {
            nodes {
              id
            }
          }
          metafield: metafield(namespace: $metafieldNamespace, key: "text") {
            value
          }
          metafield2: metafield(namespace: $metafieldNamespace, key: "text2") {
            value
          }
          metafield3: metafield(namespace: $metafieldNamespace, key: "text3") {
            value
          }
          metafield4: metafield(namespace: $metafieldNamespace, key: "text4") {
            value
          }
          requiresSellingPlan
          sellingPlanGroups(first: 100) @include(if: $includeSellingPlans) {
            nodes {
              sellingPlans(first: 100) {
                nodes {
                  id
                  name
                  priceAdjustments {
                    adjustmentValue {
                      __typename
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                      ... on SellingPlanFixedAmountPriceAdjustment {
                        adjustmentAmount {
                          amount
                        }
                      }
                      ... on SellingPlanFixedPriceAdjustment {
                        price {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, p = s ? "app--2935586817--kaching_bundles" : "$app:kaching_bundles", f = [], u = Math.min(o, 250);
  for (let _ = 0; _ < c.length; _ += u)
    f.push(c.slice(_, _ + u));
  const h = (_) => n.query(d, {
    variables: {
      productGIDs: _,
      includeSellingPlans: r,
      includeAvailableQuantity: a,
      metafieldNamespace: p
    }
  });
  let y;
  if (l) {
    const _ = await Promise.allSettled(f.map(h));
    for (const C of _)
      C.status === "rejected" && l(
        C.reason instanceof Error ? C.reason : new Error(String(C.reason))
      );
    y = _.filter(
      (C) => C.status === "fulfilled"
    ).flatMap((C) => C.value.nodes);
  } else
    y = (await Promise.all(f.map(h))).flatMap((_) => _.nodes);
  const k = y.filter((_) => _ != null);
  if (l) {
    const _ = await Promise.allSettled(
      k.map(async (g) => {
        const A = await It(
          n,
          g,
          { includeSellingPlans: r, includeAvailableQuantity: a }
        );
        return St(A, n.shopifyDomain);
      })
    ), C = [];
    for (const g of _)
      g.status === "fulfilled" ? C.push(g.value) : l(
        g.reason instanceof Error ? g.reason : new Error(String(g.reason))
      );
    return C;
  }
  return (await Promise.all(
    k.map(
      (_) => It(n, _, {
        includeSellingPlans: r,
        includeAvailableQuantity: a
      })
    )
  )).map(
    (_) => St(_, n.shopifyDomain)
  );
}, It = async (n, t, e) => {
  if (t.variants.nodes.length < 250)
    return t;
  const i = /* @__PURE__ */ new Set(), r = [], a = [], s = async (o) => {
    let l = !0, c = null;
    for (; l; ) {
      const d = await n.query(
        `
          query($productGID: ID!, $cursor: String, $reverse: Boolean, $includeSellingPlans: Boolean!, $includeAvailableQuantity: Boolean!) {
            product(id: $productGID) {
              variants(first: 250, after: $cursor, reverse: $reverse) {
                nodes {
                  ${Xt}
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          }
        `,
        {
          variables: {
            productGID: t.id,
            cursor: c,
            reverse: o,
            ...e
          }
        }
      ), { nodes: p, pageInfo: f } = d.product.variants;
      for (const u of p) {
        if (i.has(u.id)) {
          l = !1;
          break;
        }
        i.add(u.id), o ? a.push(u) : r.push(u);
      }
      f.hasNextPage || (l = !1), c = f.endCursor;
    }
  };
  return await Promise.all([
    s(!1),
    s(!0)
  ]), t.variants.nodes = [...r, ...a.reverse()], t;
}, St = (n, t) => {
  var o, l, c, d, p, f;
  const e = n.variants.nodes.map(
    ({ unitPriceMeasurement: u, ...h }) => {
      var y, k, _;
      return {
        id: Number(h.id.split("/").pop()),
        availableForSale: h.availableForSale,
        price: Math.round(Number(h.price.amount) * 100),
        compareAtPrice: h.compareAtPrice ? Math.round(Number(h.compareAtPrice.amount) * 100) : null,
        options: h.selectedOptions.map((C) => C.value),
        imageId: h.image ? Number(h.image.id.split("/").pop()) : null,
        image: ((y = h.image) == null ? void 0 : y.url) || null,
        sellingPlans: ((k = h.sellingPlanAllocations) == null ? void 0 : k.nodes.map((C) => ({
          id: Number(C.sellingPlan.id.split("/").pop()),
          price: C.priceAdjustments.length > 0 ? Math.round(Number(C.priceAdjustments[0].price.amount) * 100) : Math.round(Number(h.price.amount) * 100),
          compareAtPrice: C.priceAdjustments.length > 0 ? Math.round(
            Number(C.priceAdjustments[0].compareAtPrice.amount) * 100
          ) : Math.round(Number(h.price.amount) * 100),
          perDeliveryPrice: C.priceAdjustments.length > 0 ? Math.round(
            Number(C.priceAdjustments[0].perDeliveryPrice.amount) * 100
          ) : Math.round(Number(h.price.amount) * 100)
        }))) || [],
        inventoryManagement: null,
        // Storefront API does not return inventory management, only available in liquid
        inventoryPolicy: null,
        // Storefront API does not return inventory policy, only available in liquid
        inventoryQuantity: (_ = h.quantityAvailable) != null ? _ : null,
        unitPriceMeasurement: u != null && u.quantityUnit && (u != null && u.referenceUnit) ? {
          quantityValue: u.quantityValue,
          quantityUnit: u.quantityUnit.toLowerCase(),
          referenceValue: u.referenceValue,
          referenceUnit: u.referenceUnit.toLowerCase()
        } : null
      };
    }
  ), i = n.options.map((u, h) => {
    const y = u.optionValues.map((k) => {
      var _, C, g, A;
      return {
        id: Number(k.id.split("/").pop()),
        defaultName: k.name,
        name: k.name,
        swatch: {
          color: ((_ = k.swatch) == null ? void 0 : _.color) || null,
          image: ((A = (g = (C = k.swatch) == null ? void 0 : C.image) == null ? void 0 : g.previewImage) == null ? void 0 : A.url) || null
        }
      };
    });
    return {
      defaultName: u.name,
      name: u.name,
      position: h + 1,
      optionValues: De(y, h, e)
    };
  }), r = (u) => {
    const h = u.priceAdjustments[0];
    if (!h)
      return null;
    const y = h.adjustmentValue;
    switch (y.__typename) {
      case "SellingPlanPercentagePriceAdjustment":
        return {
          type: "percentage",
          value: y.adjustmentPercentage
        };
      case "SellingPlanFixedAmountPriceAdjustment":
        return {
          type: "fixed_amount",
          value: Number(y.adjustmentAmount.amount) * 100
        };
      case "SellingPlanFixedPriceAdjustment":
        return {
          type: "price",
          value: Number(y.price.amount) * 100
        };
      default:
        throw new Error(
          `Unknown price adjustment type: ${y.__typename}`
        );
    }
  }, a = ((o = n.sellingPlanGroups) == null ? void 0 : o.nodes.flatMap(
    (u) => u.sellingPlans.nodes.map((h) => ({
      id: Number(h.id.split("/").pop()),
      name: h.name,
      priceAdjustment: r(h)
    }))
  )) || [], s = n.variants.nodes.some(
    (u) => u.requiresComponents
  );
  return {
    id: Number(n.id.split("/").pop()),
    handle: n.handle,
    url: n.onlineStoreUrl || `https://${t}/products/${n.handle}`,
    availableForSale: n.availableForSale,
    createdAt: n.createdAt,
    title: n.title,
    image: ((l = n.featuredImage) == null ? void 0 : l.url) || null,
    collectionIds: n.collections.nodes.map(
      (u) => Number(u.id.split("/").pop())
    ),
    options: i,
    selectedVariantId: Number(
      n.variants.nodes[0].id.split("/").pop()
    ),
    variants: e,
    requiresSellingPlan: n.requiresSellingPlan,
    sellingPlans: a,
    isNativeBundle: s,
    metafields: {
      text: ((c = n.metafield) == null ? void 0 : c.value) || null,
      text2: ((d = n.metafield2) == null ? void 0 : d.value) || null,
      text3: ((p = n.metafield3) == null ? void 0 : p.value) || null,
      text4: ((f = n.metafield4) == null ? void 0 : f.value) || null
    }
  };
}, De = (n, t, e) => n.filter((i) => e.filter(
  (r) => r.options[t] === i.name
).length > 0), qe = async (n, t, e) => {
  const i = t.map((a) => `gid://shopify/Product/${a}`), r = H({
    country: e == null ? void 0 : e.country,
    language: e == null ? void 0 : e.language
  });
  return (await n.query(
    `
      query FetchProductsInDefaultLanguage($productGIDs: [ID!]!) ${r} {
        nodes(ids: $productGIDs) {
          ... on Product {
            id
            options {
              name
              optionValues {
                id
                name
              }
            }
          }
        }
        localization {
          country {
            isoCode
          }
          language {
            isoCode
          }
        }
      }
    `,
    {
      variables: {
        productGIDs: i
      }
    }
  )).nodes.filter((a) => a != null).map(Fe);
}, Fe = (n) => {
  const t = n.options.map(
    (e, i) => ({
      defaultName: e.name,
      position: i + 1,
      optionValues: e.optionValues.map((r) => ({
        id: Number(r.id.split("/").pop()),
        defaultName: r.name
      }))
    })
  );
  return {
    id: Number(n.id.split("/").pop()),
    options: t
  };
}, Ne = (n, t) => {
  const e = [], i = n.filter(
    (o) => o.blockVisibility === "selected-products"
  );
  for (const o of i)
    o.selectedProductIds.map(Number).includes(t.id) && e.push(o);
  const r = n.filter(
    (o) => o.blockVisibility === "selected-collections"
  );
  for (const o of r)
    t.collectionIds.some(
      (l) => o.selectedCollectionIds.map(Number).includes(l)
    ) && e.push(o);
  const a = n.filter(
    (o) => o.blockVisibility === "excluded-products"
  );
  for (const o of a)
    !o.excludedProductIds.map(Number).includes(t.id) && !(o.excludedCollectionIds || []).some(
      (l) => t.collectionIds.includes(l)
    ) && e.push(o);
  const s = n.filter(
    (o) => o.blockVisibility === "all-products"
  );
  for (const o of s)
    e.push(o);
  return e;
}, Me = (n) => [
  ...Oe(n),
  ...Le(n),
  ...Ve(n),
  ...xe(n),
  ...$e(n),
  ...Ge(n),
  ...Re(n),
  ...He(n),
  ...Qe(n),
  ...ze(n),
  ...Ue(n),
  ...je(n)
].filter((t) => t != null && !t.includes("placeholder")), Oe = (n) => n.dealBars.flatMap((t) => [t.mediaImageGID, t.badgeImageGID]).filter((t) => t != null), Le = (n) => n.dealBars.map(
  ({ freeGifts: t }) => (t || []).map((e) => e.mediaImageGID)
).reduce((t, e) => t.concat(e), []).filter((t) => t != null), Ve = (n) => n.dealBars.flatMap(
  ({ multipleGiftsSelectors: t }) => (t || []).map((e) => e.mediaImageGID)
).filter((t) => t != null), xe = (n) => n.dealBars.map(({ upsells: t }) => (t || []).map((e) => e.mediaImageGID)).reduce((t, e) => t.concat(e), []).filter((t) => t != null), $e = (n) => n.swatchOptions ? n.swatchOptions.reduce((t, e) => {
  const i = e.images.map((r) => r.mediaImageGID).filter((r) => r != null);
  return [...t, ...i];
}, []) : [], Ge = (n) => {
  if (!n.collectionBreaksEnabled || !n.collectionBreaks)
    return [];
  const t = n.collectionBreaks.mediaImageGID;
  return t ? [t] : [];
}, Re = (n) => {
  var t, e, i;
  return n.progressiveGifts ? [
    ...((t = n.progressiveGifts.gifts) == null ? void 0 : t.map((r) => r.mediaImageGID)) || [],
    (e = n.progressiveGifts.style) == null ? void 0 : e.lockedMediaImageGID,
    (i = n.progressiveGifts.dealBarStyle) == null ? void 0 : i.lockedMediaImageGID
  ].filter((r) => r != null) : [];
}, He = (n) => !n.checkboxUpsellsEnabled || !n.checkboxUpsells ? [] : n.checkboxUpsells.upsells.flatMap((t) => [t.mediaImageGID, t.badgeImageGID]).filter((t) => t != null), Qe = (n) => n.dealBars.map((t) => {
  var e;
  return (e = t.productPersonalisation) == null ? void 0 : e.mediaImageGID;
}).filter((t) => t != null), ze = (n) => {
  var i, r;
  const t = n.dealBars.map((a) => {
    var s;
    return (s = a.highlights) == null ? void 0 : s.customIconGID;
  }).filter((a) => a != null), e = (r = (i = n.subscriptions) == null ? void 0 : i.highlights) == null ? void 0 : r.customIconGID;
  return e ? [...t, e] : t;
}, Ue = (n) => (n.badges || []).flatMap(
  (t) => t.badgeType === "custom" && t.imageGID ? [t.imageGID] : []
), je = (n) => !n.savingsSummaryEnabled || !n.savingsSummary ? [] : n.savingsSummary.customIconGID ? [n.savingsSummary.customIconGID] : [];
var tt = /* @__PURE__ */ ((n) => (n.QuantityBreak = "quantity-break", n.Bxgy = "bxgy", n.Bundle = "bundle", n.MixAndMatch = "mix-and-match", n.Sku = "sku", n))(tt || {});
const Je = (n) => {
  const t = [
    ...We(n),
    ...Ke(n),
    ...Xe(n),
    ...Ye(n),
    ...Ze(n),
    ...ti(n),
    ...ei(n),
    ...ii(n)
  ];
  return Array.from(new Set(t.filter((e) => e != null)));
}, We = (n) => n.dealBars.flatMap(
  ({ freeGifts: t }) => t ? t.map((e) => e.productGID) : []
).filter((t) => t != null), Ke = (n) => n.dealBars.flatMap(
  ({ multipleGiftsSelectors: t }) => t ? t.flatMap(
    (e) => e.products ? e.products.map((i) => i.id) : []
  ) : []
).filter((t) => t != null), Xe = (n) => {
  var t;
  return n.progressiveGiftsEnabled ? ((t = n.progressiveGifts) == null ? void 0 : t.gifts.map((e) => e.productGID).filter((e) => e != null)) || [] : [];
}, Ye = (n) => n.dealBars.flatMap(({ upsells: t }) => t ? t.map((e) => e.productGID) : []).filter((t) => t != null), Ze = (n) => n.dealBars.filter((t) => t.dealBarType === tt.Bundle).flatMap(
  ({ bundleProducts: t }) => t ? t.map((e) => e.productGID) : []
).filter((t) => t != null).filter((t) => t !== "default"), ti = (n) => n.dealBars.filter((t) => t.dealBarType === tt.MixAndMatch).flatMap(
  ({ bundleProducts: t }) => t ? t.flatMap((e) => {
    var i, r;
    return [
      e.productGID,
      ...(r = (i = e.selectedProducts) == null ? void 0 : i.map((a) => a.id)) != null ? r : []
    ];
  }) : []
).filter((t) => t != null).filter((t) => t !== "default"), ei = (n) => !n.checkboxUpsellsEnabled || !n.checkboxUpsells ? [] : n.checkboxUpsells.upsells.map((t) => t.productGID).filter((t) => t != null), ii = (n) => n.dealBars.filter((t) => t.dealBarType === tt.Sku).flatMap(({ productGID: t }) => t ? [t] : []), G = "kachingBundlesSaveOverlayDismissed", ni = "bundles.kachingappz.app", ri = () => {
  const n = document.createElement("div");
  return n.className = "kaching-bundles-save-overlay", n.setAttribute("role", "status"), n.setAttribute("tabindex", "0"), n.setAttribute(
    "aria-label",
    "Click Save in the top-right corner to activate the app. Press Escape or Enter to dismiss."
  ), n.innerHTML = `
    <div class="kaching-bundles-save-overlay__content">
      <div class="kaching-bundles-save-overlay__text">Click "Save" in the top-right corner.</div>
      <svg class="kaching-bundles-save-overlay__arrow" aria-hidden="true" width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0235 30.0476C26.9813 26.0688 31.6367 20.3068 34.359 13.6647C34.5787 13.1287 34.7807 12.5866 34.9688 12.0407C34.9872 12.1286 35.0055 12.2166 35.0239 12.3045C35.6997 15.541 36.1871 18.9234 37.35 22.0252C37.7091 22.9828 39.2759 22.7067 39.9528 22.449C40.7647 22.1396 42.0725 21.3396 41.9969 20.292C41.7562 16.9608 40.8171 13.666 40.0928 10.414C39.3726 7.17983 38.6526 3.94569 37.9324 0.711381C37.7809 0.0312821 36.6451 -0.0343474 36.1453 0.0113582C35.3082 0.0879608 34.2573 0.50077 33.6973 1.15893C33.4368 1.46497 33.1749 1.76993 32.9143 2.07579C32.6324 2.30048 32.3929 2.56904 32.2294 2.87801C29.1225 6.52203 26.0063 10.1587 22.8826 13.7888C22.4856 14.2503 22.2166 14.9143 22.9177 15.2375C23.5886 15.5469 24.5829 15.0895 25.0594 14.6178C27.0866 12.6108 29.1155 10.6056 31.1471 8.60291C30.1175 12.9391 28.3489 17.1025 25.7631 20.7229C24.0598 23.1078 21.9 25.3178 19.6649 26.9826C17.264 28.771 14.6378 30.214 11.9792 31.178C10.3347 31.7744 8.62775 32.2461 6.92197 32.6287C5.09815 33.0377 3.24342 33.2486 1.42578 33.6781C0.857063 33.8125 -0.79524 35.2271 0.459136 35.5827C3.73503 36.5115 7.65457 35.7308 10.8601 34.7902C14.4641 33.7324 17.896 32.1362 21.0235 30.0476Z" fill="white"/>
      </svg>
    </div>
  `, n;
}, Pt = (n) => {
  n.classList.add("kaching-bundles-save-overlay--dismissed");
  try {
    sessionStorage.setItem(G, "true");
  } catch {
  }
  setTimeout(() => n.remove(), 300);
}, ai = () => {
  if (sessionStorage.getItem(G))
    return;
  const n = ri();
  document.body.appendChild(n), requestAnimationFrame(() => {
    n.classList.add("kaching-bundles-save-overlay--visible"), n.focus();
  }), n.addEventListener("click", () => Pt(n)), n.addEventListener("keydown", (t) => {
    (t.key === "Escape" || t.key === "Enter") && Pt(n);
  });
}, si = async ({
  appHost: n,
  shopifyDomain: t,
  themeId: e
}) => {
  try {
    if (sessionStorage.getItem(G))
      return !0;
  } catch {
  }
  const i = new URLSearchParams({ shop: t });
  e && i.set("theme_id", e.toString());
  const r = `${n}/public_api/app_embed?${i.toString()}`, a = await fetch(r);
  if (!a.ok)
    throw new Error(`API error: ${a.status}`);
  const s = await a.json();
  if (s.themeInaccessible) {
    try {
      sessionStorage.setItem(G, "true");
    } catch {
    }
    return !0;
  }
  if (s.active)
    try {
      sessionStorage.setItem(G, "true");
    } catch {
    }
  return s.active;
}, oi = async ({
  customApiHost: n,
  shopifyDomain: t,
  themeId: e
}) => {
  const r = `https://${n != null ? n : ni}`;
  try {
    await si({
      appHost: r,
      shopifyDomain: t,
      themeId: e
    }) || ai();
  } catch {
  }
};
function li(n, t, e) {
  var r, a;
  return t ? ((a = (r = window.Shopify.currency) == null ? void 0 : r.active) != null ? a : e) === t.currencyCode ? 1 : 1 / t.currencyRate * n : n;
}
const ci = (n, t) => n && t !== 422;
function At(n) {
  const t = n.properties && typeof n.properties == "object" ? n.properties : {};
  for (const [i, r] of Object.entries(n)) {
    const a = i.match(/^properties\[(.+)\]$/);
    a && (t[a[1]] = r);
  }
  gt(t);
  const e = {
    id: Number(n.id),
    quantity: Number(n.quantity) || 1,
    properties: t
  };
  return n.selling_plan && (e.selling_plan = Number(n.selling_plan)), n.parent_id && (e.parent_id = Number(n.parent_id)), e;
}
function gt(n) {
  const t = n.__kaching_bundles;
  typeof t == "string" && (n.__kaching_bundles = _t(t));
}
function _t(n) {
  try {
    const t = atob(n);
    return JSON.parse(t), t;
  } catch {
    return n;
  }
}
function W(n) {
  try {
    return JSON.parse(n), !1;
  } catch {
    return !0;
  }
}
function K(n) {
  const t = new URLSearchParams(n), e = new FormData();
  return t.forEach((i, r) => {
    e.append(r, i);
  }), e;
}
function di(n) {
  const t = new URLSearchParams();
  return n.forEach((e, i) => {
    t.append(i, e);
  }), t.toString();
}
function ui(n, t) {
  const e = n.find((i) => i.properties.__kaching_bundles);
  if (!e)
    return t;
  try {
    return JSON.parse(e.properties.__kaching_bundles).deal;
  } catch {
    return t;
  }
}
async function ot(n, t) {
  if (!(!n || !t))
    try {
      const e = await fetch(O("cart.js"));
      if (!e.ok) return;
      const i = await e.json(), r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
      for (const o of i.items) {
        const l = lt(o);
        (l == null ? void 0 : l.deal) === n && l.pp === t && (r.add(o.key), l.id && a.add(l.id));
      }
      if (r.size === 0) return;
      for (const o of i.items) {
        const l = lt(o);
        l != null && l.id && a.has(l.id) && r.add(o.key);
      }
      const s = {};
      for (const o of r)
        s[o] = 0;
      await fetch(O("cart/update.js"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: s })
      });
    } catch (e) {
      console.error("removeDealFromCart failed", e);
    }
}
function pi(n) {
  for (const t of n) {
    const e = lt(t);
    if (e != null && e.pp) return e.pp;
  }
}
function lt(n) {
  var e;
  const t = (e = n.properties) == null ? void 0 : e.__kaching_bundles;
  if (typeof t == "string")
    try {
      return JSON.parse(_t(t));
    } catch {
      return;
    }
}
const fi = (n) => {
  var r;
  let t;
  try {
    t = JSON.parse(n);
  } catch {
    return null;
  }
  if (t.key != null || !Array.isArray(t.items)) return null;
  const e = t.items.filter(
    (a) => {
      var s;
      return (s = a.properties) == null ? void 0 : s.__kaching_bundles;
    }
  );
  if (!e.length) return null;
  const i = (r = e.find(hi)) != null ? r : e[0];
  return JSON.stringify({ ...t, ...i });
}, hi = (n) => {
  var e;
  const t = (e = n.properties) == null ? void 0 : e.__kaching_bundles;
  if (typeof t != "string") return !1;
  try {
    return !!JSON.parse(_t(t)).main;
  } catch {
    return !1;
  }
}, mi = (n) => /\/cart\/change(\.js)?(\?|$)/.test(n), gi = (n) => {
  const t = { id: null, line: null, quantity: null };
  if (n == null) return t;
  if (n instanceof FormData || n instanceof URLSearchParams)
    return it(n);
  if (typeof n == "string") {
    if (W(n))
      return it(K(n));
    try {
      const e = JSON.parse(n);
      return {
        id: e.id != null ? String(e.id) : null,
        line: e.line != null ? Number(e.line) : null,
        quantity: e.quantity != null ? Number(e.quantity) : null
      };
    } catch {
      return t;
    }
  }
  return t;
}, it = (n) => {
  const t = n.get("id"), e = n.get("line"), i = n.get("quantity");
  return {
    id: t,
    line: e != null ? Number(e) : null,
    quantity: i != null ? Number(i) : null
  };
}, _i = (n, t) => {
  if (t.line != null && Number.isFinite(t.line)) {
    const e = t.line - 1;
    return e >= 0 && e < n.length ? e : -1;
  }
  if (t.id != null) {
    const e = n.findIndex((r) => r.key === t.id);
    if (e >= 0) return e;
    const i = Number(t.id);
    if (Number.isFinite(i))
      return n.findIndex((r) => r.id === i);
  }
  return -1;
}, bi = (n, t) => {
  var o;
  if (t.quantity == null || !Number.isFinite(t.quantity))
    return { rewrite: !1 };
  let e;
  try {
    e = JSON.parse(n);
  } catch {
    return { rewrite: !1 };
  }
  const i = e == null ? void 0 : e.items;
  if (!Array.isArray(i)) return { rewrite: !1 };
  const r = _i(i, t);
  if (r < 0) return { rewrite: !1 };
  const a = i[r];
  return ((o = a.properties) == null ? void 0 : o.__kaching_bundles) ? a.quantity === t.quantity ? { rewrite: !1 } : (a.quantity = t.quantity, { rewrite: !0, body: JSON.stringify(e) }) : { rewrite: !1 };
};
function X(n) {
  return Array.from(n.keys()).some(
    (e) => e.startsWith("items[")
  ) ? ki(n) : yi(n);
}
function yi(n) {
  const t = n.get("id");
  if (!t)
    return b("intercept_cart_request_error", {
      type: "processing",
      error: "Missing item id in form data",
      body: n
    }), null;
  const e = {};
  n.forEach((s, o) => {
    const l = o.match(/^properties\[(.+)\]$/);
    l && (e[l[1]] = s);
  }), gt(e);
  const i = {
    id: Number(t),
    quantity: Number(n.get("quantity")) || 1,
    properties: e
  }, r = n.get("selling_plan");
  r && (i.selling_plan = Number(r));
  const a = n.get("parent_id");
  return a && (i.parent_id = Number(a)), [i];
}
function ki(n) {
  const t = /* @__PURE__ */ new Map();
  if (n.forEach((i, r) => {
    const a = r.match(/^items\[(\d+)\]\[(.+)\]$/);
    if (!a) return;
    const s = Number(a[1]), o = a[2];
    t.has(s) || t.set(s, { properties: {} });
    const l = t.get(s);
    switch (o) {
      case "id":
        l.id = Number(i);
        break;
      case "quantity":
        l.quantity = Number(i);
        break;
      case "selling_plan":
        l.selling_plan = Number(i);
        break;
      case "parent_id":
        l.parent_id = Number(i);
        break;
      default: {
        const c = o.match(/^properties\]\[(.+)$/);
        c && (l.properties[c[1]] = i);
      }
    }
  }), t.size === 0) return null;
  const e = [];
  for (const [, i] of t) {
    if (!i.id) continue;
    gt(i.properties);
    const r = {
      id: i.id,
      quantity: i.quantity || 1,
      properties: i.properties
    };
    i.selling_plan && (r.selling_plan = i.selling_plan), i.parent_id && (r.parent_id = i.parent_id), e.push(r);
  }
  return e.length > 0 ? e : null;
}
function Bt(n, t) {
  const e = new FormData();
  if (n.forEach((i, r) => {
    Ci(r) || e.append(r, i);
  }), t.length === 1) {
    const i = t[0];
    if (e.append("id", String(i.id)), e.append("quantity", String(i.quantity)), i.selling_plan && e.append("selling_plan", String(i.selling_plan)), i.parent_id && e.append("parent_id", String(i.parent_id)), i.properties)
      for (const [r, a] of Object.entries(i.properties))
        e.append(`properties[${r}]`, Yt(a));
  } else
    t.forEach(
      (i, r) => vi(e, i, r)
    );
  return e;
}
function Ci(n) {
  return ["id", "quantity", "selling_plan", "parent_id"].includes(n) || // Some themes (e.g. Candy) submit both `id` and `id[]` with the same
  // variant id in their product form. Shopify treats `id[]` as a separate
  // add operation, so it must be stripped along with `id` — otherwise the
  // variant gets added a second time (with empty properties) alongside the
  // rewritten `items[N][...]` payload.
  ["id[]", "quantity[]", "selling_plan[]", "parent_id[]"].includes(n) || n.startsWith("properties[") || n.startsWith("items[");
}
function vi(n, t, e) {
  if (n.append(`items[${e}][id]`, String(t.id)), n.append(`items[${e}][quantity]`, String(t.quantity)), t.selling_plan && n.append(`items[${e}][selling_plan]`, String(t.selling_plan)), t.parent_id && n.append(`items[${e}][parent_id]`, String(t.parent_id)), t.properties)
    for (const [i, r] of Object.entries(t.properties))
      n.append(
        `items[${e}][properties][${i}]`,
        Yt(r)
      );
}
function Yt(n) {
  return n instanceof Blob ? n : String(n);
}
function Zt(n) {
  try {
    const t = JSON.parse(n);
    return !t || typeof t != "object" ? (b("intercept_cart_request_error", {
      type: "processing",
      error: "Failed to parse JSON body",
      body: n
    }), null) : Array.isArray(t.items) ? t.items.filter(
      (e) => e && typeof e == "object" && "id" in e
    ).map((e) => At(e)) : t.id ? [At(t)] : null;
  } catch {
    return b("intercept_cart_request_error", {
      type: "processing",
      error: "Failed to parse JSON body",
      body: n
    }), null;
  }
}
function wi(n, t) {
  try {
    const e = JSON.parse(n), i = [
      "id",
      "quantity",
      "selling_plan",
      "parent_id",
      "properties"
    ], r = {};
    for (const [a, s] of Object.entries(e))
      !i.includes(a) && a !== "items" && !a.startsWith("properties[") && (r[a] = s);
    return t.length === 1 ? Object.assign(r, t[0]) : r.items = t, JSON.stringify(r);
  } catch {
    return t.length === 1 ? JSON.stringify(t[0]) : JSON.stringify({ items: t });
  }
}
const Ii = 100, Si = 1500;
class Pi {
  constructor() {
    this._inFlight = /* @__PURE__ */ new Map();
  }
  // Returns a stable key for a bundle add body, or null if this body either
  // isn't a bundle add or isn't a body shape we know how to dedupe. The cheap
  // string check up front means we don't parse (and don't trigger the parse-
  // error telemetry) for normal non-bundle adds.
  buildKey(t) {
    if (!Ai(t)) return null;
    const e = Bi(t);
    return !(e != null && e.length) || !e.some((i) => i.properties.__kaching_bundles) ? null : Ti(e);
  }
  // Runs `send` and remembers the in-flight Response for `key`. If another
  // call comes in with the same key while the first is in flight, or for a
  // short window after it settles, the second call doesn't run — it gets a
  // clone of the first response and `deduped: true`.
  //
  // If the first request errors out, we don't replay the error: we re-enter
  // so this waiter either joins onto a sibling's fresh retry (if one already
  // started) or starts the retry itself. Without re-entering, three concurrent
  // waiters could each fire their own send after a failed first attempt and
  // double the cart all over again — the bug this guard exists to prevent.
  async dispatch(t, e) {
    const i = this._inFlight.get(t);
    if (i)
      try {
        const s = new Promise(
          (l, c) => setTimeout(() => {
            this._inFlight.get(t) === i && this._inFlight.delete(t), c(new Error("stale"));
          }, Si)
        );
        return { response: (await Promise.race([i, s])).clone(), deduped: !0 };
      } catch {
        return this.dispatch(t, e);
      }
    const r = e();
    return this._inFlight.set(t, r), r.then(
      () => {
        setTimeout(() => {
          this._inFlight.get(t) === r && this._inFlight.delete(t);
        }, Ii);
      },
      () => {
        this._inFlight.get(t) === r && this._inFlight.delete(t);
      }
    ), { response: (await r).clone(), deduped: !1 };
  }
}
function Ai(n) {
  if (typeof n == "string")
    return n.includes("__kaching_bundles");
  if (n instanceof FormData) {
    for (const t of n.keys())
      if (t.includes("__kaching_bundles")) return !0;
    return !1;
  }
  return !1;
}
function Bi(n) {
  try {
    return n instanceof FormData ? X(n) : W(n) ? X(K(n)) : Zt(n);
  } catch {
    return null;
  }
}
function Ti(n) {
  const t = n.map((e) => {
    var i;
    return {
      id: e.id,
      quantity: e.quantity,
      sellingPlan: (i = e.selling_plan) != null ? i : null,
      properties: e.properties
    };
  }).sort((e, i) => {
    var s, o;
    if (e.id !== i.id) return e.id - i.id;
    const r = String((s = e.properties.__kaching_bundles) != null ? s : ""), a = String((o = i.properties.__kaching_bundles) != null ? o : "");
    return r.localeCompare(a);
  });
  return JSON.stringify(t);
}
function Ei(n, t, e) {
  n = n.map((l) => ({
    ...l
  }));
  const i = n.find(
    (l) => l.properties.__kaching_bundles
  );
  if (!i && e.fallbackDeal) {
    const l = e.fallbackDeal, c = n.filter(
      (h) => !l.product.variants.some((y) => y.id === h.id) && !t.some((y) => y.id === h.id)
    ), d = n.find(
      (h) => l.product.variants.some((y) => y.id === h.id)
    ), p = d ? Dt(d.properties).custom : {}, f = Et(
      p,
      t,
      e.propagateLineProperties
    );
    return [...t.map(
      (h) => Tt(
        h,
        f,
        p
      )
    ), ...c];
  }
  const r = i ? Dt(i.properties) : { custom: {}, internal: {} }, a = i ? Et(
    r.custom,
    t,
    e.propagateLineProperties
  ) : null;
  if (i) {
    const l = t.find(
      (c) => c.id === i.id && c.properties.__kaching_bundles === i.properties.__kaching_bundles
    );
    l && (i.quantity = l.quantity, l.selling_plan && (i.selling_plan = l.selling_plan), a && (i.properties = {
      ...r.internal,
      ...a.get(l)
    }));
  }
  return [...t.filter(
    (l) => !n.some(
      (c) => c.id === l.id && c.properties.__kaching_bundles === l.properties.__kaching_bundles
    )
  ).map(
    (l) => Tt(
      l,
      a,
      r.custom
    )
  ), ...n];
}
function Tt(n, t, e) {
  if (t)
    return {
      ...n,
      properties: {
        ...t.get(n),
        ...n.properties
      }
    };
  const i = JSON.parse(n.properties.__kaching_bundles);
  return i != null && i.main ? {
    ...n,
    properties: {
      ...e,
      ...n.properties
    }
  } : n;
}
function Et(n, t, e) {
  var l;
  if (!e)
    return null;
  const i = {}, r = /* @__PURE__ */ new Map();
  for (const [c, d] of Object.entries(n)) {
    const p = c.match(/(\d+)\s*$/);
    if (p) {
      const f = parseInt(p[1], 10), u = (l = r.get(f)) != null ? l : {};
      u[c] = d, r.set(f, u);
    } else
      i[c] = d;
  }
  const a = t.reduce(
    (c, d) => c + d.quantity,
    0
  );
  for (const [c, d] of r)
    (c < 1 || c > a) && (Object.assign(i, d), r.delete(c));
  const s = /* @__PURE__ */ new Map();
  let o = 0;
  for (const c of t) {
    const d = { ...i };
    for (const [p, f] of r)
      p > o && p <= o + c.quantity && Object.assign(d, f);
    s.set(c, d), o += c.quantity;
  }
  return s;
}
function Dt(n) {
  const t = {}, e = {};
  for (const [i, r] of Object.entries(n))
    i.startsWith("_kaching") || i.startsWith("__kaching") ? e[i] = r : t[i] = r;
  return { custom: t, internal: e };
}
const qt = /* @__PURE__ */ new WeakMap();
class Di {
  constructor() {
    this._started = !1, this._registeredDeals = /* @__PURE__ */ new Map(), this._fallbackDeal = null, this._fallbackDealTimeout = null, this._rewriteCartChangeEnabled = !1, this._propagateLinePropertiesEnabled = !1, this._cartChangeDetectionReported = !1, this._dedupeEnabled = !0, this._dedupe = new Pi(), this._skipCartDealIds = /* @__PURE__ */ new Set();
  }
  start() {
    this._started || (this._started = !0, this._interceptFetchRequests(), this._interceptXHRRequests(), this._interceptCartFormSubmits(), window.OpusNoATC = !0, m("CartInterceptor started"));
  }
  registerDeal(t, e, i, r) {
    const a = this._registeredDeals.get(t) || [];
    a.push({ getItems: i, product: e }), this._registeredDeals.set(t, a), r && this._skipCartDealIds.add(t), m("CartInterceptor deal registered", {
      dealId: t,
      totalDeals: a.length
    });
  }
  setCartChangeRewriteEnabled(t) {
    this._rewriteCartChangeEnabled = t;
  }
  setDedupeEnabled(t) {
    this._dedupeEnabled = t;
  }
  setPropagateLinePropertiesEnabled(t) {
    this._propagateLinePropertiesEnabled = t;
  }
  setFallbackDeal(t, e) {
    m("CartInterceptor fallback deal set", { dealId: t }), this._fallbackDealTimeout && clearTimeout(this._fallbackDealTimeout), this._fallbackDeal = { dealId: t, product: e }, this._fallbackDealTimeout = window.setTimeout(() => {
      this._fallbackDeal = null, this._fallbackDealTimeout = null;
    }, 2e3);
  }
  _interceptFetchRequests() {
    const t = window.fetch.bind(window);
    window.fetch = async (e, i) => {
      var a;
      const r = qi(e);
      if (!r) return t(e, i);
      if (this._isInterceptableUrl(r)) {
        const s = this._getModifiedBody(r, i == null ? void 0 : i.body), o = s != null ? s : i == null ? void 0 : i.body, l = this._dedupe.buildKey(o), c = () => this._sendInterceptableCartAdd(
          t,
          e,
          i,
          s
        );
        if (l && this._dedupeEnabled) {
          const { response: d, deduped: p } = await this._dedupe.dispatch(
            l,
            c
          );
          return p && b("intercept_cart_request_deduped", {
            theme: (a = window.Shopify.theme) == null ? void 0 : a.schema_name
          }), d;
        }
        return c();
      } else if (mi(r)) {
        const s = await t(e, i);
        return this._maybeRewriteCartChangeResponse(s, i == null ? void 0 : i.body);
      }
      return t(e, i);
    };
  }
  async _sendInterceptableCartAdd(t, e, i, r) {
    var a, s;
    if (!r)
      return t(e, i);
    w("Intercepting cart/add request, merging bundle items"), b(
      "intercept_cart_request",
      {
        type: "fetch",
        theme: (a = window.Shopify.theme) == null ? void 0 : a.schema_name
      },
      0.01
    );
    try {
      const o = await t(e, {
        ...i,
        body: r
      });
      return await this._rewriteCartAddResponse(o);
    } catch (o) {
      return m("Modified request failed, retrying with original", { error: o }), b("intercept_cart_request_error", {
        type: "fetch",
        theme: (s = window.Shopify.theme) == null ? void 0 : s.schema_name,
        error: o instanceof Error ? o.message : String(o)
      }), t(e, i);
    }
  }
  async _rewriteCartAddResponse(t) {
    if (!t.ok) return t;
    try {
      const e = fi(await t.clone().text());
      if (!e) return t;
      const i = new Headers(t.headers);
      return i.delete("content-length"), new Response(e, {
        status: t.status,
        statusText: t.statusText,
        headers: i
      });
    } catch (e) {
      return m("Cart add response rewrite failed, returning original", {
        error: e
      }), t;
    }
  }
  async _maybeRewriteCartChangeResponse(t, e) {
    var a;
    if (!t.ok || !(t.headers.get("content-type") || "").includes("json")) return t;
    const r = gi(e);
    if (r.quantity == null || !this._rewriteCartChangeEnabled && this._cartChangeDetectionReported)
      return t;
    try {
      const o = await t.clone().text(), l = bi(o, r);
      if (!l.rewrite || (this._cartChangeDetectionReported || (this._cartChangeDetectionReported = !0, b("cart_change_rewrite_detected", {
        applied: this._rewriteCartChangeEnabled,
        theme: (a = window.Shopify.theme) == null ? void 0 : a.schema_name
      })), !this._rewriteCartChangeEnabled)) return t;
      const c = new Headers(t.headers);
      return c.delete("content-length"), new Response(l.body, {
        status: t.status,
        statusText: t.statusText,
        headers: c
      });
    } catch (s) {
      return m("Cart change response rewrite failed, returning original", {
        error: s
      }), t;
    }
  }
  _interceptXHRRequests() {
    var o, l, c, d;
    const t = XMLHttpRequest.prototype.open, e = XMLHttpRequest.prototype.send, i = function(p, f, u = !0, h, y) {
      return qt.set(this, f instanceof URL ? f.href : f), t.call(this, p, f, u, h, y);
    }, r = function(p) {
      var u, h;
      const f = qt.get(this);
      if (f) {
        const y = F._getModifiedBody(f, p);
        if (y) {
          w("Intercepting XHR cart/add request, merging bundle items"), b("intercept_cart_request", {
            type: "xhr",
            theme: (u = window.Shopify.theme) == null ? void 0 : u.schema_name
          });
          try {
            return e.call(this, y);
          } catch (k) {
            return m("Modified XHR request failed, retrying with original", {
              error: k
            }), b("intercept_cart_request_error", {
              type: "xhr",
              theme: (h = window.Shopify.theme) == null ? void 0 : h.schema_name,
              error: k instanceof Error ? k.message : String(k)
            }), e.call(this, p);
          }
        }
      }
      return e.call(this, p);
    }, a = Object.getOwnPropertyDescriptor(
      XMLHttpRequest.prototype,
      "open"
    ), s = Object.getOwnPropertyDescriptor(
      XMLHttpRequest.prototype,
      "send"
    );
    if ((a == null ? void 0 : a.configurable) === !1 || (s == null ? void 0 : s.configurable) === !1) {
      m("Cannot intercept XHR - prototype methods are not configurable");
      return;
    }
    Object.defineProperty(XMLHttpRequest.prototype, "open", {
      value: i,
      writable: (o = a == null ? void 0 : a.writable) != null ? o : !0,
      configurable: (l = a == null ? void 0 : a.configurable) != null ? l : !0
    }), Object.defineProperty(XMLHttpRequest.prototype, "send", {
      value: r,
      writable: (c = s == null ? void 0 : s.writable) != null ? c : !0,
      configurable: (d = s == null ? void 0 : s.configurable) != null ? d : !0
    });
  }
  _interceptCartFormSubmits() {
    const t = async (e) => {
      var d, p, f, u;
      if (e.defaultPrevented || this._fallbackDeal && this._skipCartDealIds.has(this._fallbackDeal.dealId) || !(e.target instanceof HTMLFormElement))
        return;
      const i = e.target, r = i.action;
      if (!r.includes("/cart/add"))
        return;
      const a = new FormData(i);
      if (!this._getModifiedBody(r, a))
        return;
      e.preventDefault(), b("intercept_cart_request", {
        type: "form",
        theme: (d = window.Shopify.theme) == null ? void 0 : d.schema_name
      });
      const o = this._parseOriginalItems(a), l = o ? ui(o, (p = this._fallbackDeal) == null ? void 0 : p.dealId) : (f = this._fallbackDeal) == null ? void 0 : f.dealId, c = l ? this._skipCartDealIds.has(l) : !1;
      try {
        c && await ot(l, pi(o != null ? o : []));
        const h = await fetch(r, {
          method: "POST",
          body: a
        });
        if (!h.ok)
          throw new Error(`HTTP ${h.status}`);
        window.location.href = c ? O("checkout") : "/cart";
      } catch (h) {
        m("Fetch request failed, submitting original form", {
          error: h
        }), b("intercept_cart_request_error", {
          type: "form",
          theme: (u = window.Shopify.theme) == null ? void 0 : u.schema_name,
          error: h instanceof Error ? h.message : String(h)
        }), i.submit();
      }
    };
    document.addEventListener("submit", t), setTimeout(() => {
      document.removeEventListener("submit", t), document.addEventListener("submit", t);
    }, 3e3);
  }
  _getModifiedBody(t, e) {
    try {
      if (!this._isInterceptableUrl(t))
        return null;
      if (m("Request body", e), typeof e != "string" && !(e instanceof FormData))
        return b("intercept_cart_request_error", {
          type: "processing",
          error: "Invalid body type"
        }), null;
      const i = this._parseOriginalItems(e);
      if (m("Original items", i), !i)
        return null;
      const r = this._findBundleItems(i);
      if (m("Bundle items", r), !r)
        return null;
      const a = this._mergeItems(i, r);
      if (m("Merged items", a), JSON.stringify(i) === JSON.stringify(a))
        return null;
      const s = this._updateBody(e, a);
      return m("Updated body", s), s;
    } catch (i) {
      return m("CartInterceptor error, falling back to original request", {
        error: i
      }), b("intercept_cart_request_error", {
        type: "processing",
        error: i instanceof Error ? i.message : String(i)
      }), null;
    }
  }
  _isInterceptableUrl(t) {
    return t.includes("cart/add") && !t.includes("kaching_bundles=true") && !t.includes("kaching-cart=true") && !t.includes("kaching_popup=true") && !t.includes("kaching_subscriptions_gift=true");
  }
  _parseOriginalItems(t) {
    if (t instanceof FormData)
      return X(t);
    if (W(t)) {
      const e = K(t);
      return X(e);
    }
    return Zt(t);
  }
  _findBundleItems(t) {
    var s, o;
    const e = t.find(
      (l) => l.properties.__kaching_bundles
    ), i = e ? JSON.parse(e.properties.__kaching_bundles).deal : (s = this._fallbackDeal) == null ? void 0 : s.dealId;
    if (!i)
      return null;
    const r = this._fallbackDeal;
    if (!e && r) {
      if (!t.some(
        (c) => r.product.variants.some((d) => d.id === c.id)
      ))
        return null;
      b("fallback_deal_used", {
        theme: (o = window.Shopify.theme) == null ? void 0 : o.schema_name
      });
    }
    const a = this._registeredDeals.get(i);
    if (!(a != null && a.length))
      return m("No registered deals found", { dealId: i }), null;
    for (const { getItems: l, product: c } of a) {
      const d = l();
      if (e ? d.some(
        (f) => t.some(
          (u) => u.id === f.id && u.properties.__kaching_bundles === f.properties.__kaching_bundles
        )
      ) : d.length > 0 && c.id === (r == null ? void 0 : r.product.id)) return d;
    }
    return m("No matching items found for deal", { dealId: i }), null;
  }
  _mergeItems(t, e) {
    return Ei(t, e, {
      fallbackDeal: this._fallbackDeal,
      propagateLineProperties: this._propagateLinePropertiesEnabled
    });
  }
  _updateBody(t, e) {
    if (t instanceof FormData)
      return Bt(t, e);
    if (W(t)) {
      const i = K(t), r = Bt(i, e);
      return di(r);
    }
    return wi(t, e);
  }
}
const qi = (n) => typeof n == "string" ? n : n instanceof URL ? n.href : n && typeof n == "object" && "url" in n ? n.url : null, F = new Di();
function Fi(n, t) {
  var e;
  if ((n == null ? void 0 : n.dealBarType) === rt.Sku && n.productGID)
    return M(n.productGID);
  if ((n == null ? void 0 : n.dealBarType) === rt.Bundle && n.bundleProducts) {
    const i = n.bundleProducts.some(
      (a) => a.productGID === "default"
    ), r = (e = n.bundleProducts[0]) == null ? void 0 : e.productGID;
    if (!i && r)
      return M(r);
  }
  return t;
}
const Ft = /* @__PURE__ */ new WeakSet();
function Ni(n, t) {
  var o;
  if (Ft.has(n)) return;
  Ft.add(n);
  const e = (o = n.closest("main")) != null ? o : document.body;
  let i = n.getAttribute("selling-plan-id") || void 0;
  const r = () => {
    let l = n;
    for (; l; ) {
      const c = B(
        'input[name="selling_plan"]:checked',
        l
      );
      if (c) return c.value || void 0;
      const d = B(
        'input[name="selling_plan"]',
        l
      );
      if (d) return d.value || void 0;
      if (l === e) break;
      l = l.parentElement;
    }
  }, a = (l) => {
    i !== l && (i = l, m("observeExternalSellingPlanInput", l), S(n, "selling-plan-id", l != null ? l : ""));
  };
  a(r()), D(e, "change", (l) => {
    const c = l.target;
    (c == null ? void 0 : c.name) === "selling_plan" && a(r());
  }), new MutationObserver(() => {
    a(r());
  }).observe(e, {
    childList: !0,
    subtree: !0
  });
}
function Nt(n, t) {
  var e;
  if (n.featuredImages && n.featuredImages.length > 0)
    return (e = n.featuredImages.find(
      (i) => M(i.productGID) === t
    )) == null ? void 0 : e.mediaGID;
  if (n.featuredMediaGID && !(n.featuredProductGID && M(n.featuredProductGID) !== t))
    return n.featuredMediaGID;
}
const Mi = (n, t, e) => {
  te(String(M(n)), {
    activatedGalleries: /* @__PURE__ */ new Set(),
    clickedControls: /* @__PURE__ */ new Set(),
    pendingScrollTargets: [],
    galleryOwner: e,
    imageUrl: t
  });
}, Oi = (n) => {
  const t = Hi(n), e = document.querySelector("[data-media-id]");
  if (!e)
    return;
  const i = e.getAttribute("data-media-id");
  te(
    i.slice(i.lastIndexOf("-") + 1),
    {
      activatedGalleries: t,
      clickedControls: /* @__PURE__ */ new Set(),
      pendingScrollTargets: [],
      galleryOwner: n
    }
  );
}, te = (n, t) => {
  var e;
  try {
    const i = Ki(n), { activatedGalleries: r, imageUrl: a } = t;
    if (i.length === 0) {
      if (Wi(n, r) || a && Qi(a, t))
        return;
      m("activateGalleryMedia: no media element matched", n);
      return;
    }
    const s = i.filter(
      (p) => p.matches("button[data-action='select'][data-media-id]")
    ), o = i.filter(
      (p) => !p.matches("button[data-action='select'][data-media-id]")
    ), l = o.filter(V), c = s.filter(V), d = l.length ? l : c.length ? c : [(e = o[0]) != null ? e : i[0]];
    for (const p of d)
      Li(p, n, t);
    ee(t);
  } catch (i) {
    console.error(i);
  }
}, Li = (n, t, e) => {
  const { activatedGalleries: i, clickedControls: r, pendingScrollTargets: a } = e, s = n.getAttribute("data-media-id"), o = s !== t, l = n.closest(ne);
  if (l && Gi(l, t, i))
    return;
  const c = n.closest(
    "media-gallery"
  );
  if (!l && o && c && typeof c.setActiveMedia == "function") {
    i.has(c) || (i.add(c), c.setActiveMedia(s, !1));
    return;
  }
  const d = n.closest(
    "slideshow-component"
  );
  if (d && typeof d.select == "function") {
    const u = n.closest("slideshow-slide");
    if (u) {
      if (!i.has(d)) {
        i.add(d);
        const h = Array.from(
          d.querySelectorAll("slideshow-slide")
        );
        d.select(h.indexOf(u));
      }
      return;
    }
  }
  if (zi(n, t, i) || Ui(n, t, i) || Ji(n, t, i) || Ri(n, t, i) || ji(n, t, i) || bt(n, i) || re(n, e))
    return;
  const p = Xi(t);
  for (const u of p)
    if (!r.has(u)) {
      r.add(u), Y(u, i), u.click();
      return;
    }
  const f = ie(n);
  if (f) {
    r.has(f) || (r.add(f), Y(f, i), f.click());
    return;
  }
  a.push(n);
}, ee = ({
  pendingScrollTargets: n,
  activatedGalleries: t
}) => {
  for (const e of n)
    bt(e, t) || (Y(e, t), e.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    }));
}, Mt = "button, [role='button'], a[href^='#']", Vi = /zoom|lightbox|photoswipe|pswp|fullscreen|modal|dialog/i, xi = (n) => Vi.test(n.className + "") || n.closest(
  "modal-opener, gallery-zoom-open, zoom-dialog, [aria-haspopup='dialog']"
) !== null, ie = (n) => {
  var i;
  const t = getComputedStyle(n).cursor === "pointer" && !n.closest("a[href]:not([href^='#'])");
  return (i = [
    n.closest(Mt),
    ...Array.from(
      n.querySelectorAll(Mt)
    ),
    t ? n : null
  ].filter((r) => r !== null).find((r) => !xi(r))) != null ? i : null;
}, Y = (n, t) => {
  const e = n.closest(
    ".shopify-section, section, [id^='shopify-section']"
  );
  e && t.add(e);
}, bt = (n, t) => {
  let e = n;
  for (; e; ) {
    if (t.has(e))
      return !0;
    e = e.parentElement;
  }
  return !1;
}, ne = "media-gallery.m-media-gallery[data-context='product']", $i = ".m-media-gallery__list > .m-product-media--item[data-media-id][data-index]:not(.swiper-slide-duplicate)", Gi = (n, t, e) => {
  var o;
  if (e.has(n))
    return !0;
  const i = Array.from(
    n.querySelectorAll($i)
  ).find(
    (l) => l.closest(ne) === n && l.getAttribute("data-media-id") === t
  ), r = (o = i == null ? void 0 : i.getAttribute("data-index")) == null ? void 0 : o.trim(), a = r ? Number(r) : Number.NaN, s = a + 1;
  return !Number.isSafeInteger(a) || a < 0 || !Number.isSafeInteger(s) || typeof n.setActiveMedia != "function" ? !1 : (e.add(n), n.setActiveMedia({
    featured_media: { id: Number(t), position: s }
  }), !0);
}, Ot = "swiper-slider-container.swiper-slider__product-page__mobile", Ri = (n, t, e) => {
  var s;
  const i = n.closest(Ot), r = (s = i == null ? void 0 : i.parentElement) == null ? void 0 : s.closest(
    ".product--thumbnail_slider__mobile"
  );
  return !i || !r ? !1 : e.has(i) ? !0 : !Array.from(
    i.querySelectorAll("swiper-slider [data-media-id]")
  ).some(
    (o) => o.closest(Ot) === i && o.getAttribute("data-media-id") === t
  ) || typeof i.changeSlide != "function" ? !1 : (e.add(i), i.changeSlide(t), !0);
}, Z = /* @__PURE__ */ new Map(), re = (n, { activatedGalleries: t, galleryOwner: e }) => {
  const i = n.closest(".swiper-slide"), r = n.closest(".swiper"), a = r == null ? void 0 : r.swiper;
  if (!i || !r || !a || typeof a.slideTo != "function")
    return !1;
  if (t.has(r))
    return !0;
  const s = i.getAttribute("data-swiper-slide-index"), o = s ? Number(s) : Number.NaN;
  if (Number.isSafeInteger(o) && o >= 0)
    return typeof a.slideToLoop != "function" ? !1 : (Lt(r, a, e), t.add(r), a.slideToLoop(o), !0);
  const c = Array.from(
    r.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)")
  ).indexOf(i);
  return c < 0 ? !1 : (Lt(r, a, e), t.add(r), a.slideTo(c), !0);
}, Lt = (n, t, e) => {
  var i, r;
  Z.has(n) || Z.set(n, {
    initialIndex: (r = (i = t.realIndex) != null ? i : t.activeIndex) != null ? r : 0,
    owner: e
  });
}, Hi = (n) => {
  var e;
  const t = /* @__PURE__ */ new Set();
  for (const [i, { initialIndex: r, owner: a }] of Z) {
    if (a !== n || (Z.delete(i), !i.isConnected))
      continue;
    const s = i.swiper;
    if (s) {
      try {
        typeof s.slideToLoop == "function" ? s.slideToLoop(r) : (e = s.slideTo) == null || e.call(s, r);
      } catch (o) {
        console.error(o);
        continue;
      }
      t.add(i);
    }
  }
  return t;
}, Qi = (n, t) => {
  const { activatedGalleries: e, clickedControls: i, pendingScrollTargets: r } = t, a = Vt(n);
  if (!a)
    return !1;
  const s = [];
  for (const c of Array.from(document.images)) {
    if (Vt(c.currentSrc || c.src) !== a)
      continue;
    const d = c.closest(
      ".swiper-slide, [data-position], li, figure"
    ) || c;
    s.includes(d) || s.push(d);
  }
  if (s.length === 0)
    return !1;
  const o = s.filter(V), l = o.length ? o : [s[0]];
  for (const c of l) {
    if (bt(c, e) || re(c, t))
      continue;
    const d = ie(c);
    if (d) {
      i.has(d) || (i.add(d), Y(d, e), d.click());
      continue;
    }
    r.push(c);
  }
  return ee(t), !0;
}, Vt = (n) => {
  if (!n)
    return null;
  const t = n.split(/[?#]/)[0], e = t.slice(t.lastIndexOf("/") + 1);
  return e ? decodeURIComponent(e).replace(/_\d+x\d*(?=\.[a-z]+$)/i, "").toLowerCase() : null;
}, zi = (n, t, e) => {
  var l;
  const i = n.closest(
    "[data-product-single-media-slider].flickity-enabled"
  );
  if (!i)
    return !1;
  if (e.has(i))
    return !0;
  const a = Array.from(
    i.querySelectorAll("[data-product-slide]")
  ).findIndex(
    (c) => [c.getAttribute("data-id"), c.getAttribute("data-media-id")].some(
      (d) => d === t || (d == null ? void 0 : d.endsWith(`-${t}`))
    )
  ), s = (l = window.theme) == null ? void 0 : l.Flickity;
  if (a < 0 || !s || typeof s.data != "function")
    return !1;
  const o = s.data(i);
  return !o || typeof o.select != "function" ? !1 : (e.add(i), o.select(a), !0);
}, Ui = (n, t, e) => {
  const i = n.closest(
    "[data-product-slideshow].flickity-enabled"
  );
  return i ? (e.has(i) || (e.add(i), i.dispatchEvent(
    new CustomEvent("theme:image:change", { detail: { id: t } })
  )), !0) : !1;
}, ji = (n, t, e) => {
  var l, c;
  const i = n.closest(
    "[data-product-photos].flickity-enabled"
  );
  if (!i)
    return !1;
  if (e.has(i))
    return !0;
  const a = Array.from(
    i.querySelectorAll("[data-media-id]")
  ).findIndex((d) => {
    const p = d.getAttribute("data-media-id");
    return p === t || (p == null ? void 0 : p.endsWith(`-${t}`));
  }), s = (c = (l = window.theme) == null ? void 0 : l.Flickity) != null ? c : window.Flickity;
  if (a < 0 || typeof (s == null ? void 0 : s.data) != "function")
    return !1;
  const o = s.data(i);
  return !o || typeof o.select != "function" ? !1 : (e.add(i), o.select(a), !0);
}, yt = "[data-section-type='product'][data-product-id]", ae = (n) => `a.product__thumb[data-product-thumb][data-id='${n}'][data-index]`, se = (n, t, e) => e.has(n) ? !0 : Array.from(
  n.querySelectorAll(ae(t))
).some(
  (r) => r.closest(yt) === n
) ? (e.add(n), n.dispatchEvent(
  new CustomEvent("variantImageChange", {
    detail: {
      variant: {
        featured_media: {
          id: Number(t),
          preview_image: { src: null }
        }
      }
    }
  })
), !0) : !1, Ji = (n, t, e) => {
  if (!n.matches(".product-main-slide[data-media-id]"))
    return !1;
  const i = n.closest(yt);
  return i ? se(i, t, e) : !1;
}, Wi = (n, t) => {
  const e = [], i = document.querySelectorAll(
    ae(n)
  );
  for (const o of i) {
    const l = o.closest(yt);
    l && !e.includes(l) && e.push(l);
  }
  const r = e.filter(V), a = r.length ? r : e.slice(0, 1);
  let s = !1;
  for (const o of a)
    s = se(o, n, t) || s;
  return s;
}, Ki = (n) => {
  const t = document.querySelectorAll("[data-media-id]"), e = [];
  for (const i of t) {
    const r = i.getAttribute("data-media-id");
    (r === n || r.endsWith(`-${n}`)) && e.push(i);
  }
  return e;
}, Xi = (n) => {
  const t = Array.from(
    document.querySelectorAll(
      `button[data-target$="-${n}"], button[data-action='select'][data-media-id='${n}'], button[data-action='select'][data-media-id$='-${n}']`
    )
  ), e = t.filter(V), i = t.filter(
    (r) => !V(r)
  );
  return [...e, ...i];
}, V = (n) => {
  if (typeof n.checkVisibility == "function")
    return n.checkVisibility({ checkVisibilityCSS: !0 });
  let t = n;
  for (; t; ) {
    const e = getComputedStyle(t);
    if (e.display === "none" || e.visibility === "hidden")
      return !1;
    t = t.parentElement;
  }
  return !0;
};
function Yi(n) {
  const t = n.map((i) => ({
    item: i,
    kachingBundles: Zi(i)
  })), e = new Set(
    t.filter(({ kachingBundles: i }) => xt(i)).map(({ item: i }) => i.id)
  );
  return t.reduce((i, { item: r, kachingBundles: a }) => xt(a) || a.collectionBreaksProduct && !a.bxgy && e.has(r.id) ? i + r.quantity : i, 0);
}
function xt(n) {
  return n ? n.main || !1 : !0;
}
function Zi(n) {
  return n.properties.__kaching_bundles ? JSON.parse(n.properties.__kaching_bundles) : null;
}
const j = async (n, t, e, i) => {
  var l;
  if (!t || e.length === 0) return;
  const r = tn(i);
  if (r.length === 0) return;
  const a = e.map((c) => c.id), s = (l = r.find((c) => c.localization)) == null ? void 0 : l.localization, o = new q(
    n,
    t
  );
  try {
    const c = await qe(
      o,
      a,
      s
    );
    for (const d of e) {
      const p = c.find(
        (f) => f.id === d.id
      );
      p && en(d, p);
    }
  } catch (c) {
    console.error("[Kaching Bundles] Failed to fetch swatches", c), setTimeout(() => {
      throw c;
    }, 0);
  }
}, tn = (n) => n.map((e) => e.swatchOptions || []).reduce((e, i) => e.concat(i), []).filter((e) => e != null).filter((e) => e.swatchType !== "default"), en = (n, t) => {
  for (const e of t.options) {
    const i = n.options.find(
      (r) => r.position === e.position
    );
    if (i) {
      i.defaultName = e.defaultName;
      for (const r of e.optionValues) {
        const a = i.optionValues.find(
          (s) => s.id === r.id
        );
        a && (a.defaultName = r.defaultName);
      }
    }
  }
}, $t = window;
class nn {
  constructor(t, e, i, r, a, s, o) {
    var l, c, d, p;
    if (this._featuredImageActivated = !1, this._featuredMediaImageUrls = /* @__PURE__ */ new Map(), this._featuredImageSelectionSequence = 0, this._items = [], this._clickedAddToCartBeforeFormSubmit = !1, this._isFirstVariantChange = !0, w("Deal block id:", a.id), w("Deal block settings", a), w("Config", i), w("Product", s), w("Deal block widget", { widget: t }), w("Cart form", { form: (l = e.addToCartForm()) == null ? void 0 : l.form }), w("Add to cart button", {
      button: (c = e.addToCartButton()) == null ? void 0 : c.button
    }), w("Quantity input", { input: e.quantityInput() }), w("Variant picker", {
      picker: (d = e.variantPicker()) == null ? void 0 : d.elements()
    }), this._dealBlockElement = t, this._productBlock = e, this._globalConfig = i, this._translations = r, this._dealBlockSettings = a, this._product = s, this._otherProductsFromLiquid = o, this._country = this._globalConfig.country, this._language = this._globalConfig.locale.split("-")[0].toUpperCase(), this._globalConfig.featureFlags.initialize_with_form_variant) {
      let f = this._product.selectedVariantId || this._product.variants[0].id;
      const u = (p = this._productBlock.addToCartForm()) == null ? void 0 : p.currentVariantId();
      u && this._product.variants.some((h) => h.id == u) && (f = u), this._currentVariantId = f;
    } else
      this._currentVariantId = this._product.selectedVariantId || this._product.variants[0].id;
    this._initialize();
  }
  _initialize() {
    S(
      this._dealBlockElement,
      "deal-block-id",
      this._dealBlockSettings.id
    ), S(
      this._dealBlockElement,
      "config",
      JSON.stringify(this._globalConfig)
    ), S(
      this._dealBlockElement,
      "translations",
      JSON.stringify(this._translations)
    ), S(
      this._dealBlockElement,
      "deal-block",
      JSON.stringify(this._dealBlockSettings)
    ), S(
      this._dealBlockElement,
      "product",
      JSON.stringify(this._product)
    ), S(
      this._dealBlockElement,
      "current-variant-id",
      String(this._currentVariantId)
    ), S(
      this._dealBlockElement,
      "other-products",
      JSON.stringify(this._otherProductsFromLiquid)
    ), this._loadMediaImagesAsync(), this._loadOtherProductsAsync(), this._loadCollectionBreaksProductsAsync(), this._loadComplementaryProductsAsync(), this._loadNativeBundleProductIdsAsync(), this._listenForExternalSellingPlanInput();
    const t = !!this._productBlock.addToCartForm(), e = !t && this._globalConfig.featureFlags.intercept_cart_request === !0 && !!this._globalConfig.customSelectors.addToCartButton;
    !t && !e || this._addEventListeners(e);
  }
  async _loadMediaImagesAsync() {
    if (!this._globalConfig.storefrontAccessToken)
      return;
    const t = new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    ), e = Me(this._dealBlockSettings), i = await vt(t, e, 300);
    S(
      this._dealBlockElement,
      "media-images",
      JSON.stringify(i)
    );
  }
  async _loadOtherProductsAsync() {
    if (!this._globalConfig.storefrontAccessToken)
      return;
    const t = Je(this._dealBlockSettings);
    if (!t.length)
      return;
    const e = new Set(
      this._otherProductsFromLiquid.map((o) => o.id)
    ), i = t.filter(
      (o) => !e.has(M(o))
    ), r = new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    ), a = i.length ? await U(r, {
      country: this._country,
      language: this._language,
      productIds: i,
      includeSellingPlans: this._globalConfig.includeSellingPlans,
      includeAvailableQuantity: this._globalConfig.includeAvailableQuantity,
      useExternalMetafieldNamespace: !1
    }) : [], s = [...this._otherProductsFromLiquid, ...a];
    await j(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken,
      s,
      [this._dealBlockSettings]
    ), S(
      this._dealBlockElement,
      "other-products",
      JSON.stringify(s)
    );
  }
  async _loadCollectionBreaksProductsAsync() {
    if (!this._globalConfig.storefrontAccessToken)
      return;
    const { collectionBreaksEnabled: t, collectionBreaks: e } = this._dealBlockSettings;
    if (!t || !e)
      return;
    const i = new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    );
    let r;
    e.visibility === "deal-products" ? r = await wt(i, {
      country: this._country,
      language: this._language,
      blockVisibility: this._dealBlockSettings.blockVisibility,
      excludedProductGIDs: (this._dealBlockSettings.excludedProductIds || []).map((s) => `gid://shopify/Product/${s}`),
      selectedProductGIDs: (this._dealBlockSettings.selectedProductIds || []).map((s) => `gid://shopify/Product/${s}`),
      selectedCollectionGIDs: (this._dealBlockSettings.selectedCollectionIds || []).map((s) => `gid://shopify/Collection/${s}`)
    }) : r = await wt(i, {
      country: this._country,
      language: this._language,
      blockVisibility: e.visibility,
      excludedProductGIDs: (e.excludedProducts || []).map(
        ({ id: s }) => s
      ),
      selectedProductGIDs: (e.selectedProducts || []).map(
        ({ id: s }) => s
      ),
      selectedCollectionGIDs: (e.selectedCollections || []).map(({ id: s }) => s)
    });
    let a = await U(i, {
      country: this._country,
      language: this._language,
      productIds: r.map((s) => Number(s.split("/").pop())),
      includeSellingPlans: this._globalConfig.includeSellingPlans,
      includeAvailableQuantity: this._globalConfig.includeAvailableQuantity,
      useExternalMetafieldNamespace: !1,
      batchSize: 20,
      onBatchError: (s) => {
        var o;
        return fe(s.message, (o = s.stack) != null ? o : "", 1);
      }
    });
    a = a.filter(
      (s) => s.availableForSale
    ), a.sort((s, o) => s.id === this._product.id ? -1 : o.id === this._product.id ? 1 : 0), await j(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken,
      a,
      [this._dealBlockSettings]
    ), S(
      this._dealBlockElement,
      "collection-breaks-products",
      JSON.stringify(a)
    ), setTimeout(() => {
      this._preloadImages(a);
    }, 1e3);
  }
  async _loadComplementaryProductsAsync() {
    var a, s;
    if (!(this._dealBlockSettings.dealBars.some(
      (o) => {
        var l;
        return (l = o.upsells) == null ? void 0 : l.some(
          (c) => c.productSource === "complementary"
        );
      }
    ) || ((s = (a = this._dealBlockSettings.checkboxUpsells) == null ? void 0 : a.upsells) == null ? void 0 : s.some(
      (o) => o.productSource === "complementary"
    ))) || !this._globalConfig.storefrontAccessToken)
      return;
    const e = new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    ), i = await Te(
      e,
      {
        country: this._country,
        language: this._language,
        productId: this._product.id
      }
    );
    if (!i.length)
      return;
    let r = await U(e, {
      country: this._country,
      language: this._language,
      productIds: i.map(
        (o) => Number(o.split("/").pop())
      ),
      includeSellingPlans: this._globalConfig.includeSellingPlans,
      includeAvailableQuantity: this._globalConfig.includeAvailableQuantity,
      useExternalMetafieldNamespace: !1
    });
    r = r.filter(
      (o) => o.availableForSale
    ), await j(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken,
      r,
      [this._dealBlockSettings]
    ), S(
      this._dealBlockElement,
      "complementary-products",
      JSON.stringify(r)
    );
  }
  async _loadNativeBundleProductIdsAsync() {
    if (!this._globalConfig.storefrontAccessToken)
      return;
    const t = [
      this._product,
      ...this._otherProductsFromLiquid
    ].filter((r) => r.isNativeBundle === null);
    if (t.length === 0)
      return;
    const e = new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    ), i = await Ee(
      e,
      t.map((r) => r.id)
    );
    i.length > 0 && S(
      this._dealBlockElement,
      "native-bundle-product-ids",
      JSON.stringify(i)
    );
  }
  _preloadImages(t) {
    for (const e of t) {
      const i = e.variants[0].image || e.image;
      if (i) {
        const r = new Image();
        r.src = i;
      }
    }
  }
  _addEventListeners(t) {
    if (this._listenForVariantUrlChange(), this._listenForQuantityInputChange(), this._listenForBlockVariantSelect(), this._listenForBlockDealBarSelect(), this._listenForBlockDealBarFeaturedImage(), this._listenForBlockItemsChange(), this._listenForBlockAddToCartRequested(), t || (this._listenForFormVariantIdChange(), this._listenForFormSellingPlanChange()), this._listenForAmountDiscountExceedsPrice(), this._listenForUpsellSubscriptionInherited(), !window.kachingBundlesDisableAddToCartHandling) {
      if (this._globalConfig.featureFlags.intercept_cart_request) {
        F.setCartChangeRewriteEnabled(
          this._globalConfig.featureFlags.cart_change_response_rewrite === !0
        ), F.setDedupeEnabled(
          this._globalConfig.featureFlags.cart_interceptor_dedupe_disabled !== !0
        ), F.setPropagateLinePropertiesEnabled(
          this._globalConfig.featureFlags.propagate_line_properties === !0
        ), F.start();
        const e = this._dealBlockSettings.nanoId || this._dealBlockSettings.id;
        F.registerDeal(
          e,
          this._product,
          () => this._items,
          this._dealBlockSettings.skipCart === !0
        );
      }
      this._listenForAddToCartClick();
    }
  }
  _listenForBlockAddToCartRequested() {
    D(
      this._dealBlockElement,
      "add-to-cart-requested",
      async (t) => {
        var r, a;
        const e = (r = t.detail) == null ? void 0 : r.items;
        if (!(e != null && e.length))
          return;
        m("add-to-cart-requested", e);
        const i = (a = this._productBlock.addToCartButton()) == null ? void 0 : a.button;
        if (i) {
          this._overrideItemsForNextAddToCart = e, i.click();
          return;
        }
        await ot(
          this._dealBlockSettings.nanoId || this._dealBlockSettings.id,
          this._product.id
        ), await this._makeAddToCartRequest({ items: e }), window.location.href = O("checkout");
      }
    );
  }
  /* Native variant change handling */
  _listenForVariantUrlChange() {
    pe(), D($t, "locationchange", () => {
      const e = new URLSearchParams($t.location.search).get("variant");
      e && (m("listenForVariantUrlChange", e), this._handleNativeVariantChange(Number(e)));
    });
  }
  _listenForFormVariantIdChange() {
    const t = this._productBlock.addToCartForm();
    t && t.onVariantIdChange((e) => {
      m("listenForFormVariantIdChange", e), this._handleNativeVariantChange(e);
    });
  }
  _handleNativeVariantChange(t) {
    if (m("handleNativeVariantChange", {
      variantId: t,
      currentVariantId: this._currentVariantId
    }), t != this._currentVariantId && this._product.variants.find((e) => e.id == t)) {
      if (this._globalConfig.featureFlags.remove_variant_change_delay ? window.kachingBundlesCurrentVariantChangeInProgress || (this._currentVariantId = t) : this._currentVariantId = t, this._globalConfig.featureFlags.remove_variant_change_delay) {
        if (window.kachingBundlesCurrentVariantChangeInProgress) {
          m("handleNativeVariantChange", "skipping");
          return;
        }
      } else if (this._dealBlockElement.dataset.nativeVariantChangeInProgress || window.kachingBundlesCurrentVariantChangeInProgress) {
        m("handleNativeVariantChange", "skipping");
        return;
      }
      this._dealBlockElement.dataset.nativeVariantChangeInProgress = "true", setTimeout(
        () => {
          delete this._dealBlockElement.dataset.nativeVariantChangeInProgress;
        },
        this._globalConfig.featureFlags.remove_variant_change_delay ? 1e3 : 500
      ), S(
        this._dealBlockElement,
        "current-variant-id",
        String(t)
      );
    }
  }
  _listenForFormSellingPlanChange() {
    if (!this._globalConfig.featureFlags.observe_form_selling_plan)
      return;
    const t = this._productBlock.addToCartForm();
    if (t) {
      try {
        !!B(
          'input[name="selling_plan"][type="radio"]',
          t.form
        ) && b("selling_plan_radio_detected", {
          dealBlockId: this._dealBlockSettings.id,
          productId: this._product.id
        });
      } catch {
      }
      t.onSellingPlanChange((e) => {
        m("listenForFormSellingPlanChange", e), S(
          this._dealBlockElement,
          "selling-plan-id",
          e ? String(e) : ""
        );
      });
    }
  }
  _listenForExternalSellingPlanInput() {
    this._globalConfig.featureFlags.observe_external_selling_plan && (this._productBlock.addToCartForm() || Ni(this._dealBlockElement));
  }
  /* Native quantity input */
  _listenForQuantityInputChange() {
    this._productBlock.onQuantityInputChange((t) => {
      if (m("_listenForQuantityInputChange", t), !window.kachingBundlesQuantityChangeInProgress) {
        if (!this._globalConfig.keepQuantityInput || window.kachingBundlesCurrentVariantChangeInProgress || this._dealBlockElement.dataset.nativeVariantChangeInProgress) {
          this._changeQuantityInput();
          return;
        }
        this._globalConfig.keepQuantityInput && S(this._dealBlockElement, "quantity", String(t));
      }
    });
  }
  _changeQuantityInput() {
    const t = this._productBlock.quantityInput();
    !t || this._items.length === 0 || window.kachingBundlesDisableAddToCartHandling && !this._globalConfig.keepQuantityInput || this._setQuantityInputValue(t, Yi(this._items));
  }
  _setQuantityInputValue(t, e) {
    window.kachingBundlesQuantityChangeInProgress = !0, m("_setQuantityInputValue", e), t.value = String(e), this._globalConfig.shopifyDomain === "119a01-bf.myshopify.com" && t.dispatchEvent(new Event("input", { bubbles: !0 })), t.dispatchEvent(new Event("change", { bubbles: !0 })), setTimeout(() => {
      delete window.kachingBundlesQuantityChangeInProgress;
    }, 100);
  }
  /* Block variants change handling */
  _listenForBlockVariantSelect() {
    D(this._dealBlockElement, "variant-selected", (t) => {
      const { variantId: e } = t.detail;
      m("listenForBlockVariantSelect", e), this._changeCurrentVariant(e);
    });
  }
  _listenForBlockDealBarSelect() {
    this._globalConfig.webPixel && this._dealBlockElement.addEventListener("deal-bar-selected", (t) => {
      const { dealBarId: e } = t.detail, i = this._dealBlockSettings.dealBars.find(
        (a) => a.id === e
      ), r = Fi(i, this._product.id);
      Kt(() => {
        window.Shopify.analytics.publish("kaching_deal_bar_selected", {
          product_id: r,
          deal_block_id: this._dealBlockSettings.id,
          deal_bar_id: e,
          ab_test_variant_id: this._dealBlockSettings.abTestVariantId,
          deal_block_version_id: this._dealBlockSettings.versionId
        });
      });
    });
  }
  // Resolved eagerly so galleries without data-media-id (matched by image URL)
  // can switch on the first bar click instead of waiting for a fetch.
  async _loadFeaturedMediaImagesAsync() {
    const t = [
      ...new Set(
        this._dealBlockSettings.dealBars.map(
          (r) => Nt(r, this._product.id)
        ).filter((r) => r != null)
      )
    ];
    if (!t.length || !this._globalConfig.storefrontAccessToken || t.every(
      (r) => this._featuredMediaMatchedById(r)
    ))
      return;
    const i = new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    );
    try {
      const r = await vt(
        i,
        t,
        600
      );
      for (const { gid: a, url: s } of r)
        this._featuredMediaImageUrls.set(a, s);
    } catch (r) {
      console.error(r);
    }
  }
  _featuredMediaMatchedById(t) {
    const e = M(t);
    return !!document.querySelector(
      `[data-media-id="${e}"], [data-media-id$="-${e}"]`
    );
  }
  _listenForBlockDealBarFeaturedImage() {
    this._featuredMediaImagesPromise = this._loadFeaturedMediaImagesAsync(), D(
      this._dealBlockElement,
      "deal-bar-selected",
      async (t) => {
        const { dealBarId: e, preselected: i } = t.detail;
        if (i)
          return;
        const r = e ? this._dealBlockSettings.dealBars.find((s) => s.id === e) : void 0, a = r && Nt(r, this._product.id);
        if (a) {
          m("listenForBlockDealBarFeaturedImage", a);
          const s = ++this._featuredImageSelectionSequence;
          if (!this._featuredMediaMatchedById(a) && (await this._featuredMediaImagesPromise, s !== this._featuredImageSelectionSequence))
            return;
          this._featuredImageActivated = !0, Mi(
            a,
            this._featuredMediaImageUrls.get(a),
            this
          );
          return;
        }
        this._featuredImageSelectionSequence++, this._featuredImageActivated && (this._featuredImageActivated = !1, Oi(this));
      }
    );
  }
  _listenForBlockItemsChange() {
    D(this._dealBlockElement, "items-changed", () => {
      var r, a, s;
      clearTimeout(this._updateQuantityInputTimeoutHandle);
      const t = this._dealBlockElement.pricing();
      this._items = this._dealBlockElement.items(), w("Selected items changed", this._items);
      const e = this._items.filter(
        (o) => this._isMainProductItem(o)
      ), i = e.find((o) => o.id == this._currentVariantId) || e[0];
      if (i) {
        if (this._changeCurrentVariant(i.id), (r = this._productBlock.addToCartForm()) == null || r.updateItem(i), this._changeQuantityInput(), (a = this._productBlock.addToCartButton()) == null || a.updatePrice(t.discountedPrice, t.fullPrice), clearTimeout(this._updateAddToCartButtonPriceTimeoutHandle), this._updateAddToCartButtonPriceTimeoutHandle = setTimeout(
          () => {
            var o;
            return (o = this._productBlock.addToCartButton()) == null ? void 0 : o.updatePrice(t.discountedPrice, t.fullPrice);
          },
          2e3
        ), (s = this._productBlock.addToCartForm()) == null || s.toggleAcceleratedCheckoutButtons(
          this._shouldShowAcceleratedCheckoutButtons()
        ), this._isFirstVariantChange && (this._updateQuantityInputTimeoutHandle = setTimeout(() => {
          this._changeQuantityInput(), delete this._updateQuantityInputTimeoutHandle;
        }, 1e3), this._isFirstVariantChange = !1), this._dealBlockSettings.updateNativePrice) {
          clearTimeout(this._updateNativePriceTimeoutHandle);
          const o = this._dealBlockSettings.updateNativePriceType === "item" ? t.discountedPricePerItem : t.discountedPrice, l = this._dealBlockSettings.updateNativePriceType === "item" ? t.fullPricePerItem : t.fullPrice;
          this._productBlock.updatePrice(o, l), this._updateNativePriceTimeoutHandle = setTimeout(() => {
            this._productBlock.updatePrice(o, l);
          }, 1e3);
        }
        this._reconvertPrices();
      }
    });
  }
  _reconvertPrices() {
    var t, e, i, r;
    m("reconvertPrices");
    try {
      (t = window.bucksCC) != null && t.reConvert && window.bucksCC.reConvert(), (e = window.baCurr) != null && e.refreshConversion && window.baCurr.refreshConversion(), (i = window.DoublyGlobalCurrency) != null && i.convertAll && window.DoublyGlobalCurrency.convertAll(), (r = window.conversionBearAutoCurrencyConverter) != null && r.convertPricesOnPage && window.conversionBearAutoCurrencyConverter.convertPricesOnPage(), window.mlvedaload && window.mlvedaload();
    } catch (a) {
      console.error(a);
    }
  }
  _changeCurrentVariant(t) {
    const e = this._product.variants.find((a) => a.id == t);
    if (m("_changeCurrentVariant", {
      variantId: t,
      currentVariantId: this._currentVariantId
    }), this._currentVariantId == t || (this._currentVariantId = t, !e))
      return;
    const i = this._productBlock.variantPicker();
    if (!i)
      return;
    (this._globalConfig.featureFlags.remove_variant_change_delay ? !this._dealBlockElement.dataset.nativeVariantChangeInProgress : !0) && (clearTimeout(window.kachingBundlesCurrentVariantChangeInProgress), window.kachingBundlesCurrentVariantChangeInProgress = setTimeout(() => {
      delete window.kachingBundlesCurrentVariantChangeInProgress;
    }, 1e3));
    for (const [a, s] of e.options.entries()) {
      const o = this._product.options[a], l = o.name, c = o.optionValues.find(
        (d) => d.name === s
      ).id;
      i.select(
        a + 1,
        c,
        l,
        s,
        this._product.id,
        e.id
      );
    }
  }
  _listenForAmountDiscountExceedsPrice() {
    document.addEventListener(
      "kaching-bundles-amount-discount-exceeds-price",
      (t) => {
        var r;
        const { totalDiscount: e, fullOrderPrice: i } = t.detail;
        b("amount_discount_exceeds_price_v3", {
          dealBlockId: this._dealBlockSettings.id,
          productId: this._product.id,
          country: this._country,
          currency: (r = window.Shopify.currency) == null ? void 0 : r.active,
          totalDiscount: e,
          fullOrderPrice: i
        });
      },
      { once: !0 }
    );
  }
  _listenForUpsellSubscriptionInherited() {
    document.addEventListener(
      "kaching-bundles-upsell-subscription-inherited",
      (t) => {
        const { type: e } = t.detail;
        b("upsell_subscription_inherited", {
          dealBlockId: this._dealBlockSettings.id,
          productId: this._product.id,
          upsellType: e
        });
      },
      { once: !0 }
    );
  }
  /* Add to cart */
  _refreshItemsBeforeAddToCart() {
    var i, r;
    this._dealBlockElement.rotateBundleNonce(), this._overrideItemsForNextAddToCart ? (this._items = this._overrideItemsForNextAddToCart, this._overrideItemsForNextAddToCart = void 0) : this._items = this._dealBlockElement.items();
    const t = this._items.filter(
      (a) => this._isMainProductItem(a)
    ), e = (i = t.find((a) => a.id == this._currentVariantId)) != null ? i : t[0];
    e && ((r = this._productBlock.addToCartForm()) == null || r.updateItem(e));
  }
  _listenForAddToCartClick() {
    const t = this._productBlock.addToCartButton();
    if (!t)
      return;
    t.setValidation(() => {
      var a;
      return !this._dealBlockSettings.collectionBreaksEnabled || !((a = this._dealBlockSettings.collectionBreaks) != null && a.requireItemSelectionEnabled) ? !0 : this._dealBlockElement.validateItemSelection().valid;
    }), t.onClick(() => {
      if (this._globalConfig.featureFlags.intercept_cart_request) {
        const a = this._dealBlockSettings.nanoId || this._dealBlockSettings.id;
        F.setFallbackDeal(a, this._product);
      }
      this._refreshItemsBeforeAddToCart();
    });
    const e = () => window.kachingBundlesDisableAddToCartHandling ? !1 : this._dealBlockSettings.skipCart || this._isUpcartAppEnabled() || this._isOpusAppEnabled() || this._isKrakenCartAppEnabled() ? !0 : this._globalConfig.featureFlags.intercept_cart_request ? !1 : this._items.length > 1, i = async () => {
      var a;
      if (this._dealBlockSettings.skipCart) {
        await ot(
          this._dealBlockSettings.nanoId || this._dealBlockSettings.id,
          this._product.id
        ), await this._addAllItemsToCart(), window.kachingCartApi && (m("Kaching Cart update tiered promotions bar"), await window.kachingCartApi.updateTieredPromotionsBar()), window.location.href = O("checkout");
        return;
      }
      if (this._isUpcartAppEnabled()) {
        try {
          window.upcartOpenCart && window.upcartOpenCart();
        } catch (s) {
          console.error("upcartOpenCart error", s);
        }
        await this._addAllItemsToCart(), window.upcartRefreshCart && window.upcartRefreshCart();
        return;
      }
      if (this._isOpusAppEnabled()) {
        try {
          window.opusOpen && window.opusOpen();
        } catch (s) {
          console.error("opusOpen error", s);
        }
        await this._addAllItemsToCart(), window.opusRefreshCart && window.opusRefreshCart();
        return;
      }
      if (this._isKrakenCartAppEnabled()) {
        try {
          (a = window.KrakenCart) != null && a.toggleCart && window.KrakenCart.toggleCart(!0);
        } catch (s) {
          console.error("KrakenCart error", s);
        }
        await this._addAllItemsToCart();
        return;
      }
      return this._addItemsExceptCurrentToCart();
    }, r = () => this._dealBlockSettings.skipCart || this._isUpcartAppEnabled() || this._isOpusAppEnabled() || this._isKrakenCartAppEnabled();
    t.onClickIfConditionMet(
      e,
      i,
      r
    ), !this._globalConfig.featureFlags.intercept_cart_request && (this._setupUpcart(), this._setupOpus(), this._setupKrakenCart());
  }
  _setupUpcart() {
    window.upcartShouldSkipAddToCartInterceptor = !0;
    const t = window.upcartShouldSkipAddToCart;
    window.upcartShouldSkipAddToCart = (e) => typeof t == "function" && t(e) === !0 ? !0 : e.includes("kaching_bundles=true");
  }
  _setupOpus() {
    [
      "the-gloria-skincare.myshopify.com",
      "xzxihx-8t.myshopify.com",
      "e76602-61.myshopify.com"
    ].includes(this._globalConfig.shopifyDomain) && (window.OpusNoATC = !0);
  }
  _setupKrakenCart() {
    window.krakenCartIsFormATCEnabled = !1;
  }
  _isUpcartAppEnabled() {
    return this._globalConfig.featureFlags.intercept_cart_request || this._globalConfig.shopifyDomain === "qu1udi-ws.myshopify.com" ? !1 : !!B("#UpcartPopup") || !!window.upcartDocumentOrShadowRoot;
  }
  _isOpusAppEnabled() {
    return this._globalConfig.featureFlags.intercept_cart_request || ![
      "the-gloria-skincare.myshopify.com",
      "xzxihx-8t.myshopify.com",
      "e76602-61.myshopify.com"
    ].includes(this._globalConfig.shopifyDomain) ? !1 : window.opusActive || !1;
  }
  _isKrakenCartAppEnabled() {
    var t;
    return this._globalConfig.featureFlags.intercept_cart_request ? !1 : ((t = window.KrakenCart) == null ? void 0 : t.isActive) && window.KrakenCart.isActive() || !1;
  }
  async _addItemsExceptCurrentToCart() {
    var l;
    m("addItemsExceptCurrentToCart", this._items);
    const t = (l = this._productBlock.addToCartForm()) == null ? void 0 : l.currentVariantId();
    setTimeout(() => {
      t != this._currentVariantId && b("different_current_variant_v3", {
        form: t,
        object: this._currentVariantId
      });
    });
    const e = this._items.findIndex(
      (c) => this._isMainProductItem(c) && c.id == t
    ), i = this._items.filter(
      (c, d) => d !== e
    ), r = i.filter((c) => c.parent_id), a = i.filter((c) => !c.parent_id), s = [
      ...r.reverse(),
      ...a
    ].map(({ parent_id: c, ...d }) => d);
    w("Adding only extra items to cart", s);
    const o = e >= 0 ? this._items[e] : void 0;
    if (o) {
      const c = this._productBlock.quantityInput();
      c && this._setQuantityInputValue(c, o.quantity);
    }
    try {
      await this._makeAddToCartRequest({
        items: s,
        partial: !0
      });
    } catch (c) {
      throw this._changeQuantityInput(), c;
    }
  }
  async _addAllItemsToCart() {
    var e, i;
    m("addAllItemsToCart", this._items);
    let t = this._items;
    t.length === 0 && (t = [
      {
        id: (i = (e = this._productBlock.addToCartForm()) == null ? void 0 : e.currentVariantId()) != null ? i : this._currentVariantId,
        quantity: 1,
        properties: {}
      }
    ]), w("Adding all items to cart", t), await this._makeAddToCartRequest({ items: t });
  }
  _collectProperties() {
    const e = v(
      '[name^="properties"]'
    ).map((i) => [i.name.match(/properties\[(.*)\]/)[1], i.value]).filter(([i]) => i !== "__kaching_bundles");
    return Object.fromEntries(e);
  }
  _isMainProductItem(t) {
    const e = this._kachingBundlesProperty(t);
    return e ? e.main || !1 : !0;
  }
  _shouldShowAcceleratedCheckoutButtons() {
    var t;
    return this._items.length > 1 ? !1 : !this._dealBlockSettings.collectionBreaksEnabled || !((t = this._dealBlockSettings.collectionBreaks) != null && t.requireItemSelectionEnabled) ? !0 : this._dealBlockElement.isItemSelectionValid();
  }
  _kachingBundlesProperty(t) {
    return t.properties.__kaching_bundles ? JSON.parse(
      t.properties.__kaching_bundles
    ) : null;
  }
  async _makeAddToCartRequest({
    items: t,
    partial: e = !1
  }) {
    var d, p;
    const i = this._collectProperties(), r = t.map((f) => {
      var u;
      return !this._isMainProductItem(f) && !((u = this._kachingBundlesProperty(f)) != null && u.collectionBreaksProduct) ? f : {
        ...f,
        properties: { ...i, ...f.properties }
      };
    });
    setTimeout(() => this._logCollectionBreakProperties(i));
    const a = { kaching_bundles: "true" };
    e && (a.partial = "true");
    const s = {
      "Content-Type": "application/json"
    };
    e || (s["X-Kaching-Cart-Ignore"] = "1");
    let o;
    try {
      o = await fetch(O("cart/add.js", a), {
        method: "POST",
        body: JSON.stringify({ items: r }),
        headers: s
      });
    } catch (f) {
      throw b("bundle_cart_add_failed", {
        partial: e,
        aborted: !0,
        reason: f instanceof Error ? f.message : String(f),
        theme: (d = window.Shopify.theme) == null ? void 0 : d.schema_name
      }), f;
    }
    if (o.ok)
      return;
    let l;
    try {
      l = (await o.json()).description;
    } catch {
      l = void 0;
    }
    const c = ci(e, o.status);
    if (b("bundle_cart_add_failed", {
      status: o.status,
      partial: e,
      aborted: c,
      reason: l,
      theme: (p = window.Shopify.theme) == null ? void 0 : p.schema_name
    }), c)
      throw new Error(`cart/add.js failed with HTTP ${o.status}`);
  }
  _logCollectionBreakProperties(t) {
    if (!this._dealBlockSettings.collectionBreaksEnabled)
      return;
    const e = Object.fromEntries(
      Object.entries(t).filter(
        ([i]) => !i.startsWith("__kaching_")
      )
    );
    Object.keys(e).length !== 0 && b("collection_break_properties", {
      properties: e
    });
  }
}
const rn = "essential-preorder:kaching-bundles-pv-updated", ct = "kaching-bundles-block, kaching-bundles-bar", Gt = "variant-badges", et = "[]";
let N = et, Rt = !1, Ht = !1, Qt = !1;
function an() {
  try {
    Rt || (Rt = !0, D(
      window,
      rn,
      () => zt(!0)
    )), zt(!1);
  } catch (n) {
    console.error(n);
  }
}
function zt(n) {
  var i, r, a;
  const t = (a = (r = (i = window.essentialPreorderConfigs) == null ? void 0 : i.kachingBundles) == null ? void 0 : r.preorderVariants) != null ? a : [];
  sn(t, n);
  const e = on(t);
  e !== N && (N = e, m("Essential preorder badges updated", N), ln(), N !== et && cn());
}
function sn(n, t) {
  Qt || n.length === 0 || (Qt = !0, b(
    "essential_preorders_detected_v6",
    {
      variantCount: n.length,
      badgeCount: n.filter((e) => e.badgeHtml).length,
      late: t
    },
    0.1
  ));
}
function on(n) {
  const t = [];
  for (const { id: e, badgeHtml: i } of n)
    e && i && t.push({ variantId: e, badgeHtml: i });
  return JSON.stringify(t);
}
function ln() {
  for (const n of v(ct))
    dt(n);
}
function dt(n) {
  var e;
  ((e = n.getAttribute(Gt)) != null ? e : et) !== N && S(n, Gt, N);
}
function cn() {
  if (Ht)
    return;
  Ht = !0, new MutationObserver((t) => {
    if (N !== et) {
      for (const e of t)
        for (const i of e.addedNodes)
          if (i instanceof HTMLElement) {
            if (i.matches(ct)) {
              dt(i);
              continue;
            }
            if (i.firstElementChild)
              for (const r of v(ct, i))
                dt(r);
          }
    }
  }).observe(document.body, {
    childList: !0,
    subtree: !0
  });
}
class dn {
  constructor(t) {
    this._submitInProgress = !1, this._ignoreClick = !1, this._clickHandler = null, this._onClickCallback = null, this._validationCallback = null, this._horizonAnimationDisabled = !1, this.button = t;
  }
  onClick(t) {
    this._onClickCallback = t;
  }
  setValidation(t) {
    this._validationCallback = t;
  }
  onClickIfConditionMet(t, e, i) {
    this._clickHandler = {
      condition: t,
      callback: e,
      shouldPreventDefault: i
    }, this._registerClickHandler();
  }
  replaceButton(t) {
    w("New add to cart button", { button: t }), this.button = t, this._clickHandler && this._registerClickHandler();
  }
  _registerClickHandler() {
    if (!this._clickHandler)
      return;
    this._setupHorizonThemeHandling();
    const t = async (i) => {
      var l;
      const r = this._submitInProgress || this._ignoreClick;
      if (this._onClickCallback && !r && this._onClickCallback(), this._validationCallback && !this._validationCallback()) {
        i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation();
        return;
      }
      const a = this._clickHandler.condition(), s = this._clickHandler.shouldPreventDefault();
      if (this._ignoreClick || w("Add to cart button clicked"), m("AddToCartButton#interceptClick", {
        conditionMet: a,
        preventDefault: s,
        submitInProgress: this._submitInProgress,
        ignoreClick: this._ignoreClick
      }), !a)
        return;
      if (this._submitInProgress) {
        this._submitInProgress = !1;
        return;
      }
      if (this._ignoreClick)
        return;
      this._submitInProgress = !0, this._ignoreClick = !0, this.button.disabled = !0;
      const o = setTimeout(() => {
        this._ignoreClick = !1;
      }, 1e3);
      i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation();
      try {
        await this._clickHandler.callback();
      } catch (c) {
        m("Add to cart callback failed, not submitting", { error: c }), clearTimeout(o), this._submitInProgress = !1, this._ignoreClick = !1, this.button.disabled = !1, b("add_to_cart_callback_failed", {
          error: c instanceof Error ? c.message : String(c),
          theme: (l = window.Shopify.theme) == null ? void 0 : l.schema_name
        });
        return;
      }
      if (this.button.disabled = !1, s) {
        this._submitInProgress = !1;
        return;
      }
      await new Promise((c) => setTimeout(c, 200)), this.button.click();
    };
    this.button.addEventListener("click", t, !0);
  }
  updatePrice(t, e) {
    const i = this._findAllAddToCartPriceElements(this.button);
    if (i.length === 0)
      return;
    const r = i.find(
      (s) => this._isCompareAtPriceElement(s)
    ), a = i.find((s) => s !== r) || i[0];
    a.innerHTML = t.amount > 0 ? t.formatted : "", r && r !== a && (e.amount > t.amount && t.amount > 0 ? (r.innerHTML = e.formatted, r.style.display = "") : r.innerHTML = "");
  }
  _setupHorizonThemeHandling() {
    const t = this.button.closest("add-to-cart-component");
    t && this.button.addEventListener(
      "pointerdown",
      () => {
        this._validationCallback && !this._validationCallback() ? (t.setAttribute("data-add-to-cart-animation", "false"), this._horizonAnimationDisabled = !0) : this._horizonAnimationDisabled && (t.setAttribute("data-add-to-cart-animation", "true"), this._horizonAnimationDisabled = !1);
      },
      !0
    );
  }
  _isPriceNode(t) {
    var i;
    const e = (i = t.childNodes[0]) == null ? void 0 : i.nodeValue;
    return !!(e && e.match(/\d/) && !e.match(/\p{L}{4}/u) && !e.includes("%"));
  }
  _findAllAddToCartPriceElements(t) {
    const e = [];
    if (!t.childNodes.length)
      return e;
    if (this._isPriceNode(t))
      return e.push(t), e;
    for (const i of t.childNodes)
      e.push(...this._findAllAddToCartPriceElements(i));
    return e;
  }
  _isCompareAtPriceElement(t) {
    let e = t;
    for (; e && e !== this.button; ) {
      const i = e.tagName;
      if (i === "S" || i === "DEL" || i === "STRIKE" || /compare/i.test(e.className || "") || getComputedStyle(e).textDecorationLine.includes("line-through"))
        return !0;
      e = e.parentElement;
    }
    return !1;
  }
}
class un {
  constructor(t, e, i, r) {
    this._acceleratedCheckoutButtonsEnabled = !0, this._currentItem = null, this._variantIdChangeCallback = null, this._sellingPlanChangeCallback = null, this._variantIdIntervalId = null, this._sellingPlanObserver = null, this._sellingPlanChangeHandler = null, m("AddToCartForm", {
      form: t,
      addQuantityInput: e,
      allowSellingPlanUpdate: i
    }), this.form = t, this._addQuantityInput = e, this._allowSellingPlanUpdate = i, this._abTestRunning = r, this._addAbTestSessionId();
  }
  _addAbTestSessionId() {
    if (!this._abTestRunning)
      return;
    const t = this._findOrCreateInput(
      "properties[__kaching_session_id]"
    );
    t.value = at();
  }
  updateItem(t) {
    m("AddToCartForm#updateItem", [this.form, t]), this._currentItem = t, this._updateIdInput(t.id), this._updateQuantityInput(t.quantity), this._updateKachingBundlesPropertyInput(t.properties), this._updateSellingPlanInput(t.selling_plan);
  }
  currentVariantId() {
    const t = this._findVariantIdElement();
    if (t)
      return Number(t.value);
  }
  onVariantIdChange(t) {
    this._variantIdChangeCallback = t, this._registerVariantIdObserver();
  }
  _registerVariantIdObserver() {
    if (!this._variantIdChangeCallback)
      return;
    this._variantIdIntervalId !== null && (window.clearInterval(this._variantIdIntervalId), this._variantIdIntervalId = null);
    const t = this._variantIdChangeCallback, e = this._findVariantIdElement();
    if (e instanceof HTMLInputElement && st(e, "value", (i, r) => {
      i !== r && r && t(Number(r));
    }), e instanceof HTMLSelectElement) {
      let i;
      this._variantIdIntervalId = window.setInterval(() => {
        const r = e.value;
        i !== r && r && (i = r, t(Number(r)));
      }, 100);
    }
  }
  onSellingPlanChange(t) {
    this._sellingPlanChangeCallback = t, this._registerSellingPlanObserver();
  }
  _registerSellingPlanObserver() {
    if (this._allowSellingPlanUpdate || !this._sellingPlanChangeCallback)
      return;
    this._sellingPlanObserver && (this._sellingPlanObserver.disconnect(), this._sellingPlanObserver = null);
    const t = this._sellingPlanChangeCallback;
    let e;
    const i = (s) => {
      e !== s && (e = s, t(s ? Number(s) : void 0));
    };
    let r = null;
    const a = () => {
      var l;
      const s = this._findInput("selling_plan");
      s !== r && (r = s, s && st(s, "value", (c, d) => {
        i(d);
      })), this._sellingPlanChangeHandler || (this._sellingPlanChangeHandler = (c) => {
        const d = c.target;
        d.name === "selling_plan" && i(d.value);
      }, this.form.addEventListener("change", this._sellingPlanChangeHandler));
      const o = B(
        'input[name="selling_plan"]:checked',
        this.form
      );
      i((l = o == null ? void 0 : o.value) != null ? l : s == null ? void 0 : s.value);
    };
    a(), this._sellingPlanObserver = new MutationObserver((s) => {
      s.some((o) => o.type === "childList") && a();
    }), this._sellingPlanObserver.observe(this.form, {
      childList: !0,
      subtree: !0
    });
  }
  toggleAcceleratedCheckoutButtons(t) {
    const e = "kaching-bundles-form--different-variants-selected";
    this._acceleratedCheckoutButtonsEnabled = t, t ? this.form.classList.remove(e) : this.form.classList.add(e);
  }
  _cleanupObservers() {
    this._variantIdIntervalId !== null && (window.clearInterval(this._variantIdIntervalId), this._variantIdIntervalId = null), this._sellingPlanObserver && (this._sellingPlanObserver.disconnect(), this._sellingPlanObserver = null), this._sellingPlanChangeHandler && (this.form.removeEventListener("change", this._sellingPlanChangeHandler), this._sellingPlanChangeHandler = null);
  }
  replaceForm(t) {
    w("New add to cart form", { form: t }), this._cleanupObservers(), this.form = t, this._addAbTestSessionId(), this.toggleAcceleratedCheckoutButtons(
      this._acceleratedCheckoutButtonsEnabled
    ), this._currentItem && this.updateItem(this._currentItem), this._registerVariantIdObserver(), this._registerSellingPlanObserver();
  }
  _updateIdInput(t) {
    const e = this._findVariantIdElement() || this._createInput("id"), i = String(t);
    this._ensureSelectOptionExists(e, i), e.disabled = !1, e.value = i;
  }
  _updateQuantityInput(t) {
    m("AddToCartForm#_updateQuantityInput", t);
    let e = null;
    this._addQuantityInput ? e = this._findOrCreateInput("quantity") : e = this._findInput("quantity"), e && (e.disabled = !1, e.value = String(t));
  }
  _updateKachingBundlesPropertyInput(t) {
    var e, i;
    if (t.__kaching_bundles) {
      const r = this._findOrCreateInput(
        "properties[__kaching_bundles]"
      );
      r.disabled = !1, r.value = this._encodeBundlesProperty(
        t.__kaching_bundles
      );
      const a = (i = (e = window.Shopify.theme) == null ? void 0 : e.schema_name) == null ? void 0 : i.toLowerCase();
      a != null && a.includes("pipeline") && (r.dataset.morphSkip = "true");
    } else {
      const r = this._findInput("properties[__kaching_bundles]");
      r == null || r.remove();
    }
  }
  _encodeBundlesProperty(t) {
    var i, r;
    const e = (r = (i = window.Shopify.theme) == null ? void 0 : i.schema_name) == null ? void 0 : r.toLowerCase();
    return e != null && e.includes("shrine pro") || e != null && e.includes("ascendify") ? btoa(t) : t;
  }
  _updateSellingPlanInput(t) {
    if (this._allowSellingPlanUpdate)
      if (t) {
        const e = this._findOrCreateInput("selling_plan");
        e.disabled = !1, e.value = String(t);
      } else {
        const e = this._findInput("selling_plan");
        e == null || e.remove();
      }
  }
  _findOrCreateInput(t) {
    return this._findInput(t) || this._createInput(t);
  }
  _ensureSelectOptionExists(t, e) {
    if (!(t instanceof HTMLSelectElement)) return;
    if (!Array.from(t.options).some(
      (r) => r.value === e
    )) {
      const r = J("option");
      r.value = e, r.text = "", t.appendChild(r);
    }
  }
  _findInput(t) {
    return B(
      `[name="${t}"]`,
      this.form
    );
  }
  _findVariantIdElement() {
    return Array.from(this.form.elements).find(
      (t) => (t instanceof HTMLInputElement || t instanceof HTMLSelectElement) && t.name === "id"
    ) || null;
  }
  _createInput(t) {
    const e = J("input");
    return e.type = "hidden", e.name = t, this.form.prepend(e), e;
  }
}
const ut = "kaching-bundle, kaching-bundle-deals", oe = [
  'form[action*="/cart/add"]',
  "form[data-instant-form-product-url]",
  // Instant page builder
  'form[action$="/add"]'
], pt = [
  '[data-pf-type^="ProductATC"]',
  // PageFly sometimes uses ProductATC2
  "button.gp-button-atc",
  // Gempages
  "gp-product-button button",
  // Gempages v7
  "x-buy-button",
  // Minimog
  "button.button--addToCart",
  // Booster
  'button[type="submit"]',
  'input[type="submit"]'
], le = [
  // Gempages
  [
    '[data-icon="gpicon-product-cartbutton"]',
    '[data-icon="gpicon-product-quantity"]'
  ],
  // Gempages v7
  ["gp-product-button", "gp-product-quantity"],
  // Dawn (and other free themes)
  ["product-form", ".product-form__quantity"],
  // Horizon
  [".buy-buttons-block", ".quantity-selector-wrapper"],
  // PageFly app
  ['[data-pf-type^="ProductATC"]', '[data-pf-type="ProductQuantity"]'],
  // PageFly sometimes uses ProductATC2
  // Debut
  [".product-form__item--submit", 'label[for="Quantity-product-template"]'],
  // Debutify
  [".product-single__add-to-cart", ".product-single__quantity"],
  // Impact
  [".product-info__buy-buttons", ".product-info__quantity-selector"],
  // Prestige
  [
    ".ProductForm__BuyButtons, .ProductForm__AddToCart",
    ".ProductForm__QuantitySelector"
  ],
  // Prestige (v7)
  ['[data-block-type="buy-buttons"]', '[data-block-type="quantity-selector"]'],
  // Envy
  [".product-page--submit-action", ".quantity-controls__outer"],
  // Warehouse
  [".product-form__payment-container", ".product-form__info-item--quantity"],
  // Atlantic
  ["[data-product-submit]", ".product-quantity-input"],
  // Empire
  [".product-form--atc", ".product-form--atc-qty"],
  // Turbo
  [".purchase-details", ".purchase-details__quantity"],
  // Expanse
  [".product-single__form .payment-buttons", ".product__quantity"],
  // Minimal
  [".product-form--wide", ".product-single__quantity"],
  // Brooklyn
  [".product-single__add-to-cart", ".product-single__quantity"],
  // Blockshop
  [".product-form--button-container", null],
  // Venture
  [".product-form__item--submit", ".product-form__item--quantity"],
  // Showcase
  [".product-detail__form__action", null],
  // Palo Alto
  [".product__submit__buttons", null],
  // Symmetry
  [".buy-buttons-row", ".quantity-wrapper"],
  // Kalles, Unsen
  [".t4s-product-form__buttons", "[data-quantity-wrapper]"],
  // Alchemy
  [".qty-wrapper--with-payment-button", ".product-qty"],
  // Baseline
  [".shopify-product-form", ".product-quantity-block"],
  // Shapes
  [".shopify-product-form", ".product-block-quantity-selector"],
  // Colors
  [".type_buy_buttons", ".type_quantity_selector"],
  // Motion
  [".product-single__form .add-to-cart", ".product__quantity"],
  // Avenue
  [".purchase-section", ".quantity.form"],
  // Ella
  [".product-form__buttons", ".quantity_selector"],
  // Booster
  [".product__atc", ".quantity--input"],
  // Focal
  [".product-form__payment-container", ".quantity-selector"],
  // EComposer
  [".ecom-product-single__add-to-cart", ".ecom-product-single__quantity"],
  // Solodrop
  [".product-form__submit", ".product__quantity"],
  // Enterprise
  [".product-info__add-to-cart", "quantity-input"],
  // Yuva
  [".yv-checkout-btn", ".yv-product-quantity"],
  // Reformation
  [".product-add-to-cart-container", "quantity-selector"],
  // Pipeline
  [".product__block__buttons", ".product__block__quantity"],
  // Minimog
  ["x-buy-button", "x-quantity-input"],
  // Xtra
  [".submit:has(.overlay-buy_button)", ".input-amount"],
  // Instant page builder
  [
    '[data-instant-action-type="redirect-to-cart"]',
    '[data-instant-type="container"]:has(> .instant-quantity-input)'
  ]
], pn = (n, t, e, i) => {
  if (m("_updateNativePrice", {
    discountedPrice: t,
    fullPrice: e
  }), e.amount > 0) {
    const r = nt(
      "[data-kaching-price-compare]",
      i.customSelectors.priceCompare
    );
    if (r.length > 0)
      for (const a of r)
        e.amount > t.amount ? (a.innerHTML = e.formatted, a.style.display = "") : a.style.display = "none";
    else {
      const a = [
        ".price--large .price__sale .price-item--regular",
        // Dawn, Shrine
        ".price--medium .price__sale .price-item--regular",
        // Be Yours
        ".lumin-price .price__sale .price-item--regular",
        // Architect, Beauty
        ".product-page-price .price__sale .price-item--regular",
        // Craft, Atlas
        ".f-price--large .f-price__sale .f-price-item--regular",
        // Sleek
        'gp-product-price div[type="compare"]',
        // Gempages
        "gp-product-price .gp-product-compare-price",
        // Gempages
        "product-price .compare-at-price",
        // Horizon
        ".pp-product-price .pp-price-item--sale",
        // Page Pilot
        ".product__price-and-badge .product__price--compare",
        // Palo Alto
        ".product-block--price span[data-compare-price]",
        // Impulse
        ".main-product__block-price .m-price__sale .m-price-item--regular",
        // Minimog
        ".product-info__price compare-at-price",
        // Impact
        '.product-info__block-item[data-block-type="price"] compare-at-price',
        // Prestige
        ".product-form__info-item .price--compare",
        // Warehouse
        '[data-product-type="compare_at_price"]',
        // PageFly
        ".product__price-wrapper .price__container .price__sale del",
        // Marble
        ".product__price-wrapper .price__container .product__price span:not(.visually-hidden)"
        // Marble
      ].flatMap((o) => v(o)), s = L(
        n,
        a
      );
      if (s) {
        s.innerHTML = e.formatted;
        const o = s.closest("gp-product-price");
        o instanceof HTMLElement && (o.dataset.hidden = e.amount > t.amount ? "false" : "true");
      }
    }
    for (const a of nt(
      "[data-kaching-label]",
      i.customSelectors.label
    ))
      a.innerHTML !== e.formatted && (a.innerHTML = e.formatted);
  }
  if (t.amount > 0) {
    const r = nt(
      "[data-kaching-price]",
      i.customSelectors.price
    );
    if (r.length > 0)
      for (const a of r)
        a.innerHTML = t.formatted;
    else {
      const a = [
        ".price--large .price__regular .price-item--regular",
        // Dawn, Shrine
        ".price--large .price__sale .price-item--sale",
        // Dawn, Shrine
        ".price--medium .price__regular .price-item--regular",
        // Be Yours
        ".price--medium .price__sale .price-item--sale",
        // Be Yours
        ".lumin-price .price__regular .price-item--regular",
        // Architect, Beauty
        ".lumin-price .price__sale .price-item--sale",
        // Architect, Beauty
        ".product-page-price .price__regular .price-item--regular",
        // Craft, Atlas
        ".product-page-price .price__sale .price-item--sale",
        // Craft, Atlas
        ".f-price--large .f-price__regular .f-price-item--regular",
        // Sleek
        ".f-price--large .f-price__sale .f-price-item--sale",
        // Sleek
        'gp-product-price div[type="regular"]',
        // Gempages
        "gp-product-price .gp-price:not(.gp-product-compare-price)",
        // Gempages
        "product-price .price",
        // Horizon
        ".pp-product-price .pp-price-item--regular",
        // Page Pilot
        ".product__price-and-badge .product__price--regular",
        // Palo Alto
        ".product-block--price span[data-product-price]",
        // Impulse
        ".main-product__block-price .m-price__sale .m-price-item--sale",
        // Minimog
        ".product-info__price sale-price",
        // Impact
        '.product-info__block-item[data-block-type="price"] sale-price',
        // Prestige
        ".product-form__info-item .price:not(.price--compare)",
        // Warehouse
        '[data-product-type="price"]',
        // PageFly
        ".product__price-wrapper .price__container .price__sale ins"
        // Marble
      ].flatMap((o) => v(o)), s = L(n, a);
      s && (s.innerHTML = t.formatted);
    }
  }
  if (t.amount > 0 && e.amount > 0) {
    const r = Math.round(
      (e.amount - t.amount) / e.amount * 100
    ), a = v("[data-kaching-price-badge]");
    if (a.length > 0)
      for (const s of a)
        r > 0 ? (s.innerHTML = s.innerHTML.replace(
          /\d+%/,
          `${r}%`
        ), s.style.display = "") : s.style.display = "none";
    else {
      const s = [
        ".price--large .price__badge-sale",
        // Dawn, Shrine
        ".lumin-price .price__badge-sale",
        // Architect
        ".product-page-price .price__badge-sale",
        // Craft, Atlas
        "gp-product-tag div[data-gp-text]",
        // Gempages
        ".product__price-and-badge span[data-price-off-amount]",
        // Palo Alto
        ".product-block--price span[data-save-price]",
        // Impulse
        ".product-info__price on-sale-badge"
        // Impact
      ].flatMap((l) => v(l)), o = L(n, s);
      o && (/\d/.test(o.innerHTML) && !o.innerHTML.includes("%") ? o.style.display = "none" : o.innerHTML = o.innerHTML.replace(/\d+%/, `${r}%`));
    }
  }
}, nt = (n, t) => v(t || n);
class R {
  static find(t, e) {
    let i = t.parentElement;
    for (; i; ) {
      if (e) {
        const s = v(
          e,
          i
        );
        if (s.length > 0)
          return new R(s);
      }
      const r = B(
        [
          "variant-selects",
          "variant-radios",
          "variant-picker",
          "product-variants",
          "gp-product-variants",
          ".gf_variants-wrapper",
          '[data-pf-type="ProductVariantSwatches"]',
          ".product-selectors",
          ".product-block-variant-picker",
          "dm-variant-selects",
          "simple-variant-picker"
        ].join(", "),
        i
      );
      if (r) return new R([r]);
      let a = v(
        [
          ".selector-wrapper",
          ".radio-wrapper",
          ".variant-wrapper",
          "div[data-product-option]",
          ".pp-variant-picker"
        ].join(", "),
        i
      );
      if (window.Shopify.shop && ["28212b.myshopify.com", "9bd9ad.myshopify.com"].includes(
        window.Shopify.shop
      ) && (a = v(
        ".selector-wrapper, .radio-wrapper, .variant-wrapper, .select-wrapper, div[data-product-option]",
        i
      )), a.length > 0) {
        const s = a.filter(
          (o) => !a.some(
            (l) => l !== o && l.contains(o)
          )
        );
        return new R(s);
      }
      i = i.parentElement;
    }
    return null;
  }
  constructor(t) {
    this._elements = t;
  }
  elements() {
    return this._elements;
  }
  hide() {
    for (const t of this._elements)
      t.style.display = "none", t.parentElement.classList.add(
        "kaching-bundles--variant-selects-hidden"
      );
  }
  select(t, e, i, r, a, s) {
    m("VariantPicker#select", [
      t,
      e,
      i,
      r
    ]), this._clickOptionWrapper(i, r) || this._clickRadioInput(
      t,
      e,
      i,
      r,
      a
    ) || this._setSelectValue(t, i, r) || this._setSelectVariantId(s) || this._clickButton(i, r);
  }
  // GemPages v7
  _clickOptionWrapper(t, e) {
    const r = this._elements.map((a) => v(".option-value-wrapper", a)).flat().find(
      (a) => a.getAttribute("option-data") === t && a.getAttribute("option-value") === e
    );
    return r ? (m("VariantPicker#_clickOptionWrapper", r), r.click(), !0) : !1;
  }
  _clickRadioInput(t, e, i, r, a) {
    const s = this._elements.map((c) => [...c.querySelectorAll("input")]).flat();
    let o = s.filter(
      (c) => [
        i,
        `${i}-${t}`,
        `options[${i}]`,
        `option${t}`,
        `option-${a}-${t - 1}`,
        `${a}-options-${i}`
      ].includes(c.name.trim())
    );
    o.length || (o = s.filter(
      (c) => c.dataset.optionPosition ? Number(c.dataset.optionPosition) === t : !1
    )), o.length || (o = s.filter((c) => c.type === "radio"));
    const l = o.find(
      (c) => c.value == r || c.value === String(e)
    );
    return l ? (m("VariantPicker#_clickRadioInput", l), l.click(), !0) : !1;
  }
  _setSelectValue(t, e, i) {
    const a = this._elements.map((o) => [...o.querySelectorAll("select")]).flat().find((o) => !!([`options[${e}]`, `option${t}`].includes(o.name) || o.dataset.index === `option${t}` || o.dataset.optionName === e || [
      `SingleOptionSelector-product-${t - 1}`,
      // PageFly
      `p-variant-dropdown-${t}`,
      // Gempages v6
      `option-${e.toLowerCase().replace(/ /g, "-")}`
    ].includes(o.id)));
    return !a || ![...a.options].find(
      (o) => o.value == i
    ) ? !1 : a.value === i ? (m("VariantPicker#_setSelectValue - already set", {
      variantSelect: a,
      optionValue: i
    }), !0) : (m("VariantPicker#_setSelectValue", { variantSelect: a, optionValue: i }), a.value = i, a.dispatchEvent(new Event("change", { bubbles: !0 })), !0);
  }
  _setSelectVariantId(t) {
    const i = this._elements.map((r) => [...r.querySelectorAll("select")]).flat().find(
      (r) => [...r.options].find((a) => Number(a.value) === t)
    );
    return i ? i.value === String(t) ? (m("VariantPicker#_setSelectVariantId - already set", {
      variantSelect: i,
      variantId: t
    }), !0) : (m("VariantPicker#_setSelectVariantId", { variantSelect: i, variantId: t }), i.value = String(t), i.dispatchEvent(new Event("change", { bubbles: !0 })), !0) : !1;
  }
  _clickButton(t, e) {
    const i = this._elements.find(
      (a) => a.getAttribute("data-product-option") === t
    );
    if (!i) return !1;
    const r = v("[data-value]", i).find(
      (a) => a.getAttribute("data-value") === e
    );
    return r ? (m("VariantPicker#_clickButton", r), r.click(), !0) : !1;
  }
}
class fn {
  constructor(t, e, i) {
    this._variantPicker = null, this._quantityInput = null, this._hiddenQuantityElement = null, this._onQuantityChange = null, this._addToCartForm = null, this._addToCartButton = null, this._placeholder = t, this._globalConfig = e, this._dealBlockSettings = i;
  }
  initialize() {
    this._findVariantPicker(), this._observeVariantPickerRemoval(), this._findQuantityInput(), this._listenForQuantityInputChange(), this._observeQuantityInputRemoval(), this._findAddToCartForm(), this._observeAddToCartFormRemoval(), this._findAddToCartButton(), this._moveAddToCartButtonOutOfQuantityElement(), this._observeAddToCartButtonRemoval();
  }
  variantPicker() {
    return this._variantPicker;
  }
  quantityInput() {
    return this._quantityInput;
  }
  addToCartForm() {
    return this._addToCartForm;
  }
  addToCartButton() {
    return this._addToCartButton;
  }
  onQuantityInputChange(t) {
    this._onQuantityChange = t;
  }
  updatePrice(t, e) {
    pn(
      this._placeholder,
      t,
      e,
      this._globalConfig
    );
  }
  _findVariantPicker() {
    const t = R.find(
      this._placeholder,
      this._globalConfig.customSelectors.variantPicker
    );
    t && (this._dealBlockSettings.hideVariantPicker && t.hide(), this._variantPicker = t);
  }
  _observeVariantPickerRemoval() {
    this._variantPicker && $(this._variantPicker.elements()[0], () => {
      var t, e;
      this._findVariantPicker(), w("New variant picker", {
        picker: (t = this._variantPicker) == null ? void 0 : t.elements()
      }), b(
        "variant_picker_removed",
        {
          recreated: !!this._variantPicker,
          theme: (e = window.Shopify.theme) == null ? void 0 : e.schema_name
        },
        0.01
      ), this._observeVariantPickerRemoval();
    });
  }
  _findQuantityInput() {
    const t = this._findQuantityElements(), i = L(
      this._placeholder,
      t,
      6
    );
    if (!i)
      return;
    this._globalConfig.keepQuantityInput || (this._hiddenQuantityElement = i, i.style.display = "none");
    const r = i.matches("input") ? i : i.querySelector("input");
    this._quantityInput = r;
  }
  _listenForQuantityInputChange() {
    this._quantityInput && (D(this._quantityInput, "change", () => {
      this._onQuantityChange && this._onQuantityChange(Number(this._quantityInput.value));
    }), st(this._quantityInput, "value", (t, e) => {
      t !== e && this._onQuantityChange && this._onQuantityChange(Number(e));
    }));
  }
  _observeQuantityInputRemoval() {
    this._quantityInput && $(this._quantityInput, () => {
      var t;
      this._findQuantityInput(), this._listenForQuantityInputChange(), this._moveAddToCartButtonOutOfQuantityElement(), w("New quantity input", {
        input: this._quantityInput
      }), b(
        "quantity_input_removed",
        {
          recreated: !!this._quantityInput,
          theme: (t = window.Shopify.theme) == null ? void 0 : t.schema_name
        },
        0.01
      ), this._observeQuantityInputRemoval();
    });
  }
  _findQuantityElements() {
    const t = this._globalConfig.customSelectors.quantity;
    if (t) {
      const e = v(t);
      if (e.length)
        return e;
    }
    for (const [e, i] of le) {
      if (!i)
        continue;
      const r = v(i);
      if (r.length)
        return r;
    }
    return v(".product-form__quantity");
  }
  _findAddToCartForm() {
    const t = this._findCartForm();
    if (!t)
      return;
    const e = !!this._dealBlockSettings.subscriptionsEnabled || this._dealBlockSettings.dealBars.some(
      (i) => i.sellingPlanEnabled
    );
    this._addToCartForm = new un(
      t,
      !this._quantityInput,
      e,
      !!this._dealBlockSettings.abTestVariantNumber
    );
  }
  _findCartForm() {
    let t = this._placeholder.parentElement;
    for (; t; ) {
      for (const e of oe)
        for (const i of [
          this._globalConfig.customSelectors.addToCartButton,
          ...pt,
          "button"
        ]) {
          if (!i)
            continue;
          const r = B(
            `${e} ${i}`,
            t
          );
          if (r) {
            const a = r.closest(
              e
            );
            if (!a) continue;
            return !a.contains(this._placeholder) && a.querySelector(ut) ? null : a;
          }
        }
      t = t.parentElement;
    }
    return null;
  }
  _observeAddToCartFormRemoval() {
    var e;
    const t = (e = this._addToCartForm) == null ? void 0 : e.form;
    window.Shopify.designMode || !t || $(t, () => {
      var r, a;
      const i = this._findCartForm();
      i && ((r = this._addToCartForm) == null || r.replaceForm(i), b(
        "cart_form_removed",
        {
          theme: (a = window.Shopify.theme) == null ? void 0 : a.schema_name
        },
        0.01
      ), this._observeAddToCartFormRemoval());
    });
  }
  _findAddToCartButton() {
    const t = this._findAddToCartButtonElement() || this._findFormlessAddToCartButtonElement();
    if (!t) {
      this._warnAboutMissingAddToCartButton(), this._addToCartButton = null;
      return;
    }
    this._addToCartButton = new dn(t);
  }
  _moveAddToCartButtonOutOfQuantityElement() {
    !this._hiddenQuantityElement || !this._addToCartButton || this._hiddenQuantityElement.contains(this._addToCartButton.button) && this._hiddenQuantityElement.after(this._addToCartButton.button);
  }
  _findAddToCartButtonElement() {
    var r;
    const t = (r = this.addToCartForm()) == null ? void 0 : r.form;
    if (!t)
      return null;
    if (this._globalConfig.customSelectors.addToCartButton) {
      const a = B(
        this._globalConfig.customSelectors.addToCartButton,
        t
      );
      if (a)
        return a;
    }
    const e = [];
    for (const a of pt) {
      const s = v(a, t);
      e.push(...s);
    }
    const i = L(
      this._placeholder,
      e
    );
    return i || t.querySelector("button");
  }
  _findFormlessAddToCartButtonElement() {
    if (this._addToCartForm || this._globalConfig.featureFlags.intercept_cart_request !== !0 || !this._globalConfig.customSelectors.addToCartButton)
      return null;
    const t = this._globalConfig.customSelectors.addToCartButton;
    if (!t)
      return null;
    const e = v(t);
    return e.length === 0 ? null : L(
      this._placeholder,
      e,
      3
    );
  }
  _observeAddToCartButtonRemoval() {
    this._addToCartButton && $(this._addToCartButton.button, () => {
      var e, i;
      if ((e = this._addToCartButton) != null && e.button.isConnected) {
        this._observeAddToCartButtonRemoval();
        return;
      }
      let t = this._findAddToCartButtonElement() || this._findFormlessAddToCartButtonElement();
      t ? (this._addToCartButton.replaceButton(t), this._moveAddToCartButtonOutOfQuantityElement()) : this._addToCartButton = null, b(
        "add_to_cart_button_removed",
        {
          recreated: !!t,
          theme: (i = window.Shopify.theme) == null ? void 0 : i.schema_name
        },
        0.01
      ), this._observeAddToCartButtonRemoval();
    });
  }
  _warnAboutMissingAddToCartButton() {
    new URLSearchParams(window.location.search).get("source") !== "visualPreviewInitialLoad" && console.log(
      "%c[Kaching Bundles] Add to cart button not found. Please add a selector to the settings page or contact support.",
      "background: #f8d7da; color: #721c24; padding: 8px; border-left: 4px solid #f5c6cb;"
    );
  }
}
const hn = (n, t, e, i, r) => {
  if (!e.stickyAtcEnabled || t.offsetParent === null || document.querySelector(".kaching-bundles-sticky-atc-wrapper"))
    return;
  const a = document.createElement("div");
  a.classList.add("kaching-bundles-sticky-atc-wrapper"), document.body.appendChild(a);
  const s = document.createElement("div");
  s.classList.add("kaching-bundles-sticky-atc-spacer"), a.appendChild(s);
  const o = document.createElement("kaching-bundles-sticky-atc");
  o.setAttribute(
    "sticky-atc",
    JSON.stringify(e.stickyAtc)
  ), o.setAttribute("config", JSON.stringify(n)), o.setAttribute("translations", JSON.stringify(i)), o.setAttribute("product", JSON.stringify(r)), o.setAttribute("deal-block", JSON.stringify(e)), a.appendChild(o), o.addEventListener(
    "kaching-bundles-sticky-atc-clicked",
    () => {
      const f = t.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: f,
        behavior: "smooth"
      });
    }
  );
  let l = !1;
  const c = () => {
    const p = t.getBoundingClientRect().bottom < 0;
    p !== l && (l = p, p ? (o.style.display = "block", requestAnimationFrame(() => {
      l && o.classList.add("kaching-bundles-sticky-atc--visible");
    })) : o.classList.contains("kaching-bundles-sticky-atc--visible") && (o.classList.remove("kaching-bundles-sticky-atc--visible"), o.addEventListener(
      "transitionend",
      () => {
        l || (o.style.display = "");
      },
      { once: !0 }
    )));
  };
  requestAnimationFrame(c), window.addEventListener("scroll", c, { passive: !0 }), new ResizeObserver(() => {
    const p = o.offsetHeight;
    s.style.height = `${p}px`;
  }).observe(o);
}, mn = 0.1;
let Ut = !1, ft, ht, mt = 0, ce;
const gn = (n) => {
  ft === void 0 && (ft = Math.round(n));
}, _n = (n) => {
  ht === void 0 && (mt = performance.now(), ht = Math.round(mt), ce = n);
}, bn = async () => {
  var n;
  if (!Ut && !((n = window.Shopify) != null && n.designMode) && typeof PerformanceObserver != "undefined" && (Ut = !0, !(!he() && !me() && Math.random() > mn)))
    try {
      (await import("./web-vitals-collector.js")).start(() => ({
        bundleImportMs: ft,
        widgetMountedMs: ht,
        widgetInsertedAt: mt,
        widgetElement: ce
      }));
    } catch (t) {
      console.error(t);
    }
};
class jt {
  constructor(t) {
    this._globalConfig = t, setTimeout(() => {
      const e = document.querySelector(
        'link[href*="kaching-bundles.css"]'
      );
      e && $(e, () => {
        var i;
        b(
          "css_removed",
          {
            theme: (i = window.Shopify.theme) == null ? void 0 : i.schema_name
          },
          0.01
        );
      });
    }, 100), an();
  }
  initialize() {
    this._setupTranslations();
    const t = v(ut);
    this._addProductIdForPlaceholders(t), t.length === 0 && this._addPlaceholders(), this._initializePlaceholders(), this._globalConfig.abTestsRunning && ge(), this._setupPlaceholderObserver();
  }
  _setupTranslations() {
    const t = z("script#kaching-bundles-translations") || [], e = t.find(
      (i) => i.locale === this._globalConfig.locale
    );
    this._translations = e == null ? void 0 : e.translations, ke(t);
  }
  _addProductIdForPlaceholders(t) {
    const e = z("script.kaching-bundles-product[data-main]");
    if (e)
      for (const i of t)
        i.getAttribute("product-id") || i.setAttribute("product-id", e.id);
  }
  _addPlaceholders() {
    if (!B("script.kaching-bundles-deal-block-settings"))
      return;
    const t = this._findPosition();
    if (!t)
      return;
    const e = z("script.kaching-bundles-product[data-main]"), i = e && e.id || this._globalConfig.productId, r = J("kaching-bundle");
    r.setAttribute("product-id", i), t.parentElement.insertBefore(r, t);
  }
  async _initializePlaceholders() {
    const t = [...v(ut)].filter(
      (o) => o.getAttribute("product-id")
    );
    if (m("_initializePlaceholders", t), t.length === 0) {
      window.kachingBundlesInitialized = !0, window.dispatchEvent(new CustomEvent("kaching-bundles-initialized"));
      return;
    }
    if (t.filter(
      (o) => !x(o).initialized
    ).length === 0)
      return;
    const i = await this._fetchPlaceholdersData(t);
    m("placeholdersData", i);
    const r = Array.from(i.values()).map(({ dealBlock: o }) => o).filter((o) => o != null), a = Array.from(i.values()).map(({ product: o }) => o).filter((o) => o != null);
    await j(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken,
      a,
      r
    );
    const s = at();
    for (const o of t) {
      const { product: l, dealBlock: c } = i.get(o);
      if (!l || !c) {
        x(o).initialized = "skipped";
        continue;
      }
      await this._initializePlaceholder(
        o,
        l,
        c,
        s
      );
    }
    window.kachingBundlesInitialized = !0, window.dispatchEvent(new CustomEvent("kaching-bundles-initialized"));
  }
  async _initializePlaceholder(t, e, i, r) {
    var h, y;
    const a = e.id;
    bn(), this._globalConfig.webPixel ? (m("Tracking view with web pixel", window.Shopify.analytics), Kt(() => {
      window.Shopify.analytics.publish("kaching_bundle_viewed", {
        product_id: a,
        deal_block_id: i.id,
        ab_test_variant_id: i.abTestVariantId,
        deal_block_version_id: i.versionId,
        session_id: r
      });
    })) : (m("Tracking view without web pixel (legacy)"), setTimeout(() => {
      _e(
        this._globalConfig.shopifyDomain,
        i.id,
        a,
        i.abTestVariantId,
        i.versionId,
        r
      );
    }, 2e3));
    const s = {
      ...this._globalConfig.defaultTranslations,
      ...(h = this._translations) == null ? void 0 : h.system
    }, o = (y = this._translations) == null ? void 0 : y.dealBlocks[i.id], l = { ...s, ...o }, c = this._globalConfig.locale === this._globalConfig.liquidLocale ? v("script.kaching-bundles-product:not([data-main])").map((k) => JSON.parse(k.textContent)).filter((k) => k.variants.length < 250) : [], d = performance.now();
    await import("./kaching-bundles-block.js"), gn(performance.now() - d);
    const p = { ...this._globalConfig };
    p.currencyRate = li(
      this._globalConfig.currencyRate,
      i.currency,
      this._globalConfig.marketCurrencyCode
    ), i.dealBars.some(
      (k) => k.dealBarType === rt.QuantityBreak && k.quantitySelector
    ) && (p.keepQuantityInput = !1);
    const f = new fn(t, p, i);
    f.initialize();
    const u = J(
      "kaching-bundles-block"
    );
    for (u.setAttribute("data-instant-styles", "none"), new nn(
      u,
      f,
      p,
      l,
      i,
      e,
      c
    ); t.firstChild; )
      t.removeChild(t.firstChild);
    t.appendChild(u), x(t).initialized = "true", _n(u), yn(u), hn(
      this._globalConfig,
      u,
      i,
      l,
      e
    );
  }
  _setupPlaceholderObserver() {
    if (window.Shopify.designMode)
      return;
    new MutationObserver((e) => {
      var r;
      e.some(
        (a) => Array.from(a.addedNodes).some((s) => {
          if (!(s instanceof HTMLElement)) return !1;
          const o = (l) => l.tagName === "KACHING-BUNDLE" && !x(l).initialized;
          return o(s) || Array.from(s.querySelectorAll("kaching-bundle")).some(
            (l) => o(l)
          );
        })
      ) && (this._globalConfig.featureFlags.reinitialize_morphed_placeholders ? (w("Initializing new kaching-bundle placeholder"), this._initializePlaceholders()) : document.querySelector(
        "#replo-fullpage-element, #replo-element-styles"
      ) || b(
        "kaching_bundle_added_v8",
        {
          theme: (r = window.Shopify.theme) == null ? void 0 : r.schema_name
        },
        0.01
      ));
    }).observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  async _fetchPlaceholdersData(t) {
    var _, C;
    const e = t.map(
      (g) => Number(g.getAttribute("product-id"))
    ), i = new Map(
      this._globalConfig.locale === this._globalConfig.liquidLocale ? v("script.kaching-bundles-product[data-main]").map((g) => JSON.parse(g.textContent)).filter((g) => g.variants.length < 250).map((g) => [g.id, g]) : []
    ), r = e.filter(
      (g) => !i.has(g)
    ), a = v(
      "script.kaching-bundles-deal-block-settings"
    ), s = /* @__PURE__ */ new Map();
    for (const g of e) {
      const A = a.filter(
        (E) => Number(x(E).productId) === g
      );
      A.length && s.set(
        g,
        A.map(
          (E) => E.textContent ? JSON.parse(E.textContent) : null
        )
      );
    }
    const o = e.filter(
      (g) => !s.has(g)
    ), l = this._globalConfig.storefrontAccessToken ? new q(
      this._globalConfig.shopifyDomain,
      this._globalConfig.storefrontAccessToken
    ) : null, c = l && r.length > 0 ? U(l, {
      country: this._globalConfig.country,
      language: this._globalConfig.locale.split("-")[0].toUpperCase(),
      productIds: r,
      includeSellingPlans: this._globalConfig.includeSellingPlans,
      includeAvailableQuantity: this._globalConfig.includeAvailableQuantity,
      useExternalMetafieldNamespace: !1
    }) : [], d = l && o.length > 0 ? be(l, {
      useExternalMetafieldNamespace: !1,
      useMetaobjects: this._globalConfig.featureFlags.storefront_metaobjects
    }) : [], [p, f] = await Promise.all([
      c,
      d
    ]), u = new Map(
      r.map((g) => [
        g,
        p.find((A) => A.id == g)
      ])
    ), h = new Map([...i, ...u]), y = at(), k = /* @__PURE__ */ new Map();
    for (const g of t) {
      const A = Number(g.getAttribute("product-id")), E = h.get(A);
      if (!E)
        continue;
      const kt = ((_ = s.get(A)) == null ? void 0 : _.filter((I) => I)) || f;
      kt.sort((I, T) => {
        const Ct = !!I.marketId, ue = !!T.marketId;
        return Ct === ue ? 0 : Ct ? -1 : 1;
      });
      let P = Ne(kt, E);
      m("applicableDealBlocks", P), P = P.filter((I) => I.marketId ? I.marketId === this._globalConfig.marketId : !0), P = P.filter(
        (I) => {
          var T;
          return !((T = I.excludedMarketIds) != null && T.includes(this._globalConfig.marketId));
        }
      ), P = P.filter((I) => {
        if (!I.abTestVariantId)
          return !0;
        const T = ye({
          kachingSessionId: y,
          abTestVariantsCount: I.abTestVariantsCount,
          abTestTrafficAllocation: I.abTestTrafficAllocation
        });
        return I.abTestVariantNumber === T;
      }), this._globalConfig.b2bCustomer && (P = P.filter(
        (I) => !I.excludeB2bCustomers
      )), this._globalConfig.requireCustomerLogin && !this._globalConfig.isLoggedIn && (P = []);
      const Q = (C = g.getAttribute("manual-deal-block-id")) == null ? void 0 : C.trim();
      if (Q) {
        const I = P.findIndex(
          (T) => T.id === Q || T.nanoId === Q
        );
        if (w("Manual deal override", {
          deal: P[I],
          manualDealBlockId: Q,
          manualDealBlockIndex: I
        }), I > 0) {
          const [T] = P.splice(
            I,
            1
          );
          P.unshift(T);
        }
      }
      if (!P.length) {
        k.set(g, {
          product: E,
          dealBlock: null
        });
        continue;
      }
      k.set(g, {
        product: E,
        dealBlock: P[0]
      });
    }
    return k;
  }
  _findPosition() {
    const t = this._findGempagesPosition();
    if (t)
      return t;
    const e = this._findThemePosition();
    if (e)
      return e;
    const i = this._findDefaultPosition();
    return i || null;
  }
  // Temporary
  _findGempagesPosition() {
    const t = v("gp-product-button");
    for (const e of t)
      if (!e.closest("gp-sticky"))
        return e;
    return null;
  }
  _findThemePosition() {
    for (const t of le) {
      const e = B(t[0]);
      if (e) {
        if (e.closest(
          ".dbtfy-sticky-addtocart, .cart-drawer, cart-drawer, cart-items"
        ))
          continue;
        return setTimeout(() => {
          var r;
          const i = e.closest(
            '[class*="cart"], [class*="Cart"]'
          );
          i && i.tagName.toLowerCase() !== "body" && !i.classList.toString().includes("add-to-cart") && !i.classList.toString().includes("AddToCart") && !i.classList.toString().includes("icartShopifyCartContent") && b(
            "theme_position_in_cart_drawer_v8",
            {
              selector: t[0],
              classes: i.classList.toString(),
              theme: (r = window.Shopify.theme) == null ? void 0 : r.schema_name
            },
            0.01
          );
        }), e;
      }
    }
    return null;
  }
  _findDefaultPosition() {
    for (const t of oe)
      for (const e of [
        this._globalConfig.customSelectors.addToCartButton,
        ...pt,
        "button"
      ]) {
        if (!e)
          continue;
        const i = B(
          `${t} ${e}`
        );
        if (i)
          return i.parentElement;
      }
    return null;
  }
}
function yn(n) {
  const t = () => typeof window.FastClick != "undefined" || typeof window.T4SThemeSP != "undefined" && typeof window.T4SThemeSP.FastClick != "undefined" || typeof window.BEEThemeSP != "undefined" && typeof window.BEEThemeSP.FastClick != "undefined", e = setInterval(() => {
    t() && (clearInterval(e), v("*", n).forEach(
      (i) => Ce(i, "needsclick")
    ));
  }, 500);
}
const Jt = (n) => {
  var t;
  ((t = window.Shopify.theme) == null ? void 0 : t.theme_store_id) === 801 ? setTimeout(() => new jt(n).initialize(), 100) : new jt(n).initialize();
}, de = () => {
  var t;
  if (ve()) {
    const e = v(
      "style#kaching-bundles-custom-css"
    );
    for (const i of e)
      i.remove();
    return;
  }
  const n = z(
    "script#kaching-bundles-config"
  );
  n && (w("Shopify domain:", n.shopifyDomain), we(), Ie(n), window.kachingBundlesKeepQuantityInput && (n.keepQuantityInput = !0), Jt(n), window.Shopify.designMode && (D(window, "shopify:section:load", () => {
    Jt(n);
  }), n.isDeprecatedAppEmbed || oi({
    customApiHost: n.customApiHost,
    shopifyDomain: n.shopifyDomain,
    themeId: (t = window.Shopify.theme) == null ? void 0 : t.id
  })), Ae(), Be(), window.kachingBundlesApi = Se(n), setTimeout(() => {
    Pe();
  }, 1e3));
};
window.__kachingBundlesInitializeInternal = de;
const Wt = () => {
  window.kachingBundlesDisableAutoInitialize || de();
};
document.readyState === "loading" ? (m("Waiting for DOMContentLoaded"), document.addEventListener("DOMContentLoaded", Wt)) : Wt();
