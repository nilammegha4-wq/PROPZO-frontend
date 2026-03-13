// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AddProperty() {
//   const navigate = useNavigate();
//   const [agents, setAgents] = useState([]);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/agents");
//         setAgents(res.data);
//       } catch (err) {
//         console.error("Failed to fetch agents", err);
//       }
//     };
//     fetchAgents();
//   }, []);

//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     address: "",
//     propertyId: "",
//     type: "",
//     displayPrice: "",
//     price: "",
//     category: "Buy",
//     agent: "",
//     rentDuration: "",
//     map: "",
//     image: "",
//     images: "",
//     beds: "",
//     baths: "",
//     size: "",
//     balconies: "",
//     parking: "",
//     floor: "",
//     age: "",
//     area: "",
//     furnished: "",
//     facing: "",
//     availableFrom: "",
//     description: "",
//     amenities: "",
//     owner: {
//       name: "",
//       phone: "",
//       email: "",
//       experience: "",
//       rating: "",
//       totalListings: "",
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Auto-set rentDuration when category changes
//     if (name === "category") {
//       let duration = "";
//       if (value === "Rent") duration = "month";
//       if (value === "PerRent") duration = "hour";

//       setFormData((prev) => ({
//         ...prev,
//         category: value,
//         rentDuration: duration,
//       }));
//       return;
//     }

//     if (name.startsWith("owner.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         owner: { ...prev.owner, [key]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Map frontend fields back to standardized backend fields
//     let finalData = {
//       title: formData.title,
//       location: formData.location,
//       price: Number(formData.price) || 0,
//       category: formData.category,
//       propertyType: formData.category, // Standardize with Property model enum
//       description: formData.description,
//       image: formData.image,
//       images: formData.images
//         ? formData.images.split(",").map((img) => img.trim())
//         : [],
//       amenities: formData.amenities
//         ? formData.amenities.split(",").map((a) => a.trim())
//         : [],
//       agent: formData.agent || null,

//       // Default beds/baths to 1 if empty to satisfy required Number constraint in schema
//       beds: Number(formData.beds) || 1,
//       baths: Number(formData.baths) || 1,
//     };

//     if (formData.category === "Buy") {
//       finalData = {
//         ...finalData,
//         address: formData.address,
//         propertyId: formData.propertyId,
//         type: formData.type || "Apartment",
//         displayPrice: formData.displayPrice,
//         size: formData.size,
//         map: formData.map,
//       };
//     }

//     if (formData.category === "Rent" || formData.category === "PerRent") {
//       finalData = {
//         ...finalData,
//         rentDuration: formData.rentDuration || (formData.category === "Rent" ? "month" : "hour"),
//         balconies: Number(formData.balconies) || 0,
//         parking: formData.parking,
//         floor: formData.floor,
//         age: formData.age,
//         area: formData.area,
//         furnished: formData.furnished,
//         facing: formData.facing,
//         availableFrom: formData.availableFrom,
//         owner: {
//           name: formData.owner.name,
//           phone: formData.owner.phone,
//           email: formData.owner.email,
//           experience: formData.owner.experience,
//           rating: Number(formData.owner.rating) || 0,
//           totalListings: Number(formData.owner.totalListings) || 0,
//         },
//       };
//     }

//     try {
//       const token = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
//       const res = await axios.post("http://localhost:5000/api/properties", finalData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       alert("Property Added Successfully ✅");
//       navigate("/admin/properties");
//     } catch (error) {
//       console.log("Submission Error:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Something went wrong. Please check all required fields.");
//     }
//   };

//   return (
//     <>
//       <style>{globalStyles}</style>
//       <div style={s.page}>
//         <div style={s.accentBar} />

//         <div style={s.wrapper}>
//           {/* Page Header */}
//           <div style={s.pageHeader}>
//             <div>
//               <p style={s.breadcrumb}>Admin / Properties / New</p>
//               <h1 style={s.pageTitle}>Add Property</h1>
//             </div>
//             <button
//               style={s.backBtn}
//               onClick={() => navigate("/admin/properties")}
//             >
//               ← Back to Properties
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} style={s.form}>

