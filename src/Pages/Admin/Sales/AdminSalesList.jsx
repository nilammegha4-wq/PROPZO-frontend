import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import {
    FaHome,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaUser,
    FaCalendarAlt,
    FaPhoneAlt,
    FaBed,
    FaBath,
    FaRegEye,
    FaTrashAlt,
    FaArrowRight,
    FaCheckCircle,
    FaInfoCircle,
    FaTimes,
    FaCheck,
    FaList,
    FaRegImage
} from "react-icons/fa";

const BASE_URL = "http://localhost:5000";

const AdminSalesList = () => {
    const { auth } = useAuth();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSale, setSelectedSale] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get("/api/sales");
            setSales(response.data);
        } catch (error) {
            console.error("Error fetching sales:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this sale request?")) return;
        try {
            await axios.delete(`/api/sales/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setSales(sales.filter(s => s._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const openDetails = (sale) => {
        console.log("🧐 Opening details for sale:", sale);
        setSelectedSale(sale);
        setShowModal(true);
    };

    if (loading) return <div style={styles.loader}>Loading sales data...</div>;

    const stats = {
        total: sales.length,
        apartments: sales.filter(s => s.propertyType === "Apartment").length,
        villas: sales.filter(s => s.propertyType === "Villa").length,
        totalValue: sales.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)
    };

    const formatPrice = (value) => {
        if (value >= 10000000) {
            return (value / 10000000).toFixed(2) + " CR";
        } else if (value >= 100000) {
            return (value / 100000).toFixed(2) + " Lakh";
        }
        return value.toLocaleString('en-IN');
    };

    return (
        <>
            <style>{`
                @media (max-width: 991px) {
                    .asl-container { padding: 20px !important; }
                    .asl-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
                    .asl-stats-row { width: 100% !important; overflow-x: auto !important; padding-bottom: 5px !important; }
                }
                @media (max-width: 768px) {
                    .asl-title { font-size: 24px !important; }
                }
            `}</style>
            <div style={styles.container} className="asl-container">
                <header style={styles.header} className="asl-header">
                    <div>
                        <h1 style={styles.title} className="asl-title">Property Sale Requests</h1>
                        <p style={styles.subtitle}>Manage and monitor all incoming seller submissions</p>
                    </div>
                    <div style={styles.statsRow} className="asl-stats-row">
                        <div style={styles.statCard}>
                            <div style={{ ...styles.statIcon, background: 'rgba(178, 132, 107, 0.1)', color: '#b2846b' }}><FaList /></div>
                            <div>
                                <p style={styles.statLabel}>Total Requests</p>
                                <h3 style={styles.statValue}>{stats.total}</h3>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={{ ...styles.statIcon, background: 'rgba(98, 123, 104, 0.1)', color: '#627b68' }}><FaMoneyBillWave /></div>
                            <div>
                                <p style={styles.statLabel}>Total Value</p>
                                <h3 style={styles.statValue}>₹{formatPrice(stats.totalValue)}</h3>
                            </div>
                        </div>
                    </div>
                </header>

                <div style={{ ...styles.tableCard, overflowX: "auto" }} className="asl-table-card">
                    <div style={{ minWidth: "900px" }}>
                        <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Property</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Seller Details</th>
                            <th style={styles.th}>Type / BHK</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.propInfo}>
                                        <div style={styles.propPreview}>
                                            {sale.image ? (
                                                <img
                                                    src={sale.image.startsWith('http') ? sale.image : `${BASE_URL}${sale.image.startsWith('/') ? '' : '/'}${sale.image}`}
                                                    alt=""
                                                    style={styles.tinyImg}
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=No+Img'; }}
                                                />
                                            ) : <FaHome />}
                                        </div>
                                        <div>
                                            <p style={styles.propTitle}>{sale.title}</p>
                                            <span style={styles.statusBadge}>New Listing</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <p style={styles.priceText}>₹{sale.price?.toLocaleString()}</p>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.locationInfo}>
                                        <FaMapMarkerAlt style={{ color: '#64748b' }} />
                                        <span>{sale.city}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.sellerInfo}>
                                        <p style={styles.sellerName}><FaUser size={12} /> {sale.sellerName || "N/A"}</p>
                                        <p style={styles.sellerPhone}><FaPhoneAlt size={12} /> {sale.phone || "N/A"}</p>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.typeInfo}>
                                        <span style={styles.tag}>{sale.propertyType}</span>
                                        <span style={styles.tag}>{sale.bhk || "-"} BHK</span>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <p style={styles.dateText}><FaCalendarAlt size={12} /> {new Date(sale.createdAt).toLocaleDateString()}</p>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actionButtons}>
                                        <button onClick={() => openDetails(sale)} style={styles.viewBtn} title="View Details">
                                            <FaRegEye />
                                        </button>
                                        <button onClick={() => handleDelete(sale._id)} style={styles.delBtn} title="Delete Request">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    </div>
                {sales.length === 0 && (
                    <div style={styles.emptyState}>
                        <FaInfoCircle size={40} color="#94a3b8" />
                        <p>No sales requests found yet.</p>
                    </div>
                )}
            </div>

            {/* DETAILS MODAL */}
            {showModal && selectedSale && (
                <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button style={styles.closeBtn} onClick={() => setShowModal(false)}><FaTimes /></button>

                        <div style={styles.modalBody}>
                            <div style={styles.modalHeader}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <h2 style={styles.modalTitle}>{selectedSale.title}</h2>
                                    <div style={styles.modalBadge}>₹{selectedSale.price?.toLocaleString()}</div>
                                </div>
                                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}><FaMapMarkerAlt /> {selectedSale.address}, {selectedSale.city}</p>
                            </div>

                            <div style={styles.modalGrid}>
                                <div style={styles.modalCol}>
                                    <h4 style={styles.sectionHeading}>Basic Info</h4>
                                    <div style={styles.detailRow}><strong>Type:</strong> <span>{selectedSale.propertyType}</span></div>
                                    <div style={styles.detailRow}><strong>Category:</strong> <span>{selectedSale.category}</span></div>
                                    <div style={styles.detailRow}><strong>BHK:</strong> <span>{selectedSale.bhk}</span></div>
                                    <div style={styles.detailRow}><strong>Bathrooms:</strong> <span>{selectedSale.bathrooms}</span></div>
                                    <div style={styles.detailRow}><strong>Area:</strong> <span>{selectedSale.area} sqft</span></div>
                                </div>
                                <div style={styles.modalCol}>
                                    <h4 style={styles.sectionHeading}>Location & Age</h4>
                                    <div style={styles.detailRow}><strong>Address:</strong> <span>{selectedSale.address}</span></div>
                                    <div style={styles.detailRow}><strong>City:</strong> <span>{selectedSale.city}</span></div>
                                    <div style={styles.detailRow}><strong>State:</strong> <span>{selectedSale.state}</span></div>
                                    <div style={styles.detailRow}><strong>Pincode:</strong> <span>{selectedSale.pincode}</span></div>
                                    <div style={styles.detailRow}><strong>Age:</strong> <span>{selectedSale.propertyAge} years</span></div>
                                </div>
                                <div style={styles.modalCol}>
                                    <h4 style={styles.sectionHeading}>Seller Details</h4>
                                    <div style={styles.detailRow}><strong>Name:</strong> <span>{selectedSale.sellerName}</span></div>
                                    <div style={styles.detailRow}><strong>Phone:</strong> <span>{selectedSale.phone}</span></div>
                                    <div style={styles.detailRow}><strong>Email:</strong> <span>{selectedSale.email}</span></div>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <h4 style={styles.sectionHeading}>Description</h4>
                                <p style={styles.descriptionText}>{selectedSale.description || "No description provided."}</p>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <h4 style={styles.sectionHeading}>Amenities</h4>
                                <div style={styles.amenitiesGrid}>
                                    {selectedSale.amenities?.map((a, i) => (
                                        <div key={i} style={styles.amenityItem}><FaCheck size={10} /> {a}</div>
                                    ))}
                                </div>
                            </div>

                            {selectedSale.images?.filter(img => img).length > 0 ? (
                                <div style={{ marginTop: '20px' }}>
                                    <h4 style={styles.sectionHeading}>Gallery</h4>
                                    <div style={styles.gallery}>
                                        {selectedSale.images.filter(img => img).map((img, i) => (
                                            <img
                                                key={i}
                                                src={img.startsWith('http') ? img : `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`}
                                                alt=""
                                                style={styles.galleryImg}
                                                onError={(e) => {
                                                    console.error("Gallery img failed:", img);
                                                    e.target.src = 'https://via.placeholder.com/200x150?text=Error+Loading';
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginTop: '20px', padding: '20px', background: '#f8fafc', borderRadius: '16px', textAlign: 'center' }}>
                                    <FaRegImage size={30} color="#94a3b8" />
                                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '10px' }}>No images uploaded for this property.</p>
                                </div>
                            )}
                        </div>

                        <div style={styles.modalFooter}>
                            <a href={`https://wa.me/${selectedSale.phone}`} target="_blank" rel="noreferrer" style={styles.whatsappBtn}>
                                Contact via WhatsApp <FaArrowRight />
                            </a>
                            <button style={styles.primaryBtn} onClick={() => setShowModal(false)}>Close View</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
  );
};

