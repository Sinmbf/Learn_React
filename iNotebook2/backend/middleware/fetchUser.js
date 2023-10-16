/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SinmbfLost";
const fetchUser = async (req, res, next) => {
    // Check if a valid token is sent in the request header
    const token = req.header("auth-token");
    if (!token) {
        return res.status(400).send("Please authenticate using a valid token")
    }

    try {
        const data = await jwt.verify(token, JWT_SECRET);
        req.id = data.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = fetchUser;
