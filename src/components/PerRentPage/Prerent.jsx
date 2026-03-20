// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getImageUrl } from "../../config";

// export default function FlexibleRentPage() {
//   const [properties, setProperties] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("default");

//   const navigate = useNavigate();

//   /* ===============================
//      FETCH FROM BACKEND
//   =============================== */

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const res = await axios.get("/api/properties");

//       // ✅ Only PerRent Category
//       const perRentProperties = res.data.filter(
//         (item) => item.propertyType === "PerRent"
//       );

//       setProperties(perRentProperties);
//     } catch (err) {
//       console.error("Error fetching PerRent properties:", err);
//     }
//   };

//   /* ===============================
//      FILTER + SEARCH + SORT
//   =============================== */

//   let filtered = [...properties];

//   // Hour / Day / Week filter
//   if (filter !== "all") {
//     filtered = filtered.filter(
//       (p) => p.rentDuration?.toLowerCase() === filter
//     );
//   }

//   // Search
//   if (search) {
//     filtered = filtered.filter(
//       (p) =>
//         p.title?.toLowerCase().includes(search.toLowerCase()) ||
//         p.location?.toLowerCase().includes(search.toLowerCase())
//     );
//   }

//   // Sorting
//   if (sort === "low") {
//     filtered.sort((a, b) => a.price - b.price);
//   }

//   if (sort === "high") {
//     filtered.sort((a, b) => b.price - a.price);
//   }

//   const typeName = {
//     hour: "Hour",
//     day: "Day",
//     week: "Week",
//   };

//   /* ===============================
//      STYLES (SAME AS YOURS)
//   =============================== */

//   const styles = {
//     container: {
//       minHeight: "100vh",
//       fontFamily: "'Plus Jakarta Sans', sans-serif",
//       background: "#f8f9fc",
//       paddingBottom: 120,
//     },
//     hero: {
//       height: 380,
//       background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('Prerent.jpg') center/cover",
//       borderRadius: "0 0 48px 48px",
//       position: "relative",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#fff",
//       marginBottom: -60,
//       zIndex: 1,
//     },
//     heroText: {
//       textAlign: "center",
//       maxWidth: 800,
//       padding: 20,
//     },
//     heroTitle: {
//       fontSize: 52,
//       fontWeight: 800,
//       marginBottom: 16,
//       letterSpacing: "-0.02em",
//     },
//     heroSub: {
//       fontSize: 20,
//       opacity: 0.9,
//       fontWeight: 500,
//     },
//     controls: {
//       maxWidth: 1200,
//       margin: "0 auto 40px",
//       padding: "24px",
//       display: "flex",
//       flexWrap: "wrap",
//       gap: 20,
//       justifyContent: "space-between",
//       alignItems: "center",
//       background: "white",
//       borderRadius: "24px",
//       boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
//       position: "relative",
//       zIndex: 10,
//     },
//     search: {
//       padding: "14px 20px",
//       borderRadius: "14px",
//       border: "1px solid #e2e8f0",
//       minWidth: 300,
//       fontSize: 15,
//       background: "#f8fafc",
//       color: "#1e293b",
//       outline: "none",
//     },
//     select: {
//       padding: "14px 20px",
//       borderRadius: "14px",
//       border: "1px solid #e2e8f0",
//       cursor: "pointer",
//       background: "#f8fafc",
//       color: "#1e293b",
//       fontWeight: "600",
//     },
//     filters: {
//       display: "flex",
//       gap: 12,
//       flexWrap: "wrap",
//     },
//     filterBtn: (active) => ({
//       padding: "12px 24px",
//       borderRadius: "12px",
//       border: "none",
//       background: active ? "#1e293b" : "#f1f5f9",
//       color: active ? "#fff" : "#64748b",
//       cursor: "pointer",
//       fontWeight: 700,
//       transition: "0.3s",
//       fontSize: "14px",
//     }),
//     grid: {
//       maxWidth: 1240,
//       margin: "auto",
//       padding: "0 20px",
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
//       gap: 32,
//     },
//     empty: {
//       textAlign: "center",
//       padding: 100,
//       color: "#94a3b8",
//       fontSize: 20,
//       fontWeight: "600",
//     },
//   };

