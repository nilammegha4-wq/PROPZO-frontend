// // import React from "react";
// // import { Link } from "react-router-dom";

// // const bookings = [
// //   {
// //     id: 1,
// //     user: "Rahul Sharma",
// //     property: "2BHK Flat - Mumbai",
// //     date: "Feb 10, 2026",
// //     status: "Confirmed",
// //     amount: 12000,
// //   },
// //   {
// //     id: 2,
// //     user: "Amit Patel",
// //     property: "Office Space - Pune",
// //     date: "Feb 11, 2026",
// //     status: "Pending",
// //     amount: 8500,
// //   },
// //   {
// //     id: 3,
// //     user: "Sneha Reddy",
// //     property: "Villa - Bangalore",
// //     date: "Feb 12, 2026",
// //     status: "Cancelled",
// //     amount: 25000,
// //   },
// // ];

// // export default function BookingList() {
// //   // Helper for Status Badge Colors
// //   const getStatusStyle = (status) => {
// //     switch (status) {
// //       case "Confirmed":
// //         return { bg: "#DEF7EC", text: "#03543F" };
// //       case "Pending":
// //         return { bg: "#FEF3C7", text: "#92400E" };
// //       case "Cancelled":
// //         return { bg: "#FDE2E2", text: "#9B1C1C" };
// //       default:
// //         return { bg: "#F3F4F6", text: "#374151" };
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.header}>
// //         <h1 style={styles.title}>Bookings</h1>
// //         <p style={styles.subtitle}>Monitor and manage all client property reservations.</p>
// //       </div>

// //       <div style={styles.card}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th style={styles.th}>USER</th>
// //               <th style={styles.th}>PROPERTY</th>
// //               <th style={styles.th}>DATE</th>
// //               <th style={styles.th}>STATUS</th>
// //               <th style={styles.th}>AMOUNT</th>
// //               <th style={{ ...styles.th, textAlign: "right" }}>ACTION</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bookings.map((b) => {
// //               const statusTheme = getStatusStyle(b.status);
// //               return (
// //                 <tr key={b.id} style={styles.tr}>
// //                   <td style={styles.td}>
// //                     <div style={styles.userCell}>
// //                       <div style={styles.avatar}>{b.user.charAt(0)}</div>
// //                       <span style={styles.userName}>{b.user}</span>
// //                     </div>
// //                   </td>
// //                   <td style={styles.td}>{b.property}</td>
// //                   <td style={{ ...styles.td, color: "#6B7280" }}>{b.date}</td>
// //                   <td style={styles.td}>
// //                     <span
// //                       style={{
// //                         ...styles.badge,
// //                         backgroundColor: statusTheme.bg,
// //                         color: statusTheme.text,
// //                       }}
// //                     >
// //                       {b.status}
// //                     </span>
// //                   </td>
// //                   <td style={{ ...styles.td, fontWeight: "700", color: "#111827" }}>
// //                     ₹{b.amount.toLocaleString()}
// //                   </td>
// //                   <td style={{ ...styles.td, textAlign: "right" }}>
// //                     <Link to={`/admin/bookings/${b.id}`} style={styles.viewBtn}>
// //                       View Details
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= STYLES ================= */

// // const styles = {
// //   container: {
// //     padding: "40px 60px",
// //     backgroundColor: "#F9FAFB",
// //     minHeight: "100vh",
// //     fontFamily: "'Inter', sans-serif",
// //   },
// //   header: {
// //     marginBottom: "32px",
// //   },
// //   title: {
// //     fontSize: "30px",
// //     fontWeight: "800",
// //     color: "#111827",
// //     margin: 0,
// //     letterSpacing: "-0.5px",
// //   },
// //   subtitle: {
// //     fontSize: "15px",
// //     color: "#6B7280",
// //     marginTop: "6px",
// //   },
// //   card: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: "16px",
// //     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
// //     border: "1px solid #E5E7EB",
// //     overflow: "hidden",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     textAlign: "left",
// //   },
// //   th: {
// //     backgroundColor: "#F8FAFC",
// //     padding: "16px 24px",
// //     fontSize: "12px",
// //     fontWeight: "600",
// //     color: "#64748B",
// //     textTransform: "uppercase",
// //     letterSpacing: "0.05em",
// //     borderBottom: "1px solid #E5E7EB",
// //   },
// //   tr: {
// //     borderBottom: "1px solid #F3F4F6",
// //     transition: "background-color 0.2s",
// //   },
// //   td: {
// //     padding: "18px 24px",
// //     fontSize: "14px",
// //     color: "#374151",
// //     verticalAlign: "middle",
// //   },
// //   userCell: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "12px",
// //   },
// //   avatar: {
// //     width: "32px",
// //     height: "32px",
// //     borderRadius: "50%",
// //     backgroundColor: "#EEF2FF",
// //     color: "#4F46E5",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     fontSize: "12px",
// //     fontWeight: "bold",
// //   },
// //   userName: {
// //     fontWeight: "600",
// //     color: "#111827",
// //   },
// //   badge: {
// //     padding: "4px 12px",
// //     borderRadius: "99px",
// //     fontSize: "12px",
// //     fontWeight: "600",
// //     display: "inline-block",
// //   },
// //   viewBtn: {
// //     textDecoration: "none",
// //     color: "#4F46E5",
// //     fontWeight: "600",
// //     fontSize: "13px",
// //     transition: "color 0.2s",
// //   },
// // };

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function BookingList() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch bookings from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/bookings")
//       .then((res) => res.json())
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching bookings:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Status colors
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Confirmed":
//         return { bg: "#DEF7EC", text: "#03543F" };
//       case "Pending":
//         return { bg: "#FEF3C7", text: "#92400E" };
//       case "Cancelled":
//         return { bg: "#FDE2E2", text: "#9B1C1C" };
//       default:
//         return { bg: "#F3F4F6", text: "#374151" };
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Bookings</h1>
//         <p style={styles.subtitle}>
//           Monitor and manage all client property reservations.
//         </p>
//       </div>

