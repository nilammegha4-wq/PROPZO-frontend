// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import "./SellProperty.css";
// import { toast } from "react-toastify";
// import {
//   FaRegBuilding,
//   FaInfoCircle,
//   FaMapMarkerAlt,
//   FaList,
//   FaRegImage,
//   FaRegUser,
//   FaCheckCircle,
//   FaArrowRight,
//   FaTimes
// } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";

// export default function SellProperty() {
//   const navigate = useNavigate();
//   const { auth } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const [formData, setFormData] = useState({
//     /* SECTION 1 */
//     title: "",
//     type: "Apartment",
//     category: "Buy",
//     price: "",
//     description: "",

//     /* SECTION 2 */
//     beds: "",
//     baths: "",
//     area: "",
//     furnishingStatus: "Unfurnished",
//     floorNumber: "",
//     totalFloors: "",
//     propertyAge: "",
//     balconies: "",
//     parking: "N/A",
//     facing: "East",
//     availableFrom: "",
//     rentDuration: "month",

//     /* SECTION 3 */
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     map: "",
//     mapEmbed: "",

//     /* SECTION 4 */
//     amenities: [],

//     /* SECTION 6 */
//     owner: {
//       name: auth?.name || "",
//       phone: auth?.phone || "",
//       email: auth?.email || "",
//       whatsapp: "",
//     }
//   });

//   const amenitiesList = [
//     "Parking", "Lift", "Security", "Garden", "Gym",
//     "Swimming Pool", "Power Backup", "Balcony"
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAmenityChange = (amenity) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter(a => a !== amenity)
//         : [...prev.amenities, amenity]
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(prev => [...prev, ...files]);

//     const newPreviews = files.map(file => URL.createObjectURL(file));
//     setPreviews(prev => [...prev, ...newPreviews]);
//   };

//   const removeImage = (index) => {
//     setImageFiles(prev => prev.filter((_, i) => i !== index));
//     setPreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!auth) {
//       alert("Please login to list a property");
//       return navigate("/login");
//     }

//     setLoading(true);
//     try {
//       const token = auth.token || localStorage.getItem("token");

//       const formDataToSend = new FormData();

//       // Append basic fields
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("price", formData.price);
//       formDataToSend.append("propertyType", formData.category); // Map category ("Buy", "Rent", "PerRent") to propertyType
//       formDataToSend.append("category", formData.category);
//       formDataToSend.append("type", formData.type); // Building type (Apartment, etc.)
//       formDataToSend.append("bhk", formData.beds);
//       formDataToSend.append("bathrooms", formData.baths);
//       formDataToSend.append("area", formData.area);
//       formDataToSend.append("furnishing", formData.furnishingStatus);
//       formDataToSend.append("floor", formData.floorNumber);
//       formDataToSend.append("totalFloors", formData.totalFloors);
//       formDataToSend.append("propertyAge", formData.propertyAge);
//       formDataToSend.append("address", formData.address);
//       formDataToSend.append("city", formData.city);
//       formDataToSend.append("state", formData.state);
//       formDataToSend.append("pincode", formData.pincode);
//       formDataToSend.append("map", formData.map);
//       formDataToSend.append("mapEmbed", formData.mapEmbed);
//       formDataToSend.append("balconies", formData.balconies);
//       formDataToSend.append("parking", formData.parking);
//       formDataToSend.append("facing", formData.facing);
//       formDataToSend.append("availableFrom", formData.availableFrom);
//       formDataToSend.append("rentDuration", formData.rentDuration);
//       formDataToSend.append("sellerName", formData.owner.name);
//       formDataToSend.append("phone", formData.owner.phone);
//       formDataToSend.append("email", formData.owner.email);

//       // Append amenities as array
//       formData.amenities.forEach(amenity => {
//         formDataToSend.append("amenities", amenity);
//       });

//       // Append actual files
//       imageFiles.forEach(file => {
//         formDataToSend.append("images", file);
//       });

