import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const LoginForm = ({ toggleAlert }) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  let navigate = useNavigate();
  // Helper function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://inotebook-backend-plum.vercel.app/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    });
    const authToken = await response.json();
    if (authToken.error) {
      setErrors(authToken.error);
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;
    }
    localStorage.setItem("auth-token", authToken.authToken);
    toggleAlert("Logged in successfully", "success");
    navigate("/");
  };

  // Helper function to handle change
  const handleChange = (e) => {
    setDetails((currentDetails) => {
      return { ...currentDetails, [e.target.name]: e.target.value };
    });
  };
  return (
    <form
      className="col-md-6 border border-2 border-black p-4 rounded"
      onSubmit={handleSubmit}>
      <div className="text-center mb-4 text-danger">
        <h2>Login to your account</h2>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          value={details.email}
          name="email"
          type="email"
          className="form-control"
          id="email"
          onChange={handleChange}
          aria-describedby="emailHelp"
          required
        />
        <div
          id="emailHelp"
          className="form-text text-danger"
          style={{ height: ".5rem" }}>
          {errors && errors}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          value={details.password}
          name="password"
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange}
          required
          minLength={5}
        />
        <div
          id="passwordHelp"
          className="form-text text-danger"
          style={{ height: ".5rem" }}>
          {errors && errors}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  toggleAlert: PropTypes.func,
};

export default LoginForm;
