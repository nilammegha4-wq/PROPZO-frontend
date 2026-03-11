// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// /* ===============================
//    PROPERTY DATA
// =============================== */
// const properties = [
//   {
//     id: 1,
//     title: "Cozy Meeting Hall",
//     location: "Bandra, Mumbai",
//     type: "hour",
//     price: 800,
//     image: "/Cozymeetinghall.jpg",
//     gallery: ["/Cozymeetinghall.jpg", "/hall2.jpg", "/hall3.jpg"],
//     description:
//       "Perfect meeting space with modern facilities, WiFi, AC and comfortable seating. Ideal for client pitches and team brainstorms.",
//     amenities: ["WiFi", "AC", "Projector", "Parking", "Cafeteria"],
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     title: "Mountain View Villa",
//     location: "Powai, Mumbai",
//     type: "hour",
//     price: 800,
//     image: "/MountainVilla.jpg",
//     gallery: ["/MountainVilla.jpg", "/villa2.jpg", "/villa3.jpg"],
//     description:
//       "Luxury villa with mountain views, private pool and peaceful surroundings. Escape the city noise without leaving the city.",
//     amenities: ["Pool", "WiFi", "Garden", "Security", "Parking"],
//     rating: 4.9,
//   },
//   {
//     id: 3,
//     title: "Event Hall",
//     location: "Andheri West, Mumbai",
//     type: "day",
//     price: 15000,
//     image: "/Eventhall.jpg",
//     gallery: ["/Eventhall.jpg", "/event2.jpg", "/event3.jpg"],
//     description:
//       "Spacious event hall suitable for weddings, conferences and parties. Full-service support available.",
//     amenities: ["Stage", "Sound System", "AC", "Catering", "Parking"],
//     rating: 4.5,
//   },
//   {
//     id: 4,
//     title: "Beach Side Villa",
//     location: "Goa",
//     type: "week",
//     price: 22000,
//     image: "/Beachsidevilla.jpg",
//     gallery: ["/Beachsidevilla.jpg", "/beach2.jpg", "/beach3.jpg"],
//     description:
//       "Sea-facing villa with private beach access and luxury interiors. The ultimate vacation gateway.",
//     amenities: ["Sea View", "Pool", "Kitchen", "WiFi", "Parking"],
//     rating: 4.9,
//   },
//   {
//     id: 5,
//     title: "Premium Conference Hall",
//     location: "Lower Parel, Mumbai",
//     type: "hour",
//     price: 1200,
//     image: "/Conferencehall.jpg",
//     gallery: ["/Conferencehall.jpg", "/conf2.jpg", "/conf3.jpg"],
//     description:
//       "High-end conference hall with advanced presentation facilities and luxury interiors.",
//     amenities: ["WiFi", "Projector", "AC", "Sound System", "Parking"],
//     rating: 4.7,
//   },
//   {
//     id: 6,
//     title: "Guest House",
//     location: "Bandra West, Mumbai",
//     type: "day",
//     price: 6000,
//     image: "/Guesthouse.jpg",
//     gallery: ["/Guesthouse.jpg", "/guest2.jpg", "/guest3.jpg"],
//     description:
//       "Comfortable guest house with premium rooms and modern hospitality services.",
//     amenities: ["Room Service", "WiFi", "Parking", "AC", "Security"],
//     rating: 4.6,
//   },
//   {
//     id: 7,
//     title: "Floating Home",
//     location: "Kerala",
//     type: "week",
//     price: 35000,
//     image: "/Floatinghome.jpg",
//     gallery: ["/Floatinghome.jpg", "/float2.jpg", "/float3.jpg"],
//     description:
//       "Unique floating home experience with scenic backwater views and luxury stay.",
//     amenities: ["Lake View", "WiFi", "Kitchen", "Boat Access", "AC"],
//     rating: 5.0,
//   },
//   {
//     id: 8,
//     title: "Farm House",
//     location: "Andheri East, Mumbai",
//     type: "hour",
//     price: 1000,
//     image: "/Farmhouse.jpg",
//     gallery: ["/Farmhouse.jpg", "/farm2.jpg", "/farm3.jpg"],
//     description:
//       "Peaceful farmhouse for parties, shoots, and weekend relaxation.",
//     amenities: ["Garden", "Parking", "Pool", "BBQ Area", "Security"],
//     rating: 4.4,
//   },
//   {
//     id: 9,
//     title: "Mountain View Villa",
//     location: "Himachal Pradesh",
//     type: "week",
//     price: 28000,
//     image: "/MountainVilla.jpg",
//     gallery: ["/MountainVilla.jpg", "/mount2.jpg", "/mount3.jpg"],
//     description:
//       "Hilltop villa offering breathtaking mountain views and luxury comfort.",
//     amenities: ["Fireplace", "WiFi", "Balcony", "Parking", "Security"],
//     rating: 4.9,
//   },
// ];

