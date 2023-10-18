require('dotenv').config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SinmbfLost";
const fetchUser = require("../middleware/fetchUser");
const cors = require("cors")
const { body, validationResult } = require("express-validator");

router.use(cors({
    origin: "",
    credentials: true
}));
// ROUTE 1:Create a user using POST: /api/auth/login. No login required
router.post("/createuser", [
    body("name", "Please enter a valid name with at least 3 characters").isLength({ min: 3 }).escape(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Passwords must be minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then send bad request and display errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).json({ error: "Sorry a user with the email already exists" });
        }

        // Generate a secured password using bcrypt hash and salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // If user doesn't exist then create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // Generate a auth token using jwt token and user Id
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, JWT_SECRET);

        // Send the authToken as response to the client
        res.json({ authToken });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

})

// ROUTE 2: Authenticate a client trying to login using POST: /api/auth/login. No login required
router.post("/login", [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Passwords must be minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Get email and password entered by the client
        const { email, password } = req.body;
        // Check if a user with the email exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        // Check if the password entered matches the one stored in the database
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        // If email and password are correct then send the auth token
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = await jwt.sign(data, JWT_SECRET);

        // Send the authToken as response
        res.json({ authToken });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
})

// ROUTE 3: Get user details using POST:/api/auth/getuser. Login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        // Find the user details using his/her id
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).send("User not found")
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;