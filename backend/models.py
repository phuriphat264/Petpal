from sqlalchemy import Column, Integer, String, Enum
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255)) # เก็บแบบ Hashed
    phone = Column(String(20))
    role = Column(String(20))