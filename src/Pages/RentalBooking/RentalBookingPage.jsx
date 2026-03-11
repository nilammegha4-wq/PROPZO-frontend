import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImageUrl } from "../../config";

export default function RentalBookingPage() {
    const { propertyId } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        visitDate: "",
        visitTime: "",
        stayDuration: "",
        people: 1,
        message: "",
        budget: "",
        virtualTour: false,
        agentCall: false
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`/api/properties/${propertyId}`);
                setProperty(res.data);
            } catch (err) {
                console.error("Error fetching property:", err);
                toast.error("Failed to load property details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [propertyId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post("/api/rental-bookings", {
                ...formData,
                propertyId,
                propertyType: property.category // Extract category (Rent/PerRent)
            });

            setSuccess(true);
            setSubmitting(false);

            // Navigate to my-bookings after short delay
            setTimeout(() => {
                navigate("/my-bookings");
            }, 3000);
        } catch (error) {
            console.error("Error submitting appointment:", error);
            toast.error("Failed to submit appointment. Please try again.");
            setSubmitting(false);
        }
    };

    if (loading) return <div style={styles.loadingContainer}><h2>Loading details...</h2></div>;
    if (!property) return <div style={styles.loadingContainer}><h2>Property not found.</h2></div>;

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
        <div style={styles.pageOverlay}>
            <ToastContainer position="top-right" autoClose={3000} />

            <div style={styles.container}>
                <button style={styles.backBtn} onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <div style={styles.layout}>

                    {/* LEFT SIDE: Property Summary */}
                    <div style={styles.leftSide}>
                        <div style={styles.propertyCard}>
                            <img
                                src={getImageUrl(property.image || (property.images && property.images[0]))}
                                alt={property.title}
                                style={styles.propertyImage}
                            />
                            <div style={styles.propertyDetails}>
                                <h2 style={styles.propertyTitle}>{property.title}</h2>
                                <p style={styles.propertyLocation}>📍 {property.location}, {property.city}</p>
                                <h3 style={styles.propertyPrice}>
                                    ₹{property.price?.toLocaleString()}
                                    <span style={styles.periodText}> / {property.category}</span>
                                </h3>
                                <div style={styles.badges}>
                                    {property.type && <span style={styles.badge}>🏠 {property.type}</span>}
                                    {property.beds && <span style={styles.badge}>🛏 {property.beds} Beds</span>}
                                </div>
                            </div>
                        </div>

                        <div style={styles.infoBox}>
                            <h3>Why Book an Appointment?</h3>
                            <p>Scheduling a visit allows you to thoroughly inspect the property, meet the landlord/agent directly, and negotiate terms comfortably without any upfront payment commitments.</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Professional Booking Form */}
                    <div style={styles.rightSide}>
                        <div style={styles.formCard}>
                            <div style={styles.formHeader}>
                                <h2>Book Rental Appointment</h2>
                                <p>Fill out the details below to schedule your visit or inquiry.</p>
                            </div>

                            <form onSubmit={handleSubmit} style={styles.form}>

                                {/* SECTION: Personal Info */}
                                <div style={styles.formSection}>
                                    <h4 style={styles.sectionTitle}>Personal Information</h4>
                                    <div style={styles.inputRow}>
                                        <div style={styles.inputGroupFull}>
                                            <label style={styles.label}>Full Name *</label>
                                            <input type="text" name="name" required value={formData.name} onChange={handleChange} style={styles.input} placeholder="John Doe" />
                                        </div>
                                    </div>
                                    <div style={styles.inputRow}>
                                        <div style={styles.inputGroupHalf}>
                                            <label style={styles.label}>Email Address *</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} style={styles.input} placeholder="john@propzo.com" />
                                        </div>
                                        <div style={styles.inputGroupHalf}>
                                            <label style={styles.label}>Phone Number *</label>
                                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={styles.input} placeholder="+91 9876543210" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION: Rental Details */}
                                <div style={styles.formSection}>
                                    <h4 style={styles.sectionTitle}>Rental Details</h4>
                                    <div style={styles.inputRow}>
                                        <div style={styles.inputGroupHalf}>
                                            <label style={styles.label}>Preferred Visit Date *</label>
                                            <input type="date" name="visitDate" required value={formData.visitDate} onChange={handleChange} style={styles.input} />
                                        </div>
                                        <div style={styles.inputGroupHalf}>
                                            <label style={styles.label}>Preferred Visit Time *</label>
                                            <input type="time" name="visitTime" required value={formData.visitTime} onChange={handleChange} style={styles.input} />
                                        </div>
                                    </div>
                                    <div style={styles.inputRow}>
                                        <div style={styles.inputGroupHalf}>
                                            <label style={styles.label}>Number of People *</label>
                                            <input type="number" name="people" min="1" required value={formData.people} onChange={handleChange} style={styles.input} />
                                        </div>
                                        {property.category === "PerRent" && (
                                            <div style={styles.inputGroupHalf}>
                                                <label style={styles.label}>Expected Duration</label>
                                                <input type="text" name="stayDuration" value={formData.stayDuration} onChange={handleChange} style={styles.input} placeholder="e.g. 2 Days, 4 Hours" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* SECTION: Additional Info */}
                                <div style={styles.formSection}>
                                    <h4 style={styles.sectionTitle}>Additional Information</h4>
                                    <div style={styles.inputRow}>
                                        <div style={styles.inputGroupFull}>
                                            <label style={styles.label}>Budget Range (Optional)</label>
                                            <input type="text" name="budget" value={formData.budget} onChange={handleChange} style={styles.input} placeholder="e.g. ₹15k - ₹20k" />
                                        </div>
                                    </div>
                                    <div style={styles.inputGroupFull}>
                                        <label style={styles.label}>Message / Inquiry</label>
                                        <textarea name="message" rows="3" value={formData.message} onChange={handleChange} style={styles.textarea} placeholder="Any specific requirements or questions?"></textarea>
                                    </div>
                                </div>

                                {/* SECTION: Options */}
                                <div style={styles.optionsSection}>
                                    <label style={styles.checkboxLabel}>
                                        <input type="checkbox" name="virtualTour" checked={formData.virtualTour} onChange={handleChange} style={styles.checkbox} />
                                        Request a Virtual Tour Link First
                                    </label>
                                    <label style={styles.checkboxLabel}>
                                        <input type="checkbox" name="agentCall" checked={formData.agentCall} onChange={handleChange} style={styles.checkbox} />
                                        Request a Call from our Agent
                                    </label>
                                </div>

                                <div style={styles.formFooter}>
                                    <button type="submit" style={styles.submitBtn} disabled={submitting}>
                                        {submitting ? "Booking..." : "Book Rental Appointment"}
                                    </button>
                                    <p style={styles.noChargeText}>No charges applied for booking visits.</p>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ===============================
   STYLES: CLEAN MODERN UI
=============================== */
const styles = {
    pageOverlay: {
        minHeight: "100vh",
        backgroundColor: "#f4f7f6",
        fontFamily: "'Inter', sans-serif",
        paddingTop: "100px",
        paddingBottom: "60px",
    },
    loadingContainer: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#64748b"
    },
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 20px",
    },
    backBtn: {
        background: "transparent",
        border: "none",
        color: "#3b82f6",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        marginBottom: "20px",
        padding: 0
    },
    layout: {
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr", // 2 columns for large screns
        gap: "30px",
        alignItems: "start"
    },
    // --- Left Side: Property ---
    leftSide: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    propertyCard: {
        backgroundColor: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    },
    propertyImage: {
        width: "100%",
        height: "250px",
        objectFit: "cover"
    },
    propertyDetails: {
        padding: "24px"
    },
    propertyTitle: {
        margin: "0 0 8px 0",
        fontSize: "22px",
        color: "#1e293b",
        fontWeight: "700"
    },
    propertyLocation: {
        color: "#64748b",
        fontSize: "15px",
        margin: "0 0 15px 0"
    },
    propertyPrice: {
        fontSize: "26px",
        color: "#10b981",
        margin: "0 0 15px 0",
        fontWeight: "800"
    },
    periodText: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#94a3b8"
    },
    badges: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
    },
    badge: {
        padding: "6px 12px",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600"
    },
    infoBox: {
        backgroundColor: "#e0f2fe",
        borderRadius: "16px",
        padding: "20px",
        color: "#0369a1",
        boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
    },

    // --- Right Side: Form ---
    rightSide: {
        flex: 1
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    },
    formHeader: {
        marginBottom: "24px",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "16px"
    },
    formSection: {
        marginBottom: "20px"
    },
    sectionTitle: {
        fontSize: "16px",
        color: "#334155",
        marginBottom: "12px",
        borderLeft: "4px solid #3b82f6",
        paddingLeft: "8px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    inputRow: {
        display: "flex",
        gap: "16px",
        marginBottom: "16px"
    },
    inputGroupFull: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    inputGroupHalf: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    label: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#475569",
        marginBottom: "6px"
    },
    input: {
        padding: "12px",
        border: "2px solid #e2e8f0",
        borderRadius: "10px",
        fontSize: "15px",
        color: "#1e293b",
        transition: "border 0.3s",
        outline: "none",
    },
    textarea: {
        padding: "12px",
        border: "2px solid #e2e8f0",
        borderRadius: "10px",
        fontSize: "15px",
        color: "#1e293b",
        resize: "vertical",
        outline: "none",
    },
    optionsSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#f8fafc",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "24px",
        border: "1px dashed #cbd5e1"
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        color: "#475569",
        fontWeight: "500",
        cursor: "pointer"
    },
    checkbox: {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    },
    formFooter: {
        marginTop: "10px"
    },
    submitBtn: {
        width: "100%",
        padding: "16px",
        backgroundColor: "#0f172a", // Very dark professional blue/black
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "background 0.3s",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)"
    },
    noChargeText: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "12px",
        marginTop: "12px"
    },

    // Success state styles
    successContainer: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f4f7f6"
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
