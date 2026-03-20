<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
=======
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
//   PieChart, Pie, Cell, Legend
// } from "recharts";
// import { getImageUrl } from "../../../config";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const role = localStorage.getItem("role") || localStorage.getItem("adminRole");
//     if (role !== "admin") {
//       navigate("/adminlogin");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token") || localStorage.getItem("adminAuthToken");
//         const res = await fetch("http://localhost:5000/api/admin/dashboard", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const result = await res.json();
//         if (result.success) {
//           setData(result.data);
//         } else {
//           setError(result.message || "Failed to fetch dashboard data");
//         }
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError("Network error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) return <div style={loadingContainer}><h2>Loading Analytics...</h2></div>;
//   if (error) return <div style={errorContainer}><h2>{error}</h2></div>;

//   const stats = [
//     { title: "Total Users", value: data.totalUsers ?? 0, icon: "👥", color: "#6366f1" },
//     { title: "Total Properties", value: data.totalProperties ?? 0, icon: "🏠", color: "#10b981" },
//     { title: "Buy Appointments", value: data.totalBuyAppointments ?? data.totalBuyBookings ?? 0, icon: "🔑", color: "#f59e0b" },
//     { title: "Rent Appointments", value: data.totalRentAppointments ?? data.totalRentBookings ?? 0, icon: "📅", color: "#3b82f6" },
//     { title: "PreRent Bookings", value: data.totalPreRentAppointments ?? data.totalPreRentBookings ?? 0, icon: "⏳", color: "#8b5cf6" },
//   ];

//   const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

//   return (
//     <div style={containerStyle}>
//       <style>{`
//         @media (max-width: 1200px) {
//           .dashboard-middle { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 768px) {
//           .dashboard-stats { grid-template-columns: repeat(2, 1fr) !important; }
//           .dashboard-header { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
//           .dashboard-title { font-size: 24px !important; }
//         }
//         @media (max-width: 480px) {
//           .dashboard-stats { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//       <header style={headerStyle} className="dashboard-header">
//         <div>
//           <h1 style={titleStyle} className="dashboard-title">System Overview</h1>
//           <p style={subtitleStyle}>Welcome back, Admin. Here's what's happening on PropZo today.</p>
//         </div>
//         <button style={btnPrimary} onClick={() => window.location.reload()}>Refresh Data</button>
//       </header>

//       {/* STATS CARDS */}
//       <div style={statsGrid} className="dashboard-stats">
//         {stats.map((s, i) => (
//           <div key={i} style={statCard}>
//             <div style={{ ...iconBox, backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
//             <div style={statInfo}>
//               <h3 style={statVal}>{s.value}</h3>
//               <p style={statLbl}>{s.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MIDDLE SECTION: CHARTS & ACTIVITY */}
//       <div style={middleGrid} className="dashboard-middle">
//         <div style={chartCard}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//             <h3 style={sectionTitle}>Property Distribution</h3>
//           </div>
//           <div style={{ height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//             {(data?.pieData || []).some(d => d.value > 0) ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={data?.pieData || []}
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={5}
//                     dataKey="value"
//                   >
//                     {(data?.pieData || []).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div style={emptyChartState}>
//                 <div style={emptyIcon}>📊</div>
//                 <p>No property data yet</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div style={activityCard}>
//           <h3 style={sectionTitle}>Recent Activity</h3>
//           <div style={activityList}>
//             {(data?.recentUsers || []).length > 0 ? (
//               (data?.recentUsers || []).map((u, i) => (
//                 <div key={i} style={activityItem}>
//                   <div style={userInitial}>{u.name ? u.name.charAt(0) : "U"}</div>
//                   <div>
//                     <p style={activityText}><strong>{u.name || "A user"}</strong> joined PropZo</p>
//                     <span style={activityTime}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Recently"}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div style={emptyActivityState}>
//                 <p>No recent signups</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* RECENT PROPERTIES TABLE */}
//       <div style={tableWrapper}>
//         <div style={tableHeader}>
//           <h3 style={sectionTitle}>Recently Listed Properties</h3>
//           <button style={btnLink} onClick={() => navigate("/admin/properties")}>View All</button>
//         </div>
//         <div style={scrollTable}>
//           <table style={mainTable}>
//             <thead>
//               <tr>
//                 <th>Property</th>
//                 <th>Location</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(data?.recentProperties || []).length > 0 ? (
//                 (data?.recentProperties || []).map((p, i) => (
//                   <tr key={i}>
//                     <td style={propertyCell}>
//                       <img
//                         src={getImageUrl(p.image || p.images?.[0])}
//                         style={tableImg}
//                         alt=""
//                         onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=100"; }}
//                       />
//                       <span>{p.title}</span>
//                     </td>
//                     <td>{p.address || p.city}</td>
//                     <td><span style={typeBadge(p.category)}>{p.category}</span></td>
//                     <td style={{ fontWeight: 700 }}>₹{p.price?.toLocaleString()}</td>
//                     <td><span style={statusBadge(!p.isSold)}>{p.isSold ? "Sold" : "Active"}</span></td>
//                     <td>
//                       <button style={actionBtn} onClick={() => navigate("/admin/properties")}>Edit</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No properties listed yet</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* APPOINTMENTS TABLE */}
//       <div style={tableWrapper}>
//         <div style={tableHeader}>
//           <h3 style={sectionTitle}>Latest Appointment Requests</h3>
//           <button style={btnLink} onClick={() => navigate("/admin/bookings")}>Manage All</button>
//         </div>
//         <div style={scrollTable}>
//           <table style={mainTable}>
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Property</th>
//                 <th>Schedule</th>
//                 <th>Type</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(data?.recentBookings || []).length > 0 ? (
//                 (data?.recentBookings || []).map((b, i) => (
//                   <tr key={i}>
//                     <td>
//                       <div style={{ fontWeight: 600 }}>{b.user?.name}</div>
//                       <div style={{ fontSize: 12, color: "#64748b" }}>{b.user?.email || "N/A"}</div>
//                     </td>
//                     <td>{b.property?.title || "Deleted Property"}</td>
//                     <td>
//                       <div>{b.proposedDate}</div>
//                       <div style={{ fontSize: 12, color: "#64748b" }}>{b.proposedTime}</div>
//                     </td>
//                     <td><span style={typeBadge(b.type)}>{b.type}</span></td>
//                     <td><span style={bookingStatusBadge(b.status)}>{b.status}</span></td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No appointment requests yet</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// const containerStyle = { padding: "20px 0", display: "flex", flexDirection: "column", gap: "32px" };
// const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "flex-end" };
// const titleStyle = { margin: 0, fontSize: "28px", fontWeight: "800", color: "#0f172a" };
// const subtitleStyle = { margin: "4px 0 0", color: "#64748b", fontSize: "15px" };
// const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" };
// const statCard = { background: "#fff", padding: "24px", borderRadius: "24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default" };
// const iconBox = { width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" };
// const statInfo = { display: "flex", flexDirection: "column", justifyContent: "center" };
// const statVal = { margin: 0, fontSize: "28px", fontWeight: "800", lineHeight: 1, color: "#0f172a" };
// const statLbl = { margin: "6px 0 0", fontSize: "14px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" };
// const middleGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" };
// const emptyChartState = { textAlign: "center", color: "#94a3b8" };
// const emptyIcon = { fontSize: "40px", marginBottom: "10px", opacity: 0.5 };
// const emptyActivityState = { padding: "40px 0", textAlign: "center", color: "#94a3b8", border: "1px dashed #e2e8f0", borderRadius: "16px" };
// const chartCard = { background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
// const activityCard = { background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
// const sectionTitle = { margin: "0 0 20px 0", fontSize: "19px", fontWeight: "700", color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" };
// const activityList = { display: "flex", flexDirection: "column", gap: "16px" };
// const activityItem = { display: "flex", gap: "12px", alignItems: "center", padding: "8px", borderRadius: "12px", transition: "background 0.2s" };
// const userInitial = { width: "40px", height: "40px", borderRadius: "12px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#6366f1", fontSize: "15px" };
// const activityText = { margin: 0, fontSize: "14px", color: "#334155", fontWeight: "500" };
// const activityTime = { fontSize: "12px", color: "#94a3b8" };
// const tableWrapper = { background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "24px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
// const tableHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" };
// const scrollTable = { width: "100%", overflowX: "auto" };
// const mainTable = { width: "100%", borderCollapse: "collapse" };
// const propertyCell = { display: "flex", alignItems: "center", gap: "12px", fontWeight: 600, color: "#1e293b" };
// const tableImg = { width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover" };
// const actionBtn = { padding: "8px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", color: "#475569", transition: "all 0.2s" };
// const btnPrimary = { padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)", transition: "all 0.2s" };
// const btnLink = { background: "rgba(99, 102, 241, 0.08)", border: "none", color: "#6366f1", padding: "8px 16px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" };
// const typeBadge = (type) => {
//   const colors = {
//     "Visit": { bg: "#e0f2fe", text: "#0369a1" },
//     "Rental": { bg: "#f0fdf4", text: "#166534" },
//     "Pre-Rent": { bg: "#faf5ff", text: "#6b21a8" },
//     "Buy": { bg: "#e0f2fe", text: "#0369a1" },
//     "Rent": { bg: "#fef3c7", text: "#92400e" }
//   };
//   const c = colors[type] || colors["Visit"];
//   return { padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: c.bg, color: c.text };
// };
// const statusBadge = (active) => ({ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: active ? "#dcfce7" : "#fef2f2", color: active ? "#166534" : "#991b1b" });
// const bookingStatusBadge = (s) => ({ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: s === "Completed" ? "#dcfce7" : s === "Pending" ? "#fffbeb" : "#f1f5f9", color: s === "Completed" ? "#166534" : s === "Pending" ? "#92400e" : "#475569" });
// const loadingContainer = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
// const errorContainer = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" };
import React, { useEffect, useState } from "react";
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer
} from "recharts";
import { getImageUrl } from "../../../config";

const COLORS = ["#627B68", "#819B8B", "#B2846B", "#4C3324", "#a0b8a8"];

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [ticker, setTicker] = useState(0); // live clock ticker

  // Auth guard
  useEffect(() => {
    const role = localStorage.getItem("role") || localStorage.getItem("adminRole");
    if (role !== "admin") navigate("/adminlogin");
  }, [navigate]);

  // Live clock – updates every second
  useEffect(() => {
    const id = setInterval(() => setTicker(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fetchDashboardData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("adminAuthToken");
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date());
        setError("");
      } else {
        setError(result.message || "Failed to fetch dashboard data");
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const id = setInterval(() => fetchDashboardData(), 60000);
    return () => clearInterval(id);
  }, [fetchDashboardData]);

  // Format "last updated" relative time
  const formatRelative = (date) => {
    if (!date) return "—";
    const diffSec = Math.floor((new Date() - date) / 1000);
    if (diffSec < 5) return "just now";
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    return date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={spinnerWrap}>
          <div style={spinner} />
          <p style={{ color: "#627B68", fontWeight: 600, marginTop: 16, fontSize: 15 }}>
            Loading Analytics…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={loadingContainer}>
        <div style={errorBox}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
          <h3 style={{ margin: "0 0 8px", color: "#4C3324" }}>Something went wrong</h3>
          <p style={{ color: "#819B8B", margin: "0 0 20px", fontSize: 14 }}>{error}</p>
          <button style={btnPrimary} onClick={() => fetchDashboardData(true)}>Try Again</button>
        </div>
      </div>
    );
  }

  const stats = [
<<<<<<< HEAD
    { title: "Total Users",       value: data.totalUsers ?? 0,               icon: "👥", color: "#627B68" },
    { title: "Total Properties",  value: data.totalProperties ?? 0,           icon: "🏠", color: "#819B8B" },
    { title: "Buy Appointments",  value: data.totalBuyAppointments ?? 0,      icon: "🔑", color: "#B2846B" },
    { title: "Rent Appointments", value: data.totalRentAppointments ?? 0,     icon: "📅", color: "#4C3324" },
    { title: "PreRent Bookings",  value: data.totalPreRentAppointments ?? 0,  icon: "⏳", color: "#a07058" },
  ];

  // Build a unified recent-activity feed (users + latest bookings + recent properties)
  const activityFeed = [
    ...(data.recentUsers || []).map(u => ({
      icon: "👤",
      color: "#627B68",
      bg: "#eef2ef",
      label: <><strong>{u.name || "A user"}</strong> joined PropZo</>,
      time: u.createdAt ? new Date(u.createdAt) : null,
      key: `u-${u._id}`
    })),
    ...(data.recentBookings || []).slice(0, 5).map((b, i) => ({
      icon: b.type === "Pre-Rent" ? "⏳" : b.type === "Rental" ? "🏡" : "🔑",
      color: b.type === "Pre-Rent" ? "#B2846B" : b.type === "Rental" ? "#819B8B" : "#627B68",
      bg: b.type === "Pre-Rent" ? "#f5ede8" : "#eef2ef",
      label: <><strong>{b.user?.name || "A user"}</strong> booked a <em>{b.type}</em> visit for <strong>{b.property?.title || "a property"}</strong></>,
      time: b.createdAt ? new Date(b.createdAt) : null,
      key: `b-${i}`
    })),
    ...(data.recentProperties || []).slice(0, 3).map((p, i) => ({
      icon: "🏗️",
      color: "#4C3324",
      bg: "#f5ede8",
      label: <><strong>{p.title || "A property"}</strong> was listed ({p.category})</>,
      time: p.createdAt ? new Date(p.createdAt) : null,
      key: `p-${i}`
    }))
  ]
    .filter(a => a.time)
    .sort((a, b) => b.time - a.time)
    .slice(0, 8);
