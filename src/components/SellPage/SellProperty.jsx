import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./SellProperty.css";
import { toast } from "react-toastify";
import {
  FaRegBuilding,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaList,
  FaRegImage,
  FaRegUser,
  FaCheckCircle,
  FaArrowRight,
  FaTimes
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

export default function SellProperty() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    /* SECTION 1 */
    title: "",
    type: "Apartment",
    category: "Buy",
    price: "",
    description: "",

    /* SECTION 2 */
    beds: "",
    baths: "",
    area: "",
    furnishingStatus: "Unfurnished",
    floorNumber: "",
    totalFloors: "",
    propertyAge: "",
    balconies: "",
    parking: "N/A",
    facing: "East",
    availableFrom: "",
    rentDuration: "month",

    /* SECTION 3 */
    address: "",
    city: "",
    state: "",
    pincode: "",
    map: "",
    mapEmbed: "",

    /* SECTION 4 */
    amenities: [],

    /* SECTION 6 */
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
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

    setLoading(true);
    try {
      const token = auth.token || localStorage.getItem("token");

      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("propertyType", formData.category); // Map category ("Buy", "Rent", "PerRent") to propertyType
      formDataToSend.append("category", formData.category);
      formDataToSend.append("type", formData.type); // Building type (Apartment, etc.)
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

      // Append amenities as array
      formData.amenities.forEach(amenity => {
        formDataToSend.append("amenities", amenity);
      });

      // Append actual files
      imageFiles.forEach(file => {
        formDataToSend.append("images", file);
      });

      await axios.post("/api/sales/create", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("🎉 Property listed successfully with images!");
      navigate("/properties");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to list property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-property-container">
      <div className="form-header">
        <h1>Sell Your Property</h1>
        <p>Fill in the details below to list your property on PropZo and reach thousands of buyers.</p>
      </div>

      <form className="sell-property-form" onSubmit={handleSubmit}>

        {/* SECTION 1: BASIC INFO */}
        <section className="form-section section-1">
          <div className="section-title">
            <span><FaRegBuilding /></span>
            <h2>Basic Property Information</h2>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Property Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g. Modern 3BHK Villa with Private Pool"
                value={formData.title}
                onChange={handleChange}
                required
              />
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
                <option value="Buy">Buy / Sell</option>
                <option value="Rent">Rent</option>
                <option value="PerRent">Per-Rent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Total Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Property Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Describe your property's best features..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROPERTY DETAILS */}
        <section className="form-section section-2">
          <div className="section-title">
            <span><FaInfoCircle /></span>
            <h2>Property Details</h2>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>BHK</label>
              <input type="number" name="beds" className="form-control" placeholder="No. of Bedrooms" value={formData.beds} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input type="number" name="baths" className="form-control" placeholder="No. of Bathrooms" value={formData.baths} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Area (sqft)</label>
              <input type="number" name="area" className="form-control" placeholder="Total Area" value={formData.area} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Furnishing Status</label>
              <select name="furnishingStatus" className="form-control" value={formData.furnishingStatus} onChange={handleChange}>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div className="form-group">
              <label>Floor Number</label>
              <input type="number" name="floorNumber" className="form-control" placeholder="e.g. 5" value={formData.floorNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Total Floors</label>
              <input type="number" name="totalFloors" className="form-control" placeholder="e.g. 15" value={formData.totalFloors} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Property Age</label>
              <input type="text" name="propertyAge" className="form-control" placeholder="e.g. 2 Years" value={formData.propertyAge} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Balconies</label>
              <input type="number" name="balconies" className="form-control" placeholder="No. of Balconies" value={formData.balconies} onChange={handleChange} />
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
              <label>Facing</label>
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
              <label>Available From</label>
              <input type="text" name="availableFrom" className="form-control" placeholder="e.g. Immediately or Date" value={formData.availableFrom} onChange={handleChange} />
            </div>
            {formData.category !== "Buy" && (
              <div className="form-group">
                <label>Rent Duration</label>
                <select name="rentDuration" className="form-control" value={formData.rentDuration} onChange={handleChange}>
                  <option value="hour">Per Hour</option>
                  <option value="day">Per Day</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: LOCATION */}
        <section className="form-section section-3">
          <div className="section-title">
            <span><FaMapMarkerAlt /></span>
            <h2>Location Details</h2>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Full Address</label>
              <input type="text" name="address" className="form-control" placeholder="Street, Building Name" value={formData.address} onChange={handleChange} required />
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
              <label>Google Maps Link (Optional)</label>
              <input type="text" name="map" className="form-control" placeholder="https://maps.app.goo.gl/..." value={formData.map} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Google Maps Embed URL (Optional)</label>
              <input type="text" name="mapEmbed" className="form-control" placeholder="https://www.google.com/maps/embed?..." value={formData.mapEmbed} onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* SECTION 4: AMENITIES */}
        <section className="form-section section-4">
          <div className="section-title">
            <span><FaList /></span>
            <h2>Amenities</h2>
          </div>
          <div className="amenities-grid">
            {amenitiesList.map(amenity => (
              <label key={amenity} className={`amenity-item ${formData.amenities.includes(amenity) ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </section>

        {/* SECTION 5: IMAGES */}
        <section className="form-section section-5">
          <div className="section-title">
            <span><FaRegImage /></span>
            <h2>Property Images</h2>
          </div>
          <div className="upload-container" onClick={() => document.getElementById('imageUpload').click()}>
            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <div className="upload-icon"><FaRegImage /></div>
            <div className="upload-text">
              <p><strong>Click to upload</strong> or drag and drop</p>
              <p>Supported: JPG, PNG, WEBP (Max 5MB per image)</p>
            </div>
          </div>

          {previews.length > 0 && (
            <div className="image-preview-grid">
              {previews.map((src, index) => (
                <div key={index} className="preview-item">
                  <img src={src} alt={`Preview ${index}`} />
                  <button type="button" className="remove-img-btn" onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}>
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 6: SELLER INFO */}
        <section className="form-section section-6">
          <div className="section-title">
            <span><FaRegUser /></span>
            <h2>Seller Information</h2>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Seller Name</label>
              <input type="text" name="owner.name" className="form-control" value={formData.owner.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="owner.phone" className="form-control" value={formData.owner.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="owner.email" className="form-control" value={formData.owner.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>WhatsApp Number (Optional)</label>
              <input type="text" name="owner.whatsapp" className="form-control" placeholder="WhatsApp Number" value={formData.owner.whatsapp} onChange={handleChange} />
            </div>
          </div>
        </section>

        <div className="form-footer">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <><ImSpinner2 className="animate-spin" /> Submitting...</>
            ) : (
              <><FaCheckCircle /> List Property Today <FaArrowRight size={18} /></>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
