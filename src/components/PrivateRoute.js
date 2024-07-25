import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
};

export default PrivateRoute;
