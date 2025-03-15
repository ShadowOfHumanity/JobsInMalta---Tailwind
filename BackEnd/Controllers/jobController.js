const { sanitizeString } = require("../Extras/Sanitizers");
const { getJobsDB, insertJob } = require("../db/JOB_DB");
const { Job, validateJobListing, processsalary_data } = require('../Classes/Job');



const getJobs = async (req, res) => {
  // fetch job listings with params
  try {
    const { category, sortBy, id, page, limit } = req.query;

    const jobsResult = await getJobsDB({
      category: category && sanitizeString(category),
      sortBy: sortBy && sanitizeString(sortBy),
      id: id && parseInt(id), // these are queries
      page: page && parseInt(page),
      limit: limit && parseInt(limit), // these are how many are shown to not over send alot of jobs
    });

    // validation
    if (!jobsResult.success) {
      return res.status(500).json({
        status: "error",
        message: jobsResult.error,
      });
    }
    return res.status(200).json({
      status: "success",
      count: jobsResult.count,
      data: jobsResult.data,
      sortedBy: jobsResult.sortedBy,
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const postJobs = async (req, res) => {
  // add a job listing
  try {
    if (req.session.role === "employer" || req.session.role === "admin") {
      const validation = validateJobListing(req.body); // use custom job module
      if (validation.errors) {
        console.log("Validation:", validation.errors);
      }
      if (!validation.isValid) {
        return res.status(400).json({
          status: "error",
          errors: validation.errors,
        });
      }
      // salary_data is processed to be in the correct format
      const salary_data = processsalary_data(req.body);
      const newJob = new Job( // SANITIZATION PREVENTS XSS, SQL INNJ, ect.
        sanitizeString(req.body.title),
        req.session.role === "employer"
          ? req.session.company_name
          : sanitizeString(req.body.company),
        sanitizeString(req.body.description),
        req.body.expire_date,
        req.body.category, // CATEGORY WILL BE A DROP DOWN, SO NO NEED TO SANITIZE
        salary_data // to see how salary data, is made originally, check Job.js
      );

      const { success, error } = await insertJob(newJob, req.session.user_id); // ADD TO DB
      if (success) {
        return res.status(201).json({
          status: "success",
          data: newJob,
        });
      }
      return res.status(500).json({
        status: "error",
        errors: [error],
      });
    }
    console.log("Unauthorized job posting attempt!");
    return res.status(401).json({
      status: "error",
      errors: ["Unauthorized"],
    });
  } catch (error) {
    console.error("Error creating job posting:", error);
    return res.status(500).json({
      status: "error",
      errors: ["Internal server error"], // put in array to remain consistent
    });
  }
};

module.exports = { getJobs, postJobs };
