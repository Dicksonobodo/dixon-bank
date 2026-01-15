import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getUserByUid } from '../services/userService';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;
      
      setCurrentUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const { user: firestoreUser, error } = await getUserByUid(user.uid);
        
        if (isMounted) {
          if (!error && firestoreUser) {
            setUserData(firestoreUser);
          } else {
            // Retry once if failed
            setTimeout(async () => {
              const retry = await getUserByUid(user.uid);
              if (isMounted && retry.user) {
                setUserData(retry.user);
              }
            }, 1000);
          }
        }
      } else {
        if (isMounted) {
          setUserData(null);
        }
      }
      
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const refreshUserData = async () => {
    if (currentUser) {
      const { user: firestoreUser } = await getUserByUid(currentUser.uid);
      if (firestoreUser) {
        setUserData(firestoreUser);
      }
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};