# 🤟 Pocket Sign - AI-Powered Accessibility Platform

**Pocket Sign** is an advanced accessibility platform for deaf and blind users, featuring real-time ASL translation, humanized voice synthesis, AI-powered summaries, and intelligent caching.

## ✨ Key Features

### 1. **Smart ASL Interpreter** 🤟
- **Real-time Translation**: Converts video captions to ASL gloss notation
- **Fixed Position**: Bottom-right of video player
- **Resizable**: Easy drag-to-resize with visual handle
- **Video-Synchronized**: Only appears when video is playing
- **AI Summaries**: Contextual summaries of video content
- **Material UI Design**: Modern, accessible interface

### 2. **Humanized Voice Synthesis** 🎤
- **Habesha Accent**: Smooth Ethiopian accent for Amharic content
- **Natural English**: Humanized voice for English content
- **Smart Voice Selection**: Automatically picks best available voice
- **Caching**: TTS responses cached for instant replay
- **Prosody Variations**: Natural rhythm and intonation

### 3. **FastAPI Backend** ⚡
- **RESTful API**: Clean, documented endpoints
- **Supabase Integration**: PostgreSQL database with RLS
- **Gemini AI**: Advanced language model integration
- **Intelligent Caching**: Server-side and client-side caching
- **Real-time Processing**: Fast response times

### 4. **Material UI Design** 🎨
- **Responsive**: Perfect on mobile, tablet, and desktop
- **Accessible**: WCAG 2.2 AA compliant
- **Modern**: Clean, professional interface
- **Touch-Friendly**: 44px minimum touch targets
- **Themeable**: Follows LearnAble design tokens

### 5. **AI-Powered Features** 🤖
- **Video Summaries**: AI-generated content summaries
- **Embeddings**: Semantic search capabilities
- **Smart Chat**: Context-aware chatbot
- **Contextual Help**: Learns from video content

## 📦 Architecture

```
Pocket Sign
├── Frontend (React + TypeScript + Material UI)
│   ├── ASL Interpreter Component
│   ├── Humanized Voice System
│   ├── Chat Support
│   └── Video Player Integration
│
├── Backend (FastAPI + Python)
│   ├── Translation API
│   ├── Summary Generation
│   ├── Embeddings Service
│   ├── Chat API
│   └── Caching Layer
│
└── Database (Supabase + PostgreSQL)
    ├── Translations
    ├── Video Summaries
    ├── Chat History
    ├── Embeddings (vector search)
    └── User Preferences
```

## 🚀 Setup Guide

### Frontend Setup

```bash
cd /workspace
npm install
npm run dev
```

**Environment Variables** (`.env`):
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_BASE=http://127.0.0.1:8000
```

### Backend Setup

```bash
cd /workspace/backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**Environment Variables** (`backend/.env`):
```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema: `backend/supabase_schema.sql`
3. Copy your project URL and anon key to `.env`

## 🎯 Usage

### ASL Interpreter

The ASL interpreter automatically appears when a video starts playing:

```tsx
import { ASLInterpreter } from './components/ASLInterpreter';

<ASLInterpreter
  videoRef={videoRef}
  captions={currentCaptions}
  isPlaying={isVideoPlaying}
/>
```

**Features**:
- Drag resize handle (bottom-right corner)
- Toggle fullscreen
- Hide/show button
- Auto-translates captions to ASL gloss
- Shows AI-generated summary

### Humanized Voice

```typescript
import { useHumanizedVoice } from './utils/voiceHumanized';

const { speak, stop, isSpeaking } = useHumanizedVoice();

// English with natural voice
speak("Hello, how are you?", { lang: "en" });

// Amharic with Habesha accent
speak("ሰላም", { lang: "am", rate: 0.85, pitch: 1.1 });
```

### API Integration

```typescript
import { PocketSignAPI } from './services/api';

// Translate to ASL
const asl = await PocketSignAPI.translateToASL("Hello world");
// Returns: "HELLO WORLD"

// Generate summary
const summary = await PocketSignAPI.generateSummary(
  "video-123",
  "Full video transcript here...",
  120 // duration in seconds
);

// Chat with AI
const response = await PocketSignAPI.chat(
  "How do I use captions?",
  conversationHistory,
  "video-123"
);

// Generate embeddings
const embedding = await PocketSignAPI.generateEmbedding(
  "Text to embed"
);
```

## 🔧 API Endpoints

### Backend API

Base URL: `http://127.0.0.1:8000`

#### Health Check
```http
GET /health
```

#### Translate to ASL
```http
POST /api/translate
Content-Type: application/json

{
  "text": "The doctor will help you now",
  "source_lang": "en",
  "target": "asl"
}
```

Response:
```json
{
  "asl": "DOCTOR WILL HELP YOU NOW",
  "cached": false
}
```

#### Generate Summary
```http
POST /api/summary
Content-Type: application/json

{
  "video_id": "lesson-123",
  "text": "Full transcript...",
  "duration": 180.5
}
```

#### Generate Embeddings
```http
POST /api/embed
Content-Type: application/json

{
  "text": "Text to embed",
  "model": "gemini"
}
```

#### Chat
```http
POST /api/chat
Content-Type: application/json

{
  "message": "How do I use this feature?",
  "context": [{"role": "user", "content": "previous message"}],
  "video_id": "lesson-123"
}
```

#### Cache Stats
```http
GET /api/cache/stats
```

#### Clear Cache
```http
DELETE /api/cache/clear
```

## 📊 Database Schema

### Tables

