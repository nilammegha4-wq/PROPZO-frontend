import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot, FaCalendarDays, FaTag, FaArrowLeft, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const MySellProperties = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        if (!auth) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`/api/users/${auth.id}/sales`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setProperties(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Sales Error Details:", err);
            setError(`Failed to load your sell properties: ${err.response?.data?.message || err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [auth]);

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
                <p>Fetching your listings...</p>
            </div>
        );
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <button onClick={() => navigate(-1)} style={styles.backBtn}>
                        <FaArrowLeft /> Back
                    </button>
                    <div style={styles.headerTitle}>
                        <h1 style={styles.title}>My Sell Properties</h1>
                        <p style={styles.subTitle}>Manage the properties you have listed for sale.</p>
                    </div>
                </div>

                {error && <div style={styles.errorBanner}>{error}</div>}

                {properties.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaTag style={styles.emptyIcon} />
                        <h3>No properties listed</h3>
                        <p>You haven't listed any properties for sale yet.</p>
                        <Link to="/sellproperty" style={styles.browseBtn}>List a Property</Link>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {properties.map((property) => {
                            const imageUrl = property.images && property.images.length > 0
                                ? property.images[0]
                                : property.image;

                            return (
                                <div key={property._id} style={styles.card}>
                                    <div style={styles.imageSection}>
                                        {imageUrl ? (
                                            <img
                                                src={`http://localhost:5000${imageUrl}`}
                                                alt={property.title}
                                                style={styles.propertyImg}
                                            />
                                        ) : (
                                            <div style={styles.imgPlaceholder}>
                                                <FaTag /> No Image
                                            </div>
                                        )}
                                        <div style={styles.badge}>
                                            Listed
                                        </div>
                                    </div>

                                    <div style={styles.cardBody}>
                                        <div style={styles.typeTag}>{property.propertyType || property.category || "Property"}</div>
                                        <h3 style={styles.propertyTitle}>{property.title || "Untitled Property"}</h3>

                                        <div style={styles.infoRow}>
                                            <FaLocationDot style={styles.infoIcon} />
                                            <span>{property.city || property.address || "Location not available"}</span>
                                        </div>

                                        <div style={styles.infoRow}>
                                            <FaCalendarDays style={styles.infoIcon} />
                                            <span>Listed on {formatDate(property.createdAt)}</span>
                                        </div>

                                        <div style={styles.priceSection}>
                                            <div style={styles.priceLabel}>Selling Price</div>
                                            <div style={styles.priceValue}>
                                                {property.price ? `₹${property.price.toLocaleString()}` : "Contact for Price"}
                                            </div>
                                        </div>

                                        <div style={styles.actionRow}>
                                            <Link to={`/property/${property._id}`} style={styles.viewBtn}>View Details</Link>
                                            <button style={styles.editBtn} title="Edit Property" disabled>
                                                <FaPenToSquare />
                                            </button>
                                            <button style={styles.deleteBtn} title="Delete Property" disabled>
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

const styles = {
    pageWrapper: {
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "100px 20px 60px",
        fontFamily: "'Inter', sans-serif",
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
        color: "#6366f1",
        fontWeight: "600",
        fontSize: "15px",
        cursor: "pointer",
        marginBottom: "20px",
        padding: "0",
    },
    headerTitle: {},
    title: {
        fontSize: "32px",
        fontWeight: "800",
        color: "#0f172a",
        margin: "0 0 8px 0",
    },
    subTitle: {
        fontSize: "16px",
        color: "#64748b",
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
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #ec4899",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    emptyState: {
        textAlign: "center",
        padding: "100px 20px",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        border: "2px dashed #e2e8f0",
    },
    emptyIcon: {
        fontSize: "64px",
        color: "#ec4899",
        marginBottom: "20px",
        opacity: 0.2,
    },
    browseBtn: {
        display: "inline-block",
        marginTop: "24px",
        padding: "12px 24px",
        backgroundColor: "#ec4899",
        color: "white",
        textDecoration: "none",
        borderRadius: "10px",
        fontWeight: "600",
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
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: "1px solid #f1f5f9",
    },
    imgPlaceholder: {
        width: "100%",
        height: "200px",
        backgroundColor: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        color: "#94a3b8",
        fontSize: "14px",
        fontWeight: "600",
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
        backgroundColor: "#ec4899",
        color: "#ffffff",
        border: "1px solid #fbcfe8",
    },
    cardBody: {
        padding: "24px",
    },
    typeTag: {
        display: "inline-block",
        padding: "4px 10px",
        backgroundColor: "#fce7f3",
        color: "#be185d",
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
        color: "#0f172a",
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
        color: "#ec4899",
    },
    priceSection: {
        marginTop: "20px",
        padding: "16px",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #e2e8f0"
    },
    priceLabel: {
        fontSize: "13px",
        color: "#64748b",
        fontWeight: "500",
    },
    priceValue: {
        fontSize: "18px",
        fontWeight: "800",
        color: "#ec4899",
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
        color: "#ec4899",
        border: "1px solid #ec4899",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        textDecoration: "none",
        transition: "all 0.2s",
    },
    editBtn: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        border: "none",
        borderRadius: "8px",
        cursor: "not-allowed",
        fontSize: "16px",
    },
    deleteBtn: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f5f9",
        color: "#ef4444",
        border: "none",
        borderRadius: "8px",
        cursor: "not-allowed",
        fontSize: "16px",
    },
};

export default MySellProperties;
