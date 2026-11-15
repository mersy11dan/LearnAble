"""
Humanized Voice Agent for ASL Video-to-Text
Supports multiple TTS engines with natural voices and emotional expression
Includes blind-user accessibility features
"""

import os
import json
from typing import Optional, Dict, List
from pathlib import Path
import tempfile
import hashlib

# TTS engines
try:
    import pyttsx3
except ImportError:
    pyttsx3 = None

try:
    from gtts import gTTS
except ImportError:
    gTTS = None

try:
    import requests
except ImportError:
    requests = None


class HumanizedVoiceAgent:
    """
    Voice agent with humanized speech output
    Supports multiple languages and emotional tones
    """
    
    def __init__(
        self,
        language: str = "en",
        gender: str = "female",
        speed: int = 150,  # words per minute
        emotion: str = "neutral"
    ):
        self.language = language
        self.gender = gender
        self.speed = speed
        self.emotion = emotion
        
        # Cache directory
        self.cache_dir = Path(tempfile.gettempdir()) / "learnable_voice_cache"
        self.cache_dir.mkdir(exist_ok=True)
        
        # Initialize TTS engine
        self.engine = None
        self._init_engine()
        
    def _init_engine(self):
        """Initialize the best available TTS engine"""
        if pyttsx3:
            try:
                self.engine = pyttsx3.init()
                self._configure_pyttsx3()
                print("✓ Using pyttsx3 for voice synthesis")
            except Exception as e:
                print(f"⚠️  pyttsx3 init failed: {e}")
                self.engine = None
    
    def _configure_pyttsx3(self):
        """Configure pyttsx3 with humanized settings"""
        if not self.engine:
            return
        
        # Set rate (speed)
        self.engine.setProperty('rate', self.speed)
        
        # Set volume (0.0 to 1.0)
        self.engine.setProperty('volume', 0.9)
        
        # Set voice (prefer female voice)
        voices = self.engine.getProperty('voices')
        
        # Try to find the best voice
        target_voice = None
        
        # Priority: female voices
        if self.gender == "female":
            for voice in voices:
                if "female" in voice.name.lower() or "zira" in voice.name.lower():
                    target_voice = voice
                    break
        
        # Fallback to male voices
        if not target_voice and self.gender == "male":
            for voice in voices:
                if "male" in voice.name.lower() or "david" in voice.name.lower():
                    target_voice = voice
                    break
        
        # Use first available voice
        if not target_voice and voices:
            target_voice = voices[0]
        
        if target_voice:
            self.engine.setProperty('voice', target_voice.id)
            print(f"  Using voice: {target_voice.name}")
    
    def _get_cache_path(self, text: str) -> Path:
        """Get cache file path for text"""
        text_hash = hashlib.md5(
            f"{text}_{self.language}_{self.gender}_{self.speed}".encode()
        ).hexdigest()
        return self.cache_dir / f"{text_hash}.mp3"
    
    def humanize_text(self, text: str) -> str:
        """
        Add humanization to text (pauses, emphasis, emotion)
        """
        if not text:
            return text
        
        # Add pauses for natural speech
        text = text.replace(".", ". ")  # Pause after sentences
        text = text.replace(",", ", ")  # Short pause after commas
        text = text.replace("!", "! ")  # Emphasis
        text = text.replace("?", "? ")  # Question intonation
        
        # Add emphasis markers for emotional expression
        if self.emotion == "excited":
            text = text.replace("!", "!!")
            text = f"*{text}*"  # Some TTS engines recognize this
        elif self.emotion == "calm":
            text = text.lower()
        elif self.emotion == "formal":
            pass  # Keep as is
        
        # Clean up extra spaces
        text = " ".join(text.split())
        
        return text
    
    def speak(
        self,
        text: str,
        save_to_file: Optional[str] = None,
        use_cache: bool = True
    ) -> Optional[str]:
        """
        Speak text with humanized voice
        
        Args:
            text: Text to speak
            save_to_file: If provided, save audio to this file
            use_cache: Use cached audio if available
        
        Returns:
            Path to audio file if saved, None otherwise
        """
        if not text:
            return None
        
        # Humanize the text
        humanized_text = self.humanize_text(text)
        
        # Check cache
        cache_path = self._get_cache_path(humanized_text)
        if use_cache and cache_path.exists():
            print(f"✓ Using cached audio for: {text[:50]}...")
            if save_to_file:
                import shutil
                shutil.copy(cache_path, save_to_file)
                return save_to_file
            return str(cache_path)
        
        # Try different TTS engines
        audio_file = None
        
        # 1. Try pyttsx3 (local, fast)
        if self.engine:
            try:
                output_path = save_to_file or str(cache_path)
                self.engine.save_to_file(humanized_text, output_path)
                self.engine.runAndWait()
                audio_file = output_path
                print(f"✓ Generated audio with pyttsx3")
            except Exception as e:
                print(f"⚠️  pyttsx3 failed: {e}")
        
        # 2. Try gTTS (Google, requires internet)
        if not audio_file and gTTS and requests:
            try:
                lang_code = "en" if self.language == "en" else "am"
                if lang_code == "am":
                    # gTTS doesn't support Amharic, use transliteration
                    lang_code = "en"
                
                tts = gTTS(text=humanized_text, lang=lang_code, slow=False)
                output_path = save_to_file or str(cache_path)
                tts.save(output_path)
                audio_file = output_path
                print(f"✓ Generated audio with gTTS")
            except Exception as e:
                print(f"⚠️  gTTS failed: {e}")
        
        # 3. Fallback to Hasab API if configured
        if not audio_file:
            hasab_key = os.getenv("HASAB_API_KEY")
            if hasab_key and requests and self.language == "am":
                try:
                    audio_file = self._hasab_tts(humanized_text, save_to_file)
                    print(f"✓ Generated audio with Hasab")
                except Exception as e:
                    print(f"⚠️  Hasab TTS failed: {e}")
        
        return audio_file
    
    def _hasab_tts(self, text: str, output_file: Optional[str] = None) -> Optional[str]:
        """Use Hasab API for Amharic TTS"""
        hasab_key = os.getenv("HASAB_API_KEY")
        hasab_base = os.getenv("HASAB_API_BASE", "https://api.hasab.ai")
        
        if not hasab_key or not requests:
            return None
        
        try:
            response = requests.post(
                f"{hasab_base}/api/v1/tts/synthesize",
                headers={
                    "Authorization": f"Bearer {hasab_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "text": text,
                    "language": "amh",
                    "speaker_name": "Hanna"
                },
                timeout=30
            )
            
            if response.status_code == 200:
                output_path = output_file or str(self._get_cache_path(text))
                with open(output_path, "wb") as f:
                    f.write(response.content)
                return output_path
        except Exception as e:
            print(f"Hasab TTS error: {e}")
        
        return None
    
    def speak_asl_translation(
        self,
        english_text: str,
        amharic_text: Optional[str] = None
    ) -> Dict[str, Optional[str]]:
        """
        Speak ASL translation in both languages
        
        Returns:
            Dictionary with audio file paths for each language
        """
        result = {
            "english": None,
            "amharic": None
        }
        
        # English
        if english_text:
            print(f"\n🎤 Speaking in English: {english_text}")
            result["english"] = self.speak(english_text)
        
        # Amharic
        if amharic_text:
            print(f"\n🎤 Speaking in Amharic: {amharic_text}")
            # Switch to Amharic settings
            original_lang = self.language
            self.language = "am"
            result["amharic"] = self.speak(amharic_text)
            self.language = original_lang
        
        return result
    
    def describe_for_blind(
        self,
        scene_description: str,
        action: str = "signing",
        translation: Optional[str] = None
    ) -> str:
        """
        Create audio description for blind users
        
        Args:
            scene_description: What's happening in the video
            action: Type of action (signing, gesturing, etc.)
            translation: What the signs mean
        
        Returns:
            Path to audio file
        """
        # Build comprehensive description
        parts = []
        
        # Scene
        parts.append(f"Video shows {scene_description}.")
        
        # Action
        parts.append(f"The person is {action}.")
        
        # Translation
        if translation:
            parts.append(f"This translates to: {translation}.")
        
        description = " ".join(parts)
        
        print(f"\n♿ Audio description for blind users:")
        print(f"   {description}")
        
        return self.speak(description)
    
    def clear_cache(self):
        """Clear voice cache"""
        import shutil
        if self.cache_dir.exists():
            shutil.rmtree(self.cache_dir)
            self.cache_dir.mkdir()
            print("✓ Voice cache cleared")


