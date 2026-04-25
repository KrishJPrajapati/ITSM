import React, { useEffect, useState } from "react";
import { API } from "../service/api";
import AddUserModal from "../components/AddUserModal";

const UsersPage = () => {
  const [itUsers, setItUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  const itRes = await API.getItEmployees();
  const clientRes = await API.getClientEmployees();
  const companyRes = await API.getCompanies();

  console.log("IT:", itRes);
  console.log("CLIENT:", clientRes);
  console.log("COMPANY:", companyRes);

  if (itRes?.isSuccess && itRes.data?.employees) {
    setItUsers(itRes.data.employees);
  }

  if (clientRes?.isSuccess && clientRes.data?.clients) {
    setClientUsers(clientRes.data.clients);
  }

  if (companyRes?.isSuccess && companyRes.data?.companies) {
    setCompanies(companyRes.data.companies);
  }
};
const handleDeleteCompany = async (company_id) => {
  if (!window.confirm("Delete company?")) return;
  await API.deleteCompany({ company_id });
  fetchUsers();
};
  const handleDeleteIT = async (e_id) => {
    if (!window.confirm("Delete IT employee?")) return;
    await API.deleteItEmployee({ e_id });
    fetchUsers();
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Delete client employee?")) return;
    await API.deleteClientEmployee({ id });
    fetchUsers();
  };

  return (
<div style={styles.wrapper}>
  <div style={styles.header}>
    <h2 style={styles.title}>👥 User Management</h2>

    <button
      style={styles.addBtn}
      onClick={() => setShowModal(true)}
    >
      + Add User
    </button>
  </div>

  {/* IT EMPLOYEES */}
  <div style={styles.card}>
    <h3 style={styles.sectionTitle}>IT Employees</h3>

    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Designation</th>
          <th style={styles.th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {itUsers.map((u) => (
          <tr key={u.e_id} style={styles.tr}>
            <td style={styles.td}>{u.name}</td>
            <td style={styles.td}>{u.email}</td>
            <td style={styles.td}>{u.designation}</td>
            <td style={styles.td}>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDeleteIT(u.e_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* CLIENT EMPLOYEES */}
  <div style={styles.card}>
    <h3 style={styles.sectionTitle}>Client Employees</h3>

    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Company</th>
          <th style={styles.th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {clientUsers.map((u) => (
          <tr key={u._id} style={styles.tr}>
            <td style={styles.td}>{u.name}</td>
            <td style={styles.td}>{u.email}</td>
            <td style={styles.td}>{u.companyName}</td>
            <td style={styles.td}>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDeleteClient(u._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        {/* COMPANIES */}
<div style={styles.card}>
  <h3 style={styles.sectionTitle}>Companies</h3>

  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>Company Name</th>
        <th style={styles.th}>City</th>
        <th style={styles.th}>Head</th>
        <th style={styles.th}>Action</th>
      </tr>
    </thead>

    <tbody>
      {companies.map((c) => (
        <tr key={c.company_id} style={styles.tr}>
          <td style={styles.td}>{c.companyName}</td>
          <td style={styles.td}>{c.city}</td>
          <td style={styles.td}>{c.head}</td>
          <td style={styles.td}>
            <button
              style={styles.deleteBtn}
              onClick={() => handleDeleteCompany(c.company_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* MODAL */}
      {showModal && <AddUserModal onClose={() => {
        setShowModal(false);
        fetchUsers();
      }} />}
    </div>
  );
};

const tableStyle = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse",
};

const styles = {
  wrapper: {
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f5f6ff",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e2140",
  },

  addBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(135deg, #6a7cff, #8f8bff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(106,124,255,0.3)",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "25px",
    boxShadow: "0 4px 20px rgba(106,124,255,0.1)",
    border: "1px solid #eef0fb",
  },

  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#4b4f9c",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    fontSize: "13px",
    color: "#555",
    borderBottom: "1px solid #eee",
  },

  td: {
    padding: "12px",
    fontSize: "13px",
    color: "#333",
  },

  tr: {
    borderBottom: "1px solid #f0f1fb",
  },

  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontSize: "12px",
    cursor: "pointer",
  },
};

export default UsersPage;