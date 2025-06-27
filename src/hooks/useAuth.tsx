
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GymProfile {
  id: string;
  gym_name: string;
  gym_location: string;
  pin_code: string;
  active: boolean;
}

interface AuthContextType {
  gym: GymProfile | null;
  loading: boolean;
  signInWithPin: (pin: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [gym, setGym] = useState<GymProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing gym session
    const savedGym = localStorage.getItem('currentGym');
    if (savedGym) {
      try {
        const gymData = JSON.parse(savedGym);
        setGym(gymData);
      } catch (error) {
        console.error('Error parsing saved gym data:', error);
        localStorage.removeItem('currentGym');
      }
    }
    setLoading(false);
  }, []);

  const signInWithPin = async (pin: string) => {
    try {
      const { data: gymData, error } = await supabase
        .from('gym_profiles')
        .select('*')
        .eq('pin_code', pin)
        .eq('active', true)
        .single();

      if (error) {
        return { error: 'Invalid PIN. Please check your PIN and try again.' };
      }

      if (!gymData) {
        return { error: 'Invalid PIN. Please check your PIN and try again.' };
      }

      // Set the gym context for RLS policies
      await supabase.rpc('set_config', {
        parameter: 'app.current_gym_id',
        value: gymData.id
      });

      // Save gym data to state and localStorage
      setGym(gymData);
      localStorage.setItem('currentGym', JSON.stringify(gymData));

      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'An error occurred during sign in. Please try again.' };
    }
  };

  const signOut = async () => {
    setGym(null);
    localStorage.removeItem('currentGym');
    
    // Clear the gym context
    await supabase.rpc('set_config', {
      parameter: 'app.current_gym_id',
      value: ''
    });
  };

  return (
    <AuthContext.Provider value={{ gym, loading, signInWithPin, signOut }}>
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