//             {/* Basic Info */}
//             <Section title="Basic Information" icon="🏷️">
//               <div style={s.grid2}>
//                 <Field label="Property Title *">
//                   <input style={s.input} name="title" value={formData.title} placeholder="e.g. Luxury 3BHK Apartment" onChange={handleChange} required />
//                 </Field>
//                 <Field label="Location *">
//                   <input style={s.input} name="location" value={formData.location} placeholder="e.g. Mumbai, Maharashtra" onChange={handleChange} required />
//                 </Field>
//                 <Field label="Price (₹) *">
//                   <input style={s.input} name="price" value={formData.price} placeholder="e.g. 5000000" onChange={handleChange} required />
//                 </Field>
//                 <Field label="Category">
//                   <select style={s.input} name="category" value={formData.category} onChange={handleChange}>
//                     <option value="Buy">Buy</option>
//                     <option value="Rent">Rent</option>
//                     <option value="PerRent">Per Rent</option>
//                   </select>
//                 </Field>

//                 {formData.category === "Rent" && (
//                   <Field label="Rent Duration">
//                     <select style={s.input} name="rentDuration" value={formData.rentDuration} onChange={handleChange}>
//                       <option value="month">Month</option>
//                     </select>
//                   </Field>
//                 )}

//                 {formData.category === "PerRent" && (
//                   <Field label="Rent Duration">
//                     <select style={s.input} name="rentDuration" value={formData.rentDuration} onChange={handleChange}>
//                       <option value="hour">Hour</option>
//                       <option value="day">Day</option>
//                       <option value="week">Week</option>
//                     </select>
//                   </Field>
//                 )}

//                 <Field label="Assign Agent">
//                   <select style={s.input} name="agent" value={formData.agent} onChange={handleChange}>
//                     <option value="">Select Agent</option>
//                     {agents.map(agent => (
//                       <option key={agent._id} value={agent._id}>
//                         {agent.name || agent.fullName || "Unnamed Agent"}
//                       </option>
//                     ))}
//                   </select>
//                 </Field>
//               </div>
//             </Section>

//             {/* Images */}
//             <Section title="Images" icon="🖼️">
//               <div style={s.grid2}>
//                 <Field label="Main Image URL">
//                   <input style={s.input} name="image" value={formData.image} placeholder="https://example.com/image.jpg" onChange={handleChange} />
//                 </Field>
//                 <Field label="Additional Images">
//                   <input style={s.input} name="images" value={formData.images} placeholder="URL1, URL2, URL3 (comma separated)" onChange={handleChange} />
//                 </Field>
//               </div>
//             </Section>

//             {/* Buy Details */}
//             {formData.category === "Buy" && (
//               <Section title="Buy Details" icon="🏠">
//                 <div style={s.grid2}>
//                   <Field label="Address">
//                     <input style={s.input} name="address" value={formData.address} placeholder="Full address" onChange={handleChange} />
//                   </Field>
//                   <Field label="Property ID">
//                     <input style={s.input} name="propertyId" value={formData.propertyId} placeholder="e.g. PROP-001" onChange={handleChange} />
//                   </Field>
//                   <Field label="Type">
//                     <input style={s.input} name="type" value={formData.type} placeholder="e.g. Apartment, Villa" onChange={handleChange} />
//                   </Field>
//                   <Field label="Display Price">
//                     <input style={s.input} name="displayPrice" value={formData.displayPrice} placeholder="e.g. ₹50 Lakh" onChange={handleChange} />
//                   </Field>
//                   <Field label="Beds *">
//                     <input style={s.input} name="beds" value={formData.beds} placeholder="e.g. 3" onChange={handleChange} required />
//                   </Field>
//                   <Field label="Baths *">
//                     <input style={s.input} name="baths" value={formData.baths} placeholder="e.g. 2" onChange={handleChange} required />
//                   </Field>
//                   <Field label="Size">
//                     <input style={s.input} name="size" value={formData.size} placeholder="e.g. 1200 sq.ft" onChange={handleChange} />
//                   </Field>
//                   <Field label="Google Map URL">
//                     <input style={s.input} name="map" value={formData.map} placeholder="https://maps.google.com/..." onChange={handleChange} />
//                   </Field>
//                 </div>
//               </Section>
//             )}

