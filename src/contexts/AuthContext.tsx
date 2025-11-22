import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AWS_CONFIG } from '@/config/aws';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  session: string | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedSession = localStorage.getItem('auth_session');
        const storedUser = localStorage.getItem('auth_user');
        
        if (storedSession && storedUser) {
          setSession(storedSession);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Session check failed');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      // TODO: Replace with AWS Cognito signup
      // const response = await fetch(`${AWS_CONFIG.apiEndpoint}/auth/signup`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name })
      // });

      // Simulated signup for development
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      
      const mockSession = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 86400000 }));
      
      localStorage.setItem('auth_session', mockSession);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      setSession(mockSession);
      setUser(newUser);
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Replace with AWS Cognito signin
      // const response = await fetch(`${AWS_CONFIG.apiEndpoint}/auth/signin`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });

      // Simulated signin for development
      const existingUser = localStorage.getItem('auth_user');
      
      if (!existingUser) {
        throw new Error('No account found. Please sign up first.');
      }

      const user = JSON.parse(existingUser);
      const mockSession = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 86400000 }));
      
      localStorage.setItem('auth_session', mockSession);
      setSession(mockSession);
      setUser(user);
      
      return { error: null };
    } catch (error) {
      return { 
        error: error instanceof Error ? error : new Error('Invalid credentials') 
      };
    }
  };

  const signOut = async () => {
    try {
      // TODO: Replace with AWS Cognito signout
      // await fetch(`${AWS_CONFIG.apiEndpoint}/auth/signout`, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${session}` }
      // });

      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth_user');
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Signout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
