import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";
import Avatar from "../../components/Common/Avatar";
import {
  FaUser, FaEnvelope, FaPhone, FaLocationDot, FaCalendarDays,
  FaHouse, FaKey, FaChartLine, FaTag, FaPenToSquare, FaLock, FaArrowLeft, FaCamera
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

export default function UserProfile2() {
  const { auth, updateAuth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentSells, setRecentSells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fetchProfileData = async () => {
    if (!auth) { navigate("/login"); return; }
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${auth.id}/profile-stats`, config);
      setUser(res.data.user); setStats(res.data.stats);
      setRecentActivity(res.data.recentActivity);
      setRecentSells(res.data.recentSells || []);
      setEditData(res.data.user); setLoading(false);
    } catch (err) {
      setError(`Failed to load profile data: ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfileData(); }, [auth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
  };

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) { alert("Passwords do not match"); return; }
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    try {
      setSaving(true);
      let finalAvatarPath = editData.profileImage || editData.avatar;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        const uploadRes = await axios.post(`/api/users/${user?._id || auth.id}/upload-avatar`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${auth.token}` }
        });
        finalAvatarPath = uploadRes.data.filePath;
      }
      const payload = { ...editData, avatar: finalAvatarPath, profileImage: finalAvatarPath };
      if (newPassword) payload.password = newPassword;
      const res = await axios.put(`/api/users/${user?._id || auth.id}`, payload, config);
      updateAuth(res.data); setUser(res.data); setIsEditing(false);
      setNewPassword(""); setConfirmPassword("");
      alert("Profile updated successfully");
      fetchProfileData();
    } catch (err) {
      alert("Failed to update profile");
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div style={s.loaderContainer}>
      <div style={s.spinner}></div>
      <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>Loading your profile...</p>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <h2 style={{ color: "#4C3324", fontFamily: "'Sora', sans-serif" }}>Oops!</h2>
      <p style={{ color: "#819B8B" }}>{error}</p>
      <button onClick={() => window.location.reload()} style={s.primaryBtn}>Retry</button>
    </div>
  );

  const statCards = [
    { label: "Buy", value: stats?.buyCount || 0, icon: <FaHouse />, accent: "#627B68" },
    { label: "Sell", value: stats?.sellCount || 0, icon: <FaTag />, accent: "#B2846B" },
    { label: "Rentals", value: stats?.rentCount || 0, icon: <FaKey />, accent: "#819B8B" },
  ];

  return (
<<<<<<< HEAD
    <div style={styles.pageWrapper}>
      <style>{`
        @media (max-width: 960px) {
          .up-main { grid-template-columns: 1fr !important; }
          .up-container { padding: 0 !important; }
        }
        @media (max-width: 600px) {
          .up-details { grid-template-columns: 1fr !important; gap: 16px !important; }
          .up-header h1 { font-size: 24px !important; }
          .up-stats { grid-template-columns: 1fr !important; }
          .up-activity-meta { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>
      <div style={styles.container} className="up-container">
        {/* Header Section */}
        <header style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <FaArrowLeft /> Back
          </button>
          <div style={styles.headerTitle}>
            <h1>My Profile</h1>
            <p>Manage your account and view your real estate activity</p>
          </div>
        </header>

        <div style={styles.mainGrid} className="up-main">
          {/* Left Sidebar: Profile Card */}
          <aside style={styles.sidebar}>
            <div style={styles.profileCard}>
              <div style={styles.avatarContainer}>
                <div style={styles.avatarFrame}>
=======
    <div style={s.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .up2-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 9px;
          border: 1.5px solid #ddd0c6;
          font-size: 14px;
          background: #fdf9f7;
          color: #3b2416;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .up2-input:focus { outline: none; border-color: #B2846B; box-shadow: 0 0 0 3px rgba(178,132,107,0.15); }
        .up2-input::placeholder { color: #a89385; }
        .up2-activity-item:hover { background: #f0ebe5 !important; }
        @media (max-width: 960px) { .up2-main { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) {
          .up2-details { grid-template-columns: 1fr !important; }
          .up2-stats { grid-template-columns: 1fr !important; }
          .up2-activity-meta { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>

      <div style={s.container}>
        {/* Header */}
        <header style={s.header}>
          <button onClick={() => navigate(-1)} style={s.backBtn}><FaArrowLeft /> Back</button>
          <p style={s.breadcrumb}>My Account / Profile</p>
          <h1 style={s.pageTitle}>My Profile</h1>
          <p style={s.pageSubtitle}>Manage your account and view your real estate activity</p>
        </header>

        <div style={s.mainGrid} className="up2-main">
          {/* Sidebar */}
          <aside style={s.sidebar}>
            {/* Profile Card */}
            <div style={s.profileCard}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div style={s.avatarFrame}>

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                  <Avatar
                    user={user || auth}
                    src={previewUrl || user?.profileImage || user?.avatar || auth?.profileImage || auth?.avatar}
                    size="xl"
                    style={{ width: 110, height: 110, fontSize: 38 }}
                  />
                  {isEditing && (
                    <label style={s.cameraOverlay}>
                      <FaCamera style={{ fontSize: 13 }} />
                      <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                    </label>
                  )}
                </div>
              </div>

              <div style={{ textAlign: "center", marginBottom: 24 }}>
                {isEditing ? (
                  <input
                    name="name"
                    value={editData.name || ""}
                    onChange={handleInputChange}
                    className="up2-input"
                    style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 0 }}
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 style={s.userName}>{user?.name}</h2>
                )}
                <p style={s.userRole}>Member Since: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {isEditing ? (
                  <>
                    <button onClick={handleSave} disabled={saving} style={s.primaryBtn}>{saving ? "Saving..." : "Save Changes"}</button>
                    <button onClick={() => setIsEditing(false)} style={s.cancelBtn}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} style={s.editBtn}>
                    <FaPenToSquare /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div style={s.quickStatsCard}>
              <h3 style={s.cardTitle}>Account Statistics</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={s.statItem}>
                  <FaChartLine style={{ color: "#B2846B", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#7a5c4a" }}>Total Activities: <strong style={{ color: "#4C3324" }}>{stats?.totalBooked || 0}</strong></span>
                </div>
                <div style={s.statItem}>
                  <FaCalendarDays style={{ color: "#627B68", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#7a5c4a" }}>Last Login: <strong style={{ color: "#4C3324" }}>Just now</strong></span>
                </div>
              </div>
            </div>
          </aside>

<<<<<<< HEAD
          {/* Right Content: Details & Activity */}
          <main style={styles.content}>
            {/* Stats Dashboard */}
            <section style={styles.statsGrid} className="up-stats">
              <div style={{ ...styles.statCard, borderLeft: "4px solid #627b68" }}>
                <div style={styles.statIcon}><FaHouse /></div>
                <div style={styles.statInfo}>
                  <h4>Buy</h4>
                  <p>{stats?.buyCount || 0}</p>
                </div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: "4px solid #b2846b" }}>
                <div style={{ ...styles.statIcon, color: "#b2846b" }}><FaTag /></div>
                <div style={styles.statInfo}>
                  <h4>Sell</h4>
                  <p>{stats?.sellCount || 0}</p>
                </div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: "4px solid #819b8b" }}>
                <div style={{ ...styles.statIcon, color: "#819b8b" }}><FaKey /></div>
                <div style={styles.statInfo}>
                  <h4>Rentals</h4>
                  <p>{stats?.rentCount || 0}</p>
                </div>
              </div>

            </section>

            {/* Information Grid */}
            <section style={styles.detailsCard}>
              <h3 style={styles.sectionTitle}>Profile Details</h3>
              <div style={styles.detailsGrid} className="up-details">
                <div style={styles.detailItem}>
                  <label><FaEnvelope /> Email Address</label>
                  {isEditing ? (
                    <input name="email" value={editData.email || ""} onChange={handleInputChange} style={styles.detailInput} />
                  ) : (
                    <p>{user?.email}</p>
                  )}
                </div>
                <div style={styles.detailItem}>
                  <label><FaPhone /> Phone Number</label>
                  {isEditing ? (
                    <input name="phone" value={editData.phone || ""} onChange={handleInputChange} style={styles.detailInput} />
                  ) : (
                    <p>{user?.phone || "Not provided"}</p>
                  )}
                </div>
                <div style={styles.detailItem}>
                  <label><FaLocationDot /> Location / City</label>
                  {isEditing ? (
                    <input name="address" value={editData.address || ""} onChange={handleInputChange} style={styles.detailInput} />
                  ) : (
                    <p>{user?.address || "Not provided"}</p>
                  )}
                </div>
=======
          {/* Main Content */}
          <main style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Stat Cards */}
            <section style={s.statsGrid} className="up2-stats">
              {statCards.map((sc, i) => (
                <div key={i} style={{ ...s.statCard, borderLeft: `4px solid ${sc.accent}` }}>
                  <div style={{ ...s.statIconBox, color: sc.accent, background: `${sc.accent}14` }}>{sc.icon}</div>
                  <div>
                    <div style={s.statLabel}>{sc.label}</div>
                    <div style={{ ...s.statValue, color: sc.accent }}>{sc.value}</div>
                  </div>
                </div>
              ))}
            </section>

            {/* Profile Details */}
            <section style={s.card}>
              <h3 style={s.sectionTitle}>Profile Details</h3>
              <div style={s.detailsGrid} className="up2-details">
                {[
                  { icon: <FaEnvelope />, label: "Email Address", field: "email", type: "email" },
                  { icon: <FaPhone />, label: "Phone Number", field: "phone", type: "text" },
                  { icon: <FaLocationDot />, label: "Location / City", field: "address", type: "text" },
                ].map(({ icon, label, field, type }) => (
                  <div key={field} style={s.detailItem}>
                    <label style={s.detailLabel}><span style={{ color: "#B2846B" }}>{icon}</span> {label}</label>
                    {isEditing ? (
                      <input
                        name={field}
                        type={type}
                        value={editData[field] || ""}
                        onChange={handleInputChange}
                        className="up2-input"
                      />
                    ) : (
                      <p style={s.detailValue}>{user?.[field] || "Not provided"}</p>
                    )}
                  </div>
                ))}

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
              </div>

              {isEditing && (
                <div style={s.passwordSection}>
                  <h4 style={s.subTitle}><FaLock style={{ color: "#B2846B" }} /> Change Password</h4>
                  <div style={s.detailsGrid}>
                    <div style={s.detailItem}>
                      <label style={s.detailLabel}>New Password</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="up2-input" placeholder="••••••••" />
                    </div>
                    <div style={s.detailItem}>
                      <label style={s.detailLabel}>Confirm Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="up2-input" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Recent Bookings */}
            <section style={s.card}>
              <div style={s.cardHeaderRow}>
                <h3 style={s.sectionTitle}>Recent Bookings</h3>
                <button onClick={() => navigate("/my-bookings")} style={s.viewAllBtn}>View All →</button>
              </div>
              {recentActivity.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {recentActivity.map((activity, i) => (
                    <div key={i} style={s.activityItem} className="up2-activity-item">
                      <div style={s.activityIcon}>
                        {activity.property?.category === "Buy" ? <FaHouse /> : <FaKey />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={s.activityTitle}>{activity.property?.title || "Property Booking"}</div>
                        <div style={s.activitySub}>{activity.property?.location || "Unknown Location"}</div>
                      </div>
<<<<<<< HEAD
                      <div style={styles.activityMeta} className="up-activity-meta">
                        <span style={styles.activityPrice}>₹{activity.amount || activity.property?.price}</span>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: activity.status === "Confirmed" ? "rgba(129, 155, 139, 0.15)" : "rgba(178, 132, 107, 0.15)",
                          color: activity.status === "Confirmed" ? "#627b68" : "#b2846b",
                          border: `1px solid ${activity.status === "Confirmed" ? "rgba(129, 155, 139, 0.2)" : "rgba(178, 132, 107, 0.2)"}`
                        }}>
                          {activity.status}
                        </span>
=======
                      <div style={s.activityMeta} className="up2-activity-meta">
                        <span style={s.activityPrice}>₹{activity.amount || activity.property?.price}</span>
                        <span style={{
                          ...s.statusBadge,
                          backgroundColor: activity.status === "Confirmed" ? "rgba(129, 155, 139, 0.15)" : "rgba(178, 132, 107, 0.15)",
                          color: activity.status === "Confirmed" ? "#627b68" : "#b2846b",
                        }}>{activity.status}</span>

>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={s.emptyState}>
                  <p style={{ color: "#B2846B", marginBottom: 16 }}>No recent bookings found. Explore our properties to get started!</p>
                  <button onClick={() => navigate("/properties")} style={s.primaryBtn}>Explore Properties</button>
                </div>
              )}
            </section>

            {/* Recent Sell Properties */}
            <section style={s.card}>
              <div style={s.cardHeaderRow}>
                <h3 style={s.sectionTitle}>Recent Sell Properties</h3>
                <button onClick={() => navigate("/my-sell-properties")} style={s.viewAllBtn}>View All →</button>
              </div>
              {recentSells.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {recentSells.map((property, i) => {
                    const imageUrl = property.images?.length > 0 ? property.images[0] : property.image;
                    return (
                      <div key={i} style={s.activityItem} className="up2-activity-item">
                        <div style={s.activityImageBox}>
                          {imageUrl ? (
                            <img src={getImageUrl(imageUrl)} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <FaTag style={{ color: "#B2846B", fontSize: 18 }} />
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={s.activityTitle}>{property.title || "Property"}</div>
                          <div style={s.activitySub}>{property.city || "Unknown City"}</div>
                        </div>
                        <span style={s.activityPrice}>₹{property.price}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={s.emptyState}>
                  <p style={{ color: "#B2846B", marginBottom: 16 }}>No listed properties found. Sell your property today!</p>
                  <button onClick={() => navigate("/sell-property")} style={s.primaryBtn}>Sell Property</button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

const s = {
  pageWrapper: {
<<<<<<< HEAD
    backgroundColor: "#f9f6f1",
    minHeight: "100vh",
    padding: "80px 20px 40px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#3a2e28",
=======
    background: "linear-gradient(135deg, #f9f6f1 0%, #ffffff 60%, #f4f1eb 100%)",
    minHeight: "100vh",
    padding: "80px 20px 50px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#4c3324",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  container: { maxWidth: 1100, margin: "0 auto" },
  header: { 
    marginBottom: 32,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  backBtn: {
<<<<<<< HEAD
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "none",
    border: "none",
    color: "#819b8b",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    width: "fit-content",
    padding: "0",
    transition: "all 0.2s",
  },
  headerTitle: {
    h1: { fontSize: "32px", fontWeight: "800", margin: "0", color: "#4c3324", letterSpacing: "-1px" },
    p: { fontSize: "16px", color: "#6b5e58", margin: "4px 0 0 0" },
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2.5fr",
    gap: "30px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)",
    textAlign: "center",
    border: "1px solid rgba(228, 203, 182, 0.2)",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  avatarFrame: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "32px",
    padding: "0",
    background: "transparent",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #ffffff",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: "32px",
    backgroundColor: "#e4cbb6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    fontWeight: "800",
    color: "#4c3324",
    border: "4px solid #ffffff",
  },
  avatarUploadLabel: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    backgroundColor: "#627b68",
    color: "white",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "14px",
    border: "2px solid #ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  userInfo: {
    marginBottom: "24px",
  },
  userName: { fontSize: "24px", fontWeight: "700", color: "#4c3324", margin: "0 0 8px 0" },
  userRole: { fontSize: "14px", color: "#6b5e58", margin: "0" },
  editInputName: {
    width: "100%",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "700",
    textAlign: "center",
    border: "1px solid rgba(228, 203, 182, 0.4)",
    background: "#faf7f5",
    borderRadius: "8px",
    outline: "none",
    color: "#4c3324",
  },
  userActions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
    backgroundColor: "#faf7f5",
    color: "#6b5e58",
    border: "1px solid rgba(228, 203, 182, 0.4)",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
=======
    display: "flex", alignItems: "center", gap: 8,
    background: "none", border: "none",
    color: "#627b68", fontWeight: 600, fontSize: 15,
    cursor: "pointer", padding: 0, marginBottom: 14,
    fontFamily: "'DM Sans', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    transition: "all 0.2s",
  },
  headerTitle: {
    h1: { fontSize: 32, fontWeight: 800, margin: 0, color: "#4c3324", letterSpacing: "-1px" },
    p: { fontSize: 16, color: "#6b5e58", margin: "4px 0 0 0" },
  },
  pageTitle: {
    fontSize: 32, fontWeight: 700, color: "#4C3324",
    fontFamily: "'Sora', sans-serif", margin: "0 0 6px 0", letterSpacing: "-0.5px",
  },
  pageSubtitle: { fontSize: 15, color: "#819B8B", margin: 0 },
  mainGrid: { display: "grid", gridTemplateColumns: "260px 1fr", gap: 28, alignItems: "start" },
  sidebar: { display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 100 },
  profileCard: {
    background: "#fff", borderRadius: 20, padding: "32px 24px",
    border: "1px solid rgba(228, 203, 182, 0.2)", boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)",
    textAlign: "center",
  },
  cameraOverlay: {
    position: "absolute", bottom: -6, right: -6,
    width: 32, height: 32, borderRadius: 8,
    background: "#fff", color: "#B2846B",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(76,51,36,0.15)", cursor: "pointer",
    border: "1.5px solid #ddd0c6",
  },
  userName: {
    fontSize: 22, fontWeight: 700, color: "#4C3324",
    fontFamily: "'Sora', sans-serif", margin: "0 0 6px 0",
  },
  userRole: { fontSize: 14, color: "#819B8B", margin: 0 },
  editInputName: {
    width: "100%", padding: "10px", fontSize: 20,
    fontWeight: 700, textAlign: "center", border: "1px solid rgba(228, 203, 182, 0.4)",
    background: "#faf7f5", borderRadius: 8, outline: "none", color: "#4c3324",
  },
  userActions: { display: "flex", flexDirection: "column", gap: 12 },
  editBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    padding: "12px", background: "#faf7f5", color: "#6b5e58",
    border: "1px solid rgba(228, 203, 182, 0.4)", borderRadius: 10,
    fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
  },
  saveBtn: {
<<<<<<< HEAD
    padding: "12px",
    backgroundColor: "#627b68",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
=======
    padding: "12px", background: "#627b68", color: "white",
    border: "none", borderRadius: 10, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s",
  },
  primaryBtn: {
    padding: "11px 24px", background: "#627B68", color: "#fff",
    border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    boxShadow: "0 3px 10px rgba(98,123,104,0.3)", transition: "all 0.18s",
    letterSpacing: "0.02em",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  cancelBtn: {
    padding: "11px", background: "#fff", color: "#8b3a25",
    border: "1.5px solid #e8c4b8", borderRadius: 10, fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
  },
  quickStatsCard: {
<<<<<<< HEAD
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 6px -1px rgba(76, 51, 36, 0.05)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
    h3: { fontSize: "16px", fontWeight: "700", color: "#4c3324", marginBottom: "16px" },
  },
  statList: { display: "flex", flexDirection: "column", gap: "12px" },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: "#6b5e58",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "16px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#faf7f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#627b68",
    border: "1px solid rgba(228, 203, 182, 0.2)",
  },
  statInfo: {
    flex: "1",
    h4: { fontSize: "14px", fontWeight: "600", color: "#6b5e58", margin: "0" },
    p: { fontSize: "22px", fontWeight: "800", color: "#4c3324", margin: "0" },
=======
    background: "#fff", borderRadius: 20, padding: "24px",
    border: "1px solid rgba(228, 203, 182, 0.2)",
    boxShadow: "0 4px 6px -1px rgba(76, 51, 36, 0.05)",
  },
  statIcon: {
    width: 48, height: 48, borderRadius: 12,
    background: "#faf7f5", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: 18, color: "#627b68",
    border: "1px solid rgba(228, 203, 182, 0.2)",
  },
  statIconBox: {
    width: 44, height: 44, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0,
  },
  statInfo: {
    flex: 1,
    h4: { fontSize: 14, fontWeight: 600, color: "#6b5e58", margin: 0 },
    p: { fontSize: 22, fontWeight: 800, color: "#4c3324", margin: 0 },
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  statItem: { display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#6b5e58" },
  statLabel: {
    fontSize: 12, fontWeight: 600, color: "#819B8B",
    textTransform: "uppercase", letterSpacing: "0.06em",
    fontFamily: "'DM Sans', sans-serif", marginBottom: 3,
  },
  statValue: { fontSize: 22, fontWeight: 700, fontFamily: "'Sora', sans-serif" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 },
  statCard: {
    background: "#fff", borderRadius: 14, padding: "16px 18px",
    display: "flex", alignItems: "center", gap: 14,
    border: "1px solid #e8ddd5", boxShadow: "0 3px 10px rgba(76,51,36,0.05)",
  },
  card: {
    background: "#fff", borderRadius: 16, padding: "28px",
    border: "1px solid #e8ddd5", boxShadow: "0 4px 16px rgba(76,51,36,0.05)",
  },
  cardHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: "#4c3324", marginBottom: 24 },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(76, 51, 36, 0.05)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
<<<<<<< HEAD
  },
  sectionTitle: { fontSize: "20px", fontWeight: "700", color: "#4c3324", marginBottom: "24px" },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
=======
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  detailItem: {
<<<<<<< HEAD
    label: { display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: "700", color: "#819b8b", textTransform: "uppercase", marginBottom: "8px" },
    p: { fontSize: "16px", fontWeight: "600", color: "#3a2e28", margin: "0" },
  },
  detailInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(129, 155, 139, 0.4)",
    backgroundColor: "#faf7f5",
    fontSize: "15px",
    outline: "none",
    color: "#3a2e28",
=======
    label: { display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "#819b8b", textTransform: "uppercase", marginBottom: 8 },
    p: { fontSize: 16, fontWeight: 600, color: "#3a2e28", margin: 0 },
  },
  detailInput: {
    width: "100%", padding: 12, borderRadius: 10,
    border: "1px solid rgba(129, 155, 139, 0.4)", backgroundColor: "#faf7f5",
    fontSize: 15, outline: "none", color: "#3a2e28",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  passwordSection: { marginTop: 32, paddingTop: 32, borderTop: "1px solid #f1f5f9" },
  subTitle: { fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 20 },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(76, 51, 36, 0.05)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
<<<<<<< HEAD
  },
  activityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
=======
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  activityHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  viewAllBtn: {
<<<<<<< HEAD
    background: "none",
    border: "none",
    color: "#819b8b",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
=======
    background: "none", border: "none", color: "#819b8b",
    fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  activityItem: {
<<<<<<< HEAD
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#faf7f5",
    transition: "transform 0.2s",
    border: "1px solid rgba(228, 203, 182, 0.1)",
  },
  activityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#819b8b",
=======
    display: "flex", alignItems: "center", gap: 20,
    padding: "16px", borderRadius: 12,
    background: "#faf7f5", transition: "transform 0.2s",
    border: "1px solid rgba(228, 203, 182, 0.1)",
  },
  activityIcon: {
    width: 40, height: 40, borderRadius: 10,
    background: "#fff", display: "flex", alignItems: "center",
    justifyContent: "center", color: "#819b8b", fontSize: 16, flexShrink: 0,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    boxShadow: "0 2px 4px rgba(76, 51, 36, 0.05)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
  },
  activityImageBox: {
    width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0,
    background: "#f0ebe5", display: "flex", alignItems: "center", justifyContent: "center",
  },
  activityImage: { width: "100%", height: "100%", objectFit: "cover" },
  activityInfo: {
    flex: 1,
    h5: { fontSize: 16, fontWeight: 600, margin: "0 0 4px 0" },
    p: { fontSize: 13, color: "#64748b", margin: 0 },
  },
<<<<<<< HEAD
  activityMeta: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  activityPrice: { fontSize: "16px", fontWeight: "800", color: "#4c3324" },
=======
  activityTitle: { fontSize: 14, fontWeight: 600, color: "#4C3324", fontFamily: "'Sora', sans-serif", marginBottom: 3 },
  activitySub: { fontSize: 12, color: "#819B8B" },
  activityMeta: { display: "flex", alignItems: "center", gap: 16 },
  activityPrice: { fontSize: 16, fontWeight: 800, color: "#4c3324" },
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  statusBadge: {
    padding: "3px 10px", borderRadius: 20,
    fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
  },
<<<<<<< HEAD
  emptyActivity: {
    textAlign: "center",
    padding: "40px 0",
    p: { color: "#6b5e58", marginBottom: "20px" },
=======
  loaderContainer: {
    height: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 20,
    background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  spinner: {
    width: 44, height: 44,
    border: "4px solid #e8ddd5", borderTop: "4px solid #B2846B",
    borderRadius: "50%", animation: "spin 1s linear infinite",
  },
  emptyActivity: { textAlign: "center", padding: "40px 0" },
  exploreBtn: {
<<<<<<< HEAD
    padding: "10px 24px",
    backgroundColor: "#627b68",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
=======
    padding: "10px 24px", background: "#627b68", color: "white",
    border: "none", borderRadius: 10, fontWeight: 700,
    cursor: "pointer", transition: "all 0.2s",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  },
  emptyState: { textAlign: "center", padding: "30px 0" },
};
