
from sqlmodel import Session
from src.schemas.schemas import ExpenseCreate, ExpenseOut
from src.models.models import Expense, User


def create_expense(expense: ExpenseCreate, db: Session,user: User ):
    
    db_expense = Expense(**expense.dict(), user_id=user.id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return ExpenseOut(
        title=db_expense.title,
        amount=db_expense.amount,
        category=db_expense.category,
        id=db_expense.id,
    )
def get_my_expenses(db: Session,user: User ):
    user = db.query(User).filter(User.username == user).first()
    data=db.query(Expense).filter(Expense.user_id == user.id).all()
    responce=[]
    for i in data:
        responce.append(
            ExpenseOut(
                title=i.title,
                amount=i.amount,
                category=i.category,
                id=i.id
            )
        )
    return responce
