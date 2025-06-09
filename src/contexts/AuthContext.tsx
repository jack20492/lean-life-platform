
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  clientProfile?: {
    height: number;
    weight: number;
    targetWeight?: number;
    activityLevel: string;
    totalSessions: number;
    sessionsPerWeek: number;
    sessionsCompleted: number;
    workoutPlan?: string;
    startDate: string;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          console.log('User found in session, fetching profile...');
          await fetchUserProfile(session.user);
        } else {
          console.log('No user in session, clearing user state');
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      if (session?.user) {
        fetchUserProfile(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      console.log('Fetching profile for user:', authUser.id, authUser.email);
      
      // Fetch user profile from our profiles table
      const { data: profile, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new one...');
          const { error: insertError } = await (supabase as any)
            .from('profiles')
            .insert({
              id: authUser.id,
              email: authUser.email,
              name: authUser.user_metadata?.name || authUser.email,
              role: authUser.email === 'admin@fitness.com' ? 'admin' : 'client'
            });
          
          if (insertError) {
            console.error('Error creating profile:', insertError);
          } else {
            console.log('Profile created successfully, refetching...');
            // Retry fetching the profile
            const { data: newProfile, error: refetchError } = await (supabase as any)
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .single();
            
            if (!refetchError && newProfile) {
              console.log('Profile refetched successfully:', newProfile);
              setUser(createUserProfile(newProfile));
            } else {
              console.error('Error refetching profile:', refetchError);
            }
          }
        }
      } else if (profile) {
        console.log('Profile fetched successfully:', profile);
        setUser(createUserProfile(profile));
      }
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
    }
  };

  const createUserProfile = (profile: any): UserProfile => {
    console.log('Creating user profile from:', profile);
    const userProfile = {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
    };
    console.log('Created user profile:', userProfile);
    return userProfile;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        return false;
      }
      
      console.log('Login successful');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    console.log('Logging out...');
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log('Attempting register for:', email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Register error:', error);
        return false;
      }
      
      console.log('Register successful');
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  console.log('AuthProvider state - user:', user, 'loading:', loading, 'session:', !!session);

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
