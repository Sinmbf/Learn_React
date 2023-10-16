/* eslint-disable no-undef */
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1/iNotebook2"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo successfully");

    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToMongo;