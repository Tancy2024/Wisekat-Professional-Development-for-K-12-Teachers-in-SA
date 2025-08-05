# backend/app/services/summary_service.py
from typing import Literal
import os
from openai import AsyncOpenAI

# Create a reusable async client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def summarize_text(
    text: str,
    style: Literal["concise", "detailed", "bullet"] = "concise",
    model: str = "gpt-3.5-turbo",        # 可改 "gpt-4o-mini" / "gpt-4o"
    max_tokens: int = 160
) -> str:
    """
    Summarize given text with a chosen style using OpenAI Chat models.

    Parameters
    ----------
    text : str
        Original text to summarize.
    style : str
        Summary style ("concise" / "detailed" / "bullet").
    model : str
        Chat model name; lowest-cost is `gpt-3.5-turbo`.
    max_tokens : int
        Token cap for the summary.

    Returns
    -------
    str : The generated summary.
    """
    prompt = f"Summarize the following text in a {style} style:\n\n{text}"

    response = await client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content.strip()
