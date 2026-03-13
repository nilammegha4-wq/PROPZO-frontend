// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export default function BookingSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);

//   useEffect(() => {
//     // Check if the verify flow pushed state
//     if (location.state && location.state.booking) {
//       setBooking(location.state.booking);
//     } else {
//       // Fallback to local storage 
//       const saved = localStorage.getItem("bookingData");
//       if (saved) {
//         setBooking(JSON.parse(saved));
//       }
//     }
//   }, [location.state]);

//   const downloadPDF = async () => {
//     const input = document.getElementById("booking-details");
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const width = pdf.internal.pageSize.getWidth();
//     const height = (canvas.height * width) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, width, height);
//     pdf.save("Booking_Details.pdf");
//   };

//   if (!booking) return <div style={styles.noBooking}>No Booking Found<br /><button onClick={() => navigate('/')} style={{ ...styles.button, width: '200px' }}>Home</button></div>;

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <div id="booking-details">
//           <h1 style={styles.title}>Booking Confirmed ✅</h1>
//           {location.state?.emailSent ? (
//             <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
//               An email receipt has been sent to your registered address!
//             </p>
//           ) : (
//             <p style={{ textAlign: "center", color: "#f97316", marginBottom: "20px", fontWeight: "500" }}>
//               Booking confirmed, but email receipt failed to send. Please download the PDF below.
//             </p>
//           )}

//           <div style={styles.section}>
//             <p><strong>Booking ID:</strong> {booking.bookingId || booking._id}</p>
//             <p><strong>Date:</strong> {new Date(booking.bookingDate || booking.createdAt).toLocaleString()}</p>
//             <p><strong>Status:</strong> {booking.status}</p>
//             {booking.amount && <p style={{ marginTop: "5px", fontSize: "16px" }}><strong>Total Paid:</strong> <span style={{ color: "#16a34a" }}>₹{booking.amount.toLocaleString('en-IN')}</span></p>}
//           </div>

//           <hr style={styles.hr} />

//           <div style={styles.section}>
//             {/* If object is directly populated vs passed strictly as strings */}
//             <h2 style={styles.subTitle}>Property Details</h2>
//             <p><strong>Title:</strong> {booking.property?.title || location.state?.property?.title || "N/A"}</p>
//             <p><strong>Location:</strong> {booking.property?.location || location.state?.property?.location || "N/A"}</p>
//           </div>

//           <hr style={styles.hr} />

//           <div style={styles.section}>
//             <h2 style={styles.subTitle}>Buyer Details</h2>
//             <p><strong>Name:</strong> {booking.buyer?.fullName || "N/A"}</p>
//             <p><strong>Email:</strong> {booking.buyer?.email || "N/A"}</p>
//             <p><strong>Phone:</strong> {booking.buyer?.phone || "N/A"}</p>
//           </div>
//         </div>

