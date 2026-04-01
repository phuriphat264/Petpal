import React, { useState } from 'react';
import './css/Reviews.css'
const Reviews: React.FC = () => {
  // State สำหรับ Filter (ทั้งหมด, สุนัข, แมว)
  const [filter, setFilter] = useState<'all' | 'dog' | 'cat' | 'other'>('all');

  // Mock Data: ข้อมูลรีวิวรวมจากลูกค้า
  const allReviews = [
    {
      id: 1,
      user: "คุณน้ำฝน",
      pet: "น้องมอมแมม (สุนัข)",
      type: "dog",
      rating: 5,
      date: "12 เม.ย. 2024",
      text: "ประทับใจมากค่ะ พี่เลี้ยงดูแลดีมาก ส่งวิดีโอมาให้ดูตลอด น้องกลับมาอารมณ์ดี ไม่ซึมเลย ไว้จะใช้บริการอีกแน่นอนค่ะ",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      user: "Mr. John Smith",
      pet: "Luna (Cat)",
      type: "cat",
      rating: 5,
      date: "10 เม.ย. 2024",
      text: "Great service! Finding a sitter in Chanthaburi was hard until I found PetPal. Highly recommended.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      user: "น้องกานต์",
      pet: "พี่โชค (กระต่าย)",
      type: "other",
      rating: 4,
      date: "05 เม.ย. 2024",
      text: "พี่เลี้ยงใจดีครับ ป้อนหญ้า ป้อนน้ำตรงเวลา แต่เสียดายนิดนึงที่ตอบแชทช้าไปหน่อยตอนกลางคืน โดยรวมโอเคครับ",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 4,
      user: "คุณแม่น้องบิงโก",
      pet: "บิงโก (สุนัข)",
      type: "dog",
      rating: 5,
      date: "01 เม.ย. 2024",
      text: "บ้านพี่เลี้ยงกว้างขวาง สะอาดมากค่ะ มีสนามหญ้าให้บิงโกวิ่งเล่นจนเหนื่อย กลับมาหลับปุ๋ยเลย",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 5,
      user: "Ploy Ch.",
      pet: "Mochi (Cat)",
      type: "cat",
      rating: 5,
      date: "28 มี.ค. 2024",
      text: "ชอบตรงที่มีกล้องวงจรปิดให้ดูค่ะ หายห่วงเวลาไปต่างจังหวัดไกลๆ รู้สึกเหมือนได้อยู่กับน้องตลอดเวลา",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 6,
      user: "คุณเอก",
      pet: "เจ้านิล (สุนัข)",
      type: "dog",
      rating: 5,
      date: "20 มี.ค. 2024",
      text: "ราคาคุ้มค่ามากครับ เทียบกับคุณภาพการดูแล ถือว่าไม่แพงเลย สะดวก รวดเร็ว หาพี่เลี้ยงง่ายมาก",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    }
  ];

  // กรองข้อมูลตามประเภทสัตว์
  const filteredReviews = filter === 'all' 
    ? allReviews 
    : allReviews.filter(r => r.type === filter);

  return (
    <div className="reviews-page">
      
      {/* Header Section */}
      <div className="reviews-header">
        <h1>🌟 เสียงตอบรับจากลูกค้า</h1>
        <p>ความสุขของสัตว์เลี้ยง คือความสำเร็จของเรา</p>
        
        <div className="reviews-stats">
            <div className="stat-box">
                <span className="stat-num">4.9/5</span>
                <span className="stat-label">คะแนนเฉลี่ย</span>
            </div>
            <div className="stat-divider">|</div>
            <div className="stat-box">
                <span className="stat-num">2,500+</span>
                <span className="stat-label">การจองสำเร็จ</span>
            </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>ทั้งหมด</button>
        <button className={`filter-btn ${filter === 'dog' ? 'active' : ''}`} onClick={() => setFilter('dog')}>🐶 สุนัข</button>
        <button className={`filter-btn ${filter === 'cat' ? 'active' : ''}`} onClick={() => setFilter('cat')}>🐱 แมว</button>
        <button className={`filter-btn ${filter === 'other' ? 'active' : ''}`} onClick={() => setFilter('other')}>🐰 อื่นๆ</button>
      </div>

      {/* Reviews Grid */}
      <div className="reviews-grid">
        {filteredReviews.map((item) => (
            <div key={item.id} className="review-card-main">
                <div className="review-card-header">
                    <img src={item.avatar} alt={item.user} className="reviewer-avatar" />
                    <div className="reviewer-info">
                        <h3>{item.user}</h3>
                        <span className="pet-tag">สัตว์เลี้ยง: {item.pet}</span>
                    </div>
                    <div className="star-rating">
                        {'⭐'.repeat(item.rating)}
                    </div>
                </div>
                <div className="review-body">
                    <p>"{item.text}"</p>
                </div>
                <div className="review-footer">
                    <span className="review-date">{item.date}</span>
                </div>
            </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="review-cta">
        <h3>ประทับใจบริการของเราไหม?</h3>
        <p>ร่วมแบ่งปันประสบการณ์ดีๆ เพื่อเป็นข้อมูลให้กับเพื่อนๆ คนรักสัตว์</p>
        <button className="write-review-btn">✍ เขียนรีวิว</button>
      </div>

    </div>
  );
};

export default Reviews;