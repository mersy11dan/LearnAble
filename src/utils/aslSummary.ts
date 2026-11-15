import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export async function generateASLSummary(videoText: string): Promise<string> {
  if (!genAI) {
    return getFallbackSummary(videoText);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Summarize the following video content in simple, clear language suitable for ASL (American Sign Language) interpretation. Keep it concise (2-3 sentences) and focus on the main points:

${videoText}

Provide a brief, accessible summary:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Summary generation error:", error);
    return getFallbackSummary(videoText);
  }
}

function getFallbackSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) {
    return "Video content available";
  }
  
  if (sentences.length <= 2) {
    return sentences.join(". ") + ".";
  }
  
  const firstSentence = sentences[0].trim();
  const lastSentence = sentences[sentences.length - 1].trim();
  
  return `${firstSentence}. ${lastSentence}.`;
}

export async function generateVideoEmbedding(text: string): Promise<number[]> {
  if (!genAI) {
    return generateSimpleEmbedding(text);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Embedding generation error:", error);
    return generateSimpleEmbedding(text);
  }
}

function generateSimpleEmbedding(text: string): number[] {
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(768).fill(0);
  
  words.forEach((word) => {
    const hash = word.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const position = Math.abs(hash) % embedding.length;
    embedding[position] += 1;
  });
  
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    return embedding.map(val => val / magnitude);
  }
  
  return embedding;
}
