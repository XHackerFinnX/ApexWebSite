import json, os, urllib.parse, urllib.request


class YandexCaptcha:
    def __init__(self): self.mode=os.getenv("CAPTCHA_MODE","mock"); self.key=os.getenv("YANDEX_CAPTCHA_SERVER_KEY","")
    def verify(self, token: str, ip: str) -> bool:
        if self.mode == "mock": return token == "demo-pass"
        if not self.key or not token: return False
        data=urllib.parse.urlencode({"secret":self.key,"token":token,"ip":ip}).encode()
        with urllib.request.urlopen("https://smartcaptcha.yandexcloud.net/validate",data,timeout=4) as response:
            return json.load(response).get("status") == "ok"