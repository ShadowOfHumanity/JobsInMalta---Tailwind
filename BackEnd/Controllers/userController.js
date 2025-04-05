const { getEmployeeData, getEmployerData, editEmployeeInfo } = require("../db/USER_DB");


const getProfileInfo = async (req, res) => {
  if (req.session && req.session.user_id) {
    if (req.session.role === "employee") {
      let result = getEmployeeData(req.session.user_id);
      if ((await result).success) {
        return res.status(200).json({
          success: true,
          message: "User info retrieved successfully",
          data: (await result).employee,
        });
      }
      if (req.session.role === "employer") {
        let result = getEmployerData(req.session.user_id);
        if ((await result).success) {
          return res.status(200).json({
            success: true,
            message: "User info retrieved successfully",
            data: (await result).employer,
          });
        }
      }
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  }
};

const editProfileInfo = async (req, res) => {
  if (req.session && req.session.user_id) {
    if (req.session.role === "employee") {
      let employeeObject = {
        professional_title: req.body.job_title,
        linkedIn_url: req.body.linkedIn_url,
        portfolio_url: req.body.portfolio_url,
      }
      let educationArray = req.body.education
      let result = editEmployeeInfo(employeeObject, educationArray, req.session.user_id)
      if ((await result).success) {
        return res.status(200).json({
          success: true,
          message: "User info updated successfully",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Error updating user info",
        });
      }
      
    } else if (req.session.role === "employer") {
      let employerObject = {
        company_description: req.body.company_description,
        industry: req.body.industry,
        website_url: req.body.website_url,
        company_size: req.body.company_size
      }
      // (do somethuing database with employerObject)
    } else {
      return res.status(401).json({
        success: false,
        message: "hey... how did you get here?",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  }
}

module.exports = {
  getProfileInfo,
  editProfileInfo,
};
