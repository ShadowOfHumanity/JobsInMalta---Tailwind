const { countryCodeMap } = require("./CountryCodeMaps");

let availableCodes = [356, 44, 49, 1, 39]

function sanitizeString(str) { 
    // this function is used to sanitize strings and help security 
    // of the app
    if (typeof str !== 'string') return str;

    str = str.replace(/<[^>]*>/g, '');

    str = str.trim();
    str = str.replace(/\s\s+/g, ' ');
    return str;
}

function sanitizeCode(code) {
    if (countryCodeMap[code]) {
        return code
    }
    return null; // erorr case
}

function sanitizePassword(password){
    if (typeof password !== 'string') return null;
    
    if (password.length < 4 || password.length > 22) {
        return "Password must be between 4 and 22 characters";
    }

    const passwordRegex = /^[a-zA-Z0-9\-_*#@!]{4,22}$/;
    


    if (passwordRegex.test(password)) {
        return false;
    } else {
        return "Password must contain only letters, numbers, and special characters (-_*#@!)";
    }

}

module.exports.sanitizeString = sanitizeString;

module.exports.sanitizeCode = sanitizeCode;

module.exports.sanitizePassword = sanitizePassword; 
