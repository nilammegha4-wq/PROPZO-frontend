import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../config";
import {
  FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowLeft, FaMapMarkerAlt,
  FaCheckCircle, FaBed, FaBath, FaRulerCombined, FaLayerGroup,
  FaParking, FaCompass, FaCouch, FaCalendarAlt, FaHistory,
  FaShareAlt, FaHeart, FaRegHeart, FaEllipsisH, FaImage, FaStar, FaTimes
} from "react-icons/fa";

export default function PropertyDetails() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loan, setLoan] = useState(0);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`/api/properties/${id}`);
      setProperty(res.data);
      if (res.data.price) setLoan(res.data.price);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (property?.images?.length > 1) {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % property.images.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [property]);

  const r = rate / 12 / 100;
  const n = years * 12 || 1;
  const emi =
    r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const handleAction = () => {
    if (property.category === "Buy") {
      if (!auth?.isLoggedIn) {
        navigate("/login", { replace: true, state: { from: `/book-appointment/${property._id}` } });
        return;
      }
      navigate(`/book-appointment/${property._id}`);
    } else {
      if (!auth?.isLoggedIn) {
        navigate("/login", { replace: true, state: { from: `/book-rental-appointment/${property._id}` } });
        return;
      }
      navigate(`/book-rental-appointment/${property._id}`);
    }
  };

  if (loading)
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.spinner}></div>
        <p style={{ color: "#819B8B" }}>Loading property details...</p>
      </div>
    );

  if (!property)
    return <h2 style={{ padding: 100, textAlign: "center", color: "#4C3324" }}>Property not found.</h2>;

  const isRent = property.category === "Rent" || property.category === "PerRent" || property.category === "PreRent";

  const tabs = [
    { id: "Overview", label: "Overview" },
    { id: "Location", label: "Location" },
    { id: "Amenities", label: "Building" },
    { id: "FloorPlan", label: "Floor Plan" },
  ];

  const images = property.images || (property.image ? [property.image] : []);
  const imgLen = images.length;
  const prevIdx = (currentImage - 1 + imgLen) % imgLen;
  const nextIdx = (currentImage + 1) % imgLen;

  return (
    <div style={styles.outerContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .tab-btn {
          background: none;
          border: none;
          padding: 12px 0;
          margin-right: 32px;
          font-weight: 600;
          color: #819B8B;
          cursor: pointer;
          position: relative;
          transition: all 0.3s;
          font-size: 15px;
        }
        .tab-btn.active { color: #B2846B; }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #B2846B, #627B68);
          border-radius: 2px;
        }
        .tab-btn:hover { color: #B2846B; }

        .cta-btn {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: #FDFAF8;
          border: none;
          border-radius: 20px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 32px;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 10px 24px rgba(98,123,104,0.3);
        }
        .cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .round-action {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #E4CBB6;
          background: #FDFAF8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #4C3324;
          font-size: 18px;
          transition: border-color 0.2s;
        }
        .round-action:hover { border-color: #B2846B; }

        .gallery-img { transition: all 0.5s ease-in-out !important; }

        @media (max-width: 1024px) {
          .main-content { grid-template-columns: 1fr !important; }
          .side-panel { position: static !important; width: 100% !important; margin-top: 32px; }
          .img-peek { display: none !important; }
          .img-main { grid-column: span 3 !important; }
          .quickGrid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .quickGrid { grid-template-columns: 1fr !important; }
          .galleryGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div style={styles.navRow}>
        <button style={styles.backBtn} onClick={() => navigate("/properties")}>
          <FaArrowLeft /> Back to Properties
        </button>
      </div>

      {/* GALLERY */}
      <div onClick={() => setShowGallery(true)} style={{ ...styles.galleryWrapper, cursor: "pointer" }}>
        <div style={styles.galleryGrid}>
          <div style={{ ...styles.peekImg, marginRight: -20 }} className="img-peek">
            <img src={getImageUrl(images[prevIdx])} alt="prev" style={styles.imgFull} className="gallery-img" />
          </div>
          <div style={styles.centerImg} className="img-main">
            <img src={getImageUrl(images[currentImage])} alt="Main" style={styles.imgFull} className="gallery-img" />
            <div style={styles.imgCount}>
              <FaImage /> Show all {images.length} Photos
            </div>
          </div>
          <div style={{ ...styles.peekImg, marginLeft: -20 }} className="img-peek">
            <img src={getImageUrl(images[nextIdx])} alt="next" style={styles.imgFull} className="gallery-img" />
          </div>
        </div>
      </div>

      <div style={styles.mainWrapper} className="main-content">
        <div style={styles.infoCol}>
          <div style={styles.titleCard}>
            <div style={styles.titleArea}>
              <h1 style={styles.h1Title}>{property.title || property.propertyTitle}</h1>
              <p style={styles.subText}>
                {property.city} • Edifice {property.buildingName || "Exclusive"} • Unit {property.unitNumber || "01"}
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="round-action" onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? <FaHeart color="#B2846B" /> : <FaRegHeart />}
              </button>
              <button className="round-action"><FaShareAlt /></button>
              <button className="round-action"><FaEllipsisH /></button>
            </div>
          </div>

          <div style={styles.tabsStrip}>
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={styles.tabPanel}>
            {activeTab === "Overview" && (
              <>
                <div style={styles.quickGrid} className="quickGrid">
                  {[
                    { icon: <FaBed />, label: "Bedrooms", val: property.beds || property.bedrooms || "02" },
                    { icon: <FaBath />, label: "Suites", val: property.suites || property.bathrooms || "01" },
                    { icon: <FaParking />, label: "Parking", val: property.parking || "02" },
                    { icon: <FaRulerCombined />, label: "Area", val: `${property.area || property.size || "95"} m²` },
                  ].map((s, i) => (
                    <div key={i} style={styles.statBox}>
                      <div style={styles.iconCircle}>{s.icon}</div>
                      <div style={styles.statInfo}>
                        <span style={styles.statLab}>{s.label}</span>
                        <strong style={styles.statVal}>{s.val}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.sectionCard}>
                  <h3 style={styles.h3Sec}>About this property</h3>
                  <p style={styles.pDesc}>{property.description}</p>
                </div>

                <div style={styles.sectionCard}>
                  <h3 style={styles.h3Sec}>Building Features</h3>
                  <div style={styles.amenityStrip}>
                    {(property.amenities?.length
                      ? property.amenities
                      : ["Swimming Pool", "Gym", "Party Hall", "Playground", "24h Security"]
                    ).map((a, i) => (
                      <div key={i} style={styles.amenityBubble}>
                        <FaCheckCircle color="#627B68" /> {a}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "Location" && (
              <div style={styles.sectionCard}>
                <h3 style={styles.h3Sec}>Location</h3>
                <p style={{ marginBottom: 20, color: "#819B8B" }}>
                  <FaMapMarkerAlt color="#B2846B" /> {property.address}, {property.city}
                </p>
                {property.map && (
                  <div style={styles.mapContainer}>
                    <iframe src={property.map} width="100%" height="450" style={{ border: 0, borderRadius: 24 }} loading="lazy" title="Map" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={styles.sideCol} className="side-panel">
          <div style={styles.floatingCard}>
            <div style={styles.pricingTop}>
              <span style={styles.priceHead}>{isRent ? "Rent" : "Sale"} Price</span>
              <h2 style={styles.priceHeading}>{property.displayPrice || `₹ ${property.price?.toLocaleString()}`}</h2>
              <span style={styles.priceDetails}>₹ 8,000 / m²</span>
            </div>

            <div style={styles.monthlyExpenses}>
              <span style={styles.expenseTag}>MONTHLY EXPENSES</span>
              <div style={styles.expenseRow}>
                <span>Building Fee</span>
                <strong>₹ 1,532</strong>
              </div>
              <div style={styles.expenseRow}>
                <span>Property Tax</span>
                <strong>₹ 317</strong>
              </div>
            </div>

            <button className="cta-btn" onClick={handleAction}>
              {property.category === "Buy" ? "Schedule Visit" : "Rent Now"}
            </button>

            {/* OWNER DETAILS */}
            <div style={{ ...styles.agentInfoRow, marginBottom: "20px" }}>
              <img
                src={property.owner?.profileImage ? getImageUrl(property.owner.profileImage) : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Owner"
                style={styles.agentPic}
              />
              <div style={styles.agentMeta}>
                <span style={styles.partnerTag}>PROPERTY OWNER</span>
                <h4 style={styles.agentName}>{property.owner?.name || "Patel Mahi"}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: '#819B8B', fontWeight: 500 }}>Verified Seller</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href={`https://wa.me/${property.owner?.phone?.replace(/\D/g, '') || '919876543210'}`} target="_blank" rel="noreferrer" style={styles.miniIcon}><FaWhatsapp /></a>
                <a href={`tel:${property.owner?.phone || '+919876543210'}`} style={styles.miniIcon}><FaPhoneAlt /></a>
                <a href={`mailto:${property.owner?.email || 'prpzoestate@gmail.com'}`} style={styles.miniIcon}><FaEnvelope /></a>
              </div>
            </div>

            {/* AGENT DETAILS */}
            <div style={styles.agentInfoRow}>
              <img
                src={property.agent?.image ? getImageUrl(property.agent.image) : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Agent"
                style={{...styles.agentPic, cursor: property.agent?._id ? 'pointer' : 'default'}}
                onClick={() => property.agent?._id && navigate(`/agent-details/${property.agent._id}`)}
              />
              <div style={styles.agentMeta}>
                <span style={styles.partnerTag}>PARTNER AGENT</span>
                <h4 
                  style={{...styles.agentName, cursor: property.agent?._id ? 'pointer' : 'default'}} 
                  onClick={() => property.agent?._id && navigate(`/agent-details/${property.agent._id}`)}
                >
                  {property.agent?.name || "Premium Advisor"}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: '#819B8B', fontWeight: 500 }}>{property.agent?.role || "Specialist"}</span>
                    <span style={{ fontSize: '11px', color: '#B2846B', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                        <FaStar size={10} /> {property.agent?.rating || "4.8"}
                    </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href={`https://wa.me/${property.agent?.phone?.replace(/\D/g, '') || '919876543210'}`} target="_blank" rel="noreferrer" style={styles.miniIcon}><FaWhatsapp /></a>
                <a href={`tel:${property.agent?.phone || '+919876543210'}`} style={styles.miniIcon}><FaPhoneAlt /></a>
              </div>
            </div>
          </div>

          {property.category === "Buy" && (
            <div style={styles.calcCard}>
              <h4 style={styles.calcTitle}>Financing</h4>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", color: "#819B8B", marginBottom: "6px", display: "block", fontWeight: 600 }}>Financed Amount</label>
                <input
                  type="number"
                  value={loan}
                  onChange={(e) => setLoan(+e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1.5px solid #E4CBB6", outline: "none", background: "#F5EDE6", color: "#4C3324" }}
                />
              </div>
              <div style={styles.calcResult}>
                <span style={{ fontSize: "12px", color: "#B2846B", fontWeight: 600 }}>Estimated Monthly Payment</span>
                <strong style={{ fontSize: "20px", color: "#4C3324" }}>₹ {emi.toFixed(0)} <small style={{ fontWeight: 400, color: "#819B8B" }}>/ month</small></strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {showGallery && (
        <div style={styles.modalOverlay} onClick={() => setShowGallery(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0, fontSize: "20px", color: "#4C3324" }}>Property Gallery</h2>
              <button style={styles.closeBtn} onClick={() => setShowGallery(false)}><FaTimes /></button>
            </div>
            <div style={styles.galleryGridFull}>
              {images.map((img, i) => (
                <div key={i} style={styles.galleryItemFull}>
                  <img src={getImageUrl(img)} alt={`Property ${i}`} style={styles.galleryImgFull} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  outerContainer: { backgroundColor: "#F5EDE6", minHeight: "100vh", paddingBottom: "100px" },
  loaderContainer: { height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", background: "#F5EDE6" },
  spinner: { width: "40px", height: "40px", border: "4px solid #E4CBB6", borderTop: "4px solid #B2846B", borderRadius: "50%", animation: "spin 1s linear infinite" },
  navRow: { maxWidth: "1280px", margin: "0 auto", padding: "120px 20px 20px" },
  backBtn: { background: "none", border: "none", display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "#819B8B", cursor: "pointer" },
  galleryWrapper: { marginBottom: "48px", overflow: "hidden" },
  galleryGrid: { display: "grid", gridTemplateColumns: "1fr 2.6fr 1fr", gap: "20px", alignItems: "center" },
  peekImg: { height: "450px", borderRadius: "28px", overflow: "hidden", opacity: 0.6, transform: "scale(0.95)", boxShadow: "0 10px 20px rgba(76,51,36,0.06)" },
  centerImg: { height: "550px", borderRadius: "32px", overflow: "hidden", position: "relative", boxShadow: "0 25px 50px -12px rgba(76,51,36,0.15)", zIndex: 2 },
  imgFull: { width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.08)" },
  imgCount: { position: "absolute", bottom: "24px", left: "24px", backgroundColor: "rgba(76,51,36,0.7)", color: "#F5EDE6", padding: "10px 18px", borderRadius: "14px", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px", backdropFilter: "blur(4px)" },
  mainWrapper: { maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "2.1fr 1fr", gap: "50px" },
  infoCol: {},
  titleCard: { backgroundColor: "#FDFAF8", padding: "36px", borderRadius: "32px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", border: "1px solid #E4CBB6" },
  titleArea: {},
  h1Title: { fontSize: "30px", fontWeight: "800", color: "#4C3324", margin: "0 0 4px 0", letterSpacing: "-0.02em" },
  subText: { fontSize: "15px", color: "#819B8B", margin: 0, fontWeight: "500" },
  tabsStrip: { display: "flex", borderBottom: "1px solid #E4CBB6", marginBottom: "32px", paddingLeft: "12px" },
  tabPanel: {},
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" },
  statBox: { backgroundColor: "#FDFAF8", padding: "24px 16px", borderRadius: "24px", display: "flex", alignItems: "center", gap: "14px", border: "1px solid #E4CBB6" },
  iconCircle: { width: "48px", height: "48px", borderRadius: "16px", backgroundColor: "#F5EDE6", color: "#B2846B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 },
  statInfo: { display: "flex", flexDirection: "column" },
  statLab: { fontSize: "12px", color: "#819B8B", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.4px" },
  statVal: { fontSize: "17px", fontWeight: "800", color: "#4C3324" },
  sectionCard: { backgroundColor: "#FDFAF8", padding: "36px", borderRadius: "32px", marginBottom: "24px", border: "1px solid #E4CBB6" },
  h3Sec: { fontSize: "20px", fontWeight: "700", color: "#4C3324", marginBottom: "18px" },
  pDesc: { fontSize: "16px", lineHeight: "1.8", color: "#819B8B" },
  amenityStrip: { display: "flex", flexWrap: "wrap", gap: "16px" },
  amenityBubble: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#627B68", backgroundColor: "#F5EDE6", padding: "8px 16px", borderRadius: "12px", border: "1px solid #E4CBB6" },
  mapContainer: { height: "450px", borderRadius: "24px", overflow: "hidden" },
  sideCol: { position: "sticky", top: "40px" },
  floatingCard: { backgroundColor: "#FDFAF8", padding: "40px 32px", borderRadius: "36px", border: "1px solid #E4CBB6", boxShadow: "0 20px 25px -5px rgba(76,51,36,0.06)" },
  pricingTop: { marginBottom: "32px" },
  priceHead: { fontSize: "14px", color: "#819B8B", fontWeight: "600", display: "block" },
  priceHeading: { fontSize: "36px", fontWeight: "800", color: "#B2846B", margin: "6px 0" },
  priceDetails: { fontSize: "14px", color: "#819B8B", fontWeight: "600" },
  monthlyExpenses: { borderTop: "1px solid #E4CBB6", paddingTop: "24px", marginBottom: "32px" },
  expenseTag: { fontSize: "11px", fontWeight: "800", color: "#B2846B", letterSpacing: "1px", display: "block", marginBottom: "16px" },
  expenseRow: { display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "15px", color: "#4C3324" },
  agentInfoRow: { display: "flex", alignItems: "center", gap: "14px", padding: "20px", backgroundColor: "#F5EDE6", borderRadius: "24px", border: "1px solid #E4CBB6" },
  agentPic: { width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E4CBB6" },
  agentMeta: { flex: 1 },
  partnerTag: { fontSize: "10px", fontWeight: "800", color: "#819B8B", letterSpacing: "0.5px" },
  agentName: { fontSize: "15px", fontWeight: "700", color: "#4C3324", margin: "2px 0 0 0" },
  miniIcon: { width: "36px", height: "36px", backgroundColor: "#FDFAF8", borderRadius: "12px", border: "1.5px solid #E4CBB6", display: "flex", alignItems: "center", justifyContent: "center", color: "#627B68", fontSize: "16px", textDecoration: "none" },
  calcCard: { marginTop: "24px", padding: "32px", backgroundColor: "#FDFAF8", borderRadius: "32px", border: "1px solid #E4CBB6" },
  calcTitle: { fontSize: "16px", fontWeight: "700", color: "#4C3324", marginBottom: "16px" },
  calcResult: { padding: "20px", backgroundColor: "#F5EDE6", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "4px", border: "1px solid #E4CBB6" },
  modalOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(76,51,36,0.9)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", backdropFilter: "blur(8px)" },
  modalContent: { backgroundColor: "#F5EDE6", width: "100%", maxWidth: "1200px", maxHeight: "90vh", borderRadius: "32px", padding: "32px", overflow: "hidden", display: "flex", flexDirection: "column", position: 'relative' },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  closeBtn: { background: "#FDFAF8", border: "1.5px solid #E4CBB6", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#B2846B", cursor: "pointer", fontSize: "18px" },
  galleryGridFull: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", overflowY: "auto", paddingRight: "10px" },
  galleryItemFull: { borderRadius: "20px", overflow: "hidden", height: "240px", border: '1px solid #E4CBB6' },
  galleryImgFull: { width: "100%", height: "100%", objectFit: "cover" },
};
