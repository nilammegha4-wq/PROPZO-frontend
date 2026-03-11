const BASE_URL = "http://localhost:5000";

export const getImageUrl = (path) => {
    // Fallback if no path provided
    if (!path) return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1073";

    // If it's already an absolute URL, return as is
    if (path.startsWith("http")) return path;

    // Normalize path to use forward slashes (fix for Windows backend storing backslashes)
    const normalizedPath = path.replace(/\\/g, "/");

    // If the path contains 'uploads', it's a backend file served from http://localhost:5000/uploads
    if (normalizedPath.toLowerCase().includes("uploads")) {
        const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
        return `${BASE_URL}${cleanPath}`;
    }

    // Otherwise, assume it's a frontend public asset (relative to origin)
    return normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
};

export default BASE_URL;