//             {/* Rent / PerRent Details */}
//             {(formData.category === "Rent" || formData.category === "PerRent") && (
//               <Section title="Property Details" icon="🏡">
//                 <div style={s.grid3}>
//                   <Field label="Beds *">
//                     <input style={s.input} name="beds" value={formData.beds} placeholder="e.g. 2" onChange={handleChange} required />
//                   </Field>
//                   <Field label="Baths *">
//                     <input style={s.input} name="baths" value={formData.baths} placeholder="e.g. 1" onChange={handleChange} required />
//                   </Field>
//                   <Field label="Balconies">
//                     <input style={s.input} name="balconies" value={formData.balconies} placeholder="e.g. 1" onChange={handleChange} />
//                   </Field>
//                   <Field label="Parking">
//                     <input style={s.input} name="parking" value={formData.parking} placeholder="e.g. 1 covered" onChange={handleChange} />
//                   </Field>
//                   <Field label="Floor">
//                     <input style={s.input} name="floor" value={formData.floor} placeholder="e.g. 5th of 12" onChange={handleChange} />
//                   </Field>
//                   <Field label="Property Age">
//                     <input style={s.input} name="age" value={formData.age} placeholder="e.g. 3 years" onChange={handleChange} />
//                   </Field>
//                   <Field label="Area">
//                     <input style={s.input} name="area" value={formData.area} placeholder="e.g. 950 sq.ft" onChange={handleChange} />
//                   </Field>
//                   <Field label="Furnished Type">
//                     <input style={s.input} name="furnished" value={formData.furnished} placeholder="e.g. Semi-Furnished" onChange={handleChange} />
//                   </Field>
//                   <Field label="Facing">
//                     <input style={s.input} name="facing" value={formData.facing} placeholder="e.g. East" onChange={handleChange} />
//                   </Field>
//                   <Field label="Available From">
//                     <input style={s.input} name="availableFrom" value={formData.availableFrom} placeholder="e.g. 1st March 2025" onChange={handleChange} />
//                   </Field>
//                 </div>
//               </Section>
//             )}

//             {/* Description & Amenities */}
//             <Section title="Description & Amenities" icon="📋">
//               <Field label="Description">
//                 <textarea
//                   style={{ ...s.input, minHeight: 110, resize: "vertical", lineHeight: 1.6 }}
//                   name="description"
//                   value={formData.description}
//                   placeholder="Write a detailed description of the property..."
//                   onChange={handleChange}
//                 />
//               </Field>
//               <div style={{ marginTop: 16 }}>
//                 <Field label="Amenities">
//                   <input style={s.input} name="amenities" value={formData.amenities} placeholder="e.g. Gym, Pool, Security, Power Backup (comma separated)" onChange={handleChange} />
//                 </Field>
//               </div>
//             </Section>

