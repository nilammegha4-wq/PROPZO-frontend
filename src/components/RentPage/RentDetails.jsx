
// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import axios from "axios";

// // // // /* =============================
// // // //    SMALL REUSABLE COMPONENTS
// // // // ============================= */

// // // // const Card = ({ children }) => (
// // // //   <div
// // // //     style={{
// // // //       background: "#fff",
// // // //       padding: "20px",
// // // //       borderRadius: "12px",
// // // //       boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// // // //       marginBottom: "25px",
// // // //     }}
// // // //   >
// // // //     {children}
// // // //   </div>
// // // // );

// // // // const SectionTitle = ({ children }) => (
// // // //   <h2 style={{ marginBottom: "15px" }}>{children}</h2>
// // // // );

// // // // const Info = ({ label, value }) => (
// // // //   <div>
// // // //     <strong>{label}:</strong> {value || "N/A"}
// // // //   </div>
// // // // );

// // // // /* =============================
// // // //    RENT DETAILS COMPONENT
// // // // ============================= */

// // // // export default function RentDetails() {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();

// // // //   const [property, setProperty] = useState(null);
// // // //   const [mainImage, setMainImage] = useState("");
// // // //   const [showPrice, setShowPrice] = useState(false);

// // // //   useEffect(() => {
// // // //     window.scrollTo(0, 0);

// // // //     const fetchProperty = async () => {
// // // //       try {
// // // //         const res = await axios.get(`/api/properties/${id}`);
// // // //         setProperty(res.data);

// // // //         if (res.data.images?.length > 0) {
// // // //           setMainImage(res.data.images[0]);
// // // //         } else if (res.data.image) {
// // // //           setMainImage(res.data.image);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching property:", error);
// // // //       }
// // // //     };

// // // //     fetchProperty();
// // // //   }, [id]);

// // // //   useEffect(() => {
// // // //     const onScroll = () => {
// // // //       if (window.scrollY > 200) setShowPrice(true);
// // // //     };
// // // //     window.addEventListener("scroll", onScroll);
// // // //     return () => window.removeEventListener("scroll", onScroll);
// // // //   }, []);

// // // //   if (!property)
// // // //     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

// // // //   const avgRating =
// // // //     property.reviews?.length > 0
// // // //       ? (
// // // //           property.reviews.reduce((a, b) => a + b.rating, 0) /
// // // //           property.reviews.length
// // // //         ).toFixed(1)
// // // //       : 0;

// // // //   return (
// // // //     <div style={styles.page}>
// // // //       <div style={styles.header}>
// // // //         <button onClick={() => navigate(-1)} style={styles.backBtn}>
// // // //           ⬅ Back
// // // //         </button>
// // // //       </div>

// // // //       {/* MAIN IMAGE */}
// // // //       <img
// // // //         src={
// // // //           mainImage?.startsWith("http")
// // // //             ? mainImage
// // // //             : `${window.location.origin}/${mainImage}`
// // // //         }
// // // //         alt="Property"
// // // //         style={styles.heroImg}
// // // //       />

// // // //       {/* IMAGE THUMBNAILS */}
// // // //       {property.images?.length > 1 && (
// // // //         <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
// // // //           {property.images.map((img, i) => (
// // // //             <img
// // // //               key={i}
// // // //               src={
// // // //                 img.startsWith("http")
// // // //                   ? img
// // // //                   : `${window.location.origin}/${img}`
// // // //               }
// // // //               alt="thumb"
// // // //               style={{
// // // //                 width: "80px",
// // // //                 height: "60px",
// // // //                 objectFit: "cover",
// // // //                 borderRadius: "6px",
// // // //                 cursor: "pointer",
// // // //               }}
// // // //               onClick={() => setMainImage(img)}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       <div style={styles.container}>
// // // //         <div style={styles.left}>
// // // //           {/* PROPERTY OVERVIEW */}
// // // //           <Card>
// // // //             <SectionTitle>🏠 Property Overview</SectionTitle>
// // // //             <div style={styles.grid}>
// // // //               <Info label="Bedrooms" value={property.bedrooms} />
// // // //               <Info label="Bathrooms" value={property.bathrooms} />
// // // //               <Info label="Balconies" value={property.balconies} />
// // // //               <Info label="Area" value={property.area} />
// // // //               <Info label="Floor" value={property.floor} />
// // // //               <Info label="Parking" value={property.parking} />
// // // //               <Info label="Age" value={property.age} />
// // // //               <Info label="Facing" value={property.facing} />
// // // //               <Info label="Furnished" value={property.furnished} />
// // // //               <Info label="Available From" value={property.availableFrom} />
// // // //             </div>
// // // //           </Card>

// // // //           {/* DESCRIPTION */}
// // // //           <Card>
// // // //             <SectionTitle>📄 About Property</SectionTitle>
// // // //             <p>{property.description}</p>
// // // //           </Card>

// // // //           {/* AMENITIES */}
// // // //           {property.amenities && (
// // // //             <Card>
// // // //               <SectionTitle>✨ Amenities</SectionTitle>
// // // //               <div style={styles.amenities}>
// // // //                 {property.amenities.map((a, i) => (
// // // //                   <span key={i} style={styles.amenityTag}>
// // // //                     {a}
// // // //                   </span>
// // // //                 ))}
// // // //               </div>
// // // //             </Card>
// // // //           )}

// // // //           {/* MAP */}
// // // //           {property.mapEmbed && (
// // // //             <Card>
// // // //               <SectionTitle>📍 Location</SectionTitle>
// // // //               <iframe
// // // //                 src={property.mapEmbed}
// // // //                 width="100%"
// // // //                 height="300"
// // // //                 style={{ borderRadius: "12px", border: "0" }}
// // // //                 allowFullScreen=""
// // // //                 loading="lazy"
// // // //                 title="map"
// // // //               />
// // // //             </Card>
// // // //           )}

// // // //           {/* REVIEWS */}
// // // //           {property.reviews && (
// // // //             <Card>
// // // //               <SectionTitle>⭐ Reviews</SectionTitle>
// // // //               <h3>Average: {avgRating}</h3>
// // // //               {property.reviews.map((r, i) => (
// // // //                 <div key={i} style={styles.reviewCard}>
// // // //                   <strong>{r.name}</strong> ⭐{r.rating}
// // // //                   <p>{r.comment}</p>
// // // //                 </div>
// // // //               ))}
// // // //             </Card>
// // // //           )}
// // // //         </div>

// // // //         {/* RIGHT SIDE */}
// // // //         <div style={styles.right}>
// // // //           <div style={styles.priceCard}>
// // // //             <h3>Monthly Rent</h3>
// // // //             <h1>₹{property.price?.toLocaleString()}</h1>

// // // //             {property.owner && (
// // // //               <div style={{ marginTop: "20px" }}>
// // // //                 <h4>Owner Details</h4>
// // // //                 <div style={{ marginBottom: "10px" }}>
// // // //                   <strong>Name:</strong> {property.owner.name || "N/A"}
// // // //                 </div>
// // // //                 <div style={{ marginBottom: "10px" }}>
// // // //                   <strong>Phone:</strong> {property.owner.phone || "N/A"}
// // // //                 </div>
// // // //                 <div style={{ marginBottom: "10px" }}>
// // // //                   <strong>Email:</strong> {property.owner.email || "N/A"}
// // // //                 </div>
// // // //                 <div style={{ marginBottom: "10px" }}>
// // // //                   <strong>Experience:</strong> {property.owner.experience || "N/A"}
// // // //                 </div>
// // // //                 <div style={{ marginBottom: "10px" }}>
// // // //                   <strong>Rating:</strong> {property.owner.rating || "N/A"} ⭐
// // // //                 </div>
// // // //                 <div style={{ marginBottom: "10px" }}>
// // // //                   <strong>Total Listings:</strong> {property.owner.totalListings || 0}
// // // //                 </div>

// // // //                 <a
// // // //                   href={`tel:${property.owner.phone}`}
// // // //                   style={styles.callBtn}
// // // //                 >
// // // //                   📞 Call Owner
// // // //                 </a>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* =============================
// // // //    STYLES (UNCHANGED)
// // // // ============================= */

// // // // const styles = {
// // // //   page: { padding: "20px", background: "#f5f7fa" },
// // // //   header: { marginBottom: "20px" },
// // // //   backBtn: { padding: "8px 16px", cursor: "pointer" },
// // // //   heroImg: {
// // // //     width: "100%",
// // // //     height: "350px",
// // // //     objectFit: "cover",
// // // //     borderRadius: "12px",
// // // //     marginBottom: "30px",
// // // //   },
// // // //   container: { display: "flex", gap: "30px" },
// // // //   left: { flex: 2 },
// // // //   right: { flex: 1 },
// // // //   grid: {
// // // //     display: "grid",
// // // //     gridTemplateColumns: "repeat(2, 1fr)",
// // // //     gap: "10px",
// // // //   },
// // // //   amenities: {
// // // //     display: "flex",
// // // //     flexWrap: "wrap",
// // // //     gap: "10px",
// // // //   },
// // // //   amenityTag: {
// // // //     background: "#eee",
// // // //     padding: "6px 12px",
// // // //     borderRadius: "20px",
// // // //   },
// // // //   reviewCard: {
// // // //     borderTop: "1px solid #eee",
// // // //     marginTop: "10px",
// // // //     paddingTop: "10px",
// // // //   },
// // // //   priceCard: {
// // // //     position: "sticky",
// // // //     top: "100px",
// // // //     padding: "20px",
// // // //     background: "#fff",
// // // //     borderRadius: "12px",
// // // //     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// // // //   },
// // // //   callBtn: {
// // // //     display: "block",
// // // //     marginTop: "10px",
// // // //     padding: "10px",
// // // //     background: "#28a745",
// // // //     color: "white",
// // // //     textAlign: "center",
// // // //     borderRadius: "6px",
// // // //     textDecoration: "none",
// // // //   },
// // // // };

// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import axios from "axios";

// // // export default function RentDetails() {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();

// // //   const [property, setProperty] = useState(null);
// // //   const [mainImage, setMainImage] = useState("");

// // //   useEffect(() => {
// // //     const fetchProperty = async () => {
// // //       try {
// // //         const res = await axios.get(
// // //           `http://localhost:5000/api/properties/${id}`
// // //         );

// // //         setProperty(res.data);

// // //         if (res.data.images?.length > 0) {
// // //           setMainImage(res.data.images[0]);
// // //         } else if (res.data.image) {
// // //           setMainImage(res.data.image);
// // //         }
// // //       } catch (error) {
// // //         console.error(error);
// // //       }
// // //     };

// // //     fetchProperty();
// // //   }, [id]);

// // //   if (!property) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

// // //   const getPriceLabel = () => {
// // //     if (property.category === "Buy") return "Price";
// // //     if (property.category === "Rent") return "Per Month";
// // //     if (property.category === "PerRent")
// // //       return `Per ${property.rentDuration}`;
// // //     return "Price";
// // //   };

// // //   return (
// // //     <div style={styles.page}>
// // //       <button onClick={() => navigate(-1)} style={styles.backBtn}>
// // //         ⬅ Back
// // //       </button>

// // //       {/* MAIN IMAGE */}
// // //       {mainImage && (
// // //         <img
// // //           src={
// // //             mainImage.startsWith("http")
// // //               ? mainImage
// // //               : `http://localhost:5000/${mainImage}`
// // //           }
// // //           alt="Property"
// // //           style={styles.heroImg}
// // //         />
// // //       )}

// // //       {/* THUMBNAILS */}
// // //       {property.images?.length > 1 && (
// // //         <div style={styles.thumbnailContainer}>
// // //           {property.images.map((img, i) => (
// // //             <img
// // //               key={i}
// // //               src={
// // //                 img.startsWith("http")
// // //                   ? img
// // //                   : `http://localhost:5000/${img}`
// // //               }
// // //               alt="thumb"
// // //               style={styles.thumb}
// // //               onClick={() => setMainImage(img)}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}

// // //       <div style={styles.container}>
// // //         <div style={styles.left}>
// // //           {/* PROPERTY OVERVIEW */}
// // //           <div style={styles.card}>
// // //             <h2>🏠 Property Overview</h2>

// // //             <div style={styles.grid}>
// // //               <Info label="Location" value={property.location} />
// // //               <Info label="Type" value={property.type} />
// // //               <Info label="Beds" value={property.beds} />
// // //               <Info label="Baths" value={property.baths} />
// // //               <Info label="Size" value={property.size} />
// // //               <Info label="Bedrooms" value={property.bedrooms} />
// // //               <Info label="Bathrooms" value={property.bathrooms} />
// // //               <Info label="Balconies" value={property.balconies} />
// // //               <Info label="Area" value={property.area} />
// // //               <Info label="Floor" value={property.floor} />
// // //               <Info label="Furnished" value={property.furnished} />
// // //               <Info label="Facing" value={property.facing} />
// // //               <Info label="Available From" value={property.availableFrom} />
// // //               <Info label="Rent Duration" value={property.rentDuration} />
// // //             </div>
// // //           </div>

// // //           {/* DESCRIPTION */}
// // //           <div style={styles.card}>
// // //             <h2>📄 About Property</h2>
// // //             <p>{property.description}</p>
// // //           </div>

