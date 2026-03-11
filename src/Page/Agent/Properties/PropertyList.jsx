import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const PropertyList = () => {
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const agentAuthStr = localStorage.getItem("agentAuth");
      if (!agentAuthStr) {
        navigate("/agent/login");
        return;
      }
      const agent = JSON.parse(agentAuthStr);

      const [propRes, bookingsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/properties/agent/${agent._id}`),
        axios.get(`http://localhost:5000/api/bookings/agent/${agent._id}`)
      ]);
      setProperties(propRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // --- Search Filtering ---
  const filteredProperties = Array.isArray(properties) ? properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.propertyType || p.type || "").toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // --- Handlers ---
  const formatPriceINR = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // --- Stats ---
  const activeListings = Array.isArray(properties) ? properties.filter(p => p.status === 'Active' || !p.status || !p.isSold).length : 0;
  const portfolioValue = Array.isArray(properties) ? properties.reduce((sum, p) => sum + (Number(p.price) || 0), 0) : 0;

  const stats = [
    { label: 'ACTIVE LISTINGS', value: activeListings.toString(), detail: 'Properties on Market', color: '#6366f1', icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" },
    { label: 'CLIENT BOOKINGS', value: (Array.isArray(bookings) ? bookings.length : 0).toString(), detail: 'Total Inquiries', color: '#10b981', icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { label: 'PORTFOLIO SIZE', value: (Array.isArray(properties) ? properties.length : 0).toString(), detail: 'Managed Assets', color: '#8b5cf6', icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
    { label: 'PORTFOLIO VALUE', value: formatPriceINR(portfolioValue), detail: 'Total Asset Worth', color: '#f59e0b', icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading properties...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .data-card { background: #ffffff; border: 1px solid #f1f5f9; border-radius: 20px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; }
        .data-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1); border-color: #e2e8f0; }
        .status-pill { padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-active { background: #ecfdf5; color: #059669; }
        .status-inactive { background: #f1f5f9; color: #64748b; }
        .status-sold { background: #fef2f2; color: #dc2626; }
        .table-row:hover { background: #f8fafc; }
        .prop-img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; }
        .price-text { font-weight: 800; color: #0f172a; font-size: 16px; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Properties</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Manage and track your real estate inventory</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid} className="fade-in">
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

      {/* Property Table Section */}
      <div className="data-card fade-in" style={{ padding: '0', overflowX: 'auto', animationDelay: '0.4s' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '80px' }}>Preview</th>
              <th style={styles.th}>Property Details</th>
              <th style={styles.th}>Type & Category</th>
              <th style={styles.th}>Pricing</th>
              <th style={styles.th}>Configuration</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.emptyInline}>
                  {searchQuery ? `No properties match "${searchQuery}"` : "No properties found in your portfolio."}
                </td>
              </tr>
            ) : (
              filteredProperties.map(prop => (
                <tr key={prop._id} className="table-row">
                  <td style={styles.td}>
                    <img
                      src={(prop.images && prop.images.length > 0) ? prop.images[0] : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073"}
                      alt={prop.title}
                      className="prop-img"
                    />
                  </td>
                  <td style={styles.td}>
                    <div style={styles.propertyName}>{prop.title}</div>
                    <div style={styles.propertySub}>{prop.location}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: '600', color: '#475569', fontSize: '13px' }}>{prop.type}</div>
                    <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700' }}>{prop.category?.toUpperCase() || "CAT"}</div>
                  </td>
                  <td style={styles.td}>
                    <div className="price-text">{formatPriceINR(prop.price)}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontSize: '13px', color: '#1e293b' }}>
                      <strong>{prop.beds}</strong> Bed | <strong>{prop.baths}</strong> Bath
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{prop.area || prop.size} sqft</div>
                  </td>
                  <td style={styles.td}>
                    <span className={`status-pill status-${(prop.status || 'Active').toLowerCase()}`}>
                      {prop.status || 'Active'}
                    </span>
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

const styles = {
  pageContainer: { maxWidth: '1280px', margin: '0 auto', padding: '0 20px 60px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', marginTop: '40px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
  subtitle: { fontSize: '15px', color: '#64748b', margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' },
  statCard: { padding: '24px' },
  statHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
  iconContainer: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' },
  statValue: { fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' },
  statDetail: { fontSize: '13px', color: '#94a3b8', fontWeight: '500' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '16px 24px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc' },
  td: { padding: '20px 24px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' },
  propertyName: { fontWeight: '700', color: '#1e293b', fontSize: '15px' },
  propertySub: { color: '#94a3b8', fontSize: '12px', marginTop: '2px' },
  emptyInline: { padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }
};

export default PropertyList;