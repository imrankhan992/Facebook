const express = require("express");
const { register,activateToken,login, resendVerificationEmail } = require("../controllers/user");
const { authUser } = require("../middleware/authUser");
const router = express.Router();
router.post("/register", register)
router.post("/activate", authUser,activateToken)
router.post("/resendEmail", authUser,resendVerificationEmail)
router.post("/login", login)

module.exports = router