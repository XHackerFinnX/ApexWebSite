import json
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Protocol
from uuid import uuid4


@dataclass(frozen=True)
class Event:
    type: str
    aggregate_id: str
    payload: dict
    id: str = field(default_factory=lambda: str(uuid4()))
    occurred_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
    version: int = 1
    correlation_id: str = ""

    def encode(self) -> bytes:
        from dataclasses import asdict

        return json.dumps(
            asdict(self), ensure_ascii=False, separators=(",", ":")
        ).encode()


class EventPublisher(Protocol):
    def publish(self, event: Event) -> None: ...
