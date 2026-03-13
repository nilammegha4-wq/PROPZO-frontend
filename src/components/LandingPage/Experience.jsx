// import React from 'react';
// import { Link } from 'react-router-dom';

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

//   .exp-section {
//     padding: 100px 5%;
//     background-color: #ffffff;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a1a1a;
//   }

//   .exp-heading-container {
//     text-align: center;
//     margin-bottom: 60px;
//   }

//   .exp-main-heading {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(36px, 4vw, 56px);
//     font-weight: 500;
//     line-height: 1.1;
//     color: #1a1a1a;
//     max-width: 600px;
//     margin: 0 auto;
//     letter-spacing: -0.02em;
//   }

//   .exp-content-grid {
//     display: grid;
//     grid-template-columns: 1fr 1.3fr 1fr;
//     gap: 40px;
//     align-items: center;
//     max-width: 1200px;
//     margin: 0 auto;
//   }

//   @media (max-width: 992px) {
//     .exp-content-grid {
//       grid-template-columns: 1fr;
//       gap: 50px;
//     }

//     .exp-left { order: 2; }
//     .exp-right { order: 3; }
//     .exp-center { order: 1; }
//   }

//   /* Left Column */
//   .exp-left {
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 100%;
//   }

//   .exp-left-top {
//     margin-bottom: 40px;
//   }

//   .exp-sub-heading {
//     font-size: 24px;
//     font-weight: 600;
//     line-height: 1.3;
//     margin-bottom: 20px;
//     color: #1a1a1a;
//     letter-spacing: -0.01em;
//   }

//   .exp-paragraph {
//     font-size: 15px;
//     color: #666;
//     line-height: 1.6;
//     margin-bottom: 30px;
//     font-weight: 400;
//   }

//   .exp-btn {
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     padding: 14px 32px;
//     background-color: #1a1a1a;
//     color: #ffffff;
//     border-radius: 30px;
//     font-size: 14px;
//     font-weight: 500;
//     text-decoration: none;
//     transition: all 0.3s ease;
//     border: none;
//     cursor: pointer;
//     width: fit-content;
//   }

//   .exp-btn:hover {
//     background-color: #333;
//     transform: translateY(-2px);
//   }

//   .exp-partners {
//     margin-top: auto;
//   }

//   .exp-partners-title {
//     font-size: 14px;
//     font-weight: 600;
//     margin-bottom: 15px;
//     color: #1a1a1a;
//   }

//   .exp-partners-logos {
//     display: flex;
//     gap: 20px;
//     align-items: center;
//     flex-wrap: wrap;
//   }

//   .exp-logo-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     font-size: 13px;
//     color: #666;
//     font-weight: 500;
//   }

//   .exp-logo-icon {
//     width: 20px;
//     height: 20px;
//     background-color: #f0f0f0;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #1a1a1a;
//     font-size: 10px;
//   }

//   /* Center Column */
//   .exp-center {
//     width: 100%;
//     height: 100%;
//     min-height: 440px;
//     border-radius: 20px;
//     overflow: hidden;
//     position: relative;
//     box-shadow: 0 20px 40px rgba(0,0,0,0.1);
//   }

//   .exp-image {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     position: absolute;
//     top: 0;
//     left: 0;
//   }

//   /* Right Column */
//   .exp-right {
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     padding-left: 20px;
//   }

//   @media (max-width: 992px) {
//     .exp-right { padding-left: 0; }
//   }

//   .exp-feature {
//     margin-bottom: 20px;
//   }

//   .exp-feature-title {
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a1a1a;
//     margin-bottom: 10px;
//   }

//   .exp-feature-desc {
//     font-size: 14px;
//     color: #888;
//     line-height: 1.6;
//   }

//   .exp-divider {
//     height: 1px;
//     background-color: #eaeaea;
//     margin: 20px 0;
//     width: 100%;
//   }

//   .exp-reviews {
//     margin-top: auto;
//   }

//   .exp-reviews-title {
//     font-size: 14px;
//     font-weight: 500;
//     color: #888;
//     margin-bottom: 15px;
//   }

//   .exp-reviews-content {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//   }

//   .exp-avatars {
//     display: flex;
//   }

//   .exp-avatar {
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     border: 2px solid #fff;
//     background-color: #ddd;
//     margin-left: -12px;
//     position: relative;
//     overflow: hidden;
//   }

//   .exp-avatar img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   .exp-avatar:first-child {
//     margin-left: 0;
//     z-index: 3;
//   }
//   .exp-avatar:nth-child(2) { z-index: 2; }
//   .exp-avatar:nth-child(3) { z-index: 1; }

//   .exp-rating {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .exp-star-icon {
//     width: 36px;
//     height: 36px;
//     background-color: #1a1a1a;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #fff;
//     font-size: 14px;
//   }

