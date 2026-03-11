import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const usersData = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", status: "Active", address: "Mumbai, India" },
  { id: 2, name: "Amit Patel", email: "amit@gmail.com", phone: "9123456789", status: "Inactive", address: "Ahmedabad, India" },
  { id: 3, name: "Neha Verma", email: "neha@gmail.com", phone: "9988776655", status: "Active", address: "Delhi, India" },
];

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Find the initial user
  const initialUser = usersData.find((u) => u.id === Number(id));

  // 2. States for editing
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  if (!user) return <div style={styles.errorText}><h2>User Not Found</h2></div>;

  // 3. Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    // In a real app, you'd send an API request here: axios.put(`/users/${id}`, user)
    console.log("Updated User Data:", user);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back to Users
        </button>

        <div style={styles.profileGrid}>
          {/* Left Column: Summary Card */}
          <div style={styles.sidebar}>
            <div style={styles.card}>
              <div style={styles.avatarLarge}>{user.name.charAt(0)}</div>

              {isEditing ? (
                <input
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  style={styles.inlineInput}
                />
              ) : (
                <h2 style={styles.profileName}>{user.name}</h2>
              )}

              <span style={{
                ...styles.statusBadge,
                backgroundColor: user.status === "Active" ? "#d1fae5" : "#fee2e2",
                color: user.status === "Active" ? "#065f46" : "#991b1b"
              }}>
                {user.status}
              </span>
              <div style={styles.idText}>User ID: #{user.id}</div>
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div style={styles.mainContent}>
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>Contact Information</h3>

              <div style={styles.infoRow}>
                <div style={styles.infoBox}>
                  <label style={styles.label}>Email Address</label>
                  {isEditing ? (
                    <input name="email" value={user.email} onChange={handleInputChange} style={styles.inputField} />
                  ) : (
                    <div style={styles.value}>{user.email}</div>
                  )}
                </div>
                <div style={styles.infoBox}>
                  <label style={styles.label}>Phone Number</label>
                  {isEditing ? (
                    <input name="phone" value={user.phone} onChange={handleInputChange} style={styles.inputField} />
                  ) : (
                    <div style={styles.value}>{user.phone}</div>
                  )}
                </div>
              </div>

              <div style={styles.infoRow}>
                <div style={styles.infoBox}>
                  <label style={styles.label}>Residential Address</label>
                  {isEditing ? (
                    <input name="address" value={user.address} onChange={handleInputChange} style={styles.inputField} />
                  ) : (
                    <div style={styles.value}>{user.address}</div>
                  )}
                </div>
              </div>

              <div style={styles.actionRow}>
                {isEditing ? (
                  <>
                    <button style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                    <button style={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button style={styles.editBtn} onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <button style={styles.messageBtn}>Send Message</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  pageWrapper: { backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: "900px", margin: "0 auto" },
  backBtn: { background: "none", border: "none", color: "#6366f1", fontWeight: "600", cursor: "pointer", marginBottom: "20px", fontSize: "16px" },
  profileGrid: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" },
  sidebar: { display: "flex", flexDirection: "column" },
  card: { backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb", textAlign: "center" },
  avatarLarge: { width: "100px", height: "100px", backgroundColor: "#6366f1", color: "white", fontSize: "40px", fontWeight: "700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
  profileName: { fontSize: "22px", fontWeight: "800", color: "#111827", margin: "0 0 10px 0" },
  statusBadge: { padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" },
  idText: { marginTop: "15px", color: "#9ca3af", fontSize: "13px" },
  mainContent: { textAlign: "left" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#374151", margin: "0 0 24px 0", textAlign: "left", borderBottom: "1px solid #f3f4f6", paddingBottom: "10px" },
  infoRow: { display: "flex", gap: "20px", marginBottom: "20px", textAlign: "left" },
  infoBox: { flex: 1 },
  label: { display: "block", fontSize: "12px", fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" },
  value: { fontSize: "15px", color: "#111827", fontWeight: "500" },
  actionRow: { display: "flex", gap: "12px", marginTop: "30px" },

  // Buttons
  editBtn: { padding: "10px 20px", backgroundColor: "#111827", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
  saveBtn: { padding: "10px 20px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
  cancelBtn: { padding: "10px 20px", backgroundColor: "#e5e7eb", color: "#374151", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
  messageBtn: { padding: "10px 20px", backgroundColor: "white", color: "#374151", border: "1px solid #d1d5db", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },

  // Inputs
  inputField: { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  inlineInput: { fontSize: "18px", fontWeight: "800", textAlign: "center", border: "1px solid #d1d5db", borderRadius: "6px", width: "100%", marginBottom: "10px" },

  errorText: { textAlign: "center", paddingTop: "50px", color: "#ef4444" }
};