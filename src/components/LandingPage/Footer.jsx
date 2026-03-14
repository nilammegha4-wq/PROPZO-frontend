// // // // import React, { useState } from "react";
// // // // import { useLocation } from "react-router-dom";

// // // // export default function Footer() {
// // // //   const location = useLocation();

// // // //   /* ================= HIDE ON ADMIN & AGENT ================= */
// // // //   const hideFooter =
// // // //   location.pathname.startsWith("/admin") ||
// // // //   location.pathname.startsWith("/agentdashboard") ||
// // // //   location.pathname.startsWith("/agentlogin");

// // // // if (hideFooter) return null;

// // // //   return (
// // // //     <footer style={footerContainer}>
// // // //       <div style={footerGrid}>

// // // //         {/* Brand */}
// // // //         <div>
// // // //           <h3 style={brandTitle}>PropZo</h3>
// // // //           <p style={sectionText}>
// // // //             Discover premium properties with verified listings, trusted agents, and seamless browsing. Your dream home awaits.
// // // //           </p>
// // // //         </div>

// // // //         {/* Services */}
// // // //         <div>
// // // //           <h4 style={sectionTitle}>Services</h4>
// // // //           <ul style={linkList}>
// // // //             {["Buying", "Selling", "Renting", "Property Management"].map((service) => (
// // // //               <FooterLink key={service} label={service} />
// // // //             ))}
// // // //           </ul>
// // // //         </div>

// // // //         {/* Contact Info */}
// // // //         <div>
// // // //           <h4 style={sectionTitle}>Contact</h4>
// // // //           <p style={sectionText}>📍 Mumbai, India</p>
// // // //           <p style={sectionText}>📞 +91 98765 43210</p>
// // // //           <p style={sectionText}>✉ info@propzo.com</p>
// // // //         </div>

// // // //         {/* Social Connect */}
// // // //         <div>
// // // //           <h4 style={sectionTitle}>Connect</h4>
// // // //           <div style={socialRow}>
// // // //             <SocialIcon icon="🌐" name="Website" gradient="linear-gradient(45deg,#0d9488,#3b82f6)" />
// // // //             <SocialIcon icon="📘" name="Facebook" gradient="linear-gradient(45deg,#3b82f6,#0d9488)" />
// // // //             <SocialIcon icon="📸" name="Instagram" gradient="linear-gradient(45deg,#f472b6,#facc15)" />
// // // //             <SocialIcon icon="🐦" name="Twitter" gradient="linear-gradient(45deg,#0ea5e9,#3b82f6)" />
// // // //           </div>
// // // //         </div>

// // // //       </div>

// // // //       <div style={divider} />

// // // //       <p style={copyright}>
// // // //         © {new Date().getFullYear()} PropZo. All rights reserved.
// // // //       </p>
// // // //     </footer>
// // // //   );
// // // // }

// // // // /* ================= COMPONENTS ================= */

// // // // function FooterLink({ label }) {
// // // //   return (
// // // //     <li style={{ marginBottom: 10 }}>
// // // //       <a href="#" style={link}>
// // // //         {label}
// // // //       </a>
// // // //     </li>
// // // //   );
// // // // }

// // // // function SocialIcon({ icon, name, gradient }) {
// // // //   const [hover, setHover] = useState(false);

// // // //   return (
// // // //     <a
// // // //       href="#"
// // // //       style={{
// // // //         ...socialItem,
// // // //         background: hover ? gradient : "#3a4b5c", // soft dark blue-gray
// // // //         color: hover ? "#fff" : "#e0e0e0",
// // // //         transform: hover ? "translateY(-5px)" : "translateY(0)",
// // // //         boxShadow: hover
// // // //           ? "0 8px 20px rgba(0,0,0,0.35)"
// // // //           : "0 2px 6px rgba(0,0,0,0.15)",
// // // //       }}
// // // //       onMouseEnter={() => setHover(true)}
// // // //       onMouseLeave={() => setHover(false)}
// // // //     >
// // // //       <span style={socialEmoji}>{icon}</span>
// // // //       <span style={socialName}>{name}</span>
// // // //     </a>
// // // //   );
// // // // }

// // // // /* ================= STYLES ================= */

// // // // const footerContainer = {
// // // //   background: "#2b3a4c", // balanced light-dark color
// // // //   padding: "60px 20px 30px",
// // // //   fontFamily: "Poppins, sans-serif",
// // // //   color: "#e0e0e0",
// // // // };

// // // // const footerGrid = {
// // // //   display: "grid",
// // // //   gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// // // //   gap: 30,
// // // //   maxWidth: 1200,
// // // //   margin: "0 auto",
// // // // };

// // // // const brandTitle = {
// // // //   fontSize: 26,
// // // //   fontWeight: 700,
// // // //   marginBottom: 12,
// // // //   background: "linear-gradient(90deg,#0d9488,#3b82f6)",
// // // //   WebkitBackgroundClip: "text",
// // // //   WebkitTextFillColor: "transparent",
// // // // };

// // // // const sectionTitle = {
// // // //   fontSize: 18,
// // // //   fontWeight: 600,
// // // //   marginBottom: 12,
// // // //   background: "linear-gradient(90deg,#0d9488,#3b82f6)",
// // // //   WebkitBackgroundClip: "text",
// // // //   WebkitTextFillColor: "transparent",
// // // // };

// // // // const sectionText = {
// // // //   fontSize: 14,
// // // //   lineHeight: 1.7,
// // // //   color: "#e0e0e0",
// // // // };

// // // // const linkList = {
// // // //   listStyle: "none",
// // // //   padding: 0,
// // // //   margin: 0,
// // // // };

// // // // const link = {
// // // //   position: "relative",
// // // //   fontSize: 14,
// // // //   color: "#e0e0e0",
// // // //   textDecoration: "none",
// // // //   display: "inline-block",
// // // //   paddingBottom: 2,
// // // //   cursor: "pointer",
// // // //   transition: "all 0.3s ease",
// // // //   backgroundImage: "linear-gradient(90deg,#0d9488,#3b82f6)",
// // // //   backgroundSize: "0% 2px",
// // // //   backgroundRepeat: "no-repeat",
// // // //   backgroundPosition: "left bottom",
// // // //   WebkitBackgroundClip: "text",
// // // //   WebkitTextFillColor: "currentcolor",
// // // // };

