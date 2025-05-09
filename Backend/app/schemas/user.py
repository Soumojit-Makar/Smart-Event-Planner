# app/schemas/user.py
from pydantic import BaseModel, EmailStr

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
