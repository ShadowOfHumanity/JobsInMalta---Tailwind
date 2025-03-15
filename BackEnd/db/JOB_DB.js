const pool = require("./db");

async function insertJob(newJob, owner_id) {
  if (!newJob) {
    return {
      success: false,
      error: "No job data provided",
    };
  }
  let salaryType = null;
  if (newJob.salaryMin && newJob.salaryMax) {
    salaryType = "range";
  } else if (newJob.salary) {
    salaryType = "single";
  }

  try {
    const result = await pool.query(
      `INSERT INTO jobs (
                title, 
                company, 
                description, 
                expire_date, 
                category_name, 
                salary_type,
                salary_min, 
                salary_max,
                salary_single,
                owner_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
      [
        newJob.title,
        newJob.company,
        newJob.description,
        newJob.expire_date,
        newJob.category,
        salaryType,
        newJob.salaryMin || null,
        newJob.salaryMax || null,
        newJob.salary || null,
        owner_id
      ]
    );

    return {
      success: true,
      data: result.rows[0],
    };
  } catch (err) {
    if (err.code === "23503" && err.detail.includes("category_name")) {
        return {
            success: false,
            error: "Invalid category"
        };
    }
    console.error("Error inserting job:", err);
    return {
      success: false,
      error: err.message || "An error occurred",
    };
  }
}

async function getJobsDB({
  category = null,
  sortBy = "newest",
  id = null,
  page = 1,
  limit = 10,
} = {}) {
  try {
    const validatedPage = Math.max(1, Number(page));
    const validatedLimit = Math.max(1, Number(limit));

    let query = "SELECT * FROM jobs";
    let values = [];
    let parameterCount = 0;
    let whereClause = "";
    let orderByClause = "";
    let paginationClause = "";

    // Handle filters
    if (id) {
      whereClause = ` WHERE job_id = $${++parameterCount}`;
      values.push(id);
    } else if (category) {
      whereClause = ` WHERE category_name = $${++parameterCount}`;
      values.push(category);
    }

    query += whereClause;

    // Handle sorting
    switch (sortBy) {
      case "newest":
        orderByClause = " ORDER BY created_at DESC";
        break;
      case "expiring":
        orderByClause = " ORDER BY expire_date ASC";
        break;
      case "oldest":
        orderByClause = " ORDER BY created_at ASC";
        break;
      default:
        orderByClause = " ORDER BY created_at DESC";
    }

    query += orderByClause;

    // ADD PAGINATION. THIS REDUCED LOAD ON THE DB AND BACKEND
    paginationClause = ` LIMIT $${++parameterCount} OFFSET $${++parameterCount}`;
    values.push(validatedLimit, (validatedPage - 1) * validatedLimit);
    query += paginationClause;

    const result = await pool.query(query, values);
    return {
      success: true,
      data: id ? result.rows[0] : result.rows,
      count: result.rowCount,
      sortedBy: sortBy,
    };
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return {
      success: false,
      error: err.message,
    };
  }
}

async function getCategories() {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return {
      success: true,
      data: result.rows,
    };
  } catch (err) {
    console.error("Error fetching categories:", err);
    return {
      success: false,
      error: err.message,
    };
  }
}

async function hasCategory(category) {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM categories WHERE category_name = $1",
      [category]
    );
    return result.rows[0].count > 0;
  } catch (err) {
    console.error("Error checking category:", err);
    return false;
  }
}

module.exports = {
  getCategories,
  hasCategory,
  getJobsDB,
  insertJob,
};

/* 
     Get all jobs (newest first)
const allJobs = await getJobs();

     Get jobs by category
const categoryJobs = await getJobs({ category: 'Frontend Development' });

     Get jobs expiring soon
const expiringJobs = await getJobs({ sortBy: 'expiring' });

     Get single job by ID
const singleJob = await getJobs({ id: 1 });

     Get jobs in category, sorted by expiry
const expiringCategoryJobs = await getJobs({ 
    category: 'Frontend Development', 
    sortBy: 'expiring' 
});

sorting types:
- newest (default)
- expiring
- oldest

*/
