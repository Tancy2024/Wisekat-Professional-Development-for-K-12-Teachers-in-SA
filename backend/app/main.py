"""
app.main
────────────────────────────────────────────────────────────
FastAPI application entry‐point for the “One-stop AI Teaching
Tools Platform”.

* 所有路由模块在此集中挂载，统一管理前缀 / 标签
* CORS 中允许前端地址由环境变量控制，方便多环境部署
* 支持 `python -m app.main` 或 `uvicorn app.main:app --reload`
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ─── 路由模块导入 ──────────────────────────────────────────────────
from app.api.routes import (
    basic_routes,
    ai_tools_routes,
    user_routes,
    about_routes,
    course_routes,
    chatgpt_routes,
    image_routes,
    summary_routes,
    audio_routes,
    research_routes,
    auth_routes,         # ← 新增：JWT 注册 / 登录
    community_routes,    # ← 新增：发帖 / 回复
)

# ─── 应用初始化 ────────────────────────────────────────────────────
app = FastAPI(
    title="One-stop AI Teaching Tools Platform API",
    description="Backend service integrating various AI teaching tools and examples.",
    version="1.0.0",
)

# ─── CORS 设置 ────────────────────────────────────────────────────
FRONTEND_ORIGINS = os.getenv("FRONTEND_ORIGINS", "http://localhost:3000")
# 可用逗号分隔多个来源，如："http://localhost:3000,https://prod.app.com"
allow_origins = [o.strip() for o in FRONTEND_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# ─── 路由挂载 ──────────────────────────────────────────────────────
app.include_router(basic_routes.router)                                       # /
app.include_router(ai_tools_routes.router, prefix="/ai")                      # /ai/...
app.include_router(user_routes.router, prefix="/users", tags=["Users"])       # /users/...
app.include_router(auth_routes.router)                                        # /auth/...
app.include_router(community_routes.router, prefix="/community", tags=["Community"])  # /community/...
app.include_router(about_routes.router,   prefix="/about",   tags=["About"])
app.include_router(course_routes.router,  prefix="/courses", tags=["Courses"])
app.include_router(chatgpt_routes.router, prefix="/chatgpt", tags=["ChatGPT"])
app.include_router(image_routes.router,   prefix="/image",   tags=["Image Generation"])
app.include_router(summary_routes.router, prefix="/summary", tags=["Summarization"])
app.include_router(audio_routes.router,   prefix="/audio",   tags=["Audio"])
app.include_router(research_routes.router,prefix="/research",tags=["Research"])

# ─── CLI 运行 ─────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,              # 开发阶段自动热重载
    )
