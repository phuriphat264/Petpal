import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // 1. นำเข้า Router
import './css/App.css';
import catImage from './assets/cat.jpg';
import Services from './pages/Services'; // นำเข้าไฟล์ Services
import MapPage from './pages/MapPage';
import SitterDetails from './pages/SitterDetails';
import Articles from './pages/Articles';
import Reviews from './pages/Reviews';
import ServiceList from './pages/ServiceList';
import Register from './pages/Register';
import Login from './pages/Login';
import PartnerDashboard from './Partner/PartnerDashboard';
import PartnerServices from './Partner/PartnerServices';
import PartnerSidebar from './component/PartnerSidebar';
import PartnerReports from './Partner/PartnerReports';
import PartnerWallet from './Partner/PartnerWallet';
import MyPets from './User/MyPets';
import MyBookings from './User/MyBookings';
import Tracking from './User/Tracking';
import PetDetails from './User/PetDetails';
import AddPet from './User/AddPet';
import LiveCam from './User/LiveCam';
import PetMatcher from './User/PetMatcher';
import HealthRecord from './User/HealthRecord';
import BookingCheckout from './User/BookingCheckout';

// 2. สร้าง Component หน้าแรก (Home) 
// (เอา Hero Section และ Features มาใส่ไว้ในนี้ เพื่อให้เป็นระเบียบ)
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
            พร้อม Live Cam ดูน้องๆ ได้ตลอด 24 ชม. เหมือนอยู่ด้วยกันตลอดเวลา
          </p>
          <div className="cta-group">
            {/* ปุ่มค้นหาที่พัก ก็ลิงก์ไปหน้าบริการได้เหมือนกัน */}
            <Link to="/services">
                <button className="btn-main">🔍 ค้นหาที่พักใกล้คุณ</button>
            </Link>
            <button className="btn-secondary">▶ ดูวิดีโอแนะนำ</button>
          </div>
          <div className="stats-row">
            <div className="stat-item"><strong>500+</strong> พี่เลี้ยง</div>
            <div className="stat-divider"></div>
            <div className="stat-item"><strong>24/7</strong> Support</div>
            <div className="stat-divider"></div>
            <div className="stat-item"><strong>4.9/5</strong> รีวิว</div>
          </div>
        </div>
        
        <div className="hero-image-container float-img">
           <img 
            src={catImage}
            alt="Happy Dog" 
            className="hero-img" 
           />
           <div className="floating-card">
             <span style={{fontSize: '20px'}}>📷</span> Live Status: <strong style={{color: '#4CAF50'}}>Online</strong>
           </div>
        </div>
      </header>

      {/* Features Summary Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">ทำไมต้องเลือก PetPal?</h2>
          <p className="section-subtitle">เราใส่ใจในทุกรายละเอียดเพื่อความสุขของน้องๆ</p>
        </div>
        
        <div className="feature-grid">
          <FeatureCard 
            icon="🛡️" title="Verified Partners" desc="พาร์ทเนอร์ทุกคนผ่านการยืนยันตัวตนและตรวจสอบประวัติอาชญากรรม 100%" color="#E3F2FD"
          />
          <FeatureCard 
            icon="🎥" title="Real-time Live Cam" desc="ดูความเคลื่อนไหวผ่านกล้องวงจรปิดได้ตลอดเวลาผ่านแอปพลิเคชัน" color="#E8F5E9"
          />
          <FeatureCard 
            icon="🏥" title="Vet Support" desc="มีเครือข่ายโรงพยาบาลสัตว์และบริการรถรับ-ส่งฉุกเฉิน 24 ชั่วโมง" color="#FFF3E0"
          />
           <FeatureCard 
            icon="❤️" title="Pet Insurance" desc="คุ้มครองประกันอุบัติเหตุระหว่างการฝากเลี้ยง วงเงินสูงสุด 50,000 บาท" color="#FCE4EC"
          />
        </div>
      </section>
    </>
  );
};

// 3. Component หลัก (App)
const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar (แสดงทุกหน้า) */}
        <nav className="navbar">
          <div className="logo-container">
            <span style={{ fontSize: '32px' }}>🐾</span> 
            {/* กดโลโก้แล้วกลับหน้าแรก */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="logo-text">PetPal</span>
            </Link>
          </div>
 
          <div className="nav-links">
            {/* 💡 เปลี่ยน <a> เป็น <Link> เพื่อให้เปลี่ยนหน้าแบบไม่กระตุก */}
            <Link to="/" className="nav-link">หน้าหลัก</Link>
            <Link to="/services" className="nav-link">บริการ</Link> 
            <Link to="/Reviews" className="nav-link">รีวิว</Link>
            <Link to="/livecam" className="nav-link">กล้อง</Link>
            <Link to="/pet-matcher" className="nav-link">จับคู่</Link>
            <Link to="/MyPets" className="nav-link">สัตว์เลี้ยง</Link>
          </div>

          <div className="auth-buttons">
            <Link to="/Login">
            <button className="btn-register">เข้าสู่ระบบ</button>
            </Link>
            <Link to="/Register">
            <button className="btn-register">สมัครสมาชิก</button>
            </Link>
          </div>
        </nav>

        {/* 🔥 เพิ่ม <main className="main-content"> มาครอบ Routes ตรงนี้ 🔥 */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/MapPage"  element={<MapPage />} />
            <Route path="/sitter/:id" element={<SitterDetails />} />
            <Route path="/Articles" element={<Articles />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/list/:type" element={<ServiceList />} />
            <Route path="/Register" element={<Register />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/PartnerDashboard" element={<PartnerDashboard />}/>
            <Route path="/PartnerServices" element={<PartnerServices />}/>
            <Route path="/PartnerSidebar" element={<PartnerSidebar />}/>
            <Route path="/PartnerReports" element={<PartnerReports />}/>
            <Route path="/PartnerWallet" element={<PartnerWallet />}/>
            <Route path="/MyBookings" element={<MyBookings />}/>
            <Route path="/MyPets" element={<MyPets />}/>
            <Route path="/Tracking" element={<Tracking />}/>
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/AddPet" element={<AddPet />} />
            <Route path="/pet/:id/health" element={<HealthRecord />} />
            <Route path="/livecam" element={<LiveCam />} />
            <Route path="/pet-matcher" element={<PetMatcher />} />  
            <Route path="/checkout" element={<BookingCheckout />} />         
          </Routes>
        </main>
          
        {/* Footer (แสดงทุกหน้า) */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">🐾 PetPal</div>
            <p>© 2026 PetPal Project - Burapha University Chanthaburi Campus</p>
            <div className="footer-links">
               <span className="footer-link">Privacy Policy</span>
               <span className="footer-link">Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

// Component ย่อย: Feature Card
const FeatureCard = ({ icon, title, desc, color }: { icon: string, title: string, desc: string, color: string }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon-box" style={{ backgroundColor: color }}>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  );
};

export default App;