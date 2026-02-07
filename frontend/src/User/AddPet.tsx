import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/User.css';

const AddPet: React.FC = () => {
  const navigate = useNavigate();
  
  // State สำหรับเก็บรูปภาพพรีวิว
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    breed: '',
    gender: 'male',
    birthDate: '',
    weight: '',
    microchip: '',
    sterilized: 'no',
    allergies: '',
    notes: ''
  });

  // ฟังก์ชันจัดการการเปลี่ยนค่าใน Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันจัดการการอัปโหลดรูป (แสดง Preview)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // สร้าง URL จำลองเพื่อแสดงรูปทันที
      const objectUrl = URL.createObjectURL(file);
      setPreviewImg(objectUrl);
    }
  };

  // ฟังก์ชันเมื่อกดบันทึก
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ตรงนี้คือจุดที่จะส่ง API ไปหา Backend
    console.log("Submitting Data:", formData);
    console.log("Image Data:", previewImg);
    
    alert("ลงทะเบียนน้องเรียบร้อย! 🎉");
    navigate('/MyPets'); // เด้งกลับไปหน้ารวม
  };

  return (
    <div className="user-container" style={{maxWidth: '800px'}}>
      
      {/* ปุ่มย้อนกลับ */}
      <Link to="/MyPets" style={{textDecoration:'none', color:'#718096', marginBottom:'20px', display:'inline-block'}}>
        ⬅ ยกเลิก
      </Link>

      <div className="page-title">➕ ลงทะเบียนสัตว์เลี้ยงใหม่</div>

      <form onSubmit={handleSubmit}>
        
        {/* ================= ส่วนอัปโหลดรูปภาพ (ดีไซน์ใหม่) ================= */}
        <div className="pet-upload-container">
          <label className="pet-upload-wrapper" htmlFor="pet-img-upload">
            
            {/* แสดงรูปพรีวิว หรือ Placeholder */}
            {previewImg ? (
              <img src={previewImg} alt="Preview" className="pet-upload-preview" />
            ) : (
              <div className="pet-upload-placeholder">
                <span style={{fontSize: '40px'}}>🐾</span>
                <p>เพิ่มรูปน้อง</p>
              </div>
            )}

            {/* Overlay สีดำที่จะโผล่มาตอน Hover */}
            <div className="pet-upload-overlay">
               <div className="upload-icon">📷</div>
               <span className="upload-text">เปลี่ยนรูปภาพ</span>
            </div>
            
          </label>
          
          {/* Input file ซ่อนไว้ */}
          <input 
            id="pet-img-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{display:'none'}} 
          />
          <p className="pet-upload-hint">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
        </div>
        {/* ================= จบส่วนอัปโหลด ================= */}


        {/* ส่วนฟอร์มข้อมูลทั่วไป */}
        <div className="form-section">
          <div className="section-title">📝 ข้อมูลเบื้องต้น</div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">ชื่อสัตว์เลี้ยง <span style={{color:'red'}}>*</span></label>
              <input required type="text" name="name" className="form-input" placeholder="เช่น น้องถุงทอง" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">ประเภทสัตว์เลี้ยง <span style={{color:'red'}}>*</span></label>
              <select name="type" className="form-select" onChange={handleChange}>
                <option value="dog">สุนัข (Dog)</option>
                <option value="cat">แมว (Cat)</option>
                <option value="rabbit">กระต่าย (Rabbit)</option>
                <option value="bird">นก (Bird)</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">สายพันธุ์ (ถ้าทราบ)</label>
              <input type="text" name="breed" className="form-input" placeholder="เช่น Golden Retriever" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">เพศ</label>
              <select name="gender" className="form-select" onChange={handleChange}>
                <option value="male">ชาย ♂</option>
                <option value="female">หญิง ♀</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">วันเกิด / วันที่รับมาเลี้ยง</label>
              <input type="date" name="birthDate" className="form-input" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">น้ำหนัก (kg)</label>
              <input type="number" step="0.1" name="weight" className="form-input" placeholder="0.0" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* ส่วนฟอร์มข้อมูลสุขภาพ */}
        <div className="form-section">
          <div className="section-title">🏥 ข้อมูลสุขภาพ (ถ้ามี)</div>
          
          <div className="form-grid">
             <div className="form-group">
              <label className="form-label">การทำหมัน</label>
              <select name="sterilized" className="form-select" onChange={handleChange}>
                <option value="no">ยังไม่ทำหมัน</option>
                <option value="yes">ทำหมันแล้ว</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">เลขไมโครชิป (ถ้ามี)</label>
              <input type="text" name="microchip" className="form-input" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{color:'#e53e3e'}}>โรคประจำตัว / แพ้ยา / แพ้อาหาร</label>
            <input type="text" name="allergies" className="form-input" placeholder="ระบุ (ถ้าไม่มีให้เว้นว่าง)" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">หมายเหตุเพิ่มเติม (นิสัย, สิ่งที่ชอบ/ไม่ชอบ)</label>
            <textarea name="notes" className="form-textarea" placeholder="เช่น กลัวเสียงฟ้าผ่า, ชอบกินขนมแมวเลีย" onChange={handleChange}></textarea>
          </div>
        </div>

        {/* ปุ่ม Submit */}
        <button type="submit" className="btn-save" style={{width:'100%', justifyContent:'center', fontSize:'16px', padding:'15px', marginTop:'10px'}}>
          ✅ ยืนยันข้อมูล
        </button>

      </form>
    </div>
  );
};

export default AddPet;