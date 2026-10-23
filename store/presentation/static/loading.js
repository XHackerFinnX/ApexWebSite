/* Shared feedback for data requests, uploads and page navigation. */
(() => {
    const pending = new Set();
    const indicator = document.createElement("div");
    indicator.id = "request-loading";
    indicator.className = "request-loading";
    indicator.hidden = true;
    indicator.setAttribute("role", "status");
    indicator.setAttribute("aria-live", "polite");
    indicator.setAttribute("aria-atomic", "true");
    indicator.setAttribute("popover", "manual");
    indicator.innerHTML = '<span class="request-loading__spinner" aria-hidden="true"></span><span>Загрузка…</span>';
    document.body.append(indicator);
    function draw() {
        const busy = pending.size > 0;
        indicator.hidden = !busy;
        // The top layer also keeps feedback visible above native admin dialogs.
        if (busy && indicator.showPopover && !indicator.matches(":popover-open"))
            indicator.showPopover();
        else if (!busy && indicator.hidePopover && indicator.matches(":popover-open"))
            indicator.hidePopover();
    }
    function start() {
        const token = {};
        pending.add(token);
        draw();
        return () => {
            pending.delete(token);
            draw();
        };
    }
    async function run(action) {
        const finish = start();
        try {
            return await action();
        } finally {
            finish();
        }
    }
    window.apexLoading = { start, run };
    let finishNavigation;
    document.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
            event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest("a[href]");
        if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin ||
            (url.pathname === location.pathname && url.search === location.search)) return;
        finishNavigation?.();
        finishNavigation = start();
    });
    window.addEventListener("pageshow", () => {
        finishNavigation?.();
        finishNavigation = null;
    });
})();
