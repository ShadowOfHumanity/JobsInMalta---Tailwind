let availableCodes = [356, 44, 49, 1, 39]

function sanitizeString(str) { 
    // this function is used to sanitize strings and help security 
    // of the app
    if (typeof str !== 'string') return str;
    // Remove HTML tags
    str = str.replace(/<[^>]*>/g, '');
    // Trim whitespace
    str = str.trim();
    // Remove multiple spaces
    str = str.replace(/\s\s+/g, ' ');
    return str;
}

function sanitizeCode(code) {
    if (code) {
        let newCode = code.substring(1, code.length);
       
        newCode = parseInt(newCode);
        for (let i = 0; i < availableCodes.length; i++) {
            if (newCode === availableCodes[i]) {
                return code;
            }
        }
    }
    return null; // erorr case
}

module.exports.sanitizeString = sanitizeString;

module.exports.sanitizeCode = sanitizeCode;
