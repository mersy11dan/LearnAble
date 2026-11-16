/** Offline summary. The browser does not call an embedding or chat API. */

export async function generateASLSummary(videoText: string): Promise<string> {
  return getFallbackSummary(videoText);
}

function getFallbackSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0);
  if (sentences.length === 0) return "Video content available";
  if (sentences.length <= 2) return `${sentences.join(". ")}.`;
  const firstSentence = sentences[0].trim();
  const lastSentence = sentences[sentences.length - 1].trim();
  return `${firstSentence}. ${lastSentence}.`;
}

export async function generateVideoEmbedding(text: string): Promise<number[]> {
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(768).fill(0);
  words.forEach((word) => {
    const hash = word.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
    embedding[Math.abs(hash) % embedding.length] += 1;
  });
  const magnitude = Math.sqrt(embedding.reduce((sum: number, value: number) => sum + value * value, 0));
  if (magnitude > 0) return embedding.map((value: number) => value / magnitude);
  return embedding;
}
