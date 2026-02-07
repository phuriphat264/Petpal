import React, { useState } from 'react';
import PartnerSidebar from '../component/PartnerSidebar';
import '../css/Partner.css';

const PartnerReports: React.FC = () => {
  // Mock Data: สัตว์เลี้ยงที่อยู่ในการดูแลตอนนี้
  const activeJobs = [
    { id: 201, petName: "Lucky", type: "Walking", owner: "คุณสมชาย" },
    { id: 203, petName: "Luna", type: "Boarding", owner: "คุณเจน" }
  ];

  const [selectedJob, setSelectedJob] = useState(activeJobs[0].id);
  const [reportText, setReportText] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Toggle Tags (เช่น กินข้าวหมด, ขับถ่ายปกติ)
  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    const job = activeJobs.find(j => j.id === selectedJob);
    alert(`✅ ส่งรายงานของน้อง "${job?.petName}" เรียบร้อย!\n\nข้อความ: ${reportText}\nTags: ${tags.join(", ")}`);
    // Reset Form
    setReportText("");
    setTags([]);
  };

  return (
    <div className="partner-layout">
      <PartnerSidebar />

      <main className="partner-content">
        <header className="content-header">
          <h1>📝 ส่งรายงานประจำวัน</h1>
        </header>

        <div className="report-container">
          {/* ฝั่งซ้าย: เลือกงาน */}
          <div className="job-selector">
            <h3>เลือกสัตว์เลี้ยง</h3>
            {activeJobs.map(job => (
              <div 
                key={job.id} 
                className={`job-card-mini ${selectedJob === job.id ? 'active' : ''}`}
                onClick={() => setSelectedJob(job.id)}
              >
                <div className="job-icon">🐾</div>
                <div>
                  <h4>{job.petName}</h4>
                  <span>{job.type} • {job.owner}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ฝั่งขวา: ฟอร์มรายงาน */}
          <div className="report-form-card">
            <h3>อัปเดตอาการน้อง {activeJobs.find(j => j.id === selectedJob)?.petName}</h3>
            
            <form onSubmit={handleSendReport}>
              <div className="form-section">
                <label>📸 อัปโหลดรูปภาพ/วิดีโอ</label>
                <div className="upload-box">
                  <span>คลิกเพื่อเพิ่มรูปภาพ</span>
                </div>
              </div>

              <div className="form-section">
                <label>📌 สรุปกิจวัตร (เลือกได้มากกว่า 1)</label>
                <div className="tags-group">
                  {['กินข้าวหมดเกลี้ยง 🍖', 'ขับถ่ายปกติ 💩', 'ร่าเริงสุดๆ 😆', 'นอนหลับปุ๋ย 💤', 'ทานยาแล้ว 💊'].map(tag => (
                    <button 
                      key={tag} 
                      type="button" 
                      className={`tag-btn ${tags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label>📝 บันทึกเพิ่มเติมถึงเจ้าของ</label>
                <textarea 
                  rows={4} 
                  placeholder="เล่าเรื่องราวน่ารักๆ วันนี้..."
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-send-report">🚀 ส่งรายงาน</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerReports;