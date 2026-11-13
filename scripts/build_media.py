#!/usr/bin/env python3
"""Build the demo lesson media: synced English and Amharic narration, captions, and a light pack.

The voices are eSpeak NG, a small offline fallback. Hasab text-to-speech replaces them
when HASAB_API_KEY is set. Re-run this script only when the lesson sentences change.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public" / "media"
PACK = ROOT / "public" / "packs" / "demo"
CONTENT = ROOT / "src" / "content"
TMP = ROOT / "scripts" / ".media-tmp"

SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
ETHIOPIC = ROOT / "public" / "fonts" / "NotoSansEthiopic-Regular.ttf"

BG = (242, 240, 234)
NAVY = (27, 48, 72)
INK = (23, 32, 51)
MOSS = (14, 90, 66)
YELLOW = (255, 238, 0)
BLACK = (17, 17, 17)
WHITE = (255, 255, 255)

# Spoken lines. Caption times are measured from these recordings.
SEGMENTS = [
    {
        "en": "Hana opens her lesson on a phone in Addis Ababa.",
        "am": "ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",
        "ad": "A phone is drawn on a paper-coloured screen, with a short caption under it.",
        "gloss": "OPEN",
        "scene": "phone",
        "chat": ("Facilitator", "We are watching together. Captions are on."),
    },
    {
        "en": "She needs English and Amharic captions she can make larger.",
        "am": "የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",
        "ad": "The caption bar grows taller. The letters are yellow on a black band.",
        "gloss": "LARGER",
        "scene": "captions",
        "chat": ("Hana", "Please make the Amharic text larger."),
    },
    {
        "en": "A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",
        "am": "የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",
        "ad": "A second window lifts off the phone. It is labelled Ethiopian Sign Language.",
        "gloss": "SIGN",
        "scene": "sign",
        "chat": ("Facilitator", "Move the sign window if it covers the caption."),
    },
    {
        "en": "Audio description says what the picture is doing, for a learner who cannot see it.",
        "am": "የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",
        "ad": "A round speaker icon appears beside the phone.",
        "gloss": "SPEAK",
        "scene": "speak",
        "chat": ("Yonas", "I will turn on audio description."),
    },
    {
        "en": "When the network is slow she keeps a small pack: sound, text, and a light page.",
        "am": "ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",
        "ad": "The phone is replaced by a short stack of pages and a sound file.",
        "gloss": "PACK",
        "scene": "pack",
        "chat": ("Hana", "I am saving the small pack before the network drops."),
    },
    {
        "en": "The lesson on this page is the same one, with the network or without it.",
        "am": "በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",
        "ad": "The stack of pages stays in the centre of the screen.",
        "gloss": "SAME",
        "scene": "pack",
        "chat": ("Facilitator", "The text page matches what you just heard."),
    },
]

FIGURE_ALT = "A navy phone on a paper background, with an English and Amharic caption under the screen."
FIGURE_LONG = (
    "A simple drawing, not a photograph. A tall rounded rectangle stands in for a phone. "
    "Inside it, a smaller rectangle is the screen. Under the phone, two lines of caption text "
    "are suggested by a black bar and a shorter bar. Nothing in the drawing depends on colour alone: "
    "the phone has a dark outline and the caption bars are separate shapes."
)


def run(cmd: list[str]) -> None:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise SystemExit(result.stderr[-4000:] or result.stdout[-4000:])


def synth(text: str, voice: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    run(["espeak-ng", "-v", voice, "-s", "148", "-w", str(dest), text])


def read_wav(path: Path) -> tuple[int, bytes]:
    with wave.open(str(path)) as handle:
        if handle.getnchannels() != 1 or handle.getsampwidth() != 2:
            raise SystemExit(f"Unexpected wav format: {path}")
        return handle.getframerate(), handle.readframes(handle.getnframes())


def write_wav(path: Path, rate: int, frames: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "w") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(rate)
        handle.writeframes(frames)


def silence(rate: int, seconds: float) -> bytes:
    count = int(rate * seconds)
    return b"\x00\x00" * count


def vtt_time(seconds: float) -> str:
    millis = int(round(seconds * 1000))
    hours, millis = divmod(millis, 3_600_000)
    minutes, millis = divmod(millis, 60_000)
    secs, millis = divmod(millis, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}.{millis:03d}"


def write_vtt(path: Path, cues: list[tuple[float, float, str]], language: str) -> None:
    lines = ["WEBVTT", f"Language: {language}", ""]
    for index, (start, end, text) in enumerate(cues, start=1):
        lines.append(str(index))
        lines.append(f"{vtt_time(start)} --> {vtt_time(end)}")
        lines.append(text)
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def font(path: str | Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def new_canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (1280, 720), BG)
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 28, 720), fill=NAVY)
    return image, draw


def draw_phone(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    draw.rounded_rectangle(box, radius=36, outline=NAVY, width=8, fill=WHITE)
    x0, y0, x1, y1 = box
    draw.rounded_rectangle((x0 + 28, y0 + 48, x1 - 28, y1 - 70), radius=8, outline=NAVY, width=4)


def scene_phone() -> Image.Image:
    image, draw = new_canvas()
    draw_phone(draw, (470, 120, 760, 560))
    draw.rectangle((500, 470, 730, 512), fill=BLACK)
    return image


def scene_captions() -> Image.Image:
    image, draw = new_canvas()
    draw_phone(draw, (430, 90, 700, 500))
    draw.rectangle((300, 530, 980, 640), fill=BLACK)
    draw.text((330, 555), "English", font=font(SANS, 28), fill=YELLOW)
    draw.text((330, 590), "አማርኛ", font=font(ETHIOPIC, 28), fill=YELLOW)
    return image


def scene_sign() -> Image.Image:
    image, draw = new_canvas()
    draw_phone(draw, (250, 150, 520, 540))
    draw.rounded_rectangle((620, 150, 1040, 500), radius=18, outline=MOSS, width=8, fill=WHITE)
    draw.text((660, 190), "Ethiopian Sign Language", font=font(SERIF, 32), fill=NAVY)
    draw.text((660, 260), "Sample window", font=font(SANS, 28), fill=INK)
    draw.text((660, 330), "SIGN", font=font(SERIF, 64), fill=MOSS)
    return image


def scene_speak() -> Image.Image:
    image, draw = new_canvas()
    draw_phone(draw, (300, 150, 560, 540))
    draw.ellipse((700, 220, 980, 500), outline=NAVY, width=8)
    draw.polygon([(760, 310), (760, 410), (830, 450), (830, 270)], fill=NAVY)
    draw.arc((840, 300, 930, 420), start=300, end=60, fill=NAVY, width=6)
    return image


def scene_pack() -> Image.Image:
    image, draw = new_canvas()
    for offset, shade in ((48, (210, 206, 196)), (24, (230, 226, 216)), (0, WHITE)):
        draw.rounded_rectangle((460 + offset, 180 + offset, 860 + offset, 520 + offset), radius=12, outline=NAVY, width=6, fill=shade)
    draw.text((500, 250), "Light page", font=font(SERIF, 42), fill=NAVY)
    draw.text((500, 330), "Sound file", font=font(SANS, 28), fill=INK)
    draw.text((500, 390), "ቀላል ገጽ", font=font(ETHIOPIC, 32), fill=INK)
    return image


SCENES = {
    "phone": scene_phone,
    "captions": scene_captions,
    "sign": scene_sign,
    "speak": scene_speak,
    "pack": scene_pack,
}


def draw_esl_placeholder() -> None:
    image, draw = new_canvas()
    draw.rounded_rectangle((180, 120, 1100, 600), radius=24, outline=MOSS, width=10, fill=WHITE)
    draw.text((240, 180), "Ethiopian Sign Language", font=font(SERIF, 48), fill=NAVY)
    draw.text((240, 270), "Sample window. Replace with a recorded ESL track.", font=font(SANS, 28), fill=INK)
    draw.text((240, 380), "ምልክት", font=font(ETHIOPIC, 72), fill=MOSS)
    image.save(MEDIA / "esl-placeholder.png")
    # A short silent clip so the window has a real video element to move and resize.
    run(
        [
            "ffmpeg", "-y", "-loop", "1", "-i", str(MEDIA / "esl-placeholder.png"),
            "-t", "4", "-vf", "format=yuv420p,scale=960:540",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "30", "-an",
            str(MEDIA / "esl-placeholder.mp4"),
        ]
    )


def write_figure_svg() -> None:
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img">
  <title>{FIGURE_ALT}</title>
  <desc>{FIGURE_LONG}</desc>
  <rect width="640" height="480" fill="#f2f0ea"/>
  <rect x="0" y="0" width="18" height="480" fill="#1b3048"/>
  <rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/>
  <rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/>
  <rect x="120" y="390" width="400" height="36" fill="#111111"/>
  <rect x="140" y="400" width="160" height="8" fill="#ffee00"/>
  <rect x="140" y="412" width="110" height="6" fill="#ffffff"/>
</svg>
"""
    (MEDIA / "lesson-figure.svg").write_text(svg, encoding="utf-8")
    shutil.copy(MEDIA / "lesson-figure.svg", PACK / "lesson-figure.svg")


