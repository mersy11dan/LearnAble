import { useEffect } from "react";
import { useSpeechRecognition } from "../../utils/speechRecognition";

const ERROR_COPY = {
  "not-allowed": "Microphone is blocked. Allow it in the browser, then tap the mic again.",
  "no-speech": "I did not catch that. Tap the mic and try again.",
  "audio-capture": "No microphone found.",
  network: "Voice search needs a network connection.",
  aborted: "",
  other: "Voice search could not start. Tap the mic and try again.",
} as const;

interface VoiceControlProps {
  onVoiceInput: (text: string) => void;
  onDraft?: (text: string) => void;
  onListening?: (listening: boolean) => void;
  disabled?: boolean;
}

export function VoiceControl({ onVoiceInput, onDraft, onListening, disabled }: VoiceControlProps) {
  const { startListening, stopListening, interimTranscript, error, isSupported, isListening } = useSpeechRecognition({
    onFinal: onVoiceInput,
    onInterim: onDraft,
  });

  useEffect(() => {
    onListening?.(isListening);
    if (!isListening) onDraft?.("");
  }, [isListening, onListening, onDraft]);

  if (!isSupported) {
    return (
      <p className="voice-unsupported" role="status">
        Voice search is not available in this browser. Type a page name instead.
      </p>
    );
  }

  const handleToggle = () => {
    if (isListening) {
      stopListening();
      onDraft?.("");
    } else {
      onDraft?.("");
      startListening();
    }
  };

  const errorText = error && error !== "aborted" ? ERROR_COPY[error] : "";

  return (
    <div className="voice-control-container">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`voice-control-btn ${isListening ? "listening" : ""}`}
        aria-label={isListening ? "Stop voice search" : "Search by voice"}
        aria-pressed={isListening}
      >
        {isListening ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
      </button>
      {isListening ? (
        <span className="sr-only" role="status">
          Listening. {interimTranscript || "Speak a page name."}
        </span>
      ) : null}
      {errorText ? (
        <p className="voice-error" role="alert">
          {errorText}
        </p>
      ) : null}
    </div>
  );
}
