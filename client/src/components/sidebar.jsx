import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

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

      <hr style={styles.divider} />

      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        <span style={styles.backArrow}>&#8592;</span>
        <span style={styles.backLabel}>Back</span>
      </button>

      <hr style={styles.divider} />

      {/* Navigation Menu */}
      <nav style={styles.menu}>
        <NavLink to="/asset" style={navStyle}>
          <span style={styles.navIcon}>🗂️</span>
          Asset Management
        </NavLink>

        <NavLink to="/ticket" style={navStyle}>
          <span style={styles.navIcon}>🎫</span>
          Ticket Management Platform
        </NavLink>

        <NavLink to="/server-health" style={navStyle}>
          <span style={styles.navIcon}>🖥️</span>
          Server &amp; PC Health Monitoring
        </NavLink>

        <NavLink to="/remote-logs" style={navStyle}>
          <span style={styles.navIcon}>📋</span>
          Remote Troubleshooting Logs
        </NavLink>

        <NavLink to="/sla-dashboard" style={navStyle}>
          <span style={styles.navIcon}>📊</span>
          SLA &amp; Performance Dashboard
        </NavLink>
      </nav>

      {/* Logout Button — pinned to bottom */}
      <div style={styles.logoutWrapper}>
        <hr style={styles.divider} />
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <span style={styles.navIcon}>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

/* ---------- ACTIVE LINK STYLE ---------- */
const navStyle = ({ isActive }) => ({
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#fff",
  background: isActive ? "rgba(255,255,255,0.22)" : "transparent",
  fontWeight: isActive ? "600" : "400",
  fontSize: "13.5px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "background 0.18s ease",
  boxShadow: isActive ? "0 2px 10px rgba(0,0,0,0.12)" : "none",
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
    display: "flex",
    flexDirection: "column",
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    color: "#fff",
    padding: "9px 16px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    width: "100%",
    transition: "background 0.18s ease, transform 0.15s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },

  backArrow: {
    fontSize: "16px",
    lineHeight: 1,
    display: "inline-block",
    transition: "transform 0.15s ease",
  },

  backLabel: {
    fontSize: "13px",
  },

  divider: {
    opacity: 0.25,
    margin: "14px 0",
  },

  profile: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
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
    flexShrink: 0,
  },

  name: {
    fontWeight: 600,
    fontSize: "14px",
  },

  email: {
    fontSize: "11.5px",
    opacity: 0.82,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "4px",
    flex: 1,          // ✅ pushes logout to the very bottom
  },

  navIcon: {
    fontSize: "15px",
    lineHeight: 1,
    flexShrink: 0,
  },

  logoutWrapper: {
    marginTop: "auto",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    color: "#fff",
    padding: "9px 16px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    width: "100%",
    transition: "background 0.18s ease, transform 0.15s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },
};