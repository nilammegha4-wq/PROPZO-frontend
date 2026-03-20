// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });

//   const [newsletterEmail, setNewsletterEmail] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       // Removed phone from payload map since the design only demands Email, Name, and Message.
//       const res = await axios.post(
//         "http://localhost:5000/api/contact",
//         formData
//       );
//       setSuccess("Message sent successfully ✅");
//       setFormData({ name: "", email: "", message: "" });
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//       alert("Something went wrong");
//     }
//   };

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     alert(`Subscribed to newsletter with: ${newsletterEmail}`);
//     setNewsletterEmail("");
//   }

//   return (
//     <>
//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         /* --- Color Variables based on ketchen design --- */
//         :root {
//           --dark-teal: #2c4241;
//           --mid-teal: #364f4d;
//           --light-teal-bg: #f2f7f6;
//           --btn-green: #7ca88a;
//           --btn-hover: #679275;
//           --text-gray: #6b7280;
//           --text-dark: #1f2937;
//         }

//         .container {
//           width: 90%;
//           max-width: 1200px;
//           margin: auto;
//         }

//         /* =====================
//            HERO SECTION
//         ===================== */
//         .contact-hero {
//           background: linear-gradient(135deg, var(--mid-teal) 0%, var(--dark-teal) 100%);
//           position: relative;
//           color: white;
//           padding: 100px 5% 0 5%;
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end; /* Align to bottom so image can drop down */
//         }

//         .hero-content {
//           flex: 1;
//           max-width: 500px;
//           padding-bottom: 150px;
//         }

//         .hero-title {
//           font-size: 3.5rem;
//           font-weight: 700;
//           margin-bottom: 15px;
//         }

//         .hero-desc {
//           font-size: 1rem;
//           color: #a0b2aa;
//           line-height: 1.6;
//         }

//         .hero-image-wrapper {
//           flex: 1;
//           max-width: 450px;
//           position: relative;
//           z-index: 10;
//           margin-bottom: -100px; /* Pull it down over the next section */
//         }

//         .hero-image {
//           width: 100%;
//           height: 600px;
//           object-fit: cover;
//           border-top-left-radius: 250px;
//           border-top-right-radius: 250px;
//           border: 10px solid white;
//           background: white;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.1);
//         }

//         @media (max-width: 900px) {
//           .contact-hero {
//             flex-direction: column;
//             align-items: center;
//             text-align: center;
//             padding-top: 80px;
//           }
//           .hero-content {
//             padding-bottom: 60px;
//           }
//           .hero-image-wrapper {
//             margin-bottom: -50px;
//           }
//           .hero-image {
//             height: 400px;
//           }
//         }

//         /* =====================
//            CONTACT INFORMATION
//         ===================== */
//         .contact-info-section {
//           padding: 150px 5% 80px 5%; /* Pad top generously because image overlaps */
//           background-color: white;
//         }

//         .info-header {
//           margin-bottom: 40px;
//           max-width: 450px;
//         }

//         .info-header h2 {
//           color: var(--text-dark);
//           font-size: 1.8rem;
//           margin-bottom: 15px;
//         }

//         .info-header p {
//           color: var(--text-gray);
//           line-height: 1.6;
//           font-size: 0.95rem;
//         }

//         .info-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 30px;
//           max-width: 800px;
//         }

//         .info-card {
//           text-align: left;
//         }

//         .info-icon {
//           width: 50px;
//           height: 50px;
//           background: var(--btn-green);
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           margin-bottom: 20px;
//         }

//         .info-card h4 {
//           color: var(--text-dark);
//           font-size: 1.1rem;
//           margin-bottom: 8px;
//         }

//         .info-card p {
//           color: var(--text-gray);
//           font-size: 0.9rem;
//         }

//         @media (max-width: 768px) {
//           .info-grid {
//             grid-template-columns: 1fr;
//           }
//           .info-card {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             text-align: center;
//           }
//           .info-header {
//             text-align: center;
//             margin: 0 auto 40px;
//           }
//         }

//         /* =====================
//            MAIN INTERACTION (FORM + MAP)
//         ===================== */
//         .interaction-section {
//           padding: 60px 5%;
//           display: flex;
//           gap: 60px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         /* Dark Form Card */
//         .dark-form-card {
//           flex: 1;
//           background-color: var(--mid-teal);
//           padding: 50px 40px;
//           border-radius: 12px;
//           color: white;
//         }

//         .dark-form-card h2 {
//           font-size: 1.8rem;
//           margin-bottom: 15px;
//         }

