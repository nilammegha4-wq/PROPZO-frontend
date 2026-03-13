// import React, { useState, useEffect } from "react";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

//   .feedback-section {
//     padding: 100px 5%;
//     font-family: 'Outfit', sans-serif;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     max-width: 1200px;
//     margin: 0 auto;
//     position: relative;
//     gap: 50px;
//     background-color: #faf9f6;
//   }

//   .feedback-wrapper {
//     background-color: #faf9f6;
//     width: 100%;
//   }

//   @media (max-width: 992px) {
//     .feedback-section {
//       flex-direction: column;
//       text-align: left;
//     }
//   }

//   .feedback-left {
//     flex: 1;
//     max-width: 450px;
//   }

//   .feedback-title {
//     font-size: clamp(36px, 4vw, 48px);
//     font-weight: 700;
//     color: #1a1a1a;
//     line-height: 1.2;
//     margin-bottom: 20px;
//     letter-spacing: -0.02em;
//   }

//   .feedback-desc {
//     font-size: 15px;
//     color: #666;
//     line-height: 1.6;
//     margin-bottom: 30px;
//   }

//   .view-more-btn {
//     background: linear-gradient(90deg, #c040d0, #f06040);
//     color: white;
//     padding: 12px 28px;
//     border-radius: 4px;
//     border: none;
//     font-weight: 500;
//     font-size: 15px;
//     cursor: pointer;
//     transition: opacity 0.3s ease;
//   }

//   .view-more-btn:hover {
//     opacity: 0.9;
//   }

//   .feedback-right {
//     flex: 1.2;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//     align-items: flex-end;
//   }

//   @media (max-width: 992px) {
//     .feedback-right {
//       align-items: center;
//       width: 100%;
//     }
//   }

//   .review-card {
//     background: #ffffff;
//     border-radius: 4px;
//     padding: 24px;
//     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
//     display: flex;
//     gap: 15px;
//     width: 100%;
//     max-width: 450px;
//     position: relative;
//     transition: transform 0.3s ease;
//   }

//   .review-card.offset {
//     transform: translateX(-40px);
//     border-left: 4px solid #6c5ce7;
//   }

//   @media (max-width: 992px) {
//     .review-card.offset {
//       transform: translateX(0);
//     }
//   }

//   .avatar-container {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 20px;
//     font-weight: 600;
//     color: #fff;
//     flex-shrink: 0;
//   }

//   .review-content {
//     flex: 1;
//     position: relative;
//     padding-right: 20px;
//   }

//   .review-name {
//     font-weight: 600;
//     font-size: 16px;
//     color: #1a1a1a;
//     margin-bottom: 6px;
//   }

//   .review-text {
//     font-size: 13px;
//     color: #888;
//     line-height: 1.5;
//   }

//   .quote-icon {
//     position: absolute;
//     top: -5px;
//     right: 0;
//     font-size: 32px;
//     color: #e2e8f0;
//     font-family: serif;
//     line-height: 1;
//   }

//   .quote-icon.purple {
//     color: #6c5ce7;
//   }



//   /* Form Styles */
//   .modal-overlay {
//     position: fixed;
//     inset: 0;
//     background: rgba(10, 12, 9, 0.85);
//     backdrop-filter: blur(10px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 2000;
//   }

//   .modal-content {
//     background: #ffffff;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     width: 95%;
//     max-width: 500px;
//     border-radius: 8px;
//     padding: 50px;
//     position: relative;
//     box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
//   }

//   .close-modal {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     background: transparent;
//     border: none;
//     color: #a0aec0;
//     width: 40px;
//     height: 40px;
//     cursor: pointer;
//     font-size: 1.4rem;
//     transition: color 0.2s;
//   }

//   .close-modal:hover {
//     color: #1a1a1a;
//   }

//   .form-label {
//     display: block;
//     font-size: 0.85rem;
//     font-weight: 600;
//     color: #4a5568;
//     margin-bottom: 8px;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//   }

//   .form-input {
//     width: 100%;
//     background: #f7fafc;
//     border: 1px solid #e2e8f0;
//     border-radius: 4px;
//     padding: 14px 16px;
//     color: #1a1a1a;
//     font-size: 1rem;
//     outline: none;
//     box-sizing: border-box;
//     margin-bottom: 20px;
//     font-family: inherit;
//   }

