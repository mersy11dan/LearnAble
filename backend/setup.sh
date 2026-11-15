#!/bin/bash
# Setup script for LearnAble ASL Video-to-Text Backend

set -e

echo "🚀 Setting up LearnAble ASL Backend..."
echo ""

# Check Python version
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo "📌 Python version: $PYTHON_VERSION"

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip setuptools wheel

# Install requirements
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Configure environment variables:"
echo "   cp .env.example .env"
echo "   # Then edit .env with your API keys"
echo ""
echo "2. (Optional) Install Ollama for local processing:"
echo "   curl -fsSL https://ollama.com/install.sh | sh"
echo "   ollama serve  # Start the server"
echo "   ollama pull llava  # Download vision model"
echo ""
echo "3. Start the API server:"
echo "   source .venv/bin/activate"
echo "   python main.py"
echo ""
echo "4. Test the setup:"
echo "   python test_asl_local.py"
echo ""
echo "📖 Full documentation: ../docs/ASL-VIDEO-TO-TEXT.md"
echo ""
echo "🎉 Happy coding!"
