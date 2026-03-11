// // // import React from 'react';

// // // const Profile = () => {
// // //   const agentInfo = {
// // //     name: "Admin User",
// // //     role: "Senior Real Estate Agent",
// // //     email: "admin@propzo.com",
// // //     phone: "+91 98765 43210",
// // //     experience: "8 Years",
// // //     location: "Mumbai, Maharashtra",
// // //     bio: "Specializing in luxury residential properties and commercial leasing across South Mumbai. Committed to providing top-tier service and data-driven insights to clients.",
// // //     stats: [
// // //       { label: "Deals Closed", value: "124", icon: "🤝" },
// // //       { label: "Active Listings", value: "12", icon: "🏢" },
// // //       { label: "Client Rating", value: "4.9/5", icon: "⭐" }
// // //     ]
// // //   };

// // //   return (
// // //     <div style={styles.pageWrapper}>
// // //       {/* Internal CSS for Animations and Luxury Effects */}
// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

// // //         body {
// // //           margin: 0;
// // //           font-family: 'Plus Jakarta Sans', sans-serif;
// // //           background-color: #f8fafc;
// // //         }

// // //         .header-banner {
// // //           height: 160px;
// // //           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
// // //           position: relative;
// // //         }

// // //         .avatar-box {
// // //           width: 140px;
// // //           height: 140px;
// // //           background: #2563eb;
// // //           border: 6px solid #ffffff;
// // //           border-radius: 32px;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           font-size: 48px;
// // //           font-weight: 800;
// // //           color: white;
// // //           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
// // //           position: absolute;
// // //           bottom: -70px;
// // //           left: 40px;
// // //         }

// // //         .profile-card {
// // //           background: white;
// // //           border-radius: 40px;
// // //           border: 1px solid #f1f5f9;
// // //           box-shadow: 0 4px 20px rgba(0,0,0,0.03);
// // //           margin-top: -20px;
// // //           padding-top: 80px;
// // //         }

// // //         .stat-item {
// // //           background: #f8fafc;
// // //           padding: 24px;
// // //           border-radius: 24px;
// // //           border: 1px solid #f1f5f9;
// // //           transition: transform 0.2s ease;
// // //         }

// // //         .stat-item:hover {
// // //           transform: translateY(-5px);
// // //           background: #ffffff;
// // //           box-shadow: 0 10px 20px rgba(37, 99, 235, 0.05);
// // //           border-color: #dbeafe;
// // //         }

// // //         .badge {
// // //           padding: 6px 16px;
// // //           border-radius: 50px;
// // //           font-size: 11px;
// // //           font-weight: 800;
// // //           letter-spacing: 0.5px;
// // //           text-transform: uppercase;
// // //           background: #f0fdf4;
// // //           color: #166534;
// // //           border: 1px solid #dcfce7;
// // //         }
// // //       `}</style>

// // //       <div style={styles.contentContainer}>
// // //         {/* Top Banner Section */}
// // //         <div className="header-banner">
// // //           <div className="avatar-box">A</div>
// // //         </div>

// // //         {/* Profile Main Information */}
// // //         <div className="profile-card">
// // //           <div style={styles.mainInfoRow}>
// // //             <div style={styles.identity}>
// // //               <h1 style={styles.name}>{agentInfo.name}</h1>
// // //               <div style={styles.roleRow}>
// // //                 <span className="badge">Verified Agent</span>
// // //                 <span style={styles.roleText}>{agentInfo.role}</span>
// // //               </div>
// // //             </div>
// // //             <button style={styles.editBtn}>Edit Profile ⚙️</button>
// // //           </div>

