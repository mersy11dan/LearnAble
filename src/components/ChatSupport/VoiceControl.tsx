import { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "../../utils/speechRecognition";

interface VoiceControlProps {
  onVoiceInput: (text: string) => void;
  disabled?: boolean;
}

export function VoiceControl({ onVoiceInput, disabled }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const { startListening, stopListening, transcript, isSupported } = useSpeechRecognition();
  const previousTranscriptRef = useRef("");

  useEffect(() => {
    if (transcript && transcript !== previousTranscriptRef.current) {
      previousTranscriptRef.current = transcript;
      onVoiceInput(transcript);
      setIsListening(false);
    }
  }, [transcript, onVoiceInput]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="voice-control-container">
      <button
        onClick={handleVoiceToggle}
        disabled={disabled}
        className={`voice-control-btn ${isListening ? "listening" : ""}`}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
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
      {isListening && (
        <div className="voice-control-indicator" role="status" aria-live="polite">
          <span className="voice-pulse"></span>
          <span className="sr-only">Listening for voice input</span>
        </div>
      )}
    </div>
  );
}
