import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";
import {
    FaArrowLeft, FaBed, FaRulerCombined,
    FaCheckCircle, FaWhatsapp, FaStar,
    FaLayerGroup, FaCouch, FaParking,
    FaMapMarkerAlt, FaHome, FaBolt, FaShieldAlt, FaWifi, FaTshirt, FaEnvelope, FaTimes, FaImage
} from "react-icons/fa";

export default function Prerentdetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPropertyData = async () => {
            try {
                const [propRes, allRes] = await Promise.all([
                    axios.get(`/api/properties/${id}`),
                    axios.get("/api/properties"),
                ]);
                setProperty(propRes.data);
                const similar = allRes.data
                    .filter((p) => p.propertyType === "PerRent" && p._id !== id)
                    .slice(0, 4);
                setSimilarProperties(similar);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchPropertyData();
    }, [id]);

    useEffect(() => {
        if (property?.images?.length > 1) {
            const timer = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % property.images.length);
            }, 3500);
            return () => clearInterval(timer);
        }
    }, [property]);

    if (loading)
        return (
            <div style={styles.loader}>
                <div style={styles.spinner}></div>
                <p style={{ color: "#819B8B" }}>Loading premium details...</p>
            </div>
        );

    if (!property)
        return <h2 style={{ padding: 100, textAlign: "center", color: "#4C3324" }}>Property Not Found</h2>;

    const images = property.images || (property.image ? [property.image] : []);

    return (
        <div style={styles.dashboardContainer}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .hero-section {
          position: relative;
          height: 550px;
          border-radius: 40px;
          overflow: hidden;
          margin-bottom: -100px;
          box-shadow: 0 30px 60px rgba(76,51,36,0.15);
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.1);
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, #F5EDE6 100%);
        }

        .back-floating {
          position: absolute;
          top: 30px;
          left: 30px;
          z-index: 10;
          background: rgba(253,250,248,0.92);
          border: none;
          padding: 12px 20px;
          border-radius: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(76,51,36,0.12);
          transition: all 0.3s ease;
          color: #4C3324;
        }
        .back-floating:hover { transform: translateX(-5px); }

        .main-card {
          background: #FDFAF8;
          border-radius: 40px;
          padding: 50px;
          position: relative;
          z-index: 2;
          box-shadow: 0 20px 40px rgba(76,51,36,0.05);
          border: 1px solid #E4CBB6;
        }

        .spec-bar {
          display: flex;
          background: #F5EDE6;
          border-radius: 20px;
          padding: 24px;
          gap: 48px;
          margin: 32px 0;
          border: 1px solid #E4CBB6;
          flex-wrap: wrap;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .spec-icon { color: #B2846B; font-size: 20px; }

        .spec-info { display: flex; flex-direction: column; }

        .spec-label {
          font-size: 11px;
          font-weight: 800;
          color: #819B8B;
          letter-spacing: 0.05em;
        }

        .spec-value { font-size: 15px; font-weight: 700; color: #4C3324; }

        .amenity-tag {
          background: #F5EDE6;
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          color: #627B68;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #E4CBB6;
        }

        .property-score-box {
          background: #F5EDE6;
          border-radius: 24px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          border: 1px solid #E4CBB6;
        }

        .score-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .status-bar-container {
          height: 12px;
          width: 100%;
          background: #E4CBB6;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          margin: 16px 0;
        }

        .similar-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .similar-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(76,51,36,0.12);
        }

        /* Gallery Modal Styles */
        .gallery-modal {
          position: fixed;
          inset: 0;
          background: rgba(76,51,36,0.98);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          padding: 40px;
        }
        .gallery-close {
          position: absolute;
          top: 30px;
          right: 30px;
          background: none;
          border: none;
          color: #F5EDE6;
          font-size: 32px;
          cursor: pointer;
          zIndex: 10;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          overflow-y: auto;
          padding-top: 60px;
        }
        .gallery-item {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid rgba(228,203,182,0.1);
        }
      `}</style>

      {showGallery && (
        <div className="gallery-modal">
          <button className="gallery-close" onClick={() => setShowGallery(false)}><FaTimes /></button>
          <div className="gallery-grid">
            {images.map((img, i) => (
              <img key={i} src={getImageUrl(img)} alt={`Gallery ${i}`} className="gallery-item" />
            ))}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="hero-section" onClick={() => setShowGallery(true)} style={{ cursor: "pointer" }}>
        <button className="back-floating" onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
          <FaArrowLeft /> Back to Discover
        </button>
        <img src={getImageUrl(images[currentImage])} alt="Hero" className="hero-img" />
        <div className="hero-gradient"></div>
        {images.length > 1 && (
            <div style={{
                position: 'absolute', bottom: '120px', right: '50px', 
                background: 'rgba(76,51,36,0.6)', color: 'white', 
                padding: '10px 20px', borderRadius: '30px', fontSize: '14px',
                display: 'flex', alignItems: 'center', gap: '8px'
            }}>
                <FaImage /> Show all {images.length} Photos
            </div>
        )}
      </div>

      <div style={styles.mainWrapper}>
        <div className="main-card">
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h1 style={styles.titleH1}>{property.title}</h1>
              <p style={styles.locationText}>
                <FaMapMarkerAlt /> {property.city}, {property.locationType || "Premium District"}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={styles.priceTag}>
                ₹{property.price?.toLocaleString()}{" "}
                <span style={{ fontSize: "16px", color: "#819B8B", fontWeight: 500 }}>
                  /per {property.rentDuration || "stay"}
                </span>
              </div>
              <button
                style={styles.investBtn}
                onClick={() => navigate(`/book-rental-appointment/${property._id}`)}
              >
                Reserve Now
              </button>
            </div>
          </div>

          {/* SPEC BAR */}
          <div className="spec-bar">
            {[{ icon: <FaHome />, label: "ESTABLISHED", val: property.yearBuilt || "2023" },
              { icon: <FaBed />, label: "ROOMS", val: `${property.beds || 1} Space` },
              { icon: <FaRulerCombined />, label: "TOTAL AREA", val: `${property.area || 850} m²` },
              { icon: <FaLayerGroup />, label: "RENT TYPE", val: property.propertyType === "PerRent" ? "Flexible" : "Monthly" }
            ].map((s, i) => (
              <div key={i} className="spec-item">
                <div className="spec-icon">{s.icon}</div>
                <div className="spec-info">
                  <span className="spec-label">{s.label}</span>
                  <span className="spec-value">{s.val}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.contentGrid} className="content-grid">
            <div style={styles.leftCol}>
              <h2 style={styles.sectionTitle}>A perfect place for work and life</h2>
              <p style={styles.description}>{property.description}</p>

              <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px", color: "#4C3324" }}>Space Amenities</h3>
              <div style={styles.amenitiesGrid}>
                {["High-Speed Wifi", "Power Backup", "24/7 Security", "Laundry Service", "Secure Parking", "Modern Furniture"].map((a, i) => (
                  <div key={i} className="amenity-tag">
                    {i === 0 && <FaWifi color="#819B8B" />}
                    {i === 1 && <FaBolt color="#B2846B" />}
                    {i === 2 && <FaShieldAlt color="#627B68" />}
                    {i === 3 && <FaTshirt color="#B2846B" />}
                    {i === 4 && <FaParking color="#627B68" />}
                    {i === 5 && <FaCouch color="#819B8B" />}
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.rightCol}>
              <div className="property-score-box">
                <div className="score-circle">87</div>
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#4C3324" }}>Property Vitality</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#819B8B" }}>Market activity index: High</p>
                </div>
              </div>

              <div style={{ marginBottom: "32px", background: "#FDFAF8", padding: "24px", borderRadius: "24px", border: "1px solid #E4CBB6" }}>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#627B68", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span>Current Booking Status</span>
                  <span style={{ color: "#B2846B" }}>78% Active</span>
                </p>
                <div className="status-bar-container">
                  <div style={{ width: "40%", background: "#B2846B" }} title="Reserved" />
                  <div style={{ width: "25%", background: "#E4CBB6" }} title="Pending" />
                  <div style={{ width: "13%", background: "#627B68" }} title="New" />
                  <div style={{ width: "22%", background: "#FDFAF8" }} title="Available" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  {["Reserved", "Pending", "New"].map((label, i) => (
                    <span key={i} style={{ fontSize: "11px", color: "#819B8B", display: "flex", alignItems: "center", gap: "4px" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#B2846B" : i === 1 ? "#E4CBB6" : "#627B68" }} /> {label}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.agentCard}>
                <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#4C3324", marginBottom: "20px", letterSpacing: "0.05em" }}>DEDICATED SUPPORT</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "24px" }}>
                  <div style={styles.agentAvatarWrapper}>
                    <img src={property.agent?.image ? getImageUrl(property.agent.image) : "https://i.pravatar.cc/100?img=12"} alt="Agent" style={styles.agentAvatar} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#4C3324" }}>{property.agent?.name || "PropZo Advisor"}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#819B8B" }}>{property.agent?.role || "Premium Property Specialist"}</p>
                  </div>
                  <div style={styles.ratingBadge}><FaStar /> {property.agent?.rating || "4.9"}</div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button style={styles.talkAgentBtn} onClick={() => navigate("/agent")}>Talk to Agent</button>
                  <button style={styles.waCircleBtn} onClick={() => window.open(`https://wa.me/${property.agent?.phone || "919876543210"}`, "_blank")}><FaWhatsapp /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.similarSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#4C3324", margin: 0, letterSpacing: "-0.02em" }}>Related Spaces</h2>
            <button style={styles.viewAllBtn} onClick={() => navigate("/prerent")}>View all collections →</button>
          </div>
          <div style={styles.similarGrid}>
            {similarProperties.map((p) => (
              <div key={p._id} className="similar-card" style={styles.smallCard} onClick={() => navigate(`/perrent/${p._id}`)}>
                <div style={styles.smallImgWrap}>
                  <img src={getImageUrl(p.image || (p.images && p.images[0]))} alt="Similar" style={styles.smallImg} />
                  <div style={styles.priceOverlay}>₹{p.price?.toLocaleString()}</div>
                </div>
                <div style={{ padding: "20px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#4C3324", margin: "0 0 8px 0" }}>{p.title}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#819B8B", fontSize: "13px" }}>
                    <FaMapMarkerAlt size={12} /> {p.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
    dashboardContainer: { backgroundColor: "#F5EDE6", minHeight: "100vh", padding: "0 0 100px 0" },
    mainWrapper: { maxWidth: "1300px", margin: "0 auto", padding: "0 40px" },
    titleH1: { fontSize: "42px", fontWeight: "800", color: "#4C3324", margin: "0 0 12px 0", letterSpacing: "-0.03em", lineHeight: 1.1 },
    locationText: { display: "flex", alignItems: "center", gap: "8px", color: "#819B8B", fontSize: "16px", margin: 0, fontWeight: 500 },
    priceTag: { fontSize: "38px", fontWeight: "800", color: "#4C3324", marginBottom: "20px", letterSpacing: "-0.02em" },
    investBtn: { backgroundColor: "#4C3324", color: "#F5EDE6", border: "none", padding: "16px 40px", borderRadius: "18px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 10px 20px rgba(76,51,36,0.15)" },
    contentGrid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: "60px", marginTop: "60px" },
    sectionTitle: { fontSize: "24px", fontWeight: "800", color: "#4C3324", marginBottom: "24px", letterSpacing: "-0.01em" },
    description: { color: "#627B68", lineHeight: "1.8", fontSize: "16px", marginBottom: "40px", fontWeight: 400 },
    amenitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },
    rightCol: { position: "sticky", top: "40px" },
    agentCard: { background: "#FDFAF8", padding: "28px", borderRadius: "32px", border: "1px solid #E4CBB6", boxShadow: "0 20px 50px rgba(76,51,36,0.05)" },
    agentAvatarWrapper: { width: "56px", height: "56px", borderRadius: "16px", overflow: "hidden", border: "2px solid #F5EDE6" },
    agentAvatar: { width: "100%", height: "100%", objectFit: "cover" },
    ratingBadge: { background: "#F5EDE6", color: "#B2846B", padding: "6px 12px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" },
    talkAgentBtn: { flex: 1, backgroundColor: "#4C3324", color: "#F5EDE6", border: "none", padding: "14px", borderRadius: "14px", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s" },
    waCircleBtn: { width: "48px", height: "48px", borderRadius: "14px", background: "#F5EDE6", color: "#627B68", border: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", cursor: "pointer", transition: "all 0.3s" },
    similarSection: { marginTop: "120px" },
    viewAllBtn: { background: "none", border: "none", color: "#B2846B", fontWeight: "700", fontSize: "16px", cursor: "pointer" },
    similarGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" },
    smallCard: { background: "#FDFAF8", borderRadius: "32px", overflow: "hidden", border: "1px solid #E4CBB6", boxShadow: "0 10px 40px rgba(76,51,36,0.02)" },
    smallImgWrap: { height: "220px", width: "100%", position: "relative" },
    smallImg: { width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.08)" },
    priceOverlay: { position: "absolute", bottom: "15px", left: "15px", background: "rgba(253,250,248,0.92)", padding: "6px 14px", borderRadius: "12px", fontSize: "14px", fontWeight: "800", color: "#4C3324", backdropFilter: "blur(10px)" },
    loader: { height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5EDE6", color: "#819B8B" },
    spinner: { width: "40px", height: "40px", border: "4px solid #E4CBB6", borderTop: "4px solid #B2846B", borderRadius: "50%", animation: "spin 1s linear infinite" }
};