//       await axios.post("/api/sales/create", formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       toast.success("🎉 Property listed successfully with images!");
//       navigate("/properties");
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error(error.response?.data?.message || "Failed to list property. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sell-property-container">
//       {/* Breadcrumbs */}
//       <div className="breadcrumbs">
//         <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Home</Link>
//         <span>/</span>
//         <Link to="/menu" style={{color: 'inherit', textDecoration: 'none'}}>Menu</Link>
//         <span>/</span>
//         <span className="active">List Property</span>
//       </div>

//       <div className="sell-property-layout">
//         <form className="form-left" onSubmit={handleSubmit}>

//           {/* SECTION 1: CONTACT INFORMATION */}
//           <section className="section-group">
//             <h2 className="section-group-title">Contact Information</h2>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Seller Name</label>
//                 <input type="text" name="owner.name" className="form-control" placeholder="Full name" value={formData.owner.name} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Email Address</label>
//                 <input type="email" name="owner.email" className="form-control" placeholder="Email" value={formData.owner.email} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input type="text" name="owner.phone" className="form-control" placeholder="Phone" value={formData.owner.phone} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>WhatsApp (Optional)</label>
//                 <input type="text" name="owner.whatsapp" className="form-control" placeholder="WhatsApp" value={formData.owner.whatsapp} onChange={handleChange} />
//               </div>
//             </div>
//           </section>

//           {/* SECTION 2: PROPERTY INFO */}
//           <section className="section-group">
//             <h2 className="section-group-title">Property Details</h2>
//             <div className="form-grid">
//               <div className="form-group full-width">
//                 <label>Listing Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   className="form-control"
//                   placeholder="e.g. Luxury 3BHK Apartment in Bandra"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Property Type</label>
//                 <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
//                   <option value="Apartment">Apartment</option>
//                   <option value="House">House</option>
//                   <option value="Villa">Villa</option>
//                   <option value="Plot">Plot</option>
//                   <option value="Commercial">Commercial</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Category</label>
//                 <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
//                   <option value="Buy">Sell / Full Ownership</option>
//                   <option value="Rent">Long Term Rent</option>
//                   <option value="PerRent">Flexible / Short Stay</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Price (₹)</label>
//                 <input
//                   type="number"
//                   name="price"
//                   className="form-control"
//                   placeholder="Asking Price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Area (sqft)</label>
//                 <input type="number" name="area" className="form-control" placeholder="Size" value={formData.area} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>BHK</label>
//                 <input type="number" name="beds" className="form-control" placeholder="Bedrooms" value={formData.beds} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Bathrooms</label>
//                 <input type="number" name="baths" className="form-control" placeholder="Baths" value={formData.baths} onChange={handleChange} required />
//               </div>
//               <div className="form-group full-width">
//                 <label>Description</label>
//                 <textarea
//                   name="description"
//                   className="form-control"
//                   placeholder="Describe the unique features of your property..."
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>
//             </div>
//           </section>

//           {/* SECTION 3: DETAILED SPECS */}
//           <section className="section-group">
//             <h2 className="section-group-title">Detailed Specifications</h2>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Furnishing Status</label>
//                 <select name="furnishingStatus" className="form-control" value={formData.furnishingStatus} onChange={handleChange}>
//                   <option value="Furnished">Furnished</option>
//                   <option value="Semi-Furnished">Semi-Furnished</option>
//                   <option value="Unfurnished">Unfurnished</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Property Age</label>
//                 <input type="text" name="propertyAge" className="form-control" placeholder="e.g. 5 Years" value={formData.propertyAge} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Floor Number</label>
//                 <input type="number" name="floorNumber" className="form-control" placeholder="Floor" value={formData.floorNumber} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Total Floors</label>
//                 <input type="number" name="totalFloors" className="form-control" placeholder="Total" value={formData.totalFloors} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Parking</label>
//                 <select name="parking" className="form-control" value={formData.parking} onChange={handleChange}>
//                   <option value="N/A">N/A</option>
//                   <option value="Covered">Covered</option>
//                   <option value="Open">Open</option>
//                   <option value="Both">Both</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Facing Direction</label>
//                 <select name="facing" className="form-control" value={formData.facing} onChange={handleChange}>
//                   <option value="East">East</option>
//                   <option value="West">West</option>
//                   <option value="North">North</option>
//                   <option value="South">South</option>
//                   <option value="North-East">North-East</option>
//                   <option value="North-West">North-West</option>
//                   <option value="South-East">South-East</option>
//                   <option value="South-West">South-West</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Balconies</label>
//                 <input type="number" name="balconies" className="form-control" value={formData.balconies} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Available From</label>
//                 <input type="text" name="availableFrom" className="form-control" placeholder="Immediately/Date" value={formData.availableFrom} onChange={handleChange} />
//               </div>
//             </div>
//           </section>

//           {/* SECTION 4: LOCATION */}
//           <section className="section-group">
//             <h2 className="section-group-title">Location Information</h2>
//             <div className="form-grid">
//               <div className="form-group full-width">
//                 <label>Full Address</label>
//                 <input type="text" name="address" className="form-control" placeholder="Building, Street Name" value={formData.address} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>City</label>
//                 <input type="text" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>State</label>
//                 <input type="text" name="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Pincode</label>
//                 <input type="number" name="pincode" className="form-control" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Google Maps Link</label>
//                 <input type="text" name="map" className="form-control" placeholder="Map URL" value={formData.map} onChange={handleChange} />
//               </div>
//             </div>
//           </section>

//           {/* SECTION 4: AMENITIES */}
//           <section className="section-group">
//             <h2 className="section-group-title">Amenities</h2>
//             <div className="amenities-grid">
//               {amenitiesList.map(amenity => (
//                 <label key={amenity} className={`amenity-item ${formData.amenities.includes(amenity) ? 'active' : ''}`}>
//                   <input
//                     type="checkbox"
//                     checked={formData.amenities.includes(amenity)}
//                     onChange={() => handleAmenityChange(amenity)}
//                     style={{display: 'none'}}
//                   />
//                   <span>{amenity}</span>
//                 </label>
//               ))}
//             </div>
//           </section>

//           {/* SECTION 5: MEDIA */}
//           <section className="section-group">
//             <h2 className="section-group-title">Property Media</h2>
//             <div className="upload-box" onClick={() => document.getElementById('imageUpload').click()}>
//               <input
//                 type="file"
//                 id="imageUpload"
//                 multiple
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 onChange={handleImageChange}
//               />
//               <FaRegImage size={24} color="#8a6a28" />
//               <p style={{marginTop: '10px', fontSize: '13px'}}>Drag & drop or Click to upload photos</p>
//             </div>
//             {previews.length > 0 && (
//               <div className="previews">
//                 {previews.map((src, idx) => (
//                   <div key={idx} className="preview-chip">
//                     <img src={src} alt="Preview" />
//                     <button type="button" className="remove-btn" onClick={(e) => {
//                       e.stopPropagation();
//                       removeImage(idx);
//                     }}>&times;</button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         </form>

//         {/* RIGHT COLUMN: LISTING SUMMARY */}
//         <div className="summary-right">
//           <div className="summary-card">
//             <h3 className="summary-title">Listing Summary</h3>

//             <div className="summary-item">
//               <img 
//                 src={previews[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"} 
//                 alt="Property" 
//                 className="summary-img" 
//               />
//               <div className="summary-info">
//                 <h4>{formData.title || "Untitled Property"}</h4>
//                 <p>{formData.type} • {formData.city || "Location TBA"}</p>
//                 <p style={{marginTop: '5px', color: '#8a6a28'}}>{formData.beds || 0} BHK | {formData.area || 0} sqft</p>
//               </div>
//             </div>

//             <div className="summary-details">
//               <div className="summary-row">
//                 <span>Category</span>
//                 <span style={{fontWeight: '600'}}>{formData.category}</span>
//               </div>
//               <div className="summary-row">
//                 <span>Verification Fee</span>
//                 <span>FREE</span>
//               </div>
//               <div className="summary-row">
//                 <span>Listing Duration</span>
//                 <span>Active (90 Days)</span>
//               </div>

//               <div className="summary-row total">
//                 <span>Price</span>
//                 <span>₹{Number(formData.price).toLocaleString()}</span>
//               </div>
//             </div>

//             <button 
//               type="button" 
//               className="pay-btn" 
//               onClick={(e) => handleSubmit(e)}
//               disabled={loading}
//             >
//               {loading ? (
//                 <><ImSpinner2 className="animate-spin" /> processing...</>
//               ) : (
//                 "List Property Now"
//               )}
//             </button>
//             <p style={{textAlign: 'center', fontSize: '11px', color: '#999', marginTop: '15px'}}>
//               By proceeding, I accept the Terms & Conditions
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaRegBuilding, FaInfoCircle, FaMapMarkerAlt,
  FaList, FaRegImage, FaRegUser, FaCheckCircle,
  FaArrowRight, FaTimes
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg-light: #f5f0e8;
    --white: #fffaf5;
    --gold: #B2846B;
    --gold-hover: #4C3324;
    --gold-faint: rgba(178,132,107,0.10);
    --sage: #627B68;
    --sage-light: #819B8B;
    --blush: #E4CBB6;
    --ink: #4C3324;
    --muted: #9a7060;
    --border: rgba(178,132,107,0.22);
    --shadow: 0 4px 20px rgba(76,51,36,0.07);
  }

  .sell-property-container {
    background: var(--bg-light);
    min-height: 100vh;
    padding: 120px 5% 80px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
  }

  /* Breadcrumbs */
  .breadcrumbs {
    display: flex;
    gap: 10px;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 30px;
  }

  .breadcrumbs span.active {
    color: var(--ink);
    font-weight: 600;
  }

  .sell-property-layout {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 50px;
    max-width: 1300px;
    margin: 0 auto;
  }

  /* LEFT COLUMN */
  .form-left {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .section-group {
    margin-bottom: 20px;
  }

  .section-group-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 25px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    color: var(--ink);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .full-width { grid-column: span 2; }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
  }

  .form-control {
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 14px;
    background: var(--white);
    transition: all 0.3s ease;
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
  }

  .form-control:focus {
    border-color: var(--gold);
    outline: none;
    box-shadow: 0 0 0 2px var(--gold-faint);
  }

  textarea.form-control {
    min-height: 110px;
    resize: vertical;
  }

  select.form-control {
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B2846B' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }

  /* RIGHT COLUMN - SUMMARY */
  .summary-right {
    position: sticky;
    top: 100px;
    height: fit-content;
  }

  .summary-card {
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  .summary-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    margin-bottom: 25px;
    color: var(--ink);
  }

  .summary-item {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }

  .summary-img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    object-fit: cover;
    background: var(--gold-faint);
  }

  .summary-info h4 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--ink);
  }

  .summary-info p {
    font-size: 12px;
    color: var(--muted);
  }

  .summary-details { margin-top: 25px; }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 12px;
    color: var(--muted);
  }

  .summary-row span:last-child {
    color: var(--ink);
    font-weight: 500;
  }

  .summary-row.total {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid var(--border);
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--gold);
  }

  .summary-row.total span:last-child {
    color: var(--gold);
  }

  .pay-btn {
    width: 100%;
    margin-top: 30px;
    padding: 18px;
    background: var(--gold);
    color: var(--white);
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .pay-btn:hover:not(:disabled) {
    background: var(--gold-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(76,51,36,0.20);
  }

  .pay-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Amenities */
  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .amenity-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition: 0.2s;
    color: var(--muted);
    user-select: none;
  }

  .amenity-item:hover {
    border-color: var(--sage-light);
    color: var(--ink);
  }

  .amenity-item.active {
    border-color: var(--sage);
    background: rgba(98,123,104,0.10);
    color: var(--sage);
    font-weight: 500;
  }

  /* Upload */
  .upload-box {
    border: 1.5px dashed var(--gold);
    padding: 30px;
    text-align: center;
    border-radius: 4px;
    background: var(--gold-faint);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    color: var(--muted);
    font-size: 13px;
  }

  .upload-box:hover {
    background: rgba(178,132,107,0.16);
    border-color: var(--sage);
  }

  .previews {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .preview-chip {
    position: relative;
    width: 60px;
    height: 60px;
  }

  .preview-chip img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid var(--border);
  }

  .remove-btn {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--ink);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .remove-btn:hover { background: var(--gold); }

  /* Spinner */
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 968px) {
    .sell-property-layout {
      grid-template-columns: 1fr;
    }
    .summary-right {
      position: static;
    }
    .amenities-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    .full-width {
      grid-column: span 1;
    }
    .sell-property-container {
      padding: 100px 5% 60px;
    }
  }
