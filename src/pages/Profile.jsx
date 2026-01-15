import { useAuth } from '../hooks/useAuth';
import { useBalance } from '../hooks/useBalance';
import { Layout } from '../components/layout/Layout';
import { formatAccountNumber, formatDate } from '../utils/formatters';
import { CURRENCIES } from '../utils/constants';

export const Profile = () => {
  const { userData } = useAuth();
  const { balance, defaultCurrency } = useBalance();

  if (!userData) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
          <p style={{ color: '#6C757D', fontSize: '16px' }}>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#2C2E2F', marginBottom: '8px' }}>
            Profile
          </h1>
          <p style={{ color: '#6C757D', fontSize: '14px' }}>
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '24px'
          }}
        >
          {/* Avatar & Basic Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: '#0070BA',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: '700'
              }}
            >
              {userData.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2C2E2F', margin: '0 0 8px 0' }}>
                {userData.displayName}
              </h2>
              <p style={{ fontSize: '14px', color: '#6C757D', margin: '0 0 4px 0' }}>
                @{userData.username}
              </p>
              {userData.isAdmin && (
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    backgroundColor: '#0070BA',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    marginTop: '4px'
                  }}
                >
                  ADMIN
                </span>
              )}
            </div>
          </div>

          {/* Account Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 6px 0', fontWeight: '500' }}>
                Email Address
              </p>
              <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0 }}>
                {userData.email}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 6px 0', fontWeight: '500' }}>
                Account Number
              </p>
              <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0, fontFamily: 'monospace' }}>
                {formatAccountNumber(userData.accountNumber)}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 6px 0', fontWeight: '500' }}>
                Username
              </p>
              <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0 }}>
                @{userData.username}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 6px 0', fontWeight: '500' }}>
                Default Currency
              </p>
              <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0 }}>
                {defaultCurrency}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 6px 0', fontWeight: '500' }}>
                Member Since
              </p>
              <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0 }}>
                {formatDate(userData.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Balance Overview */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C2E2F', marginBottom: '20px' }}>
            Balance Overview
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {CURRENCIES.map((currency) => (
              <div
                key={currency}
                style={{
                  padding: '20px',
                  backgroundColor: currency === defaultCurrency ? '#E6F4FF' : '#F5F7FA',
                  borderRadius: '8px',
                  border: currency === defaultCurrency ? '2px solid #0070BA' : '2px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6C757D', fontWeight: '500' }}>
                    {currency}
                  </span>
                  {currency === defaultCurrency && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        color: '#0070BA',
                        backgroundColor: '#FFFFFF',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      DEFAULT
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#2C2E2F', margin: 0 }}>
                  {currency === 'USD' && '$'}
                  {currency === 'GBP' && '£'}
                  {currency === 'EUR' && '€'}
                  {(balance[currency] || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};