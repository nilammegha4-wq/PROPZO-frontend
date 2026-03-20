import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import BASE_URL from "../../../config";

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

const CHART_COLORS = ["#B2846B", "#627B68", "#819B8B", "#4C3324"];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [reportData, setReportData] = useState({
    totalUsers: 0, totalAgents: 0, totalProperties: 0,
    totalBuyProperties: 0, totalRentProperties: 0, totalPreRentProperties: 0,
    totalBookings: 0, completedBookings: 0, pendingBookings: 0, cancelledBookings: 0,
    totalRevenue: 0, bookings: [], revenue: [], properties: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchReportData(); }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true); setError("");
      const rawToken = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
      let token = rawToken;
      try {
        const parsed = JSON.parse(rawToken);
        if (parsed && typeof parsed === "object") token = parsed.token || rawToken;
        else if (typeof parsed === "string") token = parsed;
      } catch (e) {}
      const response = await fetch(`${BASE_URL}/api/admin/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      const res = await response.json();
      if (res.success) setReportData(res.data);
      else setError(res.message || "Report data could not be loaded.");
    } catch (err) {
      setError("Failed to connect to backend at " + BASE_URL);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
    try {
      const rawToken = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
      let token = rawToken;
      try {
        const parsed = JSON.parse(rawToken);
        if (parsed && typeof parsed === "object") token = parsed.token || rawToken;
      } catch (e) {}
      const response = await fetch(`${BASE_URL}/api/admin/reports/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await response.json();
      if (res.success) fetchReportData();
      else alert(res.message || "Failed to delete record.");
    } catch (err) {
      alert("An error occurred while deleting the record.");
    }
  };

  const handleDownloadCSV = () => {
    const data = reportData;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ANALYTICS SUMMARY\n";
    csvContent += `Total Revenue,Total Users,Total Properties,Total Bookings\n`;
    csvContent += `₹${data.totalRevenue || 0},${data.totalUsers || 0},${data.totalProperties || 0},${data.totalBookings || 0}\n\n`;
    csvContent += "NETWORK OVERVIEW\n";
    csvContent += `Agents,Buy Listings,Rentals,Pre-Rent\n`;
    csvContent += `${data.totalAgents || 0},${data.totalBuyProperties || 0},${data.totalRentProperties || 0},${data.totalPreRentProperties || 0}\n\n`;
    csvContent += "BOOKINGS DETAILS\nID,Visitor,Property,Date,Amount,Status\n";
    (data.bookings || []).forEach(b => {
      csvContent += `${b.id},"${b.user}","${b.property}",${b.date},${b.amount},${b.status}\n`;
    });
    csvContent += "\nPROPERTIES DETAILS\nID,Title,Category,Price,Status\n";
    (data.properties || []).forEach(p => {
      csvContent += `${p.id},"${p.name}",${p.category},${p.price},${p.status}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `PropZo_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div style={s.loaderContainer}>
      <div style={s.spinner}></div>
      <p style={s.loadingText}>Synthesizing Analytics Reports...</p>
    </div>
  );

  if (error) return (
    <div style={s.errorWrapper}>
      <div style={s.errorCard}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h2 style={s.errorTitle}>Connection Failed</h2>
        <p style={s.errorMessage}>{error}</p>
        <button onClick={fetchReportData} style={s.retryBtn}>Retry Connection</button>
      </div>
    </div>
  );

  const stats = [
    { title: "Total Revenue", value: `₹${(reportData.totalRevenue || 0).toLocaleString()}`, icon: "💰", color: "#627B68" },
    { title: "Active Users", value: reportData.totalUsers || 0, icon: "👥", color: "#B2846B" },
    { title: "Total Properties", value: reportData.totalProperties || 0, icon: "🏢", color: "#819B8B" },
    { title: "All Bookings", value: reportData.totalBookings || 0, icon: "📅", color: "#4C3324" },
  ];

  const miniStats = [
    { label: "Agents", value: reportData.totalAgents || 0, color: "#4C3324" },
    { label: "Buy Listings", value: reportData.totalBuyProperties || 0, color: "#B2846B" },
    { label: "Rentals", value: reportData.totalRentProperties || 0, color: "#627B68" },
    { label: "Pre-Rent", value: reportData.totalPreRentProperties || 0, color: "#819B8B" },
  ];

  const COLORS = ["#627b68", "#b2846b", "#819b8b", "#4c3324"];

  return (
    <div style={s.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media print {
          .print-hide { display: none !important; }
          .printable-table-section { display: block !important; margin-bottom: 40px !important; page-break-inside: avoid; }
          body * { visibility: hidden; }
          #reportContent, #reportContent * { visibility: visible; }
          #reportContent { position: absolute; left: 0; top: 0; width: 100%; display: block !important; background: #fff !important; }
          #admin-sidebar, aside, header, button, nav { display: none !important; }
          .print-header { display: block !important; visibility: visible !important; text-align: center; margin-bottom: 40px; border-bottom: 3px solid #4C3324; padding-bottom: 20px; }
          .print-header * { visibility: visible !important; }
          table { width: 100% !important; border-collapse: collapse !important; }
          th, td { border: 1px solid #e8ddd5 !important; padding: 10px 8px !important; font-size: 11px !important; }
          th { background-color: #f0ebe5 !important; }
        }
        .print-header { display: none; }
      `}</style>

      {/* Header */}
      <div style={s.header}>
        <div>
          <p style={s.breadcrumb}>Admin / Reports</p>
          <h1 style={s.title}>Analytics Reports</h1>
          <p style={s.subtitle}>Real-time performance tracking and growth metrics.</p>
        </div>
        <div style={s.headerActions} className="print-hide">
          <button onClick={fetchReportData} style={s.refreshBtn}>🔄 Refresh</button>
          <button onClick={handleDownloadCSV} style={s.downloadBtn}>Download CSV</button>
          <button onClick={() => window.print()} style={s.printBtn}>Print Report</button>
        </div>
      </div>

      <div id="reportContent">
        {/* Print header */}
        <div className="print-header">
          <h1 style={{ fontFamily: "'Sora', sans-serif", color: "#4C3324" }}>PropZo</h1>
          <p>Admin Analytics Report</p>
          <p>Generated on: {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        {/* Primary Stats */}
        <div style={s.statsGrid}>
          {stats.map((st, i) => (
            <div key={i} style={s.statCard}>
              <div style={{ ...s.iconBox, backgroundColor: `${st.color}18`, color: st.color }}>{st.icon}</div>
              <div>
                <span style={s.statLabel}>{st.title}</span>
                <h3 style={{ ...s.statValue, color: st.color }}>{st.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Mini Stats */}
        <div style={s.contentGrid}>
          {/* Chart */}
          <div style={s.chartCard}>
            <h3 style={s.sectionTitle}>Monthly Activity Growth</h3>
            <div style={{ height: 280 }}>
              {(reportData.revenue || []).length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ebe5" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: "#819B8B", fontFamily: "'DM Sans', sans-serif" }} />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: "#819B8B", fontFamily: "'DM Sans', sans-serif" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "1px solid #e8ddd5", boxShadow: "0 8px 24px rgba(76,51,36,0.1)", fontFamily: "'DM Sans', sans-serif" }}
                      cursor={{ fill: "#f5ede6" }}
                    />
                    <Bar dataKey="total" radius={[5, 5, 0, 0]} barSize={38}>
                      {(reportData.revenue || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={s.emptyState}>No activity data recorded yet.</div>
              )}
            </div>
          </div>

          {/* Mini Stats + Booking Status */}
          <div style={s.miniStatsColumn}>
            <h3 style={s.sectionTitle}>Network Overview</h3>
            <div style={s.miniGrid}>
              {miniStats.map((ms, i) => (
                <div key={i} style={s.miniStatCard}>
                  <span style={s.miniLabel}>{ms.label}</span>
                  <span style={{ ...s.miniValue, color: ms.color }}>{ms.value}</span>
                </div>
              ))}
            </div>
            <div style={s.statusBreakdown}>
              <h4 style={s.statusTitle}>Booking Status</h4>
              <div style={s.progressBar}>
                <div style={{ ...s.progressFill, width: `${(reportData.completedBookings / reportData.totalBookings) * 100 || 0}%`, backgroundColor: "#627B68" }} />
                <div style={{ ...s.progressFill, width: `${(reportData.pendingBookings / reportData.totalBookings) * 100 || 0}%`, backgroundColor: "#B2846B" }} />
                <div style={{ ...s.progressFill, width: `${(reportData.cancelledBookings / reportData.totalBookings) * 100 || 0}%`, backgroundColor: "#8b3a25" }} />
              </div>
              <div style={s.legend}>
                <div style={s.legendItem}><span style={{ ...s.dot, backgroundColor: "#627B68" }}></span> Completed: {reportData.completedBookings}</div>
                <div style={s.legendItem}><span style={{ ...s.dot, backgroundColor: "#B2846B" }}></span> Pending: {reportData.pendingBookings}</div>
                <div style={s.legendItem}><span style={{ ...s.dot, backgroundColor: "#8b3a25" }}></span> Failed: {reportData.cancelledBookings}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div style={s.tabsWrapper}>
          {/* Tab Buttons */}
          <div style={s.tabsHeader} className="print-hide">
            <div style={s.tabGroup}>
              {["bookings", "properties"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...s.tabBtn,
                    background: activeTab === tab ? "#4C3324" : "transparent",
                    color: activeTab === tab ? "#fff" : "#819B8B",
                    boxShadow: activeTab === tab ? "0 4px 10px rgba(76,51,36,0.2)" : "none",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table */}
          <div className="printable-table-section" style={{ display: activeTab === "bookings" ? "block" : "none" }}>
            <div style={s.tableCard}>
              <div style={s.tableHeader}>
                <h3 style={s.tableHeaderTitle}>Bookings Details</h3>
              </div>
              <table style={s.table}>
                <thead style={s.thead}>
                  <tr>
                    {["ID", "Visitor", "Target Property", "Scheduled", "Asset Value", "Status", "Action"].map((h, i) => (
                      <th key={i} style={{ ...s.th, ...(i === 6 ? { textAlign: "center" } : {}) }} className={i === 6 ? "print-hide" : ""}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(reportData.bookings || []).length > 0 ? reportData.bookings.map((b) => (
                    <tr key={b.id} style={s.tr}>
                      <td style={s.td}><span style={s.idText}>#{String(b.id || "").slice(-8).toUpperCase()}</span></td>
                      <td style={{ ...s.td, fontWeight: 600, color: "#4C3324", fontFamily: "'Sora', sans-serif" }}>{b.user}</td>
                      <td style={s.td}>{b.property}</td>
                      <td style={s.td}>{b.date}</td>
                      <td style={{ ...s.td, fontWeight: 700, color: "#627B68", fontFamily: "'Sora', sans-serif" }}>₹{(b.amount || 0).toLocaleString()}</td>
                      <td style={s.td}><span style={s.statusBadge}>{b.status}</span></td>
                      <td style={{ ...s.td, textAlign: "center" }} className="print-hide">
                        <button onClick={() => handleDelete(b.type, b.id)} style={s.deleteBtn} title="Delete Record">🗑️</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="7" style={s.emptyTable}>No bookings recorded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Properties Table */}
          <div className="printable-table-section" style={{ display: activeTab === "properties" ? "block" : "none" }}>
            <div style={s.tableCard}>
              <div style={s.tableHeader}>
                <h3 style={s.tableHeaderTitle}>Properties Details</h3>
              </div>
              <table style={s.table}>
                <thead style={s.thead}>
                  <tr>
                    {["ID", "Property Title", "Category", "Price", "Status", "Action"].map((h, i) => (
                      <th key={i} style={{ ...s.th, ...(i === 5 ? { textAlign: "center" } : {}) }} className={i === 5 ? "print-hide" : ""}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(reportData.properties || []).length > 0 ? reportData.properties.map((p, index) => (
                    <tr key={p.id || index} style={s.tr}>
                      <td style={s.td}><span style={s.idText}>#{String(p.id || "").slice(-8).toUpperCase()}</span></td>
                      <td style={{ ...s.td, fontWeight: 600, color: "#4C3324", fontFamily: "'Sora', sans-serif" }}>{p.name}</td>
                      <td style={s.td}><span style={s.categoryTag}>{p.category}</span></td>
                      <td style={{ ...s.td, fontWeight: 700, color: "#627B68", fontFamily: "'Sora', sans-serif" }}>₹{(p.price || 0).toLocaleString()}</td>
                      <td style={s.td}><span style={s.statusBadge}>{p.status}</span></td>
                      <td style={{ ...s.td, textAlign: "center" }} className="print-hide">
                        <button onClick={() => handleDelete(p.type, p.id)} style={s.deleteBtn} title="Delete Property">🗑️</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="6" style={s.emptyTable}>No properties recorded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
const styles = {
  container: { padding: "40px", background: "#f9f6f1", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" },
  title: { fontSize: "32px", fontWeight: "900", color: "#4c3324", margin: 0, letterSpacing: "-1px" },
  subtitle: { color: "#64748b", margin: "4px 0 0", fontSize: "16px" },
  headerActions: { display: "flex", gap: "12px" },
  refreshBtn: { background: "#fff", border: "1px solid rgba(228, 203, 182, 0.4)", padding: "10px 18px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", color: "#b2846b", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
  printBtn: { background: "#627b68", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(98, 123, 104, 0.4)" },
  downloadBtn: { background: "#fdf8f4", border: "1px solid rgba(228, 203, 182, 0.3)", color: "#b2846b", padding: "10px 20px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", marginRight: "8px", transition: "all 0.2s" },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" },
  statCard: { background: "#fff", padding: "24px", borderRadius: "24px", border: "1px solid rgba(228, 203, 182, 0.2)", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)" },
  iconBox: { width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" },
  statLabel: { fontSize: "13px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" },
  statValue: { fontSize: "26px", fontWeight: "900", color: "#4c3324", margin: "4px 0 0" },

  contentGrid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px", marginBottom: "32px" },
  chartCard: { background: "#fff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(228, 203, 182, 0.2)", boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)" },
  sectionTitle: { fontSize: "18px", fontWeight: "800", color: "#4c3324", marginBottom: "24px" },
  emptyState: { height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px" },

  miniStatsColumn: { display: "flex", flexDirection: "column", gap: "24px" },
  miniGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  miniStatCard: { background: "#fff", padding: "16px", borderRadius: "20px", border: "1px solid rgba(228, 203, 182, 0.2)", textAlign: "center", boxShadow: "0 4px 6px -1px rgba(76, 51, 36, 0.02)" },
  miniLabel: { fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", display: "block", marginBottom: "4px" },
  miniValue: { fontSize: "22px", fontWeight: "900" },

  statusBreakdown: { background: "#fff", padding: "20px", borderRadius: "20px", border: "1px solid rgba(228, 203, 182, 0.2)" },
  subTitle: { margin: "0 0 16px", fontSize: "14px", fontWeight: "700", color: "#4c3324" },
  progressBar: { height: "12px", borderRadius: "6px", backgroundColor: "#f1f5f9", overflow: "hidden", display: "flex", marginBottom: "16px" },
=======
const s = {
  container: {
    padding: "0",
    background: "transparent",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "0 0 6px 0",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#819B8B",
    margin: 0,
    fontSize: 15,
  },
  headerActions: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  refreshBtn: {
    background: "#fff",
    border: "1.5px solid #d9c8bb",
    padding: "10px 18px",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
    color: "#7a5c4a",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
  },
  downloadBtn: {
    background: "#f0ebe5",
    border: "1.5px solid #ddd0c6",
    color: "#4C3324",
    padding: "10px 18px",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
  },
  printBtn: {
    background: "#4C3324",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    boxShadow: "0 4px 10px rgba(76,51,36,0.3)",
  },

  // Stat Cards
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
    marginBottom: 28,
  },
  statCard: {
    background: "#fff",
    padding: "22px",
    borderRadius: 16,
    border: "1px solid #e8ddd5",
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 4px 16px rgba(76,51,36,0.05)",
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    flexShrink: 0,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#B2846B",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: 4,
    fontFamily: "'DM Sans', sans-serif",
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "'Sora', sans-serif",
    margin: 0,
  },

  // Chart + Mini Grid
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 24,
    marginBottom: 28,
  },
  chartCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: 16,
    border: "1px solid #e8ddd5",
    boxShadow: "0 4px 16px rgba(76,51,36,0.05)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#627B68",
    marginBottom: 20,
    fontFamily: "'Sora', sans-serif",
  },
  emptyState: {
    height: 280,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#B2846B",
    fontSize: 14,
    fontStyle: "italic",
  },
  miniStatsColumn: { display: "flex", flexDirection: "column", gap: 20 },
  miniGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  miniStatCard: {
    background: "#fff",
    padding: "16px",
    borderRadius: 14,
    border: "1px solid #e8ddd5",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(76,51,36,0.04)",
  },
  miniLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#B2846B",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    display: "block",
    marginBottom: 6,
    fontFamily: "'DM Sans', sans-serif",
  },
  miniValue: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "'Sora', sans-serif",
  },
  statusBreakdown: {
    background: "#fff",
    padding: "20px",
    borderRadius: 14,
    border: "1px solid #e8ddd5",
  },
  statusTitle: {
    margin: "0 0 14px",
    fontSize: 13,
    fontWeight: 700,
    color: "#7a5c4a",
    fontFamily: "'DM Sans', sans-serif",
  },
  progressBar: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#f0ebe5",
    overflow: "hidden",
    display: "flex",
    marginBottom: 14,
  },
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  progressFill: { height: "100%", transition: "width 0.5s ease" },

  legend: { display: "flex", flexDirection: "column", gap: 7 },
  legendItem: {
    fontSize: 12,
    color: "#7a5c4a",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'DM Sans', sans-serif",
  },
  dot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block", flexShrink: 0 },

<<<<<<< HEAD
  tableCard: { background: "#fff", borderRadius: "24px", border: "1px solid rgba(228, 203, 182, 0.2)", boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "20px", backgroundColor: "rgba(178, 132, 107, 0.05)", borderBottom: "1px solid rgba(228, 203, 182, 0.2)", color: "#4c3324", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" },
  td: { padding: "20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
  tr: { transition: "backgroundColor 0.2s ease" },
  emptyTable: { paddingTop: "60px", paddingBottom: "60px", textAlign: "center", color: "#94a3b8", fontSize: "15px" },
  statusBadge: { background: "rgba(129, 155, 139, 0.15)", color: "#627b68", padding: "6px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: "800" },
  deleteBtn: { background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "18px", padding: "8px", borderRadius: "8px", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" },
=======
  // Tabs
  tabsWrapper: { marginBottom: 40 },
  tabsHeader: { marginBottom: 18, display: "flex", justifyContent: "center" },
  tabGroup: {
    background: "#fff",
    padding: "5px",
    borderRadius: 12,
    display: "inline-flex",
    gap: 4,
    border: "1px solid #e8ddd5",
  },
  tabBtn: {
    padding: "9px 28px",
    border: "none",
    borderRadius: 9,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.03em",
  },
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610

  deleteBtn: {
    background: "#f5ddd7",
    border: "none",
    color: "#8b3a25",
    cursor: "pointer",
    fontSize: 15,
    padding: "7px 10px",
    borderRadius: 8,
    transition: "all 0.18s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },


  // Loader / Error
  loaderContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "4px solid #e8ddd5",
    borderTop: "4px solid #B2846B",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: 16,
    color: "#819B8B",
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
  },
  errorWrapper: { padding: "80px 0", display: "flex", justifyContent: "center" },
  errorCard: {
    background: "#fff",
    padding: 40,
    borderRadius: 20,
    border: "1px solid #e8ddd5",
    textAlign: "center",
    maxWidth: 400,
    boxShadow: "0 12px 24px rgba(76,51,36,0.08)",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
  },
  errorMessage: {
    color: "#8b3a25",
    margin: "12px 0 24px",
    fontSize: 14,
    lineHeight: 1.5,
    fontFamily: "'DM Sans', sans-serif",
  },
  retryBtn: {
    background: "#627B68",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 3px 10px rgba(98,123,104,0.3)",
  },
};
