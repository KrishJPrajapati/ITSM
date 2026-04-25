import React, { useState, useMemo } from "react";
import { API } from "../service/api";

/* ---------- FIELD COMPONENTS ---------- */

const Field = ({ label, name, type = "text", value, onChange }) => (
  <div style={f.group}>
    <label style={f.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={f.input}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div style={f.group}>
    <label style={f.label}>{label}</label>
    <select name={name} value={value} onChange={onChange} style={f.input}>
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

/* ---------- INITIAL STATES ---------- */

const initCompany = {
  companyName: "", city: "", tel: "", head: "",
  contractStart: "", contractEnd: "", email: "", address: "", category: "",
};

const initClientEmp = {
  firstName: "", lastName: "", phoneNumber: "", email: "", password: "",
  companyName: "", officeName: "", city: "", state: "",
  designation: "", department: "", headName: "", DOB: "",
};

const initITEmp = {
  firstName: "", lastName: "", email: "", password: "",
  designation: "", date_joined: "", DOB: "", phoneNumber: "",
};

/* ---------- MAIN COMPONENT ---------- */

const AddUserModal = ({ onClose }) => {

  // ✅ SAFE ROLE (trimmed)
  const role = (localStorage.getItem("role") || "").trim();

  console.log("ROLE 👉", role);

  /* ---------- ROLE BASED TABS ---------- */

  const tabs = useMemo(() => {
    if (role === "superAdmin") {
      return [
        { id: "company", label: "Company" },
        { id: "clientEmp", label: "Client Employee" },
        { id: "itEmp", label: "IT Employee" },
      ];
    }

    if (role === "itEmployee") {
      return [
        { id: "clientEmp", label: "Client Employee" },
        { id: "itEmp", label: "IT Employee" },
      ];
    }

    return [];
  }, [role]);

  // ✅ FIXED DEFAULT TAB
  const [activeTab, setActiveTab] = useState(() => {
    return tabs.length ? tabs[0].id : "clientEmp";
  });

  const [company, setCompany] = useState(initCompany);
  const [clientEmp, setClientEmp] = useState(initClientEmp);
  const [itEmp, setItEmp] = useState(initITEmp);
  const [loading, setLoading] = useState(false);

  const handle = (setter) => (e) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* ---------- GUARD (NO BLANK SCREEN) ---------- */

  if (!tabs.length) {
    return (
      <div style={s.overlay}>
        <div style={s.modal}>
          <div style={s.header}>Invalid Role</div>
          <div style={{ padding: "30px", textAlign: "center" }}>
            You are not allowed to access this feature.
          </div>
          <button onClick={onClose} style={s.submitBtn}>
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ---------- SUBMIT ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (activeTab === "company") {
        response = await API.createClientCompany(company);
      } else if (activeTab === "clientEmp") {
        response = await API.createClientEmployee(clientEmp);
      } else {
        response = await API.createItEmployee(itEmp);
      }

      console.log("API RESPONSE 👉", response);

      if (response.isSuccess) {
        alert("✅ Created Successfully");

        setCompany(initCompany);
        setClientEmp(initClientEmp);
        setItEmp(initITEmp);
      } else {
        alert(response.msg || "Failed to create");
      }

    } catch (error) {
      console.error("❌ ERROR:", error);
      alert(error.msg || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={s.header}>
          ➕ Add New User
          <button onClick={onClose}>✕</button>
        </div>

        {/* TABS */}
        <div style={s.tabsWrapper}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...s.tabBtn,
                ...(activeTab === tab.id ? s.activeTab : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.grid}>

            {/* COMPANY */}
            {activeTab === "company" && (
              <>
                <Field label="Company Name" name="companyName" value={company.companyName} onChange={handle(setCompany)} />
                <Field label="City" name="city" value={company.city} onChange={handle(setCompany)} />
                <Field label="Telephone" name="tel" value={company.tel} onChange={handle(setCompany)} />
                <Field label="Head" name="head" value={company.head} onChange={handle(setCompany)} />
                <Field label="Contract Start" name="contractStart" type="date" value={company.contractStart} onChange={handle(setCompany)} />
                <Field label="Contract End" name="contractEnd" type="date" value={company.contractEnd} onChange={handle(setCompany)} />
                <Field label="Email" name="email" value={company.email} onChange={handle(setCompany)} />
                <Field label="Address" name="address" value={company.address} onChange={handle(setCompany)} />
                <Select label="Category" name="category" value={company.category} onChange={handle(setCompany)}
                  options={["Enterprise", "SMB", "Startup"]} />
              </>
            )}

            {/* CLIENT EMP */}
            {activeTab === "clientEmp" && (
              <>
                <Field label="First Name" name="firstName" value={clientEmp.firstName} onChange={handle(setClientEmp)} />
                <Field label="Last Name" name="lastName" value={clientEmp.lastName} onChange={handle(setClientEmp)} />
                <Field label="Phone" name="phoneNumber" value={clientEmp.phoneNumber} onChange={handle(setClientEmp)} />
                <Field label="Email" name="email" value={clientEmp.email} onChange={handle(setClientEmp)} />
                <Field label="Password" name="password" type="password" value={clientEmp.password} onChange={handle(setClientEmp)} />
                <Field label="Company Name" name="companyName" value={clientEmp.companyName} onChange={handle(setClientEmp)} />
                <Field label="Office Name" name="officeName" value={clientEmp.officeName} onChange={handle(setClientEmp)} />
                <Field label="City" name="city" value={clientEmp.city} onChange={handle(setClientEmp)} />
                <Field label="State" name="state" value={clientEmp.state} onChange={handle(setClientEmp)} />
                <Field label="Designation" name="designation" value={clientEmp.designation} onChange={handle(setClientEmp)} />
                <Field label="Department" name="department" value={clientEmp.department} onChange={handle(setClientEmp)} />
                <Field label="Head Name" name="headName" value={clientEmp.headName} onChange={handle(setClientEmp)} />
                <Field label="DOB" name="DOB" type="date" value={clientEmp.DOB} onChange={handle(setClientEmp)} />
              </>
            )}

            {/* IT EMP */}
            {activeTab === "itEmp" && (
              <>
                <Field label="First Name" name="firstName" value={itEmp.firstName} onChange={handle(setItEmp)} />
                <Field label="Last Name" name="lastName" value={itEmp.lastName} onChange={handle(setItEmp)} />
                <Field label="Email" name="email" value={itEmp.email} onChange={handle(setItEmp)} />
                <Field label="Password" name="password" type="password" value={itEmp.password} onChange={handle(setItEmp)} />
                <Field label="Designation" name="designation" value={itEmp.designation} onChange={handle(setItEmp)} />
                <Field label="Date Joined" name="date_joined" type="date" value={itEmp.date_joined} onChange={handle(setItEmp)} />
                <Field label="DOB" name="DOB" type="date" value={itEmp.DOB} onChange={handle(setItEmp)} />
                <Field label="Phone" name="phoneNumber" value={itEmp.phoneNumber} onChange={handle(setItEmp)} />
              </>
            )}

          </div>

          <button type="submit" style={s.submitBtn}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;

const s = {
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
    width: "700px",
    maxHeight: "90vh",
    background: "#fff",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  header: {
    background: "linear-gradient(135deg, #6a7cff, #8f8bff)",
    color: "#fff",
    padding: "16px 20px",
    fontSize: "16px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tabsWrapper: {
    display: "flex",
    gap: "8px",
    padding: "10px 20px",
    background: "#f5f6ff",
  },

  tabBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  activeTab: {
    background: "#6a7cff",
    color: "#fff",
  },

  form: {
    padding: "20px",
    overflowY: "auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  submitBtn: {
    alignSelf: "center",
    marginTop: "20px",
    padding: "12px 28px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #6a7cff, #8f8bff)",
    color: "#fff",
    cursor: "pointer",
  },
};
const f = {
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#555",
    letterSpacing: "0.4px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #c9ccff",
    fontSize: "14px",
    outline: "none",
    background: "#f9faff",
    transition: "all 0.2s ease",
  },
};