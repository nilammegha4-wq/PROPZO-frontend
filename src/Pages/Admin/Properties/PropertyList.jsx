// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const Properties = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [properties, setProperties] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     fetchProperties();
// // // // //   }, []);

// // // // //   const fetchProperties = async () => {
// // // // //     try {
// // // // //       const response = await fetch("/api/properties");
// // // // //       const data = await response.json();
// // // // //       setProperties(data);
// // // // //       setLoading(false);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (id) => {
// // // // //     try {
// // // // //       await fetch(`/api/properties/${id}`, {
// // // // //         method: "DELETE",
// // // // //       });

// // // // //       fetchProperties();
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //     }
// // // // //   };

// // // // //   const handleEdit = async (id) => {
// // // // //     const newTitle = prompt("Enter new title");
// // // // //     if (!newTitle) return;

// // // // //     try {
// // // // //       await fetch(`/api/properties/${id}`, {
// // // // //         method: "PUT",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //         body: JSON.stringify({ title: newTitle }),
// // // // //       });

// // // // //       fetchProperties();
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //     }
// // // // //   };

// // // // //   if (loading) return <p>Loading...</p>;

// // // // //   return (
// // // // //     <div style={{ padding: 40 }}>
// // // // //       <h2>Properties</h2>

// // // // //       <button onClick={() => navigate("/admin/properties/add")}>
// // // // //         + Add Property
// // // // //       </button>

// // // // //       <div style={{ marginTop: 30 }}>
// // // // //         {properties.map((property) => (
// // // // //           <div
// // // // //             key={property._id}
// // // // //             style={{
// // // // //               border: "1px solid #ddd",
// // // // //               padding: 20,
// // // // //               marginBottom: 20,
// // // // //               borderRadius: 10,
// // // // //             }}
// // // // //           >
// // // // //             <h3>{property.title}</h3>
// // // // //             <p>{property.displayPrice}</p>
// // // // //             <p>{property.location}</p>
// // // // //             <p>{property.type}</p>

// // // // //             <button onClick={() => handleEdit(property._id)}>
// // // // //               Edit
// // // // //             </button>

// // // // //             <button
// // // // //               onClick={() => handleDelete(property._id)}
// // // // //               style={{ marginLeft: 10 }}
// // // // //             >
// // // // //               Delete
// // // // //             </button>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Properties;
// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // const Properties = () => {
// // // //   const navigate = useNavigate();
// // // //   const [properties, setProperties] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [filter, setFilter] = useState("All");

// // // //   useEffect(() => {
// // // //     fetchProperties();
// // // //   }, []);

