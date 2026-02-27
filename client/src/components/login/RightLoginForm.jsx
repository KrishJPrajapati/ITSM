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
  },

  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
  },

  icon: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#d6d9ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  },

  label: {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#333",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #b6bbff",
    marginBottom: "18px",
    fontSize: "14px",
    outline: "none",
  },

  forgot: {
    fontSize: "13px",
    color: "#6a7cff",
    textAlign: "right",
    marginBottom: "28px",
    cursor: "pointer",
  },

  loginBtn: {
    background: "#6a7cff",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },

  admin: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "13px",
    color: "#6a7cff",
    cursor: "pointer",
  },
};

const RightLoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // simple demo validation
    if (username.trim() && password.trim()) {
      navigate("/ticket"); // redirect after login
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <form style={styles.card} onSubmit={handleLogin}>
      {/* User Icon */}
      <div style={styles.iconWrapper}>
        <div style={styles.icon}>👤</div>
      </div>

      {/* Username */}
      <label style={styles.label}>Username or Email</label>
      <input
        type="text"
        placeholder="Enter Your Username or Email Address"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      {/* Password */}
      <label style={styles.label}>Password</label>
      <input
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <div style={styles.forgot}>Forgotten Password?</div>

      {/* Login Button */}
      <button type="submit" style={styles.loginBtn}>
        Login
      </button>

      <div style={styles.admin}>IT Admin Login?</div>
    </form>
  );
};

export default RightLoginForm;

