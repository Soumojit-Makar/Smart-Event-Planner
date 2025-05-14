from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from src.schemas.schemas import UserCreate, UserLogin, UserOut
from src.services.auth_service import create_user, authenticate_user
from src.db import SessionDep
from src.schemas.schemas import Token 

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut, summary="Register a new user", description="This endpoint allows new users to register by providing their full name, email, and password. Upon successful registration, the user details will be returned.")
def register(user: UserCreate, db: SessionDep):
    return create_user(db, user)

@router.post("/login", response_model=Token, summary="Login an existing user", description="This endpoint allows an existing user to log in by providing their username and password. If the credentials are valid, an access token (JWT) will be issued, which can be used for further authentication in secured routes.")
def login(user: UserLogin, db: SessionDep, Authorize: AuthJWT = Depends()):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = Authorize.create_access_token(subject=db_user.username)
    refresh_token = Authorize.create_refresh_token(subject=db_user.username)
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
        )
@router.post("/refresh", response_model=Token, summary="Refresh access token")
def refresh_token(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=401, detail="Refresh token invalid")

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    new_refresh_token=Authorize.create_refresh_token(subject=current_user)

    return Token(
        access_token=new_access_token,
        refresh_token=new_refresh_token, 
        token_type="bearer"
    )