// /* ===============================
//    HELPER: GET EMOJI FOR AMENITY
// =============================== */
// const getAmenityEmoji = (amenity) => {
//   const lower = amenity.toLowerCase();
//   if (lower.includes("wifi")) return "📶";
//   if (lower.includes("ac")) return "❄️";
//   if (lower.includes("pool")) return "🏊";
//   if (lower.includes("parking")) return "🚗";
//   if (lower.includes("garden")) return "🌳";
//   if (lower.includes("sea") || lower.includes("beach")) return "🏖️";
//   if (lower.includes("kitchen") || lower.includes("catering")) return "🍳";
//   if (lower.includes("sound") || lower.includes("speaker")) return "🔊";
//   if (lower.includes("security")) return "🛡️";
//   if (lower.includes("tv") || lower.includes("projector")) return "📺";
//   if (lower.includes("fire")) return "🔥";
//   if (lower.includes("boat")) return "🚤";
//   return "✨"; // Default
// };

// /* ===============================
//    MAIN COMPONENT
// =============================== */
// export default function Prerentdetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setMounted(true); // Triggers the fade-in animation
//   }, []);

//   const property = properties.find((item) => item.id === Number(id));

//   if (!property) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#6b7280" }}>
//         <h2>Property Not Found</h2>
//       </div>
//     );
//   }

//   /* ===============================
//      STYLES
//   =============================== */
//   const styles = {
//     page: {
//       background: "#f8fafc",
//       minHeight: "100vh",
//       fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
//       color: "#1e293b",
//       paddingBottom: 80,
//       opacity: mounted ? 1 : 0,
//       transform: mounted ? "translateY(0)" : "translateY(10px)",
//       transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
//     },
//     navBar: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       background: "rgba(255, 255, 255, 0.85)",
//       backdropFilter: "blur(12px)",
//       borderBottom: "1px solid #e2e8f0",
//       padding: "16px 0",
//       zIndex: 1000,
//     },
//     container: {
//       maxWidth: 1100,
//       margin: "0 auto",
//       padding: "0 24px",
//     },
//     backButton: {
//       border: "none",
//       background: "transparent",
//       color: "#64748b",
//       cursor: "pointer",
//       fontSize: 15,
//       fontWeight: 600,
//       padding: "8px 0",
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       transition: "color 0.2s",
//     },

//     // Header
//     headerSection: {
//       marginTop: 100,
//       marginBottom: 32,
//     },
//     title: {
//       fontSize: 34,
//       fontWeight: 800,
//       color: "#0f172a",
//       margin: "0 0 8px 0",
//       letterSpacing: "-0.02em",
//     },
//     location: {
//       fontSize: 16,
//       color: "#64748b",
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//     },

//     // Gallery
//     galleryGrid: {
//       display: "grid",
//       gridTemplateColumns: "2fr 1fr",
//       gap: 12,
//       height: 420,
//       borderRadius: 20,
//       overflow: "hidden",
//       marginBottom: 48,
//       boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//     },
//     mainImg: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//       cursor: "pointer",
//       transition: "transform 0.3s ease",
//     },
//     sideImgCol: {
//       display: "flex",
//       flexDirection: "column",
//       gap: 12,
//       height: "100%",
//     },
//     sideImg: {
//       width: "100%",
//       height: "calc(50% - 6px)",
//       objectFit: "cover",
//       cursor: "pointer",
//       transition: "opacity 0.2s",
//     },

