// // import React, { useEffect, useState } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";

// // export default function Navbar() {

// //   const [user, setUser] = useState(null);

// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   /* ================= ADMIN & AGENT PAGE HIDE ================= */
// //  const hideNavbar =
// //   location.pathname.startsWith("/admin") ||
// //   location.pathname.startsWith("/agentdashboard") ||
// //   location.pathname.startsWith("/agentlogin");


// //   /* ================= LOAD USER ================= */
// //   const loadUser = () => {
// //     const authUser = JSON.parse(localStorage.getItem("authUser"));
// //     setUser(authUser);
// //   };

// //   /* ================= AUTO UPDATE ================= */
// //   useEffect(() => {
// //     loadUser();

// //     // Listen other tabs
// //     window.addEventListener("storage", loadUser);

// //     // Listen same tab (custom event)
// //     window.addEventListener("authChange", loadUser);

// //     return () => {
// //       window.removeEventListener("storage", loadUser);
// //       window.removeEventListener("authChange", loadUser);
// //     };
// //   }, []);

// //   /* ================= LOGOUT ================= */
// //   const handleLogout = () => {
// //     localStorage.removeItem("authUser");

// //     // Notify Navbar
// //     window.dispatchEvent(new Event("authChange"));

// //     alert("Logged out successfully");

// //     navigate("/login");
// //   };

// //   /* ================= HIDE NAVBAR ================= */
// //   if (hideNavbar) return null;

// //   return (
// //     <nav style={navbar}>
// //       {/* LOGO */}
// //       <div style={logoBox}>
// //         <img src="/Logo1.jpg" alt="PropoZo Logo" style={logoImg} />
// //         <span style={logoText}>PropZo</span>
// //       </div>

// //       {/* MENU */}
// //       <div style={menuBox}>
// //         <Link to="/" style={navLink}>Home</Link>
// //         <Link to="/menu" style={navLink}>Menu</Link>
// //         <Link to="/about" style={navLink}>About</Link>
// //         <Link to="/contact" style={navLink}>Contact</Link>

// //         {/* USER SECTION */}
// //         <div className="nav-item ms-lg-3">
// //           {user?.isLoggedIn ? (
// //             <div style={userBox}>
// //               <img
// //                 src={user.avatar || "https://i.pravatar.cc/40"}
// //                 alt="Profile"
// //                 style={avatar}
// //               />
// //               <span style={userName}>{user.name}</span>
// //               <button onClick={handleLogout} style={logoutBtn}>
// //                 Logout
// //               </button>
// //             </div>
// //           ) : (
// //             <Link to="/login" style={loginBtn}>
// //               LOGIN
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // /* ================= STYLES ================= */

// // const navbar = {
// //   width: "100%",
// //   height: "72px",
// //   padding: "0 20px",
// //   display: "flex",
// //   alignItems: "center",
// //   position: "fixed",
// //   top: 0,
// //   left: 0,
// //   zIndex: 100,
// //   background: "#fff",
// //   boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
// // };

// // const logoBox = {
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "12px"
// // };

// // const logoImg = {
// //   height: "100px"
// // };

// // const logoText = {
// //   fontSize: "20px",
// //   fontWeight: 700,
// //   color: "#0b2c5f"
// // };

// // const menuBox = {
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "12px",
// //   marginLeft: "auto"
// // };

// // const navLink = {
// //   textDecoration: "none",
// //   color: "#0b2c5f",
// //   fontWeight: 500,
// //   fontSize: "14px"
// // };

// // const avatar = {
// //   width: 32,
// //   height: 32,
// //   borderRadius: "50%",
// //   border: "2px solid #c9a24d"
// // };

// // const userName = {
// //   fontWeight: "600",
// //   fontSize: "13px",
// //   color: "#0b2c5f"
// // };

// // const logoutBtn = {
// //   background: "#dc2626",
// //   color: "#fff",
// //   border: "none",
// //   padding: "5px 10px",
// //   borderRadius: "15px",
// //   cursor: "pointer",
// //   fontSize: "12px"
// // };

// // const userBox = {
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "10px",
// //   background: "#f1f5f9",
// //   padding: "4px 10px",
// //   borderRadius: "20px"
// // };

