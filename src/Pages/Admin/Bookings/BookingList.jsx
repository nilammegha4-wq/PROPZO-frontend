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

  // Fetch bookings from backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

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
    }
  };

  // Filter bookings based on search query
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
        @media (max-width: 991px) {
          .bl-container { padding: 30px 20px !important; }
        }
        @media (max-width: 768px) {
          .bl-title { font-size: 24px !important; }
        }
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
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "40px 60px",
    backgroundColor: "#F3F4F6",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
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
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    textAlign: "left",
  },
  th: {
    backgroundColor: "#FAFBFC",
    padding: "16px 20px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#4B5563",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #E5E7EB",
  },
  tr: {
    transition: "all 0.2s ease",
  },
  td: {
    padding: "20px 20px",
    fontSize: "14px",
    color: "#111827",
    verticalAlign: "middle",
    borderBottom: "1px solid #F3F4F6",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
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
  },
};
