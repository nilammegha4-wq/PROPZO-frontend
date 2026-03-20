import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaUser, FaPhone, FaLocationDot, FaCamera,
    FaArrowLeft, FaCircleCheck, FaTriangleExclamation,
    FaBell, FaShieldHalved, FaGlobe, FaRightFromBracket
} from "react-icons/fa6";
import Avatar from "../../components/Common/Avatar";
import { useAuth } from "../../context/AuthContext";

// ─── EARTHY COLOR PALETTE ────────────────────────────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

const UserSettings = () => {
    const { auth, updateAuth, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "", avatar: "" });
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [notifications, setNotifications] = useState({
        emailAlerts: true, pushNotifications: true, smsUpdates: false, marketingEmails: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth) { navigate("/login"); return; }
            try {
                const res = await axios.get(`/api/users/${auth.id}`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setProfile({
                    name: res.data.name || "", email: res.data.email || "",
                    phone: res.data.phone || "", address: res.data.address || "",
                    avatar: res.data.avatar || "", profileImage: res.data.profileImage || ""
                });
                if (res.data.notificationPreferences) setNotifications(res.data.notificationPreferences);
            } catch (err) {
                setMessage({ text: "Failed to load profile data", type: "error" });
            } finally {
                setFetching(false);
            }
        };
        fetchUserData();
    }, [auth, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true); setMessage({ text: "", type: "" });
        try {
            let finalAvatarPath = profile.avatar;
            if (selectedFile) {
                const formData = new FormData();
                formData.append("avatar", selectedFile);
                const uploadRes = await axios.post(`/api/users/${auth.id}/upload-avatar`, formData, {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${auth.token}` }
                });
                finalAvatarPath = uploadRes.data.filePath;
            }
            const res = await axios.put(`/api/users/${auth.id}`, {
                name: profile.name, phone: profile.phone, address: profile.address,
                avatar: finalAvatarPath, profileImage: finalAvatarPath,
                notificationPreferences: notifications,
            }, { headers: { Authorization: `Bearer ${auth.token}` } });
            updateAuth(res.data);
            setProfile(prev => ({ ...prev, avatar: res.data.avatar, profileImage: res.data.profileImage }));
            setSelectedFile(null); setPreviewUrl("");
            setMessage({ text: "Profile updated successfully!", type: "success" });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || "Failed to update profile", type: "error" });
        } finally { setLoading(false); }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ text: "Passwords do not match", type: "error" }); return;
        }
        setLoading(true); setMessage({ text: "", type: "" });
        try {
            await axios.put(`/api/users/${auth.id}/password`, {
                currentPassword: passwords.currentPassword, newPassword: passwords.newPassword
            }, { headers: { Authorization: `Bearer ${auth.token}` } });
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setMessage({ text: "Password updated successfully!", type: "success" });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || "Failed to update password", type: "error" });
        } finally { setLoading(false); }
    };

    const handleLogout = () => { logout(); navigate("/login"); };

    const tabs = [
        { id: "profile", label: "My Profile", icon: <FaUser /> },
        { id: "security", label: "Security", icon: <FaShieldHalved /> },
        { id: "notifications", label: "Notifications", icon: <FaBell /> },
    ];

    if (fetching) return (
        <div style={s.loaderContainer}>
            <div style={s.spinner}></div>
            <p style={{ color: "#819B8B", fontFamily: "'DM Sans', sans-serif" }}>Curating your experience...</p>
        </div>
    );

    return (
<<<<<<< HEAD
    <div style={styles.pageWrapper}>
      <style>{`
        @media (max-width: 768px) {
          .pz-settings-layout { grid-template-columns: 1fr !important; }
          .pz-settings-sidebar { position: static !important; width: 100% !important; }
          .pz-settings-form-grid { grid-template-columns: 1fr !important; }
          .pz-settings-glass-card { padding: 20px !important; }
          .pz-settings-avatar-main { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
      <div style={styles.container}>
                {/* Navbar / Breadcrumb */}
                <div style={styles.topNav}>
                    <button onClick={() => navigate(-1)} style={styles.backBtn}>
=======
        <div style={s.pageWrapper}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
                * { box-sizing: border-box; }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .us-input {
                    padding: 12px 16px;
                    border-radius: 10px;
                    border: 1.5px solid #ddd0c6;
                    font-size: 14px;
                    background: #fdf9f7;
                    color: #3b2416;
                    font-family: 'DM Sans', sans-serif;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    width: 100%;
                }
                .us-input:focus {
                    outline: none;
                    border-color: #B2846B;
                    box-shadow: 0 0 0 3px rgba(178,132,107,0.15);
                }
                .us-input::placeholder { color: #a89385; }
                .us-input:disabled { background: #f0ebe5; color: #B2846B; cursor: not-allowed; }
                .us-nav-btn:hover { background: #f0ebe5 !important; color: #4C3324 !important; }
                .us-setting-item:hover { box-shadow: 0 4px 12px rgba(76,51,36,0.06); background: white !important; }
                @media (max-width: 768px) {
                    .us-layout { grid-template-columns: 1fr !important; }
                    .us-form-grid { grid-template-columns: 1fr !important; }
                    .us-card { padding: 24px !important; }
                    .us-avatar-row { flex-direction: column !important; text-align: center !important; }
                }
            `}</style>

            <div style={s.container}>
                {/* Top Nav */}
                <div style={s.topNav}>
                    <button onClick={() => navigate(-1)} style={s.backBtn}>
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
                        <FaArrowLeft /> Exit Settings
                    </button>
                </div>

                <div style={s.mainLayout} className="us-layout">
                    {/* Sidebar */}
                    <aside style={s.sidebar}>
                        <div style={s.sidebarHeader}>
                            <h2 style={s.sidebarTitle}>Settings</h2>
                            <p style={s.sidebarSubtitle}>Manage your account</p>
                        </div>

                        <nav style={s.sideNav}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        ...s.navItem,
                                        ...(activeTab === tab.id ? s.navItemActive : {}),
                                    }}
                                    className="us-nav-btn"
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div style={s.sidebarFooter}>
                            <button onClick={handleLogout} style={s.logoutBtn}>
                                <FaRightFromBracket /> Logout
                            </button>
                        </div>
                    </aside>

                    {/* Content */}
                    <main style={s.contentArea}>
                        {/* Message */}
                        {message.text && (
                            <div style={{
                                ...s.messageBox,
                                backgroundColor: message.type === "success" ? "#d4e6da" : "#f5ddd7",
                                color: message.type === "success" ? "#627B68" : "#8b3a25",
                                border: `1px solid ${message.type === "success" ? "#b8d4c0" : "#e8c4b8"}`,
                            }}>
                                {message.type === "success" ? <FaCircleCheck /> : <FaTriangleExclamation />}
                                {message.text}
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <section style={s.sectionAnim}>
                                <div style={s.sectionHeader}>
                                    <h3 style={s.sectionTitle}>Personal Information</h3>
                                    <p style={s.sectionDesc}>Update your personal details and how others see you on the platform.</p>
                                </div>
                                <form onSubmit={handleProfileUpdate} style={s.card} className="us-card">
                                    {/* Avatar Row */}
                                    <div style={s.avatarRow} className="us-avatar-row">
                                        <div style={{ position: "relative" }}>
                                            <Avatar
                                                user={profile || auth}
                                                src={previewUrl || profile.profileImage || profile.avatar || auth?.profileImage || auth?.avatar}
                                                size="lg"
                                            />
                                            <label style={s.cameraOverlay}>
                                                <FaCamera style={{ fontSize: 14 }} />
                                                <input type="file" accept="image/*" style={{ display: "none" }}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <div style={s.avatarText}>
                                            <h4 style={s.avatarHeading}>Profile Picture</h4>
                                            <p style={s.avatarDesc}>Jumpstart your presence with a photo. JPG or PNG, max 2MB.</p>
                                        </div>
                                    </div>

                                    <div style={s.formGrid} className="us-form-grid">
                                        <div style={s.inputGroup}>
                                            <label style={s.label}><FaUser style={{ color: "#B2846B" }} /> Display Name</label>
                                            <input className="us-input" type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="e.g. John Doe" />
                                        </div>
                                        <div style={s.inputGroup}>
                                            <label style={s.label}><FaGlobe style={{ color: "#B2846B" }} /> Email Address</label>
                                            <input className="us-input" type="email" value={profile.email} disabled />
                                        </div>
                                        <div style={s.inputGroup}>
                                            <label style={s.label}><FaPhone style={{ color: "#B2846B" }} /> Phone Number</label>
                                            <input className="us-input" type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                                        </div>
                                        <div style={s.inputGroup}>
                                            <label style={s.label}><FaLocationDot style={{ color: "#B2846B" }} /> Location / City</label>
                                            <input className="us-input" type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="Mumbai, India" />
                                        </div>
                                    </div>

                                    <div style={s.formFooter}>
                                        <button type="submit" disabled={loading} style={s.primaryBtn}>
                                            {loading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        )}

                        {/* Security Tab */}
                        {activeTab === "security" && (
                            <section style={s.sectionAnim}>
                                <div style={s.sectionHeader}>
                                    <h3 style={s.sectionTitle}>Security Settings</h3>
                                    <p style={s.sectionDesc}>Protect your account with a strong password.</p>
                                </div>
                                <form onSubmit={handlePasswordUpdate} style={s.card} className="us-card">
                                    <div style={s.securityAlert}>
                                        <FaShieldHalved style={{ fontSize: 22, color: "#627B68", flexShrink: 0 }} />
                                        <div>
                                            <h5 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#4C3324", fontFamily: "'Sora', sans-serif" }}>Password Policy</h5>
                                            <p style={{ margin: 0, fontSize: 13, color: "#819B8B" }}>Must be at least 8 characters long and include numbers.</p>
                                        </div>
                                    </div>

                                    <div style={{ ...s.inputGroup, marginBottom: 24 }}>
                                        <label style={s.label}>Current Password</label>
                                        <input className="us-input" type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} placeholder="••••••••" required />
                                    </div>

                                    <div style={s.formGrid} className="us-form-grid">
                                        <div style={s.inputGroup}>
                                            <label style={s.label}>New Password</label>
                                            <input className="us-input" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="••••••••" required />
                                        </div>
                                        <div style={s.inputGroup}>
                                            <label style={s.label}>Confirm Password</label>
                                            <input className="us-input" type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} placeholder="••••••••" required />
                                        </div>
                                    </div>

                                    <div style={s.formFooter}>
                                        <button type="submit" disabled={loading} style={s.primaryBtn}>
                                            {loading ? "Updating..." : "Update Password"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <section style={s.sectionAnim}>
                                <div style={s.sectionHeader}>
                                    <h3 style={s.sectionTitle}>Notification Preferences</h3>
                                    <p style={s.sectionDesc}>Control which alerts you receive via email and push notifications.</p>
                                </div>
                                <div style={s.card} className="us-card">
                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        {[
                                            { id: "emailAlerts", label: "Email Alerts", desc: "Receive property updates and account activity via email." },
                                            { id: "pushNotifications", label: "Push Notifications", desc: "Get instant alerts on your desktop or mobile device." },
                                            { id: "smsUpdates", label: "SMS Updates", desc: "Receive urgent notifications and tour reminders via text." },
                                            { id: "marketingEmails", label: "Marketing Emails", desc: "Stay informed about new features and exclusive offers." },
                                        ].map(item => (
                                            <div key={item.id} style={s.settingItem} className="us-setting-item">
                                                <div>
                                                    <div style={s.settingLabel}>{item.label}</div>
                                                    <div style={s.settingDesc}>{item.desc}</div>
                                                </div>
                                                <div
                                                    style={{
                                                        ...s.toggle,
                                                        background: notifications[item.id] ? "#627B68" : "#ddd0c6",
                                                    }}
                                                    onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                                                >
                                                    <div style={{
                                                        ...s.toggleKnob,
                                                        transform: notifications[item.id] ? "translateX(24px)" : "translateX(0)",
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

const s = {
    pageWrapper: {
<<<<<<< HEAD
        backgroundColor: "#f9f6f1",
        backgroundImage: "radial-gradient(at 0% 0%, rgba(98, 123, 104, 0.05) 0, transparent 50%), radial-gradient(at 50% 100%, rgba(178, 132, 107, 0.05) 0, transparent 50%)",
=======
        background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        minHeight: "100vh",
        padding: "80px 20px 60px",
        fontFamily: "'DM Sans', sans-serif",
    },
    container: { maxWidth: 1100, margin: "0 auto" },
    topNav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
    },
    backBtn: {
<<<<<<< HEAD
        background: "white",
        border: "1px solid rgba(228, 203, 182, 0.4)",
        borderRadius: "12px",
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#819b8b",
=======
        background: "#fff",
        border: "1.5px solid #d9c8bb",
        borderRadius: 10,
        padding: "9px 18px",
        fontSize: 14,
        fontWeight: 600,
        color: "#7a5c4a",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
<<<<<<< HEAD
        boxShadow: "0 2px 4px rgba(76, 51, 36, 0.02)",
        transition: "all 0.2s",
=======
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.18s",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    mainLayout: {
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 28,
        alignItems: "start",
    },
    sidebar: {
        background: "#fff",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        height: "fit-content",
        position: "sticky",
<<<<<<< HEAD
        top: "100px",
        boxShadow: "0 10px 20px rgba(76, 51, 36, 0.03)",
        border: "1px solid rgba(228, 203, 182, 0.2)",
    },
    sidebarHeader: {
        "& h2": { margin: 0, fontSize: "24px", fontWeight: "800", color: "#4c3324" },
        "& p": { margin: "4px 0 0", fontSize: "14px", color: "#6b5e58" }
=======
        top: 100,
        boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
        border: "1px solid #e8ddd5",
    },
    sidebarHeader: {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4
    },
    sidebarTitle: {
        margin: 0,
        fontSize: 20,
        fontWeight: 700,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    sideNav: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    sidebarSubtitle: { margin: "4px 0 0", fontSize: 13, color: "#819B8B" },
    sideNav: { display: "flex", flexDirection: "column", gap: 6 },
    navItem: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        borderRadius: 10,
        border: "none",
        background: "transparent",
<<<<<<< HEAD
        color: "#6b5e58",
        fontSize: "15px",
        fontWeight: "600",
=======
        color: "#7a5c4a",
        fontSize: 14,
        fontWeight: 600,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.18s",
        fontFamily: "'DM Sans', sans-serif",
        width: "100%",
    },
    navItemActive: {
<<<<<<< HEAD
        background: "rgba(129, 155, 139, 0.1)",
        color: "#627b68",
=======
        background: "#f0ebe5",
        color: "#4C3324",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    sidebarFooter: {
        paddingTop: 20,
        borderTop: "1px solid #e8ddd5",
    },
    logoutBtn: {
        width: "100%",
        padding: "11px 14px",
        borderRadius: 10,
        border: "none",
<<<<<<< HEAD
        background: "#faf7f5",
        color: "#b2846b",
        fontSize: "14px",
        fontWeight: "600",
=======
        background: "#f5ddd7",
        color: "#8b3a25",
        fontSize: 14,
        fontWeight: 600,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
<<<<<<< HEAD
        transition: "all 0.2s",
=======
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.18s",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    contentArea: { display: "flex", flexDirection: "column", gap: 24 },
    messageBox: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
    },
<<<<<<< HEAD
    sectionHeader: {
        marginBottom: "24px",
        "& h3": { margin: 0, fontSize: "20px", fontWeight: "700", color: "#4c3324" },
        "& p": { margin: "6px 0 0", fontSize: "14px", color: "#6b5e58", lineHeight: "1.6" }
    },
    glassCard: {
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "40px",
        border: "1px solid rgba(228, 203, 182, 0.3)",
        boxShadow: "0 20px 40px rgba(76, 51, 36, 0.04)",
=======
    sectionHeader: { marginBottom: 20 },
    sectionTitle: {
        margin: "0 0 6px",
        fontSize: 20,
        fontWeight: 700,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
    },
    sectionDesc: { margin: 0, fontSize: 14, color: "#819B8B", lineHeight: 1.6 },
    card: {
        background: "#fff",
        borderRadius: 16,
        padding: "36px",
        border: "1px solid #e8ddd5",
        boxShadow: "0 4px 16px rgba(76,51,36,0.05)",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    avatarRow: {
        display: "flex",
        alignItems: "center",
<<<<<<< HEAD
        gap: "30px",
        marginBottom: "40px",
        borderBottom: "1px solid rgba(228, 203, 182, 0.2)",
        paddingBottom: "40px",
    },
    avatarLargeWrapper: {
        position: "relative",
    },
    avatarLarge: {
        width: "120px",
        height: "120px",
        borderRadius: "32px",
        objectFit: "cover",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    },
    cameraOverlay: {
        position: "absolute",
        bottom: "-10px",
        right: "-10px",
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        background: "white",
        color: "#627b68",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(76, 51, 36, 0.1)",
        cursor: "pointer",
        border: "1px solid rgba(228, 203, 182, 0.3)",
    },
    avatarText: {
        flex: 1,
        "& h4": { margin: "0 0 4px", fontSize: "18px", fontWeight: "700", color: "#4c3324" },
        "& p": { margin: "0 0 15px", fontSize: "14px", color: "#6b5e58" }
=======
        gap: 28,
        marginBottom: 36,
        paddingBottom: 36,
        borderBottom: "1px solid #f0ebe5",
    },
    cameraOverlay: {
        position: "absolute",
        bottom: -8,
        right: -8,
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "#fff",
        color: "#B2846B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 3px 10px rgba(76,51,36,0.15)",
        cursor: "pointer",
        border: "1.5px solid #ddd0c6",
    },
    avatarText: { flex: 1 },
    avatarHeading: {
        margin: "0 0 6px",
        fontSize: 16,
        fontWeight: 700,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    avatarDesc: { margin: 0, fontSize: 13, color: "#819B8B", lineHeight: 1.5 },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" },
    inputGroup: { display: "flex", flexDirection: "column", gap: 8 },
    label: {
        fontSize: 13,
        fontWeight: 600,
        color: "#5a3e30",
        display: "flex",
<<<<<<< HEAD
        flexDirection: "column",
        gap: "10px",
        "& label": { fontSize: "14px", fontWeight: "600", color: "#4c3324", display: 'flex', alignItems: 'center', gap: '8px' },
        "& input": {
            padding: "14px 18px",
            borderRadius: "14px",
            border: "1px solid rgba(228, 203, 182, 0.4)",
            fontSize: "15px",
            background: "white",
            transition: "all 0.2s",
            color: "#3a2e28",
            "&:focus": { outline: 'none', borderColor: '#819b8b', boxShadow: '0 0 0 4px rgba(129, 155, 139, 0.1)' }
        }
=======
        alignItems: "center",
        gap: 7,
        letterSpacing: "0.02em",
    },
    formFooter: {
        marginTop: 32,
        paddingTop: 24,
        borderTop: "1px solid #f0ebe5",
        display: "flex",
        justifyContent: "flex-end",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    primaryBtn: {
<<<<<<< HEAD
        padding: "14px 30px",
        background: "linear-gradient(135deg, #627b68 0%, #4c3324 100%)",
        color: "white",
=======
        padding: "12px 30px",
        background: "#627B68",
        color: "#fff",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
        border: "none",
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
<<<<<<< HEAD
        boxShadow: "0 10px 20px rgba(76, 51, 36, 0.2)",
        transition: "all 0.2s ease",
    },
    securityAlert: {
        background: "#faf7f5",
        padding: "20px",
        borderRadius: "16px",
        display: "flex",
        gap: "16px",
        marginBottom: "30px",
        border: "1px solid rgba(228, 203, 182, 0.3)",
        "& h5": { margin: 0, fontSize: "15px", fontWeight: "700", color: "#4c3324" },
        "& p": { fontSize: "13px", color: "#6b5e58" }
    },
    settingsList: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
=======
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 14px rgba(98,123,104,0.3)",
        transition: "all 0.2s",
        letterSpacing: "0.02em",
    },
    securityAlert: {
        background: "#f0ebe5",
        padding: "18px 20px",
        borderRadius: 12,
        display: "flex",
        gap: 16,
        marginBottom: 28,
        border: "1px solid #e8ddd5",
        alignItems: "flex-start",
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    settingItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 20px",
        borderRadius: 12,
        background: "#fdf9f7",
        border: "1px solid #e8ddd5",
        transition: "all 0.18s",
        gap: 20,
    },
    settingLabel: {
<<<<<<< HEAD
        fontSize: "15px",
        fontWeight: "600",
        color: "#4c3324",
    },
    settingDesc: {
        fontSize: "13px",
        color: "#6b5e58",
=======
        fontSize: 14,
        fontWeight: 600,
        color: "#4C3324",
        fontFamily: "'Sora', sans-serif",
        marginBottom: 3,
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    },
    settingDesc: { fontSize: 13, color: "#819B8B" },
    toggle: {
        width: 50,
        height: 26,
        borderRadius: 20,
        padding: 3,
        cursor: "pointer",
        transition: "background 0.3s",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
    },
    toggleKnob: {
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    loaderContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        background: "linear-gradient(135deg, #f5ede6 0%, #faf6f3 60%, #eef2ee 100%)",
    },
<<<<<<< HEAD
    themeCardActive: {
        borderColor: "#627b68",
        background: "rgba(129, 155, 139, 0.03)",
    },
    themePreview: {
        width: "100%",
        height: "100px",
        borderRadius: "12px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        position: "relative",
        overflow: "hidden",
    },
    fullInputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "24px",
        "& label": { fontSize: "14px", fontWeight: "600", color: "#475569" },
        "& input": {
            padding: "14px 18px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            fontSize: "15px",
        }
    },
    comingSoon: {
        padding: "60px 0",
        textAlign: "center",
        "& h4": { margin: "20px 0 8px", fontSize: "20px", fontWeight: "700" },
        "& p": { fontSize: "15px", color: "#64748b", maxWidth: "400px", margin: "0 auto" }
    },
    loaderContainer: { height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" },
    spinner: { width: "50px", height: "50px", border: "5px solid #faf7f5", borderTop: "5px solid #627b68", borderRadius: "50%", animation: "spin 1s linear infinite" },
    sectionAnim: { animation: "fadeIn 0.4s ease-out" }
=======
    spinner: {
        width: 44,
        height: 44,
        border: "4px solid #e8ddd5",
        borderTop: "4px solid #B2846B",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    sectionAnim: { animation: "fadeIn 0.35s ease-out" },
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
};

export default UserSettings;
