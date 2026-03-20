import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ClientList = () => {
  const { searchQuery } = useOutletContext();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize and Sync Data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const agentAuthStr = localStorage.getItem("agentAuth");
        if (!agentAuthStr) return;
        const agent = JSON.parse(agentAuthStr);

        const res = await fetch(`http://localhost:5000/api/bookings/agent/${agent._id}`);
        const bookings = await res.json();

        // Map bookings to client directory format
        if (Array.isArray(bookings)) {
          const mappedClients = bookings.map(b => ({
            id: b._id,
            name: b.name || "Unknown Client",
            email: b.email,
            phone: b.phone,
            interest: b.propertyId?.title || "Property Inquiry",
            propertyImage: b.propertyId?.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073",
            visitDate: b.visitDate || "TBD",
            visitTime: b.visitTime || "TBD",
            message: b.message || "",
            visitors: b.visitors || 1,
            virtualTour: b.virtualTour,
            agentCall: b.agentCall
          }));
          setClients(mappedClients);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div style={styles.container} className="cl-container">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .booking-card { 
          background: #ffffff; 
          border: 1px solid rgba(228, 203, 182, 0.2); 
          border-radius: 20px; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .booking-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 12px 24px -10px rgba(76, 51, 36, 0.1); 
          border-color: rgba(228, 203, 182, 0.3); 
        }
        .req-chip { 
          padding: 4px 10px; 
          border-radius: 8px; 
          font-size: 10px; 
          font-weight: 800; 
          text-transform: uppercase; 
          letter-spacing: 0.5px; 
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .chip-visitors { background: #faf7f5; color: #6b5e58; border: 1px solid rgba(228, 203, 182, 0.2); }
        .chip-preference { background: rgba(129, 155, 139, 0.1); color: #627b68; border: 1px solid rgba(129, 155, 139, 0.2); }
        
        .avatar {
          width: 48px;
          height: 48px;
          background: #e4cbb6;
          color: #4c3324;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }
        .prop-thumb {
          width: 54px;
          height: 54px;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(228, 203, 182, 0.2);
        }
        .tr-row:hover { background: #faf7f5; }
      `}</style>

      <style>{`
        @media (max-width: 991px) {
          .cl-container { padding: 30px 20px !important; margin: 20px auto !important; }
        }
        @media (max-width: 768px) {
          .cl-title { font-size: 24px !important; }
        }
      `}</style>

      <style>{`
        @media (max-width: 991px) {
          .cl-container { padding: 30px 20px !important; margin: 20px auto !important; }
        }
        @media (max-width: 768px) {
          .cl-title { font-size: 24px !important; }
        }
      `}</style>

      {/* Header Section */}
      <div style={styles.header} className="fade-in cl-header">
        <div>
          <h2 style={styles.title} className="cl-title">Booking Directory</h2>
          <p style={styles.subtitle}>Manage and track your property inquiries</p>
        </div>
      </div>

      {/* Main Content Table */}
      <div className="booking-card fade-in cl-table-card" style={{ padding: '0', overflowX: 'auto', animationDelay: '0.2s', width: '100%' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>Loading your inquiries...</div>
        ) : filteredClients.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
            {searchQuery ? `No matches found for "${searchQuery}"` : "No inquiries found for your listings."}
          </div>
        ) : (
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={styles.table}>
            <thead>
              <tr style={{ background: '#faf7f5' }}>
                <th style={styles.th}>Client Details</th>
                <th style={styles.th}>Property Aspect</th>
                <th style={styles.th}>Appointment</th>
                <th style={styles.th}>Requirements</th>
                <th style={styles.th}>Inquiry Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="tr-row" style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={styles.td}>
                    <div style={styles.flexCenter}>
                      <div className="avatar">
                        {client.name.split(' ').map(n => n?.[0]).join('') || 'U'}
                      </div>
                      <div style={{ marginLeft: '16px' }}>
                        <div style={styles.clientName}>{client.name}</div>
                        <div style={styles.clientContact}>{client.email}</div>
                        <div style={styles.clientSubtitle}>{client.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.flexCenter}>
                      <img src={client.propertyImage} className="prop-thumb" alt="prop" />
                      <div style={{ marginLeft: '12px' }}>
                        <div style={styles.interestText}>{client.interest}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Property Inquiry</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: '700', color: '#4c3324', fontSize: '13px' }}>{client.visitDate}</div>
                    <div style={{ fontSize: '11px', color: '#b2846b', fontWeight: '800', marginTop: '2px' }}>{client.visitTime}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div className="req-chip chip-visitors">
                        👥 {client.visitors} {client.visitors > 1 ? 'People' : 'Person'}
                      </div>
                      {(client.virtualTour || client.agentCall) && (
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {client.virtualTour && <span className="req-chip chip-preference">🎥 Virtual</span>}
                          {client.agentCall && <span className="req-chip chip-preference">📞 Call Req.</span>}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {client.message ? (
                        <>
                          <span style={{ fontStyle: 'italic' }}>"{client.message}"</span>
                          <span className="req-chip" style={{ background: '#fffbeb', color: '#d97706', border: '1px solid #fef3c7', alignSelf: 'flex-start' }}>✨ Priority Inquiry</span>
                        </>
                      ) : <span style={{ opacity: 0.5 }}>- No message -</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  </>
);
};

const styles = {
  container: { maxWidth: '1280px', margin: '40px auto', padding: '0 20px' },
  header: { marginBottom: '40px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#4c3324', margin: '0 0 8px 0', letterSpacing: '-0.5px' },
  subtitle: { color: '#6b5e58', fontSize: '15px', margin: 0 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '16px 24px', textAlign: 'left', fontSize: '10px', fontWeight: '800', color: '#819b8b', textTransform: 'uppercase', letterSpacing: '1px' },
  td: { padding: '24px' },
  flexCenter: { display: 'flex', alignItems: 'center' },
  clientName: { fontWeight: '700', color: '#4c3324', fontSize: '15px' },
  clientContact: { fontSize: '12px', color: '#b2846b', marginTop: '2px', fontWeight: '500' },
  clientSubtitle: { fontSize: '12px', color: '#6b5e58', marginTop: '2px' },
  interestText: { fontSize: '14px', fontWeight: '700', color: '#4c3324' }
};

export default ClientList;