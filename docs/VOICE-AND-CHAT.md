# Voice Agent and LLM Chat System

The support chat that ships is `server/app.py`. It reads `GEMINI_API_KEY` on the server only. The notes below are the unused experimental agent. Ollama is not called unless `LEARNABLE_ASL_VIDEO=1`.

# Voice Agent and LLM Chat System

## Overview

LearnAble now features a **humanized voice agent** and **LLM-powered chat system** designed specifically for accessibility and ASL learning. Perfect for **blind users** and anyone who prefers audio learning!

---

## 🌟 Features

### 🎤 Humanized Voice Synthesis
- **Natural-sounding speech** with emotional expression
- **Multiple emotions**: neutral, excited, calm, formal
- **Speed control**: Adjust words per minute
- **Multilingual**: English and Amharic support
- **Smart caching**: Instant playback for repeated phrases

### 💬 LLM Chat Assistant
- **Context-aware conversations** about ASL content
- **qwen3.5:4b** model (fast and efficient)
- **Video understanding**: Knows what you're watching
- **Conversation memory**: Maintains context across messages
- **Voice output option**: Responses can be spoken

### ♿ Blind User Support
- **Audio descriptions**: Detailed descriptions of sign language videos
- **Scene context**: What's happening, who's signing, what it means
- **Navigation assistance**: Audio cues for interface elements
- **Screen reader friendly**: Works with JAWS, NVDA, VoiceOver

---

## 🚀 Quick Start

### Installation

```bash
cd backend
pip install -r requirements.txt
```

### Install Ollama (for chat)

**Windows:**
```powershell
irm https://ollama.com/install.ps1 | iex
```

**Linux/Mac:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Pull the model:**
```bash
ollama run qwen3.5:4b
```

### Test Everything

```bash
python test_voice_chat.py
```

---

## 📡 API Endpoints

### 1. Text-to-Speech

Convert text to natural-sounding speech:

```bash
POST /api/voice/speak
```

**Request:**
```json
{
  "text": "Hello! Welcome to LearnAble.",
  "language": "en",
  "emotion": "neutral",
  "speed": 150,
  "for_blind": false
}
```

**Parameters:**
- `text` (required): Text to speak
- `language`: "en" or "am" (default: "en")
- `emotion`: "neutral", "excited", "calm", "formal" (default: "neutral")
- `speed`: Words per minute (default: 150)
- `for_blind`: Add audio description context (default: false)

**Response:**
Returns audio file (MP3 format)

**Example:**
```bash
curl -X POST http://localhost:8000/api/voice/speak \
  -H "Content-Type: application/json" \
  -d '{
    "text": "You just signed hello!",
    "language": "en",
    "emotion": "excited",
    "speed": 160
  }' \
  --output speech.mp3
```

### 2. Chat with AI

Ask questions about ASL content:

```bash
POST /api/chat
```

**Request:**
```json
{
  "message": "What does the sign for 'hello' look like?",
  "video_context": {
    "video_name": "lesson1.mp4",
    "translation_en": "Hello, how are you?",
    "translation_am": "ሰላም እንዴት ነህ?"
  },
  "use_voice": true,
  "conversation_id": "user123"
}
```

**Parameters:**
- `message` (required): Your question
- `video_context`: Optional context about the video
- `use_voice`: Generate audio response (default: false)
- `conversation_id`: Track conversations (default: "default")

**Response:**
```json
{
  "success": true,
  "message": "The sign for 'hello' is made by...",
  "conversation_id": "user123",
  "history_length": 6,
  "audio_url": "/api/voice/audio/response_abc123.mp3"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain this sign step by step",
    "use_voice": true
  }'
```

### 3. Translate Video with Voice

Complete workflow: video → translation → speech:

```bash
POST /api/asl/translate-with-voice
```

**Request:**
```bash
curl -X POST http://localhost:8000/api/asl/translate-with-voice \
  -F "file=@sign_video.mp4" \
  -F "mode=dual" \
  -F "target_lang=both" \
  -F "include_voice=true" \
  -F "for_blind=true"
```

**Parameters:**
- `file`: Video file (MP4, AVI, MOV)
- `mode`: "hf", "ollama", or "dual"
- `target_lang`: "en", "am", or "both"
- `include_voice`: Generate speech (default: true)
- `for_blind`: Add audio descriptions (default: false)

