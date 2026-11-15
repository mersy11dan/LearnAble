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

# Voice & Chat Agents
from voice_agent import (
    HumanizedVoiceAgent,
    ConversationAgent,
    create_voice_agent,
    create_chat_agent
)

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

# Initialize Voice & Chat Agents
voice_agents: Dict[str, HumanizedVoiceAgent] = {}
chat_agents: Dict[str, ConversationAgent] = {}

def get_voice_agent(language: str = "en", emotion: str = "neutral") -> HumanizedVoiceAgent:
    """Get or create voice agent"""
    key = f"{language}_{emotion}"
    if key not in voice_agents:
        voice_agents[key] = create_voice_agent(language=language, emotion=emotion)
    return voice_agents[key]

def get_chat_agent(conversation_id: str = "default") -> ConversationAgent:
    """Get or create chat agent"""
    if conversation_id not in chat_agents:
        chat_agents[conversation_id] = create_chat_agent(
            model=os.getenv("OLLAMA_MODEL", "qwen3.5:4b"),
            use_voice=True
        )
    return chat_agents[conversation_id]

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

class VoiceRequest(BaseModel):
    text: str
    language: str = "en"  # "en" or "am"
    emotion: str = "neutral"  # "neutral", "excited", "calm", "formal"
    speed: int = 150  # words per minute
    for_blind: bool = False  # Add audio description

class ChatMessage(BaseModel):
    message: str
    video_context: Optional[Dict] = None
    use_voice: bool = False
    conversation_id: Optional[str] = None

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

@app.post("/api/voice/speak")
async def speak_text(request: VoiceRequest):
    """
    Convert text to speech with humanized voice
    
    Supports:
    - English and Amharic
    - Multiple emotions (neutral, excited, calm, formal)
    - Blind-user descriptions
    - Speed control
    """
    try:
        # Get or create voice agent
        voice_agent = get_voice_agent(request.language, request.emotion)
        voice_agent.speed = request.speed
        
        # Generate speech
        if request.for_blind:
            # Add audio description context
            audio_file = voice_agent.describe_for_blind(
                scene_description="ASL video content",
                action="signing",
                translation=request.text
            )
        else:
            audio_file = voice_agent.speak(request.text)
        
        if audio_file and Path(audio_file).exists():
            # Return audio file
            from fastapi.responses import FileResponse
            return FileResponse(
                audio_file,
                media_type="audio/mpeg",
                filename="speech.mp3"
            )
        else:
            return JSONResponse({
                "success": False,
                "message": "Could not generate speech. Check TTS engine configuration."
            })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_with_agent(request: ChatMessage):
    """
    Chat with LLM about ASL content
    
    Features:
    - Context-aware responses
    - Conversation history
    - Optional voice output
    - Blind-user friendly
    
    Uses qwen3.5:4b or configured Ollama model
    """
    try:
        # Get conversation agent
        conversation_id = request.conversation_id or "default"
        chat_agent = get_chat_agent(conversation_id)
        
        # Prepare context
        context = request.video_context if request.video_context else {}
        
        # Chat
        response = chat_agent.chat(
            user_message=request.message,
            context=context,
            speak_response=request.use_voice
        )
        
        result = {
            "success": True,
            "message": response["text"],
            "conversation_id": conversation_id,
            "history_length": response["history_length"]
        }
        
        # Include audio if generated
        if response.get("audio"):
            result["audio_url"] = f"/api/voice/audio/{Path(response['audio']).name}"
        
        return JSONResponse(result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat/reset")
async def reset_conversation(conversation_id: str = "default"):
    """Reset conversation history"""
    if conversation_id in chat_agents:
        chat_agents[conversation_id].reset()
        return {"message": "Conversation reset", "conversation_id": conversation_id}
    return {"message": "No conversation found", "conversation_id": conversation_id}

@app.post("/api/asl/translate-with-voice")
async def translate_video_with_voice(
    file: UploadFile = File(...),
    mode: str = "dual",
    target_lang: str = "both",
    include_voice: bool = True,
    for_blind: bool = False
):
    """
    Translate ASL video with optional voice output
    Perfect for blind users - includes audio descriptions
    
    Parameters:
    - file: Video file
    - mode: "hf", "ollama", or "dual"
    - target_lang: "en", "am", or "both"
    - include_voice: Generate speech audio
    - for_blind: Include detailed audio descriptions
    """
    temp_dir = tempfile.mkdtemp()
    temp_path = Path(temp_dir) / file.filename
    
    try:
        # Save and process video
        contents = await file.read()
        with open(temp_path, "wb") as f:
            f.write(contents)
        
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
        
        # Add voice if requested
        if include_voice:
            voice_en = get_voice_agent("en", "neutral")
            voice_am = get_voice_agent("am", "neutral")
            
            audio_files = {}
            
            # English audio
            if "english" in result:
                text_en = result["english"].get("huggingface", {}).get("text") or \
                         result["english"].get("ollama", {}).get("text")
                
                if text_en:
                    if for_blind:
                        audio_files["english"] = voice_en.describe_for_blind(
                            scene_description="person signing in American Sign Language",
                            action="performing hand gestures",
                            translation=text_en
                        )
                    else:
                        audio_files["english"] = voice_en.speak(text_en)
            
            # Amharic audio
            if "amharic" in result:
                text_am = result["amharic"].get("huggingface", {}).get("text") or \
                         result["amharic"].get("ollama", {}).get("text")
                
                if text_am:
                    if for_blind:
                        audio_files["amharic"] = voice_am.describe_for_blind(
                            scene_description="የእጅ ምልክት ቋንቋ",
                            action="እጆችን በመጠቀም",
                            translation=text_am
                        )
                    else:
                        audio_files["amharic"] = voice_am.speak(text_am)
            
            result["audio_files"] = audio_files
            result["for_blind"] = for_blind
        
        result["filename"] = file.filename
        result["mode"] = mode
        result["target_lang"] = target_lang
        
        return JSONResponse(result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        try:
            if temp_path.exists():
                temp_path.unlink()
            Path(temp_dir).rmdir()
        except Exception:
            pass

@app.get("/api/voice/test")
async def test_voice_system():
    """Test voice system availability"""
    status = {
        "pyttsx3": False,
        "gtts": False,
        "hasab": False,
        "ollama_chat": False
    }
    
    # Test pyttsx3
    try:
        import pyttsx3
        engine = pyttsx3.init()
        status["pyttsx3"] = True
    except:
        pass
    
    # Test gTTS
    try:
        from gtts import gTTS
        status["gtts"] = True
    except:
        pass
    
    # Test Hasab
    if os.getenv("HASAB_API_KEY"):
        status["hasab"] = True
    
    # Test Ollama
    try:
        ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
        response = requests.get(f"{ollama_url}/api/tags", timeout=2)
        if response.status_code == 200:
            status["ollama_chat"] = True
    except:
        pass
    
    return JSONResponse({
        "status": status,
        "recommended": "pyttsx3" if status["pyttsx3"] else "gtts" if status["gtts"] else "none",
        "chat_model": os.getenv("OLLAMA_MODEL", "qwen3.5:4b"),
        "message": "Voice system ready!" if any(status.values()) else "No TTS engines available"
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
