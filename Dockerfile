# syntax=docker/dockerfile:1
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    APP_ENV=production \
    APP_HOST=0.0.0.0 \
    APP_PORT=8000

WORKDIR /app

COPY requirements.txt ./
# The optional BuildKit secret is only for a build environment with a TLS proxy.
# It is not included in the image and is unnecessary on Docker Hub/normal CI.
RUN --mount=type=secret,id=proxy_ca \
    if [ -s /run/secrets/proxy_ca ]; then \
      PIP_CERT=/run/secrets/proxy_ca pip install --no-cache-dir -r requirements.txt; \
    else pip install --no-cache-dir -r requirements.txt; fi

COPY migrations ./migrations
COPY store ./store

RUN groupadd --gid 10001 apex \
    && useradd --uid 10001 --gid apex --no-create-home --shell /usr/sbin/nologin apex \
    && mkdir -p /app/var/media \
    && chmod -R a=rX /app/store /app/migrations \
    && chown -R apex:apex /app/var

USER 10001:10001

# Timeweb reads EXPOSE to configure its reverse proxy (external ports 80/443).
EXPOSE 8000

# The platform restarts unhealthy containers, so check HTTP liveness here.
# /ready remains available for a separate database readiness check.
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python -c "import os,urllib.request; urllib.request.build_opener(urllib.request.ProxyHandler({})).open('http://127.0.0.1:'+os.environ.get('APP_PORT','8000')+'/health',timeout=8).close()"

CMD ["python", "-m", "store"]
