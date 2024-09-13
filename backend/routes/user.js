const express = require("express");
const { register,activateToken,login, resendVerificationEmail, resetPasswordFindUser, resetPasswordSendToken, resetPasswordVerifyToken, resetPasswordCheckToken, updatePasswordFinally } = require("../controllers/user");
const { authUser } = require("../middleware/authUser");
const router = express.Router();
router.post("/register", register)
router.post("/activate", authUser,activateToken)
router.post("/resendEmail", authUser,resendVerificationEmail)
router.post("/reset-password-find-account", resetPasswordFindUser)
router.post("/rest_Password/send-code", resetPasswordSendToken)
router.post("/rest_Password/check_token", resetPasswordCheckToken)
router.post("/rest_Password/update-password", updatePasswordFinally)
router.post("/rest_Password/code/verify", resetPasswordVerifyToken)
router.post("/login", login)
module.exports = router