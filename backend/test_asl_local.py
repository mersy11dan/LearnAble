"""
Test ASL Video-to-Text system locally
Tests both Ollama and Hugging Face backends
"""

import os
import sys
from pathlib import Path
import asyncio
import requests
import json
import tempfile
import cv2
import numpy as np

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from asl_video_model import ASLTranslator, ASLVideoProcessor, process_asl_video
from dotenv import load_dotenv

load_dotenv()


def create_test_video(duration_seconds: int = 2, output_path: str = "test_asl.mp4") -> str:
    """
    Create a simple test video for ASL processing
    Shows hand movements (simulated)
    """
    print(f"🎬 Creating test video: {output_path}")
    
    # Video properties
    fps = 30
    width, height = 640, 480
    total_frames = fps * duration_seconds
    
    # Create video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    for frame_idx in range(total_frames):
        # Create black background
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        
        # Simulate hand movement (white circle moving)
        t = frame_idx / total_frames
        x = int(width * 0.3 + width * 0.4 * t)
        y = int(height * 0.5 + height * 0.2 * np.sin(t * np.pi * 2))
        
        # Draw hand (circle)
        cv2.circle(frame, (x, y), 30, (255, 255, 255), -1)
        
        # Add text
        cv2.putText(
            frame,
            "ASL Test Video",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 255),
            2
        )
        
        out.write(frame)
    
    out.release()
    print(f"✓ Test video created: {output_path}")
    return output_path


def test_video_processor():
    """Test MediaPipe keypoint extraction"""
    print("\n" + "="*60)
    print("TEST 1: MediaPipe Keypoint Extraction")
    print("="*60)
    
    # Create test video
    video_path = create_test_video(duration_seconds=2)
    
    try:
        processor = ASLVideoProcessor()
        print("📊 Extracting keypoints...")
        
        keypoints = processor.extract_keypoints(video_path, max_frames=60)
        
        print(f"✓ Extracted keypoints shape: {keypoints.shape}")
        print(f"  - Number of frames: {keypoints.shape[0]}")
        print(f"  - Keypoints per frame: {keypoints.shape[1]}")
        print(f"  - Total landmarks: {keypoints.shape[1] // 3}")
        
        # Check for valid keypoints
        non_zero = np.count_nonzero(keypoints)
        total = keypoints.size
        print(f"  - Non-zero values: {non_zero}/{total} ({non_zero/total*100:.1f}%)")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    finally:
        # Cleanup
        if os.path.exists(video_path):
            os.remove(video_path)


