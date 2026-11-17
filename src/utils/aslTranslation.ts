import { glossText } from "../lib/api";
import { GLOSS_MODEL, signPanel } from "../embed/signs";

export type AslGloss = {
  gloss: string;
  /** precomputed: shipped file, corrected by hand. model / huggingface: the opted-in model ran on the service. offline: English words only. */
  source: "precomputed" | "model" | "huggingface" | "offline";
  label: string;
  note: string;
  model: string;
};

const OFFLINE_LABEL = "English words in capitals. No model is running.";

/**
 * English to ASL gloss. This is ASL, not Ethiopian Sign Language.
 * The six lesson captions come from the shipped gloss file. Anything else is asked of the
 * transcript service, which runs the model only when it is opted in. The browser never
 * downloads the model.
 */
export async function translateToASL(text: string): Promise<AslGloss> {
  const cleaned = text.trim();
  const local = signPanel(cleaned, "en");
  if (local.source === "precomputed") {
    return { gloss: local.gloss, source: "precomputed", label: "Corrected by hand from the shipped gloss file", note: local.note, model: GLOSS_MODEL };
  }
  const remote = await glossText(cleaned);
  if (remote?.gloss && (remote.source === "model" || remote.source === "huggingface")) {
    return {
      gloss: remote.gloss,
      source: remote.source,
      label: remote.source === "model" ? "Model output, run on the transcript service" : "Model output, from the Hugging Face Inference API",
      note: remote.message,
      model: remote.model,
    };
  }
  return { gloss: local.gloss, source: "offline", label: OFFLINE_LABEL, note: remote?.message ?? local.note, model: GLOSS_MODEL };
}
