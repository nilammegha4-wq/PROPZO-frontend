import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


export default function BookingPage() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [method, setMethod] = useState("Online");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showSimulatedGateway, setShowSimulatedGateway] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  // Fetch Property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load property");
        navigate("/properties");
      }
    };

    fetchProperty();
  }, [id, navigate]);

  // Handle Payment Initiation
  const handleInitiatePayment = async () => {
    try {
      setProcessing(true);

      if (!auth || !auth.token) {
        alert("You must be logged in to buy a property.");
        navigate("/login");
        setProcessing(false);
        return;
      }

      // Generate costs
      const gst = property.price * 0.05;
      const stampDuty = property.price * 0.06;
      const registration = property.price * 0.01;
      const finalTotal = property.price + gst + stampDuty + registration;

      const payload = {
        amount: finalTotal,
        method,
        propertyId: id,
      };

      const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
      };

      const res = await axios.post("http://localhost:5000/api/payments/create", payload, config);

      if (res.data.success) {
        setPendingOrder({
          paymentId: res.data.paymentId,
          orderId: res.data.order.id,
          amount: res.data.order.amount
        });
        setProcessing(false);
        setShowSimulatedGateway(true);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Payment Initiation Failed ❌");
      setProcessing(false);
    }
  };

  // Handle Verification (Simulating Gateway callback)
  const handleGatewaySuccess = async () => {
    try {
      setProcessing(true);
      const verifyPayload = {
        paymentId: pendingOrder.paymentId,
        razorpayOrderId: pendingOrder.orderId,
        razorpayPaymentId: "sim_pay_" + Math.floor(Math.random() * 10000000),
        razorpaySignature: "simulated_secure_signature_hash",
      };

      const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
      };

      // Calls backend verifyPayment -> triggers email
      const res = await axios.post("http://localhost:5000/api/payments/verify", verifyPayload, config);

      if (res.data.success) {
        setShowSimulatedGateway(false);
        const finalId = res.data.booking?._id || res.data.payment?._id || "success";
        navigate(`/bookingsuccess/${finalId}`, {
          state: {
            payment: res.data.payment,
            booking: res.data.booking,
            property,
            emailSent: res.data.emailSent
          }
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Payment Verification Failed ❌";
      alert(errorMsg);
      setShowSimulatedGateway(false);
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}></div>
      </div>
    );

  const gst = property.price * 0.05;
  const stampDuty = property.price * 0.06;
  const registration = property.price * 0.01;
  const finalTotal = property.price + gst + stampDuty + registration;

  return (
    <div style={styles.container}>
      <div style={styles.glassCard} className="glassCard">
        {/* Left Side: Brand and Property Summary */}
        <div style={styles.leftPanel} className="leftPanel">
          <div style={styles.brandHeader}>
            <span style={styles.brandIcon}>✨</span> PropZo Premium Buying
          </div>
          <h2 style={styles.heading}>Secure Your Property</h2>
          <p style={styles.subtext}>You are moments away from ownership.</p>

          <div style={styles.propertyBox}>
            <img
              src={property.image.startsWith("http") ? property.image : `/images/${property.image}`}
              alt={property.title}
              style={styles.propImageStub}
            />
            <div>
              <h3 style={styles.propertyTitle}>{property.title}</h3>
              <p style={styles.location}>{property.location}</p>
            </div>
          </div>

          <div style={styles.buyerBox}>
            <h4 style={{ margin: "0 0 10px 0", color: "#1e293b" }}>Buyer Details</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", color: "#475569", fontSize: "14px" }}>
              <span><strong>Name:</strong> {auth?.name || "Customer"}</span>
              <span><strong>Email:</strong> {auth?.email || "N/A"}</span>
              <span><strong>Phone:</strong> {auth?.phone || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Cost Breakdown & Payment Actions */}
        <div style={styles.rightPanel} className="rightPanel">
          <div style={styles.summaryBox}>
            <div style={styles.costBreakdown}>
              <h4 style={{ margin: "0 0 15px 0" }}>Cost Breakdown</h4>
              <div style={styles.costRow}>
                <span>Property Price</span>
                <span>₹{property.price.toLocaleString('en-IN')}</span>
              </div>
              <div style={styles.costRow}>
                <span>GST (5%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div style={styles.costRow}>
                <span>Stamp Duty (6%)</span>
                <span>₹{stampDuty.toLocaleString('en-IN')}</span>
              </div>
              <div style={styles.costRow}>
                <span>Registration (1%)</span>
                <span>₹{registration.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ ...styles.costRow, ...styles.costTotalRow }}>
                <span>Final Total Payable</span>
                <span style={styles.price}>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div style={styles.methodSection}>
            <h4 style={styles.sectionTitle}>Select Payment Method</h4>
            <div style={styles.methodGrid}>
              {['Online', 'Card', 'NetBanking', 'UPI'].map(opt => (
                <div
                  key={opt}
                  style={{ ...styles.methodCard, ...(method === opt ? styles.methodCardActive : {}) }}
                  onClick={() => setMethod(opt)}
                >
                  <div style={styles.radioIndicator}>
                    {method === opt && <div style={styles.radioInner} />}
                  </div>
                  {opt}
                </div>
              ))}
            </div>
          </div>

          <button
            style={processing ? styles.disabledBtn : styles.payBtn}
            onClick={handleInitiatePayment}
            disabled={processing}
          >
            {processing ? "Processing..." : `Pay ₹${finalTotal.toLocaleString('en-IN')}`}
          </button>

          <button
            style={styles.cancelBtn}
            onClick={() => navigate(-1)}
          >
            Cancel Buying Process
          </button>
        </div>
      </div>

      {/* Simulated Gateway Modal */}
      {showSimulatedGateway && (
        <div style={styles.modalOverlay}>
          <div style={styles.gatewayModal}>
            <div style={styles.gatewayHeader}>
              <h4>💳 Secure Payment Gateway</h4>
              <span onClick={() => setShowSimulatedGateway(false)} style={styles.closeBtn}>&times;</span>
            </div>
            <div style={styles.gatewayBody}>
              <p>Merchant: <strong>PropZo Real Estate</strong></p>
              <p>Order ID: <code>{pendingOrder?.orderId}</code></p>
              <h2 style={styles.gatewayAmount}>₹{pendingOrder?.amount.toLocaleString('en-IN')}</h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '30px' }}>
                This is a simulated gateway. Clicking 'Simulate Success' will invoke the backend verify controller which marks the property as SOLD and sends the email!
              </p>

              <button style={styles.gatewaySuccessBtn} onClick={handleGatewaySuccess} disabled={processing}>
                {processing ? "Verifying & Emailing..." : "Simulate Success"}
              </button>
              <button style={styles.gatewayFailBtn} onClick={() => { setShowSimulatedGateway(false); alert("Payment Cancelled. No email is sent.") }}>
                Simulate Failure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= CSS ================= */

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Inter', sans-serif"
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    overflow: "hidden",
    flexDirection: "row"
  },
  leftPanel: {
    flex: 1,
    padding: "50px",
    background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
  },
  brandHeader: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#3b82f6",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 10px 0",
    lineHeight: 1.2
  },
  subtext: {
    color: "#64748b",
    fontSize: "15px",
    marginBottom: "40px"
  },
  propertyBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "20px"
  },
  buyerBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  propImageStub: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    objectFit: "cover"
  },
  propertyTitle: {
    margin: "0 0 5px 0",
    fontSize: "18px",
    color: "#1e293b",
    fontWeight: "700"
  },
  location: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px"
  },
  rightPanel: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  summaryBox: {
    marginBottom: "30px"
  },
  costBreakdown: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0"
  },
  costRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#475569",
    fontSize: "14px"
  },
  costTotalRow: {
    borderTop: "1px dashed #cbd5e1",
    paddingTop: "15px",
    marginTop: "10px",
    alignItems: "center",
    color: "#0f172a",
    fontWeight: "600"
  },
  price: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#10b981",
  },
  methodSection: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "15px",
    color: "#1e293b",
    marginBottom: "15px",
    fontWeight: "700"
  },
  methodGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },
  methodCard: {
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "600",
    color: "#475569",
    fontSize: "14px"
  },
  methodCardActive: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1e40af"
  },
  radioIndicator: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid #cbd5e1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  radioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6"
  },
  payBtn: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.4)",
  },
  disabledBtn: {
    width: "100%",
    padding: "18px",
    background: "#cbd5e1",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "not-allowed",
  },
  cancelBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "16px",
    background: "transparent",
    color: "#64748b",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  loaderContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f3f6"
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  gatewayModal: {
    background: '#fff',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
  },
  gatewayHeader: {
    background: '#f8fafc',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    fontSize: '24px',
    color: '#94a3b8',
    cursor: 'pointer'
  },
  gatewayBody: {
    padding: '30px 24px'
  },
  gatewayAmount: {
    fontSize: '32px',
    color: '#1e293b',
    margin: '10px 0 20px 0'
  },
  gatewaySuccessBtn: {
    width: '100%',
    padding: '16px',
    background: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  gatewayFailBtn: {
    width: '100%',
    padding: '16px',
    background: '#fff',
    color: '#ef4444',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  }
};

// Add standard global keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        /* Setup responsive layout for the card */
        @media (max-width: 768px) {
            .glassCard { flex-direction: column !important; }
            .leftPanel { padding: 30px !important; }
            .rightPanel { padding: 30px !important; }
        }
    `;
  document.head.appendChild(style);
}