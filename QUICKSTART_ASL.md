# Quick Start: ASL Video-to-Text Recognition

Off unless `LEARNABLE_ASL_VIDEO=1`. The commands below are not part of `npm ci`, `pip install -r server/requirements.txt`, or the 3G check. Nothing here is Ethiopian Sign Language.

# Quick Start: ASL Video-to-Text Recognition

Get the ASL (American Sign Language) video-to-text system running in **5 minutes**!

## ⚡ Super Quick Start

```bash
# 1. Clone and navigate
cd LearnAble/backend

# 2. Run setup script
./setup.sh

# 3. Configure (add your HF token)
cp .env.example .env
nano .env  # or vim, code, etc.

# 4. Start API
source .venv/bin/activate
python main.py

# 5. Test it!
python test_asl_local.py
```

Done! API running at `http://localhost:8000` 🎉

## 📋 Prerequisites

- **Python 3.8+** (3.10+ recommended)
- **pip** package manager
- **4GB+ RAM** (8GB+ recommended)
- **Internet connection** (for downloading models)

### Optional but Recommended

- **Ollama** for local processing
- **CUDA-capable GPU** for faster inference
- **Hugging Face account** for API access

## 🎯 Minimal Setup (Online Only)

If you only want online processing via Hugging Face:

```bash
# Install dependencies
cd backend
pip install fastapi uvicorn python-dotenv pydantic
pip install opencv-python mediapipe transformers torch
pip install supabase google-generativeai requests

# Set environment
export HF_TOKEN=your_hugging_face_token

# Run
python main.py
```

## 🏠 Full Setup (Local + Online)

For both local (Ollama) and online (HF) processing:

### Step 1: Install Ollama

```bash
# Install
curl -fsSL https://ollama.com/install.sh | sh

# Start server (in separate terminal)
ollama serve

# Pull vision model
ollama pull llava
```

### Step 2: Get API Keys

1. **Hugging Face Token** (free)
   - Go to https://huggingface.co/settings/tokens
   - Create a new token (read access)
   - Copy the token

2. **Gemini API Key** (optional, free tier available)
   - Go to https://makersuite.google.com/app/apikey
   - Create API key
   - Copy the key

3. **Supabase** (optional, for data storage)
   - Go to https://supabase.com/dashboard
   - Create project
   - Copy URL and anon key

### Step 3: Configure

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIxxxxxxxxxxxxxxxxxx
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_KEY=eyxxxxxxxxxxxxxxxxxx
OLLAMA_URL=http://localhost:11434
```

### Step 4: Install Dependencies

```bash
./setup.sh
```

Or manually:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Step 5: Run Tests

```bash
source .venv/bin/activate
python test_asl_local.py
```

You should see:

```
🧪 ASL VIDEO-TO-TEXT SYSTEM TEST SUITE
======================================================================

TEST 1: MediaPipe Keypoint Extraction
✓ Extracted keypoints shape: (60, 162)

TEST 2: Ollama Connection
✓ Ollama is running
  - Available models: 3

TEST 3: Hugging Face Connection
✓ Hugging Face API is accessible

TEST 4: ASL Translation Pipeline
✓ Translation result:
  - Success: True
  - Text: Hello

📊 TEST SUMMARY
✅ PASS     Keypoint Extraction
✅ PASS     Ollama Connection
✅ PASS     HuggingFace Connection
✅ PASS     ASL Translation

🎉 All tests passed! System is ready.
```

### Step 6: Start API

```bash
python main.py
```

Output:

```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## 🎬 Test with a Video

### Create a test video

```bash
python test_asl_local.py  # This creates test_asl.mp4
```

### Upload via curl

```bash
curl -X POST http://localhost:8000/api/asl/translate-video \
  -F "file=@test_asl.mp4" \
  -F "mode=dual" \
  -F "target_lang=both"
```

### Upload via Python

```python
import requests

with open('test_asl.mp4', 'rb') as f:
    files = {'file': f}
    data = {'mode': 'dual', 'target_lang': 'both'}
    
    response = requests.post(
        'http://localhost:8000/api/asl/translate-video',
        files=files,
        data=data
    )
    
print(response.json())
```

### Via Web Browser

1. Open http://localhost:8000/docs
2. Find `POST /api/asl/translate-video`
3. Click "Try it out"
4. Upload video file
5. Set parameters
6. Click "Execute"

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'cv2'"

```bash
pip install opencv-python==4.9.0.80
```

### "Cannot connect to Ollama"

```bash
# Start Ollama in another terminal
ollama serve

# Or install it first
curl -fsSL https://ollama.com/install.sh | sh
ollama serve
```

### "HF API returns 503"

The model is loading (cold start). Wait 30-60 seconds and retry.

### "Out of memory"

Reduce batch size or use CPU-only mode:

```python
# In asl_video_model.py, add:
import torch
torch.cuda.is_available = lambda: False  # Force CPU
```

### "MediaPipe landmarks not detected"

- Ensure video has clear hand visibility
- Check lighting conditions
- Try a different video angle
- Increase video resolution

## 📊 Performance Tips

### Speed Up Processing

1. **Use GPU**: Install CUDA and PyTorch with GPU support
   ```bash
   pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
   ```

2. **Cache Results**: Results are auto-cached for 1 hour

3. **Reduce Video Length**: Process shorter clips (2-5 seconds)

4. **Lower Resolution**: Use 640x480 instead of HD

### Improve Accuracy

1. **Good Lighting**: Bright, even lighting
2. **Clear Background**: Solid color background
3. **Center Subject**: Keep hands in frame
4. **Fine-tune Model**: Train on your specific signs

## 🎓 Training Custom Model

For better accuracy on your specific signs:

```bash
# Download real datasets
python train_asl_model.py \
  --use-real-data \
  --num-samples 10000 \
  --epochs 5

# This takes ~2 hours on GPU, ~8 hours on CPU
```

## 📚 What's Next?

- **Read full docs**: `docs/ASL-VIDEO-TO-TEXT.md`
- **Explore API**: `http://localhost:8000/docs`
- **Check examples**: `backend/test_asl_local.py`
- **Train models**: `backend/train_asl_model.py`

## 🆘 Need Help?

- **Documentation**: [docs/ASL-VIDEO-TO-TEXT.md](docs/ASL-VIDEO-TO-TEXT.md)
- **Issues**: [GitHub Issues](https://github.com/mersy11dan/LearnAble/issues)
- **Backend README**: [backend/README.md](backend/README.md)

---

Built with ❤️ for accessibility