// // const loginBtn = {
// //   padding: "6px 18px",
// //   borderRadius: "20px",
// //   border: "1px solid #0b2c5f",
// //   textDecoration: "none",
// //   color: "#0b2c5f",
// //   fontWeight: 600
// // };
// import React, { useEffect, useState, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

//   :root {
//     --ink: #0a0c09;
//     --cream: #f5f0e8;
//     --gold: #b8965a;
//     --gold-light: #d4b483;
//     --muted: #7a7670;
//     --border: rgba(184,150,90,0.18);
//     --nav-bg: rgba(10,12,9,0.88);
//   }

//   .pz-nav {
//     position: fixed;
//     top: 0; left: 0; right: 0;
//     z-index: 1000;
//     height: 72px;
//     display: flex;
//     align-items: center;
//     padding: 0 48px;
//     backdrop-filter: blur(18px);
//     -webkit-backdrop-filter: blur(18px);
//     background: var(--nav-bg);
//     border-bottom: 1px solid var(--border);
//     font-family: 'DM Sans', sans-serif;
//     transition: all 0.4s ease;
//   }

//   .pz-nav.scrolled {
//     height: 62px;
//     background: rgba(10,12,9,0.97);
//     box-shadow: 0 8px 40px rgba(0,0,0,0.4);
//   }

//   @media (max-width: 768px) {
//     .pz-nav { padding: 0 24px; }
//     .pz-menu { display: none; }
//     .pz-mobile-toggle { display: flex !important; }
//   }

//   /* ── Logo ── */
//   .pz-logo {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     text-decoration: none;
//     flex-shrink: 0;
//   }
// .pz-logo-img {
//   height: 60px;
//   width: 60px;
//   object-fit: cover;
//   border-radius: 50%;
//   border: 2px solid var(--gold);
//   box-shadow: 0 4px 15px rgba(184,150,90,0.4);
// }
//   .pz-logo-wordmark {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 26px;
//     font-weight: 600;
//     color: var(--cream);
//     letter-spacing: -0.01em;
//     line-height: 1;
//   }

//   .pz-logo-wordmark span {
//     color: var(--gold);
//   }

//   .pz-logo-sub {
//     font-size: 8px;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: var(--muted);
//     font-weight: 400;
//     display: block;
//     margin-top: -2px;
//   }

//   /* ── Nav links ── */
//   .pz-menu {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     margin: 0 auto;
//   }

//   .pz-nav-link {
//     position: relative;
//     padding: 8px 16px;
//     font-size: 12px;
//     font-weight: 400;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: var(--muted);
//     text-decoration: none;
//     border-radius: 2px;
//     transition: color 0.25s ease;
//   }

//   .pz-nav-link::after {
//     content: '';
//     position: absolute;
//     bottom: 4px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 0;
//     height: 1px;
//     background: var(--gold);
//     transition: width 0.3s ease;
//   }

//   .pz-nav-link:hover { color: var(--cream); }
//   .pz-nav-link:hover::after { width: calc(100% - 32px); }

//   .pz-nav-link.active {
//     color: var(--gold-light);
//   }
//   .pz-nav-link.active::after {
//     width: calc(100% - 32px);
//     background: var(--gold);
//   }

//   /* ── Right side ── */
//   .pz-nav-right {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     flex-shrink: 0;
//   }

//   /* User pill */
//   .pz-user-pill {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 6px 14px 6px 8px;
//     border: 1px solid var(--border);
//     border-radius: 40px;
//     background: rgba(184,150,90,0.05);
//     cursor: default;
//     transition: all 0.25s ease;
//   }

//   .pz-user-pill:hover {
//     border-color: var(--gold);
//     background: rgba(184,150,90,0.1);
//   }

//   .pz-avatar {
//     width: 28px;
//     height: 28px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 1px solid var(--gold);
//   }

//   .pz-user-name {
//     font-size: 12px;
//     font-weight: 400;
//     color: var(--cream);
//     letter-spacing: 0.04em;
//     max-width: 100px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }

//   .pz-logout-btn {
//     background: none;
//     border: none;
//     padding: 0;
//     cursor: pointer;
//     color: var(--muted);
//     display: flex;
//     align-items: center;
//     transition: color 0.2s;
//   }

//   .pz-logout-btn:hover { color: #ef4444; }

