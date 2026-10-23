(() => {
    if (
        !("IntersectionObserver" in window) ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
    )
        return;
    const selector =
        ".reveal, .card, .stats > article, .order-card, .member-order";
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.06 },
    );
    function observe(root) {
        const nodes = [...root.querySelectorAll(selector)];
        if (root.matches?.(selector)) nodes.unshift(root);
        nodes.forEach((node, index) => {
            if (node.classList.contains("reveal-ready")) return;
            node.classList.add("reveal-ready");
            node.style.setProperty("--enter-delay", (index % 3) * 45 + "ms");
            observer.observe(node);
        });
    }
    observe(document);
    new MutationObserver((records) =>
        records.forEach((record) =>
            record.addedNodes.forEach((node) => {
                if (node.nodeType === 1) observe(node);
            }),
        ),
    ).observe(document.querySelector("main") || document.body, {
        childList: true,
        subtree: true,
    });
})();
