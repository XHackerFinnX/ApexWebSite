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
- собственная одноразовая капча, подтверждение почты и восстановление пароля через Яндекс SMTP;
- rate limit и защитные HTTP-заголовки на уровне приложения.

API: `GET /api/products`, `POST /api/products/:id/view`,
`POST /api/products/:id/cart`, `GET|POST /api/admin/integrations`,
`POST /api/security/captcha`, `POST /api/security/captcha/verify`, `POST /api/checkout/payment`.

Настройка SMTP, регистрация с кодом, восстановление пароля, ограничения форм и cookie описаны в [ACCOUNT_SECURITY.md](ACCOUNT_SECURITY.md).

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

СНО, НДС товаров/доставки, ФФД 1.05/1.2 и схема списания настраиваются в админке.
Значения по умолчанию — УСН «доходы», без НДС и полный расчёт (`full_payment`).
Электронный чек формирует и отправляет касса, подключённая к терминалу в Т-Бизнес.

После рабочего подтверждения оплаты PostgreSQL сохраняет задачи отправки заказа
в `https://2p2p.ru/tilda/apex/webhook` и создания СДЭК. DEMO-заказы обрабатываются
отдельно, без реальных бонусов и боевых отправлений. Уведомления, `GetState`,
`CheckOrder` и `Confirm` обеспечивают сверку состояния при ошибках соединения.

Подробная проверка методов, настройка тестовой/рабочей среды, причины 403,
касса, JSON webhook, удаление и фильтры заказов: [PAYMENTS.md](PAYMENTS.md).

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
export SMTP_PASSWORD=YOUR_YANDEX_APP_PASSWORD
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
ADMIN_USERNAME=YOUR_ADMIN_LOGIN
ADMIN_PASSWORD=replace-with-your-unique-admin-password
STORE_MASTER_KEY=replace-with-existing-persistent-master-key
POSTGRESQL_HOST=YOUR_DATABASE_HOST
POSTGRESQL_PORT=5432
POSTGRESQL_DATABASE=YOUR_DATABASE_NAME
POSTGRESQL_USER=YOUR_DATABASE_USER
POSTGRESQL_PASSWORD=YOUR_DATABASE_PASSWORD
POSTGRESQL_SSLMODE=verify-full
POSTGRESQL_SSLROOTCERT_PEM=YOUR_DATABASE_CA_IN_PEM
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
PostgreSQL, администратора, SMTP и **существующий** `STORE_MASTER_KEY`.
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

### Запуск в Timeweb App Platform из Docker Hub

Этот вариант использует готовый образ. GitHub Actions собирает и публикует его,
а Timeweb скачивает образ и запускает приложение с вашими переменными.

1. В GitHub откройте **Actions → Publish Docker image → Run workflow**, выберите
   `main`, запустите сборку и дождитесь зелёного результата. После изменений в коде
   нужна новая сборка: повторный запуск старого задания использует старый коммит.
   Для этого проекта `DOCKERHUB_USERNAME=hackerfinn`; секрет `DOCKERHUB_TOKEN`
   должен содержать токен Docker Hub этого аккаунта с правом **Repo Read & Write**.
2. В Docker Hub откройте `hackerfinn/apex-store` → **Tags**. Репозиторий должен
   быть **Public**. Скопируйте тег полного коммита из новой сборки; `latest` тоже
   публикуется, но тег коммита позволяет однозначно выбрать нужную версию.
3. В Timeweb выберите **App Platform → Создать → Docker Hub**. Введите имя
   `hackerfinn/apex-store`, а тег выберите в отдельном поле. В название образа
   не добавляйте `https://`, `:latest` или URL GitHub.
4. В разделе **Переменные → Добавить → Загрузить из файла** выберите ваш
   заполненный **`.env`**. Убедитесь, что импортированные переменные выбраны для
   этого приложения. Сам файл не нужно добавлять в Git или в Docker-образ.
5. Выберите регион и приватную сеть с доступом к PostgreSQL. Для публичного адреса
   БД разрешите подключения от приложения в настройках БД. Хосты `localhost` и
   `127.0.0.1` внутри контейнера относятся к самому приложению, а не к внешней БД.
6. Включите **Сертификаты Минцифры**, если они нужны вашему Т-Банку; ТЦИ включайте
   при необходимости. Укажите путь проверки состояния **`/health`** в расширенных
   настройках, если такое поле доступно для выбранного способа деплоя.
7. Запустите деплой. Откройте технический HTTPS-домен из дашборда, затем
   подключите `apextop.ru`, как описано ниже. Загрузка витрины, вход в `/admin`
   и тестовая загрузка фото должны работать до приёма реальных заказов.

Для существующего приложения откройте **Настройки → Настройки деплоя →
Редактировать**, обновите тег и переменные, затем сохраните и выполните деплой.
GitHub Actions не передаёт production `.env` в Timeweb автоматически.

### Запуск в Timeweb App Platform из GitHub / Dockerfile

