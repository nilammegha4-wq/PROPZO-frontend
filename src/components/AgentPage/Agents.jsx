<<<<<<< HEAD

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
=======
// import React from "react";

// /* =========================
//    AGENT DATA
// ========================= */
// const agents = [
//   { id: 1, name: "Rohit Sharma", role: "Senior Property Consultant", experience: "8+ Years", rating: 4.9, phone: "+919876543210", image: "Agent1.jpg" },
//   { id: 2, name: "Ananya Verma", role: "Luxury Real Estate Advisor", experience: "5+ Years", rating: 4.7, phone: "+919123456789", image: "Agent2.jpg" },
//   { id: 3, name: "Karan Mehta", role: "Luxury Property Expert", experience: "10+ Years", rating: 5.0, phone: "+919988776655", image: "Agent3.jpg" },
//   { id: 4, name: "Priya Singh", role: "Residential Specialist", experience: "7+ Years", rating: 4.8, phone: "+919876511223", image: "Agent4.jpg" },
//   { id: 5, name: "Amit Patel", role: "Investment Property Advisor", experience: "9+ Years", rating: 4.9, phone: "+919912345678", image: "Agent5.jpg" },
//   { id: 6, name: "Sneha Malhotra", role: "Luxury Villa Consultant", experience: "6+ Years", rating: 4.8, phone: "+919934567890", image: "Agent6.jpg" },
// ];

// /* =========================
//    MAIN PAGE
// ========================= */
// export default function Agents() {
//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h1 style={styles.heading}>Premium Property Advisors</h1>
//         <p style={styles.subHeading}>Trusted consultants for luxury homes & investments</p>
//       </div>

//       {/* Grid */}
//       <div style={styles.grid}>
//         {agents.map((agent) => (
//           <AgentCard key={agent.id} agent={agent} />
//         ))}
//       </div>

//       {/* Hover Animation */}
//       <style>{`
//         .lux-card:hover {
//           transform: translateY(-10px) scale(1.03);
//           box-shadow: 0 30px 60px rgba(56,189,248,0.25);
//           border: 1px solid rgba(56,189,248,0.7);
//         }

//         .lux-card:hover img {
//           transform: scale(1.1);
//         }
//       `}</style>
//     </div>
//   );
// }

// /* =========================
//    AGENT CARD
// ========================= */
// function AgentCard({ agent }) {
//   return (
//     <div className="lux-card" style={styles.card}>
//       <div style={styles.imageWrapper}>
//         <img src={agent.image} alt={agent.name} style={styles.image} />
//       </div>

//       <div style={styles.content}>
//         <h3 style={styles.name}>{agent.name}</h3>
//         <p style={styles.role}>{agent.role}</p>

//         <div style={styles.info}>
//           <span>🏆 {agent.experience}</span>
//           <span>⭐ {agent.rating}</span>
//         </div>

//         <div style={styles.actions}>
//           <a href={`tel:${agent.phone}`} style={styles.callBtn}>Call Now</a>
//           <a href={`https://wa.me/${agent.phone.replace("+", "")}`} target="_blank" rel="noreferrer" style={styles.whatsappBtn}>WhatsApp</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    STYLES
// ========================= */
// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #e0f7ff, #ffffff)",
//     padding: "80px 20px",
//     fontFamily: "Segoe UI, sans-serif",
//   },

//   header: { textAlign: "center", marginBottom: 70 },

//   heading: { fontSize: 42, fontWeight: 800, color: "#38bdf8", letterSpacing: "1px" },

//   subHeading: { color: "#64748b", marginTop: 12, fontSize: 16 },

//   grid: {
//     maxWidth: 1300,
//     margin: "0 auto",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: 45,
//   },

//   card: {
//     background: "rgba(255, 255, 255, 0.85)",
//     backdropFilter: "blur(15px)",
//     borderRadius: 30,
//     overflow: "hidden",
//     border: "1px solid rgba(56,189,248,0.3)",
//     transition: "0.5s ease",
//     cursor: "pointer",
//   },