// // // //   const fetchProperties = async () => {
// // // //     try {
// // // //       const response = await fetch("/api/properties");
// // // //       const data = await response.json();
// // // //       setProperties(data);
// // // //       setLoading(false);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     try {
// // // //       await fetch(`/api/properties/${id}`, {
// // // //         method: "DELETE",
// // // //       });
// // // //       fetchProperties();
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   const handleEdit = async (id) => {
// // // //     const newTitle = prompt("Enter new title");
// // // //     if (!newTitle) return;

// // // //     try {
// // // //       await fetch(`/api/properties/${id}`, {
// // // //         method: "PUT",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify({ title: newTitle }),
// // // //       });
// // // //       fetchProperties();
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   const filteredProperties =
// // // //     filter === "All"
// // // //       ? properties
// // // //       : properties.filter((property) => property.category === filter);

// // // //   const styles = {
// // // //     container: {
// // // //       padding: "40px",
// // // //       fontFamily: "Arial, sans-serif",
// // // //       backgroundColor: "#f4f6f9",
// // // //       minHeight: "100vh",
// // // //     },
// // // //     heading: {
// // // //       fontSize: "28px",
// // // //       fontWeight: "bold",
// // // //       marginBottom: "20px",
// // // //     },
// // // //     topBar: {
// // // //       display: "flex",
// // // //       justifyContent: "space-between",
// // // //       alignItems: "center",
// // // //       marginBottom: "30px",
// // // //     },
// // // //     addBtn: {
// // // //       backgroundColor: "#2563eb",
// // // //       color: "#fff",
// // // //       padding: "10px 18px",
// // // //       border: "none",
// // // //       borderRadius: "6px",
// // // //       cursor: "pointer",
// // // //       fontWeight: "500",
// // // //     },
// // // //     select: {
// // // //       padding: "8px 12px",
// // // //       borderRadius: "6px",
// // // //       border: "1px solid #ccc",
// // // //     },
// // // //     grid: {
// // // //       display: "grid",
// // // //       gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
// // // //       gap: "20px",
// // // //     },
// // // //     card: {
// // // //       background: "#fff",
// // // //       padding: "20px",
// // // //       borderRadius: "10px",
// // // //       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
// // // //     },
// // // //     btnGroup: {
// // // //       marginTop: "15px",
// // // //       display: "flex",
// // // //       gap: "10px",
// // // //     },
// // // //     editBtn: {
// // // //       backgroundColor: "#10b981",
// // // //       color: "#fff",
// // // //       padding: "6px 12px",
// // // //       border: "none",
// // // //       borderRadius: "6px",
// // // //       cursor: "pointer",
// // // //     },
// // // //     deleteBtn: {
// // // //       backgroundColor: "#ef4444",
// // // //       color: "#fff",
// // // //       padding: "6px 12px",
// // // //       border: "none",
// // // //       borderRadius: "6px",
// // // //       cursor: "pointer",
// // // //     },
// // // //   };

// // // //   if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <h2 style={styles.heading}>Properties</h2>

// // // //       <div style={styles.topBar}>
// // // //         <button
// // // //           style={styles.addBtn}
// // // //           onClick={() => navigate("/admin/properties/add")}
// // // //         >
// // // //           + Add Property
// // // //         </button>

// // // //         <select
// // // //           style={styles.select}
// // // //           value={filter}
// // // //           onChange={(e) => setFilter(e.target.value)}
// // // //         >
// // // //           <option value="All">All</option>
// // // //           <option value="Buy">Buy</option>
// // // //           <option value="Rent">Rent</option>
// // // //           <option value="PerRent">Per Rent</option>
// // // //         </select>
// // // //       </div>

// // // //       <div style={styles.grid}>
// // // //         {filteredProperties.map((property) => (
// // // //           <div key={property._id} style={styles.card}>
// // // //             <h3>{property.title}</h3>
// // // //             <p>{property.displayPrice}</p>
// // // //             <p>{property.location}</p>
// // // //             <p>{property.type}</p>

// // // //             <div style={styles.btnGroup}>
// // // //               <button
// // // //                 style={styles.editBtn}
// // // //                 onClick={() => handleEdit(property._id)}
// // // //               >
// // // //                 Edit
// // // //               </button>

// // // //               <button
// // // //                 style={styles.deleteBtn}
// // // //                 onClick={() => handleDelete(property._id)}
// // // //               >
// // // //                 Delete
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Properties;

// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const Properties = () => {
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [filter, setFilter] = useState("All");
// // //   const [editingProperty, setEditingProperty] = useState(null);

// // //   const [formData, setFormData] = useState({
// // //     title: "",
// // //     displayPrice: "",
// // //     location: "",
// // //     type: "",
// // //     category: "",
// // //   });

// // //   useEffect(() => {
// // //     fetchProperties();
// // //   }, []);

// // //   const fetchProperties = async () => {
// // //     try {
// // //       const response = await fetch("/api/properties");
// // //       const data = await response.json();
// // //       setProperties(data);
// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     try {
// // //       await fetch(`/api/properties/${id}`, {
// // //         method: "DELETE",
// // //       });
// // //       fetchProperties();
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleEdit = (property) => {
// // //     setEditingProperty(property._id);
// // //     setFormData({
// // //       title: property.title,
// // //       displayPrice: property.displayPrice,
// // //       location: property.location,
// // //       type: property.type,
// // //       category: property.category,
// // //     });
// // //   };

// // //   const handleUpdate = async () => {
// // //     try {
// // //       await fetch(`/api/properties/${editingProperty}`, {
// // //         method: "PUT",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(formData),
// // //       });

// // //       setEditingProperty(null);
// // //       fetchProperties();
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const filteredProperties =
// // //     filter === "All"
// // //       ? properties
// // //       : properties.filter((property) => property.category === filter);

// // //   const styles = {
// // //     container: {
// // //       padding: "40px",
// // //       fontFamily: "Arial, sans-serif",
// // //       backgroundColor: "#f4f6f9",
// // //       minHeight: "100vh",
// // //     },
// // //     heading: {
// // //       fontSize: "28px",
// // //       fontWeight: "bold",
// // //       marginBottom: "20px",
// // //     },
// // //     topBar: {
// // //       display: "flex",
// // //       justifyContent: "space-between",
// // //       alignItems: "center",
// // //       marginBottom: "30px",
// // //     },
// // //     addBtn: {
// // //       backgroundColor: "#2563eb",
// // //       color: "#fff",
// // //       padding: "10px 18px",
// // //       border: "none",
// // //       borderRadius: "6px",
// // //       cursor: "pointer",
// // //       fontWeight: "500",
// // //     },
// // //     select: {
// // //       padding: "8px 12px",
// // //       borderRadius: "6px",
// // //       border: "1px solid #ccc",
// // //     },
// // //     grid: {
// // //       display: "grid",
// // //       gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
// // //       gap: "20px",
// // //     },
// // //     card: {
// // //       background: "#fff",
// // //       padding: "20px",
// // //       borderRadius: "10px",
// // //       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
// // //     },
// // //     btnGroup: {
// // //       marginTop: "15px",
// // //       display: "flex",
// // //       gap: "10px",
// // //     },
// // //     editBtn: {
// // //       backgroundColor: "#10b981",
// // //       color: "#fff",
// // //       padding: "6px 12px",
// // //       border: "none",
// // //       borderRadius: "6px",
// // //       cursor: "pointer",
// // //     },
// // //     deleteBtn: {
// // //       backgroundColor: "#ef4444",
// // //       color: "#fff",
// // //       padding: "6px 12px",
// // //       border: "none",
// // //       borderRadius: "6px",
// // //       cursor: "pointer",
// // //     },
// // //     editForm: {
// // //       background: "#fff",
// // //       padding: "20px",
// // //       borderRadius: "10px",
// // //       marginBottom: "30px",
// // //       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
// // //     },
// // //     input: {
// // //       display: "block",
// // //       width: "100%",
// // //       padding: "10px",
// // //       marginBottom: "10px",
// // //       borderRadius: "6px",
// // //       border: "1px solid #ccc",
// // //     },
// // //     saveBtn: {
// // //       backgroundColor: "#2563eb",
// // //       color: "#fff",
// // //       padding: "8px 15px",
// // //       border: "none",
// // //       borderRadius: "6px",
// // //       cursor: "pointer",
// // //       marginRight: "10px",
// // //     },
// // //     cancelBtn: {
// // //       backgroundColor: "#6b7280",
// // //       color: "#fff",
// // //       padding: "8px 15px",
// // //       border: "none",
// // //       borderRadius: "6px",
// // //       cursor: "pointer",
// // //     },
// // //   };

// // //   if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.heading}>Properties</h2>

// // //       {/* Edit Form */}
// // //       {editingProperty && (
// // //         <div style={styles.editForm}>
// // //           <h3>Edit Property</h3>

// // //           <input
// // //             style={styles.input}
// // //             value={formData.title}
// // //             onChange={(e) =>
// // //               setFormData({ ...formData, title: e.target.value })
// // //             }
// // //             placeholder="Title"
// // //           />

// // //           <input
// // //             style={styles.input}
// // //             value={formData.displayPrice}
// // //             onChange={(e) =>
// // //               setFormData({ ...formData, displayPrice: e.target.value })
// // //             }
// // //             placeholder="Price"
// // //           />

// // //           <input
// // //             style={styles.input}
// // //             value={formData.location}
// // //             onChange={(e) =>
// // //               setFormData({ ...formData, location: e.target.value })
// // //             }
// // //             placeholder="Location"
// // //           />

// // //           <input
// // //             style={styles.input}
// // //             value={formData.type}
// // //             onChange={(e) =>
// // //               setFormData({ ...formData, type: e.target.value })
// // //             }
// // //             placeholder="Type"
// // //           />

// // //           <select
// // //             style={styles.input}
// // //             value={formData.category}
// // //             onChange={(e) =>
// // //               setFormData({ ...formData, category: e.target.value })
// // //             }
// // //           >
// // //             <option value="Buy">Buy</option>
// // //             <option value="Rent">Rent</option>
// // //             <option value="PerRent">Per Rent</option>
// // //           </select>

// // //           <div style={{ marginTop: 15 }}>
// // //             <button style={styles.saveBtn} onClick={handleUpdate}>
// // //               Save
// // //             </button>

// // //             <button
// // //               style={styles.cancelBtn}
// // //               onClick={() => setEditingProperty(null)}
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Top Bar */}
// // //       <div style={styles.topBar}>
// // //         <button
// // //           style={styles.addBtn}
// // //           onClick={() => navigate("/admin/properties/add")}
// // //         >
// // //           + Add Property
// // //         </button>

// // //         <select
// // //           style={styles.select}
// // //           value={filter}
// // //           onChange={(e) => setFilter(e.target.value)}
// // //         >
// // //           <option value="All">All</option>
// // //           <option value="Buy">Buy</option>
// // //           <option value="Rent">Rent</option>
// // //           <option value="PerRent">Per Rent</option>
// // //         </select>
// // //       </div>

// // //       {/* Property List */}
// // //       <div style={styles.grid}>
// // //         {filteredProperties.map((property) => (
// // //           <div key={property._id} style={styles.card}>
// // //             <h3>{property.title}</h3>
// // //             <p>{property.displayPrice}</p>
// // //             <p>{property.location}</p>
// // //             <p>{property.type}</p>
// // //             <p>{property.category}</p>

// // //             <div style={styles.btnGroup}>
// // //               <button
// // //                 style={styles.editBtn}
// // //                 onClick={() => handleEdit(property)}
// // //               >
// // //                 Edit
// // //               </button>

// // //               <button
// // //                 style={styles.deleteBtn}
// // //                 onClick={() => handleDelete(property._id)}
// // //               >
// // //                 Delete
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Properties;


// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Properties = () => {
// //   const navigate = useNavigate();
// //   const [properties, setProperties] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filter, setFilter] = useState("All");
// //   const [editingProperty, setEditingProperty] = useState(null);

// //   const [formData, setFormData] = useState({
// //     title: "",
// //     displayPrice: "",
// //     location: "",
// //     type: "",
// //     category: "",
// //   });

// //   useEffect(() => {
// //     fetchProperties();
// //   }, []);

// //   const fetchProperties = async () => {
// //     try {
// //       const response = await fetch("/api/properties");
// //       const data = await response.json();
// //       setProperties(data);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error(err);
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this property?"))
// //       return;

// //     await fetch(`/api/properties/${id}`, { method: "DELETE" });
// //     fetchProperties();
// //   };

// //   // const handleEdit = (property) => {
// //   //   setEditingProperty(property._id);
// //   //   setFormData({
// //   //     title: property.title,
// //   //     displayPrice: property.displayPrice,
// //   //     location: property.location,
// //   //     type: property.type,
// //   //     category: property.category,
// //   //   });
// //   // };


// //   const handleEdit = (property) => {
// //   setEditingProperty(property._id);
// //   setFormData(property); // 🔥 This adds all fields automatically
// // };


// //   const handleUpdate = async () => {
// //     await fetch(`/api/properties/${editingProperty}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData),
// //     });

// //     setEditingProperty(null);
// //     fetchProperties();
// //   };

// //   const filteredProperties =
// //     filter === "All"
// //       ? properties
// //       : properties.filter((p) => p.category === filter);

// //   const styles = {
// //     container: {
// //       padding: "40px",
// //       background: "#f9fafb",
// //       minHeight: "100vh",
// //       fontFamily: "Segoe UI, sans-serif",
// //     },
// //     header: {
// //       display: "flex",
// //       justifyContent: "space-between",
// //       alignItems: "center",
// //       marginBottom: "30px",
// //     },
// //     title: {
// //       fontSize: "28px",
// //       fontWeight: "600",
// //       color: "#111827",
// //     },
// //     addBtn: {
// //       background: "#111827",
// //       color: "#fff",
// //       padding: "10px 18px",
// //       borderRadius: "8px",
// //       border: "none",
// //       cursor: "pointer",
// //       fontWeight: "500",
// //       transition: "0.3s",
// //     },
// //     filter: {
// //       padding: "8px 14px",
// //       borderRadius: "8px",
// //       border: "1px solid #ddd",
// //       marginLeft: "15px",
// //     },
// //     grid: {
// //       display: "grid",
// //       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// //       gap: "25px",
// //     },
// //     card: {
// //       background: "#fff",
// //       borderRadius: "14px",
// //       padding: "20px",
// //       boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
// //       transition: "0.3s",
// //     },
// //     propertyTitle: {
// //       fontSize: "18px",
// //       fontWeight: "600",
// //       marginBottom: "6px",
// //       color: "#111",
// //     },
// //     text: {
// //       color: "#555",
// //       fontSize: "14px",
// //       marginBottom: "4px",
// //     },
// //     badge: {
// //       display: "inline-block",
// //       padding: "4px 10px",
// //       borderRadius: "20px",
// //       fontSize: "12px",
// //       background: "#e5e7eb",
// //       marginTop: "6px",
// //     },
// //     btnGroup: {
// //       marginTop: "15px",
// //       display: "flex",
// //       gap: "10px",
// //     },
// //     editBtn: {
// //       flex: 1,
// //       padding: "8px",
// //       borderRadius: "8px",
// //       border: "none",
// //       cursor: "pointer",
// //       background: "#10b981",
// //       color: "#fff",
// //       fontWeight: "500",
// //     },
// //     deleteBtn: {
// //       flex: 1,
// //       padding: "8px",
// //       borderRadius: "8px",
// //       border: "none",
// //       cursor: "pointer",
// //       background: "#ef4444",
// //       color: "#fff",
// //       fontWeight: "500",
// //     },
// //     editForm: {
// //       background: "#fff",
// //       padding: "25px",
// //       borderRadius: "14px",
// //       marginBottom: "30px",
// //       boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
// //     },
// //     input: {
// //       width: "100%",
// //       padding: "10px",
// //       borderRadius: "8px",
// //       border: "1px solid #ddd",
// //       marginBottom: "12px",
// //     },
// //     saveBtn: {
// //       background: "#111827",
// //       color: "#fff",
// //       padding: "8px 16px",
// //       borderRadius: "8px",
// //       border: "none",
// //       cursor: "pointer",
// //       marginRight: "10px",
// //     },
// //     cancelBtn: {
// //       background: "#6b7280",
// //       color: "#fff",
// //       padding: "8px 16px",
// //       borderRadius: "8px",
// //       border: "none",
// //       cursor: "pointer",
// //     },
// //   };

// //   if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.header}>
// //         <h2 style={styles.title}>Properties</h2>

// //         <div>
// //           <button
// //             style={styles.addBtn}
// //             onClick={() => navigate("/admin/properties/add")}
// //           >
// //             + Add Property
// //           </button>

// //           <select
// //             style={styles.filter}
// //             value={filter}
// //             onChange={(e) => setFilter(e.target.value)}
// //           >
// //             <option value="All">All</option>
// //             <option value="Buy">Buy</option>
// //             <option value="Rent">Rent</option>
// //             <option value="PerRent">Per Rent</option>
// //           </select>
// //         </div>
// //       </div>

// //       {editingProperty && (
// //         <div style={styles.editForm}>
// //           <h3>Edit Property</h3>

// //           <input
// //             style={styles.input}
// //             value={formData.title}
// //             onChange={(e) =>
// //               setFormData({ ...formData, title: e.target.value })
// //             }
// //             placeholder="Title"
// //           />

// //           <input
// //             style={styles.input}
// //             value={formData.displayPrice}
// //             onChange={(e) =>
// //               setFormData({ ...formData, displayPrice: e.target.value })
// //             }
// //             placeholder="Price"
// //           />

// //           <input
// //             style={styles.input}
// //             value={formData.location}
// //             onChange={(e) =>
// //               setFormData({ ...formData, location: e.target.value })
// //             }
// //             placeholder="Location"
// //           />

// //           <input
// //             style={styles.input}
// //             value={formData.type}
// //             onChange={(e) =>
// //               setFormData({ ...formData, type: e.target.value })
// //             }
// //             placeholder="Type"
// //           />

// //           <select
// //             style={styles.input}
// //             value={formData.category}
// //             onChange={(e) =>
// //               setFormData({ ...formData, category: e.target.value })
// //             }
// //           >
// //             <option value="Buy">Buy</option>
// //             <option value="Rent">Rent</option>
// //             <option value="PerRent">Per Rent</option>
// //           </select>

// //           <button style={styles.saveBtn} onClick={handleUpdate}>
// //             Save
// //           </button>

// //           <button
// //             style={styles.cancelBtn}
// //             onClick={() => setEditingProperty(null)}
// //           >
// //             Cancel
// //           </button>
// //         </div>
// //       )}

// //       <div style={styles.grid}>
// //         {filteredProperties.map((property) => (
// //           <div key={property._id} style={styles.card}>
// //             <div style={styles.propertyTitle}>{property.title}</div>
// //             <div style={styles.text}>{property.displayPrice}</div>
// //             <div style={styles.text}>{property.location}</div>
// //             <div style={styles.text}>{property.type}</div>
// //             <div style={styles.badge}>{property.category}</div>

// //             <div style={styles.btnGroup}>
// //               <button
// //                 style={styles.editBtn}
// //                 onClick={() => handleEdit(property)}
// //               >
// //                 Edit
// //               </button>

// //               <button
// //                 style={styles.deleteBtn}
// //                 onClick={() => handleDelete(property._id)}
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Properties;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Properties = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await fetch("/api/properties");
//       const data = await response.json();
//       setProperties(data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this property?"))
//       return;

//     await fetch(`/api/properties/${id}`, { method: "DELETE" });
//     fetchProperties();
//   };

//   // ✅ Navigate to Edit Page
//   const handleEdit = (id) => {
//     navigate(`/admin/properties/edit/${id}`);
//   };

//   const filteredProperties =
//     filter === "All"
//       ? properties
//       : properties.filter((p) => p.category === filter);

//   const styles = {
//     container: {
//       padding: "40px",
//       background: "#f9fafb",
//       minHeight: "100vh",
//       fontFamily: "Segoe UI, sans-serif",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "30px",
//     },
//     title: {
//       fontSize: "28px",
//       fontWeight: "600",
//       color: "#111827",
//     },
//     addBtn: {
//       background: "#111827",
//       color: "#fff",
//       padding: "10px 18px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//       fontWeight: "500",
//     },
//     filter: {
//       padding: "8px 14px",
//       borderRadius: "8px",
//       border: "1px solid #ddd",
//       marginLeft: "15px",
//     },
//     grid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//       gap: "25px",
//     },
//     card: {
//       background: "#fff",
//       borderRadius: "14px",
//       padding: "20px",
//       boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
//     },
//     propertyTitle: {
//       fontSize: "18px",
//       fontWeight: "600",
//       marginBottom: "6px",
//     },
//     text: {
//       color: "#555",
//       fontSize: "14px",
//       marginBottom: "4px",
//     },
//     badge: {
//       display: "inline-block",
//       padding: "4px 10px",
//       borderRadius: "20px",
//       fontSize: "12px",
//       background: "#e5e7eb",
//       marginTop: "6px",
//     },
//     btnGroup: {
//       marginTop: "15px",
//       display: "flex",
//       gap: "10px",
//     },
//     editBtn: {
//       flex: 1,
//       padding: "8px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//       background: "#10b981",
//       color: "#fff",
//       fontWeight: "500",
//     },
//     deleteBtn: {
//       flex: 1,
//       padding: "8px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//       background: "#ef4444",
//       color: "#fff",
//       fontWeight: "500",
//     },
//   };

//   if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2 style={styles.title}>Properties</h2>

//         <div>
//           <button
//             style={styles.addBtn}
//             onClick={() => navigate("/admin/properties/add")}
//           >
//             + Add Property
//           </button>

//           <select
//             style={styles.filter}
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Buy">Buy</option>
//             <option value="Rent">Rent</option>
//             <option value="PerRent">Per Rent</option>
//           </select>
//         </div>
//       </div>

//       <div style={styles.grid}>
//         {filteredProperties.map((property) => (
//           <div key={property._id} style={styles.card}>
//             <div style={styles.propertyTitle}>{property.title}</div>
//             <div style={styles.text}>{property.displayPrice}</div>
//             <div style={styles.text}>{property.location}</div>
//             <div style={styles.text}>{property.type}</div>
//             <div style={styles.badge}>{property.category}</div>

//             <div style={styles.btnGroup}>
//               <button
//                 style={styles.editBtn}
//                 onClick={() => handleEdit(property._id)}
//               >
//                 Edit
//               </button>

//               <button
//                 style={styles.deleteBtn}
//                 onClick={() => handleDelete(property._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Properties;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getImageUrl } from "../../../config";

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      const data = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    const token = localStorage.getItem("adminAuthToken") || localStorage.getItem("token");

    await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    fetchProperties();
  };

  const handleEdit = (id) => {
    navigate(`/admin/properties/edit/${id}`);
  };

  const filteredProperties = properties.filter((p) => {
    // Category filter
    const categoryMatch = filter === "All" || p.category === filter;

    // Search filter
    const query = searchQuery.toLowerCase();
    const searchMatch = !searchQuery ||
      p.title?.toLowerCase()?.includes(query) ||
      p.location?.toLowerCase()?.includes(query) ||
      p.type?.toLowerCase()?.includes(query);

    return categoryMatch && searchMatch;
  });

  const categoryColors = {
    Buy: { bg: "rgba(178, 132, 107, 0.1)", color: "#b2846b" }, // Brand Tan
    Rent: { bg: "rgba(129, 155, 139, 0.1)", color: "#819b8b" }, // Brand Sage Light
    PerRent: { bg: "rgba(228, 203, 182, 0.2)", color: "#4c3324" }, // Brand Brown
    default: { bg: "#f9f6f1", color: "#627b68" },
  };

  if (loading)
    return (
      <div style={loaderWrap}>
        <div style={spinner}></div>
        <p style={{ color: "#627b68", marginTop: 16, fontFamily: "'DM Sans', sans-serif" }}>
          Loading properties...
        </p>
        <style>{spinnerStyle}</style>
      </div>
    );

  return (
    <>
      <style>{`
        ${globalStyles}
        @media (max-width: 991px) {
          .prop-container { padding: 30px 20px !important; }
          .prop-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .prop-actions { width: 100% !important; justify-content: space-between !important; }
        }
        @media (max-width: 768px) {
          .prop-grid { grid-template-columns: 1fr !important; }
          .prop-tabs { overflow-x: auto !important; width: 100% !important; display: flex !important; }
          .prop-tabs button { flex-shrink: 0 !important; }
        }
        @media (max-width: 480px) {
          .prop-title { font-size: 28px !important; }
          .prop-actions { flex-direction: column !important; align-items: flex-start !important; }
          .prop-filter-wrap, .prop-add-btn { width: 100% !important; }
          .prop-select { width: 100% !important; }
        }
      `}</style>
      <div style={styles.page}>
        {/* Sidebar accent */}
        <div style={styles.accentBar} />

        <div style={styles.container} className="prop-container">
          {/* Header */}
          <div style={styles.header} className="prop-header">
            <div>
              <p style={styles.breadcrumb}>Admin / Listings</p>
              <h1 style={styles.title} className="prop-title">Properties</h1>
              <p style={styles.subtitle}>
                {filteredProperties.length} propert{filteredProperties.length !== 1 ? "ies" : "y"} found
              </p>
            </div>

            <div style={styles.actions} className="prop-actions">
              <div style={styles.filterWrap} className="prop-filter-wrap">
                <span style={styles.filterIcon}>⊟</span>
                <select
                  style={styles.select}
                  className="prop-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="PerRent">Per Rent</option>
                </select>
              </div>

              <button
                style={styles.addBtn}
                className="prop-add-btn"
                onClick={() => navigate("/admin/properties/add")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4c3324";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(76,51,36,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#627b68";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(98,123,104,0.2)";
                }}
              >
                + Add Property
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={styles.tabRow} className="prop-tabs">
            {["All", "Buy", "Rent", "PerRent"].map((tab) => (
              <button
                key={tab}
                style={{
                  ...styles.tab,
                  ...(filter === tab ? styles.tabActive : {}),
                }}
                onClick={() => setFilter(tab)}
              >
                {tab === "PerRent" ? "Per Rent" : tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredProperties.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🏘️</div>
              <p style={styles.emptyText}>No properties found in this category.</p>
            </div>
          ) : (
            <div style={styles.grid} className="prop-grid">
              {filteredProperties.map((property, i) => {
                const badge = categoryColors[property.category] || categoryColors.default;
                return (
                  <div
                    key={property._id}
                    style={{
                      ...styles.card,
                      animationDelay: `${i * 60}ms`,
                    }}
                    className="prop-card"
                  >
                    {/* Card top accent */}
                    <div style={styles.cardTopBar} />

                    {/* Property Image Section */}
                    <div style={styles.imageSection}>
                      <img
                        src={getImageUrl(property.image || (property.images && property.images[0]))}
                        alt={property.title}
                        style={styles.propertyImg}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073";
                        }}
                      />
                    </div>

                    <div style={styles.cardBody}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={styles.propertyTitle}>{property.title}</h3>
                        <span
                          style={{
                            ...styles.badge,
                            background: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {property.category}
                        </span>
                      </div>

                      <p style={styles.price}>{property.displayPrice}</p>

                      <div style={styles.meta}>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>📍</span> {property.location}
                        </span>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>🏠</span> {property.type}
                        </span>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>👤</span> Seller: {property.owner?.name || "N/A"}
                        </span>
                        <span style={styles.metaItem}>
                          <span style={styles.metaIcon}>📅</span> Listed: {new Date(property.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div style={styles.cardFooter}>
                      <button
                        onClick={() => handleEdit(property._id)}
                        style={{
                          ...styles.editBtn,
                          color: "#627b68",
                          background: "rgba(98, 123, 104, 0.1)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#627b68";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(98, 123, 104, 0.1)";
                          e.currentTarget.style.color = "#627b68";
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(property._id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#ef4444";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fef2f2";
                          e.currentTarget.style.color = "#ef4444";
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const loaderWrap = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "#f9f6f1",
};

const spinner = {
  width: 40,
  height: 40,
  border: "4px solid rgba(98, 123, 104, 0.2)",
  borderTop: "4px solid #627b68",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const spinnerStyle = `
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700&display=swap');

  .prop-card {
    animation: fadeUp 0.4s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .prop-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 20px 40px rgba(76, 51, 36, 0.1) !important;
  }
`;

const styles = {
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
  container: {
    flex: 1,
    padding: "48px 52px",
    maxWidth: 1300,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },
  breadcrumb: {
    fontSize: 12,
    color: "#b2846b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    color: "#4c3324",
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
  },
  actions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  filterWrap: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "0 14px",
    gap: 8,
    height: 44,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  filterIcon: {
    color: "#94a3b8",
    fontSize: 16,
  },
  select: {
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#334155",
    background: "transparent",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    paddingRight: 4,
  },
  addBtn: {
    background: "#627b68",
    color: "#fff",
    padding: "0 22px",
    height: 44,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.01em",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(98, 123, 104, 0.2)",
  },
  tabRow: {
    display: "flex",
    gap: 6,
    marginBottom: 32,
    background: "#fff",
    padding: 6,
    borderRadius: 12,
    width: "fit-content",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    border: "1px solid #e2e8f0",
  },
  tab: {
    padding: "8px 20px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    color: "#64748b",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  tabActive: {
    background: "#627b68",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(98, 123, 104, 0.2)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(76, 51, 36, 0.06)",
    border: "1px solid rgba(228, 203, 182, 0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  imageSection: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
    position: "relative",
    background: "#f1f5f9",
  },
  propertyImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  cardTopBar: {
    height: 4,
    background: "linear-gradient(90deg, #627b68, #819b8b)",
  },
  cardBody: {
    padding: "22px 22px 16px",
    flex: 1,
  },
  propertyTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#4c3324",
    margin: 0,
    fontFamily: "'Sora', sans-serif",
    flex: 1,
    paddingRight: 10,
    lineHeight: 1.3,
  },
  price: {
    fontSize: 22,
    fontWeight: 700,
    color: "#b2846b",
    margin: "12px 0 14px",
    fontFamily: "'Sora', sans-serif",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  metaItem: {
    fontSize: 13,
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: {
    fontSize: 14,
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.03em",
    flexShrink: 0,
    marginTop: 2,
  },
  cardFooter: {
    display: "flex",
    gap: 10,
    padding: "14px 22px 20px",
    borderTop: "1px solid #f1f5f9",
  },
  editBtn: {
    flex: 1,
    padding: "9px 0",
    borderRadius: 9,
    border: "1.5px solid #2563eb",
    cursor: "pointer",
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: 600,
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  deleteBtn: {
    flex: 1,
    padding: "9px 0",
    borderRadius: 9,
    border: "1.5px solid #ef4444",
    cursor: "pointer",
    background: "#fef2f2",
    color: "#ef4444",
    fontWeight: 600,
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  },
  empty: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#94a3b8",
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 500,
  },
};

export default Properties;
