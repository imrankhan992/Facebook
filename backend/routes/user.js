const express = require("express");
const { register,activateToken,login, resendVerificationEmail, resetPasswordFindUser } = require("../controllers/user");
const { authUser } = require("../middleware/authUser");
const router = express.Router();
router.post("/register", register)
router.post("/activate", authUser,activateToken)
router.post("/resendEmail", authUser,resendVerificationEmail)
router.post("/reset-password-find-account", resetPasswordFindUser)
router.post("/login", login)

module.exports = router