// // //           {/* AMENITIES */}
// // //           {property.amenities?.length > 0 && (
// // //             <div style={styles.card}>
// // //               <h2>✨ Amenities</h2>
// // //               <div style={styles.amenities}>
// // //                 {property.amenities.map((a, i) => (
// // //                   <span key={i} style={styles.amenityTag}>
// // //                     {a}
// // //                   </span>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* MAP */}
// // //           {property.map && (
// // //             <div style={styles.card}>
// // //               <h2>📍 Location</h2>
// // //               <iframe
// // //                 src={property.map}
// // //                 width="100%"
// // //                 height="300"
// // //                 style={{ borderRadius: "10px", border: "0" }}
// // //                 loading="lazy"
// // //                 title="map"
// // //               />
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* RIGHT SIDE PRICE */}
// // //         <div style={styles.right}>
// // //           <div style={styles.priceCard}>
// // //             <h3>{getPriceLabel()}</h3>
// // //             <h1>₹{property.price?.toLocaleString()}</h1>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* SMALL COMPONENT */
// // // const Info = ({ label, value }) => (
// // //   <div>
// // //     <strong>{label}:</strong> {value || "N/A"}
// // //   </div>
// // // );

// // // /* CSS */
// // // const styles = {
// // //   page: { padding: "30px", background: "#f5f7fa" },
// // //   backBtn: { padding: "8px 16px", marginBottom: "20px", cursor: "pointer" },
// // //   heroImg: {
// // //     width: "100%",
// // //     height: "350px",
// // //     objectFit: "cover",
// // //     borderRadius: "12px",
// // //     marginBottom: "20px",
// // //   },
// // //   thumbnailContainer: {
// // //     display: "flex",
// // //     gap: "10px",
// // //     marginBottom: "20px",
// // //   },
// // //   thumb: {
// // //     width: "80px",
// // //     height: "60px",
// // //     objectFit: "cover",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //   },
// // //   container: { display: "flex", gap: "30px" },
// // //   left: { flex: 2 },
// // //   right: { flex: 1 },
// // //   grid: {
// // //     display: "grid",
// // //     gridTemplateColumns: "repeat(2, 1fr)",
// // //     gap: "10px",
// // //   },
// // //   card: {
// // //     background: "#fff",
// // //     padding: "20px",
// // //     borderRadius: "12px",
// // //     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// // //     marginBottom: "25px",
// // //   },
// // //   amenities: { display: "flex", flexWrap: "wrap", gap: "10px" },
// // //   amenityTag: {
// // //     background: "#eee",
// // //     padding: "6px 12px",
// // //     borderRadius: "20px",
// // //   },
// // //   priceCard: {
// // //     position: "sticky",
// // //     top: "100px",
// // //     padding: "20px",
// // //     background: "#fff",
// // //     borderRadius: "12px",
// // //     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// // //   },
// // // };


// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // /* =============================
// //    SMALL COMPONENTS
// // ============================= */

// // const Card = ({ children }) => (
// //   <div style={styles.card}>{children}</div>
// // );

// // const SectionTitle = ({ children }) => (
// //   <h2 style={{ marginBottom: "15px" }}>{children}</h2>
// // );

// // const Info = ({ label, value }) => (
// //   <div>
// //     <strong>{label}:</strong> {value || "N/A"}
// //   </div>
// // );

// // /* =============================
// //    MAIN COMPONENT
// // ============================= */

// // export default function RentDetails() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [property, setProperty] = useState(null);
// //   const [mainImage, setMainImage] = useState("");

// //   useEffect(() => {
// //     window.scrollTo(0, 0);

// //     const fetchProperty = async () => {
// //       try {
// //         const res = await axios.get(`/api/properties/${id}`);
// //         setProperty(res.data);

// //         if (res.data.images?.length > 0) {
// //           setMainImage(res.data.images[0]);
// //         } else if (res.data.image) {
// //           setMainImage(res.data.image);
// //         }
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchProperty();
// //   }, [id]);

// //   if (!property)
// //     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

// //   const avgRating =
// //     property.reviews?.length > 0
// //       ? (
// //           property.reviews.reduce((a, b) => a + b.rating, 0) /
// //           property.reviews.length
// //         ).toFixed(1)
// //       : 0;

// //   const getPriceLabel = () => {
// //     if (property.category === "Buy") return "Price";
// //     if (property.category === "Rent") return "Per Month";
// //     if (property.category === "PerRent")
// //       return `Per ${property.rentDuration}`;
// //     return "Price";
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <button onClick={() => navigate(-1)} style={styles.backBtn}>
// //         ⬅ Back
// //       </button>

// //       {/* MAIN IMAGE */}
// //       {mainImage && (
// //         <img
// //           src={
// //             mainImage.startsWith("http")
// //               ? mainImage
// //               : `${window.location.origin}/${mainImage}`
// //           }
// //           alt="Property"
// //           style={styles.heroImg}
// //         />
// //       )}

// //       {/* IMAGE THUMBNAILS */}
// //       {property.images?.length > 1 && (
// //         <div style={styles.thumbContainer}>
// //           {property.images.map((img, i) => (
// //             <img
// //               key={i}
// //               src={
// //                 img.startsWith("http")
// //                   ? img
// //                   : `${window.location.origin}/${img}`
// //               }
// //               alt="thumb"
// //               style={styles.thumb}
// //               onClick={() => setMainImage(img)}
// //             />
// //           ))}
// //         </div>
// //       )}

// //       <div style={styles.container}>
// //         <div style={styles.left}>
// //           {/* OVERVIEW */}
// //           <Card>
// //             <SectionTitle>🏠 Property Overview</SectionTitle>
// //             <div style={styles.grid}>
// //               <Info label="Beds" value={property.beds} />
// //               <Info label="Baths" value={property.baths} />
// //               <Info label="Balconies" value={property.balconies} />
// //               <Info label="Area" value={property.area} />
// //               <Info label="Floor" value={property.floor} />
// //               <Info label="Parking" value={property.parking} />
// //               <Info label="Age" value={property.age} />
// //               <Info label="Facing" value={property.facing} />
// //               <Info label="Furnished" value={property.furnished} />
// //               <Info label="Available From" value={property.availableFrom} />
// //               <Info label="Rent Duration" value={property.rentDuration} />
// //             </div>
// //           </Card>

// //           {/* DESCRIPTION */}
// //           <Card>
// //             <SectionTitle>📄 About Property</SectionTitle>
// //             <p>{property.description}</p>
// //           </Card>

// //           {/* AMENITIES */}
// //           {property.amenities?.length > 0 && (
// //             <Card>
// //               <SectionTitle>✨ Amenities</SectionTitle>
// //               <div style={styles.amenities}>
// //                 {property.amenities.map((a, i) => (
// //                   <span key={i} style={styles.amenityTag}>
// //                     {a}
// //                   </span>
// //                 ))}
// //               </div>
// //             </Card>
// //           )}

// //           {/* MAP */}
// //           {property.mapEmbed && (
// //             <Card>
// //               <SectionTitle>📍 Location</SectionTitle>
// //               <iframe
// //                 src={property.mapEmbed}
// //                 width="100%"
// //                 height="300"
// //                 style={{ borderRadius: "12px", border: "0" }}
// //                 loading="lazy"
// //                 title="map"
// //               />
// //             </Card>
// //           )}

// //           {/* REVIEWS */}
// //           {property.reviews?.length > 0 && (
// //             <Card>
// //               <SectionTitle>⭐ Reviews</SectionTitle>
// //               <h3>Average: {avgRating}</h3>
// //               {property.reviews.map((r, i) => (
// //                 <div key={i} style={styles.reviewCard}>
// //                   <strong>{r.name}</strong> ⭐{r.rating}
// //                   <p>{r.comment}</p>
// //                 </div>
// //               ))}
// //             </Card>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE */}
// //         <div style={styles.right}>
// //           <div style={styles.priceCard}>
// //             <h3>{getPriceLabel()}</h3>
// //             <h1>₹{property.price?.toLocaleString()}</h1>

// //             {property.owner && (
// //               <div style={{ marginTop: "20px" }}>
// //                 <h4>Owner Details</h4>
// //                 <Info label="Name" value={property.owner.name} />
// //                 <Info label="Phone" value={property.owner.phone} />
// //                 <Info label="Email" value={property.owner.email} />
// //                 <Info label="Experience" value={property.owner.experience} />
// //                 <Info label="Rating" value={property.owner.rating} />
// //                 <Info
// //                   label="Total Listings"
// //                   value={property.owner.totalListings}
// //                 />

// //                 <a
// //                   href={`tel:${property.owner.phone}`}
// //                   style={styles.callBtn}
// //                 >
// //                   📞 Call Owner
// //                 </a>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* =============================
// //    STYLES
// // ============================= */

// // const styles = {
// //   page: { padding: "20px", background: "#f5f7fa" },
// //   backBtn: { padding: "8px 16px", marginBottom: "20px" },
// //   heroImg: {
// //     width: "100%",
// //     height: "350px",
// //     objectFit: "cover",
// //     borderRadius: "12px",
// //     marginBottom: "20px",
// //   },
// //   thumbContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
// //   thumb: {
// //     width: "80px",
// //     height: "60px",
// //     objectFit: "cover",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //   },
// //   container: { display: "flex", gap: "30px" },
// //   left: { flex: 2 },
// //   right: { flex: 1 },
// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(2, 1fr)",
// //     gap: "10px",
// //   },
// //   card: {
// //     background: "#fff",
// //     padding: "20px",
// //     borderRadius: "12px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// //     marginBottom: "25px",
// //   },
// //   amenities: { display: "flex", flexWrap: "wrap", gap: "10px" },
// //   amenityTag: {
// //     background: "#eee",
// //     padding: "6px 12px",
// //     borderRadius: "20px",
// //   },
// //   reviewCard: {
// //     borderTop: "1px solid #eee",
// //     marginTop: "10px",
// //     paddingTop: "10px",
// //   },
// //   priceCard: {
// //     position: "sticky",
// //     top: "100px",
// //     padding: "20px",
// //     background: "#fff",
// //     borderRadius: "12px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// //   },
// //   callBtn: {
// //     display: "block",
// //     marginTop: "10px",
// //     padding: "10px",
// //     background: "#28a745",
// //     color: "white",
// //     textAlign: "center",
// //     borderRadius: "6px",
// //     textDecoration: "none",
// //   },
// // };



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// /* =============================
//    SMALL COMPONENTS
// ============================= */