=======
    { title: "Total Users", value: data.totalUsers ?? 0, icon: "👥", color: "#627B68" },
    { title: "Total Properties", value: data.totalProperties ?? 0, icon: "🏠", color: "#819B8B" },
    { title: "Buy Appointments", value: data.totalBuyAppointments ?? data.totalBuyBookings ?? 0, icon: "🔑", color: "#B2846B" },
    { title: "Rent Appointments", value: data.totalRentAppointments ?? data.totalRentBookings ?? 0, icon: "📅", color: "#4C3324" },
    { title: "PreRent Bookings", value: data.totalPreRentAppointments ?? data.totalPreRentBookings ?? 0, icon: "⏳", color: "#B2846B" },
  ];

  const COLORS = ["#627B68", "#819B8B", "#B2846B"];
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610

  return (
    <div style={containerStyle}>
      <style>{`
<<<<<<< HEAD
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-card:hover {
          box-shadow: 0 8px 24px rgba(76,51,36,0.12) !important;
          transform: translateY(-2px);
        }
        .activity-row:hover { background: #f5f0ec; }
        .action-btn-hover:hover { background: #e8d5c8 !important; color: #4C3324 !important; }
        table.dash-table thead th {
          padding: 10px 14px;
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #819B8B;
          background: #faf7f5;
          border-bottom: 1.5px solid #e8d5c8;
        }
        table.dash-table tbody td {
          padding: 14px;
          border-bottom: 1px solid #f0e9e4;
          font-size: 14px;
          color: #4C3324;
          vertical-align: middle;
        }
        table.dash-table tbody tr:last-child td { border-bottom: none; }
        table.dash-table tbody tr:hover td { background: #faf7f5; }
=======
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        @media (max-width: 1200px) {
          .dashboard-middle { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .dashboard-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .dashboard-header { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
<<<<<<< HEAD
=======
          .dashboard-title { font-size: 24px !important; }
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        }
        @media (max-width: 480px) {
          .dashboard-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
<<<<<<< HEAD

      {/* ── HEADER ── */}
=======
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
      <header style={headerStyle} className="dashboard-header">
        <div>
          <h1 style={titleStyle} className="dashboard-title">System Overview</h1>
          <p style={subtitleStyle}>Welcome back, Admin. Here's what's happening on PropZo today.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={liveIndicator}>
            <span style={{ ...liveDot, ...(refreshing ? { animation: "none", background: "#B2846B" } : {}) }} />
            <span style={{ fontSize: 12, color: "#819B8B", fontWeight: 600 }}>
              {refreshing ? "Refreshing…" : `Updated ${formatRelative(lastUpdated)}`}
            </span>
          </div>
          <button
            style={btnPrimary}
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
          >
            {refreshing ? "⟳ Refreshing…" : "↻ Refresh Data"}
          </button>
        </div>
      </header>

<<<<<<< HEAD
      {/* ── STATS CARDS ── */}
      <div style={statsGrid} className="dashboard-stats">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card"
            style={{
              ...statCard,
              animation: `fadeInUp 0.35s ease ${i * 0.07}s both`
            }}
          >
            <div style={{ ...iconBox, backgroundColor: `${s.color}18`, fontSize: 26 }}>
              {s.icon}
            </div>
=======
      {/* STATS CARDS */}
      <div style={statsGrid} className="dashboard-stats">
        {stats.map((s, i) => (
          <div key={i} style={statCard}>
            <div style={{ ...iconBox, backgroundColor: `${s.color}18`, color: s.color }}>{s.icon}</div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
            <div style={statInfo}>
              <h3 style={{ ...statVal, color: s.color }}>{s.value.toLocaleString()}</h3>
              <p style={statLbl}>{s.title}</p>
            </div>
            <div style={{ ...trendBar, background: `${s.color}12` }} />
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {/* ── PIE CHART + RECENT ACTIVITY ── */}
      <div style={middleGrid} className="dashboard-middle">
        {/* Pie Chart */}
=======
      {/* MIDDLE SECTION: CHARTS & ACTIVITY */}
      <div style={middleGrid} className="dashboard-middle">
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        <div style={chartCard}>
          <h3 style={sectionTitle}>📊 Property Distribution</h3>
          <div style={{ height: 280 }}>
            {(data?.pieData || []).some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.pieData || []}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {(data?.pieData || []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} properties`, name]}
                    contentStyle={{ borderRadius: 10, border: "1px solid #e8d5c8", fontSize: 13 }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#4C3324", fontWeight: 600, fontSize: 13 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={emptyState}>
                <div style={{ fontSize: 40, opacity: 0.4, marginBottom: 8 }}>📊</div>
                <p style={{ color: "#819B8B", margin: 0 }}>No property data yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div style={activityCard}>
          <h3 style={sectionTitle}>🕐 Recent Activity</h3>
          {activityFeed.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {activityFeed.map(item => (
                <div key={item.key} className="activity-row" style={activityRow}>
                  <div style={{ ...activityIcon, background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={activityText}>{item.label}</p>
                    <span style={activityTime}>
                      {item.time
                        ? item.time.toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit"
                          })
                        : "Recently"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyState}>
              <div style={{ fontSize: 36, opacity: 0.4, marginBottom: 8 }}>📭</div>
              <p style={{ color: "#819B8B", margin: 0 }}>No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* ── RECENTLY LISTED PROPERTIES TABLE ── */}
      <div style={tableWrapper}>
        <div style={tableHeader}>
          <h3 style={sectionTitle}>🏠 Recently Listed Properties</h3>
          <button style={btnLink} onClick={() => navigate("/admin/properties")}>View All →</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="dash-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentProperties || []).length > 0 ? (
                (data.recentProperties).map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                          src={getImageUrl(p.image || p.images?.[0])}
                          style={tableImg}
                          alt={p.title}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=100";
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: "#4C3324", fontSize: 14 }}>{p.title || "—"}</div>
                          <div style={{ fontSize: 11, color: "#819B8B" }}>
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN") : ""}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "#627B68" }}>{p.address || p.city || "—"}</td>
                    <td><span style={catBadge(p.category)}>{p.category || "—"}</span></td>
                    <td style={{ fontWeight: 700, color: "#4C3324" }}>
                      ₹{p.price?.toLocaleString("en-IN") ?? "—"}
                    </td>
                    <td><span style={statusBadge(p.isSold)}>{p.isSold ? "Sold" : "Active"}</span></td>
                    <td>
                      <button
                        className="action-btn-hover"
                        style={actionBtn}
                        onClick={() => navigate("/admin/properties")}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
<<<<<<< HEAD
                  <td colSpan="6" style={emptyCell}>No properties listed yet</td>
=======
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#819B8B" }}>No properties listed yet</td>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── LATEST APPOINTMENTS TABLE ── */}
      <div style={tableWrapper}>
        <div style={tableHeader}>
          <h3 style={sectionTitle}>📋 Latest Appointment Requests</h3>
          <button style={btnLink} onClick={() => navigate("/admin/bookings")}>Manage All →</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="dash-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Property</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentBookings || []).length > 0 ? (
                (data.recentBookings).map((b, i) => (
                  <tr key={i}>
                    <td>
<<<<<<< HEAD
                      <div style={{ fontWeight: 600, color: "#4C3324" }}>{b.user?.name || "—"}</div>
                      <div style={{ fontSize: 12, color: "#819B8B" }}>{b.user?.email || "N/A"}</div>
                    </td>
                    <td style={{ color: "#627B68", fontWeight: 500 }}>
                      {b.property?.title || "Deleted Property"}
=======
                      <div style={{ fontWeight: 600 }}>{b.user?.name}</div>
                      <div style={{ fontSize: 12, color: "#819B8B" }}>{b.user?.email || "N/A"}</div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                    </td>
                    <td>
<<<<<<< HEAD
                      <div style={{ fontWeight: 600, color: "#4C3324" }}>{b.proposedDate || "—"}</div>
                      <div style={{ fontSize: 12, color: "#819B8B" }}>{b.proposedTime || "—"}</div>
=======
                      <div>{b.proposedDate}</div>
                      <div style={{ fontSize: 12, color: "#819B8B" }}>{b.proposedTime}</div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                    </td>
                    <td><span style={typeBadge(b.type)}>{b.type || "—"}</span></td>
                    <td><span style={bookingStatusBadge(b.status)}>{b.status || "Pending"}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
<<<<<<< HEAD
                  <td colSpan="5" style={emptyCell}>No appointment requests yet</td>
=======
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#819B8B" }}>No appointment requests yet</td>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
/* ─── Styles ─────────────────────────────────────────────── */

const containerStyle = {
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: 28,
  fontWeight: 800,
  color: "#4C3324",
};

const subtitleStyle = {
  margin: "6px 0 0",
  color: "#819B8B",
  fontSize: 14,
};

const liveIndicator = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "#faf7f5",
  border: "1px solid #e8d5c8",
  borderRadius: 20,
  padding: "6px 14px",
};

const liveDot = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "#627B68",
  display: "inline-block",
  animation: "none",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 20,
};

const statCard = {
  background: "#fff",
  padding: "22px 20px",
  borderRadius: 20,
  border: "1px solid #e8d5c8",
  display: "flex",
  alignItems: "center",
  gap: 16,
  boxShadow: "0 2px 8px rgba(76,51,36,0.06)",
  transition: "box-shadow 0.25s ease, transform 0.25s ease",
  cursor: "default",
  position: "relative",
  overflow: "hidden",
};

const iconBox = {
  width: 52,
  height: 52,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const statInfo = {
  display: "flex",
  flexDirection: "column",
};

const statVal = {
  margin: 0,
  fontSize: 30,
  fontWeight: 800,
  lineHeight: 1,
};

const statLbl = {
  margin: "6px 0 0",
  fontSize: 11,
  fontWeight: 700,
  color: "#819B8B",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
};

const trendBar = {
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  width: 4,
  borderRadius: "0 20px 20px 0",
};

const middleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
  gap: 24,
};

const chartCard = {
  background: "#fff",
  borderRadius: 20,
  border: "1px solid #e8d5c8",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(76,51,36,0.06)",
};

const activityCard = {
  ...{},
  background: "#fff",
  borderRadius: 20,
  border: "1px solid #e8d5c8",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(76,51,36,0.06)",
  maxHeight: 380,
  overflowY: "auto",
};

const sectionTitle = {
  margin: "0 0 18px 0",
  fontSize: 17,
  fontWeight: 700,
  color: "#4C3324",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const activityRow = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: "10px 8px",
  borderRadius: 12,
  cursor: "default",
  transition: "background 0.2s",
};

const activityIcon = {
  width: 36,
  height: 36,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  flexShrink: 0,
};

const activityText = {
  margin: 0,
  fontSize: 13,
  color: "#4C3324",
  fontWeight: 500,
  lineHeight: 1.4,
};

const activityTime = {
  fontSize: 11,
  color: "#a0b8a8",
  fontWeight: 500,
};

const tableWrapper = {
  background: "#fff",
  borderRadius: 20,
  border: "1px solid #e8d5c8",
  padding: "24px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(76,51,36,0.06)",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const tableImg = {
  width: 44,
  height: 44,
  borderRadius: 10,
  objectFit: "cover",
  border: "1px solid #e8d5c8",
  flexShrink: 0,
};

const actionBtn = {
  padding: "6px 14px",
  background: "#f5f0ec",
  border: "1px solid #e8d5c8",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  color: "#627B68",
  transition: "all 0.2s",
};

const btnPrimary = {
  padding: "10px 22px",
  background: "#627B68",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 14,
  boxShadow: "0 4px 10px rgba(98,123,104,0.25)",
  transition: "opacity 0.2s",
};

const btnLink = {
  background: "rgba(98,123,104,0.08)",
  border: "none",
  color: "#627B68",
  padding: "8px 16px",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 13,
  transition: "background 0.2s",
};

const emptyCell = {
  textAlign: "center",
  padding: "36px",
  color: "#a0b8a8",
  fontSize: 14,
};

const emptyState = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  minHeight: 180,
};

const catBadge = (cat) => {
  const map = {
    Buy:      { bg: "#eef2ef", color: "#627B68" },
    Rent:     { bg: "#f5ede8", color: "#B2846B" },
    "Pre-Rent": { bg: "#f0ebe7", color: "#a07058" },
    Sale:     { bg: "#eef2ef", color: "#4C3324" },
  };
  const c = map[cat] || { bg: "#f5f0ec", color: "#819B8B" };
  return {
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    background: c.bg,
    color: c.color,
  };
};

const statusBadge = (isSold) => ({
  padding: "4px 10px",
  borderRadius: 6,
  fontSize: 11,
  fontWeight: 700,
  background: isSold ? "#f5ede8" : "#eef2ef",
  color: isSold ? "#B2846B" : "#627B68",
});

const typeBadge = (type) => {
  const map = {
    Visit:    { bg: "#eef2ef", color: "#627B68" },
    Rental:   { bg: "#eef2ef", color: "#4C3324" },
    "Pre-Rent": { bg: "#f5ede8", color: "#B2846B" },
    Buy:      { bg: "#eef2ef", color: "#627B68" },
    Rent:     { bg: "#f5ede8", color: "#B2846B" },
  };
  const c = map[type] || map["Visit"];
  return { padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: c.bg, color: c.color };
};

const bookingStatusBadge = (s) => ({
  padding: "4px 10px",
  borderRadius: 6,
  fontSize: 11,
  fontWeight: 700,
  background: s === "Completed" ? "#eef2ef" : s === "Approved" ? "#e8f4ef" : s === "Rejected" ? "#fde8e8" : "#f5ede8",
  color:      s === "Completed" ? "#627B68" : s === "Approved" ? "#2d7a50" : s === "Rejected" ? "#c0392b" : "#B2846B",
});

const loadingContainer = {
  height: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const spinnerWrap = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const spinner = {
  width: 44,
  height: 44,
  border: "4px solid #e8d5c8",
  borderTop: "4px solid #627B68",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const errorBox = {
  textAlign: "center",
  background: "#fff",
  padding: "40px 48px",
  borderRadius: 20,
  border: "1px solid #e8d5c8",
  boxShadow: "0 4px 20px rgba(76,51,36,0.08)",
};
=======
const containerStyle = { padding: "20px 0", display: "flex", flexDirection: "column", gap: "32px" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "flex-end" };
const titleStyle = { margin: 0, fontSize: "28px", fontWeight: "800", color: "#4C3324" };
const subtitleStyle = { margin: "4px 0 0", color: "#627B68", fontSize: "15px" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" };
const statCard = { background: "#fff", padding: "24px", borderRadius: "24px", border: "1px solid #e8d5c8", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 4px 6px -1px rgba(76,51,36,0.05)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default" };
const iconBox = { width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" };
const statInfo = { display: "flex", flexDirection: "column", justifyContent: "center" };
const statVal = { margin: 0, fontSize: "28px", fontWeight: "800", lineHeight: 1, color: "#4C3324" };
const statLbl = { margin: "6px 0 0", fontSize: "14px", fontWeight: "600", color: "#627B68", textTransform: "uppercase", letterSpacing: "0.5px" };
const middleGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" };
const emptyChartState = { textAlign: "center", color: "#819B8B" };
const emptyIcon = { fontSize: "40px", marginBottom: "10px", opacity: 0.5 };
const emptyActivityState = { padding: "40px 0", textAlign: "center", color: "#819B8B", border: "1px dashed #e8d5c8", borderRadius: "16px" };
const chartCard = { background: "#fff", borderRadius: "24px", border: "1px solid #e8d5c8", padding: "24px", boxShadow: "0 4px 6px -1px rgba(76,51,36,0.05)" };
const activityCard = { background: "#fff", borderRadius: "24px", border: "1px solid #e8d5c8", padding: "24px", boxShadow: "0 4px 6px -1px rgba(76,51,36,0.05)" };
const sectionTitle = { margin: "0 0 20px 0", fontSize: "19px", fontWeight: "700", color: "#4C3324", display: "flex", alignItems: "center", gap: "10px" };
const activityList = { display: "flex", flexDirection: "column", gap: "16px" };
const activityItem = { display: "flex", gap: "12px", alignItems: "center", padding: "8px", borderRadius: "12px", transition: "background 0.2s" };
const userInitial = { width: "40px", height: "40px", borderRadius: "12px", background: "#f5f0ec", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#627B68", fontSize: "15px" };
const activityText = { margin: 0, fontSize: "14px", color: "#4C3324", fontWeight: "500" };
const activityTime = { fontSize: "12px", color: "#819B8B" };
const tableWrapper = { background: "#fff", borderRadius: "24px", border: "1px solid #e8d5c8", padding: "24px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(76,51,36,0.05)" };
const tableHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" };
const scrollTable = { width: "100%", overflowX: "auto" };
const mainTable = { width: "100%", borderCollapse: "collapse" };
const propertyCell = { display: "flex", alignItems: "center", gap: "12px", fontWeight: 600, color: "#4C3324" };
const tableImg = { width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover" };
const actionBtn = { padding: "8px 16px", background: "#f5f0ec", border: "1px solid #e8d5c8", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", color: "#627B68", transition: "all 0.2s" };
const btnPrimary = { padding: "12px 24px", background: "#627B68", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 10px rgba(98,123,104,0.25)", transition: "all 0.2s" };
const btnLink = { background: "rgba(98,123,104,0.08)", border: "none", color: "#627B68", padding: "8px 16px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" };
const typeBadge = (type) => {
  const colors = {
    "Visit": { bg: "#eef2ef", text: "#627B68" },
    "Rental": { bg: "#eef2ef", text: "#4C3324" },
    "Pre-Rent": { bg: "#f5ede8", text: "#B2846B" },
    "Buy": { bg: "#eef2ef", text: "#627B68" },
    "Rent": { bg: "#f5ede8", text: "#B2846B" }
  };
  const c = colors[type] || colors["Visit"];
  return { padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: c.bg, color: c.text };
};
const statusBadge = (active) => ({ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: active ? "#eef2ef" : "#f5ede8", color: active ? "#627B68" : "#B2846B" });
const bookingStatusBadge = (s) => ({ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: s === "Completed" ? "#eef2ef" : s === "Pending" ? "#f5ede8" : "#f5f0ec", color: s === "Completed" ? "#627B68" : s === "Pending" ? "#B2846B" : "#819B8B" });
const loadingContainer = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
const errorContainer = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#B2846B" };
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
