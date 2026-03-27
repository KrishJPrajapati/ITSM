import React, { useState } from "react";

/* ─────────────────────────── DATA PER TIME PERIOD ─────────────────────────── */
const dataByPeriod = {
  Live: {
    overallSLA: 96.4,
    slaChange: "+2.1%",
    slaUp: true,
    avgFirstResponse: 18,
    responseChange: "Improved by 4 min",
    responseUp: true,
    avgResolution: 3.2,
    resolutionChange: "0.3h above target",
    resolutionUp: false,
    breachRate: 3.6,
    breachChange: "1.2% vs last period",
    breachUp: false,
    ticketVolume: [180, 210, 195, 240, 220, 198],
    ticketDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ticketOpen: 24,
    ticketInProgress: 12,
    ticketResolved: 1240,
    ticketTotal: 1284,
    categoryMix: { Network: 32, Hardware: 24, Software: 28, Other: 16 },
    slaByPriority: [
      { priority: "Critical", color: "#e05252", target: "1h response", achieved: 94.2, progress: 94.2, status: "Met" },
      { priority: "High", color: "#f59e0b", target: "4h response", achieved: 97.8, progress: 98, status: "Met" },
      { priority: "Medium", color: "#6a7cff", target: "8h response", achieved: 91.5, progress: 91, status: "At Risk" },
      { priority: "Low", color: "#10b981", target: "24h response", achieved: 99.1, progress: 99, status: "Met" },
    ],
    avgResponseVsTarget: [
      { label: "Critical (Target: 60 min)", actual: 42, target: 60, color: "#10b981" },
      { label: "High (Target: 240 min)", actual: 180, target: 240, color: "#10b981" },
      { label: "Medium (Target: 480 min)", actual: 510, target: 480, color: "#e05252", over: true },
      { label: "Low (Target: 1440 min)", actual: 900, target: 1440, color: "#10b981" },
    ],
    reliability: {
      mttr: "3.2h", mtbf: "14.6d",
      fcr: "74.3%", escalation: "8.2%",
      reopen: "5.7%", uptime: "99.72%",
    },
    breaches: [
      { id: "TKT-2024-0889", title: "Windows Update Failure", color: "#e05252", breach: "2h 14m", agent: "Amit Patel", dept: "Marketing", asset: "LT-DL-D05" },
      { id: "TKT-2024-0881", title: "VPN Connection Drop", color: "#f59e0b", breach: "45m", agent: "Rajesh Kumar", dept: "Engineering", asset: "PC-IT-O42" },
      { id: "TKT-2024-0864", title: "DB Query Timeout", color: "#e05252", breach: "5h 30m", agent: "Nikhil Joshi", dept: "IT", asset: "SRV-OO2" },
      { id: "TKT-2024-0855", title: "Printer Offline", color: "#f59e0b", breach: "1h 05m", agent: "Priya Sharma", dept: "Finance", asset: "PR-HP-128" },
    ],
    agents: [
      { initials: "RK", name: "Rajesh Kumar", role: "IT Support L2", bg: "#6a7cff", resolved: 48, avgTime: "2.8h", sla: 98.2 },
      { initials: "PS", name: "Priya Sharma", role: "IT Support L1", bg: "#f59e0b", resolved: 35, avgTime: "3.5h", sla: 91.4 },
      { initials: "AP", name: "Amit Patel", role: "IT Support L2", bg: "#10b981", resolved: 52, avgTime: "2.4h", sla: 97.0 },
      { initials: "VS", name: "Vikram Singh", role: "Network Specialist", bg: "#e05252", resolved: 29, avgTime: "4.1h", sla: 88.6 },
    ],
  },
  "24 Hours": {
    overallSLA: 94.8, slaChange: "+1.3%", slaUp: true,
    avgFirstResponse: 22, responseChange: "Improved by 2 min", responseUp: true,
    avgResolution: 3.8, resolutionChange: "0.6h above target", resolutionUp: false,
    breachRate: 5.2, breachChange: "0.8% vs last period", breachUp: false,
    ticketVolume: [40, 55, 48, 62, 58, 45], ticketDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ticketOpen: 8, ticketInProgress: 5, ticketResolved: 210, ticketTotal: 223,
    categoryMix: { Network: 35, Hardware: 20, Software: 30, Other: 15 },
    slaByPriority: [
      { priority: "Critical", color: "#e05252", target: "1h response", achieved: 92.5, progress: 92.5, status: "At Risk" },
      { priority: "High", color: "#f59e0b", target: "4h response", achieved: 95.1, progress: 95, status: "Met" },
      { priority: "Medium", color: "#6a7cff", target: "8h response", achieved: 89.0, progress: 89, status: "At Risk" },
      { priority: "Low", color: "#10b981", target: "24h response", achieved: 98.5, progress: 98, status: "Met" },
    ],
    avgResponseVsTarget: [
      { label: "Critical (Target: 60 min)", actual: 50, target: 60, color: "#10b981" },
      { label: "High (Target: 240 min)", actual: 200, target: 240, color: "#10b981" },
      { label: "Medium (Target: 480 min)", actual: 540, target: 480, color: "#e05252", over: true },
      { label: "Low (Target: 1440 min)", actual: 1100, target: 1440, color: "#10b981" },
    ],
    reliability: { mttr: "3.8h", mtbf: "12.1d", fcr: "71.2%", escalation: "9.5%", reopen: "6.2%", uptime: "99.50%" },
    breaches: [
      { id: "TKT-2024-0889", title: "Windows Update Failure", color: "#e05252", breach: "2h 14m", agent: "Amit Patel", dept: "Marketing", asset: "LT-DL-D05" },
      { id: "TKT-2024-0881", title: "VPN Connection Drop", color: "#f59e0b", breach: "45m", agent: "Rajesh Kumar", dept: "Engineering", asset: "PC-IT-O42" },
    ],
    agents: [
      { initials: "RK", name: "Rajesh Kumar", role: "IT Support L2", bg: "#6a7cff", resolved: 10, avgTime: "3.1h", sla: 95.0 },
      { initials: "PS", name: "Priya Sharma", role: "IT Support L1", bg: "#f59e0b", resolved: 7, avgTime: "3.8h", sla: 88.5 },
      { initials: "AP", name: "Amit Patel", role: "IT Support L2", bg: "#10b981", resolved: 12, avgTime: "2.6h", sla: 94.2 },
      { initials: "VS", name: "Vikram Singh", role: "Network Specialist", bg: "#e05252", resolved: 5, avgTime: "4.5h", sla: 85.0 },
    ],
  },
  "7 Days": {
    overallSLA: 95.6, slaChange: "+1.8%", slaUp: true,
    avgFirstResponse: 20, responseChange: "Improved by 3 min", responseUp: true,
    avgResolution: 3.5, resolutionChange: "0.5h above target", resolutionUp: false,
    breachRate: 4.4, breachChange: "1.0% vs last period", breachUp: false,
    ticketVolume: [170, 200, 185, 230, 210, 185], ticketDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ticketOpen: 18, ticketInProgress: 9, ticketResolved: 870, ticketTotal: 897,
    categoryMix: { Network: 30, Hardware: 26, Software: 27, Other: 17 },
    slaByPriority: [
      { priority: "Critical", color: "#e05252", target: "1h response", achieved: 93.5, progress: 93.5, status: "Met" },
      { priority: "High", color: "#f59e0b", target: "4h response", achieved: 96.8, progress: 97, status: "Met" },
      { priority: "Medium", color: "#6a7cff", target: "8h response", achieved: 90.2, progress: 90, status: "At Risk" },
      { priority: "Low", color: "#10b981", target: "24h response", achieved: 98.8, progress: 99, status: "Met" },
    ],
    avgResponseVsTarget: [
      { label: "Critical (Target: 60 min)", actual: 46, target: 60, color: "#10b981" },
      { label: "High (Target: 240 min)", actual: 195, target: 240, color: "#10b981" },
      { label: "Medium (Target: 480 min)", actual: 500, target: 480, color: "#e05252", over: true },
      { label: "Low (Target: 1440 min)", actual: 950, target: 1440, color: "#10b981" },
    ],
    reliability: { mttr: "3.5h", mtbf: "13.4d", fcr: "73.0%", escalation: "8.8%", reopen: "6.0%", uptime: "99.61%" },
    breaches: [
      { id: "TKT-2024-0889", title: "Windows Update Failure", color: "#e05252", breach: "2h 14m", agent: "Amit Patel", dept: "Marketing", asset: "LT-DL-D05" },
      { id: "TKT-2024-0881", title: "VPN Connection Drop", color: "#f59e0b", breach: "45m", agent: "Rajesh Kumar", dept: "Engineering", asset: "PC-IT-O42" },
      { id: "TKT-2024-0864", title: "DB Query Timeout", color: "#e05252", breach: "5h 30m", agent: "Nikhil Joshi", dept: "IT", asset: "SRV-OO2" },
    ],
    agents: [
      { initials: "RK", name: "Rajesh Kumar", role: "IT Support L2", bg: "#6a7cff", resolved: 32, avgTime: "2.9h", sla: 97.0 },
      { initials: "PS", name: "Priya Sharma", role: "IT Support L1", bg: "#f59e0b", resolved: 25, avgTime: "3.6h", sla: 90.0 },
      { initials: "AP", name: "Amit Patel", role: "IT Support L2", bg: "#10b981", resolved: 38, avgTime: "2.5h", sla: 96.0 },
      { initials: "VS", name: "Vikram Singh", role: "Network Specialist", bg: "#e05252", resolved: 19, avgTime: "4.3h", sla: 87.0 },
    ],
  },
  "30 Days": {
    overallSLA: 95.1, slaChange: "+0.9%", slaUp: true,
    avgFirstResponse: 21, responseChange: "Improved by 1 min", responseUp: true,
    avgResolution: 3.6, resolutionChange: "0.4h above target", resolutionUp: false,
    breachRate: 4.9, breachChange: "0.5% vs last period", breachUp: false,
    ticketVolume: [700, 820, 760, 900, 870, 750], ticketDays: ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6"],
    ticketOpen: 30, ticketInProgress: 15, ticketResolved: 4800, ticketTotal: 4845,
    categoryMix: { Network: 31, Hardware: 25, Software: 29, Other: 15 },
    slaByPriority: [
      { priority: "Critical", color: "#e05252", target: "1h response", achieved: 93.0, progress: 93, status: "Met" },
      { priority: "High", color: "#f59e0b", target: "4h response", achieved: 96.2, progress: 96, status: "Met" },
      { priority: "Medium", color: "#6a7cff", target: "8h response", achieved: 89.5, progress: 89, status: "At Risk" },
      { priority: "Low", color: "#10b981", target: "24h response", achieved: 98.3, progress: 98, status: "Met" },
    ],
    avgResponseVsTarget: [
      { label: "Critical (Target: 60 min)", actual: 48, target: 60, color: "#10b981" },
      { label: "High (Target: 240 min)", actual: 210, target: 240, color: "#10b981" },
      { label: "Medium (Target: 480 min)", actual: 520, target: 480, color: "#e05252", over: true },
      { label: "Low (Target: 1440 min)", actual: 1000, target: 1440, color: "#10b981" },
    ],
    reliability: { mttr: "3.6h", mtbf: "13.9d", fcr: "72.5%", escalation: "9.0%", reopen: "6.3%", uptime: "99.58%" },
    breaches: [
      { id: "TKT-2024-0889", title: "Windows Update Failure", color: "#e05252", breach: "2h 14m", agent: "Amit Patel", dept: "Marketing", asset: "LT-DL-D05" },
      { id: "TKT-2024-0881", title: "VPN Connection Drop", color: "#f59e0b", breach: "45m", agent: "Rajesh Kumar", dept: "Engineering", asset: "PC-IT-O42" },
      { id: "TKT-2024-0864", title: "DB Query Timeout", color: "#e05252", breach: "5h 30m", agent: "Nikhil Joshi", dept: "IT", asset: "SRV-OO2" },
      { id: "TKT-2024-0855", title: "Printer Offline", color: "#f59e0b", breach: "1h 05m", agent: "Priya Sharma", dept: "Finance", asset: "PR-HP-128" },
    ],
    agents: [
      { initials: "RK", name: "Rajesh Kumar", role: "IT Support L2", bg: "#6a7cff", resolved: 180, avgTime: "2.8h", sla: 97.5 },
      { initials: "PS", name: "Priya Sharma", role: "IT Support L1", bg: "#f59e0b", resolved: 130, avgTime: "3.6h", sla: 90.5 },
      { initials: "AP", name: "Amit Patel", role: "IT Support L2", bg: "#10b981", resolved: 200, avgTime: "2.5h", sla: 96.5 },
      { initials: "VS", name: "Vikram Singh", role: "Network Specialist", bg: "#e05252", resolved: 110, avgTime: "4.2h", sla: 86.5 },
    ],
  },
};

