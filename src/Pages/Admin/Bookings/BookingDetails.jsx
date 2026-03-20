import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Failed fetching booking details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5ede6", fontFamily: "'DM Sans', sans-serif", color: "#B2846B", fontSize: 18, fontWeight: 600 }}>
      Loading Booking Details...
    </div>
  );

  if (!booking) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5ede6", fontFamily: "'DM Sans', sans-serif", gap: 16 }}>
      <h2 style={{ color: "#4C3324", fontFamily: "'Sora', sans-serif" }}>Booking Not Found</h2>
      <Link to="/admin/bookings" style={{ color: "#627B68", fontWeight: 600, textDecoration: "none" }}>← Return to List</Link>
    </div>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed": return { bg: "#dde8e0", color: "#3a5c42" };
      case "Pending":   return { bg: "#f0e8de", color: "#7a4f2e" };
      default:          return { bg: "#e8ddd5", color: "#4C3324" };
    }
  };

  const statusStyle = getStatusStyle(booking.status || "Appointment");

  return (
    <>
<<<<<<< HEAD
      <style>{`
        @media print {
          /* Hide everything by default */
          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Show only the printable container */
          .printable-content, .printable-content * {
            visibility: visible;
          }
          /* Position the printable content */
          .printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
            background-color: white !important;
          }
          /* Hide non-printable elements inside the container */
          .no-print {
            display: none !important;
          }
          /* Professional adjustments */
          .print-card {
            box-shadow: none !important;
            border: 1px solid #e2e8f0 !important;
            break-inside: avoid;
            margin-bottom: 20px !important;
          }
          body {
            background-color: white !important;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
      <div style={styles.container} className="printable-content">
        {/* Header with Back Button */}
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backButton} className="no-print">
            ← Back
          </button>
          <h1 style={styles.title}>Appointment Details</h1>
          <div style={{ ...styles.badge, backgroundColor: getStatusColor(booking.status || "Appointment") + "20", color: getStatusColor(booking.status || "Appointment") }}>
            ● {booking.status || "Appointment"}
          </div>
        </div>

        <div style={styles.contentGrid}>
          {/* Left Side: Customer Info */}
          <div style={styles.card} className="print-card">
            <h3 style={styles.cardTitle}>Client Information</h3>
            <div style={styles.infoRow}>
              <span style={styles.label}>Full Name</span>
              <span style={styles.value}>{booking.name || "N/A"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Email Address</span>
              <span style={styles.value}>{booking.email || "N/A"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Phone Number</span>
              <span style={styles.value}>{booking.phone || "N/A"}</span>
            </div>
            {booking.message && (
              <div style={{ ...styles.infoRow, flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                <span style={styles.label}>Message / Inquiry</span>
                <p style={{ margin: 0, fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>{booking.message}</p>
              </div>
            )}
          </div>

          {/* Right Side: Appointment Info */}
          <div style={styles.card} className="print-card">
            <h3 style={styles.cardTitle}>Appointment Request</h3>
            <div style={styles.infoRow}>
              <span style={styles.label}>Property ID</span>
              <span style={styles.value} title={booking.propertyId?._id || booking.propertyId}>
                {booking.propertyId && booking.propertyId.title
                  ? booking.propertyId.title
                  : String(booking.propertyId || "N/A").slice(-6)}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Requested Visit Date</span>
              <span style={styles.value}>{booking.visitDate ? new Date(booking.visitDate).toLocaleDateString() : "N/A"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Requested Time</span>
              <span style={styles.value}>{booking.visitTime || "N/A"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Number of Visitors</span>
              <span style={styles.value}>{booking.visitors || 1}</span>
            </div>

            <hr style={styles.divider} />

            <h3 style={{ ...styles.cardTitle, marginTop: "10px" }}>Additional Options</h3>
            <div style={styles.infoRow}>
              <span style={styles.label}>Virtual Tour Requested</span>
              <span style={styles.value}>{booking.virtualTour ? "✅ Yes" : "❌ No"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Agent Call Requested</span>
              <span style={styles.value}>{booking.agentCall ? "✅ Yes" : "❌ No"}</span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div style={styles.footer} className="no-print">
          <button style={styles.printButton} onClick={() => window.print()}>Print Form</button>
        </div>
      </div>
    </>
=======
      <style>{globalStyles}</style>
      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper}>
          {/* Page Header */}
          <div style={s.pageHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => navigate(-1)} style={s.backBtn}>← Back</button>
              <div>
                <p style={s.breadcrumb}>Admin / Bookings / Details</p>
                <h1 style={s.pageTitle}>Appointment Details</h1>
              </div>
            </div>
            <span style={{ ...s.badge, background: statusStyle.bg, color: statusStyle.color }}>
              ● {booking.status || "Appointment"}
            </span>
          </div>

          {/* Cards Grid */}
          <div style={s.contentGrid}>
            {/* Client Info */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardIcon}>👤</span>
                <h3 style={s.cardTitle}>Client Information</h3>
              </div>
              <div style={s.cardBody}>
                <InfoRow label="Full Name" value={booking.name || "N/A"} />
                <InfoRow label="Email Address" value={booking.email || "N/A"} />
                <InfoRow label="Phone Number" value={booking.phone || "N/A"} />
                {booking.message && (
                  <div style={{ marginTop: 4 }}>
                    <span style={s.infoLabel}>Message / Inquiry</span>
                    <p style={{ margin: "8px 0 0", fontSize: 14, color: "#5a3e30", lineHeight: 1.6, background: "#faf6f3", padding: "12px 14px", borderRadius: 10 }}>
                      {booking.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Info */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardIcon}>📅</span>
                <h3 style={s.cardTitle}>Appointment Request</h3>
              </div>
              <div style={s.cardBody}>
                <InfoRow
                  label="Property"
                  value={
                    booking.propertyId?.title
                      ? booking.propertyId.title.slice(0, 28) + (booking.propertyId.title.length > 28 ? "..." : "")
                      : String(booking.propertyId || "N/A").slice(-6)
                  }
                />
                <InfoRow label="Visit Date" value={booking.visitDate ? new Date(booking.visitDate).toLocaleDateString() : "N/A"} />
                <InfoRow label="Requested Time" value={booking.visitTime || "N/A"} />
                <InfoRow label="Number of Visitors" value={booking.visitors || 1} />

                <hr style={s.divider} />

                <div style={{ ...s.cardHeader, padding: "0 0 14px", borderBottom: "none", marginBottom: 4 }}>
                  <span style={s.cardIcon}>⚙️</span>
                  <h3 style={s.cardTitle}>Additional Options</h3>
                </div>
                <InfoRow label="Virtual Tour" value={booking.virtualTour ? "✅ Requested" : "❌ Not Requested"} />
                <InfoRow label="Agent Call" value={booking.agentCall ? "✅ Requested" : "❌ Not Requested"} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={s.footer}>
            <button style={s.printBtn} onClick={() => window.print()}>🖨 Print Form</button>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={s.infoRow}>
      <span style={s.infoLabel}>{label}</span>
      <span style={s.infoValue}>{value}</span>
    </div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  );
}

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
    padding: "48px 52px",
    maxWidth: 1100,
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 16,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "0 0 4px",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  backBtn: {
    background: "#fff",
    border: "1.5px solid #d9c8bb",
    padding: "9px 18px",
    borderRadius: 9,
    cursor: "pointer",
    fontWeight: 500,
    color: "#7a5c4a",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
  },
  badge: {
    padding: "7px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e8ddd5",
    boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 24px",
    borderBottom: "1px solid #e8ddd5",
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
  },
  cardIcon: { fontSize: 18 },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#627B68",
    margin: 0,
    fontFamily: "'Sora', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  cardBody: {
    padding: "22px 24px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },
  infoLabel: {
    color: "#7a5c4a",
    fontSize: 14,
    flexShrink: 0,
  },
  infoValue: {
    color: "#4C3324",
    fontWeight: 600,
    fontSize: 14,
    textAlign: "right",
  },
  divider: {
    border: 0,
    borderTop: "1px solid #e8ddd5",
    margin: "20px 0",
  },
  footer: {
    marginTop: 32,
    display: "flex",
    justifyContent: "flex-end",
  },
  printBtn: {
    background: "#4C3324",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(76,51,36,0.25)",
    transition: "all 0.2s",
  },
};
