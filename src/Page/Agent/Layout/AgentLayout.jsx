import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AgentLayout() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.mainWrapper}>
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main style={styles.mainContent}>
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
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
};
