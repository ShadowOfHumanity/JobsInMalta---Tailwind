const pool = require("./db");
const bcrypt = require('bcrypt');

async function insertUser(newUser, client = null) {
    const shouldRelease = !client; // get client from method like inserEmployee, insertEmployer.
    if (!client) {
        client = await pool.connect(); // get a new connection if no client from the mentioned methods.
    }

    try {
        const userResult = await client.query(
            `INSERT INTO users (email, password_hash, role, location, contact_phone, country_code) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING user_id`,
            [newUser.email, newUser.password_hash, newUser.role, newUser.location, newUser.contact_phone, newUser.country_code]
        );

        const userId = userResult.rows[0].user_id;
        return { success: true, userId: userId };

    } catch (error) {
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            return {success: false, error: "email already exists!"}
        }
        console.error('Error in insertUser:', error);
        return { success: false, error: error.message };
    } finally {
        if (shouldRelease) client.release(); // Release only if we created the client
    }
}

async function insertEmployer(newEmployer) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // First insert the user
        const userResult = await insertUser({
            email: newEmployer.email,
            password_hash: newEmployer.password_hash,
            role: 'employer',
            location: newEmployer.location,
            contact_phone: newEmployer.contact_phone,
            country_code: newEmployer.country_code
        }, client);

        if (!userResult.success) {
            throw new Error(userResult.error);
        }

        // insert the employer details
        const employerResult = await client.query(
            `INSERT INTO employers 
             (user_id, company_name, company_description, industry, 
              website_url, company_size)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING employer_id`,
            [
                userResult.userId,
                newEmployer.company_name,
                newEmployer.company_description,
                newEmployer.industry,
                newEmployer.website_url,
                newEmployer.company_size
            ]
        );

        await client.query('COMMIT');
        return {
            success: true,
            employerId: employerResult.rows[0].employer_id,
            userId: userResult.userId
        };

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error in insertEmployer:', error.message);
        return { success: false, error: error.message };
    } finally {
        client.release();
    }
}

async function insertEmployee(newEmployee) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // First insert the user
        const userResult = await insertUser({
            email: newEmployee.email,
            password_hash: newEmployee.password_hash,
            role: 'employee',
            location: newEmployee.location,
            contact_phone: newEmployee.contact_phone,
            country_code: newEmployee.country_code
        }, client);

        if (!userResult.success) {
            throw new Error(userResult.error);
        }

        //  insert  employee details
        const employeeResult = await client.query(
            `INSERT INTO employees 
             ( user_id, first_name, last_name, professional_title, 
              bio, portfolio_url )
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING employee_id`,
            [
                userResult.userId,
                newEmployee.first_name,
                newEmployee.last_name,
                newEmployee.professional_title,
                newEmployee.bio,
                newEmployee.portfolio_url,
            ]
        );

        await client.query('COMMIT');
        return {
            success: true,
            employeeId: employeeResult.rows[0].employee_id,
            userId: userResult.userId
        };

    } catch (error) {
        await client.query('ROLLBACK');
        if (error.code === '23505' && error.constraint === 'employees_contact_phone_key') {
            return {success: false, error: "phone number is already used!"}
        }
        console.error('Error in insertEmployee:', error.message);
        return { success: false, error: error.message };
    } finally {
        client.release();
    }
}

async function editEmployee(EmployeeExtras, id){

}

async function editEmployer(EmployerExtras, id){
    
}

