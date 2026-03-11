import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { getImageUrl } from "../../../config";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role") || localStorage.getItem("adminRole");
    if (role !== "admin") {
      navigate("/adminlogin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("adminAuthToken");
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div style={loadingContainer}><h2>Loading Analytics...</h2></div>;
  if (error) return <div style={errorContainer}><h2>{error}</h2></div>;

  const stats = [
    { title: "Total Users", value: data.totalUsers ?? 0, icon: "👥", color: "#6366f1" },
    { title: "Total Properties", value: data.totalProperties ?? 0, icon: "🏠", color: "#10b981" },
    { title: "Buy Appointments", value: data.totalBuyAppointments ?? data.totalBuyBookings ?? 0, icon: "🔑", color: "#f59e0b" },
    { title: "Rent Appointments", value: data.totalRentAppointments ?? data.totalRentBookings ?? 0, icon: "📅", color: "#3b82f6" },
    { title: "PreRent Bookings", value: data.totalPreRentAppointments ?? data.totalPreRentBookings ?? 0, icon: "⏳", color: "#8b5cf6" },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>System Overview</h1>
          <p style={subtitleStyle}>Welcome back, Admin. Here's what's happening on PropZo today.</p>
        </div>
        <button style={btnPrimary} onClick={() => window.location.reload()}>Refresh Data</button>
      </header>

      {/* STATS CARDS */}
      <div style={statsGrid}>
        {stats.map((s, i) => (
          <div key={i} style={statCard}>
            <div style={{ ...iconBox, backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
            <div style={statInfo}>
              <h3 style={statVal}>{s.value}</h3>
              <p style={statLbl}>{s.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MIDDLE SECTION: CHARTS & ACTIVITY */}
      <div style={middleGrid}>
        <div style={chartCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Property Distribution</h3>
          </div>
          <div style={{ height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {(data?.pieData || []).some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.pieData || []}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(data?.pieData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={emptyChartState}>
                <div style={emptyIcon}>📊</div>
                <p>No property data yet</p>
              </div>
            )}
          </div>
        </div>

        <div style={activityCard}>
          <h3 style={sectionTitle}>Recent Activity</h3>
          <div style={activityList}>
            {(data?.recentUsers || []).length > 0 ? (
              (data?.recentUsers || []).map((u, i) => (
                <div key={i} style={activityItem}>
                  <div style={userInitial}>{u.name ? u.name.charAt(0) : "U"}</div>
                  <div>
                    <p style={activityText}><strong>{u.name || "A user"}</strong> joined PropZo</p>
                    <span style={activityTime}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Recently"}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={emptyActivityState}>
                <p>No recent signups</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECENT PROPERTIES TABLE */}
      <div style={tableWrapper}>
        <div style={tableHeader}>
          <h3 style={sectionTitle}>Recently Listed Properties</h3>
          <button style={btnLink} onClick={() => navigate("/admin/properties")}>View All</button>
        </div>
        <div style={scrollTable}>
          <table style={mainTable}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentProperties || []).length > 0 ? (
                (data?.recentProperties || []).map((p, i) => (
                  <tr key={i}>
                    <td style={propertyCell}>
                      <img
                        src={getImageUrl(p.image || p.images?.[0])}
                        style={tableImg}
                        alt=""
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=100"; }}
                      />
                      <span>{p.title}</span>
                    </td>
                    <td>{p.address || p.city}</td>
                    <td><span style={typeBadge(p.category)}>{p.category}</span></td>
                    <td style={{ fontWeight: 700 }}>₹{p.price?.toLocaleString()}</td>
                    <td><span style={statusBadge(!p.isSold)}>{p.isSold ? "Sold" : "Active"}</span></td>
                    <td>
                      <button style={actionBtn} onClick={() => navigate("/admin/properties")}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No properties listed yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPOINTMENTS TABLE */}
      <div style={tableWrapper}>
        <div style={tableHeader}>
          <h3 style={sectionTitle}>Latest Appointment Requests</h3>
          <button style={btnLink} onClick={() => navigate("/admin/bookings")}>Manage All</button>
        </div>
        <div style={scrollTable}>
          <table style={mainTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Property</th>
                <th>Schedule</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentBookings || []).length > 0 ? (
                (data?.recentBookings || []).map((b, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.user?.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{b.user?.email || "N/A"}</div>
                    </td>
                    <td>{b.property?.title || "Deleted Property"}</td>
                    <td>
                      <div>{b.proposedDate}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{b.proposedTime}</div>
                    </td>
                    <td><span style={typeBadge(b.type)}>{b.type}</span></td>
                    <td><span style={bookingStatusBadge(b.status)}>{b.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No appointment requests yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { padding: "20px 0", display: "flex", flexDirection: "column", gap: "32px" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "flex-end" };
const titleStyle = { margin: 0, fontSize: "28px", fontWeight: "800", color: "#0f172a" };
const subtitleStyle = { margin: "4px 0 0", color: "#64748b", fontSize: "15px" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" };
const statCard = { background: "#fff", padding: "24px", borderRadius: "24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default" };
const iconBox = { width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" };
const statInfo = { display: "flex", flexDirection: "column", justifyContent: "center" };
const statVal = { margin: 0, fontSize: "28px", fontWeight: "800", lineHeight: 1, color: "#0f172a" };
const statLbl = { margin: "6px 0 0", fontSize: "14px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" };
const middleGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" };
const emptyChartState = { textAlign: "center", color: "#94a3b8" };
const emptyIcon = { fontSize: "40px", marginBottom: "10px", opacity: 0.5 };
const emptyActivityState = { padding: "40px 0", textAlign: "center", color: "#94a3b8", border: "1px dashed #e2e8f0", borderRadius: "16px" };
const chartCard = { background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
const activityCard = { background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
const sectionTitle = { margin: "0 0 20px 0", fontSize: "19px", fontWeight: "700", color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" };
const activityList = { display: "flex", flexDirection: "column", gap: "16px" };
const activityItem = { display: "flex", gap: "12px", alignItems: "center", padding: "8px", borderRadius: "12px", transition: "background 0.2s" };
const userInitial = { width: "40px", height: "40px", borderRadius: "12px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#6366f1", fontSize: "15px" };
const activityText = { margin: 0, fontSize: "14px", color: "#334155", fontWeight: "500" };
const activityTime = { fontSize: "12px", color: "#94a3b8" };
const tableWrapper = { background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "24px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
const tableHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" };
const scrollTable = { width: "100%", overflowX: "auto" };
const mainTable = { width: "100%", borderCollapse: "collapse" };
const propertyCell = { display: "flex", alignItems: "center", gap: "12px", fontWeight: 600, color: "#1e293b" };
const tableImg = { width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover" };
const actionBtn = { padding: "8px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", color: "#475569", transition: "all 0.2s" };
const btnPrimary = { padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)", transition: "all 0.2s" };
const btnLink = { background: "rgba(99, 102, 241, 0.08)", border: "none", color: "#6366f1", padding: "8px 16px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" };
const typeBadge = (type) => {
  const colors = {
    "Visit": { bg: "#e0f2fe", text: "#0369a1" },
    "Rental": { bg: "#f0fdf4", text: "#166534" },
    "Pre-Rent": { bg: "#faf5ff", text: "#6b21a8" },
    "Buy": { bg: "#e0f2fe", text: "#0369a1" },
    "Rent": { bg: "#fef3c7", text: "#92400e" }
  };
  const c = colors[type] || colors["Visit"];
  return { padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: c.bg, color: c.text };
};
const statusBadge = (active) => ({ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: active ? "#dcfce7" : "#fef2f2", color: active ? "#166534" : "#991b1b" });
const bookingStatusBadge = (s) => ({ padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", backgroundColor: s === "Completed" ? "#dcfce7" : s === "Pending" ? "#fffbeb" : "#f1f5f9", color: s === "Completed" ? "#166534" : s === "Pending" ? "#92400e" : "#475569" });
const loadingContainer = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
const errorContainer = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" };
