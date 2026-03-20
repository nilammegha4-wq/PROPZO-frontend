// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getImageUrl } from "../../config";

// /* =======================
//    MAIN COMPONENT
// ======================= */
// export default function Properties() {
//   const [properties, setProperties] = useState([]);
//   const [filters, setFilters] = useState({
//     type: "",
//     budget: "",
//     state: "", // We use State/Region instead of City for the "Area" dropdown
//     search: "",
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("/api/properties");

//       // ✅ Only Buy Category Properties
//       const buyProperties = response.data.filter(
//         (item) => item.propertyType === "Buy"
//       );

//       setProperties(buyProperties);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   /* ✅ FILTER LOGIC */
//   const filteredProperties = properties.filter((p) => {
//     return (
//       (!filters.type || p.type === filters.type) &&
//       (!filters.state ||
//         p.state?.toLowerCase().includes(filters.state.toLowerCase()) || 
//         p.city?.toLowerCase().includes(filters.state.toLowerCase())) &&
//       (!filters.budget ||
//         (filters.budget === "low" && p.price < 50) ||
//         (filters.budget === "mid" && p.price >= 50 && p.price <= 100) ||
//         (filters.budget === "high" && p.price > 100)) &&
//       (!filters.search ||
//         p.title?.toLowerCase().includes(filters.search.toLowerCase()))
//     );
//   });

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
//         body { margin: 0; background: #eef2f5; }
//         .page-wrapper {
//           padding-top: 30px;
//           min-height: 100vh;
//           background: #eef2f5;
//         }
//         .container { width: 90%; max-width: 1200px; margin: auto; }

//         /* =====================
//            HERO SECTION
//         ===================== */
//         .hero-banner {
//           position: relative;
//           width: 100%;
//           height: 55vh;
//           overflow: hidden;
//         }

//         .hero-banner::before {
//           content: "";
//           position: absolute;
//           top: 0; left: 0; right: 0; bottom: 0;
//           background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
//           z-index: 1;
//         }

//         .hero-bg-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center;
//         }

//         .hero-content {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           z-index: 2;
//           text-align: center;
//           color: white;
//           width: 100%;
//           padding: 0 20px;
//         }

//         .hero-content h1 {
//           font-size: 3.5rem;
//           font-weight: 600;
//           margin: 0 0 10px 0;
//           line-height: 1.2;
//         }

//         .hero-content p {
//           font-size: 1.2rem;
//           margin: 0;
//           opacity: 0.9;
//         }

//         @media (max-width: 768px) {
//           .hero-content h1 {
//             font-size: 2.5rem;
//           }
//           .hero-banner {
//             height: 40vh;
//           }
//         }

//         /* =====================
//            SEARCH & FILTER BAR
//         ===================== */
//         .filter-bar {
//           position: relative;
//           z-index: 10;
//           margin: -40px auto 40px;
//           background: white;
//           padding: 25px;
//           border-radius: 16px;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.12);
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 15px;
//           width: 90%;
//           max-width: 1200px;
//         }

//         .filter-bar select, .filter-bar input {
//           width: 100%;
//           padding: 14px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           outline: none;
//           font-size: 0.95rem;
//           color: #333;
//           background: white;
//         }

//         .filter-bar select:focus, .filter-bar input:focus {
//           border-color: #6c757d;
//         }

//         /* =====================
//            PROPERTY GRID
//         ===================== */
//         .property-grid-wrapper {
//           padding: 60px 0 100px;
//         }

//         .property-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 30px;
//         }

//         /* =====================
//            CARD COMPONENT
//         ===================== */
//         .card {
//           background: white;
//           border-radius: 20px;
//           border: 1px solid #eaedf1;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.03);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//         }

//         .card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.08);
//         }

//         .card-img-container {
//           position: relative;
//           width: 100%;
//           height: 240px;
//           background: #f4f4f4;
//         }

//         .card-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//         }

//         .card:hover .card-img {
//           transform: scale(1.05);
//         }

//         .card-badge {
//           position: absolute;
//           top: 15px;
//           left: 15px;
//           background: white;
//           color: #111;
//           padding: 6px 14px;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: 700;
//           z-index: 2;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.1);
//         }

