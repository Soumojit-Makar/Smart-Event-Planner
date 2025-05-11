from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Expense(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    amount: float
    category: str
    user_id: int = Field(foreign_key="user.id")
    user: Optional["User"] = Relationship(back_populates="expenses")

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    full_name: Optional[str]
    salary:int
    password: str
    expenses: List[Expense] = Relationship(back_populates="user")