async function LogInUser(email, password){
    const client = await pool.connect();
    try{
        // first get user without checking role
        const result = await client.query(
            `SELECT user_id, password_hash, role FROM users WHERE email = $1;`,
            [email]
          );

        if (result.rows.length > 0 ){
            const storedPasswordHash = result.rows[0].password_hash;
            const userRole = result.rows[0].role; // Get  role from  database

            const match = await bcrypt.compare(password, storedPasswordHash);

            if (match){
                return{
                    success: true,
                    user_id: result.rows[0].user_id,
                    user_role: userRole // Return role from database
                };
            } else {
                return { success: false, message: "Incorrect password." };
            }
        } else {
            return { success: false, message: "User doesn't exist or incorrect credentials." };
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return {success: false, errors: error};
    } finally{
        client.release();
    }
}

async function userExists(user_id){
    const client = await pool.connect();
    try{
        const result = await client.query(
            `SELECT user_id from users WHERE user_id = $1;`,
            [user_id]
        );

        if (result.rows.length > 0){
            return {success: true}
        } else {
            return {success: false}
        }

    } catch (error) {
        console.error("Error fetching user:", error); //  error
        return {success: false}
    }
}

async function getCompanyNameById(user_id){
    const client = await pool.connect();
    try{
        const result = await client.query(
            `SELECT company_name FROM employers WHERE user_id = $1;`,
            [user_id]
          );

          if (result.rows.length > 0 ){
            return{
                success: true,
                company_name: result.rows[0].company_name
            }
          } else {
            return { success: false, message: "Employer doesnt exist." };
          }
    } catch (error) {
        console.error("Error fetching company name:", error); // Log error
        return {success: false, errors: error}
    } finally{
        client.release()
    }
}

function validateUser(User){
    const errors = [];

    if (!User.email) {
        errors.push('Email is required');
    }

    if (!User.password_hash) {
        errors.push('Password is required');
    }

    if (!User.role) {
        errors.push('Role is required');
    }

    return { isValid: errors.length === 0, errors };
}

function validateEmployer(employer) {
    const errors = [];

    if (!employer.company_name) {
        errors.push('Company name is required');
    }

    if (!employer.contact_phone) {
        errors.push('Contact phone is required');
    }

    if (employer.contact_phone && employer.contact_phone.length > 8){
        errors.push('Contact phone is too long to be a maltese number')
    }

    let validation = validateUser(employer);
    if (!validation.isValid) {
        errors.push(...validation.errors);
    }

    return { isValid: errors.length === 0, errors };
};

function validateEmployee(employee) {
    const errors = [];

    if (!employee.first_name) {
        errors.push('first name is required');
    }

    if (!employee.last_name) {
        errors.push('last_name phone is required');
    }

    console.log(employee)
    if (!employee.contact_phone || !employee.country_code) {
        errors.push('Contact phone is required');
    }


    let validation = validateUser(employee);
    if (!validation.isValid) {
        errors.push(...validation.errors);
    }

    return { isValid: errors.length === 0, errors };
};

async function getEmployeeData(user_id){
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT * FROM employees WHERE user_id = $1;`,
            [user_id]
        )

        if (result.rows.length > 0){
            console.log(result.rows[0])
            return {success: true, employee: result.rows[0]}
        }

        return {success: false, message: "Employee doesnt exist."};

    } catch (error) {
        console.error("Error fetching employee data:", error);
        return {success: false, errors: error}
    } finally {
        client.release()
    }
}

async function getEmployerData(user_id){
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT * FROM employers WHERE user_id = $1;`,
            [user_id]
        )

        if (result.rows.length > 0){
            console.log(result.rows[0])
            return {success: true, employer: result.rows[0]}
        }

        return {success: false, message: "Employer doesnt exist."};

    } catch (error) {
        console.error("Error fetching employer data:", error); 
        return {success: false, errors: error}
    } finally {
        client.release()
    }
}

function getUserData(user_id){

}

function editEmployee(edits) {
}

function editEmployer(edits) {
}

function editUser(edits) {
}





module.exports = {
    insertUser,
    insertEmployer,
    insertEmployee,
    LogInUser,
    userExists,
    getCompanyNameById,
    validateEmployer,
    validateEmployee,
    getEmployeeData,
    getEmployerData,
    getUserData,
    editEmployee,
    editEmployer,
    editUser
};