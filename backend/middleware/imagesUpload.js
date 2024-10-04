const fs = require("fs");

exports.imageUploadMiddleware = async (req, res, next) => {
    try {
        let files = req.files;
        if (!files || Object.values(files).flat().length === 0) {
            throw new Error("No files were submitted.")
        }
        files = Object.values(files).flat();

        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const maxSize = 5 * 1024 * 1024; // 5MB max size
        const errors = [];

        for (let file of files) {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.mimetype}. Only images are allowed.`);
            }
            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}. Maximum size allowed is 5MB.`);
            }
        }

        // Remove temporary files if there are errors
        if (errors.length > 0) {
            files.forEach(file => removeTmp(file.tempFilePath));
            throw new Error(errors)
        }

        req.files = files;
        next();
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({ message: error.message });
        
    }
};

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};
