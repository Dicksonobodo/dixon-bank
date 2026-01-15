import { Modal } from '../common/Modal';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export const TransactionReceipt = ({ transaction, isOpen, onClose, currentUserId }) => {
  if (!transaction) return null;

  const isSent = transaction.senderId === currentUserId;
  const transactionType = isSent ? 'Sent' : 'Received';
  const otherParty = isSent ? {
    name: transaction.receiverName,
    email: transaction.receiverEmail,
    accountNumber: transaction.receiverAccountNumber
  } : {
    name: transaction.senderName,
    email: transaction.senderEmail,
    accountNumber: transaction.senderAccountNumber
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction Receipt" maxWidth="600px">
      <div id="receipt-content" style={{ padding: '8px 0' }}>
        {/* Status Banner */}
        <div
          style={{
            backgroundColor: transaction.status === 'completed' ? '#F0FDF4' : '#FEF2F2',
            border: transaction.status === 'completed' ? '1px solid #86EFAC' : '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>
            {transaction.status === 'completed' ? '✓' : '⚠'}
          </div>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: transaction.status === 'completed' ? '#28A745' : '#DC3545',
            margin: 0 
          }}>
            Transaction {transaction.status === 'completed' ? 'Successful' : 'Pending'}
          </p>
        </div>

        {/* Transaction Amount */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: '#6C757D', margin: '0 0 8px 0' }}>
            Amount {transactionType}
          </p>
          <p style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: isSent ? '#DC3545' : '#28A745',
            margin: 0 
          }}>
            {isSent ? '-' : '+'}{formatCurrency(transaction.amount, transaction.currency)}
          </p>
        </div>

        {/* Transaction Details */}
        <div style={{ 
          backgroundColor: '#F5F7FA', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#2C2E2F', marginBottom: '16px' }}>
            Transaction Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>Transaction ID</span>
              <span style={{ fontSize: '14px', color: '#2C2E2F', fontWeight: '500', fontFamily: 'monospace' }}>
                {transaction.id?.slice(0, 12)}...
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>Date & Time</span>
              <span style={{ fontSize: '14px', color: '#2C2E2F', fontWeight: '500' }}>
                {formatDateTime(transaction.timestamp)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>Type</span>
              <span style={{ fontSize: '14px', color: '#2C2E2F', fontWeight: '500' }}>
                {transactionType}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>Status</span>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: '#FFFFFF',
                backgroundColor: transaction.status === 'completed' ? '#28A745' : '#FFC439',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {transaction.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Party Details */}
        <div style={{ 
          backgroundColor: '#F5F7FA', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#2C2E2F', marginBottom: '16px' }}>
            {isSent ? 'Recipient' : 'Sender'} Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>Name</span>
              <span style={{ fontSize: '14px', color: '#2C2E2F', fontWeight: '500' }}>
                {otherParty.name}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#6C757D' }}>Email</span>
              <span style={{ fontSize: '14px', color: '#2C2E2F', fontWeight: '500' }}>
                {otherParty.email}
              </span>
            </div>
          </div>
        </div>

        {/* Note */}
        {transaction.note && (
          <div style={{ 
            backgroundColor: '#F5F7FA', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 6px 0' }}>Note</p>
            <p style={{ fontSize: '14px', color: '#2C2E2F', margin: 0, fontStyle: 'italic' }}>
              "{transaction.note}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#0070BA',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Print Receipt
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#F5F7FA',
              color: '#2C2E2F',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '24px', 
          paddingTop: '24px', 
          borderTop: '1px solid #E5E7EB',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '12px', color: '#6C757D', margin: 0 }}>
            PayBank - Digital Banking Solution
          </p>
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '4px 0 0 0' }}>
            For support, contact support@paybank.com
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content, #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </Modal>
  );
};