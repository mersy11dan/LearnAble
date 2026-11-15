# 🚀 Quick Start Guide - Pocket Sign

Get Pocket Sign running in 5 minutes!

## Prerequisites

- Node.js 22+
- Python 3.11+
- Modern browser (Chrome, Firefox, Safari, or Edge)

## 🎯 Quick Setup (Development)

### 1. Frontend (Already Running!)

The frontend is already running on http://127.0.0.1:5173

If you need to restart it:

```bash
cd /workspace
npm install  # Already done
npm run dev
```

Open: http://127.0.0.1:5173

### 2. Backend (Optional - for AI features)

The chat works without the backend using fallback responses. To enable full AI features:

```bash
# Open a new terminal
cd /workspace/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and add your keys (optional):
# - GEMINI_API_KEY (get free from https://makersuite.google.com/app/apikey)
# - SUPABASE_URL and SUPABASE_KEY (get from https://supabase.com)

# Run backend
python main.py
```

Backend runs on: http://127.0.0.1:8000

API Docs: http://127.0.0.1:8000/docs

## 🎬 Testing the Features

### 1. Basic Chat (Works Now!)
1. Open http://127.0.0.1:5173
2. Click the green chat button (bottom-right corner)
3. Ask: "How do I use captions?"
4. Get instant response!

### 2. Voice Input
1. Click microphone button in chat
2. Allow microphone access
3. Speak: "Where can I download offline content?"
4. Watch it transcribe and respond!

### 3. ASL Translation
1. Click "ASL" button in chat
2. Type: "The doctor will help you now"
3. Click "Translate to ASL"
4. See: "DOCTOR WILL HELP YOU NOW"

### 4. ASL Interpreter (on Video Player)
**Note**: This needs to be integrated with the video player component

To see it work:
1. Navigate to a page with video player
2. Start playing the video
3. ASL interpreter appears bottom-right
4. Resize it by dragging corner handle
5. Toggle fullscreen or hide it

## 🔑 Get API Keys (Optional but Recommended)

### Google Gemini (Free)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
5. Add to `/workspace/.env`:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
6. Add to `/workspace/backend/.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### Supabase (Free Tier)
1. Visit: https://supabase.com
2. Create new project
3. Go to Settings → API
4. Copy URL and anon key
5. Add to `/workspace/backend/.env`:
   ```
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key
   ```
6. Go to SQL Editor
7. Paste contents of `/workspace/backend/supabase_schema.sql`
8. Run the query

## 📱 Features Overview

### ✅ Working Now (No Setup Needed)
- Chat support with fallback responses
- Voice input (browser permission required)
- ASL translation with fallback
- Keyboard navigation
- Mobile responsive
- High contrast mode
- Reduced motion

### ⚡ With Backend (Optional)
- AI-powered chat responses
- Smarter ASL translations
- Video summaries
- Embeddings for semantic search
- Usage analytics
- Persistent chat history

### 🎨 With Gemini API Key
- Enhanced chat intelligence
- Better ASL translations
- Context-aware responses
- Video content summaries

### 💾 With Supabase
- Chat history saved
- Translation cache
- User preferences
- Analytics dashboard
- Vector search

## 🛠️ Common Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Lint code
```

### Backend
```bash
python main.py                    # Start server
uvicorn main:app --reload         # Start with auto-reload
pytest                            # Run tests (when added)
```

## 🐛 Troubleshooting

### Chat button doesn't appear
- Check browser console for errors
- Refresh page
- Clear browser cache

### Voice input not working
- Grant microphone permission
- Check browser supports Web Speech API
- Try Chrome or Edge (best support)

### ASL translation slow first time
- First use downloads model (~10 seconds)
- Subsequent translations are fast
- Model cached in browser

### Backend won't start
- Check Python version: `python --version` (need 3.11+)
- Install dependencies: `pip install -r requirements.txt`
- Check port 8000 not in use: `lsof -i :8000`

### Frontend won't build
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run clean` (if available)
- Check Node version: `node --version` (need 22+)

## 📚 Next Steps

1. ✅ **Test the app** - Try all features
2. 📖 **Read docs** - Check docs/POCKET-SIGN.md
3. 🔑 **Add API keys** - Get enhanced features
4. 🎨 **Customize** - Adjust colors, fonts, features
5. 🚀 **Deploy** - When ready for production

## 🌐 URLs Reference

- **Frontend**: http://127.0.0.1:5173
- **Backend**: http://127.0.0.1:8000
- **API Docs**: http://127.0.0.1:8000/docs
- **Backend Health**: http://127.0.0.1:8000/health

## 💡 Tips

1. **No API keys needed** to start - everything works with fallbacks
2. **Mobile first** - Test on phone or responsive mode
3. **Keyboard accessible** - Try Tab, Enter, Escape
4. **Voice commands** - Best in quiet environment
5. **Cache works** - Second requests are instant

## 🎉 That's It!

You're ready to use Pocket Sign!

Questions? Check:
- docs/POCKET-SIGN.md - Full documentation
- docs/CHAT-SUPPORT.md - Chat feature details
- docs/TESTING-CHAT.md - Testing guide

---

**Happy coding! 🤟**
