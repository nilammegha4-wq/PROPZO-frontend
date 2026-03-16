import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

  .about-page {
    font-family: 'Outfit', sans-serif;
    color: #4C3324;
    overflow-x: hidden;
    background: #f5f0e8;
  }

  /* =========== Hero Section =========== */
  .about-hero {
    height: 70vh;
    min-height: 500px;
    background: linear-gradient(rgba(76,51,36,0.35), rgba(76,51,36,0.65)), url('https://images.unsplash.com/photo-1541882299865-c35061c28c6e?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10%;
    color: #F5EDE3;
    position: relative;
    border-bottom: 1px solid rgba(228, 203, 182, 0.3);
  }

  .about-breadcrumb {
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #F5EDE3;
    margin-bottom: 24px;
    font-weight: 500;
  }

  .about-breadcrumb span { color: #E4CBB6; cursor: pointer; transition: color 0.3s; }
  .about-breadcrumb span:hover { color: #fff; }

  .about-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 8vw, 6rem);
    font-weight: 700;
    margin: 0;
    color: #F5EDE3;
    line-height: 1.1;
    text-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  /* =========== Section 1: Intro =========== */
  .about-intro-sec {
    padding: 100px 5%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .intro-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 80px;
    gap: 40px;
  }

  .intro-top-title {
    flex: 1;
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    color: #4C3324;
    line-height: 1.2;
    max-width: 600px;
  }

  .intro-top-icons {
    display: flex;
    gap: 40px;
  }

  .icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #9a7060;
    font-size: 14px;
  }

  .icon-box svg { color: #B2846B; }

  .intro-bottom {
    display: flex;
    gap: 60px;
    align-items: center;
  }

  .intro-img-container {
    flex: 1;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
  }

  .intro-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  .intro-img-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(245,237,227,0.50) 0%, rgba(245,237,227,0) 60%);
    pointer-events: none;
  }

  .intro-text-content { flex: 1; }

  .section-label {
    color: #B2846B;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
    display: block;
    font-weight: 600;
  }

  .intro-main-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    color: #4C3324;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .intro-desc {
    color: #7a5c4a;
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .vision-mission-box { margin-bottom: 30px; }

  .vm-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #4C3324;
  }

  .vm-desc {
    color: #7a5c4a;
    line-height: 1.6;
  }

  @media (max-width: 992px) {
    .intro-top, .intro-bottom { flex-direction: column; }
  }

  /* =========== Section 2: Video Banner =========== */
  .video-banner {
    position: relative;
    height: 500px;
    background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop') center/cover fixed;
    display: flex;
    justify-content: center;
    align-items: center;
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

  .video-banner-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    max-width: 800px;
    line-height: 1.2;
    margin-bottom: -30px;
    color: #F5EDE3;
  }

  .play-btn-wrapper {
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
  }

  .play-btn {
    width: 80px;
    height: 80px;
    background: #E4CBB6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 30px rgba(76,51,36,0.18);
    color: #4C3324;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.3s, background 0.3s;
  }

  .play-btn:hover {
    transform: scale(1.1);
    background: #B2846B;
    color: #fff;
  }
  /* =========== Section 3: Why Choose Us =========== */
  .why-choose-sec {
    padding: 150px 5% 100px;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }

  .wcs-img-tall {
    width: 100%;
    height: 600px;
    object-fit: cover;
    border-radius: 8px;
  }

  .wcs-content-top { padding-top: 50px; }

  .wcs-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: #4C3324;
    line-height: 1.2;
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

      {/* Why Choose Us Section */}
      <section className="why-choose-sec">

        {/* Left Col */}
        <div>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Building Entrance" className="wcs-img-tall" />

          <div className="wcs-content-bottom">
            <span className="section-label">Choose That's Greate?</span>
            <h2 className="wcs-title">Our Exclusive Videos That's Greate Work.</h2>
            <p className="wcs-desc">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>

            <div className="stats-matrix">
              <div className="stat-block"><h3><span>+</span>12K</h3><p>Happy customers</p></div>
              <div className="stat-block"><h3><span>+</span>2.5K</h3><p>Complete Projects</p></div>
              <div className="stat-block"><h3><span>+</span>32K</h3><p>Awards Winning</p></div>
              <div className="stat-block"><h3><span>+</span>2.5K</h3><p>Complete Projects</p></div>
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

          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1554502570-07bf16d120a1?q=80&w=800&auto=format&fit=crop" alt="Skyscraper" className="wcs-img-short" />
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
