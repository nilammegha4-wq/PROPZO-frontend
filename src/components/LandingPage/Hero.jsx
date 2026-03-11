// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";

// // export default function Hero() {
// //   const slides = [
// //     { text: "Luxury Villas", img: "Villa.jpg" },
// //     { text: "Smart Apartments", img: "Apartment.jpg" },
// //     { text: "Premium Penthouses", img: "Penthouse.jpg" },
// //     { text: "Modern Family Homes", img: "Modernhouse.jpg" }
// //   ];

// //   const [index, setIndex] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setIndex((prev) => (prev + 1) % slides.length);
// //     }, 2500);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <section style={wrapper}>
// //       <div style={container}>

// //         {/* FLOATING SHAPES */}
// //         <div style={floatingBlob}></div>
// //         <div style={floatingCircle}></div>
// //         <div style={floatingSquare}></div>

// //         {/* LEFT CONTENT */}
// //         <div style={{ position: "relative" }}>
// //           <div style={pillBg}></div>

// //           <div style={{ ...textBox, position: "relative", padding: "35px", zIndex: 2 }}>
// //             <h1 style={title}>
// //               Find Your <span style={gradientText}>Dream Home</span> with PropZo
// //             </h1>

// //             <h2 style={animatedText}>
// //               <span style={textIndicator}></span> {slides[index].text}
// //             </h2>

// //             <p style={subtitle}>
// //               Discover hand-picked premium properties in top locations. PropZo connects
// //               you with verified sellers, trusted agents, and transparent transactions
// //               for a smooth real-estate experience.
// //             </p>

// //             <p style={bullets}>
// //               ✔ Verified property listings <br />
// //               ✔ Professional consultation <br />
// //               ✔ Tailored property recommendations <br />
// //               ✔ Safe legal documentation
// //             </p>

// //             {/* BUTTONS */}
// //             <div style={buttonRow}>
// //               <Link to="/menu" style={{ textDecoration: "none" }}>
// //                 <button style={exploreBtn}>Explore More</button>
// //               </Link>

// //               <Link to="/agent" style={{ textDecoration: "none" }}>
// //                 <button style={talkBtn}>Talk to Agent</button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT IMAGE */}
// //         <div style={imageBox}>
// //           <div style={imageWrapper}>
// //             <img
// //               key={index}
// //               src={slides[index].img}
// //               alt={slides[index].text}
// //               style={imageStyle}
// //             />
// //           </div>
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }

// // /* ================= STYLES ================= */

// // const wrapper = {
// //   width: "100%",
// //   minHeight: "100vh",
// //   background: "linear-gradient(135deg,#f7fbff,#eef3ff)",
// //   paddingTop: "90px",
// //   paddingBottom: "40px",
// //   overflow: "hidden",
// //   position: "relative",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center"
// // };

// // const container = {
// //   width: "92%",
// //   maxWidth: "1350px",
// //   display: "grid",
// //   gridTemplateColumns: "1.1fr 1fr",
// //   gap: "50px",
// //   alignItems: "center",
// //   position: "relative",
// //   zIndex: 2
// // };

// // const pillBg = {
// //   position: "absolute",
// //   top: "-25px",
// //   left: "-30px",
// //   width: "115%",
// //   height: "115%",
// //   background: "white",
// //   borderRadius: "60px 220px 220px 60px",
// //   boxShadow: "0 0 80px rgba(0,120,255,0.25)",
// //   zIndex: 0
// // };

// // const textBox = {
// //   textAlign: "left",
// //   animation: "fadeSlideLeft 1s forwards"
// // };

// // const title = {
// //   fontSize: "54px",
// //   fontWeight: 800,
// //   color: "#0b2c5f",
// //   lineHeight: 1.1
// // };

// // const gradientText = {
// //   background: "linear-gradient(90deg,#0066ff,#00c6ff)",
// //   WebkitBackgroundClip: "text",
// //   WebkitTextFillColor: "transparent"
// // };

// // const animatedText = {
// //   fontSize: "28px",
// //   fontWeight: 700,
// //   display: "flex",
// //   alignItems: "center",
// //   color: "#0b3468"
// // };