**Response:**
```json
{
  "english": {
    "text": "Hello, how are you?",
    "source": "ollama"
  },
  "amharic": {
    "text": "ሰላም እንዴት ነህ?",
    "source": "huggingface"
  },
  "audio_files": {
    "english": "/tmp/speech_en_abc.mp3",
    "amharic": "/tmp/speech_am_xyz.mp3"
  },
  "for_blind": true
}
```

### 4. Test Voice System

Check which TTS engines are available:

```bash
GET /api/voice/test
```

**Response:**
```json
{
  "status": {
    "pyttsx3": true,
    "gtts": true,
    "hasab": false,
    "ollama_chat": true
  },
  "recommended": "pyttsx3",
  "chat_model": "qwen3.5:4b",
  "message": "Voice system ready!"
}
```

### 5. Reset Conversation

Clear chat history:

```bash
POST /api/chat/reset?conversation_id=user123
```

---

## 🎨 Emotion Examples

### Neutral (Default)
```python
voice.speak("This is a neutral statement.")
```
**Use for**: Regular content, facts, descriptions

### Excited
```python
voice.speak("Great job! You're learning so fast!", emotion="excited")
```
**Use for**: Encouragement, celebrations, achievements

### Calm
```python
voice.speak("Take your time. Learning is a journey.", emotion="calm")
```
**Use for**: Instructions, guidance, relaxation

### Formal
```python
voice.speak("Welcome to the American Sign Language course.", emotion="formal")
```
**Use for**: Professional content, academic material

---

## ♿ Blind User Features

### Audio Descriptions

When `for_blind=true`, the system provides rich audio context:

**Example:**
```python
voice.describe_for_blind(
    scene_description="person in well-lit room with neutral background",
    action="raising right hand to forehead and moving outward",
    translation="Hello, nice to meet you"
)
```

**Output Audio:**
> "Video shows person in well-lit room with neutral background. The person is raising right hand to forehead and moving outward. This translates to: Hello, nice to meet you."

### Screen Reader Compatibility

All API responses include:
- Clear text descriptions
- Semantic structure
- Alt text for visual elements
- ARIA labels where applicable

### Keyboard Navigation

- All features accessible via keyboard
- Tab navigation support
- Enter/Space to activate
- Escape to cancel

---

## 💬 Chat Agent Examples

### Example 1: Basic Question

```python
chat = create_chat_agent(model="qwen3.5:4b")
response = chat.chat("What is American Sign Language?")
print(response['text'])
```

**Output:**
> "American Sign Language (ASL) is a complete, natural language that uses hand movements, facial expressions, and body language to communicate. It's the primary language of many deaf and hard-of-hearing people in North America."

### Example 2: With Video Context

```python
context = {
    "video_name": "hello.mp4",
    "translation_en": "Hello, how are you?",
    "detected_signs": ["hello", "how", "you"]
}

response = chat.chat(
    "Explain what I just saw",
    context=context
)
print(response['text'])
```

**Output:**
> "You just watched someone sign 'Hello, how are you?' in ASL. This is a common greeting that combines three signs: HELLO (hand wave or salute), HOW (moving hands in circles), and YOU (pointing forward). It's a friendly way to start a conversation!"

### Example 3: Follow-up Questions

```python
# First question
chat.chat("What's the sign for hello?")

# Follow-up (remembers context)
chat.chat("How do I practice it?")

# Another follow-up
chat.chat("Are there variations?")
```

The agent maintains conversation context!

---

## 🌍 Multilingual Support

### English

```python
voice_en = create_voice_agent(language="en")
voice_en.speak("Welcome to LearnAble!")
```

### Amharic (አማርኛ)

```python
voice_am = create_voice_agent(language="am")
voice_am.speak("ሰላም! እንኳን ደህና መጡ።")
```

### Translation Flow

1. **ASL Video** → MediaPipe keypoints
2. **Keypoints** → English text (HF or Ollama)
3. **English** → Amharic (built-in dictionary or API)
4. **Text** → Speech (pyttsx3, gTTS, or Hasab)

---

## 🔧 Configuration

### Environment Variables

```env
# Voice & Chat
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen3.5:4b

# Optional TTS APIs
HASAB_API_KEY=your_key_here
HASAB_API_BASE=https://api.hasab.ai

# Fallback for translation
GEMINI_API_KEY=your_key_here
```