//   imageWrapper: {
//     height: 300, // taller for all images
//     overflow: "hidden",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start", // head aligned to top
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     objectPosition: "top center", // focus on face
//     transition: "0.5s ease",
//   },

//   content: { padding: 28, textAlign: "center" },

//   name: { fontSize: 22, fontWeight: 700, color: "#0f172a" },

//   role: { fontSize: 14, color: "#38bdf8", marginBottom: 14 },

//   info: { display: "flex", justifyContent: "center", gap: 22, fontSize: 14, color: "#64748b", marginBottom: 24 },

//   actions: { display: "flex", justifyContent: "center", gap: 16 },

//   callBtn: {
//     textDecoration: "none",
//     padding: "11px 28px",
//     borderRadius: 30,
//     background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
//     color: "#ffffff",
//     fontWeight: 700,
//   },

//   whatsappBtn: {
//     textDecoration: "none",
//     padding: "11px 28px",
//     borderRadius: 30,
//     background: "transparent",
//     border: "1px solid #38bdf8",
//     color: "#38bdf8",
//     fontWeight: 700,
//   },
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaAward, FaStar } from "react-icons/fa";
import { getImageUrl } from "../../config";

/* =========================
   MAIN PAGE
 ========================= */
function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

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
          box-shadow: 0 40px 80px -15px rgba(0,0,0,0.1) !important;
        }

        .view-details-btn:hover {
          background: #627b68 !important;
          color: #fff !important;
          transform: scale(1.05);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* =========================
   AGENT CARD
 ========================= */
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

/* =========================
   STYLES
 ========================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f9f6f1", // Cream
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
    color: "#6b5e58",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "15px",
  },
  tagDot: { width: "6px", height: "6px", backgroundColor: "#819b8b", borderRadius: "50%" },
  heading: { 
    fontSize: "52px", 
    fontWeight: "700", 
    color: "#4c3324", 
    margin: "0", 
    letterSpacing: "-1.5px",
    lineHeight: "1.1"
  },
  subHeading: { 
    color: "#6b5e58", 
    marginTop: "20px", 
    fontSize: "18px", 
    fontWeight: "400",
    lineHeight: "1.6"
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
    background: "#ffffff",
    borderRadius: "45px", // Extra rounded as per design
    overflow: "hidden",
    boxShadow: "0 20px 50px -20px rgba(76, 51, 36, 0.08)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
    padding: "15px", // Inner padding for that container look
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
  name: { fontSize: "26px", fontWeight: "700", color: "#4c3324", margin: 0, letterSpacing: "-0.5px" },
  verifiedIcon: { color: "#22c55e", fontSize: "20px" },
  role: { fontSize: "15px", color: "#627b68", marginBottom: "20px", fontWeight: "400" },
  infoRow: {
    display: "flex",
    gap: "25px",
    marginBottom: "30px",
    color: "#4c3324",
    fontSize: "14px",
    fontWeight: "600",
  },
  infoItem: { display: "flex", alignItems: "center", gap: "8px" },
  infoIcon: { color: "#819b8b", fontSize: "14px" },
  buttonWrapper: { display: "flex", justifyContent: "flex-end" },
  viewDetailsBtn: {
    padding: "14px 32px",
    borderRadius: "25px",
    background: "#faf7f5",
    color: "#4c3324",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(76, 51, 36, 0.05)",
    border: "1px solid rgba(228, 203, 182, 0.2)",
  },
  loadingContainer: { padding: "100px", textAlign: "center", color: "#666" },
  spinner: { 
    width: "40px", 
    height: "40px", 
    border: "3px solid #faf7f5", 
    borderTop: "3px solid #627b68", 
    borderRadius: "50%", 
    margin: "0 auto 20px",
    animation: "spin 1s linear infinite" 
  },
  emptyState: { textAlign: "center", padding: "100px", color: "#888", fontSize: "18px" }
};

export default Agents;
>>>>>>> e85f1ae (nilam2)
