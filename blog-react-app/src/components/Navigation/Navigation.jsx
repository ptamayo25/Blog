import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";

function Navigation({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts/blog", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <h1>My Awesome Blog</h1>
      </div>
      <ul className={`navigation__menu ${isMenuOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.path} className="navigation__item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `navigation__link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="navigation__toggle"
        onClick={() => {
          toggleMenu();
          toggleSidebar();
        }}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        Side Menu
        <span className="navigation__toggle-icon"> ▼ </span>
      </button>
    </nav>
  );
}

export default Navigation;
