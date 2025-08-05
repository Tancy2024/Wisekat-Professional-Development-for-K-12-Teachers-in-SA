from sqlalchemy import Column, Integer, String
from app.db import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    username      = Column(String(50), unique=True, nullable=False, index=True)
    password_hash = Column(String(128), nullable=False)        # ← 新增

    posts   = relationship("Post", back_populates="author", lazy="selectin")
    replies = relationship("Reply", back_populates="author", lazy="selectin")
