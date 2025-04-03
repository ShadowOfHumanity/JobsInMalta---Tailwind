const dns = require('dns');
const { sanitizeString, sanitizeCode, sanitizePassword } = require("../Extras/Sanitizers");
const { Employer, Employee } = require("../Classes/User");
const {
  validateEmployer,
  insertEmployer,
  validateEmployee,
  insertEmployee,
  LogInUser, 
  getCompanyNameById,
} = require('../db/USER_DB');
const { countryCodeMap } = require('../Extras/CountryCodeMaps');


const login = async (req, res) => {
  if (req.session.user_id) {
    return res.status(200).json({
      success: false,
      message: "User already logged in",
    });
  }

  const { email, password } = req.body;

  let EmailValidation = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!EmailValidation) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  const { success, user_id, user_role, message, errors } = await LogInUser(
    email,
    password
  );

  if (!success) {
    return res.status(401).json({
      success: false,
      message: message || "Login failed.",
      error: errors,
    });
  }

  req.session.user_id = user_id;
  req.session.role = user_role;
  req.session.company_name =
    user_role === "employer"
      ? (await getCompanyNameById(user_id)).company_name
      : null;

  return res.status(200).json({
    data: {
      success: true,
      message: "Login successful",
      data: { user_id, user_role },
    },
    status: "success",
  });
};

const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  });
};

const registerEmployer =  async (req, res) => {
  console.log("Registration attempt, employer:", JSON.stringify(req.body));
  try {
    const requiredFields = ["email", "password", "company_name"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "error",
        errors: [`Missing required fields: ${missingFields.join(", ")}`],
      });
    }

    const newEmployer = new Employer(
      req.body.email.toLowerCase(),
      sanitizePassword(req.body.password),
      sanitizeString(req.body.company_name),
      sanitizeString(req.body.contact_phone),
      sanitizeString(req.body.company_description) // if it exists, it will have a change to be a null too.
    );

    const validation = validateEmployer(newEmployer);
    if (!validation.isValid) {
      return res.status(400).json({
        status: "error",
        errors: validation.errors,
      });
    }

    // add to db
    const employerResult = await insertEmployer(newEmployer);
    if (!employerResult.success) {
      console.error("Database error:", employerResult.error);
      return res.status(500).json({
        status: "error",
        errors: [employerResult.error],
      });
    }

    return res.status(201).json({
      data: {
        success: true,
        id: employerResult.employerId,
      },
      status: "success",
    });
  } catch (error) {
    console.error("Error registering employer:", error);
    return res.status(500).json({
      status: "error",
      errors: [error.message || "Internal server error"],
    });
  }
};

const registerEmployee = async (req, res) => {
  // register employee
  console.log("Registration attempt, employee:", JSON.stringify(req.body));
  try {
    const requiredFields = [
      "email",
      "password",
      "first_name",
      "last_name",
      "contact_phone",
      "country_code",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "error",
        errors: [`Missing required fields: ${missingFields.join(", ")}`],
      });
    }

    let location = countryCodeMap[req.body.country_code];
    let passwordResult = sanitizePassword(req.body.password);
    if (passwordResult){
      return res.status(400).json({
        status: "error",
        errors: ["password", passwordResult],
      });
    }

    

    const newEmployee = new Employee(
      req.body.email.toLowerCase(), 
      req.body.password,
      location,
      sanitizeString(req.body.first_name),
      sanitizeString(req.body.last_name),
      sanitizeString(req.body.professional_title),
      req.body.bio,
      sanitizeString(req.body.skills),
      parseInt(req.body.experience_Years),
      sanitizeString(req.body.education_level),
      req.body.portfolio_url,
      parseInt(req.body.contact_phone),
      sanitizeCode(req.body.country_code)
    );

    const validation = validateEmployee(newEmployee);
    if (!validation.isValid) {
      return res.status(400).json({
        status: "error",
        errors: validation.errors,
      });
    }
    const employeeResult = await insertEmployee(newEmployee);
    if (!employeeResult.success) {
      console.error("Database error:", employeeResult.error);
      return res.status(500).json({
        status: "error",
        errors: [employeeResult.error],
      });
    }

    return res.status(201).json({
      data: {
        success: true,
        id: employeeResult.id,
      },
      status: "success",
    });
  } catch (error) {
    console.error("Error registering employer:", error);
    return res.status(500).json({
      status: "error",
      errors: [error.message || "Internal server error"],
    });
  }
};

const checkSession = async (req, res) => {
  if (req.session && req.session.user_id) {
    return res.status(200).json({
      isAuthenticated: true,
      user: {
        user_id: req.session.user_id,
        user_role: req.session.role
      }
    });
  } else {
    return res.status(200).json({
      isAuthenticated: false,
      user: null
    });
  }
};



module.exports = {login, logout, registerEmployer, registerEmployee, checkSession}

/* { LOGIN EXAMPLE
  "email": "user@example.com",
  "password": "yourpassword",
  "role": "employer" // or "employee"
  }  */

// logout example req.session.destroy()  // <--- destroys the session

/* 
  REGISTER EMPLOYER EXAMPLE
  {
    "email": "employer@company.com",
    "password": "securepassword123",
    "company_name": "Company ABC",
    "contact_phone": "1234567",
    "country_code": "+356"
  }
    Optional fields:
  {
  "company_description": "Description text",
  "industry": "Technology",
  "website_url": "https://company.com",
  "company_size": 50
}

*/

/* 
  REGISTER EMPLOYEE EXAMPLE
  {
    "email": "person@example.com",
    "password": "securepassword123",
    "first_name": "John",
    "last_name": "Doe",
    "contact_phone": "1234567",
    "country_code": "+356"
  }
    Optional fields:
  {
  "professional_title": "Software Developer",
  "bio": "Bio text",
  "skills": "JavaScript, Node.js, React",
  "experience_Years": 5,
  "education_level": "Bachelor's",
  "portfolio_url": "https://portfolio.com"
} */