class ConversationAgent:
    """
    LLM-powered chat agent for ASL learning assistance
    Supports blind users with audio feedback
    """
    
    def __init__(
        self,
        model: str = "qwen3.5:4b",
        ollama_url: str = "http://localhost:11434",
        use_voice: bool = True
    ):
        self.model = model
        self.ollama_url = ollama_url
        self.conversation_history: List[Dict] = []
        self.use_voice = use_voice
        
        if use_voice:
            self.voice_agent = HumanizedVoiceAgent()
        else:
            self.voice_agent = None
        
        # System prompt for ASL assistance
        self.system_prompt = """You are a helpful, friendly AI assistant specialized in American Sign Language (ASL) education and accessibility. 

Your role:
- Help users learn ASL signs and vocabulary
- Explain sign meanings and context
- Provide encouragement and support
- Be especially mindful of blind users - describe visual content clearly
- Use simple, clear language
- Be warm and encouraging

Keep responses concise (2-3 sentences) unless asked for details."""
    
    def chat(
        self,
        user_message: str,
        context: Optional[Dict] = None,
        speak_response: bool = True
    ) -> Dict:
        """
        Chat with LLM about ASL content
        
        Args:
            user_message: User's message
            context: Optional context (video info, translation, etc.)
            speak_response: Whether to generate audio
        
        Returns:
            Response with text and optional audio
        """
        # Build context-aware prompt
        messages = [{"role": "system", "content": self.system_prompt}]
        
        # Add context if provided
        if context:
            context_str = self._format_context(context)
            messages.append({
                "role": "system",
                "content": f"Current context: {context_str}"
            })
        
        # Add conversation history (last 5 messages)
        messages.extend(self.conversation_history[-10:])
        
        # Add user message
        messages.append({"role": "user", "content": user_message})
        
        # Call LLM
        response_text = self._call_llm(messages)
        
        # Save to history
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })
        self.conversation_history.append({
            "role": "assistant",
            "content": response_text
        })
        
        # Generate audio if requested
        audio_file = None
        if speak_response and self.voice_agent:
            audio_file = self.voice_agent.speak(response_text)
        
        return {
            "text": response_text,
            "audio": audio_file,
            "history_length": len(self.conversation_history)
        }
    
    def _format_context(self, context: Dict) -> str:
        """Format context for LLM"""
        parts = []
        
        if "video_name" in context:
            parts.append(f"Video: {context['video_name']}")
        
        if "translation_en" in context:
            parts.append(f"English translation: {context['translation_en']}")
        
        if "translation_am" in context:
            parts.append(f"Amharic translation: {context['translation_am']}")
        
        if "detected_signs" in context:
            signs = ", ".join(context["detected_signs"])
            parts.append(f"Detected signs: {signs}")
        
        return ". ".join(parts)
    
    def _call_llm(self, messages: List[Dict]) -> str:
        """Call Ollama LLM"""
        try:
            import requests
            
            # Try Ollama first
            response = requests.post(
                f"{self.ollama_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": messages,
                    "stream": False
                },
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get("message", {}).get("content", "")
            else:
                raise Exception(f"Ollama returned {response.status_code}")
        
        except Exception as e:
            print(f"⚠️  LLM error: {e}")
            
            # Fallback to Gemini if available
            gemini_key = os.getenv("GEMINI_API_KEY")
            if gemini_key:
                try:
                    import google.generativeai as genai
                    genai.configure(api_key=gemini_key)
                    model = genai.GenerativeModel('gemini-pro')
                    
                    # Convert messages to single prompt
                    prompt = "\n\n".join([
                        f"{msg['role']}: {msg['content']}"
                        for msg in messages
                    ])
                    
                    response = model.generate_content(prompt)
                    return response.text
                except Exception as gemini_error:
                    print(f"⚠️  Gemini fallback failed: {gemini_error}")
            
            # Final fallback
            return "I'm here to help with ASL learning! However, I'm having trouble connecting to my AI models right now. Please try again in a moment."
    
    def reset(self):
        """Reset conversation history"""
        self.conversation_history = []
        print("✓ Conversation reset")


