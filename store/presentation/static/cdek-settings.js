/* Sender locations use CDEK IDs; typed names and postal codes are search terms. */
(() => {
    const form = document.querySelector("#integration");
    let enabled = false, cityRequest = 0, officeRequest = 0, timer;
    let cityItems = [], cityPage = 0, cityQuery = "", officeItems = null, officeLimit = 20;

    function picker(id, field) {
        const root = document.getElementById(id);
        const input = root.querySelector('[role="combobox"]');
        const value = form.elements[field];
        const panel = root.querySelector(".cdek-picker__panel");
        const list = root.querySelector('[role="listbox"]');
        const status = root.querySelector('[role="status"]');
        const more = root.querySelector(".cdek-picker__more");
        const hint = root.querySelector("small");
        const defaultHint = hint.textContent;
        let active = -1;
        const control = {
            root, input, value, panel, list, status, more, hint, defaultHint,
            close() {
                panel.hidden = true;
                input.setAttribute("aria-expanded", "false");
                input.removeAttribute("aria-activedescendant");
            },
            open() {
                if (!enabled || input.disabled) return;
                [city, office].forEach(other => { if (other !== control) other.close(); });
                panel.hidden = false;
                input.setAttribute("aria-expanded", "true");
            },
            draw(items, choose) {
                list.replaceChildren();
                active = -1;
                input.removeAttribute("aria-activedescendant");
                items.forEach((item, index) => {
                    const option = document.createElement("button");
                    option.type = "button";
                    option.tabIndex = -1;
                    option.id = list.id + "-" + index;
                    option.className = "cdek-picker__option";
                    option.setAttribute("role", "option");
                    option.setAttribute("aria-selected", String(String(item.code) === value.value));
                    option.textContent = item.fullName || item.name;
                    if (item.address) {
                        const detail = document.createElement("small");
                        detail.textContent = [item.code, item.address, item.workTime].filter(Boolean).join(" · ");
                        option.append(detail);
                    }
                    option.onpointerdown = event => event.preventDefault();
                    option.onclick = () => choose(item);
                    list.append(option);
                });
            },
        };
        input.addEventListener("keydown", event => {
            const options = [...list.querySelectorAll('[role="option"]')];
            if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); control.close(); }
            if (event.key === "Tab") control.close();
            if (["ArrowDown", "ArrowUp"].includes(event.key)) {
                event.preventDefault();
                if (panel.hidden) { input.dispatchEvent(new Event("focus")); return; }
                if (!options.length) return;
                active = (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
                options.forEach((option, index) => option.classList.toggle("is-active", index === active));
                input.setAttribute("aria-activedescendant", options[active].id);
                options[active].scrollIntoView({ block: "nearest" });
            }
            if (event.key === "Enter" && !panel.hidden) {
                event.preventDefault();
                options[active]?.click();
            }
        });
        return control;
    }
    const city = picker("cdek-city-picker", "sender_city");
    const office = picker("cdek-office-picker", "sender_office");

    function request(kind, data) {
        return apiJson("/api/admin/integrations/cdek/" + kind, {
            method: "POST", timeoutMs: 30000,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                environment: form.elements.environment.value,
                client_id: form.elements.login.value.trim(),
                client_secret: form.elements.secret.value.trim(),
                use_saved: form.elements.editing.value === "cdek",
                ...data,
            }),
        });
    }
    function clearOffice() {
        ++officeRequest;
        officeItems = null;
        officeLimit = 20;
        office.value.value = office.input.value = "";
        office.input.disabled = !enabled || !city.value.value;
        office.input.placeholder = city.value.value ? "Название, адрес или код офиса" : "Сначала выберите город";
        office.input.setCustomValidity("Выберите офис СДЭК из списка");
        office.close();
        office.list.replaceChildren();
        office.list.removeAttribute("aria-busy");
        office.hint.textContent = office.defaultHint;
    }
    function chooseCity(item) {
        city.value.value = String(item.code);
        city.input.value = item.fullName || item.name;
        city.input.setCustomValidity("");
        city.hint.textContent = city.defaultHint;
        city.close();
        clearOffice();
        office.input.focus();
    }
    function chooseOffice(item) {
        office.value.value = item.code;
        office.input.value = [item.code, item.address || item.name].join(" · ");
        office.input.setCustomValidity("");
        office.close();
    }
    async function loadCities(query = "", append = false) {
        const sequence = ++cityRequest;
        const page = append ? cityPage + 1 : 0;
        cityQuery = query;
        city.open();
        city.list.setAttribute("aria-busy", "true");
        city.status.textContent = "Загружаем города СДЭК…";
        city.more.hidden = true;
        if (!append) city.draw([], chooseCity);
        try {
            const result = await request("cities", { q: query, page });
            if (sequence !== cityRequest || !enabled) return;
            cityItems = append ? [...new Map([...cityItems, ...result.items].map(item => [item.code, item])).values()] : result.items;
            cityPage = page;
            city.draw(cityItems, chooseCity);
            city.status.textContent = cityItems.length ? "Выберите город. Для поиска введите название или индекс." : "Город не найден. Попробуйте другое название или почтовый индекс.";
            city.more.textContent = "Показать ещё";
            city.more.hidden = !result.has_more;
            city.more.onclick = () => loadCities(cityQuery, true);
        } catch (error) {
            if (sequence !== cityRequest || !enabled) return;
            city.status.textContent = error.message;
            city.more.textContent = "Повторить";
            city.more.hidden = false;
            city.more.onclick = () => loadCities(query, append);
        } finally {
            if (sequence === cityRequest) city.list.removeAttribute("aria-busy");
        }
    }
    function renderOffices() {
        const query = office.value.value ? "" : office.input.value.trim().toLocaleLowerCase("ru");
        const matches = (officeItems || []).filter(item => [item.code, item.name, item.address].join(" ").toLocaleLowerCase("ru").includes(query));
        office.draw(matches.slice(0, officeLimit), chooseOffice);
        office.status.textContent = matches.length ? `Найдено офисов: ${matches.length}` : "Подходящих офисов с приёмом отправлений нет.";
        office.more.textContent = "Показать ещё";
        office.more.hidden = matches.length <= officeLimit;
        office.more.onclick = () => { officeLimit += 20; renderOffices(); };
    }
    async function loadOffices() {
        if (!city.value.value) return;
        office.open();
        if (officeItems !== null) { renderOffices(); return; }
        if (office.list.getAttribute("aria-busy") === "true") return;
        const sequence = ++officeRequest;
        office.list.setAttribute("aria-busy", "true");
        office.status.textContent = "Загружаем офисы СДЭК…";
        office.more.hidden = true;
        try {
            const result = await request("offices", { city_code: city.value.value });
            if (sequence !== officeRequest || !enabled) return;
            officeItems = result;
            renderOffices();
        } catch (error) {
            if (sequence !== officeRequest || !enabled) return;
            office.status.textContent = error.message;
            office.more.textContent = "Повторить";
            office.more.hidden = false;
            office.more.onclick = loadOffices;
        } finally {
            if (sequence === officeRequest) office.list.removeAttribute("aria-busy");
        }
    }
    function reset() {
        ++cityRequest;
        clearTimeout(timer);
        cityItems = [];
        city.input.value = city.value.value = "";
        city.input.setCustomValidity("Выберите город отправителя из списка СДЭК");
        city.hint.textContent = city.defaultHint;
        city.close();
        city.list.replaceChildren();
        clearOffice();
    }
    async function hydrate(config) {
        reset();
        const sequence = ++cityRequest;
        if (!config.sender_city) return;
        city.hint.textContent = "Проверяем сохранённый город…";
        try {
            const result = await request("cities", { city_code: config.sender_city });
            if (sequence !== cityRequest || !enabled) return;
            const item = result.items[0];
            if (!item) {
                city.input.value = config.sender_city;
                city.hint.textContent = "Выберите город заново: сохранённое значение не найдено в справочнике СДЭК.";
                return;
            }
            city.value.value = String(item.code);
            city.input.value = item.fullName || item.name;
            city.input.setCustomValidity("");
            city.hint.textContent = city.defaultHint;
            office.input.disabled = false;
            office.input.placeholder = "Название, адрес или код офиса";
            const offices = await request("offices", { city_code: item.code });
            if (sequence !== cityRequest || !enabled) return;
            officeItems = offices;
            const selected = offices.find(item => item.code === config.sender_office);
            if (selected && !office.input.value) chooseOffice(selected);
        } catch (error) {
            if (sequence === cityRequest && enabled) city.hint.textContent = error.message;
        }
    }
    city.input.onfocus = () => loadCities(city.value.value ? "" : city.input.value.trim());
    city.input.oninput = () => {
        ++cityRequest;
        clearTimeout(timer);
        city.value.value = "";
        city.input.setCustomValidity("Выберите город отправителя из списка СДЭК");
        clearOffice();
        city.draw([], chooseCity);
        city.status.textContent = "Ищем город…";
        city.open();
        city.more.hidden = true;
        timer = setTimeout(() => loadCities(city.input.value.trim()), 300);
    };
    office.input.onfocus = loadOffices;
    office.input.oninput = () => {
        office.value.value = "";
        office.input.setCustomValidity("Выберите офис СДЭК из списка");
        officeLimit = 20;
        loadOffices();
    };
    [form.elements.login, form.elements.secret, form.elements.environment].forEach(input => {
        input.addEventListener("input", reset);
        input.addEventListener("change", reset);
    });
    document.addEventListener("pointerdown", event => {
        [city, office].forEach(control => { if (!control.root.contains(event.target)) control.close(); });
    });
    window.cdekSettings = {
        reset, hydrate,
        setEnabled(value) {
            enabled = value;
            city.input.required = office.input.required = value;
            city.input.disabled = !value;
            office.input.disabled = !value || !city.value.value;
            if (!value) { ++cityRequest; ++officeRequest; clearTimeout(timer); city.close(); office.close(); }
        },
    };
    reset();
})();
