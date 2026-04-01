import React, { useState } from 'react';
import '../css/App.css';
import '../css/LiveCam.css';

const LiveCam: React.FC = () => {
  const [isMicActive, setIsMicActive] = useState(false);

  return (
    <div className="page-container">
      <div className="livecam-wrapper">
        
        {/* Header Section */}
        <div className="livecam-header">
          <button className="back-btn">❮</button>
          <div className="header-title">
            <h2>Live Cam</h2>
            <p>ห้องนอน • 24 ชั่วโมง</p>
          </div>
          <div className="header-actions">
            <button className="icon-circle">⚙️</button>
            <div className="pet-mini-avatar">🐶</div>
          </div>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <div className="video-badge-live">
            <span className="dot-pulse"></span> LIVE
          </div>
          <button className="video-fullscreen">⛶</button>
          
          {/* ใส่รูปภาพหรือ Video Player ตรงนี้ */}
          <div className="video-placeholder-image">
             {/* จำลองรูปน้องหมา */}
          </div>

          <div className="video-footer-info">
            <span>📶 สัญญาณดี • 1080p • 30fps</span>
            <span>00:14:38</span>
          </div>
        </div>

        {/* Status Card */}
        <div className="status-card">
          <div className="status-icon">✓</div>
          <div className="status-text">
            <h4>กำลังนอนพักผ่อน</h4>
            <p>อัปเดตเมื่อ 2 นาทีที่แล้ว</p>
          </div>
          <div className="status-badge">ปลอดภัย</div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <h3>ควบคุม</h3>
          <div className="control-buttons-grid">
            <div className="control-item">
              <button 
                className={`control-circle ${isMicActive ? 'active' : ''}`}
                onClick={() => setIsMicActive(!isMicActive)}
              >
                {isMicActive ? '🎙️' : '🎤'}
              </button>
              <span>พูดคุย</span>
            </div>
            <div className="control-item">
              <button className="control-circle">⏺️</button>
              <span>บันทึก</span>
            </div>
            <div className="control-item">
              <button className="control-circle">📷</button>
              <span>ถ่ายรูป</span>
            </div>
            <div className="control-item">
              <button className="control-circle alert">🔔</button>
              <span>เรียกน้อง</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveCam;