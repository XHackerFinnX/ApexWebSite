"""Opt-in adapter only; there is no connection, worker or publisher at app startup."""

from .events import Event


class RabbitMQPublisher:
    def __init__(self, url: str, *, enabled: bool = False):
        if not enabled:
            raise RuntimeError(
                "RabbitMQ integration is disabled; activate only in a separate rollout"
            )
        import pika  # Optional requirements-rmq.txt, never required for the storefront.

        self.pika = pika
        parameters = pika.URLParameters(url)
        parameters.heartbeat = 30
        parameters.blocked_connection_timeout = 10
        parameters.socket_timeout = 5
        self.connection = pika.BlockingConnection(parameters)
        self.channel = self.connection.channel()
        self.channel.exchange_declare(
            exchange="apex.events", exchange_type="topic", durable=True
        )
        self.channel.confirm_delivery()

    def publish(self, event: Event):
        accepted = self.channel.basic_publish(
            exchange="apex.events",
            routing_key=event.type,
            body=event.encode(),
            mandatory=True,
            properties=self.pika.BasicProperties(
                content_type="application/json",
                delivery_mode=2,
                message_id=event.id,
                correlation_id=event.correlation_id or event.id,
                headers={"schema_version": event.version},
            ),
        )
        if accepted is False:
            raise RuntimeError("Broker did not confirm the event")

    def close(self):
        self.connection.close()