`;

export default function SellProperty() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "", type: "Apartment", category: "Buy", price: "", description: "",
    beds: "", baths: "", area: "", furnishingStatus: "Unfurnished",
    floorNumber: "", totalFloors: "", propertyAge: "", balconies: "",
    parking: "N/A", facing: "East", availableFrom: "", rentDuration: "month",
    address: "", city: "", state: "", pincode: "", map: "", mapEmbed: "",
    amenities: [],
    owner: {
      name: auth?.name || "",
      phone: auth?.phone || "",
      email: auth?.email || "",
      whatsapp: "",
    }
  });

  const amenitiesList = [
    "Parking", "Lift", "Security", "Garden", "Gym",
    "Swimming Pool", "Power Backup", "Balcony"
  ];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      alert("Please login to list a property");
      return navigate("/login");
    }
<<<<<<< HEAD
=======

    // Frontend file size validation (20MB per file)
    const oversizedFiles = imageFiles.filter(f => f.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error(`Image "${oversizedFiles[0].name}" is too large. Max 20MB per image.`);
      return;
    }

>>>>>>> e85f1ae (nilam2)
    setLoading(true);
    try {
      const token = auth.token || localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
<<<<<<< HEAD
      formDataToSend.append("price", formData.price);
=======
      const parsedPrice = parseIndianPrice(formData.price);
      formDataToSend.append("price", parsedPrice);
      formDataToSend.append("displayPrice", formData.price.includes(" ") || formData.price.toLowerCase().includes("cr") || formData.price.toLowerCase().includes("l") ? formData.price : `₹${Number(formData.price).toLocaleString('en-IN')}`);
>>>>>>> e85f1ae (nilam2)
      formDataToSend.append("propertyType", formData.category);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("bhk", formData.beds);
      formDataToSend.append("bathrooms", formData.baths);
      formDataToSend.append("area", formData.area);
      formDataToSend.append("furnishing", formData.furnishingStatus);
      formDataToSend.append("floor", formData.floorNumber);
      formDataToSend.append("totalFloors", formData.totalFloors);
      formDataToSend.append("propertyAge", formData.propertyAge);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("pincode", formData.pincode);
      formDataToSend.append("map", formData.map);
      formDataToSend.append("mapEmbed", formData.mapEmbed);
      formDataToSend.append("balconies", formData.balconies);
      formDataToSend.append("parking", formData.parking);
      formDataToSend.append("facing", formData.facing);
      formDataToSend.append("availableFrom", formData.availableFrom);
      formDataToSend.append("rentDuration", formData.rentDuration);
      formDataToSend.append("sellerName", formData.owner.name);
      formDataToSend.append("phone", formData.owner.phone);
      formDataToSend.append("email", formData.owner.email);
      formData.amenities.forEach(amenity => formDataToSend.append("amenities", amenity));
      imageFiles.forEach(file => formDataToSend.append("images", file));

      await axios.post("/api/sales/create", formDataToSend, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      toast.success("🎉 Property listed successfully!");
      navigate("/properties");
    } catch (error) {
      console.error("Submission error:", error);
      const errorMsg = error.response?.data?.message || "Failed to list property. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="sell-property-container">

        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/menu" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</Link>
          <span>/</span>
          <span className="active">List Property</span>
        </div>

        <div className="sell-property-layout">
          <form className="form-left" onSubmit={handleSubmit}>

            {/* SECTION 1: CONTACT */}
            <section className="section-group">
              <h2 className="section-group-title">Contact Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Seller Name</label>
                  <input type="text" name="owner.name" className="form-control" placeholder="Full name" value={formData.owner.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="owner.email" className="form-control" placeholder="Email" value={formData.owner.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" name="owner.phone" className="form-control" placeholder="Phone" value={formData.owner.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>WhatsApp (Optional)</label>
                  <input type="text" name="owner.whatsapp" className="form-control" placeholder="WhatsApp" value={formData.owner.whatsapp} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* SECTION 2: PROPERTY INFO */}
            <section className="section-group">
              <h2 className="section-group-title">Property Details</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Listing Title</label>
                  <input type="text" name="title" className="form-control" placeholder="e.g. Luxury 3BHK Apartment in Bandra" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
                    <option value="Buy">Sell / Full Ownership</option>
                    <option value="Rent">Long Term Rent</option>
                    <option value="PerRent">Flexible / Short Stay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
<<<<<<< HEAD
                  <input type="number" name="price" className="form-control" placeholder="Asking Price" value={formData.price} onChange={handleChange} required />
=======
                  <input type="text" name="price" className="form-control" placeholder="e.g. 2.1 Cr or 50 Lakh" value={formData.price} onChange={handleChange} required />
>>>>>>> e85f1ae (nilam2)
                </div>
                <div className="form-group">
                  <label>Area (sqft)</label>
                  <input type="number" name="area" className="form-control" placeholder="Size" value={formData.area} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>BHK</label>
                  <input type="number" name="beds" className="form-control" placeholder="Bedrooms" value={formData.beds} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Bathrooms</label>
                  <input type="number" name="baths" className="form-control" placeholder="Baths" value={formData.baths} onChange={handleChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea name="description" className="form-control" placeholder="Describe the unique features of your property..." value={formData.description} onChange={handleChange} required />
                </div>
              </div>
            </section>

            {/* SECTION 3: DETAILED SPECS */}
            <section className="section-group">
              <h2 className="section-group-title">Detailed Specifications</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Furnishing Status</label>
                  <select name="furnishingStatus" className="form-control" value={formData.furnishingStatus} onChange={handleChange}>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Property Age</label>
                  <input type="text" name="propertyAge" className="form-control" placeholder="e.g. 5 Years" value={formData.propertyAge} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Floor Number</label>
                  <input type="number" name="floorNumber" className="form-control" placeholder="Floor" value={formData.floorNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Total Floors</label>
                  <input type="number" name="totalFloors" className="form-control" placeholder="Total" value={formData.totalFloors} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Parking</label>
                  <select name="parking" className="form-control" value={formData.parking} onChange={handleChange}>
                    <option value="N/A">N/A</option>
                    <option value="Covered">Covered</option>
                    <option value="Open">Open</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Facing Direction</label>
                  <select name="facing" className="form-control" value={formData.facing} onChange={handleChange}>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Balconies</label>
                  <input type="number" name="balconies" className="form-control" value={formData.balconies} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Available From</label>
                  <input type="text" name="availableFrom" className="form-control" placeholder="Immediately/Date" value={formData.availableFrom} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* SECTION 4: LOCATION */}
            <section className="section-group">
              <h2 className="section-group-title">Location Information</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Address</label>
                  <input type="text" name="address" className="form-control" placeholder="Building, Street Name" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="number" name="pincode" className="form-control" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Google Maps Link</label>
                  <input type="text" name="map" className="form-control" placeholder="Map URL" value={formData.map} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* SECTION 5: AMENITIES */}
            <section className="section-group">
              <h2 className="section-group-title">Amenities</h2>
              <div className="amenities-grid">
                {amenitiesList.map(amenity => (
                  <label key={amenity} className={`amenity-item ${formData.amenities.includes(amenity) ? 'active' : ''}`}>
                    <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => handleAmenityChange(amenity)} style={{ display: 'none' }} />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* SECTION 6: MEDIA */}
            <section className="section-group">
              <h2 className="section-group-title">Property Media</h2>
              <div className="upload-box" onClick={() => document.getElementById('imageUpload').click()}>
                <input type="file" id="imageUpload" multiple accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                <FaRegImage size={24} color="#B2846B" />
                <p style={{ marginTop: '10px', fontSize: '13px' }}>Drag & drop or Click to upload photos</p>
              </div>
              {previews.length > 0 && (
                <div className="previews">
                  {previews.map((src, idx) => (
                    <div key={idx} className="preview-chip">
                      <img src={src} alt="Preview" />
                      <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); removeImage(idx); }}>&times;</button>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </form>

          {/* RIGHT COLUMN: LISTING SUMMARY */}
          <div className="summary-right">
            <div className="summary-card">
              <h3 className="summary-title">Listing Summary</h3>
              <div className="summary-item">
                <img
                  src={previews[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"}
                  alt="Property"
                  className="summary-img"
                />
                <div className="summary-info">
                  <h4>{formData.title || "Untitled Property"}</h4>
                  <p>{formData.type} • {formData.city || "Location TBA"}</p>
                  <p style={{ marginTop: '5px', color: '#B2846B' }}>{formData.beds || 0} BHK | {formData.area || 0} sqft</p>
                </div>
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Category</span>
                  <span style={{ fontWeight: '600' }}>{formData.category}</span>
                </div>
                <div className="summary-row">
                  <span>Verification Fee</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row">
                  <span>Listing Duration</span>
                  <span>Active (90 Days)</span>
                </div>
                <div className="summary-row total">
                  <span>Price</span>
<<<<<<< HEAD
                  <span>₹{Number(formData.price).toLocaleString()}</span>
=======
                  <span>{formData.price.toString().includes(" ") || formData.price.toString().toLowerCase().includes("cr") || formData.price.toString().toLowerCase().includes("l") ? formData.price : `₹${Number(formData.price).toLocaleString('en-IN')}`}</span>
>>>>>>> e85f1ae (nilam2)
                </div>
              </div>

              <button type="button" className="pay-btn" onClick={(e) => handleSubmit(e)} disabled={loading}>
                {loading ? (
                  <><ImSpinner2 className="animate-spin" /> Processing...</>
                ) : (
                  "List Property Now"
                )}
              </button>
              <p style={{ textAlign: 'center', fontSize: '11px', color: '#9a7060', marginTop: '15px' }}>
                By proceeding, I accept the Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
