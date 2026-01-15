import { useState } from 'react';
import { updateUserBalance } from '../../services/userService';
import { CURRENCIES } from '../../utils/constants';
import { formatCurrency, formatAccountNumber } from '../../utils/formatters';
import { Modal } from '../common/Modal';

export const AddBalance = ({ user, isOpen, onClose, onSuccess }) => {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const amountNum = parseFloat(amount);

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    const { success, error: updateError } = await updateUserBalance(
      user.uid,
      currency,
      amountNum
    );

    if (updateError) {
      setError(updateError);
      setLoading(false);
    } else if (success) {
      setAmount('');
      setCurrency('USD');
      setLoading(false);
      onSuccess();
      onClose();
    }
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Balance to User">
      <div>
        {/* User Info */}
        <div
          style={{
            backgroundColor: '#F5F7FA',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#0070BA',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
              }}
            >
              {user.displayName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#2C2E2F', margin: '0 0 2px 0' }}>
                {user.displayName}
              </p>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: 0 }}>
                {formatAccountNumber(user.accountNumber)}
              </p>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: '#2C2E2F' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>Current Balances:</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>{formatCurrency(user.balance?.USD || 0, 'USD')}</span>
              <span>{formatCurrency(user.balance?.GBP || 0, 'GBP')}</span>
              <span>{formatCurrency(user.balance?.EUR || 0, 'EUR')}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px'
            }}
          >
            <p style={{ color: '#DC3545', fontSize: '14px', margin: 0 }}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2C2E2F',
                  marginBottom: '6px'
                }}
              >
                Amount to Add
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2C2E2F',
                  marginBottom: '6px'
                }}
              >
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#F5F7FA',
                color: '#2C2E2F',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: loading ? '#6C757D' : '#0070BA',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Adding...' : 'Add Balance'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};