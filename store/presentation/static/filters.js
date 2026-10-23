/* Custom, keyboard-accessible listboxes backed by the existing catalog selects. */
(() => {
    const controls = [];
    function closeAll(except) {
        controls.forEach((control) => {
            if (control !== except) control.close();
        });
    }
    document
        .querySelectorAll(".catalog-toolbar__controls select")
        .forEach((select) => {
            const parent = select.closest("label");
            const label = parent.firstChild.textContent.trim();
            const wrapper = document.createElement("div");
            wrapper.className = "custom-select";
            const trigger = document.createElement("button");
            trigger.type = "button";
            trigger.className = "custom-select__trigger";
            trigger.setAttribute("role", "combobox");
            trigger.setAttribute("aria-haspopup", "listbox");
            trigger.setAttribute("aria-expanded", "false");
            trigger.setAttribute("aria-controls", select.id + "-listbox");
            const menu = document.createElement("div");
            menu.id = select.id + "-listbox";
            menu.className = "custom-select__menu";
            menu.hidden = true;
            menu.setAttribute("role", "listbox");
            menu.setAttribute("aria-label", label);
            select.hidden = true;
            select.tabIndex = -1;
            select.setAttribute("aria-hidden", "true");
            select.after(wrapper);
            wrapper.append(trigger, menu);
            const control = {
                close() {
                    menu.hidden = true;
                    trigger.setAttribute("aria-expanded", "false");
                },
                draw() {
                    const chosen = select.selectedOptions[0];
                    const text = document.createElement("span");
                    text.textContent = chosen?.textContent || label;
                    trigger.replaceChildren(text);
                    trigger.insertAdjacentHTML(
                        "beforeend",
                        '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
                    );
                    trigger.setAttribute(
                        "aria-label",
                        label + ": " + (chosen?.textContent || ""),
                    );
                    menu.replaceChildren();
                    [...select.options].forEach((option, index) => {
                        const button = document.createElement("button");
                        button.type = "button";
                        button.className = "custom-select__option";
                        button.tabIndex = -1;
                        button.id = select.id + "-option-" + index;
                        button.setAttribute("role", "option");
                        button.setAttribute(
                            "aria-selected",
                            String(option.value === select.value),
                        );
                        button.disabled = option.disabled;
                        button.textContent = option.textContent;
                        button.insertAdjacentHTML(
                            "beforeend",
                            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
                        );
                        button.onclick = () => {
                            select.value = option.value;
                            control.draw();
                            control.close();
                            trigger.focus();
                            select.dispatchEvent(
                                new Event("change", { bubbles: true }),
                            );
                        };
                        menu.append(button);
                    });
                },
                open(last = false) {
                    closeAll(control);
                    control.draw();
                    menu.hidden = false;
                    trigger.setAttribute("aria-expanded", "true");
                    const options = [
                        ...menu.querySelectorAll("button:not(:disabled)"),
                    ];
                    const target = last
                        ? options.at(-1)
                        : menu.querySelector('[aria-selected="true"]') ||
                          options[0];
                    target?.focus({ preventScroll: true });
                    target?.scrollIntoView({ block: "nearest" });
                },
            };
            trigger.onclick = () => {
                if (menu.hidden) control.open();
                else control.close();
            };
            trigger.onkeydown = (event) => {
                if (["ArrowDown", "ArrowUp"].includes(event.key)) {
                    event.preventDefault();
                    control.open(event.key === "ArrowUp");
                }
                if (event.key === "Escape") {
                    event.preventDefault();
                    control.close();
                }
            };
            menu.onkeydown = (event) => {
                if (event.key === "Escape") {
                    event.preventDefault();
                    event.stopPropagation();
                    control.close();
                    trigger.focus();
                    return;
                }
                if (event.key === "Tab") {
                    control.close();
                    return;
                }
                const options = [
                    ...menu.querySelectorAll("button:not(:disabled)"),
                ];
                let index = options.indexOf(document.activeElement);
                if (
                    ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
                ) {
                    event.preventDefault();
                    if (event.key === "Home") index = 0;
                    else if (event.key === "End") index = options.length - 1;
                    else
                        index =
                            (index +
                                (event.key === "ArrowDown" ? 1 : -1) +
                                options.length) %
                            options.length;
                    options[index]?.focus();
                    return;
                }
                if (event.key.length === 1 && event.key !== " ") {
                    const option = options.find((button) =>
                        button.textContent
                            .toLocaleLowerCase("ru")
                            .startsWith(event.key.toLocaleLowerCase("ru")),
                    );
                    if (option) {
                        event.preventDefault();
                        option.focus();
                    }
                }
            };
            select.addEventListener("change", () => control.draw());
            controls.push(control);
            control.draw();
        });
    window.refreshCatalogFilters = () =>
        controls.forEach((control) => control.draw());
    document.addEventListener("pointerdown", (event) => {
        if (!event.target.closest(".custom-select")) closeAll();
    });
})();
