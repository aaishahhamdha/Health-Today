import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(); 

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        try {
          
          const userDocRef = doc(FIREBASE_DB, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
         
            const userEmail = userData.email || user.email;
            const extractedUsername = userEmail.split('@')[0];
            setUsername(userData.username || extractedUsername);
          } else {
            console.warn(`No Firestore document found for UID: ${uid}`);
            const extractedUsername = user.email.split('@')[0];
            setUsername(extractedUsername);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          const extractedUsername = user.email.split('@')[0]; 
          setUsername(extractedUsername);
        }
      } else {
        
        setUsername('Guest');
      }
      setLoading(false); 
    });


    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ username, loading }}>
      {children}
    </UserContext.Provider>
  );
};
