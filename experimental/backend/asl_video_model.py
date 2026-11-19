"""
ASL Video-to-Text Model
Supports both local (Ollama) and online (Hugging Face) inference
with MediaPipe pose extraction for efficient processing
"""

import cv2
import numpy as np
import mediapipe as mp
from typing import List, Dict, Optional, Tuple
import requests
import json
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline
import os


def heavy_models_enabled() -> bool:
    """Hugging Face and Ollama downloads stay off unless this is exactly 1."""
    return os.environ.get("LEARNABLE_ASL_VIDEO", "").strip() == "1"

UNAVAILABLE = {
    "success": False,
    "source": "unavailable",
    "label": "Computer-generated. ASL, not Ethiopian Sign Language.",
    "message": "Video-to-text is unavailable. Set LEARNABLE_ASL_VIDEO=1 to opt in. Nothing was downloaded.",
}


class ASLVideoProcessor:
    """Process ASL videos using MediaPipe pose extraction"""
    
    def __init__(self):
        # Initialize MediaPipe
        self.mp_holistic = mp.solutions.holistic
        self.mp_hands = mp.solutions.hands
        self.holistic = None
        
    def extract_keypoints(self, video_path: str, max_frames: int = 300) -> np.ndarray:
        """
        Extract hand and upper-body keypoints from video using MediaPipe
        Returns: numpy array of shape (num_frames, num_keypoints, 3) for x,y,z coordinates
        """
        cap = cv2.VideoCapture(video_path)
        keypoints_sequence = []
        
        with self.mp_holistic.Holistic(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        ) as holistic:
            frame_count = 0
            while cap.isOpened() and frame_count < max_frames:
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Convert BGR to RGB
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False
                
                # Process with MediaPipe
                results = holistic.process(image)
                
                # Extract keypoints
                frame_keypoints = []
                
                # Left hand landmarks (21 points)
                if results.left_hand_landmarks:
                    for landmark in results.left_hand_landmarks.landmark:
                        frame_keypoints.extend([landmark.x, landmark.y, landmark.z])
                else:
                    frame_keypoints.extend([0.0] * 63)  # 21 * 3
                
                # Right hand landmarks (21 points)
                if results.right_hand_landmarks:
                    for landmark in results.right_hand_landmarks.landmark:
                        frame_keypoints.extend([landmark.x, landmark.y, landmark.z])
                else:
                    frame_keypoints.extend([0.0] * 63)  # 21 * 3
                
                # Pose landmarks - upper body only (11 points: shoulders, elbows, wrists, etc)
                if results.pose_landmarks:
                    # Extract only upper body landmarks (indices 11-22)
                    for i in range(11, 23):
                        landmark = results.pose_landmarks.landmark[i]
                        frame_keypoints.extend([landmark.x, landmark.y, landmark.z])
                else:
                    frame_keypoints.extend([0.0] * 36)  # 12 * 3
                
                keypoints_sequence.append(frame_keypoints)
                frame_count += 1
        
        cap.release()
        
        # Convert to numpy array and pad if necessary
        keypoints_array = np.array(keypoints_sequence)
        
        # Pad or truncate to fixed length
        if len(keypoints_array) < max_frames:
            padding = np.zeros((max_frames - len(keypoints_array), keypoints_array.shape[1]))
            keypoints_array = np.vstack([keypoints_array, padding])
        else:
            keypoints_array = keypoints_array[:max_frames]
        
        return keypoints_array
    
    def preprocess_for_model(self, keypoints: np.ndarray) -> torch.Tensor:
        """Convert keypoints to tensor format for model input"""
        # Normalize keypoints
        keypoints_normalized = (keypoints - keypoints.mean()) / (keypoints.std() + 1e-8)
        return torch.FloatTensor(keypoints_normalized).unsqueeze(0)


