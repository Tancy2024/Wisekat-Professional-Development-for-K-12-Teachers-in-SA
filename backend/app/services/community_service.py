from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from app.models.community_models import Post, Reply
from app.schemas.community_schemas import PostCreate, ReplyCreate
from app.models.user_models import User
from sqlalchemy.orm import selectinload

# --------- Posts ----------
async def create_post(db: AsyncSession, post_in: PostCreate, user_id: int) -> Post:
    obj = Post(**post_in.dict(), author_id=user_id)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def get_posts(db: AsyncSession, skip: int = 0, limit: int = 20) -> list[Post]:
    res = await db.execute(
        select(Post)
        .options(selectinload(Post.author))
        .order_by(Post.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return res.scalars().unique().all()

async def get_post(db: AsyncSession, post_id: int) -> Post:
    # 在获取单个帖子时也加载作者和回复信息
    res = await db.execute(
        select(Post)
        .where(Post.id == post_id)
        .options(selectinload(Post.author), selectinload(Post.replies).selectinload(Reply.author))
    )
    post = res.scalars().unique().one_or_none()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post

# --------- Replies ----------
async def create_reply(db: AsyncSession, reply_in: ReplyCreate, user_id: int) -> Reply:
    # 确保帖子存在
    _ = await get_post(db, reply_in.post_id)
    obj = Reply(**reply_in.dict(), author_id=user_id)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj
