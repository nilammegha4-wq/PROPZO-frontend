import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowLeft, FaStar, FaTrophy, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
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
                setError("Failed to load agent profile. The requested agent might not exist.");
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
                <p>Loading agent profile...</p>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div style={styles.errorContainer}>
                <button onClick={() => navigate("/agent")} style={styles.backBtnWrapper}>
                    <FaArrowLeft /> Back to Agents
                </button>
                <div style={styles.errorBanner}>{error || "Agent not found."}</div>
            </div>
        );
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <button onClick={() => navigate("/agent")} style={styles.backBtnWrapper}>
                    <FaArrowLeft /> Back to Agents
                </button>

                {/* Hero Section */}
                <div style={styles.heroCard}>
                    <div style={styles.imageSection}>
                        <img
                            src={getImageUrl(agent.image)}
                            alt={agent.fullName}
                            style={styles.heroImage}
                        />
                    </div>

                    <div style={styles.infoSection}>
                        <div style={styles.roleTag}>{agent.role || "Real Estate Agent"}</div>
                        <h1 style={styles.agentName}>{agent.fullName}</h1>

                        <div style={styles.metricsRow}>
                            <div style={styles.metric}>
                                <FaTrophy style={styles.metricIcon} />
                                <div style={styles.metricText}>
                                    <strong>{agent.experience || "1+ Year"}</strong>
                                    <span>Experience</span>
                                </div>
                            </div>
                            <div style={styles.metric}>
                                <FaStar style={styles.metricIcon} />
                                <div style={styles.metricText}>
                                    <strong>{agent.rating || "5.0"}</strong>
                                    <span>Rating</span>
                                </div>
                            </div>
                            <div style={styles.metric}>
                                <FaBuilding style={styles.metricIcon} />
                                <div style={styles.metricText}>
                                    <strong>{agent.specialization || "Residential"}</strong>
                                    <span>Specialization</span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.contactDetails}>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIconWrapper}><FaPhoneAlt /></div>
                                <span>{agent.phone}</span>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIconWrapper}><FaEnvelope /></div>
                                <span>{agent.email}</span>
                            </div>
                        </div>

                        <div style={styles.actionRow}>
                            <a href={`tel:${agent.phone}`} style={styles.callBtn}>
                                <FaPhoneAlt /> Call Now
                            </a>
                            <a
                                href={`https://wa.me/${agent.phone.replace("+", "")}`}
                                target="_blank"
                                rel="noreferrer"
                                style={styles.whatsappBtn}
                            >
                                <FaWhatsapp /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div style={styles.aboutCard}>
                    <h2 style={styles.sectionTitle}>About {agent.fullName.split(" ")[0]}</h2>
                    <div style={styles.aboutContent}>
                        <p>{agent.description || `${agent.fullName} is an experienced professional specializing in ${agent.specialization || "premium residential properties"} over the past ${agent.experience || "few years"}. With a strong commitment to client satisfaction, ${agent.fullName.split(" ")[0]} provides exceptional guidance throughout the buying and selling process.`}</p>
                    </div>
                </div>

                {/* Properties Section */}
                <div style={styles.propertySection}>
                    <h2 style={styles.sectionTitle}>Properties Listed by {agent.fullName}</h2>

                    {propsLoading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ ...styles.spinner, margin: '0 auto 16px' }}></div>
                            <p>Loading properties...</p>
                        </div>
                    ) : properties.length > 0 ? (
                        <div style={styles.propertyGrid}>
                            {properties.map((p) => (
                                <div
                                    key={p._id}
                                    style={styles.propertyCard}
                                    onClick={() => navigate(`/property/${p._id}`)}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <div style={styles.propertyBadge}>
                                            {p.propertyType || "Buy"}
                                        </div>
                                        <img
                                            src={getImageUrl(p.image)}
                                            alt={p.title}
                                            style={styles.propertyImage}
                                        />
                                    </div>
                                    <div style={styles.propertyInfo}>
                                        <div style={styles.propertyPrice}>{p.displayPrice}</div>
                                        <h4 style={styles.propertyTitle}>{p.title}</h4>
                                        <p style={styles.propertyAddress}>
                                            <FaMapMarkerAlt style={{ color: '#64748b', marginRight: '6px' }} />
                                            {p.city || p.location}
                                        </p>
                                        <button style={styles.viewBtn}>View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.emptyState}>
                            <p>This agent has not listed any properties yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "100px 20px 80px",
        fontFamily: "'Inter', sans-serif",
    },
    container: {
        maxWidth: "1000px",
        margin: "0 auto",
    },
    backBtnWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        color: "#0f172a",
        fontWeight: "600",
        fontSize: "15px",
        cursor: "pointer",
        marginBottom: "24px",
        padding: "0",
        transition: "color 0.2s",
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
    errorContainer: {
        padding: "100px 20px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    errorBanner: {
        backgroundColor: "#fef2f2",
        color: "#ef4444",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        border: "1px solid #fee2e2",
        fontWeight: "600",
    },
    heroCard: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        marginBottom: "30px",
        border: "1px solid #f1f5f9",
    },
    imageSection: {
        flex: "0 0 40%",
        minHeight: "450px",
    },
    heroImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top",
    },
    infoSection: {
        flex: "1",
        padding: "48px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    roleTag: {
        display: "inline-block",
        padding: "6px 14px",
        backgroundColor: "#e0f2fe",
        color: "#0284c7",
        fontSize: "13px",
        fontWeight: "700",
        borderRadius: "8px",
        textTransform: "uppercase",
        marginBottom: "16px",
        letterSpacing: "0.5px",
        alignSelf: "flex-start",
    },
    agentName: {
        fontSize: "36px",
        fontWeight: "800",
        color: "#0f172a",
        margin: "0 0 32px 0",
        lineHeight: "1.2",
    },
    metricsRow: {
        display: "flex",
        gap: "32px",
        marginBottom: "36px",
        paddingBottom: "32px",
        borderBottom: "1px solid #f1f5f9",
    },
    metric: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    metricIcon: {
        fontSize: "24px",
        color: "#38bdf8",
    },
    metricText: {
        display: "flex",
        flexDirection: "column",
        strong: {
            fontSize: "16px",
            color: "#0f172a",
            fontWeight: "700",
        },
        span: {
            fontSize: "12px",
            color: "#64748b",
            fontWeight: "500",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
        }
    },
    contactDetails: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "40px",
    },
    contactItem: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        fontSize: "16px",
        color: "#334155",
        fontWeight: "500",
    },
    contactIconWrapper: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
        fontSize: "14px",
    },
    actionRow: {
        display: "flex",
        gap: "16px",
    },
    callBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        flex: 1,
        padding: "14px 24px",
        backgroundColor: "#38bdf8",
        color: "#ffffff",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "600",
        textDecoration: "none",
        transition: "background 0.2s",
        boxShadow: "0 4px 6px -1px rgba(56, 189, 248, 0.4)",
    },
    whatsappBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        flex: 1,
        padding: "14px 24px",
        backgroundColor: "#25D366",
        color: "#ffffff",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "600",
        textDecoration: "none",
        transition: "background 0.2s",
        boxShadow: "0 4px 6px -1px rgba(37, 211, 102, 0.4)",
    },
    aboutCard: {
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.02)",
        border: "1px solid #f1f5f9",
    },
    sectionTitle: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 24px 0",
    },
    aboutContent: {
        color: "#475569",
        fontSize: "16px",
        lineHeight: "1.8",
    },
    propertySection: {
        marginTop: "50px",
        borderTop: "1px solid #e2e8f0",
        paddingTop: "40px",
    },
    propertyGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px",
        marginTop: "24px",
    },
    propertyCard: {
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
        border: "1px solid #f1f5f9",
        cursor: "pointer",
        transition: "transform 0.3s ease",
    },
    propertyImage: {
        width: "100%",
        height: "220px",
        objectFit: "cover",
    },
    propertyBadge: {
        position: 'absolute',
        top: '15px',
        left: '15px',
        background: '#38bdf8',
        color: '#ffffff',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700',
        zIndex: 1,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    propertyInfo: {
        padding: "24px",
    },
    propertyPrice: {
        fontSize: "24px",
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: "8px",
    },
    propertyTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#334155",
        marginBottom: "12px",
    },
    propertyAddress: {
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        color: "#64748b",
        marginBottom: "20px",
    },
    viewBtn: {
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        fontWeight: "600",
        fontSize: "15px",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    emptyState: {
        textAlign: "center",
        padding: "60px 20px",
        backgroundColor: "#f1f5f9",
        borderRadius: "20px",
        color: "#64748b",
        fontSize: "16px",
        fontWeight: "500",
    }
};

export default AgentDetails;
