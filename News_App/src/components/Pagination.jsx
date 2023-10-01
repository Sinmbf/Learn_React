import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Pagination extends Component {
  render() {
    let { handleNextClick, handlePreviousClick, page, totalPages } = this.props;
    return (
      <nav aria-label="Page navigation example mt-5">
        <ul className="pagination justify-content-around">
          <li className={`page item ${page <= 1 && "disabled"}`}>
            <Link className="page-link" onClick={handlePreviousClick}>
              Previous
            </Link>
          </li>
          <li className={`page-item ${page >= totalPages && "disabled"}`}>
            <Link className="page-link" to="#" onClick={handleNextClick}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};
