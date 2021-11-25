import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

function PublicPage() {
  const auth = useContext(AuthContext);
  if (auth) {
    return <Navigate to="/articles" />;
  } else {
    return (
      <div>
        <h1>This is the public page</h1>
      </div>
    );
  }
}

export default PublicPage;
