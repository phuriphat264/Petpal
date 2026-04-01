import React, { useState } from 'react';
import '../css/App.css';
import '../css/PetMatcher.css';

const PetMatcher: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setShowResults(false);
    
    // จำลองการใช้เวลาประมวลผลของ AI 2 วินาที
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="section-header" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <h2 className="section-title">✨ AI Pet Matcher</h2>
        <p className="section-subtitle">ให้ AI ช่วยหาที่พักที่ตรงกับ "นิสัย" ของลูกรักคุณมากที่สุด</p>
      </div>

      {!showResults ? (
        <div className="matcher-form-card">
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label>ชนิดสัตว์เลี้ยง</label>
              <select className="input-field">
                <option>สุนัข 🐶</option>
                <option>แมว 🐱</option>
                <option>นก 🦜</option>
              </select>
            </div>

            <div className="form-group">
              <label>ระดับพลังงาน</label>
              <div className="trait-options">
                <label className="trait-btn"><input type="radio" name="energy" /> พลังล้น ชอบวิ่งเล่น ⚡</label>
                <label className="trait-btn"><input type="radio" name="energy" /> ปานกลาง เดินเล่นเบาๆ 🚶</label>
                <label className="trait-btn"><input type="radio" name="energy" /> สายชิล ชอบนอนทั้งวัน 😴</label>
              </div>
            </div>

            <div className="form-group">
              <label>การเข้าสังคม</label>
              <div className="trait-options">
                <label className="trait-btn"><input type="radio" name="social" /> เป็นมิตร รักทุกคน ❤️</label>
                <label className="trait-btn"><input type="radio" name="social" /> ขี้อาย ตกใจง่าย 🥺</label>
                <label className="trait-btn"><input type="radio" name="social" /> โลกส่วนตัวสูง หวงถิ่น 🛡️</label>
              </div>
            </div>

            <button type="submit" className="btn-main submit-btn" disabled={isSearching}>
              {isSearching ? '🤖 AI กำลังประมวลผล...' : '🔍 ค้นหาที่พักที่ใช่เลย!'}
            </button>
          </form>
        </div>
      ) : (
        <div className="results-container">
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a1a24' }}>
            🎉 2 ที่พักที่เหมาะกับน้องมากที่สุด
          </h3>
          <div className="service-grid">
            {/* อิงดีไซน์การ์ดจากหน้า Services ของคุณ */}
            <div className="service-card">
              <div className="card-top-beige">
                <span style={{ fontSize: '50px' }}>🏡</span>
              </div>
              <div className="card-content">
                <h4>บ้านป้าใจดี โฮมสเตย์</h4>
                <p>มีสนามหญ้ากว้างขวาง เหมาะสำหรับสุนัขพลังล้น ไม่มีกรงขัง วิ่งเล่นได้เต็มที่</p>
                <div className="price-badge">เริ่มต้น 450฿ / คืน</div>
                <div className="ai-match-score">Match: 98% ✨</div>
                <button className="btn-outline">ดูรายละเอียด</button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-top-beige">
                <span style={{ fontSize: '50px' }}>🏕️</span>
              </div>
              <div className="card-content">
                <h4>Doggo Camp & Care</h4>
                <p>มีพี่เลี้ยงประกบตัวต่อตัว พาออกกำลังกายเช้า-เย็น เหมาะกับสายกิจกรรม</p>
                <div className="price-badge">เริ่มต้น 500฿ / คืน</div>
                <div className="ai-match-score">Match: 92% ✨</div>
                <button className="btn-outline">ดูรายละเอียด</button>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
             <button className="btn-secondary" onClick={() => setShowResults(false)}>ค้นหาใหม่</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetMatcher;