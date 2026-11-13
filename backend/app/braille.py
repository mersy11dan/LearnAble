"""Grade-1 English Braille (BRF) — enough for transcripts and job cards.

Ethiopic script is not mapped here. Amharic lessons export phonetic English
plus a note so a refreshable display is not fed garbage cells.
"""

from __future__ import annotations

LETTER = {
    "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑", "f": "⠋",
    "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚", "k": "⠅", "l": "⠇",
    "m": "⠍", "n": "⠝", "o": "⠕", "p": "⠏", "q": "⠟", "r": "⠗",
    "s": "⠎", "t": "⠞", "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭",
    "y": "⠽", "z": "⠵",
}
DIGIT = {str(i): ch for i, ch in enumerate("⠚⠁⠃⠉⠙⠑⠋⠛⠓⠊")}
PUNCT = {",": "⠂", ".": "⠲", "?": "⠦", "!": "⠖", ";": "⠆", ":": "⠒", "-": "⠤", "'": "⠄"}
NUMBER_SIGN = "⠼"
CAPITAL = "⠠"
SPACE = " "


def to_unicode_braille(text: str) -> str:
    out: list[str] = []
    number_mode = False
    for ch in text:
        if ch.isdigit():
            if not number_mode:
                out.append(NUMBER_SIGN)
                number_mode = True
            out.append(DIGIT[ch])
            continue
        number_mode = False
        if ch == "\n":
            out.append("\n")
            continue
        if ch == " ":
            out.append(SPACE)
            continue
        if ch.isalpha():
            if ch.isupper():
                out.append(CAPITAL)
            out.append(LETTER.get(ch.lower(), ch))
            continue
        out.append(PUNCT.get(ch, "⠄"))
    return "".join(out)


def to_brf(text: str) -> str:
    """ASCII Braille (BRF) using dots 1-6 as a-z mapping used by many embossers."""
    table = " a1b'k2l@cif/msp\"e3h9o6r^djg>ntq,*5<-u8v.%[$+x!&;:4\\0z7(_?w]#y)="
    unicode_brl = to_unicode_braille(text)
    mapped: list[str] = []
    for ch in unicode_brl:
        if ch == "\n":
            mapped.append("\n")
            continue
        if ch == " ":
            mapped.append(" ")
            continue
        code = ord(ch) - 0x2800
        if 0 <= code < len(table):
            mapped.append(table[code])
        else:
            mapped.append("#")
    header = "LearnAble BRF export — Grade 1 English\nSimBraille follows. Amharic is transliterated.\n\n"
    return header + "".join(mapped)
