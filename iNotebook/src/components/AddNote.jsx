/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState } from "react";

const AddNote = ({ addNote, toggleAlert }) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // If title and description are not empty then add note
    note.title &&
      note.description &&
      addNote(note.title, note.description, note.tag);
    toggleAlert("Note added successfully", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  const handleChange = (e) => {
    setNote((currentNote) => ({
      ...currentNote,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="text-center">
        <h1>Add a note</h1>
      </div>
      <div className="row justify-content-center">
        <form
          className="border border-black border-3 p-4 rounded col-md-10"
          onSubmit={onSubmit}>
          <div className="form-floating my-4">
            <input
              value={note.title}
              type="text"
              minLength={3}
              required
              className="form-control"
              name="title"
              id="title"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label htmlFor="title" className="form-label text-secondary">
              Title
            </label>
          </div>
          {/* Description */}
          <div className="form-floating my-4">
            <input
              value={note.description}
              className="form-control"
              minLength={5}
              required
              name="description"
              id="description"
              placeholder="description"
              style={{ height: "60px" }}
              onChange={handleChange}></input>
            <label htmlFor="description" className="form-label text-secondary">
              Description
            </label>
          </div>
          {/* Tag */}
          <div className="form-floating my-4">
            <input
              value={note.tag}
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              placeholder="tag"
              onChange={handleChange}
            />
            <label htmlFor="tag" className="form-label text-secondary">
              Tag
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className={"btn btn-dark"}>
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

AddNote.propTypes = {
  addNote: PropTypes.func,
  toggleAlert: PropTypes.func,
};

export default AddNote;
