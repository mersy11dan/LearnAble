"""Tagged lesson PDF with English in Helvetica and Amharic in Noto Sans Ethiopic.

fpdf2 embeds the TrueType font and writes a ToUnicode map, so the Amharic can be
copied back out. The structure tree marks the title, the paragraphs, and the
figure alternative.
"""

from __future__ import annotations

import json
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
FONT = ROOT / "public" / "fonts" / "NotoSansEthiopic-Regular.ttf"
LESSON = ROOT / "src" / "content" / "lesson.json"


def build_lesson_pdf(lesson: dict | None = None) -> bytes:
    lesson = lesson if lesson is not None else json.loads(LESSON.read_text(encoding="utf-8"))
    pdf = FPDF(unit="pt", format="letter")
    pdf.set_title(lesson["title"])
    pdf.set_lang("mul")
    pdf.set_margin(56)
    pdf.add_page()
    pdf.add_font("Noto", fname=str(FONT))

    def marked(tag: str, text: str, font: str, size: int, alt: str | None = None) -> None:
        mcid = pdf.struct_builder.next_mcid_for_page(pdf.page)
        pdf._add_marked_content(struct_type=tag, mcid=mcid, alt_text=alt)
        pdf._out(f"{tag} <</MCID {mcid}>> BDC")
        pdf.set_font(font, size=size)
        pdf.multi_cell(w=pdf.epw, h=size + 6, text=text, new_x="LMARGIN", new_y="NEXT")
        pdf._out("EMC")

    marked("/H1", lesson["title"], "Helvetica", 18)
    for segment in lesson["segments"]:
        marked("/P", segment["en"], "Helvetica", 12)
        marked("/P", segment["am"], "Noto", 14)
        marked("/P", f"Picture: {segment['ad']}", "Helvetica", 12)
    mcid = pdf.struct_builder.next_mcid_for_page(pdf.page)
    pdf._add_marked_content(struct_type="/Figure", mcid=mcid, alt_text=lesson["figure"]["alt"])
    pdf._out(f"/Figure <</MCID {mcid}>> BDC")
    pdf.rect(pdf.l_margin, pdf.get_y(), 180, 56)
    pdf._out("EMC")
    pdf.ln(68)
    marked("/P", lesson["figure"]["long"], "Helvetica", 12)
    return bytes(pdf.output())


if __name__ == "__main__":
    payload = build_lesson_pdf()
    for relative in ("public/media/learnable-lesson.pdf", "public/packs/demo/lesson.pdf"):
        target = ROOT / relative
        target.write_bytes(payload)
        print(f"wrote {target} ({len(payload)} bytes)")
