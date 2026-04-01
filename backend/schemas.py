from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    fullName: str
    email: str
    password: str
    phone: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    fullName: str
    role: str
    class Config:
        from_attributes = True