import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AgentLayout() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={styles.wrapper}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          style={styles.overlay} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div style={{
        ...styles.mainWrapper,
        marginLeft: window.innerWidth > 960 ? "280px" : "0"
      }} className="agent-main-wrapper">
        <Topbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onMenuClick={toggleSidebar}
        />
        <main style={styles.mainContent} className="agent-main-content">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .agent-main-wrapper { margin-left: 0 !important; }
          .agent-main-content { padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9f6f1",
    fontFamily: "'Inter', sans-serif",
  },
  mainWrapper: {
    flex: 1,
    marginLeft: "280px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainContent: {
    padding: "40px",
    flex: 1,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 950,
  }
};
