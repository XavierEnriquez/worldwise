import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../contexts/useAuth";

function AuthRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

AuthRoute.propTypes = {
  children: PropTypes.element,
};

export default AuthRoute;
