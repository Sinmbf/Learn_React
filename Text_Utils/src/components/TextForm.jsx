import { useState } from "react";
import NewButton from "./NewButton";
import PropTypes from "prop-types";
import Alert from "./Alert";

const TextForm = ({ heading, placeHolder }) => {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [display, setDisplay] = useState("none");

  //Helper function to save the text
  const saveText = () => {
    if (text !== "") {
      localStorage.setItem("Saved Text", text);
      setBtnDisabled(false);
      setDisplay("block");
      setTimeout(() => {
        setDisplay("none");
      }, 2000);
    }
  };
  //Helper function to change text to uppercase
  const changeToUpperCase = () => {
    setText((currentText) => {
      return currentText.toUpperCase();
    });
  };
  //Helper function to change text to lowercase
  const changeToLowerCase = () => {
    setText((currentText) => {
      return currentText.toLowerCase();
    });
  };
  //Helper function to remove white spaces
  const removeWhiteSpaces = () => {
    setText((currentText) => {
      return currentText.split(" ").join("");
    });
  };
  //Helper function to remove the text
  const removeText = () => {
    setText("");
  };
  //Helper function to revert the text to normal
  const changeToNormal = () => {
    setText(localStorage.getItem("Saved Text"));
  };
  return (
    <>
      <h3 className="text-center mb-3 text-danger">{heading}</h3>
      <div className="mb-3 row justify-content-center">
        {/* Text Area */}
        <textarea
          className="form-control h-75 mb-3 border border-2 border-dark"
          id="text-area"
          rows="12"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder={placeHolder}></textarea>
        {/* Text Summary */}
        <div className="text-summary bg-dark text-light mb-4">
          <h3>Your Text Summary</h3>
          <p className="text-primary fw-bold">
            Characters: {text.split("").length}
            {"  "}
            <span className="text-danger">(Including spaces)</span>
          </p>
          <p className="text-warning fw-bold">
            Words:{" "}
            {
              text
                .replace(/\n/g, " ")
                .split(" ")
                .filter((value) => value != "").length
            }
          </p>
          <p className="text-info fw-bold">
            Reading time:{" "}
            {0.008 * text.split(" ").filter((element) => element != "").length}{" "}
            mins
          </p>
        </div>

        {/* Alert */}
        <Alert color="success" text="Saved the text" display={display} />

        {/* Buttons */}
        <NewButton
          type="button"
          color="success"
          text="Save Text"
          handleClick={saveText}
        />
        <NewButton
          type="button"
          color="primary"
          text="Convert to Uppercase"
          handleClick={changeToUpperCase}
        />
        <NewButton
          type="button"
          color="secondary"
          text="Convert to LowerCase"
          handleClick={changeToLowerCase}
        />
        <NewButton
          type="button"
          color="danger"
          text="Remove white spaces"
          handleClick={removeWhiteSpaces}
        />
        <NewButton
          type="button"
          color="warning"
          text="Remove the text"
          handleClick={removeText}
        />
        <NewButton
          type="button"
          text="Change to Normal"
          color="info"
          state={btnDisabled}
          handleClick={changeToNormal}
        />
      </div>
    </>
  );
};

TextForm.propTypes = {
  heading: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
};

// Default propTypes
TextForm.defaultProps = {
  heading: "NavBar",
  placeHolder: "Enter text here",
};

export default TextForm;
