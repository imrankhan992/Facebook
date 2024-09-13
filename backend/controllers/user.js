const { encrypt, decrypt } = require("../helpers/encryptedData");
const { generateFiveDigitCode } = require("../helpers/generate5DigitCode");
const { getLocationFromIP } = require("../helpers/getLocationFromIpAddress");
const { sendVerificationEmail, sendResetCodeEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { validateUser, validateEmailInput } = require("../helpers/validateUserInput");
const { validateUsername } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (
    req,
    res, next
) => {
    try {
        const { first_name, last_name, email, password, gender, bYear, bMonth, bDay } = req.body
        const errors = validateUser({ first_name, last_name, email, password });
        if (errors.length > 0) throw new Error(errors.join(', '));

        const check = await User.findOne({ email });
        if (check)
            return res
                .status(400)
                .json({
                    message:
                        "Email is already registered please try different email address",
                });
        const hashedPassword = await bcrypt.hash(password, 10);
        const tempUserName = first_name + last_name;
        const newUserName = await validateUsername(tempUserName);
        if (newUserName === null) {
            throw new Error("Couldn't generate a unique username. Please try a different name.");
        }

        // Get the IP address from the request using render server

        const ipAddress = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        console.log(ipAddress, "this is ip address");

        // Get the location from the IP address
        // const location = await getLocationFromIP(ipAddress);
        // console.log(location);
        const user = new User({
            first_name,
            last_name,
            username: newUserName,
            email,
            password: hashedPassword,
            gender,
            bYear,
            bMonth,
            bDay,
        });

        const emailVerificationToken = generateToken({ id: user?._id.toString() }, "30m");
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user?.email, user?.first_name, url);
        await user.save();
        const token = generateToken({ id: user?._id.toString() }, "7d");
        res.send({
            success: true,
            token,
            id: user?._id,
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
            email: user?.email,
            verified: user?.verified,
            picture: user?.picture,
            message: "User registered successfully ! Please verify your email address to Start",
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.activateToken = async (req, res, next) => {
    try {
        const validateUser = req?.user;
        const token = req.body.token;
        if (!token) throw new Error("Invalid token");
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (validateUser !== verifyToken?.id) throw new Error("Your are not authorized to activate this account");

        const user = await User.findById(verifyToken?.id);
        if (!user) throw new Error("Invalid token");
        if (user.verified) throw new Error("Email already activated");
        user.verified = true;
        await user.save();
        res.status(200).json({ message: "Account has been activated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const TOKEN_EXPIRATION_TIME = "7d";

exports.login = async (req, res) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const { email, password } = req.body;

        // Only fetch the necessary fields
        const user = await User.findOne({ email }, 'password first_name last_name username email verified picture ').lean();

        if (!user) throw new Error("The email you enter is not connected to any account. Please try again.");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Invalid credentials. Please try again.");

        const token = generateToken({ id: user._id.toString() }, "7d");

        const { _id, first_name, last_name, username, verified, picture } = user;

        res.send({

            token,
            id: _id,
            first_name,
            last_name,
            username,
            email: user.email,
            verified,
            picture,
            message: "User logged in successfully",
            success: true
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
// resend verification email
exports.resendVerificationEmail = async (req, res) => {
    try {
        const id = req?.user
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        if (user.verified) throw new Error("Email already verified");
        const emailVerificationToken = generateToken({ id: user._id.toString() }, "30m");
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user.email, user.first_name, url);
        res.send({ success: true, message: "Verification email sent to your email" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

// get user name id email profile picture and encrypt it and send it to the frontend
exports.resetPasswordFindUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw new Error("Email is required");

        const emailError = validateEmailInput(email);
        if (emailError) throw new Error(emailError);

        const user = await User.findOne({ email }, 'first_name last_name email picture -_id').lean().exec();
        if (!user) throw new Error("Your search did not return any results. Please try again with other information.");

        // Encrypt user data
        const encryptedData = encrypt(user);
        const redirectUrl = `${process.env.BASE_URL}/recover/initiate?data=${encodeURIComponent(encryptedData)}`;
        return res.redirect(redirectUrl);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};


// send token to the user email
exports.resetPasswordSendToken = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw new Error("Email is required");

        const emailError = validateEmailInput(email);
        if (emailError) throw new Error(emailError);

        const user = await User.findOne({ email }, 'first_name last_name email').exec();
        if (!user) throw new Error("Your search did not return any results. Please try again with other information.");
        const token = generateToken({ id: user._id.toString(), email: user?.email?.toString() }, "30m");
        const encryptedToken = encrypt(token);
        const code = generateFiveDigitCode()
        let url = `${process.env.BASE_URL}/recover/code/?`;
        const action = 'send_email';
        const cuid = encryptedToken;
        url += `em[0]=${encodeURIComponent(email)}&`;
        url += `rm=${encodeURIComponent(action)}&`;
        url += `cuid=${encodeURIComponent(cuid)}`;
        if (!code || !url) throw new Error('something went wrong while generating code');
        let userName = user.first_name + " " + user.last_name
        await sendResetCodeEmail(email, userName, code);
        user.resetCode = code.toString();
        //    expires the code after 30 minutes because the token expires after 30 minutes
        user.resetCodeExpires = Date.now() + 1800000;
        await user.save();
        res.redirect(url);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

// verify token and send it to the frontend
exports.resetPasswordVerifyToken = async (req, res) => {
    try {
        const { cuid, resetCode } = req.body;
        // if reset code includes any letters
        if (resetCode.match(/[a-z]/i)) throw new Error("It looks like you've entered some letters. Your code is 5 numbers long..");
        if (!resetCode) throw new Error("Please enter a code.");

        if (resetCode.length !== 5) throw new Error(`You've only entered ${resetCode.trim().length}  numbers. Please check your code and try again.`);
        if (!cuid) throw new Error("You've only entered 5 numbers. Please check your code and try again.");
        const decryptedToken = decrypt(decodeURIComponent(cuid));
        const verifyToken = jwt.verify(decryptedToken, process.env.TOKEN_SECRET);
        if (!verifyToken) throw new Error("You've only entered 5 numbers. Please check your code and try again.");
        const user = await User.findById(verifyToken?.id);
        if (!user) throw new Error("You've only entered 5 numbers. Please check your code and try again.");
        if (user.resetCode !== resetCode) throw new Error("The number that you've entered doesn't match your code. Please try again.");
        if (user.resetCodeExpires < Date.now()) throw new Error("The code you entered has expired. Please request a new one.");
        user.resetCode = null;
        user.resetCodeExpires = null;
        const token = generateToken({ id: user._id.toString() }, "30m");
        user.resetJwtToken = token;
        user.resetJwtTokenExpires = Date.now() + 1800000;
        await user.save();
        const encryptToken = encrypt(token);
        const recoveryLink = `${process.env.BASE_URL}/recover/password?sec_Id=${encodeURIComponent(encryptToken)}`;
        res.redirect(recoveryLink);

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

// check sec_Id if this is valid then send ok response to the frontend if not then send error response
exports.resetPasswordCheckToken = async (req, res) => {
    try {
        const { sec_Id } = req.body;

        if (!sec_Id) throw new Error("Invalid token");
        const decryptedToken = decrypt(sec_Id);
        const verifyToken = jwt.verify(decryptedToken, process.env.TOKEN_SECRET);
        if (!verifyToken) throw new Error("Invalid token");
        res.send({ success: true, message: "Token is valid" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

// finally reset password first check sec_Id if this is valid or not then update password

exports.updatePasswordFinally = async (req, res) => {
    try {
        const { sec_Id, password } = req.body;
        console.log(sec_Id, password);
        if (!password) throw new Error("You cannot use a blank password.");
        if (!sec_Id) throw new Error("Invalid token");
        const decryptedToken = decrypt(sec_Id);
        const verifyToken = jwt.verify(decryptedToken, process.env.TOKEN_SECRET);
        if (!verifyToken) throw new Error("Invalid token");
        const user = await User.findById(verifyToken?.id).exec();
        if (!user) throw new Error("Invalid token");
        if (user.resetJwtToken !== decryptedToken) throw new Error("Invalid token");
        if (user.resetJwtTokenExpires < Date.now()) throw new Error("Token has expired. Please request a new one.");
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetJwtToken = null;
        user.resetJwtTokenExpires = null;
        await user.save();
        // send user except password
        // Convert user document to a plain JavaScript object and remove password
        const { password: pass, ...userWithoutPassword } = user.toObject();

        // Send user without password
        res.send({ success: true, message: "Password updated successfully", user: userWithoutPassword });
       


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }

}