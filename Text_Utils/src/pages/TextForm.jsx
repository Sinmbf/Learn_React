import { useState } from "react";
import NewButton from "../components/NewButton";
import PropTypes from "prop-types";
import Alert from "../components/Alert";

const TextForm = ({ heading, placeHolder, theme }) => {
  document.title = "TextUtils - Home";
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const [alertText, setAlertText] = useState("");

  // Helper function to show and hide alert
  const displayAlert = (alertText) => {
    if (text !== "") {
      setVisibility("visible");
      setAlertText(alertText);
      setTimeout(() => {
        setVisibility("hidden");
      }, 2000);
    }
  };

  //Helper function to save the text
  const saveText = () => {
    if (text !== "") {
      sessionStorage.setItem("Saved Text", text);
      displayAlert("Saved the text");
    }
  };
  //Helper function to change text to uppercase
  const changeToUpperCase = () => {
    setText((currentText) => {
      return currentText.toUpperCase();
    });
    displayAlert("Changed the text to uppercase");
  };
  //Helper function to change text to lowercase
  const changeToLowerCase = () => {
    setText((currentText) => {
      return currentText.toLowerCase();
    });
    displayAlert("Changed the text to lowercase");
  };
  //Helper function to remove white spaces
  const removeExtraSpaces = () => {
    setText((currentText) => {
      return currentText.split(/\s+/).join(" ");
    });
    displayAlert("Removed all the extra spaces from the text");
  };
  // Helper function to copy the text
  const copyText = () => {
    navigator.clipboard.writeText(text);
    displayAlert("Copied the text to clipboard");
  };
  //Helper function to remove the text
  const removeText = () => {
    setText("");
    displayAlert("Deleted all the text!");
  };
  //Helper function to revert the text to normal
  const changeToNormal = () => {
    setText(sessionStorage.getItem("Saved Text"));
    displayAlert("Reverted the text back to original");
  };
  return (
    <>
      <h3
        className={`text-center mb-3 ${
          theme.backgroundColor === "black" ? "text-light" : "text-danger"
        }`}>
        {heading}
      </h3>
      <div className="mb-3 row justify-content-center">
        {/* Text Area */}
        <textarea
          className={`form-control h-75 mb-3 ${
            theme.backgroundColor === "black"
              ? "bg-dark text-light"
              : "bg-light text-black"
          }`}
          id="text-area"
          rows="12"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder={placeHolder}></textarea>

        {/* Text Summary */}
        <div
          className={`text-light mb-4 rounded p-3 border border-light ${
            theme.backgroundColor === "black" && "bg-dark text-light"
          }`}
          style={{ backgroundColor: theme.backgroundColor }}>
          <h3>Your Text Summary</h3>
          <p className="text-light fw-bold">
            Characters: {text.split("").length}
            {"  "}
            <span className="text-info">(Including spaces)</span>
          </p>
          <p className="text-light fw-bold">
            Words:{" "}
            {
              // text
              //   .replace(/\n/g, " ")
              //   .split(" ")
              //   .filter((value) => value != "").length
              text.split(/\s+/).filter((element) => element.length !== 0).length
            }
          </p>
          <p className="text-light fw-bold">
            Reading time:{" "}
            {0.008 * text.split(" ").filter((element) => element != "").length}{" "}
            mins
          </p>
        </div>

        {/* Alert */}
        <Alert color="success" text={alertText} visibility={visibility} />

        {/* Buttons */}
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Save Text"
          state={text === ""}
          handleClick={saveText}
        />
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Convert to Uppercase"
          state={text === ""}
          handleClick={changeToUpperCase}
        />
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Convert to LowerCase"
          state={text === ""}
          handleClick={changeToLowerCase}
        />
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Remove extra spaces"
          state={text === ""}
          handleClick={removeExtraSpaces}
        />
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Copy Text"
          state={text === ""}
          handleClick={copyText}
        />
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Remove the text"
          state={text === ""}
          handleClick={removeText}
        />
        <NewButton
          type="button"
          color={theme.btnColor}
          text="Change to original text"
          state={sessionStorage.getItem("Saved Text")?.length === undefined}
          handleClick={changeToNormal}
        />
      </div>
    </>
  );
};

TextForm.propTypes = {
  heading: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  theme: PropTypes.object,
};

// Default propTypes
TextForm.defaultProps = {
  heading: "NavBar",
  placeHolder: "Enter text here",
};

export default TextForm;
