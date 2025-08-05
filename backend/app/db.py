# backend/app/db.py
from os import getenv

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import declarative_base

# ---- 1. 数据库 URL ----------------------------------------------------------
# 在 .env 里配置 DATABASE_URL，例如：
#   postgresql+asyncpg://username:password@localhost:5432/jz1_db
DATABASE_URL = getenv("DATABASE_URL", "sqlite+aiosqlite:///./dev.db")

# ---- 2. 创建异步 Engine ------------------------------------------------------
engine = create_async_engine(
    DATABASE_URL,
    echo=False,         # 调试时改 True 会打印 SQL
    future=True,
)

# ---- 3. 全局 Declarative Base -----------------------------------------------
Base = declarative_base()

# ---- 4. 会话工厂 -------------------------------------------------------------
async_session_maker = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

# ---- 5. FastAPI 依赖 ---------------------------------------------------------
async def get_db() -> AsyncSession:
    """
    FastAPI dependency that provides a SQLAlchemy AsyncSession.
    Usage:
        async def my_route(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()
