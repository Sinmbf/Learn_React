import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";

function App() {
  return (
    <>
      {/* Nav Bar */}
      <NavBar theme="dark" title="TextUtils" />

      {/* Text Area */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-11">
            <TextForm
              heading="Enter the text to analyze"
              placeHolder="Insert the text here"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
