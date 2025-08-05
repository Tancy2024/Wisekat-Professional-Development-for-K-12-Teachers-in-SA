from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.user import User as UserSchema


# ---------- Post ----------
class PostBase(BaseModel):
    title: str  = Field(..., min_length=1, max_length=150)
    content: str

class PostCreate(PostBase):
    pass

class PostInDB(PostBase):
    id: int
    author_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class PostPublic(PostInDB):
    # 包含作者信息和所有回复
    author: UserSchema
    replies: list["ReplyPublic"] = []

# ---------- Reply ----------
class ReplyBase(BaseModel):
    content: str

class ReplyCreate(ReplyBase):
    post_id: int

class ReplyInDB(ReplyBase):
    id: int
    author_id: int
    post_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ReplyPublic(ReplyInDB):
    # 包含作者信息
    author: UserSchema

PostPublic.update_forward_refs()
ReplyPublic.update_forward_refs()