// // //           {/* Quick Stats Grid */}
// // //           <div style={styles.statsGrid}>
// // //             {agentInfo.stats.map((stat, i) => (
// // //               <div key={i} className="stat-item">
// // //                 <div style={styles.statIcon}>{stat.icon}</div>
// // //                 <div>
// // //                   <div style={styles.statValue}>{stat.value}</div>
// // //                   <div style={styles.statLabel}>{stat.label}</div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Detailed Info Section */}
// // //           <div style={styles.detailsSection}>
// // //             <div style={styles.infoCol}>
// // //               <h3 style={styles.sectionTitle}>Contact Information</h3>
// // //               <div style={styles.contactList}>
// // //                 <div style={styles.contactItem}>
// // //                   <span style={styles.contactIcon}>📧</span>
// // //                   <span style={styles.contactValue}>{agentInfo.email}</span>
// // //                 </div>
// // //                 <div style={styles.contactItem}>
// // //                   <span style={styles.contactIcon}>📞</span>
// // //                   <span style={styles.contactValue}>{agentInfo.phone}</span>
// // //                 </div>
// // //                 <div style={styles.contactItem}>
// // //                   <span style={styles.contactIcon}>📍</span>
// // //                   <span style={styles.contactValue}>{agentInfo.location}</span>
// // //                 </div>
// // //                 <div style={styles.contactItem}>
// // //                   <span style={styles.contactIcon}>💼</span>
// // //                   <span style={styles.contactValue}>{agentInfo.experience} Experience</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div style={styles.bioCol}>
// // //               <h3 style={styles.sectionTitle}>Professional Bio</h3>
// // //               <p style={styles.bioText}>{agentInfo.bio}</p>

// // //               <div style={styles.achievementBox}>
// // //                 <h4 style={styles.achievementTitle}>Key Achievements</h4>
// // //                 <div style={styles.badgeCloud}>
// // //                   <span style={styles.achievementBadge}>🏆 Top Producer 2024</span>
// // //                   <span style={styles.achievementBadge}>💎 Million Dollar Club</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   pageWrapper: { minHeight: '100vh', padding: '40px 20px' },
// // //   contentContainer: { maxWidth: '1100px', margin: '0 auto', overflow: 'hidden', borderRadius: '40px' },
// // //   mainInfoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' },
// // //   identity: { display: 'flex', flexDirection: 'column', gap: '8px' },
// // //   name: { fontSize: '36px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-1px' },
// // //   roleRow: { display: 'flex', alignItems: 'center', gap: '15px' },
// // //   roleText: { color: '#2563eb', fontWeight: '700', fontSize: '14px' },
// // //   editBtn: { backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', padding: '12px 24px', borderRadius: '16px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' },
// // //   statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '40px' },
// // //   statIcon: { fontSize: '24px', marginBottom: '8px' },
// // //   statValue: { fontSize: '28px', fontWeight: '800', color: '#1e293b' },
// // //   statLabel: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
// // //   detailsSection: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', padding: '0 40px 40px 40px', borderTop: '1px solid #f8fafc', paddingTop: '40px' },
// // //   sectionTitle: { fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '24px' },
// // //   contactList: { display: 'flex', flexDirection: 'column', gap: '20px' },
// // //   contactItem: { display: 'flex', alignItems: 'center', gap: '15px' },
// // //   contactIcon: { width: '40px', height: '40px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' },
// // //   contactValue: { fontSize: '14px', fontWeight: '600', color: '#475569' },
// // //   bioText: { fontSize: '16px', lineHeight: '1.8', color: '#64748b', fontWeight: '500' },
// // //   achievementBox: { marginTop: '30px', padding: '24px', background: '#f8fafc', borderRadius: '24px' },
// // //   achievementTitle: { fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '15px', textTransform: 'uppercase' },
// // //   badgeCloud: { display: 'flex', gap: '12px' },
// // //   achievementBadge: { background: '#ffffff', padding: '10px 18px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', color: '#475569', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }
// // // };

// // // export default Profile;



// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Profile = () => {
// //   const [agentInfo, setAgentInfo] = useState(null);
// // useEffect(() => {
// // const storedAgent = JSON.parse(localStorage.getItem("agentAuth"));
// //   console.log("Stored Agent:", storedAgent);