// const Card = ({ children }) => (
//   <div style={styles.card}>{children}</div>
// );

// const SectionTitle = ({ children }) => (
//   <h2 style={{ marginBottom: "15px" }}>{children}</h2>
// );

// const Info = ({ label, value }) => (
//   <div>
//     <strong>{label}:</strong> {value || "N/A"}
//   </div>
// );

// /* =============================
//    MAIN COMPONENT
// ============================= */

// export default function RentDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [mainImage, setMainImage] = useState("");

//   /* =============================
//      LOAD RAZORPAY SCRIPT
//   ============================= */
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   /* =============================
//      FETCH PROPERTY
//   ============================= */
//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchProperty = async () => {
//       try {
//         const res = await axios.get(`/api/properties/${id}`);
//         setProperty(res.data);

//         if (res.data.images?.length > 0) {
//           setMainImage(res.data.images[0]);
//         } else if (res.data.image) {
//           setMainImage(res.data.image);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProperty();
//   }, [id]);

//   /* =============================
//      PAYMENT FUNCTION
//   ============================= */
//   const handlePayment = async () => {
//     try {
//       const { data } = await axios.post("/api/payment/create-order", {
//         amount: property.price * 100, // convert to paise
//       });

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID, // or paste key directly
//         amount: data.order.amount,
//         currency: "INR",
//         name: "Property Booking",
//         description: property.title || "Rent Payment",
//         order_id: data.order.id,
//         handler: function (response) {
//           alert("Payment Successful ✅");
//           console.log("Payment Response:", response);
//         },
//         prefill: {
//           name: property.owner?.name || "",
//           email: property.owner?.email || "",
//           contact: property.owner?.phone || "",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error(error);
//       alert("Payment Failed ❌");
//     }
//   };

//   if (!property)
//     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

//   const avgRating =
//     property.reviews?.length > 0
//       ? (
//           property.reviews.reduce((a, b) => a + b.rating, 0) /
//           property.reviews.length
//         ).toFixed(1)
//       : 0;

//   const getPriceLabel = () => {
//     if (property.category === "Buy") return "Price";
//     if (property.category === "Rent") return "Per Month";
//     if (property.category === "PerRent")
//       return `Per ${property.rentDuration}`;
//     return "Price";
//   };

//   return (
//     <div style={styles.page}>
//       <button onClick={() => navigate(-1)} style={styles.backBtn}>
//         ⬅ Back
//       </button>

//       {/* MAIN IMAGE */}
//       {mainImage && (
//         <img
//           src={
//             mainImage.startsWith("http")
//               ? mainImage
//               : `${window.location.origin}/${mainImage}`
//           }
//           alt="Property"
//           style={styles.heroImg}
//         />
//       )}

//       {/* IMAGE THUMBNAILS */}
//       {property.images?.length > 1 && (
//         <div style={styles.thumbContainer}>
//           {property.images.map((img, i) => (
//             <img
//               key={i}
//               src={
//                 img.startsWith("http")
//                   ? img
//                   : `${window.location.origin}/${img}`
//               }
//               alt="thumb"
//               style={styles.thumb}
//               onClick={() => setMainImage(img)}
//             />
//           ))}
//         </div>
//       )}

//       <div style={styles.container}>
//         <div style={styles.left}>
//           <Card>
//             <SectionTitle>🏠 Property Overview</SectionTitle>
//             <div style={styles.grid}>
//               <Info label="Beds" value={property.beds} />
//               <Info label="Baths" value={property.baths} />
//               <Info label="Balconies" value={property.balconies} />
//               <Info label="Area" value={property.area} />
//               <Info label="Floor" value={property.floor} />
//               <Info label="Parking" value={property.parking} />
//               <Info label="Age" value={property.age} />
//               <Info label="Facing" value={property.facing} />
//               <Info label="Furnished" value={property.furnished} />
//               <Info label="Available From" value={property.availableFrom} />
//               <Info label="Rent Duration" value={property.rentDuration} />
//             </div>
//           </Card>