//   /* Login button */
//   .pz-login-btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 10px 24px;
//     border: 1px solid var(--border);
//     border-radius: 2px;
//     background: transparent;
//     color: var(--cream);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 400;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     text-decoration: none;
//     transition: all 0.25s ease;
//     position: relative;
//     overflow: hidden;
//   }

//   .pz-login-btn::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: var(--gold);
//     transform: translateX(-101%);
//     transition: transform 0.35s cubic-bezier(0.76,0,0.24,1);
//   }

//   .pz-login-btn:hover { color: var(--ink); border-color: var(--gold); }
//   .pz-login-btn:hover::before { transform: translateX(0); }

//   .pz-login-btn span { position: relative; z-index: 1; }

//   /* Mobile toggle */
//   .pz-mobile-toggle {
//     display: none;
//     flex-direction: column;
//     gap: 5px;
//     cursor: pointer;
//     padding: 4px;
//     margin-left: auto;
//   }

//   .pz-mobile-toggle span {
//     display: block;
//     width: 22px;
//     height: 1px;
//     background: var(--cream);
//     transition: all 0.3s ease;
//     transform-origin: center;
//   }

//   .pz-mobile-toggle.open span:nth-child(1) {
//     transform: translateY(6px) rotate(45deg);
//   }
//   .pz-mobile-toggle.open span:nth-child(2) {
//     opacity: 0;
//   }
//   .pz-mobile-toggle.open span:nth-child(3) {
//     transform: translateY(-6px) rotate(-45deg);
//   }

//   /* Mobile drawer */
//   .pz-mobile-drawer {
//     position: fixed;
//     top: 72px;
//     left: 0; right: 0;
//     background: rgba(10,12,9,0.98);
//     border-bottom: 1px solid var(--border);
//     backdrop-filter: blur(20px);
//     padding: 24px 32px;
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//     z-index: 999;
//     transform: translateY(-20px);
//     opacity: 0;
//     pointer-events: none;
//     transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
//     font-family: 'DM Sans', sans-serif;
//   }

//   .pz-mobile-drawer.open {
//     transform: translateY(0);
//     opacity: 1;
//     pointer-events: all;
//   }

//   .pz-mobile-link {
//     font-size: 13px;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: var(--muted);
//     text-decoration: none;
//     padding: 14px 0;
//     border-bottom: 1px solid rgba(184,150,90,0.08);
//     transition: color 0.2s;
//   }

//   .pz-mobile-link:hover, .pz-mobile-link.active { color: var(--gold-light); }

//   /* Divider dot in logo */
//   .pz-logo-divider {
//     width: 3px; height: 3px;
//     background: var(--gold);
//     border-radius: 50%;
//     margin: 0 2px;
//     display: inline-block;
//     vertical-align: middle;
//   }
// `;

// const NAV_LINKS = [
//   { to: "/",       label: "Home"    },
//   { to: "/menu",   label: "Menu"    },
//   { to: "/about",  label: "About"   },
//   { to: "/contact",label: "Contact" },
// ];

// export default function Navbar() {
//   const [user, setUser]           = useState(null);
//   const [scrolled, setScrolled]   = useState(false);
//   const [mobileOpen, setMobile]   = useState(false);
//   const location  = useLocation();
//   const navigate  = useNavigate();

//   const hideNavbar =
//     location.pathname.startsWith("/admin") ||
//     location.pathname.startsWith("/agentdashboard") ||
//     location.pathname.startsWith("/agentlogin");

//   /* ── Load user ── */
//   const loadUser = () => {
//     const u = JSON.parse(localStorage.getItem("authUser"));
//     setUser(u);
//   };

//   useEffect(() => {
//     loadUser();
//     window.addEventListener("storage", loadUser);
//     window.addEventListener("authChange", loadUser);
//     return () => {
//       window.removeEventListener("storage", loadUser);
//       window.removeEventListener("authChange", loadUser);
//     };
//   }, []);

//   /* ── Scroll shrink ── */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* ── Close mobile on route change ── */
//   useEffect(() => { setMobile(false); }, [location]);

//   /* ── Logout ── */
//   const handleLogout = () => {
//     localStorage.removeItem("authUser");
//     window.dispatchEvent(new Event("authChange"));
//     navigate("/login");
//   };

//   if (hideNavbar) return null;

//   return (
//     <>
//       <style>{css}</style>

//       <nav className={`pz-nav${scrolled ? " scrolled" : ""}`}>

