import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        email: formData.email.trim().toLowerCase(),
        role: "admin"
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.user?.role === "admin") {
        // Immediate login
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("adminName", data.user.name);
        localStorage.setItem("role", "admin");

        // Remove old fake tokens just in case
        localStorage.removeItem("adminToken");

        // The user object and token arrived directly, bypass the OTP form.
        navigate("/admin");
      } else {
        // Logged in as normal user (not admin), or failed
        setError(data.message || "Invalid Admin Credentials");
      }
    } catch (err) {
      setError("Cannot communicate with server");
    } finally {
      setLoading(false);
    }
  };

  // ================= THEME =================
  const theme = {
    primary: "#1F3C88",
    secondary: "#FDC43D",
    background: "linear-gradient(135deg,#E8F0FA,#DDE6F5)",
    cardBg: "rgba(255, 255, 255, 0.95)",
    inputBg: "#F7F9FC",
    gradient: "linear-gradient(135deg,#1F3C88,#3B5AB5)",
    shadow: "0 20px 50px rgba(0,0,0,0.2)",
    borderRadius: "20px",
    muted: "#6B7280",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        background: theme.background,
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(31,60,136,0.15)",
          top: "-200px",
          left: "-200px",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(253,196,61,0.15)",
          bottom: "-150px",
          right: "-150px",
          zIndex: 0,
        }}
      />

      {/* Login Card */}
      <div
        className="row g-0 position-relative"
        style={{
          width: "820px",
          minHeight: "520px",
          borderRadius: theme.borderRadius,
          overflow: "hidden",
          background: theme.cardBg,
          boxShadow: theme.shadow,
          zIndex: 1,
        }}
      >
        {/* LEFT PANEL */}
        <div
          className="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            background: theme.primary,
            backgroundImage: "linear-gradient(135deg,#1F3C88,#3B5AB5)",
            position: "relative",
          }}
        >
          <div className="text-center mt-auto mb-auto">
            <div
              style={{
                background: "rgba(253,196,61,0.2)",
                padding: "30px",
                borderRadius: "50%",
                marginBottom: "25px",
                fontSize: "2.5rem",
                boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
              }}
            >
              🔐
            </div>

            <h3 className="fw-bold mb-2">PROPZO ADMIN</h3>
            <p style={{ color: "#ffffffaa", fontSize: "0.85rem" }}>
              Secure & Authorized Access
            </p>

            <div
              style={{
                width: "50px",
                height: "3px",
                background: theme.secondary,
                margin: "20px auto 0",
                borderRadius: "2px",
              }}
            ></div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-md-7 p-5 d-flex flex-column justify-content-center">
          <div className="mb-5 text-center text-md-start">
            <h4 className="fw-bold mb-1">Welcome Back</h4>
            <p className="text-muted small">Enter your credentials to login</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center small">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-4">
              <label className="small fw-bold text-muted">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                style={{
                  borderRadius: "12px",
                  background: theme.inputBg,
                  border: "1px solid #E0E0E0",
                  padding: "14px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
                placeholder="prpzoestate@gmail.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4 position-relative">
              <label className="small fw-bold text-muted">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                style={{
                  borderRadius: "12px",
                  background: theme.inputBg,
                  border: "1px solid #E0E0E0",
                  padding: "14px 45px 14px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                }}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
              />
              <span
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn w-100 fw-bold text-white"
              style={{
                background: theme.gradient,
                borderRadius: "12px",
                padding: "14px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              disabled={loading}
              onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
            >
              {loading ? "Checking..." : "SECURE LOGIN"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-5 pt-4 text-center border-top">
            <p className="text-muted small mb-0">Session Encrypted | Propzo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