//         .dark-form-card > p {
//           color: #a0b2aa;
//           font-size: 0.95rem;
//           margin-bottom: 30px;
//           line-height: 1.6;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-input {
//           width: 100%;
//           background: transparent;
//           border: 1px solid #5d7572;
//           border-radius: 25px;
//           padding: 15px 20px;
//           color: white;
//           font-size: 0.95rem;
//           outline: none;
//           transition: border-color 0.3s;
//         }

//         .form-textarea {
//           width: 100%;
//           background: transparent;
//           border: 1px solid #5d7572;
//           border-radius: 20px;
//           padding: 15px 20px;
//           color: white;
//           font-size: 0.95rem;
//           outline: none;
//           resize: none;
//           height: 120px;
//           transition: border-color 0.3s;
//         }

//         .form-input:focus, .form-textarea:focus {
//           border-color: var(--btn-green);
//         }

//         .form-input::placeholder, .form-textarea::placeholder {
//           color: #8caba3;
//         }

//         .btn-green {
//           background-color: var(--btn-green);
//           color: white;
//           border: none;
//           padding: 14px 30px;
//           border-radius: 25px;
//           font-weight: 500;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: background 0.3s;
//           margin-top: 10px;
//         }

//         .btn-green:hover {
//           background-color: var(--btn-hover);
//         }

//         .success-text {
//           color: var(--btn-green);
//           font-weight: 600;
//           margin-bottom: 15px;
//         }

//         /* Map and Socials */
//         .map-section {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         .map-section h2 {
//           color: var(--text-dark);
//           font-size: 1.5rem;
//           margin-bottom: 10px;
//         }

//         .map-section > p {
//           color: var(--text-gray);
//           font-size: 0.95rem;
//           margin-bottom: 25px;
//           line-height: 1.6;
//         }

//         .map-container {
//           width: 100%;
//           height: 300px;
//           border-radius: 12px;
//           overflow: hidden;
//           margin-bottom: 35px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.05);
//         }

//         .map-container iframe {
//           width: 100%;
//           height: 100%;
//           border: none;
//         }

//         .social-icons {
//           display: flex;
//           gap: 15px;
//         }

//         .social-icon {
//           width: 45px;
//           height: 45px;
//           background: var(--mid-teal);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-size: 18px;
//           cursor: pointer;
//           transition: background 0.3s;
//         }

//         .social-icon:hover {
//           background: var(--btn-green);
//         }

//         @media (max-width: 900px) {
//           .interaction-section {
//             flex-direction: column;
//           }
//         }

//         /* =====================
//            FOOTER BANNER SECTION
//         ===================== */
//         .footer-banner-section {
//           background: linear-gradient(135deg, var(--dark-teal) 0%, var(--mid-teal) 100%);
//           padding: 80px 5%;
//           color: white;
//           text-align: center;
//           position: relative;
//         }

