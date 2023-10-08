import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NavBar from "./components/NavBar";
import News from "./components/News";
import News1 from "./components/News1";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);
  const newsCategories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [category, setCategory] = useState("general");
  // Helper function to change the category
  const changeCategory = (category) => {
    setCategory(category);
  };

  // Helper function to update progress
  const updateProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <>
      {/* NavBar */}
      <NavBar
        newsCategories={newsCategories}
        changeCategory={changeCategory}
        currentCategory={category}
      />
      {/* Top Loading Bar */}
      <LoadingBar
        color="#0DCAF0"
        height={3}
        progress={progress}
        updateProgress={updateProgress}
      />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<News updateProgress={updateProgress} />} />
        <Route
          path="/categories"
          element={
            <News1
              updateProgress={updateProgress}
              currentCategory={category}
              changeCategory={changeCategory}
            />
          }
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
