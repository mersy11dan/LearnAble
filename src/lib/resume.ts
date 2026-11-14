const KEY = "learnable-resume";

export function rememberLesson(id: string): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* private mode */
  }
}

export function rememberedLesson(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
