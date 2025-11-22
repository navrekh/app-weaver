import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cognitoAuth } from '@/lib/cognito';
import { apiClient } from '@/config/aws';

interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
}

interface Session {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: Error | null }>;
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { user: cognitoUser, token } = await cognitoAuth.getCurrentUser();
        
        if (cognitoUser && token) {
          const user: User = {
            id: cognitoUser.username,
            email: cognitoUser.email,
            name: cognitoUser.attributes?.given_name 
              ? `${cognitoUser.attributes.given_name} ${cognitoUser.attributes.family_name || ''}`.trim()
              : undefined,
            username: cognitoUser.username,
          };
          
          const newSession: Session = {
            user,
            token,
          };
          
          setUser(user);
          setSession(newSession);
          apiClient.setAuthToken(token);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { user: cognitoUser, error } = await cognitoAuth.signUp({
        email,
        password,
        firstName,
        lastName,
      });

      if (error) {
        return { error: new Error(error) };
      }

      // Note: User needs to verify email before they can sign in
      // The actual session will be created after email verification and sign in
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user: cognitoUser, token, error } = await cognitoAuth.signIn({
        email,
        password,
      });

      if (error) {
        return { error: new Error(error) };
      }

      if (!cognitoUser || !token) {
        return { error: new Error('Sign in failed') };
      }

      const user: User = {
        id: cognitoUser.username,
        email: cognitoUser.email,
        name: cognitoUser.attributes?.given_name 
          ? `${cognitoUser.attributes.given_name} ${cognitoUser.attributes.family_name || ''}`.trim()
          : undefined,
        username: cognitoUser.username,
      };
      
      const newSession: Session = {
        user,
        token,
      };
      
      setUser(user);
      setSession(newSession);
      apiClient.setAuthToken(token);
      
      return { error: null };
    } catch (error) {
      return { 
        error: error instanceof Error ? error : new Error('Invalid credentials') 
      };
    }
  };

  const signOut = async () => {
    cognitoAuth.signOut();
    setSession(null);
    setUser(null);
    apiClient.setAuthToken('');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