//   .form-input:focus {
//     border-color: #6c5ce7;
//   }

//   .submit-btn {
//     width: 100%;
//     background: linear-gradient(90deg, #c040d0, #f06040);
//     color: white;
//     padding: 16px;
//     border-radius: 4px;
//     border: none;
//     font-weight: 600;
//     font-size: 1rem;
//     cursor: pointer;
//     margin-top: 10px;
//     transition: opacity 0.3s ease;
//   }

//   .submit-btn:hover {
//     opacity: 0.9;
//   }

//   .picker-stars {
//     display: flex;
//     gap: 10px;
//     font-size: 2rem;
//     margin-bottom: 20px;
//   }

//   .star-pick {
//     cursor: pointer;
//     transition: color 0.2s ease;
//   }
// `;

// export default function FeedbackSection() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showForm, setShowForm] = useState(false);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [formData, setFormData] = useState({ name: "", rating: 0, feedback: "" });
//   const [submitted, setSubmitted] = useState(false);

//   const defaultReviews = [
//     {
//       name: "Mehwish",
//       feedback: "Compliment interested discretion estimating on stimulated apartments oh.",
//     },
//     {
//       name: "Elizabeth Jeff",
//       feedback: "Dear so sing when in find read of call. As distrusts behaviour abilities defective is.",
//     },
//     {
//       name: "Emily Thomas",
//       feedback: "Never at water me might. On formed merits hunted unable merely by mr whence or.",
//     }
//   ];

