const Posts = require("../models/Posts")

exports.createPostController = async (req, res) => {
    try {
        const posts = await new Posts(req.body).save();
        res.status(201).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}