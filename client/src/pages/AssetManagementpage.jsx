import React, { useState } from "react";

/* ─────────────────────────── helpers ─────────────────────────── */
const Field = ({ label, required, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    <label style={fieldStyles.label}>
      {label}{required && <span style={{ color: "#e05252" }}>*</span>}
    </label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    style={fieldStyles.input}
    onFocus={(e) => (e.target.style.borderColor = "#6a7cff")}
    onBlur={(e) => (e.target.style.borderColor = "#dde0f5")}
  />
);

const SectionHeader = ({ icon, title }) => (
  <div style={sectionStyles.wrapper}>
    <div style={sectionStyles.header}>
      <span style={sectionStyles.icon}>{icon}</span>
      <span style={sectionStyles.title}>{title}</span>
    </div>
    <div style={sectionStyles.divider} />
  </div>
);

/* ─────────────────────────── initial assets ─────────────────────────── */
const initialAssets = [
  { id: "AST-120", name: "Dell Latitude 5420", type: "Laptop", location: "Floor 1, Q/A", user: "Parth, Engineer", maintenance: "7 Jan 2024", status: "In Use" },
  { id: "AST-1587", name: "Konica Minolta", type: "Printer", location: "Admin Office", user: "Admin Department / IT", maintenance: "25 Feb 2022", status: "In Use" },
  { id: "AST-965", name: "HP Proliant DL380", type: "Laptop", location: "HR Office", user: "HR", maintenance: "2 Dec 2025", status: "Maintenance" },
  { id: "AST-741", name: "Cisco Catalyst 9200", type: "Router / Switch", location: "Dispatch", user: "IT", maintenance: "31 Jun 2024", status: "Retired" },
];

/* ─────────────────────────── main page ─────────────────────────── */
const AssetManagementPage = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    assetId: "", assetName: "", assetType: "", brand: "",
    modelNumber: "", serialNumber: "", ipAddress: "", macAddress: "",
    purchaseDate: "", warrantyExpiry: "", location: "", assignedUser: "",
    assetStatus: "", lastMaintenance: "", maintenanceDesc: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleReset = () =>
    setForm({ assetId: "", assetName: "", assetType: "", brand: "", modelNumber: "", serialNumber: "", ipAddress: "", macAddress: "", purchaseDate: "", warrantyExpiry: "", location: "", assignedUser: "", assetStatus: "", lastMaintenance: "", maintenanceDesc: "" });

  const handleAdd = () => {
    if (!form.assetId || !form.assetName) return alert("Asset ID and Name are required.");
    setAssets((prev) => [...prev, {
      id: form.assetId, name: form.assetName, type: form.assetType,
      location: form.location, user: form.assignedUser,
      maintenance: form.lastMaintenance, status: form.assetStatus || "In Use",
    }]);
    handleReset();
  };

  const filtered = assets.filter((a) =>
    [a.id, a.name, a.type, a.location, a.user].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const inUse = assets.filter((a) => a.status === "In Use").length;
  const maintenance = assets.filter((a) => a.status === "Maintenance").length;
  const retired = assets.filter((a) => a.status === "Retired").length;

  const statusColor = (s) => ({
    "In Use": { background: "#eef0ff", color: "#4b4f9c" },
    "Maintenance": { background: "#fff4e5", color: "#b36b00" },
    "Retired": { background: "#fdeaea", color: "#c0392b" },
  }[s] || { background: "#eee", color: "#555" });

  return (
    <div style={page.wrapper}>
      {/* ── Top Bar ── */}
      <div style={page.topBar}>
        <span style={page.topTitle}>Asset Management</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {[`${inUse} in use`, `${maintenance} Maintenance`, `${retired} Retired`].map((t) => (
            <span key={t} style={page.badge}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Page Title ── */}
      <h1 style={page.title}>Asset Management</h1>

      {/* ── Register Card ── */}
      <div style={page.card}>
        {/* Card Header */}
        <div style={cardHeader.wrapper}>
          <div style={cardHeader.iconBox}>
            <span style={{ fontSize: "20px" }}>➕</span>
          </div>
          <div>
            <div style={cardHeader.title}>Register New Asset</div>
            <div style={cardHeader.sub}>Fill in the details to add an IT asset to the registry</div>
          </div>
        </div>

        <div style={{ padding: "0 24px 24px" }}>
          {/* Asset Identification */}
          <SectionHeader icon="#" title="ASSET IDENTIFICATION" />
          <div style={grid.two}>
            <Field label="Asset ID"><Input placeholder="" value={form.assetId} onChange={set("assetId")} /></Field>
            <Field label="Asset Name" required><Input placeholder="" value={form.assetName} onChange={set("assetName")} /></Field>
            <Field label="Asset Type" required><Input placeholder="" value={form.assetType} onChange={set("assetType")} /></Field>
            <Field label="Brand"><Input placeholder="" value={form.brand} onChange={set("brand")} /></Field>
            <Field label="Model Number"><Input placeholder="" value={form.modelNumber} onChange={set("modelNumber")} /></Field>
            <Field label="Serial Number"><Input placeholder="" value={form.serialNumber} onChange={set("serialNumber")} /></Field>
          </div>

          {/* Network Information */}
          <SectionHeader icon="✳" title="NETWORK INFORMATION" />
          <div style={grid.two}>
            <Field label="IP Address"><Input placeholder="" value={form.ipAddress} onChange={set("ipAddress")} /></Field>
            <Field label="MAC Address"><Input placeholder="" value={form.macAddress} onChange={set("macAddress")} /></Field>
          </div>

          {/* Purchase & Warranty */}
          <SectionHeader icon="🖥" title="PURCHASE & WARRANTY" />
          <div style={grid.two}>
            <Field label="Purchase Date"><Input type="date" value={form.purchaseDate} onChange={set("purchaseDate")} /></Field>
            <Field label="Warranty Expiry Date"><Input type="date" value={form.warrantyExpiry} onChange={set("warrantyExpiry")} /></Field>
          </div>

          {/* Location & Assignment */}
          <SectionHeader icon="📍" title="LOCATION % ASSIGNMENT" />
          <div style={grid.two}>
            <Field label="Asset Location"><Input placeholder="" value={form.location} onChange={set("location")} /></Field>
            <Field label="Assigned User / Department"><Input placeholder="" value={form.assignedUser} onChange={set("assignedUser")} /></Field>
          </div>

          {/* Maintenance & Status */}
          <SectionHeader icon="🔧" title="MAINTENANCE & STATUS" />
          <div style={grid.two}>
            <Field label="Asset Location"><Input placeholder="" value={form.assetStatus} onChange={set("assetStatus")} /></Field>
            <Field label="Asset Location"><Input placeholder="" value={form.lastMaintenance} onChange={set("lastMaintenance")} /></Field>
          </div>
          <div style={{ marginTop: "16px" }}>
            <Field label="Maintenance Description">
              <textarea
                value={form.maintenanceDesc}
                onChange={set("maintenanceDesc")}
                style={fieldStyles.textarea}
                onFocus={(e) => (e.target.style.borderColor = "#6a7cff")}
                onBlur={(e) => (e.target.style.borderColor = "#dde0f5")}
              />
            </Field>
          </div>
        </div>

        {/* Actions */}
        <div style={page.actions}>
          <button style={page.resetBtn} onClick={handleReset}>↺ Reset</button>
          <button style={page.addBtn} onClick={handleAdd}>+ Add Asset</button>
        </div>
      </div>

      {/* ── Asset Registry ── */}
      <div style={{ marginTop: "32px" }}>
        {/* Registry Header */}
        <div style={registry.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "22px" }}>📋</span>
            <span style={registry.title}>Asset Registry</span>
            <span style={registry.countBadge}>{assets.length} Assets</span>
          </div>
          <div style={registry.searchWrapper}>
            <span style={{ fontSize: "14px", color: "#888" }}>🔍</span>
            <input
              placeholder="Search Assets......"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={registry.searchInput}
            />
          </div>
        </div>

        {/* Table */}
        <div style={registry.tableCard}>
          <table style={registry.table}>
            <thead>
              <tr style={registry.theadRow}>
                {["Asset ID", "Asset Name", "Type", "Location", "Assigned User", "Last Maintence", "Status"].map((h) => (
                  <th key={h} style={registry.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                  <td style={registry.td}>{a.id}</td>
                  <td style={registry.td}>{a.name}</td>
                  <td style={registry.td}>{a.type}</td>
                  <td style={registry.td}>{a.location}</td>
                  <td style={registry.td}>{a.user}</td>
                  <td style={registry.td}>{a.maintenance}</td>
                  <td style={registry.td}>
                    <span style={{ ...registry.statusBadge, ...statusColor(a.status) }}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={registry.footer}>
            <span>Showing {filtered.length} of {assets.length} Assets</span>
            <span>Updated {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagementPage;

/* ─────────────────────────── styles ─────────────────────────── */
const page = {
  wrapper: { fontFamily: "'Segoe UI', sans-serif", color: "#1e2140" },
  topBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "16px",
  },
  topTitle: { fontSize: "15px", fontWeight: 600, color: "#4b4f9c" },
  badge: {
    padding: "4px 12px", borderRadius: "20px", border: "1px solid #d0d4f0",
    fontSize: "12px", color: "#555", background: "#fff",
  },
  title: { fontSize: "26px", fontWeight: 700, margin: "0 0 20px", color: "#1e2140" },
  card: {
    background: "#fff", borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(106,124,255,0.08)",
    border: "1px solid #eef0fb", overflow: "hidden",
  },
  actions: {
    display: "flex", justifyContent: "flex-end", gap: "12px",
    padding: "16px 24px", borderTop: "1px solid #eef0fb", background: "#fafbff",
  },
  resetBtn: {
    padding: "10px 22px", borderRadius: "8px", border: "1px solid #d0d4f0",
    background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 500, color: "#555",
  },
  addBtn: {
    padding: "10px 22px", borderRadius: "8px", border: "none",
    background: "#4b4f9c", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600,
  },
};

const cardHeader = {
  wrapper: {
    display: "flex", alignItems: "center", gap: "14px",
    padding: "20px 24px 16px", borderBottom: "1px solid #eef0fb",
  },
  iconBox: {
    width: "44px", height: "44px", borderRadius: "10px",
    background: "#eef0ff", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  title: { fontSize: "15px", fontWeight: 700, color: "#1e2140" },
  sub: { fontSize: "12px", color: "#888", marginTop: "2px" },
};

const sectionStyles = {
  wrapper: { marginTop: "24px", marginBottom: "16px" },
  header: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  icon: { fontSize: "13px", color: "#6a7cff" },
  title: { fontSize: "11px", fontWeight: 700, color: "#6a7cff", letterSpacing: "0.6px" },
  divider: { height: "1px", background: "#eef0fb" },
};

const fieldStyles = {
  label: { fontSize: "12px", fontWeight: 500, color: "#555" },
  input: {
    padding: "9px 12px", borderRadius: "8px", border: "1px solid #dde0f5",
    fontSize: "13px", outline: "none", background: "#f0f1fb",
    color: "#1e2140", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  textarea: {
    padding: "10px 12px", borderRadius: "8px", border: "1px solid #dde0f5",
    fontSize: "13px", outline: "none", background: "#f0f1fb",
    color: "#1e2140", width: "100%", boxSizing: "border-box",
    minHeight: "100px", resize: "vertical", transition: "border-color 0.2s",
  },
};

const grid = {
  two: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
};

const registry = {
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "16px",
  },
  title: { fontSize: "20px", fontWeight: 700, color: "#1e2140" },
  countBadge: {
    padding: "3px 12px", borderRadius: "20px", border: "1px solid #d0d4f0",
    fontSize: "12px", color: "#555", background: "#fff",
  },
  searchWrapper: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "9px 16px", borderRadius: "8px", border: "1px solid #dde0f5",
    background: "#fff", minWidth: "220px",
  },
  searchInput: {
    border: "none", outline: "none", fontSize: "13px",
    color: "#333", background: "transparent", width: "100%",
  },
  tableCard: {
    background: "#fff", borderRadius: "12px",
    border: "1px solid #eef0fb", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(106,124,255,0.06)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { borderBottom: "1px solid #eef0fb", background: "#fafbff" },
  th: {
    padding: "12px 16px", textAlign: "left",
    fontSize: "13px", fontWeight: 600, color: "#444",
  },
  td: {
    padding: "14px 16px", fontSize: "13px", color: "#333",
    borderBottom: "1px solid #f0f1fb", verticalAlign: "middle",
  },
  statusBadge: {
    padding: "3px 10px", borderRadius: "20px",
    fontSize: "11px", fontWeight: 600,
  },
  footer: {
    display: "flex", justifyContent: "space-between",
    padding: "12px 16px", fontSize: "12px", color: "#888",
    borderTop: "1px solid #eef0fb", background: "#fafbff",
  },
};