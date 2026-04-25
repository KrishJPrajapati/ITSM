import React, { useEffect, useState } from "react";
import { API } from "../service/api";

const AssignedTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [otp, setOtp] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  /* ================= FETCH ================= */

  const fetchTickets = async () => {
    try {
      const res = await API.getAssignedTickets({ e_id: user.e_id });
      if (res.isSuccess) setTickets(res.data.tickets || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  /* ================= ACTIONS ================= */

  const updateStatus = async (ticket_id, status) => {
    await API.updateTicketStatus({ ticket_id, status });
    fetchTickets();
  };

  const sendOtp = async (ticket_id) => {
    await API.sendCloseOtp({ ticket_id });
    alert("OTP sent to client email");
  };

  const closeTicket = async (ticket_id) => {
    await API.closeTicket({ ticket_id, otp });
    setOtp("");
    setSelected(null);
    fetchTickets();
  };

  /* ================= STATUS STYLE ================= */

  const getStatusStyle = (status) => {
    switch (status) {
      case "ASSIGNED":
        return { background: "#eef0ff", color: "#4b4f9c" };
      case "IN_PROGRESS":
        return { background: "#fff4e5", color: "#b36b00" };
      case "RESOLVED":
        return { background: "#e6fffa", color: "#0f766e" };
      case "CLOSED":
        return { background: "#fdeaea", color: "#c0392b" };
      default:
        return {};
    }
  };

  /* ================= COMPONENTS ================= */

  const InfoCard = ({ title, children }) => (
    <div style={styles.cardBox}>
      <div style={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );

  const Info = ({ label, value }) => (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 11, color: "#888" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>
        {value || "-"}
      </div>
    </div>
  );

  return (
    <>
      {/* ✅ ANIMATIONS FIXED */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div style={styles.page}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>📄 Assigned Tickets</h2>
            <p style={styles.subtitle}>
              Manage and resolve your assigned issues
            </p>
          </div>

          <div style={styles.stats}>
            <span style={styles.stat}>
              🟡 {tickets.filter(t => t.status === "ASSIGNED").length}
            </span>
            <span style={styles.stat}>
              🟢 {tickets.filter(t => t.status === "RESOLVED").length}
            </span>
          </div>
        </div>

        {/* CARD */}
        <div style={styles.mainCard}>

          <table style={styles.table}>
            <thead>
            <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Action</th>
            </tr>
            </thead>

            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.empty}>
                    No assigned tickets
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr
                    key={t.ticket_id}
                    style={styles.row}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9faff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")}
                  >
                    <td>{t.ticket_id}</td>
                    <td>{t.ticket_title}</td>

                    <td>
                      <span style={{ ...styles.status, ...getStatusStyle(t.status) }}>
                        {t.status}
                      </span>
                    </td>

                    <td>{t.priority}</td>

                    <td>
                      <button
                        style={styles.viewBtn}
                        onClick={() => setSelected(t)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

        {/* ================= MODAL ================= */}

        {selected && (
          <div style={styles.overlay}>
            <div style={styles.modal}>

              {/* HEADER */}
              <div style={styles.modalHeader}>
                <div>
                  <h2>{selected.ticket_title}</h2>
                  <span style={{
                    ...styles.status,
                    ...getStatusStyle(selected.status)
                  }}>
                    {selected.status}
                  </span>
                </div>

                <button onClick={() => setSelected(null)} style={styles.closeBtn}>
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div style={styles.modalBody}>

                <div style={styles.topGrid}>
                  <InfoCard title="👤 Client">
                    <Info label="Name" value={selected.created_by_name} />
                    <Info label="Email" value={selected.client_email} />
                    <Info label="Phone" value={selected.initiator_number} />
                  </InfoCard>

                  <InfoCard title="📌 Ticket">
                    <Info label="ID" value={selected.ticket_id} />
                    <Info label="Priority" value={selected.priority} />
                    <Info label="Created" value={new Date(selected.createdAt).toLocaleString()} />
                  </InfoCard>
                </div>

                <InfoCard title="🖥️ Asset">
                  <Info label="Type" value={selected.asset_type} />
                  <Info label="ID" value={selected.asset_id} />
                  <Info label="Location" value={selected.location} />
                </InfoCard>

                <div style={styles.descBox}>
                  {selected.description}
                </div>

                {/* ACTION */}
                <div style={styles.actions}>

                  {selected.status === "ASSIGNED" && (
                    <button style={styles.primaryBtn}
                      onClick={() => updateStatus(selected.ticket_id, "IN_PROGRESS")}>
                      Start Work
                    </button>
                  )}

                  {selected.status === "IN_PROGRESS" && (
                    <button style={styles.successBtn}
                      onClick={() => updateStatus(selected.ticket_id, "RESOLVED")}>
                      Resolve
                    </button>
                  )}

                  {selected.status === "RESOLVED" && (
                    <>
                      <button style={styles.warningBtn}
                        onClick={() => sendOtp(selected.ticket_id)}>
                        Send OTP
                      </button>

                      <div style={{ display: "flex", gap: 10 }}>
                        <input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          style={styles.input}
                        />

                        <button style={styles.dangerBtn}
                          onClick={() => closeTicket(selected.ticket_id)}>
                          Close
                        </button>
                      </div>
                    </>
                  )}

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default AssignedTicketsPage;

/* ================= STYLES ================= */

const styles = {
  page: { padding: 20 },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  title: { margin: 0 },

  subtitle: { fontSize: 12, color: "#888" },

  stats: { display: "flex", gap: 10 },

  stat: {
    background: "#eef0ff",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
  },

  mainCard: {
    background: "#fff",
    padding: 16,
    borderRadius: 14,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  row: {
    borderBottom: "1px solid #eee",
  },

  status: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 11,
  },

  viewBtn: {
    background: "#6a7cff",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: 20,
    color: "#888",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.2s",
  },

  modal: {
    background: "#fff",
    width: 500,
    borderRadius: 12,
    animation: "scaleIn 0.3s",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
  },

  modalBody: { padding: 16 },

  closeBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  cardBox: {
    background: "#f9faff",
    padding: 10,
    borderRadius: 8,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 6,
  },

  descBox: {
    marginTop: 10,
    padding: 10,
    background: "#f5f6ff",
    borderRadius: 8,
  },

  actions: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ddd",
  },

  primaryBtn: {
    background: "#6a7cff",
    color: "#fff",
    border: "none",
    padding: 10,
    borderRadius: 6,
  },

  successBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: 10,
    borderRadius: 6,
  },

  warningBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: 10,
    borderRadius: 6,
  },

  dangerBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: 10,
    borderRadius: 6,
  },
  th: {
  textAlign: "left",
  padding: "12px 10px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#555",
},

td: {
  padding: "12px 10px",
  fontSize: "13px",
  color: "#333",
},
};