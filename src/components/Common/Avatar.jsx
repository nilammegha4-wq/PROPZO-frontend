import React from "react";

const Avatar = ({ user, size = "md", src, style = {}, className = "" }) => {
    if (!user && !src) return null;

    const name = user?.name || "User";
    const profileImage = src || user?.profileImage || user?.avatar;

    // Dimensions based on size prop
    const sizes = {
        sm: { width: "32px", height: "32px", fontSize: "12px" },
        md: { width: "40px", height: "40px", fontSize: "14px" },
        lg: { width: "120px", height: "120px", fontSize: "40px" },
        xl: { width: "150px", height: "150px", fontSize: "50px" },
    };

    const currentSize = sizes[size] || sizes.md;

    // Logic for Initials
    const getInitials = (fullName) => {
        const names = fullName.split(" ");
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return names[0][0] ? names[0][0].toUpperCase() : "U";
    };

    // Deterministic color based on name
    const getBackgroundColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colors = [
            "#3b82f6", // Blue
            "#8b5cf6", // Purple
            "#10b981", // Emerald
            "#f59e0b", // Amber
            "#ef4444", // Rose
            "#06b6d4", // Cyan
            "#f472b6", // Pink
        ];
        return colors[Math.abs(hash) % colors.length];
    };

    const avatarUrl = (path) => {
        if (!path) return null;
        if (path.startsWith("http") || path.startsWith("data:")) return path;
        return `http://localhost:5000/${path}`;
    };

    const containerStyle = {
        width: currentSize.width,
        height: currentSize.height,
        borderRadius: size === "lg" || size === "xl" ? "32px" : "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        color: "white",
        backgroundColor: profileImage ? "transparent" : getBackgroundColor(name),
        overflow: "hidden",
        flexShrink: 0,
        ... (size === "lg" || size === "xl" ? { boxShadow: "0 10px 20px rgba(0,0,0,0.1)" } : {}),
        ...style
    };

    return (
        <div className="pz-avatar-container" style={{ position: "relative", ...containerStyle }}>
            {profileImage && (
                <img
                    src={avatarUrl(profileImage)}
                    alt={name}
                    className={`pz-avatar-img ${className}`}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: containerStyle.borderRadius,
                        objectFit: "cover",
                        zIndex: 1,
                        ... (size === "lg" || size === "xl" ? { boxShadow: containerStyle.boxShadow } : {})
                    }}
                    onError={(e) => {
                        e.target.style.opacity = "0";
                    }}
                />
            )}
            <div
                className={`pz-avatar-fallback ${className}`}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {getInitials(name)}
            </div>
        </div>
    );
};

export default Avatar;
