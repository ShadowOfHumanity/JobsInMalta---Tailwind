const { getEmployeeData, getEmployerData } = require("../db/USER_DB");


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

module.exports = {
  getProfileInfo,
};
