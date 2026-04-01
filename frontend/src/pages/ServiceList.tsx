import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/ServiceList.css'

const ServiceList: React.FC = () => {
  const { type } = useParams();

  const serviceTitles: Record<string, string> = {
    boarding: "🏠 ฝากเลี้ยง (Boarding)",
    daycare: "⏳ ฝากรายชั่วโมง (Day Care)",
    walking: "🐕 พาเดินเล่น (Walking)",
    grooming: "✂️ อาบน้ำตัดขน (Grooming)",
    match: "✨ ร้านที่เหมาะกับน้องมากที่สุด (AI Match)"
  };

  // --- เพิ่ม matchScore ในข้อมูลร้าน (สมมติให้ AI ให้คะแนนมา) ---
  const allSitters = [
    {
      id: 1,
      name: "พี่มายด์ รับฝากแมว (Cat Hotel)",
      location: "อ.เมือง จันทบุรี",
      price: 350,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80",
      services: ['boarding', 'daycare', 'match'], 
      matchScore: 98, // <--- เพิ่มตรงนี้
      tags: ["ทาสแมว", "ห้องแอร์"]
    },
    {
      id: 2,
      name: "Dog Lover Chanthaburi",
      location: "อ.ท่าใหม่ จันทบุรี",
      price: 500,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=200&q=80",
      services: ['boarding', 'walking', 'grooming', 'match'],
      matchScore: 92, // <--- เพิ่มตรงนี้
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
      services: ['grooming'],
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

  const filteredSitters = allSitters.filter(sitter => 
    sitter.services.includes(type || '')
  );

  // เรียงลำดับร้านตาม Match Score จากมากไปน้อย (ถ้าเป็นโหมด match)
  const sortedSitters = type === 'match' 
    ? [...filteredSitters].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    : filteredSitters;

  return (
    <div className="service-list-page">
      <div className="list-header">
        <h1>{serviceTitles[type || 'boarding'] || 'บริการทั้งหมด'}</h1>
        <p>พบ {sortedSitters.length} ร้านที่ให้บริการนี้ในจันทบุรี</p>
      </div>

      <div className="sitter-list-container">
        {sortedSitters.length > 0 ? (
          sortedSitters.map((sitter) => (
            <div key={sitter.id} className="sitter-card-horizontal">
              <img src={sitter.image} alt={sitter.name} className="sitter-thumb" />
              
              <div className="sitter-info">
                <div className="sitter-top-row">
                    <h3>{sitter.name}</h3>
                    <div className="rating-badge">⭐ {sitter.rating}</div>
                </div>
                
                {/* 🔥 ส่วนแสดงเปอร์เซ็นต์ (โชว์เฉพาะตอน AI Match) 🔥 */}
                {type === 'match' && sitter.matchScore && (
                  <div style={{
                    display: 'inline-block',
                    background: '#FFF3E0',
                    color: '#E65100',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    border: '1px solid #FFE0B2'
                  }}>
                    🎯 ตรงกับนิสัยน้อง {sitter.matchScore}%
                  </div>
                )}
                
                <p className="location-text" style={{ marginTop: type === 'match' ? '0' : '5px' }}>
                  📍 {sitter.location}
                </p>
                
                <div className="tags-row">
                    {sitter.services.includes(type || '') && type !== 'match' && (
                        <span className="service-tag-highlight">
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
                    <Link to={`/sitter/${sitter.id}`} className="view-btn">
                        ดูรายละเอียด
                    </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="not-found-box">
            <h3>❌ ไม่พบร้านที่ตรงกับความต้องการ</h3>
            <p>ลองค้นหาบริการอื่น หรือดูร้านแนะนำทั้งหมด</p>
            <Link to="/services" className="btn-secondary">ดูร้านทั้งหมด</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;