// // const textIndicator = {
// //   width: "12px",
// //   height: "12px",
// //   borderRadius: "50%",
// //   background: "linear-gradient(90deg,#0052ff,#00c6ff)",
// //   marginRight: "10px",
// //   animation: "pulse 1.6s infinite"
// // };

// // const subtitle = {
// //   fontSize: "18px",
// //   lineHeight: 1.7,
// //   color: "#444"
// // };

// // const bullets = {
// //   fontSize: "16px",
// //   color: "#555",
// //   marginTop: "8px"
// // };

// // /* ✨ BUTTON STYLES */
// // const buttonRow = {
// //   display: "flex",
// //   gap: "16px",
// //   marginTop: "22px",
// //   flexWrap: "wrap"
// // };

// // const exploreBtn = {
// //   padding: "14px 38px",
// //   borderRadius: "50px",
// //   border: "none",
// //   cursor: "pointer",
// //   fontSize: "16px",
// //   fontWeight: 700,
// //   color: "#fff",
// //   background: "linear-gradient(135deg,#0052ff,#00c6ff)",
// //   boxShadow: "0 14px 40px rgba(0,102,255,0.45)",
// //   transition: "all 0.35s ease"
// // };

// // const talkBtn = {
// //   padding: "14px 38px",
// //   borderRadius: "50px",
// //   cursor: "pointer",
// //   fontSize: "16px",
// //   fontWeight: 700,
// //   color: "#0052ff",
// //   background: "rgba(255,255,255,0.7)",
// //   border: "2px solid #0052ff",
// //   backdropFilter: "blur(6px)",
// //   transition: "all 0.35s ease"
// // };

// // const imageBox = {
// //   borderRadius: "25px",
// //   overflow: "hidden",
// //   boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
// //   animation: "fadeSlideRight 1s forwards"
// // };

// // const imageWrapper = {
// //   height: "600px",
// //   borderRadius: "25px",
// //   overflow: "hidden"
// // };

// // const imageStyle = {
// //   width: "120%",
// //   height: "100%",
// //   objectFit: "cover",
// //   transform: "translateX(-10%)"
// // };

// // /* FLOATING SHAPES */
// // const floatingBlob = {
// //   position: "absolute",
// //   left: "-5%",
// //   top: "10%",
// //   width: "500px",
// //   height: "500px",
// //   borderRadius: "50%",
// //   background:
// //     "radial-gradient(circle at 30% 30%, rgba(0,140,255,0.35), rgba(0,200,255,0.18), transparent)",
// //   filter: "blur(35px)",
// //   animation: "blobFloat 8s infinite"
// // };

// // const floatingCircle = {
// //   position: "absolute",
// //   right: "-5%",
// //   bottom: "0%",
// //   width: "400px",
// //   height: "400px",
// //   borderRadius: "50%",
// //   background:
// //     "radial-gradient(circle, rgba(0,200,255,0.25), rgba(0,140,255,0.1), transparent)",
// //   filter: "blur(25px)",
// //   animation: "circleFloat 10s infinite"
// // };

// // const floatingSquare = {
// //   position: "absolute",
// //   left: "20%",
// //   top: "35%",
// //   width: "120px",
// //   height: "120px",
// //   background: "rgba(0,170,255,0.25)",
// //   filter: "blur(15px)",
// //   transform: "rotate(15deg)",
// //   animation: "squareFloat 6s infinite"
// // };
// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

//   :root {
//     --ink: #0a0c09;
//     --cream: #f5f0e8;
//     --gold: #b8965a;
//     --gold-light: #d4b483;
//     --muted: #8a8680;
//     --surface: rgba(255,255,255,0.03);
//     --border: rgba(184,150,90,0.15);
//   }

//   * { box-sizing: border-box; margin: 0; padding: 0; }

//   .pz-hero {
//     position: relative;
//     width: 100%;
//     min-height: 100vh;
//     background: #0a0c09;
//     overflow: hidden;
//     display: flex;
//     align-items: center;
//     font-family: 'DM Sans', sans-serif;
//   }

//   /* ── Background grain texture ── */
//   .pz-hero::after {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
//     opacity: 0.04;
//     pointer-events: none;
//     z-index: 1;
//   }

