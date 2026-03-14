import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((res) => res.json())
      .then((data) => { setBookings(data); setLoading(false); })
      .catch((err) => { console.error("Error fetching bookings:", err); setLoading(false); });
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":  return { bg: "#dde8e0", text: "#3a5c42" };
      case "Pending":    return { bg: "#f0e8de", text: "#7a4f2e" };
      case "Cancelled":  return { bg: "#f9ede8", text: "#b85c3a" };
      default:           return { bg: "#e8ddd5", text: "#4C3324" };
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      b.buyer?.fullName?.toLowerCase().includes(query) ||
      b.property?.title?.toLowerCase().includes(query) ||
      b._id?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <style>{`
<<<<<<< HEAD
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .bl-row:hover { background: #faf6f3 !important; }
        .bl-view-btn:hover { color: #4C3324 !important; }
=======
>>>>>>> e85f1ae (nilam2)
        @media (max-width: 991px) {
          .bl-container { padding: 30px 20px !important; }
        }
        @media (max-width: 768px) {
          .bl-title { font-size: 24px !important; }
        }
      `}</style>
<<<<<<< HEAD

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
=======
      <div style={styles.container} className="bl-container">
        <div style={styles.header} className="bl-header">
          <h1 style={styles.title} className="bl-title">Bookings</h1>
          <p style={styles.subtitle}>
            Monitor and manage all client property reservations.
          </p>
        </div>

        <div style={styles.card} className="bl-card">
          {loading ? (
            <p style={{ padding: "20px" }}>Loading bookings...</p>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }} className="bl-table-wrap">
              <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>USER</th>
                <th style={styles.th}>PROPERTY</th>
                <th style={styles.th}>DATE</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>AMOUNT</th>
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
                        <span style={styles.userName}>
                          {b.name || "Unknown"}
                          <br />
                          <small style={{ color: "#6B7280", fontWeight: "normal" }}>
                            {b.phone || ""}
                          </small>
                        </span>
                      </div>
                    </td>

                    <td style={styles.td}>
                      {b.propertyId?.title || "N/A"}
                    </td>

                    <td style={{ ...styles.td, color: "#6B7280" }}>
                      {b.visitDate} <br /> {b.visitTime}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: statusTheme.bg,
                          color: statusTheme.text,
                        }}
                      >
                        {b.status || "Pending"}
                      </span>
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        color: "#111827",
                        maxWidth: "150px",
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
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                    No bookings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
            </div>
          )}
>>>>>>> e85f1ae (nilam2)
        </div>
      </div>
    </>
  );
}

const s = {
  page: {
    display: "flex",
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
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
    padding: "16px 24px",
    fontSize: 12,
    fontWeight: 700,
    color: "#7a5c4a",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e8ddd5",
    fontFamily: "'DM Sans', sans-serif",
  },
  tr: {
    borderBottom: "1px solid #f0e8e0",
    transition: "background 0.18s",
  },
  td: {
    padding: "16px 24px",
    fontSize: 14,
    color: "#4C3324",
    verticalAlign: "middle",
    fontFamily: "'DM Sans', sans-serif",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
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
  },
};
