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
    background: var(--gold-hover);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
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
    beds: "", baths: "", area: "", furnishingStatus: "Unfurnished", floorNumber: "",
    totalFloors: "", propertyAge: "", balconies: "", parking: "N/A", facing: "East",
    availableFrom: "", rentDuration: "month", address: "", city: "", state: "",
    pincode: "", map: "", mapEmbed: "", amenities: [],
    owner: { name: auth?.name || "", phone: auth?.phone || "", email: auth?.email || "", whatsapp: "" }
  });

  const amenitiesList = ["Parking", "Lift", "Security", "Garden", "Gym", "Swimming Pool", "Power Backup", "Balcony"];

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
      amenities: prev.amenities.includes(amenity) ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
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
      toast.info("Please login to list a property");
      return navigate("/login");
    }
    setLoading(true);
    try {
      const token = auth.token || localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'owner') {
          formDataToSend.append("sellerName", formData.owner.name);
          formDataToSend.append("phone", formData.owner.phone);
          formDataToSend.append("email", formData.owner.email);
        } else if (key === 'amenities') {
          formData.amenities.forEach(a => formDataToSend.append("amenities", a));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      imageFiles.forEach(file => formDataToSend.append("images", file));

      await axios.post("/api/sales/create", formDataToSend, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      toast.success("🎉 Property listed successfully!");
      navigate("/properties");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to list property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-property-container">
      <style>{css}</style>
      <div className="breadcrumbs">
        <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Home</Link>
        <span>/</span>
        <Link to="/menu" style={{color: 'inherit', textDecoration: 'none'}}>Menu</Link>
        <span>/</span>
        <span className="active">List Property</span>
      </div>

      <div className="sell-property-layout">
        <form className="form-left" onSubmit={handleSubmit}>
          <section className="section-group">
            <h2 className="section-group-title">Contact Information</h2>
            <div className="form-grid">
              <div className="form-group"><label>Seller Name</label><input type="text" name="owner.name" className="form-control" value={formData.owner.name} onChange={handleChange} required /></div>
              <div className="form-group"><label>Email Address</label><input type="email" name="owner.email" className="form-control" value={formData.owner.email} onChange={handleChange} required /></div>
              <div className="form-group"><label>Phone Number</label><input type="text" name="owner.phone" className="form-control" value={formData.owner.phone} onChange={handleChange} required /></div>
              <div className="form-group"><label>WhatsApp (Optional)</label><input type="text" name="owner.whatsapp" className="form-control" value={formData.owner.whatsapp} onChange={handleChange} /></div>
            </div>
          </section>

          <section className="section-group">
            <h2 className="section-group-title">Property Details</h2>
            <div className="form-grid">
              <div className="form-group full-width"><label>Listing Title</label><input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required /></div>
              <div className="form-group"><label>Property Type</label><select name="type" className="form-control" value={formData.type} onChange={handleChange}><option value="Apartment">Apartment</option><option value="House">House</option><option value="Villa">Villa</option><option value="Plot">Plot</option></select></div>
              <div className="form-group"><label>Category</label><select name="category" className="form-control" value={formData.category} onChange={handleChange}><option value="Buy">Sell</option><option value="Rent">Rent</option><option value="PerRent">Flexible</option></select></div>
              <div className="form-group"><label>Price (₹)</label><input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required /></div>
              <div className="form-group"><label>Area (sqft)</label><input type="number" name="area" className="form-control" value={formData.area} onChange={handleChange} required /></div>
            </div>
          </section>

          <section className="section-group">
            <h2 className="section-group-title">Amenities</h2>
            <div className="amenities-grid">
              {amenitiesList.map(a => (
                <label key={a} className={`amenity-item ${formData.amenities.includes(a) ? 'active' : ''}`}>
                  <input type="checkbox" checked={formData.amenities.includes(a)} onChange={() => handleAmenityChange(a)} style={{display: 'none'}} />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="section-group">
            <h2 className="section-group-title">Media</h2>
            <div className="upload-box" onClick={() => document.getElementById('imageUpload').click()}>
              <input type="file" id="imageUpload" multiple accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
              <FaRegImage size={24} />
              <p>Click to upload photos</p>
            </div>
            <div className="previews">
              {previews.map((src, idx) => (
                <div key={idx} className="preview-chip">
                  <img src={src} alt="Preview" />
                  <button type="button" className="remove-btn" onClick={() => removeImage(idx)}>&times;</button>
                </div>
              ))}
            </div>
          </section>
        </form>

        <div className="summary-right">
          <div className="summary-card">
            <h3 className="summary-title">Listing Summary</h3>
            <div className="summary-item">
              <img src={previews[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400"} alt="Property" className="summary-img" />
              <div className="summary-info"><h4>{formData.title || "Untitled"}</h4><p>{formData.type} • {formData.city || "Mumbai"}</p></div>
            </div>
            <div className="summary-row total"><span>Price</span><span>₹{Number(formData.price).toLocaleString()}</span></div>
            <button className="pay-btn" onClick={handleSubmit} disabled={loading}>{loading ? <ImSpinner2 className="animate-spin" /> : "List Property Now"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
