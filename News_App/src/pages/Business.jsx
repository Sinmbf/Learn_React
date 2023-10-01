import PropTypes from "prop-types";
import { Component } from "react";
import News from "../components/News";

export default class Sports extends Component {
  render() {
    const { pageSize, country, category } = this.props;
    return <News pageSize={pageSize} country={country} category={category} />;
  }
}

Sports.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};
