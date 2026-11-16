const BLOCKED = new Set(["__proto__", "constructor", "prototype"]);

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function ownData(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return Object.create(null);
  const out: Record<string, unknown> = Object.create(null);
  for (const key of Object.keys(value as object)) {
    if (BLOCKED.has(key)) continue;
    out[key] = (value as Record<string, unknown>)[key];
  }
  return out;
}

const allowedOrigins = new Set<string>();

export function allowOrigin(value: string): void {
  try {
    allowedOrigins.add(new URL(value, location.href).origin);
  } catch {
    /* An unparseable base is not added. */
  }
}

export function resetAllowlist(): void {
  allowedOrigins.clear();
}

export function isAllowedRequest(input: string): boolean {
  let url: URL;
  try {
    url = new URL(input, location.href);
  } catch {
    return false;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (url.origin === location.origin) return true;
  return allowedOrigins.has(url.origin);
}

export async function safeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const raw = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!isAllowedRequest(raw)) {
    throw new Error("Blocked a request to an origin that is not this page or the configured LearnAble base.");
  }
  return fetch(input, init);
}
