import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/ServiceList.css'
const ServiceList: React.FC = () => {
  const { type } = useParams(); // รับค่าประเภทบริการจาก URL (เช่น grooming)

  // แปลงชื่อบริการเป็นภาษาไทยเพื่อแสดงหัวข้อ
  const serviceTitles: Record<string, string> = {
    boarding: "🏠 ฝากเลี้ยง (Boarding)",
    daycare: "⏳ ฝากรายชั่วโมง (Day Care)",
    walking: "🐕 พาเดินเล่น (Walking)",
    grooming: "✂️ อาบน้ำตัดขน (Grooming)"
  };

  // --- Mock Data: รายชื่อร้านและบริการที่รับทำ ---
  // services: ระบุว่าร้านนี้รับทำอะไรบ้าง ['boarding', 'grooming', ...]
  const allSitters = [
    {
      id: 1,
      name: "พี่มายด์ รับฝากแมว (Cat Hotel)",
      location: "อ.เมือง จันทบุรี",
      price: 350,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80",
      services: ['boarding', 'daycare'], // ร้านนี้รับฝากเลี้ยง + รายชั่วโมง
      tags: ["ทาสแมว", "ห้องแอร์"]
    },
    {
      id: 2,
      name: "Dog Lover Chanthaburi",
      location: "อ.ท่าใหม่ จันทบุรี",
      price: 500,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=200&q=80",
      services: ['boarding', 'walking', 'grooming'], // ร้านนี้รับเยอะ
      tags: ["มีสนามหญ้า", "รับสุนัขใหญ่"]
    },
    {
      id: 3,
      name: "บ้านอุ่นใจ ฝากเลี้ยง",
      location: "อ.เมือง จันทบุรี",
      price: 300,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=200&q=80",
      services: ['daycare', 'boarding'],
      tags: ["รับสัตว์เล็ก", "ราคาประหยัด"]
    },
    {
      id: 4,
      name: "Kwang Grooming (ช่างกวาง)",
      location: "โรบินสัน จันทบุรี",
      price: 400,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=200&q=80",
      services: ['grooming'], // ร้านนี้รับอาบน้ำอย่างเดียว
      tags: ["มืออาชีพ", "ตัดขนสวย"]
    },
    {
        id: 5,
        name: "Buddy Walk พาเดินเล่น",
        location: "สวนสาธารณะทุ่งนาเชย",
        price: 150,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255db?auto=format&fit=crop&w=200&q=80",
        services: ['walking'],
        tags: ["ออกกำลังกาย", "แข็งแรง"]
      }
  ];

  // --- หัวใจสำคัญ: กรองร้านเฉพาะที่รับบริการนี้ ---
  const filteredSitters = allSitters.filter(sitter => 
    sitter.services.includes(type || '')
  );

  return (
    <div className="service-list-page">
      <div className="list-header">
        <h1>{serviceTitles[type || 'boarding'] || 'บริการทั้งหมด'}</h1>
        <p>พบ {filteredSitters.length} ร้านที่ให้บริการนี้ในจันทบุรี</p>
      </div>

      <div className="sitter-list-container">
        {filteredSitters.length > 0 ? (
          filteredSitters.map((sitter) => (
            <div key={sitter.id} className="sitter-card-horizontal">
              <img src={sitter.image} alt={sitter.name} className="sitter-thumb" />
              
              <div className="sitter-info">
                <div className="sitter-top-row">
                    <h3>{sitter.name}</h3>
                    <div className="rating-badge">⭐ {sitter.rating}</div>
                </div>
                
                <p className="location-text">📍 {sitter.location}</p>
                
                <div className="tags-row">
                    {sitter.services.includes(type || '') && (
                        <span className="service-tag-highlight">
                           {/* แสดง Tag บริการที่ลูกค้าเลือกอยู่ */}
                           {type === 'grooming' ? '✂️ รับอาบน้ำตัดขน' : 
                            type === 'boarding' ? '🏠 รับฝากเลี้ยง' : 
                            type === 'walking' ? '🐕 รับพาเดิน' : '⏳ รับฝากรายชม.'}
                        </span>
                    )}
                    {sitter.tags.map((t, i) => <span key={i} className="tag-pill">{t}</span>)}
                </div>

                <div className="price-row">
                    <div>
                        <span className="start-label">เริ่มต้น</span>
                        <span className="price-text">฿{sitter.price}</span>
                    </div>
                    {/* ปุ่มกดแล้วไปหน้ารายละเอียดร้าน (SitterDetails) */}
                    <Link to={`/sitter/${sitter.id}`} className="view-btn">
                        ดูรายละเอียด
                    </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="not-found-box">
            <h3>❌ ไม่พบร้านที่ให้บริการนี้</h3>
            <p>ลองค้นหาบริการอื่น หรือดูร้านแนะนำทั้งหมด</p>
            <Link to="/map" className="btn-secondary">ดูร้านทั้งหมด</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;