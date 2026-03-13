
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
    name: "PROPZO VILLA",
    headline: ["UPGRADE YOUR", "LIFE WITH SMART HOME", "TECHNOLOGY"],
    sub: "Luxury living in prime Mumbai",
    img: "5.jpg",
    type: "Luxury Villa",
    stats: [
      { val: "5.9K+", desc: "Successfully delivering\ninnovative projects\naround the world." },
      { val: "10K+", desc: "Award-winning innovative\nprojects delivered\nglobally." },
    ],
  },
  {
    name: "SKYLINE APT",
    headline: ["SMART LIVING", "ABOVE THE CITY", "SKYLINE"],
    sub: "Smart apartments above the city",
    img: "2.jpg",
    type: "Smart Apartment",
    stats: [
      { val: "1.2K+", desc: "Modern apartments\nhandpicked for\nurban lifestyles." },
      { val: "98%", desc: "Client satisfaction\nrate across all\nour properties." },
    ],
  },
  {
    name: "APEX PENTHOUSE",
    headline: ["THE PINNACLE", "OF CITY LIVING", "ELEVATED"],
    sub: "The pinnacle of city living",
    img: "3.jpg",
    type: "Premium Penthouse",
    stats: [
      { val: "360°", desc: "Panoramic city views\nfrom every premium\npenthouse floor." },
      { val: "50+", desc: "Exclusive penthouses\navailable in prime\nMumbai locations." },
    ],
  },
  {
    name: "CASA HOMES",
    headline: ["MODERN FAMILY", "LIVING SPACES", "REDEFINED"],
    sub: "Modern family living redefined",
    img: "4.jpg",
    type: "Family Home",
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
