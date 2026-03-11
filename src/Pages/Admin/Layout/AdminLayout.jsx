import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const notifRef = useRef(null);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token") || localStorage.getItem("adminAuthToken");
    if (!token) {
      console.warn("🔔 Notification Debug: No token found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/notifications", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔔 Notification Debug: Received", data.length, "notifications");
      setNotifications(data);
    } catch (err) {
      console.error("🔔 Notification Debug Error:", err.message);
    }
  };

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem("token") || localStorage.getItem("adminAuthToken");
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      }
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // 10s fetch
    return () => clearInterval(interval);
  }, []);

  // Close notif on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminProfile");
    navigate("/adminlogin");
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  const rawPage = pathParts.length > 1 ? pathParts[pathParts.length - 1] : "Dashboard";
  const currentPage = rawPage.charAt(0).toUpperCase() + rawPage.slice(1);
  const breadcrumb = `System / Administration / ${currentPage}`;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div style={styles.layoutWrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brandContainer}>
          <div style={styles.logoCircle}>A</div>
          <h2 style={styles.brandName}>Admin Panel</h2>
        </div>

        <nav style={styles.navStack} className="nav-scroll-area">
          <Link to="/admin" style={styles.link}>Dashboard</Link>
          <Link to="/admin/agent" style={styles.link}>Agents</Link>
          <Link to="/admin/contactlist" style={styles.link}>Contact</Link>
          <Link to="/admin/properties" style={styles.link}>Properties</Link>
          <Link to="/admin/sales" style={styles.link}>Sales</Link>
          <Link to="/admin/bookings" style={styles.link}>Property Appointments</Link>
          <Link to="/admin/rental-bookings" style={styles.link}>Rental Appointments</Link>
          <Link to="/admin/users" style={styles.link}>Users</Link>
          <Link to="/admin/reviews" style={styles.link}>Reviews</Link>
          <Link to="/admin/premium-services" style={styles.link}>Premium Services</Link>
          <Link to="/admin/reports" style={styles.link}>Reports</Link>
          <Link to="/admin/settings" style={styles.link}>Settings</Link>
        </nav>

        <style>{`
          .nav-scroll-area::-webkit-scrollbar {
            width: 4px;
          }
          .nav-scroll-area::-webkit-scrollbar-track {
            background: transparent;
          }
          .nav-scroll-area::-webkit-scrollbar-thumb {
            background: #1e293b;
            border-radius: 10px;
          }
          .nav-scroll-area::-webkit-scrollbar-thumb:hover {
            background: #334155;
          }
        `}</style>

        {/* User Profile and Logout Footer */}
        <div style={styles.sidebarFooter}>
          <div style={styles.userProfileWrapper}>
            <div style={styles.userAvatar}>A</div>
            <div style={styles.userInfo}>
              <p style={styles.userName}>Administrator</p>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Super Admin</p>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
              <svg style={{ width: "20px", height: "20px", color: "#f87171" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main style={styles.mainContent}>
        {/* Fixed Header Wrapper to prevent content bleed-thru */}
        <div style={styles.headerWrapper}>
          <header style={styles.topHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.greetingWrapper}>
                <h3 style={styles.greetingText}>Welcome back, Administrator 👋</h3>
                <p style={styles.greetingSubtext}>Here's what's happening today.</p>
              </div>
            </div>

            <div style={styles.headerRight}>
              <div style={styles.dateBadge}>
                <svg style={styles.headerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {currentDate}
              </div>

              <div style={{ position: "relative" }} ref={notifRef}>
                <button style={styles.iconButton} onClick={() => setNotifOpen(!notifOpen)}>
                  <svg style={styles.headerIconAlt} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && <span style={styles.notificationDot}>{unreadCount}</span>}
                </button>

                {notifOpen && (
                  <div style={styles.notifDropdown}>
                    <div style={styles.notifHeader}>
                      <h3 style={styles.notifTitle}>Notifications</h3>
                      <span style={styles.notifCount}>{unreadCount} Unread</span>
                    </div>
                    <div style={styles.notifList}>
                      {notifications.length === 0 ? (
                        <div style={styles.emptyNotif}>No notifications</div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n._id}
                            style={{
                              ...styles.notifItem,
                              backgroundColor: n.isRead ? "transparent" : "rgba(59, 130, 246, 0.05)"
                            }}
                            onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                          >
                            <div style={styles.notifItemIcon(n.type)}>
                              <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div style={styles.notifContent}>
                              <p style={styles.notifItemTitle}>{n.title}</p>
                              <p style={styles.notifItemMsg}>{n.message}</p>
                              <span style={styles.notifTime}>{new Date(n.createdAt).toLocaleString()}</span>
                            </div>
                            {!n.isRead && <span style={styles.unreadMarker}></span>}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>

        <div style={styles.outletContainer}>
          <Outlet />
        </div>
      </main>
    </div >
  );
}

const styles = {
  layoutWrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    backgroundColor: "#f8fafc", // Lightest slate
  },
  sidebar: {
    width: "260px",
    background: "#0f172a", // Deep obsidian
    color: "#fff",
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    boxSizing: "border-box", // Ensure padding doesn't push it beyond 100vh
    boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
    paddingLeft: "8px",
    flexShrink: 0,
  },
  logoCircle: {
    width: "32px",
    height: "32px",
    background: "#3b82f6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  brandName: {
    fontSize: "1.25rem",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  navStack: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
    overflowY: "auto",
    paddingRight: "4px", // Space for scrollbar
    marginBottom: "20px",
  },
  link: {
    color: "#94a3b8", // Muted slate
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "block",
    // In a real app, you'd add a hover state here via CSS classes
  },
  sidebarFooter: {
    marginTop: "auto",
    padding: "20px 8px 20px", // Added bottom padding
    borderTop: "1px solid #1e293b",
    flexShrink: 0,
  },
  mainContent: {
    flex: 1,
    marginLeft: "260px", // Match sidebar width
    display: "flex",
    flexDirection: "column",
  },
  headerWrapper: {
    position: "fixed",
    top: 0,
    left: "260px",
    right: 0,
    height: "116px", // 20 top + 76 height + 20 bottom
    backgroundColor: "#f8fafc", // Match page background
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 30px",
  },
  topHeader: {
    height: "76px",
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.85)", // Deep obsidian with transparency
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px -10px rgba(15, 23, 42, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  greetingWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  greetingText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  greetingSubtext: {
    margin: 0,
    fontSize: "13px",
    color: "#94a3b8",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  dateBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#e2e8f0",
    boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  },
  iconButton: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    position: "relative",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  headerIcon: {
    width: "16px",
    height: "16px",
    color: "#94a3b8",
  },
  headerIconAlt: {
    width: "20px",
    height: "20px",
    color: "#f8fafc",
  },
  notificationDot: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    width: "18px",
    height: "18px",
    backgroundColor: "#ef4444",
    borderRadius: "50%",
    border: "2px solid rgba(15, 23, 42, 0.85)",
    fontSize: "10px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },
  notifDropdown: {
    position: "absolute",
    top: "calc(100% + 15px)",
    right: "0",
    width: "360px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    zIndex: 100,
  },
  notifHeader: {
    padding: "16px 20px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
  },
  notifCount: {
    fontSize: "12px",
    color: "#3b82f6",
    fontWeight: "600",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    padding: "2px 8px",
    borderRadius: "12px",
  },
  notifList: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  notifItem: {
    padding: "16px 20px",
    display: "flex",
    gap: "12px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    borderBottom: "1px solid #f8fafc",
    position: "relative",
  },
  notifItemIcon: (type) => ({
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    backgroundColor: type === "property_added" ? "rgba(16, 185, 129, 0.1)" :
      type === "property_bought" ? "rgba(59, 130, 246, 0.1)" :
        type === "property_rented" ? "rgba(139, 92, 246, 0.1)" :
          "rgba(245, 158, 11, 0.1)",
    color: type === "property_added" ? "#10b981" :
      type === "property_bought" ? "#3b82f6" :
        type === "property_rented" ? "#8b5cf6" :
          "#f59e0b",
  }),
  notifContent: {
    flex: 1,
  },
  notifItemTitle: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
  },
  notifItemMsg: {
    margin: "0 0 6px 0",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: "1.4",
  },
  notifTime: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  unreadMarker: {
    width: "8px",
    height: "8px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  emptyNotif: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
  },
  outletContainer: {
    padding: "116px 40px 40px", // Match headerWrapper height
    maxWidth: "1200px",
  },
  userProfileWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
  },
  userInfo: {
    flex: 1,
    overflow: "hidden",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    margin: 0,
  },
  logoutBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "background-color 0.2s ease",
  },
};