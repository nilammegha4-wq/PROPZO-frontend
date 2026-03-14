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
    bio: "",
    achievements: "",
    location: "",
    dealsClosed: 0,
  });

  useEffect(() => {
    if (id) fetchAgent();
  }, [id]);

  const fetchAgent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/agents/${id}`);
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
      await axios.put(`http://localhost:5000/api/agents/${id}`, formData);
      alert("Agent updated successfully");
      navigate("/admin/agent");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5ede6", fontFamily: "'DM Sans', sans-serif", color: "#B2846B" }}>
      Loading agent details...
    </div>
  );

  if (error) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5ede6", fontFamily: "'DM Sans', sans-serif", color: "#b85c3a" }}>
      {error}
    </div>
  );

  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper}>
          {/* Page Header */}
          <div style={s.pageHeader}>
            <div>
              <p style={s.breadcrumb}>Admin / Agents / Edit</p>
              <h1 style={s.pageTitle}>Edit Agent</h1>
            </div>
            <button style={s.backBtn} onClick={() => navigate(-1)}>
              ← Back to Agent List
            </button>
          </div>

          <div style={s.formCard}>
            {/* Card Header */}
            <div style={s.formHeader}>
              <div style={s.iconCircle}>📝</div>
              <div>
                <h2 style={s.cardTitle}>Edit Agent Profile</h2>
                <p style={s.cardSubtitle}>Modify details for Agent ID: #{id?.slice(-5)}</p>
              </div>
            </div>

            <form style={s.form} onSubmit={handleUpdate}>

              {/* Personal Info */}
              <Section title="Personal Information" icon="🏷️">
                <Field label="Full Name">
                  <input style={s.input} type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </Field>
                <div style={{ ...s.grid2, marginTop: 16 }}>
                  <Field label="Email Address">
                    <input style={s.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </Field>
                  <Field label="Phone Number">
                    <input style={s.input} type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  </Field>
                </div>
                <div style={{ ...s.grid2, marginTop: 16 }}>
                  <Field label="Location">
                    <input style={s.input} type="text" name="location" value={formData.location} onChange={handleChange} />
                  </Field>
                  <Field label="Agent Image URL">
                    <input style={s.input} type="text" name="image" value={formData.image} onChange={handleChange} />
                  </Field>
                </div>
              </Section>

              {/* Role & Status */}
              <Section title="Role & Status" icon="⚙️">
                <div style={s.grid2}>
                  <Field label="Agent Role">
                    <select style={s.input} name="role" value={formData.role} onChange={handleChange}>
                      <option value="Senior Agent">Senior Agent</option>
                      <option value="Junior Agent">Junior Agent</option>
                      <option value="Sales Lead">Sales Lead</option>
                      <option value="Property Manager">Property Manager</option>
                    </select>
                  </Field>
                  <Field label="Employment Status">
                    <select style={s.input} name="status" value={formData.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </Field>
                </div>
              </Section>

              {/* Performance */}
              <Section title="Performance" icon="📊">
                <div style={s.grid3}>
                  <Field label="Experience">
                    <input style={s.input} type="text" name="experience" value={formData.experience} onChange={handleChange} />
                  </Field>
                  <Field label="Rating (0–5)">
                    <input style={s.input} type="number" name="rating" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} />
                  </Field>
                  <Field label="Deals Closed">
                    <input style={s.input} type="number" name="dealsClosed" value={formData.dealsClosed} onChange={handleChange} />
                  </Field>
                </div>
              </Section>

              {/* Bio & Achievements */}
              <Section title="Bio & Achievements" icon="📋">
                <Field label="Professional Bio">
                  <textarea
                    style={{ ...s.input, minHeight: 100, resize: "vertical", lineHeight: 1.6 }}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </Field>
                <div style={{ marginTop: 16 }}>
                  <Field label="Key Achievements (comma separated)">
                    <input
                      style={s.input}
                      type="text"
                      name="achievements"
                      value={Array.isArray(formData.achievements) ? formData.achievements.join(", ") : formData.achievements}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
              </Section>

              {/* Login */}
              <Section title="Login Credentials" icon="🔐">
                <Field label="Password">
                  <input style={s.input} type="password" name="password" value={formData.password} onChange={handleChange} />
                </Field>
              </Section>

              {/* Actions */}
              <div style={s.submitRow}>
                <button type="button" style={s.cancelBtn} onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button type="submit" style={s.submitBtn}>
                  Update Profile
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={s.section}>
      <div style={s.sectionHeader}>
        <span style={s.sectionIcon}>{icon}</span>
        <h3 style={s.sectionTitle}>{title}</h3>
      </div>
      <div style={s.sectionBody}>{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  );
}

