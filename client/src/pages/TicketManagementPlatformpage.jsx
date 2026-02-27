import React, { useState, useRef } from "react";

/* ─────────────────────────── helpers ─────────────────────────── */
const Field = ({ label, required, children, style }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
    <label style={fieldStyles.label}>
      {label} {required && <span style={{ color: "#e05252" }}>*</span>}
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

const Select = ({ children, ...props }) => (
  <select {...props} style={fieldStyles.select}>
    {children}
  </select>
);

const SectionCard = ({ icon, title, children }) => (
  <div style={sectionStyles.card}>
    <div style={sectionStyles.header}>
      <span style={sectionStyles.icon}>{icon}</span>
      <span style={sectionStyles.title}>{title}</span>
    </div>
    <div style={sectionStyles.divider} />
    <div style={{ padding: "20px 24px 24px" }}>{children}</div>
  </div>
);

/* ─────────────────────────── main page ─────────────────────────── */
const TicketManagementPage = () => {
  const [createdBy, setCreatedBy] = useState("client");
  const [workaround, setWorkaround] = useState("yes");
  const [supportType, setSupportType] = useState("remote");
  const [issueTitle, setIssueTitle] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileRef = useRef();

  const handleFiles = (incoming) => {
    setFiles((prev) => [...prev, ...Array.from(incoming)]);
  };

  return (
    <div style={page.wrapper}>
      {/* ── Page Header ── */}
      <div style={page.headerBlock}>
        <h1 style={page.title}>Ticket Management Platform</h1>
        <p style={page.sub}>My Ticket</p>
      </div>

      {/* ── Outer card ── */}
      <div style={page.outerCard}>

        {/* Ticket Created By – top bar */}
        <div style={topBar.wrapper}>
          <span style={topBar.label}>
            TICKET CREATED BY <span style={{ color: "#e05252" }}>*</span>
          </span>
          {["client", "admin"].map((val) => (
            <label key={val} style={topBar.optionLabel}>
              <span
                style={{
                  ...topBar.radio,
                  borderColor: createdBy === val ? "#6a7cff" : "#aab0d8",
                }}
                onClick={() => setCreatedBy(val)}
              >
                {createdBy === val && <span style={topBar.radioDot} />}
              </span>
              {val === "client" ? "CLIENT (SELF)" : "ADMIN/SUPPORT TEAM"}
            </label>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "20px" }}>

          {/* ── Client Information ── */}
          <SectionCard icon="👤" title="CLIENT INFORMATION">
            <div style={grid.two}>
              <Field label="Contact Person" required>
                <Input placeholder="Ramesh bhai Patel" />
              </Field>
              <Field label="Contact Phone" required>
                <Input placeholder="9632158741" />
              </Field>
              <Field label="Contact Email" required>
                <Input placeholder="rameshpatel258@gmail.com" type="email" />
              </Field>
              <Field label="Department">
                <Select>
                  <option>Select Department</option>
                  <option>IT</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Operations</option>
                </Select>
              </Field>
            </div>
          </SectionCard>

          {/* ── Asset / Device Details ── */}
          <SectionCard icon="🖥️" title="ASSET / DEVICE DETAILS">
            <div style={grid.two}>
              <Field label="Asset Type" required>
                <Select>
                  <option>Select Asset Type</option>
                  <option>Laptop</option>
                  <option>Desktop</option>
                  <option>Printer</option>
                  <option>Server</option>
                  <option>Network Device</option>
                </Select>
              </Field>
              <Field label="Location" required>
                <Input placeholder="2nd Floor, Room 204" />
              </Field>
              <Field label="Asset ID / Hostname" required>
                <Input placeholder="PC-IT-042" />
              </Field>
            </div>
          </SectionCard>

          {/* ── Issue Classification ── */}
          <SectionCard icon="🕐" title="ISSUE CLASSIFICATION">
            <div style={grid.two}>
              <Field label="Category" required>
                <Select>
                  <option>Select Category</option>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Network</option>
                  <option>Security</option>
                </Select>
              </Field>
              <Field label="Priority" required>
                <Input placeholder="Medium" />
              </Field>
              <Field label="Sub-Category" required>
                <Select>
                  <option>Select Sub-Category</option>
                  <option>Driver Issue</option>
                  <option>OS Crash</option>
                  <option>Connectivity</option>
                  <option>Access Issue</option>
                </Select>
              </Field>
              <Field label="Impact" required>
                <Input placeholder="Single User" />
              </Field>
            </div>
          </SectionCard>

          {/* ── Issue Description ── */}
          <SectionCard icon="📄" title="ISSUE DESCRIPTION">
            <div style={grid.two}>
              <Field label="Issue Title" required>
                <div style={{ position: "relative" }}>
                  <Input
                    placeholder="Brief summary"
                    maxLength={100}
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                  />
                  <span style={descStyles.counter}>{issueTitle.length}/100</span>
                </div>
              </Field>
              <Field label="Error Message (if any)">
                <Input placeholder="Copy-paste any error codes" />
              </Field>
            </div>
            <div style={{ ...grid.two, marginTop: "16px" }}>
              <Field label="Detailed Description" required>
                <textarea
                  placeholder="Describe the issue in detail..."
                  style={fieldStyles.textarea}
                  onFocus={(e) => (e.target.style.borderColor = "#6a7cff")}
                  onBlur={(e) => (e.target.style.borderColor = "#dde0f5")}
                />
              </Field>
              <Field label="When did it start?" required>
                <Input type="datetime-local" />
              </Field>
            </div>
          </SectionCard>

          {/* ── Work Environment Context ── */}
          <SectionCard icon="🏢" title="WORK ENVIRONMENT CONTEXT">
            <div style={grid.two}>
              {/* Left col */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Field label="Is user able to work?" required>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[
                      { val: "yes", label: "✓ Yes (workaround exists)" },
                      { val: "no", label: "✗ No (complete blocker)" },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setWorkaround(val)}
                        style={{
                          ...toggleBtn.base,
                          ...(workaround === val ? toggleBtn.active : toggleBtn.inactive),
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Attachments">
                  <div
                    style={{
                      ...dropzone.base,
                      ...(dragOver ? dropzone.over : {}),
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                    onClick={() => fileRef.current.click()}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <div style={dropzone.icon}>⬆</div>
                    <div style={dropzone.text}>Upload files</div>
                    <div style={dropzone.sub}>Screenshots, logs, or documents</div>
                    {files.length > 0 && (
                      <div style={{ marginTop: "8px", fontSize: "12px", color: "#6a7cff" }}>
                        {files.map((f) => f.name).join(", ")}
                      </div>
                    )}
                  </div>
                </Field>
              </div>

              {/* Right col */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Field label="Business Impact" required>
                  <Input placeholder="Minor" />
                </Field>
                <Field label="Support Type" required>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[
                      { val: "remote", label: "Remote Support" },
                      { val: "onsite", label: "On-site Visit Required" },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSupportType(val)}
                        style={{
                          ...toggleBtn.base,
                          ...(supportType === val ? toggleBtn.active : toggleBtn.inactive),
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* ── Actions ── */}
        <div style={page.actions}>
          <button style={page.cancelBtn}>Cancel</button>
          <button style={page.submitBtn}>Submit Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default TicketManagementPage;

/* ─────────────────────────── styles ─────────────────────────── */
const page = {
  wrapper: { fontFamily: "'Segoe UI', sans-serif", color: "#1e2140" },
  headerBlock: { marginBottom: "24px", textAlign: "left" },
  title: { margin: 0, fontSize: "26px", fontWeight: 700, color: "#1e2140" },
  sub: { margin: "4px 0 0", fontSize: "13px", color: "#888" },
  outerCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(106,124,255,0.08)",
    width: "100%",
    overflow: "hidden",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "16px 20px",
    borderTop: "1px solid #eef0fb",
    background: "#fafbff",
  },
  cancelBtn: {
    padding: "11px 28px",
    borderRadius: "8px",
    border: "1px solid #d0d4f0",
    background: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    color: "#555",
  },
  submitBtn: {
    padding: "11px 28px",
    borderRadius: "8px",
    border: "none",
    background: "#6a7cff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
};

const topBar = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    padding: "14px 24px",
    borderBottom: "1px solid #eef0fb",
    background: "#fafbff",
  },
  label: { fontSize: "12px", fontWeight: 700, color: "#4b4f9c", letterSpacing: "0.5px" },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#333",
    cursor: "pointer",
    userSelect: "none",
  },
  radio: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "2px solid #aab0d8",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  radioDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6a7cff",
  },
};

const sectionStyles = {
  card: {
    border: "1px solid #eef0fb",
    borderRadius: "12px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 24px 0",
  },
  icon: { fontSize: "15px" },
  title: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#4b4f9c",
    letterSpacing: "0.5px",
  },
  divider: { height: "1px", background: "#eef0fb", margin: "12px 0 0" },
};

const fieldStyles = {
  label: { fontSize: "13px", fontWeight: 500, color: "#444" },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #dde0f5",
    fontSize: "14px",
    outline: "none",
    background: "#fafbff",
    color: "#1e2140",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #dde0f5",
    fontSize: "14px",
    outline: "none",
    background: "#fafbff",
    color: "#1e2140",
    width: "100%",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #dde0f5",
    fontSize: "14px",
    outline: "none",
    background: "#fafbff",
    color: "#1e2140",
    width: "100%",
    boxSizing: "border-box",
    minHeight: "110px",
    resize: "vertical",
    transition: "border-color 0.2s",
  },
};

const grid = {
  two: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
};

const descStyles = {
  counter: {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    fontSize: "11px",
    color: "#aaa",
    pointerEvents: "none",
  },
};

const toggleBtn = {
  base: {
    padding: "9px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    border: "1.5px solid transparent",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  active: {
    background: "#eef0ff",
    borderColor: "#6a7cff",
    color: "#4b4f9c",
  },
  inactive: {
    background: "#f5f6fc",
    borderColor: "#dde0f5",
    color: "#777",
  },
};

const dropzone = {
  base: {
    border: "2px dashed #c8ccee",
    borderRadius: "10px",
    padding: "24px 16px",
    textAlign: "center",
    cursor: "pointer",
    background: "#fafbff",
    transition: "border-color 0.2s, background 0.2s",
  },
  over: {
    borderColor: "#6a7cff",
    background: "#f0f2ff",
  },
  icon: { fontSize: "22px", color: "#6a7cff", marginBottom: "6px" },
  text: { fontSize: "14px", fontWeight: 600, color: "#333" },
  sub: { fontSize: "12px", color: "#aaa", marginTop: "4px" },
};