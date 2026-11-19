# Experimental backend

This FastAPI app is not part of the LearnAble submission.

- Docker Compose does not start it. The submission API is `server/app.py`.
- Hugging Face, Torch, and Ollama downloads stay off unless `LEARNABLE_ASL_VIDEO=1`.
- Do not put keys in the demo site. There is no `VITE_GEMINI_API_KEY`. A Gemini key, if any, is `GEMINI_API_KEY` on the server.
- The gloss and video notes here are American Sign Language, not Ethiopian Sign Language.
- Nothing here is verified against WCAG, a screen reader, or a Deaf or blind reviewer.

The longer notes below describe the optional scripts. They do not run in the default install.

# LearnAble Backend - ASL Video-to-Text API

FastAPI backend for AI-powered ASL (American Sign Language) translation with multilingual support.

## 🌟 Features

- **ASL Video Translation**: Convert sign language videos to English and Amharic text
- **Dual Backend**: Local (Ollama) and online (Hugging Face) processing
- **MediaPipe Integration**: Efficient pose-based keypoint extraction
- **Smart Caching**: Fast responses for repeated queries
- **Supabase Integration**: Store translations and user data
- **RESTful API**: Easy integration with any frontend

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Required for online ASL processing
HF_TOKEN=your_huggingface_token

# Optional but recommended
GEMINI_API_KEY=your_gemini_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# For local processing (install Ollama first)
OLLAMA_URL=http://localhost:11434
```

### 3. Install Ollama (for local inference)

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama server (in separate terminal)
ollama serve

# Pull vision model
ollama pull llava
```

### 4. Run the API

```bash
python main.py
```

API will be available at: `http://localhost:8000`

Interactive docs at: `http://localhost:8000/docs`

## 📡 API Endpoints

### Health Check

```bash
curl http://localhost:8000/health
```

### Translate ASL Video

```bash
curl -X POST http://localhost:8000/api/asl/translate-video \
  -F "file=@sign_video.mp4" \
  -F "mode=dual" \
  -F "target_lang=both"
```

**Parameters:**
- `file`: Video file (required)
- `mode`: "hf" (online), "ollama" (local), or "dual" (both) - default: "dual"
- `target_lang`: "en", "am", or "both" - default: "both"

**Response:**
```json
{
  "english": {
    "huggingface": {
      "success": true,
      "text": "Hello, how are you?",
      "source": "huggingface_api"
    },
    "ollama": {
      "success": true,
      "text": "Hello, how are you?",
      "source": "ollama",
      "model": "llava"
    }
  },
  "amharic": {
    "huggingface": {
      "success": true,
      "text": "ሰላም እንዴት ነህ?",
      "source": "huggingface_api"
    }
  },
  "cached": false,
  "filename": "sign_video.mp4"
}
```

### Extract Keypoints

Get MediaPipe hand and body landmarks:

```bash
curl -X POST http://localhost:8000/api/asl/extract-keypoints \
  -F "file=@sign_video.mp4"
```

### List Available Models

```bash
curl http://localhost:8000/api/asl/models
```

### Other Endpoints

- `POST /api/translate` - Text to ASL gloss
- `POST /api/summary` - Generate video summary
- `POST /api/chat` - Chat with AI about videos
- `GET /api/cache/stats` - Cache statistics
- `DELETE /api/cache/clear` - Clear cache

## 🧪 Testing

Run the comprehensive test suite:

```bash
python test_asl_local.py
```

Tests include:
- MediaPipe keypoint extraction
- Ollama connection
- Hugging Face API
- ASL translation pipeline
- API endpoints
- Video upload

## 🎓 Training Custom Models

Train on real ASL datasets:

```bash
python train_asl_model.py \
  --use-real-data \
  --num-samples 10000 \
  --epochs 5 \
  --batch-size 16
```

Available datasets:
- SignVerse-2M: 2 million videos with pose keypoints
- American Sign Language Dataset: 108,000 clips, 2,200+ words

## 🏗️ Architecture

```
┌─────────────┐
│ Video Input │
└──────┬──────┘
       │
       ▼
┌──────────────┐
│  MediaPipe   │ ← Extract 54 landmarks per frame
│ Pose Extract │   (42 hand + 12 upper body)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Keypoints   │ ← Lightweight coordinate arrays
│   (162 dims) │   Remove background noise
└──────┬───────┘
       │
   ┌───┴────┐
   │        │
   ▼        ▼
┌─────┐  ┌────────┐
│Local│  │ Online │
│Ollama│  │Hugging│
│      │  │ Face  │
└──┬──┘  └───┬────┘
   │         │
   └────┬────┘
        │
        ▼
   ┌────────┐
   │ English│
   │Amharic │
   │  Text  │
   └────────┘
```

## 📊 Performance

- **Keypoint Extraction**: ~30 FPS (real-time)
- **Local Inference**: 2-5 seconds per video
- **Online Inference**: 5-15 seconds per video
- **Cached Results**: < 100ms

## 🔒 Security

- Videos are processed and immediately deleted
- No persistent storage of video content
- Encrypted API calls (HTTPS)
- Optional local-only processing (Ollama)
- User consent required for online processing

## 📚 Documentation

- [Full API Documentation](../docs/ASL-VIDEO-TO-TEXT.md)
- [Training Guide](../docs/ASL-VIDEO-TO-TEXT.md#training)
- [Troubleshooting](../docs/ASL-VIDEO-TO-TEXT.md#troubleshooting)

## 🐛 Common Issues

### "Cannot connect to Ollama"

```bash
# Make sure Ollama is running
ollama serve

# Check if it's accessible
curl http://localhost:11434/api/tags
```

### "HF API returns 503"

Model is cold-starting. Wait 30-60 seconds and try again.

### "Low accuracy"

- Ensure good lighting and clear hand visibility
- Keep hands centered in frame
- Use trained models for better accuracy
- Try dual mode to combine results

## 🤝 Contributing

Contributions welcome! Areas for improvement:

1. Ethiopian Sign Language support
2. Real-time video processing (WebRTC)
3. Mobile app integration
4. More language pairs
5. Better accuracy on fingerspelling

## 📄 License

Part of LearnAble. See main repository LICENSE.

## 🙏 Credits

- **MediaPipe** for pose extraction
- **Hugging Face** for model hosting
- **Ollama** for local inference
- **SignVerse** team for datasets
- ASL community for open data

---

Built with care for accessibility by the LearnAble team.
