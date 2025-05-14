from pydantic import BaseSettings
from dotenv import load_dotenv
from datetime import timedelta
from fastapi_jwt_auth import AuthJWT
import os

load_dotenv()

class Settings(BaseSettings):
    authjwt_secret_key: str = os.getenv("SECRET_KEY")
    authjwt_algorithm: str = os.getenv("ALGORITHM", "HS256")
    authjwt_access_token_expires: timedelta = timedelta(
        minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    )
    authjwt_refresh_token_expires: timedelta = timedelta(
        days=int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))
    )


@AuthJWT.load_config
def get_config():
    return Settings()  

DATABASE_URL = os.getenv("DATABASE_URL")

AI_API_KEY=os.getenv("AI_API_KEY")