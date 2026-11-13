"""On-device-friendly vision helpers. No cloud API required.

This is a classroom scene describer, not an outdoor navigation system.
It looks at brightness, colour mass, and simple edges so a demo still
works on 3G or with the network off after the image is captured.
"""

from __future__ import annotations

import io
from typing import Any

try:
    from PIL import Image, ImageFilter, ImageStat
except ImportError:  # pragma: no cover
    Image = None  # type: ignore


def describe_image_bytes(data: bytes, hint: str | None = None) -> dict[str, Any]:
    if Image is None:
        return {
            "ok": False,
            "summary_en": "Install Pillow to enable local vision on this server.",
            "summary_am": "የምስል መግለጫ ለማግኘት Pillow ያስፈልጋል።",
            "offline": True,
        }
    img = Image.open(io.BytesIO(data)).convert("RGB")
    w, h = img.size
    small = img.resize((64, 64))
    stat = ImageStat.Stat(small)
    r, g, b = [round(x, 1) for x in stat.mean]
    brightness = (r + g + b) / 3
    edges = small.convert("L").filter(ImageFilter.FIND_EDGES)
    edge_mean = ImageStat.Stat(edges).mean[0]

    if brightness < 40:
        light_en = "The frame is dark. Increase lamp light or turn the page toward a window."
        light_am = "ምስሉ ጨለማ ነው። መብራት ያብሩ ወይም ወደ መስኮት ያቅርቡ።"
    elif brightness > 210:
        light_en = "The frame is very bright, almost washed out."
        light_am = "ምስሉ በጣም ብሩህ ነው።"
    else:
        light_en = "Lighting is usable for a classroom photo."
        light_am = "ብርሃኑ ለክፍል ፎቶ በቂ ነው።"

    if r > g + 25 and r > b + 15:
        colour_en = "Warm reds and earth tones dominate — like clay, injera, or a red school shirt."
        colour_am = "ቀይና የምድር ቀለሞች ይበዛሉ።"
    elif b > r + 20:
        colour_en = "Cool blues dominate — sky, a uniform, or a screen."
        colour_am = "ሰማያዊ ቀለም ይበዛል።"
    elif g > r + 15:
        colour_en = "Greens dominate — plants, a chalkboard, or outdoor leaves."
        colour_am = "አረንጓዴ ቀለም ይበዛል።"
    else:
        colour_en = "Colours are mixed; no single hue takes over the frame."
        colour_am = "ቀለሞች የተደባለቁ ናቸው።"

    if edge_mean > 28:
        shape_en = "Many edges: this may be text, a diagram, or a busy classroom scene."
        shape_am = "ብዙ ጠርዞች አሉ፤ ጽሑፍ ወይም ሥዕላዊ መግለጫ ሊሆን ይችላል።"
        ocr_hint = True
    else:
        shape_en = "Soft shapes: a person, object, or open space rather than dense text."
        shape_am = "ለስላሳ ቅርጾች፤ ሰው ወይም ነገር ሊሆን ይችላል።"
        ocr_hint = False

    hint_bit = f" Learner asked: {hint}." if hint else ""
    summary_en = (
        f"Classroom photo, {w} by {h} pixels. {light_en} {colour_en} {shape_en}{hint_bit} "
        "This is a learning description, not obstacle navigation."
    )
    summary_am = f"የክፍል ምስል፣ {w} በ {h}። {light_am} {colour_am} {shape_am}"

    return {
        "ok": True,
        "width": w,
        "height": h,
        "brightness": round(brightness, 1),
        "mean_rgb": [r, g, b],
        "edge_energy": round(edge_mean, 1),
        "likely_text": ocr_hint,
        "summary_en": summary_en,
        "summary_am": summary_am,
        "offline": True,
        "safety": "Not a mobility aid. Do not use for walking or traffic.",
    }