/* ─────────────────────────── DONUT CHART ─────────────────────────── */
const DonutChart = ({ data, total }) => {
  const colors = ["#6a7cff", "#f59e0b", "#10b981", "#e05252"];
  const labels = Object.keys(data);
  const values = Object.values(data);
  let cumulative = 0;
  const slices = values.map((v, i) => {
    const pct = v / 100;
    const start = cumulative;
    cumulative += pct;
    const startAngle = start * 2 * Math.PI - Math.PI / 2;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const r = 60, cx = 80, cy = 80;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = pct > 0.5 ? 1 : 0;
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, color: colors[i] };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
          <circle cx="80" cy="80" r="36" fill="#fff" />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e2433" }}>{total.toLocaleString()}</div>
          <div style={{ fontSize: 10, color: "#8a8fa8" }}>tickets</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {labels.map((l, i) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors[i], flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#4a4f6a" }}>{l}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1e2433", marginLeft: "auto" }}>{values[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────── BAR CHART ─────────────────────────── */
const BarChart = ({ volumes, days }) => {
  const max = Math.max(...volumes);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, padding: "0 4px" }}>
        {volumes.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
            <div style={{ width: "100%", height: `${(v / max) * 100}%`, background: "linear-gradient(180deg, #6a7cff 0%, #9fa3ff 100%)", borderRadius: "4px 4px 0 0", minHeight: 4 }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, padding: "6px 4px 0" }}>
        {days.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#8a8fa8", fontWeight: 500 }}>{d}</div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */
const SLADashboardPage = () => {
  const [period, setPeriod] = useState("Live");
  const d = dataByPeriod[period];
  const periods = ["Live", "24 Hours", "7 Days", "30 Days"];

  return (
    <div style={styles.page}>
      {/* ── Header Box ── */}
      <div style={styles.headerBox}>
        <div style={styles.header}>
          <div>
            <div style={styles.titleRow}>
              <span style={styles.bolt}>⚡</span>
              <h1 style={styles.title}>SLA & Performance Dashboard</h1>
            </div>
            <p style={styles.subtitle}>Track service levels, response metrics, and team efficiency</p>
          </div>
          <div style={styles.periodTabs}>
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)} style={{ ...styles.tab, ...(period === p ? styles.tabActive : {}) }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div style={styles.kpiRow}>
        <KPICard label="Overall SLA Compliance" value={`${d.overallSLA}%`} valueColor="#10b981" change={d.slaChange} up={d.slaUp} sub="vs last period" />
        <KPICard label="Avg. First Response Time" value={`${d.avgFirstResponse}min`} valueColor="#f59e0b" change={d.responseChange} up={d.responseUp} />
        <KPICard label="Avg. Resolution Time" value={`${d.avgResolution}hrs`} valueColor="#6a7cff" change={d.resolutionChange} up={d.resolutionUp} sub={d.resolutionUp ? "" : ""} />
        <KPICard label="Ticket Breach Rate" value={`${d.breachRate}%`} valueColor="#e05252" change={d.breachChange} up={d.breachUp} />
      </div>

      {/* ── SLA Compliance by Priority + Daily Ticket Volume ── */}
      <div style={styles.row2}>
        {/* SLA Compliance Table */}
        <div style={{ ...styles.card, flex: 1.2 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>SLA Compliance by Priority</span>
            <span style={{ ...styles.badge, background: "#6a7cff", color: "#fff" }}>This Week</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e8eaf5" }}>
                {["Priority", "Target", "Achieved", "Progress", "Status"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.slaByPriority.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4fb" }}>
                  <td style={{ ...styles.td, color: row.color, fontWeight: 600 }}>{row.priority}</td>
                  <td style={styles.td}>{row.target}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{row.achieved}%</td>
                  <td style={styles.td}>
                    <div style={styles.progressBg}>
                      <div style={{ ...styles.progressFill, width: `${row.progress}%`, background: row.status === "At Risk" ? "#f59e0b" : "#10b981" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#8a8fa8" }}>{row.progress}%</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, background: row.status === "Met" ? "#d1fae5" : "#fef3c7", color: row.status === "Met" ? "#059669" : "#b45309" }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Daily Ticket Volume */}
        <div style={{ ...styles.card, flex: 1 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Daily Ticket Volume ({period === "30 Days" ? "Last 30 Days" : "Last 7 Days"})</span>
            <span style={{ ...styles.badge, background: "#d1fae5", color: "#059669" }}>+12% trend</span>
          </div>
          <div style={{ marginTop: 12, flex: 1 }}>
            <BarChart volumes={d.ticketVolume} days={d.ticketDays} />
          </div>
          <div style={styles.ticketStats}>
            <span style={styles.ticketStat}><span style={{ color: "#6a7cff" }}>Open:</span> <b>{d.ticketOpen}</b></span>
            <span style={styles.ticketStat}><span style={{ color: "#f59e0b" }}>In Progress:</span> <b>{d.ticketInProgress}</b></span>
            <span style={styles.ticketStat}><span style={{ color: "#10b981" }}>Resolved:</span> <b>{d.ticketResolved.toLocaleString()}</b></span>
            <span style={styles.ticketStat}><b>Total: {d.ticketTotal.toLocaleString()}</b></span>
          </div>
        </div>
      </div>

      {/* ── Category Mix + Avg Response vs Target + Reliability ── */}
      <div style={styles.row3}>
        {/* Issue Category Mix */}
        <div style={{ ...styles.card, flex: 1 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Issue Category Mix</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <DonutChart data={d.categoryMix} total={d.ticketTotal} />
          </div>
        </div>

        {/* Avg Response vs Target */}
        <div style={{ ...styles.card, flex: 1.3 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Avg Response vs Target</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
            {d.avgResponseVsTarget.map((row, i) => {
              const barW = Math.min((row.actual / (row.target * 1.5)) * 100, 100);
              const targetW = (row.target / (row.target * 1.5)) * 100;
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#4a4f6a" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: row.over ? "#e05252" : "#1e2433" }}>
                      {row.actual} min {row.over && "⚠"}
                    </span>
                  </div>
                  <div style={{ position: "relative", height: 10, background: "#e8eaf5", borderRadius: 6 }}>
                    <div style={{ height: "100%", width: `${barW}%`, background: row.color, borderRadius: 6 }} />
                    <div style={{ position: "absolute", top: -2, left: `${targetW}%`, width: 2, height: 14, background: "#8a8fa8", borderRadius: 1 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reliability Metrics */}
        <div style={{ ...styles.card, flex: 1 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Reliability Metrics</span>
            <span style={{ ...styles.badge, background: "#1e2433", color: "#fff", fontSize: 10 }}>Live</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 8 }}>
            {[
              { label: "MTTR (Mean Time to Resolve)", value: d.reliability.mttr, color: "#6a7cff" },
              { label: "MTBF (Mean Time Between Failures)", value: d.reliability.mtbf, color: "#1e2433" },
              { label: "First Call Resolution Rate", value: d.reliability.fcr, color: "#10b981" },
              { label: "Escalation Rate", value: d.reliability.escalation, color: "#e05252" },
              { label: "Reopen Rate", value: d.reliability.reopen, color: "#f59e0b" },
              { label: "System Uptime", value: d.reliability.uptime, color: "#10b981" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 5 ? "1px solid #f3f4fb" : "none" }}>
                <span style={{ fontSize: 13, color: "#4a4f6a", maxWidth: 180 }}>{item.label}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent SLA Breaches + Agent Performance ── */}
      <div style={styles.row2}>
        {/* Recent SLA Breaches */}
        <div style={{ ...styles.card, flex: 1 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Recent SLA Breaches</span>
            <span style={{ ...styles.badge, background: "#fee2e2", color: "#e05252" }}>{d.breaches.length} Breaches</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            {d.breaches.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: b.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e2433" }}>{b.id} – {b.title}</div>
                  <div style={{ fontSize: 12, color: b.color, fontWeight: 600, marginTop: 2 }}>
                    Breached by {b.breach} · {b.agent} · {b.dept} · {b.asset}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Performance */}
        <div style={{ ...styles.card, flex: 1 }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Agent Performance</span>
            <span style={{ ...styles.badge, background: "#ede9fe", color: "#7c3aed" }}>7-day avg</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e8eaf5" }}>
                <th style={styles.th}>Agent</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Resolved</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Avg Time</th>
                <th style={{ ...styles.th, textAlign: "center" }}>SLA %</th>
              </tr>
            </thead>
            <tbody>
              {d.agents.map((a, i) => (
                <tr key={i} style={{ borderBottom: i < d.agents.length - 1 ? "1px solid #f3f4fb" : "none" }}>
                  <td style={{ ...styles.td, padding: "12px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: a.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {a.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e2433" }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: "#8a8fa8" }}>{a.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{a.resolved}</div>
                    <div style={{ fontSize: 10, color: "#8a8fa8" }}>tickets</div>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{a.avgTime}</div>
                    <div style={{ fontSize: 10, color: "#8a8fa8" }}>avg</div>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: a.sla >= 95 ? "#10b981" : a.sla >= 90 ? "#f59e0b" : "#e05252" }}>
                      {a.sla}%
                    </span>
                    <div style={{ fontSize: 10, color: "#8a8fa8" }}>SLA</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={styles.footer}>
        <span>Last Refreshed: <b>Today, 10:00 PM</b> · Period: <b>Feb 12–18, 2024</b> · Client: <b>client1234@gmail.com</b></span>
        <button style={styles.exportBtn}>Export Report</button>
      </div>
    </div>
  );
};

/* ─────────────────────────── KPI CARD ─────────────────────────── */
const KPICard = ({ label, value, valueColor, change, up, sub }) => (
  <div style={styles.kpiCard}>
    <div style={{ fontSize: 12, color: "#8a8fa8", fontWeight: 500, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 800, color: valueColor, letterSpacing: -1, lineHeight: 1 }}>{value}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
      <span style={{ fontSize: 13, color: up ? "#10b981" : "#e05252" }}>{up ? "▲" : "▼"} {change}</span>
      {sub && <span style={{ fontSize: 12, color: "#8a8fa8" }}>{sub}</span>}
    </div>
  </div>
);

/* ─────────────────────────── STYLES ─────────────────────────── */
const styles = {
  page: { fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif", padding: 0, background: "#f5f6fb", minHeight: "100vh" },
  headerBox: { background: "#fff", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e8eaf5", marginBottom: 24 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 },
  platformLabel: { margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#4b4f9c", letterSpacing: "1.2px", textTransform: "uppercase" },
  titleRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 },
  bolt: { fontSize: 22, background: "linear-gradient(135deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  title: { fontSize: 22, fontWeight: 800, color: "#1e2433", margin: 0 },
  subtitle: { fontSize: 13, color: "#8a8fa8", margin: 0 },
  periodTabs: { display: "flex", gap: 6, background: "#e8eaf5", borderRadius: 10, padding: 4 },
  tab: { padding: "6px 14px", borderRadius: 8, border: "none", background: "transparent", color: "#4a4f6a", fontWeight: 500, fontSize: 13, cursor: "pointer" },
  tabActive: { background: "#4b4f9c", color: "#fff", fontWeight: 700 },
  kpiRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 },
  kpiCard: { background: "#fff", borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e8eaf5" },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1.3fr 1fr", gap: 16, marginBottom: 20 },
  card: { background: "#fff", borderRadius: 14, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e8eaf5" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#1e2433" },
  badge: { padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 },
  th: { fontSize: 11, fontWeight: 600, color: "#8a8fa8", textAlign: "left", padding: "8px 8px", textTransform: "uppercase", letterSpacing: 0.5 },
  td: { fontSize: 13, color: "#1e2433", padding: "10px 8px", verticalAlign: "middle" },
  progressBg: { height: 6, background: "#e8eaf5", borderRadius: 4, marginBottom: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4, transition: "width 0.5s ease" },
  statusBadge: { padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 },
  ticketStats: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px solid #f3f4fb", fontSize: 12, color: "#4a4f6a" },
  ticketStat: {},
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, background: "#fff", borderRadius: 14, padding: "14px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e8eaf5", fontSize: 12, color: "#4a4f6a" },
  exportBtn: { padding: "9px 20px", background: "#4b4f9c", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" },
};

export default SLADashboardPage;