import React from 'react';
import { Link } from 'react-router-dom';
import './css/Articles.css'
const Articles: React.FC = () => {
  // ข้อมูลจำลองบทความ (Mock Data)
  const articles = [
    {
      id: 1,
      title: "5 วิธีคลายร้อนให้น้องหมา ในวันที่อากาศเดือด!",
      category: "สุขภาพ",
      date: "10 เม.ย. 2024",
      excerpt: "อากาศร้อนแบบนี้ อันตรายต่อสุนัขมาก มาดูวิธีง่ายๆ ที่ช่วยลดอุณหภูมิร่างกายให้น้องหมา ป้องกัน Heat Stroke กันเถอะ...",
      image: "https://images.unsplash.com/photo-1558350194-9111d4a8523b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "มือใหม่หัดเลี้ยงแมว ต้องเตรียมตัวอย่างไร?",
      category: "มือใหม่",
      date: "5 เม.ย. 2024",
      excerpt: "กำลังจะเป็นทาสแมวเต็มตัวใช่ไหม? เช็คลิสต์อุปกรณ์ที่ต้องมี และการเตรียมบ้านให้พร้อมต้อนรับเจ้านายคนใหม่",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "อาหารที่ 'ห้าม' ให้สัตว์เลี้ยงกินเด็ดขาด",
      category: "โภชนาการ",
      date: "2 เม.ย. 2024",
      excerpt: "ช็อกโกแลต องุ่น และอีกหลายอย่างที่คนกินได้ แต่เป็นยาพิษสำหรับสัตว์เลี้ยง มาดูกันว่ามีอะไรบ้างที่ต้องระวัง",
      image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "ทำไมแมวชอบนอนกล่อง? ไขปริศนาพฤติกรรมเหมียว",
      category: "พฤติกรรม",
      date: "28 มี.ค. 2024",
      excerpt: "ซื้อคอนโดแมวเป็นหมื่น ไม่นอน! แต่ไปนอนกล่องพัสดุเก่าๆ นักวิทยาศาสตร์มีคำตอบเรื่องนี้...",
      image: "https://images.unsplash.com/photo-1586289883499-f11d28aaf52f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "วิธีฝึกน้องหมาให้ขับถ่ายเป็นที่ ภายใน 7 วัน",
      category: "การฝึก",
      date: "20 มี.ค. 2024",
      excerpt: "หมดปัญหากลิ่นกวนใจ ด้วยเทคนิค Positive Reinforcement ที่จะทำให้น้องหมาจำได้แม่นและทำตามอย่างมีความสุข",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "วัคซีนประจำปี ที่สัตว์เลี้ยงต้องฉีด มีอะไรบ้าง?",
      category: "สุขภาพ",
      date: "15 มี.ค. 2024",
      excerpt: "ตารางวัคซีนสุนัขและแมวที่เจ้าของควรรู้ เพื่อสร้างภูมิคุ้มกันโรคติดต่อร้ายแรง ให้เขาอยู่กับเราไปนานๆ",
      image: "https://images.unsplash.com/photo-1628009368231-76033527212e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="articles-page">
      {/* Header Section */}
      <div className="articles-header">
        <h1>📚 คลังความรู้เพื่อคนรักสัตว์</h1>
        <p>รวบรวมเทคนิค การดูแลสุขภาพ และเรื่องราวน่ารักๆ ของเพื่อนซี้สี่ขา</p>
      </div>

      {/* Featured / Filter Tabs (Optional UI) */}
      <div className="category-tabs">
        <button className="tab-btn active">ทั้งหมด</button>
        <button className="tab-btn">สุขภาพ</button>
        <button className="tab-btn">โภชนาการ</button>
        <button className="tab-btn">พฤติกรรม</button>
        <button className="tab-btn">รีวิวสินค้า</button>
      </div>

      {/* Grid บทความ */}
      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            <div className="card-image-wrapper">
              <img src={article.image} alt={article.title} />
              <span className="category-tag">{article.category}</span>
            </div>
            
            <div className="card-content">
              <div className="card-meta">
                <span className="date-icon">📅 {article.date}</span>
              </div>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              
              <Link to="#" className="read-more-link">
                อ่านต่อ ➝
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {/* Footer เล็กๆ สำหรับหน้านี้ */}
      <div className="articles-footer-cta">
         <h3>อยากได้เคล็ดลับดีๆ ส่งตรงถึงอีเมลไหม?</h3>
         <div className="subscribe-box">
             <input type="email" placeholder="กรอกอีเมลของคุณ..." />
             <button>ติดตามข่าวสาร</button>
         </div>
      </div>
    </div>
  );
};

export default Articles;