// // // // const socialRow = {
// // // //   display: "flex",
// // // //   gap: 12,
// // // //   flexWrap: "wrap",
// // // //   marginTop: 8,
// // // // };

// // // // const socialItem = {
// // // //   display: "flex",
// // // //   alignItems: "center",
// // // //   justifyContent: "center",
// // // //   gap: 8,
// // // //   padding: "10px 16px",
// // // //   borderRadius: 50, // circular badges
// // // //   textDecoration: "none",
// // // //   fontWeight: 500,
// // // //   cursor: "pointer",
// // // //   transition: "all 0.3s ease",
// // // // };

// // // // const socialEmoji = {
// // // //   fontSize: 18,
// // // // };

// // // // const socialName = {
// // // //   fontSize: 14,
// // // // };

// // // // const divider = {
// // // //   height: 1,
// // // //   backgroundColor: "#3a4b5c",
// // // //   margin: "40px auto 20px",
// // // //   maxWidth: 1200,
// // // // };

// // // // const copyright = {
// // // //   textAlign: "center",
// // // //   fontSize: 13,
// // // //   color: "#b0b0b0",
// // // // };




// // // import React, { useState } from "react";
// // // import { useLocation } from "react-router-dom";

// // // const styles = `
// // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

// // //   :root {
// // //     --ink: #0c0f0a;
// // //     --cream: #f5f0e8;
// // //     --gold: #b8965a;
// // //     --gold-light: #d4b483;
// // //     --muted: #7a7670;
// // //     --border: rgba(184,150,90,0.2);
// // //     --hover-bg: rgba(184,150,90,0.06);
// // //   }

// // //   .pz-footer {
// // //     background: var(--ink);
// // //     font-family: 'DM Sans', sans-serif;
// // //     color: var(--cream);
// // //     padding: 80px 0 0;
// // //     position: relative;
// // //     overflow: hidden;
// // //   }

// // //   .pz-footer::before {
// // //     content: 'PROPZO';
// // //     position: absolute;
// // //     top: -30px;
// // //     left: -20px;
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: clamp(120px, 18vw, 220px);
// // //     font-weight: 600;
// // //     color: rgba(255,255,255,0.025);
// // //     letter-spacing: -0.02em;
// // //     pointer-events: none;
// // //     user-select: none;
// // //     line-height: 1;
// // //   }

// // //   .pz-footer-inner {
// // //     max-width: 1240px;
// // //     margin: 0 auto;
// // //     padding: 0 40px;
// // //     position: relative;
// // //     z-index: 1;
// // //   }

// // //   .pz-footer-top {
// // //     display: grid;
// // //     grid-template-columns: 1.6fr 1fr 1fr 1fr;
// // //     gap: 60px;
// // //     padding-bottom: 60px;
// // //     border-bottom: 1px solid var(--border);
// // //   }

// // //   @media (max-width: 900px) {
// // //     .pz-footer-top {
// // //       grid-template-columns: 1fr 1fr;
// // //       gap: 40px;
// // //     }
// // //   }

// // //   @media (max-width: 560px) {
// // //     .pz-footer-top {
// // //       grid-template-columns: 1fr;
// // //     }
// // //     .pz-footer-inner { padding: 0 24px; }
// // //   }

// // //   .pz-brand-name {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 42px;
// // //     font-weight: 600;
// // //     letter-spacing: -0.02em;
// // //     line-height: 1;
// // //     color: var(--cream);
// // //     margin: 0 0 6px;
// // //   }

// // //   .pz-brand-tagline {
// // //     font-size: 11px;
// // //     letter-spacing: 0.18em;
// // //     text-transform: uppercase;
// // //     color: var(--gold);
// // //     margin: 0 0 20px;
// // //     font-weight: 400;
// // //   }

// // //   .pz-brand-desc {
// // //     font-size: 14px;
// // //     line-height: 1.8;
// // //     color: var(--muted);
// // //     margin: 0 0 28px;
// // //     font-weight: 300;
// // //     max-width: 300px;
// // //   }

// // //   .pz-badge {
// // //     display: inline-flex;
// // //     align-items: center;
// // //     gap: 8px;
// // //     padding: 8px 16px;
// // //     border: 1px solid var(--border);
// // //     border-radius: 2px;
// // //     font-size: 12px;
// // //     color: var(--gold);
// // //     letter-spacing: 0.08em;
// // //   }

// // //   .pz-badge-dot {
// // //     width: 6px;
// // //     height: 6px;
// // //     background: var(--gold);
// // //     border-radius: 50%;
// // //     animation: pz-pulse 2s ease-in-out infinite;
// // //   }

// // //   @keyframes pz-pulse {
// // //     0%, 100% { opacity: 1; transform: scale(1); }
// // //     50% { opacity: 0.4; transform: scale(0.8); }
// // //   }

// // //   .pz-col-title {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 13px;
// // //     font-weight: 400;
// // //     letter-spacing: 0.2em;
// // //     text-transform: uppercase;
// // //     color: var(--gold);
// // //     margin: 0 0 24px;
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 10px;
// // //   }

// // //   .pz-col-title::after {
// // //     content: '';
// // //     flex: 1;
// // //     height: 1px;
// // //     background: var(--border);
// // //     display: block;
// // //   }

// // //   .pz-link-list {
// // //     list-style: none;
// // //     padding: 0;
// // //     margin: 0;
// // //     display: flex;
// // //     flex-direction: column;
// // //     gap: 2px;
// // //   }

// // //   .pz-link-item a {
// // //     display: block;
// // //     padding: 9px 12px;
// // //     font-size: 14px;
// // //     color: var(--muted);
// // //     text-decoration: none;
// // //     font-weight: 300;
// // //     letter-spacing: 0.01em;
// // //     border-radius: 2px;
// // //     transition: all 0.2s ease;
// // //     margin: 0 -12px;
// // //   }

// // //   .pz-link-item a:hover {
// // //     color: var(--cream);
// // //     background: var(--hover-bg);
// // //     padding-left: 20px;
// // //   }

// // //   .pz-contact-item {
// // //     display: flex;
// // //     align-items: flex-start;
// // //     gap: 12px;
// // //     padding: 10px 0;
// // //     border-bottom: 1px solid rgba(255,255,255,0.04);
// // //   }

// // //   .pz-contact-item:last-child { border-bottom: none; }

// // //   .pz-contact-icon {
// // //     width: 30px;
// // //     height: 30px;
// // //     border: 1px solid var(--border);
// // //     border-radius: 2px;
// // //     display: flex;
// // //     align-items: center;
// // //     justify-content: center;
// // //     font-size: 12px;
// // //     flex-shrink: 0;
// // //     color: var(--gold);
// // //     margin-top: 1px;
// // //   }

// // //   .pz-contact-label {
// // //     font-size: 10px;
// // //     letter-spacing: 0.12em;
// // //     text-transform: uppercase;
// // //     color: var(--gold);
// // //     margin-bottom: 2px;
// // //     font-weight: 500;
// // //   }

// // //   .pz-contact-value {
// // //     font-size: 13px;
// // //     color: var(--muted);
// // //     font-weight: 300;
// // //     margin: 0;
// // //   }

// // //   .pz-social-grid {
// // //     display: grid;
// // //     grid-template-columns: 1fr 1fr;
// // //     gap: 8px;
// // //   }

// // //   .pz-social-btn {
// // //     display: flex;
// // //     flex-direction: column;
// // //     align-items: center;
// // //     justify-content: center;
// // //     gap: 6px;
// // //     padding: 16px 10px;
// // //     border: 1px solid var(--border);
// // //     border-radius: 2px;
// // //     text-decoration: none;
// // //     color: var(--muted);
// // //     font-size: 11px;
// // //     letter-spacing: 0.08em;
// // //     text-transform: uppercase;
// // //     font-weight: 400;
// // //     transition: all 0.25s ease;
// // //     cursor: pointer;
// // //     background: transparent;
// // //     position: relative;
// // //     overflow: hidden;
// // //   }

// // //   .pz-social-btn::before {
// // //     content: '';
// // //     position: absolute;
// // //     inset: 0;
// // //     background: var(--hover-bg);
// // //     opacity: 0;
// // //     transition: opacity 0.25s;
// // //   }

// // //   .pz-social-btn:hover {
// // //     border-color: var(--gold);
// // //     color: var(--gold-light);
// // //     transform: translateY(-2px);
// // //     box-shadow: 0 8px 24px rgba(184,150,90,0.12);
// // //   }

// // //   .pz-social-btn:hover::before { opacity: 1; }

// // //   .pz-social-icon {
// // //     font-size: 18px;
// // //     position: relative;
// // //   }

// // //   .pz-social-name {
// // //     position: relative;
// // //     font-size: 10px;
// // //   }

// // //   /* Bottom bar */
// // //   .pz-footer-bottom {
// // //     display: flex;
// // //     align-items: center;
// // //     justify-content: space-between;
// // //     padding: 24px 0;
// // //     gap: 20px;
// // //     flex-wrap: wrap;
// // //   }

// // //   .pz-copyright {
// // //     font-size: 12px;
// // //     color: var(--muted);
// // //     font-weight: 300;
// // //     margin: 0;
// // //     letter-spacing: 0.04em;
// // //   }

// // //   .pz-copyright span {
// // //     color: var(--gold);
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 14px;
// // //   }

// // //   .pz-bottom-links {
// // //     display: flex;
// // //     gap: 24px;
// // //     list-style: none;
// // //     padding: 0;
// // //     margin: 0;
// // //   }

// // //   .pz-bottom-links a {
// // //     font-size: 11px;
// // //     letter-spacing: 0.08em;
// // //     text-transform: uppercase;
// // //     color: var(--muted);
// // //     text-decoration: none;
// // //     transition: color 0.2s;
// // //   }

// // //   .pz-bottom-links a:hover { color: var(--gold); }
// // // `;

// // // export default function Footer() {
// // //   const location = useLocation();

// // //   const hideFooter =
// // //     location.pathname.startsWith("/admin") ||
// // //     location.pathname.startsWith("/agentdashboard") ||
// // //     location.pathname.startsWith("/agentlogin");

// // //   if (hideFooter) return null;

// // //   return (
// // //     <>
// // //       <style>{styles}</style>
// // //       <footer className="pz-footer">
// // //         <div className="pz-footer-inner">
// // //           <div className="pz-footer-top">

// // //             {/* Brand Column */}
// // //             <div>
// // //               <p className="pz-brand-name">PropZo</p>
// // //               <p className="pz-brand-tagline">Premium Real Estate</p>
// // //               <p className="pz-brand-desc">
// // //                 Discover curated properties with verified listings, trusted agents,
// // //                 and a seamless experience. Your dream home, redefined.
// // //               </p>
// // //               <div className="pz-badge">
// // //                 <span className="pz-badge-dot" />
// // //                 Verified Listings Active
// // //               </div>
// // //             </div>

// // //             {/* Services */}
// // //             <div>
// // //               <p className="pz-col-title">Services</p>
// // //               <ul className="pz-link-list">
// // //                 {["Buying", "Selling", "Renting", "Property Management", "Valuation"].map((s) => (
// // //                   <li key={s} className="pz-link-item">
// // //                     <a href="#">{s}</a>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>

// // //             {/* Contact */}
// // //             <div>
// // //               <p className="pz-col-title">Contact</p>
// // //               <div>
// // //                 <ContactItem icon="📍" label="Location" value="Mumbai, India" />
// // //                 <ContactItem icon="📞" label="Phone" value="+91 98765 43210" />
// // //                 <ContactItem icon="✉" label="Email" value="info@propzo.com" />
// // //                 <ContactItem icon="🕐" label="Hours" value="Mon – Sat, 9–7 PM" />
// // //               </div>
// // //             </div>

