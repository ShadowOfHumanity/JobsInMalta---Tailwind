interface BaseUser {
    email: string;
    password: string;
  }

export interface EmployerCreateRequest extends BaseUser { // base employer
    company_name: string;
    contact_phone: string;
    company_description?: string;
  }
  
  // response
  export interface EmployerResponse {
    success: boolean;
    id: number;
  }

  export interface EmployeeCreateRequest extends BaseUser {
    first_name: string;
    last_name: string;
    professional_title?: string;
    bio?: string;
    skills?: string[];
    experience_years?: number;
    education_level?: string;
    portfolio_url?: string;
    contact_phone: number;
  }
  
  // response
  export interface EmployeeResponse { // ADD TYPE OF EMPLOYEE RESPONSE ASAP
    success: boolean;
    id: number;
  }