//   .exp-rating-text {
//     display: flex;
//     flex-direction: column;
//   }

//   .exp-rating-score {
//     font-size: 16px;
//     font-weight: 600;
//     color: #1a1a1a;
//     line-height: 1.2;
//   }

//   .exp-rating-label {
//     font-size: 12px;
//     color: #888;
//   }
// `;

// export default function Experience() {
//   return (
//     <>
//       <style>{css}</style>
//       <section className="exp-section">
//         <div className="exp-heading-container">
//           <h2 className="exp-main-heading">
//             Experience Excellence<br />
//             In Real Estate
//           </h2>
//         </div>

//         <div className="exp-content-grid">

//           {/* LEFT COLUMN */}
//           <div className="exp-left">
//             <div className="exp-left-top">
//               <h3 className="exp-sub-heading">
//                 Your Trusted Partner in Finding the Perfect Home
//               </h3>
//               <p className="exp-paragraph">
//                 At PropZo Real Estate, we believe that buying or selling a home should be an exciting and stress-free experience.
//               </p>
//               <Link to="/about" className="exp-btn" style={{ textDecoration: 'none' }}>About Us</Link>
//             </div>

//             <div className="exp-partners">
//               <h4 className="exp-partners-title">Our Partner:</h4>
//               <div className="exp-partners-logos">
//                 <div className="exp-logo-item">
//                   <div className="exp-logo-icon">○</div>
//                   Polymath
//                 </div>
//                 <div className="exp-logo-item">
//                   <div className="exp-logo-icon">⬡</div>
//                   Boltshift
//                 </div>
//                 <div className="exp-logo-item">
//                   <div className="exp-logo-icon">✧</div>
//                   Quotient
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* CENTER IMAGE */}
//           <div className="exp-center">
//             <img 
//               src="/7.jpg" 
//               alt="Luxury home at sunset" 
//               className="exp-image"
//             />
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="exp-right">
//             <div className="exp-feature">
//               <h4 className="exp-feature-title">Expert Guidance</h4>
//               <p className="exp-feature-desc">
//                 Our experienced agents provide professional advice and personalized support.
//               </p>
//             </div>

//             <div className="exp-divider"></div>

//             <div className="exp-feature">
//               <h4 className="exp-feature-title">Wide Property Selection</h4>
//               <p className="exp-feature-desc">
//                 From luxury homes to budget-friendly apartments, we have something for everyone.
//               </p>
//             </div>

//             <div className="exp-divider"></div>

//             <div className="exp-reviews">
//               <h4 className="exp-reviews-title">Reviews:</h4>
//               <div className="exp-reviews-content">
//                 <div className="exp-avatars">
//                   <div className="exp-avatar">
//                     <img src="https://i.pravatar.cc/100?img=33" alt="User" />
//                   </div>
//                   <div className="exp-avatar">
//                     <img src="https://i.pravatar.cc/100?img=47" alt="User" />
//                   </div>
//                   <div className="exp-avatar">
//                     <img src="https://i.pravatar.cc/100?img=12" alt="User" />
//                   </div>
//                 </div>