// //   if (!storedAgent) {
// //     console.log("No agent found in localStorage");
// //     return;
// //   }

// //   axios
// //     .get(`http://localhost:5000/api/agents/${storedAgent._id}`)
// //     .then((res) => {
// //       console.log("API Response:", res.data);
// //       setAgentInfo(res.data);
// //     })
// //     .catch((err) => {
// //       console.error("API Error:", err.response?.data || err.message);
// //     });
// // }, []);
// //   if (!agentInfo) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

// //   return (
// //     <div style={styles.pageWrapper}>
// //       {/* Internal CSS */}
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

// //         body {
// //           margin: 0;
// //           font-family: 'Plus Jakarta Sans', sans-serif;
// //           background-color: #f8fafc;
// //         }

// //         .header-banner {
// //           height: 160px;
// //           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
// //           position: relative;
// //         }

// //         .avatar-box {
// //           width: 140px;
// //           height: 140px;
// //           background: #2563eb;
// //           border: 6px solid #ffffff;
// //           border-radius: 32px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           font-size: 48px;
// //           font-weight: 800;
// //           color: white;
// //           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
// //           position: absolute;
// //           bottom: -70px;
// //           left: 40px;
// //         }

// //         .profile-card {
// //           background: white;
// //           border-radius: 40px;
// //           border: 1px solid #f1f5f9;
// //           box-shadow: 0 4px 20px rgba(0,0,0,0.03);
// //           margin-top: -20px;
// //           padding-top: 80px;
// //         }

// //         .stat-item {
// //           background: #f8fafc;
// //           padding: 24px;
// //           border-radius: 24px;
// //           border: 1px solid #f1f5f9;
// //           transition: transform 0.2s ease;
// //         }

// //         .stat-item:hover {
// //           transform: translateY(-5px);
// //           background: #ffffff;
// //           box-shadow: 0 10px 20px rgba(37, 99, 235, 0.05);
// //           border-color: #dbeafe;
// //         }

// //         .badge {
// //           padding: 6px 16px;
// //           border-radius: 50px;
// //           font-size: 11px;
// //           font-weight: 800;
// //           letter-spacing: 0.5px;
// //           text-transform: uppercase;
// //           background: #f0fdf4;
// //           color: #166534;
// //           border: 1px solid #dcfce7;
// //         }
// //       `}</style>

// //       <div style={styles.contentContainer}>
// //         {/* Top Banner */}
// //         <div className="header-banner">
// //           <div className="avatar-box">
// //             {agentInfo.fullName?.charAt(0).toUpperCase()}
// //           </div>
// //         </div>

// //         {/* Profile Card */}
// //         <div className="profile-card">
// //           <div style={styles.mainInfoRow}>
// //             <div style={styles.identity}>
// //               <h1 style={styles.name}>{agentInfo.fullName}</h1>
// //               <div style={styles.roleRow}>
// //                 <span className="badge">Verified Agent</span>
// //                 <span style={styles.roleText}>{agentInfo.role}</span>
// //               </div>
// //             </div>
// //             <button style={styles.editBtn}>Edit Profile ⚙️</button>
// //           </div>

// //           {/* Stats (Static for now) */}
// //           <div style={styles.statsGrid}>
// //             <div className="stat-item">
// //               <div style={styles.statIcon}>🤝</div>
// //               <div>
// //                 <div style={styles.statValue}>0</div>
// //                 <div style={styles.statLabel}>Deals Closed</div>
// //               </div>
// //             </div>

// //             <div className="stat-item">
// //               <div style={styles.statIcon}>🏢</div>
// //               <div>
// //                 <div style={styles.statValue}>0</div>
// //                 <div style={styles.statLabel}>Active Listings</div>
// //               </div>
// //             </div>

