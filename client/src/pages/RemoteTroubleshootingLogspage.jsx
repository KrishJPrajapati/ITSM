import React, { useState, useEffect } from "react";
import { API } from "../service/api"; 
const emptyForm = {
  clientName: "", clientInitials: "", dept: "", asset: "",
  summary: "", detail: "", priority: "Medium", status: "Open",
};


const ITEMS_PER_PAGE = 6;

const priorityColors = {
  High: { color: "#c0392b", background: "#fdeaea" },
  Medium: { color: "#b36b00", background: "#fff4e5" },
  Low: { color: "#1a7a4a", background: "#e6f7ef" },
};

const statusColors = {
  Resolved: { color: "#1a7a4a", background: "#e6f7ef", dot: "#27ae60" },
  "In Progress": { color: "#4b4f9c", background: "#eef0ff", dot: "#6a7cff" },
  Open: { color: "#b36b00", background: "#fff4e5", dot: "#e67e22" },
};

const avatarColors = ["#9fa3ff", "#f4a261", "#2a9d8f", "#e76f51", "#8ecae6", "#a8dadc", "#e9c46a", "#264653"];

/* ─────────────────────────── main page ─────────────────────────── */
const RemoteTroubleshootingLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All Priorities");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  /* ── Export CSV ── */
  const handleExportCSV = () => {
    const headers = ["Ticket ID", "Client Name", "Department", "Asset", "Summary", "Detail", "Priority", "Status", "Opened"];
    const rows = filtered.map((l) => [
      l.id, l.clientName, l.dept, l.asset,
      `"${l.summary}"`, `"${l.detail}"`,
      l.priority, l.status, l.opened,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `troubleshooting_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };


  const handleDownload = (log) => {
    if (!log) return;
    const content = [
      `REMOTE TROUBLESHOOTING LOG`,
      `================================`,
      `Ticket ID   : ${log.id}`,
      `Opened      : ${log.opened}`,
      ``,
      `CLIENT`,
      `Name        : ${log.clientName}`,
      `Department  : ${log.dept}`,
      ``,
      `ASSET`,
      `Asset ID    : ${log.asset}`,
      ``,
      `ISSUE`,
      `Summary     : ${log.summary}`,
      `Detail      : ${log.detail}`,
      ``,
      `CLASSIFICATION`,
      `Priority    : ${log.priority}`,
      `Status      : ${log.status}`,
      ``,
      `================================`,
      `Generated on: ${new Date().toLocaleString()}`,
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${log.id}_log.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = logs.filter((l) => {
    const matchSearch =
      !search ||
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.asset.toLowerCase().includes(search.toLowerCase()) ||
      l.summary.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priority === "All Priorities" || l.priority === priority;
    const matchStatus = status === "All Status" || l.status === status;
    return matchSearch && matchPriority && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = [
    { icon: "≡", label: "TOTAL LOGS", value: logs.length, color: "#6a7cff" },
    { icon: "⊙", label: "OPEN ISSUES", value: logs.filter((l) => l.status === "Open").length, color: "#e67e22" },
    { icon: "↗", label: "IN PROGRESS", value: logs.filter((l) => l.status === "In Progress").length, color: "#6a7cff" },
    { icon: "✓", label: "RESOLVED", value: logs.filter((l) => l.status === "Resolved").length, color: "#27ae60" },
  ];
  useEffect(() => {
  fetchLogs();
}, []);
  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const getStatus = (t) => {
  if (t.closed_at) return "Resolved";
  if (t.status === "IN_PROGRESS") return "In Progress";
  return "Open";
};
const fetchLogs = async () => {
  try {
    const response = await API.getClosedLogs(); // your backend route

    if (response.isSuccess) {
      const transformed = response.data.logs.map((t) => ({
        id: t.ticket_id,

        clientName: t.client_email || "Unknown",
        clientInitials: t.client_email
          ? t.client_email[0].toUpperCase()
          : "U",

        dept: t.department || "-",
        asset: t.asset_id || "-",

        summary: t.ticket_title,
        detail: t.description || "-",

        priority: capitalize(t.priority),

        // 🔥 IMPORTANT
        status: getStatus(t),

        opened: new Date(t.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setLogs(transformed);

      // default selection (same UI behavior)
      if (transformed.length > 0) {
        setSelectedLog(transformed[0]);
      }
    }
  } catch (err) {
    console.error("LOG FETCH ERROR:", err);
  }
};
  return (
    <div style={pg.wrapper}>
      {/* ── Header Box ── */}
      <div style={pg.headerBox}>
        <div style={pg.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={pg.headerIcon}>📋</div>
            <div>
              
              <h1 style={pg.title}>Remote Troubleshooting Logs</h1>
              <p style={pg.sub}>Search, filter, and analyze incident reports</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btn.outline} onClick={handleExportCSV}>⬇ Export CSV</button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={pg.statsRow}>
        {stats.map((s) => (
          <div key={s.label} style={pg.statCard}>
            <span style={{ ...pg.statIcon, color: s.color }}>{s.icon}</span>
            <div>
              <div style={pg.statValue}>{s.value.toLocaleString()}</div>
              <div style={pg.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main area ── */}
      <div style={{ display: "flex", gap: "16px" }}>
        {/* ── Table Card ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Filters */}
          <div style={pg.filterRow}>
            <div style={pg.searchBox}>
              <span style={{ color: "#aaa", fontSize: "14px" }}>🔍</span>
              <input
                placeholder="Search by Ticket ID, Asset, or Error..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={pg.searchInput}
              />
            </div>
            {[
              { val: priority, set: setPriority, opts: ["All Priorities", "High", "Medium", "Low"] },
              { val: status, set: setStatus, opts: ["All Status", "Resolved", "In Progress", "Open"] },
              { val: dateRange, set: setDateRange, opts: ["Last 30 Days", "Last 7 Days", "Last 90 Days"] },
            ].map((f, i) => (
              <select
                key={i}
                value={f.val}
                onChange={(e) => { f.set(e.target.value); setPage(1); }}
                style={pg.filterSelect}
              >
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>

          {/* Table */}
          <div style={pg.tableCard}>
            <div style={pg.tableHeader}>
              <span style={pg.tableTitle}>
                Recent Logs <span style={pg.logsBadge}>{filtered.length}</span>
              </span>
              <button style={pg.refreshBtn}>↻</button>
            </div>

            <table style={tbl.table}>
              <thead>
                <tr style={tbl.headRow}>
                  {["TICKET ID", "CLIENT", "ASSET", "ISSUE SUMMARY", "PRIORITY", "STATUS", "ACTION"].map((h) => (
                    <th key={h} style={tbl.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((log, i) => (
                  <tr
                    key={log.id}
                    style={{ ...tbl.row, background: selectedLog?.id === log.id ? "#f0f2ff" : i % 2 === 0 ? "#fff" : "#fafbff", cursor: "pointer" }}
                    onClick={() => { setSelectedLog(log); setDrawerOpen(true); }}
                  >
                    <td style={tbl.td}>
                      <span style={tbl.ticketId}>{log.id}</span>
                    </td>
                    <td style={tbl.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ ...tbl.avatar, background: avatarColors[i % avatarColors.length] }}>
                          {log.clientInitials}
                        </div>
                        <div>
                          <div style={tbl.clientName}>{log.clientName}</div>
                          <div style={tbl.clientDept}>{log.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td style={tbl.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={tbl.assetIcon}>🖥</span>
                        <span style={tbl.assetId}>{log.asset}</span>
                      </div>
                    </td>
                    <td style={tbl.td}>
                      <div style={tbl.issueSummary}>{log.summary}</div>
                      <div style={tbl.issueDetail}>{log.detail}</div>
                    </td>
                    <td style={tbl.td}>
                      <span style={{ ...tbl.badge, ...priorityColors[log.priority] }}>
                        {log.priority}
                      </span>
                    </td>
                    <td style={tbl.td}>
                      <span style={{ ...tbl.statusBadge, ...statusColors[log.status] }}>
                        <span style={{ ...tbl.dot, background: statusColors[log.status].dot }} />
                        {log.status}
                      </span>
                    </td>
                    <td style={tbl.td}>
                      <span style={tbl.arrow}>›</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={pg.pagination}>
              <span style={pg.paginationInfo}>Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} tickets</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button style={{ ...pg.pageBtn, opacity: page === 1 ? 0.4 : 1 }} onClick={() => setPage((p) => Math.max(1, p - 1))}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    style={{ ...pg.pageBtn, ...(page === p ? pg.pageBtnActive : {}) }}
                    onClick={() => setPage(p)}
                  >{p}</button>
                ))}
                <button style={{ ...pg.pageBtn, opacity: page === totalPages ? 0.4 : 1 }} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>›</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Detail Drawer ── */}
        {drawerOpen && selectedLog && (
          <div style={drawer.wrapper}>
            <div style={drawer.header}>
              <div>
                <span style={drawer.ticketId}>{selectedLog.id}</span>
                <span style={{ ...drawer.typeBadge }}>IT Support</span>
              </div>
              <button style={drawer.closeBtn} onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <p style={drawer.opened}>Opened on {selectedLog.opened}</p>

            <div style={drawer.section}>
              <div style={drawer.sectionTitle}>CLIENT</div>
              <div style={drawer.row}>
                <div style={{ ...tbl.avatar, background: avatarColors[logs.indexOf(selectedLog) % avatarColors.length], width: "32px", height: "32px", fontSize: "11px" }}>
                  {selectedLog.clientInitials}
                </div>
                <div>
                  <div style={drawer.clientName}>{selectedLog.clientName}</div>
                  <div style={drawer.clientDept}>{selectedLog.dept}</div>
                </div>
              </div>
            </div>

            <div style={drawer.section}>
              <div style={drawer.sectionTitle}>ASSET</div>
              <div style={drawer.value}>{selectedLog.asset}</div>
            </div>

            <div style={drawer.section}>
              <div style={drawer.sectionTitle}>ISSUE</div>
              <div style={drawer.value}>{selectedLog.summary}</div>
              <div style={drawer.detail}>{selectedLog.detail}</div>
            </div>

            <div style={drawer.section}>
              <div style={drawer.sectionTitle}>PRIORITY</div>
              <span style={{ ...tbl.badge, ...priorityColors[selectedLog.priority] }}>{selectedLog.priority}</span>
            </div>

            <div style={drawer.section}>
              <div style={drawer.sectionTitle}>STATUS</div>
              <span style={{ ...tbl.statusBadge, ...statusColors[selectedLog.status] }}>
                <span style={{ ...tbl.dot, background: statusColors[selectedLog.status].dot }} />
                {selectedLog.status}
              </span>
            </div>

            <div style={drawer.footer}>
              <button style={btn.outlineSm} onClick={() => setDrawerOpen(false)}>Close</button>
              <button style={btn.primarySm} onClick={() => handleDownload(selectedLog)}>⬇ Download Full Log</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoteTroubleshootingLogsPage;

/* ─────────────────────────── styles ─────────────────────────── */
const pg = {
  wrapper: { fontFamily: "'Segoe UI', sans-serif", color: "#1e2140" },
  headerBox: { background: "#fff", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e8eaf5", marginBottom: "20px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerIcon: { width: "44px", height: "44px", borderRadius: "10px", background: "#eef0ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 },
  platformLabel: { margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#4b4f9c", letterSpacing: "1.2px", textTransform: "uppercase" },
  title: { margin: 0, fontSize: "20px", fontWeight: 700, color: "#1e2140" },
  sub: { margin: "4px 0 0", fontSize: "12px", color: "#888" },

  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "20px" },
  statCard: { background: "#fff", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px", border: "1px solid #eef0fb", boxShadow: "0 2px 8px rgba(106,124,255,0.05)" },
  statIcon: { fontSize: "22px", fontWeight: 700 },
  statValue: { fontSize: "22px", fontWeight: 700, color: "#1e2140", lineHeight: 1 },
  statLabel: { fontSize: "11px", color: "#888", marginTop: "4px", letterSpacing: "0.4px" },

  filterRow: { display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap" },
  searchBox: { flex: 1, minWidth: "220px", display: "flex", alignItems: "center", gap: "8px", padding: "9px 14px", borderRadius: "8px", border: "1px solid #dde0f5", background: "#fff" },
  searchInput: { border: "none", outline: "none", fontSize: "13px", color: "#333", background: "transparent", width: "100%" },
  filterSelect: { padding: "9px 14px", borderRadius: "8px", border: "1px solid #dde0f5", fontSize: "13px", background: "#fff", color: "#333", outline: "none", cursor: "pointer" },

  tableCard: { background: "#fff", borderRadius: "12px", border: "1px solid #eef0fb", overflow: "hidden", boxShadow: "0 2px 12px rgba(106,124,255,0.06)" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #eef0fb" },
  tableTitle: { fontSize: "14px", fontWeight: 600, color: "#1e2140", display: "flex", alignItems: "center", gap: "8px" },
  logsBadge: { background: "#eef0ff", color: "#4b4f9c", borderRadius: "12px", padding: "2px 8px", fontSize: "12px", fontWeight: 600 },
  refreshBtn: { background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#888" },

  pagination: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: "1px solid #eef0fb", background: "#fafbff" },
  paginationInfo: { fontSize: "12px", color: "#888" },
  pageBtn: { width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #dde0f5", background: "#fff", cursor: "pointer", fontSize: "13px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" },
  pageBtnActive: { background: "#6a7cff", color: "#fff", borderColor: "#6a7cff" },
};

const btn = {
  primary: { padding: "9px 18px", borderRadius: "8px", border: "none", background: "#4b4f9c", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  outline: { padding: "9px 18px", borderRadius: "8px", border: "1px solid #d0d4f0", background: "#fff", color: "#555", cursor: "pointer", fontSize: "13px", fontWeight: 500 },
  primarySm: { padding: "8px 16px", borderRadius: "8px", border: "none", background: "#4b4f9c", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  outlineSm: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #d0d4f0", background: "#fff", color: "#555", cursor: "pointer", fontSize: "13px" },
};

const tbl = {
  table: { width: "100%", borderCollapse: "collapse" },
  headRow: { borderBottom: "1px solid #eef0fb", background: "#fafbff" },
  th: { padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", letterSpacing: "0.4px" },
  row: { borderBottom: "1px solid #f0f1fb", transition: "background 0.15s" },
  td: { padding: "12px 16px", fontSize: "13px", color: "#333", verticalAlign: "middle" },
  ticketId: { color: "#6a7cff", fontWeight: 600, fontSize: "12px" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#fff", flexShrink: 0 },
  clientName: { fontSize: "13px", fontWeight: 600, color: "#1e2140" },
  clientDept: { fontSize: "11px", color: "#888" },
  assetIcon: { fontSize: "14px" },
  assetId: { fontSize: "12px", fontWeight: 600, color: "#4b4f9c" },
  issueSummary: { fontSize: "13px", fontWeight: 600, color: "#1e2140" },
  issueDetail: { fontSize: "11px", color: "#888", marginTop: "2px" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 },
  statusBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "5px" },
  dot: { width: "6px", height: "6px", borderRadius: "50%", display: "inline-block" },
  arrow: { color: "#bbb", fontSize: "18px", cursor: "pointer" },
};

const drawer = {
  wrapper: { width: "260px", flexShrink: 0, background: "#fff", borderRadius: "12px", border: "1px solid #eef0fb", boxShadow: "0 2px 12px rgba(106,124,255,0.06)", padding: "16px", display: "flex", flexDirection: "column", gap: "0", height: "fit-content" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" },
  ticketId: { fontSize: "13px", fontWeight: 700, color: "#6a7cff", marginRight: "8px" },
  typeBadge: { fontSize: "11px", background: "#eef0ff", color: "#4b4f9c", padding: "2px 8px", borderRadius: "12px", fontWeight: 600 },
  closeBtn: { background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#aaa", lineHeight: 1 },
  opened: { fontSize: "11px", color: "#888", margin: "0 0 16px" },
  section: { marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid #f0f1fb" },
  sectionTitle: { fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "0.5px", marginBottom: "6px" },
  row: { display: "flex", alignItems: "center", gap: "8px" },
  clientName: { fontSize: "13px", fontWeight: 600, color: "#1e2140" },
  clientDept: { fontSize: "11px", color: "#888" },
  value: { fontSize: "13px", fontWeight: 600, color: "#1e2140" },
  detail: { fontSize: "11px", color: "#888", marginTop: "4px" },
  footer: { display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" },
};
const modal = {
  overlay: { position: "fixed", inset: 0, background: "rgba(30,33,64,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  box: { background: "#fff", borderRadius: "14px", width: "460px", maxWidth: "95vw", boxShadow: "0 8px 40px rgba(30,33,64,0.18)", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px 14px", borderBottom: "1px solid #eef0fb" },
  title: { fontSize: "15px", fontWeight: 700, color: "#1e2140" },
  body: { padding: "18px 22px", display: "flex", flexDirection: "column", gap: "12px" },
  field: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "11px", fontWeight: 700, color: "#888", letterSpacing: "0.4px", textTransform: "uppercase" },
  input: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #dde0f5", fontSize: "13px", color: "#333", outline: "none", background: "#fafbff" },
  footer: { display: "flex", gap: "10px", justifyContent: "flex-end", padding: "14px 22px 18px", borderTop: "1px solid #eef0fb" },
  error: { fontSize: "12px", color: "#c0392b", margin: 0 },
};