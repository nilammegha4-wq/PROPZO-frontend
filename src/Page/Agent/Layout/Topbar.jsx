import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
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
    <header style={styles.topbar}>
      <div style={styles.left}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h2 style={styles.pageTitle}>Agent</h2>
          <div style={styles.liveStatus}>
            <div style={styles.liveDot} />
            <span style={styles.liveLabel}>LIVE</span>
          </div>
        </div>
      </div>

      <div style={styles.topbarRight}>
        <div style={styles.actionIcons}>
          <button style={styles.iconBtn} title="Search">
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button style={styles.iconBtn} title="Notifications">
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div style={styles.notifBadge} />
          </button>
        </div>

        <div style={styles.divider} />

        <div style={styles.profileSection}>
          <div style={{ textAlign: 'right' }}>
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
  );
}

const styles = {
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    padding: "0 32px",
    height: "80px",
    borderBottom: "1px solid #f1f5f9",
    position: "sticky",
    top: 0,
    zIndex: 900,
  },
  left: { display: "flex", alignItems: "center" },
  pageTitle: { fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: '-0.5px' },
  liveStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#f0fdf4",
    padding: "4px 10px",
    borderRadius: "20px",
    marginLeft: "12px",
  },
  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#10b981",
    boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.15)"
  },
  liveLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#166534",
    letterSpacing: "0.5px",
  },
  topbarRight: { display: "flex", alignItems: "center", gap: "20px" },
  actionIcons: { display: "flex", alignItems: "center", gap: "8px" },
  iconBtn: {
    background: "transparent",
    border: "none",
    padding: "8px",
    borderRadius: "10px",
    color: "#64748b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "all 0.2s ease",
    "&:hover": { background: "#f1f5f9", color: "#0f172a" }
  },
  icon: { width: "20px", height: "20px" },
  notifBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "6px",
    height: "6px",
    background: "#ef4444",
    borderRadius: "50%",
    border: "2px solid #ffffff"
  },
  divider: { width: "1px", height: "32px", background: "#f1f5f9" },
  profileSection: { display: "flex", alignItems: "center", gap: "12px" },
  welcomeText: { fontWeight: "700", color: "#1e293b", fontSize: "14px", lineHeight: "1" },
  roleText: { fontSize: "11px", color: "#94a3b8", fontWeight: "500", marginTop: "4px" },
  avatar: { width: "42px", height: "42px", borderRadius: "14px", objectFit: "cover", border: "2px solid #f1f5f9" },
  avatarFallback: {
    background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px",
  },
};
