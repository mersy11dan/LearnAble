interface VoiceControlProps {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  disabled?: boolean;
}

export function VoiceControl({ isListening, startListening, stopListening, disabled }: VoiceControlProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (isListening) {
          stopListening();
          return;
        }
        startListening();
      }}
      disabled={disabled}
      className={`voice-control-btn ${isListening ? "listening" : ""}`}
      aria-label={isListening ? "Stop listening" : "Start voice input"}
      aria-pressed={isListening}
    >
      {isListening ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      )}
    </button>
  );
}
