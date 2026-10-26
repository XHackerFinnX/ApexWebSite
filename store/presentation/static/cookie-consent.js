(() => {
    const name = "apex_cookie_consent",
        version = "v1";
    const accepted = () =>
        document.cookie
            .split(";")
            .some((value) => value.trim() === `${name}=${version}`);
    let banner;
    function show() {
        if (banner?.isConnected) return;
        banner = document.createElement("aside");
        banner.className = "cookie-consent";
        banner.setAttribute("aria-label", "Согласие на использование cookie");
        banner.innerHTML =
            '<div class="cookie-consent__mark" aria-hidden="true">A/</div><div><p class="cookie-consent__eyebrow">КОМФОРТ НА КАЖДОМ КРУГЕ</p><h2>Немного cookie для твоих покупок</h2><p>Мы используем cookie, чтобы сохранять вход в аккаунт и защищать покупки. Подробнее — в <a href="/cookie">политике использования cookie</a>. Продолжая с кнопкой «Согласиться», ты принимаешь её условия.</p></div><button type="button">Согласиться <span aria-hidden="true">→</span></button>';
        banner.querySelector("button").onclick = () => {
            document.cookie = `${name}=${version}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
            banner.remove();
        };
        document.body.append(banner);
    }
    if (!accepted()) show();
    window.apexCookieConsent = { show };
})();
