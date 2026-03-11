// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// const THEME = {
//   primary: "#0f172a",
//   accent: "#2563eb",
//   dark: "#020617",
//   light: "#f8fafc",
//   glass: "rgba(255,255,255,0.65)",
// };

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role] = useState("user");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // ================= AUTO REDIRECT IF ALREADY LOGGED IN =================
//   useEffect(() => {
//     const authUser = JSON.parse(localStorage.getItem("authUser"));
//     if (authUser?.isLoggedIn) {
//       // ✅ Redirect back to BookVisit or home if already logged in
//       navigate(location.state?.from || "/home", { replace: true });
//     }
//   }, [navigate, location]);

//   // ================= LOGIN =================
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert("Enter email & password");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//         role,
//       });

//       if (res.data.success) {
//         setOtpSent(true);
//         alert("OTP sent to your email!");
//       } else {
//         alert(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= VERIFY OTP =================
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       alert("Enter OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
//         email,
//         otp,
//       });

//       if (res.data.success) {
//         // ✅ Save auth user to localStorage
//         localStorage.setItem(
//           "authUser",
//           JSON.stringify({ ...res.data.user, isLoggedIn: true })
//         );
//         alert("Login successful!");

//         // ✅ Redirect to previous page (BookVisit or any page) or default home
//         if (location.state?.from) {
//           navigate(location.state.from, { replace: true });
//           return;
//         }

//         // Redirect based on role if no `from`
//         const role = res.data.user?.role;
//         if (role === "admin") navigate("/admin-dashboard", { replace: true });
//         else if (role === "expert") navigate("/experts/experts-dashboard", { replace: true });
//         else navigate("/", { replace: true });
//       } else {
//         alert(res.data.message || "OTP failed");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid min-vh-100 login-wrapper">
//       <div className="row min-vh-100">
//         <div className="col-lg-6 d-none d-lg-flex image-section">
//           <div className="image-overlay text-center">
//             <img src="/img1.jpg" alt="Login" className="login-image" />
//             <h1 className="fw-bold mt-4" style={{ color: THEME.primary }}>Welcome Back</h1>
//             <p className="fs-5 text-muted px-5">Secure, fast and professional access</p>
//           </div>
//         </div>

//         <div className="col-lg-6 d-flex align-items-center justify-content-center">
//           <div className="login-card p-5 shadow-lg">
//             <h3 className="text-center fw-bold mb-4" style={{ color: THEME.primary }}>
//               {otpSent ? "Enter OTP" : "Login"}
//             </h3>

//             {!otpSent ? (
//               <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Email</label>
//                   <input
//                     type="email"
//                     className="form-control form-control-lg custom-input"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="form-label fw-semibold">Password</label>
//                   <input
//                     type="password"
//                     className="form-control form-control-lg custom-input"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn login-btn w-100 fw-bold" disabled={loading}>
//                   {loading ? "Sending OTP..." : "Login"}
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleVerifyOtp}>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Enter OTP</label>
//                   <input
//                     type="text"
//                     className="form-control form-control-lg custom-input"
//                     placeholder="Enter 6-digit OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn login-btn w-100 fw-bold" disabled={loading}>
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </form>
//             )}

