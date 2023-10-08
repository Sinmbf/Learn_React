import { Link } from "react-router-dom";
import DropDownItem from "./DropDownItem";
import PropTypes from "prop-types";

export default function DropDownMenu({
  newsCategories,
  currentCategory,
  changeCategory,
  setActive,
}) {
  return (
    <>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          Categories
        </Link>
        <ul className="dropdown-menu">
          {newsCategories.map((category) => (
            <DropDownItem
              key={category}
              category={category}
              currentCategory={currentCategory}
              changeCategory={changeCategory}
              setActive={setActive}
            />
          ))}
        </ul>
      </li>
    </>
  );
}

DropDownMenu.propTypes = {
  newsCategories: PropTypes.array,
  currentCategory: PropTypes.string,
  changeCategory: PropTypes.func,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};
