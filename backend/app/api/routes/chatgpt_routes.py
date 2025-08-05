from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chatgpt_service import ask_chatgpt

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str

@router.post("/chat", tags=["ChatGPT"])
async def chat_with_gpt(request: ChatRequest):
    response = await ask_chatgpt(request.prompt)
    return {"response": response}
