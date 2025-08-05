# app/api/routes/basic_routes.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    """
    Returns the welcome message.
    """
    return {"message": "Welcome to the One-stop AI Teaching Tools Platform"}

@router.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy"}
