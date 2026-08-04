(()=>{var F=Object.defineProperty,L=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var B=(i,t,e)=>t in i?F(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,f=(i,t)=>{for(var e in t||(t={}))T.call(t,e)&&B(i,e,t[e]);if(g)for(var e of g(t))E.call(t,e)&&B(i,e,t[e]);return i},y=(i,t)=>L(i,M(t));var I=(i,t)=>{var e={};for(var o in i)T.call(i,o)&&t.indexOf(o)<0&&(e[o]=i[o]);if(i!=null&&g)for(var o of g(i))t.indexOf(o)<0&&E.call(i,o)&&(e[o]=i[o]);return e};var p=(i,t,e)=>new Promise((o,n)=>{var d=l=>{try{c(e.next(l))}catch(m){n(m)}},a=l=>{try{c(e.throw(l))}catch(m){n(m)}},c=l=>l.done?o(l.value):Promise.resolve(l.value).then(d,a);c((e=e.apply(i,t)).next())});function _(i){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)i[o]=e[o]}return i}var U={read:function(i){return i[0]==='"'&&(i=i.slice(1,-1)),i.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(i){return encodeURIComponent(i).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function k(i,t){function e(n,d,a){if(typeof document!="undefined"){a=_({},t,a),typeof a.expires=="number"&&(a.expires=new Date(Date.now()+a.expires*864e5)),a.expires&&(a.expires=a.expires.toUTCString()),n=encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var l in a)a[l]&&(c+="; "+l,a[l]!==!0&&(c+="="+a[l].split(";")[0]));return document.cookie=n+"="+i.write(d,n)+c}}function o(n){if(!(typeof document=="undefined"||arguments.length&&!n)){for(var d=document.cookie?document.cookie.split("; "):[],a={},c=0;c<d.length;c++){var l=d[c].split("="),m=l.slice(1).join("=");try{var h=decodeURIComponent(l[0]);if(a[h]=i.read(m,h),n===h)break}catch(b){}}return n?a[n]:a}}return Object.create({set:e,get:o,remove:function(n,d){e(n,"",_({},d,{expires:-1}))},withAttributes:function(n){return k(this.converter,_({},this.attributes,n))},withConverter:function(n){return k(_({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(i)}})}var r=k(U,{path:"/"});var w=class{constructor(o){var n=o,{options:t={}}=n,e=I(n,["options"]);var a;(!e||!e.amount||!e.type||!e.sendData||!e.safelinkGeneratedCookie||!e.applyCoupon)&&console.debug("Invalid modal props",e),this.props=e,this.features=e.features;let d={heading_text:"{Affiliate Name} sent you {Discount Value} off!",body_text:"Click below to redeem your discount code",button_text:"Redeem Coupon",widget_button_text:"Get {Affiliate First Name}'s {Discount Value} discount",background_color:"#FFFFFF",heading_color:"0C1B2F",body_color:"#9AAAB9",button_color:"#2C2C2C",button_border_color:"#535459",widget_button_color:"#4285FB",button_text_color:"#FFFFFF",helper_text:"Your discount will automatically be applied at checkout",helper_text_color:"#9AAAB9",widget_button_text_color:"#FFFFFF",widget_button_position:"bottom_right",widget_button_enabled:!0,emoji_enabled:!0};this.options=f(f({},d),t),this.variables={"Affiliate Name":e.affiliate_name,"Affiliate First Name":e.affiliate_first_name,"Affiliate Last Name":e.affiliate_last_name,"Discount Value":((a=e.type)==null?void 0:a.toString().toLowerCase())==="percentage"?`${e.amount}%`:`${e.currency_symbol||"$"}${e.amount}`}}init(){this.initialized&&this.unmount();let t=this.renderSafelinkModal(),e=this.renderWidgetButton();document.body.prepend(t),document.body.prepend(e),this.updateSafeLinkModalSize(),window.addEventListener("resize",()=>this.updateSafeLinkModalSize()),new URLSearchParams(window.location.search).get("snowball")&&(localStorage.removeItem("snowball_safelink_modal_closed"),localStorage.removeItem("snowball_widget_button_closed")),this.wasModalClosed()?this.wasWidgetClosed()||this.showWidgetButton():this.showSafelinkModal(),this.initialized=!0}unmount(){this.initialized&&(this.modalOverlay.remove(),this.widgetButton.remove(),window.removeEventListener("resize",()=>this.updateSafeLinkModalSize()),this.initialized=!1)}showSafelinkModal(){this.modalOverlay&&(this.modalOverlay.style.display="block")}hideSafelinkModal(){this.modalOverlay&&(this.modalOverlay.style.display="none"),this.options.widget_button_enabled&&this.showWidgetButton(),this.removeURLParams(),localStorage.setItem("snowball_safelink_modal_closed","true")}showWidgetButton(){this.options.widget_button_enabled&&this.widgetButton&&(this.widgetButton.style.display="flex")}hideWidgetButton(){this.widgetButton&&(this.widgetButton.style.display="none"),localStorage.setItem("snowball_widget_button_closed","true")}showLoadingSpinner(){this.modalActionButton.style.display="none",this.modalInner.append(this.renderModalCodeBox()),this.modalCodeBox.innerHTML=" Loading...",this.modalCodeBox.prepend(this.renderLoadingSpinner())}showSafelinkCode(){this.modalCodeBox.innerHTML=`${this.safelinkCode} <img src="https://d2pnkb2a79l965.cloudfront.net/copy-blue-icon.png"
            style="width: 22px; margin-bottom: -5px; display: inline;">`,this.modalInner.append(this.renderHelperText())}renderSafelinkModal(){let t=this.renderModalOverlay(),e=this.renderModalContent(),o=this.renderModalInner(),n=this.renderModalCloseButton(),d=this.renderModalActionButton();return o.append(n),o.append(d),e.append(o),t.append(e),this.modalOverlay}renderModalOverlay(){return this.modalOverlay=document.createElement("div"),this.modalOverlay.id="__ss-modal-overlay",this.modalOverlay.style.cssText=`
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            z-index: 9998;`,this.modalOverlay.addEventListener("click",t=>{t.target.id==="__ss-modal-overlay"&&this.hideSafelinkModal()}),this.modalOverlay}renderModalContent(){return this.modalContent=document.createElement("div"),this.modalContent.id="__ss-modal-content",this.modalContent.style.cssText=`
            display: block;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: ${this.options.background_color};
            z-index: 9999;
            border-top: 10px solid #2C2C2C;
            border-radius: 10px;
            text-align: center;
            margin: auto;`,this.modalContent}renderModalInner(){return this.modalInner=document.createElement("div"),this.modalInner.id="__ss-modal-inner",this.modalInner.style.cssText=`
            box-sizing: border-box;
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            padding: 40px 30px`,this.modalInner.innerHTML=`
            <p style="text-align: center; ${this.options.emoji_enabled?"":"display: none;"}">
                <img src="https://d2pnkb2a79l965.cloudfront.net/party-popper-emoji.png"
                    style="width: 80px; height: 80px; display: inline-block;">
            </p>
            <h2 style="
                text-align: center;
                font-size: 2.5em;
                line-height: 1em;
                margin: 0.5em auto;
                font-family: -apple-system, Inter, BlinkMacSystemFont, Segoe UI, Roboto,
                    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
                    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
                font-weight: bold;
                color: ${this.options.heading_color};
            ">
                ${this.replaceVariables(this.options.heading_text)}
            </h2>
            <h3 style="
                text-align: center;
                font-size: 1.3em;
                margin: 0.8em auto;
                color: ${this.options.body_color};
                font-family: -apple-system, Inter, BlinkMacSystemFont, Segoe UI, Roboto,
                    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
                    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
            ">
                ${this.replaceVariables(this.options.body_text)}
            </h3>`,this.modalInner}renderModalCloseButton(){return this.modalCloseButton=document.createElement("button"),this.modalCloseButton.style.cssText=`
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            width: auto;
            text-align: center;`,this.modalCloseButton.innerHTML=`
            <svg style="fill: ${this.options.heading_color}" height="25px" width="25px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" xml:space="preserve">
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>`,this.modalCloseButton.addEventListener("click",()=>this.hideSafelinkModal()),this.modalCloseButton}renderModalActionButton(){return this.modalActionButton=document.createElement("button"),this.modalActionButton.style.cssText=`
            display: block;
            margin: 0 auto;
            padding: 12px 20px;
            width: 230px;
            background-color: ${this.options.button_color};
            color: ${this.options.button_text_color};
            border: 1px solid ${this.options.button_border_color};
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
            font-family: -apple-system, Inter, BlinkMacSystemFont,
                Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
                Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; text-align: center;`,this.modalActionButton.innerHTML=this.replaceVariables(this.options.button_text),this.modalActionButton.addEventListener("click",()=>this.fetchDiscountCode()),this.modalActionButton}renderModalCodeBox(){return this.modalCodeBox=document.createElement("div"),this.modalCodeBox.style.cssText=`
            background-color: #ECF0FF;
            display: block;
            width: 90%;
            margin: auto;
            text-align: center;
            color: #3860FB;
            font-size: 25px;
            padding: 8px;
            cursor: pointer;`,this.modalCodeBox.addEventListener("click",()=>{this.safelinkCode&&(navigator.clipboard.writeText(this.safelinkCode),alert("Copied to clipboard"))}),this.modalCodeBox}renderHelperText(){return this.modalHelperText=document.createElement("div"),this.modalHelperText.style.cssText=`
            font-size: 0.8em;
            color: ${this.options.helper_text_color};
            margin-top: 8px;`,this.modalHelperText.innerHTML=`<em>${this.replaceVariables(this.options.helper_text)}</em>`,this.modalHelperText}renderLoadingSpinner(){return this.loadingSpinnerStyle=document.getElementById("__ss-loader-spinner-style"),this.loadingSpinnerStyle||(this.loadingSpinnerStyle=document.createElement("style"),this.loadingSpinnerStyle.id="__ss-loader-spinner-style",this.loadingSpinnerStyle.innerHTML=`
                .__ss-loader-spinner {
                    width: 24px;
                    height: 24px;
                    border: 4px solid #3860FB;
                    border-bottom-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: __ss-rotation 1s linear infinite;
                }

                @keyframes __ss-rotation {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }`,document.head.append(this.loadingSpinnerStyle)),this.loadingSpinner=document.createElement("span"),this.loadingSpinner.className="__ss-loader-spinner",this.loadingSpinner}renderWidgetButton(){var t;return this.widgetButton=document.createElement("div"),this.widgetButton.id="__ss-widget-button",this.widgetButton.style.cssText=`
            display: none;
            position: fixed;
            bottom: 20px; ${this.options.widget_button_position==="bottom_right"?"right: 20px;":"left: 20px;"}
            padding: 10px 15px;
            background-color: ${this.options.widget_button_color};
            border-color: ${this.options.widget_button_color};
            border-radius: 25px;
            border-style: solid;
            color: ${this.options.widget_button_text_color};
            cursor: pointer;
            z-index: 9999;
            font-size: 16px;
            width: auto;
            text-align: center;
            align-items: center;
        `,this.widgetButtonContent=document.createElement("div"),this.widgetButtonContent.id="__ss-widget-button-content",this.widgetButtonContent.style.cssText=`
            display: inline-block;
            align-items: center;`,this.widgetButtonContent.innerHTML=this.replaceVariables(this.options.widget_button_text),this.widgetButton.append(this.widgetButtonContent),(t=this.features)!=null&&t.is_safelink_popup_close_widget_button_enabled&&this.widgetButton.append(this.renderWidgetCloseButton()),this.widgetButton.addEventListener("click",()=>{this.modalOverlay.style.display="block",this.widgetButton.style.display="none"}),this.widgetButton}renderWidgetCloseButton(){return this.widgetCloseButton=document.createElement("button"),this.widgetCloseButton.style.cssText=`
            background-color: transparent;
            border: none;
            cursor: pointer;
            color: ${this.options.widget_button_text_color};
            margin-left: 8px;
            margin-top: 2px;
            padding: 0px;
            font-size: 20px;
            opacity: 0.6;
        `,this.widgetCloseButton.innerHTML="&times;",this.widgetCloseButton.addEventListener("click",t=>{t.stopPropagation(),this.hideWidgetButton()}),this.widgetCloseButton.addEventListener("mouseenter",()=>{this.widgetCloseButton.style.opacity=1}),this.widgetCloseButton.addEventListener("mouseleave",()=>{this.widgetCloseButton.style.opacity=.6}),this.widgetCloseButton}replaceVariables(t){return t&&t.replace(/{([^}]+)}/g,(e,o)=>this.variables[o]||o)}updateSafeLinkModalSize(){window.outerWidth<768?(this.modalContent&&(this.modalContent.style.cssText+="width: 90%;"),this.modalInner&&(this.modalInner.style.cssText+="padding: 40px 10px;")):(this.modalContent&&(this.modalContent.style.cssText+="width: 40%;"),this.modalInner&&(this.modalInner.style.cssText+="padding: 40px 30px 60px 30px;"))}removeURLParams(){let t=new URLSearchParams(window.location.search);t.delete("snowball"),window.history.replaceState({},document.title,window.location.pathname+(t.size>0?"?":"")+t.toString())}fetchDiscountCode(){return p(this,null,function*(){r.set(this.props.safelinkGeneratedCookie,"true",{secure:!0}),this.showLoadingSpinner();let t=yield this.props.sendData();if(t.error){console.error("Failed to create safelink"),alert("Failed to create safelink"),this.modalCodeBox.remove(),this.modalActionButton.style.display="block";return}this.safelinkCode=t.safelink.code.code,this.props.applyCoupon(this.safelinkCode),this.showSafelinkCode()})}wasModalClosed(){return localStorage.getItem("snowball_safelink_modal_closed")}wasWidgetClosed(){return localStorage.getItem("snowball_widget_button_closed")}};var j="https://api.socialsnowball.io",R="snowball",s={affiliate_referral:"snowball_affiliate_referral",visitor_id:"snowball_visitor_id",cart_token:"snowball_cart_token",last_join:"snowball_last_join",expire_at:"snowball_expire_at",safelink:"snowball_safelink",safelink_generated:"snowball_safelink_generated",referrer:"snowball_referrer",referrer_blocked:"snowball_referrer_blocked"},C=class{constructor(){this.referral=null,this.referral_applied=!1,this.referral_code=this.getReferralCodeFromUrl(R)||this.getCookieAffiliateReferralCode(),this.payload={},this.referrer=this.getReferrer()}getReferrer(){let t=new URLSearchParams(window.location.search).get("snowball_referrer");if(t&&t!=="")return t;if(document.referrer&&document.referrer!="")return document.referrer;let e=this.getCookieReferrer();return e&&e!=""&&e!=null?e:new URLSearchParams(window.location.search).get("referrer")}getReferralCodeFromUrl(t){t=t.replace(/[\[\]]/g,"\\$&");let o=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(window.location.href);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}generateUid(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}getVisitorId(){return r.get(s.visitor_id)}getCartToken(){return r.get(s.cart_token)}getCookieSafelink(){return r.get(s.safelink)}getCookieSafelinkGenerated(){return r.get(s.safelink_generated)}getCookieReferrer(){return r.get(s.referrer)}isReferrerBlocked(){return!!r.get(s.referrer_blocked)}clearCookies(){r.remove(s.affiliate_referral),r.remove(s.visitor_id),r.remove(s.cart_token),r.remove(s.last_join),r.remove(s.expire_at),r.remove(s.safelink),r.remove(s.safelink_generated),r.remove(s.referrer),r.remove(s.referrer_blocked)}getCookieAffiliateReferralCode(){return r.get(s.affiliate_referral)}setSnowballNoteAttribute(){return p(this,null,function*(){let t=this.getReferralCodeFromUrl(R);if(t)try{let o=yield(yield fetch("/cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({attributes:{__snowball:t}})})).json();return console.debug("Snowball attribute set:",o),o}catch(e){console.error("Failed to set snowball attribute:",e)}return null})}extractTokenSaveToCookie(t){try{let e=t.token.split("?")[0];return console.debug("Cart token:",e),r.set(s.cart_token,e,{expires:1,secure:!0}),e}catch(e){console.error("Failed to extract cart token:",e),r.remove(s.cart_token)}return null}fetchCartToken(){return p(this,null,function*(){try{let e=yield(yield fetch("/cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"})).json();return this.extractTokenSaveToCookie(e)}catch(t){console.error("Failed to set cart token:",t),r.remove(s.cart_token)}return null})}trigger(){return p(this,arguments,function*(t="click",e={}){var b,S;if(!this.referral_code||this.referral_code==="")return;if(this.isReferrerBlocked()){console.debug("Referrer blocked");return}let o=this.getCookieAffiliateReferralCode(),n=this.getVisitorId(),d=r.get(s.expire_at),a=yield this.setSnowballNoteAttribute(),c;a?c=this.extractTokenSaveToCookie(a):c=yield this.fetchCartToken(),this.payload={affiliate_referral:this.referral_code,destination_url:window.location.href,event_type:t,visitor_id:c||n||this.generateUid(),shop_url:((b=window.Shopify)==null?void 0:b.shop)||((S=window.SocialSnowball)==null?void 0:S.shop),referrer:this.referrer};let l=f(f({},this.payload),e);if(new Date().getTime()<d&&t==="click"&&o===this.referral_code){if(console.debug("Referral already logged"),console.debug("Safelink already generated: "+this.getCookieSafelinkGenerated()),this.getCookieSafelink()){if(this.getCookieSafelinkGenerated())return;this.renderSafelinkModal(JSON.parse(this.getCookieSafelink()));return}this.applyCoupon();return}let h=yield this.sendData(l);if(t==="click"){let v=h.cookie_duration,u={expires:v,secure:!0};if(h.cookie_domain&&(u.path="/",u.domain=`.${h.domain}`),r.set(s.visitor_id,l.visitor_id,u),r.set(s.affiliate_referral,l.affiliate_referral,u),r.set(s.last_join,new Date().getTime(),u),r.set(s.expire_at,this.addDays(v).getTime(),u),r.set(s.referrer,this.referrer,u),h.safelink){console.debug(h.safelink),r.set(s.safelink,JSON.stringify(h.safelink),u),this.renderSafelinkModal(h.safelink);return}this.referral_applied=!0,h.apply_coupon&&this.applyCoupon(),console.debug("Referral recorded")}return h})}redirectIfExists(){return p(this,null,function*(){let e=new URL(window.location.href).searchParams.get("redirect");!e||!this.referral_applied||(window.location.href=e)})}addDays(t){let e=new Date;return e.setDate(e.getDate()+t),e}sendData(t){return fetch(`${j}/referral`,{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify(t)}).then(e=>e.json()).then(e=>{var n;if(e.error){console.debug(e.message),console.log("Failed to referral data"),e.code==="blocked_referrer"&&r.set(s.referrer_blocked,"true",{expires:1,secure:!0});return}return(((n=e.safelink)==null?void 0:n.customjs)||[]).forEach(d=>{try{new Function(d)()}catch(a){console.error("Error executing command:",a)}}),e}).catch(e=>console.error(e))}applyCoupon(){console.debug(`Applying coupon '${this.referral_code}' to cart`);let t=document.createElement("iframe");t.style.cssText="height: 0; width: 0; display: none;",t.src=new URL(encodeURI(`discount/${this.referral_code}`),document.location.origin).href,t.innerHTML="Your browser does not support iframes",document.querySelector("body").prepend(t),console.debug("Coupon applied")}updateSafeLinkModalSize(t,e){t=t||document.getElementById("__ss-modal-content"),e=e||document.getElementById("__ss-modal-inner"),window.innerWidth<768?(t.style.cssText+="width: 90%;",e.style.cssText+="padding: 40px 10px;"):(t.style.cssText+="width: 40%;",e.style.cssText+="padding: 40px 30px 60px 30px;")}renderSafelinkModal(t){let e=()=>this.sendData(y(f({},this.payload),{create_safelink:!0})),o=d=>{this.referral_code=d,this.applyCoupon()};new w(y(f({},t),{sendData:e,applyCoupon:o,safelinkGeneratedCookie:s.safelink_generated})).init()}},A=C;(function(){return p(this,null,function*(){if(window.snowballTrackScript!==void 0)return;window.snowballVersion="1.0.0",window.snowballTrackScript=!0;let t=new A;yield t.trigger(),yield t.redirectIfExists()})})();})();
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
