import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .prop-section {
    padding: 100px 5%;
    background-color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }

  /* Header */
  .prop-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto 60px;
  }

  @media (max-width: 768px) {
    .prop-header {
      flex-direction: column;
      gap: 20px;
    }
  }

  .prop-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 500;
    line-height: 1.1;
    color: #1a1a1a;
    max-width: 400px;
  }

  .prop-desc {
    font-size: 15px;
    color: #888888;
    line-height: 1.6;
    max-width: 400px;
    margin-top: 10px;
  }

  /* Carousel/Slider Area */
  .prop-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 0;
  }

  @media (max-width: 1024px) {
    .prop-slider {
      flex-direction: column;
      gap: 40px;
    }
  }

  /* Card Base */
  .prop-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.5s ease;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .prop-card-img-wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .prop-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  .prop-card:hover img {
    transform: scale(1.05);
  }

  .prop-badge {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.4);
    padding: 6px 14px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
  }
  
  .prop-badge-dot {
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    position: relative;
  }
  
  .prop-badge-dot::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }

  /* Text below images */
  .prop-info {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 16px;
    background: #ffffff;
  }

  .prop-name {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .prop-location {
    font-size: 13px;
    color: #a0a0a0;
  }

  .prop-price {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Specific Card Sizes matching screenshot */
  
  /* Central Active Card */
  .prop-card-center {
    width: 600px;
    height: 400px;
    z-index: 2;
  }

  .prop-card-center .prop-card-inner {
    height: 320px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  .prop-card-center .prop-name {
    font-size: 20px;
  }

  .prop-card-center .prop-price {
    font-size: 20px;
  }

  /* Side Cards (Faded/Smaller) */
  .prop-card-side {
    width: 380px;
    height: 280px;
    opacity: 0.6;
    transform: scale(0.95);
    z-index: 1;
  }

  .prop-card-side:hover {
    opacity: 1;
    transform: scale(1);
  }

  .prop-card-side .prop-card-inner {
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }
  
  .prop-card-side::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.8));
    pointer-events: none;
    z-index: 5;
    transition: opacity 0.3s ease;
  }
  
  .prop-card-side.left-card::after {
    background: linear-gradient(to left, rgba(255,255,255,0.2), rgba(255,255,255,0.8));
  }

  .prop-card-side:hover::after {
    opacity: 0;
  }

  @media (max-width: 1024px) {
    .prop-card-center, .prop-card-side {
      width: 100%;
      height: auto;
      transform: none;
      opacity: 1;
    }
    .prop-card-side::after {
      display: none;
    }
    .prop-card-center .prop-card-inner, .prop-card-side .prop-card-inner {
      height: 300px;
    }
  }
`;

export default function PropertyPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ buy: 0, rent: 0, preRent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="prop-section">
        <div className="prop-header">
          <h2 className="prop-title">Find Your Dream Home Today</h2>
          <p className="prop-desc">
            Explore our latest listings in the most sought-after locations. we have the perfect home for you.
          </p>
        </div>

        <div className="prop-slider">
          
          {/* Left Side Card - Rent */}
          <div className="prop-card prop-card-side left-card" onClick={() => navigate('/rentpage')}>
            <div className="prop-card-inner">
              <div className="prop-badge">
                <span className="prop-badge-dot"></span>
                Rent Properties
              </div>
              <div className="prop-card-img-wrap">
                <img src="/DowntownApartment.jpg" alt="Rent Properties" />
              </div>
            </div>
            <div className="prop-info">
              <div>
                <h3 className="prop-name">Rent Properties</h3>
                <p className="prop-location">Find the perfect space that matches your lifestyle.</p>
              </div>
              <div className="prop-price">{loading ? "..." : `${stats.rent} Listings`}</div>
            </div>
          </div>

          {/* Center Active Card - Buy */}
          <div className="prop-card prop-card-center" onClick={() => navigate('/properties')}>
            <div className="prop-card-inner">
              <div className="prop-badge">
                <span className="prop-badge-dot"></span>
                Buy Properties
              </div>
              <div className="prop-card-img-wrap">
                <img src="/Modernhouse.jpg" alt="Buy Properties" />
              </div>
            </div>
            <div className="prop-info">
              <div>
                <h3 className="prop-name">Buy Properties</h3>
                <p className="prop-location">Invest in your future with our curated collection of verified premium residences.</p>
              </div>
              <div className="prop-price">{loading ? "..." : `${stats.buy} Listings`}</div>
            </div>
          </div>

          {/* Right Side Card - PreRent */}
          <div className="prop-card prop-card-side right-card" onClick={() => navigate('/prerent')}>
            <div className="prop-card-inner">
              <div className="prop-badge">
                <span className="prop-badge-dot"></span>
                Flexible Stay
              </div>
              <div className="prop-card-img-wrap">
                <img src="/LuxuryPenthouse.jpg" alt="Flexible Stay" />
              </div>
            </div>
            <div className="prop-info">
              <div>
                <h3 className="prop-name">Flexible Stay</h3>
                <p className="prop-location">Be the first to access upcoming high-demand rental locations.</p>
              </div>
              <div className="prop-price">{loading ? "..." : `${stats.preRent} Listings`}</div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
