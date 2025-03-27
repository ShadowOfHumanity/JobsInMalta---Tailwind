import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import ApiClient from '../API-RELATED/Api-Client';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { user_id: number; user_role: string } | null;
  isLoading: boolean;
  checkSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ user_id: number; user_role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // check session status
  const checkSession = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await ApiClient.get('/auth/session');
      
      if (response.data.isAuthenticated) {
        setIsLoggedIn(true);
        setUser(response.data.user);
        return true;
      } else {
        setIsLoggedIn(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("Session check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check session on load
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
