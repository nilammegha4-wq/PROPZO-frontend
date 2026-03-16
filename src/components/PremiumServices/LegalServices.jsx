import React, { useState } from "react";

/* ================= STATIC DATA ================= */

const legalServices = [
  {
    id: 1,
    title: "Title Verification",
    desc: "30-year history check to ensure the property has a clear title, free from litigations and mortgages.",
    icon: "⚖️",
  },
  {
    id: 2,
    title: "Sale Deed Drafting",
    desc: "Professional drafting and registration assistance at the Sub-Registrar's office with biometric support.",
    icon: "✍️",
  },
  {
    id: 3,
    title: "Rental Agreements",
    desc: "Digital e-stamping and rental agreement creation delivered to your doorstep. No office visits needed.",
    icon: "🤝",
  },
  {
    id: 4,
    title: "Khata & Tax Transfer",
    desc: "Complete assistance in transferring property tax records (Khata) to your name post-purchase.",
    icon: "🏛️",
  },
  {
    id: 5,
    title: "RERA Compliance",
    desc: "We verify if the project is RERA approved and analyze the builder-buyer agreement for risks.",
    icon: "🏗️",
  },
  {
    id: 6,
    title: "Legal Opinion",
    desc: "Certified legal reports required for bank loans, property disputes, or investment validation.",
    icon: "📜",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Upload",
    desc: "Send us digital copies of your documents via WhatsApp or Email.",
  },
  {
    num: "02",
    title: "Verify",
    desc: "Our lawyers verify every detail against government records.",
  },
  {
    num: "03",
    title: "Deliver",
    desc: "Get your verified legal report or registered deed within 48 hours.",
  },
];

const faqs = [
  {
    question: "Why do I need Title Verification?",
    answer: "To ensure you aren't buying a property with hidden legal disputes, unpaid loans, or multiple owners.",
  },
  {
    question: "Is physical presence required for registration?",
    answer: "Yes, for the final Sale Deed registration, the buyer and seller must visit the Sub-Registrar office for biometrics.",
  },
  {
    question: "How long does a Legal Opinion take?",
    answer: "Typically, a detailed legal opinion report takes 2 to 3 working days after we receive all documents.",
  },
];

/* ================= COMPONENT ================= */

