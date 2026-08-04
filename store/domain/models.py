from dataclasses import dataclass, field
from decimal import Decimal


@dataclass(slots=True)
class Product:
    id: int | None
    name: str
    description: str
    price: Decimal
    category: str
    sizes: tuple[str, ...] = field(default_factory=tuple)
    image_url: str = ""
    stock: int = 0
    views: int = 0
    cart_adds: int = 0

    def validate(self) -> None:
        if not self.name.strip():
            raise ValueError("Название товара обязательно")
        if self.price < 0 or self.stock < 0:
            raise ValueError("Цена и остаток не могут быть отрицательными")


@dataclass(slots=True)
class Integration:
    provider: str
    kind: str
    enabled: bool
    public_config: dict[str, str]
    secret_config: dict[str, str]
