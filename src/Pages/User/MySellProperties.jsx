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
        border: "1px solid rgba(228, 203, 182, 0.2)",
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
        backgroundColor: "#e4cbb6",
        color: "#4c3324",
        border: "1px solid rgba(76, 51, 36, 0.1)",
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
        border: "1px solid rgba(228, 203, 182, 0.1)"
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
    editBtn: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
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
