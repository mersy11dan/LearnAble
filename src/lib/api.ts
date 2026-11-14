export type PipelineHealth = {
  hasab: boolean;
  huggingface: boolean;
  asrModel: string;
  mtModel: string;
  captionModel: string;
};

export type TranslateResult = {
  source: "sample" | "hasab" | "huggingface" | "unavailable";
  translation: string | null;
  message: string;
};

const base = import.meta.env.VITE_API_BASE ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${base}${path}`, {
      ...init,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function getHealth(): Promise<PipelineHealth | null> {
  return request<PipelineHealth>("/api/health");
}

export function translateText(text: string, source: "en" | "am", target: "en" | "am"): Promise<TranslateResult | null> {
  return request<TranslateResult>("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(typeof sessionStorage !== "undefined" && sessionStorage.getItem("learnable-consent") === "yes"
        ? { "X-LearnAble-Consent": "yes" }
        : {}),
    },
    body: JSON.stringify({ text, source, target }),
  });
}
