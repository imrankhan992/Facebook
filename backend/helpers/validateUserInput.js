const { validateEmail, validateLength } = require("./validation");

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 6;
exports.validateUser = ({ first_name, last_name, email, password }) => {
    let errors = [];
    if (!validateEmail(email)) errors.push("Invalid email address");
    if (!validateLength(first_name, MIN_NAME_LENGTH, MAX_NAME_LENGTH))
        errors.push("FirstName must be between 3 and 30 characters");
    if (!validateLength(last_name, MIN_NAME_LENGTH, MAX_NAME_LENGTH))
        errors.push("LastName must be between 3 and 30 characters");
    if (!validateLength(password, MIN_PASSWORD_LENGTH, MAX_NAME_LENGTH))
        errors.push("Password must be between 6 and 30 characters");
    return errors;
};

exports.validateEmailInput=(email)=>{
    let error ="";
    if (!validateEmail(email)) {error="Invalid email address"}
    return error;
}