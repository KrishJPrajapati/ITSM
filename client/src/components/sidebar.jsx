import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      {/* User Profile */}
      <div style={styles.profile}>
        <div style={styles.avatar}>KP</div>
        <div>
          <div style={styles.name}>client 1</div>
          <div style={styles.email}>client1234@gnu.ac.in</div>
        </div>
      </div>

      <hr style={{ opacity: 0.3 }} />

      {/* Navigation Menu */}
      <nav style={styles.menu}>
        <NavLink to="/asset" style={navStyle}>
          Asset Management
        </NavLink>

        <NavLink to="/ticket" style={navStyle}>
          Ticket Management Platform
        </NavLink>

        <NavLink to="/server-health" style={navStyle}>
          Server & PC Health Monitoring
        </NavLink>

        <NavLink to="/remote-logs" style={navStyle}>
          Remote Troubleshooting Logs
        </NavLink>

        <NavLink to="/sla-dashboard" style={navStyle}>
          SLA & Performance Dashboard
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

/* ---------- ACTIVE LINK STYLE ---------- */
const navStyle = ({ isActive }) => ({
  padding: "12px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#fff",
  background: isActive ? "rgba(255,255,255,0.25)" : "transparent",
  fontWeight: isActive ? "600" : "400",
});

/* ---------- STYLES ---------- */
const styles = {
  sidebar: {
    width: "260px",
    minWidth: "270px",
    height: "100vh",
    background: "#6f74c9",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },

  profile: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "20px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#9fa3ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  name: {
    fontWeight: 600,
  },

  email: {
    fontSize: "12px",
    opacity: 0.85,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "20px",
  },
};