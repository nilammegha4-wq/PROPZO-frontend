// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// /* ================= STATIC DATA ================= */

// const processSteps = [
//   {
//     id: 1,
//     title: "Consultation",
//     desc: "We meet to discuss your vision, budget, and requirements.",
//     icon: "📋",
//   },
//   {
//     id: 2,
//     title: "Design Concept",
//     desc: "We create 2D layouts and 3D renders for your approval.",
//     icon: "🎨",
//   },
//   {
//     id: 3,
//     title: "Execution",
//     desc: "Our team manages the procurement and installation process.",
//     icon: "hammer",
//   },
//   {
//     id: 4,
//     title: "Handover",
//     desc: "We deliver your dream space ready to move in.",
//     icon: "🔑",
//   },
// ];

// const packages = [
//   {
//     id: 1,
//     title: "Starter Package",
//     price: "₹1,80,000",
//     description: "Perfect for single room renovations.",
//     badge: "Beginner",
//     popular: false,
//     features: [
//       "2D Layout Planning",
//       "Basic Furniture Selection",
//       "Standard Lighting Setup",
//       "Paint Color Consultation",
//       "Email Support",
//     ],
//   },
//   {
//     id: 2,
//     title: "Basic Package",
//     price: "₹2,50,000",
//     description: "Best value for standard apartments.",
//     badge: "Popular",
//     popular: true,
//     features: [
//       "2D & 3D Planning",
//       "Modular Wardrobe Design",
//       "False Ceiling Concepts",
//       "Detailed Color Consulting",
//       "Decor Accessories Guide",
//       "Dedicated Designer",
//     ],
//   },
//   {
//     id: 3,
//     title: "Premium Package",
//     price: "₹4,80,000",
//     description: "Complete luxury home transformation.",
//     badge: "Premium",
//     popular: false,
//     features: [
//       "High-End 3D Renders",
//       "Custom Furniture Design",
//       "Smart Lighting Automation",
//       "Premium Wall Textures",
//       "Complete Site Supervision",
//       "Priority Support",
//     ],
//   },
// ];

// const galleryData = [
//   {
//     category: "Kitchen",
//     images: ["/kitchen1.jpg", "/kitchen2.jpg", "/kitchen3.jpg", "/kitchen4.jpg"],
//   },
//   {
//     category: "Bedroom",
//     images: ["Bedroom1.jpg", "Bedroom2.jpg", "Bedroom3.jpg", "Bedroom4.jpg"],
//   },
//   {
//     category: "Living",
//     images: ["living1.jpg", "living2.jpg", "living3.jpg", "living4.jpg"],
//   },
//   {
//     category: "Office",
//     images: ["office1.jpg", "office2.jpg", "office3.jpg", "office4.jpg"],
//   },
// ];
// const reviews = [
//   {
//     id: 1,
//     name: "Rohit Sharma",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     rating: 5,
//     text: "Outstanding quality and elegant designs. The team was very responsive.",
//   },
//   {
//     id: 2,
//     name: "Anjali Verma",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     rating: 4,
//     text: "Very professional team. They delivered on time and within budget.",
//   },
//   {
//     id: 3,
//     name: "Amit Patel",
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     rating: 5,
//     text: "Best interior designers! My living room looks absolutely stunning now.",
//   },
// ];

// const faqs = [
//   {
//     question: "What is included in the consultation?",
//     answer:
//       "Our consultation includes a site visit, style assessment, and a preliminary budget estimation to help you get started.",
//   },
//   {
//     question: "Do you provide custom furniture?",
//     answer:
//       "Yes, our Premium Package includes bespoke furniture design tailored specifically to your space and requirements.",
//   },
//   {
//     question: "How long does a typical project take?",
//     answer:
//       "A standard 2BHK project takes about 45-60 days from design approval to handover, depending on the complexity.",
//   },
//   {
//     question: "Is there a warranty on your work?",
//     answer:
//       "Absolutely. We offer a 5-year warranty on all woodwork and a 1-year service warranty for all other installations.",
//   },
// ];

// /* ================= COMPONENT ================= */

// export default function ExploreDesign() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Logic for filtering images
//   const filters = ["All", "Kitchen", "Bedroom", "Living", "Office"];
//   const allImages = galleryData.flatMap((item) =>
//     item.images.map((img, index) => ({
//       id: item.category + index,
//       category: item.category,
//       image: img,
//     }))
//   );

//   const filteredImages =
//     activeFilter === "All"
//       ? allImages
//       : allImages.filter((item) => item.category === activeFilter);

//   // Toggle FAQ
//   const toggleFaq = (index) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

//   // Handle Plan Selection
//   const openPlanModal = (plan) => {
//     setSelectedPlan(plan);
//   };

//   const closePlanModal = () => {
//     setSelectedPlan(null);
//     setFormData({ name: "", email: "", phone: "", message: "" });
//     setSuccess(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // FIX 1: Added safety check
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedPlan) return;

