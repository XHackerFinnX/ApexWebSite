# Apex Store

Основной адрес магазина: **https://apextop.ru**. Настройки запуска, домена и
фотографий приведены ниже. RabbitMQ пока не используется.

Готовый к развитию каркас интернет-магазина с чистой архитектурой. Доменная
логика не зависит от HTTP, базы данных и конкретных платёжных/логистических
провайдеров. Приложение использует PostgreSQL; адрес, имя базы, пользователь,
пароль и TLS-параметры задаются через типизированный `pydantic-settings` конфиг.

## Быстрый старт

```bash
docker compose up -d postgres
python -m pip install -r requirements.txt
# создайте .env в корне проекта и заполните параметры подключения и администратора
python -m store
# http://127.0.0.1:8000 — витрина
# http://127.0.0.1:8000/admin — панель управления
```

Пароль администратора обязателен в окружении или `.env`; общего пароля по
умолчанию нет. Перед публикацией задайте собственные реквизиты:

```bash
ADMIN_USERNAME=your-login
ADMIN_PASSWORD=your-strong-password
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

### Т-Банк

В панели администратора добавьте «Т-Банк», укажите `TerminalKey`, пароль
терминала и среду. Backend создаёт платёж через `Init`, подписывает запросы
SHA-256 токеном и направляет покупателя на защищённую платёжную форму банка.
Цена и наличие повторно определяются на сервере. Для production задайте:

```bash
WEBAPP_URL=https://apextop.ru
```

В кабинете Т-Банка разрешите уведомления на
`https://apextop.ru/api/payments/tbank/notification`. Backend проверяет
подпись и отвечает `OK`; итоговый статус определяется уведомлением, а не
возвратом браузера. Страницы возврата: `/payment/success` и `/payment/fail`.

В чек передаются УСН «доходы» (`usn_income`), ставка без НДС (`none`) и русский
язык. Позиции имеют признаки `full_payment` / `commodity`, необходимые API
`Init`. Для электронного чека покупатель должен указать корректный email.

Если Python сообщает `CERTIFICATE_VERIFY_FAILED: self signed certificate in
certificate chain`, скачайте с официальной страницы Т-Банка сертификат
`russian_trusted_root_ca.cer` и укажите путь к нему:

```bash
# Windows (.env):
TBANK_CA_CERT=C:\certs\russian_trusted_root_ca.cer

# Ubuntu/Docker:
TBANK_CA_CERT=/etc/apex/certs/russian_trusted_root_ca.cer
```

Один и тот же X.509-файл подходит Windows и Linux: приложение умеет читать как
DER (`.cer`), так и PEM. Файл должен находиться на каждой машине или внутри
контейнера по заданному там пути. `russian_trusted_root_ca_gost_2025.cer` нужен
только клиентам с поддержкой российских криптоалгоритмов и не заменяет обычный
RSA-корневой сертификат для стандартной сборки Python/OpenSSL. Не отключайте
проверку TLS и не добавляйте банковский сертификат в файлы, доступные браузеру.

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

Те же значения можно записать в `.env` в корне проекта.
`pydantic-settings` автоматически читает этот файл, валидирует типы и
скрывает поля `SecretStr`. Файл `.env` исключён из Git. Приложение передаёт
параметры драйверу отдельными полями, поэтому пароль не нужно URL-кодировать.
При `verify-full` задайте существующий путь `POSTGRESQL_SSLROOTCERT` или содержимое
публичного CA-сертификата в `POSTGRESQL_SSLROOTCERT_PEM` (PEM, переносы строк можно
записать как `\n`). В Docker путь должен существовать внутри контейнера.
`APP_HOST`/`APP_PORT` и `WEBAPP_URL` настраиваются тем же способом; переменные
окружения имеют приоритет над `.env`.

## Production: Docker, .env и домен apextop.ru

Имя рабочего файла — **`.env`**, в том числе для production. Имена
`.env.product.example` и `.env.production.example` приложению не нужны.
При `python -m store` файл читается из текущего рабочего каталога. Сам `.env`
исключён из Git и Docker-образа; после обновления исходников его заполнять заново
не требуется.

В существующем production `.env` укажите:

```dotenv
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=8000
WEBAPP_URL=https://apextop.ru
TRUST_PROXY_HEADERS=true
STORE_MEDIA_BACKEND=s3
S3_ENDPOINT_URL=https://s3.twcstorage.ru
S3_REGION=ru-1
S3_BUCKET=YOUR_BUCKET_NAME
S3_PREFIX=apex/media
S3_ACCESS_KEY_ID=YOUR_ACCESS_KEY
S3_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
```

Значения S3 возьмите из панели своего хранилища; для другого провайдера endpoint
и регион могут отличаться. В этом же `.env` сохраните параметры внешней
PostgreSQL, администратора, CAPTCHA и **существующий** `STORE_MASTER_KEY`.
Не меняйте мастер-ключ при обновлении: он нужен для расшифровки интеграций в БД.
Для production нужны мастер-ключ от 32 символов и пароль администратора от 12.
`TRUST_PROXY_HEADERS=true` используйте за прокси Timeweb/Caddy/Nginx, который
формирует `X-Forwarded-For`; закрывайте прямой доступ к порту приложения.

