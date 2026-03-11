// const Contact = () => {
//   return (
//     <>
//       <style>{`
//         /* =====================
//            RESET
//         ===================== */
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: "Segoe UI", sans-serif;
//         }

//         body {
//           overflow-x: hidden;
//         }

//         .container {
//           width: 90%;
//           max-width: 1200px;
//           margin: auto;
//         }

//         /* =====================
//            HERO
//         ===================== */
//         .contact-hero {
//           height: 60vh;
//           background: linear-gradient(
//               rgba(0, 0, 0, 0.6),
//               rgba(0, 0, 0, 0.6)
//             ),
//             url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267")
//               center/cover no-repeat;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           text-align: center;
//         }

//         .contact-hero h1 {
//           font-size: 3.2rem;
//         }

//         .contact-hero p {
//           margin-top: 10px;
//           font-size: 1.1rem;
//           opacity: 0.9;
//         }

//         /* =====================
//            CONTACT INFO
//         ===================== */
//         .contact-info {
//           padding: 80px 0;
//         }

//         .info-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 30px;
//         }

//         .info-box {
//           background: #f9f9f9;
//           padding: 35px;
//           border-radius: 12px;
//           text-align: center;
//           box-shadow: 0 12px 30px rgba(0,0,0,0.08);
//         }

//         .info-box h3 {
//           margin-bottom: 10px;
//         }

//         .info-box p {
//           color: #555;
//           line-height: 1.6;
//         }

//         /* =====================
//            FORM SECTION
//         ===================== */
//         .contact-form-section {
//           padding: 90px 0;
//           background: #f4f4f4;
//         }

//         .form-wrapper {
//           background: #fff;
//           padding: 50px;
//           border-radius: 14px;
//           box-shadow: 0 18px 40px rgba(0,0,0,0.1);
//           max-width: 700px;
//           margin: auto;
//         }

//         .form-wrapper h2 {
//           text-align: center;
//           margin-bottom: 30px;
//           font-size: 2.3rem;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group input,
//         .form-group textarea {
//           width: 100%;
//           padding: 14px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           font-size: 1rem;
//         }

//         .form-group textarea {
//           resize: none;
//           height: 140px;
//         }

//         .form-group input:focus,
//         .form-group textarea:focus {
//           outline: none;
//           border-color: #f5c16c;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 14px;
//           border: none;
//           background: #111;
//           color: #fff;
//           font-size: 1rem;
//           font-weight: bold;
//           border-radius: 30px;
//           cursor: pointer;
//           transition: 0.3s ease;
//         }

//         .submit-btn:hover {
//           background: #f5c16c;
//           color: #111;
//         }

//         /* =====================
//            CTA
//         ===================== */
//         .contact-cta {
//           padding: 80px 20px;
//           background: linear-gradient(135deg, #111, #333);
//           color: #fff;
//           text-align: center;
//         }

//         .contact-cta h2 {
//           font-size: 2.4rem;
//           margin-bottom: 15px;
//         }

//         .contact-cta p {
//           opacity: 0.85;
//           max-width: 600px;
//           margin: auto;
//         }

//         /* =====================
//            RESPONSIVE
//         ===================== */
//         @media (max-width: 768px) {
//           .contact-hero h1 {
//             font-size: 2.4rem;
//           }

//           .form-wrapper {
//             padding: 35px;
//           }
//         }
//       `}</style>

//       {/* ===================== HERO ===================== */}
//       <section className="contact-hero">
//         <div>
//           <h1>Contact Propzo</h1>
//           <p>Your trusted partner in smarter real-estate decisions</p>
//         </div>
//       </section>

//       {/* ===================== CONTACT INFO ===================== */}
//       <section className="contact-info">
//         <div className="container info-grid">
//           <div className="info-box">
//             <h3>📍 Our Office</h3>
//             <p>Mumbai, India<br />Serving clients nationwide</p>
//           </div>

//           <div className="info-box">
//             <h3>📞 Call Us</h3>
//             <p>+91 98765 43210<br />Mon – Sat, 9AM – 6PM</p>
//           </div>

