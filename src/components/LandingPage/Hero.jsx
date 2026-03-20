
// // // import React, { useEffect, useState, useRef } from "react";
// // // import { Link } from "react-router-dom";

// // // const css = `
// // //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

// // //   :root {
// // //     --ink: #2c2416;
// // //     --cream: #faf8f4;
// // //     --gold: #8a6a28;
// // //     --gold-light: #a07830;
// // //     --muted: #6b5e4a;
// // //     --muted-light: #9c8e7a;
// // //     --surface: rgba(138,106,40,0.05);
// // //     --border: rgba(138,106,40,0.16);
// // //     --bg: #f5f1ea;
// // //     --bg-deep: #ede8de;
// // //   }

// // //   * { box-sizing: border-box; margin: 0; padding: 0; }

// // //   .pz-hero {
// // //     position: relative;
// // //     width: 100%;
// // //     min-height: 100vh;
// // //     background: var(--bg);
// // //     overflow: hidden;
// // //     display: flex;
// // //     align-items: center;
// // //     font-family: 'DM Sans', sans-serif;
// // //   }

// // //   /* ── Background grain texture ── */
// // //   .pz-hero::after {
// // //     content: '';
// // //     position: absolute;
// // //     inset: 0;
// // //     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
// // //     opacity: 0.025;
// // //     pointer-events: none;
// // //     z-index: 1;
// // //   }

// // //   /* ── Ambient glow ── */
// // //   .pz-glow-1 {
// // //     position: absolute;
// // //     width: 700px;
// // //     height: 700px;
// // //     border-radius: 50%;
// // //     background: radial-gradient(circle, rgba(138,106,40,0.07) 0%, transparent 65%);
// // //     top: -200px;
// // //     left: -200px;
// // //     animation: pz-drift1 18s ease-in-out infinite;
// // //     pointer-events: none;
// // //   }

// // //   .pz-glow-2 {
// // //     position: absolute;
// // //     width: 600px;
// // //     height: 600px;
// // //     border-radius: 50%;
// // //     background: radial-gradient(circle, rgba(138,106,40,0.05) 0%, transparent 65%);
// // //     bottom: -150px;
// // //     right: -100px;
// // //     animation: pz-drift2 22s ease-in-out infinite;
// // //     pointer-events: none;
// // //   }

// // //   @keyframes pz-drift1 {
// // //     0%, 100% { transform: translate(0, 0); }
// // //     50% { transform: translate(60px, 40px); }
// // //   }
// // //   @keyframes pz-drift2 {
// // //     0%, 100% { transform: translate(0, 0); }
// // //     50% { transform: translate(-50px, -30px); }
// // //   }

// // //   /* ── Grid lines ── */
// // //   .pz-grid {
// // //     position: absolute;
// // //     inset: 0;
// // //     background-image:
// // //       linear-gradient(rgba(138,106,40,0.06) 1px, transparent 1px),
// // //       linear-gradient(90deg, rgba(138,106,40,0.06) 1px, transparent 1px);
// // //     background-size: 80px 80px;
// // //     pointer-events: none;
// // //   }

// // //   /* ── Layout ── */
// // //   .pz-hero-inner {
// // //     position: relative;
// // //     z-index: 2;
// // //     width: 100%;
// // //     max-width: 1300px;
// // //     margin: 0 auto;
// // //     padding: 120px 60px 80px;
// // //     display: grid;
// // //     grid-template-columns: 1fr 1fr;
// // //     gap: 80px;
// // //     align-items: center;
// // //   }

// // //   @media (max-width: 960px) {
// // //     .pz-hero-inner {
// // //       grid-template-columns: 1fr;
// // //       padding: 100px 32px 60px;
// // //       gap: 50px;
// // //     }
// // //     .pz-right { order: -1; }
// // //     .pz-image-frame { height: 380px; }
// // //   }

// // //   /* ── LEFT ── */
// // //   .pz-left {
// // //     opacity: 0;
// // //     transform: translateY(30px);
// // //     animation: pz-fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
// // //   }

// // //   @keyframes pz-fadeUp {
// // //     to { opacity: 1; transform: translateY(0); }
// // //   }

// // //   .pz-eyebrow {
// // //     display: inline-flex;
// // //     align-items: center;
// // //     gap: 10px;
// // //     margin-bottom: 28px;
// // //   }

// // //   .pz-eyebrow-line {
// // //     width: 32px;
// // //     height: 1px;
// // //     background: var(--gold);
// // //   }

// // //   .pz-eyebrow-text {
// // //     font-size: 11px;
// // //     letter-spacing: 0.22em;
// // //     text-transform: uppercase;
// // //     color: var(--gold);
// // //     font-weight: 500;
// // //   }

// // //   .pz-headline {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: clamp(52px, 6vw, 80px);
// // //     font-weight: 300;
// // //     line-height: 1.0;
// // //     color: #2c2416;
// // //     letter-spacing: -0.02em;
// // //     margin-bottom: 8px;
// // //   }

// // //   .pz-headline em {
// // //     font-style: italic;
// // //     color: var(--gold-light);
// // //   }

// // //   .pz-headline strong {
// // //     font-weight: 600;
// // //     color: #2c2416;
// // //   }

// // //   /* ── Slide ticker ── */
// // //   .pz-ticker {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 12px;
// // //     margin: 24px 0 28px;
// // //     height: 36px;
// // //     overflow: hidden;
// // //   }

// // //   .pz-ticker-bar {
// // //     width: 2px;
// // //     height: 28px;
// // //     background: var(--gold);
// // //     border-radius: 2px;
// // //     flex-shrink: 0;
// // //   }

// // //   .pz-ticker-track {
// // //     position: relative;
// // //     height: 36px;
// // //     overflow: hidden;
// // //     flex: 1;
// // //   }

// // //   .pz-ticker-item {
// // //     position: absolute;
// // //     width: 100%;
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 22px;
// // //     font-weight: 400;
// // //     color: #2c2416;
// // //     letter-spacing: 0.03em;
// // //     display: flex;
// // //     align-items: center;
// // //     height: 36px;
// // //     transition: transform 0.6s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease;
// // //   }

// // //   .pz-ticker-item.active {
// // //     transform: translateY(0);
// // //     opacity: 1;
// // //   }

// // //   .pz-ticker-item.before {
// // //     transform: translateY(-100%);
// // //     opacity: 0;
// // //   }

// // //   .pz-ticker-item.after {
// // //     transform: translateY(100%);
// // //     opacity: 0;
// // //   }

// // //   /* ── Description ── */
// // //   .pz-desc {
// // //     font-size: 15px;
// // //     line-height: 1.85;
// // //     color: #6b5e4a;
// // //     font-weight: 300;
// // //     max-width: 440px;
// // //     margin-bottom: 36px;
// // //   }

// // //   /* ── Features ── */
// // //   .pz-features {
// // //     display: grid;
// // //     grid-template-columns: 1fr 1fr;
// // //     gap: 10px;
// // //     margin-bottom: 44px;
// // //   }

// // //   .pz-feature {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 10px;
// // //     font-size: 13px;
// // //     color: #6b5e4a;
// // //     font-weight: 300;
// // //   }

// // //   .pz-feature-dot {
// // //     width: 4px;
// // //     height: 4px;
// // //     background: var(--gold);
// // //     border-radius: 50%;
// // //     flex-shrink: 0;
// // //   }

// // //   /* ── Buttons ── */
// // //   .pz-buttons {
// // //     display: flex;
// // //     gap: 14px;
// // //     flex-wrap: wrap;
// // //   }