//         {/* Logo */}
//         <Link to="/" className="pz-logo">
//           <img src="/propzo.png" alt="PropZo" className="pz-logo-img" />
//           <div>
//             <span className="pz-logo-wordmark">Prop<span>Zo</span></span>
//             <span className="pz-logo-sub">Premium Real Estate</span>
//           </div>
//         </Link>

//         {/* Desktop menu */}
//         <div className="pz-menu">
//           {NAV_LINKS.map(({ to, label }) => (
//             <Link
//               key={to}
//               to={to}
//               className={`pz-nav-link${location.pathname === to ? " active" : ""}`}
//             >
//               {label}
//             </Link>
//           ))}
//         </div>

//         {/* Right section */}
//         <div className="pz-nav-right">
//           {user?.isLoggedIn ? (
//             <div className="pz-user-pill">
//               <img
//                 src={user.avatar || "https://i.pravatar.cc/40"}
//                 alt="Avatar"
//                 className="pz-avatar"
//               />
//               <span className="pz-user-name">{user.name}</span>
//               <button
//                 className="pz-logout-btn"
//                 onClick={handleLogout}
//                 title="Sign out"
//               >
//                 {/* X icon */}
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M18 6L6 18M6 6l12 12"/>
//                 </svg>
//               </button>
//             </div>
//           ) : (
//             <Link to="/login" className="pz-login-btn">
//               <span>Sign In</span>
//             </Link>
//           )}

//           {/* Mobile hamburger */}
//           <div
//             className={`pz-mobile-toggle${mobileOpen ? " open" : ""}`}
//             onClick={() => setMobile((p) => !p)}
//           >
//             <span /><span /><span />
//           </div>
//         </div>
//       </nav>

//       {/* Mobile drawer */}
//       <div className={`pz-mobile-drawer${mobileOpen ? " open" : ""}`}>
//         {NAV_LINKS.map(({ to, label }) => (
//           <Link
//             key={to}
//             to={to}
//             className={`pz-mobile-link${location.pathname === to ? " active" : ""}`}
//           >
//             {label}
//           </Link>
//         ))}
//         {user?.isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             style={{
//               marginTop: 12,
//               background: "none",
//               border: "1px solid rgba(239,68,68,0.3)",
//               borderRadius: 2,
//               color: "#ef4444",
//               fontSize: 11,
//               letterSpacing: "0.14em",
//               textTransform: "uppercase",
//               padding: "12px 0",
//               cursor: "pointer",
//               fontFamily: "DM Sans, sans-serif",
//             }}
//           >
//             Sign Out
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             className="pz-mobile-link"
//             style={{ color: "var(--gold-light)", marginTop: 8 }}
//           >
//             Sign In →
//           </Link>
//         )}
//       </div>
//     </>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Navbar() {

//   const [user, setUser] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   /* ================= ADMIN & AGENT PAGE HIDE ================= */
//  const hideNavbar =
//   location.pathname.startsWith("/admin") ||
//   location.pathname.startsWith("/agentdashboard") ||
//   location.pathname.startsWith("/agentlogin");


//   /* ================= LOAD USER ================= */
//   const loadUser = () => {
//     const authUser = JSON.parse(localStorage.getItem("authUser"));
//     setUser(authUser);
//   };

//   /* ================= AUTO UPDATE ================= */
//   useEffect(() => {
//     loadUser();

//     // Listen other tabs
//     window.addEventListener("storage", loadUser);

//     // Listen same tab (custom event)
//     window.addEventListener("authChange", loadUser);

//     return () => {
//       window.removeEventListener("storage", loadUser);
//       window.removeEventListener("authChange", loadUser);
//     };
//   }, []);

//   /* ================= LOGOUT ================= */
//   const handleLogout = () => {
//     localStorage.removeItem("authUser");

//     // Notify Navbar
//     window.dispatchEvent(new Event("authChange"));

//     alert("Logged out successfully");

//     navigate("/login");
//   };

//   /* ================= HIDE NAVBAR ================= */
//   if (hideNavbar) return null;

//   return (
//     <nav style={navbar}>
//       {/* LOGO */}
//       <div style={logoBox}>
//         <img src="/Logo1.jpg" alt="PropoZo Logo" style={logoImg} />
//         <span style={logoText}>PropZo</span>
//       </div>

