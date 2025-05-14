import json
import logging
import google.generativeai as genai
from sqlmodel import Session
from src.config import AI_API_KEY
from src.schemas.schemas import AIResponse
from src.models.models import User, Expense


genai.configure(api_key=AI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def get_gemini_analysis(expense_data: dict,salary:int) -> dict:
    prompt = (
        "You're a financial assistant. Analyze the user's spending data and respond ONLY in clear numbered points, in the following format:\n"
       
        "Good Habits:\n"
        "  1. Habit 1\n"
        "  2. Habit 2\n"
        "Needs Improvement:\n"
        "  1. Improvement 1\n"
        "  2. Improvement 2\n"
        "Tips:\n"
        "  1. Tip 1\n"
        "  2. Tip 2\n"
        f"\nSpending Data: {json.dumps(expense_data)}"
        f"\n User Salary:{salary} "
    )
    
    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip().split('\n')
        analysis = {
            
            "Good Habits": [],
            "Needs Improvement": [],
            "Tips": []
        }

        section = None
        for line in response_text[1:]:
            if line.startswith("Good Habits:"):
                section = "Good Habits"
            elif line.startswith("Needs Improvement:"):
                section = "Needs Improvement"
            elif line.startswith("Tips:"):
                section = "Tips"
            else:
                if section:
                    analysis[section].append(line.strip())
        
        return analysis
    except Exception as e:
        return {
            "Total Spent": "Unable to analyze spending.",
            "Good Habits": ["Unable to generate recommendations."],
            "Needs Improvement": ["Unable to generate recommendations."],
            "Tips": ["Unable to generate recommendations."]
        }

def analyze_user_expenses(db: Session, current_user: User) -> AIResponse:
    user = db.query(User).filter(User.username == current_user.username).first()

    if not user:
        return AIResponse(
            total_spent=0.0,
            spending_by_category={},
            recommendation={
               
                "Good Habits": [],
                "Needs Improvement": [],
                "Tips": []
            }
        )
    expenses = db.query(Expense).filter(Expense.user_id == user.id).all()
    if not expenses:
        return AIResponse(
            total_spent=0.0,
            spending_by_category={},
            recommendation={
                "Total Spent": ["No expenses found to analyze."],
                "Good Habits": [],
                "Needs Improvement": [],
                "Tips": []
            }
        )

    total = sum(e.amount for e in expenses)

    category_summary = {}
    for e in expenses:
        category_summary.setdefault(e.category, 0)
        category_summary[e.category] += e.amount

    category_summary = dict(sorted(category_summary.items(), key=lambda x: x[1], reverse=True))

    expense_data = {
        "total_spent": round(total, 2),
        "spending_by_category": category_summary
    }

    ai_recommendation = get_gemini_analysis(expense_data,user.salary)

    for key in [ "Good Habits", "Needs Improvement", "Tips"]:
        if key not in ai_recommendation:
            ai_recommendation[key] = ["No data."]

    return AIResponse(
        total_spent=expense_data["total_spent"],
        spending_by_category=expense_data["spending_by_category"],
        recommendation=ai_recommendation
    )
