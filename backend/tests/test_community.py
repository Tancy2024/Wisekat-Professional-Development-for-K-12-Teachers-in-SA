# tests/test_community.py
import sys
import pathlib
import asyncio
import pytest
from fastapi import FastAPI
from httpx import AsyncClient, ASGITransport

# ── 让解释器找到 backend/app ─────────────────────────────────────────
BASE_DIR = pathlib.Path(__file__).resolve().parents[1]  # backend/
sys.path.append(str(BASE_DIR))

# ── 仅挂载社区路由，避免拉入多余依赖 ────────────────────────────────
from app.api.routes import community_routes
from app.db import Base, engine
from app.core.security import create_access_token

app = FastAPI(title="Test Community API")
app.include_router(community_routes.router)

# ── 自动建表（session 级，只跑一次）─────────────────────────────────
@pytest.fixture(scope="session", autouse=True)
def create_test_db():
    async def _create():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    asyncio.get_event_loop().run_until_complete(_create())

# ── JWT 帮助函数 ───────────────────────────────────────────────────
def _auth_header(user_id: int = 1):
    token = create_access_token(
        {"sub": str(user_id), "username": f"user{user_id}"}  # 添加 username
    )
    return {"Authorization": f"Bearer {token}"}

# ── 核心测试 ───────────────────────────────────────────────────────
@pytest.mark.asyncio
async def test_create_and_fetch_post():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1) 创建帖子
        resp = await ac.post(
            "/community/posts",
            json={"title": "pytest title", "content": "pytest body"},
            headers=_auth_header(),
        )
        assert resp.status_code == 201
        post_id = resp.json()["id"]

        # 2) 获取帖子详情
        resp = await ac.get(f"/community/posts/{post_id}")
        assert resp.status_code == 200
        data = resp.json()
        assert data["title"] == "pytest title"
        assert data["replies"] == []
