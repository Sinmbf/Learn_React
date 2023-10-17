const connectToMongo = require("./database");
const express = require("express");
const User = require("./models/User")
connectToMongo();
const app = express();

const port = 5000;

// Middleware to parse req body
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})