import { Modal } from './Modal';

export const WithdrawModal = ({ isOpen, onClose }) => {
  const isMobile = window.innerWidth < 640;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="600px">
      <div style={{ padding: '8px 0', textAlign: 'center' }}>
        {/* Icon */}
        <div
          style={{
            width: isMobile ? '80px' : '100px',
            height: isMobile ? '80px' : '100px',
            backgroundColor: '#E6F4FF',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '40px' : '50px',
            marginBottom: '24px'
          }}
        >
            <h1>Rachele Martinello</h1>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '700',
            color: '#2C2E2F',
            marginBottom: '12px'
          }}
        >
          Transactional charges/ international stamp duty fee!
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6C757D',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}
        >
          kindly make a payment of the required payment on time in order to proceede with your withdrawal.
        </p>

        {/* Feature List */}
        <div
          style={{
            backgroundColor: '#F5F7FA',
            borderRadius: '12px',
            padding: isMobile ? '16px' : '20px',
            marginBottom: '24px',
            textAlign: 'left'
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#2C2E2F',
              marginBottom: '12px'
            }}
          >
            Payments to be made:
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Transactional charges: $300',
              'International stamp duty: $220',
              'Total withdrawal fee: $520'
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '18px', color: '#28A745', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '13px', color: '#2C2E2F', lineHeight: '1.5' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#0070BA',
            color: '#FFFFFF',
            padding: '10px 28px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px'
          }}
        >
          we await your payment to proceede with your withdrawal
        </div>

        {/* Message */}
        <p
          style={{
            fontSize: '13px',
            color: '#6C757D',
            marginBottom: '6px'
          }}
        >
    
        </p>
        <p
          style={{
            fontSize: '14px',
            color: '#0070BA',
            fontWeight: '600',
            margin: 0
          }}
        >
          See you soon! 
        </p>
      </div>
    </Modal>
  );
};