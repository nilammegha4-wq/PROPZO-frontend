import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaArrowLeft, FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaAward, FaStar, FaUsers, FaHome, FaWhatsapp } from "react-icons/fa";
import { getImageUrl } from "../config";

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
                console.error("Error fetching agent details:", err);
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
                console.error("Error fetching agent properties:", err);
            } finally {
                setPropsLoading(false);
            }
        };

        fetchAgentDetails();
        fetchAgentProperties();
    }, [agentId]);

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
        </div>
    );
};

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
};


export default AgentDetails;

