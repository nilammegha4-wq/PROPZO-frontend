import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── EARTHY COLOR PALETTE (matching AddProperty) ────────────────────────────
// #E4CBB6 — blush
// #B2846B — terracotta (accent, focus)
// #819B8B — sage
// #627B68 — forest green (primary button, section title)
// #4C3324 — dark brown (page title, text)
// ─────────────────────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

  * { box-sizing: border-box; }
`;

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
  wrapper: {
    flex: 1,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "48px 40px",
    width: "100%",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 12,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
    margin: 0,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  refreshBtn: {
    padding: "9px 20px",
    borderRadius: 9,
    border: "1.5px solid #d9c8bb",
    background: "#fff",
    color: "#7a5c4a",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    transition: "all 0.18s",
  },
  card: {
    background: "#ffffff",
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
  thead: {
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
    borderBottom: "1.5px solid #e8ddd5",
  },
  th: {
    padding: "15px 22px",
    fontSize: 12,
    fontWeight: 600,
    color: "#627B68",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Sora', sans-serif",
  },
  tr: {
    borderBottom: "1px solid #f5ede6",
  },
  td: {
    padding: "16px 22px",
    verticalAlign: "top",
  },
  nameText: {
    fontWeight: 600,
    color: "#4C3324",
    fontSize: "0.95rem",
    fontFamily: "'Sora', sans-serif",
  },
  subText: {
    fontSize: "0.82rem",
    color: "#819B8B",
    marginTop: 3,
  },
  packageBadge: {
    padding: "4px 14px",
    backgroundColor: "#E4CBB6",
    color: "#4C3324",
    borderRadius: 50,
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    display: "inline-block",
    fontFamily: "'DM Sans', sans-serif",
  },
  messageText: {
    color: "#627B68",
    fontSize: "0.88rem",
    maxWidth: 240,
    lineHeight: 1.5,
  },
  noMessage: {
    color: "#c9b5a4",
    fontStyle: "italic",
    fontSize: "0.88rem",
  },
  statusBadge: (status) => ({
    padding: "4px 14px",
    borderRadius: 50,
    fontSize: "0.82rem",
    fontWeight: 700,
    display: "inline-block",
    fontFamily: "'DM Sans', sans-serif",
    backgroundColor:
      status === "Approved" ? "#d4e6da"
      : status === "Rejected" ? "#f5ddd7"
      : "#ede8d8",
    color:
      status === "Approved" ? "#627B68"
      : status === "Rejected" ? "#8b3a25"
      : "#7a6435",
  }),
  approveBtn: {
    padding: "8px 18px",
    background: "#627B68",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.83rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 3px 10px rgba(98,123,104,0.3)",
    transition: "all 0.18s",
  },
  rejectBtn: {
    padding: "8px 18px",
    background: "#fff",
    color: "#8b3a25",
    border: "1.5px solid #ddd0c6",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "0.83rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  processed: {
    fontSize: "0.83rem",
    color: "#b2a090",
    fontStyle: "italic",
    fontFamily: "'DM Sans', sans-serif",
  },
  loading: {
    padding: "60px",
    textAlign: "center",
    color: "#819B8B",
    fontSize: "1rem",
    letterSpacing: "0.06em",
    fontFamily: "'DM Sans', sans-serif",
  },
  emptyCell: {
    padding: "50px",
    textAlign: "center",
    color: "#b2a090",
    fontSize: "0.95rem",
    fontStyle: "italic",
    fontFamily: "'DM Sans', sans-serif",
  },
};

const PackageBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/package-bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching package bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this request? An email will be sent to the user.")) return;
    setActionLoading(id);
    try {
      const response = await axios.patch(`http://localhost:5000/api/package-bookings/approve/${id}`);
      if (response.data.success) {
        toast.success("Booking approved and email sent!");
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to approve booking");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;
    setActionLoading(id);
    try {
      const response = await axios.patch(`http://localhost:5000/api/package-bookings/reject/${id}`);
      if (response.data.success) {
        toast.info("Booking rejected");
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to reject booking");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div style={s.loading}>Loading bookings...</div>;
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper}>
          {/* Page Header */}
          <div style={s.pageHeader}>
            <div>
              <p style={s.breadcrumb}>Admin / Bookings</p>
              <h1 style={s.pageTitle}>Package Booking Requests</h1>
            </div>
            <button onClick={fetchBookings} style={s.refreshBtn}>
              ↻ Refresh
            </button>
          </div>

          {/* Table Card */}
          <div style={s.card}>
            <table style={s.table}>
              <thead style={s.thead}>
                <tr>
                  <th style={s.th}>User Details</th>
                  <th style={s.th}>Package</th>
                  <th style={s.th}>Message</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={s.emptyCell}>No booking requests found.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} style={s.tr}>
                      <td style={s.td}>
                        <div style={s.nameText}>{booking.name}</div>
                        <div style={s.subText}>{booking.email}</div>
                        <div style={s.subText}>{booking.phone}</div>
                      </td>
                      <td style={s.td}>
                        <span style={s.packageBadge}>{booking.packageName}</span>
                      </td>
                      <td style={s.td}>
                        {booking.message
                          ? <span style={s.messageText}>{booking.message}</span>
                          : <em style={s.noMessage}>No message</em>}
                      </td>
                      <td style={s.td}>
                        <span style={s.statusBadge(booking.status)}>{booking.status}</span>
                      </td>
                      <td style={s.td}>
                        {booking.status === "Pending" ? (
                          <div style={{ display: "flex", gap: 10 }}>
                            <button
                              onClick={() => handleApprove(booking._id)}
                              disabled={actionLoading === booking._id}
                              style={s.approveBtn}
                            >
                              {actionLoading === booking._id ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => handleReject(booking._id)}
                              disabled={actionLoading === booking._id}
                              style={s.rejectBtn}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span style={s.processed}>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default PackageBookingList;
