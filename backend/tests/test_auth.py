# tests/test_auth.py
import sys
import pathlib
import asyncio
import uuid
import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import FastAPI

# ── 让解释器找到 backend/app ─────────────────────────────────────────
BASE_DIR = pathlib.Path(__file__).resolve().parents[1]
sys.path.append(str(BASE_DIR))

from app.api.routes import auth_routes
from app.db import Base, engine

app = FastAPI(title="Test Auth API")
app.include_router(auth_routes.router)

# ── 每次 session 先 drop_all 再 create_all，保证空库 ────────────────
@pytest.fixture(scope="session", autouse=True)
def prepare_db():
    async def _prepare():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)
    asyncio.get_event_loop().run_until_complete(_prepare())

# ── 核心测试 ───────────────────────────────────────────────────────
@pytest.mark.asyncio
async def test_register_and_login():
    unique_username = f"alice_{uuid.uuid4().hex[:6]}"  # 保证唯一
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 注册
        r = await ac.post(
            "/auth/register",
            json={"username": unique_username, "password": "pwd"},
        )
        assert r.status_code == 201
        assert r.json()["access_token"]

        # 登录
        r = await ac.post(
            "/auth/login",
            data={"username": unique_username, "password": "pwd"},
        )
        assert r.status_code == 200
        assert r.json()["access_token"]