def create_voice_agent(
    language: str = "en",
    emotion: str = "neutral",
    speed: int = 150
) -> HumanizedVoiceAgent:
    """Factory function to create voice agent"""
    return HumanizedVoiceAgent(
        language=language,
        emotion=emotion,
        speed=speed
    )


def create_chat_agent(
    model: str = "qwen3.5:4b",
    use_voice: bool = True
) -> ConversationAgent:
    """Factory function to create chat agent"""
    return ConversationAgent(
        model=model,
        use_voice=use_voice
    )


if __name__ == "__main__":
    print("🎤 Voice Agent Test\n")
    
    # Test voice agent
    voice = create_voice_agent(language="en", emotion="friendly")
    
    print("1. Testing English speech:")
    voice.speak("Hello! Welcome to LearnAble ASL translator.")
    
    print("\n2. Testing Amharic speech:")
    voice.language = "am"
    voice.speak("ሰላም! ወደ LearnAble እንኳን በደህና መጡ።")
    
    print("\n3. Testing blind user description:")
    voice.language = "en"
    voice.describe_for_blind(
        scene_description="a person in a well-lit room",
        action="signing 'hello' in American Sign Language",
        translation="Hello, how are you?"
    )
    
    print("\n4. Testing chat agent:")
    chat = create_chat_agent(model="qwen3.5:4b", use_voice=False)
    
    response = chat.chat(
        "What does the ASL sign for 'hello' look like?",
        context={"translation_en": "Hello"}
    )
    print(f"Response: {response['text']}")
    
    print("\n✓ Voice agent test complete!")
