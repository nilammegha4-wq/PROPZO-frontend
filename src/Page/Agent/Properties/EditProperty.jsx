import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPropertyAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- Initial State ---
  const [property, setProperty] = useState({
    name: "",
    type: "",
    price: "",
    location: "",
    beds: "",
    baths: "",
    area: "",
    status: "Active",
  });

  // --- Effect to Load Data ---
  useEffect(() => {
    // In a real app, you would fetch from an API or LocalStorage
    // For this simulation, we pull from the same mock data source
    const savedProperties = JSON.parse(localStorage.getItem("propozo_properties")) || [
      { id: 1, name: "Villa Grande", type: "Villa", price: 9500000, location: "Mumbai", beds: 4, baths: 3, area: "3500 sqft", status: "Active" },
      { id: 2, name: "Skyline Apartment", type: "Apartment", price: 7200000, location: "Delhi", beds: 3, baths: 2, area: "1800 sqft", status: "Inactive" },
      { id: 3, name: "Beachfront Bungalow", type: "Bungalow", price: 15000000, location: "Goa", beds: 5, baths: 4, area: "5000 sqft", status: "Active" },
    ];

    const currentProperty = savedProperties.find((p) => p.id === Number(id));
    
    if (currentProperty) {
      setProperty(currentProperty);
    } else {
      alert("Property not found");
      navigate("/agentdashboard/properties");
    }
  }, [id, navigate]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = () => {
    // 1. Get existing properties
    const savedProperties = JSON.parse(localStorage.getItem("propozo_properties")) || [];
    
    // 2. Map through and update the specific property
    const updatedList = savedProperties.map((p) => 
      p.id === Number(id) ? { ...property, price: Number(property.price) } : p
    );

    // 3. Save back to LocalStorage (Persisting the change)
    localStorage.setItem("propozo_properties", JSON.stringify(updatedList));

    alert(`Property "${property.name}" updated successfully!`);
    navigate("/agentdashboard/properties");
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .btn-update:hover { background: #2563eb !important; transform: translateY(-2px); }
        .btn-cancel:hover { background: #f1f5f9 !important; }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>Edit Property</h1>
        <p style={{ color: "#64748b", marginTop: "4px" }}>Modify the details for {property.name || "Property"}</p>
      </div>

      <div style={styles.formGrid}>
        <div className="input-group">
          <label className="input-label">Property Name</label>
          <input type="text" name="name" value={property.name} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Type</label>
          <input type="text" name="type" value={property.type} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Price (INR)</label>
          <input type="number" name="price" value={property.price} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Location</label>
          <input type="text" name="location" value={property.location} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Bedrooms</label>
          <input type="number" name="beds" value={property.beds} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Bathrooms</label>
          <input type="number" name="baths" value={property.baths} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Area Size</label>
          <input type="text" name="area" value={property.area} onChange={handleChange} style={styles.input} />
        </div>

        <div className="input-group">
          <label className="input-label">Listing Status</label>
          <select name="status" value={property.status} onChange={handleChange} style={styles.input}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button 
          className="btn-cancel" 
          style={styles.cancelButton} 
          onClick={() => navigate("/agentdashboard/properties")}
        >
          Cancel
        </button>
        <button 
          className="btn-update" 
          style={styles.submitButton} 
          onClick={handleSubmit}
        >
          Update Property
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "60px auto",
    padding: "40px",
    background: "#fff",
    borderRadius: "28px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  header: { borderBottom: "1px solid #f1f5f9", paddingBottom: "20px" },
  title: { fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-1px" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    fontWeight: "500",
    outline: "none",
    background: "#fcfdfe",
  },
  buttonGroup: { display: "flex", gap: "16px", marginTop: "20px" },
  submitButton: {
    flex: 2,
    padding: "18px",
    borderRadius: "16px",
    background: "#3b82f6",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  cancelButton: {
    flex: 1,
    padding: "18px",
    borderRadius: "16px",
    background: "#fff",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "16px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default EditPropertyAgent;