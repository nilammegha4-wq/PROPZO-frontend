import fs from 'fs';

const filePath = 'C:/Users/91743/OneDrive/Desktop/patiyyu/patiyyu/project(7-3)/vite-project/src/Page/Agent/Dashboard/Dashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the duplicate first "const stats = [" definition
content = content.replace(/const stats = \[\s*\{\s*label: 'ACTIVE PROPERTIES'[\s\S]*?\];/m, '');

const newReturnBlock = `  return (
    <div style={styles.container}>
      <style>{\`
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
      \`}</style>

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
          <div key={i} className="data-card" style={{ ...styles.statCard, animationDelay: \`\${i * 0.1}s\` }}>
            <div style={styles.statHeader}>
              <div style={{ ...styles.iconContainer, backgroundColor: \`\${stat.color}10\`, color: stat.color }}>
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
                    <span className={\`status-pill status-\${prop.status?.toLowerCase() || 'pending'}\`}>{prop.status || 'Pending'}</span>
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
  );`;

// Replace from '  return (' to the end '};'
const returnStartIndex = content.indexOf('  return (');
const lastBraceIndex = content.lastIndexOf('};');

if (returnStartIndex !== -1 && lastBraceIndex !== -1) {
  content = content.slice(0, returnStartIndex) + newReturnBlock + '\n' + content.slice(lastBraceIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully fixed Dashboard.jsx");
} else {
  console.log("Could not find return block");
}
