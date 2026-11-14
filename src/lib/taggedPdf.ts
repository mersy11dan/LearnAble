export type TaggedPdfInput = {
  title: string;
  paragraphs: string[];
  figureAlt: string;
};

function pdfText(value: string): string {
  const ascii = value.replace(/[^\t\n\r\x20-\x7E]/g, "?");
  return ascii.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, size: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (!line) line = word;
    else if (line.length + 1 + word.length <= size) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

export function buildTaggedPdf(input: TaggedPdfInput): Uint8Array {
  const blocks: { tag: "H1" | "P" | "Figure"; text: string }[] = [
    { tag: "H1", text: input.title },
    ...input.paragraphs.map((text) => ({ tag: "P" as const, text })),
    { tag: "Figure", text: input.figureAlt },
  ];

  const content: string[] = [];
  let y = 740;
  blocks.forEach((block, mcid) => {
    if (block.tag === "Figure") {
      content.push(`/Figure <</MCID ${mcid}>> BDC`);
      content.push("0.106 0.188 0.282 RG");
      content.push(`56 ${Math.max(72, y - 64)} 180 56 re S`);
      content.push("EMC");
      return;
    }
    const fontSize = block.tag === "H1" ? 18 : 12;
    const leading = fontSize + 4;
    const lines = wrap(block.text, block.tag === "H1" ? 58 : 86);
    content.push(`/${block.tag} <</MCID ${mcid}>> BDC`);
    content.push("BT");
    content.push(`/F1 ${fontSize} Tf`);
    content.push(`1 0 0 1 56 ${y} Tm`);
    lines.forEach((line, index) => {
      if (index > 0) content.push(`0 -${leading} Td`);
      content.push(`(${pdfText(line)}) Tj`);
    });
    content.push("ET");
    content.push("EMC");
    y -= lines.length * leading + 12;
  });
  const stream = content.join("\n");

  const structKids = blocks.map((_, index) => `${8 + index} 0 R`).join(" ");
  const parentKids = blocks.map((_, index) => `${8 + index} 0 R`).join(" ");
  const parentTreeId = 8 + blocks.length;
  const infoId = parentTreeId + 1;

  const objects: string[] = [];
  const add = (body: string) => {
    objects.push(body);
  };

  add(
    "<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>",
  );
  add(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${parentTreeId} 0 R >>`);
  add("<< /Type /Pages /Count 1 /Kids [4 0 R] >>");
  add(
    "<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>",
  );
  add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  add(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${structKids}] >>`);

  blocks.forEach((block, index) => {
    const alt = block.tag === "Figure" ? ` /Alt (${pdfText(input.figureAlt)})` : "";
    add(
      `<< /Type /StructElem /S /${block.tag} /P 7 0 R /Pg 4 0 R${alt} /K << /Type /MCR /Pg 4 0 R /MCID ${index} >> >>`,
    );
  });
  add(`<< /Nums [ 0 [${parentKids}] ] >>`);
  add(`<< /Title (${pdfText(input.title)}) /Author (LearnAble) >>`);

  let output = "%PDF-1.7\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(output.length);
    output += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefAt = output.length;
  output += `xref\n0 ${objects.length + 1}\n`;
  output += "0000000000 65535 f \n";
  for (let index = 1; index < offsets.length; index += 1) {
    output += `${offsets[index].toString().padStart(10, "0")} 00000 n \n`;
  }
  output += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${infoId} 0 R >>\n`;
  output += `startxref\n${xrefAt}\n%%EOF`;
  return new TextEncoder().encode(output);
}
