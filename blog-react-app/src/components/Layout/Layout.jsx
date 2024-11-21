import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import "./Layout.css";

function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="layout">
      <Navigation toggleSidebar={toggleSidebar} />

      <div className="layout__content">
        <main className="layout__main">
          <Outlet />
        </main>

        {isSidebarVisible && <Sidebar className="layout__sidebar" />}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