//     setLoading(true);
//     try {
//       const response = await fetch("/api/premium-services", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           packageName: selectedPlan.title,
//           serviceType: "Interior Design"
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(true);
//         setTimeout(() => {
//           closePlanModal();
//         }, 3000);
//       } else {
//         alert(data.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//       alert("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;700&display=swap');

//         * {
//           box-sizing: border-box;
//           font-family: 'DM Sans', sans-serif;
//         }

//         body {
//           margin: 0;
//           background: #0a0c09;
//         }

//         /* HERO */
//         .design-hero {
//           height: 85vh;
//           background: linear-gradient(rgba(10, 12, 9, 0.7), rgba(10, 12, 9, 0.85)),
//             url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6") center/cover;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//           color: #f5f0e8;
//           padding: 20px;
//         }

//         .design-hero h1 {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(3rem, 8vw, 5rem);
//           font-weight: 300;
//           margin-bottom: 20px;
//           letter-spacing: -0.01em;
//         }

//         .design-hero p {
//           font-size: 1.25rem;
//           margin-bottom: 40px;
//           color: #7a7670;
//           max-width: 600px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .hero-btn {
//           padding: 18px 45px;
//           background: #b8965a;
//           color: #0a0c09;
//           border-radius: 2px;
//           text-decoration: none;
//           font-weight: 500;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//           display: inline-block;
//           text-transform: uppercase;
//           letter-spacing: 0.15em;
//         }
//         .hero-btn:hover { background: #d4b483; transform: translateY(-3px); }

//         /* LAYOUT UTILS */
//         .container {
//           width: 90%;
//           max-width: 1250px;
//           margin: auto;
//         }

//         .section {
//           padding: 100px 0;
//         }

//         .bg-white { background: #111309; }

//         .section-title {
//           font-family: 'Cormorant Garamond', serif;
//           text-align: center;
//           font-size: clamp(2.5rem, 5vw, 3.5rem);
//           margin-bottom: 15px;
//           color: #f5f0e8;
//           font-weight: 300;
//         }

//         .section-title span { 
//           color: #b8965a; 
//           font-style: italic;
//         }

//         .section-subtitle {
//           text-align: center;
//           color: #7a7670;
//           max-width: 600px;
//           margin: 0 auto 70px auto;
//           font-size: 1.1rem;
//           line-height: 1.6;
//         }

//         /* PROCESS SECTION */
//         .process-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//           gap: 40px;
//           text-align: center;
//         }

//         .process-card {
//           padding: 30px;
//           transition: all 0.3s ease;
//         }

//         .process-card:hover {
//           transform: translateY(-8px);
//         }

//         .process-icon {
//           width: 90px;
//           height: 90px;
//           background: rgba(184, 150, 90, 0.08);
//           border: 1px solid rgba(184, 150, 90, 0.2);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 30px auto;
//           font-size: 2.2rem;
//           color: #b8965a;
//           position: relative;
//         }

//         .process-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.6rem;
//           margin-bottom: 12px;
//           color: #f5f0e8;
//           font-weight: 400;
//         }

//         .process-desc {
//           font-size: 0.95rem;
//           color: #7a7670;
//           line-height: 1.7;
//         }

//         /* PACKAGES CSS */
//         .design-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 30px;
//           align-items: stretch; 
//           padding: 20px 0;
//         }

//         .package-card {
//           background: #111309;
//           border-radius: 4px; /* Sophisticated edges */
//           padding: 50px 40px;
//           position: relative;
//           border: 1px solid rgba(184, 150, 90, 0.15);
//           transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//         }

//         .package-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
//           border-color: rgba(184, 150, 90, 0.4);
//         }

//         .package-card.popular-card {
//           border: 1px solid #b8965a;
//           box-shadow: 0 40px 80px -12px rgba(184, 150, 90, 0.15);
//         }

//         .popular-pill {
//           position: absolute;
//           top: -15px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: #b8965a;
//           color: #0a0c09;
//           padding: 8px 24px;
//           border-radius: 2px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.15em;
//         }

//         .pkg-header {
//           text-align: center;
//           margin-bottom: 35px;
//           border-bottom: 1px solid rgba(184, 150, 90, 0.1);
//           padding-bottom: 35px;
//         }

//         .pkg-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.8rem;
//           font-weight: 400;
//           margin: 0 0 15px 0;
//           color: #f5f0e8;
//           letter-spacing: 0.02em;
//         }

//         .pkg-desc {
//           color: #7a7670;
//           margin: 0;
//           font-size: 0.95rem;
//         }

//         .pkg-price {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 3rem;
//           font-weight: 300;
//           color: #d4b483;
//           display: block;
//           margin-bottom: 8px;
//         }

//         .pkg-features {
//           list-style: none;
//           padding: 0;
//           margin: 0 0 40px 0;
//           flex-grow: 1; 
//         }