//         .footer-banner-container {
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         .footer-banner-text h2 {
//           font-family: 'Playfair Display', serif;
//           font-size: 2.8rem;
//           margin-bottom: 20px;
//         }

//         .footer-banner-text p {
//           color: #a0b2aa;
//           font-size: 1.1rem;
//           line-height: 1.6;
//           margin-bottom: 30px;
//         }

//         .footer-cta-btn {
//           display: inline-block;
//           background-color: var(--btn-green);
//           color: white;
//           padding: 16px 40px;
//           border-radius: 30px;
//           font-weight: 600;
//           font-size: 1.1rem;
//           text-decoration: none;
//           transition: transform 0.3s, background 0.3s;
//           box-shadow: 0 10px 20px rgba(0,0,0,0.1);
//         }

//         .footer-cta-btn:hover {
//           background-color: var(--btn-hover);
//           transform: translateY(-3px);
//         }

//         @media (max-width: 768px) {
//           .footer-banner-container {
//             flex-direction: column;
//             text-align: center;
//           }
//         }
//       `}</style>

//       {/* Hero Section */}
//       <section className="contact-hero">
//         <div className="hero-content">
//           <h1 className="hero-title">Contact Us</h1>
//           <p className="hero-desc">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
//             luctus nec ullamcorper mattis, pulvinar dapibus leo.
//           </p>
//         </div>
//         <div className="hero-image-wrapper">
//           <img
//             src="/1.jpg"
//             alt="Modern Kitchen Layout"
//             className="hero-image"
//           />
//         </div>
//       </section>

//       {/* Contact Information */}
//       <section className="contact-info-section">
//         <div className="container">
//           <div className="info-header">
//             <h2>Contact Information</h2>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
//             </p>
//           </div>

//           <div className="info-grid">
//             <div className="info-card">
//               <div className="info-icon">📞</div>
//               <h4>(+654) 6544 55</h4>
//               <p>Lorem ipsum dolor sit</p>
//             </div>
//             <div className="info-card">
//               <div className="info-icon">✉</div>
//               <h4>mail@ktchn.com</h4>
//               <p>Lorem ipsum dolor sit</p>
//             </div>
//             <div className="info-card">
//               <div className="info-icon">📍</div>
//               <h4>Mumbai, India</h4>
//               <p>Lorem ipsum dolor sit</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Interaction (Form + Map) */}
//       <section className="interaction-section">

//         {/* Left Side: Dark Form */}
//         <div className="dark-form-card">
//           <h2>Get In Touch !</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.
//           </p>

//           {success && <p className="success-text">{success}</p>}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-input"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-input"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <textarea
//                 name="message"
//                 className="form-textarea"
//                 placeholder="Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               ></textarea>
//             </div>
//             <button className="btn-green" type="submit" disabled={loading}>
//               {loading ? "Sending..." : "Submit Button"}
//             </button>
//           </form>
//         </div>

//         {/* Right Side: Map & Socials */}
//         <div className="map-section">
//           <h2>Our Location</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
//             luctus nec ullamcorper mattis, pulvinar dapibus leo.
//           </p>

//           <div className="map-container">
//             <iframe
//               src="https://maps.google.com/maps?q=Mumbai,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Google Maps Location"
//             ></iframe>
//           </div>

//           <h2>Social Media</h2>
//           <div className="social-icons">
//             {/* Dummy Icons simulating FontAwesome or similar */}
//             <div className="social-icon">f</div>
//             <div className="social-icon">t</div>
//             <div className="social-icon">▶</div>
//             <div className="social-icon">W</div>
//           </div>
//         </div>

//       </section>

//       {/* Footer Banner Section */}
//       <section className="footer-banner-section">
//         <div className="footer-banner-container">
//           <div className="footer-banner-text">
//             <h2>Ready to Find Your Dream Home?</h2>
//             <p>
//               Connect with our elite team of real estate professionals for a private 
//               consultation tailored to your luxury property needs.
//             </p>
//             <Link to="/properties" className="footer-cta-btn">
//               Explore Properties
//             </Link>
//           </div>
//         </div>
//       </section>

//     </>
//   );
// };

// export default Contact;



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Removed phone from payload map since the design only demands Email, Name, and Message.
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      setSuccess("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
      
      setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed to newsletter with: ${newsletterEmail}`);
    setNewsletterEmail("");
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* --- Color Variables based on new palette --- */
        :root {
          --dark-teal: #4C3324;
          --mid-teal: #627B68;
          --light-teal-bg: #f5f0ec;
          --btn-green: #819B8B;
          --btn-hover: #627B68;
          --text-gray: #6b7280;
          --text-dark: #1f2937;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
        }

        /* =====================
           HERO SECTION
        ===================== */
        .contact-hero {
          background: linear-gradient(rgba(76, 51, 36, 0.82), rgba(76, 51, 36, 0.75)),
                      url("/PremiumVilla.jpg");
          background-size: cover;
          background-position: center;
          position: relative;
          color: white;
          padding: 120px 5% 0 5%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .hero-content {
          flex: 1;
          max-width: 500px;
          padding-bottom: 150px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .hero-desc {
          font-size: 1.15rem;
          color: #f9f6f1;
          line-height: 1.8;
          max-width: 600px;
          opacity: 0.9;
        }

        .hero-image-wrapper {
          flex: 1;
          max-width: 450px;
          position: relative;
          z-index: 10;
          margin-bottom: -100px; /* Pull it down over the next section */
        }

        .hero-image {
          width: 100%;
          height: 600px;
          object-fit: cover;
          border-top-left-radius: 250px;
          border-top-right-radius: 250px;
          border: 10px solid white;
          background: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        @media (max-width: 900px) {
          .contact-hero {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-top: 80px;
          }
          .hero-content {
            padding-bottom: 60px;
          }
          .hero-image-wrapper {
            margin-bottom: -50px;
          }
          .hero-image {
            height: 400px;
          }
        }

        /* =====================
           CONTACT INFORMATION
        ===================== */
        .contact-info-section {
          padding: 150px 5% 80px 5%; /* Pad top generously because image overlaps */
          background-color: white;
        }

        .info-header {
          margin-bottom: 40px;
          max-width: 450px;
        }

        .info-header h2 {
          color: var(--text-dark);
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .info-header p {
          color: var(--text-gray);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 800px;
        }

        .info-card {
          text-align: left;
        }

        .info-icon {
          width: 50px;
          height: 50px;
          background: var(--btn-green);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
        }

        .info-card h4 {
          color: var(--text-dark);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .info-card p {
          color: var(--text-gray);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          .info-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .info-header {
            text-align: center;
            margin: 0 auto 40px;
          }
        }

        /* =====================
           MAIN INTERACTION (FORM + MAP)
        ===================== */
        .interaction-section {
          padding: 60px 5%;
          display: flex;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Dark Form Card */
        .dark-form-card {
          flex: 1;
          background-color: var(--mid-teal);
          padding: 50px 40px;
          border-radius: 12px;
          color: white;
        }

        .dark-form-card h2 {
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .dark-form-card > p {
          color: #E4CBB6;
          font-size: 0.95rem;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-input {
          width: 100%;
          background: transparent;
          border: 1px solid #819B8B;
          border-radius: 25px;
          padding: 15px 20px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s;
        }

        .form-textarea {
          width: 100%;
          background: transparent;
          border: 1px solid #819B8B;
          border-radius: 20px;
          padding: 15px 20px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          resize: none;
          height: 120px;
          transition: border-color 0.3s;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #E4CBB6;
        }
        
        .form-input::placeholder, .form-textarea::placeholder {
          color: #E4CBB6;
        }

        .btn-green {
          background-color: var(--btn-green);
          color: white;
          border: none;
          padding: 14px 30px;
          border-radius: 25px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 10px;
        }

        .btn-green:hover {
          background-color: var(--btn-hover);
        }

        .success-text {
          color: #E4CBB6;
          font-weight: 600;
          margin-bottom: 15px;
        }

        /* Map and Socials */
        .map-section {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .map-section h2 {
          color: var(--text-dark);
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .map-section > p {
          color: var(--text-gray);
          font-size: 0.95rem;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .map-container {
          width: 100%;
          height: 300px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 35px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: var(--mid-teal);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .social-icon:hover {
          background: var(--btn-green);
        }

        @media (max-width: 900px) {
          .interaction-section {
            flex-direction: column;
          }
        }

        /* =====================
           FOOTER BANNER SECTION
        ===================== */
        .footer-banner-section {
          background: linear-gradient(135deg, #4C3324 0%, #627B68 100%);
          padding: 80px 5%;
          color: white;
          text-align: center;
          position: relative;
        }

        .footer-banner-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .footer-banner-text h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          margin-bottom: 20px;
        }

        .footer-banner-text p {
          color: #E4CBB6;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .footer-cta-btn {
          display: inline-block;
          background-color: var(--btn-green);
          color: white;
          padding: 16px 40px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          transition: transform 0.3s, background 0.3s;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .footer-cta-btn:hover {
          background-color: var(--btn-hover);
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .footer-banner-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-desc">
            Discover your next chapter with PropZo. Our elite team provides bespoke guidance,
            ensuring a seamless journey to your dream residence.
          </p>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="/1.jpg"
            alt="Modern Kitchen Layout"
            className="hero-image"
          />
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <div className="info-header">
            <h2>Contact Information</h2>
            <p>
              Whether you're seeking a private viewing or have detailed inquiries about our portfolio,
              our dedicated consultants are here to provide comprehensive assistance.
            </p>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h4>(+91) 98765 43210</h4>
              <p>Client Relations & Support</p>
            </div>
            <div className="info-card">
              <div className="info-icon">✉</div>
              <h4>propzoestate@gmail.com</h4>
              <p>Inquiries & Consultations</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h4>Mumbai, India</h4>
              <p>PropZo Global Headquarters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interaction (Form + Map) */}
      <section className="interaction-section">

        {/* Left Side: Dark Form */}
        <div className="dark-form-card">
          <h2>Get In Touch !</h2>
          <p>
            Reach out through the form below, and one of our senior property
            advisors will contact you within 24 hours.
          </p>

          {success && <p className="success-text">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button className="btn-green" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right Side: Map & Socials */}
        <div className="map-section">
          <h2>Our Location</h2>
          <p>
            Visit us at our headquarters for a personalized consultation
            with our premium property specialists.
          </p>

          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=Mumbai,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>

          <h2>Social Media</h2>
          <div className="social-icons">
            {/* Dummy Icons simulating FontAwesome or similar */}
            <div className="social-icon">f</div>
            <div className="social-icon">t</div>
            <div className="social-icon">▶</div>
            <div className="social-icon">W</div>
          </div>
        </div>

      </section>

      {/* Footer Banner Section */}
      <section className="footer-banner-section">
        <div className="footer-banner-container">
          <div className="footer-banner-text">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>
              Connect with our elite team of real estate professionals for a private
              consultation tailored to your luxury property needs.
            </p>
            <Link to="/properties" className="footer-cta-btn">
              Explore Properties
            </Link>
          </div>
        </div>
      </section>

    </>
  );
};

export default Contact;