//                 <div className="exp-rating">
//                   <div className="exp-star-icon">★</div>
//                   <div className="exp-rating-text">
//                     <span className="exp-rating-score">4.9</span>
//                     <span className="exp-rating-label">Customer Ratings</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .exp-section {
    padding: 100px 5%;
    background-color: #f5f0e8;
    font-family: 'DM Sans', sans-serif;
    color: #2c1a10;
  }

  .exp-heading-container {
    text-align: center;
    margin-bottom: 60px;
  }

  .exp-main-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 500;
    line-height: 1.1;
    color: #4C3324;
    max-width: 600px;
    margin: 0 auto;
    letter-spacing: -0.02em;
  }

  .exp-content-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    gap: 40px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 992px) {
    .exp-content-grid {
      grid-template-columns: 1fr;
      gap: 50px;
    }
    .exp-left { order: 2; }
    .exp-right { order: 3; }
    .exp-center { order: 1; }
  }

  /* Left Column */
  .exp-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .exp-left-top {
    margin-bottom: 40px;
  }

  .exp-sub-heading {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 20px;
    color: #4C3324;
    letter-spacing: -0.01em;
  }

  .exp-paragraph {
    font-size: 15px;
    color: #7a5c4a;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 400;
  }

  .exp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background-color: #4C3324;
    color: #E4CBB6;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    width: fit-content;
  }

  .exp-btn:hover {
    background-color: #627B68;
    color: #fff;
    transform: translateY(-2px);
  }

  .exp-partners {
    margin-top: auto;
  }

  .exp-partners-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #4C3324;
  }

  .exp-partners-logos {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }

  .exp-logo-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #7a5c4a;
    font-weight: 500;
  }
  
  .exp-logo-icon {
    width: 20px;
    height: 20px;
    background-color: rgba(178,132,107,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #B2846B;
    font-size: 10px;
  }

  /* Center Column */
  .exp-center {
    width: 100%;
    height: 100%;
    min-height: 440px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 20px 40px rgba(76,51,36,0.15);
  }

  .exp-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Right Column */
  .exp-right {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
  }

  @media (max-width: 992px) {
    .exp-right { padding-left: 0; }
  }

  .exp-feature {
    margin-bottom: 20px;
  }

  .exp-feature-title {
    font-size: 16px;
    font-weight: 600;
    color: #4C3324;
    margin-bottom: 10px;
  }

  .exp-feature-desc {
    font-size: 14px;
    color: #9a7060;
    line-height: 1.6;
  }

  .exp-divider {
    height: 1px;
    background-color: rgba(178,132,107,0.20);
    margin: 20px 0;
    width: 100%;
  }

  .exp-reviews {
    margin-top: auto;
  }

  .exp-reviews-title {
    font-size: 14px;
    font-weight: 500;
    color: #9a7060;
    margin-bottom: 15px;
  }

  .exp-reviews-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .exp-avatars {
    display: flex;
  }

  .exp-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #f5f0e8;
    background-color: #E4CBB6;
    margin-left: -12px;
    position: relative;
    overflow: hidden;
  }
  
  .exp-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .exp-avatar:first-child { margin-left: 0; z-index: 3; }
  .exp-avatar:nth-child(2) { z-index: 2; }
  .exp-avatar:nth-child(3) { z-index: 1; }

  .exp-rating {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .exp-star-icon {
    width: 36px;
    height: 36px;
    background-color: #627B68;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
  }

  .exp-rating-text {
    display: flex;
    flex-direction: column;
  }

  .exp-rating-score {
    font-size: 16px;
    font-weight: 600;
    color: #4C3324;
    line-height: 1.2;
  }

  .exp-rating-label {
    font-size: 12px;
    color: #9a7060;
  }
`;

export default function Experience() {
  return (
    <>
      <style>{css}</style>
      <section className="exp-section">
        <div className="exp-heading-container">
          <h2 className="exp-main-heading">
            Experience Excellence<br />
            In Real Estate
          </h2>
        </div>

        <div className="exp-content-grid">

          {/* LEFT COLUMN */}
          <div className="exp-left">
            <div className="exp-left-top">
              <h3 className="exp-sub-heading">
                Your Trusted Partner in Finding the Perfect Home
              </h3>
              <p className="exp-paragraph">
                At PropZo Real Estate, we believe that buying or selling a home should be an exciting and stress-free experience.
              </p>
              <Link to="/about" className="exp-btn" style={{ textDecoration: 'none' }}>About Us</Link>
            </div>

            <div className="exp-partners">
              <h4 className="exp-partners-title">Our Partner:</h4>
              <div className="exp-partners-logos">
                <div className="exp-logo-item">
                  <div className="exp-logo-icon">○</div>
                  Polymath
                </div>
                <div className="exp-logo-item">
                  <div className="exp-logo-icon">⬡</div>
                  Boltshift
                </div>
                <div className="exp-logo-item">
                  <div className="exp-logo-icon">✧</div>
                  Quotient
                </div>
              </div>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="exp-center">
            <img
              src="/7.jpg"
              alt="Luxury home at sunset"
              className="exp-image"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="exp-right">
            <div className="exp-feature">
              <h4 className="exp-feature-title">Expert Guidance</h4>
              <p className="exp-feature-desc">
                Our experienced agents provide professional advice and personalized support.
              </p>
            </div>

            <div className="exp-divider"></div>

            <div className="exp-feature">
              <h4 className="exp-feature-title">Wide Property Selection</h4>
              <p className="exp-feature-desc">
                From luxury homes to budget-friendly apartments, we have something for everyone.
              </p>
            </div>

            <div className="exp-divider"></div>

            <div className="exp-reviews">
              <h4 className="exp-reviews-title">Reviews:</h4>
              <div className="exp-reviews-content">
                <div className="exp-avatars">
                  <div className="exp-avatar">
                    <img src="https://i.pravatar.cc/100?img=33" alt="User" />
                  </div>
                  <div className="exp-avatar">
                    <img src="https://i.pravatar.cc/100?img=47" alt="User" />
                  </div>
                  <div className="exp-avatar">
                    <img src="https://i.pravatar.cc/100?img=12" alt="User" />
                  </div>
                </div>

                <div className="exp-rating">
                  <div className="exp-star-icon">★</div>
                  <div className="exp-rating-text">
                    <span className="exp-rating-score">4.9</span>
                    <span className="exp-rating-label">Customer Ratings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
