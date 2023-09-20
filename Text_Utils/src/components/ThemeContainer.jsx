import PropTypes from "prop-types";
import { useState } from "react";

const ThemeContainer = ({ setThemeColor, themes }) => {
  const [hideDisplay, setHideDisplay] = useState(true);
  return (
    <div className="themeContainer">
      <button
        className="themeBtn"
        onClick={() => {
          hideDisplay ? setHideDisplay(false) : setHideDisplay(true);
        }}>
        <i className="bi bi-gear-wide-connected"></i>
      </button>
      <div
        className="themes bg-secondary rounded"
        style={{ display: hideDisplay && "none" }}>
        {/* Toggle Theme Button */}
        {themes.map((item) => (
          <button
            key={crypto.randomUUID()}
            onClick={() => {
              setThemeColor(item.backgroundColor);
            }}
            style={{
              backgroundColor: item.backgroundColor,
            }}></button>
        ))}
      </div>
    </div>
  );
};

ThemeContainer.propTypes = {
  setThemeColor: PropTypes.func,
  themes: PropTypes.array,
};

export default ThemeContainer;
