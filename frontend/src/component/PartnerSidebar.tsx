import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Partner.css'; // ตรวจสอบ path ให้ถูกนะครับ

const PartnerSidebar: React.FC = () => {
  const location = useLocation();

  // ฟังก์ชันเช็คว่าลิงก์ไหนตรงกับหน้าปัจจุบัน
  // แก้ไข: ต้องเช็คให้ตรงกับ path ที่เราส่งเข้าไปจริงๆ
  const isActive = (path: string) => {
    // ใช้ startsWith เพื่อให้ครอบคลุม path ย่อยๆ ได้ด้วย (ถ้ามี)
    return location.pathname === path ? 'sidebar-link active' : 'sidebar-link';
  };

  return (
    <aside className="partner-sidebar">
      {/* ส่วนหัวโปรไฟล์ */}
      <div className="sidebar-header">
         <div className="profile-avatar">
            🐱
         </div>
         <div className="profile-info">
             <h3>Partner Mode</h3>
             <p>บ้านพี่มายด์ รับฝากแมว</p>
         </div>
      </div>

      <div className="sidebar-divider">เมนูหลัก</div>

      <nav className="sidebar-nav">
        {/* แก้ไข path ใน isActive ให้ตรงกับ Link to */}
        <Link to="/PartnerDashboard" className={isActive('/PartnerDashboard')}>
            <span className="icon">📊</span>
            <span className="text">แดชบอร์ด</span>
        </Link>
        
        <Link to="/PartnerServices" className={isActive('/PartnerServices')}>
            <span className="icon">🏷️</span>
            <span className="text">จัดการบริการ/ราคา</span>
        </Link>
        
        <Link to="/PartnerReports" className={isActive('/PartnerReports')}>
            <span className="icon">📝</span>
            <span className="text">ส่งรายงานประจำวัน</span>
        </Link>
        
        <Link to="/PartnerWallet" className={isActive('/PartnerWallet')}>
            <span className="icon">💰</span>
            <span className="text">กระเป๋าเงิน</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link logout">
            <span className="icon">⬅️</span>
            <span className="text">กลับหน้าผู้ใช้ทั่วไป</span>
        </Link>
      </div>
    </aside>
  );
};

export default PartnerSidebar;