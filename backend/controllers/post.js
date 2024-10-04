const Posts = require("../models/Posts")

exports.createPostController = async (req, res) => {
    try {
        const posts = await new Posts(req.body).save();
        res.status(201).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// get post

exports.getPostController = async (req, res) => {
    try {

        const { page = 1, limit = 5 } = req.query;
        const posts = await Posts.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total = await Posts.countDocuments();
        res.json({
            posts,
            hasMore: (page * limit) < total,
            nextPage: parseInt(page) + 1,
        });


    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}