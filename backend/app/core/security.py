import os, datetime, jwt, hashlib, hmac
from typing import Optional
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

SECRET_KEY = os.getenv("JWT_SECRET", "dev-secret")
ALGORITHM  = "HS256"
ACCESS_EXPIRE_MINUTES = 60 * 24  # 1 天

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ---------- 密码哈希 ----------
def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain: str, hashed: str) -> bool:
    return hmac.compare_digest(_hash_password(plain), hashed)

# ---------- JWT ----------
def create_access_token(data: dict, expires_minutes: int = ACCESS_EXPIRE_MINUTES) -> str:
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# ---------- FastAPI 依赖 ----------
class User(BaseModel):
    id: int
    username: str

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    payload = decode_access_token(token)
    return User(id=int(payload["sub"]), username=payload["username"])
