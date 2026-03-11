import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";

export default function RentPage() {
  const [rentData, setRentData] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    budget: "",
    search: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // 🔥 Fetch properties from backend
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/properties");

        // ✅ Only Rent category properties
        const rentProperties = res.data.filter(
          (item) => item.propertyType === "Rent"
        );

        setRentData(rentProperties);
      } catch (error) {
        console.error("Error fetching rent properties:", error);
      }
    };

    fetchProperties();
  }, []);

  /* =======================
     FILTER LOGIC (Same)
  ======================= */
  const filteredRent = rentData.filter((r) => {
    const matchType = !filters.type || r.type === filters.type;
    const matchCity = !filters.city || r.city === filters.city;
    const matchSearch =
      !filters.search ||
      r.title?.toLowerCase().includes(filters.search.toLowerCase());

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
        * { box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
        body { margin: 0; background: #f5f6f7; }
        .container { width: 90%; max-width: 1200px; margin: auto; }

        .hero {
          height: 55vh;
          background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),
          url("https://images.unsplash.com/photo-1570129477492-45c003edd2be") center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }

        .hero h1 { font-size: 3rem; }
        .hero p { font-size: 1.2rem; }

        .filter-bar {
          background: white;
          padding: 25px;
          margin-top: -40px;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0,0,0,.12);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
        }

        select, input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        .property-grid {
          margin: 80px auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .property-card {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,.1);
          transition: .3s;
        }

        .property-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 55px rgba(0,0,0,.18);
        }

        .property-image {
          height: 210px;
          background-size: cover;
          background-position: center;
        }

        .property-content { padding: 22px; }
        .property-price {
          color: #d4af37;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .property-btn {
          margin-top: 15px;
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          border: none;
          background: #111;
          color: white;
          cursor: pointer;
        }

        .property-btn:hover {
          background: #d4af37;
          color: #111;
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

/* =======================
   RENT CARD
======================= */
const RentCard = ({ _id, image, displayPrice, title, location, city, propertyType }) => {
  const navigate = useNavigate();

  return (
    <div className="property-card" style={{ position: 'relative' }}>
      <div className="property-badge" style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        background: '#d4af37',
        color: '#111',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        zIndex: 1
      }}>
        {propertyType || "Rent"}
      </div>
      <div
        className="property-image"
        style={{ backgroundImage: `url(${getImageUrl(image)})` }}
      />
      <div className="property-content">
        <div className="property-price">{displayPrice}</div>
        <h4>{title}</h4>
        <p>📍 {city || location}</p>
        <button
          className="property-btn"
          onClick={() => navigate(`/rent/${_id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};