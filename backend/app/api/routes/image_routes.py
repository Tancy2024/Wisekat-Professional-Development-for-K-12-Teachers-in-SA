# app/api/routes/image_routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services import image_service

router = APIRouter()

class ImageRequest(BaseModel):
    prompt: str
    size: str = "512x512"

@router.post("/generate")
async def generate_image(request: ImageRequest):
    """
    API endpoint to generate an image from a text prompt using DALL·E.
    """
    try:
        image_url = image_service.generate_image(request.prompt, request.size)
        return {"image_url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
