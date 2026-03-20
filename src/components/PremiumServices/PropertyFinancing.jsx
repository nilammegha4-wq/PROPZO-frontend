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
        const data = await response.json();
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting financing request:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="financing-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        :root {
          --primary: #819B8B;
          --primary-dark: #627B68;
          --secondary: #4C3324;
          --accent: #B2846B;
          --dark: #4C3324;
          --light: #F5F0E8;
          --gray: #6B5E58;
          --white: #ffffff;
          --radius: 12px;
          --shadow-sm: 0 4px 6px -1px rgba(76, 51, 36, 0.05);
          --shadow-lg: 0 20px 25px -5px rgba(76, 51, 36, 0.1), 0 8px 10px -6px rgba(76, 51, 36, 0.05);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        body { background: var(--light); color: var(--dark); line-height: 1.6; }

        .container { max-width: 1250px; margin: 0 auto; padding: 0 24px; }
        .section { padding: 100px 0; position: relative; }
        .bg-white { background: var(--white); }
        .text-center { text-align: center; }
        .text-accent { color: var(--accent); }
        
        h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; font-weight: 300; color: var(--secondary); line-height: 1.1; }

        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none;
          transition: 0.3s; cursor: pointer; border: none; font-size: 1rem; text-transform: uppercase;
          letter-spacing: 1px;
        }
        .btn-accent { background: var(--accent); color: white; }
        .btn-accent:hover { background: var(--secondary); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(178, 132, 107, 0.2); }
        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover { background: var(--primary-dark); }
        .btn-outline { background: transparent; border: 1px solid var(--primary); color: var(--primary-dark); }
        .btn-outline:hover { background: var(--primary); color: white; }

        /* HERO SECTION */
        .finance-hero {
          position: relative;
          height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--secondary);
          color: white;
          text-align: center;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80") center/cover;
          opacity: 0.2;
          transform: scale(1.05);
          transition: 10s transform linear;
        }
        .finance-hero:hover .hero-bg { transform: scale(1.1); }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(76, 51, 36, 0.3), var(--secondary));
        }

        .hero-content { position: relative; z-index: 2; max-width: 900px; padding: 0 24px; }
        
        .hero-badge {
          display: inline-block;
          background: rgba(178, 132, 107, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(178, 132, 107, 0.3);
          padding: 8px 24px;
          border-radius: 50px;
          font-size: 0.8rem;
          margin-bottom: 30px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #E4CBB6;
          font-weight: 600;
        }

        .finance-hero h1 { 
          font-size: clamp(3.5rem, 8vw, 5.5rem); 
          margin-bottom: 25px; 
          color: #E4CBB6;
        }

        .finance-hero p { 
          font-size: 1.3rem; 
          color: #E4CBB6;
          margin-bottom: 40px; 
          font-weight: 300; 
          max-width: 650px;
          margin: 0 auto 40px;
          opacity: 0.9;
        }

        /* CALCULATOR SECTION */
        .calc-wrapper {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 60px;
          background: white;
          padding: 60px;
          border-radius: 24px;
          box-shadow: 0 30px 60px rgba(76, 51, 36, 0.1);
          border: 1px solid rgba(228, 203, 182, 0.3);
          margin-top: -100px;
          position: relative;
          z-index: 10;
        }

        .calc-title { font-size: 2.5rem; margin-bottom: 10px; }
        .calc-subtitle { color: var(--gray); margin-bottom: 45px; }

        .range-group { margin-bottom: 40px; }
        .range-label { 
          display: flex; 
          justify-content: space-between; 
          font-weight: 600; 
          margin-bottom: 18px; 
          font-size: 1rem;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        
        input[type=range] {
          width: 100%;
          height: 5px;
          background: #EEF2EF;
          border-radius: 10px;
          outline: none;
          -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: var(--primary);
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(129, 155, 139, 0.3);
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.1); background: var(--primary-dark); }

        /* CHART CONTAINER */
        .chart-container {
          background: #F9FDFB;
          border-radius: 20px;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px solid rgba(129, 155, 139, 0.1);
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
          box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
        }

        .pie-chart::after {
          content: '';
          position: absolute;
          width: 170px;
          height: 170px;
          background: #F9FDFB;
          border-radius: 50%;
        }

        .chart-center-text {
          position: absolute;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }
        .chart-emi-label { font-size: 0.85rem; color: var(--gray); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .chart-emi-amount { font-size: 2rem; font-weight: 400; color: var(--secondary); font-family: 'Cormorant Garamond', serif; }
        
        .chart-legend { 
          width: 100%; 
          display: flex; 
          flex-direction: column;
          gap: 15px;
          font-size: 0.95rem; 
          margin-top: 15px; 
          border-top: 1px solid rgba(129, 155, 139, 0.1); 
          padding-top: 25px; 
          color: var(--gray);
        }
        .legend-item { display: flex; align-items: center; gap: 12px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }

        /* SERVICES SECTION */
        .section-header { text-align: center; margin-bottom: 80px; max-width: 700px; margin: 0 auto 80px; }
        .section-header h2 { font-size: 3.5rem; margin-bottom: 15px; }
        .section-header p { color: var(--gray); font-size: 1.1rem; }

        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
        .service-card {
          background: white;
          padding: 50px 40px;
          border-radius: 20px;
          transition: 0.4s ease;
          position: relative;
          border: 1px solid rgba(228, 203, 182, 0.2);
          overflow: hidden;
        }
        .service-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); border-color: var(--primary); }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: var(--primary);
          transform: scaleX(0); transition: 0.4s; transform-origin: left;
        }
        .service-card:hover::before { transform: scaleX(1); }
        
        .service-icon { 
          width: 70px; height: 70px; 
          background: #F9FDFB; color: var(--primary); 
          border-radius: 15px; 
          display: flex; align-items: center; justify-content: center; 
          font-size: 2rem; margin-bottom: 30px; 
          border: 1px solid rgba(129, 155, 139, 0.1);
          transition: 0.3s;
        }
        .service-card:hover .service-icon { background: var(--primary); color: white; transform: rotate(-5deg); }

        .service-rate-badge {
          position: absolute; top: 50px; right: 40px;
          background: rgba(129, 155, 139, 0.1); color: var(--primary-dark);
          padding: 6px 16px; border-radius: 50px;
          font-weight: 700; font-size: 0.85rem;
          border: 1px solid rgba(129, 155, 139, 0.2);
        }

        .service-card h3 { font-size: 1.8rem; margin-bottom: 15px; color: var(--secondary); font-weight: 400; }
        .service-card p { color: var(--gray); line-height: 1.7; margin-bottom: 25px; }
        
        .features-list { list-style: none; margin-bottom: 35px; }
        .features-list li { margin-bottom: 12px; color: var(--gray); font-size: 0.95rem; display: flex; align-items: center; gap: 10px; }
        .features-list li::before { content: '✓'; color: var(--primary); font-weight: 900; }

        /* WHY CHOOSE US */
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; }
        .why-card {
          background: white; padding: 50px 40px; border-radius: 24px; text-align: center;
          border: 1px solid rgba(228, 203, 182, 0.2); transition: 0.4s ease;
        }
        .why-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: var(--shadow-sm); }
        .why-icon { font-size: 3rem; margin-bottom: 25px; display: block; }
        .why-card h3 { font-size: 1.8rem; margin-bottom: 15px; color: var(--secondary); font-weight: 400; }
        .why-card p { color: var(--gray); line-height: 1.7; }

        /* DOCUMENT CHECKLIST */
        .doc-tabs { display: flex; justify-content: center; gap: 20px; margin-bottom: 50px; }
        .tab-btn {
          padding: 14px 35px; background: transparent; border: 1px solid rgba(129, 155, 139, 0.2);
          border-radius: 50px; cursor: pointer; font-weight: 600; color: var(--gray); transition: 0.3s;
          font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;
        }
        .tab-btn.active { 
          background: var(--primary); 
          color: white; 
          border-color: var(--primary); 
          box-shadow: 0 10px 20px rgba(129, 155, 139, 0.2); 
        }
        
        .doc-list {
          background: white; padding: 50px; border-radius: 24px;
          max-width: 900px; margin: auto;
          border: 1px solid rgba(228, 203, 182, 0.2);
          box-shadow: var(--shadow-sm);
        }
        .doc-item {
          display: flex; align-items: center; gap: 20px; padding: 22px 0;
          border-bottom: 1px solid rgba(228, 203, 182, 0.1); color: var(--secondary); font-weight: 400; font-size: 1.1rem;
        }
        .doc-item:last-child { border-bottom: none; }
        .check-circle { 
          width: 28px; height: 28px; background: #F9FDFB; color: var(--primary); 
          border-radius: 50%; display: flex; align-items: center; justify-content: center; 
          font-size: 0.9rem; flex-shrink: 0; border: 1px solid rgba(129, 155, 139, 0.2);
        }

        /* TESTIMONIALS */
        .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; }
        .testi-card {
          background: white; padding: 50px; border-radius: 24px; position: relative;
          border: 1px solid rgba(228, 203, 182, 0.15); box-shadow: var(--shadow-sm);
        }
        .quote-icon { font-size: 6rem; color: #F5F0E8; position: absolute; top: 10px; right: 40px; z-index: 0; font-family: serif; }
        .testi-text { position: relative; z-index: 1; font-size: 1.1rem; line-height: 1.8; color: var(--gray); font-style: italic; margin-bottom: 30px; }
        .user-info { display: flex; align-items: center; gap: 20px; position: relative; z-index: 1; }
        .user-img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: var(--shadow-sm); }
        .user-meta h4 { color: var(--secondary); font-size: 1.2rem; font-family: 'Cormorant Garamond', serif; font-weight: 500; margin: 0; }
        .user-meta span { color: var(--primary-dark); font-size: 0.85rem; font-weight: 600; }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(76, 51, 36, 0.9);
          backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000;
        }
        .modal-content {
          background: white; padding: 60px; border-radius: 24px; width: 95%; max-width: 600px;
          position: relative; border: 1px solid rgba(228, 203, 182, 0.2);
          box-shadow: 0 40px 100px rgba(0,0,0,0.3);
          animation: modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .form-input { 
          width: 100%; padding: 18px; background: #F9F6F1; border: 1px solid rgba(228, 203, 182, 0.3); 
          border-radius: 12px; margin-bottom: 20px; outline: none; transition: 0.3s; 
          font-size: 1rem; color: var(--secondary);
        }
        .form-input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 4px rgba(129, 155, 139, 0.1); }

        .floating-btn {
          position: fixed; bottom: 40px; right: 40px;
          background: var(--accent); color: white; padding: 18px 35px;
          border-radius: 50px; font-weight: 700; font-size: 0.9rem;
          box-shadow: 0 15px 35px rgba(178, 132, 107, 0.3);
          z-index: 900; cursor: pointer; display: flex; align-items: center; gap: 12px;
          transition: 0.4s; border: none; text-transform: uppercase; letter-spacing: 1px;
        }
        .floating-btn:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(178, 132, 107, 0.4); background: var(--secondary); }

        @media(max-width: 1024px) {
          .calc-wrapper { grid-template-columns: 1fr; padding: 40px; }
          .hero-content h1 { font-size: 4rem; }
        }
        @media(max-width: 768px) {
          .section-header h2 { font-size: 2.8rem; }
          .hero-content h1 { font-size: 3rem; }
          .calc-wrapper { padding: 30px 20px; margin-top: -60px; }
          .container { padding: 0 15px; }
        }
      `}</style>

      {/* FLOATING CTA */}
      <button className="floating-btn" onClick={() => setSelectedService({ title: "Priority Callback" })}>
        <span style={{ fontSize: '1.4rem' }}>📞</span> Concierge Support
      </button>

      {/* HERO SECTION */}
      <section className="finance-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Curated Financial Excellence</div>
          <h1>Financing Your <br /> Property Legacy</h1>
          <p>
            Bespoke lending solutions with priority approvals and rates that respect your investment vision.
          </p>
          <div style={{ marginTop: '30px' }}>
            <button className="btn btn-accent" onClick={() => document.getElementById("calculator").scrollIntoView({ behavior: "smooth" })}>
              Start Your Evaluation
            </button>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR */}
      <section className="section" id="calculator">
        <div className="container">
          <div className="calc-wrapper animate-up delay-1">
            <div>
              <h2 className="calc-title">Investment Calculator</h2>
              <p className="calc-subtitle">Define your parameters to visualize your priority repayment framework.</p>

              <div className="range-group">
                <div className="range-label">
                  <span>Valuation Required</span>
                  <span className="text-accent">{formatCurrency(amount)}</span>
                </div>
                <input type="range" min="1000000" max="100000000" step="500000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </div>

              <div className="range-group">
                <div className="range-label">
                  <span>Interest ROI</span>
                  <span className="text-accent">{rate}%</span>
                </div>
                <input type="range" min="6" max="18" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>

              <div className="range-group">
                <div className="range-label">
                  <span>Tenure Horizon</span>
                  <span className="text-accent">{tenure} Years</span>
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
                    rgba(129, 155, 139, 0.15) ${(amount / totalPayment) * 100}% 100%
                  )`
                }}
              >
                <div className="chart-center-text">
                  <span className="chart-emi-label">Monthly EMI</span>
                  <span className="chart-emi-amount">{formatCurrency(emi)}</span>
                </div>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <div className="dot" style={{ background: '#B2846B' }}></div>
                  <span>Principal: {formatCurrency(amount)}</span>
                </div>
                <div className="legend-item">
                  <div className="dot" style={{ background: 'rgba(129, 155, 139, 0.15)' }}></div>
                  <span>Total Interest: {formatCurrency(totalInterest)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '35px' }}
                onClick={() => setSelectedService({ title: "Bespoke Loan Framework", rate: `${rate}%` })}
              >
                Request Sanction Letter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2>Financial Instruments</h2>
            <p>Sophisticated funding structured for your unique asset requirements.</p>
          </div>

          <div className="services-grid">
            {loanServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <div className="service-rate-badge">{service.rate} ROI</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>

                <ul className="features-list">
                  {service.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>

                <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setSelectedService(service)}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>The Propzo Difference</h2>
            <p>Advancing your interests through institutional-grade finance.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <span className="why-icon">⚡</span>
              <h3>Elite Velocity</h3>
              <p>In-principle sanction letters delivered within 72 business hours for qualified applicants.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">📄</span>
              <h3>Seamless Audit</h3>
              <p>Minimal friction digital documentation with white-glove doorstep validation services.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">💎</span>
              <h3>Absolute Clarity</h3>
              <p>Universal transparency. No undisclosed processing fees or hidden appraisal costs.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">🤝</span>
              <h3>Direct Access</h3>
              <p>A dedicated relationship concierge manages your journey from application to disbursal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2>Compliance Requirements</h2>
            <p>Essential documentation required for institutional appraisal.</p>
          </div>

          <div className="doc-tabs">
            {Object.keys(documents).map((key) => (
              <button key={key} className={`tab-btn ${activeDocTab === key ? "active" : ""}`} onClick={() => setActiveDocTab(key)}>
                {key}
              </button>
            ))}
          </div>

          <div className="doc-list animate-up">
            {documents[activeDocTab].map((doc, index) => (
              <div key={index} className="doc-item">
                <span className="check-circle">✔</span>
                {doc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Client Reflections</h2>
            <p>Experiences from those who have built their legacies with us.</p>
          </div>

          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="quote-icon">"</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="user-info">
                  <img src={t.image} alt={t.name} className="user-img" />
                  <div className="user-meta">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--gray)' }}
              onClick={() => setSelectedService(null)}
            >
              &times;
            </button>

            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Priority Inquiry</h2>
            <p style={{ color: "var(--gray)", marginBottom: "35px", fontSize: '1.1rem' }}>
              Your interest: <strong className="text-accent">{selectedService.title}</strong>
              {selectedService.rate && <span style={{ display: 'block', fontSize: '0.9rem', marginTop: '5px' }}>Indicative ROI: {selectedService.rate}</span>}
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" name="name" value={formValues.name} onChange={handleInputChange} className="form-input" placeholder="Legal Full Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" value={formValues.email} onChange={handleInputChange} className="form-input" placeholder="Executive Email Address" required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" value={formValues.phone} onChange={handleInputChange} className="form-input" placeholder="Direct Contact Number" required />
              </div>
              <div className="form-group">
                <input type="number" name="amount" value={formValues.amount} onChange={handleInputChange} className="form-input" placeholder="Desired Valuation (₹)" required />
              </div>

              {submitted ? (
                <div className="text-center" style={{ padding: '20px', color: 'var(--primary-dark)', fontWeight: '700' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>✓</span>
                  Inquiry Dispatched Successfully
                </div>
              ) : (
                <button type="submit" className="btn btn-accent" style={{ width: "100%", marginTop: '10px' }} disabled={loading}>
                  {loading ? "Processing..." : "Submit Priority Request"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
