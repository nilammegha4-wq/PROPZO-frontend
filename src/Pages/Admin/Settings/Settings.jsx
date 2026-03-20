import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  /* ================= STATES ================= */
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [site, setSite] = useState({ siteName: "", supportEmail: "", currency: "INR" });

  const getAuthToken = () => {
    const rawToken = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
    try {
      const parsed = JSON.parse(rawToken);
      if (parsed && typeof parsed === 'object') return parsed.token || rawToken;
      return parsed || rawToken;
    } catch (e) {
      return rawToken;
    }
  };

  /* ================= LOAD SAVED DATA ================= */
  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const token = getAuthToken();
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Admin Profile
        const profileRes = await axios.get("http://localhost:5000/api/admin/profile", { headers });
        if (profileRes.data.success) {
          setProfile({
            name: profileRes.data.user.name || "Admin User",
            email: profileRes.data.user.email || "prpzoestate@gmail.com",
            phone: profileRes.data.user.phone || "+91 98765 43210",
          });
        }

        // Fetch Site Config
        const siteRes = await axios.get("http://localhost:5000/api/admin/settings/site", { headers });
        if (siteRes.data.success) {
          const fetchedSite = siteRes.data.settings;
          setSite({
            siteName: fetchedSite.siteName || "Propzo Realty",
            supportEmail: fetchedSite.supportEmail || "prpzoestate@gmail.com",
            currency: fetchedSite.currency || "INR",
          });
        }
      } catch (err) {
        console.error("Error fetching admin settings data", err);
      }
    };

    fetchSettingsData();
  }, []);

  /* ================= HANDLERS ================= */
  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPassword({ ...password, [e.target.name]: e.target.value });
  const handleSiteChange = (e) => setSite({ ...site, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.put("http://localhost:5000/api/admin/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        alert("✅ Profile Updated Successfully via Backend!");
      }
    } catch (err) {
      alert("❌ Failed to update profile.");
    }
  };

  const savePassword = async () => {
    if (!password.old || !password.new || !password.confirm) return alert("Please fill all fields");
    if (password.new !== password.confirm) return alert("❌ Passwords do not match!");

    try {
      const token = getAuthToken();
      const res = await axios.put("http://localhost:5000/api/admin/password",
        { oldPassword: password.old, newPassword: password.new },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("🔒 Password Changed Successfully via Backend!");
        setPassword({ old: "", new: "", confirm: "" });
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Failed to change password. Make sure current password is correct.");
    }
  };

  const saveSite = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.put("http://localhost:5000/api/admin/settings/site", site, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        alert("🌐 Website Global Configuration Synced to Database!");
      }
    } catch (err) {
      alert("❌ Failed to save website settings.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Account Settings</h1>
        <p style={styles.subtitle}>Manage your profile, security, and global website configurations.</p>
      </header>

      <div style={styles.grid}>
        {/* ================= PROFILE ================= */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Admin Profile</h3>
            <p style={styles.cardSub}>Update your personal details.</p>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input name="name" style={styles.input} value={profile.name} onChange={handleProfileChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input name="email" style={styles.input} value={profile.email} onChange={handleProfileChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input name="phone" style={styles.input} value={profile.phone} onChange={handleProfileChange} />
          </div>
          <button style={styles.primaryBtn} onClick={saveProfile}>Save Profile</button>
        </div>

        {/* ================= PASSWORD ================= */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Security</h3>
            <p style={styles.cardSub}>Change your account password.</p>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Current Password</label>
            <input type="password" name="old" style={styles.input} value={password.old} onChange={handlePasswordChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>New Password</label>
            <input type="password" name="new" style={styles.input} value={password.new} onChange={handlePasswordChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <input type="password" name="confirm" style={styles.input} value={password.confirm} onChange={handlePasswordChange} />
          </div>
          <button style={styles.secondaryBtn} onClick={savePassword}>Update Password</button>
        </div>

        {/* ================= SITE SETTINGS ================= */}
        <div style={{ ...styles.card, gridColumn: "span 2" }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Global Configuration</h3>
            <p style={styles.cardSub}>Control your website's branding and defaults.</p>
          </div>
          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Site Name</label>
              <input name="siteName" style={styles.input} value={site.siteName} onChange={handleSiteChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Support Email</label>
              <input name="supportEmail" style={styles.input} value={site.supportEmail} onChange={handleSiteChange} />
            </div>
            <div style={{ flex: 0.5 }}>
              <label style={styles.label}>Currency</label>
              <select name="currency" style={styles.select} value={site.currency} onChange={handleSiteChange}>
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
          <button style={styles.primaryBtn} onClick={saveSite}>Save Website Configuration</button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: { padding: "40px 60px", backgroundColor: "#f9f6f1", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },
  header: { marginBottom: "40px" },
  title: { fontSize: "32px", fontWeight: "800", color: "#4c3324", margin: 0 },
  subtitle: { fontSize: "16px", color: "#64748b", marginTop: "8px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", maxWidth: "1100px" },
  card: { backgroundColor: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(76, 51, 36, 0.05)", border: "1px solid rgba(228, 203, 182, 0.2)" },
  cardHeader: { marginBottom: "24px" },
  cardTitle: { fontSize: "18px", fontWeight: "700", color: "#4c3324", margin: 0 },
  cardSub: { fontSize: "13px", color: "#94a3b8", marginTop: "4px" },
  formGroup: { marginBottom: "20px" },
  row: { display: "flex", gap: "20px", marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#627b68", marginBottom: "8px" },
  input: { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(228, 203, 182, 0.3)", fontSize: "14px", boxSizing: "border-box", outline: "none", color: "#334155", backgroundColor: "#fdf8f4" },
  select: { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(228, 203, 182, 0.3)", fontSize: "14px", backgroundColor: "#fff", cursor: "pointer" },
  primaryBtn: { backgroundColor: "#627b68", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" },
  secondaryBtn: { backgroundColor: "#4c3324", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontWeight: "600", cursor: "pointer" },
};