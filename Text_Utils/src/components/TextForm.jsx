import { useState } from "react";
import NewButton from "./NewButton";
import PropTypes from "prop-types";

const TextForm = ({ heading, placeHolder }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

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
    setText(localStorage.getItem("First text"));
    setIndex(0);
  };
  return (
    <>
      <h3 className="text-center mb-3 text-danger">{heading}</h3>
      <div className="mb-3 row justify-content-center">
        <textarea
          className="form-control h-75 mb-3 border border-2 border-dark"
          id="text-area"
          rows="12"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (index === 0 && e.target.value !== "") {
              localStorage.setItem("First text", e.target.value);
              setIndex(1);
            }
          }}
          placeholder={placeHolder}></textarea>
        <NewButton
          type="button"
          text="Convert to Uppercase"
          color="primary"
          handleClick={changeToUpperCase}
        />
        <NewButton
          type="button"
          text="Convert to LowerCase"
          color="secondary"
          handleClick={changeToLowerCase}
        />
        <NewButton
          type="button"
          text="Remove white spaces"
          color="success"
          handleClick={removeWhiteSpaces}
        />
        <NewButton
          type="button"
          text="Remove the text"
          color="warning"
          handleClick={removeText}
        />
        <NewButton
          type="button"
          text="Change to Normal"
          color="info"
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
