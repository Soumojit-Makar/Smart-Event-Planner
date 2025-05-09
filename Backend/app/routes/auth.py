# app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.services.auth_service import create_user, authenticate_user
from app.db import get_db
from app.schemas.auth import Token 

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut,summary="It is responsible for register a new user")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.post("/login",response_model=Token,summary="It is responsible for authorize the existing  user")
def login(user: UserLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = Authorize.create_access_token(subject=db_user.username)
    return Token(access_token=access_token,token_type="bearer")
