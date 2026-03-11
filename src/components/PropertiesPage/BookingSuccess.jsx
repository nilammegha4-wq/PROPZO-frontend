import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Check if the verify flow pushed state
    if (location.state && location.state.booking) {
      setBooking(location.state.booking);
    } else {
      // Fallback to local storage 
      const saved = localStorage.getItem("bookingData");
      if (saved) {
        setBooking(JSON.parse(saved));
      }
    }
  }, [location.state]);

  const downloadPDF = async () => {
    const input = document.getElementById("booking-details");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Booking_Details.pdf");
  };

  if (!booking) return <div style={styles.noBooking}>No Booking Found<br /><button onClick={() => navigate('/')} style={{ ...styles.button, width: '200px' }}>Home</button></div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div id="booking-details">
          <h1 style={styles.title}>Booking Confirmed ✅</h1>
          {location.state?.emailSent ? (
            <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
              An email receipt has been sent to your registered address!
            </p>
          ) : (
            <p style={{ textAlign: "center", color: "#f97316", marginBottom: "20px", fontWeight: "500" }}>
              Booking confirmed, but email receipt failed to send. Please download the PDF below.
            </p>
          )}

          <div style={styles.section}>
            <p><strong>Booking ID:</strong> {booking.bookingId || booking._id}</p>
            <p><strong>Date:</strong> {new Date(booking.bookingDate || booking.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            {booking.amount && <p style={{ marginTop: "5px", fontSize: "16px" }}><strong>Total Paid:</strong> <span style={{ color: "#16a34a" }}>₹{booking.amount.toLocaleString('en-IN')}</span></p>}
          </div>

          <hr style={styles.hr} />

          <div style={styles.section}>
            {/* If object is directly populated vs passed strictly as strings */}
            <h2 style={styles.subTitle}>Property Details</h2>
            <p><strong>Title:</strong> {booking.property?.title || location.state?.property?.title || "N/A"}</p>
            <p><strong>Location:</strong> {booking.property?.location || location.state?.property?.location || "N/A"}</p>
          </div>

          <hr style={styles.hr} />

          <div style={styles.section}>
            <h2 style={styles.subTitle}>Buyer Details</h2>
            <p><strong>Name:</strong> {booking.buyer?.fullName || "N/A"}</p>
            <p><strong>Email:</strong> {booking.buyer?.email || "N/A"}</p>
            <p><strong>Phone:</strong> {booking.buyer?.phone || "N/A"}</p>
          </div>
        </div>

        <button onClick={downloadPDF} style={styles.button}>
          Download PDF
        </button>
        <button onClick={() => navigate('/properties')} style={{ ...styles.button, backgroundColor: "#333", marginTop: "10px" }}>
          Back to Properties
        </button>
      </div>
    </div>
  );
}

/* ======= STYLES ======= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e6f9f0, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: "5px",
    textAlign: "center",
  },
  subTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#333",
  },
  section: {
    marginBottom: "20px",
    color: "#555",
    fontSize: "15px",
  },
  hr: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #eee",
  },
  button: {
    marginTop: "15px",
    width: "100%",
    padding: "16px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  noBooking: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "20px",
    color: "red",
  },
};