// // //   .pz-btn-primary {
// // //     display: inline-flex;
// // //     align-items: center;
// // //     gap: 10px;
// // //     padding: 16px 36px;
// // //     background: var(--gold);
// // //     color: #ffffff;
// // //     font-family: 'DM Sans', sans-serif;
// // //     font-size: 13px;
// // //     font-weight: 500;
// // //     letter-spacing: 0.1em;
// // //     text-transform: uppercase;
// // //     border: none;
// // //     border-radius: 2px;
// // //     cursor: pointer;
// // //     text-decoration: none;
// // //     position: relative;
// // //     overflow: hidden;
// // //     transition: all 0.3s ease;
// // //   }

// // //   .pz-btn-primary::before {
// // //     content: '';
// // //     position: absolute;
// // //     inset: 0;
// // //     background: rgba(255,255,255,0.15);
// // //     transform: translateX(-100%);
// // //     transition: transform 0.4s ease;
// // //   }

// // //   .pz-btn-primary:hover::before { transform: translateX(0); }
// // //   .pz-btn-primary:hover { box-shadow: 0 8px 30px rgba(138,106,40,0.35); }

// // //   .pz-btn-secondary {
// // //     display: inline-flex;
// // //     align-items: center;
// // //     gap: 10px;
// // //     padding: 16px 36px;
// // //     background: transparent;
// // //     color: #2c2416;
// // //     font-family: 'DM Sans', sans-serif;
// // //     font-size: 13px;
// // //     font-weight: 400;
// // //     letter-spacing: 0.1em;
// // //     text-transform: uppercase;
// // //     border: 1px solid var(--border);
// // //     border-radius: 2px;
// // //     cursor: pointer;
// // //     text-decoration: none;
// // //     transition: all 0.3s ease;
// // //   }

// // //   .pz-btn-secondary:hover {
// // //     border-color: var(--gold);
// // //     color: var(--gold-light);
// // //     background: rgba(138,106,40,0.06);
// // //   }

// // //   /* ── RIGHT IMAGE ── */
// // //   .pz-right {
// // //     opacity: 0;
// // //     transform: translateX(30px);
// // //     animation: pz-fadeRight 1s cubic-bezier(0.16,1,0.3,1) 0.4s forwards;
// // //   }

// // //   @keyframes pz-fadeRight {
// // //     to { opacity: 1; transform: translateX(0); }
// // //   }

// // //   .pz-image-frame {
// // //     position: relative;
// // //     height: 580px;
// // //     border-radius: 4px;
// // //     overflow: hidden;
// // //     border: 1px solid var(--border);
// // //     box-shadow: 0 16px 56px rgba(138,106,40,0.10);
// // //   }

// // //   .pz-image-frame img {
// // //     width: 100%;
// // //     height: 100%;
// // //     object-fit: cover;
// // //     transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
// // //   }

// // //   .pz-image-frame img.changing {
// // //     opacity: 0;
// // //     transform: scale(1.04);
// // //   }

// // //   /* Gold corner accents */
// // //   .pz-corner {
// // //     position: absolute;
// // //     width: 24px;
// // //     height: 24px;
// // //     z-index: 3;
// // //   }
// // //   .pz-corner-tl { top: 14px; left: 14px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
// // //   .pz-corner-tr { top: 14px; right: 14px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
// // //   .pz-corner-bl { bottom: 14px; left: 14px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
// // //   .pz-corner-br { bottom: 14px; right: 14px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

// // //   /* Overlay gradient on image — lighter for light theme */
// // //   .pz-image-overlay {
// // //     position: absolute;
// // //     inset: 0;
// // //     background: linear-gradient(to top, rgba(44,36,22,0.55) 0%, transparent 50%);
// // //     z-index: 2;
// // //   }

// // //   /* Image label */
// // //   .pz-image-label {
// // //     position: absolute;
// // //     bottom: 24px;
// // //     left: 24px;
// // //     z-index: 3;
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 10px;
// // //   }

// // //   .pz-label-type {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 20px;
// // //     font-weight: 300;
// // //     color: #faf8f4;
// // //     letter-spacing: 0.04em;
// // //     opacity: 0;
// // //     animation: pz-fadeUp 0.6s ease forwards;
// // //   }

// // //   .pz-label-divider {
// // //     width: 1px;
// // //     height: 16px;
// // //     background: rgba(250,248,244,0.4);
// // //   }

// // //   .pz-label-count {
// // //     font-size: 11px;
// // //     letter-spacing: 0.15em;
// // //     color: var(--gold-light);
// // //     text-transform: uppercase;
// // //   }

// // //   /* Slide dots */
// // //   .pz-dots {
// // //     position: absolute;
// // //     top: 24px;
// // //     right: 24px;
// // //     z-index: 3;
// // //     display: flex;
// // //     flex-direction: column;
// // //     gap: 6px;
// // //   }

// // //   .pz-dot {
// // //     width: 3px;
// // //     height: 20px;
// // //     background: rgba(250,248,244,0.25);
// // //     border-radius: 2px;
// // //     cursor: pointer;
// // //     transition: all 0.3s ease;
// // //     position: relative;
// // //     overflow: hidden;
// // //   }

// // //   .pz-dot.active {
// // //     background: rgba(250,248,244,0.2);
// // //   }

// // //   .pz-dot-fill {
// // //     position: absolute;
// // //     top: 0;
// // //     left: 0;
// // //     width: 100%;
// // //     background: var(--gold-light);
// // //     border-radius: 2px;
// // //     height: 0%;
// // //     transition: none;
// // //   }

// // //   .pz-dot.active .pz-dot-fill {
// // //     height: 100%;
// // //     transition: height 2.5s linear;
// // //   }

// // //   /* Stats strip */
// // //   .pz-stats {
// // //     display: flex;
// // //     gap: 0;
// // //     margin-top: 56px;
// // //     border-top: 1px solid var(--border);
// // //     padding-top: 40px;
// // //     opacity: 0;
// // //     animation: pz-fadeUp 0.9s ease 0.8s forwards;
// // //   }

// // //   .pz-stat {
// // //     flex: 1;
// // //     padding-right: 32px;
// // //     border-right: 1px solid var(--border);
// // //   }

// // //   .pz-stat:last-child { border-right: none; padding-left: 32px; padding-right: 0; }
// // //   .pz-stat:not(:first-child):not(:last-child) { padding-left: 32px; }

// // //   .pz-stat-number {
// // //     font-family: 'Cormorant Garamond', serif;
// // //     font-size: 36px;
// // //     font-weight: 300;
// // //     color: #2c2416;
// // //     line-height: 1;
// // //     margin-bottom: 4px;
// // //   }

// // //   .pz-stat-number span {
// // //     color: var(--gold);
// // //   }

// // //   .pz-stat-label {
// // //     font-size: 11px;
// // //     letter-spacing: 0.14em;
// // //     text-transform: uppercase;
// // //     color: #9c8e7a;
// // //     font-weight: 400;
// // //   }
// // // `;

// // // const SLIDES = [
// // //   { text: "Luxury Villas",        img: "Villa.jpg",        count: "01 / 04" },
// // //   { text: "Smart Apartments",     img: "Apartment.jpg",    count: "02 / 04" },
// // //   { text: "Premium Penthouses",   img: "Penthouse.jpg",    count: "03 / 04" },
// // //   { text: "Modern Family Homes",  img: "Modernhouse.jpg",  count: "04 / 04" },
// // // ];

