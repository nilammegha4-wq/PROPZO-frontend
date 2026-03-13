// import React from "react";
// import { NavLink } from "react-router-dom";

// /* =========================
//    REAL ESTATE SERVICES DATA
// ========================= */
// const services = [
//   {
//     id: 1,
//     title: "Luxury Interior Design",
//     description:
//       "Transform your property with bespoke interior designs tailored to your lifestyle.",
//     image:
//       "https://luxdubaiinteriors.ae/wp-content/uploads/2025/08/4.jpg",
//     buttonText: "Explore Design",
//     link: "/explore-design",
//   },
//   {
//     id: 2,
//     title: "Property Financing",
//     description:
//       "Flexible mortgage and financing options to make your dream home a reality.",
//     image:
//       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
//     buttonText: "Get Started",
//     link: "/financing",
//   },
//   {
//     id: 3,
//     title: "Property Inspection",
//     description:
//       "Comprehensive inspections to ensure your investment is safe and sound.",
//     image:
//       "https://demo5.websites.quickinspect.net/wp-content/uploads/2023/11/Commercial-Building-Inspection-101-What-Inspectors-Look-For-Blog-Google-Image.jpg",
//     buttonText: "Book Inspection",
//     link: "/inspection",
//   },
//   {
//     id: 4,
//     title: "Legal & Documentation",
//     description:
//       "Expert legal assistance for property agreements, contracts, and paperwork.",
//     image:
//       "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
//     buttonText: "Consult Now",
//     link: "/legal",
//   },
//   {
//     id: 5,
//     title: "Relocation & Moving",
//     description:
//       "Seamless moving services so you can settle into your new home stress-free.",
//     image:
//       "https://media.istockphoto.com/id/591429236/photo/movers-carrying-sofa-outside-truck-on-street.jpg?s=612x612&w=0&k=20&c=ohPmE-f5KfhHqtLY8J66CErqsS4zWwnuplSsielchiM=",
//     buttonText: "Schedule Move",
//     link: "/moving",
//   },
//   {
//     id: 6,
//     title: "Home Maintenance",
//     description:
//       "Reliable repair, cleaning, and upkeep services to maintain your property's value.",
//     image:
//       "https://i0.wp.com/fawnridge.org/wp-content/uploads/2024/09/home-improvements-2.jpg?fit=801%2C599&ssl=1",
//     buttonText: "Book Service",
//     link: "/maintenance",
//   },
// ];

// export default function PremiumRealEstateServices() {
//   return (
//     <>
//       <style>{`
//         * {
//           box-sizing: border-box;
//           font-family: "'DM Sans', sans-serif";
//         }

//         body {
//           margin: 0;
//           background: #0a0c09;
//         }

//         .container {
//           width: 90%;
//           max-width: 1200px;
//           margin: auto;
//         }

//         /* ================= HERO ================= */
//         .hero {
//           position: relative;
//           min-height: 85vh;
//           display: flex;
//           align-items: center;
//           justify-content: flex-start;
//           padding-left: 10%;
//           color: #f5f0e8;
//         }

//         .hero h1 {
//           font-family: "'Cormorant Garamond', serif";
//           font-size: 4rem;
//           font-weight: 300;
//         }

//         .hero::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.6);
//           z-index: 1;
//         }

//         .hero-content {
//           position: relative;
//           z-index: 2;
//           max-width: 650px;
//         }

//         @media (max-width: 768px) {
//           .hero h1 { font-size: 2.5rem !important; }
//           .hero { min-height: 50vh !important; padding-left: 5% !important; }
//           .services-grid { 
//             grid-template-columns: 1fr !important;
//             padding: 20px 0 !important;
//           }
//         }

//         /* ================= GRID ================= */
//         .services-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
//           gap: 40px;
//           padding: 80px 0;
//         }

