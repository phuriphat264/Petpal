import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/User.css';

const MyBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  // Mock Data
  const bookings = [
    {
      id: 101,
      shopName: "พี่มายด์ รับฝากแมว",
      service: "ฝากเลี้ยง (Boarding)",
      date: "12 ต.ค. - 14 ต.ค. 2024",
      price: "฿1,050",
      status: "confirmed", // pending, confirmed, completed
      pet: "ถุงทอง",
      type: "upcoming"
    },
    {
      id: 102,
      shopName: "Dog Lover Chanthaburi",
      service: "อาบน้ำตัดขน",
      date: "10 ต.ค. 2024",
      price: "฿450",
      status: "pending",
      pet: "เจ้าดื้อ",
      type: "upcoming"
    },
    {
      id: 99,
      shopName: "บ้านอุ่นใจ ฝากเลี้ยง",
      service: "ฝากรายชั่วโมง",
      date: "1 ก.ย. 2024",
      price: "฿200",
      status: "completed",
      pet: "ถุงทอง",
      type: "history"
    }
  ];

  // Filter ตาม Tab
  const filteredBookings = bookings.filter(b => b.type === activeTab);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <span className="status-badge confirmed">อนุมัติแล้ว</span>;
      case 'pending': return <span className="status-badge pending">รอการตอบรับ</span>;
      case 'completed': return <span className="status-badge completed">เสร็จสิ้น</span>;
      default: return null;
    }
  };

  return (
    <div className="user-container">
      <div className="page-title">📅 การจองของฉัน</div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          เร็วๆ นี้
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          ประวัติการจอง
        </button>
      </div>

      {/* Booking List */}
      <div className="booking-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-main">
                <div className="shop-icon">🏠</div>
                <div className="booking-details">
                  <h4>{booking.shopName}</h4>
                  <p>{booking.service} • {booking.pet}</p>
                  <p style={{fontSize:'12px', color:'#A0AEC0'}}>📅 {booking.date}</p>
                </div>
              </div>

              <div className="booking-status">
                {getStatusBadge(booking.status)}
                <div style={{fontWeight:'bold', color:'#2E7D32', marginBottom:'5px'}}>{booking.price}</div>
                
                {/* ปุ่มดูสถานะ จะโชว์เฉพาะถ้าได้รับการอนุมัติแล้ว */}
                {booking.status === 'confirmed' && (
                  <Link to={`/tracking/${booking.id}`} className="btn-track">
                    📍 ติดตามสถานะ
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{textAlign:'center', color:'#aaa', marginTop:'50px'}}>
             ไม่มีรายการจองในขณะนี้
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;