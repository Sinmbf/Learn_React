import PropTypes from "prop-types";
const Alert = ({ color, text, visibility }) => {
  return (
    <div
      className={"alert alert-" + color + " alert-dismissible fade show"}
      role="alert"
      style={{
        visibility: visibility,
        height: "35px",
        padding: "0.2em 0.5em",
      }}>
      <strong> {text}</strong>
    </div>
  );
};

Alert.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  visibility: PropTypes.string,
};

export default Alert;
