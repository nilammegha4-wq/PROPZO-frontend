import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot, FaCalendarDays, FaHouse, FaArrowLeft, FaFileInvoice, FaEnvelope } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const MyBookings = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        if (!auth) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`/api/users/${auth.id}/bookings`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setBookings(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Bookings Error Details:", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message
            });
            setError(`Failed to load your activities: ${err.response?.data?.message || err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [auth]);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
            case "completed":
                return { bg: "rgba(129, 155, 139, 0.15)", color: "#627b68", border: "rgba(129, 155, 139, 0.2)" };
            case "pending":
                return { bg: "rgba(178, 132, 107, 0.15)", color: "#b2846b", border: "rgba(178, 132, 107, 0.2)" };
            case "failed":
                return { bg: "#fef2f2", color: "#ef4444", border: "#fee2e2" };
            default:
                return { bg: "#faf7f5", color: "#6b5e58", border: "rgba(228, 203, 182, 0.2)" };
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
                <p>Fetching your activities...</p>
            </div>
        );
    }

    return (
    <div style={styles.pageWrapper}>
      <style>{`
        @media (max-width: 768px) {
          .mb-grid { grid-template-columns: 1fr !important; }
          .mb-header h1 { font-size: 24px !important; }
        }
        @media (max-width: 480px) {
          .mb-card { border-radius: 12px !important; }
          .mb-img-section { height: 160px !important; }
        }
      `}</style>
      <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <button onClick={() => navigate(-1)} style={styles.backBtn}>
                        <FaArrowLeft /> Back
                    </button>
                    <div style={styles.headerTitle}>
                        <h1 style={styles.title}>My Property Activity</h1>
                        <p style={styles.subTitle}>Manage all your real estate bookings and purchases in one place.</p>
                    </div>
                </div>

                {error && <div style={styles.errorBanner}>{error}</div>}

                {bookings.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaHouse style={styles.emptyIcon} />
                        <h3>No activities yet</h3>
                        <p>You haven't made any bookings or purchases yet.</p>
                        <Link to="/properties" style={styles.browseBtn}>Browse Properties</Link>
                    </div>
                ) : (
                    <div style={styles.grid} className="mb-grid">
                        {bookings.map((booking) => {
                            const statusStyle = getStatusStyle(booking.status);
                            const property = booking.property || {};
                            let typeLabel = property.category || "Property";
                            if (typeLabel === "PerRent") typeLabel = "PRE-RENT";
                            if (typeLabel === "Rent") typeLabel = "RENT";
                            if (typeLabel === "Buy") typeLabel = "BUY";

                            return (
                                <div key={booking._id} style={styles.card} className="mb-card">
                                    <div style={styles.imageSection} className="mb-img-section">
                                        <img
                                            src={property.image || (property.images && property.images[0]) || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073"}
                                            alt={property.title}
                                            style={styles.propertyImg}
                                        />
                                        <div style={{ ...styles.badge, backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}>
                                            {booking.status || "Appointment"}
                                        </div>
                                    </div>

                                    <div style={styles.cardBody}>
                                        <div style={styles.typeTag}>{typeLabel}</div>
                                        <h3 style={styles.propertyTitle}>{property.title || "Untitled Property"}</h3>

                                        <div style={styles.infoRow}>
                                            <FaLocationDot style={styles.infoIcon} />
                                            <span>{property.location || "Location not available"}</span>
                                        </div>

                                        <div style={styles.infoRow}>
                                            <FaCalendarDays style={styles.infoIcon} />
                                            <span>Booked on {formatDate(booking.bookingDate || booking.createdAt)}</span>
                                        </div>

                                        <div style={styles.priceSection}>
                                            <div style={styles.priceLabel}>Amount Paid</div>
                                            <div style={styles.priceValue}>
                                                {booking.amount ? `₹${booking.amount.toLocaleString()}` : "Form Submitted"}
                                            </div>
                                        </div>

                                        <div style={styles.actionRow}>
                                            <Link to={`/property/${property._id}`} style={styles.viewBtn}>View Details</Link>
                                            {booking.amount && (
                                                <button style={styles.receiptBtn} title="Download Receipt">
                                                    <FaFileInvoice />
                                                </button>
                                            )}
                                            <button style={styles.contactBtn} title="Contact Agent">
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

const styles = {
    pageWrapper: {
        backgroundColor: "#f9f6f1",
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
        gap: "8px",
        background: "none",
        border: "none",
        color: "#819b8b",
        fontWeight: "600",
        fontSize: "15px",
        cursor: "pointer",
        marginBottom: "20px",
        padding: "0",
        transition: "all 0.2s",
    },
    headerTitle: {},
    title: {
        fontSize: "32px",
        fontWeight: "800",
        color: "#4c3324",
        margin: "0 0 8px 0",
        letterSpacing: "-1px",
    },
    subTitle: {
        fontSize: "16px",
        color: "#6b5e58",
        margin: "0",
    },
    errorBanner: {
        backgroundColor: "#fef2f2",
        color: "#ef4444",
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "24px",
        textAlign: "center",
        border: "1px solid #fee2e2",
    },
    loaderContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #faf7f5",
        borderTop: "4px solid #627b68",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    emptyState: {
        textAlign: "center",
        padding: "100px 20px",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        border: "2px dashed rgba(228, 203, 182, 0.4)",
    },
    emptyIcon: {
        fontSize: "64px",
        color: "rgba(228, 203, 182, 0.5)",
        marginBottom: "20px",
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
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "30px",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: "1px solid rgba(228, 203, 182, 0.1)",
    },
    imageSection: {
        position: "relative",
        height: "200px",
    },
    propertyImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    badge: {
        position: "absolute",
        top: "15px",
        right: "15px",
        padding: "6px 12px",
        borderRadius: "30px",
        fontSize: "12px",
        fontWeight: "700",
    },
    cardBody: {
        padding: "24px",
    },
    typeTag: {
        display: "inline-block",
        padding: "4px 10px",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
        fontSize: "11px",
        fontWeight: "700",
        borderRadius: "6px",
        textTransform: "uppercase",
        marginBottom: "12px",
        letterSpacing: "0.5px",
    },
    propertyTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#4c3324",
        margin: "0 0 12px 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        color: "#64748b",
        marginBottom: "8px",
    },
    infoIcon: {
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
        border: "1px solid rgba(228, 203, 182, 0.1)",
    },
    priceLabel: {
        fontSize: "13px",
        color: "#64748b",
        fontWeight: "500",
    },
    priceValue: {
        fontSize: "18px",
        fontWeight: "800",
        color: "#4c3324",
    },
    actionRow: {
        marginTop: "20px",
        display: "flex",
        gap: "10px",
    },
    viewBtn: {
        flex: 1,
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#ffffff",
        color: "#819b8b",
        border: "1px solid #819b8b",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        textDecoration: "none",
        transition: "all 0.2s",
    },
    receiptBtn: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.2s",
    },
    contactBtn: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.2s",
    },
};

export default MyBookings;
