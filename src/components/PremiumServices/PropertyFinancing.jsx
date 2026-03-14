// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// /* ================= STATIC DATA ================= */

// const loanServices = [
//   {
//     id: 1,
//     title: "Home Loans",
//     rate: "8.50%",
//     desc: "Buy your dream home with extended tenure and lowest interest rates.",
//     icon: "🏠",
//     features: ["Up to 30 Years Tenure", "90% Funding", "Zero Hidden Charges"],
//   },
//   {
//     id: 2,
//     title: "Loan Against Property",
//     rate: "9.75%",
//     desc: "Unlock the hidden value of your property for your personal needs.",
//     icon: "🏢",
//     features: ["High Loan Value", "Flexible Repayment", "Quick Approval"],
//   },
//   {
//     id: 3,
//     title: "Commercial Loans",
//     rate: "10.25%",
//     desc: "Expand your business with financing for shops and office spaces.",
//     icon: "💼",
//     features: ["Customized Solutions", "Balance Transfer", "Overdraft Facility"],
//   },
//   {
//     id: 4,
//     title: "Balance Transfer",
//     rate: "8.60%",
//     desc: "Transfer your existing loan to us and reduce your monthly EMI.",
//     icon: "📉",
//     features: ["Lower Interest Rate", "Top-up Loan Available", "Minimal Paperwork"],
//   },
// ];

// const documents = {
//   Salaried: [
//     "Identity Proof (Aadhar/PAN)",
//     "Address Proof (Utility Bill)",
//     "Last 3 Months Salary Slips",
//     "Last 6 Months Bank Statement",
//     "Form 16 (2 Years)",
//   ],
//   "Self-Employed": [
//     "Identity Proof (Aadhar/PAN)",
//     "Business Registration Proof",
//     "ITR for last 3 Years",
//     "Profit & Loss Statement",
//     "Last 1 Year Bank Statement",
//   ],
// };

// const testimonials = [
//   {
//     name: "Vikram Malhotra",
//     role: "Business Owner",
//     text: "The loan against property process was seamless. Funds were disbursed in just 4 days!",
//     image: "https://randomuser.me/api/portraits/men/32.jpg"
//   },
//   {
//     name: "Sneha Reddy",
//     role: "Software Engineer",
//     text: "Best interest rates in the market. The doorstep document collection saved me so much time.",
//     image: "https://randomuser.me/api/portraits/women/44.jpg"
//   },
//   {
//     name: "Arjun Das",
//     role: "Architect",
//     text: "Transparent processing and very helpful staff. Highly recommended for home loans.",
//     image: "https://randomuser.me/api/portraits/men/45.jpg"
//   },
// ];

// /* ================= COMPONENT ================= */

// export default function PropertyFinancing() {
//   // Calculator State
//   const [amount, setAmount] = useState(5000000);
//   const [rate, setRate] = useState(8.5);
//   const [tenure, setTenure] = useState(20);
//   const [emi, setEmi] = useState(0);
//   const [totalInterest, setTotalInterest] = useState(0);
//   const [totalPayment, setTotalPayment] = useState(0);

//   // UI State
//   const [activeDocTab, setActiveDocTab] = useState("Salaried");
//   const [selectedService, setSelectedService] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     amount: ""
//   });

//   // EMI Calculation Logic
//   useEffect(() => {
//     const calculateEMI = () => {
//       const r = rate / 12 / 100; // monthly interest
//       const n = tenure * 12; // months
//       const emiValue =
//         (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

//       const totalPay = emiValue * n;
//       const totInt = totalPay - amount;

//       setEmi(Math.round(emiValue));
//       setTotalPayment(Math.round(totalPay));
//       setTotalInterest(Math.round(totInt));
//     };
//     calculateEMI();
//   }, [amount, rate, tenure]);

//   // Formatters
//   const formatCurrency = (val) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumSignificantDigits: 10,
//     }).format(val);
//   };

//   // Handlers
//   const handleInputChange = (e) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("/api/premium-services", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formValues.name,
//           email: formValues.email,
//           phone: formValues.phone,
//           packageName: selectedService?.title || "General Financing",
//           message: `Required Amount: ₹${formValues.amount || "Not specified"}`,
//           serviceType: "Property Financing"
//         }),
//       });

//       if (response.ok) {
//         setSubmitted(true);
//         setFormValues({ name: "", email: "", phone: "", amount: "" });
//         setTimeout(() => {
//           setSelectedService(null);
//           setSubmitted(false);
//         }, 3000);
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting financing request:", error);
//       alert("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
<<<<<<< HEAD
//         /* GLOBAL & UTILS */
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;700&display=swap');

//         * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

//         body { 
//           margin: 0; 
//           background-color: #0a0c09;
//           color: #f5f0e8; 
//         }

//         .container { width: 90%; max-width: 1250px; margin: auto; }
//         .section { padding: 100px 0; position: relative; }
//         .bg-white { background: #111309; }
//         .text-center { text-align: center; }
//         .text-blue { color: #b8965a; }
//         .bold { font-weight: 700; }

//         /* ANIMATIONS */
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
//         .delay-1 { animation-delay: 0.1s; }
//         .delay-2 { animation-delay: 0.2s; }
//         .delay-3 { animation-delay: 0.3s; }

//         /* TYPOGRAPHY */
//         .section-title { 
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 3.5rem; 
//           margin-bottom: 20px; 
//           color: #f5f0e8; 
//           font-weight: 300;
//           letter-spacing: -1px;
//         }
//         .section-subtitle { 
//           color: #7a7670; 
//           margin-bottom: 60px; 
//           max-width: 600px; 
//           margin-left: auto; 
//           margin-right: auto; 
//           line-height: 1.6;
//           font-size: 1.1rem;
//         }

//         /* BUTTONS */
//         .cta-btn {
//           background: #b8965a;
//           color: #0a0c09;
//           padding: 16px 40px;
//           border-radius: 2px;
//           border: none;
//           font-weight: 600;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-transform: uppercase;
//           letter-spacing: 0.15em;
//         }
//         .cta-btn:hover { 
//           background: #d4b483;
//           transform: translateY(-3px); 
//           box-shadow: 0 10px 20px rgba(184, 150, 90, 0.2); 
//         }

//         .outline-btn {
//           background: transparent;
//           border: 1px solid rgba(184, 150, 90, 0.4);
//           color: #b8965a;
//           padding: 12px 30px;
//           border-radius: 2px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: 0.3s;
//           text-transform: uppercase;
//           letter-spacing: 0.1em;
//           font-size: 0.85rem;
//         }
//         .outline-btn:hover {
//           border-color: #d4b483;
//           background: rgba(184, 150, 90, 0.05);
//           color: #d4b483;
//         }

