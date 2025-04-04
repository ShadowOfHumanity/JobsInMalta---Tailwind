import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { SiApple } from "react-icons/si";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser, FaBuilding, FaPhone } from "react-icons/fa";
import AddEmployee from "../Hooks/AddEmployee";
import AddEmployer from "../Hooks/AddEmployer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";


interface AuthFormProps {
  type: "login" | "register";
}

// Country code options
interface CountryCode {
  code: string;
}

const countryCodes: CountryCode[] = [
  { code: "+356" },
  { code: "+44" },
  { code: "+49" },
  { code: "+1" },
  { code: "+39" },
];

const AuthForm = ({ type }: AuthFormProps) => {
  const {handleSubmit: addEmployeeSubmit, addEmployeeErrors } = AddEmployee();
  const {handleSubmit: addEmployerSubmit, addEmployerErrors } = AddEmployer();
  const { error: loginError , login } = useAuth()

  const [userType, setUserType] = useState<"employee" | "employer">("employee");
  const [emailValidation, setEmailValidation] = useState<boolean | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<string>("+356");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    company_name: "",
    contact_phone: "",
  });
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    //  email validation 
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    setEmailValidation(isEmailValid);
    
    if (!isEmailValid) return;
    
    if (userType === "employee" && type === "register") {
      //  turn Data into EmployeeCreateRequest
      let employeeData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        contact_phone: formData.contact_phone,
        country_code: selectedCountryCode,
      };
      const result = await addEmployeeSubmit(employeeData);
      
      if (result?.success) {
        // login after registration
        const loginResult = await login({email: formData.email, password: formData.password});
        if (loginResult) {
          navigate("/user-details")
        }
      }
    } else if (userType === "employer" && type === "register") {
      let employerData = {
        email: formData.email,
        password: formData.password,
        company_name: formData.company_name,
        contact_phone: formData.contact_phone,
        country_code: selectedCountryCode,
      }
      const result = await addEmployerSubmit(employerData)
      if (result?.success) {
        const loginResult = await login({email: formData.email, password: formData.password});
        if (loginResult) {
          navigate("/user-details")
        }
      }
    } else if (type === "login") {
      try {
        console.log("Attempting login with:", formData.email);
        const loginResult = await login({
          email: formData.email, 
          password: formData.password 
        });
  
        console.log("Login result:", loginResult);
        
        // If login, navigate to home 
        if (loginResult) {
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* User type selection for registration only */}
      {type === "register" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            I am a:
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                userType === "employee"
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setUserType("employee")}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                userType === "employer"
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setUserType("employer")}
            >
              Employer
            </button>
          </div>
        </div>
      )}

      {/* Registration fields */}
      {type === "register" && userType === "employee" && (
        <>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <div className="relative flex-grow">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="1234 5678"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
        </>
      )}

      {type === "register" && userType === "employer" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Name
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <div className="relative flex-grow">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="1234 5678"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Email field for both login and register */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <div className="relative">
          <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        {(emailValidation === false ) && 
          <p className="text-red-500 text-sm">Invalid email format. Please enter a valid email.</p>
        }
      </div>

      {/* Password field for both login and register */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        {((addEmployeeErrors && addEmployeeErrors[0] === "password") || 
           (addEmployerErrors && addEmployerErrors[0] === "password") ||
           (addEmployeeErrors && addEmployeeErrors[0] === "other") ||
           (addEmployerErrors && addEmployerErrors[0] === "other") ||  
           loginError) && 
          <p className="text-red-500 text-sm">
            { loginError ? loginError : 
              (addEmployeeErrors && addEmployeeErrors[0] === "password") ? addEmployeeErrors[1] : 
              (addEmployeeErrors && addEmployeeErrors[0] === "other") ? addEmployeeErrors[1] :
              (addEmployerErrors && addEmployerErrors[0] === "password") ? addEmployerErrors[1] :
              (addEmployerErrors && addEmployerErrors[0] === "other") ? addEmployerErrors[1] :
              "" }
          </p>
        }
      </div>
     

      {/* Remember me and forgot password (login only) */}
      {type === "login" && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-primary dark:text-primary-light hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-100 hover:from-secondary hover:to-primary hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300"
      >
        {type === "login" ? "Sign In" : "Create Account"}
      </button>

      {/* Login/Register toggle link */}
      <div className="text-center mt-4">
        {type === "login" ? (
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link
              to="/register"
              className="ml-1 text-primary dark:text-primary-light hover:underline"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-primary dark:text-primary-light hover:underline"
            >
              Sign In
            </Link>
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400 text-sm">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* Social login buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-gray-700 dark:text-gray-300">Google</span>
        </button>
        <button
          type="button"
          className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <SiApple className="text-gray-800 dark:text-white" />
          <span className="text-gray-700 dark:text-gray-300">Apple</span>
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
