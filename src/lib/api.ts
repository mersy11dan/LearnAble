export type PipelineHealth = {
  hasab: boolean;
  huggingface: boolean;
  gemini?: boolean;
  asrModel: string;
  mtModel: string;
  captionModel: string;
  chatModel?: string;
};

export type TranslateResult = {
  source: "sample" | "hasab" | "huggingface" | "unavailable";
  translation: string | null;
  message: string;
};

export type ChatResult = {
  source: "gemini" | "saved" | "unavailable";
  reply: string | null;
  model: string;
  message: string;
};

export type GlossResult = {
  gloss: string | null;
  corrected?: string;
  source: "precomputed" | "model" | "huggingface" | "unavailable";
  precomputed: boolean;
  model: string;
  message: string;
};

export type ChatTurn = { role: "user" | "assistant"; content: string };

const base = import.meta.env.VITE_API_BASE ?? "";

/** The consent box on a page stores "yes" in sessionStorage. Nothing leaves the host before that. */
export function consentHeaders(): Record<string, string> {
  return typeof sessionStorage !== "undefined" && sessionStorage.getItem("learnable-consent") === "yes"
    ? { "X-LearnAble-Consent": "yes" }
    : {};
}

async function request<T>(path: string, init?: RequestInit, acceptStatus: number[] = []): Promise<T | null> {
  try {
    const response = await fetch(`${base}${path}`, {
      ...init,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok && !acceptStatus.includes(response.status)) return null;
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
    headers: { "Content-Type": "application/json", ...consentHeaders() },
    body: JSON.stringify({ text, source, target }),
  });
}

/** Support chat. A 403 means a key is set but consent was not sent, so its JSON is still returned. */
export function chat(message: string, context: string, history: ChatTurn[] = []): Promise<ChatResult | null> {
  return request<ChatResult>(
    "/api/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...consentHeaders() },
      body: JSON.stringify({ message, context, history }),
    },
    [403],
  );
}

/** English caption to ASL gloss. The service answers from the shipped file unless the model is opted in. */
export function glossText(text: string): Promise<GlossResult | null> {
  return request<GlossResult>("/api/gloss", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...consentHeaders() },
    body: JSON.stringify({ text, language: "en" }),
  });
}
