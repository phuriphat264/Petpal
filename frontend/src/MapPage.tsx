import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate เพื่อเปลี่ยนหน้า
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './css/MapPage.css';
// --- ส่วนแก้ Bug ไอคอนหมุดไม่ขึ้นใน React Leaflet (สำคัญมาก) ---
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
// -----------------------------------------------------------

// ข้อมูลจำลองพี่เลี้ยง (Mock Data)
const sitters = [
  { id: 1, name: "พี่มายด์ รับฝากแมว", price: 350, lat: 12.6606, lng: 102.0967, img: "🐱", desc: "ทาสแมวตัวจริง ดูแลดีเหมือนลูก" },
  { id: 2, name: "Dog Lover Chanthaburi", price: 500, lat: 12.6650, lng: 102.1050, img: "🐶", desc: "บ้านเดี่ยว มีสนามหญ้ากว้าง" },
  { id: 3, name: "บ้านอุ่นใจ ฝากเลี้ยง", price: 300, lat: 12.6550, lng: 102.0900, img: "🏠", desc: "รับฝากสัตว์เล็ก ราคากันเอง" },
];

const MapPage: React.FC = () => {
  // พิกัดเริ่มต้น (ม.บูรพา จันทบุรี)
  const centerPosition: [number, number] = [12.6606, 102.0967];
  
  // State สำหรับเก็บว่าเลือกพี่เลี้ยงคนไหนอยู่
  const [selectedSitter, setSelectedSitter] = useState<number | null>(null);
  
  // Hook สำหรับเปลี่ยนหน้า
  const navigate = useNavigate();

  // ฟังก์ชันเมื่อกดปุ่ม "ดูรายละเอียด"
  const handleViewDetails = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // ป้องกันไม่ให้ Event คลิกการ์ดทำงานซ้อน
    navigate(`/sitter/${id}`); // สั่งให้ไปหน้าหน้ารายละเอียดพร้อมแนบ ID
  };

  return (
    <div className="map-page-layout">
      
      {/* 1. แถบรายการทางซ้าย (Sidebar List) */}
      <div className="sidebar-list">
        <div className="sidebar-header">
          <h2>📍 ค้นหาพี่เลี้ยงใกล้คุณ</h2>
          <p>พบพี่เลี้ยง {sitters.length} คนในบริเวณนี้</p>
          <input type="text" placeholder="🔍 ค้นหาทำเล..." className="search-bar" />
        </div>

        <div className="sitter-cards">
          {sitters.map((sitter) => (
            <div 
              key={sitter.id} 
              className={`sitter-item ${selectedSitter === sitter.id ? 'active' : ''}`}
              onClick={() => setSelectedSitter(sitter.id)}
            >
              <div className="sitter-emoji">{sitter.img}</div>
              <div className="sitter-info">
                <h3>{sitter.name}</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{sitter.desc}</p>
                <p className="price">เริ่มต้น ฿{sitter.price} / คืน</p>
                
                {/* ปุ่มดูรายละเอียด */}
                <button 
                  className="btn-view"
                  onClick={(e) => handleViewDetails(e, sitter.id)}
                >
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ส่วนแสดงแผนที่ (Map View) */}
      <div className="map-container-wrapper">
        <MapContainer 
            center={centerPosition} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {sitters.map((sitter) => (
            <Marker 
              key={sitter.id} 
              position={[sitter.lat, sitter.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedSitter(sitter.id); // เมื่อกดหมุด ให้เลือกการ์ดด้านซ้ายด้วย
                },
              }}
            >
              <Popup>
                <div style={{ textAlign: 'center', minWidth: '120px' }}>
                  <span style={{ fontSize: '24px', display:'block', marginBottom:'5px' }}>{sitter.img}</span>
                  <b style={{ fontSize: '14px' }}>{sitter.name}</b><br/>
                  <span style={{ color: '#2E7D32', fontWeight:'bold' }}>฿{sitter.price} / คืน</span><br/>
                  
                  <button 
                    style={{ 
                        marginTop: '8px', 
                        padding: '4px 8px', 
                        background: '#333', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                    onClick={(e) => handleViewDetails(e, sitter.id)}
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default MapPage;