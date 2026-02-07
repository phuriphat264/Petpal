import React from 'react';
import catImage from './assets/cat.jpg'; // ตรวจสอบ path รูปให้ถูกนะครับ
import './css/App.css';
const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content hero-animate">
          <div className="badge">✨ ดูแลสัตว์เลี้ยงครบวงจร อันดับ 1 ในจันทบุรี</div>
          <h1 className="hero-title">
            ฝาก "ลูกรัก" ไว้กับ<br />
            <span className="highlight-text">พาร์ทเนอร์ที่รู้ใจ</span>
          </h1>
          <p className="hero-subtitle">
            อุ่นใจทุกครั้งที่ต้องห่างบ้าน ด้วยระบบจับคู่พี่เลี้ยงที่ผ่านการคัดกรอง 
            พร้อม Live Cam ดูน้องๆ ได้ตลอด 24 ชม.
          </p>
          <div className="cta-group">
            <button className="btn-main">🔍 ค้นหาที่พักใกล้คุณ</button>
            <button className="btn-secondary">▶ ดูวิดีโอแนะนำ</button>
          </div>
        </div>
        
        <div className="hero-image-container float-img">
           <img src={catImage} alt="Happy Dog" className="hero-img" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">ทำไมต้องเลือก PetPal?</h2>
        </div>
        <div className="feature-grid">
           {/* ใส่ Card เดิมของคุณตรงนี้ หรือจะ copy มาวางก็ได้ครับ */}
           <div className="feature-card">
              <div className="feature-icon-box" style={{backgroundColor: '#E3F2FD'}}>🛡️</div>
              <h3>Verified Partners</h3>
              <p>พาร์ทเนอร์ทุกคนผ่านการยืนยันตัวตน 100%</p>
           </div>
           <div className="feature-card">
              <div className="feature-icon-box" style={{backgroundColor: '#E8F5E9'}}>🎥</div>
              <h3>Real-time Live Cam</h3>
              <p>ดูน้องผ่านกล้องได้ตลอด 24 ชม.</p>
           </div>
        </div>
      </section>
    </>
  );
};

export default Home;