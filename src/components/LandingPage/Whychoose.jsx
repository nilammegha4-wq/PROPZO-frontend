// import React from "react";

// export default function WhyChoosePropoZo() {
//   const reasons = [
//     {
//       id: 1,
//       title: "Trusted Listings",
//       description: "All properties are verified and listed by trusted sellers. You get accurate info and peace of mind.",
//       icon: "🏡",
//     },
//     {
//       id: 2,
//       title: "Premium Support",
//       description: "Our dedicated team is always available to help you with queries, viewings, and buying process.",
//       icon: "💬",
//     },
//     {
//       id: 3,
//       title: "Smart Search",
//       description: "Advanced filters and AI-powered recommendations help you find your dream property quickly.",
//       icon: "🔍",
//     },
//     {
//       id: 4,
//       title: "Secure Transactions",
//       description: "Safe payment and legal support ensure smooth and secure property transactions.",
//       icon: "🛡️",
//     },
//   ];

//   return (
//     <div style={container}>
//       <h2 style={heading}>
//         Why Choose <span style={gradient}>PropZo?</span>
//       </h2>
//       <p style={subheading}>
//         Discover the benefits of using PropZo for your property journey.
//       </p>

//       <div style={grid}>
//         {reasons.map((reason) => (
//           <div
//             key={reason.id}
//             style={card}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "translateY(-8px)";
//               e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.15)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "translateY(0)";
//               e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
//             }}
//           >
//             <div style={icon}>{reason.icon}</div>
//             <h3 style={title}>{reason.title}</h3>
//             <p style={desc}>{reason.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */
// const container = {
//   padding: "80px 20px",
//   fontFamily: "Poppins, sans-serif",
//   background: "#eef2f7",  // new subtle gray-blue background
//   textAlign: "center",
// };

// const heading = {
//   fontSize: 36,
//   fontWeight: 700,
//   marginBottom: 10,
//   color: "#1e3a8a",  // deep blue
// };

// const gradient = {
//   background: "linear-gradient(90deg,#0ea5e9,#2563eb)", // bright blue gradient accent
//   WebkitBackgroundClip: "text",
//   color: "transparent",
// };

// const subheading = {
//   fontSize: 16,
//   color: "#4b5563",  // dark gray
//   marginBottom: 50,
// };

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//   gap: 30,
//   maxWidth: 1200,
//   margin: "0 auto",
// };

// const card = {
//   background: "#ffffff",  // white cards for contrast
//   padding: 30,
//   borderRadius: 20,
//   boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
//   textAlign: "center",
//   transition: "transform .3s ease, box-shadow .3s ease",
// };

// const icon = {
//   fontSize: 40,
//   marginBottom: 15,
//   color: "#0ea5e9",  // bright blue icons
// };

// const title = {
//   fontSize: 20,
//   fontWeight: 700,
//   color: "#1e3a8a",  // deep blue
//   marginBottom: 10,
// };

// const desc = {
//   fontSize: 14,
//   color: "#4b5563",  // dark gray
//   lineHeight: 1.6,
// };

