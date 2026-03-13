
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaAward, FaStar } from "react-icons/fa";
import { getImageUrl } from "../../config";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAgents(); }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.tag}>
          <span style={styles.tagDot}></span> OUR TEAM
        </div>
        <h1 style={styles.heading}>Premium Property Advisors</h1>
        <p style={styles.subHeading}>
          Trusted consultants for luxury homes & investments
        </p>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Finding the right experts for you...</p>
        </div>
      ) : agents.length === 0 ? (
        <div style={styles.emptyState}>No agents found at the moment.</div>
      ) : (
        <div style={styles.grid}>
          {agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .agent-card-premium {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .agent-card-premium:hover {
          transform: translateY(-12px);
          box-shadow: 0 40px 80px -15px rgba(76,51,36,0.14) !important;
        }

        .view-details-btn:hover {
          background: #4C3324 !important;
          color: #E4CBB6 !important;
          transform: scale(1.05);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function AgentCard({ agent }) {
  return (
    <div className="agent-card-premium" style={styles.card}>
      <div style={styles.imageWrapper}>
        <img
          src={getImageUrl(agent.image)}
          alt={agent.fullName}
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <div style={styles.nameRow}>
          <h3 style={styles.name}>{agent.fullName}</h3>
          <FaCheckCircle style={styles.verifiedIcon} />
        </div>
        <p style={styles.role}>{agent.role || "Property Specialist"}</p>

        <div style={styles.infoRow}>
          <div style={styles.infoItem}>
            <FaAward style={styles.infoIcon} />
            <span>{agent.experience || "5+"} Years</span>
          </div>
          <div style={styles.infoItem}>
            <FaStar style={styles.infoIcon} />
            <span>{agent.rating || "4.8"}</span>
          </div>
        </div>

        <div style={styles.buttonWrapper}>
          <Link to={`/agent-details/${agent._id}`} className="view-details-btn" style={styles.viewDetailsBtn}>
            View Details +
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f0e8",
    padding: "100px 20px",
    fontFamily: "'Outfit', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: { textAlign: "center", marginBottom: 80, maxWidth: "700px" },
  tag: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#819B8B",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "15px",
  },
  tagDot: {
    width: "6px",
    height: "6px",
    backgroundColor: "#B2846B",
    borderRadius: "50%",
  },
  heading: {
    fontSize: "52px",
    fontWeight: "700",
    color: "#4C3324",
    margin: "0",
    letterSpacing: "-1.5px",
    lineHeight: "1.1",
  },
  subHeading: {
    color: "#7a5c4a",
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "1.6",
  },
  grid: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "40px",
  },
  card: {
    background: "#fffaf5",
    borderRadius: "45px",
    overflow: "hidden",
    boxShadow: "0 20px 50px -20px rgba(76,51,36,0.10)",
    border: "1px solid rgba(178,132,107,0.14)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    width: "100%",
    height: "380px",
    borderRadius: "35px",
    overflow: "hidden",
    marginBottom: "25px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
  },
  content: { padding: "0 15px 15px 15px", textAlign: "left" },
  nameRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" },
  name: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#4C3324",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  verifiedIcon: { color: "#627B68", fontSize: "20px" },
  role: { fontSize: "15px", color: "#9a7060", marginBottom: "20px", fontWeight: "400" },
  infoRow: {
    display: "flex",
    gap: "25px",
    marginBottom: "30px",
    color: "#7a5c4a",
    fontSize: "14px",
    fontWeight: "600",
  },
  infoItem: { display: "flex", alignItems: "center", gap: "8px" },
  infoIcon: { color: "#B2846B", fontSize: "14px" },
  buttonWrapper: { display: "flex", justifyContent: "flex-end" },
  viewDetailsBtn: {
    padding: "14px 32px",
    borderRadius: "25px",
    background: "rgba(178,132,107,0.12)",
    color: "#4C3324",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(76,51,36,0.06)",
    border: "1px solid rgba(178,132,107,0.20)",
  },
  loadingContainer: { padding: "100px", textAlign: "center", color: "#9a7060" },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(178,132,107,0.20)",
    borderTop: "3px solid #B2846B",
    borderRadius: "50%",
    margin: "0 auto 20px",
    animation: "spin 1s linear infinite",
  },
  emptyState: { textAlign: "center", padding: "100px", color: "#9a7060", fontSize: "18px" },
};

export default Agents;
