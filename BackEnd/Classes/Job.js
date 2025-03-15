const { hasCategory } = require("../db/JOB_DB");


class Job {
    constructor(title, company, description, expire_date, category, salary_data) {
        this.title = title;
        this.company = company;
        this.description = description;
        this.expire_date = expire_date;
        this.category = category;
        if (salary_data) {

            if (salary_data.type === 'range') {

                this.salaryMin = salary_data.min;
                this.salaryMax = salary_data.max;
            } else if (salary_data.type === 'single') {

                this.salary = salary_data.value;
            }
        }
    }
}

function validateJobListing(body) {
    const requiredFields = ['title','description', 'category', 'expire_date'];
    const errors = [];

    requiredFields.forEach(field => {
        if (!body[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    // Expire date validation
    if (body.expire_date) {
        const expireDate = new Date(body.expire_date);
        // Check for invalid date
        if (isNaN(expireDate.getTime())) {
            errors.push('Invalid expire date format');
        } else {
            const formattedDate = expireDate.toISOString().slice(0, 19).replace("T", " ");
    
            if (expireDate < new Date()) {
                errors.push('Expire date cannot be in the past');
            }
        }
    } else {
        errors.push('Missing expire date');
    }
    

    
    // Category Validation
    if (body.category && !hasCategory(body.category)) {
        errors.push(`Invalid category: ${body.category}`);
    }


    // Salary Validation
    const salaryValidation = validateSalary(body)
    if (!salaryValidation.isValid) {
        errors.push(...salaryValidation.errors);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};   

function validateSalary(body){
    const errors = [];
    // Check if both types of salaries are given
    if (body.salary && (body.salaryMin || body.salaryMax)) {
        errors.push('Cannot specify both single salary and salary range');
        return { isValid: false, errors };
    }

    // VALIDATE SALARY RANGE => this is for MIN and MAX
    if (body.salaryMin !== undefined || body.salaryMax !== undefined) {
        // IF ONE IS GIVEN, BOTH MUST BE GIVEN FOR A RANGE ==> CHECK
        if (body.salaryMin === undefined || body.salaryMax === undefined) {
            errors.push('Both minimum and maximum salary must be provided for a range');
        } else {
            if (typeof body.salaryMin !== 'number' || typeof body.salaryMax !== 'number') {
                // CHECK IF BOTH ARE NUMBERS
                errors.push('Salary range values must be numbers');
            } else if (body.salaryMin < 0 || body.salaryMax < 0) {
                // CHECK IF BOTH ARE POSITIVE
                errors.push('Salary range cant be negative)');
            } else if (body.salaryMin > body.salaryMax) {
                // CHECK IF MIN IS SMALLER THEN MAX
                errors.push('Minimum salary must be less than maximum salary');
            }
        }
    }

    // VALIDATE SINGLE SALARY
    if (body.salary !== undefined) {
        if (typeof body.salary !== 'number') {
            errors.push('Salary value must be a number');
        } else if (body.salary < 0) {
            errors.push('Salary value cannot be negative');
        }
    }


        // this is to check if salary was given at all, we wont need this
    // if (body.salary === undefined && body.salaryMin === undefined && body.salaryMax === undefined) {
    //     errors.push('Either a single salary or salary range must be provided');
    // }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

function processsalary_data(body) {
    let salary_data = body.salary_data
    if (salary_data !== undefined) {

        if (salary_data.type === "range") {

            if (salary_data.min !== undefined && salary_data.max !== undefined) {

                return {
                    type: 'range',
                    min: salary_data.min,
                    max: salary_data.max
                };
            }

        } else if (salary_data.type === "single"){
            if (salary_data.value !== undefined) {
                return {
                    type: 'single',
                    value: salary_data.value
                };
            }
        }
    }

    return null;
}

module.exports.Job = Job;
module.exports.validateJobListing = validateJobListing;
module.exports.processsalary_data = processsalary_data;