**translations**
- `id`: Primary key
- `original_text`: Source text
- `asl_text`: ASL gloss translation
- `source_lang`: Source language
- `created_at`, `updated_at`: Timestamps

**video_summaries**
- `id`: Primary key
- `video_id`: Unique video identifier
- `summary`: AI-generated summary
- `duration`: Video duration
- `created_at`, `updated_at`: Timestamps

**chat_history**
- `id`: Primary key
- `video_id`: Associated video
- `message`: User message
- `response`: AI response
- `created_at`: Timestamp

**video_embeddings**
- `id`: Primary key
- `video_id`: Video identifier
- `text_chunk`: Text segment
- `embedding`: Vector (768 dimensions)
- `metadata`: Additional data (JSONB)
- `created_at`: Timestamp

**user_preferences**
- `id`: Primary key
- `user_id`: User reference (UUID)
- `asl_enabled`, `voice_enabled`: Feature toggles
- `preferred_voice`: Voice selection
- `font_size`, `high_contrast`, `reduced_motion`: Accessibility
- `created_at`, `updated_at`: Timestamps

## 🎨 Design System

Pocket Sign follows Material UI design principles while maintaining LearnAble's accessibility standards:

### Colors
- **Primary**: Moss Green (`#0e5a42`)
- **Secondary**: Navy (`#1b3048`)
- **Accent**: Caption Yellow (`#ffee00`)
- **Background**: Paper (`#f2f0ea`)
- **Text**: Ink (`#172033`)

### Typography
- **Display**: Literata (headings, branding)
- **Body**: Atkinson Hyperlegible (UI, content)
- **Monospace**: For ASL gloss display

### Spacing
Uses Material UI spacing scale (8px base)

### Components
- **Paper**: Elevated surfaces with shadows
- **IconButton**: Touch-friendly icon buttons
- **Tooltip**: Contextual help
- **Fab**: Floating action buttons
- **Box**: Flexible containers

## ⚡ Performance

### Caching Strategy

**Client-Side**:
- API responses cached in memory (1-hour TTL)
- TTS audio cached in Service Worker
- Embeddings cached for semantic search

**Server-Side**:
- Translation cache (in-memory)
- Summary cache (in-memory)
- Embedding cache (in-memory)
- Database queries optimized with indexes

### Bundle Size
- ASL Interpreter: ~25KB (gzipped)
- Voice System: ~15KB (gzipped)
- Material UI: ~80KB (gzipped, tree-shaken)
- Total addition: ~120KB (gzipped)

### Loading Strategy
- Lazy load ASL model on first use
- Preload critical voices
- Progressive enhancement for AI features

## ♿ Accessibility

### WCAG 2.2 AA Compliance
- ✅ Color contrast ratios ≥ 4.5:1
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Touch targets ≥ 44px
- ✅ ARIA labels and landmarks
- ✅ Semantic HTML
- ✅ Captions and transcripts
- ✅ Reduced motion support

### Assistive Technology Support
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Keyboard Only**: Full navigation
- **Voice Control**: Dragon NaturallySpeaking
- **Switch Control**: iOS/Android support
- **Magnification**: Zoom up to 400%

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
npm test

# Backend tests
cd backend
pytest

# E2E tests
npm run test:e2e
```

### Manual Testing Checklist
- [ ] ASL interpreter appears when video plays
- [ ] Interpreter is resizable
- [ ] Voice synthesis works for both languages
- [ ] Summaries generate correctly
- [ ] Chat responds appropriately
- [ ] Cache improves performance
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Screen reader compatible

## 📱 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| ASL Interpreter | ✅ | ✅ | ✅ | ✅ |
| Voice (EN) | ✅ | ✅ | ✅ | ✅ |
| Voice (AM) | ✅ | ⚠️* | ✅ | ✅ |
| Material UI | ✅ | ✅ | ✅ | ✅ |
| Caching | ✅ | ✅ | ✅ | ✅ |

*Limited Amharic voice support in Firefox

## 🔐 Security

### API Security
- CORS configured for allowed origins
- Rate limiting on endpoints
- Input validation with Pydantic
- SQL injection prevention (parameterized queries)

### Data Privacy
- Row Level Security (RLS) in Supabase
- User data encryption at rest
- HTTPS in production
- No PII in logs

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Fly.io)
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker
```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📈 Analytics

Track usage with video_analytics table:
- Video views
- ASL interpreter usage
- Voice feature usage
- Average watch time

## 🔮 Future Enhancements

- [ ] Video ASL interpretation (sign language video overlay)
- [ ] Real-time caption translation
- [ ] Multi-language support (beyond EN/AM)
- [ ] Offline mode with IndexedDB
- [ ] Progressive Web App (PWA)
- [ ] WebRTC for live interpretation
- [ ] Custom voice training
- [ ] Advanced analytics dashboard

## 📚 Resources

- [Material UI Docs](https://mui.com/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Gemini AI](https://ai.google.dev/)
- [ASL Linguistics](https://www.lifeprint.com/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)

## 🤝 Contributing

Contributions welcome! Please:
1. Follow accessibility guidelines
2. Write tests for new features
3. Update documentation
4. Use TypeScript for type safety
5. Follow Material UI design patterns

## 📄 License

Same as LearnAble project (see LICENSE file).

## 💬 Support

For questions or issues:
- GitHub Issues
- Documentation: `docs/`
- API Docs: http://127.0.0.1:8000/docs (when backend is running)

---

**Powered by Pocket Sign AI** 🤟
*Making education accessible for everyone*