// // // const FEATURES = [
// // //   "Verified property listings",
// // //   "Professional consultation",
// // //   "Tailored recommendations",
// // //   "Safe legal documentation",
// // // ];

// // // const STATS = [
// // //   { number: "12K", suffix: "+", label: "Properties Listed" },
// // //   { number: "98",  suffix: "%", label: "Client Satisfaction" },
// // //   { number: "8",   suffix: "Y", label: "Years of Trust" },
// // // ];

// // // export default function Hero() {
// // //   const [index, setIndex]     = useState(0);
// // //   const [changing, setChanging] = useState(false);
// // //   const [dotKey, setDotKey]   = useState(0);

// // //   useEffect(() => {
// // //     const t = setInterval(() => {
// // //       setChanging(true);
// // //       setTimeout(() => {
// // //         setIndex((p) => (p + 1) % SLIDES.length);
// // //         setChanging(false);
// // //         setDotKey((k) => k + 1);
// // //       }, 400);
// // //     }, 2500);
// // //     return () => clearInterval(t);
// // //   }, []);

// // //   const goTo = (i) => {
// // //     if (i === index) return;
// // //     setChanging(true);
// // //     setTimeout(() => {
// // //       setIndex(i);
// // //       setChanging(false);
// // //       setDotKey((k) => k + 1);
// // //     }, 400);
// // //   };

// // //   return (
// // //     <>
// // //       <style>{css}</style>
// // //       <section className="pz-hero">
// // //         <div className="pz-glow-1" />
// // //         <div className="pz-glow-2" />
// // //         <div className="pz-grid" />

// // //         <div className="pz-hero-inner">

// // //           {/* ── LEFT ── */}
// // //           <div className="pz-left">
// // //             <div className="pz-eyebrow">
// // //               <span className="pz-eyebrow-line" />
// // //               <span className="pz-eyebrow-text">Premium Real Estate · Mumbai</span>
// // //             </div>

// // //             <h1 className="pz-headline">
// // //               Find Your<br />
// // //               <em>Dream Home</em><br />
// // //               <strong>with PropZo</strong>
// // //             </h1>

// // //             {/* Animated ticker */}
// // //             <div className="pz-ticker">
// // //               <div className="pz-ticker-bar" />
// // //               <div className="pz-ticker-track">
// // //                 {SLIDES.map((s, i) => (
// // //                   <div
// // //                     key={i}
// // //                     className={`pz-ticker-item ${
// // //                       i === index ? "active" : i < index ? "before" : "after"
// // //                     }`}
// // //                   >
// // //                     {s.text}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <p className="pz-desc">
// // //               Discover hand-picked premium properties in prime locations. PropZo connects
// // //               you with verified sellers, trusted agents, and transparent transactions
// // //               for a seamless real-estate journey.
// // //             </p>

// // //             <div className="pz-features">
// // //               {FEATURES.map((f) => (
// // //                 <div key={f} className="pz-feature">
// // //                   <span className="pz-feature-dot" />
// // //                   {f}
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <div className="pz-buttons">
// // //               <Link to="/menu" style={{ textDecoration: "none" }}>
// // //                 <button className="pz-btn-primary">
// // //                   Explore Properties
// // //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                     <path d="M5 12h14M12 5l7 7-7 7" />
// // //                   </svg>
// // //                 </button>
// // //               </Link>
// // //               <Link to="/agent" style={{ textDecoration: "none" }}>
// // //                 <button className="pz-btn-secondary">Talk to Agent</button>
// // //               </Link>
// // //             </div>

// // //             {/* Stats */}
// // //             <div className="pz-stats">
// // //               {STATS.map((s) => (
// // //                 <div key={s.label} className="pz-stat">
// // //                   <div className="pz-stat-number">
// // //                     {s.number}<span>{s.suffix}</span>
// // //                   </div>
// // //                   <div className="pz-stat-label">{s.label}</div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* ── RIGHT IMAGE ── */}
// // //           <div className="pz-right">
// // //             <div className="pz-image-frame">
// // //               <div className="pz-corner pz-corner-tl" />
// // //               <div className="pz-corner pz-corner-tr" />
// // //               <div className="pz-corner pz-corner-bl" />
// // //               <div className="pz-corner pz-corner-br" />

// // //               <img
// // //                 src={SLIDES[index].img}
// // //                 alt={SLIDES[index].text}
// // //                 className={changing ? "changing" : ""}
// // //               />
// // //               <div className="pz-image-overlay" />

// // //               <div className="pz-image-label">
// // //                 <div key={index} className="pz-label-type">{SLIDES[index].text}</div>
// // //                 <div className="pz-label-divider" />
// // //                 <div className="pz-label-count">{SLIDES[index].count}</div>
// // //               </div>

// // //               <div className="pz-dots">
// // //                 {SLIDES.map((_, i) => (
// // //                   <div
// // //                     key={i}
// // //                     className={`pz-dot ${i === index ? "active" : ""}`}
// // //                     onClick={() => goTo(i)}
// // //                   >
// // //                     <div key={i === index ? dotKey : i} className="pz-dot-fill" />
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </section>
// // //     </>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";

// // const css = `
// //   @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

// //   :root {
// //     --gold: #c9a84c;
// //     --gold-dim: rgba(201,168,76,0.75);
// //     --white: #ffffff;
// //     --white-dim: rgba(255,255,255,0.65);
// //     --white-faint: rgba(255,255,255,0.18);
// //     --dark: rgba(0,0,0,0.55);
// //   }

// //   * { box-sizing: border-box; margin: 0; padding: 0; }

// //   /* ── Hero wrapper ── */
// //   .lv-hero {
// //     position: relative;
// //     width: 100%;
// //     height: 100vh;
// //     min-height: 560px;
// //     overflow: hidden;
// //     font-family: 'DM Sans', sans-serif;
// //     color: var(--white);
// //   }

// //   /* ── Background image stack ── */
// //   .lv-bg {
// //     position: absolute;
// //     inset: 0;
// //     z-index: 0;
// //   }

// //   .lv-bg-img {
// //     position: absolute;
// //     inset: 0;
// //     width: 100%;
// //     height: 100%;
// //     object-fit: cover;
// //     opacity: 0;
// //     transition: opacity 0.35s ease;
// //   }

// //   .lv-bg-img.visible {
// //     opacity: 1;
// //   }

// //   /* Dark gradient overlay — heavier at bottom */
// //   .lv-overlay {
// //     position: absolute;
// //     inset: 0;
// //     z-index: 1;
// //     background: linear-gradient(
// //       to bottom,
// //       rgba(0,0,0,0.10) 0%,
// //       rgba(0,0,0,0.08) 40%,
// //       rgba(0,0,0,0.60) 72%,
// //       rgba(0,0,0,0.82) 100%
// //     );
// //   }

// //   /* Subtle vignette sides */
// //   .lv-vignette {
// //     position: absolute;
// //     inset: 0;
// //     z-index: 1;
// //     background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%);
// //     pointer-events: none;
// //   }

// //   /* ── Top bar ── */
// //   .lv-topbar {
// //     position: absolute;
// //     top: 0; left: 0; right: 0;
// //     z-index: 10;
// //     padding: 28px 52px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //   }

// //   .lv-logo {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 26px;
// //     letter-spacing: 0.12em;
// //     color: var(--white);
// //     text-decoration: none;
// //   }

// //   .lv-logo span { color: var(--gold); }

// //   .lv-nav {
// //     display: flex;
// //     gap: 32px;
// //     list-style: none;
// //   }