// // //             {/* Social */}
// // //             <div>
// // //               <p className="pz-col-title">Connect</p>
// // //               <div className="pz-social-grid">
// // //                 <SocialBtn icon="🌐" name="Web" />
// // //                 <SocialBtn icon="📘" name="Facebook" />
// // //                 <SocialBtn icon="📸" name="Instagram" />
// // //                 <SocialBtn icon="𝕏" name="Twitter" />
// // //               </div>
// // //             </div>

// // //           </div>

// // //           {/* Bottom bar */}
// // //           <div className="pz-footer-bottom">
// // //             <p className="pz-copyright">
// // //               © {new Date().getFullYear()} <span>PropZo</span>. All rights reserved.
// // //             </p>
// // //             <ul className="pz-bottom-links">
// // //               {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
// // //                 <li key={l}><a href="#">{l}</a></li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </>
// // //   );
// // // }

// // // function ContactItem({ icon, label, value }) {
// // //   return (
// // //     <div className="pz-contact-item">
// // //       <div className="pz-contact-icon">{icon}</div>
// // //       <div>
// // //         <p className="pz-contact-label">{label}</p>
// // //         <p className="pz-contact-value">{value}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function SocialBtn({ icon, name }) {
// // //   return (
// // //     <a href="#" className="pz-social-btn">
// // //       <span className="pz-social-icon">{icon}</span>
// // //       <span className="pz-social-name">{name}</span>
// // //     </a>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import { useLocation } from "react-router-dom";

// // const styles = `
// //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

// //   :root {
// //     --ink: #2c2416;
// //     --cream: #faf8f4;
// //     --gold: #8a6a28;
// //     --gold-light: #a07830;
// //     --muted: #6b5e4a;
// //     --muted-light: #9c8e7a;
// //     --border: rgba(138,106,40,0.16);
// //     --hover-bg: rgba(138,106,40,0.06);
// //     --bg: #f0ebe0;
// //     --bg-deep: #e8e2d6;
// //   }

// //   .pz-footer {
// //     background: var(--bg);
// //     font-family: 'DM Sans', sans-serif;
// //     color: var(--ink);
// //     padding: 80px 0 0;
// //     position: relative;
// //     overflow: hidden;
// //     border-top: 1px solid var(--border);
// //   }

// //   .pz-footer::before {
// //     content: 'PROPZO';
// //     position: absolute;
// //     top: -30px;
// //     left: -20px;
// //     font-family: 'Cormorant Garamond', serif;
// //     font-size: clamp(120px, 18vw, 220px);
// //     font-weight: 600;
// //     color: rgba(138,106,40,0.05);
// //     letter-spacing: -0.02em;
// //     pointer-events: none;
// //     user-select: none;
// //     line-height: 1;
// //   }

// //   .pz-footer-inner {
// //     max-width: 1240px;
// //     margin: 0 auto;
// //     padding: 0 40px;
// //     position: relative;
// //     z-index: 1;
// //   }

// //   .pz-footer-top {
// //     display: grid;
// //     grid-template-columns: 1.6fr 1fr 1fr 1fr;
// //     gap: 60px;
// //     padding-bottom: 60px;
// //     border-bottom: 1px solid var(--border);
// //   }

// //   @media (max-width: 900px) {
// //     .pz-footer-top {
// //       grid-template-columns: 1fr 1fr;
// //       gap: 40px;
// //     }
// //   }

// //   @media (max-width: 560px) {
// //     .pz-footer-top {
// //       grid-template-columns: 1fr;
// //     }
// //     .pz-footer-inner { padding: 0 24px; }
// //   }

// //   .pz-brand-name {
// //     font-family: 'Cormorant Garamond', serif;
// //     font-size: 42px;
// //     font-weight: 600;
// //     letter-spacing: -0.02em;
// //     line-height: 1;
// //     color: #2c2416;
// //     margin: 0 0 6px;
// //   }

// //   .pz-brand-tagline {
// //     font-size: 11px;
// //     letter-spacing: 0.18em;
// //     text-transform: uppercase;
// //     color: var(--gold);
// //     margin: 0 0 20px;
// //     font-weight: 500;
// //   }

// //   .pz-brand-desc {
// //     font-size: 14px;
// //     line-height: 1.8;
// //     color: #6b5e4a;
// //     margin: 0 0 28px;
// //     font-weight: 300;
// //     max-width: 300px;
// //   }

// //   .pz-badge {
// //     display: inline-flex;
// //     align-items: center;
// //     gap: 8px;
// //     padding: 8px 16px;
// //     border: 1px solid var(--border);
// //     border-radius: 2px;
// //     font-size: 12px;
// //     color: var(--gold);
// //     letter-spacing: 0.08em;
// //     background: rgba(138,106,40,0.05);
// //   }

// //   .pz-badge-dot {
// //     width: 6px;
// //     height: 6px;
// //     background: var(--gold);
// //     border-radius: 50%;
// //     animation: pz-pulse 2s ease-in-out infinite;
// //   }

// //   @keyframes pz-pulse {
// //     0%, 100% { opacity: 1; transform: scale(1); }
// //     50% { opacity: 0.4; transform: scale(0.8); }
// //   }

// //   .pz-col-title {
// //     font-family: 'Cormorant Garamond', serif;
// //     font-size: 13px;
// //     font-weight: 400;
// //     letter-spacing: 0.2em;
// //     text-transform: uppercase;
// //     color: var(--gold);
// //     margin: 0 0 24px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //   }

// //   .pz-col-title::after {
// //     content: '';
// //     flex: 1;
// //     height: 1px;
// //     background: var(--border);
// //     display: block;
// //   }

// //   .pz-link-list {
// //     list-style: none;
// //     padding: 0;
// //     margin: 0;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 2px;
// //   }

