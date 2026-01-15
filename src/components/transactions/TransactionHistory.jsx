import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserTransactions } from '../../services/transactionService';
import { TransactionItem } from './TransactionItem';
import { TransactionReceipt } from './TransactionReceipt';
import { Loader } from '../common/Loader';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


export const TransactionHistory = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, sent, received
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTransactions = async () => {
      console.log('Loading transactions for user:', currentUser?.uid);
      
      if (!currentUser) {
        console.log('No current user found');
        if (isMounted) setLoading(false);
        return;
      }

      const { transactions: txns, error } = await getUserTransactions(currentUser.uid);

      console.log('Transactions response:', { txns, error });

      if (isMounted) {
        if (error) {
          console.error('Error loading transactions:', error);
        }
        
        if (!error && txns) {
          console.log('Setting transactions:', txns.length, 'transactions found');
          setTransactions(txns);
        } else {
          console.log('No transactions found or error occurred');
          setTransactions([]);
        }
        setLoading(false);
      }
    };

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const handleViewReceipt = (transaction) => {
    console.log('Viewing receipt for transaction:', transaction);
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (filter === 'all') return true;
    if (filter === 'sent') return txn.senderId === currentUser?.uid;
    if (filter === 'received') return txn.receiverId === currentUser?.uid;
    return true;
  });

  console.log('Filtered transactions:', filteredTransactions.length);

  if (loading) {
    return <Loader text="Loading transactions..." />;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#2C2E2F', marginBottom: '8px' }}>
          Transaction History
        </h1>
        <p style={{ color: '#6C757D', fontSize: '14px' }}>
          View all your sent and received transactions
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['all', 'sent', 'received'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              style={{
                padding: '8px 16px',
                backgroundColor: filter === filterOption ? '#0070BA' : '#F5F7FA',
                color: filter === filterOption ? '#FFFFFF' : '#6C757D',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (filter !== filterOption) {
                  e.target.style.backgroundColor = '#E5E7EB';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== filterOption) {
                  e.target.style.backgroundColor = '#F5F7FA';
                }
              }}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}><ReceiptLongIcon fontSize="large" /></div>
            <p style={{ color: '#6C757D', fontSize: '16px', margin: 0 }}>
              No transactions found
            </p>
            <p style={{ color: '#6C757D', fontSize: '14px', margin: '8px 0 0 0' }}>
              {filter === 'all' 
                ? 'Start sending or receiving money to see your transaction history'
                : `You have no ${filter} transactions`}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                onClick={() => handleViewReceipt(transaction)} 
                style={{ cursor: 'pointer' }}
              >
                <TransactionItem
                  transaction={transaction}
                  userUid={currentUser?.uid}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Receipt Modal */}
      <TransactionReceipt
        transaction={selectedTransaction}
        isOpen={showReceipt}
        onClose={() => {
          setShowReceipt(false);
          setSelectedTransaction(null);
        }}
        currentUserId={currentUser?.uid}
      />
    </div>
  );
};