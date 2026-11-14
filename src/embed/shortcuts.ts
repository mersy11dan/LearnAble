export function typingTarget(event: KeyboardEvent): boolean {
  return event.composedPath().some((node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.isContentEditable) return true;
    return node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.tagName === "SELECT";
  });
}

export function inPlayer(event: KeyboardEvent): boolean {
  return event.composedPath().some((node) => node instanceof HTMLElement && node.tagName === "LEARNABLE-PLAYER");
}

export function matchesChar(event: KeyboardEvent, spec: string): boolean {
  if (event.altKey || event.ctrlKey || event.metaKey) return false;
  if (spec === "?") return event.key === "?";
  return event.key.toLowerCase() === spec.toLowerCase();
}

export function matchesChord(event: KeyboardEvent, spec: string): boolean {
  const parts = spec.split("+").map((part) => part.trim().toLowerCase()).filter(Boolean);
  if (parts.length === 0) return false;
  const key = parts[parts.length - 1];
  const needAlt = parts.includes("alt");
  const needShift = parts.includes("shift");
  const needCtrl = parts.includes("ctrl") || parts.includes("control");
  if (needAlt !== event.altKey) return false;
  if (needShift !== event.shiftKey) return false;
  if (needCtrl !== (event.ctrlKey || event.metaKey)) return false;
  return event.key.toLowerCase() === key;
}
