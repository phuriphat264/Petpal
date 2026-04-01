import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // เพิ่มสถานะ Loading ป้องกันการกดซ้ำ
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // เริ่มการส่งข้อมูล
    
    try {
      // 🚀 ยิง API ไปที่ Router ที่เราแยกไว้ (/auth/login)
      // Login.tsx บรรทัดที่ 23 โดยประมาณ
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,      // ต้องชื่อ email (ตัวพิมพ์เล็ก)
          password: formData.password // ต้องชื่อ password (ตัวพิมพ์เล็ก)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ ล็อกอินสำเร็จ: เก็บ Token และข้อมูลเบื้องต้น
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert(`✅ ยินดีต้อนรับกลับมา! คุณ ${data.user.fullName}`);
        navigate('/'); // กลับหน้าหลัก
      } else {
        // ❌ ข้อมูลผิดพลาด: แสดง Error จาก FastAPI (detail)
        alert(`⚠️ ${data.detail || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'}`);
      }
    } catch (error) {
      alert("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ (โปรดเช็ค XAMPP และ FastAPI)");
    } finally {
      setLoading(false); // จบการทำงาน
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-header">
          <div className="login-icon">🐾</div>
          <h2>ยินดีต้อนรับกลับมา</h2>
          <p>เข้าสู่ระบบเพื่อดูน้องๆ ของคุณ</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>อีเมล</label>
            <input 
              type="email" 
              name="email" 
              placeholder="user@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={loading} // ปิด Input ขณะโหลด
            />
          </div>

          <div className="input-group">
            <label>รหัสผ่าน</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required 
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> จดจำฉันไว้
            </label>
            <a href="#" className="forgot-password">ลืมรหัสผ่าน?</a>
          </div>

          <button type="submit" className="btn-login-submit" disabled={loading}>
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="divider">
          <span>หรือเข้าสู่ระบบด้วย</span>
        </div>

        <div className="social-login">
          <button className="btn-social google" type="button">
            <span style={{marginRight: '8px'}}>G</span> Google
          </button>
          <button className="btn-social facebook" type="button">
            <span style={{marginRight: '8px'}}>f</span> Facebook
          </button>
        </div>

        <div className="login-footer">
          <p>ยังไม่มีบัญชี? <Link to="/register" className="link-register">สมัครสมาชิกใหม่</Link></p>
        </div>

      </div>
    </div>
  );
};

export default Login;