// import React from "react";
// import { Link } from "react-router-dom";

// const Menu = () => {
//   return (
//     <>
//       <style>{`
//         /* =====================
//            RESET
//         ===================== */
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: "Segoe UI", sans-serif;
//         }

//         body {
//           background: #f3f4f6;
//           overflow-x: hidden;
//         }

//         /* =====================
//            HERO SECTION
//         ===================== */
//         .menu-hero {
//           min-height: 75vh;
//           padding-bottom: 140px;
//           background: linear-gradient(
//               rgba(12, 18, 32, 0.75),
//               rgba(12, 18, 32, 0.75)
//             ),
//             url("https://images.unsplash.com/photo-1600210492493-0946911123ea")
//               center/cover no-repeat;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           color: #fff;
//         }

//         .menu-hero h1 {
//           font-size: 3.6rem;
//           font-weight: 700;
//           letter-spacing: 1px;
//         }

//         .menu-hero span {
//           display: block;
//           margin-top: 12px;
//           font-size: 1.15rem;
//           color: #e4c16f;
//         }

//         /* =====================
//            MENU SECTION
//         ===================== */
//         .menu-section {
//           padding: 80px 0;
//         }

//         .menu-container {
//           width: 90%;
//           max-width: 1250px;
//           margin: auto;
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 35px;
//         }

//         /* =====================
//            MENU CARD
//         ===================== */
//         .menu-card {
//           background: rgba(255, 255, 255, 0.96);
//           border-radius: 22px;
//           padding: 40px 28px;
//           text-align: center;
//           box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
//           transition: all 0.35s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .menu-card::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, #e4c16f, #f7e7b3);
//           opacity: 0;
//           transition: 0.35s;
//         }

//         .menu-card:hover::before {
//           opacity: 0.15;
//         }

//         .menu-card:hover {
//           transform: translateY(-10px);
//         }

//         .menu-card * {
//           position: relative;
//           z-index: 2;
//         }

//         .menu-icon {
//           font-size: 3.2rem;
//           margin-bottom: 18px;
//         }

//         .menu-title {
//           font-size: 1.2rem;
//           font-weight: 600;
//           margin-bottom: 10px;
//           color: #0c1220;
//         }

//         .menu-desc {
//           font-size: 0.92rem;
//           color: #555;
//           line-height: 1.5;
//           margin-bottom: 18px;
//         }

//         .stay-options {
//           display: flex;
//           justify-content: center;
//           gap: 10px;
//           margin-bottom: 22px;
//         }

//         .stay-options span {
//           padding: 6px 14px;
//           background: #f1f1f1;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: 600;
//           color: #0c1220;
//         }

//         .menu-btn {
//           padding: 11px 26px;
//           border: none;
//           background: linear-gradient(135deg, #e4c16f, #f7e7b3);
//           color: #0c1220;
//           font-weight: 600;
//           border-radius: 25px;
//           cursor: pointer;
//           transition: 0.3s;
//         }

//         .menu-btn:hover {
//           background: #0c1220;
//           color: #fff;
//         }

//         /* =====================
//            RESPONSIVE
//         ===================== */
//         @media (max-width: 1024px) {
//           .menu-container {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 600px) {
//           .menu-container {
//             grid-template-columns: 1fr;
//           }

//           .menu-hero h1 {
//             font-size: 2.4rem;
//           }
//         }
//       `}</style>

//       {/* ===================== HERO ===================== */}
//       <section className="menu-hero">
//         <div>
//           <h1>Explore Our Menu</h1>
//           <span>Your Gateway to Premium Real Estate</span>
//         </div>
//       </section>

//       {/* ===================== MENU CARDS ===================== */}
//       <section className="menu-section">
//         <div className="menu-container">

//           <MenuCard
//             icon="🏡"
//             title="Buy Property"
//             desc="Browse luxury villas, flats, and dream homes curated for you."
//             btn="Explore"
//             link="/properties"
//           />

//           <MenuCard
//             icon="🏢"
//             title="Rent House"
//             desc="Short & long-term rental options with verified properties."
//             btn="View Rentals"
//             link="/rentpage"
//           />

//           <MenuCard
//             icon="🏷️"
//             title="Sell Property"
//             desc="List your property and connect with serious buyers."
//             btn="Sell Now"
//             link="/sellproperty"
//           />

//           <MenuCard
//             icon="👨‍💼"
//             title="Agent Support"
//             desc="Get expert guidance from trusted real estate professionals."
//             btn="Contact Agent"
//             link="/agent"
//           />

//           {/* ✅ NEW FLEXIBLE STAY CARD */}
//           <FlexibleStayCard />

//           <MenuCard
//             icon="❤️"
//             title="Premium Services"
//             desc="Interior design, legal help, home loans & inspections."
//             btn="Know More"
//             link="/premiumservices"
//           />

//         </div>
//       </section>
//     </>
//   );
// };

// /* =====================
//    MENU CARD
// ===================== */
// const MenuCard = ({ icon, title, desc, btn, link }) => {
//   return (
//     <div className="menu-card">
//       <div className="menu-icon">{icon}</div>
//       <div className="menu-title">{title}</div>
//       <div className="menu-desc">{desc}</div>

//       <Link to={link}>
//         <button className="menu-btn">{btn}</button>
//       </Link>
//     </div>
//   );
// };

// /* =====================
//    FLEXIBLE STAY CARD
// ===================== */
// const FlexibleStayCard = () => {
//   return (
//     <div className="menu-card">
//       <div className="menu-icon">⏱️</div>
//       <div className="menu-title">Flexible Stay</div>
//       <div className="menu-desc">
//         Choose properties available for short stays and flexible durations.
//       </div>

//       <div className="stay-options">
//         <span>Per Hour</span>
//         <span>Per Day</span>
//         <span>Per Week</span>
//       </div>

//       <Link to="/prerent">
//         <button className="menu-btn">Explore Options</button>
//       </Link>
//     </div>
//   );
// };

