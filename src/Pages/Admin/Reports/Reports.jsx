import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  Cell, Legend
} from "recharts";
import BASE_URL from "../../../config";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [reportData, setReportData] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalProperties: 0,
    totalBuyProperties: 0,
    totalRentProperties: 0,
    totalPreRentProperties: 0,
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    bookings: [],
    revenue: [],
    properties: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError("");
      const rawToken = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
      let token = rawToken;
      try {
        const parsed = JSON.parse(rawToken);
        if (parsed && typeof parsed === 'object') token = parsed.token || rawToken;
        else if (typeof parsed === 'string') token = parsed;
      } catch (e) { }

      // Use fetch instead of axios for consistency with Dashboard and to avoid port issues
      console.log("🔑 Using Token:", token ? (token.substring(0, 10) + "...") : "MISSING");

      const response = await fetch(`${BASE_URL}/api/admin/reports`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("🌐 Fetching from:", `${BASE_URL}/api/admin/reports`);

      if (!response.ok) {
        console.error("❌ API Response Not OK:", response.status, response.statusText);
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const res = await response.json();
      console.log("📢 Admin Reports API Response:", res);

      if (res.success) {
        setReportData(res.data);
      } else {
        setError(res.message || "Report data could not be loaded.");
      }
    } catch (err) {
      console.error(err);
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
        if (parsed && typeof parsed === 'object') token = parsed.token || rawToken;
      } catch (e) { }

      const url = `${BASE_URL}/api/admin/reports/${type}/${id}`;
      console.log("🗑️ Attempting Delete:", url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const res = await response.json();
      if (res.success) {
        // Refresh data after deletion
        fetchReportData();
        // Optional: Show success toast/alert if you have one
      } else {
        alert(res.message || "Failed to delete record.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the record.");
    }
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Synthesizing Analytics Reports...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorWrapper}>
      <div style={styles.errorCard}>
        <div style={styles.errorIcon}>⚠️</div>
        <h2 style={styles.errorTitle}>Connection Failed</h2>
        <p style={styles.errorMessage}>{error}</p>
        <button onClick={fetchReportData} style={styles.retryBtn}>Retry Connection</button>
      </div>
    </div>
  );

  const handleDownloadCSV = () => {
    const data = reportData;
    let csvContent = "data:text/csv;charset=utf-8,";

    // 1. Summary Section
    csvContent += "ANALYTICS SUMMARY\n";
    csvContent += `Total Revenue,Total Users,Total Properties,Total Bookings\n`;
    csvContent += `₹${data.totalRevenue || 0},${data.totalUsers || 0},${data.totalProperties || 0},${data.totalBookings || 0}\n\n`;

    // 2. Network Overview Section
    csvContent += "NETWORK OVERVIEW\n";
    csvContent += `Agents,Buy Listings,Rentals,Pre-Rent\n`;
    csvContent += `${data.totalAgents || 0},${data.totalBuyProperties || 0},${data.totalRentProperties || 0},${data.totalPreRentProperties || 0}\n\n`;

    // 3. Bookings Details
    csvContent += "BOOKINGS DETAILS\n";
    csvContent += "ID,Visitor,Property,Date,Amount,Status\n";
    (data.bookings || []).forEach(b => {
      csvContent += `${b.id},"${b.user}","${b.property}",${b.date},${b.amount},${b.status}\n`;
    });
    csvContent += "\n";

    // 4. Property Details
    csvContent += "PROPERTIES DETAILS\n";
    csvContent += "ID,Title,Category,Price,Status\n";
    (data.properties || []).forEach(p => {
      csvContent += `${p.id},"${p.name}",${p.category},${p.price},${p.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PropZo_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { title: "Total Revenue", value: `₹${(reportData.totalRevenue || 0).toLocaleString()}`, icon: "💰", color: "#10b981" },
    { title: "Active Users", value: reportData.totalUsers || 0, icon: "👥", color: "#6366f1" },
    { title: "Total Properties", value: reportData.totalProperties || 0, icon: "🏢", color: "#f59e0b" },
    { title: "All Bookings", value: reportData.totalBookings || 0, icon: "📅", color: "#3b82f6" },
  ];

  const miniStats = [
    { label: "Agents", value: reportData.totalAgents || 0, color: "#8b5cf6" },
    { label: "Buy Listings", value: reportData.totalBuyProperties || 0, color: "#ec4899" },
    { label: "Rentals", value: reportData.totalRentProperties || 0, color: "#06b6d4" },
    { label: "Pre-Rent", value: reportData.totalPreRentProperties || 0, color: "#64748b" },
  ];

  const COLORS = ["#627b68", "#b2846b", "#819b8b", "#4c3324"];

  return (
    <div style={styles.container}>
      {/* Global Print Styles */}
      <style>{`
        @media print {
          /* Hide specific elements during print */
          .print-hide {
            display: none !important;
          }
          
          /* Force both tables to show in print regardless of active tab */
          .printable-table-section {
            display: block !important;
            margin-bottom: 40px !important;
            page-break-inside: avoid;
          }

          /* Hide everything by default */
          body * {
            visibility: hidden;
          }

          /* Show only the report content */
          #reportContent, #reportContent * {
            visibility: visible;
          }

          /* Position reportContent at the very top left */
          #reportContent {
            visibility: visible !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: block !important;
            background: #fff !important;
          }

          /* Completely remove UI elements from layout */
          #admin-sidebar, aside, header, .headerWrapper, .headerActions, 
          .refreshBtn, .printBtn, .tabGroup, nav, .sidebar, .navbar,
          button, .iconButton, .delete-btn {
            display: none !important;
          }

          /* Professional Print Header */
          .print-header {
            display: block !important;
            visibility: visible !important;
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #0f172a;
            padding-bottom: 20px;
          }
          .print-header * { visibility: visible !important; }
          .print-header h1 { font-size: 32px; margin: 0; color: #0f172a; }
          .print-header p { font-size: 14px; color: #64748b; margin: 5px 0 0; }

          /* Layout Adjustments */
          .stats-grid-print {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            margin-bottom: 30px !important;
          }
          .card-print {
            border: 1px solid #e2e8f0 !important;
            padding: 15px !important;
            border-radius: 12px !important;
            page-break-inside: avoid;
            background: #fff !important;
            overflow: visible !important;
            height: auto !important;
            display: block !important;
          }
          
          /* Table Styling */
          table { 
            width: 100% !important; 
            border-collapse: collapse !important; 
            border: 1px solid #e2e8f0 !important;
            table-layout: auto !important;
          }
          th, td { 
            border: 1px solid #e2e8f0 !important; 
            padding: 10px 8px !important; 
            font-size: 11px !important;
            text-align: left !important; 
            color: #1e293b !important; 
          }
          th { background-color: #f8fafc !important; }

          .tabGroup, .tabsHeader {
            display: none !important;
          }

          .sectionTitle {
            margin-top: 20px !important;
            background: #f8fafc !important;
            padding: 10px !important;
            border: 1px solid #e2e8f0 !important;
            border-bottom: none !important;
          }
        }
        
        .print-header { display: none; }
      `}</style>

      {/* Header Section (Not Printed) */}
      <div style={styles.header} className="headerSection">
        <div>
          <h1 style={styles.title}>Analytics Reports</h1>
          <p style={styles.subtitle}>Real-time performance tracking and growth metrics.</p>
        </div>
        <div style={styles.headerActions} className="print-hide">
          <button onClick={fetchReportData} style={styles.refreshBtn}>
            <span style={{ fontSize: "14px" }}>🔄</span> Refresh
          </button>
          <button onClick={handleDownloadCSV} style={styles.downloadBtn}>
            Download CSV
          </button>
          <button onClick={() => window.print()} style={styles.printBtn}>
            Print Full Report
          </button>
        </div>
      </div>

      <div id="reportContent">
        {/* Print-Only Professional Header */}
        <div className="print-header">
          <h1>PropZo</h1>
          <p>Admin Analytics Report</p>
          <p>Generated on: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        {/* Primary Stats Grid */}
        <div style={styles.statsGrid} className="stats-grid-print">
          {stats.map((s, i) => (
            <div key={i} style={styles.statCard} className="card-print">
              <div style={{ ...styles.iconBox, backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
              <div>
                <span style={styles.statLabel}>{s.title}</span>
                <h3 style={styles.statValue}>{s.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Stats & Analytics Charts */}
        <div style={styles.contentGrid}>
          <div style={styles.chartCard} className="card-print">
            <h3 style={styles.sectionTitle}>Monthly Activity Growth</h3>
            <div style={{ height: 300 }}>
              {(reportData.revenue || []).length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: "#64748b" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                      cursor={{ fill: "#f8fafc" }}
                    />
                    <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                      {(reportData.revenue || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={styles.emptyState}>No activity data recorded yet.</div>
              )}
            </div>
          </div>

          <div style={styles.miniStatsColumn}>
            <h3 style={styles.sectionTitle}>Network Overview</h3>
            <div style={styles.miniGrid}>
              {miniStats.map((ms, i) => (
                <div key={i} style={styles.miniStatCard} className="card-print">
                  <span style={styles.miniLabel}>{ms.label}</span>
                  <span style={{ ...styles.miniValue, color: ms.color }}>{ms.value}</span>
                </div>
              ))}
            </div>
            <div style={styles.statusBreakdown} className="card-print">
              <h4 style={styles.subTitle}>Booking Status</h4>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${(reportData.completedBookings / reportData.totalBookings) * 100 || 0}%`, backgroundColor: "#10b981" }} title="Completed"></div>
                <div style={{ ...styles.progressFill, width: `${(reportData.pendingBookings / reportData.totalBookings) * 100 || 0}%`, backgroundColor: "#f59e0b" }} title="Pending"></div>
                <div style={{ ...styles.progressFill, width: `${(reportData.cancelledBookings / reportData.totalBookings) * 100 || 0}%`, backgroundColor: "#ef4444" }} title="Cancelled"></div>
              </div>
              <div style={styles.legend}>
                <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: "#10b981" }}></span> Completed: {reportData.completedBookings}</div>
                <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: "#f59e0b" }}></span> Pending: {reportData.pendingBookings}</div>
                <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: "#ef4444" }}></span> Failed: {reportData.cancelledBookings}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Records Tables */}
        <div style={styles.tabsWrapper}>
          <div style={styles.tabsHeader} className="print-hide">
            <div style={styles.tabGroup}>
              {["bookings", "properties"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tabBtn,
                    background: activeTab === tab ? "#0f172a" : "transparent",
                    color: activeTab === tab ? "#fff" : "#64748b",
                    boxShadow: activeTab === tab ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table Block */}
          <div
            className="printable-table-section"
            style={{ display: activeTab === "bookings" ? "block" : "none" }}
          >
            <div style={styles.tableCard} className="card-print">
              <h3 style={{ ...styles.sectionTitle, padding: "20px 20px 0", margin: 0 }}>BOOKINGS DETAILS</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Visitor</th>
                    <th style={styles.th}>Target Property</th>
                    <th style={styles.th}>Scheduled</th>
                    <th style={styles.th}>Asset Value</th>
                    <th style={styles.th}>Status</th>
                    <th style={{ ...styles.th, textAlign: "center" }} className="print-hide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(reportData.bookings || []).length > 0 ? (
                    reportData.bookings.map((b) => (
                      <tr key={b.id} style={styles.tr}>
                        <td style={styles.td}>#{String(b.id || "").slice(-8).toUpperCase()}</td>
                        <td style={styles.td}><strong>{b.user}</strong></td>
                        <td style={styles.td}>{b.property}</td>
                        <td style={styles.td}>{b.date}</td>
                        <td style={{ ...styles.td, fontWeight: "800", color: "#0f172a" }}>₹{(b.amount || 0).toLocaleString()}</td>
                        <td style={styles.td}>
                          <span style={styles.statusBadge}>
                            {b.status}
                          </span>
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }} className="print-hide">
                          <button
                            onClick={() => handleDelete(b.type, b.id)}
                            style={styles.deleteBtn}
                            className="delete-btn"
                            title="Delete Record"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" style={styles.emptyTable}>No dynamic interactions recorded.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Properties Table Block */}
          <div
            className="printable-table-section"
            style={{ display: activeTab === "properties" ? "block" : "none" }}
          >
            <div style={styles.tableCard} className="card-print">
              <h3 style={{ ...styles.sectionTitle, padding: "20px 20px 0", margin: 0 }}>PROPERTIES DETAILS</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Property Title</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Status</th>
                    <th style={{ ...styles.th, textAlign: "center" }} className="print-hide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(reportData.properties || []).length > 0 ? (
                    reportData.properties.map((p, index) => (
                      <tr key={p.id || index} style={styles.tr}>
                        <td style={styles.td}>#{String(p.id || "").slice(-8).toUpperCase()}</td>
                        <td style={styles.td}><strong>{p.name}</strong></td>
                        <td style={styles.td}>{p.category}</td>
                        <td style={{ ...styles.td, fontWeight: "800", color: "#10b981" }}>₹{(p.price || 0).toLocaleString()}</td>
                        <td style={styles.td}>
                          <span style={styles.statusBadge}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }} className="print-hide">
                          <button
                            onClick={() => handleDelete(p.type, p.id)}
                            style={styles.deleteBtn}
                            className="delete-btn"
                            title="Delete Property"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" style={styles.emptyTable}>No dynamic interactions recorded.</td></tr>
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
  progressFill: { height: "100%", transition: "width 0.5s ease" },
  legend: { display: "flex", flexDirection: "column", gap: "8px" },
  legendItem: { fontSize: "12px", color: "#64748b", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%" },

  tabsWrapper: { marginBottom: "40px" },
  tabsHeader: { marginBottom: "20px", display: "flex", justifyContent: "center" },
  tabGroup: { background: "rgba(255,255,255,0.8)", padding: "6px", borderRadius: "16px", display: "inline-flex", gap: "4px", border: "1px solid #e2e8f0" },
  tabBtn: { padding: "10px 24px", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s" },

  tableCard: { background: "#fff", borderRadius: "24px", border: "1px solid rgba(228, 203, 182, 0.2)", boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "20px", backgroundColor: "rgba(178, 132, 107, 0.05)", borderBottom: "1px solid rgba(228, 203, 182, 0.2)", color: "#4c3324", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" },
  td: { padding: "20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
  tr: { transition: "backgroundColor 0.2s ease" },
  emptyTable: { paddingTop: "60px", paddingBottom: "60px", textAlign: "center", color: "#94a3b8", fontSize: "15px" },
  statusBadge: { background: "rgba(129, 155, 139, 0.15)", color: "#627b68", padding: "6px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: "800" },
  deleteBtn: { background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "18px", padding: "8px", borderRadius: "8px", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" },

  loadingContainer: { height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  spinner: { width: "40px", height: "40px", border: "4px solid #f1f5f9", borderTop: "4px solid #6366f1", borderRadius: "50%", animation: "spin 1s linear infinite" },
  loadingText: { marginTop: "16px", color: "#64748b", fontWeight: "600" },
  errorWrapper: { padding: "100px 0", display: "flex", justifyContent: "center" },
  errorCard: { background: "#fff", padding: "40px", borderRadius: "32px", border: "1px solid #fee2e2", textAlign: "center", maxWidth: "400px", boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.1)" },
  errorIcon: { fontSize: "48px", marginBottom: "16px" },
  errorTitle: { fontSize: "20px", fontWeight: "800", color: "#991b1b", margin: 0 },
  errorMessage: { color: "#dc2626", margin: "12px 0 24px", fontSize: "14px", lineHeight: "1.5" },
  retryBtn: { background: "#dc2626", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: "700", cursor: "pointer" },
};