// //   .pz-link-item a {
// //     display: block;
// //     padding: 9px 12px;
// //     font-size: 14px;
// //     color: #6b5e4a;
// //     text-decoration: none;
// //     font-weight: 300;
// //     letter-spacing: 0.01em;
// //     border-radius: 2px;
// //     transition: all 0.2s ease;
// //     margin: 0 -12px;
// //   }

// //   .pz-link-item a:hover {
// //     color: #2c2416;
// //     background: var(--hover-bg);
// //     padding-left: 20px;
// //   }

// //   .pz-contact-item {
// //     display: flex;
// //     align-items: flex-start;
// //     gap: 12px;
// //     padding: 10px 0;
// //     border-bottom: 1px solid rgba(138,106,40,0.08);
// //   }

// //   .pz-contact-item:last-child { border-bottom: none; }

// //   .pz-contact-icon {
// //     width: 30px;
// //     height: 30px;
// //     border: 1px solid var(--border);
// //     border-radius: 2px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 12px;
// //     flex-shrink: 0;
// //     color: var(--gold);
// //     margin-top: 1px;
// //     background: rgba(138,106,40,0.05);
// //   }

// //   .pz-contact-label {
// //     font-size: 10px;
// //     letter-spacing: 0.12em;
// //     text-transform: uppercase;
// //     color: var(--gold);
// //     margin-bottom: 2px;
// //     font-weight: 500;
// //   }

// //   .pz-contact-value {
// //     font-size: 13px;
// //     color: #6b5e4a;
// //     font-weight: 300;
// //     margin: 0;
// //   }

// //   .pz-social-grid {
// //     display: grid;
// //     grid-template-columns: 1fr 1fr;
// //     gap: 8px;
// //   }

// //   .pz-social-btn {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     justify-content: center;
// //     gap: 6px;
// //     padding: 16px 10px;
// //     border: 1px solid var(--border);
// //     border-radius: 2px;
// //     text-decoration: none;
// //     color: #6b5e4a;
// //     font-size: 11px;
// //     letter-spacing: 0.08em;
// //     text-transform: uppercase;
// //     font-weight: 400;
// //     transition: all 0.25s ease;
// //     cursor: pointer;
// //     background: rgba(255,255,255,0.5);
// //     position: relative;
// //     overflow: hidden;
// //   }

// //   .pz-social-btn::before {
// //     content: '';
// //     position: absolute;
// //     inset: 0;
// //     background: var(--hover-bg);
// //     opacity: 0;
// //     transition: opacity 0.25s;
// //   }

// //   .pz-social-btn:hover {
// //     border-color: var(--gold);
// //     color: var(--gold-light);
// //     transform: translateY(-2px);
// //     box-shadow: 0 8px 24px rgba(138,106,40,0.12);
// //   }

// //   .pz-social-btn:hover::before { opacity: 1; }

// //   .pz-social-icon {
// //     font-size: 18px;
// //     position: relative;
// //   }

// //   .pz-social-name {
// //     position: relative;
// //     font-size: 10px;
// //   }

// //   /* Bottom bar */
// //   .pz-footer-bottom {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 24px 0;
// //     gap: 20px;
// //     flex-wrap: wrap;
// //     background: var(--bg-deep);
// //     margin: 0 -40px;
// //     padding: 24px 40px;
// //   }

// //   @media (max-width: 560px) {
// //     .pz-footer-bottom { margin: 0 -24px; padding: 24px; }
// //   }

// //   .pz-copyright {
// //     font-size: 12px;
// //     color: #9c8e7a;
// //     font-weight: 300;
// //     margin: 0;
// //     letter-spacing: 0.04em;
// //   }

// //   .pz-copyright span {
// //     color: var(--gold);
// //     font-family: 'Cormorant Garamond', serif;
// //     font-size: 14px;
// //     font-weight: 600;
// //   }

// //   .pz-bottom-links {
// //     display: flex;
// //     gap: 24px;
// //     list-style: none;
// //     padding: 0;
// //     margin: 0;
// //   }

// //   .pz-bottom-links a {
// //     font-size: 11px;
// //     letter-spacing: 0.08em;
// //     text-transform: uppercase;
// //     color: #9c8e7a;
// //     text-decoration: none;
// //     transition: color 0.2s;
// //   }

// //   .pz-bottom-links a:hover { color: var(--gold); }
// // `;

// // export default function Footer() {
// //   const location = useLocation();

// //   const path = location.pathname.toLowerCase();
// //   const hideFooter =
// //     path.startsWith("/admin") ||
// //     path.startsWith("/agentdashboard") ||
// //     path.startsWith("/agentlogin");

// //   if (hideFooter) return null;

// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <footer className="pz-footer">
// //         <div className="pz-footer-inner">
// //           <div className="pz-footer-top">

// //             {/* Brand Column */}
// //             <div>
// //               <p className="pz-brand-name">PropZo</p>
// //               <p className="pz-brand-tagline">Premium Real Estate</p>
// //               <p className="pz-brand-desc">
// //                 Discover curated properties with verified listings, trusted agents,
// //                 and a seamless experience. Your dream home, redefined.
// //               </p>
// //               <div className="pz-badge">
// //                 <span className="pz-badge-dot" />
// //                 Verified Listings Active
// //               </div>
// //             </div>

// //             {/* Services */}
// //             <div>
// //               <p className="pz-col-title">Services</p>
// //               <ul className="pz-link-list">
// //                 {["Buying", "Selling", "Renting", "Property Management", "Valuation"].map((s) => (
// //                   <li key={s} className="pz-link-item">
// //                     <a href="#">{s}</a>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Contact */}
// //             <div>
// //               <p className="pz-col-title">Contact</p>
// //               <div>
// //                 <ContactItem icon="📍" label="Location" value="Mumbai, India" />
// //                 <ContactItem icon="📞" label="Phone" value="+91 98765 43210" />
// //                 <ContactItem icon="✉" label="Email" value="prpzoestate@gmail.com" />
// //                 <ContactItem icon="🕐" label="Hours" value="Mon – Sat, 9–7 PM" />
// //               </div>
// //             </div>

