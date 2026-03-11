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
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@300;500;700&display=swap');

        :root {
          --primary: #0f172a;
          --secondary: #3b82f6;
          --accent: #f59e0b;
          --text-dark: #334155;
          --text-light: #64748b;
          --bg-light: #f8fafc;
          --white: #ffffff;
        }

        body, html { margin: 0; padding: 0; font-family: 'Open Sans', sans-serif; background-color: var(--bg-light); color: var(--text-dark); }
        h1, h2, h3, h4, button { font-family: 'Poppins', sans-serif; }

        /* ANIMATIONS */
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
          background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80') center/cover fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--white);
          position: relative;
        }

        .hero-content { max-width: 800px; padding: 20px; }
        .hero-content h1 { font-size: 3.5rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.2; text-shadow: 0 4px 6px rgba(0,0,0,0.3); }
        .hero-content p { font-size: 1.25rem; margin-bottom: 2.5rem; color: #e2e8f0; font-weight: 300; }
        
        .hero-btn {
          padding: 1rem 3rem;
          background: var(--accent);
          color: var(--primary);
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .hero-btn:hover { background: #d97706; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(245, 158, 11, 0.4); }

        /* STATS BAR */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 50px;
          background: var(--white);
          padding: 40px 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          margin-top: -50px;
          position: relative;
          z-index: 10;
          border-radius: 10px;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }
        .stat-item { text-align: center; }
        .stat-number { font-size: 2.5rem; font-weight: 700; color: var(--secondary); display: block; }
        .stat-label { font-size: 0.9rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }

        /* WHY CHOOSE US (Replaced Services) */
        .why-section { padding: 100px 20px; background: var(--bg-light); text-align: center; }
        .section-title { font-size: 2.5rem; color: var(--primary); margin-bottom: 10px; font-weight: 700; }
        .section-subtitle { color: var(--text-light); margin-bottom: 60px; max-width: 600px; margin-left: auto; margin-right: auto; }
        
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 1200px; margin: auto; }
        .why-card { 
          background: var(--white); padding: 40px 30px; border-radius: 20px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: 0.4s; border: 1px solid #e2e8f0;
        }
        .why-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-color: var(--secondary); }
        .why-icon { font-size: 3rem; margin-bottom: 20px; display: block; }
        .why-card h3 { margin-bottom: 15px; font-size: 1.4rem; color: var(--primary); }
        .why-card p { color: var(--text-light); line-height: 1.6; }

        /* FORM SECTION (Glassmorphism) */
        .form-section { 
          padding: 100px 20px; 
          background: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80') center/cover fixed; 
          position: relative;
        }
        .form-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.85); }
        
        .form-container { position: relative; z-index: 2; max-width: 800px; margin: auto; }
        .form-header { text-align: center; color: var(--white); margin-bottom: 40px; }
        .form-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
        .form-header p { opacity: 0.8; }

        .inspection-form { 
          background: rgba(255, 255, 255, 0.1); 
          backdrop-filter: blur(10px); 
          border: 1px solid rgba(255, 255, 255, 0.2); 
          padding: 50px; 
          border-radius: 20px; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.2); 
        }
        
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        
        .inspection-form input, .inspection-form select, .inspection-form textarea {
          width: 100%; padding: 15px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.9); color: var(--text-dark); font-size: 1rem; outline: none; transition: 0.3s;
          box-sizing: border-box;
        }
        .inspection-form input:focus, .inspection-form select:focus, .inspection-form textarea:focus {
          border-color: var(--secondary); background: var(--white); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
        }
        
        .submit-btn {
          width: 100%; padding: 18px; background: var(--secondary); color: white; font-size: 1.1rem; font-weight: 700;
          border: none; border-radius: 10px; cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px;
        }
        .submit-btn:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4); }

        /* GALLERY */
        .gallery-section { padding: 100px 20px; text-align: center; }
        .gallery-grid { 
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; 
          max-width: 1200px; margin: auto; 
        }
        .gallery-item { overflow: hidden; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); position: relative; height: 250px; }
        .gallery-item img { 
          width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; 
        }
        .gallery-item:hover img { transform: scale(1.1); }
        .gallery-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.4); opacity: 0; transition: 0.3s; display: flex; align-items: center; justify-content: center;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-text { color: white; font-weight: 700; font-size: 1.2rem; transform: translateY(20px); transition: 0.3s; }
        .gallery-item:hover .gallery-text { transform: translateY(0); }

        /* TESTIMONIALS */
        .testimonials-section { padding: 100px 20px; background: var(--white); text-align: center; }
        .testimonials-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; max-width: 1200px; margin: auto; }
        .testimonial-card { 
          background: var(--bg-light); padding: 40px 30px; width: 350px; border-radius: 20px; position: relative; text-align: left; 
        }
        .quote-icon { font-size: 4rem; color: #e2e8f0; position: absolute; top: 10px; right: 20px; z-index: 0; }
        .testimonial-text { font-style: italic; color: var(--text-dark); position: relative; z-index: 1; margin-bottom: 20px; line-height: 1.6; }
        .user-info { display: flex; align-items: center; gap: 15px; }
        .user-avatar { width: 50px; height: 50px; background: #cbd5e1; border-radius: 50%; object-fit: cover; }
        .user-name h4 { margin: 0; color: var(--primary); font-size: 1.1rem; }
        .user-name span { font-size: 0.85rem; color: var(--text-light); }
        .stars { color: var(--accent); margin-bottom: 10px; }

        /* ================= NEW ATTRACTIVE CTA SECTION ================= */
        .cta-section-new {
          padding: 80px 20px 120px 20px;
          background: var(--bg-light);
        }

        .cta-card {
          max-width: 1100px;
          margin: 0 auto;
          /* Premium Gradient Background */
          background: linear-gradient(135deg, var(--primary) 0%, #1e293b 100%);
          border-radius: 30px;
          padding: 80px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.5);
          color: var(--white);
        }

        /* Abstract Decorative Blobs */
        .cta-blob {
          position: absolute;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }
        .blob-1 { width: 300px; height: 300px; top: -100px; left: -100px; }
        .blob-2 { width: 200px; height: 200px; bottom: -50px; right: -50px; }
        
        .cta-content { position: relative; z-index: 2; }
        
        .cta-title {
          font-size: 3rem; 
          margin-bottom: 20px; 
          color: var(--white); 
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .cta-desc {
          font-size: 1.25rem;
          color: #cbd5e1;
          max-width: 650px;
          margin: 0 auto 40px auto;
          line-height: 1.6;
        }

        .cta-btn-premium {
          padding: 18px 50px;
          background: var(--accent);
          color: var(--primary);
          font-weight: 700;
          border-radius: 50px;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .cta-btn-premium:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          background: #fff;
        }

        /* RESPONSIVE */
        @media(max-width: 900px) {
          .stats-bar { flex-direction: column; gap: 30px; margin-top: 0; }
          .hero-content h1 { font-size: 2.5rem; }
          .form-row { grid-template-columns: 1fr; }
          .inspection-form { padding: 30px; }
          .cta-card { padding: 50px 20px; }
          .cta-title { font-size: 2rem; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-up">
          <h1>Expert Property Inspections <br /> You Can Trust</h1>
          <p>Detailed reports, certified inspectors, and peace of mind for your biggest investment.</p>
          <button className="hero-btn" onClick={() => document.getElementById("inspectionForm").scrollIntoView({ behavior: "smooth" })}>
            Book an Inspection
          </button>
        </div>
      </section>

      {/* TRUST STATS */}
      <div className="stats-bar animate-up delay-1">
        <div className="stat-item">
          <span className="stat-number">5000+</span>
          <span className="stat-label">Properties Inspected</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Certified Experts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24hr</span>
          <span className="stat-label">Report Turnaround</span>
        </div>
      </div>

      {/* REPLACED SERVICES WITH "WHY CHOOSE US" */}
      <section className="why-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="section-subtitle">We use advanced technology and industry expertise to deliver the most accurate reports.</p>

        <div className="why-grid">
          <div className="why-card">
            <span className="why-icon">🛡️</span>
            <h3>Certified Engineers</h3>
            <p>Our team consists of civil engineers and certified home inspectors with 10+ years of experience.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">📡</span>
            <h3>Advanced Technology</h3>
            <p>We use thermal imaging, drone surveys, and moisture meters to find hidden defects.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">⚡</span>
            <h3>Fast Reporting</h3>
            <p>Get a comprehensive digital report with photos and actionable insights within 24 hours.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">💰</span>
            <h3>Value for Money</h3>
            <p>Affordable packages designed to save you lakhs in future repair costs.</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h2 className="section-title">Recent Projects</h2>
        <p className="section-subtitle">See our experts in action across residential and commercial properties.</p>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" alt="Modern Villa" />
            <div className="gallery-overlay"><span className="gallery-text">Modern Villa</span></div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" alt="Corporate Office" />
            <div className="gallery-overlay"><span className="gallery-text">Corporate Office</span></div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80" alt="Luxury Apartment" />
            <div className="gallery-overlay"><span className="gallery-text">Luxury Apartment</span></div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="inspectionForm" className="form-section">
        <div className="form-overlay"></div>
        <div className="form-container animate-up delay-2">
          <div className="form-header">
            <h2>Schedule Your Inspection</h2>
            <p>Fill out the form below and we will get back to you with a quote within 1 hour.</p>
          </div>
          <form onSubmit={handleSubmit} className="inspection-form">
            <div className="form-row">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa / Independent House</option>
                <option value="Office">Commercial Office</option>
                <option value="Industrial">Industrial Warehouse</option>
              </select>
            </div>
            <div className="form-row">
              <input type="text" name="propertyAddress" placeholder="Property Address" value={formData.propertyAddress} onChange={handleChange} required />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
              </div>
            </div>
            <textarea name="message" rows="4" placeholder="Any specific concerns or additional details?" value={formData.message} onChange={handleChange} style={{ marginBottom: '20px' }}></textarea>
            <button type="submit" className="submit-btn">Confirm Booking</button>
          </form>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real feedback from homeowners and investors.</p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"The report was incredibly detailed with high-quality photos. It helped me negotiate the price of my new home significantly."</p>
            <div className="user-info">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
              <div className="user-name">
                <h4>Priya Sharma</h4>
                <span>Homeowner</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"Professional, punctual, and thorough. They found electrical issues that the seller wasn't even aware of. Highly recommended!"</p>
            <div className="user-info">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <div className="user-name">
                <h4>Rahul Verma</h4>
                <span>Real Estate Investor</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"Booking was easy and the team was very polite. The inspection report was delivered the same evening."</p>
            <div className="user-info">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              <div className="user-name">
                <h4>Anjali Das</h4>
                <span>Interior Designer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED ATTRACTIVE CTA SECTION */}
      <section className="cta-section-new">
        <div className="cta-card">
          <div className="cta-blob blob-1"></div>
          <div className="cta-blob blob-2"></div>

          <div className="cta-content">
            <h2 className="cta-title">Ready to Secure Your Investment?</h2>
            <p className="cta-desc">
              Don't leave your property's health to chance. A small investment in inspection saves you a fortune in future repairs. Book a professional evaluation today.
            </p>
            <button
              className="cta-btn-premium"
              onClick={() => document.getElementById("inspectionForm").scrollIntoView({ behavior: "smooth" })}
            >
              Schedule Your Inspection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}