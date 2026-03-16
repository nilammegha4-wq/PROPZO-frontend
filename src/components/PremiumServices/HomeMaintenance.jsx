import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// --- CUSTOM SVG ICONS ---
const IconWrench = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
const IconZap = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const IconDroplet = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>;
const IconPaint = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" /><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" /><path d="M14.5 17.5 4.5 15" /></svg>;
const IconClean = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const IconTool = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconChevronDown = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

export default function HomeMaintenance() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "general",
    date: "",
    details: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/premium-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          packageName: form.service,
          message: `Date: ${form.date} | Details: ${form.details}`,
          serviceType: "Home Maintenance"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", service: "general", date: "", details: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToBooking = () => {
    const element = document.getElementById("book");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    { title: "Plumbing", icon: <IconDroplet />, text: "Leak detection, pipe fitting, sanitary installation, and blockage clearing.", price: "Starts at ₹299" },
    { title: "Electrical", icon: <IconZap />, text: "Wiring repairs, switchboard installation, inverter setup, and fault detection.", price: "Starts at ₹349" },
    { title: "Painting", icon: <IconPaint />, text: "Interior & exterior painting, texture design, waterproofing, and wallpapers.", price: "Custom Quote" },
    { title: "Deep Cleaning", icon: <IconClean />, text: "Full home sanitization, sofa & carpet shampooing, and kitchen deep cleans.", price: "Starts at ₹1,499" },
    { title: "Carpentry", icon: <IconTool />, text: "Furniture assembly, door lock repairs, cupboard customization, and polishing.", price: "Starts at ₹399" },
    { title: "Appliance Fix", icon: <IconWrench />, text: "AC servicing, washing machine repair, geyser installation, and TV mounting.", price: "Starts at ₹249" },
  ];

  return (
    <div className="maintenance-wrapper">
      <style>{`
        :root {
          --dark: #4C3324;
          --primary: #627B68;
          --primary-dark: #4C3324;
          --accent: #B2846B;
          --success: #819B8B;
          --light: #F5F0E8;
          --white: #ffffff;
          --gray: #6B5E58;
          --glass: rgba(255, 255, 255, 0.95);
          --shadow: 0 20px 40px -10px rgba(76, 51, 36, 0.15);
          --radius: 20px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }
        body { background: var(--light); color: var(--dark); line-height: 1.6; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        /* --- BUTTONS --- */
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 32px; border-radius: 50px; font-weight: 600; text-decoration: none;
          transition: all 0.3s ease; cursor: pointer; border: none; font-size: 1rem;
        }
        .btn-primary { 
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); 
          color: white; box-shadow: 0 10px 20px rgba(98, 123, 104, 0.2);
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(98, 123, 104, 0.3); }

        .btn-outline { background: transparent; border: 2px solid white; color: white; }
        .btn-outline:hover { background: white; color: var(--dark); }

        .btn-emergency {
          background: var(--success); color: white; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(129, 155, 139, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(129, 155, 139, 0); } 100% { box-shadow: 0 0 0 0 rgba(129, 155, 139, 0); } }

        /* --- HERO SECTION --- */
        .hero {
          position: relative;
          min-height: 700px;
          background: linear-gradient(rgba(76, 51, 36, 0.85), rgba(76, 51, 36, 0.7)), 
                      url("https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1920&q=80");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex; align-items: center; justify-content: center;
          text-align: center; color: white; padding: 120px 0 160px;
        }

        .hero h1 { 
          font-size: 4rem; font-weight: 800; margin-bottom: 24px; line-height: 1.1;
          background: linear-gradient(to right, #ffffff, #F5F0E8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero p { font-size: 1.25rem; color: #F5F0E8; max-width: 700px; margin: 0 auto 40px; opacity: 0.9; }

        /* --- EMERGENCY BANNER --- */
        .emergency-banner {
          background: #F9F6F1; color: var(--dark); padding: 15px; text-align: center;
          display: flex; justify-content: center; align-items: center; gap: 15px;
          font-weight: 600; border-bottom: 1px solid rgba(76, 51, 36, 0.1);
        }

        /* --- STATS OVERLAP --- */
        .stats-wrapper { margin-top: -80px; position: relative; z-index: 10; margin-bottom: 80px; }
        .stats-card {
          background: white; padding: 40px; border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
          text-align: center;
        }
        .stat-num { font-size: 2.5rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 5px; }
        .stat-label { color: var(--gray); font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }

        /* --- SERVICES SECTION --- */
        .section { padding: 100px 0; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header h2 { font-size: 2.5rem; color: var(--dark); margin-bottom: 15px; font-weight: 800; }
        .section-header p { color: var(--gray); font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 30px; }

        .service-card {
          background: white; padding: 40px; border-radius: var(--radius);
          border: 1px solid rgba(228, 203, 182, 0.3); transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .service-card:hover { transform: translateY(-10px); border-color: var(--primary); box-shadow: var(--shadow); }
        .service-card:hover .icon-bg { background: var(--primary); color: white; transform: rotate(-5deg); }

        .icon-bg {
          width: 60px; height: 60px; background: rgba(129, 155, 139, 0.1); color: var(--primary);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 25px; transition: 0.3s;
        }
        .service-price { 
          display: inline-block; background: rgba(129, 155, 139, 0.1); color: var(--primary); 
          padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; margin-bottom: 15px;
        }

        .service-card h3 { font-size: 1.5rem; margin-bottom: 10px; font-weight: 700; color: var(--dark); }
        .service-card p { font-size: 1rem; color: var(--gray); line-height: 1.6; margin-bottom: 20px; }
        .sub-services { list-style: none; border-top: 1px solid rgba(76, 51, 36, 0.05); padding-top: 15px; }
        .sub-services li { font-size: 0.9rem; color: var(--gray); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .sub-services li svg { width: 16px; color: var(--primary); }

        /* --- PRICING PLANS --- */
        .pricing-section { background: #F9F6F1; padding: 100px 0; }
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 900px; margin: 0 auto; }

        .plan-card {
          background: white; padding: 50px; border-radius: var(--radius); border: 1px solid rgba(228, 203, 182, 0.3); text-align: center;
          transition: 0.3s; position: relative;
        }
        .plan-card.popular { border: 2px solid var(--primary); transform: scale(1.05); box-shadow: var(--shadow); z-index: 2; }
        .badge-popular {
          position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
          background: var(--dark); color: white; padding: 5px 20px; border-radius: 20px; font-size: 0.9rem; font-weight: 700;
        }
        .plan-price { font-size: 3rem; font-weight: 800; color: var(--dark); margin: 20px 0; }
        .plan-price span { font-size: 1rem; color: var(--gray); font-weight: 500; }
        .plan-features { list-style: none; margin: 30px 0; text-align: left; }
        .plan-features li { padding: 10px 0; border-bottom: 1px solid rgba(76, 51, 36, 0.05); display: flex; gap: 10px; align-items: center; color: var(--dark); }

        /* --- BOOKING FORM (Modern Glass) --- */
        .booking-section { 
          padding: 100px 0; 
          background: url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80") center/cover fixed;
          position: relative;
        }
        .overlay { position: absolute; inset: 0; background: rgba(76, 51, 36, 0.88); }
        .booking-container { position: relative; z-index: 2; max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.2fr; gap: 50px; align-items: center; }

        .booking-text { color: white; }
        .booking-text h2 { font-size: 3rem; margin-bottom: 20px; color: white; }
        .booking-text p { color: #F5F0E8; opacity: 0.9; margin-bottom: 30px; }
        .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; }
        .benefit-box { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(5px); }
        .benefit-box h4 { font-size: 1.1rem; margin-bottom: 5px; color: white; display: flex; align-items: center; gap: 8px; }
        .benefit-box p { font-size: 0.9rem; color: #E4CBB6; margin-bottom: 0; }

        .form-glass {
          background: rgba(255, 255, 255, 0.97); padding: 40px; border-radius: var(--radius);
          box-shadow: 0 25px 50px rgba(76, 51, 36, 0.3); backdrop-filter: blur(10px);
        }
        .form-glass h3 { color: var(--dark); margin-bottom: 25px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 8px; color: var(--dark); }
        .input-field {
          width: 100%; padding: 14px; border: 1px solid #D5C4BB; border-radius: 8px;
          background: white; font-size: 1rem; transition: 0.3s; color: var(--dark);
        }
        .input-field:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(98, 123, 104, 0.2); }

        /* --- FAQ SECTION --- */
        .faq-section { background: white; padding: 100px 0; }
        .faq-max { max-width: 800px; margin: 0 auto; }
        .faq-item { border: 1px solid rgba(228, 203, 182, 0.3); border-radius: 12px; margin-bottom: 15px; overflow: hidden; transition: all 0.3s ease; }
        .faq-btn {
          width: 100%; padding: 20px; text-align: left; background: white; border: none;
          display: flex; justify-content: space-between; align-items: center; cursor: pointer;
          font-weight: 700; color: var(--dark); font-size: 1.1rem;
        }
        .faq-btn:hover { background: #F9F6F1; }
        .faq-answer { padding: 0 20px 20px; color: var(--gray); display: none; line-height: 1.6; }
        .faq-item.active .faq-answer { display: block; }
        .faq-item.active .faq-btn { color: var(--primary); }
        .faq-item.active .faq-btn svg { transform: rotate(180deg); }

        /* --- RESPONSIVE --- */
        @media (max-width: 992px) {
          .hero h1 { font-size: 3rem; }
          .stats-card { grid-template-columns: 1fr 1fr; }
          .booking-container { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .plan-card.popular { transform: none; }
        }
        @media (max-width: 600px) {
          .stats-card { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Expert Home Maintenance <br /> Zero Headaches.</h1>
          <p>
            The most trusted name in home repairs. From leaky faucets to full renovations,
            our verified experts fix it right the first time.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={scrollToBooking} className="btn btn-primary">Book Expert</button>
          </div>
        </div>
      </section>

      {/* ================= STATS (Floating) ================= */}
      <div className="container stats-wrapper">
        <div className="stats-card">
          <div className="stat-item">
            <span className="stat-num">5k+</span>
            <span className="stat-label">Jobs Done</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">4.9</span>
            <span className="stat-label">User Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">300+</span>
            <span className="stat-label">Experts</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">Insured</span>
          </div>
        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Our Expertise</h2>
            <p>Comprehensive home solutions delivered by certified professionals.</p>
          </div>

          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <span className="service-price">{s.price}</span>
                <div className="icon-bg">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="sub-services">
                  <li><IconCheck /> Verified Expert</li>
                  <li><IconCheck /> 30-Day Warranty</li>
                  <li><IconCheck /> Post-service Cleanup</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING PLANS ================= */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Simple Pricing Plans</h2>
            <p>Choose a plan that fits your property needs.</p>
          </div>

          <div className="pricing-grid">
            {/* Pay Per Use */}
            <div className="plan-card">
              <h3>Pay Per Visit</h3>
              <div className="plan-price">₹299 <span>/ visit</span></div>
              <p style={{ color: 'var(--gray)' }}>Inspection charge waived if service booked.</p>
              <ul className="plan-features">
                <li><IconCheck /> Verified Professional</li>
                <li><IconCheck /> 30-Day Service Warranty</li>
                <li><IconCheck /> Pay only for what you need</li>
                <li style={{ opacity: 0.4, textDecoration: 'line-through' }}>Priority Booking</li>
              </ul>
              <button
                onClick={scrollToBooking}
                className="btn btn-outline"
                style={{ borderColor: '#D5C4BB', color: 'var(--dark)', width: '100%' }}
              >
                Book Now
              </button>
            </div>

            {/* Annual Plan */}
            <div className="plan-card popular">
              <span className="badge-popular">Best Value</span>
              <h3>Annual Gold Plan</h3>
              <div className="plan-price">₹2,499 <span>/ year</span></div>
              <p style={{ color: 'var(--gray)' }}>Unlimited scheduled maintenance for your home.</p>
              <ul className="plan-features">
                <li><IconCheck /> <strong>Unlimited</strong> Free Inspections</li>
                <li><IconCheck /> 2 Free AC Servicings</li>
                <li><IconCheck /> 15% Off Spare Parts</li>
                <li><IconCheck /> Priority Emergency Support</li>
              </ul>
              <button
                onClick={scrollToBooking}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Choose Gold
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING FORM (Glassmorphism) ================= */}
      <section className="booking-section" id="book">
        <div className="overlay"></div>
        <div className="container booking-container">

          {/* Left Text */}
          <div className="booking-text">
            <h2>Ready to fix it?</h2>
            <p>Fill out the form and our team will be in touch within 15 minutes to confirm your slot.</p>

            <div className="benefits-grid">
              <div className="benefit-box">
                <h4><IconShield /> Fully Insured</h4>
                <p>Covered up to ₹5 Lakhs against damages.</p>
              </div>
              <div className="benefit-box">
                <h4><IconZap /> Fast Service</h4>
                <p>Same-day arrival for bookings before 12 PM.</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="form-glass">
            <h3 style={{ marginBottom: '20px' }}>Book a Professional</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Your Name</label>
                <input type="text" name="name" value={form.name} className="input-field" placeholder="John Doe" onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input type="email" name="email" value={form.email} className="input-field" placeholder="john@propzo.com" onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={form.phone} className="input-field" placeholder="+91 98765 00000" onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Service Type</label>
                  <select name="service" value={form.service} className="input-field" onChange={handleChange}>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Painting">Painting</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Preferred Date</label>
                <input type="date" name="date" value={form.date} className="input-field" onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Describe the Issue</label>
                <textarea name="details" value={form.details} rows="3" className="input-field" placeholder="E.g., Leaking tap in kitchen..." onChange={handleChange}></textarea>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--success)', fontWeight: 'bold' }}>
                  ✓ Request submitted! We'll call you shortly.
                </div>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? "Submitting..." : "Confirm Booking"}
                </button>
              )}
            </form>
          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="faq-section">
        <div className="container faq-max">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          {[
            { q: "Is there a visitation fee?", a: "We have a minimal inspection charge (₹149) which is waived off if you proceed with the service." },
            { q: "Do I need to provide tools?", a: "No, our professionals come fully equipped with all necessary tools and equipment." },
            { q: "Are the spare parts included?", a: "Spare parts are charged separately at actuals. You can also provide your own parts if preferred." },
            { q: "How quickly can you arrive?", a: "We offer same-day service for emergency repairs booked before 12 PM." }
          ].map((item, index) => (
            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
              <button className="faq-btn" onClick={() => toggleFaq(index)}>
                {item.q}
                <IconChevronDown />
              </button>
              <div className="faq-answer">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
