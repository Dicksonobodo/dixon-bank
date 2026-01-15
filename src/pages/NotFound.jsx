import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F7FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div
          style={{
            fontSize: '120px',
            fontWeight: '700',
            color: '#0070BA',
            marginBottom: '24px',
            lineHeight: 1
          }}
        >
          404
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#2C2E2F', marginBottom: '16px' }}>
          Page Not Found
        </h1>

        <p style={{ fontSize: '16px', color: '#6C757D', marginBottom: '32px', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 32px',
            backgroundColor: '#0070BA',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#005EA6';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#0070BA';
          }}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};