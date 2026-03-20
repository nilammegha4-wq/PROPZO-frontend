import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [auth]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Fill all fields");
    if (!email.includes("@")) return alert("Enter valid email");
    if (password.length < 6) return alert("Password must be 6+ chars");
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role: "user",
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

        .custom-input:focus {
          border-color: #B2846B !important;
          box-shadow: 0 0 0 4px rgba(178, 132, 107, 0.15) !important;
          outline: none;
        }

        .register-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #B2846B 0%, #627B68 100%);
          color: #fff;
          border: none;
          border-radius: 15px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 15px 30px -10px rgba(98, 123, 104, 0.45);
          transition: opacity 0.2s, transform 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .register-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .register-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        @media (max-width: 1000px) {
          .left-panel { display: none !important; }
          .right-panel { width: 100% !important; border-radius: 40px !important; }
        }
      `}</style>

      <div style={styles.card}>

        {/* LEFT PANEL */}
        <div style={styles.leftPanel} className="left-panel">
          <img src="/3.jpg" alt="Hero" style={styles.bgImg} />
          <div style={styles.overlay} />
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.rightPanel} className="right-panel">
          <div style={styles.formContent}>
            <div style={styles.formContainer}>
              <h1 style={styles.h1}>Sign Up</h1>
              <p style={styles.p}>Create your account and start your journey</p>

              <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    className="custom-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    style={styles.input}
                    className="custom-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    style={styles.input}
                    className="custom-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>

                <button type="submit" className="register-btn" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </button>
              </form>

              <p style={styles.footerText}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#B2846B", fontWeight: "600" }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F5EDE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    padding: "88px 20px 40px",
  },
  card: {
    width: "1100px",
    maxWidth: "100%",
    minHeight: "750px",
    maxHeight: "95vh",
    backgroundColor: "#fff",
    borderRadius: "60px",
    display: "flex",
    boxShadow: "0 50px 100px -20px rgba(76, 51, 36, 0.18)",
    overflow: "hidden",
  },
  leftPanel: {
    width: "50%",
    position: "relative",
    backgroundColor: "#4C3324",
    clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
    borderRadius: "60px 0 0 60px",
    overflow: "hidden",
  },
  bgImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.7) sepia(0.25)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(160deg, rgba(76,51,36,0.25) 0%, rgba(98,123,104,0.55) 100%)",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "40px 60px",
    position: "relative",
    backgroundColor: "#FDFAF8",
  },
  formContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formContainer: {
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
  },
  h1: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#4C3324",
    marginBottom: "8px",
    letterSpacing: "-1px",
  },
  p: {
    fontSize: "15px",
    color: "#819B8B",
    marginBottom: "30px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#627B68",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "1.5px solid #E4CBB6",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#FDFAF8",
    color: "#4C3324",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#819B8B",
    marginTop: "25px",
  },
};
