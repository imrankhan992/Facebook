const express = require("express");
const { authUser } = require("../middleware/authUser");
const { createPostController, getPostController } = require("../controllers/post");
const router = express.Router();

router.post("/create-post", authUser, createPostController)
router.get("/get-posts", authUser, getPostController)
module.exports = router;