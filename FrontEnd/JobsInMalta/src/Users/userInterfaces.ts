interface BaseUser {
  email: string;
  password: string;
}

// Request interfaces for registration
export interface EmployerCreateRequest extends BaseUser {
  company_name: string;
  contact_phone: string;
  company_description?: string;
  industry?: string;
  website_url?: string;
  company_size?: number;
}

export interface EmployeeCreateRequest extends BaseUser {
  first_name: string;
  last_name: string;
  professional_title?: string;
  bio?: string;
  skills?: string;
  experience_Years?: number; 
  education_level?: string;
  portfolio_url?: string;
  country_code: string;
  contact_phone: string; 
}

// Response interfaces
export interface ApiResponse<T> {
  data: T;
  status: string;
  errors?: string[];
}

export interface EmployerResponse {
  success: boolean;
  id: number; // employerId from backend
}

export interface EmployeeResponse {
  success: boolean;
  id: number; // employeeId from backend
}

// User data interfaces from backend
export interface EmployerData {
  employer_id: number;
  user_id: number;
  company_name: string;
  company_description: string | null;
  industry: string | null;
  website_url: string | null;
  contact_phone: string;
  company_size: number | null;
}

export interface EmployeeData {
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
}

// User session data
export interface UserSession {
  user_id: number;
  role: 'employer' | 'employee' | 'admin';
  company_name?: string;
}