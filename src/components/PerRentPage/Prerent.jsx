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

  /* ===============================
     FETCH FROM BACKEND
  =============================== */

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("/api/properties");

      // ✅ Only PerRent Category
      const perRentProperties = res.data.filter(
        (item) => item.propertyType === "PerRent"
      );

      setProperties(perRentProperties);
    } catch (err) {
      console.error("Error fetching PerRent properties:", err);
    }
  };

  /* ===============================
     FILTER + SEARCH + SORT
  =============================== */

  let filtered = [...properties];

  // Hour / Day / Week filter
  if (filter !== "all") {
    filtered = filtered.filter(
      (p) => p.rentDuration?.toLowerCase() === filter
    );
  }

  // Search
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sorting
  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const typeName = {
    hour: "Hour",
    day: "Day",
    week: "Week",
  };

  /* ===============================
     STYLES (SAME AS YOURS)
  =============================== */

  const styles = {
    container: {
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
      background: "#f9fafb",
      paddingBottom: 120,
    },
    hero: {
      height: 480,
      background: "url('Prerent.jpg') center/cover",
      borderRadius: "0 0 40px 40px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
    },
    heroOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.2))",
    },
    heroText: {
      position: "relative",
      textAlign: "center",
      maxWidth: 700,
      padding: 20,
    },
    heroTitle: {
      fontSize: 56,
      fontWeight: 700,
      marginBottom: 15,
    },
    heroSub: {
      fontSize: 20,
      opacity: 0.9,
    },
    controls: {
      maxWidth: 1200,
      margin: "40px auto",
      padding: "0 20px",
      display: "flex",
      flexWrap: "wrap",
      gap: 15,
      justifyContent: "space-between",
      alignItems: "center",
    },
    search: {
      padding: "12px 18px",
      borderRadius: 10,
      border: "1px solid #d1d5db",
      minWidth: 220,
      fontSize: 15,
    },
    select: {
      padding: "12px 15px",
      borderRadius: 10,
      border: "1px solid #d1d5db",
      cursor: "pointer",
    },
    filters: {
      display: "flex",
      gap: 15,
      flexWrap: "wrap",
    },
    filterBtn: (active) => ({
      padding: "10px 24px",
      borderRadius: 50,
      border: "1px solid #cbd5e1",
      background: active
        ? "linear-gradient(135deg,#4f46e5,#3b82f6)"
        : "#fff",
      color: active ? "#fff" : "#4f46e5",
      cursor: "pointer",
      fontWeight: 600,
    }),
    grid: {
      maxWidth: 1200,
      margin: "auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: 30,
    },
    card: (hover) => ({
      background: "#fff",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: hover
        ? "0 20px 50px rgba(0,0,0,.15)"
        : "0 10px 30px rgba(0,0,0,.08)",
      transform: hover ? "translateY(-8px)" : "translateY(0)",
      transition: "0.4s",
      cursor: "pointer",
      border: "1px solid #e5e7eb",
    }),
    cardImg: (hover) => ({
      width: "100%",
      height: 220,
      objectFit: "cover",
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "0.4s",
    }),
    badge: {
      position: "absolute",
      top: 15,
      left: 15,
      background: "#22c55e",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      zIndex: 1, // Ensure badge is above the image
    },
    cardBody: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: 170,
    },
    title: {
      fontSize: 20,
      fontWeight: 700,
    },
    location: {
      fontSize: 14,
      color: "#6b7280",
      margin: "6px 0",
    },
    price: {
      fontSize: 20,
      fontWeight: 700,
      color: "#4f46e5",
    },
    btn: {
      marginTop: 10,
      padding: 12,
      background: "linear-gradient(135deg,#4f46e5,#3b82f6)",
      border: "none",
      borderRadius: 10,
      color: "#fff",
      fontWeight: 600,
      cursor: "pointer",
    },
    empty: {
      textAlign: "center",
      padding: 60,
      color: "#6b7280",
      fontSize: 18,
    },
  };

  const PropertyCard = ({ item }) => {
    const [hover, setHover] = useState(false);

    return (
      <div
        style={styles.card(hover)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={{ position: "relative" }}>
          <div style={{
            ...styles.badge,
            background: '#4f46e5', // Theme color for PerRent
            left: 15,
            top: 15
          }}>
            {item.propertyType || "PerRent"}
          </div>

          <img
            src={getImageUrl(item.image)}
            alt={item.title}
            style={styles.cardImg(hover)}
          />
        </div>

        <div style={styles.cardBody}>
          <div>
            <h3 style={styles.title}>{item.title}</h3>
            <p style={styles.location}>📍 {item.city || item.location}</p>

            <div style={styles.price}>
              {item.displayPrice || `₹${item.price} / ${item.rentDuration}`}
            </div >
          </div >

          <button
            style={styles.btn}
            onClick={() => navigate(`/prerentdetails/${item._id}`)}
          >
            View Details
          </button>
        </div >
      </div >
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Short Stay Rentals</h1>
          <p style={styles.heroSub}>
            Book Hourly, Daily & Weekly Spaces Easily
          </p>
        </div>
      </div>

      <div style={styles.controls}>
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
        <div style={styles.grid}>
          {filtered.map((item) => (
            <PropertyCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}