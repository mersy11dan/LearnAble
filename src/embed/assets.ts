let scriptBase = "";
let configuredBase = "";

export function rememberScript(script: HTMLScriptElement | null): void {
  if (script?.src) scriptBase = new URL(".", script.src).href;
}

export function rememberModule(url: string | undefined): void {
  if (scriptBase || !url) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return;
    scriptBase = new URL(".", parsed).href;
  } catch {
    /* A test runner may pass a file URL. The page origin is the fallback. */
  }
}

export function resetAssetBase(): void {
  scriptBase = "";
  configuredBase = "";
}

export function setAssetBase(value: string | undefined): void {
  if (!value) return;
  configuredBase = new URL(value, scriptBase || `${location.origin}/`).href;
  if (!configuredBase.endsWith("/")) configuredBase += "/";
}

export function assetBase(): string {
  if (configuredBase) return configuredBase;
  if (scriptBase) return scriptBase;
  return `${location.origin}/`;
}

export function resolveUrl(value: string): string {
  if (!value || value === "false") return value;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  const base = assetBase();
  if (value.startsWith("/")) return new URL(value, new URL(base).origin).href;
  return new URL(value, base).href;
}
