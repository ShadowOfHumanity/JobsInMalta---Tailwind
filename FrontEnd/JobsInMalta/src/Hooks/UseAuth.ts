import { useState } from "react";
import ApiClient from "../API-RELATED/Api-Client";
import { useAuthSession as useAuthContext } from "./AuthContext";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    success: boolean;
    message: string;
    data?: {
      user_id: number;
      user_role: string;
    };
  };
  status: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkSession } = useAuthContext();

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiClient.post<LoginResponse>('/auth/login', credentials);
      

      if (response.data.status === "success" && response.data.data.success) {
        // After  login check session --> update  global auth state
        await checkSession();
        return true;
      } else {
        setError(response.data.data?.message || 'Login failed');
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
      // After logout, check  session --> update  global auth state
      await checkSession();
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, logout };
};
