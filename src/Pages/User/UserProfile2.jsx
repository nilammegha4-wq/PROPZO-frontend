import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";
import Avatar from "../../components/Common/Avatar";
import {
  FaUser, FaEnvelope, FaPhone, FaLocationDot, FaCalendarDays,
  FaHouse, FaKey, FaChartLine, FaClockRotateLeft, FaTag, FaPenToSquare, FaLock, FaArrowLeft, FaCamera
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

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
    if (!auth) {
      navigate("/login");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${auth.id}/profile-stats`, config);
      setUser(res.data.user);
      setStats(res.data.stats);
      setRecentActivity(res.data.recentActivity);
      setRecentSells(res.data.recentSells || []);
      setEditData(res.data.user);
      setLoading(false);
    } catch (err) {
      console.error("Profile Fetch Error Details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError(`Failed to load profile data: ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [auth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    try {
      setSaving(true);
      let finalAvatarPath = editData.profileImage || editData.avatar;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);

        const uploadRes = await axios.post(`/api/users/${user?._id || auth.id}/upload-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`
          }
        });
        finalAvatarPath = uploadRes.data.filePath;
      }

      const payload = {
        ...editData,
        avatar: finalAvatarPath,
        profileImage: finalAvatarPath
      };
      if (newPassword) payload.password = newPassword;

      const res = await axios.put(`/api/users/${user?._id || auth.id}`, payload, config);

      updateAuth(res.data);
      setUser(res.data);
      setIsEditing(false);
      setNewPassword("");
      setConfirmPassword("");

      alert("Profile updated successfully");
      fetchProfileData(); // Refresh stats
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div className="loader"></div>
        <p>Loading your professional profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorWrapper}>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} style={styles.retryBtn}>Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
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

        <div style={styles.mainGrid}>
          {/* Left Sidebar: Profile Card */}
          <aside style={styles.sidebar}>
            <div style={styles.profileCard}>
              <div style={styles.avatarContainer}>
                <div style={styles.avatarFrame}>
                  <Avatar
                    user={user || auth}
                    src={previewUrl || user?.profileImage || user?.avatar || auth?.profileImage || auth?.avatar}
                    size="xl"
                    style={{ width: "120px", height: "120px", fontSize: "40px" }}
                  />
                  {isEditing && (
                    <label style={styles.avatarUploadLabel}>
                      <FaCamera />
                      <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                    </label>
                  )}
                </div>
              </div>

              <div style={styles.userInfo}>
                {isEditing ? (
                  <input
                    name="name"
                    value={editData.name || ""}
                    onChange={handleInputChange}
                    style={styles.editInputName}
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 style={styles.userName}>{user?.name}</h2>
                )}
                <p style={styles.userRole}>Member Since: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>

              <div style={styles.userActions}>
                {isEditing ? (
                  <div style={styles.editButtons}>
                    <button onClick={handleSave} style={styles.saveBtn} disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                    <FaPenToSquare /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div style={styles.quickStatsCard}>
              <h3>Account Statistics</h3>
              <div style={styles.statList}>
                <div style={styles.statItem}>
                  <FaChartLine style={{ color: "#6366f1" }} />
                  <span>Total Activities: <strong>{stats?.totalBooked || 0}</strong></span>
                </div>
                <div style={styles.statItem}>
                  <FaCalendarDays style={{ color: "#10b981" }} />
                  <span>Last Login: <strong>Just now</strong></span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content: Details & Activity */}
          <main style={styles.content}>
            {/* Stats Dashboard */}
            <section style={styles.statsGrid}>
              <div style={{ ...styles.statCard, borderLeft: "4px solid #4f46e5" }}>
                <div style={styles.statIcon}><FaHouse /></div>
                <div style={styles.statInfo}>
                  <h4>Buy</h4>
                  <p>{stats?.buyCount || 0}</p>
                </div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: "4px solid #ec4899" }}>
                <div style={{ ...styles.statIcon, color: "#ec4899" }}><FaTag /></div>
                <div style={styles.statInfo}>
                  <h4>Sell</h4>
                  <p>{stats?.sellCount || 0}</p>
                </div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: "4px solid #10b981" }}>
                <div style={styles.statIcon}><FaKey /></div>
                <div style={styles.statInfo}>
                  <h4>Rentals</h4>
                  <p>{stats?.rentCount || 0}</p>
                </div>
              </div>

            </section>

            {/* Information Grid */}
            <section style={styles.detailsCard}>
              <h3 style={styles.sectionTitle}>Profile Details</h3>
              <div style={styles.detailsGrid}>
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
              </div>

              {isEditing && (
                <div style={styles.passwordSection}>
                  <h4 style={styles.subTitle}><FaLock /> Change Password</h4>
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                      <label>New Password</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={styles.detailInput} />
                    </div>
                    <div style={styles.detailItem}>
                      <label>Confirm Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.detailInput} />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Recent Activity */}
            <section style={styles.activityCard}>
              <div style={styles.activityHeader}>
                <h3 style={styles.sectionTitle}>Recent Bookings</h3>
                <button onClick={() => navigate("/my-bookings")} style={styles.viewAllBtn}>View All</button>
              </div>
              {recentActivity && recentActivity.length > 0 ? (
                <div style={styles.activityList}>
                  {recentActivity.map((activity, index) => (
                    <div key={index} style={styles.activityItem}>
                      <div style={styles.activityIcon}>
                        {activity.property?.category === "Buy" ? <FaHouse /> : <FaKey />}
                      </div>
                      <div style={styles.activityInfo}>
                        <h5>{activity.property?.title || "Property Booking"}</h5>
                        <p>{activity.property?.location || "Unknown Location"}</p>
                      </div>
                      <div style={styles.activityMeta}>
                        <span style={styles.activityPrice}>₹{activity.amount || activity.property?.price}</span>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: activity.status === "Confirmed" ? "#d1fae5" : "#fee2e2",
                          color: activity.status === "Confirmed" ? "#065f46" : "#991b1b"
                        }}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyActivity}>
                  <p>No recent bookings found. Explore our properties to get started!</p>
                  <button onClick={() => navigate("/properties")} style={styles.exploreBtn}>Explore Properties</button>
                </div>
              )}
            </section>

            {/* Recent Sell Properties */}
            <section style={styles.activityCard}>
              <div style={styles.activityHeader}>
                <h3 style={styles.sectionTitle}>Recent Sell Properties</h3>
                <button onClick={() => navigate("/my-sell-properties")} style={styles.viewAllBtn}>View All</button>
              </div>
              {recentSells && recentSells.length > 0 ? (
                <div style={styles.activityList}>
                  {recentSells.map((property, index) => {
                    const imageUrl = property.images && property.images.length > 0
                      ? property.images[0]
                      : property.image;

                    return (
                      <div key={index} style={styles.activityItem}>
                        <div style={styles.activityImageWrapper}>
                          {imageUrl ? (
                            <img src={getImageUrl(imageUrl)} alt={property.title} style={styles.activityImage} />
                          ) : (
                            <div style={styles.activityIcon}><FaTag /></div>
                          )}
                        </div>
                        <div style={styles.activityInfo}>
                          <h5>{property.title || "Property"}</h5>
                          <p>{property.city || "Unknown City"}</p>
                        </div>
                        <div style={styles.activityMeta}>
                          <span style={styles.activityPrice}>₹{property.price}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div style={styles.emptyActivity}>
                  <p>No listed properties found. Sell your property today!</p>
                  <button onClick={() => navigate("/sell-property")} style={styles.exploreBtn}>Sell Property</button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "80px 20px 40px",
    fontFamily: "'Inter', sans-serif",
    color: "#1e293b",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "none",
    border: "none",
    color: "#6366f1",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    width: "fit-content",
    padding: "0",
  },
  headerTitle: {
    h1: { fontSize: "32px", fontWeight: "800", margin: "0", color: "#0f172a" },
    p: { fontSize: "16px", color: "#64748b", margin: "4px 0 0 0" },
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
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
    textAlign: "center",
    border: "1px solid #e2e8f0",
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
    borderRadius: "50%",
    backgroundColor: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    fontWeight: "700",
    color: "#6366f1",
    border: "4px solid #ffffff",
  },
  avatarUploadLabel: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    backgroundColor: "#6366f1",
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
  },
  userInfo: {
    marginBottom: "24px",
  },
  userName: { fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" },
  userRole: { fontSize: "14px", color: "#64748b", margin: "0" },
  editInputName: {
    width: "100%",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "700",
    textAlign: "center",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
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
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  saveBtn: {
    padding: "12px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "12px",
    backgroundColor: "transparent",
    color: "#ef4444",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  quickStatsCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    h3: { fontSize: "16px", fontWeight: "700", marginBottom: "16px" },
  },
  statList: { display: "flex", flexDirection: "column", gap: "12px" },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: "#475569",
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
    backgroundColor: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#6366f1",
  },
  statInfo: {
    flex: "1",
    h4: { fontSize: "14px", fontWeight: "600", color: "#64748b", margin: "0" },
    p: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0" },
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: { fontSize: "20px", fontWeight: "700", color: "#0f172a", marginBottom: "24px" },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  detailItem: {
    label: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" },
    p: { fontSize: "16px", fontWeight: "500", color: "#1e293b", margin: "0" },
  },
  detailInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
  },
  passwordSection: {
    marginTop: "32px",
    paddingTop: "32px",
    borderTop: "1px solid #f1f5f9",
  },
  subTitle: { fontSize: "16px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },
  activityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  viewAllBtn: {
    background: "none",
    border: "none",
    color: "#6366f1",
    fontWeight: "600",
    cursor: "pointer",
  },
  activityList: { display: "flex", flexDirection: "column", gap: "16px" },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    transition: "transform 0.2s",
  },
  activityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6366f1",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  activityImageWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activityImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  activityInfo: {
    flex: 1,
    h5: { fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0" },
    p: { fontSize: "13px", color: "#64748b", margin: "0" },
  },
  activityMeta: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  activityPrice: { fontSize: "16px", fontWeight: "700", color: "#0f172a" },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "99px",
    fontSize: "12px",
    fontWeight: "700",
  },
  emptyActivity: {
    textAlign: "center",
    padding: "40px 0",
    p: { color: "#64748b", marginBottom: "20px" },
  },
  exploreBtn: {
    padding: "10px 24px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  loadingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
    gap: "20px",
  },
  errorWrapper: {
    textAlign: "center",
    padding: "100px 20px",
  },
  retryBtn: {
    padding: "10px 24px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "16px",
  }
};