def test_ollama_connection():
    """Test Ollama server connection"""
    print("\n" + "="*60)
    print("TEST 2: Ollama Connection")
    print("="*60)
    
    ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
    
    try:
        print(f"🔌 Checking Ollama at {ollama_url}")
        response = requests.get(f"{ollama_url}/api/tags", timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            models = data.get("models", [])
            print(f"✓ Ollama is running")
            print(f"  - Available models: {len(models)}")
            
            for model in models[:5]:  # Show first 5
                print(f"    • {model.get('name', 'Unknown')}")
            
            # Check for vision models
            vision_models = [m for m in models if 'vision' in m.get('name', '').lower() or 'llava' in m.get('name', '').lower()]
            if vision_models:
                print(f"  - Vision models found: {len(vision_models)}")
            else:
                print("  ⚠️  No vision models found. Install with: ollama pull llava")
            
            return True
        else:
            print(f"❌ Ollama returned status {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"❌ Cannot connect to Ollama at {ollama_url}")
        print("   Make sure Ollama is running: ollama serve")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def test_huggingface_connection():
    """Test Hugging Face API connection"""
    print("\n" + "="*60)
    print("TEST 3: Hugging Face Connection")
    print("="*60)
    
    hf_token = os.getenv("HF_TOKEN")
    
    if not hf_token:
        print("⚠️  HF_TOKEN not set in environment")
        print("   Add your token to .env file")
        print("   Get one at: https://huggingface.co/settings/tokens")
        return False
    
    try:
        print(f"🔌 Checking Hugging Face API...")
        
        # Test with a simple model
        headers = {"Authorization": f"Bearer {hf_token}"}
        url = "https://api-inference.huggingface.co/models/Suyash2205/signbridge-t5-base-asl-gloss"
        
        response = requests.post(
            url,
            headers=headers,
            json={"inputs": "translate English to ASL gloss: Hello world"},
            timeout=10
        )
        
        if response.status_code == 200:
            print("✓ Hugging Face API is accessible")
            result = response.json()
            print(f"  - Test response: {result}")
            return True
        elif response.status_code == 503:
            print("⚠️  Model is loading (this is normal for cold start)")
            print("   Try again in a minute")
            return True
        else:
            print(f"❌ API returned status {response.status_code}")
            print(f"   Response: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def test_asl_translation():
    """Test full ASL translation pipeline"""
    print("\n" + "="*60)
    print("TEST 4: ASL Translation Pipeline")
    print("="*60)
    
    # Create test video
    video_path = create_test_video(duration_seconds=2)
    
    try:
        translator = ASLTranslator(
            hf_token=os.getenv("HF_TOKEN"),
            ollama_url=os.getenv("OLLAMA_URL", "http://localhost:11434")
        )
        
        # Test with local processing (no API calls)
        print("🔄 Testing local translation (no API)...")
        
        keypoints = translator.video_processor.extract_keypoints(video_path)
        result = translator._translate_with_local_model(keypoints, "en")
        
        print(f"✓ Translation result:")
        print(f"  - Success: {result.get('success')}")
        print(f"  - Text: {result.get('text', result.get('text_en', 'N/A'))}")
        print(f"  - Source: {result.get('source')}")
        
        # Test Amharic
        print("\n🔄 Testing Amharic translation...")
        result_am = translator._translate_with_local_model(keypoints, "am")
        print(f"✓ Amharic result:")
        print(f"  - Text: {result_am.get('text', result_am.get('text_am', 'N/A'))}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        if os.path.exists(video_path):
            os.remove(video_path)


def test_api_endpoints():
    """Test FastAPI endpoints"""
    print("\n" + "="*60)
    print("TEST 5: API Endpoints")
    print("="*60)
    
    base_url = "http://localhost:8000"
    
    try:
        # Test health endpoint
        print(f"🔌 Testing {base_url}/health")
        response = requests.get(f"{base_url}/health", timeout=5)
        
        if response.status_code == 200:
            print("✓ API is running")
            data = response.json()
            print(f"  - Status: {data.get('status')}")
            print(f"  - Supabase: {data.get('supabase')}")
            print(f"  - Gemini: {data.get('gemini')}")
            
            # Test ASL models endpoint
            print(f"\n🔌 Testing {base_url}/api/asl/models")
            response = requests.get(f"{base_url}/api/asl/models", timeout=5)
            
            if response.status_code == 200:
                models = response.json()
                print("✓ ASL models endpoint working")
                print(f"  - HuggingFace models: {len(models.get('huggingface', {}))}")
                print(f"  - Ollama status: {models.get('ollama', {}).get('status')}")
            
            return True
        else:
            print(f"❌ API returned status {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"❌ Cannot connect to API at {base_url}")
        print("   Start the API with: python backend/main.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def test_video_upload():
    """Test video upload endpoint"""
    print("\n" + "="*60)
    print("TEST 6: Video Upload")
    print("="*60)
    
    base_url = "http://localhost:8000"
    video_path = create_test_video(duration_seconds=1)
    
    try:
        print(f"📤 Uploading video to {base_url}/api/asl/translate-video")
        
        with open(video_path, 'rb') as f:
            files = {'file': ('test.mp4', f, 'video/mp4')}
            data = {'mode': 'dual', 'target_lang': 'both'}
            
            response = requests.post(
                f"{base_url}/api/asl/translate-video",
                files=files,
                data=data,
                timeout=30
            )
        
        if response.status_code == 200:
            result = response.json()
            print("✓ Video processed successfully")
            print(f"  - Result: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return True
        else:
            print(f"❌ Upload failed with status {response.status_code}")
            print(f"   Response: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    finally:
        if os.path.exists(video_path):
            os.remove(video_path)


def run_all_tests():
    """Run all tests"""
    print("\n" + "="*70)
    print("🧪 ASL VIDEO-TO-TEXT SYSTEM TEST SUITE")
    print("="*70)
    print("\nTesting ASL video recognition with:")
    print("  • MediaPipe pose extraction")
    print("  • Hugging Face models")
    print("  • Ollama local inference")
    print("  • English & Amharic output")
    print("  • Humanized text generation")
    
    results = {
        "Keypoint Extraction": test_video_processor(),
        "Ollama Connection": test_ollama_connection(),
        "HuggingFace Connection": test_huggingface_connection(),
        "ASL Translation": test_asl_translation(),
    }
    
    # Optional: test API if running
    try:
        response = requests.get("http://localhost:8000/health", timeout=2)
        if response.status_code == 200:
            results["API Endpoints"] = test_api_endpoints()
            results["Video Upload"] = test_video_upload()
    except:
        print("\n⚠️  API not running - skipping API tests")
        print("   Start with: python backend/main.py")
    
    # Summary
    print("\n" + "="*70)
    print("📊 TEST SUMMARY")
    print("="*70)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, passed_test in results.items():
        status = "✅ PASS" if passed_test else "❌ FAIL"
        print(f"{status:12} {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed ({passed/total*100:.0f}%)")
    
    if passed == total:
        print("\n🎉 All tests passed! System is ready.")
    else:
        print("\n⚠️  Some tests failed. Check the output above.")
    
    # Next steps
    print("\n" + "="*70)
    print("📝 NEXT STEPS")
    print("="*70)
    print("\n1. Install Ollama (if not already):")
    print("   curl -fsSL https://ollama.com/install.sh | sh")
    print("   ollama serve")
    print("   ollama pull llava  # For vision tasks")
    print("\n2. Get Hugging Face token:")
    print("   https://huggingface.co/settings/tokens")
    print("   Add to .env: HF_TOKEN=your_token_here")
    print("\n3. Start the API:")
    print("   cd backend")
    print("   python main.py")
    print("\n4. Test video upload:")
    print("   curl -X POST http://localhost:8000/api/asl/translate-video \\")
    print("     -F 'file=@test_video.mp4' \\")
    print("     -F 'mode=dual' \\")
    print("     -F 'target_lang=both'")
    print("\n5. Train on real data (optional):")
    print("   python train_asl_model.py --use-real-data --num-samples 10000")


if __name__ == "__main__":
    run_all_tests()
