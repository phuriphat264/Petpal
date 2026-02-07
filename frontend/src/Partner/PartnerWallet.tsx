import React from 'react';
import PartnerSidebar from '../component/PartnerSidebar';
import '../css/Partner.css';

const PartnerWallet: React.FC = () => {
  // Mock Transaction History
  const transactions = [
    { id: 1, date: "12 มี.ค. 2024", desc: "ค่าบริการ - น้องถุงทอง (Boarding)", amount: 1050, type: "income", status: "completed" },
    { id: 2, date: "11 มี.ค. 2024", desc: "ค่าบริการ - Mochi (Grooming)", amount: 400, type: "income", status: "completed" },
    { id: 3, date: "10 มี.ค. 2024", desc: "ถอนเงินเข้าบัญชี (x-1234)", amount: -2000, type: "withdraw", status: "completed" },
    { id: 4, date: "09 มี.ค. 2024", desc: "ค่าบริการ - Lucky (Walking)", amount: 150, type: "income", status: "pending" },
  ];

  return (
    <div className="partner-layout">
      <PartnerSidebar />

      <main className="partner-content">
        <header className="content-header">
          <h1>💰 กระเป๋าเงินพาร์ทเนอร์</h1>
          <button className="btn-withdraw" onClick={() => alert('ระบบกำลังโอนเงินเข้าบัญชีของคุณภายใน 24 ชม.')}>
             🏦 ถอนเงินเข้าบัญชี
          </button>
        </header>

        {/* Wallet Cards Highlight */}
        <div className="wallet-overview">
          <div className="wallet-card main-balance">
            <h3>ยอดเงินที่ถอนได้</h3>
            <div className="balance-amount">฿12,500.00</div>
            <p>รายได้สุทธิหลังหักค่าธรรมเนียม</p>
          </div>

          <div className="wallet-card pending-balance">
             <h3>ยอดเงินรอดำเนินการ</h3>
             <div className="balance-amount">฿150.00</div>
             <p>จะเข้ากระเป๋าเมื่อจบงาน</p>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="transaction-section">
          <h3>📜 ประวัติรายการล่าสุด</h3>
          <div className="table-responsive">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>รายการ</th>
                  <th>สถานะ</th>
                  <th style={{textAlign: 'right'}}>จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td>{tx.desc}</td>
                    <td>
                      <span className={`status-badge ${tx.status}`}>
                        {tx.status === 'completed' ? 'สำเร็จ' : 'รอตรวจสอบ'}
                      </span>
                    </td>
                    <td className={`amount ${tx.type}`} style={{textAlign: 'right'}}>
                      {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default PartnerWallet;