// //   .lv-nav a {
// //     font-size: 12px;
// //     letter-spacing: 0.18em;
// //     text-transform: uppercase;
// //     color: var(--white-dim);
// //     text-decoration: none;
// //     transition: color 0.2s;
// //   }

// //   .lv-nav a:hover { color: var(--gold); }

// //   /* ── Slide counter top-right image area ── */
// //   .lv-counter {
// //     position: absolute;
// //     top: 28px;
// //     right: 52px;
// //     z-index: 10;
// //     display: flex;
// //     align-items: center;
// //     gap: 8px;
// //   }

// //   .lv-counter-num {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 18px;
// //     letter-spacing: 0.1em;
// //     color: var(--gold);
// //   }

// //   .lv-counter-sep {
// //     width: 28px;
// //     height: 1px;
// //     background: var(--white-faint);
// //   }

// //   .lv-counter-total {
// //     font-size: 11px;
// //     letter-spacing: 0.12em;
// //     color: var(--white-dim);
// //   }

// //   /* ── Progress bar ── */
// //   .lv-progress {
// //     position: absolute;
// //     top: 0; left: 0;
// //     height: 2px;
// //     z-index: 10;
// //     background: var(--gold);
// //     transition: width 0.5s linear;
// //   }

// //   /* ── Bottom content ── */
// //   .lv-bottom {
// //     position: absolute;
// //     bottom: 0; left: 0; right: 0;
// //     z-index: 5;
// //     padding: 0 52px 48px;
// //     display: flex;
// //     align-items: flex-end;
// //     justify-content: space-between;
// //     gap: 24px;
// //   }

// //   /* LEFT: Property name + tagline */
// //   .lv-identity {
// //     flex: 1;
// //     min-width: 0;
// //   }

// //   .lv-prop-name {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: clamp(72px, 11vw, 148px);
// //     line-height: 0.88;
// //     letter-spacing: 0.03em;
// //     color: var(--white);
// //     white-space: nowrap;
// //     text-shadow: 0 4px 40px rgba(0,0,0,0.5);
// //   }

// //   .lv-prop-tagline {
// //     margin-top: 10px;
// //     font-family: 'Cormorant Garamond', serif;
// //     font-size: clamp(14px, 1.6vw, 19px);
// //     font-weight: 300;
// //     font-style: italic;
// //     color: var(--white-dim);
// //     letter-spacing: 0.04em;
// //   }

// //   /* Thin gold accent line under name */
// //   .lv-prop-line {
// //     display: block;
// //     width: 56px;
// //     height: 1.5px;
// //     background: var(--gold);
// //     margin-top: 16px;
// //   }

// //   /* RIGHT: Stats pills */
// //   .lv-stats {
// //     display: flex;
// //     gap: 2px;
// //     align-items: stretch;
// //     flex-shrink: 0;
// //   }

// //   .lv-stat {
// //     padding: 18px 22px;
// //     background: rgba(0,0,0,0.40);
// //     backdrop-filter: blur(12px);
// //     -webkit-backdrop-filter: blur(12px);
// //     border: 1px solid var(--white-faint);
// //     text-align: center;
// //     min-width: 90px;
// //     position: relative;
// //   }

// //   .lv-stat:first-child { border-radius: 4px 0 0 4px; }
// //   .lv-stat:last-child  { border-radius: 0 4px 4px 0; }

// //   .lv-stat-val {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 26px;
// //     letter-spacing: 0.06em;
// //     color: var(--white);
// //     line-height: 1;
// //   }

// //   .lv-stat-unit {
// //     font-size: 10px;
// //     color: var(--gold);
// //     letter-spacing: 0.1em;
// //     display: block;
// //     line-height: 1;
// //     vertical-align: super;
// //     font-family: 'DM Sans', sans-serif;
// //   }

// //   .lv-stat-label {
// //     font-size: 9.5px;
// //     letter-spacing: 0.13em;
// //     text-transform: uppercase;
// //     color: var(--white-dim);
// //     margin-top: 5px;
// //     font-weight: 300;
// //   }

// //   /* ── CTA buttons ── */
// //   .lv-ctas {
// //     position: absolute;
// //     bottom: 48px;
// //     left: 50%;
// //     transform: translateX(-50%);
// //     z-index: 5;
// //     display: flex;
// //     gap: 12px;
// //   }

// //   /* Actually place CTAs smarter — inline with bottom layout */
// //   .lv-cta-group {
// //     display: flex;
// //     gap: 10px;
// //     align-items: flex-end;
// //     flex-shrink: 0;
// //   }

// //   .lv-btn-primary {
// //     padding: 14px 32px;
// //     background: var(--gold);
// //     color: #1a1206;
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 12px;
// //     font-weight: 500;
// //     letter-spacing: 0.14em;
// //     text-transform: uppercase;
// //     border: none;
// //     border-radius: 2px;
// //     cursor: pointer;
// //     text-decoration: none;
// //     display: inline-flex;
// //     align-items: center;
// //     gap: 8px;
// //     white-space: nowrap;
// //     transition: background 0.2s, box-shadow 0.2s;
// //   }

// //   .lv-btn-primary:hover {
// //     background: #dbb85a;
// //     box-shadow: 0 6px 24px rgba(201,168,76,0.45);
// //   }

// //   .lv-btn-secondary {
// //     padding: 14px 28px;
// //     background: transparent;
// //     color: var(--white);
// //     font-family: 'DM Sans', sans-serif;
// //     font-size: 12px;
// //     font-weight: 400;
// //     letter-spacing: 0.14em;
// //     text-transform: uppercase;
// //     border: 1px solid var(--white-faint);
// //     border-radius: 2px;
// //     cursor: pointer;
// //     text-decoration: none;
// //     display: inline-flex;
// //     align-items: center;
// //     white-space: nowrap;
// //     transition: border-color 0.2s, color 0.2s;
// //   }

// //   .lv-btn-secondary:hover {
// //     border-color: var(--gold-dim);
// //     color: var(--gold);
// //   }

// //   /* ── Dot indicators (left side) ── */
// //   .lv-dots {
// //     position: absolute;
// //     left: 52px;
// //     top: 50%;
// //     transform: translateY(-50%);
// //     z-index: 5;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 8px;
// //   }

// //   .lv-dot {
// //     width: 5px;
// //     height: 5px;
// //     border-radius: 50%;
// //     background: var(--white-faint);
// //     cursor: pointer;
// //     transition: background 0.2s, transform 0.2s;
// //   }

// //   .lv-dot.active {
// //     background: var(--gold);
// //     transform: scale(1.3);
// //   }

// //   /* ── Type badge top-left ── */
// //   .lv-badge {
// //     position: absolute;
// //     top: 28px;
// //     left: 52px;
// //     z-index: 10;
// //   }

// //   .lv-badge-pill {
// //     display: inline-flex;
// //     align-items: center;
// //     gap: 8px;
// //     padding: 6px 14px;
// //     background: rgba(0,0,0,0.35);
// //     backdrop-filter: blur(10px);
// //     border: 1px solid var(--white-faint);
// //     border-radius: 20px;
// //     font-size: 11px;
// //     letter-spacing: 0.15em;
// //     text-transform: uppercase;
// //     color: var(--white-dim);
// //   }

// //   .lv-badge-dot {
// //     width: 6px;
// //     height: 6px;
// //     border-radius: 50%;
// //     background: var(--gold);
// //     animation: lv-pulse 2s ease-in-out infinite;
// //   }

// //   @keyframes lv-pulse {
// //     0%, 100% { opacity: 1; transform: scale(1); }
// //     50% { opacity: 0.5; transform: scale(0.75); }
// //   }

