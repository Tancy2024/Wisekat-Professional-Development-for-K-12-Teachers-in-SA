AI‑Teaching‑Tools Backend

A FastAPI micro‑service that powers the AI features for our "One‑stop AI Teaching Tools" platform. It wraps several OpenAI endpoints (Vision, Chat, Whisper) behind simple REST routes so the front‑end can consume them with ease.

📦 Tech Stack

Layer

Technology

Language

Python 3.11+

Web Framework

FastAPI / Starlette

ASGI Server

Uvicorn (with hot‑reload)

LLM Provider

OpenAI Python SDK ^1.14

Audio

Whisper‑1 (speech → text)

Images

DALL·E 3 (image generation)

Auth / Keys

dotenv (python‑dotenv)

🚀 Quick Start

# 1 Clone the repo (monorepo root)
git clone <your‑repo‑url>
cd backend

# 2 Create & activate virtual‑env
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 3 Install deps
pip install -r requirements.txt

# 4 Set env‑vars (.env file)
cp .env.example .env            # then edit with your keys

# 5 Run dev server
uvicorn app.main:app --reload --port 8000

The API is now live at http://127.0.0.1:8000 and interactive docs are available at /docs (Swagger UI) or /redoc.

🔑 Environment Variables (.env)

Key

Description

OPENAI_API_KEY

Required. Your OpenAI secret key.

HF_API_TOKEN

Optional. HuggingFace token (if you enable HF models).

REPLICATE_API_TOKEN

Optional. Replicate token (legacy).

Tip: never commit real keys; use a local .env ignored by Git.

🗺️ API Reference

1. Image Generation

POST /image/generate
{
  "prompt": "A watercolor illustration of a robot teaching children",
  "size": "512x512"   # 256x256 | 512x512 | 1024x1024
}

Returns → { "image_url": "https://..." }

2. Text Summarization

POST /summary/generate
{
  "text": "<long‑text>",
  "style": "concise"   # concise | detailed | bullet
}

Returns → { "summary": "..." }

3. Audio Transcription

POST /audio/transcribe (multipart/form‑data)
file=<audio file>   # mp3, mp4, wav, m4a, flac, ogg …

Returns → { "transcript": "..." }

4. ChatGPT Q&A

POST /chatgpt/chat
{ "prompt": "What is the capital of Australia?" }

Returns → { "response": "The capital of Australia is Canberra." }

🧪 Running Tests

We use pytest (coming soon). For manual smoke tests, hit each route from the Swagger UI.

🛠️ Development Notes

The OpenAI SDK v1+ async interface is used (await openai.chat.completions.create).

Responses are already JSON‑serializable; FastAPI handles conversion.

CORS is enabled for local front‑end dev on port 3000.

Change logging level in app/core/config.py.

📚 License

MIT — see LICENSE.

Made with ❤️ by the JZ1 team for the MCI Project 2025.