//           <Card>
//             <SectionTitle>📄 About Property</SectionTitle>
//             <p>{property.description}</p>
//           </Card>

//           {property.amenities?.length > 0 && (
//             <Card>
//               <SectionTitle>✨ Amenities</SectionTitle>
//               <div style={styles.amenities}>
//                 {property.amenities.map((a, i) => (
//                   <span key={i} style={styles.amenityTag}>
//                     {a}
//                   </span>
//                 ))}
//               </div>
//             </Card>
//           )}

//           {property.mapEmbed && (
//             <Card>
//               <SectionTitle>📍 Location</SectionTitle>
//               <iframe
//                 src={property.mapEmbed}
//                 width="100%"
//                 height="300"
//                 style={{ borderRadius: "12px", border: "0" }}
//                 loading="lazy"
//                 title="map"
//               />
//             </Card>
//           )}

//           {property.reviews?.length > 0 && (
//             <Card>
//               <SectionTitle>⭐ Reviews</SectionTitle>
//               <h3>Average: {avgRating}</h3>
//               {property.reviews.map((r, i) => (
//                 <div key={i} style={styles.reviewCard}>
//                   <strong>{r.name}</strong> ⭐{r.rating}
//                   <p>{r.comment}</p>
//                 </div>
//               ))}
//             </Card>
//           )}
//         </div>

//         {/* RIGHT SIDE */}
//         <div style={styles.right}>
//           <div style={styles.priceCard}>
//             <h3>{getPriceLabel()}</h3>
//             <h1>₹{property.price?.toLocaleString()}</h1>

//             {/* PAYMENT BUTTON */}
//             <button
//               onClick={handlePayment}
//               style={{
//                 marginTop: "15px",
//                 padding: "12px",
//                 width: "100%",
//                 background: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//               }}
//             >
//               💳 Pay Now
//             </button>

//             {property.owner && (
//               <div style={{ marginTop: "20px" }}>
//                 <h4>Owner Details</h4>
//                 <Info label="Name" value={property.owner.name} />
//                 <Info label="Phone" value={property.owner.phone} />
//                 <Info label="Email" value={property.owner.email} />
//                 <Info label="Experience" value={property.owner.experience} />
//                 <Info label="Rating" value={property.owner.rating} />
//                 <Info
//                   label="Total Listings"
//                   value={property.owner.totalListings}
//                 />

//                 <a
//                   href={`tel:${property.owner.phone}`}
//                   style={styles.callBtn}
//                 >
//                   📞 Call Owner
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =============================
//    STYLES
// ============================= */

// const styles = {
//   page: { padding: "20px", background: "#f5f7fa" },
//   backBtn: { padding: "8px 16px", marginBottom: "20px" },
//   heroImg: {
//     width: "100%",
//     height: "350px",
//     objectFit: "cover",
//     borderRadius: "12px",
//     marginBottom: "20px",
//   },
//   thumbContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
//   thumb: {
//     width: "80px",
//     height: "60px",
//     objectFit: "cover",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   container: { display: "flex", gap: "30px" },
//   left: { flex: 2 },
//   right: { flex: 1 },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "10px",
//   },
//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//     marginBottom: "25px",
//   },
//   amenities: { display: "flex", flexWrap: "wrap", gap: "10px" },
//   amenityTag: {
//     background: "#eee",
//     padding: "6px 12px",
//     borderRadius: "20px",
//   },
//   reviewCard: {
//     borderTop: "1px solid #eee",
//     marginTop: "10px",
//     paddingTop: "10px",
//   },
//   priceCard: {
//     position: "sticky",
//     top: "100px",
//     padding: "20px",
//     background: "#fff",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//   },
//   callBtn: {
//     display: "block",
//     marginTop: "10px",
//     padding: "10px",
//     background: "#28a745",
//     color: "white",
//     textAlign: "center",
//     borderRadius: "6px",
//     textDecoration: "none",
//   },
// };

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../config";

/* =============================
   SMALL COMPONENTS
============================= */

const Card = ({ children }) => (
  <div style={styles.card}>{children}</div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ marginBottom: "15px" }}>{children}</h2>
);

const Info = ({ label, value }) => (
  <div>
    <strong>{label}:</strong> {value || "N/A"}
  </div>
);

/* =============================
   MAIN COMPONENT
============================= */