//         .card-content {
//           padding: 20px 20px 15px;
//           flex-grow: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         .card-location {
//           color: #888;
//           font-size: 0.85rem;
//           margin-bottom: 8px;
//           display: flex;
//           align-items: center;
//           gap: 5px;
//         }

//         .card-title {
//           font-size: 1.15rem;
//           font-weight: 700;
//           color: #111;
//           margin: 0 0 15px 0;
//           line-height: 1.3;
//         }

//         .card-stats {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 5px; /* Pushed bottom padding to footer */
//         }

//         .stat-item {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           color: #666;
//           font-size: 0.85rem;
//           font-weight: 500;
//         }

//         .stat-icon svg {
//           opacity: 0.6;
//         }

//         .card-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 18px 20px;
//           border-top: 1px solid #eaedf1;
//           background: #fafbfc;
//         }

//         .card-price {
//           font-size: 1.3rem;
//           font-weight: 800;
//           color: #111;
//         }

//         .card-btn {
//           background: #1e3a2f; /* Dark Green */
//           color: white;
//           border: none;
//           border-radius: 30px;
//           padding: 10px 20px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.3s;
//         }

//         .card-btn:hover {
//           background: #2a5243;
//         }
//       `}</style>

//       <div className="page-wrapper">
//         {/* HERO SECTION */}
//         <div className="hero-banner">
//           <img 
//             src="/1.jpg" 
//             alt="Beautiful Home" 
//             className="hero-bg-img"
//           />
//           <div className="hero-content">
//             <h1>Find Rental Homes</h1>
//             <p>Premium & affordable rentals curated for you</p>
//           </div>
//         </div>

//         {/* SEARCH BAR OVERLAP */}
//         <div className="filter-bar">
//           <select
//             value={filters.type}
//             onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//           >
//             <option value="">All Property Types</option>
//             <option value="Apartment">Apartment</option>
//             <option value="Villa">Villa</option>
//             <option value="House">House</option>
//             <option value="Duplex">Duplex</option>
//           </select>

//           <select
//             value={filters.state}
//             onChange={(e) => setFilters({ ...filters, state: e.target.value })}
//           >
//             <option value="">All Cities</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Pune">Pune</option>
//           </select>

//           <select
//             value={filters.budget}
//             onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
//           >
//             <option value="">All Budgets</option>
//             <option value="low">Under ₹50L</option>
//             <option value="mid">₹50L – ₹1Cr</option>
//             <option value="high">Above ₹1Cr</option>
//           </select>

//           <input
//             placeholder="Search property..."
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//           />
//         </div>

//         {/* PROPERTY GRID VIEW */}
//         <div className="property-grid-wrapper container">
//           <div className="property-grid">
//             {filteredProperties.map((p) => (
//               <PropertyCard key={p._id} {...p} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// /* =======================
//    CARD COMPONENT
// ======================= */
// const PropertyCard = (props) => {
//   const navigate = useNavigate();

//   // Fallbacks for missing stats
//   const beds = props.bedrooms || Math.floor(Math.random() * 3) + 2;
//   const baths = props.bathrooms || Math.floor(Math.random() * 2) + 1;
//   const sqft = props.sqft || (Math.floor(Math.random() * 20) + 10) * 100;

//   return (
//     <div className="card">
//       <div className="card-img-container">
//         <div className="card-badge">For Sale</div>
//         <img 
//           src={getImageUrl(props.image) || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"} 
//           alt={props.title} 
//           className="card-img" 
//         />
//       </div>

//       <div className="card-content">
//         <div className="card-location">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//             <circle cx="12" cy="10" r="3"></circle>
//           </svg>
//           {props.city || props.location || "Location unavailable"}
//         </div>

//         <h3 className="card-title">{props.title}</h3>

//         <div className="card-stats">
//           <div className="stat-item">
//             <span className="stat-icon">
//               {/* Bed Icon */}
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>
//             </span>
//             {beds} Bed Room
//           </div>
//           <div className="stat-item">
//             <span className="stat-icon">
//               {/* Bath Icon */}
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M10 5h5a2 2 0 0 1 2 2v3M7 19v2M17 19v2"/></svg>
//             </span>
//             {baths} Bath
//           </div>
//           <div className="stat-item">
//             <span className="stat-icon">
//               {/* SQFT / Ruler Icon */}
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-5.5 5.5a2.121 2.121 0 0 1-3 0L3.5 12.5a2.121 2.121 0 0 1 0-3L9 4a2.121 2.121 0 0 1 3 0l5.5 5.5a2.121 2.121 0 0 1 0 3Z"/><path d="m4.5 11.5 5.5-5.5"/><path d="m8.5 15.5 5.5-5.5"/></svg>
//             </span>
//             {sqft} SQ FT
//           </div>
//         </div>
//       </div>

