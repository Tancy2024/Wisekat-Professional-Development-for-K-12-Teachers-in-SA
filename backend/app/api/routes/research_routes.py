# app/api/routes/research_routes.py

from fastapi import APIRouter, HTTPException, Query
from app.services import research_service

router = APIRouter()

@router.get("/search")
async def search_papers(q: str = Query(..., description="Search keywords")):
    """
    Searches academic papers using Semantic Scholar API.
    """
    try:
        results = research_service.search_papers(q)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
