const User = require("../models/User");

exports.validateEmail = (email) => String(email).toLowerCase().match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);

exports.validateLength = (str, min, max) => {
    const length = String(str).length;
    return length >= min && length <= max;
}

// validate username
const crypto = require('crypto');

exports.validateUsername = async (username) => {
    let isUsernameTaken = false;
    let attempts = 0;
    const maxAttempts = 10;

    do {
        let check = await User.findOne({ username });
        if (check) {
            const suffix = crypto.randomBytes(3).toString('hex');  // generates a random string
            username = username + "_" + suffix;
            isUsernameTaken = true;
        } else {
            isUsernameTaken = false;
        }
        attempts++;
    } while (isUsernameTaken && attempts < maxAttempts);

    return attempts < maxAttempts ? username : null;
}