import PropTypes from "prop-types";

const ThemeButton = ({ setThemeColor }) => {
  return (
    <button
      onClick={() => {
        setThemeColor("#ff1d58");
      }}
      style={{
        backgroundColor: "#ff1d58",
      }}></button>
  );
};
ThemeButton.propTypes = {
  setThemeColor: PropTypes.func,
};
export default ThemeButton;
