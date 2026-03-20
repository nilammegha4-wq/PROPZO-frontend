import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';

const AgentDashboard = () => {
    const navigate = useNavigate();
    const { searchQuery } = useOutletContext() || {};
    const [properties, setProperties] = useState([]);
    const [leads, setLeads] = useState([]); 
    const [rentalLeads, setRentalLeads] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [agent, setAgent] = useState(null);
    const [error, setError] = useState(null);

    const refreshTimerRef = useRef(null);

    const fetchData = useCallback(async (isBackground = false) => {
        if (!isBackground) setLoading(true);
        else setRefreshing(true);
        setError(null);

        try {
            const agentAuthStr = localStorage.getItem("agentAuth");
            if (!agentAuthStr) throw new Error("Agent session not found");
            const parsedAgent = JSON.parse(agentAuthStr);
            setAgent(parsedAgent);

            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

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

    useEffect(() => {
        const role = localStorage.getItem("role");
        const agentAuthStr = localStorage.getItem("agentAuth");

        if (role !== "agent" || !agentAuthStr) {
            navigate("/agent/login");
            return;
        }
        
        refreshTimerRef.current = setInterval(() => {
            fetchData(true);
        }, 60000);

        fetchData();

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
        propertyName: { fontWeight: '700', color: '#1e293b', fontSize: '14px' },
        propertySub: { color: '#94a3b8', fontSize: '11px', marginTop: '2px' }
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
          .table-row:hover { background: #f8fafc; }
          .booking-card { display: flex; gap: 20px; padding: 20px; border-bottom: 1px solid #f1f5f9; }
          .booking-img, .listing-img { width: 100px; height: 100px; border-radius: 12px; object-fit: cover; }
          .booking-info, .listing-info { flex: 1; }
          .client-detail, .spec-detail { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748b; margin-top: 4px; }
          .price-tag { font-weight: 800; color: #0f172a; font-size: 15px; margin-top: 8px; }
        `}</style>
  
        {/* Header */}
        <div style={styles.header} className="fade-in">
          <div>
            <h1 style={styles.title}>Welcome back, {agent?.fullName?.split(" ")[0] || "Agent"}</h1>
            <p style={styles.subtitle}>Here is your real-estate performance overview. {timeSinceUpdate}</p>
          </div>
        </div>
  
        {/* Stats Grid */}
        <div style={styles.statsGrid} className="fade-in">
          {stats?.map((stat, i) => (
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
  
        <div style={styles.gridContainer} className="fade-in">
          {/* Recent Properties Section */}
          <div className="data-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={styles.tableHeader}>
              <h2 style={styles.tableTitle}>Recent Listings</h2>
              <button style={styles.viewAllBtn} onClick={() => navigate('/agent/properties')}>
                Portfolio →
              </button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {properties?.slice(0, 5).map(prop => (
                <div key={prop._id} className="booking-card">
                  <img src={prop.image || prop.images?.[0] || 'placeholder.jpg'} alt={prop.title} className="listing-img" />
                  <div className="listing-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={styles.propertyName}>{prop.title}</div>
                      <span className={`status-pill status-${prop.status?.toLowerCase() || 'pending'}`}>{prop.status || 'Pending'}</span>
                    </div>
                    <div style={styles.propertySub}>{prop.city || prop.location}</div>
                    <div className="price-tag">₹{Number(prop.price).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Combined Booking Feed */}
          <div className="data-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={styles.tableHeader}>
              <h2 style={styles.tableTitle}>Recent Activities</h2>
              <button style={styles.viewAllBtn} onClick={() => navigate('/agent/leads')}>
                All Leads →
              </button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {leads?.slice(0, 5).map(lead => (
                <div key={lead._id} className="booking-card">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={styles.propertyName}>{lead.propertyTitle}</div>
                      <span className="status-pill status-active">Lead</span>
                    </div>
                    <div style={styles.propertySub}>{lead.clientName}</div>
                    <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
                      📞 {lead.clientPhone} | 📧 {lead.clientEmail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default AgentDashboard;
