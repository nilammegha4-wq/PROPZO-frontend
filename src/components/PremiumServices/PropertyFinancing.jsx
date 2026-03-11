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
  // Calculator State
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // UI State
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

  // EMI Calculation Logic
  useEffect(() => {
    const calculateEMI = () => {
      const r = rate / 12 / 100; // monthly interest
      const n = tenure * 12; // months
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

  // Formatters
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: 10,
    }).format(val);
  };

  // Handlers
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
        /* GLOBAL & UTILS */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; font-family: 'Outfit', sans-serif; }
        
        body { 
          margin: 0; 
          background-color: #f8fafc;
          background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
          background-size: 30px 30px;
          color: #334155; 
        }
        
        .container { width: 90%; max-width: 1250px; margin: auto; }
        .section { padding: 100px 0; position: relative; }
        .bg-white { background: white; }
        .text-center { text-align: center; }
        .text-blue { color: #4f46e5; }
        .bold { font-weight: 700; }

        /* ANIMATIONS */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        /* TYPOGRAPHY */
        .section-title { 
          font-size: 2.8rem; 
          margin-bottom: 15px; 
          color: #0f172a; 
          font-weight: 800;
          letter-spacing: -1px;
        }
        .section-subtitle { 
          color: #64748b; 
          margin-bottom: 60px; 
          max-width: 600px; 
          margin-left: auto; 
          margin-right: auto; 
          line-height: 1.6;
          font-size: 1.1rem;
        }

        /* BUTTONS */
        .cta-btn {
          background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
          color: white;
          padding: 16px 40px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }
        .cta-btn:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 20px 35px -5px rgba(79, 70, 229, 0.5); 
        }

        .outline-btn {
          background: transparent;
          border: 2px solid #e2e8f0;
          color: #4f46e5;
          padding: 12px 30px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .outline-btn:hover {
          border-color: #4f46e5;
          background: #eef2ff;
        }

        /* HERO SECTION */
        .finance-hero {
          position: relative;
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0f172a;
          color: white;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80") center/cover;
          opacity: 0.4;
          transform: scale(1.1);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.3), #0f172a);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 20px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.9rem;
          margin-bottom: 25px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .finance-hero h1 { 
          font-size: 4.5rem; 
          margin-bottom: 25px; 
          line-height: 1.1; 
          font-weight: 800;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .finance-hero p { 
          font-size: 1.3rem; 
          color: #cbd5e1; 
          margin-bottom: 40px; 
          font-weight: 300; 
        }

        /* CALCULATOR SECTION */
        .calc-wrapper {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 50px;
          background: white;
          padding: 50px;
          border-radius: 30px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid #f1f5f9;
          margin-top: -120px;
          position: relative;
          z-index: 10;
        }

        .range-group { margin-bottom: 35px; }
        .range-label { 
          display: flex; 
          justify-content: space-between; 
          font-weight: 600; 
          margin-bottom: 15px; 
          font-size: 1.1rem;
          color: #1e293b;
        }
        
        input[type=range] {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 10px;
          outline: none;
          -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 28px;
          height: 28px;
          background: #4f46e5;
          border: 4px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
          transition: 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }

        /* DONUT CHART */
        .chart-container {
          background: #f8fafc;
          border-radius: 24px;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px solid #e2e8f0;
        }
        
        .pie-chart {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          margin-bottom: 30px;
          position: relative;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Inner White Circle for Donut Effect */
        .pie-chart::after {
          content: '';
          position: absolute;
          width: 160px;
          height: 160px;
          background: #f8fafc;
          border-radius: 50%;
          box-shadow: inset 0 5px 15px rgba(0,0,0,0.05);
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
          justify-content: space-between; 
          font-size: 0.9rem; 
          margin-top: 15px; 
          border-top: 1px solid #e2e8f0; 
          padding-top: 20px; 
          color: #64748b;
        }
        .legend-item { display: flex; align-items: center; gap: 8px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }

        /* SERVICES GRID */
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .service-card {
          background: white;
          padding: 40px 30px;
          border-radius: 24px;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .service-card:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.15); 
          border-color: #4f46e5; 
        }
        
        .service-icon { 
          width: 70px; height: 70px; 
          background: linear-gradient(135deg, #e0e7ff 0%, #fae8ff 100%); 
          color: #4f46e5; 
          border-radius: 20px; 
          display: flex; align-items: center; justify-content: center; 
          font-size: 2rem; margin-bottom: 25px; 
        }

        .service-rate-badge {
          position: absolute; top: 30px; right: 30px;
          background: #ecfdf5; color: #059669;
          padding: 6px 14px; border-radius: 30px;
          font-weight: 700; font-size: 0.85rem;
          border: 1px solid #a7f3d0;
        }

        /* WHY CHOOSE US */
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
        .why-card {
          background: white; padding: 40px 30px; border-radius: 20px; text-align: center;
          border: 1px solid #f1f5f9; transition: 0.3s;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.03);
        }
        .why-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }
        .why-icon { font-size: 3rem; margin-bottom: 20px; display: block; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }

        /* DOCUMENT TABS */
        .doc-tabs { display: flex; justify-content: center; gap: 15px; margin-bottom: 40px; }
        .tab-btn {
          padding: 14px 35px; background: white; border: 1px solid #e2e8f0;
          border-radius: 50px; cursor: pointer; font-weight: 600; color: #64748b; transition: 0.3s;
          font-size: 1rem;
        }
        .tab-btn.active { 
          background: #0f172a; 
          color: white; 
          border-color: #0f172a; 
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.2); 
        }
        
        .doc-list {
          background: white; padding: 40px; border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05); max-width: 800px; margin: auto;
          border: 1px solid #f1f5f9;
        }
        .doc-item {
          display: flex; align-items: center; gap: 20px; padding: 18px;
          border-bottom: 1px dashed #e2e8f0; color: #334155; font-weight: 500; font-size: 1.1rem;
        }
        .doc-item:last-child { border-bottom: none; }
        .check-circle { 
          width: 28px; height: 28px; background: #dcfce7; color: #16a34a; 
          border-radius: 50%; display: flex; align-items: center; justify-content: center; 
          font-size: 0.9rem; flex-shrink: 0;
        }

        /* TESTIMONIALS */
        .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .testi-card {
          background: white; padding: 40px; border-radius: 24px; position: relative;
          border: 1px solid #f1f5f9; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
        }
        .user-info { display: flex; align-items: center; gap: 15px; margin-top: 25px; }
        .user-img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
        .quote-icon { font-size: 5rem; color: #f1f5f9; position: absolute; top: 10px; right: 30px; z-index: 0; }
        .testi-text { position: relative; z-index: 1; font-size: 1.1rem; line-height: 1.6; color: #475569; font-style: italic; }

        /* FLOATING CTA */
        .floating-btn {
          position: fixed; bottom: 40px; right: 40px;
          background: #22c55e; color: white; padding: 16px 28px;
          border-radius: 50px; font-weight: 600; font-size: 1rem;
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
          z-index: 900; cursor: pointer; display: flex; align-items: center; gap: 12px;
          transition: 0.3s; border: none;
        }
        .floating-btn:hover { transform: scale(1.05) translateY(-3px); box-shadow: 0 15px 35px rgba(34, 197, 94, 0.5); }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000;
        }
        .modal-content {
          background: white; padding: 50px; border-radius: 30px; width: 90%; max-width: 500px;
          position: relative; animation: fadeInUp 0.4s ease-out; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .form-input { 
          width: 100%; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; 
          border-radius: 12px; margin-bottom: 15px; outline: none; transition: 0.3s; 
          font-size: 1rem; color: #334155;
        }
        .form-input:focus { border-color: #4f46e5; background: white; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
        
        /* RESPONSIVE */
        @media(max-width: 900px) {
          .calc-wrapper { grid-template-columns: 1fr; padding: 30px; }
          .finance-hero h1 { font-size: 3rem; }
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

            {/* Left: Inputs */}
            <div>
              <h3 className="section-title" style={{ marginTop: 0, fontSize: '2rem' }}>EMI Calculator</h3>
              <p style={{ color: '#64748b', marginBottom: '40px' }}>Adjust the sliders to plan your perfect repayment schedule.</p>

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

            {/* Right: Visualization (Donut Chart) */}
            <div className="chart-container">
              {/* CSS Conic Gradient for Pie Chart */}
              <div
                className="pie-chart"
                style={{
                  background: `conic-gradient(
                    #4f46e5 0% ${(amount / totalPayment) * 100}%, 
                    #c7d2fe ${(amount / totalPayment) * 100}% 100%
                  )`
                }}
              >
                <div className="chart-center-text">
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Monthly EMI</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>{formatCurrency(emi)}</span>
                </div>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <div className="dot" style={{ background: '#4f46e5' }}></div>
                  <span>Principal: {formatCurrency(amount)}</span>
                </div>
                <div className="legend-item">
                  <div className="dot" style={{ background: '#c7d2fe' }}></div>
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
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#0f172a' }}>{service.title}</h3>
                <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>{service.desc}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '25px 0', color: '#475569', fontSize: '0.95rem' }}>
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
              <h3>Fast Approval</h3>
              <p style={{ color: '#64748b' }}>Provisional sanction letters issued within 72 hours of application.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">📄</span>
              <h3>Minimal Docs</h3>
              <p style={{ color: '#64748b' }}>Paperless digital process with doorstep document collection.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">💎</span>
              <h3>Transparency</h3>
              <p style={{ color: '#64748b' }}>No hidden processing fees or surprise clauses in fine print.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">🤝</span>
              <h3>Expert Guidance</h3>
              <p style={{ color: '#64748b' }}>Dedicated relationship manager to guide you until disbursal.</p>
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
                <div className="quote-icon">“</div>
                <p className="testi-text">"{t.text}"</p>

                <div className="user-info">
                  <img src={t.image} alt={t.name} className="user-img" />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t.role}</div>
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
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#94a3b8' }}
              onClick={() => setSelectedService(null)}
            >
              &times;
            </button>

            <h2 style={{ marginTop: 0, color: '#1e293b', fontSize: '1.8rem' }}>Quick Application</h2>
            <p style={{ color: "#64748b", marginBottom: "30px", fontSize: '0.95rem' }}>
              You are applying for: <strong style={{ color: '#4f46e5' }}>{selectedService.title}</strong>
              {selectedService.rate && <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '5px' }}>Applicable Rate: {selectedService.rate}</span>}
            </p>

            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" value={formValues.name} onChange={handleInputChange} className="form-input" placeholder="Full Name" required />
              <input type="email" name="email" value={formValues.email} onChange={handleInputChange} className="form-input" placeholder="Email Address" required />
              <input type="tel" name="phone" value={formValues.phone} onChange={handleInputChange} className="form-input" placeholder="Phone Number" required />
              <input type="number" name="amount" value={formValues.amount} onChange={handleInputChange} className="form-input" placeholder="Loan Amount Required (₹)" required />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#22c55e', fontWeight: 'bold' }}>
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