<<<<<<< HEAD
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

  * { box-sizing: border-box; }

  input::placeholder, textarea::placeholder {
    color: #a89385;
    font-size: 13.5px;
  }
  input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: #B2846B !important;
    box-shadow: 0 0 0 3px rgba(178,132,107,0.15) !important;
  }
`;

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
    fontFamily: "'DM Sans', sans-serif",
  },
  accentBar: {
    width: 5,
    background: "linear-gradient(180deg, #4C3324 0%, #B2846B 100%)",
    flexShrink: 0,
  },
  wrapper: {
    flex: 1,
    maxWidth: 1000,
    margin: "0 auto",
    padding: "48px 40px",
    width: "100%",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 12,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  backBtn: {
    padding: "9px 18px",
    borderRadius: 9,
    border: "1.5px solid #d9c8bb",
    background: "#fff",
    color: "#7a5c4a",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  formCard: {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid #e8ddd5",
    boxShadow: "0 10px 30px rgba(76,51,36,0.07)",
    overflow: "hidden",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "28px 32px 24px",
    borderBottom: "1px solid #e8ddd5",
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#e8ddd5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    flexShrink: 0,
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
  },
  cardSubtitle: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#7a5c4a",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "28px 32px",
  },
  section: {
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #e8ddd5",
    boxShadow: "0 2px 8px rgba(76,51,36,0.04)",
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 20px",
    borderBottom: "1px solid #e8ddd5",
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#627B68",
    margin: 0,
    fontFamily: "'Sora', sans-serif",
  },
  sectionBody: { padding: "20px" },
  grid2: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 20px" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 20px" },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#5a3e30",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "11px 14px",
    borderRadius: 9,
    border: "1.5px solid #ddd0c6",
    fontSize: 14,
    color: "#3b2416",
    background: "#fdf9f7",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.18s, box-shadow 0.18s",
    width: "100%",
  },
  submitRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 8,
  },
  cancelBtn: {
    padding: "12px 28px",
    borderRadius: 10,
    border: "1.5px solid #d9c8bb",
    background: "#fff",
    color: "#7a5c4a",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  submitBtn: {
    padding: "12px 36px",
    borderRadius: 10,
    border: "none",
    background: "#627B68",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(98,123,104,0.35)",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
  },
=======
const containerStyle = {
  padding: "60px 20px",
  backgroundColor: "#f9f6f1", // Brand Cream
  minHeight: "100vh",
  fontFamily: "'DM Sans', sans-serif",
};

const btnBack = {
  display: "block",
  margin: "0 auto 20px auto",
  maxWidth: "650px",
  background: "none",
  border: "none",
  color: "#b2846b", // Brand Tan
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
  border: "1px solid rgba(228, 203, 182, 0.3)",
  boxShadow: "0 10px 25px -5px rgba(76, 51, 36, 0.05)",
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
  backgroundColor: "rgba(129, 155, 139, 0.15)", // Brand Sage Light
  color: "#627b68",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const titleStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "800",
  color: "#4c3324", // Brand Brown
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
  color: "#627b68", // Brand Sage Dark
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(228, 203, 182, 0.3)",
  fontSize: "15px",
  outline: "none",
  backgroundColor: "#f9f6f1",
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
  backgroundColor: "#627b68", // Brand Sage Dark
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(98, 123, 104, 0.2)",
};

const btnCancel = {
  padding: "14px 28px",
  backgroundColor: "#fff",
  color: "#64748b",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
>>>>>>> e85f1ae (nilam2)
};
