import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SignUp = ({ toggleAlert }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Helper function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    const url = "https://inotebook-backend-plum.vercel.app/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const authToken = await response.json();
    console.log(authToken);
    if (authToken.error) {
      console.log(authToken.error);
      setError(authToken.error);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    toggleAlert("Account created successfully", "success");
    navigate("/login");
  };
  // Helper function to handle change
  const handleChange = (e) => {
    setUserDetails((currentDetails) => {
      return { ...currentDetails, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <form
            className="col-md-6 border border-2 border-black p-4 rounded"
            onSubmit={handleSubmit}>
            <div className="text-center mb-4 text-danger">
              <h2>Create a new account</h2>
            </div>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="name"
                required
                onChange={handleChange}
                minLength={3}
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                required
                onChange={handleChange}
              />
              <div
                id="emailHelp"
                className="form-text text-danger"
                style={{ height: ".5rem" }}>
                {error && error}
              </div>
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                required
                onChange={handleChange}
                minLength={5}
              />
              <div
                id="passwordHelp"
                className="form-text text-danger"
                style={{ height: ".5rem" }}>
                {userDetails.cpassword !== userDetails.password &&
                  "Passwords don't match"}
              </div>
            </div>
            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                name="cpassword"
                type="password"
                className="form-control"
                id="cpassword"
                required
                minLength={5}
                onChange={handleChange}
              />
              <div
                id="cpasswordHelp"
                className="form-text text-danger"
                style={{ height: ".5rem" }}>
                {userDetails.cpassword !== userDetails.password &&
                  "Passwords don't match"}
              </div>
            </div>
            <button
              disabled={
                userDetails.cpassword !== userDetails.password &&
                "Passwords don't match"
              }
              type="submit"
              className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

SignUp.propTypes = {
  toggleAlert: PropTypes.func,
};

export default SignUp;
