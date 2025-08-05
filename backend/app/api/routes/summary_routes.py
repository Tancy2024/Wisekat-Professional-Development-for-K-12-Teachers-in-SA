# backend/app/api/routes/summary_routes.py
from fastapi import APIRouter, Body
from typing import Optional
from app.services.summary_service import summarize_text

router = APIRouter()

@router.post("/generate", tags=["Text Summarization"])
async def generate_summary(
    text: str = Body(..., embed=True, description="Text to summarize"),
    style: Optional[str] = Body("concise", embed=True, description="Summary style")
):
    summary = await summarize_text(text, style)
    return {"summary": summary}
