import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.agent-login-page {
  min-height: 100vh;
  background-color: #f9f6f1;
  background-image: 
    radial-gradient(at 0% 0%, rgba(98, 123, 104, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(178, 132, 107, 0.05) 0px, transparent 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding: 20px;
}

.agent-login-box {
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(228, 203, 182, 0.2);
  box-shadow: 0 20px 25px -5px rgba(76, 51, 36, 0.03), 0 10px 10px -5px rgba(76, 51, 36, 0.02);
  text-align: center;
}

.brand-logo {
  width: 52px;
  height: 52px;
  background: #e4cbb6;
  border-radius: 12px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4c3324;
}

.agent-login-box h2 {
  color: #4c3324;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.025em;
}

.agent-login-box p {
  color: #627b68;
  font-size: 15px;
  margin-bottom: 32px;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4c3324;
  margin-bottom: 8px;
}

.agent-login-box input {
  width: 100%;
  padding: 12px 16px;
  background: #faf7f5;
  border: 1.5px solid rgba(228, 203, 182, 0.3);
  border-radius: 12px;
  color: #4c3324;
  font-size: 15px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.agent-login-box input:focus {
  outline: none;
  border-color: #819b8b;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(129, 155, 139, 0.1);
}

.login-button {
  width: 100%;
  padding: 14px;
  background: #627b68;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s ease;
}

.login-button:hover {
  background: #4c3324;
}
`;

export default function AgentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ REAL LOGIN LOGIC (Backend Connected)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/agents/login",
        { email, password }
      );

      localStorage.setItem("agentAuth", JSON.stringify(res.data.agent));
      localStorage.setItem("role", "agent");

      navigate("/agentdashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="agent-login-page">
        <div className="agent-login-box">
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
            </svg>
          </div>

          <h2>Welcome back</h2>
          <p>Please enter your details to sign in</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="agent@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
