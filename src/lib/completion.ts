const KEY = "learnable-lesson-complete";

function read(): Record<string, boolean> {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "{}") as Record<string, boolean>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function isLessonComplete(id: string): boolean {
  return read()[id] === true;
}

export function markLessonComplete(id: string): void {
  try {
    const current = read();
    current[id] = true;
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* The lesson can still finish when storage is blocked. */
  }
}
