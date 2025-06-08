
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
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from our profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select(`
              *,
              client_profiles (*)
            `)
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const userProfile: UserProfile = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role,
            };

            if (profile.client_profiles && profile.client_profiles.length > 0) {
              const clientProfile = profile.client_profiles[0];
              userProfile.clientProfile = {
                height: clientProfile.height || 0,
                weight: clientProfile.weight || 0,
                targetWeight: clientProfile.target_weight,
                activityLevel: clientProfile.activity_level || 'moderate',
                totalSessions: clientProfile.total_sessions || 0,
                sessionsPerWeek: clientProfile.sessions_per_week || 3,
                sessionsCompleted: clientProfile.sessions_completed || 0,
                workoutPlan: clientProfile.workout_plan,
                startDate: clientProfile.start_date || new Date().toISOString().split('T')[0],
              };
            }

            setUser(userProfile);
          }
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return !error;
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
      
      return !error;
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
