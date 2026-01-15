import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';


export const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon fontSize="large" /> },
    { path: '/send', label: 'Send Money', icon: <SendIcon fontSize="large" /> },
    { path: '/transactions', label: 'Transactions', icon: <ReceiptLongIcon fontSize="large" /> },
    { path: '/profile', label: 'Profile', icon: <PersonIcon fontSize="large" /> }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };

  return (
    <aside
      style={{
        width: '250px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        minHeight: 'calc(100vh - 64px)',
        padding: '24px 0',
        overflowY: 'auto'
      }}
    >
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            style={{
              width: '100%',
              padding: '12px 24px',
              textAlign: 'left',
              border: 'none',
              backgroundColor: isActive(item.path) ? '#E6F4FF' : 'transparent',
              borderLeft: isActive(item.path) ? '3px solid #0070BA' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: isActive(item.path) ? '600' : '400',
              color: isActive(item.path) ? '#0070BA' : '#2C2E2F',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.target.style.backgroundColor = '#F5F7FA';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};