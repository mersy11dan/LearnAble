import { useState, useEffect } from "react";

interface SpeechSynthesisHook {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

export function useSpeechSynthesis(): SpeechSynthesisHook {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = typeof window !== "undefined" && 
    "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    const handleEnd = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.addEventListener("end", handleEnd);

    return () => {
      window.speechSynthesis.removeEventListener("end", handleEnd);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const speak = (text: string) => {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

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

    window.speechSynthesis.speak(utterance);
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
