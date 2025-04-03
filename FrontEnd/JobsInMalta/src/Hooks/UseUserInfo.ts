import { useEffect, useState } from "react";
import ApiClient from "../API-RELATED/Api-Client";

interface Lang {
  name: string;
  level: string;
}

interface Education {
  education_id: number;
  institution: string;
  degree_name: string;
  start_year: string | null;
  end_year: string | null;
}

// Common user information for both employers and employees
interface BaseUserInfo {
  user_id: number;
  first_name: string;
  last_name: string;
  contact_phone: string;
  contact_email: string;
  profile_picture: string | null;
  country_code: string | null;
  location: string | null;
}

// Employer-specific information
interface EmployerSpecificInfo {
  employer_id: number;
  employee_id?: never; // Make sure it's mutually exclusive with employee_id
  company_name: string;
  company_description: string | null;
  industry: string | null;
  website_url: string | null;
  company_size: number | null;
}

// Employee-specific information
interface EmployeeSpecificInfo {
  employee_id: number;
  employer_id?: never; // Make sure it's mutually exclusive with employer_id
  professional_title: string | null;
  bio: string | null;
  education: Education[] | null;
  portfolio_url: string | null;
  linkedIn_url: string | null;
  languages: Lang[] | null;
}

// Combined user info - either an employer or an employee
export type UserInfo = BaseUserInfo & (EmployerSpecificInfo | EmployeeSpecificInfo);

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiClient.get<{success: boolean, data: any}>('user/getProfileInfo');
      console.log(response.data);
      if (response.data.success) {
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