//         /* HERO SECTION */
//         .finance-hero {
//           position: relative;
//           height: 85vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           background: #0a0c09;
//           color: #f5f0e8;
//         }

//         .hero-bg {
//           position: absolute;
//           inset: 0;
//           background: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80") center/cover;
//           opacity: 0.35;
//           transform: scale(1.05);
//         }

//         .hero-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to bottom, rgba(10, 12, 9, 0.3), #0a0c09);
//         }

//         .hero-content {
//           position: relative;
//           z-index: 2;
//           text-align: center;
//           max-width: 950px;
//           padding: 20px;
//         }

//         .hero-badge {
//           display: inline-block;
//           background: rgba(184, 150, 90, 0.1);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(184, 150, 90, 0.2);
//           padding: 8px 24px;
//           border-radius: 2px;
//           font-size: 0.8rem;
//           margin-bottom: 25px;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: #b8965a;
//         }

//         .finance-hero h1 { 
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(3.5rem, 8vw, 5.5rem); 
//           margin-bottom: 25px; 
//           line-height: 1.1; 
//           font-weight: 300;
//           color: #f5f0e8;
//           letter-spacing: -0.02em;
//         }

//         .finance-hero p { 
//           font-size: 1.25rem; 
//           color: #7a7670; 
//           margin-bottom: 40px; 
//           font-weight: 400; 
//           max-width: 650px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         /* CALCULATOR SECTION */
//         .calc-wrapper {
//           display: grid;
//           grid-template-columns: 1.25fr 0.75fr;
//           gap: 60px;
//           background: #111309;
//           padding: 60px;
//           border-radius: 4px;
//           box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
//           border: 1px solid rgba(184, 150, 90, 0.15);
//           margin-top: -100px;
//           position: relative;
//           z-index: 10;
//         }

//         .range-group { margin-bottom: 40px; }
//         .range-label { 
//           display: flex; 
//           justify-content: space-between; 
//           font-weight: 500; 
//           margin-bottom: 18px; 
//           font-size: 1rem;
//           color: #f5f0e8;
//           text-transform: uppercase;
//           letter-spacing: 0.1em;
//         }

//         input[type=range] {
//           width: 100%;
//           height: 4px;
//           background: rgba(184, 150, 90, 0.15);
//           border-radius: 2px;
//           outline: none;
//           -webkit-appearance: none;
//         }
//         input[type=range]::-webkit-slider-thumb {
//           -webkit-appearance: none;
//           width: 22px;
//           height: 22px;
//           background: #b8965a;
//           border: 2px solid #0a0c09;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         input[type=range]::-webkit-slider-thumb:hover { 
//           transform: scale(1.2); 
//           background: #d4b483;
//         }

//         /* DONUT CHART */
//         .chart-container {
//           background: rgba(184, 150, 90, 0.03);
//           border-radius: 4px;
//           padding: 50px 40px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           border: 1px solid rgba(184, 150, 90, 0.1);
//         }

//         .pie-chart {
//           width: 200px;
//           height: 200px;
//           border-radius: 50%;
//           margin-bottom: 35px;
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         /* Inner Circle for Donut Effect */
//         .pie-chart::after {
//           content: '';
//           position: absolute;
//           width: 160px;
//           height: 160px;
//           background: #111309;
//           border-radius: 50%;
//         }

//         .chart-center-text {
//           position: absolute;
//           z-index: 2;
//           display: flex;
//           flex-direction: column;
//         }

//         .chart-legend { 
//           width: 100%; 
//           display: flex; 
//           flex-direction: column;
//           gap: 15px;
//           font-size: 0.9rem; 
//           margin-top: 15px; 
//           border-top: 1px solid rgba(184, 150, 90, 0.1); 
//           padding-top: 25px; 
//           color: #7a7670;
//         }
//         .legend-item { display: flex; align-items: center; gap: 12px; }
//         .dot { width: 12px; height: 12px; border-radius: 50%; }

//         /* SERVICES GRID */
//         .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
//         .service-card {
//           background: #111309;
//           padding: 50px 40px;
//           border-radius: 4px;
//           transition: all 0.4s ease;
//           position: relative;
//           border: 1px solid rgba(184, 150, 90, 0.1);
//         }
//         .service-card:hover { 
//           transform: translateY(-8px); 
//           border-color: rgba(184, 150, 90, 0.4); 
//           box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
//         }

//         .service-icon { 
//           width: 64px; height: 64px; 
//           background: rgba(184, 150, 90, 0.08); 
//           color: #b8965a; 
//           border-radius: 50%; 
//           display: flex; align-items: center; justify-content: center; 
//           font-size: 1.8rem; margin-bottom: 30px; 
//           border: 1px solid rgba(184, 150, 90, 0.2);
//         }

//         .service-rate-badge {
//           position: absolute; top: 40px; right: 40px;
//           background: rgba(184, 150, 90, 0.15); color: #b8965a;
//           padding: 6px 16px; border-radius: 2px;
//           font-weight: 700; font-size: 0.8rem;
//           border: 1px solid rgba(184, 150, 90, 0.3);
//           letter-spacing: 0.05em;
//         }

//         /* WHY CHOOSE US */
//         .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; }
//         .why-card {
//           background: #111309; padding: 50px 30px; border-radius: 4px; text-align: center;
//           border: 1px solid rgba(184, 150, 90, 0.1); transition: 0.4s ease;
//         }
//         .why-card:hover { 
//           transform: translateY(-5px); 
//           border-color: rgba(184, 150, 90, 0.3);
//         }
//         .why-icon { font-size: 2.8rem; margin-bottom: 25px; display: block; opacity: 0.9; }

//         /* DOCUMENT TABS */
//         .doc-tabs { display: flex; justify-content: center; gap: 20px; margin-bottom: 50px; }
//         .tab-btn {
//           padding: 14px 40px; background: transparent; border: 1px solid rgba(184, 150, 90, 0.2);
//           border-radius: 2px; cursor: pointer; font-weight: 600; color: #7a7670; transition: 0.3s;
//           font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.15em;
//         }
//         .tab-btn.active { 
//           background: #b8965a; 
//           color: #0a0c09; 
//           border-color: #b8965a; 
//           box-shadow: 10px 10px 0px rgba(184, 150, 90, 0.1); 
//         }

