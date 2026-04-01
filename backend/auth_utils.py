from passlib.context import CryptContext
import jwt # เพิ่มการ import PyJWT
from datetime import datetime, timedelta

# --- ส่วนเดิมของคุณ ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# --- ส่วนที่ต้องเพิ่ม (เพื่อให้หายจาก AttributeError) ---
SECRET_KEY = "PHURIPHAT_SUPER_SECRET_2026" # คีย์ลับสำหรับล็อก Token
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    # ตั้งเวลาหมดอายุ Token (เช่น 60 นาที)
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    
    # สร้าง Token โดยใช้ Secret Key และ Algorithm ที่กำหนด
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt