import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../config";

export default function BookAppointment() {
    const { auth } = useAuth();
    const { propertyId } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: auth?.user?.name || "",
        email: auth?.user?.email || "",
        phone: auth?.user?.phone || "",
        visitDate: "",
        visitTime: "",
        visitors: 1,
        message: "",
        virtualTour: false,
        agentCall: false,
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProperty();
    }, [propertyId]);

    const fetchProperty = async () => {
        try {
            const res = await axios.get(`/api/properties/${propertyId}`);
            setProperty(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch property details.");
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await axios.post("/api/bookings", {
                propertyId,
                ...formData,
            });

            setSuccess(true);
            setSubmitting(false);

            // Auto-redirect after 3 seconds
            setTimeout(() => {
                navigate("/my-bookings");
            }, 3000);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
            setSubmitting(false);
        }
    };

    if (loading) return <h2 style={styles.loading}>Loading property details...</h2>;
    if (!property) return <h2 style={styles.loading}>Property not found.</h2>;

    if (success) {
        return (
            <div style={styles.successContainer}>
                <div style={styles.successCard}>
                    <div style={styles.successIcon}>✓</div>
                    <h2 style={styles.successTitle}>Successfully Booked!</h2>
                    <p style={styles.successText}>
                        Your appointment request has been submitted successfully. Our agent
                        will contact you shortly to confirm the details.
                    </p>
                    <button style={styles.primaryBtn} onClick={() => navigate("/")}>
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <button style={styles.backBtn} onClick={() => navigate(-1)}>
                ← Back to Property
            </button>

            <div style={styles.container}>
                {/* Left Side: Property Details */}
                <div style={styles.leftPanel}>
                    <div style={styles.propertyCard}>
                        {property.images && property.images.length > 0 ? (
                            <img
                                src={getImageUrl(property.images[0])}
                                alt={property.title}
                                style={styles.propertyImage}
                            />
                        ) : (
                            <div style={styles.placeholderImage}>No Image Available</div>
                        )}
                        <div style={styles.propertyInfo}>
                            <h2 style={styles.propertyTitle}>{property.title}</h2>
                            <p style={styles.propertyLocation}>
                                📍 {property.location}, {property.city}
                            </p>
                            <h3 style={styles.propertyPrice}>{property.displayPrice}</h3>

                            <div style={styles.badges}>
                                <span style={styles.badge}>🏡 {property.type}</span>
                                <span style={styles.badge}>🛏 {property.beds} Beds</span>
                                <span style={styles.badge}>🛁 {property.baths} Baths</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Booking Form */}
                <div style={styles.rightPanel}>
                    <div style={styles.formCard}>
                        <h2 style={styles.formTitle}>Book an Appointment</h2>
                        <p style={styles.formSubtitle}>
                            Schedule a visit or inquire about this property.
                        </p>

                        {error && <div style={styles.errorBox}>{error}</div>}

                        <form onSubmit={handleSubmit} style={styles.form}>
                            {/* Personal Information */}
                            <h3 style={styles.sectionTitle}>Personal Information</h3>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    style={styles.input}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        style={styles.input}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@propzo.com"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        style={styles.input}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>

                            {/* Appointment Details */}
                            <h3 style={styles.sectionTitle}>Appointment Details</h3>
                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Preferred Date *</label>
                                    <input
                                        type="date"
                                        name="visitDate"
                                        required
                                        style={styles.input}
                                        value={formData.visitDate}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Preferred Time *</label>
                                    <input
                                        type="time"
                                        name="visitTime"
                                        required
                                        style={styles.input}
                                        value={formData.visitTime}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Number of Visitors</label>
                                <input
                                    type="number"
                                    name="visitors"
                                    min="1"
                                    max="10"
                                    style={styles.input}
                                    value={formData.visitors}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Property Interest */}
                            <h3 style={styles.sectionTitle}>Property Interest</h3>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Message / Inquiry</label>
                                <textarea
                                    name="message"
                                    style={styles.textarea}
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Any specific questions or requests?"
                                ></textarea>
                            </div>

                            {/* Additional Options */}
                            <div style={styles.checkboxGroup}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="virtualTour"
                                        checked={formData.virtualTour}
                                        onChange={handleInputChange}
                                        style={styles.checkbox}
                                    />
                                    I want a virtual tour instead of an in-person visit
                                </label>

                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="agentCall"
                                        checked={formData.agentCall}
                                        onChange={handleInputChange}
                                        style={styles.checkbox}
                                    />
                                    I want a call from the agent before the visit
                                </label>
                            </div>

                            <button
                                type="submit"
                                style={styles.submitBtn}
                                disabled={submitting}
                            >
                                {submitting ? "Submitting..." : "Book Appointment"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Inter', sans-serif",
    },
    loading: {
        textAlign: "center",
        padding: "100px 20px",
        color: "#6b7280",
        fontFamily: "'Inter', sans-serif",
    },
    backBtn: {
        background: "none",
        border: "none",
        color: "#4f46e5",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    container: {
        display: "flex",
        gap: "30px",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    leftPanel: {
        flex: "1 1 350px",
        maxWidth: "450px",
    },
    rightPanel: {
        flex: "2 1 500px",
    },
    propertyCard: {
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        border: "1px solid #f3f4f6",
        position: "sticky",
        top: "100px",
    },
    propertyImage: {
        width: "100%",
        height: "250px",
        objectFit: "cover",
    },
    placeholderImage: {
        width: "100%",
        height: "250px",
        background: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
    },
    propertyInfo: {
        padding: "24px",
    },
    propertyTitle: {
        margin: "0 0 10px 0",
        fontSize: "22px",
        color: "#111827",
        fontWeight: "700",
    },
    propertyLocation: {
        margin: "0 0 15px 0",
        color: "#6b7280",
        fontSize: "15px",
    },
    propertyPrice: {
        margin: "0 0 20px 0",
        color: "#4f46e5",
        fontSize: "24px",
        fontWeight: "800",
    },
    badges: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
    },
    badge: {
        background: "#f3f4f6",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        color: "#4b5563",
        fontWeight: "500",
    },
    formCard: {
        background: "#fff",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        border: "1px solid #f3f4f6",
    },
    formTitle: {
        margin: "0 0 10px 0",
        fontSize: "28px",
        color: "#111827",
        fontWeight: "800",
    },
    formSubtitle: {
        margin: "0 0 30px 0",
        color: "#6b7280",
        fontSize: "16px",
    },
    sectionTitle: {
        fontSize: "18px",
        color: "#111827",
        margin: "30px 0 15px 0",
        paddingBottom: "10px",
        borderBottom: "1px solid #e5e7eb",
    },
    row: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
    },
    inputGroup: {
        marginBottom: "20px",
        flex: "1 1 200px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        color: "#374151",
        fontSize: "14px",
        fontWeight: "600",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "15px",
        color: "#111827",
        transition: "border-color 0.2s",
        outline: "none",
        boxSizing: "border-box",
    },
    textarea: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "15px",
        color: "#111827",
        resize: "vertical",
        outline: "none",
        boxSizing: "border-box",
    },
    checkboxGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "20px",
        marginBottom: "30px",
        padding: "20px",
        background: "#f9fafb",
        borderRadius: "10px",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "15px",
        color: "#4b5563",
        cursor: "pointer",
    },
    checkbox: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        accentColor: "#4f46e5",
    },
    submitBtn: {
        width: "100%",
        padding: "16px",
        background: "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.1s",
        boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
    },
    errorBox: {
        padding: "15px",
        background: "#fef2f2",
        color: "#b91c1c",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px",
        border: "1px solid #f87171",
    },

    // Success state styles
    successContainer: {
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },
    successCard: {
        background: "#fff",
        padding: "50px 40px",
        borderRadius: "20px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        maxWidth: "500px",
        width: "100%",
    },
    successIcon: {
        width: "80px",
        height: "80px",
        background: "#10b981",
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        margin: "0 auto 20px",
        boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.3)",
    },
    successTitle: {
        fontSize: "28px",
        color: "#111827",
        margin: "0 0 15px 0",
        fontWeight: "800",
    },
    successText: {
        color: "#6b7280",
        fontSize: "16px",
        lineHeight: "1.6",
        margin: "0 0 30px 0",
    },
    primaryBtn: {
        background: "#4f46e5",
        color: "#fff",
        border: "none",
        padding: "14px 30px",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.2s",
    }
};