// //             <div className="stat-item">
// //               <div style={styles.statIcon}>⭐</div>
// //               <div>
// //                 <div style={styles.statValue}>5.0</div>
// //                 <div style={styles.statLabel}>Client Rating</div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Details Section */}
// //           <div style={styles.detailsSection}>
// //             <div style={styles.infoCol}>
// //               <h3 style={styles.sectionTitle}>Contact Information</h3>
// //               <div style={styles.contactList}>
// //                 <div style={styles.contactItem}>
// //                   <span style={styles.contactIcon}>📧</span>
// //                   <span style={styles.contactValue}>{agentInfo.email}</span>
// //                 </div>

// //                 <div style={styles.contactItem}>
// //                   <span style={styles.contactIcon}>📞</span>
// //                   <span style={styles.contactValue}>{agentInfo.phone}</span>
// //                 </div>

// //                 <div style={styles.contactItem}>
// //                   <span style={styles.contactIcon}>📍</span>
// //                   <span style={styles.contactValue}>{agentInfo.location || "Not Provided"}</span>
// //                 </div>

// //                 <div style={styles.contactItem}>
// //                   <span style={styles.contactIcon}>💼</span>
// //                   <span style={styles.contactValue}>
// //                     {agentInfo.experience || "0 Years"} Experience
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div style={styles.bioCol}>
// //               <h3 style={styles.sectionTitle}>Professional Bio</h3>
// //               <p style={styles.bioText}>
// //                 {agentInfo.bio || "No bio added yet."}
// //               </p>

// //               <div style={styles.achievementBox}>
// //                 <h4 style={styles.achievementTitle}>Key Achievements</h4>
// //                 <div style={styles.badgeCloud}>
// //                   <span style={styles.achievementBadge}>🏆 Top Performer</span>
// //                   <span style={styles.achievementBadge}>💎 Verified Agent</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   pageWrapper: { minHeight: "100vh", padding: "40px 20px" },
// //   contentContainer: {
// //     maxWidth: "1100px",
// //     margin: "0 auto",
// //     overflow: "hidden",
// //     borderRadius: "40px"
// //   },
// //   mainInfoRow: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: "0 40px"
// //   },
// //   identity: { display: "flex", flexDirection: "column", gap: "8px" },
// //   name: {
// //     fontSize: "36px",
// //     fontWeight: "800",
// //     color: "#1e293b",
// //     margin: 0,
// //     letterSpacing: "-1px"
// //   },
// //   roleRow: { display: "flex", alignItems: "center", gap: "15px" },
// //   roleText: { color: "#2563eb", fontWeight: "700", fontSize: "14px" },
// //   editBtn: {
// //     backgroundColor: "#f1f5f9",
// //     color: "#475569",
// //     border: "1px solid #e2e8f0",
// //     padding: "12px 24px",
// //     borderRadius: "16px",
// //     fontWeight: "700",
// //     fontSize: "14px",
// //     cursor: "pointer"
// //   },
// //   statsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(3, 1fr)",
// //     gap: "20px",
// //     padding: "40px"
// //   },
// //   statIcon: { fontSize: "24px", marginBottom: "8px" },
// //   statValue: {
// //     fontSize: "28px",
// //     fontWeight: "800",
// //     color: "#1e293b"
// //   },
// //   statLabel: {
// //     fontSize: "11px",
// //     fontWeight: "700",
// //     color: "#94a3b8",
// //     textTransform: "uppercase",
// //     letterSpacing: "1px"
// //   },
// //   detailsSection: {
// //     display: "grid",
// //     gridTemplateColumns: "1fr 1.5fr",
// //     gap: "40px",
// //     padding: "0 40px 40px 40px",
// //     borderTop: "1px solid #f8fafc",
// //     paddingTop: "40px"
// //   },
// //   sectionTitle: {
// //     fontSize: "18px",
// //     fontWeight: "800",
// //     color: "#1e293b",
// //     marginBottom: "24px"
// //   },
// //   contactList: { display: "flex", flexDirection: "column", gap: "20px" },
// //   contactItem: { display: "flex", alignItems: "center", gap: "15px" },
// //   contactIcon: {
// //     width: "40px",
// //     height: "40px",
// //     background: "#f8fafc",
// //     borderRadius: "12px",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     fontSize: "18px"
// //   },
// //   contactValue: {
// //     fontSize: "14px",
// //     fontWeight: "600",
// //     color: "#475569"
// //   },
// //   bioText: {
// //     fontSize: "16px",
// //     lineHeight: "1.8",
// //     color: "#64748b",
// //     fontWeight: "500"
// //   },
// //   achievementBox: {
// //     marginTop: "30px",
// //     padding: "24px",
// //     background: "#f8fafc",
// //     borderRadius: "24px"
// //   },
// //   achievementTitle: {
// //     fontSize: "14px",
// //     fontWeight: "800",
// //     color: "#1e293b",
// //     marginBottom: "15px",
// //     textTransform: "uppercase"
// //   },
// //   badgeCloud: { display: "flex", gap: "12px" },
// //   achievementBadge: {
// //     background: "#ffffff",
// //     padding: "10px 18px",
// //     borderRadius: "12px",
// //     fontSize: "12px",
// //     fontWeight: "700",
// //     color: "#475569",
// //     boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
// //   }
// // };

