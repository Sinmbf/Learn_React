import PropTypes from "prop-types";

const NavItem = ({ title, index, selectedIndex, setSelectedIndex }) => {
  return (
    <>
      <li>
        <a
          onClick={() => {
            setSelectedIndex(index);
          }}
          className={index === selectedIndex ? "nav-link active" : "nav-link"}
          style={{ cursor: "pointer" }}>
          {title}
        </a>
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
