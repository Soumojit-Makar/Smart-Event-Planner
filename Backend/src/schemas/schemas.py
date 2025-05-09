
from pydantic import BaseModel, EmailStr
from datetime import datetime
class UserCreate(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    class Config:
        schema_extra = {
            "example": {
                "fullname":"Soumojit Makar",
                "email":"soumojitmakar123@gmail.com",
                "password":"644946461646aaafsasas" 
            }
        }

class UserLogin(BaseModel):
    username: str
    password: str
    class Config:
        schema_extra = {
            "example": {
                "username":"soumojitmakar123@gmail.com",
                "password":"644946461646aaafsasas" 
            }
        }

class UserOut(BaseModel):
    id: int
   
    email: EmailStr
    full_name: str

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id":1,
                "email":"soumojitmakar123@gmail.com",
                "full_name":"Soumojit Makar"
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str
    class Config:
        schema_extra = {
            "example": {
                
                "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3Vtb2ppdG1ha2FyQGdtYWlsLmNvbSIsImlhdCI6MTc0NjgwMDM0MCwibmJmIjoxNzQ2ODAwMzQwLCJqdGkiOiJjODQyMzZhMC05ZWJhLTQ3ODYtYTg5OS00NzU5MTBiNWY5NzIiLCJleHAiOjE3NDY4MDA0MDAsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.gdqOKNReQ5FvUeT_Sw4uNlGLYCXC90eFoO1HjJbuj1s",
                "token_type":"bearer"
            }
        }

class EventCreate(BaseModel):
    title: str
    description: str
    date: datetime

class EventOut(EventCreate):
    id: int
    class Config:
        orm_mode = True