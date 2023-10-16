/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const host = "https://inotebook-backend-plum.vercel.app";

  const fetchAllNotes = async () => {
    // API call
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // Helper function to Add notes
  const addNote = async (title, description, tag) => {
    // API call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    if (json.errors) {
      return;
    }
    !json.errors && setNotes((currentNotes) => currentNotes.concat(json));
  };

  // Helper function to Delete notes
  const deleteNote = async (id) => {
    // API call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    console.log(json);
    // fetchAllNotes();

    // LOGIC for delete note client side
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Helper function to Edit notes
  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);
    // fetchAllNotes();
    const newNote = notes.slice(); // Returns a copy of notes array

    // Logic for edit note client side
    newNote.map((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    });
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchAllNotes, addNote, deleteNote, editNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
