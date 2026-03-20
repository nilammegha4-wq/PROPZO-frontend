// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getImageUrl } from "../../config";

// export default function RentPage() {
//   const [rentData, setRentData] = useState([]);
//   const [filters, setFilters] = useState({
//     type: "",
//     city: "",
//     budget: "",
//     search: "",
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     // 🔥 Fetch properties from backend
//     const fetchProperties = async () => {
//       try {
//         const res = await axios.get("/api/properties");

//         // ✅ Only Rent category properties
//         const rentProperties = res.data.filter(
//           (item) => item.propertyType === "Rent"
//         );

//         setRentData(rentProperties);
//       } catch (error) {
//         console.error("Error fetching rent properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   /* =======================
//      FILTER LOGIC (Same)
//   ======================= */
//   const filteredRent = rentData.filter((r) => {
//     const matchType = !filters.type || r.type === filters.type;
//     const matchCity = !filters.city || r.city === filters.city;
//     const matchSearch =
//       !filters.search ||
//       r.title?.toLowerCase().includes(filters.search.toLowerCase());

//     const matchBudget =
//       !filters.budget ||
//       (filters.budget === "low" && r.price < 50000) ||
//       (filters.budget === "mid" && r.price >= 50000 && r.price <= 100000) ||
//       (filters.budget === "high" && r.price > 100000);

//     return matchType && matchCity && matchBudget && matchSearch;
//   });

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
//         body { margin: 0; background: #f5f6f7; }
//         .container { width: 90%; max-width: 1200px; margin: auto; }

//         .hero {
//           height: 55vh;
//           background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),
//           url("https://images.unsplash.com/photo-1570129477492-45c003edd2be") center/cover;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           text-align: center;
//         }

//         .hero h1 { font-size: 3rem; }
//         .hero p { font-size: 1.2rem; }

//         .filter-bar {
//           background: white;
//           padding: 25px;
//           margin-top: -40px;
//           border-radius: 16px;
//           box-shadow: 0 15px 40px rgba(0,0,0,.12);
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 15px;
//         }

//         select, input {
//           padding: 12px;
//           border-radius: 10px;
//           border: 1px solid #ccc;
//         }

//         .property-grid {
//           margin: 80px auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
//           margin-bottom: 5px;
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

//       {/* HERO */}
//       <section className="hero">
//         <div>
//           <h1>Find Rental Homes</h1>
//           <p>Premium & affordable rentals curated for you</p>
//         </div>
//       </section>

//       <div className="container">
//         {/* FILTERS */}
//         <div className="filter-bar">
//           <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
//             <option value="">All Property Types</option>
//             <option value="Apartment">Apartment</option>
//             <option value="Villa">Villa</option>
//             <option value="House">House</option>
//             <option value="Penthouse">Penthouse</option>
//             <option value="Hall">Hall</option>
//           </select>

//           <select onChange={(e) => setFilters({ ...filters, city: e.target.value })}>
//             <option value="">All Cities</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Punjab">Punjab</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Gurgaon">Gurgaon</option>
//           </select>

//           <select onChange={(e) => setFilters({ ...filters, budget: e.target.value })}>
//             <option value="">All Budgets</option>
//             <option value="low">Under ₹50k</option>
//             <option value="mid">₹50k – ₹1L</option>
//             <option value="high">Above ₹1L</option>
//           </select>

//           <input
//             placeholder="Search property..."
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//           />
//         </div>

//         {/* CARDS */}
//         <div className="property-grid">
//           {filteredRent.map((r) => (
//             <RentCard key={r._id} {...r} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// /* =======================
//    RENT CARD
// ======================= */
// const RentCard = ({ _id, image, displayPrice, title, location, city, propertyType, bedrooms, bathrooms, sqft }) => {
//   const navigate = useNavigate();

//   // Fallbacks for missing stats
//   const beds = bedrooms || Math.floor(Math.random() * 3) + 2;
//   const baths = bathrooms || Math.floor(Math.random() * 2) + 1;
//   const sqftVal = sqft || (Math.floor(Math.random() * 20) + 10) * 100;

//   return (
//     <div className="card">
//       <div className="card-img-container">
//         <div className="card-badge">{propertyType || "Rent"}</div>
//         <img 
//           src={getImageUrl(image) || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"} 
//           alt={title} 
//           className="card-img" 
//         />
//       </div>

//       <div className="card-content">
//         <div className="card-location">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//             <circle cx="12" cy="10" r="3"></circle>
//           </svg>
//           {city || location || "Location unavailable"}
//         </div>

//         <h3 className="card-title">{title}</h3>

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
//               {/* SQFT */}
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-5.5 5.5a2.121 2.121 0 0 1-3 0L3.5 12.5a2.121 2.121 0 0 1 0-3L9 4a2.121 2.121 0 0 1 3 0l5.5 5.5a2.121 2.121 0 0 1 0 3Z"/><path d="m4.5 11.5 5.5-5.5"/><path d="m8.5 15.5 5.5-5.5"/></svg>
//             </span>
//             {sqftVal} SQ FT
//           </div>
//         </div>
//       </div>

