import { Layout } from '../components/layout/Layout';

export const Withdraw = () => {
  const isMobile = window.innerWidth < 640;

  return (
    <Layout>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)'
      }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: isMobile ? '32px 24px' : '48px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '100%'
          }}
        >
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
            💰
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: '700',
              color: '#2C2E2F',
              marginBottom: '16px'
            }}
          >
            Withdrawal Coming Soon!
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#6C757D',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}
          >
            We're working hard to bring you the ability to withdraw your funds directly to your bank account.
          </p>

          {/* Feature List */}
          <div
            style={{
              backgroundColor: '#F5F7FA',
              borderRadius: '12px',
              padding: isMobile ? '20px' : '24px',
              marginBottom: '32px',
              textAlign: 'left'
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: '#2C2E2F',
                marginBottom: '16px'
              }}
            >
              What's Coming:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Direct bank transfers',
                'Multiple currency withdrawals',
                'Fast processing (1-2 business days)',
                'Low transaction fees',
                'Secure & encrypted transactions'
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#2C2E2F' }}>{feature}</span>
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
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px'
            }}
          >
            🚀 Launching Soon
          </div>

          {/* Message */}
          <p
            style={{
              fontSize: '14px',
              color: '#6C757D',
              marginBottom: '8px'
            }}
          >
            Stay tuned for updates!
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#0070BA',
              fontWeight: '600',
              margin: 0
            }}
          >
            See you soon! 👋
          </p>
        </div>
      </div>
    </Layout>
  );
};