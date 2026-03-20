import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown, FaArrowRight } from "react-icons/fa";

const Menu = () => {
    const [search, setSearch] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const projects = [
        {
            id: 1,
            title: "Buy Property",
            location: "VILLAS • FLATS • HOMES",
            image: "/Modernhouse.jpg",
            category: "🏡",
            desc: "Browse luxury villas, flats, and dream homes curated for discerning buyers across prime Mumbai locations.",
            link: "/properties"
        },
        {
            id: 2,
            title: "Rent a House",
            location: "VERIFIED PROPERTIES",
            image: "/DowntownApartment.jpg",
            category: "🏢",
            desc: "Verified, move-in ready properties for short and long-term rentals — seamless from search to keys.",
            link: "/rentpage"
        },
        {
            id: 3,
            title: "Sell Property",
            location: "VERIFIED BUYERS",
            image: "/LP2.jpg",
            category: "🏷️",
            desc: "List with confidence. Connect with serious, verified buyers through our premium seller network.",
            link: "/sellproperty"
        },
        {
            id: 4,
            title: "Agent Support",
            location: "EXPERT GUIDANCE",
            image: "/Agent1.jpg",
            category: "👨‍💼",
            desc: "Personalised guidance from seasoned professionals who understand every micro-market inside out.",
            link: "/agent"
        },
        {
            id: 5,
            title: "Flexible Stay",
            location: "SHORT & FLEXIBLE",
            image: "/LuxuryPenthouse.jpg",
            category: "⏱️",
            desc: "Properties for fully flexible durations — perfectly suited to your schedule and lifestyle needs.",
            link: "/prerent",
            flexible: true
        },
        {
            id: 6,
            title: "Premium Services",
            location: "DESIGN • LEGAL • LOANS",
            image: "/PremiumServices.jpg",
            category: "❤️",
            desc: "Interior design, legal counsel, home loans & property inspections — all under one trusted roof.",
            link: "/premiumservices"
        }
    ];

    return (
        <div style={{ ...styles.page, opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@200;300;400;600&display=swap');
                
                .project-card:hover .image-overlay { opacity: 1 !important; }
                .project-card:hover img { transform: scale(1.1); }
                .project-card:hover .card-info { transform: translateY(-10px); }
                .project-card:hover .view-btn { transform: translateY(0) !important; opacity: 1 !important; }
                
                .pagination-btn:hover { border-color: #B2846B !important; color: #B2846B !important; transform: scale(1.1); }
                .pagination-btn.active { background: #B2846B !important; color: white !important; border-color: #B2846B !important; }
                
                .filter-select { appearance: none; -webkit-appearance: none; }
                .social-icon-footer { transition: all 0.3s ease; }
                .social-icon-footer:hover { color: #B2846B !important; transform: translateY(-3px); }
                
                .reveal { animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                @keyframes revealUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* HEADER SECTION */}
            <div style={styles.header}>
                <div style={styles.heroContent}>
                    <h1 style={styles.title} className="reveal">OUR PROJECTS</h1>
                    <div style={{ ...styles.breadcrumbs, animationDelay: '0.2s' }} className="reveal">
                        <span style={styles.brand}>PROPZO</span>
                        <span style={styles.breadSep}>&rsaquo;</span>
                        <span style={styles.currentBread}>OFFERING THE BEST</span>
                    </div>
                </div>

                {/* PREMIUM HIGHLIGHTS */}
                <div style={{ ...styles.highlightBar, animationDelay: '0.4s' }} className="reveal">
                    <div style={styles.highlightItem}>
                        <span style={styles.highlightVal}>15k+</span>
                        <span style={styles.highlightLab}>PREMIUM PROPERTIES</span>
                    </div>
                    <div style={styles.highlightLine} />
                    <div style={styles.highlightItem}>
                        <span style={styles.highlightVal}>100%</span>
                        <span style={styles.highlightLab}>VERIFIED AGENTS</span>
                    </div>
                    <div style={styles.highlightLine} />
                    <div style={styles.highlightItem}>
                        <span style={styles.highlightVal}>24/7</span>
                        <span style={styles.highlightLab}>CONCIERGE SUPPORT</span>
                    </div>
                </div>
            </div>

            <div style={styles.container}>
                {/* PROJECTS GRID */}
                <div style={styles.grid}>
                    {projects.map((project, index) => (
                        <div key={project.id} className="project-card" style={{ ...styles.card, animationDelay: `${0.2 * index}s` }}>
                            <div style={styles.imageContainer}>
                                <img src={project.image} alt={project.title} style={styles.image} />
                                <div className="image-overlay" style={styles.imageOverlay}>
                                    <Link to={project.link} className="view-btn" style={styles.viewBtn}>
                                        Explore <FaArrowRight size={10} />
                                    </Link>
                                </div>
                                <div style={styles.categoryBadge}>{project.category}</div>
                            </div>
                            <div className="card-info" style={styles.cardInfo}>
                                <h3 style={styles.cardTitle}>{project.title}</h3>
                                <p style={styles.cardLoc}>{project.location}</p>
                                <p style={{ fontSize: '13px', color: '#9a7060', marginTop: '10px', lineHeight: '1.6' }}>{project.desc}</p>

                                {project.flexible && (
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '15px' }}>
                                        {["Per Hour", "Per Day", "Per Week"].map(t => (
                                            <span key={t} style={{ fontSize: '9px', padding: '4px 10px', border: '1px solid rgba(178,132,107,0.30)', borderRadius: '15px', color: '#B2846B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: "#f5f0e8",
        color: "#4C3324",
        fontFamily: "'Outfit', sans-serif"
    },
    header: {
        height: "65vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(rgba(76,51,36,0.55), rgba(76,51,36,0.55)), url('https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat",
        padding: "0 20px",
        textAlign: "center"
    },
    heroContent: { marginBottom: "40px" },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(3rem, 8vw, 6rem)",
        fontWeight: "400",
        letterSpacing: "15px",
        color: "#F5EDE3",
        marginBottom: "20px",
        textShadow: "0 10px 30px rgba(76,51,36,0.4)"
    },
    breadcrumbs: {
        fontSize: "13px",
        letterSpacing: "4px",
        color: "#E4CBB6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        textTransform: "uppercase"
    },
    brand: { fontWeight: "700", color: "#F5EDE3" },
    currentBread: { fontWeight: "400" },
    breadSep: { fontSize: "20px" },

    highlightBar: {
        position: "absolute",
        bottom: "-40px",
        width: "85%",
        maxWidth: "1000px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "30px",
        background: "#fffaf5",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(76,51,36,0.10)",
        zIndex: 10,
        border: "1px solid rgba(178,132,107,0.16)"
    },
    highlightItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" },
    highlightVal: { fontSize: "24px", fontWeight: "700", color: "#4C3324", letterSpacing: "-1px" },
    highlightLab: { fontSize: "10px", fontWeight: "600", color: "#B2846B", letterSpacing: "1px" },
    highlightLine: { width: "1px", height: "40px", background: "rgba(178,132,107,0.20)" },

    container: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "140px 40px 120px"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        columnGap: "40px",
        rowGap: "70px"
    },
    card: {
        cursor: "pointer",
    },
    imageContainer: {
        width: "100%",
        aspectRatio: "1 / 1.1",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 40px -15px rgba(76,51,36,0.18)"
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
    },
    imageOverlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(76,51,36,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "0.4s ease"
    },
    viewBtn: {
        padding: "14px 28px",
        background: "#E4CBB6",
        color: "#4C3324",
        border: "none",
        borderRadius: "40px",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "1px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transform: "translateY(20px)",
        opacity: 0,
        transition: "0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        textDecoration: "none"
    },
    categoryBadge: {
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "rgba(245,237,227,0.92)",
        backdropFilter: "blur(5px)",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#4C3324"
    },
    cardInfo: {
        marginTop: "25px",
        transition: "transform 0.4s ease"
    },
    cardTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "22px",
        fontWeight: "400",
        letterSpacing: "1px",
        marginBottom: "10px",
        color: "#4C3324"
    },
    cardLoc: {
        fontSize: "12px",
        color: "#819B8B",
        letterSpacing: "2px",
        textTransform: "uppercase",
        fontWeight: "300"
    }
};

export default Menu;
