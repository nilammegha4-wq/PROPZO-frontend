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


  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading properties...</div>;
  }

  return (
    <>
      <div style={styles.pageContainer} className="apl-container">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .data-card { background: #ffffff; border: 1px solid rgba(228, 203, 182, 0.2); border-radius: 20px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; }
        .data-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -10px rgba(76, 51, 36, 0.1); border-color: rgba(228, 203, 182, 0.3); }
        .status-pill { padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-active { background: rgba(129, 155, 139, 0.15); color: #627b68; }
        .status-inactive { background: rgba(107, 94, 88, 0.1); color: #6b5e58; }
        .status-sold { background: rgba(178, 132, 107, 0.15); color: #b2846b; }
        .table-row:hover { background: #faf7f5; }
        .prop-img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 1px solid rgba(228, 203, 182, 0.2); }
        .price-text { font-weight: 800; color: #4c3324; font-size: 16px; }
      `}</style>

      <style>{`
        @media (max-width: 991px) {
          .apl-container { padding: 30px 20px !important; margin: 20px auto !important; }
        }
        @media (max-width: 768px) {
          .apl-title { font-size: 24px !important; }
          .apl-header { margin-top: 20px !important; margin-bottom: 20px !important; }
        }
        @media (max-width: 480px) {
          .apl-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header} className="apl-header">
        <div>
          <h1 style={styles.title} className="apl-title">My Properties</h1>
          <p style={{ color: '#6b5e58', margin: '4px 0 0 0' }}>Manage and track your real estate inventory</p>
        </div>
      </div>


      {/* Property Table Section */}
      <div className="data-card fade-in apl-table-card" style={{ padding: '0', overflowX: 'auto', animationDelay: '0.4s', width: '100%' }}>
        <div style={{ width: '100%', overflowX: 'auto' }}>
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
                    <div style={{ fontWeight: '600', color: '#4c3324', fontSize: '13px' }}>{prop.type}</div>
                    <div style={{ color: '#819b8b', fontSize: '11px', fontWeight: '700' }}>{prop.category?.toUpperCase() || "CAT"}</div>
                  </td>
                  <td style={styles.td}>
                    <div className="price-text">{formatPriceINR(prop.price)}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontSize: '13px', color: '#4c3324' }}>
                      <strong>{prop.beds}</strong> Bed | <strong>{prop.baths}</strong> Bath
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b5e58' }}>{prop.area || prop.size} sqft</div>
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
    </div>
  </>
);
};

const styles = {
  pageContainer: { maxWidth: '1280px', margin: '0 auto', padding: '0 20px 60px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', marginTop: '40px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#4c3324', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
  subtitle: { fontSize: '15px', color: '#6b5e58', margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' },
  statCard: { padding: '24px' },
  statHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
  iconContainer: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: '12px', fontWeight: '700', color: '#6b5e58', textTransform: 'uppercase', letterSpacing: '0.5px' },
  statValue: { fontSize: '28px', fontWeight: '800', color: '#4c3324', marginBottom: '4px' },
  statDetail: { fontSize: '13px', color: '#819b8b', fontWeight: '500' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '16px 24px', fontSize: '10px', fontWeight: '700', color: '#819b8b', textTransform: 'uppercase', letterSpacing: '1px', background: '#faf7f5' },
  td: { padding: '20px 24px', borderBottom: '1px solid rgba(228, 203, 182, 0.2)', verticalAlign: 'middle' },
  propertyName: { fontWeight: '700', color: '#4c3324', fontSize: '15px' },
  propertySub: { color: '#6b5e58', fontSize: '12px', marginTop: '2px' },
  emptyInline: { padding: '60px', textAlign: 'center', color: '#819b8b', fontSize: '14px', fontStyle: 'italic' }
};

export default PropertyList;