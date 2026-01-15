import { useBalance } from '../../hooks/useBalance';
import { CURRENCIES, CURRENCY_SYMBOLS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const BalanceCard = () => {
  const { balance, defaultCurrency } = useBalance();

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
        Account Balance
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {CURRENCIES.map((currency) => (
          <div
            key={currency}
            style={{
              padding: '16px',
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
              {formatCurrency(balance[currency] || 0, currency)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};