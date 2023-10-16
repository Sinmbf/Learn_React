import LoginForm from "../LoginForm";
import PropTypes from "prop-types";

const Login = ({ toggleAlert }) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <LoginForm toggleAlert={toggleAlert} />
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  toggleAlert: PropTypes.func,
};

export default Login;
