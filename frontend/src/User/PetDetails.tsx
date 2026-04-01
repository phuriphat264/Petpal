import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/App.css';
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
  const [isEditing, setIsEditing] = useState(false);

  // Mock Data: ข้อมูลสัตว์เลี้ยง
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
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop"
  });

  // Mock Data: ประวัติสุขภาพ
  const [medicalHistory, setMedicalHistory] = useState<HealthRecord[]>([
    { id: 1, date: "2024-01-10", title: "ฉีดวัคซีนพิษสุนัขบ้า", doctor: "คลินิกหมอใจดี", note: "นัดเข็มต่อไปปีหน้า" },
    { id: 2, date: "2023-11-05", title: "ถ่ายพยาธิ", doctor: "รพ.สัตว์เมืองทอง", note: "ปกติ แข็งแรงดี" }
  ]);

  const [newRecord, setNewRecord] = useState({ date: '', title: '', doctor: '', note: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("บันทึกข้อมูลเรียบร้อย!"); 
  };

  const handleAddRecord = () => {
    if(!newRecord.title || !newRecord.date) return alert("กรุณากรอกวันที่และรายการ");
    const record: HealthRecord = { id: Date.now(), ...newRecord };
    setMedicalHistory([record, ...medicalHistory]);
    setNewRecord({ date: '', title: '', doctor: '', note: '' });
  };

  return (
    <div className="page-container">
      <div className="pet-detail-wrapper">
        
        {/* Top Navigation */}
        <div className="top-nav-bar">
          <Link to="/MyPets" className="back-link">
            ❮ กลับไปหน้ารวม
          </Link>
          {!isEditing ? (
            <button className="btn-outline-small" onClick={() => setIsEditing(true)}>✏️ แก้ไขข้อมูล</button>
          ) : (
            <div className="action-buttons">
              <button className="btn-text-small" onClick={() => setIsEditing(false)}>ยกเลิก</button>
              <button className="btn-main-small" onClick={handleSaveProfile}>💾 บันทึก</button>
            </div>
          )}
        </div>

        {/* Profile Header Card */}
        <div className="profile-header-card">
          <img src={petData.image} alt={petData.name} className="profile-avatar-large" />
          <div className="profile-title-info">
            <h1>{petData.name}</h1>
            <p className="subtitle">{petData.breed} • {petData.type}</p>
          </div>
        </div>

        {/* ================= SECTION 1: ข้อมูลทั่วไป ================= */}
        <div className="info-card">
          <h3 className="card-section-title">📌 ข้อมูลทั่วไป</h3>
          <div className="info-grid">
            <div className="info-group">
              <label>ชื่อสัตว์เลี้ยง</label>
              <input type="text" name="name" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.name} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className="info-group">
              <label>สายพันธุ์</label>
              <input type="text" name="breed" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.breed} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className="info-group">
              <label>วันเกิด</label>
              <input type="date" name="birthDate" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.birthDate} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className="info-group">
              <label>น้ำหนัก (kg)</label>
              <input type="number" name="weight" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.weight} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className="info-group">
              <label>การทำหมัน</label>
              <select name="sterilized" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.sterilized} onChange={handleInputChange} disabled={!isEditing}>
                <option value="yes">ทำหมันแล้ว</option>
                <option value="no">ยังไม่ทำหมัน</option>
              </select>
            </div>
            <div className="info-group">
              <label>เลขไมโครชิป</label>
              <input type="text" name="microchip" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.microchip} onChange={handleInputChange} disabled={!isEditing} />
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: การดูแลพิเศษ ================= */}
        <div className="info-card">
          <h3 className="card-section-title">🍖 การดูแลและอาหาร</h3>
          <div className="info-group full-width">
            <label>โรคประจำตัว / แพ้ยา / แพ้อาหาร</label>
            <input type="text" name="allergies" className={`input-styled alert-text ${!isEditing ? 'view-mode' : ''}`} value={petData.allergies} onChange={handleInputChange} disabled={!isEditing} />
          </div>
          <div className="info-group full-width">
            <label>อาหารที่ชอบ / ยี่ห้อประจำ</label>
            <input type="text" name="food" className={`input-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.food} onChange={handleInputChange} disabled={!isEditing} />
          </div>
          <div className="info-group full-width">
            <label>นิสัย / ข้อควรระวังเพิ่มเติม</label>
            <textarea name="notes" className={`input-styled textarea-styled ${!isEditing ? 'view-mode' : ''}`} value={petData.notes} onChange={handleInputChange} disabled={!isEditing} />
          </div>
        </div>

        {/* ================= SECTION 3: บันทึกสุขภาพ ================= */}
        <div className="info-card">
          <div className="health-header">
            <h3 className="card-section-title" style={{ margin: 0 }}>💉 สมุดบันทึกสุขภาพ</h3>
            <Link to={`/pet/${id}/health`} className="btn-outline-small">📖 ดูสมุดสุขภาพเต็ม</Link>
          </div>

          {/* ฟอร์มเพิ่มข้อมูลใหม่แบบด่วน (ธีมน้ำตาล-ครีม) */}
          <div className="health-form-quick">
            <div className="quick-form-title">➕ เพิ่มบันทึกใหม่</div>
            <div className="info-grid" style={{ marginBottom: '15px' }}>
              <input type="date" className="input-styled" value={newRecord.date} onChange={e => setNewRecord({...newRecord, date: e.target.value})} />
              <input type="text" className="input-styled" placeholder="รายการ (เช่น ฉีดวัคซีน)" value={newRecord.title} onChange={e => setNewRecord({...newRecord, title: e.target.value})} />
              <input type="text" className="input-styled" placeholder="สถานที่/คลินิก" value={newRecord.doctor} onChange={e => setNewRecord({...newRecord, doctor: e.target.value})} />
              <input type="text" className="input-styled" placeholder="หมายเหตุ" value={newRecord.note} onChange={e => setNewRecord({...newRecord, note: e.target.value})} />
            </div>
            <button className="btn-main-small" onClick={handleAddRecord}>บันทึกประวัติ</button>
          </div>

          {/* ตารางแสดงประวัติ */}
          <div className="table-responsive">
            <table className="health-table-modern">
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>วันที่</th>
                  <th>รายการ</th>
                  <th>สถานที่</th>
                  <th>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.map((rec) => (
                  <tr key={rec.id}>
                    <td className="date-cell">{rec.date}</td>
                    <td className="title-cell">{rec.title}</td>
                    <td>{rec.doctor}</td>
                    <td className="note-cell">{rec.note}</td>
                  </tr>
                ))}
                {medicalHistory.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#a1887f', padding: '30px' }}>
                      ยังไม่มีบันทึกสุขภาพ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PetDetails;