//         .doc-list {
//           background: #111309; padding: 50px; border-radius: 4px;
//           max-width: 850px; margin: auto;
//           border: 1px solid rgba(184, 150, 90, 0.15);
//           position: relative;
//         }
//         .doc-item {
//           display: flex; align-items: center; gap: 20px; padding: 22px 0;
//           border-bottom: 1px solid rgba(184, 150, 90, 0.1); color: #7a7670; font-weight: 400; font-size: 1.1rem;
//         }
//         .doc-item:last-child { border-bottom: none; }
//         .check-circle { 
//           width: 24px; height: 24px; background: rgba(184, 150, 90, 0.1); color: #b8965a; 
//           border-radius: 50%; display: flex; align-items: center; justify-content: center; 
//           font-size: 0.8rem; flex-shrink: 0;
//         }

//         /* TESTIMONIALS */
//         .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
//         .testi-card {
//           background: #111309; padding: 50px; border-radius: 4px; position: relative;
//           border: 1px solid rgba(184, 150, 90, 0.1); 
//         }
//         .testi-card:hover { border-color: rgba(184, 150, 90, 0.3); }
//         .user-info { display: flex; align-items: center; gap: 20px; margin-top: 30px; }
//         .user-img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(184, 150, 90, 0.3); }
//         .quote-icon { font-size: 6rem; color: rgba(184, 150, 90, 0.05); position: absolute; top: 10px; right: 40px; z-index: 0; pointer-events: none; }
//         .testi-text { position: relative; z-index: 1; font-size: 1.1rem; line-height: 1.8; color: #7a7670; font-style: italic; }

//         /* FLOATING CTA */
//         .floating-btn {
//           position: fixed; bottom: 40px; right: 40px;
//           background: #b8965a; color: #0a0c09; padding: 18px 32px;
//           border-radius: 2px; font-weight: 700; font-size: 0.9rem;
//           box-shadow: 0 15px 35px rgba(184, 150, 90, 0.3);
//           z-index: 900; cursor: pointer; display: flex; align-items: center; gap: 15px;
//           transition: all 0.4s ease; border: none; text-transform: uppercase; letter-spacing: 0.1em;
//         }
//         .floating-btn:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(184, 150, 90, 0.4); }

//         /* MODAL */
//         .modal-overlay {
//           position: fixed; inset: 0; background: rgba(10, 12, 9, 0.95);
//           backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000;
//         }
//         .modal-content {
//           background: #111309; padding: 60px 50px; border-radius: 4px; width: 95%; max-width: 550px;
//           position: relative; animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
//           border: 1px solid rgba(184, 150, 90, 0.2);
//           box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
//         }
//         .form-input { 
//           width: 100%; padding: 18px; background: rgba(184, 150, 90, 0.03); border: 1px solid rgba(184, 150, 90, 0.15); 
//           border-radius: 2px; margin-bottom: 20px; outline: none; transition: 0.3s; 
//           font-size: 1rem; color: #f5f0e8;
//         }
//         .form-input:focus { 
//           border-color: #b8965a; 
//           background: rgba(184, 150, 90, 0.08); 
//           box-shadow: 0 0 0 1px #b8965a; 
//         }

//         /* RESPONSIVE */
//         @media(max-width: 900px) {
//           .calc-wrapper { grid-template-columns: 1fr; padding: 40px 30px; }
//           .finance-hero h1 { font-size: 3.5rem; }
//           .section { padding: 60px 0; }
//         }
//       `}</style>

//       {/* FLOATING CTA */}
//       <button className="floating-btn" onClick={() => setSelectedService({ title: "Callback Request" })}>
//         <span style={{ fontSize: '1.4rem' }}>📞</span> Get a Call Back
//       </button>

//       {/* 1. HERO SECTION */}
//       <section className="finance-hero">
//         <div className="hero-bg"></div>
//         <div className="hero-overlay"></div>
//         <div className="hero-content animate-up">
//           <div className="hero-badge">Trusted by 10,000+ Families</div>
//           <h1>Financing Your <br /> Future Today</h1>
//           <p>
//             Experience lightning-fast approvals, transparent processes, <br /> and interest rates starting as low as 8.50%.
//           </p>
//         </div>
//       </section>

//       {/* 2. ADVANCED EMI CALCULATOR */}
//       <section className="section">
//         <div className="container">
//           <div className="calc-wrapper animate-up delay-1">

//             {/* Left: Inputs */}
//             <div>
//               <h3 className="section-title" style={{ marginTop: 0, fontSize: '2rem' }}>EMI Calculator</h3>
//               <p style={{ color: '#64748b', marginBottom: '40px' }}>Adjust the sliders to plan your perfect repayment schedule.</p>

//               <div className="range-group">
//                 <div className="range-label">
//                   <span>Loan Amount</span>
//                   <span className="text-blue">{formatCurrency(amount)}</span>
//                 </div>
//                 <input type="range" min="1000000" max="100000000" step="500000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
//               </div>

//               <div className="range-group">
//                 <div className="range-label">
//                   <span>Interest Rate</span>
//                   <span className="text-blue">{rate}%</span>
//                 </div>
//                 <input type="range" min="6" max="18" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
//               </div>

//               <div className="range-group">
//                 <div className="range-label">
//                   <span>Tenure</span>
//                   <span className="text-blue">{tenure} Years</span>
//                 </div>
//                 <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
//               </div>
//             </div>

//             {/* Right: Visualization (Donut Chart) */}
//             <div className="chart-container">
//               {/* CSS Conic Gradient for Pie Chart */}
//               <div
//                 className="pie-chart"
//                 style={{
//                   background: `conic-gradient(
//                     #b8965a 0% ${(amount / totalPayment) * 100}%, 
//                     rgba(184, 150, 90, 0.15) ${(amount / totalPayment) * 100}% 100%
//                   )`
//                 }}
//               >
//                 <div className="chart-center-text">
//                   <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Monthly EMI</span>
//                   <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>{formatCurrency(emi)}</span>
//                 </div>
//               </div>

//               <div className="chart-legend">
//                 <div className="legend-item">
//                   <div className="dot" style={{ background: '#b8965a' }}></div>
//                   <span>Principal: {formatCurrency(amount)}</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="dot" style={{ background: 'rgba(184, 150, 90, 0.15)' }}></div>
//                   <span>Interest: {formatCurrency(totalInterest)}</span>
//                 </div>
//               </div>

