import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- State for Client Data ---
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    status: "Active",
  });

  // --- Load Client Data on Mount ---
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem("propozo_clients")) || [];
    const currentClient = savedClients.find((c) => c.id === Number(id));

    if (currentClient) {
      setClient(currentClient);
    } else {
      alert("Client not found in directory.");
      navigate("/clients");
    }
  }, [id, navigate]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const savedClients = JSON.parse(localStorage.getItem("propozo_clients")) || [];
    
    // Map through the list and update the matching ID
    const updatedList = savedClients.map((c) =>
      c.id === Number(id) ? { ...client } : c
    );

    localStorage.setItem("propozo_clients", JSON.stringify(updatedList));
    alert(`Client "${client.name}" updated successfully!`);
    navigate("/clients");
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }

        .form-card {
          background: #ffffff;
          border-radius: 32px;
          padding: 40px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          width: 100%;
          max-width: 600px;
        }

        .input-field {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          font-weight: 500;
          outline: none;
          background: #fcfdfe;
          transition: border-color 0.2s;
        }

        .input-field:focus {
          border-color: #3b82f6;
        }

        .btn-update {
          background: #2563eb;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-update:hover {
          background: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        }
      `}</style>

      <div className="form-card">
        <header style={styles.header}>
          <h1 style={styles.title}>Edit Client Profile</h1>
          <p style={styles.subtitle}>Update contact information and lead status for {client.name}</p>
        </header>

        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              value={client.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={client.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phone"
              className="input-field"
              value={client.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Interested In</label>
            <input
              type="text"
              name="interest"
              className="input-field"
              value={client.interest}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Pipeline Status</label>
            <select
              name="status"
              className="input-field"
              value={client.status}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            >
              <option value="Active">Active</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate("/clients")}
              style={styles.cancelBtn}
            >
              Discard Changes
            </button>
            <button type="submit" className="btn-update" style={{ flex: 2 }}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
  header: { marginBottom: "32px", textAlign: "center" },
  title: { fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-1px" },
  subtitle: { fontSize: "14px", color: "#64748b", marginTop: "8px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" },
  buttonGroup: { display: "flex", gap: "16px", marginTop: "12px" },
  cancelBtn: { flex: 1, padding: "16px", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontWeight: "700", cursor: "pointer" },
};

export default EditClient;