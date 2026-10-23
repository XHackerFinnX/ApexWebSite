(() => {
    const root = document.getElementById("apex-client-service");
    const tabs = [...root.querySelectorAll("[data-service-tab]")];
    const panels = [...root.querySelectorAll("[data-service-panel]")];
    const keyFor = (value) =>
        ["cookie", "cookies"].includes(value) ? "policy" : value;
    function activate(value, updateHistory = false, focus = false) {
        let key = keyFor(value);
        if (!tabs.some((tab) => tab.dataset.serviceTab === key))
            key = "delivery";
        tabs.forEach((tab) => {
            const selected = tab.dataset.serviceTab === key;
            tab.classList.toggle("is-active", selected);
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
            if (selected && focus) tab.focus();
        });
        panels.forEach(
            (panel) => (panel.hidden = panel.dataset.servicePanel !== key),
        );
        if (["cookie", "cookies"].includes(value)) {
            const cookies = root.querySelector("#apex-service-cookies");
            cookies.open = true;
            if (focus) cookies.querySelector("summary").focus();
        }
        if (updateHistory) history.pushState(null, "", "#" + value);
    }
    function restore() {
        let hash;
        try {
            hash = decodeURIComponent(location.hash.slice(1));
        } catch {
            hash = "";
        }
        activate(
            hash ||
                new URLSearchParams(location.search).get("section") ||
                "delivery",
        );
    }
    tabs.forEach((tab, index) => {
        tab.onclick = () => activate(tab.dataset.serviceTab, true);
        tab.onkeydown = (event) => {
            let next;
            if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
            if (event.key === "ArrowLeft")
                next = (index + tabs.length - 1) % tabs.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = tabs.length - 1;
            if (next === undefined) return;
            event.preventDefault();
            activate(tabs[next].dataset.serviceTab, true, true);
        };
    });
    root.addEventListener("click", (event) => {
        const link = event.target.closest("[data-service-open]");
        if (!link) return;
        event.preventDefault();
        activate(link.dataset.serviceOpen, true, true);
    });
    window.addEventListener("hashchange", restore);
    window.addEventListener("popstate", restore);
    restore();
    root.classList.add("is-ready");
})();
