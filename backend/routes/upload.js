const express = require("express");
const { uploadImages } = require("../controllers/uploadImages");
const { imageUploadMiddleware } = require("../middleware/imagesUpload");
const router = express.Router();

router.post("/uploadImage",imageUploadMiddleware, uploadImages)
module.exports = router