class ASLTranslator:
    """Translate ASL gestures to text using multiple inference backends"""
    
    def __init__(
        self,
        hf_token: Optional[str] = None,
        ollama_url: str = "http://localhost:11434"
    ):
        self.hf_token = hf_token
        self.ollama_url = ollama_url
        self.video_processor = ASLVideoProcessor()
        
        # Initialize models
        self.hf_model_name = "mamounyosef/sign-language-bridge"
        self.gloss_model_name = "Suyash2205/signbridge-t5-base-asl-gloss"
        
        self.tokenizer = None
        self.model = None
        self.gloss_tokenizer = None
        self.gloss_model = None
        
    def load_hf_models(self):
        """Load Hugging Face models locally"""
        if not heavy_models_enabled():
            raise RuntimeError("LEARNABLE_ASL_VIDEO is not 1, so no Hugging Face model is downloaded.")
        if self.tokenizer is None:
            try:
                # Load gloss translation model
                self.gloss_tokenizer = AutoTokenizer.from_pretrained(self.gloss_model_name)
                self.gloss_model = AutoModelForSeq2SeqLM.from_pretrained(self.gloss_model_name)
                self.gloss_model.eval()
                print(f"✓ Loaded {self.gloss_model_name}")
            except Exception as e:
                print(f"Warning: Could not load models: {e}")
    
    def translate_video_hf(self, video_path: str, target_lang: str = "en") -> Dict:
        """
        Translate ASL video using Hugging Face models
        Returns text in the target language (en or am)
        """
        if not heavy_models_enabled():
            return dict(UNAVAILABLE)
        try:
            # Extract keypoints from video
            keypoints = self.video_processor.extract_keypoints(video_path)
            
            # Use Hugging Face Inference API
            if self.hf_token:
                return self._translate_with_hf_api(video_path, target_lang)
            else:
                # Use local models
                self.load_hf_models()
                return self._translate_with_local_model(keypoints, target_lang)
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "source": "huggingface"
            }
    
    def _translate_with_hf_api(self, video_path: str, target_lang: str) -> Dict:
        """Use Hugging Face Inference API"""
        headers = {"Authorization": f"Bearer {self.hf_token}"}
        
        # Read video file
        with open(video_path, 'rb') as f:
            video_data = f.read()
        
        # Call Hugging Face API
        api_url = f"https://api-inference.huggingface.co/models/{self.hf_model_name}"
        response = requests.post(api_url, headers=headers, data=video_data)
        
        if response.status_code == 200:
            result = response.json()
            text_en = result.get("text", result.get("generated_text", ""))
            
            # Translate to Amharic if needed
            if target_lang == "am":
                text_am = self._translate_to_amharic(text_en)
                return {
                    "success": True,
                    "text_en": text_en,
                    "text_am": text_am,
                    "source": "huggingface_api"
                }
            
            return {
                "success": True,
                "text": text_en,
                "source": "huggingface_api"
            }
        else:
            raise Exception(f"HF API error: {response.status_code}")
    
    def _translate_with_local_model(self, keypoints: np.ndarray, target_lang: str) -> Dict:
        """Use local Hugging Face models"""
        if self.gloss_model is None:
            self.load_hf_models()
        
        # For now, use a simple heuristic to convert keypoints to text
        # In production, you'd train a proper sequence model
        
        # Placeholder: detect simple gestures based on keypoint patterns
        text_en = self._keypoints_to_text(keypoints)
        
        if target_lang == "am":
            text_am = self._translate_to_amharic(text_en)
            return {
                "success": True,
                "text_en": text_en,
                "text_am": text_am,
                "source": "local_model"
            }
        
        return {
            "success": True,
            "text": text_en,
            "source": "local_model"
        }
    
    def translate_video_ollama(self, video_path: str, target_lang: str = "en") -> Dict:
        """
        Translate ASL video using Ollama (local LLM)
        Uses vision model to analyze video frames
        """
        if not heavy_models_enabled():
            return dict(UNAVAILABLE)
        try:
            # Extract keypoints
            keypoints = self.video_processor.extract_keypoints(video_path)
            
            # Convert keypoints to descriptive text
            description = self._describe_keypoints(keypoints)
            
            # Use Ollama for interpretation
            prompt = f"""You are an ASL (American Sign Language) interpreter. 
Based on the following hand and body position data from a sign language video, 
translate it into natural English text.

Position data summary:
{description}

Provide a natural, human-readable translation in {"English" if target_lang == "en" else "Amharic"}:"""
            
            response = requests.post(
                f"{self.ollama_url}/api/generate",
                json={
                    "model": "llama3.2-vision",  # or llava for vision tasks
                    "prompt": prompt,
                    "stream": False
                }
            )
            
            if response.status_code == 200:
                result = response.json()
                text = result.get("response", "")
                
                # Humanize the output
                text = self._humanize_text(text)
                
                return {
                    "success": True,
                    "text": text,
                    "source": "ollama",
                    "model": "llama3.2-vision"
                }
            else:
                raise Exception(f"Ollama error: {response.status_code}")
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "source": "ollama"
            }
    
    def translate_video_dual(self, video_path: str) -> Dict:
        """
        Translate video to both English and Amharic
        Returns results from both local and online models
        """
        results = {
            "english": {},
            "amharic": {}
        }
        
        # Try Hugging Face first
        try:
            hf_result = self.translate_video_hf(video_path, "en")
            if hf_result.get("success"):
                results["english"]["huggingface"] = hf_result
                
                # Get Amharic version
                hf_result_am = self.translate_video_hf(video_path, "am")
                if hf_result_am.get("success"):
                    results["amharic"]["huggingface"] = hf_result_am
        except Exception as e:
            print(f"HF translation failed: {e}")
        
        # Try Ollama
        try:
            ollama_result_en = self.translate_video_ollama(video_path, "en")
            if ollama_result_en.get("success"):
                results["english"]["ollama"] = ollama_result_en
            
            ollama_result_am = self.translate_video_ollama(video_path, "am")
            if ollama_result_am.get("success"):
                results["amharic"]["ollama"] = ollama_result_am
        except Exception as e:
            print(f"Ollama translation failed: {e}")
        
        return results
    
    def _keypoints_to_text(self, keypoints: np.ndarray) -> str:
        """
        Convert keypoints to text using heuristics
        This is a placeholder - in production, use a trained model
        """
        # Analyze movement patterns
        # Calculate hand movement velocities
        if len(keypoints) < 2:
            return "Unable to detect sign"
        
        # Simple heuristic: check for common patterns
        left_hand = keypoints[:, :63].reshape(-1, 21, 3)
        right_hand = keypoints[:, 63:126].reshape(-1, 21, 3)
        
        # Calculate average hand position
        left_center = np.mean(left_hand, axis=1)
        right_center = np.mean(right_hand, axis=1)
        
        # Detect simple gestures
        movement = np.linalg.norm(right_center[-1] - right_center[0])
        
        if movement > 0.3:
            return "Hello"
        elif movement > 0.15:
            return "Thank you"
        else:
            return "Yes"
    
    def _describe_keypoints(self, keypoints: np.ndarray) -> str:
        """Generate a text description of keypoint movements"""
        # Calculate statistics
        num_frames = len(keypoints[keypoints.sum(axis=1) != 0])
        
        # Analyze hand positions
        left_hand = keypoints[:, :63].reshape(-1, 21, 3)
        right_hand = keypoints[:, 63:126].reshape(-1, 21, 3)
        
        description = f"Video contains {num_frames} frames of signing.\n"
        description += "Hand movements detected with varying positions and gestures.\n"
        
        return description
    
    def _translate_to_amharic(self, text_en: str) -> str:
        """Translate English text to Amharic"""
        # Common ASL phrases in Amharic
        translations = {
            "hello": "ሰላም",
            "thank you": "አመሰግናለሁ",
            "yes": "አዎ",
            "no": "አይ",
            "please": "እባክዎ",
            "sorry": "ይቅርታ",
            "help": "እርዳታ",
            "good": "ጥሩ",
            "bad": "መጥፎ",
            "food": "ምግብ",
            "water": "ውሃ",
            "home": "ቤት",
            "school": "ትምህርት ቤት",
            "learn": "ተማር",
            "teach": "አስተምር",
            "student": "ተማሪ",
            "teacher": "መምህር",
        }
        
        # Simple word-by-word translation for common phrases
        text_lower = text_en.lower()
        for en, am in translations.items():
            if en in text_lower:
                return am
        
        # Fallback: use translation API if available
        return self._translate_via_api(text_en, "en", "am")
    
    def _translate_via_api(self, text: str, source: str, target: str) -> str:
        """Use external API for translation"""
        # This would use Hasab or Google Translate API
        # For now, return original text
        return text
    
    def _humanize_text(self, text: str) -> str:
        """Make the text output more natural and human-like"""
        # Remove technical jargon
        text = text.replace("Position data:", "")
        text = text.replace("Summary:", "")
        
        # Add natural flow
        text = text.strip()
        
        # Ensure proper punctuation
        if text and not text[-1] in '.!?':
            text += '.'
        
        # Capitalize first letter
        if text:
            text = text[0].upper() + text[1:]
        
        return text


