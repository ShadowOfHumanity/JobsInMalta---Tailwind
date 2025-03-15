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

module.exports.sanitizeString = sanitizeString;
