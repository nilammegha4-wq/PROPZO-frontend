import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getImageUrl } from "../../../config";

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      const data = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    const token = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");

    await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchProperties();
  };

  const handleEdit = (id) => {
    navigate(`/admin/properties/edit/${id}`);
  };

  const filteredProperties = properties.filter((p) => {
    const categoryMatch = filter === "All" || p.category === filter;
    const query = searchQuery.toLowerCase();
    const searchMatch = !searchQuery ||
      p.title?.toLowerCase()?.includes(query) ||
      p.location?.toLowerCase()?.includes(query) ||
      p.type?.toLowerCase()?.includes(query);
    return categoryMatch && searchMatch;
  });

  // Earthy category badge colors
  const categoryColors = {
    Buy: { bg: "rgba(178, 132, 107, 0.1)", color: "#b2846b" }, // Brand Tan
    Rent: { bg: "rgba(129, 155, 139, 0.1)", color: "#819b8b" }, // Brand Sage Light
    PerRent: { bg: "rgba(228, 203, 182, 0.2)", color: "#4c3324" }, // Brand Brown
    default: { bg: "#f9f6f1", color: "#627b68" },
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  };

  if (loading)
    return (
      <div style={loaderWrap}>
        <div style={spinner}></div>
        <p style={{ color: "#627b68", marginTop: 16, fontFamily: "'DM Sans', sans-serif" }}>
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
          Loading properties...
        </p>
        <style>{spinnerStyle}</style>
      </div>
    );

  return (
    <>
      <style>{`
        ${globalStyles}
        @media (max-width: 991px) {
          .prop-container { padding: 30px 20px !important; }
          .prop-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .prop-actions { width: 100% !important; justify-content: space-between !important; }
        }
        @media (max-width: 768px) {
          .prop-grid { grid-template-columns: 1fr !important; }
          .prop-tabs { overflow-x: auto !important; width: 100% !important; display: flex !important; }
          .prop-tabs button { flex-shrink: 0 !important; }
        }
        @media (max-width: 480px) {
          .prop-title { font-size: 28px !important; }
          .prop-actions { flex-direction: column !important; align-items: flex-start !important; }
          .prop-filter-wrap, .prop-add-btn { width: 100% !important; }
          .prop-select { width: 100% !important; }
        }
      `}</style>
      <div style={styles.page}>
        {/* Sidebar accent */}
        <div style={styles.accentBar} />

        <div style={styles.container} className="prop-container">
          {/* Header */}
          <div style={styles.header} className="prop-header">
            <div>
              <p style={styles.breadcrumb}>Admin / Listings</p>
              <h1 style={styles.title} className="prop-title">Properties</h1>
              <p style={styles.subtitle}>
                {filteredProperties.length} propert{filteredProperties.length !== 1 ? "ies" : "y"} found
              </p>
            </div>

            <div style={styles.actions} className="prop-actions">
              <div style={styles.filterWrap} className="prop-filter-wrap">
                <span style={styles.filterIcon}>⊟</span>
                <select
                  style={styles.select}
                  className="prop-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="PerRent">Per Rent</option>
                </select>
              </div>

              <button
                style={styles.addBtn}
                className="prop-add-btn"
                onClick={() => navigate("/admin/properties/add")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4c3324";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(76,51,36,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#627b68";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(98,123,104,0.2)";
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                }}
              >
                + Add Property
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={styles.tabRow} className="prop-tabs">
            {["All", "Buy", "Rent", "PerRent"].map((tab) => (
              <button
                key={tab}
                style={{
                  ...styles.tab,
                  ...(filter === tab ? styles.tabActive : {}),
                }}
                onClick={() => setFilter(tab)}
              >
                {tab === "PerRent" ? "Per Rent" : tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredProperties.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🏘️</div>
              <p style={styles.emptyText}>No properties found in this category.</p>
            </div>
          ) : (
            <div style={styles.grid} className="prop-grid">
              {filteredProperties.map((property, i) => {
                const badge = categoryColors[property.category] || categoryColors.default;
                return (
                  <div
                    key={property._id}
                    style={{ ...styles.card, animationDelay: `${i * 60}ms` }}
                    className="prop-card"
                  >
                    {/* Card top accent */}
                    <div style={styles.cardTopBar} />

                    {/* Property Image */}
                    <div style={styles.imageSection}>
                      <img
                        src={getImageUrl(property.image || (property.images && property.images[0]))}
                        alt={property.title}
                        style={styles.propertyImg}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073";
                        }}
                      />
                    </div>

                    <div style={styles.cardBody}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={styles.propertyTitle}>{property.title}</h3>
                        <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
                          {property.category}
                        </span>
                      </div>

                      <p style={styles.price}>{property.displayPrice}</p>

                      <div style={styles.meta}>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>📍</span> {property.location}
                        </span>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>🏠</span> {property.type}
                        </span>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>👤</span> Seller: {property.owner?.name || "N/A"}
                        </span>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>📅</span> Listed: {new Date(property.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div style={styles.cardFooter}>
                      <button
                        onClick={() => handleEdit(property._id)}
                        style={{
                          ...styles.editBtn,
                          color: "#627b68",
                          background: "rgba(98, 123, 104, 0.1)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#627b68";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(98, 123, 104, 0.1)";
                          e.currentTarget.style.color = "#627b68";
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(property._id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#b85c3a";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f9ede8";
                          e.currentTarget.style.color = "#b85c3a";
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const loaderWrap = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "#f9f6f1",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
};

const spinner = {
  width: 40,
  height: 40,
  border: "4px solid rgba(98, 123, 104, 0.2)",
  borderTop: "4px solid #627b68",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const spinnerStyle = `
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700&display=swap');

  .prop-card {
    animation: fadeUp 0.4s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .prop-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 20px 40px rgba(76, 51, 36, 0.1) !important;
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  }
`;

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f9f6f1 0%, #ffffff 60%, #f4f1eb 100%)",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    fontFamily: "'DM Sans', sans-serif",
  },
  accentBar: {
    width: 5,
    background: "linear-gradient(180deg, #627b68 0%, #819b8b 100%)",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    flexShrink: 0,
  },
  container: {
    flex: 1,
    padding: "48px 52px",
    maxWidth: 1300,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#b2846b",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    color: "#4c3324",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 14,
    color: "#7a5c4a",
    marginTop: 6,
  },
  actions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  filterWrap: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: "1.5px solid #d9c8bb",
    borderRadius: 10,
    padding: "0 14px",
    gap: 8,
    height: 44,
    boxShadow: "0 1px 4px rgba(76,51,36,0.06)",
  },
  filterIcon: {
    color: "#b2998a",
    fontSize: 16,
  },
  select: {
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#4C3324",
    background: "transparent",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    paddingRight: 4,
  },
  addBtn: {
    background: "#627b68",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    color: "#fff",
    padding: "0 22px",
    height: 44,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.01em",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(98, 123, 104, 0.2)",
  },

  tabRow: {
    display: "flex",
    gap: 6,
    marginBottom: 32,
    background: "#fff",
    padding: 6,
    borderRadius: 12,
    width: "fit-content",
    boxShadow: "0 1px 6px rgba(76,51,36,0.07)",
    border: "1px solid #e8ddd5",
  },
  tab: {
    padding: "8px 20px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    color: "#7a5c4a",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  tabActive: {
    background: "#627b68",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(98, 123, 104, 0.2)",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(76, 51, 36, 0.06)",
    border: "1px solid rgba(228, 203, 182, 0.3)",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  imageSection: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
    position: "relative",
    background: "#f0e8e0",
  },
  propertyImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  cardTopBar: {
    height: 4,
    background: "linear-gradient(90deg, #627b68, #819b8b)",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  cardBody: {
    padding: "22px 22px 16px",
    flex: 1,
  },
  propertyTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#4c3324",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    margin: 0,
    fontFamily: "'Sora', sans-serif",
    flex: 1,
    paddingRight: 10,
    lineHeight: 1.3,
  },
  price: {
    fontSize: 22,
    fontWeight: 700,
    color: "#b2846b",
<<<<<<< HEAD
=======

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    margin: "12px 0 14px",
    fontFamily: "'Sora', sans-serif",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  metaItem: {
    fontSize: 13,
    color: "#7a5c4a",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: {
    fontSize: 14,
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.03em",
    flexShrink: 0,
    marginTop: 2,
  },
  cardFooter: {
    display: "flex",
    gap: 10,
    padding: "14px 22px 20px",
    borderTop: "1px solid #f0e8e0",
  },
  editBtn: {
    flex: 1,
    padding: "9px 0",
    borderRadius: 9,
    border: "1.5px solid #627B68",
    cursor: "pointer",
    background: "#eef2ee",
    color: "#627B68",
    fontWeight: 600,
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  deleteBtn: {
    flex: 1,
    padding: "9px 0",
    borderRadius: 9,
    border: "1.5px solid #b85c3a",
    cursor: "pointer",
    background: "#f9ede8",
    color: "#b85c3a",
    fontWeight: 600,
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  empty: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#a89385",
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 500,
  },
};

export default Properties;
