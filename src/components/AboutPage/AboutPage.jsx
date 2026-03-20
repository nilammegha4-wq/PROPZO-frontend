import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const css = `
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

  .video-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(76,51,36,0.55);
  }

  .video-banner-content {
    position: relative;
    text-align: center;
    color: #F5EDE3;
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

  .wcs-desc {
    color: #7a5c4a;
    margin-bottom: 40px;
    line-height: 1.7;
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .feat-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }

  .feat-icon {
    color: #627B68;
    font-size: 18px;
    background: rgba(98,123,104,0.12);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .feat-text h5 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #4C3324;
    margin-bottom: 5px;
  }

  .feat-text p {
    color: #9a7060;
    font-size: 13px;
    line-height: 1.5;
  }

  .wcs-content-bottom { padding-top: 50px; }

  .stats-matrix {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 40px;
  }

  .stat-block h3 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: #B2846B;
    margin-bottom: 5px;
    display: flex;
    align-items: baseline;
  }

  .stat-block h3 span {
    color: rgba(178,132,107,0.35);
    font-size: 2rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    margin-right: 5px;
  }

  .stat-block p {
    color: #7a5c4a;
    font-size: 14px;
    font-weight: 500;
  }

  .wcs-img-short {
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin-top: 50px;
    border-radius: 8px;
  }

  @media (max-width: 992px) {
    .why-choose-sec { grid-template-columns: 1fr; }
    .wcs-img-tall, .wcs-img-short { height: 400px; }
  }

  /* =========== Section 4: Testimonials =========== */
  .testimonials-sec {
    background: #ede6da;
    padding: 100px 5%;
  }

  .test-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .test-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    color: #4C3324;
    margin-bottom: 15px;
  }

  .test-header p {
    color: #7a5c4a;
    max-width: 600px;
    margin: 0 auto;
  }

  .test-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .test-card {
    background: #fffaf5;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(76,51,36,0.06);
    position: relative;
    border: 1px solid rgba(178,132,107,0.14);
  }

  .quote-mark {
    position: absolute;
    top: -20px;
    left: 40px;
    width: 50px;
    height: 50px;
    background: #B2846B;
    color: #fffaf5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: serif;
    line-height: 1;
  }

  .test-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #7a5c4a;
    line-height: 1.7;
    margin-bottom: 30px;
    margin-top: 10px;
    font-style: italic;
  }

  .test-author {
    border-top: 1px solid rgba(178,132,107,0.18);
    padding-top: 20px;
    text-align: center;
    font-weight: 600;
    color: #4C3324;
  }

  @media (max-width: 992px) {
    .test-grid { grid-template-columns: 1fr; }
  }
`;

const AboutPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const displayReviews = reviews.length > 0 ? reviews.slice(0, 3) : [
    { name: "Tawoki Rabiman Taskir", feedback: "Etiam semper vehicula vulputate iaculis. Donec auctor semper bibendum congue tempus mollis ac. Aliqua placerat eleifend ac felis." },
    { name: "Emily Thomas", feedback: "Never at water me might. On formed merits hunted unable merely by mr whence or. Aliqua placerat eleifend ac felis." },
    { name: "John Smith", feedback: "Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect." }
  ];

  return (
    <div className="about-page">
      <style>{css}</style>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-breadcrumb">
          <span>Home</span> &gt; About Us
        </div>
        <h1 className="about-hero-title">About Us.</h1>
      </section>

      {/* Intro Section */}
      <section className="about-intro-sec">
        <div className="intro-top">
          <h2 className="intro-top-title">
            Propzo Offers An Exciting Range Of Luxury Apartment At Location In USA.
          </h2>
          <div className="intro-top-icons">
            <div className="icon-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '10px' }}>
                <path d="M3 21h18" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
              </svg>
              Building
            </div>
            <div className="icon-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '10px' }}>
                <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
              </svg>
              Location
            </div>
            <div className="icon-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '10px' }}>
                <path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Investment
            </div>
          </div>
        </div>

        <div className="intro-bottom">
          <div className="intro-img-container">
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" alt="Relaxing" />
            <div className="intro-img-overlay"></div>
          </div>

          <div className="intro-text-content">
            <span className="section-label">About Us</span>
            <h2 className="intro-main-title">That's Why We're On List Of Favorites.</h2>
            <p className="intro-desc">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
            </p>

            <div className="vision-mission-box">
              <h3 className="vm-title">Our Mission</h3>
              <p className="vm-desc">Passage of Lorem Ipsum will be available, but the majority have suffered alteration in some form, by injected humour.</p>
            </div>

            <div className="vision-mission-box">
              <h3 className="vm-title">Our Vision</h3>
              <p className="vm-desc">Passage of Lorem Ipsum will be available, but the majority have suffered alteration in some form, by injected humour.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Banner Section */}
      <section className="video-banner">
        <div className="video-banner-content">
          <h2 className="video-banner-title">Top Rated Real Estate Companies In Our Country</h2>
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
          </div>
        </div>

        {/* Right Col */}
        <div>
          <div className="wcs-content-top">
            <span className="section-label">Why Choose Us</span>
            <h2 className="wcs-title">That's Great Option Your Favorites Time.</h2>
            <p className="wcs-desc">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>

            <div className="features-grid">
              <div className="feat-item">
                <div className="feat-icon">★</div>
                <div className="feat-text"><h5>High quality products</h5><p>Diam semper nihil id aenean iaculis donec tortor semper.</p></div>
              </div>
              <div className="feat-item">
                <div className="feat-icon">👥</div>
                <div className="feat-text"><h5>Dedicated teams</h5><p>Diam semper nihil id aenean iaculis donec tortor semper.</p></div>
              </div>
              <div className="feat-item">
                <div className="feat-icon">📄</div>
                <div className="feat-text"><h5>Complete documents</h5><p>Diam semper nihil id aenean iaculis donec tortor semper.</p></div>
              </div>
              <div className="feat-item">
                <div className="feat-icon">🤝</div>
                <div className="feat-text"><h5>Friendly Services</h5><p>Diam semper nihil id aenean iaculis donec tortor semper.</p></div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Testimonials Section */}
      <section className="testimonials-sec">
        <div className="test-header">
          <h2 className="intro-main-title">What Client Says?</h2>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
        </div>

        <div className="test-grid">
          {displayReviews.map((item, idx) => (
            <div className="test-card" key={idx}>
              <div className="quote-mark">"</div>
              <p className="test-text">"{item.feedback}"</p>
              <div className="test-author">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
