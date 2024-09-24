const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

exports.uploadImages = async (req, res) => {
    try {
        if (!req.files || Object.values(req.files).flat().length === 0) {
            return res.status(400).json({ error: "No files were submitted." });
        }

        const files = Object.values(req.files).flat();
        const { path } = req.body;
        let uploadedImages = [];

        // Use Promise.all to handle uploads in parallel
        const uploadPromises = files.map((file) =>
            cloudinaryUploader(file, path)
                .then((url) => {
                    uploadedImages.push(url);
                })
                .catch((err) => {
                    throw err;
                })
        );
        console.log("uploadPromises", uploadPromises);

        await Promise.all(uploadPromises);

        await Promise.all(files.map((file) => removeTmp(file.tempFilePath)));

        return res.status(201).json(uploadedImages);
    } catch (error) {
        if (uploadedImages.length > 0) {
            await Promise.all(
                uploadedImages.map((img) =>
                    cloudinary.v2.uploader.destroy(img.public_id)
                )
            );
        }
        return res.status(500).json({ error: error.message });
    }
};

const cloudinaryUploader = (file, path) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            { folder: path },
            (error, result) => {
                if (error) {
                    reject(new Error(error.message));
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            }
        );
    });
};

const removeTmp = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
