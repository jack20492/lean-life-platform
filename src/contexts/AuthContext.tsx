
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          // Small delay to ensure profile is created by trigger
          setTimeout(async () => {
            try {
              // Fetch user profile from our profiles table (without client_profiles join)
              const { data: profile, error } = await (supabase as any)
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (error) {
                console.error('Error fetching profile:', error);
                // If profile doesn't exist, create it
                if (error.code === 'PGRST116') {
                  const { error: insertError } = await (supabase as any)
                    .from('profiles')
                    .insert({
                      id: session.user.id,
                      email: session.user.email,
                      name: session.user.user_metadata?.name || session.user.email,
                      role: session.user.email === 'admin@fitness.com' ? 'admin' : 'client'
                    });
                  
                  if (!insertError) {
                    // Retry fetching the profile
                    const { data: newProfile } = await (supabase as any)
                      .from('profiles')
                      .select('*')
                      .eq('id', session.user.id)
                      .single();
                    
                    if (newProfile) {
                      setUser(createUserProfile(newProfile));
                    }
                  }
                }
              } else if (profile) {
                setUser(createUserProfile(profile));
              }
            } catch (err) {
              console.error('Error in auth state change:', err);
            }
          }, 100);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // The onAuthStateChange will handle this
    });

    return () => subscription.unsubscribe();
  }, []);

  const createUserProfile = (profile: any): UserProfile => {
    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
    };
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
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
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

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