//   /* ── Ambient glow ── */
//   .pz-glow-1 {
//     position: absolute;
//     width: 700px;
//     height: 700px;
//     border-radius: 50%;
//     background: radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 65%);
//     top: -200px;
//     left: -200px;
//     animation: pz-drift1 18s ease-in-out infinite;
//     pointer-events: none;
//   }

//   .pz-glow-2 {
//     position: absolute;
//     width: 600px;
//     height: 600px;
//     border-radius: 50%;
//     background: radial-gradient(circle, rgba(184,150,90,0.06) 0%, transparent 65%);
//     bottom: -150px;
//     right: -100px;
//     animation: pz-drift2 22s ease-in-out infinite;
//     pointer-events: none;
//   }

//   @keyframes pz-drift1 {
//     0%, 100% { transform: translate(0, 0); }
//     50% { transform: translate(60px, 40px); }
//   }
//   @keyframes pz-drift2 {
//     0%, 100% { transform: translate(0, 0); }
//     50% { transform: translate(-50px, -30px); }
//   }

//   /* ── Grid lines ── */
//   .pz-grid {
//     position: absolute;
//     inset: 0;
//     background-image:
//       linear-gradient(rgba(184,150,90,0.04) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(184,150,90,0.04) 1px, transparent 1px);
//     background-size: 80px 80px;
//     pointer-events: none;
//   }

//   /* ── Layout ── */
//   .pz-hero-inner {
//     position: relative;
//     z-index: 2;
//     width: 100%;
//     max-width: 1300px;
//     margin: 0 auto;
//     padding: 120px 60px 80px;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 80px;
//     align-items: center;
//   }

//   @media (max-width: 960px) {
//     .pz-hero-inner {
//       grid-template-columns: 1fr;
//       padding: 100px 32px 60px;
//       gap: 50px;
//     }
//     .pz-right { order: -1; }
//     .pz-image-frame { height: 380px; }
//   }

//   /* ── LEFT ── */
//   .pz-left {
//     opacity: 0;
//     transform: translateY(30px);
//     animation: pz-fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
//   }

//   @keyframes pz-fadeUp {
//     to { opacity: 1; transform: translateY(0); }
//   }

//   .pz-eyebrow {
//     display: inline-flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 28px;
//   }

//   .pz-eyebrow-line {
//     width: 32px;
//     height: 1px;
//     background: var(--gold);
//   }

//   .pz-eyebrow-text {
//     font-size: 11px;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     color: var(--gold);
//     font-weight: 400;
//   }

//   .pz-headline {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(52px, 6vw, 80px);
//     font-weight: 300;
//     line-height: 1.0;
//     color: var(--cream);
//     letter-spacing: -0.02em;
//     margin-bottom: 8px;
//   }

//   .pz-headline em {
//     font-style: italic;
//     color: var(--gold-light);
//   }

//   .pz-headline strong {
//     font-weight: 600;
//   }

//   /* ── Slide ticker ── */
//   .pz-ticker {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin: 24px 0 28px;
//     height: 36px;
//     overflow: hidden;
//   }

//   .pz-ticker-bar {
//     width: 2px;
//     height: 28px;
//     background: var(--gold);
//     border-radius: 2px;
//     flex-shrink: 0;
//   }

//   .pz-ticker-track {
//     position: relative;
//     height: 36px;
//     overflow: hidden;
//     flex: 1;
//   }

//   .pz-ticker-item {
//     position: absolute;
//     width: 100%;
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 22px;
//     font-weight: 400;
//     color: var(--cream);
//     letter-spacing: 0.03em;
//     display: flex;
//     align-items: center;
//     height: 36px;
//     transition: transform 0.6s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease;
//   }

//   .pz-ticker-item.active {
//     transform: translateY(0);
//     opacity: 1;
//   }

//   .pz-ticker-item.before {
//     transform: translateY(-100%);
//     opacity: 0;
//   }

//   .pz-ticker-item.after {
//     transform: translateY(100%);
//     opacity: 0;
//   }

//   /* ── Description ── */
//   .pz-desc {
//     font-size: 15px;
//     line-height: 1.85;
//     color: var(--muted);
//     font-weight: 300;
//     max-width: 440px;
//     margin-bottom: 36px;
//   }