### Python Configuration

```python
from voice_agent import create_voice_agent, create_chat_agent

# Customize voice
voice = create_voice_agent(
    language="en",
    gender="female",
    speed=150,
    emotion="neutral"
)

# Customize chat
chat = create_chat_agent(
    model="qwen3.5:4b",
    ollama_url="http://localhost:11434",
    use_voice=True
)
```

---

## 📊 Performance

### Voice Synthesis Speed

- **pyttsx3** (local): 0.5-1 second
- **gTTS** (online): 1-2 seconds
- **Hasab** (Amharic): 2-3 seconds
- **Caching**: < 100ms for repeated phrases

### Chat Response Time

- **qwen3.5:4b**: 1-3 seconds
- **With voice**: +1-2 seconds
- **With context**: Same (no slowdown)

### Model Size

- **qwen3.5:4b**: ~2.6 GB download
- **Voice cache**: ~10-50 MB (grows with use)
- **Conversation memory**: ~1 KB per message

---

## 🎯 Use Cases

### 1. ASL Learning App
```python
# User uploads video
result = translate_with_voice(video, for_blind=True)

# System speaks translation
play_audio(result['audio_files']['english'])

# User asks question
response = chat("How do I practice this sign?")
speak(response['text'])
```

### 2. Accessibility Tool for Blind Users
```python
# Process video
result = process_asl_video(video)

# Generate detailed description
voice.describe_for_blind(
    scene="Person signing at desk",
    action="Making circular hand motions",
    translation=result['text']
)
```

### 3. Interactive Tutorial
```python
# Show sign
show_video("hello.mp4")

# Explain
chat.chat("This is the sign for hello")

# Practice
voice.speak("Now you try! Raise your hand to your forehead.")

# Feedback
user_video = record()
if correct(user_video):
    voice.speak("Perfect! Great job!", emotion="excited")
```

---

## 🐛 Troubleshooting

### Voice Not Working

**Issue**: No audio generated

**Solutions**:
```bash
# Check TTS engines
curl http://localhost:8000/api/voice/test

# Install pyttsx3
pip install pyttsx3

# Install gTTS
pip install gTTS

# Test manually
python test_voice_chat.py
```

### Chat Not Responding

**Issue**: Chat endpoint returns errors

**Solutions**:
```bash
# Check Ollama
ollama list

# Pull model if missing
ollama pull qwen3.5:4b

# Test connection
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

### Amharic Voice Not Working

**Issue**: Amharic text not spoken correctly

**Solutions**:
1. Configure Hasab API key
2. Use gTTS with transliteration
3. Manual audio recording

---

## 🔒 Privacy & Security

### Voice Data
- ✅ Audio files cached locally
- ✅ Auto-deleted after 1 hour
- ✅ No cloud storage
- ✅ Optional: disable caching

### Chat Data
- ✅ Conversations stored in memory only
- ✅ Not persisted to disk
- ✅ Cleared on restart
- ✅ No external logging

### Blind User Privacy
- ✅ All processing happens locally
- ✅ No tracking or analytics
- ✅ Full offline mode available

---

## 🤝 Contributing

Want to improve the voice/chat system?

### Areas for Improvement:
- [ ] More emotions (sad, surprised, urgent)
- [ ] More languages (Oromo, Tigrinya, Spanish)
- [ ] Better Amharic TTS
- [ ] Voice cloning for consistency
- [ ] Faster qwen models (qwen3.5:1.5b)
- [ ] Streaming responses
- [ ] Real-time voice chat

---

## 📚 Documentation

- **Main Docs**: [`ASL-VIDEO-TO-TEXT.md`](ASL-VIDEO-TO-TEXT.md)
- **Quick Start**: [`../QUICKSTART_ASL.md`](../QUICKSTART_ASL.md)
- **Backend API**: [`../backend/README.md`](../backend/README.md)

---

## 🙏 Credits

- **pyttsx3**: Local text-to-speech
- **gTTS**: Google Text-to-Speech
- **Ollama**: Local LLM infrastructure
- **qwen3.5**: Efficient language model
- **Hasab**: Amharic speech synthesis

---

**Built with ❤️ for accessibility**

Making learning accessible to everyone, one voice at a time! 🎤