//       <div className="card-footer">
//         <div className="card-price">{displayPrice}</div>
//         <button
//           className="card-btn"
//           onClick={() => navigate(`/rent/${_id}`)}
//         >
//           View Details →
//         </button>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";

export default function RentPage() {
  const [rentData, setRentData] = useState([]);
  const [filters, setFilters] = useState({ type: "", city: "", budget: "", search: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/properties");
        setRentData(res.data.filter((item) => item.propertyType === "Rent"));
      } catch (error) {
        console.error("Error fetching rent properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const filteredRent = rentData.filter((r) => {
    const matchType = !filters.type || r.type === filters.type;
    const matchCity = !filters.city || r.city === filters.city;
    const matchSearch = !filters.search || r.title?.toLowerCase().includes(filters.search.toLowerCase());
    const matchBudget =
      !filters.budget ||
      (filters.budget === "low" && r.price < 50000) ||
      (filters.budget === "mid" && r.price >= 50000 && r.price <= 100000) ||
      (filters.budget === "high" && r.price > 100000);
    return matchType && matchCity && matchBudget && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        body { margin: 0; background: #F5EDE6; }
        .container { width: 90%; max-width: 1200px; margin: auto; }

        /* ===== HERO ===== */
        .hero {
          height: 55vh;
          background:
            linear-gradient(160deg, rgba(76,51,36,0.65) 0%, rgba(98,123,104,0.55) 100%),
            url("https://images.unsplash.com/photo-1570129477492-45c003edd2be") center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F5EDE6;
          text-align: center;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #F5EDE6;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .hero p {
          font-size: 1.2rem;
          color: #E4CBB6;
          margin: 0;
          font-weight: 400;
        }

        /* ===== FILTER BAR ===== */
        .filter-bar {
          background: #FDFAF8;
          padding: 25px;
          margin-top: -40px;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(76,51,36,0.1);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          border: 1px solid #E4CBB6;
          position: relative;
          z-index: 10;
        }

        .filter-bar select,
        .filter-bar input {
          padding: 13px 14px;
          border-radius: 10px;
          border: 1.5px solid #E4CBB6;
          background: #F5EDE6;
          color: #4C3324;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .filter-bar select:focus,
        .filter-bar input:focus {
          border-color: #B2846B;
          box-shadow: 0 0 0 3px rgba(178,132,107,0.12);
        }

        .filter-bar input::placeholder { color: #819B8B; }

        /* ===== GRID ===== */
        .property-grid {
          margin: 80px auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

        .card:hover .card-img { transform: scale(1.05); }

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

      {/* HERO */}
      <section className="hero">
        <div>
          <h1>Find Rental Homes</h1>
          <p>Premium & affordable rentals curated for you</p>
        </div>
      </section>

      <div className="container">
        {/* FILTERS */}
        <div className="filter-bar">
          <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Hall">Hall</option>
          </select>

          <select onChange={(e) => setFilters({ ...filters, city: e.target.value })}>
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Punjab">Punjab</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>

          <select onChange={(e) => setFilters({ ...filters, budget: e.target.value })}>
            <option value="">All Budgets</option>
            <option value="low">Under ₹50k</option>
            <option value="mid">₹50k – ₹1L</option>
            <option value="high">Above ₹1L</option>
          </select>

          <input
            placeholder="Search property..."
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* CARDS */}
        <div className="property-grid">
          {filteredRent.map((r) => (
            <RentCard key={r._id} {...r} />
          ))}
        </div>
      </div>
    </>
  );
}

const RentCard = ({ _id, image, displayPrice, title, location, city, propertyType, bedrooms, bathrooms, sqft }) => {
  const navigate = useNavigate();
  const beds = bedrooms || Math.floor(Math.random() * 3) + 2;
  const baths = bathrooms || Math.floor(Math.random() * 2) + 1;
  const sqftVal = sqft || (Math.floor(Math.random() * 20) + 10) * 100;

  return (
    <div className="card">
      <div className="card-img-container">
        <div className="card-badge">{propertyType || "Rent"}</div>
        <img
          src={getImageUrl(image) || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"}
          alt={title}
          className="card-img"
        />
      </div>

      <div className="card-content">
        <div className="card-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {city || location || "Location unavailable"}
        </div>

        <h3 className="card-title">{title}</h3>

        <div className="card-stats">
          <div className="stat-item">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
              </svg>
            </span>
            {beds} Bed Room
          </div>
          <div className="stat-item">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M10 5h5a2 2 0 0 1 2 2v3M7 19v2M17 19v2" />
              </svg>
            </span>
            {baths} Bath
          </div>
          <div className="stat-item">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21 16-5.5 5.5a2.121 2.121 0 0 1-3 0L3.5 12.5a2.121 2.121 0 0 1 0-3L9 4a2.121 2.121 0 0 1 3 0l5.5 5.5a2.121 2.121 0 0 1 0 3Z" />
                <path d="m4.5 11.5 5.5-5.5" /><path d="m8.5 15.5 5.5-5.5" />
              </svg>
            </span>
            {sqftVal} SQ FT
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-price">{displayPrice}</div>
        <button className="card-btn" onClick={() => navigate(`/rent/${_id}`)}>
          View Details →
        </button>
      </div>
    </div>
  );
};