//       {/* MENU */}
//       <div style={menuBox}>
//         <Link to="/" style={navLink}>Home</Link>
//         <Link to="/menu" style={navLink}>Menu</Link>
//         <Link to="/about" style={navLink}>About</Link>
//         <Link to="/contact" style={navLink}>Contact</Link>

//         {/* USER SECTION */}
//         <div className="nav-item ms-lg-3">
//           {user?.isLoggedIn ? (
//             <div style={userBox}>
//               <img
//                 src={user.avatar || "https://i.pravatar.cc/40"}
//                 alt="Profile"
//                 style={avatar}
//               />
//               <span style={userName}>{user.name}</span>
//               <button onClick={handleLogout} style={logoutBtn}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link to="/login" style={loginBtn}>
//               LOGIN
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// /* ================= STYLES ================= */

// const navbar = {
//   width: "100%",
//   height: "72px",
//   padding: "0 20px",
//   display: "flex",
//   alignItems: "center",
//   position: "fixed",
//   top: 0,
//   left: 0,
//   zIndex: 100,
//   background: "#fff",
//   boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
// };

// const logoBox = {
//   display: "flex",
//   alignItems: "center",
//   gap: "12px"
// };

// const logoImg = {
//   height: "100px"
// };

// const logoText = {
//   fontSize: "20px",
//   fontWeight: 700,
//   color: "#0b2c5f"
// };

// const menuBox = {
//   display: "flex",
//   alignItems: "center",
//   gap: "12px",
//   marginLeft: "auto"
// };

// const navLink = {
//   textDecoration: "none",
//   color: "#0b2c5f",
//   fontWeight: 500,
//   fontSize: "14px"
// };

// const avatar = {
//   width: 32,
//   height: 32,
//   borderRadius: "50%",
//   border: "2px solid #c9a24d"
// };

// const userName = {
//   fontWeight: "600",
//   fontSize: "13px",
//   color: "#0b2c5f"
// };

// const logoutBtn = {
//   background: "#dc2626",
//   color: "#fff",
//   border: "none",
//   padding: "5px 10px",
//   borderRadius: "15px",
//   cursor: "pointer",
//   fontSize: "12px"
// };

// const userBox = {
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   background: "#f1f5f9",
//   padding: "4px 10px",
//   borderRadius: "20px"
// };

// const loginBtn = {
//   padding: "6px 18px",
//   borderRadius: "20px",
//   border: "1px solid #0b2c5f",
//   textDecoration: "none",
//   color: "#0b2c5f",
//   fontWeight: 600
// };
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../Common/Avatar";
import { useAuth } from "../../context/AuthContext";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #0a0c09;
    --cream: #f5f0e8;
    --gold: #b8965a;
    --gold-light: #d4b483;
    --muted: #7a7670;
    --border: rgba(184,150,90,0.18);
    --nav-bg: rgba(10,12,9,0.88);
  }

  .pz-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 72px;
    display: flex;
    align-items: center;
    padding: 0 48px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    font-family: 'DM Sans', sans-serif;
    transition: all 0.4s ease;
  }

  .pz-nav.scrolled {
    height: 62px;
    background: rgba(10,12,9,0.97);
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }

  @media (max-width: 768px) {
    .pz-nav { padding: 0 24px; }
    .pz-menu { display: none; }
    .pz-mobile-toggle { display: flex !important; }
  }

  /* ── Logo ── */
  .pz-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }
.pz-logo-img {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--gold);
  box-shadow: 0 4px 15px rgba(184,150,90,0.4);
}
  .pz-logo-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--cream);
    letter-spacing: -0.01em;
    line-height: 1;
  }

  .pz-logo-wordmark span {
    color: var(--gold);
  }

  .pz-logo-sub {
    font-size: 8px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 400;
    display: block;
    margin-top: -2px;
  }

  /* ── Nav links ── */
  .pz-menu {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0 auto;
  }

  .pz-nav-link {
    position: relative;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    border-radius: 2px;
    transition: color 0.25s ease;
  }

  .pz-nav-link::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width 0.3s ease;
  }

  .pz-nav-link:hover { color: var(--cream); }
  .pz-nav-link:hover::after { width: calc(100% - 32px); }

  .pz-nav-link.active {
    color: var(--gold-light);
  }
  .pz-nav-link.active::after {
    width: calc(100% - 32px);
    background: var(--gold);
  }

  /* ── Right side ── */
  .pz-nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  /* User pill */
  .pz-user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px 6px 8px;
    border: 1px solid var(--border);
    border-radius: 40px;
    background: rgba(184,150,90,0.05);
    cursor: default;
    transition: all 0.25s ease;
  }

  .pz-user-pill:hover {
    border-color: var(--gold);
    background: rgba(184,150,90,0.1);
  }

  .pz-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--gold);
  }

  .pz-user-name {
    font-size: 12px;
    font-weight: 400;
    color: var(--cream);
    letter-spacing: 0.04em;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pz-logout-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--muted);
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .pz-logout-btn:hover { color: #ef4444; }

  /* Login button */
  .pz-login-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border: 1px solid var(--border);
    border-radius: 2px;
    background: transparent;
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .pz-login-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.35s cubic-bezier(0.76,0,0.24,1);
  }

  .pz-login-btn:hover { color: var(--ink); border-color: var(--gold); }
  .pz-login-btn:hover::before { transform: translateX(0); }

  .pz-login-btn span { position: relative; z-index: 1; }

  /* Mobile toggle */
  .pz-mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
  }

  .pz-mobile-toggle span {
    display: block;
    width: 22px;
    height: 1px;
    background: var(--cream);
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .pz-mobile-toggle.open span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }
  .pz-mobile-toggle.open span:nth-child(2) {
    opacity: 0;
  }
  .pz-mobile-toggle.open span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  /* Mobile drawer */
  .pz-mobile-drawer {
    position: fixed;
    top: 72px;
    left: 0; right: 0;
    background: rgba(10,12,9,0.98);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px);
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 999;
    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    font-family: 'DM Sans', sans-serif;
  }

  .pz-mobile-drawer.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .pz-mobile-link {
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    padding: 14px 0;
    border-bottom: 1px solid rgba(184,150,90,0.08);
    transition: color 0.2s;
  }

  .pz-mobile-link:hover, .pz-mobile-link.active { color: var(--gold-light); }

  /* ── Divider dot in logo ── */
  .pz-logo-divider {
    width: 3px; height: 3px;
    background: var(--gold);
    border-radius: 50%;
    margin: 0 2px;
    display: inline-block;
    vertical-align: middle;
  }

  /* ── User Dropdown ── */
  .pz-user-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .pz-user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px 6px 8px;
    border: 1px solid var(--border);
    border-radius: 40px;
    background: rgba(184,150,90,0.05);
    cursor: pointer;
    transition: all 0.25s ease;
    user-select: none;
  }

  .pz-user-pill:hover, .pz-user-pill.active {
    border-color: var(--gold);
    background: rgba(184,150,90,0.1);
  }

  .pz-dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 220px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    border: 1px solid #e2e8f0;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 1100;
    transform-origin: top right;
    animation: pz-dropdown-in 0.2s ease-out;
  }

  @keyframes pz-dropdown-in {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .pz-dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    text-decoration: none;
    color: #475569;
    font-size: 13px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .pz-dropdown-item:hover {
    background: #f1f5f9;
    color: var(--gold);
  }

  .pz-dropdown-item svg {
    font-size: 16px;
    width: 16px;
    height: 16px;
    color: var(--gold);
  }

  .pz-dropdown-divider {
    height: 1px;
    background: #f1f5f9;
    margin: 4px 8px;
  }

  .pz-dropdown-header {
    padding: 8px 12px 12px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 4px;
  }

  .pz-dropdown-name {
    display: block;
    font-weight: 700;
    color: #0f172a;
    font-size: 14px;
  }

  .pz-dropdown-email {
    display: block;
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }

  .pz-logout-item {
    color: #ef4444;
  }

  .pz-logout-item:hover {
    background: #fef2f2;
    color: #ef4444;
  }
`;

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { auth: user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/agentdashboard") ||
    location.pathname.startsWith("/agentlogin");

  const fetchNotifications = async (token) => {
    try {
      const res = await axios.get("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Fetch Notifs Error:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchNotifications(user.token);
    } else {
      setNotifications([]);
    }
  }, [user]);

  /* ===== Scroll shrink ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== Close mobile on route change ===== */
  useEffect(() => {
    setMobile(false);
    setDropdownOpen(false);
  }, [location]);

  /* ===== Click outside to close dropdown ===== */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===== Logout ===== */
  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    navigate("/login");
  };


  const handleMarkAllRead = async () => {
    try {
      // We'll update them locally and sequentially for now
      const unread = notifications.filter(n => !n.isRead);
      for (const n of unread) {
        axios.put(`/api/notifications/${n._id}/read`, {}, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Mark All Read Error:", err);
    }
  };

  const handleMarkRead = async (notif) => {
    try {
      if (!notif.isRead) {
        await axios.put(`/api/notifications/${notif._id}/read`, {}, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setNotifications(notifications.map(n => n._id === notif._id ? { ...n, isRead: true } : n));
      }
      if (notif.link) {
        navigate(notif.link);
        setNotifOpen(false);
      }
    } catch (err) {
      console.error("Mark Read Error:", err);
    }
  };

  if (hideNavbar) return null;

  return (
    <>
      <style>{css}</style>

      <nav className={`pz-nav${scrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <Link to="/" className="pz-logo">
          <img src="/propzo.png" alt="PropZo" className="pz-logo-img" />
          <div>
            <span className="pz-logo-wordmark">
              Prop<span>Zo</span>
            </span>
            <span className="pz-logo-sub">
              Premium Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="pz-menu">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`pz-nav-link${location.pathname === to ? " active" : ""
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="pz-nav-right">
          {user ? (
            <>
              {/* Notifications Bell */}
              <div className="pz-notif-container" ref={notifRef} style={{ position: 'relative', marginRight: '15px' }}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    color: scrolled ? '#1e293b' : '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    borderRadius: '50%',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#ef4444',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '2px 5px',
                      borderRadius: '10px',
                      border: '2px solid white',
                      lineHeight: '1'
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '320px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    marginTop: '10px',
                    zIndex: 1000,
                    overflow: 'hidden',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{ padding: '15px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: '#1e293b' }}>Notifications</span>
                      <button
                        onClick={handleMarkAllRead}
                        style={{ fontSize: '11px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        Mark all read
                      </button>
                    </div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n._id}
                            onClick={() => handleMarkRead(n)}
                            style={{
                              padding: '15px',
                              borderBottom: '1px solid #f8fafc',
                              background: n.isRead ? 'transparent' : 'rgba(59, 130, 246, 0.04)',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              position: 'relative'
                            }}
                          >
                            {!n.isRead && (
                              <div style={{ position: 'absolute', left: '6px', top: '20px', width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }} />
                            )}
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{n.title}</div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{n.message}</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px' }}>
                              {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="pz-user-container" ref={dropdownRef}>
                <div
                  className={`pz-user-pill${dropdownOpen ? " active" : ""}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Avatar user={user} size="sm" />
                  <span className="pz-user-name">
                    {user.name}
                  </span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.5, marginLeft: 2 }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {dropdownOpen && (
                  <div className="pz-dropdown-menu">
                    <div className="pz-dropdown-header">
                      <span className="pz-dropdown-name">{user.name}</span>
                      <span className="pz-dropdown-email">{user.email}</span>
                    </div>

                    <Link to="/profile" className="pz-dropdown-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      My Profile
                    </Link>
                    <Link to="/my-bookings" className="pz-dropdown-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      My Bookings
                    </Link>
                    <Link to="/my-sell-properties" className="pz-dropdown-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                      My Sell Properties
                    </Link>
                    <Link to="/settings" className="pz-dropdown-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                      Settings
                    </Link>

                    <div className="pz-dropdown-divider"></div>

                    <button onClick={handleLogout} className="pz-dropdown-item pz-logout-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9" /></svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="pz-login-btn">
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Toggle */}
          <div
            className={`pz-mobile-toggle${mobileOpen ? " open" : ""}`}
            onClick={() => setMobile((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`pz-mobile-drawer${mobileOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`pz-mobile-link${location.pathname === to ? " active" : ""
              }`}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <>
            <Link
              to="/profile"
              className="pz-mobile-link"
              style={{ marginTop: 12 }}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                marginTop: 12,
                background: "none",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 2,
                color: "#ef4444",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "12px 0",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="pz-mobile-link"
            style={{ color: "var(--gold-light)", marginTop: 8 }}
          >
            Sign In →
          </Link>
        )}
      </div>
    </>
  );
}