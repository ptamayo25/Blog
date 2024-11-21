import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { isAuthenticated, login } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <div>
          <h1>Login Page</h1>
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
