# src/models.py (or wherever your models are)

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from src.db import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    password = Column(String)

    events = relationship("Event", back_populates="creator", cascade="all, delete-orphan")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    date = Column(DateTime, default=datetime.utcnow)

    created_by = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="events")
