import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <style>{`
        /* =====================
           RESET
        ===================== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif;
        }

        body {
          overflow-x: hidden;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
        }

        /* =====================
           HERO
        ===================== */
        .about-hero {
          position: relative;
          height: 70vh;
          background: url("https://images.unsplash.com/photo-1560185127-6ed189bf02f4")
            center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
        }

        .about-hero-content {
          position: relative;
          text-align: center;
          color: #fff;
          z-index: 1;
        }

        .about-hero-content h1 {
          font-size: 3.5rem;
        }

        .about-hero-content p {
          font-size: 1.2rem;
          margin-top: 10px;
          opacity: 0.9;
        }

        /* =====================
           INTRO
        ===================== */
        .about-intro {
          padding: 80px 0;
          text-align: center;
        }

        .about-intro h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .about-intro p {
          max-width: 800px;
          margin: auto;
          font-size: 1.1rem;
          color: #555;
          line-height: 1.7;
        }

        /* =====================
           VISION & MISSION
        ===================== */
        .vision-mission {
          padding: 80px 0;
          background: #f7f7f7;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .card {
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .card h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
        }

        .card p {
          color: #555;
          line-height: 1.6;
        }

        /* =====================
           STATS
        ===================== */
        .stats {
          padding: 70px 0;
          background: #111;
          color: #fff;
        }

        .stat-box {
          text-align: center;
        }

        .stat-box h2 {
          font-size: 2.8rem;
          color: #f5c16c;
        }

        .stat-box p {
          margin-top: 8px;
          opacity: 0.8;
        }

        /* =====================
           WHY PROPOZO
        ===================== */
        .why-propozo {
          padding: 80px 0;
        }

        .why-propozo h2 {
          text-align: center;
          font-size: 2.4rem;
          margin-bottom: 50px;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .feature {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
        }

        .feature h4 {
          margin-bottom: 10px;
        }

        .feature p {
          color: #555;
        }

        /* =====================
           CTA
        ===================== */
        .about-cta {
          padding: 90px 20px;
          text-align: center;
          background: linear-gradient(135deg, #111, #333);
          color: #fff;
        }

        .about-cta h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .about-cta p {
          margin-bottom: 25px;
          opacity: 0.85;
        }

        .cta-btn {
          padding: 14px 36px;
          border: none;
          border-radius: 30px;
          background: #f5c16c;
          color: #111;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          background: #ffd27d;
        }

        @media (max-width: 768px) {
          .about-hero-content h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>

      {/* ===================== HERO ===================== */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Propzo</h1>
          <p>Redefining how you buy, sell, and invest in real estate</p>
        </div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="about-intro">
        <div className="container">
          <h2>Who We Are</h2>
          <p>
            <strong>Propzo</strong> is a modern real estate platform created to make
            property discovery simple, transparent, and intelligent. We connect
            people with verified properties using smart technology and expert
            insights.
          </p>
        </div>
      </section>

      {/* ===================== VISION & MISSION ===================== */}
      <section className="vision-mission">
        <div className="container grid">
          <div className="card">
            <h3>Our Vision</h3>
            <p>
              To become the most trusted digital real-estate ecosystem where every
              decision feels confident and informed.
            </p>
          </div>

          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To empower buyers and investors with verified listings, market
              transparency, and professional guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="stats">
        <div className="container grid">
          <div className="stat-box">
            <h2>10K+</h2>
            <p>Verified Properties</p>
          </div>
          <div className="stat-box">
            <h2>5K+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="stat-box">
            <h2>50+</h2>
            <p>Trusted Developers</p>
          </div>
          <div className="stat-box">
            <h2>15+</h2>
            <p>Cities Covered</p>
          </div>
        </div>
      </section>

      {/* ===================== WHY PROPOZO ===================== */}
      <section className="why-propozo">
        <div className="container">
          <h2>Why Choose Propzo</h2>

          <div className="features">
            <div className="feature">
              <h4>✔ Verified Listings</h4>
              <p>Every property is checked for authenticity and trust.</p>
            </div>

            <div className="feature">
              <h4>✔ Smart Search</h4>
              <p>Advanced filters to match your lifestyle and budget.</p>
            </div>

            <div className="feature">
              <h4>✔ Transparent Pricing</h4>
              <p>No hidden costs, only real market data.</p>
            </div>

            <div className="feature">
              <h4>✔ Expert Support</h4>
              <p>Guidance from search to final paperwork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="about-cta">
        <h2>Your Property Journey Starts Here</h2>
        <p>Experience smarter real-estate decisions with Propzo</p>

        <Link to="/menu">
          <button className="cta-btn">Explore Properties</button>
        </Link>
      </section>
    </>
  );
};

export default About;
