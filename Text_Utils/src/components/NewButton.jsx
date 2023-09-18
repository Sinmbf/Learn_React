import PropTypes from "prop-types";

const NewButton = ({ type, color, handleClick, text }) => {
  return (
    <button
      type={type}
      className={
        "btn btn-primary btn-sm col-11 col-lg-2 mx-3 my-2 p-2 btn-" + color
      }
      onClick={handleClick}>
      {text}
    </button>
  );
};

NewButton.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

// Default propTypes
NewButton.defaultProps = {
  type: "button",
  color: "danger",
  text: "Button",
};

export default NewButton;
