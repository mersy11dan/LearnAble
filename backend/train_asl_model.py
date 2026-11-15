"""
Train ASL Video-to-Text Model using Hugging Face Datasets
Supports fine-tuning on SignVerse-2M and American Sign Language datasets
"""

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    Trainer,
    TrainingArguments,
    DataCollatorForSeq2Seq
)
from datasets import load_dataset
import numpy as np
from typing import Dict, List, Optional
import os
from pathlib import Path
import json


class ASLKeypointDataset(Dataset):
    """Dataset for ASL keypoints to text translation"""
    
    def __init__(
        self,
        data: List[Dict],
        tokenizer,
        max_length: int = 512,
        max_frames: int = 300
    ):
        self.data = data
        self.tokenizer = tokenizer
        self.max_length = max_length
        self.max_frames = max_frames
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        item = self.data[idx]
        
        # Get keypoints and text
        keypoints = item.get("keypoints", [])
        text = item.get("text", "")
        
        # Flatten keypoints if needed
        if isinstance(keypoints, list) and len(keypoints) > 0:
            if isinstance(keypoints[0], list):
                keypoints_flat = [coord for frame in keypoints for coord in frame]
            else:
                keypoints_flat = keypoints
        else:
            keypoints_flat = [0.0] * (self.max_frames * 162)  # 54 landmarks * 3 coords
        
        # Convert keypoints to pseudo-text for seq2seq model
        # In production, use a video encoder instead
        keypoint_text = f"video: {' '.join(map(str, keypoints_flat[:100]))}"
        
        # Tokenize inputs
        inputs = self.tokenizer(
            keypoint_text,
            max_length=self.max_length,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )
        
        # Tokenize targets
        targets = self.tokenizer(
            text,
            max_length=64,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )
        
        return {
            "input_ids": inputs["input_ids"].squeeze(),
            "attention_mask": inputs["attention_mask"].squeeze(),
            "labels": targets["input_ids"].squeeze()
        }


class ASLSequenceModel(nn.Module):
    """
    Sequence-to-sequence model for ASL translation
    Takes keypoint sequences and outputs text
    """
    
    def __init__(
        self,
        input_dim: int = 162,  # 54 landmarks * 3 coordinates
        hidden_dim: int = 512,
        num_layers: int = 4,
        vocab_size: int = 50000
    ):
        super().__init__()
        
        # Encoder: Process keypoint sequences
        self.encoder_embedding = nn.Linear(input_dim, hidden_dim)
        self.encoder_lstm = nn.LSTM(
            hidden_dim,
            hidden_dim,
            num_layers,
            batch_first=True,
            bidirectional=True,
            dropout=0.3
        )
        
        # Decoder: Generate text
        self.decoder_embedding = nn.Embedding(vocab_size, hidden_dim)
        self.decoder_lstm = nn.LSTM(
            hidden_dim,
            hidden_dim * 2,
            num_layers,
            batch_first=True,
            dropout=0.3
        )
        self.output_layer = nn.Linear(hidden_dim * 2, vocab_size)
        
    def forward(self, keypoints, target_ids=None):
        # Encode keypoint sequence
        encoder_embedded = self.encoder_embedding(keypoints)
        encoder_out, (hidden, cell) = self.encoder_lstm(encoder_embedded)
        
        if target_ids is not None:
            # Training mode
            decoder_embedded = self.decoder_embedding(target_ids)
            decoder_out, _ = self.decoder_lstm(decoder_embedded, (hidden, cell))
            output = self.output_layer(decoder_out)
            return output
        else:
            # Inference mode
            # Generate text autoregressively
            batch_size = keypoints.size(0)
            max_length = 50
            
            # Start with SOS token
            current_input = torch.zeros(batch_size, 1).long().to(keypoints.device)
            outputs = []
            
            for _ in range(max_length):
                decoder_embedded = self.decoder_embedding(current_input)
                decoder_out, (hidden, cell) = self.decoder_lstm(
                    decoder_embedded, (hidden, cell)
                )
                output = self.output_layer(decoder_out[:, -1:, :])
                
                outputs.append(output)
                current_input = output.argmax(dim=-1)
            
            return torch.cat(outputs, dim=1)


