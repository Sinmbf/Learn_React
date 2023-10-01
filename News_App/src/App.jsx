import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  // Api Key1 ==> fcbb5c96f74a49d18a58bba4c257b1a0
  // Api Key2 ==> 4fc0306641b64a8c9d5a1ca360d45930
  // Api search => https://newsapi.org/v2/top-headlines?apiKey=fcbb5c96f74a49d18a58bba4c257b1a0&q=football
  apiKey = import.meta.env.VITE_KEY2;

  constructor() {
    super();
    this.state = { category: "general", progress: 0 };
  }

  // Function to change category state on click
  changeCategory = (category) => {
    this.setState({ category: category });
  };

  // Function to change top loading progress
  changeProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    const categories = [
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ];
    return (
      <>
        {/* NavBar */}
        <NavBar
          categories={categories}
          currentCategory={this.state.category}
          changeCategory={this.changeCategory}
        />
        {/* Top Loading Bar */}
        <LoadingBar color="#f11946" progress={this.state.progress} height={3} />
        {/*  */}
        <Routes>
          <Route
            path="/"
            element={
              <News
                key={this.state.category}
                apiKey={this.apiKey}
                changeProgress={this.changeProgress}
                pageSize={15}
                category={this.state.category}
                country={"us"}
              />
            }
          />
        </Routes>
      </>
    );
  }
}
