import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css'; // เดี๋ยวสร้างไฟล์ CSS นี้กัน

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- Mock Login Logic ---
    // (ในอนาคต: ยิง API ไปตรวจสอบ user/pass ที่ backend)
    
    if (formData.email && formData.password) {
      alert(`✅ ยินดีต้อนรับกลับมา! คุณ ${formData.email}`);
      navigate('/'); // ล็อกอินผ่านแล้วกลับหน้าแรก
    } else {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");
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
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> จดจำฉันไว้
            </label>
            <a href="#" className="forgot-password">ลืมรหัสผ่าน?</a>
          </div>

          <button type="submit" className="btn-login-submit">เข้าสู่ระบบ</button>
        </form>

        <div className="divider">
          <span>หรือเข้าสู่ระบบด้วย</span>
        </div>

        <div className="social-login">
          <button className="btn-social google">
            <span style={{marginRight: '8px'}}>G</span> Google
          </button>
          <button className="btn-social facebook">
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