"""Private S3 media; the browser keeps the existing /media/... URLs."""

import boto3
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError

from store.infrastructure.media import MediaStorageError


class S3MediaStorage:
    def __init__(self, settings):
        self.bucket = settings.S3_BUCKET
        self.prefix = settings.S3_PREFIX.strip("/")
        self.client = boto3.client(
            "s3",
            endpoint_url=settings.S3_ENDPOINT_URL,
            region_name=settings.S3_REGION,
            aws_access_key_id=settings.S3_ACCESS_KEY_ID.get_secret_value(),
            aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY.get_secret_value(),
            config=Config(
                signature_version="s3v4",
                connect_timeout=5,
                read_timeout=15,
                retries={"max_attempts": 2, "mode": "standard"},
                s3={"addressing_style": "path"},
                request_checksum_calculation="when_required",
                response_checksum_validation="when_required",
            ),
        )

    def key(self, filename):
        return self.prefix + "/" + filename if self.prefix else filename

    @staticmethod
    def _missing(error):
        return str(error.response.get("Error", {}).get("Code")) in {
            "404",
            "NoSuchKey",
            "NotFound",
        }

    def exists(self, filename):
        try:
            self.client.head_object(Bucket=self.bucket, Key=self.key(filename))
            return True
        except ClientError as exc:
            if self._missing(exc):
                return False
            raise MediaStorageError("Хранилище фотографий временно недоступно") from exc
        except BotoCoreError as exc:
            raise MediaStorageError("Хранилище фотографий временно недоступно") from exc

    def put(self, filename, content):
        if self.exists(filename):
            return
        try:
            self.client.put_object(
                Bucket=self.bucket,
                Key=self.key(filename),
                Body=content,
                ContentType="image/webp",
                CacheControl="public, max-age=31536000, immutable",
            )
        except (ClientError, BotoCoreError) as exc:
            raise MediaStorageError("Хранилище фотографий временно недоступно") from exc

    def read(self, filename):
        try:
            response = self.client.get_object(
                Bucket=self.bucket, Key=self.key(filename)
            )
            body = response["Body"]
            try:
                return body.read()
            finally:
                body.close()
        except ClientError as exc:
            if self._missing(exc):
                raise FileNotFoundError(filename) from exc
            raise MediaStorageError("Хранилище фотографий временно недоступно") from exc
        except BotoCoreError as exc:
            raise MediaStorageError("Хранилище фотографий временно недоступно") from exc
