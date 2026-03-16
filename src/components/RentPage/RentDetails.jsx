import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";
import {
  FaArrowLeft, FaBed, FaBath, FaRulerCombined, FaTree, FaHistory,
  FaCheckCircle, FaUserCircle, FaWhatsapp, FaPhoneAlt, FaStar, FaImage,
  FaRegCompass, FaCalendarAlt, FaLayerGroup, FaCouch, FaParking, FaCalendarCheck, FaEnvelope, FaTimes
} from "react-icons/fa";

export default function RentDetails() {
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
          .filter((p) => p.propertyType === "Rent" && p._id !== id)
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

        .bento-gallery {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
          height: 480px;
          margin-bottom: 32px;
        }

        .main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
          filter: sepia(0.08);
        }

        .side-imgs {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .side-img-wrap {
          position: relative;
          height: calc(240px - 8px);
          border-radius: 20px;
          overflow: hidden;
        }

        .side-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.08);
        }

        .similar-card-hover {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .similar-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(76,51,36,0.1) !important;
        }

        .img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(76,51,36,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F5EDE6;
          font-weight: 600;
          backdrop-filter: blur(4px);
          cursor: pointer;
        }

        .facility-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 24px;
        }

        .sidebar-facility-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .facility-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #627B68;
          font-size: 14px;
          font-weight: 500;
        }

        .facility-icon { color: #B2846B; font-size: 18px; }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 24px;
        }

        .detail-item { display: flex; align-items: center; gap: 16px; }

        .detail-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: #F5EDE6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B2846B;
          font-size: 18px;
          flex-shrink: 0;
        }

        .detail-info { display: flex; flex-direction: column; }

        .detail-label {
          font-size: 11px;
          font-weight: 700;
          color: #819B8B;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .detail-value { font-size: 15px; font-weight: 700; color: #4C3324; }

        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid #E4CBB6;
          background: #FDFAF8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B2846B;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .icon-btn:hover { border-color: #B2846B; }

        @media (max-width: 1100px) {
          .dash-grid { grid-template-columns: 1fr !important; }
          .bento-gallery { height: 350px; }
          .facility-grid { grid-template-columns: repeat(2, 1fr); }
          .details-grid { grid-template-columns: 1fr; }
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

      {/* HEADER NAV */}
      <div style={styles.navRow}>
        <button style={styles.backBtn} onClick={() => navigate("/rentpage")}>
          <FaArrowLeft /> Back to Rentals
        </button>
      </div>

      <div style={styles.contentGrid} className="dash-grid">
        <div style={styles.mainCol}>
          <div className="bento-gallery" onClick={() => setShowGallery(true)} style={{ cursor: "pointer" }}>
            <img src={getImageUrl(images[currentImage] || images[0])} alt="Main" className="main-img" />
            <div className="side-imgs">
              <div className="side-img-wrap">
                <img src={getImageUrl(images[(currentImage + 1) % images.length] || images[0])} alt="Side 1" className="side-img" />
              </div>
              <div className="side-img-wrap" style={{ position: 'relative' }}>
                <img src={getImageUrl(images[(currentImage + 2) % images.length] || images[0])} alt="Side 2" className="side-img" />
                {images.length > 3 && (
                  <div className="img-overlay">
                    <FaImage style={{ marginRight: '8px' }} />
                    Show all {images.length} Photos
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ ...styles.whiteCard, marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <h1 style={styles.titleH1}>{property.title}</h1>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="icon-btn" title="Area"><FaRulerCombined /></button>
                <button className="icon-btn" title="Add to Favorites"><FaStar /></button>
                <button className="icon-btn">···</button>
              </div>
            </div>
            <h3 style={styles.sectionH3}>Description</h3>
            <p style={styles.descText}>{property.description}</p>
          </div>

          <div style={{ ...styles.whiteCard, marginBottom: "24px" }}>
            <h3 style={styles.sectionH3}>Property Details</h3>
            <div className="details-grid">
              {[
                { icon: <FaHistory />, label: "PROPERTY ID", val: property.propertyId || "NR-7421" },
                { icon: <FaCouch />, label: "FURNISHING", val: property.furnishing || "Semi-Furnished" },
                { icon: <FaRegCompass />, label: "FACING", val: property.facing || "West" },
                { icon: <FaParking />, label: "PARKING", val: property.parking || "1 covered" },
                { icon: <FaCalendarAlt />, label: "DURATION", val: property.rentDuration || "month" },
                { icon: <FaCalendarCheck />, label: "AVAILABLE FROM", val: property.availableFrom || "Immediately" },
                { icon: <FaLayerGroup />, label: "FLOOR", val: property.floor || "Ground" },
                { icon: <FaLayerGroup />, label: "BALCONIES", val: property.balconies || "1" },
              ].map((d, i) => (
                <div key={i} className="detail-item">
                  <div className="detail-icon-wrap">{d.icon}</div>
                  <div className="detail-info">
                    <span className="detail-label">{d.label}</span>
                    <span className="detail-value">{d.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.sideCol}>
          <div style={styles.whiteCardSidebar}>
            <h4 style={styles.widgetH4}>Property Facilities</h4>
            <div className="sidebar-facility-grid">
              <div className="facility-item"><FaBed className="facility-icon" /> {property.beds || 4} Beds</div>
              <div className="facility-item"><FaBath className="facility-icon" /> {property.bathrooms || 3} Baths</div>
              <div className="facility-item"><FaCheckCircle className="facility-icon" /> Smart Home</div>
              <div className="facility-item"><FaHistory className="facility-icon" /> Gym</div>
              <div className="facility-item"><FaCheckCircle className="facility-icon" /> Parking</div>
              <div className="facility-item"><FaRulerCombined className="facility-icon" /> {property.area || 1400} sqft</div>
              <div className="facility-item"><FaHistory className="facility-icon" /> Pool</div>
              <div className="facility-item"><FaTree className="facility-icon" /> Garden</div>
            </div>
          </div>

          <div style={styles.whiteCardSidebar}>
            <span style={styles.widgetSubLabel}>MONTHLY RENT</span>
            <div style={styles.priceValue}>{property.displayPrice || `₹${property.price?.toLocaleString()}`}</div>
            <p style={styles.perMonthText}>Per month</p>
            <div style={{ height: "1px", background: "#E4CBB6", margin: "20px 0" }} />
            <button style={styles.enquireBtn} onClick={() => navigate(`/book-rental-appointment/${property._id}`)}>
              Enquire / Rent Now
            </button>
          </div>

          <div style={styles.whiteCardSidebar}>
            <h4 style={styles.widgetH4}>Agent Details</h4>
            <div style={styles.agentRow}>
              <div style={styles.avatarCircle}>
                <img src={property.agentPhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200"} alt="Agent" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              </div>
              <div style={styles.agentMeta}>
                <strong style={styles.agentName}>{property.agentName || "Rohit Sharma"}</strong>
                <span style={styles.agentRole}>Senior Specialist</span>
                <div style={styles.ratingBox}><FaStar color="#B2846B" size={12} /> 4.9 (24 reviews)</div>
                <div style={styles.contactItem}><FaPhoneAlt size={12} /> {property.agentPhone || "+91 98765 43210"}</div>
                <div style={styles.contactItem}><FaEnvelope size={12} /> {property.agentEmail || "agent@propzo.com"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.similarSection}>
        <div style={styles.sectionHeaderLine}>
          <h2 style={styles.sectionH2}>Similar Properties</h2>
          <button style={styles.viewAllText} onClick={() => navigate("/rentpage")}>View all →</button>
        </div>
        <div style={styles.similarGrid}>
          {similarProperties.map((p) => (
            <div key={p._id} style={styles.smallCard} onClick={() => navigate(`/rent/${p._id}`)} className="similar-card-hover">
              <div style={styles.smallImgWrap}>
                <img src={getImageUrl(p.image || (p.images && p.images[0])) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"} alt={p.title} style={styles.smallImg} />
              </div>
              <div style={styles.smallContent}>
                <h4 style={styles.smallTitle}>{p.title}</h4>
                <div style={styles.smallPrice}>{p.displayPrice || `₹${p.price?.toLocaleString()}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.darkCtaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Start Your Next Chapter</h2>
          <p style={styles.ctaSub}>Curated luxury rentals for those who appreciate the finer things.</p>
          <div style={styles.ctaBtns}>
            <button style={styles.ctaPrimary} onClick={() => navigate("/contact")}>Speak with Specialist</button>
            <button style={styles.ctaSecondary} onClick={() => navigate("/agent")}>Browse Agents</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: { backgroundColor: "#F5EDE6", minHeight: "100vh", padding: "40px 6% 80px" },
  navRow: { marginBottom: "24px" },
  backBtn: { background: "none", border: "none", color: "#B2846B", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px" },
  mainCol: {},
  whiteCard: { backgroundColor: "#FDFAF8", padding: "32px", borderRadius: "32px", border: "1px solid #E4CBB6", boxShadow: "0 4px 20px rgba(76,51,36,0.02)" },
  titleH1: { fontSize: "28px", fontWeight: "800", color: "#4C3324", margin: 0 },
  sectionH3: { fontSize: "18px", fontWeight: "700", color: "#4C3324", marginBottom: "16px" },
  descText: { color: "#627B68", lineHeight: "1.7", fontSize: "15px" },
  sideCol: { display: "flex", flexDirection: "column", gap: "20px" },
  whiteCardSidebar: { backgroundColor: "#FDFAF8", padding: "24px", borderRadius: "24px", border: "1px solid #E4CBB6", boxShadow: "0 8px 30px rgba(76,51,36,0.04)" },
  widgetSubLabel: { fontSize: "11px", fontWeight: "800", color: "#819B8B", letterSpacing: "0.08em" },
  priceValue: { fontSize: "32px", fontWeight: "900", color: "#B2846B", margin: "8px 0 2px" },
  perMonthText: { fontSize: "14px", color: "#819B8B", margin: 0 },
  enquireBtn: { width: "100%", backgroundColor: "#4C3324", color: "#F5EDE6", border: "none", padding: "18px", borderRadius: "16px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "transform 0.2s" },
  widgetH4: { fontSize: "16px", fontWeight: "800", color: "#4C3324", marginBottom: "16px" },
  agentRow: { display: "flex", gap: "16px" },
  avatarCircle: { width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#F5EDE6", overflow: "hidden" },
  agentMeta: { flex: 1, display: "flex", flexDirection: "column", gap: "3px" },
  agentName: { fontSize: "15px", color: "#4C3324", fontWeight: "700" },
  agentRole: { fontSize: "12px", color: "#819B8B", fontWeight: "500" },
  ratingBox: { display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "700", color: "#B2846B", margin: "2px 0" },
  contactItem: { fontSize: "12px", color: "#627B68", display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" },
  loader: { height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" },
  spinner: { width: "40px", height: "40px", border: "4px solid #E4CBB6", borderTop: "4px solid #B2846B", borderRadius: "50%", animation: "spin 1s linear infinite" },
  similarSection: { marginTop: "80px" },
  sectionHeaderLine: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" },
  sectionH2: { fontSize: "24px", fontWeight: "800", color: "#4C3324", margin: 0 },
  viewAllText: { background: "none", border: "none", color: "#B2846B", fontWeight: "700", cursor: "pointer", fontSize: "15px" },
  similarGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" },
  smallCard: { backgroundColor: "#FDFAF8", borderRadius: "24px", overflow: "hidden", border: "1px solid #E4CBB6" },
  smallImgWrap: { height: "160px" },
  smallImg: { width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.1)" },
  smallContent: { padding: "16px" },
  smallTitle: { fontSize: "15px", fontWeight: "700", color: "#4C3324", margin: "0 0 4px 0" },
  smallPrice: { fontSize: "16px", fontWeight: "800", color: "#B2846B" },
  darkCtaSection: { marginTop: "100px", background: "linear-gradient(135deg, #4C3324 0%, #352419 100%)", padding: "80px 40px", borderRadius: "48px", color: "#F5EDE6", textAlign: "center" },
  ctaContent: { maxWidth: "600px", margin: "0 auto" },
  ctaTitle: { fontSize: "36px", fontWeight: "800", marginBottom: "16px", letterSpacing: "-0.02em" },
  ctaSub: { fontSize: "18px", opacity: 0.8, marginBottom: "32px", color: "#E4CBB6" },
  ctaBtns: { display: "flex", gap: "16px", justifyContent: "center" },
  ctaPrimary: { backgroundColor: "#F5EDE6", color: "#4C3324", border: "none", padding: "16px 32px", borderRadius: "16px", fontWeight: "700", fontSize: "16px", cursor: "pointer" },
  ctaSecondary: { backgroundColor: "transparent", color: "#F5EDE6", border: "1px solid rgba(245,237,230,0.3)", padding: "16px 32px", borderRadius: "16px", fontWeight: "700", fontSize: "16px", cursor: "pointer" }
};
