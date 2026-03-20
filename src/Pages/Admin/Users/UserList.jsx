import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(`http://localhost:5000/api/users/${id}`, { status: updatedStatus });
      fetchUsers();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.role !== "admin" &&
      ((u.fullName || u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .ul-search:focus {
          outline: none !important;
          border-color: #819B8B !important;
          box-shadow: 0 0 0 3px rgba(129,155,139,0.15) !important;
        }
        .ul-search::placeholder { color: #a89385; font-size: 13.5px; }
        .toggle-btn:hover { color: #627B68 !important; }
        .delete-btn:hover { color: #6b1a0a !important; }
        @media (max-width: 991px) { .ul-container { padding: 30px 20px !important; } }
        @media (max-width: 768px) { .ul-search { width: 100% !important; } }
      `}</style>

      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper} className="ul-container">
          {/* Page Header */}
          <div style={s.pageHeader}>
            <div>
              <p style={s.breadcrumb}>Admin / Users</p>
              <h1 style={s.pageTitle}>User Management</h1>
              <p style={s.subtitle}>Manage user accounts and permissions</p>
            </div>
          </div>


          {/* Card */}
          <div style={s.card}>
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={s.searchInput}
              className="ul-search"
            />

            <div style={{ width: "100%", overflowX: "auto" }}>
              <table style={s.table}>
                <thead style={s.thead}>
                  <tr>
                    <th style={s.th}>User Name</th>
                    <th style={s.th}>Email</th>
                    <th style={s.th}>Status</th>
                    <th style={s.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u._id} style={s.tr}>
                      <td style={s.td}>
                        <div style={s.userBox}>
                          <div style={s.avatar}>
                            {(u.fullName || u.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <span style={s.userName}>{u.fullName || u.name}</span>
                        </div>
                      </td>
                      <td style={{ ...s.td, color: "#819B8B", fontSize: "0.88rem" }}>{u.email}</td>
                      <td style={s.td}>
                        <span style={s.statusBadge(u.status)}>{u.status}</span>
                      </td>
                      <td style={s.td}>
                        <button
                          onClick={() => toggleStatus(u._id, u.status)}
                          style={s.toggleBtn}
                          className="toggle-btn"
                        >
                          {u.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => deleteUser(u._id)}
                          style={s.deleteBtn}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div style={s.noUsers}>No users found</div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

// ─── EARTHY COLOR PALETTE (matching AddProperty) ────────────────────────────
// #E4CBB6 — blush | #B2846B — terracotta | #819B8B — sage
// #627B68 — forest green | #4C3324 — dark brown
// ─────────────────────────────────────────────────────────────────────────────

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
    maxWidth: 1100,
    margin: "0 auto",
    padding: "48px 40px",
    width: "100%",
  },
  pageHeader: {
    marginBottom: 32,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#b2846b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "0 0 6px 0",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#4c3324",
    fontFamily: "'Sora', sans-serif",
    margin: "0 0 6px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#819B8B",
    fontSize: "0.9rem",
    margin: 0,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid rgba(228, 203, 182, 0.3)",
    boxShadow: "0 4px 16px rgba(76, 51, 36, 0.06)",
    padding: "24px",
    overflow: "hidden",

  },
  searchInput: {
    padding: "10px 14px",
    width: "320px",
    borderRadius: 9,
    border: "1px solid rgba(228, 203, 182, 0.4)",
    marginBottom: 20,
    fontSize: 14,
    color: "#4c3324",
    background: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.18s, box-shadow 0.18s",
    display: "block",
    outline: "none",

  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    backgroundColor: "rgba(178, 132, 107, 0.05)", // Brand Tan light
    borderBottom: "1.5px solid #e8ddd5",

  },
  th: {
    padding: "15px 22px",
    textAlign: "left",
    fontSize: 12,
    fontWeight: 600,
    color: "#627B68",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Sora', sans-serif",

  },
  tr: {
    borderBottom: "1px solid #f5ede6",
  },
  td: {
    padding: "16px 22px",
    fontSize: "0.9rem",
    verticalAlign: "middle",
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#627b68", // Brand Sage Dark

    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "'Sora', sans-serif",
    flexShrink: 0,
  },
  userName: {
    fontWeight: 600,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.92rem",
  },
  statusBadge: (status) => ({
    padding: "4px 14px",
    borderRadius: 50,
    fontSize: "0.82rem",
    fontWeight: 700,
    display: "inline-block",
    fontFamily: "'DM Sans', sans-serif",
    backgroundColor: status === "Active" ? "#d4e6da" : "#f5ddd7",
    color: status === "Active" ? "#627B68" : "#8b3a25",
  }),
  toggleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    marginRight: 16,
    color: "#627b68", // Brand Sage Dark
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem",
    letterSpacing: "0.02em",
    transition: "color 0.18s",
    padding: 0,

  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    color: "#8b3a25",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem",
    letterSpacing: "0.02em",
    transition: "color 0.18s",
    padding: 0,
  },
  noUsers: {
    padding: "30px",
    textAlign: "center",
    color: "#b2a090",
    fontStyle: "italic",
    fontSize: "0.95rem",
    fontFamily: "'DM Sans', sans-serif",
  },
};
