import { useState, useCallback } from "react";
import { generateResponse } from "../../utils/gemini";
import { CourseKnowledgeBase } from "../../utils/courseKnowledge";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** Assistant messages say where they came from. "saved" is written by hand, no model ran. */
  source?: "gemini" | "saved";
  model?: string;
  note?: string;
}

export const WELCOME =
  "Hello! I'm here to help you with the LearnAble course. You can ask me about:\n\n• Course content and navigation\n• How to use accessibility features\n• Captions, audio descriptions, and sign language\n• Offline packs and downloads\n• Certificates and verification\n\nYou can type your question or use the voice button to speak. ASL gloss is also available.";

export function useChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: WELCOME,
      timestamp: new Date(),
      source: "saved",
      note: "A fixed greeting.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    let history: { role: "user" | "assistant"; content: string }[] = [];
    setMessages((prev) => {
      history = prev.filter((line) => line.content !== WELCOME).map((line) => ({ role: line.role, content: line.content }));
      return [...prev, userMessage];
    });
    setIsLoading(true);

    try {
      const context = CourseKnowledgeBase.getContext(content);
      const answer = await generateResponse(content, context, history);

      const assistantMessage: Message = {
        role: "assistant",
        content: answer.text,
        timestamp: new Date(),
        source: answer.source,
        model: answer.model,
        note: answer.note,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Something went wrong. Please try again.",
        timestamp: new Date(),
        source: "saved",
        note: "An error message, not a model answer.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
