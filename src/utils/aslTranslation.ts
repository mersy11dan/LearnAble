/** Offline gloss only. This does not download a model and it is not Ethiopian Sign Language. */
export async function translateToASL(text: string): Promise<string> {
  return getFallbackASLGloss(text);
}

function getFallbackASLGloss(text: string): string {
  const lowerText = text.toLowerCase();
  
  const commonPhrases: Record<string, string> = {
    "hello": "HELLO",
    "how are you": "HOW YOU",
    "thank you": "THANK YOU",
    "please": "PLEASE",
    "help": "HELP",
    "i need help": "I NEED HELP",
    "where is": "WHERE",
    "what is": "WHAT",
    "who is": "WHO",
    "when": "WHEN",
    "why": "WHY",
    "how": "HOW",
    "yes": "YES",
    "no": "NO",
    "good": "GOOD",
    "bad": "BAD",
    "the doctor will help you now": "DOCTOR WILL HELP YOU NOW",
    "i understand": "I UNDERSTAND",
    "i don't understand": "I NOT UNDERSTAND",
    "can you help me": "CAN YOU HELP ME",
    "where is the lesson": "WHERE LESSON",
    "how do i use this": "HOW USE THIS",
    "show me captions": "SHOW CAPTION",
    "turn on sign language": "TURN-ON SIGN LANGUAGE",
  };

  for (const [phrase, gloss] of Object.entries(commonPhrases)) {
    if (lowerText.includes(phrase)) {
      return gloss;
    }
  }

  const words = text.toUpperCase().split(/\s+/);
  const filteredWords = words.filter(
    (word) => !["THE", "A", "AN", "IS", "ARE", "AM", "BE", "TO"].includes(word)
  );
  
  return filteredWords.join(" ") || text.toUpperCase();
}