//   /* ── Features ── */
//   .pz-features {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 10px;
//     margin-bottom: 44px;
//   }

//   .pz-feature {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 13px;
//     color: var(--muted);
//     font-weight: 300;
//   }

//   .pz-feature-dot {
//     width: 4px;
//     height: 4px;
//     background: var(--gold);
//     border-radius: 50%;
//     flex-shrink: 0;
//   }

//   /* ── Buttons ── */
//   .pz-buttons {
//     display: flex;
//     gap: 14px;
//     flex-wrap: wrap;
//   }

//   .pz-btn-primary {
//     display: inline-flex;
//     align-items: center;
//     gap: 10px;
//     padding: 16px 36px;
//     background: var(--gold);
//     color: var(--ink);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 500;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     border: none;
//     border-radius: 2px;
//     cursor: pointer;
//     text-decoration: none;
//     position: relative;
//     overflow: hidden;
//     transition: all 0.3s ease;
//   }

//   .pz-btn-primary::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: rgba(255,255,255,0.15);
//     transform: translateX(-100%);
//     transition: transform 0.4s ease;
//   }

//   .pz-btn-primary:hover::before { transform: translateX(0); }
//   .pz-btn-primary:hover { box-shadow: 0 8px 30px rgba(184,150,90,0.4); }

//   .pz-btn-secondary {
//     display: inline-flex;
//     align-items: center;
//     gap: 10px;
//     padding: 16px 36px;
//     background: transparent;
//     color: var(--cream);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 400;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     border: 1px solid var(--border);
//     border-radius: 2px;
//     cursor: pointer;
//     text-decoration: none;
//     transition: all 0.3s ease;
//   }

//   .pz-btn-secondary:hover {
//     border-color: var(--gold);
//     color: var(--gold-light);
//     background: rgba(184,150,90,0.06);
//   }

//   /* ── RIGHT IMAGE ── */
//   .pz-right {
//     opacity: 0;
//     transform: translateX(30px);
//     animation: pz-fadeRight 1s cubic-bezier(0.16,1,0.3,1) 0.4s forwards;
//   }

//   @keyframes pz-fadeRight {
//     to { opacity: 1; transform: translateX(0); }
//   }

//   .pz-image-frame {
//     position: relative;
//     height: 580px;
//     border-radius: 4px;
//     overflow: hidden;
//     border: 1px solid var(--border);
//   }

//   .pz-image-frame img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
//   }

//   .pz-image-frame img.changing {
//     opacity: 0;
//     transform: scale(1.04);
//   }

//   /* Gold corner accents */
//   .pz-corner {
//     position: absolute;
//     width: 24px;
//     height: 24px;
//     z-index: 3;
//   }
//   .pz-corner-tl { top: 14px; left: 14px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
//   .pz-corner-tr { top: 14px; right: 14px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
//   .pz-corner-bl { bottom: 14px; left: 14px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
//   .pz-corner-br { bottom: 14px; right: 14px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

//   /* Overlay gradient on image */
//   .pz-image-overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(to top, rgba(10,12,9,0.6) 0%, transparent 50%);
//     z-index: 2;
//   }

//   /* Image label */
//   .pz-image-label {
//     position: absolute;
//     bottom: 24px;
//     left: 24px;
//     z-index: 3;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .pz-label-type {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 20px;
//     font-weight: 300;
//     color: var(--cream);
//     letter-spacing: 0.04em;
//     opacity: 0;
//     animation: pz-fadeUp 0.6s ease forwards;
//   }

//   .pz-label-divider {
//     width: 1px;
//     height: 16px;
//     background: rgba(245,240,232,0.3);
//   }

//   .pz-label-count {
//     font-size: 11px;
//     letter-spacing: 0.15em;
//     color: var(--gold);
//     text-transform: uppercase;
//   }

//   /* Slide dots */
//   .pz-dots {
//     position: absolute;
//     top: 24px;
//     right: 24px;
//     z-index: 3;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//   }

//   .pz-dot {
//     width: 3px;
//     height: 20px;
//     background: rgba(245,240,232,0.2);
//     border-radius: 2px;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     position: relative;
//     overflow: hidden;
//   }

//   .pz-dot.active {
//     background: rgba(245,240,232,0.15);
//   }

//   .pz-dot-fill {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     background: var(--gold);
//     border-radius: 2px;
//     height: 0%;
//     transition: none;
//   }

//   .pz-dot.active .pz-dot-fill {
//     height: 100%;
//     transition: height 2.5s linear;
//   }

//   /* Stats strip */
//   .pz-stats {
//     display: flex;
//     gap: 0;
//     margin-top: 56px;
//     border-top: 1px solid var(--border);
//     padding-top: 40px;
//     opacity: 0;
//     animation: pz-fadeUp 0.9s ease 0.8s forwards;
//   }

//   .pz-stat {
//     flex: 1;
//     padding-right: 32px;
//     border-right: 1px solid var(--border);
//   }

//   .pz-stat:last-child { border-right: none; padding-left: 32px; padding-right: 0; }
//   .pz-stat:not(:first-child):not(:last-child) { padding-left: 32px; }

//   .pz-stat-number {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 36px;
//     font-weight: 300;
//     color: var(--cream);
//     line-height: 1;
//     margin-bottom: 4px;
//   }

//   .pz-stat-number span {
//     color: var(--gold);
//   }

//   .pz-stat-label {
//     font-size: 11px;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: var(--muted);
//     font-weight: 400;
//   }
// `;

// const SLIDES = [
//   { text: "Luxury Villas", img: "Villa.jpg",       count: "01 / 04" },
//   { text: "Smart Apartments", img: "Apartment.jpg", count: "02 / 04" },
//   { text: "Premium Penthouses", img: "Penthouse.jpg", count: "03 / 04" },
//   { text: "Modern Family Homes", img: "Modernhouse.jpg", count: "04 / 04" },
// ];

// const FEATURES = [
//   "Verified property listings",
//   "Professional consultation",
//   "Tailored recommendations",
//   "Safe legal documentation",
// ];

// const STATS = [
//   { number: "12K", suffix: "+", label: "Properties Listed" },
//   { number: "98",  suffix: "%", label: "Client Satisfaction" },
//   { number: "8",   suffix: "Y", label: "Years of Trust" },
// ];

// export default function Hero() {
//   const [index, setIndex] = useState(0);
//   const [changing, setChanging] = useState(false);
//   const [dotKey, setDotKey] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setChanging(true);
//       setTimeout(() => {
//         setIndex((p) => (p + 1) % SLIDES.length);
//         setChanging(false);
//         setDotKey((k) => k + 1);
//       }, 400);
//     }, 2500);
//     return () => clearInterval(t);
//   }, []);

//   const goTo = (i) => {
//     if (i === index) return;
//     setChanging(true);
//     setTimeout(() => {
//       setIndex(i);
//       setChanging(false);
//       setDotKey((k) => k + 1);
//     }, 400);
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <section className="pz-hero">
//         <div className="pz-glow-1" />
//         <div className="pz-glow-2" />
//         <div className="pz-grid" />

//         <div className="pz-hero-inner">

//           {/* ── LEFT ── */}
//           <div className="pz-left">
//             <div className="pz-eyebrow">
//               <span className="pz-eyebrow-line" />
//               <span className="pz-eyebrow-text">Premium Real Estate · Mumbai</span>
//             </div>

//             <h1 className="pz-headline">
//               Find Your<br />
//               <em>Dream Home</em><br />
//               <strong>with PropZo</strong>
//             </h1>

//             {/* Animated ticker */}
//             <div className="pz-ticker">
//               <div className="pz-ticker-bar" />
//               <div className="pz-ticker-track">
//                 {SLIDES.map((s, i) => (
//                   <div
//                     key={i}
//                     className={`pz-ticker-item ${
//                       i === index ? "active" : i < index ? "before" : "after"
//                     }`}
//                   >
//                     {s.text}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <p className="pz-desc">
//               Discover hand-picked premium properties in prime locations. PropZo connects
//               you with verified sellers, trusted agents, and transparent transactions
//               for a seamless real-estate journey.
//             </p>

//             <div className="pz-features">
//               {FEATURES.map((f) => (
//                 <div key={f} className="pz-feature">
//                   <span className="pz-feature-dot" />
//                   {f}
//                 </div>
//               ))}
//             </div>

