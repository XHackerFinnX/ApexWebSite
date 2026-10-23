import json
import threading
import unittest
from http.server import ThreadingHTTPServer
from unittest.mock import Mock, patch
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen

from store.application.services import IntegrationService
from store.infrastructure.cdek import CDEKDelivery, CDEKError
from store.infrastructure.security import RateLimiter
from store.presentation.web import WebApp


CONFIG = {
    "environment": "production",
    "client_id": "draft-id",
    "client_secret": "draft-secret",
}
CITY = {"code": 44, "city": "Москва", "region": "Москва", "country": "Россия"}


class SenderDirectoryTests(unittest.TestCase):
    def setUp(self):
        self.provider = CDEKDelivery(None)

    def test_focus_lists_paginated_cities_and_partial_search_uses_suggest(self):
        with patch.object(
            self.provider, "_authorized", return_value=[CITY] * 20
        ) as request:
            page = self.provider.sender_cities(CONFIG, page=2)
            query = parse_qs(urlparse(request.call_args.args[0]).query)
            self.assertEqual(
                query, {"country_codes": ["RU"], "size": ["20"], "page": ["2"]}
            )
            self.assertTrue(page["has_more"])
            self.assertEqual(page["items"][0]["code"], 44)
        with patch.object(
            self.provider,
            "_authorized",
            return_value=[{"code": 44, "full_name": "Москва, Россия"}],
        ) as request:
            result = self.provider.sender_cities(CONFIG, "Моск")
            path = urlparse(request.call_args.args[0])
            self.assertEqual(path.path, "location/suggest/cities")
            self.assertEqual(
                parse_qs(path.query), {"name": ["Моск"], "country_code": ["RU"]}
            )
            self.assertEqual(result["items"][0]["fullName"], "Москва, Россия")

    def test_postcode_is_used_as_postcode_not_city_code(self):
        with patch.object(self.provider, "_authorized", return_value=[CITY]) as request:
            self.provider.sender_cities(CONFIG, "143911")
            query = parse_qs(urlparse(request.call_args.args[0]).query)
            self.assertEqual(query["postal_code"], ["143911"])
            self.assertNotIn("code", query)

    def test_office_list_excludes_closed_non_reception_and_other_cities(self):
        point = {
            "code": "MSK1",
            "is_reception": True,
            "status": "ACTIVE",
            "location": {"city_code": 44, "address": "Тестовая, 1"},
        }
        data = [
            point,
            {**point, "code": "CLOSED", "status": "CLOSED"},
            {**point, "code": "NO-RECEPTION", "is_reception": False},
            {**point, "code": "OTHER", "location": {"city_code": 270}},
        ]
        with patch.object(self.provider, "_authorized", return_value=data) as request:
            result = self.provider.sender_offices(CONFIG, 44)
            self.assertEqual([point["code"] for point in result], ["MSK1"])
            self.assertEqual(
                parse_qs(urlparse(request.call_args.args[0]).query)["is_reception"],
                ["true"],
            )
            self.provider.sender_offices(CONFIG, 44)
            self.assertEqual(request.call_count, 1)

    def test_draft_environment_or_account_changes_do_not_reuse_directory_cache(self):
        with patch.object(self.provider, "_authorized", return_value=[CITY]) as request:
            self.provider.sender_cities(CONFIG)
            self.provider.sender_cities({**CONFIG, "environment": "test"})
            self.provider.sender_cities({**CONFIG, "client_id": "another-account"})
            self.assertEqual(request.call_count, 3)

    def test_invalid_city_is_rejected_before_calculator(self):
        with (
            patch.object(self.provider, "_token_for", return_value="token"),
            patch.object(self.provider, "_request_json", return_value=[]) as request,
        ):
            with self.assertRaisesRegex(CDEKError, "почтовый индекс не является кодом"):
                self.provider.test_configuration(
                    {**CONFIG, "sender_city": "143911", "sender_office": "BLSH94"}
                )
            self.assertEqual(request.call_count, 1)
            self.assertIn("location/cities", request.call_args.args[0])

    def test_calculation_uses_validated_city_and_intercity_destination(self):
        config = {
            **CONFIG,
            "sender_city": "44",
            "sender_office": "MSK1",
            "contract_type": "1",
            "tariff_code": "136",
            "dispatch_days": "1",
            "weight": "1000",
            "length": "300",
            "width": "200",
            "height": "80",
        }
        with (
            patch.object(self.provider, "_token_for", return_value="token"),
            patch.object(
                self.provider,
                "_request_json",
                side_effect=[
                    [CITY],
                    [{"code": "MSK1", "is_reception": True}],
                    {"total_sum": 300},
                    {"tariff_codes": [{"tariff_code": 136, "delivery_mode": 4}]},
                ],
            ) as request,
        ):
            self.provider.test_configuration(config)
            calculation = request.call_args_list[2].kwargs["data"]
            self.assertEqual(calculation["from_location"], {"code": 44})
            self.assertEqual(calculation["to_location"], {"code": 270})


