# backend/app/services/chatgpt_service.py
"""
Service layer for ChatGPT QA tool.

This version is compatible with openai-python >= 1.0.0.
We instantiate a single AsyncOpenAI client (thread-safe) and call
client.chat.completions.create(...) to get the answer.

If you prefer synchronous calls, see the commented block at the bottom.
"""

from typing import Literal
from openai import AsyncOpenAI
from openai.types.chat import ChatCompletion

# Initialise the async client once (re-use between requests)
client = AsyncOpenAI()  # Will automatically read OPENAI_API_KEY from env

# Model you want to use – gpt-3.5-turbo is the cheapest.
# Change to "gpt-4o-mini" / "gpt-4o" etc. if you need higher quality.
DEFAULT_MODEL: Literal["gpt-3.5-turbo"] = "gpt-3.5-turbo"


async def ask_chatgpt(prompt: str, model: str = DEFAULT_MODEL) -> str:
    """
    Send a user question to ChatGPT and return the assistant's reply.

    Args:
        prompt: The natural-language question.
        model:  OpenAI model name (default gpt-3.5-turbo).

    Returns:
        Assistant reply text.
    """
    try:
        # New SDK call
        response: ChatCompletion = await client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=512,
        )
        # The assistant's reply is always the first choice
        return response.choices[0].message.content.strip()
    except Exception as exc:  # broad catch so we can surface the message
        # Log the error – here用 print，你的项目里可换 logger
        print(f"ChatGPT request failed: {exc}")
        # 让 FastAPI 抛 HTTPException 给前端
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=f"ChatGPT request failed: {exc}")


# ───────────────────────────────────────────────────────────────
# Synchronous version (commented-out)
# from openai import OpenAI
# sync_client = OpenAI()
# def ask_chatgpt_sync(prompt: str, model: str = DEFAULT_MODEL) -> str:
#     response = sync_client.chat.completions.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt},
#         ],
#         temperature=0.7,
#         max_tokens=512,
#     )
#     return response.choices[0].message.content.strip()
# ───────────────────────────────────────────────────────────────
