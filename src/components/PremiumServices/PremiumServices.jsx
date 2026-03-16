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
    <div className="premium-services-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        :root {
          --primary: #819B8B;
          --primary-dark: #627B68;
          --secondary: #4C3324;
          --accent: #B2846B;
          --dark: #2A1A10;
          --light: #F5EDE6;
          --gray: #6B5E58;
          --white: #ffffff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        body { background: var(--dark); color: var(--light); line-height: 1.6; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 300; line-height: 1.1; }

        /* HERO SECTION */
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 80px 0;
          background-image: url("/PremiumServices.jpg");
          background-size: cover;
          background-position: center;
          color: white;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(76,51,36,0.85) 0%, rgba(98,123,104,0.6) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin-left: 10%;
        }

        .hero h1 {
          font-size: clamp(3.5rem, 8vw, 5rem);
          color: var(--light);
          margin-bottom: 20px;
        }

        .hero span {
          color: #E4CBB6;
          font-size: 1.3rem;
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* SERVICES GRID */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 40px;
          padding: 100px 0;
        }

        /* SERVICE CARD */
        .service-card {
          background: #3A2218;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(178, 132, 107, 0.15);
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          border-color: var(--accent);
        }

        .card-image {
          height: 300px;
          overflow: hidden;
          position: relative;
        }

        .card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(42,26,16,0.4));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .service-card:hover .card-image::after { opacity: 1; }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          filter: sepia(0.1);
        }

        .service-card:hover .card-image img { transform: scale(1.1); }

        .card-content { padding: 40px; flex: 1; display: flex; flex-direction: column; }

        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 300;
          margin-bottom: 15px;
          color: var(--accent);
          letter-spacing: 0.01em;
        }

        .service-description {
          color: var(--primary);
          margin-bottom: 35px;
          line-height: 1.7;
          flex-grow: 1;
          font-size: 1.1rem;
          font-weight: 300;
        }

        .service-btn {
          padding: 16px 36px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(135deg, var(--accent) 0%, var(--primary-dark) 100%);
          color: var(--light);
          text-decoration: none;
          text-align: center;
          display: inline-block;
          transition: 0.3s;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.9rem;
          box-shadow: 0 6px 18px rgba(98,123,104,0.2);
        }

        .service-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(98,123,104,0.3);
          color: white;
        }

        @media (max-width: 768px) {
          .hero-content { margin-left: 5%; }
          .hero h1 { font-size: 3rem; }
          .services-grid { grid-template-columns: 1fr; padding: 60px 0; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Real <br /> Estate Services</h1>
          <span>Transform your property experience with curated excellence</span>
        </div>
      </section>

      {/* SERVICES GRID */}
      <div className="container">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="card-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="card-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <NavLink to={service.link} className="service-btn">
                  {service.buttonText}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
