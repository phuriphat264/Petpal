import React, { useState } from 'react';
// 👉 1. เพิ่ม useNavigate ตรงนี้
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../css/SitterDetails.css';

// --- ส่วนแก้ Bug ไอคอนหมุดไม่ขึ้นใน React Leaflet ---
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;
// --------------------------------------------------

const SitterDetails: React.FC = () => {
  const { id } = useParams();
  const [showMapModal, setShowMapModal] = useState(false); // State เปิด/ปิดแผนที่ใหญ่
  
  // 👉 2. ประกาศตัวแปร navigate เพื่อใช้เปลี่ยนหน้า
  const navigate = useNavigate();

  // --- 1. ข้อมูลจำลองร้าน (Mock Data) ---
  const allSitters = [
    { 
      id: 1, 
      name: "พี่มายด์ รับฝากแมว (Cat Hotel)", 
      address: "123 ถ.ท่าแฉลบ ต.ตลาด อ.เมือง จันทบุรี 22000",
      rating: 4.9,
      reviews: 120,
      price: 350,
      lat: 12.6606, 
      lng: 102.0967,
      desc: "ทาสแมวตัวจริง! ที่บ้านดัดแปลงเป็น Cat Hotel ระบบปิด 100% บรรยากาศอบอุ่นเหมือนบ้าน มีคอนโดแมวไม้สักและของเล่นเพียบ ไม่ขังกรงตลอดเวลา น้องๆ เดินเล่นได้ทั่วบ้านค่ะ มีกล้องวงจรปิดดูได้ตลอด 24 ชม.",
      facilities: ["❄️ ห้องแอร์ 24 ชม.", "📹 กล้องวงจรปิด", "❌ ไม่ขังกรง", "💊 ป้อนยาได้", "🚗 มีรถรับ-ส่ง"],
      images: [
        "https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&w=800&q=80", 
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
      ]
    },
    { 
      id: 2, 
      name: "Dog Lover Chanthaburi", 
      address: "55 หมู่ 8 ต.เขาวัว อ.ท่าใหม่ จันทบุรี",
      rating: 4.8,
      reviews: 85,
      price: 500,
      lat: 12.6650, 
      lng: 102.1050,
      desc: "บ้านเดี่ยวมีสนามหญ้ากว้างให้น้องหมาวิ่งเล่น รั้วรอบขอบชิด ปลอดภัยแน่นอน รับฝากสุนัขทุกสายพันธุ์ครับ",
      facilities: ["🌳 มีสนามหญ้า", "🚿 อาบน้ำฟรี", "🏃 พาเดินเล่น", "🏠 บ้านเดี่ยว"],
      images: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80", 
        "https://images.unsplash.com/photo-1601758228041-f3b2795255db?auto=format&fit=crop&w=800&q=80"
      ]
    },
    { 
        id: 3, 
        name: "บ้านอุ่นใจ ฝากเลี้ยง", 
        address: "88 ถ.สุขุมวิท ต.วัดใหม่ อ.เมือง จันทบุรี",
        rating: 4.7,
        reviews: 42,
        price: 300,
        lat: 12.6550, 
        lng: 102.0900,
        desc: "รับฝากสัตว์เล็ก กระต่าย หนูแฮมสเตอร์ และนก ดูแลเหมือนลูกหลาน ราคากันเองค่ะ",
        facilities: ["🐰 รับสัตว์เล็ก", "🥕 อาหารฟรี", "24h ดูแลตลอด"],
        images: [
          "https://images.unsplash.com/photo-1585110396067-c3d6e3789682?auto=format&fit=crop&w=800&q=80", 
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80"
        ]
    }
  ];

  // ค้นหา Sitter ตาม ID (ถ้าไม่เจอให้เอาคนแรกเป็นค่า Default กัน Error)
  const sitter = allSitters.find(s => s.id === Number(id)) || allSitters[0];

  // 👉 3. ฟังก์ชันจัดการเมื่อกดปุ่มจอง
  const handleBookingClick = () => {
    // พาผู้ใช้ไปหน้า /checkout พร้อมส่งข้อมูลร้าน (sitter) ไปด้วย
    navigate('/checkout', { state: { sitter } });
  };

  // --- 2. ข้อมูลจำลองรีวิว (Mock Reviews) ---
  const reviewsList = [
    {
      id: 101,
      user: "น้องพลอย (Ploy)",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      date: "2 วันที่แล้ว",
      rating: 5,
      text: "พี่มายด์น่ารักมากกก ดูแลน้องเหมียวดีสุดๆ ส่งรูปให้ดูตลอด หายห่วงเลยค่ะ แนะนำเลย!",
      petPic: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 102,
      user: "คุณบอย (Boy)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      date: "1 สัปดาห์ที่แล้ว",
      rating: 4,
      text: "สถานที่สะอาด กว้างขวาง น้องหมาวิ่งเล่นสนุก กลับมาหลับปุ๋ยเลยครับ",
      petPic: null
    },
    {
        id: 103,
        user: "Sarah J.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        date: "2 สัปดาห์ที่แล้ว",
        rating: 5,
        text: "Very professional and kind. My cat loved staying here. Will definitely come back!",
        petPic: null
    }
  ];

  return (
    <div className="details-page">
      
      {/* Navbar แบบง่าย */}
      <nav className="details-navbar">
         <Link to="/map" className="back-btn">⬅ ย้อนกลับไปหน้าค้นหา</Link>
         <span className="navbar-title">รายละเอียดร้าน</span>
      </nav>

      <div className="content-wrapper">
        
        {/* --- คอลัมน์ซ้าย: ข้อมูลร้าน + รีวิว --- */}
        <div className="info-column">
          
          {/* 1. Gallery รูปภาพ */}
          <div className="image-gallery">
            <img src={sitter.images[0]} alt="Store Front" className="main-img" />
            <div className="sub-images">
                <img src={sitter.images[1]} alt="Interior" className="thumb-img" />
                <div className="more-img-overlay">+ ดูรูปเพิ่มเติม</div>
            </div>
          </div>

          {/* 2. ข้อมูลร้าน */}
          <div className="section-box">
            <div className="header-row">
                <h1>{sitter.name}</h1>
                <span className="rating-tag">⭐ {sitter.rating} ({sitter.reviews} รีวิว)</span>
            </div>
            <p className="address-text">📍 {sitter.address}</p>
            
            <hr className="divider" />
            
            <h3>เกี่ยวกับเรา</h3>
            <p className="desc-text">{sitter.desc}</p>
            
            <h3>สิ่งอำนวยความสะดวก</h3>
            <div className="facilities-grid">
                {sitter.facilities.map((fac, i) => <span key={i} className="facility-badge">{fac}</span>)}
            </div>
          </div>

          {/* 3. แผนที่ Mini Map */}
          <div className="section-box">
            <h3>📍 ที่ตั้งร้าน</h3>
            <p className="map-hint">คลิกที่แผนที่เพื่อดูขนาดใหญ่</p>
            
            <div className="mini-map-container" onClick={() => setShowMapModal(true)}>
                <MapContainer 
                    center={[sitter.lat, sitter.lng]} 
                    zoom={15} 
                    zoomControl={false} 
                    scrollWheelZoom={false} 
                    dragging={false} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[sitter.lat, sitter.lng]} />
                </MapContainer>
                <div className="map-overlay-btn">🔍 ขยายแผนที่</div>
            </div>
          </div>

          {/* 4. ส่วนรีวิว (Review Section) */}
          <div className="section-box" id="reviews">
            <h3>💬 รีวิวจากลูกค้า ({sitter.reviews})</h3>
            
            {/* กล่องสรุปคะแนน */}
            <div className="review-summary">
                <div className="score-box">
                    <span className="big-score">{sitter.rating}</span>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <span className="total-text">จาก {sitter.reviews} รีวิว</span>
                </div>
                
                {/* หลอดคะแนน Breakdown */}
                <div className="rating-bars">
                    <div className="bar-row">
                        <span>ความสะอาด</span>
                        <div className="progress-bg"><div className="progress-fill" style={{width: '98%'}}></div></div>
                        <span>5.0</span>
                    </div>
                    <div className="bar-row">
                        <span>การบริการ</span>
                        <div className="progress-bg"><div className="progress-fill" style={{width: '95%'}}></div></div>
                        <span>4.9</span>
                    </div>
                    <div className="bar-row">
                        <span>ความคุ้มค่า</span>
                        <div className="progress-bg"><div className="progress-fill" style={{width: '90%'}}></div></div>
                        <span>4.8</span>
                    </div>
                </div>
            </div>

            <hr className="divider" />

            {/* รายการรีวิว (Review List) */}
            <div className="reviews-list">
                {reviewsList.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <img src={review.avatar} alt={review.user} className="user-avatar" />
                            <div className="user-info">
                                <span className="user-name">{review.user}</span>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <div className="review-rating">
                                {Array(review.rating).fill('⭐').join('')}
                            </div>
                        </div>
                        
                        <p className="review-text">{review.text}</p>
                        
                        {/* ถ้ามีรูปสัตว์เลี้ยงแนบมา ให้แสดงด้วย */}
                        {review.petPic && (
                            <img src={review.petPic} alt="Pet" className="pet-pic-review" />
                        )}
                    </div>
                ))}
            </div>

            <button className="btn-outline" style={{marginTop: '20px', width: '100%'}}>
                ดูรีวิวทั้งหมด
            </button>
          </div>

        </div>

        {/* --- คอลัมน์ขวา: กล่องจอง (Sticky Booking Card) --- */}
        <div className="booking-column">
            <div className="booking-card sticky">
                <div className="price-header">
                    <span className="price-num">฿{sitter.price}</span>
                    <span className="price-unit">/ คืน</span>
                </div>
                
                <div style={{ margin: '20px 0', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>เช็คอิน - เช็คเอาท์</div>
                    <div style={{ color: '#666', marginTop: '5px' }}>เลือกวันที่</div>
                </div>

                {/* 👉 4. เพิ่ม onClick={handleBookingClick} ที่ปุ่มนี้ */}
                <button className="btn-primary" onClick={handleBookingClick}>
                    📅 จองเลย
                </button>
                
                <button className="btn-outline">💬 ทักแชทสอบถาม</button>
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '10px' }}>
                    คุณจะยังไม่ถูกตัดเงินทันที
                </p>
            </div>
        </div>

      </div>

      {/* --- MODAL แผนที่ใหญ่ (แสดงเมื่อ showMapModal = true) --- */}
      {showMapModal && (
        <div className="map-modal-overlay" onClick={() => setShowMapModal(false)}>
            <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={() => setShowMapModal(false)}>✖ ปิด</button>
                <MapContainer center={[sitter.lat, sitter.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[sitter.lat, sitter.lng]}>
                        <Popup>{sitter.name}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
      )}

    </div>
  );
};

export default SitterDetails;