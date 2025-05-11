
# 💸 User Expense Tracker API (FastAPI + PostgreSQL + Gemini AI)

> A secure, AI-integrated personal expense tracker API using FastAPI, PostgreSQL, and Gemini AI. Supports user registration, login, expense management, and smart recommendations.

---
## 🚀 Features

> - 🔐 JWT-based Authentication
> - ➕ Add, View, Analyze Expenses
> - 📊 Category-wise Spending Insights
> - 🤖 Gemini AI Financial Guidance

---

## 🛠️ Tech Stack

> - **FastAPI** (Backend Framework)
> - **PostgreSQL** (Database)
> - **SQLModel** (ORM)
> - **JWT** (`fastapi-jwt-auth`)
> - **Gemini AI** (`google-generativeai`)
> - **bcrypt / passlib** (Password Hashing)
> - **python-dotenv** (Environment Variables)

---

## 📁 Project Structure

```
src/
├── config.py
├── db.py
├── models/
│   └── models.py
├── routes/
│   ├── auth.py
│   └── expense.py
├── schemas/
│   └── schemas.py
├── services/
│   ├── auth_service.py
│   ├── expense_service.py
│   └── ai_service.py
├──utils/
│   └── hash.py
main.py
```

---

## 🔐 .env Format

```
DATABASE_URL=postgresql://root:root@localhost:5432/smart-expense-tracker
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=3600
AI_API_KEY=your_gemini_api_key
```

---

## 📦 Installation

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
pip install -r requirements.txt
uvicorn main:app --reload
```


---

## 🛠️ Useful Commands

- Run Dev Server: `uvicorn main:app --reload`
- Install Package: `pip install <package>`
- Create Tables: Called automatically on startup via `db.py`

---

## 📌 Testing with Postman

1. **Register** via `/auth/register`
2. **Login** via `/auth/login` → Copy `access_token`
3. **Set Auth Header**:
   ```
   Authorization: Bearer <access_token>
   ```
4. **Add Expense** via `/expenses/`
5. **Get All** via `/expenses/`
6. **AI Analysis** via `/expenses/analysis`

---

## 🧠 Gemini AI Prompt Template

```text
Analyze this JSON of user expenses:
{JSON_DATA}

Give back:
- Total Spent
- Category-wise breakdown
- Good Habits
- Areas for Improvement
- Financial Tips
```


---

## 👨‍💻 Author

**Soumojit Makar**  
📧 [soumojitmakar1234@gmail.com](mailto:soumojitmakar1234@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/soumojit-makar-a9a119304)  
🐙 [GitHub](https://github.com/Soumojit-Makar)