//         /* ================= CARD ================= */
//         .service-card {
//           background: #111309;
//           border-radius: 4px; /* More sophisticated squared edges */
//           overflow: hidden;
//           transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
//           display: flex;
//           flex-direction: column;
//           border: 1px solid rgba(184, 150, 90, 0.15);
//           position: relative;
//         }

//         .service-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
//           border-color: rgba(184, 150, 90, 0.4);
//         }

//         .card-image {
//           height: 280px;
//           overflow: hidden;
//           position: relative;
//         }

//         .card-image::after {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .service-card:hover .card-image::after {
//           opacity: 1;
//         }

//         .card-image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.6s ease;
//         }

//         .service-card:hover .card-image img {
//           transform: scale(1.08);
//         }

//         .card-content {
//           padding: 35px;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         .service-title {
//           font-family: "'Cormorant Garamond', serif";
//           font-size: 1.8rem;
//           font-weight: 400;
//           margin-bottom: 15px;
//           color: #b8965a;
//           letter-spacing: 0.02em;
//         }

//         .service-description {
//           color: #7a7670;
//           margin-bottom: 30px;
//           line-height: 1.7;
//           flex-grow: 1;
//           font-size: 1.05rem;
//           font-family: "'DM Sans', sans-serif";
//         }

//         .service-btn {
//           padding: 16px 36px;
//           border-radius: 2px; /* Consistent with buttons in theme */
//           border: none;
//           font-weight: 500;
//           cursor: pointer;
//           background: #b8965a;
//           color: #0a0c09;
//           text-decoration: none;
//           text-align: center;
//           display: inline-block;
//           transition: all 0.3s ease;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           font-size: 0.9rem;
//         }

//         .service-btn:hover {
//           background: #d4b483;
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(184, 150, 90, 0.2);
//         }
//       `}</style>

//       {/* ================= HERO ================= */}
//       <section
//         className="hero"
//         style={{
//           backgroundImage: `url(/PremiumServices.jpg)`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="hero-content">
//           <h1>Premium Real Estate Services</h1>
//           <span>Transform your property experience with luxury services</span>
//         </div>
//       </section>

//       {/* ================= SERVICES ================= */}
//       <div className="container">
//         <div className="services-grid">
//           {services.map((service) => (
//             <ServiceCard key={service.id} {...service} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// /* ================= CARD ================= */
// const ServiceCard = ({
//   image,
//   title,
//   description,
//   buttonText,
//   link,
// }) => (
//   <div className="service-card">
//     <div className="card-image">
//       <img src={image} alt={title} />
//     </div>

//     <div className="card-content">
//       <div className="service-title">{title}</div>

//       <div className="service-description">{description}</div>

//       {/* NavLink Button */}
//       <NavLink to={link} className="service-btn">
//         {buttonText}
//       </NavLink>
//     </div>
//   </div>
// );
import React from "react";
import { NavLink } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Luxury Interior Design",
    description:
      "Transform your property with bespoke interior designs tailored to your lifestyle.",
    image:
      "https://luxdubaiinteriors.ae/wp-content/uploads/2025/08/4.jpg",
    buttonText: "Explore Design",
    link: "/explore-design",
  },
  {
    id: 2,
    title: "Property Financing",
    description:
      "Flexible mortgage and financing options to make your dream home a reality.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Get Started",
    link: "/financing",
  },
  {
    id: 3,
    title: "Property Inspection",
    description:
      "Comprehensive inspections to ensure your investment is safe and sound.",
    image:
      "https://demo5.websites.quickinspect.net/wp-content/uploads/2023/11/Commercial-Building-Inspection-101-What-Inspectors-Look-For-Blog-Google-Image.jpg",
    buttonText: "Book Inspection",
    link: "/inspection",
  },
  {
    id: 4,
    title: "Legal & Documentation",
    description:
      "Expert legal assistance for property agreements, contracts, and paperwork.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Consult Now",
    link: "/legal",
  },
  {
    id: 5,
    title: "Relocation & Moving",
    description:
      "Seamless moving services so you can settle into your new home stress-free.",
    image:
      "https://media.istockphoto.com/id/591429236/photo/movers-carrying-sofa-outside-truck-on-street.jpg?s=612x612&w=0&k=20&c=ohPmE-f5KfhHqtLY8J66CErqsS4zWwnuplSsielchiM=",
    buttonText: "Schedule Move",
    link: "/moving",
  },
  {
    id: 6,
    title: "Home Maintenance",
    description:
      "Reliable repair, cleaning, and upkeep services to maintain your property's value.",
    image:
      "https://i0.wp.com/fawnridge.org/wp-content/uploads/2024/09/home-improvements-2.jpg?fit=801%2C599&ssl=1",
    buttonText: "Book Service",
    link: "/maintenance",
  },
];