//           <div className="info-box">
//             <h3>✉ Email</h3>
//             <p>prpzoestate@gmail.com<br />We reply within 24 hours</p>
//           </div>
//         </div>
//       </section>

//       {/* ===================== FORM ===================== */}
//       <section className="contact-form-section">
//         <div className="form-wrapper">
//           <h2>Get In Touch</h2>

//           <form>
//             <div className="form-group">
//               <input type="text" placeholder="Full Name" required />
//             </div>

//             <div className="form-group">
//               <input type="email" placeholder="Email Address" required />
//             </div>

//             <div className="form-group">
//               <input type="text" placeholder="Phone Number" />
//             </div>

//             <div className="form-group">
//               <textarea placeholder="Your Message"></textarea>
//             </div>

//             <button className="submit-btn">Send Message</button>
//           </form>
//         </div>
//       </section>

//       {/* ===================== CTA ===================== */}
//       <section className="contact-cta">
//         <h2>Let’s Build Your Property Future</h2>
//         <p>
//           Whether buying, selling, or investing — Propzo is here to guide you
//           every step of the way.
//         </p>
//       </section>
//     </>
//   );
// };

// export default Contact;
import { useState } from "react";
import axios from "axios";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

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

      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      setSuccess("Message sent successfully ✅");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Segoe UI;
        }

        .container{
          width:90%;
          max-width:1200px;
          margin:auto;
        }

        .contact-hero{
          height:60vh;
          background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),
          url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267")
          center/cover no-repeat;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          text-align:center;
        }

        .contact-hero h1{
          font-size:3rem;
        }

        .contact-info{
          padding:70px 0;
        }

        .info-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:30px;
        }

        .info-box{
          background:#f9f9f9;
          padding:35px;
          border-radius:12px;
          text-align:center;
          box-shadow:0 12px 30px rgba(0,0,0,0.08);
        }

        .contact-form-section{
          padding:80px 0;
          background:#f4f4f4;
        }

        .form-wrapper{
          background:#fff;
          padding:50px;
          border-radius:12px;
          box-shadow:0 18px 40px rgba(0,0,0,0.1);
          max-width:650px;
          margin:auto;
        }

        .form-wrapper h2{
          text-align:center;
          margin-bottom:25px;
        }

        .form-group{
          margin-bottom:18px;
        }

        .form-group input,
        .form-group textarea{
          width:100%;
          padding:14px;
          border-radius:8px;
          border:1px solid #ccc;
          font-size:1rem;
        }

        .submit-btn{
          width:100%;
          padding:14px;
          border:none;
          background:#111;
          color:#fff;
          border-radius:30px;
          cursor:pointer;
          font-weight:bold;
        }

        .submit-btn:hover{
          background:#f5c16c;
          color:#111;
        }

        .success{
          text-align:center;
          color:green;
          margin-bottom:15px;
          font-weight:bold;
        }

        .contact-cta{
          padding:80px 20px;
          background:linear-gradient(135deg,#111,#333);
          color:#fff;
          text-align:center;
        }

      `}</style>

      {/* HERO */}
      <section className="contact-hero">
        <div>
          <h1>Contact Propzo</h1>
          <p>Your trusted partner in smarter real-estate decisions</p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="contact-info">
        <div className="container info-grid">

          <div className="info-box">
            <h3>📍 Our Office</h3>
            <p>Mumbai, India<br />Serving clients nationwide</p>
          </div>

          <div className="info-box">
            <h3>📞 Call Us</h3>
            <p>+91 98765 43210<br />Mon – Sat, 9AM – 6PM</p>
          </div>

          <div className="info-box">
            <h3>✉ Email</h3>
            <p>prpzoestate@gmail.com<br />We reply within 24 hours</p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <div className="form-wrapper">

          <h2>Get In Touch</h2>

          {success && <p className="success">{success}</p>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="submit-btn">
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <h2>Let’s Build Your Property Future</h2>
        <p>
          Whether buying, selling, or investing — Propzo is here to guide you
          every step of the way.
        </p>
      </section>

    </>
  );
};

export default Contact;