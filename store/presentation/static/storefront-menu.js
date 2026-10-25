(() => {
    const toggle = document.getElementById("menu-toggle"),
        nav = document.getElementById("mobile-nav"),
        menu = document.getElementById("mobile-menu"),
        close = document.getElementById("mobile-menu-close"),
        backdrop = document.getElementById("mobile-menu-backdrop");
    menu.hidden = false;
    backdrop.hidden = false;
    toggle.setAttribute("aria-controls", "mobile-menu");
    const setMobileMenu = (open) => {
        const hadFocus = menu.contains(document.activeElement);
        menu.classList.toggle("is-open", open);
        backdrop.classList.toggle("is-open", open);
        menu.inert = !open;
        menu.setAttribute("aria-hidden", String(!open));
        toggle.setAttribute("aria-expanded", String(open));
        document.querySelector(".header").classList.toggle("menu-open", open);
        document.body.classList.toggle("menu-open", open);
        if (open) close.focus({ preventScroll: true });
        else if (hadFocus) toggle.focus({ preventScroll: true });
    };
    toggle.onclick = () =>
        setMobileMenu(toggle.getAttribute("aria-expanded") !== "true");
    close.onclick = backdrop.onclick = () => setMobileMenu(false);
    menu.onclick = (event) => {
        if (event.target === menu || event.target.closest("a"))
            setMobileMenu(false);
    };
    window
        .matchMedia("(min-width: 1101px)")
        .addEventListener("change", (event) => {
            if (event.matches) setMobileMenu(false);
        });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMobileMenu(false);
            document
                .querySelectorAll("#desktop-nav details[open]")
                .forEach((details) => {
                    if (details.contains(document.activeElement))
                        details.querySelector("summary").focus();
                    details.open = false;
                });
        }
        if (event.key !== "Tab" || !menu.classList.contains("is-open")) return;
        const focusable = [...menu.querySelectorAll("button,a,summary")].filter(
            (node) => node.getClientRects().length,
        );
        const first = focusable[0],
            last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
    document.addEventListener("click", (event) => {
        const current = event.target.closest("#desktop-nav details");
        document
            .querySelectorAll("#desktop-nav details[open]")
            .forEach((details) => {
                if (details !== current) details.open = false;
            });
    });
    window.apexMenu = { setOpen: setMobileMenu };
})();
