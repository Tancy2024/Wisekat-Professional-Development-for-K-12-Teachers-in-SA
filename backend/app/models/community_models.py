# backend/app/models/community_models.py
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base                         # ① 引入 Base

# -------------------- Post --------------------
class Post(Base):                               # ② 继承 Base
    __tablename__ = "posts"                     # ③ 指定表名

    id         = Column(Integer, primary_key=True, index=True)
    author_id  = Column(Integer, ForeignKey("users.id"), nullable=False)
    title      = Column(String(150), nullable=False)
    content    = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    author   = relationship("User", back_populates="posts", lazy="selectin")
    replies  = relationship(
        "Reply",
        back_populates="post",
        cascade="all, delete",
        lazy="selectin",
    )

# -------------------- Reply --------------------
class Reply(Base):
    __tablename__ = "replies"

    id         = Column(Integer, primary_key=True, index=True)
    post_id    = Column(Integer, ForeignKey("posts.id"), nullable=False)
    author_id  = Column(Integer, ForeignKey("users.id"), nullable=False)
    content    = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    post   = relationship("Post", back_populates="replies", lazy="selectin")
    author = relationship("User", back_populates="replies", lazy="selectin")