// //   /* ── Responsive ── */
// //   @media (max-width: 768px) {
// //     .lv-topbar, .lv-badge { padding: 20px 24px; }
// //     .lv-dots { left: 20px; }
// //     .lv-bottom { padding: 0 24px 36px; flex-direction: column; align-items: flex-start; }
// //     .lv-stats { display: none; }
// //     .lv-cta-group { flex-direction: row; }
// //     .lv-prop-name { font-size: clamp(56px, 18vw, 100px); }
// //     .lv-counter { right: 24px; }
// //   }
// // `;

// // const SLIDES = [
// //   {
// //     name: "PROPZO VILLA",
// //     tagline: "Luxury living in prime Mumbai",
// //     img: "5.jpg",
// //     type: "Luxury Villa",
// //     stats: [
// //       { val: "1–3", unit: "", label: "Bedrooms" },
// //       { val: "10", unit: "min", label: "To City" },
// //       { val: "200–450", unit: "m²", label: "Built Area" },
// //       { val: "Freehold", unit: "", label: "Title" },
// //     ],
// //   },
// //   {
// //     name: "SKYLINE APT",
// //     tagline: "Smart apartments above the city",
// //     img: "2.jpg",
// //     type: "Smart Apartment",
// //     stats: [
// //       { val: "1–4", unit: "", label: "Bedrooms" },
// //       { val: "5", unit: "min", label: "Metro Walk" },
// //       { val: "65–180", unit: "m²", label: "Carpet Area" },
// //       { val: "RERA", unit: "", label: "Certified" },
// //     ],
// //   },
// //   {
// //     name: "APEX PENTHOUSE",
// //     tagline: "The pinnacle of city living",
// //     img: "3.jpg",
// //     type: "Premium Penthouse",
// //     stats: [
// //       { val: "3–5", unit: "", label: "Bedrooms" },
// //       { val: "360°", unit: "", label: "City Views" },
// //       { val: "300–700", unit: "m²", label: "Living Space" },
// //       { val: "Private", unit: "", label: "Terrace" },
// //     ],
// //   },
// //   {
// //     name: "CASA HOMES",
// //     tagline: "Modern family living redefined",
// //     img: "4.jpg",
// //     type: "Family Home",
// //     stats: [
// //       { val: "3–5", unit: "", label: "Bedrooms" },
// //       { val: "2", unit: "", label: "Car Parks" },
// //       { val: "250–500", unit: "m²", label: "Plot Size" },
// //       { val: "Gated", unit: "", label: "Community" },
// //     ],
// //   },
// // ];

// // export default function Hero() {
// //   const [index, setIndex] = useState(0);
// //   const [visible, setVisible] = useState(0); // which img is currently shown
// //   const [progress, setProgress] = useState(0);

// //   useEffect(() => {
// //     setProgress(0);
// //     const progTimer = setTimeout(() => setProgress(100), 50);

// //     const t = setInterval(() => {
// //       setIndex((p) => {
// //         const next = (p + 1) % SLIDES.length;
// //         setVisible(next);
// //         setProgress(0);
// //         setTimeout(() => setProgress(100), 50);
// //         return next;
// //       });
// //     }, 2500);

// //     return () => { clearInterval(t); clearTimeout(progTimer); };
// //   }, []);

// //   const goTo = (i) => {
// //     setIndex(i);
// //     setVisible(i);
// //     setProgress(0);
// //     setTimeout(() => setProgress(100), 50);
// //   };

// //   const slide = SLIDES[index];

// //   return (
// //     <>
// //       <style>{css}</style>
// //       <section className="lv-hero">

// //         {/* Background images */}
// //         <div className="lv-bg">
// //           {SLIDES.map((s, i) => (
// //             <img
// //               key={i}
// //               src={s.img}
// //               alt={s.name}
// //               className={`lv-bg-img ${i === visible ? "visible" : ""}`}
// //             />
// //           ))}
// //         </div>

// //         {/* Overlays */}
// //         <div className="lv-overlay" />
// //         <div className="lv-vignette" />

// //         {/* Progress bar */}
// //         <div className="lv-progress" style={{ width: `${progress}%` }} />

// //         {/* Badge */}
// //         <div className="lv-badge">
// //           <span className="lv-badge-pill">
// //             <span className="lv-badge-dot" />
// //             {slide.type}
// //           </span>
// //         </div>

// //         {/* Slide dots (left side) */}
// //         <div className="lv-dots">
// //           {SLIDES.map((_, i) => (
// //             <div
// //               key={i}
// //               className={`lv-dot ${i === index ? "active" : ""}`}
// //               onClick={() => goTo(i)}
// //             />
// //           ))}
// //         </div>

// //         {/* Slide counter top-right */}
// //         <div className="lv-counter">
// //           <span className="lv-counter-num">0{index + 1}</span>
// //           <span className="lv-counter-sep" />
// //           <span className="lv-counter-total">0{SLIDES.length}</span>
// //         </div>

// //         {/* Bottom row */}
// //         <div className="lv-bottom">
// //           {/* Property name + tagline */}
// //           <div className="lv-identity">
// //             <div className="lv-prop-name">{slide.name}</div>
// //             <div className="lv-prop-tagline">{slide.tagline}</div>
// //             <span className="lv-prop-line" />

// //             {/* CTA buttons */}
// //             <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
// //               <Link to="/menu" style={{ textDecoration: "none" }}>
// //                 <button className="lv-btn-primary">
// //                   Explore Properties
// //                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M5 12h14M12 5l7 7-7 7" />
// //                   </svg>
// //                 </button>
// //               </Link>
// //               <Link to="/agent" style={{ textDecoration: "none" }}>
// //                 <button className="lv-btn-secondary">Talk to Agent</button>
// //               </Link>
// //             </div>
// //           </div>

// //           {/* Stats */}
// //           <div className="lv-stats">
// //             {slide.stats.map((s, i) => (
// //               <div key={i} className="lv-stat">
// //                 <div className="lv-stat-val">
// //                   {s.val}
// //                   {s.unit && <span className="lv-stat-unit">{s.unit}</span>}
// //                 </div>
// //                 <div className="lv-stat-label">{s.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //       </section>
// //     </>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@1,300&display=swap');

//   :root {
//     --gold: #c9a84c;
//     --white: #ffffff;
//     --white-dim: rgba(255,255,255,0.58);
//     --white-faint: rgba(255,255,255,0.12);
//   }

//   * { box-sizing: border-box; margin: 0; padding: 0; }

//   .lh-hero {
//     position: relative;
//     width: 100%;
//     height: 100vh;
//     min-height: 580px;
//     overflow: hidden;
//     font-family: 'DM Sans', sans-serif;
//     color: var(--white);
//     background: #000;
//   }

//   /* BG images */
//   .lh-bg-img {
//     position: absolute;
//     inset: 0;
//     width: 100%; height: 100%;
//     object-fit: cover;
//     opacity: 0;
//     transition: opacity 0.45s ease;
//     z-index: 0;
//   }
//   .lh-bg-img.visible { opacity: 1; }

//   /* Overlay */
//   .lh-overlay {
//     position: absolute;
//     inset: 0;
//     z-index: 1;
//     background:
//       linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.38) 100%),
//       linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 50%);
//   }

