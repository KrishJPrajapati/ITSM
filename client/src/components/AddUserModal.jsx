import React, { useState } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const Field = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div style={f.group}>
    <label style={f.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label}`}
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
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

// ── Initial States ────────────────────────────────────────────────────────────
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

// ── Tabs Config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: "company",   label: "🏢 Client Company" },
  { id: "clientEmp", label: "👤 Client Employee" },
  { id: "itEmp",     label: "🛠️ IT Employee" },
];

// ── Main Modal ────────────────────────────────────────────────────────────────
const AddUserModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("company");
  const [company,   setCompany]   = useState(initCompany);
  const [clientEmp, setClientEmp] = useState(initClientEmp);
  const [itEmp,     setItEmp]     = useState(initITEmp);
  const [submitted, setSubmitted] = useState(false);

  const handle = (setter) => (e) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual API call
    const payload =
      activeTab === "company"   ? company   :
      activeTab === "clientEmp" ? clientEmp : itEmp;
    console.log(`Submitting [${activeTab}]:`, payload);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (activeTab === "company")   setCompany(initCompany);
      if (activeTab === "clientEmp") setClientEmp(initClientEmp);
      if (activeTab === "itEmp")     setItEmp(initITEmp);
    }, 2000);
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={s.header}>
          <span style={s.headerTitle}>➕ Add New User</span>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              style={{ ...s.tab, ...(activeTab === t.id ? s.tabActive : {}) }}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form style={s.form} onSubmit={handleSubmit}>
          <div style={s.grid}>

            {/* ── Client Company ── */}
            {activeTab === "company" && (
              <>
                <Field label="Company Name"     name="companyName"     value={company.companyName}     onChange={handle(setCompany)} />
                <Field label="City"             name="city"            value={company.city}            onChange={handle(setCompany)} />
                <Field label="Telephone"        name="tel"             value={company.tel}             onChange={handle(setCompany)} type="tel" />
                <Field label="Head"             name="head"            value={company.head}            onChange={handle(setCompany)} />
                <Field label="Contract Start"   name="contractStart"   value={company.contractStart}   onChange={handle(setCompany)} type="date" />
                <Field label="Contract End"     name="contractEnd"     value={company.contractEnd}     onChange={handle(setCompany)} type="date" />
                <Field label="Email"            name="email"           value={company.email}           onChange={handle(setCompany)} type="email" />
                <Field label="Address"          name="address"         value={company.address}         onChange={handle(setCompany)} />
                <Select
                  label="Category" name="category" value={company.category} onChange={handle(setCompany)}
                  options={["Enterprise", "SMB", "Startup", "Government", "Education", "Healthcare"]}
                />
              </>
            )}

            {/* ── Client Employee ── */}
            {activeTab === "clientEmp" && (
              <>
                <Field label="First Name"    name="firstName"    value={clientEmp.firstName}    onChange={handle(setClientEmp)} />
                <Field label="Last Name"     name="lastName"     value={clientEmp.lastName}     onChange={handle(setClientEmp)} />
                <Field label="Phone Number"  name="phoneNumber"  value={clientEmp.phoneNumber}  onChange={handle(setClientEmp)} type="tel" />
                <Field label="Email"         name="email"        value={clientEmp.email}        onChange={handle(setClientEmp)} type="email" />
                <Field label="Password"      name="password"     value={clientEmp.password}     onChange={handle(setClientEmp)} type="password" />
                <Field label="Company Name"  name="companyName"  value={clientEmp.companyName}  onChange={handle(setClientEmp)} />
                <Field label="Office Name"   name="officeName"   value={clientEmp.officeName}   onChange={handle(setClientEmp)} />
                <Field label="City"          name="city"         value={clientEmp.city}         onChange={handle(setClientEmp)} />
                <Field label="State"         name="state"        value={clientEmp.state}        onChange={handle(setClientEmp)} />
                <Field label="Designation"   name="designation"  value={clientEmp.designation}  onChange={handle(setClientEmp)} />
                <Field label="Department"    name="department"   value={clientEmp.department}   onChange={handle(setClientEmp)} />
                <Field label="Head Name"     name="headName"     value={clientEmp.headName}     onChange={handle(setClientEmp)} />
                <Field label="Date of Birth" name="DOB"          value={clientEmp.DOB}          onChange={handle(setClientEmp)} type="date" />
              </>
            )}

            {/* ── IT Employee ── */}
            {activeTab === "itEmp" && (
              <>
                <Field label="First Name"    name="firstName"    value={itEmp.firstName}    onChange={handle(setItEmp)} />
                <Field label="Last Name"     name="lastName"     value={itEmp.lastName}     onChange={handle(setItEmp)} />
                <Field label="Email"         name="email"        value={itEmp.email}        onChange={handle(setItEmp)} type="email" />
                <Field label="Password"      name="password"     value={itEmp.password}     onChange={handle(setItEmp)} type="password" />
                <Field label="Designation"   name="designation"  value={itEmp.designation}  onChange={handle(setItEmp)} />
                <Field label="Date Joined"   name="date_joined"  value={itEmp.date_joined}  onChange={handle(setItEmp)} type="date" />
                <Field label="Date of Birth" name="DOB"          value={itEmp.DOB}          onChange={handle(setItEmp)} type="date" />
                <Field label="Phone Number"  name="phoneNumber"  value={itEmp.phoneNumber}  onChange={handle(setItEmp)} type="tel" />
              </>
            )}
          </div>

          {/* Submit */}
          <button type="submit" style={s.submitBtn}>
            {submitted ? "✅ Saved!" : "Save User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;

// ── Field Styles ──────────────────────────────────────────────────────────────
const f = {
  group: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.4px" },
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1.5px solid #d0d4ff",
    fontSize: "13.5px",
    outline: "none",
    background: "#f7f8ff",
    color: "#333",
    transition: "border 0.2s",
  },
};

// ── Modal Styles ──────────────────────────────────────────────────────────────
const s = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(80,80,160,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 2000,
    backdropFilter: "blur(4px)",
  },
  modal: {
    background: "#fff",
    borderRadius: "22px",
    width: "680px",
    maxWidth: "95vw",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 64px rgba(80,80,180,0.22)",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 28px 16px",
    borderBottom: "1px solid #eef0ff",
    background: "linear-gradient(135deg, #6a7cff, #8f8bff)",
  },
  headerTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "0.3px",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.25)",
    border: "none",
    color: "#fff",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    display: "flex",
    gap: "0",
    background: "#f3f4ff",
    borderBottom: "1px solid #e0e3ff",
  },
  tab: {
    flex: 1,
    padding: "13px 10px",
    border: "none",
    background: "transparent",
    fontSize: "13px",
    fontWeight: 500,
    color: "#888",
    cursor: "pointer",
    transition: "all 0.18s",
    borderBottom: "3px solid transparent",
  },
  tabActive: {
    color: "#6a7cff",
    fontWeight: 700,
    borderBottom: "3px solid #6a7cff",
    background: "#fff",
  },
  form: {
    padding: "24px 28px 20px",
    overflowY: "auto",
    flex: 1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #6a7cff, #8f8bff)",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "opacity 0.2s",
  },
};