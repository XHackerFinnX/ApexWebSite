(function() {
  try {
    if (typeof document != "undefined") {
      var Ft = document.createElement("style");
      Ft.id = "kaching-bundles-styles", Ft.appendChild(document.createTextNode(`.kaching-bundles .kaching-bundles__multiple-gifts-selector{position:relative}.kaching-bundles .kaching-bundles__multiple-gifts-selector__clickable-overlay{position:absolute;inset:0;cursor:pointer}.kaching-bundles .kaching-bundles__multiple-gifts-selector__photos{position:relative;display:flex;align-items:center;flex-shrink:0;padding-block:2px}.kaching-bundles .kaching-bundles__multiple-gifts-selector__photo{box-sizing:border-box;width:40px;height:40px;-o-object-fit:cover;object-fit:cover;background-color:#fff;border-radius:8px;border:1px solid var(--kaching-free-gift-background-color, #fff)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__multiple-gifts-selector__photo{border-color:var(--kaching-free-gift-selected-background-color, #000)}.kaching-bundles .kaching-bundles__multiple-gifts-selector__photo:not(:first-child){margin-inline-start:-16px}.kaching-bundles .kaching-bundles__multiple-gifts-selector__photo-count{box-sizing:border-box;position:absolute;top:0;inset-inline-end:0;transform:translate(18%,-3%);display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;border:1px solid var(--kaching-free-gift-text-color, #000);background-color:var(--kaching-free-gift-background-color, rgba(0, 0, 0, .3));color:var(--kaching-free-gift-text-color, #000);font-size:calc(var(--kaching-free-gift-font-size, 13px) - 2px);font-weight:var(--kaching-free-gift-font-weight, bold);line-height:1}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__multiple-gifts-selector__photo-count{border-color:var(--kaching-free-gift-selected-text-color, #fff);background-color:var(--kaching-free-gift-selected-background-color, #000);color:var(--kaching-free-gift-selected-text-color, #fff)}.kaching-bundles .kaching-bundles__bundle-products{display:flex;justify-content:space-evenly;margin-top:12px;margin-bottom:4px;border:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-radius:calc(var(--bar-border-radius, 0) * 3 / 4)}.kaching-bundles .kaching-bundles__bundle-products .kaching-bundles__bar-variant-selects{justify-content:center}.kaching-bundles .kaching-bundles__bundle-products__divider{display:flex;flex-direction:column;align-items:center;width:0;overflow:visible}.kaching-bundles .kaching-bundles__bundle-products__divider *{max-width:initial}.kaching-bundles .kaching-bundles__bundle-products__divider-line{display:flex;flex:1;width:1px;background-color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bundle-products__divider-icon{display:flex}.kaching-bundles .kaching-bundles__bundle-products__divider-icon svg{color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bundle-products__product{display:flex;flex:1;flex-direction:column;align-items:center;min-width:0;gap:5px;padding:12px}.kaching-bundles .kaching-bundles__bundle-products__product.kaching-bundles__bundle-products__product--placeholder{justify-content:center;text-align:center;font-size:13px;font-weight:700;color:#555}.kaching-bundles .kaching-bundles__bundle-products__wrapper{display:flex;align-items:center;gap:10px;min-width:0}.kaching-bundles .kaching-bundles__bundle-products__content{display:flex;flex-direction:column;align-items:flex-start;min-width:0}.kaching-bundles .kaching-bundles__bundle-products__link{display:flex;flex-shrink:0;text-decoration:none}.kaching-bundles .kaching-bundles__bundle-products__image{flex-shrink:0;height:50px;width:auto;max-width:100%;border-radius:var(--kaching-bundle-products-image-border-radius, 0)}.kaching-bundles .kaching-bundles__bundle-products__image-placeholder{flex-shrink:0;height:50px;width:50px}.kaching-bundles .kaching-bundles__bundle-products__title{overflow-wrap:break-word;text-align:center;font-size:13px;color:var(--bar-title-color);font-weight:var(--bar-title-font-weight, 700);font-style:var(--bar-title-font-style)}.kaching-bundles .kaching-bundles__bundle-products__pricing{display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:center;align-items:baseline;gap:5px}.kaching-bundles .kaching-bundles__bundle-products__price{font-size:13px;font-weight:700;color:var(--bar-price-color, #000)}.kaching-bundles .kaching-bundles__bundle-products__full-price{text-decoration:line-through;font-size:12px;color:var(--bar-full-price-color, #555)}.kaching-bundles .kaching-bundles__bundle-products__unit-price{width:100%;text-align:center;font-size:12px;color:var(--bar-full-price-color, #555);text-transform:uppercase}.kaching-bundles .kaching-bundles__bundle-products--hidden{display:none}.kaching-bundles .kaching-bundles__bundle-products--vertical{flex-direction:column}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__divider{flex-direction:row;width:100%;height:0}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__divider-line{width:auto;height:1px}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__product{flex-direction:row;justify-content:space-between;padding:14px 12px}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__pricing{flex-direction:column;align-items:flex-end}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__pricing--with-unit-price{flex-flow:row wrap;justify-content:flex-end}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__unit-price{text-align:end}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__title{text-align:start}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bundle-products__image{width:50px;height:auto;-o-object-fit:contain;object-fit:contain}.kaching-bundles .kaching-bundles__bundle-products--vertical .kaching-bundles__bar-variant-selects{justify-content:flex-start}.kaching-bundles .kaching-bundles__mix-and-match-products{display:flex;flex-direction:column;margin-top:12px;margin-bottom:4px;border:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-radius:calc(var(--bar-border-radius, 0) * 3 / 4);overflow:hidden}.kaching-bundles .kaching-bundles__mix-and-match-products--hidden{display:none}.kaching-bundles .kaching-bundles__mix-and-match-products__divider{display:flex;flex-direction:row;align-items:center;gap:4px;width:100%;height:0;overflow:visible}.kaching-bundles .kaching-bundles__mix-and-match-products__divider-line{display:flex;flex:1;width:auto;height:1px;background-color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__mix-and-match-products__divider-icon{display:flex}.kaching-bundles .kaching-bundles__mix-and-match-products__divider-icon svg{color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__mix-and-match-product{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;gap:12px;align-items:center;padding:12px}.kaching-bundles .kaching-bundles__mix-and-match-product__content{display:flex;flex-direction:column;gap:6px;min-width:0}.kaching-bundles .kaching-bundles__mix-and-match-product__pricing{display:flex;justify-content:flex-end}.kaching-bundles .kaching-bundles__mix-and-match-product__pricing .kaching-bundles__bundle-products__pricing{flex-direction:column;align-items:flex-end;gap:0}.kaching-bundles .kaching-bundles__mix-and-match-product__image-link{display:flex;flex-shrink:0;text-decoration:none}.kaching-bundles .kaching-bundles__mix-and-match-product__image{flex-shrink:0;height:50px;width:auto;max-width:100%;border-radius:var(--kaching-bundle-products-image-border-radius, 0)}.kaching-bundles .kaching-bundles__mix-and-match-product__image-placeholder{height:50px;width:50px}.kaching-bundles .kaching-bundles__mix-and-match-product__title-link{align-self:flex-start;text-decoration:none}.kaching-bundles .kaching-bundles__mix-and-match-product__title{overflow-wrap:break-word;text-align:start;font-size:13px;color:var(--bar-title-color);font-weight:var(--bar-title-font-weight, 700);font-style:var(--bar-title-font-style)}.kaching-bundles .kaching-bundles__mix-and-match-product__swap-button{display:inline-flex;align-items:center;justify-content:center;padding:8px 12px;border-radius:var(--bar-border-radius, 8px);background-color:var(--collection-product-button-color, #2b2b2b);color:var(--collection-product-button-text-color, #ffffff);font-size:13px;line-height:1.2;text-align:center;cursor:pointer;white-space:nowrap}.kaching-bundles .kaching-bundles__mix-and-match-products__placeholder{display:flex;align-items:center;justify-content:center;padding:14px 12px;color:#0006;font-style:italic}.kaching-bundles .kaching-bundles__checkbox-upsells__upsell .kaching-bundles__bar-main{gap:10px}.kaching-bundles .kaching-bundles__checkbox-upsells__upsell .kaching-bundles__selling-plan-select{margin-top:5px}.kaching-bundles .kaching-bundles__checkbox-upsells__checkbox{all:unset;display:flex;flex-shrink:0;width:20px;height:20px;align-items:center;justify-content:center;cursor:pointer;background-color:#fff;color:var(--bar-selected-border-color);border-width:2px;border-style:solid;border-color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__checkbox-upsells__checkbox.kaching-bundles__checkbox-upsells__checkbox--selected{border-color:var(--bar-selected-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__checkbox-upsells__image{width:initial;max-width:50px;max-height:50px;border-radius:calc(var(--bar-border-radius, 0) / 2)}.kaching-bundles .kaching-bundles__choose-multiple-gifts-modal{position:fixed;z-index:9999;inset:0;display:flex;align-items:center;justify-content:center;padding:10px;text-align:start;line-height:1.4;background-color:var(--kaching-choose-multiple-gifts-overlay-color, rgba(0, 0, 0, .5))}.kaching-bundles .kaching-bundles__choose-multiple-gifts-modal__content{position:relative;z-index:10000;min-width:min(470px,95%);max-width:700px;max-height:calc(100dvh - 20px);width:100%;display:flex;flex-direction:column}.kaching-bundles .kaching-bundles__choose-multiple-gifts{display:flex;flex-direction:column;border-radius:10px;background-color:#fff;max-height:100%;overflow:hidden}.kaching-bundles .kaching-bundles__choose-multiple-gifts__header{display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0;margin-block:2px 18px;color:var(--kaching-choose-multiple-gifts-text-color, #000);flex-shrink:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__heading{margin:0;font-weight:650;font-size:16px}.kaching-bundles .kaching-bundles__choose-multiple-gifts__close{all:unset;display:flex;align-items:center;justify-content:center;margin-inline-end:-6px;width:24px;height:24px;cursor:pointer}.kaching-bundles .kaching-bundles__choose-multiple-gifts__products{display:flex;flex-direction:column;gap:16px;padding:0 16px;flex:1;overflow-y:auto;min-height:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product{display:flex;align-items:center;justify-content:space-between;gap:20px}@media (width <= 600px){.kaching-bundles .kaching-bundles__choose-multiple-gifts__product{gap:12px}}@media (width <= 500px){.kaching-bundles .kaching-bundles__choose-multiple-gifts__product{flex-direction:column;align-items:stretch;gap:12px}}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-container{display:flex;align-items:center;gap:12px;min-width:0;flex:1}@media (width <= 600px){.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-container{gap:8px}}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-image-link{display:flex;flex-shrink:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-image{display:flex;border-radius:8px;border:1px solid #e5e5e3;-o-object-fit:contain;object-fit:contain;height:auto;width:var(--kaching-choose-multiple-gifts-photo-size, 100px);max-height:calc(var(--kaching-choose-multiple-gifts-photo-size, 100px) * 2)}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-content{display:flex;flex-direction:column;gap:4px;min-width:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-link{text-decoration:none}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-title{overflow-wrap:break-word;font-weight:650;font-size:var(--kaching-choose-multiple-gifts-text-size, 14px);color:var(--kaching-choose-multiple-gifts-text-color, #000)}.kaching-bundles .kaching-bundles__choose-multiple-gifts__variant-selectors{display:flex;flex-direction:column;gap:8px;margin-top:8px;min-width:0;max-width:100%}.kaching-bundles .kaching-bundles__choose-multiple-gifts__variant-selector-row{display:flex;align-items:flex-start;gap:8px}.kaching-bundles .kaching-bundles__choose-multiple-gifts__variant-counter{display:flex;align-items:center;justify-content:center;flex-shrink:0;min-width:24px;height:24px;font-size:12px;color:#000}.kaching-bundles .kaching-bundles__choose-multiple-gifts__variant-selector-content{flex:1;min-width:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__variant-selector-with-counter{display:flex;align-items:center;gap:8px;min-width:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__variant-selector-wrapper{flex:1;min-width:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__subtitle{font-size:14px;font-weight:400;color:var(--kaching-choose-multiple-gifts-text-color, #000)}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-price-container{display:flex;gap:10px}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-price{font-size:14px;font-weight:650;color:var(--kaching-choose-multiple-gifts-price-color, #f04438)}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-compare-at-price{font-size:14px;font-weight:650;text-decoration:line-through;color:var(--kaching-choose-multiple-gifts-compare-at-price-color, #667085)}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-shrink:0;display:flex;justify-content:center;align-items:center;border:none;font-weight:600;padding:10px 12px;line-height:1.4;border-radius:8px;cursor:pointer;font-size:var(--kaching-choose-multiple-gifts-button-size, 16px);background-color:var(--kaching-choose-multiple-gifts-button-color, #7f56d9);color:var(--kaching-choose-multiple-gifts-button-text-color, #fff)}@media (width <= 500px){.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-button{flex:1}}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-button--disabled{background-color:#eaecf0;color:#98a2b3;cursor:not-allowed}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-button--selected{display:flex;align-items:center;gap:8px;background-color:#fff;color:#414651;border:1px solid #d5d7da}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;margin-top:16px;padding:16px;border-top:1px solid #e5e5e3;flex-shrink:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer-text{font-size:14px;font-weight:400;color:#535862;flex:1;min-width:0;overflow-wrap:break-word}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer-buttons{display:flex;gap:8px;flex:1;min-width:0;flex-shrink:0}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;height:40px;min-width:80px;font-size:14px;font-weight:600;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:1;box-shadow:0 1px 2px #0a0d120d}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer-button--cancel{background-color:#fff;border:1px solid #d5d7da;color:#414651}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer-button--confirm{background-color:#000;color:#fff}.kaching-bundles .kaching-bundles__choose-multiple-gifts__footer-button--confirm:disabled{background-color:#eaecf0;border:1px solid #e9eaeb;color:#98a2b3;cursor:not-allowed}.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-actions{display:flex;align-items:center;gap:12px;flex-shrink:0}@media (width <= 600px){.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-actions{gap:8px}}@media (width <= 500px){.kaching-bundles .kaching-bundles__choose-multiple-gifts__product-actions{flex-direction:row-reverse;justify-content:space-between;flex-shrink:1}}.kaching-bundles .kaching-bundles__choose-multiple-gifts__gift-quantity{display:flex;align-items:center;justify-content:space-between;width:72px;height:42px;border:1px solid #d6d6d6;border-radius:8px;overflow:hidden}.kaching-bundles .kaching-bundles__choose-multiple-gifts__gift-quantity-button{all:unset;display:flex;align-items:center;justify-content:center;width:28px;height:100%;cursor:pointer;color:#424242}.kaching-bundles .kaching-bundles__choose-multiple-gifts__gift-quantity-button[aria-disabled=true]{opacity:.4;cursor:not-allowed}.kaching-bundles .kaching-bundles__choose-multiple-gifts__gift-quantity-button img{filter:brightness(0) saturate(100%) invert(24%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(96%) contrast(89%)}.kaching-bundles .kaching-bundles__choose-multiple-gifts__gift-quantity-value{font-size:14px;font-weight:600;color:#414651}body:has(.kaching-bundles__choose-multiple-gifts-modal){overflow:hidden}.kaching-bundles .kaching-bundles__mix-and-match-choose-product-modal{position:fixed;z-index:9999;inset:0;display:flex;align-items:center;overflow-y:auto;padding:10px;text-align:start;line-height:1.4;background-color:var(--kaching-mix-and-match-choose-product-overlay-color, rgba(0, 0, 0, .5))}.kaching-bundles .kaching-bundles__mix-and-match-choose-product-modal__content{position:relative;z-index:10000;margin:auto;min-width:min(470px,95%);max-width:700px;width:100%}.kaching-bundles .kaching-bundles__mix-and-match-choose-product{display:flex;flex-direction:column;padding:16px;border-radius:10px;background-color:#fff}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__header{display:flex;align-items:center;justify-content:space-between;margin-block:2px 18px;color:var(--kaching-mix-and-match-choose-product-text-color, #000)}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__heading{margin:0;font-weight:650;font-size:16px}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__close{all:unset;display:flex;align-items:center;justify-content:center;margin-inline-end:-6px;width:24px;height:24px;cursor:pointer}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__products{display:flex;flex-direction:column;gap:16px}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__empty-state{display:flex;flex-direction:column;align-items:center;text-align:center;color:#4b5565}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product{display:flex;align-items:center;justify-content:space-between;gap:20px}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-container{display:flex;align-items:center;gap:12px;min-width:0}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-image-link{display:flex;flex-shrink:0}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-image{display:flex;border-radius:8px;border:1px solid #e5e5e3;-o-object-fit:contain;object-fit:contain;height:auto;width:var(--kaching-mix-and-match-choose-product-photo-size, 100px);max-height:calc(var(--kaching-mix-and-match-choose-product-photo-size, 100px) * 2)}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-content{display:flex;flex-direction:column;gap:4px;min-width:0}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-link{text-decoration:none}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-title{overflow-wrap:break-word;font-weight:650;font-size:var(--kaching-mix-and-match-choose-product-text-size, 14px);color:var(--kaching-mix-and-match-choose-product-text-color, #000)}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__subtitle{font-size:14px;font-weight:400;color:var(--kaching-mix-and-match-choose-product-text-color, #000)}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-price-container{display:flex;gap:10px}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-price{font-size:14px;font-weight:650;color:var(--kaching-mix-and-match-choose-product-price-color, #f04438)}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-compare-at-price{font-size:14px;font-weight:650;text-decoration:line-through;color:var(--kaching-mix-and-match-choose-product-compare-at-price-color, #667085)}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-option-names.kaching-bundles__bar-variant-names{color:inherit;margin-block:0}.kaching-bundles .kaching-bundles__mix-and-match-choose-product__product-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-shrink:0;border:none;font-weight:600;padding:12px;line-height:1.2;border-radius:8px;cursor:pointer;font-size:var(--kaching-mix-and-match-choose-product-button-size, 16px);background-color:var(--kaching-mix-and-match-choose-product-button-color, #7f56d9);color:var(--kaching-mix-and-match-choose-product-button-text-color, #fff)}body:has(.kaching-bundles__mix-and-match-choose-product-modal){overflow:hidden}.kaching-bundles .kaching-bundles__bar-collection-products{display:flex;flex-direction:column;gap:5px;margin-top:5px}.kaching-bundles .kaching-bundles__collection-product{display:flex;gap:16px;align-items:center;justify-content:space-between}.kaching-bundles .kaching-bundles__collection-product .kaching-bundles__bar-variant-names{display:none;margin-block:0}.kaching-bundles .kaching-bundles__collection-product__image--default{background-color:#fff;border:1px solid #e9e9e9;color:#000}.kaching-bundles .kaching-bundles__collection-product--require-selection{padding:8px;border-radius:12px;background-color:var(--kaching-collection-breaks-require-selection-background-color)}.kaching-bundles .kaching-bundles__collection-product--require-selection .kaching-bundles__collection-product__image--default{border-color:var(--kaching-collection-breaks-require-selection-text-color);color:var(--kaching-collection-breaks-require-selection-text-color)}.kaching-bundles .kaching-bundles__collection-breaks-alert{display:flex;align-items:center;gap:8px;margin-top:10px;padding:8px 12px;border-radius:12px;font-size:12px;background-color:var(--kaching-collection-breaks-require-selection-background-color);color:var(--kaching-collection-breaks-require-selection-text-color)}.kaching-bundles .kaching-bundles__collection-breaks-alert__icon{flex-shrink:0;width:16px;height:16px}.kaching-bundles .kaching-bundles__collection-product__main{display:flex;gap:16px;align-items:center;min-width:0}.kaching-bundles .kaching-bundles__collection-product__content{display:flex;flex-direction:column;gap:3px;min-width:0}.kaching-bundles .kaching-bundles__collection-product__link{display:flex;flex-shrink:0;text-decoration:none}.kaching-bundles .kaching-bundles__collection-product__image{flex-shrink:0;-o-object-fit:contain;object-fit:contain;height:auto;width:var(--kaching-collection-breaks-product-photo-size, 40px);border-radius:var(--kaching-collection-breaks-image-border-radius, 0)}.kaching-bundles .kaching-bundles__collection-product__title{font-size:16px;color:var(--kaching-collection-breaks-product-title-color, #000)}.kaching-bundles .kaching-bundles__collection-product__choose-product-image{cursor:pointer;line-height:0}.kaching-bundles .kaching-bundles__collection-product__choose-product-button{cursor:pointer;color:#fff;font-size:12px;line-height:1.4;padding:6px 14px;border-radius:8px;background-color:var(--kaching-collection-breaks-button-color, #333)}.kaching-bundles .kaching-bundles__collection-product__remove-button{display:flex;align-items:center;justify-content:center;height:24px;width:24px;cursor:pointer}.kaching-bundles .kaching-bundles__choose-product-modal{position:fixed;z-index:9999;inset:0;display:flex;align-items:center;overflow-y:auto;padding:10px;text-align:start;line-height:1.4;background-color:var(--kaching-choose-product-overlay-color, rgba(0, 0, 0, .5))}.kaching-bundles .kaching-bundles__choose-product-modal__content{position:relative;z-index:10000;margin:auto;min-width:min(470px,95%);max-width:700px;width:100%}.kaching-bundles .kaching-bundles__choose-product{display:flex;flex-direction:column;padding:16px;border-radius:10px;background-color:#fff}.kaching-bundles .kaching-bundles__choose-product__header{display:flex;align-items:center;justify-content:space-between;margin-block:2px 18px;color:var(--kaching-choose-product-text-color, #000)}.kaching-bundles .kaching-bundles__choose-product__heading{margin:0;font-weight:650;font-size:16px}.kaching-bundles .kaching-bundles__choose-product__close{all:unset;display:flex;align-items:center;justify-content:center;margin-inline-end:-6px;width:24px;height:24px;cursor:pointer}.kaching-bundles .kaching-bundles__choose-product__products{display:flex;flex-direction:column;gap:16px}.kaching-bundles .kaching-bundles__choose-product__controls{display:flex;align-items:center;gap:10px;margin-bottom:14px}.kaching-bundles .kaching-bundles__choose-product__search-field{position:relative;flex:1 1 auto;min-width:0}.kaching-bundles .kaching-bundles__choose-product__search-icon{position:absolute;top:50%;left:12px;transform:translateY(-50%);width:16px;height:16px;pointer-events:none}.kaching-bundles .kaching-bundles__choose-product__search-input{box-sizing:border-box;width:100%;padding:10px 12px 10px 36px;border:1px solid #d5d7da;border-radius:8px;font-size:14px;color:var(--kaching-choose-product-text-color, #000);background-color:#fff}.kaching-bundles .kaching-bundles__choose-product__sort{position:relative;flex-shrink:0}.kaching-bundles .kaching-bundles__choose-product__sort-button{display:inline-flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #d5d7da;border-radius:8px;background:#fff;color:var(--kaching-choose-product-text-color, #000);font-size:14px;line-height:1;cursor:pointer}.kaching-bundles .kaching-bundles__choose-product__sort-icon{width:16px;height:16px;display:block}.kaching-bundles .kaching-bundles__choose-product__sort-menu{position:absolute;top:calc(100% + 6px);right:0;z-index:2;min-width:210px;display:flex;flex-direction:column;border:1px solid #d5d7da;border-radius:10px;background:#fff;box-shadow:0 8px 24px #10182824;overflow:hidden}.kaching-bundles .kaching-bundles__choose-product__sort-option{display:flex;align-items:center;justify-content:space-between;gap:12px;border:none;background:#fff;text-align:start;padding:10px 12px;font-size:14px;color:var(--kaching-choose-product-text-color, #000);cursor:pointer}.kaching-bundles .kaching-bundles__choose-product__sort-option-check{flex-shrink:0;width:16px;height:16px;display:block}.kaching-bundles .kaching-bundles__choose-product__sort-option:hover{background:#f8fafc}.kaching-bundles .kaching-bundles__choose-product__empty-state{display:flex;flex-direction:column;align-items:center;text-align:center;color:#4b5565}.kaching-bundles .kaching-bundles__choose-product__empty-state-icon-wrapper{display:flex;align-items:center;justify-content:center;width:48px;height:48px;margin-bottom:16px}.kaching-bundles .kaching-bundles__choose-product__empty-state-icon{width:48px;height:48px}.kaching-bundles .kaching-bundles__choose-product__empty-state-title{font-size:18px;font-weight:500;color:#181d27}.kaching-bundles .kaching-bundles__choose-product__empty-state-description{margin-top:8px;font-size:14px;color:#535862}.kaching-bundles .kaching-bundles__choose-product__empty-state-clear-button{margin-top:16px;padding:10px 16px;border:1px solid #d5d7da;border-radius:8px;background:#fff;color:#414651;font-size:14px;font-weight:600}.kaching-bundles .kaching-bundles__choose-product__product{display:flex;align-items:center;justify-content:space-between;gap:20px}.kaching-bundles .kaching-bundles__choose-product__product-container{display:flex;align-items:center;gap:12px;min-width:0}.kaching-bundles .kaching-bundles__choose-product__product-image-link{display:flex;flex-shrink:0}.kaching-bundles .kaching-bundles__choose-product__product-image{display:flex;border-radius:8px;border:1px solid #e5e5e3;-o-object-fit:contain;object-fit:contain;height:auto;width:var(--kaching-choose-product-photo-size, 100px);max-height:calc(var(--kaching-choose-product-photo-size, 100px) * 2)}.kaching-bundles .kaching-bundles__choose-product__product-content{display:flex;flex-direction:column;gap:4px;min-width:0}.kaching-bundles .kaching-bundles__choose-product__product-link{text-decoration:none}.kaching-bundles .kaching-bundles__choose-product__product-title{overflow-wrap:break-word;font-weight:650;font-size:var(--kaching-choose-product-text-size, 14px);color:var(--kaching-choose-product-text-color, #000)}.kaching-bundles .kaching-bundles__choose-product__subtitle{font-size:14px;font-weight:400;color:var(--kaching-choose-product-text-color, #000)}.kaching-bundles .kaching-bundles__choose-product__product-price-container{display:flex;gap:10px}.kaching-bundles .kaching-bundles__choose-product__product-price{font-size:14px;font-weight:650;color:var(--kaching-choose-product-price-color, #f04438)}.kaching-bundles .kaching-bundles__choose-product__product-compare-at-price{font-size:14px;font-weight:650;text-decoration:line-through;color:var(--kaching-choose-product-compare-at-price-color, #667085)}.kaching-bundles .kaching-bundles__choose-product__product-option-names.kaching-bundles__bar-variant-names{color:inherit;margin-block:0}.kaching-bundles .kaching-bundles__choose-product__product-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-shrink:0;border:none;font-weight:600;padding:12px;line-height:1.2;border-radius:8px;cursor:pointer;font-size:var(--kaching-choose-product-button-size, 16px);background-color:var(--kaching-choose-product-button-color, #7f56d9);color:var(--kaching-choose-product-button-text-color, #fff)}body:has(.kaching-bundles__choose-product-modal){overflow:hidden}.kaching-bundles .kaching-bundles__free-gift{display:flex;align-items:center;justify-content:space-between;margin-inline:1px;padding-block:7px;padding-inline:8px calc(15px * var(--block-spacing, 1) + 5px);gap:5px 10px;background-color:var(--kaching-free-gift-background-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__free-gift:last-child{margin-block-end:1px;border-end-start-radius:calc(var(--bar-border-radius) - 1px);border-end-end-radius:calc(var(--bar-border-radius) - 1px)}.kaching-bundles .kaching-bundles__free-gift.kaching-bundles__free-gift--out-of-stock{opacity:.3}.kaching-bundles .kaching-bundles__free-gift__link{pointer-events:none}.kaching-bundles .kaching-bundles__free-gift__main{display:flex;align-items:center;gap:calc(5px + 5px * var(--block-spacing, 1));min-width:0;flex:1}.kaching-bundles .kaching-bundles__free-gift__main:has(.kaching-bundles__swatch-buttons){overflow-x:auto}.kaching-bundles .kaching-bundles__free-gift__content{display:flex;align-items:center;gap:5px 15px;flex-wrap:wrap;min-width:0;flex:1}.kaching-bundles .kaching-bundles__free-gift__content--clickable{cursor:pointer}.kaching-bundles .kaching-bundles__free-gift__add-button{all:unset;display:flex;cursor:pointer;line-height:0;padding:4px;margin:-4px -4px -4px -6px;color:var(--kaching-free-gift-text-color, #000)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__free-gift__add-button{color:var(--kaching-free-gift-selected-text-color, #fff)}.kaching-bundles .kaching-bundles__free-gift__text{color:var(--kaching-free-gift-text-color, #000);font-size:var(--kaching-free-gift-font-size, 13px);font-weight:var(--kaching-free-gift-font-weight, bold);font-style:var(--kaching-free-gift-font-style, normal)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__free-gift__text{color:var(--kaching-free-gift-selected-text-color, #fff)}.kaching-bundles .kaching-bundles__free-gift__image{display:flex;flex-shrink:0;width:auto;height:var(--kaching-free-gift-image-height, 30px);border-radius:var(--kaching-free-gift-image-border-radius, 0)}.kaching-bundles .kaching-bundles__free-gift__full-price{flex-shrink:0;text-decoration:line-through;font-size:calc(var(--kaching-free-gift-font-size, 13px) - 1px);font-weight:var(--bar-subtitle-font-weight);font-style:var(--bar-subtitle-font-style);color:var(--kaching-free-gift-text-color, #000)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__free-gift__full-price{color:var(--kaching-free-gift-selected-text-color, #fff)}.kaching-bundles .kaching-bundles__free-gift__divider{height:1px;display:flex}.kaching-bundles .kaching-bundles__free-gift-summary{gap:8px;justify-content:flex-start}.kaching-bundles .kaching-bundles__free-gift-summary__images{display:flex;flex-shrink:0;align-items:center}.kaching-bundles .kaching-bundles__free-gift-summary__image{display:flex;flex-shrink:0;width:auto;height:var(--kaching-free-gift-image-height, 30px);border-radius:var(--kaching-free-gift-image-border-radius, 0);margin-inline-start:-8px;border:1px solid var(--kaching-free-gift-background-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__free-gift-summary__image:first-child{margin-inline-start:0}.kaching-bundles .kaching-bundles__free-gift-summary__image--no-border{border-color:transparent}.kaching-bundles .kaching-bundles__upsell{display:flex;align-items:center;justify-content:space-between;position:relative;padding-block:7px;padding-inline:8px calc(15px * var(--block-spacing, 1) + 5px);margin-inline:1px;gap:5px 10px;background-color:var(--kaching-upsell-background-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__upsell:last-child{margin-block-end:1px;border-end-start-radius:calc(var(--bar-border-radius) - 1px);border-end-end-radius:calc(var(--bar-border-radius) - 1px)}.kaching-bundles .kaching-bundles__upsell.kaching-bundles__upsell--out-of-stock{opacity:.3}.kaching-bundles .kaching-bundles__upsell--badge-border-all{margin:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell--badge-border-top{margin-top:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell--badge-border-bottom{margin-bottom:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell--badge-border-left{min-height:var(--badge-border-min-length, auto);margin-left:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell--badge-border-right{min-height:var(--badge-border-min-length, auto);margin-right:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell .kaching-bundles__badge-border--all{inset:calc(-1 * var(--badge-border-thickness, 22px))}.kaching-bundles .kaching-bundles__upsell .kaching-bundles__badge-border--top{inset:calc(-1 * var(--badge-border-thickness, 22px)) 0 auto;height:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell .kaching-bundles__badge-border--bottom{inset:auto 0 calc(-1 * var(--badge-border-thickness, 22px));height:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell .kaching-bundles__badge-border--left{inset:0 auto 0 calc(-1 * var(--badge-border-thickness, 22px));width:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell .kaching-bundles__badge-border--right{inset:0 calc(-1 * var(--badge-border-thickness, 22px)) 0 auto;width:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__upsell__main{display:flex;align-items:center;gap:calc(5px + 5px * var(--block-spacing, 1));min-width:0;flex:1}.kaching-bundles .kaching-bundles__upsell__content{display:flex;align-items:center;gap:5px 15px;flex-wrap:wrap;min-width:0;flex:1}.kaching-bundles .kaching-bundles__upsell__link{display:flex;flex-shrink:0}.kaching-bundles .kaching-bundles__upsell__image{width:auto;height:var(--kaching-upsell-image-height, 30px);border-radius:var(--kaching-upsell-image-border-radius, 0)}.kaching-bundles .kaching-bundles__upsell__checkbox{all:unset;display:flex;flex-shrink:0;width:16px;height:16px;align-items:center;justify-content:center;cursor:pointer;background-color:#fff;margin-inline-end:4px;color:var(--bar-selected-border-color);border-width:2px;border-style:solid;border-color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__upsell__checkbox.kaching-bundles__upsell__checkbox--selected{border-color:var(--bar-selected-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__upsell__text{display:flex;min-height:30px;align-items:center;cursor:pointer;overflow-wrap:break-word;color:var(--kaching-upsell-text-color, #000);font-size:var(--kaching-upsell-font-size, 13px);font-weight:var(--kaching-upsell-font-weight, bold);font-style:var(--kaching-upsell-font-style, normal)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell__text{color:var(--kaching-upsell-selected-text-color, #000)}.kaching-bundles .kaching-bundles__upsell__pricing{align-items:flex-end;display:flex;flex-direction:column;flex-shrink:0}.kaching-bundles .kaching-bundles__upsell__pricing-row{display:flex;align-items:baseline;gap:6px}.kaching-bundles .kaching-bundles__upsell__price{font-size:var(--kaching-upsell-font-size, 13px);font-weight:var(--bar-title-font-weight);font-style:var(--bar-title-font-style);color:var(--bar-price-color, #000)}.kaching-bundles .kaching-bundles__upsell__pricing-row--secondary .kaching-bundles__upsell__price{font-size:calc(var(--kaching-upsell-font-size, 13px) - 1px)}.kaching-bundles .kaching-bundles__upsell__full-price,.kaching-bundles .kaching-bundles__upsell__unit-price{font-size:calc(var(--kaching-upsell-font-size, 13px) - 1px);font-weight:var(--bar-subtitle-font-weight);font-style:var(--bar-subtitle-font-style);color:var(--bar-full-price-color, #555)}.kaching-bundles .kaching-bundles__upsell__full-price{text-decoration:line-through}.kaching-bundles .kaching-bundles__upsell__unit-price{text-transform:uppercase}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__free-gift{flex-direction:column;padding-inline-end:8px}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__upsell{flex-direction:column}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__upsell__pricing{flex-direction:row;gap:5px;align-items:center}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__free-gift{margin-inline:2px;padding-block:7px 6px;padding-inline:7px calc(15px * var(--block-spacing, 1) + 4px);background-color:var(--kaching-free-gift-selected-background-color, #000)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__free-gift:last-child{margin-block-end:2px;border-end-start-radius:calc(var(--bar-border-radius) - 2px);border-end-end-radius:calc(var(--bar-border-radius) - 2px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-all .kaching-bundles__free-gift:last-child,.kaching-bundles .kaching-bundles__bars--badge-border-all .kaching-bundles__free-gift:last-child{margin-inline:0;margin-block-end:0;border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom .kaching-bundles__free-gift:last-child{border-end-start-radius:0;border-end-end-radius:0}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell{margin-inline:2px;padding-block:7px 6px;padding-inline:7px calc(15px * var(--block-spacing, 1) + 4px);background-color:var(--kaching-upsell-selected-background-color, rgba(0, 0, 0, .2))}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell:last-child{margin-block-end:2px;border-end-start-radius:calc(var(--bar-border-radius) - 2px);border-end-end-radius:calc(var(--bar-border-radius) - 2px)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell--badge-border-all,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell--badge-border-left{margin-left:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell--badge-border-all,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell--badge-border-right{margin-right:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell--badge-border-all:last-child,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__upsell--badge-border-bottom:last-child{margin-block-end:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gifts{border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift{display:flex;align-items:center;justify-content:space-between;margin-inline:1px;padding-block:7px;padding-inline:8px calc(15px * var(--block-spacing, 1) + 5px);gap:5px 10px;background-color:var(--bar-border-color, #fff)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift:last-child{margin-block-end:1px;border-end-start-radius:calc(var(--bar-border-radius) - 1px);border-end-end-radius:calc(var(--bar-border-radius) - 1px)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__link{pointer-events:none}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__main{display:flex;align-items:center;gap:calc(5px + 5px * var(--block-spacing, 1));min-width:0;flex:1}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__main:has(.kaching-bundles__swatch-buttons){overflow-x:auto}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__content{display:flex;align-items:center;gap:5px 15px;flex-wrap:wrap;min-width:0;flex:1}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__image{display:flex;flex-shrink:0;width:auto;height:var(--kaching-deal-bar-progressive-gift-image-size, 40px);border-radius:var(--kaching-deal-bar-progressive-gift-corner-radius, 0)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__text{color:var(--kaching-deal-bar-progressive-gift-text-color, #000);font-size:var(--kaching-deal-bar-progressive-gift-text-size, 14px)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__deal-bar-progressive-gift__text{color:var(--kaching-deal-bar-progressive-gift-selected-text-color, #fff);font-weight:500}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__labels{display:flex;align-items:center;gap:5px}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__label{background-color:var(--kaching-deal-bar-progressive-gift-label-background-color);color:var(--kaching-deal-bar-progressive-gift-label-text-color);font-size:var(--kaching-deal-bar-progressive-gift-label-text-size, 12px);padding:2px 8px;border-radius:16px;white-space:nowrap;font-weight:500}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__label-crossed-out{text-decoration:line-through}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__lock-icon{display:flex;align-items:center;justify-content:center;color:var(--kaching-deal-bar-progressive-gift-locked-icon-color, #667085)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift__lock-icon svg{width:auto;height:100%}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift--locked .kaching-bundles__deal-bar-progressive-gift__text{color:var(--kaching-deal-bar-progressive-gift-locked-text-color, #555);font-size:var(--kaching-deal-bar-progressive-gift-locked-text-size, 14px)}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift--out-of-stock{opacity:.3}.kaching-bundles .kaching-bundles__deal-bar-progressive-gift--locked .kaching-bundles__deal-bar-progressive-gift__label{background-color:var(--kaching-deal-bar-progressive-gift-locked-label-background-color);color:var(--kaching-deal-bar-progressive-gift-locked-label-text-color);font-size:var(--kaching-deal-bar-progressive-gift-locked-label-text-size, 12px)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__deal-bar-progressive-gift{margin-inline:2px;padding-block:7px 6px;padding-inline:7px calc(15px * var(--block-spacing, 1) + 4px);background-color:var(--bar-selected-border-color)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__deal-bar-progressive-gift:last-child{margin-block-end:2px;border-end-start-radius:calc(var(--bar-border-radius) - 2px);border-end-end-radius:calc(var(--bar-border-radius) - 2px)}.kaching-bundles .kaching-bundles__product-personalisation{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;gap:10px;background-color:#fafafa;border-radius:calc(var(--bar-border-radius, 10px) - 4px);border:1px dashed #d6d6d6;margin-top:12px;cursor:pointer}.kaching-bundles .kaching-bundles__product-personalisation--filled{border-style:solid}.kaching-bundles .kaching-bundles__product-personalisation__main{display:flex;align-items:center;gap:10px;min-width:0;flex:1}.kaching-bundles .kaching-bundles__product-personalisation__image-wrapper{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--kaching-product-personalisation-image-height, 40px);height:var(--kaching-product-personalisation-image-height, 40px);background-color:#fff;border-radius:calc(var(--bar-border-radius, 10px) - 6px);border:1px solid #d6d6d6}.kaching-bundles .kaching-bundles__product-personalisation__image{display:flex;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.kaching-bundles .kaching-bundles__product-personalisation__image--default{width:70%;height:70%;-o-object-fit:contain;object-fit:contain;opacity:.7;color:#000}.kaching-bundles .kaching-bundles__product-personalisation__content{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.kaching-bundles .kaching-bundles__product-personalisation__title{color:#000;font-size:14px;font-weight:600;font-style:normal}.kaching-bundles .kaching-bundles__product-personalisation__subtitle{color:#555;font-size:13px;font-weight:400;font-style:normal}.kaching-bundles .kaching-bundles__product-personalisation__pricing{display:flex;flex-direction:column;align-items:flex-end;flex-shrink:0;gap:2px}.kaching-bundles .kaching-bundles__product-personalisation__price{font-size:14px;font-weight:500;font-style:normal;color:#000}.kaching-bundles .kaching-bundles__product-personalisation__compare-at-price{font-size:12px;font-weight:400;font-style:normal;color:#888;line-height:1.2;text-decoration:line-through}.kaching-bundles .kaching-bundles__product-personalisation__price .kaching-bundles__product-personalisation__unit-label{font-size:calc(var(--kaching-bundles-unit-label-font-size, 14px) - 4px);font-weight:var(--kaching-bundles-unit-label-font-weight, normal);font-style:var(--kaching-bundles-unit-label-font-style, normal)}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__product-personalisation{flex-direction:column;align-items:stretch;text-align:center}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__product-personalisation__main{flex-direction:column}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__product-personalisation__pricing{flex-direction:row;justify-content:center;gap:8px;align-items:baseline}.kaching-bundles .kaching-bundles__personalisation-modal-overlay{position:fixed;z-index:9999;inset:0;display:flex;align-items:center;overflow-y:auto;padding:10px;text-align:start;line-height:1.4;background-color:var(--kaching-product-personalisation-overlay-color, rgba(0, 0, 0, .5))}.kaching-bundles .kaching-bundles__personalisation-modal-overlay--inline{position:relative;z-index:auto;inset:auto;padding:20px;border-radius:var(--kaching-product-personalisation-radius, 16px)}.kaching-bundles .kaching-bundles__personalisation-modal-overlay__content{position:relative;z-index:10000;margin:auto;min-width:min(470px,95%);max-width:700px;width:100%}.kaching-bundles .kaching-bundles__personalisation-modal{display:flex;flex-direction:column;padding:var(--kaching-product-personalisation-gap-0, 20px);border-radius:var(--kaching-product-personalisation-radius, 16px);background-color:#fff}.kaching-bundles .kaching-bundles__personalisation-modal__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--kaching-product-personalisation-gap-0, 20px);color:var(--kaching-product-personalisation-primary-text-color, rgb(0, 0, 0))}.kaching-bundles .kaching-bundles__personalisation-modal__heading{margin:0;font-weight:650;font-size:var(--kaching-product-personalisation-font-0, 24px)}.kaching-bundles .kaching-bundles__personalisation-modal__close{all:unset;display:flex;align-items:center;justify-content:center;margin-inline-end:-6px;width:24px;height:24px;cursor:pointer}.kaching-bundles .kaching-bundles__personalisation-modal__items{display:flex;flex-direction:column;gap:var(--kaching-product-personalisation-gap-1, 16px);padding:var(--kaching-product-personalisation-gap-1, 16px);border:1px solid #e9e9e9;border-radius:calc(var(--kaching-product-personalisation-radius, 16px) - 4px)}.kaching-bundles .kaching-bundles__personalisation-modal__item{display:flex;flex-direction:column;gap:var(--kaching-product-personalisation-gap-2, 12px)}.kaching-bundles .kaching-bundles__personalisation-modal__item-info{display:flex;align-items:center;gap:var(--kaching-product-personalisation-gap-2, 12px)}.kaching-bundles .kaching-bundles__personalisation-modal__item-image-wrapper{flex-shrink:0;width:var(--kaching-product-personalisation-image-size, 48px);height:var(--kaching-product-personalisation-image-size, 48px);border-radius:calc(var(--kaching-product-personalisation-radius, 16px) - 4px - 4px);border:1px solid #e9e9e9;overflow:hidden}.kaching-bundles .kaching-bundles__personalisation-modal__item-image{width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.kaching-bundles .kaching-bundles__personalisation-modal__item-details{display:flex;flex-direction:column;gap:2px;min-width:0}.kaching-bundles .kaching-bundles__personalisation-modal__item-title{font-size:var(--kaching-product-personalisation-text-size, 16px);font-weight:600;color:var(--kaching-product-personalisation-primary-text-color, rgb(0, 0, 0))}.kaching-bundles .kaching-bundles__personalisation-modal__item-variant{font-size:var(--kaching-product-personalisation-font-3, 12px);color:var(--kaching-product-personalisation-secondary-text-color, rgb(115, 115, 115))}.kaching-bundles .kaching-bundles__personalisation-modal__input-wrapper{display:flex;flex-direction:column;gap:4px}.kaching-bundles .kaching-bundles__personalisation-modal__input-container{position:relative;display:flex;align-items:center}.kaching-bundles .kaching-bundles__personalisation-modal__input-clear{all:unset;position:absolute;right:12px;display:flex;align-items:center;justify-content:center;width:16px;height:16px;cursor:pointer}.kaching-bundles .kaching-bundles__personalisation-modal__input{width:100%;padding:10px 12px;border:1px solid #e9e9e9;border-radius:calc(var(--kaching-product-personalisation-radius, 16px) - 4px - 4px);font-size:var(--kaching-product-personalisation-font-2, 16px);outline:none!important;box-shadow:none!important;box-sizing:border-box}.kaching-bundles .kaching-bundles__personalisation-modal__input:focus{border-color:#333;outline:none!important;box-shadow:none!important}.kaching-bundles .kaching-bundles__personalisation-modal__input:focus-visible{outline:2px solid #333!important;outline-offset:-1px}.kaching-bundles .kaching-bundles__personalisation-modal__input::-moz-placeholder{color:#999}.kaching-bundles .kaching-bundles__personalisation-modal__input::placeholder{color:#999}.kaching-bundles .kaching-bundles__personalisation-modal__input--with-clear{padding-right:40px}.kaching-bundles .kaching-bundles__personalisation-modal__input--error{border-color:var(--kaching-product-personalisation-error-color, rgb(240, 68, 56))}.kaching-bundles .kaching-bundles__personalisation-modal__input--error:focus{border-color:var(--kaching-product-personalisation-error-color, rgb(240, 68, 56))}.kaching-bundles .kaching-bundles__personalisation-modal__input-counter{font-size:var(--kaching-product-personalisation-font-3, 12px);color:#999}.kaching-bundles .kaching-bundles__personalisation-modal__input-counter--error{color:var(--kaching-product-personalisation-error-color, rgb(240, 68, 56))}.kaching-bundles .kaching-bundles__personalisation-modal__actions{display:flex;gap:var(--kaching-product-personalisation-gap-1, 16px);margin-top:var(--kaching-product-personalisation-gap-0, 20px)}.kaching-bundles .kaching-bundles__personalisation-modal__button{flex:1;padding:12px 16px;border-radius:calc(var(--kaching-product-personalisation-radius, 16px) - 4px - 4px);font-size:var(--kaching-product-personalisation-font-2, 16px);font-weight:500;cursor:pointer;border:none;box-shadow:0 1px 2px #0a0d120d}.kaching-bundles .kaching-bundles__personalisation-modal__button--cancel{background:#fff;color:#333;border:1px solid #d5d7da}.kaching-bundles .kaching-bundles__personalisation-modal__button--confirm{color:var(--kaching-product-personalisation-button-text-color, rgb(255, 255, 255));border:1px solid var(--kaching-product-personalisation-button-color, rgb(0, 0, 0));background:var(--kaching-product-personalisation-button-color, rgb(0, 0, 0))}.kaching-bundles .kaching-bundles__personalisation-modal__button--disabled{cursor:not-allowed;border:1px solid #e9eaeb;background:#eaecf0;color:#98a2b3}.kaching-bundles .kaching-bundles__progressive-gifts{display:flex;flex-direction:column;gap:calc(10px * var(--block-spacing, 1) + 4px);margin-top:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__progressive-gifts__header{display:flex;flex-direction:column}.kaching-bundles .kaching-bundles__progressive-gifts__title{color:var(--kaching-bundles-progressive-gifts-title-color, #000);text-align:var(--kaching-bundles-progressive-gifts-title-alignment, center);font-weight:var(--kaching-bundles-progressive-gifts-title-weight, bold);font-style:var(--kaching-bundles-progressive-gifts-title-style, normal);font-size:var(--kaching-bundles-progressive-gifts-title-size, 20px)}.kaching-bundles .kaching-bundles__progressive-gifts__subtitle{color:var(--kaching-bundles-progressive-gifts-subtitle-color, #000);text-align:var(--kaching-bundles-progressive-gifts-subtitle-alignment, center);font-weight:var(--kaching-bundles-progressive-gifts-subtitle-weight, 450);font-style:var(--kaching-bundles-progressive-gifts-subtitle-style, normal);font-size:var(--kaching-bundles-progressive-gifts-subtitle-size, 16px)}.kaching-bundles .kaching-bundles__progressive-gifts__gifts{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));justify-content:center;gap:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__progressive-gifts__gift{position:relative;display:flex;flex-direction:column;align-items:center;padding:calc(10px * var(--block-spacing, 1));gap:calc(6px * var(--block-spacing, 1));border-radius:var(--kaching-bundles-progressive-gifts-border-radius);background-color:var(--kaching-bundles-progressive-gifts-background-color);box-shadow:inset 0 0 0 2px var(--kaching-bundles-progressive-gifts-border-color, #000)}.kaching-bundles .kaching-bundles__progressive-gifts__gift.kaching-bundles__progressive-gifts__gift--locked{background-color:var(--kaching-bundles-progressive-gifts-locked-background-color);box-shadow:inset 0 0 0 1px var(--kaching-bundles-progressive-gifts-locked-border-color, rgba(0, 0, 0, .3));cursor:pointer}.kaching-bundles .kaching-bundles__progressive-gifts__gift.kaching-bundles__progressive-gifts__gift--locked:hover,.kaching-bundles .kaching-bundles__progressive-gifts__gift.kaching-bundles__progressive-gifts__gift--locked:focus{box-shadow:inset 0 0 0 2px var(--kaching-bundles-progressive-gifts-locked-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__progressive-gifts__gift.kaching-bundles__progressive-gifts__gift--locked:focus{outline:none}.kaching-bundles .kaching-bundles__progressive-gifts__gift.kaching-bundles__progressive-gifts__gift--out-of-stock{opacity:.3}.kaching-bundles .kaching-bundles__progressive-gifts__gift__content{display:flex;flex-direction:column;max-width:100%;gap:calc(6px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__progressive-gifts__gift__image-wrapper{display:flex;flex-shrink:0;align-items:center;justify-content:center;height:var(--kaching-bundles-progressive-gifts-image-size, 100px);width:initial;max-width:100%;margin-top:max(0px,(100px - var(--kaching-bundles-progressive-gifts-image-size, 100px)) / 5);color:var(--kaching-bundles-progressive-gifts-locked-icon-color, #667085);border-radius:calc(var(--kaching-bundles-progressive-gifts-border-radius) / 2);background-color:transparent}.kaching-bundles .kaching-bundles__progressive-gifts__gift__image-wrapper svg{width:auto;height:100%}.kaching-bundles .kaching-bundles__progressive-gifts__gift__image{-o-object-fit:contain;object-fit:contain;max-height:100%;max-width:100%;border-radius:calc(var(--kaching-bundles-progressive-gifts-border-radius) / 2);width:initial}.kaching-bundles .kaching-bundles__progressive-gifts__gift__details{display:flex;flex-direction:column;gap:4px;align-items:center;min-width:0}.kaching-bundles .kaching-bundles__progressive-gifts__gift__details__content{display:flex;align-items:center;gap:8px}.kaching-bundles .kaching-bundles__progressive-gifts__gift__title{font-weight:500;text-align:center;color:var(--kaching-bundles-progressive-gifts-text-color, #000);font-size:var(--kaching-bundles-progressive-gifts-text-size, 14px)}.kaching-bundles .kaching-bundles__progressive-gifts__gift__title.kaching-bundles__progressive-gifts__gift__title--locked{color:var(--kaching-bundles-progressive-gifts-locked-text-color, #555);font-size:var(--kaching-bundles-progressive-gifts-locked-text-size, 14px)}.kaching-bundles .kaching-bundles__progressive-gifts__gift:not(.kaching-bundles__progressive-gifts__gift--locked) .kaching-bundles__progressive-gifts__gift__image,.kaching-bundles .kaching-bundles__progressive-gifts__gift:not(.kaching-bundles__progressive-gifts__gift--locked) .kaching-bundles__progressive-gifts__gift__title{animation:kaching-progressive-gift-unlock .6s ease-out}@keyframes kaching-progressive-gift-unlock{0%{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}.kaching-bundles .kaching-bundles__progressive-gifts__gift__label{display:flex;flex-direction:row;align-items:center;position:absolute;top:-8px;left:50%;transform:translate(-50%);line-height:1;gap:calc(5px * var(--block-spacing, 1));padding:calc(8px * var(--block-spacing, 1));background-color:var(--kaching-bundles-progressive-gifts-label-background-color, #eee);border-radius:var(--kaching-bundles-progressive-gifts-border-radius)}.kaching-bundles .kaching-bundles__progressive-gifts__gift__label__text{font-weight:450;color:var(--kaching-bundles-progressive-gifts-label-text-color, #777);font-size:var(--kaching-bundles-progressive-gifts-label-text-size, 12px);white-space:nowrap}.kaching-bundles .kaching-bundles__progressive-gifts__gift__label__text.kaching-bundles__progressive-gifts__gift__label__text--crossed-out{text-decoration:line-through}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical{display:flex;flex-direction:column}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical .kaching-bundles__progressive-gifts__gift{flex-direction:row;justify-content:space-between;gap:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical .kaching-bundles__progressive-gifts__gift__content{flex-direction:row;align-items:center;gap:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical .kaching-bundles__progressive-gifts__gift__details{align-items:flex-start}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical .kaching-bundles__progressive-gifts__gift__image-wrapper{margin-top:0;height:var(--kaching-bundles-progressive-gifts-image-size, 50px);width:var(--kaching-bundles-progressive-gifts-image-size, 50px)}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical .kaching-bundles__progressive-gifts__gift__title{text-align:start}.kaching-bundles .kaching-bundles__progressive-gifts__gifts.kaching-bundles__progressive-gifts__gifts--vertical .kaching-bundles__progressive-gifts__gift__label{position:initial;transform:none}.kaching-bundles .kaching-bundles-savings-summary{display:flex;align-items:center;justify-content:var(--kaching-bundles-savings-summary-alignment, flex-start);gap:8px;padding:12px 16px;margin-top:calc(10px * var(--block-spacing, 1));background-color:var(--kaching-bundles-savings-summary-background-color, #f5fcf7);color:var(--kaching-bundles-savings-summary-text-color, #1b5933);border-style:solid;border-color:var(--kaching-bundles-savings-summary-border-color, #457757);border-width:var(--kaching-bundles-savings-summary-border-width, 1px);border-radius:var(--kaching-bundles-savings-summary-border-radius, 8px);font-size:var(--kaching-bundles-savings-summary-title-font-size, 14px);font-style:var(--kaching-bundles-savings-summary-title-font-style, normal);font-weight:var(--kaching-bundles-savings-summary-title-font-weight, 500)}.kaching-bundles .kaching-bundles-savings-summary__icon{display:flex;align-items:center;width:1.2em;height:1.2em;flex-shrink:0;color:var(--kaching-bundles-savings-summary-icon-color, #1c5632)}.kaching-bundles .kaching-bundles-savings-summary__icon svg{width:100%;height:100%}.kaching-bundles .kaching-bundles-savings-summary__icon img{width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.kaching-bundles .kaching-bundles-savings-summary__value{color:var(--kaching-bundles-savings-summary-value-color, #000000)}.kaching-bundles .kaching-bundles__scratch-off{position:relative;display:flex;flex-direction:column;gap:calc(10px * var(--block-spacing, 1));margin:calc(5px * var(--block-spacing, 1)) 0}.kaching-bundles .kaching-bundles__scratch-off>.kaching-bundles__bar{margin:0}.kaching-bundles .kaching-bundles__scratch-off--unscratched{-webkit-user-select:none;-moz-user-select:none;user-select:none}.kaching-bundles .kaching-bundles__scratch-off--unscratched .kaching-bundles__bar{pointer-events:none}.kaching-bundles .kaching-bundles__scratch-off--revealing .kaching-bundles__bar-most-popular{animation:kaching-scratch-off-badge-pop .3s cubic-bezier(.34,1.56,.64,1) both}@keyframes kaching-scratch-off-badge-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}.kaching-bundles .kaching-bundles__scratch-off--unscratched:not(.kaching-bundles__scratch-off--revealing) .kaching-bundles__bar-most-popular{visibility:hidden}.kaching-bundles .kaching-bundles__scratch-off--loading{visibility:hidden}.kaching-bundles .kaching-bundles__scratch-off-canvas{position:absolute;inset:0;width:100%;height:100%;border-radius:var(--bar-border-radius, 8px);cursor:pointer;touch-action:none;transition:opacity .3s ease-out;z-index:11}.kaching-bundles .kaching-bundles__scratch-off-canvas--revealing{opacity:0;pointer-events:none}.kaching-bundles .kaching-bundles__scratch-off-hint{position:absolute;inset:0;margin:auto;width:calc(100% - 10px);height:calc(100% - 10px);max-width:317px;max-height:143px;pointer-events:none;opacity:.4;transition:opacity .3s ease-out;z-index:12}.kaching-bundles .kaching-bundles__scratch-off-hint--hidden{opacity:0}.kaching-bundles .kaching-bundles__scratch-off-hint-path{stroke-dasharray:1200;stroke-dashoffset:1200;animation:kaching-scratch-off-hint-draw 2.8s cubic-bezier(.4,0,.2,1) infinite}@keyframes kaching-scratch-off-hint-draw{0%{stroke-dashoffset:1200;opacity:1}60%{stroke-dashoffset:0;opacity:1}80%{stroke-dashoffset:0;opacity:1}to{stroke-dashoffset:0;opacity:0}}.kaching-bundles .kaching-bundles__scratch-off-title{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;color:var(--scratch-off-title-color);font-weight:700;font-size:var(--scratch-off-title-size);line-height:1.25;text-align:center;pointer-events:none;transition:opacity .3s ease-out;z-index:12}.kaching-bundles .kaching-bundles__scratch-off-title--hidden{opacity:0}.kaching-bundles .kaching-bundles-sticky-atc{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px;box-shadow:0 0 10px #00000040;background-color:var(--kaching-bundles-sticky-atc-background-color, #fff)}.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__content{display:flex;align-items:center;gap:16px}.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__image{display:var(--kaching-bundles-sticky-atc-image-display, block);width:auto;height:var(--kaching-bundles-sticky-atc-product-photo-size, 40px);border-radius:var(--kaching-bundles-sticky-atc-product-photo-corner-radius, 0)}.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__title{color:var(--kaching-bundles-sticky-atc-title-color, #000);font-size:var(--kaching-bundles-sticky-atc-title-font-size, 16px);font-style:var(--kaching-bundles-sticky-atc-title-font-style, normal);font-weight:var(--kaching-bundles-sticky-atc-title-font-weight, 400)}.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__button{all:unset;white-space:nowrap;cursor:pointer;background-color:var(--kaching-bundles-sticky-atc-button-color, #303030);color:var(--kaching-bundles-sticky-atc-button-text-color, #fff);font-size:var(--kaching-bundles-sticky-atc-button-font-size, 16px);font-style:var(--kaching-bundles-sticky-atc-button-font-style, normal);font-weight:var(--kaching-bundles-sticky-atc-button-font-weight, 400);padding:var(--kaching-bundles-sticky-atc-button-padding, 15px);border-radius:var(--kaching-bundles-sticky-atc-button-corner-radius, 8px)}@media (width < 750px){.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__image{display:var(--kaching-bundles-sticky-atc-image-display-mobile, var(--kaching-bundles-sticky-atc-image-display, block));height:var(--kaching-bundles-sticky-atc-product-photo-size-mobile, var(--kaching-bundles-sticky-atc-product-photo-size, 40px));border-radius:var(--kaching-bundles-sticky-atc-product-photo-corner-radius-mobile, var(--kaching-bundles-sticky-atc-product-photo-corner-radius, 0))}.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__title{font-size:var(--kaching-bundles-sticky-atc-title-font-size-mobile, var(--kaching-bundles-sticky-atc-title-font-size, 16px))}.kaching-bundles .kaching-bundles-sticky-atc .kaching-bundles-sticky-atc__button{font-size:var(--kaching-bundles-sticky-atc-button-font-size-mobile, var(--kaching-bundles-sticky-atc-button-font-size, 16px));padding:var(--kaching-bundles-sticky-atc-button-padding-mobile, var(--kaching-bundles-sticky-atc-button-padding, 15px));border-radius:var(--kaching-bundles-sticky-atc-button-corner-radius-mobile, var(--kaching-bundles-sticky-atc-button-corner-radius, 8px))}}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__bars--horizontal.kaching-bundles__bars{grid-template-columns:repeat(2,1fr)}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__bars--horizontal .kaching-bundles__bar-wrapper{padding:10px 7px}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__bars--horizontal .kaching-bundles__bar-main{min-height:initial}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__subscriptions--checkbox .kaching-bundles__bar-container{border:2px dashed var(--bar-selected-border-color, #000);box-shadow:none}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__subscriptions--checkbox .kaching-bundles__bar-wrapper{margin:-2px}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__subscriptions--checkbox .kaching-bundles__bar-variants{display:flex}.kaching-bundles .kaching-bundles__subscriptions .kaching-bundles__subscriptions__title{display:inline-block;overflow-wrap:break-word;font-weight:700;font-size:var(--kaching-subscriptions-title-font-size, 15px);color:var(--kaching-subscriptions-title-color, #000)}.kaching-bundles .kaching-bundles__subscriptions .kaching-bundles__subscriptions__subtitle{display:inline-block;overflow-wrap:break-word;font-size:var(--kaching-subscriptions-subtitle-font-size, 13px);color:var(--kaching-subscriptions-subtitle-color, #555)}.kaching-bundles .kaching-bundles__subscriptions .kaching-bundles__bar-price{font-size:var(--kaching-subscriptions-title-font-size, 15px);color:var(--kaching-subscriptions-title-color, #000)}.kaching-bundles .kaching-bundles__subscriptions .kaching-bundles__bar-full-price{font-size:var(--kaching-subscriptions-subtitle-font-size, 13px);color:var(--kaching-subscriptions-subtitle-color, #555)}.kaching-bundles .kaching-bundles__subscriptions .kaching-bundles__subscriptions__checkbox{all:unset;display:flex;flex-shrink:0;width:20px;height:20px;align-items:center;justify-content:center;cursor:pointer;background-color:#fff;color:var(--bar-selected-border-color);border-width:2px;border-style:solid;border-color:var(--bar-selected-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__subscriptions.kaching-bundles__subscriptions--link{display:flex;justify-content:center;align-items:center;padding:8px 0}.kaching-bundles .kaching-bundles__subscriptions .kaching-bundles__subscriptions__link{all:unset;cursor:pointer;display:inline;text-decoration:underline;text-underline-offset:3px;font-size:var(--kaching-subscriptions-title-font-size, 15px);color:var(--kaching-subscriptions-title-color, #000)}.kaching-bundles .kaching-bundles__timer{display:flex;align-items:center;background-color:var(--kaching-bundles-timer-background-color, #000);color:var(--kaching-bundles-timer-text-color, #fff);padding:10px 20px;border-radius:var(--bar-border-radius, 8px);margin-bottom:calc(8px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__timer-title{flex:1;text-align:var(--kaching-bundles-timer-title-alignment, center);font-size:var(--kaching-bundles-timer-title-size, 13px);font-weight:var(--kaching-bundles-timer-title-font-weight, bold);font-style:var(--kaching-bundles-timer-title-font-style, normal)}.kaching-bundles .kaching-bundles__swatch-dropdown{display:flex;position:relative;min-width:0;margin:0}.kaching-bundles .kaching-bundles__swatch{display:flex;flex-shrink:0;background-size:cover;background-position:center;overflow:hidden;position:relative;width:var(--kaching-swatch-size, 20px);height:var(--kaching-swatch-size, 20px);border:1px solid var(--kaching-swatch-border-color, #c2cdd6);background-color:var(--kaching-swatch-color, #fff);background-image:var(--kaching-swatch-image-url, none);border-radius:var(--kaching-swatch-border-radius, 0)}.kaching-bundles .kaching-bundles__swatch.kaching-bundles__swatch--unavailable{border-color:#121212;opacity:.4}.kaching-bundles .kaching-bundles__swatch.kaching-bundles__swatch--unavailable:after{content:"";position:absolute;bottom:0;left:0;width:140%;height:1px;background-color:#121212;transform:rotate(-45deg);transform-origin:left}.kaching-bundles .kaching-bundles__swatches-dropdown__color{display:flex;width:20px;height:20px;border:1px solid #c2cdd6;background-size:cover;background-position:center}.kaching-bundles .kaching-bundles__swatch-dropdown__options{display:flex;flex-direction:column;max-width:400px;max-height:500px;overflow:auto;position:fixed;top:0;left:0;border:1px solid #ccc;background-color:#fff;z-index:1000;box-shadow:0 20px 20px #1a1a1a47}.kaching-bundles .kaching-bundles__swatch-dropdown__option{font-size:14px;font-weight:400;font-style:normal;display:flex;align-items:center;gap:10px;white-space:nowrap;padding-block:10px;padding-inline:10px 60px;border:none;border-bottom:1px solid #dfe3e8;cursor:pointer;color:#000;background:none}.kaching-bundles .kaching-bundles__swatch-dropdown__option:last-child{border-bottom:none}.kaching-bundles .kaching-bundles__swatch-dropdown__option:hover,.kaching-bundles .kaching-bundles__swatch-dropdown__option--focused{background-color:#f0f0f0}.kaching-bundles .kaching-bundles__swatch-buttons{display:flex;overflow:auto}.kaching-bundles .kaching-bundles__swatch-buttons__button{display:flex;align-items:center;box-sizing:border-box;border:none;padding:9px;background:#fff;cursor:pointer;border-top:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-bottom:1px solid var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__swatch-buttons__button:first-of-type{border-start-start-radius:var(--bar-variant-select-border-radius, 0);border-end-start-radius:var(--bar-variant-select-border-radius, 0);border-inline-start:1px solid var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__swatch-buttons__button:last-of-type{border-start-end-radius:var(--bar-variant-select-border-radius, 0);border-end-end-radius:var(--bar-variant-select-border-radius, 0);border-inline-end:1px solid var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__swatch-buttons__button.kaching-bundles__swatch-buttons__button--selected{padding:8px 7px;border:2px solid var(--bar-selected-border-color, #50b83c)}.kaching-bundles .kaching-bundles__swatch-buttons__button.kaching-bundles__swatch-buttons__button--selected:first-of-type{padding-inline-start:8px}.kaching-bundles .kaching-bundles__swatch-buttons__button.kaching-bundles__swatch-buttons__button--selected:last-of-type{padding-inline-end:8px}.kaching-bundles .kaching-bundles__bar-variant__content.kaching-bundles__bar-variant__content--with-option-names{align-items:flex-start}.kaching-bundles .kaching-bundles__bar-variant-option{display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-width:0;max-width:100%}.kaching-bundles .kaching-bundles__bar-variant-option__name{font-size:13px;line-height:1.3}.kaching-bundles .kaching-bundles__bar-variant-option__name-label{font-weight:600}.kaching-bundles .kaching-bundles__bar-variant-option__name-value{font-weight:400;opacity:.85}.kaching-bundles .kaching-bundles__quantity-selector{display:flex;width:-moz-fit-content;width:fit-content;border:1px solid #cccccc;box-sizing:border-box;overflow:hidden;margin-top:5px;border-radius:calc(var(--bar-border-radius, 0) / 2)}.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__button{display:flex;align-items:center;justify-content:center;width:30px;height:30px;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;background-color:#fff;color:#000;border-radius:0}.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__button:hover{background-color:#eee}.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__button.kaching-bundles__quantity-selector__button--disabled{cursor:not-allowed;pointer-events:none}.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__button.kaching-bundles__quantity-selector__button--disabled img{opacity:.5}.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__input{all:unset;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;height:30px;width:30px;padding:0;border:1px solid #cccccc;border-top:none;border-bottom:none;background-color:#fff;color:#000;text-align:center;font-size:16px;font-weight:400;box-sizing:border-box}.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__input::-webkit-outer-spin-button,.kaching-bundles .kaching-bundles__quantity-selector .kaching-bundles__quantity-selector__input::-webkit-inner-spin-button{-webkit-appearance:none;appearance:none;margin:0}.kaching-bundles .kaching-bundles__highlights{display:flex;flex-direction:column;gap:8px;padding:10px 0}.kaching-bundles .kaching-bundles__highlights--horizontal{flex-flow:row wrap}.kaching-bundles .kaching-bundles__highlights__item{display:flex;gap:8px}.kaching-bundles .kaching-bundles__highlights__icon{display:flex;align-items:center;flex-shrink:0;color:var(--kaching-highlights-icon-color, #000);width:var(--kaching-highlights-icon-size, 16px);height:var(--kaching-highlights-icon-size, 16px)}.kaching-bundles .kaching-bundles__highlights__icon svg{width:100%;height:100%}.kaching-bundles .kaching-bundles__highlights__icon img{width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.kaching-bundles .kaching-bundles__highlights__text{color:var(--kaching-highlights-text-color, #808080);font-size:var(--kaching-highlights-text-size, 16px);line-height:1.3}.kaching-bundles .kaching-bundles__low-stock-alert{color:var(--kaching-bundles-low-stock-alert-text-color, #ff0909);font-size:14px}.kaching-bundles img{width:initial}.kaching-bundles svg{width:initial;height:initial}.kaching-bundles .kaching-bundles__block{display:flex;flex-direction:column;width:100%;margin-top:15px;margin-bottom:10px;text-align:start;line-height:1.4;font-family:var(--block-font-family, inherit)}.kaching-bundles .kaching-bundles__block--hidden{display:none!important}.kaching-bundles .kaching-bundles__block.kaching-bundles__block--loaded{display:flex}.kaching-bundles .kaching-bundles__block-title{display:flex;align-items:center;text-align:center;gap:8px;margin-top:10px;margin-bottom:10px;color:var(--block-block-title-color, #000);font-size:var(--block-title-font-size, 14px);font-weight:var(--block-title-font-weight, bold);font-style:var(--block-title-font-style)}.kaching-bundles .kaching-bundles__block>.kaching-bundles__block-title:first-child{margin-top:0}.kaching-bundles .kaching-bundles__block-title:before,.kaching-bundles .kaching-bundles__block-title:after{content:"";flex-grow:1;height:2px;background-color:var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bars{display:flex;flex-direction:column;position:relative}.kaching-bundles .kaching-bundles__bars--badge-border-all{--badge-ring-outer: calc( var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px) );padding:var(--badge-ring-outer)}.kaching-bundles .kaching-bundles__bars--badge-border-top{padding-top:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bars--badge-border-bottom{padding-bottom:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bars--badge-border-left{padding-left:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bars--badge-border-right{padding-right:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bars--badge-border-left,.kaching-bundles .kaching-bundles__bars--badge-border-right{min-height:var(--badge-border-min-length, auto);border-radius:var(--bar-border-radius, 8px);box-shadow:0 1px 10px var(--badge-border-wrap-color, rgba(0, 0, 0, .12))}.kaching-bundles .kaching-bundles__bars--badge-border-all,.kaching-bundles .kaching-bundles__bars--badge-border-top,.kaching-bundles .kaching-bundles__bars--badge-border-bottom{row-gap:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__subscriptions-wrapper{position:relative}.kaching-bundles .kaching-bundles__bar{display:flex;flex:1;margin:calc(5px * var(--block-spacing, 1)) 0;position:relative}.kaching-bundles .kaching-bundles__bars--badge-border-all>.kaching-bundles__bar,.kaching-bundles .kaching-bundles__bars--badge-border-all>.kaching-bundles__scratch-off,.kaching-bundles .kaching-bundles__bars--badge-border-top>.kaching-bundles__bar,.kaching-bundles .kaching-bundles__bars--badge-border-top>.kaching-bundles__scratch-off,.kaching-bundles .kaching-bundles__bars--badge-border-bottom>.kaching-bundles__bar,.kaching-bundles .kaching-bundles__bars--badge-border-bottom>.kaching-bundles__scratch-off{margin-block:0}.kaching-bundles .kaching-bundles__bar--disabled{opacity:.3}.kaching-bundles .kaching-bundles__bar-container--sold-out{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--kaching-bundles-show-as-sold-out-opacity, .3)}.kaching-bundles .kaching-bundles__bar-sold-out-badge{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:6px 12px;border-radius:8px;font-weight:600;background-color:var(--kaching-bundles-show-as-sold-out-background-color, #000);color:var(--kaching-bundles-show-as-sold-out-text-color, #fff);font-size:var(--kaching-bundles-show-as-sold-out-text-size, 13px);z-index:10;text-align:center}.kaching-bundles .kaching-bundles__bar>input[type=radio]{display:none}.kaching-bundles .kaching-bundles__bar-image{-o-object-fit:contain;object-fit:contain;height:var(--bar-image-size, 48px);width:var(--bar-image-size, 48px);border-radius:var(--bar-image-border-radius, 0)}.kaching-bundles .kaching-bundles__bar-radio{display:flex;flex-shrink:0;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #fff;box-sizing:border-box;box-shadow:0 0 0 2px var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-radio{background:var(--bar-selected-border-color, #000);box-shadow:0 0 0 2px var(--bar-selected-border-color, #000)}.kaching-bundles .kaching-bundles__bar-container{display:flex!important;flex-direction:column;justify-content:center;align-items:initial;position:relative;box-sizing:border-box;cursor:pointer;width:100%;margin:0;padding:0;border:none;background-color:var(--bar-background-color, #fff);border-radius:var(--bar-border-radius);box-shadow:inset 0 0 0 1px var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bar-wrapper{padding:calc(10px * var(--block-spacing, 1)) calc(15px * var(--block-spacing, 1) + 5px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-left .kaching-bundles__bar-wrapper,.kaching-bundles .kaching-bundles__bar-container--badge-border-right .kaching-bundles__bar-wrapper{position:relative;z-index:1;flex:1;box-sizing:border-box;min-height:var(--badge-border-min-length, auto);padding:calc(10px * var(--block-spacing, 1)) calc(15px * var(--block-spacing, 1) + 5px);background-color:var(--bar-background-color, #fff);border-radius:var(--bar-border-radius);display:flex;flex-direction:column;justify-content:center}.kaching-bundles .kaching-bundles__bar-container--badge-border-left .kaching-bundles__bar-wrapper{margin-inline-start:calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px));border-start-start-radius:var(--badge-concave-depth, 8px);border-end-start-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-right .kaching-bundles__bar-wrapper{margin-inline-end:calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px));border-start-end-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container:hover{opacity:1;box-shadow:inset 0 0 0 2px var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bar-container:has(:focus-visible){opacity:1;box-shadow:inset 0 0 0 2px var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bar-container *{letter-spacing:normal;text-transform:initial}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container{cursor:default;background-color:var(--bar-selected-background-color);box-shadow:inset 0 0 0 2px var(--bar-selected-border-color, #000)}.kaching-bundles .kaching-bundles__bar-most-popular{position:absolute;z-index:3}.kaching-bundles .kaching-bundles__bar-most-popular.kaching-bundles__bar-most-popular--simple{top:-8px;right:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-most-popular.kaching-bundles__bar-most-popular--fancy{top:-27px;right:-15px}.kaching-bundles .kaching-bundles__bar-most-popular.kaching-bundles__bar-most-popular--custom{top:-25px;right:-15px}.kaching-bundles .kaching-bundles__bar-most-popular--custom .kaching-bundles__bar-most-popular__custom-image{max-height:var(--badge-size, 56px);width:auto;display:block}.kaching-bundles .kaching-bundles__bar-most-popular svg{color:var(--bar-most-popular-background-color)}.kaching-bundles .kaching-bundles__bar-most-popular svg .most-popular-text{fill:var(--bar-most-popular-color)}.kaching-bundles .kaching-bundles__bar-most-popular--fancy svg{width:var(--badge-size, 102px);height:auto}.kaching-bundles .kaching-bundles__bar-most-popular__content{margin:0 8px;padding:6px 8px;border-radius:0 0 5px 5px;font-family:sans-serif;font-size:var(--badge-text-size, 12px);font-weight:700;line-height:1;color:var(--bar-most-popular-color, #fff);background-color:var(--bar-most-popular-background-color)}.kaching-bundles .kaching-bundles__badge-border{position:absolute;z-index:1;display:flex;box-sizing:border-box;overflow:hidden;align-items:center;justify-content:center;font-family:sans-serif;font-size:max(6px,min(var(--badge-text-size, 12px),var(--badge-border-thickness, 22px) - 6px));font-weight:700;line-height:1;letter-spacing:normal;color:var(--bar-most-popular-color, #fff);background-color:var(--bar-most-popular-background-color, #000)}.kaching-bundles .kaching-bundles__badge-border--top{inset:0 0 auto;height:var(--badge-border-thickness, 22px);border-radius:var(--bar-border-radius, 8px) var(--bar-border-radius, 8px) 0 0}.kaching-bundles .kaching-bundles__badge-border--bottom{inset:auto 0 0;height:var(--badge-border-thickness, 22px);border-radius:0 0 var(--bar-border-radius, 8px) var(--bar-border-radius, 8px)}.kaching-bundles .kaching-bundles__badge-border--left{inset:0 auto 0 0;width:var(--badge-border-thickness, 22px);border-radius:var(--bar-border-radius, 8px) 0 0 var(--bar-border-radius, 8px)}.kaching-bundles .kaching-bundles__badge-border__side{position:absolute;display:flex;align-items:center;justify-content:center;overflow:hidden;white-space:nowrap}.kaching-bundles .kaching-bundles__badge-border .kaching-bundles__badge-border__text,.kaching-bundles .kaching-bundles__badge-border .kaching-bundles__badge-border__side{letter-spacing:normal}.kaching-bundles .kaching-bundles__badge-border__curve{position:absolute;inset:0;width:100%;height:100%}.kaching-bundles .kaching-bundles__badge-border__curve text{font-family:sans-serif;font-size:max(6px,min(var(--badge-text-size, 12px),var(--badge-border-thickness, 22px) - 6px));font-weight:700;letter-spacing:normal;fill:var(--bar-most-popular-color, #fff)}.kaching-bundles .kaching-bundles__badge-border--all{inset:0;background-color:transparent;pointer-events:none}.kaching-bundles .kaching-bundles__badge-border__band{display:block;position:absolute;inset:0;padding:var(--badge-border-thickness, 22px);border-radius:calc(var(--bar-border-radius, 8px) + var(--badge-ring-outer));background-color:var(--bar-most-popular-background-color, #000);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude}.kaching-bundles .kaching-bundles__badge-border__side--top{inset:0 0 auto;height:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__badge-border__side--bottom{inset:auto 0 0;height:var(--badge-border-thickness, 22px);transform:rotate(180deg)}.kaching-bundles .kaching-bundles__badge-border__side--left{inset:var(--badge-border-thickness, 22px) auto var(--badge-border-thickness, 22px) 0;width:var(--badge-border-thickness, 22px);writing-mode:vertical-rl;transform:rotate(180deg)}.kaching-bundles .kaching-bundles__badge-border__side--right{inset:var(--badge-border-thickness, 22px) 0 var(--badge-border-thickness, 22px) auto;width:var(--badge-border-thickness, 22px);writing-mode:vertical-rl}.kaching-bundles .kaching-bundles__badge-border--left .kaching-bundles__badge-border__text{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;text-align:center}.kaching-bundles .kaching-bundles__badge-border--right{inset:0 0 0 auto;width:var(--badge-border-thickness, 22px);border-radius:0 var(--bar-border-radius, 8px) var(--bar-border-radius, 8px) 0}.kaching-bundles .kaching-bundles__badge-border--right .kaching-bundles__badge-border__text{writing-mode:vertical-rl;white-space:nowrap;text-align:center}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--all{inset:calc(-1 * var(--badge-ring-outer))}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--top{inset:0 0 auto;height:calc(var(--badge-border-thickness, 22px) + var(--badge-concave-extra));border-radius:var(--bar-border-radius, 8px) var(--bar-border-radius, 8px) 0 0;display:flex;align-items:flex-start;justify-content:center;-webkit-mask:linear-gradient(#000,#000) left top/100% var(--badge-border-thickness, 22px) no-repeat,radial-gradient(circle at 100% 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left bottom/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat,radial-gradient(circle at 0 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right bottom/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat;mask:linear-gradient(#000,#000) left top/100% var(--badge-border-thickness, 22px) no-repeat,radial-gradient(circle at 100% 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left bottom/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat,radial-gradient(circle at 0 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right bottom/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--top .kaching-bundles__badge-border__text{display:flex;align-items:center;height:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--bottom{inset:auto 0 0;height:calc(var(--badge-border-thickness, 22px) + var(--badge-concave-extra));border-radius:0 0 var(--bar-border-radius, 8px) var(--bar-border-radius, 8px);display:flex;align-items:flex-end;justify-content:center;-webkit-mask:linear-gradient(#000,#000) left bottom/100% var(--badge-border-thickness, 22px) no-repeat,radial-gradient(circle at 100% 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left top/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat,radial-gradient(circle at 0 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right top/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat;mask:linear-gradient(#000,#000) left bottom/100% var(--badge-border-thickness, 22px) no-repeat,radial-gradient(circle at 100% 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left top/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat,radial-gradient(circle at 0 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right top/var(--badge-concave-depth, 8px) var(--badge-concave-extra) no-repeat}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--bottom .kaching-bundles__badge-border__text{display:flex;align-items:center;height:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--left{inset:0 auto 0 0;width:calc(var(--badge-border-thickness, 22px) + var(--badge-concave-extra));border-radius:var(--bar-border-radius, 8px) 0 0 var(--bar-border-radius, 8px);display:flex;align-items:center;justify-content:flex-start;-webkit-mask:linear-gradient(#000,#000) left top/var(--badge-border-thickness, 22px) 100% no-repeat,radial-gradient(circle at 100% 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right top/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat,radial-gradient(circle at 100% 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right bottom/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat;mask:linear-gradient(#000,#000) left top/var(--badge-border-thickness, 22px) 100% no-repeat,radial-gradient(circle at 100% 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right top/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat,radial-gradient(circle at 100% 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) right bottom/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--right{inset:0 0 0 auto;width:calc(var(--badge-border-thickness, 22px) + var(--badge-concave-extra));border-radius:0 var(--bar-border-radius, 8px) var(--bar-border-radius, 8px) 0;display:flex;align-items:center;justify-content:flex-end;-webkit-mask:linear-gradient(#000,#000) right top/var(--badge-border-thickness, 22px) 100% no-repeat,radial-gradient(circle at 0 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left top/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat,radial-gradient(circle at 0 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left bottom/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat;mask:linear-gradient(#000,#000) right top/var(--badge-border-thickness, 22px) 100% no-repeat,radial-gradient(circle at 0 100%,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left top/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat,radial-gradient(circle at 0 0,rgba(0,0,0,0) calc(var(--badge-concave-depth, 8px) - 1px),#000 var(--badge-concave-depth, 8px)) left bottom/var(--badge-concave-extra) var(--badge-concave-depth, 8px) no-repeat}.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--left .kaching-bundles__badge-border__text,.kaching-bundles .kaching-bundles__bar-container .kaching-bundles__badge-border--right .kaching-bundles__badge-border__text{display:flex;align-items:center;justify-content:center;width:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-all{--badge-ring-outer: calc( var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px) );margin:var(--badge-ring-outer)}.kaching-bundles .kaching-bundles__bar-container--badge-border-top,.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom,.kaching-bundles .kaching-bundles__bar-container--badge-border-left,.kaching-bundles .kaching-bundles__bar-container--badge-border-right{--badge-concave-extra: max( 0px, var(--badge-concave-depth, 8px) - var(--badge-border-gap, 0px) )}.kaching-bundles .kaching-bundles__bar-container--badge-border-top{box-shadow:none}.kaching-bundles .kaching-bundles__bar-container--badge-border-top:after{content:"";position:absolute;inset:calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px)) 0 0;border:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-top:var(--badge-border-gap-border, none);border-start-start-radius:var(--badge-concave-depth, 8px);border-start-end-radius:var(--badge-concave-depth, 8px);border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--bar-border-radius);pointer-events:none;z-index:2}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-top:after{border-width:2px;border-color:var(--bar-selected-border-color, #000)}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom{box-shadow:none}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom:after{content:"";position:absolute;inset:0 0 calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px));border:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-bottom:var(--badge-border-gap-border, none);border-start-start-radius:var(--bar-border-radius);border-start-end-radius:var(--bar-border-radius);border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--badge-concave-depth, 8px);pointer-events:none;z-index:2}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-bottom:after{border-width:2px;border-color:var(--bar-selected-border-color, #000)}.kaching-bundles .kaching-bundles__bar-container--badge-border-left,.kaching-bundles .kaching-bundles__bar-container--badge-border-right{box-shadow:none;background-color:transparent;min-height:var(--badge-border-min-length, auto)}.kaching-bundles .kaching-bundles__bar-container--badge-border-top:hover,.kaching-bundles .kaching-bundles__bar-container--badge-border-top:has(:focus-visible),.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom:hover,.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom:has(:focus-visible),.kaching-bundles .kaching-bundles__bar-container--badge-border-left:hover,.kaching-bundles .kaching-bundles__bar-container--badge-border-left:has(:focus-visible),.kaching-bundles .kaching-bundles__bar-container--badge-border-right:hover,.kaching-bundles .kaching-bundles__bar-container--badge-border-right:has(:focus-visible),.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-top,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-bottom,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-left,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-right{box-shadow:none}.kaching-bundles .kaching-bundles__bar-container--badge-border-left:after{content:"";position:absolute;inset:0 0 0 calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px));border:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-left:var(--badge-border-gap-border, none);border-start-start-radius:var(--badge-concave-depth, 8px);border-start-end-radius:var(--bar-border-radius);border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--bar-border-radius);pointer-events:none;z-index:2}.kaching-bundles .kaching-bundles__bar-container--badge-border-right:after{content:"";position:absolute;inset:0 calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px)) 0 0;border:1px solid var(--bar-border-color, rgba(0, 0, 0, .3));border-right:var(--badge-border-gap-border, none);border-start-start-radius:var(--bar-border-radius);border-start-end-radius:var(--badge-concave-depth, 8px);border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--badge-concave-depth, 8px);pointer-events:none;z-index:2}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-left:after,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-right:after{border-width:2px;border-color:var(--bar-selected-border-color, #000)}.kaching-bundles .kaching-bundles__bar-most-popular__content:before,.kaching-bundles .kaching-bundles__bar-most-popular__content:after{display:block;position:absolute;top:0;width:0;height:0;content:"";border-bottom:8px solid var(--bar-most-popular-background-color, transparent);filter:brightness(.7)}.kaching-bundles .kaching-bundles__bar-most-popular__content:before{left:0;border-left:8px solid transparent}.kaching-bundles .kaching-bundles__bar-most-popular__content:after{right:0;border-right:8px solid transparent}@media (width >= 750px){.kaching-bundles .kaching-bundles__bar-most-popular.kaching-bundles__bar-most-popular--fancy,.kaching-bundles .kaching-bundles__bar-most-popular.kaching-bundles__bar-most-popular--custom{right:-20px}}.kaching-bundles .kaching-bundles__bar-main{display:flex;align-items:center;gap:18px;min-height:55px}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-main{cursor:pointer}.kaching-bundles .kaching-bundles__bar-content{align-items:center;justify-content:space-between;display:flex;gap:8px;flex:1}.kaching-bundles .kaching-bundles__bar-content-left{display:flex;flex-direction:column;flex:1;align-items:flex-start}.kaching-bundles .kaching-bundles__bar-first-line{display:flex;flex-wrap:wrap;-moz-column-gap:8px;column-gap:8px;align-items:center}.kaching-bundles .kaching-bundles__bar-second-line{display:flex;flex-wrap:wrap;align-items:center;-moz-column-gap:10px;column-gap:10px}.kaching-bundles .kaching-bundles__bar-title{display:inline-block;overflow-wrap:break-word;font-size:var(--bar-title-font-size, 20px);font-weight:var(--bar-title-font-weight, 500);font-style:var(--bar-title-font-style);color:var(--bar-title-color, #000)}.kaching-bundles .kaching-bundles__bar-label{display:inline-flex;align-items:center;justify-content:center;gap:4px;vertical-align:top;padding:4px 8px;overflow-wrap:break-word;background-color:var(--bar-label-background-color, #eee);color:var(--bar-label-color, #777);font-size:var(--bar-label-font-size, 12px);font-weight:var(--bar-label-font-weight);font-style:var(--bar-label-font-style);border-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-subtitle{overflow-wrap:break-word;font-size:var(--bar-subtitle-font-size, 14px);font-weight:var(--bar-subtitle-font-weight);font-style:var(--bar-subtitle-font-style);color:var(--bar-subtitle-color, #555)}.kaching-bundles .kaching-bundles__bar-pricing{align-items:flex-end;display:flex;flex-direction:column}.kaching-bundles .kaching-bundles__bars--hide-prices .kaching-bundles__bar-pricing{display:none}.kaching-bundles .kaching-bundles__bar-pricing-row{display:flex;align-items:baseline;gap:6px}.kaching-bundles .kaching-bundles__bar-price{font-size:var(--bar-title-font-size, 20px);font-weight:var(--bar-title-font-weight, 500);font-style:var(--bar-title-font-style);color:var(--bar-price-color, #000)}.kaching-bundles .kaching-bundles__bar-price .kaching-bundles__bar-price__unit-label{font-size:var(--kaching-bundles-unit-label-font-size, 14px);font-weight:var(--kaching-bundles-unit-label-font-weight, normal);font-style:var(--kaching-bundles-unit-label-font-style)}.kaching-bundles .kaching-bundles__bar-pricing-row--secondary .kaching-bundles__bar-price{font-size:var(--bar-subtitle-font-size)}.kaching-bundles .kaching-bundles__bar-full-price,.kaching-bundles .kaching-bundles__bar-unit-price{font-size:var(--bar-subtitle-font-size, 14px);font-weight:var(--bar-subtitle-font-weight);font-style:var(--bar-subtitle-font-style);color:var(--bar-full-price-color, #555)}.kaching-bundles .kaching-bundles__bar-full-price{text-decoration:line-through}.kaching-bundles .kaching-bundles__bar-unit-price{text-transform:uppercase}.kaching-bundles .kaching-bundles__bar-variants{display:none;flex-direction:column;align-items:flex-start}.kaching-bundles .kaching-bundles__bar-variant{flex:1;max-width:100%}.kaching-bundles .kaching-bundles__bar-variants .kaching-bundles__bar-variant{margin-top:5px}.kaching-bundles .kaching-bundles__bar-variant__content{display:flex;align-items:center}.kaching-bundles .kaching-bundles__invalid-variant-error{color:red;font-size:12px;padding-bottom:2px}.kaching-bundles .kaching-bundles__bar-variant-names{font-size:12px;color:var(--bar-subtitle-color, #555);margin-block:3px}.kaching-bundles .kaching-bundles__bar-variant-names>span:not(:last-child):after{content:", "}.kaching-bundles .kaching-bundles__bar-variant-number{font-size:12px;margin-right:2px;min-width:20px;display:inline-flex;color:var(--bar-title-color, #000)}.kaching-bundles .kaching-bundles__bar-variant-image{width:initial;max-width:40px;max-height:40px;border-radius:calc(var(--bar-border-radius, 0) / 2);margin-right:7px}.kaching-bundles .kaching-bundles__bar-variant-main{display:flex;flex-direction:column;min-width:0}.kaching-bundles .kaching-bundles__bar-variant-selects{display:flex;min-width:0;margin-right:2px;margin-bottom:2px;flex-wrap:wrap;gap:7px}.kaching-bundles .kaching-bundles__bar-variant-select{font-size:14px;font-weight:400;font-style:normal;font-family:var(--block-font-family, inherit);-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;padding:7px 25px 7px 7px;margin:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;background-image:url("data:image/svg+xml;utf8,<svg width='10' height='4' viewBox='0 0 10 4' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 4L0.669872 0.25L9.33013 0.249999L5 4Z' fill='black'/></svg>")!important;background-repeat:no-repeat!important;background-position:right 8px center!important;background-color:#fff;background-size:initial;color:#000;outline:none;max-width:100%;width:auto;height:auto;min-height:auto;display:flex;align-items:center;gap:10px;cursor:pointer;box-shadow:inset 0 0 0 1px var(--bar-border-color, rgba(0, 0, 0, .3));border-radius:var(--bar-variant-select-border-radius, 0)}.kaching-bundles .kaching-bundles__bar-variant-select span{overflow:hidden;text-overflow:ellipsis}.kaching-bundles .kaching-bundles__bar-variant-selector-wrapper{display:flex;flex-wrap:wrap;align-items:center;-moz-column-gap:10px;column-gap:10px;max-width:100%}.kaching-bundles .kaching-bundles__selling-plan-select{width:100%}.kaching-bundles .kaching-bundles__bar-selling-plan{margin-top:5px;margin-bottom:5px}.kaching-bundles .kaching-bundles__bar-variant--invalid .kaching-bundles__bar-variant-select{box-shadow:0 0 0 1px red}.kaching-bundles .kaching-bundles__bar-variant-select:hover{border:none;box-shadow:inset 0 0 0 2px var(--bar-border-color, rgba(0, 0, 0, .3))}.kaching-bundles .kaching-bundles__bar-variant-select:focus{border:none;box-shadow:inset 0 0 0 2px var(--bar-selected-border-color, #000)}.kaching-bundles .kaching-bundles__bar-variant--invalid .kaching-bundles__bar-variant-select:is(:hover,:focus){box-shadow:0 0 0 2px red}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-variants,.kaching-bundles .kaching-bundles__bar-variants--visible{display:flex}.kaching-bundles .kaching-bundles__out-of-stock{background-color:#ff2d2d4d;border:1px solid #ff2c2c;color:#df2121;padding:8px 12px;margin:5px 0;font-size:14px}.kaching-bundles .kaching-bundles__bars--horizontal.kaching-bundles__bars{display:grid;grid-template-columns:repeat(var(--bundle-bars-per-row, 3),1fr);gap:calc(10px * var(--block-spacing, 1));overflow-x:auto}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar{position:relative}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 7px 10px;height:100%}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-main{flex-direction:column;gap:10px;text-align:center}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-content{flex-direction:column}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-content-left{align-items:center}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-second-line{justify-content:center}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-label{position:absolute;top:0;left:0;right:0;margin-right:0;border-top-left-radius:var(--bar-label-border-top-radius);border-top-right-radius:var(--bar-label-border-top-radius)}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-pricing{align-items:center}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-variants{align-items:center;margin-top:10px;margin-bottom:5px}.kaching-bundles .kaching-bundles__bars--horizontal .kaching-bundles__bar-variant-selector-wrapper{justify-content:center}.kaching-bundles .kaching-bundles__bars--grid.kaching-bundles__bars{display:grid;grid-template-columns:repeat(2,1fr);gap:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__bars--grid .kaching-bundles__bar-main{min-height:initial}.kaching-bundles .kaching-bundles__bars--grid .kaching-bundles__bar{margin:0}.kaching-bundles .kaching-bundles__bars--grid .kaching-bundles__bar-radio{display:none}.kaching-bundles .kaching-bundles__bars--plain .kaching-bundles__bar-container,.kaching-bundles .kaching-bundles__bars--plain .kaching-bundles__bar-container:hover,.kaching-bundles .kaching-bundles__bars--plain .kaching-bundles__bar--selected .kaching-bundles__bar-container{box-shadow:none}.kaching-bundles .kaching-bundles__bars--plain .kaching-bundles__bar-main{min-height:initial}.kaching-bundles .kaching-bundles__bars--plain .kaching-bundles__bar-pricing{flex-direction:row;gap:10px}.kaching-bundles .kaching-bundles__bar-container:has(.kaching-bundles__bar-most-popular--simple) .kaching-bundles__bar-main{margin-top:7px;margin-bottom:7px}.kaching-bundles .kaching-bundles__bar-container:has(.kaching-bundles__bar-most-popular--fancy) .kaching-bundles__bar-pricing{margin-top:18px}.kaching-bundles .kaching-bundles__bar-container:has(.kaching-bundles__bar-most-popular--custom) .kaching-bundles__bar-pricing{margin-top:18px}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container:has(.kaching-bundles__bar-most-popular--simple) .kaching-bundles__bar-variants{margin-top:-7px}.kaching-bundles .kaching-bundles__bar-full-price:before,.kaching-bundles .kaching-bundles__bar-price:before{content:attr(data-a11y-label);position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media (prefers-reduced-motion: reduce){.kaching-bundles *,.kaching-bundles *:before,.kaching-bundles *:after{transition-duration:.01ms!important;animation-duration:.01ms!important}}.kaching-bundles .kaching-bundles__bars--badge-border-all .kaching-bundles__subscriptions-wrapper .kaching-bundles__bar,.kaching-bundles .kaching-bundles__bars--badge-border-top .kaching-bundles__subscriptions-wrapper .kaching-bundles__bar,.kaching-bundles .kaching-bundles__bars--badge-border-bottom .kaching-bundles__subscriptions-wrapper .kaching-bundles__bar{margin-block:0}.kaching-bundles .kaching-bundles__bars--badge-border-all .kaching-bundles__subscriptions-wrapper .kaching-bundles__bars,.kaching-bundles .kaching-bundles__bars--badge-border-top .kaching-bundles__subscriptions-wrapper .kaching-bundles__bars,.kaching-bundles .kaching-bundles__bars--badge-border-bottom .kaching-bundles__subscriptions-wrapper .kaching-bundles__bars{row-gap:calc(10px * var(--block-spacing, 1))}.kaching-bundles .kaching-bundles__bar-container--badge-border-left:has(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts) .kaching-bundles__bar-wrapper,.kaching-bundles .kaching-bundles__bar-container--badge-border-right:has(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts) .kaching-bundles__bar-wrapper{border-end-start-radius:0;border-end-end-radius:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-top .kaching-bundles__bar-wrapper{position:relative;z-index:1;margin-top:calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px));background-color:var(--bar-background-color, #fff);border-start-start-radius:var(--badge-concave-depth, 8px);border-start-end-radius:var(--badge-concave-depth, 8px);border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-container--badge-border-top:has(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts) .kaching-bundles__bar-wrapper{border-end-start-radius:0;border-end-end-radius:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-top :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom .kaching-bundles__bar-wrapper{position:relative;z-index:1;margin-bottom:calc(var(--badge-border-thickness, 22px) + var(--badge-border-gap, 0px));background-color:var(--bar-background-color, #fff);border-start-start-radius:var(--bar-border-radius);border-start-end-radius:var(--bar-border-radius);border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts){position:relative;z-index:1}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom:has(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts) .kaching-bundles__bar-wrapper{margin-bottom:0;border-end-start-radius:0;border-end-end-radius:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom:has(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts) :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{margin-bottom:var(--badge-border-thickness, 22px);border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-top :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts),.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts),.kaching-bundles .kaching-bundles__bar-container--badge-border-left :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts),.kaching-bundles .kaching-bundles__bar-container--badge-border-right :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts){margin-inline:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-left :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts){position:relative;z-index:1;margin-inline-start:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-right :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts){position:relative;z-index:1;margin-inline-end:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-left :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child,.kaching-bundles .kaching-bundles__bar-container--badge-border-right :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{margin-block-end:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-left :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-container--badge-border-right :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bars--badge-border-all .kaching-bundles__bar-container--badge-border-left :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{margin-inline-start:var(--badge-border-thickness, 22px);border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bars--badge-border-all .kaching-bundles__bar-container--badge-border-right :is(.kaching-bundles__free-gift,.kaching-bundles__upsell,.kaching-bundles__deal-bar-progressive-gifts):last-child{margin-inline-end:var(--badge-border-thickness, 22px);border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom .kaching-bundles__deal-bar-progressive-gift:last-child{margin-block-end:0;border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-left .kaching-bundles__deal-bar-progressive-gift:last-child,.kaching-bundles .kaching-bundles__bar-container--badge-border-right .kaching-bundles__deal-bar-progressive-gift:last-child{margin-block-end:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-left .kaching-bundles__deal-bar-progressive-gift:last-child{border-end-start-radius:var(--badge-concave-depth, 8px);border-end-end-radius:var(--bar-border-radius)}.kaching-bundles .kaching-bundles__bar-container--badge-border-right .kaching-bundles__deal-bar-progressive-gift:last-child{border-end-start-radius:var(--bar-border-radius);border-end-end-radius:var(--badge-concave-depth, 8px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-top .kaching-bundles__deal-bar-progressive-gift,.kaching-bundles .kaching-bundles__bar-container--badge-border-bottom .kaching-bundles__deal-bar-progressive-gift,.kaching-bundles .kaching-bundles__bar-container--badge-border-left .kaching-bundles__deal-bar-progressive-gift,.kaching-bundles .kaching-bundles__bar-container--badge-border-right .kaching-bundles__deal-bar-progressive-gift{margin-inline:0}.kaching-bundles .kaching-bundles__bar-container--badge-border-left .kaching-bundles__free-gift__divider{margin-inline-start:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar-container--badge-border-right .kaching-bundles__free-gift__divider{margin-inline-end:var(--badge-border-thickness, 22px)}.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-top .kaching-bundles__bar-wrapper,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-bottom .kaching-bundles__bar-wrapper,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-left .kaching-bundles__bar-wrapper,.kaching-bundles .kaching-bundles__bar--selected .kaching-bundles__bar-container--badge-border-right .kaching-bundles__bar-wrapper{background-color:var(--bar-selected-background-color)}`)), document.head.appendChild(Ft);
    }
  } catch (tn) {
    console.error("vite-plugin-css-injected-by-js", tn);
  }
})();
var lm = Object.defineProperty, sm = Object.getPrototypeOf, om = Reflect.get, dg = (Ft) => {
  throw TypeError(Ft);
}, cm = (Ft, tn, In) => tn in Ft ? lm(Ft, tn, { enumerable: !0, configurable: !0, writable: !0, value: In }) : Ft[tn] = In, wn = (Ft, tn, In) => cm(Ft, typeof tn != "symbol" ? tn + "" : tn, In), To = (Ft, tn, In) => tn.has(Ft) || dg("Cannot " + In), xe = (Ft, tn, In) => (To(Ft, tn, "read from private field"), In ? In.call(Ft) : tn.get(Ft)), kt = (Ft, tn, In) => tn.has(Ft) ? dg("Cannot add the same private member more than once") : tn instanceof WeakSet ? tn.add(Ft) : tn.set(Ft, In), mt = (Ft, tn, In, gs) => (To(Ft, tn, "write to private field"), tn.set(Ft, In), In), ln = (Ft, tn, In) => (To(Ft, tn, "access private method"), In), dm = (Ft, tn, In) => om(sm(Ft), In, tn);
(function(Ft) {
  var tn, In, gs, hl, $i, Er, Di, pl, Za, Ai, Ja, Pa, Vi, bl, fl, sa, qo, vl, hs, Dr, ur, _l, Rr, Ya, Nr, mr, ar, Qr, Sa, Ba, oa, Ka, Ca, ps, bs, gr, Go, Oo, kl, ml, fs, Ia, Ti, xl, vs, Fo, ca, xr, qi, yl, _s, ks, Lo, Gi, Ar, Ma, ms, wl, jo, Eo, Wr, Ur, da, xs, Hr, Oi, Pl, Sl, Bl;
  String.prototype.replaceAll || (String.prototype.replaceAll = function(n, t) {
    if (typeof n == "string") {
      const r = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return this.replace(new RegExp(r, "g"), t);
    }
    if (n instanceof RegExp) {
      if (!n.global) throw new TypeError("replaceAll must be called with a global RegExp");
      return this.replace(n, t);
    }
    return this.replace(n, t);
  }), typeof window != "undefined" && ((gs = (In = (tn = window.__svelte) != null ? tn : window.__svelte = {}).v) != null ? gs : In.v = /* @__PURE__ */ new Set()).add("5");
  const Cl = "[!", za = {}, An = Symbol(), ug = !1;
  var Fi = Array.isArray, gg = Array.prototype.indexOf, ys = Array.from, Il = Object.keys, $a = Object.defineProperty, Da = Object.getOwnPropertyDescriptor, Ro = Object.getOwnPropertyDescriptors, No = Object.prototype, hg = Array.prototype, Ml = Object.getPrototypeOf, Qo = Object.isExtensible;
  const yr = () => {
  };
  function pg(n) {
    return n();
  }
  function zl(n) {
    for (var t = 0; t < n.length; t++) n[t]();
  }
  const Li = 16, $l = 32, Wo = 64, wr = 256, ws = 512, Nn = 1024, Zr = 2048, Aa = 4096, Vr = 8192, Xa = 16384, Ps = 32768, ei = 65536, bg = 1 << 17, Uo = 1 << 19, Ss = 1 << 21, fg = 1 << 22, Va = 1 << 23, Jr = Symbol("$state"), Ho = Symbol("legacy props"), vg = Symbol(""), Bs = new class extends Error {
    constructor() {
      super(...arguments), wn(this, "name", "StaleReactionError"), wn(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
    }
  }();
  function Zo(n) {
    throw new Error("https://svelte.dev/e/lifecycle_outside_component");
  }
  function ji(n) {
    console.warn("https://svelte.dev/e/hydration_mismatch");
  }
  let wt, ht = !1;
  function Yn(n) {
    ht = n;
  }
  function Vn(n) {
    if (n === null) throw ji(), za;
    return wt = n;
  }
  function hr() {
    return Vn(Sr(wt));
  }
  function y(n) {
    if (ht) {
      if (Sr(wt) !== null) throw ji(), za;
      wt = n;
    }
  }
  function ua(n = 1) {
    if (ht) {
      for (var t = n, r = wt; t--; ) r = Sr(r);
      wt = r;
    }
  }
  function Dl(n = !0) {
    for (var t = 0, r = wt; ; ) {
      if (r.nodeType === 8) {
        var a = r.data;
        if (a === "]") {
          if (t === 0) return r;
          t -= 1;
        } else a !== "[" && a !== Cl || (t += 1);
      }
      var l = Sr(r);
      n && r.remove(), r = l;
    }
  }
  function Jo(n) {
    if (!n || n.nodeType !== 8) throw ji(), za;
    return n.data;
  }
  function Yo(n) {
    return n === this.v;
  }
  function Al(n, t) {
    return n != n ? t == t : n !== t || n !== null && typeof n == "object" || typeof n == "function";
  }
  function _g(n, t) {
    return n !== t;
  }
  function Ko(n) {
    return !Al(n, this.v);
  }
  let ti = !1;
  const kg = [];
  function ga(n, t = !1, r = !1) {
    return Vl(n, /* @__PURE__ */ new Map(), "", kg, null, r);
  }
  function Vl(n, t, r, a, l = null, o = !1) {
    if (typeof n == "object" && n !== null) {
      var c = t.get(n);
      if (c !== void 0) return c;
      if (n instanceof Map) return new Map(n);
      if (n instanceof Set) return new Set(n);
      if (Fi(n)) {
        var s = Array(n.length);
        t.set(n, s), l !== null && t.set(l, s);
        for (var i = 0; i < n.length; i += 1) {
          var d = n[i];
          i in n && (s[i] = Vl(d, t, r, a, null, o));
        }
        return s;
      }
      if (Ml(n) === No) {
        for (var g in s = {}, t.set(n, s), l !== null && t.set(l, s), n) s[g] = Vl(n[g], t, r, a, null, o);
        return s;
      }
      if (n instanceof Date) return structuredClone(n);
      if (typeof n.toJSON == "function" && !o) return Vl(n.toJSON(), t, r, a, n);
    }
    if (n instanceof EventTarget) return n;
    try {
      return structuredClone(n);
    } catch {
      return n;
    }
  }
  let on = null;
  function ni(n) {
    on = n;
  }
  function ri(n) {
    return Xo().get(n);
  }
  function ai(n, t) {
    return Xo().set(n, t), t;
  }
  function Ke(n, t = !1, r) {
    on = { p: on, c: null, e: null, s: n, x: null, l: ti && !t ? { s: null, u: null, $: [] } : null };
  }
  function Xe(n) {
    var t = on, r = t.e;
    if (r !== null) for (var a of (t.e = null, r)) xc(a);
    return n !== void 0 && (t.x = n), on = t.p, n != null ? n : {};
  }
  function ii() {
    return !ti || on !== null && on.l === null;
  }
  function Xo(n) {
    var t;
    return on === null && Zo(), (t = on.c) != null ? t : on.c = new Map((function(r) {
      let a = r.p;
      for (; a !== null; ) {
        const l = a.c;
        if (l !== null) return l;
        a = a.p;
      }
      return null;
    })(on) || void 0);
  }
  const mg = typeof requestIdleCallback == "undefined" ? (n) => setTimeout(n, 1) : requestIdleCallback;
  let ha = [], li = [];
  function ec() {
    var n = ha;
    ha = [], zl(n);
  }
  function tc() {
    var n = li;
    li = [], zl(n);
  }
  function xg() {
    return ha.length > 0 || li.length > 0;
  }
  function Ta(n) {
    if (ha.length === 0 && !Ri) {
      var t = ha;
      queueMicrotask(() => {
        t === ha && ec();
      });
    }
    ha.push(n);
  }
  function yg() {
    ha.length > 0 && ec(), li.length > 0 && tc();
  }
  const wg = /* @__PURE__ */ new WeakMap();
  function nc(n) {
    var t = At;
    if (t === null) return Gt.f |= Va, n;
    if ((t.f & Ps) === 0) {
      if (!(128 & t.f)) throw !t.parent && n instanceof Error && rc(n), n;
      t.b.error(n);
    } else si(n, t);
  }
  function si(n, t) {
    for (; t !== null; ) {
      if (128 & t.f) try {
        return void t.b.error(n);
      } catch (r) {
        n = r;
      }
      t = t.parent;
    }
    throw n instanceof Error && rc(n), n;
  }
  function rc(n) {
    const t = wg.get(n);
    t && ($a(n, "message", { value: t.message }), $a(n, "stack", { value: t.stack }));
  }
  const Cs = /* @__PURE__ */ new Set();
  let vn = null, Ei = null, Is = /* @__PURE__ */ new Set(), qa = [], Tl = null, Ms = !1, Ri = !1;
  hl = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Di = /* @__PURE__ */ new WeakMap(), pl = /* @__PURE__ */ new WeakMap(), Za = /* @__PURE__ */ new WeakMap(), Ai = /* @__PURE__ */ new WeakMap(), Ja = /* @__PURE__ */ new WeakMap(), Pa = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), bl = /* @__PURE__ */ new WeakMap(), fl = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakSet(), qo = function(n) {
    var t;
    n.f ^= Nn;
    for (var r = n.first; r !== null; ) {
      var a = r.f, l = !!(96 & a);
      if (!(l && (a & Nn) !== 0 || (a & Vr) !== 0 || this.skipped_effects.has(r)) && r.fn !== null) {
        l ? r.f ^= Nn : 4 & a ? xe(this, Pa).push(r) : (a & Nn) === 0 && ((a & fg) !== 0 ? ((t = r.b) != null && t.is_pending() ? xe(this, Ai) : xe(this, Za)).push(r) : Fl(r) && ((r.f & Li) !== 0 && xe(this, Vi).push(r), ui(r)));
        var o = r.first;
        if (o !== null) {
          r = o;
          continue;
        }
      }
      var c = r.parent;
      for (r = r.next; r === null && c !== null; ) r = c.next, c = c.parent;
    }
  }, vl = function(n) {
    for (const t of n)
      ((t.f & Zr) !== 0 ? xe(this, bl) : xe(this, fl)).push(t), tr(t, Nn);
    n.length = 0;
  }, hs = function() {
    if (!xe(this, pl)) for (const n of xe(this, $i)) n();
    xe(this, $i).clear();
  };
  let Ga = class Vo {
    constructor() {
      kt(this, sa), wn(this, "current", /* @__PURE__ */ new Map()), kt(this, hl, /* @__PURE__ */ new Map()), kt(this, $i, /* @__PURE__ */ new Set()), kt(this, Er, 0), kt(this, Di, null), kt(this, pl, !1), kt(this, Za, []), kt(this, Ai, []), kt(this, Ja, []), kt(this, Pa, []), kt(this, Vi, []), kt(this, bl, []), kt(this, fl, []), wn(this, "skipped_effects", /* @__PURE__ */ new Set());
    }
    process(t) {
      var r;
      qa = [], Ei = null;
      for (const o of t) ln(this, sa, qo).call(this, o);
      if (xe(this, Za).length === 0 && xe(this, Er) === 0) {
        ln(this, sa, hs).call(this);
        var a = xe(this, Ja), l = xe(this, Pa);
        mt(this, Ja, []), mt(this, Pa, []), mt(this, Vi, []), Ei = vn, vn = null, ic(a), ic(l), vn === null ? vn = this : Cs.delete(this), (r = xe(this, Di)) == null || r.resolve();
      } else ln(this, sa, vl).call(this, xe(this, Ja)), ln(this, sa, vl).call(this, xe(this, Pa)), ln(this, sa, vl).call(this, xe(this, Vi));
      for (const o of xe(this, Za)) ui(o);
      for (const o of xe(this, Ai)) ui(o);
      mt(this, Za, []), mt(this, Ai, []);
    }
    capture(t, r) {
      xe(this, hl).has(t) || xe(this, hl).set(t, r), this.current.set(t, t.v);
    }
    activate() {
      vn = this;
    }
    deactivate() {
      vn = null, Ei = null;
      for (const t of Is) if (Is.delete(t), t(), vn !== null) break;
    }
    neuter() {
      mt(this, pl, !0);
    }
    flush() {
      qa.length > 0 ? ac() : ln(this, sa, hs).call(this), vn === this && (xe(this, Er) === 0 && Cs.delete(this), this.deactivate());
    }
    increment() {
      mt(this, Er, xe(this, Er) + 1);
    }
    decrement() {
      if (mt(this, Er, xe(this, Er) - 1), xe(this, Er) === 0) {
        for (const t of xe(this, bl)) tr(t, Zr), oi(t);
        for (const t of xe(this, fl)) tr(t, Aa), oi(t);
        mt(this, Ja, []), mt(this, Pa, []), this.flush();
      } else this.deactivate();
    }
    add_callback(t) {
      xe(this, $i).add(t);
    }
    settled() {
      var t, r, a;
      return ((t = xe(this, Di)) != null ? t : mt(this, Di, { promise: new Promise((l, o) => {
        r = l, a = o;
      }), resolve: r, reject: a })).promise;
    }
    static ensure() {
      if (vn === null) {
        const t = vn = new Vo();
        Cs.add(vn), Ri || Vo.enqueue(() => {
          vn === t && t.flush();
        });
      }
      return vn;
    }
    static enqueue(t) {
      Ta(t);
    }
  };
  function k(n) {
    var t = Ri;
    Ri = !0;
    try {
      for (; ; ) {
        if (yg(), qa.length === 0 && !xg() && (vn == null || vn.flush(), qa.length === 0)) return void (Tl = null);
        ac();
      }
    } finally {
      Ri = t;
    }
  }
  function ac() {
    var n = di;
    Ms = !0;
    try {
      var t = 0;
      for (Ic(!0); qa.length > 0; ) {
        var r = Ga.ensure();
        t++ > 1e3 && Pg(), r.process(qa), ba.clear();
      }
    } finally {
      Ms = !1, Ic(n), Tl = null;
    }
  }
  function Pg() {
    try {
      (function() {
        throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
      })();
    } catch (n) {
      si(n, Tl);
    }
  }
  let pa = null;
  function ic(n) {
    var t = n.length;
    if (t !== 0) {
      for (var r = 0; r < t; ) {
        var a = n[r++];
        if (!(24576 & a.f) && Fl(a) && (pa = [], ui(a), a.deps === null && a.first === null && a.nodes_start === null && (a.teardown === null && a.ac === null ? Sc(a) : a.fn = null), (pa == null ? void 0 : pa.length) > 0)) {
          ba.clear();
          for (const l of pa) ui(l);
          pa = [];
        }
      }
      pa = null;
    }
  }
  function oi(n) {
    for (var t = Tl = n; t.parent !== null; ) {
      var r = (t = t.parent).f;
      if (Ms && t === At && (r & Li) !== 0) return;
      if (96 & r) {
        if ((r & Nn) === 0) return;
        t.f ^= Nn;
      }
    }
    qa.push(t);
  }
  function lc(n) {
    let t, r = 0, a = Yr(0);
    return () => {
      Gt === null || Cr || (e(a), Wi(() => (r === 0 && (t = nn(() => n(() => ir(a)))), r += 1, () => {
        Ta(() => {
          r -= 1, r === 0 && (t == null || t(), t = void 0, ir(a));
        });
      })));
    };
  }
  class Sg {
    constructor(t, r, a) {
      kt(this, gr), wn(this, "parent"), kt(this, Dr, !1), kt(this, ur), kt(this, _l, ht ? wt : null), kt(this, Rr), kt(this, Ya), kt(this, Nr), kt(this, mr, null), kt(this, ar, null), kt(this, Qr, null), kt(this, Sa, null), kt(this, Ba, 0), kt(this, oa, 0), kt(this, Ka, !1), kt(this, Ca, null), kt(this, ps, () => {
        xe(this, Ca) && ci(xe(this, Ca), xe(this, Ba));
      }), kt(this, bs, lc(() => (mt(this, Ca, Yr(xe(this, Ba))), () => {
        mt(this, Ca, null);
      }))), mt(this, ur, t), mt(this, Rr, r), mt(this, Ya, a), this.parent = At.b, mt(this, Dr, !!xe(this, Rr).pending), mt(this, Nr, Kr(() => {
        if (At.b = this, ht) {
          const l = xe(this, _l);
          hr(), l.nodeType === 8 && l.data === Cl ? ln(this, gr, Oo).call(this) : ln(this, gr, Go).call(this);
        } else {
          try {
            mt(this, mr, qn(() => a(xe(this, ur))));
          } catch (l) {
            this.error(l);
          }
          xe(this, oa) > 0 ? ln(this, gr, ml).call(this) : mt(this, Dr, !1);
        }
      }, 589952)), ht && mt(this, ur, wt);
    }
    is_pending() {
      return xe(this, Dr) || !!this.parent && this.parent.is_pending();
    }
    has_pending_snippet() {
      return !!xe(this, Rr).pending;
    }
    update_pending_count(t) {
      ln(this, gr, fs).call(this, t), mt(this, Ba, xe(this, Ba) + t), Is.add(xe(this, ps));
    }
    get_effect_pending() {
      return xe(this, bs).call(this), e(xe(this, Ca));
    }
    error(t) {
      var r = xe(this, Rr).onerror;
      let a = xe(this, Rr).failed;
      if (xe(this, Ka) || !r && !a) throw t;
      xe(this, mr) && (Gn(xe(this, mr)), mt(this, mr, null)), xe(this, ar) && (Gn(xe(this, ar)), mt(this, ar, null)), xe(this, Qr) && (Gn(xe(this, Qr)), mt(this, Qr, null)), ht && (Vn(xe(this, _l)), ua(), Vn(Dl()));
      var l = !1, o = !1;
      const c = () => {
        l ? console.warn("https://svelte.dev/e/svelte_boundary_reset_noop") : (l = !0, o && (function() {
          throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
        })(), Ga.ensure(), mt(this, Ba, 0), xe(this, Qr) !== null && Xr(xe(this, Qr), () => {
          mt(this, Qr, null);
        }), mt(this, Dr, this.has_pending_snippet()), mt(this, mr, ln(this, gr, kl).call(this, () => (mt(this, Ka, !1), qn(() => xe(this, Ya).call(this, xe(this, ur)))))), xe(this, oa) > 0 ? ln(this, gr, ml).call(this) : mt(this, Dr, !1));
      };
      var s = Gt;
      try {
        Qn(null), o = !0, r == null || r(t, c), o = !1;
      } catch (i) {
        si(i, xe(this, Nr) && xe(this, Nr).parent);
      } finally {
        Qn(s);
      }
      a && Ta(() => {
        mt(this, Qr, ln(this, gr, kl).call(this, () => {
          mt(this, Ka, !0);
          try {
            return qn(() => {
              a(xe(this, ur), () => t, () => c);
            });
          } catch (i) {
            return si(i, xe(this, Nr).parent), null;
          } finally {
            mt(this, Ka, !1);
          }
        }));
      });
    }
  }
  function sc(n, t, r) {
    const a = ii() ? Ni : ql;
    if (t.length !== 0) {
      var l = vn, o = At, c = (function() {
        var i = At, d = Gt, g = on, f = vn, h = ht;
        if (h) var _ = wt;
        return function() {
          Tr(i), Qn(d), ni(g), f == null || f.activate(), h && (Yn(!0), Vn(_));
        };
      })(), s = ht;
      Promise.all(t.map((i) => Bg(i))).then((i) => {
        l == null || l.activate(), c();
        try {
          r([...n.map(a), ...i]);
        } catch (d) {
          (o.f & Xa) === 0 && si(d, o);
        }
        s && Yn(!1), l == null || l.deactivate(), oc();
      }).catch((i) => {
        si(i, o);
      });
    } else r(n.map(a));
  }
  function oc() {
    Tr(null), Qn(null), ni(null);
  }
  function Ni(n) {
    var t = 2050, r = Gt !== null && 2 & Gt.f ? Gt : null;
    return At === null || r !== null && (r.f & wr) !== 0 ? t |= wr : At.f |= Uo, { ctx: on, deps: null, effects: null, equals: Yo, f: t, fn: n, reactions: null, rv: 0, v: An, wv: 0, parent: r != null ? r : At, ac: null };
  }
  function Bg(n, t) {
    let r = At;
    r === null && (function() {
      throw new Error("https://svelte.dev/e/async_derived_orphan");
    })();
    var a = r.b, l = void 0, o = Yr(An), c = null, s = !Gt;
    return (function(i) {
      Br(4718592, i, !0);
    })(() => {
      var i;
      try {
        var d = n();
        c && Promise.resolve(d).catch(() => {
        });
      } catch (v) {
        d = Promise.reject(v);
      }
      var g = () => d;
      l = (i = c == null ? void 0 : c.then(g, g)) != null ? i : Promise.resolve(d), c = l;
      var f = vn, h = a.is_pending();
      s && (a.update_pending_count(1), h || f.increment());
      const _ = (v, b = void 0) => {
        c = null, h || f.activate(), b ? b !== Bs && (o.f |= Va, ci(o, b)) : ((o.f & Va) !== 0 && (o.f ^= Va), ci(o, v)), s && (a.update_pending_count(-1), h || f.decrement()), oc();
      };
      if (l.then(_, (v) => _(null, v || "unknown")), f) return () => {
        queueMicrotask(() => f.neuter());
      };
    }), new Promise((i) => {
      (function d(g) {
        function f() {
          g === l ? i(o) : d(l);
        }
        g.then(f, f);
      })(l);
    });
  }
  function u(n) {
    const t = Ni(n);
    return zc(t), t;
  }
  function ql(n) {
    const t = Ni(n);
    return t.equals = Ko, t;
  }
  function cc(n) {
    var t = n.effects;
    if (t !== null) {
      n.effects = null;
      for (var r = 0; r < t.length; r += 1) Gn(t[r]);
    }
  }
  function zs(n) {
    var t, r = At;
    Tr((function(a) {
      for (var l = a.parent; l !== null; ) {
        if (!(2 & l.f)) return l;
        l = l.parent;
      }
      return null;
    })(n));
    try {
      cc(n), t = Tc(n);
    } finally {
      Tr(r);
    }
    return t;
  }
  function dc(n) {
    var t = zs(n);
    n.equals(t) || (n.v = t, n.wv = Ac()), Oa || tr(n, !fa && (n.f & wr) === 0 || n.deps === null ? Nn : Aa);
  }
  Dr = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), _l = /* @__PURE__ */ new WeakMap(), Rr = /* @__PURE__ */ new WeakMap(), Ya = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakMap(), Ba = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap(), Ka = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakMap(), ps = /* @__PURE__ */ new WeakMap(), bs = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakSet(), Go = function() {
    try {
      mt(this, mr, qn(() => xe(this, Ya).call(this, xe(this, ur))));
    } catch (n) {
      this.error(n);
    }
    mt(this, Dr, !1);
  }, Oo = function() {
    const n = xe(this, Rr).pending;
    n && (mt(this, ar, qn(() => n(xe(this, ur)))), Ga.enqueue(() => {
      mt(this, mr, ln(this, gr, kl).call(this, () => (Ga.ensure(), qn(() => xe(this, Ya).call(this, xe(this, ur)))))), xe(this, oa) > 0 ? ln(this, gr, ml).call(this) : (Xr(xe(this, ar), () => {
        mt(this, ar, null);
      }), mt(this, Dr, !1));
    }));
  }, kl = function(n) {
    var t = At, r = Gt, a = on;
    Tr(xe(this, Nr)), Qn(xe(this, Nr)), ni(xe(this, Nr).ctx);
    try {
      return n();
    } catch (l) {
      return nc(l), null;
    } finally {
      Tr(t), Qn(r), ni(a);
    }
  }, ml = function() {
    const n = xe(this, Rr).pending;
    xe(this, mr) !== null && (mt(this, Sa, document.createDocumentFragment()), (function(t, r) {
      for (var a = t.nodes_start, l = t.nodes_end; a !== null; ) {
        var o = a === l ? null : Sr(a);
        r.append(a), a = o;
      }
    })(xe(this, mr), xe(this, Sa))), xe(this, ar) === null && mt(this, ar, qn(() => n(xe(this, ur))));
  }, fs = function(n) {
    var t;
    this.has_pending_snippet() ? (mt(this, oa, xe(this, oa) + n), xe(this, oa) === 0 && (mt(this, Dr, !1), xe(this, ar) && Xr(xe(this, ar), () => {
      mt(this, ar, null);
    }), xe(this, Sa) && (xe(this, ur).before(xe(this, Sa)), mt(this, Sa, null)))) : this.parent && ln(t = this.parent, gr, fs).call(t, n);
  };
  const ba = /* @__PURE__ */ new Map();
  function Yr(n, t) {
    return { f: 0, v: n, reactions: null, equals: Yo, rv: 0, wv: 0 };
  }
  function ze(n, t) {
    const r = Yr(n);
    return zc(r), r;
  }
  function $s(n, t = !1, r = !0) {
    var a, l;
    const o = Yr(n);
    return t || (o.equals = Ko), ti && r && on !== null && on.l !== null && ((l = (a = on.l).s) != null ? l : a.s = []).push(o), o;
  }
  function le(n, t, r = !1) {
    return Gt !== null && (!Cr || (Gt.f & bg) !== 0) && ii() && 4325394 & Gt.f && !(br != null && br.includes(n)) && (function() {
      throw new Error("https://svelte.dev/e/state_unsafe_mutation");
    })(), ci(n, r ? lt(t) : t);
  }
  function ci(n, t) {
    if (!n.equals(t)) {
      var r = n.v;
      Oa ? ba.set(n, t) : ba.set(n, r), n.v = t, Ga.ensure().capture(n, r), 2 & n.f && ((n.f & Zr) !== 0 && zs(n), tr(n, (n.f & wr) === 0 ? Nn : Aa)), n.wv = Ac(), uc(n, Zr), !ii() || At === null || (At.f & Nn) === 0 || 96 & At.f || (fr === null ? (function(a) {
        fr = a;
      })([n]) : fr.push(n));
    }
    return t;
  }
  function ir(n) {
    le(n, n.v + 1);
  }
  function uc(n, t) {
    var r = n.reactions;
    if (r !== null) for (var a = ii(), l = r.length, o = 0; o < l; o++) {
      var c = r[o], s = c.f;
      if (a || c !== At) {
        var i = (s & Zr) === 0;
        i && tr(c, t), 2 & s ? uc(c, Aa) : i && ((s & Li) !== 0 && pa !== null && pa.push(c), oi(c));
      }
    }
  }
  function lt(n) {
    if (typeof n != "object" || n === null || Jr in n) return n;
    const t = Ml(n);
    if (t !== No && t !== hg) return n;
    var r = /* @__PURE__ */ new Map(), a = Fi(n), l = ze(0), o = Ir, c = (s) => {
      if (Ir === o) return s();
      var i = Gt, d = Ir;
      Qn(null), Dc(o);
      var g = s();
      return Qn(i), Dc(d), g;
    };
    return a && r.set("length", ze(n.length)), new Proxy(n, { defineProperty(s, i, d) {
      "value" in d && d.configurable !== !1 && d.enumerable !== !1 && d.writable !== !1 || (function() {
        throw new Error("https://svelte.dev/e/state_descriptors_fixed");
      })();
      var g = r.get(i);
      return g === void 0 ? g = c(() => {
        var f = ze(d.value);
        return r.set(i, f), f;
      }) : le(g, d.value, !0), !0;
    }, deleteProperty(s, i) {
      var d = r.get(i);
      if (d === void 0) {
        if (i in s) {
          const g = c(() => ze(An));
          r.set(i, g), ir(l);
        }
      } else le(d, An), ir(l);
      return !0;
    }, get(s, i, d) {
      var g;
      if (i === Jr) return n;
      var f = r.get(i), h = i in s;
      if (f !== void 0 || h && !((g = Da(s, i)) != null && g.writable) || (f = c(() => ze(lt(h ? s[i] : An))), r.set(i, f)), f !== void 0) {
        var _ = e(f);
        return _ === An ? void 0 : _;
      }
      return Reflect.get(s, i, d);
    }, getOwnPropertyDescriptor(s, i) {
      var d = Reflect.getOwnPropertyDescriptor(s, i);
      if (d && "value" in d) {
        var g = r.get(i);
        g && (d.value = e(g));
      } else if (d === void 0) {
        var f = r.get(i), h = f == null ? void 0 : f.v;
        if (f !== void 0 && h !== An) return { enumerable: !0, configurable: !0, value: h, writable: !0 };
      }
      return d;
    }, has(s, i) {
      var d;
      if (i === Jr) return !0;
      var g = r.get(i), f = g !== void 0 && g.v !== An || Reflect.has(s, i);
      return (g !== void 0 || At !== null && (!f || (d = Da(s, i)) != null && d.writable)) && (g === void 0 && (g = c(() => ze(f ? lt(s[i]) : An)), r.set(i, g)), e(g) === An) ? !1 : f;
    }, set(s, i, d, g) {
      var f, h = r.get(i), _ = i in s;
      if (a && i === "length") for (var v = d; v < h.v; v += 1) {
        var b = r.get(v + "");
        b !== void 0 ? le(b, An) : v in s && (b = c(() => ze(An)), r.set(v + "", b));
      }
      h === void 0 ? _ && !((f = Da(s, i)) != null && f.writable) || (le(h = c(() => ze(void 0)), lt(d)), r.set(i, h)) : (_ = h.v !== An, le(h, c(() => lt(d))));
      var x = Reflect.getOwnPropertyDescriptor(s, i);
      if (x != null && x.set && x.set.call(g, d), !_) {
        if (a && typeof i == "string") {
          var D = r.get("length"), S = Number(i);
          Number.isInteger(S) && S >= D.v && le(D, S + 1);
        }
        ir(l);
      }
      return !0;
    }, ownKeys(s) {
      e(l);
      var i = Reflect.ownKeys(s).filter((f) => {
        var h = r.get(f);
        return h === void 0 || h.v !== An;
      });
      for (var [d, g] of r) g.v === An || d in s || i.push(d);
      return i;
    }, setPrototypeOf() {
      (function() {
        throw new Error("https://svelte.dev/e/state_prototype_fixed");
      })();
    } });
  }
  function gc(n) {
    try {
      if (n !== null && typeof n == "object" && Jr in n) return n[Jr];
    } catch {
    }
    return n;
  }
  function Cg(n, t) {
    return Object.is(gc(n), gc(t));
  }
  var hc, pc, bc, fc;
  function Ds() {
    if (hc === void 0) {
      hc = window, pc = /Firefox/.test(navigator.userAgent);
      var n = Element.prototype, t = Node.prototype, r = Text.prototype;
      bc = Da(t, "firstChild").get, fc = Da(t, "nextSibling").get, Qo(n) && (n.__click = void 0, n.__className = void 0, n.__attributes = null, n.__style = void 0, n.__e = void 0), Qo(r) && (r.__t = void 0);
    }
  }
  function Pr(n = "") {
    return document.createTextNode(n);
  }
  function jn(n) {
    return bc.call(n);
  }
  function Sr(n) {
    return fc.call(n);
  }
  function P(n, t) {
    if (!ht) return jn(n);
    var r = jn(wt);
    if (r === null) r = wt.appendChild(Pr());
    else if (t && r.nodeType !== 3) {
      var a = Pr();
      return r == null || r.before(a), Vn(a), a;
    }
    return Vn(r), r;
  }
  function pe(n, t = !1) {
    if (!ht) {
      var r = jn(n);
      return r instanceof Comment && r.data === "" ? Sr(r) : r;
    }
    if (t && (wt == null ? void 0 : wt.nodeType) !== 3) {
      var a = Pr();
      return wt == null || wt.before(a), Vn(a), a;
    }
    return wt;
  }
  function q(n, t = 1, r = !1) {
    let a = ht ? wt : n;
    for (var l; t--; ) l = a, a = Sr(a);
    if (!ht) return a;
    if (r && (a == null ? void 0 : a.nodeType) !== 3) {
      var o = Pr();
      return a === null ? l == null || l.after(o) : a.before(o), Vn(o), o;
    }
    return Vn(a), a;
  }
  function vc(n) {
    n.textContent = "";
  }
  function Ig(n, t) {
    if (t) {
      const r = document.body;
      n.autofocus = !0, Ta(() => {
        document.activeElement === r && n.focus();
      });
    }
  }
  let _c = !1;
  function kc() {
    _c || (_c = !0, document.addEventListener("reset", (n) => {
      Promise.resolve().then(() => {
        var t;
        if (!n.defaultPrevented) for (const r of n.target.elements) (t = r.__on_r) == null || t.call(r);
      });
    }, { capture: !0 }));
  }
  function Gl(n) {
    var t = Gt, r = At;
    Qn(null), Tr(null);
    try {
      return n();
    } finally {
      Qn(t), Tr(r);
    }
  }
  function mc(n) {
    At === null && Gt === null && (function() {
      throw new Error("https://svelte.dev/e/effect_orphan");
    })(), Gt !== null && (Gt.f & wr) !== 0 && At === null && (function() {
      throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
    })(), Oa && (function() {
      throw new Error("https://svelte.dev/e/effect_in_teardown");
    })();
  }
  function Br(n, t, r, a = !0) {
    var l, o = At;
    o !== null && (o.f & Vr) !== 0 && (n |= Vr);
    var c = { ctx: on, deps: null, nodes_start: null, nodes_end: null, f: n | Zr, first: null, fn: t, last: null, next: null, parent: o, b: o && o.b, prev: null, teardown: null, transitions: null, wv: 0, ac: null };
    if (r) try {
      ui(c), c.f |= Ps;
    } catch (d) {
      throw Gn(c), d;
    }
    else t !== null && oi(c);
    if (a) {
      var s = c;
      if (r && s.deps === null && s.teardown === null && s.nodes_start === null && s.first === s.last && (s.f & Uo) === 0 && (s = s.first), s !== null && (s.parent = o, o !== null && (function(d, g) {
        var f = g.last;
        f === null ? g.last = g.first = d : (f.next = d, d.prev = f, g.last = d);
      })(s, o), Gt !== null && 2 & Gt.f && (n & Wo) === 0)) {
        var i = Gt;
        ((l = i.effects) != null ? l : i.effects = []).push(s);
      }
    }
    return c;
  }
  function As(n) {
    const t = Br(8, null, !1);
    return tr(t, Nn), t.teardown = n, t;
  }
  function Je(n) {
    var t;
    mc();
    var r = At.f;
    if (!(!Gt && (r & $l) !== 0 && (r & Ps) === 0)) return xc(n);
    var a = on;
    ((t = a.e) != null ? t : a.e = []).push(n);
  }
  function xc(n) {
    return Br(1048580, n, !1);
  }
  function pr(n) {
    return mc(), Br(1048584, n, !0);
  }
  function Qi(n) {
    return Br(4, n, !1);
  }
  function Wi(n, t = 0) {
    return Br(8 | t, n, !0);
  }
  function be(n, t = [], r = []) {
    sc(t, r, (a) => {
      Br(8, () => n(...a.map(e)), !0);
    });
  }
  function Kr(n, t = 0) {
    return Br(Li | t, n, !0);
  }
  function qn(n, t = !0) {
    return Br(524320, n, !0, t);
  }
  function yc(n) {
    var t = n.teardown;
    if (t !== null) {
      const r = Oa, a = Gt;
      Mc(!0), Qn(null);
      try {
        t.call(null);
      } finally {
        Mc(r), Qn(a);
      }
    }
  }
  function wc(n, t = !1) {
    var r = n.first;
    for (n.first = n.last = null; r !== null; ) {
      const l = r.ac;
      l !== null && Gl(() => {
        l.abort(Bs);
      });
      var a = r.next;
      (r.f & Wo) !== 0 ? r.parent = null : Gn(r, t), r = a;
    }
  }
  function Gn(n, t = !0) {
    var r = !1;
    (t || 262144 & n.f) && n.nodes_start !== null && n.nodes_end !== null && (Pc(n.nodes_start, n.nodes_end), r = !0), wc(n, t && !r), Ll(n, 0), tr(n, Xa);
    var a = n.transitions;
    if (a !== null) for (const o of a) o.stop();
    yc(n);
    var l = n.parent;
    l !== null && l.first !== null && Sc(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes_start = n.nodes_end = n.ac = null;
  }
  function Pc(n, t) {
    for (; n !== null; ) {
      var r = n === t ? null : Sr(n);
      n.remove(), n = r;
    }
  }
  function Sc(n) {
    var t = n.parent, r = n.prev, a = n.next;
    r !== null && (r.next = a), a !== null && (a.prev = r), t !== null && (t.first === n && (t.first = a), t.last === n && (t.last = r));
  }
  function Xr(n, t) {
    var r = [];
    Vs(n, r, !0), Bc(r, () => {
      Gn(n), t && t();
    });
  }
  function Bc(n, t) {
    var r = n.length;
    if (r > 0) {
      var a = () => --r || t();
      for (var l of n) l.out(a);
    } else t();
  }
  function Vs(n, t, r) {
    if ((n.f & Vr) === 0) {
      if (n.f ^= Vr, n.transitions !== null) for (const o of n.transitions) (o.is_global || r) && t.push(o);
      for (var a = n.first; a !== null; ) {
        var l = a.next;
        Vs(a, t, ((a.f & ei) !== 0 || (a.f & $l) !== 0) && r), a = l;
      }
    }
  }
  function Ol(n) {
    Cc(n, !0);
  }
  function Cc(n, t) {
    if ((n.f & Vr) !== 0) {
      n.f ^= Vr, (n.f & Nn) === 0 && (tr(n, Zr), oi(n));
      for (var r = n.first; r !== null; ) {
        var a = r.next;
        Cc(r, ((r.f & ei) !== 0 || (r.f & $l) !== 0) && t), r = a;
      }
      if (n.transitions !== null) for (const l of n.transitions) (l.is_global || t) && l.in();
    }
  }
  let di = !1;
  function Ic(n) {
    di = n;
  }
  let Oa = !1;
  function Mc(n) {
    Oa = n;
  }
  let Gt = null, Cr = !1;
  function Qn(n) {
    Gt = n;
  }
  let At = null;
  function Tr(n) {
    At = n;
  }
  let br = null;
  function zc(n) {
    Gt !== null && (br === null ? br = [n] : br.push(n));
  }
  let Kn = null, lr = 0, fr = null, $c = 1, Ui = 0, Ir = Ui;
  function Dc(n) {
    Ir = n;
  }
  let fa = !1;
  function Ac() {
    return ++$c;
  }
  function Fl(n) {
    var t, r, a = n.f;
    if ((a & Zr) !== 0) return !0;
    if ((a & Aa) !== 0) {
      var l = n.deps, o = (a & wr) !== 0;
      if (l !== null) {
        var c, s, i = (a & ws) !== 0, d = o && At !== null && !fa, g = l.length;
        if ((i || d) && (At === null || (At.f & Xa) === 0)) {
          var f = n, h = f.parent;
          for (c = 0; c < g; c++) s = l[c], !i && ((t = s == null ? void 0 : s.reactions) != null && t.includes(f)) || ((r = s.reactions) != null ? r : s.reactions = []).push(f);
          i && (f.f ^= ws), d && h !== null && (h.f & wr) === 0 && (f.f ^= wr);
        }
        for (c = 0; c < g; c++) if (Fl(s = l[c]) && dc(s), s.wv > n.wv) return !0;
      }
      o && (At === null || fa) || tr(n, Nn);
    }
    return !1;
  }
  function Vc(n, t, r = !0) {
    var a = n.reactions;
    if (a !== null && !(br != null && br.includes(n))) for (var l = 0; l < a.length; l++) {
      var o = a[l];
      2 & o.f ? Vc(o, t, !1) : t === o && (r ? tr(o, Zr) : (o.f & Nn) !== 0 && tr(o, Aa), oi(o));
    }
  }
  function Tc(n) {
    var t, r, a = Kn, l = lr, o = fr, c = Gt, s = fa, i = br, d = on, g = Cr, f = Ir, h = n.f;
    Kn = null, lr = 0, fr = null, fa = (h & wr) !== 0 && (Cr || !di || Gt === null), Gt = 96 & h ? null : n, br = null, ni(n.ctx), Cr = !1, Ir = ++Ui, n.ac !== null && (Gl(() => {
      n.ac.abort(Bs);
    }), n.ac = null);
    try {
      n.f |= Ss;
      var _ = (0, n.fn)(), v = n.deps;
      if (Kn !== null) {
        var b;
        if (Ll(n, lr), v !== null && lr > 0) for (v.length = lr + Kn.length, b = 0; b < Kn.length; b++) v[lr + b] = Kn[b];
        else n.deps = v = Kn;
        if (!fa || 2 & h && n.reactions !== null) for (b = lr; b < v.length; b++) ((r = (t = v[b]).reactions) != null ? r : t.reactions = []).push(n);
      } else v !== null && lr < v.length && (Ll(n, lr), v.length = lr);
      if (ii() && fr !== null && !Cr && v !== null && !(6146 & n.f)) for (b = 0; b < fr.length; b++) Vc(fr[b], n);
      return c !== null && c !== n && (Ui++, fr !== null && (o === null ? o = fr : o.push(...fr))), (n.f & Va) !== 0 && (n.f ^= Va), _;
    } catch (x) {
      return nc(x);
    } finally {
      n.f ^= Ss, Kn = a, lr = l, fr = o, Gt = c, fa = s, br = i, ni(d), Cr = g, Ir = f;
    }
  }
  function Mg(n, t) {
    let r = t.reactions;
    if (r !== null) {
      var a = gg.call(r, n);
      if (a !== -1) {
        var l = r.length - 1;
        l === 0 ? r = t.reactions = null : (r[a] = r[l], r.pop());
      }
    }
    r === null && 2 & t.f && (Kn === null || !Kn.includes(t)) && (tr(t, Aa), 768 & t.f || (t.f ^= ws), cc(t), Ll(t, 0));
  }
  function Ll(n, t) {
    var r = n.deps;
    if (r !== null) for (var a = t; a < r.length; a++) Mg(n, r[a]);
  }
  function ui(n) {
    var t = n.f;
    if ((t & Xa) === 0) {
      tr(n, Nn);
      var r = At, a = di;
      At = n, di = !0;
      try {
        (t & Li) !== 0 ? (function(o) {
          for (var c = o.first; c !== null; ) {
            var s = c.next;
            (c.f & $l) === 0 && Gn(c), c = s;
          }
        })(n) : wc(n), yc(n);
        var l = Tc(n);
        n.teardown = typeof l == "function" ? l : null, n.wv = $c;
      } finally {
        di = a, At = r;
      }
    }
  }
  async function Ts() {
    await Promise.resolve(), k();
  }
  function e(n) {
    var t, r = !!(2 & n.f);
    if (Gt === null || Cr) {
      if (r && n.deps === null && n.effects === null) {
        var a = n, l = a.parent;
        l !== null && (l.f & wr) === 0 && (a.f ^= wr);
      }
    } else if (!(At !== null && (At.f & Xa) !== 0) && !(br != null && br.includes(n))) {
      var o = Gt.deps;
      if ((Gt.f & Ss) !== 0) n.rv < Ui && (n.rv = Ui, Kn === null && o !== null && o[lr] === n ? lr++ : Kn === null ? Kn = [n] : fa && Kn.includes(n) || Kn.push(n));
      else {
        ((t = Gt.deps) != null ? t : Gt.deps = []).push(n);
        var c = n.reactions;
        c === null ? n.reactions = [Gt] : c.includes(Gt) || c.push(Gt);
      }
    }
    if (Oa) {
      if (ba.has(n)) return ba.get(n);
      if (r) {
        var s = (a = n).v;
        return ((a.f & Nn) === 0 && a.reactions !== null || qc(a)) && (s = zs(a)), ba.set(a, s), s;
      }
    } else r && Fl(a = n) && dc(a);
    if ((n.f & Va) !== 0) throw n.v;
    return n.v;
  }
  function qc(n) {
    if (n.v === An) return !0;
    if (n.deps === null) return !1;
    for (const t of n.deps)
      if (ba.has(t) || 2 & t.f && qc(t)) return !0;
    return !1;
  }
  function nn(n) {
    var t = Cr;
    try {
      return Cr = !0, n();
    } finally {
      Cr = t;
    }
  }
  const zg = -7169;
  function tr(n, t) {
    n.f = n.f & zg | t;
  }
  function Gc(n) {
    if (typeof n == "object" && n && !(n instanceof EventTarget)) {
      if (Jr in n) qs(n);
      else if (!Array.isArray(n)) for (let t in n) {
        const r = n[t];
        typeof r == "object" && r && Jr in r && qs(r);
      }
    }
  }
  function qs(n, t = /* @__PURE__ */ new Set()) {
    if (!(typeof n != "object" || n === null || n instanceof EventTarget || t.has(n))) {
      t.add(n), n instanceof Date && n.getTime();
      for (let a in n) try {
        qs(n[a], t);
      } catch {
      }
      const r = Ml(n);
      if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
        const a = Ro(r);
        for (let l in a) {
          const o = a[l].get;
          if (o) try {
            o.call(n);
          } catch {
          }
        }
      }
    }
  }
  const Oc = /* @__PURE__ */ new Set(), Gs = /* @__PURE__ */ new Set();
  function Os(n, t, r, a = {}) {
    function l(o) {
      if (a.capture || Hi.call(t, o), !o.cancelBubble) return Gl(() => r == null ? void 0 : r.call(this, o));
    }
    return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? Ta(() => {
      t.addEventListener(n, l, a);
    }) : t.addEventListener(n, l, a), l;
  }
  function Fc(n, t, r, a, l) {
    var o = { capture: a, passive: l }, c = Os(n, t, r, o);
    (t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && As(() => {
      t.removeEventListener(n, c, o);
    });
  }
  function On(n) {
    for (var t = 0; t < n.length; t++) Oc.add(n[t]);
    for (var r of Gs) r(n);
  }
  let Lc = null;
  function Hi(n) {
    var t, r = this, a = r.ownerDocument, l = n.type, o = ((t = n.composedPath) == null ? void 0 : t.call(n)) || [], c = o[0] || n.target;
    Lc = n;
    var s = 0, i = Lc === n && n.__root;
    if (i) {
      var d = o.indexOf(i);
      if (d !== -1 && (r === document || r === window)) return void (n.__root = r);
      var g = o.indexOf(r);
      if (g === -1) return;
      d <= g && (s = d);
    }
    if ((c = o[s] || n.target) !== r) {
      $a(n, "currentTarget", { configurable: !0, get: () => c || a });
      var f = Gt, h = At;
      Qn(null), Tr(null);
      try {
        for (var _, v = []; c !== null; ) {
          var b = c.assignedSlot || c.parentNode || c.host || null;
          try {
            var x = c["__" + l];
            if (x != null && (!c.disabled || n.target === c)) if (Fi(x)) {
              var [D, ...S] = x;
              D.apply(c, [n, ...S]);
            } else x.call(c, n);
          } catch (I) {
            _ ? v.push(I) : _ = I;
          }
          if (n.cancelBubble || b === r || b === null) break;
          c = b;
        }
        if (_) {
          for (let I of v) queueMicrotask(() => {
            throw I;
          });
          throw _;
        }
      } finally {
        n.__root = r, delete n.currentTarget, Qn(f), Tr(h);
      }
    }
  }
  function Fs(n) {
    var t = document.createElement("template");
    return t.innerHTML = n.replaceAll("<!>", "<!---->"), t.content;
  }
  function nr(n, t) {
    var r = At;
    r.nodes_start === null && (r.nodes_start = n, r.nodes_end = t);
  }
  function $(n, t) {
    var r, a = !!(1 & t), l = !!(2 & t), o = !n.startsWith("<!>");
    return () => {
      if (ht) return nr(wt, null), wt;
      r === void 0 && (r = Fs(o ? n : "<!>" + n), a || (r = jn(r)));
      var c = l || pc ? document.importNode(r, !0) : r.cloneNode(!0);
      return a ? nr(jn(c), c.lastChild) : nr(c, c), c;
    };
  }
  function $g(n, t, r = "svg") {
    var a, l = !n.startsWith("<!>"), o = !!(1 & t), c = `<${r}>${l ? n : "<!>" + n}</${r}>`;
    return () => {
      if (ht) return nr(wt, null), wt;
      if (!a) {
        var s = jn(Fs(c));
        if (o) for (a = document.createDocumentFragment(); jn(s); ) a.appendChild(jn(s));
        else a = jn(s);
      }
      var i = a.cloneNode(!0);
      return o ? nr(jn(i), i.lastChild) : nr(i, i), i;
    };
  }
  function Tn(n, t) {
    return $g(n, t, "svg");
  }
  function Wn(n = "") {
    if (!ht) {
      var t = Pr(n + "");
      return nr(t, t), t;
    }
    var r = wt;
    return r.nodeType !== 3 && (r.before(r = Pr()), Vn(r)), nr(r, r), r;
  }
  function Be() {
    if (ht) return nr(wt, null), wt;
    var n = document.createDocumentFragment(), t = document.createComment(""), r = Pr();
    return n.append(t, r), nr(t, r), n;
  }
  function p(n, t) {
    if (ht) return At.nodes_end = wt, void hr();
    n !== null && n.before(t);
  }
  function Dg(n) {
    return n.endsWith("capture") && n !== "gotpointercapture" && n !== "lostpointercapture";
  }
  const Ag = ["beforeinput", "click", "change", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"];
  function Vg(n) {
    return Ag.includes(n);
  }
  const Tg = { formnovalidate: "formNoValidate", ismap: "isMap", nomodule: "noModule", playsinline: "playsInline", readonly: "readOnly", defaultvalue: "defaultValue", defaultchecked: "defaultChecked", srcobject: "srcObject", novalidate: "noValidate", allowfullscreen: "allowFullscreen", disablepictureinpicture: "disablePictureInPicture", disableremoteplayback: "disableRemotePlayback" };
  function qg(n) {
    var t;
    return n = n.toLowerCase(), (t = Tg[n]) != null ? t : n;
  }
  const Gg = ["touchstart", "touchmove"];
  function Og(n) {
    return Gg.includes(n);
  }
  const Fg = ["textarea", "script", "style", "title"];
  function ft(n, t) {
    var r, a = t == null ? "" : typeof t == "object" ? t + "" : t;
    a !== ((r = n.__t) != null ? r : n.__t = n.nodeValue) && (n.__t = a, n.nodeValue = a + "");
  }
  function jc(n, t) {
    return Ec(n, t);
  }
  function Lg(n, t) {
    var r;
    Ds(), t.intro = (r = t.intro) != null && r;
    const a = t.target, l = ht, o = wt;
    try {
      for (var c = jn(a); c && (c.nodeType !== 8 || c.data !== "["); ) c = Sr(c);
      if (!c) throw za;
      Yn(!0), Vn(c);
      const s = Ec(n, { ...t, anchor: c });
      return Yn(!1), s;
    } catch (s) {
      if (s instanceof Error && s.message.split(`
`).some((i) => i.startsWith("https://svelte.dev/e/"))) throw s;
      return s !== za && console.warn("Failed to hydrate: ", s), t.recover === !1 && (function() {
        throw new Error("https://svelte.dev/e/hydration_failed");
      })(), Ds(), vc(a), Yn(!1), jc(n, t);
    } finally {
      Yn(l), Vn(o);
    }
  }
  const gi = /* @__PURE__ */ new Map();
  function Ec(n, { target: t, anchor: r, props: a = {}, events: l, context: o, intro: c = !0 }) {
    Ds();
    var s = /* @__PURE__ */ new Set(), i = (f) => {
      for (var h = 0; h < f.length; h++) {
        var _ = f[h];
        if (!s.has(_)) {
          s.add(_);
          var v = Og(_);
          t.addEventListener(_, Hi, { passive: v });
          var b = gi.get(_);
          b === void 0 ? (document.addEventListener(_, Hi, { passive: v }), gi.set(_, 1)) : gi.set(_, b + 1);
        }
      }
    };
    i(ys(Oc)), Gs.add(i);
    var d = void 0, g = (function(f) {
      Ga.ensure();
      const h = Br(524352, f, !0);
      return (_ = {}) => new Promise((v) => {
        _.outro ? Xr(h, () => {
          Gn(h), v(void 0);
        }) : (Gn(h), v(void 0));
      });
    })(() => {
      var f = r != null ? r : t.appendChild(Pr());
      return (function(h, _, v) {
        new Sg(h, _, v);
      })(f, { pending: () => {
      } }, (h) => {
        if (o && (Ke({}), on.c = o), l && (a.$$events = l), ht && nr(h, null), d = n(h, a) || {}, ht && (At.nodes_end = wt, wt === null || wt.nodeType !== 8 || wt.data !== "]")) throw ji(), za;
        o && Xe();
      }), () => {
        var h;
        for (var _ of s) {
          t.removeEventListener(_, Hi);
          var v = gi.get(_);
          --v === 0 ? (document.removeEventListener(_, Hi), gi.delete(_)) : gi.set(_, v);
        }
        Gs.delete(i), f !== r && ((h = f.parentNode) == null || h.removeChild(f));
      };
    });
    return Ls.set(d, g), d;
  }
  let Ls = /* @__PURE__ */ new WeakMap();
  function jl(n, t, ...r) {
    var a, l = n, o = yr;
    Kr(() => {
      o !== (o = t()) && (a && (Gn(a), a = null), a = qn(() => o(l, ...r)));
    }, ei), ht && (l = wt);
  }
  function Fa(n) {
    var t, r, a;
    on === null && Zo(), ti && on.l !== null ? (t = on, a = t.l, (r = a.u) != null ? r : a.u = { a: [], b: [], m: [] }).m.push(n) : Je(() => {
      const l = nn(n);
      if (typeof l == "function") return l;
    });
  }
  function G(n, t, r = !1) {
    ht && hr();
    var a = n, l = null, o = null, c = An, s = !1;
    const i = (f, h = !0) => {
      s = !0, g(h, f);
    };
    function d() {
      var f = c ? l : o, h = c ? o : l;
      f && Ol(f), h && Xr(h, () => {
        c ? o = null : l = null;
      });
    }
    const g = (f, h) => {
      if (c === (c = f)) return;
      let _ = !1;
      if (ht) {
        const b = Jo(a) === Cl;
        !!c === b && (Vn(a = Dl()), Yn(!1), _ = !0);
      }
      var v = a;
      c ? l != null || (l = h && qn(() => h(v))) : o != null || (o = h && qn(() => h(v))), d(), _ && Yn(!0);
    };
    Kr(() => {
      s = !1, t(i), s || g(null, null);
    }, r ? ei : 0), ht && (a = wt);
  }
  function rt(n, t, r) {
    ht && hr();
    var a, l, o = n, c = An, s = ii() ? _g : Al;
    function i() {
      a && Xr(a), a = l;
    }
    Kr(() => {
      if (s(c, c = t())) {
        var d = o;
        l = qn(() => r(d)), i();
      }
    }), ht && (o = wt);
  }
  function Mr(n, t) {
    return t;
  }
  function $t(n, t, r, a, l, o = null) {
    var c = n, s = { flags: t, items: /* @__PURE__ */ new Map(), first: null };
    if (4 & t) {
      var i = n;
      c = ht ? Vn(jn(i)) : i.appendChild(Pr());
    }
    ht && hr();
    var d, g, f = null, h = !1, _ = /* @__PURE__ */ new Map(), v = ql(() => {
      var x = r();
      return Fi(x) ? x : x == null ? [] : ys(x);
    });
    function b() {
      (function(x, D, S, I, W, Q, E, K, M) {
        var te, A, L, se, Z, H, z, C, R, N, J = !!(8 & E), X = !!(3 & E), B = D.length, F = S.items, V = S.first, O = V, ee = null, ge = [], T = [];
        if (J) for (N = 0; N < B; N += 1) C = K(z = D[N], N), (R = F.get(C)) !== void 0 && ((te = R.a) == null || te.measure(), (H != null ? H : H = /* @__PURE__ */ new Set()).add(R));
        for (N = 0; N < B; N += 1) if (C = K(z = D[N], N), (R = F.get(C)) !== void 0) {
          if (X && jg(R, z, N, E), (R.e.f & Vr) !== 0 && (Ol(R.e), J && ((A = R.a) == null || A.unfix(), (H != null ? H : H = /* @__PURE__ */ new Set()).delete(R))), R !== O) {
            if (Z !== void 0 && Z.has(R)) {
              if (ge.length < T.length) {
                var w, U = T[0];
                ee = U.prev;
                var oe = ge[0], j = ge[ge.length - 1];
                for (w = 0; w < ge.length; w += 1) js(ge[w], U, W);
                for (w = 0; w < T.length; w += 1) Z.delete(T[w]);
                qr(S, oe.prev, j.next), qr(S, ee, oe), qr(S, j, U), O = U, ee = j, N -= 1, ge = [], T = [];
              } else Z.delete(R), js(R, O, W), qr(S, R.prev, R.next), qr(S, R, ee === null ? S.first : ee.next), qr(S, ee, R), ee = R;
              continue;
            }
            for (ge = [], T = []; O !== null && O.k !== C; ) (O.e.f & Vr) === 0 && (Z != null ? Z : Z = /* @__PURE__ */ new Set()).add(O), T.push(O), O = O.next;
            if (O === null) continue;
            R = O;
          }
          ge.push(R), ee = R, O = R.next;
        } else {
          var re = I.get(C);
          if (re !== void 0) {
            I.delete(C), F.set(C, re);
            var Y = ee ? ee.next : O;
            qr(S, ee, re), qr(S, re, Y), js(re, Y, W), ee = re;
          } else
            ee = Rc(O ? O.e.nodes_start : W, S, ee, ee === null ? S.first : ee.next, z, C, N, Q, E, M);
          F.set(C, ee), ge = [], T = [], O = ee.next;
        }
        if (O !== null || Z !== void 0) {
          for (var ie = Z === void 0 ? [] : ys(Z); O !== null; ) (O.e.f & Vr) === 0 && ie.push(O), O = O.next;
          var _e = ie.length;
          if (_e > 0) {
            var Se = 4 & E && B === 0 ? W : null;
            if (J) {
              for (N = 0; N < _e; N += 1) (L = ie[N].a) == null || L.measure();
              for (N = 0; N < _e; N += 1) (se = ie[N].a) == null || se.fix();
            }
            (function(ye, he, ce) {
              for (var ae = ye.items, de = [], fe = he.length, $e = 0; $e < fe; $e++) Vs(he[$e].e, de, !0);
              var qe = fe > 0 && de.length === 0 && ce !== null;
              if (qe) {
                var De = ce.parentNode;
                vc(De), De.append(ce), ae.clear(), qr(ye, he[0].prev, he[fe - 1].next);
              }
              Bc(de, () => {
                for (var ne = 0; ne < fe; ne++) {
                  var we = he[ne];
                  qe || (ae.delete(we.k), qr(ye, we.prev, we.next)), Gn(we.e, !qe);
                }
              });
            })(S, ie, Se);
          }
        }
        J && Ta(() => {
          var ye;
          if (H !== void 0) for (R of H) (ye = R.a) == null || ye.apply();
        });
        for (var me of (x.first = S.first && S.first.e, x.last = ee && ee.e, I.values())) Gn(me.e);
        I.clear();
      })(g, d, s, _, c, l, t, a, r), o !== null && (d.length === 0 ? f ? Ol(f) : f = qn(() => o(c)) : f !== null && Xr(f, () => {
        f = null;
      }));
    }
    Kr(() => {
      g != null || (g = At);
      var x = (d = e(v)).length;
      if (h && x === 0) return;
      h = x === 0;
      let D = !1;
      if (ht && Jo(c) === Cl != (x === 0) && (Vn(c = Dl()), Yn(!1), D = !0), ht) {
        for (var S, I = null, W = 0; W < x; W++) {
          if (wt.nodeType === 8 && wt.data === "]") {
            c = wt, D = !0, Yn(!1);
            break;
          }
          var Q = d[W], E = a(Q, W);
          S = Rc(wt, s, I, null, Q, E, W, l, t, r), s.items.set(E, S), I = S;
        }
        x > 0 && Vn(Dl());
      }
      ht ? x === 0 && o && (f = qn(() => o(c))) : b(), D && Yn(!0), e(v);
    }), ht && (c = wt);
  }
  function jg(n, t, r, a) {
    1 & a && ci(n.v, t), 2 & a ? ci(n.i, r) : n.i = r;
  }
  function Rc(n, t, r, a, l, o, c, s, i, d, g) {
    var f = 1 & i ? 16 & i ? Yr(l) : $s(l, !1, !1) : l, h = 2 & i ? Yr(c) : c, _ = { i: h, v: f, k: o, a: null, e: null, prev: r, next: a };
    try {
      return n === null && document.createDocumentFragment().append(n = Pr()), _.e = qn(() => s(n, f, h, d), ht), _.e.prev = r && r.e, _.e.next = a && a.e, r === null ? g || (t.first = _) : (r.next = _, r.e.next = _.e), a !== null && (a.prev = _, a.e.prev = _.e), _;
    } finally {
    }
  }
  function js(n, t, r) {
    for (var a = n.next ? n.next.e.nodes_start : r, l = t ? t.e.nodes_start : r, o = n.e.nodes_start; o !== null && o !== a; ) {
      var c = Sr(o);
      l.before(o), o = c;
    }
  }
  function qr(n, t, r) {
    t === null ? n.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
  }
  function Ve(n, t, r = !1, a = !1, l = !1) {
    var o = n, c = "";
    be(() => {
      var s, i = At;
      if (c !== (c = (s = t()) != null ? s : "")) {
        if (i.nodes_start !== null && (Pc(i.nodes_start, i.nodes_end), i.nodes_start = i.nodes_end = null), c !== "") {
          if (ht) {
            wt.data;
            for (var d = hr(), g = d; d !== null && (d.nodeType !== 8 || d.data !== ""); ) g = d, d = Sr(d);
            if (d === null) throw ji(), za;
            return nr(wt, g), void (o = Vn(d));
          }
          var f = c + "";
          r ? f = `<svg>${f}</svg>` : a && (f = `<math>${f}</math>`);
          var h = Fs(f);
          if ((r || a) && (h = jn(h)), nr(jn(h), h.lastChild), r || a) for (; jn(h); ) o.before(jn(h));
          else o.before(h);
        }
      } else ht && hr();
    });
  }
  function Nc(n, t, r, a, l) {
    var o;
    ht && hr();
    var c = (o = t.$$slots) == null ? void 0 : o[r], s = !1;
    c === !0 && (c = t.children, s = !0), c === void 0 || c(n, s ? () => a : a);
  }
  function Qc(n, t, r) {
    ht && hr();
    var a, l, o = n, c = null;
    function s() {
      l && (Xr(l), l = null), l = c, c = null;
    }
    Kr(() => {
      if (a !== (a = t())) {
        if (a) {
          var i = o;
          c = qn(() => r(i, a));
        }
        s();
      }
    }, ei), ht && (o = wt);
  }
  function Wc(n, t, r, a, l, o) {
    let c = ht;
    var s, i;
    ht && hr();
    var d = null;
    ht && wt.nodeType === 1 && (d = wt, hr());
    var g, f = ht ? wt : n;
    Kr(() => {
      const h = t() || null;
      var _ = h === "svg" ? "http://www.w3.org/2000/svg" : null;
      h !== s && (g && (h === null ? Xr(g, () => {
        g = null, i = null;
      }) : h === i ? Ol(g) : Gn(g)), h && h !== i && (g = qn(() => {
        if (nr(d = ht ? d : _ ? document.createElementNS(_, h) : document.createElement(h), d), a) {
          ht && (b = h, Fg.includes(b)) && d.append(document.createComment(""));
          var v = ht ? jn(d) : d.appendChild(Pr());
          ht && (v === null ? Yn(!1) : Vn(v)), a(d, v);
        }
        var b;
        At.nodes_end = d, f.before(d);
      })), (s = h) && (i = s));
    }, ei), c && (Yn(!0), Vn(f));
  }
  function Es(n, t, r) {
    Qi(() => {
      var a = nn(() => t(n, r == null ? void 0 : r()) || {});
      if (r && (a != null && a.update)) {
        var l = !1, o = {};
        Wi(() => {
          var c = r();
          Gc(c), l && Al(o, c) && (o = c, a.update(c));
        }), l = !0;
      }
      if (a != null && a.destroy) return () => a.destroy();
    });
  }
  function Eg(n, t) {
    var r, a = void 0;
    Kr(() => {
      a !== (a = t()) && (r && (Gn(r), r = null), a && (r = qn(() => {
        Qi(() => a(n));
      })));
    });
  }
  function Uc(n) {
    var t, r, a = "";
    if (typeof n == "string" || typeof n == "number") a += n;
    else if (typeof n == "object") if (Array.isArray(n)) {
      var l = n.length;
      for (t = 0; t < l; t++) n[t] && (r = Uc(n[t])) && (a && (a += " "), a += r);
    } else for (r in n) n[r] && (a && (a += " "), a += r);
    return a;
  }
  function Zi(n) {
    return typeof n == "object" ? (function() {
      for (var t, r, a = 0, l = "", o = arguments.length; a < o; a++) (t = arguments[a]) && (r = Uc(t)) && (l && (l += " "), l += r);
      return l;
    })(n) : n != null ? n : "";
  }
  const Hc = [...` 	
\r\f \v\uFEFF`];
  function Zc(n, t = !1) {
    var r = t ? " !important;" : ";", a = "";
    for (var l in n) {
      var o = n[l];
      o != null && o !== "" && (a += " " + l + ": " + o + r);
    }
    return a;
  }
  function Rs(n) {
    return n[0] !== "-" || n[1] !== "-" ? n.toLowerCase() : n;
  }
  function Lt(n, t, r, a, l, o) {
    var c = n.__className;
    if (ht || c !== r || c === void 0) {
      var s = (function(g, f, h) {
        var _ = g == null ? "" : "" + g;
        if (f && (_ = _ ? _ + " " + f : f), h) {
          for (var v in h) if (h[v]) _ = _ ? _ + " " + v : v;
          else if (_.length) for (var b = v.length, x = 0; (x = _.indexOf(v, x)) >= 0; ) {
            var D = x + b;
            x !== 0 && !Hc.includes(_[x - 1]) || D !== _.length && !Hc.includes(_[D]) ? x = D : _ = (x === 0 ? "" : _.substring(0, x)) + _.substring(D + 1);
          }
        }
        return _ === "" ? null : _;
      })(r, a, o);
      ht && s === n.getAttribute("class") || (s == null ? n.removeAttribute("class") : t ? n.className = s : n.setAttribute("class", s)), n.__className = r;
    } else if (o && l !== o) for (var i in o) {
      var d = !!o[i];
      l != null && d === !!l[i] || n.classList.toggle(i, d);
    }
    return o;
  }
  function Ns(n, t = {}, r, a) {
    for (var l in r) {
      var o = r[l];
      t[l] !== o && (r[l] == null ? n.style.removeProperty(l) : n.style.setProperty(l, o, a));
    }
  }
  function Vt(n, t, r, a) {
    var l = n.__style;
    if (ht || l !== t) {
      var o = (function(c, s) {
        if (s) {
          var i, d, g = "";
          if (Array.isArray(s) ? (i = s[0], d = s[1]) : i = s, c) {
            c = String(c).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
            var f = !1, h = 0, _ = !1, v = [];
            i && v.push(...Object.keys(i).map(Rs)), d && v.push(...Object.keys(d).map(Rs));
            var b = 0, x = -1;
            const W = c.length;
            for (var D = 0; D < W; D++) {
              var S = c[D];
              if (_ ? S === "/" && c[D - 1] === "*" && (_ = !1) : f ? f === S && (f = !1) : S === "/" && c[D + 1] === "*" ? _ = !0 : S === '"' || S === "'" ? f = S : S === "(" ? h++ : S === ")" && h--, !_ && f === !1 && h === 0) {
                if (S === ":" && x === -1) x = D;
                else if (S === ";" || D === W - 1) {
                  if (x !== -1) {
                    var I = Rs(c.substring(b, x).trim());
                    v.includes(I) || (S !== ";" && D++, g += " " + c.substring(b, D).trim() + ";");
                  }
                  b = D + 1, x = -1;
                }
              }
            }
          }
          return i && (g += Zc(i)), d && (g += Zc(d, !0)), (g = g.trim()) === "" ? null : g;
        }
        return c == null ? null : String(c);
      })(t, a);
      ht && o === n.getAttribute("style") || (o == null ? n.removeAttribute("style") : n.style.cssText = o), n.__style = t;
    } else a && (Array.isArray(a) ? (Ns(n, r == null ? void 0 : r[0], a[0]), Ns(n, r == null ? void 0 : r[1], a[1], "important")) : Ns(n, r, a));
    return a;
  }
  function Ji(n, t, r = !1) {
    if (n.multiple) {
      if (t == null) return;
      if (!Fi(t)) return void console.warn("https://svelte.dev/e/select_multiple_invalid_value");
      for (var a of n.options) a.selected = t.includes(Jc(a));
    } else {
      for (a of n.options)
        if (Cg(Jc(a), t)) return void (a.selected = !0);
      r && t === void 0 || (n.selectedIndex = -1);
    }
  }
  function Qs(n) {
    var t = new MutationObserver(() => {
      Ji(n, n.__value);
    });
    t.observe(n, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ["value"] }), As(() => {
      t.disconnect();
    });
  }
  function Jc(n) {
    return "__value" in n ? n.__value : n.value;
  }
  const hi = Symbol("class"), pi = Symbol("style"), Yc = Symbol("is custom element"), Kc = Symbol("is html");
  function ea(n) {
    if (ht) {
      var t, r = !1, a = () => {
        if (!r) {
          if (r = !0, n.hasAttribute("value")) {
            var l = n.value;
            Pe(n, "value", null), n.value = l;
          }
          if (n.hasAttribute("checked")) {
            var o = n.checked;
            Pe(n, "checked", null), n.checked = o;
          }
        }
      };
      n.__on_r = a, t = a, li.length === 0 && mg(tc), li.push(t), kc();
    }
  }
  function La(n, t) {
    var r = El(n);
    r.value !== (r.value = t != null ? t : void 0) && (n.value !== t || t === 0 && n.nodeName === "PROGRESS") && (n.value = t != null ? t : "");
  }
  function Yi(n, t) {
    var r = El(n);
    r.checked !== (r.checked = t != null ? t : void 0) && (n.checked = t);
  }
  function Rg(n, t) {
    t ? n.hasAttribute("selected") || n.setAttribute("selected", "") : n.removeAttribute("selected");
  }
  function Pe(n, t, r, a) {
    var l = El(n);
    ht && (l[t] = n.getAttribute(t), t === "src" || t === "srcset" || t === "href" && n.nodeName === "LINK") || l[t] !== (l[t] = r) && (t === "loading" && (n[vg] = r), r == null ? n.removeAttribute(t) : typeof r != "string" && td(n).includes(t) ? n[t] = r : n.setAttribute(t, r));
  }
  function Xc(n, t, r = [], a = [], l, o = !1, c = !1) {
    sc(r, a, (s) => {
      var i = void 0, d = {}, g = n.nodeName === "SELECT", f = !1;
      if (Kr(() => {
        var _ = t(...s.map(e)), v = (function(x, D, S, I, W = !1) {
          if (ht && W && x.tagName === "INPUT") {
            var Q = x;
            (Q.type === "checkbox" ? "defaultChecked" : "defaultValue") in S || ea(Q);
          }
          var E = El(x), K = E[Yc], M = !E[Kc];
          let te = ht && K;
          te && Yn(!1);
          var A = D || {}, L = x.tagName === "OPTION";
          for (var se in D) se in S || (S[se] = null);
          S.class ? S.class = Zi(S.class) : S[hi] && (S.class = null), S[pi] && (S.style != null || (S.style = null));
          var Z = td(x);
          for (const J in S) {
            let X = S[J];
            if (L && J === "value" && X == null) x.value = x.__value = "", A[J] = X;
            else if (J !== "class") if (J !== "style") {
              var H = A[J];
              if (X !== H || X === void 0 && x.hasAttribute(J)) {
                A[J] = X;
                var z = J[0] + J[1];
                if (z !== "$$") if (z === "on") {
                  const B = {}, F = "$$" + J;
                  let V = J.slice(2);
                  var C = Vg(V);
                  if (Dg(V) && (V = V.slice(0, -7), B.capture = !0), !C && H) {
                    if (X != null) continue;
                    x.removeEventListener(V, A[F], B), A[F] = null;
                  }
                  if (X != null) if (C) x[`__${V}`] = X, On([V]);
                  else {
                    let O = function(ee) {
                      A[J].call(this, ee);
                    };
                    A[F] = Os(V, x, O, B);
                  }
                  else C && (x[`__${V}`] = void 0);
                } else if (J === "style") Pe(x, J, X);
                else if (J === "autofocus") Ig(x, !!X);
                else if (K || J !== "__value" && (J !== "value" || X == null)) if (J === "selected" && L) Rg(x, X);
                else {
                  var R = J;
                  M || (R = qg(R));
                  var N = R === "defaultValue" || R === "defaultChecked";
                  if (X != null || K || N) N || Z.includes(R) && (K || typeof X != "string") ? (x[R] = X, R in E && (E[R] = An)) : typeof X != "function" && Pe(x, R, X);
                  else if (E[J] = null, R === "value" || R === "checked") {
                    let B = x;
                    const F = D === void 0;
                    if (R === "value") {
                      let V = B.defaultValue;
                      B.removeAttribute(R), B.defaultValue = V, B.value = B.__value = F ? V : null;
                    } else {
                      let V = B.defaultChecked;
                      B.removeAttribute(R), B.defaultChecked = V, B.checked = !!F && V;
                    }
                  } else x.removeAttribute(J);
                }
                else x.value = x.__value = X;
              }
            } else Vt(x, X, D == null ? void 0 : D[pi], S[pi]), A[J] = X, A[pi] = S[pi];
            else Lt(x, x.namespaceURI === "http://www.w3.org/1999/xhtml", X, I, D == null ? void 0 : D[hi], S[hi]), A[J] = X, A[hi] = S[hi];
          }
          return te && Yn(!0), A;
        })(n, i, _, l, o, c);
        f && g && "value" in _ && Ji(n, _.value);
        for (let x of Object.getOwnPropertySymbols(d)) _[x] || Gn(d[x]);
        for (let x of Object.getOwnPropertySymbols(_)) {
          var b = _[x];
          x.description !== "@attach" || i && b === i[x] || (d[x] && Gn(d[x]), d[x] = qn(() => Eg(n, () => b))), v[x] = b;
        }
        i = v;
      }), g) {
        var h = n;
        Qi(() => {
          Ji(h, i.value, !0), Qs(h);
        });
      }
      f = !0;
    });
  }
  function El(n) {
    var t;
    return (t = n.__attributes) != null ? t : n.__attributes = { [Yc]: n.nodeName.includes("-"), [Kc]: n.namespaceURI === "http://www.w3.org/1999/xhtml" };
  }
  var ed = /* @__PURE__ */ new Map();
  function td(n) {
    var t, r = n.getAttribute("is") || n.nodeName, a = ed.get(r);
    if (a) return a;
    ed.set(r, a = []);
    for (var l = n, o = Element.prototype; o !== l; ) {
      for (var c in t = Ro(l)) t[c].set && a.push(c);
      l = Ml(l);
    }
    return a;
  }
  function Ng(n, t, r = t) {
    var a = /* @__PURE__ */ new WeakSet();
    (function(l, o, c, s = c) {
      l.addEventListener(o, () => Gl(c));
      const i = l.__on_r;
      l.__on_r = i ? () => {
        i(), s(!0);
      } : () => s(!0), kc();
    })(n, "input", async (l) => {
      var o = l ? n.defaultValue : n.value;
      if (o = Ws(n) ? Us(o) : o, r(o), vn !== null && a.add(vn), await Ts(), o !== (o = t())) {
        var c = n.selectionStart, s = n.selectionEnd;
        n.value = o != null ? o : "", s !== null && (n.selectionStart = c, n.selectionEnd = Math.min(s, n.value.length));
      }
    }), (ht && n.defaultValue !== n.value || nn(t) == null && n.value) && (r(Ws(n) ? Us(n.value) : n.value), vn !== null && a.add(vn)), Wi(() => {
      var l = t();
      if (n === document.activeElement) {
        var o = Ei != null ? Ei : vn;
        if (a.has(o)) return;
      }
      Ws(n) && l === Us(n.value) || (n.type !== "date" || l || n.value) && l !== n.value && (n.value = l != null ? l : "");
    });
  }
  function Ws(n) {
    var t = n.type;
    return t === "number" || t === "range";
  }
  function Us(n) {
    return n === "" ? null : +n;
  }
  const Hs = class {
    constructor(n) {
      kt(this, vs), kt(this, Ia, /* @__PURE__ */ new WeakMap()), kt(this, Ti), kt(this, xl), mt(this, xl, n);
    }
    observe(n, t) {
      var r = xe(this, Ia).get(n) || /* @__PURE__ */ new Set();
      return r.add(t), xe(this, Ia).set(n, r), ln(this, vs, Fo).call(this).observe(n, xe(this, xl)), () => {
        var a = xe(this, Ia).get(n);
        a.delete(t), a.size === 0 && (xe(this, Ia).delete(n), xe(this, Ti).unobserve(n));
      };
    }
  };
  Ia = /* @__PURE__ */ new WeakMap(), Ti = /* @__PURE__ */ new WeakMap(), xl = /* @__PURE__ */ new WeakMap(), vs = /* @__PURE__ */ new WeakSet(), Fo = function() {
    var n;
    return (n = xe(this, Ti)) != null ? n : mt(this, Ti, new ResizeObserver((t) => {
      for (var r of t) for (var a of (Hs.entries.set(r.target, r), xe(this, Ia).get(r.target) || [])) a(r);
    }));
  }, wn(Hs, "entries", /* @__PURE__ */ new WeakMap());
  var Qg = new Hs({ box: "border-box" });
  function Rl(n, t, r) {
    var a = Qg.observe(n, () => r(n[t]));
    Qi(() => (nn(() => r(n[t])), a));
  }
  function nd(n, t) {
    return n === t || (n == null ? void 0 : n[Jr]) === t;
  }
  function bi(n = {}, t, r, a) {
    return Qi(() => {
      var l, o;
      return Wi(() => {
        l = o, o = [], nn(() => {
          n !== r(...o) && (t(n, ...o), l && nd(r(...l), n) && t(null, ...l));
        });
      }), () => {
        Ta(() => {
          o && nd(r(...o), n) && t(null, ...o);
        });
      };
    }), n;
  }
  function rd(n, t) {
    if (n.l.s) for (const r of n.l.s) e(r);
    t();
  }
  function ad(n, t, r) {
    if (n == null) return t(void 0), yr;
    const a = nn(() => n.subscribe(t, r));
    return a.unsubscribe ? () => a.unsubscribe() : a;
  }
  const fi = [];
  function ta(n, t = yr) {
    let r = null;
    const a = /* @__PURE__ */ new Set();
    function l(c) {
      if (Al(n, c) && (n = c, r)) {
        const s = !fi.length;
        for (const i of a) i[1](), fi.push(i, n);
        if (s) {
          for (let i = 0; i < fi.length; i += 2) fi[i][0](fi[i + 1]);
          fi.length = 0;
        }
      }
    }
    function o(c) {
      l(c(n));
    }
    return { set: l, update: o, subscribe: function(c, s = yr) {
      const i = [c, s];
      return a.add(i), a.size === 1 && (r = t(l, o) || yr), c(n), () => {
        a.delete(i), a.size === 0 && r && (r(), r = null);
      };
    } };
  }
  let id, Nl = !1, Zs = Symbol();
  function Ie(n, t, r) {
    var a;
    const l = (a = r[t]) != null ? a : r[t] = { store: null, source: $s(void 0), unsubscribe: yr };
    if (l.store !== n && !(Zs in r)) if (l.unsubscribe(), l.store = n != null ? n : null, n == null) l.source.v = void 0, l.unsubscribe = yr;
    else {
      var o = !0;
      l.unsubscribe = ad(n, (c) => {
        o ? l.source.v = c : le(l.source, c);
      }), o = !1;
    }
    return n && Zs in r ? (function(c) {
      let s;
      return ad(c, (i) => s = i)(), s;
    })(n) : e(l.source);
  }
  function vt() {
    const n = {};
    return [n, function() {
      As(() => {
        for (var t in n)
          n[t].unsubscribe();
        $a(n, Zs, { enumerable: !1, value: !0 });
      });
    }];
  }
  function m(n, t, r, a) {
    var l, o, c, s, i = !ti || !!(2 & r), d = !!(8 & r), g = !!(16 & r), f = a, h = !0, _ = () => (h && (h = !1, f = g ? nn(a) : a), f);
    if (d) {
      var v = Jr in n || Ho in n;
      c = (o = (l = Da(n, t)) == null ? void 0 : l.set) != null ? o : v && t in n ? (Q) => n[t] = Q : void 0;
    }
    var b, x = !1;
    if (d ? [s, x] = (function(Q) {
      var E = Nl;
      try {
        return Nl = !1, [Q(), Nl];
      } finally {
        Nl = E;
      }
    })(() => n[t]) : s = n[t], s === void 0 && a !== void 0 && (s = _(), c && (i && (function() {
      throw new Error("https://svelte.dev/e/props_invalid_value");
    })(), c(s))), b = i ? () => {
      var Q = n[t];
      return Q === void 0 ? _() : (h = !0, Q);
    } : () => {
      var Q = n[t];
      return Q !== void 0 && (f = void 0), Q === void 0 ? f : Q;
    }, i && !(4 & r)) return b;
    if (c) {
      var D = n.$$legacy;
      return function(Q, E) {
        return arguments.length > 0 ? (i && E && !D && !x || c(E ? b() : Q), Q) : b();
      };
    }
    var S = !1, I = (1 & r ? Ni : ql)(() => (S = !1, b()));
    d && e(I);
    var W = At;
    return function(Q, E) {
      if (arguments.length > 0) {
        const K = E ? e(I) : i && d ? lt(Q) : Q;
        return le(I, K), S = !0, f !== void 0 && (f = K), Q;
      }
      return Oa && S || (W.f & Xa) !== 0 ? I.v : e(I);
    };
  }
  class Wg {
    constructor(t) {
      var r, a;
      kt(this, ca), kt(this, xr);
      var l = /* @__PURE__ */ new Map(), o = (s, i) => {
        var d = $s(i, !1, !1);
        return l.set(s, d), d;
      };
      const c = new Proxy({ ...t.props || {}, $$events: {} }, { get(s, i) {
        var d;
        return e((d = l.get(i)) != null ? d : o(i, Reflect.get(s, i)));
      }, has(s, i) {
        var d;
        return i === Ho || (e((d = l.get(i)) != null ? d : o(i, Reflect.get(s, i))), Reflect.has(s, i));
      }, set(s, i, d) {
        var g;
        return le((g = l.get(i)) != null ? g : o(i, d), d), Reflect.set(s, i, d);
      } });
      mt(this, xr, (t.hydrate ? Lg : jc)(t.component, { target: t.target, anchor: t.anchor, props: c, context: t.context, intro: (r = t.intro) != null && r, recover: t.recover })), (a = t == null ? void 0 : t.props) != null && a.$$host && t.sync !== !1 || k(), mt(this, ca, c.$$events);
      for (const s of Object.keys(xe(this, xr))) s !== "$set" && s !== "$destroy" && s !== "$on" && $a(this, s, { get() {
        return xe(this, xr)[s];
      }, set(i) {
        xe(this, xr)[s] = i;
      }, enumerable: !0 });
      xe(this, xr).$set = (s) => {
        Object.assign(c, s);
      }, xe(this, xr).$destroy = () => {
        (function(s, i) {
          const d = Ls.get(s);
          d ? (Ls.delete(s), d(i)) : Promise.resolve();
        })(xe(this, xr));
      };
    }
    $set(t) {
      xe(this, xr).$set(t);
    }
    $on(t, r) {
      xe(this, ca)[t] = xe(this, ca)[t] || [];
      const a = (...l) => r.call(this, ...l);
      return xe(this, ca)[t].push(a), () => {
        xe(this, ca)[t] = xe(this, ca)[t].filter((l) => l !== a);
      };
    }
    $destroy() {
      xe(this, xr).$destroy();
    }
  }
  function Ql(n, t, r, a) {
    var l;
    const o = (l = r[n]) == null ? void 0 : l.type;
    if (t = o === "Boolean" && typeof t != "boolean" ? t != null : t, !a || !r[n]) return t;
    if (a === "toAttribute") switch (o) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t == null ? null : t;
      default:
        return t;
    }
    else switch (o) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
      default:
        return t;
      case "Number":
        return t != null ? +t : t;
    }
  }
  function Qe(n, t, r, a, l, o) {
    let c = class extends id {
      constructor() {
        super(n, r, l), this.$$p_d = t;
      }
      static get observedAttributes() {
        return Il(t).map((s) => (t[s].attribute || s).toLowerCase());
      }
    };
    return Il(t).forEach((s) => {
      $a(c.prototype, s, { get() {
        return this.$$c && s in this.$$c ? this.$$c[s] : this.$$d[s];
      }, set(i) {
        var d;
        i = Ql(s, i, t), this.$$d[s] = i;
        var g = this.$$c;
        g && ((d = Da(g, s)) != null && d.get ? g[s] = i : g.$set({ [s]: i }));
      } });
    }), a.forEach((s) => {
      $a(c.prototype, s, { get() {
        var i;
        return (i = this.$$c) == null ? void 0 : i[s];
      } });
    }), o && (c = o(c)), n.element = c, c;
  }
  ca = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), typeof HTMLElement == "function" && (id = class extends HTMLElement {
    constructor(n, t, r) {
      super(), wn(this, "$$ctor"), wn(this, "$$s"), wn(this, "$$c"), wn(this, "$$cn", !1), wn(this, "$$d", {}), wn(this, "$$r", !1), wn(this, "$$p_d", {}), wn(this, "$$l", {}), wn(this, "$$l_u", /* @__PURE__ */ new Map()), wn(this, "$$me"), this.$$ctor = n, this.$$s = t, r && this.attachShadow({ mode: "open" });
    }
    addEventListener(n, t, r) {
      if (this.$$l[n] = this.$$l[n] || [], this.$$l[n].push(t), this.$$c) {
        const a = this.$$c.$on(n, t);
        this.$$l_u.set(t, a);
      }
      super.addEventListener(n, t, r);
    }
    removeEventListener(n, t, r) {
      if (super.removeEventListener(n, t, r), this.$$c) {
        const a = this.$$l_u.get(t);
        a && (a(), this.$$l_u.delete(t));
      }
    }
    async connectedCallback() {
      if (this.$$cn = !0, !this.$$c) {
        let t = function(l) {
          return (o) => {
            const c = document.createElement("slot");
            l !== "default" && (c.name = l), p(o, c);
          };
        };
        if (await Promise.resolve(), !this.$$cn || this.$$c) return;
        const r = {}, a = (function(l) {
          const o = {};
          return l.childNodes.forEach((c) => {
            o[c.slot || "default"] = !0;
          }), o;
        })(this);
        for (const l of this.$$s) l in a && (l !== "default" || this.$$d.children ? r[l] = t(l) : (this.$$d.children = t(l), r.default = !0));
        for (const l of this.attributes) {
          const o = this.$$g_p(l.name);
          o in this.$$d || (this.$$d[o] = Ql(o, l.value, this.$$p_d, "toProp"));
        }
        for (const l in this.$$p_d) l in this.$$d || this[l] === void 0 || (this.$$d[l] = this[l], delete this[l]);
        this.$$c = (n = { component: this.$$ctor, target: this.shadowRoot || this, props: { ...this.$$d, $$slots: r, $$host: this } }, new Wg(n)), this.$$me = (function(l) {
          Ga.ensure();
          const o = Br(524352, l, !0);
          return () => {
            Gn(o);
          };
        })(() => {
          Wi(() => {
            var l;
            this.$$r = !0;
            for (const o of Il(this.$$c)) {
              if (!((l = this.$$p_d[o]) != null && l.reflect)) continue;
              this.$$d[o] = this.$$c[o];
              const c = Ql(o, this.$$d[o], this.$$p_d, "toAttribute");
              c == null ? this.removeAttribute(this.$$p_d[o].attribute || o) : this.setAttribute(this.$$p_d[o].attribute || o, c);
            }
            this.$$r = !1;
          });
        });
        for (const l in this.$$l) for (const o of this.$$l[l]) {
          const c = this.$$c.$on(l, o);
          this.$$l_u.set(o, c);
        }
        this.$$l = {};
      }
      var n;
    }
    attributeChangedCallback(n, t, r) {
      var a;
      this.$$r || (n = this.$$g_p(n), this.$$d[n] = Ql(n, r, this.$$p_d, "toProp"), (a = this.$$c) == null || a.$set({ [n]: this.$$d[n] }));
    }
    disconnectedCallback() {
      this.$$cn = !1, Promise.resolve().then(() => {
        !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
      });
    }
    $$g_p(n) {
      return Il(this.$$p_d).find((t) => this.$$p_d[t].attribute === n || !this.$$p_d[t].attribute && t.toLowerCase() === n) || n;
    }
  });
  const ld = "swatchSettings", Ki = (n) => {
    const t = ta(n);
    return ai(ld, t), { swatchSettings: t, setSwatchSettings: (r) => {
      t.set(r);
    } };
  }, sd = () => {
    const n = ri(ld);
    if (!n) throw new Error("getSwatchSettings must be called within a component tree that has setupSwatchSettings initialized");
    return n;
  };
  var Ug = $("<span> </span>"), Hg = $("<div></div>");
  function na(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "product", 7), o = m(t, "class", 7, ""), c = sd(), s = u(() => Ie(c, "$swatchSettings", r).showSelectedSwatchName ? [] : l().options.map((_) => _.name));
    var i = { get product() {
      return l();
    }, set product(_) {
      l(_), k();
    }, get class() {
      return o();
    }, set class(_ = "") {
      o(_), k();
    } }, d = Be(), g = pe(d), f = (_) => {
      var v = Hg();
      $t(v, 21, () => e(s), Mr, (b, x) => {
        var D = Ug(), S = P(D, !0);
        y(D), be(() => ft(S, e(x))), p(b, D);
      }), y(v), be(() => Lt(v, 1, Zi(["kaching-bundles__bar-variant-names", o()]))), p(_, v);
    };
    G(g, (_) => {
      e(s).length && _(f);
    }), p(n, d);
    var h = Xe(i);
    return a(), h;
  }
  Qe(na, { product: {}, class: {} }, [], [], !0);
  const Wl = Math.min, ja = Math.max, Ul = Math.round, Hl = Math.floor, Gr = (n) => ({ x: n, y: n }), Zg = { left: "right", right: "left", bottom: "top", top: "bottom" }, Jg = { start: "end", end: "start" };
  function od(n, t, r) {
    return ja(n, Wl(t, r));
  }
  function Zl(n, t) {
    return typeof n == "function" ? n(t) : n;
  }
  function Ea(n) {
    return n.split("-")[0];
  }
  function Jl(n) {
    return n.split("-")[1];
  }
  function cd(n) {
    return n === "x" ? "y" : "x";
  }
  function dd(n) {
    return n === "y" ? "height" : "width";
  }
  const Yg = /* @__PURE__ */ new Set(["top", "bottom"]);
  function va(n) {
    return Yg.has(Ea(n)) ? "y" : "x";
  }
  function ud(n) {
    return cd(va(n));
  }
  function Js(n) {
    return n.replace(/start|end/g, (t) => Jg[t]);
  }
  const gd = ["left", "right"], hd = ["right", "left"], Kg = ["top", "bottom"], Xg = ["bottom", "top"];
  function eh(n, t, r, a) {
    const l = Jl(n);
    let o = (function(c, s, i) {
      switch (c) {
        case "top":
        case "bottom":
          return i ? s ? hd : gd : s ? gd : hd;
        case "left":
        case "right":
          return s ? Kg : Xg;
        default:
          return [];
      }
    })(Ea(n), r === "start", a);
    return l && (o = o.map((c) => c + "-" + l), t && (o = o.concat(o.map(Js)))), o;
  }
  function Yl(n) {
    return n.replace(/left|right|bottom|top/g, (t) => Zg[t]);
  }
  function Kl(n) {
    const { x: t, y: r, width: a, height: l } = n;
    return { width: a, height: l, top: r, left: t, right: t + a, bottom: r + l, x: t, y: r };
  }
  function pd(n, t, r) {
    let { reference: a, floating: l } = n;
    const o = va(t), c = ud(t), s = dd(c), i = Ea(t), d = o === "y", g = a.x + a.width / 2 - l.width / 2, f = a.y + a.height / 2 - l.height / 2, h = a[s] / 2 - l[s] / 2;
    let _;
    switch (i) {
      case "top":
        _ = { x: g, y: a.y - l.height };
        break;
      case "bottom":
        _ = { x: g, y: a.y + a.height };
        break;
      case "right":
        _ = { x: a.x + a.width, y: f };
        break;
      case "left":
        _ = { x: a.x - l.width, y: f };
        break;
      default:
        _ = { x: a.x, y: a.y };
    }
    switch (Jl(t)) {
      case "start":
        _[c] -= h * (r && d ? -1 : 1);
        break;
      case "end":
        _[c] += h * (r && d ? -1 : 1);
    }
    return _;
  }
  async function bd(n, t) {
    var r;
    t === void 0 && (t = {});
    const { x: a, y: l, platform: o, rects: c, elements: s, strategy: i } = n, { boundary: d = "clippingAncestors", rootBoundary: g = "viewport", elementContext: f = "floating", altBoundary: h = !1, padding: _ = 0 } = Zl(t, n), v = (function(Q) {
      return typeof Q != "number" ? (function(E) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...E };
      })(Q) : { top: Q, right: Q, bottom: Q, left: Q };
    })(_), b = s[h ? f === "floating" ? "reference" : "floating" : f], x = Kl(await o.getClippingRect({ element: (r = await (o.isElement == null ? void 0 : o.isElement(b))) == null || r ? b : b.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(s.floating)), boundary: d, rootBoundary: g, strategy: i })), D = f === "floating" ? { x: a, y: l, width: c.floating.width, height: c.floating.height } : c.reference, S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(s.floating)), I = await (o.isElement == null ? void 0 : o.isElement(S)) && await (o.getScale == null ? void 0 : o.getScale(S)) || { x: 1, y: 1 }, W = Kl(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: s, rect: D, offsetParent: S, strategy: i }) : D);
    return { top: (x.top - W.top + v.top) / I.y, bottom: (W.bottom - x.bottom + v.bottom) / I.y, left: (x.left - W.left + v.left) / I.x, right: (W.right - x.right + v.right) / I.x };
  }
  const th = /* @__PURE__ */ new Set(["left", "top"]);
  function Xl() {
    return typeof window != "undefined";
  }
  function vi(n) {
    return fd(n) ? (n.nodeName || "").toLowerCase() : "#document";
  }
  function sr(n) {
    var t;
    return (n == null || (t = n.ownerDocument) == null ? void 0 : t.defaultView) || window;
  }
  function Or(n) {
    var t;
    return (t = (fd(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : t.documentElement;
  }
  function fd(n) {
    return !!Xl() && (n instanceof Node || n instanceof sr(n).Node);
  }
  function zr(n) {
    return !!Xl() && (n instanceof Element || n instanceof sr(n).Element);
  }
  function Fr(n) {
    return !!Xl() && (n instanceof HTMLElement || n instanceof sr(n).HTMLElement);
  }
  function vd(n) {
    return !(!Xl() || typeof ShadowRoot == "undefined") && (n instanceof ShadowRoot || n instanceof sr(n).ShadowRoot);
  }
  const nh = /* @__PURE__ */ new Set(["inline", "contents"]);
  function Xi(n) {
    const { overflow: t, overflowX: r, overflowY: a, display: l } = $r(n);
    return /auto|scroll|overlay|hidden|clip/.test(t + a + r) && !nh.has(l);
  }
  const rh = /* @__PURE__ */ new Set(["table", "td", "th"]);
  function ah(n) {
    return rh.has(vi(n));
  }
  const ih = [":popover-open", ":modal"];
  function es(n) {
    return ih.some((t) => {
      try {
        return n.matches(t);
      } catch {
        return !1;
      }
    });
  }
  const lh = ["transform", "translate", "scale", "rotate", "perspective"], sh = ["transform", "translate", "scale", "rotate", "perspective", "filter"], oh = ["paint", "layout", "strict", "content"];
  function Ys(n) {
    const t = Ks(), r = zr(n) ? $r(n) : n;
    return lh.some((a) => !!r[a] && r[a] !== "none") || !!r.containerType && r.containerType !== "normal" || !t && !!r.backdropFilter && r.backdropFilter !== "none" || !t && !!r.filter && r.filter !== "none" || sh.some((a) => (r.willChange || "").includes(a)) || oh.some((a) => (r.contain || "").includes(a));
  }
  function Ks() {
    return !(typeof CSS == "undefined" || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none");
  }
  const ch = /* @__PURE__ */ new Set(["html", "body", "#document"]);
  function _i(n) {
    return ch.has(vi(n));
  }
  function $r(n) {
    return sr(n).getComputedStyle(n);
  }
  function ts(n) {
    return zr(n) ? { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop } : { scrollLeft: n.scrollX, scrollTop: n.scrollY };
  }
  function _a(n) {
    if (vi(n) === "html") return n;
    const t = n.assignedSlot || n.parentNode || vd(n) && n.host || Or(n);
    return vd(t) ? t.host : t;
  }
  function _d(n) {
    const t = _a(n);
    return _i(t) ? n.ownerDocument ? n.ownerDocument.body : n.body : Fr(t) && Xi(t) ? t : _d(t);
  }
  function el(n, t, r) {
    var a;
    t === void 0 && (t = []), r === void 0 && (r = !0);
    const l = _d(n), o = l === ((a = n.ownerDocument) == null ? void 0 : a.body), c = sr(l);
    if (o) {
      const s = Xs(c);
      return t.concat(c, c.visualViewport || [], Xi(l) ? l : [], s && r ? el(s) : []);
    }
    return t.concat(l, el(l, [], r));
  }
  function Xs(n) {
    return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
  }
  function kd(n) {
    const t = $r(n);
    let r = parseFloat(t.width) || 0, a = parseFloat(t.height) || 0;
    const l = Fr(n), o = l ? n.offsetWidth : r, c = l ? n.offsetHeight : a, s = Ul(r) !== o || Ul(a) !== c;
    return s && (r = o, a = c), { width: r, height: a, $: s };
  }
  function eo(n) {
    return zr(n) ? n : n.contextElement;
  }
  function ki(n) {
    const t = eo(n);
    if (!Fr(t)) return Gr(1);
    const r = t.getBoundingClientRect(), { width: a, height: l, $: o } = kd(t);
    let c = (o ? Ul(r.width) : r.width) / a, s = (o ? Ul(r.height) : r.height) / l;
    return c && Number.isFinite(c) || (c = 1), s && Number.isFinite(s) || (s = 1), { x: c, y: s };
  }
  const dh = Gr(0);
  function md(n) {
    const t = sr(n);
    return Ks() && t.visualViewport ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop } : dh;
  }
  function Ra(n, t, r, a) {
    t === void 0 && (t = !1), r === void 0 && (r = !1);
    const l = n.getBoundingClientRect(), o = eo(n);
    let c = Gr(1);
    t && (a ? zr(a) && (c = ki(a)) : c = ki(n));
    const s = (function(h, _, v) {
      return _ === void 0 && (_ = !1), !(!v || _ && v !== sr(h)) && _;
    })(o, r, a) ? md(o) : Gr(0);
    let i = (l.left + s.x) / c.x, d = (l.top + s.y) / c.y, g = l.width / c.x, f = l.height / c.y;
    if (o) {
      const h = sr(o), _ = a && zr(a) ? sr(a) : a;
      let v = h, b = Xs(v);
      for (; b && a && _ !== v; ) {
        const x = ki(b), D = b.getBoundingClientRect(), S = $r(b), I = D.left + (b.clientLeft + parseFloat(S.paddingLeft)) * x.x, W = D.top + (b.clientTop + parseFloat(S.paddingTop)) * x.y;
        i *= x.x, d *= x.y, g *= x.x, f *= x.y, i += I, d += W, v = sr(b), b = Xs(v);
      }
    }
    return Kl({ width: g, height: f, x: i, y: d });
  }
  function ns(n, t) {
    const r = ts(n).scrollLeft;
    return t ? t.left + r : Ra(Or(n)).left + r;
  }
  function xd(n, t) {
    const r = n.getBoundingClientRect();
    return { x: r.left + t.scrollLeft - ns(n, r), y: r.top + t.scrollTop };
  }
  const uh = /* @__PURE__ */ new Set(["absolute", "fixed"]);
  function yd(n, t, r) {
    let a;
    if (t === "viewport") a = (function(l, o) {
      const c = sr(l), s = Or(l), i = c.visualViewport;
      let d = s.clientWidth, g = s.clientHeight, f = 0, h = 0;
      if (i) {
        d = i.width, g = i.height;
        const v = Ks();
        (!v || v && o === "fixed") && (f = i.offsetLeft, h = i.offsetTop);
      }
      const _ = ns(s);
      if (_ <= 0) {
        const v = s.ownerDocument, b = v.body, x = getComputedStyle(b), D = v.compatMode === "CSS1Compat" && parseFloat(x.marginLeft) + parseFloat(x.marginRight) || 0, S = Math.abs(s.clientWidth - b.clientWidth - D);
        S <= 25 && (d -= S);
      } else _ <= 25 && (d += _);
      return { width: d, height: g, x: f, y: h };
    })(n, r);
    else if (t === "document") a = (function(l) {
      const o = Or(l), c = ts(l), s = l.ownerDocument.body, i = ja(o.scrollWidth, o.clientWidth, s.scrollWidth, s.clientWidth), d = ja(o.scrollHeight, o.clientHeight, s.scrollHeight, s.clientHeight);
      let g = -c.scrollLeft + ns(l);
      const f = -c.scrollTop;
      return $r(s).direction === "rtl" && (g += ja(o.clientWidth, s.clientWidth) - i), { width: i, height: d, x: g, y: f };
    })(Or(n));
    else if (zr(t)) a = (function(l, o) {
      const c = Ra(l, !0, o === "fixed"), s = c.top + l.clientTop, i = c.left + l.clientLeft, d = Fr(l) ? ki(l) : Gr(1);
      return { width: l.clientWidth * d.x, height: l.clientHeight * d.y, x: i * d.x, y: s * d.y };
    })(t, r);
    else {
      const l = md(n);
      a = { x: t.x - l.x, y: t.y - l.y, width: t.width, height: t.height };
    }
    return Kl(a);
  }
  function wd(n, t) {
    const r = _a(n);
    return !(r === t || !zr(r) || _i(r)) && ($r(r).position === "fixed" || wd(r, t));
  }
  function gh(n, t, r) {
    const a = Fr(t), l = Or(t), o = r === "fixed", c = Ra(n, !0, o, t);
    let s = { scrollLeft: 0, scrollTop: 0 };
    const i = Gr(0);
    function d() {
      i.x = ns(l);
    }
    if (a || !a && !o) if ((vi(t) !== "body" || Xi(l)) && (s = ts(t)), a) {
      const f = Ra(t, !0, o, t);
      i.x = f.x + t.clientLeft, i.y = f.y + t.clientTop;
    } else l && d();
    o && !a && l && d();
    const g = !l || a || o ? Gr(0) : xd(l, s);
    return { x: c.left + s.scrollLeft - i.x - g.x, y: c.top + s.scrollTop - i.y - g.y, width: c.width, height: c.height };
  }
  function to(n) {
    return $r(n).position === "static";
  }
  function Pd(n, t) {
    if (!Fr(n) || $r(n).position === "fixed") return null;
    if (t) return t(n);
    let r = n.offsetParent;
    return Or(n) === r && (r = r.ownerDocument.body), r;
  }
  function Sd(n, t) {
    const r = sr(n);
    if (es(n)) return r;
    if (!Fr(n)) {
      let l = _a(n);
      for (; l && !_i(l); ) {
        if (zr(l) && !to(l)) return l;
        l = _a(l);
      }
      return r;
    }
    let a = Pd(n, t);
    for (; a && ah(a) && to(a); ) a = Pd(a, t);
    return a && _i(a) && to(a) && !Ys(a) ? r : a || (function(l) {
      let o = _a(l);
      for (; Fr(o) && !_i(o); ) {
        if (Ys(o)) return o;
        if (es(o)) return null;
        o = _a(o);
      }
      return null;
    })(n) || r;
  }
  const hh = { convertOffsetParentRelativeRectToViewportRelativeRect: function(n) {
    let { elements: t, rect: r, offsetParent: a, strategy: l } = n;
    const o = l === "fixed", c = Or(a), s = !!t && es(t.floating);
    if (a === c || s && o) return r;
    let i = { scrollLeft: 0, scrollTop: 0 }, d = Gr(1);
    const g = Gr(0), f = Fr(a);
    if ((f || !f && !o) && ((vi(a) !== "body" || Xi(c)) && (i = ts(a)), Fr(a))) {
      const _ = Ra(a);
      d = ki(a), g.x = _.x + a.clientLeft, g.y = _.y + a.clientTop;
    }
    const h = !c || f || o ? Gr(0) : xd(c, i);
    return { width: r.width * d.x, height: r.height * d.y, x: r.x * d.x - i.scrollLeft * d.x + g.x + h.x, y: r.y * d.y - i.scrollTop * d.y + g.y + h.y };
  }, getDocumentElement: Or, getClippingRect: function(n) {
    let { element: t, boundary: r, rootBoundary: a, strategy: l } = n;
    const o = [...r === "clippingAncestors" ? es(t) ? [] : (function(i, d) {
      const g = d.get(i);
      if (g) return g;
      let f = el(i, [], !1).filter((b) => zr(b) && vi(b) !== "body"), h = null;
      const _ = $r(i).position === "fixed";
      let v = _ ? _a(i) : i;
      for (; zr(v) && !_i(v); ) {
        const b = $r(v), x = Ys(v);
        x || b.position !== "fixed" || (h = null), (_ ? !x && !h : !x && b.position === "static" && h && uh.has(h.position) || Xi(v) && !x && wd(i, v)) ? f = f.filter((D) => D !== v) : h = b, v = _a(v);
      }
      return d.set(i, f), f;
    })(t, this._c) : [].concat(r), a], c = o[0], s = o.reduce((i, d) => {
      const g = yd(t, d, l);
      return i.top = ja(g.top, i.top), i.right = Wl(g.right, i.right), i.bottom = Wl(g.bottom, i.bottom), i.left = ja(g.left, i.left), i;
    }, yd(t, c, l));
    return { width: s.right - s.left, height: s.bottom - s.top, x: s.left, y: s.top };
  }, getOffsetParent: Sd, getElementRects: async function(n) {
    const t = this.getOffsetParent || Sd, r = this.getDimensions, a = await r(n.floating);
    return { reference: gh(n.reference, await t(n.floating), n.strategy), floating: { x: 0, y: 0, width: a.width, height: a.height } };
  }, getClientRects: function(n) {
    return Array.from(n.getClientRects());
  }, getDimensions: function(n) {
    const { width: t, height: r } = kd(n);
    return { width: t, height: r };
  }, getScale: ki, isElement: zr, isRTL: function(n) {
    return $r(n).direction === "rtl";
  } };
  function Bd(n, t) {
    return n.x === t.x && n.y === t.y && n.width === t.width && n.height === t.height;
  }
  function ph(n, t, r, a) {
    a === void 0 && (a = {});
    const { ancestorScroll: l = !0, ancestorResize: o = !0, elementResize: c = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: i = !1 } = a, d = eo(n), g = l || o ? [...d ? el(d) : [], ...el(t)] : [];
    g.forEach((x) => {
      l && x.addEventListener("scroll", r, { passive: !0 }), o && x.addEventListener("resize", r);
    });
    const f = d && s ? (function(x, D) {
      let S, I = null;
      const W = Or(x);
      function Q() {
        var E;
        clearTimeout(S), (E = I) == null || E.disconnect(), I = null;
      }
      return (function E(K, M) {
        K === void 0 && (K = !1), M === void 0 && (M = 1), Q();
        const te = x.getBoundingClientRect(), { left: A, top: L, width: se, height: Z } = te;
        if (K || D(), !se || !Z) return;
        const H = { rootMargin: -Hl(L) + "px " + -Hl(W.clientWidth - (A + se)) + "px " + -Hl(W.clientHeight - (L + Z)) + "px " + -Hl(A) + "px", threshold: ja(0, Wl(1, M)) || 1 };
        let z = !0;
        function C(R) {
          const N = R[0].intersectionRatio;
          if (N !== M) {
            if (!z) return E();
            N ? E(!1, N) : S = setTimeout(() => {
              E(!1, 1e-7);
            }, 1e3);
          }
          N !== 1 || Bd(te, x.getBoundingClientRect()) || E(), z = !1;
        }
        try {
          I = new IntersectionObserver(C, { ...H, root: W.ownerDocument });
        } catch {
          I = new IntersectionObserver(C, H);
        }
        I.observe(x);
      })(!0), Q;
    })(d, r) : null;
    let h, _ = -1, v = null;
    c && (v = new ResizeObserver((x) => {
      let [D] = x;
      D && D.target === d && v && (v.unobserve(t), cancelAnimationFrame(_), _ = requestAnimationFrame(() => {
        var S;
        (S = v) == null || S.observe(t);
      })), r();
    }), d && !i && v.observe(d), v.observe(t));
    let b = i ? Ra(n) : null;
    return i && (function x() {
      const D = Ra(n);
      b && !Bd(b, D) && r(), b = D, h = requestAnimationFrame(x);
    })(), r(), () => {
      var x;
      g.forEach((D) => {
        l && D.removeEventListener("scroll", r), o && D.removeEventListener("resize", r);
      }), f == null || f(), (x = v) == null || x.disconnect(), v = null, i && cancelAnimationFrame(h);
    };
  }
  const bh = function(n) {
    return { name: "offset", options: n, async fn(t) {
      var r, a;
      const { x: l, y: o, placement: c, middlewareData: s } = t, i = await (async function(d, g) {
        const { placement: f, platform: h, elements: _ } = d, v = await (h.isRTL == null ? void 0 : h.isRTL(_.floating)), b = Ea(f), x = Jl(f), D = va(f) === "y", S = th.has(b) ? -1 : 1, I = v && D ? -1 : 1, W = Zl(g, d);
        let { mainAxis: Q, crossAxis: E, alignmentAxis: K } = typeof W == "number" ? { mainAxis: W, crossAxis: 0, alignmentAxis: null } : { mainAxis: W.mainAxis || 0, crossAxis: W.crossAxis || 0, alignmentAxis: W.alignmentAxis };
        return x && typeof K == "number" && (E = x === "end" ? -1 * K : K), D ? { x: E * I, y: Q * S } : { x: Q * S, y: E * I };
      })(t, n);
      return c === ((r = s.offset) == null ? void 0 : r.placement) && (a = s.arrow) != null && a.alignmentOffset ? {} : { x: l + i.x, y: o + i.y, data: { ...i, placement: c } };
    } };
  }, fh = function(n) {
    return n === void 0 && (n = {}), { name: "shift", options: n, async fn(t) {
      const { x: r, y: a, placement: l } = t, { mainAxis: o = !0, crossAxis: c = !1, limiter: s = { fn: (x) => {
        let { x: D, y: S } = x;
        return { x: D, y: S };
      } }, ...i } = Zl(n, t), d = { x: r, y: a }, g = await bd(t, i), f = va(Ea(l)), h = cd(f);
      let _ = d[h], v = d[f];
      if (o) {
        const x = h === "y" ? "bottom" : "right";
        _ = od(_ + g[h === "y" ? "top" : "left"], _, _ - g[x]);
      }
      if (c) {
        const x = f === "y" ? "bottom" : "right";
        v = od(v + g[f === "y" ? "top" : "left"], v, v - g[x]);
      }
      const b = s.fn({ ...t, [h]: _, [f]: v });
      return { ...b, data: { x: b.x - r, y: b.y - a, enabled: { [h]: o, [f]: c } } };
    } };
  }, vh = function(n) {
    return n === void 0 && (n = {}), { name: "flip", options: n, async fn(t) {
      var r, a;
      const { placement: l, middlewareData: o, rects: c, initialPlacement: s, platform: i, elements: d } = t, { mainAxis: g = !0, crossAxis: f = !0, fallbackPlacements: h, fallbackStrategy: _ = "bestFit", fallbackAxisSideDirection: v = "none", flipAlignment: b = !0, ...x } = Zl(n, t);
      if ((r = o.arrow) != null && r.alignmentOffset) return {};
      const D = Ea(l), S = va(s), I = Ea(s) === s, W = await (i.isRTL == null ? void 0 : i.isRTL(d.floating)), Q = h || (I || !b ? [Yl(s)] : (function(H) {
        const z = Yl(H);
        return [Js(H), z, Js(z)];
      })(s)), E = v !== "none";
      !h && E && Q.push(...eh(s, b, v, W));
      const K = [s, ...Q], M = await bd(t, x), te = [];
      let A = ((a = o.flip) == null ? void 0 : a.overflows) || [];
      if (g && te.push(M[D]), f) {
        const H = (function(z, C, R) {
          R === void 0 && (R = !1);
          const N = Jl(z), J = ud(z), X = dd(J);
          let B = J === "x" ? N === (R ? "end" : "start") ? "right" : "left" : N === "start" ? "bottom" : "top";
          return C.reference[X] > C.floating[X] && (B = Yl(B)), [B, Yl(B)];
        })(l, c, W);
        te.push(M[H[0]], M[H[1]]);
      }
      if (A = [...A, { placement: l, overflows: te }], !te.every((H) => H <= 0)) {
        var L, se;
        const H = (((L = o.flip) == null ? void 0 : L.index) || 0) + 1, z = K[H];
        if (z && (!(f === "alignment" && S !== va(z)) || A.every((R) => va(R.placement) !== S || R.overflows[0] > 0)))
          return { data: { index: H, overflows: A }, reset: { placement: z } };
        let C = (se = A.filter((R) => R.overflows[0] <= 0).sort((R, N) => R.overflows[1] - N.overflows[1])[0]) == null ? void 0 : se.placement;
        if (!C) switch (_) {
          case "bestFit": {
            var Z;
            const R = (Z = A.filter((N) => {
              if (E) {
                const J = va(N.placement);
                return J === S || J === "y";
              }
              return !0;
            }).map((N) => [N.placement, N.overflows.filter((J) => J > 0).reduce((J, X) => J + X, 0)]).sort((N, J) => N[1] - J[1])[0]) == null ? void 0 : Z[0];
            R && (C = R);
            break;
          }
          case "initialPlacement":
            C = s;
        }
        if (l !== C) return { reset: { placement: C } };
      }
      return {};
    } };
  }, _h = (n, t, r) => {
    const a = /* @__PURE__ */ new Map(), l = { platform: hh, ...r }, o = { ...l.platform, _c: a };
    return (async (c, s, i) => {
      const { placement: d = "bottom", strategy: g = "absolute", middleware: f = [], platform: h } = i, _ = f.filter(Boolean), v = await (h.isRTL == null ? void 0 : h.isRTL(s));
      let b = await h.getElementRects({ reference: c, floating: s, strategy: g }), { x, y: D } = pd(b, d, v), S = d, I = {}, W = 0;
      for (let Q = 0; Q < _.length; Q++) {
        const { name: E, fn: K } = _[Q], { x: M, y: te, data: A, reset: L } = await K({ x, y: D, initialPlacement: d, placement: S, strategy: g, middlewareData: I, rects: b, platform: h, elements: { reference: c, floating: s } });
        x = M != null ? M : x, D = te != null ? te : D, I = { ...I, [E]: { ...I[E], ...A } }, L && W <= 50 && (W++, typeof L == "object" && (L.placement && (S = L.placement), L.rects && (b = L.rects === !0 ? await h.getElementRects({ reference: c, floating: s, strategy: g }) : L.rects), { x, y: D } = pd(b, S, v)), Q = -1);
      }
      return { x, y: D, placement: S, strategy: g, middlewareData: I };
    })(n, t, { ...l, platform: o });
  };
  function or(n) {
    const t = { bold: "bold", light: "300", medium: "500", regular: "normal" };
    for (const r in t) if (n.includes(r)) return t[r];
    return "normal";
  }
  function cr(n) {
    return n.includes("italic") ? "italic" : "normal";
  }
  function Le(n) {
    return `rgba(${n.red}, ${n.green}, ${n.blue}, ${n.alpha})`;
  }
  const kh = { "SF Mono": '"SF Mono", ui-monospace, Menlo, monospace', Helvetica: '"Helvetica Neue", Helvetica, -apple-system, sans-serif', "New York": '"New York", ui-serif, Georgia, serif', "System UI": "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" };
  function mh(n) {
    var t;
    return (t = kh[n]) != null ? t : `"${n}"`;
  }
  function bn(n) {
    return Object.entries(n).reduce((t, [r, a]) => (a && t.push(`--${r}:${a}`), t), []).join(";");
  }
  function Cd(n) {
    var t, r;
    const { colors: a, fonts: l, cornerRadius: o, spacing: c, imageSize: s, imageCornerRadius: i, bundleBarsPerRow: d, dealBars: g } = n, f = a.border || a.primary, h = Math.min(g.length, d ? parseInt(d) : 3).toString();
    return bn({ "block-font-family": l.fontFamily ? mh(l.fontFamily) : null, "block-title-color": Le(a.title), "block-title-font-size": l.blockTitle.size + "px", "block-title-font-weight": or(l.blockTitle.style), "block-title-font-style": cr(l.blockTitle.style), "block-spacing": c == null ? void 0 : c.toString(), "bar-border-radius": (o || 0) + "px", "badge-concave-depth": Math.min(o || 0, 12) + "px", "bar-background-color": Le(a.background), "bar-selected-background-color": Le(a.selectedBackground || a.background), "bar-border-color": Le({ ...f, alpha: 0.3 * f.alpha }), "bar-selected-border-color": Le(f), "block-block-title-color": Le(a.blockTitle || a.title), "bar-title-color": Le(a.title), "bar-title-font-size": l.title.size + "px", "bar-title-font-weight": or(l.title.style), "bar-title-font-style": cr(l.title.style), "bar-subtitle-color": Le(a.subtitle), "bar-subtitle-font-size": l.subtitle.size + "px", "bar-subtitle-font-weight": or(l.subtitle.style), "bar-subtitle-font-style": cr(l.subtitle.style), "bar-price-color": Le(a.price || a.title), "bar-full-price-color": Le(a.fullPrice || a.subtitle), "bar-label-border-top-radius": (o ? o - 1 : 0) + "px", "bar-label-background-color": Le(a.labelBackground), "bar-label-color": Le(a.label), "bar-label-font-size": l.label.size + "px", "bar-label-font-weight": or(l.label.style), "bar-label-font-style": cr(l.label.style), "bar-most-popular-background-color": Le(a.badgeBackground), "bar-most-popular-color": Le(a.badgeText), "bar-variant-select-border-radius": (o || 0) / 2 + "px", "bar-image-size": (s || 48) + "px", "bar-image-border-radius": (i || 0) + "px", "kaching-bundle-products-image-border-radius": (o || 0) / 2 + "px", "kaching-bundles-unit-label-font-size": l.unitLabel ? l.unitLabel.size + "px" : null, "kaching-bundles-unit-label-font-weight": l.unitLabel ? or(l.unitLabel.style) : null, "kaching-bundles-unit-label-font-style": l.unitLabel ? cr(l.unitLabel.style) : null, "bundle-bars-per-row": h, "kaching-collection-breaks-require-selection-background-color": ((t = n.collectionBreaks) == null ? void 0 : t.requireItemSelectionAlert) && Le(n.collectionBreaks.requireItemSelectionAlert.backgroundColor), "kaching-collection-breaks-require-selection-text-color": ((r = n.collectionBreaks) == null ? void 0 : r.requireItemSelectionAlert) && Le(n.collectionBreaks.requireItemSelectionAlert.textColor) });
  }
  const Id = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, xh = (n) => {
    const t = n.replace(/[^a-zA-Z]+/g, "").toLowerCase();
    if (!(t in Id)) return;
    const r = Id[t];
    return { red: r[0], green: r[1], blue: r[2], alpha: 1 };
  }, yh = (n, t) => ({ red: Math.max(0, n.red - Math.round(n.red * t)), green: Math.max(0, n.green - Math.round(n.green * t)), blue: Math.max(0, n.blue - Math.round(n.blue * t)), alpha: n.alpha });
  var wh = $("<div></div>");
  function rs(n, t) {
    Ke(t, !0);
    let r = m(t, "color", 7), a = m(t, "image", 7), l = m(t, "size", 7), o = m(t, "shape", 7), c = m(t, "unavailable", 7, !1);
    const s = u(() => r() ? (function(h) {
      h = h.replace(/^#/, "");
      let _ = parseInt(h, 16);
      return { red: _ >> 16 & 255, green: _ >> 8 & 255, blue: 255 & _, alpha: 1 };
    })(r()) : null), i = u(() => {
      let h = { "kaching-swatch-size": `${l() - 2}px` };
      const _ = { rounded: 20, circle: 50 }[o()];
      return _ && (h = { ...h, "kaching-swatch-border-radius": `${_}%` }), a() ? h = { ...h, "kaching-swatch-image-url": `url(${a()})` } : e(s) && (h = { ...h, "kaching-swatch-color": Le(e(s)), "kaching-swatch-border-color": Le(yh(e(s), 0.1)) }), bn(h);
    });
    var d = { get color() {
      return r();
    }, set color(h) {
      r(h), k();
    }, get image() {
      return a();
    }, set image(h) {
      a(h), k();
    }, get size() {
      return l();
    }, set size(h) {
      l(h), k();
    }, get shape() {
      return o();
    }, set shape(h) {
      o(h), k();
    }, get unavailable() {
      return c();
    }, set unavailable(h = !1) {
      c(h), k();
    } }, g = wh();
    let f;
    return be((h) => {
      f = Lt(g, 1, "kaching-bundles__swatch", null, f, h), Vt(g, e(i));
    }, [() => ({ "kaching-bundles__swatch--unavailable": c() })]), p(n, g), Xe(d);
  }
  function Ht(n, t) {
    Ke(t, !0);
    let r = m(t, "element", 7, "button"), a = m(t, "class", 7), l = m(t, "onclick", 7), o = m(t, "onkeydown", 7), c = m(t, "data-value", 7), s = m(t, "title", 7), i = m(t, "id", 7), d = m(t, "role", 7), g = m(t, "aria-label", 7), f = m(t, "aria-expanded", 7), h = m(t, "aria-haspopup", 7), _ = m(t, "aria-selected", 7), v = m(t, "aria-checked", 7), b = m(t, "aria-activedescendant", 7), x = m(t, "aria-controls", 7), D = m(t, "tabindex", 7), S = m(t, "disabled", 7, !1), I = m(t, "ref", 15);
    function W(M) {
      o() && (o()(M), M.defaultPrevented) || S() || M.key !== "Enter" && M.key !== " " || (M.preventDefault(), M.currentTarget.click());
    }
    function Q(M) {
      var te;
      if (S()) return M.preventDefault(), void M.stopPropagation();
      (te = l()) == null || te(M);
    }
    var E = { get element() {
      return r();
    }, set element(M = "button") {
      r(M), k();
    }, get class() {
      return a();
    }, set class(M) {
      a(M), k();
    }, get onclick() {
      return l();
    }, set onclick(M) {
      l(M), k();
    }, get onkeydown() {
      return o();
    }, set onkeydown(M) {
      o(M), k();
    }, get "data-value"() {
      return c();
    }, set "data-value"(M) {
      c(M), k();
    }, get title() {
      return s();
    }, set title(M) {
      s(M), k();
    }, get id() {
      return i();
    }, set id(M) {
      i(M), k();
    }, get role() {
      return d();
    }, set role(M) {
      d(M), k();
    }, get "aria-label"() {
      return g();
    }, set "aria-label"(M) {
      g(M), k();
    }, get "aria-expanded"() {
      return f();
    }, set "aria-expanded"(M) {
      f(M), k();
    }, get "aria-haspopup"() {
      return h();
    }, set "aria-haspopup"(M) {
      h(M), k();
    }, get "aria-selected"() {
      return _();
    }, set "aria-selected"(M) {
      _(M), k();
    }, get "aria-checked"() {
      return v();
    }, set "aria-checked"(M) {
      v(M), k();
    }, get "aria-activedescendant"() {
      return b();
    }, set "aria-activedescendant"(M) {
      b(M), k();
    }, get "aria-controls"() {
      return x();
    }, set "aria-controls"(M) {
      x(M), k();
    }, get tabindex() {
      return D();
    }, set tabindex(M) {
      D(M), k();
    }, get disabled() {
      return S();
    }, set disabled(M = !1) {
      S(M), k();
    }, get ref() {
      return I();
    }, set ref(M) {
      I(M), k();
    } }, K = Be();
    return Wc(pe(K), r, 0, (M, te) => {
      bi(M, (L) => I(L), () => I()), Xc(M, () => {
        var L, se;
        return { role: (L = d()) != null ? L : "button", tabindex: (se = D()) != null ? se : S() ? -1 : 0, class: a(), onclick: Q, "data-value": c(), title: s(), id: i(), "aria-label": g(), "aria-expanded": f(), "aria-haspopup": h(), "aria-selected": _(), "aria-checked": v(), "aria-activedescendant": b(), "aria-controls": x(), "aria-disabled": S() ? "true" : void 0, onkeydown: W };
      });
      var A = Be();
      Nc(pe(A), t, "default", {}), p(te, A);
    }), p(n, K), Xe(E);
  }
  Qe(rs, { color: {}, image: {}, size: {}, shape: {}, unavailable: {} }, [], [], !0), Qe(Ht, { element: {}, class: {}, onclick: {}, onkeydown: {}, "data-value": {}, title: {}, id: {}, role: {}, "aria-label": {}, "aria-expanded": {}, "aria-haspopup": {}, "aria-selected": {}, "aria-checked": {}, "aria-activedescendant": {}, "aria-controls": {}, tabindex: {}, disabled: {}, ref: {} }, ["default"], [], !0);
  const Md = "translations", Na = (n = {}) => {
    const t = ta(zd(n));
    return ai(Md, t), { translate: t, setTranslations: (r) => {
      t.set(zd(r));
    } };
  }, Ct = () => {
    const n = ri(Md);
    if (!n) throw new Error("getTranslations must be called within a component tree that has setupTranslations initialized");
    return n;
  }, zd = (n) => (t) => n[t] || t;
  function no(n) {
    return String.fromCharCode(64 + n);
  }
  async function vr(n, t, r = {}, a = !0) {
    a && await Ts();
    const l = new CustomEvent(t, { detail: r, bubbles: !0, cancelable: !0, composed: !0 });
    n.dispatchEvent(l);
  }
  function Zt(n) {
    return typeof n == "number" ? n : Number(n.split("/").pop());
  }
  function _r(n) {
    const t = n.variants.filter((r) => r.availableForSale);
    return t.length > 0 ? { ...n, variants: t } : n;
  }
  var Ph = $("<span> <!></span>"), Sh = $("<span> </span>"), Bh = $("<!> <!>", 1), Ch = $("<span> <!></span>"), Ih = $("<span> </span>"), Mh = $("<!> <!>", 1), zh = $('<div class="kaching-bundles__swatch-dropdown__options" role="listbox"></div>'), $h = $('<div class="kaching-bundles__swatch-dropdown kaching-bundles-option"><!> <!></div>');
  function $d(n, t) {
    Ke(t, !0);
    const r = () => Ie(D, "$translate", a), [a, l] = vt();
    let o = m(t, "option", 7), c = m(t, "swatchSize", 7), s = m(t, "swatchShape", 7), i = m(t, "value", 7), d = m(t, "onChange", 7), g = ze(!1), f = ze(-1), h = ze(void 0), _ = ze(void 0), v = u(() => o().optionValues.find((Z) => Z.name === i()) || o().optionValues[0]);
    const b = `swatch-dropdown-${Math.random().toString(16).slice(2)}`;
    function x(Z) {
      return `${b}-option-${Z}`;
    }
    const D = Ct();
    function S() {
      le(g, !0), le(f, o().optionValues.findIndex((Z) => Z.name === i()), !0), e(f) === -1 && le(f, 0);
    }
    function I() {
      le(g, !1), le(f, -1);
    }
    function W() {
      var Z;
      I(), (Z = e(h)) == null || Z.focus();
    }
    function Q(Z) {
      i(Z), W();
      try {
        const H = o().optionValues.find((z) => z.name === Z);
        H != null && H.unavailable && vr(document.body, "kaching-unavailable-option-value-selected", { swatch: "dropdown" });
      } catch (H) {
        console.error(H);
      }
      d()(i());
    }
    function E(Z, H) {
      const z = (C) => {
        Z.contains(C.target) || H();
      };
      return document.addEventListener("click", z, !0), { destroy() {
        document.removeEventListener("click", z, !0);
      } };
    }
    Je(() => {
      if (e(g) && e(h) && e(_)) return ph(e(h), e(_), async () => {
        if (!e(h) || !e(_)) return;
        const Z = e(_), { x: H, y: z } = await _h(e(h), Z, { placement: "bottom-start", strategy: "fixed", middleware: [bh(2), vh(), fh({ padding: 8 })] });
        Z.style.left = `${H}px`, Z.style.top = `${z}px`;
      });
    });
    var K = { get option() {
      return o();
    }, set option(Z) {
      o(Z), k();
    }, get swatchSize() {
      return c();
    }, set swatchSize(Z) {
      c(Z), k();
    }, get swatchShape() {
      return s();
    }, set swatchShape(Z) {
      s(Z), k();
    }, get value() {
      return i();
    }, set value(Z) {
      i(Z), k();
    }, get onChange() {
      return d();
    }, set onChange(Z) {
      d(Z), k();
    } }, M = $h(), te = P(M);
    {
      let Z = u(() => e(g) && e(f) >= 0 ? x(e(f)) : void 0);
      Ht(te, { element: "span", class: "kaching-bundles__bar-variant-select", role: "combobox", get "aria-label"() {
        return o().name;
      }, onclick: function(H) {
        e(g) ? (le(g, !1), le(f, -1)) : S(), H.preventDefault();
      }, onkeydown: function(H) {
        if (!e(g)) return void (H.key !== "ArrowDown" && H.key !== "ArrowUp" && H.key !== "Enter" && H.key !== " " || (H.preventDefault(), S()));
        const z = o().optionValues.length;
        switch (H.key) {
          case "Escape":
            H.preventDefault(), W();
            break;
          case "ArrowDown":
            H.preventDefault(), le(f, e(f) < z - 1 ? e(f) + 1 : 0, !0);
            break;
          case "ArrowUp":
            H.preventDefault(), le(f, e(f) > 0 ? e(f) - 1 : z - 1, !0);
            break;
          case "Home":
            H.preventDefault(), le(f, 0);
            break;
          case "End":
            H.preventDefault(), le(f, z - 1);
            break;
          case "Enter":
          case " ":
            H.preventDefault(), e(f) >= 0 && Q(o().optionValues[e(f)].name);
        }
      }, get "aria-expanded"() {
        return e(g);
      }, "aria-haspopup": "listbox", get "aria-controls"() {
        return b;
      }, get "aria-activedescendant"() {
        return e(Z);
      }, get ref() {
        return e(h);
      }, set ref(H) {
        le(h, H, !0);
      }, children: (H, z) => {
        var C = Bh(), R = pe(C);
        rs(R, { get color() {
          return e(v).swatch.color;
        }, get image() {
          return e(v).swatch.image;
        }, get size() {
          return c();
        }, get shape() {
          return s();
        }, get unavailable() {
          return e(v).unavailable;
        } }), rt(q(R, 2), () => e(v).name, (N) => {
          var J = Be(), X = pe(J), B = (V) => {
            var O = Ph(), ee = P(O);
            Ve(q(ee), () => r()("system.unavailable_option_value")), y(O), be(() => {
              var ge;
              return ft(ee, `${(ge = e(v).name) != null ? ge : ""} - `);
            }), p(V, O);
          }, F = (V) => {
            var O = Sh(), ee = P(O, !0);
            y(O), be(() => ft(ee, e(v).name)), p(V, O);
          };
          G(X, (V) => {
            e(v).unavailable ? V(B) : V(F, !1);
          }), p(N, J);
        }), p(H, C);
      }, $$slots: { default: !0 } });
    }
    var A = q(te, 2), L = (Z) => {
      var H = zh();
      $t(H, 23, () => o().optionValues, (z) => z.name, (z, C, R) => {
        {
          let N = u(() => ["kaching-bundles__swatch-dropdown__option", "kaching-bundles-option-value", e(R) === e(f) && "kaching-bundles__swatch-dropdown__option--focused"]), J = u(() => x(e(R))), X = u(() => e(C).name === i());
          Ht(z, { element: "span", get class() {
            return e(N);
          }, get id() {
            return e(J);
          }, role: "option", tabindex: -1, get "aria-selected"() {
            return e(X);
          }, get "data-value"() {
            return e(C).name;
          }, onclick: () => Q(e(C).name), children: (B, F) => {
            var V = Mh(), O = pe(V);
            {
              let w = u(() => 1.333 * c());
              rs(O, { get color() {
                return e(C).swatch.color;
              }, get image() {
                return e(C).swatch.image;
              }, get size() {
                return e(w);
              }, get shape() {
                return s();
              }, get unavailable() {
                return e(C).unavailable;
              } });
            }
            var ee = q(O, 2), ge = (w) => {
              var U = Ch(), oe = P(U);
              Ve(q(oe), () => r()("system.unavailable_option_value")), y(U), be(() => {
                var j;
                return ft(oe, `${(j = e(C).name) != null ? j : ""} - `);
              }), p(w, U);
            }, T = (w) => {
              var U = Ih(), oe = P(U, !0);
              y(U), be(() => ft(oe, e(C).name)), p(w, U);
            };
            G(ee, (w) => {
              e(C).unavailable ? w(ge) : w(T, !1);
            }), p(B, V);
          }, $$slots: { default: !0 } });
        }
      }), y(H), bi(H, (z) => le(_, z), () => e(_)), be(() => Pe(H, "id", b)), p(Z, H);
    };
    G(A, (Z) => {
      e(g) && Z(L);
    }), y(M), Es(M, (Z, H) => E == null ? void 0 : E(Z, H), () => I), be(() => {
      Pe(M, "data-name", o().name), Pe(M, "data-value", i());
    }), p(n, M);
    var se = Xe(K);
    return l(), se;
  }
  function Dh(n, t, r) {
    try {
      const a = t().optionValues.find((l) => l.name === n.target.value);
      a != null && a.unavailable && vr(document.body, "kaching-unavailable-option-value-selected", { swatch: "default" });
    } catch (a) {
      console.error(a);
    }
    r()(n.target.value);
  }
  Qe($d, { option: {}, swatchSize: {}, swatchShape: {}, value: {}, onChange: {} }, [], [], !0);
  var Ah = $(" <!>", 1), Vh = $('<option class="kaching-bundles-option-value"><!></option>'), Th = $('<select class="kaching-bundles__bar-variant-select kaching-bundles-option"></select>');
  function Dd(n, t) {
    Ke(t, !0);
    const [r, a] = vt();
    let l = m(t, "option", 7), o = m(t, "value", 7), c = m(t, "onChange", 7);
    const s = Ct();
    var i, d = { get option() {
      return l();
    }, set option(h) {
      l(h), k();
    }, get value() {
      return o();
    }, set value(h) {
      o(h), k();
    }, get onChange() {
      return c();
    }, set onChange(h) {
      c(h), k();
    } }, g = Th();
    g.__change = [Dh, l, c], $t(g, 21, () => l().optionValues, (h) => h.name, (h, _) => {
      var v = Vh(), b = P(v), x = (I) => {
        var W = Ah(), Q = pe(W);
        Ve(q(Q), () => Ie(s, "$translate", r)("system.unavailable_option_value")), be(() => {
          var E;
          return ft(Q, `${(E = e(_).name) != null ? E : ""} - `);
        }), p(I, W);
      }, D = (I) => {
        var W = Wn();
        be(() => ft(W, e(_).name)), p(I, W);
      };
      G(b, (I) => {
        e(_).unavailable ? I(x) : I(D, !1);
      }), y(v);
      var S = {};
      be(() => {
        var I;
        Pe(v, "data-value", e(_).name), S !== (S = e(_).name) && (v.value = (I = v.__value = e(_).name) != null ? I : "");
      }), p(h, v);
    }), y(g), Qs(g), be(() => {
      var h;
      Pe(g, "aria-label", l().name), Pe(g, "data-name", l().name), Pe(g, "data-value", o()), i !== (i = o()) && (g.value = (h = g.__value = o()) != null ? h : "", Ji(g, o()));
    }), p(n, g);
    var f = Xe(d);
    return a(), f;
  }
  On(["change"]), Qe(Dd, { option: {}, value: {}, onChange: {} }, [], [], !0);
  var qh = $('<div class="kaching-bundles__swatch-buttons kaching-bundles-option"></div>');
  function Ad(n, t) {
    Ke(t, !0);
    const [r, a] = vt();
    let l = m(t, "option", 7), o = m(t, "swatchSize", 7), c = m(t, "swatchShape", 7), s = m(t, "value", 7), i = m(t, "onChange", 7);
    const d = Ct();
    var g = { get option() {
      return l();
    }, set option(_) {
      l(_), k();
    }, get swatchSize() {
      return o();
    }, set swatchSize(_) {
      o(_), k();
    }, get swatchShape() {
      return c();
    }, set swatchShape(_) {
      c(_), k();
    }, get value() {
      return s();
    }, set value(_) {
      s(_), k();
    }, get onChange() {
      return i();
    }, set onChange(_) {
      i(_), k();
    } }, f = qh();
    $t(f, 21, () => l().optionValues, (_) => _.name, (_, v) => {
      {
        let b = u(() => ["kaching-bundles__swatch-buttons__button", "kaching-bundles-option-value", e(v).name === s() && "kaching-bundles__swatch-buttons__button--selected"]), x = u(() => e(v).unavailable ? `${e(v).name} - ${Ie(d, "$translate", r)("system.unavailable_option_value")}` : e(v).name);
        Ht(_, { element: "span", get class() {
          return e(b);
        }, get title() {
          return e(v).name;
        }, get "aria-label"() {
          return e(x);
        }, get "data-value"() {
          return e(v).name;
        }, onclick: () => (function(D) {
          s(D);
          try {
            const S = l().optionValues.find((I) => I.name === D);
            S != null && S.unavailable && vr(document.body, "kaching-unavailable-option-value-selected", { swatch: "buttons" });
          } catch (S) {
            console.error(S);
          }
          i()(s());
        })(e(v).name), children: (D, S) => {
          rs(D, { get color() {
            return e(v).swatch.color;
          }, get image() {
            return e(v).swatch.image;
          }, get size() {
            return o();
          }, get shape() {
            return c();
          }, get unavailable() {
            return e(v).unavailable;
          } });
        }, $$slots: { default: !0 } });
      }
    }), y(f), be(() => {
      Pe(f, "data-name", l().name), Pe(f, "data-value", s());
    }), p(n, f);
    var h = Xe(g);
    return a(), h;
  }
  function Vd(n, t) {
    Ke(t, !0);
    let r = m(t, "value", 7), a = m(t, "option", 7), l = m(t, "swatchSize", 7, 18), o = m(t, "swatchShape", 7, "circle"), c = m(t, "swatchType", 7), s = m(t, "onChange", 7);
    function i(v) {
      s()({ position: a().position, value: v });
    }
    var d = { get value() {
      return r();
    }, set value(v) {
      r(v), k();
    }, get option() {
      return a();
    }, set option(v) {
      a(v), k();
    }, get swatchSize() {
      return l();
    }, set swatchSize(v = 18) {
      l(v), k();
    }, get swatchShape() {
      return o();
    }, set swatchShape(v = "circle") {
      o(v), k();
    }, get swatchType() {
      return c();
    }, set swatchType(v) {
      c(v), k();
    }, get onChange() {
      return s();
    }, set onChange(v) {
      s(v), k();
    } }, g = Be(), f = pe(g), h = (v) => {
      $d(v, { get option() {
        return a();
      }, get swatchSize() {
        return l();
      }, get swatchShape() {
        return o();
      }, get value() {
        return r();
      }, onChange: i });
    }, _ = (v) => {
      var b = Be(), x = pe(b), D = (I) => {
        Ad(I, { get option() {
          return a();
        }, get swatchSize() {
          return l();
        }, get swatchShape() {
          return o();
        }, get value() {
          return r();
        }, onChange: i });
      }, S = (I) => {
        Dd(I, { get option() {
          return a();
        }, get value() {
          return r();
        }, onChange: i });
      };
      G(x, (I) => {
        c() === "colorButtons" || c() === "imageButtons" || c() === "productImageButtons" ? I(D) : I(S, !1);
      }, !0), p(v, b);
    };
    return G(f, (v) => {
      c() === "colorDropdown" || c() === "imageDropdown" || c() === "productImageDropdown" || c() === "mixedDropdown" ? v(h) : v(_, !1);
    }), p(n, g), Xe(d);
  }
  Qe(Ad, { option: {}, swatchSize: {}, swatchShape: {}, value: {}, onChange: {} }, [], [], !0), Qe(Vd, { value: {}, option: {}, swatchSize: {}, swatchShape: {}, swatchType: {}, onChange: {} }, [], [], !0);
  const Td = "mediaImages", tl = (n = []) => {
    const t = ta(qd(n));
    return ai(Td, t), { getMediaImageUrl: t, setMediaImages: (r) => {
      t.set(qd(r));
    } };
  }, Fn = () => {
    const n = ri(Td);
    if (!n) throw new Error("getMediaImages must be called within a component tree that has setupMediaImages initialized");
    return n;
  }, qd = (n) => (t) => {
    if (!t) return;
    const r = n.find((a) => a.gid === t);
    return r == null ? void 0 : r.url;
  }, Gd = "config", Qa = (n) => {
    const t = ta(n);
    return ai(Gd, t), { config: t, setConfig: (r) => {
      t.set(r);
    } };
  }, _n = () => {
    const n = ri(Gd);
    if (!n) throw new Error("getConfig must be called within a component tree that has setupConfig initialized");
    return n;
  };
  var Gh = $('<img alt="" class="kaching-bundles__bar-variant-image"/>'), Oh = $('<div class="kaching-bundles__bar-variant-number"><span>#</span> <span> </span></div>'), Fh = $('<span class="kaching-bundles__bar-variant-option__name-value"> </span>'), Lh = $('<div class="kaching-bundles__bar-variant-option"><span class="kaching-bundles__bar-variant-option__name"><span class="kaching-bundles__bar-variant-option__name-label"> </span> <!></span> <!></div>'), jh = $('<div class="kaching-bundles__invalid-variant-error"><!></div>'), Eh = $('<div><div><!> <div class="kaching-bundles__bar-variant-main"><div class="kaching-bundles__bar-variant-selects"></div> <!></div></div></div>');
  function Un(n, t) {
    Ke(t, !0);
    const r = () => Ie(x, "$config", l), a = () => Ie(D, "$swatchSettings", l), [l, o] = vt(), c = (T, w = yr) => {
      Vd(T, { get option() {
        return w();
      }, get swatchSize() {
        return a().swatchSize;
      }, get swatchShape() {
        return a().swatchShape;
      }, get swatchType() {
        return w().swatchType;
      }, get value() {
        return e(I)[w().position - 1];
      }, onChange: M });
    };
    let s = m(t, "product", 7), i = m(t, "selectedVariantId", 7), d = m(t, "number", 7, void 0), g = m(t, "showImage", 7, !1), f = m(t, "forceDropdown", 7, !1), h = m(t, "onChange", 7), _ = m(t, "onOptionChange", 7);
    const v = Ct(), b = Fn(), x = _n(), D = sd();
    let S = u(() => s().variants.find((T) => T.id === i())), I = ze(lt([]));
    Je(() => {
      if (e(S)) le(I, [...e(S).options], !0);
      else {
        if (i() && r().featureFlags.hide_missing_variants && s().variants.length > 0) {
          const T = Z(s().variants, 0, e(I));
          if (T) return le(I, [...T.options], !0), void nn(() => h()(T.id));
        }
        le(I, [], !0);
      }
    });
    let W = u(() => {
      return T = s(), w = e(I), U = a().swatchOptions, oe = Ie(b, "$getMediaImageUrl", l), j = f(), T.options.map((re) => ({ name: re.name, position: re.position, swatchType: te(re, U, j), optionValues: re.optionValues.map((Y) => {
        const ie = se(re.position, Y.name, w, T);
        if (r().featureFlags.hide_missing_variants && ie.length === 0) return null;
        const _e = !ie.some((Se) => Se.availableForSale);
        return { name: Y.name, unavailable: _e, swatch: A(re, Y, U, oe, w, T) };
      }).filter((Y) => Y !== null) }));
      var T, w, U, oe, j;
    }), Q = u(() => a().showSelectedSwatchName && !f());
    const E = ["colorButtons", "imageButtons", "productImageButtons"];
    let K = u(() => {
      var T;
      return g() ? ((T = e(S)) == null ? void 0 : T.image) || s().image : null;
    });
    function M({ position: T, value: w }) {
      const U = e(I)[T - 1];
      e(I)[T - 1] = w;
      let oe = s().variants.find((j) => e(I).every((re, Y) => j.options[Y] === re));
      if (!oe && r().featureFlags.hide_missing_variants) {
        const j = Z(se(T, w, e(I), s()), T, e(I));
        j && (oe = j, le(I, [...oe.options], !0));
      }
      oe && (h()(oe.id), _() && _()(T, w, U));
    }
    function te(T, w, U) {
      var oe;
      const j = (oe = w.find((re) => re.name === T.defaultName)) == null ? void 0 : oe.swatchType;
      if (j && j !== "default") return U ? (function(re) {
        switch (re) {
          case "colorButtons":
            return "colorDropdown";
          case "imageButtons":
            return "imageDropdown";
          case "productImageButtons":
            return "productImageDropdown";
          default:
            return re;
        }
      })(j) : j;
      if (!r().featureFlags.native_swatches_disabled) {
        for (const re of T.optionValues) if (re.swatch.image || re.swatch.color) return "mixedDropdown";
      }
      return "default";
    }
    function A(T, w, U, oe, j, re) {
      var Y, ie;
      const _e = r().featureFlags.native_swatches_disabled ? null : w.swatch, Se = U.find((me) => me.name === T.defaultName);
      if (!Se || Se.swatchType === "default") return _e || { color: null, image: null };
      if (Se.swatchType === "colorButtons" || Se.swatchType === "colorDropdown")
        return { color: L((Y = Se.colors.find((me) => me.name === w.defaultName)) == null ? void 0 : Y.color) || (_e == null ? void 0 : _e.color) || L(xh(w.defaultName)) || null, image: null };
      if (Se.swatchType === "imageButtons" || Se.swatchType === "imageDropdown") {
        const me = oe(((ie = Se.images.find((ye) => ye.name === w.defaultName)) == null ? void 0 : ie.mediaImageGID) || null);
        return { color: (_e == null ? void 0 : _e.color) || null, image: me || (_e == null ? void 0 : _e.image) || null };
      }
      if (Se.swatchType === "productImageDropdown" || Se.swatchType === "productImageButtons") {
        const me = T.position - 1, ye = re.variants.filter((ae) => ae.image && ae.options[me] === w.name);
        let he = ye[0], ce = 0;
        for (const ae of ye) {
          let de = 0;
          for (let fe = 0; fe < me; fe++) ae.options[fe] === j[fe] && de++;
          de > ce && (ce = de, he = ae);
        }
        return { color: null, image: (he == null ? void 0 : he.image) || null };
      }
      return { color: null, image: null };
    }
    function L(T) {
      if (!T) return;
      const { red: w, green: U, blue: oe } = T;
      return `#${w.toString(16).padStart(2, "0")}${U.toString(16).padStart(2, "0")}${oe.toString(16).padStart(2, "0")}`;
    }
    function se(T, w, U, oe) {
      const j = T - 1, re = U.slice(0, j);
      return oe.variants.filter((Y) => Y.options[j] === w && re.every((ie, _e) => Y.options[_e] === ie));
    }
    function Z(T, w, U) {
      if (T.length === 0) return null;
      let oe = T[0], j = -1;
      const re = U.slice(w);
      for (const Y of T) {
        let ie = 0;
        for (let _e = 0; _e < re.length; _e++) Y.options[w + _e] === re[_e] && (ie += re.length - _e);
        ie > j && (j = ie, oe = Y);
      }
      return oe;
    }
    var H = { get product() {
      return s();
    }, set product(T) {
      s(T), k();
    }, get selectedVariantId() {
      return i();
    }, set selectedVariantId(T) {
      i(T), k();
    }, get number() {
      return d();
    }, set number(T = void 0) {
      d(T), k();
    }, get showImage() {
      return g();
    }, set showImage(T = !1) {
      g(T), k();
    }, get forceDropdown() {
      return f();
    }, set forceDropdown(T = !1) {
      f(T), k();
    }, get onChange() {
      return h();
    }, set onChange(T) {
      h(T), k();
    }, get onOptionChange() {
      return _();
    }, set onOptionChange(T) {
      _(T), k();
    } }, z = Eh();
    let C;
    var R = P(z);
    let N;
    var J = P(R), X = (T) => {
      var w = Gh();
      be(() => Pe(w, "src", e(K))), p(T, w);
    }, B = (T) => {
      var w = Be(), U = pe(w), oe = (j) => {
        var re = Oh(), Y = q(P(re), 2), ie = P(Y, !0);
        y(Y), y(re), be(() => ft(ie, d())), p(j, re);
      };
      G(U, (j) => {
        d() && j(oe);
      }, !0), p(T, w);
    };
    G(J, (T) => {
      e(K) ? T(X) : T(B, !1);
    });
    var F = q(J, 2), V = P(F);
    $t(V, 21, () => e(W), (T) => T.name, (T, w) => {
      var U = Be(), oe = pe(U), j = (Y) => {
        var ie = Lh(), _e = P(ie), Se = P(_e), me = P(Se);
        y(Se);
        var ye = q(Se, 2), he = (ae) => {
          var de = Fh(), fe = P(de, !0);
          y(de), be(() => ft(fe, e(I)[e(w).position - 1])), p(ae, de);
        };
        G(ye, (ae) => {
          E.includes(e(w).swatchType) && ae(he);
        }), y(_e);
        var ce = q(_e, 2);
        c(ce, () => e(w)), y(ie), be(() => {
          var ae;
          return ft(me, `${(ae = e(w).name) != null ? ae : ""}:`);
        }), p(Y, ie);
      }, re = (Y) => {
        c(Y, () => e(w));
      };
      G(oe, (Y) => {
        e(Q) ? Y(j) : Y(re, !1);
      }), p(T, U);
    }), y(V);
    var O = q(V, 2), ee = (T) => {
      var w = jh();
      Ve(P(w), () => Ie(v, "$translate", l)("system.invalid_variant")), y(w), p(T, w);
    };
    G(O, (T) => {
      e(S) && e(S).availableForSale || T(ee);
    }), y(F), y(R), y(z), be((T, w) => {
      C = Lt(z, 1, "kaching-bundles__bar-variant", null, C, T), N = Lt(R, 1, "kaching-bundles__bar-variant__content", null, N, w);
    }, [() => ({ "kaching-bundles__bar-variant--invalid": !e(S) || !e(S).availableForSale }), () => ({ "kaching-bundles__bar-variant__content--with-option-names": e(Q) })]), p(n, z);
    var ge = Xe(H);
    return o(), ge;
  }
  Qe(Un, { product: {}, selectedVariantId: {}, number: {}, showImage: {}, forceDropdown: {}, onChange: {}, onOptionChange: {} }, [], [], !0);
  var Rh = $('<a target="_blank"><!></a>'), Nh = $("<div><!></div>");
  function Xn(n, t) {
    Ke(t, !0);
    const r = m(t, "url", 7), a = m(t, "children", 7), l = m(t, "class", 7);
    var o = { get url() {
      return r();
    }, set url(g) {
      r(g), k();
    }, get children() {
      return a();
    }, set children(g) {
      a(g), k();
    }, get class() {
      return l();
    }, set class(g) {
      l(g), k();
    } }, c = Be(), s = pe(c), i = (g) => {
      var f = Rh();
      jl(P(f), a), y(f), be(() => {
        Pe(f, "href", r()), Lt(f, 1, Zi(l()));
      }), p(g, f);
    }, d = (g) => {
      var f = Nh();
      jl(P(f), a), y(f), be(() => Lt(f, 1, Zi(l()))), p(g, f);
    };
    return G(s, (g) => {
      r() ? g(i) : g(d, !1);
    }), p(n, c), Xe(o);
  }
  Qe(Xn, { url: {}, children: {}, class: {} }, [], [], !0);
  const Od = "priceFormatter", mi = (n = "{{amount}}", t) => {
    const r = ta(Fd(n, t));
    return ai(Od, r), { formatPrice: r, setMoneyFormat: (a, l) => {
      r.set(Fd(a, l));
    } };
  }, cn = () => {
    const n = ri(Od);
    if (!n) throw new Error("getPriceFormatter must be called within a component tree that has setupPriceFormatter initialized");
    return n;
  }, Fd = (n, t) => (r, a) => Qh(r, n, (!(a != null && a.preserveDecimals) || Math.round(r) % 100 == 0) && t), Qh = (n, t, r) => {
    const a = ((i, d) => d ? i.includes("amount_no_decimals") ? i : i.replace(/\{\{.+\}\}/g, "{{ amount_no_decimals }}") : i)(t, r), l = { amount: (i) => i.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), amount_no_decimal: (i) => i.toLocaleString("en-US", { maximumFractionDigits: 0 }), amount_no_decimals: (i) => i.toLocaleString("en-US", { maximumFractionDigits: 0 }), amount_with_comma_separator: (i) => i.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), amount_no_decimals_with_comma_separator: (i) => i.toLocaleString("de-DE", { maximumFractionDigits: 0 }), amount_with_apostrophe_separator: (i) => i.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, "'"), amount_no_decimals_with_space_separator: (i) => i.toLocaleString("fr-FR", { maximumFractionDigits: 0 }).replace(/\s/g, " "), amount_with_space_separator: (i) => i.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, " "), amount_with_period_and_space_separator: (i) => i.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, " ").replace(",", ".") }, o = /{{\s*(\w+)\s*}}/, c = a.match(o), s = (l[c ? c[1] : "amount"] || l.amount)(n / 100);
    return a.replace(o, s);
  }, Ld = "data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.08398%205H7.91732'%20stroke='%23344054'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", jd = "data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.00065%202.08337V7.91671M2.08398%205.00004H7.91732'%20stroke='%23344054'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
  var pt = ((n) => (n.QuantityBreak = "quantity-break", n.Bxgy = "bxgy", n.Bundle = "bundle", n.MixAndMatch = "mix-and-match", n.Sku = "sku", n))(pt || {});
  const Wh = { new_price: ({ totalDiscountedPrice: n, quantity: t }) => ({ value: n / t, type: "price" }), new_total: ({ totalDiscountedPrice: n }) => ({ value: n, type: "price" }), original_price: ({ totalFullPrice: n, quantity: t }) => ({ value: n / t, type: "price" }), original_total: ({ totalFullPrice: n }) => ({ value: n, type: "price" }), saved_total: ({ totalCompareAtPrice: n, totalDiscountedPrice: t }) => ({ value: n - t, type: "price" }), saved_amount: ({ totalCompareAtPrice: n, totalDiscountedPrice: t, quantity: r }) => ({ value: (n - t) / r, type: "price" }), quantity: ({ quantity: n }) => ({ value: n, type: "number" }), gifts_count: ({ freeGiftsCount: n }) => {
    if (n !== void 0) return { value: n, type: "number" };
  }, buy_quantity: ({ dealBar: n, quantity: t }) => {
    if ((n == null ? void 0 : n.dealBarType) !== pt.Bxgy) return;
    const r = n.buyQuantity + n.getQuantity;
    return { value: t - Math.floor(t / r) * n.getQuantity, type: "number" };
  }, get_quantity: ({ dealBar: n, quantity: t }) => {
    if ((n == null ? void 0 : n.dealBarType) !== pt.Bxgy) return;
    const r = n.buyQuantity + n.getQuantity;
    return { value: Math.floor(t / r) * n.getQuantity, type: "number" };
  }, saved_percentage: ({ totalCompareAtPrice: n, totalDiscountedPrice: t, dealBar: r, legacySavedPercentage: a }) => {
    if (a && r && (r.dealBarType === pt.QuantityBreak || !r.dealBarType) && r.discountType === "percentage") return { value: Math.round(Number(r.discountValue)), type: "percentage" };
    if (n <= 0) return { value: 0, type: "percentage" };
    let l = (n - t) / n * 100;
    return l = Math.round(100 * l) / 100, { value: Math.round(l), type: "percentage" };
  }, new_unit_price: ({ totalDiscountedPrice: n, unitQuantity: t }) => {
    if (t) return { value: n / t, type: "price", preserveDecimals: !0 };
  }, saved_per_unit: ({ totalCompareAtPrice: n, totalDiscountedPrice: t, unitQuantity: r }) => {
    if (r) return { value: (n - t) / r, type: "price", preserveDecimals: !0 };
  }, original_unit_price: ({ totalFullPrice: n, unitQuantity: t }) => {
    if (t) return { value: n / t, type: "price", preserveDecimals: !0 };
  }, unit_quantity: ({ unitQuantity: n }) => {
    if (n) return { value: n, type: "number" };
  }, selling_plan_discount: ({ sellingPlan: n, totalFullPrice: t, quantity: r }) => {
    const a = n == null ? void 0 : n.priceAdjustment;
    if (a) switch (a.type) {
      case "percentage":
        return a.value <= 0 ? void 0 : { value: a.value, type: "percentage" };
      case "fixed_amount":
        return a.value <= 0 ? void 0 : { value: a.value, type: "price" };
      case "price": {
        const l = t / r - a.value;
        return l <= 0 ? void 0 : { value: l, type: "price" };
      }
    }
  } }, Uh = (n) => {
    if (!n) return;
    const t = n.options.join(" / ");
    return t && t !== "Default Title" ? t : void 0;
  }, Hh = ({ variable: n, product: t, products: r, selectedProductTitles: a, selectedVariants: l, sellingPlan: o }) => {
    var c, s;
    const i = n.match(/^product_(\d+)$/);
    if (i) {
      const d = Number(i[1]);
      return (c = r == null ? void 0 : r.get(d)) == null ? void 0 : c.title;
    }
    switch (n) {
      case "product":
        return (s = t == null ? void 0 : t.title) != null ? s : a && a.length > 0 ? a.join(", ") : void 0;
      case "variant_title":
        return ((d) => {
          if (!d) return;
          const g = [];
          for (const { variant: f, quantity: h } of d) {
            const _ = Uh(f);
            if (!_) continue;
            const v = g.find((b) => b.title === _);
            v ? v.count += h : g.push({ title: _, count: h });
          }
          return g.length !== 0 ? g.length === 1 && g[0].count === 1 ? g[0].title : g.map(({ title: f, count: h }) => `${h}× ${f}`).join(", ") : void 0;
        })(l);
      case "metafield":
        return (t == null ? void 0 : t.metafields.text) || void 0;
      case "metafield2":
        return (t == null ? void 0 : t.metafields.text2) || void 0;
      case "metafield3":
        return (t == null ? void 0 : t.metafields.text3) || void 0;
      case "metafield4":
        return (t == null ? void 0 : t.metafields.text4) || void 0;
      case "selling_plan":
        return (o == null ? void 0 : o.name) || void 0;
    }
  }, Ed = /{{\s*([a-zA-Z0-9_.]+)\s*(?:([+\-*/])\s*(\d+(?:\.\d+)?)?)?\s*}}/g, Rd = /\{\{[^}]*\}\}/g, Zh = (n) => n.replace(Rd, ""), Jh = ({ priceFormatter: n, product: t, products: r, selectedProductTitles: a, selectedVariants: l, totalFullPrice: o, totalCompareAtPrice: c, totalDiscountedPrice: s, quantity: i, dealBar: d, legacySavedPercentage: g, unitQuantity: f, sellingPlan: h, freeGiftsCount: _ }) => (v, b, x) => {
    const D = Wh[v];
    if (D) {
      const S = D({ totalFullPrice: o, totalCompareAtPrice: c != null ? c : o, totalDiscountedPrice: s, quantity: i, dealBar: d, legacySavedPercentage: g, unitQuantity: f, sellingPlan: h, freeGiftsCount: _ });
      if (!S) return;
      let I = S.value;
      if (b !== void 0 && x !== void 0) {
        const Q = ((E, K, M) => {
          switch (K) {
            case "+":
              return E + M;
            case "-":
              return E - M;
            case "*":
              return E * M;
            case "/":
              return M === 0 ? void 0 : E / M;
          }
        })(I, b, S.type !== "price" || b !== "+" && b !== "-" ? x : 100 * x);
        if (Q === void 0) return;
        I = Q;
      }
      const W = b === "/" || S.preserveDecimals === !0;
      return ((Q, E, K, M) => {
        switch (E) {
          case "price":
            return K(Q, { preserveDecimals: M });
          case "number":
            return String(Math.round(100 * Q) / 100);
          case "percentage":
            return `${Math.round(Q)}%`;
        }
      })(I, S.type, n, W);
    }
    if (b === void 0) return Hh({ variable: v, product: t, products: r, selectedProductTitles: a, selectedVariants: l, sellingPlan: h });
  }, dn = ({ priceFormatter: n, product: t, products: r, selectedProductTitles: a, selectedVariants: l, totalFullPrice: o, totalCompareAtPrice: c, totalDiscountedPrice: s, quantity: i, dealBar: d, legacySavedPercentage: g = !1, unitQuantity: f, sellingPlan: h, freeGiftsCount: _ }) => (v) => {
    if (!v) return v;
    const b = Jh({ priceFormatter: n, product: t, products: r, selectedProductTitles: a, selectedVariants: l, totalFullPrice: o, totalCompareAtPrice: c, totalDiscountedPrice: s, quantity: i, dealBar: d, legacySavedPercentage: g, unitQuantity: f, sellingPlan: h, freeGiftsCount: _ });
    return v.replace(Ed, (x, D, S, I) => {
      var W;
      if (S && I) {
        const Q = parseFloat(I);
        return (W = b(D, S, Q)) != null ? W : "";
      }
      return b(D) || "";
    }).replace(Rd, "");
  };
  function ro(n) {
    const { unitPriceMeasurement: t } = n;
    return t ? t.referenceValue == 1 ? t.referenceUnit : `${t.referenceValue}${t.referenceUnit}` : null;
  }
  function kr(n) {
    return n.reduce((t, { variant: r, quantity: a }) => {
      const { unitPriceMeasurement: l } = r;
      if (!l) return t;
      const o = (function(c, s, i) {
        if (s === i) return c;
        if (s === "g" && i === "kg" || s === "ml" && i === "l") return c / 1e3;
      })(l.quantityValue, l.quantityUnit, l.referenceUnit);
      return o ? t + o / l.referenceValue * a : t;
    }, 0) || null;
  }
  var Yh = $('<img class="kaching-bundles__choose-multiple-gifts__product-image" alt=""/>'), Kh = $('<span class="kaching-bundles__choose-multiple-gifts__product-title"> </span>'), Xh = $('<span class="kaching-bundles__choose-multiple-gifts__subtitle"><!></span>'), ep = $('<div class="kaching-bundles__choose-multiple-gifts__product-compare-at-price"><!></div>'), tp = $('<span class="kaching-bundles__choose-multiple-gifts__variant-counter"></span>'), np = $('<div class="kaching-bundles__choose-multiple-gifts__variant-selector-row"><div class="kaching-bundles__choose-multiple-gifts__variant-selector-content"><!> <div class="kaching-bundles__choose-multiple-gifts__variant-selector-with-counter"><!> <div class="kaching-bundles__choose-multiple-gifts__variant-selector-wrapper"><!></div></div></div></div>'), rp = $('<div class="kaching-bundles__choose-multiple-gifts__variant-selectors"></div>'), ap = $('<img alt="Decrease"/>'), ip = $('<img alt="Increase"/>'), lp = $('<div class="kaching-bundles__choose-multiple-gifts__gift-quantity"><!> <span class="kaching-bundles__choose-multiple-gifts__gift-quantity-value"> </span> <!></div>'), sp = $("<img/>"), op = $("<!> <!>", 1), cp = $('<div class="kaching-bundles__choose-multiple-gifts__product"><div class="kaching-bundles__choose-multiple-gifts__product-container"><!> <div class="kaching-bundles__choose-multiple-gifts__product-content"><!> <!> <div class="kaching-bundles__choose-multiple-gifts__product-price-container"><div class="kaching-bundles__choose-multiple-gifts__product-price"><!></div> <!></div> <!></div></div> <div class="kaching-bundles__choose-multiple-gifts__product-actions"><!> <!></div></div>');
  function Nd(n, t) {
    Ke(t, !0);
    const r = () => Ie(x, "$formatPrice", l), a = () => Ie(b, "$translate", l), [l, o] = vt(), c = m(t, "product", 7), s = m(t, "dealBlock", 7), i = m(t, "multipleGiftsSelector", 7), d = m(t, "selectedVariantIds", 7), g = m(t, "availableQuantity", 7), f = m(t, "onSelect", 7), h = m(t, "onRemove", 7), _ = m(t, "onVariantChange", 7), v = m(t, "onQuantityChange", 7), b = Ct(), x = cn();
    let D = ze(!1);
    const S = u(() => d().length > 0), I = u(() => d().length || 1), W = u(() => !e(S) && g() === 0), Q = u(() => c().variants.find((me) => me.id === d()[0]) || c().variants[0]), E = u(() => e(D) && e(Q).image || c().image), K = u(() => d().map((me) => c().variants.find((ye) => ye.id === me) || c().variants[0])), M = u(() => e(K).length > 0 ? e(K).reduce((me, ye) => me + H(s(), ye), 0) : H(s(), e(Q))), te = u(() => c().url ? `${c().url}?variant=${d()[0] || c().variants[0].id}` : void 0), A = u(() => s().chooseMultipleGiftsModal), L = u(() => dn({ priceFormatter: r(), product: c(), totalFullPrice: e(M), totalDiscountedPrice: 0, quantity: e(I), unitQuantity: kr(e(K).map((me) => ({ variant: me, quantity: 1 }))) })), se = u(() => {
      var me;
      return e(L)(a()(((me = e(A)) == null ? void 0 : me.subtitle) || ""));
    }), Z = u(() => {
      var me, ye;
      return e(S) ? (me = e(A)) == null ? void 0 : me.buttonTextAfterSelection : (ye = e(A)) == null ? void 0 : ye.buttonTextBeforeSelection;
    });
    function H(me, ye) {
      return me.useProductCompareAtPrice && ye.compareAtPrice ? Math.max(ye.price, ye.compareAtPrice) : ye.price;
    }
    function z() {
      e(I) <= 1 || v()(e(I) - 1);
    }
    function C() {
      e(I) >= g() || v()(e(I) + 1);
    }
    var R = { get product() {
      return c();
    }, set product(me) {
      c(me), k();
    }, get dealBlock() {
      return s();
    }, set dealBlock(me) {
      s(me), k();
    }, get multipleGiftsSelector() {
      return i();
    }, set multipleGiftsSelector(me) {
      i(me), k();
    }, get selectedVariantIds() {
      return d();
    }, set selectedVariantIds(me) {
      d(me), k();
    }, get availableQuantity() {
      return g();
    }, set availableQuantity(me) {
      g(me), k();
    }, get onSelect() {
      return f();
    }, set onSelect(me) {
      f(me), k();
    }, get onRemove() {
      return h();
    }, set onRemove(me) {
      h(me), k();
    }, get onVariantChange() {
      return _();
    }, set onVariantChange(me) {
      _(me), k();
    }, get onQuantityChange() {
      return v();
    }, set onQuantityChange(me) {
      v(me), k();
    } }, N = cp(), J = P(N), X = P(J), B = (me) => {
      Xn(me, { get url() {
        return e(te);
      }, class: "kaching-bundles__choose-multiple-gifts__product-image-link", children: (ye, he) => {
        var ce = Yh();
        Pe(ce, "width", 100), Pe(ce, "height", 100), be(() => Pe(ce, "src", e(E))), p(ye, ce);
      }, $$slots: { default: !0 } });
    };
    G(X, (me) => {
      e(E) && me(B);
    });
    var F = q(X, 2), V = P(F);
    Xn(V, { get url() {
      return e(te);
    }, class: "kaching-bundles__choose-multiple-gifts__product-link", children: (me, ye) => {
      var he = Kh(), ce = P(he, !0);
      y(he), be(() => ft(ce, c().title)), p(me, he);
    }, $$slots: { default: !0 } });
    var O = q(V, 2), ee = (me) => {
      var ye = Xh();
      Ve(P(ye), () => e(se)), y(ye), p(me, ye);
    };
    G(O, (me) => {
      e(se) && me(ee);
    });
    var ge = q(O, 2), T = P(ge);
    Ve(P(T), () => a()("system.free")), y(T);
    var w = q(T, 2), U = (me) => {
      var ye = Be();
      rt(pe(ye), () => e(M), (he) => {
        var ce = ep();
        Ve(P(ce), () => r()(e(M))), y(ce), p(he, ce);
      }), p(me, ye);
    };
    G(w, (me) => {
      i().showPrice && e(M) > 0 && me(U);
    }), y(ge);
    var oe = q(ge, 2), j = (me) => {
      var ye = rp();
      $t(ye, 21, d, Mr, (he, ce, ae) => {
        var de = np(), fe = P(de), $e = P(fe), qe = (ke) => {
          na(ke, { get product() {
            return c();
          }, class: "kaching-bundles__choose-multiple-gifts__product-option-names" });
        };
        G($e, (ke) => {
          ae === 0 && ke(qe);
        });
        var De = q($e, 2), ne = P(De), we = (ke) => {
          var Me = tp();
          Me.textContent = `#${ae + 1}`, p(ke, Me);
        };
        G(ne, (ke) => {
          d().length > 1 && ke(we);
        });
        var Ze = q(ne, 2);
        Un(P(Ze), { get product() {
          return c();
        }, get selectedVariantId() {
          return e(ce);
        }, onChange: (ke) => {
          le(D, !0), _()(ae, ke);
        } }), y(Ze), y(De), y(fe), y(de), p(he, de);
      }), y(ye), p(me, ye);
    };
    G(oe, (me) => {
      c().variants.length > 1 && me(j);
    }), y(F), y(J);
    var re = q(J, 2), Y = P(re), ie = (me) => {
      var ye = lp(), he = P(ye);
      {
        let fe = u(() => e(I) <= 1);
        Ht(he, { element: "span", class: "kaching-bundles__choose-multiple-gifts__gift-quantity-button", onclick: z, get disabled() {
          return e(fe);
        }, children: ($e, qe) => {
          var De = ap();
          be(() => Pe(De, "src", Ld)), p($e, De);
        }, $$slots: { default: !0 } });
      }
      var ce = q(he, 2), ae = P(ce, !0);
      y(ce);
      var de = q(ce, 2);
      {
        let fe = u(() => e(I) >= g());
        Ht(de, { element: "span", class: "kaching-bundles__choose-multiple-gifts__gift-quantity-button", onclick: C, get disabled() {
          return e(fe);
        }, children: ($e, qe) => {
          var De = ip();
          be(() => Pe(De, "src", jd)), p($e, De);
        }, $$slots: { default: !0 } });
      }
      y(ye), be(() => ft(ae, e(I))), p(me, ye);
    };
    G(Y, (me) => {
      e(S) && i().maxQuantity > 1 && me(ie);
    });
    var _e = q(Y, 2);
    {
      let me = u(() => ["kaching-bundles__choose-multiple-gifts__product-button", e(W) && "kaching-bundles__choose-multiple-gifts__product-button--disabled", e(S) && "kaching-bundles__choose-multiple-gifts__product-button--selected"]);
      Ht(_e, { element: "span", get class() {
        return e(me);
      }, onclick: function() {
        e(S) ? (le(D, !1), h()()) : f()();
      }, get disabled() {
        return e(W);
      }, children: (ye, he) => {
        var ce = op(), ae = pe(ce), de = (De) => {
          var ne = sp();
          be((we) => {
            Pe(ne, "src", "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.3333%205.00008V4.33341C13.3333%203.39999%2013.3333%202.93328%2013.1517%202.57676C12.9919%202.26316%2012.7369%202.00819%2012.4233%201.8484C12.0668%201.66675%2011.6001%201.66675%2010.6667%201.66675H9.33333C8.39991%201.66675%207.9332%201.66675%207.57668%201.8484C7.26308%202.00819%207.00811%202.26316%206.84832%202.57676C6.66667%202.93328%206.66667%203.39999%206.66667%204.33341V5.00008M2.5%205.00008H17.5M15.8333%205.00008V14.3334C15.8333%2015.7335%2015.8333%2016.4336%2015.5608%2016.9684C15.3212%2017.4388%2014.9387%2017.8212%2014.4683%2018.0609C13.9335%2018.3334%2013.2335%2018.3334%2011.8333%2018.3334H8.16667C6.76654%2018.3334%206.06647%2018.3334%205.53169%2018.0609C5.06129%2017.8212%204.67883%2017.4388%204.43915%2016.9684C4.16667%2016.4336%204.16667%2015.7335%204.16667%2014.3334V5.00008'%20stroke='%23F04438'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"), Pe(ne, "alt", we);
          }, [() => a()("system.remove")]), p(De, ne);
        };
        G(ae, (De) => {
          e(S) && De(de);
        });
        var fe = q(ae, 2), $e = (De) => {
          var ne = Wn();
          be((we) => ft(ne, we), [() => a()(e(Z))]), p(De, ne);
        }, qe = (De) => {
          p(De, Wn("Choose"));
        };
        G(fe, (De) => {
          e(Z) ? De($e) : De(qe, !1);
        }), p(ye, ce);
      }, $$slots: { default: !0 } });
    }
    y(re), y(N), p(n, N);
    var Se = Xe(R);
    return o(), Se;
  }
  Qe(Nd, { product: {}, dealBlock: {}, multipleGiftsSelector: {}, selectedVariantIds: {}, availableQuantity: {}, onSelect: {}, onRemove: {}, onVariantChange: {}, onQuantityChange: {} }, [], [], !0);
  const dp = { red: 0, green: 0, blue: 0, alpha: 0.5 };
  function up(n, t) {
    var r;
    (r = t()) == null || r();
  }
  function gp(n, t, r, a, l) {
    var o;
    const c = t();
    r()(a().id, c), (o = l()) == null || o();
  }
  var hp = $('<img alt="Close"/>'), pp = $('<div class="kaching-bundles__choose-multiple-gifts"><div class="kaching-bundles__choose-multiple-gifts__header"><h2 class="kaching-bundles__choose-multiple-gifts__heading"><!></h2> <!></div> <div class="kaching-bundles__choose-multiple-gifts__products"></div> <div class="kaching-bundles__choose-multiple-gifts__footer"><span class="kaching-bundles__choose-multiple-gifts__footer-text"> </span> <div class="kaching-bundles__choose-multiple-gifts__footer-buttons"><button class="kaching-bundles__choose-multiple-gifts__footer-button kaching-bundles__choose-multiple-gifts__footer-button--cancel"> </button> <button class="kaching-bundles__choose-multiple-gifts__footer-button kaching-bundles__choose-multiple-gifts__footer-button--confirm"> </button></div></div></div>');
  function ao(n, t) {
    Ke(t, !0);
    const r = () => Ie(f, "$translate", a), [a, l] = vt(), o = m(t, "dealBlock", 7), c = m(t, "multipleGiftsSelector", 7), s = m(t, "products", 23, () => []), i = m(t, "initialSelectedGifts", 23, () => []), d = m(t, "onConfirm", 7, () => {
    }), g = m(t, "onClose", 7), f = Ct();
    let h = ze(lt((function(F) {
      const V = {};
      for (const O of F) {
        const ee = O.product.id;
        V[ee] || (V[ee] = []), V[ee].push(O.variant.id);
      }
      return V;
    })(i())));
    const _ = u(() => o().chooseMultipleGiftsModal), v = u(() => ((F) => F ? bn({ "kaching-choose-multiple-gifts-button-size": F.buttonSize + "px", "kaching-choose-multiple-gifts-text-size": F.textSize + "px", "kaching-choose-multiple-gifts-price-color": Le(F.priceColor), "kaching-choose-multiple-gifts-compare-at-price-color": Le(F.compareAtPriceColor), "kaching-choose-multiple-gifts-text-color": Le(F.textColor), "kaching-choose-multiple-gifts-button-color": Le(F.buttonColor), "kaching-choose-multiple-gifts-button-text-color": Le(F.buttonTextColor), "kaching-choose-multiple-gifts-photo-size": F.productPhotoSize + "px" }) : "")(e(_) || null)), b = u(() => c().maxQuantity), x = u(() => Object.values(e(h)).reduce((F, V) => F + V.length, 0));
    function D(F) {
      return e(h)[F] || [];
    }
    function S(F) {
      const V = F.variants.find((O) => O.availableForSale);
      return (V == null ? void 0 : V.id) || F.variants[0].id;
    }
    const I = u(() => {
      var F;
      return ((F = e(_)) == null ? void 0 : F.footerText) || "FREE gifts selected";
    });
    var W = { get dealBlock() {
      return o();
    }, set dealBlock(F) {
      o(F), k();
    }, get multipleGiftsSelector() {
      return c();
    }, set multipleGiftsSelector(F) {
      c(F), k();
    }, get products() {
      return s();
    }, set products(F = []) {
      s(F), k();
    }, get initialSelectedGifts() {
      return i();
    }, set initialSelectedGifts(F = []) {
      i(F), k();
    }, get onConfirm() {
      return d();
    }, set onConfirm(F = () => {
    }) {
      d(F), k();
    }, get onClose() {
      return g();
    }, set onClose(F) {
      g(F), k();
    } }, Q = pp(), E = P(Q), K = P(E), M = P(K), te = (F) => {
      var V = Wn();
      be((O) => ft(V, O), [() => r()(e(_).heading)]), p(F, V);
    };
    G(M, (F) => {
      var V;
      (V = e(_)) != null && V.heading && F(te);
    }), y(K);
    var A = q(K, 2), L = (F) => {
      Ht(F, { element: "span", class: "kaching-bundles__choose-multiple-gifts__close", get onclick() {
        return g();
      }, children: (V, O) => {
        var ee = hp();
        be(() => Pe(ee, "src", "data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11%201L1%2011M1%201L11%2011'%20stroke='%23344054'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e")), p(V, ee);
      }, $$slots: { default: !0 } });
    };
    G(A, (F) => {
      g() && F(L);
    }), y(E);
    var se = q(E, 2);
    $t(se, 21, s, (F) => F.id, (F, V) => {
      {
        let O = u(() => D(e(V).id)), ee = u(() => (function(ge) {
          const T = D(ge).length;
          return e(b) - e(x) + T;
        })(e(V).id));
        Nd(F, { get dealBlock() {
          return o();
        }, get multipleGiftsSelector() {
          return c();
        }, get product() {
          return e(V);
        }, get selectedVariantIds() {
          return e(O);
        }, get availableQuantity() {
          return e(ee);
        }, onSelect: () => (function(ge) {
          if (e(x) >= e(b)) return;
          const T = S(ge), w = s().length === 1 ? e(b) : 1;
          le(h, { ...e(h), [ge.id]: Array(w).fill(T) }, !0);
        })(e(V)), onRemove: () => (function(ge) {
          const { [ge]: T, ...w } = e(h);
          le(h, w, !0);
        })(e(V).id), onVariantChange: (ge, T) => (function(w, U, oe) {
          const j = D(w);
          if (U >= j.length) return;
          const re = [...j];
          re[U] = oe, le(h, { ...e(h), [w]: re }, !0);
        })(e(V).id, ge, T), onQuantityChange: (ge) => (function(T, w) {
          const U = D(T.id), oe = U.length;
          if (w === oe) return;
          let j;
          if (w > oe) {
            const re = S(T), Y = w - oe;
            j = [...U, ...Array(Y).fill(re)];
          } else j = U.slice(0, w);
          le(h, { ...e(h), [T.id]: j }, !0);
        })(e(V), ge) });
      }
    }), y(se);
    var Z = q(se, 2), H = P(Z), z = P(H);
    y(H);
    var C = q(H, 2), R = P(C);
    R.__click = [up, g];
    var N = P(R, !0);
    y(R);
    var J = q(R, 2);
    J.__click = [gp, function() {
      const F = [];
      for (const V of s()) {
        const O = D(V.id);
        for (const ee of O) {
          const ge = V.variants.find((w) => w.id === ee);
          if (!ge) continue;
          const T = o().useProductCompareAtPrice && ge.compareAtPrice ? Math.max(ge.price, ge.compareAtPrice) : ge.price;
          F.push({ id: `${ee}`, variant: ge, product: V, quantity: 1, fullPrice: T });
        }
      }
      return F;
    }, d, c, g];
    var X = P(J, !0);
    y(J), y(C), y(Z), y(Q), be((F, V, O) => {
      var ee, ge;
      Vt(Q, e(v)), ft(z, `${(ee = e(x)) != null ? ee : ""}/${(ge = e(b)) != null ? ge : ""}
      ${F != null ? F : ""}`), ft(N, V), ft(X, O);
    }, [() => r()(e(I)), () => r()("system.cancel"), () => r()("system.confirm")]), p(n, Q);
    var B = Xe(W);
    return l(), B;
  }
  On(["click"]), Qe(ao, { dealBlock: {}, multipleGiftsSelector: {}, products: {}, initialSelectedGifts: {}, onConfirm: {}, onClose: {} }, [], [], !0);
  var bp = $('<div class="kaching-bundles"><!></div>');
  function Qd(n, t) {
    var r;
    Ke(t, !0);
    const a = m(t, "config", 7), l = m(t, "dealBlock", 7), o = m(t, "products", 23, () => []), c = m(t, "mediaImages", 7), s = m(t, "translations", 7), i = m(t, "multipleGiftsSelector", 7), { setConfig: d } = Qa(a()), { setMoneyFormat: g } = mi(a().moneyFormat), { setTranslations: f } = Na(s()), { setMediaImages: h } = tl(c()), { setSwatchSettings: _ } = Ki({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (r = l().showSelectedSwatchName) != null && r });
    Je(() => {
      d(a());
    }), Je(() => {
      g(a().moneyFormat, !!l().showPricesWithoutDecimals);
    }), Je(() => {
      f(s());
    }), Je(() => {
      h(c());
    }), Je(() => {
      var S;
      _({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (S = l().showSelectedSwatchName) != null && S });
    });
    var v = { get config() {
      return a();
    }, set config(S) {
      a(S), k();
    }, get dealBlock() {
      return l();
    }, set dealBlock(S) {
      l(S), k();
    }, get products() {
      return o();
    }, set products(S = []) {
      o(S), k();
    }, get mediaImages() {
      return c();
    }, set mediaImages(S) {
      c(S), k();
    }, get translations() {
      return s();
    }, set translations(S) {
      s(S), k();
    }, get multipleGiftsSelector() {
      return i();
    }, set multipleGiftsSelector(S) {
      i(S), k();
    } }, b = Be(), x = pe(b), D = (S) => {
      var I = bp();
      ao(P(I), { get dealBlock() {
        return l();
      }, get products() {
        return o();
      }, get multipleGiftsSelector() {
        return i();
      } }), y(I), p(S, I);
    };
    return G(x, (S) => {
      i() && S(D);
    }), p(n, b), Xe(v);
  }
  function nl(n, t) {
    var r;
    if (!t) return n.price;
    const a = n.sellingPlans.find((l) => l.id === t.id);
    return (r = a == null ? void 0 : a.price) != null ? r : n.price;
  }
  function io(n, t) {
    const r = t.priceAdjustment;
    if (!r) return n;
    switch (r.type) {
      case "percentage":
        return n * (1 - r.value / 100);
      case "fixed_amount":
        return n - r.value;
      case "price":
        return r.value;
    }
  }
  function rl(n, t) {
    return n.sellingPlans.filter((r) => t.some((a) => a.sellingPlans.some((l) => l.id === r.id)));
  }
  function lo(n, t, r) {
    let a;
    if (n.sellingPlanGid) {
      const l = Zt(n.sellingPlanGid);
      a = t.find((o) => o.id === l);
    } else a = r || t[0];
    return a && t.some((l) => l.id === a.id) ? a : t[0];
  }
  function so(n, t, r, a) {
    return n || (t ? r.some((l) => l.id === t.id) ? t : r[0] : a && r.length > 0 ? r[0] : void 0);
  }
  customElements.define("kaching-bundles-choose-multiple-gifts", Qe(Qd, { config: { attribute: "config", type: "Object" }, dealBlock: { attribute: "deal-block", type: "Object" }, multipleGiftsSelector: { attribute: "multiple-gifts-selector", type: "Object" }, translations: { attribute: "translations", type: "Object" }, products: { attribute: "products", type: "Array" }, mediaImages: { attribute: "media-images", type: "Array" } }, [], [], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this;
    }
  }));
  const er = (n, t, r) => fp(n, t, r) || vp(n, t), fp = (n, t, r) => {
    if (!r || t.sellingPlans.length === 0) return;
    const a = new Set(t.sellingPlans.map((o) => o.id));
    return a.has(r.id) ? n.sellingPlans.find((o) => o.id === r.id) : n.sellingPlans.find((o) => a.has(o.id) && o.name === r.name) || n.sellingPlans.find((o) => o.id === t.sellingPlans[0].id);
  }, vp = (n, t) => {
    if (!n.requiresSellingPlan || t.sellingPlans.length === 0) return;
    const r = t.sellingPlans[0].id;
    return n.sellingPlans.find((a) => a.id === r);
  };
  function ra({ discountType: n, discountValue: t, discountQuantity: r, variantQuantities: a, currencyRate: l, priceRounding: o, sellingPlan: c, percentageCentsRoundingWorkaround: s }) {
    const i = (function({ discountType: f, discountValue: h, discountQuantity: _, variantQuantities: v, currencyRate: b, sellingPlan: x, percentageCentsRoundingWorkaround: D }) {
      const S = v.map(({ variant: Q, quantity: E }) => nl(Q, x) * E), I = S.reduce((Q, E) => Q + E, 0), W = v.map(({ quantity: Q }) => Q).reduce((Q, E) => Q + E, 0);
      if (f === "specific") {
        let Q = 100 * Number(h) * b;
        if (W > Number(_)) {
          const M = Q / Number(_);
          Q = Math.ceil(M * W);
        }
        const E = Q / W;
        let K = 0;
        for (const { variant: M, quantity: te } of v) {
          if (x && M.sellingPlans.some((A) => A.id === x.id) && x.priceAdjustment) {
            K += io(E, x) * te;
            continue;
          }
          K += E * te;
        }
        return Math.max(0, Math.min(K, I));
      }
      if (f === "percentage") {
        if (D) {
          const E = I * (100 - Number(h)) / 100;
          return Math.max(0, Math.min(Math.ceil(E), I));
        }
        let Q = 0;
        for (const { variant: E, quantity: K } of v) {
          const M = nl(E, x);
          Q += Math.ceil(M * (100 - Number(h)) / 100) * K;
        }
        return Math.max(0, Math.min(Q, I));
      }
      if (f === "amount") {
        const Q = Math.round(100 * Number(h)) * b, E = Q * W;
        return typeof document != "undefined" && I > 0 && E > I && document.dispatchEvent(new CustomEvent("kaching-bundles-amount-discount-exceeds-price", { detail: { totalDiscount: E, fullOrderPrice: I } })), Math.max(0, Math.min(I - Q * W, I));
      }
      return I;
    })({ discountType: n, discountValue: t, discountQuantity: r, variantQuantities: a, currencyRate: l, sellingPlan: c, percentageCentsRoundingWorkaround: s }), d = a.map(({ variant: f, quantity: h }) => o != null && o.v2 ? nl(f, c) * h : f.price * h).reduce((f, h) => f + h, 0), g = a.map(({ quantity: f }) => f).reduce((f, h) => f + h, 0);
    if (o && (n !== "default" || o.v2)) {
      if (o.perItem) {
        const f = xi(i / g, o.precision) * g;
        return o.v2 && Math.round(f) > Math.round(d) && i / g > 100 ? xi(i / g - 100, o.precision) * g : f <= d ? f : i;
      }
      {
        const f = xi(i, o.precision);
        return o.v2 && Math.round(f) > Math.round(d) && i > 100 ? xi(i - 100, o.precision) : f <= d ? f : i;
      }
    }
    return i;
  }
  function Wd(n, t, r, a, l, o) {
    return ra({ discountType: n.discountType, discountValue: n.discountValue, discountQuantity: n.quantity, variantQuantities: t, currencyRate: r, priceRounding: a, sellingPlan: l, percentageCentsRoundingWorkaround: o });
  }
  function Ud(n, t, r, a, l) {
    var o, c, s, i;
    const d = [...t].sort((x, D) => x.variant.price - D.variant.price), g = d.reduce((x, D) => x + D.quantity, 0) >= n.buyQuantity + n.getQuantity ? n.getQuantity : 0, f = [], h = [];
    let _ = g;
    for (const { variant: x, quantity: D } of d) {
      const S = Math.min(D, _), I = D - S;
      _ -= S, S > 0 && f.push({ variant: x, quantity: S }), I > 0 && h.push({ variant: x, quantity: I });
    }
    const v = f.length > 0 ? ra({ discountType: (o = n.getDiscountType) != null ? o : "percentage", discountValue: (c = n.getDiscountValue) != null ? c : 100, discountQuantity: g, variantQuantities: f, currencyRate: r, priceRounding: a, sellingPlan: l }) : 0, b = h.reduce((x, D) => x + D.quantity, 0);
    return v + ra({ discountType: (s = n.buyDiscountType) != null ? s : "default", discountValue: (i = n.buyDiscountValue) != null ? i : 0, discountQuantity: b, variantQuantities: h, currencyRate: r, priceRounding: a, sellingPlan: l });
  }
  function oo(n, t, r, a, l) {
    return n.bundleProducts.filter(({ productGID: o }) => o).map((o) => {
      const c = t[o.id];
      if (!c) return 0;
      const s = er(c.product, c.variant, l);
      return ra({ discountType: o.discountType, discountValue: o.discountValue, discountQuantity: o.quantity, variantQuantities: [c], currencyRate: r, priceRounding: a, sellingPlan: s });
    }).reduce((o, c) => o + c, 0);
  }
  function as(n, t, r, a, l) {
    const o = n.bundleProducts.filter(({ productGID: i }) => i).reduce((i, d) => {
      const g = t[d.id];
      if (!g) return i;
      const f = er(g.product, g.variant, l);
      return i + (f ? io(g.variant.price, f) : g.variant.price);
    }, 0), c = Number(n.discountValue) || 0;
    let s;
    switch (n.discountType) {
      case "percentage":
        s = o * (1 - Math.min(Math.max(c, 0), 100) / 100);
        break;
      case "amount":
        s = o - Math.round(100 * c) * r;
        break;
      case "specific":
        s = Math.round(100 * c) * r;
        break;
      default:
        s = o;
    }
    if (s = Math.max(0, Math.min(s, o)), a && (n.discountType !== "default" || a.v2)) {
      const i = s;
      let d = xi(i, a.precision);
      a.v2 && Math.round(d) > Math.round(o) && i > 100 && (d = xi(i - 100, a.precision)), s = d <= o ? d : i;
    }
    return Math.max(0, Math.round(s));
  }
  function xi(n, t = ".00") {
    switch (t) {
      case ".99":
        return n > 99 ? 100 * Math.ceil(n / 100) - 1 : n;
      case ".95":
        return n > 95 ? 100 * Math.ceil(n / 100) - 5 : n;
      case ".90":
        return n > 90 ? 100 * Math.ceil(n / 100) - 10 : n;
      case ".x9":
        return n > 9 ? 10 * Math.ceil(n / 10) - 1 : n;
      case ".x0":
        return 10 * Math.ceil(n / 10);
      default:
        return 100 * Math.ceil(n / 100);
    }
  }
  var _p = $('<img class="kaching-bundles__choose-product__product-image" alt=""/>'), kp = $('<span class="kaching-bundles__choose-product__product-title"> </span>'), mp = $('<span class="kaching-bundles__choose-product__subtitle"><!></span>'), xp = $('<div class="kaching-bundles__choose-product__product-price"><!></div>'), yp = $('<div class="kaching-bundles__choose-product__product-compare-at-price"><!></div>'), wp = $("<div><!> <!></div>"), Pp = $('<div class="kaching-bundles__choose-product__product"><div class="kaching-bundles__choose-product__product-container"><!> <div class="kaching-bundles__choose-product__product-content"><!> <!> <div class="kaching-bundles__choose-product__product-price-container"><!> <!></div> <!></div></div> <!></div>');
  function Hd(n, t) {
    var r;
    Ke(t, !0);
    const a = () => Ie(v, "$config", c), l = () => Ie(_, "$formatPrice", c), o = () => Ie(h, "$translate", c), [c, s] = vt(), i = m(t, "product", 7), d = m(t, "dealBlock", 7), g = m(t, "dealBar", 7), f = m(t, "onChoose", 7), h = Ct(), _ = cn(), v = _n();
    let b = ze(!1), x = ze(lt(((r = i().variants.find((w) => w.availableForSale)) == null ? void 0 : r.id) || i().variants[0].id));
    const D = u(() => i().variants.find((w) => w.id === e(x)) || i().variants[0]), S = u(() => {
      var w;
      return e(b) || ((w = d().chooseProductModal) == null ? void 0 : w.showVariantImageByDefault);
    }), I = u(() => e(S) && e(D).image || i().image), W = u(() => d().priceRounding ? { perItem: !0, precision: d().priceRoundingPrecision, v2: a().featureFlags.price_rounding_v2 || !1 } : void 0), Q = u(() => g().dealBarType === pt.Bxgy ? e(D).price : ra({ discountType: g().discountType, discountValue: g().discountValue, discountQuantity: 1, variantQuantities: [{ variant: e(D), quantity: 1 }], currencyRate: a().currencyRate, priceRounding: e(W) })), E = u(() => (function(w, U) {
      return w.useProductCompareAtPrice && U.compareAtPrice ? Math.max(U.price, U.compareAtPrice) : U.price;
    })(d(), e(D))), K = u(() => i().url ? `${i().url}?variant=${e(x)}` : void 0), M = u(() => dn({ priceFormatter: l(), product: i(), totalFullPrice: e(E), totalDiscountedPrice: e(Q), quantity: 1, unitQuantity: kr([{ variant: e(D), quantity: 1 }]) })), te = u(() => e(M)(o()(d().chooseProductModal.subtitle || ""))), A = u(() => d().chooseProductModal.buttonText);
    function L(w) {
      le(b, !0), le(x, w, !0);
    }
    var se = { get product() {
      return i();
    }, set product(w) {
      i(w), k();
    }, get dealBlock() {
      return d();
    }, set dealBlock(w) {
      d(w), k();
    }, get dealBar() {
      return g();
    }, set dealBar(w) {
      g(w), k();
    }, get onChoose() {
      return f();
    }, set onChoose(w) {
      f(w), k();
    } }, Z = Pp(), H = P(Z), z = P(H), C = (w) => {
      Xn(w, { get url() {
        return e(K);
      }, class: "kaching-bundles__choose-product__product-image-link", children: (U, oe) => {
        var j = _p();
        Pe(j, "width", 100), Pe(j, "height", 100), be(() => Pe(j, "src", e(I))), p(U, j);
      }, $$slots: { default: !0 } });
    };
    G(z, (w) => {
      e(I) && w(C);
    });
    var R = q(z, 2), N = P(R);
    Xn(N, { get url() {
      return e(K);
    }, class: "kaching-bundles__choose-product__product-link", children: (w, U) => {
      var oe = kp(), j = P(oe, !0);
      y(oe), be(() => ft(j, i().title)), p(w, oe);
    }, $$slots: { default: !0 } });
    var J = q(N, 2), X = (w) => {
      var U = mp();
      Ve(P(U), () => e(te)), y(U), p(w, U);
    };
    G(J, (w) => {
      e(te) && w(X);
    });
    var B = q(J, 2), F = P(B);
    rt(F, () => e(Q), (w) => {
      var U = xp();
      Ve(P(U), () => l()(e(Q))), y(U), p(w, U);
    });
    var V = q(F, 2), O = (w) => {
      var U = Be();
      rt(pe(U), () => e(E), (oe) => {
        var j = yp();
        Ve(P(j), () => l()(e(E))), y(j), p(oe, j);
      }), p(w, U);
    };
    G(V, (w) => {
      e(E) && e(E) > e(Q) && w(O);
    }), y(B);
    var ee = q(B, 2), ge = (w) => {
      var U = wp(), oe = P(U);
      na(oe, { get product() {
        return i();
      }, class: "kaching-bundles__choose-product__product-option-names" }), Un(q(oe, 2), { get product() {
        return i();
      }, get selectedVariantId() {
        return e(x);
      }, onChange: L }), y(U), p(w, U);
    };
    G(ee, (w) => {
      i().variants.length > 1 && w(ge);
    }), y(R), y(H), Ht(q(H, 2), { element: "span", class: "kaching-bundles__choose-product__product-button", onclick: function() {
      f()({ product: i(), variant: e(D) });
    }, children: (w, U) => {
      var oe = Be(), j = pe(oe), re = (ie) => {
        var _e = Wn();
        be((Se) => ft(_e, Se), [() => o()(e(A))]), p(ie, _e);
      }, Y = (ie) => {
        p(ie, Wn("Choose"));
      };
      G(j, (ie) => {
        e(A) ? ie(re) : ie(Y, !1);
      }), p(w, oe);
    }, $$slots: { default: !0 } }), y(Z), p(n, Z);
    var T = Xe(se);
    return s(), T;
  }
  Qe(Hd, { product: {}, dealBlock: {}, dealBar: {}, onChoose: {} }, [], [], !0);
  const co = "data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11%201L1%2011M1%201L11%2011'%20stroke='%23344054'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
  var Sp = $('<img alt="Close"/>'), Bp = (n, t) => {
    le(t, !e(t));
  }, Cp = (n, t, r, a) => {
    le(t, e(r).value, !0), le(a, !1);
  }, Ip = $('<img alt="" aria-hidden="true" class="kaching-bundles__choose-product__sort-option-check"/>'), Mp = $('<button type="button" class="kaching-bundles__choose-product__sort-option"><span> </span> <!></button>'), zp = $('<div class="kaching-bundles__choose-product__sort-menu"></div>'), $p = $('<div class="kaching-bundles__choose-product__controls"><div class="kaching-bundles__choose-product__search-field"><img alt="" aria-hidden="true" class="kaching-bundles__choose-product__search-icon"/> <input type="search" class="kaching-bundles__choose-product__search-input"/></div> <div class="kaching-bundles__choose-product__sort"><button type="button" class="kaching-bundles__choose-product__sort-button"><img alt="" aria-hidden="true" class="kaching-bundles__choose-product__sort-icon"/> </button> <!></div></div>'), Dp = (n, t) => {
    le(t, "");
  }, Ap = $('<div class="kaching-bundles__choose-product__empty-state-icon-wrapper"><img alt="" aria-hidden="true" class="kaching-bundles__choose-product__empty-state-icon"/></div> <h3 class="kaching-bundles__choose-product__empty-state-title"> </h3> <p class="kaching-bundles__choose-product__empty-state-description"> </p> <button type="button" class="kaching-bundles__choose-product__empty-state-clear-button"> </button>', 1), Vp = $('<div class="kaching-bundles__choose-product__empty-state"><!></div>'), Tp = $('<div class="kaching-bundles__choose-product"><div class="kaching-bundles__choose-product__header"><h2 class="kaching-bundles__choose-product__heading"><!></h2> <!></div> <!> <div class="kaching-bundles__choose-product__products"><!></div></div>');
  function uo(n, t) {
    var r;
    Ke(t, !0);
    const a = () => Ie(f, "$translate", l), [l, o] = vt(), c = m(t, "dealBlock", 7), s = m(t, "dealBar", 7), i = m(t, "products", 23, () => []), d = m(t, "onChoose", 7), g = m(t, "onClose", 7), f = Ct(), h = u(() => c().chooseProductModal), _ = u(() => ((B) => bn({ "kaching-choose-product-button-size": B.buttonSize + "px", "kaching-choose-product-text-size": B.textSize + "px", "kaching-choose-product-price-color": Le(B.priceColor), "kaching-choose-product-compare-at-price-color": Le(B.compareAtPriceColor), "kaching-choose-product-text-color": Le(B.textColor), "kaching-choose-product-button-color": Le(B.buttonColor), "kaching-choose-product-button-text-color": Le(B.buttonTextColor), "kaching-choose-product-photo-size": B.productPhotoSize + "px" }))(e(h)));
    let v = ze(""), b = ze(!1);
    const x = { Relevance: "relevance", NewestFirst: "newest-first", PriceLowToHigh: "price-low-to-high", PriceHighToLow: "price-high-to-low" }, D = u(() => [{ value: x.Relevance, label: a()("system.sort_relevance") }, { value: x.NewestFirst, label: a()("system.sort_newest_first") }, { value: x.PriceLowToHigh, label: a()("system.sort_price_low_to_high") }, { value: x.PriceHighToLow, label: a()("system.sort_price_high_to_low") }]);
    let S = ze(lt(Object.values(x).includes((r = e(h).defaultSortOption) != null ? r : "") ? e(h).defaultSortOption : x.Relevance));
    const I = u(() => e(h).showSearchField ? i().filter((B) => B.title.toLowerCase().includes(e(v).toLowerCase().trim())) : i()), W = u(() => {
      const B = [...e(I)], F = (O) => {
        const ee = O.variants.find((ge) => ge.availableForSale) || O.variants[0];
        return (ee == null ? void 0 : ee.price) || 0;
      }, V = (O) => {
        if (!O.createdAt) return 0;
        const ee = Date.parse(O.createdAt);
        return Number.isNaN(ee) ? 0 : ee;
      };
      switch (e(S)) {
        case x.Relevance:
          return B;
        case x.NewestFirst:
          return B.sort((O, ee) => {
            const ge = V(ee) - V(O);
            return ge !== 0 ? ge : ee.id - O.id;
          });
        case x.PriceLowToHigh:
          return B.sort((O, ee) => F(O) - F(ee));
        case x.PriceHighToLow:
          return B.sort((O, ee) => F(ee) - F(O));
        default:
          return B;
      }
    }), Q = u(() => e(h).showSearchField && e(v).trim().length > 0 && e(W).length === 0);
    function E() {
      le(b, !1);
    }
    function K(B, F) {
      const V = (O) => {
        B.contains(O.target) || F();
      };
      return document.addEventListener("click", V, !0), { destroy() {
        document.removeEventListener("click", V, !0);
      } };
    }
    var M = { get dealBlock() {
      return c();
    }, set dealBlock(B) {
      c(B), k();
    }, get dealBar() {
      return s();
    }, set dealBar(B) {
      s(B), k();
    }, get products() {
      return i();
    }, set products(B = []) {
      i(B), k();
    }, get onChoose() {
      return d();
    }, set onChoose(B) {
      d(B), k();
    }, get onClose() {
      return g();
    }, set onClose(B) {
      g(B), k();
    } }, te = Tp(), A = P(te), L = P(A), se = P(L), Z = (B) => {
      var F = Wn();
      be((V) => ft(F, V), [() => a()(e(h).heading)]), p(B, F);
    };
    G(se, (B) => {
      e(h).heading && B(Z);
    }), y(L), Ht(q(L, 2), { element: "span", class: "kaching-bundles__choose-product__close", get onclick() {
      return g();
    }, children: (B, F) => {
      var V = Sp();
      be(() => Pe(V, "src", co)), p(B, V);
    }, $$slots: { default: !0 } }), y(A);
    var H = q(A, 2), z = (B) => {
      var F = $p(), V = P(F), O = P(V), ee = q(O, 2);
      ea(ee), y(V);
      var ge = q(V, 2), T = P(ge);
      T.__click = [Bp, b];
      var w = P(T), U = q(w);
      y(T);
      var oe = q(T, 2), j = (re) => {
        var Y = zp();
        $t(Y, 21, () => e(D), (ie) => ie.value, (ie, _e) => {
          var Se = Mp();
          Se.__click = [Cp, S, _e, b];
          var me = P(Se), ye = P(me, !0);
          y(me);
          var he = q(me, 2), ce = (ae) => {
            var de = Ip();
            be(() => Pe(de, "src", "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16.6663%205L7.49967%2014.1667L3.33301%2010'%20stroke='%23344054'%20stroke-width='1.66667'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e")), p(ae, de);
          };
          G(he, (ae) => {
            e(S) === e(_e).value && ae(ce);
          }), y(Se), be(() => ft(ye, e(_e).label)), p(ie, Se);
        }), y(Y), p(re, Y);
      };
      G(oe, (re) => {
        e(b) && re(j);
      }), y(ge), Es(ge, (re, Y) => K == null ? void 0 : K(re, Y), () => E), y(F), be((re, Y, ie) => {
        Pe(O, "src", "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.5%2017.5L13.875%2013.875M15.8333%209.16667C15.8333%2012.8486%2012.8486%2015.8333%209.16667%2015.8333C5.48477%2015.8333%202.5%2012.8486%202.5%209.16667C2.5%205.48477%205.48477%202.5%209.16667%202.5C12.8486%202.5%2015.8333%205.48477%2015.8333%209.16667Z'%20stroke='%23717680'%20stroke-width='1.66667'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"), Pe(ee, "aria-label", re), Pe(ee, "placeholder", Y), Pe(w, "src", "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.1667%203.33337V16.6667M14.1667%2016.6667L10.8333%2013.3334M14.1667%2016.6667L17.5%2013.3334M5.83333%2016.6667V3.33337M5.83333%203.33337L2.5%206.66671M5.83333%203.33337L9.16667%206.66671'%20stroke='%23414651'%20stroke-width='1.67'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"), ft(U, ` ${ie != null ? ie : ""}`);
      }, [() => a()("system.search"), () => a()("system.search"), () => a()("system.sort_by")]), Ng(ee, () => e(v), (re) => le(v, re)), p(B, F);
    };
    G(H, (B) => {
      e(h).showSearchField && B(z);
    });
    var C = q(H, 2), R = P(C), N = (B) => {
      var F = Vp(), V = P(F), O = (ge) => {
        var T = Ap(), w = pe(T), U = P(w);
        y(w);
        var oe = q(w, 2), j = P(oe, !0);
        y(oe);
        var re = q(oe, 2), Y = P(re, !0);
        y(re);
        var ie = q(re, 2);
        ie.__click = [Dp, v];
        var _e = P(ie, !0);
        y(ie), be((Se, me, ye) => {
          Pe(U, "src", "data:image/svg+xml,%3csvg%20width='56'%20height='56'%20viewBox='0%200%2056%2056'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='48'%20height='48'%20rx='24'%20fill='%23F2F4F7'/%3e%3crect%20x='4'%20y='4'%20width='48'%20height='48'%20rx='24'%20stroke='%23F9FAFB'%20stroke-width='8'/%3e%3cpath%20d='M37%2037L32.65%2032.65M35%2027C35%2031.4183%2031.4183%2035%2027%2035C22.5817%2035%2019%2031.4183%2019%2027C19%2022.5817%2022.5817%2019%2027%2019C31.4183%2019%2035%2022.5817%2035%2027Z'%20stroke='%23475467'%20stroke-width='1.66667'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"), ft(j, Se), ft(Y, me), ft(_e, ye);
        }, [() => a()("system.no_results_found"), () => a()("system.no_results_description"), () => a()("system.clear_search")]), p(ge, T);
      }, ee = (ge) => {
        var T = Wn();
        be((w) => ft(T, w), [() => a()("system.no_products_available")]), p(ge, T);
      };
      G(V, (ge) => {
        e(Q) ? ge(O) : ge(ee, !1);
      }), y(F), p(B, F);
    }, J = (B) => {
      var F = Be();
      $t(pe(F), 17, () => e(W), (V) => V.id, (V, O) => {
        Hd(V, { get dealBlock() {
          return c();
        }, get dealBar() {
          return s();
        }, get product() {
          return e(O);
        }, get onChoose() {
          return d();
        } });
      }), p(B, F);
    };
    G(R, (B) => {
      e(W).length === 0 ? B(N) : B(J, !1);
    }), y(C), y(te), be(() => Vt(te, e(_))), p(n, te);
    var X = Xe(M);
    return o(), X;
  }
  On(["click"]), Qe(uo, { dealBlock: {}, dealBar: {}, products: {}, onChoose: {}, onClose: {} }, [], [], !0);
  var qp = $('<div class="kaching-bundles"><!></div>');
  function Zd(n, t) {
    var r;
    Ke(t, !0);
    const a = m(t, "config", 7), l = m(t, "dealBlock", 7), o = m(t, "dealBar", 7), c = m(t, "products", 23, () => []), s = m(t, "mediaImages", 7), i = m(t, "translations", 7), { setConfig: d } = Qa(a()), { setMoneyFormat: g } = mi(a().moneyFormat), { setTranslations: f } = Na(i()), { setMediaImages: h } = tl(s()), { setSwatchSettings: _ } = Ki({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (r = l().showSelectedSwatchName) != null && r });
    Je(() => {
      d(a());
    }), Je(() => {
      g(a().moneyFormat, !!l().showPricesWithoutDecimals);
    }), Je(() => {
      f(i());
    }), Je(() => {
      h(s());
    }), Je(() => {
      var x;
      _({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (x = l().showSelectedSwatchName) != null && x });
    });
    var v = { get config() {
      return a();
    }, set config(x) {
      a(x), k();
    }, get dealBlock() {
      return l();
    }, set dealBlock(x) {
      l(x), k();
    }, get dealBar() {
      return o();
    }, set dealBar(x) {
      o(x), k();
    }, get products() {
      return c();
    }, set products(x = []) {
      c(x), k();
    }, get mediaImages() {
      return s();
    }, set mediaImages(x) {
      s(x), k();
    }, get translations() {
      return i();
    }, set translations(x) {
      i(x), k();
    } }, b = qp();
    return uo(P(b), { get dealBlock() {
      return l();
    }, get dealBar() {
      return o();
    }, get products() {
      return c();
    }, onChoose: () => {
    }, onClose: () => {
    } }), y(b), p(n, b), Xe(v);
  }
  customElements.define("kaching-bundles-choose-product", Qe(Zd, { config: { attribute: "config", type: "Object" }, dealBlock: { attribute: "deal-block", type: "Object" }, dealBar: { attribute: "deal-bar", type: "Object" }, translations: { attribute: "translations", type: "Object" }, products: { attribute: "products", type: "Array" }, mediaImages: { attribute: "media-images", type: "Array" } }, [], [], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this;
    }
  })), ti = !0;
  var Gp = Tn('<svg width="102" height="60" viewBox="0 0 102 60" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 2)" fill="currentColor"></ellipse><ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 2)" fill="#000" fill-opacity=".3"></ellipse><mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="5" width="96" height="48"><ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 0)" fill="currentColor"></ellipse></mask><g mask="url(#a)"><ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 0)" fill="currentColor"></ellipse></g><path class="most-popular-text" d="M28 15.4 25.4 24a.3.3 0 0 1 0 .1.2.2 0 0 1-.2.1c-.4.1-.7 0-.8-.4a1007.3 1007.3 0 0 1-3.9-9.2l-.8 7.6a.5.5 0 0 0 0 .2l.6.8a.7.7 0 0 1 0 .1.2.2 0 0 1 0 .1c0 .5-1.7.1-2 0-1 0 .1-1 .2-1.4l1.1-9c0-.4-.1-.7-.5-1a.4.4 0 0 1-.1-.2v-.2a.2.2 0 0 1 .1 0 15.2 15.2 0 0 1 3.1.2h.1c.1 0 0 0 0 .1.3.5-.5.7-.3 1.2a1361.6 1361.6 0 0 1 3.2 8.1l2.3-7.3a.7.7 0 0 0-.1-.6c-.3-.4-1-1 .1-1l2.7.4c.2 0 .3.2.2.4a.4.4 0 0 1-.1.2c-.3.3-.5.5-.4 1a771.7 771.7 0 0 0 2.5 10c.5.5.7 1-.3.8l-2.2-.3c-.5 0-.5-.4-.1-1a.7.7 0 0 0 .1-.6l-1.6-7.6c0-.2-.1-.2-.1 0zm24 4.7.1 4.5c0 1 .6 1.5 1.6 1.5.3 0 .5-.2.6-.5.1-.4.3-.5.5-.3h.1v.1c.1 1.1-.4 2-1.5 2-2.3.4-3.2-1.2-3.3-3.3l-.2-4.1c0-.4-.2-.5-.6-.5-.5 0-.8-.1-.7-.7a.2.2 0 0 1 .2-.1c1.3.2 2-.3 2-1.6a.2.2 0 0 1 .2-.1c1.1-.5.9 1.3.9 1.9a.1.1 0 0 0 .1.1l2.2.3.2.1c.1.3.1.5-.1.7a.2.2 0 0 1-.1 0 .4.4 0 0 1-.1 0l-2-.1a.1.1 0 0 0-.1 0zm-11.6 4.6c-.7.8-1.8 1.2-3 1.1-1.1 0-2.3-.5-3.3-1.4A5.7 5.7 0 0 1 33 23a5 5 0 0 1-.6-1.7 4 4 0 0 1 .1-1.7c.1-.5.4-1 .8-1.4.7-.7 1.7-1.2 2.9-1.1 1.2 0 2.4.6 3.3 1.4.5.4.9 1 1.2 1.5.3.5.5 1.1.5 1.7a4 4 0 0 1 0 1.6c-.2.6-.5 1-.8 1.4zm-2.4.4c.3 0 .5-.3.7-.5l.5-1v-1.4a6.4 6.4 0 0 0-.3-1.4 6.4 6.4 0 0 0-.6-1.4 4.7 4.7 0 0 0-.8-1 2.6 2.6 0 0 0-1-.6 1.5 1.5 0 0 0-.9 0c-.3 0-.5.3-.7.5l-.4 1a4.7 4.7 0 0 0 0 1.4 6.4 6.4 0 0 0 1.7 3.8c.3.3.6.5 1 .6.2 0 .5.1.8 0zm8-6c-1-.8-2.4-.4-2.3 1 0 .4.3.8.7 1l3 1.2c1.1.5 2.2 2.5 1.1 3.6-1.6 1.8-5.6.6-6.8-1.3-.2-.4-.1-.8.4-1 1.2-.5 1.5 1.5 2.3 2 1 .8 3 .6 2.4-1.1-.3-1-3.2-1.8-3.8-2.2-1.9-1.2-1.8-4 .8-4.3 1.6-.1 4.5.6 4.7 2.6a.3.3 0 0 1 0 .3c-1.1 1.3-1.9-1.3-2.5-1.8zM28.3 34.9c0 1.4 0 2 .8 3 .2.2.2.4 0 .6a.3.3 0 0 1-.2 0l-3.8-.3a.4.4 0 0 1-.3 0c-.3-.4-.3-.7 0-1a1 1 0 0 0 .4-.8L25 28c0-.4-.3-.9-.8-1.4a.3.3 0 0 1 0-.1.2.2 0 0 1 0-.1c0-.3.2-.4.6-.3 3.4.2 9.4.1 9.7 4.8.3 3.8-3 4.1-6 3.9zm-.2-6.7c0 1.4 0 3 .2 4.6 0 .3.2.5.5.6 3.4 1 2.5-3.2 1.6-4.6-.3-.5-.8-.9-1.5-1.1-.5-.2-.8 0-.8.5zM59.5 41c-1.7 1.3-4.3.4-5.2-1.4-1-1.8 0-4.1-1.3-5.8a.4.4 0 0 1 0-.2c0-.6.4-.5.8-.5a19.9 19.9 0 0 1 2.5 0 .4.4 0 0 1 .4.3l.2 5.3c0 .8.3 1.8 1.1 1.8 1.7.2 1-4.2 1-5.3a.5.5 0 0 0-.2-.2l-.5-.8c-.3-.3-.2-.5.3-.6h2.9c.3 0 .4 0 .4.4l.3 6c0 1.6 1.4 1.6 1.3-.2l-.3-7c0-.8-.3-1.2-.8-1.8a.3.3 0 0 1 0-.2.3.3 0 0 1 0-.2.3.3 0 0 1 .2 0l2.8-1.2c.5-.2.8 0 .8.6l.5 10.4c0 .5.2.8.6 1.2.3.4.4 1-.4.8-.9 0-3.1 0-3.9-.4a.4.4 0 0 0-.2 0c-.9 0-2.7.1-3.1-1a.1.1 0 0 0-.2 0zm-16.4-3c-.5 1-1.5 1.6-2.7 1.8-1.2.2-2.5 0-3.6-.7a5.7 5.7 0 0 1-1.5-1.2 5 5 0 0 1-.9-1.6 4.2 4.2 0 0 1-.2-1.7 3.5 3.5 0 0 1 .5-1.6c.5-.9 1.5-1.5 2.7-1.7 1.2-.2 2.5 0 3.6.7a5.7 5.7 0 0 1 1.4 1.2c.5.5.8 1 1 1.6.2.5.2 1.1.2 1.7a3.5 3.5 0 0 1-.5 1.5zm-3.3 1c.2 0 .3-.1.4-.4l.3-.8v-1.3a8.8 8.8 0 0 0-.3-1.3 8.8 8.8 0 0 0-.5-1.3 5.9 5.9 0 0 0-.6-1.1l-.6-.6c-.2-.2-.4-.2-.6-.2-.2 0-.3.2-.4.4l-.3 1v1.1a8.8 8.8 0 0 0 1.4 3.8l.6.6c.2.1.4.2.6.1z" fill="#FEFDFD"></path><path class="most-popular-text" d="M46.9 32.7a3 3 0 0 1 2.8-.3c2.5.8 3.6 2.5 3.5 5-.2 2.9-3.2 4.2-5.5 2.9-.2-.1-.2 0-.2 0 .1 1-.2 2.2.7 3 .3.2.4.5.1.7a.3.3 0 0 1-.2.1 401 401 0 0 0-3.5-.3c-.4 0-.6-.3-.7-.6a.3.3 0 0 1 0-.1.5.5 0 0 1 .1-.1l.5-.7a.4.4 0 0 0 0-.2l-.2-7.3c0-.6-1.1-.9-.9-1.6a.3.3 0 0 1 .2-.2l2.6-1a.2.2 0 0 1 .2 0c.2.1.4.4.4.7zM49 40c2.2 0 .5-5.5-.1-6.4-.7-.8-1.5-.7-1.7.4v3.4c.2.9.6 2.6 1.8 2.6zm24.5 2.7c-2.7 1.4-5.7-1-6.1-3.7-.7-3.5 2.8-5.8 5.8-3.8a.1.1 0 0 0 .1 0c.3-.7 2.3 0 2.9.2.4 0 .6.3.5.7a.3.3 0 0 1 0 .1.3.3 0 0 1-.1 0c-.4.4-.6.8-.6 1.2 0 2.3.2 3.7.2 4.2s1 1.2.7 1.7a.2.2 0 0 1-.1 0 .3.3 0 0 1-.2.1l-2.6-.3a.3.3 0 0 1-.2 0l-.2-.4a.1.1 0 0 0-.1 0zm-.4-5.2c-.2-1.8-2.7-3.4-2.8-.7-.1 1.5.3 4.6 1.9 5.5a.4.4 0 0 0 .2 0c1.4-.3.8-3.5.7-4.8zM80.5 36.5c.3-.3.5-.7 1-.9 3.8-1.6 3.6 4.9.9 2.9-.5-.4-.5-1.7-1.2-1.5a.3.3 0 0 0-.1 0 .3.3 0 0 0 0 .2c-.4.7-.4 4.6.1 5.2.2.3 1.5 1.2.2 1.2a52 52 0 0 1-3.5-.3c-.3 0-.5-.2-.5-.5a.4.4 0 0 1 0-.2c.4-.4.6-.7.6-1.2l-.2-3.5a.4.4 0 0 0 0-.2l-.9-1c-.2-.2 0-.4.3-.6l2.6-1c.3 0 .5 0 .5.4v1h.2z" fill="#FEFDFD"></path><path class="most-popular-text" fill-rule="evenodd" clip-rule="evenodd" d="m82.2 24.2-.7-6.2-.7 6.2-2.7-2.1 2 2.7-6.1.7 6.2.7L78 29l2.8-2.1.7 6.1.7-6.1L85 29l-2.2-2.8 6.2-.7-6.1-.7 2-2.7-2.7 2.1z" fill="#fff"></path><path class="most-popular-text" d="M45 4v1a2 2 0 0 0 2 2h1-1a2 2 0 0 0-2 2v1-1a2 2 0 0 0-2-2h-1 1a2 2 0 0 0 2-2V4zm12 41v1a2 2 0 0 0 2 2h1-1a2 2 0 0 0-2 2v1-1a2 2 0 0 0-2-2h-1 1a2 2 0 0 0 2-2v-1zM13 22v3a4 4 0 0 0 4 4h3-3a4 4 0 0 0-4 4v3-3a4 4 0 0 0-4-4H6h3a4 4 0 0 0 4-4v-3zM67 4v3a4 4 0 0 0 4 4h3-3a4 4 0 0 0-4 4v3-3a4 4 0 0 0-4-4h-3 3a4 4 0 0 0 4-4V4z" fill="#fff"></path></svg>');
  function Jd(n) {
    p(n, Gp());
  }
  Qe(Jd, {}, [], [], !0);
  const Yd = (n) => {
    const t = n.badgeStyle || "simple", r = n.badgeText || "", a = { type: "dealBar", dealBarId: n.id }, l = { id: `legacy-${n.id}`, attachedTo: a, text: r, colors: null };
    return t === "most-popular" ? { ...l, badgeType: "most-popular", size: 102 } : t === "custom" ? n.badgeImageGID ? { ...l, badgeType: "custom", imageGID: n.badgeImageGID, size: 56 } : null : r ? { ...l, badgeType: "simple", textSize: 12 } : null;
  }, al = (n, t) => {
    if (n.blockLayout !== "vertical") return [];
    const r = is(n);
    if (r.length > 0) return r.filter((l) => l.attachedTo.type === "dealBar" && l.attachedTo.dealBarId === t.id);
    if (n.badgesEnabled === !1) return [];
    const a = Yd(t);
    return a ? [a] : [];
  }, Op = (n, t) => n.blockLayout !== "vertical" ? [] : is(n).filter((r) => r.attachedTo.type === t), is = (n) => n.badgesEnabled === !1 ? [] : n.badges || [], ka = (n, t, r) => ({ ...n, text: r(t(n.text)) }), Fp = (n) => {
    const t = n.filter((r) => r.badgeType === "border").map((r) => r.thickness);
    return t.length === 0 ? 22 : Math.max(...t);
  }, Lp = (n) => {
    const t = n.filter((r) => r.badgeType === "border").filter((r) => r.position === "all").map((r) => {
      var a;
      return (a = r.gap) != null ? a : 0;
    });
    return t.length === 0 ? 0 : Math.max(...t);
  };
  let il = null;
  const Kd = (n, t) => typeof document == "undefined" ? 0 : (il || (il = document.createElement("canvas").getContext("2d")), il ? (il.font = `bold ${t}px sans-serif`, il.measureText(n).width + 0.5 * n.length) : 0), jp = (n) => {
    const t = n.flatMap((r) => r.badgeType !== "border" || r.position !== "left" && r.position !== "right" ? [] : [Kd(r.text, r.textSize) + 24]);
    return t.length === 0 ? 0 : Math.max(...t);
  }, ma = (n) => ({ positions: new Set(n.flatMap((t) => t.badgeType === "border" ? [t.position] : [])), thickness: Fp(n), gap: Lp(n), sideLength: jp(n) });
  var Ep = Tn('<animate attributeName="startOffset" repeatCount="indefinite"></animate>'), Rp = Tn("<textPath><!> </textPath>"), Np = Tn("<!><!>", 1), Qp = Tn('<svg class="kaching-bundles__badge-border__curve"><path fill="none"></path><text text-anchor="middle"></text></svg>'), Wp = $('<span class="kaching-bundles__badge-border__side kaching-bundles__badge-border__side--top"><!></span>'), Up = $('<div class="kaching-bundles__badge-border kaching-bundles__badge-border--all"><div class="kaching-bundles__badge-border__band"><span></span></div> <!></div>'), Hp = $('<div><span class="kaching-bundles__badge-border__text"><!></span></div>');
  function Xd(n, t) {
    const r = (function() {
      var z, C, R;
      if (ht && wt && wt.nodeType === 8 && ((z = wt.textContent) != null && z.startsWith("$"))) {
        const N = wt.textContent.substring(1);
        return hr(), N;
      }
      return (R = (C = window.__svelte) != null ? C : window.__svelte = {}).uid != null || (R.uid = 1), "c" + window.__svelte.uid++;
    })();
    Ke(t, !0);
    const a = m(t, "badge", 7), l = typeof window != "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, o = u(() => a().colors ? `--bar-most-popular-background-color: ${Le(a().colors.background)}; --bar-most-popular-color: ${Le(a().colors.text)};` : ""), c = u(() => {
      var z;
      return `--badge-border-thickness: ${a().thickness}px; --badge-text-size: ${a().textSize}px; --badge-ring-outer: ${a().thickness + ((z = a().gap) != null ? z : 0)}px;`;
    });
    let s = ze(0), i = ze(0);
    const d = u(() => a().position === "left" || a().position === "right"), g = u(() => {
      const z = Math.max(6, a().thickness - 6), C = e(d) ? e(i) : e(s), R = Math.max(1, a().text.trim().length), N = C > 0 ? (C - 16) / (0.62 * R) : 1 / 0;
      return Math.max(6, Math.min(a().textSize, z, N));
    }), f = u(() => `--badge-border-thickness: ${a().thickness}px; --badge-text-size: ${e(g)}px;`);
    let h = ze(void 0), _ = ze(lt({ count: 0, slot: 0, pathLength: 0 })), v = ze(void 0), b = ze(0), x = ze(0);
    const D = u(() => Math.max(6, Math.min(a().textSize, a().thickness - 6))), S = u(() => 0.32 * e(D)), I = u(() => 0.4 * e(D) + a().spacing), W = u(() => a().delimiter || ""), Q = u(() => (Kd(a().text.trim(), e(D)) || a().text.trim().length * e(D) * 0.7) + (e(W) ? e(D) : 0) + 2 * e(I));
    Je(() => {
      if (e(E), e(Q), !e(h)) return;
      const z = e(h).getTotalLength() / 2;
      if (z <= 0 || e(Q) <= 0) return;
      const C = Math.max(1, Math.floor(z / e(Q)));
      le(_, { count: C, slot: z / C, pathLength: z }, !0);
    });
    const E = u(() => {
      if (!e(v) || !e(b) || !e(x)) return "";
      const z = getComputedStyle(e(v)), C = parseFloat(z.getPropertyValue("--bar-border-radius")) || 8, R = parseFloat(z.getPropertyValue("--badge-border-gap")) || 0, N = a().thickness / 2 + e(S), J = e(b) - N, X = e(x) - N, B = Math.min(C + R + N, Math.max(0, Math.min(J - N, X - N) / 2)), F = ["H " + (J - B), `A ${B} ${B} 0 0 1 ${J} ${N + B}`, "V " + (X - B), `A ${B} ${B} 0 0 1 ${J - B} ${X}`, `H ${N + B}`, `A ${B} ${B} 0 0 1 ${N} ${X - B}`, `V ${N + B}`, `A ${B} ${B} 0 0 1 ${N + B} ${N}`].join(" ");
      return `M ${N + B} ${N} ${F} ${F} Z`;
    }), K = `kaching-badge-ring-${r}`, M = u(() => a().repeatText && a().animated && a().spinSpeed > 0 && !l && e(_).pathLength > 0), te = u(() => e(M) ? Math.max(2, e(_).pathLength / Math.max(1, a().spinSpeed)) : 0);
    var A = { get badge() {
      return a();
    }, set badge(z) {
      a(z), k();
    } }, L = Be(), se = pe(L), Z = (z) => {
      var C = Up(), R = q(P(C), 2), N = (X) => {
        var B = Be();
        rt(pe(B), () => e(E), (F) => {
          var V = Be(), O = pe(V), ee = (ge) => {
            var T = Qp();
            {
              const oe = (j, re = yr, Y = yr) => {
                var ie = Rp(), _e = P(ie), Se = (ye) => {
                  var he = Ep();
                  be(() => {
                    var ce;
                    Pe(he, "from", a().spinDirection === "clockwise" ? re() : re() + e(_).pathLength), Pe(he, "to", a().spinDirection === "clockwise" ? re() + e(_).pathLength : re()), Pe(he, "dur", `${(ce = e(te)) != null ? ce : ""}s`);
                  }), p(ye, he);
                };
                G(_e, (ye) => {
                  e(M) && ye(Se);
                });
                var me = q(_e, 1, !0);
                y(ie), be(() => {
                  Pe(ie, "href", `#${K}`), Pe(ie, "startOffset", re()), ft(me, Y());
                }), p(j, ie);
              };
              var w = P(T);
              bi(w, (j) => le(h, j), () => e(h));
              var U = q(w);
              $t(U, 21, () => ({ length: e(_).count }), Mr, (j, re, Y) => {
                var ie = Np(), _e = pe(ie);
                oe(_e, () => Y * e(_).slot + e(_).slot / 2, () => a().text);
                var Se = q(_e), me = (ye) => {
                  oe(ye, () => Y * e(_).slot + e(_).slot, () => e(W));
                };
                G(Se, (ye) => {
                  e(W) && ye(me);
                }), p(j, ie);
              }), y(U), y(T), be(() => {
                Pe(w, "id", K), Pe(w, "d", e(E));
              });
            }
            be(() => {
              var oe, j;
              return Pe(T, "viewBox", `0 0 ${(oe = e(b)) != null ? oe : ""} ${(j = e(x)) != null ? j : ""}`);
            }), p(ge, T);
          };
          G(O, (ge) => {
            e(E) && ge(ee);
          }), p(F, V);
        }), p(X, B);
      }, J = (X) => {
        var B = Wp();
        Ve(P(B), () => a().text), y(B), p(X, B);
      };
      G(R, (X) => {
        a().repeatText && a().text.trim() ? X(N) : X(J, !1);
      }), y(C), bi(C, (X) => le(v, X), () => e(v)), be(() => {
        var X, B;
        return Vt(C, `${(X = e(o)) != null ? X : ""} ${(B = e(c)) != null ? B : ""}`);
      }), Rl(C, "clientWidth", (X) => le(b, X)), Rl(C, "clientHeight", (X) => le(x, X)), p(z, C);
    }, H = (z) => {
      var C = Hp(), R = P(C);
      Ve(P(R), () => a().text), y(R), y(C), be(() => {
        var N, J, X;
        Lt(C, 1, `kaching-bundles__badge-border kaching-bundles__badge-border--${(N = a().position) != null ? N : ""}`), Vt(C, `${(J = e(o)) != null ? J : ""} ${(X = e(f)) != null ? X : ""}`);
      }), Rl(C, "clientWidth", (N) => le(s, N)), Rl(C, "clientHeight", (N) => le(i, N)), p(z, C);
    };
    return G(se, (z) => {
      a().position === "all" ? z(Z) : z(H, !1);
    }), p(n, L), Xe(A);
  }
  Qe(Xd, { badge: {} }, [], [], !0);
  var Zp = $('<div class="kaching-bundles__bar-most-popular kaching-bundles__bar-most-popular--custom"><img class="kaching-bundles__bar-most-popular__custom-image"/></div>'), Jp = $('<div class="kaching-bundles__bar-most-popular kaching-bundles__bar-most-popular--fancy"><!></div>'), Yp = $('<div class="kaching-bundles__bar-most-popular__content"><!></div>'), Kp = $('<div class="kaching-bundles__bar-most-popular kaching-bundles__bar-most-popular--simple"><!></div>');
  function aa(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "badge", 7), o = m(t, "blockLayout", 7), c = Fn(), s = u(() => l().badgeType === "custom" ? Ie(c, "$getMediaImageUrl", r)(l().imageGID) : void 0), i = u(() => o() === "vertical"), d = u(() => {
      switch (l().badgeType) {
        case "most-popular":
        case "border":
          return !0;
        case "simple":
          return !!l().text;
        case "custom":
          return !!e(s);
      }
    }), g = u(() => e(i) && e(d)), f = u(() => l().colors ? `--bar-most-popular-background-color: ${Le(l().colors.background)}; --bar-most-popular-color: ${Le(l().colors.text)};` : ""), h = u(() => l().badgeType === "simple" ? `--badge-text-size: ${l().textSize}px;` : ""), _ = u(() => l().badgeType === "most-popular" || l().badgeType === "custom" ? `--badge-size: ${l().size}px;` : "");
    var v = { get badge() {
      return l();
    }, set badge(I) {
      l(I), k();
    }, get blockLayout() {
      return o();
    }, set blockLayout(I) {
      o(I), k();
    } }, b = Be(), x = pe(b), D = (I) => {
      var W = Be(), Q = pe(W), E = (M) => {
        Xd(M, { get badge() {
          return l();
        } });
      }, K = (M) => {
        var te = Be(), A = pe(te), L = (Z) => {
          var H = Zp(), z = P(H);
          y(H), be(() => {
            Vt(H, e(_)), Pe(z, "alt", l().text || "Badge"), Pe(z, "src", e(s));
          }), p(Z, H);
        }, se = (Z) => {
          var H = Be(), z = pe(H), C = (N) => {
            var J = Jp();
            Jd(P(J)), y(J), be(() => {
              var X, B;
              return Vt(J, `${(X = e(f)) != null ? X : ""} ${(B = e(_)) != null ? B : ""}`);
            }), p(N, J);
          }, R = (N) => {
            var J = Kp();
            rt(P(J), () => l().text, (X) => {
              var B = Yp();
              Ve(P(B), () => l().text), y(B), p(X, B);
            }), y(J), be(() => {
              var X, B;
              return Vt(J, `${(X = e(f)) != null ? X : ""} ${(B = e(h)) != null ? B : ""}`);
            }), p(N, J);
          };
          G(z, (N) => {
            l().badgeType === "most-popular" ? N(C) : N(R, !1);
          }, !0), p(Z, H);
        };
        G(A, (Z) => {
          l().badgeType === "custom" && e(s) ? Z(L) : Z(se, !1);
        }, !0), p(M, te);
      };
      G(Q, (M) => {
        l().badgeType === "border" ? M(E) : M(K, !1);
      }), p(I, W);
    };
    G(x, (I) => {
      e(g) && I(D);
    }), p(n, b);
    var S = Xe(v);
    return a(), S;
  }
  function Wa(n, t) {
    Ke(t, !0);
    let r = m(t, "element", 7, "label"), a = m(t, "for", 7, void 0), l = m(t, "soldOut", 7, !1), o = m(t, "borderHost", 7), c = m(t, "children", 7);
    var s = { get element() {
      return r();
    }, set element(d = "label") {
      r(d), k();
    }, get for() {
      return a();
    }, set for(d = void 0) {
      a(d), k();
    }, get soldOut() {
      return l();
    }, set soldOut(d = !1) {
      l(d), k();
    }, get borderHost() {
      return o();
    }, set borderHost(d) {
      o(d), k();
    }, get children() {
      return c();
    }, set children(d) {
      c(d), k();
    } }, i = Be();
    return Wc(pe(i), r, 0, (d, g) => {
      Xc(d, (h, _) => ({ for: a(), class: "kaching-bundles__bar-container", style: "", [hi]: h, [pi]: _ }), [() => ({ "kaching-bundles__bar-container--sold-out": l(), "kaching-bundles__bar-container--badge-border-all": o().positions.has("all"), "kaching-bundles__bar-container--badge-border-top": o().positions.has("top"), "kaching-bundles__bar-container--badge-border-bottom": o().positions.has("bottom"), "kaching-bundles__bar-container--badge-border-left": o().positions.has("left"), "kaching-bundles__bar-container--badge-border-right": o().positions.has("right") }), () => {
        var h, _;
        return { "--badge-border-thickness": `${(h = o().thickness) != null ? h : ""}px`, "--badge-border-gap": `${(_ = o().gap) != null ? _ : ""}px`, "--badge-border-gap-border": o().gap ? "1px solid var(--bar-border-color, rgba(0, 0, 0, 0.3))" : "none", "--badge-border-min-length": o().sideLength ? `${o().sideLength}px` : void 0 };
      }]);
      var f = Be();
      jl(pe(f), c), p(g, f);
    }), p(n, i), Xe(s);
  }
  function ll(n, t, r) {
    return n + t.reduce((a, l) => l.includeInCompareAt ? a + l.fullPrice : a, 0) + r.reduce((a, l) => l.includeInCompareAt ? a + l.fullPrice * l.quantity : a, 0);
  }
  function go(n, t, r) {
    return n ? t : r;
  }
  Qe(aa, { badge: {}, blockLayout: {} }, [], [], !0), Qe(Wa, { element: {}, for: {}, soldOut: {}, borderHost: {}, children: {} }, [], [], !0);
  const sl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3e%3crect%20width='100'%20height='100'%20fill='transparent'%20/%3e%3c/svg%3e", ho = ({ dealBlock: n, imageSize: t }) => {
    const { fonts: r, colors: a, cornerRadius: l } = n;
    return bn({ "kaching-free-gift-background-color": a.freeGiftBackground && Le(a.freeGiftBackground), "kaching-free-gift-text-color": a.freeGiftText && Le(a.freeGiftText), "kaching-free-gift-selected-background-color": a.freeGiftSelectedBackground && Le(a.freeGiftSelectedBackground), "kaching-free-gift-selected-text-color": a.freeGiftSelectedText && Le(a.freeGiftSelectedText), "kaching-free-gift-font-size": r.freeGift && r.freeGift.size + "px", "kaching-free-gift-font-weight": r.freeGift && or(r.freeGift.style), "kaching-free-gift-font-style": r.freeGift && cr(r.freeGift.style), "kaching-free-gift-image-border-radius": (l || 0) / 2 + "px", "kaching-free-gift-image-height": t + "px" });
  }, po = "data:image/webp;base64,UklGRoQYAABXRUJQVlA4WAoAAAAQAAAAVwEANAEAQUxQSPkFAAABBj/OtslttP9f5fcCagm1hVpF7YEJox4UKGYkeAMMGPfwDLTDZ1D2vIMIqAcB7VRSYECAAaEnwXBEmSwGHlrieL+jrjsiJgAn/5/8f/L/yf8n/w9iMzrDs9DBioEmgInM6NV1BfjS38jnJRbyl/z0anTfwYrRQgD4xYxeVQf15f0b+QwssfjtlYg8ExEHawBoId4gM3pV1dOX8AAqAJ+xRAb89pOcARg5wIrRQmAEM3p1XTXeAzefsVzIX/KTvBoBcIA10ELAMDOj366r1vXl/RuRz1gust9eicgzEXGwBtBCGD7m2avrqv19CcADFT4DS2T4TeQMeCbiYMVAC2FQkHn203XVyb563H8Glgv5S34SORsBcLBioAlAXyMz+q3qm+X9G5HPy4X89dsrkdEziIMVo0WE0IfIPHt1XfXc8mGP6jOwzH4TkTMAz0ScFTG9hORZdl31bo/Ko3rwM4DlT7Z30Cj7XA1D1zPot2o42l5BZ9WA/KlX2JshsdB9YlQOieW/woitwFY0TAjGOgRPdPd1x2BQlEurHcIoeSdS3S8gkMc/uW6hYVG9+wJUB/dr3SkYGEfeB1zlI7Y5undMVVwotvFHuk3cfSsGWoTuMxF2hQgArO5nAFIksUho+KOJvvLAZkz89KDfXxBPAfsJV2FvuAoXbLU2XIULzVW4NFyFc7bKHVdBiKvygKtwSVyVB1wF0W3iWCEft8mIFXCpW8TxQj5ukREvAKY9HDPk5y1ywwvILVfhnK1yx1bnxFTIHVfhnLgqD7gKl5qr8oCrcKm5Kp9wFXLDVZiwVW7ZatI8yxTIXeMcW6SNs1yB3HEVzomr8glX4ZK4Kh9zFS51sz4zRj7mKuSGqzBhK5gGGd7IJw2yvIFcmmOYA+dslVuuwuT/DpgRVyFgK6GmLNnDB1yFOTVDM4gPmmEYBHNqhOYQBGw1I67yAVdhRlzlHVdhTlyFoAELJpkRV3nHVmOuwpy4aq3rRnxi/mfOX/+rBa8YShsrIvxkL+ayB1Bxk5N9te+Ocgggc/UwUlade7fveX7vahFUHS37XuNxHPiUaiEddX/fXwC/PwrmfQeQ/gL4fgdIf4FHv+vp7OMPt+Ye+IPN2efwa80+nq0O/t8VHFsFPEN1cBzjJ4qB/EE+GX7araeJjLXioAeL3WqWxlHgrBZSdeWPTRqFzhqCqjt7+Ilq6r/vjP/tyjZGhtaVZClqtTaNodndsCnkkassTaLQWUNKv6vThWquWVflQClkt1pMkyiIEDhrNKlHKa7Rftwg6OSuHBjFbiVZEofOGk1QhwzrZJsEuFlV9r/i3ipDmkShs5rUUeVdbfwFNQsUbe76WyGyw9UUSRQ4azSpWka12Qeq8Ta962HFDqssjSV01mhStZZ3dZnr5oHGm7JH3V5lSKPQWaNJNTOsiR+rVjRJiV5TiOBWFtNEIgerSTWb4nrMqR0AN7vrJ4XsbldZLFHgjBZS7Sjv6rB3qjV1dFf2i1tZZWkSwllNUC0r747nJ6pN7awqu68Abq8W0yQKnDWaFEi1ssTH8hfUKqBgXXbdpyh01mhS7e/eHWemVdvai7su2i7eASh2K0mM6k7t4sWBygozo1o4WHdN7GC1IJHQGa06lmwYv/uhsgJSrVpZkrJTNkZ1vLZh/G57+wRgFajWdvNyQN0nG8bZpqgAwSzSqsUpKrvjk/SB+2TD8QShJdXyJu2MGfWF7qRgXXbDRA1vnZZd4MMBBrh1F9hBBh0dbSu3QCGyQ2M+6WEG2OmBtrKYJnHorAkTiQEri4b4RA12CrZPk8U0iQIHo0n9YNQQuOEGmHh7K1cyjSV01mhSB7bbZmQ05EDWQTRBHTlpxlgxqN02YaM5BHETJopF9aJ+K80jsNu6+UBxaVi3lNgE43ptjGLUoFZOsapd1GesmFXH25pEil9tXItIsaybHq0YK6YltzhKsQkU3+rw6nBFahTr6ujqMMVqTIp7TXT1Y8Uq0oqDTZTtnrLbTENRXCw2SJHdTyfOKGYmLUZInfx/8v/J/yf/n/xfUwBWUDggZBIAABBuAJ0BKlgBNQE+kUSdS6WjoyKjsKo4sBIJY27PfD3SSyKUjHn6I/9g+wnp1XR9XeHo4f/o+c8+z/svWv5h/PG/dj1H/tl6znpI/wG+5eif50XrR/4/0x7lbtfWHf5TxH7Mfb7NRhu8olZENf8uT5T92PZPIW8X7T682rzd4lnfXm1ebvEs7682rzd4lnfXm1ebvEs7682cCffkKj/0t06JEArP+RShHR4v2n15tXgarCFNF1ibE7/5+j/5Eo0NQ71kF8hWki+N0nFn4jermljPNs27mUeI5uTXaZCzZcqM9AZ31VHNeqhmXSx23Z8dlZD8ZLgOnx2CihtqzmhwsRfw/eimox4+fV6eEJSdr6tkyKOTLOnvmStQTaPNLcVmD06I09Zy8EdqnfHY/1ThdMVchaQQV9Czk/i57RyGMsSMid4Y5ZOoPpStMmO8jZqSCSIW4/wUhOsJe0AZ6WDNd9x5zXViysoni6q6+atjpl5A4ZI62UyqCiLbYjoKnTB7xff5zuxt3G0QiDSsrujnM51e8UgSobndmKsG7c87GZH5co4+UWdNOodvlgpKvlr7hqlF1cRHNor9k7pt9pIiAEYeVwoSNvwFplyxFu65+r+nXIwUbLR8xF9LPeZ2oTVkeqIkflO/9CzgZ7RhB6LLduY5ORVBLovgTZu3/QSKkDFShUs2FVKnB9lmICdwUzmUNmRSe0Ga6FsxyfdT/gQrVJY2mpe+QnRjhSbGOZcUpMsoVwsFkw3byx7SAunIxFL1TxePhC6fUfxCcdqHww8KiOjXdEXZJcLI7GUTe0nviV7Z/qFPWXNlIDS/JIszeV7nM8HpdPmdLEDK+MYaGUEL/wZsFblu2q1mU0SC8gaf+iYsqqUR2ld74gez3le4VQSRtOB9B/YLTsZfqcOjzW3/m6EHXNHKBFFsVFTpZmn4qMgVjJwf9P8cnItR6Fq7fOAslEO4e30AHZzsht3FP8GTJU1rAoYDv8k41Bg3f/c3i4TQIPpSjW5RcJV8JNBN1eawaXo9ZbN31YZSVQw8Ops/2bVbq9/s1Q1s9PunHUU+2ut0DDvCY/6iQ+2YthZQQ1GyDGUCpfQ3eJaANqy/p8rAbnON/3LplJEi/afXm1ebqaKUavN3iWd9ebV5u8SzvrzavN3iWd9ebV5u8SzvrzavN3iWd9ebV5u8LgAA/vvbO+3sHnP/IdkpDnbh3TvfXYAB5WzWlLuMAAKgIwAABAsU14K4XnDjt+rrb+D2R0m2FHkZuG6rmV+6YFzI/Ls2EEst1oHCIDkSkVmJwdSN9EIhanLXNhfekK1Iqx1IvcdGU5Q6TPJ89BkFWsH4P6w+AEaw8K0furvg3C+MmCPSi39Pk9u+gxEye7RHQx3e7sJBZSlSVpmGjma6gAJaYWfuB78fJroBwKlaJ0mMNd4azeh/Wa3EotpAl4KB176JCBofnI39MAuoo85WpbZ9xjxDQYsob4zBW0Iz7pbo/HiIkhee6DRpkJIr6wM5Ky5hmYHwSSvj+7kH1iIOCj6tAbabEAQCNQeVRTORaxyDAr7/GtCLaDWcs/7oXWIweUfirzVQ7ThYMPR9h8IVWCJYs5dn/dfu56GMoeSVL3vuDT8eOkQLrvbk7h5UKTxL57kgt6N+KFtV/n39fyoZGVhshZgWcPcsGXFGajPTSTOUlsZ/vewlCzkR+ALaPvm4/+MGM7HT0B28wt+z1iFe68rT2C3wDvd2pkd4kwT1ZXXhgCaP8IHGlcRLWtK0/KEVZ1ugqmbOqoEiTwSRYuEmJ28JT53qpD9rvw4bWSCRVmp6vS1i+OAvuw7ChW+RkrYvU/D24QzjPCHYio+CkhfgXvVO46aZf7HZ/APLJHJJzVT1j4OLgCKZ/+Ak1e0EKDPh4rTJsaT3s8WtTy5XH+4Ar6xg6I3WtxR+uRF26LUw4qh9rDq9Tp7vxD5TzVPNkmLExWNGgR6eVQ2GooMqhjhD639FbbGvPBA3ybzgr7n5Ci9s6Wz++LCWHCwK1Z6DT19WpGRfIsCWCkYCRTKxUtMZSIT8ucXjOXLVCOftRCEKFT4b6uZ65Ag8l6ZwGA9vBgVH4yjz3rhaTMXAVN8ZtMN+Peal4ByXEaarmBZHcjINdGAHfq/Oon/WJPDl1La0sZ/z7NnwnicGzYjOu/+E9PY1uiQDBcmka2MieoJp36IbjfvQLURbGUMf1OX6zyYoVSC8wZfYlktDUkqM9WhYE1c4nOaHYtnrCuOiEPng8J2pRFr5NeR4lIsiH6Z4wQDzOZbpOftV8uUhurbz6TTohG7rdsM3Jkpsl7NlcnTwTwO/wnsAVgCAexRRUegE8kK7ZBn9DYsKHGisummSWwi9LxZqPCQbjrkXNuWFu1L7NvVwRU/SFadxboS/0qrszn85S44QntIQB/YirAkqb9zp8cndyKm1JSLqd+B0ytCADHpsJ5tIRIRlqWiK5Z3mRpnoZ41mgopa3mx70p3vl/4dB9U/HbNxwGMVZwzqOJ1gtobOcYv4N4GE/9/PioYppduKcYUonHSe4/3qQSrq/d8AMj5fRlAEPwNdWGsNJAtAr1IMC662V61JfHP8ENdFsTmbbcZ6QaXRBgGH3IZfWJHt4aQK/pLXOPF01GqrLm+KfuiYRg9SdihgVqnSnWiOz5QJcoQdFYrwvdJTA3IDamLNiUdka/z2iBOCQPtqrUEsiyPhVyMRGkBWUEXUS8aojpuiFrHqEeODgQNvYmA4SrXVoiOOIDOC57cNsP1/N9GN0jE8bIPAwth4nEv26clftxesbpcO5CbbOPhk+4teaVMLwqEMkQ9YcYDhAn1UQm/P3PukbCh6OquvhSA8q9YvD80J2p4qMfqHujubJy+pt0+o+mrxgsrcdHWv4sSkPBRdjMUrDPZLvblU1bnNHivzRvFcaJLGb6GIGfB6O/ZKp1jWBT6xmKAeZWVJ8oOesDrGaYK0ecPFQz1Kuy5kORX5BCtS2qmcP0EA33Ytva164kYbJLPQqbkznx1MLByN1pC1Ik6afVhXF4Md0RY17gT2UjnSVYPmF/zPGsMRWvrtiSQRKgwUoxqgtEcfS49Laz2JMIExQJFfV3WrYgNICYlRLAYmV9ubjRL8xrrPJOxg49X/PpZMbndQYIsESJm+IzeXnBMrbIsdeaxHjknEDGyHgeDWKezmv60AaqcaQzwPQfmnJvj9esFQK1oEZOAhVQaNG82I3acJJ+sM/lNmSPy/iKzYyMHrpWAtqMiD/VbxffYGWdktLKJ6DnzcchVzvgkPeJ/AEYySCs/AJwxoZMCEcYNAyPbSOeIhrSZ7oiwkixKsfLQ+uMIecj3dpwHtZBxKdw3H1agydVHgrcDu2Q1YIvCW0l+YCBgLgVvKCQiJZrmECgugPITyU+7JPijpmGi92sUJDZaFi8AXbjw0XOTvpGBzk6SOQWbZRs0FTUb1nAizq0zZPFxm8JaADC02BSHVQUCf4x6YZrJ5DIRFyxt9Jv0pVBaCRRKAOO3/X/UVpzCGUfhHdRWh93s5eWczTMyYN1GHakkA3lEvMckdz9VSeaYVHWgbgR/SsKqHaFBCMqYnbGNHYulIdrf/P7sy9/cTd8B+MlqRCwfCgJvjATta1MfBNGzKLERRjPb2v9em/Re5JPZCtt6Yyn8Vql2CdRL+7z8oYczxwxTA3/QfjLD78pZ6RpVkzBIHLkMQf93Il10CGh5IawlF+d1dkgebUndWPL12ydwc0PVR3b0c0e8OlgN2vakaDpQEKqKPiIukcoIpAlgclG5W5zjdiPbIbF0uWeULQsvMvI9c5T6P9sRjv+FZz51d19aWCdbLU/fCFJ53MbT0+42wMhRj23n/iD+LlPYOSgdtfo9WiiRfl2Mt//MJzOsz8sFwteelxQEjbCqNE0JmRx+KBefHBDl8C78WHTaIIzN5gmbehbTat1ShJBF5hxBrYRIh2z4mEop3uaCco1qsvq44TnxUsBnbY1n8ApxtHL+I927cLgdz4OLFqdmFjrJQrQi6drim9ZhKNKblZRY6Nm6Xxw8AG31CjKw5Usm7EwX3dSh1ZsqmnI5qEjffuCX44g/SOzQqJVR7Fdb8JeHLF12m738y3FF8Mzs16Oc/2LwNUHONGYkVtr+DKAaGl5Hj/eNrGgDwmZkDKFiMx6NDt1/fJ5DJujHYvfqnc306fF1hqAKGhRaX6mkQAFTvdvjKAE6D2qcOgzuA8OW9wA45u64gX+kFxY0AS6eqgGGChj5Z/p1Hbf5M9a/gKoaZ7B+Tcnn9Qe9zU00N7zH8lyWGJ2TkauTtQK1NiJyMXrdamQmMdapyOTWCQuByf81ArLtC/bleHgTwNM7WM3WcgxuY0K+tM/GlMB3o4c6KXobq+gT4beks4Z0bY30MI8bvJO+Oxwdaw3i25dbrmfZF24MJSjUBqBgpoCPEKbOE1B0kKa0DivLYosxKI+LGXKRTQfmdgrSTks4ug6urIa/bOM7wPLDJGRj0VqBthQyVN68yQX1AJQMB25WapBsPo/4lBu682ATODwomExed5azFmo1uS1oR8yjjVguvGk0aXC8rbqCnjsujXvMr17GDqUjHgKsOJdqUSlNjxu2YRrqyCQqeDKyGUDulKhhtJLO/4E34Re0lA8JnM1OWPAEB4UWa3wXhCn7tYRx/NdlCvHEXRgHuU1x9vbx8wJIw9x9YMaMqgUz6XhCa9CHfb8w6Zw2YtPEVQ9evaBn1Z9D6FOmIHGya7+VzN5NHL4+s6mM/hIagdT2DfDbr34+S/pRYO0OTY2kNLBk7H0A60bCCr+dUfc3D4aiAWmcyJy06sV91x0NyHNPAl1cPP9yMhUpsXuSRb8G+rZqQPmfsDeGv8OazizGLy6WH/kvfkOHUSaX/OhgunoJ9VeEOXibNKy82aKQbeO0Ha7UVsW4XgQgLdDlwVIalDeTNcwE6nmQ9txE1hmG+EiJvFI4qtHDI9DsVu9oD7B+cGL3mjjXVHfSwugESEFWLTK5H6wNsIpftM4OHEYWyaeUeZ7JJE1eDJQ9Zf+5vZtZh3myMRpA2qFbL0Z1XGffNF+rkMit+fjRpAjeYiJtbPXt1caN1R1abhCgztNuwREE8wupCjEm+NE+bKPiOqlykwKJ3P/3sgKhNseT14hUvrpWzccNtRuPDNOunCTAmbmLE7WagpIdGYD1/+3+5jJokGgYMTKPDtGcyL2UcCJbWhsr29Eb7GipPp2p1cQ+vehDwOEv3Zy1JrpGaND/5dRLHQTBHj6cgEpGQusdOTAdDDuz3bIG0bjvrZlGPLGuLFq+K3yADMtsjQQcuZzrWixor2wnfJtn15LHqkqakk4OIH4/MIXBGBWj9Ew3Y10HyG9ozFVfGMMh335PDmgh/DSu4AxehAoAqANVIJksDFYdub1wWo8yYh9Bj1+NUJynOVXk1qJZ8+B0QUVbJwcTOnM/fCsUt191Vky7IpF3Ar+L7eVM3PjlEJmI9gteoSeJw1gQCSMn/vaR0rn0ffVV6ozTkXntDBDGW52GLCy/g/BPvfHCJ+mj59BncgboXK3Fld7/4HRTyIAexwL2dRVvPHlg99XnjymrE4zUzJo+KycEBb83WPH/fOR5kEC3NqBEAmTeVYw8LJ+ocQMM2lE8kDjcyA12K+DfSgIhetLBZ/x7e4hD9A4gQgdFg8Ooa3bg/sPXFSwRjyiDQM/CZXMUaKtADyJ4CAx3/pYYzgOk2cLMZz5FMWFjbA/Q1LtDuQH7DkigDvOhb4Fmu7+H2b5J+4EKM8Yq+n06V/1tcpC4eeFk9xnMQluO1WqGwpuaoJCMP6qbU+yD7yNgJf9w5qrzxpGutPV9IhfsC4fqgGPBE3L7RVEgzeANeYJVlr36U8sZvtXG4PB4Hja+RPLUAO+eRxzRZy42p9LU83OprZBeO7230dieMH5Zoi0kR9fsCoTSMaa2nRhSiCb2tdJ4Z1lzYagv4odW8u2KOdSTmmMx6fuTxSqnpbix/IM1tyQ87iEvmLgKbKxxoq7jMWMGVKnT3/sYDe1Gh7sGkfO8X+SU8A6uPjQ5O60Qodizt/a/N+H663+1H+KNqX9JG3V8a4DIr7ksqFOrG4vcwrmMfGNKzZEqY3YdfhK186TnkB4qAAAAAAAAUL6grl/NBh0xCf2j3r4dOzXRh7I2aCCSe5vWpAob7xObCtSNwZb2vrH2mGahZz5v19m0OpjZMD/eZuwAQT9lzRvhNLg3peoff6JaWOXAZuxTigRvsWkffJzmaqRu1XRn2I5Q8LDKQ102v7qO1JV8AAAAAAAAAAAAAAAAAAAA=", eu = ({ freeGift: n, product: t, variantImage: r, getMediaImageUrl: a }) => n.mediaImageGID ? a(n.mediaImageGID) : n.giftType === "shipping" ? po : r || (t == null ? void 0 : t.image), bo = (n, t, r) => {
    var a, l;
    const o = (l = (a = t.variantGIDs) == null ? void 0 : a.map(Zt)) != null ? l : null;
    return n.variants.filter((c) => (r || c.availableForSale) && (!o || o.includes(c.id)));
  };
  var Xp = $('<img alt="" class="kaching-bundles__free-gift__image"/>'), eb = $('<div class="kaching-bundles__free-gift__image"></div>'), tb = $('<span class="kaching-bundles__free-gift__text"><!></span>'), nb = $('<div class="kaching-bundles__free-gift__full-price"><!></div>'), rb = $('<div><div class="kaching-bundles__free-gift__main"><!> <div class="kaching-bundles__free-gift__content"><!> <!></div></div> <!></div>');
  function tu(n, t) {
    Ke(t, !0);
    const r = () => Ie(v, "$config", l), a = () => Ie(x, "$formatPrice", l), [l, o] = vt();
    let c = m(t, "dealBlock", 7), s = m(t, "freeGift", 7), i = m(t, "product", 7), d = m(t, "dealBarSelected", 7, !1), g = m(t, "collapsed", 7, !1), f = m(t, "sets", 7), h = m(t, "mainProductVariantId", 7), _ = m(t, "onChange", 7);
    const v = _n(), b = Ct(), x = cn(), D = Fn(), S = u(() => {
      if (i()) return { ...i(), variants: bo(i(), s(), r().preview) };
    });
    let I = ze(void 0);
    const W = u(() => (function(B, F) {
      if (B !== void 0) return B;
      if (F != null && F.availableForSale && F.variants.length > 0) return F.variants[0].id;
    })(e(I), e(S))), Q = u(() => e(S) && e(W) ? e(S).variants.find((B) => B.id === e(W)) : void 0), E = u(() => {
      var B;
      return eu({ freeGift: s(), product: i(), variantImage: (B = e(Q)) == null ? void 0 : B.image, getMediaImageUrl: Ie(D, "$getMediaImageUrl", l) });
    }), K = u(() => s().quantity * f()), M = u(() => (function(B, F) {
      if (!F) return 0;
      let V = F.price;
      return F.compareAtPrice && B.useProductCompareAtPrice && (V = Math.max(V, F.compareAtPrice)), V * e(K);
    })(c(), e(Q))), te = u(() => ho({ dealBlock: c(), imageSize: s().imageSize })), A = u(() => dn({ priceFormatter: a(), product: i(), totalFullPrice: e(M), totalDiscountedPrice: 0, quantity: e(K), unitQuantity: e(Q) ? kr([{ variant: e(Q), quantity: e(K) }]) : null })), L = u(() => s() ? e(A)(Ie(b, "$translate", l)(s().text)) : ""), se = u(() => {
      var B;
      if ((B = i()) != null && B.url) return e(W) ? `${i().url}?variant=${e(W)}` : i().url;
    });
    function Z(B) {
      le(I, B, !0);
    }
    let H;
    pr(() => {
      s().productGID, le(I, void 0), H = void 0;
    }), pr(() => {
      if (c().disableVariantOptionSync || !h() || !e(S) || h() === H) return;
      const B = H;
      H = h(), e(S).variants.some((F) => F.id === h()) && (e(I) !== void 0 && e(I) !== B || le(I, h(), !0));
    }), Je(() => {
      var B;
      e(Q) && ((B = i()) != null && B.availableForSale) && e(K) && nn(() => {
        _()({ variant: e(Q), product: i(), fullPrice: e(M) });
      });
    });
    const z = u(() => !(!i() || i().availableForSale && bo(i(), s(), !1).length !== 0));
    var C = { get dealBlock() {
      return c();
    }, set dealBlock(B) {
      c(B), k();
    }, get freeGift() {
      return s();
    }, set freeGift(B) {
      s(B), k();
    }, get product() {
      return i();
    }, set product(B) {
      i(B), k();
    }, get dealBarSelected() {
      return d();
    }, set dealBarSelected(B = !1) {
      d(B), k();
    }, get collapsed() {
      return g();
    }, set collapsed(B = !1) {
      g(B), k();
    }, get sets() {
      return f();
    }, set sets(B) {
      f(B), k();
    }, get mainProductVariantId() {
      return h();
    }, set mainProductVariantId(B) {
      h(B), k();
    }, get onChange() {
      return _();
    }, set onChange(B) {
      _(B), k();
    } }, R = Be(), N = pe(R), J = (B) => {
      var F = rb();
      let V;
      var O = P(F), ee = P(O);
      {
        let Y = u(() => d() ? e(se) : void 0);
        Xn(ee, { get url() {
          return e(Y);
        }, class: "kaching-bundles__free-gift__link", children: (ie, _e) => {
          var Se = Be(), me = pe(Se), ye = (ce) => {
            var ae = Xp();
            be(() => {
              Pe(ae, "src", e(E)), Pe(ae, "height", s().imageSize || 0);
            }), p(ce, ae);
          }, he = (ce) => {
            var ae = eb();
            let de;
            be((fe) => de = Vt(ae, "", de, fe), [() => {
              var fe, $e;
              return { height: `${(fe = s().imageSize || 0) != null ? fe : ""}px`, width: `${($e = (i() || s().mediaImageGID) && s().imageSize || 0) != null ? $e : ""}px` };
            }]), p(ce, ae);
          };
          G(me, (ce) => {
            e(E) ? ce(ye) : ce(he, !1);
          }), p(ie, Se);
        }, $$slots: { default: !0 } });
      }
      var ge = q(ee, 2), T = P(ge), w = (Y) => {
        var ie = Be();
        rt(pe(ie), () => e(L), (_e) => {
          var Se = tb();
          Ve(P(Se), () => e(L)), y(Se), p(_e, Se);
        }), p(Y, ie);
      };
      G(T, (Y) => {
        e(L) && Y(w);
      });
      var U = q(T, 2), oe = (Y) => {
        Un(Y, { get product() {
          return e(S);
        }, get selectedVariantId() {
          return e(W);
        }, onChange: Z });
      };
      G(U, (Y) => {
        d() && e(S) && e(S).variants.length > 1 && e(W) && Y(oe);
      }), y(ge), y(O);
      var j = q(O, 2), re = (Y) => {
        var ie = Be();
        rt(pe(ie), () => e(M), (_e) => {
          var Se = nb();
          Ve(P(Se), () => a()(e(M))), y(Se), p(_e, Se);
        }), p(Y, ie);
      };
      G(j, (Y) => {
        s().showPrice && e(M) > 0 && Y(re);
      }), y(F), be((Y) => {
        V = Lt(F, 1, "kaching-bundles__free-gift", null, V, Y), Pe(F, "data-free-gift-id", s().id), Vt(F, e(te));
      }, [() => ({ "kaching-bundles__free-gift--out-of-stock": r().preview && e(z) })]), p(B, F);
    };
    G(N, (B) => {
      !g() && (!s().productGID || e(Q) || r().preview && e(z)) && B(J);
    }), p(n, R);
    var X = Xe(C);
    return o(), X;
  }
  Qe(tu, { dealBlock: {}, freeGift: {}, product: {}, dealBarSelected: {}, collapsed: {}, sets: {}, mainProductVariantId: {}, onChange: {} }, [], [], !0);
  var ab = $('<img alt=""/>'), ib = $('<div class="kaching-bundles__free-gift-summary__images"></div>'), lb = $('<span class="kaching-bundles__free-gift__text"><!></span>'), sb = $('<div class="kaching-bundles__free-gift kaching-bundles__free-gift-summary"><!> <!></div>');
  function nu(n, t) {
    Ke(t, !0);
    const [r, a] = vt();
    let l = m(t, "dealBlock", 7), o = m(t, "images", 7), c = m(t, "count", 7), s = m(t, "title", 7), i = m(t, "imageSize", 7);
    const d = Ct(), g = cn(), f = u(() => dn({ priceFormatter: Ie(g, "$formatPrice", r), product: void 0, totalFullPrice: 0, totalDiscountedPrice: 0, quantity: 1, unitQuantity: null, freeGiftsCount: c() })(Ie(d, "$translate", r)(s()))), h = u(() => ho({ dealBlock: l(), imageSize: i() }));
    var _ = { get dealBlock() {
      return l();
    }, set dealBlock(W) {
      l(W), k();
    }, get images() {
      return o();
    }, set images(W) {
      o(W), k();
    }, get count() {
      return c();
    }, set count(W) {
      c(W), k();
    }, get title() {
      return s();
    }, set title(W) {
      s(W), k();
    }, get imageSize() {
      return i();
    }, set imageSize(W) {
      i(W), k();
    } }, v = sb(), b = P(v), x = (W) => {
      var Q = ib();
      $t(Q, 21, o, Mr, (E, K) => {
        var M = ab();
        let te;
        be((A) => {
          Pe(M, "src", e(K).source), Pe(M, "height", i() || 0), te = Lt(M, 1, "kaching-bundles__free-gift-summary__image", null, te, A);
        }, [() => ({ "kaching-bundles__free-gift-summary__image--no-border": !e(K).bordered })]), p(E, M);
      }), y(Q), p(W, Q);
    };
    G(b, (W) => {
      o().length && W(x);
    });
    var D = q(b, 2), S = (W) => {
      var Q = Be();
      rt(pe(Q), () => e(f), (E) => {
        var K = lb();
        Ve(P(K), () => e(f)), y(K), p(E, K);
      }), p(W, Q);
    };
    G(D, (W) => {
      e(f) && W(S);
    }), y(v), be(() => Vt(v, e(h))), p(n, v);
    var I = Xe(_);
    return a(), I;
  }
  Qe(nu, { dealBlock: {}, images: {}, count: {}, title: {}, imageSize: {} }, [], [], !0);
  var ob = $('<div class="kaching-bundles__free-gift__divider"></div>'), cb = $("<!> <!>", 1), db = $("<!> <!>", 1);
  function yi(n, t) {
    Ke(t, !0);
    const r = () => Ie(v, "$config", a), [a, l] = vt();
    let o = m(t, "dealBlock", 7), c = m(t, "freeGifts", 7), s = m(t, "otherProducts", 7), i = m(t, "dealBarSelected", 7), d = m(t, "freeGiftsSummary", 7), g = m(t, "sellingPlan", 7), f = m(t, "sets", 7, 1), h = m(t, "mainProductVariantId", 7), _ = m(t, "onChange", 7);
    const v = _n(), b = Fn();
    let x = ze(lt({})), D = u(() => c().filter((L) => !L.applyOnlyForSubscriptions || g()));
    const S = u(() => e(D).flatMap((L) => {
      const se = L.productGID ? s().find((H) => H.id === Zt(L.productGID)) : void 0;
      if (!r().preview && L.productGID && !(se != null && se.availableForSale)) return [];
      const Z = se && !r().preview ? _r(se) : se;
      return { freeGift: L, product: Z };
    })), I = u(() => {
      var L, se;
      return (se = (L = d()) == null ? void 0 : L.enabled) != null && se;
    }), W = u(() => !i() && e(I) && e(S).length >= 2), Q = u(() => {
      var L, se;
      return (se = (L = d()) == null ? void 0 : L.showImages) != null && se ? e(S).flatMap(({ freeGift: Z, product: H }) => {
        const z = ((R, N, { preview: J, mainProductVariantId: X, disableVariantOptionSync: B }) => {
          if (!R) return;
          const F = bo(R, N, J);
          if (F.length !== 0) {
            if (!B && X) {
              const V = F.find((O) => O.id === X);
              if (V) return V;
            }
            return F[0];
          }
        })(H, Z, { preview: r().preview, mainProductVariantId: h(), disableVariantOptionSync: o().disableVariantOptionSync }), C = eu({ freeGift: Z, product: H, variantImage: z == null ? void 0 : z.image, getMediaImageUrl: Ie(b, "$getMediaImageUrl", a) });
        return C ? [{ source: C, bordered: Z.giftType !== "shipping" }] : [];
      }) : [];
    });
    Je(() => {
      (function(L, se) {
        if (!c().length) return;
        const Z = L.filter((H) => H.id in se).map((H) => ({ id: H.id, variant: se[H.id].variant, product: se[H.id].product, quantity: H.quantity * f(), fullPrice: se[H.id].fullPrice, showPrice: H.showPrice, includeInCompareAt: H.includeInCompareAt === !0, applyOnlyForSubscriptions: H.applyOnlyForSubscriptions }));
        _()(Z);
      })(e(D), e(x));
    });
    var E = { get dealBlock() {
      return o();
    }, set dealBlock(L) {
      o(L), k();
    }, get freeGifts() {
      return c();
    }, set freeGifts(L) {
      c(L), k();
    }, get otherProducts() {
      return s();
    }, set otherProducts(L) {
      s(L), k();
    }, get dealBarSelected() {
      return i();
    }, set dealBarSelected(L) {
      i(L), k();
    }, get freeGiftsSummary() {
      return d();
    }, set freeGiftsSummary(L) {
      d(L), k();
    }, get sellingPlan() {
      return g();
    }, set sellingPlan(L) {
      g(L), k();
    }, get sets() {
      return f();
    }, set sets(L = 1) {
      f(L), k();
    }, get mainProductVariantId() {
      return h();
    }, set mainProductVariantId(L) {
      h(L), k();
    }, get onChange() {
      return _();
    }, set onChange(L) {
      _(L), k();
    } }, K = db(), M = pe(K), te = (L) => {
      {
        let se = u(() => {
          var H, z;
          return (z = (H = d()) == null ? void 0 : H.title) != null ? z : "";
        }), Z = u(() => {
          var H, z;
          return (z = (H = e(S)[0]) == null ? void 0 : H.freeGift.imageSize) != null ? z : 30;
        });
        nu(L, { get dealBlock() {
          return o();
        }, get images() {
          return e(Q);
        }, get count() {
          return e(S).length;
        }, get title() {
          return e(se);
        }, get imageSize() {
          return e(Z);
        } });
      }
    };
    G(M, (L) => {
      e(W) && L(te);
    }), $t(q(M, 2), 19, () => e(S), ({ freeGift: L, product: se }) => L.id, (L, se, Z) => {
      let H = () => e(se).freeGift;
      var z = cb(), C = pe(z);
      tu(C, { get dealBlock() {
        return o();
      }, get freeGift() {
        return H();
      }, get product() {
        return e(se).product;
      }, get dealBarSelected() {
        return i();
      }, get collapsed() {
        return e(W);
      }, get sets() {
        return f();
      }, get mainProductVariantId() {
        return h();
      }, onChange: (J) => (function(X, B) {
        B.variant ? e(x)[X] = B : delete e(x)[X];
      })(H().id, J) });
      var R = q(C, 2), N = (J) => {
        p(J, ob());
      };
      G(R, (J) => {
        !e(W) && e(Z) < e(S).length - 1 && J(N);
      }), p(L, z);
    }), p(n, K);
    var A = Xe(E);
    return l(), A;
  }
  function ru(n, t = "body") {
    let r;
    async function a(l) {
      if (typeof (t = l) == "string") {
        if (r = document.querySelector(t), r === null && (await Ts(), r = document.querySelector(t)), r === null) throw new Error(`No element found matching css selector: "${t}"`);
      } else {
        if (!(t instanceof HTMLElement)) throw new TypeError(`Unknown portal target type: ${t === null ? "null" : typeof t}. Allowed types: string (CSS selector) or HTMLElement.`);
        r = t;
      }
      r.appendChild(n), n.hidden = !1;
    }
    return a(t), { update: a, destroy: function() {
      n.parentNode && n.parentNode.removeChild(n);
    } };
  }
  Qe(yi, { dealBlock: {}, freeGifts: {}, otherProducts: {}, dealBarSelected: {}, freeGiftsSummary: {}, sellingPlan: {}, sets: {}, mainProductVariantId: {}, onChange: {} }, [], [], !0);
  var ub = $('<div hidden=""><!></div>');
  function ol(n, t) {
    Ke(t, !1);
    let r = m(t, "target", 12, "body");
    var a = { get target() {
      return r();
    }, set target(o) {
      r(o), k();
    } };
    (function(o = !1) {
      const c = on, s = c.l.u;
      if (!s) return;
      let i = () => Gc(c.s);
      if (o) {
        let d = 0, g = {};
        const f = Ni(() => {
          let h = !1;
          const _ = c.s;
          for (const v in _) _[v] !== g[v] && (g[v] = _[v], h = !0);
          return h && d++, d;
        });
        i = () => e(f);
      }
      s.b.length && pr(() => {
        rd(c, i), zl(s.b);
      }), Je(() => {
        const d = nn(() => s.m.map(pg));
        return () => {
          for (const g of d) typeof g == "function" && g();
        };
      }), s.a.length && Je(() => {
        rd(c, i), zl(s.a);
      });
    })();
    var l = ub();
    return Nc(P(l), t, "default", {}), y(l), Es(l, (o, c) => ru == null ? void 0 : ru(o, c), r), p(n, l), Xe(a);
  }
  Qe(ol, { target: {} }, ["default"], [], !0);
  const au = [{ fonts: [20, 16, 12, 10], gaps: [16, 12, 8], image: 36 }, { fonts: [24, 20, 16, 12], gaps: [20, 16, 12], image: 48 }, { fonts: [28, 24, 20, 16], gaps: [24, 20, 16], image: 60 }, { fonts: [32, 28, 24, 20], gaps: [28, 24, 20], image: 80 }], iu = [0, 12, 16, 20, 24, 28];
  var gb = (n, t) => {
    n.target === n.currentTarget && t()();
  }, hb = $('<img alt="Close"/>'), pb = $('<span class="kaching-bundles__personalisation-modal__item-variant"> </span>'), bb = (n, t, r) => t(r(), n.currentTarget.value), fb = $('<img alt="Clear"/>'), vb = $("<span> </span>"), _b = $('<div class="kaching-bundles__personalisation-modal__item"><div class="kaching-bundles__personalisation-modal__item-info"><div class="kaching-bundles__personalisation-modal__item-image-wrapper"><img class="kaching-bundles__personalisation-modal__item-image" alt=""/></div> <div class="kaching-bundles__personalisation-modal__item-details"><span class="kaching-bundles__personalisation-modal__item-title"> </span> <!></div></div> <div class="kaching-bundles__personalisation-modal__input-wrapper"><div class="kaching-bundles__personalisation-modal__input-container"><input type="text"/> <!></div> <!></div></div>'), kb = $('<div role="none"><div class="kaching-bundles__personalisation-modal-overlay__content"><div class="kaching-bundles__personalisation-modal"><div class="kaching-bundles__personalisation-modal__header"><h2 class="kaching-bundles__personalisation-modal__heading"> </h2> <!></div> <div class="kaching-bundles__personalisation-modal__items"></div> <div class="kaching-bundles__personalisation-modal__actions"><!> <!></div></div></div></div>');
  function fo(n, t) {
    Ke(t, !0);
    const r = () => Ie(h, "$translate", a), [a, l] = vt(), o = m(t, "product", 7), c = m(t, "selectedVariants", 7), s = m(t, "personalisationValues", 7), i = m(t, "addPersonalisationModal", 7), d = m(t, "inline", 7, !1), g = m(t, "onConfirm", 7), f = m(t, "onClose", 7), h = Ct(), _ = u(() => {
      var B, F;
      return (F = (B = i()) == null ? void 0 : B.characterLimitEnabled) != null && F;
    }), v = u(() => {
      var B, F;
      return e(_) ? (F = (B = i()) == null ? void 0 : B.characterLimit) != null ? F : 30 : void 0;
    }), b = Math.max(...c().map(({ index: B }) => B), -1);
    let x = ze(lt(Array.from({ length: b + 1 }, (B, F) => s()[F] || "")));
    const D = new Set(s().map((B, F) => B && B.trim() !== "" ? F : -1).filter((B) => B !== -1)), S = u(() => i() ? (({ size: B, roundness: F, imageSize: V, textSize: O, overlayColor: ee, primaryTextColor: ge, secondaryTextColor: T, buttonColor: w, buttonTextColor: U, errorColor: oe }) => {
      const j = Math.min(Math.max(0, B), au.length - 1), re = Math.min(Math.max(0, F), iu.length - 1), Y = au[j], ie = iu[re];
      return bn({ "kaching-product-personalisation-font-0": Y.fonts[0] + "px", "kaching-product-personalisation-font-1": Y.fonts[1] + "px", "kaching-product-personalisation-font-2": Y.fonts[2] + "px", "kaching-product-personalisation-font-3": Y.fonts[3] + "px", "kaching-product-personalisation-gap-0": Y.gaps[0] + "px", "kaching-product-personalisation-gap-1": Y.gaps[1] + "px", "kaching-product-personalisation-gap-2": Y.gaps[2] + "px", "kaching-product-personalisation-image-size": (V != null ? V : Y.image) + "px", "kaching-product-personalisation-radius": ie + "px", "kaching-product-personalisation-text-size": O + "px", "kaching-product-personalisation-overlay-color": Le(ee), "kaching-product-personalisation-primary-text-color": Le(ge), "kaching-product-personalisation-secondary-text-color": Le(T), "kaching-product-personalisation-button-color": Le(w), "kaching-product-personalisation-button-text-color": Le(U), "kaching-product-personalisation-error-color": Le(oe) });
    })(i()) : "");
    function I(B, F) {
      if (e(v) === void 0 || F.length <= e(v)) {
        const V = [...e(x)];
        V[B] = F, le(x, V, !0);
      }
    }
    function W(B) {
      return D.has(B) && !!e(x)[B] && e(x)[B].trim() !== "";
    }
    const Q = u(() => e(x).some((B) => B && B.trim() !== "")), E = u(() => D.size > 0), K = u(() => !e(Q) && !e(E));
    var M = { get product() {
      return o();
    }, set product(B) {
      o(B), k();
    }, get selectedVariants() {
      return c();
    }, set selectedVariants(B) {
      c(B), k();
    }, get personalisationValues() {
      return s();
    }, set personalisationValues(B) {
      s(B), k();
    }, get addPersonalisationModal() {
      return i();
    }, set addPersonalisationModal(B) {
      i(B), k();
    }, get inline() {
      return d();
    }, set inline(B = !1) {
      d(B), k();
    }, get onConfirm() {
      return g();
    }, set onConfirm(B) {
      g(B), k();
    }, get onClose() {
      return f();
    }, set onClose(B) {
      f(B), k();
    } }, te = kb();
    let A;
    te.__click = [gb, f];
    var L = P(te), se = P(L), Z = P(se), H = P(Z), z = P(H, !0);
    y(H), Ht(q(H, 2), { element: "span", class: "kaching-bundles__personalisation-modal__close", get onclick() {
      return f();
    }, children: (B, F) => {
      var V = hb();
      be(() => Pe(V, "src", co)), p(B, V);
    }, $$slots: { default: !0 } }), y(Z);
    var C = q(Z, 2);
    $t(C, 21, c, ({ variant: B, index: F }) => F, (B, F) => {
      let V = () => e(F).variant, O = () => e(F).index;
      var ee = _b(), ge = P(ee), T = P(ge), w = P(T);
      y(T);
      var U = q(T, 2), oe = P(U), j = P(oe);
      y(oe);
      var re = q(oe, 2), Y = (de) => {
        var fe = pb(), $e = P(fe, !0);
        y(fe), be((qe) => ft($e, qe), [() => V().options.join(", ")]), p(de, fe);
      };
      G(re, (de) => {
        o().variants.length > 1 && de(Y);
      }), y(U), y(ge);
      var ie = q(ge, 2), _e = P(ie), Se = P(_e);
      let me;
      ea(Se), Se.__input = [bb, I, O];
      var ye = q(Se, 2), he = (de) => {
        Ht(de, { element: "span", class: "kaching-bundles__personalisation-modal__input-clear", onclick: () => (function(fe) {
          const $e = [...e(x)];
          $e[fe] = "", le(x, $e, !0);
        })(O()), children: (fe, $e) => {
          var qe = fb();
          be(() => Pe(qe, "src", "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.6667%203.99992V3.46659C10.6667%202.71985%2010.6667%202.34648%2010.5213%202.06126C10.3935%201.81038%2010.1895%201.60641%209.93865%201.47858C9.65344%201.33325%209.28007%201.33325%208.53333%201.33325H7.46667C6.71993%201.33325%206.34656%201.33325%206.06135%201.47858C5.81046%201.60641%205.60649%201.81038%205.47866%202.06126C5.33333%202.34648%205.33333%202.71985%205.33333%203.46659V3.99992M2%203.99992H14M12.6667%203.99992V11.4666C12.6667%2012.5867%2012.6667%2013.1467%2012.4487%2013.5746C12.2569%2013.9509%2011.951%2014.2569%2011.5746%2014.4486C11.1468%2014.6666%2010.5868%2014.6666%209.46667%2014.6666H6.53333C5.41323%2014.6666%204.85318%2014.6666%204.42535%2014.4486C4.04903%2014.2569%203.74307%2013.9509%203.55132%2013.5746C3.33333%2013.1467%203.33333%2012.5867%203.33333%2011.4666V3.99992'%20stroke='%23F04438'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e")), p(fe, qe);
        }, $$slots: { default: !0 } });
      };
      G(ye, (de) => {
        W(O()) && de(he);
      }), y(_e);
      var ce = q(_e, 2), ae = (de) => {
        var fe = vb();
        let $e;
        var qe = P(fe);
        y(fe), be((De) => {
          var ne, we;
          $e = Lt(fe, 1, "kaching-bundles__personalisation-modal__input-counter", null, $e, De), ft(qe, `${(ne = (e(x)[O()] || "").length) != null ? ne : ""}/${(we = e(v)) != null ? we : ""}`);
        }, [() => ({ "kaching-bundles__personalisation-modal__input-counter--error": e(v) !== void 0 && (e(x)[O()] || "").length >= e(v) })]), p(de, fe);
      };
      G(ce, (de) => {
        e(_) && de(ae);
      }), y(ie), y(ee), be((de, fe) => {
        var $e;
        Pe(w, "src", V().image || o().image), ft(j, `${($e = o().title) != null ? $e : ""} #${O() + 1}`), me = Lt(Se, 1, "kaching-bundles__personalisation-modal__input", null, me, de), Pe(Se, "placeholder", fe), La(Se, e(x)[O()] || ""), Pe(Se, "maxlength", e(v));
      }, [() => ({ "kaching-bundles__personalisation-modal__input--with-clear": W(O()), "kaching-bundles__personalisation-modal__input--error": e(v) !== void 0 && (e(x)[O()] || "").length >= e(v) }), () => {
        var de;
        return (de = i()) != null && de.placeholderText ? r()(i().placeholderText) : "";
      }]), p(B, ee);
    }), y(C);
    var R = q(C, 2), N = P(R);
    Ht(N, { element: "button", class: "kaching-bundles__personalisation-modal__button kaching-bundles__personalisation-modal__button--cancel", get onclick() {
      return f();
    }, children: (B, F) => {
      ua();
      var V = Wn();
      be((O) => ft(V, O), [() => r()("system.cancel")]), p(B, V);
    }, $$slots: { default: !0 } });
    var J = q(N, 2);
    {
      let B = u(() => ["kaching-bundles__personalisation-modal__button", "kaching-bundles__personalisation-modal__button--confirm", e(K) && "kaching-bundles__personalisation-modal__button--disabled"]);
      Ht(J, { element: "button", get class() {
        return e(B);
      }, get disabled() {
        return e(K);
      }, onclick: () => g()(e(x)), children: (F, V) => {
        ua();
        var O = Wn();
        be((ee) => ft(O, ee), [() => r()("system.confirm")]), p(F, O);
      }, $$slots: { default: !0 } });
    }
    y(R), y(se), y(L), y(te), be((B, F) => {
      A = Lt(te, 1, "kaching-bundles__personalisation-modal-overlay", null, A, B), Vt(te, e(S)), ft(z, F);
    }, [() => ({ "kaching-bundles__personalisation-modal-overlay--inline": d() }), () => {
      var B;
      return (B = i()) != null && B.heading ? r()(i().heading) : "";
    }]), p(n, te);
    var X = Xe(M);
    return l(), X;
  }
  On(["click", "input"]), Qe(fo, { product: {}, selectedVariants: {}, personalisationValues: {}, addPersonalisationModal: {}, inline: {}, onConfirm: {}, onClose: {} }, [], [], !0);
  var mb = (n, t) => {
    le(t, !0);
  }, xb = (n, t) => {
    n.key !== "Enter" && n.key !== " " || (n.preventDefault(), le(t, !0));
  }, yb = $('<div class="kaching-bundles__product-personalisation__image-wrapper"><img alt="" class="kaching-bundles__product-personalisation__image"/></div>'), wb = $('<div class="kaching-bundles__product-personalisation__image-wrapper"><img alt="" class="kaching-bundles__product-personalisation__image kaching-bundles__product-personalisation__image--default"/></div>'), Pb = $('<span class="kaching-bundles__product-personalisation__title"><!> <span class="kaching-bundles__product-personalisation__subtitle"> </span></span>'), Sb = $('<span class="kaching-bundles__product-personalisation__title"><!></span>'), Bb = $('<span class="kaching-bundles__product-personalisation__subtitle"><!></span>'), Cb = $("<!> <!>", 1), Ib = $('<span class="kaching-bundles__product-personalisation__unit-label"> </span>'), Mb = $('<span class="kaching-bundles__product-personalisation__price"><!> <!></span>'), zb = $('<span class="kaching-bundles__product-personalisation__compare-at-price"><!></span>'), $b = $('<div class="kaching-bundles"><!></div>'), Db = $('<div role="button" tabindex="0"><div class="kaching-bundles__product-personalisation__main"><!> <div class="kaching-bundles__product-personalisation__content"><!></div></div> <div class="kaching-bundles__product-personalisation__pricing"><!> <!></div></div> <!>', 1);
  function Ua(n, t) {
    Ke(t, !0);
    const r = () => Ie(v, "$config", o), a = () => Ie(x, "$formatPrice", o), l = () => Ie(b, "$translate", o), [o, c] = vt();
    let s = m(t, "productPersonalisation", 7), i = m(t, "product", 7), d = m(t, "selectedVariantIds", 7), g = m(t, "quantity", 7), f = m(t, "addPersonalisationModal", 7), h = m(t, "onPersonalisationsChange", 7), _ = m(t, "initialValues", 23, () => []);
    const v = _n(), b = Ct(), x = cn(), D = Fn();
    let S = ze(!1), I = ze(lt([]));
    Je(() => {
      s().id, _(), le(I, _().map((ce) => ce || ""), !0);
    });
    const W = u(() => {
      if (s().mediaImageGID) return Ie(D, "$getMediaImageUrl", o)(s().mediaImageGID);
    }), Q = u(() => !e(W) && s().imageSize > 0), E = u(() => Math.round(100 * parseFloat(s().pricePerItem || "0") * r().currencyRate)), K = u(() => Math.round(100 * parseFloat(s().compareAtPrice || "0") * r().currencyRate)), M = u(() => e(E)), te = u(() => e(K)), A = u(() => e(te) > 0 && e(te) > e(M)), L = u(() => ((ce) => bn({ "kaching-product-personalisation-image-height": ce.imageSize + "px" }))(s())), se = u(() => dn({ priceFormatter: a(), product: void 0, totalFullPrice: e(te) || e(M), totalDiscountedPrice: e(M), quantity: g(), unitQuantity: null })), Z = u(() => e(se)(l()(s().title))), H = u(() => s().subtitle ? e(se)(l()(s().subtitle)) : ""), z = u(() => d().map((ce, ae) => ({ variant: i().variants.find((de) => de.id === ce) || i().variants[0], index: ae }))), C = u(() => e(I).some((ce) => (ce || "").trim() !== "")), R = u(() => e(I).map((ce, ae) => ({ value: ce, index: ae })).filter(({ value: ce }) => (ce || "").trim() !== "")), N = u(() => g() === 1);
    function J(ce) {
      var ae;
      const de = ce.map((De) => De || "");
      if (le(I, de, !0), le(S, !1), !s().variantGID) return;
      const fe = Zt(s().variantGID);
      if (!fe) return;
      const $e = l()(s().valueLabel || "Value"), qe = de.map((De, ne) => ({ id: s().id, variantId: fe, text: De, valueLabel: $e, productIndex: ne })).filter((De) => De.text.trim() !== "");
      (ae = h()) == null || ae(qe);
    }
    var X = { get productPersonalisation() {
      return s();
    }, set productPersonalisation(ce) {
      s(ce), k();
    }, get product() {
      return i();
    }, set product(ce) {
      i(ce), k();
    }, get selectedVariantIds() {
      return d();
    }, set selectedVariantIds(ce) {
      d(ce), k();
    }, get quantity() {
      return g();
    }, set quantity(ce) {
      g(ce), k();
    }, get addPersonalisationModal() {
      return f();
    }, set addPersonalisationModal(ce) {
      f(ce), k();
    }, get onPersonalisationsChange() {
      return h();
    }, set onPersonalisationsChange(ce) {
      h(ce), k();
    }, get initialValues() {
      return _();
    }, set initialValues(ce = []) {
      _(ce), k();
    } }, B = Db(), F = pe(B);
    let V;
    F.__click = [mb, S], F.__keydown = [xb, S];
    var O = P(F), ee = P(O), ge = (ce) => {
      var ae = yb(), de = P(ae);
      y(ae), be(() => {
        Pe(de, "src", e(W)), Pe(de, "height", s().imageSize || 0);
      }), p(ce, ae);
    }, T = (ce) => {
      var ae = Be(), de = pe(ae), fe = ($e) => {
        var qe = wb(), De = P(qe);
        y(qe), be(() => {
          Pe(De, "src", "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M25.0476%206.95032C24.6473%206.55003%2024.1722%206.23251%2023.6492%206.01588C23.1262%205.79924%2022.5657%205.68774%2021.9996%205.68774C21.4335%205.68774%2020.873%205.79924%2020.35%206.01588C19.8271%206.23251%2019.3519%206.55003%2018.9516%206.95032L17.9932%207.90872L17.9788%207.89432L16.2828%209.59032L16.2972%209.60632L6.88921%2019.0143C6.06394%2019.8391%205.60007%2020.9579%205.59961%2022.1247V25.1999C5.59961%2025.5182%205.72604%2025.8234%205.95108%2026.0484C6.17612%2026.2735%206.48135%2026.3999%206.79961%2026.3999H9.87481C11.0416%2026.3995%2012.1604%2025.9356%2012.9852%2025.1103L25.0492%2013.0463C25.4495%2012.6461%2025.767%2012.1709%2025.9837%2011.6479C26.2003%2011.1249%2026.3118%2010.5644%2026.3118%209.99832C26.3118%209.43225%2026.2003%208.87172%2025.9837%208.34874C25.767%207.82576%2025.4495%207.35058%2025.0492%206.95032H25.0476ZM17.9932%2011.3023L8.58521%2020.7103C8.3995%2020.8961%208.25221%2021.1166%208.15173%2021.3593C8.05125%2021.602%207.99956%2021.8621%207.99961%2022.1247V23.9999H9.87481C10.4044%2023.9999%2010.9148%2023.7887%2011.2876%2023.4143L20.6956%2014.0063L17.9932%2011.3023ZM22.3932%2012.3087L23.3516%2011.3503C23.6865%2010.9871%2023.8678%2010.5084%2023.8578%2010.0144C23.8477%209.52049%2023.647%209.04957%2023.2977%208.70023C22.9484%208.35089%2022.4774%208.15019%2021.9835%208.14015C21.4896%208.1301%2021.0109%208.31147%2020.6476%208.64632L19.6908%209.60632L22.3932%2012.3087Z'%20fill='black'/%3e%3c/svg%3e"), Pe(De, "height", s().imageSize || 0);
        }), p($e, qe);
      };
      G(de, ($e) => {
        e(Q) && $e(fe);
      }, !0), p(ce, ae);
    };
    G(ee, (ce) => {
      e(W) ? ce(ge) : ce(T, !1);
    });
    var w = q(ee, 2), U = P(w), oe = (ce) => {
      var ae = Be();
      $t(pe(ae), 17, () => e(R), ({ value: de, index: fe }) => fe, (de, fe) => {
        var $e = Pb(), qe = P($e), De = (Ze) => {
          var ke = Wn();
          be(() => ft(ke, `#${e(fe).index + 1}`)), p(Ze, ke);
        };
        G(qe, (Ze) => {
          e(N) || Ze(De);
        });
        var ne = q(qe, 2), we = P(ne, !0);
        y(ne), y($e), be(() => ft(we, e(fe).value)), p(de, $e);
      }), p(ce, ae);
    }, j = (ce) => {
      var ae = Cb(), de = pe(ae), fe = (De) => {
        var ne = Sb();
        Ve(P(ne), () => e(Z)), y(ne), p(De, ne);
      };
      G(de, (De) => {
        e(Z) && De(fe);
      });
      var $e = q(de, 2), qe = (De) => {
        var ne = Bb();
        Ve(P(ne), () => e(H)), y(ne), p(De, ne);
      };
      G($e, (De) => {
        e(H) && De(qe);
      }), p(ce, ae);
    };
    G(U, (ce) => {
      e(C) ? ce(oe) : ce(j, !1);
    }), y(w), y(O);
    var re = q(O, 2), Y = P(re), ie = (ce) => {
      var ae = Mb(), de = P(ae);
      Ve(de, () => a()(e(M)));
      var fe = q(de, 2), $e = (qe) => {
        var De = Ib(), ne = P(De, !0);
        y(De), be(() => ft(ne, s().pricePerItemUnitLabel)), p(qe, De);
      };
      G(fe, (qe) => {
        s().pricePerItemUnitLabel && qe($e);
      }), y(ae), p(ce, ae);
    };
    G(Y, (ce) => {
      e(M) > 0 && ce(ie);
    });
    var _e = q(Y, 2), Se = (ce) => {
      var ae = zb();
      Ve(P(ae), () => a()(e(te))), y(ae), p(ce, ae);
    };
    G(_e, (ce) => {
      e(A) && ce(Se);
    }), y(re), y(F);
    var me = q(F, 2), ye = (ce) => {
      ol(ce, { target: "body", children: (ae, de) => {
        var fe = $b();
        fo(P(fe), { get product() {
          return i();
        }, get selectedVariants() {
          return e(z);
        }, get personalisationValues() {
          return e(I);
        }, get addPersonalisationModal() {
          return f();
        }, onConfirm: J, onClose: () => {
          le(S, !1);
        } }), y(fe), p(ae, fe);
      }, $$slots: { default: !0 } });
    };
    G(me, (ce) => {
      e(S) && ce(ye);
    }), be((ce) => {
      V = Lt(F, 1, "kaching-bundles__product-personalisation", null, V, ce), Pe(F, "data-product-personalisation-id", s().id), Vt(F, e(L));
    }, [() => ({ "kaching-bundles__product-personalisation--filled": e(C) })]), p(n, B);
    var he = Xe(X);
    return c(), he;
  }
  function Ab(n, t, r) {
    const a = Number(n.target.value), l = t().find((o) => o.id === a);
    r()(l);
  }
  On(["click", "keydown"]), Qe(Ua, { productPersonalisation: {}, product: {}, selectedVariantIds: {}, quantity: {}, addPersonalisationModal: {}, onPersonalisationsChange: {}, initialValues: {} }, [], [], !0);
  var Vb = (n) => n.stopPropagation(), Tb = $("<option> </option>"), qb = $('<select class="kaching-bundles__bar-variant-select kaching-bundles__selling-plan-select"></select>');
  function xa(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "sellingPlans", 7), o = m(t, "selectedSellingPlan", 7), c = m(t, "onChange", 7), s = Ct();
    var i, d = { get sellingPlans() {
      return l();
    }, set sellingPlans(h) {
      l(h), k();
    }, get selectedSellingPlan() {
      return o();
    }, set selectedSellingPlan(h) {
      o(h), k();
    }, get onChange() {
      return c();
    }, set onChange(h) {
      c(h), k();
    } }, g = qb();
    g.__change = [Ab, l, c], g.__click = [Vb], $t(g, 21, l, (h) => h.id, (h, _) => {
      var v = Tb(), b = P(v, !0);
      y(v);
      var x = {};
      be(() => {
        var D;
        ft(b, e(_).name), x !== (x = e(_).id) && (v.value = (D = v.__value = e(_).id) != null ? D : "");
      }), p(h, v);
    }), y(g), Qs(g), be((h) => {
      var _;
      Pe(g, "aria-label", h), i !== (i = o().id) && (g.value = (_ = g.__value = o().id) != null ? _ : "", Ji(g, o().id));
    }, [() => Ie(s, "$translate", r)("system.subscription_plan")]), p(n, g);
    var f = Xe(d);
    return a(), f;
  }
  On(["change", "click"]), Qe(xa, { sellingPlans: {}, selectedSellingPlan: {}, onChange: {} }, [], [], !0);
  var Gb = Tn('<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.334 1 5 8.333 1.667 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function ls(n) {
    p(n, Gb());
  }
  Qe(ls, {}, [], [], !0);
  var Ob = $('<img alt="" class="kaching-bundles__upsell__image"/>'), Fb = $('<div class="kaching-bundles__upsell__price"><!></div>'), Lb = $('<div class="kaching-bundles__upsell__full-price"><!></div>'), jb = $('<div class="kaching-bundles__upsell__price"><!></div>'), Eb = $('<div class="kaching-bundles__upsell__full-price"><!></div>'), Rb = $('<div class="kaching-bundles__upsell__pricing-row kaching-bundles__upsell__pricing-row--secondary"><!> <!></div>'), Nb = $('<div class="kaching-bundles__upsell__pricing-row kaching-bundles__upsell__pricing-row--main"><!> <!></div> <!>', 1), Qb = $('<div class="kaching-bundles__upsell__price"><!></div>'), Wb = $('<div class="kaching-bundles__upsell__full-price"><!></div>'), Ub = $('<div class="kaching-bundles__upsell__unit-price"><!> </div>'), Hb = $('<div class="kaching-bundles__upsell__pricing-row kaching-bundles__upsell__pricing-row--main"><!> <!></div> <div class="kaching-bundles__upsell__pricing-row kaching-bundles__upsell__pricing-row--secondary"><!></div>', 1), Zb = $('<div class="kaching-bundles__upsell__price"><!></div>'), Jb = $('<div class="kaching-bundles__upsell__full-price"><!></div>'), Yb = $("<!> <!>", 1), Kb = $('<div><!> <div class="kaching-bundles__upsell__main"><!> <!> <div class="kaching-bundles__upsell__content"><!> <!> <!></div></div> <div class="kaching-bundles__upsell__pricing"><!></div></div>');
  function lu(n, t) {
    Ke(t, !0);
    const r = () => Ie(S, "$config", o), a = () => Ie(x, "$formatPrice", o), l = () => Ie(b, "$translate", o), [o, c] = vt();
    let s = m(t, "dealBlock", 7), i = m(t, "dealBarId", 7), d = m(t, "upsell", 7), g = m(t, "product", 7), f = m(t, "dealBarSelected", 7, !1), h = m(t, "dealSellingPlan", 7), _ = m(t, "sets", 7), v = m(t, "onChange", 7);
    const b = Ct(), x = cn(), D = Fn(), S = _n();
    let I = ze(lt(d().preselected)), W = ze(void 0), Q = ze(void 0);
    const E = u(() => d().variantGIDs ? d().variantGIDs.map(Zt) : g().variants.map((ae) => ae.id)), K = u(() => ({ ...g(), variants: g().variants.filter((ae) => (r().preview || ae.availableForSale) && e(E).includes(ae.id)) })), M = u(() => (function(ae, de) {
      if (ae !== void 0) return ae;
      if (de != null && de.availableForSale && de.variants.length > 0) return de.variants[0].id;
    })(e(W), e(K))), te = u(() => e(K).variants.find((ae) => ae.id === e(M))), A = u(() => Ie(D, "$getMediaImageUrl", o)(d().mediaImageGID)), L = u(() => ((ae, de) => {
      const { fonts: fe, colors: $e, cornerRadius: qe } = ae;
      return bn({ "kaching-upsell-background-color": $e.upsellBackground && Le($e.upsellBackground), "kaching-upsell-text-color": $e.upsellText && Le($e.upsellText), "kaching-upsell-selected-background-color": $e.upsellSelectedBackground && Le($e.upsellSelectedBackground), "kaching-upsell-selected-text-color": $e.upsellSelectedText && Le($e.upsellSelectedText), "kaching-upsell-font-size": fe.upsell && fe.upsell.size + "px", "kaching-upsell-font-weight": fe.upsell && or(fe.upsell.style), "kaching-upsell-font-style": fe.upsell && cr(fe.upsell.style), "kaching-upsell-image-border-radius": (qe || 0) / 2 + "px", "kaching-upsell-image-height": de.imageSize + "px" });
    })(s(), d())), se = u(() => g().url ? `${g().url}?variant=${e(M)}` : void 0), Z = u(() => s().priceRounding ? { perItem: s().showPricesPerItem, precision: s().priceRoundingPrecision, v2: r().featureFlags.price_rounding_v2 || !1 } : void 0), H = u(() => d().quantity * _()), z = u(() => (function(ae) {
      if (!ae) return 0;
      let de = ae.price;
      return s().useProductCompareAtPrice && ae.compareAtPrice && (de = Math.max(de, ae.compareAtPrice)), de * e(H);
    })(e(te))), C = u(() => Math.ceil(e(z) / e(H))), R = u(() => {
      var ae;
      return (ae = d().subscriptionEnabled) == null || ae;
    }), N = u(() => {
      var ae;
      return (ae = d().subscriptionType) != null ? ae : "deal";
    }), J = u(() => {
      if (!e(R) || e(N) !== "always" || !e(te)) return [];
      const ae = new Set(e(te).sellingPlans.map((de) => de.id));
      return g().sellingPlans.filter((de) => ae.has(de.id));
    }), X = u(() => e(J).find((ae) => ae.id === e(Q)) || e(J)[0]);
    Je(() => {
      var ae;
      e(J).some((de) => {
        var fe;
        return de.id === ((fe = h()) == null ? void 0 : fe.id);
      }) && le(Q, (ae = h()) == null ? void 0 : ae.id, !0);
    });
    const B = u(() => {
      if (e(te) && e(R))
        return e(N) === "deal" ? h() ? er(g(), e(te), h()) : void 0 : e(X);
    }), F = u(() => ra({ discountType: d().discountType, discountValue: d().discountValue, discountQuantity: d().quantity, variantQuantities: e(te) ? [{ variant: e(te), quantity: e(H) }] : [], currencyRate: r().currencyRate, priceRounding: e(Z), sellingPlan: e(B) })), V = u(() => Math.ceil(e(F) / e(H))), O = u(() => e(z) > e(F)), ee = u(() => e(te) && ro(e(te))), ge = u(() => e(te) ? kr([{ variant: e(te), quantity: e(H) }]) : null), T = u(() => e(ge) ? e(F) / e(ge) : null), w = u(() => dn({ priceFormatter: a(), product: g(), totalFullPrice: e(z), totalDiscountedPrice: e(F), quantity: e(H), unitQuantity: e(ge), sellingPlan: e(B) })), U = u(() => e(w)(l()(d().text))), oe = u(() => ((ae, de, fe) => ae.blockLayout !== "vertical" ? [] : is(ae).filter(($e) => $e.attachedTo.type === "barUpsell" && $e.attachedTo.dealBarId === de && $e.attachedTo.upsellId === fe))(s(), i(), d().id).map((ae) => ka(ae, l(), e(w)))), j = u(() => ma(e(oe))), re = u(() => e(j).positions.size > 0);
    function Y(ae) {
      le(W, ae, !0);
    }
    function ie() {
      f() && le(I, !e(I));
    }
    pr(() => {
      d().productGID, le(W, void 0);
    }), Je(() => {
      if (e(te) && g().availableForSale && e(H)) {
        const ae = e(I), de = e(B);
        nn(() => {
          v()({ variant: ae ? e(te) : null, product: ae ? g() : null, discountedPrice: ae ? e(F) : 0, fullPrice: ae ? e(z) : 0, sellingPlan: ae ? de : void 0 });
        });
      }
    });
    const _e = u(() => !g().availableForSale || g().variants.filter((ae) => ae.availableForSale && e(E).includes(ae.id)).length === 0);
    var Se = { get dealBlock() {
      return s();
    }, set dealBlock(ae) {
      s(ae), k();
    }, get dealBarId() {
      return i();
    }, set dealBarId(ae) {
      i(ae), k();
    }, get upsell() {
      return d();
    }, set upsell(ae) {
      d(ae), k();
    }, get product() {
      return g();
    }, set product(ae) {
      g(ae), k();
    }, get dealBarSelected() {
      return f();
    }, set dealBarSelected(ae = !1) {
      f(ae), k();
    }, get dealSellingPlan() {
      return h();
    }, set dealSellingPlan(ae) {
      h(ae), k();
    }, get sets() {
      return _();
    }, set sets(ae) {
      _(ae), k();
    }, get onChange() {
      return v();
    }, set onChange(ae) {
      v(ae), k();
    } }, me = Be(), ye = pe(me), he = (ae) => {
      var de = Kb();
      let fe, $e;
      var qe = P(de);
      $t(qe, 17, () => e(oe), (gt) => gt.id, (gt, Ce) => {
        aa(gt, { get badge() {
          return e(Ce);
        }, get blockLayout() {
          return s().blockLayout;
        } });
      });
      var De = q(qe, 2), ne = P(De), we = (gt) => {
        {
          let Ce = u(() => ["kaching-bundles__upsell__checkbox", e(I) && "kaching-bundles__upsell__checkbox--selected"]);
          Ht(gt, { element: "span", get class() {
            return e(Ce);
          }, onclick: ie, children: (bt, Ye) => {
            var ve = Be(), We = pe(ve), Ee = (et) => {
              ls(et);
            };
            G(We, (et) => {
              e(I) && et(Ee);
            }), p(bt, ve);
          }, $$slots: { default: !0 } });
        }
      };
      G(ne, (gt) => {
        f() && gt(we);
      });
      var Ze = q(ne, 2), ke = (gt) => {
        {
          let Ce = u(() => f() ? e(se) : void 0);
          Xn(gt, { get url() {
            return e(Ce);
          }, class: "kaching-bundles__upsell__link", children: (bt, Ye) => {
            var ve = Ob();
            be(() => {
              var We;
              Pe(ve, "src", e(A) || ((We = e(te)) == null ? void 0 : We.image) || g().image), Pe(ve, "height", d().imageSize);
            }), p(bt, ve);
          }, $$slots: { default: !0 } });
        }
      };
      G(Ze, (gt) => {
        d().imageSize > 0 && gt(ke);
      });
      var Me = q(Ze, 2), Ge = P(Me), Ae = (gt) => {
        Ht(gt, { element: "span", class: "kaching-bundles__upsell__text", onclick: ie, children: (Ce, bt) => {
          var Ye = Be();
          Ve(pe(Ye), () => e(U)), p(Ce, Ye);
        }, $$slots: { default: !0 } });
      };
      G(Ge, (gt) => {
        e(U) && gt(Ae);
      });
      var je = q(Ge, 2), Tt = (gt) => {
        Un(gt, { get product() {
          return e(K);
        }, get selectedVariantId() {
          return e(M);
        }, onChange: Y });
      };
      G(je, (gt) => {
        f() && e(K) && e(K).variants.length > 1 && e(M) && gt(Tt);
      });
      var it = q(je, 2), at = (gt) => {
        xa(gt, { get sellingPlans() {
          return e(J);
        }, get selectedSellingPlan() {
          return e(X);
        }, onChange: (Ce) => le(Q, Ce.id, !0) });
      };
      G(it, (gt) => {
        f() && e(I) && e(J).length > 1 && e(X) && gt(at);
      }), y(Me), y(De);
      var st = q(De, 2), yt = P(st), rn = (gt) => {
        var Ce = Nb(), bt = pe(Ce), Ye = P(bt);
        rt(Ye, () => e(V), (Te) => {
          var Ne = Fb();
          Ve(P(Ne), () => a()(e(V))), y(Ne), p(Te, Ne);
        });
        var ve = q(Ye, 2), We = (Te) => {
          var Ne = Be();
          rt(pe(Ne), () => e(C), (ot) => {
            var _t = Lb();
            Ve(P(_t), () => a()(e(C))), y(_t), p(ot, _t);
          }), p(Te, Ne);
        };
        G(ve, (Te) => {
          e(O) && Te(We);
        }), y(bt);
        var Ee = q(bt, 2), et = (Te) => {
          var Ne = Rb(), ot = P(Ne);
          rt(ot, () => e(F), (tt) => {
            var xt = jb();
            Ve(P(xt), () => a()(e(F))), y(xt), p(tt, xt);
          });
          var _t = q(ot, 2), St = (tt) => {
            var xt = Be();
            rt(pe(xt), () => e(z), (It) => {
              var Et = Eb();
              Ve(P(Et), () => a()(e(z))), y(Et), p(It, Et);
            }), p(tt, xt);
          };
          G(_t, (tt) => {
            e(O) && tt(St);
          }), y(Ne), p(Te, Ne);
        };
        G(Ee, (Te) => {
          e(H) > 1 && Te(et);
        }), p(gt, Ce);
      }, jt = (gt) => {
        var Ce = Be(), bt = pe(Ce), Ye = (We) => {
          var Ee = Hb(), et = pe(Ee), Te = P(et);
          rt(Te, () => e(F), (St) => {
            var tt = Qb();
            Ve(P(tt), () => a()(s().showPricesPerItem ? e(V) : e(F))), y(tt), p(St, tt);
          });
          var Ne = q(Te, 2), ot = (St) => {
            var tt = Be();
            rt(pe(tt), () => e(z), (xt) => {
              var It = Wb();
              Ve(P(It), () => a()(s().showPricesPerItem ? e(C) : e(z))), y(It), p(xt, It);
            }), p(St, tt);
          };
          G(Ne, (St) => {
            e(O) && St(ot);
          }), y(et);
          var _t = q(et, 2);
          rt(P(_t), () => e(T), (St) => {
            var tt = Ub(), xt = P(tt);
            Ve(xt, () => a()(e(T), { preserveDecimals: !0 }));
            var It = q(xt);
            y(tt), be(() => {
              var Et;
              return ft(It, ` / ${(Et = e(ee)) != null ? Et : ""}`);
            }), p(St, tt);
          }), y(_t), p(We, Ee);
        }, ve = (We) => {
          var Ee = Yb(), et = pe(Ee);
          rt(et, () => e(F), (ot) => {
            var _t = Zb();
            Ve(P(_t), () => a()(s().showPricesPerItem ? e(V) : e(F))), y(_t), p(ot, _t);
          });
          var Te = q(et, 2), Ne = (ot) => {
            var _t = Be();
            rt(pe(_t), () => e(z), (St) => {
              var tt = Jb();
              Ve(P(tt), () => a()(s().showPricesPerItem ? e(C) : e(z))), y(tt), p(St, tt);
            }), p(ot, _t);
          };
          G(Te, (ot) => {
            e(O) && ot(Ne);
          }), p(We, Ee);
        };
        G(bt, (We) => {
          e(T) && e(ee) && !r().ignoreUnitPrice ? We(Ye) : We(ve, !1);
        }, !0), p(gt, Ce);
      };
      G(yt, (gt) => {
        s().showBothPrices ? gt(rn) : gt(jt, !1);
      }), y(st), y(de), be((gt, Ce) => {
        fe = Lt(de, 1, "kaching-bundles__upsell", null, fe, gt), Pe(de, "data-upsell-id", d().id), $e = Vt(de, e(L), $e, Ce);
      }, [() => ({ "kaching-bundles__upsell--out-of-stock": r().preview && e(_e), "kaching-bundles__upsell--badge-border-all": e(j).positions.has("all"), "kaching-bundles__upsell--badge-border-top": e(j).positions.has("top"), "kaching-bundles__upsell--badge-border-bottom": e(j).positions.has("bottom"), "kaching-bundles__upsell--badge-border-left": e(j).positions.has("left"), "kaching-bundles__upsell--badge-border-right": e(j).positions.has("right") }), () => ({ "--badge-border-thickness": e(re) ? `${e(j).thickness}px` : void 0, "--badge-border-gap": e(re) ? `${e(j).gap}px` : void 0, "--badge-border-gap-border": e(j).gap ? "1px solid var(--bar-border-color, rgba(0, 0, 0, 0.3))" : "none", "--badge-border-min-length": e(j).sideLength ? `${e(j).sideLength}px` : void 0 })]), p(ae, de);
    };
    G(ye, (ae) => {
      !(e(te) || r().preview && e(_e)) || d().visibleOnlyWhenDealBarSelected && !f() || ae(he);
    }), p(n, me);
    var ce = Xe(Se);
    return c(), ce;
  }
  Qe(lu, { dealBlock: {}, dealBarId: {}, upsell: {}, product: {}, dealBarSelected: {}, dealSellingPlan: {}, sets: {}, onChange: {} }, [], [], !0);
  var Xb = $('<div class="kaching-bundles__free-gift__divider"></div>'), ef = $("<!> <!>", 1);
  function wi(n, t) {
    Ke(t, !0);
    const r = () => Ie(v, "$config", a), [a, l] = vt();
    let o = m(t, "dealBlock", 7), c = m(t, "dealBarId", 7), s = m(t, "upsells", 7), i = m(t, "otherProducts", 7), d = m(t, "complementaryProducts", 7), g = m(t, "dealBarSelected", 7), f = m(t, "dealSellingPlan", 7), h = m(t, "sets", 7, 1), _ = m(t, "onChange", 7);
    const v = _n();
    let b = ze(lt({}));
    const x = u(() => r().preview ? i() : i().map(_r)), D = u(() => r().preview ? d() : d().map(_r)), S = Math.floor(1e3 * Math.random()), I = u(() => s().flatMap((K, M) => {
      if (K.productSource === "complementary") {
        const A = e(D)[(M + S) % (e(D).length || 1)];
        return A && (r().preview || A.availableForSale) ? { upsell: K, product: A } : [];
      }
      if (!K.productGID) return [];
      const te = e(x).find((A) => A.id === Zt(K.productGID));
      if (!te) return [];
      if (!r().preview) {
        if (!te.availableForSale) return [];
        const A = K.variantGIDs ? K.variantGIDs.map(Zt) : te.variants.map((L) => L.id);
        if (!te.variants.some((L) => L.availableForSale && A.includes(L.id))) return [];
      }
      return { upsell: K, product: te };
    }));
    var W = { get dealBlock() {
      return o();
    }, set dealBlock(K) {
      o(K), k();
    }, get dealBarId() {
      return c();
    }, set dealBarId(K) {
      c(K), k();
    }, get upsells() {
      return s();
    }, set upsells(K) {
      s(K), k();
    }, get otherProducts() {
      return i();
    }, set otherProducts(K) {
      i(K), k();
    }, get complementaryProducts() {
      return d();
    }, set complementaryProducts(K) {
      d(K), k();
    }, get dealBarSelected() {
      return g();
    }, set dealBarSelected(K) {
      g(K), k();
    }, get dealSellingPlan() {
      return f();
    }, set dealSellingPlan(K) {
      f(K), k();
    }, get sets() {
      return h();
    }, set sets(K = 1) {
      h(K), k();
    }, get onChange() {
      return _();
    }, set onChange(K) {
      _(K), k();
    } }, Q = Be();
    $t(pe(Q), 19, () => e(I), ({ upsell: K, product: M }) => K.id, (K, M, te) => {
      let A = () => e(M).upsell;
      var L = ef(), se = pe(L);
      lu(se, { get dealBarId() {
        return c();
      }, get dealBlock() {
        return o();
      }, get upsell() {
        return A();
      }, get product() {
        return e(M).product;
      }, get dealBarSelected() {
        return g();
      }, get dealSellingPlan() {
        return f();
      }, get sets() {
        return h();
      }, onChange: (z) => (function(C, R) {
        const { variant: N, product: J, discountedPrice: X, fullPrice: B, sellingPlan: F } = R;
        N && J ? e(b)[C] = { variant: N, product: J, discountedPrice: X, fullPrice: B, sellingPlan: F } : delete e(b)[C];
        const V = s().filter((O) => O.id in e(b)).map((O) => ({ id: O.id, variant: e(b)[O.id].variant, product: e(b)[O.id].product, quantity: O.quantity * h(), discountedPrice: e(b)[O.id].discountedPrice, fullPrice: e(b)[O.id].fullPrice, sellingPlan: e(b)[O.id].sellingPlan }));
        _()(V);
      })(A().id, z) });
      var Z = q(se, 2), H = (z) => {
        p(z, Xb());
      };
      G(Z, (z) => {
        e(te) < e(I).length - 1 && z(H);
      }), p(K, L);
    }), p(n, Q);
    var E = Xe(W);
    return l(), E;
  }
  Qe(wi, { dealBlock: {}, dealBarId: {}, upsells: {}, otherProducts: {}, complementaryProducts: {}, dealBarSelected: {}, dealSellingPlan: {}, sets: {}, onChange: {} }, [], [], !0);
  var tf = $('<span class="kaching-bundles__bar-price__unit-label"><!></span>'), nf = $('<div class="kaching-bundles__bar-price"><!> <!></div>');
  function Lr(n, t) {
    Ke(t, !0);
    const r = () => Ie(i, "$translate", a), [a, l] = vt(), o = m(t, "amount", 7), c = m(t, "showPricesPerItem", 7), s = m(t, "unitLabel", 7, ""), i = Ct(), d = cn();
    var g = { get amount() {
      return o();
    }, set amount(x) {
      o(x), k();
    }, get showPricesPerItem() {
      return c();
    }, set showPricesPerItem(x) {
      c(x), k();
    }, get unitLabel() {
      return s();
    }, set unitLabel(x = "") {
      s(x), k();
    } }, f = nf(), h = P(f);
    Ve(h, () => Ie(d, "$formatPrice", a)(o()));
    var _ = q(h, 2), v = (x) => {
      var D = tf();
      Ve(P(D), () => r()(s())), y(D), p(x, D);
    };
    G(_, (x) => {
      c() && s() && x(v);
    }), y(f), be((x) => Pe(f, "data-a11y-label", x), [() => r()("system.price")]), p(n, f);
    var b = Xe(g);
    return l(), b;
  }
  Qe(Lr, { amount: {}, showPricesPerItem: {}, unitLabel: {} }, [], [], !0);
  const su = "variantBadges";
  function ou(n = []) {
    const t = ta(cu(n));
    return ai(su, t), { setVariantBadges: (r) => {
      t.set(cu(r));
    } };
  }
  function cu(n) {
    const t = new Map(n.map((r) => [r.variantId, r.badgeHtml]));
    return (r) => r === void 0 ? void 0 : t.get(r);
  }
  var rf = $('<div class="kaching-bundles__low-stock-alert"><!></div>');
  function du(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "lowStockAlert", 7), o = m(t, "inventoryQuantity", 7), c = Ct(), s = u(() => {
      return v = Ie(c, "$translate", r)(l().message), b = { stock: o() ? o().toString() : null }, v.replace(/\{\{\s*(\w+)\s*\}\}/g, (x, D) => {
        var S;
        return (S = b[D]) != null ? S : "";
      });
      var v, b;
    }), i = u(() => ((v) => {
      const { textColor: b } = v;
      return bn({ "kaching-bundles-low-stock-alert-text-color": Le(b) });
    })(l()));
    var d = { get lowStockAlert() {
      return l();
    }, set lowStockAlert(v) {
      l(v), k();
    }, get inventoryQuantity() {
      return o();
    }, set inventoryQuantity(v) {
      o(v), k();
    } }, g = Be(), f = pe(g), h = (v) => {
      var b = rf();
      Ve(P(b), () => e(s)), y(b), be(() => Vt(b, e(i))), p(v, b);
    };
    G(f, (v) => {
      o() && o() > 0 && o() < l().threshold && v(h);
    }), p(n, g);
    var _ = Xe(d);
    return a(), _;
  }
  Qe(du, { lowStockAlert: {}, inventoryQuantity: {} }, [], [], !0);
  var af = $("<div><!></div>");
  function ia(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "dealBlock", 7), o = m(t, "variant", 7), c = (function() {
      const v = ri(su);
      if (!v) throw new Error("getVariantBadges must be called within a component tree that has setupVariantBadges initialized");
      return v;
    })(), s = u(() => {
      var v;
      return Ie(c, "$variantBadgeLookup", r)((v = o()) == null ? void 0 : v.id);
    });
    var i = { get dealBlock() {
      return l();
    }, set dealBlock(v) {
      l(v), k();
    }, get variant() {
      return o();
    }, set variant(v) {
      o(v), k();
    } }, d = Be(), g = pe(d), f = (v) => {
      var b = af();
      Ve(P(b), () => e(s)), y(b), p(v, b);
    }, h = (v) => {
      var b = Be(), x = pe(b), D = (S) => {
        {
          let I = u(() => {
            var W, Q;
            return (Q = (W = o()) == null ? void 0 : W.inventoryQuantity) != null ? Q : null;
          });
          du(S, { get lowStockAlert() {
            return l().lowStockAlert;
          }, get inventoryQuantity() {
            return e(I);
          } });
        }
      };
      G(x, (S) => {
        l().lowStockAlertEnabled && l().lowStockAlert && S(D);
      }, !0), p(v, b);
    };
    G(g, (v) => {
      e(s) ? v(f) : v(h, !1);
    }), p(n, d);
    var _ = Xe(i);
    return a(), _;
  }
  Qe(ia, { dealBlock: {}, variant: {} }, [], [], !0);
  var lf = $('<div class="kaching-bundles__bar-sold-out-badge"><!></div>');
  function Pi(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "showAsSoldOut", 7), o = m(t, "replaceLiquid", 7), c = Ct(), s = u(() => o()(Ie(c, "$translate", r)(l().label)));
    var i = { get showAsSoldOut() {
      return l();
    }, set showAsSoldOut(f) {
      l(f), k();
    }, get replaceLiquid() {
      return o();
    }, set replaceLiquid(f) {
      o(f), k();
    } }, d = lf();
    Ve(P(d), () => e(s)), y(d), p(n, d);
    var g = Xe(i);
    return a(), g;
  }
  Qe(Pi, { showAsSoldOut: {}, replaceLiquid: {} }, [], [], !0);
  const cl = (n) => {
    const { opacity: t, backgroundColor: r, textColor: a, textSize: l } = n;
    return bn({ "kaching-bundles-show-as-sold-out-opacity": t.toString(), "kaching-bundles-show-as-sold-out-background-color": Le(r), "kaching-bundles-show-as-sold-out-text-color": Le(a), "kaching-bundles-show-as-sold-out-text-size": l + "px" });
  };
  var sf = $('<img alt="Decrease"/>'), of = $('<img alt="Increase"/>'), cf = $('<div class="kaching-bundles__quantity-selector"><!> <input type="number" class="kaching-bundles__quantity-selector__input" step="1"/> <!></div>');
  function dl(n, t) {
    Ke(t, !0);
    const [r, a] = vt();
    let l = m(t, "value", 7), o = m(t, "onChange", 7), c = m(t, "min", 7, 1);
    const s = Ct(), i = u(() => l() <= c());
    var d = { get value() {
      return l();
    }, set value(v) {
      l(v), k();
    }, get onChange() {
      return o();
    }, set onChange(v) {
      o(v), k();
    }, get min() {
      return c();
    }, set min(v = 1) {
      c(v), k();
    } }, g = cf(), f = P(g);
    {
      let v = u(() => ["kaching-bundles__quantity-selector__button", e(i) && "kaching-bundles__quantity-selector__button--disabled"]);
      Ht(f, { element: "div", get class() {
        return e(v);
      }, onclick: function(b) {
        b.stopPropagation(), o()(Math.max(l() - 1, c()));
      }, get disabled() {
        return e(i);
      }, children: (b, x) => {
        var D = sf();
        be(() => Pe(D, "src", Ld)), p(b, D);
      }, $$slots: { default: !0 } });
    }
    var h = q(f, 2);
    ea(h), Ht(q(h, 2), { element: "div", class: "kaching-bundles__quantity-selector__button", onclick: function(v) {
      v.stopPropagation(), o()(l() + 1);
    }, children: (v, b) => {
      var x = of();
      be(() => Pe(x, "src", jd)), p(v, x);
    }, $$slots: { default: !0 } }), y(g), be((v) => {
      Pe(h, "aria-label", v), La(h, l()), Pe(h, "min", c());
    }, [() => Ie(s, "$translate", r)("system.quantity")]), Fc("blur", h, function(v) {
      const b = v.target, x = parseInt(b.value);
      o()(isNaN(x) ? c() : Math.max(x, c()));
    }), p(n, g);
    var _ = Xe(d);
    return a(), _;
  }
  function df(n, t) {
    n.target === n.currentTarget && t()();
  }
  Qe(dl, { value: {}, onChange: {}, min: {} }, [], [], !0);
  var uf = $('<div class="kaching-bundles"><div class="kaching-bundles__choose-multiple-gifts-modal" role="none"><div class="kaching-bundles__choose-multiple-gifts-modal__content"><!></div></div></div>');
  function uu(n, t) {
    Ke(t, !0);
    const r = m(t, "dealBlock", 7), a = m(t, "multipleGiftsSelector", 7), l = m(t, "products", 23, () => []), o = m(t, "initialSelectedGifts", 7), c = m(t, "isOpen", 7), s = m(t, "onConfirm", 7), i = m(t, "onClose", 7);
    var d = { get dealBlock() {
      return r();
    }, set dealBlock(_) {
      r(_), k();
    }, get multipleGiftsSelector() {
      return a();
    }, set multipleGiftsSelector(_) {
      a(_), k();
    }, get products() {
      return l();
    }, set products(_ = []) {
      l(_), k();
    }, get initialSelectedGifts() {
      return o();
    }, set initialSelectedGifts(_) {
      o(_), k();
    }, get isOpen() {
      return c();
    }, set isOpen(_) {
      c(_), k();
    }, get onConfirm() {
      return s();
    }, set onConfirm(_) {
      s(_), k();
    }, get onClose() {
      return i();
    }, set onClose(_) {
      i(_), k();
    } }, g = Be(), f = pe(g), h = (_) => {
      ol(_, { target: "body", children: (v, b) => {
        var x = uf(), D = P(x);
        D.__click = [df, i];
        var S = P(D);
        ao(P(S), { get dealBlock() {
          return r();
        }, get multipleGiftsSelector() {
          return a();
        }, get products() {
          return l();
        }, get initialSelectedGifts() {
          return o();
        }, get onConfirm() {
          return s();
        }, get onClose() {
          return i();
        } }), y(S), y(D), y(x), be((I) => Vt(D, I), [() => (function(I) {
          var W;
          return bn({ "kaching-choose-multiple-gifts-overlay-color": Le(((W = I.chooseMultipleGiftsModal) == null ? void 0 : W.overlayColor) || dp) });
        })(r())]), p(v, x);
      }, $$slots: { default: !0 } });
    };
    return G(f, (_) => {
      c() && _(h);
    }), p(n, g), Xe(d);
  }
  On(["click"]), Qe(uu, { dealBlock: {}, multipleGiftsSelector: {}, products: {}, initialSelectedGifts: {}, isOpen: {}, onConfirm: {}, onClose: {} }, [], [], !0);
  var gf = Tn('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00065 5.33337V10.6667M5.33398 8.00004H10.6673M14.6673 8.00004C14.6673 11.6819 11.6825 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8.00004C1.33398 4.31814 4.31875 1.33337 8.00065 1.33337C11.6825 1.33337 14.6673 4.31814 14.6673 8.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function gu(n) {
    p(n, gf());
  }
  Qe(gu, {}, [], [], !0);
  var hf = $('<img alt="" class="kaching-bundles__multiple-gifts-selector__photo"/>'), pf = $('<span class="kaching-bundles__multiple-gifts-selector__photo-count"> </span>'), bf = $('<div class="kaching-bundles__multiple-gifts-selector__photos"><!> <!></div>'), ff = $('<img alt="" class="kaching-bundles__free-gift__image"/>'), vf = $('<div class="kaching-bundles__free-gift__image"></div>'), _f = $('<span class="kaching-bundles__free-gift__text"><!></span>'), kf = $('<span class="kaching-bundles__free-gift__add-button"><!></span>'), mf = $('<div class="kaching-bundles__free-gift__full-price"><!></div>'), xf = $('<div class="kaching-bundles__multiple-gifts-selector kaching-bundles__free-gift"><!> <div class="kaching-bundles__free-gift__main"><!> <span class="kaching-bundles__free-gift__content"><!> <!></span></div> <!> <!></div>');
  function hu(n, t) {
    Ke(t, !0);
    const r = () => Ie(_, "$formatPrice", l), a = () => Ie(v, "$translate", l), [l, o] = vt();
    let c = m(t, "dealBlock", 7), s = m(t, "multipleGiftsSelector", 7), i = m(t, "selectedVariants", 7), d = m(t, "otherProducts", 7), g = m(t, "onConfirm", 7), f = ze(!1);
    const h = u(() => (s().products || []).flatMap((w) => {
      const U = Zt(w.id), oe = d().find((re) => re.id === U);
      if (!oe || !oe.availableForSale) return [];
      const j = _r(oe);
      if (w.variantGIDs && w.variantGIDs.length > 0) {
        const re = w.variantGIDs.map(Zt);
        return { ...j, variants: j.variants.filter((Y) => re.includes(Y.id)) };
      }
      return j;
    })), _ = cn(), v = Ct(), b = Fn(), x = u(() => ho({ dealBlock: c(), imageSize: s().imageSize })), D = u(() => {
      if (s().mediaImageGID) return Ie(b, "$getMediaImageUrl", l)(s().mediaImageGID);
    }), S = u(() => s().showProductPhotos === !0), I = u(() => i().flatMap((w) => Array.from({ length: w.quantity }, () => w.variant.image || w.product.image)).filter((w) => !!w)), W = u(() => e(I).slice(0, 3)), Q = u(() => e(I).length - e(W).length), E = u(() => i().reduce((w, U) => w + U.quantity, 0)), K = u(() => e(E) >= s().maxQuantity), M = u(() => (function(w, U) {
      if (!U.length) return 0;
      let oe = U.reduce((j, re) => j + re.fullPrice * re.quantity, 0);
      return U.some((j) => j.variant.compareAtPrice) && w.useProductCompareAtPrice && (oe = Math.max(oe, U.reduce((j, re) => j + (re.variant.compareAtPrice || 0), 0))), oe;
    })(c(), i())), te = u(() => new Map((s().products || []).flatMap((w) => {
      const U = d().find((oe) => oe.id === Zt(w.id));
      return U ? [[U.id, U]] : [];
    }))), A = u(() => i().flatMap((w) => Array.from({ length: w.quantity }, () => w.product.title))), L = u(() => dn({ priceFormatter: r(), product: void 0, products: e(te), selectedProductTitles: e(A), totalFullPrice: e(M), totalDiscountedPrice: 0, quantity: e(E), unitQuantity: null })), se = u(() => e(K) ? e(L)(a()(s().textAfterSelection)) : e(L)(a()(s().textBeforeSelection)));
    var Z = { get dealBlock() {
      return c();
    }, set dealBlock(w) {
      c(w), k();
    }, get multipleGiftsSelector() {
      return s();
    }, set multipleGiftsSelector(w) {
      s(w), k();
    }, get selectedVariants() {
      return i();
    }, set selectedVariants(w) {
      i(w), k();
    }, get otherProducts() {
      return d();
    }, set otherProducts(w) {
      d(w), k();
    }, get onConfirm() {
      return g();
    }, set onConfirm(w) {
      g(w), k();
    } }, H = xf(), z = P(H);
    {
      let w = u(() => {
        var U;
        return (U = e(se)) == null ? void 0 : U.replace(/<[^>]*>/g, "");
      });
      Ht(z, { element: "span", class: "kaching-bundles__multiple-gifts-selector__clickable-overlay", get "aria-label"() {
        return e(w);
      }, onclick: () => le(f, !0) });
    }
    var C = q(z, 2), R = P(C), N = (w) => {
      var U = bf(), oe = P(U);
      $t(oe, 17, () => e(W), Mr, (Y, ie) => {
        var _e = hf();
        be(() => Pe(_e, "src", e(ie))), p(Y, _e);
      });
      var j = q(oe, 2), re = (Y) => {
        var ie = pf(), _e = P(ie);
        y(ie), be(() => {
          var Se;
          return ft(_e, `+${(Se = e(Q)) != null ? Se : ""}`);
        }), p(Y, ie);
      };
      G(j, (Y) => {
        e(Q) > 0 && Y(re);
      }), y(U), p(w, U);
    }, J = (w) => {
      var U = Be(), oe = pe(U), j = (Y) => {
        var ie = ff();
        be(() => {
          Pe(ie, "src", e(D)), Pe(ie, "height", s().imageSize || 0);
        }), p(Y, ie);
      }, re = (Y) => {
        var ie = Be(), _e = pe(ie), Se = (me) => {
          var ye = vf();
          let he;
          be((ce) => he = Vt(ye, "", he, ce), [() => {
            var ce;
            return { height: `${(ce = s().imageSize) != null ? ce : ""}px` };
          }]), p(me, ye);
        };
        G(_e, (me) => {
          s().imageSize && me(Se);
        }, !0), p(Y, ie);
      };
      G(oe, (Y) => {
        e(D) ? Y(j) : Y(re, !1);
      }, !0), p(w, U);
    };
    G(R, (w) => {
      e(S) && e(W).length > 0 ? w(N) : w(J, !1);
    });
    var X = q(R, 2), B = P(X), F = (w) => {
      var U = Be();
      rt(pe(U), () => e(se), (oe) => {
        var j = _f();
        Ve(P(j), () => e(se)), y(j), p(oe, j);
      }), p(w, U);
    };
    G(B, (w) => {
      e(se) && w(F);
    });
    var V = q(B, 2), O = (w) => {
      var U = kf();
      gu(P(U)), y(U), p(w, U);
    };
    G(V, (w) => {
      e(K) || w(O);
    }), y(X), y(C);
    var ee = q(C, 2), ge = (w) => {
      var U = Be();
      rt(pe(U), () => e(M), (oe) => {
        var j = mf();
        Ve(P(j), () => r()(e(M))), y(j), p(oe, j);
      }), p(w, U);
    };
    G(ee, (w) => {
      s().showPrice && e(M) > 0 && w(ge);
    }), uu(q(ee, 2), { get dealBlock() {
      return c();
    }, get multipleGiftsSelector() {
      return s();
    }, get isOpen() {
      return e(f);
    }, get products() {
      return e(h);
    }, get initialSelectedGifts() {
      return i();
    }, get onConfirm() {
      return g();
    }, onClose: () => le(f, !1) }), y(H), be(() => {
      Pe(H, "data-multiple-gifts-selector-id", s().id), Vt(H, e(x));
    }), p(n, H);
    var T = Xe(Z);
    return o(), T;
  }
  Qe(hu, { dealBlock: {}, multipleGiftsSelector: {}, selectedVariants: {}, otherProducts: {}, onConfirm: {} }, [], [], !0);
  var yf = $('<div class="kaching-bundles__free-gift__divider"></div>'), wf = $("<!> <!>", 1);
  function Si(n, t) {
    Ke(t, !0);
    let r = m(t, "dealBlock", 7), a = m(t, "multipleGiftsSelectors", 7), l = m(t, "sellingPlan", 7), o = m(t, "otherProducts", 7), c = m(t, "onChange", 7), s = ze(lt({})), i = u(() => a().filter((h) => !h.applyOnlyForSubscriptions || l()));
    function d(h, _) {
      const v = a().find((b) => b.id === h);
      v && (_.reduce((b, x) => b + x.quantity, 0) > v.maxQuantity || (e(s)[h] = _));
    }
    Je(() => {
      const h = new Set(e(i).map((v) => v.id)), _ = Object.entries(e(s)).filter(([v]) => h.has(v)).flatMap(([v, b]) => {
        const x = e(i).find((S) => S.id === v), D = (x == null ? void 0 : x.includeInCompareAt) === !0;
        return b.map((S) => ({ id: S.id, quantity: S.quantity, variant: S.variant, product: S.product, fullPrice: S.fullPrice, includeInCompareAt: D }));
      });
      c()(_);
    });
    var g = { get dealBlock() {
      return r();
    }, set dealBlock(h) {
      r(h), k();
    }, get multipleGiftsSelectors() {
      return a();
    }, set multipleGiftsSelectors(h) {
      a(h), k();
    }, get sellingPlan() {
      return l();
    }, set sellingPlan(h) {
      l(h), k();
    }, get otherProducts() {
      return o();
    }, set otherProducts(h) {
      o(h), k();
    }, get onChange() {
      return c();
    }, set onChange(h) {
      c(h), k();
    } }, f = Be();
    return $t(pe(f), 19, () => e(i), (h) => h.id, (h, _, v) => {
      var b = wf(), x = pe(b);
      {
        let I = u(() => e(s)[e(_).id] || []);
        hu(x, { get dealBlock() {
          return r();
        }, get multipleGiftsSelector() {
          return e(_);
        }, get selectedVariants() {
          return e(I);
        }, onConfirm: d, get otherProducts() {
          return o();
        } });
      }
      var D = q(x, 2), S = (I) => {
        p(I, yf());
      };
      G(D, (I) => {
        e(v) < e(i).length - 1 && I(S);
      }), p(h, b);
    }), p(n, f), Xe(g);
  }
  Qe(Si, { dealBlock: {}, multipleGiftsSelectors: {}, sellingPlan: {}, otherProducts: {}, onChange: {} }, [], [], !0);
  const vo = (n, t) => n.unlockAtBarOnly ? t === n.unlockAtBar : t >= n.unlockAtBar, pu = (n, t) => !!n.applyOnlyForSubscriptions && !t;
  var Pf = Tn('<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.584 21H42.834V14C42.834 6.279 36.555 0 28.834 0C21.113 0 14.834 6.279 14.834 14V21H13.084C10.1907 21 7.83398 23.3543 7.83398 26.25V50.75C7.83398 53.6457 10.1907 56 13.084 56H44.584C47.4773 56 49.834 53.6457 49.834 50.75V26.25C49.834 23.3543 47.4773 21 44.584 21ZM19.5007 14C19.5007 8.85267 23.6867 4.66667 28.834 4.66667C33.9813 4.66667 38.1673 8.85267 38.1673 14V21H19.5007V14ZM31.1673 39.018V44.3333C31.1673 45.6213 30.1243 46.6667 28.834 46.6667C27.5436 46.6667 26.5007 45.6213 26.5007 44.3333V39.018C25.1123 38.2083 24.1673 36.7197 24.1673 35C24.1673 32.4263 26.2603 30.3333 28.834 30.3333C31.4076 30.3333 33.5007 32.4263 33.5007 35C33.5007 36.7197 32.5557 38.2083 31.1673 39.018Z" fill="currentColor" transform="translate(21.5, 22)"></path></svg>');
  function bu(n) {
    p(n, Pf());
  }
  Qe(bu, {}, [], [], !0);
  var Sf = $('<img alt="" class="kaching-bundles__deal-bar-progressive-gift__image"/>'), Bf = $('<span class="kaching-bundles__deal-bar-progressive-gift__lock-icon kaching-bundles__deal-bar-progressive-gift__image"><!></span>'), Cf = $('<img class="kaching-bundles__deal-bar-progressive-gift__image"/>'), If = $('<span class="kaching-bundles__deal-bar-progressive-gift__text"><!></span>'), Mf = $('<span class="kaching-bundles__deal-bar-progressive-gift__text"><!></span>'), zf = $('<span class="kaching-bundles__deal-bar-progressive-gift__label-crossed-out"><!></span>'), $f = $('<span class="kaching-bundles__deal-bar-progressive-gift__label"><!> <!></span>'), Df = $('<div><div class="kaching-bundles__deal-bar-progressive-gift__main"><!> <div class="kaching-bundles__deal-bar-progressive-gift__content"><!> <!></div></div> <!></div>');
  function fu(n, t) {
    Ke(t, !0);
    const r = () => Ie(D, "$config", o), a = () => Ie(v, "$translate", o), l = () => Ie(x, "$getMediaImageUrl", o), [o, c] = vt(), s = m(t, "progressiveGifts", 7), i = m(t, "gift", 7), d = m(t, "product", 7), g = m(t, "selectedDealBarIndex", 7), f = m(t, "sellingPlan", 7), h = m(t, "selected", 7), _ = m(t, "onChange", 7), v = Ct(), b = cn(), x = Fn(), D = _n(), S = u(() => i().differentVariantsEnabled), I = u(() => {
      var V;
      return d() ? i().variantGIDs ? i().variantGIDs.map(Zt) : (V = d()) == null ? void 0 : V.variants.map((O) => O.id) : null;
    }), W = u(() => {
      if (d()) return { ...d(), variants: d().variants.filter((V) => (r().preview || V.availableForSale) && (!e(I) || e(I).includes(V.id))) };
    });
    let Q = ze(lt([]));
    const E = u(() => (function(V, O, ee) {
      return V.length > 0 ? V : O != null && O.availableForSale && O.variants.length > 0 ? Array.from({ length: ee }, () => O.variants[0].id) : [];
    })(e(Q), e(W), i().quantity)), K = u(() => d() && e(E).length > 0 ? e(E).map((V) => d().variants.find((O) => O.id === V)).filter((V) => V !== void 0) : []), M = u(() => {
      var V;
      return dn({ priceFormatter: Ie(b, "$formatPrice", o), product: d(), totalFullPrice: ((V = e(K)) == null ? void 0 : V.reduce((O, ee) => {
        var ge;
        return O + ((ge = ee == null ? void 0 : ee.price) != null ? ge : 0);
      }, 0)) || 0, totalDiscountedPrice: 0, quantity: i().quantity, unitQuantity: kr(e(K).map((O) => ({ variant: O, quantity: 1 }))) });
    }), te = u(() => e(M)(a()(i().title))), A = u(() => e(M)(a()(i().lockedTitle))), L = u(() => e(M)(a()(i().label))), se = u(() => e(M)(a()(i().labelCrossedOut))), Z = u(() => g() === null || !vo(i(), g() + 1) || pu(i(), f())), H = u(() => {
      var V, O, ee;
      return i().giftType === "shipping" ? po : ((O = (V = e(K)) == null ? void 0 : V[0]) == null ? void 0 : O.image) || ((ee = d()) == null ? void 0 : ee.image);
    }), z = u(() => i().mediaImageGID ? l()(i().mediaImageGID) : e(H)), C = u(() => s().dealBarStyle && l()(s().dealBarStyle.lockedMediaImageGID));
    Je(() => {
      if (h()) if (d() && e(K) && !e(Z)) {
        const V = Object.values(e(K).reduce((O, ee) => (O[ee.id] ? O[ee.id].quantity += 1 : O[ee.id] = { variant: ee, quantity: 1 }, O), {}));
        nn(() => _()({ product: d(), variants: V }));
      } else nn(() => _()(void 0));
      else nn(() => _()(void 0));
    }), pr(() => {
      i().productGID, le(Q, [], !0);
    }), Je(() => {
      e(Z) && e(z) && (new Image().src = e(z));
    });
    const R = u(() => {
      var V;
      return i().giftType === "product" && !((V = d()) != null && V.availableForSale);
    });
    var N = { get progressiveGifts() {
      return s();
    }, set progressiveGifts(V) {
      s(V), k();
    }, get gift() {
      return i();
    }, set gift(V) {
      i(V), k();
    }, get product() {
      return d();
    }, set product(V) {
      d(V), k();
    }, get selectedDealBarIndex() {
      return g();
    }, set selectedDealBarIndex(V) {
      g(V), k();
    }, get sellingPlan() {
      return f();
    }, set sellingPlan(V) {
      f(V), k();
    }, get selected() {
      return h();
    }, set selected(V) {
      h(V), k();
    }, get onChange() {
      return _();
    }, set onChange(V) {
      _(V), k();
    } }, J = Be(), X = pe(J), B = (V) => {
      var O = Be(), ee = pe(O), ge = (T) => {
        var w = Df();
        let U;
        var oe = P(w), j = P(oe), re = (de) => {
          var fe = Be(), $e = pe(fe), qe = (ne) => {
            var we = Sf();
            be(() => Pe(we, "src", e(C))), p(ne, we);
          }, De = (ne) => {
            var we = Bf();
            bu(P(we)), y(we), p(ne, we);
          };
          G($e, (ne) => {
            e(C) ? ne(qe) : ne(De, !1);
          }), p(de, fe);
        }, Y = (de) => {
          var fe = Be(), $e = pe(fe), qe = (De) => {
            var ne = Cf();
            be(() => {
              var we, Ze;
              Pe(ne, "src", e(z)), Pe(ne, "alt", (Ze = (we = d()) == null ? void 0 : we.title) != null ? Ze : "");
            }), p(De, ne);
          };
          G($e, (De) => {
            e(z) && De(qe);
          }, !0), p(de, fe);
        };
        G(j, (de) => {
          e(Z) ? de(re) : de(Y, !1);
        });
        var ie = q(j, 2), _e = P(ie), Se = (de) => {
          var fe = If();
          Ve(P(fe), () => e(A)), y(fe), p(de, fe);
        }, me = (de) => {
          var fe = Be(), $e = pe(fe), qe = (De) => {
            var ne = Mf();
            Ve(P(ne), () => e(te)), y(ne), p(De, ne);
          };
          G($e, (De) => {
            e(te) && De(qe);
          }, !0), p(de, fe);
        };
        G(_e, (de) => {
          e(Z) ? de(Se) : de(me, !1);
        });
        var ye = q(_e, 2), he = (de) => {
          var fe = Be();
          $t(pe(fe), 17, () => ({ length: e(S) ? i().quantity : 1 }), Mr, ($e, qe, De) => {
            var ne = Be(), we = pe(ne), Ze = (ke) => {
              {
                let Me = u(() => e(S) ? De + 1 : void 0);
                Un(ke, { get product() {
                  return e(W);
                }, get selectedVariantId() {
                  return e(E)[De];
                }, get number() {
                  return e(Me);
                }, forceDropdown: !0, onChange: (Ge) => (function(Ae, je) {
                  e(S) ? le(Q, [...e(E).slice(0, je), Ae, ...e(E).slice(je + 1)], !0) : le(Q, Array.from({ length: i().quantity }, () => Ae), !0);
                })(Ge, De) });
              }
            };
            G(we, (ke) => {
              e(E)[De] !== void 0 && ke(Ze);
            }), p($e, ne);
          }), p(de, fe);
        };
        G(ye, (de) => {
          h() && !e(Z) && e(W) && e(W).variants.length > 1 && e(E).length > 0 && de(he);
        }), y(ie), y(oe);
        var ce = q(oe, 2), ae = (de) => {
          var fe = Be(), $e = pe(fe), qe = (De) => {
            var ne = $f(), we = P(ne), Ze = (Ge) => {
              var Ae = Be();
              Ve(pe(Ae), () => e(L)), p(Ge, Ae);
            };
            G(we, (Ge) => {
              e(L) && Ge(Ze);
            });
            var ke = q(we, 2), Me = (Ge) => {
              var Ae = zf();
              Ve(P(Ae), () => e(se)), y(Ae), p(Ge, Ae);
            };
            G(ke, (Ge) => {
              e(se) && Ge(Me);
            }), y(ne), p(De, ne);
          };
          G($e, (De) => {
            e(Z) && !s().showLockedGiftLabels || De(qe);
          }), p(de, fe);
        };
        G(ce, (de) => {
          (e(L) || e(se)) && de(ae);
        }), y(w), be((de) => U = Lt(w, 1, "kaching-bundles__deal-bar-progressive-gift", null, U, de), [() => ({ "kaching-bundles__deal-bar-progressive-gift--locked": e(Z), "kaching-bundles__deal-bar-progressive-gift--out-of-stock": r().preview && e(R) })]), p(T, w);
      };
      G(ee, (T) => {
        var w;
        (d() && ((w = e(K)) != null && w.length) || i().giftType === "shipping") && T(ge);
      }), p(V, O);
    };
    G(X, (V) => {
      e(Z) && s().hideLockedGifts || V(B);
    }), p(n, J);
    var F = Xe(N);
    return c(), F;
  }
  Qe(fu, { progressiveGifts: {}, gift: {}, product: {}, selectedDealBarIndex: {}, sellingPlan: {}, selected: {}, onChange: {} }, [], [], !0);
  var Af = $('<div class="kaching-bundles__deal-bar-progressive-gifts"></div>');
  function Bi(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "progressiveGifts", 7), o = m(t, "dealBlock", 7), c = m(t, "dealBar", 7), s = m(t, "otherProducts", 7), i = m(t, "selectedDealBarIndex", 7), d = m(t, "sellingPlan", 7), g = m(t, "selected", 7), f = m(t, "onChange", 7), h = u(() => o().dealBars.findIndex((M) => M.id === c().id)), _ = _n();
    let v = ze(lt({}));
    const b = u(() => {
      var M, te;
      return ((A) => A ? bn({ "kaching-deal-bar-progressive-gift-image-size": A.imageSize + "px", "kaching-deal-bar-progressive-gift-corner-radius": A.cornerRadius + "px", "kaching-deal-bar-progressive-gift-label-background-color": Le(A.labelBackgroundColor), "kaching-deal-bar-progressive-gift-label-text-color": Le(A.labelTextColor), "kaching-deal-bar-progressive-gift-label-text-size": A.labelTextSize + "px", "kaching-deal-bar-progressive-gift-text-color": Le(A.textColor), "kaching-deal-bar-progressive-gift-selected-text-color": Le(A.selectedTextColor), "kaching-deal-bar-progressive-gift-text-size": A.textSize + "px", "kaching-deal-bar-progressive-gift-locked-label-background-color": Le(A.lockedLabelBackgroundColor), "kaching-deal-bar-progressive-gift-locked-label-text-color": Le(A.lockedLabelTextColor), "kaching-deal-bar-progressive-gift-locked-label-text-size": A.lockedLabelTextSize + "px", "kaching-deal-bar-progressive-gift-locked-text-color": Le(A.lockedTextColor), "kaching-deal-bar-progressive-gift-locked-text-size": A.lockedTextSize + "px", "kaching-deal-bar-progressive-gift-locked-icon-color": Le(A.lockedIconColor) }) : "")((te = (M = o().progressiveGifts) == null ? void 0 : M.dealBarStyle) != null ? te : null);
    });
    function x() {
      const M = Object.entries(e(v)).map(([te, A]) => ({ id: te, variants: A.variants, product: A.product }));
      f()(M);
    }
    const D = u(() => {
      var M, te, A;
      return (A = (te = (M = l()) == null ? void 0 : M.gifts) == null ? void 0 : te.filter((L) => vo(L, e(h) + 1))) != null ? A : [];
    }), S = u(() => e(D).flatMap((M) => {
      const te = M.giftType === "product" && M.productGID ? s().find((L) => L.id === Zt(M.productGID)) : void 0;
      if (!Ie(_, "$config", r).preview && M.giftType === "product" && !(te != null && te.availableForSale)) return [];
      const A = te && _r(te);
      return { gift: M, product: A };
    }));
    Je(() => {
      const M = new Set(e(D).map((A) => A.id)), te = Object.keys(e(v)).filter((A) => !M.has(A));
      if (te.length) {
        for (const A of te) delete e(v)[A];
        g() && x();
      }
    });
    var I = { get progressiveGifts() {
      return l();
    }, set progressiveGifts(M) {
      l(M), k();
    }, get dealBlock() {
      return o();
    }, set dealBlock(M) {
      o(M), k();
    }, get dealBar() {
      return c();
    }, set dealBar(M) {
      c(M), k();
    }, get otherProducts() {
      return s();
    }, set otherProducts(M) {
      s(M), k();
    }, get selectedDealBarIndex() {
      return i();
    }, set selectedDealBarIndex(M) {
      i(M), k();
    }, get sellingPlan() {
      return d();
    }, set sellingPlan(M) {
      d(M), k();
    }, get selected() {
      return g();
    }, set selected(M) {
      g(M), k();
    }, get onChange() {
      return f();
    }, set onChange(M) {
      f(M), k();
    } }, W = Be(), Q = pe(W), E = (M) => {
      var te = Af();
      $t(te, 21, () => e(S), ({ gift: A, product: L }) => A.id, (A, L) => {
        let se = () => e(L).gift;
        fu(A, { get selectedDealBarIndex() {
          return i();
        }, get selected() {
          return g();
        }, get gift() {
          return se();
        }, get product() {
          return e(L).product;
        }, get progressiveGifts() {
          return l();
        }, get sellingPlan() {
          return d();
        }, onChange: (Z) => (function(H, z) {
          z ? e(v)[H] = z : delete e(v)[H], g() && x();
        })(se().id, Z) });
      }), y(te), be(() => Vt(te, e(b))), p(M, te);
    };
    G(Q, (M) => {
      var te;
      o().progressiveGiftsEnabled && ((te = l()) == null ? void 0 : te.layout) === "deal-bar" && e(S).length > 0 && M(E);
    }), p(n, W);
    var K = Xe(I);
    return a(), K;
  }
  Qe(Bi, { progressiveGifts: {}, dealBlock: {}, dealBar: {}, otherProducts: {}, selectedDealBarIndex: {}, sellingPlan: {}, selected: {}, onChange: {} }, [], [], !0);
  var Vf = Tn('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function vu(n) {
    p(n, Vf());
  }
  Qe(vu, {}, [], [], !0);
  var Tf = Tn('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3307 4L5.9974 11.3333L2.66406 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function _u(n) {
    p(n, Tf());
  }
  Qe(_u, {}, [], [], !0);
  var qf = Tn('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>');
  function ku(n) {
    p(n, qf());
  }
  Qe(ku, {}, [], [], !0);
  var Gf = Tn('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function mu(n) {
    p(n, Gf());
  }
  Qe(mu, {}, [], [], !0);
  var Of = Tn('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2787 3.45332C11.5092 2.98638 11.6245 2.75291 11.7809 2.67831C11.917 2.61341 12.0752 2.61341 12.2113 2.67831C12.3677 2.75291 12.483 2.98638 12.7135 3.45332L14.9002 7.88328C14.9682 8.02113 15.0022 8.09006 15.0519 8.14358C15.096 8.19096 15.1488 8.22935 15.2074 8.25662C15.2736 8.28742 15.3497 8.29854 15.5018 8.32077L20.3931 9.03571C20.9082 9.11099 21.1657 9.14863 21.2849 9.27444C21.3886 9.38389 21.4373 9.5343 21.4176 9.68377C21.3949 9.85558 21.2085 10.0372 20.8356 10.4004L17.2975 13.8464C17.1873 13.9538 17.1321 14.0076 17.0965 14.0715C17.065 14.128 17.0448 14.1902 17.037 14.2545C17.0282 14.3271 17.0412 14.403 17.0672 14.5547L17.9021 19.4221C17.9901 19.9355 18.0341 20.1922 17.9514 20.3445C17.8794 20.477 17.7514 20.57 17.6032 20.5975C17.4327 20.6291 17.2022 20.5078 16.7412 20.2654L12.3685 17.9658C12.2322 17.8942 12.1641 17.8584 12.0923 17.8443C12.0288 17.8318 11.9634 17.8318 11.8999 17.8443C11.8281 17.8584 11.76 17.8942 11.6237 17.9658L7.25102 20.2654C6.79001 20.5078 6.55951 20.6291 6.38907 20.5975C6.24078 20.57 6.11282 20.477 6.04083 20.3445C5.95809 20.1922 6.00212 19.9355 6.09017 19.4221L6.92498 14.5547C6.95101 14.403 6.96402 14.3271 6.95521 14.2545C6.94742 14.1902 6.92721 14.128 6.8957 14.0715C6.86012 14.0076 6.80497 13.9538 6.69468 13.8464L3.15665 10.4004C2.78376 10.0372 2.59731 9.85558 2.57462 9.68377C2.55488 9.5343 2.60365 9.38389 2.70734 9.27444C2.82653 9.14863 3.08407 9.11099 3.59914 9.03571L8.4904 8.32077C8.64252 8.29854 8.71857 8.28742 8.78481 8.25662C8.84346 8.22935 8.89626 8.19096 8.94028 8.14358C8.99 8.09006 9.02402 8.02113 9.09207 7.88328L11.2787 3.45332Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function xu(n) {
    p(n, Of());
  }
  Qe(xu, {}, [], [], !0);
  var Ff = Tn('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function yu(n) {
    p(n, Ff());
  }
  Qe(yu, {}, [], [], !0);
  const wu = { checkmark: _u, dot: ku, arrow: vu, star: xu, heart: mu, "thumbs-up": yu };
  var Lf = $('<span class="kaching-bundles__highlights__icon"><img alt=""/></span>'), jf = $('<span class="kaching-bundles__highlights__icon"><!></span>'), Ef = $('<div class="kaching-bundles__highlights__item"><!> <span class="kaching-bundles__highlights__text"><!></span></div>'), Rf = $("<div></div>");
  function ya(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "highlights", 7), o = m(t, "isSelected", 7), c = m(t, "replaceLiquid", 7), s = Fn(), i = Ct(), d = u(() => l().items.map((W) => Ie(i, "$translate", r)(W)).map((W) => c() ? c()(W) : W).filter((W) => W !== "")), g = u(() => ((W) => bn({ "kaching-highlights-icon-color": Le(W.iconColor), "kaching-highlights-text-color": Le(W.textColor), "kaching-highlights-icon-size": W.size + 2 + "px", "kaching-highlights-text-size": W.size + "px" }))(l())), f = u(() => {
      var W;
      return (W = l().layout) != null ? W : "vertical";
    }), h = u(() => {
      var W;
      return (W = l().iconType) != null ? W : "checkmark";
    }), _ = u(() => wu[e(h)]), v = u(() => {
      var W;
      return e(h) === "custom" ? Ie(s, "$getMediaImageUrl", r)((W = l().customIconGID) != null ? W : null) : void 0;
    });
    var b = { get highlights() {
      return l();
    }, set highlights(W) {
      l(W), k();
    }, get isSelected() {
      return o();
    }, set isSelected(W) {
      o(W), k();
    }, get replaceLiquid() {
      return c();
    }, set replaceLiquid(W) {
      c(W), k();
    } }, x = Be(), D = pe(x), S = (W) => {
      var Q = Rf();
      let E;
      $t(Q, 21, () => e(d), Mr, (K, M) => {
        var te = Ef(), A = P(te), L = (H) => {
          var z = Lf(), C = P(z);
          y(z), be(() => Pe(C, "src", e(v))), p(H, z);
        }, se = (H) => {
          var z = Be(), C = pe(z), R = (N) => {
            var J = jf();
            Qc(P(J), () => e(_), (X, B) => {
              B(X, {});
            }), y(J), p(N, J);
          };
          G(C, (N) => {
            e(_) && N(R);
          }, !0), p(H, z);
        };
        G(A, (H) => {
          e(h) === "custom" && e(v) ? H(L) : H(se, !1);
        });
        var Z = q(A, 2);
        Ve(P(Z), () => e(M)), y(Z), y(te), p(K, te);
      }), y(Q), be((K) => {
        E = Lt(Q, 1, "kaching-bundles__highlights", null, E, K), Vt(Q, e(g));
      }, [() => ({ "kaching-bundles__highlights--horizontal": e(f) === "horizontal" })]), p(W, Q);
    };
    G(D, (W) => {
      e(d).length > 0 && (!l().showOnlyWhenSelected || o()) && W(S);
    }), p(n, x);
    var I = Xe(b);
    return a(), I;
  }
  function Nf(n, t, r, a) {
    t()({ dealBarId: r().id, dealBarQuantity: a(r()), preselected: !1 });
  }
  Qe(ya, { highlights: {}, isSelected: {}, replaceLiquid: {} }, [], [], !0);
  var Qf = $('<img class="kaching-bundles__bar-image" alt=""/>'), Wf = $('<div class="kaching-bundles__bar-radio"></div>'), Uf = $('<span class="kaching-bundles__bar-title"><!></span>'), Hf = $('<span class="kaching-bundles__bar-label"><!></span>'), Zf = $('<div class="kaching-bundles__bar-subtitle"><!></div>'), Jf = $('<div class="kaching-bundles__bar-full-price"><!></div>'), Yf = $('<div class="kaching-bundles__bar-price"><!></div>'), Kf = $('<div class="kaching-bundles__bar-full-price"><!></div>'), Xf = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--secondary"><!> <!></div>'), ev = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--main"><!> <!></div> <!>', 1), tv = $('<div class="kaching-bundles__bar-full-price"><!></div>'), nv = $('<div class="kaching-bundles__bar-unit-price"><!> </div>'), rv = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--primary"><!> <!></div> <div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--secondary"><!></div>', 1), av = $('<div class="kaching-bundles__bar-full-price"><!></div>'), iv = $("<!> <!>", 1), lv = $('<!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!> <!></div> <div class="kaching-bundles__bar-second-line"><!> <!></div></div> <div class="kaching-bundles__bar-pricing"><!></div></div>', 1), sv = $('<div class="kaching-bundles__bar-selling-plan"><!></div>'), ov = $('<div class="kaching-bundles__bar-variant-selector-wrapper"><!> <!></div>'), cv = $('<div class="kaching-bundles__bar-variants"><!> <!></div>'), dv = $('<!> <div class="kaching-bundles__bar-wrapper"><!> <!> <!> <!> <!> <!></div> <!> <!> <!> <!>', 1), uv = $('<div><input type="radio"/> <!> <!></div>');
  function _o(n, t) {
    Ke(t, !0);
    const r = () => Ie(se, "$config", o), a = () => Ie(A, "$formatPrice", o), l = () => Ie(te, "$translate", o), [o, c] = vt();
    let s = m(t, "dealBlock", 7), i = m(t, "dealBar", 7), d = m(t, "product", 7), g = m(t, "otherProducts", 23, () => []), f = m(t, "complementaryProducts", 23, () => []), h = m(t, "customQuantity", 7, void 0), _ = m(t, "currentVariantId", 7, void 0), v = m(t, "componentId", 7), b = m(t, "selected", 7, !1), x = m(t, "globalSellingPlan", 7, void 0), D = m(t, "selectedDealBarIndex", 7), S = m(t, "onProgressiveGiftsChange", 7), I = m(t, "onDealBarSelect", 7), W = m(t, "onDealBarDeselect", 7), Q = m(t, "onVariantSelect", 7), E = m(t, "onVariantsChange", 7), K = m(t, "onPersonalisationsChange", 7), M = m(t, "personalisationInitialValues", 23, () => []);
    const te = Ct(), A = cn(), L = Fn(), se = _n();
    let Z = ze(lt([])), H = ze(lt([])), z = ze(lt([]));
    const C = u(() => s().priceRounding ? { perItem: s().showPricesPerItem, precision: s().priceRoundingPrecision, v2: r().featureFlags.price_rounding_v2 || !1 } : void 0), R = u(() => {
      var Ce, bt;
      return s() && ((bt = (Ce = s().defaultVariantsV2) == null ? void 0 : Ce.find((Ye) => Zt(Ye.productGID) === d().id && Ye.dealBarId === i().id)) == null ? void 0 : bt.variantGIDs) || [];
    });
    let N = u(() => B(i())), J = ze(lt(B(i())));
    pr(() => {
      le(J, e(N), !0);
    });
    const X = u(() => h() || e(J));
    function B(Ce) {
      return Ce.dealBarType === pt.Bxgy ? Ce.buyQuantity + Ce.getQuantity : Number(Ce.quantity);
    }
    let F = ze(lt([])), V = ze(lt([]));
    Je(() => {
      const Ce = (function(bt, Ye, ve) {
        let We = [];
        for (let Ee = 0; Ee < bt; Ee++) {
          let et = Ye[Ee];
          if (!et && bt > B(i()) && Ye.filter((Te) => Te).length === B(i()) && (et = Ye[Ye.length - 1]), et) {
            const Te = Zt(et);
            if (d().variants.find((Ne) => Ne.id == Te)) {
              We.push(Te);
              continue;
            }
          }
          ve && We.push(ve);
        }
        return We;
      })(e(X), e(R), _());
      if (JSON.stringify(e(F)) !== JSON.stringify(Ce)) {
        const bt = e(F).length === Ce.length;
        le(F, Ce, !0), e(V).length === 0 ? le(V, Ce, !0) : bt ? r().featureFlags.preserve_variant_selections && s().differentVariantsEnabled && new Set(e(V)).size !== 1 || le(V, Ce, !0) : le(V, (function(Ye, ve) {
          const We = Ye[Ye.length - 1];
          if (Ye.length < ve) {
            const Ee = ve - Ye.length;
            return [...Ye, ...Array(Ee).fill(We)];
          }
          return Ye.slice(0, ve);
        })(e(V), e(X)), !0);
      }
    });
    const O = u(() => Ge(e(V))), ee = u(() => new Map(d().variants.map((Ce) => [Ce.id, Ce])));
    let ge = ze(void 0);
    const T = u(() => rl(d(), e(O).map((Ce) => Ce.variant))), w = u(() => {
      var Ce, bt;
      return (i().sellingPlanEnabled || s().subscriptionsEnabled && ((Ce = s().subscriptions) == null ? void 0 : Ce.layout) === "link" && ((bt = s().subscriptions) == null ? void 0 : bt.subscribeByDefault)) && (!s().subscriptionsEnabled || !!x());
    }), U = u(() => e(w) ? lo(i(), e(T), e(ge)) : void 0), oe = u(() => so(e(U), x(), e(T), d().requiresSellingPlan)), j = u(() => (function(Ce, bt, Ye, ve) {
      return Ye.map(({ variant: Ee, quantity: et }) => {
        let Te = (function(ot, _t) {
          var St;
          if (!_t) return ot.price;
          const tt = ot.sellingPlans.find((xt) => xt.id === _t.id);
          return tt && tt.perDeliveryPrice !== tt.price ? Math.max((St = tt.compareAtPrice) != null ? St : ot.price, ot.price) : ot.price;
        })(Ee, ve);
        const Ne = Ce.useProductCompareAtPrice || (bt.dealBarType === void 0 || bt.dealBarType === pt.QuantityBreak) && bt.discountType === "default";
        return Ee.compareAtPrice && Ne && (Te = Math.max(Te, Ee.compareAtPrice)), Te * et;
      }).reduce((Ee, et) => Ee + et, 0);
    })(s(), i(), e(O), e(oe))), re = u(() => ll(e(j), e(Z), e(H))), Y = u(() => Math.ceil(e(j) / e(X))), ie = u(() => go(e(X) === 1, e(re), e(Y))), _e = u(() => s() && qe(e(O), e(oe))), Se = u(() => e(O)[0] && ro(e(O)[0].variant)), me = u(() => kr(e(O))), ye = u(() => e(me) ? e(_e) / e(me) : null), he = u(() => dn({ priceFormatter: a(), product: d(), selectedVariants: e(O), totalFullPrice: e(j), totalCompareAtPrice: e(re), totalDiscountedPrice: e(_e), quantity: e(X), dealBar: i(), legacySavedPercentage: r().featureFlags.legacy_saved_percentage || !1, unitQuantity: e(me), sellingPlan: e(oe) })), ce = u(() => e(he)(l()(i().title))), ae = u(() => e(he)(l()(i().subtitle))), de = u(() => e(he)(l()(i().label))), fe = u(() => al(s(), i()).map((Ce) => ka(Ce, l(), e(he)))), $e = u(() => ma(e(fe)));
    function qe(Ce, bt) {
      switch (i().dealBarType) {
        case void 0:
        case pt.QuantityBreak:
          return Wd(i(), Ce, r().currencyRate, e(C), bt, r().featureFlags.percentage_cents_rounding_workaround);
        case pt.Bxgy:
          return Ud(i(), Ce, r().currencyRate, e(C), bt);
      }
    }
    const De = u(() => Math.ceil(e(_e) / e(X))), ne = u(() => e(re) > e(_e)), we = u(() => e(X) && (function(Ce) {
      return !Ce.differentVariantsEnabled || d().variants.length === 1 ? !1 : Ce.hideVariantPicker ? !0 : !(e(X) == 1 && !Ce.showVariantsForSingleQuantity);
    })(s())), Ze = u(() => r().featureFlags.variant_images && new Set(d().variants.map((Ce) => Ce.image).filter((Ce) => Ce)).size > 1), ke = u(() => `${i().id}_${v()}`);
    function Me(Ce) {
      b() && (Ce.preventDefault(), Ce.stopPropagation(), W()());
    }
    function Ge(Ce) {
      return Ce.reduce((bt, Ye) => {
        const ve = bt.find(({ variant: We }) => We.id === Ye);
        if (ve) ve.quantity += 1;
        else {
          const We = d().variants.find((Ee) => Ee.id === Ye);
          if (!We) return bt;
          bt.push({ variant: We, quantity: 1 });
        }
        return bt;
      }, []);
    }
    Fa(() => {
      b() && I()({ dealBarId: i().id, dealBarQuantity: B(i()), preselected: !0 });
    });
    const Ae = u(() => Ie(L, "$getMediaImageUrl", o)(i().mediaImageGID) || sl);
    Je(() => {
      b() && (e(V), e(z), e(Z), e(H), e(oe), nn(() => {
        (function() {
          if (!e(V).length) return;
          const Ce = Ge(e(V)), bt = e(_e) + e(z).reduce((Te, Ne) => Te + Ne.discountedPrice, 0), Ye = e(Z).reduce((Te, Ne) => Ne.showPrice ? Te + Ne.fullPrice : Te, 0) + e(H).reduce((Te, Ne) => Te + Ne.fullPrice * Ne.quantity, 0), ve = e(j) + e(z).reduce((Te, Ne) => Te + Ne.fullPrice, 0) + Ye, We = qe(e(O), void 0), Ee = d().sellingPlans.map((Te) => ({ sellingPlanId: Te.id, discountedPrice: qe(e(O), Te) })), et = { discountedPrice: bt, fullPrice: ve, giftValue: Ye, discountedPricePerItem: e(De), fullPricePerItem: e(Y), discountedPriceWithoutSellingPlan: We, discountedPricesForSellingPlans: Ee };
          E()({ variants: Ce, freeGifts: [...e(Z), ...e(H)], upsells: e(z), dealBarSellingPlan: e(U), pricing: et });
        })();
      }));
    });
    const je = u(() => i().showAsSoldOutEnabled && i().showAsSoldOut ? cl(i().showAsSoldOut) : "");
    var Tt = { get dealBlock() {
      return s();
    }, set dealBlock(Ce) {
      s(Ce), k();
    }, get dealBar() {
      return i();
    }, set dealBar(Ce) {
      i(Ce), k();
    }, get product() {
      return d();
    }, set product(Ce) {
      d(Ce), k();
    }, get otherProducts() {
      return g();
    }, set otherProducts(Ce = []) {
      g(Ce), k();
    }, get complementaryProducts() {
      return f();
    }, set complementaryProducts(Ce = []) {
      f(Ce), k();
    }, get customQuantity() {
      return h();
    }, set customQuantity(Ce = void 0) {
      h(Ce), k();
    }, get currentVariantId() {
      return _();
    }, set currentVariantId(Ce = void 0) {
      _(Ce), k();
    }, get componentId() {
      return v();
    }, set componentId(Ce) {
      v(Ce), k();
    }, get selected() {
      return b();
    }, set selected(Ce = !1) {
      b(Ce), k();
    }, get globalSellingPlan() {
      return x();
    }, set globalSellingPlan(Ce = void 0) {
      x(Ce), k();
    }, get selectedDealBarIndex() {
      return D();
    }, set selectedDealBarIndex(Ce) {
      D(Ce), k();
    }, get onProgressiveGiftsChange() {
      return S();
    }, set onProgressiveGiftsChange(Ce) {
      S(Ce), k();
    }, get onDealBarSelect() {
      return I();
    }, set onDealBarSelect(Ce) {
      I(Ce), k();
    }, get onDealBarDeselect() {
      return W();
    }, set onDealBarDeselect(Ce) {
      W(Ce), k();
    }, get onVariantSelect() {
      return Q();
    }, set onVariantSelect(Ce) {
      Q(Ce), k();
    }, get onVariantsChange() {
      return E();
    }, set onVariantsChange(Ce) {
      E(Ce), k();
    }, get onPersonalisationsChange() {
      return K();
    }, set onPersonalisationsChange(Ce) {
      K(Ce), k();
    }, get personalisationInitialValues() {
      return M();
    }, set personalisationInitialValues(Ce = []) {
      M(Ce), k();
    } }, it = uv();
    let at;
    var st = P(it);
    ea(st), st.__change = [Nf, I, i, B];
    var yt = q(st, 2);
    Wa(yt, { get for() {
      return e(ke);
    }, get soldOut() {
      return i().showAsSoldOutEnabled;
    }, get borderHost() {
      return e($e);
    }, children: (Ce, bt) => {
      var Ye = dv(), ve = pe(Ye);
      $t(ve, 17, () => e(fe), (ct) => ct.id, (ct, Mt) => {
        aa(ct, { get badge() {
          return e(Mt);
        }, get blockLayout() {
          return s().blockLayout;
        } });
      });
      var We = q(ve, 2), Ee = P(We);
      Ht(Ee, { element: "div", class: "kaching-bundles__bar-main", onclick: Me, children: (ct, Mt) => {
        var Xt = lv(), Ue = pe(Xt), He = (dt) => {
          var ut = Qf();
          be(() => Pe(ut, "src", e(Ae))), p(dt, ut);
        }, nt = (dt) => {
          p(dt, Wf());
        };
        G(Ue, (dt) => {
          i().mediaImageGID ? dt(He) : dt(nt, !1);
        });
        var Bt = q(Ue, 2), Dt = P(Bt), kn = P(Dt), zt = P(kn);
        rt(zt, () => e(ce), (dt) => {
          var ut = Uf();
          Ve(P(ut), () => e(ce)), y(ut), p(dt, ut);
        });
        var qt = q(zt, 2), mn = (dt) => {
          var ut = Be();
          rt(pe(ut), () => e(de), (Rt) => {
            var Nt = Hf();
            Ve(P(Nt), () => e(de)), y(Nt), p(Rt, Nt);
          }), p(dt, ut);
        };
        G(qt, (dt) => {
          e(de) && dt(mn);
        }), y(kn);
        var Qt = q(kn, 2), gn = P(Qt), hn = (dt) => {
          var ut = Be();
          rt(pe(ut), () => e(ae), (Rt) => {
            var Nt = Zf();
            Ve(P(Nt), () => e(ae)), y(Nt), p(Rt, Nt);
          }), p(dt, ut);
        };
        G(gn, (dt) => {
          e(ae) && dt(hn);
        });
        var rr = q(gn, 2), Hn = (dt) => {
          {
            let ut = u(() => {
              var Rt, Nt;
              return (Nt = (Rt = e(O)) == null ? void 0 : Rt[0]) == null ? void 0 : Nt.variant;
            });
            ia(dt, { get dealBlock() {
              return s();
            }, get variant() {
              return e(ut);
            } });
          }
        };
        G(rr, (dt) => {
          e(we) || dt(Hn);
        }), y(Qt), y(Dt);
        var Zn = q(Dt, 2), dr = P(Zn), fn = (dt) => {
          var ut = ev(), Rt = pe(ut), Nt = P(Rt);
          rt(Nt, () => e(De), (Ut) => {
            Lr(Ut, { get amount() {
              return e(De);
            }, get showPricesPerItem() {
              return s().showPricesPerItem;
            }, get unitLabel() {
              return s().unitLabel;
            } });
          });
          var Ln = q(Nt, 2), Sn = (Ut) => {
            var sn = Be();
            rt(pe(sn), () => e(ie), (Cn) => {
              var yn = Jf();
              Ve(P(yn), () => a()(e(ie))), y(yn), be(($n) => Pe(yn, "data-a11y-label", $n), [() => l()("system.original_price")]), p(Cn, yn);
            }), p(Ut, sn);
          };
          G(Ln, (Ut) => {
            e(ne) && Ut(Sn);
          }), y(Rt);
          var xn = q(Rt, 2), Bn = (Ut) => {
            var sn = Xf(), Cn = P(sn);
            rt(Cn, () => e(_e), (an) => {
              var pn = Yf();
              Ve(P(pn), () => a()(e(_e))), y(pn), be((Jn) => Pe(pn, "data-a11y-label", Jn), [() => l()("system.price")]), p(an, pn);
            });
            var yn = q(Cn, 2), $n = (an) => {
              var pn = Be();
              rt(pe(pn), () => e(re), (Jn) => {
                var En = Kf();
                Ve(P(En), () => a()(e(re))), y(En), be((gl) => Pe(En, "data-a11y-label", gl), [() => l()("system.original_price")]), p(Jn, En);
              }), p(an, pn);
            };
            G(yn, (an) => {
              e(ne) && an($n);
            }), y(sn), p(Ut, sn);
          };
          G(xn, (Ut) => {
            e(X) > 1 && Ut(Bn);
          }), p(dt, ut);
        }, Pn = (dt) => {
          var ut = Be(), Rt = pe(ut), Nt = (Sn) => {
            var xn = rv(), Bn = pe(xn), Ut = P(Bn);
            rt(Ut, () => e(_e), ($n) => {
              {
                let an = u(() => s().showPricesPerItem ? e(De) : e(_e));
                Lr($n, { get amount() {
                  return e(an);
                }, get showPricesPerItem() {
                  return s().showPricesPerItem;
                }, get unitLabel() {
                  return s().unitLabel;
                } });
              }
            });
            var sn = q(Ut, 2), Cn = ($n) => {
              var an = Be();
              rt(pe(an), () => s().showPricesPerItem ? e(ie) : e(re), (pn) => {
                var Jn = tv();
                Ve(P(Jn), () => a()(s().showPricesPerItem ? e(ie) : e(re))), y(Jn), be((En) => Pe(Jn, "data-a11y-label", En), [() => l()("system.original_price")]), p(pn, Jn);
              }), p($n, an);
            };
            G(sn, ($n) => {
              e(ne) && $n(Cn);
            }), y(Bn);
            var yn = q(Bn, 2);
            rt(P(yn), () => e(ye), ($n) => {
              var an = nv(), pn = P(an);
              Ve(pn, () => a()(e(ye), { preserveDecimals: !0 }));
              var Jn = q(pn);
              y(an), be(() => {
                var En;
                return ft(Jn, ` /
                    ${(En = e(Se)) != null ? En : ""}`);
              }), p($n, an);
            }), y(yn), p(Sn, xn);
          }, Ln = (Sn) => {
            var xn = iv(), Bn = pe(xn);
            rt(Bn, () => e(_e), (Cn) => {
              {
                let yn = u(() => s().showPricesPerItem ? e(De) : e(_e));
                Lr(Cn, { get amount() {
                  return e(yn);
                }, get showPricesPerItem() {
                  return s().showPricesPerItem;
                }, get unitLabel() {
                  return s().unitLabel;
                } });
              }
            });
            var Ut = q(Bn, 2), sn = (Cn) => {
              var yn = Be();
              rt(pe(yn), () => s().showPricesPerItem ? e(ie) : e(re), ($n) => {
                var an = av();
                Ve(P(an), () => a()(s().showPricesPerItem ? e(ie) : e(re))), y(an), be((pn) => Pe(an, "data-a11y-label", pn), [() => l()("system.original_price")]), p($n, an);
              }), p(Cn, yn);
            };
            G(Ut, (Cn) => {
              e(ne) && Cn(sn);
            }), p(Sn, xn);
          };
          G(Rt, (Sn) => {
            e(ye) && !r().ignoreUnitPrice ? Sn(Nt) : Sn(Ln, !1);
          }, !0), p(dt, ut);
        };
        G(dr, (dt) => {
          s().showBothPrices ? dt(fn) : dt(Pn, !1);
        }), y(Zn), y(Bt), p(ct, Xt);
      }, $$slots: { default: !0 } });
      var et = q(Ee, 2), Te = (ct) => {
        ya(ct, { get highlights() {
          return i().highlights;
        }, get isSelected() {
          return b();
        }, get replaceLiquid() {
          return e(he);
        } });
      };
      G(et, (ct) => {
        i().highlights && ct(Te);
      });
      var Ne = q(et, 2), ot = (ct) => {
        var Mt = sv(), Xt = P(Mt);
        {
          let Ue = u(() => e(U) || e(T)[0]);
          xa(Xt, { get sellingPlans() {
            return e(T);
          }, get selectedSellingPlan() {
            return e(Ue);
          }, onChange: (He) => {
            le(ge, He, !0);
          } });
        }
        y(Mt), p(ct, Mt);
      };
      G(Ne, (ct) => {
        b() && e(w) && !i().sellingPlanGid && e(T).length > 1 && ct(ot);
      });
      var _t = q(Ne, 2), St = (ct) => {
        var Mt = cv(), Xt = P(Mt);
        na(Xt, { get product() {
          return d();
        } }), $t(q(Xt, 2), 17, () => ({ length: e(X) }), Mr, (Ue, He, nt) => {
          var Bt = ov(), Dt = P(Bt);
          {
            let zt = u(() => e(X) > 1 ? nt + 1 : void 0);
            Un(Dt, { get product() {
              return d();
            }, get selectedVariantId() {
              return e(V)[nt];
            }, get showImage() {
              return e(Ze);
            }, get number() {
              return e(zt);
            }, onChange: (qt) => (function(mn, Qt) {
              const gn = [...e(V)];
              gn[mn] = Qt, le(V, gn, !0), b() && Q()({ variantId: Qt });
            })(nt, qt), onOptionChange: (qt, mn, Qt) => (function(gn, hn, rr, Hn) {
              if (s().disableVariantOptionSync || gn !== 0) return;
              const Zn = hn - 1, dr = e(V).map((fn) => d().variants.find((Pn) => Pn.id === fn)).filter((fn) => fn != null).slice(1);
              dr.length !== 0 && dr.every((fn) => fn.options[Zn] === Hn) && le(V, e(V).map((fn) => {
                const Pn = d().variants.find((Rt) => Rt.id === fn);
                if (!Pn || Pn.options[Zn] !== Hn) return fn;
                const dt = [...Pn.options];
                dt[Zn] = rr;
                const ut = d().variants.find((Rt) => Rt.options.every((Nt, Ln) => Nt === dt[Ln]));
                return ut ? ut.id : fn;
              }), !0);
            })(nt, qt, mn, Qt) });
          }
          var kn = q(Dt, 2);
          {
            let zt = u(() => e(ee).get(e(V)[nt]));
            ia(kn, { get dealBlock() {
              return s();
            }, get variant() {
              return e(zt);
            } });
          }
          y(Bt), p(Ue, Bt);
        }), y(Mt), p(ct, Mt);
      };
      G(_t, (ct) => {
        e(we) && ct(St);
      });
      var tt = q(_t, 2), xt = (ct) => {
        {
          let Mt = u(() => B(i()));
          dl(ct, { get value() {
            return e(J);
          }, get min() {
            return e(Mt);
          }, onChange: (Xt) => le(J, Xt, !0) });
        }
      };
      G(tt, (ct) => {
        b() && i().dealBarType === pt.QuantityBreak && i().quantitySelector && ct(xt);
      });
      var It = q(tt, 2), Et = (ct) => {
        Ua(ct, { get product() {
          return d();
        }, get selectedVariantIds() {
          return e(V);
        }, get productPersonalisation() {
          return i().productPersonalisation;
        }, get quantity() {
          return e(N);
        }, get addPersonalisationModal() {
          return s().addPersonalisationModal;
        }, get onPersonalisationsChange() {
          return K();
        }, get initialValues() {
          return M();
        } });
      };
      G(It, (ct) => {
        b() && i().productPersonalisation && (s().blockLayout === "vertical" || s().blockLayout === "plain") && ct(Et);
      }), y(We);
      var Jt = q(We, 2);
      {
        let ct = u(() => i().upsells || []);
        wi(Jt, { get dealBlock() {
          return s();
        }, get dealBarId() {
          return i().id;
        }, get upsells() {
          return e(ct);
        }, get otherProducts() {
          return g();
        }, get complementaryProducts() {
          return f();
        }, get dealBarSelected() {
          return b();
        }, get dealSellingPlan() {
          return e(oe);
        }, onChange: (Mt) => {
          le(z, Mt, !0);
        } });
      }
      var Yt = q(Jt, 2);
      Bi(Yt, { get selectedDealBarIndex() {
        return D();
      }, get onChange() {
        return S();
      }, get dealBlock() {
        return s();
      }, get dealBar() {
        return i();
      }, get selected() {
        return b();
      }, get otherProducts() {
        return g();
      }, get sellingPlan() {
        return e(oe);
      }, get progressiveGifts() {
        return s().progressiveGifts;
      } });
      var un = q(Yt, 2);
      {
        let ct = u(() => i().freeGifts || []);
        yi(un, { get dealBlock() {
          return s();
        }, get freeGifts() {
          return e(ct);
        }, get freeGiftsSummary() {
          return i().freeGiftsSummary;
        }, get otherProducts() {
          return g();
        }, get dealBarSelected() {
          return b();
        }, get sellingPlan() {
          return e(oe);
        }, get mainProductVariantId() {
          return e(V)[0];
        }, onChange: (Mt) => {
          le(Z, Mt, !0);
        } });
      }
      var Kt = q(un, 2);
      {
        let ct = u(() => i().multipleGiftsSelectors || []);
        Si(Kt, { get dealBlock() {
          return s();
        }, get multipleGiftsSelectors() {
          return e(ct);
        }, get sellingPlan() {
          return e(oe);
        }, get otherProducts() {
          return g();
        }, onChange: (Mt) => {
          le(H, Mt, !0);
        } });
      }
      p(Ce, Ye);
    }, $$slots: { default: !0 } });
    var rn = q(yt, 2), jt = (Ce) => {
      Pi(Ce, { get showAsSoldOut() {
        return i().showAsSoldOut;
      }, get replaceLiquid() {
        return e(he);
      } });
    };
    G(rn, (Ce) => {
      i().showAsSoldOutEnabled && i().showAsSoldOut && Ce(jt);
    }), y(it), be((Ce) => {
      var bt;
      at = Lt(it, 1, "kaching-bundles__bar", null, at, Ce), Pe(it, "data-deal-bar-id", i().id), Vt(it, e(je)), Pe(st, "name", `kaching-bundles-deal-${(bt = v()) != null ? bt : ""}`), La(st, i().id), Pe(st, "id", e(ke)), Yi(st, b()), st.disabled = i().showAsSoldOutEnabled;
    }, [() => ({ "kaching-bundles__bar--selected": b() })]), p(n, it);
    var gt = Xe(Tt);
    return c(), gt;
  }
  On(["change"]), Qe(_o, { dealBlock: {}, dealBar: {}, product: {}, otherProducts: {}, complementaryProducts: {}, customQuantity: {}, currentVariantId: {}, componentId: {}, selected: {}, globalSellingPlan: {}, selectedDealBarIndex: {}, onProgressiveGiftsChange: {}, onDealBarSelect: {}, onDealBarDeselect: {}, onVariantSelect: {}, onVariantsChange: {}, onPersonalisationsChange: {}, personalisationInitialValues: {} }, [], [], !0);
  var gv = $('<div class="kaching-bundles"><!></div>');
  function Pu(n, t) {
    var r;
    Ke(t, !0);
    const a = m(t, "config", 7), l = m(t, "dealBlock", 7), o = m(t, "dealBar", 7), c = m(t, "translations", 7), s = m(t, "product", 7), i = m(t, "mediaImages", 23, () => []), d = m(t, "currentVariantId", 7), g = m(t, "variantBadges", 23, () => []), f = Math.random().toString(16).slice(2), { setConfig: h } = Qa(a()), { setMoneyFormat: _ } = mi(a().moneyFormat), { setTranslations: v } = Na(c()), { setMediaImages: b } = tl(i()), { setSwatchSettings: x } = Ki({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (r = l().showSelectedSwatchName) != null && r }), { setVariantBadges: D } = ou(g());
    Je(() => {
      h(a());
    }), Je(() => {
      _(a().moneyFormat, !!l().showPricesWithoutDecimals);
    }), Je(() => {
      v(c());
    }), Je(() => {
      b(i());
    }), Je(() => {
      var K;
      x({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (K = l().showSelectedSwatchName) != null && K });
    }), Je(() => {
      D(g());
    });
    const S = u(() => l() && Cd(l()));
    var I = { get config() {
      return a();
    }, set config(K) {
      a(K), k();
    }, get dealBlock() {
      return l();
    }, set dealBlock(K) {
      l(K), k();
    }, get dealBar() {
      return o();
    }, set dealBar(K) {
      o(K), k();
    }, get translations() {
      return c();
    }, set translations(K) {
      c(K), k();
    }, get product() {
      return s();
    }, set product(K) {
      s(K), k();
    }, get mediaImages() {
      return i();
    }, set mediaImages(K = []) {
      i(K), k();
    }, get currentVariantId() {
      return d();
    }, set currentVariantId(K) {
      d(K), k();
    }, get variantBadges() {
      return g();
    }, set variantBadges(K = []) {
      g(K), k();
    } }, W = gv(), Q = P(W), E = (K) => {
      _o(K, { selectedDealBarIndex: null, get dealBlock() {
        return l();
      }, get dealBar() {
        return o();
      }, get product() {
        return s();
      }, get currentVariantId() {
        return d();
      }, get componentId() {
        return f;
      }, selected: !0, onProgressiveGiftsChange: () => {
      }, onDealBarSelect: () => {
      }, onDealBarDeselect: () => {
      }, onVariantSelect: () => {
      }, onVariantsChange: () => {
      } });
    };
    return G(Q, (K) => {
      o().dealBarType && o().dealBarType !== pt.QuantityBreak && o().dealBarType !== pt.Bxgy || K(E);
    }), y(W), be(() => Vt(W, e(S))), p(n, W), Xe(I);
  }
  customElements.define("kaching-bundles-bar", Qe(Pu, { config: { attribute: "config", type: "Object" }, dealBlock: { attribute: "deal-block", type: "Object" }, dealBar: { attribute: "deal-bar", type: "Object" }, translations: { attribute: "translations", type: "Object" }, product: { attribute: "product", type: "Object" }, mediaImages: { attribute: "media-images", type: "Array" }, currentVariantId: { attribute: "current-variant-id", type: "Number" }, variantBadges: { attribute: "variant-badges", type: "Array" } }, [], [], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this;
    }
  }));
  var Su = !1;
  const Bu = class extends Date {
    constructor(...n) {
      super(...n), kt(this, ks), kt(this, qi, ze(super.getTime())), kt(this, yl, /* @__PURE__ */ new Map()), kt(this, _s, Gt), Su || ln(this, ks, Lo).call(this);
    }
  };
  qi = /* @__PURE__ */ new WeakMap(), yl = /* @__PURE__ */ new WeakMap(), _s = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakSet(), Lo = function() {
    Su = !0;
    var n = Bu.prototype, t = Date.prototype, r = Object.getOwnPropertyNames(t);
    for (const a of r) (a.startsWith("get") || a.startsWith("to") || a === "valueOf") && (n[a] = function(...l) {
      if (l.length > 0) return e(xe(this, qi)), t[a].apply(this, l);
      var o = xe(this, yl).get(a);
      if (o === void 0) {
        const c = Gt;
        Qn(xe(this, _s)), o = u(() => (e(xe(this, qi)), t[a].apply(this, l))), xe(this, yl).set(a, o), Qn(c);
      }
      return e(o);
    }), a.startsWith("set") && (n[a] = function(...l) {
      var o = t[a].apply(this, l);
      return le(xe(this, qi), t.getTime.call(this)), o;
    });
  };
  let ko = Bu;
  var hv = ["forEach", "isDisjointFrom", "isSubsetOf", "isSupersetOf"], pv = ["difference", "intersection", "symmetricDifference", "union"], Cu = !1;
  const mo = class extends Set {
    constructor(n) {
      if (super(), kt(this, wl), kt(this, Gi, /* @__PURE__ */ new Map()), kt(this, Ar, ze(0)), kt(this, Ma, ze(0)), kt(this, ms, Ir || -1), n) {
        for (var t of n) super.add(t);
        xe(this, Ma).v = super.size;
      }
      Cu || ln(this, wl, Eo).call(this);
    }
    has(n) {
      var t = super.has(n), r = xe(this, Gi), a = r.get(n);
      if (a === void 0) {
        if (!t) return e(xe(this, Ar)), !1;
        a = ln(this, wl, jo).call(this, !0), r.set(n, a);
      }
      return e(a), t;
    }
    add(n) {
      return super.has(n) || (super.add(n), le(xe(this, Ma), super.size), ir(xe(this, Ar))), this;
    }
    delete(n) {
      var t = super.delete(n), r = xe(this, Gi), a = r.get(n);
      return a !== void 0 && (r.delete(n), le(a, !1)), t && (le(xe(this, Ma), super.size), ir(xe(this, Ar))), t;
    }
    clear() {
      if (super.size !== 0) {
        super.clear();
        var n = xe(this, Gi);
        for (var t of n.values()) le(t, !1);
        n.clear(), le(xe(this, Ma), 0), ir(xe(this, Ar));
      }
    }
    keys() {
      return this.values();
    }
    values() {
      return e(xe(this, Ar)), super.values();
    }
    entries() {
      return e(xe(this, Ar)), super.entries();
    }
    [Symbol.iterator]() {
      return this.keys();
    }
    get size() {
      return e(xe(this, Ma));
    }
  };
  Gi = /* @__PURE__ */ new WeakMap(), Ar = /* @__PURE__ */ new WeakMap(), Ma = /* @__PURE__ */ new WeakMap(), ms = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakSet(), jo = function(n) {
    return Ir === xe(this, ms) ? ze(n) : Yr(n);
  }, Eo = function() {
    Cu = !0;
    var n = mo.prototype, t = Set.prototype;
    for (const r of hv) n[r] = function(...a) {
      return e(xe(this, Ar)), t[r].apply(this, a);
    };
    for (const r of pv) n[r] = function(...a) {
      e(xe(this, Ar));
      var l = t[r].apply(this, a);
      return new mo(l);
    };
  };
  let bv = mo;
  const Iu = class extends Map {
    constructor(n) {
      if (super(), kt(this, Hr), kt(this, Wr, /* @__PURE__ */ new Map()), kt(this, Ur, ze(0)), kt(this, da, ze(0)), kt(this, xs, Ir || -1), n) {
        for (var [t, r] of n) super.set(t, r);
        xe(this, da).v = super.size;
      }
    }
    has(n) {
      var t = xe(this, Wr), r = t.get(n);
      if (r === void 0) {
        if (super.get(n) === void 0) return e(xe(this, Ur)), !1;
        r = ln(this, Hr, Oi).call(this, 0), t.set(n, r);
      }
      return e(r), !0;
    }
    forEach(n, t) {
      ln(this, Hr, Pl).call(this), super.forEach(n, t);
    }
    get(n) {
      var t = xe(this, Wr), r = t.get(n);
      if (r === void 0) {
        if (super.get(n) === void 0) return void e(xe(this, Ur));
        r = ln(this, Hr, Oi).call(this, 0), t.set(n, r);
      }
      return e(r), super.get(n);
    }
    set(n, t) {
      var r, a = xe(this, Wr), l = a.get(n), o = super.get(n), c = super.set(n, t), s = xe(this, Ur);
      if (l === void 0) l = ln(this, Hr, Oi).call(this, 0), a.set(n, l), le(xe(this, da), super.size), ir(s);
      else if (o !== t) {
        ir(l);
        var i = s.reactions === null ? null : new Set(s.reactions);
        (i === null || !((r = l.reactions) != null && r.every((d) => i.has(d)))) && ir(s);
      }
      return c;
    }
    delete(n) {
      var t = xe(this, Wr), r = t.get(n), a = super.delete(n);
      return r !== void 0 && (t.delete(n), le(xe(this, da), super.size), le(r, -1), ir(xe(this, Ur))), a;
    }
    clear() {
      if (super.size !== 0) {
        super.clear();
        var n = xe(this, Wr);
        for (var t of (le(xe(this, da), 0), n.values())) le(t, -1);
        ir(xe(this, Ur)), n.clear();
      }
    }
    keys() {
      return e(xe(this, Ur)), super.keys();
    }
    values() {
      return ln(this, Hr, Pl).call(this), super.values();
    }
    entries() {
      return ln(this, Hr, Pl).call(this), super.entries();
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    get size() {
      return e(xe(this, da)), super.size;
    }
  };
  Wr = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), da = /* @__PURE__ */ new WeakMap(), xs = /* @__PURE__ */ new WeakMap(), Hr = /* @__PURE__ */ new WeakSet(), Oi = function(n) {
    return Ir === xe(this, xs) ? ze(n) : Yr(n);
  }, Pl = function() {
    e(xe(this, Ur));
    var n = xe(this, Wr);
    if (xe(this, da).v !== n.size) {
      for (var t of dm(Iu.prototype, this, "keys").call(this)) if (!n.has(t)) {
        var r = ln(this, Hr, Oi).call(this, 0);
        n.set(t, r);
      }
    }
    for ([, r] of xe(this, Wr)) e(r);
  };
  let fv = Iu;
  class vv {
    constructor(t, r) {
      kt(this, Sl), kt(this, Bl), mt(this, Sl, t), mt(this, Bl, lc(r));
    }
    get current() {
      return xe(this, Bl).call(this), xe(this, Sl).call(this);
    }
  }
  Sl = /* @__PURE__ */ new WeakMap(), Bl = /* @__PURE__ */ new WeakMap();
  const _v = /\(.+\)/, kv = /* @__PURE__ */ new Set(["all", "print", "screen", "and", "or", "not", "only"]);
  class mv extends vv {
    constructor(t, r) {
      let a = _v.test(t) || t.split(/[\s,]+/).some((o) => kv.has(o.trim())) ? t : `(${t})`;
      const l = window.matchMedia(a);
      super(() => l.matches, (o) => (function(c, s, i, d = {}) {
        var g = Os(s, c, i, d);
        return () => {
          c.removeEventListener(s, g, d);
        };
      })(l, "change", o));
    }
  }
  var xv = $('<img alt="" class="kaching-bundles__bundle-products__image"/>'), yv = $('<div class="kaching-bundles__bundle-products__image-placeholder"></div>');
  function xo(n, t) {
    Ke(t, !0);
    const r = m(t, "image", 7), a = m(t, "linkUrl", 7);
    var l = { get image() {
      return r();
    }, set image(d) {
      r(d), k();
    }, get linkUrl() {
      return a();
    }, set linkUrl(d) {
      a(d), k();
    } }, o = Be(), c = pe(o), s = (d) => {
      Xn(d, { get url() {
        return a();
      }, class: "kaching-bundles__bundle-products__link", children: (g, f) => {
        var h = xv();
        Pe(h, "height", 50), Pe(h, "width", 50), be(() => Pe(h, "src", r())), p(g, h);
      }, $$slots: { default: !0 } });
    }, i = (d) => {
      p(d, yv());
    };
    return G(c, (d) => {
      r() ? d(s) : d(i, !1);
    }), p(n, o), Xe(l);
  }
  Qe(xo, { image: {}, linkUrl: {} }, [], [], !0);
  var wv = $('<span class="kaching-bundles__bundle-products__quantity"> </span>'), Pv = $('<div class="kaching-bundles__bundle-products__title"><!> <span> </span></div>');
  function yo(n, t) {
    Ke(t, !0);
    const r = m(t, "title", 7), a = m(t, "quantity", 7), l = m(t, "linkUrl", 7);
    var o = { get title() {
      return r();
    }, set title(c) {
      r(c), k();
    }, get quantity() {
      return a();
    }, set quantity(c) {
      a(c), k();
    }, get linkUrl() {
      return l();
    }, set linkUrl(c) {
      l(c), k();
    } };
    return Xn(n, { get url() {
      return l();
    }, class: "kaching-bundles__bundle-products__link", children: (c, s) => {
      var i = Pv(), d = P(i), g = (_) => {
        var v = wv(), b = P(v);
        y(v), be(() => {
          var x;
          return ft(b, `${(x = a()) != null ? x : ""}x`);
        }), p(_, v);
      };
      G(d, (_) => {
        a() > 1 && _(g);
      });
      var f = q(d, 2), h = P(f, !0);
      y(f), y(i), be(() => ft(h, r())), p(c, i);
    }, $$slots: { default: !0 } }), Xe(o);
  }
  Qe(yo, { title: {}, quantity: {}, linkUrl: {} }, [], [], !0);
  var Sv = $('<span class="kaching-bundles__bundle-products__price"><!></span>'), Bv = $('<span class="kaching-bundles__bundle-products__full-price"><!></span>'), Cv = $('<span class="kaching-bundles__bundle-products__unit-price"><!> </span>'), Iv = $("<div><!> <!> <!></div>");
  function ss(n, t) {
    Ke(t, !0);
    const r = () => Ie(g, "$formatPrice", a), [a, l] = vt();
    let o = m(t, "discountedPrice", 7), c = m(t, "fullPrice", 7), s = m(t, "unitPrice", 7), i = m(t, "unitPriceReference", 7), d = m(t, "ignoreUnitPrice", 7);
    const g = cn(), f = u(() => !!s() && !!i() && !d());
    var h = { get discountedPrice() {
      return o();
    }, set discountedPrice(Q) {
      o(Q), k();
    }, get fullPrice() {
      return c();
    }, set fullPrice(Q) {
      c(Q), k();
    }, get unitPrice() {
      return s();
    }, set unitPrice(Q) {
      s(Q), k();
    }, get unitPriceReference() {
      return i();
    }, set unitPriceReference(Q) {
      i(Q), k();
    }, get ignoreUnitPrice() {
      return d();
    }, set ignoreUnitPrice(Q) {
      d(Q), k();
    } }, _ = Iv();
    let v;
    var b = P(_);
    rt(b, o, (Q) => {
      var E = Sv();
      Ve(P(E), () => r()(o())), y(E), p(Q, E);
    });
    var x = q(b, 2), D = (Q) => {
      var E = Be();
      rt(pe(E), c, (K) => {
        var M = Bv();
        Ve(P(M), () => r()(c())), y(M), p(K, M);
      }), p(Q, E);
    };
    G(x, (Q) => {
      o() < c() && Q(D);
    });
    var S = q(x, 2), I = (Q) => {
      var E = Be();
      rt(pe(E), s, (K) => {
        var M = Cv(), te = P(M);
        Ve(te, () => r()(s(), { preserveDecimals: !0 }));
        var A = q(te);
        y(M), be(() => {
          var L;
          return ft(A, ` / ${(L = i()) != null ? L : ""}`);
        }), p(K, M);
      }), p(Q, E);
    };
    G(S, (Q) => {
      s() && i() && !d() && Q(I);
    }), y(_), be((Q) => v = Lt(_, 1, "kaching-bundles__bundle-products__pricing", null, v, Q), [() => ({ "kaching-bundles__bundle-products__pricing--with-unit-price": e(f) })]), p(n, _);
    var W = Xe(h);
    return l(), W;
  }
  Qe(ss, { discountedPrice: {}, fullPrice: {}, unitPrice: {}, unitPriceReference: {}, ignoreUnitPrice: {} }, [], [], !0);
  var Mv = $("<!> <!> <!> <!> <!>", 1), zv = $("<!> <!>", 1), $v = $('<div class="kaching-bundles__bundle-products__wrapper"><!> <div class="kaching-bundles__bundle-products__content"><!> <!> <!></div></div> <!>', 1), Dv = $('<div class="kaching-bundles__bundle-products__product"><!></div>');
  function Mu(n, t) {
    Ke(t, !0);
    const r = () => Ie(D, "$config", a), [a, l] = vt();
    let o = m(t, "dealBlock", 7), c = m(t, "layout", 7), s = m(t, "bundleProduct", 7), i = m(t, "product", 7), d = m(t, "dealBarSelected", 7), g = m(t, "currentVariantId", 7), f = m(t, "mainVariantId", 7), h = m(t, "priceRounding", 7), _ = m(t, "sellingPlan", 7), v = m(t, "dealBar", 7), b = m(t, "sets", 7), x = m(t, "onChange", 7);
    const D = _n(), S = cn();
    let I = ze(void 0);
    const W = u(() => !!s().variantGIDs), Q = u(() => {
      var w, U;
      return e(W) && i() ? i().variants.filter((oe) => s().variantGIDs.some((j) => Zt(j) === oe.id)) : (U = (w = i()) == null ? void 0 : w.variants) != null ? U : [];
    }), E = u(() => {
      var w, U, oe, j;
      const re = s().productGID === "default", Y = !!((w = o().defaultVariantsV2) != null && w.length);
      if (re && Y && i()) {
        const ie = i().id, _e = (j = (oe = (U = o().defaultVariantsV2) == null ? void 0 : U.find((Se) => Zt(Se.productGID) === ie && Se.dealBarId === v().id)) == null ? void 0 : oe.variantGIDs) == null ? void 0 : j[0];
        if (_e) return Zt(_e);
      }
      if (s().defaultVariantGID) return Zt(s().defaultVariantGID);
    }), K = u(() => {
      const w = e(I) || e(E);
      return w !== void 0 && e(Q).some(({ id: U }) => U === w) ? w : s().productGID === "default" && g() ? g() : s().variantGIDs ? s().variantGIDs.length === 0 ? void 0 : Zt(s().variantGIDs[0]) : e(Q).length > 0 ? e(Q)[0].id : void 0;
    }), M = u(() => {
      var w;
      return e(K) ? (w = i()) == null ? void 0 : w.variants.find((U) => U.id === e(K)) : void 0;
    }), te = u(() => i() && e(M) && er(i(), e(M), _())), A = u(() => s().quantity * b()), L = u(() => ra({ discountType: s().discountType, discountValue: s().discountValue, discountQuantity: s().quantity, variantQuantities: e(M) ? [{ variant: e(M), quantity: e(A) }] : [], currencyRate: r().currencyRate, priceRounding: h(), sellingPlan: e(te) })), se = u(() => (function(w) {
      if (!w) return 0;
      let U = w.price;
      return o().useProductCompareAtPrice && w.compareAtPrice && (U = Math.max(U, w.compareAtPrice)), U * e(A);
    })(e(M))), Z = u(() => e(M) ? ro(e(M)) : null), H = u(() => e(M) ? kr([{ variant: e(M), quantity: e(A) }]) : null), z = u(() => e(H) ? e(L) / e(H) : null), C = u(() => {
      var w;
      return (w = i()) != null && w.url && e(M) ? `${i().url}?variant=${e(M).id}` : void 0;
    }), R = u(() => {
      var w, U;
      return ((w = e(M)) == null ? void 0 : w.image) || ((U = i()) == null ? void 0 : U.image);
    }), N = u(() => d() && i() && e(Q).length > 1 && e(K)), J = u(() => d() && s().productGID !== "default" ? e(C) : void 0), X = u(() => i() ? s().title ? dn({ priceFormatter: Ie(S, "$formatPrice", a), product: i(), totalFullPrice: e(se), totalDiscountedPrice: e(L), quantity: e(A), unitQuantity: e(H) })(s().title) : i().title : "");
    function B(w) {
      le(I, w, !0);
    }
    let F;
    Je(() => {
      e(M) && e(A) && nn(() => {
        x()({ variant: e(M), product: i(), quantity: e(A) });
      });
    }), pr(() => {
      s().productGID, le(I, void 0), F = void 0;
    }), pr(() => {
      const w = s().productGID === "default";
      if (!(w || !o().disableVariantOptionSync)) return;
      const U = w ? g() : f();
      if (!U || !i() || U === F) return;
      const oe = F;
      if (F = U, !e(Q).some((Y) => Y.id === U)) return;
      const j = e(I) === void 0 && e(E) === void 0, re = e(I) === oe && oe !== void 0;
      (j || re) && le(I, U, !0);
    });
    var V = { get dealBlock() {
      return o();
    }, set dealBlock(w) {
      o(w), k();
    }, get layout() {
      return c();
    }, set layout(w) {
      c(w), k();
    }, get bundleProduct() {
      return s();
    }, set bundleProduct(w) {
      s(w), k();
    }, get product() {
      return i();
    }, set product(w) {
      i(w), k();
    }, get dealBarSelected() {
      return d();
    }, set dealBarSelected(w) {
      d(w), k();
    }, get currentVariantId() {
      return g();
    }, set currentVariantId(w) {
      g(w), k();
    }, get mainVariantId() {
      return f();
    }, set mainVariantId(w) {
      f(w), k();
    }, get priceRounding() {
      return h();
    }, set priceRounding(w) {
      h(w), k();
    }, get sellingPlan() {
      return _();
    }, set sellingPlan(w) {
      _(w), k();
    }, get dealBar() {
      return v();
    }, set dealBar(w) {
      v(w), k();
    }, get sets() {
      return b();
    }, set sets(w) {
      b(w), k();
    }, get onChange() {
      return x();
    }, set onChange(w) {
      x(w), k();
    } }, O = Be(), ee = pe(O), ge = (w) => {
      var U = Dv(), oe = P(U), j = (Y) => {
        var ie = Mv(), _e = pe(ie);
        xo(_e, { get image() {
          return e(R);
        }, get linkUrl() {
          return e(J);
        } });
        var Se = q(_e, 2);
        yo(Se, { get title() {
          return e(X);
        }, get quantity() {
          return e(A);
        }, get linkUrl() {
          return e(J);
        } });
        var me = q(Se, 2), ye = (de) => {
          ss(de, { get discountedPrice() {
            return e(L);
          }, get fullPrice() {
            return e(se);
          }, get unitPrice() {
            return e(z);
          }, get unitPriceReference() {
            return e(Z);
          }, get ignoreUnitPrice() {
            return r().ignoreUnitPrice;
          } });
        };
        G(me, (de) => {
          s().hidePrice || de(ye);
        });
        var he = q(me, 2);
        ia(he, { get dealBlock() {
          return o();
        }, get variant() {
          return e(M);
        } });
        var ce = q(he, 2), ae = (de) => {
          {
            let fe = u(() => ({ ...i(), variants: e(Q) })), $e = u(() => e(K) || 0);
            Un(de, { get product() {
              return e(fe);
            }, get selectedVariantId() {
              return e($e);
            }, onChange: B });
          }
        };
        G(ce, (de) => {
          e(N) && de(ae);
        }), p(Y, ie);
      }, re = (Y) => {
        var ie = $v(), _e = pe(ie), Se = P(_e);
        xo(Se, { get image() {
          return e(R);
        }, get linkUrl() {
          return e(J);
        } });
        var me = q(Se, 2), ye = P(me);
        yo(ye, { get title() {
          return e(X);
        }, get quantity() {
          return e(A);
        }, get linkUrl() {
          return e(J);
        } });
        var he = q(ye, 2);
        ia(he, { get dealBlock() {
          return o();
        }, get variant() {
          return e(M);
        } });
        var ce = q(he, 2), ae = ($e) => {
          var qe = zv(), De = pe(qe);
          {
            let we = u(() => ({ ...i(), variants: e(Q) }));
            na(De, { get product() {
              return e(we);
            } });
          }
          var ne = q(De, 2);
          {
            let we = u(() => ({ ...i(), variants: e(Q) })), Ze = u(() => e(K) || 0);
            Un(ne, { get product() {
              return e(we);
            }, get selectedVariantId() {
              return e(Ze);
            }, onChange: B });
          }
          p($e, qe);
        };
        G(ce, ($e) => {
          e(N) && $e(ae);
        }), y(me), y(_e);
        var de = q(_e, 2), fe = ($e) => {
          ss($e, { get discountedPrice() {
            return e(L);
          }, get fullPrice() {
            return e(se);
          }, get unitPrice() {
            return e(z);
          }, get unitPriceReference() {
            return e(Z);
          }, get ignoreUnitPrice() {
            return r().ignoreUnitPrice;
          } });
        };
        G(de, ($e) => {
          s().hidePrice || $e(fe);
        }), p(Y, ie);
      };
      G(oe, (Y) => {
        c() === "horizontal" ? Y(j) : Y(re, !1);
      }), y(U), p(w, U);
    };
    G(ee, (w) => {
      i() && w(ge);
    }), p(n, O);
    var T = Xe(V);
    return l(), T;
  }
  Qe(Mu, { dealBlock: {}, layout: {}, bundleProduct: {}, product: {}, dealBarSelected: {}, currentVariantId: {}, mainVariantId: {}, priceRounding: {}, sellingPlan: {}, dealBar: {}, sets: {}, onChange: {} }, [], [], !0);
  var Av = Tn('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="currentColor"></circle><path fill="#fff" d="M5 9h10v2H5z"></path><path fill="#fff" d="M11 5v10H9V5z"></path></svg>');
  function zu(n) {
    p(n, Av());
  }
  function Vv(n, t, r) {
    t()({ dealBarId: r().id, preselected: !1 });
  }
  Qe(zu, {}, [], [], !0);
  var Tv = $('<img class="kaching-bundles__bar-image" alt=""/>'), qv = $('<div class="kaching-bundles__bar-radio"></div>'), Gv = $('<span class="kaching-bundles__bar-title"><!></span>'), Ov = $('<span class="kaching-bundles__bar-label"><!></span>'), Fv = $('<div class="kaching-bundles__bar-subtitle"><!></div>'), Lv = $('<div class="kaching-bundles__bar-full-price"><!></div>'), jv = $('<div class="kaching-bundles__bar-price"><!></div>'), Ev = $('<div class="kaching-bundles__bar-full-price"><!></div>'), Rv = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--secondary"><!> <!></div>'), Nv = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--main"><!> <!></div> <!>', 1), Qv = $('<div class="kaching-bundles__bar-full-price"><!></div>'), Wv = $("<!> <!>", 1), Uv = $('<!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!> <!></div> <!></div> <div class="kaching-bundles__bar-pricing"><!></div></div>', 1), Hv = $('<div class="kaching-bundles__bundle-products__product kaching-bundles__bundle-products__product--placeholder"><span>Select product</span></div>'), Zv = $('<div class="kaching-bundles__bundle-products__divider"><div class="kaching-bundles__bundle-products__divider-line">&ZeroWidthSpace;</div> <div class="kaching-bundles__bundle-products__divider-icon"><!></div> <div class="kaching-bundles__bundle-products__divider-line">&ZeroWidthSpace;</div></div>'), Jv = $("<!> <!>", 1), Yv = $("<div></div>"), Kv = $('<!> <div class="kaching-bundles__bar-wrapper"><!> <!> <!> <!> <!></div> <!> <!> <!> <!>', 1), Xv = $('<div><input type="radio"/> <!> <!></div>');
  function $u(n, t) {
    Ke(t, !0);
    const r = () => Ie(L, "$config", o), a = () => Ie(te, "$formatPrice", o), l = () => Ie(M, "$translate", o), [o, c] = vt(), s = m(t, "dealBlock", 7), i = m(t, "dealBar", 7), d = m(t, "product", 7), g = m(t, "otherProducts", 23, () => []), f = m(t, "complementaryProducts", 23, () => []), h = m(t, "currentVariantId", 7), _ = m(t, "componentId", 7), v = m(t, "selectedDealBarIndex", 7), b = m(t, "selected", 7, !1), x = m(t, "sellingPlan", 7), D = m(t, "onProgressiveGiftsChange", 7), S = m(t, "onDealBarSelect", 7), I = m(t, "onDealBarDeselect", 7), W = m(t, "onVariantSelect", 7), Q = m(t, "onVariantsChange", 7), E = m(t, "onPersonalisationsChange", 7), K = m(t, "personalisationInitialValues", 23, () => []), M = Ct(), te = cn(), A = Fn(), L = _n();
    let se = ze(lt({})), Z = ze(lt([])), H = ze(lt([])), z = ze(lt([])), C = ze(1);
    const R = u(() => `${i().id}_${_()}`), N = u(() => i().bundleProducts.filter(({ productGID: ke }) => ke)), J = u(() => e(N).every((ke) => fe(ke, d(), g()))), X = u(() => i().showProductsOnlyWhenSelected && !b()), B = u(() => e(N).every((ke) => {
      var Me;
      const Ge = fe(ke, d(), g());
      return (Me = Ge == null ? void 0 : Ge.availableForSale) != null && Me;
    })), F = u(() => s() ? (function(ke, Me) {
      return i().bundleProducts.map((Ae) => {
        const je = Me[Ae.id];
        if (!je) return 0;
        const { variant: Tt, quantity: it } = je;
        let at = Tt.price;
        return Tt.compareAtPrice && ke.useProductCompareAtPrice && (at = Math.max(at, Tt.compareAtPrice)), at * it;
      }).reduce((Ae, je) => Ae + je, 0);
    })(s(), e(se)) : 0), V = u(() => ll(e(F), e(Z), e(H))), O = u(() => s().priceRounding ? { perItem: s().showPricesPerItem, precision: s().priceRoundingPrecision, v2: r().featureFlags.price_rounding_v2 || !1 } : void 0), ee = u(() => s() ? oo(i(), e(se), r().currencyRate, e(O), x()) : 0), ge = u(() => e(N).reduce((ke, Me) => ke + Me.quantity, 0) * e(C)), T = u(() => Math.ceil(e(ee) / (e(ge) || 1))), w = u(() => Math.ceil(e(F) / (e(ge) || 1))), U = u(() => go(e(ge) === 1, e(V), e(w))), oe = u(() => e(V) > e(ee)), j = u(() => kr(Object.values(e(se)))), re = u(() => e(N).every((ke) => ke.productGID === "default" || Zt(ke.productGID) === d().id)), Y = u(() => {
      var ke;
      const Me = e(N)[0];
      if (Me) return (ke = e(se)[Me.id]) == null ? void 0 : ke.variant.id;
    }), ie = u(() => s().showPricesPerItem && e(re)), _e = u(() => dn({ priceFormatter: a(), product: d(), dealBar: i(), totalFullPrice: e(F), totalCompareAtPrice: e(V), totalDiscountedPrice: e(ee), quantity: 1, unitQuantity: e(j), sellingPlan: x() })), Se = u(() => e(_e)(l()(i().title))), me = u(() => e(_e)(l()(i().subtitle))), ye = u(() => e(_e)(l()(i().label))), he = u(() => al(s(), i()).map((ke) => ka(ke, l(), e(_e)))), ce = u(() => ma(e(he))), ae = u(() => Ie(A, "$getMediaImageUrl", o)(i().mediaImageGID) || sl);
    function de(ke) {
      b() && (ke.preventDefault(), ke.stopPropagation(), I()());
    }
    function fe(ke, Me, Ge) {
      if (ke.productGID) return ke.productGID === "default" ? Me : Ge.find((Ae) => Ae.id === Zt(ke.productGID));
    }
    Fa(() => {
      b() && S()({ dealBarId: i().id, preselected: !0 });
    }), Je(() => {
      b() && (ga(e(se)), ga(e(z)), ga(e(Z)), ga(e(H)), x(), nn(() => {
        (function() {
          if (!i().bundleProducts.map(({ id: it }) => it).every((it) => e(se)[it])) return;
          const ke = [];
          for (const it of i().bundleProducts) {
            const at = e(se)[it.id];
            at && ke.push({ id: it.id, variant: at.variant, product: at.product, quantity: at.quantity });
          }
          if (ke.length === 0) return;
          const Me = e(ee) + e(z).reduce((it, at) => it + at.discountedPrice, 0), Ge = e(Z).reduce((it, at) => at.showPrice ? it + at.fullPrice : it, 0) + e(H).reduce((it, at) => it + at.fullPrice * at.quantity, 0), Ae = e(F) + e(z).reduce((it, at) => it + at.fullPrice, 0) + Ge, je = oo(i(), e(se), r().currencyRate, e(O), void 0), Tt = d().sellingPlans.map((it) => ({ sellingPlanId: it.id, discountedPrice: oo(i(), e(se), r().currencyRate, e(O), it) }));
          Q()({ bundleProducts: ke, freeGifts: [...e(Z), ...e(H)], upsells: e(z), pricing: { discountedPrice: Me, fullPrice: Ae, giftValue: Ge, discountedPricePerItem: e(ee), fullPricePerItem: e(F), discountedPriceWithoutSellingPlan: je, discountedPricesForSellingPlans: Tt } });
        })();
      }));
    });
    const $e = u(() => i().showAsSoldOutEnabled && i().showAsSoldOut ? cl(i().showAsSoldOut) : "");
    var qe = { get dealBlock() {
      return s();
    }, set dealBlock(ke) {
      s(ke), k();
    }, get dealBar() {
      return i();
    }, set dealBar(ke) {
      i(ke), k();
    }, get product() {
      return d();
    }, set product(ke) {
      d(ke), k();
    }, get otherProducts() {
      return g();
    }, set otherProducts(ke = []) {
      g(ke), k();
    }, get complementaryProducts() {
      return f();
    }, set complementaryProducts(ke = []) {
      f(ke), k();
    }, get currentVariantId() {
      return h();
    }, set currentVariantId(ke) {
      h(ke), k();
    }, get componentId() {
      return _();
    }, set componentId(ke) {
      _(ke), k();
    }, get selectedDealBarIndex() {
      return v();
    }, set selectedDealBarIndex(ke) {
      v(ke), k();
    }, get selected() {
      return b();
    }, set selected(ke = !1) {
      b(ke), k();
    }, get sellingPlan() {
      return x();
    }, set sellingPlan(ke) {
      x(ke), k();
    }, get onProgressiveGiftsChange() {
      return D();
    }, set onProgressiveGiftsChange(ke) {
      D(ke), k();
    }, get onDealBarSelect() {
      return S();
    }, set onDealBarSelect(ke) {
      S(ke), k();
    }, get onDealBarDeselect() {
      return I();
    }, set onDealBarDeselect(ke) {
      I(ke), k();
    }, get onVariantSelect() {
      return W();
    }, set onVariantSelect(ke) {
      W(ke), k();
    }, get onVariantsChange() {
      return Q();
    }, set onVariantsChange(ke) {
      Q(ke), k();
    }, get onPersonalisationsChange() {
      return E();
    }, set onPersonalisationsChange(ke) {
      E(ke), k();
    }, get personalisationInitialValues() {
      return K();
    }, set personalisationInitialValues(ke = []) {
      K(ke), k();
    } }, De = Be(), ne = pe(De), we = (ke) => {
      var Me = Xv();
      let Ge;
      var Ae = P(Me);
      ea(Ae), Ae.__change = [Vv, S, i];
      var je = q(Ae, 2);
      Wa(je, { get for() {
        return e(R);
      }, get soldOut() {
        return i().showAsSoldOutEnabled;
      }, get borderHost() {
        return e(ce);
      }, children: (at, st) => {
        var yt = Kv(), rn = pe(yt);
        $t(rn, 17, () => e(he), (tt) => tt.id, (tt, xt) => {
          aa(tt, { get badge() {
            return e(xt);
          }, get blockLayout() {
            return s().blockLayout;
          } });
        });
        var jt = q(rn, 2), gt = P(jt);
        Ht(gt, { element: "div", class: "kaching-bundles__bar-main", onclick: de, children: (tt, xt) => {
          var It = Uv(), Et = pe(It), Jt = (zt) => {
            var qt = Tv();
            be(() => Pe(qt, "src", e(ae))), p(zt, qt);
          }, Yt = (zt) => {
            p(zt, qv());
          };
          G(Et, (zt) => {
            i().mediaImageGID ? zt(Jt) : zt(Yt, !1);
          });
          var un = q(Et, 2), Kt = P(un), ct = P(Kt), Mt = P(ct);
          rt(Mt, () => e(Se), (zt) => {
            var qt = Gv();
            Ve(P(qt), () => e(Se)), y(qt), p(zt, qt);
          });
          var Xt = q(Mt, 2), Ue = (zt) => {
            var qt = Be();
            rt(pe(qt), () => e(ye), (mn) => {
              var Qt = Ov();
              Ve(P(Qt), () => e(ye)), y(Qt), p(mn, Qt);
            }), p(zt, qt);
          };
          G(Xt, (zt) => {
            e(ye) && zt(Ue);
          }), y(ct);
          var He = q(ct, 2), nt = (zt) => {
            var qt = Be();
            rt(pe(qt), () => e(me), (mn) => {
              var Qt = Fv();
              Ve(P(Qt), () => e(me)), y(Qt), p(mn, Qt);
            }), p(zt, qt);
          };
          G(He, (zt) => {
            e(me) && zt(nt);
          }), y(Kt);
          var Bt = q(Kt, 2), Dt = P(Bt), kn = (zt) => {
            var qt = Be(), mn = pe(qt), Qt = (hn) => {
              var rr = Nv(), Hn = pe(rr), Zn = P(Hn);
              rt(Zn, () => e(T), (ut) => {
                Lr(ut, { get amount() {
                  return e(T);
                }, get showPricesPerItem() {
                  return e(ie);
                }, get unitLabel() {
                  return s().unitLabel;
                } });
              });
              var dr = q(Zn, 2), fn = (ut) => {
                var Rt = Be();
                rt(pe(Rt), () => e(U), (Nt) => {
                  var Ln = Lv();
                  Ve(P(Ln), () => a()(e(U))), y(Ln), be((Sn) => Pe(Ln, "data-a11y-label", Sn), [() => l()("system.original_price")]), p(Nt, Ln);
                }), p(ut, Rt);
              };
              G(dr, (ut) => {
                e(oe) && ut(fn);
              }), y(Hn);
              var Pn = q(Hn, 2), dt = (ut) => {
                var Rt = Rv(), Nt = P(Rt);
                rt(Nt, () => e(ee), (xn) => {
                  var Bn = jv();
                  Ve(P(Bn), () => a()(e(ee))), y(Bn), be((Ut) => Pe(Bn, "data-a11y-label", Ut), [() => l()("system.price")]), p(xn, Bn);
                });
                var Ln = q(Nt, 2), Sn = (xn) => {
                  var Bn = Be();
                  rt(pe(Bn), () => e(V), (Ut) => {
                    var sn = Ev();
                    Ve(P(sn), () => a()(e(V))), y(sn), be((Cn) => Pe(sn, "data-a11y-label", Cn), [() => l()("system.original_price")]), p(Ut, sn);
                  }), p(xn, Bn);
                };
                G(Ln, (xn) => {
                  e(oe) && xn(Sn);
                }), y(Rt), p(ut, Rt);
              };
              G(Pn, (ut) => {
                e(ge) > 1 && ut(dt);
              }), p(hn, rr);
            }, gn = (hn) => {
              var rr = Wv(), Hn = pe(rr);
              rt(Hn, () => e(ee), (fn) => {
                {
                  let Pn = u(() => e(ie) ? e(T) : e(ee));
                  Lr(fn, { get amount() {
                    return e(Pn);
                  }, get showPricesPerItem() {
                    return e(ie);
                  }, get unitLabel() {
                    return s().unitLabel;
                  } });
                }
              });
              var Zn = q(Hn, 2), dr = (fn) => {
                var Pn = Be();
                rt(pe(Pn), () => e(ie) ? e(U) : e(V), (dt) => {
                  var ut = Qv();
                  Ve(P(ut), () => a()(e(ie) ? e(U) : e(V))), y(ut), be((Rt) => Pe(ut, "data-a11y-label", Rt), [() => l()("system.original_price")]), p(dt, ut);
                }), p(fn, Pn);
              };
              G(Zn, (fn) => {
                e(oe) && fn(dr);
              }), p(hn, rr);
            };
            G(mn, (hn) => {
              s().showBothPrices && e(re) ? hn(Qt) : hn(gn, !1);
            }), p(zt, qt);
          };
          G(Dt, (zt) => {
            e(J) && zt(kn);
          }), y(Bt), y(un), p(tt, It);
        }, $$slots: { default: !0 } });
        var Ce = q(gt, 2), bt = (tt) => {
          ya(tt, { get highlights() {
            return i().highlights;
          }, get isSelected() {
            return b();
          }, get replaceLiquid() {
            return e(_e);
          } });
        };
        G(Ce, (tt) => {
          i().highlights && tt(bt);
        });
        var Ye = q(Ce, 2), ve = (tt) => {
          dl(tt, { get value() {
            return e(C);
          }, onChange: (xt) => {
            le(C, xt, !0);
          } });
        };
        G(Ye, (tt) => {
          b() && i().quantitySelector && tt(ve);
        });
        var We = q(Ye, 2), Ee = (tt) => {
          var xt = Yv();
          let It;
          $t(xt, 23, () => i().bundleProducts, (Et) => Et.id, (Et, Jt, Yt) => {
            var un = Jv(), Kt = pe(un), ct = (He) => {
              {
                let nt = u(() => fe(e(Jt), d(), g())), Bt = u(() => i().layout || "horizontal");
                Mu(He, { get dealBar() {
                  return i();
                }, get bundleProduct() {
                  return e(Jt);
                }, get product() {
                  return e(nt);
                }, get dealBlock() {
                  return s();
                }, get layout() {
                  return e(Bt);
                }, get dealBarSelected() {
                  return b();
                }, get priceRounding() {
                  return e(O);
                }, get currentVariantId() {
                  return h();
                }, get mainVariantId() {
                  return e(Y);
                }, get sellingPlan() {
                  return x();
                }, get sets() {
                  return e(C);
                }, onChange: (Dt) => (function(kn, zt) {
                  const { variant: qt, product: mn, quantity: Qt } = zt;
                  e(se)[kn] = { variant: qt, product: mn, quantity: Qt }, b() && i().bundleProducts.map(({ id: gn }) => gn).every((gn) => e(se)[gn]) && kn === i().bundleProducts[0].id && W()({ variantId: qt.id });
                })(e(Jt).id, Dt) });
              }
            }, Mt = (He) => {
              var nt = Be(), Bt = pe(nt), Dt = (kn) => {
                p(kn, Hv());
              };
              G(Bt, (kn) => {
                r().preview && kn(Dt);
              }, !0), p(He, nt);
            };
            G(Kt, (He) => {
              e(Jt).productGID ? He(ct) : He(Mt, !1);
            });
            var Xt = q(Kt, 2), Ue = (He) => {
              var nt = Zv(), Bt = q(P(nt), 2);
              zu(P(Bt)), y(Bt), ua(2), y(nt), p(He, nt);
            };
            G(Xt, (He) => {
              e(Yt) < i().bundleProducts.length - 1 && He(Ue);
            }), p(Et, un);
          }), y(xt), be((Et) => It = Lt(xt, 1, "kaching-bundles__bundle-products", null, It, Et), [() => ({ "kaching-bundles__bundle-products--vertical": i().layout === "vertical", "kaching-bundles__bundle-products--hidden": e(X) })]), p(tt, xt);
        };
        G(We, (tt) => {
          e(J) && tt(Ee);
        });
        var et = q(We, 2), Te = (tt) => {
          {
            let xt = u(() => e(Y) ? [e(Y)] : []);
            Ua(tt, { get product() {
              return d();
            }, get productPersonalisation() {
              return i().productPersonalisation;
            }, get selectedVariantIds() {
              return e(xt);
            }, get quantity() {
              return e(C);
            }, get addPersonalisationModal() {
              return s().addPersonalisationModal;
            }, get onPersonalisationsChange() {
              return E();
            }, get initialValues() {
              return K();
            } });
          }
        };
        G(et, (tt) => {
          b() && i().productPersonalisation && (s().blockLayout === "vertical" || s().blockLayout === "plain") && tt(Te);
        }), y(jt);
        var Ne = q(jt, 2);
        {
          let tt = u(() => i().upsells || []);
          wi(Ne, { get dealBlock() {
            return s();
          }, get dealBarId() {
            return i().id;
          }, get upsells() {
            return e(tt);
          }, get otherProducts() {
            return g();
          }, get complementaryProducts() {
            return f();
          }, get dealBarSelected() {
            return b();
          }, get dealSellingPlan() {
            return x();
          }, get sets() {
            return e(C);
          }, onChange: (xt) => {
            le(z, xt, !0);
          } });
        }
        var ot = q(Ne, 2);
        Bi(ot, { get selectedDealBarIndex() {
          return v();
        }, get onChange() {
          return D();
        }, get dealBlock() {
          return s();
        }, get dealBar() {
          return i();
        }, get otherProducts() {
          return g();
        }, get selected() {
          return b();
        }, get sellingPlan() {
          return x();
        }, get progressiveGifts() {
          return s().progressiveGifts;
        } });
        var _t = q(ot, 2);
        {
          let tt = u(() => i().freeGifts || []);
          yi(_t, { get dealBlock() {
            return s();
          }, get freeGifts() {
            return e(tt);
          }, get freeGiftsSummary() {
            return i().freeGiftsSummary;
          }, get otherProducts() {
            return g();
          }, get dealBarSelected() {
            return b();
          }, get sellingPlan() {
            return x();
          }, get sets() {
            return e(C);
          }, onChange: (xt) => {
            le(Z, xt, !0);
          } });
        }
        var St = q(_t, 2);
        {
          let tt = u(() => i().multipleGiftsSelectors || []);
          Si(St, { get dealBlock() {
            return s();
          }, get multipleGiftsSelectors() {
            return e(tt);
          }, get sellingPlan() {
            return x();
          }, get otherProducts() {
            return g();
          }, onChange: (xt) => {
            le(H, xt, !0);
          } });
        }
        p(at, yt);
      }, $$slots: { default: !0 } });
      var Tt = q(je, 2), it = (at) => {
        Pi(at, { get showAsSoldOut() {
          return i().showAsSoldOut;
        }, get replaceLiquid() {
          return e(_e);
        } });
      };
      G(Tt, (at) => {
        i().showAsSoldOutEnabled && i().showAsSoldOut && at(it);
      }), y(Me), be((at) => {
        var st;
        Ge = Lt(Me, 1, "kaching-bundles__bar", null, Ge, at), Pe(Me, "data-deal-bar-id", i().id), Vt(Me, e($e)), Pe(Ae, "name", `kaching-bundles-deal-${(st = _()) != null ? st : ""}`), La(Ae, i().id), Pe(Ae, "id", e(R)), Yi(Ae, b()), Ae.disabled = i().showAsSoldOutEnabled;
      }, [() => ({ "kaching-bundles__bar--selected": b(), "kaching-bundles__bar--disabled": !e(B) && r().preview })]), p(ke, Me);
    };
    G(ne, (ke) => {
      (e(B) || r().preview) && ke(we);
    }), p(n, De);
    var Ze = Xe(qe);
    return c(), Ze;
  }
  On(["change"]), Qe($u, { dealBlock: {}, dealBar: {}, product: {}, otherProducts: {}, complementaryProducts: {}, currentVariantId: {}, componentId: {}, selectedDealBarIndex: {}, selected: {}, sellingPlan: {}, onProgressiveGiftsChange: {}, onDealBarSelect: {}, onDealBarDeselect: {}, onVariantSelect: {}, onVariantsChange: {}, onPersonalisationsChange: {}, personalisationInitialValues: {} }, [], [], !0);
  var e_ = $('<img class="kaching-bundles__mix-and-match-choose-product__product-image" alt=""/>'), t_ = $('<span class="kaching-bundles__mix-and-match-choose-product__product-title"> </span>'), n_ = $('<span class="kaching-bundles__mix-and-match-choose-product__subtitle"><!></span>'), r_ = $('<div class="kaching-bundles__mix-and-match-choose-product__product-price"><!></div>'), a_ = $('<div class="kaching-bundles__mix-and-match-choose-product__product-compare-at-price"><!></div>'), i_ = $('<div class="kaching-bundles__mix-and-match-choose-product__product-price-container"><!> <!></div>'), l_ = $("<div><!> <!></div>"), s_ = $('<div class="kaching-bundles__mix-and-match-choose-product__product"><div class="kaching-bundles__mix-and-match-choose-product__product-container"><!> <div class="kaching-bundles__mix-and-match-choose-product__product-content"><!> <!> <!> <!></div></div> <!></div>');
  function Du(n, t) {
    var r;
    Ke(t, !0);
    const a = () => Ie(b, "$config", c), l = () => Ie(v, "$formatPrice", c), o = () => Ie(_, "$translate", c), [c, s] = vt(), i = m(t, "product", 7), d = m(t, "dealBlock", 7), g = m(t, "dealBar", 7), f = m(t, "modal", 7), h = m(t, "onChoose", 7), _ = Ct(), v = cn(), b = _n();
    let x = ze(lt(((r = i().variants.find((O) => O.availableForSale)) == null ? void 0 : r.id) || i().variants[0].id));
    const D = u(() => i().variants.find((O) => O.id === e(x)) || i().variants[0]), S = u(() => d().priceRounding ? { perItem: !1, precision: d().priceRoundingPrecision, v2: a().featureFlags.price_rounding_v2 || !1 } : void 0), I = u(() => g().discountType === "percentage" ? ra({ discountType: g().discountType, discountValue: g().discountValue, discountQuantity: 1, variantQuantities: [{ variant: e(D), quantity: 1 }], currencyRate: a().currencyRate, priceRounding: e(S) }) : e(D).price), W = u(() => d().useProductCompareAtPrice && e(D).compareAtPrice ? Math.max(e(D).price, e(D).compareAtPrice) : e(D).price), Q = u(() => i().url ? `${i().url}?variant=${e(x)}` : void 0), E = u(() => dn({ priceFormatter: l(), product: i(), totalFullPrice: e(W), totalDiscountedPrice: e(I), quantity: 1, unitQuantity: null })), K = u(() => e(E)(o()(f().subtitle || ""))), M = u(() => f().buttonText);
    function te(O) {
      le(x, O, !0);
    }
    var A = { get product() {
      return i();
    }, set product(O) {
      i(O), k();
    }, get dealBlock() {
      return d();
    }, set dealBlock(O) {
      d(O), k();
    }, get dealBar() {
      return g();
    }, set dealBar(O) {
      g(O), k();
    }, get modal() {
      return f();
    }, set modal(O) {
      f(O), k();
    }, get onChoose() {
      return h();
    }, set onChoose(O) {
      h(O), k();
    } }, L = s_(), se = P(L), Z = P(se), H = (O) => {
      Xn(O, { get url() {
        return e(Q);
      }, class: "kaching-bundles__mix-and-match-choose-product__product-image-link", children: (ee, ge) => {
        var T = e_();
        Pe(T, "width", 100), Pe(T, "height", 100), be(() => Pe(T, "src", i().image)), p(ee, T);
      }, $$slots: { default: !0 } });
    };
    G(Z, (O) => {
      i().image && O(H);
    });
    var z = q(Z, 2), C = P(z);
    Xn(C, { get url() {
      return e(Q);
    }, class: "kaching-bundles__mix-and-match-choose-product__product-link", children: (O, ee) => {
      var ge = t_(), T = P(ge, !0);
      y(ge), be(() => ft(T, i().title)), p(O, ge);
    }, $$slots: { default: !0 } });
    var R = q(C, 2), N = (O) => {
      var ee = n_();
      Ve(P(ee), () => e(K)), y(ee), p(O, ee);
    };
    G(R, (O) => {
      e(K) && O(N);
    });
    var J = q(R, 2), X = (O) => {
      var ee = i_(), ge = P(ee);
      rt(ge, () => e(I), (U) => {
        var oe = r_();
        Ve(P(oe), () => l()(e(I))), y(oe), p(U, oe);
      });
      var T = q(ge, 2), w = (U) => {
        var oe = Be();
        rt(pe(oe), () => e(W), (j) => {
          var re = a_();
          Ve(P(re), () => l()(e(W))), y(re), p(j, re);
        }), p(U, oe);
      };
      G(T, (U) => {
        e(W) && e(W) > e(I) && U(w);
      }), y(ee), p(O, ee);
    };
    G(J, (O) => {
      g().discountType !== "specific" && O(X);
    });
    var B = q(J, 2), F = (O) => {
      var ee = l_(), ge = P(ee);
      na(ge, { get product() {
        return i();
      }, class: "kaching-bundles__mix-and-match-choose-product__product-option-names" }), Un(q(ge, 2), { get product() {
        return i();
      }, get selectedVariantId() {
        return e(x);
      }, onChange: te }), y(ee), p(O, ee);
    };
    G(B, (O) => {
      i().variants.length > 1 && O(F);
    }), y(z), y(se), Ht(q(se, 2), { element: "span", class: "kaching-bundles__mix-and-match-choose-product__product-button", onclick: function() {
      h()({ product: i(), variant: e(D) });
    }, children: (O, ee) => {
      ua();
      var ge = Wn();
      be((T) => ft(ge, T), [() => o()(e(M))]), p(O, ge);
    }, $$slots: { default: !0 } }), y(L), p(n, L);
    var V = Xe(A);
    return s(), V;
  }
  Qe(Du, { product: {}, dealBlock: {}, dealBar: {}, modal: {}, onChoose: {} }, [], [], !0);
  const o_ = { red: 0, green: 0, blue: 0, alpha: 0.5 }, c_ = { buttonSize: 16, textSize: 14, overlayColor: { red: 0, green: 0, blue: 0, alpha: 0.5 }, priceColor: { red: 0, green: 0, blue: 0, alpha: 1 }, compareAtPriceColor: { red: 128, green: 128, blue: 128, alpha: 1 }, textColor: { red: 0, green: 0, blue: 0, alpha: 1 }, buttonColor: { red: 0, green: 0, blue: 0, alpha: 1 }, buttonTextColor: { red: 255, green: 255, blue: 255, alpha: 1 }, productPhotoSize: 100, heading: "Select product", buttonText: "Choose" };
  var d_ = $('<img alt="Close"/>'), u_ = $('<div class="kaching-bundles__mix-and-match-choose-product__empty-state"> </div>'), g_ = $('<div class="kaching-bundles__mix-and-match-choose-product"><div class="kaching-bundles__mix-and-match-choose-product__header"><h2 class="kaching-bundles__mix-and-match-choose-product__heading"><!></h2> <!></div> <div class="kaching-bundles__mix-and-match-choose-product__products"><!></div></div>');
  function wo(n, t) {
    Ke(t, !0);
    const r = () => Ie(g, "$translate", a), [a, l] = vt(), o = m(t, "dealBlock", 7), c = m(t, "dealBar", 7), s = m(t, "products", 23, () => []), i = m(t, "onChoose", 7), d = m(t, "onClose", 7), g = Ct(), f = u(() => {
      var A;
      return (A = o().mixAndMatchChooseProductModal) != null ? A : c_;
    }), h = u(() => ((A) => bn({ "kaching-mix-and-match-choose-product-button-size": A.buttonSize + "px", "kaching-mix-and-match-choose-product-text-size": A.textSize + "px", "kaching-mix-and-match-choose-product-price-color": Le(A.priceColor), "kaching-mix-and-match-choose-product-compare-at-price-color": Le(A.compareAtPriceColor), "kaching-mix-and-match-choose-product-text-color": Le(A.textColor), "kaching-mix-and-match-choose-product-button-color": Le(A.buttonColor), "kaching-mix-and-match-choose-product-button-text-color": Le(A.buttonTextColor), "kaching-mix-and-match-choose-product-photo-size": A.productPhotoSize + "px" }))(e(f)));
    var _ = { get dealBlock() {
      return o();
    }, set dealBlock(A) {
      o(A), k();
    }, get dealBar() {
      return c();
    }, set dealBar(A) {
      c(A), k();
    }, get products() {
      return s();
    }, set products(A = []) {
      s(A), k();
    }, get onChoose() {
      return i();
    }, set onChoose(A) {
      i(A), k();
    }, get onClose() {
      return d();
    }, set onClose(A) {
      d(A), k();
    } }, v = g_(), b = P(v), x = P(b), D = P(x), S = (A) => {
      var L = Wn();
      be((se) => ft(L, se), [() => r()(e(f).heading)]), p(A, L);
    };
    G(D, (A) => {
      e(f).heading && A(S);
    }), y(x);
    var I = q(x, 2), W = (A) => {
      Ht(A, { element: "span", class: "kaching-bundles__mix-and-match-choose-product__close", get onclick() {
        return d();
      }, children: (L, se) => {
        var Z = d_();
        be(() => Pe(Z, "src", co)), p(L, Z);
      }, $$slots: { default: !0 } });
    };
    G(I, (A) => {
      d() && A(W);
    }), y(b);
    var Q = q(b, 2), E = P(Q), K = (A) => {
      var L = u_(), se = P(L, !0);
      y(L), be((Z) => ft(se, Z), [() => r()("system.no_products_available")]), p(A, L);
    }, M = (A) => {
      var L = Be();
      $t(pe(L), 17, s, (se) => se.id, (se, Z) => {
        Du(se, { get dealBlock() {
          return o();
        }, get dealBar() {
          return c();
        }, get modal() {
          return e(f);
        }, get product() {
          return e(Z);
        }, get onChoose() {
          return i();
        } });
      }), p(A, L);
    };
    G(E, (A) => {
      s().length === 0 ? A(K) : A(M, !1);
    }), y(Q), y(v), be(() => Vt(v, e(h))), p(n, v);
    var te = Xe(_);
    return l(), te;
  }
  function h_(n, t) {
    n.target === n.currentTarget && t()();
  }
  Qe(wo, { dealBlock: {}, dealBar: {}, products: {}, onChoose: {}, onClose: {} }, [], [], !0);
  var p_ = $('<div class="kaching-bundles"><div class="kaching-bundles__mix-and-match-choose-product-modal" role="none"><div class="kaching-bundles__mix-and-match-choose-product-modal__content"><!></div></div></div>');
  function Au(n, t) {
    Ke(t, !0);
    const r = m(t, "dealBlock", 7), a = m(t, "dealBar", 7), l = m(t, "products", 23, () => []), o = m(t, "isOpen", 7), c = m(t, "onChoose", 7), s = m(t, "onClose", 7);
    var i = { get dealBlock() {
      return r();
    }, set dealBlock(h) {
      r(h), k();
    }, get dealBar() {
      return a();
    }, set dealBar(h) {
      a(h), k();
    }, get products() {
      return l();
    }, set products(h = []) {
      l(h), k();
    }, get isOpen() {
      return o();
    }, set isOpen(h) {
      o(h), k();
    }, get onChoose() {
      return c();
    }, set onChoose(h) {
      c(h), k();
    }, get onClose() {
      return s();
    }, set onClose(h) {
      s(h), k();
    } }, d = Be(), g = pe(d), f = (h) => {
      ol(h, { target: "body", children: (_, v) => {
        var b = p_(), x = P(b);
        x.__click = [h_, s];
        var D = P(x);
        wo(P(D), { get dealBlock() {
          return r();
        }, get dealBar() {
          return a();
        }, get products() {
          return l();
        }, get onChoose() {
          return c();
        }, get onClose() {
          return s();
        } }), y(D), y(x), y(b), be((S) => Vt(x, S), [() => (function(S) {
          var I;
          return bn({ "kaching-mix-and-match-choose-product-overlay-color": Le(((I = S.mixAndMatchChooseProductModal) == null ? void 0 : I.overlayColor) || o_) });
        })(r())]), p(_, b);
      }, $$slots: { default: !0 } });
    };
    return G(g, (h) => {
      o() && h(f);
    }), p(n, d), Xe(i);
  }
  On(["click"]), Qe(Au, { dealBlock: {}, dealBar: {}, products: {}, isOpen: {}, onChoose: {}, onClose: {} }, [], [], !0);
  var b_ = $('<img alt="" class="kaching-bundles__mix-and-match-product__image"/>'), f_ = $('<div class="kaching-bundles__mix-and-match-product__image-placeholder"></div>'), v_ = $('<div class="kaching-bundles__mix-and-match-product__title"> </div>'), __ = $('<div class="kaching-bundles__mix-and-match-product__pricing"><!></div>'), k_ = $('<div class="kaching-bundles__mix-and-match-product"><!> <div class="kaching-bundles__mix-and-match-product__content"><!> <!> <!></div> <!> <!></div> <!>', 1);
  function Vu(n, t) {
    Ke(t, !0);
    const [r, a] = vt();
    let l = m(t, "dealBlock", 7), o = m(t, "dealBar", 7), c = m(t, "bundleProduct", 7), s = m(t, "product", 7), i = m(t, "swapProducts", 7), d = m(t, "dealBarSelected", 7), g = m(t, "currentVariantId", 7), f = m(t, "mainVariantId", 7), h = m(t, "pricing", 7), _ = m(t, "onSwap", 7), v = m(t, "onChange", 7);
    const b = cn(), x = Ct();
    let D = ze(void 0), S = ze(!1);
    const I = u(() => d() && i().length > 1), W = u(() => Ie(x, "$translate", r)(o().buttonText || "Change"));
    function Q() {
      le(S, !0);
    }
    function E(V) {
      le(S, !1), le(D, V.variant.id, !0), _()(V.product);
    }
    function K() {
      le(S, !1);
    }
    const M = u(() => {
      var V, O;
      return (O = (V = s()) == null ? void 0 : V.variants) != null ? O : [];
    }), te = u(() => {
      var V, O;
      return e(D) !== void 0 && e(M).some(({ id: ee }) => ee === e(D)) ? e(D) : c().productGID === "default" && g() ? g() : e(M).length > 0 ? (O = (V = e(M).find((ee) => ee.availableForSale)) == null ? void 0 : V.id) != null ? O : e(M)[0].id : void 0;
    }), A = u(() => {
      var V;
      return e(te) ? (V = s()) == null ? void 0 : V.variants.find((O) => O.id === e(te)) : void 0;
    }), L = u(() => {
      var V;
      return (V = s()) != null && V.url && e(A) ? `${s().url}?variant=${e(A).id}` : void 0;
    }), se = u(() => {
      var V, O;
      return ((V = e(A)) == null ? void 0 : V.image) || ((O = s()) == null ? void 0 : O.image);
    }), Z = u(() => d() && s() && e(M).length > 1 && e(te)), H = u(() => d() && c().productGID !== "default" ? e(L) : void 0), z = u(() => s() ? c().title ? dn({ priceFormatter: Ie(b, "$formatPrice", r), product: s(), totalFullPrice: 0, totalDiscountedPrice: 0, quantity: 1, unitQuantity: null })(c().title) : s().title : "");
    function C(V) {
      le(D, V, !0);
    }
    let R;
    Je(() => {
      e(A) && nn(() => {
        v()({ variant: e(A), product: s() });
      });
    }), pr(() => {
      c().productGID, le(D, void 0), R = void 0;
    }), pr(() => {
      const V = c().productGID === "default";
      if (!(V || !l().disableVariantOptionSync)) return;
      const O = V ? g() : f();
      if (!O || !s() || O === R) return;
      const ee = R;
      if (R = O, !e(M).some((w) => w.id === O)) return;
      const ge = e(D) === void 0, T = e(D) === ee && ee !== void 0;
      (ge || T) && le(D, O, !0);
    });
    var N = { get dealBlock() {
      return l();
    }, set dealBlock(V) {
      l(V), k();
    }, get dealBar() {
      return o();
    }, set dealBar(V) {
      o(V), k();
    }, get bundleProduct() {
      return c();
    }, set bundleProduct(V) {
      c(V), k();
    }, get product() {
      return s();
    }, set product(V) {
      s(V), k();
    }, get swapProducts() {
      return i();
    }, set swapProducts(V) {
      i(V), k();
    }, get dealBarSelected() {
      return d();
    }, set dealBarSelected(V) {
      d(V), k();
    }, get currentVariantId() {
      return g();
    }, set currentVariantId(V) {
      g(V), k();
    }, get mainVariantId() {
      return f();
    }, set mainVariantId(V) {
      f(V), k();
    }, get pricing() {
      return h();
    }, set pricing(V) {
      h(V), k();
    }, get onSwap() {
      return _();
    }, set onSwap(V) {
      _(V), k();
    }, get onChange() {
      return v();
    }, set onChange(V) {
      v(V), k();
    } }, J = Be(), X = pe(J), B = (V) => {
      var O = k_(), ee = pe(O), ge = P(ee), T = (ye) => {
        Xn(ye, { get url() {
          return e(H);
        }, class: "kaching-bundles__mix-and-match-product__image-link", children: (he, ce) => {
          var ae = b_();
          Pe(ae, "height", 50), Pe(ae, "width", 50), be(() => Pe(ae, "src", e(se))), p(he, ae);
        }, $$slots: { default: !0 } });
      }, w = (ye) => {
        p(ye, f_());
      };
      G(ge, (ye) => {
        e(se) ? ye(T) : ye(w, !1);
      });
      var U = q(ge, 2), oe = P(U);
      Xn(oe, { get url() {
        return e(H);
      }, class: "kaching-bundles__mix-and-match-product__title-link", children: (ye, he) => {
        var ce = v_(), ae = P(ce, !0);
        y(ce), be(() => ft(ae, e(z))), p(ye, ce);
      }, $$slots: { default: !0 } });
      var j = q(oe, 2);
      ia(j, { get dealBlock() {
        return l();
      }, get variant() {
        return e(A);
      } });
      var re = q(j, 2), Y = (ye) => {
        {
          let he = u(() => e(te) || 0);
          Un(ye, { get product() {
            return s();
          }, get selectedVariantId() {
            return e(he);
          }, onChange: C });
        }
      };
      G(re, (ye) => {
        e(Z) && ye(Y);
      }), y(U);
      var ie = q(U, 2), _e = (ye) => {
        var he = __();
        ss(P(he), { get discountedPrice() {
          return h().discountedPrice;
        }, get fullPrice() {
          return h().fullPrice;
        }, unitPrice: null, unitPriceReference: null, ignoreUnitPrice: !0 }), y(he), p(ye, he);
      };
      G(ie, (ye) => {
        h() && ye(_e);
      });
      var Se = q(ie, 2), me = (ye) => {
        Ht(ye, { element: "div", class: "kaching-bundles__mix-and-match-product__swap-button", onclick: Q, children: (he, ce) => {
          ua();
          var ae = Wn();
          be(() => ft(ae, e(W))), p(he, ae);
        }, $$slots: { default: !0 } });
      };
      G(Se, (ye) => {
        e(I) && ye(me);
      }), y(ee), Au(q(ee, 2), { get dealBlock() {
        return l();
      }, get dealBar() {
        return o();
      }, get products() {
        return i();
      }, get isOpen() {
        return e(S);
      }, onChoose: E, onClose: K }), p(V, O);
    };
    G(X, (V) => {
      s() && V(B);
    }), p(n, J);
    var F = Xe(N);
    return a(), F;
  }
  Qe(Vu, { dealBlock: {}, dealBar: {}, bundleProduct: {}, product: {}, swapProducts: {}, dealBarSelected: {}, currentVariantId: {}, mainVariantId: {}, pricing: {}, onSwap: {}, onChange: {} }, [], [], !0);
  var m_ = Tn('<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 6.5V14.5M6.5 10.5H14.5M20.5 10.5C20.5 16.0228 16.0228 20.5 10.5 20.5C4.97715 20.5 0.5 16.0228 0.5 10.5C0.5 4.97715 4.97715 0.5 10.5 0.5C16.0228 0.5 20.5 4.97715 20.5 10.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
  function Tu(n) {
    p(n, m_());
  }
  function x_(n, t, r) {
    t()({ dealBarId: r().id, preselected: !1 });
  }
  Qe(Tu, {}, [], [], !0);
  var y_ = $('<img class="kaching-bundles__bar-image" alt=""/>'), w_ = $('<div class="kaching-bundles__bar-radio"></div>'), P_ = $('<span class="kaching-bundles__bar-title"><!></span>'), S_ = $('<span class="kaching-bundles__bar-label"><!></span>'), B_ = $('<div class="kaching-bundles__bar-subtitle"><!></div>'), C_ = $('<div class="kaching-bundles__bar-full-price"><!></div>'), I_ = $("<!> <!>", 1), M_ = $('<!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!> <!></div> <!></div> <div class="kaching-bundles__bar-pricing"><!></div></div>', 1), z_ = $('<div class="kaching-bundles__mix-and-match-products__placeholder"><span>Select product</span></div>'), $_ = $('<div class="kaching-bundles__mix-and-match-products__divider"><div class="kaching-bundles__mix-and-match-products__divider-line">&ZeroWidthSpace;</div> <div class="kaching-bundles__mix-and-match-products__divider-icon"><!></div> <div class="kaching-bundles__mix-and-match-products__divider-line">&ZeroWidthSpace;</div></div>'), D_ = $("<!> <!>", 1), A_ = $("<div></div>"), V_ = $('<!> <div class="kaching-bundles__bar-wrapper"><!> <!> <!> <!></div> <!> <!> <!> <!>', 1), T_ = $('<div><input type="radio"/> <!> <!></div>');
  function qu(n, t) {
    Ke(t, !0);
    const r = () => Ie(L, "$config", o), a = () => Ie(te, "$formatPrice", o), l = () => Ie(M, "$translate", o), [o, c] = vt(), s = m(t, "dealBlock", 7), i = m(t, "dealBar", 7), d = m(t, "product", 7), g = m(t, "otherProducts", 23, () => []), f = m(t, "complementaryProducts", 23, () => []), h = m(t, "currentVariantId", 7), _ = m(t, "componentId", 7), v = m(t, "selectedDealBarIndex", 7), b = m(t, "selected", 7, !1), x = m(t, "sellingPlan", 7), D = m(t, "onProgressiveGiftsChange", 7), S = m(t, "onDealBarSelect", 7), I = m(t, "onDealBarDeselect", 7), W = m(t, "onVariantSelect", 7), Q = m(t, "onVariantsChange", 7), E = m(t, "onPersonalisationsChange", 7), K = m(t, "personalisationInitialValues", 23, () => []), M = Ct(), te = cn(), A = Fn(), L = _n();
    let se = ze(lt({})), Z = ze(lt({}));
    const H = u(() => Object.fromEntries(i().bundleProducts.map((ne) => [ne.id, z(ne).filter(C)])));
    function z(ne) {
      var we;
      const Ze = new Set(((we = ne.selectedProducts) != null ? we : []).map((Ge) => Zt(Ge.id))), ke = g().filter((Ge) => Ze.has(Ge.id)), Me = (function(Ge) {
        if (!Ge) return;
        if (Ge === "default") return d();
        const Ae = Zt(Ge);
        return g().find((je) => je.id === Ae);
      })(ne.productGID);
      return Me ? [Me, ...ke.filter((Ge) => Ge.id !== Me.id)] : ke;
    }
    function C(ne) {
      return ne.availableForSale && ne.variants.some((we) => we.availableForSale);
    }
    let R = ze(lt([])), N = ze(lt([])), J = ze(lt([]));
    const X = u(() => `${i().id}_${_()}`), B = u(() => i().bundleProducts.filter(({ productGID: ne }) => ne)), F = u(() => e(B).every((ne) => ce(ne))), V = u(() => i().showProductsOnlyWhenSelected && !b()), O = u(() => e(B).every((ne) => {
      var we, Ze;
      return ((Ze = (we = e(H)[ne.id]) == null ? void 0 : we.length) != null ? Ze : 0) > 0;
    })), ee = u(() => {
      return s() ? (ne = s(), we = e(se), i().bundleProducts.map((Ze) => {
        const ke = we[Ze.id];
        if (!ke) return 0;
        const { variant: Me } = ke;
        let Ge = Me.price;
        return Me.compareAtPrice && ne.useProductCompareAtPrice && (Ge = Math.max(Ge, Me.compareAtPrice)), Ge;
      }).reduce((Ze, ke) => Ze + ke, 0)) : 0;
      var ne, we;
    }), ge = u(() => ll(e(ee), e(R), e(N))), T = u(() => s().priceRounding ? { perItem: !1, precision: s().priceRoundingPrecision, v2: r().featureFlags.price_rounding_v2 || !1 } : void 0), w = u(() => s() ? as(i(), e(se), r().currencyRate, e(T), x()) : 0), U = u(() => e(ge) > e(w)), oe = u(() => i().showProductPrices ? (function(ne, we, Ze, ke, Me, Ge) {
      const Ae = ne.bundleProducts.filter(({ productGID: st }) => st).flatMap((st) => {
        const yt = we[st.id];
        if (!yt) return [];
        const rn = er(yt.product, yt.variant, Me), jt = rn ? io(yt.variant.price, rn) : yt.variant.price, { price: gt, compareAtPrice: Ce } = yt.variant, bt = Ge && Ce ? Math.max(gt, Ce) : gt;
        return [{ id: st.id, basisPrice: jt, fullPrice: bt }];
      }), je = Ae.reduce((st, yt) => st + yt.basisPrice, 0);
      if (je === 0) return Object.fromEntries(Ae.map((st) => [st.id, { discountedPrice: 0, fullPrice: st.fullPrice }]));
      const Tt = as(ne, we, Ze, ke, Me), it = Ae.map((st) => {
        const yt = Tt * st.basisPrice / je;
        return { ...st, share: Math.floor(yt), remainder: yt % 1 };
      });
      let at = Tt - it.reduce((st, { share: yt }) => st + yt, 0);
      for (const st of [...it].sort((yt, rn) => rn.remainder - yt.remainder)) {
        if (at <= 0) break;
        st.share += 1, at -= 1;
      }
      return Object.fromEntries(it.map((st) => [st.id, { discountedPrice: st.share, fullPrice: st.fullPrice }]));
    })(i(), e(se), r().currencyRate, e(T), x(), s().useProductCompareAtPrice) : void 0), j = u(() => {
      var ne;
      const we = e(B)[0];
      if (we) return (ne = e(se)[we.id]) == null ? void 0 : ne.variant.id;
    }), re = u(() => dn({ priceFormatter: a(), product: d(), dealBar: i(), totalFullPrice: e(ee), totalCompareAtPrice: e(ge), totalDiscountedPrice: e(w), quantity: 1, unitQuantity: null, sellingPlan: x() })), Y = u(() => e(re)(l()(i().title))), ie = u(() => e(re)(l()(i().subtitle))), _e = u(() => e(re)(l()(i().label))), Se = u(() => al(s(), i()).map((ne) => ka(ne, l(), e(re)))), me = u(() => ma(e(Se))), ye = u(() => Ie(A, "$getMediaImageUrl", o)(i().mediaImageGID) || sl);
    function he(ne) {
      b() && (ne.preventDefault(), ne.stopPropagation(), I()());
    }
    function ce(ne) {
      var we, Ze;
      return (Ze = e(Z)[ne.id]) != null ? Ze : (we = e(H)[ne.id]) == null ? void 0 : we[0];
    }
    Fa(() => {
      b() && S()({ dealBarId: i().id, preselected: !0 });
    }), Je(() => {
      b() && (ga(e(se)), ga(e(J)), ga(e(R)), ga(e(N)), x(), nn(() => {
        (function() {
          if (!i().bundleProducts.map(({ id: Ae }) => Ae).every((Ae) => e(se)[Ae])) return;
          const ne = [];
          for (const Ae of i().bundleProducts) {
            const je = e(se)[Ae.id];
            je && ne.push({ id: Ae.id, variant: je.variant, product: je.product, quantity: 1 });
          }
          if (ne.length === 0) return;
          const we = e(w) + e(J).reduce((Ae, je) => Ae + je.discountedPrice, 0), Ze = e(R).reduce((Ae, je) => je.showPrice ? Ae + je.fullPrice : Ae, 0) + e(N).reduce((Ae, je) => Ae + je.fullPrice * je.quantity, 0), ke = e(ee) + e(J).reduce((Ae, je) => Ae + je.fullPrice, 0) + Ze, Me = as(i(), e(se), r().currencyRate, e(T), void 0), Ge = d().sellingPlans.map((Ae) => ({ sellingPlanId: Ae.id, discountedPrice: as(i(), e(se), r().currencyRate, e(T), Ae) }));
          Q()({ bundleProducts: ne, freeGifts: [...e(R), ...e(N)], upsells: e(J), pricing: { discountedPrice: we, fullPrice: ke, giftValue: Ze, discountedPricePerItem: e(w), fullPricePerItem: e(ee), discountedPriceWithoutSellingPlan: Me, discountedPricesForSellingPlans: Ge } });
        })();
      }));
    });
    const ae = u(() => i().showAsSoldOutEnabled && i().showAsSoldOut ? cl(i().showAsSoldOut) : "");
    var de = { get dealBlock() {
      return s();
    }, set dealBlock(ne) {
      s(ne), k();
    }, get dealBar() {
      return i();
    }, set dealBar(ne) {
      i(ne), k();
    }, get product() {
      return d();
    }, set product(ne) {
      d(ne), k();
    }, get otherProducts() {
      return g();
    }, set otherProducts(ne = []) {
      g(ne), k();
    }, get complementaryProducts() {
      return f();
    }, set complementaryProducts(ne = []) {
      f(ne), k();
    }, get currentVariantId() {
      return h();
    }, set currentVariantId(ne) {
      h(ne), k();
    }, get componentId() {
      return _();
    }, set componentId(ne) {
      _(ne), k();
    }, get selectedDealBarIndex() {
      return v();
    }, set selectedDealBarIndex(ne) {
      v(ne), k();
    }, get selected() {
      return b();
    }, set selected(ne = !1) {
      b(ne), k();
    }, get sellingPlan() {
      return x();
    }, set sellingPlan(ne) {
      x(ne), k();
    }, get onProgressiveGiftsChange() {
      return D();
    }, set onProgressiveGiftsChange(ne) {
      D(ne), k();
    }, get onDealBarSelect() {
      return S();
    }, set onDealBarSelect(ne) {
      S(ne), k();
    }, get onDealBarDeselect() {
      return I();
    }, set onDealBarDeselect(ne) {
      I(ne), k();
    }, get onVariantSelect() {
      return W();
    }, set onVariantSelect(ne) {
      W(ne), k();
    }, get onVariantsChange() {
      return Q();
    }, set onVariantsChange(ne) {
      Q(ne), k();
    }, get onPersonalisationsChange() {
      return E();
    }, set onPersonalisationsChange(ne) {
      E(ne), k();
    }, get personalisationInitialValues() {
      return K();
    }, set personalisationInitialValues(ne = []) {
      K(ne), k();
    } }, fe = Be(), $e = pe(fe), qe = (ne) => {
      var we = T_();
      let Ze;
      var ke = P(we);
      ea(ke), ke.__change = [x_, S, i];
      var Me = q(ke, 2);
      Wa(Me, { get for() {
        return e(X);
      }, get soldOut() {
        return i().showAsSoldOutEnabled;
      }, get borderHost() {
        return e(me);
      }, children: (je, Tt) => {
        var it = V_(), at = pe(it);
        $t(at, 17, () => e(Se), (Te) => Te.id, (Te, Ne) => {
          aa(Te, { get badge() {
            return e(Ne);
          }, get blockLayout() {
            return s().blockLayout;
          } });
        });
        var st = q(at, 2), yt = P(st);
        Ht(yt, { element: "div", class: "kaching-bundles__bar-main", onclick: he, children: (Te, Ne) => {
          var ot = M_(), _t = pe(ot), St = (He) => {
            var nt = y_();
            be(() => Pe(nt, "src", e(ye))), p(He, nt);
          }, tt = (He) => {
            p(He, w_());
          };
          G(_t, (He) => {
            i().mediaImageGID ? He(St) : He(tt, !1);
          });
          var xt = q(_t, 2), It = P(xt), Et = P(It), Jt = P(Et);
          rt(Jt, () => e(Y), (He) => {
            var nt = P_();
            Ve(P(nt), () => e(Y)), y(nt), p(He, nt);
          });
          var Yt = q(Jt, 2), un = (He) => {
            var nt = Be();
            rt(pe(nt), () => e(_e), (Bt) => {
              var Dt = S_();
              Ve(P(Dt), () => e(_e)), y(Dt), p(Bt, Dt);
            }), p(He, nt);
          };
          G(Yt, (He) => {
            e(_e) && He(un);
          }), y(Et);
          var Kt = q(Et, 2), ct = (He) => {
            var nt = Be();
            rt(pe(nt), () => e(ie), (Bt) => {
              var Dt = B_();
              Ve(P(Dt), () => e(ie)), y(Dt), p(Bt, Dt);
            }), p(He, nt);
          };
          G(Kt, (He) => {
            e(ie) && He(ct);
          }), y(It);
          var Mt = q(It, 2), Xt = P(Mt), Ue = (He) => {
            var nt = I_(), Bt = pe(nt);
            rt(Bt, () => e(w), (zt) => {
              Lr(zt, { get amount() {
                return e(w);
              }, showPricesPerItem: !1, get unitLabel() {
                return s().unitLabel;
              } });
            });
            var Dt = q(Bt, 2), kn = (zt) => {
              var qt = Be();
              rt(pe(qt), () => e(ge), (mn) => {
                var Qt = C_();
                Ve(P(Qt), () => a()(e(ge))), y(Qt), be((gn) => Pe(Qt, "data-a11y-label", gn), [() => l()("system.original_price")]), p(mn, Qt);
              }), p(zt, qt);
            };
            G(Dt, (zt) => {
              e(U) && zt(kn);
            }), p(He, nt);
          };
          G(Xt, (He) => {
            e(F) && He(Ue);
          }), y(Mt), y(xt), p(Te, ot);
        }, $$slots: { default: !0 } });
        var rn = q(yt, 2), jt = (Te) => {
          ya(Te, { get highlights() {
            return i().highlights;
          }, get isSelected() {
            return b();
          }, get replaceLiquid() {
            return e(re);
          } });
        };
        G(rn, (Te) => {
          i().highlights && Te(jt);
        });
        var gt = q(rn, 2), Ce = (Te) => {
          var Ne = A_();
          let ot;
          $t(Ne, 23, () => i().bundleProducts, (_t) => _t.id, (_t, St, tt) => {
            var xt = D_(), It = pe(xt), Et = (Kt) => {
              {
                let ct = u(() => ce(e(St))), Mt = u(() => {
                  var Xt;
                  return (Xt = e(oe)) == null ? void 0 : Xt[e(St).id];
                });
                Vu(Kt, { get bundleProduct() {
                  return e(St);
                }, get product() {
                  return e(ct);
                }, get swapProducts() {
                  return e(H)[e(St).id];
                }, get dealBlock() {
                  return s();
                }, get dealBar() {
                  return i();
                }, get dealBarSelected() {
                  return b();
                }, get currentVariantId() {
                  return h();
                }, get mainVariantId() {
                  return e(j);
                }, get pricing() {
                  return e(Mt);
                }, onSwap: (Xt) => (function(Ue, He) {
                  e(Z)[Ue] = He;
                })(e(St).id, Xt), onChange: (Xt) => (function(Ue, He) {
                  const { variant: nt, product: Bt } = He;
                  e(se)[Ue] = { variant: nt, product: Bt }, b() && i().bundleProducts.map(({ id: Dt }) => Dt).every((Dt) => e(se)[Dt]) && Ue === i().bundleProducts[0].id && W()({ variantId: nt.id });
                })(e(St).id, Xt) });
              }
            }, Jt = (Kt) => {
              var ct = Be(), Mt = pe(ct), Xt = (Ue) => {
                p(Ue, z_());
              };
              G(Mt, (Ue) => {
                r().preview && Ue(Xt);
              }, !0), p(Kt, ct);
            };
            G(It, (Kt) => {
              e(St).productGID ? Kt(Et) : Kt(Jt, !1);
            });
            var Yt = q(It, 2), un = (Kt) => {
              var ct = $_(), Mt = q(P(ct), 2);
              Tu(P(Mt)), y(Mt), ua(2), y(ct), p(Kt, ct);
            };
            G(Yt, (Kt) => {
              e(tt) < i().bundleProducts.length - 1 && Kt(un);
            }), p(_t, xt);
          }), y(Ne), be((_t) => ot = Lt(Ne, 1, "kaching-bundles__mix-and-match-products", null, ot, _t), [() => ({ "kaching-bundles__mix-and-match-products--hidden": e(V) })]), p(Te, Ne);
        };
        G(gt, (Te) => {
          e(F) && Te(Ce);
        });
        var bt = q(gt, 2), Ye = (Te) => {
          {
            let Ne = u(() => e(j) ? [e(j)] : []);
            Ua(Te, { get product() {
              return d();
            }, get productPersonalisation() {
              return i().productPersonalisation;
            }, get selectedVariantIds() {
              return e(Ne);
            }, quantity: 1, get addPersonalisationModal() {
              return s().addPersonalisationModal;
            }, get onPersonalisationsChange() {
              return E();
            }, get initialValues() {
              return K();
            } });
          }
        };
        G(bt, (Te) => {
          b() && i().productPersonalisation && (s().blockLayout === "vertical" || s().blockLayout === "plain") && Te(Ye);
        }), y(st);
        var ve = q(st, 2);
        {
          let Te = u(() => i().upsells || []);
          wi(ve, { get dealBlock() {
            return s();
          }, get dealBarId() {
            return i().id;
          }, get upsells() {
            return e(Te);
          }, get otherProducts() {
            return g();
          }, get complementaryProducts() {
            return f();
          }, get dealBarSelected() {
            return b();
          }, get dealSellingPlan() {
            return x();
          }, sets: 1, onChange: (Ne) => {
            le(J, Ne, !0);
          } });
        }
        var We = q(ve, 2);
        {
          let Te = u(() => ({ ...i(), dealBarType: pt.Bundle, quantitySelector: !1, bundleProducts: i().bundleProducts.map((Ne) => ({ ...Ne, quantity: 1, variantGIDs: null, defaultVariantGID: null, mediaImageGID: null, discountType: "default", discountValue: 0 })) }));
          Bi(We, { get selectedDealBarIndex() {
            return v();
          }, get onChange() {
            return D();
          }, get dealBlock() {
            return s();
          }, get sellingPlan() {
            return x();
          }, get dealBar() {
            return e(Te);
          }, get otherProducts() {
            return g();
          }, get selected() {
            return b();
          }, get progressiveGifts() {
            return s().progressiveGifts;
          } });
        }
        var Ee = q(We, 2);
        {
          let Te = u(() => i().freeGifts || []);
          yi(Ee, { get dealBlock() {
            return s();
          }, get freeGifts() {
            return e(Te);
          }, get freeGiftsSummary() {
            return i().freeGiftsSummary;
          }, get otherProducts() {
            return g();
          }, get dealBarSelected() {
            return b();
          }, get sellingPlan() {
            return x();
          }, sets: 1, onChange: (Ne) => {
            le(R, Ne, !0);
          } });
        }
        var et = q(Ee, 2);
        {
          let Te = u(() => i().multipleGiftsSelectors || []);
          Si(et, { get dealBlock() {
            return s();
          }, get multipleGiftsSelectors() {
            return e(Te);
          }, get sellingPlan() {
            return x();
          }, get otherProducts() {
            return g();
          }, onChange: (Ne) => {
            le(N, Ne, !0);
          } });
        }
        p(je, it);
      }, $$slots: { default: !0 } });
      var Ge = q(Me, 2), Ae = (je) => {
        Pi(je, { get showAsSoldOut() {
          return i().showAsSoldOut;
        }, get replaceLiquid() {
          return e(re);
        } });
      };
      G(Ge, (je) => {
        i().showAsSoldOutEnabled && i().showAsSoldOut && je(Ae);
      }), y(we), be((je) => {
        var Tt;
        Ze = Lt(we, 1, "kaching-bundles__bar", null, Ze, je), Pe(we, "data-deal-bar-id", i().id), Vt(we, e(ae)), Pe(ke, "name", `kaching-bundles-deal-${(Tt = _()) != null ? Tt : ""}`), La(ke, i().id), Pe(ke, "id", e(X)), Yi(ke, b()), ke.disabled = i().showAsSoldOutEnabled;
      }, [() => ({ "kaching-bundles__bar--selected": b(), "kaching-bundles__bar--disabled": !e(O) && r().preview })]), p(ne, we);
    };
    G($e, (ne) => {
      (e(O) || r().preview) && ne(qe);
    }), p(n, fe);
    var De = Xe(de);
    return c(), De;
  }
  On(["change"]), Qe(qu, { dealBlock: {}, dealBar: {}, product: {}, otherProducts: {}, complementaryProducts: {}, currentVariantId: {}, componentId: {}, selectedDealBarIndex: {}, selected: {}, sellingPlan: {}, onProgressiveGiftsChange: {}, onDealBarSelect: {}, onDealBarDeselect: {}, onVariantSelect: {}, onVariantsChange: {}, onPersonalisationsChange: {}, personalisationInitialValues: {} }, [], [], !0);
  var q_ = Tn('<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M27.2008 16C27.2008 18.9705 26.0208 21.8192 23.9204 23.9196C21.82 26.0201 18.9712 27.2 16.0008 27.2C13.0304 27.2 10.1816 26.0201 8.08119 23.9196C5.98078 21.8192 4.80078 18.9705 4.80078 16C4.80078 13.0296 5.98078 10.1809 8.08119 8.08045C10.1816 5.98005 13.0304 4.80005 16.0008 4.80005C18.9712 4.80005 21.82 5.98005 23.9204 8.08045C26.0208 10.1809 27.2008 13.0296 27.2008 16ZM10.0008 16C10.0008 15.6818 10.1272 15.3766 10.3523 15.1515C10.5773 14.9265 10.8825 14.8 11.2008 14.8H14.8008V11.2C14.8008 10.8818 14.9272 10.5766 15.1523 10.3515C15.3773 10.1265 15.6825 10 16.0008 10C16.319 10 16.6243 10.1265 16.8493 10.3515C17.0744 10.5766 17.2008 10.8818 17.2008 11.2V14.8H20.8008C21.119 14.8 21.4243 14.9265 21.6493 15.1515C21.8744 15.3766 22.0008 15.6818 22.0008 16C22.0008 16.3183 21.8744 16.6235 21.6493 16.8486C21.4243 17.0736 21.119 17.2 20.8008 17.2H17.2008V20.8C17.2008 21.1183 17.0744 21.4235 16.8493 21.6486C16.6243 21.8736 16.319 22 16.0008 22C15.6825 22 15.3773 21.8736 15.1523 21.6486C14.9272 21.4235 14.8008 21.1183 14.8008 20.8V17.2H11.2008C10.8825 17.2 10.5773 17.0736 10.3523 16.8486C10.1272 16.6235 10.0008 16.3183 10.0008 16Z" fill="currentColor"></path></svg>');
  function Gu(n, t) {
    Ke(t, !0);
    let r = m(t, "class", 7);
    var a = { get class() {
      return r();
    }, set class(o) {
      r(o), k();
    } }, l = q_();
    return be(() => Lt(l, 0, Zi(r()))), p(n, l), Xe(a);
  }
  Qe(Gu, { class: {} }, [], [], !0);
  const Po = ta({}), So = ta(!1);
  function ul(n) {
    So.set(n);
  }
  function os(n, t) {
    Po.update((r) => ({ ...r, [n]: t }));
  }
  const G_ = (n) => {
    const { collectionBreaks: t, colors: r, cornerRadius: a } = n;
    return t ? bn({ "kaching-collection-breaks-product-photo-size": t.productPhotoSize + "px", "kaching-collection-breaks-button-color": t.buttonColor && Le(t.buttonColor), "kaching-collection-breaks-product-title-color": Le(r.title), "kaching-collection-breaks-image-border-radius": (a || 0) / 2 + "px" }) : "";
  };
  function O_(n, t) {
    n.target === n.currentTarget && le(t, !1);
  }
  var F_ = $('<img class="kaching-bundles__collection-product__image" alt=""/>'), L_ = $('<span class="kaching-bundles__collection-product__title"> </span>'), j_ = $("<!> <!>", 1), E_ = $('<img alt=""/>'), R_ = $('<div class="kaching-bundles__collection-product"><div class="kaching-bundles__collection-product__main"><!> <div class="kaching-bundles__collection-product__content"><!> <!> <!></div></div> <!></div>'), N_ = $('<img class="kaching-bundles__collection-product__image" alt="" height="40" width="40"/>'), Q_ = $('<div class="kaching-bundles"><div class="kaching-bundles__choose-product-modal" role="none"><div class="kaching-bundles__choose-product-modal__content"><!></div></div></div>'), W_ = $('<div><div class="kaching-bundles__collection-product__main"><!> <!></div> <!></div>');
  function Bo(n, t) {
    Ke(t, !0);
    const r = () => Ie(v, "$config", a), [a, l] = vt(), o = m(t, "dealBlock", 7), c = m(t, "dealBar", 7), s = m(t, "mainProduct", 7, null), i = m(t, "products", 7), d = m(t, "selectedProductVariant", 7, null), g = m(t, "onChange", 7), f = m(t, "onRemove", 7), h = Ct(), _ = Fn(), v = _n();
    let b = ze(!1);
    const x = u(() => o().collectionBreaks), D = u(() => {
      var N;
      return ((N = d()) == null ? void 0 : N.product) || s();
    }), S = u(() => {
      var N, J;
      return ((N = d()) == null ? void 0 : N.variant) || ((J = e(D)) == null ? void 0 : J.variants[0]) || null;
    }), I = u(() => Ie(_, "$getMediaImageUrl", a)(e(x).mediaImageGID)), W = u(() => Ie(h, "$translate", a)(e(x).buttonText)), Q = u(() => e(x).requireItemSelectionAlert), E = u(() => e(x).requireItemSelectionEnabled), K = u(() => r().preview && r().previewAlerts || Ie(So, "$requireSelectionError", a)), M = u(() => {
      var N, J;
      return (N = e(D)) != null && N.url ? `${e(D).url}?variant=${(J = e(S)) == null ? void 0 : J.id}` : void 0;
    });
    function te(N) {
      le(b, !1), g()(N);
    }
    function A() {
      var N;
      (N = f()) == null || N();
    }
    function L(N) {
      const J = e(D).variants.find((X) => X.id === N);
      J && g()({ product: e(D), variant: J });
    }
    var se = { get dealBlock() {
      return o();
    }, set dealBlock(N) {
      o(N), k();
    }, get dealBar() {
      return c();
    }, set dealBar(N) {
      c(N), k();
    }, get mainProduct() {
      return s();
    }, set mainProduct(N = null) {
      s(N), k();
    }, get products() {
      return i();
    }, set products(N) {
      i(N), k();
    }, get selectedProductVariant() {
      return d();
    }, set selectedProductVariant(N = null) {
      d(N), k();
    }, get onChange() {
      return g();
    }, set onChange(N) {
      g(N), k();
    }, get onRemove() {
      return f();
    }, set onRemove(N) {
      f(N), k();
    } }, Z = Be(), H = pe(Z), z = (N) => {
      var J = R_(), X = P(J), B = P(X);
      {
        let U = u(() => s() ? void 0 : e(M));
        Xn(B, { get url() {
          return e(U);
        }, class: "kaching-bundles__collection-product__link", children: (oe, j) => {
          var re = F_();
          be(() => Pe(re, "src", e(S).image || e(D).image)), p(oe, re);
        }, $$slots: { default: !0 } });
      }
      var F = q(B, 2), V = P(F), O = (U) => {
        {
          let oe = u(() => s() ? void 0 : e(M));
          Xn(U, { get url() {
            return e(oe);
          }, class: "kaching-bundles__collection-product__link", children: (j, re) => {
            var Y = L_(), ie = P(Y, !0);
            y(Y), be(() => ft(ie, e(D).title)), p(j, Y);
          }, $$slots: { default: !0 } });
        }
      };
      G(V, (U) => {
        e(x).showProductName && U(O);
      });
      var ee = q(V, 2), ge = (U) => {
        var oe = j_(), j = pe(oe);
        na(j, { get product() {
          return e(D);
        } });
        var re = q(j, 2);
        {
          let Y = u(() => {
            var ie;
            return (ie = e(S)) == null ? void 0 : ie.id;
          });
          Un(re, { get product() {
            return e(D);
          }, get selectedVariantId() {
            return e(Y);
          }, onChange: L });
        }
        p(U, oe);
      };
      G(ee, (U) => {
        e(D).variants.length > 1 && U(ge);
      }), ia(q(ee, 2), { get dealBlock() {
        return o();
      }, get variant() {
        return e(S);
      } }), y(F), y(X);
      var T = q(X, 2), w = (U) => {
        Ht(U, { element: "div", class: "kaching-bundles__collection-product__remove-button", "aria-label": "Remove product", onclick: A, children: (oe, j) => {
          var re = E_();
          be(() => Pe(re, "src", "data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11%201L1%2011M1%201L11%2011'%20stroke='%23344054'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e")), p(oe, re);
        }, $$slots: { default: !0 } });
      };
      G(T, (U) => {
        s() || U(w);
      }), y(J), p(N, J);
    }, C = (N) => {
      var J = W_();
      let X;
      var B = P(J), F = P(B);
      Ht(F, { element: "div", class: "kaching-bundles__collection-product__choose-product-image", onclick: () => {
        le(b, !0);
      }, children: (T, w) => {
        var U = Be(), oe = pe(U), j = (Y) => {
          var ie = Be(), _e = pe(ie), Se = (me) => {
            var ye = N_();
            be(() => Pe(ye, "src", e(I))), p(me, ye);
          };
          G(_e, (me) => {
            e(I) && me(Se);
          }), p(Y, ie);
        }, re = (Y) => {
          Gu(Y, { class: "kaching-bundles__collection-product__image kaching-bundles__collection-product__image--default" });
        };
        G(oe, (Y) => {
          e(x).mediaImageGID ? Y(j) : Y(re, !1);
        }), p(T, U);
      }, $$slots: { default: !0 } });
      var V = q(F, 2), O = (T) => {
        Ht(T, { element: "div", class: "kaching-bundles__collection-product__choose-product-button", onclick: () => {
          le(b, !0);
        }, children: (w, U) => {
          ua();
          var oe = Wn();
          be(() => ft(oe, e(W))), p(w, oe);
        }, $$slots: { default: !0 } });
      };
      G(V, (T) => {
        e(W) && T(O);
      }), y(B);
      var ee = q(B, 2), ge = (T) => {
        ol(T, { target: "body", children: (w, U) => {
          var oe = Q_(), j = P(oe);
          j.__click = [O_, b];
          var re = P(j);
          uo(P(re), { get dealBlock() {
            return o();
          }, get dealBar() {
            return c();
          }, get products() {
            return i();
          }, onChoose: te, onClose: () => {
            le(b, !1);
          } }), y(re), y(j), y(oe), be((Y) => Vt(j, Y), [() => (function(Y) {
            return bn({ "kaching-choose-product-overlay-color": Le(Y.chooseProductModal.overlayColor) });
          })(o())]), p(w, oe);
        }, $$slots: { default: !0 } });
      };
      G(ee, (T) => {
        e(b) && T(ge);
      }), y(J), be((T) => X = Lt(J, 1, "kaching-bundles__collection-product", null, X, T), [() => ({ "kaching-bundles__collection-product--require-selection": e(K) && e(E) && e(Q) })]), p(N, J);
    };
    G(H, (N) => {
      e(D) && e(S) ? N(z) : N(C, !1);
    }), p(n, Z);
    var R = Xe(se);
    return l(), R;
  }
  function U_(n, t, r, a) {
    t()({ dealBarId: r().id, dealBarQuantity: a(r()), preselected: !1 });
  }
  On(["click"]), Qe(Bo, { dealBlock: {}, dealBar: {}, mainProduct: {}, products: {}, selectedProductVariant: {}, onChange: {}, onRemove: {} }, [], [], !0);
  var H_ = $('<img class="kaching-bundles__bar-image" alt=""/>'), Z_ = $('<div class="kaching-bundles__bar-radio"></div>'), J_ = $('<span class="kaching-bundles__bar-title"><!></span>'), Y_ = $('<span class="kaching-bundles__bar-label"><!></span>'), K_ = $('<div class="kaching-bundles__bar-subtitle"><!></div>'), X_ = $('<div class="kaching-bundles__bar-full-price"><!></div>'), e0 = $('<div class="kaching-bundles__bar-price"><!></div>'), t0 = $('<div class="kaching-bundles__bar-full-price"><!></div>'), n0 = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--secondary"><!> <!></div>'), r0 = $('<div class="kaching-bundles__bar-pricing-row kaching-bundles__bar-pricing-row--main"><!> <!></div> <!>', 1), a0 = $('<div class="kaching-bundles__bar-full-price"><!></div>'), i0 = $("<!> <!>", 1), l0 = $('<!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!> <!></div> <!></div> <div class="kaching-bundles__bar-pricing"><!></div></div>', 1), s0 = $('<div class="kaching-bundles__bar-selling-plan"><!></div>'), o0 = $('<div class="kaching-bundles__bar-collection-products"></div>'), c0 = $('<!> <div class="kaching-bundles__bar-wrapper"><!> <!> <!> <!> <!> <!></div> <!> <!> <!> <!>', 1), d0 = $('<div><input type="radio"/> <!> <!></div>');
  function Ou(n, t) {
    Ke(t, !0);
    const r = () => Ie(H, "$config", c), a = () => Ie(Po, "$chosenCollectionBreaksProducts", c), l = () => Ie(se, "$formatPrice", c), o = () => Ie(L, "$translate", c), [c, s] = vt();
    let i = m(t, "dealBlock", 7), d = m(t, "dealBar", 7), g = m(t, "product", 7), f = m(t, "collectionBreaksProducts", 23, () => []), h = m(t, "otherProducts", 23, () => []), _ = m(t, "selectedDealBarIndex", 7, null), v = m(t, "complementaryProducts", 23, () => []), b = m(t, "customQuantity", 7, void 0), x = m(t, "currentVariantId", 7, void 0), D = m(t, "componentId", 7), S = m(t, "selected", 7, !1), I = m(t, "globalSellingPlan", 7, void 0), W = m(t, "onDealBarSelect", 7), Q = m(t, "onDealBarDeselect", 7), E = m(t, "onVariantSelect", 7), K = m(t, "onVariantsChange", 7), M = m(t, "onPersonalisationsChange", 7), te = m(t, "personalisationInitialValues", 23, () => []), A = m(t, "onProgressiveGiftsChange", 7);
    const L = Ct(), se = cn(), Z = Fn(), H = _n();
    let z = ze(lt([])), C = ze(lt([])), R = ze(lt([]));
    const N = new bv(), J = u(() => {
      var ve, We;
      return (We = (ve = i().collectionBreaks) == null ? void 0 : ve.autoFillNotChosenItems) != null && We;
    }), X = u(() => i().priceRounding ? { perItem: i().showPricesPerItem, precision: i().priceRoundingPrecision, v2: r().featureFlags.price_rounding_v2 || !1 } : void 0), B = u(() => {
      var ve, We;
      return i() && ((We = (ve = i().defaultVariantsV2) == null ? void 0 : ve.find((Ee) => Zt(Ee.productGID) === g().id && Ee.dealBarId === d().id)) == null ? void 0 : We.variantGIDs) || [];
    });
    let F = u(() => ee(d())), V = ze(lt(ee(d())));
    pr(() => {
      le(V, e(F), !0);
    });
    const O = u(() => b() || e(V));
    function ee(ve) {
      return ve.dealBarType === pt.Bxgy ? ve.buyQuantity + ve.getQuantity : Number(ve.quantity);
    }
    Je(() => {
      x() && nn(() => {
        (function(ve, We) {
          if (Object.keys(a()).length === 0 && ve[0]) {
            const et = Zt(ve[0]), Te = g().variants.find((Ne) => Ne.id == et);
            if (Te) return void os(0, { product: g(), variant: Te });
          }
          const Ee = g().variants.find((et) => et.id == We);
          if (Ee) return void os(0, { product: g(), variant: Ee });
          Object.keys(a()).length === 0 && g().variants[0] && os(0, { product: g(), variant: g().variants[0] });
        })(e(B), x());
      });
    }), Je(() => {
      S() || N.clear();
    });
    const ge = u(() => f().length === 0 || f().some((ve) => ve.id === g().id)), T = u(() => {
      const ve = Object.fromEntries(Object.entries(a()).filter(([Ee]) => Number(Ee) < e(O)));
      if (!S() || !e(J)) return ve;
      const We = { ...ve };
      for (let Ee = 1; Ee < e(O); Ee++) We[Ee] || N.has(Ee) || (e(ge) && ve[0] ? We[Ee] = { product: g(), variant: ve[0].variant } : ve[1] && (We[Ee] = { product: ve[1].product, variant: ve[1].variant }));
      return We;
    }), w = u(() => S() ? Object.values(e(T)).map((ve) => ({ variant: ve.variant, quantity: 1 })) : []), U = u(() => (function({ selectedProductVariants: ve, mainProductIsInCollection: We, collectionBreaksProducts: Ee, dealBlock: et, quantity: Te }) {
      var Ne;
      const ot = ve.map((It) => ({ quantity: 1, variant: It.variant }));
      if (ot.length === 0 || ot.length >= Te || (Ne = et.collectionBreaks) != null && Ne.showChosenProductsPriceOnly) return ot;
      const _t = Te - ot.length;
      if (We) {
        const It = Array.from({ length: _t }, () => ot[0]);
        return [...ot, ...It];
      }
      const St = Ee.flatMap((It) => It.variants).filter((It) => It.availableForSale);
      if (St.length === 0) return ot;
      const tt = St.reduce((It, Et) => Et.price < It.price ? Et : It, St[0]), xt = Array.from({ length: _t }, () => ({ quantity: 1, variant: tt }));
      return [...ot, ...xt];
    })({ selectedProductVariants: Object.values(e(T)), mainProductIsInCollection: e(ge), collectionBreaksProducts: f(), dealBlock: i(), quantity: e(O) }));
    let oe = ze(void 0);
    const j = u(() => rl(g(), e(U).map((ve) => ve.variant))), re = u(() => {
      var ve, We;
      return (d().sellingPlanEnabled || i().subscriptionsEnabled && ((ve = i().subscriptions) == null ? void 0 : ve.layout) === "link" && ((We = i().subscriptions) == null ? void 0 : We.subscribeByDefault)) && (!i().subscriptionsEnabled || !!I());
    }), Y = u(() => e(re) ? lo(d(), e(j), e(oe)) : void 0), ie = u(() => so(e(Y), I(), e(j), g().requiresSellingPlan)), _e = u(() => new Set(g().variants.map((ve) => ve.id))), Se = u(() => Object.values(e(T)).filter((ve) => e(_e).has(ve.variant.id))), me = u(() => (function(ve, We, Ee) {
      return Ee.map(({ variant: Te, quantity: Ne }) => {
        let ot = Te.price;
        const _t = ve.useProductCompareAtPrice || (We.dealBarType === void 0 || We.dealBarType === pt.QuantityBreak) && We.discountType === "default";
        return Te.compareAtPrice && _t && (ot = Math.max(ot, Te.compareAtPrice)), ot * Ne;
      }).reduce((Te, Ne) => Te + Ne, 0);
    })(i(), d(), e(U))), ye = u(() => ll(e(me), e(z), e(C))), he = u(() => Math.ceil(e(me) / e(U).length)), ce = u(() => go(e(O) === 1, e(ye), e(he))), ae = u(() => i() && we(e(U), e(ie))), de = u(() => dn({ priceFormatter: l(), product: g(), selectedVariants: e(w), dealBar: d(), totalFullPrice: e(me), totalCompareAtPrice: e(ye), totalDiscountedPrice: e(ae), quantity: e(O), legacySavedPercentage: r().featureFlags.legacy_saved_percentage || !1, unitQuantity: kr(e(U)), sellingPlan: e(ie) })), fe = u(() => e(de)(o()(d().title))), $e = u(() => e(de)(o()(d().subtitle))), qe = u(() => e(de)(o()(d().label))), De = u(() => al(i(), d()).map((ve) => ka(ve, o(), e(de)))), ne = u(() => ma(e(De)));
    function we(ve, We) {
      switch (d().dealBarType) {
        case void 0:
        case pt.QuantityBreak:
          return Wd(d(), ve, r().currencyRate, e(X), We, r().featureFlags.percentage_cents_rounding_workaround);
        case pt.Bxgy:
          return Ud(d(), ve, r().currencyRate, e(X), We);
      }
    }
    const Ze = u(() => Math.ceil(e(ae) / e(U).length)), ke = u(() => e(ye) > e(ae)), Me = u(() => `${d().id}_${D()}`);
    function Ge(ve) {
      S() && (ve.preventDefault(), ve.stopPropagation(), Q()());
    }
    Fa(() => {
      S() && W()({ dealBarId: d().id, dealBarQuantity: ee(d()), preselected: !0 });
    });
    const Ae = u(() => Ie(Z, "$getMediaImageUrl", c)(d().mediaImageGID) || sl);
    Je(() => {
      var ve;
      S() && Object.keys(e(T)).length > 0 && (e(R), e(z), e(C), e(ie), (ve = i().collectionBreaks) == null || ve.requireItemSelectionEnabled, nn(() => {
        (function() {
          var We, Ee;
          const et = Object.values(e(T)).map((Jt) => ({ variant: Jt.variant, product: Jt.product, quantity: 1 })), Te = e(ae) + e(R).reduce((Jt, Yt) => Jt + Yt.discountedPrice, 0), Ne = e(z).reduce((Jt, Yt) => Yt.showPrice ? Jt + Yt.fullPrice : Jt, 0) + e(C).reduce((Jt, Yt) => Jt + Yt.fullPrice * Yt.quantity, 0), ot = e(me) + e(R).reduce((Jt, Yt) => Jt + Yt.fullPrice, 0) + Ne, _t = we(e(U), void 0), St = g().sellingPlans.map((Jt) => ({ sellingPlanId: Jt.id, discountedPrice: we(e(U), Jt) })), tt = (Ee = (We = i().collectionBreaks) == null ? void 0 : We.requireItemSelectionEnabled) != null && Ee, xt = et.length, It = !tt || xt >= e(O), Et = tt ? Math.max(0, e(O) - xt) : 0;
          K()({ variants: et, freeGifts: [...e(z), ...e(C)], upsells: e(R), dealBarSellingPlan: e(Y), pricing: { discountedPrice: Te, fullPrice: ot, giftValue: Ne, discountedPricePerItem: e(Ze), fullPricePerItem: e(he), discountedPriceWithoutSellingPlan: _t, discountedPricesForSellingPlans: St }, validation: { requiresItemSelection: tt, allItemsSelected: It, missingItemsCount: Et } });
        })();
      }));
    });
    const je = u(() => d().showAsSoldOutEnabled && d().showAsSoldOut ? cl(d().showAsSoldOut) : ""), Tt = u(() => [G_(i()), e(je)].filter(Boolean).join(";"));
    function it(ve, We) {
      ve === 0 && E()({ variantId: We.variant.id }), os(ve, We), ul(!1), e(J) && N.delete(ve);
    }
    function at(ve) {
      (function(We) {
        Po.update((Ee) => {
          const { [We]: et, ...Te } = Ee;
          return Te;
        });
      })(ve), e(J) && N.add(ve);
    }
    var st = { get dealBlock() {
      return i();
    }, set dealBlock(ve) {
      i(ve), k();
    }, get dealBar() {
      return d();
    }, set dealBar(ve) {
      d(ve), k();
    }, get product() {
      return g();
    }, set product(ve) {
      g(ve), k();
    }, get collectionBreaksProducts() {
      return f();
    }, set collectionBreaksProducts(ve = []) {
      f(ve), k();
    }, get otherProducts() {
      return h();
    }, set otherProducts(ve = []) {
      h(ve), k();
    }, get selectedDealBarIndex() {
      return _();
    }, set selectedDealBarIndex(ve = null) {
      _(ve), k();
    }, get complementaryProducts() {
      return v();
    }, set complementaryProducts(ve = []) {
      v(ve), k();
    }, get customQuantity() {
      return b();
    }, set customQuantity(ve = void 0) {
      b(ve), k();
    }, get currentVariantId() {
      return x();
    }, set currentVariantId(ve = void 0) {
      x(ve), k();
    }, get componentId() {
      return D();
    }, set componentId(ve) {
      D(ve), k();
    }, get selected() {
      return S();
    }, set selected(ve = !1) {
      S(ve), k();
    }, get globalSellingPlan() {
      return I();
    }, set globalSellingPlan(ve = void 0) {
      I(ve), k();
    }, get onDealBarSelect() {
      return W();
    }, set onDealBarSelect(ve) {
      W(ve), k();
    }, get onDealBarDeselect() {
      return Q();
    }, set onDealBarDeselect(ve) {
      Q(ve), k();
    }, get onVariantSelect() {
      return E();
    }, set onVariantSelect(ve) {
      E(ve), k();
    }, get onVariantsChange() {
      return K();
    }, set onVariantsChange(ve) {
      K(ve), k();
    }, get onPersonalisationsChange() {
      return M();
    }, set onPersonalisationsChange(ve) {
      M(ve), k();
    }, get personalisationInitialValues() {
      return te();
    }, set personalisationInitialValues(ve = []) {
      te(ve), k();
    }, get onProgressiveGiftsChange() {
      return A();
    }, set onProgressiveGiftsChange(ve) {
      A(ve), k();
    } }, yt = d0();
    let rn;
    var jt = P(yt);
    ea(jt), jt.__change = [U_, W, d, ee];
    var gt = q(jt, 2);
    Wa(gt, { get for() {
      return e(Me);
    }, get soldOut() {
      return d().showAsSoldOutEnabled;
    }, get borderHost() {
      return e(ne);
    }, children: (ve, We) => {
      var Ee = c0(), et = pe(Ee);
      $t(et, 17, () => e(De), (Ue) => Ue.id, (Ue, He) => {
        aa(Ue, { get badge() {
          return e(He);
        }, get blockLayout() {
          return i().blockLayout;
        } });
      });
      var Te = q(et, 2), Ne = P(Te);
      Ht(Ne, { element: "div", class: "kaching-bundles__bar-main", onclick: Ge, children: (Ue, He) => {
        var nt = l0(), Bt = pe(nt), Dt = (dt) => {
          var ut = H_();
          be(() => Pe(ut, "src", e(Ae))), p(dt, ut);
        }, kn = (dt) => {
          p(dt, Z_());
        };
        G(Bt, (dt) => {
          d().mediaImageGID ? dt(Dt) : dt(kn, !1);
        });
        var zt = q(Bt, 2), qt = P(zt), mn = P(qt), Qt = P(mn);
        rt(Qt, () => e(fe), (dt) => {
          var ut = J_();
          Ve(P(ut), () => e(fe)), y(ut), p(dt, ut);
        });
        var gn = q(Qt, 2), hn = (dt) => {
          var ut = Be();
          rt(pe(ut), () => e(qe), (Rt) => {
            var Nt = Y_();
            Ve(P(Nt), () => e(qe)), y(Nt), p(Rt, Nt);
          }), p(dt, ut);
        };
        G(gn, (dt) => {
          e(qe) && dt(hn);
        }), y(mn);
        var rr = q(mn, 2), Hn = (dt) => {
          var ut = Be();
          rt(pe(ut), () => e($e), (Rt) => {
            var Nt = K_();
            Ve(P(Nt), () => e($e)), y(Nt), p(Rt, Nt);
          }), p(dt, ut);
        };
        G(rr, (dt) => {
          e($e) && dt(Hn);
        }), y(qt);
        var Zn = q(qt, 2), dr = P(Zn), fn = (dt) => {
          var ut = r0(), Rt = pe(ut), Nt = P(Rt);
          rt(Nt, () => e(Ze), (Ut) => {
            Lr(Ut, { get amount() {
              return e(Ze);
            }, get showPricesPerItem() {
              return i().showPricesPerItem;
            }, get unitLabel() {
              return i().unitLabel;
            } });
          });
          var Ln = q(Nt, 2), Sn = (Ut) => {
            var sn = Be();
            rt(pe(sn), () => e(ce), (Cn) => {
              var yn = X_();
              Ve(P(yn), () => l()(e(ce))), y(yn), be(($n) => Pe(yn, "data-a11y-label", $n), [() => o()("system.original_price")]), p(Cn, yn);
            }), p(Ut, sn);
          };
          G(Ln, (Ut) => {
            e(ke) && Ut(Sn);
          }), y(Rt);
          var xn = q(Rt, 2), Bn = (Ut) => {
            var sn = n0(), Cn = P(sn);
            rt(Cn, () => e(ae), (an) => {
              var pn = e0();
              Ve(P(pn), () => l()(e(ae))), y(pn), be((Jn) => Pe(pn, "data-a11y-label", Jn), [() => o()("system.price")]), p(an, pn);
            });
            var yn = q(Cn, 2), $n = (an) => {
              var pn = Be();
              rt(pe(pn), () => e(ye), (Jn) => {
                var En = t0();
                Ve(P(En), () => l()(e(ye))), y(En), be((gl) => Pe(En, "data-a11y-label", gl), [() => o()("system.original_price")]), p(Jn, En);
              }), p(an, pn);
            };
            G(yn, (an) => {
              e(ke) && an($n);
            }), y(sn), p(Ut, sn);
          };
          G(xn, (Ut) => {
            e(O) > 1 && Ut(Bn);
          }), p(dt, ut);
        }, Pn = (dt) => {
          var ut = i0(), Rt = pe(ut);
          rt(Rt, () => e(ae), (Sn) => {
            {
              let xn = u(() => i().showPricesPerItem ? e(Ze) : e(ae));
              Lr(Sn, { get amount() {
                return e(xn);
              }, get showPricesPerItem() {
                return i().showPricesPerItem;
              }, get unitLabel() {
                return i().unitLabel;
              } });
            }
          });
          var Nt = q(Rt, 2), Ln = (Sn) => {
            var xn = Be();
            rt(pe(xn), () => i().showPricesPerItem ? e(ce) : e(ye), (Bn) => {
              var Ut = a0();
              Ve(P(Ut), () => l()(i().showPricesPerItem ? e(ce) : e(ye))), y(Ut), be((sn) => Pe(Ut, "data-a11y-label", sn), [() => o()("system.original_price")]), p(Bn, Ut);
            }), p(Sn, xn);
          };
          G(Nt, (Sn) => {
            e(ke) && Sn(Ln);
          }), p(dt, ut);
        };
        G(dr, (dt) => {
          i().showBothPrices ? dt(fn) : dt(Pn, !1);
        }), y(Zn), y(zt), p(Ue, nt);
      }, $$slots: { default: !0 } });
      var ot = q(Ne, 2), _t = (Ue) => {
        ya(Ue, { get highlights() {
          return d().highlights;
        }, get isSelected() {
          return S();
        }, get replaceLiquid() {
          return e(de);
        } });
      };
      G(ot, (Ue) => {
        d().highlights && Ue(_t);
      });
      var St = q(ot, 2), tt = (Ue) => {
        var He = s0(), nt = P(He);
        {
          let Bt = u(() => e(Y) || e(j)[0]);
          xa(nt, { get sellingPlans() {
            return e(j);
          }, get selectedSellingPlan() {
            return e(Bt);
          }, onChange: (Dt) => {
            le(oe, Dt, !0);
          } });
        }
        y(He), p(Ue, He);
      };
      G(St, (Ue) => {
        S() && e(re) && !d().sellingPlanGid && e(j).length > 1 && Ue(tt);
      });
      var xt = q(St, 2), It = (Ue) => {
        var He = o0();
        $t(He, 21, () => ({ length: e(O) }), Mr, (nt, Bt, Dt) => {
          var kn = Be(), zt = pe(kn), qt = (Qt) => {
            {
              let gn = u(() => e(T)[Dt] || null);
              Bo(Qt, { get dealBlock() {
                return i();
              }, get dealBar() {
                return d();
              }, get mainProduct() {
                return g();
              }, products: [], get selectedProductVariant() {
                return e(gn);
              }, onChange: (hn) => it(Dt, hn) });
            }
          }, mn = (Qt) => {
            {
              let gn = u(() => e(T)[Dt] || null);
              Bo(Qt, { get dealBlock() {
                return i();
              }, get dealBar() {
                return d();
              }, get products() {
                return f();
              }, get selectedProductVariant() {
                return e(gn);
              }, onChange: (hn) => it(Dt, hn), onRemove: () => at(Dt) });
            }
          };
          G(zt, (Qt) => {
            Dt === 0 ? Qt(qt) : Qt(mn, !1);
          }), p(nt, kn);
        }), y(He), p(Ue, He);
      };
      G(xt, (Ue) => {
        S() && Ue(It);
      });
      var Et = q(xt, 2), Jt = (Ue) => {
        {
          let He = u(() => ee(d()));
          dl(Ue, { get value() {
            return e(V);
          }, get min() {
            return e(He);
          }, onChange: (nt) => le(V, nt, !0) });
        }
      };
      G(Et, (Ue) => {
        S() && d().dealBarType === pt.QuantityBreak && d().quantitySelector && Ue(Jt);
      });
      var Yt = q(Et, 2), un = (Ue) => {
        {
          let He = u(() => e(Se).map((nt) => nt.variant.id));
          Ua(Ue, { get product() {
            return g();
          }, get productPersonalisation() {
            return d().productPersonalisation;
          }, get selectedVariantIds() {
            return e(He);
          }, get quantity() {
            return e(Se).length;
          }, get addPersonalisationModal() {
            return i().addPersonalisationModal;
          }, get onPersonalisationsChange() {
            return M();
          }, get initialValues() {
            return te();
          } });
        }
      };
      G(Yt, (Ue) => {
        S() && d().productPersonalisation && (i().blockLayout === "vertical" || i().blockLayout === "plain") && Ue(un);
      }), y(Te);
      var Kt = q(Te, 2);
      {
        let Ue = u(() => d().upsells || []);
        wi(Kt, { get dealBlock() {
          return i();
        }, get dealBarId() {
          return d().id;
        }, get upsells() {
          return e(Ue);
        }, get otherProducts() {
          return h();
        }, get complementaryProducts() {
          return v();
        }, get dealBarSelected() {
          return S();
        }, get dealSellingPlan() {
          return e(ie);
        }, onChange: (He) => {
          le(R, He, !0);
        } });
      }
      var ct = q(Kt, 2);
      Bi(ct, { get selectedDealBarIndex() {
        return _();
      }, get onChange() {
        return A();
      }, get dealBlock() {
        return i();
      }, get dealBar() {
        return d();
      }, get otherProducts() {
        return h();
      }, get selected() {
        return S();
      }, get sellingPlan() {
        return e(ie);
      }, get progressiveGifts() {
        return i().progressiveGifts;
      } });
      var Mt = q(ct, 2);
      {
        let Ue = u(() => d().freeGifts || []);
        yi(Mt, { get dealBlock() {
          return i();
        }, get freeGifts() {
          return e(Ue);
        }, get freeGiftsSummary() {
          return d().freeGiftsSummary;
        }, get otherProducts() {
          return h();
        }, get dealBarSelected() {
          return S();
        }, get sellingPlan() {
          return e(ie);
        }, onChange: (He) => {
          le(z, He, !0);
        } });
      }
      var Xt = q(Mt, 2);
      {
        let Ue = u(() => d().multipleGiftsSelectors || []);
        Si(Xt, { get dealBlock() {
          return i();
        }, get multipleGiftsSelectors() {
          return e(Ue);
        }, get sellingPlan() {
          return e(ie);
        }, get otherProducts() {
          return h();
        }, onChange: (He) => {
          le(C, He, !0);
        } });
      }
      p(ve, Ee);
    }, $$slots: { default: !0 } });
    var Ce = q(gt, 2), bt = (ve) => {
      Pi(ve, { get showAsSoldOut() {
        return d().showAsSoldOut;
      }, get replaceLiquid() {
        return e(de);
      } });
    };
    G(Ce, (ve) => {
      d().showAsSoldOutEnabled && d().showAsSoldOut && ve(bt);
    }), y(yt), be((ve) => {
      var We;
      rn = Lt(yt, 1, "kaching-bundles__bar", null, rn, ve), Pe(yt, "data-deal-bar-id", d().id), Vt(yt, e(Tt)), Pe(jt, "name", `kaching-bundles-deal-${(We = D()) != null ? We : ""}`), La(jt, d().id), Pe(jt, "id", e(Me)), Yi(jt, S()), jt.disabled = d().showAsSoldOutEnabled;
    }, [() => ({ "kaching-bundles__bar--selected": S() })]), p(n, yt);
    var Ye = Xe(st);
    return s(), Ye;
  }
  On(["change"]), Qe(Ou, { dealBlock: {}, dealBar: {}, product: {}, collectionBreaksProducts: {}, otherProducts: {}, selectedDealBarIndex: {}, complementaryProducts: {}, customQuantity: {}, currentVariantId: {}, componentId: {}, selected: {}, globalSellingPlan: {}, onDealBarSelect: {}, onDealBarDeselect: {}, onVariantSelect: {}, onVariantsChange: {}, onPersonalisationsChange: {}, personalisationInitialValues: {}, onProgressiveGiftsChange: {} }, [], [], !0);
  var Co = {};
  (function n(t, r, a, l) {
    var o = !!(t.Worker && t.Blob && t.Promise && t.OffscreenCanvas && t.OffscreenCanvasRenderingContext2D && t.HTMLCanvasElement && t.HTMLCanvasElement.prototype.transferControlToOffscreen && t.URL && t.URL.createObjectURL), c = typeof Path2D == "function" && typeof DOMMatrix == "function";
    function s() {
    }
    function i(z) {
      var C = r.exports.Promise, R = C !== void 0 ? C : t.Promise;
      return typeof R == "function" ? new R(z) : (z(s, s), null);
    }
    var d, g, f, h, _, v, b = /* @__PURE__ */ (function(z, C) {
      return { transform: function(R) {
        if (z) return R;
        if (C.has(R)) return C.get(R);
        var N = new OffscreenCanvas(R.width, R.height);
        return N.getContext("2d").drawImage(R, 0, 0), C.set(R, N), N;
      }, clear: function() {
        C.clear();
      } };
    })((function() {
      if (!t.OffscreenCanvas) return !1;
      try {
        var z = new OffscreenCanvas(1, 1), C = z.getContext("2d");
        C.fillRect(0, 0, 1, 1);
        var R = z.transferToImageBitmap();
        C.createPattern(R, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })(), /* @__PURE__ */ new Map()), x = (f = Math.floor(1e3 / 60), h = {}, _ = 0, typeof requestAnimationFrame == "function" && typeof cancelAnimationFrame == "function" ? (d = function(z) {
      var C = Math.random();
      return h[C] = requestAnimationFrame(function R(N) {
        _ === N || _ + f - 1 < N ? (_ = N, delete h[C], z()) : h[C] = requestAnimationFrame(R);
      }), C;
    }, g = function(z) {
      h[z] && cancelAnimationFrame(h[z]);
    }) : (d = function(z) {
      return setTimeout(z, f);
    }, g = function(z) {
      return clearTimeout(z);
    }), { frame: d, cancel: g }), D = /* @__PURE__ */ (function() {
      var z, C, R = {};
      return function() {
        if (z) return z;
        if (!a && o) {
          var N = ["var CONFETTI, SIZE = {}, module = {};", "(" + n.toString() + ")(this, module, true, SIZE);", "onmessage = function(msg) {", "  if (msg.data.options) {", "    CONFETTI(msg.data.options).then(function () {", "      if (msg.data.callback) {", "        postMessage({ callback: msg.data.callback });", "      }", "    });", "  } else if (msg.data.reset) {", "    CONFETTI && CONFETTI.reset();", "  } else if (msg.data.resize) {", "    SIZE.width = msg.data.resize.width;", "    SIZE.height = msg.data.resize.height;", "  } else if (msg.data.canvas) {", "    SIZE.width = msg.data.canvas.width;", "    SIZE.height = msg.data.canvas.height;", "    CONFETTI = module.exports.create(msg.data.canvas);", "  }", "}"].join(`
`);
          try {
            z = new Worker(URL.createObjectURL(new Blob([N])));
          } catch (J) {
            return typeof console != "undefined" && typeof console.warn == "function" && console.warn("🎊 Could not load worker", J), null;
          }
          (function(J) {
            function X(B, F) {
              J.postMessage({ options: B || {}, callback: F });
            }
            J.init = function(B) {
              var F = B.transferControlToOffscreen();
              J.postMessage({ canvas: F }, [F]);
            }, J.fire = function(B, F, V) {
              if (C) return X(B, null), C;
              var O = Math.random().toString(36).slice(2);
              return C = i(function(ee) {
                function ge(T) {
                  T.data.callback === O && (delete R[O], J.removeEventListener("message", ge), C = null, b.clear(), V(), ee());
                }
                J.addEventListener("message", ge), X(B, O), R[O] = ge.bind(null, { data: { callback: O } });
              });
            }, J.reset = function() {
              for (var B in J.postMessage({ reset: !0 }), R) R[B](), delete R[B];
            };
          })(z);
        }
        return z;
      };
    })(), S = { particleCount: 50, angle: 90, spread: 45, startVelocity: 45, decay: 0.9, gravity: 1, drift: 0, ticks: 200, x: 0.5, y: 0.5, shapes: ["square", "circle"], zIndex: 100, colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"], disableForReducedMotion: !1, scalar: 1 };
    function I(z, C, R) {
      return (function(N, J) {
        return J ? J(N) : N;
      })(z && z[C] != null ? z[C] : S[C], R);
    }
    function W(z) {
      return z < 0 ? 0 : Math.floor(z);
    }
    function Q(z, C) {
      return Math.floor(Math.random() * (C - z)) + z;
    }
    function E(z) {
      return parseInt(z, 16);
    }
    function K(z) {
      return z.map(M);
    }
    function M(z) {
      var C = String(z).replace(/[^0-9a-f]/gi, "");
      return C.length < 6 && (C = C[0] + C[0] + C[1] + C[1] + C[2] + C[2]), { r: E(C.substring(0, 2)), g: E(C.substring(2, 4)), b: E(C.substring(4, 6)) };
    }
    function te(z) {
      z.width = document.documentElement.clientWidth, z.height = document.documentElement.clientHeight;
    }
    function A(z) {
      var C = z.getBoundingClientRect();
      z.width = C.width, z.height = C.height;
    }
    function L(z) {
      var C = z.angle * (Math.PI / 180), R = z.spread * (Math.PI / 180);
      return { x: z.x, y: z.y, wobble: 10 * Math.random(), wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05), velocity: 0.5 * z.startVelocity + Math.random() * z.startVelocity, angle2D: -C + (0.5 * R - Math.random() * R), tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI, color: z.color, shape: z.shape, tick: 0, totalTicks: z.ticks, decay: z.decay, drift: z.drift, random: Math.random() + 2, tiltSin: 0, tiltCos: 0, wobbleX: 0, wobbleY: 0, gravity: 3 * z.gravity, ovalScalar: 0.6, scalar: z.scalar, flat: z.flat };
    }
    function se(z, C) {
      C.x += Math.cos(C.angle2D) * C.velocity + C.drift, C.y += Math.sin(C.angle2D) * C.velocity + C.gravity, C.velocity *= C.decay, C.flat ? (C.wobble = 0, C.wobbleX = C.x + 10 * C.scalar, C.wobbleY = C.y + 10 * C.scalar, C.tiltSin = 0, C.tiltCos = 0, C.random = 1) : (C.wobble += C.wobbleSpeed, C.wobbleX = C.x + 10 * C.scalar * Math.cos(C.wobble), C.wobbleY = C.y + 10 * C.scalar * Math.sin(C.wobble), C.tiltAngle += 0.1, C.tiltSin = Math.sin(C.tiltAngle), C.tiltCos = Math.cos(C.tiltAngle), C.random = Math.random() + 2);
      var R = C.tick++ / C.totalTicks, N = C.x + C.random * C.tiltCos, J = C.y + C.random * C.tiltSin, X = C.wobbleX + C.random * C.tiltCos, B = C.wobbleY + C.random * C.tiltSin;
      if (z.fillStyle = "rgba(" + C.color.r + ", " + C.color.g + ", " + C.color.b + ", " + (1 - R) + ")", z.beginPath(), c && C.shape.type === "path" && typeof C.shape.path == "string" && Array.isArray(C.shape.matrix)) z.fill((function(Se, me, ye, he, ce, ae, de) {
        var fe = new Path2D(Se), $e = new Path2D();
        $e.addPath(fe, new DOMMatrix(me));
        var qe = new Path2D();
        return qe.addPath($e, new DOMMatrix([Math.cos(de) * ce, Math.sin(de) * ce, -Math.sin(de) * ae, Math.cos(de) * ae, ye, he])), qe;
      })(C.shape.path, C.shape.matrix, C.x, C.y, 0.1 * Math.abs(X - N), 0.1 * Math.abs(B - J), Math.PI / 10 * C.wobble));
      else if (C.shape.type === "bitmap") {
        var F = Math.PI / 10 * C.wobble, V = 0.1 * Math.abs(X - N), O = 0.1 * Math.abs(B - J), ee = C.shape.bitmap.width * C.scalar, ge = C.shape.bitmap.height * C.scalar, T = new DOMMatrix([Math.cos(F) * V, Math.sin(F) * V, -Math.sin(F) * O, Math.cos(F) * O, C.x, C.y]);
        T.multiplySelf(new DOMMatrix(C.shape.matrix));
        var w = z.createPattern(b.transform(C.shape.bitmap), "no-repeat");
        w.setTransform(T), z.globalAlpha = 1 - R, z.fillStyle = w, z.fillRect(C.x - ee / 2, C.y - ge / 2, ee, ge), z.globalAlpha = 1;
      } else if (C.shape === "circle") z.ellipse ? z.ellipse(C.x, C.y, Math.abs(X - N) * C.ovalScalar, Math.abs(B - J) * C.ovalScalar, Math.PI / 10 * C.wobble, 0, 2 * Math.PI) : (function(Se, me, ye, he, ce, ae, de, fe, $e) {
        Se.save(), Se.translate(me, ye), Se.rotate(ae), Se.scale(he, ce), Se.arc(0, 0, 1, de, fe, $e), Se.restore();
      })(z, C.x, C.y, Math.abs(X - N) * C.ovalScalar, Math.abs(B - J) * C.ovalScalar, Math.PI / 10 * C.wobble, 0, 2 * Math.PI);
      else if (C.shape === "star") for (var U = Math.PI / 2 * 3, oe = 4 * C.scalar, j = 8 * C.scalar, re = C.x, Y = C.y, ie = 5, _e = Math.PI / ie; ie--; ) re = C.x + Math.cos(U) * j, Y = C.y + Math.sin(U) * j, z.lineTo(re, Y), U += _e, re = C.x + Math.cos(U) * oe, Y = C.y + Math.sin(U) * oe, z.lineTo(re, Y), U += _e;
      else z.moveTo(Math.floor(C.x), Math.floor(C.y)), z.lineTo(Math.floor(C.wobbleX), Math.floor(J)), z.lineTo(Math.floor(X), Math.floor(B)), z.lineTo(Math.floor(N), Math.floor(C.wobbleY));
      return z.closePath(), z.fill(), C.tick < C.totalTicks;
    }
    function Z(z, C) {
      var R, N = !z, J = !!I(C || {}, "resize"), X = !1, B = I(C, "disableForReducedMotion", Boolean), F = o && I(C || {}, "useWorker") ? D() : null, V = N ? te : A, O = !(!z || !F) && !!z.__confetti_initialized, ee = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion)").matches;
      function ge(w, U, oe) {
        for (var j = I(w, "particleCount", W), re = I(w, "angle", Number), Y = I(w, "spread", Number), ie = I(w, "startVelocity", Number), _e = I(w, "decay", Number), Se = I(w, "gravity", Number), me = I(w, "drift", Number), ye = I(w, "colors", K), he = I(w, "ticks", Number), ce = I(w, "shapes"), ae = I(w, "scalar"), de = !!I(w, "flat"), fe = (function(we) {
          var Ze = I(we, "origin", Object);
          return Ze.x = I(Ze, "x", Number), Ze.y = I(Ze, "y", Number), Ze;
        })(w), $e = j, qe = [], De = z.width * fe.x, ne = z.height * fe.y; $e--; ) qe.push(L({ x: De, y: ne, angle: re, spread: Y, startVelocity: ie, color: ye[$e % ye.length], shape: ce[Q(0, ce.length)], ticks: he, decay: _e, gravity: Se, drift: me, scalar: ae, flat: de }));
        return R ? R.addFettis(qe) : (R = (function(we, Ze, ke, Me, Ge) {
          var Ae, je, Tt = Ze.slice(), it = we.getContext("2d"), at = i(function(st) {
            function yt() {
              Ae = je = null, it.clearRect(0, 0, Me.width, Me.height), b.clear(), Ge(), st();
            }
            Ae = x.frame(function rn() {
              !a || Me.width === l.width && Me.height === l.height || (Me.width = we.width = l.width, Me.height = we.height = l.height), Me.width || Me.height || (ke(we), Me.width = we.width, Me.height = we.height), it.clearRect(0, 0, Me.width, Me.height), (Tt = Tt.filter(function(jt) {
                return se(it, jt);
              })).length ? Ae = x.frame(rn) : yt();
            }), je = yt;
          });
          return { addFettis: function(st) {
            return Tt = Tt.concat(st), at;
          }, canvas: we, promise: at, reset: function() {
            Ae && x.cancel(Ae), je && je();
          } };
        })(z, qe, V, U, oe), R.promise);
      }
      function T(w) {
        var U = B || I(w, "disableForReducedMotion", Boolean), oe = I(w, "zIndex", Number);
        if (U && ee) return i(function(ie) {
          ie();
        });
        N && R ? z = R.canvas : N && !z && (z = (function(ie) {
          var _e = document.createElement("canvas");
          return _e.style.position = "fixed", _e.style.top = "0px", _e.style.left = "0px", _e.style.pointerEvents = "none", _e.style.zIndex = ie, _e;
        })(oe), document.body.appendChild(z)), J && !O && V(z);
        var j = { width: z.width, height: z.height };
        function re() {
          if (F) {
            var ie = { getBoundingClientRect: function() {
              if (!N) return z.getBoundingClientRect();
            } };
            return V(ie), void F.postMessage({ resize: { width: ie.width, height: ie.height } });
          }
          j.width = j.height = null;
        }
        function Y() {
          R = null, J && (X = !1, t.removeEventListener("resize", re)), N && z && (document.body.contains(z) && document.body.removeChild(z), z = null, O = !1);
        }
        return F && !O && F.init(z), O = !0, F && (z.__confetti_initialized = !0), J && !X && (X = !0, t.addEventListener("resize", re, !1)), F ? F.fire(w, j, Y) : ge(w, j, Y);
      }
      return T.reset = function() {
        F && F.reset(), R && R.reset();
      }, T;
    }
    function H() {
      return v || (v = Z(null, { useWorker: !0, resize: !0 })), v;
    }
    r.exports = function() {
      return H().apply(this, arguments);
    }, r.exports.reset = function() {
      H().reset();
    }, r.exports.create = Z, r.exports.shapeFromPath = function(z) {
      if (!c) throw new Error("path confetti are not supported in this browser");
      var C, R;
      typeof z == "string" ? C = z : (C = z.path, R = z.matrix);
      var N = new Path2D(C), J = document.createElement("canvas").getContext("2d");
      if (!R) {
        for (var X, B, F = 1e3, V = F, O = F, ee = 0, ge = 0, T = 0; T < F; T += 2) for (var w = 0; w < F; w += 2) J.isPointInPath(N, T, w, "nonzero") && (V = Math.min(V, T), O = Math.min(O, w), ee = Math.max(ee, T), ge = Math.max(ge, w));
        X = ee - V, B = ge - O;
        var U = Math.min(10 / X, 10 / B);
        R = [U, 0, 0, U, -Math.round(X / 2 + V) * U, -Math.round(B / 2 + O) * U];
      }
      return { type: "path", path: C, matrix: R };
    }, r.exports.shapeFromText = function(z) {
      var C, R = 1, N = "#000000", J = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
      typeof z == "string" ? C = z : (C = z.text, R = "scalar" in z ? z.scalar : R, J = "fontFamily" in z ? z.fontFamily : J, N = "color" in z ? z.color : N);
      var X = 10 * R, B = X + "px " + J, F = new OffscreenCanvas(X, X), V = F.getContext("2d");
      V.font = B;
      var O = V.measureText(C), ee = Math.ceil(O.actualBoundingBoxRight + O.actualBoundingBoxLeft), ge = Math.ceil(O.actualBoundingBoxAscent + O.actualBoundingBoxDescent), T = O.actualBoundingBoxLeft + 2, w = O.actualBoundingBoxAscent + 2;
      ee += 4, ge += 4, (V = (F = new OffscreenCanvas(ee, ge)).getContext("2d")).font = B, V.fillStyle = N, V.fillText(C, T, w);
      var U = 1 / R;
      return { type: "bitmap", bitmap: F.transferToImageBitmap(), matrix: [U, 0, 0, U, -ee * U / 2, -ge * U / 2] };
    };
  })(/* @__PURE__ */ (function() {
    return typeof window != "undefined" ? window : typeof self != "undefined" ? self : this || {};
  })(), Co, !1);
  const u0 = Co.exports;
  Co.exports.create;
  var g0 = Tn('<svg viewBox="0 0 361 163" fill="none" aria-hidden="true"><path class="kaching-bundles__scratch-off-hint-path" d="M22 113.859C23.9107 84.035 22.7293 20.8901 54.8299 45.9835C94.9555 77.3502 81.1193 164.847 101.209 103.575C108.48 64.2518 127.202 -4.91471 143.923 33.0046C164.824 80.4037 155.535 144.223 184.564 113.859C213.593 83.495 160.179 15.685 201.982 45.9835C243.784 76.2821 263.524 183.445 278.619 122.651C293.714 61.8562 268.168 7.24414 303.004 33.0046C337.839 58.765 330.872 64.2534 339 92.7687" stroke="white" stroke-opacity="0.7" stroke-width="44" stroke-linecap="round"></path></svg>');
  function Fu(n, t) {
    Ke(t, !0);
    let r = m(t, "hidden", 7);
    var a = { get hidden() {
      return r();
    }, set hidden(c) {
      r(c), k();
    } }, l = g0();
    let o;
    return be((c) => o = Lt(l, 0, "kaching-bundles__scratch-off-hint", null, o, c), [() => ({ "kaching-bundles__scratch-off-hint--hidden": r() })]), p(n, l), Xe(a);
  }
  function h0(n, t) {
    n.key !== "Enter" && n.key !== " " || (n.preventDefault(), t());
  }
  Qe(Fu, { hidden: {} }, [], [], !0);
  var p0 = $('<canvas role="button" tabindex="0"></canvas> <!> <div aria-hidden="true"> </div>', 1), b0 = $("<div><!> <!></div>");
  function Lu(n, t) {
    Ke(t, !0);
    const r = () => Ie(d, "$config", a), [a, l] = vt(), o = 317 / 361;
    let c = m(t, "settings", 7), s = m(t, "onReveal", 7), i = m(t, "children", 7);
    const d = _n(), g = Ct();
    let f = u(() => Ie(g, "$translate", a)(c().title)), h = ze(lt(r().preview && !r().previewScratchOff)), _ = ze(!1), v = ze(void 0), b = ze(!1), x = u(() => bn({ "scratch-off-title-color": Le(c().titleColor), "scratch-off-title-size": `${c().titleSize}px` })), D = !1, S = null, I = null, W = 22, Q = null, E = ze(!1), K = ze(!1);
    const M = new Image();
    M.src = "https://bundles-assets.kachingappz.app/widget/scratch-off-background-v2.webp", Q = M, M.complete ? le(E, !0) : (M.addEventListener("load", () => {
      le(E, !0);
    }, { once: !0 }), M.addEventListener("error", () => {
      le(K, !0);
    }, { once: !0 }));
    let te = u(() => e(E) || e(K));
    function A() {
      if (!e(v)) return;
      const ee = e(v).getBoundingClientRect();
      if (ee.width === 0 || ee.height === 0) return;
      const ge = window.devicePixelRatio || 1;
      e(v).width = Math.floor(ee.width * ge), e(v).height = Math.floor(ee.height * ge);
      const T = e(v).getContext("2d");
      if (!T) return;
      T.scale(ge, ge), W = 44 * Math.min((ee.width - 10) / 361, (ee.height - 10) / 163, o) / 2, T.fillStyle = Le(c().backgroundColor), T.fillRect(0, 0, ee.width, ee.height), e(E) && Q && (T.globalAlpha = 0.6, T.drawImage(Q, 0, 0, ee.width, ee.height), T.globalAlpha = 1), T.globalCompositeOperation = "destination-out";
    }
    function L(ee) {
      if (!e(v)) return null;
      const ge = e(v).getBoundingClientRect();
      return { x: ee.clientX - ge.left, y: ee.clientY - ge.top };
    }
    function se(ee) {
      var ge;
      e(h) || e(_) || (D = !0, le(b, !0), I === null && (I = setTimeout(C, 1500)), (ge = e(v)) == null || ge.setPointerCapture(ee.pointerId), S = L(ee), (function(T) {
        if (!e(v) || !T) return;
        const w = e(v).getContext("2d");
        w && (w.beginPath(), w.arc(T.x, T.y, W, 0, 2 * Math.PI), w.fill());
      })(S));
    }
    function Z(ee) {
      if (!D || e(h) || e(_)) return;
      const ge = L(ee);
      ge && S && ((function(T, w) {
        if (!e(v)) return;
        const U = e(v).getContext("2d");
        if (!U) return;
        const oe = w.x - T.x, j = w.y - T.y, re = Math.hypot(oe, j), Y = Math.max(1, Math.ceil(re / 4));
        for (let ie = 0; ie <= Y; ie++) {
          const _e = ie / Y;
          U.beginPath(), U.arc(T.x + oe * _e, T.y + j * _e, W, 0, 2 * Math.PI), U.fill();
        }
      })(S, ge), S = ge);
    }
    function H(ee) {
      var ge;
      D = !1, (ge = e(v)) == null || ge.releasePointerCapture(ee.pointerId), S = null, C();
    }
    function z() {
      I !== null && (clearTimeout(I), I = null);
    }
    function C() {
      var ee;
      e(h) || e(_) || (z(), le(_, !0), (function() {
        if (!e(v)) return;
        const ge = e(v).getBoundingClientRect();
        u0({ particleCount: 120, spread: 70, startVelocity: 45, origin: { x: (ge.left + ge.width / 2) / window.innerWidth, y: (ge.top + ge.height / 2) / window.innerHeight } });
      })(), (ee = s()) == null || ee(), setTimeout(() => {
        le(h, !0), le(_, !1);
      }, 300));
    }
    Je(() => {
      if (e(te)) return;
      const ee = setTimeout(() => {
        le(K, !0);
      }, 5e3);
      return () => clearTimeout(ee);
    }), Je(() => () => z()), Je(() => {
      if (e(h) || e(_) || !e(v)) return;
      A();
      const ee = new ResizeObserver(() => {
        e(h) || e(_) || A();
      });
      return ee.observe(e(v)), () => ee.disconnect();
    });
    let R = JSON.stringify(c());
    Je(() => {
      const ee = JSON.stringify(c());
      ee !== R && (R = ee, r().preview && r().previewScratchOff && (le(h, !1), le(_, !1), le(b, !1), z()));
    });
    var N = { get settings() {
      return c();
    }, set settings(ee) {
      c(ee), k();
    }, get onReveal() {
      return s();
    }, set onReveal(ee) {
      s(ee), k();
    }, get children() {
      return i();
    }, set children(ee) {
      i(ee), k();
    } }, J = b0();
    let X;
    var B = P(J);
    jl(B, i);
    var F = q(B, 2), V = (ee) => {
      var ge = p0(), T = pe(ge);
      let w;
      T.__pointerdown = se, T.__pointermove = Z, T.__pointerup = H, T.__keydown = [h0, C], bi(T, (Y) => le(v, Y), () => e(v));
      var U = q(T, 2);
      {
        let Y = u(() => e(b) || e(_));
        Fu(U, { get hidden() {
          return e(Y);
        } });
      }
      var oe = q(U, 2);
      let j;
      var re = P(oe, !0);
      y(oe), be((Y, ie) => {
        w = Lt(T, 1, "kaching-bundles__scratch-off-canvas", null, w, Y), Pe(T, "aria-label", e(f)), j = Lt(oe, 1, "kaching-bundles__scratch-off-title", null, j, ie), ft(re, e(f));
      }, [() => ({ "kaching-bundles__scratch-off-canvas--revealing": e(_) }), () => ({ "kaching-bundles__scratch-off-title--hidden": e(b) || e(_) })]), Fc("pointercancel", T, H), p(ee, ge);
    };
    G(F, (ee) => {
      e(h) || ee(V);
    }), y(J), be((ee) => {
      X = Lt(J, 1, "kaching-bundles__scratch-off", null, X, ee), Vt(J, e(x));
    }, [() => ({ "kaching-bundles__scratch-off--unscratched": !e(h), "kaching-bundles__scratch-off--revealing": e(_), "kaching-bundles__scratch-off--loading": !e(h) && !e(te) })]), p(n, J);
    var O = Xe(N);
    return l(), O;
  }
  On(["pointerdown", "pointermove", "pointerup", "keydown"]), Qe(Lu, { settings: {}, onReveal: {}, children: {} }, [], [], !0);
  var f0 = $('<div class="kaching-bundles__bar-price"><!></div>'), v0 = $('<div class="kaching-bundles__bar-full-price"><!></div>'), _0 = $('<div class="kaching-bundles__bar-pricing"><!> <!></div>');
  function cs(n, t) {
    Ke(t, !0);
    const r = () => Ie(i, "$translate", l), a = () => Ie(d, "$formatPrice", l), [l, o] = vt(), c = m(t, "discountedPrice", 7), s = m(t, "fullPrice", 7), i = Ct(), d = cn();
    var g = { get discountedPrice() {
      return c();
    }, set discountedPrice(x) {
      c(x), k();
    }, get fullPrice() {
      return s();
    }, set fullPrice(x) {
      s(x), k();
    } }, f = _0(), h = P(f);
    rt(h, c, (x) => {
      var D = f0();
      Ve(P(D), () => a()(c())), y(D), be((S) => Pe(D, "data-a11y-label", S), [() => r()("system.price")]), p(x, D);
    });
    var _ = q(h, 2), v = (x) => {
      var D = Be();
      rt(pe(D), s, (S) => {
        var I = v0();
        Ve(P(I), () => a()(s())), y(I), be((W) => Pe(I, "data-a11y-label", W), [() => r()("system.original_price")]), p(S, I);
      }), p(x, D);
    };
    G(_, (x) => {
      s() > c() && x(v);
    }), y(f), p(n, f);
    var b = Xe(g);
    return o(), b;
  }
  Qe(cs, { discountedPrice: {}, fullPrice: {} }, [], [], !0);
  const Ha = ta(null), Io = (n) => bn({ "kaching-subscriptions-title-color": Le(n.titleColor), "kaching-subscriptions-subtitle-color": Le(n.subtitleColor), "kaching-subscriptions-title-font-size": n.titleSize + "px", "kaching-subscriptions-subtitle-font-size": n.subtitleSize + "px" });
  var k0 = $('<div class="kaching-bundles__bar-radio"></div>'), m0 = $('<div class="kaching-bundles__subscriptions__title"><!></div>'), x0 = $('<div class="kaching-bundles__subscriptions__subtitle"><!></div>'), y0 = $('<div class="kaching-bundles__bar-variants"><!></div>'), w0 = $('<div class="kaching-bundles__subscriptions__card kaching-bundles__bar-container"><div class="kaching-bundles__bar-wrapper"><div class="kaching-bundles__bar-main"><!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!></div> <!></div> <!></div></div> <!> <!></div></div>'), P0 = $('<div class="kaching-bundles__bar-radio"></div>'), S0 = $('<div class="kaching-bundles__subscriptions__title"><!></div>'), B0 = $('<div class="kaching-bundles__subscriptions__subtitle"><!></div>'), C0 = $('<div class="kaching-bundles__subscriptions__card kaching-bundles__bar-container"><div class="kaching-bundles__bar-wrapper"><div class="kaching-bundles__bar-main"><!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!></div> <!></div> <!></div></div></div></div>'), I0 = $("<div></div>");
  function ju(n, t) {
    Ke(t, !0);
    const r = () => Ie(Ha, "$selectedDealBarStore", o), a = () => Ie(_, "$formatPrice", o), l = () => Ie(h, "$translate", o), [o, c] = vt(), s = m(t, "subscriptions", 7), i = m(t, "sellingPlans", 7), d = m(t, "selectedSellingPlan", 7), g = m(t, "hideSellingPlanSelector", 7, !1), f = m(t, "onChange", 7), h = Ct(), _ = cn();
    let v = ze(lt(s().subscribeByDefault || d() ? "subscribe" : "one-time")), b = ze(lt(d() || i()[0])), x = ze(!1), D = u(() => s().subscribeByDefault), S = u(() => e(D) ? ["subscribe", "one-time"] : ["one-time", "subscribe"]);
    const I = u(() => Io(s())), W = u(() => {
      var R, N;
      const J = (N = (R = r()) == null ? void 0 : R.dealBar) == null ? void 0 : N.sellingPlanGid;
      if (J) return i().find((X) => X.id === Zt(J));
    }), Q = u(() => {
      var R;
      return (R = e(W)) != null ? R : e(b);
    }), E = u(() => {
      var R, N, J, X, B;
      return (B = (X = (N = (R = r()) == null ? void 0 : R.pricing.discountedPricesForSellingPlans.find((F) => {
        var V;
        return F.sellingPlanId === ((V = e(Q)) == null ? void 0 : V.id);
      })) == null ? void 0 : N.discountedPrice) != null ? X : (J = r()) == null ? void 0 : J.pricing.discountedPrice) != null ? B : 0;
    }), K = u(() => {
      var R, N;
      return (N = (R = r()) == null ? void 0 : R.pricing.discountedPriceWithoutSellingPlan) != null ? N : 0;
    }), M = u(() => {
      var R, N;
      return (N = (R = r()) == null ? void 0 : R.pricing.fullPrice) != null ? N : 0;
    }), te = u(() => {
      var R, N, J;
      return dn({ priceFormatter: a(), product: (R = r()) == null ? void 0 : R.product, totalFullPrice: e(M), totalDiscountedPrice: e(E), quantity: (J = (N = r()) == null ? void 0 : N.quantity) != null ? J : 1, sellingPlan: e(Q), unitQuantity: null });
    }), A = u(() => {
      var R, N, J;
      return dn({ priceFormatter: a(), product: (R = r()) == null ? void 0 : R.product, totalFullPrice: e(M), totalDiscountedPrice: e(K), quantity: (J = (N = r()) == null ? void 0 : N.quantity) != null ? J : 1, unitQuantity: null });
    });
    function L(R) {
      le(x, !0), le(v, R, !0), f()(R === "subscribe" ? e(b) : void 0);
    }
    function se(R) {
      le(b, R, !0), e(v) === "subscribe" && f()(R);
    }
    Fa(() => {
      e(v) === "subscribe" && f()(e(b));
    }), Je(() => {
      if (d()) return le(b, d(), !0), void le(v, "subscribe");
      if (i().length === 0) return void le(v, "one-time");
      i().some((R) => {
        var N;
        return R.id === ((N = e(b)) == null ? void 0 : N.id);
      }) || le(b, i()[0], !0), e(x) || le(v, e(D) ? "subscribe" : "one-time", !0), f()(e(v) === "subscribe" ? e(b) : void 0);
    });
    var Z = { get subscriptions() {
      return s();
    }, set subscriptions(R) {
      s(R), k();
    }, get sellingPlans() {
      return i();
    }, set sellingPlans(R) {
      i(R), k();
    }, get selectedSellingPlan() {
      return d();
    }, set selectedSellingPlan(R) {
      d(R), k();
    }, get hideSellingPlanSelector() {
      return g();
    }, set hideSellingPlanSelector(R = !1) {
      g(R), k();
    }, get onChange() {
      return f();
    }, set onChange(R) {
      f(R), k();
    } }, H = I0();
    let z;
    $t(H, 20, () => e(S), (R) => R, (R, N) => {
      var J = Be(), X = pe(J), B = (V) => {
        {
          let O = u(() => ["kaching-bundles__bar", i().length === 0 && "kaching-bundles__bar--disabled", e(v) === "subscribe" && "kaching-bundles__bar--selected"]);
          Ht(V, { element: "div", get class() {
            return e(O);
          }, onclick: () => L("subscribe"), children: (ee, ge) => {
            var T = w0(), w = P(T), U = P(w), oe = P(U), j = (qe) => {
              p(qe, k0());
            };
            G(oe, (qe) => {
              s().layout === "vertical" && qe(j);
            });
            var re = q(oe, 2), Y = P(re), ie = P(Y), _e = P(ie), Se = (qe) => {
              var De = m0();
              Ve(P(De), () => e(te)(l()(s().subscribeTitle))), y(De), p(qe, De);
            };
            G(_e, (qe) => {
              s().subscribeTitle && qe(Se);
            }), y(ie);
            var me = q(ie, 2), ye = (qe) => {
              var De = x0();
              Ve(P(De), () => e(te)(l()(s().subscribeSubtitle))), y(De), p(qe, De);
            };
            G(me, (qe) => {
              s().subscribeSubtitle && qe(ye);
            }), y(Y);
            var he = q(Y, 2), ce = (qe) => {
              cs(qe, { get discountedPrice() {
                return e(E);
              }, get fullPrice() {
                return e(M);
              } });
            };
            G(he, (qe) => {
              s().showPrices && r() && qe(ce);
            }), y(re), y(U);
            var ae = q(U, 2), de = (qe) => {
              {
                let De = u(() => e(v) === "subscribe");
                ya(qe, { get highlights() {
                  return s().highlights;
                }, get isSelected() {
                  return e(De);
                }, get replaceLiquid() {
                  return e(te);
                } });
              }
            };
            G(ae, (qe) => {
              s().highlights && qe(de);
            });
            var fe = q(ae, 2), $e = (qe) => {
              var De = y0();
              xa(P(De), { get sellingPlans() {
                return i();
              }, get selectedSellingPlan() {
                return e(b);
              }, onChange: se }), y(De), p(qe, De);
            };
            G(fe, (qe) => {
              e(v) === "subscribe" && i().length > 1 && e(b) && !g() && qe($e);
            }), y(w), y(T), p(ee, T);
          }, $$slots: { default: !0 } });
        }
      }, F = (V) => {
        {
          let O = u(() => ["kaching-bundles__bar", i().length === 0 && "kaching-bundles__bar--disabled", e(v) === "one-time" && "kaching-bundles__bar--selected"]);
          Ht(V, { element: "div", get class() {
            return e(O);
          }, onclick: () => L("one-time"), children: (ee, ge) => {
            var T = C0(), w = P(T), U = P(w), oe = P(U), j = (ae) => {
              p(ae, P0());
            };
            G(oe, (ae) => {
              s().layout === "vertical" && ae(j);
            });
            var re = q(oe, 2), Y = P(re), ie = P(Y), _e = P(ie), Se = (ae) => {
              var de = S0();
              Ve(P(de), () => e(A)(l()(s().oneTimeTitle))), y(de), p(ae, de);
            };
            G(_e, (ae) => {
              s().oneTimeTitle && ae(Se);
            }), y(ie);
            var me = q(ie, 2), ye = (ae) => {
              var de = B0();
              Ve(P(de), () => e(A)(l()(s().oneTimeSubtitle))), y(de), p(ae, de);
            };
            G(me, (ae) => {
              s().oneTimeSubtitle && ae(ye);
            }), y(Y);
            var he = q(Y, 2), ce = (ae) => {
              cs(ae, { get discountedPrice() {
                return e(K);
              }, get fullPrice() {
                return e(M);
              } });
            };
            G(he, (ae) => {
              s().showPrices && r() && ae(ce);
            }), y(re), y(U), y(w), y(T), p(ee, T);
          }, $$slots: { default: !0 } });
        }
      };
      G(X, (V) => {
        N === "subscribe" ? V(B) : V(F, !1);
      }), p(R, J);
    }), y(H), be((R) => {
      z = Lt(H, 1, "kaching-bundles__subscriptions kaching-bundles__bars", null, z, R), Vt(H, e(I));
    }, [() => ({ "kaching-bundles__bars--horizontal": s().layout === "horizontal" })]), p(n, H);
    var C = Xe(Z);
    return c(), C;
  }
  Qe(ju, { subscriptions: {}, sellingPlans: {}, selectedSellingPlan: {}, hideSellingPlanSelector: {}, onChange: {} }, [], [], !0);
  var M0 = $('<div class="kaching-bundles__subscriptions__title"><!></div>'), z0 = $('<div class="kaching-bundles__subscriptions__subtitle"><!></div>'), $0 = $('<div class="kaching-bundles__bar-variants"><!></div>'), D0 = $('<div class="kaching-bundles__subscriptions__card kaching-bundles__bar-container"><div class="kaching-bundles__bar-wrapper"><div class="kaching-bundles__bar-main"><span class="kaching-bundles__subscriptions__checkbox"><!></span> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!></div> <!></div> <!></div></div> <!> <!></div></div>'), A0 = $('<div class="kaching-bundles__subscriptions kaching-bundles__bars kaching-bundles__subscriptions--checkbox"><!></div>');
  function Eu(n, t) {
    Ke(t, !0);
    const r = () => Ie(Ha, "$selectedDealBarStore", l), a = () => Ie(f, "$translate", l), [l, o] = vt(), c = m(t, "subscriptions", 7), s = m(t, "sellingPlans", 7), i = m(t, "selectedSellingPlan", 7), d = m(t, "hideSellingPlanSelector", 7, !1), g = m(t, "onChange", 7), f = Ct(), h = cn();
    let _ = ze(lt(c().subscribeByDefault || !!i())), v = ze(lt(i() || s()[0])), b = ze(!1);
    const x = u(() => Io(c())), D = u(() => {
      var L, se;
      const Z = (se = (L = r()) == null ? void 0 : L.dealBar) == null ? void 0 : se.sellingPlanGid;
      if (Z) return s().find((H) => H.id === Zt(Z));
    }), S = u(() => {
      var L;
      return (L = e(D)) != null ? L : e(v);
    }), I = u(() => {
      var L, se, Z, H, z;
      return (z = (H = (se = (L = r()) == null ? void 0 : L.pricing.discountedPricesForSellingPlans.find((C) => {
        var R;
        return C.sellingPlanId === ((R = e(S)) == null ? void 0 : R.id);
      })) == null ? void 0 : se.discountedPrice) != null ? H : (Z = r()) == null ? void 0 : Z.pricing.discountedPrice) != null ? z : 0;
    }), W = u(() => {
      var L, se;
      return (se = (L = r()) == null ? void 0 : L.pricing.fullPrice) != null ? se : 0;
    }), Q = u(() => {
      var L, se, Z;
      return dn({ priceFormatter: Ie(h, "$formatPrice", l), product: (L = r()) == null ? void 0 : L.product, totalFullPrice: e(W), totalDiscountedPrice: e(I), quantity: (Z = (se = r()) == null ? void 0 : se.quantity) != null ? Z : 1, sellingPlan: e(S), unitQuantity: null });
    });
    function E(L) {
      le(v, L, !0), g()(L);
    }
    Je(() => {
      if (i()) return le(v, i(), !0), void le(_, !0);
      if (s().length === 0) return void le(_, !1);
      e(v) && s().some((L) => L.id === e(v).id) || le(v, s()[0], !0), e(b) || le(_, c().subscribeByDefault, !0), g()(e(_) ? e(v) : void 0);
    }), Fa(() => {
      e(_) && g()(e(v));
    });
    var K = { get subscriptions() {
      return c();
    }, set subscriptions(L) {
      c(L), k();
    }, get sellingPlans() {
      return s();
    }, set sellingPlans(L) {
      s(L), k();
    }, get selectedSellingPlan() {
      return i();
    }, set selectedSellingPlan(L) {
      i(L), k();
    }, get hideSellingPlanSelector() {
      return d();
    }, set hideSellingPlanSelector(L = !1) {
      d(L), k();
    }, get onChange() {
      return g();
    }, set onChange(L) {
      g(L), k();
    } }, M = A0(), te = P(M);
    {
      let L = u(() => ["kaching-bundles__bar", s().length === 0 && "kaching-bundles__bar--disabled"]);
      Ht(te, { element: "div", get class() {
        return e(L);
      }, role: "checkbox", get "aria-checked"() {
        return e(_);
      }, onclick: function() {
        le(b, !0), le(_, !e(_)), g()(e(_) ? e(v) : void 0);
      }, children: (se, Z) => {
        var H = D0(), z = P(H), C = P(z), R = P(C), N = P(R), J = (Y) => {
          ls(Y);
        };
        G(N, (Y) => {
          e(_) && Y(J);
        }), y(R);
        var X = q(R, 2), B = P(X), F = P(B), V = P(F), O = (Y) => {
          var ie = M0();
          Ve(P(ie), () => e(Q)(a()(c().subscribeTitle))), y(ie), p(Y, ie);
        };
        G(V, (Y) => {
          c().subscribeTitle && Y(O);
        }), y(F);
        var ee = q(F, 2), ge = (Y) => {
          var ie = z0();
          Ve(P(ie), () => e(Q)(a()(c().subscribeSubtitle))), y(ie), p(Y, ie);
        };
        G(ee, (Y) => {
          c().subscribeSubtitle && Y(ge);
        }), y(B);
        var T = q(B, 2), w = (Y) => {
          cs(Y, { get discountedPrice() {
            return e(I);
          }, get fullPrice() {
            return e(W);
          } });
        };
        G(T, (Y) => {
          c().showPrices && r() && Y(w);
        }), y(X), y(C);
        var U = q(C, 2), oe = (Y) => {
          ya(Y, { get highlights() {
            return c().highlights;
          }, get isSelected() {
            return e(_);
          }, get replaceLiquid() {
            return e(Q);
          } });
        };
        G(U, (Y) => {
          c().highlights && Y(oe);
        });
        var j = q(U, 2), re = (Y) => {
          var ie = $0();
          xa(P(ie), { get sellingPlans() {
            return s();
          }, get selectedSellingPlan() {
            return e(v);
          }, onChange: E }), y(ie), p(Y, ie);
        };
        G(j, (Y) => {
          e(_) && s().length > 1 && e(v) && !d() && Y(re);
        }), y(z), y(H), p(se, H);
      }, $$slots: { default: !0 } });
    }
    y(M), be(() => Vt(M, e(x))), p(n, M);
    var A = Xe(K);
    return o(), A;
  }
  function V0(n, t, r, a) {
    t()(r().subscribeByDefault ? void 0 : e(a));
  }
  Qe(Eu, { subscriptions: {}, sellingPlans: {}, selectedSellingPlan: {}, hideSellingPlanSelector: {}, onChange: {} }, [], [], !0);
  var T0 = $('<div class="kaching-bundles__subscriptions kaching-bundles__subscriptions--link"><button type="button" class="kaching-bundles__subscriptions__link"><!><!></button></div>');
  function Ru(n, t) {
    Ke(t, !0);
    const r = () => Ie(Ha, "$selectedDealBarStore", l), a = () => Ie(h, "$formatPrice", l), [l, o] = vt(), c = m(t, "subscriptions", 7), s = m(t, "sellingPlans", 7), i = m(t, "selectedSellingPlan", 7), d = m(t, "onChange", 7), g = m(t, "onRequestAddToCart", 7), f = Ct(), h = cn(), _ = u(() => Io(c())), v = u(() => {
      var Z, H;
      const z = (H = (Z = r()) == null ? void 0 : Z.dealBar) == null ? void 0 : H.sellingPlanGid;
      if (z) return s().find((C) => C.id === Zt(z));
    }), b = u(() => {
      var Z, H;
      return (H = (Z = e(v)) != null ? Z : i()) != null ? H : s()[0];
    }), x = u(() => {
      var Z, H, z, C, R;
      return (R = (C = (H = (Z = r()) == null ? void 0 : Z.pricing.discountedPricesForSellingPlans.find((N) => {
        var J;
        return N.sellingPlanId === ((J = e(b)) == null ? void 0 : J.id);
      })) == null ? void 0 : H.discountedPrice) != null ? C : (z = r()) == null ? void 0 : z.pricing.discountedPrice) != null ? R : 0;
    }), D = u(() => {
      var Z, H;
      return (H = (Z = r()) == null ? void 0 : Z.pricing.discountedPriceWithoutSellingPlan) != null ? H : 0;
    }), S = u(() => {
      var Z, H;
      return (H = (Z = r()) == null ? void 0 : Z.pricing.fullPrice) != null ? H : 0;
    }), I = u(() => {
      var Z, H, z;
      return dn({ priceFormatter: a(), product: (Z = r()) == null ? void 0 : Z.product, totalFullPrice: e(S), totalDiscountedPrice: c().subscribeByDefault ? e(D) : e(x), quantity: (z = (H = r()) == null ? void 0 : H.quantity) != null ? z : 1, sellingPlan: c().subscribeByDefault ? void 0 : e(b), unitQuantity: null });
    }), W = u(() => c().subscribeByDefault ? e(D) : e(x)), Q = u(() => {
      const Z = c().subscribeByDefault ? c().oneTimeTitle : c().subscribeTitle;
      return Z ? e(I)(Ie(f, "$translate", l)(Z)) : "";
    });
    let E, K = !1;
    Je(() => {
      const Z = s().length !== 0 && c().subscribeByDefault ? e(b) : void 0;
      K && (Z == null ? void 0 : Z.id) === E || (E = Z == null ? void 0 : Z.id, K = !0, d()(Z));
    });
    var M = { get subscriptions() {
      return c();
    }, set subscriptions(Z) {
      c(Z), k();
    }, get sellingPlans() {
      return s();
    }, set sellingPlans(Z) {
      s(Z), k();
    }, get selectedSellingPlan() {
      return i();
    }, set selectedSellingPlan(Z) {
      i(Z), k();
    }, get onChange() {
      return d();
    }, set onChange(Z) {
      d(Z), k();
    }, get onRequestAddToCart() {
      return g();
    }, set onRequestAddToCart(Z) {
      g(Z), k();
    } }, te = Be(), A = pe(te), L = (Z) => {
      var H = T0(), z = P(H);
      z.__click = [V0, g, c, b];
      var C = P(z);
      Ve(C, () => e(Q));
      var R = q(C), N = (J) => {
        var X = Wn();
        be((B) => ft(X, B), [() => " • " + a()(e(W))]), p(J, X);
      };
      G(R, (J) => {
        c().showPrices && r() && J(N);
      }), y(z), y(H), be(() => Vt(H, e(_))), p(Z, H);
    };
    G(A, (Z) => {
      s().length > 0 && e(Q) && Z(L);
    }), p(n, te);
    var se = Xe(M);
    return o(), se;
  }
  On(["click"]), Qe(Ru, { subscriptions: {}, sellingPlans: {}, selectedSellingPlan: {}, onChange: {}, onRequestAddToCart: {} }, [], [], !0);
  var q0 = $('<div class="kaching-bundles__block-title"><!></div>'), G0 = $('<!> <div class="kaching-bundles__subscriptions-wrapper"><!></div>', 1);
  function Nu(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "subscriptions", 7), o = m(t, "sellingPlans", 7), c = m(t, "selectedSellingPlan", 7), s = m(t, "hideSellingPlanSelector", 7, !1), i = m(t, "hideTitle", 7, !1), d = m(t, "onChange", 7), g = m(t, "onRequestAddToCart", 7), f = Ct(), h = u(() => l().title ? Ie(f, "$translate", r)(l().title) : "");
    var _ = { get subscriptions() {
      return l();
    }, set subscriptions(E) {
      l(E), k();
    }, get sellingPlans() {
      return o();
    }, set sellingPlans(E) {
      o(E), k();
    }, get selectedSellingPlan() {
      return c();
    }, set selectedSellingPlan(E) {
      c(E), k();
    }, get hideSellingPlanSelector() {
      return s();
    }, set hideSellingPlanSelector(E = !1) {
      s(E), k();
    }, get hideTitle() {
      return i();
    }, set hideTitle(E = !1) {
      i(E), k();
    }, get onChange() {
      return d();
    }, set onChange(E) {
      d(E), k();
    }, get onRequestAddToCart() {
      return g();
    }, set onRequestAddToCart(E) {
      g(E), k();
    } }, v = G0(), b = pe(v), x = (E) => {
      var K = q0();
      Ve(P(K), () => e(h)), y(K), p(E, K);
    };
    G(b, (E) => {
      e(h) && !i() && E(x);
    });
    var D = q(b, 2), S = P(D), I = (E) => {
      Eu(E, { get subscriptions() {
        return l();
      }, get sellingPlans() {
        return o();
      }, get selectedSellingPlan() {
        return c();
      }, get hideSellingPlanSelector() {
        return s();
      }, get onChange() {
        return d();
      } });
    }, W = (E) => {
      var K = Be(), M = pe(K), te = (L) => {
        Ru(L, { get subscriptions() {
          return l();
        }, get sellingPlans() {
          return o();
        }, get selectedSellingPlan() {
          return c();
        }, get onChange() {
          return d();
        }, get onRequestAddToCart() {
          return g();
        } });
      }, A = (L) => {
        ju(L, { get subscriptions() {
          return l();
        }, get sellingPlans() {
          return o();
        }, get selectedSellingPlan() {
          return c();
        }, get hideSellingPlanSelector() {
          return s();
        }, get onChange() {
          return d();
        } });
      };
      G(M, (L) => {
        l().layout === "link" ? L(te) : L(A, !1);
      }, !0), p(E, K);
    };
    G(S, (E) => {
      l().layout === "checkbox" ? E(I) : E(W, !1);
    }), y(D), p(n, v);
    var Q = Xe(_);
    return a(), Q;
  }
  Qe(Nu, { subscriptions: {}, sellingPlans: {}, selectedSellingPlan: {}, hideSellingPlanSelector: {}, hideTitle: {}, onChange: {}, onRequestAddToCart: {} }, [], [], !0);
  var O0 = Tn('<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.584 21H42.834V14C42.834 6.279 36.555 0 28.834 0C21.113 0 14.834 6.279 14.834 14V21H13.084C10.1907 21 7.83398 23.3543 7.83398 26.25V50.75C7.83398 53.6457 10.1907 56 13.084 56H44.584C47.4773 56 49.834 53.6457 49.834 50.75V26.25C49.834 23.3543 47.4773 21 44.584 21ZM19.5007 14C19.5007 8.85267 23.6867 4.66667 28.834 4.66667C33.9813 4.66667 38.1673 8.85267 38.1673 14V21H19.5007V14ZM31.1673 39.018V44.3333C31.1673 45.6213 30.1243 46.6667 28.834 46.6667C27.5436 46.6667 26.5007 45.6213 26.5007 44.3333V39.018C25.1123 38.2083 24.1673 36.7197 24.1673 35C24.1673 32.4263 26.2603 30.3333 28.834 30.3333C31.4076 30.3333 33.5007 32.4263 33.5007 35C33.5007 36.7197 32.5557 38.2083 31.1673 39.018Z" fill="currentColor" transform="translate(21.5, 22)"></path></svg>');
  function Qu(n) {
    p(n, O0());
  }
  Qe(Qu, {}, [], [], !0);
  var F0 = $('<img alt="Locked" class="kaching-bundles__progressive-gifts__gift__image"/>'), L0 = $('<span class="kaching-bundles__progressive-gifts__gift__label__text"><!></span>'), j0 = $('<span class="kaching-bundles__progressive-gifts__gift__label__text kaching-bundles__progressive-gifts__gift__label__text--crossed-out"><!></span>'), E0 = $('<div class="kaching-bundles__progressive-gifts__gift__label"><!> <!></div>'), R0 = $('<div class="kaching-bundles__progressive-gifts__gift__content"><div class="kaching-bundles__progressive-gifts__gift__image-wrapper"><!></div> <div class="kaching-bundles__progressive-gifts__gift__title kaching-bundles__progressive-gifts__gift__title--locked"><!></div> <!></div>'), N0 = $('<div class="kaching-bundles__progressive-gifts__gift__image-wrapper"><img class="kaching-bundles__progressive-gifts__gift__image"/></div>'), Q0 = $('<span class="kaching-bundles__progressive-gifts__gift__title"><!></span>'), W0 = $('<span class="kaching-bundles__progressive-gifts__gift__label__text"><!></span>'), U0 = $('<span class="kaching-bundles__progressive-gifts__gift__label__text kaching-bundles__progressive-gifts__gift__label__text--crossed-out"><!></span>'), H0 = $('<div class="kaching-bundles__progressive-gifts__gift__label"><!> <!></div>'), Z0 = $('<div><div class="kaching-bundles__progressive-gifts__gift__content"><!> <div class="kaching-bundles__progressive-gifts__gift__details"><div class="kaching-bundles__progressive-gifts__gift__details__content"><!> <!></div> <!></div></div></div>');
  function Wu(n, t) {
    Ke(t, !0);
    const r = () => Ie(S, "$config", o), a = () => Ie(b, "$translate", o), l = () => Ie(D, "$getMediaImageUrl", o), [o, c] = vt(), s = m(t, "progressiveGifts", 7), i = m(t, "gift", 7), d = m(t, "product", 7), g = m(t, "selectedDealBarIndex", 7), f = m(t, "sellingPlan", 7), h = m(t, "onChange", 7), _ = m(t, "onUnlock", 7), v = m(t, "onSubscribe", 7), b = Ct(), x = cn(), D = Fn(), S = _n(), I = u(() => i().differentVariantsEnabled), W = u(() => {
      var T;
      return d() ? i().variantGIDs ? i().variantGIDs.map(Zt) : (T = d()) == null ? void 0 : T.variants.map((w) => w.id) : null;
    }), Q = u(() => {
      if (d()) return { ...d(), variants: d().variants.filter((T) => (r().preview || T.availableForSale) && (!e(W) || e(W).includes(T.id))) };
    });
    let E = ze(lt([]));
    const K = u(() => (function(T, w, U) {
      return T.length > 0 ? T : w != null && w.availableForSale && w.variants.length > 0 ? Array.from({ length: U }, () => w.variants[0].id) : [];
    })(e(E), e(Q), i().quantity)), M = u(() => d() && e(K).length > 0 ? e(K).map((T) => d().variants.find((w) => w.id === T)).filter((T) => T !== void 0) : []), te = u(() => {
      var T;
      return dn({ priceFormatter: Ie(x, "$formatPrice", o), product: d(), totalFullPrice: ((T = e(M)) == null ? void 0 : T.reduce((w, U) => {
        var oe;
        return w + ((oe = U == null ? void 0 : U.price) != null ? oe : 0);
      }, 0)) || 0, totalDiscountedPrice: 0, quantity: i().quantity, unitQuantity: kr(e(M).map((w) => ({ variant: w, quantity: 1 }))) });
    }), A = u(() => e(te)(a()(i().title))), L = u(() => e(te)(a()(i().lockedTitle))), se = u(() => e(te)(a()(i().label))), Z = u(() => e(te)(a()(i().labelCrossedOut))), H = u(() => g() === null || !vo(i(), g() + 1)), z = u(() => pu(i(), f())), C = u(() => e(H) || e(z));
    function R() {
      e(H) && _()(), e(z) && v()();
    }
    const N = u(() => {
      var T, w, U;
      return i().giftType === "shipping" ? po : ((w = (T = e(M)) == null ? void 0 : T[0]) == null ? void 0 : w.image) || ((U = d()) == null ? void 0 : U.image);
    }), J = u(() => i().mediaImageGID ? l()(i().mediaImageGID) : e(N)), X = u(() => !s().inheritStyle && s().style && l()(s().style.lockedMediaImageGID));
    Je(() => {
      if (d() && e(M) && !e(C)) {
        const T = Object.values(e(M).reduce((w, U) => (w[U.id] ? w[U.id].quantity += 1 : w[U.id] = { variant: U, quantity: 1 }, w), {}));
        nn(() => h()({ product: d(), variants: T }));
      } else nn(() => h()(void 0));
    }), pr(() => {
      i().productGID;
    }), Je(() => {
      e(C) && e(J) && (new Image().src = e(J));
    });
    const B = u(() => !(i().giftType !== "product" || !d() || d().availableForSale && d().variants.filter((T) => T.availableForSale && (!e(W) || e(W).includes(T.id))).length !== 0));
    var F = { get progressiveGifts() {
      return s();
    }, set progressiveGifts(T) {
      s(T), k();
    }, get gift() {
      return i();
    }, set gift(T) {
      i(T), k();
    }, get product() {
      return d();
    }, set product(T) {
      d(T), k();
    }, get selectedDealBarIndex() {
      return g();
    }, set selectedDealBarIndex(T) {
      g(T), k();
    }, get sellingPlan() {
      return f();
    }, set sellingPlan(T) {
      f(T), k();
    }, get onChange() {
      return h();
    }, set onChange(T) {
      h(T), k();
    }, get onUnlock() {
      return _();
    }, set onUnlock(T) {
      _(T), k();
    }, get onSubscribe() {
      return v();
    }, set onSubscribe(T) {
      v(T), k();
    } }, V = Be(), O = pe(V), ee = (T) => {
      var w = Be(), U = pe(w), oe = (j) => {
        var re = Be(), Y = pe(re), ie = (Se) => {
          Ht(Se, { element: "div", class: "kaching-bundles__progressive-gifts__gift kaching-bundles__progressive-gifts__gift--locked", onclick: R, children: (me, ye) => {
            var he = R0(), ce = P(he), ae = P(ce), de = (ne) => {
              var we = F0();
              be(() => Pe(we, "src", e(X))), p(ne, we);
            }, fe = (ne) => {
              Qu(ne);
            };
            G(ae, (ne) => {
              e(X) ? ne(de) : ne(fe, !1);
            }), y(ce);
            var $e = q(ce, 2);
            Ve(P($e), () => e(L)), y($e);
            var qe = q($e, 2), De = (ne) => {
              var we = E0(), Ze = P(we), ke = (Ae) => {
                var je = L0();
                Ve(P(je), () => e(se)), y(je), p(Ae, je);
              };
              G(Ze, (Ae) => {
                e(se) && Ae(ke);
              });
              var Me = q(Ze, 2), Ge = (Ae) => {
                var je = j0();
                Ve(P(je), () => e(Z)), y(je), p(Ae, je);
              };
              G(Me, (Ae) => {
                e(Z) && Ae(Ge);
              }), y(we), p(ne, we);
            };
            G(qe, (ne) => {
              (e(se) || e(Z)) && s().showLockedGiftLabels && ne(De);
            }), y(he), p(me, he);
          }, $$slots: { default: !0 } });
        }, _e = (Se) => {
          var me = Z0();
          let ye;
          var he = P(me), ce = P(he), ae = (ke) => {
            var Me = N0(), Ge = P(Me);
            y(Me), be(() => {
              var Ae, je;
              Pe(Ge, "src", e(J)), Pe(Ge, "alt", (je = (Ae = d()) == null ? void 0 : Ae.title) != null ? je : "");
            }), p(ke, Me);
          };
          G(ce, (ke) => {
            e(J) && ke(ae);
          });
          var de = q(ce, 2), fe = P(de), $e = P(fe), qe = (ke) => {
            var Me = Q0();
            Ve(P(Me), () => e(A)), y(Me), p(ke, Me);
          };
          G($e, (ke) => {
            e(A) && ke(qe);
          });
          var De = q($e, 2), ne = (ke) => {
            var Me = H0(), Ge = P(Me), Ae = (it) => {
              var at = W0();
              Ve(P(at), () => e(se)), y(at), p(it, at);
            };
            G(Ge, (it) => {
              e(se) && it(Ae);
            });
            var je = q(Ge, 2), Tt = (it) => {
              var at = U0();
              Ve(P(at), () => e(Z)), y(at), p(it, at);
            };
            G(je, (it) => {
              e(Z) && it(Tt);
            }), y(Me), p(ke, Me);
          };
          G(De, (ke) => {
            (e(se) || e(Z)) && ke(ne);
          }), y(fe);
          var we = q(fe, 2), Ze = (ke) => {
            var Me = Be();
            $t(pe(Me), 17, () => ({ length: e(I) ? i().quantity : 1 }), Mr, (Ge, Ae, je) => {
              var Tt = Be(), it = pe(Tt), at = (st) => {
                {
                  let yt = u(() => e(I) ? je + 1 : void 0);
                  Un(st, { get product() {
                    return e(Q);
                  }, get selectedVariantId() {
                    return e(K)[je];
                  }, get number() {
                    return e(yt);
                  }, forceDropdown: !0, onChange: (rn) => (function(jt, gt) {
                    e(I) ? le(E, [...e(K).slice(0, gt), jt, ...e(K).slice(gt + 1)], !0) : le(E, Array.from({ length: i().quantity }, () => jt), !0);
                  })(rn, je) });
                }
              };
              G(it, (st) => {
                e(K)[je] !== void 0 && st(at);
              }), p(Ge, Tt);
            }), p(ke, Me);
          };
          G(we, (ke) => {
            e(Q) && e(Q).variants.length > 1 && e(K).length > 0 && ke(Ze);
          }), y(de), y(he), y(me), be((ke) => ye = Lt(me, 1, "kaching-bundles__progressive-gifts__gift", null, ye, ke), [() => ({ "kaching-bundles__progressive-gifts__gift--out-of-stock": r().preview && e(B) })]), p(Se, me);
        };
        G(Y, (Se) => {
          e(C) ? Se(ie) : Se(_e, !1);
        }), p(j, re);
      };
      G(U, (j) => {
        var re;
        (d() && ((re = e(M)) != null && re.length || r().preview && e(B)) || i().giftType === "shipping") && j(oe);
      }), p(T, w);
    };
    G(O, (T) => {
      e(C) && s().hideLockedGifts || T(ee);
    }), p(n, V);
    var ge = Xe(F);
    return c(), ge;
  }
  Qe(Wu, { progressiveGifts: {}, gift: {}, product: {}, selectedDealBarIndex: {}, sellingPlan: {}, onChange: {}, onUnlock: {}, onSubscribe: {} }, [], [], !0);
  var J0 = $('<span class="kaching-bundles__progressive-gifts__title"><!></span>'), Y0 = $('<span class="kaching-bundles__progressive-gifts__subtitle"><!></span>'), K0 = $('<div class="kaching-bundles__progressive-gifts"><div class="kaching-bundles__progressive-gifts__header"><!> <!></div> <div></div></div>');
  function Uu(n, t) {
    Ke(t, !0);
    const r = () => Ie(b, "$config", l), a = () => Ie(v, "$translate", l), [l, o] = vt(), c = m(t, "progressiveGifts", 7), s = m(t, "dealBlock", 7), i = m(t, "otherProducts", 7), d = m(t, "selectedDealBarIndex", 7), g = m(t, "sellingPlan", 7), f = m(t, "onChange", 7), h = m(t, "onUnlock", 7), _ = m(t, "onSubscribe", 7), v = Ct(), b = _n();
    let x = ze(lt({}));
    const D = u(() => ((te) => {
      const { progressiveGifts: A, colors: L, fonts: se } = te, Z = (A == null ? void 0 : A.inheritStyle) || !(A != null && A.style);
      return bn({ "kaching-bundles-progressive-gifts-title-color": Le(A.titleColor), "kaching-bundles-progressive-gifts-title-alignment": A.titleAlignment, "kaching-bundles-progressive-gifts-title-size": A.titleSize + "px", "kaching-bundles-progressive-gifts-title-weight": or(A.titleStyle), "kaching-bundles-progressive-gifts-title-style": cr(A.titleStyle), "kaching-bundles-progressive-gifts-subtitle-color": Le(A.subtitleColor), "kaching-bundles-progressive-gifts-subtitle-alignment": A.subtitleAlignment, "kaching-bundles-progressive-gifts-subtitle-size": A.subtitleSize + "px", "kaching-bundles-progressive-gifts-subtitle-weight": or(A.subtitleStyle), "kaching-bundles-progressive-gifts-subtitle-style": cr(A.subtitleStyle), "kaching-bundles-progressive-gifts-image-size": Z ? void 0 : A.style.imageSize + "px", "kaching-bundles-progressive-gifts-border-radius": (Z ? te.cornerRadius : A.style.cornerRadius) + "px", "kaching-bundles-progressive-gifts-label-background-color": Le(Z ? L.progressiveGiftsLabelBackground || L.labelBackground : A.style.labelBackgroundColor), "kaching-bundles-progressive-gifts-label-text-color": Le(Z ? L.label : A.style.labelTextColor), "kaching-bundles-progressive-gifts-label-text-size": (Z ? se.label.size : A.style.labelTextSize) + "px", "kaching-bundles-progressive-gifts-background-color": Le(Z ? L.selectedBackground : A.style.backgroundColor), "kaching-bundles-progressive-gifts-border-color": Le(Z ? L.border : A.style.borderColor), "kaching-bundles-progressive-gifts-text-color": Le(Z ? L.title : A.style.textColor), "kaching-bundles-progressive-gifts-text-size": Z ? void 0 : A.style.textSize + "px", "kaching-bundles-progressive-gifts-locked-background-color": Le(Z ? L.background : A.style.lockedBackgroundColor), "kaching-bundles-progressive-gifts-locked-border-color": Le(Z ? { ...L.border, alpha: 0.3 * L.border.alpha } : A.style.lockedBorderColor), "kaching-bundles-progressive-gifts-locked-text-color": Z ? void 0 : Le(A.style.lockedTextColor), "kaching-bundles-progressive-gifts-locked-text-size": Z ? void 0 : A.style.lockedTextSize + "px", "kaching-bundles-progressive-gifts-locked-icon-color": Z ? void 0 : Le(A.style.lockedIconColor) });
    })(s()));
    function S() {
      const te = Object.entries(e(x)).map(([A, L]) => ({ id: A, variants: L.variants, product: L.product }));
      f()(te);
    }
    const I = u(() => c().gifts.flatMap((te) => {
      const A = te.giftType === "product" && te.productGID ? i().find((se) => se.id === Zt(te.productGID)) : void 0;
      if (!r().preview && te.giftType === "product" && !(A != null && A.availableForSale)) return [];
      const L = A && !r().preview ? _r(A) : A;
      return { gift: te, product: L };
    }));
    Je(() => {
      const te = new Set(c().gifts.map((L) => L.id)), A = Object.keys(e(x)).filter((L) => !te.has(L));
      if (A.length) {
        for (const L of A) delete e(x)[L];
        S();
      }
    });
    var W = { get progressiveGifts() {
      return c();
    }, set progressiveGifts(te) {
      c(te), k();
    }, get dealBlock() {
      return s();
    }, set dealBlock(te) {
      s(te), k();
    }, get otherProducts() {
      return i();
    }, set otherProducts(te) {
      i(te), k();
    }, get selectedDealBarIndex() {
      return d();
    }, set selectedDealBarIndex(te) {
      d(te), k();
    }, get sellingPlan() {
      return g();
    }, set sellingPlan(te) {
      g(te), k();
    }, get onChange() {
      return f();
    }, set onChange(te) {
      f(te), k();
    }, get onUnlock() {
      return h();
    }, set onUnlock(te) {
      h(te), k();
    }, get onSubscribe() {
      return _();
    }, set onSubscribe(te) {
      _(te), k();
    } }, Q = Be(), E = pe(Q), K = (te) => {
      var A = K0(), L = P(A), se = P(L), Z = (N) => {
        var J = J0();
        Ve(P(J), () => a()(c().title)), y(J), p(N, J);
      };
      G(se, (N) => {
        c().title && N(Z);
      });
      var H = q(se, 2), z = (N) => {
        var J = Y0();
        Ve(P(J), () => a()(c().subtitle)), y(J), p(N, J);
      };
      G(H, (N) => {
        c().subtitle && N(z);
      }), y(L);
      var C = q(L, 2);
      let R;
      $t(C, 21, () => e(I), ({ gift: N, product: J }) => N.id, (N, J) => {
        let X = () => e(J).gift;
        Wu(N, { get progressiveGifts() {
          return c();
        }, get gift() {
          return X();
        }, get product() {
          return e(J).product;
        }, get selectedDealBarIndex() {
          return d();
        }, get sellingPlan() {
          return g();
        }, onChange: (B) => (function(F, V) {
          V ? e(x)[F] = V : delete e(x)[F], S();
        })(X().id, B), onUnlock: () => h()(X().unlockAtBar - 1), get onSubscribe() {
          return _();
        } });
      }), y(C), y(A), be((N) => {
        Vt(A, e(D)), R = Lt(C, 1, "kaching-bundles__progressive-gifts__gifts", null, R, N);
      }, [() => ({ "kaching-bundles__progressive-gifts__gifts--vertical": c().layout === "vertical" })]), p(te, A);
    };
    G(E, (te) => {
      c().gifts.length > 0 && te(K);
    }), p(n, Q);
    var M = Xe(W);
    return o(), M;
  }
  Qe(Uu, { progressiveGifts: {}, dealBlock: {}, otherProducts: {}, selectedDealBarIndex: {}, sellingPlan: {}, onChange: {}, onUnlock: {}, onSubscribe: {} }, [], [], !0);
  var X0 = $('<span class="kaching-bundles__bar-title"><!></span>'), ek = $('<div class="kaching-bundles__bar-subtitle"><!></div>'), tk = $('<div class="kaching-bundles__bar-price"><!></div>'), nk = $('<div class="kaching-bundles__bar-full-price"><!></div>'), rk = $('<span><!></span> <img class="kaching-bundles__checkbox-upsells__image"/> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!></div> <!></div></div> <div class="kaching-bundles__bar-pricing"><!> <!></div>', 1), ak = $('<div class="kaching-bundles__bar-variants kaching-bundles__bar-variants--visible"><!> <!></div>'), ik = $('<div class="kaching-bundles__bar-variants kaching-bundles__bar-variants--visible"><!></div>'), lk = $('<!> <div class="kaching-bundles__bar-wrapper"><!> <!> <!> <!></div>', 1), sk = $("<div><!></div>");
  function Hu(n, t) {
    Ke(t, !0);
    const r = () => Ie(b, "$config", o), a = () => Ie(_, "$formatPrice", o), l = () => Ie(ge, "$translate", o), [o, c] = vt(), s = m(t, "checkboxUpsell", 7), i = m(t, "product", 7), d = m(t, "dealBlock", 7), g = m(t, "dealSellingPlan", 7), f = m(t, "dealBarQuantity", 7), h = m(t, "onChange", 7), _ = cn(), v = Fn(), b = _n();
    let x = ze(!1), D = ze(1), S = ze(lt({})), I = ze(void 0);
    const W = u(() => {
      var he;
      return (he = s().preselected) != null && he;
    }), Q = u(() => {
      var he;
      return e(x) || !((he = s().showProductOptionsOnlyWhenSelected) == null || he);
    });
    Je(() => {
      le(x, e(W), !0);
    }), Je(() => {
      s().matchQuantityWithDealBar && le(D, f(), !0);
    });
    const E = u(() => !!s().variantGIDs), K = u(() => {
      var he, ce;
      return e(E) && i() ? i().variants.filter((ae) => s().variantGIDs.some((de) => Zt(de) === ae.id)) : (ce = (he = i()) == null ? void 0 : he.variants) != null ? ce : [];
    }), M = u(() => e(D) > 1 && e(K).length > 1), te = u(() => (function(he, ce) {
      if (he.variantGIDs)
        return he.variantGIDs.length === 0 ? void 0 : Zt(he.variantGIDs[0]);
      if (ce != null && ce.availableForSale && ce.variants.length > 0) return ce.variants[0].id;
    })(s(), i())), A = u(() => {
      if (e(te) === void 0) return [];
      const he = [];
      for (let ce = 0; ce < e(D); ce++) {
        const ae = e(S)[ce];
        ae !== void 0 ? he.push(ae) : he.push(e(te));
      }
      return he;
    }), L = u(() => (function(he, ce) {
      if (!ce) return [];
      const ae = {};
      for (const de of he) {
        const fe = ae[de];
        if (fe) {
          fe.quantity += 1;
          continue;
        }
        const $e = ce.variants.find((qe) => qe.id === de);
        $e && (ae[de] = { variant: $e, quantity: 1 });
      }
      return Object.values(ae);
    })(e(A), i())), se = u(() => {
      var he;
      return (he = e(L)[0]) == null ? void 0 : he.variant;
    }), Z = u(() => {
      var he;
      return (he = s().subscriptionEnabled) == null || he;
    }), H = u(() => {
      var he;
      return (he = s().subscriptionType) != null ? he : "deal";
    }), z = u(() => e(Z) && e(H) === "always" && i() && e(se) ? rl(i(), [e(se)]) : []), C = u(() => e(z).find((he) => he.id === e(I)) || e(z)[0]);
    Je(() => {
      var he;
      e(z).some((ce) => {
        var ae;
        return ce.id === ((ae = g()) == null ? void 0 : ae.id);
      }) && le(I, (he = g()) == null ? void 0 : he.id, !0);
    });
    const R = u(() => {
      if (i() && e(se) && e(Z))
        return e(H) === "deal" ? g() ? er(i(), e(se), g()) : void 0 : e(C);
    }), N = u(() => d().priceRounding ? { perItem: d().showPricesPerItem, precision: d().priceRoundingPrecision, v2: r().featureFlags.price_rounding_v2 || !1 } : void 0);
    function J(he) {
      return ra({ discountType: s().discountType, discountValue: s().discountValue, discountQuantity: 1, variantQuantities: e(L), currencyRate: r().currencyRate, priceRounding: e(N), sellingPlan: he });
    }
    let X = u(() => J(e(R))), B = u(() => e(L).reduce((he, { variant: ce, quantity: ae }) => he + Math.max(ce.price, ce.compareAtPrice || 0) * ae, 0));
    const F = u(() => i() && e(se) ? er(i(), e(se), void 0) : void 0), V = u(() => e(Z) && e(H) === "always" ? e(X) : J(e(F))), O = u(() => !i() || !e(se) ? [] : rl(i(), [e(se)]).map((he) => {
      let ce;
      return ce = e(Z) ? e(H) === "always" ? e(C) : he : e(F), { sellingPlanId: he.id, discountedPrice: J(ce) };
    })), ee = u(() => dn({ priceFormatter: a(), product: i(), totalFullPrice: e(B), totalDiscountedPrice: e(X), quantity: e(D), legacySavedPercentage: r().featureFlags.legacy_saved_percentage || !1, unitQuantity: kr(e(L)), sellingPlan: e(R) })), ge = Ct();
    let T = u(() => e(ee)(l()(s().title))), w = u(() => e(ee)(l()(s().subtitle))), U = u(() => e(B) && e(B) > e(X));
    const oe = u(() => Ie(v, "$getMediaImageUrl", o)(s().mediaImageGID)), j = u(() => ((he, ce) => {
      const ae = is(he);
      if (ae.length > 0) return ae.filter((fe) => fe.attachedTo.type === "checkboxUpsell" && fe.attachedTo.upsellId === ce.id);
      if (he.badgesEnabled === !1) return [];
      const de = Yd(ce);
      return de ? [de] : [];
    })(d(), { id: s().id, badgeStyle: s().badgeStyle, badgeText: s().badgeText, badgeImageGID: s().badgeImageGID }).map((he) => ka(he, l(), e(ee)))), re = u(() => ma(e(j)));
    function Y() {
      le(x, !e(x));
    }
    function ie(he, ce) {
      le(S, { ...e(S), [he]: ce }, !0);
    }
    Je(() => {
      if (i() && e(L).length > 0 && e(x)) {
        const he = e(R);
        nn(() => h()({ product: i(), variants: e(L), sellingPlan: he, pricing: { discountedPrice: e(X), fullPrice: e(B), discountedPriceWithoutSellingPlan: e(V), discountedPricesForSellingPlans: e(O) } }));
      } else nn(() => h()(void 0));
    });
    var _e = { get checkboxUpsell() {
      return s();
    }, set checkboxUpsell(he) {
      s(he), k();
    }, get product() {
      return i();
    }, set product(he) {
      i(he), k();
    }, get dealBlock() {
      return d();
    }, set dealBlock(he) {
      d(he), k();
    }, get dealSellingPlan() {
      return g();
    }, set dealSellingPlan(he) {
      g(he), k();
    }, get dealBarQuantity() {
      return f();
    }, set dealBarQuantity(he) {
      f(he), k();
    }, get onChange() {
      return h();
    }, set onChange(he) {
      h(he), k();
    } }, Se = sk();
    let me;
    Wa(P(Se), { element: "div", get borderHost() {
      return e(re);
    }, children: (he, ce) => {
      var ae = lk(), de = pe(ae);
      $t(de, 17, () => e(j), (Me) => Me.id, (Me, Ge) => {
        aa(Me, { get badge() {
          return e(Ge);
        }, blockLayout: "vertical" });
      });
      var fe = q(de, 2), $e = P(fe);
      Ht($e, { element: "div", class: "kaching-bundles__bar-main", role: "checkbox", get "aria-checked"() {
        return e(x);
      }, onclick: Y, children: (Me, Ge) => {
        var Ae = rk(), je = pe(Ae);
        let Tt;
        var it = P(je), at = (Ee) => {
          ls(Ee);
        };
        G(it, (Ee) => {
          e(x) && Ee(at);
        }), y(je);
        var st = q(je, 2), yt = q(st, 2), rn = P(yt), jt = P(rn);
        rt(P(jt), () => e(T), (Ee) => {
          var et = X0();
          Ve(P(et), () => e(T)), y(et), p(Ee, et);
        }), y(jt);
        var gt = q(jt, 2), Ce = (Ee) => {
          var et = Be();
          rt(pe(et), () => e(w), (Te) => {
            var Ne = ek();
            Ve(P(Ne), () => e(w)), y(Ne), p(Te, Ne);
          }), p(Ee, et);
        };
        G(gt, (Ee) => {
          e(w) && Ee(Ce);
        }), y(rn), y(yt);
        var bt = q(yt, 2), Ye = P(bt);
        rt(Ye, () => e(X), (Ee) => {
          var et = tk();
          Ve(P(et), () => a()(e(X))), y(et), be((Te) => Pe(et, "data-a11y-label", Te), [() => l()("system.price")]), p(Ee, et);
        });
        var ve = q(Ye, 2), We = (Ee) => {
          var et = Be();
          rt(pe(et), () => e(B), (Te) => {
            var Ne = nk();
            Ve(P(Ne), () => a()(e(B))), y(Ne), be((ot) => Pe(Ne, "data-a11y-label", ot), [() => l()("system.original_price")]), p(Te, Ne);
          }), p(Ee, et);
        };
        G(ve, (Ee) => {
          e(U) && Ee(We);
        }), y(bt), be((Ee) => {
          var et, Te, Ne;
          Tt = Lt(je, 1, "kaching-bundles__checkbox-upsells__checkbox", null, Tt, Ee), Pe(st, "src", e(oe) || ((et = e(se)) == null ? void 0 : et.image) || ((Te = i()) == null ? void 0 : Te.image)), Pe(st, "alt", (Ne = i()) == null ? void 0 : Ne.title);
        }, [() => ({ "kaching-bundles__checkbox-upsells__checkbox--selected": e(x) })]), p(Me, Ae);
      }, $$slots: { default: !0 } });
      var qe = q($e, 2), De = (Me) => {
        var Ge = ak(), Ae = P(Ge);
        {
          let at = u(() => ({ ...i(), variants: e(K) }));
          na(Ae, { get product() {
            return e(at);
          } });
        }
        var je = q(Ae, 2), Tt = (at) => {
          var st = Be();
          $t(pe(st), 17, () => ({ length: e(D) }), Mr, (yt, rn, jt) => {
            {
              let gt = u(() => ({ ...i(), variants: e(K) })), Ce = u(() => e(D) > 1 ? jt + 1 : void 0);
              Un(yt, { get product() {
                return e(gt);
              }, get selectedVariantId() {
                return e(A)[jt];
              }, get number() {
                return e(Ce);
              }, onChange: (bt) => ie(jt, bt) });
            }
          }), p(at, st);
        }, it = (at) => {
          {
            let st = u(() => ({ ...i(), variants: e(K) }));
            Un(at, { get product() {
              return e(st);
            }, get selectedVariantId() {
              return e(A)[0];
            }, onChange: (yt) => ie(0, yt) });
          }
        };
        G(je, (at) => {
          e(M) ? at(Tt) : at(it, !1);
        }), y(Ge), p(Me, Ge);
      };
      G(qe, (Me) => {
        e(Q) && e(K).length > 1 && e(A).length > 0 && Me(De);
      });
      var ne = q(qe, 2), we = (Me) => {
        var Ge = ik();
        xa(P(Ge), { get sellingPlans() {
          return e(z);
        }, get selectedSellingPlan() {
          return e(C);
        }, onChange: (Ae) => le(I, Ae.id, !0) }), y(Ge), p(Me, Ge);
      };
      G(ne, (Me) => {
        e(Q) && e(z).length > 1 && e(C) && Me(we);
      });
      var Ze = q(ne, 2), ke = (Me) => {
        dl(Me, { get value() {
          return e(D);
        }, min: 1, onChange: (Ge) => le(D, Ge, !0) });
      };
      G(Ze, (Me) => {
        e(Q) && s().quantitySelector && Me(ke);
      }), y(fe), p(he, ae);
    }, $$slots: { default: !0 } }), y(Se), be((he) => me = Lt(Se, 1, "kaching-bundles__checkbox-upsells__upsell kaching-bundles__bar", null, me, he), [() => {
      var he;
      return { "kaching-bundles__bar--selected": e(x), "kaching-bundles__bar--disabled": r().preview && !((he = i()) != null && he.availableForSale) };
    }]), p(n, Se);
    var ye = Xe(_e);
    return c(), ye;
  }
  Qe(Hu, { checkboxUpsell: {}, product: {}, dealBlock: {}, dealSellingPlan: {}, dealBarQuantity: {}, onChange: {} }, [], [], !0);
  var ok = $('<div class="kaching-bundles__block-title"><!></div>'), ck = $('<div class="kaching-bundles__checkbox-upsells"><!> <div class="kaching-bundles__checkbox-upsells__upsells"></div></div>');
  function Zu(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "checkboxUpsells", 7), o = m(t, "dealBlock", 7), c = m(t, "otherProducts", 7), s = m(t, "complementaryProducts", 7), i = m(t, "dealSellingPlan", 7), d = m(t, "dealBarQuantity", 7), g = m(t, "onChange", 7), f = _n(), h = Ct(), _ = u(() => l().title ? Ie(h, "$translate", r)(l().title) : "");
    let v = ze(lt({}));
    const b = u(() => s().map(_r)), x = Math.floor(1e3 * Math.random()), D = u(() => l().upsells.flatMap((M, te) => {
      if (M.productSource === "complementary") {
        const se = e(b)[(te + x) % (e(b).length || 1)];
        return se ? { upsell: M, product: se } : [];
      }
      const A = M.productGID ? c().find((se) => se.id === Zt(M.productGID)) : void 0;
      if (!Ie(f, "$config", r).preview && !(A != null && A.availableForSale)) return [];
      const L = A && _r(A);
      return { upsell: M, product: L };
    }));
    var S = { get checkboxUpsells() {
      return l();
    }, set checkboxUpsells(M) {
      l(M), k();
    }, get dealBlock() {
      return o();
    }, set dealBlock(M) {
      o(M), k();
    }, get otherProducts() {
      return c();
    }, set otherProducts(M) {
      c(M), k();
    }, get complementaryProducts() {
      return s();
    }, set complementaryProducts(M) {
      s(M), k();
    }, get dealSellingPlan() {
      return i();
    }, set dealSellingPlan(M) {
      i(M), k();
    }, get dealBarQuantity() {
      return d();
    }, set dealBarQuantity(M) {
      d(M), k();
    }, get onChange() {
      return g();
    }, set onChange(M) {
      g(M), k();
    } }, I = ck(), W = P(I), Q = (M) => {
      var te = ok();
      Ve(P(te), () => e(_)), y(te), p(M, te);
    };
    G(W, (M) => {
      e(_) && M(Q);
    });
    var E = q(W, 2);
    $t(E, 21, () => e(D), ({ upsell: M, product: te }) => M.id, (M, te) => {
      let A = () => e(te).upsell;
      Hu(M, { get checkboxUpsell() {
        return A();
      }, get product() {
        return e(te).product;
      }, get dealBlock() {
        return o();
      }, get dealSellingPlan() {
        return i();
      }, get dealBarQuantity() {
        return d();
      }, onChange: (L) => (function(se, Z) {
        var H;
        Z ? e(v)[se] = Z : delete e(v)[se];
        const z = Object.entries(e(v)).flatMap(([B, F]) => F.variants.map(({ variant: V, quantity: O }) => ({ id: B, variant: V, product: F.product, quantity: O, sellingPlan: F.sellingPlan })));
        let C = 0, R = 0, N = 0;
        const J = /* @__PURE__ */ new Map();
        for (const B of Object.values(e(v))) {
          C += B.pricing.discountedPrice, R += B.pricing.fullPrice, N += B.pricing.discountedPriceWithoutSellingPlan;
          for (const F of B.pricing.discountedPricesForSellingPlans) J.set(F.sellingPlanId, ((H = J.get(F.sellingPlanId)) != null ? H : 0) + F.discountedPrice);
        }
        const X = Array.from(J, ([B, F]) => ({ sellingPlanId: B, discountedPrice: F }));
        g()(z, { discountedPrice: C, fullPrice: R, discountedPriceWithoutSellingPlan: N, discountedPricesForSellingPlans: X });
      })(A().id, L) });
    }), y(E), y(I), p(n, I);
    var K = Xe(S);
    return a(), K;
  }
  Qe(Zu, { checkboxUpsells: {}, dealBlock: {}, otherProducts: {}, complementaryProducts: {}, dealSellingPlan: {}, dealBarQuantity: {}, onChange: {} }, [], [], !0);
  var dk = $('<div class="kaching-bundles__timer" role="timer"><div class="kaching-bundles__timer-title"><!></div></div>');
  function Ju(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "timer", 7), o = Ct(), c = u(() => ((Q) => {
      const { textColor: E, backgroundColor: K, titleAlignment: M, titleStyle: te, titleSize: A } = Q;
      return bn({ "kaching-bundles-timer-background-color": Le(K), "kaching-bundles-timer-text-color": Le(E), "kaching-bundles-timer-title-alignment": M, "kaching-bundles-timer-title-font-weight": te ? or(te) : null, "kaching-bundles-timer-title-font-style": te ? cr(te) : null, "kaching-bundles-timer-title-size": A ? A + "px" : null });
    })(l()));
    function s() {
      const Q = new ko(), E = new ko(Q);
      return E.setHours(24, 0, 0, 0), Math.floor((E.getTime() - Q.getTime()) / 1e3);
    }
    function i() {
      if (!l().endTimestamp) return 0;
      const Q = new ko();
      return Math.max(0, Math.floor((l().endTimestamp - Q.getTime()) / 1e3));
    }
    function d() {
      return l().type === "midnight" ? s() : l().type === "custom" ? i() : 60 * l().minutes;
    }
    let g = ze(lt(d())), f = u(() => l().type !== "custom" || e(g) > 0);
    Je(() => {
      le(g, d(), !0);
    }), Je(() => {
      const Q = window.setInterval(() => {
        l().type === "midnight" ? le(g, s(), !0) : l().type === "custom" ? le(g, i(), !0) : le(g, e(g) <= 1 ? d() : e(g) - 1, !0);
      }, 1e3);
      return () => window.clearInterval(Q);
    });
    const h = u(() => Ie(o, "$translate", r)(l().title)), _ = u(() => (function(Q) {
      const E = Math.floor(Q / 86400), K = Math.floor(Q % 86400 / 3600), M = Math.floor(Q % 3600 / 60), te = Q % 60, A = (L) => L.toString().padStart(2, "0");
      return l().type === "custom" && E > 0 ? `${Intl.NumberFormat(navigator.language, { style: "unit", unit: "day", unitDisplay: "narrow" }).format(E)} ${A(K)}:${A(M)}:${A(te)}` : K > 0 ? `${A(K)}:${A(M)}:${A(te)}` : `${A(M)}:${A(te)}`;
    })(e(g))), v = u(() => e(h).replace(/\{\{\s*\w+\s*\}\}/g, '<span class="kaching-bundles__timer-value" translate="no"></span>'));
    let b = ze(void 0);
    Je(() => {
      !e(b) || !e(v) || e(b).querySelectorAll(".kaching-bundles__timer-value").forEach((Q) => {
        Q.textContent = ` ${e(_)} `;
      });
    });
    var x = { get timer() {
      return l();
    }, set timer(Q) {
      l(Q), k();
    } }, D = Be(), S = pe(D), I = (Q) => {
      var E = dk(), K = P(E);
      Ve(P(K), () => e(v)), y(K), bi(K, (M) => le(b, M), () => e(b)), y(E), be(() => Vt(E, e(c))), p(Q, E);
    };
    G(S, (Q) => {
      e(f) && Q(I);
    }), p(n, D);
    var W = Xe(x);
    return a(), W;
  }
  function Yu(n, t) {
    Ke(t, !0);
    const r = m(t, "dealBlockId", 7), a = m(t, "shopCustomStyles", 7), l = m(t, "customStyles", 7), o = u(() => {
      const g = [a(), l()].filter((f) => f == null ? void 0 : f.trim()).join(`
`);
      return g ? `
      <style id="kaching-bundles-custom-styles-${r()}">
        kaching-bundles-block[deal-block-id="${r()}"] {
          ${g}
        }
      </style>
    ` : "";
    });
    var c = { get dealBlockId() {
      return r();
    }, set dealBlockId(g) {
      r(g), k();
    }, get shopCustomStyles() {
      return a();
    }, set shopCustomStyles(g) {
      a(g), k();
    }, get customStyles() {
      return l();
    }, set customStyles(g) {
      l(g), k();
    } }, s = Be(), i = pe(s), d = (g) => {
      var f = Be();
      Ve(pe(f), () => e(o)), p(g, f);
    };
    return G(i, (g) => {
      e(o) && g(d);
    }), p(n, s), Xe(c);
  }
  Qe(Ju, { timer: {} }, [], [], !0), Qe(Yu, { dealBlockId: {}, shopCustomStyles: {}, customStyles: {} }, [], [], !0);
  function uk(n, t = 4) {
    const r = (function(a) {
      let l = 2166136261;
      for (let o = 0; o < a.length; o++) l ^= a.charCodeAt(o), l = Math.imul(l, 16777619) >>> 0;
      return l >>> 0;
    })(n);
    return (function(a, l) {
      let o = "";
      for (let c = 0; c < l; c++) o = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[a % 62] + o, a = Math.floor(a / 62);
      return o;
    })(r, t);
  }
  function Ku(n) {
    var t, r, a, l, o;
    const { dealBlock: c, product: s, pageProductId: i = s.id, selectedDealBarId: d, selectedVariantQuantities: g, selectedBundleProducts: f, selectedCollectionBreaksProducts: h, selectedFreeGifts: _, selectedProgressiveGifts: v, selectedCheckboxUpsells: b, selectedUpsells: x, selectedPersonalisations: D, selectedSellingPlan: S, dealBarSellingPlan: I, nativeBundleProductIds: W } = n, Q = (function(j) {
      var re;
      const { product: Y, selectedVariantQuantities: ie, selectedBundleProducts: _e, selectedCollectionBreaksProducts: Se, selectedFreeGifts: me, selectedProgressiveGifts: ye, selectedCheckboxUpsells: he, selectedUpsells: ce, selectedSellingPlan: ae, dealBarSellingPlan: de, selectedDealBarId: fe, dealBlock: $e, bundleNonce: qe } = j, De = _e.length > 0 || Se.length > 0 || me.length > 0 || ye.length > 0 || ce.length > 0, ne = me.length > 0 || ye.length > 0 || ce.length > 0, we = ((re = $e.dealBars.find((Me) => Me.id === fe)) == null ? void 0 : re.dealBarType) === "mix-and-match", Ze = ne || we, ke = JSON.stringify([De ? ie.map(({ variant: Me, quantity: Ge }) => ({ variantId: Me.id, quantity: Ge })) : Y.id, _e.map(({ id: Me, variant: Ge, quantity: Ae }) => ({ id: Me, variantId: Ge.id, quantity: Ae })), Se.map(({ variant: Me, quantity: Ge }) => ({ variantId: Me.id, quantity: Ge })), me.map(({ id: Me, variant: Ge, quantity: Ae }) => ({ id: Me, variantId: Ge.id, quantity: Ae })), ye.map(({ id: Me, variants: Ge }) => Ge.map((Ae) => ({ id: Me, variantId: Ae.variant.id, quantity: Ae.quantity })).flat()).flat(), he.map(({ id: Me, variant: Ge }) => ({ id: Me, variantId: Ge.id })), ce.map(({ id: Me, variant: Ge, quantity: Ae }) => ({ id: Me, variantId: Ge.id, quantity: Ae })), ae == null ? void 0 : ae.id, de == null ? void 0 : de.id, fe, ...Ze ? [qe] : []]);
      return uk(ke);
    })(n), E = c.dealBars.find((j) => j.id === d);
    let K = !1;
    E && (!E.dealBarType || E.dealBarType === pt.QuantityBreak || E.dealBarType === pt.Bxgy) && c.dealBars.filter((j) => !j.dealBarType || j.dealBarType === pt.QuantityBreak || j.dealBarType === pt.Bxgy).filter((j) => eg(j) === eg(E) && j.id !== d).length > 0 && (K = !0);
    const M = I != null ? I : S, te = (E == null ? void 0 : E.dealBarType) === pt.Bxgy, A = g.some(({ variant: j }) => j.sellingPlans.length > 0), L = te && (A || n.splitBxgy), se = c.dealBars.some((j) => (j.freeGifts || []).filter((re) => re.productGID).length > 0), Z = !(!c.progressiveGiftsEnabled || !c.progressiveGifts) && c.progressiveGifts.gifts.some((j) => j.giftType === "product"), H = c.dealBars.some((j) => (j.upsells || []).length > 0), z = c.nanoId || c.id, C = c.abTestVariantNumber ? no(c.abTestVariantNumber) : void 0, R = (E == null ? void 0 : E.dealBarType) === pt.Sku || (E == null ? void 0 : E.dealBarType) === pt.Bundle || (E == null ? void 0 : E.dealBarType) === pt.MixAndMatch || K || L, N = { deal: z, pp: i, main: !0 };
    c.marketId && (N.market = c.marketId), c.versionId && (N.v = c.versionId), R ? (N.id = Q, N.bar = d) : (te || _.length > 0 || v.length > 0 || b.length > 0 || x.length > 0 || h.length > 0 || D.length > 0 || se || Z || H) && (N.id = Q), !N.bar && d && (N.bid = d), C && (N.ab = C);
    const J = { id: Q, deal: z, bar: d };
    c.versionId && (J.v = c.versionId), C && (J.ab = C);
    const X = (E == null ? void 0 : E.dealBarType) === pt.MixAndMatch ? E.bundleProducts.length : void 0, B = [];
    let F = g, V = [];
    if (L && h.length === 0) {
      const { buy: j, get: re } = ng(g, E.getQuantity);
      F = j, V = re;
    }
    for (const { variant: j, quantity: re } of F) {
      const Y = { ...N };
      X && (Y.mixAndMatchItems = X);
      const ie = er(s, j, M);
      ie != null && ie.priceAdjustment && E && tg(E) && (Y.sellingPlan = { id: ie.id, priceAdjustment: ie.priceAdjustment });
      const _e = { id: j.id, quantity: re, properties: { __kaching_bundles: JSON.stringify(Y) } };
      ie && (_e.selling_plan = ie.id), B.push(_e);
    }
    const O = !n.disableNestedCartLines && F.length > 0 && !Xu(s, W) && (E == null ? void 0 : E.dealBarType) !== pt.MixAndMatch ? F[0].variant.id : void 0;
    for (const { variant: j, quantity: re } of V) {
      const Y = { ...J, main: !0, bxgy: !0 }, ie = er(s, j, M);
      ie != null && ie.priceAdjustment && (E == null ? void 0 : E.dealBarType) === pt.Bxgy && E.getDiscountType === "specific" && (Y.sellingPlan = { id: ie.id, priceAdjustment: ie.priceAdjustment });
      const _e = { id: j.id, quantity: re, properties: { __kaching_bundles: JSON.stringify(Y) } };
      Ci(_e, O, s, W), ie && (_e.selling_plan = ie.id), B.push(_e);
    }
    for (const j of f) {
      const re = { ...J, bundleProduct: j.id };
      X && (re.mixAndMatchItems = X);
      const Y = er(j.product, j.variant, M);
      Y != null && Y.priceAdjustment && (E == null ? void 0 : E.dealBarType) === pt.Bundle && ((t = E == null ? void 0 : E.bundleProducts.find((_e) => _e.id === j.id)) == null ? void 0 : t.discountType) === "specific" && (re.sellingPlan = { id: Y.id, priceAdjustment: Y.priceAdjustment });
      const ie = { id: j.variant.id, quantity: j.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
      Ci(ie, O, j.product, W), Y && (ie.selling_plan = Y.id), B.push(ie);
    }
    let ee = h, ge = [];
    if (L && h.length > 0) {
      const { buy: j, get: re } = ng(h, E.getQuantity);
      ee = j, ge = re;
    }
    const T = ((r = c.collectionBreaks) == null ? void 0 : r.visibility) === "deal-products";
    for (const j of ee) {
      if (T) {
        const _e = B.find((Se) => Se.id === j.variant.id);
        if (_e) {
          _e.quantity += j.quantity;
          continue;
        }
      }
      const re = { ...J, collectionBreaksProduct: !0 };
      R || delete re.bar;
      const Y = er(j.product, j.variant, M);
      Y != null && Y.priceAdjustment && E && tg(E) && (re.sellingPlan = { id: Y.id, priceAdjustment: Y.priceAdjustment });
      const ie = { id: j.variant.id, quantity: j.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
      Y && (ie.selling_plan = Y.id), B.push(ie);
    }
    for (const j of ge) {
      const re = { ...J, collectionBreaksProduct: !0 };
      R || delete re.bar, re.bxgy = !0;
      const Y = er(j.product, j.variant, M);
      Y != null && Y.priceAdjustment && (E == null ? void 0 : E.dealBarType) === pt.Bxgy && E.getDiscountType === "specific" && (re.sellingPlan = { id: Y.id, priceAdjustment: Y.priceAdjustment });
      const ie = { id: j.variant.id, quantity: j.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
      Y && (ie.selling_plan = Y.id), B.push(ie);
    }
    for (const j of _) {
      if (j.applyOnlyForSubscriptions && !M) continue;
      const re = { ...J, gift: j.id };
      delete re.bar;
      const Y = { id: j.variant.id, quantity: j.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
      Ci(Y, O, j.product, W);
      const ie = er(j.product, j.variant, M);
      ie && (Y.selling_plan = ie.id), B.push(Y);
    }
    for (const j of v) {
      const re = { ...J, gift: j.id };
      delete re.bar;
      for (const Y of j.variants) {
        const ie = { id: Y.variant.id, quantity: Y.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
        Ci(ie, O, j.product, W);
        const _e = er(j.product, Y.variant, M);
        _e && (ie.selling_plan = _e.id), B.push(ie);
      }
    }
    for (const j of b) {
      const re = { ...J, checkboxUpsell: j.id };
      delete re.bar;
      const Y = j.sellingPlan, ie = (a = c.checkboxUpsells) == null ? void 0 : a.upsells.find((Se) => Se.id === j.id);
      Y != null && Y.priceAdjustment && (ie == null ? void 0 : ie.discountType) === "specific" && (re.sellingPlan = { id: Y.id, priceAdjustment: Y.priceAdjustment });
      const _e = { id: j.variant.id, quantity: j.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
      Ci(_e, O, j.product, W), Y && (_e.selling_plan = Y.id), B.push(_e);
    }
    for (const j of x) {
      const re = { ...J, upsell: j.id };
      delete re.bar;
      const Y = j.sellingPlan;
      Y != null && Y.priceAdjustment && ((o = (l = E == null ? void 0 : E.upsells) == null ? void 0 : l.find((_e) => _e.id === j.id)) == null ? void 0 : o.discountType) === "specific" && (re.sellingPlan = { id: Y.id, priceAdjustment: Y.priceAdjustment });
      const ie = { id: j.variant.id, quantity: j.quantity, properties: { __kaching_bundles: JSON.stringify(re) } };
      Ci(ie, O, j.product, W), Y && (ie.selling_plan = Y.id), B.push(ie);
    }
    const w = [];
    for (const { variant: j, quantity: re } of F) for (let Y = 0; Y < re; Y++) w.push(j.id);
    for (const j of D) {
      const re = { ...J, personalisation: j.id };
      delete re.bar;
      const Y = { id: j.variantId, quantity: 1, properties: { __kaching_bundles: JSON.stringify(re), [j.valueLabel]: j.text } }, ie = w[j.productIndex];
      ie && !n.disableNestedCartLines && (Y.parent_id = ie), B.push(Y);
    }
    const U = B.filter((j) => !j.parent_id), oe = B.filter((j) => j.parent_id);
    return [...U.reverse(), ...oe];
  }
  function Xu(n, t) {
    return t.includes(n.id) || n.isNativeBundle === !0;
  }
  function Ci(n, t, r, a) {
    t && t !== n.id && (Xu(r, a) || (n.parent_id = t));
  }
  function eg(n) {
    switch (n.dealBarType) {
      case void 0:
      case pt.QuantityBreak:
        return Number(n.quantity);
      case pt.Bxgy:
        return Number(n.buyQuantity) + Number(n.getQuantity);
      case pt.Bundle:
        return n.bundleProducts[0].quantity;
      case pt.MixAndMatch:
      case pt.Sku:
        return 1;
    }
  }
  function tg(n) {
    switch (n.dealBarType) {
      case void 0:
      case pt.QuantityBreak:
        return n.discountType === "specific";
      case pt.Bundle:
        return n.bundleProducts[0].discountType === "specific";
      case pt.Bxgy:
        return n.buyDiscountType === "specific";
      case pt.MixAndMatch:
        return n.discountType === "specific";
      case pt.Sku:
        return !1;
    }
  }
  function ng(n, t) {
    const r = [...n].sort((c, s) => c.variant.price - s.variant.price), a = [], l = [];
    let o = t;
    for (const c of r) {
      const s = Math.min(o, c.quantity), i = c.quantity - s;
      s > 0 && l.push({ ...c, quantity: s }), i > 0 && a.push({ ...c, quantity: i }), o -= s;
    }
    return { buy: a, get: l };
  }
  function gk(n, t, r) {
    t()({ dealBarId: r().id, preselected: !1 });
  }
  var hk = $('<img class="kaching-bundles__bar-image" alt=""/>'), pk = $('<div class="kaching-bundles__bar-radio"></div>'), bk = $('<span class="kaching-bundles__bar-title"><!></span>'), fk = $('<span class="kaching-bundles__bar-label"><!></span>'), vk = $('<div class="kaching-bundles__bar-subtitle"><!></div>'), _k = $('<div class="kaching-bundles__bar-full-price"><!></div>'), kk = $('<!> <div class="kaching-bundles__bar-content"><div class="kaching-bundles__bar-content-left"><div class="kaching-bundles__bar-first-line"><!> <!></div> <div class="kaching-bundles__bar-second-line"><!> <!></div></div> <div class="kaching-bundles__bar-pricing"><!> <!></div></div>', 1), mk = $('<div class="kaching-bundles__bar-selling-plan"><!></div>'), xk = $('<div class="kaching-bundles__bar-variants"><!> <div class="kaching-bundles__bar-variant-selector-wrapper"><!> <!></div></div>'), yk = $('<!> <div class="kaching-bundles__bar-wrapper"><!> <!> <!> <!> <!></div> <!> <!> <!> <!>', 1), wk = $('<div><input type="radio"/> <!> <!></div>');
  function rg(n, t) {
    Ke(t, !0);
    const r = () => Ie(Q, "$formatPrice", l), a = () => Ie(W, "$translate", l), [l, o] = vt();
    let c = m(t, "dealBlock", 7), s = m(t, "dealBar", 7), i = m(t, "otherProducts", 23, () => []), d = m(t, "complementaryProducts", 23, () => []), g = m(t, "selectedDealBarIndex", 7, null), f = m(t, "componentId", 7), h = m(t, "selected", 7, !1), _ = m(t, "globalSellingPlan", 7, void 0), v = m(t, "onProgressiveGiftsChange", 7), b = m(t, "onDealBarSelect", 7), x = m(t, "onDealBarDeselect", 7), D = m(t, "onVariantsChange", 7), S = m(t, "onPersonalisationsChange", 7), I = m(t, "personalisationInitialValues", 23, () => []);
    const W = Ct(), Q = cn(), E = Fn();
    let K = ze(lt([])), M = ze(lt([])), te = ze(lt([])), A = !1;
    const L = u(() => s().productGID ? i().find((ne) => ne.id === Zt(s().productGID)) : void 0);
    let se = ze(void 0);
    const Z = u(() => (function(ne, we, Ze) {
      if (ne !== void 0 && Ze && Ze.variants.some((ke) => ke.id === ne))
        return ne;
      if (we.variantGID) return Zt(we.variantGID);
      if (Ze && Ze.variants.length > 0) return Ze.variants[0].id;
    })(e(se), s(), e(L))), H = u(() => e(Z) && e(L) ? e(L).variants.find((ne) => ne.id === e(Z)) : void 0), z = u(() => e(H) ? [{ variant: e(H), quantity: 1 }] : []);
    let C = ze(void 0);
    const R = u(() => e(L) && e(H) ? rl(e(L), [e(H)]) : []), N = u(() => {
      var ne, we;
      return (s().sellingPlanEnabled || c().subscriptionsEnabled && ((ne = c().subscriptions) == null ? void 0 : ne.layout) === "link" && ((we = c().subscriptions) == null ? void 0 : we.subscribeByDefault)) && (!c().subscriptionsEnabled || !!_());
    }), J = u(() => e(N) ? lo(s(), e(R), e(C)) : void 0), X = u(() => {
      var ne;
      return (ne = e(J)) != null ? ne : e(L) && e(H) ? er(e(L), e(H), _()) : void 0;
    }), B = u(() => e(H) ? nl(e(H), e(X)) : 0), F = u(() => e(H) ? (function(ne, we) {
      return ne.useProductCompareAtPrice && we.compareAtPrice ? Math.max(we.price, we.compareAtPrice) : we.price;
    })(c(), e(H)) : 0), V = u(() => ll(e(F), e(K), e(M))), O = u(() => e(V) > e(B)), ee = u(() => dn({ priceFormatter: r(), product: e(L), dealBar: s(), totalFullPrice: e(F), totalCompareAtPrice: e(V), totalDiscountedPrice: e(B), quantity: 1, unitQuantity: kr(e(z)), sellingPlan: e(X) })), ge = u(() => e(ee)(a()(s().title))), T = u(() => e(ee)(a()(s().subtitle))), w = u(() => e(ee)(a()(s().label))), U = u(() => al(c(), s()).map((ne) => ka(ne, a(), e(ee)))), oe = u(() => ma(e(U))), j = u(() => `${s().id}_${f()}`), re = u(() => Ie(E, "$getMediaImageUrl", l)(s().mediaImageGID) || sl), Y = _n(), ie = u(() => e(L) && e(L).variants.length > 1 && !s().variantGID && h()), _e = u(() => e(L) && Ie(Y, "$config", l).featureFlags.variant_images && new Set(e(L).variants.map((ne) => ne.image).filter((ne) => ne)).size > 1), Se = u(() => s().showAsSoldOutEnabled && s().showAsSoldOut ? cl(s().showAsSoldOut) : "");
    function me(ne) {
      h() && (ne.preventDefault(), ne.stopPropagation(), x()());
    }
    function ye(ne) {
      le(se, ne, !0);
    }
    Je(() => {
      !h() || !e(H) && e(L) || (e(K), e(te), e(M), e(Z), e(X), nn(() => {
        A || (A = !0, b()({ dealBarId: s().id, preselected: !0 })), (function() {
          const ne = e(B) + e(te).reduce((Ae, je) => Ae + je.discountedPrice, 0), we = e(K).reduce((Ae, je) => je.showPrice ? Ae + je.fullPrice : Ae, 0) + e(M).reduce((Ae, je) => Ae + je.fullPrice * je.quantity, 0), Ze = e(F) + e(te).reduce((Ae, je) => Ae + je.fullPrice, 0) + we, ke = e(H) ? e(H).price : 0, Me = e(H) ? e(H).sellingPlans.map((Ae) => ({ sellingPlanId: Ae.id, discountedPrice: Ae.price })) : [], Ge = { discountedPrice: ne, fullPrice: Ze, giftValue: we, discountedPricePerItem: e(B), fullPricePerItem: e(F), discountedPriceWithoutSellingPlan: ke, discountedPricesForSellingPlans: Me };
          D()({ variants: e(z), freeGifts: [...e(K), ...e(M)], upsells: e(te), dealBarSellingPlan: e(J), pricing: Ge, product: e(L) });
        })();
      }));
    });
    var he = { get dealBlock() {
      return c();
    }, set dealBlock(ne) {
      c(ne), k();
    }, get dealBar() {
      return s();
    }, set dealBar(ne) {
      s(ne), k();
    }, get otherProducts() {
      return i();
    }, set otherProducts(ne = []) {
      i(ne), k();
    }, get complementaryProducts() {
      return d();
    }, set complementaryProducts(ne = []) {
      d(ne), k();
    }, get selectedDealBarIndex() {
      return g();
    }, set selectedDealBarIndex(ne = null) {
      g(ne), k();
    }, get componentId() {
      return f();
    }, set componentId(ne) {
      f(ne), k();
    }, get selected() {
      return h();
    }, set selected(ne = !1) {
      h(ne), k();
    }, get globalSellingPlan() {
      return _();
    }, set globalSellingPlan(ne = void 0) {
      _(ne), k();
    }, get onProgressiveGiftsChange() {
      return v();
    }, set onProgressiveGiftsChange(ne) {
      v(ne), k();
    }, get onDealBarSelect() {
      return b();
    }, set onDealBarSelect(ne) {
      b(ne), k();
    }, get onDealBarDeselect() {
      return x();
    }, set onDealBarDeselect(ne) {
      x(ne), k();
    }, get onVariantsChange() {
      return D();
    }, set onVariantsChange(ne) {
      D(ne), k();
    }, get onPersonalisationsChange() {
      return S();
    }, set onPersonalisationsChange(ne) {
      S(ne), k();
    }, get personalisationInitialValues() {
      return I();
    }, set personalisationInitialValues(ne = []) {
      I(ne), k();
    } }, ce = wk();
    let ae;
    var de = P(ce);
    ea(de), de.__change = [gk, b, s];
    var fe = q(de, 2);
    Wa(fe, { get for() {
      return e(j);
    }, get soldOut() {
      return s().showAsSoldOutEnabled;
    }, get borderHost() {
      return e(oe);
    }, children: (ne, we) => {
      var Ze = yk(), ke = pe(Ze);
      $t(ke, 17, () => e(U), (Ye) => Ye.id, (Ye, ve) => {
        aa(Ye, { get badge() {
          return e(ve);
        }, get blockLayout() {
          return c().blockLayout;
        } });
      });
      var Me = q(ke, 2), Ge = P(Me);
      Ht(Ge, { element: "div", class: "kaching-bundles__bar-main", onclick: me, children: (Ye, ve) => {
        var We = kk(), Ee = pe(We), et = (Ue) => {
          var He = hk();
          be(() => Pe(He, "src", e(re))), p(Ue, He);
        }, Te = (Ue) => {
          p(Ue, pk());
        };
        G(Ee, (Ue) => {
          s().mediaImageGID ? Ue(et) : Ue(Te, !1);
        });
        var Ne = q(Ee, 2), ot = P(Ne), _t = P(ot), St = P(_t);
        rt(St, () => e(ge), (Ue) => {
          var He = bk();
          Ve(P(He), () => e(ge)), y(He), p(Ue, He);
        });
        var tt = q(St, 2), xt = (Ue) => {
          var He = Be();
          rt(pe(He), () => e(w), (nt) => {
            var Bt = fk();
            Ve(P(Bt), () => e(w)), y(Bt), p(nt, Bt);
          }), p(Ue, He);
        };
        G(tt, (Ue) => {
          e(w) && Ue(xt);
        }), y(_t);
        var It = q(_t, 2), Et = P(It), Jt = (Ue) => {
          var He = Be();
          rt(pe(He), () => e(T), (nt) => {
            var Bt = vk();
            Ve(P(Bt), () => e(T)), y(Bt), p(nt, Bt);
          }), p(Ue, He);
        };
        G(Et, (Ue) => {
          e(T) && Ue(Jt);
        });
        var Yt = q(Et, 2), un = (Ue) => {
          ia(Ue, { get dealBlock() {
            return c();
          }, get variant() {
            return e(H);
          } });
        };
        G(Yt, (Ue) => {
          e(ie) || Ue(un);
        }), y(It), y(ot);
        var Kt = q(ot, 2), ct = P(Kt);
        rt(ct, () => e(B), (Ue) => {
          Lr(Ue, { get amount() {
            return e(B);
          }, get showPricesPerItem() {
            return c().showPricesPerItem;
          }, get unitLabel() {
            return c().unitLabel;
          } });
        });
        var Mt = q(ct, 2), Xt = (Ue) => {
          var He = Be();
          rt(pe(He), () => e(V), (nt) => {
            var Bt = _k();
            Ve(P(Bt), () => r()(e(V))), y(Bt), be((Dt) => Pe(Bt, "data-a11y-label", Dt), [() => a()("system.original_price")]), p(nt, Bt);
          }), p(Ue, He);
        };
        G(Mt, (Ue) => {
          e(O) && Ue(Xt);
        }), y(Kt), y(Ne), p(Ye, We);
      }, $$slots: { default: !0 } });
      var Ae = q(Ge, 2), je = (Ye) => {
        ya(Ye, { get highlights() {
          return s().highlights;
        }, get isSelected() {
          return h();
        }, get replaceLiquid() {
          return e(ee);
        } });
      };
      G(Ae, (Ye) => {
        s().highlights && Ye(je);
      });
      var Tt = q(Ae, 2), it = (Ye) => {
        var ve = mk(), We = P(ve);
        {
          let Ee = u(() => e(J) || e(R)[0]);
          xa(We, { get sellingPlans() {
            return e(R);
          }, get selectedSellingPlan() {
            return e(Ee);
          }, onChange: (et) => {
            le(C, et, !0);
          } });
        }
        y(ve), p(Ye, ve);
      };
      G(Tt, (Ye) => {
        h() && e(N) && !s().sellingPlanGid && e(R).length > 1 && Ye(it);
      });
      var at = q(Tt, 2), st = (Ye) => {
        var ve = xk(), We = P(ve);
        na(We, { get product() {
          return e(L);
        } });
        var Ee = q(We, 2), et = P(Ee);
        {
          let Te = u(() => e(Z) || 0);
          Un(et, { get product() {
            return e(L);
          }, get selectedVariantId() {
            return e(Te);
          }, get showImage() {
            return e(_e);
          }, onChange: ye });
        }
        ia(q(et, 2), { get dealBlock() {
          return c();
        }, get variant() {
          return e(H);
        } }), y(Ee), y(ve), p(Ye, ve);
      };
      G(at, (Ye) => {
        e(ie) && e(L) && Ye(st);
      });
      var yt = q(at, 2), rn = (Ye) => {
        {
          let ve = u(() => [e(Z)]);
          Ua(Ye, { get productPersonalisation() {
            return s().productPersonalisation;
          }, get product() {
            return e(L);
          }, get selectedVariantIds() {
            return e(ve);
          }, quantity: 1, get addPersonalisationModal() {
            return c().addPersonalisationModal;
          }, get onPersonalisationsChange() {
            return S();
          }, get initialValues() {
            return I();
          } });
        }
      };
      G(yt, (Ye) => {
        h() && s().productPersonalisation && e(L) && e(Z) && (c().blockLayout === "vertical" || c().blockLayout === "plain") && Ye(rn);
      }), y(Me);
      var jt = q(Me, 2);
      {
        let Ye = u(() => s().upsells || []);
        wi(jt, { get dealBlock() {
          return c();
        }, get dealBarId() {
          return s().id;
        }, get upsells() {
          return e(Ye);
        }, get otherProducts() {
          return i();
        }, get complementaryProducts() {
          return d();
        }, get dealBarSelected() {
          return h();
        }, get dealSellingPlan() {
          return e(X);
        }, onChange: (ve) => {
          le(te, ve, !0);
        } });
      }
      var gt = q(jt, 2);
      Bi(gt, { get selectedDealBarIndex() {
        return g();
      }, get onChange() {
        return v();
      }, get dealBlock() {
        return c();
      }, get dealBar() {
        return s();
      }, get selected() {
        return h();
      }, get otherProducts() {
        return i();
      }, get sellingPlan() {
        return e(X);
      }, get progressiveGifts() {
        return c().progressiveGifts;
      } });
      var Ce = q(gt, 2);
      {
        let Ye = u(() => s().freeGifts || []);
        yi(Ce, { get dealBlock() {
          return c();
        }, get freeGifts() {
          return e(Ye);
        }, get freeGiftsSummary() {
          return s().freeGiftsSummary;
        }, get otherProducts() {
          return i();
        }, get dealBarSelected() {
          return h();
        }, get sellingPlan() {
          return e(X);
        }, onChange: (ve) => {
          le(K, ve, !0);
        } });
      }
      var bt = q(Ce, 2);
      {
        let Ye = u(() => s().multipleGiftsSelectors || []);
        Si(bt, { get dealBlock() {
          return c();
        }, get multipleGiftsSelectors() {
          return e(Ye);
        }, get sellingPlan() {
          return e(X);
        }, get otherProducts() {
          return i();
        }, onChange: (ve) => {
          le(M, ve, !0);
        } });
      }
      p(ne, Ze);
    }, $$slots: { default: !0 } });
    var $e = q(fe, 2), qe = (ne) => {
      Pi(ne, { get showAsSoldOut() {
        return s().showAsSoldOut;
      }, get replaceLiquid() {
        return e(ee);
      } });
    };
    G($e, (ne) => {
      s().showAsSoldOutEnabled && s().showAsSoldOut && ne(qe);
    }), y(ce), be((ne) => {
      var we;
      ae = Lt(ce, 1, "kaching-bundles__bar", null, ae, ne), Pe(ce, "data-deal-bar-id", s().id), Vt(ce, e(Se)), Pe(de, "name", `kaching-bundles-deal-${(we = f()) != null ? we : ""}`), La(de, s().id), Pe(de, "id", e(j)), Yi(de, h()), de.disabled = s().showAsSoldOutEnabled;
    }, [() => ({ "kaching-bundles__bar--selected": h() })]), p(n, ce);
    var De = Xe(he);
    return o(), De;
  }
  On(["change"]), Qe(rg, { dealBlock: {}, dealBar: {}, otherProducts: {}, complementaryProducts: {}, selectedDealBarIndex: {}, componentId: {}, selected: {}, globalSellingPlan: {}, onProgressiveGiftsChange: {}, onDealBarSelect: {}, onDealBarDeselect: {}, onVariantsChange: {}, onPersonalisationsChange: {}, personalisationInitialValues: {} }, [], [], !0);
  var Pk = $('<div class="kaching-bundles__collection-breaks-alert"><svg class="kaching-bundles__collection-breaks-alert__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00065 5.33325V7.99992M8.00065 10.6666H8.00732M14.6673 7.99992C14.6673 11.6818 11.6825 14.6666 8.00065 14.6666C4.31875 14.6666 1.33398 11.6818 1.33398 7.99992C1.33398 4.31802 4.31875 1.33325 8.00065 1.33325C11.6825 1.33325 14.6673 4.31802 14.6673 7.99992Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> </div>');
  function ag(n, t) {
    Ke(t, !0);
    const r = () => Ie(i, "$config", a), [a, l] = vt();
    let o = m(t, "collectionBreaks", 7), c = m(t, "hasItemsToSelect", 7);
    const s = Ct(), i = _n(), d = u(() => {
      var D;
      return (D = o()) == null ? void 0 : D.requireItemSelectionAlert;
    }), g = u(() => r().preview && r().previewAlerts || Ie(So, "$requireSelectionError", a)), f = u(() => {
      var D;
      return e(g) && ((D = o()) == null ? void 0 : D.requireItemSelectionEnabled) && e(d) && c();
    });
    var h = { get collectionBreaks() {
      return o();
    }, set collectionBreaks(D) {
      o(D), k();
    }, get hasItemsToSelect() {
      return c();
    }, set hasItemsToSelect(D) {
      c(D), k();
    } }, _ = Be(), v = pe(_), b = (D) => {
      var S = Pk(), I = q(P(S));
      y(S), be((W) => ft(I, ` ${W != null ? W : ""}`), [() => Ie(s, "$translate", a)(e(d).text)]), p(D, S);
    };
    G(v, (D) => {
      e(f) && e(d) && D(b);
    }), p(n, _);
    var x = Xe(h);
    return l(), x;
  }
  Qe(ag, { collectionBreaks: {}, hasItemsToSelect: {} }, [], [], !0);
  var Sk = $('<span class="kaching-bundles-savings-summary__icon"><img alt=""/></span>'), Bk = $('<span class="kaching-bundles-savings-summary__icon"><!></span>'), Ck = $('<div class="kaching-bundles-savings-summary"><!> <span class="kaching-bundles-savings-summary__title"><!></span></div>');
  function ig(n, t) {
    Ke(t, !0);
    const [r, a] = vt(), l = m(t, "savingsSummary", 7), o = m(t, "totalFullPrice", 7), c = m(t, "totalDiscountedPrice", 7), s = m(t, "quantity", 7), i = m(t, "product", 7), d = cn(), g = Ct(), f = Fn(), h = u(() => ((A) => bn({ "kaching-bundles-savings-summary-background-color": Le(A.backgroundColor), "kaching-bundles-savings-summary-text-color": Le(A.textColor), "kaching-bundles-savings-summary-value-color": Le(A.valueColor), "kaching-bundles-savings-summary-icon-color": Le(A.iconColor), "kaching-bundles-savings-summary-border-color": Le(A.borderColor), "kaching-bundles-savings-summary-alignment": { start: "flex-start", center: "center", end: "flex-end" }[A.titleAlignment], "kaching-bundles-savings-summary-border-width": A.borderWidth + "px", "kaching-bundles-savings-summary-border-radius": A.borderRadius + "px", "kaching-bundles-savings-summary-title-font-size": A.titleFont.size + "px", "kaching-bundles-savings-summary-title-font-style": cr(A.titleFont.style), "kaching-bundles-savings-summary-title-font-weight": or(A.titleFont.style) }))(l())), _ = u(() => l().iconType), v = u(() => wu[e(_)]), b = u(() => e(_) === "custom" ? Ie(f, "$getMediaImageUrl", r)(l().customIconGID) : void 0), x = u(() => dn({ priceFormatter: Ie(d, "$formatPrice", r), product: i(), totalFullPrice: o(), totalDiscountedPrice: c(), quantity: s(), unitQuantity: null })), D = u(() => ((A) => A.replace(Ed, '<span class="kaching-bundles-savings-summary__value">$&</span>'))(Ie(g, "$translate", r)(l().title))), S = u(() => e(x)(e(D)));
    var I = { get savingsSummary() {
      return l();
    }, set savingsSummary(A) {
      l(A), k();
    }, get totalFullPrice() {
      return o();
    }, set totalFullPrice(A) {
      o(A), k();
    }, get totalDiscountedPrice() {
      return c();
    }, set totalDiscountedPrice(A) {
      c(A), k();
    }, get quantity() {
      return s();
    }, set quantity(A) {
      s(A), k();
    }, get product() {
      return i();
    }, set product(A) {
      i(A), k();
    } }, W = Ck(), Q = P(W), E = (A) => {
      var L = Sk(), se = P(L);
      y(L), be(() => Pe(se, "src", e(b))), p(A, L);
    }, K = (A) => {
      var L = Be(), se = pe(L), Z = (H) => {
        var z = Bk();
        Qc(P(z), () => e(v), (C, R) => {
          R(C, {});
        }), y(z), p(H, z);
      };
      G(se, (H) => {
        e(v) && H(Z);
      }, !0), p(A, L);
    };
    G(Q, (A) => {
      e(_) === "custom" && e(b) ? A(E) : A(K, !1);
    });
    var M = q(Q, 2);
    Ve(P(M), () => e(S)), y(M), y(W), be(() => Vt(W, e(h))), p(n, W);
    var te = Xe(I);
    return a(), te;
  }
  Qe(ig, { savingsSummary: {}, totalFullPrice: {}, totalDiscountedPrice: {}, quantity: {}, product: {} }, [], [], !0);
  var Ik = $('<div class="kaching-bundles__block-title"><!></div>'), Mk = $("<!> <!>", 1), zk = $('<div class="kaching-bundles__out-of-stock"><!></div>'), $k = $('<div class="kaching-bundles"><div><!> <!> <div><!> <!> <!> <!></div> <!> <!> <!> <!> <!> <!> <!></div></div> <!>', 1);
  function lg(n, t) {
    var r, a, l, o, c, s;
    Ke(t, !0);
    const i = () => Ie(R, "$formatPrice", g), d = () => Ie(J, "$translate", g), [g, f] = vt();
    let h = m(t, "component", 7), _ = m(t, "config", 7), v = m(t, "translations", 23, () => ({})), b = m(t, "dealBlock", 7), x = m(t, "product", 7), D = m(t, "currentVariantId", 7), S = m(t, "sellingPlanId", 15), I = m(t, "selectedDealBarId", 15), W = m(t, "quantity", 15), Q = m(t, "mediaImages", 23, () => []), E = m(t, "otherProducts", 23, () => []), K = m(t, "collectionBreaksProducts", 23, () => []), M = m(t, "complementaryProducts", 23, () => []), te = m(t, "nativeBundleProductIds", 23, () => []), A = m(t, "compact", 7, !1), L = m(t, "variantBadges", 23, () => []);
    const se = u(() => b().hideUnavailableOptions ? _r(x()) : x()), Z = u(() => b().hideUnavailableOptions ? E().map(_r) : E()), H = u(() => b().hideUnavailableOptions ? M().map(_r) : M()), z = u(() => b().hideUnavailableOptions ? K().map(_r) : K()), { setConfig: C } = Qa(_()), { formatPrice: R, setMoneyFormat: N } = mi(_().moneyFormat, (r = b()) == null ? void 0 : r.showPricesWithoutDecimals), { translate: J, setTranslations: X } = Na(v()), { setMediaImages: B } = tl(Q()), { setVariantBadges: F } = ou(L()), { setSwatchSettings: V } = Ki({ swatchOptions: ((a = b()) == null ? void 0 : a.swatchOptions) || [], swatchSize: (l = b()) == null ? void 0 : l.swatchSize, swatchShape: (o = b()) == null ? void 0 : o.swatchShape, showSelectedSwatchName: (s = (c = b()) == null ? void 0 : c.showSelectedSwatchName) != null && s });
    let O = ze(lt(Math.random()));
    function ee() {
      return { dealBlock: b(), product: e(Ne), pageProductId: x().id, selectedDealBarId: I(), selectedVariantQuantities: e(U), selectedBundleProducts: e(oe), selectedCollectionBreaksProducts: e(j), selectedFreeGifts: e(re), selectedProgressiveGifts: e(Y), selectedCheckboxUpsells: e(ie), selectedUpsells: e(_e), selectedPersonalisations: e(Se), selectedSellingPlan: e(_t), dealBarSellingPlan: e(ye), nativeBundleProductIds: te(), bundleNonce: e(O), splitBxgy: _().featureFlags.split_bxgy_items, disableNestedCartLines: _().featureFlags.disable_nested_cart_lines };
    }
    function ge() {
      return Ku(ee());
    }
    Fa(() => {
      vr(h(), "kaching-bundles-block-loaded", { component: h() }, !1);
    }), Je(() => {
      C(_());
    }), Je(() => {
      N(_().moneyFormat, !!b().showPricesWithoutDecimals);
    }), Je(() => {
      X(v());
    }), Je(() => {
      B(Q());
    }), Je(() => {
      F(L());
    }), Je(() => {
      var ue;
      V({ swatchOptions: b().swatchOptions || [], swatchSize: b().swatchSize, swatchShape: b().swatchShape, showSelectedSwatchName: (ue = b().showSelectedSwatchName) != null && ue });
    });
    let T = 0;
    Je(() => {
      T === 0 && te().length > 0 && Te({ pricing: e(fe) }), T = te().length;
    });
    let w = Math.random().toString(16).slice(2), U = ze(lt([])), oe = ze(lt([])), j = ze(lt([])), re = ze(lt([])), Y = ze(lt([])), ie = ze(lt([])), _e = ze(lt([])), Se = ze(lt([])), me = new fv(), ye = ze(void 0), he = ze(lt({ discountedPrice: 0, fullPrice: 0, discountedPriceWithoutSellingPlan: 0, discountedPricesForSellingPlans: [] })), ce = ze(void 0), ae = ze(!1), de = ze(lt({ requiresItemSelection: !1, allItemsSelected: !0, missingItemsCount: 0 })), fe = ze(lt({ discountedPrice: 0, fullPrice: 0, giftValue: 0, discountedPricePerItem: 0, fullPricePerItem: 0, discountedPriceWithoutSellingPlan: 0, discountedPricesForSellingPlans: [] }));
    Je(() => {
      D() && !I() && (e(_t), nn(() => {
        (function() {
          const ue = x().variants.find((Fe) => Fe.id === D());
          if (!ue) return;
          le(U, [{ variant: ue, quantity: 1 }], !0);
          let Oe = ue.price;
          if (e(_t)) {
            const Fe = ue.sellingPlans.find((Re) => Re.id === e(_t).id);
            Fe && (Oe = Fe.price);
          }
          const Pt = ue.compareAtPrice && ue.compareAtPrice > ue.price ? ue.compareAtPrice : ue.price, Ot = x().sellingPlans.map((Fe) => ({ sellingPlanId: Fe.id, discountedPrice: nl(ue, Fe) }));
          le(fe, { discountedPrice: Oe, fullPrice: Pt, giftValue: 0, discountedPricePerItem: Oe, fullPricePerItem: Pt, discountedPriceWithoutSellingPlan: ue.price, discountedPricesForSellingPlans: Ot }, !0), Te({ pricing: e(fe) });
        })();
      }));
    });
    let $e = u(() => Cd(b())), qe = u(() => d()(b().blockTitle));
    const De = u(() => e(nt) ? dn({ priceFormatter: i(), product: e(se), selectedVariants: e(U), totalFullPrice: e(fe).fullPrice, totalDiscountedPrice: e(fe).discountedPrice, quantity: W() || Ge(e(nt)), dealBar: e(nt), legacySavedPercentage: _().featureFlags.legacy_saved_percentage || !1, unitQuantity: null, sellingPlan: e(_t) }) : Zh), ne = u(() => ((ue) => Op(ue, "block"))(b()).map((ue) => ka(ue, d(), e(De)))), we = u(() => ma(e(ne))), Ze = u(() => {
      const ue = e(ne).find((Oe) => Oe.badgeType === "border" && (Oe.position === "left" || Oe.position === "right"));
      if (ue != null && ue.colors) return Le({ ...ue.colors.background, alpha: 0.15 });
    }), ke = b().preselectedDealBarId ? b().dealBars.find((ue) => ue.id === b().preselectedDealBarId) : void 0;
    function Me(ue) {
      return !ue.dealBarType || ue.dealBarType === pt.QuantityBreak || ue.dealBarType === pt.Bxgy;
    }
    function Ge(ue) {
      switch (ue.dealBarType) {
        case void 0:
        case pt.QuantityBreak:
          return Number(ue.quantity);
        case pt.Bxgy:
          return Number(ue.buyQuantity) + Number(ue.getQuantity);
        case pt.Bundle:
          return ue.bundleProducts[0].quantity;
        case pt.MixAndMatch:
        case pt.Sku:
          return 1;
      }
    }
    function Ae(ue) {
      var Oe, Pt;
      I() !== ue && (I() && me.set(I(), e(Se)), le(Se, (Oe = me.get(ue)) != null ? Oe : [], !0), ((Pt = b().progressiveGifts) == null ? void 0 : Pt.layout) === "deal-bar" && le(Y, [], !0)), I(ue);
    }
    function je(ue) {
      const { dealBarId: Oe, dealBarQuantity: Pt, preselected: Ot } = ue;
      Ae(Oe), ul(!1), _().keepQuantityInput && Pt && W(Pt), vr(h(), "deal-bar-selected", { dealBarId: Oe, preselected: Ot });
    }
    function Tt(ue) {
      const Oe = b().dealBars[ue];
      Oe && Ae(Oe.id);
    }
    function it() {
      _().ignoreDeselect || (I(void 0), le(re, [], !0), le(Y, [], !0), le(_e, [], !0), le(oe, [], !0), le(j, [], !0), le(Se, [], !0), me.clear(), le(ye, void 0), ul(!1), vr(h(), "deal-bar-selected", { dealBarId: null, preselected: !1 }));
    }
    function at(ue) {
      const { variantId: Oe } = ue;
      vr(h(), "variant-selected", { variantId: Oe });
    }
    function st(ue) {
      const { bundleProducts: Oe, freeGifts: Pt, upsells: Ot, pricing: Fe } = ue, Re = [{ variant: Oe[0].variant, quantity: Oe[0].quantity }];
      le(U, Re, !0), le(oe, Oe.slice(1), !0), le(re, Pt, !0), le(_e, Ot, !0), le(j, [], !0), le(ye, void 0), le(ce, void 0), le(fe, Fe, !0), le(ae, et(e(U)), !0), Te({ pricing: Fe });
    }
    function yt(ue) {
      const { variants: Oe, freeGifts: Pt, upsells: Ot, pricing: Fe, validation: Re } = ue;
      le(de, Re, !0);
      const en = [{ variant: Oe[0].variant, quantity: Oe[0].quantity }], Rn = Oe.slice(1);
      le(U, en, !0), le(re, Pt, !0), le(_e, Ot, !0), le(oe, [], !0), le(j, Rn, !0), le(ye, ue.dealBarSellingPlan, !0), le(ce, void 0), le(fe, Fe, !0), le(ae, et(e(U)), !0), Te({ pricing: Fe });
    }
    function rn(ue) {
      const { variants: Oe, freeGifts: Pt, upsells: Ot, pricing: Fe } = ue;
      le(U, Oe, !0), le(re, Pt, !0), le(_e, Ot, !0), le(oe, [], !0), le(j, [], !0), le(ye, ue.dealBarSellingPlan, !0), le(ce, void 0), le(fe, Fe, !0), le(ae, et(e(U)), !0), Te({ pricing: Fe });
    }
    function jt(ue) {
      var Oe;
      const { variants: Pt, freeGifts: Ot, upsells: Fe, pricing: Re, product: en } = ue;
      le(U, Pt, !0), le(re, Ot, !0), le(_e, Fe, !0), le(oe, [], !0), le(j, [], !0), le(ye, ue.dealBarSellingPlan, !0), ((Oe = e(ce)) == null ? void 0 : Oe.id) !== (en == null ? void 0 : en.id) && le(ce, en, !0), le(fe, Re, !0), le(ae, et(e(U)), !0), Te({ pricing: Re });
    }
    function gt(ue) {
      S(ue == null ? void 0 : ue.id);
    }
    ke != null && ke.hideBehindScratchOff && b().scratchOffEnabled && (_().preview ? _().previewScratchOff : x().availableForSale) || I(I() || b().preselectedDealBarId || void 0), Je(() => {
      W() && b() && nn(() => {
        if (!I()) return;
        const ue = b().dealBars.find((Oe) => Oe.id === I());
        ue && Me(ue) && Ge(ue) !== W() && (function(Oe, Pt) {
          if (!I()) return;
          const Ot = Oe.dealBars.slice().sort((Re, en) => Ge(Re) - Ge(en));
          let Fe = Ot[0];
          for (const Re of Ot) if (Me(Re)) {
            if (Ge(Re) > Pt) break;
            Fe = Re;
          }
          Fe.id !== I() && (Ae(Fe.id), vr(h(), "deal-bar-selected", { dealBarId: Fe.id, preselected: !1 }));
        })(b(), W());
      });
    });
    let Ce = ze(void 0);
    function bt() {
      if (!e(Yt) || e(ot).length === 0) return;
      const ue = e(ot).find((Oe) => Oe.id === e(Ce));
      gt(ue != null ? ue : e(ot)[0]);
    }
    function Ye(ue) {
      vr(h(), "add-to-cart-requested", { items: Ku({ ...ee(), selectedSellingPlan: ue, dealBarSellingPlan: void 0 }) });
    }
    function ve(ue) {
      le(Y, ue, !0), Te({ pricing: e(fe) });
    }
    function We(ue, Oe) {
      le(ie, ue, !0), le(he, Oe, !0), Te({ pricing: e(fe) });
    }
    function Ee(ue) {
      le(Se, ue, !0), Te({ pricing: e(fe) });
    }
    function et(ue) {
      return ue.some(({ variant: Oe, quantity: Pt }) => !!Oe && !!Oe.inventoryManagement && Oe.inventoryPolicy === "deny" && Oe.inventoryQuantity !== null && Pt > Oe.inventoryQuantity);
    }
    function Te({ pricing: ue }) {
      const Oe = e(U).map(({ variant: Mn, quantity: Dn }) => ({ variantId: Mn.id, quantity: Dn })), Pt = e(re).map(({ id: Mn, variant: Dn, quantity: Wt }) => ({ id: Mn, variantId: Dn.id, quantity: Wt })), Ot = e(_e).map(({ id: Mn, variant: Dn, quantity: Wt }) => ({ id: Mn, variantId: Dn.id, quantity: Wt })), Fe = e(oe).map(({ id: Mn, variant: Dn, quantity: Wt }) => ({ id: Mn, variantId: Dn.id, quantity: Wt })), Re = ue.discountedPrice + e(he).discountedPrice, en = ue.fullPrice + e(he).fullPrice, Rn = { discountedPrice: Re, fullPrice: en, discountedPriceWithoutSellingPlan: ue.discountedPriceWithoutSellingPlan + e(he).discountedPriceWithoutSellingPlan, discountedPricesForSellingPlans: ue.discountedPricesForSellingPlans.map((Mn) => {
        var Dn, Wt;
        const zn = (Wt = (Dn = e(he).discountedPricesForSellingPlans.find((jr) => jr.sellingPlanId === Mn.sellingPlanId)) == null ? void 0 : Dn.discountedPrice) != null ? Wt : e(he).discountedPriceWithoutSellingPlan;
        return { sellingPlanId: Mn.sellingPlanId, discountedPrice: Mn.discountedPrice + zn };
      }) };
      I() && e(nt) ? Ha.set({ id: I(), dealBar: e(nt), product: e(Ne), quantity: e(U).reduce((Mn, { quantity: Dn }) => Mn + Dn, 0), pricing: Rn }) : Ha.set({ id: null, dealBar: null, product: e(Ne), quantity: 1, pricing: Rn }), vr(h(), "variants-changed", { variantIdQuantities: Oe, freeGifts: Pt, upsells: Ot, bundleProducts: Fe, pricing: { discountedPrice: { amount: Re, formatted: i()(Re) }, fullPrice: { amount: en, formatted: i()(en) }, discountedPricePerItem: { amount: ue.discountedPricePerItem, formatted: i()(ue.discountedPricePerItem) }, fullPricePerItem: { amount: ue.fullPricePerItem, formatted: i()(ue.fullPricePerItem) } }, formattedPrice: i()(ue.discountedPrice), validation: e(de) }), vr(h(), "items-changed", {});
    }
    Je(() => {
      S() && le(Ce, S(), !0);
    });
    const Ne = u(() => e(ce) || x()), ot = u(() => {
      const ue = e(U).map(({ variant: Oe }) => Oe);
      return e(Ne).sellingPlans.filter((Oe) => ue.some((Pt) => Pt.sellingPlans.some((Ot) => Ot.id === Oe.id)));
    }), _t = u(() => e(ot).find((ue) => ue.id === S())), St = u(() => S() ? e(Ne).sellingPlans.find((ue) => ue.id === S()) : void 0), tt = u(() => so(e(ye), e(St), e(ot), e(Ne).requiresSellingPlan)), xt = u(() => e(fe).giftValue + e(Y).reduce((ue, Oe) => ue + Oe.variants.reduce((Pt, { variant: Ot, quantity: Fe }) => Pt + Ot.price * Fe, 0), 0)), It = u(() => {
      var ue, Oe;
      return (Oe = (ue = b().savingsSummary) == null ? void 0 : ue.includeGiftValue) != null && Oe;
    }), Et = u(() => ((ue, Oe, Pt, Ot) => {
      const Fe = ue.fullPrice - ue.giftValue + Oe.fullPrice + (Ot ? Pt : 0), Re = ue.discountedPrice + Oe.discountedPrice;
      return { fullPrice: Fe, discountedPrice: Re, saved: Fe - Re };
    })(e(fe), e(he), e(xt), e(It))), Jt = u(() => {
      var ue;
      return ((Oe, Pt) => Oe + Pt.reduce((Ot, { quantity: Fe }) => Ot + Fe, 0))(((ue = Ie(Ha, "$selectedDealBarStore", g)) == null ? void 0 : ue.quantity) || 1, e(ie));
    });
    let Yt = u(() => b().subscriptionsEnabled && b().subscriptions && (e(ot).length > 0 || _().preview));
    const un = u(() => {
      if (!b().progressiveGifts || e(ot).length > 0) return b();
      const ue = b().progressiveGifts.gifts.filter((Oe) => !Oe.applyOnlyForSubscriptions);
      return ue.length === b().progressiveGifts.gifts.length ? b() : { ...b(), progressiveGifts: { ...b().progressiveGifts, gifts: ue } };
    });
    let Kt = u(() => {
      var ue, Oe;
      return e(Yt) && ((ue = b().subscriptions) == null ? void 0 : ue.showPrices) && ((Oe = b().subscriptions) == null ? void 0 : Oe.hideDealBarPrices);
    }), ct = u(() => I() ? b().dealBars.findIndex((ue) => ue.id === I()) : null);
    const Mt = u(() => b().scratchOffEnabled ? b().scratchOff : null), Xt = u(() => (b().blockLayout === "vertical" || b().blockLayout === "plain") && (_().preview || x().availableForSale)), Ue = u(() => b().dealBars.reduce((ue, Oe) => {
      const Pt = e(Mt) && e(Xt) && Oe.hideBehindScratchOff, Ot = ue[ue.length - 1];
      return Pt && (Ot == null ? void 0 : Ot.type) === "scratch" ? Ot.bars.push(Oe) : Pt ? ue.push({ type: "scratch", key: Oe.id, bars: [Oe] }) : ue.push({ type: "visible", key: Oe.id, bar: Oe }), ue;
    }, [])), He = u(() => e(U).reduce((ue, { quantity: Oe }) => ue + Oe, 0) || 1), nt = u(() => I() ? b().dealBars.find((ue) => ue.id === I()) : void 0), Bt = u(() => {
      var ue, Oe;
      return !!((ue = e(nt)) != null && ue.sellingPlanEnabled) && !!((Oe = e(nt)) != null && Oe.sellingPlanGid);
    }), Dt = u(() => {
      var ue;
      return ((ue = e(nt)) == null ? void 0 : ue.productPersonalisation) && (b().blockLayout === "horizontal" || b().blockLayout === "grid");
    }), kn = u(() => e(nt) ? e(nt).dealBarType === void 0 || e(nt).dealBarType === pt.QuantityBreak ? W() || Number(e(nt).quantity) || 1 : e(nt).dealBarType === pt.Bxgy ? W() || e(nt).buyQuantity + e(nt).getQuantity : e(nt).dealBarType === pt.Bundle ? 1 : W() || 1 : W() || 1), zt = u(() => e(U).flatMap(({ variant: ue, quantity: Oe }) => Array(Oe).fill(ue.id))), qt = u(() => {
      if (e(Se).length === 0) return [];
      const ue = e(Se).reduce((Pt, Ot) => Math.max(Pt, Ot.productIndex), -1), Oe = Array.from({ length: ue + 1 }, () => "");
      for (const Pt of e(Se)) Oe[Pt.productIndex] = Pt.text;
      return Oe;
    });
    var mn = { rotateBundleNonce: function() {
      le(O, Math.random(), !0);
    }, selectedVariants: function() {
      return ge().map((ue) => ({ variantId: ue.id, quantity: ue.quantity, properties: ue.properties }));
    }, items: ge, pricing: function() {
      const ue = e(fe).discountedPrice + e(he).discountedPrice, Oe = e(fe).fullPrice + e(he).fullPrice;
      return { discountedPrice: { amount: ue / 100, formatted: i()(ue) }, fullPrice: { amount: Oe / 100, formatted: i()(Oe) }, discountedPricePerItem: { amount: e(fe).discountedPricePerItem / 100, formatted: i()(e(fe).discountedPricePerItem) }, fullPricePerItem: { amount: e(fe).fullPricePerItem / 100, formatted: i()(e(fe).fullPricePerItem) }, discountedPriceWithoutSellingPlan: { amount: (e(fe).discountedPriceWithoutSellingPlan + e(he).discountedPriceWithoutSellingPlan) / 100, formatted: i()(e(fe).discountedPriceWithoutSellingPlan + e(he).discountedPriceWithoutSellingPlan) }, discountedPricesForSellingPlans: e(fe).discountedPricesForSellingPlans.map((Pt) => {
        var Ot, Fe;
        const Re = (Fe = (Ot = e(he).discountedPricesForSellingPlans.find((Rn) => Rn.sellingPlanId === Pt.sellingPlanId)) == null ? void 0 : Ot.discountedPrice) != null ? Fe : e(he).discountedPriceWithoutSellingPlan, en = Pt.discountedPrice + Re;
        return { sellingPlanId: Pt.sellingPlanId, amount: en / 100, formatted: i()(en) };
      }) };
    }, deal: function() {
      return { subscriptionsEnabled: b().subscriptionsEnabled || b().dealBars.some((ue) => ue.sellingPlanEnabled) };
    }, isItemSelectionValid: function() {
      const { requiresItemSelection: ue, allItemsSelected: Oe } = e(de);
      return !ue || Oe;
    }, validateItemSelection: function() {
      var ue, Oe;
      const { requiresItemSelection: Pt, allItemsSelected: Ot } = e(de);
      return Pt && !Ot ? (ul(!0), { valid: !1, message: ((Oe = (ue = b().collectionBreaks) == null ? void 0 : ue.requireItemSelectionAlert) == null ? void 0 : Oe.text) || null }) : (ul(!1), { valid: !0, message: null });
    }, get component() {
      return h();
    }, set component(ue) {
      h(ue), k();
    }, get config() {
      return _();
    }, set config(ue) {
      _(ue), k();
    }, get translations() {
      return v();
    }, set translations(ue = {}) {
      v(ue), k();
    }, get dealBlock() {
      return b();
    }, set dealBlock(ue) {
      b(ue), k();
    }, get product() {
      return x();
    }, set product(ue) {
      x(ue), k();
    }, get currentVariantId() {
      return D();
    }, set currentVariantId(ue) {
      D(ue), k();
    }, get sellingPlanId() {
      return S();
    }, set sellingPlanId(ue) {
      S(ue), k();
    }, get selectedDealBarId() {
      return I();
    }, set selectedDealBarId(ue) {
      I(ue), k();
    }, get quantity() {
      return W();
    }, set quantity(ue) {
      W(ue), k();
    }, get mediaImages() {
      return Q();
    }, set mediaImages(ue = []) {
      Q(ue), k();
    }, get otherProducts() {
      return E();
    }, set otherProducts(ue = []) {
      E(ue), k();
    }, get collectionBreaksProducts() {
      return K();
    }, set collectionBreaksProducts(ue = []) {
      K(ue), k();
    }, get complementaryProducts() {
      return M();
    }, set complementaryProducts(ue = []) {
      M(ue), k();
    }, get nativeBundleProductIds() {
      return te();
    }, set nativeBundleProductIds(ue = []) {
      te(ue), k();
    }, get compact() {
      return A();
    }, set compact(ue = !1) {
      A(ue), k();
    }, get variantBadges() {
      return L();
    }, set variantBadges(ue = []) {
      L(ue), k();
    } }, Qt = $k(), gn = pe(Qt), hn = P(gn);
    let rr;
    {
      const ue = (Fe, Re) => {
        let en = ql(() => (function(Wt, zn, jr = !1) {
          return Wt === void 0 ? jr ? zn() : zn : Wt;
        })(Re == null ? void 0 : Re(), !1));
        var Rn = Be(), Mn = pe(Rn), Dn = (Wt) => {
          Nu(Wt, { get subscriptions() {
            return b().subscriptions;
          }, get sellingPlans() {
            return e(ot);
          }, get selectedSellingPlan() {
            return e(_t);
          }, get hideSellingPlanSelector() {
            return e(Bt);
          }, get hideTitle() {
            return e(en);
          }, onChange: gt, onRequestAddToCart: Ye });
        };
        G(Mn, (Wt) => {
          b().subscriptions && Wt(Dn);
        }), p(Fe, Rn);
      }, Oe = (Fe, Re = yr) => {
        var en = Be(), Rn = pe(en), Mn = (Wt) => {
          {
            let zn = u(() => Re().id === I()), jr = u(() => Re().id === I() ? e(qt) : []);
            qu(Wt, { get selectedDealBarIndex() {
              return e(ct);
            }, get dealBlock() {
              return e(un);
            }, get dealBar() {
              return Re();
            }, get product() {
              return e(se);
            }, get otherProducts() {
              return e(Z);
            }, get complementaryProducts() {
              return e(H);
            }, get selected() {
              return e(zn);
            }, get currentVariantId() {
              return D();
            }, get componentId() {
              return w;
            }, get sellingPlan() {
              return e(St);
            }, onProgressiveGiftsChange: ve, onDealBarSelect: je, onDealBarDeselect: it, onVariantSelect: at, onVariantsChange: st, onPersonalisationsChange: Ee, get personalisationInitialValues() {
              return e(jr);
            } });
          }
        }, Dn = (Wt) => {
          var zn = Be(), jr = pe(zn), Ii = (wa) => {
            {
              let ds = u(() => Re().id === I()), Mo = u(() => Re().id === I() ? e(qt) : []);
              $u(wa, { get selectedDealBarIndex() {
                return e(ct);
              }, get dealBlock() {
                return e(un);
              }, get dealBar() {
                return Re();
              }, get product() {
                return e(se);
              }, get otherProducts() {
                return e(Z);
              }, get complementaryProducts() {
                return e(H);
              }, get selected() {
                return e(ds);
              }, get currentVariantId() {
                return D();
              }, get componentId() {
                return w;
              }, get sellingPlan() {
                return e(St);
              }, onProgressiveGiftsChange: ve, onDealBarSelect: je, onDealBarDeselect: it, onVariantSelect: at, onVariantsChange: st, onPersonalisationsChange: Ee, get personalisationInitialValues() {
                return e(Mo);
              } });
            }
          }, la = (wa) => {
            var ds = Be(), Mo = pe(ds), nm = (Mi) => {
              {
                let us = u(() => Re().id === I()), zo = u(() => Re().id === I() ? e(qt) : []);
                rg(Mi, { get dealBlock() {
                  return e(un);
                }, get dealBar() {
                  return Re();
                }, get selectedDealBarIndex() {
                  return e(ct);
                }, get otherProducts() {
                  return e(Z);
                }, get complementaryProducts() {
                  return e(H);
                }, get componentId() {
                  return w;
                }, get selected() {
                  return e(us);
                }, get globalSellingPlan() {
                  return e(St);
                }, onProgressiveGiftsChange: ve, onDealBarSelect: je, onDealBarDeselect: it, onVariantsChange: jt, onPersonalisationsChange: Ee, get personalisationInitialValues() {
                  return e(zo);
                } });
              }
            }, rm = (Mi) => {
              var us = Be(), zo = pe(us), am = (zi) => {
                {
                  let $o = u(() => Re().id === I() ? W() && Number(W()) : void 0), Do = u(() => Re().id === I()), Ao = u(() => Re().id === I() ? e(qt) : []);
                  Ou(zi, { get dealBlock() {
                    return e(un);
                  }, get dealBar() {
                    return Re();
                  }, get selectedDealBarIndex() {
                    return e(ct);
                  }, get product() {
                    return e(se);
                  }, get collectionBreaksProducts() {
                    return e(z);
                  }, get otherProducts() {
                    return e(Z);
                  }, get complementaryProducts() {
                    return e(H);
                  }, get customQuantity() {
                    return e($o);
                  }, get selected() {
                    return e(Do);
                  }, onProgressiveGiftsChange: ve, get currentVariantId() {
                    return D();
                  }, get componentId() {
                    return w;
                  }, get globalSellingPlan() {
                    return e(St);
                  }, onDealBarSelect: je, onDealBarDeselect: it, onVariantSelect: at, onVariantsChange: yt, onPersonalisationsChange: Ee, get personalisationInitialValues() {
                    return e(Ao);
                  } });
                }
              }, im = (zi) => {
                {
                  let $o = u(() => Re().id === I() ? W() && Number(W()) : void 0), Do = u(() => Re().id === I()), Ao = u(() => Re().id === I() ? e(qt) : []);
                  _o(zi, { get selectedDealBarIndex() {
                    return e(ct);
                  }, get dealBlock() {
                    return e(un);
                  }, get dealBar() {
                    return Re();
                  }, get product() {
                    return e(se);
                  }, get otherProducts() {
                    return e(Z);
                  }, get complementaryProducts() {
                    return e(H);
                  }, get customQuantity() {
                    return e($o);
                  }, get selected() {
                    return e(Do);
                  }, get currentVariantId() {
                    return D();
                  }, get componentId() {
                    return w;
                  }, get globalSellingPlan() {
                    return e(St);
                  }, onProgressiveGiftsChange: ve, onDealBarSelect: je, onDealBarDeselect: it, onVariantSelect: at, onVariantsChange: rn, onPersonalisationsChange: Ee, get personalisationInitialValues() {
                    return e(Ao);
                  } });
                }
              };
              G(zo, (zi) => {
                !b().collectionBreaksEnabled || !b().collectionBreaks || Re().dealBarType && Re().dealBarType !== pt.QuantityBreak && Re().dealBarType !== pt.Bxgy ? zi(im, !1) : zi(am);
              }, !0), p(Mi, us);
            };
            G(Mo, (Mi) => {
              Re().dealBarType === pt.Sku ? Mi(nm) : Mi(rm, !1);
            }, !0), p(wa, ds);
          };
          G(jr, (wa) => {
            Re().dealBarType === pt.Bundle ? wa(Ii) : wa(la, !1);
          }, !0), p(Wt, zn);
        };
        G(Rn, (Wt) => {
          Re().dealBarType === pt.MixAndMatch ? Wt(Mn) : Wt(Dn, !1);
        }), p(Fe, en);
      };
      var Hn = P(hn), Zn = (Fe) => {
        var Re = Mk(), en = pe(Re), Rn = (Wt) => {
          var zn = Ik();
          Ve(P(zn), () => e(qe)), y(zn), p(Wt, zn);
        };
        G(en, (Wt) => {
          e(qe) && Wt(Rn);
        });
        var Mn = q(en, 2), Dn = (Wt) => {
          Ju(Wt, { get timer() {
            return b().timer;
          } });
        };
        G(Mn, (Wt) => {
          b().timerEnabled && b().timer && Wt(Dn);
        }), p(Fe, Re);
      };
      G(Hn, (Fe) => {
        A() || Fe(Zn);
      });
      var dr = q(Hn, 2), fn = (Fe) => {
        ue(Fe);
      };
      G(dr, (Fe) => {
        var Re;
        e(Yt) && ((Re = b().subscriptions) == null ? void 0 : Re.position) === "above" && e(we).positions.size === 0 && Fe(fn);
      });
      var Pn = q(dr, 2);
      let Pt, Ot;
      var dt = P(Pn);
      $t(dt, 17, () => e(ne), (Fe) => Fe.id, (Fe, Re) => {
        aa(Fe, { get badge() {
          return e(Re);
        }, get blockLayout() {
          return b().blockLayout;
        } });
      });
      var ut = q(dt, 2), Rt = (Fe) => {
        {
          let Re = u(() => e(we).positions.has("all"));
          ue(Fe, () => e(Re));
        }
      };
      G(ut, (Fe) => {
        var Re;
        e(Yt) && ((Re = b().subscriptions) == null ? void 0 : Re.position) === "above" && e(we).positions.size > 0 && Fe(Rt);
      });
      var Nt = q(ut, 2);
      $t(Nt, 17, () => e(Ue), (Fe) => Fe.key, (Fe, Re) => {
        var en = Be(), Rn = pe(en), Mn = (Wt) => {
          Lu(Wt, { get settings() {
            return e(Mt);
          }, onReveal: () => {
            return zn = e(Re).bars, void (!I() && ke && zn.includes(ke) && je({ dealBarId: ke.id, dealBarQuantity: Ge(ke), preselected: !0 }));
            var zn;
          }, children: (zn, jr) => {
            var Ii = Be();
            $t(pe(Ii), 17, () => e(Re).bars, (la) => la.id, (la, wa) => {
              Oe(la, () => e(wa));
            }), p(zn, Ii);
          }, $$slots: { default: !0 } });
        }, Dn = (Wt) => {
          var zn = Be(), jr = pe(zn), Ii = (la) => {
            Oe(la, () => e(Re).bar);
          };
          G(jr, (la) => {
            e(Re).type === "visible" && la(Ii);
          }, !0), p(Wt, zn);
        };
        G(Rn, (Wt) => {
          e(Re).type === "scratch" && e(Mt) ? Wt(Mn) : Wt(Dn, !1);
        }), p(Fe, en);
      });
      var Ln = q(Nt, 2), Sn = (Fe) => {
        {
          let Re = u(() => e(we).positions.has("all"));
          ue(Fe, () => e(Re));
        }
      };
      G(Ln, (Fe) => {
        var Re;
        e(Yt) && ((Re = b().subscriptions) == null ? void 0 : Re.position) === "below" && e(we).positions.size > 0 && Fe(Sn);
      }), y(Pn);
      var xn = q(Pn, 2), Bn = (Fe) => {
        Ua(Fe, { get product() {
          return e(Ne);
        }, get productPersonalisation() {
          return e(nt).productPersonalisation;
        }, get selectedVariantIds() {
          return e(zt);
        }, get quantity() {
          return e(kn);
        }, get addPersonalisationModal() {
          return b().addPersonalisationModal;
        }, onPersonalisationsChange: Ee, get initialValues() {
          return e(qt);
        } });
      };
      G(xn, (Fe) => {
        var Re;
        e(Dt) && ((Re = e(nt)) != null && Re.productPersonalisation) && Fe(Bn);
      });
      var Ut = q(xn, 2), sn = (Fe) => {
        ue(Fe);
      };
      G(Ut, (Fe) => {
        var Re;
        e(Yt) && ((Re = b().subscriptions) == null ? void 0 : Re.position) === "below" && e(we).positions.size === 0 && Fe(sn);
      });
      var Cn = q(Ut, 2), yn = (Fe) => {
        var Re = zk();
        Ve(P(Re), () => d()("system.out_of_stock")), y(Re), p(Fe, Re);
      };
      G(Cn, (Fe) => {
        e(ae) && (e(U).length > 1 || e(U)[0].quantity > 1) && Fe(yn);
      });
      var $n = q(Cn, 2), an = (Fe) => {
        Zu(Fe, { get checkboxUpsells() {
          return b().checkboxUpsells;
        }, get dealBlock() {
          return b();
        }, get otherProducts() {
          return e(Z);
        }, get complementaryProducts() {
          return e(H);
        }, get dealSellingPlan() {
          return e(tt);
        }, get dealBarQuantity() {
          return e(He);
        }, onChange: We });
      };
      G($n, (Fe) => {
        !A() && b().checkboxUpsellsEnabled && b().checkboxUpsells && Fe(an);
      });
      var pn = q($n, 2), Jn = (Fe) => {
        Uu(Fe, { get progressiveGifts() {
          return e(un).progressiveGifts;
        }, get dealBlock() {
          return b();
        }, get otherProducts() {
          return e(Z);
        }, get selectedDealBarIndex() {
          return e(ct);
        }, get sellingPlan() {
          return e(tt);
        }, onChange: ve, onUnlock: Tt, onSubscribe: bt });
      };
      G(pn, (Fe) => {
        b().progressiveGiftsEnabled && e(un).progressiveGifts && e(un).progressiveGifts.layout !== "deal-bar" && Fe(Jn);
      });
      var En = q(pn, 2), gl = (Fe) => {
        {
          let Re = u(() => e(de).missingItemsCount > 0);
          ag(Fe, { get collectionBreaks() {
            return b().collectionBreaks;
          }, get hasItemsToSelect() {
            return e(Re);
          } });
        }
      };
      G(En, (Fe) => {
        b().collectionBreaksEnabled && Fe(gl);
      });
      var Yk = q(En, 2), Kk = (Fe) => {
        ig(Fe, { get savingsSummary() {
          return b().savingsSummary;
        }, get totalFullPrice() {
          return e(Et).fullPrice;
        }, get totalDiscountedPrice() {
          return e(Et).discountedPrice;
        }, get quantity() {
          return e(Jt);
        }, get product() {
          return e(Ne);
        } });
      };
      G(Yk, (Fe) => {
        var Re, en;
        !A() && b().savingsSummaryEnabled && b().savingsSummary && (Re = e(Et).saved, en = b().savingsSummary.hideWhenZeroSavings, Re > 0 || !en) && Fe(Kk);
      }), y(hn), be((Fe, Re, en, Rn) => {
        Pt = Lt(Pn, 1, "kaching-bundles__bars", null, Pt, en), Ot = Vt(Pn, "", Ot, Rn);
      }, [() => ({ "kaching-bundles__block--horizontal": b().blockLayout === "horizontal", "kaching-bundles__block--grid": b().blockLayout === "grid", "kaching-bundles__block--plain": b().blockLayout === "plain" }), () => b().abTestVariantNumber ? no(b().abTestVariantNumber) : void 0, () => ({ "kaching-bundles__bars--horizontal": b().blockLayout === "horizontal", "kaching-bundles__bars--grid": b().blockLayout === "grid", "kaching-bundles__bars--plain": b().blockLayout === "plain", "kaching-bundles__bars--hide-prices": e(Kt), "kaching-bundles__bars--badge-border-all": e(we).positions.has("all"), "kaching-bundles__bars--badge-border-top": e(we).positions.has("top"), "kaching-bundles__bars--badge-border-bottom": e(we).positions.has("bottom"), "kaching-bundles__bars--badge-border-left": e(we).positions.has("left"), "kaching-bundles__bars--badge-border-right": e(we).positions.has("right") }), () => {
        var Fe, Re;
        return { "--badge-border-thickness": `${(Fe = e(we).thickness) != null ? Fe : ""}px`, "--badge-border-gap": `${(Re = e(we).gap) != null ? Re : ""}px`, "--badge-border-gap-border": e(we).gap ? "1px solid var(--bar-border-color, rgba(0, 0, 0, 0.3))" : "none", "--badge-border-min-length": e(we).sideLength ? `${e(we).sideLength}px` : void 0, "--badge-border-wrap-color": e(Ze) };
      }]);
    }
    y(gn);
    var Xk = q(gn, 2), em = (ue) => {
      Yu(ue, { get shopCustomStyles() {
        return _().shopCustomStyles;
      }, get customStyles() {
        return b().customStyles;
      }, get dealBlockId() {
        return b().id;
      } });
    };
    G(Xk, (ue) => {
      b().customStylesEnabled && ue(em);
    }), be((ue, Oe, Pt, Ot) => {
      var Fe;
      rr = Lt(hn, 1, "kaching-bundles__block kaching-bundles__block--loaded", null, rr, ue), Pe(hn, "data-deal-block-id", b().id), Pe(hn, "data-ab-test-variant-id", b().abTestVariantId), Pe(hn, "data-ab-test-variant", Oe), Pe(hn, "data-selling-plan-id", (Fe = e(tt)) == null ? void 0 : Fe.id), Vt(hn, e($e));
    }, [() => ({ "kaching-bundles__block--horizontal": b().blockLayout === "horizontal", "kaching-bundles__block--grid": b().blockLayout === "grid", "kaching-bundles__block--plain": b().blockLayout === "plain" }), () => b().abTestVariantNumber ? no(b().abTestVariantNumber) : void 0, () => ({ "kaching-bundles__bars--horizontal": b().blockLayout === "horizontal", "kaching-bundles__bars--grid": b().blockLayout === "grid", "kaching-bundles__bars--plain": b().blockLayout === "plain", "kaching-bundles__bars--hide-prices": e(Kt), "kaching-bundles__bars--badge-border-all": e(we).positions.has("all"), "kaching-bundles__bars--badge-border-top": e(we).positions.has("top"), "kaching-bundles__bars--badge-border-bottom": e(we).positions.has("bottom"), "kaching-bundles__bars--badge-border-left": e(we).positions.has("left"), "kaching-bundles__bars--badge-border-right": e(we).positions.has("right") }), () => {
      var ue, Oe;
      return { "--badge-border-thickness": `${(ue = e(we).thickness) != null ? ue : ""}px`, "--badge-border-gap": `${(Oe = e(we).gap) != null ? Oe : ""}px`, "--badge-border-gap-border": e(we).gap ? "1px solid var(--bar-border-color, rgba(0, 0, 0, 0.3))" : "none", "--badge-border-min-length": e(we).sideLength ? `${e(we).sideLength}px` : void 0, "--badge-border-wrap-color": e(Ze) };
    }]), p(n, Qt);
    var tm = Xe(mn);
    return f(), tm;
  }
  customElements.define("kaching-bundles-block", Qe(lg, { config: { attribute: "config", type: "Object" }, translations: { attribute: "translations", type: "Object" }, dealBlock: { attribute: "deal-block", type: "Object" }, product: { attribute: "product", type: "Object" }, otherProducts: { attribute: "other-products", type: "Array" }, collectionBreaksProducts: { attribute: "collection-breaks-products", type: "Array" }, complementaryProducts: { attribute: "complementary-products", type: "Array" }, mediaImages: { attribute: "media-images", type: "Array" }, currentVariantId: { attribute: "current-variant-id", type: "Number" }, sellingPlanId: { attribute: "selling-plan-id", type: "Number" }, selectedDealBarId: { attribute: "selected-deal-bar-id", type: "String" }, quantity: { attribute: "quantity", type: "Number" }, nativeBundleProductIds: { attribute: "native-bundle-product-ids", type: "Array" }, compact: { attribute: "compact", type: "Boolean" }, variantBadges: { attribute: "variant-badges", type: "Array" }, component: {} }, [], ["rotateBundleNonce", "selectedVariants", "items", "pricing", "deal", "isItemSelectionValid", "validateItemSelection"], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this, this.innerHTML && (vr(this, "kaching-bundles-block-hydrated"), this.innerHTML = "");
    }
  }));
  var Dk = $('<div class="kaching-bundles"><!></div>');
  function sg(n, t) {
    var r;
    Ke(t, !0);
    const a = m(t, "config", 7), l = m(t, "dealBlock", 7), o = m(t, "products", 23, () => []), c = m(t, "mediaImages", 7), s = m(t, "translations", 7), { setConfig: i } = Qa(a()), { setMoneyFormat: d } = mi(a().moneyFormat), { setTranslations: g } = Na(s()), { setMediaImages: f } = tl(c()), { setSwatchSettings: h } = Ki({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (r = l().showSelectedSwatchName) != null && r });
    Je(() => {
      i(a());
    }), Je(() => {
      d(a().moneyFormat, !!l().showPricesWithoutDecimals);
    }), Je(() => {
      g(s());
    }), Je(() => {
      f(c());
    }), Je(() => {
      var S;
      h({ swatchOptions: l().swatchOptions || [], swatchSize: l().swatchSize, swatchShape: l().swatchShape, showSelectedSwatchName: (S = l().showSelectedSwatchName) != null && S });
    });
    const _ = u(() => l().dealBars.find((S) => S.dealBarType === pt.MixAndMatch));
    var v = { get config() {
      return a();
    }, set config(S) {
      a(S), k();
    }, get dealBlock() {
      return l();
    }, set dealBlock(S) {
      l(S), k();
    }, get products() {
      return o();
    }, set products(S = []) {
      o(S), k();
    }, get mediaImages() {
      return c();
    }, set mediaImages(S) {
      c(S), k();
    }, get translations() {
      return s();
    }, set translations(S) {
      s(S), k();
    } }, b = Dk(), x = P(b), D = (S) => {
      wo(S, { get dealBlock() {
        return l();
      }, get dealBar() {
        return e(_);
      }, get products() {
        return o();
      }, onChoose: () => {
      } });
    };
    return G(x, (S) => {
      e(_) && S(D);
    }), y(b), p(n, b), Xe(v);
  }
  customElements.define("kaching-bundles-mix-and-match-choose-product", Qe(sg, { config: { attribute: "config", type: "Object" }, dealBlock: { attribute: "deal-block", type: "Object" }, translations: { attribute: "translations", type: "Object" }, products: { attribute: "products", type: "Array" }, mediaImages: { attribute: "media-images", type: "Array" } }, [], [], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this;
    }
  }));
  var Ak = $('<div class="kaching-bundles"><!></div>');
  function og(n, t) {
    Ke(t, !0);
    const r = m(t, "config", 7), a = m(t, "product", 7), l = m(t, "translations", 7), o = m(t, "addPersonalisationModal", 7), { setConfig: c } = Qa(r()), { setTranslations: s } = Na(l());
    Je(() => {
      c(r()), s(l());
    });
    const i = u(() => {
      var f, h;
      return (h = (f = a()) == null ? void 0 : f.variants) != null && h[0] ? [{ variant: a().variants[0], index: 0 }, { variant: a().variants[0], index: 1 }] : [];
    });
    var d = { get config() {
      return r();
    }, set config(f) {
      r(f), k();
    }, get product() {
      return a();
    }, set product(f) {
      a(f), k();
    }, get translations() {
      return l();
    }, set translations(f) {
      l(f), k();
    }, get addPersonalisationModal() {
      return o();
    }, set addPersonalisationModal(f) {
      o(f), k();
    } }, g = Ak();
    return fo(P(g), { get product() {
      return a();
    }, get selectedVariants() {
      return e(i);
    }, get addPersonalisationModal() {
      return o();
    }, inline: !0, personalisationValues: [], onConfirm: () => {
    }, onClose: () => {
    } }), y(g), p(n, g), Xe(d);
  }
  customElements.define("kaching-bundles-personalisation-modal", Qe(og, { config: { attribute: "config", type: "Object" }, product: { attribute: "product", type: "Object" }, translations: { attribute: "translations", type: "Object" }, addPersonalisationModal: { attribute: "add-personalisation-modal", type: "Object" } }, [], [], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this;
    }
  }));
  function Vk(n, t) {
    t().dispatchEvent(new CustomEvent("kaching-bundles-sticky-atc-clicked", { bubbles: !0, composed: !0 }));
  }
  var Tk = $('<img class="kaching-bundles-sticky-atc__image"/>'), qk = $('<button class="kaching-bundles-sticky-atc__button"><!></button>'), Gk = $('<div class="kaching-bundles"><div class="kaching-bundles-sticky-atc"><div class="kaching-bundles-sticky-atc__content"><!> <div class="kaching-bundles-sticky-atc__title"><!></div></div> <!></div></div>');
  function cg(n, t) {
    var r;
    Ke(t, !0);
    const a = () => Ie(Ha, "$selectedDealBarStore", o), l = () => Ie(v, "$translate", o), [o, c] = vt(), s = m(t, "component", 7), i = m(t, "config", 7), d = m(t, "stickyAtc", 7), g = m(t, "translations", 7), f = m(t, "product", 7), h = m(t, "dealBlock", 7), { setConfig: _ } = Qa(i()), { translate: v, setTranslations: b } = Na(g()), { formatPrice: x, setMoneyFormat: D } = mi(i().moneyFormat, (r = h()) == null ? void 0 : r.showPricesWithoutDecimals);
    Je(() => {
      _(i());
    }), Je(() => {
      var X;
      D(i().moneyFormat, !!((X = h()) != null && X.showPricesWithoutDecimals));
    }), Je(() => {
      b(g());
    });
    const S = u(() => ((X) => {
      const B = { "kaching-bundles-sticky-atc-background-color": Le(X.backgroundColor), "kaching-bundles-sticky-atc-title-color": Le(X.titleColor), "kaching-bundles-sticky-atc-button-color": Le(X.buttonColor), "kaching-bundles-sticky-atc-button-text-color": Le(X.buttonTextColor), "kaching-bundles-sticky-atc-title-font-size": X.titleFont.size + "px", "kaching-bundles-sticky-atc-button-font-size": X.buttonFont.size + "px", "kaching-bundles-sticky-atc-title-font-style": cr(X.titleFont.style), "kaching-bundles-sticky-atc-title-font-weight": or(X.titleFont.style), "kaching-bundles-sticky-atc-button-font-style": cr(X.buttonFont.style), "kaching-bundles-sticky-atc-button-font-weight": or(X.buttonFont.style), "kaching-bundles-sticky-atc-product-photo-size": X.productPhotoSize + "px", "kaching-bundles-sticky-atc-button-padding": X.buttonPadding + "px", "kaching-bundles-sticky-atc-product-photo-corner-radius": X.productPhotoCornerRadius + "px", "kaching-bundles-sticky-atc-button-corner-radius": X.buttonCornerRadius + "px" };
      if (X.sameSizeOnMobile || !X.mobile) return bn(B);
      const F = X.mobile;
      return bn({ ...B, "kaching-bundles-sticky-atc-image-display": X.productPhotoSize > 0 ? "block" : "none", "kaching-bundles-sticky-atc-image-display-mobile": F.productPhotoSize > 0 ? "block" : "none", "kaching-bundles-sticky-atc-title-font-size-mobile": F.titleFontSize + "px", "kaching-bundles-sticky-atc-button-font-size-mobile": F.buttonFontSize + "px", "kaching-bundles-sticky-atc-product-photo-size-mobile": F.productPhotoSize + "px", "kaching-bundles-sticky-atc-button-padding-mobile": F.buttonPadding + "px", "kaching-bundles-sticky-atc-product-photo-corner-radius-mobile": F.productPhotoCornerRadius + "px", "kaching-bundles-sticky-atc-button-corner-radius-mobile": F.buttonCornerRadius + "px" });
    })(d())), I = u(() => {
      var X;
      return ((X = a()) == null ? void 0 : X.pricing.fullPrice) || f().variants[0].compareAtPrice || f().variants[0].price;
    }), W = u(() => {
      var X;
      return ((X = a()) == null ? void 0 : X.pricing.discountedPrice) || f().variants[0].price;
    }), Q = u(() => {
      var X;
      return ((X = a()) == null ? void 0 : X.quantity) || 1;
    }), E = u(() => dn({ priceFormatter: Ie(x, "$formatPrice", o), product: f(), totalFullPrice: e(I), totalDiscountedPrice: e(W), quantity: e(Q), unitQuantity: null })), K = u(() => e(E)(l()(d().title))), M = new mv("(width < 750px)"), te = u(() => (M.current && !d().sameSizeOnMobile && d().mobile ? d().mobile.productPhotoSize : d().productPhotoSize) > 0);
    var A = { get component() {
      return s();
    }, set component(X) {
      s(X), k();
    }, get config() {
      return i();
    }, set config(X) {
      i(X), k();
    }, get stickyAtc() {
      return d();
    }, set stickyAtc(X) {
      d(X), k();
    }, get translations() {
      return g();
    }, set translations(X) {
      g(X), k();
    }, get product() {
      return f();
    }, set product(X) {
      f(X), k();
    }, get dealBlock() {
      return h();
    }, set dealBlock(X) {
      h(X), k();
    } }, L = Gk(), se = P(L), Z = P(se), H = P(Z), z = (X) => {
      var B = Tk();
      be(() => {
        Pe(B, "src", f().image), Pe(B, "alt", f().title);
      }), p(X, B);
    };
    G(H, (X) => {
      e(te) && X(z);
    });
    var C = q(H, 2);
    Ve(P(C), () => e(K)), y(C), y(Z);
    var R = q(Z, 2), N = (X) => {
      var B = qk();
      B.__click = [Vk, s], Ve(P(B), () => l()(d().buttonText)), y(B), p(X, B);
    };
    G(R, (X) => {
      d().buttonText && X(N);
    }), y(se), y(L), be(() => Vt(se, e(S))), p(n, L);
    var J = Xe(A);
    return c(), J;
  }
  On(["click"]), customElements.define("kaching-bundles-sticky-atc", Qe(cg, { config: { attribute: "config", type: "Object" }, stickyAtc: { attribute: "sticky-atc", type: "Object" }, translations: { attribute: "translations", type: "Object" }, product: { attribute: "product", type: "Object" }, dealBlock: { attribute: "deal-block", type: "Object" }, component: {} }, [], [], !1, (n) => class extends n {
    constructor() {
      super(), wn(this, "component"), this.component = this;
    }
  }));
  const Ok = Zd, Fk = Qd, Lk = lg, jk = sg, Ek = og, Rk = cg, Nk = Pu.element, Qk = Ok.element, Wk = Fk.element, Uk = Lk.element, Hk = jk.element, Zk = Ek.element, Jk = Rk.element;
  return Ft.ChooseMultipleGifts = Wk, Ft.ChooseProduct = Qk, Ft.DealBar = Nk, Ft.DealBlock = Uk, Ft.MixAndMatchChooseProduct = Hk, Ft.PersonalisationModal = Zk, Ft.StickyAtc = Jk, Object.defineProperty(Ft, Symbol.toStringTag, { value: "Module" }), Ft;
})({});
