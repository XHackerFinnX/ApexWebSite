const form = document.querySelector("#loginForm");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = document.querySelector("#loginError");
    const finishLoading = apexLoading.start();
    button.disabled = true;
    error.textContent = "";
    try {
        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
            signal: AbortSignal.timeout(15000),
        });
        if (response.ok) location.replace("/admin");
        else
            error.textContent =
                (await response.json()).error || "Не удалось войти";
    } catch {
        error.textContent =
            "Не удалось связаться с сервером. Проверьте подключение и попробуйте ещё раз.";
    } finally {
        finishLoading();
        button.disabled = false;
    }
});