//       <div className="card-footer">
//         <div className="card-price">{props.displayPrice}</div>
//         <button
//           className="card-btn"
//           onClick={() => navigate(`/property/${props._id}`)}
//         >
//           View Details →
//         </button>
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../config";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    budget: "",
    state: "",
    search: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");
      const buyProperties = response.data.filter(
        (item) => item.propertyType === "Buy"
      );
      setProperties(buyProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const filteredProperties = properties.filter((p) => {
    return (
      (!filters.type || p.type === filters.type) &&
      (!filters.state ||
        p.state?.toLowerCase().includes(filters.state.toLowerCase()) ||
        p.city?.toLowerCase().includes(filters.state.toLowerCase())) &&
      (!filters.budget ||
        (filters.budget === "low" && p.price < 50) ||
        (filters.budget === "mid" && p.price >= 50 && p.price <= 100) ||
        (filters.budget === "high" && p.price > 100)) &&
      (!filters.search ||
        p.title?.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        body { margin: 0; background: #F5EDE6; }

        .page-wrapper {
          padding-top: 30px;
          min-height: 100vh;
          background: #F5EDE6;
        }

        .container { width: 90%; max-width: 1200px; margin: auto; }

        /* ===== HERO ===== */
        .hero-banner {
          position: relative;
          width: 100%;
          height: 55vh;
          overflow: hidden;
        }

        .hero-banner::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(160deg, rgba(76,51,36,0.65) 0%, rgba(98,123,104,0.55) 100%);
          z-index: 1;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: sepia(0.15);
        }

        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          text-align: center;
          color: #F5EDE6;
          width: 100%;
          padding: 0 20px;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          line-height: 1.2;
          color: #F5EDE6;
          letter-spacing: -0.02em;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin: 0;
          opacity: 0.88;
          color: #E4CBB6;
        }

        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.5rem; }
          .hero-banner { height: 40vh; }
        }

        /* ===== FILTER BAR ===== */
        .filter-bar {
          position: relative;
          z-index: 10;
          margin: -40px auto 40px;
          background: #FDFAF8;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(76,51,36,0.1);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          width: 90%;
          max-width: 1200px;
          border: 1px solid #E4CBB6;
        }

        .filter-bar select,
        .filter-bar input {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: 1.5px solid #E4CBB6;
          outline: none;
          font-size: 0.95rem;
          color: #4C3324;
          background: #F5EDE6;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .filter-bar select:focus,
        .filter-bar input:focus {
          border-color: #B2846B;
          box-shadow: 0 0 0 3px rgba(178,132,107,0.12);
        }

        .filter-bar input::placeholder {
          color: #819B8B;
        }

        /* ===== PROPERTY GRID ===== */
        .property-grid-wrapper {
          padding: 60px 0 100px;
        }

        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        /* ===== CARD ===== */
        .card {
          background: #FDFAF8;
          border-radius: 20px;
          border: 1px solid #E4CBB6;
          box-shadow: 0 10px 30px rgba(76,51,36,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(76,51,36,0.12);
        }

        .card-img-container {
          position: relative;
          width: 100%;
          height: 240px;
          background: #E4CBB6;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          filter: sepia(0.08);
        }

        .card:hover .card-img {
          transform: scale(1.05);
        }

        .card-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #FDFAF8;
          color: #4C3324;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(76,51,36,0.12);
          border: 1px solid #E4CBB6;
        }

        .card-content {
          padding: 20px 20px 15px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-location {
          color: #819B8B;
          font-size: 0.85rem;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #4C3324;
          margin: 0 0 15px 0;
          line-height: 1.3;
        }

        .card-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #627B68;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .stat-icon svg {
          opacity: 0.75;
          stroke: #B2846B;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-top: 1px solid #E4CBB6;
          background: #F5EDE6;
        }

        .card-price {
          font-size: 1.3rem;
          font-weight: 800;
          color: #4C3324;
        }

        .card-btn {
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: #FDFAF8;
          border: none;
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 6px 16px rgba(98,123,104,0.3);
          font-family: 'DM Sans', sans-serif;
        }

        .card-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="page-wrapper">
        {/* HERO */}
        <div className="hero-banner">
          <img src="/1.jpg" alt="Beautiful Home" className="hero-bg-img" />
          <div className="hero-content">
            <h1>Explore Properties</h1>
            <p>Premium homes curated by Propzo</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Duplex">Duplex</option>
          </select>

          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          >
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
          </select>

          <select
            value={filters.budget}
            onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          >
            <option value="">All Budgets</option>
            <option value="low">Under ₹50L</option>
            <option value="mid">₹50L – ₹1Cr</option>
            <option value="high">Above ₹1Cr</option>
          </select>

          <input
            placeholder="Search property..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* PROPERTY GRID */}
        <div className="property-grid-wrapper container">
          <div className="property-grid">
            {filteredProperties.map((p) => (
              <PropertyCard key={p._id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const PropertyCard = (props) => {
  const navigate = useNavigate();
  const beds = props.bedrooms || Math.floor(Math.random() * 3) + 2;
  const baths = props.bathrooms || Math.floor(Math.random() * 2) + 1;
  const sqft = props.sqft || (Math.floor(Math.random() * 20) + 10) * 100;

  const beds = props.bedrooms || props.bhk || Math.floor(Math.random() * 3) + 2;
  const baths = props.bathrooms || Math.floor(Math.random() * 2) + 1;
  const sqft = props.area || props.sqft || (Math.floor(Math.random() * 20) + 10) * 100;

  return (
    <div className="card">
      <div className="card-img-container">
        <div className="card-badge">For Sale</div>
        <img
<<<<<<< HEAD
          src={getImageUrl(props.image) || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"}
=======
          src={getImageUrl(props.images?.[0] || props.image) || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"}
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
          alt={props.title}
          className="card-img"
        />
      </div>

      <div className="card-content">
        <div className="card-location">
<<<<<<< HEAD
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
=======
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {props.city || props.location || "Location unavailable"}
        </div>

        <h3 className="card-title">{props.title}</h3>

        <div className="card-stats">
          <div className="stat-item">
            <span className="stat-icon">
<<<<<<< HEAD
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
              </svg>
            </span>
            {beds} Bed Room
          </div>
          <div className="stat-item">
            <span className="stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M10 5h5a2 2 0 0 1 2 2v3M7 19v2M17 19v2" />
              </svg>
=======
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>
            </span>
            {beds} BHK
          </div>
          <div className="stat-item">
            <span className="stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M10 5h5a2 2 0 0 1 2 2v3M7 19v2M17 19v2"/></svg>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
            </span>
            {baths} Bath
          </div>
          <div className="stat-item">
            <span className="stat-icon">
<<<<<<< HEAD
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21 16-5.5 5.5a2.121 2.121 0 0 1-3 0L3.5 12.5a2.121 2.121 0 0 1 0-3L9 4a2.121 2.121 0 0 1 3 0l5.5 5.5a2.121 2.121 0 0 1 0 3Z" />
                <path d="m4.5 11.5 5.5-5.5" /><path d="m8.5 15.5 5.5-5.5" />
              </svg>
=======
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-5.5 5.5a2.121 2.121 0 0 1-3 0L3.5 12.5a2.121 2.121 0 0 1 0-3L9 4a2.121 2.121 0 0 1 3 0l5.5 5.5a2.121 2.121 0 0 1 0 3Z"/><path d="m4.5 11.5 5.5-5.5"/><path d="m8.5 15.5 5.5-5.5"/></svg>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
            </span>
            {sqft} SQ FT
          </div>
        </div>
      </div>

      <div className="card-footer">
<<<<<<< HEAD
        <div className="card-price">{props.displayPrice}</div>
=======
        <div className="card-price">{props.displayPrice || `₹${Number(props.price).toLocaleString('en-IN')}`}</div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        <button
          className="card-btn"
          onClick={() => navigate(`/property/${props._id}`)}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};
