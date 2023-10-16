import PropTypes from "prop-types";
const NoteItem = (props) => {
  return (
    <>
      <div className="col-md-4 g-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <h5>
              <span className="badge bg-primary">{props.tag}</span>
            </h5>

            {/* <h6 className="card-subtitle mb-2 text-body-secondary">{tag}</h6> */}
            <p className="card-text">{props.description}</p>
          </div>
          <div className="buttons p-2">
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                props.deleteNote(props._id);
                props.toggleAlert("Note deleted", "danger");
              }}></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => props.updateNote(props)}></i>
          </div>
        </div>
      </div>
    </>
  );
};

NoteItem.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  tag: PropTypes.string,
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  toggleAlert: PropTypes.func,
};

export default NoteItem;