import React, { useRef, useEffect, useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #0a0c09;
    --cream: #f5f0e8;
    --gold: #b8965a;
    --gold-light: #d4b483;
    --muted: #7a7670;
    --border: rgba(184,150,90,0.15);
  }

  .pz-why {
    background: #0c0f0b;
    padding: 110px 0 100px;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* subtle radial glow center */
  .pz-why::before {
    content: '';
    position: absolute;
    width: 800px; height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184,150,90,0.055) 0%, transparent 65%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* grid lines */
  .pz-why::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(184,150,90,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184,150,90,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
  }

  .pz-why-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
    position: relative;
    z-index: 2;
  }

  /* ── Header ── */
  .pz-why-header {
    text-align: center;
    margin-bottom: 72px;
  }

  .pz-why-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }

  .pz-why-eyeline {
    width: 28px; height: 1px;
    background: var(--gold);
  }

  .pz-why-eyelabel {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .pz-why-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 4.5vw, 56px);
    font-weight: 300;
    color: var(--cream);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 18px;
  }

  .pz-why-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  .pz-why-sub {
    font-size: 14px;
    font-weight: 300;
    color: var(--muted);
    letter-spacing: 0.03em;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.8;
  }

  /* ── Grid ── */
  .pz-why-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 3px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .pz-why-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .pz-why-grid { grid-template-columns: 1fr; }
    .pz-why-inner { padding: 0 24px; }
  }

  /* ── Card ── */
  .pz-why-card {
    background: #0c0f0b;
    padding: 44px 36px;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: background 0.35s ease;

    /* for scroll-reveal */
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease, background 0.35s ease;
  }

  .pz-why-card.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .pz-why-card:hover {
    background: #111509;
  }

  /* Gold fill that sweeps up on hover */
  .pz-why-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0);
    transition: transform 0.45s ease;
  }

  .pz-why-card:hover::before {
    transform: scaleX(1);
  }

  /* Number watermark */
  .pz-why-card-num {
    position: absolute;
    top: 18px; right: 22px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 72px;
    font-weight: 300;
    color: rgba(184,150,90,0.06);
    line-height: 1;
    pointer-events: none;
    transition: color 0.35s ease;
  }

  .pz-why-card:hover .pz-why-card-num {
    color: rgba(184,150,90,0.1);
  }

  /* Icon box */
  .pz-why-icon-box {
    width: 52px; height: 52px;
    border: 1px solid var(--border);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
    transition: all 0.35s ease;
    position: relative;
    z-index: 1;
  }

  .pz-why-card:hover .pz-why-icon-box {
    border-color: rgba(184,150,90,0.4);
    background: rgba(184,150,90,0.06);
  }

  .pz-why-icon-box svg {
    width: 22px; height: 22px;
    stroke: var(--gold);
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.35s ease;
  }

  .pz-why-card:hover .pz-why-icon-box svg {
    transform: scale(1.1);
  }

  .pz-why-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    color: var(--cream);
    letter-spacing: 0.01em;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
  }

  .pz-why-card-divider {
    width: 24px; height: 1px;
    background: var(--border);
    margin-bottom: 16px;
    transition: width 0.35s ease, background 0.35s ease;
  }

  .pz-why-card:hover .pz-why-card-divider {
    width: 44px;
    background: var(--gold);
  }

  .pz-why-card-desc {
    font-size: 13.5px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.85;
    position: relative;
    z-index: 1;
  }

  /* ── Bottom strip ── */
  .pz-why-strip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    margin-top: 64px;
    padding-top: 48px;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }

  .pz-why-strip-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pz-why-strip-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    animation: pz-why-pulse 2.4s ease-in-out infinite;
  }

  @keyframes pz-why-pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(0.7); }
  }

  .pz-why-strip-dot:nth-child(1) { animation-delay: 0s; }
  .pz-why-strip-dot:nth-child(2) { animation-delay: 0.8s; }
  .pz-why-strip-dot:nth-child(3) { animation-delay: 1.6s; }

  .pz-why-strip-text {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 400;
  }
`;

/* SVG icons — clean line art */
const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
};

const REASONS = [
  {
    id: 1,
    title: "Trusted Listings",
    description: "Every property is verified by our team and listed by certified sellers — giving you accurate information and complete peace of mind.",
    icon: ICONS.shield,
  },
  {
    id: 2,
    title: "Premium Support",
    description: "Our dedicated advisors are always on hand to assist with queries, property viewings, and every step of the buying process.",
    icon: ICONS.chat,
  },
  {
    id: 3,
    title: "Smart Search",
    description: "Advanced filters and intelligent recommendations surface the properties that match your exact needs — fast.",
    icon: ICONS.search,
  },
  {
    id: 4,
    title: "Secure Transactions",
    description: "End-to-end legal support and secure payment infrastructure ensure every deal is seamless and fully protected.",
    icon: ICONS.lock,
  },
];

function useReveal() {
  const refs = useRef([]);
  const [revealed, setRevealed] = useState([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setRevealed((p) => [...p, i]), i * 120);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return { refs, revealed };
}

export default function WhyChoosePropZo() {
  const { refs, revealed } = useReveal();

  return (
    <>
      <style>{css}</style>
      <section className="pz-why">
        <div className="pz-why-inner">

          {/* Header */}
          <div className="pz-why-header">
            <div className="pz-why-eyebrow">
              <span className="pz-why-eyeline" />
              <span className="pz-why-eyelabel">Our Advantage</span>
              <span className="pz-why-eyeline" />
            </div>
            <h2 className="pz-why-title">
              Why Choose <em>PropZo?</em>
            </h2>
            <p className="pz-why-sub">
              Everything you need to find, buy, or rent your perfect property — in one trusted platform.
            </p>
          </div>

          {/* Cards grid */}
          <div className="pz-why-grid">
            {REASONS.map((r, i) => (
              <div
                key={r.id}
                ref={(el) => (refs.current[i] = el)}
                className={`pz-why-card${revealed.includes(i) ? " revealed" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="pz-why-card-num">0{r.id}</span>
                <div className="pz-why-icon-box">{r.icon}</div>
                <h3 className="pz-why-card-title">{r.title}</h3>
                <div className="pz-why-card-divider" />
                <p className="pz-why-card-desc">{r.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom trust strip */}
          <div className="pz-why-strip">
            {["12,000+ Verified Properties", "98% Client Satisfaction", "Trusted Since 2016"].map((t) => (
              <div key={t} className="pz-why-strip-item">
                <span className="pz-why-strip-dot" />
                <span className="pz-why-strip-text">{t}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

