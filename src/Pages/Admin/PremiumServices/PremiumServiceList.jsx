import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PremiumServiceList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get("/api/premium-services");
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Failed to fetch requests");
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await axios.patch(`/api/premium-services/approve/${id}`);
            if (response.data.success) {
                toast.success("Request approved and email sent!");
                fetchRequests();
            }
        } catch (error) {
            console.error("Error approving request:", error);
            toast.error("Failed to approve request");
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.patch(`/api/premium-services/reject/${id}`);
            if (response.data.success) {
                toast.info("Request rejected");
                fetchRequests();
            }
        } catch (error) {
            console.error("Error rejecting request:", error);
            toast.error("Failed to reject request");
        }
    };

    const filteredRequests = filter === "All"
        ? requests
        : requests.filter(req => req.serviceType === filter);

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === "Pending").length,
        approved: requests.filter(r => r.status === "Approved").length,
    };

    if (loading) return <div style={styles.loader}>Loading requests...</div>;

    return (
        <div style={styles.container}>
            <ToastContainer position="top-right" autoClose={3000} />

            <div style={styles.header}>
                <h2 style={styles.title}>Premium Service Requests</h2>
                <div style={styles.statsRow}>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Total</span>
                        <span style={styles.statValue}>{stats.total}</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Pending</span>
                        <span style={{ ...styles.statValue, color: '#f59e0b' }}>{stats.pending}</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Approved</span>
                        <span style={{ ...styles.statValue, color: '#10b981' }}>{stats.approved}</span>
                    </div>
                </div>
            </div>

            <div style={styles.filterBar}>
                {["All", "Interior Design", "Home Maintenance", "Legal Services", "Property Financing", "Property Inspection", "Relocation & Moving"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            ...styles.filterBtn,
                            ...(filter === f ? styles.filterBtnActive : {})
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>Service Type</th>
                            <th style={styles.th}>Customer</th>
                            <th style={styles.th}>Package/Service</th>
                            <th style={styles.th}>Message</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((req) => (
                            <tr key={req._id} style={styles.tr}>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.serviceBadge,
                                        backgroundColor: getServiceColor(req.serviceType)
                                    }}>
                                        {req.serviceType}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.customerInfo}>
                                        <p style={styles.customerName}>{req.name}</p>
                                        <p style={styles.customerDetail}>{req.email}</p>
                                        <p style={styles.customerDetail}>{req.phone}</p>
                                    </div>
                                </td>
                                <td style={styles.td}>{req.packageName}</td>
                                <td style={styles.td}>
                                    <div style={styles.messageCell} title={req.message}>
                                        {req.message || "No message"}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        color: getStatusColor(req.status),
                                        backgroundColor: getStatusColor(req.status) + '15'
                                    }}>
                                        {req.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    {req.status === "Pending" && (
                                        <div style={styles.actionGroup}>
                                            <button onClick={() => handleApprove(req._id)} style={styles.approveBtn}>Approve</button>
                                            <button onClick={() => handleReject(req._id)} style={styles.rejectBtn}>Reject</button>
                                        </div>
                                    )}
                                    {req.status !== "Pending" && (
                                        <span style={styles.doneText}>Completed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredRequests.length === 0 && (
                    <div style={styles.emptyState}>No requests found for this category.</div>
                )}
            </div>
        </div>
    );
};

const getServiceColor = (type) => {
    const colors = {
        "Interior Design": "#6366f1",
        "Home Maintenance": "#f59e0b",
        "Legal Services": "#10b981",
        "Property Financing": "#ef4444",
        "Property Inspection": "#8b5cf6",
        "Relocation & Moving": "#ec4899"
    };
    return colors[type] || "#64748b";
};

const getStatusColor = (status) => {
    switch (status) {
        case "Approved": return "#10b981";
        case "Rejected": return "#ef4444";
        default: return "#f59e0b";
    }
};

const styles = {
    container: {
        padding: "30px",
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    statsRow: {
        display: "flex",
        gap: "20px",
    },
    statCard: {
        backgroundColor: "#f8fafc",
        padding: "10px 20px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #e2e8f0",
    },
    statLabel: {
        fontSize: "12px",
        color: "#64748b",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    statValue: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0f172a",
    },
    filterBar: {
        display: "flex",
        gap: "10px",
        marginBottom: "25px",
        overflowX: "auto",
        paddingBottom: "10px",
    },
    filterBtn: {
        padding: "8px 16px",
        borderRadius: "30px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#fff",
        color: "#64748b",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "0.2s",
    },
    filterBtnActive: {
        backgroundColor: "#0f172a",
        color: "#fff",
        borderColor: "#0f172a",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
    },
    tableHeader: {
        borderBottom: "2px solid #f1f5f9",
    },
    th: {
        padding: "16px",
        color: "#64748b",
        fontWeight: "600",
        fontSize: "13px",
        textTransform: "uppercase",
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
        transition: "0.2s",
    },
    td: {
        padding: "16px",
        verticalAlign: "middle",
    },
    serviceBadge: {
        padding: "4px 10px",
        borderRadius: "6px",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
    },
    customerName: {
        margin: 0,
        fontWeight: "600",
        color: "#0f172a",
        fontSize: "14px",
    },
    customerDetail: {
        margin: 0,
        fontSize: "12px",
        color: "#64748b",
    },
    messageCell: {
        maxWidth: "200px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "13px",
        color: "#475569",
    },
    statusBadge: {
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
    },
    actionGroup: {
        display: "flex",
        gap: "8px",
    },
    approveBtn: {
        backgroundColor: "#10b981",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.2s",
    },
    rejectBtn: {
        backgroundColor: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.2s",
    },
    doneText: {
        fontSize: "12px",
        color: "#94a3b8",
        fontStyle: "italic",
    },
    emptyState: {
        textAlign: "center",
        padding: "40px",
        color: "#94a3b8",
        fontSize: "14px",
    },
    loader: {
        textAlign: "center",
        padding: "50px",
        fontSize: "16px",
        color: "#4f46e5",
    }
};

export default PremiumServiceList;
