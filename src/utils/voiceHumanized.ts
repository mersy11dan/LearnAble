import { useState, useEffect } from "react";

interface VoiceOptions {
  lang: "en" | "am";
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface HumanizedVoice {
  speak: (text: string, options?: VoiceOptions) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

const VOICE_CACHE = new Map<string, SpeechSynthesisVoice>();

export function useHumanizedVoice(): HumanizedVoice {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      availableVoices.forEach(voice => {
        VOICE_CACHE.set(`${voice.lang}-${voice.name}`, voice);
      });
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const selectBestVoice = (lang: "en" | "am"): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null;

    if (lang === "am") {
      const amharicVoices = voices.filter(v => 
        v.lang.includes("am") || 
        v.lang.includes("AM") ||
        v.lang.includes("et") || // Ethiopian
        v.name.toLowerCase().includes("amharic") ||
        v.name.toLowerCase().includes("ethiop")
      );

      if (amharicVoices.length > 0) {
        const googleVoice = amharicVoices.find(v => v.name.includes("Google"));
        if (googleVoice) return googleVoice;
        return amharicVoices[0];
      }

      const africanVoices = voices.filter(v =>
        v.lang.includes("af") || // Afrikaans - closer to Ethiopian accent
        v.lang.includes("sw") || // Swahili
        v.name.toLowerCase().includes("africa")
      );
      
      if (africanVoices.length > 0) return africanVoices[0];
    }

    if (lang === "en") {
      const naturalVoices = voices.filter(v =>
        (v.lang.startsWith("en") || v.lang === "en-US") &&
        (v.name.includes("Natural") ||
         v.name.includes("Enhanced") ||
         v.name.includes("Premium") ||
         v.name.includes("Neural"))
      );

      if (naturalVoices.length > 0) {
        const femaleVoice = naturalVoices.find(v => 
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("zira")
        );
        if (femaleVoice) return femaleVoice;
        return naturalVoices[0];
      }

      const googleEnglish = voices.find(v => 
        v.lang.startsWith("en") && v.name.includes("Google")
      );
      if (googleEnglish) return googleEnglish;

      const anyEnglish = voices.find(v => v.lang.startsWith("en"));
      return anyEnglish || null;
    }

    return null;
  };

  const speak = (text: string, options: VoiceOptions = { lang: "en" }) => {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = selectBestVoice(options.lang);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = options.lang === "am" ? "am-ET" : "en-US";
    
    if (options.lang === "am") {
      utterance.rate = options.rate ?? 0.85;
      utterance.pitch = options.pitch ?? 1.1;
      utterance.volume = options.volume ?? 1.0;
    } else {
      utterance.rate = options.rate ?? 0.95;
      utterance.pitch = options.pitch ?? 1.05;
      utterance.volume = options.volume ?? 1.0;
    }

    const prosodyVariations = [0, 0.05, -0.05, 0.03, -0.03];
    let wordIndex = 0;
    
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const variation = prosodyVariations[wordIndex % prosodyVariations.length];
        wordIndex++;
      }
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error speaking:", error);
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
}

export async function speakWithCache(
  text: string,
  lang: "en" | "am" = "en"
): Promise<void> {
  const cacheKey = `tts-${lang}-${text.substring(0, 50)}`;
  
  try {
    const cache = await caches.open("pocket-sign-tts");
    const cached = await cache.match(cacheKey);
    
    if (cached) {
      const audioBlob = await cached.blob();
      const audio = new Audio(URL.createObjectURL(audioBlob));
      await audio.play();
      return;
    }
  } catch (error) {
    console.warn("TTS cache unavailable:", error);
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "am" ? "am-ET" : "en-US";
    utterance.rate = lang === "am" ? 0.85 : 0.95;
    utterance.pitch = lang === "am" ? 1.1 : 1.05;
    window.speechSynthesis.speak(utterance);
  }
}
