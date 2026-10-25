(() => {
    function sync() {
        const dark = document.documentElement.classList.contains("dark");
        document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
            button.setAttribute("aria-checked", String(dark));
            button.title = dark
                ? "Включить светлую тему"
                : "Включить тёмную тему";
            const label = button.querySelector("[data-theme-label]");
            if (label)
                label.textContent = dark ? "Светлая тема" : "Тёмная тема";
        });
    }
    function apply(dark, save = true) {
        document.documentElement.classList.toggle("dark", dark);
        if (save) {
            try {
                localStorage.setItem("apex-theme", dark ? "dark" : "light");
            } catch {}
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = dark ? "#161719" : "#ffffff";
        sync();
    }
    window.apexTheme = { apply, sync };
    let dark = false;
    try {
        dark = localStorage.getItem("apex-theme") === "dark";
    } catch {}
    apply(dark, false);
    document.addEventListener("click", (event) => {
        if (event.target.closest("[data-theme-toggle]"))
            apply(!document.documentElement.classList.contains("dark"));
    });
})();
