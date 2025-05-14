from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict


class UserCreate(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    salary: int

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "johndoe@example.com",
                "password": "strongpassword123",
                "salary":12000
            }
        }

class UserLogin(BaseModel):
    username: str
    password: str

    class Config:
        schema_extra = {
            "example": {
                "username": "johndoe",
                "password": "strongpassword123"
            }
        }

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    salary:int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "email": "johndoe@example.com",
                "full_name": "John Doe",
                "salary":12000
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: Optional[str] = None
    class Config:
        schema_extra = {
            "example": {
                "access_token": "some_jwt_token_value",
                "token_type": "bearer",
                "refresh_token":"some_jwt_refresh_token_value"
            }
        }


class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: Optional[str] = "General"

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseOut(ExpenseBase):
    id: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "title": "Lunch at Restaurant",
                "amount": 25.50,
                "category": "Food"
            }
        }

class AIResponse(BaseModel):
    total_spent: float
    spending_by_category: Dict[str, float]
    recommendation: Dict[str, List[str]]

    class Config:
        schema_extra = {
            "example": {
                "total_spent": 1200.50,
                "spending_by_category": {
                    "Food": 500.0,
                    "Travel": 300.0,
                    "Subscriptions": 400.5
                },
                "recommendation": {
                    "Good Habits": ["1. You’re tracking food regularly.", "2. You’re managing subscriptions well."],
                    "Needs Improvement": ["1. Too much on subscriptions.", "2. High travel expenses."],
                    "Tips": [
                        "1. Reduce eating out to lower food costs.",
                        "2. Opt for public transport to cut travel expenses.",
                        "3. Cancel any unused subscription services to save money."
                    ]
                }
            }
        }
