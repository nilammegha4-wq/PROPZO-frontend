import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaUser, FaLock, FaPhone, FaLocationDot, FaCamera,
    FaArrowLeft, FaCircleCheck, FaTriangleExclamation,
    FaBell, FaShieldHalved, FaPalette, FaGlobe, FaRightFromBracket
} from "react-icons/fa6";
import Avatar from "../../components/Common/Avatar";
import { useAuth } from "../../context/AuthContext";

const UserSettings = () => {
    const { auth, updateAuth, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // Profile State
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: ""
    });

    // Password State
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Notification State
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        pushNotifications: true,
        smsUpdates: false,
        marketingEmails: false,
    });

    // Appearance State
    const [appearance, setAppearance] = useState({
        accentColor: "#3b82f6",
        sidebarStyle: "full",
        density: "comfortable",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(`/api/users/${auth.id}`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setProfile({
                    name: res.data.name || "",
                    email: res.data.email || "",
                    phone: res.data.phone || "",
                    address: res.data.address || "",
                    avatar: res.data.avatar || "",
                    profileImage: res.data.profileImage || ""
                });
                if (res.data.notificationPreferences) {
                    setNotifications(res.data.notificationPreferences);
                }
                if (res.data.appearancePreferences) {
                    setAppearance(res.data.appearancePreferences);
                }
            } catch (err) {
                console.error("Fetch User Error:", err);
                setMessage({ text: "Failed to load profile data", type: "error" });
            } finally {
                setFetching(false);
            }
        };

        fetchUserData();
    }, [auth, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            let finalAvatarPath = profile.avatar;

            // 1. If a new file is selected, upload it first
            if (selectedFile) {
                const formData = new FormData();
                formData.append("avatar", selectedFile);

                const uploadRes = await axios.post(`/api/users/${auth.id}/upload-avatar`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                finalAvatarPath = uploadRes.data.filePath;
            }

            // 2. Update the user profile with either the old path or the new one
            const res = await axios.put(`/api/users/${auth.id}`, {
                name: profile.name,
                phone: profile.phone,
                address: profile.address,
                avatar: finalAvatarPath,
                profileImage: finalAvatarPath,
                notificationPreferences: notifications,
                appearancePreferences: appearance
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });

            updateAuth(res.data);

            setProfile(prev => ({
                ...prev,
                avatar: res.data.avatar,
                profileImage: res.data.profileImage
            }));
            setSelectedFile(null);
            setPreviewUrl("");
            setMessage({ text: "Profile updated successfully!", type: "success" });
        } catch (err) {
            console.error("Profile Update Error:", err);
            setMessage({ text: err.response?.data?.message || "Failed to update profile", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ text: "Passwords do not match", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            await axios.put(`/api/users/${auth.id}/password`, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });

            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setMessage({ text: "Password updated successfully!", type: "success" });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || "Failed to update password", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (fetching) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
                <p>Curating your experience...</p>
            </div>
        );
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                {/* Navbar / Breadcrumb */}
                <div style={styles.topNav}>
                    <button onClick={() => navigate(-1)} style={styles.backBtn}>
                        <FaArrowLeft /> Exit Settings
                    </button>
                </div>

                <div style={styles.mainLayout}>
                    {/* Sidebar */}
                    <aside style={styles.sidebar}>
                        <div style={styles.sidebarHeader}>
                            <h2>Settings</h2>
                            <p>Manage your account</p>
                        </div>
                        <nav style={styles.sideNav}>
                            <button
                                onClick={() => setActiveTab("profile")}
                                style={{ ...styles.navItem, ...(activeTab === "profile" ? styles.navItemActive : {}) }}
                            >
                                <FaUser /> My Profile
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                style={{ ...styles.navItem, ...(activeTab === "security" ? styles.navItemActive : {}) }}
                            >
                                <FaShieldHalved /> Security
                            </button>
                            <button
                                onClick={() => setActiveTab("notifications")}
                                style={{ ...styles.navItem, ...(activeTab === "notifications" ? styles.navItemActive : {}) }}
                            >
                                <FaBell /> Notifications
                            </button>
                        </nav>
                        <div style={styles.sidebarFooter}>
                            <button onClick={handleLogout} style={styles.logoutBtn}>
                                <FaRightFromBracket /> Logout
                            </button>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main style={styles.contentArea}>
                        {message.text && (
                            <div style={{
                                ...styles.messageBox,
                                backgroundColor: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                color: message.type === "success" ? "#059669" : "#dc2626",
                                border: `1px solid ${message.type === "success" ? "#10b981" : "#ef4444"}`
                            }}>
                                {message.type === "success" ? <FaCircleCheck /> : <FaTriangleExclamation />}
                                {message.text}
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <section style={styles.sectionAnim}>
                                <div style={styles.sectionHeader}>
                                    <h3>Personal Information</h3>
                                    <p>Update your personal details and how others see you on the platform.</p>
                                </div>

                                <form onSubmit={handleProfileUpdate} style={styles.glassCard}>
                                    <div style={styles.avatarMain}>
                                        <div style={styles.avatarLargeWrapper}>
                                            <Avatar
                                                user={profile || auth}
                                                src={previewUrl || profile.profileImage || profile.avatar || auth.profileImage || auth.avatar}
                                                size="lg"
                                                className="pz-settings-avatar"
                                            />
                                            <label style={styles.cameraOverlay}>
                                                <FaCamera />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setSelectedFile(file);
                                                            const url = URL.createObjectURL(file);
                                                            setPreviewUrl(url);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <div style={styles.avatarText}>
                                            <h4>Profile Picture</h4>
                                            <p>Jumpstart your presence with a photo. JPG or PNG, max 2MB.</p>
                                        </div>
                                    </div>

                                    <div style={styles.formGrid}>
                                        <div style={styles.inputGroup}>
                                            <label><FaUser /> Display Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                        <div style={styles.inputGroup}>
                                            <label><FaGlobe /> Email Address</label>
                                            <input type="email" value={profile.email} disabled style={styles.disabledInput} />
                                        </div>
                                        <div style={styles.inputGroup}>
                                            <label><FaPhone /> Phone Number</label>
                                            <input
                                                type="text"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div style={styles.inputGroup}>
                                            <label><FaLocationDot /> Location / City</label>
                                            <input
                                                type="text"
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                placeholder="Mumbai, India"
                                            />
                                        </div>
                                    </div>

                                    <div style={styles.formFooter}>
                                        <button type="submit" disabled={loading} style={styles.primaryBtn}>
                                            {loading ? "Synchronizing..." : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        )}

                        {activeTab === "security" && (
                            <section style={styles.sectionAnim}>
                                <div style={styles.sectionHeader}>
                                    <h3>Security Settings</h3>
                                    <p>Protect your account with a strong password and multi-factor authentication.</p>
                                </div>

                                <form onSubmit={handlePasswordUpdate} style={styles.glassCard}>
                                    <div style={styles.securityAlert}>
                                        <FaShieldHalved style={{ fontSize: '24px', color: '#6366f1' }} />
                                        <div>
                                            <h5>Password Policy</h5>
                                            <p>Must be at least 8 characters long and include numbers.</p>
                                        </div>
                                    </div>

                                    <div style={styles.fullInputGroup}>
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGrid}>
                                        <div style={styles.inputGroup}>
                                            <label>New Password</label>
                                            <input
                                                type="password"
                                                value={passwords.newPassword}
                                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <div style={styles.inputGroup}>
                                            <label>Confirm Password</label>
                                            <input
                                                type="password"
                                                value={passwords.confirmPassword}
                                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div style={styles.formFooter}>
                                        <button type="submit" disabled={loading} style={styles.primaryBtn}>
                                            {loading ? "Updating..." : "Update Password"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        )}

                        {activeTab === "notifications" && (
                            <section style={styles.sectionAnim}>
                                <div style={styles.sectionHeader}>
                                    <h3>Notification Preferences</h3>
                                    <p>Control which alerts you receive via email and push notifications.</p>
                                </div>
                                <div style={styles.glassCard}>
                                    <div style={styles.settingsList}>
                                        {[
                                            { id: 'emailAlerts', label: 'Email Alerts', desc: 'Receive property updates and account activity via email.' },
                                            { id: 'pushNotifications', label: 'Push Notifications', desc: 'Get instant alerts on your desktop or mobile device.' },
                                            { id: 'smsUpdates', label: 'SMS Updates', desc: 'Receive urgent notifications and tour reminders via text.' },
                                            { id: 'marketingEmails', label: 'Marketing Emails', desc: 'Stay informed about new features and exclusive offers.' }
                                        ].map(item => (
                                            <div key={item.id} style={styles.settingItem}>
                                                <div style={styles.settingInfo}>
                                                    <span style={styles.settingLabel}>{item.label}</span>
                                                    <span style={styles.settingDesc}>{item.desc}</span>
                                                </div>
                                                <div
                                                    style={{
                                                        ...styles.toggle,
                                                        background: notifications[item.id] ? '#3b82f6' : '#e2e8f0'
                                                    }}
                                                    onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                                                >
                                                    <div style={{
                                                        ...styles.toggleKnob,
                                                        transform: notifications[item.id] ? 'translateX(24px)' : 'translateX(0)'
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

const styles = {
    pageWrapper: {
        backgroundColor: "#f0f2f5",
        backgroundImage: "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0, transparent 50%), radial-gradient(at 50% 100%, rgba(184, 150, 90, 0.05) 0, transparent 50%)",
        minHeight: "100vh",
        padding: "80px 20px",
        fontFamily: "'Outfit', sans-serif",
    },
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
    },
    topNav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        padding: "0 10px",
    },
    backBtn: {
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#475569",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        transition: "all 0.2s",
    },
    mainLayout: {
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "30px",
    },
    sidebar: {
        background: "white",
        borderRadius: "24px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        height: "fit-content",
        position: "sticky",
        top: "100px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.03)",
        border: "1px solid #f1f5f9",
    },
    sidebarHeader: {
        "& h2": { margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a" },
        "& p": { margin: "4px 0 0", fontSize: "14px", color: "#64748b" }
    },
    sideNav: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "none",
        background: "transparent",
        color: "#64748b",
        fontSize: "15px",
        fontWeight: "600",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    navItemActive: {
        background: "#eff6ff",
        color: "#2563eb",
    },
    sidebarFooter: {
        marginTop: "auto",
        paddingTop: "20px",
        borderTop: "1px solid #f1f5f9",
    },
    logoutBtn: {
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: "none",
        background: "#fff1f2",
        color: "#e11d48",
        fontSize: "14px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
    },
    contentArea: {
        display: "flex",
        flexDirection: "column",
        gap: "30px",
    },
    messageBox: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "20px",
        borderRadius: "16px",
        fontSize: "15px",
        fontWeight: "500",
        animation: "slideIn 0.3s ease-out",
    },
    sectionHeader: {
        marginBottom: "24px",
        "& h3": { margin: 0, fontSize: "20px", fontWeight: "700", color: "#1e293b" },
        "& p": { margin: "6px 0 0", fontSize: "14px", color: "#64748b", lineHeight: "1.6" }
    },
    glassCard: {
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "40px",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
    },
    avatarMain: {
        display: "flex",
        alignItems: "center",
        gap: "30px",
        marginBottom: "40px",
        borderBottom: "1px solid #f1f5f9",
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
        color: "#2563eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        border: "none",
    },
    avatarText: {
        flex: 1,
        "& h4": { margin: "0 0 4px", fontSize: "18px", fontWeight: "700" },
        "& p": { margin: "0 0 15px", fontSize: "14px", color: "#64748b" }
    },
    urlInput: {
        width: "100%",
        padding: "10px 15px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        fontSize: "13px",
        background: "#f8fafc",
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "& label": { fontSize: "14px", fontWeight: "600", color: "#475569", display: 'flex', alignItems: 'center', gap: '8px' },
        "& input": {
            padding: "14px 18px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            fontSize: "15px",
            background: "white",
            transition: "all 0.2s",
            "&:focus": { outline: 'none', borderColor: '#3b82f6', boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)' }
        }
    },
    disabledInput: { background: "#f8fafc", color: "#94a3b8", cursor: "not-allowed" },
    formFooter: { marginTop: "40px", borderTop: "1px solid #f1f5f9", paddingTop: "30px", display: 'flex', justifyContent: 'flex-end' },
    primaryBtn: {
        padding: "14px 30px",
        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        color: "white",
        border: "none",
        borderRadius: "14px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)",
        transition: "transform 0.2s ease",
    },
    securityAlert: {
        background: "#f0f7ff",
        padding: "20px",
        borderRadius: "16px",
        display: "flex",
        gap: "16px",
        marginBottom: "30px",
        "& h5": { margin: 0, fontSize: "15px", fontWeight: "700", color: "#1e40af" },
        "& p": { fontSize: "13px", color: "#3b82f6" }
    },
    settingsList: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    settingItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.5)",
        border: "1px solid #f1f5f9",
        transition: "all 0.2s",
        "&:hover": { background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }
    },
    settingInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    settingLabel: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#1e293b",
    },
    settingDesc: {
        fontSize: "13px",
        color: "#64748b",
    },
    toggle: {
        width: "50px",
        height: "26px",
        borderRadius: "20px",
        padding: "3px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        position: 'relative'
    },
    toggleKnob: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    appearanceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    themeCard: {
        padding: "20px",
        borderRadius: "16px",
        border: "2px solid #f1f5f9",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
        "&:hover": { borderColor: "#e2e8f0" }
    },
    themeCardActive: {
        borderColor: "#3b82f6",
        background: "rgba(59, 130, 246, 0.03)",
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
    spinner: { width: "50px", height: "50px", border: "5px solid #f3f3f3", borderTop: "5px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite" },
    sectionAnim: { animation: "fadeIn 0.4s ease-out" }
};

export default UserSettings;
