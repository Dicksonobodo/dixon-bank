import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F7FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '24px'
      }}
    >
      {/* Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '1000px', 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: '0', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
      }}>
        
        {/* Left Side - Branding */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0070BA',
            padding: isMobile ? '32px 24px' : '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}
        >
          <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
            <div
              style={{
                width: isMobile ? '48px' : '64px',
                height: isMobile ? '48px' : '64px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '24px' : '32px',
                fontWeight: '700',
                color: '#0070BA',
                marginBottom: '24px'
              }}
            >
              $
            </div>
            <h1 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: '700', margin: '0 0 16px 0' }}>
              PayBank
            </h1>
            <p style={{ fontSize: isMobile ? '14px' : '18px', opacity: 0.9, lineHeight: '1.6', margin: 0 }}>
              Your trusted digital banking solution. Send money, track transactions, and manage your finances with ease.
            </p>
          </div>

          {!isMobile && (
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ fontSize: '24px' }}>✓</div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Instant Transfers
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                      Send money to anyone instantly with just their email or username
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ fontSize: '24px' }}>✓</div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Multi-Currency Support
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                      Hold and transfer in USD, GBP, and EUR with real-time conversion
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ fontSize: '24px' }}>✓</div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Secure & Reliable
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                      Your transactions are protected with enterprise-grade security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Auth Form */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? '24px' : '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {isSignIn ? (
            <SignIn onSuccess={handleSuccess} onToggle={toggleMode} />
          ) : (
            <SignUp onSuccess={handleSuccess} onToggle={toggleMode} />
          )}
        </div>
      </div>
    </div>
  );
};