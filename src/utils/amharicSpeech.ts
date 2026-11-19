import { useState, useEffect, useCallback, useRef } from "react";

interface AmharicSpeechHook {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function getVoiceForLanguage(lang: "en" | "am"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  
  if (lang === "am") {
    const amharicVoice = voices.find(v => 
      v.lang.startsWith("am") || 
      v.lang.includes("ET") ||
      v.name.includes("Amharic")
    );
    if (amharicVoice) return amharicVoice;
    
    const ethiopianVoice = voices.find(v => 
      v.lang.includes("ET") || 
      v.name.includes("Ethiopia")
    );
    if (ethiopianVoice) return ethiopianVoice;
  }
  
  const fallbackVoice = voices.find(v => v.lang.startsWith(lang));
  return fallbackVoice || voices[0] || null;
}

async function fetchHasabSpeech(text: string, language: "en" | "am"): Promise<Blob | null> {
  try {
    const response = await fetch(`${API_BASE}/speak`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-LearnAble-Consent": "yes",
      },
      body: JSON.stringify({ text, language }),
    });

    if (response.ok && response.headers.get("content-type")?.includes("audio")) {
      return await response.blob();
    }
    
    return null;
  } catch (error) {
    console.warn("Hasab speech synthesis failed, falling back to browser TTS:", error);
    return null;
  }
}

export function useAmharicSpeech(language: "en" | "am" = "am"): AmharicSpeechHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceQueueRef = useRef<string[]>([]);
  const isProcessingRef = useRef(false);

  const isSupported = 
    typeof window !== "undefined" && 
    "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", () => {
        window.speechSynthesis.getVoices();
      });
    }

    return () => {
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isSupported]);

  const processNextInQueue = useCallback(() => {
    if (!isSupported || isProcessingRef.current || utteranceQueueRef.current.length === 0) {
      return;
    }

    const text = utteranceQueueRef.current.shift();
    if (!text) return;

    isProcessingRef.current = true;

    const speakWithBrowserTTS = (textToSpeak: string) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      const voice = getVoiceForLanguage(language);
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = language === "am" ? "am-ET" : "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        isProcessingRef.current = false;
        processNextInQueue();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsSpeaking(false);
        isProcessingRef.current = false;
        processNextInQueue();
      };

      window.speechSynthesis.speak(utterance);
    };

    const speakText = async () => {
      if (!text) {
        isProcessingRef.current = false;
        return;
      }

      setIsSpeaking(true);

      if (language === "am") {
        const audioBlob = await fetchHasabSpeech(text, language);
        if (audioBlob) {
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audioRef.current = audio;

          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            setIsSpeaking(false);
            isProcessingRef.current = false;
            processNextInQueue();
          };

          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            speakWithBrowserTTS(text);
          };

          try {
            await audio.play();
            return;
          } catch (error) {
            console.warn("Audio playback failed, falling back to browser TTS:", error);
            URL.revokeObjectURL(audioUrl);
          }
        }
      }

      speakWithBrowserTTS(text);
    };

    void speakText();
  }, [isSupported, language]);

  const speak = useCallback((text: string) => {
    if (!isSupported || !text) return;

    utteranceQueueRef.current.push(text);
    processNextInQueue();
  }, [isSupported, processNextInQueue]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    utteranceQueueRef.current = [];
    isProcessingRef.current = false;
    setIsSpeaking(false);
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
}