export default function RentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");

  /* =============================
     FETCH PROPERTY
  ============================= */
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setProperty(res.data);

        if (res.data.images?.length > 0) {
          setMainImage(res.data.images[0]);
        } else if (res.data.image) {
          setMainImage(res.data.image);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperty();
  }, [id]);

  /* =============================
     GO TO PAYMENT PAGE
  ============================= */
  const handlePaymentPage = () => {
    navigate(`/paynow/${property._id}`);
  };

  if (!property)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  const avgRating =
    property.reviews?.length > 0
      ? (
        property.reviews.reduce((a, b) => a + b.rating, 0) /
        property.reviews.length
      ).toFixed(1)
      : 0;

  const getPriceLabel = () => {
    if (property.category === "Buy") return "Price";
    if (property.category === "Rent") return "Per Month";
    if (property.category === "PerRent")
      return `Per ${property.rentDuration}`;
    return "Price";
  };

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ⬅ Back
      </button>

      {/* MAIN IMAGE */}
      {mainImage && (
        <img
          src={getImageUrl(mainImage)}
          alt="Property"
          style={styles.heroImg}
        />
      )}

      {/* IMAGE THUMBNAILS */}
      {property.images?.length > 1 && (
        <div style={styles.thumbContainer}>
          {property.images.map((img, i) => (
            <img
              key={i}
              src={getImageUrl(img)}
              alt="thumb"
              style={styles.thumb}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      <div style={styles.container}>
        <div style={styles.left}>
          {/* OVERVIEW */}
          <Card>
            <SectionTitle>🏠 Property Overview</SectionTitle>
            <div style={styles.grid}>
              <Info label="Beds" value={property.beds} />
              <Info label="Baths" value={property.baths} />
              <Info label="Balconies" value={property.balconies} />
              <Info label="Area" value={property.area} />
              <Info label="Floor" value={property.floor} />
              <Info label="Parking" value={property.parking} />
              <Info label="Age" value={property.age} />
              <Info label="Facing" value={property.facing} />
              <Info label="Furnished" value={property.furnished} />
              <Info label="Available From" value={property.availableFrom} />
              <Info label="Rent Duration" value={property.rentDuration} />
            </div>
          </Card>

          {/* DESCRIPTION */}
          <Card>
            <SectionTitle>📄 About Property</SectionTitle>
            <p>{property.description}</p>
          </Card>

          {/* AMENITIES */}
          {property.amenities?.length > 0 && (
            <Card>
              <SectionTitle>✨ Amenities</SectionTitle>
              <div style={styles.amenities}>
                {property.amenities.map((a, i) => (
                  <span key={i} style={styles.amenityTag}>
                    {a}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* MAP */}
          {property.mapEmbed && (
            <Card>
              <SectionTitle>📍 Location</SectionTitle>
              <iframe
                src={property.mapEmbed}
                width="100%"
                height="300"
                style={{ borderRadius: "12px", border: "0" }}
                loading="lazy"
                title="map"
              />
            </Card>
          )}

          {/* REVIEWS */}
          {property.reviews?.length > 0 && (
            <Card>
              <SectionTitle>⭐ Reviews</SectionTitle>
              <h3>Average: {avgRating}</h3>
              {property.reviews.map((r, i) => (
                <div key={i} style={styles.reviewCard}>
                  <strong>{r.name}</strong> ⭐{r.rating}
                  <p>{r.comment}</p>
                </div>
              ))}
            </Card>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <div style={styles.priceCard}>
            <h3>{getPriceLabel()}</h3>
            <h1>
              {property.price && property.price > 0
                ? `₹${property.price.toLocaleString()}`
                : "Price Not Available"}
            </h1>

            {/* RENTAL APPOINTMENT BUTTON */}
            <button
              onClick={() => navigate(`/book-rental-appointment/${property._id}`)}
              style={{
                marginTop: "15px",
                padding: "12px",
                width: "100%",
                background: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "background 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.background = "#1e293b"}
              onMouseOut={(e) => e.target.style.background = "#0f172a"}
            >
              📅 Book Appointment
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================
   STYLES
============================= */

const styles = {
  page: { padding: "20px", background: "#f5f7fa" },
  backBtn: { padding: "8px 16px", marginBottom: "20px" },
  heroImg: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  thumbContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
  thumb: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer",
  },
  container: { display: "flex", gap: "30px" },
  left: { flex: 2 },
  right: { flex: 1 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "25px",
  },
  amenities: { display: "flex", flexWrap: "wrap", gap: "10px" },
  amenityTag: {
    background: "#eee",
    padding: "6px 12px",
    borderRadius: "20px",
  },
  reviewCard: {
    borderTop: "1px solid #eee",
    marginTop: "10px",
    paddingTop: "10px",
  },
  priceCard: {
    position: "sticky",
    top: "100px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  callBtn: {
    display: "block",
    marginTop: "10px",
    padding: "10px",
    background: "#28a745",
    color: "white",
    textAlign: "center",
    borderRadius: "6px",
    textDecoration: "none",
  },
};