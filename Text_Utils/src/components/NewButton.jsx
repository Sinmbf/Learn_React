import PropTypes from "prop-types";

const NewButton = ({ type, color, text, handleClick, state }) => {
  return (
    <>
      <button
        type={type}
        className={`fs-5 btn btn-sm col-11 col-lg-3 mx-3 my-2 p-2 text-light ${
          color === "black" && "btn-dark"
        }`}
        disabled={state}
        onClick={handleClick}
        style={{ backgroundColor: color !== "black" && color }}>
        {text}
      </button>
    </>
  );
};

NewButton.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  state: PropTypes.bool,
};

// Default propTypes
NewButton.defaultProps = {
  type: "button",
  color: "danger",
  text: "Button",
  state: false,
};

export default NewButton;
