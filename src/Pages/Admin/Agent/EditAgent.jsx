import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Junior Agent",
    status: "Active",
    password: "",
    image: "",
    experience: "",
    rating: 0,

    // NEW FIELDS
    bio: "",
    achievements: "",
    location: "",
    dealsClosed: 0
  });

  useEffect(() => {
    if (id) {
      fetchAgent();
    }
  }, [id]);

  const fetchAgent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/agents/${id}`
      );
      setFormData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch agent details");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/agents/${id}`,
        formData
      );
      alert("Agent updated successfully");
      navigate("/admin/agent");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return <div style={{ padding: 40 }}>Loading agent details...</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "red" }}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={btnBack}>
        ← Back to Agent List
      </button>

      <div style={formCard}>
        <div style={formHeader}>
          <div style={iconCircle}>📝</div>
          <div>
            <h1 style={titleStyle}>Edit Agent Profile</h1>
            <p style={subtitleStyle}>
              Modify details for Agent ID: #{id?.slice(-5)}
            </p>
          </div>
        </div>

        <form style={formLayout} onSubmit={handleUpdate}>
          <div style={inputGroup}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={gridRow}>
            <div style={inputGroup}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={gridRow}>
            <div style={inputGroup}>
              <label style={labelStyle}>Agent Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="Senior Agent">Senior Agent</option>
                <option value="Junior Agent">Junior Agent</option>
                <option value="Sales Lead">Sales Lead</option>
                <option value="Property Manager">Property Manager</option>
              </select>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Employment Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          {/* Password */}
          <div style={inputGroup}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Image URL */}
          <div style={inputGroup}>
            <label style={labelStyle}>Agent Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Experience */}
          <div style={inputGroup}>
            <label style={labelStyle}>Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Rating */}
          <div style={inputGroup}>
            <label style={labelStyle}>Rating (0 - 5)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Location */}
          <div style={inputGroup}>
            <label style={labelStyle}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Deals Closed */}
          <div style={inputGroup}>
            <label style={labelStyle}>Deals Closed</label>
            <input
              type="number"
              name="dealsClosed"
              value={formData.dealsClosed}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Professional Bio */}
          <div style={inputGroup}>
            <label style={labelStyle}>Professional Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: "100px" }}
            />
          </div>

          {/* Achievements */}
          <div style={inputGroup}>
            <label style={labelStyle}>Achievements (Comma Separated)</label>
            <input
              type="text"
              name="achievements"
              value={
                Array.isArray(formData.achievements)
                  ? formData.achievements.join(", ")
                  : formData.achievements
              }
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={actionArea}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={btnCancel}
            >
              Cancel
            </button>

            <button type="submit" style={btnSubmit}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  padding: "60px 20px",
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  fontFamily: "'Inter', sans-serif",
};

const btnBack = {
  display: "block",
  margin: "0 auto 20px auto",
  maxWidth: "650px",
  background: "none",
  border: "none",
  color: "#64748b",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
};

const formCard = {
  maxWidth: "650px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "24px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
};

const formHeader = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "35px",
  paddingBottom: "25px",
  borderBottom: "1px solid #f1f5f9",
};

const iconCircle = {
  width: "60px",
  height: "60px",
  borderRadius: "16px",
  backgroundColor: "#F5F3FF",
  color: "#7C3AED",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const titleStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "800",
  color: "#1e293b",
};

const subtitleStyle = {
  margin: "4px 0 0 0",
  color: "#64748b",
  fontSize: "14px",
};

const formLayout = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const gridRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#475569",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  fontSize: "15px",
  outline: "none",
  backgroundColor: "#f9fafb",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
};

const actionArea = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
};

const btnSubmit = {
  padding: "14px 28px",
  backgroundColor: "#4F46E5",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.2)",
};

const btnCancel = {
  padding: "14px 28px",
  backgroundColor: "#fff",
  color: "#64748b",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
};
