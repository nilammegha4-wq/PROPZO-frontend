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

  const styles = {
    container: {
      padding: "40px 5%",
      background: "#f8fafc",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
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
      color: "#0f172a",
      margin: 0,
      letterSpacing: "-0.5px",
    },
    addBtn: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
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
      background: "#f1f5f9",
      color: "#64748b",
      fontWeight: "700",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "1px solid #e2e8f0",
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
      color: "#1e293b",
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
      background: status === "active" ? "#dcfce7" : "#fee2e2",
      color: status === "active" ? "#15803d" : "#b91c1c",
    }),
    editBtn: {
      padding: "8px 14px",
      marginRight: "8px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      background: "#fff",
      color: "#3b82f6",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Agent Directory</h2>
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

      <div style={styles.tableContainer}>
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
                        e.currentTarget.style.background = "#3b82f6";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#3b82f6";
                      }}
                      onClick={() =>
                        navigate(`/admin/agent/edit/${agent._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#ef4444";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#ef4444";
                      }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this agent?"
                          )
                        ) {
                          deleteAgent(agent._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.emptyState} colSpan="5">
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>👤</div>
                  {searchQuery ? "No agents match your search." : "No agents found. Start by adding one!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentList;