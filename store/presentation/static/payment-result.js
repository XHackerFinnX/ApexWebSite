const params = new URLSearchParams(location.search);
const orderId = params.get("order_id");
const status = document.getElementById("order-status");
if (orderId) {
    document.getElementById("order-number").textContent = `Заказ: ${orderId}`;
    fetch(`/api/checkout/order?order_id=${encodeURIComponent(orderId)}`)
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((order) => {
            status.textContent = `Статус платежа: ${order.status}`;
        })
        .catch(() => {
            status.textContent =
                "Статус уточняется. Мы сообщим результат по электронной почте.";
        });
}
