import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link เข้ามา
import './css/Services.css';

const Services: React.FC = () => {
  // 2. เพิ่ม key 'type' ให้ตรงกับที่เราตั้งใน Route (boarding, daycare, walking, grooming)
  const servicesData = [
    { 
      id: 1, 
      type: 'boarding', 
      icon: "🏠", 
      title: "ฝากเลี้ยง (Boarding)", 
      desc: "ดูแลตลอด 24 ชม. ในบ้านที่อบอุ่น ไม่ขังกรง พร้อมแอร์เย็นฉ่ำ", 
      price: "เริ่มต้น 350฿ / คืน" 
    },
    { 
      id: 2, 
      type: 'daycare', 
      icon: "⏳", 
      title: "ฝากรายชั่วโมง (Day Care)", 
      desc: "สำหรับธุระด่วน ดูแลระยะสั้นแต่อุ่นใจยาวๆ", 
      price: "เริ่มต้น 50฿ / ชม." 
    },
    { 
      id: 3, 
      type: 'walking', 
      icon: "🐕", 
      title: "พาเดินเล่น (Walking)", 
      desc: "พาน้องออกกำลังกาย 30-60 นาที เพื่อสุขภาพที่ดี", 
      price: "เริ่มต้น 150฿ / ครั้ง" 
    },
    { 
      id: 4, 
      type: 'grooming', 
      icon: "🛁", 
      title: "อาบน้ำตัดขน (Grooming)", 
      desc: "บริการสปาสัตว์เลี้ยง อาบน้ำ ตัดขน ตัดเล็บ", 
      price: "เริ่มต้น 300฿" 
    }
  ];

  return (
    <div className="services-page">
      {/* Header ของหน้าบริการ */}
      <div style={{ padding: '60px 8% 20px', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '42px' }}>บริการของเรา</h1>
        <p className="hero-subtitle" style={{ margin: '0 auto' }}>
          เลือกรูปแบบการดูแลที่เหมาะกับไลฟ์สไตล์ของคุณและน้องๆ
        </p>
      </div>

      {/* Grid แสดงบริการ */}
      <section className="services-section" style={{ paddingTop: '20px' }}>
        <div className="service-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <div className="service-content">
                <h3 className="service-name">{service.title}</h3>
                <p className="service-detail">{service.desc}</p>
                <div className="service-price">{service.price}</div>
                
                {/* 3. แก้ไขตรงนี้: เปลี่ยน button เป็น Link และส่ง type ไปที่ URL */}
                <Link to={`/list/${service.type}`} className="btn-book">
                  ร้านที่รับบริการ
                </Link>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;