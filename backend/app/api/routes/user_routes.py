# app/api/routes/user_routes.py
from fastapi import APIRouter
from app.schemas import user as user_schema

router = APIRouter()

@router.post("/register")
async def register_user(user: user_schema.User):
    """
    API endpoint for user registration.
    """
    # In a real scenario, insert user data into the database or perform other operations here.
    return {"message": f"User {user.username} registered successfully", "user": user}
