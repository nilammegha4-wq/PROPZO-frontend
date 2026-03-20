import React from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

  .why-section {
    padding: 100px 5% 60px;
    background-color: #faf9f6;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
  }

  .why-header {
    text-align: left;
    max-width: 1200px;
    margin: 0 auto 40px;
  }

  .why-title {
    font-size: clamp(32px, 4vw, 42px);
    font-weight: 500;
    color: #1a1a1a;
    letter-spacing: -0.02em;
  }

  .why-title span {
    color: #8c7851;
  }

  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 992px) {
    .why-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 650px) {
    .why-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Base Card Styles */
  .why-card {
    border-radius: 16px;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .why-card-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
    color: inherit;
    z-index: 2;
  }

  .why-card-desc {
    font-size: 13px;
    line-height: 1.6;
    z-index: 2;
    opacity: 0.8;
  }

  /* Card 1: Top Left */
  .card-1 {
    background: linear-gradient(145deg, #eaddc9, #e2d1bb);
    color: #1a1a1a;
  }
  .card-1::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, #523a28, transparent);
    opacity: 0.2;
    border-radius: 50%;
    z-index: 1;
  }

  /* Card 2: Top Middle */
  .card-2 {
    background: linear-gradient(145deg, #eee3d5, #ebdcca);
    color: #1a1a1a;
  }
  .card-2::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 40%;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, #8c7851, transparent);
    opacity: 0.4;
    border-radius: 50%;
    z-index: 1;
  }

  /* Card 3: Right Tall */
  .card-3 {
    grid-row: span 2;
    background: linear-gradient(180deg, #6c5438, #2a2015);
    color: #ffffff;
    justify-content: flex-start;
    padding-top: 60px;
  }
  @media (max-width: 992px) {
    .card-3 {
      grid-row: span 1;
    }
  }

  /* Card 4: Bottom Wide */
  .card-4 {
    grid-column: span 2;
    background-color: #2a2015;
    color: #ffffff;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 40px;
    min-height: 280px;
  }
  .card-4 .bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    z-index: 0;
  }
  .card-4 .why-card-title,
  .card-4 .why-card-desc {
    position: relative;
    z-index: 2;
    max-width: 500px;
  }
  @media (max-width: 992px) {
    .card-4 {
      grid-column: span 2;
    }
  }
  @media (max-width: 650px) {
    .card-4 {
      grid-column: span 1;
    }
  }
`;

export default function WhyChoosePropZo() {
  return (
    <>
      <style>{css}</style>
      <section className="why-section">
        <div className="why-header">
          <h2 className="why-title">Why <span>Choose PropZo</span></h2>
        </div>

        <div className="why-grid">
          
          {/* Card 1: Trusted Listings */}
          <div className="why-card card-1">
            <h3 className="why-card-title">Trusted Listings</h3>
            <p className="why-card-desc">
              Every property is verified by our team and listed by certified sellers — giving you accurate information and complete peace of mind.
            </p>
          </div>

          {/* Card 2: Premium Support */}
          <div className="why-card card-2">
            <h3 className="why-card-title">Premium Support</h3>
            <p className="why-card-desc">
              Our dedicated advisors are always on hand to assist with queries, property viewings, and every step of the buying process.
            </p>
          </div>

          {/* Card 3: Secure Transactions (Tall) */}
          <div className="why-card card-3">
            <h3 className="why-card-title">Secure<br />Transactions</h3>
            <p className="why-card-desc" style={{ marginTop: '20px' }}>
              End-to-end legal support and secure payment infrastructure ensure every deal is seamless and fully protected matching our quality standards.
            </p>
            
            <div style={{ marginTop: 'auto', textAlign: 'left', width: '100%' }}>
               <h3 className="why-card-title" style={{ fontSize: '15px', textAlign: 'left' }}>Smart Search</h3>
               <p className="why-card-desc" style={{ textAlign: 'left' }}>
                  Advanced filters and intelligent recommendations surface the properties that match your exact needs — fast.
               </p>
            </div>
          </div>

          {/* Card 4: Superior Quality (Wide) */}
          <div className="why-card card-4">
            <img src="/Modernhouse.jpg" alt="Interior" className="bg-image" />
            <h3 className="why-card-title">Superior Properties</h3>
            <p className="why-card-desc">
              Our partnerships with the best vendors grant us access to the finest materials, craftsmanship, and quality processes.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
