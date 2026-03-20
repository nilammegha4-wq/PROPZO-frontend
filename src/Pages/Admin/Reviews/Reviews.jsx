import React, { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    fetchReviews();
  };
  const deleteReview = async (id) => {
    const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setReviews(reviews.filter((r) => r._id !== id));
    } else {
      alert("Failed to delete review.");
    }
  }

  // Visual Star Rating Component
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#FBBF24" : "#E5E7EB", fontSize: "18px" }}>
        ★
      </span>
    ));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return { bg: "rgba(129, 155, 139, 0.15)", text: "#627b68" };
      case "Pending": return { bg: "rgba(178, 132, 107, 0.1)", text: "#b2846b" };
      case "Rejected": return { bg: "#FEE2E2", text: "#991B1B" };
      default: return { bg: "#F3F4F6", text: "#374151" };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reviews Management</h1>
        <p style={styles.subtitle}>Moderate and manage customer feedback for your properties.</p>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>USER & PROPERTY</th>
              <th style={styles.th}>RATING</th>
              <th style={styles.th}>COMMENT</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}>DATE</th>
              <th style={{ ...styles.th, textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => {
              const statusTheme = getStatusStyle(r.status);
              return (
                <tr key={r._id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.userName}>{r.name}</div>
                    <div style={styles.propName}>Propzo Review</div>
                  </td>
                  <td style={styles.td}>{renderStars(r.rating)}</td>
                  <td style={{ ...styles.td, maxWidth: "300px" }}>
                    <p style={styles.commentText}>{r.feedback}</p>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, backgroundColor: statusTheme.bg, color: statusTheme.text }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.dateText}>
                      {r.date || new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <div style={styles.actionGroup}>
                      {r.status === "Pending" && (
                        <>
                          <button style={styles.approveBtn} onClick={() => updateStatus(r._id, "Approved")}>Approve</button>
                          <button style={styles.rejectBtn} onClick={() => updateStatus(r._id, "Rejected")}>Reject</button>
                        </>
                      )}
                      <button style={styles.deleteBtn} onClick={() => deleteReview(r._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {reviews.length === 0 && (
          <div style={styles.emptyState}>No reviews available.</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px 60px", backgroundColor: "#f9f6f1", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },
  header: { marginBottom: "30px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#4c3324", margin: 0 },
  subtitle: { color: "#6B7280", marginTop: "4px", fontSize: "16px" },
  tableCard: { backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid rgba(228, 203, 182, 0.3)", boxShadow: "0 4px 15px rgba(76, 51, 36, 0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "16px 24px", backgroundColor: "rgba(178, 132, 107, 0.05)", fontSize: "12px", fontWeight: "600", color: "#4c3324", textTransform: "uppercase", borderBottom: "1px solid rgba(228, 203, 182, 0.3)" },
  tr: { borderBottom: "1px solid #F3F4F6", transition: "all 0.2s" },
  td: { padding: "20px 24px", verticalAlign: "middle" },
  userName: { fontWeight: "600", color: "#4c3324", fontSize: "15px" },
  propName: { color: "#9CA3AF", fontSize: "13px", marginTop: "2px" },
  commentText: { fontSize: "14px", color: "#4B5563", lineHeight: "1.5", margin: 0 },
  badge: { padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: "700" },
  dateText: { color: "#6B7280", fontSize: "14px" },
  actionGroup: { display: "flex", gap: "10px", justifyContent: "flex-end" },
  approveBtn: { backgroundColor: "#627b68", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
  rejectBtn: { backgroundColor: "#b2846b", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
  deleteBtn: { backgroundColor: "transparent", color: "#EF4444", border: "1px solid #FEE2E2", padding: "6px 12px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
  emptyState: { padding: "40px", textAlign: "center", color: "#9CA3AF" }
};