const styles = {
    container: {
        background: "#f9f6f1", // Brand Cream
        padding: "30px",
        minHeight: "100vh",
        color: "#4c3324", // Brand Brown
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "32px",
    },
    title: {
        fontSize: "28px",
        fontWeight: "800",
        margin: 0,
        color: "#4c3324",
        letterSpacing: "-0.5px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#64748b",
        marginTop: "6px",
    },
    statsRow: {
        display: "flex",
        gap: "16px",
    },
    statCard: {
        background: "#fff",
        padding: "16px 20px",
        borderRadius: "16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        minWidth: "200px",
    },
    statIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
    },
    statLabel: {
        fontSize: "12px",
        color: "#64748b",
        margin: 0,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    statValue: {
        fontSize: "24px",
        fontWeight: "800",
        margin: 0,
        color: "#4c3324",
        letterSpacing: "-0.5px",
    },
    tableCard: {
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: "1px solid #f1f5f9",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
    },
    th: {
        padding: "20px",
        background: "rgba(178, 132, 107, 0.05)",
        fontSize: "13px",
        fontWeight: "700",
        color: "#4c3324",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderBottom: "1px solid rgba(228, 203, 182, 0.3)",
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
        transition: "all 0.2s ease",
        cursor: "default",
        '&:hover': {
            background: '#f8fafc'
        }
    },
    td: {
        padding: "18px 20px",
        verticalAlign: "middle",
    },
    propInfo: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },
    propPreview: {
        width: "50px",
        height: "50px",
        borderRadius: "14px",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94a3b8",
        fontSize: "20px",
        overflow: "hidden",
    },
    tinyImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    propTitle: {
        fontSize: "15px",
        fontWeight: "700",
        margin: 0,
        color: "#0f172a",
    },
    statusBadge: {
        fontSize: "10px",
        fontWeight: "800",
        background: "#dcfce7",
        color: "#166534",
        padding: "2px 8px",
        borderRadius: "99px",
        textTransform: "uppercase",
        marginTop: "4px",
        display: "inline-block",
    },
    priceText: {
        fontSize: "16px",
        fontWeight: "800",
        color: "#b2846b", // Brand Tan
        margin: 0,
    },
    locationInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        color: "#475569",
    },
    sellerInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    sellerName: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#1e293b",
        margin: 0,
    },
    sellerPhone: {
        fontSize: "12px",
        color: "#64748b",
        margin: 0,
    },
    typeInfo: {
        display: "flex",
        gap: "6px",
    },
    tag: {
        fontSize: "11px",
        fontWeight: "600",
        background: "#f1f5f9",
        color: "#475569",
        padding: "4px 10px",
        borderRadius: "8px",
    },
    dateText: {
        fontSize: "13px",
        color: "#64748b",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    actionButtons: {
        display: "flex",
        gap: "10px",
    },
    viewBtn: {
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        border: "none",
        background: "rgba(98, 123, 104, 0.1)",
        color: "#627b68",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    delBtn: {
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        border: "none",
        background: "#fff1f2",
        color: "#e11d48",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    emptyState: {
        padding: "100px 30px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
    },
    loader: {
        padding: "100px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "18px",
        fontWeight: "600",
    },

    // Modal Styles
    modalOverlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
    },
    modalContent: {
        background: "#fff",
        width: "100%",
        maxWidth: "900px",
        maxHeight: "90vh",
        borderRadius: "32px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    closeBtn: {
        position: "absolute",
        top: "30px",
        right: "30px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        background: "#f1f5f9",
        color: "#64748b",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
    },
    modalHeader: {
        marginBottom: "30px",
        borderBottom: "1px solid #f1f5f9",
        paddingBottom: "25px",
    },
    modalTitle: {
        fontSize: "28px",
        fontWeight: "800",
        margin: "0 0 10px 0",
        color: "#4c3324",
    },
    modalBadge: {
        display: "inline-block",
        padding: "8px 20px",
        background: "#b2846b",
        color: "#fff",
        borderRadius: "14px",
        fontSize: "20px",
        fontWeight: "800",
    },
    modalGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
    },
    sectionHeading: {
        fontSize: "14px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: "#94a3b8",
        marginBottom: "15px",
    },
    detailRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        fontSize: "14px",
        borderBottom: "1px solid #f8fafc",
    },
    descriptionText: {
        fontSize: "15px",
        lineHeight: "1.6",
        color: "#475569",
        background: "#f8fafc",
        padding: "20px",
        borderRadius: "16px",
    },
    amenitiesGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },
    amenityItem: {
        background: "#f1f5f9",
        padding: "8px 16px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#475569",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    gallery: {
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        paddingBottom: "10px",
    },
    galleryImg: {
        width: "200px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "16px",
    },
    modalBody: {
        padding: "0 40px 40px 40px",
        overflowY: "auto",
        flex: 1,
    },
    modalFooter: {
        background: "#fff",
        padding: "20px 40px",
        display: "flex",
        gap: "15px",
        borderTop: "1px solid #f1f5f9",
    },
    primaryBtn: {
        padding: "14px 28px",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        background: "#fff",
        color: "#475569",
        fontWeight: "700",
        cursor: "pointer",
    },
    whatsappBtn: {
        flex: 1,
        padding: "14px 28px",
        borderRadius: "16px",
        border: "none",
        background: "#627b68",
        color: "#fff",
        fontWeight: "700",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        textDecoration: "none",
    }
};

export default AdminSalesList;
