import { useState } from "react";
import { translateToASL } from "../../utils/aslTranslation";

export function ASLTranslator() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [aslGloss, setAslGloss] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const gloss = await translateToASL(inputText);
      setAslGloss(gloss);
    } catch (error) {
      console.error("ASL translation error:", error);
      setAslGloss("Translation unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="asl-translator">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="asl-toggle-btn"
        aria-label="Toggle ASL translator"
        aria-expanded={isOpen}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5z" />
          <path d="M12 2 8.5 5.5 12 9l3.5-3.5L12 2z" />
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5z" />
          <path d="M12 15l-3.5 3.5L12 22l3.5-3.5L12 15z" />
        </svg>
        <span>ASL</span>
      </button>

      {isOpen && (
        <div className="asl-translator-panel" role="region" aria-label="ASL translator">
          <h3 className="asl-translator-title">ASL Gloss Translator</h3>
          <p className="asl-translator-desc">
            Translate English text to American Sign Language gloss notation.
          </p>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter English text to translate..."
            className="asl-input"
            rows={3}
            aria-label="Text to translate to ASL"
          />
          
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isLoading}
            className="asl-translate-btn"
          >
            {isLoading ? "Translating..." : "Translate to ASL"}
          </button>

          {aslGloss && (
            <div className="asl-output" role="region" aria-live="polite">
              <h4>ASL Gloss:</h4>
              <p className="asl-gloss-text">{aslGloss}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
