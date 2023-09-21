import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavItem = ({ title, index, selectedIndex, setSelectedIndex }) => {
  return (
    <>
      <li>
        <Link
          to={title === "Home" ? "/" : "/" + title.toLowerCase()}
          onClick={() => {
            setSelectedIndex(index);
          }}
          className={index === selectedIndex ? "nav-link active" : "nav-link"}
          style={{ cursor: "pointer" }}>
          {title}
        </Link>
      </li>
    </>
  );
};

NavItem.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
};

export default NavItem;
