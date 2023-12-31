import PropTypes from "prop-types";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const NavBar = ({ title, selectedIndex, setSelectedIndex, theme }) => {
  const navItems = ["Home", "About"];
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-${
          theme.backgroundColor === "black" && "dark"
        }`}
        data-bs-theme="dark"
        style={theme}>
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => setSelectedIndex(0)}>
            {title}
          </Link>
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
          </div>
        </div>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
  theme: PropTypes.object,
};

// Default propTypes
NavBar.defaultProps = {
  theme: "primary",
  title: "Nav Title Here",
};

export default NavBar;
