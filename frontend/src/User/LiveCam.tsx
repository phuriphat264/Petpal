import React, { useState } from 'react';
import '../css/App.css'; // ปรับ path ให้ตรงกับโปรเจกต์ของคุณ
import '../css/LiveCam.css';

const LiveCam: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(false);

  return (
    <div className="page-container">
      <div className="section-header" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <h2 className="section-title">🎥 Live Cam 24 ชม.</h2>
        <p className="section-subtitle">ดูลูกรักของคุณได้ตลอดเวลา เหมือนอยู่ใกล้ๆ กัน</p>
      </div>

      <div className="live-cam-container">
        {/* รายละเอียดน้องสัตว์เลี้ยง */}
        <div className="cam-header">
          <div className="pet-cam-info">
            <span className="pet-avatar">🐶</span>
            <div>
              <h3 style={{ margin: 0, color: '#1a1a24' }}>น้องบราวนี่ (Brownie)</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>ฝากอยู่ที่: บ้านป้าใจดีโฮมสเตย์</p>
            </div>
          </div>
          <div className="live-badge">
            <span className="dot-pulse"></span> LIVE
          </div>
        </div>

        {/* ส่วนแสดงวิดีโอ */}
        <div className="video-player">
          {/* ใช้รูปภาพจำลองแทนวิดีโอไปก่อน สามารถเปลี่ยนเป็น <video> หรือ <iframe> ได้ */}
          <div className="video-placeholder">
            <p>🔴 กำลังถ่ายทอดสด...</p>
          </div>
          
          {/* แถบเครื่องมือ */}
          <div className="video-controls">
            <button className="icon-btn" title="ถ่ายภาพ">📸 ถ่ายภาพ</button>
            <button 
              className={`icon-btn ${isMicOn ? 'active' : ''}`} 
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? '🎙️ กำลังพูด...' : '🎤 พูดคุย'}
            </button>
            <button className="icon-btn" title="ขยายเต็มจอ">⛶ เต็มจอ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCam;