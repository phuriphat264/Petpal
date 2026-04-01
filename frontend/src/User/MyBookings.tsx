import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import '../css/User.css'; // เราจะใช้คลาสใหม่ในนี้

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
      status: "confirmed", 
      pet: "ถุงทอง",
      type: "upcoming",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 102,
      shopName: "Dog Lover Chanthaburi",
      service: "อาบน้ำตัดขน",
      date: "10 ต.ค. 2024",
      price: "฿450",
      status: "pending",
      pet: "เจ้าดื้อ",
      type: "upcoming",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 99,
      shopName: "บ้านอุ่นใจ ฝากเลี้ยง",
      service: "ฝากรายชั่วโมง",
      date: "1 ก.ย. 2024",
      price: "฿200",
      status: "completed",
      pet: "ถุงทอง",
      type: "history",
      image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const filteredBookings = bookings.filter(b => b.type === activeTab);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <span className="status-badge-modern confirmed">🟢 อนุมัติแล้ว</span>;
      case 'pending': return <span className="status-badge-modern pending">⏳ รอการตอบรับ</span>;
      case 'completed': return <span className="status-badge-modern completed">✅ เสร็จสิ้น</span>;
      default: return null;
    }
  };

  return (
    <div className="page-container">
      <div className="bookings-wrapper">
        
        <div className="section-header" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
          <h2 className="section-title">📅 การจองของฉัน</h2>
          <p className="section-subtitle">ติดตามสถานะและประวัติการใช้บริการของลูกรัก</p>
        </div>

        {/* Tabs แบบใหม่ */}
        <div className="modern-tabs">
          <button 
            className={`modern-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            เร็วๆ นี้
          </button>
          <button 
            className={`modern-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            ประวัติการจอง
          </button>
        </div>

        {/* Booking List */}
        <div className="booking-list-container">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card-modern">
                <div className="booking-card-left">
                  <img src={booking.image} alt={booking.shopName} className="booking-shop-img" />
                  <div className="booking-info">
                    <h4>{booking.shopName}</h4>
                    <p className="booking-service">{booking.service} • 🐾 น้อง{booking.pet}</p>
                    <p className="booking-date">📅 {booking.date}</p>
                  </div>
                </div>

                <div className="booking-card-right">
                  <div className="booking-price">{booking.price}</div>
                  {getStatusBadge(booking.status)}
                  
                  {/* ปุ่มโชว์เฉพาะถ้าได้รับการอนุมัติ */}
                  {booking.status === 'confirmed' && (
                    <Link to={`/tracking/${booking.id}`} className="btn-outline-small" style={{marginTop: '10px', textAlign: 'center'}}>
                      📍 ติดตามสถานะ
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-booking-state">
               <span style={{ fontSize: '40px' }}>📭</span>
               <h3>ไม่มีรายการจองในขณะนี้</h3>
               <p>ลองค้นหาบริการดีๆ ให้น้องๆ ของคุณดูสิ</p>
               <Link to="/services" className="btn-main-small" style={{ marginTop: '15px' }}>ไปหน้าบริการ</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;