import React, { useState } from "react";

export default function PropertyInspection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyAddress: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/premium-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageName: `Inspection (${formData.propertyType})`,
          serviceType: "Property Inspection"
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        alert("Success! Your inspection request has been submitted. We will contact you shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyType: "",
          propertyAddress: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inspection-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        :root {
          --primary: #4C3324;
          --secondary: #819B8B;
          --accent: #B2846B;
          --text-dark: #4C3324;
          --text-light: #627B68;
          --bg-light: #F5F0E8;
          --white: #ffffff;
        }

        body, html { margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; background-color: var(--bg-light); color: var(--text-dark); }
        h1, h2, h3, h4, button { font-family: 'Cormorant Garamond', serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { animation: fadeInUp 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }

        /* HERO SECTION */
        .hero-section {
          width: 100%;
          height: 85vh;
          background: linear-gradient(rgba(76, 51, 36, 0.8), rgba(76, 51, 36, 0.7)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80') center/cover fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--white);
          position: relative;
        }

        .hero-content { max-width: 800px; padding: 20px; }
        .hero-content h1 { font-size: clamp(3rem, 8vw, 4.5rem); font-weight: 300; margin-bottom: 1.5rem; line-height: 1.1; text-shadow: 0 4px 10px rgba(0,0,0,0.3); color: #E4CBB6; }
        .hero-content p { font-size: 1.25rem; margin-bottom: 2.5rem; color: #E4CBB6; font-weight: 300; opacity: 0.9; font-family: 'DM Sans', sans-serif; }
        
        .hero-btn {
          padding: 1.1rem 3.5rem;
          background: var(--accent);
          color: #fff;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(178, 132, 107, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .hero-btn:hover { background: var(--secondary); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(129, 155, 139, 0.3); }

        /* STATS BAR */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 50px;
          background: var(--white);
          padding: 50px 30px;
          box-shadow: 0 15px 40px rgba(76, 51, 36, 0.08);
          margin-top: -60px;
          position: relative;
          z-index: 10;
          border-radius: 20px;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
          border: 1px solid rgba(228, 203, 182, 0.3);
        }
        .stat-item { text-align: center; }
        .stat-number { font-size: 3rem; font-weight: 300; color: var(--secondary); display: block; font-family: 'Cormorant Garamond', serif; line-height: 1; }
        .stat-label { font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-top: 10px; }

        /* WHY CHOOSE US */
        .why-section { padding: 120px 20px; background: var(--bg-light); text-align: center; }
        .section-title { font-size: 3rem; color: var(--primary); margin-bottom: 15px; font-weight: 300; font-family: 'Cormorant Garamond', serif; }
        .section-title::after {
          content: ''; display: block; width: 60px; height: 2px; background: var(--accent); margin: 15px auto 0;
        }
        .section-subtitle { color: var(--text-light); margin-bottom: 70px; max-width: 600px; margin-left: auto; margin-right: auto; font-size: 1.1rem; }
        
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 1200px; margin: auto; }
        .why-card { 
          background: var(--white); padding: 50px 40px; border-radius: 20px; 
          box-shadow: 0 10px 30px rgba(76, 51, 36, 0.05); transition: 0.4s; border: 1px solid rgba(228, 203, 182, 0.2);
          text-align: left;
        }
        .why-card:hover { transform: translateY(-10px); box-shadow: 0 20px 45px rgba(76, 51, 36, 0.1); border-color: var(--secondary); }
        .why-icon { font-size: 3.5rem; margin-bottom: 25px; display: block; }
        .why-card h3 { margin-bottom: 15px; font-size: 1.8rem; color: var(--primary); font-weight: 400; font-family: 'Cormorant Garamond', serif; }
        .why-card p { color: var(--text-light); line-height: 1.7; font-size: 0.95rem; }

        /* GALLERY SECTION */
        .gallery-section { padding: 100px 20px; text-align: center; background: white; }
        .gallery-grid { 
          display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; 
          max-width: 1200px; margin: 0 auto; 
        }
        .gallery-item { overflow: hidden; border-radius: 20px; box-shadow: 0 10px 25px rgba(76, 51, 36, 0.08); position: relative; height: 300px; }
        .gallery-item img { 
          width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
        }
        .gallery-item:hover img { transform: scale(1.1); }
        .gallery-overlay {
          position: absolute; inset: 0; background: rgba(76, 51, 36, 0.5); opacity: 0; transition: 0.3s; display: flex; align-items: center; justify-content: center;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-text { color: white; font-weight: 300; font-size: 1.5rem; transform: translateY(20px); transition: 0.4s; font-family: 'Cormorant Garamond', serif; }
        .gallery-item:hover .gallery-text { transform: translateY(0); }

        /* FORM SECTION (Elegant Glass) */
        .form-section { 
          padding: 120px 20px; 
          background: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80') center/cover fixed; 
          position: relative;
        }
        .form-overlay { position: absolute; inset: 0; background: rgba(76, 51, 36, 0.9); }
        
        .form-container { position: relative; z-index: 2; max-width: 850px; margin: auto; }
        .form-header { text-align: center; color: var(--white); margin-bottom: 50px; }
        .form-header h2 { font-size: 3rem; margin-bottom: 15px; color: #E4CBB6; font-weight: 300; }
        .form-header p { opacity: 0.9; color: #E4CBB6; max-width: 500px; margin: 0 auto; line-height: 1.6; }

        .inspection-form { 
          background: rgba(255, 255, 255, 0.96); 
          padding: 60px; 
          border-radius: 24px; 
          box-shadow: 0 30px 60px rgba(0,0,0,0.3); 
          border: 1px solid rgba(228, 203, 182, 0.2);
        }
        
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px; }
        
        .inspection-form input, .inspection-form select, .inspection-form textarea {
          width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(228, 203, 182, 0.4);
          background: #F9F6F1; color: var(--text-dark); font-size: 1rem; outline: none; transition: 0.3s;
          box-sizing: border-box; font-family: 'DM Sans', sans-serif;
        }
        .inspection-form input:focus, .inspection-form select:focus, .inspection-form textarea:focus {
          border-color: var(--secondary); background: var(--white); box-shadow: 0 0 0 4px rgba(129, 155, 139, 0.15);
        }
        
        .submit-btn {
          width: 100%; padding: 18px; background: var(--secondary); color: white; font-size: 1rem; font-weight: 600;
          border: none; border-radius: 12px; cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 1.5px;
        }
        .submit-btn:hover { background: var(--primary); transform: translateY(-2px); box-shadow: 0 10px 25px rgba(76, 51, 36, 0.2); }

        /* TESTIMONIALS */
        .testimonials-section { padding: 120px 20px; background: var(--bg-light); text-align: center; }
        .testimonials-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; max-width: 1200px; margin: auto; }
        .testimonial-card { 
          background: var(--white); padding: 50px 40px; width: 360px; border-radius: 24px; position: relative; text-align: left; 
          box-shadow: 0 15px 35px rgba(76, 51, 36, 0.05); border: 1px solid rgba(228, 203, 182, 0.1);
        }
        .quote-icon { font-size: 5rem; color: #F5F0E8; position: absolute; top: 10px; right: 30px; z-index: 0; font-family: serif; }
        .testimonial-text { font-style: italic; color: var(--text-dark); position: relative; z-index: 1; margin-bottom: 30px; line-height: 1.8; font-size: 1.05rem; }
        .user-info { display: flex; align-items: center; gap: 15px; position: relative; z-index: 1; }
        .user-avatar { width: 55px; height: 55px; background: #e8d5c8; border-radius: 50%; object-fit: cover; }
        .user-name h4 { margin: 0; color: var(--primary); font-size: 1.2rem; font-family: 'Cormorant Garamond', serif; font-weight: 500; }
        .user-name span { font-size: 0.85rem; color: var(--text-light); font-weight: 500; }
        .stars { color: var(--accent); margin-bottom: 12px; font-size: 1.1rem; }

        /* CTA SECTION */
        .cta-section-new {
          padding: 80px 20px 140px 20px;
          background: var(--bg-light);
        }

        .cta-card {
          max-width: 1100px;
          margin: 0 auto;
          background: linear-gradient(135deg, #4C3324 0%, #627B68 100%);
          border-radius: 40px;
          padding: 100px 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 60px -12px rgba(76, 51, 36, 0.4);
          color: var(--white);
        }

        .cta-blob {
          position: absolute;
          background: rgba(228, 203, 182, 0.08);
          border-radius: 50%;
        }
        .blob-1 { width: 400px; height: 400px; top: -150px; left: -150px; }
        .blob-2 { width: 300px; height: 300px; bottom: -100px; right: -100px; }
        
        .cta-content { position: relative; z-index: 2; }
        
        .cta-title {
          font-size: 3.5rem; 
          margin-bottom: 25px; 
          color: #E4CBB6; 
          font-weight: 300;
          line-height: 1.1;
        }
        
        .cta-desc {
          font-size: 1.3rem;
          color: #E4CBB6;
          max-width: 650px;
          margin: 0 auto 50px auto;
          line-height: 1.7;
          opacity: 0.9;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }

        .cta-btn-premium {
          padding: 20px 60px;
          background: var(--accent);
          color: #fff;
          font-weight: 600;
          border-radius: 50px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .cta-btn-premium:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 45px rgba(0,0,0,0.3);
          background: white;
          color: var(--primary);
        }

        @media(max-width: 900px) {
          .stats-bar { flex-direction: column; gap: 40px; margin-top: 0; padding: 40px 20px; }
          .hero-content h1 { font-size: 2.8rem; }
          .form-row { grid-template-columns: 1fr; gap: 20px; }
          .inspection-form { padding: 40px 25px; }
          .cta-card { padding: 70px 25px; }
          .cta-title { font-size: 2.5rem; }
          .section-title { font-size: 2.5rem; }
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-up">
          <h1>Expert Property Inspections <br /> for Discerning Investors</h1>
          <p>Unrivaled precision, certified engineers, and definitive reports to secure your legacy.</p>
          <button className="hero-btn" onClick={() => document.getElementById("inspectionForm").scrollIntoView({ behavior: "smooth" })}>
            Arrange Inspection
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar animate-up delay-1">
        <div className="stat-item">
          <span className="stat-number">5k+</span>
          <span className="stat-label">Properties Evaluated</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Chartered Engineers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24h</span>
          <span className="stat-label">Priority Reporting</span>
        </div>
      </div>

      {/* Why Section */}
      <section className="why-section">
        <h2 className="section-title">The Standard of Excellence</h2>
        <p className="section-subtitle">We deploy world-class engineering expertise and advanced diagnostic technology.</p>

        <div className="why-grid">
          <div className="why-card">
            <span className="why-icon">🏰</span>
            <h3>Structural Audit</h3>
            <p>Comprehensive evaluation of structural integrity, load-bearing capability, and foundation health by senior engineers.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">🔬</span>
            <h3>Neural Diagnostics</h3>
            <p>Advanced non-invasive testing including thermal imaging, ultrasound, and high-frequency moisture detection.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">📜</span>
            <h3>Definitive Reports</h3>
            <p>Meticulously detailed digital reports with high-resolution evidence and actionable mitigation strategies.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">💎</span>
            <h3>Asset Protection</h3>
            <p>Our findings empower you to negotiate from a position of authority and protect your capital investment.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section">
        <h2 className="section-title">Global Portfolio</h2>
        <p className="section-subtitle">Recent inspections across premium residential and executive commercial assets.</p>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" alt="Penthouse" />
            <div className="gallery-overlay"><span className="gallery-text">Estate Penthouse</span></div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" alt="Corporate" />
            <div className="gallery-overlay"><span className="gallery-text">Executive Plaza</span></div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80" alt="Villa" />
            <div className="gallery-overlay"><span className="gallery-text">Heritage Villa</span></div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="inspectionForm" className="form-section">
        <div className="form-overlay"></div>
        <div className="form-container animate-up delay-2">
          <div className="form-header">
            <h2>Secure Your Private Evaluation</h2>
            <p>A relationship manager will contact you within the hour to coordinate your priority inspection.</p>
          </div>
          <form onSubmit={handleSubmit} className="inspection-form">
            <div className="form-row">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Professional Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="tel" name="phone" placeholder="Direct Phone Line" value={formData.phone} onChange={handleChange} required />
              <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
                <option value="">Asset Type</option>
                <option value="Apartment">Luxury Condominium</option>
                <option value="Villa">Private Estate / Villa</option>
                <option value="Office">Executive Commercial</option>
                <option value="Industrial">Industrial Asset</option>
              </select>
            </div>
            <div className="form-row">
              <input type="text" name="propertyAddress" placeholder="Asset Location" value={formData.propertyAddress} onChange={handleChange} required />
              <div style={{ display: 'flex', gap: '15px' }}>
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
              </div>
            </div>
            <textarea name="message" rows="4" placeholder="Specific areas of concern or high-value features?" value={formData.message} onChange={handleChange} style={{ marginBottom: '25px' }}></textarea>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing Priority..." : "Confirm Private Booking"}
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">The Client Experience</h2>
        <p className="section-subtitle">Consistent delivery of excellence for distinguished property owners.</p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"The diagnostic depth was remarkable. Their thermal analysis identified a subsurface leak that could have cost millions."</p>
            <div className="user-info">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
              <div className="user-name">
                <h4>Elizabeth Sterling</h4>
                <span>Estate Owner</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"Punctual, analytical, and definitive. The Propzo report gave me the leverage I needed for a complex commercial acquisition."</p>
            <div className="user-info">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <div className="user-name">
                <h4>Julian Thorne</h4>
                <span>Asset Manager</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"Incredible turnaround. I received a fifty-page high-definition report within twelve hours. Simply the best in the market."</p>
            <div className="user-info">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              <div className="user-name">
                <h4>Victoria Chen</h4>
                <span>Property Portfolio Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-new">
        <div className="cta-card">
          <div className="cta-blob blob-1"></div>
          <div className="cta-blob blob-2"></div>

          <div className="cta-content">
            <h2 className="cta-title">Protect Your Capital Legacy</h2>
            <p className="cta-desc">
              Precision diagnostics are a small investment compared to the risk of hidden structural failure. Secure your definitive asset evaluation today.
            </p>
            <button
              className="cta-btn-premium"
              onClick={() => document.getElementById("inspectionForm").scrollIntoView({ behavior: "smooth" })}
            >
              Request Executive Survey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
