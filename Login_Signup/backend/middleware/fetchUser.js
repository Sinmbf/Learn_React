const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(400).send("Invalid authentication token");
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        req.userId = data.user.id;
        next();
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }

}

module.exports = fetchUser;