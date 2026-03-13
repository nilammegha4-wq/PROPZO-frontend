import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPhoneAlt, FaEnvelope, FaArrowLeft, FaBed, FaBath,
  FaRulerCombined, FaCheckCircle, FaAward, FaStar,
  FaUsers, FaHome, FaWhatsapp
} from "react-icons/fa";
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
};

export default AgentDetails;