//               <button
//                 className="cta-btn"
//                 style={{ width: '100%', marginTop: '30px', fontSize: '0.95rem' }}
//                 onClick={() => setSelectedService({ title: "Custom Loan Application", rate: `${rate}%` })}
//               >
//                 Apply for this Plan
//               </button>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* 3. SERVICES SECTION */}
//       <section className="section bg-white">
//         <div className="container">
//           <div className="text-center animate-up delay-2">
//             <h2 className="section-title">Tailored Financial Solutions</h2>
//             <p className="section-subtitle">Flexible funding options designed for homeowners, investors, and businesses.</p>
//           </div>

//           <div className="services-grid animate-up delay-3">
//             {loanServices.map((service) => (
//               <div key={service.id} className="service-card">
//                 <div className="service-icon">{service.icon}</div>
//                 <div className="service-rate-badge">{service.rate} ROI</div>
//                 <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#f5f0e8' }}>{service.title}</h3>
//                 <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>{service.desc}</p>

//                 <ul style={{ listStyle: 'none', padding: 0, margin: '25px 0', color: '#7a7670', fontSize: '0.95rem' }}>
//                   {service.features.map((feat, i) => (
//                     <li key={i} style={{ marginBottom: '10px' }}>✓ {feat}</li>
//                   ))}
//                 </ul>

//                 <button
//                   className="outline-btn"
//                   style={{ width: '100%' }}
//                   onClick={() => setSelectedService(service)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 4. WHY CHOOSE US */}
//       <section className="section">
//         <div className="container">
//           <div className="text-center">
//             <h2 className="section-title">Why Choose Us?</h2>
//             <p className="section-subtitle">We simplify the complex world of property finance.</p>
//           </div>
//           <div className="why-grid">
//             <div className="why-card">
//               <span className="why-icon">⚡</span>
//               <h3>Fast Approval</h3>
//               <p style={{ color: '#64748b' }}>Provisional sanction letters issued within 72 hours of application.</p>
//             </div>
//             <div className="why-card">
//               <span className="why-icon">📄</span>
//               <h3>Minimal Docs</h3>
//               <p style={{ color: '#64748b' }}>Paperless digital process with doorstep document collection.</p>
//             </div>
//             <div className="why-card">
//               <span className="why-icon">💎</span>
//               <h3>Transparency</h3>
//               <p style={{ color: '#64748b' }}>No hidden processing fees or surprise clauses in fine print.</p>
//             </div>
//             <div className="why-card">
//               <span className="why-icon">🤝</span>
//               <h3>Expert Guidance</h3>
//               <p style={{ color: '#64748b' }}>Dedicated relationship manager to guide you until disbursal.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 5. DOCUMENTS REQUIRED (INTERACTIVE) */}
//       <section className="section bg-white">
//         <div className="container">
//           <div className="text-center">
//             <h2 className="section-title">Checklist of Documents</h2>
//             <p className="section-subtitle">Switch tabs to see requirements for your profile.</p>
//           </div>

//           <div className="doc-tabs">
//             {Object.keys(documents).map((key) => (
//               <button
//                 key={key}
//                 className={`tab-btn ${activeDocTab === key ? "active" : ""}`}
//                 onClick={() => setActiveDocTab(key)}
//               >
//                 {key}
//               </button>
//             ))}
//           </div>

//           <div className="doc-list">
//             {documents[activeDocTab].map((doc, index) => (
//               <div key={index} className="doc-item">
//                 <span className="check-circle">✔</span>
//                 {doc}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 6. TESTIMONIALS */}
//       <section className="section">
//         <div className="container">
//           <div className="text-center">
//             <h2 className="section-title">Success Stories</h2>
//             <p className="section-subtitle">Don't just take our word for it.</p>
//           </div>

//           <div className="testi-grid" style={{ marginTop: '20px' }}>
//             {testimonials.map((t, i) => (
//               <div key={i} className="testi-card">
//                 <div className="quote-icon">“</div>
//                 <p className="testi-text">"{t.text}"</p>

//                 <div className="user-info">
//                   <img src={t.image} alt={t.name} className="user-img" />
//                   <div>
//                     <div style={{ fontWeight: '700', color: '#f5f0e8' }}>{t.name}</div>
//                     <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t.role}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* MODAL FORM */}
//       {selectedService && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button
//               style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#94a3b8' }}
//               onClick={() => setSelectedService(null)}
//             >
//               &times;
//             </button>

//             <h2 style={{ marginTop: 0, color: '#1e293b', fontSize: '1.8rem' }}>Quick Application</h2>
//             <p style={{ color: "#64748b", marginBottom: "30px", fontSize: '0.95rem' }}>
//               You are applying for: <strong style={{ color: '#b8965a' }}>{selectedService.title}</strong>
//               {selectedService.rate && <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '5px' }}>Applicable Rate: {selectedService.rate}</span>}
//             </p>

//             <form onSubmit={handleFormSubmit}>
//               <input type="text" name="name" value={formValues.name} onChange={handleInputChange} className="form-input" placeholder="Full Name" required />
//               <input type="email" name="email" value={formValues.email} onChange={handleInputChange} className="form-input" placeholder="Email Address" required />
//               <input type="tel" name="phone" value={formValues.phone} onChange={handleInputChange} className="form-input" placeholder="Phone Number" required />
//               <input type="number" name="amount" value={formValues.amount} onChange={handleInputChange} className="form-input" placeholder="Loan Amount Required (₹)" required />

//               {submitted ? (
//                 <div style={{ textAlign: 'center', padding: '20px', color: '#b8965a', fontWeight: 'bold' }}>
//                   ✓ Application submitted successfully!
//                 </div>
//               ) : (
//                 <button type="submit" className="cta-btn" style={{ width: "100%", marginTop: "15px", borderRadius: '12px' }} disabled={loading}>
//                   {loading ? "Processing..." : "Submit Request"}
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



=======
>>>>>>> e85f1ae (nilam2)
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

/* ================= STATIC DATA ================= */

const loanServices = [
  {
    id: 1,
    title: "Home Loans",
    rate: "8.50%",
    desc: "Buy your dream home with extended tenure and lowest interest rates.",
    icon: "🏠",
    features: ["Up to 30 Years Tenure", "90% Funding", "Zero Hidden Charges"],
  },
  {
    id: 2,
    title: "Loan Against Property",
    rate: "9.75%",
    desc: "Unlock the hidden value of your property for your personal needs.",
    icon: "🏢",
    features: ["High Loan Value", "Flexible Repayment", "Quick Approval"],
  },
  {
    id: 3,
    title: "Commercial Loans",
    rate: "10.25%",
    desc: "Expand your business with financing for shops and office spaces.",
    icon: "💼",
    features: ["Customized Solutions", "Balance Transfer", "Overdraft Facility"],
  },
  {
    id: 4,
    title: "Balance Transfer",
    rate: "8.60%",
    desc: "Transfer your existing loan to us and reduce your monthly EMI.",
    icon: "📉",
    features: ["Lower Interest Rate", "Top-up Loan Available", "Minimal Paperwork"],
  },
];