//             {/* Admin Details */}
//             {(formData.category === "Rent" || formData.category === "PerRent") && (
//               <Section title="Admin Details" icon="👤">
//                 <div style={s.grid2}>
//                   <Field label="Owner Name">
//                     <input style={s.input} name="owner.name" value={formData.owner.name} placeholder="e.g. Rajesh Sharma" onChange={handleChange} />
//                   </Field>
//                   <Field label="Phone">
//                     <input style={s.input} name="owner.phone" value={formData.owner.phone} placeholder="e.g. +91 98765 43210" onChange={handleChange} />
//                   </Field>
//                   <Field label="Email">
//                     <input style={s.input} name="owner.email" value={formData.owner.email} placeholder="e.g. owner@email.com" onChange={handleChange} />
//                   </Field>
//                   <Field label="Experience">
//                     <input style={s.input} name="owner.experience" value={formData.owner.experience} placeholder="e.g. 8 years" onChange={handleChange} />
//                   </Field>
//                   <Field label="Rating">
//                     <input style={s.input} name="owner.rating" value={formData.owner.rating} placeholder="e.g. 4.5" onChange={handleChange} />
//                   </Field>
//                   <Field label="Total Listings">
//                     <input style={s.input} name="owner.totalListings" value={formData.owner.totalListings} placeholder="e.g. 12" onChange={handleChange} />
//                   </Field>
//                 </div>
//               </Section>
//             )}

//             {/* Submit */}
//             <div style={s.submitRow}>
//               <button
//                 type="button"
//                 style={s.cancelBtn}
//                 onClick={() => navigate("/admin/properties")}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 style={s.submitBtn}
//               >
//                 + Add Property
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// function Section({ title, icon, children }) {
//   return (
//     <div style={s.section}>
//       <div style={s.sectionHeader}>
//         <span style={s.sectionIcon}>{icon}</span>
//         <h3 style={s.sectionTitle}>{title}</h3>
//       </div>
//       <div style={s.sectionBody}>{children}</div>
//     </div>
//   );
// }

// function Field({ label, children }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//       <label style={s.label}>{label}</label>
//       {children}
//     </div>
//   );
// }

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

//   * { box-sizing: border-box; }

//   input::placeholder, textarea::placeholder {
//     color: #b0bec5;
//     font-size: 13.5px;
//   }
//   input:focus, textarea:focus, select:focus {
//     outline: none !important;
//     border-color: #2563eb !important;
//     box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
//   }
// `;

