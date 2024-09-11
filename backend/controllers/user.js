const { encrypt } = require("../helpers/encryptedData");
const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { validateUser, validateEmailInput } = require("../helpers/validateUserInput");
const { validateUsername } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (
    {
        body: { first_name, last_name, email, password, gender, bYear, bMonth, bDay },
    },
    res, next
) => {
    try {
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