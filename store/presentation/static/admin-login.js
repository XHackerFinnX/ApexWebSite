const form = document.querySelector("#loginForm");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = document.querySelector("#loginError");
    button.disabled = true;
    error.textContent = "";
    const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (response.ok) location.replace("/admin");
    else {
        error.textContent = (await response.json()).error;
        button.disabled = false;
    }
});
