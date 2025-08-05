from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from app.services import community_service as svc
from app.schemas.community_schemas import (
    PostCreate, PostPublic, PostInDB,
    ReplyCreate, ReplyPublic
)
from app.core.security import get_current_user  # 你们已有的 JWT 依赖
from app.models.user_models import User

router = APIRouter(tags=["Community"])

# --------- 帖子 ----------
@router.post("/posts", response_model=PostInDB, status_code=201)
async def create_post(
    post_in: PostCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await svc.create_post(db, post_in, current_user.id)

@router.get("/posts", response_model=List[PostPublic])
async def list_posts(skip: int = 0, limit: int = 20, db: AsyncSession = Depends(get_db)):
    return await svc.get_posts(db, skip, limit)

@router.get("/posts/{post_id}", response_model=PostPublic)
async def get_post(post_id: int, db: AsyncSession = Depends(get_db)):
    return await svc.get_post(db, post_id)

# --------- 回复 ----------
@router.post("/replies", response_model=ReplyPublic, status_code=201)
async def create_reply(
    reply_in: ReplyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await svc.create_reply(db, reply_in, current_user.id)