export default function PremiumRealEstateServices() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
        }

        body {
          margin: 0;
          /* Deep brown as dark base — stays close to original dark feel */
          background: #2A1A10;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
        }

        /* ================= HERO ================= */
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 10%;
          color: #F5EDE6;
        }

        .hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 300;
          /* Blush warm white for heading */
          color: #F5EDE6;
          margin-bottom: 16px;
        }

        .hero span {
          color: #E4CBB6;
          font-size: 1.1rem;
          font-weight: 400;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          /* Earthy overlay: deep brown tinted */
          background: linear-gradient(160deg, rgba(76,51,36,0.7) 0%, rgba(98,123,104,0.5) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem !important; }
          .hero { min-height: 50vh !important; padding-left: 5% !important; }
          .services-grid {
            grid-template-columns: 1fr !important;
            padding: 20px 0 !important;
          }
        }

        /* ================= GRID ================= */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 40px;
          padding: 80px 0;
        }

        /* ================= CARD ================= */
        .service-card {
          /* Warm dark card: slightly lighter than bg */
          background: #3A2218;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          /* Terracotta border hint */
          border: 1px solid rgba(178, 132, 107, 0.2);
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(76,51,36,0.5);
          border-color: rgba(178, 132, 107, 0.5);
        }

        .card-image {
          height: 280px;
          overflow: hidden;
          position: relative;
        }

        .card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(42,26,16,0.35));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .service-card:hover .card-image::after {
          opacity: 1;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          filter: sepia(0.12);
        }

        .service-card:hover .card-image img {
          transform: scale(1.08);
        }

        .card-content {
          padding: 35px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 15px;
          /* Terracotta accent for titles */
          color: #B2846B;
          letter-spacing: 0.02em;
        }

        .service-description {
          /* Muted sage-toned text */
          color: #819B8B;
          margin-bottom: 30px;
          line-height: 1.7;
          flex-grow: 1;
          font-size: 1.05rem;
        }

        .service-btn {
          padding: 16px 36px;
          border-radius: 2px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          /* Terracotta → sage gradient button */
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: #FDFAF8;
          text-decoration: none;
          text-align: center;
          display: inline-block;
          transition: all 0.3s ease;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 0.9rem;
          box-shadow: 0 6px 18px rgba(98,123,104,0.3);
        }

        .service-btn:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(98,123,104,0.4);
        }
      `}</style>

      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(/PremiumServices.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content">
          <h1>Premium Real Estate Services</h1>
          <span>Transform your property experience with luxury services</span>
        </div>
      </section>

      {/* SERVICES GRID */}
      <div className="container">
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </>
  );
}

const ServiceCard = ({ image, title, description, buttonText, link }) => (
  <div className="service-card">
    <div className="card-image">
      <img src={image} alt={title} />
    </div>
    <div className="card-content">
      <div className="service-title">{title}</div>
      <div className="service-description">{description}</div>
      <NavLink to={link} className="service-btn">
        {buttonText}
      </NavLink>
    </div>
  </div>
);
