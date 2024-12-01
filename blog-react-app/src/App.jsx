import "./App.css";
import { router } from "./router/index.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
