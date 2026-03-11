import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function BookVisit() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  // ===== Auth Check =====
  useEffect(() => {
    if (!auth?.isLoggedIn) {
      // User not logged in → redirect to login with current page as "from"
      navigate("/login", { state: { from: `/bookvisit/${id}` }, replace: true });
    } else {
      setAuthChecked(true);
    }
  }, [auth, id, navigate]);

  // ===== Form State =====
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Visit Booked Successfully!
Name: ${form.name}
Phone: ${form.phone}
Date: ${form.date}
Time: ${form.time}

Our agent will contact you soon.`);
    navigate(-1); // go back to previous page
  };

  if (!authChecked) return null; // wait for auth check

  // ===== Styles =====
  const NAVBAR_HEIGHT = 70;
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fbff, #eef6ff, #ffffff)",
      fontFamily: "Segoe UI, sans-serif",
    },
    navOffset: { height: NAVBAR_HEIGHT },
    backBar: {
      height: "55px",
      display: "flex",
      alignItems: "center",
      padding: "0 25px",
    },
    backBtn: {
      background: "white",
      color: "#2563eb",
      border: "1px solid #dbeafe",
      padding: "8px 16px",
      borderRadius: "18px",
      cursor: "pointer",
      fontWeight: "500",
    },
    center: {
      minHeight: `calc(100vh - ${NAVBAR_HEIGHT + 55}px)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "460px",
      background: "white",
      borderRadius: "22px",
      padding: "32px",
      boxShadow: "0 18px 35px rgba(0,0,0,0.12)",
    },
    header: { textAlign: "center", marginBottom: "22px" },
    title: { margin: 0 },
    sub: { marginTop: "6px", color: "#64748b", fontSize: "14px" },
    form: { display: "flex", flexDirection: "column", gap: "14px" },
    inputBox: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#f9fbff",
      border: "1px solid #dbeafe",
      borderRadius: "12px",
      padding: "12px 14px",
    },
    input: { border: "none", outline: "none", background: "transparent", width: "100%", fontSize: "15px" },
    textarea: {
      minHeight: "90px",
      borderRadius: "12px",
      border: "1px solid #dbeafe",
      padding: "12px",
      resize: "none",
      background: "#f9fbff",
      fontSize: "15px",
      outline: "none",
    },
    submitBtn: {
      background: "linear-gradient(135deg,#3b82f6,#2563eb)",
      color: "white",
      border: "none",
      padding: "14px",
      borderRadius: "14px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      marginTop: "6px",
    },
    footer: { textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#64748b" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.navOffset} />
      <div style={styles.backBar}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ⬅ Back
        </button>
      </div>

      <div style={styles.center}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Schedule Property Visit</h1>
            <p style={styles.sub}>Property ID: #{id}</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputBox}>
              <span>👤</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputBox}>
              <span>📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                required
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputBox}>
              <span>📅</span>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputBox}>
              <span>⏰</span>
              <input
                type="time"
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <textarea
              name="message"
              placeholder="Any special request (optional)"
              value={form.message}
              onChange={handleChange}
              style={styles.textarea}
            />
            <button type="submit" style={styles.submitBtn}>
              Confirm Visit
            </button>
          </form>

          <p style={styles.footer}>🔒 Your information is secure</p>
        </div>
      </div>
    </div>
  );
}
