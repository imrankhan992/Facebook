const express = require("express");
const { uploadImages } = require("../controllers/uploadImages");
const { imageUploadMiddleware } = require("../middleware/imagesUpload");
const { authUser } = require("../middleware/authUser");
const router = express.Router();

router.post("/uploadImage",authUser,imageUploadMiddleware, uploadImages)
module.exports = router