// // export default Profile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [agentInfo, setAgentInfo] = useState(null);

//   useEffect(() => {
//     const storedAgent = JSON.parse(localStorage.getItem("agentAuth"));
//     console.log("Stored Agent:", storedAgent);

//     if (!storedAgent) {
//       console.log("No agent found in localStorage");
//       return;
//     }

//     axios
//       .get(`http://localhost:5000/api/agents/${storedAgent._id}`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         setAgentInfo(res.data);
//       })
//       .catch((err) => {
//         console.error("API Error:", err.response?.data || err.message);
//       });
//   }, []);

//   if (!agentInfo) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

//   return (
//     <div style={styles.pageWrapper}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         body {
//           margin: 0;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           background-color: #f8fafc;
//         }

//         .header-banner {
//           height: 160px;
//           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//           position: relative;
//         }

//         .avatar-box {
//           width: 140px;
//           height: 140px;
//           background: #2563eb;
//           border: 6px solid #ffffff;
//           border-radius: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 48px;
//           font-weight: 800;
//           color: white;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//           position: absolute;
//           bottom: -70px;
//           left: 40px;
//         }

//         .profile-card {
//           background: white;
//           border-radius: 40px;
//           border: 1px solid #f1f5f9;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.03);
//           margin-top: -20px;
//           padding-top: 80px;
//         }

//         .stat-item {
//           background: #f8fafc;
//           padding: 24px;
//           border-radius: 24px;
//           border: 1px solid #f1f5f9;
//           transition: transform 0.2s ease;
//         }

//         .stat-item:hover {
//           transform: translateY(-5px);
//           background: #ffffff;
//           box-shadow: 0 10px 20px rgba(37, 99, 235, 0.05);
//           border-color: #dbeafe;
//         }

//         .badge {
//           padding: 6px 16px;
//           border-radius: 50px;
//           font-size: 11px;
//           font-weight: 800;
//           letter-spacing: 0.5px;
//           text-transform: uppercase;
//           background: #f0fdf4;
//           color: #166534;
//           border: 1px solid #dcfce7;
//         }
//       `}</style>

//       <div style={styles.contentContainer}>
//         <div className="header-banner">
//           <div
//             className="avatar-box"
//             style={{ overflow: "hidden" }}
//           >
//             {agentInfo.image ? (
//               <img
//                 src={agentInfo.image}
//                 alt="Agent"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "26px"
//                 }}
//               />
//             ) : (
//               agentInfo.fullName?.charAt(0).toUpperCase()
//             )}
//           </div>
//         </div>

