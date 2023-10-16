import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  // Helper function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-info" to="#">
            iNotebook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            {!localStorage.getItem("auth-token") ? (
              <form className="d-flex gap-2" role="search">
                <Link
                  to="/login"
                  className="btn btn-outline-info"
                  tabIndex={-1}
                  role="button">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline-warning"
                  tabIndex={-1}
                  role="button">
                  Sign up
                </Link>
              </form>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
