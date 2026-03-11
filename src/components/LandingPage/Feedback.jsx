import React, { useState, useEffect } from "react";
export default function FeedbackSection() {
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({ name: "", rating: 0, feedback: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Please enter your name!");
      return;
    }

    if (formData.rating === 0) {
      alert("Please pick a rating!");
      return;
    }

    if (!formData.feedback.trim()) {
      alert("Please enter your feedback!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          rating: formData.rating,
          feedback: formData.feedback,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await response.json();
      console.log("Review saved:", data);

      // Success UI
      setSubmitted(true);

      // Reset form after 1.5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setFormData({
          name: "",
          rating: 0,
          feedback: "",
        });
      }, 1500);

    } catch (err) {
      console.error("Error saving review:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.badge}>User Love</div>
          <h2 style={styles.mainTitle}>Community Voice</h2>
          <p style={styles.description}>
            Our users are at the heart of everything we do. Here’s what they have to say about their experience.
          </p>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statNum}>4.9/5</span>
            <span style={styles.statLabel}>Avg Rating</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statNum}>1.2k+</span>
            <span style={styles.statLabel}>Happy Users</span>
          </div>
        </div>

        {/* Grid Section */}
        <div style={styles.grid}>
          {reviews.slice(0, visibleCount).map((rev, idx) => (
            <div key={idx} style={styles.reviewCard}>
              <div style={styles.cardHeader}>
                <div style={styles.miniAvatar}>{rev.name[0]}</div>
                <div style={styles.authorInfo}>
                  <span style={styles.authorName}>{rev.name}</span>
                  <div style={styles.stars}>{"★".repeat(rev.rating)}</div>
                </div>
              </div>
              <p style={styles.quote}>"{rev.feedback}"</p>
            </div>
          ))}
        </div>

        {/* Control Row */}
        <div style={styles.controls}>
          {visibleCount < reviews.length && (
            <button style={styles.secondaryBtn} onClick={() => setVisibleCount(v => v + 2)}>
              View More Reviews
            </button>
          )}
          <button style={styles.primaryBtn} onClick={() => setShowForm(true)}>
            Share Your Feedback
          </button>
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeModal} onClick={() => setShowForm(false)}>✕</button>
            {submitted ? (
              <div style={styles.success}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>💙</div>
                <h3 style={{ color: '#0ea5e9' }}>Feedback Received!</h3>
                <p style={{ color: '#64748b' }}>Thank you for helping us grow.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={styles.modalTitle}>New Review</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    style={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Smith"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Rating</label>
                  <div style={styles.picker}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <span
                        key={n}
                        style={{ ...styles.star, color: (hoverRating || formData.rating) >= n ? "#0ea5e9" : "#e2e8f0" }}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormData({ ...formData, rating: n })}
                      >★</span>
                    ))}
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Review</label>
                  <textarea
                    style={{ ...styles.input, height: '100px', resize: 'none' }}
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Tell us what you think..."
                    required
                  />
                </div>
                <button type="submit" style={styles.submitBtn}>Post Review</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f0f9ff", // Light Sky Blue tint
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: "80px 20px",
    color: "#0c4a6e", // Deep Navy Blue for text
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  badge: {
    display: "inline-block",
    background: "#e0f2fe", // Light Blue badge
    color: "#0ea5e9", // Bright Blue text
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "0.8rem",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    margin: "0 0 16px 0",
    letterSpacing: "-0.02em",
    color: "#075985",
  },
  description: {
    fontSize: "1.1rem",
    color: "#64748b",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    margin: "40px 0 60px 0",
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  statBox: {
    textAlign: "center",
  },
  statNum: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#0369a1",
    display: "block",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    fontWeight: "500",
  },
  statDivider: {
    width: "1px",
    height: "30px",
    background: "#e2e8f0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  reviewCard: {
    background: "#ffffff",
    border: "1px solid #e0f2fe",
    padding: "32px",
    borderRadius: "24px",
    boxShadow: "0 10px 15px -3px rgba(14, 165, 233, 0.05)",
    transition: "transform 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },
  miniAvatar: {
    width: "44px",
    height: "44px",
    background: "#bae6fd",
    color: "#0369a1",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "1.1rem",
  },
  authorInfo: {
    display: "flex",
    flexDirection: "column",
  },
  authorName: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#0f172a",
  },
  stars: {
    color: "#0ea5e9", // Theme Blue Stars
    fontSize: "0.85rem",
    marginTop: "2px",
  },
  quote: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#475569",
    margin: 0,
    fontStyle: "italic",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "60px",
  },
  primaryBtn: {
    background: "#0ea5e9",
    color: "#ffffff",
    padding: "14px 28px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(14, 165, 233, 0.3)",
    transition: "all 0.2s",
  },
  secondaryBtn: {
    background: "#ffffff",
    color: "#0ea5e9",
    padding: "14px 28px",
    borderRadius: "14px",
    border: "2px solid #bae6fd",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(12, 74, 110, 0.4)", // Navy transparent
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#ffffff",
    width: "90%",
    maxWidth: "450px",
    borderRadius: "30px",
    padding: "40px",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  closeModal: {
    position: "absolute",
    top: "24px",
    right: "24px",
    background: "#f0f9ff",
    border: "none",
    color: "#0ea5e9",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: "1.8rem",
    fontWeight: "800",
    marginBottom: "24px",
    color: "#075985",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#334155",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    background: "#f8fafc",
    border: "2px solid #e0f2fe",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#0f172a",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  picker: {
    display: "flex",
    gap: "10px",
    fontSize: "2.4rem",
  },
  star: {
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  submitBtn: {
    width: "100%",
    background: "#0ea5e9",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    marginTop: "10px",
  },
  success: {
    textAlign: "center",
    padding: "20px 0",
  }
};
