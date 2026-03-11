import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RentalBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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
        return (
            <span style={{
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                backgroundColor: type === "PerRent" ? "#fef3c7" : "#e0e7ff",
                color: type === "PerRent" ? "#b45309" : "#4338ca",
            }}>
                {type}
            </span>
        );
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading rental bookings...</div>;

    return (
        <div style={styles.container}>
            <ToastContainer position="top-right" autoClose={3000} />

            <div style={styles.header}>
                <h1 style={styles.title}>Rental Appointment Requests</h1>
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
                                            <div style={styles.propTitle}>{booking.propertyId?.title || "Unknown Property"}</div>
                                            <div style={styles.propLoc}>📍 {booking.propertyId?.location || "N/A"}</div>
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
                                            <div style={styles.messageBox}>
                                                <strong>People:</strong> {booking.people}<br />
                                                <strong>Message:</strong> {booking.message || "None"}<br />
                                                {booking.budget && <><strong style={{ color: "#10b981" }}>Budget:</strong> {booking.budget}<br /></>}
                                                <div style={{ marginTop: "5px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                                    {booking.virtualTour && <span style={styles.optionTag}>🎥 Virtual Tour</span>}
                                                    {booking.agentCall && <span style={styles.optionTag}>📞 Needs Call</span>}
                                                </div>
                                            </div>
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
        </div>
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