//     // Content Layout
//     layout: {
//       display: "grid",
//       gridTemplateColumns: "minmax(0, 1.8fr) minmax(0, 1fr)",
//       gap: 48,
//       position: "relative",
//     },

//     // Left Side
//     section: {
//       marginBottom: 40,
//       borderBottom: "1px solid #e2e8f0",
//       paddingBottom: 40,
//     },
//     sectionTitle: {
//       fontSize: 22,
//       fontWeight: 700,
//       marginBottom: 20,
//       color: "#1e293b",
//     },
//     text: {
//       lineHeight: 1.7,
//       color: "#475569",
//       fontSize: 16,
//     },
//     amenitiesGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
//       gap: 16,
//     },
//     amenityCard: {
//       background: "#ffffff",
//       border: "1px solid #f1f5f9",
//       padding: "16px",
//       borderRadius: 16,
//       textAlign: "center",
//       boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//       transition: "transform 0.2s, box-shadow 0.2s",
//       cursor: "default",
//     },
//     amenityIcon: {
//       fontSize: 24,
//       marginBottom: 8,
//       display: "block",
//     },
//     amenityLabel: {
//       fontSize: 13,
//       fontWeight: 600,
//       color: "#334155",
//     },

//     // Right Side (Sticky Card)
//     sidebar: {
//       position: "sticky",
//       top: 100,
//       height: "fit-content",
//     },
//     card: {
//       background: "#fff",
//       border: "1px solid #e2e8f0",
//       borderRadius: 24,
//       padding: 24,
//       boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
//     },
//     priceRow: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "flex-end",
//       marginBottom: 24,
//     },
//     price: {
//       fontSize: 28,
//       fontWeight: 800,
//       color: "#0f172a",
//     },
//     period: {
//       fontSize: 15,
//       color: "#64748b",
//       fontWeight: 500,
//     },
//     ratingBadge: {
//         background: '#fef3c7',
//         color: '#b45309',
//         padding: '4px 8px',
//         borderRadius: 6,
//         fontSize: 13,
//         fontWeight: 700,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 4
//     },
//     form: {
//       display: "grid",
//       gap: 16,
//     },
//     inputGroup: {
//       background: "#fff",
//       border: "1px solid #cbd5e1",
//       borderRadius: 12,
//       overflow: "hidden",
//     },
//     row: {
//       display: "flex",
//       borderBottom: "1px solid #cbd5e1",
//     },
//     field: {
//       flex: 1,
//       padding: "10px 14px",
//       borderRight: "1px solid #cbd5e1",
//     },
//     label: {
//       display: "block",
//       fontSize: 10,
//       fontWeight: 700,
//       textTransform: "uppercase",
//       color: "#64748b",
//       marginBottom: 4,
//     },
//     input: {
//       width: "100%",
//       border: "none",
//       outline: "none",
//       fontSize: 14,
//       fontFamily: "inherit",
//       background: "transparent",
//       color: "#334155",
//     },
//     btn: {
//       width: "100%",
//       padding: "16px",
//       background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
//       color: "#fff",
//       border: "none",
//       borderRadius: 12,
//       fontSize: 16,
//       fontWeight: 600,
//       cursor: "pointer",
//       marginTop: 8,
//       transition: "transform 0.1s, opacity 0.2s",
//       boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
//     },
//     subtext: {
//       textAlign: "center",
//       fontSize: 13,
//       color: "#94a3b8",
//       marginTop: 16,
//     }
//   };

//   /* ===============================
//      INLINE CSS FOR RESPONSIVENESS & INTERACTION
//   =============================== */
//   const stylesCSS = `
//     .gallery-img:hover { transform: scale(1.02); }
//     .amenity-card:hover { transform: translateY(-3px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
//     .action-btn:hover { opacity: 0.95; }
//     .action-btn:active { transform: scale(0.98); }