//   const PropertyCard = ({ item }) => {
//     const beds = item.bedrooms || 6;
//     const baths = item.bathrooms || 3;
//     const sqftVal = item.sqft || 1400;

//     return (
//       <div className="premium-card">
//         <div className="premium-card-img-container">
//           <img 
//             src={getImageUrl(item.image) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"} 
//             alt={item.title} 
//             className="premium-card-img" 
//           />
//         </div>

//         <div className="premium-card-content">
//           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
//             <div>
//               <h3 className="premium-card-title">{item.title}</h3>
//               <div className="premium-card-location">
//                 {item.city || item.location || "Midtown West, New York"}
//               </div>
//             </div>
//             <div className="premium-card-price">
//               ₹{item.price?.toLocaleString()}
//               <div className="invest-badge">Rent</div>
//             </div>
//           </div>

//           <div className="premium-card-stats">
//             <div className="p-stat">
//               <span className="p-stat-icon">📅</span>
//               <div className="p-stat-info">
//                 <span className="p-stat-label">Year Built</span>
//                 <span className="p-stat-val">2020</span>
//               </div>
//             </div>
//             <div className="p-stat">
//               <span className="p-stat-icon">🛏️</span>
//               <div className="p-stat-info">
//                 <span className="p-stat-label">Rooms</span>
//                 <span className="p-stat-val">{beds}</span>
//               </div>
//             </div>
//             <div className="p-stat">
//               <span className="p-stat-icon">🏠</span>
//               <div className="p-stat-info">
//                 <span className="p-stat-label">House Area</span>
//                 <span className="p-stat-val">{sqftVal} m²</span>
//               </div>
//             </div>
//           </div>

