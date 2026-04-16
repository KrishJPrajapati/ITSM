import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  card: {
    width: "420px",
    background: "#e9ecff",
    padding: "40px",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },

  // ── Toggle Tab ──────────────────────────────────────────────────────────────
  toggleWrapper: {
    display: "flex",
    background: "#d6d9ff",
    borderRadius: "30px",
    padding: "4px",
    marginBottom: "28px",
  },

  toggleBtn: (active) => ({
    flex: 1,
    padding: "10px 0",
    borderRadius: "26px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.25s ease",
    background: active ? "#6a7cff" : "transparent",
    color: active ? "#fff" : "#6a7cff",
    boxShadow: active ? "0 4px 12px rgba(106,124,255,0.3)" : "none",
  }),

  // ── Icon ───────────────────────────────────────────────────────────────────
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },

  icon: (isAdmin) => ({
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: isAdmin
      ? "linear-gradient(135deg, #1a1f3c, #2d3561)"
      : "#d6d9ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    boxShadow: isAdmin ? "0 8px 20px rgba(26,31,60,0.25)" : "none",
    transition: "all 0.3s ease",
  }),

  // ── Form heading ───────────────────────────────────────────────────────────
  formHeading: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: 700,
    color: "#1a1f3c",
    marginBottom: "2px",
  },

  formSubHeading: {
    textAlign: "center",
    fontSize: "12px",
    color: "#8892b0",
    marginBottom: "22px",
  },

  // ── Inputs ─────────────────────────────────────────────────────────────────
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#333",
  },

  inputWrapper: {
    position: "relative",
    marginBottom: "16px",
  },

  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "15px",
    pointerEvents: "none",
  },

  input: (withIcon) => ({
    padding: withIcon ? "14px 16px 14px 42px" : "14px 16px",
    borderRadius: "12px",
    border: "1px solid #b6bbff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
  }),

  select: {
    padding: "14px 16px 14px 42px",
    borderRadius: "12px",
    border: "1px solid #b6bbff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
    appearance: "none",
    cursor: "pointer",
    color: "#333",
  },

  // ── Forgot ─────────────────────────────────────────────────────────────────
  forgot: {
    fontSize: "13px",
    color: "#6a7cff",
    textAlign: "right",
    marginBottom: "24px",
    cursor: "pointer",
    textDecoration: "underline",
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    display: "block",
    width: "100%",
  },

  // ── Login button ───────────────────────────────────────────────────────────
  loginBtn: (isAdmin) => ({
    background: isAdmin
      ? "linear-gradient(135deg, #1a1f3c, #2d3561)"
      : "#6a7cff",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  }),

  // ── Modal ──────────────────────────────────────────────────────────────────
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    borderRadius: "20px",
    padding: "36px",
    width: "380px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  modalTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#222",
    marginBottom: "4px",
  },

  modalSubtitle: {
    fontSize: "13px",
    color: "#666",
  },

  modalInput: {
    padding: "13px 16px",
    borderRadius: "12px",
    border: "1px solid #b6bbff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },

  modalBtn: {
    background: "#6a7cff",
    color: "#fff",
    border: "none",
    padding: "13px",
    borderRadius: "30px",
    fontSize: "15px",
    cursor: "pointer",
  },

  modalCancel: {
    background: "none",
    border: "none",
    color: "#999",
    fontSize: "13px",
    cursor: "pointer",
    textAlign: "center",
    padding: 0,
    font: "inherit",
  },
};

// ── Forgot Password Modal ─────────────────────────────────────────────────────
const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {!submitted ? (
          <>
            <div>
              <div style={styles.modalTitle}>Forgot Password?</div>
              <div style={styles.modalSubtitle}>
                Enter your registered email and we'll send you a reset link.
              </div>
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.modalInput}
              autoFocus
            />
            <button
              style={styles.modalBtn}
              onClick={() => email.trim() && setSubmitted(true)}
            >
              Send Reset Link
            </button>
            <button style={styles.modalCancel} onClick={onClose}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", fontSize: "40px" }}>📧</div>
            <div style={styles.modalTitle}>Check your inbox</div>
            <div style={styles.modalSubtitle}>
              A reset link has been sent to <strong>{email}</strong>. Follow the
              instructions in the email.
            </div>
            <button style={styles.modalBtn} onClick={onClose}>
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ── User Login Form ───────────────────────────────────────────────────────────
const UserForm = ({ onShowForgot }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/ticket");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "contents" }}>
      {/* Icon */}
      <div style={styles.iconWrapper}>
        <div style={styles.icon(false)}>👤</div>
      </div>

      {/* Username */}
      <label style={styles.label}>Username or Email</label>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter Your Username or Email Address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input(false)}
        />
      </div>

      {/* Password */}
      <label style={styles.label}>Password</label>
      <div style={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input(false)}
        />
      </div>

      {/* Forgot */}
      <button type="button" style={styles.forgot} onClick={onShowForgot}>
        Forgotten Password?
      </button>

      {/* Login */}
      <button type="submit" style={styles.loginBtn(false)}>
        Login
      </button>
    </form>
  );
};

// ── IT Admin / Employee Login Form ────────────────────────────────────────────
const AdminForm = ({ onShowForgot }) => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ FIX: Removed `role` from state and validation since the Role
  // dropdown is not shown. Login now works with just Employee ID + Password.
  const handleLogin = (e) => {
    e.preventDefault();
    if (employeeId.trim() && password.trim()) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "it-employee");
      navigate("/ticket");
    } else {
      alert("Please fill in all fields to continue.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "contents" }}>
      {/* Icon */}
      <div style={styles.iconWrapper}>
        <div style={styles.icon(true)}>🛡️</div>
      </div>

      {/* Employee ID */}
      <label style={styles.label}>IT Employee ID / Email</label>
      <div style={styles.inputWrapper}>
        <span style={styles.inputIcon}>🪪</span>
        <input
          type="text"
          placeholder="Enter Employee ID or Email"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={styles.input(true)}
        />
      </div>

      {/* Password */}
      <label style={styles.label}>Password</label>
      <div style={styles.inputWrapper}>
        <span style={styles.inputIcon}>🔑</span>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input(true)}
        />
      </div>

      {/* Forgot */}
      <button type="button" style={styles.forgot} onClick={onShowForgot}>
        Forgotten Password?
      </button>

      {/* Login */}
      <button type="submit" style={styles.loginBtn(true)}>
        Secure Login
      </button>
    </form>
  );
};

// ── Root Component ────────────────────────────────────────────────────────────
const RightLoginForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  return (
    <>
      <div style={styles.card}>
        {/* Toggle Tabs */}
        <div style={styles.toggleWrapper}>
          <button
            type="button"
            style={styles.toggleBtn(!isAdmin)}
            onClick={() => setIsAdmin(false)}
          >
            👤 User Login
          </button>
          <button
            type="button"
            style={styles.toggleBtn(isAdmin)}
            onClick={() => setIsAdmin(true)}
          >
            🛡️ IT Employee Login
          </button>
        </div>

        {/* Render correct form */}
        {isAdmin ? (
          <AdminForm onShowForgot={() => setShowForgot(true)} />
        ) : (
          <UserForm onShowForgot={() => setShowForgot(true)} />
        )}
      </div>

      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </>
  );
};

export default RightLoginForm;