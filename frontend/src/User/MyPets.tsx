import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css'; // ดึงสไตล์พื้นฐานมาใช้
import '../css/User.css'; // สไตล์เฉพาะของหน้า User

const MyPets: React.FC = () => {
  // Mock Data: ข้อมูลสัตว์เลี้ยงจำลอง
  const pets = [
    {
      id: 1,
      name: "ถุงทอง",
      type: "แมว",
      breed: "Scottish Fold",
      age: "2 ปี",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop",
      alert: false
    },
    {
      id: 2,
      name: "เจ้าดื้อ",
      type: "สุนัข",
      breed: "Corgi",
      age: "1 ปี 6 เดือน",
      image: "https://images.unsplash.com/photo-1589965716319-4a041a5fd37d?w=500&auto=format&fit=crop",
      alert: true // แจ้งเตือน: ข้อมูลไม่ครบ
    }
  ];

  return (
    <div className="page-container">
      <div className="mypets-wrapper">
        
        {/* หัวข้อหน้า */}
        <div className="section-header" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '40px' }}>
          <h2 className="section-title">🐾 สัตว์เลี้ยงของฉัน</h2>
          <p className="section-subtitle">จัดการข้อมูลและประวัติสุขภาพของลูกรักคุณ</p>
        </div>

        <div className="pet-grid">
          {/* วนลูปแสดงรายการสัตว์เลี้ยง */}
          {pets.map((pet) => (
            <Link 
              to={`/pet/${pet.id}`} 
              key={pet.id} 
              className="pet-card-link"
            >
              <div className="pet-card">
                <div className="pet-img-container">
                  <img src={pet.image} alt={pet.name} className="pet-img" />
                  {/* แสดงป้ายเตือน ถ้ามี alert = true */}
                  {pet.alert && (
                    <div className="pet-alert-badge">
                      ⚠️ กรุณาอัปเดตวัคซีน
                    </div>
                  )}
                </div>
                
                <div className="pet-info">
                  <div className="pet-info-header">
                    <h3>{pet.name}</h3>
                    <div className="edit-icon">✏️</div>
                  </div>
                  <p className="pet-breed">{pet.type} • {pet.breed}</p>
                  <div className="pet-age-badge">🎂 อายุ: {pet.age}</div>
                </div>
              </div>
            </Link>
          ))}

          {/* การ์ดสำหรับกดเพิ่มสัตว์เลี้ยงใหม่ */}
          <Link to="/AddPet" className="add-pet-link">
            <div className="add-pet-card">
              <div className="add-icon-circle">➕</div>
              <span>เพิ่มสัตว์เลี้ยงใหม่</span>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default MyPets;