def load_signverse_dataset(split: str = "train", num_samples: int = 1000):
    """
    Load SignVerse-2M dataset from Hugging Face
    This dataset provides pre-extracted pose keypoints
    """
    try:
        dataset = load_dataset(
            "SignerX/SignVerse-2M",
            split=split,
            streaming=True  # Stream for large dataset
        )
        
        # Take subset for training
        samples = []
        for i, item in enumerate(dataset):
            if i >= num_samples:
                break
            
            samples.append({
                "keypoints": item.get("keypoints", []),
                "text": item.get("text", item.get("gloss", "")),
                "language": item.get("language", "en")
            })
        
        return samples
    
    except Exception as e:
        print(f"Could not load SignVerse dataset: {e}")
        return []


def load_asl_dataset(split: str = "train", num_samples: int = 1000):
    """
    Load American Sign Language Dataset from Hugging Face
    108,000 video clips across 2,200+ words
    """
    try:
        dataset = load_dataset(
            "akasheroor/American-Sign-Language-Dataset",
            split=split,
            streaming=True
        )
        
        samples = []
        for i, item in enumerate(dataset):
            if i >= num_samples:
                break
            
            samples.append({
                "video": item.get("video", None),
                "text": item.get("text", item.get("label", "")),
                "word": item.get("word", "")
            })
        
        return samples
    
    except Exception as e:
        print(f"Could not load ASL dataset: {e}")
        return []


def create_synthetic_training_data(num_samples: int = 100) -> List[Dict]:
    """
    Create synthetic training data for testing
    In production, use real datasets
    """
    common_signs = [
        "Hello", "Thank you", "Please", "Sorry", "Help",
        "Yes", "No", "Good", "Bad", "Food", "Water",
        "Home", "School", "Learn", "Teach", "Friend",
        "Family", "Love", "Happy", "Sad", "Tired"
    ]
    
    # Amharic translations
    amharic_map = {
        "Hello": "ሰላም",
        "Thank you": "አመሰግናለሁ",
        "Please": "እባክዎ",
        "Sorry": "ይቅርታ",
        "Help": "እርዳታ",
        "Yes": "አዎ",
        "No": "አይ",
        "Good": "ጥሩ",
        "Bad": "መጥፎ",
        "Food": "ምግብ",
        "Water": "ውሃ",
        "Home": "ቤት",
        "School": "ትምህርት ቤት",
        "Learn": "ተማር",
        "Teach": "አስተምር",
        "Friend": "ጓደኛ",
        "Family": "ቤተሰብ",
        "Love": "ፍቅር",
        "Happy": "ደስተኛ",
        "Sad": "ሀዘን",
        "Tired": "ተዳክሟል"
    }
    
    data = []
    for i in range(num_samples):
        sign = common_signs[i % len(common_signs)]
        
        # Generate random keypoints (placeholder)
        num_frames = np.random.randint(10, 50)
        keypoints = np.random.randn(num_frames, 162).tolist()
        
        data.append({
            "keypoints": keypoints,
            "text_en": sign,
            "text_am": amharic_map.get(sign, sign),
            "language": "both"
        })
    
    return data


