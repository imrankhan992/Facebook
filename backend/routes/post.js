const express = require("express");
const { authUser } = require("../middleware/authUser");
const { createPostController } = require("../controllers/post");
const router = express.Router();

router.post("/create-post", authUser, createPostController)
module.exports = router;