import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'owner' | 'sitter'>('owner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // ล้าง error เมื่อผู้ใช้พิมพ์ใหม่
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🛡️ ป้องกันเบื้องต้นที่ Client-side
    if (formData.password !== formData.confirmPassword) {
      setError("❌ รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (formData.password.length < 6) {
      setError("❌ รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName, // ต้องสะกดเหมือนใน schemas.py
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: role 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`🎉 สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${formData.fullName}`);
        navigate('/login');
      } else {
        // ดึง Error message จาก FastAPI ที่เราตั้งไว้ใน HTTPException
        setError(`⚠️ ${data.detail || "เกิดข้อผิดพลาดในการสมัคร"}`);
      }
    } catch (err) {
      setError("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดตรวจสอบว่ารัน Backend หรือยัง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>สร้างบัญชีใหม่</h2>
          <p>เข้าร่วมชุมชนคนรักสัตว์กับ PetPal</p>
        </div>

        {/* แสดง Error Message ถ้ามี */}
        {error && <div className="error-banner">{error}</div>}

        <div className="role-switcher">
          <button 
            className={`role-btn ${role === 'owner' ? 'active' : ''}`}
            onClick={() => setRole('owner')}
            disabled={loading}
          >
            🐶 เจ้าของสัตว์เลี้ยง
          </button>
          <button 
            className={`role-btn ${role === 'sitter' ? 'active' : ''}`}
            onClick={() => setRole('sitter')}
            disabled={loading}
          
          >
            🤝 สมัครเป็นพี่เลี้ยง
          </button>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>ชื่อ-นามสกุล</label>
            <input type="text" name="fullName" placeholder="เช่น ใจดี รักสัตว์" required onChange={handleChange} disabled={loading} />
          </div>

          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input type="tel" name="phone" placeholder="08x-xxx-xxxx" required onChange={handleChange} disabled={loading} />
          </div>

          <div className="form-group">
            <label>อีเมล</label>
            <input type="email" name="email" placeholder="example@email.com" required onChange={handleChange} disabled={loading} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>รหัสผ่าน</label>
              <input type="password" name="password" placeholder="••••••••" required onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label>ยืนยันรหัสผ่าน</label>
              <input type="password" name="confirmPassword" placeholder="••••••••" required onChange={handleChange} disabled={loading} />
            </div>
          </div>

          {role === 'sitter' && (
            <div className="sitter-note">
              ℹ️ สำหรับพี่เลี้ยง: หลังจากสมัครแล้ว จะมีเจ้าหน้าที่ติดต่อกลับภายใน 24 ชม.
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'กำลังลงทะเบียน...' : (role === 'owner' ? 'สมัครสมาชิกทั่วไป' : 'ลงทะเบียนเป็นพี่เลี้ยง')}
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