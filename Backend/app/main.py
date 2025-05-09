from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as AuthRouter
from app.db import Base, engine
from app.models import user  

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Done.")

app = FastAPI(
    title="Smart Event Planner",
    version="1.0.0",
    description=(
        "Smart Event Planner is an application designed to help users plan events efficiently. "
        "It allows users to organize guest lists, send invitations, get personalized guest recommendations "
        "based on AI, and manage event schedules seamlessly. The app also includes features such as "
        "automated reminders, task management, and real-time updates for a smoother event planning experience."
    )

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