//   /* ═══════════════════════════════════════
//      GIANT PROPERTY NAME — watermark layer
//      sits between overlay (z1) and content (z10)
//   ════════════════════════════════════════ */
//   .lh-bg-name {
//     position: absolute;
//     bottom: 4%;
//     left: 0; right: 0;
//     z-index: 2;
//     text-align: center;
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: clamp(90px, 18vw, 220px);
//     line-height: 1;
//     letter-spacing: 0.05em;
//     color: rgba(255,255,255,0.11);
//     pointer-events: none;
//     user-select: none;
//     white-space: nowrap;
//     overflow: hidden;
//   }

//   /* Progress bar */
//   .lh-progress {
//     position: absolute;
//     top: 0; left: 0;
//     height: 2px;
//     z-index: 20;
//     background: var(--gold);
//     transition: width 0.45s linear;
//   }

//   /* ── Badge ── */
//   .lh-badge {
//     position: absolute;
//     top: 78px; left: 52px;
//     z-index: 10;
//   }
//   @media(max-width:768px){ .lh-badge{ left:24px; top:72px; } }

//   .lh-badge-pill {
//     display: inline-flex;
//     align-items: center;
//     gap: 7px;
//     padding: 5px 13px;
//     background: rgba(0,0,0,0.40);
//     backdrop-filter: blur(10px);
//     border: 1px solid var(--white-faint);
//     border-radius: 20px;
//     font-size: 10px;
//     letter-spacing: 0.15em;
//     text-transform: uppercase;
//     color: var(--white-dim);
//   }

//   .lh-badge-dot {
//     width: 5px; height: 5px;
//     border-radius: 50%;
//     background: var(--gold);
//     animation: lh-pulse 2s ease-in-out infinite;
//   }

//   @keyframes lh-pulse {
//     0%,100%{ opacity:1; transform:scale(1); }
//     50%    { opacity:0.4; transform:scale(0.7); }
//   }

//   /* ── Top-left headline ── */
//   .lh-top-left {
//     position: absolute;
//     top: 125px; left: 52px;
//     z-index: 10;
//     max-width: 440px;
//   }
//   @media(max-width:768px){ .lh-top-left{ left:24px; top:110px; max-width:280px; } }

//   .lh-since {
//     display: block;
//     font-size: 9px;
//     letter-spacing: 0.30em;
//     text-transform: uppercase;
//     color: var(--gold);
//     margin-bottom: 14px;
//   }

//   .lh-headline {
//     font-family: 'DM Sans', sans-serif;
//     font-size: clamp(22px, 3vw, 38px);
//     font-weight: 700;
//     line-height: 1.12;
//     color: var(--white);
//     letter-spacing: -0.01em;
//     text-transform: uppercase;
//   }

//   .lh-headline span { display: block; }

//   .lh-subtext {
//     margin-top: 14px;
//     font-size: 12px;
//     line-height: 1.75;
//     color: var(--white-dim);
//     font-weight: 300;
//     max-width: 280px;
//   }

//   /* ── Top-right slide counter ── */
//   .lh-counter {
//     position: absolute;
//     top: 125px; right: 52px;
//     z-index: 10;
//     text-align: right;
//   }
//   @media(max-width:768px){ .lh-counter{ right:24px; } }

//   .lh-counter-label {
//     font-size: 9px;
//     letter-spacing: 0.24em;
//     text-transform: uppercase;
//     color: var(--white-dim);
//     display: block;
//     margin-bottom: 4px;
//   }

//   .lh-counter-num {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 20px;
//     letter-spacing: 0.1em;
//     color: var(--gold);
//   }

//   .lh-counter-total {
//     font-size: 12px;
//     color: var(--white-dim);
//     letter-spacing: 0.06em;
//   }

//   /* ── Right floating stats ── */
//   .lh-stats {
//     position: absolute;
//     right: 52px;
//     top: 50%;
//     transform: translateY(-50%);
//     z-index: 10;
//     display: flex;
//     flex-direction: column;
//     gap: 36px;
//   }
//   @media(max-width:900px){ .lh-stats{ display:none; } }

//   .lh-stat-val {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: clamp(40px, 5vw, 62px);
//     line-height: 1;
//     color: var(--white);
//     letter-spacing: 0.02em;
//   }

//   .lh-stat-desc {
//     font-size: 11px;
//     color: var(--white-dim);
//     font-weight: 300;
//     line-height: 1.55;
//     margin-top: 5px;
//     max-width: 140px;
//     white-space: pre-line;
//   }

//   /* ── Dot indicators (vertical, left-center) ── */
//   .lh-dots {
//     position: absolute;
//     left: 28px;
//     top: 50%;
//     transform: translateY(-50%);
//     z-index: 10;
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }

//   .lh-dot {
//     width: 4px; height: 4px;
//     border-radius: 50%;
//     background: var(--white-faint);
//     cursor: pointer;
//     transition: background 0.2s, transform 0.2s;
//   }
//   .lh-dot.active {
//     background: var(--gold);
//     transform: scale(1.5);
//   }

//   /* ── Bottom center CTA ── */
//   .lh-cta {
//     position: absolute;
//     bottom: 38px;
//     left: 50%;
//     transform: translateX(-50%);
//     z-index: 10;
//   }

//   .lh-discover-btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 14px;
//     padding: 15px 32px;
//     background: rgba(255,255,255,0.90);
//     color: #111;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 0.22em;
//     text-transform: uppercase;
//     border: none;
//     border-radius: 60px;
//     cursor: pointer;
//     text-decoration: none;
//     white-space: nowrap;
//     box-shadow: 0 8px 32px rgba(0,0,0,0.40);
//     transition: background 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
//   }

//   .lh-discover-btn:hover {
//     background: var(--gold);
//     color: #fff;
//     transform: translateY(-3px);
//     box-shadow: 0 14px 40px rgba(201,168,76,0.50);
//   }

//   .lh-disc-icon {
//     width: 30px; height: 30px;
//     border-radius: 50%;
//     background: #111;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//     transition: background 0.25s;
//   }

//   .lh-discover-btn:hover .lh-disc-icon {
//     background: rgba(255,255,255,0.22);
//   }

//   /* ── Bottom-left author ── */
//   .lh-author {
//     position: absolute;
//     bottom: 40px; left: 52px;
//     z-index: 10;
//   }
//   @media(max-width:768px){ .lh-author{ left:24px; bottom:90px; } }

//   .lh-author-name {
//     font-size: 11px;
//     font-weight: 500;
//     color: var(--white);
//     letter-spacing: 0.06em;
//   }

//   .lh-author-role {
//     font-size: 10px;
//     color: var(--white-dim);
//     margin-top: 2px;
//   }

//   /* ── Bottom-right tagline ── */
//   .lh-br-tag {
//     position: absolute;
//     bottom: 40px; right: 52px;
//     z-index: 10;
//     font-size: 10px;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: var(--white-dim);
//   }
//   @media(max-width:768px){ .lh-br-tag{ display:none; } }
// `;

