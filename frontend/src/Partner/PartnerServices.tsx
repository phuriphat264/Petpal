import React, { useState } from 'react';
import PartnerSidebar from '../component/PartnerSidebar'; // ✅ Import มาใช้
import '../css/Partner.css';

const PartnerServices: React.FC = () => {
  // Mock Services
  const [services, setServices] = useState([
    { id: 1, name: "ฝากเลี้ยง (ค้างคืน)", price: 350, unit: "คืน", active: true },
    { id: 2, name: "อาบน้ำตัดขน", price: 400, unit: "ครั้ง", active: true },
    { id: 3, name: "รับ-ส่ง สัตว์เลี้ยง", price: 100, unit: "เที่ยว", active: false },
    { id: 4, name: "พาเดินเล่น", price: 150, unit: "ชม.", active: true },
  ]);

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="partner-layout">
       
       {/* ✅ เรียกใช้ Sidebar บรรทัดเดียวจบ */}
       <PartnerSidebar />

      <main className="partner-content">
        <header className="content-header">
          <h1>จัดการบริการและราคา</h1>
          <button className="btn-add-service">+ เพิ่มบริการใหม่</button>
        </header>

        <div className="services-grid-container">
          {services.map(service => (
            <div key={service.id} className={`service-manage-card ${service.active ? '' : 'inactive'}`}>
              <div className="service-top">
                <h3>{service.name}</h3>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={service.active} 
                    onChange={() => toggleService(service.id)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="price-input-group">
                <label>ราคา (บาท)</label>
                <div className="input-wrapper">
                  <input type="number" defaultValue={service.price} />
                  <span>/ {service.unit}</span>
                </div>
              </div>

              <div className="service-actions">
                <button className="btn-edit">แก้ไขรายละเอียด</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PartnerServices;