//         <div className="profile-card">
//           <div style={styles.mainInfoRow}>
//             <div style={styles.identity}>
//               <h1 style={styles.name}>{agentInfo.fullName}</h1>
//               <div style={styles.roleRow}>
//                 <span className="badge">{agentInfo.status || "Active"}</span>
//                 <span style={styles.roleText}>{agentInfo.role}</span>
//               </div>
//             </div>
//             <button style={styles.editBtn}>Edit Profile ⚙️</button>
//           </div>

//           <div style={styles.statsGrid}>
//             <div className="stat-item">
//               <div style={styles.statIcon}>🤝</div>
//               <div>
//                 <div style={styles.statValue}>0</div>
//                 <div style={styles.statLabel}>Deals Closed</div>
//               </div>
//             </div>

//             <div className="stat-item">
//               <div style={styles.statIcon}>🏢</div>
//               <div>
//                 <div style={styles.statValue}>0</div>
//                 <div style={styles.statLabel}>Active Listings</div>
//               </div>
//             </div>

//             <div className="stat-item">
//               <div style={styles.statIcon}>⭐</div>
//               <div>
//                 <div style={styles.statValue}>
//                   {agentInfo.rating ? agentInfo.rating : "0.0"}
//                 </div>
//                 <div style={styles.statLabel}>Client Rating</div>
//               </div>
//             </div>
//           </div>

//           <div style={styles.detailsSection}>
//             <div style={styles.infoCol}>
//               <h3 style={styles.sectionTitle}>Contact Information</h3>
//               <div style={styles.contactList}>
//                 <div style={styles.contactItem}>
//                   <span style={styles.contactIcon}>📧</span>
//                   <span style={styles.contactValue}>{agentInfo.email}</span>
//                 </div>

//                 <div style={styles.contactItem}>
//                   <span style={styles.contactIcon}>📞</span>
//                   <span style={styles.contactValue}>{agentInfo.phone}</span>
//                 </div>

//                 <div style={styles.contactItem}>
//                   <span style={styles.contactIcon}>📍</span>
//                   <span style={styles.contactValue}>
//                     {agentInfo.location || "Not Provided"}
//                   </span>
//                 </div>

//                 <div style={styles.contactItem}>
//                   <span style={styles.contactIcon}>💼</span>
//                   <span style={styles.contactValue}>
//                     {agentInfo.experience || "0 Years"} Experience
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div style={styles.bioCol}>
//               <h3 style={styles.sectionTitle}>Professional Bio</h3>
//               <p style={styles.bioText}>
//                 {agentInfo.bio || "No bio added yet."}
//               </p>

