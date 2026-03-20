<<<<<<< HEAD
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AddAgent() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     role: "Junior Agent",
//     status: "Active",
//     password: "",
//     image: "",
//     experience: "",
//     rating: 0,

//     // NEW FIELDS
//     bio: "",
//     achievements: "",
//     location: "",
//     dealsClosed: 0
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "rating" || name === "dealsClosed"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const submitData = {
//         ...formData,
//         achievements: formData.achievements
//           ? formData.achievements.split(",").map(a => a.trim())
//           : []
//       };

//       await axios.post("http://localhost:5000/api/agents", submitData);
//       alert("Agent added successfully");
//       navigate("/admin/agent");
//     } catch (error) {
//       console.error(error);
//       alert("Error adding agent");
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <button onClick={() => navigate(-1)} style={btnBack}>
//         ← Back to Agent List
//       </button>

//       <div style={formCard}>
//         <div style={formHeader}>
//           <div style={iconCircle}>👤</div>
//           <div>
//             <h1 style={titleStyle}>Add New Agent</h1>
//             <p style={subtitleStyle}>
//               Create a new Agent profile for your Propzo team.
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} style={formLayout}>

//           {/* Full Name */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="e.g. Vikram Sethi"
//               value={formData.fullName}
//               onChange={handleChange}
//               style={inputStyle}
//               required
//             />
//           </div>

//           {/* Email & Phone */}
//           <div style={gridRow}>
//             <div style={inputGroup}>
//               <label style={labelStyle}>Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="vikram@propzo.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={inputGroup}>
//               <label style={labelStyle}>Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="+91 98765 43210"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           {/* Role & Status */}
//           <div style={gridRow}>
//             <div style={inputGroup}>
//               <label style={labelStyle}>Agent Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 style={selectStyle}
//               >
//                 <option>Senior Agent</option>
//                 <option>Junior Agent</option>
//                 <option>Sales Lead</option>
//                 <option>Property Manager</option>
//               </select>
//             </div>

//             <div style={inputGroup}>
//               <label style={labelStyle}>Initial Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 style={selectStyle}
//               >
//                 <option value="Active">Active</option>
//                 <option value="On Leave">On Leave</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>

//           {/* Password */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Login Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter secure password"
//               value={formData.password}
//               onChange={handleChange}
//               style={inputStyle}
//               required
//             />
//           </div>

//           {/* Image URL */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Agent Image URL</label>
//             <input
//               type="text"
//               name="image"
//               placeholder="https://example.com/agent.jpg"
//               value={formData.image}
//               onChange={handleChange}
//               style={inputStyle}
//               required
//             />
//           </div>

//           {/* Experience */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Experience</label>
//             <input
//               type="text"
//               name="experience"
//               placeholder="e.g. 5+ Years"
//               value={formData.experience}
//               onChange={handleChange}
//               style={inputStyle}
//               required
//             />
//           </div>

//           {/* Rating */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Rating (0 - 5)</label>
//             <input
//               type="number"
//               name="rating"
//               min="0"
//               max="5"
//               step="0.1"
//               value={formData.rating}
//               onChange={handleChange}
//               style={inputStyle}
//               required
//             />
//           </div>

//           {/* Location */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Location</label>
//             <input
//               type="text"
//               name="location"
//               placeholder="e.g. Mumbai, India"
//               value={formData.location}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//           </div>

//           {/* Deals Closed */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Deals Closed</label>
//             <input
//               type="number"
//               name="dealsClosed"
//               placeholder="e.g. 25"
//               value={formData.dealsClosed}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//           </div>

//           {/* Professional Bio */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Professional Bio</label>
//             <textarea
//               name="bio"
//               placeholder="Write short professional bio..."
//               value={formData.bio}
//               onChange={handleChange}
//               style={{ ...inputStyle, minHeight: "100px" }}
//             />
//           </div>

//           {/* Key Achievements */}
//           <div style={inputGroup}>
//             <label style={labelStyle}>Key Achievements (Comma Separated)</label>
//             <input
//               type="text"
//               name="achievements"
//               placeholder="Top Seller 2023, Luxury Expert, 100+ Closings"
//               value={formData.achievements}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//           </div>

//           <div style={actionArea}>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               style={btnCancel}
//             >
//               Discard
//             </button>
//             <button type="submit" style={btnSubmit}>
//               Confirm & Add Agent
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

/* ================= STYLES ================= */

const containerStyle = {
  padding: "40px",
  background: "#f9f6f1", // Brand Cream
  minHeight: "100vh",
};

const btnBack = {
  marginBottom: "20px",
  background: "none",
  border: "none",
  color: "#b2846b", // Brand Tan
  cursor: "pointer",
  fontWeight: "600",
};

const formCard = {
  maxWidth: "800px",
  margin: "auto",
  background: "#ffffff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(76, 51, 36, 0.08)",
};

const formHeader = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "30px",
};

const iconCircle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "rgba(129, 155, 139, 0.15)", // Brand Sage Light
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const titleStyle = { margin: 0, color: "#4c3324" };
const subtitleStyle = { margin: 0, color: "#64748b" };

