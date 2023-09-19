import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [btnText, setBtnText] = useState("Dark Mode");
  const themeColor = "blue";
  let styleTheme;
  themeColor === "orange" && (styleTheme = { backgroundColor: "orange" });
  themeColor === "red" && (styleTheme = { backgroundColor: "red" });
  themeColor === "blue" && (styleTheme = { backgroundColor: "blue" });
  themeColor === "green" && (styleTheme = { backgroundColor: "green" });
  themeColor === "yellow" && (styleTheme = { backgroundColor: "yellow" });
  const [theme, setTheme] = useState(styleTheme);

  // Helper function to change the theme
  const toggleTheme = () => {
    theme.backgroundColor === styleTheme.backgroundColor
      ? setTheme(
          {
            backgroundColor: "black",
          },
          setBtnText("Default")
        )
      : setTheme(
          {
            backgroundColor: styleTheme.backgroundColor,
          },
          setBtnText("Dark Mode")
        );
  };

  return (
    <>
      {/* Nav Bar */}
      <NavBar
        btnText={btnText}
        styleTheme={theme}
        toggleTheme={toggleTheme}
        title="TextUtils"
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {/* Text Area */}
      <div className="container my-5" style={{ minHeight: "55vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-7 col-11">
            {selectedIndex === 0 && (
              <>
                {/* Alert */}
                <Alert
                  color="info"
                  text="Recommended to save the text before making any changes!"
                />
                <TextForm
                  heading="Enter the text to analyze"
                  placeHolder="Insert the text here"
                />
              </>
            )}
            {selectedIndex === 1 && (
              <AboutSection setSelectedIndex={setSelectedIndex} />
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer styleTheme={theme} />
    </>
  );
}

export default App;
