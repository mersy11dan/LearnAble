export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, lang: string, rate = 1): void {
  if (!canSpeak() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = Math.min(2, Math.max(0.5, rate));
  const prefix = lang.toLowerCase().slice(0, 2);
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith(prefix));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}
