from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth_utils

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # 🛡️ ป้องกันการสมัครซ้ำ: เช็คว่าอีเมลนี้มีในฐานข้อมูล XAMPP หรือยัง
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="อีเมลนี้ถูกใช้งานไปแล้ว"
        )
    
    # 🔐 ป้องกันการเจาะ: Hash รหัสผ่านก่อนบันทึกลงฐานข้อมูล
    # เราจะไม่เก็บ "123456" ลง DB แต่จะเก็บเป็นชุดรหัสที่ถอดกลับไม่ได้
    hashed_password = auth_utils.hash_password(user.password)
    
    new_user = models.User(
        fullName=user.fullName,
        email=user.email,
        password=hashed_password, # บันทึกตัวที่เข้ารหัสแล้ว
        phone=user.phone,
        role=user.role
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "สมัครสมาชิกสำเร็จ", "user_id": new_user.id}

# (ส่วนของ router.post("/login") จะอยู่ต่อท้ายตรงนี้ในไฟล์เดียวกัน)

@router.post("/login")
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    # 1. ค้นหา User
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
    # 2. ตรวจสอบความถูกต้อง (ป้องกันการสุ่มโดยไม่บอกว่า Email หรือ Pass ที่ผิด)
    if not user or not auth_utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง"
        )
    
    # 3. สร้าง Token เมื่อล็อกอินผ่าน
    access_token = auth_utils.create_access_token( # ตรวจสอบการสะกดตรงนี้
        data={"user_id": user.id, "role": user.role}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "fullName": user.fullName,
            "role": user.role
        }
    }