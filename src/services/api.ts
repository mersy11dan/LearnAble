const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export class PocketSignAPI {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 3600000; // 1 hour

  private static getCacheKey(endpoint: string, data?: any): string {
    return `${endpoint}-${JSON.stringify(data)}`;
  }

  private static getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  private static setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static async translateToASL(text: string): Promise<string> {
    const cacheKey = this.getCacheKey("/api/translate", { text });
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached.asl;
    }

    try {
      const response = await fetch(`${API_BASE}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source_lang: "en", target: "asl" }),
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      this.setCache(cacheKey, data);
      return data.asl;
    } catch (error) {
      console.error("API translation error:", error);
      // Fallback
      return text.toUpperCase().split(/\s+/).filter(w => 
        !["THE", "A", "AN", "IS", "ARE", "AM"].includes(w)
      ).join(" ");
    }
  }

  static async generateSummary(videoId: string, text: string, duration?: number): Promise<string> {
    const cacheKey = this.getCacheKey("/api/summary", { videoId, text });
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached.summary;
    }

    try {
      const response = await fetch(`${API_BASE}/api/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_id: videoId, text, duration }),
      });

      if (!response.ok) throw new Error("Summary generation failed");

      const data = await response.json();
      this.setCache(cacheKey, data);
      return data.summary;
    } catch (error) {
      console.error("API summary error:", error);
      // Fallback
      const sentences = text.split(/[.!?]+/).filter(s => s.trim());
      return sentences.slice(0, 2).join(". ") + ".";
    }
  }

  static async generateEmbedding(text: string): Promise<number[]> {
    const cacheKey = this.getCacheKey("/api/embed", { text });
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached.embedding;
    }

    try {
      const response = await fetch(`${API_BASE}/api/embed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model: "gemini" }),
      });

      if (!response.ok) throw new Error("Embedding generation failed");

      const data = await response.json();
      this.setCache(cacheKey, data);
      return data.embedding;
    } catch (error) {
      console.error("API embedding error:", error);
      return [];
    }
  }

  static async chat(message: string, context?: any[], videoId?: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context, video_id: videoId }),
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("API chat error:", error);
      return "I'm here to help! Please try again or check your connection.";
    }
  }

  static async getCacheStats() {
    try {
      const response = await fetch(`${API_BASE}/api/cache/stats`);
      if (!response.ok) throw new Error("Failed to get cache stats");
      return await response.json();
    } catch (error) {
      console.error("API cache stats error:", error);
      return { total_entries: 0, valid_entries: 0, expired_entries: 0 };
    }
  }

  static clearLocalCache() {
    this.cache.clear();
  }
}
