import React from 'react';
import { Link } from 'react-router-dom'; // อย่าลืม import Link
import '../css/User.css';

const MyPets: React.FC = () => {
  // Mock Data: ข้อมูลสัตว์เลี้ยงจำลอง
  const pets = [
    {
      id: 1,
      name: "ถุงทอง",
      type: "แมว",
      breed: "Scottish Fold",
      age: "2 ปี",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300",
      alert: false
    },
    {
      id: 2,
      name: "เจ้าดื้อ",
      type: "สุนัข",
      breed: "Corgi",
      age: "1 ปี 6 เดือน",
      image: "https://images.unsplash.com/photo-1589965716319-4a041a5fd37d?w=300",
      alert: true // แจ้งเตือน: ข้อมูลไม่ครบ
    }
  ];

  return (
    <div className="user-container">
      <div className="page-title">
        🐾 สัตว์เลี้ยงของฉัน
      </div>

      <div className="pet-grid">
        {/* วนลูปแสดงรายการสัตว์เลี้ยง */}
        {pets.map((pet) => (
          // ✅ ใช้ Link ครอบเพื่อให้กดแล้วไปหน้า PetDetails ได้
          <Link 
            to={`/pet/${pet.id}`} 
            key={pet.id} 
            style={{ textDecoration: 'none', color: 'inherit' }} // ลบเส้นใต้ Link ออก
          >
            <div className="pet-card">
              <img src={pet.image} alt={pet.name} className="pet-img" />
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.type} • {pet.breed}</p>
                <p>อายุ: {pet.age}</p>
                
                {/* แสดงป้ายเตือน ถ้ามี alert = true */}
                {pet.alert && (
                  <span className="badge-warning">⚠️ กรุณาอัปเดตวัคซีน</span>
                )}
              </div>
              
              {/* ไอคอนดินสอตกแต่ง */}
              <div style={{position: 'absolute', top: '15px', right: '15px', color: '#ccc'}}>
                 ✏️
              </div>
            </div>
          </Link>
        ))}

        {/* การ์ดสำหรับกดเพิ่มสัตว์เลี้ยงใหม่ */}
        {/* (ในอนาคตสามารถเปลี่ยน div เป็น Link ไปหน้า AddPet ได้) */}
        
        <Link to="/AddPet" style={{textDecoration:'none', color:'inherit'}}>
          <div className="add-pet-card">
             <div className="add-icon">➕</div>
             <span>เพิ่มสัตว์เลี้ยงใหม่</span>
          </div>
        </Link>
         
        
      </div>
    </div>
  );
};

export default MyPets;