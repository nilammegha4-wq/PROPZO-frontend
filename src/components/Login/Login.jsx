// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { 
//   FaArrowLeft, FaArrowRight, FaGlobe
// } from "react-icons/fa";

// export default function Login() {
//   const { auth, login } = useAuth();
//   // const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Forgot Password States
//   const [forgotMode, setForgotMode] = useState(null); // 'email', 'reset', or null
//   const [resetOtp, setResetOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (auth?.isLoggedIn) {
//       navigate(location.state?.from || "/", { replace: true });
//     }
//   }, [auth]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return alert("Enter email & password");
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/login", { 
//         email, 
//         password, 
//         role: "user" 
//       });
//       if (res.data.success) {
//         setOtpSent(true);
//       } else {
//         alert(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp) return alert("Enter OTP");
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { 
//         email, 
//         otp 
//       });
//       if (res.data.success) {
//         login({ ...res.data.user, isLoggedIn: true });
//         if (location.state?.from) {
//           navigate(location.state.from, { replace: true });
//           return;
//         }
//         const role = res.data.user?.role;
//         if (role === "admin") navigate("/admin-dashboard", { replace: true });
//         else if (role === "expert") navigate("/experts/experts-dashboard", { replace: true });
//         else navigate("/", { replace: true });
//       } else {
//         alert(res.data.message || "OTP failed");
//       }
//     } catch {
//       alert("OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FORGOT PASSWORD HANDLERS
//   const handleRequestReset = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email");
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
//       if (res.data.success) {
//         alert("Reset code sent to your email");
//         setForgotMode('reset');
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error sending reset code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (!resetOtp || !newPassword) return alert("Enter code and new password");
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/reset-password", { 
//         email, 
//         otp: resetOtp, 
//         newPassword 
//       });
//       if (res.data.success) {
//         alert("Password reset successful! Please login with your new password.");
//         setForgotMode(null);
//         setPassword("");
//         setResetOtp("");
//         setNewPassword("");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
//         .custom-input:focus { border-color: #f87171 !important; box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.1); }
//         .social-icon:hover { color: #f87171 !important; }
//         @media (max-width: 1000px) {
//           .left-panel { display: none !important; }
//           .right-panel { width: 100% !important; border-radius: 40px !important; }
//         }
//       `}</style>

//       <div style={styles.card}>

//         {/* LEFT PANEL - DYNAMIC BACKGROUND */}
//         <div style={styles.leftPanel} className="left-panel">
//           <img src="/3.jpg" alt="Hero" style={styles.bgImg} />
//           <div style={styles.overlay}>

//           </div>
//         </div>

//         {/* RIGHT PANEL - LOGIN FORM */}
//         <div style={styles.rightPanel} className="right-panel">
//           <div style={styles.formContent}>
//             <div style={styles.formContainer}>
//               {/* FORGOT PASSWORD: REQUEST EMAIL */}
//               {forgotMode === 'email' && (
//                 <>
//                   <h1 style={styles.h1}>Password Recovery</h1>
//                   <p style={styles.p}>Enter your email to receive a reset code</p>
//                   <form onSubmit={handleRequestReset} style={styles.form}>
//                      <div style={styles.inputGroup}>
//                         <label style={styles.label}>Email address</label>
//                         <input 
//                           type="email" 
//                           style={styles.input} 
//                           className="custom-input"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           placeholder="Your registered email"
//                           required
//                         />
//                      </div>
//                      <button type="submit" style={styles.loginBtn} disabled={loading}>
//                         {loading ? "Sending..." : "Send Reset Code"}
//                      </button>
//                      <button type="button" onClick={() => setForgotMode(null)} style={styles.backLink}>
//                         Back to Login
//                      </button>
//                   </form>
//                 </>
//               )}

//               {/* FORGOT PASSWORD: RESET FORM */}
//               {forgotMode === 'reset' && (
//                 <>
//                   <h1 style={styles.h1}>Set New Password</h1>
//                   <p style={styles.p}>Verification code sent to {email}</p>
//                   <form onSubmit={handleResetPassword} style={styles.form}>
//                      <div style={styles.inputGroup}>
//                         <label style={styles.label}>Reset Code</label>
//                         <input 
//                           type="text" 
//                           style={styles.input} 
//                           className="custom-input"
//                           value={resetOtp}
//                           onChange={(e) => setResetOtp(e.target.value)}
//                           placeholder="6-digit code"
//                           required
//                         />
//                      </div>
//                      <div style={styles.inputGroup}>
//                         <label style={styles.label}>New Password</label>
//                         <input 
//                           type="password" 
//                           style={styles.input} 
//                           className="custom-input"
//                           value={newPassword}
//                           onChange={(e) => setNewPassword(e.target.value)}
//                           placeholder="Minimum 6 characters"
//                           required
//                         />
//                      </div>
//                      <button type="submit" style={styles.loginBtn} disabled={loading}>
//                         {loading ? "Resetting..." : "Update Password"}
//                      </button>
//                   </form>
//                 </>
//               )}

//               {/* LOGIN MODE */}
//               {!forgotMode && (
//                 <>
//                   {!otpSent ? (
//                     <>
//                       <h1 style={styles.h1}>Hi Designer</h1>
//                       <p style={styles.p}>Welcome to UISOCIAL</p>

//                       <form onSubmit={handleLogin} style={styles.form}>
//                          <div style={styles.inputGroup}>
//                             <label style={styles.label}>Email</label>
//                             <input 
//                               type="email" 
//                               style={styles.input} 
//                               className="custom-input"
//                               value={email}
//                               onChange={(e) => setEmail(e.target.value)}
//                               required
//                             />
//                          </div>

//                          <div style={styles.inputGroup}>
//                             <label style={styles.label}>Password</label>
//                             <input 
//                               type="password" 
//                               style={styles.input} 
//                               className="custom-input"
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                               required
//                             />
//                             <div style={{textAlign: 'right'}}>
//                                <span 
//                                   onClick={() => setForgotMode('email')} 
//                                   style={{...styles.forgot, cursor: 'pointer'}}
//                                >
//                                   Forgot password ?
//                                </span>
//                             </div>
//                          </div>


//                          <button type="submit" style={styles.loginBtn} disabled={loading}>
//                             {loading ? "Processing..." : "Login"}
//                          </button>
//                       </form>
//                     </>
//                   ) : (
//                     <>
//                       <h1 style={styles.h1}>Verify Access</h1>
//                       <p style={styles.p}>Six-digit code sent to {email}</p>

//                       <form onSubmit={handleVerifyOtp} style={styles.form}>
//                          <div style={styles.inputGroup}>
//                             <label style={styles.label}>OTP Code</label>
//                             <input 
//                               type="text" 
//                               style={{...styles.input, textAlign: 'center', letterSpacing: '8px', fontSize: '20px'}} 
//                               className="custom-input"
//                               maxLength={6}
//                               value={otp}
//                               onChange={(e) => setOtp(e.target.value)}
//                               required
//                             />
//                          </div>

//                          <button type="submit" style={styles.loginBtn} disabled={loading}>
//                             {loading ? "Verifying..." : "Confirm & Enter"}
//                          </button>
//                          <button type="button" onClick={() => setOtpSent(false)} style={styles.backLink}>
//                             Back to login
//                          </button>
//                       </form>
//                     </>
//                   )}
//                 </>
//               )}

//               <p style={styles.footerText}>
//                  Don't have an account? <Link to="/register" style={{color: '#f87171', fontWeight: '500'}}>Sign up</Link>
//               </p>

//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: { 
//     minHeight: "100vh", 
//     backgroundColor: "#eef1f5", 
//     display: "flex", 
//     alignItems: "center", 
//     justifyContent: "center", 
//     fontFamily: "'DM Sans', sans-serif",
//     padding: "88px 20px 40px"
//   },
//   card: {
//     width: "1100px",
//     maxWidth: "100%",
//     minHeight: "750px",
//     maxHeight: "95vh",
//     backgroundColor: "#fff",
//     borderRadius: "60px",
//     display: "flex",
//     boxShadow: "0 50px 100px -20px rgba(0,0,0,0.12)",
//     overflow: "hidden"
//   },

//   // LEFT PANEL - IMAGE WITH DIAGONAL CLIP
//   leftPanel: { 
//     width: "50%", 
//     position: "relative", 
//     backgroundColor: "#000",
//     clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
//     margin: "0",
//     borderRadius: "60px 0 0 60px",
//     overflow: "hidden"
//   },
//   bgImg: { 
//     width: "100%", 
//     height: "100%", 
//     objectFit: "cover",
//     filter: "brightness(0.7)"
//   },
//   overlay: { 
//     position: "absolute", 
//     inset: 0, 
//     background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6))", 
//     padding: "40px", 
//     display: "flex", 
//     flexDirection: "column", 
//     justifyContent: "space-between" 
//   },
//   headNav: { display: "flex", justifyContent: "space-between", alignItems: "center" },
//   navLabel: { color: "#fff", fontSize: "14px", fontWeight: "600" },
//   navLabelLink: { color: "#fff", fontSize: "14px", fontWeight: "600", textDecoration: "none" },
//   rightNav: { display: "flex", gap: "24px", alignItems: "center" },
//   joinBtn: { 
//     backgroundColor: "transparent", 
//     color: "#fff", 
//     border: "1.5px solid #fff", 
//     borderRadius: "25px", 
//     padding: "10px 22px", 
//     fontSize: "13px", 
//     fontWeight: "600", 
//     cursor: "pointer" 
//   },

//   profileArea: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
//   userBadge: { display: "flex", alignItems: "center", gap: "12px" },
//   avatar: { width: "42px", height: "42px", borderRadius: "50%", border: "2px solid #fff" },
//   userInfo: { display: "flex", flexDirection: "column" },
//   userName: { color: "#fff", fontSize: "14px", fontWeight: "700" },
//   userRole: { color: "rgba(255,255,255,0.8)", fontSize: "12px" },
//   arrowControls: { display: "flex", gap: "10px" },
//   arrowBtn: { 
//     backgroundColor: "rgba(255,255,255,0.15)", 
//     color: "#fff", 
//     border: "1.5px solid rgba(255,255,255,0.4)", 
//     borderRadius: "50%", 
//     width: "36px", 
//     height: "36px", 
//     display: "flex", 
//     alignItems: "center", 
//     justifyContent: "center", 
//     cursor: "pointer",
//     fontSize: "12px"
//   },

//   // RIGHT PANEL
//   rightPanel: { 
//     flex: 1, 
//     display: "flex", 
//     flexDirection: "column", 
//     padding: "40px 60px",
//     position: "relative"
//   },
//   formContent: { 
//     width: "100%", 
//     height: "100%", 
//     display: "flex", 
//     flexDirection: "column",
//     justifyContent: "space-between"
//   },
//   topRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
//   brand: { fontSize: "20px", fontWeight: "800", color: "#1e293b", margin: 0, letterSpacing: "-0.5px" },
//   langBtn: { 
//     backgroundColor: "#f1f5f9", 
//     border: "none", 
//     borderRadius: "12px", 
//     padding: "8px 16px", 
//     fontSize: "13px", 
//     fontWeight: "600", 
//     display: "flex", 
//     alignItems: "center", 
//     gap: "8px", 
//     cursor: "pointer" 
//   },

//   formContainer: { 
//     maxWidth: "400px", 
//     width: "100%", 
//     margin: "0 auto",
//     textAlign: "center"
//   },
//   h1: { fontSize: "42px", fontWeight: "700", color: "#111", marginBottom: "8px", letterSpacing: "-1px" },
//   p: { fontSize: "15px", color: "#666", marginBottom: "40px" },

//   form: { display: "flex", flexDirection: "column", gap: "20px" },
//   inputGroup: { display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" },
//   label: { fontSize: "12px", fontWeight: "600", color: "#999" },
//   input: { 
//     width: "100%", 
//     padding: "14px 20px", 
//     borderRadius: "12px", 
//     border: "1px solid #e5e7eb", 
//     fontSize: "14px", 
//     outline: "none", 
//     backgroundColor: "#fff" 
//   },
//   forgot: { fontSize: "12px", color: "#f87171", textDecoration: "none", marginTop: "8px", display: "inline-block" },
//   backLink: { background: 'none', border: 'none', color: '#666', fontSize: '13px', marginTop: '10px', cursor: 'pointer', textDecoration: 'underline' },

//   divider: { display: "flex", alignItems: "center", gap: "15px", margin: "10px 0" },
//   divLine: { flex: 1, height: "1px", backgroundColor: "#f1f5f9" },
//   divText: { fontSize: "13px", color: "#cbd5e1" },

//   googleBtn: { 
//     width: "100%", 
//     padding: "14px", 
//     border: "1px solid #e5e7eb", 
//     borderRadius: "12px", 
//     backgroundColor: "#fff", 
//     display: "flex", 
//     alignItems: "center", 
//     justifyContent: "center", 
//     gap: "12px", 
//     fontSize: "14px", 
//     fontWeight: "600", 
//     cursor: "pointer",
//     color: "#333"
//   },
//   loginBtn: { 
//     width: "100%", 
//     padding: "16px", 
//     backgroundColor: "#ef4444", 
//     color: "#fff", 
//     border: "none", 
//     borderRadius: "15px", 
//     fontSize: "16px", 
//     fontWeight: "700", 
//     cursor: "pointer", 
//     boxShadow: "0 15px 30px -10px rgba(239, 68, 68, 0.4)" 
//   },

//   footerText: { textAlign: "center", fontSize: "13px", color: "#777", marginTop: "25px" },
//   socialRow: { display: "flex", justifyContent: "center", gap: "25px", marginTop: "40px" },
//   socIcon: { color: "#cbd5e1", fontSize: "18px", transition: "0.3s" }
// };
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { auth, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forgotMode, setForgotMode] = useState(null);
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [auth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter email & password");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role: "user",
      });
      if (res.data.success) {
        setOtpSent(true);
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Enter OTP");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (res.data.success) {
        login({ ...res.data.user, isLoggedIn: true });
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
          return;
        }
        const role = res.data.user?.role;
        if (role === "admin") navigate("/admin-dashboard", { replace: true });
        else if (role === "expert") navigate("/experts/experts-dashboard", { replace: true });
        else navigate("/", { replace: true });
      } else {
        alert(res.data.message || "OTP failed");
      }
    } catch {
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      if (res.data.success) {
        alert("Reset code sent to your email");
        setForgotMode("reset");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error sending reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetOtp || !newPassword) return alert("Enter code and new password");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp: resetOtp,
        newPassword,
      });
      if (res.data.success) {
        alert("Password reset successful! Please login with your new password.");
        setForgotMode(null);
        setPassword("");
        setResetOtp("");
        setNewPassword("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
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

        .login-btn {
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
        .login-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .login-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .back-link {
          background: none;
          border: none;
          color: #819B8B;
          font-size: 13px;
          margin-top: 10px;
          cursor: pointer;
          text-decoration: underline;
          font-family: 'DM Sans', sans-serif;
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

              {/* FORGOT: REQUEST EMAIL */}
              {forgotMode === "email" && (
                <>
                  <h1 style={styles.h1}>Password Recovery</h1>
                  <p style={styles.p}>Enter your email to receive a reset code</p>
                  <form onSubmit={handleRequestReset} style={styles.form}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Email address</label>
                      <input
                        type="email"
                        style={styles.input}
                        className="custom-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your registered email"
                        required
                      />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Code"}
                    </button>
                    <button type="button" className="back-link" onClick={() => setForgotMode(null)}>
                      Back to Login
                    </button>
                  </form>
                </>
              )}

              {/* FORGOT: RESET FORM */}
              {forgotMode === "reset" && (
                <>
                  <h1 style={styles.h1}>Set New Password</h1>
                  <p style={styles.p}>Verification code sent to {email}</p>
                  <form onSubmit={handleResetPassword} style={styles.form}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Reset Code</label>
                      <input
                        type="text"
                        style={styles.input}
                        className="custom-input"
                        value={resetOtp}
                        onChange={(e) => setResetOtp(e.target.value)}
                        placeholder="6-digit code"
                        required
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>New Password</label>
                      <input
                        type="password"
                        style={styles.input}
                        className="custom-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        required
                      />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                      {loading ? "Resetting..." : "Update Password"}
                    </button>
                  </form>
                </>
              )}

              {/* LOGIN MODE */}
              {!forgotMode && (
                <>
                  {!otpSent ? (
                    <>
                      <h1 style={styles.h1}>Hi Designer</h1>
                      <p style={styles.p}>Welcome to UISOCIAL</p>
                      <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.inputGroup}>
                          <label style={styles.label}>Email</label>
                          <input
                            type="email"
                            style={styles.input}
                            className="custom-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            required
                          />
                          <div style={{ textAlign: "right" }}>
                            <span
                              onClick={() => setForgotMode("email")}
                              style={styles.forgot}
                            >
                              Forgot password?
                            </span>
                          </div>
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                          {loading ? "Processing..." : "Login"}
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h1 style={styles.h1}>Verify Access</h1>
                      <p style={styles.p}>Six-digit code sent to {email}</p>
                      <form onSubmit={handleVerifyOtp} style={styles.form}>
                        <div style={styles.inputGroup}>
                          <label style={styles.label}>OTP Code</label>
                          <input
                            type="text"
                            style={{
                              ...styles.input,
                              textAlign: "center",
                              letterSpacing: "8px",
                              fontSize: "20px",
                            }}
                            className="custom-input"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                          {loading ? "Verifying..." : "Confirm & Enter"}
                        </button>
                        <button
                          type="button"
                          className="back-link"
                          onClick={() => setOtpSent(false)}
                        >
                          Back to login
                        </button>
                      </form>
                    </>
                  )}
                </>
              )}

              <p style={styles.footerText}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#B2846B", fontWeight: "600" }}>
                  Sign up
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
    /* Warm off-white from palette (lighter tint of #E4CBB6) */
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
    /* Warm shadow tinted toward the darkest palette color */
    boxShadow: "0 50px 100px -20px rgba(76, 51, 36, 0.18)",
    overflow: "hidden",
  },

  /* LEFT PANEL — image with diagonal clip */
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
    /* Gradient using the deep brown → sage green from palette */
    background:
      "linear-gradient(160deg, rgba(76,51,36,0.25) 0%, rgba(98,123,104,0.55) 100%)",
  },

  /* RIGHT PANEL */
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "40px 60px",
    position: "relative",
    /* Very subtle warm tint on the form panel */
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

  /* Typography */
  h1: {
    fontSize: "42px",
    fontWeight: "700",
    /* Deep brown from palette */
    color: "#4C3324",
    marginBottom: "8px",
    letterSpacing: "-1px",
  },
  p: {
    fontSize: "15px",
    /* Muted sage */
    color: "#819B8B",
    marginBottom: "40px",
  },

  /* Form elements */
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    /* Sage green label */
    color: "#627B68",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    /* Warm blush border */
    border: "1.5px solid #E4CBB6",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#FDFAF8",
    color: "#4C3324",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  forgot: {
    fontSize: "12px",
    /* Terracotta accent */
    color: "#B2846B",
    textDecoration: "none",
    marginTop: "8px",
    display: "inline-block",
    cursor: "pointer",
    fontWeight: "500",
  },

  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#819B8B",
    marginTop: "25px",
  },
};