// const SLIDES = [
//   {
//     name: "PROPZO VILLA",
//     headline: ["UPGRADE YOUR", "LIFE WITH SMART HOME", "TECHNOLOGY"],
//     sub: "Luxury living in prime Mumbai",
//     img: "5.jpg",
//     type: "Luxury Villa",
//     stats: [
//       { val: "5.9K+", desc: "Successfully delivering\ninnovative projects\naround the world." },
//       { val: "10K+", desc: "Award-winning innovative\nprojects delivered\nglobally." },
//     ],
//   },
//   {
//     name: "SKYLINE APT",
//     headline: ["SMART LIVING", "ABOVE THE CITY", "SKYLINE"],
//     sub: "Smart apartments above the city",
//     img: "2.jpg",
//     type: "Smart Apartment",
//     stats: [
//       { val: "1.2K+", desc: "Modern apartments\nhandpicked for\nurban lifestyles." },
//       { val: "98%",   desc: "Client satisfaction\nrate across all\nour properties." },
//     ],
//   },
//   {
//     name: "APEX PENTHOUSE",
//     headline: ["THE PINNACLE", "OF CITY LIVING", "ELEVATED"],
//     sub: "The pinnacle of city living",
//     img: "3.jpg",
//     type: "Premium Penthouse",
//     stats: [
//       { val: "360°", desc: "Panoramic city views\nfrom every premium\npenthouse floor." },
//       { val: "50+",  desc: "Exclusive penthouses\navailable in prime\nMumbai locations." },
//     ],
//   },
//   {
//     name: "CASA HOMES",
//     headline: ["MODERN FAMILY", "LIVING SPACES", "REDEFINED"],
//     sub: "Modern family living redefined",
//     img: "4.jpg",
//     type: "Family Home",
//     stats: [
//       { val: "3K+", desc: "Gated community homes\ndesigned for modern\nfamilies." },
//       { val: "8Y+", desc: "Years of trusted real\nestate expertise\nacross Mumbai." },
//     ],
//   },
// ];

// export default function Hero() {
//   const [index,    setIndex]    = useState(0);
//   const [visible,  setVisible]  = useState(0);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     setProgress(0);
//     const pt = setTimeout(() => setProgress(100), 50);
//     const t  = setInterval(() => {
//       setIndex(p => {
//         const next = (p + 1) % SLIDES.length;
//         setVisible(next);
//         setProgress(0);
//         setTimeout(() => setProgress(100), 50);
//         return next;
//       });
//     }, 2500);
//     return () => { clearInterval(t); clearTimeout(pt); };
//   }, []);

//   const goTo = i => {
//     setIndex(i); setVisible(i);
//     setProgress(0);
//     setTimeout(() => setProgress(100), 50);
//   };

//   const slide = SLIDES[index];

//   return (
//     <>
//       <style>{css}</style>
//       <section className="lh-hero">

//         {/* Background images */}
//         {SLIDES.map((s, i) => (
//           <img key={i} src={s.img} alt={s.name}
//             className={`lh-bg-img${i === visible ? " visible" : ""}`} />
//         ))}

//         {/* Overlay */}
//         <div className="lh-overlay" />

//         {/* ★ GIANT property name watermark behind everything ★ */}
//         <div className="lh-bg-name">{slide.name}</div>

//         {/* Progress bar */}
//         <div className="lh-progress" style={{ width: `${progress}%` }} />

//         {/* Badge */}
//         <div className="lh-badge">
//           <span className="lh-badge-pill">
//             <span className="lh-badge-dot" />
//             {slide.type}
//           </span>
//         </div>

//         {/* Top-left headline */}
//         <div className="lh-top-left">
//           <span className="lh-since">Since 2017</span>
//           <h1 className="lh-headline">
//             {slide.headline.map((l, i) => <span key={i}>{l}</span>)}
//           </h1>
//           <p className="lh-subtext">{slide.sub}</p>
//         </div>

//         {/* Top-right counter */}
//         <div className="lh-counter">
//           <span className="lh-counter-label">Property</span>
//           <span className="lh-counter-num">0{index + 1}</span>
//           <span className="lh-counter-total"> / 0{SLIDES.length}</span>
//         </div>

//         {/* Right stats */}
//         <div className="lh-stats">
//           {slide.stats.map((s, i) => (
//             <div key={i}>
//               <div className="lh-stat-val">{s.val}</div>
//               <div className="lh-stat-desc">{s.desc}</div>
//             </div>
//           ))}
//         </div>

//         {/* Dot indicators */}
//         <div className="lh-dots">
//           {SLIDES.map((_, i) => (
//             <div key={i}
//               className={`lh-dot${i === index ? " active" : ""}`}
//               onClick={() => goTo(i)} />
//           ))}
//         </div>

//         {/* Bottom center CTA */}
//         <div className="lh-cta">
//           <Link to="/menu" style={{ textDecoration: "none" }}>
//             <button className="lh-discover-btn">
//               Discover More
//               <span className="lh-disc-icon">
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </span>
//             </button>
//           </Link>
//         </div>

//         {/* Bottom-left author */}
//         <div className="lh-author">
//           <div className="lh-author-name">PropZo Premium</div>
//           <div className="lh-author-role">Mumbai · Premium Real Estate</div>
//         </div>

//         {/* Bottom-right */}
//         <div className="lh-br-tag">Welcome To The Future Property</div>

