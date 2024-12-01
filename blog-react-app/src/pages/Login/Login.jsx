import React from "react";
import { useAuthorize } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";

function Login() {
  const { user, isLoading, isAuthenticated, login, logout } = useAuthorize();

  const {
    values,
    errors,
    touched,
    // isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    // reset,
  } = useForm(
    { username: "", password: "" }, // Initial form values
    (values) => {
      console.log("called validate with ", values);
      const errors = {};
      if (values.username === "") errors.username = "Username is required";
      if (values.password === "") errors.password = "Password is required";
      return errors;
    }
  );

  const handleLogin = async (values) => {
    try {
      await login(values); // Call the login function with form values
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h1>Login Page</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handleLogin);
            }}
            className="login-form"
          >
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.username && errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
      ) : isLoading ? (
        <div>Loading... Please Wait</div>
      ) : (
        <div>
          <h1>Login Page</h1>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
