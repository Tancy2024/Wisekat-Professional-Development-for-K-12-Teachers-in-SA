from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from app.models.user_models import User
from app.schemas.auth_schemas import UserCreate
from app.core import security
from typing import Optional

async def register(db: AsyncSession, data: UserCreate) -> User:
    # 用户名重复检查
    res = await db.execute(select(User).where(User.username == data.username))
    if res.scalar():
        raise HTTPException(status_code=400, detail="Username already taken")
    user = User(
        username=data.username,
        password_hash=security._hash_password(data.password),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def authenticate(db: AsyncSession, username: str, password: str) -> Optional[User]:
    res = await db.execute(select(User).where(User.username == username))
    user: User | None = res.scalar_one_or_none()
    if user and security.verify_password(password, user.password_hash):
        return user
    return None
