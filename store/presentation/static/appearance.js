(() => {
    const root = document.documentElement;
    const key = document.body.dataset.appearance || "apex-theme";
    let theme;
    try {
        theme = localStorage.getItem(key);
    } catch {}
    if (!["light", "dark"].includes(theme))
        theme = matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    function apply(value) {
        root.dataset.theme = value;
        document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
            const dark = value === "dark";
            button.setAttribute("aria-pressed", String(dark));
            button.setAttribute(
                "aria-label",
                dark ? "Включить светлую тему" : "Включить тёмную тему",
            );
            button.innerHTML =
                '<svg class="ui-icon" aria-hidden="true"><use href="/icons.svg#' +
                (dark ? "sun" : "moon") +
                '"/></svg><span>' +
                (dark ? "Светлая тема" : "Тёмная тема") +
                "</span>";
        });
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = value === "dark" ? "#11151e" : "#f5f6f8";
    }
    apply(theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) =>
        button.addEventListener("click", () => {
            theme = root.dataset.theme === "dark" ? "light" : "dark";
            try {
                localStorage.setItem(key, theme);
            } catch {}
            apply(theme);
        }),
    );
})();