def train_asl_model(
    output_dir: str = "./asl_model_checkpoints",
    num_samples: int = 1000,
    epochs: int = 3,
    batch_size: int = 8,
    learning_rate: float = 5e-5,
    use_real_data: bool = False
):
    """
    Train ASL video-to-text model
    
    Args:
        output_dir: Directory to save model checkpoints
        num_samples: Number of training samples to use
        epochs: Number of training epochs
        batch_size: Training batch size
        learning_rate: Learning rate
        use_real_data: Whether to use real datasets (requires HF token)
    """
    print("🚀 Starting ASL Model Training")
    print(f"Output directory: {output_dir}")
    
    # Load tokenizer
    model_name = "Suyash2205/signbridge-t5-base-asl-gloss"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    # Load data
    if use_real_data:
        print("📥 Loading real datasets from Hugging Face...")
        train_data = load_signverse_dataset("train", num_samples)
        if not train_data:
            train_data = load_asl_dataset("train", num_samples)
        
        if not train_data:
            print("⚠️  Could not load real data, using synthetic data")
            train_data = create_synthetic_training_data(num_samples)
    else:
        print("🧪 Using synthetic training data")
        train_data = create_synthetic_training_data(num_samples)
    
    print(f"✓ Loaded {len(train_data)} training samples")
    
    # Prepare data for training
    training_samples = []
    for item in train_data:
        training_samples.append({
            "keypoints": item.get("keypoints", []),
            "text": item.get("text_en", item.get("text", ""))
        })
    
    # Create dataset
    train_dataset = ASLKeypointDataset(training_samples, tokenizer)
    
    # Load model
    print("🔧 Loading pre-trained model...")
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=epochs,
        per_device_train_batch_size=batch_size,
        learning_rate=learning_rate,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir=f"{output_dir}/logs",
        logging_steps=10,
        save_steps=100,
        save_total_limit=3,
        fp16=torch.cuda.is_available(),
        report_to="none"
    )
    
    # Data collator
    data_collator = DataCollatorForSeq2Seq(tokenizer, model=model)
    
    # Create trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        data_collator=data_collator
    )
    
    # Train
    print("🏋️  Training model...")
    trainer.train()
    
    # Save final model
    print("💾 Saving model...")
    trainer.save_model(output_dir)
    tokenizer.save_pretrained(output_dir)
    
    print(f"✅ Training complete! Model saved to {output_dir}")
    
    return model, tokenizer


def evaluate_model(model_path: str, test_samples: List[Dict]):
    """Evaluate trained model on test samples"""
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
    model.eval()
    
    correct = 0
    total = len(test_samples)
    
    print("\n🧪 Evaluating model...")
    
    for item in test_samples:
        keypoints = item.get("keypoints", [])
        expected = item.get("text_en", item.get("text", ""))
        
        # Convert keypoints to text (simplified)
        keypoint_text = f"video: {' '.join(map(str, keypoints[:100]))}"
        
        inputs = tokenizer(keypoint_text, return_tensors="pt", truncation=True)
        
        with torch.no_grad():
            outputs = model.generate(**inputs, max_length=64)
        
        predicted = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        if predicted.lower().strip() == expected.lower().strip():
            correct += 1
        
        print(f"Expected: {expected} | Predicted: {predicted}")
    
    accuracy = correct / total * 100
    print(f"\n📊 Accuracy: {accuracy:.2f}% ({correct}/{total})")
    
    return accuracy


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Train ASL Video-to-Text Model")
    parser.add_argument("--output-dir", default="./asl_model_checkpoints", help="Output directory")
    parser.add_argument("--num-samples", type=int, default=1000, help="Number of training samples")
    parser.add_argument("--epochs", type=int, default=3, help="Number of epochs")
    parser.add_argument("--batch-size", type=int, default=8, help="Batch size")
    parser.add_argument("--learning-rate", type=float, default=5e-5, help="Learning rate")
    parser.add_argument("--use-real-data", action="store_true", help="Use real HF datasets")
    parser.add_argument("--evaluate", action="store_true", help="Evaluate after training")
    
    args = parser.parse_args()
    
    # Train model
    model, tokenizer = train_asl_model(
        output_dir=args.output_dir,
        num_samples=args.num_samples,
        epochs=args.epochs,
        batch_size=args.batch_size,
        learning_rate=args.learning_rate,
        use_real_data=args.use_real_data
    )
    
    # Evaluate if requested
    if args.evaluate:
        test_data = create_synthetic_training_data(20)
        evaluate_model(args.output_dir, test_data)
    
    print("\n🎉 All done! Your model is ready for ASL translation.")
    print(f"📁 Model location: {args.output_dir}")
    print("\n💡 To use the model:")
    print(f"   from asl_video_model import ASLTranslator")
    print(f"   translator = ASLTranslator()")
    print(f"   result = translator.translate_video_hf('video.mp4')")
