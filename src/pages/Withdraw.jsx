import { useState } from 'react';
import { WithdrawModal } from '../components/common/WithdrawModal';

export const Withdraw = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        <h1 style={{ marginBottom: '16px', fontSize: '28px', color: '#1F2937' }}>
          Withdraw Funds
        </h1>
        <p style={{ marginBottom: '24px', color: '#4B5563', lineHeight: 1.7 }}>
          Use the withdraw modal below to move funds to your bank account. This is a dedicated withdraw page for your application.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '14px 24px',
            backgroundColor: '#0070BA',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Open Withdraw Modal
        </button>
      </div>

      <WithdrawModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
