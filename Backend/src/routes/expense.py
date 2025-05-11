from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from src.schemas.schemas import ExpenseCreate, ExpenseOut, AIResponse
from src.models.models import Expense, User
from src.db import SessionDep
from src.services import expense_service, ai_service

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/", response_model=ExpenseOut, summary="Create a new expense", description="This endpoint allows authenticated users to create a new expense. The user needs to provide a title, amount, and an optional category. The newly created expense will be returned upon success.")
def create_expense(expense: ExpenseCreate, db: SessionDep, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    user = db.query(User).filter(User.username == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return expense_service.create_expense(
        expense=expense,
        db=db,
        user=user
    )

@router.get("/", response_model=list[ExpenseOut], summary="Get all expenses", description="This endpoint retrieves all expenses for the currently authenticated user. The response includes a list of all recorded expenses along with their details such as title, amount, and category.")
def get_my_expenses(db: SessionDep, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    return expense_service.get_my_expenses(
        db=db,
        user=current_user
    )

@router.get("/analysis", summary="Analyze expenses with Gemini AI", response_model=AIResponse, description="This endpoint analyzes the user's expenses using Gemini AI. It provides a breakdown of total spending, spending by category, and offers recommendations for better financial habits.")
def analyze_expenses(db: SessionDep, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    user = db.query(User).filter(User.username == current_user).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return ai_service.analyze_user_expenses(db=db, current_user=user)