const formLayout = { display: "flex", flexDirection: "column", gap: "20px" };
const inputGroup = { display: "flex", flexDirection: "column" };
const labelStyle = { marginBottom: "6px", fontWeight: "600" };

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(228, 203, 182, 0.4)",
  outline: "none",
};

const selectStyle = inputStyle;

const gridRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const actionArea = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "15px",
  marginTop: "20px",
};

const btnCancel = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  cursor: "pointer",
};

const btnSubmit = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#627b68", // Brand Sage Dark
  color: "#ffffff",
  cursor: "pointer",
};


=======
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddAgent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Junior Agent",
    status: "Active",
    password: "",
    image: null,
    experience: "",
    rating: 0,
    bio: "",
    achievements: "",
    location: "",
    dealsClosed: 0,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "rating" || name === "dealsClosed" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "achievements") {
          const achievementsArray = formData[key]
            ? formData[key].split(",").map((a) => a.trim()).filter((a) => a !== "")
            : [];
          achievementsArray.forEach((achieve) => submitData.append("achievements", achieve));
        } else if (key === "image" && formData[key]) {
          submitData.append("image", formData[key]);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:5000/api/agents", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Agent added successfully");
      navigate("/admin/agent");
    } catch (error) {
      console.error(error);
      alert("Error adding agent");
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper}>
          {/* Page Header */}
          <div style={s.pageHeader}>
            <div>
              <p style={s.breadcrumb}>Admin / Agents / New</p>
              <h1 style={s.pageTitle}>Add Agent</h1>
            </div>
            <button style={s.backBtn} onClick={() => navigate(-1)}>
              ← Back to Agent List
            </button>
          </div>

          <div style={s.formCard}>
            {/* Card Header */}
            <div style={s.formHeader}>
              <div style={s.iconCircle}>👤</div>
              <div>
                <h2 style={s.cardTitle}>New Agent Profile</h2>
                <p style={s.cardSubtitle}>Create a new agent profile for your team.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={s.form}>

              {/* Full Name */}
              <Section title="Personal Information" icon="🏷️">
                <div style={s.grid1}>
                  <Field label="Full Name">
                    <input style={s.input} type="text" name="fullName" placeholder="e.g. Vikram Sethi" value={formData.fullName} onChange={handleChange} required />
                  </Field>
                </div>
                <div style={{ ...s.grid2, marginTop: 16 }}>
                  <Field label="Email Address">
                    <input style={s.input} type="email" name="email" placeholder="vikram@propzo.com" value={formData.email} onChange={handleChange} required />
                  </Field>
                  <Field label="Phone Number">
                    <input style={s.input} type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                  </Field>
                </div>
                <div style={{ ...s.grid2, marginTop: 16 }}>
                  <Field label="Location">
                    <input style={s.input} type="text" name="location" placeholder="e.g. Mumbai, India" value={formData.location} onChange={handleChange} />
                  </Field>
                  <Field label="Agent Profile Photo">
                    <input style={{ ...s.input, padding: "7px" }} type="file" name="image" accept="image/*" onChange={handleChange} required />
                  </Field>
                </div>
              </Section>

              {/* Role & Status */}
              <Section title="Role & Status" icon="⚙️">
                <div style={s.grid2}>
                  <Field label="Agent Role">
                    <select style={s.input} name="role" value={formData.role} onChange={handleChange}>
                      <option>Senior Agent</option>
                      <option>Junior Agent</option>
                      <option>Sales Lead</option>
                      <option>Property Manager</option>
                    </select>
                  </Field>
                  <Field label="Initial Status">
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
                    <input style={s.input} type="text" name="experience" placeholder="e.g. 5+ Years" value={formData.experience} onChange={handleChange} required />
                  </Field>
                  <Field label="Rating (0–5)">
                    <input style={s.input} type="number" name="rating" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} required />
                  </Field>
                  <Field label="Deals Closed">
                    <input style={s.input} type="number" name="dealsClosed" placeholder="e.g. 25" value={formData.dealsClosed} onChange={handleChange} />
                  </Field>
                </div>
              </Section>

              {/* Bio & Achievements */}
              <Section title="Bio & Achievements" icon="📋">
                <Field label="Professional Bio">
                  <textarea
                    style={{ ...s.input, minHeight: 100, resize: "vertical", lineHeight: 1.6 }}
                    name="bio"
                    placeholder="Write a short professional bio..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </Field>
                <div style={{ marginTop: 16 }}>
                  <Field label="Key Achievements (comma separated)">
                    <input style={s.input} type="text" name="achievements" placeholder="Top Seller 2023, Luxury Expert, 100+ Closings" value={formData.achievements} onChange={handleChange} />
                  </Field>
                </div>
              </Section>

              {/* Login */}
              <Section title="Login Credentials" icon="🔐">
                <Field label="Login Password">
                  <input style={s.input} type="password" name="password" placeholder="Enter secure password" value={formData.password} onChange={handleChange} required />
                </Field>
              </Section>

              {/* Actions */}
              <div style={s.submitRow}>
                <button type="button" style={s.cancelBtn} onClick={() => navigate(-1)}>
                  Discard
                </button>
                <button type="submit" style={s.submitBtn}>
                  Confirm & Add Agent
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
  grid1: { display: "grid", gridTemplateColumns: "1fr" },
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
};
