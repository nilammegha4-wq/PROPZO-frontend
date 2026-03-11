import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../config";

/* =======================
   MAIN COMPONENT
======================= */
export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    budget: "",
    search: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");

      // ✅ Only Buy Category Properties
      const buyProperties = response.data.filter(
        (item) => item.propertyType === "Buy"
      );

      setProperties(buyProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  /* ✅ FILTER LOGIC */
  const filteredProperties = properties.filter((p) => {
    return (
      (!filters.type || p.type === filters.type) &&
      (!filters.city ||
        p.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
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
        * { box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
        body { margin: 0; background: #f5f6f7; }
        .container { width: 90%; max-width: 1200px; margin: auto; }

        .property-hero {
          height: 55vh;
          background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
            url("https://images.unsplash.com/photo-1568605114967-8130f3a36994")
              center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }

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
          outline: none;
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
          transition: .35s ease;
          box-shadow: 0 15px 40px rgba(0,0,0,.1);
        }

        .property-card:hover {
          transform: translateY(-10px) scale(1.02);
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
          font-size: 1.3rem;
          font-weight: bold;
        }

        .property-btn {
          margin-top: 18px;
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          border: none;
          background: #111;
          color: white;
          cursor: pointer;
          transition: .3s;
        }

        .property-btn:hover {
          background: #d4af37;
          color: #111;
        }
      `}</style>

      <section className="property-hero">
        <div>
          <h1>Explore Properties</h1>
          <p>Premium homes curated by Propzo</p>
        </div>
      </section>

      <div className="container">
        <div className="filter-bar">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>

          <input
            placeholder="City..."
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />

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
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
        </div>

        <div className="property-grid">
          {filteredProperties.map((p) => (
            <PropertyCard key={p._id} {...p} />
          ))}
        </div>
      </div>
    </>
  );
}

/* =======================
   CARD COMPONENT
======================= */
const PropertyCard = (props) => {
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
        {props.propertyType || "Buy"}
      </div>
      <div
        className="property-image"
        style={{
          backgroundImage: `url(${getImageUrl(props.image)})`,
        }}
      />
      <div className="property-content">
        <div className="property-price">{props.displayPrice}</div>
        <h4>{props.title}</h4>
        <p>📍 {props.city || props.location}</p>
        <button
          className="property-btn"
          onClick={() => navigate(`/property/${props._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};