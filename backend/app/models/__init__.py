"""
Aggregate all SQLAlchemy models here so that:

* other modules can simply `from app.models import <Model>`
* Alembic auto-generation picks them up via `from app.models import *`
"""

from .community_models import Post, Reply      # noqa: F401
from .user_models import User 

# 如果已经存在其它业务模型，例如 User/Course 等，也在这里导入：
# from .user_models import User               # noqa: F401
# from .course_models import Course           # noqa: F401

__all__ = [
    "Post",
    "Reply",
    "User",
    # "Course",
]
