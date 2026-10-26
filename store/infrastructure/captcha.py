"""APEX image captcha. No answer, seed or reversible puzzle is sent to clients."""

import io
import math
import secrets

from PIL import Image, ImageDraw, ImageFont, ImageFilter


def render_challenge():
    alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
    answer = "".join(secrets.choice(alphabet) for _ in range(5))
    size = (320, 112)
    image = Image.new("RGB", size, "#f3f5fa")
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default(size=47)
    for _ in range(280):
        x, y = secrets.randbelow(size[0]), secrets.randbelow(size[1])
        draw.ellipse(
            (x, y, x + 2, y + 2), fill=secrets.choice(["#b7c2d4", "#c6cddb", "#d9a5a4"])
        )
    for index, character in enumerate(answer):
        tile = Image.new("RGBA", (66, 90), (0, 0, 0, 0))
        ImageDraw.Draw(tile).text(
            (11, 11),
            character,
            font=font,
            fill=secrets.choice(["#182438", "#38465c", "#783b43"]),
        )
        tile = tile.rotate(
            secrets.randbelow(35) - 17, resample=Image.Resampling.BICUBIC
        )
        image.paste(tile, (index * 56 + 13, secrets.randbelow(14) + 7), tile)
    phase = secrets.randbelow(100) / 10
    source = image.copy()
    for x in range(size[0]):
        offset = round(4 * math.sin(x / 30 + phase))
        image.paste(source.crop((x, 0, x + 1, size[1])), (x, offset))
    draw = ImageDraw.Draw(image)
    for _ in range(3):
        draw.line(
            [
                (0, secrets.randbelow(112)),
                (160, secrets.randbelow(112)),
                (320, secrets.randbelow(112)),
            ],
            fill="#a3afc1",
            width=2,
        )
    image = image.filter(ImageFilter.SMOOTH)
    output = io.BytesIO()
    image.save(output, "PNG")
    return answer, output.getvalue()
