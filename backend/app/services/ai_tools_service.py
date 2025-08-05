# app/services/ai_tools_service.py

import os
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file (3 levels up)
load_dotenv()

# Retrieve API keys
openai_api_key = os.getenv("OPENAI_API_KEY")
openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
stability_api_key = os.getenv("STABILITY_API_KEY")

print("🔑 Loaded OpenRouter Key:", openrouter_api_key[:10] if openrouter_api_key else "❌ Not Found")


# -------------------------
# 🧠 1. ChatGPT via OpenRouter
# -------------------------
def call_chatgpt(prompt: str, model: str = "openai/gpt-3.5-turbo") -> str:
    """
    Calls a ChatGPT-compatible model via OpenRouter API.
    Supports GPT-4, Claude, Mistral, etc.
    """
    headers = {
        "Authorization": f"Bearer {openrouter_api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",  # Replace if deployed
        "X-Title": "AI Teaching Platform",
    }

    data = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        print("❌ Failed to call OpenRouter:", e)
        return "⚠️ OpenRouter request failed. Please check your model name, prompt, or API key."


# -------------------------
# 🎨 2. Image Generation via Stability.ai (DreamStudio)
# -------------------------
def generate_image_with_dreamstudio(prompt: str) -> dict:
    """
    Generates an image using Stability's SDXL model and returns the raw response (contains base64).
    """
    url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"

    headers = {
        "Authorization": f"Bearer {stability_api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "text_prompts": [{"text": prompt}],
        "cfg_scale": 7,
        "height": 1024,
        "width": 1024,
        "samples": 1,
        "steps": 30,
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print("❌ Image generation failed:", e)
        return {"error": "Image generation failed", "detail": str(e)}
