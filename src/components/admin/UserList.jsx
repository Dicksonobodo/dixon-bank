import { formatCurrency, formatAccountNumber } from '../../utils/formatters';

export const UserList = ({ users, onSelectUser }) => {
  if (!users || users.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
        <p style={{ color: '#6C757D', fontSize: '16px', margin: 0 }}>
          No users found
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {users.map((user) => (
        <div
          key={user.uid}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '16px',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onClick={() => onSelectUser(user)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F5F7FA';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: user.isAdmin ? '#0070BA' : '#E5E7EB',
                  color: user.isAdmin ? '#FFFFFF' : '#2C2E2F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '18px'
                }}
              >
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#2C2E2F', margin: 0 }}>
                    {user.displayName}
                  </p>
                  {user.isAdmin && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        backgroundColor: '#0070BA',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      ADMIN
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 2px 0' }}>
                  @{user.username} • {user.email}
                </p>
                <p style={{ fontSize: '12px', color: '#6C757D', margin: 0 }}>
                  {formatAccountNumber(user.accountNumber)}
                </p>
              </div>
            </div>

            {/* Balance Summary */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 4px 0' }}>
                Total Balance
              </p>
              <div style={{ fontSize: '12px', color: '#2C2E2F' }}>
                <div>{formatCurrency(user.balance?.USD || 0, 'USD')}</div>
                <div>{formatCurrency(user.balance?.GBP || 0, 'GBP')}</div>
                <div>{formatCurrency(user.balance?.EUR || 0, 'EUR')}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};