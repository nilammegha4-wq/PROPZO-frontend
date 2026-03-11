import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPropertyAgent = () => {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    category: "Buy",
    rentDuration: "",
    type: "Apartment",
    price: "",
    location: "",
    address: "",
    city: "",
    beds: "",
    baths: "",
    size: "",
    area: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!property.title || !property.category || !property.price || !property.location) {
        alert("Please fill all required fields!");
        return;
      }

      const agentAuthStr = localStorage.getItem("agentAuth");
      if (!agentAuthStr) {
        alert("You must be logged in as an Agent");
        navigate("/agent/login");
        return;
      }
      const agent = JSON.parse(agentAuthStr);

      const payload = {
        ...property,
        agentId: agent._id,
      };

      await axios.post("http://localhost:5000/api/properties", payload);
      alert(`Property "${property.title}" added successfully!`);
      navigate("/agentdashboard/properties");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add property");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add New Property</h1>

      <div style={styles.formGrid}>
        <input type="text" name="title" placeholder="Property Title" value={property.title} onChange={handleChange} style={styles.input} />

        <select name="category" value={property.category} onChange={handleChange} style={styles.input}>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
          <option value="PerRent">PerRent</option>
        </select>

        {property.category !== "Buy" && (
          <select name="rentDuration" value={property.rentDuration} onChange={handleChange} style={styles.input}>
            <option value="">Select Duration</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        )}

        <input type="text" name="type" placeholder="Property Type (e.g., Apartment)" value={property.type} onChange={handleChange} style={styles.input} />
        <input type="number" name="price" placeholder="Price (INR)" value={property.price} onChange={handleChange} style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={property.location} onChange={handleChange} style={styles.input} />
        <input type="text" name="address" placeholder="Detailed Address" value={property.address} onChange={handleChange} style={styles.input} />
        <input type="text" name="city" placeholder="City" value={property.city} onChange={handleChange} style={styles.input} />
        <input type="number" name="beds" placeholder="Beds" value={property.beds} onChange={handleChange} style={styles.input} />
        <input type="number" name="baths" placeholder="Baths" value={property.baths} onChange={handleChange} style={styles.input} />
        <input type="text" name="size" placeholder="Size (e.g. 3 BHK)" value={property.size} onChange={handleChange} style={styles.input} />
        <input type="text" name="area" placeholder="Area (e.g. 2000 sqft)" value={property.area} onChange={handleChange} style={styles.input} />
        <select name="status" value={property.status} onChange={handleChange} style={styles.input}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button className="btn-action" style={styles.submitButton} onClick={handleSubmit}>
        Add Property
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "32px",
    background: "#fff",
    borderRadius: "24px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  title: { fontSize: "28px", fontWeight: "700", color: "#0f172a" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    background: "#3b82f6",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default AddPropertyAgent;