При `APP_ENV=production` значения по умолчанию — `WEBAPP_URL=https://apextop.ru`
и `STORE_MEDIA_BACKEND=s3`. Без реквизитов S3 приложение сообщит об ошибке при
запуске. Явно заданные значения в окружении или `.env` переопределяют эти
значения, поэтому удалите старый `WEBAPP_URL`, если он ещё задан в Timeweb.

На своём сервере передавайте файл контейнеру при запуске, например за HTTPS-прокси:

```bash
docker run -d --name apex-store --restart unless-stopped \
  --env-file .env -p 127.0.0.1:8000:8000 YOUR_DOCKERHUB_LOGIN/apex-store:COMMIT_TAG
```

В **Timeweb App Platform** внесите значения из `.env` в раздел переменных
окружения приложения и выполните повторный деплой. Локальный `.env` сам не
передаётся через Docker Hub. Docker-образ приложения публикуется workflow
`Publish Docker image` из раздела GitHub Actions; для запуска нужны переменная репозитория
`DOCKERHUB_USERNAME` и секрет `DOCKERHUB_TOKEN`. Выбирайте тег конкретного коммита.

Подключение домена:

1. Добавьте `apextop.ru` в домены приложения Timeweb. У регистратора выставьте
   DNS-записи, которые покажет Timeweb, дождитесь их применения и выпуска HTTPS.
   Если используете VPS, запись `A` для `@` направьте на публичный IPv4 сервера,
   а HTTPS-прокси настройте на `127.0.0.1:8000` с сертификатом для `apextop.ru`.
2. В кабинете Т-Банка задайте URL уведомлений
   `https://apextop.ru/api/payments/tbank/notification`. Адреса возврата приложение
   передаёт само: `https://apextop.ru/payment/success` и `/payment/fail`.
3. Если используете Yandex SmartCaptcha, добавьте `apextop.ru` в разрешённые домены.
   Проверьте витрину, вход в `/admin` и тестовую оплату по HTTPS.

`www.apextop.ru`, `moto.apextop.ru` и `drive.apextop.ru` подключаются отдельно,
когда понадобятся. Домены не создаются изменением Python-настроек: нужны DNS,
привязка на стороне хостинга и сертификат. Отдельные каталоги для поддоменов
требуют отдельных магазинов либо дополнительной логики в приложении.

## Фотографии товаров в S3

Администратор выбирает файл → браузер отправляет его на `/api/admin/media` →
сервер создаёт WebP и версии 240/480/960 и записывает их в S3 под `S3_PREFIX`.
В PostgreSQL сохраняются ссылки вида `/media/<hash>.webp`, включая фотографии
вариаций товара. При открытии витрины запросы `/media/...` и `?w=240/480/960`
читают объекты из S3 через backend. Поэтому адрес фото в браузере остаётся
`apextop.ru/media/...`; бакет может быть приватным, публичный доступ и CORS не нужны.
Ключу приложения нужны права чтения/HEAD и записи объектов под выбранным префиксом.

В режиме S3 новые загрузки не записываются на диск контейнера. Ошибка S3
возвращается как HTTP 503; приложение не сообщает об успешной загрузке и
не переключается на локальный диск. Фото сохраняются после замены контейнера.
Встроенные картинки оформления `/images/...` поставляются в образе, а явно
заданные HTTPS-ссылки остаются внешними.

После подключения production-настроек можно проверить все ссылки фотографий
товаров и наличие оригиналов/миниатюр в своём бакете:

```bash
# запуск из корня проекта: автоматически читает .env
python -m store.manage check-media

# либо внутри уже запущенного контейнера с его переменными окружения
docker exec apex-store python -m store.manage check-media
```

Проверка выполняет только чтение БД и HEAD объектов S3; фотографии не загружает
и не удаляет, миграции БД не запускает. `Missing S3 objects: 0` означает, что все
проверенные файлы на месте; `S3 photo URLs: 0` означает, что в товарах пока нет
ссылок `/media/...`. Отдельно показываются встроенные/внешние и старые inline-фото.
Отсутствующие объекты, inline-фото и некорректные ссылки дают код выхода 1.
Ошибка доступа к бакету прерывает проверку.

Если до S3 фотографии хранились локально, перенесите **исходную** папку
`var/media` на машину, где доступны production `.env` и проект, и выполните:

```bash
python -m store.manage upload-media --directory /path/to/old/var/media
python -m store.manage migrate-media
python -m store.manage check-media
```

Первая команда переносит существующие WebP без смены URL, вторая переводит старые
`data:image/...` из БД в S3. Обе можно повторять; цены и остатки не меняются.

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
