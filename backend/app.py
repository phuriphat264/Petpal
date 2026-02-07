from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) # อนุญาตให้ React ติดต่อกับ Flask ได้

# เชื่อมต่อกับ MySQL (XAMPP)
# รูปแบบ: mysql+pymysql://user:password@host/dbname
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@db/petpal_db'
db = SQLAlchemy(app)

# โมเดลฐานข้อมูล (ตามภาพร่าง UI ของคุณ)
class Partner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price_range = db.Column(db.String(50))
    rating = db.Column(db.Float)

# API สำหรับดึงรายชื่อที่พัก
@app.route('/api/partners', methods=['GET'])
def get_partners():
    partners = Partner.query.all()
    output = []
    for p in partners:
        output.append({'id': p.id, 'name': p.name, 'price': p.price_range, 'rating': p.rating})
    return jsonify(output)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # สร้าง Table อัตโนมัติถ้ายังไม่มี
    app.run(debug=True, port=5000)