import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Register.css'; // เดี๋ยวเราไปเพิ่ม CSS กัน

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'owner' | 'sitter'>('owner'); // ค่าเริ่มต้นเป็นเจ้าของสัตว์เลี้ยง

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตรวจสอบรหัสผ่าน
    if (formData.password !== formData.confirmPassword) {
      alert("❌ รหัสผ่านไม่ตรงกันครับ");
      return;
    }

    // (ในอนาคต: ส่งข้อมูลไป Backend ตรงนี้)
    console.log("Submitting:", { ...formData, role });
    
    alert(`🎉 สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${formData.fullName} (${role === 'owner' ? 'เจ้าของสัตว์เลี้ยง' : 'พาร์ทเนอร์พี่เลี้ยง'})`);
    navigate('/'); // สมัครเสร็จเด้งกลับหน้าแรก
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        {/* Header ส่วนหัว */}
        <div className="register-header">
          <h2>สร้างบัญชีใหม่</h2>
          <p>เข้าร่วมชุมชนคนรักสัตว์กับ PetPal</p>
        </div>

        {/* ตัวเลือกบทบาท (Role Switcher) */}
        <div className="role-switcher">
          <button 
            className={`role-btn ${role === 'owner' ? 'active' : ''}`}
            onClick={() => setRole('owner')}
          >
            🐶 เจ้าของสัตว์เลี้ยง
          </button>
          <button 
            className={`role-btn ${role === 'sitter' ? 'active' : ''}`}
            onClick={() => setRole('sitter')}
          >
            🤝 สมัครเป็นพี่เลี้ยง
          </button>
        </div>

        {/* ฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>ชื่อ-นามสกุล</label>
            <input type="text" name="fullName" placeholder="เช่น ใจดี รักสัตว์" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input type="tel" name="phone" placeholder="08x-xxx-xxxx" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>อีเมล</label>
            <input type="email" name="email" placeholder="example@email.com" required onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>รหัสผ่าน</label>
              <input type="password" name="password" placeholder="อย่างน้อย 6 ตัวอักษร" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>ยืนยันรหัสผ่าน</label>
              <input type="password" name="confirmPassword" placeholder="ใส่รหัสเดิมอีกครั้ง" required onChange={handleChange} />
            </div>
          </div>

          {/* เงื่อนไขสำหรับพี่เลี้ยง (แสดงเฉพาะตอนเลือกเป็นพี่เลี้ยง) */}
          {role === 'sitter' && (
            <div className="sitter-note">
              ℹ️ สำหรับพี่เลี้ยง: หลังจากสมัครแล้ว จะมีเจ้าหน้าที่ติดต่อกลับเพื่อยืนยันตัวตนและตรวจสอบประวัติภายใน 24 ชม.
            </div>
          )}

          <button type="submit" className="btn-submit">
            {role === 'owner' ? 'สมัครสมาชิกทั่วไป' : 'ลงทะเบียนเป็นพี่เลี้ยง'}
          </button>
        </form>

        <div className="register-footer">
          <p>มีบัญชีอยู่แล้ว? <Link to="/login" className="link-login">เข้าสู่ระบบ</Link></p>
        </div>

      </div>
    </div>
  );
};

export default Register;