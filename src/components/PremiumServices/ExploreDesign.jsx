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

  // Logic for filtering images
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

  // Toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Handle Plan Selection
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

  // FIX 1: Added safety check
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
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          margin: 0;
          background: #f8fafc;
        }

        /* HERO */
        .design-hero {
          height: 85vh;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
            url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6") center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 20px;
        }

        .design-hero h1 {
          font-size: 3.5rem;
          margin-bottom: 15px;
        }
        
        .design-hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .hero-btn {
          padding: 15px 40px;
          background: #4f46e5;
          color: white;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: 0.3s;
          display: inline-block;
        }
        .hero-btn:hover { background: #4338ca; transform: translateY(-3px); }

        /* LAYOUT UTILS */
        .container {
          width: 90%;
          max-width: 1250px;
          margin: auto;
        }

        .section {
          padding: 90px 0;
        }
        
        .bg-white { background: white; }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #1e293b;
        }

        .section-title span { color: #4f46e5; }

        .section-subtitle {
          text-align: center;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto 60px auto;
        }

        /* PROCESS SECTION */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          text-align: center;
        }
        
        .process-card {
          padding: 20px;
        }
        
        .process-icon {
          width: 80px;
          height: 80px;
          background: #e0e7ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px auto;
          font-size: 2rem;
          color: #4f46e5;
          position: relative;
        }
        
        .process-title {
          font-size: 1.25rem;
          margin-bottom: 10px;
          color: #1e293b;
        }
        
        .process-desc {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.6;
        }

        /* PACKAGES CSS */
        .design-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          align-items: center; 
          padding: 20px 0;
        }

        .package-card {
          background: white;
          border-radius: 24px;
          padding: 40px 30px;
          position: relative;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .package-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .package-card.popular-card {
          border: 2px solid #4f46e5;
          box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.25);
          transform: scale(1.05); 
          z-index: 2;
        }

        .popular-pill {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #4f46e5;
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .pkg-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 30px;
        }

        .pkg-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 0 10px 0;
          color: #1e293b;
        }

        .pkg-desc {
          color: #64748b;
          margin: 0;
        }

        .pkg-price {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          display: block;
          margin-bottom: 5px;
        }

        .pkg-features {
          list-style: none;
          padding: 0;
          margin: 0 0 35px 0;
          flex-grow: 1; 
        }

        .pkg-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
          color: #475569;
        }

        .check-icon {
          width: 22px;
          height: 22px;
          background: #e0e7ff;
          color: #4f46e5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .pkg-btn {
          display: block;
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #e2e8f0;
          color: #475569;
        }
        .btn-outline:hover {
          border-color: #4f46e5;
          color: #4f46e5;
          background: #eff6ff;
        }

        .btn-filled {
          background: #4f46e5;
          color: white;
          border: 2px solid #4f46e5;
        }
        .btn-filled:hover {
          background: #4338ca;
        }

        /* GALLERY & FILTERS */
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 28px;
          border: none;
          border-radius: 40px;
          background: white;
          color: #64748b;
          cursor: pointer;
          font-weight: 600;
          transition: .3s;
        }

        .filter-btn.active, .filter-btn:hover {
          background: #4f46e5;
          color: white;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .gallery-item {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          height: 300px;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-item:hover img { transform: scale(1.1); }

        /* REVIEWS */
        .review-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .review-card {
          background: white;
          padding: 35px;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
        }
        .review-header {
          display: flex;
          gap: 15px;
          align-items: center;
          margin-bottom: 20px;
        }
        .review-header img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .stars { color: #facc15; }

        /* FAQ SECTION */
        .faq-container {
          max-width: 800px;
          margin: auto;
        }
        
        .faq-item {
          background: white;
          margin-bottom: 15px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        
        .faq-question {
          padding: 20px 25px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #1e293b;
        }
        
        .faq-answer {
          padding: 0 25px 25px 25px;
          color: #64748b;
          line-height: 1.6;
          border-top: 1px solid #f1f5f9;
          margin-top: -10px;
          padding-top: 20px;
        }

        /* CTA FOOTER */
        .cta-footer {
          background: #1e293b;
          color: white;
          text-align: center;
          padding: 80px 20px;
        }
        
        .cta-footer h2 { font-size: 2.5rem; margin-bottom: 20px; }
        .cta-footer p { color: #94a3b8; margin-bottom: 30px; }

        /* LIGHTBOX & MODAL */
        .lightbox, .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          backdrop-filter: blur(5px);
        }
        .lightbox img {
          max-width: 90%;
          max-height: 90vh;
          border-radius: 8px;
        }
        .lightbox span {
          position: absolute;
          top: 30px;
          right: 40px;
          color: white;
          font-size: 3rem;
          cursor: pointer;
        }

        /* NEW MODAL STYLES */
        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 15px;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #1e293b;
        }

        .close-modal-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #475569;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: 0.3s;
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
        }

        .submit-btn:hover {
          background: #4338ca;
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
                    <b style={{ color: "#334155" }}>{r.name}</b>
                    <div className="stars">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </div>
                  </div>
                </div>
                <p style={{ color: "#475569", fontStyle: "italic" }}>
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
            className="hero-btn"
            style={{ background: "white", color: "#4f46e5" }}
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
                <div style={{ fontSize: "3rem", color: "#10b981", marginBottom: "15px" }}>✓</div>
                <h3 style={{ color: "#1e293b" }}>Request Received!</h3>
                <p style={{ color: "#64748b" }}>We've received your inquiry for the {selectedPlan.title}. Our team will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Tell us about your space..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
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