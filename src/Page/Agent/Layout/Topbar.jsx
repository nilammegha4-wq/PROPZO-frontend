import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("agentAuth");
    if (stored) {
      try {
        const parsedAgent = JSON.parse(stored);
        setAgent(parsedAgent);
      } catch (e) {
        console.error("Error parsing agentAuth", e);
      }
    }
  }, []);

  return (
    <>
      <header style={styles.topbar} className="agent-topbar">
        <div style={styles.left}>
          <button
            onClick={onMenuClick}
            style={styles.burgerBtn}
            className="agent-burger"
          >
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={styles.pageTitle}>Agent</h2>
            <div style={styles.liveStatus}>
              <div style={styles.liveDot} />
              <span style={styles.liveLabel}>LIVE</span>
            </div>
          </div>
        </div>

        <div style={styles.topbarRight} className="agent-topbar-right">

          <div style={styles.divider} />

          <div style={styles.profileSection} className="agent-profile-section">
            <div style={{ textAlign: 'right' }} className="agent-welcome-text">
              <div style={styles.welcomeText}>{agent?.fullName || "Agent User"}</div>
              <div style={styles.roleText}>Senior Partner</div>
            </div>
            {agent?.image ? (
              <img src={agent.image} alt="Avatar" style={styles.avatar} />
            ) : (
              <div style={{ ...styles.avatar, ...styles.avatarFallback }}>
                {agent?.fullName?.charAt(0).toUpperCase() || "A"}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

const styles = {
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f9f6f1", // Cream
    padding: "0 32px",
    height: "80px",
    borderBottom: "1px solid rgba(178, 132, 107, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 900,
  },
  left: { display: "flex", alignItems: "center" },
  pageTitle: { fontSize: "20px", fontWeight: "800", color: "#4C3324", margin: 0, letterSpacing: '-0.5px' },
  liveStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(129, 155, 139, 0.2)", // Sage light tint
    padding: "4px 10px",
    borderRadius: "20px",
    marginLeft: "12px",
  },
  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#627B68",
    boxShadow: "0 0 0 3px rgba(98, 123, 104, 0.2)"
  },
  liveLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#627B68",
    letterSpacing: "0.5px",
  },
  topbarRight: { display: "flex", alignItems: "center", gap: "20px" },
  actionIcons: { display: "flex", alignItems: "center", gap: "8px" },
  iconBtn: {
    background: "transparent",
    border: "none",
    padding: "8px",
    borderRadius: "10px",
    color: "#819B8B",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "all 0.2s ease",
    "&:hover": { background: "rgba(178, 132, 107, 0.1)", color: "#4C3324" }
  },
  icon: { width: "20px", height: "20px" },
  notifBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "6px",
    height: "6px",
    background: "#B2846B",
    borderRadius: "50%",
    border: "2px solid #f9f6f1"
  },
  divider: { width: "1px", height: "32px", background: "rgba(178, 132, 107, 0.2)" },
  profileSection: { display: "flex", alignItems: "center", gap: "12px" },
  welcomeText: { fontWeight: "700", color: "#4C3324", fontSize: "14px", lineHeight: "1" },
  roleText: { fontSize: "11px", color: "#627B68", fontWeight: "500", marginTop: "4px" },
  avatar: { width: "42px", height: "42px", borderRadius: "14px", objectFit: "cover", border: "2px solid #E4CBB6" },
  avatarFallback: {
    background: "#627B68", // Sage Dark
    color: "#E4CBB6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px",
  },
  burgerBtn: {
    display: "none",
    background: "none",
    border: "none",
    color: "#819B8B",
    cursor: "pointer",
    padding: "8px",
    marginRight: "8px",
  }
};

const respStyles = `
  @media (max-width: 960px) {
    .agent-topbar { padding: 0 16px !important; }
    .agent-burger { display: block !important; }
  }
  @media (max-width: 600px) {
    .agent-welcome-text { display: none !important; }
    .agent-topbar-right { gap: 12px !important; }
  }
`;

if (typeof document !== 'undefined') {
  const styleTag = document.getElementById('agent-topbar-styles') || document.createElement('style');
  styleTag.id = 'agent-topbar-styles';
  styleTag.innerHTML = respStyles;
  document.head.appendChild(styleTag);
}
