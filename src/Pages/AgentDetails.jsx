import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
import {
  FaPhoneAlt, FaEnvelope, FaArrowLeft, FaBed, FaBath,
  FaRulerCombined, FaCheckCircle, FaAward, FaStar,
  FaUsers, FaHome, FaWhatsapp
} from "react-icons/fa";
=======
import { FaPhoneAlt, FaEnvelope, FaArrowLeft, FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaAward, FaStar, FaUsers, FaHome, FaWhatsapp } from "react-icons/fa";
>>>>>>> e85f1ae (nilam2)
import { getImageUrl } from "../config";

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

const AgentDetails = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propsLoading, setPropsLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/agents/${agentId}`);
        setAgent(res.data);
      } catch (err) {
        setError("Failed to load agent profile.");
      } finally {
        setLoading(false);
      }
    };
    const fetchAgentProperties = async () => {
      try {
        setPropsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/properties/agent/${agentId}`);
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setPropsLoading(false);
      }
    };
    fetchAgentDetails();
    fetchAgentProperties();
  }, [agentId]);
=======
    useEffect(() => {
        const fetchAgentDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/agents/${agentId}`);
                setAgent(res.data);
            } catch (err) {
                console.error("Error fetching agent details:", err);
                setError("Failed to load agent profile.");
            } finally {
                setLoading(false);
            }
        };
>>>>>>> e85f1ae (nilam2)

  if (loading) return (
    <div style={s.loaderContainer}>
      <div style={s.spinner}></div>
      <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>Loading profile...</p>
    </div>
  );

  if (error || !agent) return (
    <div style={{ padding: "120px 20px", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <button onClick={() => navigate("/agent")} style={s.backBtn}>
        <FaArrowLeft /> View All Agents
      </button>
      <div style={s.errorBanner}>{error || "Agent not found."}</div>
    </div>
  );

<<<<<<< HEAD
  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ad-back:hover { color: #4C3324 !important; transform: translateX(-4px); }
        .ad-prop-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(76,51,36,0.14) !important; }
        .ad-call-btn:hover { background: #4C3324 !important; color: #fff !important; }
        .ad-wa-btn:hover { background: #627B68 !important; color: #fff !important; }
        .ad-more-btn:hover { background: #4C3324 !important; }
        @media (max-width: 860px) {
          .ad-profile-card { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ad-image-col { height: 340px !important; }
        }
        @media (max-width: 600px) {
          .ad-name { font-size: 32px !important; }
          .ad-action-row { flex-direction: column !important; gap: 20px !important; }
          .ad-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={s.container}>
        {/* Back */}
        <div onClick={() => navigate("/agent")} style={s.backLink} className="ad-back">
          <FaArrowLeft /> Back to Agents
=======
    if (loading) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div style={styles.errorContainer}>
                <button onClick={() => navigate("/agent")} style={styles.backBtn}>
                    <FaArrowLeft /> View All Agents
                </button>
                <div style={styles.errorBanner}>{error || "Agent not found."}</div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                body { margin: 0; font-family: 'Outfit', sans-serif; background: #f9f6f1; }
                .back-link:hover { transform: translateX(-5px); color: #4c3324 !important; }
                .prop-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -12px rgba(76, 51, 36, 0.12) !important; }
                .follow-btn:hover { background: #627b68 !important; color: #fff !important; transform: scale(1.05); }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div style={styles.container}>
                {/* Back Link */}
                <div onClick={() => navigate("/agent")} style={styles.backLink} className="back-link">
                    <FaArrowLeft /> Back to Agents
                </div>

                {/* Profile Card Section */}
                <div style={styles.profileCard}>
                    <div style={styles.imageCol}>
                        <img 
                            src={getImageUrl(agent.image)} 
                            alt={agent.fullName} 
                            style={styles.profileImg} 
                        />
                    </div>
                    <div style={styles.infoCol}>
                        <div style={styles.tag}><span style={styles.tagDot}></span> EXPERT AGENT</div>
                        <div style={styles.nameRow}>
                            <h1 style={styles.name}>{agent.fullName}</h1>
                            <FaCheckCircle style={styles.verifiedIcon} />
                        </div>
                        <p style={styles.role}>{agent.role || "Luxury Real Estate Specialist"}</p>
                        
                        <p style={styles.bio}>
                            {agent.description || `${agent.fullName} is a dedicated property advisor with a focus on luxury residential markets. With a deep understanding of market trends and a commitment to client satisfaction, ${agent.fullName.split(' ')[0]} helps families and investors find their perfect sanctuary.`}
                        </p>

                        <div style={styles.statsRow}>
                            <div style={styles.statItem}>
                                <FaUsers style={styles.statIcon} />
                                <span style={styles.statValue}>{agent.clientsSold || "120"}+</span>
                                <span style={styles.statLabel}>Clients</span>
                            </div>
                            <div style={styles.statItem}>
                                <FaAward style={styles.statIcon} />
                                <span style={styles.statValue}>{agent.experience || "5"}+</span>
                                <span style={styles.statLabel}>Exp. Years</span>
                            </div>
                            <div style={styles.statItem}>
                                <FaHome style={styles.statIcon} />
                                <span style={styles.statValue}>{properties.length}</span>
                                <span style={styles.statLabel}>Listings</span>
                            </div>
                        </div>

                        <div style={styles.actionRow}>
                             <div style={styles.contactInfo}>
                                <div style={styles.contactItem}>
                                    <FaEnvelope style={styles.contactIcon} />
                                    <span>{agent.email}</span>
                                </div>
                                <div style={styles.contactItem}>
                                    <FaPhoneAlt style={styles.contactIcon} />
                                    <span>{agent.phone}</span>
                                </div>
                            </div>
                            <div style={styles.btnGroup}>
                                <a href={`tel:${agent.phone}`} style={styles.callBtn} className="follow-btn">Call Now</a>
                                <a 
                                    href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    style={styles.followBtn} 
                                    className="follow-btn"
                                >
                                    <FaWhatsapp style={{ marginRight: '8px' }} /> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Properties Section */}
                <div style={styles.propertySection}>
                    <div style={styles.sectionHeader}>
                        <div>
                            <div style={styles.tag}><span style={styles.tagDot}></span> PORTFOLIO</div>
                            <h2 style={styles.sectionTitle}>Exclusive managed properties</h2>
                        </div>
                        <button style={styles.moreBtn} onClick={() => navigate("/properties")}>Explore All</button>
                    </div>

                    {propsLoading ? (
                        <div style={styles.centerLoading}>
                            <div style={styles.spinner}></div>
                        </div>
                    ) : properties.length > 0 ? (
                        <div style={styles.grid}>
                            {properties.map((p) => (
                                <div key={p._id} style={styles.card} className="prop-card" onClick={() => navigate(`/property/${p._id}`)}>
                                    <div style={styles.propImgWrapper}>
                                        <img src={getImageUrl(p.image)} alt={p.title} style={styles.cardImg} />
                                        <div style={styles.priceTag}>${p.price?.toLocaleString()}</div>
                                    </div>
                                    <div style={styles.cardContent}>
                                        <h3 style={styles.cardTitle}>{p.title}</h3>
                                        <p style={styles.cardAddress}>{p.city || p.location}</p>
                                        <div style={styles.cardStats}>
                                            <div style={styles.propStat}><FaBed /> {p.bedrooms || 0}</div>
                                            <div style={styles.propStat}><FaBath /> {p.bathrooms || 0}</div>
                                            <div style={styles.propStat}><FaRulerCombined /> {p.area || 0} sqft</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.emptyState}>No properties listed yet.</div>
                    )}
                </div>

                {/* DARK CTA SECTION - FILLING BLANK SPACE */}
                <div style={styles.darkCtaSection}>
                    <div style={styles.ctaContent}>
                        <h2 style={styles.ctaTitle}>Looking for a custom property strategy?</h2>
                        <p style={styles.ctaSub}>Our expert agents handle everything from valuation to final closing.</p>
                        <div style={styles.ctaBtns}>
                            <a href={`tel:${agent.phone}`} style={styles.ctaPrimary}>Speak with {agent.fullName.split(' ')[0]}</a>
                            <button style={styles.ctaSecondary} onClick={() => navigate('/contact')}>General Inquiry</button>
                        </div>
                    </div>
                </div>

            </div>
>>>>>>> e85f1ae (nilam2)
        </div>

        {/* Profile Card */}
        <div style={s.profileCard} className="ad-profile-card">
          <div style={s.imageCol} className="ad-image-col">
            <img src={getImageUrl(agent.image)} alt={agent.fullName} style={s.profileImg} />
          </div>

          <div style={s.infoCol}>
            <div style={s.tag}>
              <span style={s.tagDot}></span> EXPERT AGENT
            </div>
            <div style={s.nameRow}>
              <h1 style={s.name} className="ad-name">{agent.fullName}</h1>
              <FaCheckCircle style={s.verifiedIcon} />
            </div>
            <p style={s.role}>{agent.role || "Luxury Real Estate Specialist"}</p>
            <p style={s.bio}>
              {agent.description || `${agent.fullName} is a dedicated property advisor with a focus on residential markets. With a deep understanding of market trends and a commitment to client satisfaction, ${agent.fullName.split(" ")[0]} helps families and investors find their perfect sanctuary.`}
            </p>

            <div style={s.statsRow}>
              {[
                { icon: <FaUsers />, value: `${agent.clientsSold || 120}+`, label: "Clients" },
                { icon: <FaAward />, value: `${agent.experience || 5}+`, label: "Exp. Years" },
                { icon: <FaHome />, value: properties.length, label: "Listings" },
              ].map((st, i) => (
                <div key={i} style={s.statItem}>
                  <div style={s.statIcon}>{st.icon}</div>
                  <span style={s.statValue}>{st.value}</span>
                  <span style={s.statLabel}>{st.label}</span>
                </div>
              ))}
            </div>

            <div style={s.actionRow} className="ad-action-row">
              <div style={s.contactInfo}>
                <div style={s.contactItem}><FaEnvelope style={s.contactIcon} /><span>{agent.email}</span></div>
                <div style={s.contactItem}><FaPhoneAlt style={s.contactIcon} /><span>{agent.phone}</span></div>
              </div>
              <div style={s.btnGroup}>
                <a href={`tel:${agent.phone}`} style={s.callBtn} className="ad-call-btn">Call Now</a>
                <a
                  href={`https://wa.me/${agent.phone.replace(/\D/g, "")}`}
                  target="_blank" rel="noreferrer"
                  style={s.waBtn} className="ad-wa-btn"
                >
                  <FaWhatsapp style={{ marginRight: 8 }} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div style={s.propertySection}>
          <div style={s.sectionHeader}>
            <div>
              <div style={s.tag}><span style={s.tagDot}></span> PORTFOLIO</div>
              <h2 style={s.sectionTitle}>Exclusive managed properties</h2>
            </div>
            <button style={s.moreBtn} className="ad-more-btn" onClick={() => navigate("/properties")}>
              Explore All
            </button>
          </div>

          {propsLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
              <div style={s.spinner}></div>
            </div>
          ) : properties.length > 0 ? (
            <div style={s.grid} className="ad-grid">
              {properties.map((p) => (
                <div key={p._id} style={s.card} className="ad-prop-card" onClick={() => navigate(`/property/${p._id}`)}>
                  <div style={s.propImgWrapper}>
                    <img src={getImageUrl(p.image)} alt={p.title} style={s.cardImg} />
                    <div style={s.priceTag}>₹{p.price?.toLocaleString()}</div>
                  </div>
                  <div style={s.cardContent}>
                    <h3 style={s.cardTitle}>{p.title}</h3>
                    <p style={s.cardAddress}>{p.city || p.location}</p>
                    <div style={s.cardStats}>
                      <div style={s.propStat}><FaBed style={{ color: "#B2846B" }} /> {p.bedrooms || 0}</div>
                      <div style={s.propStat}><FaBath style={{ color: "#819B8B" }} /> {p.bathrooms || 0}</div>
                      <div style={s.propStat}><FaRulerCombined style={{ color: "#627B68" }} /> {p.area || 0} sqft</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={s.emptyState}>No properties listed yet.</div>
          )}
        </div>

        {/* CTA Section */}
        <div style={s.ctaSection}>
          <div style={s.ctaContent}>
            <h2 style={s.ctaTitle}>Looking for a custom property strategy?</h2>
            <p style={s.ctaSub}>Our expert agents handle everything from valuation to final closing.</p>
            <div style={s.ctaBtns}>
              <a href={`tel:${agent.phone}`} style={s.ctaPrimary}>
                Speak with {agent.fullName.split(" ")[0]}
              </a>
              <button style={s.ctaSecondary} onClick={() => navigate("/contact")}>
                General Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const s = {
  page: {
    width: "100%", minHeight: "100vh",
    display: "flex", flexDirection: "column", alignItems: "center",
    paddingBottom: 100,
    background: "linear-gradient(160deg, #f5ede6 0%, #faf6f3 50%, #eef2ee 100%)",
    fontFamily: "'DM Sans', sans-serif",
  },
  container: { maxWidth: 1100, width: "92%", marginTop: 40 },

  backLink: {
    fontSize: 15, fontWeight: 600, color: "#B2846B",
    cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
    marginBottom: 40, transition: "0.25s ease", fontFamily: "'DM Sans', sans-serif",
  },
  backBtn: {
    background: "none", border: "none", color: "#B2846B", fontWeight: 700,
    cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
    margin: "0 auto 20px", fontFamily: "'DM Sans', sans-serif", fontSize: 15,
  },
  errorBanner: {
    background: "#f5ddd7", color: "#8b3a25", padding: 20,
    borderRadius: 14, border: "1px solid #e8c4b8",
    maxWidth: 500, margin: "0 auto", fontFamily: "'DM Sans', sans-serif",
  },

  // Profile Card
  profileCard: {
    background: "#fff",
    borderRadius: 40,
    padding: 24,
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: 56,
    alignItems: "center",
    boxShadow: "0 24px 60px rgba(76,51,36,0.1)",
    border: "1px solid #e8ddd5",
    marginBottom: 90,
  },
  imageCol: { width: "100%", height: 520, borderRadius: 32, overflow: "hidden" },
  profileImg: { width: "100%", height: "100%", objectFit: "cover" },
  infoCol: { display: "flex", flexDirection: "column", padding: "16px 8px" },

  tag: {
    fontSize: 11, fontWeight: 700, color: "#B2846B",
    textTransform: "uppercase", letterSpacing: "1.5px",
    display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
    fontFamily: "'DM Sans', sans-serif",
  },
  tagDot: { width: 6, height: 6, backgroundColor: "#B2846B", borderRadius: "50%", display: "inline-block" },

  nameRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 6 },
  name: {
    fontSize: 46, fontWeight: 700, color: "#4C3324", margin: 0,
    letterSpacing: "-1.5px", fontFamily: "'Sora', sans-serif",
  },
  verifiedIcon: { color: "#627B68", fontSize: 26, flexShrink: 0 },
  role: { fontSize: 15, color: "#819B8B", fontWeight: 500, marginBottom: 22 },
  bio: { fontSize: 16, color: "#7a5c4a", lineHeight: 1.75, marginBottom: 36, fontWeight: 400 },

  statsRow: {
    display: "flex", gap: 36, marginBottom: 42,
    borderTop: "1px solid #e8ddd5", borderBottom: "1px solid #e8ddd5",
    padding: "22px 0",
  },
  statItem: { display: "flex", flexDirection: "column", gap: 4 },
  statIcon: { color: "#E4CBB6", fontSize: 15, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: 700, color: "#4C3324", fontFamily: "'Sora', sans-serif" },
  statLabel: { fontSize: 11, color: "#B2846B", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" },

  actionRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", gap: 20 },
  contactInfo: { display: "flex", flexDirection: "column", gap: 8 },
  contactItem: { display: "flex", alignItems: "center", gap: 10, color: "#7a5c4a", fontSize: 14, fontWeight: 500 },
  contactIcon: { color: "#B2846B", fontSize: 12 },
  btnGroup: { display: "flex", gap: 12 },
  callBtn: {
    padding: "14px 28px", background: "#fff", color: "#4C3324",
    border: "1.5px solid #ddd0c6", borderRadius: 40,
    fontWeight: 700, cursor: "pointer", transition: "0.25s ease",
    fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center",
    fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 12px rgba(76,51,36,0.08)",
  },
  waBtn: {
    padding: "14px 28px", background: "#f0ebe5", color: "#4C3324",
    border: "none", borderRadius: 40,
    fontWeight: 700, cursor: "pointer", transition: "0.25s ease",
    fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center",
    fontFamily: "'DM Sans', sans-serif",
  },

  // Properties
  propertySection: { marginTop: 40 },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44 },
  sectionTitle: {
    fontSize: 34, fontWeight: 700, margin: "6px 0 0 0",
    letterSpacing: "-0.8px", color: "#4C3324", fontFamily: "'Sora', sans-serif",
  },
  moreBtn: {
    padding: "12px 28px", background: "#4C3324", color: "#fff",
    border: "none", borderRadius: 40, fontWeight: 700,
    cursor: "pointer", transition: "0.25s", fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
  },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 28 },
  card: {
    background: "#fff", borderRadius: 28, overflow: "hidden",
    cursor: "pointer", transition: "0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
    border: "1px solid #e8ddd5", boxShadow: "0 8px 24px rgba(76,51,36,0.06)",
  },
  propImgWrapper: { position: "relative", height: 240, borderRadius: 28, overflow: "hidden", margin: 10 },
  cardImg: { width: "100%", height: "100%", objectFit: "cover" },
  priceTag: {
    position: "absolute", bottom: 14, right: 14,
    background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
    padding: "7px 14px", borderRadius: 12,
    fontWeight: 800, fontSize: 15, color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    border: "1px solid #e8ddd5",
  },
  cardContent: { padding: "16px 22px 22px" },
  cardTitle: {
    fontSize: 18, fontWeight: 700, margin: "0 0 6px 0",
    color: "#4C3324", letterSpacing: "-0.3px", fontFamily: "'Sora', sans-serif",
  },
  cardAddress: { fontSize: 13, color: "#819B8B", margin: "0 0 16px 0" },
  cardStats: { display: "flex", gap: 18, color: "#7a5c4a", fontSize: 13, fontWeight: 600 },
  propStat: { display: "flex", alignItems: "center", gap: 7 },

  emptyState: {
    textAlign: "center", padding: "50px",
    color: "#B2846B", fontSize: 15, fontStyle: "italic",
    fontFamily: "'DM Sans', sans-serif",
  },

  // CTA Section
  ctaSection: {
    marginTop: 90, backgroundColor: "#4C3324",
    padding: "80px 40px", borderRadius: 40,
    color: "white", textAlign: "center",
    boxShadow: "0 20px 40px rgba(76,51,36,0.2)",
  },
  ctaContent: { maxWidth: 760, margin: "0 auto" },
  ctaTitle: {
    fontSize: 38, fontWeight: 700, marginBottom: 16,
    letterSpacing: "-1px", fontFamily: "'Sora', sans-serif",
  },
  ctaSub: { fontSize: 18, opacity: 0.75, marginBottom: 36, fontWeight: 400, fontFamily: "'DM Sans', sans-serif" },
  ctaBtns: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" },
  ctaPrimary: {
    backgroundColor: "#B2846B", color: "#fff",
    border: "none", padding: "16px 40px", borderRadius: 40,
    fontWeight: 700, fontSize: 15, cursor: "pointer",
    textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
  },
  ctaSecondary: {
    backgroundColor: "transparent", color: "white",
    border: "1px solid rgba(255,255,255,0.35)", padding: "16px 40px", borderRadius: 40,
    fontWeight: 700, fontSize: 15, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
  },

  // Loader / Error
  loaderContainer: {
    height: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 16,
    background: "linear-gradient(160deg, #f5ede6 0%, #faf6f3 50%, #eef2ee 100%)",
  },
  spinner: {
    width: 40, height: 40,
    border: "3px solid #e8ddd5", borderTop: "3px solid #B2846B",
    borderRadius: "50%", animation: "spin 1s linear infinite",
  },
=======
const styles = {
    page: { width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px', background: '#f9f6f1' },
    container: { maxWidth: '1100px', width: '92%', marginTop: '40px' },

    backLink: { fontSize: '15px', fontWeight: '600', color: '#6b5e58', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', transition: '0.3s ease' },

    // PROFILE CARD (Sophie Bennett Style)
    profileCard: { 
        background: '#fff', 
        borderRadius: '50px', 
        padding: '20px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.2fr', 
        gap: '60px', 
        alignItems: 'center',
        boxShadow: '0 30px 60px -20px rgba(76, 51, 36, 0.08)',
        border: '1px solid rgba(228, 203, 182, 0.2)',
        marginBottom: '100px'
    },
    imageCol: { width: '100%', height: '550px', borderRadius: '40px', overflow: 'hidden' },
    profileImg: { width: '100%', height: '100%', objectFit: 'cover' },
    infoCol: { display: 'flex', flexDirection: 'column', padding: '20px' },
    tag: { fontSize: '11px', fontWeight: '700', color: '#6b5e58', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' },
    tagDot: { width: '6px', height: '6px', backgroundColor: '#819b8b', borderRadius: '50%' },
    nameRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '5px' },
    name: { fontSize: '48px', fontWeight: '700', color: '#4c3324', margin: 0, letterSpacing: '-1.5px' },
    verifiedIcon: { color: '#22c55e', fontSize: '28px' },
    role: { fontSize: '16px', color: '#627b68', fontWeight: '500', marginBottom: '25px' },
    bio: { fontSize: '17px', color: '#3a2e28', lineHeight: '1.7', marginBottom: '40px', fontWeight: '400' },
    
    statsRow: { display: 'flex', gap: '40px', marginBottom: '50px', borderTop: '1px solid rgba(228, 203, 182, 0.2)', borderBottom: '1px solid rgba(228, 203, 182, 0.2)', padding: '25px 0' },
    statItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
    statIcon: { color: '#819b8b', fontSize: '16px', marginBottom: '8px' },
    statValue: { fontSize: '22px', fontWeight: '700', color: '#4c3324' },
    statLabel: { fontSize: '12px', color: '#6b5e58', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' },

    actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
    contactInfo: { display: 'flex', flexDirection: 'column', gap: '8px' },
    contactItem: { display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '14px', fontWeight: '500' },
    contactIcon: { color: '#819b8b', fontSize: '12px' },
    btnGroup: { display: 'flex', gap: '15px' },
    callBtn: { padding: '16px 35px', background: '#fff', color: '#4c3324', border: '1px solid rgba(228, 203, 182, 0.4)', borderRadius: '40px', fontWeight: '700', cursor: 'pointer', transition: '0.3s ease', fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', boxShadow: '0 5px 15px rgba(76, 51, 36, 0.03)' },
    followBtn: { padding: '16px 35px', background: '#faf7f5', color: '#4c3324', border: '1px solid rgba(228, 203, 182, 0.2)', borderRadius: '40px', fontWeight: '700', cursor: 'pointer', transition: '0.3s ease', fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', boxShadow: '0 10px 20px rgba(76, 51, 36, 0.05)' },

    // PROPERTIES
    propertySection: { marginTop: '40px' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' },
    sectionTitle: { fontSize: '36px', fontWeight: '700', margin: '5px 0 0 0', letterSpacing: '-1px', color: '#4c3324' },
    moreBtn: { padding: '12px 30px', background: '#627b68', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', transition: '0.3s' },
    
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '35px' },
    card: { background: '#fff', borderRadius: '35px', overflow: 'hidden', cursor: 'pointer', transition: '0.4s cubic-bezier(0.165, 0.84, 0.44, 1)', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 15px 35px rgba(0,0,0,0.04)' },
    propImgWrapper: { position: 'relative', height: '260px', borderRadius: '35px', overflow: 'hidden', margin: '10px' },
    cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
    priceTag: { position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(250, 247, 245, 0.9)', backdropFilter: 'blur(10px)', padding: '8px 15px', borderRadius: '15px', fontWeight: '800', fontSize: '16px', color: '#4c3324' },
    cardContent: { padding: '20px 25px 25px 25px' },
    cardTitle: { fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0', color: '#4c3324', letterSpacing: '-0.5px' },
    cardAddress: { fontSize: '14px', color: '#6b5e58', margin: '0 0 20px 0' },
    cardStats: { display: 'flex', gap: '20px', color: '#4c3324', fontSize: '14px', fontWeight: '500' },
    propStat: { display: 'flex', alignItems: 'center', gap: '8px' },

    // UTILS
    loaderContainer: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', background: '#f9fcfb' },
    spinner: { width: '40px', height: '40px', border: '3px solid #faf7f5', borderTop: '3px solid #627b68', borderRadius: '50%', animation: 'spin 1s linear infinite' },
    centerLoading: { width: '100%', padding: '50px', display: 'flex', justifyContent: 'center' },
    errorContainer: { padding: '120px 20px', textAlign: 'center' },
    backBtn: { background: 'none', border: 'none', color: '#4c3324', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto 20px' },
    errorBanner: { background: '#fff1f2', color: '#e11d48', padding: '20px', borderRadius: '15px', border: '1px solid #fda4af', maxWidth: '500px', margin: '0 auto' },
    emptyState: { textAlign: 'center', padding: '60px', color: '#999', fontSize: '16px' },

    darkCtaSection: { marginTop: '100px', backgroundColor: '#4c3324', padding: '100px 40px', borderRadius: '50px', color: 'white', textAlign: 'center' },
    ctaContent: { maxWidth: '800px', margin: '0 auto' },
    ctaTitle: { fontSize: '42px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1.5px' },
    ctaSub: { fontSize: '20px', opacity: 0.7, marginBottom: '40px', fontWeight: '400' },
    ctaBtns: { display: 'flex', gap: '20px', justifyContent: 'center' },
    ctaPrimary: { backgroundColor: 'white', color: '#4c3324', border: 'none', padding: '18px 45px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', textDecoration: 'none' },
    ctaSecondary: { backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '18px 45px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }
>>>>>>> e85f1ae (nilam2)
};


export default AgentDetails;

