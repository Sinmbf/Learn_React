const connectToMongo = require("./database");
const express = require("express");
const User = require("./models/User");
const cors = require("cors")
connectToMongo();
const app = express();

const port = 5000;

// Middleware to fix cors
app.use(cors({
    origin:["https://login-signup-frontend-lovat.vercel.app"],
    methods:["POST"],
    credentials:true
}));
app.get("/", (req, res) => {
    res.send("Hello Sinmbf")
})
app.get("/api/auth/login", (req, res) => {
    res.send("Login Sinmbf")
})
// Middleware to parse req body
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