//         <button onClick={downloadPDF} style={styles.button}>
//           Download PDF
//         </button>
//         <button onClick={() => navigate('/properties')} style={{ ...styles.button, backgroundColor: "#333", marginTop: "10px" }}>
//           Back to Properties
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ======= STYLES ======= */

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #e6f9f0, #ffffff)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   },
//   card: {
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "24px",
//     boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//     width: "100%",
//     maxWidth: "600px",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "bold",
//     color: "#16a34a",
//     marginBottom: "5px",
//     textAlign: "center",
//   },
//   subTitle: {
//     fontSize: "20px",
//     marginBottom: "10px",
//     color: "#333",
//   },
//   section: {
//     marginBottom: "20px",
//     color: "#555",
//     fontSize: "15px",
//   },
//   hr: {
//     margin: "20px 0",
//     border: "none",
//     borderTop: "1px solid #eee",
//   },
//   button: {
//     marginTop: "15px",
//     width: "100%",
//     padding: "16px",
//     backgroundColor: "#16a34a",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     fontSize: "16px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   noBooking: {
//     textAlign: "center",
//     marginTop: "100px",
//     fontSize: "20px",
//     color: "red",
//   },
// };


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (location.state && location.state.booking) {
      setBooking(location.state.booking);
    } else {
      const saved = localStorage.getItem("bookingData");
      if (saved) setBooking(JSON.parse(saved));
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

  if (!booking)
    return (
      <div style={styles.noBooking}>
        <span style={{ color: "#B2846B" }}>No Booking Found</span>
        <br />
        <button onClick={() => navigate("/")} style={{ ...styles.primaryBtn, width: "200px", marginTop: "20px" }}>
          Home
        </button>
      </div>
    );

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .pdf-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .back-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      <div style={styles.card}>
        <div id="booking-details">
          {/* SUCCESS ICON + TITLE */}
          <div style={styles.iconWrap}>
            <div style={styles.iconCircle}>✓</div>
          </div>
          <h1 style={styles.title}>Booking Confirmed!</h1>

          {location.state?.emailSent ? (
            <p style={styles.emailNote}>
              An email receipt has been sent to your registered address.
            </p>
          ) : (
            <p style={{ ...styles.emailNote, color: "#B2846B" }}>
              Booking confirmed, but email receipt failed to send. Please download the PDF below.
            </p>
          )}

          {/* BOOKING INFO */}
          <div style={styles.section}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Booking ID</span>
              <span style={styles.infoValue}>{booking.bookingId || booking._id}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Date</span>
              <span style={styles.infoValue}>
                {new Date(booking.bookingDate || booking.createdAt).toLocaleString()}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status</span>
              <span style={{ ...styles.infoValue, color: "#627B68", fontWeight: 700 }}>
                {booking.status}
              </span>
            </div>
            {booking.amount && (
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Total Paid</span>
                <span style={{ ...styles.infoValue, color: "#B2846B", fontWeight: 800, fontSize: "17px" }}>
                  ₹{booking.amount.toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>

          <div style={styles.divider} />

          {/* PROPERTY DETAILS */}
          <div style={styles.section}>
            <h2 style={styles.subTitle}>Property Details</h2>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Title</span>
              <span style={styles.infoValue}>
                {booking.property?.title || location.state?.property?.title || "N/A"}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Location</span>
              <span style={styles.infoValue}>
                {booking.property?.location || location.state?.property?.location || "N/A"}
              </span>
            </div>
          </div>

          <div style={styles.divider} />

          {/* BUYER DETAILS */}
          <div style={styles.section}>
            <h2 style={styles.subTitle}>Buyer Details</h2>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Name</span>
              <span style={styles.infoValue}>{booking.buyer?.fullName || "N/A"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{booking.buyer?.email || "N/A"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Phone</span>
              <span style={styles.infoValue}>{booking.buyer?.phone || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <button onClick={downloadPDF} style={styles.primaryBtn} className="pdf-btn">
          Download PDF
        </button>
        <button
          onClick={() => navigate("/properties")}
          style={styles.secondaryBtn}
          className="back-btn"
        >
          Back to Properties
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F5EDE6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#FDFAF8",
    padding: "48px 40px 40px",
    borderRadius: "32px",
    boxShadow: "0 20px 50px rgba(76,51,36,0.1)",
    width: "100%",
    maxWidth: "600px",
    border: "1px solid #E4CBB6",
  },

  /* Success icon */
  iconWrap: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  iconCircle: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #B2846B 0%, #627B68 100%)",
    color: "#FDFAF8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "700",
    boxShadow: "0 10px 24px rgba(98,123,104,0.3)",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#4C3324",
    marginBottom: "8px",
    textAlign: "center",
    letterSpacing: "-0.02em",
  },
  emailNote: {
    textAlign: "center",
    color: "#819B8B",
    marginBottom: "28px",
    fontSize: "15px",
    fontWeight: "500",
  },

  section: { marginBottom: "4px" },
  subTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#4C3324",
    marginBottom: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    fontSize: "13px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "6px",
    background: "#F5EDE6",
  },
  infoLabel: {
    fontSize: "13px",
    color: "#819B8B",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: "14px",
    color: "#4C3324",
    fontWeight: "600",
    textAlign: "right",
    maxWidth: "60%",
  },

  divider: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #E4CBB6",
  },

  primaryBtn: {
    marginTop: "24px",
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #B2846B 0%, #627B68 100%)",
    color: "#FDFAF8",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 10px 24px rgba(98,123,104,0.3)",
    transition: "opacity 0.2s, transform 0.2s",
    display: "block",
  },
  secondaryBtn: {
    marginTop: "12px",
    width: "100%",
    padding: "16px",
    background: "#F5EDE6",
    color: "#4C3324",
    border: "1.5px solid #E4CBB6",
    borderRadius: "14px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "opacity 0.2s, transform 0.2s",
    display: "block",
  },

  noBooking: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "20px",
    fontFamily: "'DM Sans', sans-serif",
  },
};
