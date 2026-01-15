import { formatDateTime, formatCurrency } from '../../utils/formatters';

export const TransactionItem = ({ transaction, userUid }) => {
  console.log('Rendering transaction item:', transaction);
  
  const isSent = transaction.senderId === userUid;

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.2s',
        gap: '12px',
        flexWrap: window.innerWidth < 640 ? 'wrap' : 'nowrap'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F5F7FA';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#FFFFFF';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Left Side - Icon & Details */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        {/* Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: isSent ? '#FEF2F2' : '#F0FDF4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0
          }}
        >
          {isSent ? '↑' : '↓'}
        </div>

        {/* Details */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#2C2E2F', 
            margin: '0 0 4px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {isSent ? `Sent to ${transaction.receiverName}` : `Received from ${transaction.senderName}`}
          </p>
          <p style={{ fontSize: '12px', color: '#6C757D', margin: 0 }}>
            {formatDateTime(transaction.timestamp)}
          </p>
          {transaction.note && (
            <p style={{ 
              fontSize: '12px', 
              color: '#6C757D', 
              margin: '4px 0 0 0', 
              fontStyle: 'italic',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              "{transaction.note}"
            </p>
          )}
        </div>
      </div>

      {/* Right Side - Amount */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p
          style={{
            fontSize: '16px',
            fontWeight: '700',
            color: isSent ? '#DC3545' : '#28A745',
            margin: '0 0 4px 0',
            whiteSpace: 'nowrap'
          }}
        >
          {isSent ? '-' : '+'}{formatCurrency(transaction.amount, transaction.currency)}
        </p>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#FFFFFF',
            backgroundColor: transaction.status === 'completed' ? '#28A745' : '#FFC439',
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          {transaction.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};