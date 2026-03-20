import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [site, setSite] = useState({ siteName: "", supportEmail: "", currency: "INR" });

  const getAuthToken = () => {
    const rawToken = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
    try {
      const parsed = JSON.parse(rawToken);
      if (parsed && typeof parsed === "object") return parsed.token || rawToken;
      return parsed || rawToken;
    } catch (e) {
      return rawToken;
    }
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const token = getAuthToken();
        const headers = { Authorization: `Bearer ${token}` };

        const profileRes = await axios.get("http://localhost:5000/api/admin/profile", { headers });
        if (profileRes.data.success) {
          setProfile({
            name: profileRes.data.user.name || "Admin User",
            email: profileRes.data.user.email || "prpzoestate@gmail.com",
            phone: profileRes.data.user.phone || "+91 98765 43210",
          });
        }

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

  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPassword({ ...password, [e.target.name]: e.target.value });
  const handleSiteChange = (e) => setSite({ ...site, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.put("http://localhost:5000/api/admin/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) alert("✅ Profile Updated Successfully!");
    } catch (err) {
      alert("❌ Failed to update profile.");
    }
  };

  const savePassword = async () => {
    if (!password.old || !password.new || !password.confirm) return alert("Please fill all fields");
    if (password.new !== password.confirm) return alert("❌ Passwords do not match!");
    try {
      const token = getAuthToken();
      const res = await axios.put(
        "http://localhost:5000/api/admin/password",
        { oldPassword: password.old, newPassword: password.new },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert("🔒 Password Changed Successfully!");
        setPassword({ old: "", new: "", confirm: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to change password.");
    }
  };

  const saveSite = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.put("http://localhost:5000/api/admin/settings/site", site, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) alert("🌐 Website Configuration Saved!");
    } catch (err) {
      alert("❌ Failed to save website settings.");
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
            <p style={s.breadcrumb}>Admin / Settings</p>
            <h1 style={s.pageTitle}>Account Settings</h1>
            <p style={s.subtitle}>Manage your profile, security, and global website configurations.</p>
          </div>

          <div style={s.grid}>
            {/* Profile */}
            <Card title="Admin Profile" sub="Update your personal details." icon="👤">
              <Field label="Full Name">
                <input style={s.input} name="name" value={profile.name} onChange={handleProfileChange} />
              </Field>
              <Field label="Email Address">
                <input style={s.input} name="email" value={profile.email} onChange={handleProfileChange} />
              </Field>
              <Field label="Phone Number">
                <input style={s.input} name="phone" value={profile.phone} onChange={handleProfileChange} />
              </Field>
              <button style={s.primaryBtn} onClick={saveProfile}>Save Profile</button>
            </Card>

            {/* Password */}
            <Card title="Security" sub="Change your account password." icon="🔐">
              <Field label="Current Password">
                <input style={s.input} type="password" name="old" value={password.old} onChange={handlePasswordChange} />
              </Field>
              <Field label="New Password">
                <input style={s.input} type="password" name="new" value={password.new} onChange={handlePasswordChange} />
              </Field>
              <Field label="Confirm New Password">
                <input style={s.input} type="password" name="confirm" value={password.confirm} onChange={handlePasswordChange} />
              </Field>
              <button style={s.secondaryBtn} onClick={savePassword}>Update Password</button>
            </Card>

            {/* Site Settings — full width */}
            <div style={{ ...s.cardWrap, gridColumn: "span 2" }}>
              <div style={s.cardHeaderRow}>
                <div style={s.cardIconCircle}>🌐</div>
                <div>
                  <h3 style={s.cardTitle}>Global Configuration</h3>
                  <p style={s.cardSub}>Control your website's branding and defaults.</p>
                </div>
              </div>
              <div style={s.cardBody}>
                <div style={s.row}>
                  <Field label="Site Name" style={{ flex: 1 }}>
                    <input style={s.input} name="siteName" value={site.siteName} onChange={handleSiteChange} />
                  </Field>
                  <Field label="Support Email" style={{ flex: 1 }}>
                    <input style={s.input} name="supportEmail" value={site.supportEmail} onChange={handleSiteChange} />
                  </Field>
                  <Field label="Currency" style={{ flex: "0 0 160px" }}>
                    <select style={s.input} name="currency" value={site.currency} onChange={handleSiteChange}>
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </Field>
                </div>
                <button style={s.primaryBtn} onClick={saveSite}>Save Website Configuration</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ title, sub, icon, children }) {
  return (
    <div style={s.cardWrap}>
      <div style={s.cardHeaderRow}>
        <div style={s.cardIconCircle}>{icon}</div>
        <div>
          <h3 style={s.cardTitle}>{title}</h3>
          <p style={s.cardSub}>{sub}</p>
        </div>
      </div>
      <div style={s.cardBody}>{children}</div>
    </div>
  );
}

function Field({ label, children, style }) {
  return (
    <div style={{ marginBottom: 18, ...style }}>
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
    border-color: #627b68 !important;
    box-shadow: 0 0 0 3px rgba(98,123,104,0.15) !important;
  }
`;

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f9f6f1 0%, #ffffff 60%, #f4f1eb 100%)",
    fontFamily: "'DM Sans', sans-serif",
  },
  accentBar: {
    width: 5,
    background: "linear-gradient(180deg, #627b68 0%, #819b8b 100%)",
    flexShrink: 0,
  },
  wrapper: {
    flex: 1,
    padding: "48px 52px",
    maxWidth: 1200,
  },
  pageHeader: {
    marginBottom: 40,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#b2846b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "0 0 6px",
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 700,
    color: "#4c3324",
    fontFamily: "'Sora', sans-serif",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 15,
    color: "#7a5c4a",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    maxWidth: 1100,
  },
  cardWrap: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid rgba(228, 203, 182, 0.3)",
    boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
    overflow: "hidden",
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "20px 24px",
    borderBottom: "1px solid #e8ddd5",
    background: "rgba(178, 132, 107, 0.05)",
  },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(129, 155, 139, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
    color: "#627b68",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#4c3324",
    margin: 0,
    fontFamily: "'Sora', sans-serif",
  },
  cardSub: {
    fontSize: 13,
    color: "#7a5c4a",
    margin: "3px 0 0",
  },
  cardBody: {
    padding: "24px",
  },
  row: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 0,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#627b68",
    marginBottom: 7,
    letterSpacing: "0.02em",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 9,
    border: "1px solid rgba(228, 203, 182, 0.3)",
    fontSize: 14,
    color: "#334155",
    background: "#fdf8f4",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },
  primaryBtn: {
    background: "#627B68",
    color: "#fff",
    padding: "11px 24px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(98,123,104,0.3)",
    transition: "all 0.2s",
    marginTop: 4,
  },
  secondaryBtn: {
    background: "#4C3324",
    color: "#fff",
    padding: "11px 24px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(76,51,36,0.25)",
    transition: "all 0.2s",
    marginTop: 4,
  },
};

