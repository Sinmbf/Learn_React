import PropTypes from "prop-types";
import react from "react";
import { Link } from "react-router-dom";

export default class ListItems extends react.Component {
  titles = ["Home"];
  render() {
    const { currentCategory, changeCategory } = this.props;
    return (
      <>
        {this.titles.map((title, index) => (
          <li key={title} className="nav-item">
            <Link
              className={`${
                currentCategory === "general" ? "nav-link active" : "nav-link"
              }`}
              aria-current="page"
              to={index === 0 ? "/" : "/" + title}
              onClick={() => changeCategory("general")}>
              {title}
            </Link>
          </li>
        ))}
      </>
    );
  }
}

ListItems.propTypes = {
  currentCategory: PropTypes.string,
};
