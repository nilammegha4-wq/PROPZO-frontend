import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { getImageUrl } from "../../../config";
import "react-toastify/dist/ReactToastify.css";

export default function RentalBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
            const res = await axios.get("/api/rental-bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Error fetching rental bookings:", err);
            toast.error("Failed to load rental bookings.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (type) => {
        const isRent = type === "Rent";
        const isPerRent = type === "PerRent";
        const isBuy = type === "Buy";

        let bgColor = "#f3f4f6";
        let textColor = "#374151";

        if (isRent) {
            bgColor = "#e0e7ff";
            textColor = "#4338ca";
        } else if (isPerRent) {
            bgColor = "#fef3c7";
            textColor = "#b45309";
        } else if (isBuy) {
            bgColor = "#dcfce7";
            textColor = "#15803d";
        }

        return (
            <span style={{
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                backgroundColor: bgColor,
                color: textColor,
            }}>
                {type}
            </span>
        );
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading rental bookings...</div>;

    return (
        <>
            <style>{`
                @media (max-width: 991px) {
                    .rb-container { padding: 30px 20px !important; }
                }
                @media (max-width: 768px) {
                    .rb-header { margin-bottom: 20px !important; }
                    .rb-title { font-size: 22px !important; }
                }
            `}</style>
            <div style={styles.container} className="rb-container">
                <ToastContainer position="top-right" autoClose={3000} />

                <div style={styles.header} className="rb-header">
                    <h1 style={styles.title} className="rb-title">Rental Appointment Requests</h1>
                    <p style={styles.subtitle}>Manage all appointments booked for rent and per-rent properties.</p>
                </div>

            <div style={styles.tableCard}>
                {bookings && bookings.length > 0 ? (
                    <div style={styles.tableResponsive}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Date & Time</th>
                                    <th style={styles.th}>Customer</th>
                                    <th style={styles.th}>Property</th>
                                    <th style={styles.th}>Type</th>
                                    <th style={styles.th}>Visit Preference</th>
                                    <th style={styles.th}>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id} style={styles.tr}>
                                        <td style={styles.td}>
                                            <div style={styles.dateText}>{new Date(booking.createdAt).toLocaleDateString()}</div>
                                            <div style={styles.timeText}>{new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.customerName}>{booking.name}</div>
                                            <div style={styles.contactInfo}>📞 {booking.phone}</div>
                                            <div style={styles.contactInfo}>✉️ {booking.email}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                                                <div style={styles.propImageWrap}>
                                                    {booking.propertyId?.images && booking.propertyId.images.length > 0 ? (
                                                        <img 
                                                            src={getImageUrl(booking.propertyId.images[0])} 
                                                            alt="" 
                                                            style={styles.propImage}
                                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/70?text=No+Img'; }}
                                                        />
                                                    ) : (
                                                        <FaHome style={{ color: "#94a3b8", fontSize: "20px" }} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={styles.propTitle}>{booking.propertyId?.title || "Unknown Property"}</div>
                                                    <div style={styles.propLoc}>📍 {booking.propertyId?.location || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            {getStatusBadge(booking.propertyType)}
                                        </td>
                                        <td style={styles.td}>
                                            <div><strong>Date:</strong> {booking.visitDate}</div>
                                            <div><strong>Time:</strong> {booking.visitTime}</div>
                                            {booking.stayDuration && <div><strong>Duration:</strong> {booking.stayDuration}</div>}
                                        </td>
                                        <td style={styles.td}>
                                            <button 
                                                className="view-details-btn"
                                                onClick={() => setSelectedBooking(booking)}
                                                style={{
                                                    padding: "8px 16px",
                                                    backgroundColor: "#eff6ff",
                                                    color: "#3b82f6",
                                                    border: "1px solid #dbeafe",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s"
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <p>No rental appointments found.</p>
                    </div>
                )}
            </div>

            {/* Modal Implementation */}
            {selectedBooking && (
                <div 
                    className="modal-overlay"
                    onClick={() => setSelectedBooking(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "20px"
                    }}
                >
                    <div 
                        className="modal-content appointment-print-area"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: "white",
                            borderRadius: "20px",
                            width: "100%",
                            maxWidth: "650px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            position: "relative",
                            padding: "0"
                        }}
                    >
                        {/* Header */}
                        <div className="print-header" style={{
                            padding: "24px",
                            borderBottom: "1px solid #f1f5f9",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 10
                        }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: "20px", color: "#0f172a", fontWeight: "800" }}>Appointment Details</h2>
                                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Reference ID: {selectedBooking._id.slice(-8).toUpperCase()}</p>
                            </div>
                            <button 
                                className="no-print"
                                onClick={() => setSelectedBooking(null)}
                                style={{
                                    border: "none",
                                    backgroundColor: "#f1f5f9",
                                    color: "#64748b",
                                    padding: "8px",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s"
                                }}
                            >✕</button>
                        </div>

                        <div style={{ padding: "24px" }}>
                            {/* Property Section */}
                            <div className="print-section" style={{ marginBottom: "30px" }}>
                                <h3 className="print-header-only">PROPERTY INFORMATION</h3>
                                <div style={{ display: "flex", gap: "20px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                                    <div style={{ width: "100px", height: "100px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, border: "2px solid white", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                                        {selectedBooking.propertyId?.images?.[0] ? (
                                            <img src={getImageUrl(selectedBooking.propertyId.images[0])} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                                        ) : (
                                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e2e8f0" }}>
                                                <FaHome className="icon-print" style={{ fontSize: "24px", color: "#94a3b8" }} />
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ marginBottom: "8px" }}>{getStatusBadge(selectedBooking.propertyType)}</div>
                                        <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>{selectedBooking.propertyId?.title || "Unknown Property"}</h3>
                                        <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>📍 {selectedBooking.propertyId?.location || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                                {/* Customer Info */}
                                <div className="print-section">
                                    <h3 className="print-header-only">CUSTOMER INFORMATION</h3>
                                    <p className="no-print" style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>Customer Information</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span className="icon-print" style={{ fontSize: "16px" }}>👤</span>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{selectedBooking.name}</div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>Full Name</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span className="icon-print" style={{ fontSize: "16px" }}>📞</span>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{selectedBooking.phone}</div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>Phone Number</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span className="icon-print" style={{ fontSize: "16px" }}>✉️</span>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{selectedBooking.email}</div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>Email Address</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visit / Stay Details (Dynamic) */}
                                <div className="print-section">
                                    <h3 className="print-header-only">{selectedBooking.propertyType === "PerRent" ? "STAY DETAILS" : "VISIT DETAILS"}</h3>
                                    <p className="no-print" style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
                                        {selectedBooking.propertyType === "PerRent" ? "Stay Details" : "Visit Details"}
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span className="icon-print" style={{ fontSize: "16px" }}>📅</span>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{selectedBooking.visitDate}</div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>Requested Date</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span className="icon-print" style={{ fontSize: "16px" }}>🕒</span>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{selectedBooking.visitTime}</div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>Requested Time</div>
                                            </div>
                                        </div>

                                        {selectedBooking.propertyType === "PerRent" && selectedBooking.stayDuration && (
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <span className="icon-print" style={{ fontSize: "16px" }}>⏳</span>
                                                <div>
                                                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{selectedBooking.stayDuration}</div>
                                                    <div style={{ fontSize: "12px", color: "#64748b" }}>Duration of Stay</div>
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <span className="icon-print" style={{ fontSize: "16px" }}>👥</span>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
                                                    {selectedBooking.people || selectedBooking.visitors || 0} People
                                                </div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>Number of {selectedBooking.propertyType === "PerRent" ? "People" : "Visitors"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #f1f5f9" }} />

                            {/* Additional Info / Preferences */}
                            <div className="print-section" style={{ marginBottom: "24px" }}>
                                <h3 className="print-header-only">PREFERENCES</h3>
                                <p className="no-print" style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
                                    {selectedBooking.propertyType === "Rent" ? "Rental Preferences & Request" : "Preferences & Request"}
                                </p>
                                
                                {(selectedBooking.propertyType === "Buy" || selectedBooking.propertyType === "PerRent") && (
                                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                                        <div style={{ padding: "10px 16px", borderRadius: "12px", backgroundColor: selectedBooking.virtualTour ? "#f0fdf4" : "#fef2f2", color: selectedBooking.virtualTour ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${selectedBooking.virtualTour ? '#bbf7d0' : '#fecaca'}` }}>
                                            {selectedBooking.virtualTour ? "✅" : "❌"} Virtual Tour Requested
                                        </div>
                                        <div style={{ padding: "10px 16px", borderRadius: "12px", backgroundColor: selectedBooking.agentCall ? "#f0fdf4" : "#fef2f2", color: selectedBooking.agentCall ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${selectedBooking.agentCall ? '#bbf7d0' : '#fecaca'}` }}>
                                            {selectedBooking.agentCall ? "✅" : "❌"} Agent Call Requested
                                        </div>
                                    </div>
                                )}

                                {selectedBooking.propertyType === "Rent" && selectedBooking.budget && (
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0", marginBottom: "16px" }}>
                                        <span style={{ fontSize: "14px", color: "#166534", fontWeight: "700" }}>Monthly Budget:</span>
                                        <span style={{ fontSize: "18px", color: "#15803d", fontWeight: "800" }}>₹{selectedBooking.budget}</span>
                                    </div>
                                )}

                                <div style={{ backgroundColor: "#fafafb", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                                    <h3 className="print-header-only">SPECIAL REQUEST</h3>
                                    <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px", fontWeight: "600" }}>
                                        {selectedBooking.propertyType === "PerRent" ? "Special Request:" : "Customer Message:"}
                                    </div>
                                    <div style={{ fontSize: "14px", color: "#334155", lineHeight: "1.6" }}>{selectedBooking.message || "No message provided."}</div>
                                </div>
                            </div>

                            {selectedBooking.propertyType === "PerRent" && selectedBooking.budget && (
                                <div className="print-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
                                    <span style={{ fontSize: "14px", color: "#166534", fontWeight: "700" }}>Expected Budget:</span>
                                    <span style={{ fontSize: "18px", color: "#15803d", fontWeight: "800" }}>₹{selectedBooking.budget}</span>
                                </div>
                            )}
                        </div>

                        <div className="no-print" style={{ padding: "20px 24px", borderTop: "1px solid #f1f5f9", textAlign: "right", backgroundColor: "#f8fafc", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                            <button 
                                onClick={() => window.print()}
                                style={{
                                    padding: "10px 24px",
                                    backgroundColor: "#eff6ff",
                                    color: "#3b82f6",
                                    border: "1px solid #dbeafe",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}
                            >
                                <span>🖨️</span> Print Appointment
                            </button>
                            <button 
                                onClick={() => setSelectedBooking(null)}
                                style={{
                                    padding: "10px 24px",
                                    backgroundColor: "#1e293b",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                            >Close Details</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

const styles = {
    container: {
        padding: "20px",
        fontFamily: "'Inter', sans-serif"
    },
    header: {
        marginBottom: "24px"
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 8px 0"
    },
    subtitle: {
        color: "#64748b",
        margin: 0,
        fontSize: "15px"
    },
    tableCard: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
        overflow: "hidden"
    },
    tableResponsive: {
        overflowX: "auto"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left"
    },
    th: {
        padding: "16px",
        backgroundColor: "#f8fafc",
        color: "#475569",
        fontSize: "13px",
        fontWeight: "600",
        textTransform: "uppercase",
        borderBottom: "1px solid #e2e8f0"
    },
    tr: {
        borderBottom: "1px solid #e2e8f0",
        transition: "background 0.2s"
    },
    td: {
        padding: "16px",
        verticalAlign: "top",
        fontSize: "14px",
        color: "#334155"
    },
    dateText: {
        fontWeight: "600",
        color: "#1e293b"
    },
    timeText: {
        fontSize: "12px",
        color: "#64748b"
    },
    customerName: {
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: "4px"
    },
    contactInfo: {
        fontSize: "13px",
        color: "#64748b"
    },
    propTitle: {
        fontWeight: "600",
        color: "#3b82f6",
        marginBottom: "4px"
    },
    propLoc: {
        fontSize: "12px",
        color: "#64748b"
    },
    propImageWrap: {
        width: "70px",
        height: "70px",
        borderRadius: "8px",
        backgroundColor: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        border: "1px solid #e2e8f0"
    },
    propImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    messageBox: {
        backgroundColor: "#f8fafc",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "13px",
        border: "1px dashed #cbd5e1"
    },
    optionTag: {
        backgroundColor: "#e2e8f0",
        fontSize: "11px",
        padding: "2px 6px",
        borderRadius: "6px",
        fontWeight: "600",
        color: "#475569"
    },
    emptyState: {
        padding: "40px",
        textAlign: "center",
        color: "#94a3b8"
    }
};
