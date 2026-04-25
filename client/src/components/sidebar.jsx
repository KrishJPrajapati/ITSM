import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);

  // ✅ GET DATA FROM LOCAL STORAGE
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const designation = user?.designation;

  // ✅ PERMISSION LOGIC
  const canCreateUser =
    role === "itEmployee" &&
    ["HOD", "Manager", "HR", "HR Manager"].includes(designation);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div style={styles.sidebar}>
        
        {/* ================= PROFILE ================= */}
        <div style={styles.profile}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <div style={styles.name}>
              {user?.name || "Unknown User"}
            </div>
            <div style={styles.email}>
              {user?.email || "No email"}
            </div>
            <div style={{ fontSize: "11px", opacity: 0.7 }}>
              {designation || "No designation"}
            </div>
          </div>
        </div>

        <hr style={styles.divider} />

        {/* ================= ACTION ROW ================= */}
        <div style={styles.actionRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>

          {/* ✅ ROLE + DESIGNATION BASED */}
          {canCreateUser && (
            <button
              style={styles.addUserBtn}
              onClick={() => navigate("/it/users")}
            >
              👥 Users
            </button>
          )}
        </div>

        <hr style={styles.divider} />

        {/* ================= MENU ================= */}
        <nav style={styles.menu}>
          
          {/* CLIENT */}
          {role === "clientEmployee" && (
            <>
            <NavLink to="/client/ticket" style={navStyle}>
              🎫 Ticket Management
            </NavLink>
            
            <NavLink to="/client/my-tickets" style={navStyle}>
              📋 My Tickets
            </NavLink>
            </>
          )}

          {/* IT */}
          {role === "itEmployee" && (
            <>
              <NavLink to="/it/ticket" style={navStyle}>
                🎫 Ticket Management
              </NavLink>

              <NavLink to="/it/my-tickets" style={navStyle}>
                📋 My Tickets
              </NavLink>

              <NavLink to="/it/assigned-tickets" style={navStyle}>
                🧾 Assigned Tickets
              </NavLink>

              <NavLink to="/it/sla-dashboard" style={navStyle}>
                📊 SLA Dashboard
              </NavLink>

              <NavLink to="/it/asset" style={navStyle}>
                🗂️ Asset Management
              </NavLink>

              <NavLink to="/it/server-health" style={navStyle}>
                🖥️ Server Health
              </NavLink>

              <NavLink to="/it/remote-logs" style={navStyle}>
                📋 Remote Logs
              </NavLink>
            </>
          )}
        </nav>

        {/* ================= LOGOUT ================= */}
        <div style={styles.logoutWrapper}>
          <hr style={styles.divider} />
          <button style={styles.logoutBtn} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {showUserModal && (
        <AddUserModal onClose={() => setShowUserModal(false)} />
      )}
    </>
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

  // ── NEW: row that holds Back + Users side-by-side ──
  actionRow: {
    display: "flex",
    gap: "8px",
  },

  backBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    color: "#fff",
    padding: "9px 10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    transition: "background 0.18s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },

  // ── NEW: Users button — same style as backBtn ──
  addUserBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    color: "#fff",
    padding: "9px 10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    transition: "background 0.18s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },

  backArrow: {
    fontSize: "16px",
    lineHeight: 1,
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
    flex: 1,
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
    transition: "background 0.18s ease",
    fontFamily: "'Segoe UI', sans-serif",
  },
};