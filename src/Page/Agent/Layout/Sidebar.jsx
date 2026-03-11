import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("agentAuth");
    if (stored) {
      try {
        setAgent(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing agentAuth", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("agentAuth");
    localStorage.removeItem("role");
    navigate("/agentlogin");
  };

  const menuItems = [
    { name: "Dashboard", path: "/agentdashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "My Properties", path: "/agentdashboard/properties", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" },
    { name: "Bookings", path: "/agentdashboard/clients", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "My Profile", path: "/agentdashboard/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  const getInitials = (name) => {
    if (!name) return "A";
    const parts = name.split(" ");
    if (parts.length > 1) return parts[0][0] + parts[1][0];
    return parts[0][0];
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.brandSection}>
        <div style={styles.logoSquare}>P</div>
        <h1 style={styles.brandTitle}>Propzo<span>Agent</span></h1>
      </div>

      <nav style={styles.navStack}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            <svg
              style={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
            </svg>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={styles.userProfile}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
          <div style={styles.avatar}>
            {getInitials(agent?.fullName)}
          </div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>{agent?.fullName || "Agent User"}</p>
            <p style={styles.userRole}>Verified Partner</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
          title="Logout"
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)")}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    height: "100vh",
    background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
    display: "flex",
    flexDirection: "column",
    padding: "32px 20px",
    position: "fixed",
    left: 0,
    top: 0,
    boxSizing: "border-box",
    boxShadow: "4px 0 24px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  brandSection: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "48px",
    paddingLeft: "8px",
  },
  logoSquare: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    borderRadius: "10px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  navStack: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "12px",
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  activeLink: {
    background: "rgba(99, 102, 241, 0.15)",
    color: "#818cf8",
    fontWeight: "600",
    boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.2)",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "14px",
  },
  userProfile: {
    marginTop: "auto",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    color: "#ffffff",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  userInfo: {
    overflow: "hidden",
  },
  userName: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 2px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  userRole: {
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "500",
    margin: 0,
  },
  logoutBtn: {
    background: "rgba(239, 68, 68, 0.05)",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  }
};
