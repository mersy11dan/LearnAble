import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "../../utils/speechRecognition";
import { useAmharicSpeech } from "../../utils/amharicSpeech";
import { CourseNavigator } from "../../utils/courseNavigator";
import "./styles.css";

const VOICE_ERROR = {
  "not-allowed": "መዳረሻ ተከልክሏል። ማይክሮፎኑን ፍቀድ እና ተናገር።",
  "no-speech": "ምንም አልሰማሁም። ጽሁፍ ጠቅ ያድርጉ እና ተናገሩ።",
  "audio-capture": "ማይክሮፎን አልተገኘም።",
  other: "ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።",
} as const;

interface CourseLocation {
  path: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
}

export function AmharicVoiceAgent() {
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState<"en" | "am">("am");
  const navigate = useNavigate();
  const location = useLocation();
  
  const { speak, stop: stopSpeaking, isSpeaking } = useAmharicSpeech(language);
  
  const handleVoiceCommand = useCallback(
    (transcript: string) => {
      const result = CourseNavigator.processCommand(transcript, location.pathname, language);
      
      if (result.action === "navigate") {
        speak(result.message);
        setTimeout(() => {
          navigate(result.path!);
        }, 500);
      } else if (result.action === "describe") {
        speak(result.message);
      } else if (result.action === "help") {
        speak(result.message);
      } else if (result.action === "repeat") {
        const currentLocation = CourseNavigator.getCurrentLocation(location.pathname, language);
        if (currentLocation) {
          speak(`${currentLocation.title}. ${currentLocation.description}`);
        }
      }
    },
    [location.pathname, language, navigate, speak],
  );

  const { 
    startListening, 
    stopListening, 
    interimTranscript, 
    error, 
    isSupported, 
    isListening 
  } = useSpeechRecognition({
    onFinal: handleVoiceCommand,
  });

  useEffect(() => {
    if (isActive && !isMinimized) {
      const currentLocation = CourseNavigator.getCurrentLocation(location.pathname, language);
      if (currentLocation) {
        speak(`${currentLocation.title}. ${currentLocation.description}`);
      }
    }
  }, [location.pathname, isActive, isMinimized, language, speak]);

  useEffect(() => {
    if (!isActive) return;
    
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stopListening();
        stopSpeaking();
        setIsActive(false);
      }
      if (event.altKey && event.shiftKey && event.key === "V") {
        event.preventDefault();
        if (isListening) {
          stopListening();
        } else {
          startListening();
        }
      }
    };
    
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, isListening, startListening, stopListening, stopSpeaking]);

  const errorRef = useRef<string | null>(null);
  useEffect(() => {
    if (error && error !== errorRef.current) {
      const errorMessage = language === "am" ? VOICE_ERROR[error] : 
        error === "not-allowed" ? "Microphone is blocked. Allow it and try again." :
        error === "no-speech" ? "I did not catch that. Please try again." :
        error === "audio-capture" ? "No microphone found." :
        "An error occurred. Please try again.";
      speak(errorMessage);
    }
    errorRef.current = error;
  }, [error, speak, language]);

  if (!isActive) {
    return (
      <button 
        className="amharic-voice-fab" 
        onClick={() => {
          setIsActive(true);
          const greeting = language === "am" 
            ? "የድምፅ አሁኑ ጀምሯል። ወደ ትምህርቱ ለመሄድ፣ 'ትምህርት' ይበሉ። ለእገዛ፣ 'እገዛ' ይበሉ።"
            : "Voice navigation activated. Say 'lesson' to go to the lesson, or 'help' for assistance.";
          setTimeout(() => speak(greeting), 300);
        }}
        aria-label={language === "am" ? "የድምፅ አሁኑን ክፈት" : "Open voice navigation"}
        title="Alt+Shift+V"
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
          <path d="M8 6 L10 8 L14 4" />
        </svg>
        <span className="amharic-voice-label">
          {language === "am" ? "የድምፅ አሁኑ" : "Voice"}
        </span>
      </button>
    );
  }

  return (
    <div 
      className={`amharic-voice-agent ${isMinimized ? "minimized" : ""}`}
      role="dialog" 
      aria-label={language === "am" ? "የድምፅ አሁኑ" : "Voice navigation assistant"}
    >
      <div className="agent-header">
        <h2 className="agent-title">
          {language === "am" ? "የድምፅ አሁኑ" : "Voice Navigator"}
        </h2>
        <div className="agent-actions">
          <button
            onClick={() => setLanguage(language === "am" ? "en" : "am")}
            aria-label={language === "am" ? "Switch to English" : "ወደ አማርኛ ቀይር"}
            className="agent-btn"
            title={language === "am" ? "English" : "አማርኛ"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="sr-only">{language === "am" ? "English" : "አማርኛ"}</span>
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? (language === "am" ? "ስፋት" : "Expand") : (language === "am" ? "አሳንስ" : "Minimize")}
            className="agent-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMinimized ? (
                <polyline points="18 15 12 9 6 15" />
              ) : (
                <polyline points="6 9 12 15 18 9" />
              )}
            </svg>
          </button>
          <button
            onClick={() => {
              stopListening();
              stopSpeaking();
              setIsActive(false);
            }}
            aria-label={language === "am" ? "ዝጋ" : "Close"}
            className="agent-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="agent-content">
          <div className="agent-status" role="status" aria-live="polite">
            {isListening ? (
              <div className="listening-indicator">
                <div className="pulse-ring"></div>
                <svg className="mic-icon" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" />
                </svg>
                <p className="listening-text">
                  {language === "am" ? "እየሰማሁ ነው..." : "Listening..."}
                </p>
                {interimTranscript && (
                  <p className="interim-text">{interimTranscript}</p>
                )}
              </div>
            ) : isSpeaking ? (
              <div className="speaking-indicator">
                <svg className="speaker-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <p className="speaking-text">
                  {language === "am" ? "እየተናገርኩ ነው..." : "Speaking..."}
                </p>
              </div>
            ) : (
              <div className="ready-indicator">
                <p className="ready-text">
                  {language === "am" 
                    ? "ለማነጋገር ዝግጁ። የድምፅ ቁልፉን ጠቅ ያድርጉ ወይም Alt+Shift+V ተጫኑ።"
                    : "Ready to listen. Tap the microphone or press Alt+Shift+V."}
                </p>
              </div>
            )}
          </div>

          <div className="agent-controls">
            <button
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              disabled={!isSupported}
              className={`voice-btn ${isListening ? "listening" : ""}`}
              aria-label={isListening ? (language === "am" ? "አቁም" : "Stop") : (language === "am" ? "ተናገር" : "Speak")}
            >
              {isListening ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
              <span className="voice-btn-label">
                {isListening ? (language === "am" ? "አቁም" : "Stop") : (language === "am" ? "ተናገር" : "Speak")}
              </span>
            </button>
          </div>

          <div className="agent-help">
            <h3>{language === "am" ? "ተለምዶ የሚጠቀሙ ትእዛዞች:" : "Common Commands:"}</h3>
            <ul>
              {language === "am" ? (
                <>
                  <li><strong>ትምህርት</strong> - ወደ ትምህርት ገጽ ይሂዱ</li>
                  <li><strong>ስራዎች</strong> - የስራ እድሎችን ይመልከቱ</li>
                  <li><strong>ምስክር ወረቀት</strong> - ምስክር ወረቀት ይፈትሹ</li>
                  <li><strong>ወደ ቤት</strong> - ወደ መነሻ ገጽ ይመለሱ</li>
                  <li><strong>የት ነኝ</strong> - የአሁኑን ቦታ ይድጋሙ</li>
                  <li><strong>እገዛ</strong> - የሁሉንም ትእዛዞች ዝርዝር ይስጡ</li>
                </>
              ) : (
                <>
                  <li><strong>lesson</strong> - Go to lesson page</li>
                  <li><strong>jobs</strong> - View career opportunities</li>
                  <li><strong>verify</strong> - Check certificate</li>
                  <li><strong>home</strong> - Return to home page</li>
                  <li><strong>where am I</strong> - Repeat current location</li>
                  <li><strong>help</strong> - List all commands</li>
                </>
              )}
            </ul>
          </div>

          {!isSupported && (
            <div className="agent-warning" role="alert">
              <p>
                {language === "am" 
                  ? "የድምፅ ማወቂያ በዚህ አሰሻሽ አይደገፍም።"
                  : "Voice recognition is not supported in this browser."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
