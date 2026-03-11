import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const pendingUser = JSON.parse(
    localStorage.getItem("pendingUser")
  );

  /* ================= SAFETY ================= */
  useEffect(() => {

    if (!pendingUser) {
      navigate("/login");
    }

  }, [pendingUser, navigate]);

  const handleFinalLogin = async (e) => {

    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: pendingUser.email,
          otp: otp,
        }
      );

      if (res.data.success) {

        const userData = {
          ...res.data.user,
          isLoggedIn: true,
        };

        /* ✅ Save user */
        localStorage.setItem(
          "authUser",
          JSON.stringify(userData)
        );

        /* ✅ Trigger navbar update */
        window.dispatchEvent(
          new Event("authChange")
        );

        /* ✅ Remove temp */
        localStorage.removeItem("pendingUser");

        alert("Login Successful");

        navigate("/home");

      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >

        <h3 className="text-center">
          Enter OTP
        </h3>

        <p className="text-center text-muted">
          Sent to: {pendingUser?.email}
        </p>

        <form onSubmit={handleFinalLogin}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="6-digit OTP"
            value={otp}
            maxLength="6"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Verify & Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Verify;
