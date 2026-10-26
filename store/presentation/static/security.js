/* Shared accessible, single-use APEX challenge. All verification happens server-side. */
(() => {
    let dialog,
        active,
        resolve,
        reject,
        challenge,
        generation = 0,
        loadController;
    const request = (url, data, signal) =>
        apexLoading.run(async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                signal: signal
                    ? AbortSignal.any([signal, AbortSignal.timeout(15000)])
                    : AbortSignal.timeout(15000),
            });
            const result = await response.json();
            if (!response.ok) {
                const error = new Error(
                    result.error || "Проверка временно недоступна",
                );
                error.status = response.status;
                throw error;
            }
            return result;
        });
    function initialize() {
        if (dialog) return;
        dialog = document.createElement("dialog");
        dialog.className = "security-dialog";
        dialog.setAttribute("aria-labelledby", "security-title");
        dialog.innerHTML = `<button class="security-close" type="button" aria-label="Закрыть проверку">×</button><p class="security-eyebrow">APEX / БЕЗОПАСНОСТЬ</p><h2 id="security-title">Небольшая проверка</h2><p id="security-description">Введи символы с картинки, чтобы продолжить.</p><form><div class="security-picture"><img width="320" height="112" alt="Картинка проверки безопасности"><span role="status">Загружаем проверку…</span></div><button class="security-refresh" type="button">↻ Другая картинка</button><label for="security-answer">Символы с картинки</label><input id="security-answer" name="answer" required maxlength="5" minlength="5" pattern="[A-Za-z0-9]{5}" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="security-error"><p id="security-error" role="alert"></p><button class="security-submit" type="submit">Подтвердить →</button><small>Проверка действует только для этого действия.</small></form>`;
        document.body.append(dialog);
        dialog.querySelector(".security-close").onclick = () => dialog.close();
        dialog.addEventListener("close", () => {
            generation++;
            loadController?.abort();
            if (reject)
                reject(new DOMException("Проверка отменена", "AbortError"));
            active = resolve = reject = challenge = null;
        });
        dialog.querySelector(".security-refresh").onclick = refresh;
        dialog.querySelector("form").onsubmit = async (event) => {
            event.preventDefault();
            const button = dialog.querySelector(".security-submit");
            if (!challenge) return;
            const current = generation;
            button.disabled = true;
            dialog.querySelector("#security-error").textContent = "";
            try {
                const result = await request("/api/security/captcha/verify", {
                    id: challenge.id,
                    answer: dialog.querySelector("input").value,
                });
                if (current !== generation || !dialog.open) return;
                const complete = resolve;
                resolve = reject = null;
                complete(result.proof);
                dialog.close();
            } catch (error) {
                if (current === generation && dialog.open) {
                    dialog.querySelector("#security-error").textContent =
                        error.message;
                    dialog.querySelector("input").select();
                }
            } finally {
                if (current === generation) button.disabled = false;
            }
        };
    }
    async function refresh() {
        const current = ++generation;
        loadController?.abort();
        loadController = new AbortController();
        const refreshButton = dialog.querySelector(".security-refresh");
        refreshButton.disabled = true;
        challenge = null;
        const picture = dialog.querySelector(".security-picture"),
            image = picture.querySelector("img"),
            status = picture.querySelector("span"),
            button = dialog.querySelector(".security-submit");
        button.disabled = true;
        image.hidden = true;
        status.hidden = false;
        status.textContent = "Загружаем проверку…";
        dialog.querySelector("#security-error").textContent = "";
        dialog.querySelector("input").value = "";
        try {
            const result = await request(
                "/api/security/captcha",
                active,
                loadController.signal,
            );
            if (current !== generation || !dialog.open) return;
            challenge = result;
            image.src = result.image;
            image.hidden = false;
            status.hidden = true;
            button.disabled = false;
            dialog.querySelector("input").focus({ preventScroll: true });
        } catch (error) {
            if (current === generation) status.textContent = error.message;
        } finally {
            if (current === generation) refreshButton.disabled = false;
        }
    }
    window.apexSecurity = {
        challenge(purpose, context) {
            initialize();
            if (dialog.open)
                return Promise.reject(new Error("Проверка уже открыта"));
            active = { purpose, context };
            const promise = new Promise((yes, no) => {
                resolve = yes;
                reject = no;
            });
            dialog.showModal();
            refresh();
            return promise;
        },
    };
})();
