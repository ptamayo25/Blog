import React from "react";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Profile Page</h1>
          <h2>Welcome, User!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
