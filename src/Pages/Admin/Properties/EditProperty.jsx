import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/agents");
        setAgents(res.data);
      } catch (err) {
        console.error("Failed to fetch agents", err);
      }
    };
    fetchAgents();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    address: "",
    propertyId: "",
    type: "",
    displayPrice: "",
    price: "",
    category: "Buy",
    agent: "",
    rentDuration: "",
    map: "",
    image: "",
    images: "",
    beds: "",
    baths: "",
    size: "",
    balconies: "",
    parking: "",
    floor: "",
    age: "",
    area: "",
    furnished: "",
    facing: "",
    availableFrom: "",
    description: "",
    amenities: "",
    owner: {
      name: "",
      phone: "",
      email: "",
      experience: "",
      rating: "",
      totalListings: "",
    },
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
      const data = res.data;
      setFormData({
        ...data,
        images: data.images ? data.images.join(", ") : "",
        amenities: data.amenities ? data.amenities.join(", ") : "",
        agent: data.agent?._id || data.agent || "",
        owner: data.owner || {
          name: "",
          phone: "",
          email: "",
          experience: "",
          rating: "",
          totalListings: "",
        }
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load property");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-set rentDuration when category changes
    if (name === "category") {
      let duration = "";
      if (value === "Rent") duration = "month";
      if (value === "PerRent") duration = "hour";

      setFormData((prev) => ({
        ...prev,
        category: value,
        rentDuration: duration,
      }));
      return;
    }

    if (name.startsWith("owner.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        owner: { ...prev.owner, [key]: value },
      }));
    }
  };

  const parseIndianPrice = (priceStr) => {
    if (!priceStr) return 0;
    let cleanStr = priceStr.toString().replace(/[₹,]/g, "").trim().toLowerCase();
    let multiplier = 1;
    if (cleanStr.includes("cr") || cleanStr.includes("crore")) {
      multiplier = 10000000;
      cleanStr = cleanStr.replace(/cr|crore/g, "").trim();
    } else if (cleanStr.includes("l") || cleanStr.includes("lakh")) {
      multiplier = 100000;
      cleanStr = cleanStr.replace(/l|lakh/g, "").trim();
    } else if (cleanStr.includes("k") || cleanStr.includes("thousand")) {
      multiplier = 1000;
      cleanStr = cleanStr.replace(/k|thousand/g, "").trim();
    }
    const numericValue = parseFloat(cleanStr);
    return isNaN(numericValue) ? 0 : numericValue * multiplier;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseIndianPrice(formData.price);
    const displayPrice = formData.price.includes(" ") || formData.price.toLowerCase().includes("cr") || formData.price.toLowerCase().includes("l") ? formData.price : `₹${Number(formData.price).toLocaleString('en-IN')}`;

    let finalData = {
      ...formData,
      price: parsedPrice,
      displayPrice: displayPrice,
      category: formData.category,
      propertyType: formData.category, // Standardize
      beds: Number(formData.beds) || 1,
      baths: Number(formData.baths) || 1,
      balconies: Number(formData.balconies) || 0,
      amenities: formData.amenities
        ? (typeof formData.amenities === 'string' ? formData.amenities.split(",").map((a) => a.trim()) : formData.amenities)
        : [],
      images: formData.images
        ? (typeof formData.images === 'string' ? formData.images.split(",").map((img) => img.trim()) : formData.images)
        : [],
      agent: formData.agent || null,
      // Send owner info as top-level fields (schema expects ObjectId for `owner`)
      sellerName: formData.owner?.name,
      phone: formData.owner?.phone,
      email: formData.owner?.email,
      owner: undefined, // Don't send nested owner object
    };

    try {
      const token = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/properties/${id}`, finalData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Property Updated Successfully ✅");
      navigate("/admin/properties");
    } catch (error) {
      console.log("Update Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed. Please check all required fields.");
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.page}>
        <div style={s.accentBar} />

        <div style={s.wrapper}>
          {/* Page Header */}
          <div style={s.pageHeader}>
            <div>
              <p style={s.breadcrumb}>Admin / Properties / Edit</p>
              <h1 style={s.pageTitle}>Edit Property</h1>
            </div>
            <button
              style={s.backBtn}
              onClick={() => navigate("/admin/properties")}
            >
              ← Back to Properties
            </button>
          </div>

          <form onSubmit={handleSubmit} style={s.form}>

            {/* Basic Info */}
            <Section title="Basic Information" icon="🏷️">
              <div style={s.grid2}>
                <Field label="Property Title *">
                  <input style={s.input} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Luxury 3BHK Apartment" required />
                </Field>
                <Field label="Location *">
                  <input style={s.input} name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Mumbai, Maharashtra" required />
                </Field>
                <Field label="Price (₹) *">
                  <input style={s.input} name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 5000000" required />
                </Field>
                <Field label="Category">
                  <select style={s.input} name="category" value={formData.category} onChange={handleChange}>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="PerRent">Per Rent</option>
                  </select>
                </Field>

                <Field label="Assign Agent">
                  <select style={s.input} name="agent" value={formData.agent} onChange={handleChange}>
                    <option value="">Select Agent</option>
                    {agents.map(agent => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name || agent.fullName || "Unnamed Agent"}
                      </option>
                    ))}
                  </select>
                </Field>

                {(formData.category === "Rent" || formData.category === "PerRent") && (
                  <Field label="Rent Duration">
                    <select style={s.input} name="rentDuration" value={formData.rentDuration} onChange={handleChange}>
                      {formData.category === "Rent" ? (
                        <option value="month">Month</option>
                      ) : (
                        <>
                          <option value="hour">Hour</option>
                          <option value="day">Day</option>
                          <option value="week">Week</option>
                        </>
                      )}
                    </select>
                  </Field>
                )}
              </div>
            </Section>

            {/* Images */}
            <Section title="Images" icon="🖼️">
              <div style={s.grid2}>
                <Field label="Main Image URL">
                  <input style={s.input} name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                </Field>
                <Field label="Additional Images">
                  <input style={s.input} name="images" value={formData.images} onChange={handleChange} placeholder="URL1, URL2, URL3 (comma separated)" />
                </Field>
              </div>
            </Section>

            {/* Buy Details */}
            {formData.category === "Buy" && (
              <Section title="Buy Details" icon="🏠">
                <div style={s.grid2}>
                  <Field label="Address">
                    <input style={s.input} name="address" value={formData.address} onChange={handleChange} placeholder="Full address" />
                  </Field>
                  <Field label="Property ID">
                    <input style={s.input} name="propertyId" value={formData.propertyId} onChange={handleChange} placeholder="e.g. PROP-001" />
                  </Field>
                  <Field label="Type">
                    <input style={s.input} name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Apartment, Villa" />
                  </Field>
                  <Field label="Display Price">
                    <input style={s.input} name="displayPrice" value={formData.displayPrice} onChange={handleChange} placeholder="e.g. ₹50 Lakh" />
                  </Field>
                  <Field label="Beds *">
                    <input style={s.input} name="beds" value={formData.beds} onChange={handleChange} placeholder="e.g. 3" required />
                  </Field>
                  <Field label="Baths *">
                    <input style={s.input} name="baths" value={formData.baths} onChange={handleChange} placeholder="e.g. 2" required />
                  </Field>
                  <Field label="Size">
                    <input style={s.input} name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 1200 sq.ft" />
                  </Field>
                  <Field label="Google Map URL">
                    <input style={s.input} name="map" value={formData.map} onChange={handleChange} placeholder="https://maps.google.com/..." />
                  </Field>
                </div>
              </Section>
            )}

            {/* Rent / PerRent Details */}
            {(formData.category === "Rent" || formData.category === "PerRent") && (
              <Section title="Property Details" icon="🏡">
                <div style={s.grid3}>
                  <Field label="Beds *">
                    <input style={s.input} name="beds" value={formData.beds} onChange={handleChange} placeholder="e.g. 2" required />
                  </Field>
                  <Field label="Baths *">
                    <input style={s.input} name="baths" value={formData.baths} onChange={handleChange} placeholder="e.g. 1" required />
                  </Field>
                  <Field label="Balconies">
                    <input style={s.input} name="balconies" value={formData.balconies} onChange={handleChange} placeholder="e.g. 1" />
                  </Field>
                  <Field label="Parking">
                    <input style={s.input} name="parking" value={formData.parking} onChange={handleChange} placeholder="e.g. 1 covered" />
                  </Field>
                  <Field label="Floor">
                    <input style={s.input} name="floor" value={formData.floor} onChange={handleChange} placeholder="e.g. 5th of 12" />
                  </Field>
                  <Field label="Property Age">
                    <input style={s.input} name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 3 years" />
                  </Field>
                  <Field label="Area">
                    <input style={s.input} name="area" value={formData.area} onChange={handleChange} placeholder="e.g. 950 sq.ft" />
                  </Field>
                  <Field label="Furnished Type">
                    <input style={s.input} name="furnished" value={formData.furnished} onChange={handleChange} placeholder="e.g. Semi-Furnished" />
                  </Field>
                  <Field label="Facing">
                    <input style={s.input} name="facing" value={formData.facing} onChange={handleChange} placeholder="e.g. East" />
                  </Field>
                  <Field label="Available From">
                    <input style={s.input} name="availableFrom" value={formData.availableFrom} onChange={handleChange} placeholder="e.g. 1st March 2025" />
                  </Field>
                </div>
              </Section>
            )}

            {/* Description & Amenities */}
            <Section title="Description & Amenities" icon="📋">
              <Field label="Description">
                <textarea
                  style={{ ...s.input, minHeight: 110, resize: "vertical", lineHeight: 1.6 }}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a detailed description of the property..."
                />
              </Field>
              <div style={{ marginTop: 16 }}>
                <Field label="Amenities">
                  <input style={s.input} name="amenities" value={formData.amenities} onChange={handleChange} placeholder="e.g. Gym, Pool, Security, Power Backup (comma separated)" />
                </Field>
              </div>
            </Section>

            {/* Admin Details */}
            {(formData.category === "Rent" || formData.category === "PerRent") && (
              <Section title="Admin Details" icon="👤">
                <div style={s.grid2}>
                  <Field label="Owner Name">
                    <input style={s.input} name="owner.name" value={formData.owner?.name || ""} onChange={handleChange} placeholder="e.g. Rajesh Sharma" />
                  </Field>
                  <Field label="Phone">
                    <input style={s.input} name="owner.phone" value={formData.owner?.phone || ""} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
                  </Field>
                  <Field label="Email">
                    <input style={s.input} name="owner.email" value={formData.owner?.email || ""} onChange={handleChange} placeholder="e.g. owner@email.com" />
                  </Field>
                  <Field label="Experience">
                    <input style={s.input} name="owner.experience" value={formData.owner?.experience || ""} onChange={handleChange} placeholder="e.g. 8 years" />
                  </Field>
                  <Field label="Rating">
                    <input style={s.input} name="owner.rating" value={formData.owner?.rating || ""} onChange={handleChange} placeholder="e.g. 4.5" />
                  </Field>
                  <Field label="Total Listings">
                    <input style={s.input} name="owner.totalListings" value={formData.owner?.totalListings || ""} onChange={handleChange} placeholder="e.g. 12" />
                  </Field>
                </div>
              </Section>
            )}

            {/* Submit */}
            <div style={s.submitRow}>
              <button
                type="button"
                style={s.cancelBtn}
                onClick={() => navigate("/admin/properties")}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={s.submitBtn}
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={s.section}>
      <div style={s.sectionHeader}>
        <span style={s.sectionIcon}>{icon}</span>
        <h3 style={s.sectionTitle}>{title}</h3>
      </div>
      <div style={s.sectionBody}>{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

  * { box-sizing: border-box; }

  input::placeholder, textarea::placeholder {
    color: #b0bec5;
    font-size: 13.5px;
  }
  input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: #627b68 !important;
    box-shadow: 0 0 0 3px rgba(98,123,104,0.1) !important;
  }
`;

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f9f6f1 0%, #ffffff 60%, #f4f1eb 100%)",
    fontFamily: "'DM Sans', sans-serif",
  },
  accentBar: {
    width: 5,
    background: "linear-gradient(180deg, #627b68 0%, #819b8b 100%)",
    flexShrink: 0,
  },
  wrapper: {
    flex: 1,
    maxWidth: 1000,
    margin: "0 auto",
    padding: "48px 40px",
    width: "100%",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 12,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#b2846b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#4c3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  backBtn: {
    padding: "9px 18px",
    borderRadius: 9,
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    color: "#64748b",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  section: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e8f0fe",
    boxShadow: "0 4px 16px rgba(15,23,42,0.05)",
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 24px",
    borderBottom: "1px solid #f1f5f9",
    background: "linear-gradient(90deg, #f8fbff, #fff)",
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#627b68",
    margin: 0,
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.01em",
  },
  sectionBody: {
    padding: "22px 24px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px 20px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px 20px",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "11px 14px",
    borderRadius: 9,
    border: "1.5px solid #e2e8f0",
    fontSize: 14,
    color: "#1e293b",
    background: "#fafcff",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.18s, box-shadow 0.18s",
    width: "100%",
  },
  submitRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 8,
  },
  cancelBtn: {
    padding: "12px 28px",
    borderRadius: 10,
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    color: "#64748b",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  submitBtn: {
    padding: "12px 36px",
    borderRadius: 10,
    border: "none",
    background: "#627b68",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(98,123,104,0.3)",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
  },
};
