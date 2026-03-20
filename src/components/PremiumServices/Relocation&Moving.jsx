// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// // --- SVG ICONS (Custom Set) ---
// const IconTruck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
// const IconPackage = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
// const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
// const IconMapPin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
// const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
// const IconChevronDown = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
// const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

// export default function RelocationMoving() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     from: "",
//     to: "",
//     movingDate: "",
//     type: "residential" // residential or office
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [activeFaq, setActiveFaq] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("/api/premium-services", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...form,
//           packageName: `${form.type} Relocation (${form.from} to ${form.to})`,
//           serviceType: "Relocation & Moving"
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(true);
//         alert(`Thanks ${form.name}! We will contact you at ${form.phone} with a quote.`);
//         setForm({
//           name: "",
//           email: "",
//           phone: "",
//           from: "",
//           to: "",
//           movingDate: "",
//           type: "residential"
//         });
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error connecting to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFaq = (index) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const scrollToQuote = () => {
//     const element = document.getElementById("quote-section");
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="relocation-page">
//       {/* ================= INTERNAL CSS ================= */}
//       <style>{`
//         :root {
//           --primary: #1e3a8a;       /* Deep Navy */
//           --primary-light: #3b82f6; /* Blue 500 */
//           --accent: #f59e0b;        /* Amber */
//           --dark: #0f172a;          /* Slate 900 */
//           --light: #f8fafc;         /* Slate 50 */
//           --gray: #64748b;
//           --white: #ffffff;
//           --radius: 12px;
//           --shadow-sm: 0 4px 6px -1px rgba(0,0,0,0.05);
//           --shadow-lg: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.01);
//           --glass: rgba(255, 255, 255, 0.95);
//         }

//         * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
//         body { background: var(--light); color: var(--dark); line-height: 1.6; }

//         .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

//         /* --- UTILITY & BUTTONS --- */
//         h1, h2, h3, h4 { line-height: 1.2; font-weight: 800; color: var(--dark); }
//         .text-accent { color: var(--primary-light); }
//         .text-center { text-align: center; }

//         .btn {
//           display: inline-flex; align-items: center; justify-content: center; gap: 10px;
//           padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none;
//           transition: 0.3s; cursor: pointer; border: none; font-size: 1rem;
//         }
//         .btn-accent { background: var(--accent); color: var(--dark); }
//         .btn-accent:hover { background: #d97706; transform: translateY(-2px); }
//         .btn-primary { background: var(--primary); color: white; }
//         .btn-primary:hover { background: #172554; }
//         .btn-outline-white { background: transparent; border: 2px solid white; color: white; }
//         .btn-outline-white:hover { background: white; color: var(--primary); }

//         /* --- HERO SECTION --- */
//         .hero {
//           position: relative;
//           min-height: 600px;
//           background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.7)),
//                       url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80");
//           background-size: cover;
//           background-position: center;
//           display: flex; align-items: center;
//           justify-content: center;
//           padding: 80px 0;
//           text-align: center;
//         }

//         .hero-content { max-width: 800px; margin: 0 auto; }
//         .hero-content h1 { font-size: 3.8rem; color: white; margin-bottom: 24px; }
//         .hero-content p { font-size: 1.3rem; color: #e2e8f0; margin-bottom: 40px; }

//         .trust-badges { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
//         .badge { background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); color: white; padding: 10px 20px; border-radius: 50px; font-size: 1rem; display: flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.2); }

//         /* --- STATS STRIP --- */
//         .stats-section { background: white; padding: 40px 0; border-bottom: 1px solid #e2e8f0; }
//         .stats-grid { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
//         .stat-item { text-align: center; }
//         .stat-num { display: block; font-size: 2.5rem; font-weight: 800; color: var(--primary); line-height: 1; }
//         .stat-label { font-size: 0.9rem; color: var(--gray); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

//         /* --- ESTIMATE SECTION (WITH BG IMAGE) --- */
//         .estimate-section {
//           padding: 100px 0;
//           /* Background image with dark overlay */
//           background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.9)), 
//                       url("https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=80");
//           background-size: cover;
//           background-position: center;
//           background-attachment: fixed; /* Parallax effect */
//           position: relative;
//         }

//         .booking-card {
//           max-width: 650px; margin: 0 auto;
//           background: var(--glass);
//           padding: 40px; border-radius: 20px;
//           box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
//           backdrop-filter: blur(10px);
//           position: relative; z-index: 2;
//         }

//         .booking-card h3 { margin-bottom: 20px; color: var(--primary); font-size: 1.8rem; text-align: center; }
//         .booking-subtitle { text-align: center; color: var(--gray); margin-bottom: 30px; margin-top: -10px; }

//         .form-group { margin-bottom: 16px; position: relative; }
//         .form-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--gray); margin-bottom: 6px; }

//         .input-wrapper { position: relative; }
//         .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray); }

//         .form-input, .form-select {
//           width: 100%; padding: 12px 12px 12px 42px; 
//           border: 1px solid #cbd5e1; border-radius: 8px;
//           font-size: 1rem; transition: 0.3s;
//         }
//         .form-input:focus { border-color: var(--primary-light); outline: none; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

//         .row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

//         /* --- PROCESS SECTION --- */
//         .section { padding: 100px 0; }
//         .section-header { text-align: center; margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto; }
//         .section-header h2 { font-size: 2.5rem; margin-bottom: 15px; }
//         .section-header p { color: var(--gray); font-size: 1.1rem; }

//         .timeline { position: relative; max-width: 900px; margin: 0 auto; }
//         .timeline::before {
//           content: ''; position: absolute; left: 50%; transform: translateX(-50%);
//           width: 2px; height: 100%; background: #e2e8f0; z-index: 0;
//         }
//         .timeline-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; position: relative; z-index: 1; }
//         .timeline-item:nth-child(even) { flex-direction: row-reverse; }

//         .timeline-content { width: 42%; background: white; padding: 30px; border-radius: 12px; box-shadow: var(--shadow-sm); border: 1px solid #f1f5f9; position: relative; }
//         .timeline-num { 
//           width: 50px; height: 50px; background: var(--primary); color: white;
//           border-radius: 50%; display: flex; align-items: center; justify-content: center;
//           font-weight: 700; font-size: 1.2rem; border: 4px solid white; box-shadow: 0 0 0 2px #e2e8f0;
//           position: absolute; left: 50%; transform: translateX(-50%);
//         }

//         /* --- SERVICES CARDS --- */
//         .services-bg { background: #f0f9ff; }
//         .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

//         .service-card {
//           background: white; padding: 40px; border-radius: 16px;
//           transition: 0.3s; border: 1px solid #e2e8f0; position: relative; overflow: hidden;
//         }
//         .service-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: var(--primary-light); }
//         .service-card::before {
//           content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--primary-light);
//           transform: scaleX(0); transform-origin: left; transition: 0.3s;
//         }
//         .service-card:hover::before { transform: scaleX(1); }

//         .icon-circle {
//           width: 60px; height: 60px; background: #eff6ff; color: var(--primary);
//           border-radius: 12px; display: flex; align-items: center; justify-content: center;
//           margin-bottom: 24px;
//         }
//         .service-card:hover .icon-circle { background: var(--primary); color: white; }

//         /* --- TESTIMONIALS --- */
//         .review-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
//         .review-card { background: white; padding: 30px; border-radius: 16px; box-shadow: var(--shadow-sm); border: 1px solid #f1f5f9; }
//         .stars { display: flex; gap: 4px; margin-bottom: 15px; }
//         .review-text { font-style: italic; color: #475569; margin-bottom: 20px; }
//         .reviewer { display: flex; align-items: center; gap: 12px; }
//         .avatar { width: 40px; height: 40px; background: #cbd5e1; border-radius: 50%; }

//         /* --- FAQ ACCORDION --- */
//         .faq-max { max-width: 800px; margin: 0 auto; }
//         .faq-item { background: white; margin-bottom: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
//         .faq-btn {
//           width: 100%; padding: 20px; text-align: left; background: none; border: none;
//           display: flex; justify-content: space-between; align-items: center; cursor: pointer;
//           font-weight: 600; font-size: 1.1rem; color: var(--dark);
//         }
//         .faq-btn:hover { background: #f8fafc; }
//         .faq-answer {
//           padding: 0 20px 20px; color: var(--gray); display: none; line-height: 1.6;
//         }
//         .faq-item.active .faq-answer { display: block; }
//         .faq-item.active .faq-btn svg { transform: rotate(180deg); }

//         /* --- CTA --- */
//         .cta-banner {
//           background: white;
//           color: var(--dark); padding: 80px 0; text-align: center;
//           border-top: 1px solid #e2e8f0;
//         }

//         /* --- ANIMATIONS & MEDIA QUERIES --- */
//         @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

//         @media (max-width: 968px) {
//           .hero-content h1 { font-size: 2.5rem; }
//           .timeline::before { left: 20px; }
//           .timeline-item { flex-direction: column !important; align-items: flex-start; margin-left: 50px; }
//           .timeline-num { left: -50px; transform: none; }
//           .timeline-content { width: 100%; }
//         }
//       `}</style>

//       {/* ================= HERO SECTION ================= */}
//       <section className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <h1>Relocation made <br /><span className="text-accent">simple & secure.</span></h1>
//             <p>
//               We handle the heavy lifting, packing, and logistics.
//               Whether it's across the street or across the country,
//               experience a stress-free move.
//             </p>
//             <div className="trust-badges">
//               <div className="badge"><IconShield /> Fully Insured</div>
//               <div className="badge"><IconStar /> 4.9/5 Rating</div>
//               <div className="badge"><IconCalendar /> Same Day Service</div>
//             </div>

//             <div style={{ marginTop: '40px' }}>
//               <button onClick={scrollToQuote} className="btn btn-accent">Get Free Quote</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= STATS STRIP ================= */}
//       <div className="stats-section">
//         <div className="container stats-grid">
//           <div className="stat-item">
//             <span className="stat-num">15k+</span>
//             <span className="stat-label">Moves Completed</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-num">98%</span>
//             <span className="stat-label">On-Time Arrival</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-num">50+</span>
//             <span className="stat-label">Cities Covered</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-num">24/7</span>
//             <span className="stat-label">Support Team</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= HOW IT WORKS (TIMELINE) ================= */}
//       <section className="section">
//         <div className="container">
//           <div className="section-header">
//             <h2>How It Works</h2>
//             <p>A simple 3-step process to get you to your new destination.</p>
//           </div>

//           <div className="timeline">
//             <div className="timeline-item">
//               <div className="timeline-num">1</div>
//               <div className="timeline-content">
//                 <h4>Request a Quote</h4>
//                 <p>Fill out the form below or give us a call. We'll provide a transparent, fixed-price estimate within minutes.</p>
//               </div>
//             </div>
//             <div className="timeline-item">
//               <div className="timeline-num">2</div>
//               <div className="timeline-content">
//                 <h4>We Pack & Load</h4>
//                 <p>On moving day, our team arrives with all necessary supplies. We disassemble furniture and pack everything securely.</p>
//               </div>
//             </div>
//             <div className="timeline-item">
//               <div className="timeline-num">3</div>
//               <div className="timeline-content">
//                 <h4>Safe Delivery</h4>
//                 <p>We transport your belongings to your new home, unload, and reassemble furniture exactly where you want it.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= SERVICES ================= */}
//       <section className="section services-bg">
//         <div className="container">
//           <div className="section-header">
//             <h2>Our Expertise</h2>
//             <p>Tailored moving solutions for every requirement.</p>
//           </div>

//           <div className="services-grid">
//             <div className="service-card">
//               <div className="icon-circle"><IconTruck /></div>
//               <h4>Local Moving</h4>
//               <p>Fast and affordable local shifting services within the city limits. Same-day service available.</p>
//             </div>
//             <div className="service-card">
//               <div className="icon-circle"><IconPackage /></div>
//               <h4>Packing Services</h4>
//               <p>Premium packing using bubble wrap, sturdy boxes, and furniture pads to ensure zero damage.</p>
//             </div>
//             <div className="service-card">
//               <div className="icon-circle"><IconMapPin /></div>
//               <h4>Long Distance</h4>
//               <p>Cross-country relocation support with real-time GPS tracking and logistics management.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= ESTIMATE FORM SECTION (With BG Image) ================= */}
//       <section className="estimate-section" id="quote-section">
//         <div className="container">

//           <div className="booking-card">
//             <h3>Get a Free Estimate</h3>
//             <p className="booking-subtitle">Fill out the form below for a quick price calculation.</p>
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="form-group">
//                   <label className="form-label">Moving From</label>
//                   <div className="input-wrapper">
//                     <span className="input-icon"><IconMapPin /></span>
//                     <input className="form-input" name="from" placeholder="Zip Code" onChange={handleChange} required />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Moving To</label>
//                   <div className="input-wrapper">
//                     <span className="input-icon"><IconMapPin /></span>
//                     <input className="form-input" name="to" placeholder="Zip Code" onChange={handleChange} required />
//                   </div>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Move Type</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon"><IconPackage /></span>
//                   <select className="form-select" name="type" onChange={handleChange}>
//                     <option value="residential">Residential Home</option>
//                     <option value="office">Office / Commercial</option>
//                     <option value="storage">Storage Only</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Full Name</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">👤</span>
//                   <input className="form-input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Email Address</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">✉️</span>
//                   <input className="form-input" type="email" name="email" placeholder="john@propzo.com" value={form.email} onChange={handleChange} required />
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="form-group">
//                   <label className="form-label">Phone</label>
//                   <div className="input-wrapper">
//                     <span className="input-icon">📞</span>
//                     <input className="form-input" type="tel" name="phone" placeholder="(555) 000-0000" onChange={handleChange} required />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Date</label>
//                   <div className="input-wrapper">
//                     <span className="input-icon"><IconCalendar /></span>
//                     <input className="form-input" type="date" name="movingDate" onChange={handleChange} required />
//                   </div>
//                 </div>
//               </div>

//               <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
//                 {loading ? "Submitting..." : "Calculate Price"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
//       <section className="section">
//         <div className="container">
//           <div className="section-header">
//             <h2>What People Say</h2>
//             <p>Don't just take our word for it.</p>
//           </div>

//           <div className="review-grid">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="review-card">
//                 <div className="stars">
//                   <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
//                 </div>
//                 <p className="review-text">"Absolutely the best moving experience I've ever had. The team was professional, fast, and nothing was broken!"</p>
//                 <div className="reviewer">
//                   <div className="avatar"></div>
//                   <div>
//                     <strong>Client Name</strong>
//                     <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Moved in Oct 2023</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= FAQ ================= */}
//       <section className="section" style={{ background: '#fff' }}>
//         <div className="container faq-max">
//           <div className="section-header">
//             <h2>Frequently Asked Questions</h2>
//           </div>

//           {[
//             { q: "How much does a move typically cost?", a: "Costs vary based on distance and volume. Local moves usually start at $300, while long-distance depends on mileage and weight." },
//             { q: "Do you provide packing materials?", a: "Yes! We can provide boxes, tape, and bubble wrap. Full packing services include all materials in the price." },
//             { q: "Are my belongings insured?", a: "Absolutely. We offer basic liability coverage included in every move, with options for full-value protection." }
//           ].map((item, index) => (
//             <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
//               <button className="faq-btn" onClick={() => toggleFaq(index)}>
//                 {item.q}
//                 <IconChevronDown />
//               </button>
//               <div className="faq-answer">{item.a}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= FINAL CTA ================= */}
//       <section className="cta-banner">
//         <div className="container">
//           <h2>Still have questions?</h2>
//           <p style={{ marginBottom: '30px', opacity: 0.9 }}>Our support team is available 24/7 to assist you.</p>
//           <NavLink to="/contact" className="btn btn-primary">
//             Contact Support
//           </NavLink>
//         </div>
//       </section>

//     </div>
//   );
// }



import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// --- SVG ICONS (Custom Set) ---
const IconTruck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const IconPackage = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconMapPin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#B2846B" stroke="#B2846B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconChevronDown = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

export default function RelocationMoving() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    movingDate: "",
    type: "residential"
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/premium-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageName: `${form.type} Relocation (${form.from} to ${form.to})`,
          serviceType: "Relocation & Moving"
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        alert(`Thanks ${form.name}! We will contact you at ${form.phone} with a quote.`);
        setForm({ name: "", email: "", phone: "", from: "", to: "", movingDate: "", type: "residential" });
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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToQuote = () => {
    const element = document.getElementById("quote-section");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relocation-page">
      <style>{`
        :root {
          --primary: #4c3324;
          --primary-light: #627b68;
          --accent: #819b8b;
          --dark: #3a2e28;
          --light: #f9f6f1;
          --gray: #6b5e58;
          --white: #ffffff;
          --radius: 12px;
          --shadow-sm: 0 4px 6px -1px rgba(76, 51, 36, 0.05);
          --shadow-lg: 0 20px 25px -5px rgba(76, 51, 36, 0.08), 0 8px 10px -6px rgba(76, 51, 36, 0.05);
          --glass: rgba(255, 255, 255, 0.96);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        body { background: var(--light); color: var(--dark); line-height: 1.6; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        h1, h2, h3, h4 { line-height: 1.2; font-weight: 800; color: var(--dark); }
        .text-accent { color: #ffffff; }
        .text-center { text-align: center; }
        
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none;
          transition: 0.3s; cursor: pointer; border: none; font-size: 1rem;
        }
        .btn-accent { background: linear-gradient(135deg, #627b68 0%, #4c3324 100%); color: #fff; }
        .btn-accent:hover { opacity: 0.9; transform: translateY(-2px); }
        .btn-primary { background: #627b68; color: white; }
        .btn-primary:hover { background: #4c3324; }
        .btn-outline-white { background: transparent; border: 2px solid white; color: white; }
        .btn-outline-white:hover { background: white; color: #4c3324; }

        /* HERO */
        .hero {
          position: relative;
          min-height: 600px;
          background: linear-gradient(rgba(76, 51, 36, 0.82), rgba(76, 51, 36, 0.75)),
                      url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80");
          background-size: cover;
          background-position: center;
          display: flex; align-items: center;
          justify-content: center;
          padding: 80px 0;
          text-align: center;
        }

        .hero-content { max-width: 800px; margin: 0 auto; }
        .hero-content h1 { font-size: 3.8rem; color: #ffffff; margin-bottom: 24px; }
        .hero-content p { font-size: 1.3rem; color: #f9f6f1; margin-bottom: 40px; opacity: 0.88; }
        
        .trust-badges { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .badge { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(5px); color: #f9f6f1; padding: 10px 20px; border-radius: 50px; font-size: 1rem; display: flex; align-items: center; gap: 8px; border: 1px solid rgba(255, 255, 255, 0.2); }

        /* STATS STRIP */
        .stats-section { background: white; padding: 40px 0; border-bottom: 1px solid #e8d5c8; }
        .stats-grid { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .stat-item { text-align: center; }
        .stat-num { display: block; font-size: 2.5rem; font-weight: 800; color: #627b68; line-height: 1; }
        .stat-label { font-size: 0.9rem; color: var(--gray); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

        /* ESTIMATE SECTION */
        .estimate-section {
          padding: 100px 0;
          background: linear-gradient(rgba(76, 51, 36, 0.88), rgba(76, 51, 36, 0.92)), 
                      url("https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=80");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
        }

        .booking-card {
          max-width: 650px; margin: 0 auto;
          background: var(--glass);
          padding: 40px; border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(76, 51, 36, 0.4);
          backdrop-filter: blur(10px);
          position: relative; z-index: 2;
        }
        
        .booking-card h3 { margin-bottom: 20px; color: #4c3324; font-size: 1.8rem; text-align: center; }
        .booking-subtitle { text-align: center; color: var(--gray); margin-bottom: 30px; margin-top: -10px; }
        
        .form-group { margin-bottom: 16px; position: relative; }
        .form-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--gray); margin-bottom: 6px; }
        
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray); }
        
        .form-input, .form-select {
          width: 100%; padding: 12px 12px 12px 42px; 
          border: 1px solid #d5c4bb; border-radius: 8px;
          font-size: 1rem; transition: 0.3s; color: #4C3324;
          background: white;
        }
        .form-input:focus { border-color: #627b68; outline: none; box-shadow: 0 0 0 3px rgba(98, 123, 104, 0.15); }

        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

        /* PROCESS SECTION */
        .section { padding: 100px 0; }
        .section-header { text-align: center; margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto; }
        .section-header h2 { font-size: 2.5rem; margin-bottom: 15px; color: #4C3324; }
        .section-header p { color: var(--gray); font-size: 1.1rem; }

        .timeline { position: relative; max-width: 900px; margin: 0 auto; }
        .timeline::before {
          content: ''; position: absolute; left: 50%; transform: translateX(-50%);
          width: 2px; height: 100%; background: #e8d5c8; z-index: 0;
        }
        .timeline-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; position: relative; z-index: 1; }
        .timeline-item:nth-child(even) { flex-direction: row-reverse; }
        
        .timeline-content { width: 42%; background: white; padding: 30px; border-radius: 12px; box-shadow: var(--shadow-sm); border: 1px solid #e8d5c8; position: relative; }
        .timeline-content h4 { color: #4C3324; }
        .timeline-content p { color: #627B68; }
        .timeline-num { 
          width: 50px; height: 50px; background: #627b68; color: white;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1.2rem; border: 4px solid white; box-shadow: 0 0 0 2px rgba(228, 203, 182, 0.3);
          position: absolute; left: 50%; transform: translateX(-50%);
        }

        /* SERVICES CARDS */
        .services-bg { background: #eef2ef; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        
        .service-card {
          background: white; padding: 40px; border-radius: 16px;
          transition: 0.3s; border: 1px solid #e8d5c8; position: relative; overflow: hidden;
        }
        .service-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: #627b68; }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #627b68;
          transform: scaleX(0); transform-origin: left; transition: 0.3s;
        }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card h4 { color: #4C3324; margin-bottom: 10px; }
        .service-card p { color: #627B68; }

        .icon-circle {
          width: 60px; height: 60px; background: #eef2ef; color: #627B68;
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }
        .service-card:hover .icon-circle { background: #627b68; color: white; }

        /* TESTIMONIALS */
        .review-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .review-card { background: white; padding: 30px; border-radius: 16px; box-shadow: var(--shadow-sm); border: 1px solid #e8d5c8; }
        .stars { display: flex; gap: 4px; margin-bottom: 15px; }
        .review-text { font-style: italic; color: #627B68; margin-bottom: 20px; }
        .reviewer { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; background: #e8d5c8; border-radius: 50%; }

        /* FAQ ACCORDION */
        .faq-max { max-width: 800px; margin: 0 auto; }
        .faq-item { background: white; margin-bottom: 15px; border-radius: 8px; border: 1px solid #e8d5c8; overflow: hidden; }
        .faq-btn {
          width: 100%; padding: 20px; text-align: left; background: none; border: none;
          display: flex; justify-content: space-between; align-items: center; cursor: pointer;
          font-weight: 600; font-size: 1.1rem; color: #4C3324;
        }
        .faq-btn:hover { background: #f5f0ec; }
        .faq-answer {
          padding: 0 20px 20px; color: var(--gray); display: none; line-height: 1.6;
        }
        .faq-item.active .faq-answer { display: block; }
        .faq-item.active .faq-btn { color: #627B68; }
        .faq-item.active .faq-btn svg { transform: rotate(180deg); }

        /* CTA */
        .cta-banner {
          background: white;
          color: var(--dark); padding: 80px 0; text-align: center;
          border-top: 1px solid #e8d5c8;
        }
        .cta-banner h2 { color: #4c3324; }
        .cta-banner p { color: #6b5e58; }

        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 968px) {
          .hero-content h1 { font-size: 2.5rem; }
          .timeline::before { left: 20px; }
          .timeline-item { flex-direction: column !important; align-items: flex-start; margin-left: 50px; }
          .timeline-num { left: -50px; transform: none; }
          .timeline-content { width: 100%; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Relocation made <br /><span className="text-accent">simple & secure.</span></h1>
            <p>
              We handle the heavy lifting, packing, and logistics.
              Whether it's across the street or across the country,
              experience a stress-free move.
            </p>
            <div className="trust-badges">
              <div className="badge"><IconShield /> Fully Insured</div>
              <div className="badge"><IconStar /> 4.9/5 Rating</div>
              <div className="badge"><IconCalendar /> Same Day Service</div>
            </div>
            <div style={{ marginTop: '40px' }}>
              <button onClick={scrollToQuote} className="btn btn-accent">Get Free Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-num">15k+</span>
            <span className="stat-label">Moves Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">98%</span>
            <span className="stat-label">On-Time Arrival</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">50+</span>
            <span className="stat-label">Cities Covered</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">24/7</span>
            <span className="stat-label">Support Team</span>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS (TIMELINE) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>A simple 3-step process to get you to your new destination.</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-num">1</div>
              <div className="timeline-content">
                <h4>Request a Quote</h4>
                <p>Fill out the form below or give us a call. We'll provide a transparent, fixed-price estimate within minutes.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-num">2</div>
              <div className="timeline-content">
                <h4>We Pack & Load</h4>
                <p>On moving day, our team arrives with all necessary supplies. We disassemble furniture and pack everything securely.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-num">3</div>
              <div className="timeline-content">
                <h4>Safe Delivery</h4>
                <p>We transport your belongings to your new home, unload, and reassemble furniture exactly where you want it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-bg">
        <div className="container">
          <div className="section-header">
            <h2>Our Expertise</h2>
            <p>Tailored moving solutions for every requirement.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="icon-circle"><IconTruck /></div>
              <h4>Local Moving</h4>
              <p>Fast and affordable local shifting services within the city limits. Same-day service available.</p>
            </div>
            <div className="service-card">
              <div className="icon-circle"><IconPackage /></div>
              <h4>Packing Services</h4>
              <p>Premium packing using bubble wrap, sturdy boxes, and furniture pads to ensure zero damage.</p>
            </div>
            <div className="service-card">
              <div className="icon-circle"><IconMapPin /></div>
              <h4>Long Distance</h4>
              <p>Cross-country relocation support with real-time GPS tracking and logistics management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTIMATE FORM SECTION */}
      <section className="estimate-section" id="quote-section">
        <div className="container">
          <div className="booking-card">
            <h3>Get a Free Estimate</h3>
            <p className="booking-subtitle">Fill out the form below for a quick price calculation.</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group">
                  <label className="form-label">Moving From</label>
                  <div className="input-wrapper">
                    <span className="input-icon"><IconMapPin /></span>
                    <input className="form-input" name="from" placeholder="Zip Code" onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Moving To</label>
                  <div className="input-wrapper">
                    <span className="input-icon"><IconMapPin /></span>
                    <input className="form-input" name="to" placeholder="Zip Code" onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Move Type</label>
                <div className="input-wrapper">
                  <span className="input-icon"><IconPackage /></span>
                  <select className="form-select" name="type" onChange={handleChange}>
                    <option value="residential">Residential Home</option>
                    <option value="office">Office / Commercial</option>
                    <option value="storage">Storage Only</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input className="form-input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input className="form-input" type="email" name="email" placeholder="john@propzo.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📞</span>
                    <input className="form-input" type="tel" name="phone" placeholder="(555) 000-0000" onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="input-wrapper">
                    <span className="input-icon"><IconCalendar /></span>
                    <input className="form-input" type="date" name="movingDate" onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                {loading ? "Submitting..." : "Calculate Price"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What People Say</h2>
            <p>Don't just take our word for it.</p>
          </div>
          <div className="review-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="review-card">
                <div className="stars">
                  <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
                </div>
                <p className="review-text">"Absolutely the best moving experience I've ever had. The team was professional, fast, and nothing was broken!"</p>
                <div className="reviewer">
                  <div className="avatar"></div>
                  <div>
                    <strong style={{ color: '#4C3324' }}>Client Name</strong>
                    <div style={{ fontSize: '0.85rem', color: '#819B8B' }}>Moved in Oct 2023</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container faq-max">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          {[
            { q: "How much does a move typically cost?", a: "Costs vary based on distance and volume. Local moves usually start at $300, while long-distance depends on mileage and weight." },
            { q: "Do you provide packing materials?", a: "Yes! We can provide boxes, tape, and bubble wrap. Full packing services include all materials in the price." },
            { q: "Are my belongings insured?", a: "Absolutely. We offer basic liability coverage included in every move, with options for full-value protection." }
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

      {/* FINAL CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>Still have questions?</h2>
          <p style={{ marginBottom: '30px' }}>Our support team is available 24/7 to assist you.</p>
          <NavLink to="/contact" className="btn btn-primary">
            Contact Support
          </NavLink>
        </div>
      </section>

    </div>
  );
}
