// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PropertyCards() {
//   const navigate = useNavigate(); // ✅ ADD

//   const VISIBLE = 3;
//   const CARD_WIDTH = 345;
//   const GAP = 25;

//   const properties = [
//     { id: 1, title: "Modern Luxury Villa", location: "Mumbai", price: "₹6.5 Cr", img: "Villa.jpg" },
//     { id: 2, title: "City Apartment", location: "Mumbai", price: "₹2.5 Cr", img: "DowntownApartment.jpg" },
//     { id: 3, title: "Luxury Penthouse", location: "Pune", price: "₹1 Lakh", img: "LuxuryPenthouse.jpg" },
//     { id: 4, title: "Mountain View Villa", location: "Lonavala", price: "₹3.8 Cr", img: "MountainViewVilla.jpg" },
//     { id: 5, title: "Sea View Villa", location: "Goa", price: "₹70K", img: "SeaViewVilla.jpg" },
//     { id: 6, title: "Floating House", location: "Kerala", price: "₹10K", img: "Floatinghouse.jpg" },
//     { id: 7, title: "Cottage House", location: "Pune", price: "₹30K", img: "Cottagehouse.jpg" },
//     { id: 8, title: "Royal House", location: "Mumbai", price: "₹10 Cr", img: "RoyalHouse.jpg" },
//   ];

//   const TOTAL_SLIDES = properties.length + 1;
//   const MAX_INDEX = TOTAL_SLIDES - VISIBLE;

//   const [index, setIndex] = useState(0);
//   const startX = useRef(0);
//   const dragging = useRef(false);

//   const startDrag = (e) => {
//     dragging.current = true;
//     startX.current = e.touches ? e.touches[0].clientX : e.clientX;
//   };

//   const endDrag = (e) => {
//     if (!dragging.current) return;
//     const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//     const diff = startX.current - endX;

//     if (diff > 60 && index < MAX_INDEX) setIndex(index + 1);
//     if (diff < -60 && index > 0) setIndex(index - 1);

//     dragging.current = false;
//   };

//   return (
//     <div style={container}>
//       <h2 style={heading}>Premium Properties</h2>

//       {index > 0 && (
//         <button style={{ ...arrow, left: 0 }} onClick={() => setIndex(index - 1)}>‹</button>
//       )}
//       {index < MAX_INDEX && (
//         <button style={{ ...arrow, right: 0 }} onClick={() => setIndex(index + 1)}>›</button>
//       )}

//       <div
//         style={sliderWrapper}
//         onMouseDown={startDrag}
//         onMouseUp={endDrag}
//         onMouseLeave={endDrag}
//         onTouchStart={startDrag}
//         onTouchEnd={endDrag}
//       >
//         <div
//           style={{
//             ...slider,
//             transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
//           }}
//         >
//           {/* PROPERTY CARDS */}
//           {properties.map((p) => (
//             <div key={p.id} style={card}>
//               <img src={p.img} alt={p.title} style={img} />

//               <div style={cardBody}>
//                 <h3 style={title}>{p.title}</h3>
//                 <p style={location}>{p.location}</p>
//                 <strong style={price}>{p.price}</strong>

//                 <button style={viewBtn}>View Details</button>
//               </div>
//             </div>
//           ))}

//           {/* EXPLORE MORE SLIDE */}
//           <div style={exploreSlide}>
//             <button
//               style={exploreBtn}
//               onClick={() => navigate("/menu")} // ✅ OPENS MENU PAGE
//             >
//               Explore More Properties →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const container = {
//   padding: "60px",
//   position: "relative",
//   fontFamily: "Poppins",
// };

// const heading = {
//   fontSize: 34,
//   textAlign: "center",
//   marginBottom: 30,
//   color: "#0b2c5f",
// };

// const sliderWrapper = { overflow: "hidden" };

// const slider = {
//   display: "flex",
//   gap: 25,
//   padding: "10px 70px",
//   transition: "transform .5s cubic-bezier(.4,0,.2,1)",
// };

// const card = {
//   minWidth: 320,
//   background: "rgba(255,255,255,.85)",
//   borderRadius: 20,
//   boxShadow: "0 15px 35px rgba(0,0,0,.12)",
//   overflow: "hidden",
// };

// const img = {
//   width: "100%",
//   height: 220,
//   objectFit: "cover",
// };

// const cardBody = {
//   padding: 20,
// };

// const title = {
//   fontSize: 18,
//   fontWeight: 700,
//   color: "#0b2c5f",
// };

// const location = {
//   fontSize: 14,
//   color: "#6b7280",
//   marginTop: 6,
// };

// const price = {
//   display: "block",
//   marginTop: 10,
//   fontSize: 18,
//   color: "#1e40af",
// };

// const viewBtn = {
//   marginTop: 18,
//   width: "100%",
//   padding: "12px",
//   borderRadius: 12,
//   border: "none",
//   cursor: "pointer",
//   fontWeight: 700,
//   color: "#fff",
//   background: "linear-gradient(90deg,#0ea5e9,#2563eb)",
// };