//             <div className="pz-buttons">
//               <Link to="/menu" style={{ textDecoration: "none" }}>
//                 <button className="pz-btn-primary">
//                   Explore Properties
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </Link>
//               <Link to="/agent" style={{ textDecoration: "none" }}>
//                 <button className="pz-btn-secondary">Talk to Agent</button>
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="pz-stats">
//               {STATS.map((s) => (
//                 <div key={s.label} className="pz-stat">
//                   <div className="pz-stat-number">
//                     {s.number}<span>{s.suffix}</span>
//                   </div>
//                   <div className="pz-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT IMAGE ── */}
//           <div className="pz-right">
//             <div className="pz-image-frame">
//               {/* Corner accents */}
//               <div className="pz-corner pz-corner-tl" />
//               <div className="pz-corner pz-corner-tr" />
//               <div className="pz-corner pz-corner-bl" />
//               <div className="pz-corner pz-corner-br" />

//               <img
//                 src={SLIDES[index].img}
//                 alt={SLIDES[index].text}
//                 className={changing ? "changing" : ""}
//               />
//               <div className="pz-image-overlay" />

//               {/* Slide label */}
//               <div className="pz-image-label">
//                 <div key={index} className="pz-label-type">{SLIDES[index].text}</div>
//                 <div className="pz-label-divider" />
//                 <div className="pz-label-count">{SLIDES[index].count}</div>
//               </div>

