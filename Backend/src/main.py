from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from src.routes.auth import router as AuthRouter
from src.routes.expense import router as ExpenseRouter
from src.db import create_table

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_table()
    yield

# FastAPI app instance
app = FastAPI(
    title="User Expense Tracker",
    version="1.0.0",
    description="A secure platform to track and manage personal expenses.",
    lifespan=lifespan
)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(AuthRouter)
app.include_router(ExpenseRouter)