Вариант по [инструкции Timeweb](https://timeweb.cloud/docs/apps/deploying-with-dockerfile)
собирает тот же Dockerfile непосредственно на стороне Timeweb. Для него публикация
в Docker Hub и запуск GitHub Actions не нужны.

1. **App Platform → Создать → GitHub** → репозиторий `XHackerFinnX/ApexWebSite`.
2. Выберите ветку **`main`**, фреймворк **`Dockerfile`**. Поле **«Путь до директории
   проекта» оставьте пустым**: Dockerfile и контекст сборки находятся в корне.
3. Добавьте переменные из `.env`, сеть, сертификаты и путь **`/health`**, как выше.
   Собственные команды установки и запуска задавать не требуется: они уже в
   Dockerfile. Корневой `docker-compose.yml` запускает только локальную БД и для
   этого деплоя не используется.
4. Запустите деплой. При последующих обновлениях можно использовать автодеплой
   из `main` либо вручную выбирать нужный коммит.

### Порт, сертификаты и диагностика

Приложение слушает **`0.0.0.0:8000`**, Dockerfile объявляет **`EXPOSE 8000`**.
Timeweb направляет внешний HTTP/HTTPS-трафик на этот порт. Оставьте
`APP_HOST=0.0.0.0` и `APP_PORT=8000`; отдельный Nginx в контейнере не требуется.

Timeweb добавляет выбранные CA-файлы в `/usr/local/share/ca-certificates`.
При запуске приложение объединяет их со стандартными доверенными корнями во
временный PEM-файл, доступный пользователю контейнера. Проверка TLS остаётся
включённой; Python, клиент S3 и команды `store.manage` используют этот набор.
Явно заданные `SSL_CERT_FILE`, `REQUESTS_CA_BUNDLE` и `AWS_CA_BUNDLE` имеют
приоритет. Если они остались от старого окружения, проверьте пути внутри
контейнера. При выключенных переключателях сертификатов обычные HTTPS-запросы
продолжают использовать стандартные доверенные корни.

Сертификат PostgreSQL задаётся отдельно: для `verify-full` используйте CA вашей
БД в `POSTGRESQL_SSLROOTCERT_PEM`. Можно указать переносы строк как `\n`.
Удалите старый `POSTGRESQL_SSLROOTCERT`, если вместо него используете PEM;
оба способа одновременно задавать нельзя. Путь к файлу на вашем ПК, например
`C:\certs\root.crt`, не существует в Linux-контейнере. То же относится к
`TBANK_CA_CERT`: используйте сертификаты Timeweb либо `TBANK_CA_CERT_PEM`.

`/health` возвращает 200, пока отвечает HTTP-сервер, и подходит для перезапусков
Timeweb. `/ready` проверяет соединение с PostgreSQL и вернёт 503 при недоступной
БД. Его можно открыть вручную после запуска, но не следует выбирать как проверку
живучести: временная ошибка БД не исправляется перезапуском каждого контейнера.

| Сообщение в логе | Что проверить |
|---|---|
| `Field required`, `S3_BUCKET`, `STORE_MASTER_KEY`, `ADMIN_PASSWORD` | Импорт и привязку переменных `.env` к приложению; пароль от 12 символов и постоянный мастер-ключ от 32 |
| `POSTGRESQL_SSLROOTCERT ... не найден` | Путь внутри контейнера либо переход на `POSTGRESQL_SSLROOTCERT_PEM` |
| `connection refused`, `timeout`, `PoolTimeout` | Адрес/порт PostgreSQL, правила доступа, выбранную приватную сеть и состояние БД |
| `CERTIFICATE_VERIFY_FAILED` | CA конкретного сервиса и корректность путей к явно заданным сертификатам |
| `pull access denied`, `manifest unknown` | Публичность `hackerfinn/apex-store` и наличие выбранного тега после успешной сборки |
| Не пройдена проверка состояния | `/health`, `APP_HOST=0.0.0.0`, `APP_PORT=8000` и ошибки запуска выше по логу |

Подробности Timeweb: [переменные и импорт .env](https://timeweb.cloud/docs/apps/variables),
[проверка состояния](https://timeweb.cloud/docs/apps/healthcheck-path),
[корневые сертификаты](https://timeweb.cloud/docs/apps/trusted-certificates),
[запуск из Docker Hub](https://timeweb.cloud/docs/apps/deploying-with-docker-hub).

Подключение домена:

1. Добавьте `apextop.ru` в домены приложения Timeweb. У регистратора выставьте
   DNS-записи, которые покажет Timeweb, дождитесь их применения и выпуска HTTPS.
   Если используете VPS, запись `A` для `@` направьте на публичный IPv4 сервера,
   а HTTPS-прокси настройте на `127.0.0.1:8000` с сертификатом для `apextop.ru`.
2. В кабинете Т-Банка задайте URL уведомлений
   `https://apextop.ru/api/payments/tbank/notification`. Адреса возврата приложение
   передаёт само: `https://apextop.ru/payment/success` и `/payment/fail`.
3. Для подтверждения почты задайте `SMTP_PASSWORD` и остальные параметры из [ACCOUNT_SECURITY.md](ACCOUNT_SECURITY.md).
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

Капча генерируется и проверяется самим приложением, с одноразовыми подтверждениями в PostgreSQL.
Тестового обхода в публичном API нет. Инструкции по Яндекс SMTP и проверке писем —
в [ACCOUNT_SECURITY.md](ACCOUNT_SECURITY.md). Платёжный callback проверяется по подписи
провайдера и обрабатывается идемпотентно. Секреты интеграций маскируются;
смена master key требует миграции.

## Проверки

```bash
python -m unittest discover -s tests -v
python -m compileall -q store tests
```