export default function LegalServices() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/premium-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          packageName: formData.serviceType,
          message: formData.message,
          serviceType: "Legal Services"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", serviceType: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting legal request:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="legal-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        :root {
          --primary: #819B8B;
          --primary-dark: #627B68;
          --secondary: #4C3324;
          --accent: #B2846B;

          --bg-page: #F5F0E8;
          --bg-white: #ffffff;

          --text-main: #4C3324;
          --text-muted: #6B5E58;

          --radius: 12px;
          --shadow-lg: 0 20px 25px -5px rgba(76, 51, 36, 0.1), 0 8px 10px -6px rgba(76, 51, 36, 0.05);
        }

        body { margin: 0; font-family: 'DM Sans', sans-serif; background-color: var(--bg-page); color: var(--text-main); line-height: 1.6; }
        h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate { animation: fadeUp 0.8s ease-out forwards; }

        /* BUTTONS */
        .btn {
          display: inline-block;
          padding: 16px 40px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .btn-primary { 
          background: var(--accent); 
          color: white; 
          box-shadow: 0 4px 14px 0 rgba(178, 132, 107, 0.3);
        }
        .btn-primary:hover { 
          background: var(--secondary); 
          transform: translateY(-2px); 
          box-shadow: 0 6px 20px rgba(178, 132, 107, 0.2);
        }

        /* HERO SECTION */
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 20px;
          background: url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2670&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(76, 51, 36, 0.92) 0%, rgba(129, 155, 139, 0.82) 100%);
        }

        .hero-content {
          position: relative; z-index: 2; max-width: 800px;
          animation: fadeUp 1s ease-out;
        }

        .trust-pill {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #E4CBB6;
          padding: 8px 24px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 24px;
          backdrop-filter: blur(5px);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero h1 {
          font-size: clamp(3rem, 8vw, 5rem); font-weight: 300; margin-bottom: 20px; line-height: 1.1;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .hero p {
          font-size: 1.3rem; color: #E4CBB6; margin-bottom: 40px; max-width: 650px; margin-left: auto; margin-right: auto;
          font-family: 'DM Sans', sans-serif; font-weight: 300; opacity: 0.9;
        }

        /* SERVICES GRID */
        .section { padding: 100px 0; }
        .bg-white { background: white; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-header { text-align: center; margin-bottom: 60px; max-width: 700px; margin: 0 auto 60px; }
        .section-title { font-size: 3rem; font-weight: 300; color: var(--secondary); margin-bottom: 15px; position: relative; display: inline-block; }
        .section-title::after {
          content: ''; display: block; width: 60px; height: 3px; background: var(--accent); margin: 10px auto 0;
        }
        .section-desc { color: var(--text-muted); font-size: 1.1rem; }

        .services-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;
        }
        .service-card {
          background: white; padding: 40px 30px; border-radius: var(--radius);
          box-shadow: 0 4px 6px -1px rgba(76, 51, 36, 0.05); transition: 0.3s;
          border: 1px solid rgba(228, 203, 182, 0.2); position: relative; overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
          background: var(--primary); transform: scaleX(0); transition: 0.3s; transform-origin: left;
        }
        .service-card:hover {
          transform: translateY(-10px); box-shadow: var(--shadow-lg);
        }
        .service-card:hover::before { transform: scaleX(1); }

        .icon-circle {
          font-size: 3rem; margin-bottom: 25px; display: block;
        }
        .service-card h3 { font-size: 1.6rem; font-weight: 400; margin-bottom: 12px; color: var(--secondary); font-family: 'Cormorant Garamond', serif; }
        .service-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; }

        /* PROCESS STEPS */
        .process-row {
          display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-top: 40px;
        }
        .process-card {
          flex: 1; min-width: 280px; text-align: center; position: relative;
          padding: 40px 30px; background: white; border-radius: var(--radius); 
          border: 1px solid rgba(228, 203, 182, 0.3);
        }
        .step-badge {
          background: var(--secondary); color: #E4CBB6; width: 50px; height: 50px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 700; margin: 0 auto 20px; font-size: 1.2rem; font-family: 'Cormorant Garamond', serif;
        }
        .process-card h4 { font-size: 1.5rem; font-weight: 500; margin-bottom: 10px; color: var(--secondary); }
        .process-card p { color: var(--text-muted); font-size: 0.95rem; }

        /* FORM SECTION */
        .form-section { 
          background: var(--secondary); color: white; position: relative; overflow: hidden; 
        }
        .form-pattern {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(rgba(228, 203, 182, 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .form-wrapper {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 2;
        }

        .form-info h2 { font-size: 3.5rem; font-weight: 300; margin-bottom: 20px; line-height: 1.1; color: #E4CBB6; }
        .form-info p { color: #E4CBB6; font-size: 1.15rem; margin-bottom: 40px; opacity: 0.85; }

        .feature-list { list-style: none; padding: 0; }
        .feature-list li { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; font-weight: 400; font-size: 1.1rem; color: #E4CBB6; }
        .check { color: var(--secondary); background: var(--accent); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; font-weight: bold; }

        .legal-form {
          background: white; padding: 50px; border-radius: 20px; color: var(--text-main);
          box-shadow: 0 25px 50px -12px rgba(76, 51, 36, 0.4);
        }
        .form-label { display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .form-input, .form-select, .form-textarea {
          width: 100%; padding: 16px; border: 1px solid rgba(228, 203, 182, 0.4); border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 1rem; outline: none; transition: 0.2s;
          background: #F9F6F1; box-sizing: border-box; margin-bottom: 20px; color: var(--secondary);
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(129, 155, 139, 0.15);
        }
        .submit-btn {
          width: 100%; padding: 18px; background: var(--secondary); color: white;
          font-weight: 600; border-radius: 8px; border: none; cursor: pointer; transition: 0.2s;
          font-size: 1rem; text-transform: uppercase; letter-spacing: 1.5px;
        }
        .submit-btn:hover { background: var(--primary-dark); }

        /* FAQ ACCORDION */
        .faq-container { max-width: 850px; margin: auto; }
        .faq-item {
          background: white; border: 1px solid rgba(228, 203, 182, 0.3); border-radius: 12px; margin-bottom: 15px; overflow: hidden; transition: 0.3s;
        }
        .faq-item:hover { border-color: var(--primary); }
        .faq-head {
          padding: 25px 30px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          font-weight: 500; color: var(--secondary); font-size: 1.2rem; font-family: 'Cormorant Garamond', serif;
        }
        .faq-head:hover { background: #F9F6F1; }
        .faq-body {
          padding: 0 30px 30px 30px; color: var(--text-muted); font-size: 1rem; border-top: 1px solid rgba(228, 203, 182, 0.1); display: none; line-height: 1.7; padding-top: 25px;
        }
        .faq-item.active .faq-body { display: block; }
        .faq-item.active .faq-head { color: var(--primary-dark); }

        @media(max-width: 900px) {
          .hero h1 { font-size: 3rem; }
          .form-wrapper { grid-template-columns: 1fr; gap: 50px; }
          .legal-form { padding: 40px 30px; }
          .section { padding: 80px 0; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="trust-pill">#1 Verified Legal Partner</div>
            <h1>Legal Protection for <br /> Your Dream Property</h1>
            <p>Don't take risks with paperwork. From Title Verification to Sale Deed Registration, our experts handle it all digitally.</p>
            <button className="btn btn-primary" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
              Consult an Expert
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-desc">End-to-end legal support tailored for property buyers, sellers, and investors.</p>
          </div>
          <div className="services-grid">
            {legalServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="icon-circle">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple 3-Step Process</h2>
            <p className="section-desc">We combine legal expertise with digital convenience.</p>
          </div>
          <div className="process-row">
            {processSteps.map((step, index) => (
              <div key={index} className="process-card">
                <div className="step-badge">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING FORM SECTION */}
      <section id="contact" className="section form-section">
        <div className="form-pattern"></div>
        <div className="container form-wrapper">

          <div className="form-info">
            <h2>Secure Your Deal <br />Before You Pay.</h2>
            <p>Property disputes are costly. Prevention is cheap. Get your documents verified by senior advocates today.</p>
            <ul className="feature-list">
              <li><span className="check">✔</span> 15+ Years Experience Panel</li>
              <li><span className="check">✔</span> 5000+ Titles Verified</li>
              <li><span className="check">✔</span> 100% Online Process</li>
              <li><span className="check">✔</span> Guaranteed Confidentiality</li>
            </ul>
          </div>

          <div className="legal-form">
            <h3 style={{ marginTop: 0, marginBottom: '25px', fontSize: '2.2rem', fontFamily: 'Cormorant Garamond, serif', color: 'var(--secondary)', fontWeight: 400 }}>Request Call Back</h3>
            <form onSubmit={handleSubmit}>
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />

              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

              <label className="form-label">Mobile Number</label>
              <input type="tel" name="phone" className="form-input" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required />

              <label className="form-label">Service Required</label>
              <select name="serviceType" className="form-select" value={formData.serviceType} onChange={handleChange} required>
                <option value="">Select Service</option>
                <option>Title Verification</option>
                <option>Sale Deed Registration</option>
                <option>Rental Agreement</option>
                <option>Property Tax / Khata</option>
                <option>Other Legal Query</option>
              </select>

              <label className="form-label">Details (Optional)</label>
              <textarea name="message" className="form-textarea" rows="3" placeholder="Describe your requirement..." value={formData.message} onChange={handleChange}></textarea>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✓</div>
                  Request submitted! Our legal team will call you shortly.
                </div>
              ) : (
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Get Free Consultation"}
                </button>
              )}
            </form>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? "active" : ""}`}>
                <div className="faq-head" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <span>{activeFaq === index ? "−" : "+"}</span>
                </div>
                <div className="faq-body">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
