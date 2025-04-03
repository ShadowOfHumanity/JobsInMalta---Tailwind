const { sanitizeString } = require('../Extras/Sanitizers');
const bcrypt = require('bcrypt');

class User {
  constructor(email, password, role, location, contact_phone, country_code) {
    this.email = email;
    this.password_hash = this.hashPassword(password);
    this.role = role;
    this.location = location
    this.contact_phone = contact_phone
    this.country_code = country_code
  }

    hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }
}

class Employer extends User {
  constructor(email, password, company_name, company_description) {
    super(email, password, "employer", location, contact_phone, country_code);
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
    education,
    portfolio_url,
  ) {
    super(email, password, "employee", location, contact_phone, country_code);
    this.first_name = first_name;
    this.last_name = last_name;
    this.professional_title = professional_title || null;
    this.bio = bio || null;
    this.education = education || null;
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