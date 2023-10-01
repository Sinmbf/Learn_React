import PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router-dom";
import DropDownItem from "./DropDownItem";

export default class DropDownMenu extends Component {
  render() {
    const { categories } = this.props;
    return (
      <li className="nav-item dropdown">
        <Link
          className={"nav-link dropdown-toggle"}
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          Categories
        </Link>
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <DropDownItem key={category} category={category} {...this.props} />
          ))}
        </ul>
      </li>
    );
  }
}

DropDownMenu.propTypes = {
  categories: PropTypes.array,
};
