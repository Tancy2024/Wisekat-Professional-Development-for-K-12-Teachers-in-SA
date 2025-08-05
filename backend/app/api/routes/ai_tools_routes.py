# app/api/routes/ai_tools_routes.py
from fastapi import APIRouter
from app.services import ai_tools_service

router = APIRouter()

@router.get("/text-tools")
async def ai_text_tools(query: str):
    return {"response": ai_tools_service.call_chatgpt(query)}

@router.get("/image-gen")
async def image_generation(prompt: str):
    return ai_tools_service.generate_image_with_dreamstudio(prompt)