// //             {/* Social */}
// //             <div>
// //               <p className="pz-col-title">Connect</p>
// //               <div className="pz-social-grid">
// //                 <SocialBtn icon="🌐" name="Web" />
// //                 <SocialBtn icon="📘" name="Facebook" />
// //                 <SocialBtn icon="📸" name="Instagram" />
// //                 <SocialBtn icon="𝕏" name="Twitter" />
// //               </div>
// //             </div>

// //           </div>

// //           {/* Bottom bar */}
// //           <div className="pz-footer-bottom">
// //             <p className="pz-copyright">
// //               © {new Date().getFullYear()} <span>PropZo</span>. All rights reserved.
// //             </p>
// //             <ul className="pz-bottom-links">
// //               {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
// //                 <li key={l}><a href="#">{l}</a></li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </footer>
// //     </>
// //   );
// // }

// // function ContactItem({ icon, label, value }) {
// //   return (
// //     <div className="pz-contact-item">
// //       <div className="pz-contact-icon">{icon}</div>
// //       <div>
// //         <p className="pz-contact-label">{label}</p>
// //         <p className="pz-contact-value">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // function SocialBtn({ icon, name }) {
// //   return (
// //     <a href="#" className="pz-social-btn">
// //       <span className="pz-social-icon">{icon}</span>
// //       <span className="pz-social-name">{name}</span>
// //     </a>
// //   );
// // }
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

//   :root {
//     --ink: #2c1a10;
//     --cream: #f5f0e8;
//     --gold: #B2846B;
//     --gold-light: #C4957C;
//     --sage: #627B68;
//     --sage-light: #819B8B;
//     --blush: #E4CBB6;
//     --dark-brown: #4C3324;
//     --muted: #7a5c4a;
//     --muted-light: #a08070;
//     --border: rgba(178,132,107,0.18);
//     --hover-bg: rgba(178,132,107,0.07);
//     --bg: #ede6da;
//     --bg-deep: #e2d9cb;
//   }

//   .pz-footer {
//     background: var(--bg);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--ink);
//     padding: 80px 0 0;
//     position: relative;
//     overflow: hidden;
//     border-top: 1px solid var(--border);
//   }

//   .pz-footer::before {
//     content: 'PROPZO';
//     position: absolute;
//     top: -30px;
//     left: -20px;
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(120px, 18vw, 220px);
//     font-weight: 600;
//     color: rgba(178,132,107,0.07);
//     letter-spacing: -0.02em;
//     pointer-events: none;
//     user-select: none;
//     line-height: 1;
//   }

//   .pz-footer-inner {
//     max-width: 1240px;
//     margin: 0 auto;
//     padding: 0 40px;
//     position: relative;
//     z-index: 1;
//   }

//   .pz-footer-top {
//     display: grid;
//     grid-template-columns: 1.6fr 1fr 1fr 1fr;
//     gap: 60px;
//     padding-bottom: 60px;
//     border-bottom: 1px solid var(--border);
//   }

//   @media (max-width: 900px) {
//     .pz-footer-top {
//       grid-template-columns: 1fr 1fr;
//       gap: 40px;
//     }
//   }

//   @media (max-width: 560px) {
//     .pz-footer-top {
//       grid-template-columns: 1fr;
//     }
//     .pz-footer-inner { padding: 0 24px; }
//   }

//   .pz-brand-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 42px;
//     font-weight: 600;
//     letter-spacing: -0.02em;
//     line-height: 1;
//     color: var(--dark-brown);
//     margin: 0 0 6px;
//   }

//   .pz-brand-tagline {
//     font-size: 11px;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: var(--sage);
//     margin: 0 0 20px;
//     font-weight: 500;
//   }

//   .pz-brand-desc {
//     font-size: 14px;
//     line-height: 1.8;
//     color: var(--muted);
//     margin: 0 0 28px;
//     font-weight: 300;
//     max-width: 300px;
//   }

//   .pz-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 8px 16px;
//     border: 1px solid var(--border);
//     border-radius: 2px;
//     font-size: 12px;
//     color: var(--gold);
//     letter-spacing: 0.08em;
//     background: rgba(178,132,107,0.07);
//   }

//   .pz-badge-dot {
//     width: 6px;
//     height: 6px;
//     background: var(--sage-light);
//     border-radius: 50%;
//     animation: pz-pulse 2s ease-in-out infinite;
//   }

//   @keyframes pz-pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50% { opacity: 0.4; transform: scale(0.8); }
//   }

//   .pz-col-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: var(--gold);
//     margin: 0 0 24px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .pz-col-title::after {
//     content: '';
//     flex: 1;
//     height: 1px;
//     background: var(--border);
//     display: block;
//   }

//   .pz-link-list {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//     display: flex;
//     flex-direction: column;
//     gap: 2px;
//   }

//   .pz-link-item a {
//     display: block;
//     padding: 9px 12px;
//     font-size: 14px;
//     color: var(--muted);
//     text-decoration: none;
//     font-weight: 300;
//     letter-spacing: 0.01em;
//     border-radius: 2px;
//     transition: all 0.2s ease;
//     margin: 0 -12px;
//   }

//   .pz-link-item a:hover {
//     color: var(--dark-brown);
//     background: var(--hover-bg);
//     padding-left: 20px;
//   }

//   .pz-contact-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 12px;
//     padding: 10px 0;
//     border-bottom: 1px solid rgba(178,132,107,0.10);
//   }

//   .pz-contact-item:last-child { border-bottom: none; }

//   .pz-contact-icon {
//     width: 30px;
//     height: 30px;
//     border: 1px solid var(--border);
//     border-radius: 2px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 12px;
//     flex-shrink: 0;
//     color: var(--sage);
//     margin-top: 1px;
//     background: rgba(98,123,104,0.08);
//   }

//   .pz-contact-label {
//     font-size: 10px;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--sage);
//     margin-bottom: 2px;
//     font-weight: 500;
//   }

