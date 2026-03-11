import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PackageBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/package-bookings");
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching package bookings:", error);
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!window.confirm("Are you sure you want to approve this request? An email will be sent to the user.")) return;

        setActionLoading(id);
        try {
            const response = await axios.patch(`http://localhost:5000/api/package-bookings/approve/${id}`);
            if (response.data.success) {
                toast.success("Booking approved and email sent!");
                fetchBookings(); // Refresh list
            }
        } catch (error) {
            console.error("Error approving booking:", error);
            toast.error("Failed to approve booking");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Are you sure you want to reject this request?")) return;

        setActionLoading(id);
        try {
            const response = await axios.patch(`http://localhost:5000/api/package-bookings/reject/${id}`);
            if (response.data.success) {
                toast.info("Booking rejected");
                fetchBookings(); // Refresh list
            }
        } catch (error) {
            console.error("Error rejecting booking:", error);
            toast.error("Failed to reject booking");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return <div style={{ padding: "20px", textAlign: "center" }}>Loading bookings...</div>;
    }

    return (
        <div style={{ padding: "30px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <ToastContainer position="top-right" autoClose={3000} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h1 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0 }}>Package Booking Requests</h1>
                <button
                    onClick={fetchBookings}
                    style={{ padding: "10px 20px", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                >
                    Refresh
                </button>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead style={{ backgroundColor: "#f1f5f9", color: "#475569", fontWeight: "600" }}>
                        <tr>
                            <th style={{ padding: "15px 20px" }}>User Details</th>
                            <th style={{ padding: "15px 20px" }}>Package</th>
                            <th style={{ padding: "15px 20px" }}>Message</th>
                            <th style={{ padding: "15px 20px" }}>Status</th>
                            <th style={{ padding: "15px 20px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No booking requests found.</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "15px 20px" }}>
                                        <div style={{ fontWeight: "600", color: "#1e293b" }}>{booking.name}</div>
                                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{booking.email}</div>
                                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{booking.phone}</div>
                                    </td>
                                    <td style={{ padding: "15px 20px" }}>
                                        <span style={{ padding: "4px 12px", backgroundColor: "#e0e7ff", color: "#4f46e5", borderRadius: "50px", fontSize: "0.85rem", fontWeight: "600" }}>
                                            {booking.packageName}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px 20px", color: "#475569", fontSize: "0.9rem", maxWidth: "250px" }}>
                                        {booking.message || <em style={{ color: "#cbd5e1" }}>No message</em>}
                                    </td>
                                    <td style={{ padding: "15px 20px" }}>
                                        <span style={{
                                            padding: "4px 12px",
                                            borderRadius: "50px",
                                            fontSize: "0.85rem",
                                            fontWeight: "600",
                                            backgroundColor: booking.status === "Approved" ? "#dcfce7" : booking.status === "Rejected" ? "#fee2e2" : "#fef9c3",
                                            color: booking.status === "Approved" ? "#166534" : booking.status === "Rejected" ? "#991b1b" : "#854d0e"
                                        }}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px 20px" }}>
                                        {booking.status === "Pending" ? (
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <button
                                                    onClick={() => handleApprove(booking._id)}
                                                    disabled={actionLoading === booking._id}
                                                    style={{
                                                        padding: "8px 16px",
                                                        backgroundColor: "#4f46e5",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "0.85rem",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    {actionLoading === booking._id ? "..." : "Approve"}
                                                </button>
                                                <button
                                                    onClick={() => handleReject(booking._id)}
                                                    disabled={actionLoading === booking._id}
                                                    style={{
                                                        padding: "8px 16px",
                                                        backgroundColor: "white",
                                                        color: "#991b1b",
                                                        border: "1px solid #fee2e2",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "0.85rem",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Processed</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PackageBookingList;
