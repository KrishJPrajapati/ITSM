import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const DashboardLayout = () => {
  return (
    <div style={styles.container}>
      {/* Fixed Sidebar */}
      <div style={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Dynamic Page Content */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

/* ---------- STYLES ---------- */
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },

  sidebar: {
    position: "fixed",   // ✅ sidebar does NOT move
    left: 0,
    top: 0,
    width: "260px",
    height: "100vh",
    zIndex: 100,
  },

  content: {
    marginLeft: "260px", // ✅ space for sidebar
    flex: 1,
    background: "#f5f6fb",
    minHeight: "100vh",
    padding: "30px",
  },
};