"""Test payments must not produce production shipments or real loyalty benefits."""


def is_demo_terminal(terminal):
    value = str(terminal or "").strip().upper()
    return value.startswith("DEMO") or value.endswith("DEMO")


def bank_is_test(config):
    return config.get("environment", "test") != "production" or is_demo_terminal(
        config.get("terminal_key")
    )


def order_is_test(order):
    settings = order.get("payment_settings") or {}
    flag = settings.get("is_test")
    if flag is not None:
        return flag is True or str(flag).lower() == "true"
    return settings.get("environment") in {"test", "demo"} or is_demo_terminal(
        order.get("payment_terminal_key")
    )
