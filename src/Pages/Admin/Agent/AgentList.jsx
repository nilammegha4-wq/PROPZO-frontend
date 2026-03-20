import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const filteredAgents = agents.filter((agent) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      agent.fullName?.toLowerCase().includes(query) ||
      agent.email?.toLowerCase().includes(query) ||
      agent.role?.toLowerCase().includes(query) ||
      agent.phone?.toLowerCase().includes(query)
    );
  });

  const deleteAgent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/agents/${id}`);
      fetchAgents();
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

<<<<<<< HEAD
  const styles = {
    container: {
      padding: "40px 5%",
      background: "#f9f6f1", // Brand Cream
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "32px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "800",
      color: "#4c3324", // Brand Brown
      margin: 0,
      letterSpacing: "-0.5px",
    },
    addBtn: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "10px",
      background: "#627b68", // Brand Sage Dark
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      boxShadow: "0 4px 12px rgba(98, 123, 104, 0.25)",
      transition: "transform 0.2s",
    },
    tableContainer: {
      background: "#fff",
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid #e2e8f0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
    },
    th: {
      padding: "16px 24px",
      background: "rgba(178, 132, 107, 0.05)", // Brand Tan light
      color: "#4c3324",
      fontWeight: "700",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "1px solid rgba(228, 203, 182, 0.3)",
    },
    td: {
      padding: "20px 24px",
      borderBottom: "1px solid #f1f5f9",
      fontSize: "14px",
      color: "#334155",
      verticalAlign: "middle",
    },
    nameWrapper: {
      fontWeight: "600",
      color: "#4c3324",
    },
    emailText: {
      color: "#64748b",
      fontSize: "13px",
    },
    badge: (status) => ({
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      background: status === "active" ? "rgba(129, 155, 139, 0.15)" : "#fee2e2",
      color: status === "active" ? "#627b68" : "#b91c1c",
    }),
    editBtn: {
      padding: "8px 14px",
      marginRight: "8px",
      border: "1px solid rgba(228, 203, 182, 0.3)",
      borderRadius: "8px",
      background: "#fff",
      color: "#627b68",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      transition: "all 0.2s",
    },
    deleteBtn: {
      padding: "8px 14px",
      border: "1px solid #fee2e2",
      borderRadius: "8px",
      background: "#fff",
      color: "#ef4444",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      transition: "all 0.2s",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px",
      color: "#94a3b8",
      fontSize: "16px",
    }
=======
  const badgeStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "active")    return { bg: "#dde8e0", color: "#3a5c42" };
    if (s === "on leave")  return { bg: "#f0e8de", color: "#7a4f2e" };
    return                        { bg: "#e8ddd5", color: "#4C3324" }; // inactive / default
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
  };

  return (
    <>
      <style>{`
