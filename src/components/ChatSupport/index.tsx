import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { VoiceControl } from "./VoiceControl";
import { ASLTranslator } from "./ASLTranslator";
import { useChatSupport } from "./useChatSupport";
import { useSpeechSynthesis } from "../../utils/speechSynthesis";
import "./styles.css";

function storedConsent(): boolean {
  return typeof sessionStorage !== "undefined" && sessionStorage.getItem("learnable-consent") === "yes";
}

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const { messages, sendMessage, isLoading } = useChatSupport();
  const [consent, setConsent] = useState(storedConsent);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { speak, stop: stopSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    stopSpeaking();
    setDraft("");
    setListening(false);
    void sendMessage(text);
  };

  const handleVoiceFinal = (text: string) => {
    setListening(false);
    setDraft("");
    stopSpeaking();
    void sendMessage(text).then((reply) => {
      if (reply) speak(reply);
    });
  };

  if (!isOpen) {
    return (
      <button className="chat-support-fab" onClick={() => setIsOpen(true)} aria-label="Open support chat">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <div className={`chat-support-container ${isMinimized ? "minimized" : ""}`} role="dialog" aria-label="Support chat">
      <div className="chat-support-header">
        <h2 className="chat-support-title">LearnAble guide</h2>
        <div className="chat-support-actions">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            className="chat-support-btn"
          >
            {isMinimized ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              stopSpeaking();
              setIsOpen(false);
            }}
            aria-label="Close chat"
            className="chat-support-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chat-support-messages" role="log" aria-live="polite" aria-atomic="false">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="chat-support-loading" role="status" aria-label="Loading response">
                <span className="chat-support-dot"></span>
                <span className="chat-support-dot"></span>
                <span className="chat-support-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-support-input-area">
            <label className="chat-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  if (event.target.checked) sessionStorage.setItem("learnable-consent", "yes");
                  else sessionStorage.removeItem("learnable-consent");
                }}
              />
              Send my questions to Google Gemini when the transcript service has a key. Until this is ticked, answers are
              saved text and nothing leaves this site.
            </label>
            <ASLTranslator />
            <div className="chat-input-row">
              <VoiceControl
                onVoiceInput={handleVoiceFinal}
                onDraft={setDraft}
                onListening={setListening}
                disabled={isLoading}
              />
              <ChatInput onSend={handleSend} disabled={isLoading} draft={draft} listening={listening} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
