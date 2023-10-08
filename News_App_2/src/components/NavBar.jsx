import DropDownMenu from "./DropDownMenu";
import ListItems from "./ListItems";
import PropTypes from "prop-types";
import { useState } from "react";

export default function NavBar({
  newsCategories,
  currentCategory,
  changeCategory,
}) {
  const [active, setActive] = useState(true);
  const listItems = ["Home"];
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Fool&apos;s <span className="text-info">News</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* List Item */}
            {listItems.map((item) => (
              <ListItems
                key={item}
                listItem={item}
                changeCategory={changeCategory}
                active={active}
                setActive={setActive}
              />
            ))}
            {/* Dropdown Menu Item */}
            <DropDownMenu
              newsCategories={newsCategories}
              currentCategory={currentCategory}
              changeCategory={changeCategory}
              active={active}
              setActive={setActive}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  newsCategories: PropTypes.array,
  currentCategory: PropTypes.string,
  changeCategory: PropTypes.func,
};
