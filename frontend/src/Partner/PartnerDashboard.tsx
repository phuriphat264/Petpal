import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PartnerSidebar from '../component/PartnerSidebar'; // ✅ Import มาใช้
import '../css/Partner.css';

const PartnerDashboard: React.FC = () => {
  // Mock Data: คำขอจอง
  const [requests, setRequests] = useState([
    { id: 101, petName: "น้องถุงทอง", owner: "คุณสมชาย", type: "Boarding", dates: "10-12 มี.ค.", status: "pending", price: 1050 },
    { id: 102, petName: "Mochi", owner: "คุณเจน", type: "Grooming", dates: "11 มี.ค. 14:00", status: "pending", price: 400 }
  ]);

  // Mock Data: งานวันนี้
  const todayTasks = [
    { id: 201, petName: "Lucky", task: "พาเดินเล่น", time: "08:00 - 09:00", status: "completed" },
    { id: 202, petName: "Coco", task: "อาบน้ำตัดขน", time: "10:30", status: "in-progress" },
    { id: 203, petName: "Luna", task: "ฝากเลี้ยง (Day 2/3)", time: "All Day", status: "active" }
  ];

  const handleAccept = (id: number) => {
    alert(`✅ ยืนยันรับงาน #${id} เรียบร้อย!`);
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleDecline = (id: number) => {
    if(window.confirm("ต้องการปฏิเสธคำขอนี้ใช่ไหม?")) {
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  return (
    <div className="partner-layout">
      
      {/* ✅ เรียกใช้ Sidebar บรรทัดเดียวจบ */}
      <PartnerSidebar />

      {/* เนื้อหาหลักด้านขวา */}
      <main className="partner-content">
        <header className="content-header">
          <h1>สวัสดี, พี่มายด์ 👋</h1>
          <div className="status-toggle">
            <span>สถานะร้าน: </span>
            <button className="btn-toggle-online">🟢 เปิดรับงาน</button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>฿12,500</h3>
              <p>รายได้เดือนนี้</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>5 งาน</h3>
              <p>การจองวันนี้</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>4.9/5.0</h3>
              <p>คะแนนรีวิว</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Incoming Requests */}
          <section className="dashboard-section">
            <div className="section-head">
              <h2>🔔 คำขอจองใหม่ ({requests.length})</h2>
            </div>
            {requests.length > 0 ? (
              <div className="request-list">
                {requests.map(req => (
                  <div key={req.id} className="request-card">
                    <div className="req-info">
                      <h4>{req.type} - {req.petName}</h4>
                      <p>โดย {req.owner} • {req.dates}</p>
                      <span className="price-tag">฿{req.price}</span>
                    </div>
                    <div className="req-actions">
                      <button onClick={() => handleDecline(req.id)} className="btn-decline">ปฏิเสธ</button>
                      <button onClick={() => handleAccept(req.id)} className="btn-accept">รับงาน</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">ไม่มีคำขอใหม่ในขณะนี้</div>
            )}
          </section>

          {/* Today's Tasks */}
          <section className="dashboard-section">
            <div className="section-head">
              <h2>📅 งานวันนี้</h2>
            </div>
            <div className="task-list">
              {todayTasks.map(task => (
                <div key={task.id} className={`task-card ${task.status}`}>
                  <div className="task-time">{task.time}</div>
                  <div className="task-detail">
                    <h4>{task.petName}</h4>
                    <p>{task.task}</p>
                  </div>
                  <div className="task-status">
                    {task.status === 'completed' ? '✅ เสร็จแล้ว' : 
                     task.status === 'in-progress' ? '⏳ กำลังทำ' : 'รอเริ่ม'}
                  </div>
                  {task.status !== 'completed' && (
                     <Link to="/partner/reports" className="btn-quick-report">📷 ส่งรูป</Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboard;