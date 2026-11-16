import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechRecognitionError = "not-allowed" | "no-speech" | "audio-capture" | "other";

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
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
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

const SILENCE_MS = 1200;

function speechApi(): ISpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function readHeard(event: ISpeechRecognitionEvent): { finalText: string; interimText: string } {
  let finalText = "";
  let interimText = "";
  for (let i = event.resultIndex; i < event.results.length; i += 1) {
    const piece = event.results[i][0]?.transcript ?? "";
    if (event.results[i].isFinal) finalText += `${piece} `;
    else interimText += `${piece} `;
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
  const spokenRef = useRef("");
  const interimRef = useRef("");
  const sentRef = useRef(false);
  const silenceTimerRef = useRef<number | null>(null);
  const onFinalRef = useRef(options?.onFinal);
  const onInterimRef = useRef(options?.onInterim);

  onFinalRef.current = options?.onFinal;
  onInterimRef.current = options?.onInterim;

  const isSupported = speechApi() !== null;

  const heardSoFar = () => `${spokenRef.current} ${interimRef.current}`.trim();

  const clearSilence = () => {
    if (silenceTimerRef.current !== null) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  const emitFinal = useCallback((spoken: string) => {
    const text = spoken.trim();
    if (sentRef.current) return;
    sentRef.current = true;
    listeningRef.current = false;
    spokenRef.current = "";
    interimRef.current = "";
    clearSilence();
    setIsListening(false);
    setInterimTranscript("");
    if (text) onFinalRef.current?.(text);
  }, []);

  useEffect(() => {
    const API = speechApi();
    if (!API) return;

    const recognition = new API();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      listeningRef.current = true;
      setIsListening(true);
    };

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const { finalText, interimText } = readHeard(event);
      if (finalText) spokenRef.current = `${spokenRef.current} ${finalText}`.trim();
      interimRef.current = interimText;
      setTranscript(spokenRef.current);
      setInterimTranscript(interimText);
      onInterimRef.current?.(heardSoFar());
      clearSilence();
      silenceTimerRef.current = window.setTimeout(() => {
        silenceTimerRef.current = null;
        const spoken = heardSoFar();
        if (spoken) {
          try {
            recognition.stop();
          } catch {
            emitFinal(spoken);
          }
        }
      }, SILENCE_MS);
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      const code = event.error;
      if (code === "aborted") return;
      // Chrome often fires "network" and then onend. Keep any words we already heard.
      if (code === "network") {
        if (heardSoFar()) return;
        listeningRef.current = false;
        setIsListening(false);
        setError("other");
        return;
      }
      listeningRef.current = false;
      setIsListening(false);
      if (code === "not-allowed" || code === "service-not-allowed") {
        setError("not-allowed");
        return;
      }
      if (code === "audio-capture") {
        setError("audio-capture");
        return;
      }
      if (code === "no-speech") {
        setError("no-speech");
        return;
      }
      setError("other");
    };

    recognition.onend = () => {
      if (sentRef.current) {
        setIsListening(false);
        return;
      }
      emitFinal(heardSoFar());
    };

    recognitionRef.current = recognition;
    return () => {
      listeningRef.current = false;
      clearSilence();
      try {
        recognition.stop();
      } catch {
        /* already stopped */
      }
      recognitionRef.current = null;
    };
  }, [emitFinal]);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setError("other");
      return;
    }
    sentRef.current = false;
    spokenRef.current = "";
    interimRef.current = "";
    listeningRef.current = true;
    clearSilence();
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    setIsListening(true);
    try {
      recognition.start();
    } catch (err) {
      if (err instanceof DOMException && err.name === "InvalidStateError") {
        return;
      }
      listeningRef.current = false;
      setIsListening(false);
      setError("other");
    }
  }, []);

  const stopListening = useCallback(() => {
    const spoken = heardSoFar();
    listeningRef.current = false;
    clearSilence();
    setIsListening(false);
    try {
      recognitionRef.current?.stop();
    } catch {
      /* already stopped */
    }
    if (spoken) emitFinal(spoken);
  }, [emitFinal]);

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