//         .pkg-features li {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 18px;
//           color: #7a7670;
//           font-size: 0.95rem;
//         }

//         .check-icon {
//           width: 20px;
//           height: 20px;
//           background: rgba(184, 150, 90, 0.15);
//           color: #b8965a;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 10px;
//         }

//         .pkg-btn {
//           display: block;
//           width: 100%;
//           padding: 18px;
//           border-radius: 2px;
//           text-align: center;
//           text-decoration: none;
//           font-weight: 500;
//           transition: all 0.3s;
//           border: none;
//           cursor: pointer;
//           font-size: 0.9rem;
//           text-transform: uppercase;
//           letter-spacing: 0.15em;
//         }

//         .btn-outline {
//           background: transparent;
//           border: 1px solid rgba(184, 150, 90, 0.4);
//           color: #b8965a;
//         }
//         .btn-outline:hover {
//           border-color: #d4b483;
//           background: rgba(184, 150, 90, 0.05);
//           color: #d4b483;
//         }

//         .btn-filled {
//           background: #b8965a;
//           color: #0a0c09;
//         }
//         .btn-filled:hover {
//           background: #d4b483;
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(184, 150, 90, 0.3);
//         }

//         /* GALLERY & FILTERS */
//         .filter-bar {
//           display: flex;
//           justify-content: center;
//           gap: 10px;
//           margin-bottom: 50px;
//           flex-wrap: wrap;
//         }

//         .filter-btn {
//           padding: 12px 30px;
//           border: 1px solid rgba(184, 150, 90, 0.2);
//           border-radius: 2px;
//           background: transparent;
//           color: #7a7670;
//           cursor: pointer;
//           font-weight: 500;
//           transition: all 0.3s;
//           text-transform: uppercase;
//           font-size: 0.8rem;
//           letter-spacing: 0.1em;
//         }

//         .filter-btn.active, .filter-btn:hover {
//           background: #b8965a;
//           color: #0a0c09;
//           border-color: #b8965a;
//         }

//         .gallery-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 20px;
//         }

//         .gallery-item {
//           border-radius: 2px;
//           overflow: hidden;
//           cursor: pointer;
//           height: 320px;
//           border: 1px solid rgba(184, 150, 90, 0.1);
//         }

//         .gallery-item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.7s ease;
//         }
//         .gallery-item:hover img { transform: scale(1.08); }

//         /* REVIEWS */
//         .review-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 30px;
//         }
//         .review-card {
//           background: #111309;
//           padding: 40px;
//           border-radius: 4px;
//           border: 1px solid rgba(184, 150, 90, 0.1);
//           transition: all 0.3s ease;
//         }
//         .review-card:hover {
//           border-color: rgba(184, 150, 90, 0.3);
//         }
//         .review-header {
//           display: flex;
//           gap: 18px;
//           align-items: center;
//           margin-bottom: 25px;
//         }
//         .review-header img {
//           width: 56px;
//           height: 56px;
//           border-radius: 50%;
//           border: 1px solid rgba(184, 150, 90, 0.2);
//         }
//         .reviewer-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.3rem;
//           color: #f5f0e8;
//           display: block;
//         }
//         .stars { 
//           color: #d4b483; 
//           font-size: 0.9rem;
//           letter-spacing: 2px;
//         }
//         .review-text {
//           color: #7a7670;
//           font-style: italic;
//           line-height: 1.7;
//           font-size: 1rem;
//         }

//         /* FAQ SECTION */
//         .faq-container {
//           max-width: 850px;
//           margin: auto;
//         }

