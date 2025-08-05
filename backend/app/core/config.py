# app/core/config.py
import os

class Settings:
    APP_NAME = "One-stop AI Teaching Tools Platform API"
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"

settings = Settings()