// export default Menu;
import React from "react";
import { Link } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #2c2416;
    --gold: #8a6a28;
    --gold-light: #a07830;
    --muted: #6b5e4a;
    --muted-light: #9c8e7a;
    --border: rgba(138,106,40,0.15);
    --bg: #f5f1ea;
    --card-bg: #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ─── HERO ─── */
  .mn-hero {
    position: relative;
    min-height: 68vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    border-bottom: 1px solid var(--border);
  }

  .mn-hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center 60%;
    animation: mn-bg-zoom 18s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes mn-bg-zoom {
    from { transform: scale(1.0); }
    to   { transform: scale(1.06); }
  }

  .mn-hero-overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(to bottom,
        rgba(245,241,234,0.86) 0%,
        rgba(245,241,234,0.76) 50%,
        rgba(245,241,234,0.92) 100%);
    pointer-events: none;
  }

  .mn-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(138,106,40,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(138,106,40,0.04) 1px, transparent 1px);
    background-size: 72px 72px;
    pointer-events: none;
  }

  .mn-hero-glow {
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(138,106,40,0.07) 0%, transparent 65%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .mn-hero-content {
    position: relative;
    z-index: 1;
    padding: 80px 24px 90px;
  }

  .mn-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .mn-eyeline { width: 32px; height: 1px; background: var(--gold); }

  .mn-eyelabel {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
  }

  .mn-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 6vw, 76px);
    font-weight: 300;
    color: var(--ink);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  .mn-hero-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  .mn-hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: var(--muted);
    max-width: 460px;
    margin: 0 auto 40px;
    line-height: 1.85;
  }

  .mn-hero-stats {
    display: inline-flex;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 3px;
    overflow: hidden;
    background: var(--card-bg);
    box-shadow: 0 4px 20px rgba(138,106,40,0.08);
  }

  .mn-hero-stat {
    padding: 18px 40px;
    border-right: 1px solid var(--border);
    text-align: center;
  }

  .mn-hero-stat:last-child { border-right: none; }

  .mn-hero-stat-num {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    color: var(--gold-light);
    line-height: 1;
    margin-bottom: 4px;
  }

  .mn-hero-stat-label {
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted-light);
  }

  /* ─── SECTION ─── */
  .mn-section {
    background: var(--bg);
    padding: 80px 0 110px;
    font-family: 'DM Sans', sans-serif;
    position: relative;
  }

  .mn-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(138,106,40,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(138,106,40,0.03) 1px, transparent 1px);
    background-size: 72px 72px;
    pointer-events: none;
  }

  .mn-wrap {
    position: relative;
    z-index: 1;
    width: 90%;
    max-width: 1180px;
    margin: 0 auto;
  }

  .mn-section-label {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 56px;
  }

  .mn-section-label-text {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
    white-space: nowrap;
  }

  .mn-section-label-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ─── GRID ─── */
  .mn-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  @media (max-width: 1024px) {
    .mn-grid { grid-template-columns: repeat(2, 1fr); gap: 22px; }
  }

  @media (max-width: 600px) {
    .mn-grid { grid-template-columns: 1fr; gap: 18px; }
    .mn-hero-stats { flex-direction: column; }
    .mn-hero-stat { border-right: none; border-bottom: 1px solid var(--border); }
    .mn-hero-stat:last-child { border-bottom: none; }
  }

  /* ─── CARD ─── */
  .mn-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 44px 38px 40px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease;
  }

  .mn-card:hover {
    box-shadow: 0 24px 64px rgba(138,106,40,0.13);
    transform: translateY(-5px);
    border-color: rgba(138,106,40,0.3);
  }

  /* Animated gold top bar */
  .mn-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }

  .mn-card:hover::before { transform: scaleX(1); }

  /* Soft inner glow on hover */
  .mn-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 0%, rgba(138,106,40,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .mn-card:hover::after { opacity: 1; }

  /* Watermark */
  .mn-card-watermark {
    position: absolute;
    bottom: -14px; right: 18px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 96px;
    font-weight: 600;
    color: rgba(138,106,40,0.04);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    transition: color 0.4s ease;
  }

  .mn-card:hover .mn-card-watermark {
    color: rgba(138,106,40,0.07);
  }

  /* Icon box */
  .mn-card-icon {
    width: 54px; height: 54px;
    border: 1px solid var(--border);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 30px;
    background: rgba(138,106,40,0.045);
    flex-shrink: 0;
    transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
  }

  .mn-card:hover .mn-card-icon {
    background: rgba(138,106,40,0.10);
    border-color: rgba(138,106,40,0.32);
    transform: scale(1.06);
  }

  .mn-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 25px;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.01em;
    margin-bottom: 8px;
    line-height: 1.15;
  }

  .mn-card-rule {
    width: 30px; height: 1px;
    background: var(--gold);
    margin-bottom: 18px;
    opacity: 0.5;
    transition: width 0.35s ease, opacity 0.35s ease;
  }

  .mn-card:hover .mn-card-rule { width: 56px; opacity: 1; }

  .mn-card-desc {
    font-size: 13.5px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.9;
    margin-bottom: 30px;
    flex: 1;
  }

  /* Stay tags */
  .mn-stay-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .mn-stay-tag {
    padding: 5px 14px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
    background: rgba(138,106,40,0.04);
  }

  /* CTA button */
  .mn-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 13px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
    border: 1px solid rgba(138,106,40,0.28);
    border-radius: 2px;
    background: transparent;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: flex-start;
    position: relative;
    overflow: hidden;
  }

  .mn-btn-fill {
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-101%);
    transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
    z-index: 0;
  }

  .mn-btn-text, .mn-btn-arrow {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease, transform 0.25s ease;
  }

  .mn-btn:hover { border-color: var(--gold); color: #fff; }
  .mn-btn:hover .mn-btn-fill { transform: translateX(0); }
  .mn-btn:hover .mn-btn-arrow { transform: translateX(4px); }
`;

const CARDS = [
  {
    num: "01", icon: "🏡",
    title: "Buy Property",
    desc: "Browse luxury villas, flats, and dream homes curated for discerning buyers across prime Mumbai locations.",
    btn: "Explore Properties",
    link: "/properties",
  },
  {
    num: "02", icon: "🏢",
    title: "Rent a House",
    desc: "Verified, move-in ready properties for short and long-term rentals — seamless from search to keys.",
    btn: "View Rentals",
    link: "/rentpage",
  },
  {
    num: "03", icon: "🏷️",
    title: "Sell Property",
    desc: "List with confidence. Connect with serious, verified buyers through our premium seller network.",
    btn: "Sell Now",
    link: "/sellproperty",
  },
  {
    num: "04", icon: "👨‍💼",
    title: "Agent Support",
    desc: "Personalised guidance from seasoned professionals who understand every micro-market inside out.",
    btn: "Contact Agent",
    link: "/agent",
  },
  {
    num: "05", icon: "⏱️",
    title: "Flexible Stay",
    desc: "Properties for fully flexible durations — perfectly suited to your schedule and lifestyle needs.",
    btn: "Explore Options",
    link: "/prerent",
    flexible: true,
  },
  {
    num: "06", icon: "❤️",
    title: "Premium Services",
    desc: "Interior design, legal counsel, home loans & property inspections — all under one trusted roof.",
    btn: "Know More",
    link: "/premiumservices",
  },
];

export default function Menu() {
  return (
    <>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section className="mn-hero">
        <div className="mn-hero-bg" />
        <div className="mn-hero-overlay" />
        <div className="mn-hero-grid" />
        <div className="mn-hero-glow" />
        <div className="mn-hero-content">
          <div className="mn-eyebrow">
            <span className="mn-eyeline" />
            <span className="mn-eyelabel">PropZo · Premium Real Estate</span>
            <span className="mn-eyeline" />
          </div>
          <h1 className="mn-hero-title">
            Your Gateway to<br /><em>Premium Real Estate</em>
          </h1>
          <p className="mn-hero-sub">
            Every service you need — buying, selling, renting, flexible stays, and expert support — all in one place.
          </p>
          <div className="mn-hero-stats">
            <div className="mn-hero-stat">
              <span className="mn-hero-stat-num">12K<span style={{fontSize:16,color:"var(--gold)"}}>+</span></span>
              <span className="mn-hero-stat-label">Properties</span>
            </div>
            <div className="mn-hero-stat">
              <span className="mn-hero-stat-num">98<span style={{fontSize:16,color:"var(--gold)"}}>%</span></span>
              <span className="mn-hero-stat-label">Satisfaction</span>
            </div>
            <div className="mn-hero-stat">
              <span className="mn-hero-stat-num">8<span style={{fontSize:16,color:"var(--gold)"}}>Y</span></span>
              <span className="mn-hero-stat-label">Years of Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="mn-section">
        <div className="mn-wrap">
          <div className="mn-section-label">
            <span className="mn-section-label-text">Our Services</span>
            <span className="mn-section-label-line" />
          </div>

          <div className="mn-grid">
            {CARDS.map((card) => (
              <div className="mn-card" key={card.num}>
                <span className="mn-card-watermark">{card.num}</span>
                <div className="mn-card-icon">{card.icon}</div>
                <div className="mn-card-title">{card.title}</div>
                <div className="mn-card-rule" />
                <p className="mn-card-desc">{card.desc}</p>

                {card.flexible && (
                  <div className="mn-stay-tags">
                    {["Per Hour", "Per Day", "Per Week"].map((t) => (
                      <span key={t} className="mn-stay-tag">{t}</span>
                    ))}
                  </div>
                )}

                <Link to={card.link} style={{ textDecoration: "none" }}>
                  <button className="mn-btn">
                    <div className="mn-btn-fill" />
                    <span className="mn-btn-text">{card.btn}</span>
                    <svg className="mn-btn-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
