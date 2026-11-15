import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechRecognitionError = "not-allowed" | "no-speech" | "audio-capture" | "network" | "aborted" | "other";

interface SpeechRecognitionHook {
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  interimTranscript: string;
  error: SpeechRecognitionError | null;
  isSupported: boolean;
  isListening: boolean;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: ISpeechRecognition) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface ISpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface ISpeechRecognitionResultList {
  length: number;
  item(index: number): ISpeechRecognitionResult;
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): ISpeechRecognitionAlternative;
  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognitionConstructor;
    webkitSpeechRecognition: ISpeechRecognitionConstructor;
  }
}

function classifyError(code: string): SpeechRecognitionError {
  if (code === "not-allowed" || code === "service-not-allowed") return "not-allowed";
  if (code === "no-speech") return "no-speech";
  if (code === "audio-capture") return "audio-capture";
  if (code === "network") return "network";
  if (code === "aborted") return "aborted";
  return "other";
}

function readResults(event: ISpeechRecognitionEvent): { finalText: string; interimText: string } {
  let finalText = "";
  let interimText = "";
  for (let i = 0; i < event.results.length; i += 1) {
    const piece = event.results[i][0]?.transcript ?? "";
    if (event.results[i].isFinal) finalText += piece;
    else interimText += piece;
  }
  return { finalText: finalText.trim(), interimText: interimText.trim() };
}

export function useSpeechRecognition(options?: {
  onFinal?: (text: string) => void;
  onInterim?: (text: string) => void;
}): SpeechRecognitionHook {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<SpeechRecognitionError | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const listeningRef = useRef(false);
  const cancelledRef = useRef(false);
  const finalRef = useRef("");
  const startTimerRef = useRef<number | null>(null);
  const onFinalRef = useRef(options?.onFinal);
  const onInterimRef = useRef(options?.onInterim);

  onFinalRef.current = options?.onFinal;
  onInterimRef.current = options?.onInterim;

  const isSupported =
    typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const { finalText, interimText } = readResults(event);
      if (finalText) finalRef.current = finalText;
      setTranscript(finalText);
      setInterimTranscript(interimText);
      onInterimRef.current?.(interimText || finalText);
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      const kind = classifyError(event.error);
      if (kind === "aborted") return;
      setError(kind);
      listeningRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      listeningRef.current = false;
      setIsListening(false);
      setInterimTranscript("");
      const spoken = finalRef.current.trim();
      if (!cancelledRef.current && spoken) onFinalRef.current?.(spoken);
    };

    return () => {
      cancelledRef.current = true;
      if (startTimerRef.current !== null) window.clearTimeout(startTimerRef.current);
      try {
        recognition.abort();
      } catch {
        /* already stopped */
      }
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    cancelledRef.current = true;
    finalRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    try {
      recognition.abort();
    } catch {
      /* ignore */
    }
    if (startTimerRef.current !== null) window.clearTimeout(startTimerRef.current);
    startTimerRef.current = window.setTimeout(() => {
      cancelledRef.current = false;
      listeningRef.current = true;
      setIsListening(true);
      try {
        recognition.start();
      } catch {
        listeningRef.current = false;
        setIsListening(false);
        setError("other");
      }
    }, 40);
  }, []);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    cancelledRef.current = true;
    listeningRef.current = false;
    setIsListening(false);
    setInterimTranscript("");
    if (startTimerRef.current !== null) window.clearTimeout(startTimerRef.current);
    try {
      recognition?.abort();
    } catch {
      /* ignore */
    }
  }, []);

  return {
    startListening,
    stopListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    isListening,
  };
}
