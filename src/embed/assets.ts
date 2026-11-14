let scriptBase = "";
let configuredBase = "";

export function rememberScript(script: HTMLScriptElement | null): void {
  if (script?.src) scriptBase = new URL(".", script.src).href;
}

export function setAssetBase(value: string | undefined): void {
  if (!value) return;
  configuredBase = new URL(value, document.baseURI).href;
  if (!configuredBase.endsWith("/")) configuredBase += "/";
}

export function assetBase(): string {
  if (configuredBase) return configuredBase;
  if (scriptBase) return scriptBase;
  return new URL("/", document.baseURI).href;
}

export function resolveUrl(value: string): string {
  if (!value || value === "false") return value;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("/")) return new URL(value, document.baseURI).href;
  return new URL(value, assetBase()).href;
}