//         .faq-item {
//           background: #111309;
//           margin-bottom: 20px;
//           border-radius: 2px;
//           border: 1px solid rgba(184, 150, 90, 0.15);
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .faq-item:hover {
//           border-color: rgba(184, 150, 90, 0.4);
//         }

//         .faq-question {
//           padding: 25px 30px;
//           cursor: pointer;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 500;
//           color: #f5f0e8;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.4rem;
//           letter-spacing: 0.02em;
//         }

//         .faq-answer {
//           padding: 0 30px 30px 30px;
//           color: #7a7670;
//           line-height: 1.8;
//           border-top: 1px solid rgba(184, 150, 90, 0.1);
//           padding-top: 25px;
//           font-size: 1rem;
//         }

//         /* CTA FOOTER */
//         .cta-footer {
//           background: #0a0c09;
//           color: #f5f0e8;
//           text-align: center;
//           padding: 120px 20px;
//           position: relative;
//         }

//         .cta-footer::before {
//           content: "";
//           position: absolute;
//           top: 0; left: 0; width: 100%; height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(184, 150, 90, 0.2), transparent);
//         }

//         .cta-footer h2 { 
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(2.5rem, 6vw, 4rem); 
//           font-weight: 300;
//           margin-bottom: 25px; 
//         }

//         .btn-cta {
//           margin-top: 10px;
//         }

//         /* LIGHTBOX & MODAL */
//         .lightbox, .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(10, 12, 9, 0.95);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 9999;
//           backdrop-filter: blur(8px);
//         }
//         .lightbox img {
//           max-width: 90%;
//           max-height: 90vh;
//           border-radius: 2px;
//           border: 1px solid rgba(184, 150, 90, 0.3);
//         }
//         .lightbox span {
//           position: absolute;
//           top: 30px;
//           right: 40px;
//           color: #f5f0e8;
//           font-size: 3rem;
//           cursor: pointer;
//           transition: color 0.3s;
//         }
//         .lightbox span:hover { color: #b8965a; }

//         /* NEW MODAL STYLES */
//         .modal-content {
//           background: #111309;
//           padding: 50px;
//           border-radius: 4px;
//           width: 95%;
//           max-width: 550px;
//           position: relative;
//           box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
//           animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
//           border: 1px solid rgba(184, 150, 90, 0.2);
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 35px;
//           border-bottom: 1px solid rgba(184, 150, 90, 0.1);
//           padding-bottom: 20px;
//         }

//         .modal-header h2 {
//           margin: 0;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 2.2rem;
//           font-weight: 400;
//           color: #f5f0e8;
//         }

//         .close-modal-btn {
//           background: none;
//           border: none;
//           font-size: 1.8rem;
//           cursor: pointer;
//           color: #7a7670;
//           transition: color 0.2s;
//         }
//         .close-modal-btn:hover { color: #b8965a; }

//         .modal-form-group {
//           margin-bottom: 25px;
//         }

//         .modal-form-group label {
//           display: block;
//           margin-bottom: 12px;
//           font-weight: 500;
//           color: #b8965a;
//           text-transform: uppercase;
//           font-size: 0.75rem;
//           letter-spacing: 0.15em;
//         }

//         .modal-form-group input, .modal-form-group textarea {
//           width: 100%;
//           padding: 16px 20px;
//           background: rgba(184, 150, 90, 0.03);
//           border: 1px solid rgba(184, 150, 90, 0.15);
//           border-radius: 2px;
//           color: #f5f0e8;
//           font-size: 1rem;
//           outline: none;
//           transition: all 0.3s ease;
//         }

//         .modal-form-group input:focus, .modal-form-group textarea:focus {
//           border-color: #b8965a;
//           background: rgba(184, 150, 90, 0.08);
//           box-shadow: 0 0 0 1px #b8965a;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 14px;
//           background: #4f46e5;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-weight: 600;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: 0.3s;
//         }

//         .submit-btn:hover {
//           background: #4338ca;
//         }

//         /* RESPONSIVE */
//         @media (max-width: 768px) {
//             .design-hero h1{ font-size: 2.5rem; }
//             .section{ padding: 60px 0; }
//             .package-card.popular-card { transform: scale(1); }
//         }
//       `}</style>

//       {/* 1. HERO SECTION */}
//       <section className="design-hero">
//         <div>
//           <h1>Interior Design Excellence</h1>
//           <p>
//             Luxury interiors crafted with perfection. Transform your space today.
//           </p>
//         </div>
//       </section>

//       {/* 2. PROCESS SECTION */}
//       <section className="section bg-white">
//         <div className="container">
//           <h2 className="section-title">
//             How It <span>Works</span>
//           </h2>
//           <p className="section-subtitle">
//             A seamless journey from concept to completion.
//           </p>

//           <div className="process-grid">
//             {processSteps.map((step) => (
//               <div key={step.id} className="process-card">
//                 <div className="process-icon">
//                   {step.icon === "hammer" ? (
//                     <svg
//                       width="35"
//                       height="35"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
//                     </svg>
//                   ) : (
//                     step.icon
//                   )}
//                 </div>
//                 <h3 className="process-title">{step.title}</h3>
//                 <p className="process-desc">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 3. PACKAGES SECTION */}
//       <section className="section">
//         <div className="container">
//           <div style={{ textAlign: "center", marginBottom: "60px" }}>
//             <h2 className="section-title">
//               Our <span>Packages</span>
//             </h2>
//             <p className="section-subtitle">
//               Transparent pricing with no hidden costs. Choose the plan that
//               fits your vision.
//             </p>
//           </div>

//           <div className="design-grid">
//             {packages.map((item) => (
//               <div
//                 key={item.id}
//                 className={`package-card ${item.popular ? "popular-card" : ""}`}
//               >
//                 {item.popular && (
//                   <div className="popular-pill">Most Popular</div>
//                 )}
//                 <div className="pkg-header">
//                   <h3 className="pkg-title">{item.title}</h3>
//                   <span className="pkg-price">{item.price}</span>
//                   <p className="pkg-desc">{item.description}</p>
//                 </div>
//                 <ul className="pkg-features">
//                   {item.features.map((f, i) => (
//                     <li key={i}>
//                       <span className="check-icon">✓</span>
//                       {f}
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   type="button"
//                   onClick={() => openPlanModal(item)}
//                   className={`pkg-btn ${item.popular ? "btn-filled" : "btn-outline"
//                     }`}
//                 >
//                   Choose Plan
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 4. GALLERY SECTION */}
//       <section className="section bg-white">
//         <div className="container">
//           <h2 className="section-title">
//             Our <span>Projects</span>
//           </h2>
//           <div className="filter-bar">
//             {filters.map((f) => (
//               <button
//                 key={f}
//                 className={`filter-btn ${activeFilter === f ? "active" : ""}`}
//                 onClick={() => setActiveFilter(f)}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//           <div className="gallery-grid">
//             {filteredImages.map((item) => (
//               <div
//                 key={item.id}
//                 className="gallery-item"
//                 onClick={() => setSelectedImage(item.image)}
//               >
//                 <img src={item.image} alt={item.category} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 5. REVIEWS SECTION */}
//       <section className="section">
//         <div className="container">
//           <h2 className="section-title">
//             Client <span>Reviews</span>
//           </h2>
//           <div className="review-grid">
//             {reviews.map((r) => (
//               <div key={r.id} className="review-card">
//                 <div className="review-header">
//                   <img src={r.image} alt={r.name} />
//                   <div>
//                     <b className="reviewer-name">{r.name}</b>
//                     <div className="stars">
//                       {"★".repeat(r.rating)}
//                       {"☆".repeat(5 - r.rating)}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="review-text">
//                   "{r.text}"
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 6. FAQ SECTION */}
//       <section className="section bg-white">
//         <div className="container">
//           <h2 className="section-title">
//             Frequently Asked <span>Questions</span>
//           </h2>
//           <div className="faq-container">
//             {faqs.map((faq, index) => (
//               <div key={index} className="faq-item">
//                 <div className="faq-question" onClick={() => toggleFaq(index)}>
//                   {faq.question}
//                   <span>{openFaq === index ? "−" : "+"}</span>
//                 </div>
//                 {openFaq === index && (
//                   <div className="faq-answer">{faq.answer}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 7. CTA FOOTER */}
//       <footer className="cta-footer">
//         <div className="container">
//           <h2>Ready to transform your space?</h2>
//           <p>Book a free consultation call with our senior designers today.</p>
//           <NavLink
//             to="/contact"
//             className="hero-btn btn-cta"
//           >
//             Book Consultation
//           </NavLink>
//         </div>
//       </footer>

