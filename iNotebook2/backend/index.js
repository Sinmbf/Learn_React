/* eslint-disable no-undef */
const express = require("express");
const connectToMongo = require("./database");
connectToMongo();
const app = express();
const port = 5000;

// A middleware to parse the request body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Sinmbf")
})

// Available Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})