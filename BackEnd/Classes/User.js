const { sanitizeString } = require('../Extras/Sanitizers');
const bcrypt = require('bcrypt');

class User {
  constructor(email, password, role) {
    this.email = email;
    this.password_hash = this.hashPassword(password);
    this.role = role;
  }

    hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }
}

class Employer extends User {
  constructor(email, password, company_name, contact_phone, company_description, country_code) {
    super(email, password, "employer");
    this.company_name = company_name;
    this.contact_phone = contact_phone;
    this.country_code = country_code
    this.company_description = company_description || null;
  }

  setCompanyDescription(company_description) {
    this.company_description = company_description;
  }
}

class Employee extends User {
  constructor(
    email,
    password,
    first_name,
    last_name,
    professional_title,
    bio,
    skills,
    experience_years,
    education_level,
    portfolio_url,
    contact_phone,
    country_code
  ) {
    super(email, password, "employee");
    this.first_name = first_name;
    this.last_name = last_name;
    this.contact_phone = contact_phone;
    this.country_code = country_code;
    this.professional_title = professional_title || null;
    this.bio = bio || null;
    this.skills = skills || null;
    this.experience_years = experience_years || null;
    this.education_level = education_level || null;
    this.portfolio_url = portfolio_url || null;
  }

  setBio(bio){
    this.bio = bio
  }

  setSkills(new_skills){
    if (Array.isArray(new_skills)) {
      this.skills = new_skills
    }
  }

  setProfessionalTitle(professional_title){
    this.professional_title = sanitizeString(professional_title)
  }
  
  setExperienceYears(){
    this.experience_years = parseInt(experience_years)
  }

  setEducationLevel(){
    this.education_level = parseInt(education_level)
  }

  setPortfolioUrl(){
    this.portfolio_url = this.portfolio_url;
  }

}


module.exports = { User, Employer, Employee };