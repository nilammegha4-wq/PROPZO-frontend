import { useState, useEffect } from "react";
import axios from "axios";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH CONTACTS =================
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // ================= RESPOND TO CONTACT =================
  const respondToContact = async (id) => {
    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/contact/${id}/respond`,
        { adminResponse: response },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse("");
      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      console.error("Error responding:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Messages</h1>
      <p style={styles.subtitle}>Manage customer inquiries and responses</p>

      <div style={styles.card}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>NAME</th>
              <th style={styles.th}>EMAIL</th>
              <th style={styles.th}>PHONE</th>
              <th style={styles.th}>MESSAGE</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}>DATE</th>
              <th style={styles.th}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredContacts.map((c) => (
              <tr key={c._id} style={styles.row}>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>{c.phone || "N/A"}</td>
                <td style={styles.td}>
                  {c.message.length > 50
                    ? c.message.substring(0, 50) + "..."
                    : c.message}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        c.status === "pending"
                          ? "#FEF3C7"
                          : c.status === "responded"
                            ? "#DCFCE7"
                            : "#E0E7FF",
                      color:
                        c.status === "pending"
                          ? "#92400E"
                          : c.status === "responded"
                            ? "#166534"
                            : "#3730A3",
                    }}
                  >
                    {c.status}
                  </span>
                </td>
                <td style={styles.td}>
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => setSelectedContact(c)}
                    style={styles.viewBtn}
                  >
                    {c.status === "pending" ? "Respond" : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredContacts.length === 0 && (
          <div style={styles.noContacts}>No contact messages found</div>
        )}
      </div>

      {/* Response Modal */}
      {selectedContact && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Contact Correspondence</h3>

            <div style={styles.modalBody}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Client:</span>
                <span style={styles.detailValue}>{selectedContact.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email:</span>
                <span style={styles.detailValue}>{selectedContact.email}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Phone:</span>
                <span style={styles.detailValue}>{selectedContact.phone || "N/A"}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Status:</span>
                <span style={{
                  ...styles.status,
                  backgroundColor: selectedContact.status === "pending" ? "#FEF3C7" : "#DCFCE7",
                  color: selectedContact.status === "pending" ? "#92400E" : "#166534"
                }}>
                  {selectedContact.status}
                </span>
              </div>

              <div style={{ marginTop: "16px" }}>
                <span style={styles.detailLabel}>Original Inquiry:</span>
                <div style={styles.messageBox}>{selectedContact.message}</div>
              </div>

              {selectedContact.adminResponse && (
                <div style={{ marginTop: "16px" }}>
                  <span style={styles.detailLabel}>Admin Response:</span>
                  <div style={{ ...styles.messageBox, backgroundColor: "#f0fdf4", borderColor: "#dcfce7" }}>
                    {selectedContact.adminResponse}
                  </div>
                </div>
              )}
            </div>

            {selectedContact.status === "pending" && (
              <div style={styles.responseSection}>
                <label style={{ ...styles.detailLabel, display: "block", marginBottom: "8px" }}>Send Reply:</label>
                <textarea
                  placeholder="Draft your professional response here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  style={styles.responseTextarea}
                />
                <div style={styles.modalActions}>
                  <button
                    onClick={() => setSelectedContact(null)}
                    style={styles.cancelBtn}
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => respondToContact(selectedContact._id)}
                    disabled={loading}
                    style={styles.respondBtn}
                  >
                    {loading ? "Sending..." : "Send Response"}
                  </button>
                </div>
              </div>
            )}

            {selectedContact.status !== "pending" && (
              <div style={{ ...styles.modalActions, marginTop: "24px" }}>
                <button
                  onClick={() => setSelectedContact(null)}
                  style={styles.closeBtn}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: { padding: "40px" },
  title: { fontSize: "26px", fontWeight: "700", marginBottom: "10px" },
  subtitle: { color: "#6B7280", marginBottom: "20px" },
  card: { background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  searchInput: { padding: "10px", width: "100%", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "5px" },
  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { backgroundColor: "#F9FAFB" },
  th: { padding: "12px", textAlign: "left", fontWeight: "600", borderBottom: "1px solid #E5E7EB" },
  td: { padding: "12px", borderBottom: "1px solid #F3F4F6" },
  status: { padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "500" },
  viewBtn: { background: "#3B82F6", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" },
  noContacts: { padding: "40px", textAlign: "center", color: "#6B7280" },
  modal: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalContent: { background: "white", padding: "32px", borderRadius: "16px", width: "550px", maxWidth: "90%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
  modalTitle: { fontSize: "20px", fontWeight: "700", color: "#1e293b", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" },
  modalBody: { display: "flex", flexDirection: "column", gap: "12px" },
  detailRow: { display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" },
  detailLabel: { fontWeight: "600", color: "#64748b", minWidth: "80px" },
  detailValue: { color: "#1e293b", flex: 1 },
  messageBox: { background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginTop: "4px", fontStyle: "italic", fontSize: "14px", color: "#475569" },
  responseSection: { marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" },
  responseTextarea: { width: "100%", height: "120px", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "16px", fontSize: "14px", outline: "none" },
  modalActions: { display: "flex", gap: "12px", justifyContent: "flex-end" },
  respondBtn: { background: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  cancelBtn: { background: "#f1f5f9", color: "#475569", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  closeBtn: { background: "#3b82f6", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
};