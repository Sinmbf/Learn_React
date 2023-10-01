import { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <div
          className="spinner-border text-info my-3"
          style={{ width: "4rem", height: "4rem" }}
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}
