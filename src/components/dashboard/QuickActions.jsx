import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';


export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Send Money',
      description: 'Transfer to another user',
      icon: <SendIcon fontSize="large" />,
      color: '#0070BA',
      onClick: () => navigate('/send')
    },
    {
      title: 'View Transactions',
      description: 'See your transaction history',
      icon: <ReceiptLongIcon fontSize="large" />,
      color: '#28A745',
      onClick: () => navigate('/transactions')
    },
    {
      title: 'Profile',
      description: 'Manage your account',
      icon: <PersonIcon fontSize="large" />,
      color: '#6C757D',
      onClick: () => navigate('/profile')
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#2C2E2F', marginBottom: '20px' }}>
        Quick Actions
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            style={{
              backgroundColor: '#F5F7FA',
              border: 'none',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = action.color;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              const title = e.currentTarget.querySelector('h3');
              const desc = e.currentTarget.querySelector('p');
              if (title) title.style.color = '#FFFFFF';
              if (desc) desc.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F7FA';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              const title = e.currentTarget.querySelector('h3');
              const desc = e.currentTarget.querySelector('p');
              if (title) title.style.color = '#2C2E2F';
              if (desc) desc.style.color = '#6C757D';
            }}
          >
            <span style={{ fontSize: '32px' }}>{action.icon}</span>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2C2E2F', margin: 0, transition: 'color 0.2s' }}>
              {action.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#6C757D', margin: 0, transition: 'color 0.2s' }}>
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};