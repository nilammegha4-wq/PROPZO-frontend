import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        try {
            const stored = localStorage.getItem("authUser");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    // Listen for storage events (e.g., from other tabs)
    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const stored = localStorage.getItem("authUser");
                setAuth(stored ? JSON.parse(stored) : null);
            } catch {
                setAuth(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("authChange", handleStorageChange); // Custom event

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("authChange", handleStorageChange);
        };
    }, []);

    // Update both state and localStorage reliably
    const updateAuth = (newData) => {
        setAuth((prev) => {
            const updated = { ...prev, ...newData };
            localStorage.setItem("authUser", JSON.stringify(updated));
            return updated;
        });
    };

    const login = (userData) => {
        localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        setAuth(userData);
    };

    const logout = () => {
        localStorage.removeItem("authUser");
        localStorage.removeItem("token");
        setAuth(null);
    };

    // Global Axios Interceptor for 401 Unauthorized
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    console.warn("Session invalid or expired (401 caught globally). Logging out.");
                    logout();
                    window.location.href = "/login";
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const value = {
        auth,
        updateAuth,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
