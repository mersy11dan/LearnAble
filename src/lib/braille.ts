import tableSource from "../../vendor/liblouis/ethio-g1.ctb?raw";

/**
 * North American Braille ASCII, index = 6-dot pattern.
 * Dot 1 is bit 0. Letters are the uppercase ASCII characters defined by the code.
 * The Ethiopic cell assignments are read from the liblouis table (LGPL-2.1),
 * copyright Dr. Tamru E. Belay and Mesar Hameed. See vendor/liblouis/ethio-g1.ctb.
 */
export const BRAILLE_ASCII =
  " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";

const DIGITS = "JABCDEFGHI";

const PRINT_PUNCTUATION: Record<string, string> = {
  ".": "4",
  ",": "1",
  "?": "8",
  "!": "6",
  "'": "'",
  "-": "-",
  ":": "3",
  ";": "2",
};

export function bitsToAscii(bits: number): string {
  if (bits < 0 || bits > 63) return "?";
  return BRAILLE_ASCII[bits] ?? "?";
}

function dotsToBits(token: string): number {
  let bits = 0;
  for (const character of token) {
    const dot = Number(character);
    if (dot >= 1 && dot <= 6) bits |= 1 << (dot - 1);
  }
  return bits;
}

function loadEthiopic(source: string): Map<number, number[]> {
  const table = new Map<number, number[]>();
  for (const line of source.split(/\r?\n/)) {
    const match = /^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(line.trim());
    if (!match) continue;
    const codePoint = Number.parseInt(match[1], 16);
    table.set(codePoint, match[2].split("-").map(dotsToBits));
  }
  return table;
}

const ETHIOPIC = loadEthiopic(tableSource);

export function ethiopicCellCount(): number {
  return ETHIOPIC.size;
}

export function toBrailleCells(text: string): string {
  let output = "";
  let numbering = false;

  for (const character of text) {
    const codePoint = character.codePointAt(0) ?? 0;
    const ethiopic = ETHIOPIC.get(codePoint);
    if (ethiopic) {
      numbering = false;
      output += ethiopic.map(bitsToAscii).join("");
      continue;
    }
    if (character === "\n") {
      numbering = false;
      output += "\n";
      continue;
    }
    if (character === " ") {
      numbering = false;
      output += " ";
      continue;
    }
    if (/[0-9]/.test(character)) {
      if (!numbering) {
        output += "#";
        numbering = true;
      }
      output += DIGITS[Number(character)];
      continue;
    }
    numbering = false;
    if (/[a-z]/.test(character)) {
      output += character.toUpperCase();
      continue;
    }
    if (/[A-Z]/.test(character)) {
      output += `,${character}`;
      continue;
    }
    output += PRINT_PUNCTUATION[character] ?? "?";
  }
  return output;
}

export function toBrf(text: string, width = 40): string {
  const cells = toBrailleCells(text);
  const lines: string[] = [];
  for (const paragraph of cells.split("\n")) {
    const words = paragraph.split(" ");
    let line = "";
    for (const word of words) {
      if (!line) {
        line = word;
        continue;
      }
      if (line.length + 1 + word.length <= width) {
        line += ` ${word}`;
      } else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
  }
  return `${lines.join("\n")}\n`;
}
