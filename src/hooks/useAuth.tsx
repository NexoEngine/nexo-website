import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Auth, User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Function to check if a user is an admin
const checkAdminStatus = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  try {
    const adminDocRef = doc(db, 'admins', userId);
    const adminDoc = await getDoc(adminDocRef);
    return adminDoc.exists(); // Check if the document exists in the 'admins' collection
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const adminStatus = await checkAdminStatus(currentUser.uid);
        setIsAdmin(adminStatus);
        // Optional: Add user to a 'users' collection if they don't exist
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            try {
                await setDoc(userDocRef, {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                    createdAt: new Date(), // Add a timestamp
                });
            } catch (userSetError) {
                console.error("Error adding user to collection:", userSetError);
            }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Auth state change will be handled by onAuthStateChanged
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      // Auth state change will be handled by onAuthStateChanged
    } catch (error) {
      console.error("Error signing out:", error);
      setLoading(false);
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <>
        {!loading && children}
      </>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext<AuthState | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 