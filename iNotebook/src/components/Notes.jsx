/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import NoteItem from "./NoteItem";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import Alert from "./Alert";
import AddNote from "./AddNote";
// import Modal from "./Modal";
const Notes = ({ toggleAlert, alert }) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const { notes, fetchAllNotes, addNote, deleteNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchAllNotes();
    } else {
      toggleAlert(
        "Login or sign up to access our application features",
        "info"
      );
      navigate("/login");
    }
  }, []);

  // Function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update note if title and description are given
    editNote(note.id, note.etitle, note.edescription, note.etag);
    toggleAlert("Note updated successfully", "success");
  };

  // Function to handle change
  const handleChange = (e) => {
    setNote((currentNote) => {
      return { ...currentNote, [e.target.name]: e.target.value };
    });
  };

  // Function to update note for editing
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <>
      <AddNote addNote={addNote} toggleAlert={toggleAlert} />
      {/* Modal to update note*/}
      <div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row justify-content-center">
                  <form
                    className="border border-black border-3 p-4 rounded col-md-11"
                    onSubmit={handleSubmit}>
                    <div className="form-floating my-4">
                      <input
                        value={note.etitle}
                        type="text"
                        className="form-control"
                        name="etitle"
                        id="etitle"
                        placeholder="name@example.com"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="etitle"
                        className="form-label text-secondary">
                        Title
                      </label>
                    </div>
                    {/* Description */}
                    <div className="form-floating my-4">
                      <textarea
                        value={note.edescription}
                        className="form-control"
                        name="edescription"
                        id="edescription"
                        rows="6"
                        placeholder="description"
                        onChange={handleChange}
                        style={{ height: "150px" }}></textarea>
                      <label
                        htmlFor="edescription"
                        className="form-label text-secondary">
                        Description
                      </label>
                    </div>
                    {/* Tag */}
                    <div className="form-floating my-4">
                      <input
                        value={note.etag}
                        type="text"
                        name="etag"
                        className="form-control"
                        id="etag"
                        placeholder="tag"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="etag"
                        className="form-label text-secondary">
                        Tag
                      </label>
                    </div>
                    <button
                      disabled={
                        note.etitle.length < 3 ||
                        note.edescription.length < 5 ||
                        !note.etag
                      }
                      type="submit"
                      className="btn btn-success"
                      data-bs-dismiss="modal">
                      Update Note
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="mt-3 text-center">Your Notes</h1>
          {notes?.length === 0 ? (
            <Alert message="No notes stored" type="danger" />
          ) : (
            <Alert
              message={alert.message ? alert.message : null}
              type={alert.type ? alert.type : null}
            />
          )}
          {notes.map((note) => (
            <NoteItem
              key={crypto.randomUUID()}
              {...note}
              deleteNote={deleteNote}
              updateNote={updateNote}
              toggleAlert={toggleAlert}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