def write_light_html(lesson: dict) -> None:
    rows = []
    for segment in lesson["segments"]:
        rows.append(
            "<section>"
            f"<h2>{segment['en']}</h2>"
            f"<p lang=\"am\">{segment['am']}</p>"
            f"<p>Picture: {segment['ad']}</p>"
            f"<p>Sign gloss: {segment['gloss']}</p>"
            "</section>"
        )
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LearnAble light lesson</title>
  <style>
    body {{ margin: 1.25rem; font-family: Georgia, "Noto Serif Ethiopic", serif; background: #fff; color: #111; line-height: 1.5; }}
    main {{ max-width: 38rem; }}
    h1 {{ font-size: 1.8rem; line-height: 1.2; }}
    h2 {{ font-size: 1.15rem; line-height: 1.35; }}
    img {{ max-width: 100%; height: auto; }}
    a {{ color: #0b3d91; }}
  </style>
</head>
<body>
  <main>
    <h1>A lesson that still plays when the connection does not</h1>
    <p>This is the light pack for a slow phone. It has sound, text, and this page. It does not include the video.</p>
    <p lang="am">ይህ ለዝግ ኔትወርክ የተዘጋጀ ቀላል ጥቅል ነው። ድምጽ፣ ጽሑፍ፣ እና ይህ ገጽ አሉት። ቪዲዮውን አያካትትም።</p>
    <figure>
      <img src="lesson-figure.svg" alt="{FIGURE_ALT}">
      <figcaption>{FIGURE_LONG}</figcaption>
    </figure>
    <h2>English narration</h2>
    <audio controls src="lesson-en.wav">
      <a href="lesson-en.wav">Download the English narration</a>
    </audio>
    <h2 lang="am">የአማርኛ ንግግር</h2>
    <audio controls src="lesson-am.wav">
      <a href="lesson-am.wav">የአማርኛውን ንግግር አውርድ</a>
    </audio>
    <p>The voice is a device voice, eSpeak, so the pack works with no API key. Captions below are the text to trust.</p>
    {''.join(rows)}
    <p><a href="captions-en.vtt">English captions</a> · <a href="captions-am.vtt">Amharic captions</a> · <a href="descriptions.vtt">Audio description cues</a></p>
  </main>
</body>
</html>
"""
    (PACK / "index.html").write_text(html, encoding="utf-8")


def encode_video(images: list[tuple[Path, float]], audio: Path, dest: Path) -> None:
    concat = TMP / f"concat-{dest.stem}.txt"
    lines = []
    for path, duration in images:
        lines.append(f"file '{path}'")
        lines.append(f"duration {duration:.3f}")
    # The concat demuxer keeps the last file's duration only if the file is repeated.
    lines.append(f"file '{images[-1][0]}'")
    concat.write_text("\n".join(lines) + "\n", encoding="utf-8")
    run(
        [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat),
            "-i", str(audio),
            "-vf", "format=yuv420p",
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "30",
            "-c:a", "aac", "-b:a", "64k",
            "-shortest", "-movflags", "+faststart",
            str(dest),
        ]
    )


def main() -> None:
    if shutil.which("espeak-ng") is None or shutil.which("ffmpeg") is None:
        raise SystemExit("espeak-ng and ffmpeg are required to rebuild media.")
    TMP.mkdir(parents=True, exist_ok=True)
    MEDIA.mkdir(parents=True, exist_ok=True)
    PACK.mkdir(parents=True, exist_ok=True)

    timeline = []
    clock = 0.0
    pieces_en: list[bytes] = []
    pieces_am: list[bytes] = []
    rate = None
    for index, segment in enumerate(SEGMENTS):
        en_path = TMP / f"en-{index}.wav"
        am_path = TMP / f"am-{index}.wav"
        synth(segment["en"], "en-us", en_path)
        synth(segment["am"], "am", am_path)
        en_rate, en_frames = read_wav(en_path)
        am_rate, am_frames = read_wav(am_path)
        if en_rate != am_rate:
            raise SystemExit("English and Amharic sample rates differ.")
        rate = en_rate
        en_dur = len(en_frames) / 2 / en_rate
        am_dur = len(am_frames) / 2 / am_rate
        duration = max(en_dur, am_dur, 3.4) + 0.45
        pieces_en.append(en_frames + silence(en_rate, duration - en_dur))
        pieces_am.append(am_frames + silence(am_rate, duration - am_dur))
        timeline.append({**segment, "start": round(clock, 3), "end": round(clock + duration, 3)})
        clock += duration

    assert rate is not None
    en_wav = MEDIA / "lesson-en.wav"
    am_wav = MEDIA / "lesson-am.wav"
    write_wav(en_wav, rate, b"".join(pieces_en))
    write_wav(am_wav, rate, b"".join(pieces_am))

    scene_paths: list[tuple[Path, float]] = []
    for index, segment in enumerate(timeline):
        image = SCENES[segment["scene"]]()
        path = TMP / f"scene-{index}.png"
        image.save(path)
        scene_paths.append((path, segment["end"] - segment["start"]))
    shutil.copy(scene_paths[0][0], MEDIA / "poster.png")

    encode_video(scene_paths, en_wav, MEDIA / "lesson-en.mp4")
    encode_video(scene_paths, am_wav, MEDIA / "lesson-am.mp4")
    draw_esl_placeholder()

    write_vtt(MEDIA / "captions-en.vtt", [(s["start"], s["end"], s["en"]) for s in timeline], "en")
    write_vtt(MEDIA / "captions-am.vtt", [(s["start"], s["end"], s["am"]) for s in timeline], "am")
    write_vtt(MEDIA / "descriptions.vtt", [(s["start"], s["end"], s["ad"]) for s in timeline], "en")

    lesson = {
        "id": "slow-connection",
        "title": "A lesson that still plays when the connection does not",
        "voiceNote": "Narration is an eSpeak device voice so the lesson plays with no API key. Captions are the text to trust. A Hasab voice can replace the audio when a key is set.",
        "video": {
            "en": "/media/lesson-en.mp4",
            "am": "/media/lesson-am.mp4",
            "poster": "/media/poster.png",
        },
        "audio": {"en": "/media/lesson-en.wav", "am": "/media/lesson-am.wav"},
        "captions": {
            "en": "/media/captions-en.vtt",
            "am": "/media/captions-am.vtt",
            "descriptions": "/media/descriptions.vtt",
        },
        "signVideo": "/media/esl-placeholder.mp4",
        "signPoster": "/media/esl-placeholder.png",
        "figure": {
            "src": "/media/lesson-figure.svg",
            "alt": FIGURE_ALT,
            "long": FIGURE_LONG,
        },
        "segments": [
            {
                "start": s["start"],
                "end": s["end"],
                "en": s["en"],
                "am": s["am"],
                "ad": s["ad"],
                "gloss": s["gloss"],
            }
            for s in timeline
        ],
        "chat": [
            {"time": s["start"] + 0.4, "speaker": s["chat"][0], "text": s["chat"][1]}
            for s in timeline
        ],
    }
    (CONTENT / "lesson.json").write_text(json.dumps(lesson, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for name in ("lesson-en.wav", "lesson-am.wav", "captions-en.vtt", "captions-am.vtt", "descriptions.vtt"):
        shutil.copy(MEDIA / name, PACK / name)
    write_figure_svg()
    write_light_html(lesson)
    print(f"Lesson duration {clock:.1f}s, {len(timeline)} cues.")


if __name__ == "__main__":
    main()
