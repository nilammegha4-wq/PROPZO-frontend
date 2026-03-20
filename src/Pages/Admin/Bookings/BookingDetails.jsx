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

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading Booking Details...</div>;
  }

  if (!booking) {
    return (
      <div style={styles.errorContainer}>
        <h2>Booking Not Found</h2>
        <Link to="/admin/bookings" style={styles.backLink}>Return to List</Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "#059669";
      case "Pending": return "#d97706";
      default: return "#2563eb"; // Blue for default Appointment
    }
  };

  return (
    <>
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
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  backButton: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#64748b",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f1f5f9",
  },
  cardTitle: {
    margin: "0 0 20px 0",
    fontSize: "14px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  label: {
    color: "#64748b",
    fontSize: "15px",
  },
  value: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: "15px",
  },
  divider: {
    border: "0",
    borderTop: "1px solid #f1f5f9",
    margin: "20px 0",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1e293b",
  },
  totalValue: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#4f46e5",
  },
  footer: {
    marginTop: "30px",
    textAlign: "right",
  },
  printButton: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
  errorContainer: {
    textAlign: "center",
    paddingTop: "100px",
  },
  backLink: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "600",
  }
};