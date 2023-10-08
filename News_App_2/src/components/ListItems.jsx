import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListItems({
  listItem,
  changeCategory,
  active,
  setActive,
}) {
  return (
    <>
      <li
        className="nav-item"
        onClick={() => {
          changeCategory("none"), setActive(true);
        }}>
        <Link
          className={active ? "nav-link active" : "nav-link"}
          aria-current="page"
          to="/">
          {listItem}
        </Link>
      </li>
    </>
  );
}

ListItems.propTypes = {
  listItem: PropTypes.string,
  changeCategory: PropTypes.func,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};
