import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Component } from "react";

export default class DropDownItem extends Component {
  render() {
    const { category, changeCategory } = this.props;
    return (
      <li>
        <Link
          className="dropdown-item"
          onClick={() => changeCategory(category)}
          to="/">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      </li>
    );
  }
}

DropDownItem.propTypes = {
  category: PropTypes.string,
  changeCategory: PropTypes.func,
};
