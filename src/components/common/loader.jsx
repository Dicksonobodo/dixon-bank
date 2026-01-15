export const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const dimensions = size === 'small' ? '24px' : size === 'large' ? '64px' : '48px';
  const borderWidth = size === 'small' ? '2px' : size === 'large' ? '4px' : '3px';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
      <div
        style={{
          width: dimensions,
          height: dimensions,
          border: `${borderWidth} solid #E6F4FF`,
          borderTop: `${borderWidth} solid #0070BA`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {text && (
        <p style={{ marginTop: '16px', color: '#6C757D', fontSize: '14px' }}>
          {text}
        </p>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};