//             <p className="text-center mt-4 mb-0">
//               Don’t have an account?{" "}
//               <Link to="/register" className="fw-semibold text-decoration-none">Register</Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .login-wrapper { background: linear-gradient(to bottom right, #eef4ff, #ffffff); }
//         .image-section {
//           background: radial-gradient(circle at top left, rgba(37,99,235,0.2), transparent 60%),
//           linear-gradient(to bottom right, #eef4ff, #ffffff);
//         }
//         .image-overlay { width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; }
//         .login-image { width: 420px; max-width: 90%; filter: drop-shadow(0 25px 30px rgba(0,0,0,0.15)); }
//         .login-card { width: 430px; background: ${THEME.glass}; backdrop-filter: blur(18px); border-radius: 24px; border: 1px solid ${THEME.accent}33; }
//         .custom-input { border-radius: 14px; border: 1px solid ${THEME.accent}; background: ${THEME.light}; padding: 14px; }
//         .custom-input:focus { box-shadow: 0 0 0 0.2rem ${THEME.accent}33; border-color: ${THEME.accent}; }
//         .login-btn { background: linear-gradient(90deg, #2563eb, #3b82f6); color: #fff; border-radius: 50px; padding: 14px; font-size: 1.1rem; }
//         .login-btn:hover { background: linear-gradient(90deg, #3b82f6, #2563eb); transform: translateY(-2px); }
//         a { color: ${THEME.accent}; font-weight: 600; }
//         @media (max-width: 991px) { .login-card { width: 100%; margin: 0 20px; } }
//       `}</style>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0c09;
    --cream: #f5f0e8;
    --gold: #b8965a;
    --gold-light: #d4b483;
    --muted: #7a7670;
    --border: rgba(184,150,90,0.18);
    --input-bg: rgba(255,255,255,0.03);
  }

  .pz-login-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: var(--ink);
  }

  /* ── LEFT PANEL ── */
  .pz-login-left {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: none;
  }

  @media (min-width: 960px) { .pz-login-left { display: block; } }

  .pz-login-left-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    filter: brightness(0.45);
    transition: transform 12s ease;
  }

  .pz-login-left:hover .pz-login-left-img {
    transform: scale(1.04);
  }

  /* Overlay content on image */
  .pz-login-left-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,12,9,0.85) 0%, rgba(10,12,9,0.2) 60%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 56px 52px;
  }

  .pz-login-left-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    color: var(--cream);
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: 6px;
  }

  .pz-login-left-brand span { color: var(--gold); }

  .pz-login-left-sub {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 32px;
  }

  .pz-login-left-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    font-style: italic;
    color: rgba(245,240,232,0.7);
    line-height: 1.4;
    max-width: 320px;
  }

  /* Grid lines on left panel */
  .pz-login-left::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(184,150,90,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184,150,90,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* ── RIGHT PANEL ── */
  .pz-login-right {
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 48px;
    position: relative;
    border-left: 1px solid var(--border);
    background: #0c0f0b;
  }

  @media (max-width: 959px) {
    .pz-login-right {
      max-width: 100%;
      border-left: none;
      padding: 48px 28px;
    }
  }

  /* Ambient glow */
  .pz-login-right::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184,150,90,0.06) 0%, transparent 65%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .pz-login-form-wrap {
    width: 100%;
    max-width: 380px;
    position: relative;
    z-index: 2;
    animation: pz-login-up 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes pz-login-up {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Mobile brand */
  .pz-login-mobile-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: var(--cream);
    letter-spacing: -0.01em;
    margin-bottom: 4px;
    display: none;
  }

  .pz-login-mobile-brand span { color: var(--gold); }

  @media (max-width: 959px) { .pz-login-mobile-brand { display: block; } }

  /* Eyebrow */
  .pz-login-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }

  .pz-login-eyeline { width: 24px; height: 1px; background: var(--gold); }

  .pz-login-eyelabel {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
  }

  /* Title */
  .pz-login-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 300;
    color: var(--cream);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .pz-login-title em { font-style: italic; color: var(--gold-light); }

  .pz-login-subtitle {
    font-size: 13px;
    font-weight: 300;
    color: var(--muted);
    margin-bottom: 40px;
    line-height: 1.6;
  }

  /* Fields */
  .pz-login-field {
    margin-bottom: 18px;
  }

  .pz-login-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
    font-weight: 400;
  }

  .pz-login-input {
    width: 100%;
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 14px 16px;
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.25s, background 0.25s;
  }

  .pz-login-input::placeholder { color: rgba(122,118,112,0.5); }

  .pz-login-input:focus {
    border-color: rgba(184,150,90,0.5);
    background: rgba(184,150,90,0.03);
  }

  /* OTP boxes */
  .pz-otp-hint {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 20px;
    line-height: 1.6;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 2px;
    background: rgba(184,150,90,0.03);
  }

  .pz-otp-hint strong { color: var(--gold-light); font-weight: 400; }

  /* Submit button */
  .pz-login-submit {
    width: 100%;
    padding: 15px;
    background: var(--gold);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s, opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .pz-login-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.15);
    transform: translateX(-101%);
    transition: transform 0.4s ease;
  }

  .pz-login-submit:hover:not(:disabled) { box-shadow: 0 8px 28px rgba(184,150,90,0.4); }
  .pz-login-submit:hover:not(:disabled)::before { transform: translateX(0); }
  .pz-login-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Loading spinner */
  .pz-spinner {
    width: 14px; height: 14px;
    border: 1.5px solid rgba(10,12,9,0.3);
    border-top-color: var(--ink);
    border-radius: 50%;
    animation: pz-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes pz-spin { to { transform: rotate(360deg); } }

  /* Back link */
  .pz-login-back {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.08em;
    cursor: pointer;
    padding: 0;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }

  .pz-login-back:hover { color: var(--gold); }

  /* Divider */
  .pz-login-divider {
    height: 1px;
    background: var(--border);
    margin: 28px 0;
  }

  /* Register link */
  .pz-login-register {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
  }

  .pz-login-register a {
    color: var(--gold-light);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.2s;
  }

  .pz-login-register a:hover { color: var(--cream); }

  /* Step indicator */
  .pz-login-steps {
    display: flex;
    gap: 6px;
    margin-bottom: 36px;
  }

  .pz-login-step {
    height: 2px;
    flex: 1;
    border-radius: 2px;
    background: var(--border);
    transition: background 0.4s;
  }

  .pz-login-step.done { background: var(--gold); }
`;

const Login = () => {
  const { auth, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth?.isLoggedIn) navigate(location.state?.from || "/", { replace: true });
  }, [auth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter email & password");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password, role: "user" });
      if (res.data.success) { setOtpSent(true); }
      else alert(res.data.message || "Login failed");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Enter OTP");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (res.data.success) {
        login({ ...res.data.user, isLoggedIn: true });

        if (location.state?.from) return navigate(location.state.from, { replace: true });
        const role = res.data.user?.role;
        if (role === "admin") navigate("/admin-dashboard", { replace: true });
        else if (role === "expert") navigate("/experts/experts-dashboard", { replace: true });
        else navigate("/", { replace: true });
      } else alert(res.data.message || "OTP failed");
    } catch { alert("OTP verification failed"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{css}</style>
      <div className="pz-login-root">

        {/* ── Left image panel ── */}
        <div className="pz-login-left">
          <img src="/img1.jpg" alt="PropZo" className="pz-login-left-img" />
          <div className="pz-login-left-overlay">
            <div className="pz-login-left-brand">Prop<span>Zo</span></div>
            <div className="pz-login-left-sub">Premium Real Estate</div>
            <p className="pz-login-left-tagline">
              Your journey to the perfect home begins with a single step.
            </p>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="pz-login-right">
          <div className="pz-login-form-wrap">

            {/* Mobile brand */}
            <div className="pz-login-mobile-brand">Prop<span>Zo</span></div>

            {/* Step indicator */}
            <div className="pz-login-steps" style={{ marginTop: 16 }}>
              <div className="pz-login-step done" />
              <div className={`pz-login-step${otpSent ? " done" : ""}`} />
            </div>

            {/* Eyebrow */}
            <div className="pz-login-eyebrow">
              <span className="pz-login-eyeline" />
              <span className="pz-login-eyelabel">
                {otpSent ? "Step 2 of 2" : "Step 1 of 2"}
              </span>
            </div>

            {!otpSent ? (
              <>
                <h2 className="pz-login-title">Welcome <em>Back</em></h2>
                <p className="pz-login-subtitle">Sign in to access your PropZo account.</p>

                <div className="pz-login-field">
                  <label className="pz-login-label">Email Address</label>
                  <input
                    type="email"
                    className="pz-login-input"
                    placeholder="you@propzo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="pz-login-field">
                  <label className="pz-login-label">Password</label>
                  <input
                    type="password"
                    className="pz-login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="pz-login-submit"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? <><span className="pz-spinner" /> Sending OTP…</> : <>Continue →</>}
                </button>
              </>
            ) : (
              <>
                <h2 className="pz-login-title">Verify <em>OTP</em></h2>
                <p className="pz-login-subtitle">A 6-digit code was sent to your email.</p>

                <div className="pz-otp-hint">
                  Code sent to <strong>{email}</strong>. Check your inbox or spam folder.
                </div>

                <div className="pz-login-field">
                  <label className="pz-login-label">One-Time Password</label>
                  <input
                    type="text"
                    className="pz-login-input"
                    placeholder="_ _ _ _ _ _"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    style={{ letterSpacing: "0.3em", fontSize: 18, textAlign: "center" }}
                  />
                </div>

                <button
                  className="pz-login-submit"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? <><span className="pz-spinner" /> Verifying…</> : <>Verify & Sign In</>}
                </button>

                <button className="pz-login-back" onClick={() => { setOtpSent(false); setOtp(""); }} style={{ marginTop: 16, marginBottom: 0 }}>
                  ← Change email or password
                </button>
              </>
            )}

            <div className="pz-login-divider" />

            <p className="pz-login-register">
              Don't have an account? <Link to="/register">Create one →</Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