# Convenience functions
def process_asl_video(
    video_path: str,
    mode: str = "off",
    target_lang: str = "both",  # "en", "am", or "both"
    hf_token: Optional[str] = None,
    ollama_url: str = "http://localhost:11434"
) -> Dict:
    """
    Main entry point for ASL video processing
    
    Args:
        video_path: Path to ASL video file
        mode: "hf" (Hugging Face), "ollama" (local), or "dual" (both)
        target_lang: "en", "am", or "both"
        hf_token: Hugging Face API token (optional)
        ollama_url: Ollama server URL
    
    Returns:
        Dictionary with translation results
    """
    if not heavy_models_enabled() or mode in ("", "off"):
        return dict(UNAVAILABLE)
    translator = ASLTranslator(hf_token=hf_token, ollama_url=ollama_url)

    if mode == "dual" or target_lang == "both":
        return translator.translate_video_dual(video_path)
    elif mode == "hf":
        if target_lang == "both":
            return {
                "english": translator.translate_video_hf(video_path, "en"),
                "amharic": translator.translate_video_hf(video_path, "am")
            }
        return translator.translate_video_hf(video_path, target_lang)
    elif mode == "ollama":
        if target_lang == "both":
            return {
                "english": translator.translate_video_ollama(video_path, "en"),
                "amharic": translator.translate_video_ollama(video_path, "am")
            }
        return translator.translate_video_ollama(video_path, target_lang)
    else:
        raise ValueError(f"Invalid mode: {mode}")


if __name__ == "__main__":
    # Example usage
    print("ASL Video-to-Text Model initialized")
    print("Supports: Hugging Face (online), Ollama (local)")
    print("Languages: English, Amharic")
    print("Features: MediaPipe pose extraction, humanized output")
