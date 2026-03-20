import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../Common/Avatar";
import { useAuth } from "../../context/AuthContext";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #B2846B;
    --gold-deep: #4C3324;
    --sage: #627B68;
    --sage-light: #819B8B;
    --blush: #E4CBB6;
    --white: #F5EDE3;
    --white-dim: rgba(228,203,182,0.62);
    --white-faint: rgba(228,203,182,0.14);
    --nav-bg: rgba(76,51,36,0.35);
    --nav-bg-scrolled: rgba(44,26,16,0.90);
  }

  * { box-sizing: border-box; }

  /* ── Navbar ── */
  .lv-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 68px;
    display: flex;
    align-items: center;
    padding: 0 48px;
    background: var(--nav-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--white-faint);
    font-family: 'DM Sans', sans-serif;
    transition: background 0.35s ease, border-color 0.35s ease, height 0.3s ease;
  }

  .lv-nav.scrolled {
    height: 62px;
    background: var(--nav-bg-scrolled);
    border-bottom-color: rgba(228,203,182,0.08);
  }

  @media (max-width: 900px) {
    .lv-nav { padding: 0 24px; }
    .lv-menu { display: none !important; }
    .lv-mobile-toggle { display: flex !important; }
    .lv-cta-btn { display: none !important; }
  }

  /* ── Logo ── */
  .lv-logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .lv-logo-img {
    height: 42px;
    width: auto;
    object-fit: contain;
    border-radius: 4px;
  }

  .lv-logo-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.10em;
    color: var(--white);
    transition: color 0.2s;
  }

  .lv-logo-text span { color: var(--gold); }
  .lv-logo:hover .lv-logo-text { color: var(--blush); }

  /* ── Center nav links ── */
  .lv-menu {
    display: flex;
    align-items: center;
    gap: 2px;
    margin: 0 auto;
    list-style: none;
  }

  .lv-nav-link {
    position: relative;
    padding: 8px 18px;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: var(--white-dim);
    text-decoration: none;
    border-radius: 2px;
    transition: color 0.2s ease;
    white-space: nowrap;
  }

  .lv-nav-link::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1.5px;

    background: var(--blush);
    transition: width 0.3s ease;
  }

  .lv-nav-link:hover { color: var(--white); }
  .lv-nav-link:hover::after { width: calc(100% - 36px); }

  .lv-nav-link.active { color: var(--white); }
  .lv-nav-link.active::after {
    width: calc(100% - 36px);
    background: var(--gold);
    height: 2px;
  }

  /* ── Right side ── */
  .lv-nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    margin-left: auto; /* Pushes to the right */
  }

  .lv-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border: 1px solid rgba(228,203,182,0.30);
    border-radius: 3px;
    background: transparent;
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 10.5px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 0.25s, background 0.25s, color 0.25s;
  }

  .lv-cta-btn:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(178,132,107,0.10);
  }

  /* Notification bell */
  .lv-notif-wrap { position: relative; }

  .lv-notif-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    color: var(--white-dim);
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .lv-notif-btn:hover { color: var(--white); }

  .lv-notif-badge {
    position: absolute;
    top: 4px; right: 4px;
    background: #B2846B;
    color: white;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 8px;
    border: 1.5px solid transparent;
    line-height: 1.3;
    pointer-events: none;
  }

  .lv-notif-panel {
    position: absolute;
    top: calc(100% + 14px);
    right: 0;
    width: 310px;
    background: #fffaf5;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(76,51,36,0.18);
    border: 1px solid rgba(178,132,107,0.18);
    overflow: hidden;
    z-index: 1200;
    animation: lv-drop 0.2s ease;
  }

  .lv-notif-head {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(178,132,107,0.12);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lv-notif-head-title {
    font-size: 13px;
    font-weight: 700;
    color: #4C3324;
    font-family: 'DM Sans', sans-serif;
  }

  .lv-notif-mark-btn {
    font-size: 11px;
    color: #627B68;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
  }

  .lv-notif-list {
    max-height: 380px;
    overflow-y: auto;
  }

  .lv-notif-item {
    padding: 13px 16px;
    border-bottom: 1px solid rgba(178,132,107,0.08);
    cursor: pointer;
    position: relative;
    transition: background 0.15s;
    font-family: 'DM Sans', sans-serif;
  }

  .lv-notif-item:hover { background: rgba(178,132,107,0.06); }
  .lv-notif-item.unread { background: rgba(98,123,104,0.05); }

  .lv-notif-unread-dot {
    position: absolute;
    left: 6px; top: 19px;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #819B8B;
  }

  .lv-notif-item-title {
    font-size: 12.5px;
    font-weight: 600;
    color: #4C3324;
  }

  .lv-notif-item-msg {
    font-size: 11.5px;
    color: #7a5c4a;
    margin-top: 3px;
    line-height: 1.4;
  }

  .lv-notif-item-time {
    font-size: 10px;
    color: #B2846B;
    margin-top: 6px;
  }

  .lv-notif-empty {
    padding: 36px 20px;
    text-align: center;
    color: #B2846B;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── User pill ── */
  .lv-user-wrap { position: relative; }

  .lv-user-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px 5px 6px;
    border: 1px solid rgba(228,203,182,0.22);
    border-radius: 40px;
    background: rgba(228,203,182,0.07);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    user-select: none;
  }

  .lv-user-pill:hover, .lv-user-pill.open {
    border-color: var(--gold);
    background: rgba(178,132,107,0.12);
  }

  .lv-user-name {
    font-size: 11.5px;
    font-weight: 400;
    color: var(--white);
    letter-spacing: 0.04em;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Dropdown */
  .lv-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 218px;
    background: #fffaf5;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(76,51,36,0.16);
    border: 1px solid rgba(178,132,107,0.18);
    padding: 8px;
    z-index: 1200;
    animation: lv-drop 0.18s ease;
  }

  @keyframes lv-drop {
    from { opacity: 0; transform: translateY(8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .lv-dropdown-hdr {
    padding: 8px 12px 12px;
    border-bottom: 1px solid rgba(178,132,107,0.12);
    margin-bottom: 6px;
  }

  .lv-dropdown-name {
    display: block;
    font-weight: 700;
    font-size: 13.5px;
    color: #4C3324;
    font-family: 'DM Sans', sans-serif;
  }

  .lv-dropdown-email {
    display: block;
    font-size: 11px;
    color: #9a7060;
    margin-top: 2px;
    font-family: 'DM Sans', sans-serif;
  }

  .lv-dd-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    font-size: 12.5px;
    font-weight: 500;
    color: #7a5c4a;
    border-radius: 8px;
    text-decoration: none;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    font-family: 'DM Sans', sans-serif;
  }

  .lv-dd-item:hover { background: rgba(178,132,107,0.08); color: #4C3324; }
  .lv-dd-item svg { width: 15px; height: 15px; color: var(--gold); flex-shrink: 0; }

  .lv-dd-divider { height: 1px; background: rgba(178,132,107,0.12); margin: 4px 8px; }

  .lv-dd-item.logout { color: #B2846B; }
  .lv-dd-item.logout:hover { background: rgba(178,132,107,0.10); color: #4C3324; }
  .lv-dd-item.logout svg { color: #B2846B; }

  /* Sign In button */
  .lv-signin-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border: 1px solid rgba(228,203,182,0.32);
    border-radius: 40px; /* Pill shape */

    background: transparent;
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

    position: relative;
    overflow: hidden;
  }

  .lv-signin-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.3s cubic-bezier(0.76,0,0.24,1);
  }

  .lv-signin-btn:hover { color: #4C3324; border-color: var(--gold); transform: translateY(-1px); }

  .lv-signin-btn:hover::before { transform: translateX(0); }
  .lv-signin-btn span { position: relative; z-index: 1; }

  /* ── Mobile toggle ── */
  .lv-mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    padding: 4px;
    margin-left: 16px;
  }

  .lv-mobile-toggle span {
    display: block;
    width: 24px;
    height: 1.8px;
    background: var(--blush);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

    transform-origin: center;
  }

  .lv-mobile-toggle.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .lv-mobile-toggle.open span:nth-child(2) { opacity: 0; }
  .lv-mobile-toggle.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .lv-drawer {
    position: fixed;
    top: 68px; left: 0; right: 0;
    background: rgba(44,26,16,0.97);
    border-bottom: 1px solid rgba(228,203,182,0.08);
    backdrop-filter: blur(20px);
    padding: 24px 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 999;
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    font-family: 'DM Sans', sans-serif;
  }

  .lv-drawer.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .lv-drawer-link {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(228,203,182,0.55);
    text-decoration: none;
    padding: 14px 0;
    border-bottom: 1px solid rgba(228,203,182,0.07);
    transition: color 0.2s;
  }

  .lv-drawer-link:hover, .lv-drawer-link.active { color: var(--blush); }

  .lv-drawer-signout {
    margin-top: 16px;
    background: none;
    border: 1px solid rgba(178,132,107,0.35);
    border-radius: 2px;
    color: #B2846B;
    font-size: 10.5px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 12px 0;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s, color 0.2s;
  }

  .lv-drawer-signout:hover {
    background: rgba(178,132,107,0.12);
    color: #E4CBB6;
  }
`;

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/agent", label: "Agents" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { auth: user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/agentdashboard") ||
    location.pathname.startsWith("/agentlogin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setNotifOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!user?.token) { setNotifications([]); return; }
    axios.get("/api/notifications", { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => setNotifications(res.data))
      .catch(console.error);
  }, [user]);

  const handleMarkAllRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    for (const n of unread) {
      axios.put(`/api/notifications/${n._id}/read`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
    }
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkRead = async (notif) => {
    if (!notif.isRead) {
      await axios.put(`/api/notifications/${notif._id}/read`, {}, { headers: { Authorization: `Bearer ${user.token}` } })
        .catch(console.error);
      setNotifications(notifications.map(n => n._id === notif._id ? { ...n, isRead: true } : n));
    }
    if (notif.link) { navigate(notif.link); setNotifOpen(false); }
  };

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    navigate("/login");
  };

  if (hideNavbar) return null;

  return (
    <>
      <style>{css}</style>

      <nav className={`lv-nav${scrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <Link to="/" className="lv-logo">
          <img src="/propzo.jpg" alt="PropZo" className="lv-logo-img" />
          <div className="lv-logo-text">
            Prop<span>Zo</span>
          </div>
        </Link>

        {/* Center links */}
        <div className="lv-menu">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`lv-nav-link${location.pathname === to ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="lv-nav-right">

          {user ? (
            <>
              {/* Notification bell */}
              <div className="lv-notif-wrap" ref={notifRef}>
                <button className="lv-notif-btn" onClick={() => setNotifOpen(o => !o)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && <span className="lv-notif-badge">{unreadCount}</span>}
                </button>

                {notifOpen && (
                  <div className="lv-notif-panel">
                    <div className="lv-notif-head">
                      <span className="lv-notif-head-title">Notifications</span>
                      <button className="lv-notif-mark-btn" onClick={handleMarkAllRead}>Mark all read</button>
                    </div>
                    <div className="lv-notif-list">
                      {notifications.length === 0 ? (
                        <div className="lv-notif-empty">No notifications yet</div>
                      ) : notifications.map(n => (
                        <div key={n._id} className={`lv-notif-item${!n.isRead ? " unread" : ""}`} onClick={() => handleMarkRead(n)}>
                          {!n.isRead && <div className="lv-notif-unread-dot" />}
                          <div className="lv-notif-item-title">{n.title}</div>
                          <div className="lv-notif-item-msg">{n.message}</div>
                          <div className="lv-notif-item-time">
                            {new Date(n.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User pill + dropdown */}
              <div className="lv-user-wrap" ref={dropdownRef}>
                <div
                  className={`lv-user-pill${dropdownOpen ? " open" : ""}`}
                  onClick={() => setDropdownOpen(o => !o)}
                >
                  <Avatar user={user} size="sm" />
                  <span className="lv-user-name">{user.name}</span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(228,203,182,0.45)" strokeWidth="3">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {dropdownOpen && (
                  <div className="lv-dropdown">
                    <div className="lv-dropdown-hdr">
                      <span className="lv-dropdown-name">{user.name}</span>
                      <span className="lv-dropdown-email">{user.email}</span>
                    </div>

                    <Link to="/profile" className="lv-dd-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      My Profile
                    </Link>
                    <Link to="/my-bookings" className="lv-dd-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      My Bookings
                    </Link>
                    <Link to="/my-sell-properties" className="lv-dd-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                      My Listings
                    </Link>
                    <Link to="/settings" className="lv-dd-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                      Settings
                    </Link>

                    <div className="lv-dd-divider" />

                    <button onClick={handleLogout} className="lv-dd-item logout">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9" /></svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="lv-signin-btn">
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <div
            className={`lv-mobile-toggle${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen(o => !o)}
          >
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`lv-drawer${mobileOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`lv-drawer-link${location.pathname === to ? " active" : ""}`}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <>
            <Link to="/profile" className="lv-drawer-link" style={{ marginTop: 8 }}>Profile</Link>
            <Link to="/my-bookings" className="lv-drawer-link">My Bookings</Link>
            <button onClick={handleLogout} className="lv-drawer-signout">Sign Out</button>
          </>
        ) : (
          <Link to="/login" className="lv-drawer-link" style={{ color: "var(--gold)", marginTop: 8 }}>
            Sign In →
          </Link>
        )}
      </div>
    </>
  );
}
