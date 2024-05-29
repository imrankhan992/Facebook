const express = require("express");
const { register,activateToken,login } = require("../controllers/user");
const router = express.Router();
router.post("/register", register)
router.post("/activate", activateToken)
router.post("/login", login)

module.exports = router