//   .pz-contact-value {
//     font-size: 13px;
//     color: var(--muted);
//     font-weight: 300;
//     margin: 0;
//   }

//   .pz-social-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 8px;
//   }

//   .pz-social-btn {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//     padding: 16px 10px;
//     border: 1px solid var(--border);
//     border-radius: 2px;
//     text-decoration: none;
//     color: var(--muted);
//     font-size: 11px;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     font-weight: 400;
//     transition: all 0.25s ease;
//     cursor: pointer;
//     background: rgba(228,203,182,0.25);
//     position: relative;
//     overflow: hidden;
//   }

//   .pz-social-btn::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: var(--hover-bg);
//     opacity: 0;
//     transition: opacity 0.25s;
//   }

//   .pz-social-btn:hover {
//     border-color: var(--sage);
//     color: var(--sage);
//     transform: translateY(-2px);
//     box-shadow: 0 8px 24px rgba(98,123,104,0.15);
//   }

//   .pz-social-btn:hover::before { opacity: 1; }

//   .pz-social-icon {
//     font-size: 18px;
//     position: relative;
//   }

//   .pz-social-name {
//     position: relative;
//     font-size: 10px;
//   }

//   /* Bottom bar */
//   .pz-footer-bottom {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 20px;
//     flex-wrap: wrap;
//     background: var(--bg-deep);
//     margin: 0 -40px;
//     padding: 24px 40px;
//   }

//   @media (max-width: 560px) {
//     .pz-footer-bottom { margin: 0 -24px; padding: 24px; }
//   }

//   .pz-copyright {
//     font-size: 12px;
//     color: var(--muted-light);
//     font-weight: 300;
//     margin: 0;
//     letter-spacing: 0.04em;
//   }

//   .pz-copyright span {
//     color: var(--gold);
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 14px;
//     font-weight: 600;
//   }

//   .pz-bottom-links {
//     display: flex;
//     gap: 24px;
//     list-style: none;
//     padding: 0;
//     margin: 0;
//   }

//   .pz-bottom-links a {
//     font-size: 11px;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     color: var(--muted-light);
//     text-decoration: none;
//     transition: color 0.2s;
//   }

//   .pz-bottom-links a:hover { color: var(--sage); }
// `;

// export default function Footer() {
//   const location = useLocation();

//   const path = location.pathname.toLowerCase();
//   const hideFooter =
//     path.startsWith("/admin") ||
//     path.startsWith("/agentdashboard") ||
//     path.startsWith("/agentlogin");

//   if (hideFooter) return null;

//   return (
//     <>
//       <style>{styles}</style>
//       <footer className="pz-footer">
//         <div className="pz-footer-inner">
//           <div className="pz-footer-top">

//             {/* Brand Column */}
//             <div>
//               <p className="pz-brand-name">PropZo</p>
//               <p className="pz-brand-tagline">Premium Real Estate</p>
//               <p className="pz-brand-desc">
//                 Discover curated properties with verified listings, trusted agents,
//                 and a seamless experience. Your dream home, redefined.
//               </p>
//               <div className="pz-badge">
//                 <span className="pz-badge-dot" />
//                 Verified Listings Active
//               </div>
//             </div>

//             {/* Services */}
//             <div>
//               <p className="pz-col-title">Services</p>
//               <ul className="pz-link-list">
//                 {["Buying", "Selling", "Renting", "Property Management", "Valuation"].map((s) => (
//                   <li key={s} className="pz-link-item">
//                     <a href="#">{s}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <p className="pz-col-title">Contact</p>
//               <div>
//                 <ContactItem icon="📍" label="Location" value="Mumbai, India" />
//                 <ContactItem icon="📞" label="Phone" value="+91 98765 43210" />
//                 <ContactItem icon="✉" label="Email" value="prpzoestate@gmail.com" />
//                 <ContactItem icon="🕐" label="Hours" value="Mon – Sat, 9–7 PM" />
//               </div>
//             </div>

//             {/* Social */}
//             <div>
//               <p className="pz-col-title">Connect</p>
//               <div className="pz-social-grid">
//                 <SocialBtn icon="🌐" name="Web" />
//                 <SocialBtn icon="📘" name="Facebook" />
//                 <SocialBtn icon="📸" name="Instagram" />
//                 <SocialBtn icon="𝕏" name="Twitter" />
//               </div>
//             </div>

//           </div>

//           {/* Bottom bar */}
//           <div className="pz-footer-bottom">
//             <p className="pz-copyright">
//               © {new Date().getFullYear()} <span>PropZo</span>. All rights reserved.
//             </p>
//             <ul className="pz-bottom-links">
//               {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
//                 <li key={l}><a href="#">{l}</a></li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

// function ContactItem({ icon, label, value }) {
//   return (
//     <div className="pz-contact-item">
//       <div className="pz-contact-icon">{icon}</div>
//       <div>
//         <p className="pz-contact-label">{label}</p>
//         <p className="pz-contact-value">{value}</p>
//       </div>
//     </div>
//   );
// }

