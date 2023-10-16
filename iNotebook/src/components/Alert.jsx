import PropTypes from "prop-types";

const Alert = ({ message, type }) => {
  return (
    <>
      <div
        className={"alert alert-" + type}
        role="alert"
        style={{ height: "4rem" }}>
        <strong>{message}</strong>
      </div>
    </>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Alert;
