// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getImageUrl } from "../../config";
// import { 
//   FaArrowLeft, FaBed, FaBath, FaRulerCombined, FaTree, FaHistory, 
//   FaCheckCircle, FaUserCircle, FaWhatsapp, FaPhoneAlt, FaStar, FaImage,
//   FaRegCompass, FaCalendarAlt, FaLayerGroup, FaCouch, FaParking, FaCalendarCheck,
//   FaMapMarkerAlt, FaHome, FaBolt, FaShieldAlt, FaWifi, FaTshirt
// } from "react-icons/fa";

// export default function Prerentdetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [similarProperties, setSimilarProperties] = useState([]);
//   const [currentImage, setCurrentImage] = useState(0);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH PROPERTY ================= */
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchPropertyData = async () => {
//       try {
//         const [propRes, allRes] = await Promise.all([
//           axios.get(`/api/properties/${id}`),
//           axios.get('/api/properties')
//         ]);

//         setProperty(propRes.data);

//         // Filter for similar properties (same type, different ID)
//         const similar = allRes.data
//           .filter(p => p.propertyType === "PerRent" && p._id !== id)
//           .slice(0, 4);
//         setSimilarProperties(similar);

//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };
//     fetchPropertyData();
//   }, [id]);

//   /* ================= SLIDESHOW LOGIC ================= */
//   useEffect(() => {
//     if (property?.images?.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentImage((prev) => (prev + 1) % property.images.length);
//       }, 3000); 
//       return () => clearInterval(timer);
//     }
//   }, [property]);

//   if (loading) return (
//     <div style={styles.loader}>
//       <div className="spinner"></div>
//       <p>Loading premium details...</p>
//     </div>
//   );

//   if (!property) return <h2 style={{ padding: 100, textAlign: 'center' }}>Property Not Found</h2>;

//   const images = property.images || (property.image ? [property.image] : []);

//   return (
//     <div style={styles.dashboardContainer}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

//         .hero-section {
//           position: relative;
//           height: 550px;
//           border-radius: 40px;
//           overflow: hidden;
//           margin-bottom: -100px;
//           box-shadow: 0 30px 60px rgba(0,0,0,0.1);
//         }

//         .hero-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .hero-gradient {
//             position: absolute;
//             inset: 0;
//             background: linear-gradient(to bottom, transparent 40%, #f5f0e8 100%);
//         }

//         .back-floating {
//             position: absolute;
//             top: 30px;
//             left: 30px;
//             z-index: 10;
//             background: rgba(255,255,255,0.9);
//             border: none;
//             padding: 12px 20px;
//             border-radius: 16px;
//             font-weight: 700;
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             cursor: pointer;
//             backdrop-filter: blur(10px);
//             box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//             transition: all 0.3s ease;
//         }
//         .back-floating:hover { transform: translateX(-5px); }

//         .main-card {
//             background: white;
//             border-radius: 40px;
//             padding: 50px;
//             position: relative;
//             z-index: 2;
//             box-shadow: 0 20px 40px rgba(0,0,0,0.03);
//             border: 1px solid #f1f5f9;
//         }

//         .spec-bar {
//             display: flex;
//             background: #f8fafc;
//             border-radius: 20px;
//             padding: 24px;
//             gap: 48px;
//             margin: 32px 0;
//             border: 1px solid #f1f5f9;
//             flex-wrap: wrap;
//         }

//         .spec-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//         }

//         .spec-icon {
//             color: #64748b;
//             font-size: 20px;
//         }

//         .spec-info {
//             display: flex;
//             flex-direction: column;
//         }

//         .spec-label {
//             font-size: 11px;
//             font-weight: 800;
//             color: #94a3b8;
//             letter-spacing: 0.05em;
//         }

//         .spec-value {
//             font-size: 15px;
//             font-weight: 700;
//             color: #1e293b;
//         }

//         .amenity-tag {
//             background: #f8fafc;
//             padding: 12px 20px;
//             border-radius: 16px;
//             font-size: 14px;
//             font-weight: 600;
//             color: #475569;
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             border: 1px solid #f1f5f9;
//         }

//         .property-score-box {
//             background: #f8fafc;
//             border-radius: 24px;
//             padding: 24px;
//             display: flex;
//             align-items: center;
//             gap: 20px;
//             margin-bottom: 24px;
//             border: 1px solid #f1f5f9;
//         }

//         .score-circle {
//             width: 70px;
//             height: 70px;
//             border-radius: 50%;
//             background: #1e293b;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 24px;
//             font-weight: 800;
//             border: 4px solid #334155;
//         }

//         .status-bar-container {
//             height: 12px;
//             width: 100%;
//             background: #f1f5f9;
//             border-radius: 10px;
//             overflow: hidden;
//             display: flex;
//             margin: 16px 0;
//         }

//         .similar-card {
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             cursor: pointer;
//         }
//         .similar-card:hover {
//             transform: translateY(-8px);
//             box-shadow: 0 20px 40px rgba(0,0,0,0.08);
//         }

//         .spinner {
//           width: 40px;
//           height: 40px;
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #0f172a;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin-bottom: 16px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @media (max-width: 1024px) {
//             .content-grid { grid-template-columns: 1fr !important; }
//             .spec-bar { flex-wrap: wrap; gap: 20px; }
//             .hero-section { border-radius: 0; margin-bottom: -50px; height: 400px; }
//             .main-card { border-radius: 30px 30px 0 0; }
//         }
//       `}</style>

//       {/* HERO SECTION */}
//       <div className="hero-section">
//         <button className="back-floating" onClick={() => navigate(-1)}>
//             <FaArrowLeft /> Back to Discover
//         </button>
//         <img src={getImageUrl(images[currentImage])} alt="Hero" className="hero-img" />
//         <div className="hero-gradient"></div>
//       </div>

//       <div style={styles.mainWrapper}>
//         <div className="main-card">
//             {/* TOP HEADER BLOCK */}
//             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px'}}>
//                 <div style={{flex: 1, minWidth: '300px'}}>
//                     <h1 style={styles.titleH1}>{property.title}</h1>
//                     <p style={styles.locationText}><FaMapMarkerAlt /> {property.city}, {property.locationType || "Premium District"}</p>
//                 </div>
//                 <div style={{textAlign: 'right'}}>
//                     <div style={styles.priceTag}>₹{property.price?.toLocaleString()} <span style={{fontSize: '16px', color: '#94a3b8', fontWeight: 500}}>/per {property.rentDuration || "stay"}</span></div>
//                     <button style={styles.investBtn} onClick={() => navigate(`/book-rental-appointment/${property._id}`)}>Reserve Now</button>
//                 </div>
//             </div>

//             {/* SPEC BAR */}
//             <div className="spec-bar">
//                 <div className="spec-item">
//                     <FaHome className="spec-icon" />
//                     <div className="spec-info">
//                         <span className="spec-label">ESTABLISHED</span>
//                         <span className="spec-value">{property.yearBuilt || "2023"}</span>
//                     </div>
//                 </div>
//                 <div className="spec-item">
//                     <FaBed className="spec-icon" />
//                     <div className="spec-info">
//                         <span className="spec-label">ROOMS</span>
//                         <span className="spec-value">{property.beds || 1} Space</span>
//                     </div>
//                 </div>
//                 <div className="spec-item">
//                     <FaRulerCombined className="spec-icon" />
//                     <div className="spec-info">
//                         <span className="spec-label">TOTAL AREA</span>
//                         <span className="spec-value">{property.area || 850} m²</span>
//                     </div>
//                 </div>
//                 <div className="spec-item">
//                     <FaLayerGroup className="spec-icon" />
//                     <div className="spec-info">
//                         <span className="spec-label">RENT TYPE</span>
//                         <span className="spec-value">{property.propertyType === "PerRent" ? "Flexible" : "Monthly"}</span>
//                     </div>
//                 </div>
//             </div>

//             {/* CONTENT GRID */}
//             <div style={styles.contentGrid} className="content-grid">
//                 <div style={styles.leftCol}>
//                     <h2 style={styles.sectionTitle}>A perfect place for work and life</h2>
//                     <p style={styles.description}>{property.description}</p>

//                     <h3 style={{fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: '#1e293b'}}>Space Amenities</h3>
//                     <div style={styles.amenitiesGrid}>
//                         <div className="amenity-tag"><FaWifi color="#6366f1" /> High-Speed Wifi</div>
//                         <div className="amenity-tag"><FaBolt color="#f59e0b" /> Power Backup</div>
//                         <div className="amenity-tag"><FaShieldAlt color="#10b981" /> 24/7 Security</div>
//                         <div className="amenity-tag"><FaTshirt color="#ec4899" /> Laundry Service</div>
//                         <div className="amenity-tag"><FaParking color="#3b82f6" /> Secure Parking</div>
//                         <div className="amenity-tag"><FaCouch color="#a855f7" /> Modern Furniture</div>
//                     </div>
//                 </div>

//                 <div style={styles.rightCol}>
//                     {/* SCORE WIDGET */}
//                     <div className="property-score-box">
//                         <div className="score-circle">87</div>
//                         <div>
//                             <p style={{margin: 0, fontSize: '14px', fontWeight: 700, color: '#1e293b'}}>Property Vitality</p>
//                             <p style={{margin: 0, fontSize: '12px', color: '#64748b'}}>Market activity index: High</p>
//                         </div>
//                     </div>

//                     {/* STATUS BAR */}
//                     <div style={{marginBottom: '32px', background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9'}}>
//                         <p style={{margin: 0, fontSize: '13px', fontWeight: 700, color: '#475569', display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
//                             <span>Current Booking Status</span>
//                             <span style={{color: '#6366f1'}}>78% Active</span>
//                         </p>
//                         <div className="status-bar-container">
//                             <div style={{width: '40%', background: '#6366f1'}} title="Reserved" />
//                             <div style={{width: '25%', background: '#fbbf24'}} title="Pending" />
//                             <div style={{width: '13%', background: '#10b981'}} title="New" />
//                             <div style={{width: '22%', background: '#e2e8f0'}} title="Available" />
//                         </div>
//                         <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
//                             <span style={{fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width:8, height:8, borderRadius:'50%', background:'#6366f1'}}/> Reserved</span>
//                             <span style={{fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width:8, height:8, borderRadius:'50%', background:'#fbbf24'}}/> Pending</span>
//                             <span style={{fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width:8, height:8, borderRadius:'50%', background:'#10b981'}}/> New</span>
//                         </div>
//                     </div>

//                     {/* AGENT WIDGET */}
//                     <div style={styles.agentCard}>
//                         <h4 style={{fontSize: '15px', fontWeight: 800, color: '#1e293b', marginBottom: '20px', letterSpacing: '0.05em'}}>DEDICATED SUPPORT</h4>
//                         <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '24px'}}>
//                             <div style={styles.agentAvatarWrapper}>
//                                 <img 
//                                     src={property.agent?.image ? getImageUrl(property.agent.image) : "https://i.pravatar.cc/100?img=12"} 
//                                     alt="Agent" 
//                                     style={styles.agentAvatar} 
//                                 />
//                             </div>
//                             <div style={{flex: 1}}>
//                                 <p style={{margin: 0, fontSize: '15px', fontWeight: 700, color: '#1e293b'}}>
//                                     {property.agent?.name || "PropZo Advisor"}
//                                 </p>
//                                 <p style={{margin: 0, fontSize: '12px', color: '#64748b'}}>
//                                     {property.agent?.role || "Premium Property Specialist"}
//                                 </p>
//                             </div>
//                             <div style={styles.ratingBadge}>
//                                 <FaStar /> {property.agent?.rating || "4.9"}
//                             </div>
//                         </div>
//                         <div style={{display: 'flex', gap: '12px'}}>
//                             <button style={styles.talkAgentBtn} onClick={() => navigate('/agent')}>Talk to Agent</button>
//                             <button 
//                                 style={styles.waCircleBtn} 
//                                 onClick={() => window.open(`https://wa.me/${property.agent?.phone || '919876543210'}`, '_blank')}
//                             >
//                                 <FaWhatsapp />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* SIMILAR SECTION */}
//         <div style={styles.similarSection}>
//             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
//                 <h2 style={{fontSize: '28px', fontWeight: 800, color: '#1e293b', margin: 0, letterSpacing: '-0.02em'}}>Related Spaces</h2>
//                 <button style={styles.viewAllBtn} onClick={() => navigate('/prerent')}>View all collections →</button>
//             </div>
//             <div style={styles.similarGrid}>
//                 {similarProperties.map(p => (
//                     <div key={p._id} className="similar-card" style={styles.smallCard} onClick={() => navigate(`/perrent/${p._id}`)}>
//                         <div style={styles.smallImgWrap}>
//                             <img src={getImageUrl(p.image || (p.images && p.images[0]))} alt="Similar" style={styles.smallImg} />
//                             <div style={styles.priceOverlay}>₹{p.price?.toLocaleString()}</div>
//                         </div>
//                         <div style={{padding: '20px'}}>
//                             <h4 style={{fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px 0'}}>{p.title}</h4>
//                             <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px'}}>
//                                 <FaMapMarkerAlt size={12} /> {p.city}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   dashboardContainer: { backgroundColor: "#f5f0e8", minHeight: "100vh", padding: "0 0 100px 0" },
//   mainWrapper: { maxWidth: '1300px', margin: '0 auto', padding: '0 40px' },
//   titleH1: { fontSize: '42px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.03em', lineHeight: 1.1 },
//   locationText: { display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '16px', margin: 0, fontWeight: 500 },
//   priceTag: { fontSize: '38px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.02em' },
//   investBtn: { backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '16px 40px', borderRadius: '18px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(15,23,42,0.1)' },

//   contentGrid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', marginTop: '60px' },
//   sectionTitle: { fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.01em' },
//   description: { color: '#64748b', lineHeight: '1.8', fontSize: '16px', marginBottom: '40px', fontWeight: 400 },
//   amenitiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' },

//   rightCol: { position: 'sticky', top: '40px' },
//   agentCard: { background: 'white', padding: '28px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' },
//   agentAvatarWrapper: { width: '56px', height: '56px', borderRadius: '16px', overflow: 'hidden', border: '3px solid #f8fafc' },
//   agentAvatar: { width: '100%', height: '100%', objectFit: 'cover' },
//   ratingBadge: { background: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' },
//   talkAgentBtn: { flex: 1, backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' },
//   waCircleBtn: { width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', color: '#10b981', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'pointer', transition: 'all 0.3s' },

//   similarSection: { marginTop: '120px' },
//   viewAllBtn: { background: 'none', border: 'none', color: '#6366f1', fontWeight: '700', fontSize: '16px', cursor: 'pointer' },
//   similarGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' },
//   smallCard: { background: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' },
//   smallImgWrap: { height: '220px', width: '100%', position: 'relative' },
//   smallImg: { width: '100%', height: '100%', objectFit: 'cover' },
//   priceOverlay: { position: 'absolute', bottom: '15px', left: '15px', background: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: '12px', fontSize: '14px', fontWeight: '800', color: '#0f172a', backdropFilter: 'blur(10px)' },

//   loader: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#64748b' }
// };


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";
import {
    FaArrowLeft, FaBed, FaRulerCombined,
    FaCheckCircle, FaWhatsapp, FaStar,
    FaLayerGroup, FaCouch, FaParking,
    FaMapMarkerAlt, FaHome, FaBolt, FaShieldAlt, FaWifi, FaTshirt
} from "react-icons/fa";

export default function Prerentdetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true);

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
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [property]);

    if (loading)
        return (
            <div style={styles.loader}>
                <div className="spinner"></div>
                <p>Loading premium details...</p>
            </div>
        );

    if (!property)
        return <h2 style={{ padding: 100, textAlign: "center" }}>Property Not Found</h2>;

    const images = property.images || (property.image ? [property.image] : []);

    return (
        <div style={styles.dashboardContainer}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

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

        .spec-icon {
          color: #B2846B;
          font-size: 20px;
        }

        .spec-info {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 11px;
          font-weight: 800;
          color: #819B8B;
          letter-spacing: 0.05em;
        }

        .spec-value {
          font-size: 15px;
          font-weight: 700;
          color: #4C3324;
        }

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

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #E4CBB6;
          border-top: 4px solid #B2846B;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .spec-bar { flex-wrap: wrap; gap: 20px; }
          .hero-section { border-radius: 0; margin-bottom: -50px; height: 400px; }
          .main-card { border-radius: 30px 30px 0 0; }
        }
      `}</style>

            {/* HERO */}
            <div className="hero-section">
                <button className="back-floating" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back to Discover
                </button>
                <img src={getImageUrl(images[currentImage])} alt="Hero" className="hero-img" />
                <div className="hero-gradient"></div>
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
                        <div className="spec-item">
                            <FaHome className="spec-icon" />
                            <div className="spec-info">
                                <span className="spec-label">ESTABLISHED</span>
                                <span className="spec-value">{property.yearBuilt || "2023"}</span>
                            </div>
                        </div>
                        <div className="spec-item">
                            <FaBed className="spec-icon" />
                            <div className="spec-info">
                                <span className="spec-label">ROOMS</span>
                                <span className="spec-value">{property.beds || 1} Space</span>
                            </div>
                        </div>
                        <div className="spec-item">
                            <FaRulerCombined className="spec-icon" />
                            <div className="spec-info">
                                <span className="spec-label">TOTAL AREA</span>
                                <span className="spec-value">{property.area || 850} m²</span>
                            </div>
                        </div>
                        <div className="spec-item">
                            <FaLayerGroup className="spec-icon" />
                            <div className="spec-info">
                                <span className="spec-label">RENT TYPE</span>
                                <span className="spec-value">
                                    {property.propertyType === "PerRent" ? "Flexible" : "Monthly"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT GRID */}
                    <div style={styles.contentGrid} className="content-grid">
                        <div style={styles.leftCol}>
                            <h2 style={styles.sectionTitle}>A perfect place for work and life</h2>
                            <p style={styles.description}>{property.description}</p>

                            <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px", color: "#4C3324" }}>
                                Space Amenities
                            </h3>
                            <div style={styles.amenitiesGrid}>
                                <div className="amenity-tag"><FaWifi color="#819B8B" /> High-Speed Wifi</div>
                                <div className="amenity-tag"><FaBolt color="#B2846B" /> Power Backup</div>
                                <div className="amenity-tag"><FaShieldAlt color="#627B68" /> 24/7 Security</div>
                                <div className="amenity-tag"><FaTshirt color="#B2846B" /> Laundry Service</div>
                                <div className="amenity-tag"><FaParking color="#627B68" /> Secure Parking</div>
                                <div className="amenity-tag"><FaCouch color="#819B8B" /> Modern Furniture</div>
                            </div>
                        </div>

                        <div style={styles.rightCol}>
                            {/* SCORE WIDGET */}
                            <div className="property-score-box">
                                <div className="score-circle">87</div>
                                <div>
                                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#4C3324" }}>
                                        Property Vitality
                                    </p>
                                    <p style={{ margin: 0, fontSize: "12px", color: "#819B8B" }}>
                                        Market activity index: High
                                    </p>
                                </div>
                            </div>

                            {/* STATUS BAR */}
                            <div style={{ marginBottom: "32px", background: "#FDFAF8", padding: "24px", borderRadius: "24px", border: "1px solid #E4CBB6" }}>
                                <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#627B68", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <span>Current Booking Status</span>
                                    <span style={{ color: "#B2846B" }}>78% Active</span>
                                </p>
                                <div className="status-bar-container">
                                    <div style={{ width: "40%", background: "#B2846B" }} title="Reserved" />
                                    <div style={{ width: "25%", background: "#E4CBB6" }} title="Pending" />
                                    <div style={{ width: "13%", background: "#627B68" }} title="New" />
                                    <div style={{ width: "22%", background: "#EDE3DB" }} title="Available" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                    <span style={{ fontSize: "11px", color: "#819B8B", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B2846B" }} /> Reserved
                                    </span>
                                    <span style={{ fontSize: "11px", color: "#819B8B", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E4CBB6" }} /> Pending
                                    </span>
                                    <span style={{ fontSize: "11px", color: "#819B8B", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#627B68" }} /> New
                                    </span>
                                </div>
                            </div>

                            {/* AGENT WIDGET */}
                            <div style={styles.agentCard}>
                                <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#4C3324", marginBottom: "20px", letterSpacing: "0.05em" }}>
                                    DEDICATED SUPPORT
                                </h4>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "24px" }}>
                                    <div style={styles.agentAvatarWrapper}>
                                        <img
                                            src={property.agent?.image ? getImageUrl(property.agent.image) : "https://i.pravatar.cc/100?img=12"}
                                            alt="Agent"
                                            style={styles.agentAvatar}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#4C3324" }}>
                                            {property.agent?.name || "PropZo Advisor"}
                                        </p>
                                        <p style={{ margin: 0, fontSize: "12px", color: "#819B8B" }}>
                                            {property.agent?.role || "Premium Property Specialist"}
                                        </p>
                                    </div>
                                    <div style={styles.ratingBadge}>
                                        <FaStar /> {property.agent?.rating || "4.9"}
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <button style={styles.talkAgentBtn} onClick={() => navigate("/agent")}>
                                        Talk to Agent
                                    </button>
                                    <button
                                        style={styles.waCircleBtn}
                                        onClick={() => window.open(`https://wa.me/${property.agent?.phone || "919876543210"}`, "_blank")}
                                    >
                                        <FaWhatsapp />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIMILAR SECTION */}
                <div style={styles.similarSection}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                        <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#4C3324", margin: 0, letterSpacing: "-0.02em" }}>
                            Related Spaces
                        </h2>
                        <button style={styles.viewAllBtn} onClick={() => navigate("/prerent")}>
                            View all collections →
                        </button>
                    </div>
                    <div style={styles.similarGrid}>
                        {similarProperties.map((p) => (
                            <div
                                key={p._id}
                                className="similar-card"
                                style={styles.smallCard}
                                onClick={() => navigate(`/perrent/${p._id}`)}
                            >
                                <div style={styles.smallImgWrap}>
                                    <img
                                        src={getImageUrl(p.image || (p.images && p.images[0]))}
                                        alt="Similar"
                                        style={styles.smallImg}
                                    />
                                    <div style={styles.priceOverlay}>₹{p.price?.toLocaleString()}</div>
                                </div>
                                <div style={{ padding: "20px" }}>
                                    <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#4C3324", margin: "0 0 8px 0" }}>
                                        {p.title}
                                    </h4>
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
    investBtn: {
        background: "linear-gradient(135deg, #B2846B 0%, #627B68 100%)",
        color: "white",
        border: "none",
        padding: "16px 40px",
        borderRadius: "18px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: "0 10px 24px rgba(98,123,104,0.35)",
    },

    contentGrid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: "60px", marginTop: "60px" },
    leftCol: {},
    sectionTitle: { fontSize: "24px", fontWeight: "800", color: "#4C3324", marginBottom: "24px", letterSpacing: "-0.01em" },
    description: { color: "#819B8B", lineHeight: "1.8", fontSize: "16px", marginBottom: "40px", fontWeight: 400 },
    amenitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },

    rightCol: { position: "sticky", top: "40px" },
    agentCard: { background: "#FDFAF8", padding: "28px", borderRadius: "32px", border: "1px solid #E4CBB6", boxShadow: "0 20px 50px rgba(76,51,36,0.05)" },
    agentAvatarWrapper: { width: "56px", height: "56px", borderRadius: "16px", overflow: "hidden", border: "3px solid #E4CBB6" },
    agentAvatar: { width: "100%", height: "100%", objectFit: "cover" },
    ratingBadge: { background: "#F5EDE6", color: "#B2846B", padding: "6px 12px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px", border: "1px solid #E4CBB6" },
    talkAgentBtn: {
        flex: 1,
        background: "linear-gradient(135deg, #B2846B 0%, #627B68 100%)",
        color: "white",
        border: "none",
        padding: "14px",
        borderRadius: "14px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.3s",
    },
    waCircleBtn: { width: "48px", height: "48px", borderRadius: "14px", background: "#F5EDE6", color: "#627B68", border: "1px solid #E4CBB6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", cursor: "pointer", transition: "all 0.3s" },

    similarSection: { marginTop: "120px" },
    viewAllBtn: { background: "none", border: "none", color: "#B2846B", fontWeight: "700", fontSize: "16px", cursor: "pointer" },
    similarGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" },
    smallCard: { background: "#FDFAF8", borderRadius: "32px", overflow: "hidden", border: "1px solid #E4CBB6", boxShadow: "0 10px 40px rgba(76,51,36,0.04)" },
    smallImgWrap: { height: "220px", width: "100%", position: "relative" },
    smallImg: { width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.08)" },
    priceOverlay: { position: "absolute", bottom: "15px", left: "15px", background: "rgba(253,250,248,0.95)", padding: "6px 14px", borderRadius: "12px", fontSize: "14px", fontWeight: "800", color: "#4C3324", backdropFilter: "blur(10px)", border: "1px solid #E4CBB6" },

    loader: { height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5EDE6", color: "#819B8B" },
};
