import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';

const AgentDashboard = () => {
    const navigate = useNavigate();
    const { searchQuery } = useOutletContext();
    const [properties, setProperties] = useState([]);
    const [leads, setLeads] = useState([]); // Visit Bookings
    const [rentalLeads, setRentalLeads] = useState([]); // Rent & PreRent Bookings
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [agent, setAgent] = useState(null);
    const [error, setError] = useState(null);

    const refreshTimerRef = useRef(null);

    // Fetch Data Function
    const fetchData = useCallback(async (isBackground = false) => {
        if (!isBackground) setLoading(true);
        else setRefreshing(true);
        setError(null);

        try {
            const agentAuthStr = localStorage.getItem("agentAuth");
            if (!agentAuthStr) throw new Error("Agent session not found");
            const parsedAgent = JSON.parse(agentAuthStr);

            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Parallel fetching for performance
            const [propRes, leadsRes, rentalRes] = await Promise.all([
                axios.get(`http://localhost:5000/api/properties/agent/${parsedAgent._id}`, config),
                axios.get(`http://localhost:5000/api/bookings/agent/${parsedAgent._id}`, config),
                axios.get(`http://localhost:5000/api/rental-bookings/agent/${parsedAgent._id}`, config)
            ]);

            setProperties(Array.isArray(propRes.data) ? propRes.data : []);
            setLeads(Array.isArray(leadsRes.data) ? leadsRes.data : []);
            setRentalLeads(Array.isArray(rentalRes.data) ? rentalRes.data : []);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Dashboard Fetch Error:", err);
            setError("Failed to sync dashboard data.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // Initial load and Agent setup
    useEffect(() => {
        const role = localStorage.getItem("role");
        const agentAuthStr = localStorage.getItem("agentAuth");

        if (role !== "agent" || !agentAuthStr) {
            navigate("/agent/login");
            return;
        }

<<<<<<< HEAD
        const parsedAgent = JSON.parse(agentAuthStr);
        setAgent(parsedAgent);
        fetchData();
=======
  const stats = [
    { label: 'ACTIVE PROPERTIES', value: activeListings.toString(), detail: 'Available for client inquiries', color: '#627B68', icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" },
    { label: 'CLIENT BOOKINGS', value: (Array.isArray(leads) ? leads.length : 0).toString(), detail: 'Total appointments scheduled', color: '#B2846B', icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { label: 'TOTAL PROPERTIES', value: (Array.isArray(properties) ? properties.length : 0).toString(), detail: 'Total in your portfolio', color: '#819B8B', icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  ];
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610

        // 60-second Refresh Interval
        refreshTimerRef.current = setInterval(() => {
            fetchData(true);
        }, 60000);

        return () => {
            if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
        };
    }, [navigate, fetchData]);

    // Live "Last Updated" relative time logic
    const [timeSinceUpdate, setTimeSinceUpdate] = useState("Just now");
    useEffect(() => {
        const interval = setInterval(() => {
            const seconds = Math.floor((new Date() - lastUpdated) / 1000);
            if (seconds < 5) setTimeSinceUpdate("Just now");
            else if (seconds < 60) setTimeSinceUpdate(`${seconds}s ago`);
            else setTimeSinceUpdate(`${Math.floor(seconds / 60)}m ago`);
        }, 1000);
        return () => clearInterval(interval);
    }, [lastUpdated]);

    // Derived Stats
    const totalActive = properties.filter(p => !p.isSold).length;
    const totalBookingsCount = (leads?.length || 0) + (rentalLeads?.length || 0);

    const stats = [
        { 
            label: 'ACTIVE PROPERTIES', 
            value: totalActive.toString(), 
            detail: 'Live listings on PropZo', 
            color: '#627B68', 
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" 
        },
        { 
            label: 'TOTAL APPOINTMENTS', 
            value: totalBookingsCount.toString(), 
            detail: 'Buy, Rent & PreRent requests', 
            color: '#B2846B', 
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
        },
        { 
            label: 'TOTAL LISTINGS', 
            value: (properties?.length || 0).toString(), 
            detail: 'Overall listing portfolio', 
            color: '#819B8B', 
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
        },
    ];

<<<<<<< HEAD
    // Data Transformation for List Views
    const displayProperties = properties
        .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    // Unified Booking Feed
    const allLeads = [
        ...leads.map(l => ({
            ...l,
            id: l._id,
            clientName: l.name,
            clientEmail: l.email,
            clientPhone: l.phone,
            propertyTitle: l.propertyId?.title || "Visit Request",
            propertyLocation: l.propertyId?.location || "N/A",
            propertyImage: (l.propertyId?.images?.[0]) || (l.propertyId?.image) || null,
            appointmentDate: l.visitDate,
            type: "Buy (Visit)",
            status: l.status ? (l.status.charAt(0).toUpperCase() + l.status.slice(1)) : "Pending"
        })),
        ...rentalLeads.map(l => ({
            ...l,
            id: l._id,
            clientName: l.name,
            clientEmail: l.email,
            clientPhone: l.phone,
            propertyTitle: l.propertyId?.title || (l.propertyType === "PerRent" ? "PreRent Appointment" : "Rental Appointment"),
            propertyLocation: l.propertyId?.location || "N/A",
            propertyImage: (l.propertyId?.images?.[0]) || (l.propertyId?.image) || null,
            appointmentDate: l.visitDate,
            type: l.propertyType === "PerRent" ? "Pre-Rent" : "Rental",
            status: l.status ? (l.status.charAt(0).toUpperCase() + l.status.slice(1)) : "Pending"
        }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const displayLeads = allLeads
        .filter(l => !searchQuery || l.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || l.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);

    if (loading) return (
        <div style={styles.loaderContainer}>
            <div className="spinner"></div>
            <p style={{ marginTop: '20px', color: '#64748b', fontWeight: '500' }}>Syncing Agent Dashboard...</p>
=======
  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .data-card { background: #ffffff; border: 1px solid #f1f5f9; border-radius: 20px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; }
        .data-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1); border-color: #e2e8f0; }
        .status-pill { padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-active { background: #ecfdf5; color: #059669; }
        .status-sold { background: #fef2f2; color: #dc2626; }
        .status-pending { background: #fffbeb; color: #d97706; }
        .status-completed { background: rgba(129, 155, 139, 0.15); color: #627b68; }
        .table-row:hover { background: #f8fafc; }
        .booking-card { display: flex; gap: 20px; padding: 20px; border-bottom: 1px solid #f1f5f9; }
        .booking-img, .listing-img { width: 100px; height: 100px; border-radius: 12px; object-fit: cover; }
        .booking-info, .listing-info { flex: 1; }
        .client-detail, .spec-detail { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748b; margin-top: 4px; }
        .price-tag { font-weight: 800; color: #0f172a; font-size: 15px; margin-top: 8px; }

        @media (max-width: 960px) {
          .trace-grid-container { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .trace-stats-grid { grid-template-columns: 1fr !important; }
          .trace-header { margin-top: 20px !important; margin-bottom: 20px !important; }
          .booking-card { flex-direction: column !important; }
          .booking-img, .listing-img { width: 100% !important; height: 200px !important; }
        }
        @media (max-width: 480px) {
          .trace-title { font-size: 24px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header} className="fade-in trace-header">
        <div>
          <h1 style={styles.title} className="trace-title">Welcome back, {agent?.fullName?.split(" ")[0] || "Agent"}</h1>
          <p style={styles.subtitle}>Here is your real-estate performance overview.</p>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        </div>
    );

<<<<<<< HEAD
    return (
        <div style={styles.container}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .fade-in { animation: fadeIn 0.4s ease-out forwards; }
                .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #b2846b; border-radius: 50%; animation: spin 1s linear infinite; }
                .data-card { background: #ffffff; border: 1px solid #f1f5f9; border-radius: 20px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; }
                .data-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1); border-color: #e2e8f0; }
                .status-pill { padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                .status-active { background: #ecfdf5; color: #059669; }
                .status-sold { background: #fef2f2; color: #dc2626; }
                .status-pending { background: #fffbeb; color: #d97706; }
                .status-prerental { background: #eef2ff; color: #4f46e5; }
                .status-rental { background: #fff7ed; color: #c2410c; }
                .booking-card { display: flex; gap: 20px; padding: 20px; border-bottom: 1px solid #f1f5f9; position: relative; }
                .booking-img, .listing-img { width: 100px; height: 100px; border-radius: 12px; object-fit: cover; background: #f8fafc; }
                .type-badge { position: absolute; top: 20px; right: 20px; font-size: 10px; font-weight: 800; color: #94a3b8; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
            `}</style>

            {/* Header & Meta */}
            <div style={styles.header} className="fade-in">
                <div>
                    <h1 style={styles.title}>Welcome back, {agent?.fullName?.split(" ")[0] || "Agent"}</h1>
                    <p style={styles.subtitle}>Last updated: <span style={{ color: '#b2846b', fontWeight: '700' }}>{timeSinceUpdate}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                        style={{ ...styles.refreshBtn, opacity: refreshing ? 0.6 : 1 }} 
                        onClick={() => fetchData(true)}
                        disabled={refreshing}
                    >
                        {refreshing ? "Refreshing..." : "Sync Data"}
                    </button>
                    <div style={styles.liveIndicator}>
                        <div style={styles.liveDot}></div> Live Feed
                    </div>
                </div>
=======
      {/* Stats Grid */}
      <div style={styles.statsGrid} className="fade-in trace-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="data-card" style={{ ...styles.statCard, animationDelay: `${i * 0.1}s` }}>
            <div style={styles.statHeader}>
              <div style={{ ...styles.iconContainer, backgroundColor: `${stat.color}10`, color: stat.color }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
              <span style={styles.statLabel}>{stat.label}</span>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
            </div>

<<<<<<< HEAD
            {error && (
                <div style={styles.errorBanner} className="fade-in">
                    <span>⚠️ {error}</span>
                    <button style={styles.retryBtn} onClick={() => fetchData()}>Retry</button>
=======
      <div style={styles.gridContainer} className="fade-in trace-grid-container">
        {/* Recent Properties Section */}
        <div className="data-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>Recent Listings</h2>
            <button style={styles.viewAllBtn} onClick={() => navigate('/agentdashboard/properties')}>
              View All
            </button>
          </div>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {displayProperties.length === 0 ? (
              <div style={styles.emptyInline}>
                {searchQuery ? `No properties match "${searchQuery}"` : "No properties found."}
              </div>
            ) : (
              displayProperties.map(prop => (
                <div key={prop.id} className="booking-card">
                  <img src={prop.image} alt={prop.title} className="listing-img" />
                  <div className="listing-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={styles.propertyName}>{prop.title}</div>
                      <span className={`status-pill status-${prop.status.toLowerCase()}`}>{prop.status}</span>
                    </div>
                    <div style={styles.propertySub}>{prop.location}</div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                      <div className="spec-detail">🛏️ {prop.beds} Beds</div>
                      <div className="spec-detail">🚿 {prop.baths} Baths</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                      <div className="price-tag">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(prop.price)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>
                        {prop.category}
                      </div>
                    </div>
                  </div>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                </div>
            )}

            {/* Stats Grid */}
            <div style={styles.statsGrid} className="fade-in">
                {stats.map((stat, i) => (
                    <div key={i} className="data-card" style={{ ...styles.statCard, animationDelay: `${i * 0.1}s`, borderRight: `4px solid ${stat.color}` }}>
                        <div style={styles.statHeader}>
                            <div style={{ ...styles.iconContainer, backgroundColor: `${stat.color}10`, color: stat.color }}>
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                            <span style={styles.statLabel}>{stat.label}</span>
                        </div>
                        <div style={styles.statValue}>{stat.value}</div>
                        <div style={styles.statDetail}>{stat.detail}</div>
                    </div>
                ))}
            </div>

            <div style={styles.gridContainer} className="fade-in">
                {/* Recent Properties Section */}
                <div className="data-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={styles.tableBlockHeader}>
                        <h2 style={styles.tableTitle}>Recent Listings</h2>
                        <button style={styles.viewAllBtn} onClick={() => navigate('/agentdashboard/properties')}>
                            Portfolio →
                        </button>
                    </div>
<<<<<<< HEAD
                    <div>
                        {displayProperties.length === 0 ? (
                            <div style={styles.emptyInline}>No recent properties found.</div>
                        ) : (
                            displayProperties.map(prop => (
                                <div key={prop._id} className="booking-card">
                                    <img 
                                        src={prop.images?.[0] || prop.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000"} 
                                        alt={prop.title} 
                                        className="listing-img" 
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={styles.propertyName}>{prop.title}</div>
                                            <span className={`status-pill status-${prop.isSold ? 'sold' : 'active'}`}>
                                                {prop.isSold ? 'Sold' : 'Active'}
                                            </span>
                                        </div>
                                        <div style={styles.propertySub}>{prop.location}, {prop.city}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                                            <div style={{ fontWeight: '800', color: '#0f172a' }}>
                                                ₹{prop.price?.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {prop.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
=======

                    <div style={{ marginTop: '12px', fontSize: '12px', color: '#b2846b', fontWeight: '600' }}>
                      Appointment: {lead.appointmentDate}
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                    </div>
                </div>

                {/* Combined Booking Feed */}
                <div className="data-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={styles.tableBlockHeader}>
                        <h2 style={styles.tableTitle}>Recent Activities</h2>
                        <button style={styles.viewAllBtn} onClick={() => navigate('/agentdashboard/clients')}>
                            All Leads →
                        </button>
                    </div>
                    <div>
                        {displayLeads.length === 0 ? (
                            <div style={styles.emptyInline}>No recent booking activity.</div>
                        ) : (
                            displayLeads.map(lead => (
                                <div key={lead.id} className="booking-card">
                                    <span className="type-badge">{lead.type}</span>
                                    <img 
                                        src={lead.propertyImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000"} 
                                        alt={lead.propertyTitle} 
                                        className="booking-img" 
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={styles.propertyName}>{lead.propertyTitle}</div>
                                            <span className={`status-pill status-${lead.status.toLowerCase()}`}>
                                                {lead.status}
                                            </span>
                                        </div>
                                        <div style={styles.propertySub}>{lead.clientName} | {lead.appointmentDate}</div>
                                        <div style={{ marginTop: '12px' }}>
                                            <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748b' }}>
                                                <span>📞 {lead.clientPhone}</span>
                                                <span>📧 {lead.clientEmail}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
<<<<<<< HEAD
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' },
    loaderContainer: { height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', marginTop: '40px' },
    title: { fontSize: '28px', fontWeight: '800', color: '#4c3324', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
    subtitle: { fontSize: '14px', color: '#64748b', margin: 0 },
    refreshBtn: { background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    liveIndicator: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#059669', fontWeight: '700', background: '#ecfdf5', padding: '8px 16px', borderRadius: '12px' },
    liveDot: { width: '8px', height: '8px', background: '#059669', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(5, 150, 105, 0.2)' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' },
    statCard: { padding: '24px' },
    statHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
    iconContainer: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    statLabel: { fontSize: '14px', fontWeight: '600', color: '#64748b' },
    statValue: { fontSize: '32px', fontWeight: '800', color: '#4c3324', marginBottom: '4px' },
    statDetail: { fontSize: '13px', color: '#94a3b8', fontWeight: '500' },
    gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' },
    tableBlockHeader: { padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    tableTitle: { fontSize: '16px', fontWeight: '800', color: '#4c3324', margin: 0 },
    viewAllBtn: { background: 'none', border: 'none', color: '#b2846b', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
    propertyName: { fontWeight: '700', color: '#1e293b', fontSize: '14px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    propertySub: { color: '#64748b', fontSize: '12px', marginTop: '2px' },
    emptyInline: { padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px', fontWeight: '500' },
    errorBanner: { background: '#fee2e2', color: '#dc2626', padding: '16px 24px', borderRadius: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600' },
    retryBtn: { background: '#dc2626', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }
=======
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', marginTop: '40px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#4c3324', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
  subtitle: { fontSize: '15px', color: '#64748b', margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' },
  statCard: { padding: '24px' },
  statHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
  iconContainer: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: '14px', fontWeight: '600', color: '#64748b' },
  statValue: { fontSize: '32px', fontWeight: '800', color: '#4c3324', marginBottom: '4px' },
  statDetail: { fontSize: '13px', color: '#94a3b8', fontWeight: '500' },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' },
  tableHeader: { padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tableTitle: { fontSize: '16px', fontWeight: '700', color: '#4c3324', margin: 0 },
  viewAllBtn: { background: 'none', border: 'none', color: '#b2846b', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 24px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc' },
  td: { padding: '16px 24px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' },
  propertyName: { fontWeight: '700', color: '#1e293b', fontSize: '14px' },
  propertySub: { color: '#94a3b8', fontSize: '11px', marginTop: '2px' },
  propertyType: { color: '#64748b', fontSize: '13px', fontWeight: '500' },
  location: { display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '13px' },
  emptyInline: { padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
};

export default AgentDashboard;
