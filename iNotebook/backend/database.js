/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1/iNotebook"

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => console.log("Connected to Mongo successfully")).catch(error => console.log(error));
}

module.exports = connectToMongo;