//               <div style={styles.achievementBox}>
//                 <h4 style={styles.achievementTitle}>Key Achievements</h4>
//                 <div style={styles.badgeCloud}>
//                   <span style={styles.achievementBadge}>🏆 Top Performer</span>
//                   <span style={styles.achievementBadge}>💎 Verified Agent</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: { minHeight: "100vh", padding: "40px 20px" },
//   contentContainer: {
//     maxWidth: "1100px",
//     margin: "0 auto",
//     overflow: "hidden",
//     borderRadius: "40px"
//   },
//   mainInfoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0 40px"
//   },
//   identity: { display: "flex", flexDirection: "column", gap: "8px" },
//   name: {
//     fontSize: "36px",
//     fontWeight: "800",
//     color: "#1e293b",
//     margin: 0,
//     letterSpacing: "-1px"
//   },
//   roleRow: { display: "flex", alignItems: "center", gap: "15px" },
//   roleText: { color: "#2563eb", fontWeight: "700", fontSize: "14px" },
//   editBtn: {
//     backgroundColor: "#f1f5f9",
//     color: "#475569",
//     border: "1px solid #e2e8f0",
//     padding: "12px 24px",
//     borderRadius: "16px",
//     fontWeight: "700",
//     fontSize: "14px",
//     cursor: "pointer"
//   },
//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "20px",
//     padding: "40px"
//   },
//   statIcon: { fontSize: "24px", marginBottom: "8px" },
//   statValue: {
//     fontSize: "28px",
//     fontWeight: "800",
//     color: "#1e293b"
//   },
//   statLabel: {
//     fontSize: "11px",
//     fontWeight: "700",
//     color: "#94a3b8",
//     textTransform: "uppercase",
//     letterSpacing: "1px"
//   },
//   detailsSection: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1.5fr",
//     gap: "40px",
//     padding: "0 40px 40px 40px",
//     borderTop: "1px solid #f8fafc",
//     paddingTop: "40px"
//   },
//   sectionTitle: {
//     fontSize: "18px",
//     fontWeight: "800",
//     color: "#1e293b",
//     marginBottom: "24px"
//   },
//   contactList: { display: "flex", flexDirection: "column", gap: "20px" },
//   contactItem: { display: "flex", alignItems: "center", gap: "15px" },
//   contactIcon: {
//     width: "40px",
//     height: "40px",
//     background: "#f8fafc",
//     borderRadius: "12px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "18px"
//   },
//   contactValue: {
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#475569"
//   },
//   bioText: {
//     fontSize: "16px",
//     lineHeight: "1.8",
//     color: "#64748b",
//     fontWeight: "500"
//   },
//   achievementBox: {
//     marginTop: "30px",
//     padding: "24px",
//     background: "#f8fafc",
//     borderRadius: "24px"
//   },
//   achievementTitle: {
//     fontSize: "14px",
//     fontWeight: "800",
//     color: "#1e293b",
//     marginBottom: "15px",
//     textTransform: "uppercase"
//   },
//   badgeCloud: { display: "flex", gap: "12px" },
//   achievementBadge: {
//     background: "#ffffff",
//     padding: "10px 18px",
//     borderRadius: "12px",
//     fontSize: "12px",
//     fontWeight: "700",
//     color: "#475569",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
//   }
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [agentInfo, setAgentInfo] = useState(null);
  const [activeListings, setActiveListings] = useState(0);

  useEffect(() => {
    const storedAgent = JSON.parse(localStorage.getItem("agentAuth"));
    console.log("Stored Agent:", storedAgent);

    if (!storedAgent) {
      console.log("No agent found in localStorage");
      return;
    }

    // Fetch Agent Info
    axios
      .get(`http://localhost:5000/api/agents/${storedAgent._id}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setAgentInfo(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err.response?.data || err.message);
      });

    // Fetch Properties to calculate real active listings
    axios
      .get(`http://localhost:5000/api/properties/agent/${storedAgent._id}`)
      .then((res) => {
        const props = res.data;
        const activeCount = props.filter(p => p.status === 'Active' || !p.status || !p.isSold).length;
        setActiveListings(activeCount);
      })
      .catch((err) => {
        console.error("Failed to fetch properties for stats:", err);
      });
  }, []);

  if (!agentInfo) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #f8fafc;
        }

        .header-banner {
          height: 160px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          position: relative;
        }

        .avatar-box {
          width: 140px;
          height: 140px;
          background: #2563eb;
          border: 6px solid #ffffff;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 800;
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          position: absolute;
          bottom: -70px;
          left: 40px;
        }

        .profile-card {
          background: white;
          border-radius: 40px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          margin-top: -20px;
          padding-top: 80px;
        }

        .stat-item {
          background: #f8fafc;
          padding: 24px;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          transition: transform 0.2s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          background: #ffffff;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.05);
          border-color: #dbeafe;
        }

        .badge {
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #dcfce7;
        }
      `}</style>

      <div style={styles.contentContainer}>
        <div className="header-banner">
          <div className="avatar-box" style={{ overflow: "hidden" }}>
            {agentInfo.image ? (
              <img
                src={agentInfo.image}
                alt="Agent"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "26px"
                }}
              />
            ) : (
              agentInfo.fullName?.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        <div className="profile-card">
          <div style={styles.mainInfoRow}>
            <div style={styles.identity}>
              <h1 style={styles.name}>{agentInfo.fullName}</h1>
              <div style={styles.roleRow}>
                <span className="badge">
                  {agentInfo.status || "Active"}
                </span>
                <span style={styles.roleText}>
                  {agentInfo.role || "Agent"}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div className="stat-item">
              <div style={styles.statIcon}>🤝</div>
              <div>
                <div style={styles.statValue}>
                  {agentInfo.dealsClosed ?? 0}
                </div>
                <div style={styles.statLabel}>Deals Closed</div>
              </div>
            </div>

            <div className="stat-item">
              <div style={styles.statIcon}>🏢</div>
              <div>
                <div style={styles.statValue}>
                  {activeListings}
                </div>
                <div style={styles.statLabel}>Active Listings</div>
              </div>
            </div>

            <div className="stat-item">
              <div style={styles.statIcon}>⭐</div>
              <div>
                <div style={styles.statValue}>
                  {agentInfo.rating ?? "0.0"}
                </div>
                <div style={styles.statLabel}>Client Rating</div>
              </div>
            </div>
          </div>

          <div style={styles.detailsSection}>
            <div style={styles.infoCol}>
              <h3 style={styles.sectionTitle}>Contact Information</h3>
              <div style={styles.contactList}>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📧</span>
                  <span style={styles.contactValue}>
                    {agentInfo.email}
                  </span>
                </div>

                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📞</span>
                  <span style={styles.contactValue}>
                    {agentInfo.phone}
                  </span>
                </div>

                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📍</span>
                  <span style={styles.contactValue}>
                    {agentInfo.location || "Not Provided"}
                  </span>
                </div>

                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>💼</span>
                  <span style={styles.contactValue}>
                    {agentInfo.experience || "0 Years"} Experience
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.bioCol}>
              <h3 style={styles.sectionTitle}>Professional Bio</h3>
              <p style={styles.bioText}>
                {agentInfo.bio || "No bio added yet."}
              </p>

              <div style={styles.achievementBox}>
                <h4 style={styles.achievementTitle}>
                  Key Achievements
                </h4>

                <div style={styles.badgeCloud}>
                  {agentInfo.achievements &&
                    agentInfo.achievements.length > 0 ? (
                    agentInfo.achievements.map((item, index) => (
                      <span
                        key={index}
                        style={styles.achievementBadge}
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span style={styles.achievementBadge}>
                      No achievements yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: "100vh", padding: "40px 20px" },
  contentContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "40px"
  },
  mainInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px"
  },
  identity: { display: "flex", flexDirection: "column", gap: "8px" },
  name: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
    letterSpacing: "-1px"
  },
  roleRow: { display: "flex", alignItems: "center", gap: "15px" },
  roleText: { color: "#2563eb", fontWeight: "700", fontSize: "14px" },
  editBtn: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "12px 24px",
    borderRadius: "16px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "40px"
  },
  statIcon: { fontSize: "24px", marginBottom: "8px" },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b"
  },
  statLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  detailsSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "40px",
    padding: "0 40px 40px 40px",
    borderTop: "1px solid #f8fafc",
    paddingTop: "40px"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "24px"
  },
  contactList: { display: "flex", flexDirection: "column", gap: "20px" },
  contactItem: { display: "flex", alignItems: "center", gap: "15px" },
  contactIcon: {
    width: "40px",
    height: "40px",
    background: "#f8fafc",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px"
  },
  contactValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569"
  },
  bioText: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#64748b",
    fontWeight: "500"
  },
  achievementBox: {
    marginTop: "30px",
    padding: "24px",
    background: "#f8fafc",
    borderRadius: "24px"
  },
  achievementTitle: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "15px",
    textTransform: "uppercase"
  },
  badgeCloud: { display: "flex", gap: "12px", flexWrap: "wrap" },
  achievementBadge: {
    background: "#ffffff",
    padding: "10px 18px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#475569",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  }
};

export default Profile;