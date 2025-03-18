import { useEffect, useState } from "react";
import ApiClient from "../API-RELATED/Api-Client";

export interface UserInfo {
  employer?: {
    employer_id: number;
    user_id: number;
    company_name: string;
    company_description: string | null;
    industry: string | null;
    website_url: string | null;
    contact_phone: string;
    company_size: number | null;
  };
  employee?: {
    employee_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    professional_title: string | null;
    bio: string | null;
    skills: string | null;
    experience_years: number | null;
    education_level: string | null;
    portfolio_url: string | null;
    contact_phone: string;
  };
}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiClient.get<{status: boolean, data: any}>('/userInfo');
      
      if (response.data.status) {
        setUserInfo(response.data.data);
        return response.data.data;
      } else {
        setError('Failed to fetch user information');
        return null;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching user information');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return { userInfo, loading, error, refetch: fetchUserInfo };
};