class SettingsRepository:
    def __init__(self):
        self.integrations = {}

    def get_integration_config(self, provider, enabled_only=True):
        return self.integrations.get(provider)


class SenderDirectoryHTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo = SettingsRepository()
        cls.provider = Mock()
        cls.app = WebApp(
            None,
            IntegrationService(cls.repo),
            None,
            cls.repo,
            RateLimiter(1000, 60),
            cls.provider,
        )
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), cls.app.handler())
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.cookie = "apex_admin=" + cls.app._session_token(4_000_000_000)

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def setUp(self):
        self.repo.integrations.clear()
        self.provider.reset_mock()
        self.provider.sender_cities.return_value = {
            "items": [{"code": 44, "fullName": "Москва"}],
            "has_more": False,
            "page": 0,
        }
        self.provider.sender_offices.return_value = [
            {"code": "MSK1", "address": "Тестовая, 1"}
        ]

    def request(self, kind, data, authenticated=True):
        headers = {"Content-Type": "application/json"}
        if authenticated:
            headers["Cookie"] = self.cookie
        request = Request(
            f"http://127.0.0.1:{self.server.server_port}/api/admin/integrations/cdek/{kind}",
            data=json.dumps(data).encode(),
            headers=headers,
        )
        try:
            with urlopen(request) as response:
                return response.status, json.loads(response.read())
        except HTTPError as error:
            return error.code, json.loads(error.read())

    def test_lookup_works_before_saving_and_does_not_return_or_persist_credentials(
        self,
    ):
        status, result = self.request("cities", {**CONFIG, "q": "Моск"})
        self.assertEqual(status, 200)
        self.assertEqual(result["items"][0]["code"], 44)
        self.provider.sender_cities.assert_called_once_with(
            CONFIG, "Моск", page=0, city_code=0
        )
        self.assertNotIn("draft-secret", json.dumps(result))
        self.assertFalse(self.repo.integrations)

    def test_saved_credentials_can_be_reused_only_explicitly_while_editing(self):
        self.repo.integrations["cdek"] = dict(CONFIG)
        self.assertEqual(self.request("cities", {})[0], 400)
        self.assertEqual(self.request("cities", {"use_saved": True})[0], 200)
        self.provider.sender_cities.assert_called_once()
        self.assertEqual(
            self.request("offices", {"use_saved": True, "city_code": 44})[0], 200
        )
        self.provider.sender_offices.assert_called_once_with(CONFIG, 44)

    def test_admin_session_and_valid_environment_are_required(self):
        for kind in ("cities", "offices"):
            self.assertEqual(self.request(kind, CONFIG, authenticated=False)[0], 401)
        self.assertEqual(
            self.request("cities", {**CONFIG, "environment": "https://example.test"})[
                0
            ],
            400,
        )
        self.provider.sender_cities.assert_not_called()
