const checkPasswordStrength = (pwd) => {
    let strengthMessage = ""
    let strength = 0;

    if (pwd.length >= 6) strength++; // Minimum length check
    if (/[A-Z]/.test(pwd)) strength++; // Check for uppercase
    if (/[a-z]/.test(pwd)) strength++; // Check for lowercase
    if (/[0-9]/.test(pwd)) strength++; // Check for numbers
    if (/[^A-Za-z0-9]/.test(pwd)) strength++; // Check for special characters

    // Set strength message based on the rules
    if (pwd.length < 6) {
        strengthMessage = "Password is too short."
    } else if (strength === 1 || strength === 2) {
        strengthMessage = "Weak password."
    } else if (strength === 3) {
        strengthMessage = "Medium strength password."
    } else if (strength > 3) {
        strengthMessage = "Strong password."
    } else {
        strengthMessage = ""
    }
    return strengthMessage;
}

export default checkPasswordStrength;