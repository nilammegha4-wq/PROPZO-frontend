import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [showModal, setShowModal] = useState(false);
  const [viewAllLeads, setViewAllLeads] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [agent, setAgent] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const agentAuthStr = localStorage.getItem("agentAuth");

    if (role !== "agent" || !agentAuthStr) {
      navigate("/agent/login");
      return;
    }

    try {
      const parsedAgent = JSON.parse(agentAuthStr);
      setAgent(parsedAgent);

      const fetchData = async () => {
        try {
          // Fetch Properties
          const propRes = await fetch(`http://localhost:5000/api/properties/agent/${parsedAgent._id}`);
          const propData = await propRes.json();
          setProperties(Array.isArray(propData) ? propData : []);

          // Fetch Real Leads (Bookings)
          const leadsRes = await fetch(`http://localhost:5000/api/bookings/agent/${parsedAgent._id}`);
          const leadsData = await leadsRes.json();
          setLeads(Array.isArray(leadsData) ? leadsData : []);
        } catch (err) {
          console.error("Failed to fetch dashboard data:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } catch (e) {
      console.error("Error parsing agentAuth", e);
      setLoading(false);
    }
  }, [navigate]);

  const activeListings = Array.isArray(properties) ? properties.filter(p => (p.status === 'Active' || !p.status) && !p.isSold).length : 0;
  const portfolioValue = Array.isArray(properties) ? properties.reduce((sum, p) => sum + (Number(p.price) || 0), 0) : 0;

  const stats = [
    { label: 'ACTIVE PROPERTIES', value: activeListings.toString(), detail: 'Available for client inquiries', color: '#627B68', icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" },
    { label: 'CLIENT BOOKINGS', value: (Array.isArray(leads) ? leads.length : 0).toString(), detail: 'Total appointments scheduled', color: '#B2846B', icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { label: 'TOTAL PROPERTIES', value: (Array.isArray(properties) ? properties.length : 0).toString(), detail: 'Total in your portfolio', color: '#819B8B', icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  ];

  // --- Filtering Logic ---
  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.propertyType || p.type || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.propertyId?.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayProperties = filteredProperties.map(p => ({
    id: p._id,
    title: p.title,
    type: p.propertyType || p.type || "Apartment",
    category: p.category || "Buy",
    location: p.location,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    image: (p.images && p.images.length > 0) ? p.images[0] : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073",
    status: p.isSold ? "Sold" : "Active"
  })).slice(0, 5);

  const displayLeads = filteredLeads.map(l => {
    const prop = l.propertyId || {};
    return {
      id: l._id,
      clientName: l.name,
      clientEmail: l.email,
      clientPhone: l.phone,
      propertyTitle: prop.title || "Property",
      propertyLocation: prop.location || "N/A",
      propertyImage: (prop.images && prop.images.length > 0) ? prop.images[0] : (prop.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073"),
      appointmentDate: l.visitDate,
      message: l.message,
      status: l.status ? (l.status.charAt(0).toUpperCase() + l.status.slice(1)) : "Pending"
    };
  }).slice(0, 5);

  const handleLeadClick = (name) => {
    // Navigate or show details
  };

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
        </div>
      </div>

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
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statDetail}>{stat.detail}</div>
          </div>
        ))}
      </div>

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
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Client Bookings Section */}
        <div className="data-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>My Client Bookings</h2>
            <button style={styles.viewAllBtn} onClick={() => navigate('/agentdashboard/clients')}>
              View All
            </button>
          </div>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {displayLeads.length === 0 ? (
              <div style={styles.emptyInline}>
                {searchQuery ? `No bookings match "${searchQuery}"` : "No active bookings."}
              </div>
            ) : (
              displayLeads.map(lead => (
                <div key={lead.id} className="booking-card">
                  <img src={lead.propertyImage} alt={lead.propertyTitle} className="booking-img" />
                  <div className="booking-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={styles.propertyName}>{lead.propertyTitle}</div>
                      <span className={`status-pill status-${lead.status.toLowerCase()}`}>{lead.status}</span>
                    </div>
                    <div style={styles.propertySub}>{lead.propertyLocation}</div>

                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>{lead.clientName}</div>
                      <div className="client-detail">📧 {lead.clientEmail}</div>
                      <div className="client-detail">📞 {lead.clientPhone}</div>
                    </div>

                    <div style={{ marginTop: '12px', fontSize: '12px', color: '#b2846b', fontWeight: '600' }}>
                      Appointment: {lead.appointmentDate}
                    </div>
                    {lead.message && (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                        "{lead.message}"
                      </div>
                    )}
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
};

export default AgentDashboard;
