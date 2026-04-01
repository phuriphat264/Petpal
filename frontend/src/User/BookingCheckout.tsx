import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/App.css';
import '../css/BookingCheckout.css'; 
import promptPayLogo from '../assets/PromptPay.png';

const BookingCheckout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sitter = location.state?.sitter; 

  // States
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'creditcard'>('promptpay');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [slipImage, setSlipImage] = useState<string | null>(null);

  if (!sitter) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>❌ ไม่พบข้อมูลการจอง</h2>
        <button onClick={() => navigate('/services')} className="btn-main-small">กลับไปหน้าบริการ</button>
      </div>
    );
  }

  const totalPrice = sitter.price + 20;

  // ฟังก์ชันจัดการเลือกรูปสลิป
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSlipImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // ฟังก์ชันกดยืนยันชำระเงิน
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      alert(`🎉 ชำระเงินสำเร็จ! ขอบคุณที่ไว้วางใจ ${sitter.name}`);
      navigate('/MyBookings'); 
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="checkout-wrapper">
        <div className="checkout-header">
          <button className="back-btn-circle" onClick={() => navigate(-1)}>❮</button>
          <div>
            <h2 className="checkout-title">ยืนยันการจองและชำระเงิน</h2>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            <div className="checkout-card">
              <h3 className="card-h3">📝 รายละเอียดการฝาก</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>📅 วันที่เช็คอิน</label>
                  <input type="date" className="input-styled" />
                </div>
                <div className="form-group">
                  <label>📅 วันที่เช็คเอาท์</label>
                  <input type="date" className="input-styled" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>🐾 เลือกสัตว์เลี้ยง</label>
                <select className="input-styled">
                  <option>น้องถุงทอง (แมว)</option>
                  <option>น้องเจ้าดื้อ (สุนัข)</option>
                </select>
              </div>
            </div>

            <div className="checkout-card">
              <h3 className="card-h3">💳 เลือกช่องทางการชำระเงิน</h3>
              <div className="payment-list">
                <label className={`pay-item ${paymentMethod === 'promptpay' ? 'active' : ''}`}>
                  <input type="radio" name="pay" checked={paymentMethod === 'promptpay'} onChange={()=>setPaymentMethod('promptpay')} />
                  <div className="pay-text">
                    <strong>PromptPay (QR Code)</strong>
                    <span>สแกนจ่ายผ่านแอปธนาคาร ฟรีค่าธรรมเนียม</span>
                  </div>
                  <span className="pay-icon">📱</span>
                </label>
                <label className={`pay-item ${paymentMethod === 'creditcard' ? 'active' : ''}`}>
                  <input type="radio" name="pay" checked={paymentMethod === 'creditcard'} onChange={()=>setPaymentMethod('creditcard')} />
                  <div className="pay-text">
                    <strong>บัตรเครดิต / เดบิต</strong>
                    <span>Visa, Mastercard, JCB</span>
                  </div>
                  <span className="pay-icon">💳</span>
                </label>
              </div>
            </div>
          </div>

          <div className="checkout-side">
            <div className="summary-card-modern sticky">
              <h3>สรุปยอดชำระ</h3>
              <div className="summary-sitter">
                <img src={sitter.images[0]} alt="" />
                <div>
                  <h4>{sitter.name}</h4>
                  <p>📍 {sitter.location || 'จันทบุรี'}</p>
                </div>
              </div>
              <div className="summary-divider"></div>
              <div className="price-list">
                <div className="price-item"><span>ราคาค่าบริการ</span><span>฿{sitter.price}</span></div>
                <div className="price-item"><span>ค่าธรรมเนียมแพลตฟอร์ม</span><span>฿20</span></div>
                <div className="price-total"><span>ยอดชำระสุทธิ</span><span>฿{totalPrice}</span></div>
              </div>
              <button className="btn-pay-now" onClick={() => setShowPaymentModal(true)}>
                ดำเนินการชำระเงิน ฿{totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ชำระเงิน ================= */}
      {showPaymentModal && (
        <div className="p-modal-overlay">
          <div className="p-modal-content">
            <button className="p-modal-close" onClick={() => setShowPaymentModal(false)}>✕</button>
            
            {paymentMethod === 'promptpay' ? (
              <div className="qr-checkout-view">
                <img src={promptPayLogo} className="pp-logo" alt="PromptPay" />
                
                <div className="qr-main-box">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PETPAL_PAYMENT_${totalPrice}`} alt="QR" />
                </div>

                <div className="qr-total-label">
                  ยอดชำระ: <strong>฿{totalPrice}</strong>
                </div>

                <div className="slip-upload-area">
                  <label className="slip-label">📸 แนบสลิปเพื่อยืนยันการโอนเงิน</label>
                  <div className={`slip-dropzone ${slipImage ? 'has-image' : ''}`}>
                    <input type="file" accept="image/*" id="slip-input" onChange={handleFileChange} hidden />
                    <label htmlFor="slip-input" className="slip-preview-label">
                      {slipImage ? (
                        <img src={slipImage} alt="Slip Preview" className="slip-preview-img" />
                      ) : (
                        <div className="upload-placeholder">
                          <span>➕ คลิกเพื่อเลือกรูปสลิป</span>
                        </div>
                      )}
                    </label>
                  </div>
                  {slipImage && <button className="btn-remove-slip" onClick={() => setSlipImage(null)}>เปลี่ยนรูปสลิป</button>}
                </div>

                <button 
                  className="btn-submit-booking" 
                  disabled={!slipImage || isProcessing}
                  onClick={handleConfirmPayment}
                >
                  <span className="check-icon-box">✅</span> {isProcessing ? '⏳ กำลังส่งหลักฐาน...' : 'ยืนยันการชำระเงิน'}
                </button>
              </div>
            ) : (
              <div className="cc-checkout-view">
                <h3>💳 ชำระผ่านบัตรเครดิต</h3>
                <div className="cc-inputs">
                  <input type="text" placeholder="หมายเลขบัตร" className="input-styled" />
                  <input type="text" placeholder="ชื่อผู้ถือบัตร" className="input-styled" />
                  <div className="form-grid-2">
                    <input type="text" placeholder="ดด/ปป" className="input-styled" />
                    <input type="text" placeholder="CVV" className="input-styled" />
                  </div>
                </div>
                <button className="btn-submit-booking" style={{marginTop: '20px'}} onClick={handleConfirmPayment}>
                   ชำระเงิน ฿{totalPrice}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCheckout;