import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function RequireAuth({ children }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
