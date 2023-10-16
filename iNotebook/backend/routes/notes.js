/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



// ROUTE 1: Get all the notes using GET "api/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
})

// ROUTE 2: Add a new note using POST "api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
    body('title', "Please add a valid title with minimum 3 characters").notEmpty().isLength({ min: 3 }).escape(),
    body('description', "Description should be minimum 5 characters").isLength({ min: 5 })
], async (req, res) => {

    // If there are errors then send bad status and display the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Destructure the details entered by the client
    const { title, description, tag } = req.body

    try {
        // If no errors then create a new note
        const note = new Note({
            user: req.user.id,
            title,
            description,
            tag: tag ? tag : "General"
        })

        // Save the notes
        const savedNote = await note.save();

        // Send the saved notes as response
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }

})

// ROUTE 3: Update an existing note using PATCH "api/notes/updatenote". Login required

/*
    1. PATCH as it name says, it updates only the data which we changed and doesn't sends whole payload.
    2. PUT sends the whole body payload and pastes into the DB which might not be good for overall performance of the API when scaled it.
*/

router.patch("/updatenote/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a new note object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }


        // Find the note to be updated and then update it
        let note = await Note.findById(req.params.id);

        // Check if the notes exists
        if (!note) {
            return res.status(404).send("Not found")
        }

        // Check if the user is trying to update the note that belongs to him
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // If the notes belong to the user then update it
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }

})

// ROUTE 4: Delete an existing note using DELETE "api/notes/deletenote". Login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {

    try {
        // Find the note to be deleted and then delete it
        let note = await Note.findById(req.params.id);

        // Check if the notes exists
        if (!note) {
            return res.status(404).send("Not found")
        }

        // Check if the user is trying to delete the note that belongs to him
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // If the notes belong to the user then delete it
        note = await Note.findByIdAndDelete(req.params.id, { new: true });
        res.json({ "Success": "Note has been deleted", note });

    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }

})


module.exports = router;