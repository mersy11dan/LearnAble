"""
Pocket Sign Backend API
FastAPI backend for AI-powered ASL translation and video analysis
"""

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
from datetime import datetime
import hashlib
import json
import tempfile
from pathlib import Path

# Supabase
from supabase import create_client, Client
import google.generativeai as genai
from dotenv import load_dotenv

# ASL Video Processing
from asl_video_model import ASLTranslator, process_asl_video

load_dotenv()

# Initialize FastAPI
app = FastAPI(
    title="Pocket Sign API",
    description="AI-powered ASL translation and video analysis API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Optional[Client] = None

if supabase_url and supabase_key:
    supabase = create_client(supabase_url, supabase_key)

# Initialize Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

# In-memory cache
cache: Dict[str, Dict] = {}

# Models
class TranslationRequest(BaseModel):
    text: str
    source_lang: str = "en"
    target: str = "asl"

class SummaryRequest(BaseModel):
    video_id: str
    text: str
    duration: Optional[float] = None

class EmbeddingRequest(BaseModel):
    text: str
    model: str = "gemini"

class ChatRequest(BaseModel):
    message: str
    context: Optional[List[Dict]] = None
    video_id: Optional[str] = None

class CacheResponse(BaseModel):
    cached: bool
    data: Optional[Dict] = None

class ASLVideoRequest(BaseModel):
    mode: str = "dual"  # "hf", "ollama", or "dual"
    target_lang: str = "both"  # "en", "am", or "both"

# Helper functions
def generate_cache_key(prefix: str, data: str) -> str:
    """Generate a cache key from prefix and data"""
    return f"{prefix}:{hashlib.md5(data.encode()).hexdigest()}"

def get_from_cache(key: str) -> Optional[Dict]:
    """Get data from cache"""
    if key in cache:
        entry = cache[key]
        if datetime.now().timestamp() - entry["timestamp"] < 3600:  # 1 hour TTL
            return entry["data"]
        else:
            del cache[key]
    return None

def set_cache(key: str, data: Dict) -> None:
    """Set data in cache"""
    cache[key] = {
        "data": data,
        "timestamp": datetime.now().timestamp()
    }

# Routes
@app.get("/")
async def root():
    return {
        "app": "Pocket Sign API",
        "version": "1.0.0",
        "status": "running",
        "features": [
            "ASL Translation",
            "Video Summaries",
            "AI Chat",
            "Embeddings",
            "Caching"
        ]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "supabase": supabase is not None,
        "gemini": gemini_api_key is not None,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/translate")
async def translate_to_asl(request: TranslationRequest):
    """Translate text to ASL gloss notation"""
    cache_key = generate_cache_key("translate", request.text)
    
    # Check cache
    cached = get_from_cache(cache_key)
    if cached:
        return JSONResponse({"asl": cached["asl"], "cached": True})
    
    try:
        if gemini_api_key:
            model = genai.GenerativeModel('gemini-pro')
            prompt = f"Translate this English text to ASL (American Sign Language) gloss notation. Use uppercase, simplified grammar, and ASL word order. Text: {request.text}"
            response = model.generate_content(prompt)
            asl_text = response.text.strip()
        else:
            # Fallback: Simple uppercase conversion with articles removed
            words = request.text.upper().split()
            asl_text = " ".join([w for w in words if w not in ["THE", "A", "AN", "IS", "ARE"]])
        
        result = {"asl": asl_text, "cached": False}
        set_cache(cache_key, result)
        
        # Save to Supabase if available
        if supabase:
            try:
                supabase.table("translations").insert({
                    "original_text": request.text,
                    "asl_text": asl_text,
                    "source_lang": request.source_lang,
                    "created_at": datetime.now().isoformat()
                }).execute()
            except Exception as e:
                print(f"Supabase insert error: {e}")
        
        return JSONResponse(result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/summary")
async def generate_summary(request: SummaryRequest):
    """Generate AI summary of video content"""
    cache_key = generate_cache_key("summary", request.video_id + request.text)
    
    # Check cache
    cached = get_from_cache(cache_key)
    if cached:
        return JSONResponse({"summary": cached["summary"], "cached": True})
    
    try:
        if gemini_api_key:
            model = genai.GenerativeModel('gemini-pro')
            prompt = f"""Summarize this video content in 2-3 clear, simple sentences suitable for ASL interpretation:

{request.text}

Focus on the main points and use accessible language."""
            
            response = model.generate_content(prompt)
            summary = response.text.strip()
        else:
            # Fallback: Extract first and last sentences
            sentences = [s.strip() for s in request.text.split('.') if s.strip()]
            if len(sentences) <= 2:
                summary = '. '.join(sentences) + '.'
            else:
                summary = f"{sentences[0]}. {sentences[-1]}."
        
        result = {"summary": summary, "cached": False}
        set_cache(cache_key, result)
        
        # Save to Supabase
        if supabase:
            try:
                supabase.table("video_summaries").insert({
                    "video_id": request.video_id,
                    "summary": summary,
                    "duration": request.duration,
                    "created_at": datetime.now().isoformat()
                }).execute()
            except Exception as e:
                print(f"Supabase insert error: {e}")
        
        return JSONResponse(result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/embed")
async def generate_embedding(request: EmbeddingRequest):
    """Generate embeddings for text using Gemini"""
    cache_key = generate_cache_key("embed", request.text)
    
    # Check cache
    cached = get_from_cache(cache_key)
    if cached:
        return JSONResponse({"embedding": cached["embedding"], "cached": True})
    
    try:
        if gemini_api_key:
            model = genai.GenerativeModel('embedding-001')
            response = model.embed_content(request.text)
            embedding = response['embedding']
        else:
            # Fallback: Simple hash-based embedding
            words = request.text.lower().split()
            embedding = [0.0] * 768
            for i, word in enumerate(words):
                hash_val = hash(word)
                idx = abs(hash_val) % 768
                embedding[idx] += 1.0
            
            # Normalize
            magnitude = sum(x*x for x in embedding) ** 0.5
            if magnitude > 0:
                embedding = [x / magnitude for x in embedding]
        
        result = {"embedding": embedding, "cached": False}
        set_cache(cache_key, result)
        
        return JSONResponse(result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    """Chat with AI about video content"""
    try:
        if not gemini_api_key:
            return JSONResponse({
                "response": "I'm here to help! The AI chat requires a Gemini API key. For now, I can help with basic questions about LearnAble features.",
                "cached": False
            })
        
        model = genai.GenerativeModel('gemini-pro')
        
        context_str = ""
        if request.context:
            context_str = "\n\nConversation history:\n" + "\n".join([
                f"{msg['role']}: {msg['content']}" for msg in request.context[-5:]
            ])
        
        prompt = f"""You are Pocket Sign, an AI assistant helping deaf and blind users with accessible learning content. Provide helpful, concise answers.

User: {request.message}{context_str}
"""
        
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Save chat to Supabase
        if supabase and request.video_id:
            try:
                supabase.table("chat_history").insert({
                    "video_id": request.video_id,
                    "message": request.message,
                    "response": response_text,
                    "created_at": datetime.now().isoformat()
                }).execute()
            except Exception as e:
                print(f"Supabase insert error: {e}")
        
        return JSONResponse({"response": response_text, "cached": False})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/cache/stats")
async def get_cache_stats():
    """Get cache statistics"""
    total_entries = len(cache)
    valid_entries = sum(1 for entry in cache.values() 
                       if datetime.now().timestamp() - entry["timestamp"] < 3600)
    
    return {
        "total_entries": total_entries,
        "valid_entries": valid_entries,
        "expired_entries": total_entries - valid_entries
    }

@app.delete("/api/cache/clear")
async def clear_cache():
    """Clear all cache"""
    cache.clear()
    return {"message": "Cache cleared successfully"}

@app.post("/api/asl/translate-video")
async def translate_asl_video(
    file: UploadFile = File(...),
    mode: str = "dual",
    target_lang: str = "both"
):
    """
    Upload and translate ASL video to text
    
    Supports:
    - mode: "hf" (Hugging Face), "ollama" (local), or "dual" (both)
    - target_lang: "en", "am", or "both"
    
    Returns translations in English and/or Amharic with humanized output
    """
    # Validate file type
    if not file.content_type or not file.content_type.startswith("video/"):
        raise HTTPException(
            status_code=400,
            detail="File must be a video (mp4, avi, mov, etc.)"
        )
    
    # Save uploaded file temporarily
    temp_dir = tempfile.mkdtemp()
    temp_path = Path(temp_dir) / file.filename
    
    try:
        # Write uploaded file
        contents = await file.read()
        with open(temp_path, "wb") as f:
            f.write(contents)
        
        # Check cache
        file_hash = hashlib.md5(contents).hexdigest()
        cache_key = f"asl_video:{file_hash}:{mode}:{target_lang}"
        
        cached = get_from_cache(cache_key)
        if cached:
            return JSONResponse({
                **cached,
                "cached": True,
                "filename": file.filename
            })
        
        # Process video
        hf_token = os.getenv("HF_TOKEN")
        ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
        
        result = process_asl_video(
            video_path=str(temp_path),
            mode=mode,
            target_lang=target_lang,
            hf_token=hf_token,
            ollama_url=ollama_url
        )
        
        # Add metadata
        result["cached"] = False
        result["filename"] = file.filename
        result["mode"] = mode
        result["target_lang"] = target_lang
        
        # Cache result
        set_cache(cache_key, result)
        
        # Save to Supabase if available
        if supabase:
            try:
                supabase.table("asl_translations").insert({
                    "filename": file.filename,
                    "mode": mode,
                    "target_lang": target_lang,
                    "result": json.dumps(result),
                    "created_at": datetime.now().isoformat()
                }).execute()
            except Exception as e:
                print(f"Supabase insert error: {e}")
        
        return JSONResponse(result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
    finally:
        # Cleanup
        try:
            if temp_path.exists():
                temp_path.unlink()
            Path(temp_dir).rmdir()
        except Exception:
            pass

@app.post("/api/asl/extract-keypoints")
async def extract_video_keypoints(file: UploadFile = File(...)):
    """
    Extract MediaPipe keypoints from ASL video
    Returns hand and pose landmarks for further processing
    """
    if not file.content_type or not file.content_type.startswith("video/"):
        raise HTTPException(
            status_code=400,
            detail="File must be a video"
        )
    
    temp_dir = tempfile.mkdtemp()
    temp_path = Path(temp_dir) / file.filename
    
    try:
        contents = await file.read()
        with open(temp_path, "wb") as f:
            f.write(contents)
        
        # Initialize translator
        translator = ASLTranslator()
        
        # Extract keypoints
        keypoints = translator.video_processor.extract_keypoints(str(temp_path))
        
        return JSONResponse({
            "success": True,
            "filename": file.filename,
            "num_frames": len(keypoints),
            "keypoint_shape": keypoints.shape,
            "message": "Keypoints extracted successfully using MediaPipe"
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        try:
            if temp_path.exists():
                temp_path.unlink()
            Path(temp_dir).rmdir()
        except Exception:
            pass

@app.get("/api/asl/models")
async def list_asl_models():
    """List available ASL models and their status"""
    models = {
        "huggingface": {
            "sign_language_bridge": {
                "name": "mamounyosef/sign-language-bridge",
                "status": "available" if os.getenv("HF_TOKEN") else "requires_token",
                "description": "Video-to-text ASL translator"
            },
            "signbridge_gloss": {
                "name": "Suyash2205/signbridge-t5-base-asl-gloss",
                "status": "available",
                "description": "English to ASL gloss notation"
            }
        },
        "ollama": {
            "llama_vision": {
                "name": "llama3.2-vision",
                "status": "checking",
                "description": "Vision LLM for ASL interpretation"
            }
        },
        "datasets": {
            "signverse": {
                "name": "SignerX/SignVerse-2M",
                "size": "2M videos",
                "features": "pre-extracted pose keypoints"
            },
            "asl_dataset": {
                "name": "akasheroor/American-Sign-Language-Dataset",
                "size": "108,000 clips",
                "features": "2,200+ words"
            }
        }
    }
    
    # Check Ollama availability
    try:
        ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
        response = requests.get(f"{ollama_url}/api/tags", timeout=2)
        if response.status_code == 200:
            models["ollama"]["status"] = "available"
            models["ollama"]["models"] = response.json().get("models", [])
    except Exception:
        models["ollama"]["status"] = "unavailable"
    
    return JSONResponse(models)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
