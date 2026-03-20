import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Staff", path: "/admin/staff", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" },
    { name: "Properties", path: "/admin/properties", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Bookings", path: "/admin/bookings", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Users", path: "/admin/users", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { name: "Payments", path: "/admin/payments", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    { name: "Reviews", path: "/admin/reviews", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
    { name: "Premium Services", path: "/admin/premium-services", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
    { name: "Settings", path: "/admin/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    { name: "Contact List", path: "/admin/contactlist", icon: "M21 8V7a2 2 0 00-2-2h-3l-2-2H10L8 5H5a2 2 0 00-2 2v1m16 0v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8m16 0H3" },
 ];

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user and admin authentication payloads securely
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminProfile");

    // Redirect to the login face
    navigate("/adminlogin");
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.brandSection}>
        <div style={styles.logoSquare}>A</div>
        <h1 style={styles.brandTitle}>Estate<span>Admin</span></h1>
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
        <div style={styles.avatar}>A</div>
        <div style={styles.userInfo}>
          <p style={styles.userName}>Administrator</p>
          <p style={styles.userRole}>Super Admin</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
          <svg style={{ width: "20px", height: "20px", color: "#f87171" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
    backgroundColor: "#627B68", // Dark Sage Theme
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
    position: "fixed",
    left: 0,
    top: 0,
    boxSizing: "border-box",
    borderRight: "1px solid #5a705e",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  brandSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
    paddingLeft: "10px",
  },
  logoSquare: {
    width: "32px",
    height: "32px",
    backgroundColor: "#4C3324", // Deep Brown Logo Square
    borderRadius: "8px",
    color: "#E4CBB6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },
  brandTitle: {
    color: "#E4CBB6",
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
  },
  navStack: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "12px",
    color: "rgba(228, 203, 182, 0.6)", // Muted Beige
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease-in-out",
  },
  activeLink: {
    backgroundColor: "rgba(228, 203, 182, 0.12)", // Active Link Background
    color: "#E4CBB6", // Active Link Text
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    color: "#819B8B", // Lighter Sage
  },
  userProfile: {
    marginTop: "auto",
    padding: "16px",
    backgroundColor: "#566d5b", // User Profile Background
    borderRadius: "12px",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#4C3324",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#E4CBB6",
    fontWeight: "600",
  },
  userInfo: {
    overflow: "hidden",
  },
  userName: {
    color: "#E4CBB6",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },
  userRole: {
    color: "#819B8B",
    fontSize: "12px",
    margin: 0,
  },
  logoutBtn: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "background-color 0.2s",
  }
};