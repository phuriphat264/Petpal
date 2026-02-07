import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/User.css';

// กำหนด Type ของข้อมูลสัตว์เลี้ยง
interface PetProfile {
  name: string;
  type: string;
  breed: string;
  gender: string;
  birthDate: string;
  weight: string;
  microchip: string;
  sterilized: string;
  allergies: string;
  food: string;
  notes: string;
  image: string;
}

// กำหนด Type ของประวัติสุขภาพ
interface HealthRecord {
  id: number;
  date: string;
  title: string;
  doctor: string;
  note: string;
}

const PetDetails: React.FC = () => {
  const { id } = useParams() as { id: string };
  console.log("Current Pet ID:", id);
  const [isEditing, setIsEditing] = useState(false);

  // Mock Data: ข้อมูลสัตว์เลี้ยง (ค่าเริ่มต้น)
  const [petData, setPetData] = useState<PetProfile>({
    name: "ถุงทอง",
    type: "แมว",
    breed: "Scottish Fold",
    gender: "ชาย",
    birthDate: "2022-05-20",
    weight: "4.5",
    microchip: "900123456789",
    sterilized: "yes",
    allergies: "ไม่มี",
    food: "Royal Canin สูตรแมวเลี้ยงในบ้าน",
    notes: "กลัวเสียงฟ้าผ่า ชอบให้เกาคาง",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300"
  });

  // Mock Data: ประวัติสุขภาพ
  const [medicalHistory, setMedicalHistory] = useState<HealthRecord[]>([
    { id: 1, date: "2024-01-10", title: "ฉีดวัคซีนพิษสุนัขบ้า", doctor: "คลินิกหมอใจดี", note: "นัดเข็มต่อไปปีหน้า" },
    { id: 2, date: "2023-11-05", title: "ถ่ายพยาธิ", doctor: "รพ.สัตว์เมืองทอง", note: "ปกติ แข็งแรงดี" }
  ]);

  // State สำหรับฟอร์มเพิ่มประวัติใหม่
  const [newRecord, setNewRecord] = useState({ date: '', title: '', doctor: '', note: '' });

  // ฟังก์ชันเวลากรอกข้อมูลแก้ไข Profile
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  // ฟังก์ชันบันทึก Profile
  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("บันทึกข้อมูลเรียบร้อย!"); // ในจริงต้องยิง API Update
  };

  // ฟังก์ชันเพิ่มประวัติสุขภาพ
  const handleAddRecord = () => {
    if(!newRecord.title || !newRecord.date) return alert("กรุณากรอกวันที่และรายการ");
    
    const record: HealthRecord = {
      id: Date.now(),
      ...newRecord
    };
    setMedicalHistory([record, ...medicalHistory]);
    setNewRecord({ date: '', title: '', doctor: '', note: '' }); // Reset Form
  };

  return (
    <div className="user-container">
      {/* Header & Back Button */}
      <Link to="/MyPets" style={{textDecoration:'none', color:'#718096', marginBottom:'20px', display:'inline-block'}}>
        ⬅ กลับไปหน้ารวม
      </Link>

      <div className="pet-detail-header">
        <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
           <img src={petData.image} alt="Pet" className="pet-cover-upload" />
           <div>
             <h1 style={{margin:0, fontSize:'24px'}}>{petData.name}</h1>
             <p style={{color:'#718096'}}>{petData.breed} ({petData.type})</p>
           </div>
        </div>
        
        {/* ปุ่ม Edit / Save Switch */}
        {!isEditing ? (
          <button className="btn-secondary" onClick={() => setIsEditing(true)}>✏️ แก้ไขข้อมูล</button>
        ) : (
          <div style={{display:'flex', gap:'10px'}}>
            <button className="btn-secondary" onClick={() => setIsEditing(false)}>ยกเลิก</button>
            <button className="btn-save" onClick={handleSaveProfile}>💾 บันทึก</button>
          </div>
        )}
      </div>

      {/* ================= SECTION 1: ข้อมูลทั่วไป ================= */}
      <div className="form-section">
        <div className="section-title">📌 ข้อมูลทั่วไป (General Info)</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">ชื่อสัตว์เลี้ยง</label>
            <input 
              type="text" name="name" className="form-input" 
              value={petData.name} onChange={handleInputChange} disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">สายพันธุ์</label>
            <input 
              type="text" name="breed" className="form-input" 
              value={petData.breed} onChange={handleInputChange} disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label className="form-label">วันเกิด</label>
            <input 
              type="date" name="birthDate" className="form-input" 
              value={petData.birthDate} onChange={handleInputChange} disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label className="form-label">น้ำหนัก (kg)</label>
            <input 
              type="number" name="weight" className="form-input" 
              value={petData.weight} onChange={handleInputChange} disabled={!isEditing}
            />
          </div>
          <div className="form-group">
             <label className="form-label">การทำหมัน</label>
             <select name="sterilized" className="form-select" value={petData.sterilized} onChange={handleInputChange} disabled={!isEditing}>
               <option value="yes">ทำหมันแล้ว</option>
               <option value="no">ยังไม่ทำหมัน</option>
             </select>
          </div>
           <div className="form-group">
            <label className="form-label">เลขไมโครชิป</label>
            <input 
              type="text" name="microchip" className="form-input" 
              value={petData.microchip} onChange={handleInputChange} disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: การดูแลพิเศษ ================= */}
      <div className="form-section">
        <div className="section-title">🍖 การดูแลและอาหาร (Care & Food)</div>
        <div className="form-group">
            <label className="form-label">โรคประจำตัว / แพ้ยา / แพ้อาหาร</label>
            <input 
              type="text" name="allergies" className="form-input" style={{color: '#e53e3e'}}
              value={petData.allergies} onChange={handleInputChange} disabled={!isEditing}
            />
        </div>
        <div className="form-group">
            <label className="form-label">อาหารที่ชอบ / ยี่ห้อประจำ</label>
            <input 
              type="text" name="food" className="form-input" 
              value={petData.food} onChange={handleInputChange} disabled={!isEditing}
            />
        </div>
        <div className="form-group">
            <label className="form-label">นิสัย / ข้อควรระวังเพิ่มเติม</label>
            <textarea 
              name="notes" className="form-textarea" 
              value={petData.notes} onChange={handleInputChange} disabled={!isEditing}
            />
        </div>
      </div>

      {/* ================= SECTION 3: บันทึกสุขภาพ (Medical Records) ================= */}
      <div className="form-section">
        <div className="section-title">💉 สมุดบันทึกสุขภาพ (Health Records)</div>
        <Link to={`/pet/${id}/health`} className="btn-secondary" style={{textDecoration:'none', display:'inline-block', marginTop:'10px'}}>
            📖 ดูสมุดสุขภาพแบบเต็ม
        </Link>
        {/* ฟอร์มเพิ่มข้อมูลใหม่แบบด่วน */}
        <div style={{background:'#F0FFF4', padding:'15px', borderRadius:'8px', marginBottom:'20px', border:'1px dashed #48BB78'}}>
          <label className="form-label" style={{color:'#2F855A'}}>+ เพิ่มบันทึกใหม่</label>
          <div className="form-grid" style={{marginBottom:'10px'}}>
             <input type="date" className="form-input" value={newRecord.date} onChange={e => setNewRecord({...newRecord, date: e.target.value})} />
             <input type="text" className="form-input" placeholder="รายการ (เช่น ฉีดวัคซีน)" value={newRecord.title} onChange={e => setNewRecord({...newRecord, title: e.target.value})} />
          </div>
          <div className="form-grid" style={{marginBottom:'10px'}}>
             <input type="text" className="form-input" placeholder="สถานที่/คลินิก" value={newRecord.doctor} onChange={e => setNewRecord({...newRecord, doctor: e.target.value})} />
             <input type="text" className="form-input" placeholder="หมายเหตุ" value={newRecord.note} onChange={e => setNewRecord({...newRecord, note: e.target.value})} />
          </div>
          <button className="btn-save" style={{padding:'6px 15px', fontSize:'14px'}} onClick={handleAddRecord}>บันทึกประวัติ</button>
        </div>

        {/* ตารางแสดงประวัติ */}
        <table className="health-table">
          <thead>
            <tr>
              <th style={{width:'120px'}}>วันที่</th>
              <th>รายการ</th>
              <th>สถานที่</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {medicalHistory.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.date}</td>
                <td style={{fontWeight:'bold'}}>{rec.title}</td>
                <td>{rec.doctor}</td>
                <td style={{color:'#718096'}}>{rec.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PetDetails;