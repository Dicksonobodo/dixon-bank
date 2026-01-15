import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBalance } from '../../hooks/useBalance';
import { sendMoney } from '../../services/transactionService';
import { validateRecipient, validateAmount } from '../../utils/validators';
import { findUserByIdentifier } from '../../services/userService';
import { CURRENCIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import { Modal } from '../common/Modal';
import { useNavigate } from 'react-router-dom';

export const SendMoney = () => {
  const navigate = useNavigate();
  const { currentUser, refreshUserData } = useAuth();
  const { balance } = useBalance();

  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    currency: 'USD',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [recipientData, setRecipientData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleFindRecipient = async () => {
    setErrors({});
    const recipientError = validateRecipient(formData.recipient);

    if (recipientError) {
      setErrors({ recipient: recipientError });
      return;
    }

    setLoading(true);
    const { user, error } = await findUserByIdentifier(formData.recipient);

    if (error || !user) {
      setErrors({ recipient: 'Recipient not found' });
      setRecipientData(null);
    } else {
      setRecipientData(user);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const recipientError = validateRecipient(formData.recipient);
    const amountError = validateAmount(
      formData.amount,
      balance[formData.currency] || 0,
      formData.currency
    );

    if (recipientError || amountError) {
      setErrors({
        recipient: recipientError,
        amount: amountError
      });
      return;
    }

    if (!recipientData) {
      setErrors({ recipient: 'Please find recipient first' });
      return;
    }

    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmTransfer = async () => {
  setLoading(true);

  const { success: transferSuccess, error } = await sendMoney(
    currentUser.uid,
    formData.recipient,
    parseFloat(formData.amount),
    formData.currency,
    formData.note
  );

  if (error) {
    setErrors({ general: error });
    setLoading(false);
    setShowConfirmModal(false);
  } else if (transferSuccess) {
    setSuccess(true);
    setShowConfirmModal(false);
    setLoading(false);

    // Refresh user data to update balance
    await refreshUserData();

    // Reset form and navigate after 2 seconds
    setTimeout(() => {
      setFormData({
        recipient: '',
        amount: '',
        currency: 'USD',
        note: ''
      });
      setRecipientData(null);
      setSuccess(false);
      navigate('/transactions'); // Navigate to transaction history
    }, 2000);
  }
};

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#2C2E2F', marginBottom: '8px' }}>
          Send Money
        </h1>
        <p style={{ color: '#6C757D', fontSize: '14px' }}>
          Transfer money to another PayBank user
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #86EFAC',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '24px' }}>✓</span>
          <p style={{ color: '#28A745', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            Money sent successfully!
          </p>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}
        >
          <p style={{ color: '#DC3545', fontSize: '14px', margin: 0 }}>
            {errors.general}
          </p>
        </div>
      )}

      {/* Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Recipient */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
              Recipient (Email, Username, or Account Number)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Enter email, @username, or account number"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: errors.recipient ? '1px solid #DC3545' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={handleFindRecipient}
                disabled={loading || !formData.recipient}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0070BA',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading || !formData.recipient ? 'not-allowed' : 'pointer',
                  opacity: loading || !formData.recipient ? 0.5 : 1
                }}
              >
                Find
              </button>
            </div>
            {errors.recipient && (
              <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.recipient}</p>
            )}
          </div>

          {/* Recipient Info */}
          {recipientData && (
            <div
              style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #86EFAC',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#28A745',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                {recipientData.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#2C2E2F', margin: '0 0 2px 0' }}>
                  {recipientData.displayName}
                </p>
                <p style={{ fontSize: '12px', color: '#6C757D', margin: 0 }}>
                  @{recipientData.username}
                </p>
              </div>
            </div>
          )}

          {/* Amount & Currency */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: errors.amount ? '1px solid #DC3545' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              {errors.amount && (
                <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.amount}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
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

          {/* Available Balance */}
          <div
            style={{
              backgroundColor: '#F5F7FA',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          >
            <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 4px 0' }}>
              Available Balance
            </p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#2C2E2F', margin: 0 }}>
              {formatCurrency(balance[formData.currency] || 0, formData.currency)}
            </p>
          </div>

          {/* Note */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
              Note (Optional)
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a note for this transaction"
              rows="3"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !recipientData}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading || !recipientData ? '#6C757D' : '#0070BA',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading || !recipientData ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Send Money'}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Transfer"
      >
        <div style={{ padding: '8px 0' }}>
          <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '16px' }}>
            Please review the transfer details:
          </p>

          <div style={{ backgroundColor: '#F5F7FA', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 4px 0' }}>Recipient</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#2C2E2F', margin: 0 }}>
                {recipientData?.displayName} (@{recipientData?.username})
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 4px 0' }}>Amount</p>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#0070BA', margin: 0 }}>
                {formatCurrency(parseFloat(formData.amount) || 0, formData.currency)}
              </p>
            </div>

            {formData.note && (
              <div>
                <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 4px 0' }}>Note</p>
                <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0, fontStyle: 'italic' }}>
                  "{formData.note}"
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowConfirmModal(false)}
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
              onClick={handleConfirmTransfer}
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
              {loading ? 'Sending...' : 'Confirm & Send'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};