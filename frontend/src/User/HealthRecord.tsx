import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/User.css';

// กำหนด Type ของข้อมูล
interface HealthLog {
  id: number;
  date: string;
  type: 'vaccine' | 'treatment' | 'checkup' | 'grooming';
  title: string;
  doctor: string;
  cost: number;
  note: string;
}

const HealthRecord: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  // Mock Data: ข้อมูลสัตว์เลี้ยง
  const petInfo = {
    name: "น้องถุงทอง",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300",
    breed: "Scottish Fold"
  };

  // Mock Data: ประวัติการรักษา
  const [logs, setLogs] = useState<HealthLog[]>([
    { id: 1, date: "2024-02-10", type: 'vaccine', title: "วัคซีนรวม (เข็ม 2)", doctor: "คลินิกหมอใจดี", cost: 450, note: "นัดเข็มต่อไปเดือนหน้า" },
    { id: 2, date: "2024-01-15", type: 'treatment', title: "รักษาอาการท้องเสีย", doctor: "รพ.สัตว์เมืองทอง", cost: 1200, note: "ได้ยาฆ่าเชื้อและเกลือแร่" },
    { id: 3, date: "2023-12-20", type: 'checkup', title: "ตรวจสุขภาพประจำปี", doctor: "คลินิกหมอใจดี", cost: 900, note: "แข็งแรงดี น้ำหนักขึ้นเล็กน้อย" },
  ]);

  // State สำหรับฟอร์มเพิ่มข้อมูลใหม่
  const [newLog, setNewLog] = useState<Partial<HealthLog>>({
    date: '', type: 'vaccine', title: '', doctor: '', cost: 0, note: ''
  });

  // ฟังก์ชันเพิ่มรายการใหม่
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ แก้ไขตรงนี้: ระบุ Type ให้ชัดเจนและใส่ Default กันพลาด
    const log: HealthLog = {
      id: Date.now(),
      date: newLog.date || new Date().toISOString().split('T')[0],
      type: (newLog.type as HealthLog['type']) || 'vaccine', 
      title: newLog.title || 'ไม่ระบุรายการ',
      doctor: newLog.doctor || '-',
      cost: Number(newLog.cost) || 0,
      note: newLog.note || '-'
    };

    setLogs([log, ...logs]); // เพิ่มไปบนสุด
    setShowForm(false); // ปิดฟอร์ม
    setNewLog({ date: '', type: 'vaccine', title: '', doctor: '', cost: 0, note: '' }); // Reset
  };

  // ฟังก์ชันเลือกไอคอนและสีตามประเภท
  const getTypeConfig = (type: string) => {
    switch(type) {
      case 'vaccine': return { icon: '💉', color: '#38A169', label: 'วัคซีน' };
      case 'treatment': return { icon: '💊', color: '#E53E3E', label: 'รักษา' };
      case 'checkup': return { icon: '🩺', color: '#3182CE', label: 'ตรวจสุขภาพ' };
      case 'grooming': return { icon: '✂️', color: '#D69E2E', label: 'อาบน้ำ/ตัดขน' };
      default: return { icon: '📝', color: '#718096', label: 'อื่นๆ' };
    }
  };

  // กรองข้อมูลตาม Filter
  const filteredLogs = filterType === 'all' ? logs : logs.filter(l => l.type === filterType);

  return (
    <div className="user-container" style={{maxWidth: '800px'}}>
      
      {/* Header Bar */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px'}}>
        <Link to={`/pet/${id}`} style={{textDecoration:'none', color:'#718096'}}>
          ⬅ ย้อนกลับ
        </Link>
        <button className="btn-save" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ ปิดฟอร์ม' : '➕ เพิ่มบันทึก'}
        </button>
      </div>

      {/* Pet Header */}
      <div className="health-header-card">
        <img src={petInfo.image} alt="Pet" />
        <div>
          <h2>สมุดสุขภาพ: {petInfo.name}</h2>
          <p>{petInfo.breed}</p>
        </div>
      </div>

      {/* Form Section (Toggle) */}
      {showForm && (
        <div className="form-section fade-in">
          <div className="section-title">✍️ เพิ่มประวัติใหม่</div>
          <form onSubmit={handleAddLog}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">วันที่</label>
                <input type="date" className="form-input" required 
                  value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">ประเภท</label>
                
                {/* ✅ แก้ไขตรงนี้: Cast value เป็น Type ที่ถูกต้อง */}
                <select className="form-select" 
                  value={newLog.type} 
                  onChange={e => setNewLog({...newLog, type: e.target.value as HealthLog['type']})}
                >
                  <option value="vaccine">💉 วัคซีน</option>
                  <option value="treatment">💊 รักษาโรค</option>
                  <option value="checkup">🩺 ตรวจสุขภาพ</option>
                  <option value="grooming">✂️ อาบน้ำตัดขน</option>
                </select>

              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">รายการ / อาการ</label>
              <input type="text" className="form-input" placeholder="เช่น ฉีดวัคซีนรวม 5 โรค" required
                value={newLog.title} onChange={e => setNewLog({...newLog, title: e.target.value})} />
            </div>

            <div className="form-grid">
               <div className="form-group">
                <label className="form-label">สถานที่ / สัตวแพทย์</label>
                <input type="text" className="form-input" placeholder="ระบุคลินิก"
                  value={newLog.doctor} onChange={e => setNewLog({...newLog, doctor: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">ค่าใช้จ่าย (บาท)</label>
                <input type="number" className="form-input" placeholder="0"
                  value={newLog.cost} onChange={e => setNewLog({...newLog, cost: Number(e.target.value)})} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">บันทึกเพิ่มเติม</label>
              <textarea className="form-textarea" placeholder="เช่น หมอนัดอีกทีวันที่..." style={{minHeight:'60px'}}
                 value={newLog.note} onChange={e => setNewLog({...newLog, note: e.target.value})} />
            </div>

            <button type="submit" className="btn-save" style={{width:'100%', justifyContent:'center'}}>บันทึกข้อมูล</button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="filter-chips">
        {['all', 'vaccine', 'treatment', 'checkup'].map(type => (
          <button 
            key={type}
            className={`chip ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type === 'all' ? 'ทั้งหมด' : getTypeConfig(type).label}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="health-timeline">
        {filteredLogs.map(log => {
          const config = getTypeConfig(log.type);
          return (
            <div key={log.id} className="health-card">
              <div className="health-date">
                <span>{log.date.split('-')[2]}</span>
                <small>{['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][parseInt(log.date.split('-')[1])-1]}</small>
              </div>
              
              <div className="health-content" style={{borderLeft: `4px solid ${config.color}`}}>
                <div className="health-badge" style={{background: config.color + '20', color: config.color}}>
                  {config.icon} {config.label}
                </div>
                <h3>{log.title}</h3>
                <div className="health-meta">
                  <span>🏥 {log.doctor}</span>
                  {log.cost > 0 && <span>💰 ฿{log.cost.toLocaleString()}</span>}
                </div>
                {log.note && <p className="health-note">"{log.note}"</p>}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default HealthRecord;