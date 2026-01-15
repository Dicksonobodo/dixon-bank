import { 
  collection, 
  doc, 
  getDoc, 
  query, 
  getDocs,
  runTransaction 
} from 'firebase/firestore';
import { db } from './firebase';
import { findUserByIdentifier } from './userService';

// Send money to another user
export const sendMoney = async (senderUid, recipientIdentifier, amount, currency, note = '') => {
  console.log('sendMoney called with:', { senderUid, recipientIdentifier, amount, currency, note });
  
  try {
    // Get sender data
    const senderDoc = await getDoc(doc(db, 'users', senderUid));
    if (!senderDoc.exists()) {
      console.error('Sender not found');
      return { success: false, error: 'Sender not found' };
    }
    const senderData = senderDoc.data();
    console.log('Sender data:', senderData);

    // Find recipient
    const { user: recipientData, error: recipientError } = await findUserByIdentifier(recipientIdentifier);
    if (recipientError || !recipientData) {
      console.error('Recipient not found:', recipientError);
      return { success: false, error: 'Recipient not found' };
    }
    console.log('Recipient data:', recipientData);

    // Check if sending to self
    if (senderData.uid === recipientData.uid) {
      console.error('Cannot send to self');
      return { success: false, error: 'Cannot send money to yourself' };
    }

    // Check sender has sufficient balance
    const senderBalance = senderData.balance[currency] || 0;
    console.log('Sender balance:', senderBalance, 'Amount:', amount);
    
    if (senderBalance < amount) {
      console.error('Insufficient balance');
      return { success: false, error: 'Insufficient balance' };
    }

    // Use Firestore transaction for atomic operation
    console.log('Starting Firestore transaction...');
    const transactionResult = await runTransaction(db, async (transaction) => {
      const senderRef = doc(db, 'users', senderUid);
      const recipientRef = doc(db, 'users', recipientData.uid);

      // Deduct from sender
      console.log('Deducting from sender:', amount, currency);
      transaction.update(senderRef, {
        [`balance.${currency}`]: senderBalance - amount
      });

      // Add to recipient (same currency)
      const recipientBalance = recipientData.balance[currency] || 0;
      console.log('Adding to recipient:', amount, currency);
      transaction.update(recipientRef, {
        [`balance.${currency}`]: recipientBalance + amount
      });

      // Create transaction record
      const transactionDoc = {
        senderId: senderUid,
        senderEmail: senderData.email,
        senderName: senderData.displayName,
        receiverId: recipientData.uid,
        receiverEmail: recipientData.email,
        receiverName: recipientData.displayName,
        amount,
        currency,
        note,
        status: 'completed',
        timestamp: new Date().toISOString()
      };

      console.log('Creating transaction document:', transactionDoc);
      const transactionsRef = collection(db, 'transactions');
      const newTransactionRef = doc(transactionsRef);
      transaction.set(newTransactionRef, transactionDoc);

      return { ...transactionDoc, id: newTransactionRef.id };
    });

    console.log('Transaction completed successfully:', transactionResult);
    return { success: true, transaction: transactionResult, error: null };
  } catch (error) {
    console.error('Error in sendMoney:', error);
    return { success: false, error: error.message };
  }
};

// Get user transaction history
export const getUserTransactions = async (uid) => {
  console.log('getUserTransactions called for uid:', uid);
  
  try {
    const transactionsRef = collection(db, 'transactions');
    
    console.log('Fetching all transactions...');
    // Get all transactions and filter in memory to avoid index issues
    const allTransactionsQuery = query(transactionsRef);
    const allSnapshot = await getDocs(allTransactionsQuery);
    
    console.log('Total transactions in database:', allSnapshot.size);

    const transactions = [];
    
    allSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // Filter for user's transactions
      if (data.senderId === uid || data.receiverId === uid) {
        const type = data.senderId === uid ? 'sent' : 'received';
        transactions.push({ id: docSnap.id, ...data, type });
      }
    });

    console.log('User transactions found:', transactions.length);

    // Sort by timestamp (newest first)
    transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return { transactions, error: null };
  } catch (error) {
    console.error('Error in getUserTransactions:', error);
    console.error('Error details:', error.code, error.message);
    return { transactions: [], error: error.message };
  }
};

// Get all transactions (for admin)
export const getAllTransactions = async () => {
  console.log('getAllTransactions called');
  
  try {
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef);
    const querySnapshot = await getDocs(q);
    
    const transactions = [];
    querySnapshot.forEach((docSnap) => {
      transactions.push({ id: docSnap.id, ...docSnap.data() });
    });

    console.log('All transactions found:', transactions.length);

    // Sort by timestamp
    transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return { transactions, error: null };
  } catch (error) {
    console.error('Error in getAllTransactions:', error);
    return { transactions: [], error: error.message };
  }
};