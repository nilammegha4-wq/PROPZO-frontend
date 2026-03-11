import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Topbar() {
  const [admin, setAdmin] = useState({ name: "P" });

  useEffect(() => {
    // Fetch admin info from backend
    axios.get("/api/admin/me")  // Replace with your backend route
      .then(res => {
        if (res.data.success) {
          setAdmin(res.data.admin);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <nav style={topNavStyle}>
      <div style={logoStyle}>Propzo</div>
      <div style={avatarCircle}>{admin.name.charAt(0)}</div>
    </nav>
  );
}

const topNavStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 6%",
  backgroundColor: "#fff",
  borderBottom: "1px solid #e2e8f0",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const logoStyle = {
  fontSize: "26px",
  fontWeight: "900",
  color: "#1e293b",
  letterSpacing: "-1px",
};

const avatarCircle = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  backgroundColor: "#4F46E5",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  fontWeight: "bold",
};