//       {/* LIGHTBOX FOR IMAGES */}
//       {selectedImage && (
//         <div className="lightbox" onClick={() => setSelectedImage(null)}>
//           <span>&times;</span>
//           <img src={selectedImage} alt="Preview" />
//         </div>
//       )}

//       {/* BOOKING MODAL (POPUP) */}
//       {selectedPlan && (
//         <div className="modal-overlay" onClick={closePlanModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{selectedPlan.title} Booking</h2>
//               <button className="close-modal-btn" onClick={closePlanModal}>
//                 &times;
//               </button>
//             </div>

//             {success ? (
//               <div style={{ textAlign: "center", padding: "20px" }}>
//                 <div style={{ fontSize: "3rem", color: "#10b981", marginBottom: "15px" }}>✓</div>
//                 <h3 style={{ color: "#1e293b" }}>Request Received!</h3>
//                 <p style={{ color: "#64748b" }}>We've received your inquiry for the {selectedPlan.title}. Our team will contact you soon.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleFormSubmit}>
//                 <div className="modal-form-group">
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div className="modal-form-group">
//                   <label>Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="john@propzo.com"
//                   />
//                 </div>
//                 <div className="modal-form-group">
//                   <label>Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="+91 XXXXX XXXXX"
//                   />
//                 </div>
//                 <div className="modal-form-group">
//                   <label>Message (Optional)</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     rows="3"
//                     placeholder="Tell us about your space..."
//                   ></textarea>
//                 </div>
//                 <button type="submit" className="pkg-btn btn-filled" disabled={loading}>
//                   {loading ? "Submitting..." : `Book ${selectedPlan.title}`}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/* ================= STATIC DATA ================= */

const processSteps = [
  {
    id: 1,
    title: "Consultation",
    desc: "We meet to discuss your vision, budget, and requirements.",
    icon: "📋",
  },
  {
    id: 2,
    title: "Design Concept",
    desc: "We create 2D layouts and 3D renders for your approval.",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Execution",
    desc: "Our team manages the procurement and installation process.",
    icon: "hammer",
  },
  {
    id: 4,
    title: "Handover",
    desc: "We deliver your dream space ready to move in.",
    icon: "🔑",
  },
];

