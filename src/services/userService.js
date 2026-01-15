import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc 
} from 'firebase/firestore';
import { db } from './firebase';

// Generate unique account number
export const generateAccountNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ACC${timestamp}${random}`;
};

// Check if username exists
export const checkUsernameExists = async (username) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
};

// Create user document in Firestore
export const createUserDocument = async (uid, email, displayName, username) => {
  try {
    // Check if username already exists
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      throw new Error('Username already taken');
    }

    const accountNumber = generateAccountNumber();
    
    const userDoc = {
      uid,
      email,
      displayName,
      username: username.toLowerCase(),
      accountNumber,
      balance: {
        USD: 0,
        GBP: 0,
        EUR: 0
      },
      defaultCurrency: 'USD',
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', uid), userDoc);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user document by UID
export const getUserByUid = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { user: userDoc.data(), error: null };
    }
    return { user: null, error: 'User not found' };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Find user by email, username, or account number
export const findUserByIdentifier = async (identifier) => {
  try {
    const usersRef = collection(db, 'users');
    
    // Check if it's an account number
    if (identifier.startsWith('ACC')) {
      const q = query(usersRef, where('accountNumber', '==', identifier));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return { user: querySnapshot.docs[0].data(), error: null };
      }
    }
    
    // Check if it's an email
    if (identifier.includes('@')) {
      const q = query(usersRef, where('email', '==', identifier));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return { user: querySnapshot.docs[0].data(), error: null };
      }
    }
    
    // Check if it's a username
    const q = query(usersRef, where('username', '==', identifier.toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { user: querySnapshot.docs[0].data(), error: null };
    }
    
    return { user: null, error: 'User not found' };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Update user balance (for admin)
export const updateUserBalance = async (uid, currency, amount) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' };
    }
    
    const currentBalance = userDoc.data().balance[currency] || 0;
    const newBalance = currentBalance + amount;
    
    await updateDoc(userRef, {
      [`balance.${currency}`]: newBalance
    });
    
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all users (for admin)
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    
    return { users, error: null };
  } catch (error) {
    return { users: [], error: error.message };
  }
};