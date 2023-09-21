import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import NavBar from "./components/NavBar";
import TextForm from "./pages/TextForm";
import { useState, useEffect } from "react";
import AboutSection from "./pages/AboutSection";
import Footer from "./components/Footer";
import ThemeContainer from "./components/ThemeContainer";
import { Route, Routes } from "react-router-dom";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [themeColor, setThemeColor] = useState("#0f2862");
  const body = document.querySelector("body");
  const themes = [
    {
      backgroundColor: "#0f2862",
      bodyColor: "#091f36",
      btnColor: "#0049B7",
    },
    {
      backgroundColor: "#ff8928",
      bodyColor: "#ffde22",
      btnColor: "#ff8928",
    },
    {
      backgroundColor: "#ff1d58",
      bodyColor: "#fff5d7",
      btnColor: "#ff5e6c",
    },
    {
      backgroundColor: "black",
      bodyColor: "black",
      btnColor: "black",
    },
    {
      backgroundColor: "#1d1145",
      bodyColor: "#d0bdf4",
      btnColor: "#1d1145",
    },
  ];
  let styleTheme;
  themes.map((theme) => {
    theme.backgroundColor === themeColor && (styleTheme = theme);
  });
  // themeColor === "#0f2862" && (styleTheme = themes[0]);

  const [theme, setTheme] = useState(styleTheme);
  useEffect(() => {
    body.style.backgroundColor = styleTheme.bodyColor;
    setTheme({
      backgroundColor: styleTheme.backgroundColor,
      btnColor: styleTheme.btnColor,
    });
  }, [
    body.style,
    styleTheme.backgroundColor,
    styleTheme.bodyColor,
    styleTheme.btnColor,
  ]);

  return (
    <>
      {/* Nav Bar */}
      <NavBar
        theme={theme}
        setThemeColor={setThemeColor}
        title="TextUtils"
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {/* Theme Button */}
      <ThemeContainer setThemeColor={setThemeColor} themes={themes} />

      {/* Text Area */}
      <div className="container my-5" style={{ minHeight: "55vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-7 col-11">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <TextForm
                    heading="Enter the text to analyze"
                    placeHolder="Insert the text here"
                    theme={theme}
                  />
                }
              />
              <Route
                exact
                path="/about"
                element={
                  <AboutSection
                    setSelectedIndex={setSelectedIndex}
                    theme={theme}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer theme={theme} />
    </>
  );
}

export default App;
