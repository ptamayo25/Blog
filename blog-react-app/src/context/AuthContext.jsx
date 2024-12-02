import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const login = () => setIsAuthenticated(true);
  // const logout = () => setIsAuthenticated(false);
  const { user, isLoading, isAuthenticated, login, logout, updateProfile } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthorize = () => useContext(AuthContext);
