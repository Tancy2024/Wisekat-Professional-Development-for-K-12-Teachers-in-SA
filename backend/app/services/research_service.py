# app/services/research_service.py

import requests

SEMANTIC_SCHOLAR_BASE = "https://api.semanticscholar.org/graph/v1"

def search_papers(query: str, limit: int = 5) -> list:
    """
    Searches papers from Semantic Scholar based on query.

    Args:
        query (str): Keywords to search.
        limit (int): Max number of results to return.

    Returns:
        list: List of papers with title, authors, year, and abstract.
    """
    url = f"{SEMANTIC_SCHOLAR_BASE}/paper/search"
    params = {
        "query": query,
        "limit": limit,
        "fields": "title,abstract,authors,year,url"
    }

    response = requests.get(url, params=params)
    response.raise_for_status()

    papers = response.json().get("data", [])
    return papers