//     @media (max-width: 900px) {
//       .content-layout { grid-template-columns: 1fr !important; }
//       .gallery-grid { height: 320px !important; }
//     }
//     @media (max-width: 600px) {
//       .gallery-grid { display: block !important; height: auto !important; }
//       .main-img { height: 240px !important; border-radius: 12px; margin-bottom: 12px; }
//       .side-img-col { display: none !important; }
//     }
//   `;

//   return (
//     <div style={styles.page}>
//       <style>{stylesCSS}</style>

//       {/* NAV */}
//       <nav style={styles.navBar}>
//         <div style={styles.container}>
//           <button style={styles.backButton} onClick={() => navigate(-1)}>
//             ← Back to Listings
//           </button>
//         </div>
//       </nav>

//       {/* MAIN CONTAINER */}
//       <div style={styles.container}>

//         {/* HEADER */}
//         <div style={styles.headerSection}>
//           <h1 style={styles.title}>{property.title}</h1>
//           <div style={styles.location}>
//             <span>📍</span> {property.location}
//           </div>
//         </div>

//         {/* GALLERY */}
//         <div style={styles.galleryGrid} className="gallery-grid">
//           <img 
//             src={property.gallery[0]} 
//             alt="Main" 
//             style={styles.mainImg} 
//             className="gallery-img main-img" 
//           />
//           <div style={styles.sideImgCol} className="side-img-col">
//             <img 
//               src={property.gallery[1] || property.image} 
//               alt="Side 1" 
//               style={styles.sideImg} 
//               className="gallery-img" 
//             />
//             <img 
//               src={property.gallery[2] || property.image} 
//               alt="Side 2" 
//               style={styles.sideImg} 
//               className="gallery-img" 
//             />
//           </div>
//         </div>

//         {/* CONTENT LAYOUT */}
//         <div style={styles.layout} className="content-layout">

//           {/* LEFT COLUMN */}
//           <div>
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>About this space</h3>
//               <p style={styles.text}>{property.description}</p>
//             </div>

//             <div style={{...styles.section, borderBottom: "none"}}>
//               <h3 style={styles.sectionTitle}>What this place offers</h3>
//               <div style={styles.amenitiesGrid}>
//                 {property.amenities.map((item, index) => (
//                   <div key={index} style={styles.amenityCard} className="amenity-card">
//                     <span style={styles.amenityIcon}>{getAmenityEmoji(item)}</span>
//                     <span style={styles.amenityLabel}>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN (STICKY) */}
//           <div style={styles.sidebar}>
//             <div style={styles.card}>
//               <div style={styles.priceRow}>
//                 <div>
//                   <span style={styles.price}>₹{property.price.toLocaleString()}</span>
//                   <span style={styles.period}> / {property.type}</span>
//                 </div>
//                 <div style={styles.ratingBadge}>
//                   <span>★</span> {property.rating}
//                 </div>
//               </div>

//               <div style={styles.form}>
//                 <div style={styles.inputGroup}>
//                   <div style={styles.row}>
//                     <div style={styles.field}>
//                       <label style={styles.label}>Check-in</label>
//                       <input type="date" style={styles.input} />
//                     </div>
//                     <div style={{...styles.field, borderRight: "none"}}>
//                       <label style={styles.label}>Time</label>
//                       <input type="time" style={styles.input} />
//                     </div>
//                   </div>
//                   <div style={{...styles.row, borderBottom: "none"}}>
//                     <div style={{...styles.field, borderRight: "none"}}>
//                       <label style={styles.label}>Guests</label>
//                       <select style={styles.input}>
//                         <option>1 Guest</option>
//                         <option>2 Guests</option>
//                         <option>3+ Guests</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <button style={styles.btn} className="action-btn">
//                   Reserve now
//                 </button>
//               </div>

//               <p style={styles.subtext}>You won't be charged yet</p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";

