import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from "./router/index.jsx";
import ReactDOM from "react-dom/client";


// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   // <App />
//   <RouterProvider router={router} />
// );


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
