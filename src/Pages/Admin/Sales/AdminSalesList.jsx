import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import {
    FaHome, FaMoneyBillWave, FaMapMarkerAlt, FaUser, FaCalendarAlt,
    FaPhoneAlt, FaBed, FaBath, FaRegEye, FaTrashAlt, FaArrowRight,
    FaCheckCircle, FaInfoCircle, FaTimes, FaCheck, FaList, FaRegImage
} from "react-icons/fa";

const BASE_URL = "http://localhost:5000";

const AdminSalesList = () => {
    const { auth } = useAuth();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSale, setSelectedSale] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { fetchSales(); }, []);

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
        setSelectedSale(sale);
        setShowModal(true);
    };

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5ede6", fontFamily: "'DM Sans', sans-serif", color: "#B2846B", fontSize: 18, fontWeight: 600 }}>
            Loading sales data...
        </div>
    );

    const stats = {
        total: sales.length,
        totalValue: sales.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)
    };

    return (
        <>
            <style>{`
<<<<<<< HEAD
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700&display=swap');
                * { box-sizing: border-box; }
                .asl-row:hover { background: #faf6f3 !important; }
                .asl-view-btn:hover { background: #627B68 !important; color: #fff !important; }
                .asl-del-btn:hover { background: #b85c3a !important; color: #fff !important; }
=======
>>>>>>> e85f1ae (nilam2)
                @media (max-width: 991px) {
                    .asl-container { padding: 20px !important; }
                    .asl-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
                    .asl-stats-row { width: 100% !important; overflow-x: auto !important; padding-bottom: 5px !important; }
                }
                @media (max-width: 768px) {
                    .asl-title { font-size: 24px !important; }
                }
            `}</style>
<<<<<<< HEAD

            <div style={s.page}>
                <div style={s.accentBar} />

                <div style={s.container} className="asl-container">
                    {/* Header */}
                    <div style={s.header} className="asl-header">
                        <div>
                            <p style={s.breadcrumb}>Admin / Sales</p>
                            <h1 style={s.title} className="asl-title">Property Sale Requests</h1>
                            <p style={s.subtitle}>Manage and monitor all incoming seller submissions</p>
                        </div>
                        <div style={s.statsRow} className="asl-stats-row">
                            <div style={s.statCard}>
                                <div style={{ ...s.statIcon, background: "#e8ddd5", color: "#4C3324" }}><FaList /></div>
                                <div>
                                    <p style={s.statLabel}>Total Requests</p>
                                    <h3 style={s.statValue}>{stats.total}</h3>
                                </div>
                            </div>
                            <div style={s.statCard}>
                                <div style={{ ...s.statIcon, background: "#dde8e0", color: "#3a5c42" }}><FaMoneyBillWave /></div>
                                <div>
                                    <p style={s.statLabel}>Total Value</p>
                                    <h3 style={s.statValue}>₹{(stats.totalValue / 1000000).toFixed(1)}M</h3>
                                </div>
                            </div>
                        </div>
=======
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
                                <h3 style={styles.statValue}>₹{(stats.totalValue / 1000000).toFixed(1)}M</h3>
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
>>>>>>> e85f1ae (nilam2)
                    </div>

                    {/* Table */}
                    <div style={{ ...s.tableCard, overflowX: "auto" }} className="asl-table-card">
                        <div style={{ minWidth: "900px" }}>
                            <table style={s.table}>
                                <thead>
                                    <tr>
                                        {["Property", "Price", "Location", "Seller Details", "Type / BHK", "Date", "Actions"].map(h => (
                                            <th key={h} style={s.th}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map((sale) => (
                                        <tr key={sale._id} style={s.tr} className="asl-row">
                                            <td style={s.td}>
                                                <div style={s.propInfo}>
                                                    <div style={s.propPreview}>
                                                        {sale.image ? (
                                                            <img
                                                                src={sale.image.startsWith('http') ? sale.image : `${BASE_URL}${sale.image.startsWith('/') ? '' : '/'}${sale.image}`}
                                                                alt=""
                                                                style={s.tinyImg}
                                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=No+Img'; }}
                                                            />
                                                        ) : <FaHome />}
                                                    </div>
                                                    <div>
                                                        <p style={s.propTitle}>{sale.title}</p>
                                                        <span style={s.statusBadge}>New Listing</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={s.td}>
                                                <p style={s.priceText}>₹{sale.price?.toLocaleString()}</p>
                                            </td>
                                            <td style={s.td}>
                                                <div style={s.locationInfo}>
                                                    <FaMapMarkerAlt style={{ color: "#B2846B" }} />
                                                    <span>{sale.city}</span>
                                                </div>
                                            </td>
                                            <td style={s.td}>
                                                <div style={s.sellerInfo}>
                                                    <p style={s.sellerName}><FaUser size={12} /> {sale.sellerName || "N/A"}</p>
                                                    <p style={s.sellerPhone}><FaPhoneAlt size={12} /> {sale.phone || "N/A"}</p>
                                                </div>
                                            </td>
                                            <td style={s.td}>
                                                <div style={s.typeInfo}>
                                                    <span style={s.tag}>{sale.propertyType}</span>
                                                    <span style={s.tag}>{sale.bhk || "-"} BHK</span>
                                                </div>
                                            </td>
                                            <td style={s.td}>
                                                <p style={s.dateText}><FaCalendarAlt size={12} /> {new Date(sale.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td style={s.td}>
                                                <div style={s.actionButtons}>
                                                    <button className="asl-view-btn" onClick={() => openDetails(sale)} style={s.viewBtn} title="View Details">
                                                        <FaRegEye />
                                                    </button>
                                                    <button className="asl-del-btn" onClick={() => handleDelete(sale._id)} style={s.delBtn} title="Delete Request">
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
                            <div style={s.emptyState}>
                                <FaInfoCircle size={40} color="#a89385" />
                                <p style={{ color: "#7a5c4a" }}>No sales requests found yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* DETAILS MODAL */}
            {showModal && selectedSale && (
                <div style={s.modalOverlay} onClick={() => setShowModal(false)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <button style={s.closeBtn} onClick={() => setShowModal(false)}><FaTimes /></button>

                        <div style={s.modalBody}>
                            <div style={s.modalHeader}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <h2 style={s.modalTitle}>{selectedSale.title}</h2>
                                    <div style={s.modalBadge}>₹{selectedSale.price?.toLocaleString()}</div>
                                </div>
                                <p style={{ color: "#7a5c4a", fontSize: 14, margin: 0 }}><FaMapMarkerAlt /> {selectedSale.address}, {selectedSale.city}</p>
                            </div>

                            <div style={s.modalGrid}>
                                <div style={s.modalCol}>
                                    <h4 style={s.sectionHeading}>Basic Info</h4>
                                    {[["Type", selectedSale.propertyType], ["Category", selectedSale.category], ["BHK", selectedSale.bhk], ["Bathrooms", selectedSale.bathrooms], ["Area", `${selectedSale.area} sqft`]].map(([k, v]) => (
                                        <div key={k} style={s.detailRow}><strong>{k}:</strong> <span>{v}</span></div>
                                    ))}
                                </div>
                                <div style={s.modalCol}>
                                    <h4 style={s.sectionHeading}>Location & Age</h4>
                                    {[["Address", selectedSale.address], ["City", selectedSale.city], ["State", selectedSale.state], ["Pincode", selectedSale.pincode], ["Age", `${selectedSale.propertyAge} years`]].map(([k, v]) => (
                                        <div key={k} style={s.detailRow}><strong>{k}:</strong> <span>{v}</span></div>
                                    ))}
                                </div>
                                <div style={s.modalCol}>
                                    <h4 style={s.sectionHeading}>Seller Details</h4>
                                    {[["Name", selectedSale.sellerName], ["Phone", selectedSale.phone], ["Email", selectedSale.email]].map(([k, v]) => (
                                        <div key={k} style={s.detailRow}><strong>{k}:</strong> <span>{v}</span></div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <h4 style={s.sectionHeading}>Description</h4>
                                <p style={s.descriptionText}>{selectedSale.description || "No description provided."}</p>
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <h4 style={s.sectionHeading}>Amenities</h4>
                                <div style={s.amenitiesGrid}>
                                    {selectedSale.amenities?.map((a, i) => (
                                        <div key={i} style={s.amenityItem}><FaCheck size={10} /> {a}</div>
                                    ))}
                                </div>
                            </div>

                            {selectedSale.images?.filter(img => img).length > 0 ? (
                                <div style={{ marginTop: 20 }}>
                                    <h4 style={s.sectionHeading}>Gallery</h4>
                                    <div style={s.gallery}>
                                        {selectedSale.images.filter(img => img).map((img, i) => (
                                            <img
                                                key={i}
                                                src={img.startsWith('http') ? img : `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`}
                                                alt=""
                                                style={s.galleryImg}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/200x150?text=Error+Loading'; }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginTop: 20, padding: 20, background: "#faf6f3", borderRadius: 16, textAlign: "center" }}>
                                    <FaRegImage size={30} color="#a89385" />
                                    <p style={{ color: "#7a5c4a", fontSize: 14, marginTop: 10 }}>No images uploaded for this property.</p>
                                </div>
                            )}
                        </div>

                        <div style={s.modalFooter}>
                            <a href={`https://wa.me/${selectedSale.phone}`} target="_blank" rel="noreferrer" style={s.whatsappBtn}>
                                Contact via WhatsApp <FaArrowRight />
                            </a>
                            <button style={s.primaryBtn} onClick={() => setShowModal(false)}>Close View</button>
                        </div>
                    </div>
                </div>
            )}
<<<<<<< HEAD
        </>
    );
};

const s = {
    page: {
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
        fontFamily: "'DM Sans', sans-serif",
    },
    accentBar: {
        width: 5,
        background: "linear-gradient(180deg, #4C3324 0%, #B2846B 100%)",
        flexShrink: 0,
    },
    container: {
        flex: 1,
        padding: "48px 52px",
        maxWidth: 1400,
        color: "#3b2416",
=======
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
>>>>>>> e85f1ae (nilam2)
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 32,
        flexWrap: "wrap",
        gap: 16,
    },
    breadcrumb: {
        fontSize: 12,
        color: "#B2846B",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 0,
    },
    title: {
<<<<<<< HEAD
        fontSize: 34,
        fontWeight: 700,
        margin: "6px 0 0",
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
=======
        fontSize: "28px",
        fontWeight: "800",
        margin: 0,
        color: "#4c3324",
>>>>>>> e85f1ae (nilam2)
        letterSpacing: "-0.5px",
    },
    subtitle: {
        fontSize: 14,
        color: "#7a5c4a",
        marginTop: 6,
    },
    statsRow: {
        display: "flex",
        gap: 16,
    },
    statCard: {
        background: "#fff",
        padding: "16px 20px",
        borderRadius: 16,
        border: "1px solid #e8ddd5",
        boxShadow: "0 4px 10px rgba(76,51,36,0.06)",
        display: "flex",
        alignItems: "center",
        gap: 15,
        minWidth: 200,
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
    },
    statLabel: {
        fontSize: 12,
        color: "#7a5c4a",
        margin: 0,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    statValue: {
        fontSize: 18,
        fontWeight: 700,
        margin: 0,
<<<<<<< HEAD
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
=======
        color: "#4c3324",
>>>>>>> e85f1ae (nilam2)
    },
    tableCard: {
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #e8ddd5",
        boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
        overflow: "hidden",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
    },
    th: {
<<<<<<< HEAD
        padding: "18px 20px",
        background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
        fontSize: 12,
        fontWeight: 700,
        color: "#7a5c4a",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: "1px solid #e8ddd5",
        fontFamily: "'DM Sans', sans-serif",
=======
        padding: "20px",
        background: "rgba(178, 132, 107, 0.05)",
        fontSize: "13px",
        fontWeight: "700",
        color: "#4c3324",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderBottom: "1px solid rgba(228, 203, 182, 0.3)",
>>>>>>> e85f1ae (nilam2)
    },
    tr: {
        borderBottom: "1px solid #f0e8e0",
        transition: "background 0.18s",
        cursor: "default",
    },
    td: {
        padding: "16px 20px",
        verticalAlign: "middle",
        fontFamily: "'DM Sans', sans-serif",
    },
    propInfo: {
        display: "flex",
        alignItems: "center",
        gap: 14,
    },
    propPreview: {
        width: 50,
        height: 50,
        borderRadius: 12,
        background: "#f0e8e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#B2846B",
        fontSize: 20,
        overflow: "hidden",
        flexShrink: 0,
    },
    tinyImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    propTitle: {
        fontSize: 15,
        fontWeight: 700,
        margin: 0,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
    },
    statusBadge: {
        fontSize: 10,
        fontWeight: 800,
        background: "#dde8e0",
        color: "#3a5c42",
        padding: "2px 8px",
        borderRadius: 99,
        textTransform: "uppercase",
        marginTop: 4,
        display: "inline-block",
        letterSpacing: "0.04em",
    },
    priceText: {
<<<<<<< HEAD
        fontSize: 16,
        fontWeight: 800,
        color: "#627B68",
=======
        fontSize: "16px",
        fontWeight: "800",
        color: "#b2846b", // Brand Tan
>>>>>>> e85f1ae (nilam2)
        margin: 0,
        fontFamily: "'Sora', sans-serif",
    },
    locationInfo: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        color: "#5a3e30",
    },
    sellerInfo: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    sellerName: {
        fontSize: 14,
        fontWeight: 600,
        color: "#4C3324",
        margin: 0,
    },
    sellerPhone: {
        fontSize: 12,
        color: "#7a5c4a",
        margin: 0,
    },
    typeInfo: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
    },
    tag: {
        fontSize: 11,
        fontWeight: 600,
        background: "#e8ddd5",
        color: "#5a3e30",
        padding: "4px 10px",
        borderRadius: 8,
    },
    dateText: {
        fontSize: 13,
        color: "#7a5c4a",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: 6,
    },
    actionButtons: {
        display: "flex",
        gap: 10,
    },
    viewBtn: {
<<<<<<< HEAD
        width: 36,
        height: 36,
        borderRadius: 10,
        border: "1.5px solid #627B68",
        background: "#eef2ee",
        color: "#627B68",
=======
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        border: "none",
        background: "rgba(98, 123, 104, 0.1)",
        color: "#627b68",
>>>>>>> e85f1ae (nilam2)
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.18s",
    },
    delBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        border: "1.5px solid #b85c3a",
        background: "#f9ede8",
        color: "#b85c3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.18s",
    },
    emptyState: {
        padding: "80px 30px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
    },

    // Modal
    modalOverlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(76, 51, 36, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
    },
    modalContent: {
        background: "#fff",
        width: "100%",
        maxWidth: 900,
        maxHeight: "90vh",
        borderRadius: 28,
        border: "1px solid #e8ddd5",
        boxShadow: "0 25px 50px rgba(76,51,36,0.18)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    closeBtn: {
        position: "absolute",
        top: 24,
        right: 24,
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1.5px solid #e8ddd5",
        background: "#faf6f3",
        color: "#7a5c4a",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        zIndex: 10,
    },
    modalHeader: {
        marginBottom: 28,
        borderBottom: "1px solid #e8ddd5",
        paddingBottom: 24,
    },
    modalTitle: {
<<<<<<< HEAD
        fontSize: 26,
        fontWeight: 700,
        margin: "0 0 8px 0",
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
=======
        fontSize: "28px",
        fontWeight: "800",
        margin: "0 0 10px 0",
        color: "#4c3324",
>>>>>>> e85f1ae (nilam2)
    },
    modalBadge: {
        display: "inline-block",
        padding: "8px 20px",
<<<<<<< HEAD
        background: "#627B68",
=======
        background: "#b2846b",
>>>>>>> e85f1ae (nilam2)
        color: "#fff",
        borderRadius: 14,
        fontSize: 18,
        fontWeight: 800,
        fontFamily: "'Sora', sans-serif",
    },
    modalGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 24,
    },
    modalCol: {},
    sectionHeading: {
        fontSize: 12,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#B2846B",
        marginBottom: 14,
        margin: "0 0 14px",
    },
    detailRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "9px 0",
        fontSize: 14,
        borderBottom: "1px solid #f0e8e0",
        color: "#4C3324",
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 1.6,
        color: "#5a3e30",
        background: "#faf6f3",
        padding: 20,
        borderRadius: 14,
        margin: 0,
    },
    amenitiesGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
    },
    amenityItem: {
        background: "#e8ddd5",
        padding: "7px 14px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        color: "#4C3324",
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    gallery: {
        display: "flex",
        gap: 10,
        overflowX: "auto",
        paddingBottom: 10,
    },
    galleryImg: {
        width: 200,
        height: 150,
        objectFit: "cover",
        borderRadius: 14,
        flexShrink: 0,
    },
    modalBody: {
        padding: "32px 40px 40px",
        overflowY: "auto",
        flex: 1,
    },
    modalFooter: {
        background: "#faf6f3",
        padding: "18px 40px",
        display: "flex",
        gap: 14,
        borderTop: "1px solid #e8ddd5",
    },
    primaryBtn: {
        padding: "12px 24px",
        borderRadius: 12,
        border: "1.5px solid #d9c8bb",
        background: "#fff",
        color: "#7a5c4a",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
    },
    whatsappBtn: {
        flex: 1,
        padding: "12px 24px",
        borderRadius: 12,
        border: "none",
<<<<<<< HEAD
        background: "#627B68",
=======
        background: "#627b68",
>>>>>>> e85f1ae (nilam2)
        color: "#fff",
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
    },
};

export default AdminSalesList;
