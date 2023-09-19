import PropTypes from "prop-types";

const NewButton = ({ type, color, text, handleClick, state }) => {
  return (
    <>
      <button
        type={type}
        className={
          "fs-5 btn btn-primary btn-sm col-11 col-lg-3 mx-3 my-2 p-2 btn-" +
          color
        }
        disabled={state}
        onClick={handleClick}>
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