const documents = {
  Salaried: [
    "Identity Proof (Aadhar/PAN)",
    "Address Proof (Utility Bill)",
    "Last 3 Months Salary Slips",
    "Last 6 Months Bank Statement",
    "Form 16 (2 Years)",
  ],
  "Self-Employed": [
    "Identity Proof (Aadhar/PAN)",
    "Business Registration Proof",
    "ITR for last 3 Years",
    "Profit & Loss Statement",
    "Last 1 Year Bank Statement",
  ],
};

const testimonials = [
  {
    name: "Vikram Malhotra",
    role: "Business Owner",
    text: "The loan against property process was seamless. Funds were disbursed in just 4 days!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sneha Reddy",
    role: "Software Engineer",
    text: "Best interest rates in the market. The doorstep document collection saved me so much time.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Arjun Das",
    role: "Architect",
    text: "Transparent processing and very helpful staff. Highly recommended for home loans.",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
];

/* ================= COMPONENT ================= */

export default function PropertyFinancing() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const [activeDocTab, setActiveDocTab] = useState("Salaried");
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    amount: ""
  });

  useEffect(() => {
    const calculateEMI = () => {
      const r = rate / 12 / 100;
      const n = tenure * 12;
      const emiValue =
        (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPay = emiValue * n;
      const totInt = totalPay - amount;
      setEmi(Math.round(emiValue));
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(Math.round(totInt));
    };
    calculateEMI();
  }, [amount, rate, tenure]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: 10,
    }).format(val);
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/premium-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          packageName: selectedService?.title || "General Financing",
          message: `Required Amount: ₹${formValues.amount || "Not specified"}`,
          serviceType: "Property Financing"
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormValues({ name: "", email: "", phone: "", amount: "" });
        setTimeout(() => {
          setSelectedService(null);
          setSubmitted(false);
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting financing request:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;700&display=swap');

        * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        
        body { 
          margin: 0; 
<<<<<<< HEAD
          background-color: #f5f0ec;
          color: #4C3324; 
=======
          background-color: #f9f6f1;
          color: #31211b; 
>>>>>>> e85f1ae (nilam2)
        }
        
        .container { width: 90%; max-width: 1250px; margin: auto; }
        .section { padding: 100px 0; position: relative; }
        .bg-white { background: #fff; }
        .text-center { text-align: center; }
        .text-blue { color: #B2846B; }
        .bold { font-weight: 700; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        .section-title { 
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem; 
          margin-bottom: 20px; 
<<<<<<< HEAD
          color: #4C3324; 
=======
          color: #4c3324; 
>>>>>>> e85f1ae (nilam2)
          font-weight: 300;
          letter-spacing: -1px;
        }
        .section-subtitle { 
<<<<<<< HEAD
          color: #627B68; 
=======
          color: #6b5e58; 
>>>>>>> e85f1ae (nilam2)
          margin-bottom: 60px; 
          max-width: 600px; 
          margin-left: auto; 
          margin-right: auto; 
          line-height: 1.6;
          font-size: 1.1rem;
        }

        /* BUTTONS */
        .cta-btn {
          background: #B2846B;
          color: #fff;
          padding: 16px 40px;
          border-radius: 2px;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .cta-btn:hover { 
<<<<<<< HEAD
          background: #4C3324;
          transform: translateY(-3px); 
          box-shadow: 0 10px 20px rgba(76, 51, 36, 0.2); 
=======
          opacity: 0.9;
          transform: translateY(-3px); 
          box-shadow: 0 15px 30px rgba(98, 123, 104, 0.3); 
>>>>>>> e85f1ae (nilam2)
        }

        .outline-btn {
          background: transparent;
<<<<<<< HEAD
          border: 1px solid rgba(129, 155, 139, 0.5);
          color: #627B68;
          padding: 12px 30px;
          border-radius: 2px;
=======
          border: 1px solid rgba(129, 155, 139, 0.4);
          color: #627b68;
          padding: 12px 30px;
          border-radius: 4px;
>>>>>>> e85f1ae (nilam2)
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
        }
        .outline-btn:hover {
<<<<<<< HEAD
          border-color: #627B68;
          background: rgba(129, 155, 139, 0.08);
          color: #4C3324;
=======
          border-color: #4c3324;
          background: rgba(129, 155, 139, 0.05);
          color: #4c3324;
>>>>>>> e85f1ae (nilam2)
        }

        /* HERO SECTION */
        .finance-hero {
          position: relative;
          height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #4C3324;
          color: #E4CBB6;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80") center/cover;
          opacity: 0.25;
          transform: scale(1.05);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
<<<<<<< HEAD
          background: linear-gradient(to bottom, rgba(76, 51, 36, 0.3), #4C3324);
=======
          background: linear-gradient(to bottom, rgba(249, 246, 241, 0.3), #f9f6f1);
>>>>>>> e85f1ae (nilam2)
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 950px;
          padding: 20px;
        }

        .hero-badge {
          display: inline-block;
<<<<<<< HEAD
          background: rgba(228, 203, 182, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(228, 203, 182, 0.25);
          padding: 8px 24px;
          border-radius: 2px;
=======
          background: rgba(129, 155, 139, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(129, 155, 139, 0.2);
          padding: 8px 24px;
          border-radius: 4px;
>>>>>>> e85f1ae (nilam2)
          font-size: 0.8rem;
          margin-bottom: 25px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
<<<<<<< HEAD
          color: #E4CBB6;
=======
          color: #627b68;
>>>>>>> e85f1ae (nilam2)
        }

        .finance-hero h1 { 
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 8vw, 5.5rem); 
          margin-bottom: 25px; 
          line-height: 1.1; 
          font-weight: 300;
<<<<<<< HEAD
          color: #E4CBB6;
=======
          color: #4c3324;
>>>>>>> e85f1ae (nilam2)
          letter-spacing: -0.02em;
        }
        
        .finance-hero p { 
          font-size: 1.25rem; 
<<<<<<< HEAD
          color: #E4CBB6;
=======
          color: #6b5e58; 
>>>>>>> e85f1ae (nilam2)
          margin-bottom: 40px; 
          font-weight: 400; 
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.8;
        }

        /* CALCULATOR SECTION */
        .calc-wrapper {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 60px;
<<<<<<< HEAD
          background: #fff;
          padding: 60px;
          border-radius: 4px;
          box-shadow: 0 40px 80px rgba(76, 51, 36, 0.12);
          border: 1px solid rgba(129, 155, 139, 0.2);
=======
          background: #ffffff;
          padding: 60px;
          border-radius: 8px;
          box-shadow: 0 40px 80px rgba(76, 51, 36, 0.08);
          border: 1px solid rgba(228, 203, 182, 0.3);
>>>>>>> e85f1ae (nilam2)
          margin-top: -100px;
          position: relative;
          z-index: 10;
        }

        .range-group { margin-bottom: 40px; }
        .range-label { 
          display: flex; 
          justify-content: space-between; 
          font-weight: 500; 
          margin-bottom: 18px; 
          font-size: 1rem;
<<<<<<< HEAD
          color: #4C3324;
=======
          color: #4c3324;
>>>>>>> e85f1ae (nilam2)
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        input[type=range] {
          width: 100%;
          height: 4px;
<<<<<<< HEAD
          background: rgba(129, 155, 139, 0.2);
          border-radius: 2px;
=======
          background: rgba(129, 155, 139, 0.15);
          border-radius: 4px;
>>>>>>> e85f1ae (nilam2)
          outline: none;
          -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
<<<<<<< HEAD
          background: #819B8B;
          border: 2px solid #fff;
=======
          background: #627b68;
          border: 2px solid #ffffff;
>>>>>>> e85f1ae (nilam2)
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover { 
          transform: scale(1.2); 
<<<<<<< HEAD
          background: #627B68;
=======
          background: #4c3324;
>>>>>>> e85f1ae (nilam2)
        }

        /* DONUT CHART */
        .chart-container {
          background: rgba(129, 155, 139, 0.04);
          border-radius: 4px;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px solid rgba(129, 155, 139, 0.15);
        }
        
        .pie-chart {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          margin-bottom: 35px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pie-chart::after {
          content: '';
          position: absolute;
          width: 160px;
          height: 160px;
<<<<<<< HEAD
          background: #fff;
=======
          background: #ffffff;
>>>>>>> e85f1ae (nilam2)
          border-radius: 50%;
        }

        .chart-center-text {
          position: absolute;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }
        
        .chart-legend { 
          width: 100%; 
          display: flex; 
          flex-direction: column;
          gap: 15px;
          font-size: 0.9rem; 
          margin-top: 15px; 
<<<<<<< HEAD
          border-top: 1px solid rgba(129, 155, 139, 0.15); 
          padding-top: 25px; 
          color: #627B68;
=======
          border-top: 1px solid rgba(228, 203, 182, 0.2); 
          padding-top: 25px; 
          color: #6b5e58;
>>>>>>> e85f1ae (nilam2)
        }
        .legend-item { display: flex; align-items: center; gap: 12px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }

        /* SERVICES GRID */
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
        .service-card {
<<<<<<< HEAD
          background: #fff;
          padding: 50px 40px;
          border-radius: 4px;
          transition: all 0.4s ease;
          position: relative;
          border: 1px solid rgba(129, 155, 139, 0.2);
        }
        .service-card:hover { 
          transform: translateY(-8px); 
          border-color: rgba(129, 155, 139, 0.5); 
          box-shadow: 0 30px 60px rgba(76, 51, 36, 0.1);
=======
          background: #ffffff;
          padding: 50px 40px;
          border-radius: 8px;
          transition: all 0.4s ease;
          position: relative;
          border: 1px solid rgba(228, 203, 182, 0.3);
        }
        .service-card:hover { 
          transform: translateY(-8px); 
          border-color: rgba(129, 155, 139, 0.4); 
          box-shadow: 0 30px 60px rgba(76, 51, 36, 0.08);
>>>>>>> e85f1ae (nilam2)
        }
        
        .service-icon { 
          width: 64px; height: 64px; 
<<<<<<< HEAD
          background: rgba(129, 155, 139, 0.1); 
          color: #627B68; 
          border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          font-size: 1.8rem; margin-bottom: 30px; 
          border: 1px solid rgba(129, 155, 139, 0.25);
=======
          background: rgba(129, 155, 139, 0.08); 
          color: #819b8b; 
          border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          font-size: 1.8rem; margin-bottom: 30px; 
          border: 1px solid rgba(129, 155, 139, 0.2);
>>>>>>> e85f1ae (nilam2)
        }

        .service-rate-badge {
          position: absolute; top: 40px; right: 40px;
<<<<<<< HEAD
          background: rgba(178, 132, 107, 0.12); color: #B2846B;
          padding: 6px 16px; border-radius: 2px;
          font-weight: 700; font-size: 0.8rem;
          border: 1px solid rgba(178, 132, 107, 0.3);
=======
          background: rgba(129, 155, 139, 0.1); color: #627b68;
          padding: 6px 16px; border-radius: 4px;
          font-weight: 700; font-size: 0.8rem;
          border: 1px solid rgba(129, 155, 139, 0.2);
>>>>>>> e85f1ae (nilam2)
          letter-spacing: 0.05em;
        }

        /* WHY CHOOSE US */
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; }
        .why-card {
<<<<<<< HEAD
          background: #fff; padding: 50px 30px; border-radius: 4px; text-align: center;
          border: 1px solid rgba(129, 155, 139, 0.2); transition: 0.4s ease;
        }
        .why-card:hover { 
          transform: translateY(-5px); 
          border-color: rgba(129, 155, 139, 0.45);
=======
          background: #ffffff; padding: 50px 30px; border-radius: 8px; text-align: center;
          border: 1px solid rgba(228, 203, 182, 0.3); transition: 0.4s ease;
        }
        .why-card:hover { 
          transform: translateY(-5px); 
          border-color: rgba(129, 155, 139, 0.4);
>>>>>>> e85f1ae (nilam2)
        }
        .why-icon { font-size: 2.8rem; margin-bottom: 25px; display: block; opacity: 0.9; }

        /* DOCUMENT TABS */
        .doc-tabs { display: flex; justify-content: center; gap: 20px; margin-bottom: 50px; }
        .tab-btn {
<<<<<<< HEAD
          padding: 14px 40px; background: transparent; border: 1px solid rgba(129, 155, 139, 0.3);
          border-radius: 2px; cursor: pointer; font-weight: 600; color: #627B68; transition: 0.3s;
          font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.15em;
        }
        .tab-btn.active { 
          background: #819B8B; 
          color: #fff; 
          border-color: #819B8B; 
          box-shadow: 10px 10px 0px rgba(129, 155, 139, 0.12); 
        }
        
        .doc-list {
          background: #fff; padding: 50px; border-radius: 4px;
          max-width: 850px; margin: auto;
          border: 1px solid rgba(129, 155, 139, 0.2);
=======
          padding: 14px 40px; background: transparent; border: 1px solid rgba(228, 203, 182, 0.5);
          border-radius: 4px; cursor: pointer; font-weight: 600; color: #6b5e58; transition: 0.3s;
          font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.15em;
        }
        .tab-btn.active { 
          background: #627b68; 
          color: #ffffff; 
          border-color: #627b68; 
          box-shadow: 10px 10px 0px rgba(98, 123, 104, 0.1); 
        }
        
        .doc-list {
          background: #ffffff; padding: 50px; border-radius: 8px;
          max-width: 850px; margin: auto;
          border: 1px solid rgba(228, 203, 182, 0.3);
>>>>>>> e85f1ae (nilam2)
          position: relative;
        }
        .doc-item {
          display: flex; align-items: center; gap: 20px; padding: 22px 0;
<<<<<<< HEAD
          border-bottom: 1px solid rgba(129, 155, 139, 0.12); color: #627B68; font-weight: 400; font-size: 1.1rem;
        }
        .doc-item:last-child { border-bottom: none; }
        .check-circle { 
          width: 24px; height: 24px; background: rgba(129, 155, 139, 0.12); color: #627B68; 
=======
          border-bottom: 1px solid rgba(228, 203, 182, 0.2); color: #3a2e28; font-weight: 400; font-size: 1.1rem;
        }
        .doc-item:last-child { border-bottom: none; }
        .check-circle { 
          width: 24px; height: 24px; background: rgba(129, 155, 139, 0.1); color: #627b68; 
>>>>>>> e85f1ae (nilam2)
          border-radius: 50%; display: flex; align-items: center; justify-content: center; 
          font-size: 0.8rem; flex-shrink: 0;
        }

        /* TESTIMONIALS */
        .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
        .testi-card {
<<<<<<< HEAD
          background: #fff; padding: 50px; border-radius: 4px; position: relative;
          border: 1px solid rgba(129, 155, 139, 0.15); 
        }
        .testi-card:hover { border-color: rgba(129, 155, 139, 0.4); }
        .user-info { display: flex; align-items: center; gap: 20px; margin-top: 30px; }
        .user-img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(129, 155, 139, 0.3); }
        .quote-icon { font-size: 6rem; color: rgba(178, 132, 107, 0.07); position: absolute; top: 10px; right: 40px; z-index: 0; pointer-events: none; }
        .testi-text { position: relative; z-index: 1; font-size: 1.1rem; line-height: 1.8; color: #627B68; font-style: italic; }
=======
          background: #ffffff; padding: 50px; border-radius: 8px; position: relative;
          border: 1px solid rgba(228, 203, 182, 0.3); 
        }
        .testi-card:hover { border-color: rgba(129, 155, 139, 0.4); }
        .user-info { display: flex; align-items: center; gap: 20px; margin-top: 30px; }
        .user-img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(228, 203, 182, 0.3); }
        .quote-icon { font-size: 6rem; color: rgba(129, 155, 139, 0.05); position: absolute; top: 10px; right: 40px; z-index: 0; pointer-events: none; }
        .testi-text { position: relative; z-index: 1; font-size: 1.1rem; line-height: 1.8; color: #6b5e58; font-style: italic; }
>>>>>>> e85f1ae (nilam2)

        /* FLOATING CTA */
        .floating-btn {
          position: fixed; bottom: 40px; right: 40px;
<<<<<<< HEAD
          background: #B2846B; color: #fff; padding: 18px 32px;
          border-radius: 2px; font-weight: 700; font-size: 0.9rem;
          box-shadow: 0 15px 35px rgba(178, 132, 107, 0.3);
          z-index: 900; cursor: pointer; display: flex; align-items: center; gap: 15px;
          transition: all 0.4s ease; border: none; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .floating-btn:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(178, 132, 107, 0.4); background: #4C3324; }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(76, 51, 36, 0.88);
          backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000;
        }
        .modal-content {
          background: #fff; padding: 60px 50px; border-radius: 4px; width: 95%; max-width: 550px;
          position: relative; animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(129, 155, 139, 0.2);
          box-shadow: 0 40px 100px rgba(76, 51, 36, 0.25);
        }
        .form-input { 
          width: 100%; padding: 18px; background: rgba(129, 155, 139, 0.04); border: 1px solid rgba(129, 155, 139, 0.2); 
          border-radius: 2px; margin-bottom: 20px; outline: none; transition: 0.3s; 
          font-size: 1rem; color: #4C3324;
        }
        .form-input:focus { 
          border-color: #819B8B; 
          background: rgba(129, 155, 139, 0.08); 
          box-shadow: 0 0 0 1px #819B8B; 
=======
          background: linear-gradient(135deg, #627b68 0%, #4c3324 100%); color: #ffffff; padding: 18px 32px;
          border-radius: 4px; font-weight: 700; font-size: 0.9rem;
          box-shadow: 0 15px 35px rgba(98, 123, 104, 0.2);
          z-index: 900; cursor: pointer; display: flex; align-items: center; gap: 15px;
          transition: all 0.4s ease; border: none; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .floating-btn:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(98, 123, 104, 0.4); }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(76, 51, 36, 0.92);
          backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000;
        }
        .modal-content {
          background: #ffffff; padding: 60px 50px; border-radius: 8px; width: 95%; max-width: 550px;
          position: relative; animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(228, 203, 182, 0.3);
          box-shadow: 0 40px 100px rgba(76, 51, 36, 0.15);
        }
        .form-input { 
          width: 100%; padding: 18px; background: #fdfaf8; border: 1px solid rgba(228, 203, 182, 0.4); 
          border-radius: 4px; margin-bottom: 20px; outline: none; transition: 0.3s; 
          font-size: 1rem; color: #3a2e28;
        }
        .form-input:focus { 
          border-color: #627b68; 
          background: #ffffff; 
          box-shadow: 0 0 0 1px #627b68; 
>>>>>>> e85f1ae (nilam2)
        }
        
        @media(max-width: 900px) {
          .calc-wrapper { grid-template-columns: 1fr; padding: 40px 30px; }
          .finance-hero h1 { font-size: 3.5rem; }
          .section { padding: 60px 0; }
        }
      `}</style>

      {/* FLOATING CTA */}
      <button className="floating-btn" onClick={() => setSelectedService({ title: "Callback Request" })}>
        <span style={{ fontSize: '1.4rem' }}>📞</span> Get a Call Back
      </button>

      {/* 1. HERO SECTION */}
      <section className="finance-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-up">
          <div className="hero-badge">Trusted by 10,000+ Families</div>
          <h1>Financing Your <br /> Future Today</h1>
          <p>
            Experience lightning-fast approvals, transparent processes, <br /> and interest rates starting as low as 8.50%.
          </p>
        </div>
      </section>

      {/* 2. ADVANCED EMI CALCULATOR */}
      <section className="section">
        <div className="container">
          <div className="calc-wrapper animate-up delay-1">

            <div>
              <h3 className="section-title" style={{ marginTop: 0, fontSize: '2rem' }}>EMI Calculator</h3>
              <p style={{ color: '#627B68', marginBottom: '40px' }}>Adjust the sliders to plan your perfect repayment schedule.</p>

              <div className="range-group">
                <div className="range-label">
                  <span>Loan Amount</span>
                  <span className="text-blue">{formatCurrency(amount)}</span>
                </div>
                <input type="range" min="1000000" max="100000000" step="500000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </div>

              <div className="range-group">
                <div className="range-label">
                  <span>Interest Rate</span>
                  <span className="text-blue">{rate}%</span>
                </div>
                <input type="range" min="6" max="18" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>

              <div className="range-group">
                <div className="range-label">
                  <span>Tenure</span>
                  <span className="text-blue">{tenure} Years</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
              </div>
            </div>

            <div className="chart-container">
              <div
                className="pie-chart"
                style={{
                  background: `conic-gradient(
                    #B2846B 0% ${(amount / totalPayment) * 100}%, 
                    rgba(129, 155, 139, 0.2) ${(amount / totalPayment) * 100}% 100%
                  )`
                }}
              >
                <div className="chart-center-text">
                  <span style={{ fontSize: '0.85rem', color: '#627B68', fontWeight: '600' }}>Monthly EMI</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#4C3324' }}>{formatCurrency(emi)}</span>
                </div>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <div className="dot" style={{ background: '#B2846B' }}></div>
                  <span>Principal: {formatCurrency(amount)}</span>
                </div>
                <div className="legend-item">
                  <div className="dot" style={{ background: 'rgba(129, 155, 139, 0.3)' }}></div>
                  <span>Interest: {formatCurrency(totalInterest)}</span>
                </div>
              </div>

              <button
                className="cta-btn"
                style={{ width: '100%', marginTop: '30px', fontSize: '0.95rem' }}
                onClick={() => setSelectedService({ title: "Custom Loan Application", rate: `${rate}%` })}
              >
                Apply for this Plan
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center animate-up delay-2">
            <h2 className="section-title">Tailored Financial Solutions</h2>
            <p className="section-subtitle">Flexible funding options designed for homeowners, investors, and businesses.</p>
          </div>

          <div className="services-grid animate-up delay-3">
            {loanServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <div className="service-rate-badge">{service.rate} ROI</div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#4C3324' }}>{service.title}</h3>
                <p style={{ color: '#627B68', fontSize: '1rem', lineHeight: '1.6' }}>{service.desc}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '25px 0', color: '#819B8B', fontSize: '0.95rem' }}>
                  {service.features.map((feat, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>✓ {feat}</li>
                  ))}
                </ul>

                <button
                  className="outline-btn"
                  style={{ width: '100%' }}
                  onClick={() => setSelectedService(service)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">We simplify the complex world of property finance.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <span className="why-icon">⚡</span>
              <h3 style={{ color: '#4C3324' }}>Fast Approval</h3>
              <p style={{ color: '#627B68' }}>Provisional sanction letters issued within 72 hours of application.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">📄</span>
              <h3 style={{ color: '#4C3324' }}>Minimal Docs</h3>
              <p style={{ color: '#627B68' }}>Paperless digital process with doorstep document collection.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">💎</span>
              <h3 style={{ color: '#4C3324' }}>Transparency</h3>
              <p style={{ color: '#627B68' }}>No hidden processing fees or surprise clauses in fine print.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">🤝</span>
              <h3 style={{ color: '#4C3324' }}>Expert Guidance</h3>
              <p style={{ color: '#627B68' }}>Dedicated relationship manager to guide you until disbursal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOCUMENTS REQUIRED (INTERACTIVE) */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Checklist of Documents</h2>
            <p className="section-subtitle">Switch tabs to see requirements for your profile.</p>
          </div>

          <div className="doc-tabs">
            {Object.keys(documents).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activeDocTab === key ? "active" : ""}`}
                onClick={() => setActiveDocTab(key)}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="doc-list">
            {documents[activeDocTab].map((doc, index) => (
              <div key={index} className="doc-item">
                <span className="check-circle">✔</span>
                {doc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Don't just take our word for it.</p>
          </div>

          <div className="testi-grid" style={{ marginTop: '20px' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="quote-icon">"</div>
                <p className="testi-text">"{t.text}"</p>

                <div className="user-info">
                  <img src={t.image} alt={t.name} className="user-img" />
                  <div>
                    <div style={{ fontWeight: '700', color: '#4C3324' }}>{t.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#819B8B' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL FORM */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#819B8B' }}
              onClick={() => setSelectedService(null)}
            >
              &times;
            </button>

            <h2 style={{ marginTop: 0, color: '#4C3324', fontSize: '1.8rem' }}>Quick Application</h2>
            <p style={{ color: "#627B68", marginBottom: "30px", fontSize: '0.95rem' }}>
              You are applying for: <strong style={{ color: '#B2846B' }}>{selectedService.title}</strong>
              {selectedService.rate && <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '5px' }}>Applicable Rate: {selectedService.rate}</span>}
            </p>

            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" value={formValues.name} onChange={handleInputChange} className="form-input" placeholder="Full Name" required />
              <input type="email" name="email" value={formValues.email} onChange={handleInputChange} className="form-input" placeholder="Email Address" required />
              <input type="tel" name="phone" value={formValues.phone} onChange={handleInputChange} className="form-input" placeholder="Phone Number" required />
              <input type="number" name="amount" value={formValues.amount} onChange={handleInputChange} className="form-input" placeholder="Loan Amount Required (₹)" required />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#819B8B', fontWeight: 'bold' }}>
                  ✓ Application submitted successfully!
                </div>
              ) : (
                <button type="submit" className="cta-btn" style={{ width: "100%", marginTop: "15px", borderRadius: '12px' }} disabled={loading}>
                  {loading ? "Processing..." : "Submit Request"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
