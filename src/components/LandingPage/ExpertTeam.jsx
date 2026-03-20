// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { getImageUrl } from '../../config';

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

//   .expert-section {
//     background-color: #000000;
//     padding: 100px 5%;
//     font-family: 'DM Sans', sans-serif;
//     color: #ffffff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .expert-container {
//     max-width: 1200px;
//     width: 100%;
//     display: grid;
//     grid-template-columns: 1.5fr 1fr;
//     gap: 60px;
//     align-items: center;
//   }

//   @media (max-width: 992px) {
//     .expert-container {
//       grid-template-columns: 1fr;
//       gap: 40px;
//     }

//     .expert-content {
//       order: -1; /* Move text above images on mobile */
//     }
//   }

//   /* Left: Cards */
//   .expert-cards-wrapper {
//     display: flex;
//     gap: 20px;
//     overflow-x: auto;
//     padding-bottom: 10px;
//     /* Hide scrollbar */
//     -ms-overflow-style: none;  
//     scrollbar-width: none;  
//   }
//   .expert-cards-wrapper::-webkit-scrollbar {
//     display: none;
//   }

//   .expert-card {
//     flex: 0 0 calc(33.333% - 14px);
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     min-width: 200px;
//   }

//   .expert-img-container {
//     width: 100%;
//     aspect-ratio: 3 / 4;
//     border-radius: 16px;
//     overflow: hidden;
//     background-color: #1a1a1a;
//   }

//   .expert-img-container img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   .expert-info {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//     padding-left: 4px;
//   }

//   .expert-name {
//     font-size: 16px;
//     font-weight: 500;
//     color: #ffffff;
//     letter-spacing: 0.01em;
//   }

//   .expert-role {
//     font-size: 13px;
//     color: #888888;
//     font-weight: 400;
//   }

//   /* Right: Content */
//   .expert-content {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//   }

//   .expert-heading {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: clamp(40px, 4vw, 56px);
//     font-weight: 400;
//     line-height: 1.1;
//     margin-bottom: 24px;
//     color: #ffffff;
//   }

//   .expert-desc {
//     font-size: 15px;
//     color: #a0a0a0;
//     line-height: 1.6;
//     margin-bottom: 32px;
//     font-weight: 300;
//     max-width: 400px;
//   }

//   .expert-btn {
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     padding: 12px 32px;
//     background-color: #ffffff;
//     color: #000000;
//     border-radius: 30px;
//     font-size: 14px;
//     font-weight: 500;
//     text-decoration: none;
//     transition: all 0.3s ease;
//     border: none;
//     cursor: pointer;
//   }

//   .expert-btn:hover {
//     background-color: #e0e0e0;
//     transform: translateY(-2px);
//   }
// `;

// export default function ExpertTeam() {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   const fetchAgents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/agents");
//       // Take only the first 3 agents for the homepage section
//       setAgents(res.data.slice(0, 3));
//     } catch (error) {
//       console.error("Error fetching agents:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <section className="expert-section">
//         <div className="expert-container">

//           {/* Left: Agent Cards */}
//           <div className="expert-cards-wrapper">
//             {loading ? (
//               <p>Loading experts...</p>
//             ) : agents.length === 0 ? (
//               <p>No experts found.</p>
//             ) : (
//               agents.map((agent) => (
//                 <div key={agent._id} className="expert-card">
//                   <div className="expert-img-container">
//                     <img src={getImageUrl(agent.image)} alt={agent.fullName} />
//                   </div>
//                   <div className="expert-info">
//                     <h4 className="expert-name">{agent.fullName}</h4>
//                     <span className="expert-role">{agent.role}</span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Right: Text Content */}
//           <div className="expert-content">
//             <h2 className="expert-heading">Meet Our Expert Team</h2>
//             <p className="expert-desc">
//               our team of experienced professionals is committed to helping you find the perfect home or investment property.
//             </p>
//             <Link to="/agent" className="expert-btn">View All</Link>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../config';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .expert-section {
    background-color: #4C3324;
    padding: 100px 5%;
    font-family: 'DM Sans', sans-serif;
    color: #E4CBB6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .expert-container {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 60px;
    align-items: center;
  }

  @media (max-width: 992px) {
    .expert-container {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .expert-content {
      order: -1;
    }
  }

  /* Left: Cards */
  .expert-cards-wrapper {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .expert-cards-wrapper::-webkit-scrollbar {
    display: none;
  }

  .expert-card {
    flex: 0 0 calc(33.333% - 14px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 200px;
  }

  .expert-img-container {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 16px;
    overflow: hidden;
    background-color: #3a2518;
  }

  .expert-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .expert-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 4px;
  }

  .expert-name {
    font-size: 16px;
    font-weight: 500;
    color: #E4CBB6;
    letter-spacing: 0.01em;
  }

  .expert-role {
    font-size: 13px;
    color: #819B8B;
    font-weight: 400;
  }

  /* Right: Content */
  .expert-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .expert-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 4vw, 56px);
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 24px;
    color: #F5EDE3;
  }

  .expert-desc {
    font-size: 15px;
    color: #C4A898;
    line-height: 1.6;
    margin-bottom: 32px;
    font-weight: 300;
    max-width: 400px;
  }

  .expert-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    background-color: #E4CBB6;
    color: #4C3324;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }

  .expert-btn:hover {
    background-color: #627B68;
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

export default function ExpertTeam() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <section className="expert-section">
        <div className="expert-container">

          {/* Left: Agent Cards */}
          <div className="expert-cards-wrapper">
            {loading ? (
              <p>Loading experts...</p>
            ) : agents.length === 0 ? (
              <p>No experts found.</p>
            ) : (
              agents.map((agent) => (
                <div key={agent._id} className="expert-card">
                  <div className="expert-img-container">
                    <img src={getImageUrl(agent.image)} alt={agent.fullName} />
                  </div>
                  <div className="expert-info">
                    <h4 className="expert-name">{agent.fullName}</h4>
                    <span className="expert-role">{agent.role}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Text Content */}
          <div className="expert-content">
            <h2 className="expert-heading">Meet Our Expert Team</h2>
            <p className="expert-desc">
              our team of experienced professionals is committed to helping you find the perfect home or investment property.
            </p>
            <Link to="/agent" className="expert-btn">View All</Link>
          </div>

        </div>
      </section>
    </>
  );
}
