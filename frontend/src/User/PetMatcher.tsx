import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. นำเข้า useNavigate
import '../css/App.css';
import '../css/PetMatcher.css';

const tagsList = [
  { id: '1', icon: '🎾', label: 'ขี้เล่น' },
  { id: '2', icon: '🌊', label: 'ชอบน้ำ' },
  { id: '3', icon: '🌙', label: 'เงียบๆ' },
  { id: '4', icon: '🛋️', label: 'ชอบนอน' },
  { id: '5', icon: '⚡', label: 'กระฉับกระเฉง' },
  { id: '6', icon: '🤝', label: 'เป็นมิตร' },
  { id: '7', icon: '🌲', label: 'ชอบธรรมชาติ' },
  { id: '8', icon: '🏥', label: 'ต้องการดูแลพิเศษ' },
  { id: '9', icon: '🐾', label: 'ชอบเพื่อนใหม่' },
  { id: '10', icon: '🫣', label: 'ขี้อาย' },
];

const PetMatcher: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false); // 2. State สำหรับทำปุ่มโหลด
  
  const navigate = useNavigate(); // 3. เรียกใช้งาน navigate

  const toggleTag = (id: string) => {
    setSelectedTags(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id]
    );
  };

  // 4. ฟังก์ชันจำลองการค้นหาและเปลี่ยนหน้า
  const handleMatchSearch = () => {
    setIsSearching(true);
    // หน่วงเวลา 1.5 วินาทีให้ความรู้สึกเหมือน AI กำลังคิด แล้วค่อยเปลี่ยนหน้าไป /list/match
    setTimeout(() => {
      navigate('/list/match'); 
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="matcher-wrapper">
        
        <div className="matcher-header">
          <h2>หาที่พักให้น้อง</h2>
          <p>เลือกนิสัยของน้อง แล้วเราจะหาโรงแรมที่ใช่ใกล้คุณ</p>
        </div>

        {/* AI Smart Match Card */}
        <div className="ai-smart-card">
          <div className="ai-card-title">✨ AI Smart Match</div>
          <textarea 
            className="ai-textarea"
            placeholder='เช่น "น้องแก่แล้วชอบนอนเงียบๆ แต่อยากให้มีสนามฝนเล็บและพี่เลี้ยงดูแลใกล้ชิด..."'
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={isSearching}
          ></textarea>
          <button 
            className="btn-ai-submit" 
            onClick={handleMatchSearch}
            disabled={isSearching || aiPrompt.trim() === ''} // ปิดปุ่มถ้าไม่ได้พิมพ์หรือกำลังโหลด
            style={{ opacity: isSearching || aiPrompt.trim() === '' ? 0.7 : 1 }}
          >
            {isSearching ? '🤖 AI กำลังประมวลผล...' : '✨ ปล่อยให้ AI จัดการให้'}
          </button>
        </div>

        {/* Divider */}
        <div className="divider-container">
          <hr className="divider-line" />
          <span className="divider-text">หรือ ค้นหาด่วนด้วยแท็ก</span>
          <hr className="divider-line" />
        </div>

        {/* Tags Section */}
        <div className="tags-container">
          {tagsList.map(tag => (
            <button 
              key={tag.id}
              className={`tag-pill ${selectedTags.includes(tag.id) ? 'active' : ''}`}
              onClick={() => toggleTag(tag.id)}
              disabled={isSearching}
            >
              <span className="tag-icon">{tag.icon}</span> {tag.label}
            </button>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="bottom-action">
          <button 
            className={`btn-search-tags ${selectedTags.length > 0 ? 'active' : ''}`}
            disabled={selectedTags.length === 0 || isSearching}
            onClick={handleMatchSearch}
          >
            {isSearching 
              ? '⏳ กำลังค้นหา...' 
              : `🔍 ${selectedTags.length > 0 ? `ค้นหาด้วย ${selectedTags.length} แท็ก` : 'เลือกนิสัยก่อนนะ'}`
            }
          </button>
        </div>

      </div>
    </div>
  );
};

export default PetMatcher;