import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot, FaCalendarDays, FaTag, FaArrowLeft, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

const MySellProperties = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        if (!auth) { navigate("/login"); return; }
        try {
            setLoading(true);
            const res = await axios.get(`/api/users/${auth.id}/sales`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setProperties(res.data);
            setLoading(false);
        } catch (err) {
            setError(`Failed to load your sell properties: ${err.response?.data?.message || err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => { fetchProperties(); }, [auth]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    if (loading) {
        return (
            <div style={s.loaderContainer}>
                <div style={s.spinner}></div>
                <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>Fetching your listings...</p>
            </div>
        );
    }

    return (
        <div style={s.pageWrapper}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
                * { box-sizing: border-box; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .msp-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 32px rgba(76,51,36,0.12) !important;
                }
                .msp-view-btn:hover {
                    background-color: #627B68 !important;
                    color: #fff !important;
                    border-color: #627B68 !important;
                }
                @media (max-width: 768px) {
                    .msp-grid { grid-template-columns: 1fr !important; }
                    .msp-title { font-size: 24px !important; }
                }
                @media (max-width: 480px) {
                    .msp-card { border-radius: 12px !important; }
                    .msp-img { height: 160px !important; }
                }
            `}</style>

            <div style={s.container}>
                {/* Header */}
                <div style={s.header}>
                    <button onClick={() => navigate(-1)} style={s.backBtn}>
                        <FaArrowLeft /> Back
                    </button>
                    <p style={s.breadcrumb}>My Account / Sell Properties</p>
                    <h1 style={s.title} className="msp-title">My Sell Properties</h1>
                    <p style={s.subTitle}>Manage the properties you have listed for sale.</p>
                </div>

                {error && <div style={s.errorBanner}>{error}</div>}

                {properties.length === 0 ? (
                    <div style={s.emptyState}>
                        <FaTag style={s.emptyIcon} />
                        <h3 style={{ color: "#4C3324", fontFamily: "'Sora', sans-serif", marginBottom: 8 }}>No properties listed</h3>
                        <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>You haven't listed any properties for sale yet.</p>
                        <Link to="/sellproperty" style={s.browseBtn}>List a Property</Link>
                    </div>
                ) : (
                    <div style={s.grid} className="msp-grid">
                        {properties.map((property) => {
                            const imageUrl = property.images?.length > 0 ? property.images[0] : property.image;

                            return (
                                <div key={property._id} style={s.card} className="msp-card">
                                    {/* Image */}
                                    <div style={s.imageSection} className="msp-img">
                                        {imageUrl ? (
                                            <img
                                                src={`http://localhost:5000${imageUrl}`}
                                                alt={property.title}
                                                style={s.propertyImg}
                                            />
                                        ) : (
                                            <div style={s.imgPlaceholder}>
                                                <FaTag style={{ fontSize: 24, marginBottom: 8 }} />
                                                No Image
                                            </div>
                                        )}
                                        <div style={s.badge}>Listed</div>
                                    </div>

                                    {/* Card Body */}
                                    <div style={s.cardBody}>
                                        <div style={s.typeTag}>{property.propertyType || property.category || "Property"}</div>
                                        <h3 style={s.propertyTitle}>{property.title || "Untitled Property"}</h3>

                                        <div style={s.infoRow}>
                                            <FaLocationDot style={s.infoIcon} />
                                            <span>{property.city || property.address || "Location not available"}</span>
                                        </div>
                                        <div style={s.infoRow}>
                                            <FaCalendarDays style={s.infoIcon} />
                                            <span>Listed on {formatDate(property.createdAt)}</span>
                                        </div>

                                        <div style={s.priceSection}>
                                            <div style={s.priceLabel}>Selling Price</div>
                                            <div style={s.priceValue}>
                                                {property.price ? `₹${property.price.toLocaleString()}` : "Contact for Price"}
                                            </div>
                                        </div>

                                        <div style={s.actionRow}>
                                            <Link to={`/property/${property._id}`} style={s.viewBtn} className="msp-view-btn">
                                                View Details
                                            </Link>
                                            <button style={s.editBtn} title="Edit Property" disabled>
                                                <FaPenToSquare />
                                            </button>
                                            <button style={s.deleteBtn} title="Delete Property" disabled>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const s = {
    pageWrapper: {
<<<<<<< HEAD
        backgroundColor: "#f9f6f1",
=======
        background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        minHeight: "100vh",
        padding: "100px 20px 60px",
        fontFamily: "'DM Sans', sans-serif",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
    },
    header: {
        marginBottom: 40,
    },
    backBtn: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
<<<<<<< HEAD
        color: "#819b8b",
        fontWeight: "600",
        fontSize: "15px",
        cursor: "pointer",
        marginBottom: "20px",
        padding: "0",
        transition: "all 0.2s",
=======
        color: "#B2846B",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        marginBottom: 20,
        padding: 0,
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.2s",
    },
    breadcrumb: {
        fontSize: 12,
        color: "#B2846B",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
        margin: "0 0 6px 0",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    title: {
<<<<<<< HEAD
        fontSize: "32px",
        fontWeight: "800",
        color: "#4c3324",
=======
        fontSize: 32,
        fontWeight: 800,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        margin: "0 0 8px 0",
        letterSpacing: "-1px",
    },
    subTitle: {
<<<<<<< HEAD
        fontSize: "16px",
        color: "#6b5e58",
        margin: "0",
=======
        fontSize: 15,
        color: "#819B8B",
        margin: 0,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    errorBanner: {
        backgroundColor: "#f5ddd7",
        color: "#8b3a25",
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        textAlign: "center",
        border: "1px solid #e8c4b8",
        fontFamily: "'DM Sans', sans-serif",
    },
    loaderContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
    },
    spinner: {
<<<<<<< HEAD
        width: "40px",
        height: "40px",
        border: "4px solid #faf7f5",
        borderTop: "4px solid #627b68",
=======
        width: 40,
        height: 40,
        border: "4px solid #e8ddd5",
        borderTop: "4px solid #B2846B",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    emptyState: {
        textAlign: "center",
        padding: "80px 20px",
        backgroundColor: "#ffffff",
<<<<<<< HEAD
        borderRadius: "24px",
        border: "2px dashed rgba(228, 203, 182, 0.4)",
    },
    emptyIcon: {
        fontSize: "64px",
        color: "#b2846b",
        marginBottom: "20px",
        opacity: 0.3,
    },
    browseBtn: {
        display: "inline-block",
        marginTop: "24px",
        padding: "12px 24px",
        backgroundColor: "#627b68",
        color: "white",
        textDecoration: "none",
        borderRadius: "10px",
        fontWeight: "600",
        transition: "all 0.2s",
=======
        borderRadius: 24,
        border: "2px dashed rgba(228, 203, 182, 0.4)",
    },
    emptyIcon: {
        fontSize: 64,
        color: "#E4CBB6",
        marginBottom: 20,
        opacity: 0.5,
    },
    browseBtn: {
        display: "inline-block",
        marginTop: 24,
        padding: "12px 28px",
        backgroundColor: "#627B68",
        color: "#fff",
        textDecoration: "none",
        borderRadius: 10,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 3px 10px rgba(98,123,104,0.3)",
        transition: "all 0.18s",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: 28,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: "1px solid rgba(228, 203, 182, 0.2)",
    },
    imgPlaceholder: {
        width: "100%",
        height: "200px",
        backgroundColor: "#f0ebe5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        color: "#B2846B",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "'DM Sans', sans-serif",
    },
    imageSection: {
        position: "relative",
        height: 200,
    },
    propertyImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    imgPlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f0ebe5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#B2846B",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
    },
    badge: {
        position: "absolute",
<<<<<<< HEAD
        top: "15px",
        right: "15px",
        padding: "6px 12px",
        borderRadius: "30px",
        fontSize: "12px",
        fontWeight: "700",
        backgroundColor: "#e4cbb6",
        color: "#4c3324",
        border: "1px solid rgba(76, 51, 36, 0.1)",
=======
        top: 14,
        right: 14,
        padding: "5px 14px",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: 700,
        backgroundColor: "#627B68",
        color: "#ffffff",
        border: "1px solid #4d6454",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.04em",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    cardBody: {
        padding: "22px 24px",
    },
    typeTag: {
        display: "inline-block",
<<<<<<< HEAD
        padding: "4px 10px",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
        fontSize: "11px",
        fontWeight: "700",
        borderRadius: "6px",
=======
        padding: "3px 10px",
        backgroundColor: "#E4CBB6",
        color: "#4C3324",
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 6,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        textTransform: "uppercase",
        marginBottom: 10,
        letterSpacing: "0.05em",
        fontFamily: "'DM Sans', sans-serif",
    },
    propertyTitle: {
<<<<<<< HEAD
        fontSize: "18px",
        fontWeight: "700",
        color: "#4c3324",
=======
        fontSize: 17,
        fontWeight: 700,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        margin: "0 0 12px 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 14,
        color: "#819B8B",
        marginBottom: 7,
        fontFamily: "'DM Sans', sans-serif",
    },
    infoIcon: {
<<<<<<< HEAD
        color: "#819b8b",
    },
    priceSection: {
        marginTop: "20px",
        padding: "16px",
        backgroundColor: "#faf7f5",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(228, 203, 182, 0.1)"
=======
        color: "#B2846B",
        flexShrink: 0,
    },
    priceSection: {
        marginTop: 18,
        padding: "14px 16px",
        backgroundColor: "#fdf9f7",
        borderRadius: 12,
        border: "1px solid #e8ddd5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    priceLabel: {
        fontSize: 13,
        color: "#819B8B",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
    },
    priceValue: {
<<<<<<< HEAD
        fontSize: "18px",
        fontWeight: "800",
        color: "#4c3324",
=======
        fontSize: 18,
        fontWeight: 800,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    actionRow: {
        marginTop: 18,
        display: "flex",
        gap: 10,
        alignItems: "center",
    },
    viewBtn: {
        flex: 1,
        textAlign: "center",
        padding: 10,
        backgroundColor: "#ffffff",
<<<<<<< HEAD
        color: "#819b8b",
        border: "1px solid #819b8b",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
=======
        color: "#627B68",
        border: "1.5px solid #627B68",
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 600,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.2s",
    },
    editBtn: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
        border: "none",
        borderRadius: 9,
        cursor: "not-allowed",
        fontSize: 16,
        flexShrink: 0,
        opacity: 0.6,
    },
    deleteBtn: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5ddd7",
        color: "#8b3a25",
        border: "none",
        borderRadius: 9,
        cursor: "not-allowed",
        fontSize: 16,
        flexShrink: 0,
        opacity: 0.6,
    },
};

export default MySellProperties;
