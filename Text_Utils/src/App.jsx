import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { useState, useEffect } from "react";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import ThemeContainer from "./components/ThemeContainer";

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
    if (theme.backgroundColor === themeColor) {
      styleTheme = theme;
    }
  });
  // themeColor === "#0f2862" && (styleTheme = themes[0]);

  // themeColor === "#ff8928" && (styleTheme = themes[1]);

  // themeColor === "#ff1d58" && (styleTheme = themes[2]);

  // themeColor === "black" && (styleTheme = themes[3]);

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

      {/* Alert */}
      <Alert
        color="info"
        display={selectedIndex === 0 ? "block" : "none"}
        text="Recommended to save the text before making any changes"
      />

      {/* Text Area */}
      <div className="container my-5" style={{ minHeight: "55vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-7 col-11">
            {selectedIndex === 0 && (
              <>
                <TextForm
                  heading="Enter the text to analyze"
                  placeHolder="Insert the text here"
                  theme={theme}
                />
              </>
            )}
            {selectedIndex === 1 && (
              <AboutSection setSelectedIndex={setSelectedIndex} theme={theme} />
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer theme={theme} />
    </>
  );
}

export default App;
