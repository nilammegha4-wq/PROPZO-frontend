// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // ================= FETCH USERS FROM BACKEND =================
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // ================= TOGGLE STATUS =================
//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       const updatedStatus =
//         currentStatus === "Active" ? "Inactive" : "Active";

//       await axios.put(`http://localhost:5000/api/users/${id}`, {
//         status: updatedStatus,
//       });

//       fetchUsers(); // refresh list
//     } catch (err) {
//       console.error("Status update failed", err);
//     }
//   };

//   // ================= DELETE USER =================
//   const deleteUser = async (id) => {
//     if (window.confirm("Are you sure you want to remove this user?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/users/${id}`);
//         fetchUsers();
//       } catch (err) {
//         console.error("Delete failed", err);
//       }
//     }
//   };

//   const filteredUsers = users.filter(
//     (u) =>
//       u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
//       u.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>User Management</h1>
//           <p style={styles.subtitle}>
//             Manage permissions and account status.
//           </p>
//         </div>
//       </div>

//       <div style={styles.tableCard}>
//         {/* Search */}
//         <div style={styles.searchBarWrapper}>
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={styles.searchInput}
//           />
//         </div>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>USER</th>
//               <th style={styles.th}>EMAIL</th>
//               <th style={styles.th}>PHONE</th>
//               <th style={styles.th}>STATUS</th>
//               <th style={styles.th}>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((u) => (
//               <tr key={u._id}>
//                 <td style={styles.td}>{u.fullName}</td>
//                 <td style={styles.td}>{u.email}</td>
//                 <td style={styles.td}>{u.phone}</td>
//                 <td style={styles.td}>{u.status}</td>
//                 <td style={styles.td}>
//                   <button
//                     onClick={() => toggleStatus(u._id, u.status)}
//                     style={styles.actionBtn}
//                   >
//                     {u.status === "Active" ? "Deactivate" : "Activate"}
//                   </button>

//                   <button
//                     onClick={() => deleteUser(u._id)}
//                     style={{ ...styles.actionBtn, color: "red" }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredUsers.length === 0 && (
//           <div style={styles.noResults}>No users found</div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* STYLES same rakhya che */
// const styles = {
//   container: { padding: "40px" },
//   header: { marginBottom: "20px" },
//   title: { fontSize: "26px", fontWeight: "700" },
//   subtitle: { color: "#6B7280" },
//   tableCard: { background: "#fff", padding: "20px", borderRadius: "10px" },
//   searchBarWrapper: { marginBottom: "15px" },
//   searchInput: { padding: "8px", width: "300px" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "10px", borderBottom: "1px solid #ddd" },
//   td: { padding: "10px", borderBottom: "1px solid #eee" },
//   actionBtn: {
//     marginRight: "10px",
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   noResults: { padding: "20px", textAlign: "center" },
// };
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ================= FETCH USERS =================
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

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus =
        currentStatus === "Active" ? "Inactive" : "Active";

      await axios.put(`http://localhost:5000/api/users/${id}`, {
        status: updatedStatus,
      });

      fetchUsers();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // ================= DELETE USER =================
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
      ((u.fullName || u.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        (u.email || "")
          .toLowerCase()
          .includes(search.toLowerCase()))
  );

  return (
    <>
      <style>{`
        @media (max-width: 991px) {
          .ul-container { padding: 30px 20px !important; }
        }
        @media (max-width: 768px) {
          .ul-search { width: 100% !important; }
        }
      `}</style>
      <div style={styles.container} className="ul-container">
        <h1 style={styles.title}>User Management</h1>
        <p style={styles.subtitle}>
          Manage user accounts and permissions
        </p>

        <div style={styles.card}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
            className="ul-search"
          />

          <div style={{ width: "100%", overflowX: "auto" }} className="ul-table-wrap">
            <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>USER NAME</th>
              <th style={styles.th}>EMAIL</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} style={styles.row}>
                <td style={styles.td}>
                  <div style={styles.userBox}>
                    <div style={styles.avatar}>
                      {(u.fullName || u.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <span style={styles.userName}>
                      {u.fullName || u.name}
                    </span>
                  </div>
                </td>

                <td style={styles.td}>{u.email}</td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        u.status === "Active"
                          ? "rgba(129, 155, 139, 0.15)"
                          : "#FEE2E2",
                      color:
                        u.status === "Active"
                          ? "#627b68"
                          : "#991B1B",
                    }}
                  >
                    {u.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    onClick={() => toggleStatus(u._id, u.status)}
                    style={styles.toggleBtn}
                  >
                    {u.status === "Active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    style={styles.deleteBtn}
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
            <div style={styles.noUsers}>No users found</div>
          )}
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f9f6f1", // Brand Cream
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "5px",
    color: "#4c3324", // Brand Brown
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: "25px",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(76, 51, 36, 0.05)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
  },
  searchInput: {
    padding: "10px 14px",
    width: "320px",
    borderRadius: "8px",
    border: "1px solid rgba(228, 203, 182, 0.4)",
    marginBottom: "20px",
    outline: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerRow: {
    backgroundColor: "rgba(178, 132, 107, 0.05)", // Brand Tan light
  },
  th: {
    padding: "14px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4c3324", // Brand Brown
  },
  row: {
    borderBottom: "1px solid #F1F5F9",
  },
  td: {
    padding: "16px 14px",
    fontSize: "14px",
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#627b68", // Brand Sage Dark
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
  userName: {
    fontWeight: "600",
  },
  status: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "12px",
    color: "#627b68", // Brand Sage Dark
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    color: "#DC2626",
  },
  noUsers: {
    padding: "25px",
    textAlign: "center",
    color: "#9CA3AF",
  },
};