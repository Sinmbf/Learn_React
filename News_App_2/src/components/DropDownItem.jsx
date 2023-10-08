import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function DropDownItem({ category, changeCategory, setActive }) {
  return (
    <>
      <li>
        <Link
          className={"dropdown-item"}
          to="/categories"
          onClick={() => {
            changeCategory(category), setActive(false);
          }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      </li>
    </>
  );
}

DropDownItem.propTypes = {
  category: PropTypes.string,
  changeCategory: PropTypes.func,
  setActive: PropTypes.func,
};
