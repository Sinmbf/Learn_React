import { Component } from "react";
import ListItems from "./ListItems";
import DropDownMenu from "./DropDownMenu";

export default class NavBar extends Component {
  render() {
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
              <ListItems {...this.props} />
              {/* Dropdown Menu */}
              <DropDownMenu {...this.props} />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
