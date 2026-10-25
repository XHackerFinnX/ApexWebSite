(() => {
    const section = document.querySelector(".reviews");
    if (!section) return;
    const standalone = document.body.dataset.page === "reviews";
    const grid = document.getElementById("reviews-grid");
    const total = document.getElementById("reviews-total");
    const rating = document.getElementById("reviews-rating");
    const more = document.getElementById("reviews-more");
    const modal = document.getElementById("review-modal");
    const content = document.getElementById("review-modal-content");
    const star =
        '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"/></svg>';
    const escape = (value) =>
        String(value ?? "").replace(
            /[&<>"']/g,
            (c) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                })[c],
        );
    let reviews = [],
        busy = false,
        request = 0,
        focusBeforeModal;
    const requestJson = (url) =>
        apexLoading.run(async () => {
            const response = await fetch(url, {
                signal: AbortSignal.timeout(15000),
            });
            if (!response.ok) throw new Error("Не удалось загрузить отзывы");
            return response.json();
        });
    const word = (count) =>
        count % 100 >= 11 && count % 100 <= 14
            ? "отзывов"
            : count % 10 === 1
              ? "отзыв"
              : count % 10 >= 2 && count % 10 <= 4
                ? "отзыва"
                : "отзывов";
    function drawRating(average, count) {
        rating.hidden = !count || average == null;
        if (rating.hidden) return;
        const value = Number(average);
        const formatted = value.toLocaleString("ru-RU", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        });
        rating.setAttribute(
            "aria-label",
            `Средний рейтинг ${formatted} из 5 по ${count} ${word(count)}`,
        );
        rating.innerHTML = `<span class="rating-stars" aria-hidden="true"><span>${star.repeat(5)}</span><span class="rating-stars__fill" style="width:${Math.max(0, Math.min(100, value * 20))}%">${star.repeat(5)}</span></span><strong aria-hidden="true">${formatted}</strong><span aria-hidden="true">/ 5</span>`;
    }
    async function load(append = false) {
        if (busy) return;
        busy = true;
        grid.setAttribute("aria-busy", "true");
        more.disabled = true;
        more.textContent = "Загружаем…";
        const previousError = section.querySelector(".reviews-error");
        previousError?.remove();
        try {
            const page = await requestJson(
                `/api/reviews?limit=10&offset=${append ? reviews.length : 0}`,
            );
            reviews = append ? reviews.concat(page.items) : page.items;
            grid.innerHTML = reviews.length
                ? reviews
                      .map(
                          (r) =>
                              `<button type="button" class="review" data-review-id="${r.id}"><span class="review__stars" aria-label="${Number(r.rating)} из 5">${star.repeat(Number(r.rating))}</span><strong>${escape(r.title || "Отзыв о покупке")}</strong><span class="review__quote">&ldquo;${escape(r.body)}&rdquo;</span><span class="review__author">— ${escape(r.author)}</span>${r.has_images ? '<span class="review__media-mark">Есть фотографии</span>' : ""}</button>`,
                      )
                      .join("")
                : '<p class="reviews-empty">Здесь появятся впечатления покупателей после первых заказов.</p>';
            total.textContent = `${page.total} ${word(page.total)} покупателей`;
            drawRating(page.average_rating, page.total);
            more.hidden = !standalone || reviews.length >= page.total;
            more.classList.toggle("hidden", more.hidden);
        } catch (_) {
            const error = document.createElement("div");
            error.className = "reviews-error reviews-empty";
            error.setAttribute("role", "status");
            error.innerHTML =
                '<p>Не удалось загрузить отзывы. Проверьте соединение.</p><button type="button" class="reviews__more" data-retry-reviews>Попробовать снова</button>';
            if (!reviews.length) {
                grid.replaceChildren(error);
                total.textContent = "Отзывы временно недоступны";
            } else grid.after(error);
            error.querySelector("button").onclick = () => load(append);
        } finally {
            busy = false;
            grid.removeAttribute("aria-busy");
            more.disabled = false;
            more.textContent = "Показать ещё";
        }
    }
    async function open(id, trigger) {
        const review = reviews.find((item) => String(item.id) === id);
        if (!review) return;
        const sequence = ++request;
        focusBeforeModal = trigger;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        content.innerHTML = `<div class="review__stars" aria-label="${Number(review.rating)} из 5">${star.repeat(Number(review.rating))}</div><h2 id="review-modal-title">${escape(review.title || "Отзыв о покупке")}</h2><p class="review-modal__author">${escape(review.author)}</p><p class="review-modal__body">${escape(review.body)}</p><div class="review-modal__photos">${review.has_images ? "Загружаем фотографии…" : ""}</div>`;
        modal
            .querySelector('[role="dialog"]')
            .setAttribute("aria-labelledby", "review-modal-title");
        modal
            .querySelector(".review-modal__close")
            .focus({ preventScroll: true });
        if (review.has_images) {
            try {
                const images = await requestJson(`/api/reviews/${id}/images`);
                if (sequence !== request) return;
                content.querySelector(".review-modal__photos").innerHTML =
                    images
                        .map(
                            (image) =>
                                `<img src="${escape(image.image_url)}" alt="${escape(image.alt_text || `Фото от ${review.author}`)}" loading="lazy">`,
                        )
                        .join("");
            } catch (_) {
                if (sequence === request)
                    content.querySelector(".review-modal__photos").textContent =
                        "Не удалось загрузить фотографии.";
            }
        }
    }
    function close() {
        if (!modal.classList.contains("is-open")) return;
        ++request;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        focusBeforeModal?.focus({ preventScroll: true });
    }
    document.addEventListener("click", (event) => {
        const review = event.target.closest("[data-review-id]");
        if (review) open(review.dataset.reviewId, review);
        if (event.target.closest("[data-close-review]")) close();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") close();
        if (event.key === "Tab" && modal.classList.contains("is-open")) {
            event.preventDefault();
            modal.querySelector(".review-modal__close").focus();
        }
    });
    more.onclick = () => load(true);
    for (const [id, direction] of [
        ["reviews-prev", -1],
        ["reviews-next", 1],
    ]) {
        const button = document.getElementById(id);
        if (button)
            button.onclick = () =>
                section
                    .querySelector(".reviews__viewport")
                    .scrollBy({ left: direction * 360, behavior: "smooth" });
    }
    if (standalone) load();
    else {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    observer.disconnect();
                    load();
                }
            },
            { rootMargin: "300px" },
        );
        observer.observe(section);
    }
})();