// const s = {
//   page: {
//     display: "flex",
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #eff6ff 100%)",
//     fontFamily: "'DM Sans', sans-serif",
//   },
//   accentBar: {
//     width: 5,
//     background: "linear-gradient(180deg, #2563eb 0%, #60a5fa 100%)",
//     flexShrink: 0,
//   },
//   wrapper: {
//     flex: 1,
//     maxWidth: 1000,
//     margin: "0 auto",
//     padding: "48px 40px",
//     width: "100%",
//   },
//   pageHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginBottom: 36,
//     flexWrap: "wrap",
//     gap: 12,
//   },
//   breadcrumb: {
//     fontSize: 12,
//     color: "#93c5fd",
//     letterSpacing: "0.08em",
//     textTransform: "uppercase",
//     fontWeight: 600,
//     marginBottom: 6,
//   },
//   pageTitle: {
//     fontSize: 32,
//     fontWeight: 700,
//     color: "#0f172a",
//     fontFamily: "'Sora', sans-serif",
//     margin: 0,
//     letterSpacing: "-0.5px",
//   },
//   backBtn: {
//     padding: "9px 18px",
//     borderRadius: 9,
//     border: "1.5px solid #e2e8f0",
//     background: "#fff",
//     color: "#64748b",
//     fontSize: 14,
//     fontWeight: 500,
//     cursor: "pointer",
//     fontFamily: "'DM Sans', sans-serif",
//     transition: "all 0.18s",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
//   section: {
//     background: "#ffffff",
//     borderRadius: 16,
//     border: "1px solid #e8f0fe",
//     boxShadow: "0 4px 16px rgba(15,23,42,0.05)",
//     overflow: "hidden",
//   },
//   sectionHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     padding: "16px 24px",
//     borderBottom: "1px solid #f1f5f9",
//     background: "linear-gradient(90deg, #f8fbff, #fff)",
//   },
//   sectionIcon: {
//     fontSize: 18,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: 600,
//     color: "#1e3a8a",
//     margin: 0,
//     fontFamily: "'Sora', sans-serif",
//     letterSpacing: "0.01em",
//   },
//   sectionBody: {
//     padding: "22px 24px",
//   },
//   grid2: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "16px 20px",
//   },
//   grid3: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "16px 20px",
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: 600,
//     color: "#374151",
//     letterSpacing: "0.02em",
//   },
//   input: {
//     padding: "11px 14px",
//     borderRadius: 9,
//     border: "1.5px solid #e2e8f0",
//     fontSize: 14,
//     color: "#1e293b",
//     background: "#fafcff",
//     fontFamily: "'DM Sans', sans-serif",
//     transition: "border-color 0.18s, box-shadow 0.18s",
//     width: "100%",
//   },
//   submitRow: {
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: 12,
//     paddingTop: 8,
//   },
//   cancelBtn: {
//     padding: "12px 28px",
//     borderRadius: 10,
//     border: "1.5px solid #e2e8f0",
//     background: "#fff",
//     color: "#64748b",
//     fontSize: 15,
//     fontWeight: 500,
//     cursor: "pointer",
//     fontFamily: "'DM Sans', sans-serif",
//   },
//   submitBtn: {
//     padding: "12px 36px",
//     borderRadius: 10,
//     border: "none",
//     background: "#2563eb",
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: 600,
//     cursor: "pointer",
//     fontFamily: "'DM Sans', sans-serif",
//     boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
//     transition: "all 0.2s ease",
//     letterSpacing: "0.01em",
//   },
// };


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalData = {
      title: formData.title,
      location: formData.location,
      price: Number(formData.price) || 0,
      category: formData.category,
      propertyType: formData.category,
      description: formData.description,
      image: formData.image,
      images: formData.images
        ? formData.images.split(",").map((img) => img.trim())
        : [],
      amenities: formData.amenities
        ? formData.amenities.split(",").map((a) => a.trim())
        : [],
      agent: formData.agent || null,
      beds: Number(formData.beds) || 1,
      baths: Number(formData.baths) || 1,
    };

    if (formData.category === "Buy") {
      finalData = {
        ...finalData,
        address: formData.address,
        propertyId: formData.propertyId,
        type: formData.type || "Apartment",
        displayPrice: formData.displayPrice,
        size: formData.size,
        map: formData.map,
      };
    }

    if (formData.category === "Rent" || formData.category === "PerRent") {
      finalData = {
        ...finalData,
        rentDuration: formData.rentDuration || (formData.category === "Rent" ? "month" : "hour"),
        balconies: Number(formData.balconies) || 0,
        parking: formData.parking,
        floor: formData.floor,
        age: formData.age,
        area: formData.area,
        furnished: formData.furnished,
        facing: formData.facing,
        availableFrom: formData.availableFrom,
        owner: {
          name: formData.owner.name,
          phone: formData.owner.phone,
          email: formData.owner.email,
          experience: formData.owner.experience,
          rating: Number(formData.owner.rating) || 0,
          totalListings: Number(formData.owner.totalListings) || 0,
        },
      };
    }

    try {
      const token = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/properties", finalData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Property Added Successfully ✅");
      navigate("/admin/properties");
    } catch (error) {
      console.log("Submission Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong. Please check all required fields.");
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
              <p style={s.breadcrumb}>Admin / Properties / New</p>
              <h1 style={s.pageTitle}>Add Property</h1>
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
                  <input style={s.input} name="title" value={formData.title} placeholder="e.g. Luxury 3BHK Apartment" onChange={handleChange} required />
                </Field>
                <Field label="Location *">
                  <input style={s.input} name="location" value={formData.location} placeholder="e.g. Mumbai, Maharashtra" onChange={handleChange} required />
                </Field>
                <Field label="Price (₹) *">
                  <input style={s.input} name="price" value={formData.price} placeholder="e.g. 5000000" onChange={handleChange} required />
                </Field>
                <Field label="Category">
                  <select style={s.input} name="category" value={formData.category} onChange={handleChange}>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="PerRent">Per Rent</option>
                  </select>
                </Field>

                {formData.category === "Rent" && (
                  <Field label="Rent Duration">
                    <select style={s.input} name="rentDuration" value={formData.rentDuration} onChange={handleChange}>
                      <option value="month">Month</option>
                    </select>
                  </Field>
                )}

                {formData.category === "PerRent" && (
                  <Field label="Rent Duration">
                    <select style={s.input} name="rentDuration" value={formData.rentDuration} onChange={handleChange}>
                      <option value="hour">Hour</option>
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                    </select>
                  </Field>
                )}

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
              </div>
            </Section>

            {/* Images */}
            <Section title="Images" icon="🖼️">
              <div style={s.grid2}>
                <Field label="Main Image URL">
                  <input style={s.input} name="image" value={formData.image} placeholder="https://example.com/image.jpg" onChange={handleChange} />
                </Field>
                <Field label="Additional Images">
                  <input style={s.input} name="images" value={formData.images} placeholder="URL1, URL2, URL3 (comma separated)" onChange={handleChange} />
                </Field>
              </div>
            </Section>

            {/* Buy Details */}
            {formData.category === "Buy" && (
              <Section title="Buy Details" icon="🏠">
                <div style={s.grid2}>
                  <Field label="Address">
                    <input style={s.input} name="address" value={formData.address} placeholder="Full address" onChange={handleChange} />
                  </Field>
                  <Field label="Property ID">
                    <input style={s.input} name="propertyId" value={formData.propertyId} placeholder="e.g. PROP-001" onChange={handleChange} />
                  </Field>
                  <Field label="Type">
                    <input style={s.input} name="type" value={formData.type} placeholder="e.g. Apartment, Villa" onChange={handleChange} />
                  </Field>
                  <Field label="Display Price">
                    <input style={s.input} name="displayPrice" value={formData.displayPrice} placeholder="e.g. ₹50 Lakh" onChange={handleChange} />
                  </Field>
                  <Field label="Beds *">
                    <input style={s.input} name="beds" value={formData.beds} placeholder="e.g. 3" onChange={handleChange} required />
                  </Field>
                  <Field label="Baths *">
                    <input style={s.input} name="baths" value={formData.baths} placeholder="e.g. 2" onChange={handleChange} required />
                  </Field>
                  <Field label="Size">
                    <input style={s.input} name="size" value={formData.size} placeholder="e.g. 1200 sq.ft" onChange={handleChange} />
                  </Field>
                  <Field label="Google Map URL">
                    <input style={s.input} name="map" value={formData.map} placeholder="https://maps.google.com/..." onChange={handleChange} />
                  </Field>
                </div>
              </Section>
            )}

            {/* Rent / PerRent Details */}
            {(formData.category === "Rent" || formData.category === "PerRent") && (
              <Section title="Property Details" icon="🏡">
                <div style={s.grid3}>
                  <Field label="Beds *">
                    <input style={s.input} name="beds" value={formData.beds} placeholder="e.g. 2" onChange={handleChange} required />
                  </Field>
                  <Field label="Baths *">
                    <input style={s.input} name="baths" value={formData.baths} placeholder="e.g. 1" onChange={handleChange} required />
                  </Field>
                  <Field label="Balconies">
                    <input style={s.input} name="balconies" value={formData.balconies} placeholder="e.g. 1" onChange={handleChange} />
                  </Field>
                  <Field label="Parking">
                    <input style={s.input} name="parking" value={formData.parking} placeholder="e.g. 1 covered" onChange={handleChange} />
                  </Field>
                  <Field label="Floor">
                    <input style={s.input} name="floor" value={formData.floor} placeholder="e.g. 5th of 12" onChange={handleChange} />
                  </Field>
                  <Field label="Property Age">
                    <input style={s.input} name="age" value={formData.age} placeholder="e.g. 3 years" onChange={handleChange} />
                  </Field>
                  <Field label="Area">
                    <input style={s.input} name="area" value={formData.area} placeholder="e.g. 950 sq.ft" onChange={handleChange} />
                  </Field>
                  <Field label="Furnished Type">
                    <input style={s.input} name="furnished" value={formData.furnished} placeholder="e.g. Semi-Furnished" onChange={handleChange} />
                  </Field>
                  <Field label="Facing">
                    <input style={s.input} name="facing" value={formData.facing} placeholder="e.g. East" onChange={handleChange} />
                  </Field>
                  <Field label="Available From">
                    <input style={s.input} name="availableFrom" value={formData.availableFrom} placeholder="e.g. 1st March 2025" onChange={handleChange} />
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
                  placeholder="Write a detailed description of the property..."
                  onChange={handleChange}
                />
              </Field>
              <div style={{ marginTop: 16 }}>
                <Field label="Amenities">
                  <input style={s.input} name="amenities" value={formData.amenities} placeholder="e.g. Gym, Pool, Security, Power Backup (comma separated)" onChange={handleChange} />
                </Field>
              </div>
            </Section>

            {/* Admin Details */}
            {(formData.category === "Rent" || formData.category === "PerRent") && (
              <Section title="Admin Details" icon="👤">
                <div style={s.grid2}>
                  <Field label="Owner Name">
                    <input style={s.input} name="owner.name" value={formData.owner.name} placeholder="e.g. Rajesh Sharma" onChange={handleChange} />
                  </Field>
                  <Field label="Phone">
                    <input style={s.input} name="owner.phone" value={formData.owner.phone} placeholder="e.g. +91 98765 43210" onChange={handleChange} />
                  </Field>
                  <Field label="Email">
                    <input style={s.input} name="owner.email" value={formData.owner.email} placeholder="e.g. owner@email.com" onChange={handleChange} />
                  </Field>
                  <Field label="Experience">
                    <input style={s.input} name="owner.experience" value={formData.owner.experience} placeholder="e.g. 8 years" onChange={handleChange} />
                  </Field>
                  <Field label="Rating">
                    <input style={s.input} name="owner.rating" value={formData.owner.rating} placeholder="e.g. 4.5" onChange={handleChange} />
                  </Field>
                  <Field label="Total Listings">
                    <input style={s.input} name="owner.totalListings" value={formData.owner.totalListings} placeholder="e.g. 12" onChange={handleChange} />
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
                + Add Property
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

// ─── EARTHY COLOR PALETTE ───────────────────────────────────────────────────
// #E4CBB6 — blush (page bg tint)
// #B2846B — terracotta (accent bar, focus ring)
// #819B8B — sage (section header bg)
// #627B68 — forest green (primary button, section title)
// #4C3324 — dark brown (page title, breadcrumb base)
// ─────────────────────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

  * { box-sizing: border-box; }

  input::placeholder, textarea::placeholder {
    color: #a89385;
    font-size: 13.5px;
  }
  input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: #B2846B !important;
    box-shadow: 0 0 0 3px rgba(178,132,107,0.15) !important;
  }
`;

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
    color: "#B2846B",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#4C3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  backBtn: {
    padding: "9px 18px",
    borderRadius: 9,
    border: "1.5px solid #d9c8bb",
    background: "#fff",
    color: "#7a5c4a",
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
    border: "1px solid #e8ddd5",
    boxShadow: "0 4px 16px rgba(76,51,36,0.06)",
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 24px",
    borderBottom: "1px solid #e8ddd5",
    background: "linear-gradient(90deg, #f0ebe5, #faf6f3)",
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#627B68",
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
    color: "#5a3e30",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "11px 14px",
    borderRadius: 9,
    border: "1.5px solid #ddd0c6",
    fontSize: 14,
    color: "#3b2416",
    background: "#fdf9f7",
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
    border: "1.5px solid #d9c8bb",
    background: "#fff",
    color: "#7a5c4a",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  submitBtn: {
    padding: "12px 36px",
    borderRadius: 10,
    border: "none",
    background: "#627B68",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(98,123,104,0.35)",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
  },
};
