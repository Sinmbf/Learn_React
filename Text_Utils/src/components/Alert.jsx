import PropTypes from "prop-types";
const Alert = ({ color, text, display }) => {
  return (
    <div
      className={"alert alert-" + color + " alert-dismissible fade show"}
      role="alert"
      style={{ display: display }}>
      <strong> {text}</strong>
      {color === "info" && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"></button>
      )}
    </div>
  );
};

Alert.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  display: PropTypes.string,
};

export default Alert;
