/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all the notes using GET. Login required
router.get("/fetchnotes", fetchUser, async (req, res) => {
    try {
        // Find all the notes of the user by using his id
        const notes = await Note.find({ user: req.id });
        res.send(notes);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
})

// ROUTE 2: Add a new note using POST. Login required
router.post("/addnote", fetchUser, [
    body('title', "Please enter a valid title").notEmpty().escape(),
    body('description', "Description should be minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure title ,description and tag from req body
    const { title, description, tag } = req.body;
    try {
        // If no errors then create a new note
        const note = new Note({
            user: req.id,
            title,
            description,
            tag
        })

        // Save the note
        const savedNote = await note.save();

        // Send the saved note as response
        res.send(savedNote);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
})

// ROUTE 3: Update an existing note using PATCH. Login required
router.patch("/updatenote/:id", fetchUser, [
    body('title', "Please enter a valid title").notEmpty().escape(),
    body('description', "Description must be minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors, then send bad request and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure title,description and tag entered by the user
    const { title, description, tag } = req.body;

    try {
        // Check if the entered values are not empty
        let newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Check if the note exists
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note doesn't exist");
        }

        // Check if note that the client is trying to update belongs to him
        if (note.user.toString() !== req.id) {
            return res.status(401).send("Not allowed");
        }

        // If the note belongs to the user then update it
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
})

// ROUTE 4: Delete an existing note by using DELETE. Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        // Check if the note exists
        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send("Note doesn't exist");
        }

        // Check if the notes belong to the client
        if (note.user.toString() !== req.id) {
            return res.status(401).send("Note allowed");
        }

        // If the note belongs to the client then delete it
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note deleted", note });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;