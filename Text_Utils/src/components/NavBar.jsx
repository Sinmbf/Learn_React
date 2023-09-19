import PropTypes from "prop-types";
import NavItem from "./NavItem";

const NavBar = ({
  title,
  selectedIndex,
  setSelectedIndex,
  styleTheme,
  toggleTheme,
  btnText,
}) => {
  const navItems = ["Home", "About"];
  // Helper function to change theme onClick
  return (
    <nav
      className={`navbar navbar-expand-lg`}
      data-bs-theme="dark"
      style={styleTheme}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <NavItem
                key={item}
                title={item}
                index={index}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            ))}
          </ul>
          {/* Toggle Theme Button */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              onClick={toggleTheme}
              id="flexSwitchCheckDefault"
              style={{ height: "2rem", width: "4rem", cursor: "pointer" }}
            />
            <label
              className={
                styleTheme.backgroundColor === "black"
                  ? "text-light"
                  : "text-black" + " form-check-label "
              }
              htmlFor="flexSwitchCheckDefault"
              style={{ marginTop: ".4rem" }}>
              {btnText}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
  styleTheme: PropTypes.object,
  toggleTheme: PropTypes.func,
  btnText: PropTypes.string,
};

// Default propTypes
NavBar.defaultProps = {
  theme: "primary",
  title: "Nav Title Here",
};

export default NavBar;