//       </section>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@1,300&display=swap');

  :root {
    --gold: #B2846B;
    --gold-deep: #4C3324;
    --sage: #627B68;
    --sage-light: #819B8B;
    --blush: #E4CBB6;
    --white: #F7F3EE;
    --white-dim: rgba(228, 203, 182, 0.62);
    --white-faint: rgba(228, 203, 182, 0.14);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .lh-hero {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 580px;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    color: var(--white);
    background: var(--gold-deep);
  }

  /* BG images */
  .lh-bg-img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.45s ease;
    z-index: 0;
  }
  .lh-bg-img.visible { opacity: 1; }

  /* Overlay — warm dark-brown tint instead of pure black */
  .lh-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(to right, rgba(76,51,36,0.78) 0%, rgba(76,51,36,0.20) 55%, rgba(76,51,36,0.42) 100%),
      linear-gradient(to top, rgba(76,51,36,0.68) 0%, transparent 50%);
  }

  /* ═══════════════════════════════════════
     GIANT PROPERTY NAME — watermark layer
  ════════════════════════════════════════ */
  .lh-bg-name {
    position: absolute;
    bottom: 4%;
    left: 0; right: 0;
    z-index: 2;
    text-align: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(90px, 18vw, 220px);
    line-height: 1;
    letter-spacing: 0.05em;
    color: rgba(228,203,182,0.09);
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
  }

  /* Progress bar */
  .lh-progress {
    position: absolute;
    top: 0; left: 0;
    height: 2px;
    z-index: 20;
    background: var(--gold);
    transition: width 0.45s linear;
  }

  /* ── Badge ── */
  .lh-badge {
    position: absolute;
    top: 78px; left: 52px;
    z-index: 10;
  }
  @media(max-width:768px){ .lh-badge{ left:24px; top:72px; } }

  .lh-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 13px;
    background: rgba(76,51,36,0.45);
    backdrop-filter: blur(10px);
    border: 1px solid var(--white-faint);
    border-radius: 20px;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--blush);
  }

  .lh-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--sage-light);
    animation: lh-pulse 2s ease-in-out infinite;
  }

  @keyframes lh-pulse {
    0%,100%{ opacity:1; transform:scale(1); }
    50%    { opacity:0.4; transform:scale(0.7); }
  }

  /* ── Top-left headline ── */
  .lh-top-left {
    position: absolute;
    top: 125px; left: 52px;
    z-index: 10;
    max-width: 440px;
  }
  @media(max-width:768px){ .lh-top-left{ left:24px; top:110px; max-width:280px; } }

  .lh-since {
    display: block;
    font-size: 9px;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    color: var(--sage-light);
    margin-bottom: 14px;
  }

  .lh-headline {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(22px, 3vw, 38px);
    font-weight: 700;
    line-height: 1.12;
    color: var(--white);
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }

  .lh-headline span { display: block; }

  .lh-subtext {
    margin-top: 14px;
    font-size: 12px;
    line-height: 1.75;
    color: var(--white-dim);
    font-weight: 300;
    max-width: 280px;
  }

  /* ── Top-right slide counter ── */
  .lh-counter {
    position: absolute;
    top: 125px; right: 52px;
    z-index: 10;
    text-align: right;
  }
  @media(max-width:768px){ .lh-counter{ right:24px; } }

  .lh-counter-label {
    font-size: 9px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--white-dim);
    display: block;
    margin-bottom: 4px;
  }

  .lh-counter-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    color: var(--gold);
  }

  .lh-counter-total {
    font-size: 12px;
    color: var(--white-dim);
    letter-spacing: 0.06em;
  }

  /* ── Right floating stats ── */
  .lh-stats {
    position: absolute;
    right: 52px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
  @media(max-width:900px){ .lh-stats{ display:none; } }

  .lh-stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 5vw, 62px);
    line-height: 1;
    color: var(--blush);
    letter-spacing: 0.02em;
  }

  .lh-stat-desc {
    font-size: 11px;
    color: var(--white-dim);
    font-weight: 300;
    line-height: 1.55;
    margin-top: 5px;
    max-width: 140px;
    white-space: pre-line;
  }

  /* ── Dot indicators (vertical, left-center) ── */
  .lh-dots {
    position: absolute;
    left: 28px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--white-faint);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .lh-dot.active {
    background: var(--sage-light);
    transform: scale(1.5);
  }

  /* ── Bottom center CTA ── */
  .lh-cta {
    position: absolute;
    bottom: 38px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .lh-discover-btn {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 15px 32px;
    background: rgba(228,203,182,0.92);
    color: var(--gold-deep);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border: none;
    border-radius: 60px;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 0 8px 32px rgba(76,51,36,0.45);
    transition: background 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
  }

  .lh-discover-btn:hover {
    background: var(--sage);
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(98,123,104,0.55);
  }

  .lh-disc-icon {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: var(--gold-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.25s;
  }

  .lh-discover-btn:hover .lh-disc-icon {
    background: rgba(255,255,255,0.22);
  }

  /* ── Bottom-left author ── */
  .lh-author {
    position: absolute;
    bottom: 40px; left: 52px;
    z-index: 10;
  }
  @media(max-width:768px){ .lh-author{ left:24px; bottom:90px; } }

  .lh-author-name {
    font-size: 11px;
    font-weight: 500;
    color: var(--blush);
    letter-spacing: 0.06em;
  }

  .lh-author-role {
    font-size: 10px;
    color: var(--white-dim);
    margin-top: 2px;
  }

  /* ── Bottom-right tagline ── */
  .lh-br-tag {
    position: absolute;
    bottom: 40px; right: 52px;
    z-index: 10;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--white-dim);
  }
  @media(max-width:768px){ .lh-br-tag{ display:none; } }
`;

const SLIDES = [
  {
    name: "Cascade Infinity Villa",
    headline: ["UPGRADE YOUR", "LIFE WITH SMART HOME", "TECHNOLOGY"],
    sub: "Luxury living in prime Mumbai",
    img: "5.jpg",
    type: "Cascade Infinity Villa",
    stats: [
      { val: "5.9K+", desc: "Successfully delivering\ninnovative projects\naround the world." },
      { val: "10K+", desc: "Award-winning innovative\nprojects delivered\nglobally." },
    ],
  },
  {
    name: "Lakeview Glass Villa",
    headline: ["SMART LIVING", "ABOVE THE CITY", "SKYLINE"],
    sub: "Smart apartments above the city",
    img: "2.jpg",
    type: "Lakeview Glass Villa",
    stats: [
      { val: "1.2K+", desc: "Modern apartments\nhandpicked for\nurban lifestyles." },
      { val: "98%", desc: "Client satisfaction\nrate across all\nour properties." },
    ],
  },
  {
    name: "Tropical Harmony Villa",
    headline: ["THE PINNACLE", "OF CITY LIVING", "ELEVATED"],
    sub: "The pinnacle of city living",
    img: "3.jpg",
    type: "Tropical Harmony Villa",
    stats: [
      { val: "360°", desc: "Panoramic city views\nfrom every premium\npenthouse floor." },
      { val: "50+", desc: "Exclusive penthouses\navailable in prime\nMumbai locations." },
    ],
  },
  {
    name: "Verdant Sky Villa",
    headline: ["MODERN FAMILY", "LIVING SPACES", "REDEFINED"],
    sub: "Modern family living redefined",
    img: "4.jpg",
    type: "Verdant Sky Villa",
    stats: [
      { val: "3K+", desc: "Gated community homes\ndesigned for modern\nfamilies." },
      { val: "8Y+", desc: "Years of trusted real\nestate expertise\nacross Mumbai." },
    ],
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const pt = setTimeout(() => setProgress(100), 50);
    const t = setInterval(() => {
      setIndex(p => {
        const next = (p + 1) % SLIDES.length;
        setVisible(next);
        setProgress(0);
        setTimeout(() => setProgress(100), 50);
        return next;
      });
    }, 2500);
    return () => { clearInterval(t); clearTimeout(pt); };
  }, []);

  const goTo = i => {
    setIndex(i); setVisible(i);
    setProgress(0);
    setTimeout(() => setProgress(100), 50);
  };

  const slide = SLIDES[index];

  return (
    <>
      <style>{css}</style>
      <section className="lh-hero">

        {/* Background images */}
        {SLIDES.map((s, i) => (
          <img key={i} src={s.img} alt={s.name}
            className={`lh-bg-img${i === visible ? " visible" : ""}`} />
        ))}

        {/* Overlay */}
        <div className="lh-overlay" />

        {/* ★ GIANT property name watermark behind everything ★ */}
        <div className="lh-bg-name">{slide.name}</div>

        {/* Progress bar */}
        <div className="lh-progress" style={{ width: `${progress}%` }} />

        {/* Badge */}
        <div className="lh-badge">
          <span className="lh-badge-pill">
            <span className="lh-badge-dot" />
            {slide.type}
          </span>
        </div>

        {/* Top-left headline */}
        <div className="lh-top-left">
          <span className="lh-since">Since 2017</span>
          <h1 className="lh-headline">
            {slide.headline.map((l, i) => <span key={i}>{l}</span>)}
          </h1>
          <p className="lh-subtext">{slide.sub}</p>
        </div>

        {/* Top-right counter */}
        <div className="lh-counter">
          <span className="lh-counter-label">Property</span>
          <span className="lh-counter-num">0{index + 1}</span>
          <span className="lh-counter-total"> / 0{SLIDES.length}</span>
        </div>

        {/* Right stats */}
        <div className="lh-stats">
          {slide.stats.map((s, i) => (
            <div key={i}>
              <div className="lh-stat-val">{s.val}</div>
              <div className="lh-stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="lh-dots">
          {SLIDES.map((_, i) => (
            <div key={i}
              className={`lh-dot${i === index ? " active" : ""}`}
              onClick={() => goTo(i)} />
          ))}
        </div>

        {/* Bottom center CTA */}
        <div className="lh-cta">
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <button className="lh-discover-btn">
              Discover More
              <span className="lh-disc-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E4CBB6" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </Link>
        </div>

        {/* Bottom-left author */}
        <div className="lh-author">
          <div className="lh-author-name">PropZo Premium</div>
          <div className="lh-author-role">Mumbai · Premium Real Estate</div>
        </div>

        {/* Bottom-right */}
        <div className="lh-br-tag">Welcome To The Future Property</div>

      </section>
    </>
  );
}
