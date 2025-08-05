# app/api/routes/about_routes.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_about_info():
    """
    Returns basic information about the platform.
    """
    about_info = {
        "platform": "One-stop AI Teaching Tools Platform",
        "description": "This platform integrates various AI teaching tools and real teaching cases to enhance the educational experience.",
        "version": "1.0.0",
        "contact": "support@example.com"
    }
    return about_info