// function SocialBtn({ icon, name }) {
//   return (
//     <a href="#" className="pz-social-btn">
//       <span className="pz-social-icon">{icon}</span>
//       <span className="pz-social-name">{name}</span>
//     </a>
//   );
// }

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #2c1a10;
    --cream: #F5EDE6;
    --gold: #B2846B;
    --gold-light: #C4957C;
    --sage: #627B68;
    --sage-light: #819B8B;
    --blush: #E4CBB6;
    --dark-brown: #4C3324;
    --muted: #7a5c4a;
    --muted-light: #a08070;
    --border: rgba(178,132,107,0.18);
    --hover-bg: rgba(178,132,107,0.07);
    --bg: #F5EDE6;
    --bg-deep: #EDE3DB;
  }

  .pz-footer {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    padding: 80px 0 0;
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--border);
  }

  .pz-footer::before {
    content: 'PROPZO';
    position: absolute;
    top: -30px;
    left: -20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(120px, 18vw, 220px);
    font-weight: 600;
    color: rgba(178,132,107,0.07);
    letter-spacing: -0.02em;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  .pz-footer-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 40px;
    position: relative;
    z-index: 1;
  }

  .pz-footer-top {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 60px;
    padding-bottom: 60px;
    border-bottom: 1px solid var(--border);
  }

  @media (max-width: 900px) {
    .pz-footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 560px) {
    .pz-footer-top {
      grid-template-columns: 1fr;
    }
    .pz-footer-inner { padding: 0 24px; }
  }

  .pz-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1;
    color: var(--dark-brown);
    margin: 0 0 6px;
  }

  .pz-brand-tagline {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--sage);
    margin: 0 0 20px;
    font-weight: 500;
  }

  .pz-brand-desc {
    font-size: 14px;
    line-height: 1.8;
    color: var(--muted);
    margin: 0 0 28px;
    font-weight: 300;
    max-width: 300px;
  }

  .pz-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 12px;
    color: var(--gold);
    letter-spacing: 0.08em;
    background: rgba(178,132,107,0.07);
  }

  .pz-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--sage-light);
    border-radius: 50%;
    animation: pz-pulse 2s ease-in-out infinite;
  }

  @keyframes pz-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  .pz-col-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pz-col-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
    display: block;
  }

  .pz-link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pz-link-item a {
    display: block;
    padding: 9px 12px;
    font-size: 14px;
    color: var(--muted);
    text-decoration: none;
    font-weight: 300;
    letter-spacing: 0.01em;
    border-radius: 2px;
    transition: all 0.2s ease;
    margin: 0 -12px;
  }

  .pz-link-item a:hover {
    color: var(--dark-brown);
    background: var(--hover-bg);
    padding-left: 20px;
  }

  .pz-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(178,132,107,0.10);
  }

  .pz-contact-item:last-child { border-bottom: none; }

  .pz-contact-icon {
    width: 30px;
    height: 30px;
    border: 1px solid var(--border);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
    color: var(--sage);
    margin-top: 1px;
    background: rgba(98,123,104,0.08);
  }

  .pz-contact-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 2px;
    font-weight: 500;
  }

  .pz-contact-value {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
    margin: 0;
  }

  .pz-social-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .pz-social-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 16px 10px;
    border: 1px solid var(--border);
    border-radius: 2px;
    text-decoration: none;
    color: var(--muted);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 400;
    transition: all 0.25s ease;
    cursor: pointer;
    background: rgba(228,203,182,0.25);
    position: relative;
    overflow: hidden;
  }

  .pz-social-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--hover-bg);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .pz-social-btn:hover {
    border-color: var(--sage);
    color: var(--sage);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(98,123,104,0.15);
  }

  .pz-social-btn:hover::before { opacity: 1; }

  .pz-social-icon {
    font-size: 18px;
    position: relative;
  }

  .pz-social-name {
    position: relative;
    font-size: 10px;
  }

  /* Bottom bar */
  .pz-footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    background: var(--bg-deep);
    margin: 0 -40px;
    padding: 24px 40px;
  }

  @media (max-width: 560px) {
    .pz-footer-bottom { margin: 0 -24px; padding: 24px; }
  }

  .pz-copyright {
    font-size: 12px;
    color: var(--muted-light);
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.04em;
  }

  .pz-copyright span {
    color: var(--gold);
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    font-weight: 600;
  }

  .pz-bottom-links {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .pz-bottom-links a {
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-light);
    text-decoration: none;
    transition: color 0.2s;
  }

  .pz-bottom-links a:hover { color: var(--sage); }
`;

export default function Footer() {
  const location = useLocation();

  const path = location.pathname.toLowerCase();
  const hideFooter =
    path.startsWith("/admin") ||
    path.startsWith("/agentdashboard") ||
    path.startsWith("/agentlogin");

  if (hideFooter) return null;

  return (
    <>
      <style>{styles}</style>
      <footer className="pz-footer">
        <div className="pz-footer-inner">
          <div className="pz-footer-top">

            {/* Brand Column */}
            <div>
              <p className="pz-brand-name">PropZo</p>
              <p className="pz-brand-tagline">Premium Real Estate</p>
              <p className="pz-brand-desc">
                Discover curated properties with verified listings, trusted agents,
                and a seamless experience. Your dream home, redefined.
              </p>
              <div className="pz-badge">
                <span className="pz-badge-dot" />
                Verified Listings Active
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="pz-col-title">Services</p>
              <ul className="pz-link-list">
                {["Buying", "Selling", "Renting", "Property Management", "Valuation"].map((s) => (
                  <li key={s} className="pz-link-item">
                    <a href="#">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="pz-col-title">Contact</p>
              <div>
                <ContactItem icon="📍" label="Location" value="Mumbai, India" />
                <ContactItem icon="📞" label="Phone" value="+91 98765 43210" />
                <ContactItem icon="✉" label="Email" value="propzoestate@gmail.com" />
                <ContactItem icon="🕐" label="Hours" value="Mon – Sat, 9–7 PM" />
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="pz-col-title">Connect</p>
              <div className="pz-social-grid">
                <SocialBtn icon="🌐" name="Web" />
                <SocialBtn icon="📘" name="Facebook" />
                <SocialBtn icon="📸" name="Instagram" />
                <SocialBtn icon="𝕏" name="Twitter" />
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="pz-footer-bottom">
            <p className="pz-copyright">
              © {new Date().getFullYear()} <span>PropZo</span>. All rights reserved.
            </p>
            <ul className="pz-bottom-links">
              {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="pz-contact-item">
      <div className="pz-contact-icon">{icon}</div>
      <div>
        <p className="pz-contact-label">{label}</p>
        <p className="pz-contact-value">{value}</p>
      </div>
    </div>
  );
}

function SocialBtn({ icon, name }) {
  return (
    <a href="#" className="pz-social-btn">
      <span className="pz-social-icon">{icon}</span>
      <span className="pz-social-name">{name}</span>
    </a>
  );
}
