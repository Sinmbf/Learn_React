/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database");
connectToMongo();

const app = express();
const port = 5000;

// MIddleware to fix the cors
app.use(cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
}))
// Middleware to parse the  req body 
app.use(express.json());

// Available Routes
app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))


app.listen(port, () => {
    console.log(`iNotebook backend listening on port https://localhost:${port}`);
})

