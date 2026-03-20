import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { getImageUrl } from "../../../config";

const BASE_URL = "http://localhost:5000";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetch(`${BASE_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => { setBookings(data); setLoading(false); })
      .catch((err) => { console.error("Error fetching bookings:", err); setLoading(false); });
  }, []);

<<<<<<< HEAD
  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-GB', options);
    } catch (e) {
      return dateStr;
    }
  };

  // Status colors
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "confirmed":
        return { bg: "#ECFDF5", text: "#059669", border: "#D1FAE5" };
      case "pending":
        return { bg: "#FFFBEB", text: "#D97706", border: "#FEF3C7" };
      case "cancelled":
        return { bg: "#FEF2F2", text: "#DC2626", border: "#FEE2E2" };
      default:
        return { bg: "#F9FAFB", text: "#6B7280", border: "#F3F4F6" };
=======
  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":  return { bg: "#dde8e0", text: "#3a5c42" };
      case "Pending":    return { bg: "#f0e8de", text: "#7a4f2e" };
      case "Cancelled":  return { bg: "#f9ede8", text: "#b85c3a" };
      default:           return { bg: "#e8ddd5", text: "#4C3324" };
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      b.name?.toLowerCase().includes(query) ||
      b.propertyId?.title?.toLowerCase().includes(query) ||
      b._id?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <style>{`
<<<<<<< HEAD
=======
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .bl-row:hover { background: #faf6f3 !important; }
        .bl-view-btn:hover { color: #4C3324 !important; }
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        @media (max-width: 991px) {
          .bl-container { padding: 30px 20px !important; }
        }
        @media (max-width: 768px) {
          .bl-title { font-size: 24px !important; }
        }
<<<<<<< HEAD
        .bl-view-btn:hover {
          background-color: #EEF2FF !important;
          border-color: #C7D2FE !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <div style={styles.container} className="bl-container">
        <div style={styles.header} className="bl-header">
          <h1 style={styles.title} className="bl-title">Bookings</h1>
          <p style={styles.subtitle}>
            Monitor and manage all client property reservations with ease.
          </p>
        </div>

        <div style={styles.card} className="bl-card">
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
              Loading bookings...
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }} className="bl-table-wrap">
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>USER</th>
                    <th style={styles.th}>PROPERTY</th>
                    <th style={styles.th}>DATE & TIME</th>
                    <th style={styles.th}>STATUS</th>
                    <th style={styles.th}>REMARKS</th>
                    <th style={{ ...styles.th, textAlign: "right" }}>
                      ACTION
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((b) => {
                    const statusTheme = getStatusStyle(b.status || "Pending");

                    return (
                      <tr key={b._id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.userCell}>
                            <div style={styles.avatar}>
                              {b.name?.charAt(0) || "U"}
                            </div>
                            <div style={styles.userName}>
                              <div style={{ fontWeight: "700", color: "#111827" }}>{b.name || "Unknown"}</div>
                              <div style={{ color: "#6B7280", fontWeight: "400", fontSize: "12px" }}>
                                {b.phone || "No Phone"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <div style={styles.propCell}>
                            <div style={styles.propImageWrap}>
                              {(b.propertyId?.images && b.propertyId.images.length > 0) ? (
                                <img
                                  src={getImageUrl(b.propertyId.images[0])}
                                  alt=""
                                  style={styles.propImage}
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=No+Img'; }}
                                />
                              ) : (
                                <FaHome style={{ color: "#94a3b8" }} />
                              )}
                            </div>
                            <span style={styles.propTitle}>
                              {b.propertyId?.title || "N/A"}
                            </span>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px", whiteSpace: "nowrap" }}>
                            <span style={{ fontWeight: "600", color: "#111827" }}>{formatDate(b.visitDate)}</span>
                            <span style={{ color: "#6B7280", fontSize: "12px" }}>{b.visitTime}</span>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.badge,
                              backgroundColor: statusTheme.bg,
                              color: statusTheme.text,
                              border: `1px solid ${statusTheme.border}`
                            }}
                          >
                            {b.status || "Pending"}
                          </span>
                        </td>

                        <td
                          style={{
                            ...styles.td,
                            color: "#4B5563",
                            maxWidth: "180px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                          title={b.message}
                        >
                          {b.message || "-"}
                        </td>

                        <td style={{ ...styles.td, textAlign: "right" }}>
                          <Link
                            to={`/admin/bookings/${b._id}`}
                            style={styles.viewBtn}
                            className="bl-view-btn"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ padding: "60px", textAlign: "center", color: "#94A3B8" }}>
                        <div style={{ fontSize: "16px", fontWeight: "600" }}>No bookings found</div>
                        <div style={{ fontSize: "14px", marginTop: "4px" }}>Try adjusting your search query</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
=======
      `}</style>
      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.container} className="bl-container">
          {/* Header */}
          <div style={s.header}>
            <p style={s.breadcrumb}>Admin / Bookings</p>
            <h1 style={s.title} className="bl-title">Bookings</h1>
            <p style={s.subtitle}>Monitor and manage all client property reservations.</p>
          </div>

          {/* Table Card */}
          <div style={s.card}>
            {loading ? (
              <p style={{ padding: 28, color: "#B2846B", fontWeight: 500 }}>Loading bookings...</p>
            ) : (
              <div style={{ width: "100%", overflowX: "auto" }} className="bl-table-wrap">
                <table style={s.table}>
                  <thead>
                    <tr>
                      {["User", "Property", "Date", "Status", "Message", "Action"].map((h, i) => (
                        <th key={h} style={{ ...s.th, textAlign: i === 5 ? "right" : "left" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => {
                      const statusTheme = getStatusStyle(b.status || "Pending");
                      return (
                        <tr key={b._id} style={s.tr} className="bl-row">
                          <td style={s.td}>
                            <div style={s.userCell}>
                              <div style={s.avatar}>{b.name?.charAt(0) || "U"}</div>
                              <span style={s.userName}>
                                {b.name || "Unknown"}
                                <br />
                                <small style={{ color: "#7a5c4a", fontWeight: 400 }}>{b.phone || ""}</small>
                              </span>
                            </div>
                          </td>
                          <td style={s.td}>{b.propertyId?.title || "N/A"}</td>
                          <td style={{ ...s.td, color: "#7a5c4a" }}>
                            {b.visitDate}<br />{b.visitTime}
                          </td>
                          <td style={s.td}>
                            <span style={{ ...s.badge, background: statusTheme.bg, color: statusTheme.text }}>
                              {b.status || "Pending"}
                            </span>
                          </td>
                          <td style={{ ...s.td, maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={b.message}>
                            {b.message || "-"}
                          </td>
                          <td style={{ ...s.td, textAlign: "right" }}>
                            <Link to={`/admin/bookings/${b._id}`} style={s.viewBtn} className="bl-view-btn">
                              View Details →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: "60px", textAlign: "center", color: "#a89385", fontSize: 15 }}>
                          No bookings found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        </div>
      </div>
    </>
  );
}

<<<<<<< HEAD
/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "40px 60px",
    backgroundColor: "#F3F4F6",
=======
const s = {
  page: {
    display: "flex",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
    fontFamily: "'DM Sans', sans-serif",
  },
  accentBar: {
    width: 5,
    background: "linear-gradient(180deg, #4C3324 0%, #B2846B 100%)",
    flexShrink: 0,
  },
  container: {
    flex: 1,
    padding: "48px 52px",
    maxWidth: 1300,
  },
  header: {
    marginBottom: 32,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "0 0 6px",
  },
  title: {
<<<<<<< HEAD
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.025em",
  },
  subtitle: {
    fontSize: "16px",
    color: "#4B5563",
    marginTop: "8px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #E5E7EB",
=======
    fontSize: 34,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 15,
    color: "#7a5c4a",
    margin: 0,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e8ddd5",
    boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    textAlign: "left",
  },
  th: {
<<<<<<< HEAD
    backgroundColor: "#FAFBFC",
    padding: "16px 20px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#4B5563",
=======
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
    padding: "16px 24px",
    fontSize: 12,
    fontWeight: 700,
    color: "#7a5c4a",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e8ddd5",
    fontFamily: "'DM Sans', sans-serif",
  },
  tr: {
<<<<<<< HEAD
    transition: "all 0.2s ease",
  },
  td: {
    padding: "20px 20px",
    fontSize: "14px",
    color: "#111827",
    verticalAlign: "middle",
    borderBottom: "1px solid #F3F4F6",
=======
    borderBottom: "1px solid #f0e8e0",
    transition: "background 0.18s",
  },
  td: {
    padding: "16px 24px",
    fontSize: 14,
    color: "#4C3324",
    verticalAlign: "middle",
    fontFamily: "'DM Sans', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  userCell: {
    display: "flex",
    alignItems: "center",
<<<<<<< HEAD
    gap: "14px",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    backgroundColor: "#F3F4F6",
    color: "#4F46E5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: "800",
    border: "2px solid #FFFFFF",
    boxShadow: "0 0 0 1px #E5E7EB",
  },
  userName: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  propCell: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  propImageWrap: {
    width: "54px",
    height: "54px",
    borderRadius: "14px",
    backgroundColor: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    border: "1px solid #E5E7EB",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  propImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  propTitle: {
    fontWeight: "600",
    color: "#1F2937",
    fontSize: "14px",
    lineHeight: "1.4",
    maxWidth: "200px",
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block",
    textTransform: "capitalize",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  viewBtn: {
    textDecoration: "none",
    color: "#4F46E5",
    fontWeight: "700",
    fontSize: "13px",
    padding: "10px 18px",
    borderRadius: "10px",
    backgroundColor: "#F5F3FF",
    border: "1px solid #E0E7FF",
    display: "inline-block",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease-in-out",
=======
    gap: 12,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#e8ddd5",
    color: "#4C3324",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
    fontFamily: "'Sora', sans-serif",
  },
  userName: {
    fontWeight: 600,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
  },
  badge: {
    padding: "4px 12px",
    borderRadius: 99,
    fontSize: 12,
    fontWeight: 600,
    display: "inline-block",
    letterSpacing: "0.02em",
  },
  viewBtn: {
    textDecoration: "none",
    color: "#627B68",
    fontWeight: 600,
    fontSize: 13,
    transition: "color 0.18s",
    fontFamily: "'DM Sans', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
};
