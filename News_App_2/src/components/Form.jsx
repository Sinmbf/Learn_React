import { useState } from "react";
import PropTypes from "prop-types";

export default function Form({ fetchNews }) {
  const [searchItem, setSearchItem] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  // Helper function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.querySelector("input").value;
    fetchNews(inputValue);
    setSearchItem("");
    setBtnDisabled(true);
  };

  return (
    <div className="col-md-6 mt-4">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Eg: Ronaldo"
          aria-label="Search"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
            e.target.value ? setBtnDisabled(false) : setBtnDisabled(true);
          }}
        />
        <button
          className="btn btn-outline-info"
          type="submit"
          disabled={btnDisabled}
          style={{ cursor: btnDisabled ? "not-allowed" : "pointer" }}>
          Search
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  fetchNews: PropTypes.func,
  changeCategory: PropTypes.func,
};
