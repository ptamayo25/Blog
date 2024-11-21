import Header from './components/Header'
import BlogList from "./components/BlogList/BlogList";
import { posts } from "./data/posts";
import "./App.css";
import PostEditor from "./components/PostEditor/PostEditor";
import { router } from "./router/index.jsx";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
