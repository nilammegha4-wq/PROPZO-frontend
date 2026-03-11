import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) return alert("Fill all fields");
    if (!email.includes("@")) return alert("Enter valid email");
    if (password.length < 6) return alert("Password must be 6+ chars");

    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role: "user" });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container-fluid register-page">
      <div className="row min-vh-100 align-items-center">
        <div className="col-lg-6 d-flex justify-content-center">
          <div className="register-card shadow-lg">
            <h3 className="fw-bold text-center mb-4">Create Account</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create password" required />
              </div>
              <button type="submit" className="btn register-btn w-100">Register</button>
            </form>
            <p className="text-center mt-3 mb-0">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-center">
          <div className="welcome-box text-center">
            <h1 className="fw-bold mb-3">Welcome</h1>
            <p className="text-muted fs-5 mb-4">Create your account securely.</p>
            <img src="/img1.jpg" alt="Welcome" style={{ width: "340px" }} />
          </div>
        </div>
      </div>
      <style>{`
        .register-page { background: linear-gradient(120deg, #e0f2fe, #ffffff); }
        .register-card { width: 380px; padding: 36px; background: #ffffff; border-radius: 22px; }
        .form-control { padding: 13px; border-radius: 14px; border: 1px solid #2563eb; }
        .register-btn { background: linear-gradient(90deg, #2563eb, #1d4ed8); color: #fff; font-weight: 600; border-radius: 50px; padding: 13px; }
        .welcome-box img { width: 340px; }
      `}</style>
    </div>
  );
};

export default Register;