<<<<<<< HEAD
        @media (max-width: 991px) {
          .ag-container { padding: 30px 20px !important; }
        }
        @media (max-width: 768px) {
          .ag-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .ag-title { font-size: 24px !important; }
        }
      `}</style>
      <div style={styles.container} className="ag-container">
        <div style={styles.header} className="ag-header">
          <div>
            <h2 style={styles.title} className="ag-title">Agent Directory</h2>
            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
              Overview of all registered real estate agents.
            </p>
          </div>
          <button
            style={styles.addBtn}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            onClick={() => navigate("/admin/agent/add")}
          >
            + Add New Agent
          </button>
        </div>

        <div style={{ ...styles.tableContainer, overflowX: "auto" }} className="ag-table-wrapper">
          <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Contact Info</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <tr key={agent._id} style={{ transition: "background 0.2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={styles.td}>
                    <div style={styles.nameWrapper}>{agent.fullName}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: "500" }}>{agent.email}</div>
                    <div style={styles.emailText}>{agent.phone}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: "#475569", fontWeight: "500" }}>{agent.role || "Agent"}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge(agent.status || "active")}>
                      {agent.status || "Active"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.editBtn}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#627b68";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#627b68";
                      }}
                      onClick={() =>
                        navigate(`/admin/agent/edit/${agent._id}`)
                      }
                    >
                      Edit
                    </button>
=======
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700&display=swap');

        * { box-sizing: border-box; }
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610

        .ag-row:hover { background: #faf6f3 !important; }

        @media (max-width: 991px) {
          .ag-container { padding: 30px 20px !important; }
        }
        @media (max-width: 768px) {
          .ag-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .ag-title { font-size: 24px !important; }
        }
      `}</style>

      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.container} className="ag-container">
          {/* Header */}
          <div style={s.header} className="ag-header">
            <div>
              <p style={s.breadcrumb}>Admin / Agents</p>
              <h1 style={s.title} className="ag-title">Agent Directory</h1>
              <p style={s.subtitle}>Overview of all registered real estate agents.</p>
            </div>
            <button
              style={s.addBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#4C3324";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(76,51,36,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#627B68";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(98,123,104,0.35)";
              }}
              onClick={() => navigate("/admin/agent/add")}
            >
              + Add New Agent
            </button>
          </div>

          {/* Table */}
          <div style={s.tableContainer} className="ag-table-wrapper">
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Full Name</th>
                  <th style={s.th}>Contact Info</th>
                  <th style={s.th}>Role</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.length > 0 ? (
                  filteredAgents.map((agent) => {
                    const badge = badgeStyle(agent.status);
                    return (
                      <tr
                        key={agent._id}
                        className="ag-row"
                        style={{ transition: "background 0.18s", background: "transparent" }}
                      >
                        <td style={s.td}>
                          <div style={s.nameWrapper}>{agent.fullName}</div>
                        </td>
                        <td style={s.td}>
                          <div style={{ fontWeight: 500, color: "#3b2416" }}>{agent.email}</div>
                          <div style={s.secondaryText}>{agent.phone}</div>
                        </td>
                        <td style={s.td}>
                          <span style={s.roleText}>{agent.role || "Agent"}</span>
                        </td>
                        <td style={s.td}>
                          <span style={{
                            ...s.badge,
                            background: badge.bg,
                            color: badge.color,
                          }}>
                            {agent.status || "Active"}
                          </span>
                        </td>
                        <td style={s.td}>
                          <button
                            style={s.editBtn}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#627B68";
                              e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#eef2ee";
                              e.currentTarget.style.color = "#627B68";
                            }}
                            onClick={() => navigate(`/admin/agent/edit/${agent._id}`)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            style={s.deleteBtn}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#b85c3a";
                              e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#f9ede8";
                              e.currentTarget.style.color = "#b85c3a";
                            }}
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this agent?")) {
                                deleteAgent(agent._id);
                              }
                            }}
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={s.emptyState}>
                      <div style={{ fontSize: 40, marginBottom: 10 }}>👤</div>
                      {searchQuery ? "No agents match your search." : "No agents found. Start by adding one!"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </div>
=======
>>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    </>
  );
};

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
  container: {
    flex: 1,
    padding: "48px 52px",
    maxWidth: 1300,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
    margin: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: "6px 0 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 14,
    color: "#7a5c4a",
    margin: "6px 0 0",
  },
  addBtn: {
    background: "#627B68",
    color: "#fff",
    padding: "0 22px",
    height: 44,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.01em",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(98,123,104,0.35)",
  },
  tableContainer: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e8ddd5",
    boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "16px 24px",
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
    color: "#7a5c4a",
    fontWeight: 700,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e8ddd5",
    fontFamily: "'DM Sans', sans-serif",
  },
  td: {
    padding: "18px 24px",
    borderBottom: "1px solid #f0e8e0",
    fontSize: 14,
    color: "#4C3324",
    verticalAlign: "middle",
    fontFamily: "'DM Sans', sans-serif",
  },
  nameWrapper: {
    fontWeight: 600,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    fontSize: 15,
  },
  secondaryText: {
    color: "#7a5c4a",
    fontSize: 13,
    marginTop: 2,
  },
  roleText: {
    color: "#627B68",
    fontWeight: 500,
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  editBtn: {
    padding: "7px 14px",
    marginRight: 8,
    border: "1.5px solid #627B68",
    borderRadius: 8,
    background: "#eef2ee",
    color: "#627B68",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.18s",
    fontFamily: "'DM Sans', sans-serif",
  },
  deleteBtn: {
    padding: "7px 14px",
    border: "1.5px solid #b85c3a",
    borderRadius: 8,
    background: "#f9ede8",
    color: "#b85c3a",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.18s",
    fontFamily: "'DM Sans', sans-serif",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px",
    color: "#a89385",
    fontSize: 16,
  },
};

export default AgentList;
