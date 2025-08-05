from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from app.db import get_db
from app.schemas.auth_schemas import UserCreate, Token
from app.services import auth_service as svc
from app.core import security

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=Token, status_code=201)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    user = await svc.register(db, user_in)
    access = security.create_access_token({"sub": str(user.id), "username": user.username})
    return {"access_token": access}

@router.post("/login", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await svc.authenticate(db, form.username, form.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access = security.create_access_token({"sub": str(user.id), "username": user.username})
    return {"access_token": access}
