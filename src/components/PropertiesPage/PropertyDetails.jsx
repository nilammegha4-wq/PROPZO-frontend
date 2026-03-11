import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../config";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowLeft, FaMapMarkerAlt, FaCheckCircle, FaBed, FaBath, FaRulerCombined, FaLayerGroup, FaParking, FaCompass, FaCouch, FaCalendarAlt, FaHistory, FaUserShield } from "react-icons/fa";

export default function PropertyDetails() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentImage, setCurrentImage] = useState(0);
  const [loan, setLoan] = useState(0);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  /* ================= FETCH PROPERTY ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`/api/properties/${id}`);
      setProperty(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  /* ================= EMI CALCULATION ================= */
  const r = rate / 12 / 100;
  const n = years * 12 || 1;
  const emi =
    r === 0
      ? loan / n
      : (loan * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

  /* ================= HANDLERS ================= */
  const handleAction = () => {
    if (property.category === "Buy") {
      if (!auth?.isLoggedIn) {
        navigate("/login", {
          replace: true,
          state: { from: `/book-appointment/${property._id}` },
        });
        return;
      }
      navigate(`/book-appointment/${property._id}`);
    } else {
      if (!auth?.isLoggedIn) {
        navigate("/login", {
          replace: true,
          state: { from: `/book-rental-appointment/${property._id}` },
        });
        return;
      }
      navigate(`/book-rental-appointment/${property._id}`);
    }
  };

  /* ================= IMAGE CONTROLS ================= */
  const nextImage = () => {
    if (!property?.images?.length) return;
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property?.images?.length) return;
    setCurrentImage(
      (prev) =>
        (prev - 1 + property.images.length) %
        property.images.length
    );
  };

  if (loading) return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p>Loading property details...</p>
    </div>
  );
  if (!property) return <h2 style={{ padding: 100, textAlign: 'center' }}>Property Not Found</h2>;

  const isRent = property.category === "Rent" || property.category === "PerRent" || property.category === "PreRent";

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      {/* IMAGE SLIDER */}
      {property.images && property.images.length > 0 && (
        <div style={styles.mediaSection}>
          <div style={styles.slider}>
            <img
              src={getImageUrl(property.images[currentImage])}
              alt={property.title}
              style={styles.sliderImg}
            />

            {property.images.length > 1 && (
              <>
                <button style={styles.leftArrow} onClick={prevImage}>‹</button>
                <button style={styles.rightArrow} onClick={nextImage}>›</button>
              </>
            )}

            <div style={styles.categoryBadge}>
              {property.category}
            </div>
          </div>

          {/* THUMBNAILS */}
          {property.images.length > 1 && (
            <div style={styles.thumbnailRow}>
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={getImageUrl(img)}
                  alt="thumb"
                  style={{
                    ...styles.thumbnail,
                    border:
                      currentImage === index
                        ? "3px solid #2563eb"
                        : "2px solid #ddd",
                  }}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div style={styles.mainLayout}>
        <div style={styles.leftCol}>
          {/* TITLE SECTION */}
          <div style={styles.headerInfo}>
            <h1 style={styles.title}>{property.title}</h1>
            <div style={styles.locationWrapper}>
              <FaMapMarkerAlt /> {property.address || property.location}, {property.city}
            </div>
          </div>

          {/* QUICK STATS */}
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <FaLayerGroup style={styles.statIcon} />
              <div>
                <span style={styles.statLabel}>Type</span>
                <span style={styles.statValue}>{property.type || "Apartment"}</span>
              </div>
            </div>
            <div style={styles.statItem}>
              <FaBed style={styles.statIcon} />
              <div>
                <span style={styles.statLabel}>Beds</span>
                <span style={styles.statValue}>{property.beds || property.bedrooms || "N/A"}</span>
              </div>
            </div>
            <div style={styles.statItem}>
              <FaBath style={styles.statIcon} />
              <div>
                <span style={styles.statLabel}>Baths</span>
                <span style={styles.statValue}>{property.baths || property.bathrooms || "N/A"}</span>
              </div>
            </div>
            <div style={styles.statItem}>
              <FaRulerCombined style={styles.statIcon} />
              <div>
                <span style={styles.statLabel}>Size</span>
                <span style={styles.statValue}>{property.size || property.area || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div style={styles.contentSection}>
            <h3 style={styles.sectionTitle}>About this property</h3>
            <p style={styles.description}>{property.description}</p>
          </div>

          {/* DETAILS GRID */}
          <div style={styles.contentSection}>
            <h3 style={styles.sectionTitle}>Property Details</h3>
            <div style={styles.detailsGrid}>
              <DetailItem label="Property ID" value={property.propertyId} icon={<FaHistory />} />
              <DetailItem label="Furnishing" value={property.furnishingStatus || property.furnished} icon={<FaCouch />} />
              <DetailItem label="Facing" value={property.facing} icon={<FaCompass />} />
              <DetailItem label="Parking" value={property.parking} icon={<FaParking />} />
              {isRent && (
                <>
                  <DetailItem label="Duration" value={property.rentDuration} icon={<FaCalendarAlt />} />
                  <DetailItem label="Available From" value={property.availableFrom} icon={<FaCalendarAlt />} />
                  <DetailItem label="Floor" value={property.floorNumber || property.floor} icon={<FaLayerGroup />} />
                  <DetailItem label="Balconies" value={property.balconies} icon={<FaLayerGroup />} />
                </>
              )}
              {!isRent && (
                <>
                  <DetailItem label="Property Age" value={property.propertyAge || property.age} icon={<FaHistory />} />
                  <DetailItem label="Floor" value={property.floorNumber || property.floor} icon={<FaLayerGroup />} />
                </>
              )}
            </div>
          </div>

          {/* AMENITIES */}
          {property.amenities && property.amenities.length > 0 && (
            <div style={styles.contentSection}>
              <h3 style={styles.sectionTitle}>Amenities</h3>
              <div style={styles.amenitiesContainer}>
                {property.amenities.map((item, idx) => (
                  <div key={idx} style={styles.amenityBadge}>
                    <FaCheckCircle style={{ color: '#22c55e' }} /> {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAP */}
          {property.map && (
            <div style={styles.contentSection}>
              <h3 style={styles.sectionTitle}>Location on Map</h3>
              <div style={styles.mapContainer}>
                <iframe
                  src={property.map}
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: 16 }}
                  loading="lazy"
                  title="Property Map"
                />
              </div>
            </div>
          )}
        </div>

        <div style={styles.rightCol}>
          {/* PRICING CARD */}
          <div style={styles.sideCard}>
            <div style={styles.priceContainer}>
              <span style={styles.priceLabel}>{isRent ? "Monthly Rent" : "Property Price"}</span>
              <h2 style={styles.mainPrice}>{property.displayPrice}</h2>
              {property.rentDuration && isRent && (
                <span style={styles.durationLabel}>Per {property.rentDuration}</span>
              )}
            </div>

            <div style={styles.actionButtons}>
              <button style={styles.primaryActionBtn} onClick={handleAction}>
                {property.category === "Buy" ? "Book Visit / Appointment" : "Enquire / Rent Now"}
              </button>

            </div>
          </div>

          {/* EMI CALCULATOR (ONLY FOR BUY) */}
          {property.category === "Buy" && (
            <div style={styles.sideCard}>
              <h3 style={styles.sideCardTitle}>EMI Calculator</h3>
              <div style={styles.calcRow}>
                <label>Loan Amount (₹)</label>
                <input type="number" value={loan} onChange={(e) => setLoan(+e.target.value)} />
              </div>
              <div style={styles.calcRow}>
                <label>Interest Rate (%)</label>
                <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} />
              </div>
              <div style={styles.calcRow}>
                <label>Tenure (Years)</label>
                <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} />
              </div>
              <div style={styles.emiResult}>
                <span>Estimated EMI</span>
                <h3>₹ {emi.toFixed(0)} <small>/mo</small></h3>
              </div>
            </div>
          )}


          {/* OWNER INFO */}
          {property.owner && (
            <div style={styles.sideCard}>
              <h3 style={styles.sideCardTitle}>Owner Details</h3>
              <div style={styles.agentInfo}>
                <img
                  src={property.owner.profileImage ? getImageUrl(property.owner.profileImage) : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={property.owner.name}
                  style={styles.agentAvatar}
                />
                <div style={styles.agentText}>
                  <strong>{property.owner.name}</strong>
                  <div style={styles.contactDetailsSmall}>
                    {property.owner.phone && (
                      <div style={styles.contactItemSmall}>
                        <FaPhoneAlt size={12} strokeWidth={0} /> {property.owner.phone}
                      </div>
                    )}
                    {property.owner.email && (
                      <div style={styles.contactItemSmall}>
                        <FaEnvelope size={12} /> {property.owner.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AGENT INFO */}
          {property.agent && (
            <div style={styles.sideCard}>
              <h3 style={styles.sideCardTitle}>Property Agent</h3>
              <div style={styles.agentInfo}>
                <img
                  src={property.agent.image ? getImageUrl(property.agent.image) : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={property.agent.fullName || property.agent.name}
                  style={styles.agentAvatar}
                />
                <div style={styles.agentText}>
                  <strong>{property.agent.name}</strong>
                  <span>{property.agent.role || "Real Estate Advisor"}</span>
                  <div style={styles.agentRating}>
                    <FaStar color="#fbbf24" /> {property.agent.rating || "5.0"}
                  </div>

                  {/* Added Email & Phone */}
                  <div style={styles.contactDetailsSmall}>
                    {property.agent.phone && (
                      <div style={styles.contactItemSmall}>
                        <FaPhoneAlt size={12} /> {property.agent.phone}
                      </div>
                    )}
                    {property.agent.email && (
                      <div style={styles.contactItemSmall}>
                        <FaEnvelope size={12} /> {property.agent.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  style={styles.viewAgentBtn}
                  onClick={() => navigate(`/agent-details/${property.agent._id}`)}
                >
                  View Agent Profile
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value, icon }) => (
  <div style={styles.detailItem}>
    <div style={styles.detailIcon}>{icon}</div>
    <div style={styles.detailText}>
      <span style={styles.detailLabel}>{label}</span>
      <span style={styles.detailValue}>{value || "N/A"}</span>
    </div>
  </div>
);

const FaStar = ({ color }) => (
  <svg stroke="currentColor" fill={color} strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
  </svg>
);

/* ================= STYLES ================= */
const styles = {
  page: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "100px 20px 80px",
    fontFamily: "'Inter', sans-serif"
  },
  loaderContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    backgroundColor: "#f8fafc",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f1f5f9",
    borderTop: "4px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    background: "none",
    color: "#0f172a",
    cursor: "pointer",
    marginBottom: 24,
    fontWeight: "600",
    fontSize: "16px"
  },
  mediaSection: {
    marginBottom: 40,
  },
  slider: {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    height: "500px",
  },
  sliderImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  categoryBadge: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: '#111827',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  leftArrow: { position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", fontSize: 40, background: "rgba(255,255,255,0.8)", color: "#111", border: "none", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  rightArrow: { position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 40, background: "rgba(255,255,255,0.8)", color: "#111", border: "none", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  thumbnailRow: {
    display: "flex",
    gap: 12,
    marginTop: 16,
    flexWrap: "wrap",
    justifyContent: "flex-start"
  },
  thumbnail: { width: 120, height: 80, objectFit: "cover", borderRadius: 12, cursor: "pointer", transition: "all 0.2s" },

  mainLayout: {
    display: "grid",
    gridTemplateColumns: "1.8fr 1fr",
    gap: 40,
  },
  headerInfo: {
    marginBottom: 32,
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "12px",
    lineHeight: "1.2",
  },
  locationWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#64748b",
    fontSize: "18px",
    fontWeight: "500",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "40px",
  },
  statItem: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  statIcon: {
    fontSize: "20px",
    color: "#38bdf8",
  },
  statLabel: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statValue: {
    display: "block",
    fontSize: "15px",
    color: "#1e293b",
    fontWeight: "700",
  },
  contentSection: {
    marginBottom: 40,
    background: "#fff",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "24px",
  },
  description: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.8",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  detailIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#38bdf8",
    fontSize: "20px",
  },
  detailText: {
    display: "flex",
    flexDirection: "column",
  },
  detailLabel: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: "16px",
    color: "#1e293b",
    fontWeight: "700",
  },
  amenitiesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  amenityBadge: {
    padding: "10px 18px",
    background: "#f0fdf4",
    color: "#166534",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  mapContainer: {
    borderRadius: "16px",
    overflow: "hidden",
  },

  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  sideCard: {
    background: "#fff",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
  },
  sideCardTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "24px",
  },
  priceContainer: {
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid #f1f5f9",
  },
  priceLabel: {
    display: "block",
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "600",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  mainPrice: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#16a34a",
    margin: 0,
  },
  durationLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  primaryActionBtn: {
    width: "100%",
    padding: "18px",
    background: "#0f172a",
    color: "#fff",
    borderRadius: "16px",
    border: "none",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.4)",
  },
  contactRow: {
    display: "flex",
    gap: "12px",
  },
  contactBtn: {
    flex: 1,
    padding: "14px",
    background: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "14px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  whatsappBtn: {
    flex: 1,
    padding: "14px",
    background: "#dcfce7",
    color: "#15803d",
    borderRadius: "14px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  calcRow: {
    marginBottom: "16px",
    label: {
      display: "block",
      fontSize: "13px",
      color: "#64748b",
      marginBottom: "8px",
      fontWeight: "500"
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      background: "#f8fafc",
      outline: "none"
    }
  },
  emiResult: {
    marginTop: "24px",
    padding: "20px",
    background: "#f0f9ff",
    borderRadius: "16px",
    textAlign: "center",
    span: {
      fontSize: "13px",
      color: "#0369a1",
      fontWeight: "600",
      textTransform: "uppercase",
      display: "block",
      marginBottom: "4px"
    },
    h3: {
      margin: 0,
      fontSize: "24px",
      color: "#0c4a6e"
    }
  },
  agentInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  agentAvatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #38bdf8",
  },
  agentText: {
    display: "flex",
    flexDirection: "column",
    strong: { color: "#1e293b", fontSize: "16px" },
    span: { color: "#64748b", fontSize: "13px" },
  },
  agentRating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#fbbf24",
    marginTop: "4px",
  },
  viewAgentBtn: {
    width: "100%",
    padding: "12px",
    background: "transparent",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  contactDetailsSmall: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  contactItemSmall: {
    fontSize: "13px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  missingInfo: {
    color: "#94a3b8",
    fontSize: "14px",
    fontStyle: "italic",
  }
};