//           <button
//             className="premium-view-btn"
//             onClick={() => navigate(`/prerentdetails/${item._id}`)}
//           >
//             View Space Details
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         @media (max-width: 768px) {
//           .prerent-grid { grid-template-columns: 1fr !important; }
//           .prerent-controls { flex-direction: column !important; align-items: stretch !important; }
//           .prerent-hero h1 { fontSize: 36px !important; }
//         }

//         .premium-card {
//           background: white;
//           border-radius: 32px;
//           overflow: hidden;
//           box-shadow: 0 4px 25px rgba(0,0,0,0.03);
//           transition: transform 0.4s ease, box-shadow 0.4s ease;
//           border: 1px solid #f1f5f9;
//         }

//         .premium-card:hover {
//           transform: translateY(-12px);
//           box-shadow: 0 20px 60px rgba(0,0,0,0.08);
//         }

//         .premium-card-img-container {
//           height: 280px;
//           overflow: hidden;
//         }

//         .premium-card-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.6s ease;
//         }

//         .premium-card:hover .premium-card-img {
//           transform: scale(1.08);
//         }

//         .premium-card-content {
//           padding: 32px;
//         }

//         .premium-card-title {
//           font-size: 22px;
//           font-weight: 800;
//           color: #1e293b;
//           margin: 0 0 8px 0;
//           letter-spacing: -0.01em;
//         }

//         .premium-card-location {
//           font-size: 14px;
//           color: #94a3b8;
//           font-weight: 500;
//         }

//         .premium-card-price {
//           font-size: 24px;
//           font-weight: 900;
//           color: #1e293b;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//           gap: 6px;
//         }

//         .invest-badge {
//           font-size: 11px;
//           font-weight: 800;
//           background: #1e293b;
//           color: white;
//           padding: 4px 12px;
//           border-radius: 8px;
//           text-transform: uppercase;
//         }

//         .premium-card-stats {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 16px;
//           margin: 24px 0 32px;
//           padding: 20px;
//           background: #f8fafc;
//           border-radius: 20px;
//         }

//         .p-stat {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .p-stat-icon {
//           font-size: 18px;
//         }

//         .p-stat-info {
//           display: flex;
//           flex-direction: column;
//         }

//         .p-stat-label {
//           font-size: 10px;
//           font-weight: 700;
//           color: #94a3b8;
//           text-transform: uppercase;
//         }

//         .p-stat-val {
//           font-size: 14px;
//           font-weight: 800;
//           color: #1e293b;
//         }

//         .premium-view-btn {
//           width: 100%;
//           background: #1e293b;
//           color: white;
//           border: none;
//           padding: 16px;
//           border-radius: 16px;
//           font-weight: 700;
//           font-size: 15px;
//           cursor: pointer;
//           transition: background 0.3s;
//         }

//         .premium-view-btn:hover {
//           background: #334155;
//         }
//       `}</style>
//       <div style={styles.hero} className="prerent-hero">
//         <div style={styles.heroText}>
//           <h1 style={styles.heroTitle}>Short Stay Rentals</h1>
//           <p style={styles.heroSub}>
//             Book Hourly, Daily & Weekly Spaces Easily
//           </p>
//         </div>
//       </div>

//       <div style={styles.controls} className="prerent-controls">
//         <div style={styles.filters}>
//           {["all", "hour", "day", "week"].map((t) => (
//             <button
//               key={t}
//               style={styles.filterBtn(filter === t)}
//               onClick={() => setFilter(t)}
//             >
//               {t === "all" ? "All" : typeName[t]}
//             </button>
//           ))}
//         </div>

//         <div style={{ display: "flex", gap: 10 }}>
//           <input
//             style={styles.search}
//             placeholder="Search location or name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             style={styles.select}
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//           >
//             <option value="default">Sort</option>
//             <option value="low">Price: Low → High</option>
//             <option value="high">Price: High → Low</option>
//           </select>
//         </div>
//       </div>

//       {filtered.length === 0 ? (
//         <div style={styles.empty}>No properties found 😔</div>
//       ) : (
//         <div style={styles.grid} className="prerent-grid">
//           {filtered.map((item) => (
//             <PropertyCard key={item._id} item={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";

export default function FlexibleRentPage() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("/api/properties");
      const perRentProperties = res.data.filter(
        (item) => item.propertyType === "PerRent"
      );
      setProperties(perRentProperties);
    } catch (err) {
      console.error("Error fetching PerRent properties:", err);
    }
  };

  let filtered = [...properties];

  if (filter !== "all") {
    filtered = filtered.filter(
      (p) => p.rentDuration?.toLowerCase() === filter
    );
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  const typeName = { hour: "Hour", day: "Day", week: "Week" };

  const styles = {
    container: {
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#F5EDE6",
      paddingBottom: 120,
    },
    hero: {
      height: 380,
      background:
        "linear-gradient(160deg, rgba(76,51,36,0.72) 0%, rgba(98,123,104,0.65) 100%), url('Prerent.jpg') center/cover",
      borderRadius: "0 0 48px 48px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      marginBottom: -60,
      zIndex: 1,
    },
    heroText: {
      textAlign: "center",
      maxWidth: 800,
      padding: 20,
    },
    heroTitle: {
      fontSize: 52,
      fontWeight: 800,
      marginBottom: 16,
      letterSpacing: "-0.02em",
    },
    heroSub: {
      fontSize: 20,
      opacity: 0.88,
      fontWeight: 500,
    },
    controls: {
      maxWidth: 1200,
      margin: "0 auto 40px",
      padding: "24px",
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "space-between",
      alignItems: "center",
      background: "#FDFAF8",
      borderRadius: "24px",
      boxShadow: "0 10px 40px rgba(76,51,36,0.07)",
      position: "relative",
      zIndex: 10,
    },
    search: {
      padding: "14px 20px",
      borderRadius: "14px",
      border: "1.5px solid #E4CBB6",
      minWidth: 300,
      fontSize: 15,
      background: "#F5EDE6",
      color: "#4C3324",
      outline: "none",
    },
    select: {
      padding: "14px 20px",
      borderRadius: "14px",
      border: "1.5px solid #E4CBB6",
      cursor: "pointer",
      background: "#F5EDE6",
      color: "#4C3324",
      fontWeight: "600",
    },
    filters: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    filterBtn: (active) => ({
      padding: "12px 24px",
      borderRadius: "12px",
      border: "none",
      background: active
        ? "linear-gradient(135deg, #B2846B 0%, #627B68 100%)"
        : "#EDE3DB",
      color: active ? "#fff" : "#819B8B",
      cursor: "pointer",
      fontWeight: 700,
      transition: "0.3s",
      fontSize: "14px",
      boxShadow: active ? "0 6px 18px rgba(98,123,104,0.3)" : "none",
    }),
    grid: {
      maxWidth: 1240,
      margin: "auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
      gap: 32,
    },
    empty: {
      textAlign: "center",
      padding: 100,
      color: "#B2846B",
      fontSize: 20,
      fontWeight: "600",
    },
  };

  const PropertyCard = ({ item }) => {
    const beds = item.bedrooms || 6;
    const sqftVal = item.sqft || 1400;

    return (
      <div className="premium-card">
        <div className="premium-card-img-container">
          <img
            src={
              getImageUrl(item.image) ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
            }
            alt={item.title}
            className="premium-card-img"
          />
        </div>

        <div className="premium-card-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3 className="premium-card-title">{item.title}</h3>
              <div className="premium-card-location">
                {item.city || item.location || "Midtown West, New York"}
              </div>
            </div>
            <div className="premium-card-price">
              ₹{item.price?.toLocaleString()}
              <div className="invest-badge">Rent</div>
            </div>
          </div>

          <div className="premium-card-stats">
            <div className="p-stat">
              <span className="p-stat-icon">📅</span>
              <div className="p-stat-info">
                <span className="p-stat-label">Year Built</span>
                <span className="p-stat-val">2020</span>
              </div>
            </div>
            <div className="p-stat">
              <span className="p-stat-icon">🛏️</span>
              <div className="p-stat-info">
                <span className="p-stat-label">Rooms</span>
                <span className="p-stat-val">{beds}</span>
              </div>
            </div>
            <div className="p-stat">
              <span className="p-stat-icon">🏠</span>
              <div className="p-stat-info">
                <span className="p-stat-label">House Area</span>
                <span className="p-stat-val">{sqftVal} m²</span>
              </div>
            </div>
          </div>

          <button
            className="premium-view-btn"
            onClick={() => navigate(`/prerentdetails/${item._id}`)}
          >
            View Space Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @media (max-width: 768px) {
          .prerent-grid { grid-template-columns: 1fr !important; }
          .prerent-controls { flex-direction: column !important; align-items: stretch !important; }
        }

        .premium-card {
          background: #FDFAF8;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 4px 25px rgba(76,51,36,0.06);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid #E4CBB6;
        }

        .premium-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(76,51,36,0.13);
        }

        .premium-card-img-container {
          height: 280px;
          overflow: hidden;
        }

        .premium-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          filter: sepia(0.1);
        }

        .premium-card:hover .premium-card-img {
          transform: scale(1.08);
        }

        .premium-card-content {
          padding: 32px;
        }

        .premium-card-title {
          font-size: 22px;
          font-weight: 800;
          color: #4C3324;
          margin: 0 0 8px 0;
          letter-spacing: -0.01em;
        }

        .premium-card-location {
          font-size: 14px;
          color: #819B8B;
          font-weight: 500;
        }

        .premium-card-price {
          font-size: 24px;
          font-weight: 900;
          color: #4C3324;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .invest-badge {
          font-size: 11px;
          font-weight: 800;
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .premium-card-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 24px 0 32px;
          padding: 20px;
          background: #F5EDE6;
          border-radius: 20px;
        }

        .p-stat {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .p-stat-icon {
          font-size: 18px;
        }

        .p-stat-info {
          display: flex;
          flex-direction: column;
        }

        .p-stat-label {
          font-size: 10px;
          font-weight: 700;
          color: #819B8B;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .p-stat-val {
          font-size: 14px;
          font-weight: 800;
          color: #4C3324;
        }

        .premium-view-btn {
          width: 100%;
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: opacity 0.3s, transform 0.2s;
          box-shadow: 0 10px 24px rgba(98,123,104,0.3);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .premium-view-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>

      <div style={styles.hero} className="prerent-hero">
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Short Stay Rentals</h1>
          <p style={styles.heroSub}>Book Hourly, Daily & Weekly Spaces Easily</p>
        </div>
      </div>

      <div style={styles.controls} className="prerent-controls">
        <div style={styles.filters}>
          {["all", "hour", "day", "week"].map((t) => (
            <button
              key={t}
              style={styles.filterBtn(filter === t)}
              onClick={() => setFilter(t)}
            >
              {t === "all" ? "All" : typeName[t]}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            style={styles.search}
            placeholder="Search location or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            style={styles.select}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>No properties found 😔</div>
      ) : (
        <div style={styles.grid} className="prerent-grid">
          {filtered.map((item) => (
            <PropertyCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
