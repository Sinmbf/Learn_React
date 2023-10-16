/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    user: {
        // here you set the user ID from the User collection,
        // so you can reference it
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // ref means that you have kept a reference of another model's document by using its primary key


    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("note", noteSchema);