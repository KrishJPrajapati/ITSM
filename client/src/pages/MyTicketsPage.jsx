import React, { useEffect, useState } from "react";
import { API } from "../service/api";

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchTickets = async () => {
    try {
      const res = await API.getUserTickets({ email: user.email });

      if (res.isSuccess) {
        setTickets(res.data.tickets || []);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return { background: "#eef0ff", color: "#4b4f9c" };
      case "ASSIGNED":
        return { background: "#e6f7ff", color: "#0077b6" };
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

  if (loading) {
    return <div style={{ padding: 20 }}>Loading tickets...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "16px" }}>📋 My Tickets</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Ticket ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Assigned To</th>
              <th style={styles.th}>Created</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.ticket_id}>
                  <td style={styles.td}>{t.ticket_id}</td>
                  <td style={styles.td}>{t.ticket_title}</td>
                  <td style={styles.td}>{t.priority}</td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        ...getStatusStyle(t.status),
                      }}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {t.assigned_engineer_name || "Not Assigned"}
                  </td>

                  <td style={styles.td}>
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTicketsPage;

/* ---------- STYLES ---------- */

const styles = {
  tableWrapper: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #eef0fb",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f7f8ff",
    fontSize: "13px",
    fontWeight: 600,
  },

  td: {
    padding: "12px",
    fontSize: "13px",
    borderBottom: "1px solid #f0f1fb",
  },

  status: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 600,
  },

  empty: {
    textAlign: "center",
    padding: "20px",
    color: "#888",
  },
};