//   const fetchReviews = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/reviews");
//       if (response.ok) {
//         const data = await response.json();
//         setReviews(data);
//       }
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name.trim() || formData.rating === 0 || !formData.feedback.trim()) {
//       alert("Please fill all fields!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/reviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSubmitted(true);
//         setTimeout(() => {
//           setSubmitted(false);
//           setFormData({ name: "", rating: 0, feedback: "" });
//           fetchReviews(); // Refresh
//         }, 1500);
//       }
//     } catch (err) {
//       alert("Submission failed.");
//     }
//   };

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const allReviews = reviews.length > 0 ? reviews : defaultReviews;
//   const displayReviews = allReviews.slice(currentIndex, currentIndex + 3);

//   const handleViewMore = () => {
//     let nextIndex = currentIndex + 3;
//     if (nextIndex >= allReviews.length) {
//       nextIndex = 0;
//     }
//     setCurrentIndex(nextIndex);
//   };

//   const getAvatarColor = (idx) => {
//     const colors = ["#475569", "#ec4899", "#94a3b8", "#f59e0b", "#3b82f6"];
//     return colors[idx % colors.length];
//   };

//   return (
//     <div className="feedback-wrapper">
//       <style>{css}</style>
//       <section className="feedback-section">



//         <div className="feedback-left">
//           <h2 className="feedback-title">What Our<br />Customers Says</h2>
//           <p className="feedback-desc">
//             Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.
//           </p>
//           <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
//             <button className="view-more-btn" onClick={() => setShowForm(true)}>Add your feedback</button>
//             {allReviews.length > 3 && (
//               <button 
//                 className="view-more-btn" 
//                 style={{ background: "transparent", color: "#1a1a1a", border: "1px solid #c040d0" }} 
//                 onClick={handleViewMore}
//               >
//                 View More
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="feedback-right">
//           {displayReviews.map((rev, index) => {
//             const isMiddle = index === 1;
//             return (
//               <div key={index} className={`review-card ${isMiddle ? 'offset' : ''}`}>
//                 <div
//                   className="avatar-container"
//                   style={{ backgroundColor: getAvatarColor(index) }}
//                 >
//                   {rev.name ? rev.name.charAt(0).toUpperCase() : "U"}
//                 </div>
//                 <div className="review-content">
//                   <div className="review-name">{rev.name}</div>
//                   <div className="review-text">"{rev.feedback}"</div>
//                   <div className={`quote-icon ${isMiddle ? 'purple' : ''}`}>”</div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </section>

//       {/* FORM MODAL */}
//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-modal" onClick={() => setShowForm(false)}>✕</button>
//             {submitted ? (
//               <div style={{ textAlign: "center", padding: "40px 0" }}>
//                 <div style={{ fontSize: '40px', margin: '0 auto 10px' }}>💙</div>
//                 <h3 style={{ color: '#0ea5e9', fontFamily: 'Outfit' }}>Feedback Received!</h3>
//                 <p style={{ color: '#64748b' }}>Thank you for helping us grow.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <h3 style={{ fontFamily: 'Outfit', fontSize: '2rem', marginBottom: '30px', color: '#1a1a1a', fontWeight: '700' }}>New Review</h3>
//                 <div>
//                   <label className="form-label">Full Name</label>
//                   <input
//                     className="form-input"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="e.g. John Smith"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="form-label">Your Rating</label>
//                   <div className="picker-stars">
//                     {[1, 2, 3, 4, 5].map(n => (
//                       <span
//                         key={n}
//                         className="star-pick"
//                         style={{ color: (hoverRating || formData.rating) >= n ? "#0ea5e9" : "#e2e8f0" }}
//                         onMouseEnter={() => setHoverRating(n)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         onClick={() => setFormData({ ...formData, rating: n })}
//                       >★</span>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="form-label">Review</label>
//                   <textarea
//                     className="form-input"
//                     style={{ height: '100px', resize: 'none' }}
//                     value={formData.feedback}
//                     onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
//                     placeholder="Tell us what you think..."
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="submit-btn">Post Review</button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

  .feedback-section {
    padding: 100px 5%;
    font-family: 'Outfit', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    gap: 50px;
    background-color: #f5f0e8;
  }

  .feedback-wrapper {
    background-color: #f5f0e8;
    width: 100%;
  }

  @media (max-width: 992px) {
    .feedback-section {
      flex-direction: column;
      text-align: left;
    }
  }

  .feedback-left {
    flex: 1;
    max-width: 450px;
  }

  .feedback-title {
    font-size: clamp(36px, 4vw, 48px);
    font-weight: 700;
    color: #4C3324;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }

  .feedback-desc {
    font-size: 15px;
    color: #7a5c4a;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .view-more-btn {
    background: #B2846B;
    color: #fff;
    padding: 12px 28px;
    border-radius: 4px;
    border: none;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  .view-more-btn:hover {
    background: #627B68;
    transform: translateY(-2px);
  }

  .feedback-right {
    flex: 1.2;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-end;
  }

  @media (max-width: 992px) {
    .feedback-right {
      align-items: center;
      width: 100%;
    }
  }

  .review-card {
    background: #fffaf5;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0 4px 15px rgba(76,51,36,0.07);
    display: flex;
    gap: 15px;
    width: 100%;
    max-width: 450px;
    position: relative;
    transition: transform 0.3s ease;
  }

  .review-card.offset {
    transform: translateX(-40px);
    border-left: 4px solid #627B68;
  }
  
  @media (max-width: 992px) {
    .review-card.offset {
      transform: translateX(0);
    }
  }

  .avatar-container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
  }

  .review-content {
    flex: 1;
    position: relative;
    padding-right: 20px;
  }

  .review-name {
    font-weight: 600;
    font-size: 16px;
    color: #4C3324;
    margin-bottom: 6px;
  }

  .review-text {
    font-size: 13px;
    color: #9a7060;
    line-height: 1.5;
  }
  
  .quote-icon {
    position: absolute;
    top: -5px;
    right: 0;
    font-size: 32px;
    color: rgba(178,132,107,0.20);
    font-family: serif;
    line-height: 1;
  }

  .quote-icon.purple {
    color: #819B8B;
  }

  /* Form Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(76,51,36,0.80);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .modal-content {
    background: #fffaf5;
    border: 1px solid rgba(178,132,107,0.18);
    width: 95%;
    max-width: 500px;
    border-radius: 8px;
    padding: 50px;
    position: relative;
    box-shadow: 0 30px 60px rgba(76,51,36,0.18);
  }

  .close-modal {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: #B2846B;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 1.4rem;
    transition: color 0.2s;
  }

  .close-modal:hover {
    color: #4C3324;
  }

  .form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #7a5c4a;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-input {
    width: 100%;
    background: #f5f0e8;
    border: 1px solid rgba(178,132,107,0.25);
    border-radius: 4px;
    padding: 14px 16px;
    color: #4C3324;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    margin-bottom: 20px;
    font-family: inherit;
  }

  .form-input:focus {
    border-color: #B2846B;
  }

  .submit-btn {
    width: 100%;
    background: #4C3324;
    color: #E4CBB6;
    padding: 16px;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background 0.3s ease;
  }

  .submit-btn:hover {
    background: #627B68;
    color: #fff;
  }

  .picker-stars {
    display: flex;
    gap: 10px;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .star-pick {
    cursor: pointer;
    transition: color 0.2s ease;
  }
`;

export default function FeedbackSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: "", rating: 0, feedback: "" });
  const [submitted, setSubmitted] = useState(false);

  const defaultReviews = [
    { name: "Mehwish", feedback: "Compliment interested discretion estimating on stimulated apartments oh." },
    { name: "Elizabeth Jeff", feedback: "Dear so sing when in find read of call. As distrusts behaviour abilities defective is." },
    { name: "Emily Thomas", feedback: "Never at water me might. On formed merits hunted unable merely by mr whence or." }
  ];

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.rating === 0 || !formData.feedback.trim()) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", rating: 0, feedback: "" });
          fetchReviews();
        }, 1500);
      }
    } catch (err) {
      alert("Submission failed.");
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const allReviews = reviews.length > 0 ? reviews : defaultReviews;
  const displayReviews = allReviews.slice(currentIndex, currentIndex + 3);

  const handleViewMore = () => {
    let nextIndex = currentIndex + 3;
    if (nextIndex >= allReviews.length) nextIndex = 0;
    setCurrentIndex(nextIndex);
  };

  const getAvatarColor = (idx) => {
    const colors = ["#B2846B", "#627B68", "#819B8B", "#4C3324", "#C4957C"];
    return colors[idx % colors.length];
  };

  return (
    <div className="feedback-wrapper">
      <style>{css}</style>
      <section className="feedback-section">

        <div className="feedback-left">
          <h2 className="feedback-title">What Our<br />Customers Says</h2>
          <p className="feedback-desc">
            Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.
          </p>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button className="view-more-btn" onClick={() => setShowForm(true)}>Add your feedback</button>
            {allReviews.length > 3 && (
              <button
                className="view-more-btn"
                style={{ background: "transparent", color: "#4C3324", border: "1px solid #B2846B" }}
                onClick={handleViewMore}
              >
                View More
              </button>
            )}
          </div>
        </div>

        <div className="feedback-right">
          {displayReviews.map((rev, index) => {
            const isMiddle = index === 1;
            return (
              <div key={index} className={`review-card ${isMiddle ? 'offset' : ''}`}>
                <div className="avatar-container" style={{ backgroundColor: getAvatarColor(index) }}>
                  {rev.name ? rev.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="review-content">
                  <div className="review-name">{rev.name}</div>
                  <div className="review-text">"{rev.feedback}"</div>
                  <div className={`quote-icon ${isMiddle ? 'purple' : ''}`}>"</div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowForm(false)}>✕</button>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: '40px', margin: '0 auto 10px' }}>🌿</div>
                <h3 style={{ color: '#627B68', fontFamily: 'Outfit' }}>Feedback Received!</h3>
                <p style={{ color: '#7a5c4a' }}>Thank you for helping us grow.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: '2rem', marginBottom: '30px', color: '#4C3324', fontWeight: '700' }}>New Review</h3>
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Smith"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Your Rating</label>
                  <div className="picker-stars">
                    {[1, 2, 3, 4, 5].map(n => (
                      <span
                        key={n}
                        className="star-pick"
                        style={{ color: (hoverRating || formData.rating) >= n ? "#B2846B" : "rgba(178,132,107,0.25)" }}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormData({ ...formData, rating: n })}
                      >★</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="form-label">Review</label>
                  <textarea
                    className="form-input"
                    style={{ height: '100px', resize: 'none' }}
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Tell us what you think..."
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">Post Review</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
