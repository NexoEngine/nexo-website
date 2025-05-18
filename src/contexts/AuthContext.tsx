import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (currentUser: User) => {
    setLoading(true);
    try {
      const { data: userProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('[AuthContext] Supabase error fetching profile:', error);
        setProfile(null);
        setIsAdmin(false);
      } else if (userProfile) {
        setProfile(userProfile as Profile);
        setIsAdmin(userProfile.is_admin || false);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("[AuthContext] Error in fetchUserProfile:", err);
      setProfile(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (!initialSession?.user) {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
      }
    }).catch(error => {
      console.error('[AuthContext] Error in initial getSession():', error);
      setSession(null);
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (!profile || profile.id !== user.id) {
        fetchUserProfile(user);
      } else {
        setLoading(false);
      }
    } else {
      setProfile(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setLoading(false);
  };

  const value = {
    session,
    user,
    profile,
    isAdmin,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 