//               {/* Vertical progress dots */}
//               <div className="pz-dots">
//                 {SLIDES.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`pz-dot ${i === index ? "active" : ""}`}
//                     onClick={() => goTo(i)}
//                   >
//                     <div key={i === index ? dotKey : i} className="pz-dot-fill" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #2c2416;
    --cream: #faf8f4;
    --gold: #8a6a28;
    --gold-light: #a07830;
    --muted: #6b5e4a;
    --muted-light: #9c8e7a;
    --surface: rgba(138,106,40,0.05);
    --border: rgba(138,106,40,0.16);
    --bg: #f5f1ea;
    --bg-deep: #ede8de;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pz-hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    overflow: hidden;
    display: flex;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Background grain texture ── */
  .pz-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
    z-index: 1;
  }

  /* ── Ambient glow ── */
  .pz-glow-1 {
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(138,106,40,0.07) 0%, transparent 65%);
    top: -200px;
    left: -200px;
    animation: pz-drift1 18s ease-in-out infinite;
    pointer-events: none;
  }

  .pz-glow-2 {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(138,106,40,0.05) 0%, transparent 65%);
    bottom: -150px;
    right: -100px;
    animation: pz-drift2 22s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pz-drift1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(60px, 40px); }
  }
  @keyframes pz-drift2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-50px, -30px); }
  }

  /* ── Grid lines ── */
  .pz-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(138,106,40,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(138,106,40,0.06) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
  }

  /* ── Layout ── */
  .pz-hero-inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 120px 60px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  @media (max-width: 960px) {
    .pz-hero-inner {
      grid-template-columns: 1fr;
      padding: 100px 32px 60px;
      gap: 50px;
    }
    .pz-right { order: -1; }
    .pz-image-frame { height: 380px; }
  }

  /* ── LEFT ── */
  .pz-left {
    opacity: 0;
    transform: translateY(30px);
    animation: pz-fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }

  @keyframes pz-fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  .pz-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }

  .pz-eyebrow-line {
    width: 32px;
    height: 1px;
    background: var(--gold);
  }

  .pz-eyebrow-text {
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
  }

  .pz-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 6vw, 80px);
    font-weight: 300;
    line-height: 1.0;
    color: #2c2416;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }

  .pz-headline em {
    font-style: italic;
    color: var(--gold-light);
  }

  .pz-headline strong {
    font-weight: 600;
    color: #2c2416;
  }

  /* ── Slide ticker ── */
  .pz-ticker {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 28px;
    height: 36px;
    overflow: hidden;
  }

  .pz-ticker-bar {
    width: 2px;
    height: 28px;
    background: var(--gold);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .pz-ticker-track {
    position: relative;
    height: 36px;
    overflow: hidden;
    flex: 1;
  }

  .pz-ticker-item {
    position: absolute;
    width: 100%;
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    color: #2c2416;
    letter-spacing: 0.03em;
    display: flex;
    align-items: center;
    height: 36px;
    transition: transform 0.6s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease;
  }

  .pz-ticker-item.active {
    transform: translateY(0);
    opacity: 1;
  }

  .pz-ticker-item.before {
    transform: translateY(-100%);
    opacity: 0;
  }

  .pz-ticker-item.after {
    transform: translateY(100%);
    opacity: 0;
  }

  /* ── Description ── */
  .pz-desc {
    font-size: 15px;
    line-height: 1.85;
    color: #6b5e4a;
    font-weight: 300;
    max-width: 440px;
    margin-bottom: 36px;
  }

  /* ── Features ── */
  .pz-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 44px;
  }

  .pz-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #6b5e4a;
    font-weight: 300;
  }

  .pz-feature-dot {
    width: 4px;
    height: 4px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── Buttons ── */
  .pz-buttons {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  .pz-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    background: var(--gold);
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .pz-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.15);
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }

  .pz-btn-primary:hover::before { transform: translateX(0); }
  .pz-btn-primary:hover { box-shadow: 0 8px 30px rgba(138,106,40,0.35); }

  .pz-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    background: transparent;
    color: #2c2416;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .pz-btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold-light);
    background: rgba(138,106,40,0.06);
  }

  /* ── RIGHT IMAGE ── */
  .pz-right {
    opacity: 0;
    transform: translateX(30px);
    animation: pz-fadeRight 1s cubic-bezier(0.16,1,0.3,1) 0.4s forwards;
  }

  @keyframes pz-fadeRight {
    to { opacity: 1; transform: translateX(0); }
  }

  .pz-image-frame {
    position: relative;
    height: 580px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 16px 56px rgba(138,106,40,0.10);
  }

  .pz-image-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
  }

  .pz-image-frame img.changing {
    opacity: 0;
    transform: scale(1.04);
  }

  /* Gold corner accents */
  .pz-corner {
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 3;
  }
  .pz-corner-tl { top: 14px; left: 14px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
  .pz-corner-tr { top: 14px; right: 14px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
  .pz-corner-bl { bottom: 14px; left: 14px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
  .pz-corner-br { bottom: 14px; right: 14px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

  /* Overlay gradient on image — lighter for light theme */
  .pz-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(44,36,22,0.55) 0%, transparent 50%);
    z-index: 2;
  }

  /* Image label */
  .pz-image-label {
    position: absolute;
    bottom: 24px;
    left: 24px;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pz-label-type {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #faf8f4;
    letter-spacing: 0.04em;
    opacity: 0;
    animation: pz-fadeUp 0.6s ease forwards;
  }

  .pz-label-divider {
    width: 1px;
    height: 16px;
    background: rgba(250,248,244,0.4);
  }

  .pz-label-count {
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--gold-light);
    text-transform: uppercase;
  }

  /* Slide dots */
  .pz-dots {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pz-dot {
    width: 3px;
    height: 20px;
    background: rgba(250,248,244,0.25);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .pz-dot.active {
    background: rgba(250,248,244,0.2);
  }

  .pz-dot-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--gold-light);
    border-radius: 2px;
    height: 0%;
    transition: none;
  }

  .pz-dot.active .pz-dot-fill {
    height: 100%;
    transition: height 2.5s linear;
  }

  /* Stats strip */
  .pz-stats {
    display: flex;
    gap: 0;
    margin-top: 56px;
    border-top: 1px solid var(--border);
    padding-top: 40px;
    opacity: 0;
    animation: pz-fadeUp 0.9s ease 0.8s forwards;
  }

  .pz-stat {
    flex: 1;
    padding-right: 32px;
    border-right: 1px solid var(--border);
  }

  .pz-stat:last-child { border-right: none; padding-left: 32px; padding-right: 0; }
  .pz-stat:not(:first-child):not(:last-child) { padding-left: 32px; }

  .pz-stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #2c2416;
    line-height: 1;
    margin-bottom: 4px;
  }

  .pz-stat-number span {
    color: var(--gold);
  }

  .pz-stat-label {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #9c8e7a;
    font-weight: 400;
  }
`;

const SLIDES = [
  { text: "Luxury Villas",        img: "Villa.jpg",        count: "01 / 04" },
  { text: "Smart Apartments",     img: "Apartment.jpg",    count: "02 / 04" },
  { text: "Premium Penthouses",   img: "Penthouse.jpg",    count: "03 / 04" },
  { text: "Modern Family Homes",  img: "Modernhouse.jpg",  count: "04 / 04" },
];

const FEATURES = [
  "Verified property listings",
  "Professional consultation",
  "Tailored recommendations",
  "Safe legal documentation",
];

const STATS = [
  { number: "12K", suffix: "+", label: "Properties Listed" },
  { number: "98",  suffix: "%", label: "Client Satisfaction" },
  { number: "8",   suffix: "Y", label: "Years of Trust" },
];

export default function Hero() {
  const [index, setIndex]     = useState(0);
  const [changing, setChanging] = useState(false);
  const [dotKey, setDotKey]   = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setChanging(true);
      setTimeout(() => {
        setIndex((p) => (p + 1) % SLIDES.length);
        setChanging(false);
        setDotKey((k) => k + 1);
      }, 400);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => {
    if (i === index) return;
    setChanging(true);
    setTimeout(() => {
      setIndex(i);
      setChanging(false);
      setDotKey((k) => k + 1);
    }, 400);
  };

  return (
    <>
      <style>{css}</style>
      <section className="pz-hero">
        <div className="pz-glow-1" />
        <div className="pz-glow-2" />
        <div className="pz-grid" />

        <div className="pz-hero-inner">

          {/* ── LEFT ── */}
          <div className="pz-left">
            <div className="pz-eyebrow">
              <span className="pz-eyebrow-line" />
              <span className="pz-eyebrow-text">Premium Real Estate · Mumbai</span>
            </div>

            <h1 className="pz-headline">
              Find Your<br />
              <em>Dream Home</em><br />
              <strong>with PropZo</strong>
            </h1>

            {/* Animated ticker */}
            <div className="pz-ticker">
              <div className="pz-ticker-bar" />
              <div className="pz-ticker-track">
                {SLIDES.map((s, i) => (
                  <div
                    key={i}
                    className={`pz-ticker-item ${
                      i === index ? "active" : i < index ? "before" : "after"
                    }`}
                  >
                    {s.text}
                  </div>
                ))}
              </div>
            </div>

            <p className="pz-desc">
              Discover hand-picked premium properties in prime locations. PropZo connects
              you with verified sellers, trusted agents, and transparent transactions
              for a seamless real-estate journey.
            </p>

            <div className="pz-features">
              {FEATURES.map((f) => (
                <div key={f} className="pz-feature">
                  <span className="pz-feature-dot" />
                  {f}
                </div>
              ))}
            </div>

            <div className="pz-buttons">
              <Link to="/menu" style={{ textDecoration: "none" }}>
                <button className="pz-btn-primary">
                  Explore Properties
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <Link to="/agent" style={{ textDecoration: "none" }}>
                <button className="pz-btn-secondary">Talk to Agent</button>
              </Link>
            </div>

            {/* Stats */}
            <div className="pz-stats">
              {STATS.map((s) => (
                <div key={s.label} className="pz-stat">
                  <div className="pz-stat-number">
                    {s.number}<span>{s.suffix}</span>
                  </div>
                  <div className="pz-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="pz-right">
            <div className="pz-image-frame">
              <div className="pz-corner pz-corner-tl" />
              <div className="pz-corner pz-corner-tr" />
              <div className="pz-corner pz-corner-bl" />
              <div className="pz-corner pz-corner-br" />

              <img
                src={SLIDES[index].img}
                alt={SLIDES[index].text}
                className={changing ? "changing" : ""}
              />
              <div className="pz-image-overlay" />

              <div className="pz-image-label">
                <div key={index} className="pz-label-type">{SLIDES[index].text}</div>
                <div className="pz-label-divider" />
                <div className="pz-label-count">{SLIDES[index].count}</div>
              </div>

              <div className="pz-dots">
                {SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`pz-dot ${i === index ? "active" : ""}`}
                    onClick={() => goTo(i)}
                  >
                    <div key={i === index ? dotKey : i} className="pz-dot-fill" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
