import { useState } from "react";
import globals from "./GlobalStates";
import ApiClient from "../API-RELATED/Api-Client";

export interface LoginRequest {
  email: string;
  password: string;
  // Removed role field as it will be determined on the backend
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user_id: number;
    user_role: string;
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<{ user_id: number; user_role: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiClient.post<LoginResponse>('/auth/login', credentials);
      
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
        globals.setLoggedIn("loggedIn", true);
        return true;
      } else {
        setError(response.data.message || 'Login failed');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await ApiClient.post('/auth/logout');
      setUser(null);
      globals.setLoggedIn("loggedIn", false);
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, logout };
};
