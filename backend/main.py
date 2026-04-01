from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routes import auth # นำเข้า router ที่แยกไว้
# สร้างตารางใน XAMPP
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="PetPal API")

# ป้องกัน CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ดึง Route จากไฟล์ที่เราแยกไว้มาใช้งาน
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Welcome to PetPal API"}