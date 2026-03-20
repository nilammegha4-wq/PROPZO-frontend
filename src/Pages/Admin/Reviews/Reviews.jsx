import React, { useState, useEffect } from "react";

const palette = {
  cream: "#F5F0E8",
  blush: "#E4CBB6",
  terracotta: "#B2846B",
  sage: "#819B8B",
  forest: "#627B68",
  espresso: "#4C3324",
  white: "#FFFFFF",
  lightSage: "#EAF0EC",
  mutedText: "#8A7968",
  darkText: "#2C1F14",
};

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
      body: JSON.stringify({ status }),
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
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? palette.terracotta : palette.blush,
          fontSize: "17px",
          letterSpacing: "2px",
        }}
      >
        ★
      </span>
    ));

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return { bg: "rgba(129, 155, 139, 0.15)", text: "#627b68", dot: "#627b68" };
      case "Pending":
        return { bg: "rgba(178, 132, 107, 0.1)", text: "#b2846b", dot: "#b2846b" };
      case "Rejected":
        return { bg: "#FEE2E2", text: "#991B1B", dot: "#991B1B" };
      default:
        return { bg: "#F3F4F6", text: "#374151", dot: "#374151" };

    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .reviews-root {
          padding: 48px 64px;
          background-color: ${palette.cream};
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .reviews-header {
          margin-bottom: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .reviews-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: ${palette.espresso};
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .reviews-subtitle {
          color: ${palette.mutedText};
          font-size: 14px;
          font-weight: 400;
          margin: 0;
          letter-spacing: 0.2px;
        }

        .count-badge {
          background: ${palette.espresso};
          color: ${palette.cream};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 99px;
          letter-spacing: 0.3px;
        }

        .table-card {
          background: ${palette.white};
          border-radius: 16px;
          border: 1px solid #E8DFD6;
          box-shadow: 0 2px 20px rgba(76, 51, 36, 0.07);
          overflow: hidden;
        }

        .reviews-table {
          width: 100%;
          border-collapse: collapse;
        }

        .reviews-table thead tr {
          background: linear-gradient(to right, #FAF6F1, #F5EFE8);
          border-bottom: 1px solid #EDE4D8;
        }

        .reviews-table th {
          text-align: left;
          padding: 14px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: ${palette.mutedText};
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .reviews-table th:last-child { text-align: right; }

        .reviews-table tbody tr {
          border-bottom: 1px solid #F5F0E8;
          transition: background 0.2s;
        }

        .reviews-table tbody tr:hover { background: #FDFAF7; }
        .reviews-table tbody tr:last-child { border-bottom: none; }

        .reviews-table td {
          padding: 18px 22px;
          vertical-align: middle;
        }

        .user-name {
          font-weight: 600;
          color: ${palette.espresso};
          font-size: 14px;
          margin-bottom: 2px;
        }

        .prop-name {
          color: ${palette.mutedText};
          font-size: 12px;
          font-weight: 400;
        }

        .comment-text {
          font-size: 13px;
          color: #5C4D3C;
          line-height: 1.6;
          margin: 0;
          max-width: 280px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .date-text {
          color: ${palette.mutedText};
          font-size: 13px;
          font-weight: 400;
        }

        .action-group {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .btn {
          padding: 7px 14px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.18s;
          letter-spacing: 0.2px;
        }

        .btn-approve {
          background: ${palette.forest};
          color: ${palette.white};
        }
        .btn-approve:hover { background: #527060; transform: translateY(-1px); }

        .btn-reject {
          background: ${palette.terracotta};
          color: ${palette.white};
        }
        .btn-reject:hover { background: #9E7360; transform: translateY(-1px); }

        .btn-delete {
          background: transparent;
          color: #B05040;
          border: 1px solid #DBBCB0;
        }
        .btn-delete:hover { background: #FDF0EC; transform: translateY(-1px); }

        .empty-state {
          padding: 60px;
          text-align: center;
          color: ${palette.mutedText};
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-style: italic;
        }
      `}</style>

      <div className="reviews-root">
        <div className="reviews-header">
          <div>
            <h1 className="reviews-title">Reviews Management</h1>
            <p className="reviews-subtitle">Moderate and manage customer feedback for your properties.</p>
          </div>
          {reviews.length > 0 && (
            <span className="count-badge">{reviews.length} Review{reviews.length !== 1 ? "s" : ""}</span>
          )}
        </div>

        <div className="table-card">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>User & Property</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => {
                const s = getStatusStyle(r.status);
                return (
                  <tr key={r._id}>
                    <td>
                      <div className="user-name">{r.name}</div>
                      <div className="prop-name">Propzo Review</div>
                    </td>
                    <td>{renderStars(r.rating)}</td>
                    <td>
                      <p className="comment-text">{r.feedback}</p>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: s.bg, color: s.text }}
                      >
                        <span className="status-dot" style={{ backgroundColor: s.dot }} />
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <span className="date-text">
                        {r.date || new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        {r.status === "Pending" && (
                          <>
                            <button className="btn btn-approve" onClick={() => updateStatus(r._id, "Approved")}>
                              Approve
                            </button>
                            <button className="btn btn-reject" onClick={() => updateStatus(r._id, "Rejected")}>
                              Reject
                            </button>
                          </>
                        )}
                        <button className="btn btn-delete" onClick={() => deleteReview(r._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {reviews.length === 0 && (
            <div className="empty-state">No reviews available.</div>
          )}
        </div>
      </div>
    </>
  );
}