const packages = [
  {
    id: 1,
    title: "Starter Package",
    price: "₹1,80,000",
    description: "Perfect for single room renovations.",
    badge: "Beginner",
    popular: false,
    features: [
      "2D Layout Planning",
      "Basic Furniture Selection",
      "Standard Lighting Setup",
      "Paint Color Consultation",
      "Email Support",
    ],
  },
  {
    id: 2,
    title: "Basic Package",
    price: "₹2,50,000",
    description: "Best value for standard apartments.",
    badge: "Popular",
    popular: true,
    features: [
      "2D & 3D Planning",
      "Modular Wardrobe Design",
      "False Ceiling Concepts",
      "Detailed Color Consulting",
      "Decor Accessories Guide",
      "Dedicated Designer",
    ],
  },
  {
    id: 3,
    title: "Premium Package",
    price: "₹4,80,000",
    description: "Complete luxury home transformation.",
    badge: "Premium",
    popular: false,
    features: [
      "High-End 3D Renders",
      "Custom Furniture Design",
      "Smart Lighting Automation",
      "Premium Wall Textures",
      "Complete Site Supervision",
      "Priority Support",
    ],
  },
];

const galleryData = [
  {
    category: "Kitchen",
    images: ["/kitchen1.jpg", "/kitchen2.jpg", "/kitchen3.jpg", "/kitchen4.jpg"],
  },
  {
    category: "Bedroom",
    images: ["Bedroom1.jpg", "Bedroom2.jpg", "Bedroom3.jpg", "Bedroom4.jpg"],
  },
  {
    category: "Living",
    images: ["living1.jpg", "living2.jpg", "living3.jpg", "living4.jpg"],
  },
  {
    category: "Office",
    images: ["office1.jpg", "office2.jpg", "office3.jpg", "office4.jpg"],
  },
];
const reviews = [
  {
    id: 1,
    name: "Rohit Sharma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Outstanding quality and elegant designs. The team was very responsive.",
  },
  {
    id: 2,
    name: "Anjali Verma",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "Very professional team. They delivered on time and within budget.",
  },
  {
    id: 3,
    name: "Amit Patel",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    text: "Best interior designers! My living room looks absolutely stunning now.",
  },
];

const faqs = [
  {
    question: "What is included in the consultation?",
    answer:
      "Our consultation includes a site visit, style assessment, and a preliminary budget estimation to help you get started.",
  },
  {
    question: "Do you provide custom furniture?",
    answer:
      "Yes, our Premium Package includes bespoke furniture design tailored specifically to your space and requirements.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A standard 2BHK project takes about 45-60 days from design approval to handover, depending on the complexity.",
  },
  {
    question: "Is there a warranty on your work?",
    answer:
      "Absolutely. We offer a 5-year warranty on all woodwork and a 1-year service warranty for all other installations.",
  },
];

/* ================= COMPONENT ================= */