//       <div style={styles.card}>
//         {loading ? (
//           <p style={{ padding: "20px" }}>Loading bookings...</p>
//         ) : (
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>USER</th>
//                 <th style={styles.th}>PROPERTY</th>
//                 <th style={styles.th}>DATE</th>
//                 <th style={styles.th}>STATUS</th>
//                 <th style={styles.th}>AMOUNT</th>
//                 <th style={{ ...styles.th, textAlign: "right" }}>
//                   ACTION
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {bookings.map((b) => {
//                 const statusTheme = getStatusStyle(b.status);

//                 return (
//                   <tr key={b._id} style={styles.tr}>
//                     <td style={styles.td}>
//                       <div style={styles.userCell}>
//                         <div style={styles.avatar}>
//                           {b.name?.charAt(0)}
//                         </div>
//                         <span style={styles.userName}>
//                           {b.buyer?.fullName}
//                         </span>
//                       </div>
//                     </td>

//                     <td style={styles.td}>{b.property}</td>

//                     <td style={{ ...styles.td, color: "#6B7280" }}>
//                       {new Date(b.date).toLocaleDateString()}
//                     </td>

//                     <td style={styles.td}>
//                       <span
//                         style={{
//                           ...styles.badge,
//                           backgroundColor: statusTheme.bg,
//                           color: statusTheme.text,
//                         }}
//                       >
//                         {b.status}
//                       </span>
//                     </td>

//                     <td
//                       style={{
//                         ...styles.td,
//                         fontWeight: "700",
//                         color: "#111827",
//                       }}
//                     >
//                       ₹{b.amount}
//                     </td>

//                     <td style={{ ...styles.td, textAlign: "right" }}>
//                       <Link
//                         to={`/admin/bookings/${b._id}`}
//                         style={styles.viewBtn}
//                       >
//                         View Details
//                       </Link>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   container: {
//     padding: "40px 60px",
//     backgroundColor: "#F9FAFB",
//     minHeight: "100vh",
//     fontFamily: "'Inter', sans-serif",
//   },
//   header: {
//     marginBottom: "32px",
//   },
//   title: {
//     fontSize: "30px",
//     fontWeight: "800",
//     color: "#111827",
//     margin: 0,
//     letterSpacing: "-0.5px",
//   },
//   subtitle: {
//     fontSize: "15px",
//     color: "#6B7280",
//     marginTop: "6px",
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: "16px",
//     boxShadow:
//       "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
//     border: "1px solid #E5E7EB",
//     overflow: "hidden",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     textAlign: "left",
//   },
//   th: {
//     backgroundColor: "#F8FAFC",
//     padding: "16px 24px",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#64748B",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     borderBottom: "1px solid #E5E7EB",
//   },
//   tr: {
//     borderBottom: "1px solid #F3F4F6",
//     transition: "background-color 0.2s",
//   },
//   td: {
//     padding: "18px 24px",
//     fontSize: "14px",
//     color: "#374151",
//     verticalAlign: "middle",
//   },
//   userCell: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//   },
//   avatar: {
//     width: "32px",
//     height: "32px",
//     borderRadius: "50%",
//     backgroundColor: "#EEF2FF",
//     color: "#4F46E5",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "12px",
//     fontWeight: "bold",
//   },
//   userName: {
//     fontWeight: "600",
//     color: "#111827",
//   },
//   badge: {
//     padding: "4px 12px",
//     borderRadius: "99px",
//     fontSize: "12px",
//     fontWeight: "600",
//     display: "inline-block",
//   },
//   viewBtn: {
//     textDecoration: "none",
//     color: "#4F46E5",
//     fontWeight: "600",
//     fontSize: "13px",
//     transition: "color 0.2s",
//   },
// };

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Fetch bookings from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
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

  // Status colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return { bg: "#DEF7EC", text: "#03543F" };
      case "Pending":
        return { bg: "#FEF3C7", text: "#92400E" };
      case "Cancelled":
        return { bg: "#FDE2E2", text: "#9B1C1C" };
      default:
        return { bg: "#F3F4F6", text: "#374151" };
    }
  };

  // Filter bookings based on search query
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bookings</h1>
        <p style={styles.subtitle}>
          Monitor and manage all client property reservations.
        </p>
      </div>

      <div style={styles.card}>
        {loading ? (
          <p style={{ padding: "20px" }}>Loading bookings...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "40px 60px",
    backgroundColor: "#F9FAFB",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#6B7280",
    marginTop: "6px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    border: "1px solid #E5E7EB",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    backgroundColor: "#F8FAFC",
    padding: "16px 24px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #E5E7EB",
  },
  tr: {
    borderBottom: "1px solid #F3F4F6",
    transition: "background-color 0.2s",
  },
  td: {
    padding: "18px 24px",
    fontSize: "14px",
    color: "#374151",
    verticalAlign: "middle",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#EEF2FF",
    color: "#4F46E5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
  userName: {
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    padding: "4px 12px",
    borderRadius: "99px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  viewBtn: {
    textDecoration: "none",
    color: "#4F46E5",
    fontWeight: "600",
    fontSize: "13px",
    transition: "color 0.2s",
  },
};