// const exploreSlide = {
//   minWidth: 320,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const exploreBtn = {
//   padding: "18px 42px",
//   borderRadius: 40,
//   border: "none",
//   fontWeight: 800,
//   cursor: "pointer",
//   color: "#fff",
//   background: "linear-gradient(90deg,#0ea5e9,#2563eb)",
// };

// const arrow = {
//   position: "absolute",
//   top: "50%",
//   transform: "translateY(-50%)",
//   width: 46,
//   height: 46,
//   borderRadius: "50%",
//   border: "none",
//   fontSize: 24,
//   cursor: "pointer",
//   background: "#fff",
//   zIndex: 10,
// };
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #0a0c09;
    --cream: #f5f0e8;
    --gold: #b8965a;
    --gold-light: #d4b483;
    --muted: #7a7670;
    --border: rgba(184,150,90,0.15);
    --card-bg: #111309;
    --card-hover: #161a10;
  }

  .pz-cards-section {
    background: #0a0c09;
    padding: 100px 0 80px;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .pz-cards-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(184,150,90,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184,150,90,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
  }

  /* ── Section header ── */
  .pz-section-header {
    text-align: center;
    margin-bottom: 56px;
    padding: 0 40px;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: pz-cards-fadeUp 0.7s ease 0.1s forwards;
  }

  @keyframes pz-cards-fadeUp {
    to { opacity: 1; transform: translateY(0); }
    from { opacity: 0; transform: translateY(20px); }
  }

  .pz-section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .pz-section-line {
    width: 28px; height: 1px;
    background: var(--gold);
  }

  .pz-section-label {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 400;
  }

  .pz-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 52px);
    font-weight: 300;
    color: var(--cream);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .pz-section-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  /* ── Slider shell ── */
  .pz-slider-shell {
    position: relative;
    z-index: 2;
  }

  .pz-slider-overflow {
    overflow: hidden;
    cursor: grab;
    user-select: none;
  }

  .pz-slider-overflow:active { cursor: grabbing; }

  .pz-slider-track {
    display: flex;
    gap: 20px;
    padding: 12px 60px 24px;
    transition: transform 0.1s cubic-bezier(0.76, 0, 0.24, 1);
    will-change: transform;
  }

  /* ── Arrow buttons ── */
  .pz-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px; height: 44px;
    border-radius: 2px;
    border: 1px solid var(--border);
    background: rgba(10,12,9,0.9);
    color: var(--gold);
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.25s ease;
    backdrop-filter: blur(8px);
  }

  .pz-arrow:hover {
    background: var(--gold);
    color: var(--ink);
    border-color: var(--gold);
    box-shadow: 0 8px 24px rgba(184,150,90,0.3);
  }

  .pz-arrow-left { left: 16px; }
  .pz-arrow-right { right: 16px; }

  /* ── Card ── */
  .pz-card {
    min-width: 300px;
    max-width: 300px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
    flex-shrink: 0;
  }

  .pz-card:hover {
    transform: translateY(-6px);
    border-color: rgba(184,150,90,0.35);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,150,90,0.1);
  }

  .pz-card-img-wrap {
    position: relative;
    height: 210px;
    overflow: hidden;
  }

  .pz-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    display: block;
  }

  .pz-card:hover .pz-card-img-wrap img {
    transform: scale(1.06);
  }

  .pz-card-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,12,9,0.7) 0%, transparent 55%);
  }

  /* Location badge on image */
  .pz-card-location-badge {
    position: absolute;
    bottom: 12px;
    left: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: var(--cream);
    font-weight: 300;
  }

  .pz-card-location-badge svg {
    color: var(--gold);
    flex-shrink: 0;
  }

  /* Tag on image */
  .pz-card-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    border: 1px solid rgba(184,150,90,0.4);
    border-radius: 1px;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    background: rgba(10,12,9,0.7);
    backdrop-filter: blur(6px);
  }

  /* Card body */
  .pz-card-body {
    padding: 20px 20px 22px;
  }

  .pz-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    color: var(--cream);
    line-height: 1.2;
    letter-spacing: 0.01em;
    margin-bottom: 12px;
  }

  .pz-card-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 14px;
  }

  .pz-card-price-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .pz-card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: var(--gold-light);
    letter-spacing: 0.02em;
  }

  .pz-card-price-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .pz-card-view-btn {
    width: 100%;
    padding: 11px 0;
    border: 1px solid var(--border);
    border-radius: 2px;
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .pz-card-view-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateY(101%);
    transition: transform 0.35s cubic-bezier(0.76,0,0.24,1);
  }

  .pz-card-view-btn:hover {
    border-color: var(--gold);
    color: var(--ink);
  }

  .pz-card-view-btn:hover::before { transform: translateY(0); }

  .pz-card-view-btn span { position: relative; z-index: 1; }

  /* ── Explore slide ── */
  .pz-explore-slide {
    min-width: 300px;
    max-width: 300px;
    flex-shrink: 0;
    border: 1px dashed rgba(184,150,90,0.25);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px 30px;
    background: rgba(184,150,90,0.02);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pz-explore-slide:hover {
    border-color: rgba(184,150,90,0.5);
    background: rgba(184,150,90,0.05);
    transform: translateY(-4px);
  }

  .pz-explore-icon {
    width: 52px; height: 52px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    font-size: 20px;
    transition: all 0.3s ease;
  }

  .pz-explore-slide:hover .pz-explore-icon {
    border-color: var(--gold);
    background: rgba(184,150,90,0.1);
  }

  .pz-explore-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: var(--cream);
    text-align: center;
    line-height: 1.3;
    letter-spacing: 0.02em;
  }

  .pz-explore-sub {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* ── Progress dots ── */
  .pz-progress {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 36px;
    position: relative;
    z-index: 2;
  }

  .pz-prog-dot {
    width: 24px; height: 2px;
    background: rgba(184,150,90,0.2);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pz-prog-dot.active {
    width: 40px;
    background: var(--gold);
  }
`;

const PROPERTIES = [
  { id: 1, title: "Modern Luxury Villa",    location: "Mumbai",   price: "₹6.5 Cr", img: "Villa.jpg",               tag: "For Sale"  },
  { id: 2, title: "City Apartment",         location: "Mumbai",   price: "₹2.5 Cr", img: "DowntownApartment.jpg",   tag: "For Sale"  },
  { id: 3, title: "Luxury Penthouse",       location: "Pune",     price: "₹1 Lakh", img: "LuxuryPenthouse.jpg",     tag: "For Rent"  },
  { id: 4, title: "Mountain View Villa",    location: "Lonavala", price: "₹3.8 Cr", img: "MountainViewVilla.jpg",   tag: "For Sale"  },
  { id: 5, title: "Sea View Villa",         location: "Goa",      price: "₹70K",    img: "SeaViewVilla.jpg",        tag: "For Rent"  },
  { id: 6, title: "Floating House",         location: "Kerala",   price: "₹10K",    img: "Floatinghouse.jpg",       tag: "For Rent"  },
  { id: 7, title: "Cottage House",          location: "Pune",     price: "₹30K",    img: "Cottagehouse.jpg",        tag: "For Rent"  },
  { id: 8, title: "Royal House",            location: "Mumbai",   price: "₹10 Cr",  img: "RoyalHouse.jpg",          tag: "For Sale"  },
];

const CARD_W = 300;
const GAP    = 20;
const VISIBLE = 3;

export default function PropertyCards() {
  const navigate  = useNavigate();
  const TOTAL     = PROPERTIES.length + 1; // +1 explore slide
  const MAX_IDX   = TOTAL - VISIBLE;

  const [index,  setIndex]  = useState(0);
  const startX   = useRef(0);
  const dragging = useRef(false);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, MAX_IDX));

  const onDragStart = (e) => {
    dragging.current = true;
    startX.current   = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const onDragEnd = (e) => {
    if (!dragging.current) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX.current - endX;
    if (diff > 50 && index < MAX_IDX) next();
    if (diff < -50 && index > 0) prev();
    dragging.current = false;
  };

  return (
    <>
      <style>{css}</style>
      <section className="pz-cards-section">

        {/* Header */}
        <div className="pz-section-header">
          <div className="pz-section-eyebrow">
            <span className="pz-section-line" />
            <span className="pz-section-label">Curated Collection</span>
            <span className="pz-section-line" />
          </div>
          <h2 className="pz-section-title">
            Premium <em>Properties</em>
          </h2>
        </div>

        {/* Slider */}
        <div className="pz-slider-shell">
          {index > 0 && (
            <button className="pz-arrow pz-arrow-left" onClick={prev}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {index < MAX_IDX && (
            <button className="pz-arrow pz-arrow-right" onClick={next}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <div
            className="pz-slider-overflow"
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
          >
            <div
              className="pz-slider-track"
              style={{ transform: `translateX(-${index * (CARD_W + GAP)}px)` }}
            >
              {PROPERTIES.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}

              {/* Explore slide */}
              <div className="pz-explore-slide" onClick={() => navigate("/menu")}>
                <div className="pz-explore-icon">→</div>
                <p className="pz-explore-text">Explore All Properties</p>
                <span className="pz-explore-sub">
                  View collection
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="pz-progress">
          {Array.from({ length: MAX_IDX + 1 }).map((_, i) => (
            <div
              key={i}
              className={`pz-prog-dot${i === index ? " active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

      </section>
    </>
  );
}

function PropertyCard({ property: p }) {
  return (
    <div className="pz-card">
      <div className="pz-card-img-wrap">
        <img src={p.img} alt={p.title} draggable="false" />
        <div className="pz-card-img-overlay" />
        <span className="pz-card-tag">{p.tag}</span>
        <div className="pz-card-location-badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {p.location}
        </div>
      </div>
      <div className="pz-card-body">
        <h3 className="pz-card-title">{p.title}</h3>
        <div className="pz-card-divider" />
        <div className="pz-card-price-row">
          <span className="pz-card-price">{p.price}</span>
          <span className="pz-card-price-label">Starting From</span>
        </div>
        <button className="pz-card-view-btn">
          <span>View Details</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position:"relative",zIndex:1}}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
