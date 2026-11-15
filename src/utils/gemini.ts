import { chat, type ChatTurn } from "../lib/api";

export type ChatAnswer = {
  text: string;
  /** "gemini" when a model answered through the transcript service. "saved" is a fixed answer written by hand. */
  source: "gemini" | "saved";
  model?: string;
  note: string;
};

const OFFLINE_NOTE = "The transcript service is not running. This is a saved answer. No model is running.";

/**
 * The key for Gemini lives on the transcript service, never in this bundle.
 * The service only calls Google after the consent box is ticked.
 */
export async function generateResponse(userMessage: string, context: string, history: ChatTurn[] = []): Promise<ChatAnswer> {
  const result = await chat(userMessage, context, history);
  if (result?.source === "gemini" && result.reply) {
    return { text: result.reply, source: "gemini", model: result.model, note: result.message };
  }
  return { text: getFallbackResponse(userMessage), source: "saved", note: result?.message ?? OFFLINE_NOTE };
}

function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes("caption") || message.includes("subtitle")) {
    return "LearnAble supports captions in both English and Amharic. You can toggle captions using the 'C' key or the caption button in the player controls. Captions are displayed in an accessible format with customizable size and color through the toolbar.";
  }

  if (message.includes("sign") || message.includes("asl")) {
    return "LearnAble includes a sign language interpretation window. Press 'S' to toggle the sign window, and use arrow keys to reposition it. The window has Smaller and Larger buttons for adjusting its size without needing a mouse.";
  }

  if (message.includes("audio description") || message.includes("audio descriptions")) {
    return "Audio descriptions provide spoken narration of visual content. Press 'D' to toggle audio descriptions. This feature helps users who are blind or have low vision understand the visual elements of the lesson.";
  }

  if (message.includes("offline") || message.includes("download") || message.includes("3g")) {
    return "LearnAble offers offline packs for low-bandwidth scenarios. You can download a 3G-optimized pack that includes audio, text, and lightweight HTML versions of the content. Navigate to the Offline page to download the pack.";
  }

  if (message.includes("certificate") || message.includes("verify") || message.includes("badge")) {
    return "You can verify certificates through the Verify page. LearnAble uses Open Badges 3.0 signatures. The certificate includes both Gregorian and Ethiopian calendar dates and can be verified directly in your browser.";
  }

  if (message.includes("keyboard") || message.includes("shortcut")) {
    return "LearnAble is fully keyboard accessible. Common shortcuts:\n• Tab/Shift+Tab: Navigate\n• Space or K: Play/Pause\n• C: Toggle captions\n• D: Audio description\n• S: Sign window\n• Arrow keys: Seek or move sign window\n• H/Shift+H: Jump between headings\n• ?: Show all shortcuts";
  }

  if (message.includes("accessibility") || message.includes("contrast") || message.includes("large text")) {
    return "LearnAble includes an accessibility toolbar with:\n• Larger Text: Increases font size by 25%\n• High Contrast: Black, white, and yellow color scheme\n• Stop Motion: Reduces or eliminates animations\n\nThese settings are saved in your browser and work across all pages.";
  }

  return "I did not match that to a saved answer. Say a page such as sessions, jobs, lesson, or pack. Or ask how captions, audio description, or keyboard shortcuts work.";
}