/* ===============================
   HELPER: GET EMOJI FOR AMENITY
=============================== */
const getAmenityEmoji = (amenity) => {
  const lower = amenity.toLowerCase();
  if (lower.includes("wifi")) return "📶";
  if (lower.includes("ac")) return "❄️";
  if (lower.includes("pool")) return "🏊";
  if (lower.includes("parking")) return "🚗";
  if (lower.includes("garden")) return "🌳";
  if (lower.includes("sea") || lower.includes("beach")) return "🏖️";
  if (lower.includes("kitchen") || lower.includes("catering")) return "🍳";
  if (lower.includes("sound")) return "🔊";
  if (lower.includes("security")) return "🛡️";
  if (lower.includes("tv") || lower.includes("projector")) return "📺";
  if (lower.includes("fire")) return "🔥";
  if (lower.includes("boat")) return "🚤";
  return "✨";
};

export default function Prerentdetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);

    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "#6b7280",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  /* ===============================
     STYLES (TAMARI SAME CSS)
  =============================== */
  const styles = {
    page: {
      background: "#f8fafc",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: "#1e293b",
      paddingBottom: 80,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    },
    navBar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e2e8f0",
      padding: "16px 0",
      zIndex: 1000,
    },
    container: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "0 24px",
    },
    backButton: {
      border: "none",
      background: "transparent",
      color: "#64748b",
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 600,
      padding: "8px 0",
    },
    headerSection: {
      marginTop: 100,
      marginBottom: 32,
    },
    title: {
      fontSize: 34,
      fontWeight: 800,
      color: "#0f172a",
      margin: "0 0 8px 0",
    },
    location: {
      fontSize: 16,
      color: "#64748b",
    },
    galleryGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 12,
      height: 420,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 48,
    },
    mainImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    sideImgCol: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    sideImg: {
      width: "100%",
      height: "calc(50% - 6px)",
      objectFit: "cover",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: "1.8fr 1fr",
      gap: 48,
    },
    section: {
      marginBottom: 40,
      borderBottom: "1px solid #e2e8f0",
      paddingBottom: 40,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 20,
    },
    text: {
      lineHeight: 1.7,
      color: "#475569",
      fontSize: 16,
    },
    amenitiesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
      gap: 16,
    },
    amenityCard: {
      background: "#ffffff",
      border: "1px solid #f1f5f9",
      padding: "16px",
      borderRadius: 16,
      textAlign: "center",
    },
    sidebar: {
      position: "sticky",
      top: 100,
      height: "fit-content",
    },
    card: {
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: 24,
      padding: 24,
    },
    price: {
      fontSize: 28,
      fontWeight: 800,
    },
    btn: {
      width: "100%",
      padding: "16px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      marginTop: 8,
    },
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navBar}>
        <div style={styles.container}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </nav>

      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h1 style={styles.title}>{property.title}</h1>
          <div style={styles.location}>📍 {property.location}</div>
        </div>

        <div style={styles.galleryGrid}>
          <img
            src={getImageUrl(property.image || (property.images && property.images[0]))}
            alt="Main"
            style={styles.mainImg}
          />
          <div style={styles.sideImgCol}>
            {/* Show up to 2 side images if available, otherwise hide the column or show placeholders */}
            {property.images && property.images.length > 1 ? (
              property.images.slice(1, 3).map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt="Side"
                  style={styles.sideImg}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073";
                  }}
                />
              ))
            ) : (
              // Fallback: show the main image again or a premium placeholder to keep layout balanced
              <>
                <img
                  src={getImageUrl(property.image)}
                  alt="Side 1"
                  style={styles.sideImg}
                />
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073"
                  alt="Side 2"
                  style={styles.sideImg}
                />
              </>
            )}
          </div>
        </div>

        <div style={styles.layout}>
          <div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>About this space</h3>
              <p style={styles.text}>{property.description}</p>
            </div>

            <div>
              <h3 style={styles.sectionTitle}>Amenities</h3>
              <div style={styles.amenitiesGrid}>
                {property.amenities?.map((item, index) => (
                  <div key={index} style={styles.amenityCard}>
                    {getAmenityEmoji(item)} {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.sidebar}>
            <div style={styles.card}>
              <div style={styles.price}>
                ₹{property.price} / {property.type}
              </div>

              <button
                style={styles.btn}
                onClick={() => {
                  if (property && property._id) {
                    navigate(`/book-rental-appointment/${property._id}`);
                  } else {
                    alert("Property ID missing! Cannot proceed to reservation.");
                  }
                }}
              >
                📅 Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}