const jwt = require("jsonwebtoken");
exports.authUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Invalid Authentication" });
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: error.message })

    }
}