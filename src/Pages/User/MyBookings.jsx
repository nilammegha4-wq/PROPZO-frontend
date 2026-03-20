import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot, FaCalendarDays, FaHouse, FaArrowLeft, FaFileInvoice, FaEnvelope } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

const MyBookings = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        if (!auth) { navigate("/login"); return; }
        try {
            setLoading(true);
            const res = await axios.get(`/api/users/${auth.id}/bookings`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setBookings(res.data);
            setLoading(false);
        } catch (err) {
            setError(`Failed to load your activities: ${err.response?.data?.message || err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, [auth]);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
            case "completed":
                return { bg: "#d4e6da", color: "#627B68", border: "#b8d4c0" };
            case "pending":
                return { bg: "#ede8d8", color: "#7a6435", border: "#d9d0b0" };
            case "failed":
                return { bg: "#f5ddd7", color: "#8b3a25", border: "#e8c4b8" };
            default:
                return { bg: "#f0ebe5", color: "#7a5c4a", border: "#ddd0c6" };
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    if (loading) {
        return (
            <div style={s.loaderContainer}>
                <div style={s.spinner}></div>
                <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>Fetching your activities...</p>
            </div>
        );
    }

    return (
        <div style={s.pageWrapper}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
                * { box-sizing: border-box; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .mb-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 32px rgba(76,51,36,0.12) !important;
                }
                .mb-view-btn:hover {
                    background-color: #627B68 !important;
                    color: #fff !important;
                    border-color: #627B68 !important;
                }
                @media (max-width: 768px) {
                    .mb-grid { grid-template-columns: 1fr !important; }
                    .mb-header-title { font-size: 24px !important; }
                }
                @media (max-width: 480px) {
                    .mb-card { border-radius: 12px !important; }
                    .mb-img-section { height: 160px !important; }
                }
            `}</style>

            <div style={s.container}>
                {/* Header */}
                <div style={s.header}>
                    <button onClick={() => navigate(-1)} style={s.backBtn}>
                        <FaArrowLeft /> Back
                    </button>
                    <p style={s.breadcrumb}>My Account / Activity</p>
                    <h1 style={s.title} className="mb-header-title">My Property Activity</h1>
                    <p style={s.subTitle}>Manage all your real estate bookings and purchases in one place.</p>
                </div>

                {error && <div style={s.errorBanner}>{error}</div>}

                {bookings.length === 0 ? (
                    <div style={s.emptyState}>
                        <FaHouse style={s.emptyIcon} />
                        <h3 style={{ color: "#4C3324", fontFamily: "'Sora', sans-serif", marginBottom: 8 }}>No activities yet</h3>
                        <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>You haven't made any bookings or purchases yet.</p>
                        <Link to="/properties" style={s.browseBtn}>Browse Properties</Link>
                    </div>
                ) : (
                    <div style={s.grid} className="mb-grid">
                        {bookings.map((booking) => {
                            const statusStyle = getStatusStyle(booking.status);
                            const property = booking.property || {};
                            let typeLabel = property.category || "Property";
                            if (typeLabel === "PerRent") typeLabel = "PRE-RENT";
                            if (typeLabel === "Rent") typeLabel = "RENT";
                            if (typeLabel === "Buy") typeLabel = "BUY";

                            return (
                                <div key={booking._id} style={s.card} className="mb-card">
                                    <div style={s.imageSection} className="mb-img-section">
                                        <img
                                            src={property.image || (property.images && property.images[0]) || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073"}
                                            alt={property.title}
                                            style={s.propertyImg}
                                        />
                                        <div style={{
                                            ...s.badge,
                                            backgroundColor: statusStyle.bg,
                                            color: statusStyle.color,
                                            border: `1px solid ${statusStyle.border}`,
                                        }}>
                                            {booking.status || "Appointment"}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div style={s.cardBody}>
                                        <div style={s.typeTag}>{typeLabel}</div>
                                        <h3 style={s.propertyTitle}>{property.title || "Untitled Property"}</h3>

                                        <div style={s.infoRow}>
                                            <FaLocationDot style={s.infoIcon} />
                                            <span>{property.location || "Location not available"}</span>
                                        </div>
                                        <div style={s.infoRow}>
                                            <FaCalendarDays style={s.infoIcon} />
                                            <span>Booked on {formatDate(booking.bookingDate || booking.createdAt)}</span>
                                        </div>

                                        <div style={s.priceSection}>
                                            <div style={s.priceLabel}>Amount Paid</div>
                                            <div style={s.priceValue}>
                                                {booking.amount ? `₹${booking.amount.toLocaleString()}` : "Form Submitted"}
                                            </div>
                                        </div>

                                        <div style={s.actionRow}>
                                            <Link to={`/property/${property._id}`} style={s.viewBtn} className="mb-view-btn">
                                                View Details
                                            </Link>
                                            {booking.amount && (
                                                <button style={s.iconBtn} title="Download Receipt">
                                                    <FaFileInvoice />
                                                </button>
                                            )}
                                            <button style={s.iconBtn} title="Contact Agent">
                                                <FaEnvelope />
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
        background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
        minHeight: "100vh",
        padding: "100px 20px 60px",
        fontFamily: "'DM Sans', sans-serif",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
    },
    header: {
        marginBottom: "40px",
    },
    backBtn: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
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
    },
    title: {
        fontSize: 32,
        fontWeight: 800,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
        margin: "0 0 8px 0",
        letterSpacing: "-1px",
    },
    subTitle: {
        fontSize: 15,
        color: "#819B8B",
        margin: 0,
    },
    errorBanner: {
        backgroundColor: "#f5ddd7",
        color: "#8b3a25",
        padding: "16px",
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
        width: 40,
        height: 40,
        border: "4px solid #e8ddd5",
        borderTop: "4px solid #B2846B",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    emptyState: {
        textAlign: "center",
        padding: "80px 20px",
        backgroundColor: "#ffffff",
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
        border: "1px solid rgba(228, 203, 182, 0.1)",
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
    badge: {
        position: "absolute",
        top: 14,
        right: 14,
        padding: "5px 12px",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.03em",
    },
    cardBody: {
        padding: "22px 24px",
    },
    typeTag: {
        display: "inline-block",
        padding: "3px 10px",
        backgroundColor: "#E4CBB6",
        color: "#4C3324",
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 6,
        textTransform: "uppercase",
        marginBottom: 10,
        letterSpacing: "0.05em",
        fontFamily: "'DM Sans', sans-serif",
    },
    propertyTitle: {
        fontSize: 17,
        fontWeight: 700,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
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
        color: "#B2846B",
        flexShrink: 0,
    },
    priceSection: {
        marginTop: 18,
        padding: "14px 16px",
        backgroundColor: "#fdf9f7",
        borderRadius: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(228, 203, 182, 0.1)",
    },
    priceLabel: {
        fontSize: 13,
        color: "#819B8B",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
    },
    priceValue: {
        fontSize: 18,
        fontWeight: 800,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
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
        padding: "10px",
        backgroundColor: "#ffffff",
        color: "#627B68",
        border: "1.5px solid #627B68",
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.2s",
    },
    iconBtn: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
        border: "none",
        borderRadius: 9,
        cursor: "pointer",
        fontSize: 16,
        transition: "all 0.2s",
    },
};

export default MyBookings;
