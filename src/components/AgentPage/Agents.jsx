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
// };
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../config";

/* =========================
   MAIN PAGE
========================= */
export default function Agents() {
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
        <h1 style={styles.heading}>Premium Property Advisors</h1>
        <p style={styles.subHeading}>
          Trusted consultants for luxury homes & investments
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading agents...</p>
      ) : agents.length === 0 ? (
        <p style={{ textAlign: "center" }}>No agents found.</p>
      ) : (
        <div style={styles.grid}>
          {agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   AGENT CARD
========================= */
function AgentCard({ agent }) {
  return (
    <div style={styles.card}>
      <div style={styles.imageWrapper}>
        <img
          src={getImageUrl(agent.image)}
          alt={agent.fullName}
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{agent.fullName}</h3>
        <p style={styles.role}>{agent.role}</p>

        <div style={styles.info}>
          <span>🏆 {agent.experience}</span>
          <span>⭐ {agent.rating}</span>
        </div>

        <div style={{ marginTop: "15px" }}>
          <Link to={`/agent-details/${agent._id}`} style={styles.viewDetailsBtn}>
            View Details
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
    background: "linear-gradient(135deg, #e0f7ff, #ffffff)",
    padding: "80px 20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: { textAlign: "center", marginBottom: 70 },
  heading: { fontSize: 42, fontWeight: 800, color: "#38bdf8" },
  subHeading: { color: "#64748b", marginTop: 12 },
  grid: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 45,
  },
  card: {
    background: "white",
    borderRadius: 20,
    overflow: "hidden",
    transition: "0.3s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  imageWrapper: {
    height: 300,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: { padding: 20, textAlign: "center" },
  name: { fontSize: 20, fontWeight: 700 },
  role: { fontSize: 14, color: "#38bdf8", marginBottom: 10 },
  info: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  actions: { display: "flex", justifyContent: "center", gap: 15 },
  callBtn: {
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: 20,
    background: "#38bdf8",
    color: "white",
  },
  whatsappBtn: {
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: 20,
    border: "1px solid #38bdf8",
    color: "#38bdf8",
  },
  viewDetailsBtn: {
    display: "block",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    background: "transparent",
    border: "1px solid #1e293b",
    color: "#1e293b",
    fontWeight: "600",
    transition: "all 0.3s",
  }
};