import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";

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
    background: active ? "#6a7cff" : "transparent",
    color: active ? "#fff" : "#6a7cff",
  }),

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
  }),

  label: {
    fontSize: "14px",
    marginBottom: "6px",
  },

  inputWrapper: {
    marginBottom: "16px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #b6bbff",
    width: "100%",
  },

  loginBtn: (isAdmin) => ({
    background: isAdmin
      ? "linear-gradient(135deg, #1a1f3c, #2d3561)"
      : "#6a7cff",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "30px",
    cursor: "pointer",
  }),
};

/* ================= CLIENT ================= */

const UserForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  console.log("🔥 CLIENT LOGIN CLICKED");

  // ✅ EMAIL REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ❌ VALIDATION
  if (!emailRegex.test(username)) {
    alert("Please enter a valid email (example@domain.com)");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    const response = await API.loginClientEmployee({
      email: username,
      password,
    });

    console.log("CLIENT RESPONSE 👉", response);

    if (response.isSuccess) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "clientEmployee");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.user.name,
          email: response.data.user.email,
          designation: response.data.user.designation,
          e_id: response.data.user.e_id,
        })
      );

      alert("Login success");
      navigate("/client/ticket");
    } else {
      alert(response.msg || "Login failed");
    }
  } catch (error) {
    console.error("❌ CLIENT ERROR:", error);
    alert(error.msg || "Server error");
  }
};

  return (
    <>
      <div style={styles.iconWrapper}>
        <div style={styles.icon(false)}>👤</div>
      </div>

      <label style={styles.label}>Email</label>
      <div style={styles.inputWrapper}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>

      <label style={styles.label}>Password</label>
      <div style={styles.inputWrapper}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={handleLogin} style={styles.loginBtn(false)}>
        Login
      </button>
    </>
  );
};

/* ================= IT EMPLOYEE ================= */

const AdminForm = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  console.log("🔥 IT LOGIN CLICKED");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(employeeId)) {
    alert("Please enter a valid email (example@domain.com)");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    const response = await API.loginITEmployee({
      email: employeeId,
      password,
    });

    console.log("IT RESPONSE 👉", response);

    if (response.isSuccess) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "itEmployee");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.user.name,
          email: response.data.user.email,
          designation: response.data.user.designation,
          e_id: response.data.user.e_id,
        })
      );

      alert("Login success");
      navigate("/it/ticket");
    } else {
      alert(response.msg || "Login failed");
    }
  } catch (error) {
    console.error("❌ IT ERROR:", error);
    alert(error.msg || "Server error");
  }
};
  return (
    <>
      <div style={styles.iconWrapper}>
        <div style={styles.icon(true)}>🛡️</div>
      </div>

      <label style={styles.label}>Employee Email</label>
      <div style={styles.inputWrapper}>
        <input
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={styles.input}
        />
      </div>

      <label style={styles.label}>Password</label>
      <div style={styles.inputWrapper}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={handleLogin} style={styles.loginBtn(true)}>
        Secure Login
      </button>
    </>
  );
};

/* ================= ROOT ================= */

const RightLoginForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.toggleWrapper}>
        <button
          style={styles.toggleBtn(!isAdmin)}
          onClick={() => setIsAdmin(false)}
        >
          👤 Client Login
        </button>

        <button
          style={styles.toggleBtn(isAdmin)}
          onClick={() => setIsAdmin(true)}
        >
          🛡️ IT Employee Login
        </button>
      </div>

      {isAdmin ? <AdminForm /> : <UserForm />}
    </div>
  );
};

export default RightLoginForm;