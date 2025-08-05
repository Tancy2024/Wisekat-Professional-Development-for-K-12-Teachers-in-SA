# File: backend/app/services/audio_service.py
"""
Async wrapper around OpenAI Whisper v1 for speech-to-text.
"""

import io, os
from fastapi import UploadFile, HTTPException
from openai import AsyncOpenAI, BadRequestError

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SUPPORTED_CT = {
    "audio/mpeg", "audio/mp3", "audio/mp4", "audio/mpga",
    "audio/wav", "audio/x-wav", "audio/webm", "audio/ogg", "audio/oga",
    "audio/x-flac", "audio/flac", "audio/m4a",
}


async def transcribe_audio(file: UploadFile) -> str:
    """Return plain-text transcription of an uploaded audio file."""
    if file.content_type not in SUPPORTED_CT:
        raise HTTPException(415, f"Unsupported content-type: {file.content_type}")

    raw = await file.read()
    if not raw:
        raise HTTPException(400, "Uploaded file is empty")

    buffer = io.BytesIO(raw)
    buffer.name = file.filename or "audio.mp3"  # whisper uses .name to guess format

    try:
        resp = await client.audio.transcriptions.create(
            model="whisper-1",
            file=buffer,
            response_format="text",      # returns str in SDK ≥1.0
        )
        # resp is str (>=1.0) or object (0.x).  Make it uniform:
        return resp if isinstance(resp, str) else resp.text

    except BadRequestError as e:
        raise HTTPException(400, f"OpenAI BadRequest: {e.body}") from e
    except Exception as e:
        raise HTTPException(500, f"Transcription failed: {e}") from e
