const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// ROUTE 1:Create a user using POST. No login required
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

    // Check if a user with the same email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(401).send("Sorry a user with the email already exists");
    }

    // If user doesn't exist then create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    res.json(user);
})

module.exports = router;