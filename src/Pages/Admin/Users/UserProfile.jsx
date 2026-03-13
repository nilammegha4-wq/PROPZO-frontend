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

  const initialUser = usersData.find((u) => u.id === Number(id));
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  if (!user) return (
    <div style={{ textAlign: "center", paddingTop: 50, color: "#8b3a25", fontFamily: "'DM Sans', sans-serif" }}>
      <h2>User Not Found</h2>
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated User Data:", user);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .up-input:focus, .up-inline-input:focus {
          outline: none !important;
          border-color: #B2846B !important;
          box-shadow: 0 0 0 3px rgba(178,132,107,0.15) !important;
        }
        .up-input::placeholder { color: #a89385; }
      `}</style>

      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper}>
          {/* Breadcrumb + Back */}
          <div style={s.pageHeader}>
            <div>
              <p style={s.breadcrumb}>Admin / Users / Profile</p>
              <h1 style={s.pageTitle}>User Profile</h1>
            </div>
            <button onClick={() => navigate(-1)} style={s.backBtn}>
              ← Back to Users
            </button>
          </div>

          {/* Profile Grid */}
          <div style={s.profileGrid}>

            {/* Left: Summary Card */}
            <div style={s.sidebar}>
              <div style={s.card}>
                <div style={s.avatarLarge}>{user.name.charAt(0)}</div>

                {isEditing ? (
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    style={s.inlineInput}
                    className="up-inline-input"
                  />
                ) : (
                  <h2 style={s.profileName}>{user.name}</h2>
                )}

                <span style={s.statusBadge(user.status)}>{user.status}</span>
                <div style={s.idText}>User ID: #{user.id}</div>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div style={s.mainContent}>
              <div style={{ ...s.card, textAlign: "left" }}>
                <div style={s.sectionHeader}>
                  <h3 style={s.sectionTitle}>Contact Information</h3>
                </div>

                <div style={s.sectionBody}>
                  <div style={s.infoRow}>
                    <div style={s.infoBox}>
                      <label style={s.label}>Email Address</label>
                      {isEditing ? (
                        <input name="email" value={user.email} onChange={handleInputChange} style={s.inputField} className="up-input" />
                      ) : (
                        <div style={s.value}>{user.email}</div>
                      )}
                    </div>
                    <div style={s.infoBox}>
                      <label style={s.label}>Phone Number</label>
                      {isEditing ? (
                        <input name="phone" value={user.phone} onChange={handleInputChange} style={s.inputField} className="up-input" />
                      ) : (
                        <div style={s.value}>{user.phone}</div>
                      )}
                    </div>
                  </div>

                  <div style={s.infoRow}>
                    <div style={s.infoBox}>
                      <label style={s.label}>Residential Address</label>
                      {isEditing ? (
                        <input name="address" value={user.address} onChange={handleInputChange} style={s.inputField} className="up-input" />
                      ) : (
                        <div style={s.value}>{user.address}</div>
                      )}
                    </div>
                  </div>

                  <div style={s.actionRow}>
                    {isEditing ? (
                      <>
                        <button style={s.saveBtn} onClick={handleSave}>Save Changes</button>
                        <button style={s.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button style={s.editBtn} onClick={() => setIsEditing(true)}>Edit Profile</button>
                        <button style={s.messageBtn}>Send Message</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

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
    margin: "0 0 6px 0",
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
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 24,
    alignItems: "start",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e8ddd5",
    boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
    textAlign: "center",
    overflow: "hidden",
  },
  avatarLarge: {
    width: 90,
    height: 90,
    backgroundColor: "#B2846B",
    color: "#fff",
    fontSize: 36,
    fontWeight: 700,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "32px auto 20px",
    fontFamily: "'Sora', sans-serif",
    boxShadow: "0 4px 14px rgba(178,132,107,0.35)",
  },
  profileName: {
    fontSize: 20,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: "0 0 12px 0",
    padding: "0 20px",
  },
  statusBadge: (status) => ({
    padding: "4px 14px",
    borderRadius: 50,
    fontSize: "0.78rem",
    fontWeight: 700,
    display: "inline-block",
    fontFamily: "'DM Sans', sans-serif",
    backgroundColor: status === "Active" ? "#d4e6da" : "#f5ddd7",
    color: status === "Active" ? "#627B68" : "#8b3a25",
  }),
  idText: {
    marginTop: 14,
    marginBottom: 28,
    color: "#B2846B",
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.04em",
  },
  mainContent: {
    textAlign: "left",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #e8ddd5",
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#627B68",
    margin: 0,
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.01em",
  },
  sectionBody: {
    padding: "24px",
  },
  infoRow: {
    display: "flex",
    gap: 20,
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#819B8B",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 5,
    fontFamily: "'DM Sans', sans-serif",
  },
  value: {
    fontSize: 15,
    color: "#4C3324",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
  },
  inputField: {
    width: "100%",
    padding: "10px 13px",
    borderRadius: 9,
    border: "1.5px solid #ddd0c6",
    fontSize: 14,
    color: "#3b2416",
    background: "#fdf9f7",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },
  inlineInput: {
    fontSize: 17,
    fontWeight: 700,
    textAlign: "center",
    border: "1.5px solid #ddd0c6",
    borderRadius: 9,
    width: "calc(100% - 40px)",
    margin: "0 20px 12px",
    padding: "8px 12px",
    color: "#4C3324",
    background: "#fdf9f7",
    fontFamily: "'Sora', sans-serif",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },
  actionRow: {
    display: "flex",
    gap: 12,
    marginTop: 28,
  },
  editBtn: {
    padding: "11px 24px",
    backgroundColor: "#627B68",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    letterSpacing: "0.02em",
    boxShadow: "0 3px 10px rgba(98,123,104,0.3)",
    transition: "all 0.18s",
  },
  saveBtn: {
    padding: "11px 24px",
    backgroundColor: "#627B68",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    letterSpacing: "0.02em",
    boxShadow: "0 3px 10px rgba(98,123,104,0.3)",
    transition: "all 0.18s",
  },
  cancelBtn: {
    padding: "11px 24px",
    backgroundColor: "#fff",
    color: "#7a5c4a",
    border: "1.5px solid #d9c8bb",
    borderRadius: 9,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    transition: "all 0.18s",
  },
  messageBtn: {
    padding: "11px 24px",
    backgroundColor: "#fff",
    color: "#7a5c4a",
    border: "1.5px solid #d9c8bb",
    borderRadius: 9,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    transition: "all 0.18s",
  },
};
