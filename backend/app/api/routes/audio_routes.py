# backend/app/api/routes/audio_routes.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.audio_service import transcribe_audio

router = APIRouter()

@router.post("/transcribe", tags=["Audio Processing"])
async def transcribe(file: UploadFile = File(...)):
    """
    Upload an audio file and get the transcription.
    """
    try:
        text = await transcribe_audio(file)
        return {"transcription": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
