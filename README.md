# Apex Store

Готовый к развитию каркас интернет-магазина с чистой архитектурой. Доменная
логика не зависит от HTTP, базы данных и конкретных платёжных/логистических
провайдеров. Приложение использует PostgreSQL; адрес, имя базы, пользователь,
пароль и TLS-параметры задаются через типизированный `pydantic-settings` конфиг.

## Быстрый старт

```bash
docker compose up -d postgres
python -m pip install -r requirements.txt
cp .env.example .env
# заполните .env своими параметрами
python -m store
# http://127.0.0.1:8000 — витрина
# http://127.0.0.1:8000/admin — панель управления
```

При первом подключении автоматически выполняется идемпотентная миграция и
создаются таблицы каталога, размеров, интеграций, заказов, доставки и аудита.
Можно использовать выданную провайдером базу `default_db`; локальный Docker
Compose по умолчанию создаёт базу `ApexStore`.

## Архитектура

```text
store/domain          сущности и правила без внешних зависимостей
store/application     сценарии и порты (репозитории, CAPTCHA, интеграции)
store/infrastructure  PostgreSQL, шифрование секретов, адаптеры провайдеров
store/presentation    HTTP/API и статический интерфейс
```

Направление зависимостей: `presentation → application → domain`, а
инфраструктура реализует порты application. Благодаря этому API, БД, очередь и
провайдер заменяются независимо.

## Реализовано в демо

- витрина с категориями/размерами, счётчиками открытий и добавлений;
- CRUD товаров и dashboard администратора;
- конфигуратор ЮKassa, Альфа-Банк, Т-Банк и СДЭК без ключей в исходниках;
- секреты интеграций хранятся зашифрованными и никогда не возвращаются API;
- шаг Yandex SmartCaptcha перед созданием платежа (mock в локальном режиме);
- rate limit и защитные HTTP-заголовки на уровне приложения.

API: `GET /api/products`, `POST /api/products/:id/view`,
`POST /api/products/:id/cart`, `GET|POST /api/admin/integrations`,
`POST /api/checkout/captcha`. Подключение создания платежа выполняется адаптером выбранного банка.

## Production-схема и DDoS

Приложение **не может самостоятельно гарантировать защиту от DDoS**. В
production трафик должен проходить через CDN/WAF (Yandex Cloud Smart Web
Security, Cloudflare или аналог) → L7 load balancer → несколько stateless
экземпляров API. На edge включаются Anycast, bot management, ограничения
размера/частоты запросов и challenge. Внутренний limiter — только второй рубеж.

Для горизонтального масштабирования PostgreSQL запускается в managed/HA режиме,
локальный limiter заменяется Redis, события просмотров/корзины отправляются через Kafka/RabbitMQ,
картинки — в S3/CDN, фоновые задачи — в отдельные workers. API остаётся
stateless; секреты следует вынести в KMS/Vault. Observability: OpenTelemetry,
Prometheus/Grafana, централизованные логи и audit trail.

## Интеграции и безопасность

Задайте уникальный мастер-ключ до ввода production-секретов:

```bash
export STORE_MASTER_KEY="$(python -c 'import secrets; print(secrets.token_hex(32))')"
export YANDEX_CAPTCHA_SERVER_KEY=...
export YANDEX_CAPTCHA_CLIENT_KEY=...
export CAPTCHA_MODE=yandex
export POSTGRESQL_HOST=da9ca7d9f658ca4254e5094d.twc1.net
export POSTGRESQL_PORT=5432
export POSTGRESQL_DATABASE=default_db
export POSTGRESQL_USER=gen_user
export POSTGRESQL_PASSWORD='ваш-пароль'
export POSTGRESQL_SSLMODE=verify-full
export POSTGRESQL_SSLROOTCERT="$HOME/.cloud-certs/root.crt"
```

Те же значения можно записать в локальный `.env`, используя `.env.example` как
шаблон. `pydantic-settings` автоматически читает этот файл, валидирует типы и
скрывает поля `SecretStr`. Файл `.env` исключён из Git. Приложение передаёт
параметры драйверу отдельными полями, поэтому пароль не нужно URL-кодировать.
При `verify-full` путь `POSTGRESQL_SSLROOTCERT` обязателен и проверяется до
подключения. `APP_HOST`/`APP_PORT`, `WEBAPP_URL`, `WEBHOOK_URL` и `WEBHOOK_PATH`
настраиваются тем же способом; production-значения задаются окружением.

В режиме `mock` CAPTCHA принимает токен `demo-pass`. В production backend
должен проверять одноразовый токен на серверном endpoint Yandex SmartCaptcha;
клиентский ключ передаётся UI, серверный — только через secret manager/env.
Платёжный callback необходимо проверять по подписи провайдера и обрабатывать
идемпотентно. Секреты интеграций маскируются; смена master key требует миграции.

## Проверки

```bash
python -m unittest discover -s tests -v
python -m compileall -q store tests
```