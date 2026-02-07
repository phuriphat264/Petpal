import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/User.css';

const Tracking: React.FC = () => {
  // ✅ แก้ไขบรรทัดนี้ครับ (ใช้ as { id: string } แทน)
  const { id } = useParams() as { id: string };

  // Mock Data: จำลองข้อมูลที่ส่งมาจาก PartnerReports
  const timelineEvents = [
    {
      time: "18:00",
      title: "ทานมื้อเย็นเรียบร้อย 🐟",
      desc: "น้องกินเก่งมากครับ หมดเกลี้ยงเลย",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
      latest: true
    },
    {
      time: "15:30",
      title: "พาออกมาเดินเล่น",
      desc: "เดินสำรวจสวนหลังบ้าน อารมณ์ดีครับ",
      image: null,
      latest: false
    },
    {
      time: "13:00",
      title: "นอนกลางวัน 💤",
      desc: "หลับปุ๋ยบนคอนโดแมว",
      image: "https://images.unsplash.com/photo-1541781777621-af13943727dd?w=400",
      latest: false
    },
    {
      time: "10:00",
      title: "เช็คอินเข้าพัก",
      desc: "น้องถุงทองมาถึงแล้ว สุขภาพแข็งแรงดีครับ",
      image: null,
      latest: false
    }
  ];

  return (
    <div className="user-container" style={{maxWidth: '600px'}}>
      
      <Link to="/MyBookings" style={{textDecoration:'none', color:'#718096', marginBottom:'20px', display:'inline-block'}}>
        ⬅ ย้อนกลับ
      </Link>

      <div className="tracking-header">
        {/* เอา ID มาแสดงเช็คว่ารับค่ามาได้จริง */}
        <p style={{fontSize: '10px', color: '#ccc'}}>Booking ID: {id}</p> 

        <img 
          src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300" 
          alt="Pet" 
          className="tracking-pet-img" 
        />
        <h2>น้องถุงทอง</h2>
        <p style={{color:'#718096'}}>ดูแลโดย: พี่มายด์ รับฝากแมว</p>
        <span className="status-badge confirmed" style={{marginTop:'10px'}}>กำลังฝากเลี้ยง</span>
      </div>

      <h3 style={{marginLeft:'20px'}}>📝 ไทม์ไลน์วันนี้</h3>

      <div className="timeline-container">
        {timelineEvents.map((event, index) => (
          <div key={index} className={`timeline-item ${event.latest ? 'latest' : ''}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="time-tag">🕒 {event.time}</span>
              <div className="activity-title">{event.title}</div>
              <p className="activity-desc">{event.desc}</p>
              
              {event.image && (
                <img src={event.image} alt="activity" className="activity-img" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;