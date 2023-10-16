/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "SinmbfLost";
const fetchUser = require("../middleware/fetchUser");



// ROUTE 1: Create a new user using POST. No Login required

router.post("/createuser", [
    body('name', 'Please enter a valid name').notEmpty().escape(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Passwords must be minimum 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: req.body.email });

        // If the user with same email already exists then send a proper response
        if (user) {
            return res.status(409).send("Sorry a user with the email already exists");
        }

        // Create a secured password hash with salt using bcrypt 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        // If the user doesn't exist then create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            date: req.body.date
        })

        // Create a jwt token using the user id and send it as response
        const data = {
            id: user.id
        }
        const authToken = await jwt.sign(data, JWT_SECRET);
        res.json(authToken)
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Internal Server Error");
    }

})

// ROUTE 2: Authenticate the user using POST. No Login required
router.post("/login", [
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Passwords must be minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Destructure email and password entered by the user
        const { email, password } = req.body;

        // Check if the email entered matches the one stored in the database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Incorrect email or password");
        }

        // Check if the password is correct
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).send("Incorrect email or password");
        }

        // If email and password are correct then create a authentication token
        const data = {
            id: user.id
        }
        const token = jwt.sign(data, JWT_SECRET);

        // Send the jwt authentication token as response to the client
        res.json({ "auth-token": token })
    } catch (error) {
        console.error(error);
        res.status(400).send("Internal Server Error");
    }

})

// ROUTE 3: Get the user details using POST. No Login required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.id;
        const userDetails = await User.findById(userId).select("-password");
        res.send(userDetails);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
})

module.exports = router;