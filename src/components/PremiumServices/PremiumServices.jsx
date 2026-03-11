import React from "react";
import { NavLink } from "react-router-dom";

/* =========================
   REAL ESTATE SERVICES DATA
========================= */
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
        * {
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif;
        }

        body {
          margin: 0;
          background: #f4f6fb;
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
          color: #ffffff;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
        }

        .hero h1 {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .hero span {
          font-size: 1.3rem;
        }

        /* ================= SERVICES GRID ================= */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin: 80px 0;
        }

        /* ================= CARD ================= */
        .service-card {
          background: #ffffff;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-10px);
        }

        .card-image {
          height: 250px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .service-description {
          color: #555;
          margin-bottom: 25px;
          line-height: 1.6;
          flex-grow: 1;
        }

        .service-btn {
          padding: 13px 32px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(90deg, #6a5af9, #00d2ff);
          color: white;
          text-decoration: none;
          text-align: center;
          display: inline-block;
        }

        .service-btn:hover {
          background: linear-gradient(90deg, #00d2ff, #6a5af9);
        }
      `}</style>

      {/* ================= HERO ================= */}
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

      {/* ================= SERVICES ================= */}
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

/* ================= CARD ================= */
const ServiceCard = ({
  image,
  title,
  description,
  buttonText,
  link,
}) => (
  <div className="service-card">
    <div className="card-image">
      <img src={image} alt={title} />
    </div>

    <div className="card-content">
      <div className="service-title">{title}</div>

      <div className="service-description">{description}</div>

      {/* NavLink Button */}
      <NavLink to={link} className="service-btn">
        {buttonText}
      </NavLink>
    </div>
  </div>
);
