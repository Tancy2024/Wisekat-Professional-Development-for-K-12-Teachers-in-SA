# backend/app/services/image_service.py
"""
Image service that calls OpenAI's Image (DALL·E) API.
"""

import os
import logging
from openai import OpenAI, APIError
from fastapi import HTTPException

# It's good practice to instantiate the client once and reuse it.
# The client automatically reads the API key from the OPENAI_API_KEY environment variable.
try:
    client = OpenAI()
except Exception as e:
    logging.error("Failed to initialize OpenAI client: %s", e)
    # This RuntimeError will prevent the application from starting if the client fails to initialize,
    # which is a good thing because the image generation service would not work anyway.
    raise RuntimeError("Failed to initialize OpenAI client. Is OPENAI_API_KEY set?") from e

def generate_image(prompt: str, size: str = "512x512") -> str:
    """
    Generate an image via OpenAI (dall-e-2 by default). Returns the image URL.
    """
    try:
        response = client.images.generate(
            model="dall-e-2",      # cheapest model
            prompt=prompt,
            size=size,
            n=1,
        )
        if response.data and response.data[0].url:
            return response.data[0].url
        else:
            # This case should ideally not be reached if the API call is successful,
            # but it's good practice to handle it.
            raise HTTPException(status_code=500, detail="Image generation succeeded but no URL was returned.")
    except APIError as e:
        logging.error("OpenAI image generation failed: %s", e)
        # Forward the error from the OpenAI API to the client.
        raise HTTPException(status_code=e.status_code, detail=str(e.message))
    except Exception as e:
        logging.error("An unexpected error occurred during image generation: %s", e)
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

# --- Switch to higher‑quality model ---
# Change model="dall-e-3" for better images (higher cost).
