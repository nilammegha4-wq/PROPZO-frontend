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
  background: "#f8fafc",
  minHeight: "100vh",
};

const btnBack = {
  marginBottom: "20px",
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "600",
};

const formCard = {
  maxWidth: "800px",
  margin: "auto",
  background: "#ffffff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
  background: "#e0f2fe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const titleStyle = { margin: 0 };
const subtitleStyle = { margin: 0, color: "#64748b" };

const formLayout = { display: "flex", flexDirection: "column", gap: "20px" };
const inputGroup = { display: "flex", flexDirection: "column" };
const labelStyle = { marginBottom: "6px", fontWeight: "600" };

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
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
  background: "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
};


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

    // NEW FIELDS
    bio: "",
    achievements: "",
    location: "",
    dealsClosed: 0
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
          achievementsArray.forEach(achieve => submitData.append("achievements", achieve));
        } else if (key === "image" && formData[key]) {
          submitData.append("image", formData[key]);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:5000/api/agents", submitData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Agent added successfully");
      navigate("/admin/agent");
    } catch (error) {
      console.error(error);
      alert("Error adding agent");
    }
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={btnBack}>
        ← Back to Agent List
      </button>

      <div style={formCard}>
        <div style={formHeader}>
          <div style={iconCircle}>👤</div>
          <div>
            <h1 style={titleStyle}>Add New Agent</h1>
            <p style={subtitleStyle}>
              Create a new Agent profile for your Propzo team.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formLayout}>

          {/* Full Name */}
          <div style={inputGroup}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Vikram Sethi"
              value={formData.fullName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Email & Phone */}
          <div style={gridRow}>
            <div style={inputGroup}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="vikram@propzo.com"
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
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Role & Status */}
          <div style={gridRow}>
            <div style={inputGroup}>
              <label style={labelStyle}>Agent Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={selectStyle}
              >
                <option>Senior Agent</option>
                <option>Junior Agent</option>
                <option>Sales Lead</option>
                <option>Property Manager</option>
              </select>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>Initial Status</label>
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
            <label style={labelStyle}>Login Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter secure password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Image Upload */}
          <div style={inputGroup}>
            <label style={labelStyle}>Agent Profile Photo</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ ...inputStyle, padding: "7px" }}
              required
            />
          </div>

          {/* Experience */}
          <div style={inputGroup}>
            <label style={labelStyle}>Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="e.g. 5+ Years"
              value={formData.experience}
              onChange={handleChange}
              style={inputStyle}
              required
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
              required
            />
          </div>

          {/* Location */}
          <div style={inputGroup}>
            <label style={labelStyle}>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Mumbai, India"
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
              placeholder="e.g. 25"
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
              placeholder="Write short professional bio..."
              value={formData.bio}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: "100px" }}
            />
          </div>

          {/* Key Achievements */}
          <div style={inputGroup}>
            <label style={labelStyle}>Key Achievements (Comma Separated)</label>
            <input
              type="text"
              name="achievements"
              placeholder="Top Seller 2023, Luxury Expert, 100+ Closings"
              value={formData.achievements}
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
              Discard
            </button>
            <button type="submit" style={btnSubmit}>
              Confirm & Add Agent
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}