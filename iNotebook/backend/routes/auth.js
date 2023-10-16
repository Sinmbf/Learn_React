/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "SinmbfLost";
const fetchUser = require("../middleware/fetchuser");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No Login required
router.post(
  "/createuser",
  [
    body("name", "Invalid name. Must be minimum 3 characters")
      .notEmpty()
      .isLength({ min: 3 })
      .escape(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors then send bad status and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if a user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(409)
          .json({ error: "Sorry a user with the same email already exists" });
      }

      // Create salt and generate a secured password hash
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); // returns a promise

      // If no errors, then create a new uer
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        date: req.body.date,
      });

      // Send user id to generate a json web token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // Send the authToken in json format as response
      res.json({ authToken });
      // res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    res.send("Login");
    // If there are errors then send a Bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the email and password entered by the client
    const { email, password } = req.body;
    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }

      // Compare the password entered by the client with the password stored in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }

      // if correct credentials are entered, send the jwt Token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  }
);

// ROUTE 3: Get loggedIN User details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const userDetails = await User.findById(userId).select("-password");
    res.send(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
