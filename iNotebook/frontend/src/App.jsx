import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NoteState from "./context/NoteState";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState({ message: "", type: "" });
  // Helper function to toggle alert
  const toggleAlert = (message, type) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 1500);
  };
  return (
    <>
      <NoteState>
        {/* Navigation Bar */}
        <NavBar />
        {/* Alert */}
        <Alert
          message={alert.message ? alert.message : null}
          type={alert.type ? alert.type : null}
        />

        {/* Available Routes */}
        <div className="container my-4">
          <Routes>
            <Route
              path="/"
              element={<Home toggleAlert={toggleAlert} alert={alert} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<Login toggleAlert={toggleAlert} />}
            />
            <Route
              path="/signup"
              element={<SignUp toggleAlert={toggleAlert} />}
            />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