export default function ExploreDesign() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const filters = ["All", "Kitchen", "Bedroom", "Living", "Office"];
  const allImages = galleryData.flatMap((item) =>
    item.images.map((img, index) => ({
      id: item.category + index,
      category: item.category,
      image: img,
    }))
  );

  const filteredImages =
    activeFilter === "All"
      ? allImages
      : allImages.filter((item) => item.category === activeFilter);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openPlanModal = (plan) => {
    setSelectedPlan(plan);
  };

  const closePlanModal = () => {
    setSelectedPlan(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setLoading(true);
    try {
      const response = await fetch("/api/premium-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageName: selectedPlan.title,
          serviceType: "Interior Design"
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          closePlanModal();
        }, 3000);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;700&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
        }

        body {
          margin: 0;
          background: #f5f0ec;
        }

        /* HERO */
        .design-hero {
          height: 85vh;
          background: linear-gradient(rgba(76, 51, 36, 0.75), rgba(76, 51, 36, 0.9)),
            url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6") center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #E4CBB6;
          padding: 20px;
        }

        .design-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 300;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }
        
        .design-hero p {
          font-size: 1.25rem;
          margin-bottom: 40px;
          color: #E4CBB6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-btn {
          padding: 18px 45px;
          background: #819B8B;
          color: #fff;
          border-radius: 2px;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .hero-btn:hover { background: #627B68; transform: translateY(-3px); }

        /* LAYOUT UTILS */
        .container {
          width: 90%;
          max-width: 1250px;
          margin: auto;
        }

        .section {
          padding: 100px 0;
        }
        
        .bg-white { background: #fff; }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          text-align: center;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: 15px;
          color: #4C3324;
          font-weight: 300;
        }

        .section-title span { 
          color: #B2846B; 
          font-style: italic;
        }

        .section-subtitle {
          text-align: center;
          color: #627B68;
          max-width: 600px;
          margin: 0 auto 70px auto;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* PROCESS SECTION */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 40px;
          text-align: center;
        }
        
        .process-card {
          padding: 30px;
          transition: all 0.3s ease;
        }

        .process-card:hover {
          transform: translateY(-8px);
        }
        
        .process-icon {
          width: 90px;
          height: 90px;
          background: rgba(129, 155, 139, 0.1);
          border: 1px solid rgba(129, 155, 139, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px auto;
          font-size: 2.2rem;
          color: #627B68;
          position: relative;
        }
        
        .process-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          margin-bottom: 12px;
          color: #4C3324;
          font-weight: 400;
        }
        
        .process-desc {
          font-size: 0.95rem;
          color: #627B68;
          line-height: 1.7;
        }

        /* PACKAGES CSS */
        .design-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          align-items: stretch; 
          padding: 20px 0;
        }

        .package-card {
          background: #fff;
          border-radius: 4px;
          padding: 50px 40px;
          position: relative;
          border: 1px solid rgba(129, 155, 139, 0.2);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(76, 51, 36, 0.12);
          border-color: rgba(129, 155, 139, 0.5);
        }

        .package-card.popular-card {
          border: 1px solid #819B8B;
          box-shadow: 0 40px 80px -12px rgba(98, 123, 104, 0.2);
        }

        .popular-pill {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #627B68;
          color: #fff;
          padding: 8px 24px;
          border-radius: 2px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .pkg-header {
          text-align: center;
          margin-bottom: 35px;
          border-bottom: 1px solid rgba(129, 155, 139, 0.15);
          padding-bottom: 35px;
        }

        .pkg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin: 0 0 15px 0;
          color: #4C3324;
          letter-spacing: 0.02em;
        }

        .pkg-desc {
          color: #627B68;
          margin: 0;
          font-size: 0.95rem;
        }

        .pkg-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: #B2846B;
          display: block;
          margin-bottom: 8px;
        }

        .pkg-features {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
          flex-grow: 1; 
        }

        .pkg-features li {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 18px;
          color: #627B68;
          font-size: 0.95rem;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          background: rgba(129, 155, 139, 0.15);
          color: #627B68;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }

        .pkg-btn {
          display: block;
          width: 100%;
          padding: 18px;
          border-radius: 2px;
          text-align: center;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid rgba(129, 155, 139, 0.5);
          color: #627B68;
        }
        .btn-outline:hover {
          border-color: #627B68;
          background: rgba(129, 155, 139, 0.08);
          color: #4C3324;
        }

        .btn-filled {
          background: #819B8B;
          color: #fff;
        }
        .btn-filled:hover {
          background: #627B68;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(98, 123, 104, 0.3);
        }

        /* GALLERY & FILTERS */
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 30px;
          border: 1px solid rgba(129, 155, 139, 0.3);
          border-radius: 2px;
          background: transparent;
          color: #627B68;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
        }

        .filter-btn.active, .filter-btn:hover {
          background: #819B8B;
          color: #fff;
          border-color: #819B8B;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          height: 320px;
          border: 1px solid rgba(129, 155, 139, 0.15);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .gallery-item:hover img { transform: scale(1.08); }

        /* REVIEWS */
        .review-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        .review-card {
          background: #fff;
          padding: 40px;
          border-radius: 4px;
          border: 1px solid rgba(129, 155, 139, 0.15);
          transition: all 0.3s ease;
        }
        .review-card:hover {
          border-color: rgba(129, 155, 139, 0.4);
        }
        .review-header {
          display: flex;
          gap: 18px;
          align-items: center;
          margin-bottom: 25px;
        }
        .review-header img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(129, 155, 139, 0.3);
        }
        .reviewer-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: #4C3324;
          display: block;
        }
        .stars { 
          color: #B2846B; 
          font-size: 0.9rem;
          letter-spacing: 2px;
        }
        .review-text {
          color: #627B68;
          font-style: italic;
          line-height: 1.7;
          font-size: 1rem;
        }

        /* FAQ SECTION */
        .faq-container {
          max-width: 850px;
          margin: auto;
        }
        
        .faq-item {
          background: #fff;
          margin-bottom: 20px;
          border-radius: 2px;
          border: 1px solid rgba(129, 155, 139, 0.2);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: rgba(129, 155, 139, 0.5);
        }
        
        .faq-question {
          padding: 25px 30px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          color: #4C3324;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          letter-spacing: 0.02em;
        }
        
        .faq-answer {
          padding: 0 30px 30px 30px;
          color: #627B68;
          line-height: 1.8;
          border-top: 1px solid rgba(129, 155, 139, 0.15);
          padding-top: 25px;
          font-size: 1rem;
        }

        /* CTA FOOTER */
        .cta-footer {
          background: #4C3324;
          color: #E4CBB6;
          text-align: center;
          padding: 120px 20px;
          position: relative;
        }

        .cta-footer::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(228, 203, 182, 0.3), transparent);
        }
        
        .cta-footer h2 { 
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4rem); 
          font-weight: 300;
          margin-bottom: 25px;
          color: #E4CBB6;
        }

        .cta-footer p {
          color: #B2846B;
        }

        .btn-cta {
          margin-top: 10px;
        }

        /* LIGHTBOX & MODAL */
        .lightbox, .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(76, 51, 36, 0.92);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          backdrop-filter: blur(8px);
        }
        .lightbox img {
          max-width: 90%;
          max-height: 90vh;
          border-radius: 2px;
          border: 1px solid rgba(228, 203, 182, 0.3);
        }
        .lightbox span {
          position: absolute;
          top: 30px;
          right: 40px;
          color: #E4CBB6;
          font-size: 3rem;
          cursor: pointer;
          transition: color 0.3s;
        }
        .lightbox span:hover { color: #819B8B; }

        /* MODAL STYLES */
        .modal-content {
          background: #fff;
          padding: 50px;
          border-radius: 4px;
          width: 95%;
          max-width: 550px;
          position: relative;
          box-shadow: 0 40px 100px rgba(76, 51, 36, 0.3);
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(129, 155, 139, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 35px;
          border-bottom: 1px solid rgba(129, 155, 139, 0.15);
          padding-bottom: 20px;
        }

        .modal-header h2 {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 400;
          color: #4C3324;
        }

        .close-modal-btn {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #627B68;
          transition: color 0.2s;
        }
        .close-modal-btn:hover { color: #4C3324; }

        .modal-form-group {
          margin-bottom: 25px;
        }

        .modal-form-group label {
          display: block;
          margin-bottom: 12px;
          font-weight: 500;
          color: #627B68;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
        }

        .modal-form-group input, .modal-form-group textarea {
          width: 100%;
          padding: 16px 20px;
          background: rgba(129, 155, 139, 0.04);
          border: 1px solid rgba(129, 155, 139, 0.25);
          border-radius: 2px;
          color: #4C3324;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .modal-form-group input:focus, .modal-form-group textarea:focus {
          border-color: #819B8B;
          background: rgba(129, 155, 139, 0.08);
          box-shadow: 0 0 0 1px #819B8B;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            .design-hero h1{ font-size: 2.5rem; }
            .section{ padding: 60px 0; }
            .package-card.popular-card { transform: scale(1); }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="design-hero">
        <div>
          <h1>Interior Design Excellence</h1>
          <p>
            Luxury interiors crafted with perfection. Transform your space today.
          </p>
        </div>
      </section>

      {/* 2. PROCESS SECTION */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">
            How It <span>Works</span>
          </h2>
          <p className="section-subtitle">
            A seamless journey from concept to completion.
          </p>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.id} className="process-card">
                <div className="process-icon">
                  {step.icon === "hammer" ? (
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PACKAGES SECTION */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 className="section-title">
              Our <span>Packages</span>
            </h2>
            <p className="section-subtitle">
              Transparent pricing with no hidden costs. Choose the plan that
              fits your vision.
            </p>
          </div>

          <div className="design-grid">
            {packages.map((item) => (
              <div
                key={item.id}
                className={`package-card ${item.popular ? "popular-card" : ""}`}
              >
                {item.popular && (
                  <div className="popular-pill">Most Popular</div>
                )}
                <div className="pkg-header">
                  <h3 className="pkg-title">{item.title}</h3>
                  <span className="pkg-price">{item.price}</span>
                  <p className="pkg-desc">{item.description}</p>
                </div>
                <ul className="pkg-features">
                  {item.features.map((f, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openPlanModal(item)}
                  className={`pkg-btn ${item.popular ? "btn-filled" : "btn-outline"
                    }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">
            Our <span>Projects</span>
          </h2>
          <div className="filter-bar">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => setSelectedImage(item.image)}
              >
                <img src={item.image} alt={item.category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Client <span>Reviews</span>
          </h2>
          <div className="review-grid">
            {reviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <img src={r.image} alt={r.name} />
                  <div>
                    <b className="reviewer-name">{r.name}</b>
                    <div className="stars">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </div>
                  </div>
                </div>
                <p className="review-text">
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <span>{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA FOOTER */}
      <footer className="cta-footer">
        <div className="container">
          <h2>Ready to transform your space?</h2>
          <p>Book a free consultation call with our senior designers today.</p>
          <NavLink
            to="/contact"
            className="hero-btn btn-cta"
          >
            Book Consultation
          </NavLink>
        </div>
      </footer>

      {/* LIGHTBOX FOR IMAGES */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <span>&times;</span>
          <img src={selectedImage} alt="Preview" />
        </div>
      )}

      {/* BOOKING MODAL (POPUP) */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={closePlanModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPlan.title} Booking</h2>
              <button className="close-modal-btn" onClick={closePlanModal}>
                &times;
              </button>
            </div>

            {success ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: "3rem", color: "#819B8B", marginBottom: "15px" }}>✓</div>
                <h3 style={{ color: "#4C3324" }}>Request Received!</h3>
                <p style={{ color: "#627B68" }}>We've received your inquiry for the {selectedPlan.title}. Our team will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="modal-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@propzo.com"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Tell us about your space..."
                  ></textarea>
                </div>
                <button type="submit" className="pkg-btn btn-filled" disabled={loading}>
                  {loading ? "Submitting..." : `Book ${selectedPlan.title}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
